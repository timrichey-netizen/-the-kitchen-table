from pathlib import Path
import html, re, hashlib

ROOT=Path(".")
ASSET=ROOT/"assets"/"generated"
ASSET.mkdir(parents=True, exist_ok=True)

def esc(s): return html.escape(s, quote=True)
def svg_for(title, slug):
    # Deterministic, locally generated food illustration: plate, garnish, steam and title.
    h=int(hashlib.sha256(slug.encode()).hexdigest()[:8],16)
    hue=h%360
    hue2=(hue+38)%360
    return f'''<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="800" viewBox="0 0 1200 800">
<defs>
 <radialGradient id="bg"><stop offset="0" stop-color="hsl({hue} 28% 34%)"/><stop offset="1" stop-color="hsl({hue} 30% 13%)"/></radialGradient>
 <radialGradient id="food"><stop offset="0" stop-color="hsl({hue2} 72% 58%)"/><stop offset=".65" stop-color="hsl({hue2} 62% 40%)"/><stop offset="1" stop-color="hsl({hue2} 54% 27%)"/></radialGradient>
 <filter id="shadow"><feDropShadow dx="0" dy="18" stdDeviation="22" flood-opacity=".45"/></filter>
</defs>
<rect width="1200" height="800" fill="url(#bg)"/>
<ellipse cx="600" cy="430" rx="390" ry="245" fill="#e8dfcf" filter="url(#shadow)"/>
<ellipse cx="600" cy="425" rx="330" ry="195" fill="url(#food)"/>
<g fill="#f4e3a1" opacity=".92">
 <circle cx="470" cy="390" r="58"/><circle cx="650" cy="350" r="72"/><circle cx="730" cy="470" r="65"/><circle cx="535" cy="500" r="78"/>
</g>
<g fill="#55a35b"><ellipse cx="430" cy="470" rx="30" ry="68" transform="rotate(-38 430 470)"/><ellipse cx="760" cy="365" rx="27" ry="60" transform="rotate(35 760 365)"/></g>
<g fill="#d9543d"><circle cx="525" cy="330" r="30"/><circle cx="685" cy="515" r="34"/><circle cx="785" cy="435" r="24"/></g>
<path d="M500 190 C455 130 535 115 500 65 M600 175 C555 115 635 100 600 50 M700 190 C655 130 735 115 700 65" fill="none" stroke="#fff" stroke-opacity=".45" stroke-width="14" stroke-linecap="round"/>
<rect x="0" y="650" width="1200" height="150" fill="#102f25" fill-opacity=".94"/>
<text x="600" y="720" fill="#fff" font-family="Georgia,serif" font-size="48" text-anchor="middle">{esc(title)}</text>
<text x="600" y="765" fill="#d7c49a" font-family="Arial,sans-serif" font-size="22" text-anchor="middle">THE KITCHEN TABLE · GENERATED RECIPE ART</text>
</svg>'''

def title_from_page(path):
    s=path.read_text(encoding="utf-8")
    m=re.search(r"<h1[^>]*>(.*?)</h1>",s,re.I|re.S)
    if m: return re.sub(r"<[^>]+>","",m.group(1)).strip()
    m=re.search(r"<title>(.*?)</title>",s,re.I|re.S)
    return re.sub(r"\s*\|.*$","",re.sub(r"<[^>]+>","",m.group(1))).strip() if m else path.stem.replace("-"," ").title()

def localize_text(s, title_hint="Recipe"):
    # Replace every third-party image src with a generated local SVG named from the URL's surrounding page/card.
    def repl(m):
        pre, url = m.group(1), m.group(2)
        # infer card title from nearby HTML where possible
        nearby=s[max(0,m.start()-500):min(len(s),m.end()+1000)]
        tm=re.search(r"<h3>(.*?)</h3>",nearby,re.I|re.S)
        title=re.sub(r"<[^>]+>","",tm.group(1)).strip() if tm else title_hint
        href=re.search(r'href="([^"]+\.html)"',nearby,re.I)
        slug=Path(href.group(1)).stem if href else re.sub(r"[^a-z0-9]+","-",title.lower()).strip("-")
        out=ASSET/f"{slug}.svg"
        if not out.exists(): out.write_text(svg_for(title,slug),encoding="utf-8")
        return pre+f"assets/generated/{slug}.svg"+'"'
    return re.sub(r'(<img\b[^>]*\bsrc=")https?://[^"]+(")',lambda m: repl(m),s,flags=re.I)

for path in [ROOT/"index.html", *ROOT.glob("*.html")]:
    if not path.exists(): continue
    s=path.read_text(encoding="utf-8")
    ns=localize_text(s,title_from_page(path))
    if ns!=s: path.write_text(ns,encoding="utf-8")

# Ensure no remote image sources remain in HTML.
bad=[]
for path in ROOT.glob("*.html"):
    s=path.read_text(encoding="utf-8")
    if re.search(r'<img\b[^>]*\bsrc="https?://',s,re.I): bad.append(str(path))
if bad: raise SystemExit("Remote image sources remain: "+", ".join(bad))
print("Localized all third-party recipe image sources.")
