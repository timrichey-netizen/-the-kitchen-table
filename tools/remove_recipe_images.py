from pathlib import Path
import re, json

root=Path(".")
index=root/"index.html"
html=index.read_text(encoding="utf-8")

# Inventory recipe cards, pages, and image refs before changing anything.
cards=list(re.finditer(r'<article\\b[^>]*class="[^"]*recipe-card[^"]*"[^>]*>[\\s\\S]*?</article>', html, re.I))
inventory=[]
pages=set()
recipe_sources=set()

for n,m in enumerate(cards,1):
    card=m.group(0)
    title_m=re.search(r'<h[1-6][^>]*>([\\s\\S]*?)</h[1-6]>',card,re.I)
    href_m=re.search(r'<a\\b[^>]*href="([^"]+)"[^>]*>\\s*View recipe',card,re.I)
    img_m=re.search(r'<img\\b[^>]*src="([^"]+)"[^>]*>',card,re.I)
    title=re.sub(r'<[^>]+>','',title_m.group(1)).strip() if title_m else ""
    page=href_m.group(1) if href_m else ""
    src=img_m.group(1) if img_m else ""
    slug=Path(page).stem if page else ""
    if page: pages.add(page)
    if src: recipe_sources.add(src)
    inventory.append({"sequence":n,"title":title,"slug":slug,"page":page,"image":src})

# Add recipe-page image refs to the recipe-associated source set.
for rel in sorted(pages):
    p=root/rel
    if not p.exists(): continue
    t=p.read_text(encoding="utf-8")
    for mm in re.finditer(r'<img\\b[^>]*src="([^"]+)"[^>]*>',t,re.I):
        recipe_sources.add(mm.group(1))

# Remove image elements from recipe cards only.
def clean_card(match):
    return re.sub(r'\\s*<img\\b[^>]*>\\s*','\\n',match.group(0),flags=re.I)
html=re.sub(r'<article\\b[^>]*class="[^"]*recipe-card[^"]*"[^>]*>[\\s\\S]*?</article>',clean_card,html,flags=re.I)
index.write_text(html,encoding="utf-8")

# Remove image elements from recipe pages only.
pages_updated=0
for rel in sorted(pages):
    p=root/rel
    if not p.exists(): continue
    t=p.read_text(encoding="utf-8")
    u=re.sub(r'\\s*<img\\b[^>]*>\\s*','\\n',t,flags=re.I)
    if u!=t:
        p.write_text(u,encoding="utf-8")
        pages_updated+=1

# Find all remaining image refs anywhere in the site after removal.
remaining=set()
for p in root.rglob("*"):
    if p.is_file() and p.suffix.lower() in {".html",".css",".js",".md"} and ".git" not in p.parts:
        try: t=p.read_text(encoding="utf-8")
        except Exception: continue
        for mm in re.finditer(r'(?:src=|url\\()\\s*["\\']?([^"\\')\\s>]+)',t,re.I):
            val=mm.group(1)
            if re.search(r'\\.(?:png|jpe?g|webp|svg|gif)(?:[?#].*)?$',val,re.I):
                remaining.add(val.split("?")[0].split("#")[0])

deleted=[]
preserved=[]
for src in sorted(recipe_sources):
    if re.match(r'^[a-z]+://',src,re.I) or src.startswith("data:"):
        preserved.append({"file":src,"reason":"external/data reference; no local file deletion"})
        continue
    clean=src.split("?")[0].split("#")[0]
    if clean in remaining:
        preserved.append({"file":clean,"reason":"still referenced outside recipe images"})
        continue
    p=root/clean
    if p.exists() and p.is_file():
        p.unlink()
        deleted.append(clean)

# Verification.
final_index=index.read_text(encoding="utf-8")
final_cards=list(re.finditer(r'<article\\b[^>]*class="[^"]*recipe-card[^"]*"[^>]*>[\\s\\S]*?</article>',final_index,re.I))
cards_with_images=sum(bool(re.search(r'<img\\b',m.group(0),re.I)) for m in final_cards)
recipe_pages_with_images=0
for rel in sorted(pages):
    p=root/rel
    if p.exists() and re.search(r'<img\\b',p.read_text(encoding="utf-8"),re.I):
        recipe_pages_with_images+=1

report={
 "recipe_cards_found":len(cards),
 "recipe_cards_updated":len(cards),
 "recipe_pages_found":len(pages),
 "recipe_pages_updated":pages_updated,
 "unique_recipe_image_references":len(recipe_sources),
 "physical_image_files_deleted":len(deleted),
 "shared_or_nonlocal_images_preserved":preserved,
 "recipe_cards_with_images_remaining":cards_with_images,
 "recipe_pages_with_images_remaining":recipe_pages_with_images,
 "deleted_files":deleted
}
(root/"recipe-image-cleanup-report.json").write_text(json.dumps(report,indent=2),encoding="utf-8")
print(json.dumps(report,indent=2))
