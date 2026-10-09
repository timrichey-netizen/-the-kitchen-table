# Recipe Email Subscriptions — Activation Guide

The Kitchen Table website is public. Sign-in and email subscriptions are strictly optional. These features are **not active** until the owner configures the account backend and enables email delivery.

## 1. Private Google Sheet
In the private member-account spreadsheet, add a worksheet named `EmailSubscriptions` with these headers, in order:

A MemberID | B Email | C Status | D Frequency | E RecipesPerEmail | F CategoriesJSON | G LastSentAt | H UpdatedAt | I RotationCursor

Do not make this sheet public. Do not store passwords, passcodes or biometric data.

## 2. Apps Script
In the existing account-bound Apps Script project, add/update `Members.gs` and add `EmailDelivery.gs`. Existing `Code.gs` and other handlers must not define a competing `doPost`. Set the Script Property `GOOGLE_CLIENT_ID` to the Google OAuth client ID. Deploy the Apps Script web app as the owner with access set to Anyone; every subscription operation verifies the submitted Google ID token.

## 3. Activate account login
Update `account-config.js` with the OAuth Web client ID and your deployed Apps Script /exec URL, then set `enabled:true`. Add your GitHub Pages origin as an authorized JavaScript origin in Google Cloud. Keep all secrets out of the website.

## 4. Test without sending mail
Sign in at `account.html`. Choose frequency, quantity and recipe categories, opt in and save. Verify the `EmailSubscriptions` worksheet. Test change preferences and opt-out. Leave `RECIPE_EMAILS_ENABLED` unset or `false` so no email is delivered.

## 5. Enable and schedule delivery
Grant authorization for MailApp in Apps Script. Run `installRecipeEmailTrigger` once to install a daily trigger. Once tested, set Script Property `RECIPE_EMAILS_ENABLED` to `true`. The dispatcher sends only to active opt-ins, honors daily/weekly/biweekly/30-day frequencies, rotates through available published recipes, respects Gmail quotas and records successful sends.

## Safeguards and limitations
- No emails are sent while the script property is missing or false.
- Only the four currently published recipes are used. All are categorized as `Entrees & Mains`; subscriptions limited to other categories remain dormant until recipes are published in them.
- If the quantity selected exceeds the number of matching published recipes, the message contains fewer than requested rather than duplicates.
- The email contains links to public recipes; recipients can unsubscribe by signing into My Account and clearing the opt-in box.
- A 30-day interval is used for the monthly option. Delivery timing is approximate because Google time-based triggers are not exact-time SLAs.
- This is an owner-managed Google Apps Script newsletter implementation, not a bulk email marketing service. Review compliance with applicable email regulations and add operator identity/contact information before turning it on.
- If the authenticated API cannot be deployed successfully, leave the service disabled.
