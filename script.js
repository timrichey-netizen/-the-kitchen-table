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

const KITCHEN_TABLE_WORKER='https://the-kitchen-table-plate-generator.the-kitchen-table.workers.dev';

function workerRecipeImageUrl(slug) {
  return KITCHEN_TABLE_WORKER + '/recipe-image?id=' + encodeURIComponent(slug);
}

function enableRecipeImageFallback(img) {
  const original = img.getAttribute('src') || '';
  const match = original.match(/^assets\/(.+)\.png$/);
  if (!match) return;

  const slug = match[1];
  const loadWorkerImage = () => {
    if (img.dataset.workerFallback === '1') return;
    img.dataset.workerFallback = '1';
    img.style.display = '';
    img.style.visibility = '';
    img.src = workerRecipeImageUrl(slug);
  };

  img.addEventListener('error', loadWorkerImage);

  // Covers images that failed before this script attached its listener.
  if (img.complete && img.naturalWidth === 0) {
    loadWorkerImage();
  }
}

document.querySelectorAll('img[src^="assets/"]').forEach(enableRecipeImageFallback);
