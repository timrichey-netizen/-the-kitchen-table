#!/usr/bin/env node
// Run: node tools/audit-recipe-locales.js
// Checks published recipes only; fails if locale resources are incomplete.
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const locales = read('recipe-locales.js');
const first = locales.match(/window\.KitchenTableLocaleContent=([\s\S]*?);\s*\/\*/);
if (!first) throw new Error('Base locale payload missing');
const maps = JSON.parse(first[1]);
for (const lang of ['es', 'fr']) {
  const pattern = new RegExp('Object\\.assign\\(window\\.KitchenTableLocaleContent\\.'+lang+', (\\{[\\s\\S]*?\\})\\);', 'g');
  for (const match of locales.matchAll(pattern)) Object.assign(maps[lang], JSON.parse(match[1]));
}
const homepage = read('index.html');
const pages = [...new Set([...homepage.matchAll(/<article class="recipe-card"[\s\S]*?<h3><a href="([^"]+\.html)"/g)].map(m => m[1]))];
if (!pages.length) throw new Error('No published recipe cards found');
const issues = [];
let checked = 0;
for (const page of pages) {
  const html = read(page);
  const lines = [...new Set([...html.matchAll(/<div class="recipe-line">([^<]+)<\/div>/g)].map(m => m[1]))];
  const card = homepage.match(new RegExp('<article class="recipe-card"[\\s\\S]*?<h3><a href="'+page.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')+'"[\\s\\S]*?<\\/article>'))?.[0] || '';
  const pitch = card.match(/class="recipe-card-body"><p>([^<]+)<\/p>/)?.[1];
  const history = html.match(/class="recipe-name-(?:local|english)"[^>]*>[\s\S]*?<\/p><p>([^<]+)<\/p>/)?.[1];
  for (const lang of ['es','fr']) {
    for (const line of lines) {
      if (!maps[lang][line]) issues.push(page+' '+lang+' missing recipe line: '+line.slice(0,90));
      if (/^\d+\. /.test(line) && maps[lang][line] && !/^\d+\. /.test(maps[lang][line])) issues.push(page+' '+lang+' step number missing: '+line.slice(0,60));
    }
    for (const [label, text] of [['card description',pitch],['history',history]]) {
      if (text && !maps[lang][text]) issues.push(page+' '+lang+' missing '+label);
    }
    checked += lines.length;
  }
}
console.log('Published recipe pages:', pages.length, 'Translated recipe lines checked:', checked, 'Issues:', issues.length);
issues.slice(0,50).forEach(x => console.error(x));
if (issues.length) process.exitCode=1;
