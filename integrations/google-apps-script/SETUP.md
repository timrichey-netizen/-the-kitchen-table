# The Kitchen Table — Google Sheets reviews setup

## Created spreadsheet
The Kitchen Table — Ratings & Reviews:
https://docs.google.com/spreadsheets/d/1kUnLNMbkL6P02amLxLJEwtOW0MURnZp9-uNvD9FOiQM/edit

Includes Recipes, Ratings, Comments, Rating Summary, Moderation and Settings.
The spreadsheet is PRIVATE; never set anyone-on-internet read/write permissions.

## 1. Install Apps Script
1. Open the spreadsheet; Extensions > Apps Script.
2. Replace Code.gs with repository file `integrations/google-apps-script/Code.gs`.
3. Save the project with name Kitchen Table Ratings Backend.
4. In Google Cloud Console, create or use a project; configure OAuth consent and
   create an OAuth client of type Web application.
5. Register the exact website domain in Authorized JavaScript origins. Copy its
   CLIENT ID (not client secret).
6. Apps Script > Project Settings > Script properties:
   `GOOGLE_CLIENT_ID` = your Google OAuth web-client ID.
7. Deploy > New deployment > Web app.
   Execute as: Me; Who has access: Anyone. Authorize required scopes.
   NOTE: This makes the endpoint publicly callable, but every write verifies
   the submitted Google ID token server-side. Do not remove that verification.
8. Copy the resulting HTTPS /exec URL.

## 2. Connect the website
Update `reviews-config.js`:
```js
window.KITCHEN_TABLE_REVIEWS = {
  appsScriptUrl: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',
  googleClientId: 'YOUR_WEB_OAUTH_CLIENT_ID.apps.googleusercontent.com',
  enabled: true
};
```
The website reads rating summaries and approved comments. Visitors sign in with
Google, choose one of five stars, optionally type a comment, then click
Submit community rating. Apps Script processes it and displays its result in
a new confirmation tab, avoiding cross-origin write-response assumptions.

## 3. Moderation
New comments receive status `pending` in the Comments sheet.
An administrator may set moderation_status to `approved` or `rejected`.
Only approved comments are returned publicly.
Run the `updateSummarySheet` function in Apps Script to refresh Rating Summary.
Public rating averages are computed from approved rating records at request time.

## 4. Quality checks
- Test one Google account's first rating and replacement rating: Ratings should
  still have only one row for that reviewer + recipe.
- Test a second account: the average and count should update.
- Test a comment: it must remain invisible until approved.
- Test invalid/forged ID tokens; writes must fail.
- Test comments containing HTML: browser must render them as plain text.
- Test desktop/mobile sign-in and submit flow on the actual live domain.
- Google Apps Script execution quotas apply. This solution is suitable for
  initial traffic, not a high-volume guaranteed-service backend.

## Boundaries
This does not automatically deploy Apps Script to your account. Until you deploy
and fill the settings, `enabled:false` keeps public community submission
OFF and existing local personal ratings remain usable. No user ratings are
invented or migrated.

## Important
The original `script.js` includes a historical 1-to-10 feedback system for
legacy pages; don't deploy two competing community-rating backends. The
Google Sheets service uses only a five-star system for published recipes.
