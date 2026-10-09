# Optional Google member accounts and saved favorites

Google Sheet: https://docs.google.com/spreadsheets/d/1iVB86SYtzu6jTIK0OJx2o3vwyypNkCjSR5-D8KLF5Ow/edit

The member sheet should include Members, Favorites, Preferences, Activity Log, and **EmailSubscriptions**. If EmailSubscriptions is missing, create it with columns: Member ID, Email, Status, Frequency, Recipe Count, Categories JSON, Last Sent, Updated At, Reserved.
Never share this member spreadsheet publicly: it contains account email addresses.

## Deploy (owner must do this once)
1. Open the linked spreadsheet > Extensions > Apps Script.
2. Paste `integrations/google-apps-script/Members.gs` into Code.gs, replacing any sample code. This is a **separate** script deployment from the Ratings & Reviews spreadsheet.
3. In Google Cloud Console configure OAuth Consent and create a Google OAuth 2.0 **Web application** client ID. Include the exact live site origin `https://timrichey-netizen.github.io` under Authorized JavaScript Origins. Configure test users if the consent screen is in testing.
4. In Apps Script > Project Settings > Script Properties, create `GOOGLE_CLIENT_ID` with the same web-client ID. Do not place client secrets or credentials in browser JS.
5. Deploy > New Deployment > Web App > Execute as Me > Who has access Anyone. Complete authorization and copy the `https://script.google.com/macros/s/.../exec` URL.
6. Edit `account-config.js` with `enabled:true`, `googleClientId:'....apps.googleusercontent.com'`, `appsScriptUrl:'https://script.google.com/macros/s/.../exec'`.
7. Test registration and a saved favorite with two browsers, sign-out, guest-only browsing, page reloads, invalid token rejection and the cookie/consent implications of third-party Google login. Approve only after tests.

## Design
- All recipes and guides remain public, no login gate.
- Guests save favorites locally.
- Google sign-in creates a member row only on first verified request. No password, Face ID, or biometric value is stored in Sheets.
- Signed-in favorites are stored by unique Google subject ID. One user/recipe entry enforced using Apps Script LockService.
- Login uses Google Identity Services, which may present a device passkey/Face ID based on the visitor's Google and device settings. This does **not** implement first-party WebAuthn/passkey registration.
- To preserve sign-in within a browser tab, the short-lived Google ID token is stored in sessionStorage, not persistent localStorage. Login must be repeated after expiration. A production long-term login should use a managed session/token refresh solution.
- Existing local guest favorites are not automatically uploaded, to avoid accidentally sharing private local selections.

## Security and operations
The published Apps Script deployment is publicly addressable but rejects unauthenticated requests after verifying ID token audience/issuer/email verification with Google. Keep Sheets private. Rate limits, account-deletion workflow, privacy contact and full policy disclosures should be added before inviting public registrations. Apps Script has quotas and is best suited to modest traffic.

## Newsletter opt-in during registration
- The account page displays an **unchecked** optional newsletter subscription checkbox before the Google sign-in button.
- After a verified successful sign-in, the checkbox triggers the `newsletter-signup` action only when expressly checked. Leaving it unchecked does not modify newsletter preferences.
- The Apps Script records this preference under the verified member ID in the private `EmailSubscriptions` sheet, without creating duplicates.
- **Redeploy the updated Members.gs** and configure `EmailSubscriptions` for this feature to work. If signup fails, the account remains signed in and the UI reports that the newsletter opt-in was not saved.
- Newsletter *delivery*, unsubscribe workflow, confirmation/consent compliance, and final privacy policy text must be completed before sending campaigns. Recording an opt-in is not itself a mail-delivery system.
