from pathlib import Path
import re, json

root = Path(".")
index = root / "index.html"
html = index.read_text(encoding="utf-8")

CARD_RE = re.compile(r'<article\b[^>]*class="[^"]*recipe-card[^"]*"[^>]*>[\s\S]*?</article>', re.I)
IMG_RE = re.compile(r'<img\b[^>]*\bsrc="([^"]+)"[^>]*>', re.I)
ANY_IMG_RE = re.compile(r'<img\b[^>]*>', re.I)

# Inventory recipe cards, pages, and image refs before changing anything.
cards = list(CARD_RE.finditer(html))
inventory = []
pages = set()
recipe_sources = set()

for n, m in enumerate(cards, 1):
    card = m.group(0)
    title_m = re.search(r'<h[1-6][^>]*>([\s\S]*?)</h[1-6]>', card, re.I)
    href_m = re.search(r'<a\b[^>]*href="([^"]+)"[^>]*>\s*View recipe', card, re.I)
    img_m = IMG_RE.search(card)
    title = re.sub(r'<[^>]+>', '', title_m.group(1)).strip() if title_m else ""
    page = href_m.group(1) if href_m else ""
    src = img_m.group(1) if img_m else ""
    slug = Path(page).stem if page else ""
    if page:
        pages.add(page)
    if src:
        recipe_sources.add(src)
    inventory.append({
        "sequence": n,
        "title": title,
        "slug": slug,
        "page": page,
        "image": src,
    })

# Add recipe-page image refs to the recipe-associated source set.
for rel in sorted(pages):
    p = root / rel
    if not p.exists():
        continue
    t = p.read_text(encoding="utf-8")
    for mm in IMG_RE.finditer(t):
        recipe_sources.add(mm.group(1))

# Remove image elements from recipe cards only.
def clean_card(match):
    return re.sub(r'\s*<img\b[^>]*>\s*', '\n', match.group(0), flags=re.I)

html = CARD_RE.sub(clean_card, html)
index.write_text(html, encoding="utf-8")

# Remove image elements from recipe pages only.
pages_updated = 0
for rel in sorted(pages):
    p = root / rel
    if not p.exists():
        continue
    t = p.read_text(encoding="utf-8")
    u = re.sub(r'\s*<img\b[^>]*>\s*', '\n', t, flags=re.I)
    if u != t:
        p.write_text(u, encoding="utf-8")
        pages_updated += 1

# Find all remaining image references anywhere in the site after recipe-image removal.
remaining = set()
for p in root.rglob("*"):
    if not p.is_file() or ".git" in p.parts:
        continue
    if p.suffix.lower() not in {".html", ".css", ".js", ".md"}:
        continue
    try:
        t = p.read_text(encoding="utf-8")
    except Exception:
        continue

    # HTML/JS-style src="..."
    for mm in re.finditer(r'\bsrc\s*=\s*["\']([^"\']+)["\']', t, re.I):
        val = mm.group(1)
        if re.search(r'\.(?:png|jpe?g|webp|svg|gif)(?:[?#].*)?$', val, re.I):
            remaining.add(val.split("?")[0].split("#")[0])

    # CSS url(...)
    for mm in re.finditer(r'url\(\s*["\']?([^"\')]+)["\']?\s*\)', t, re.I):
        val = mm.group(1).strip()
        if re.search(r'\.(?:png|jpe?g|webp|svg|gif)(?:[?#].*)?$', val, re.I):
            remaining.add(val.split("?")[0].split("#")[0])

deleted = []
preserved = []
missing_local = []

for src in sorted(recipe_sources):
    if re.match(r'^[a-z]+://', src, re.I) or src.startswith("data:"):
        preserved.append({"file": src, "reason": "external/data reference; no local file deletion"})
        continue

    clean = src.split("?")[0].split("#")[0]
    if clean in remaining:
        preserved.append({"file": clean, "reason": "still referenced outside recipe images"})
        continue

    p = root / clean
    if p.exists() and p.is_file():
        p.unlink()
        deleted.append(clean)
    else:
        missing_local.append(clean)

# Verification.
final_index = index.read_text(encoding="utf-8")
final_cards = list(CARD_RE.finditer(final_index))
cards_with_images = sum(bool(ANY_IMG_RE.search(m.group(0))) for m in final_cards)

recipe_pages_with_images = []
missing_recipe_pages = []
for rel in sorted(pages):
    p = root / rel
    if not p.exists():
        missing_recipe_pages.append(rel)
        continue
    if ANY_IMG_RE.search(p.read_text(encoding="utf-8")):
        recipe_pages_with_images.append(rel)

# Make sure deleted files are not referenced anywhere in text sources.
deleted_still_referenced = []
for deleted_path in deleted:
    for p in root.rglob("*"):
        if not p.is_file() or ".git" in p.parts or p.suffix.lower() not in {".html", ".css", ".js", ".md"}:
            continue
        try:
            txt = p.read_text(encoding="utf-8")
        except Exception:
            continue
        if deleted_path in txt:
            deleted_still_referenced.append({"file": deleted_path, "referenced_by": str(p)})
            break

report = {
    "recipe_cards_found": len(cards),
    "recipe_cards_after_cleanup": len(final_cards),
    "recipe_cards_updated": len(cards),
    "recipe_cards_with_images_remaining": cards_with_images,
    "recipe_pages_found": len(pages),
    "recipe_pages_updated": pages_updated,
    "recipe_pages_with_images_remaining": len(recipe_pages_with_images),
    "recipe_pages_still_with_images": recipe_pages_with_images,
    "missing_recipe_pages": missing_recipe_pages,
    "unique_recipe_image_references": len(recipe_sources),
    "physical_image_files_deleted": len(deleted),
    "deleted_files": deleted,
    "shared_or_nonlocal_images_preserved_count": len(preserved),
    "shared_or_nonlocal_images_preserved": preserved,
    "missing_local_recipe_images": missing_local,
    "deleted_files_still_referenced": deleted_still_referenced,
    "inventory": inventory,
}

(root / "recipe-image-cleanup-report.json").write_text(
    json.dumps(report, indent=2, ensure_ascii=False),
    encoding="utf-8",
)

print(json.dumps({
    "recipe_cards_found": report["recipe_cards_found"],
    "recipe_cards_after_cleanup": report["recipe_cards_after_cleanup"],
    "recipe_cards_with_images_remaining": report["recipe_cards_with_images_remaining"],
    "recipe_pages_found": report["recipe_pages_found"],
    "recipe_pages_updated": report["recipe_pages_updated"],
    "recipe_pages_with_images_remaining": report["recipe_pages_with_images_remaining"],
    "unique_recipe_image_references": report["unique_recipe_image_references"],
    "physical_image_files_deleted": report["physical_image_files_deleted"],
    "shared_or_nonlocal_images_preserved_count": report["shared_or_nonlocal_images_preserved_count"],
    "deleted_files_still_referenced_count": len(report["deleted_files_still_referenced"]),
}, indent=2))

if len(final_cards) != len(cards):
    raise SystemExit(f"ERROR: recipe card count changed from {len(cards)} to {len(final_cards)}")
if cards_with_images:
    raise SystemExit(f"ERROR: {cards_with_images} recipe cards still contain images")
if recipe_pages_with_images:
    raise SystemExit(f"ERROR: {len(recipe_pages_with_images)} recipe pages still contain images")
if deleted_still_referenced:
    raise SystemExit(f"ERROR: {len(deleted_still_referenced)} deleted files are still referenced")
