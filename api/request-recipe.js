const crypto = require('crypto');

const SPREADSHEET_ID = process.env.RECIPE_REQUEST_SPREADSHEET_ID || '15_mW52_R1guiMXl8OwAvGlnBauflgQZpyCaqE-nYBM4';
const SHEET_NAME = process.env.RECIPE_REQUEST_SHEET_NAME || 'Sheet1';

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(body));
}

function cleanText(value, max) {
  return String(value || '')
    .replace(/[\u0000-\u001f\u007f]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .slice(0, max);
}

function b64url(input) {
  return Buffer.from(input).toString('base64')
    .replace(/=/g, '')
    .replace(/\+/g, '-')
    .replace(/\//g, '_');
}

async function getAccessToken() {
  const email = process.env.GOOGLE_SHEETS_CLIENT_EMAIL || '';
  const privateKey = (process.env.GOOGLE_SHEETS_PRIVATE_KEY || '').replace(/\\n/g, '\n');
  if (!email || !privateKey) throw new Error('Recipe request spreadsheet access is not configured.');

  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claim = b64url(JSON.stringify({
    iss: email,
    scope: 'https://www.googleapis.com/auth/spreadsheets',
    aud: 'https://oauth2.googleapis.com/token',
    exp: now + 3600,
    iat: now
  }));
  const unsigned = header + '.' + claim;
  const signature = crypto.sign('RSA-SHA256', Buffer.from(unsigned), privateKey);
  const assertion = unsigned + '.' + b64url(signature);

  const response = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion
    })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok || !data.access_token) {
    throw new Error(data.error_description || 'Could not authorize spreadsheet access.');
  }
  return data.access_token;
}

async function appendRequest(localName, englishName) {
  const token = await getAccessToken();
  const range = encodeURIComponent("'" + SHEET_NAME.replace(/'/g, "''") + "'!AC:AD");
  const url = 'https://sheets.googleapis.com/v4/spreadsheets/' +
    encodeURIComponent(SPREADSHEET_ID) + '/values/' + range +
    ':append?valueInputOption=RAW&insertDataOption=INSERT_ROWS';

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ values: [[localName, englishName]] })
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data.error && data.error.message ? data.error.message : 'Could not save the recipe request.');
  }
  return data;
}

module.exports = async function handler(req, res) {
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST');
      return json(res, 405, { error: 'Method not allowed.' });
    }

    let body = req.body;
    if (typeof body === 'string') body = JSON.parse(body || '{}');
    body = body || {};

    // Honeypot field: real visitors never fill this.
    if (cleanText(body.website, 200)) return json(res, 200, { ok: true });

    const localName = cleanText(body.localName, 160);
    const englishName = cleanText(body.englishName, 160);

    if (!localName && !englishName) {
      return json(res, 400, { error: 'Enter the dish name in English, the local language, or both.' });
    }

    // Preview must succeed before confirmation can write to Google Sheets.
    const phase = cleanText(body.phase, 20);
    if (phase === 'research') {
      const key = process.env.BRAVE_SEARCH_API_KEY || '';
      const secret = process.env.RECIPE_REQUEST_SIGNING_SECRET || '';
      if (!key || !secret) return json(res, 503, { error: 'Recipe research is not configured yet. No request has been saved.' });

      const query = [localName, englishName, 'traditional recipe dish'].filter(Boolean).join(' ');
      const search = await fetch('https://api.search.brave.com/res/v1/web/search?q=' +
        encodeURIComponent(query) + '&count=5', {
        headers: { 'X-Subscription-Token': key, 'Accept': 'application/json' }
      });
      if (!search.ok) throw new Error('Recipe research is temporarily unavailable. No request has been saved.');
      const result = await search.json();
      const sources = (result.web && result.web.results || []).slice(0, 5)
        .filter(item => /^https:\/\//i.test(item.url || ''))
        .map(item => ({
          title: cleanText(item.title, 160),
          description: cleanText(item.description, 350),
          url: item.url
        }));

      const preview = { localName, englishName, expires: Date.now() + 10 * 60 * 1000 };
      const payload = b64url(JSON.stringify(preview));
      const signature = crypto.createHmac('sha256', secret).update(payload).digest('hex');
      return json(res, 200, {
        ok: true,
        sources,
        reviewToken: payload + '.' + signature,
        note: 'Review source titles and descriptions. Search results are evidence to inspect, not automatic name verification.'
      });
    }

    if (phase !== 'confirm') return json(res, 400, { error: 'Research and confirmation are required before submission.' });
    const secret = process.env.RECIPE_REQUEST_SIGNING_SECRET || '';
    const token = String(body.reviewToken || '');
    const parts = token.split('.');
    if (!secret || parts.length !== 2 || !/^[a-f0-9]{64}$/.test(parts[1])) {
      return json(res, 400, { error: 'Research this dish again before confirming.' });
    }
    const expected = crypto.createHmac('sha256', secret).update(parts[0]).digest('hex');
    if (!crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(parts[1]))) {
      return json(res, 400, { error: 'Invalid research confirmation.' });
    }
    let reviewed;
    try { reviewed = JSON.parse(Buffer.from(parts[0], 'base64url').toString('utf8')); }
    catch (e) { return json(res, 400, { error: 'Invalid research confirmation.' }); }
    if (!reviewed || reviewed.expires < Date.now() ||
        reviewed.localName !== cleanText(body.originalLocalName, 160) ||
        reviewed.englishName !== cleanText(body.originalEnglishName, 160) ||
        body.userConfirmed !== true) {
      return json(res, 400, { error: 'Research confirmation expired or does not match. Research again.' });
    }
    await appendRequest(localName, englishName);
    return json(res, 200, { ok: true });
  } catch (error) {
    return json(res, 500, {
      error: error && error.message ? error.message : 'Could not save the recipe request.'
    });
  }
};
