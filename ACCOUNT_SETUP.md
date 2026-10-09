# Activate The Kitchen Table accounts

The static website now includes email magic-link registration, passkey sign-in (Face ID, Touch ID, or device PIN), and per-user favorites sync. It is deliberately disabled until a Supabase project is set up.

1. Create a Supabase project at https://supabase.com/dashboard.
2. In the SQL editor, run `supabase-account-schema.sql` to create `public.user_favorites` and its row-level-security rules.
3. In Authentication → URL Configuration set the Site URL to the canonical website URL and add an allowed redirect to `https://timrichey-netizen.github.io/-the-kitchen-table/account.html` (or your eventual custom-domain equivalent).
4. Enable email OTP/magic-link authentication and configure the provider, verification and email-delivery/rate-limit settings.
5. In Authentication → Passkeys enable passkey authentication, configure WebAuthn RP ID and permitted HTTPS origins. Passkey support is **experimental**; evaluate before launching widely. Use a permanent custom domain before registering production passkeys to avoid invalidating them after changing domains. Devices choose Face ID, Touch ID, or device passcode; the website never reads biometric data.
6. In `account-config.js` set `enabled:true`, the public Supabase project URL and the **publishable / anon** key. Never place service-role keys or private secrets in this repository.
7. Test email creation, confirming account, passkey registration, passkey sign-in, favorite sync between two devices, sign-out, and RLS isolation with two separate users. Verify guest local favorites remain separate from each account. Clear user consent may be required before migrating guest favorites into an account.
8. Update the privacy policy and contact information before activating.

Cloud favorites are authoritative after sign-in. Guest favorites remain on-device and are **not automatically imported** into a new account. This prevents silently moving shared-device favorites into a personal account. A separate explicit import UX can be added later.
