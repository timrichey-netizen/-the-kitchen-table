# Recipe requests and notification queue

The public form researches dish names, shows source links, asks the visitor to confirm, and queues a request in Upstash Redis. An optional, explicitly selected email subscription is saved alongside the request.

Required server environment variables:
- `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` — queue and fallback signing secret
- `RECIPE_REQUEST_SIGNING_SECRET` — preferred independent token-signing secret
- `GOOGLE_SHEETS_CLIENT_EMAIL` and `GOOGLE_SHEETS_PRIVATE_KEY` — optional Master Recipe List AC/AD sync (grant the service account Editor)
- `RECIPE_SITE_URL` — full public HTTPS site base URL
- `RECIPE_REQUEST_CRON_SECRET` — strong random secret authorizing the watcher
- `RESEND_API_KEY` and `RECIPE_NOTIFICATION_FROM` — email sender, verified with Resend
- `BRAVE_SEARCH_API_KEY` — optional; otherwise the form searches Wikipedia (not authoritative verification)

GitHub Actions repository secrets required:
- `RECIPE_SITE_URL`
- `RECIPE_REQUEST_CRON_SECRET`

The hourly workflow calls `POST /api/check-recipe-requests` with a Bearer token. It reads the public `data/recipe-catalog.json`, matches *exact normalized* local or English names against recipes explicitly marked `available`, checks the direct published URL, and emails opted-in visitors a link. The Redis record is updated after successful provider acceptance. Ambiguous/variant names are not matched automatically; review them manually.

Note: The website's account configuration is currently disabled. Account registry integration requires enabling verified sign-in and an authenticated account-service endpoint. Do not trust arbitrary email addresses as account identities.

Operational limitations: Configure the server environment and GitHub secrets before relying on emails; the job is committed but is not verified running. The Redis email queue contains personal email addresses and should be kept private. Provide data retention and removal controls before production launch.
