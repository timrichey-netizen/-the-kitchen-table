/* Display the four published recipes using metadata from the source sheet snapshot. */
(function(){
'use strict';
const live=new Set(['neapolitan-lasagna.html','vincisgrassi.html','pasta-alla-norma.html','pasta-with-bottarga.html']);
function run(){
const grid=document.getElementById('recipeGrid');if(!grid)return;
fetch('published-recipes.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Recipe snapshot unavailable');return r.json()}).then(data=>{
if(!Array.isArray(data.recipes))return;
const map=new Map(data.recipes.filter(x=>live.has(x.path)).map(x=>[x.path,x]));
grid.querySelectorAll('.recipe-card').forEach(card=>{
 const href=card.querySelector('h3 a[href]')?.getAttribute('href')?.split('?')[0];const r=map.get(href);if(!r)return;
 card.dataset.worldRegion=r.worldRegion||'';
 card.dataset.allergens=r.allergens||'';
 card.dataset.ingredients=(r.ingredientsEnglish||'').replace(/\s+/g,' ').trim();
 card.dataset.classification=r.classification||'';
 card.dataset.difficulty=r.difficulty||'';
 card.dataset.search=[r.localName,r.englishName,r.country,r.region,r.ingredientsEnglish].filter(Boolean).join(' ');
 const local=card.querySelector('.recipe-title-original');if(local)local.textContent=r.localName;
 const english=card.querySelector('.recipe-title-english');if(english){english.textContent=r.englishName&&r.englishName!==r.localName?'('+r.englishName+')':'';english.hidden=!(r.englishName&&r.englishName!==r.localName)}
 const region=card.querySelector('.card-region');if(region)region.textContent=(r.region||'').toUpperCase();
 const country=card.querySelector('.card-country');if(country)country.textContent=(r.country==='Italia'?'ITALY':r.country||'').toUpperCase();
 const body=card.querySelector('.recipe-card-body');
 if(body){const desc=body.querySelector('p');if(desc&&r.description)desc.textContent=r.description}
});
document.dispatchEvent(new Event('kitchen-table-recipe-data-synced'));
}).catch(e=>console.warn('Using published recipe markup:',e.message));
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',run);else run();
})();