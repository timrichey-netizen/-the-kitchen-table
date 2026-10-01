// Browser scroll restoration is handled early on the homepage in index.html.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
}

const cards = [...document.querySelectorAll('.recipe-card')];
const search = document.getElementById('recipeSearch');
const cuisineFiltersWrap = document.getElementById('cuisineFilters');
const asianSubcuisineGroup = document.getElementById('asianSubcuisineGroup');
const asianSubcuisineFilters = document.getElementById('asianSubcuisineFilters');
const latinSubcuisineGroup = document.getElementById('latinSubcuisineGroup');
const latinSubcuisineFilters = document.getElementById('latinSubcuisineFilters');
const filters = [...document.querySelectorAll('.filter')];
const noResults = document.getElementById('noResults');
let activeFilter = 'all';
let activeCuisine = 'all';
let activeAsianSubcuisine = 'all';
let activeLatinSubcuisine = 'all';

const LATIN_SUBCUISINES = [
  ['Mexico', ['mexican','mexico','tomatillo','enchilada','taco','chilaquiles','huevos rancheros','mole']],
  ['Argentina', ['argentine','argentina','criolla','provoleta','milanesa','chimichurri','asado']],
  ['Uruguay', ['uruguayan','uruguay','chivito']],
  ['Peru', ['peruvian','peru','ceviche','lomo saltado','aji']],
  ['Brazil', ['brazilian','brazil','feijoada','moqueca']],
  ['Colombia', ['colombian','colombia','arepa','ajiaco']],
  ['Venezuela', ['venezuelan','venezuela','arepa','pabellon']],
  ['Chile', ['chilean','chile','pastel de choclo']],
  ['Cuba', ['cuban','cuba','ropa vieja']],
  ['Puerto Rico', ['puerto rican','puerto rico','mofongo']],
  ['Dominican Republic', ['dominican','dominican republic','mangu']],
  ['Central America', ['guatemalan','guatemala','salvadoran','el salvador','honduran','honduras','nicaraguan','nicaragua','costa rican','costa rica','panamanian','panama']]
];

const ASIAN_SUBCUISINES = [
  ['Chinese', ['chinese','moo shu','mandarin']],
  ['Japanese', ['japanese','miso']],
  ['Korean', ['korean','gochujang','kimchi']],
  ['Thai', ['thai','pad thai','lemongrass']],
  ['Vietnamese', ['vietnamese','pho','banh','nuoc cham']],
  ['Fusion', ['fusion','asian-inspired','stir-fry']]
];

const CUISINES = [
  ['Uruguayan', ['uruguayan','uruguay','chivito','gramajo','caruso','puchero','pamplona']],
  ['Italian', ['italian','roman','sicilian','venetian','piedmont','campanian']],
  ['French', ['french','bourguignon']],
  ['British', ['british','sticky toffee','spotted dick','bread pudding']],
  ['Swiss', ['swiss','zurich','zürich','rosti','rösti','fondue']],
  ['Belgian', ['belgian','moules-frites','frites']],
  ['Spanish', ['spanish','catalan','basque']],
  ['Greek', ['greek','saganaki']],
  ['Mediterranean', ['mediterranean']],
  ['Cajun / Creole', ['cajun','creole','new orleans']],
  ['Latin American', ['latin','criolla','tomatillo']],
  ['Asian', ['asian','chinese','moo shu','mandarin','japanese','miso','korean','gochujang','thai','vietnamese','fusion','stir-fry']],
  ['American', ['american','san francisco']]
];

function normalizeSearchText(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function cardHaystack(card) {
  return normalizeSearchText(`${card.dataset.search || ''} ${card.textContent || ''}`);
}

function detectCuisine(card) {
  const text = cardHaystack(card);
  for (const [label, terms] of CUISINES) {
    if (terms.some(term => text.includes(term))) return label;
  }
  return '';
}

function detectAsianSubcuisine(card) {
  const text = cardHaystack(card);
  for (const [label, terms] of ASIAN_SUBCUISINES) {
    if (terms.some(term => text.includes(term))) return label;
  }
  return '';
}

function detectLatinSubcuisine(card) {
  const text = cardHaystack(card);
  for (const [label, terms] of LATIN_SUBCUISINES) {
    if (terms.some(term => text.includes(term))) return label;
  }
  return '';
}

function populateLatinSubcuisines() {
  if (!latinSubcuisineFilters) return;
  const latinCards = cards.filter(card => detectCuisine(card) === 'Latin American');
  const represented = [...new Set(latinCards.map(detectLatinSubcuisine).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b));

  latinSubcuisineFilters.innerHTML =
    '<button class="cuisine-filter active" data-latin="all">All Latin American</button>' +
    represented.map(name =>
      `<button class="cuisine-filter" data-latin="${name}">${name}</button>`
    ).join('');

  latinSubcuisineFilters.querySelectorAll('.cuisine-filter').forEach(button => {
    button.addEventListener('click', () => {
      latinSubcuisineFilters.querySelectorAll('.cuisine-filter')
        .forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      activeLatinSubcuisine = button.dataset.latin || 'all';
      updateRecipes();
    });
  });
}

function populateAsianSubcuisines() {
  if (!asianSubcuisineFilters) return;
  const asianCards = cards.filter(card => detectCuisine(card) === 'Asian');
  const represented = [...new Set(asianCards.map(detectAsianSubcuisine).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b));

  asianSubcuisineFilters.innerHTML =
    '<button class="cuisine-filter active" data-asian="all">All Asian</button>' +
    represented.map(name =>
      `<button class="cuisine-filter" data-asian="${name}">${name}</button>`
    ).join('');

  asianSubcuisineFilters.querySelectorAll('.cuisine-filter').forEach(button => {
    button.addEventListener('click', () => {
      asianSubcuisineFilters.querySelectorAll('.cuisine-filter')
        .forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      activeAsianSubcuisine = button.dataset.asian || 'all';
      updateRecipes();
    });
  });
}

function populateCuisineFilter() {
  if (!cuisineFiltersWrap) return;
  const cuisines = [...new Set(cards.map(detectCuisine).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b));

  cuisineFiltersWrap.innerHTML =
    '<button class="cuisine-filter active" data-cuisine="all">All cuisines</button>' +
    cuisines.map(name =>
      `<button class="cuisine-filter" data-cuisine="${name}">${name}</button>`
    ).join('');

  cuisineFiltersWrap.querySelectorAll('.cuisine-filter').forEach(button => {
    button.addEventListener('click', () => {
      cuisineFiltersWrap.querySelectorAll('.cuisine-filter')
        .forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      activeCuisine = button.dataset.cuisine || 'all';
      activeAsianSubcuisine = 'all';
      activeLatinSubcuisine = 'all';

      if (asianSubcuisineGroup) {
        asianSubcuisineGroup.hidden = activeCuisine !== 'Asian';
      }
      if (latinSubcuisineGroup) {
        latinSubcuisineGroup.hidden = activeCuisine !== 'Latin American';
      }
      if (activeCuisine === 'Asian') populateAsianSubcuisines();
      if (activeCuisine === 'Latin American') populateLatinSubcuisines();

      // Cuisine is the primary filter: reset food type to All when cuisine changes.
      activeFilter = 'all';
      filters.forEach(b => b.classList.toggle('active', (b.dataset.filter || 'all') === 'all'));

      updateRecipes();
    });
  });
}

function matchesBroadCategory(card, filter) {
  if (filter === 'all') return true;
  const categories = (card.dataset.category || '').toLowerCase();
  const text = cardHaystack(card);

  switch (filter) {
    case 'meat':
      return /(chicken|beef|pork|veal)/.test(categories) ||
             /steak|chicken|pork|veal|osso buco|stracotto|boeuf|bolognese|ragù|ragu/.test(text);
    case 'pasta':
      return categories.includes('pasta') ||
             /spaghetti|rigatoni|fettuccine|bucatini|gnocchi|ravioli|pasta|carbonara/.test(text);
    case 'rice':
      return categories.includes('rice') ||
             /risotto|rice|cauliflower rice/.test(text);
    case 'seafood':
      return categories.includes('seafood') ||
             /shrimp|salmon|branzino|swordfish|mussels|cioppino/.test(text);
    case 'vegetables':
      return categories.includes('vegetable') ||
             /cauliflower|broccoli|zucchini|potato|eggplant|green beans|fennel/.test(text);
    case 'soups-salads':
      return categories.includes('soup') || categories.includes('salad') ||
             /soup|chowder|bisque|salad/.test(text);
    case 'extras':
      return categories.includes('sauce') || categories.includes('seasoning') ||
             /seasoning|sauce|salsa|stock|fresh pasta/.test(text);
    case 'dessert':
      return categories.includes('dessert') || /tiramisu|brûlée|brulee|lava cake|crumble|lemon square|brownie|pie/.test(text);
    default:
      return true;
  }
}

function updateRecipes() {
  const q = normalizeSearchText(search?.value || '');
  const terms = q ? q.split(/\s+/).filter(Boolean) : [];
  let visible = 0;

  cards.forEach(card => {
    const haystack = cardHaystack(card);
    const cuisine = detectCuisine(card);
    const matchesCategory = matchesBroadCategory(card, activeFilter);
    const matchesCuisine = activeCuisine === 'all' || cuisine === activeCuisine;
    const asianSubcuisine = detectAsianSubcuisine(card);
    const matchesAsianSubcuisine =
      activeCuisine !== 'Asian' ||
      activeAsianSubcuisine === 'all' ||
      asianSubcuisine === activeAsianSubcuisine;
    const matchesSearch = terms.length === 0 || terms.every(term => haystack.includes(term));
    const show = matchesCategory && matchesCuisine && matchesAsianSubcuisine && matchesSearch;

    card.hidden = !show;
    card.style.display = show ? '' : 'none';
    if (show) visible++;
  });

  if (noResults) noResults.hidden = visible !== 0;
}

search?.addEventListener('input', () => {
  // Searching should search the entire cookbook rather than only the currently
  // selected cuisine or food-type filter.
  if ((search.value || '').trim()) {
    activeFilter = 'all';
    activeCuisine = 'all';
    activeAsianSubcuisine = 'all';
    filters.forEach(b => b.classList.toggle('active', (b.dataset.filter || 'all') === 'all'));
    cuisineFiltersWrap?.querySelectorAll('.cuisine-filter').forEach(b => {
      b.classList.toggle('active', (b.dataset.cuisine || '') === 'all');
    });
    if (asianSubcuisineGroup) asianSubcuisineGroup.hidden = true;
  }
  updateRecipes();
});


filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  activeFilter = button.dataset.filter || 'all';
  updateRecipes();
}));

populateCuisineFilter();
populateAsianSubcuisines();
populateLatinSubcuisines();
updateRecipes();

// Recipe images are served only from local GitHub Pages assets.


const FEATURED_MAINS = [
  {title:'Mediterranean Lemon Shallot Chicken',slug:'mediterranean-lemon-shallot-chicken',description:'Bright, savory chicken with lemon, shallots, capers, and fresh herbs.'},
  {title:'Moo Shu Chicken',slug:'moo-shu-chicken',description:'Tender chicken with vegetables, mushrooms, egg, hoisin, and warm pancakes.'},
  {title:'Boeuf Bourguignon',slug:'boeuf-bourguignon',description:'Classic French beef slowly braised in red wine with mushrooms, pearl onions, and herbs.'},
  {title:'Balsamic and Rosemary-Marinated Florentine Steak',slug:'florentine-steak-balsamic-rosemary',description:'A thick-cut Florentine-style steak with balsamic, rosemary, garlic, and olive oil.'},
  {title:'Pork Chop Milanese',slug:'pork-chop-milanese',description:'Crisp, golden breaded pork chop with lemon and a peppery arugula salad.'},
  {title:'Veal Piccata',slug:'veal-piccata',description:'Thin veal cutlets in a bright lemon-butter sauce with capers and parsley.'},
  {title:'Osso Buco with Red Wine',slug:'osso-buco-red-wine',description:'Slow-braised veal shanks in red wine, tomato, aromatics, and herbs.'},
  {title:'Stracotto di Fassona Piemontese',slug:'stracotto-di-fassona-piemontese',description:'Piedmontese-style beef slowly braised in red wine with vegetables and herbs.'},
  {title:'Herb-Crusted Salmon',slug:'herb-crusted-salmon',description:'Roasted salmon with a crisp herb, garlic, and breadcrumb crust.'},
  {title:'Lemon-Stuffed Grilled Branzino',slug:'lemon-stuffed-grilled-branzino',description:'Whole branzino stuffed with lemon and herbs and grilled until crisp-skinned.'},
  {title:'Swordfish Sicilian-Style',slug:'swordfish-sicilian-style',description:'Seared swordfish with cherry tomatoes, olives, capers, garlic, and lemon.'},
  {title:'Shrimp Saganaki',slug:'shrimp-saganaki',description:'Greek-style shrimp baked in garlicky tomato sauce with feta and fresh herbs.'},
  {title:'Shrimp Piccata Skewers',slug:'shrimp-piccata-skewers',description:'Grilled shrimp skewers finished with bright lemon-caper piccata butter.'},
  {title:'Cajun Garlic Butter Shrimp',slug:'cajun-garlic-butter-shrimp',description:'Juicy shrimp seared with Cajun seasoning and finished in garlicky browned butter.'},
  {title:'Shrimp & Herb Stir-Fry',slug:'shrimp-herb-stir-fry',description:'A fast stir-fry with shrimp, snap peas, peppers, garlic, and fresh herbs.'},
  {title:'Creamy Seafood Risotto',slug:'creamy-seafood-risotto',description:'Silky Arborio rice with shrimp, scallops, mussels, white wine, and seafood stock.'},
  {title:'Zucchini Risotto with Shrimp',slug:'zucchini-risotto-shrimp',description:'Creamy risotto with tender zucchini, sautéed shrimp, lemon, and herbs.'},
  {title:'Spaghetti Carbonara',slug:'spaghetti-carbonara',description:'Traditional Roman carbonara with guanciale, egg, Pecorino Romano, and black pepper.'},
  {title:'Rigatoni with Pork Ragù and Fresh Ricotta',slug:'rigatoni-pork-ragu-ricotta',description:'Slow-simmered pork ragù with rigatoni and cool, creamy fresh ricotta.'},
  {title:'Zucchini “Lasagna”',slug:'zucchini-lasagna',description:'A lighter lasagna layered with zucchini, ricotta, tomato sauce, mozzarella, and basil.'}
];

function setRecipeOfTheDay() {
  const image = document.getElementById('featuredRecipeImage');
  const title = document.getElementById('featuredRecipeTitle');
  const description = document.getElementById('featuredRecipeDescription');
  const link = document.getElementById('featuredRecipeLink');
  if (!image || !title || !description || !link || !FEATURED_MAINS.length) return;

  const now = new Date();
  const dayKey = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  const recipe = FEATURED_MAINS[((dayKey % FEATURED_MAINS.length) + FEATURED_MAINS.length) % FEATURED_MAINS.length];

  image.src = 'assets/' + recipe.slug + '.png';
  image.alt = recipe.title;
  title.textContent = recipe.title;
  description.textContent = recipe.description;
  link.href = recipe.slug + '.html';
}

setRecipeOfTheDay();

const MOTHER_SAUCE_LINKS = {
  "zucchini-lasagna.html": [["BÉCHAMEL","Optional classical variation: use béchamel as part of the creamy layer.","bechamel-sauce.html"]],
  "eggplant-parmesan.html": [["BÉCHAMEL","Optional richer baked variation.","bechamel-sauce.html"],["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "new-orleans-shrimp-corn-bisque.html": [["VELOUTÉ","Related roux-and-stock thickening technique.","veloute-sauce.html"]],
  "spicy-cajun-shrimp-corn-chowder.html": [["VELOUTÉ","Related stock-and-cream sauce technique.","veloute-sauce.html"]],
  "boeuf-bourguignon.html": [["ESPAGNOLE","Related classical brown-sauce technique using stock, flour, aromatics, and reduction.","espagnole-sauce.html"]],
  "stracotto-di-fassona-piemontese.html": [["ESPAGNOLE","Related brown-stock and braising-sauce technique.","espagnole-sauce.html"]],
  "gnocchi-alla-sorrentina.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "pasta-alla-norma.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "penne-arrabbiata.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "rigatoni-amatriciana.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "bucatini-amatriciana.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "milanesa-napolitana.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "shrimp-saganaki.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "shrimp-creole.html": [["SAUCE TOMATE","Creole tomato sauce uses a related tomato-and-aromatics foundation.","sauce-tomate.html"]],
  "noquis-con-tuco.html": [["SAUCE TOMATE","Tuco uses a related long-simmered tomato-sauce foundation.","sauce-tomate.html"]],
  "herb-crusted-salmon.html": [["HOLLANDAISE","Optional classical pairing for salmon.","hollandaise-sauce.html"]],
  "lemon-stuffed-grilled-branzino.html": [["HOLLANDAISE","Optional classical pairing for delicate fish.","hollandaise-sauce.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=MOTHER_SAUCE_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".mother-sauce-tip")) return;
  const btn=document.querySelector(".print-button");
  if(!btn) return;
  const wrap=document.createElement("div");
  wrap.className="mother-sauce-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#faf7f2";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MOTHER SAUCE CROSS-REFERENCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('')+'<a class="text-link" href="mother-sauces-guide.html">See all five French mother sauces →</a>';
  btn.insertAdjacentElement("afterend",wrap);
})();

const BECHAMEL_DAUGHTER_LINKS = {
  "zucchini-lasagna.html":[["MORNAY","Optional cheesy Béchamel variation for the creamy layer.","mornay-sauce.html"],["CRÈME SAUCE","Optional richer white-sauce layer.","creme-sauce.html"]],
  "eggplant-parmesan.html":[["MORNAY","Optional cheese-sauce variation for a richer baked finish.","mornay-sauce.html"]],
  "gnocchi-gorgonzola.html":[["MORNAY","Related cheese-sauce technique for a smoother cheese emulsion.","mornay-sauce.html"]],
  "roasted-broccoli-lemon-almonds.html":[["CHEDDAR CHEESE SAUCE","Optional pairing for roasted broccoli.","cheddar-cheese-sauce.html"],["MORNAY","Optional French cheese-sauce pairing.","mornay-sauce.html"]],
  "roasted-cauliflower.html":[["CHEDDAR CHEESE SAUCE","Optional pairing for roasted cauliflower.","cheddar-cheese-sauce.html"],["MORNAY","Optional gratin-style sauce.","mornay-sauce.html"]],
  "baked-cauliflower.html":[["CHEDDAR CHEESE SAUCE","Optional classic cheese-sauce pairing.","cheddar-cheese-sauce.html"],["MORNAY","Optional French cheese-sauce pairing.","mornay-sauce.html"]],
  "pure-de-papas.html":[["CHEDDAR CHEESE SAUCE","Optional topping for mashed potatoes.","cheddar-cheese-sauce.html"]],
  "classic-american-hamburger.html":[["CHEDDAR CHEESE SAUCE","Optional pourable cheddar topping.","cheddar-cheese-sauce.html"]],
  "herb-crusted-salmon.html":[["MUSTARD SAUCE","Dijon Béchamel makes a complementary creamy sauce for salmon.","mustard-sauce-bechamel.html"],["NANTUA","Optional shellfish-enriched classical pairing.","nantua-sauce.html"]],
  "lemon-stuffed-grilled-branzino.html":[["NANTUA","Optional classical shellfish sauce for delicate fish.","nantua-sauce.html"],["MUSTARD SAUCE","Optional Dijon cream-style pairing.","mustard-sauce-bechamel.html"]],
  "shrimp-piccata-skewers.html":[["NANTUA","Optional shellfish-on-shellfish classical sauce pairing.","nantua-sauce.html"]],
  "venetian-shrimp-polenta.html":[["NANTUA","Optional crayfish/shrimp-enriched sauce variation.","nantua-sauce.html"]],
  "creamy-seafood-risotto.html":[["NANTUA","Related shellfish cream-sauce profile; use sparingly as an optional garnish.","nantua-sauce.html"]],
  "pork-chop-milanese.html":[["MUSTARD SAUCE","Optional creamy Dijon sauce for pork.","mustard-sauce-bechamel.html"]],
  "veal-piccata.html":[["MUSTARD SAUCE","Optional creamy mustard variation for veal.","mustard-sauce-bechamel.html"]],
  "mediterranean-lemon-shallot-chicken.html":[["MUSTARD SAUCE","Optional creamy Dijon pairing for chicken.","mustard-sauce-bechamel.html"],["SOUBISE","Optional onion-forward classical pairing.","soubise-sauce.html"]],
  "sage-mushroom-chicken-skillet.html":[["CRÈME SAUCE","Optional cream-enriched Béchamel variation for the pan sauce.","creme-sauce.html"]],
  "zurich-style-veal-creamy-mushroom-sauce.html":[["CRÈME SAUCE","Related classical cream-sauce technique.","creme-sauce.html"],["SOUBISE","Optional onion-enriched variation.","soubise-sauce.html"]],
  "florentine-steak-balsamic-rosemary.html":[["SOUBISE","Optional mellow onion sauce for steak.","soubise-sauce.html"]],
  "bife-de-chorizo-chimichurri.html":[["SOUBISE","Optional classical onion sauce alternative to chimichurri.","soubise-sauce.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=BECHAMEL_DAUGHTER_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".daughter-sauce-tip")) return;
  const anchor=document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="daughter-sauce-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fffaf2";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">BÉCHAMEL DAUGHTER SAUCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('')+'<a class="text-link" href="bechamel-sauce.html">See Béchamel and all daughter sauces →</a>';
  anchor.insertAdjacentElement("afterend",wrap);
})();

const VELOUTE_DAUGHTER_LINKS = {
  "mediterranean-lemon-shallot-chicken.html":[["SUPRÊME","Optional cream-finished chicken velouté pairing.","supreme-sauce.html"],["VENETIAN SAUCE","Herb-forward velouté pairing with shallot and tarragon.","venetian-sauce-veloute.html"]],
  "sage-mushroom-chicken-skillet.html":[["SUPRÊME","Optional classical cream sauce for chicken.","supreme-sauce.html"],["POULETTE","Mushroom, lemon, and parsley make this especially compatible.","poulette-sauce.html"]],
  "pollo-a-la-parrilla.html":[["SUPRÊME","Optional classical cream sauce for grilled chicken.","supreme-sauce.html"],["HUNGARIAN SAUCE","Paprika and onion make a complementary velouté variation.","hungarian-sauce-veloute.html"]],
  "arroz-con-pollo-uruguayo.html":[["HUNGARIAN SAUCE","Optional paprika-and-onion velouté variation for chicken.","hungarian-sauce-veloute.html"]],
  "veal-piccata.html":[["ALLEMANDE","Veal velouté with egg yolk, cream, and lemon is a close classical pairing.","allemande-sauce.html"],["POULETTE","Optional mushroom-and-lemon velouté sauce.","poulette-sauce.html"]],
  "zurich-style-veal-creamy-mushroom-sauce.html":[["ALLEMANDE","Related veal velouté technique finished with cream and lemon.","allemande-sauce.html"],["POULETTE","Mushroom-based velouté variation pairs naturally with this dish.","poulette-sauce.html"]],
  "osso-buco-red-wine.html":[["ALLEMANDE","Optional classical veal-sauce alternative for a lighter presentation.","allemande-sauce.html"]],
  "herb-crusted-salmon.html":[["NORMANDE","Optional enriched fish-velouté pairing.","normande-sauce.html"],["BERCY","White wine, shallot, lemon, and parsley complement salmon.","bercy-sauce.html"],["VENETIAN SAUCE","Optional herb-forward fish velouté pairing.","venetian-sauce-veloute.html"]],
  "lemon-stuffed-grilled-branzino.html":[["NORMANDE","Optional rich fish-velouté pairing.","normande-sauce.html"],["BERCY","Classic white-wine and shallot sauce for delicate fish.","bercy-sauce.html"],["VENETIAN SAUCE","Tarragon and chervil make a delicate fish pairing.","venetian-sauce-veloute.html"]],
  "swordfish-sicilian-style.html":[["BERCY","Optional white-wine, shallot, lemon, and parsley pairing.","bercy-sauce.html"],["AURORA","Optional tomato-enriched velouté variation.","aurora-sauce.html"]],
  "white-wine-garlic-mussels.html":[["BERCY","Related shallot-and-white-wine fish-sauce technique.","bercy-sauce.html"]],
  "moules-marinieres.html":[["BERCY","Closely related white-wine and shallot flavor profile.","bercy-sauce.html"]],
  "shrimp-piccata-skewers.html":[["BERCY","Lemon, white wine, shallot, and parsley make a natural seafood pairing.","bercy-sauce.html"]],
  "venetian-shrimp-polenta.html":[["VENETIAN SAUCE","The tarragon-shallot velouté variation is a fitting optional pairing.","venetian-sauce-veloute.html"],["BERCY","White wine and shallot complement shrimp.","bercy-sauce.html"]],
  "creamy-seafood-risotto.html":[["NORMANDE","Optional fish-velouté enrichment for a more classical seafood presentation.","normande-sauce.html"]],
  "zucchini-risotto-shrimp.html":[["NORMANDE","Optional enriched fish-velouté pairing.","normande-sauce.html"]],
  "new-orleans-shrimp-corn-bisque.html":[["NORMANDE","Related fish-stock, cream, and liaison technique.","normande-sauce.html"],["AURORA","Optional tomato-enriched velouté variation.","aurora-sauce.html"]],
  "shrimp-creole.html":[["AURORA","Tomato-enriched velouté is a classical cousin to this tomato-based shrimp sauce.","aurora-sauce.html"]],
  "jambalaya.html":[["HUNGARIAN SAUCE","Optional paprika-forward velouté pairing for chicken and sausage elements.","hungarian-sauce-veloute.html"]],
  "chicken-and-andouille-gumbo.html":[["HUNGARIAN SAUCE","Paprika-and-onion velouté is a related savory sauce profile.","hungarian-sauce-veloute.html"]],
  "crawfish-etouffee.html":[["AURORA","Optional tomato-enriched velouté variation for shellfish.","aurora-sauce.html"],["NORMANDE","Optional rich fish-velouté pairing for crawfish.","normande-sauce.html"]],
  "blackened-redfish.html":[["BERCY","Bright white-wine and shallot sauce is a classic counterpoint to blackened fish.","bercy-sauce.html"],["NORMANDE","Optional richer fish-velouté pairing.","normande-sauce.html"]],
  "miso-mushroom-leek-pasta.html":[["POULETTE","Related mushroom-forward velouté technique; use as an optional French-style variation.","poulette-sauce.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=VELOUTE_DAUGHTER_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".veloute-daughter-tip")) return;
  const anchor=document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="veloute-daughter-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f6fafc";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">VELOUTÉ DAUGHTER SAUCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('')+'<a class="text-link" href="veloute-sauce.html">See Velouté and all daughter sauces →</a>';
  anchor.insertAdjacentElement("afterend",wrap);
})();

const HOLLANDAISE_DAUGHTER_LINKS = {
  "florentine-steak-balsamic-rosemary.html":[["BÉARNAISE","The classic tarragon-shallot Hollandaise derivative for steak.","bearnaise-sauce.html"],["CHORON","Tomato-enriched Béarnaise for a brighter steak sauce.","choron-sauce.html"],["FOYOT","Béarnaise enriched with meat glaze for an especially savory steak sauce.","foyot-sauce.html"]],
  "bife-de-chorizo-chimichurri.html":[["BÉARNAISE","Optional classical sauce alternative for strip steak.","bearnaise-sauce.html"],["CHORON","Optional tomato-tarragon variation for grilled beef.","choron-sauce.html"],["FOYOT","Optional meat-glaze Béarnaise for a richer presentation.","foyot-sauce.html"]],
  "asado-argentino.html":[["BÉARNAISE","Optional French-style sauce for the steak portions.","bearnaise-sauce.html"],["FOYOT","Optional rich sauce for grilled beef cuts.","foyot-sauce.html"]],
  "asado-uruguayo.html":[["BÉARNAISE","Optional classical sauce for grilled beef.","bearnaise-sauce.html"],["FOYOT","Optional rich Béarnaise derivative for steaks.","foyot-sauce.html"]],
  "pork-chop-milanese.html":[["DIJON HOLLANDAISE","Optional mustard-Hollandaise pairing for pork.","dijon-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise pairs well with crisp pork cutlets.","noisette-hollandaise.html"]],
  "veal-piccata.html":[["DIJON HOLLANDAISE","Optional mustard-Hollandaise variation for veal.","dijon-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise complements veal and lemon.","noisette-hollandaise.html"]],
  "herb-crusted-salmon.html":[["MOUSSELINE","Lightened Hollandaise is especially good with delicate salmon.","mousseline-hollandaise.html"],["MALTAISE","Blood-orange Hollandaise adds a citrus pairing for salmon.","maltaise-sauce.html"],["DIJON HOLLANDAISE","Optional mustard-Hollandaise pairing.","dijon-hollandaise.html"],["NOISETTE","Nutty browned-butter Hollandaise pairs naturally with roasted salmon.","noisette-hollandaise.html"]],
  "lemon-stuffed-grilled-branzino.html":[["MOUSSELINE","Airy Hollandaise is a delicate pairing for branzino.","mousseline-hollandaise.html"],["MALTAISE","Blood-orange Hollandaise works as a bright citrus pairing.","maltaise-sauce.html"],["NOISETTE","Brown-butter Hollandaise adds nutty richness to grilled fish.","noisette-hollandaise.html"]],
  "swordfish-sicilian-style.html":[["MALTAISE","Blood-orange Hollandaise is an optional citrus-forward pairing for swordfish.","maltaise-sauce.html"],["DIJON HOLLANDAISE","Optional mustard-Hollandaise for seared swordfish.","dijon-hollandaise.html"]],
  "blackened-redfish.html":[["MOUSSELINE","Light Hollandaise softens the heat of blackened fish.","mousseline-hollandaise.html"],["DIJON HOLLANDAISE","Mustard-Hollandaise adds tangy richness.","dijon-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise complements the toasted spice crust.","noisette-hollandaise.html"]],
  "shrimp-piccata-skewers.html":[["MOUSSELINE","Lightened Hollandaise is a refined shellfish pairing.","mousseline-hollandaise.html"],["MALTAISE","Blood-orange Hollandaise gives shrimp a bright citrus counterpoint.","maltaise-sauce.html"]],
  "venetian-shrimp-polenta.html":[["MOUSSELINE","Optional airy Hollandaise for shrimp.","mousseline-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise complements shrimp and polenta.","noisette-hollandaise.html"]],
  "buttery-shrimp-peas-potatoes.html":[["NOISETTE","Brown-butter Hollandaise echoes the buttery shrimp and potatoes.","noisette-hollandaise.html"],["DIJON HOLLANDAISE","Optional mustard-Hollandaise variation.","dijon-hollandaise.html"]],
  "roasted-broccoli-lemon-almonds.html":[["MOUSSELINE","Light Hollandaise is an optional vegetable sauce.","mousseline-hollandaise.html"],["MALTAISE","Citrus Hollandaise pairs well with roasted broccoli.","maltaise-sauce.html"],["NOISETTE","Brown-butter Hollandaise complements toasted almonds.","noisette-hollandaise.html"]],
  "roasted-cauliflower.html":[["MOUSSELINE","Airy Hollandaise is an optional classical vegetable sauce.","mousseline-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise pairs especially well with roasted cauliflower.","noisette-hollandaise.html"]],
  "baked-cauliflower.html":[["DIJON HOLLANDAISE","Optional mustard-Hollandaise for baked cauliflower.","dijon-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise adds nutty richness.","noisette-hollandaise.html"]],
  "mediterranean-lemon-shallot-chicken.html":[["DIJON HOLLANDAISE","Optional mustard-Hollandaise pairing for chicken.","dijon-hollandaise.html"],["MALTAISE","Optional citrus Hollandaise pairing.","maltaise-sauce.html"]],
  "pollo-a-la-parrilla.html":[["BÉARNAISE","Optional herb-forward Hollandaise derivative for grilled chicken.","bearnaise-sauce.html"],["DIJON HOLLANDAISE","Optional mustard-Hollandaise pairing.","dijon-hollandaise.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=HOLLANDAISE_DAUGHTER_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".hollandaise-daughter-tip")) return;
  const anchor=document.querySelector(".veloute-daughter-tip") || document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="hollandaise-daughter-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff8e8";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">HOLLANDAISE DAUGHTER SAUCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('')+'<a class="text-link" href="hollandaise-sauce.html">See Hollandaise and all daughter sauces →</a>';
  anchor.insertAdjacentElement("afterend",wrap);
})();

const TOMATE_DAUGHTER_LINKS = {
  "shrimp-creole.html":[["CREOLE SAUCE","Direct family match: tomato, holy trinity, herbs, and Creole seasoning.","creole-sauce.html"]],
  "jambalaya.html":[["CREOLE SAUCE","Related Creole tomato-and-aromatics profile.","creole-sauce.html"],["SPANISH SAUCE","Pepper, tomato, and paprika make a useful optional variation.","spanish-tomato-sauce.html"]],
  "chicken-and-andouille-gumbo.html":[["CREOLE SAUCE","Optional Creole tomato sauce variation for a more tomato-forward style.","creole-sauce.html"]],
  "new-orleans-bbq-shrimp.html":[["CREOLE SAUCE","Optional tomato-based New Orleans variation alongside the buttery preparation.","creole-sauce.html"]],
  "blackened-redfish.html":[["CREOLE SAUCE","Classic tomato-based Creole pairing for blackened fish.","creole-sauce.html"]],
  "pollo-al-disco.html":[["SPANISH SAUCE","Tomato, peppers, onion, and paprika align closely with this chicken dish.","spanish-tomato-sauce.html"],["PORTUGUESE SAUCE","Optional paprika-and-tomato variation.","portuguese-sauce.html"]],
  "arroz-con-pollo-uruguayo.html":[["SPANISH SAUCE","Optional pepper-and-paprika tomato sauce pairing.","spanish-tomato-sauce.html"]],
  "swordfish-sicilian-style.html":[["PROVENÇALE","Tomato, garlic, herbs, olives, and capers closely mirror this Mediterranean profile.","provencale-sauce.html"]],
  "shrimp-saganaki.html":[["PROVENÇALE","Related tomato, garlic, herb, and olive-forward Mediterranean profile.","provencale-sauce.html"]],
  "cioppino.html":[["PROVENÇALE","Optional southern French-style tomato base for seafood stew.","provencale-sauce.html"]],
  "roasted-eggplant-cherry-tomatoes.html":[["PROVENÇALE","Directly compatible with garlic, herbs, olives, and capers.","provencale-sauce.html"]],
  "pasta-alla-norma.html":[["MARINARA","A simple tomato-garlic-herb base can stand in for the sauce.","marinara-sauce.html"],["NEAPOLITAN SAUCE","Southern Italian tomato-basil profile is especially compatible.","neapolitan-sauce.html"]],
  "eggplant-parmesan.html":[["MARINARA","Classic tomato sauce choice for layering.","marinara-sauce.html"],["NEAPOLITAN SAUCE","Alternative tomato-basil sauce for the bake.","neapolitan-sauce.html"]],
  "gnocchi-alla-sorrentina.html":[["MARINARA","Simple tomato-garlic sauce works well with gnocchi and mozzarella.","marinara-sauce.html"],["NEAPOLITAN SAUCE","Especially natural southern Italian pairing.","neapolitan-sauce.html"]],
  "zucchini-lasagna.html":[["MARINARA","Direct tomato-sauce option for layering.","marinara-sauce.html"]],
  "milanesa-napolitana.html":[["NEAPOLITAN SAUCE","Natural tomato-basil sauce for the Napolitana topping.","neapolitan-sauce.html"],["MARINARA","Simple tomato sauce alternative.","marinara-sauce.html"]],
  "penne-arrabbiata.html":[["MARINARA","Related tomato-garlic base; add chile for arrabbiata character.","marinara-sauce.html"]],
  "rigatoni-amatriciana.html":[["MARINARA","Related tomato base; guanciale and Pecorino define the final sauce.","marinara-sauce.html"]],
  "bucatini-amatriciana.html":[["MARINARA","Related tomato base; guanciale and Pecorino define the final sauce.","marinara-sauce.html"]],
  "noquis-con-tuco.html":[["BOLOGNESE","Optional meat-ragù direction for the gnocchi.","bolognese-sauce-daughter.html"],["NEAPOLITAN SAUCE","Optional lighter tomato-basil alternative.","neapolitan-sauce.html"]],
  "bolognese-meat-sauce.html":[["BOLOGNESE","Direct match to the classic slow meat-ragù family.","bolognese-sauce-daughter.html"]],
  "rigatoni-pork-ragu-ricotta.html":[["BOLOGNESE","Related slow meat-ragù technique with soffritto, wine, and tomato.","bolognese-sauce-daughter.html"]],
  "pasta-ncasciata.html":[["BOLOGNESE","Related meat-ragù foundation for the baked pasta.","bolognese-sauce-daughter.html"]],
  "osso-buco-red-wine.html":[["PORTUGUESE SAUCE","Optional tomato, garlic, paprika, and wine variation for braised veal.","portuguese-sauce.html"]],
  "mediterranean-lemon-shallot-chicken.html":[["PORTUGUESE SAUCE","Optional tomato-paprika variation for chicken.","portuguese-sauce.html"],["PROVENÇALE","Optional garlic-herb tomato variation.","provencale-sauce.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=TOMATE_DAUGHTER_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".tomate-daughter-tip")) return;
  const anchor=document.querySelector(".hollandaise-daughter-tip") || document.querySelector(".veloute-daughter-tip") || document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="tomate-daughter-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff5f2";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">SAUCE TOMATE FAMILY</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('')+'<a class="text-link" href="sauce-tomate.html">See Sauce Tomate and related sauces →</a>';
  anchor.insertAdjacentElement("afterend",wrap);
})();

const MEXICAN_SAUCE_LINKS = {
  "tomatillo-avocado-salsa-cauliflower-rice.html":[["SALSA VERDE","Direct tomatillo-salsa family match.","salsa-verde.html"],["SALSA TAQUERA","Optional taco-style chile salsa for extra heat.","salsa-taquera.html"]],
  "lemon-tomatillo-salsa-verde.html":[["SALSA VERDE","Direct classical tomatillo-salsa reference.","salsa-verde.html"]],
  "classic-american-hamburger.html":[["SALSA ROJA","Optional spicy tomato salsa topping.","salsa-roja.html"],["PICO DE GALLO","Fresh topping alternative.","pico-de-gallo.html"],["SALSA MACHA","Chile-oil condiment for a smoky-hot variation.","salsa-macha.html"]],
  "florentine-steak-balsamic-rosemary.html":[["SALSA TAQUERA","Optional chile-forward steak sauce.","salsa-taquera.html"],["SALSA MACHA","Excellent chile-oil pairing for grilled steak.","salsa-macha.html"],["ADOBO","Use as an alternative chile-vinegar marinade.","mexican-adobo.html"]],
  "bife-de-chorizo-chimichurri.html":[["SALSA TAQUERA","Optional taquería-style salsa for grilled beef.","salsa-taquera.html"],["SALSA MACHA","Nutty chile-oil pairing for steak.","salsa-macha.html"],["PICO DE GALLO","Fresh acidic counterpoint to grilled beef.","pico-de-gallo.html"]],
  "asado-argentino.html":[["SALSA ROJA","Optional grilled-meat salsa.","salsa-roja.html"],["SALSA MACHA","Optional chile-oil condiment for beef and sausage.","salsa-macha.html"]],
  "asado-uruguayo.html":[["SALSA ROJA","Optional red salsa for grilled meats.","salsa-roja.html"],["SALSA MACHA","Optional chile-oil condiment.","salsa-macha.html"]],
  "pollo-a-la-parrilla.html":[["SALSA VERDE","Bright tomatillo salsa for grilled chicken.","salsa-verde.html"],["SALSA RANCHERA","Smoky roasted tomato salsa pairing.","salsa-ranchera.html"],["ADOBO","Use as an alternative chile-vinegar marinade.","mexican-adobo.html"],["MOLE POBLANO","Optional rich Puebla-style sauce for chicken.","mole-poblano.html"]],
  "mediterranean-lemon-shallot-chicken.html":[["SALSA VERDE","Optional fresh tomatillo variation.","salsa-verde.html"],["MOLE POBLANO","Alternative rich sauce direction for chicken.","mole-poblano.html"],["ADOBO","Alternative dried-chile marinade for chicken.","mexican-adobo.html"]],
  "sage-mushroom-chicken-skillet.html":[["MOLE NEGRO","Optional deep Oaxacan-style sauce for chicken.","mole-negro.html"],["MOLE POBLANO","Optional richer chile-chocolate sauce direction.","mole-poblano.html"]],
  "arroz-con-pollo-uruguayo.html":[["SALSA RANCHERA","Smoky tomato salsa works well alongside chicken and rice.","salsa-ranchera.html"],["PICO DE GALLO","Fresh topping for rice and chicken.","pico-de-gallo.html"]],
  "shrimp-piccata-skewers.html":[["SALSA VERDE","Bright tomatillo salsa for grilled shrimp.","salsa-verde.html"],["SALSA MACHA","Chile-oil condiment for shrimp.","salsa-macha.html"],["PICO DE GALLO","Fresh topping for grilled shrimp.","pico-de-gallo.html"]],
  "cajun-garlic-butter-shrimp.html":[["SALSA DE CHILE DE ÁRBOL","Fiery chile salsa for shrimp.","salsa-chile-de-arbol.html"],["SALSA MACHA","Chile-oil condiment for a Mexican-style variation.","salsa-macha.html"]],
  "spicy-garlic-butter-shrimp-lime-chili-dip.html":[["SALSA DE CHILE DE ÁRBOL","Natural high-heat salsa pairing.","salsa-chile-de-arbol.html"],["SALSA VERDE","Bright tomatillo alternative.","salsa-verde.html"]],
  "blackened-redfish.html":[["SALSA VERDE","Acidic tomatillo salsa balances blackened fish.","salsa-verde.html"],["PICO DE GALLO","Fresh tomato topping for spicy fish.","pico-de-gallo.html"]],
  "red-beans-rice-andouille.html":[["SALSA DE CHILE DE ÁRBOL","Hot chile salsa for beans and sausage.","salsa-chile-de-arbol.html"],["SALSA RANCHERA","Tomato-chile condiment for beans and rice.","salsa-ranchera.html"]],
  "locro.html":[["SALSA DE CHILE DE ÁRBOL","Optional hot chile condiment for stew.","salsa-chile-de-arbol.html"],["SALSA MACHA","Oil-based chile condiment for serving.","salsa-macha.html"]],
  "chivito.html":[["PICO DE GALLO","Optional fresh tomato-onion topping.","pico-de-gallo.html"],["SALSA TAQUERA","Optional spicy sandwich condiment.","salsa-taquera.html"]],
  "chivito-al-plato.html":[["PICO DE GALLO","Fresh topping alternative for steak and fries.","pico-de-gallo.html"],["SALSA VERDE","Bright tomatillo sauce for the steak.","salsa-verde.html"]],
  "pork-chop-milanese.html":[["ADOBO","Alternative chile-vinegar marinade before breading or grilling.","mexican-adobo.html"],["SALSA RANCHERA","Smoky tomato sauce pairing for pork.","salsa-ranchera.html"]],
  "osso-buco-red-wine.html":[["ADOBO","Alternative chile-vinegar braising direction for veal.","mexican-adobo.html"],["MOLE NEGRO","Optional deep chile-spice sauce for braised meat.","mole-negro.html"]],
  "provoleta.html":[["SALSA MACHA","Chile-oil condiment for grilled cheese.","salsa-macha.html"],["PICO DE GALLO","Fresh acidic topping for melted cheese.","pico-de-gallo.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=MEXICAN_SAUCE_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".mexican-sauce-tip")) return;
  const anchor=document.querySelector(".tomate-daughter-tip") || document.querySelector(".hollandaise-daughter-tip") || document.querySelector(".veloute-daughter-tip") || document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="mexican-sauce-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff8f0";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN SAUCE PAIRING</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const MEXICAN_SAUCE_LINKS_2 = {
  "tomatillo-avocado-salsa-cauliflower-rice.html":[["SALSA DE TOMATILLO","Direct tomatillo-salsa match.","salsa-tomatillo.html"],["SALSA DE AGUACATE","Creamy avocado-tomatillo variation.","salsa-aguacate.html"]],
  "lemon-tomatillo-salsa-verde.html":[["SALSA DE TOMATILLO","Direct reference for the classic tomatillo base.","salsa-tomatillo.html"]],
  "florentine-steak-balsamic-rosemary.html":[["SALSA DE GUAJILLO","Mild earthy chile sauce for grilled steak.","salsa-guajillo.html"],["SALSA BORRACHA","Traditional grilled-meat pairing.","salsa-borracha.html"],["SALSA MORITA","Smoky chile pairing for steak.","salsa-morita.html"],["SALSA DE MOLCAJETE","Rustic roasted salsa for grilled beef.","salsa-molcajete.html"]],
  "bife-de-chorizo-chimichurri.html":[["SALSA DE GUAJILLO","Optional mild chile sauce for grilled beef.","salsa-guajillo.html"],["SALSA BORRACHA","Classic barbacoa-style salsa pairing.","salsa-borracha.html"],["SALSA MORITA","Smoky alternative to chimichurri.","salsa-morita.html"]],
  "asado-argentino.html":[["SALSA BORRACHA","Especially suited to grilled meats.","salsa-borracha.html"],["SALSA DE MOLCAJETE","Rustic roasted salsa for the parrilla.","salsa-molcajete.html"]],
  "asado-uruguayo.html":[["SALSA BORRACHA","Optional grilled-meat salsa.","salsa-borracha.html"],["SALSA DE MOLCAJETE","Rustic charred salsa for beef and sausage.","salsa-molcajete.html"]],
  "pollo-a-la-parrilla.html":[["SALSA DE TOMATILLO","Bright green salsa for grilled chicken.","salsa-tomatillo.html"],["SALSA DE AGUACATE","Creamy cooling salsa for grilled chicken.","salsa-aguacate.html"],["SALSA MORITA","Smoky red chile sauce for chicken.","salsa-morita.html"],["SALSA XNI-PEC","Fresh Yucatecan habanero salsa for grilled poultry.","salsa-xni-pec.html"]],
  "mediterranean-lemon-shallot-chicken.html":[["SALSA DE GUAJILLO","Alternative chile-forward sauce direction.","salsa-guajillo.html"],["SALSA DE CHIPOTLE","Smoky tomato-chipotle pairing.","salsa-chipotle.html"]],
  "arroz-con-pollo-uruguayo.html":[["SALSA DE CHIPOTLE","Smoky salsa alongside chicken and rice.","salsa-chipotle.html"],["SALSA DE AGUACATE","Creamy topping for rice and chicken.","salsa-aguacate.html"]],
  "shrimp-piccata-skewers.html":[["SALSA DE TOMATILLO","Bright acidic salsa for grilled shrimp.","salsa-tomatillo.html"],["SALSA DE AGUACATE","Creamy avocado pairing.","salsa-aguacate.html"],["SALSA XNI-PEC","Fresh habanero-citrus topping.","salsa-xni-pec.html"]],
  "cajun-garlic-butter-shrimp.html":[["SALSA HABANERO","Very hot citrusy salsa for shrimp.","salsa-habanero.html"],["SALSA MORITA","Smoky chile pairing.","salsa-morita.html"]],
  "spicy-garlic-butter-shrimp-lime-chili-dip.html":[["SALSA HABANERO","Extra-hot citrus-forward pairing.","salsa-habanero.html"],["SALSA DE AGUACATE","Cooling creamy counterpoint.","salsa-aguacate.html"]],
  "blackened-redfish.html":[["SALSA XNI-PEC","Fresh citrus-habanero salsa cuts through blackened spice.","salsa-xni-pec.html"],["SALSA DE AGUACATE","Cooling creamy salsa for spicy fish.","salsa-aguacate.html"]],
  "pork-chop-milanese.html":[["SALSA DE GUAJILLO","Mild dried-chile sauce for pork.","salsa-guajillo.html"],["SALSA DE CACAHUATE","Nutty chile sauce pairs naturally with pork.","salsa-cacahuate.html"],["SALSA MORITA","Smoky chile sauce for pork.","salsa-morita.html"]],
  "locro.html":[["SALSA MORITA","Smoky chile condiment for pork-rich stew.","salsa-morita.html"],["SALSA DE CACAHUATE","Optional nutty chile condiment.","salsa-cacahuate.html"]],
  "red-beans-rice-andouille.html":[["SALSA DE CHIPOTLE","Smoky salsa for beans and sausage.","salsa-chipotle.html"],["SALSA MORITA","Smoky dried-chile pairing.","salsa-morita.html"]],
  "classic-american-hamburger.html":[["SALSA DE CHIPOTLE","Smoky burger topping.","salsa-chipotle.html"],["SALSA DE AGUACATE","Creamy avocado topping.","salsa-aguacate.html"],["SALSA DE MOLCAJETE","Rustic tomato-chile topping.","salsa-molcajete.html"]],
  "chivito.html":[["SALSA DE AGUACATE","Creamy topping variation.","salsa-aguacate.html"],["SALSA DE MOLCAJETE","Rustic grilled-meat salsa.","salsa-molcajete.html"]],
  "chivito-al-plato.html":[["SALSA DE MOLCAJETE","Charred salsa for steak and fries.","salsa-molcajete.html"],["SALSA XNI-PEC","Fresh habanero-citrus contrast.","salsa-xni-pec.html"]],
  "provoleta.html":[["SALSA MORITA","Smoky chile sauce for grilled cheese.","salsa-morita.html"],["SALSA DE CACAHUATE","Nutty spicy sauce for melted cheese.","salsa-cacahuate.html"]],
  "roasted-cauliflower.html":[["SALSA DE CACAHUATE","Nutty chile sauce for roasted vegetables.","salsa-cacahuate.html"],["SALSA DE AGUACATE","Creamy avocado salsa for roasted vegetables.","salsa-aguacate.html"]],
  "roasted-broccoli-lemon-almonds.html":[["SALSA DE CACAHUATE","Peanut chile sauce complements toasted nuts.","salsa-cacahuate.html"]],
  "osso-buco-red-wine.html":[["SALSA DE GUAJILLO","Optional chile-based sauce direction for braised meat.","salsa-guajillo.html"],["SALSA MORITA","Smoky alternative for braised veal.","salsa-morita.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=MEXICAN_SAUCE_LINKS_2[p];
  if(!refs || !refs.length || document.querySelector(".mexican-sauce-tip-2")) return;
  const anchor=document.querySelector(".mexican-sauce-tip") || document.querySelector(".tomate-daughter-tip") || document.querySelector(".hollandaise-daughter-tip") || document.querySelector(".veloute-daughter-tip") || document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="mexican-sauce-tip-2";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff8f0";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN SALSA PAIRING</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See salsa →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const PERUVIAN_RECIPE_LINKS = {
  "lomo-saltado.html":[["MEAT GUIDE","High-heat searing and salting technique apply directly to the beef.","meat-guide.html"],["SALSA DE GUAJILLO","Optional mild chile sauce for the steak.","salsa-guajillo.html"],["SALSA DE MOLCAJETE","Optional roasted salsa for serving.","salsa-molcajete.html"]],
  "aji-de-gallina.html":[["SUPRÊME","Related cream-finished chicken-sauce technique.","supreme-sauce.html"],["SALSA DE AJÍ / SALSA VERDE","For a brighter chile contrast, serve a small amount alongside.","salsa-verde.html"]],
  "ceviche-peruano.html":[["SALSA XNI-PEC","Fresh habanero-citrus salsa is a natural optional pairing.","salsa-xni-pec.html"],["SALSA DE AGUACATE","Creamy avocado salsa can be served alongside.","salsa-aguacate.html"]],
  "pollo-a-la-brasa-peruano.html":[["MEAT GUIDE","Use the grilling, salting, and resting guidance for whole chicken.","meat-guide.html"],["SALSA VERDE","Bright tomatillo salsa for serving.","salsa-verde.html"],["SALSA DE AGUACATE","Cooling creamy salsa for grilled chicken.","salsa-aguacate.html"],["ADOBO","Related dried-chile marinade technique.","mexican-adobo.html"]],
  "arroz-con-mariscos-peruano.html":[["SEAFOOD PAIRING","Bright tomatillo salsa works well with seafood rice.","salsa-tomatillo.html"],["NORMANDE","Optional classical fish-stock cream-sauce reference.","normande-sauce.html"]],
  "seco-de-res.html":[["MEAT GUIDE","Braising and slow-cooking guidance apply directly to the beef.","meat-guide.html"],["SALSA DE GUAJILLO","Optional chile sauce for serving.","salsa-guajillo.html"],["SALSA BORRACHA","Optional grilled/braised meat condiment.","salsa-borracha.html"]],
  "tacu-tacu.html":[["SALSA CRIOLLA","Traditional bright onion-and-pepper accompaniment.","salsa-criolla.html"],["PICO DE GALLO","Fresh tomato-onion alternative.","pico-de-gallo.html"],["SALSA DE AGUACATE","Creamy topping option.","salsa-aguacate.html"]],
  "causa-rellena.html":[["SALSA DE AGUACATE","Avocado-based sauce complements the chilled potato layers.","salsa-aguacate.html"],["SALSA VERDE","Bright tomatillo sauce for a fresh contrast.","salsa-verde.html"]],
  "anticuchos-de-corazon.html":[["MEAT GUIDE","High-heat grilling, salting, and resting guidance apply.","meat-guide.html"],["SALSA DE GUAJILLO","Natural dried-chile accompaniment.","salsa-guajillo.html"],["SALSA MORITA","Smoky chile salsa for grilled heart.","salsa-morita.html"],["SALSA BORRACHA","Traditional grilled-meat style pairing.","salsa-borracha.html"]],
  "carapulcra.html":[["MEAT GUIDE","Slow-cooking and braising guidance apply to the pork.","meat-guide.html"],["SALSA DE CACAHUATE","Related peanut-chile flavor profile.","salsa-cacahuate.html"],["SALSA MORITA","Smoky chile condiment for serving.","salsa-morita.html"]],
  "salsa-criolla.html":[["TACU TACU","Classic accompaniment.","tacu-tacu.html"],["CARAPULCRA","Traditional bright side for the stew.","carapulcra.html"]],
  "pollo-a-la-parrilla.html":[["POLLO A LA BRASA","Compare with Peru's rotisserie-style marinated chicken.","pollo-a-la-brasa-peruano.html"]],
  "bife-de-chorizo-chimichurri.html":[["LOMO SALTADO","Compare a different South American steak tradition using high-heat stir-frying.","lomo-saltado.html"]],
  "creamy-seafood-risotto.html":[["ARROZ CON MARISCOS","Compare with Peru's ají-seasoned seafood rice.","arroz-con-mariscos-peruano.html"]],
  "shrimp-creole.html":[["ARROZ CON MARISCOS","Related seafood-and-rice flavor direction.","arroz-con-mariscos-peruano.html"]],
  "red-beans-rice-andouille.html":[["TACU TACU","Compare another rice-and-bean tradition.","tacu-tacu.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=PERUVIAN_RECIPE_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".peruvian-crossref-tip")) return;
  const anchor=document.querySelector(".mexican-sauce-tip-2") || document.querySelector(".mexican-sauce-tip") || document.querySelector(".tomate-daughter-tip") || document.querySelector(".hollandaise-daughter-tip") || document.querySelector(".veloute-daughter-tip") || document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="peruvian-crossref-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f8f6ef";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">PERUVIAN RECIPE CROSS-REFERENCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">View →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const PERUVIAN_SIDE_LINKS = {
  "papas-a-la-huancaina.html":[["CAUSA LIMEÑA","Another classic ají amarillo potato preparation.","causa-limena.html"],["CAUSA RELLENA","Compare a filled chilled potato preparation.","causa-rellena.html"],["AJÍ DE GALLINA","Shares the creamy ají amarillo flavor profile.","aji-de-gallina.html"]],
  "causa-limena.html":[["CAUSA RELLENA","Closely related layered potato preparation.","causa-rellena.html"],["SALSA DE AGUACATE","Avocado salsa works as an optional accompaniment.","salsa-aguacate.html"]],
  "yuca-frita.html":[["SALSA CRIOLLA","Bright onion relish for fried yuca.","salsa-criolla.html"],["SALSA DE AGUACATE","Creamy dipping sauce.","salsa-aguacate.html"],["POLLO A LA BRASA","Classic side option with roast chicken.","pollo-a-la-brasa-peruano.html"],["ANTICUCHOS","Excellent side for grilled skewers.","anticuchos-de-corazon.html"]],
  "arroz-peruano.html":[["SECO DE RES","Classic rice accompaniment.","seco-de-res.html"],["AJÍ DE GALLINA","Traditional side.","aji-de-gallina.html"],["CARAPULCRA","Ideal starch for the stew.","carapulcra.html"],["POLLO A LA BRASA","Simple rice side for roast chicken.","pollo-a-la-brasa-peruano.html"]],
  "solterito-arequipeno.html":[["ANTICUCHOS","Fresh salad alongside grilled meats.","anticuchos-de-corazon.html"],["SECO DE RES","Bright vegetable side for the braise.","seco-de-res.html"],["CHOCLO CON QUESO","Shares choclo and queso fresco ingredients.","choclo-con-queso.html"]],
  "ensalada-criolla-peruana.html":[["ANTICUCHOS","Classic bright accompaniment to grilled meat.","anticuchos-de-corazon.html"],["SECO DE RES","Fresh acidic side for the braise.","seco-de-res.html"],["CARAPULCRA","Cuts through the rich pork-and-peanut stew.","carapulcra.html"],["POLLO A LA BRASA","Fresh side for roast chicken.","pollo-a-la-brasa-peruano.html"],["TACU TACU","Natural onion-tomato accompaniment.","tacu-tacu.html"]],
  "choclo-con-queso.html":[["CEVICHE PERUANO","Classic accompaniment to ceviche.","ceviche-peruano.html"],["ANTICUCHOS","Traditional side for grilled skewers.","anticuchos-de-corazon.html"],["SOLTERITO AREQUIPEÑO","Shares choclo and queso fresco.","solterito-arequipeno.html"]],
  "papa-rellena-peruana.html":[["SALSA CRIOLLA","Traditional accompaniment.","salsa-criolla.html"],["ENSALADA CRIOLLA","Fresh onion-tomato side.","ensalada-criolla-peruana.html"],["SALSA DE AJÍ","Optional spicy salsa pairing.","salsa-roja.html"]],
  "tamal-peruano.html":[["SALSA CRIOLLA","Classic fresh accompaniment.","salsa-criolla.html"],["SALSA DE GUAJILLO","Dried-chile sauce pairs with pork or chicken filling.","salsa-guajillo.html"],["ADOBO","Related chile-and-spice flavor profile.","mexican-adobo.html"]],
  "camote-frito.html":[["CEVICHE PERUANO","Classic sweet-potato accompaniment.","ceviche-peruano.html"],["POLLO A LA BRASA","Crisp sweet-potato side for roast chicken.","pollo-a-la-brasa-peruano.html"],["ANTICUCHOS","Sweet counterpoint to smoky grilled beef heart.","anticuchos-de-corazon.html"]],
  "ceviche-peruano.html":[["CAMOTE FRITO","Classic sweet accompaniment.","camote-frito.html"],["CHOCLO CON QUESO","Choclo is a traditional ceviche side.","choclo-con-queso.html"]],
  "pollo-a-la-brasa-peruano.html":[["YUCA FRITA","Crisp cassava side.","yuca-frita.html"],["ARROZ PERUANO","Simple garlic rice side.","arroz-peruano.html"],["ENSALADA CRIOLLA","Fresh acidic side.","ensalada-criolla-peruana.html"],["CAMOTE FRITO","Sweet-potato alternative to fries.","camote-frito.html"]],
  "anticuchos-de-corazon.html":[["YUCA FRITA","Crisp cassava accompaniment.","yuca-frita.html"],["CHOCLO CON QUESO","Traditional corn-and-cheese side.","choclo-con-queso.html"],["ENSALADA CRIOLLA","Fresh acidic garnish.","ensalada-criolla-peruana.html"]],
  "seco-de-res.html":[["ARROZ PERUANO","Classic accompaniment.","arroz-peruano.html"],["ENSALADA CRIOLLA","Bright side for the cilantro braise.","ensalada-criolla-peruana.html"]],
  "carapulcra.html":[["ARROZ PERUANO","Ideal side for the stew.","arroz-peruano.html"],["ENSALADA CRIOLLA","Fresh counterpoint to rich pork and peanuts.","ensalada-criolla-peruana.html"]],
  "tacu-tacu.html":[["ENSALADA CRIOLLA","Fresh onion-tomato accompaniment.","ensalada-criolla-peruana.html"]],
  "aji-de-gallina.html":[["PAPAS A LA HUANCAÍNA","Related creamy ají amarillo preparation.","papas-a-la-huancaina.html"],["ARROZ PERUANO","Traditional rice accompaniment.","arroz-peruano.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=PERUVIAN_SIDE_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".peruvian-side-tip")) return;
  const anchor=document.querySelector(".peruvian-crossref-tip") || document.querySelector(".mexican-sauce-tip-2") || document.querySelector(".mexican-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="peruvian-side-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f5f8f2";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">PERUVIAN PAIRING</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">View →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const MEXICAN_MAIN_LINKS = {
  "tacos-al-pastor.html":[["MEAT GUIDE","Grilling, salting, and browning guidance apply to the pork.","meat-guide.html"],["ADOBO","The pork marinade is closely related to Mexican adobo.","mexican-adobo.html"],["SALSA DE GUAJILLO","Guajillo is central to the marinade and makes a natural table salsa.","salsa-guajillo.html"],["SALSA TAQUERA","Classic taco-shop pairing.","salsa-taquera.html"],["SALSA DE CHILE DE ÁRBOL","Traditional hot salsa pairing.","salsa-chile-de-arbol.html"]],
  "birria.html":[["MEAT GUIDE","Braising and slow-cooking techniques apply directly.","meat-guide.html"],["SALSA DE GUAJILLO","Direct chile-family match.","salsa-guajillo.html"],["SALSA MORITA","Smoky table salsa for birria tacos.","salsa-morita.html"],["SALSA BORRACHA","Optional robust meat-salsa pairing.","salsa-borracha.html"]],
  "mole-poblano-con-pollo.html":[["MOLE POBLANO","Uses the full Mole Poblano sauce recipe.","mole-poblano.html"],["ARROZ PERUANO","A simple garlic rice is an optional side if Mexican rice is not being served.","arroz-peruano.html"],["MEAT GUIDE","Poultry temperature and resting guidance apply.","meat-guide.html"]],
  "cochinita-pibil.html":[["MEAT GUIDE","Slow-roasting and resting guidance apply to pork shoulder.","meat-guide.html"],["SALSA XNI-PEC","Classic Yucatán pairing.","salsa-xni-pec.html"],["SALSA HABANERO","Natural regional hot-sauce pairing.","salsa-habanero.html"],["PICO DE GALLO","Milder fresh alternative.","pico-de-gallo.html"]],
  "carnitas.html":[["MEAT GUIDE","Slow cooking followed by crisping is the core technique.","meat-guide.html"],["SALSA VERDE","Classic carnitas pairing.","salsa-verde.html"],["SALSA ROJA","Classic red-salsa option.","salsa-roja.html"],["SALSA DE MOLCAJETE","Rustic roasted salsa for tacos.","salsa-molcajete.html"]],
  "barbacoa.html":[["MEAT GUIDE","Low-and-slow braising guidance applies directly.","meat-guide.html"],["SALSA BORRACHA","Traditional robust meat pairing.","salsa-borracha.html"],["SALSA DE GUAJILLO","Natural dried-chile accompaniment.","salsa-guajillo.html"],["SALSA DE MOLCAJETE","Rustic table salsa for barbacoa tacos.","salsa-molcajete.html"]],
  "chile-relleno.html":[["SALSA RANCHERA","Classic sauce for serving chile relleno.","salsa-ranchera.html"],["SALSA ROJA","Alternative red tomato-chile sauce.","salsa-roja.html"],["PICO DE GALLO","Fresh side garnish.","pico-de-gallo.html"]],
  "enchiladas-rojas.html":[["SALSA ROJA","Direct sauce-family match.","salsa-roja.html"],["SALSA DE GUAJILLO","Guajillo-based sauce is the core red enchilada flavor.","salsa-guajillo.html"],["SALSA DE CHILE DE ÁRBOL","Optional extra heat.","salsa-chile-de-arbol.html"]],
  "enchiladas-verdes.html":[["SALSA VERDE","Direct sauce-family match.","salsa-verde.html"],["SALSA DE TOMATILLO","Tomatillo is the defining base.","salsa-tomatillo.html"],["SALSA DE AGUACATE","Optional creamy garnish.","salsa-aguacate.html"]],
  "pozole-rojo.html":[["MEAT GUIDE","Long, gentle pork cooking guidance applies.","meat-guide.html"],["SALSA DE GUAJILLO","Direct chile-family match for the broth.","salsa-guajillo.html"],["SALSA DE CHILE DE ÁRBOL","Traditional table condiment for extra heat.","salsa-chile-de-arbol.html"],["SALSA MORITA","Smoky optional garnish.","salsa-morita.html"]],
  "salsa-guajillo.html":[["TACOS AL PASTOR","Guajillo is central to the pastor marinade.","tacos-al-pastor.html"],["BIRRIA","Core dried-chile flavor in the braise.","birria.html"],["ENCHILADAS ROJAS","Classic red enchilada base.","enchiladas-rojas.html"],["POZOLE ROJO","Key chile for the red broth.","pozole-rojo.html"]],
  "salsa-xni-pec.html":[["COCHINITA PIBIL","Classic Yucatán accompaniment.","cochinita-pibil.html"]],
  "salsa-verde.html":[["CARNITAS","Classic taco pairing.","carnitas.html"],["ENCHILADAS VERDES","Direct use case.","enchiladas-verdes.html"]],
  "salsa-ranchera.html":[["CHILE RELLENO","Classic serving sauce.","chile-relleno.html"]],
  "mole-poblano.html":[["MOLE POBLANO CON POLLO","Direct dish application.","mole-poblano-con-pollo.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=MEXICAN_MAIN_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".mexican-main-tip")) return;
  const anchor=document.querySelector(".peruvian-side-tip") || document.querySelector(".peruvian-crossref-tip") || document.querySelector(".mexican-sauce-tip-2") || document.querySelector(".mexican-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="mexican-main-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff7ec";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN RECIPE CROSS-REFERENCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">View →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const MEXICAN_MAIN_LINKS_2 = {
  "chiles-en-nogada.html":[["MEAT GUIDE","Ground-meat browning technique applies to the picadillo.","meat-guide.html"],["PICO DE GALLO","Optional fresh side, though the walnut sauce should remain the focus.","pico-de-gallo.html"]],
  "carne-asada.html":[["MEAT GUIDE","Salting, grilling, resting, and slicing guidance apply directly.","meat-guide.html"],["SALSA TAQUERA","Classic steak-taco pairing.","salsa-taquera.html"],["SALSA DE MOLCAJETE","Rustic grilled-meat salsa.","salsa-molcajete.html"],["SALSA MORITA","Smoky salsa for charred beef.","salsa-morita.html"],["SALSA DE AGUACATE","Cooling creamy topping.","salsa-aguacate.html"]],
  "pescado-a-la-veracruzana.html":[["PROVENÇALE","Related tomato, olive, caper, and herb flavor family.","provencale-sauce.html"],["SAUCE TOMATE","Classical tomato-sauce reference.","sauce-tomate.html"],["SALSA XNI-PEC","Optional citrus-habanero contrast.","salsa-xni-pec.html"]],
  "tacos-de-pescado.html":[["SALSA VERDE","Bright tomatillo salsa for fish tacos.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy avocado salsa.","salsa-aguacate.html"],["PICO DE GALLO","Classic fresh taco topping.","pico-de-gallo.html"],["SALSA XNI-PEC","Hot citrusy topping.","salsa-xni-pec.html"]],
  "pollo-en-mole-negro.html":[["MOLE NEGRO","Direct sauce application.","mole-negro.html"],["MEAT GUIDE","Poultry temperature and resting guidance apply.","meat-guide.html"]],
  "costillas-en-chile-colorado.html":[["MEAT GUIDE","Braising and slow-cooking guidance apply to the ribs.","meat-guide.html"],["SALSA DE GUAJILLO","Direct chile-family match.","salsa-guajillo.html"],["ADOBO","Related dried-chile braising profile.","mexican-adobo.html"]],
  "enfrijoladas.html":[["SALSA DE CHIPOTLE","Smoky bean-sauce variation.","salsa-chipotle.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"],["TACU TACU","Compare another rice-and-bean tradition.","tacu-tacu.html"]],
  "tinga-de-pollo.html":[["SALSA DE CHIPOTLE","Direct smoky chile-family match.","salsa-chipotle.html"],["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"],["PICO DE GALLO","Fresh tostada topping.","pico-de-gallo.html"]],
  "tamales-mexicanos.html":[["SALSA ROJA","Direct red-chile serving sauce.","salsa-roja.html"],["SALSA VERDE","Classic green-salsa alternative.","salsa-verde.html"],["SALSA DE GUAJILLO","Natural chile sauce for red tamales.","salsa-guajillo.html"],["TAMAL PERUANO","Compare with the Peruvian tamal tradition.","tamal-peruano.html"]],
  "cabrito-al-pastor.html":[["MEAT GUIDE","Slow roasting, grilling, and resting guidance apply directly.","meat-guide.html"],["SALSA BORRACHA","Excellent northern-style grilled-meat pairing.","salsa-borracha.html"],["SALSA DE MOLCAJETE","Rustic salsa for roast goat.","salsa-molcajete.html"],["SALSA DE GUAJILLO","Mild dried-chile accompaniment.","salsa-guajillo.html"]],
  "mole-negro.html":[["POLLO EN MOLE NEGRO","Direct dish application.","pollo-en-mole-negro.html"]],
  "salsa-chipotle.html":[["TINGA DE POLLO","Direct smoky tomato-chipotle use case.","tinga-de-pollo.html"],["ENFRIJOLADAS","Optional smoky bean-sauce variation.","enfrijoladas.html"]],
  "salsa-guajillo.html":[["COSTILLAS EN CHILE COLORADO","Guajillo is central to the red chile braise.","costillas-en-chile-colorado.html"],["TAMALES","Natural sauce for red tamales.","tamales-mexicanos.html"],["CABRITO AL PASTOR","Optional dried-chile accompaniment.","cabrito-al-pastor.html"]],
  "salsa-molcajete.html":[["CARNE ASADA","Classic grilled-beef pairing.","carne-asada.html"],["CABRITO AL PASTOR","Rustic salsa for roast goat.","cabrito-al-pastor.html"]],
  "salsa-verde.html":[["TACOS DE PESCADO","Classic fish-taco pairing.","tacos-de-pescado.html"],["TAMALES","Classic green-salsa serving option.","tamales-mexicanos.html"]],
  "pico-de-gallo.html":[["TACOS DE PESCADO","Classic fresh topping.","tacos-de-pescado.html"],["TINGA DE POLLO","Fresh tostada topping.","tinga-de-pollo.html"],["ENFRIJOLADAS","Fresh contrast to bean sauce.","enfrijoladas.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=MEXICAN_MAIN_LINKS_2[p];
  if(!refs || !refs.length || document.querySelector(".mexican-main-tip-2")) return;
  const anchor=document.querySelector(".mexican-main-tip") || document.querySelector(".peruvian-side-tip") || document.querySelector(".peruvian-crossref-tip") || document.querySelector(".mexican-sauce-tip-2") || document.querySelector(".mexican-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="mexican-main-tip-2";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff6e8";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN RECIPE CROSS-REFERENCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">View →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const MEXICAN_TACO_LINKS_V2={
"tacos-de-adobada.html":[["ADOBO","Direct marinade match.","mexican-adobo.html"],["SALSA DE GUAJILLO","Natural chile pairing.","salsa-guajillo.html"],["SALSA TAQUERA","Classic taco-shop salsa.","salsa-taquera.html"]],
"tacos-de-bistec.html":[["MEAT GUIDE","High-heat searing and slicing guidance.","meat-guide.html"],["SALSA TAQUERA","Classic steak-taco salsa.","salsa-taquera.html"],["SALSA DE MOLCAJETE","Rustic grilled-beef pairing.","salsa-molcajete.html"]],
"tacos-de-alambre.html":[["MEAT GUIDE","Griddle browning applies directly.","meat-guide.html"],["SALSA ROJA","Classic red-salsa topping.","salsa-roja.html"],["SALSA DE AGUACATE","Cooling creamy topping.","salsa-aguacate.html"]],
"tacos-de-pastor-negro.html":[["ADOBO","Related dark chile marinade.","mexican-adobo.html"],["SALSA MORITA","Smoky pairing.","salsa-morita.html"],["SALSA DE CHILE DE ÁRBOL","Hot taquería pairing.","salsa-chile-de-arbol.html"]],
"tacos-de-mixiote.html":[["MEAT GUIDE","Slow cooking applies directly.","meat-guide.html"],["ADOBO","Direct dried-chile marinade connection.","mexican-adobo.html"],["SALSA DE GUAJILLO","Natural pairing.","salsa-guajillo.html"]],
"tacos-de-machaca.html":[["SALSA RANCHERA","Classic northern pairing.","salsa-ranchera.html"],["SALSA DE MOLCAJETE","Rustic salsa for beef tacos.","salsa-molcajete.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-de-discada.html":[["MEAT GUIDE","High-heat griddle browning applies.","meat-guide.html"],["SALSA MORITA","Smoky mixed-meat pairing.","salsa-morita.html"],["SALSA BORRACHA","Robust northern-style pairing.","salsa-borracha.html"]],
"tacos-de-lechon.html":[["MEAT GUIDE","Slow roasting and crisping apply.","meat-guide.html"],["SALSA XNI-PEC","Citrus-habanero pairing.","salsa-xni-pec.html"],["SALSA HABANERO","Hot pork accompaniment.","salsa-habanero.html"]],
"tacos-de-buche.html":[["MEAT GUIDE","Gentle cooking then griddle crisping.","meat-guide.html"],["SALSA TAQUERA","Classic taquería condiment.","salsa-taquera.html"],["SALSA DE CHILE DE ÁRBOL","Classic hot pairing.","salsa-chile-de-arbol.html"]],
"tacos-de-cachete.html":[["MEAT GUIDE","Low-and-slow braising is key.","meat-guide.html"],["SALSA VERDE","Bright contrast for rich beef.","salsa-verde.html"],["SALSA BORRACHA","Robust meat pairing.","salsa-borracha.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_TACO_LINKS_V2[p];if(!r||document.querySelector(".mexican-taco-tip"))return;const a=document.querySelector(".mexican-main-tip-2")||document.querySelector(".mexican-main-tip")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mexican-taco-tip";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff5e6";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_TACO_LINKS_V3={
"tacos-de-labio.html":[["MEAT GUIDE","Low-and-slow braising is the key technique.","meat-guide.html"],["SALSA VERDE","Bright contrast for rich beef.","salsa-verde.html"],["TACOS DE CACHETE","Closely related cabeza-style taco.","tacos-de-cachete.html"]],
"tacos-de-sesos.html":[["MEAT GUIDE","Gentle cooking and careful temperature control matter here.","meat-guide.html"],["SALSA VERDE","Bright classic pairing.","salsa-verde.html"],["SALSA DE CHILE DE ÁRBOL","Traditional hot taco salsa.","salsa-chile-de-arbol.html"]],
"tacos-de-chicharron.html":[["SALSA ROJA","Classic sauce for chicharrón en salsa.","salsa-roja.html"],["SALSA VERDE","Classic green alternative.","salsa-verde.html"]],
"tacos-de-chicharron-prensado.html":[["SALSA DE GUAJILLO","Direct chile-family match for the braising sauce.","salsa-guajillo.html"],["SALSA ROJA","Related red-salsa base.","salsa-roja.html"]],
"tacos-de-longaniza.html":[["SALSA MORITA","Smoky pairing for sausage.","salsa-morita.html"],["SALSA TAQUERA","Classic taco-shop condiment.","salsa-taquera.html"],["SALSA DE MOLCAJETE","Rustic roasted salsa.","salsa-molcajete.html"]],
"tacos-de-pollo-asado.html":[["MEAT GUIDE","Grilling, salting, and resting apply directly.","meat-guide.html"],["SALSA VERDE","Bright grilled-chicken pairing.","salsa-verde.html"],["SALSA DE AGUACATE","Cooling creamy topping.","salsa-aguacate.html"],["POLLO A LA BRASA","Compare another deeply seasoned grilled chicken.","pollo-a-la-brasa-peruano.html"]],
"tacos-de-tinga.html":[["TINGA DE POLLO","Direct parent recipe.","tinga-de-pollo.html"],["SALSA DE CHIPOTLE","Direct smoky chile match.","salsa-chipotle.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-de-mole.html":[["MOLE POBLANO","Primary sauce option.","mole-poblano.html"],["MOLE NEGRO","Alternative darker Oaxacan sauce.","mole-negro.html"],["MOLE POBLANO CON POLLO","Direct related dish.","mole-poblano-con-pollo.html"]],
"tacos-de-chile-relleno.html":[["CHILE RELLENO","Direct parent dish.","chile-relleno.html"],["SALSA RANCHERA","Classic chile relleno sauce.","salsa-ranchera.html"],["SALSA ROJA","Alternative red sauce.","salsa-roja.html"]],
"tacos-de-papa.html":[["SALSA ROJA","Classic crisp potato taco topping.","salsa-roja.html"],["SALSA VERDE","Bright green alternative.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_TACO_LINKS_V3[p];if(!r||document.querySelector(".mexican-taco-tip-v3"))return;const a=document.querySelector(".mexican-taco-tip")||document.querySelector(".mexican-main-tip-2")||document.querySelector(".mexican-main-tip")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mexican-taco-tip-v3";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff5e6";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_TACO_LINKS_V4={
"tacos-frijoles-queso.html":[["ENFRIJOLADAS","Related black-bean tortilla dish.","enfrijoladas.html"],["SALSA VERDE","Classic bright topping.","salsa-verde.html"],["SALSA ROJA","Classic red topping.","salsa-roja.html"]],
"tacos-flor-calabaza.html":[["PICO DE GALLO","Fresh topping for squash-blossom tacos.","pico-de-gallo.html"],["SALSA VERDE","Bright tomatillo pairing.","salsa-verde.html"],["TACOS DE HUITLACOCHE","Related milpa-style vegetarian taco.","tacos-huitlacoche.html"]],
"tacos-huitlacoche.html":[["MUSHROOM GUIDE","Huitlacoche is a fungus; the moisture and browning principles are useful here.","mushroom-guide.html"],["TACOS DE HONGOS","Compare another mushroom taco.","tacos-hongos.html"],["SALSA VERDE","Bright contrast for earthy huitlacoche.","salsa-verde.html"]],
"tacos-hongos.html":[["MUSHROOM GUIDE","Use the high-heat, uncrowded-pan method for better browning.","mushroom-guide.html"],["SALSA DE GUAJILLO","Earthy chile pairing.","salsa-guajillo.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"]],
"tacos-pulpo.html":[["SALSA MACHA","Chile-oil pairing for charred octopus.","salsa-macha.html"],["SALSA VERDE","Bright seafood pairing.","salsa-verde.html"],["TACOS DE PESCADO","Compare another seafood taco.","tacos-de-pescado.html"]],
"tacos-marlin-ahumado.html":[["SALSA DE GUAJILLO","Natural smoky-fish pairing.","salsa-guajillo.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"],["PICO DE GALLO","Fresh tomato-onion topping.","pico-de-gallo.html"]],
"tacos-pescado-zarandeado.html":[["SALSA VERDE","Direct serving pairing.","salsa-verde.html"],["PICO DE GALLO","Direct serving pairing.","pico-de-gallo.html"],["SALSA DE AGUACATE","Optional creamy topping.","salsa-aguacate.html"],["TACOS DE PESCADO","Compare the simpler fish taco.","tacos-de-pescado.html"]],
"tacos-jaiba.html":[["SALSA XNI-PEC","Citrus-habanero pairing for crab.","salsa-xni-pec.html"],["SALSA DE AGUACATE","Creamy seafood topping.","salsa-aguacate.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-langosta.html":[["SALSA VERDE","Classic bright lobster pairing.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy Baja-style topping.","salsa-aguacate.html"],["SALSA DE CHILE DE ÁRBOL","Hot chile contrast.","salsa-chile-de-arbol.html"]],
"tacos-chapulines.html":[["SALSA DE MOLCAJETE","Rustic roasted salsa pairing.","salsa-molcajete.html"],["SALSA VERDE","Bright green salsa pairing.","salsa-verde.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_TACO_LINKS_V4[p];if(!r||document.querySelector(".mexican-taco-tip-v4"))return;const a=document.querySelector(".mexican-taco-tip-v3")||document.querySelector(".mexican-taco-tip")||document.querySelector(".mexican-main-tip-2")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mexican-taco-tip-v4";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff5e6";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_FISH_TACO_LINKS={
"baja-fish-tacos.html":[["TACOS DE PESCADO","Compare the simpler base fish taco.","tacos-de-pescado.html"],["TACOS DE PESCADO ENSENADA","Closely related Baja fried-fish style.","tacos-pescado-ensenada.html"],["PICO DE GALLO","Classic fresh topping.","pico-de-gallo.html"],["SALSA DE AGUACATE","Creamy Baja-style topping.","salsa-aguacate.html"]],
"tacos-pescado-capeado.html":[["BAJA FISH TACOS","Related beer-battered technique.","baja-fish-tacos.html"],["SALSA VERDE","Bright fried-fish pairing.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"]],
"tacos-pescado-plancha.html":[["TACOS DE PESCADO","Related non-battered fish taco.","tacos-de-pescado.html"],["SALSA VERDE","Classic grilled-fish pairing.","salsa-verde.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-pescado-pastor.html":[["TACOS AL PASTOR","Direct inspiration for the marinade.","tacos-al-pastor.html"],["SALSA DE GUAJILLO","Guajillo-based pairing.","salsa-guajillo.html"],["SALSA TAQUERA","Classic taco salsa.","salsa-taquera.html"]],
"tacos-pescado-ajillo.html":[["SALSA DE GUAJILLO","Guajillo reinforces the ajillo flavor.","salsa-guajillo.html"],["SALSA DE AGUACATE","Creamy contrast.","salsa-aguacate.html"],["TACOS PESCADO PLANCHA","Compare another quick high-heat fish taco.","tacos-pescado-plancha.html"]],
"tacos-pescado-ensenada.html":[["BAJA FISH TACOS","Closely related Baja fried-fish style.","baja-fish-tacos.html"],["PICO DE GALLO","Classic fresh topping.","pico-de-gallo.html"],["SALSA ROJA","Traditional red-salsa option.","salsa-roja.html"]],
"tacos-pescado-tikin-xic.html":[["SALSA XNI-PEC","Classic Yucatán pairing.","salsa-xni-pec.html"],["SALSA HABANERO","Regional hot-sauce pairing.","salsa-habanero.html"],["COCHINITA PIBIL","Compare the same achiote-sour-orange flavor family.","cochinita-pibil.html"]],
"tacos-pescado-adobado.html":[["ADOBO","Direct marinade reference.","mexican-adobo.html"],["SALSA DE GUAJILLO","Natural red-chile pairing.","salsa-guajillo.html"],["SALSA DE AGUACATE","Cooling topping.","salsa-aguacate.html"]],
"tacos-pescado-ahumado.html":[["TACOS DE MARLÍN AHUMADO","Closest related smoked-fish taco.","tacos-marlin-ahumado.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"],["SALSA MORITA","Smoky chile pairing.","salsa-morita.html"]],
"tacos-pescado-veracruzana.html":[["PESCADO A LA VERACRUZANA","Direct parent dish.","pescado-a-la-veracruzana.html"],["PROVENÇALE","Related tomato-olive-caper sauce family.","provencale-sauce.html"],["SAUCE TOMATE","Classical tomato-sauce reference.","sauce-tomate.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_FISH_TACO_LINKS[p];if(!r||document.querySelector(".mexican-fish-taco-tip"))return;const a=document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".mexican-taco-tip-v3")||document.querySelector(".mexican-taco-tip")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mexican-fish-taco-tip";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#eef8fb";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">FISH TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_SHRIMP_OCTOPUS_TACO_LINKS={
"tacos-camaron-capeado.html":[["BAJA FISH TACOS","Related battered-seafood technique.","baja-fish-tacos.html"],["SALSA VERDE","Bright fried-seafood pairing.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"]],
"tacos-camaron-ajillo.html":[["TACOS DE PESCADO AL AJILLO","Same garlic-guajillo technique applied to fish.","tacos-pescado-ajillo.html"],["SALSA DE GUAJILLO","Direct chile pairing.","salsa-guajillo.html"],["SALSA DE AGUACATE","Creamy contrast.","salsa-aguacate.html"]],
"tacos-camaron-diabla.html":[["SALSA DE CHILE DE ÁRBOL","Core high-heat chile profile.","salsa-chile-de-arbol.html"],["SALSA ROJA","Related red-sauce family.","salsa-roja.html"],["SALSA DE AGUACATE","Cooling topping.","salsa-aguacate.html"]],
"tacos-camaron-pastor.html":[["TACOS DE PESCADO AL PASTOR","Related seafood pastor preparation.","tacos-pescado-pastor.html"],["TACOS AL PASTOR","Original pastor flavor family.","tacos-al-pastor.html"],["SALSA DE GUAJILLO","Natural chile pairing.","salsa-guajillo.html"]],
"tacos-camaron-queso.html":[["TACOS DE ALAMBRE","Related meat-and-melted-cheese taco structure.","tacos-de-alambre.html"],["SALSA DE AGUACATE","Creamy seafood pairing.","salsa-aguacate.html"],["SALSA ROJA","Classic red topping.","salsa-roja.html"]],
"tacos-camaron-empanizado.html":[["TACOS DE CAMARÓN CAPEADO","Compare battered vs breaded shrimp.","tacos-camaron-capeado.html"],["SALSA VERDE","Bright fried-seafood pairing.","salsa-verde.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-camaron-plancha.html":[["TACOS DE PESCADO A LA PLANCHA","Same high-heat plancha technique for fish.","tacos-pescado-plancha.html"],["SALSA VERDE","Classic pairing.","salsa-verde.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-camaron-gobernador.html":[["TACOS DE CAMARÓN CON QUESO","Related shrimp-and-cheese taco.","tacos-camaron-queso.html"],["SALSA DE AGUACATE","Creamy Sinaloa-style pairing.","salsa-aguacate.html"],["SALSA VERDE","Bright topping.","salsa-verde.html"]],
"tacos-pulpo-ajillo.html":[["TACOS DE PULPO","Parent octopus taco.","tacos-pulpo.html"],["TACOS DE PESCADO AL AJILLO","Related garlic-guajillo seafood technique.","tacos-pescado-ajillo.html"],["SALSA MACHA","Chile-oil pairing.","salsa-macha.html"]],
"tacos-pulpo-parrilla.html":[["TACOS DE PULPO","Parent octopus taco.","tacos-pulpo.html"],["SALSA VERDE","Bright grilled-seafood pairing.","salsa-verde.html"],["SALSA MACHA","Smoky chile-oil pairing.","salsa-macha.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_SHRIMP_OCTOPUS_TACO_LINKS[p];if(!r||document.querySelector(".shrimp-octopus-taco-tip"))return;const a=document.querySelector(".mexican-fish-taco-tip")||document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".mexican-taco-tip-v3")||document.querySelector(".mexican-taco-tip")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="shrimp-octopus-taco-tip";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#eef8fb";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">SEAFOOD TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_SEAFOOD_TACO_LINKS_V2={
"tacos-pulpo-enamorado.html":[["TACOS DE PULPO","Parent octopus taco.","tacos-pulpo.html"],["TACOS DE PULPO A LA PARRILLA","Compare a charred preparation.","tacos-pulpo-parrilla.html"],["SALSA DE AGUACATE","Creamy seafood pairing.","salsa-aguacate.html"]],
"tacos-calamar.html":[["TACOS DE CALAMAR FRITO","Compare quick-seared vs fried squid.","tacos-calamar-frito.html"],["SALSA VERDE","Bright pairing.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"]],
"tacos-calamar-frito.html":[["TACOS DE CALAMAR","Compare fried vs seared squid.","tacos-calamar.html"],["SALSA DE CHILE DE ÁRBOL","Hot crisp-seafood pairing.","salsa-chile-de-arbol.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-atun-sellado.html":[["SALSA MACHA","Chile-oil pairing for seared tuna.","salsa-macha.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"],["TACOS DE ATÚN CON AGUACATE","Closely related tuna taco.","tacos-atun-aguacate.html"]],
"tacos-atun-aguacate.html":[["TACOS DE ATÚN SELLADO","Compare a more seared presentation.","tacos-atun-sellado.html"],["SALSA DE AGUACATE","Direct flavor pairing.","salsa-aguacate.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-cazon.html":[["PESCADO A LA VERACRUZANA","Related tomato-fish preparation.","pescado-a-la-veracruzana.html"],["SALSA ROJA","Natural red-salsa pairing.","salsa-roja.html"],["SALSA VERDE","Bright alternative.","salsa-verde.html"]],
"tacos-mantaraya.html":[["SALSA DE GUAJILLO","Direct dried-chile pairing.","salsa-guajillo.html"],["SALSA MORITA","Smoky seafood pairing.","salsa-morita.html"],["TACOS DE CAZÓN","Compare another firm-fish taco.","tacos-cazon.html"]],
"tacos-ostiones.html":[["SALSA XNI-PEC","Citrus-habanero pairing for oysters.","salsa-xni-pec.html"],["SALSA DE AGUACATE","Creamy contrast.","salsa-aguacate.html"],["SALSA MACHA","Chile-oil pairing.","salsa-macha.html"]],
"tacos-callo-hacha.html":[["SALSA DE AGUACATE","Creamy scallop pairing.","salsa-aguacate.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"],["SALSA VERDE","Bright seafood pairing.","salsa-verde.html"]],
"tacos-mariscos-mixtos.html":[["TACOS DE CAMARÓN A LA PLANCHA","Related quick-seared seafood taco.","tacos-camaron-plancha.html"],["TACOS DE PULPO A LA PARRILLA","Related charred seafood taco.","tacos-pulpo-parrilla.html"],["SALSA MACHA","Chile-oil pairing.","salsa-macha.html"],["SALSA VERDE","Bright mixed-seafood pairing.","salsa-verde.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_SEAFOOD_TACO_LINKS_V2[p];if(!r||document.querySelector(".seafood-taco-tip-v2"))return;const a=document.querySelector(".shrimp-octopus-taco-tip")||document.querySelector(".mexican-fish-taco-tip")||document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="seafood-taco-tip-v2";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#eef8fb";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">SEAFOOD TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_SIDE_LINKS_1={
"arroz-rojo.html":[["FRIJOLES REFRITOS","Classic rice-and-beans pairing.","frijoles-refritos.html"],["MOLE POBLANO CON POLLO","Traditional side for mole.","mole-poblano-con-pollo.html"],["ENCHILADAS ROJAS","Classic plate companion.","enchiladas-rojas.html"]],
"arroz-verde.html":[["POLLO A LA BRASA","Bright herbaceous rice with grilled chicken.","pollo-a-la-brasa-peruano.html"],["PESCADO A LA VERACRUZANA","Fresh rice pairing for tomato-olive fish.","pescado-a-la-veracruzana.html"],["TACOS DE PESCADO A LA PLANCHA","Light side for grilled fish tacos.","tacos-pescado-plancha.html"]],
"frijoles-refritos.html":[["ARROZ ROJO","Classic pairing.","arroz-rojo.html"],["TACOS DE FRIJOLES CON QUESO","Direct bean application.","tacos-frijoles-queso.html"],["ENFRIJOLADAS","Related bean-sauce dish.","enfrijoladas.html"]],
"frijoles-charros.html":[["CARNE ASADA","Classic grilled-beef side.","carne-asada.html"],["BARBACOA","Rich bean side for slow-cooked beef.","barbacoa.html"],["CABRITO AL PASTOR","Northern-style pairing.","cabrito-al-pastor.html"]],
"frijoles-de-la-olla.html":[["CARNITAS","Simple traditional side.","carnitas.html"],["COCHINITA PIBIL","Brothy beans balance rich pork.","cochinita-pibil.html"],["ARROZ ROJO","Classic rice-and-beans pairing.","arroz-rojo.html"]],
"elote.html":[["CARNE ASADA","Classic grilled side.","carne-asada.html"],["TACOS AL PASTOR","Street-food pairing.","tacos-al-pastor.html"],["POLLO A LA BRASA","Charred corn pairs well with grilled chicken.","pollo-a-la-brasa-peruano.html"]],
"esquites.html":[["TACOS DE BISTEC","Street-food side.","tacos-de-bistec.html"],["TACOS DE POLLO ASADO","Street-food pairing.","tacos-de-pollo-asado.html"],["TACOS DE CAMARÓN A LA PLANCHA","Corn cup pairing for grilled shrimp.","tacos-camaron-plancha.html"]],
"nopales-asados.html":[["CARNE ASADA","Classic grilled vegetable with steak.","carne-asada.html"],["TACOS DE BISTEC","Grilled cactus side.","tacos-de-bistec.html"],["BARBACOA","Acidic green side for rich meat.","barbacoa.html"]],
"ensalada-nopales.html":[["CARNITAS","Fresh cactus salad cuts rich pork.","carnitas.html"],["TACOS DE LECHÓN","Bright side for roasted pork.","tacos-de-lechon.html"],["CHILE RELLENO","Fresh side for stuffed poblano.","chile-relleno.html"]],
"rajas-con-crema.html":[["TACOS DE POLLO ASADO","Creamy poblano side for grilled chicken.","tacos-de-pollo-asado.html"],["CARNE ASADA","Classic poblano side.","carne-asada.html"],["TACOS DE ALAMBRE","Matches peppers, cheese, and griddled meat.","tacos-de-alambre.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_SIDE_LINKS_1[p];if(!r||document.querySelector(".mex-side-tip-1"))return;const a=document.querySelector(".seafood-taco-tip-v2")||document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".mexican-main-tip-2")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-side-tip-1";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f6f8ee";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN SIDE PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_SIDE_LINKS_2={
"calabacitas-mexicana.html":[["QUESO FUNDIDO","Optional cheese-rich pairing.","queso-fundido.html"],["ARROZ ROJO","Classic plate companion.","arroz-rojo.html"],["TACOS DE POLLO ASADO","Fresh vegetable side for grilled chicken.","tacos-de-pollo-asado.html"]],
"papas-con-chorizo.html":[["TACOS DE LONGANIZA","Related sausage-and-potato flavor family.","tacos-de-longaniza.html"],["FRIJOLES REFRITOS","Classic side pairing.","frijoles-refritos.html"],["SALSA VERDE","Bright chile sauce for the potatoes.","salsa-verde.html"]],
"papas-mexicana.html":[["CARNE ASADA","Classic potato side.","carne-asada.html"],["TACOS DE BISTEC","Natural side for steak tacos.","tacos-de-bistec.html"],["PICO DE GALLO","Shares the tomato-onion-chile profile.","pico-de-gallo.html"]],
"chiles-toreados.html":[["CARNE ASADA","Classic table accompaniment.","carne-asada.html"],["TACOS DE BISTEC","Traditional taco garnish.","tacos-de-bistec.html"],["TACOS DE LONGANIZA","Spicy side for sausage tacos.","tacos-de-longaniza.html"]],
"cebollitas-asadas.html":[["CARNE ASADA","Classic grilled-beef accompaniment.","carne-asada.html"],["TACOS DE BISTEC","Traditional taco-side onion.","tacos-de-bistec.html"],["CABRITO AL PASTOR","Grilled onion pairing.","cabrito-al-pastor.html"]],
"guacamole.html":[["TACOS DE POLLO ASADO","Classic topping.","tacos-de-pollo-asado.html"],["TACOS DE BISTEC","Classic topping.","tacos-de-bistec.html"],["TACOS DE PESCADO","Fresh creamy topping.","tacos-de-pescado.html"],["PICO DE GALLO","Classic companion salsa.","pico-de-gallo.html"]],
"pico-de-gallo.html":[["GUACAMOLE","Classic companion dip.","guacamole.html"],["QUESO FUNDIDO","Fresh topping for melted cheese.","queso-fundido.html"],["CHORIQUESO","Fresh acidic contrast.","choriqueso.html"]],
"choriqueso.html":[["PICO DE GALLO","Fresh acidic topping.","pico-de-gallo.html"],["SALSA ROJA","Classic chile topping.","salsa-roja.html"],["TACOS DE LONGANIZA","Related sausage-and-cheese flavor family.","tacos-de-longaniza.html"]],
"queso-fundido.html":[["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"],["SALSA VERDE","Bright chile topping.","salsa-verde.html"],["TACOS DE ALAMBRE","Related grilled-meat-and-cheese profile.","tacos-de-alambre.html"]],
"chiles-rellenos-queso.html":[["CHILE RELLENO","Direct parent dish.","chile-relleno.html"],["SALSA RANCHERA","Classic serving sauce.","salsa-ranchera.html"],["ARROZ ROJO","Traditional side.","arroz-rojo.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_SIDE_LINKS_2[p];if(!r||document.querySelector(".mex-side-tip-2"))return;const a=document.querySelector(".mex-side-tip-1")||document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".mexican-main-tip-2")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-side-tip-2";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f6f8ee";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN SIDE PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_SIDE_LINKS_3={
"ensalada-jicama.html":[["TACOS DE PESCADO ENSENADA","Crisp citrus side for fried fish tacos.","tacos-pescado-ensenada.html"],["TACOS DE CAMARÓN A LA PLANCHA","Fresh side for grilled shrimp.","tacos-camaron-plancha.html"],["CHILES TOREADOS","Spicy contrast.","chiles-toreados.html"]],
"ensalada-aguacate.html":[["CARNE ASADA","Fresh creamy side.","carne-asada.html"],["TACOS DE PESCADO A LA PLANCHA","Natural fish pairing.","tacos-pescado-plancha.html"],["GUACAMOLE","Compare another avocado preparation.","guacamole.html"]],
"coleslaw-baja.html":[["BAJA FISH TACOS","Classic topping.","baja-fish-tacos.html"],["TACOS DE PESCADO CAPEADO","Classic fried-fish topping.","tacos-pescado-capeado.html"],["TACOS DE CAMARÓN EMPANIZADO","Crunchy shrimp-taco pairing.","tacos-camaron-empanizado.html"]],
"chayotes-crema.html":[["BÉCHAMEL","Related white-sauce technique.","bechamel-sauce.html"],["POLLO A LA BRASA","Creamy vegetable side for roast chicken.","pollo-a-la-brasa-peruano.html"],["CARNE ASADA","Mild creamy side for grilled beef.","carne-asada.html"]],
"verdolagas.html":[["CARNITAS","Tangy green side for rich pork.","carnitas.html"],["BARBACOA","Fresh green accompaniment.","barbacoa.html"],["FRIJOLES DE LA OLLA","Home-style pairing.","frijoles-de-la-olla.html"]],
"ejotes-mexicana.html":[["CARNE ASADA","Vegetable side for grilled beef.","carne-asada.html"],["POLLO A LA BRASA","Fresh vegetable pairing.","pollo-a-la-brasa-peruano.html"],["ARROZ ROJO","Classic plate companion.","arroz-rojo.html"]],
"calabaza-elote.html":[["POLLO A LA BRASA","Classic vegetable side.","pollo-a-la-brasa-peruano.html"],["TACOS DE POLLO ASADO","Fresh squash-and-corn side.","tacos-de-pollo-asado.html"],["ARROZ VERDE","Green rice pairing.","arroz-verde.html"]],
"platanos-fritos.html":[["MOLE POBLANO CON POLLO","Sweet counterpoint to mole.","mole-poblano-con-pollo.html"],["POLLO EN MOLE NEGRO","Sweet side for dark mole.","pollo-en-mole-negro.html"],["ENFRIJOLADAS","Sweet-savory pairing.","enfrijoladas.html"]],
"yuca-chile-limon.html":[["TACOS DE PESCADO A LA PLANCHA","Crisp citrus side for fish.","tacos-pescado-plancha.html"],["TACOS DE CAMARÓN A LA PLANCHA","Crisp side for shrimp.","tacos-camaron-plancha.html"],["SALSA VERDE","Bright dipping sauce.","salsa-verde.html"]],
"tortillas-maiz-hechas-mano.html":[["TACOS AL PASTOR","Use as the taco base.","tacos-al-pastor.html"],["CARNE ASADA","Use for steak tacos.","carne-asada.html"],["CARNITAS","Use for pork tacos.","carnitas.html"],["BARBACOA","Use for slow-cooked beef tacos.","barbacoa.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_SIDE_LINKS_3[p];if(!r||document.querySelector(".mex-side-tip-3"))return;const a=document.querySelector(".mex-side-tip-2")||document.querySelector(".mex-side-tip-1")||document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-side-tip-3";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f6f8ee";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN SIDE PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_BREAKFAST_LINKS_1={
"huevos-rancheros.html":[["SALSA RANCHERA","Core sauce for the dish.","salsa-ranchera.html"],["FRIJOLES REFRITOS","Classic side.","frijoles-refritos.html"],["GUACAMOLE","Optional avocado side.","guacamole.html"]],
"chilaquiles-rojos.html":[["SALSA ROJA","Direct sauce match.","salsa-roja.html"],["FRIJOLES REFRITOS","Classic breakfast side.","frijoles-refritos.html"],["HUEVOS RANCHEROS","Related egg-and-salsa breakfast.","huevos-rancheros.html"]],
"chilaquiles-verdes.html":[["SALSA VERDE","Direct sauce match.","salsa-verde.html"],["SALSA DE TOMATILLO","Core green-sauce family.","salsa-tomatillo.html"],["FRIJOLES REFRITOS","Classic side.","frijoles-refritos.html"]],
"huevos-mexicana.html":[["PICO DE GALLO","Shares the tomato-onion-chile flavor profile.","pico-de-gallo.html"],["FRIJOLES DE LA OLLA","Home-style side.","frijoles-de-la-olla.html"],["TORTILLAS HECHAS A MANO","Ideal tortilla pairing.","tortillas-maiz-hechas-mano.html"]],
"huevos-divorciados.html":[["SALSA ROJA","One half of the classic sauce pairing.","salsa-roja.html"],["SALSA VERDE","The other half.","salsa-verde.html"],["FRIJOLES REFRITOS","Traditional divider and side.","frijoles-refritos.html"]],
"huevos-motulenos.html":[["PLÁTANOS FRITOS","Direct sweet-savory component.","platanos-fritos.html"],["FRIJOLES REFRITOS","Core base.","frijoles-refritos.html"],["SALSA RANCHERA","Related tomato sauce.","salsa-ranchera.html"]],
"huevos-chorizo.html":[["PAPAS CON CHORIZO","Related chorizo breakfast side.","papas-con-chorizo.html"],["SALSA VERDE","Bright topping.","salsa-verde.html"],["TORTILLAS HECHAS A MANO","Ideal serving tortilla.","tortillas-maiz-hechas-mano.html"]],
"huevos-machaca.html":[["TACOS DE MACHACA","Direct related dish.","tacos-de-machaca.html"],["SALSA RANCHERA","Classic northern pairing.","salsa-ranchera.html"],["FRIJOLES REFRITOS","Breakfast side.","frijoles-refritos.html"]],
"molletes.html":[["FRIJOLES REFRITOS","Core spread.","frijoles-refritos.html"],["PICO DE GALLO","Classic topping.","pico-de-gallo.html"],["CHORIQUESO","Optional richer cheese-and-chorizo direction.","choriqueso.html"]],
"enfrijoladas.html":[["FRIJOLES REFRITOS","Related bean base.","frijoles-refritos.html"],["HUEVOS RANCHEROS","Related breakfast plate.","huevos-rancheros.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_BREAKFAST_LINKS_1[p];if(!r||document.querySelector(".mex-breakfast-tip-1"))return;const a=document.querySelector(".mex-side-tip-3")||document.querySelector(".mex-side-tip-2")||document.querySelector(".mex-side-tip-1")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-breakfast-tip-1";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff9ec";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN BREAKFAST PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_BREAKFAST_LINKS_2={
"entomatadas.html":[["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"],["FRIJOLES REFRITOS","Classic side.","frijoles-refritos.html"],["CHILAQUILES ROJOS","Related tortilla-and-sauce breakfast.","chilaquiles-rojos.html"]],
"migas-mexicanas.html":[["HUEVOS A LA MEXICANA","Related egg breakfast.","huevos-mexicana.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"],["FRIJOLES REFRITOS","Classic side.","frijoles-refritos.html"]],
"gorditas-desayuno.html":[["TORTILLAS DE MAÍZ","Same masa foundation.","tortillas-maiz-hechas-mano.html"],["FRIJOLES REFRITOS","Classic filling.","frijoles-refritos.html"],["HUEVOS CON CHORIZO","Excellent breakfast filling.","huevos-chorizo.html"]],
"tamales-atole.html":[["TAMALES","Use the Mexican tamales recipe.","tamales-mexicanos.html"],["SALSA VERDE","Classic tamal accompaniment.","salsa-verde.html"],["SALSA ROJA","Classic tamal accompaniment.","salsa-roja.html"]],
"quesadillas-flor-calabaza.html":[["TACOS DE FLOR DE CALABAZA","Related squash-blossom preparation.","tacos-flor-calabaza.html"],["SALSA VERDE","Classic accompaniment.","salsa-verde.html"],["QUESO FUNDIDO","Related melted-cheese technique.","queso-fundido.html"]],
"tacos-barbacoa.html":[["BARBACOA","Direct parent dish.","barbacoa.html"],["SALSA BORRACHA","Classic meat pairing.","salsa-borracha.html"],["TORTILLAS DE MAÍZ","Ideal base.","tortillas-maiz-hechas-mano.html"]],
"tacos-canasta.html":[["FRIJOLES REFRITOS","Classic filling.","frijoles-refritos.html"],["PAPAS CON CHORIZO","Classic filling direction.","papas-con-chorizo.html"],["CHICHARRÓN","Related taco filling.","tacos-de-chicharron.html"]],
"birria-consome.html":[["BIRRIA","Direct parent dish.","birria.html"],["SALSA DE CHILE DE ÁRBOL","Classic hot accompaniment.","salsa-chile-de-arbol.html"],["TORTILLAS DE MAÍZ","Ideal serving tortilla.","tortillas-maiz-hechas-mano.html"]],
"menudo.html":[["POZOLE ROJO","Compare another hominy-based Mexican soup.","pozole-rojo.html"],["TORTILLAS DE MAÍZ","Traditional accompaniment.","tortillas-maiz-hechas-mano.html"],["SALSA DE CHILE DE ÁRBOL","Optional extra heat.","salsa-chile-de-arbol.html"]],
"pozole-rojo.html":[["MENUDO","Compare another hearty Mexican breakfast soup.","menudo.html"],["BIRRIA CON CONSOMÉ","Related chile-broth breakfast.","birria-consome.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_BREAKFAST_LINKS_2[p];if(!r||document.querySelector(".mex-breakfast-tip-2"))return;const a=document.querySelector(".mex-breakfast-tip-1")||document.querySelector(".mex-side-tip-3")||document.querySelector(".mex-side-tip-2")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-breakfast-tip-2";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff9ec";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN BREAKFAST PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_BREAKFAST_LINKS_3={
"machaca-con-huevo.html":[["HUEVOS CON MACHACA","Same northern Mexican dish under the alternate name.","huevos-machaca.html"],["TACOS DE MACHACA","Direct related taco.","tacos-de-machaca.html"],["FRIJOLES REFRITOS","Classic side.","frijoles-refritos.html"]],
"papas-chorizo-huevo.html":[["PAPAS CON CHORIZO","Core potato-and-chorizo base.","papas-con-chorizo.html"],["CHORIZO CON HUEVO","Related egg-and-chorizo breakfast.","chorizo-con-huevo.html"],["SALSA VERDE","Bright topping.","salsa-verde.html"]],
"nopales-con-huevo.html":[["ENSALADA DE NOPALES","Related cactus preparation.","ensalada-nopales.html"],["NOPALES ASADOS","Alternative cactus technique.","nopales-asados.html"],["SALSA VERDE","Classic pairing.","salsa-verde.html"]],
"chorizo-con-huevo.html":[["HUEVOS CON CHORIZO","Same classic breakfast under the alternate word order.","huevos-chorizo.html"],["PAPAS CON CHORIZO Y HUEVO","Hearty potato variation.","papas-chorizo-huevo.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"pan-dulce-cafe-olla.html":[["TAMALES CON ATOLE","Another classic Mexican breakfast pairing.","tamales-atole.html"],["CHILAQUILES ROJOS","Savory breakfast option alongside café de olla.","chilaquiles-rojos.html"],["HUEVOS RANCHEROS","Another traditional breakfast plate.","huevos-rancheros.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_BREAKFAST_LINKS_3[p];if(!r||document.querySelector(".mex-breakfast-tip-3"))return;const a=document.querySelector(".mex-breakfast-tip-2")||document.querySelector(".mex-breakfast-tip-1")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-breakfast-tip-3";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff9ec";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN BREAKFAST PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();
