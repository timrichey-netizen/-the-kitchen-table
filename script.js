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
const filters = [...document.querySelectorAll('.filter')];
const noResults = document.getElementById('noResults');
let activeFilter = 'all';
let activeCuisine = 'all';
let activeAsianSubcuisine = 'all';

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

      if (asianSubcuisineGroup) {
        asianSubcuisineGroup.hidden = activeCuisine !== 'Asian';
      }
      if (activeCuisine === 'Asian') populateAsianSubcuisines();

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
