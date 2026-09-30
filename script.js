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
const filters = [...document.querySelectorAll('.filter')];
const noResults = document.getElementById('noResults');
let activeFilter = 'all';
let activeCuisine = 'all';

const CUISINES = [
  ['Italian', ['italian','roman','sicilian','venetian','piedmont','campanian']],
  ['French', ['french','bourguignon']],
  ['Spanish', ['spanish','catalan','basque']],
  ['Greek', ['greek','saganaki']],
  ['Mediterranean', ['mediterranean']],
  ['Cajun / Creole', ['cajun','creole','new orleans']],
  ['Latin American', ['latin','criolla','tomatillo']],
  ['Chinese', ['chinese','moo shu','mandarin']],
  ['Japanese / Fusion', ['miso','japanese','fusion']],
  ['American', ['american','san francisco']]
];

function cardHaystack(card) {
  return `${card.dataset.search || ''} ${card.textContent || ''}`.toLowerCase();
}

function detectCuisine(card) {
  const text = cardHaystack(card);
  for (const [label, terms] of CUISINES) {
    if (terms.some(term => text.includes(term))) return label;
  }
  return '';
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
  const q = (search?.value || '').trim().toLowerCase();
  let visible = 0;

  cards.forEach(card => {
    const haystack = cardHaystack(card);
    const cuisine = detectCuisine(card);
    const matchesCategory = matchesBroadCategory(card, activeFilter);
    const matchesCuisine = activeCuisine === 'all' || cuisine === activeCuisine;
    const matchesSearch = !q || haystack.includes(q);
    const show = matchesCategory && matchesCuisine && matchesSearch;

    card.hidden = !show;
    if (show) visible++;
  });

  if (noResults) noResults.hidden = visible !== 0;
}

search?.addEventListener('input', updateRecipes);


filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  activeFilter = button.dataset.filter || 'all';
  updateRecipes();
}));

populateCuisineFilter();
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
