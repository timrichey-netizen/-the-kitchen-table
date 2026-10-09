# Recipe search indexing — setup

The public index is at `recipe-index.html`, linked from the homepage. The sitemap is `sitemap.xml` and `robots.txt` advertises it. Both were seeded from the published recipe rows in the source Sheet.

## Daily automation
GitHub Action: `.github/workflows/refresh-recipe-search-index.yml`
Runs daily at 05:17 UTC and can also be run using **Actions → Refresh public recipe search index → Run workflow**. GitHub scheduled workflows may run later than requested or be disabled after prolonged repository inactivity.

To authorize daily spreadsheet reads:

1. In Google Cloud, enable **Google Sheets API** and create a service account with a JSON key.
2. Share the source spreadsheet (`1oEtKwzuGu0uo1UFdrZM81hWjz4aM02CCjx99n8psi5Y`) with the service account email **as Viewer**. Do not make the sheet public.
3. Under GitHub repository **Settings → Secrets and variables → Actions**, create `GOOGLE_SERVICE_ACCOUNT_JSON` and paste the entire service-account key JSON.
4. Manually run the workflow and verify that it creates a successful refresh commit.

Security: never place the service-account key in this repository or in the site JavaScript. If compromised, revoke the key in Google Cloud immediately.

## Publishing and discoverability
Only the four verified, publicly available recipes are indexed. Unpublished rows and internal image-processing metadata must not be published or made searchable. To publish more, add corresponding public recipe HTML pages and explicitly update `PUBLISHED` plus the title-to-page matching conditions in `tools/build-search-index.py` (ideally move to a spreadsheet publication-status column). This ensures that no visitor lands on nonexistent recipes.

The index is a publicly visible page by design. A "hidden" page inaccessible to crawlers cannot be indexed. Avoid hidden keyword-stuffing, doorway pages, or redirects that differ for search engines and humans. Search engines decide whether and when to index pages; this mechanism cannot guarantee inclusion in Google, Bing, or other engines.

Each indexed recipe links both to its actual recipe page and back to the homepage. The sitemap should also be submitted to Google Search Console and Bing Webmaster Tools.

## Limitations
The job uses only substantive culinary columns, not internal operational data. It produces keyword-rich editorial excerpts; it is not a repository of every raw spreadsheet field. Search metadata should truthfully represent published recipes only.
