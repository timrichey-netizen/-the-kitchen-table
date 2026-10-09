#!/usr/bin/env python3
"""Sync public recipe catalog from Google Sheets without publishing unfinished recipes."""
import json, os, sys
from pathlib import Path
import requests
from google.oauth2 import service_account
from google.auth.transport.requests import Request

SHEET_ID=os.getenv("RECIPE_SHEET_ID","1oEtKwzuGu0uo1UFdrZM81hWjz4aM02CCjx99n8psi5Y")
OUT=Path("data/recipe-catalog.json")
KNOWN={"lasagna napoletana":"neapolitan-lasagna.html","vincisgrassi":"vincisgrassi.html","pasta alla norma":"pasta-alla-norma.html","pasta con la bottarga":"pasta-with-bottarga.html"}
def val(row,i): return str(row[i]).strip() if len(row)>i and row[i] is not None else ""
def main():
    raw=os.getenv("GOOGLE_SERVICE_ACCOUNT_JSON")
    if not raw: sys.exit("Missing GOOGLE_SERVICE_ACCOUNT_JSON repository secret. Existing catalog left intact.")
    creds=service_account.Credentials.from_service_account_info(json.loads(raw),scopes=["https://www.googleapis.com/auth/spreadsheets.readonly"])
    creds.refresh(Request())
    url=f"https://sheets.googleapis.com/v4/spreadsheets/{SHEET_ID}/values/Sheet1!A1:AK25000"
    res=requests.get(url,headers={"Authorization":"Bearer "+creds.token},timeout=120)
    res.raise_for_status()
    rows=res.json().get("values",[])
    if len(rows)<2: sys.exit("Spreadsheet empty; refusing to overwrite public catalog")
    catalog=[]
    for row_num,row in enumerate(rows[1:],2):
        name=val(row,15)
        if not name: continue
        url=KNOWN.get(name.casefold())
        # Published pages are the explicit allowlist, not inferred from draft instructions.
        if url and not Path(url).exists(): sys.exit(f"Missing published HTML file: {url}")
        catalog.append({"id":f"sheet-{row_num}","name":name,"english":val(row,16) or name,
           "country":val(row,5),"region":val(row,6),"worldRegion":val(row,7),
           "classification":val(row,30),"difficulty":val(row,31),"dishType":val(row,36),
           "url":url,"status":"available" if url else "unavailable"})
    if len(catalog)<4: sys.exit("Fewer than 4 recipes found; refusing to overwrite")
    if len([x for x in catalog if x["status"]=="available"])!=4:
        sys.exit("Expected exactly four published recipes; refusing to overwrite")
    OUT.parent.mkdir(parents=True,exist_ok=True)
    OUT.write_text(json.dumps({"version":1,"source":"Italian Recipe / Sheet1",
      "sourceSpreadsheetId":SHEET_ID,"recipes":catalog},ensure_ascii=False,separators=(',',':'))+'\n',encoding="utf-8")
    print(f"Synced {len(catalog)} titles; four available recipe pages; remaining entries marked unavailable.")
if __name__=="__main__": main()
