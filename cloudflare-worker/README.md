# The Kitchen Table Plate Generator

Cloudflare Worker backend for the Plate Composer on The Kitchen Table.

## Source

Main Worker source:

`src/index.js`

## Required secret

`OPENAI_API_KEY`

Do not commit the key to GitHub. Add it as a Cloudflare Worker secret.

## Cloudflare Git deployment

Repository:
`timrichey-netizen/-the-kitchen-table`

Root directory:
`cloudflare-worker`

The Wrangler configuration is:
`wrangler.jsonc`

After deployment, add `OPENAI_API_KEY` in the Worker settings under Variables and Secrets as an encrypted secret, then redeploy.

Copy the resulting `https://...workers.dev` URL into the Image generator backend field on:
`https://timrichey-netizen.github.io/-the-kitchen-table/plate-composer.html`

## Wrangler deployment

From this folder:

```bash
npm install
npx wrangler login
npx wrangler secret put OPENAI_API_KEY
npm run deploy
```

The Worker exposes:

- `GET /health`
- `POST /generate-plate`

The OpenAI API key is read only from `env.OPENAI_API_KEY`.
