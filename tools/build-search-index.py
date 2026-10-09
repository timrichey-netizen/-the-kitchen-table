#!/usr/bin/env python3
"""Build a truthful public search index from published Google Sheet rows.
Run daily in GitHub Actions. Unpublished rows are never exposed.
Requires GOOGLE_SERVICE_ACCOUNT_JSON secret (service account shared on sheet).
"""
import json, os, re, html, datetime, sys
from pathlib import Path
import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request

SHEET_ID=os.environ.get("RECIPE_SHEET_ID","1oEtKwzuGu0uo1UFdrZM81hWjz4aM02CCjx99n8psi5Y")
BASE="https://timrichey-netizen.github.io/-the-kitchen-table/"
PUBLISHED={
  "neapolitan-lasagna.html",
  "vincisgrassi.html",
  "pasta-alla-norma.html",
  "pasta-with-bottarga.html"
}
# Public, culinary columns only. Exclude: source URL, review scores, image
# processing status/IDs, internal comments, and draft entries.
FIELDS=[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,30,31]
def cell(row,i): return str(row[i]).strip() if i<len(row) else ""
def text(s,limit): return re.sub(r"\s+"," ",s).strip()[:limit]
def esc(s): return html.escape(str(s),quote=True)
def main():
    raw=os.environ.get("GOOGLE_SERVICE_ACCOUNT_JSON","")
    if not raw: sys.exit("Missing GOOGLE_SERVICE_ACCOUNT_JSON; no output generated")
    info=json.loads(raw)
    creds=service_account.Credentials.from_service_account_info(
        info,scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"])
    creds.refresh(Request())
    url=f"https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/Sheet1!A1:AF20000"
    response=requests.get(url,headers={"Authorization":"Bearer "+creds.token},timeout=120)
    response.raise_for_status()
    values=response.json().get("values",[])
    items=[]
    for row in values[1:]:
        title=cell(row,15); english=cell(row,16)
        if not title:continue
        # Spreadsheet rows are not published merely by being populated.
        # URL slug must match one of the verified public HTML pages.
        for slug in PUBLISHED:
            stem=slug.removesuffix(".html")
            if (stem=="neapolitan-lasagna" and title.casefold()=="lasagna napoletana") or (
                stem=="vincisgrassi" and title.casefold()=="vincisgrassi") or (
                stem=="pasta-alla-norma" and title.casefold()=="pasta alla norma") or (
                stem=="pasta-with-bottarga" and title.casefold()=="pasta con la bottarga"):
                items.append((slug,row,title,english));break
    if len({x[0] for x in items})!=4:
        sys.exit(f"Expected 4 unique published recipes; found {len(items)}. Refusing to overwrite index.")
    today=datetime.date.today().isoformat()
    sections=[]
    for slug,row,title,english in items:
        # compact excerpts from all public culinary fields, excluding repetitive
        # instructions beyond summary length to keep index genuinely useful.
        snippets=[]
        for index in FIELDS:
            v=text(cell(row,index),220 if index in (1,2,17,18) else 170)
            if v and v.casefold() not in {title.casefold(),english.casefold()}:
                snippets.append(v)
        dedup=list(dict.fromkeys(snippets))
        body=" ".join(esc(x) for x in dedup)
        sections.append(f'<article><h2><a href="{esc(slug)}">{esc(title)}</a></h2>'
            f'<p class="subtitle">{esc(english)}</p><p>{body}</p>'
            f'<p><a href="{esc(slug)}">View full recipe</a> · '
            f'<a href="{BASE}">The Kitchen Table homepage</a></p></article>')
    page='''<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<title>Recipe Index | The Kitchen Table</title>
<meta name="description" content="Browse published Italian recipes, ingredients, cuisine, cooking methods and food history at The Kitchen Table">
<link rel="canonical" href="'''+BASE+'''recipe-index.html">
<link rel="stylesheet" href="styles.css">
<style>main{max-width:960px;margin:105px auto 60px;padding:0 24px}
article{padding:28px 0;border-bottom:1px solid #ded3c6}
article p{line-height:1.65}.subtitle{color:#6a6056}</style></head><body>
<main><p><a href="index.html">← The Kitchen Table</a></p>
<h1>Published Recipe Index</h1>
<p>Discover ingredients, techniques, regions and food traditions from our published recipes.
For the full collection and filters, visit <a href="index.html">The Kitchen Table</a>.</p>
'''+ "\n".join(sections)+f'''
<p><small>Index refreshed {today}</small></p></main></body></html>'''
    Path("recipe-index.html").write_text(page,encoding="utf-8")
    urls=[BASE,BASE+"recipe-index.html"]+[BASE+item[0] for item in items]
    sitemap='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n'+''.join(
        f'<url><loc>{esc(u)}</loc></url>\n' for u in urls)+'</urlset>\n'
    Path("sitemap.xml").write_text(sitemap,encoding="utf-8")
    print(f"Indexed {len(items)} published recipes from spreadsheet; no draft entries.")
if __name__=="__main__":main()
