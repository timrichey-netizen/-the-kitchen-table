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
const filters = [...document.querySelectorAll('.filter')];
const noResults = document.getElementById('noResults');
let activeFilter = 'all';

function updateRecipes() {
  const q = (search?.value || '').trim().toLowerCase();
  let visible = 0;
  cards.forEach(card => {
    const categories = card.dataset.category || '';
    const haystack = `${card.dataset.search || ''} ${card.textContent}`.toLowerCase();
    const matchesFilter = activeFilter === 'all' || categories.includes(activeFilter);
    const matchesSearch = !q || haystack.includes(q);
    const show = matchesFilter && matchesSearch;
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

const KITCHEN_TABLE_WORKER='https://the-kitchen-table-plate-generator.the-kitchen-table.workers.dev';
const dynamicRecipeIds=new Set([
'shrimp-piccata-skewers','spaghetti-carbonara','pasta-cacio-e-pepe','rigatoni-amatriciana','perciatelli-alla-gricia',
'fettuccine-alfredo','pasta-e-ceci','rigatoni-pecorino-crispy-guanciale','rigatoni-pork-ragu-ricotta','penne-arrabbiata',
'bucatini-amatriciana','spaghetti-shrimp-lemon-mint-pecorino','osso-buco-red-wine','eggplant-parmesan',
'lemon-stuffed-grilled-branzino','creamy-seafood-risotto','florentine-steak-balsamic-rosemary','pasta-alla-norma',
'pork-chop-milanese','gnocchi-alla-sorrentina','cioppino','spaghetti-with-mussels','butternut-squash-ravioli-brown-butter-sage','bolognese-meat-sauce'
]);
document.querySelectorAll('img[src^="assets/"]').forEach(img=>{
  const m=img.getAttribute('src').match(/^assets\/(.+)\.png$/);
  if(!m||!dynamicRecipeIds.has(m[1])) return;
  img.style.display='';
  img.style.visibility='';
  img.src=KITCHEN_TABLE_WORKER+'/recipe-image?id='+encodeURIComponent(m[1]);
});
