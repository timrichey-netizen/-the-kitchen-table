from pathlib import Path
paths=["spaghetti-carbonara.html","pasta-cacio-e-pepe.html","rigatoni-amatriciana.html","fettuccine-alfredo.html","pasta-e-ceci.html","rigatoni-pecorino-crispy-guanciale.html","rigatoni-pork-ragu-ricotta.html","penne-arrabbiata.html","bucatini-amatriciana.html","spaghetti-shrimp-lemon-mint-pecorino.html","pasta-alla-norma.html","gnocchi-alla-sorrentina.html","spaghetti-with-mussels.html","butternut-squash-ravioli-brown-butter-sage.html","bolognese-meat-sauce.html","pasta-ncasciata.html","pasta-aglio-e-olio.html","miso-mushroom-leek-pasta.html","fresh-pasta-hard-soft-flour.html","gnocchi-gorgonzola.html","lemon-pasta.html","zucchini-lasagna.html"]
block='''<div class="container" style="margin-top:28px"><h2>Pasta Guide</h2><p><a class="text-link" href="pasta-guide.html">Pasta shapes, sauce pairings &amp; technique →</a></p></div>'''
for name in paths:
 p=Path(name)
 if not p.exists(): continue
 s=p.read_text(encoding="utf-8")
 if 'href="pasta-guide.html"' in s: continue
 if "</main>" in s:
  s=s.replace("</main>",block+"</main>",1)
  p.write_text(s,encoding="utf-8")
print("Cross-referenced Pasta Guide.")
