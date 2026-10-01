from pathlib import Path
import re
links={
"chicken-broth.html":["chicken-and-andouille-gumbo.html","jambalaya.html","aji-de-gallina.html","arroz-con-pollo-uruguayo.html","mole-poblano-con-pollo.html","tinga-de-pollo.html"],
"beef-broth.html":["boeuf-bourguignon.html","osso-buco-red-wine.html","seco-de-res.html","locro.html","puchero-uruguayo.html","birria.html","barbacoa.html","bolognese-meat-sauce.html"],
"pork-broth.html":["pozole-rojo.html","menudo.html","carnitas.html","cochinita-pibil.html","carapulcra.html","frijoles-charros.html"],
"turkey-broth.html":["consomme.html"],"lamb-broth.html":["consomme.html","puchero-uruguayo.html"],
"veal-broth.html":["osso-buco-red-wine.html","veal-piccata.html","espagnole-sauce.html","veloute-sauce.html"],
"fish-broth.html":["cioppino.html","creamy-seafood-risotto.html","spaghetti-with-mussels.html","pescado-a-la-veracruzana.html"],
"shellfish-broth.html":["seafood-gumbo.html","cioppino.html","creamy-seafood-risotto.html","new-orleans-shrimp-corn-bisque.html","crawfish-etouffee.html","arroz-con-mariscos-peruano.html"],
"shrimp-broth.html":["shrimp-creole.html","new-orleans-shrimp-corn-bisque.html","spicy-cajun-shrimp-corn-chowder.html","jambalaya.html","seafood-gumbo.html","crawfish-etouffee.html","zucchini-risotto-shrimp.html"],
"lobster-broth.html":["creamy-seafood-risotto.html","cioppino.html","nantua-sauce.html"],
"crab-broth.html":["seafood-gumbo.html","cioppino.html","creamy-seafood-risotto.html"],
"clam-broth.html":["spaghetti-with-mussels.html","moules-marinieres.html","white-wine-garlic-mussels.html","cioppino.html"],
"vegetable-broth.html":["tuscan-white-bean-soup.html","pasta-e-ceci.html","zucchini-risotto-shrimp.html","arroz-rojo.html","arroz-verde.html"],
"mushroom-broth.html":["miso-mushroom-leek-pasta.html","sage-mushroom-chicken-skillet.html","zurich-style-veal-creamy-mushroom-sauce.html"],
"bone-broth.html":["beef-bone-broth.html","chicken-bone-broth.html"],"chicken-bone-broth.html":["chicken-and-andouille-gumbo.html","ramen-chicken-broth.html","mexican-caldo-de-pollo.html"],
"beef-bone-broth.html":["pho-broth.html","mexican-caldo-de-res.html","birria.html","french-onion-broth.html"],
"dashi.html":["miso-broth.html","miso-mushroom-leek-pasta.html"],"kombu-dashi.html":["miso-broth.html","seaweed-broth.html"],"shiitake-dashi.html":["miso-broth.html","miso-mushroom-leek-pasta.html"],
"tonkotsu-broth.html":["ramen-chicken-broth.html","miso-broth.html"],"ramen-chicken-broth.html":["miso-broth.html"],"miso-broth.html":["miso-mushroom-leek-pasta.html"],
"pho-broth.html":["beef-broth.html","beef-bone-broth.html"],"tom-yum-broth.html":["shrimp-broth.html","shellfish-broth.html"],"tom-kha-broth.html":["coconut-curry-steamed-mussels.html","thai-style-coconut-curry-mussels.html"],
"mexican-caldo-de-pollo.html":["tinga-de-pollo.html","mole-poblano-con-pollo.html","arroz-rojo.html"],"mexican-caldo-de-res.html":["birria.html","barbacoa.html","menudo.html"],
"birria-consome.html":["birria.html","tacos-barbacoa.html","barbacoa.html"],"pozole-broth.html":["pozole-rojo.html"],
"consomme.html":["boeuf-bourguignon.html","osso-buco-red-wine.html"],"court-bouillon.html":["lemon-stuffed-grilled-branzino.html","herb-crusted-salmon.html","swordfish-sicilian-style.html","pescado-a-la-veracruzana.html"],
"french-onion-broth.html":["beef-broth.html","beef-bone-broth.html"],"italian-brodo.html":["tortellini-broth.html","pasta-e-ceci.html","tuscan-white-bean-soup.html","zucchini-risotto-shrimp.html"],
"parmesan-broth.html":["pasta-e-ceci.html","tuscan-white-bean-soup.html","zucchini-risotto-shrimp.html","gnocchi-alla-sorrentina.html"],"tortellini-broth.html":["fresh-pasta-hard-soft-flour.html","pasta-guide.html"],
"chinese-superior-stock.html":["moo-shu-chicken.html","wonton-broth.html","shrimp-herb-stir-fry.html"],"wonton-broth.html":["chinese-superior-stock.html"],"korean-anchovy-broth.html":["seaweed-broth.html"],"seaweed-broth.html":["miso-broth.html","vegetable-broth.html"]
}
def title(p):
 s=Path(p).read_text(encoding="utf-8"); m=re.search(r"<h1[^>]*>(.*?)</h1>",s,re.I|re.S)
 return re.sub(r"<[^>]+>","",m.group(1)).strip() if m else Path(p).stem.replace("-"," ").title()
pat=re.compile(r'<div class="container broth-xref"[\s\S]*?</div>\s*',re.I)
rev={}
for b,ds in links.items():
 if not Path(b).exists(): continue
 valid=[d for d in ds if Path(d).exists() and d!=b]
 s=pat.sub("",Path(b).read_text(encoding="utf-8"))
 body=" · ".join(f'<a class="text-link" href="{d}">{title(d)} →</a>' for d in valid)
 if body:s=s.replace("</main>",f'<div class="container broth-xref" style="margin-top:28px"><h2>Recipes Using or Pairing with This Broth</h2><p>{body}</p></div></main>',1)
 Path(b).write_text(s,encoding="utf-8")
 for d in valid:rev.setdefault(d,[]).append(b)
for d,bs in rev.items():
 p=Path(d);s=pat.sub("",p.read_text(encoding="utf-8"))
 body=" · ".join(f'<a class="text-link" href="{b}">{title(b)} →</a>' for b in bs)
 s=s.replace("</main>",f'<div class="container broth-xref" style="margin-top:28px"><h2>Applicable Broths &amp; Stocks</h2><p>{body}</p></div></main>',1)
 p.write_text(s,encoding="utf-8")
print("broths",len(links),"recipe pages",len(rev))
