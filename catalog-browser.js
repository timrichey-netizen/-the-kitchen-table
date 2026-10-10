(function(){'use strict';
const grid=document.getElementById('recipeGrid'),count=document.getElementById('browserResultCount');
if(!grid)return;
const host=document.getElementById('importedRecipeCatalog');
if(!host)return;
const published=new Set([3,4,5,11]),PAGE=30;
let entries=[],page=0;
const selectors=['browserWorldRegion','browserCountry','browserRegion','browserClassification','browserDifficulty','browserAllergen'];
function get(id){return document.getElementById(id)}
function dishType(c){const t=c.toLowerCase();if(/appetizer|starter/.test(t))return'appetizers-starters';if(/soup|stew|broth/.test(t))return'soups-stews-broths';if(/salad|side dish/.test(t))return'salads-sides';if(/breakfast|bread|sandwich/.test(t))return'breakfast-breads';if(/sauce|condiment|seasoning/.test(t))return'sauces-seasonings';if(/cake|cookie|candy|pastry|pie|tart|galette/.test(t))return'desserts-baked';if(/custard|pudding|mousse|frozen dessert/.test(t))return'desserts-chilled';if(/beverage|drink/.test(t))return'beverages';if(/preserv|pickle|jam|chutney/.test(t))return'preserved-accompaniments';return'entrees-mains'}
function matches(r){
 const q=(get('recipeSearch')?.value||'').toLowerCase().trim();
 if(q&&!(r.local+' '+r.name+' '+r.region+' '+r.country+' '+r.classification).toLowerCase().includes(q))return false;
 const active=document.querySelector('#categories .filter.active')?.dataset.filter||'all';
 if(active!=='all'&&dishType(r.classification||'')!==active)return false;
 const rules=[['browserWorldRegion','world'],['browserCountry','country'],['browserRegion','region'],['browserClassification','classification'],['browserDifficulty','difficulty']];
 for(const [id,key] of rules){const v=get(id)?.value;if(v&&v!=='all'&&r[key]!==v&&!(key==='country'&&v.toLowerCase()==='italy'&&r[key]==='Italia'))return false}
 const a=get('browserAllergen')?.value;if(a&&a!=='all'&&(!r.allergens||r.allergens.split(',').map(x=>x.trim()).includes(a)))return false;
 const fav=get('favoritesOnly');if(fav?.checked){try{if(!JSON.parse(localStorage.getItem('kitchen-table-favorites-v1')||'[]').includes('recipe.html?row='+r.row))return false}catch(e){return false}}
 return true
}
function addOptions(id,key){const sel=get(id);if(!sel)return;const existing=new Set([...sel.options].map(x=>x.value));[...new Set(entries.map(x=>x[key]).filter(Boolean))].sort().forEach(v=>{if(!existing.has(v)){const opt=document.createElement('option');opt.value=v;opt.textContent=v;sel.append(opt)}})}
function draw(reset){if(reset)page=0;
 const filtered=entries.filter(matches),slice=filtered.slice(page*PAGE,(page+1)*PAGE);
 const cards=document.createDocumentFragment();
 slice.forEach(r=>{const article=document.createElement('article');article.className='imported-recipe-card';
 const label=document.createElement('p');label.className='eyebrow';label.textContent=[r.world,r.country,r.region].filter(Boolean).join(' / ');
 const title=document.createElement('h3');const a=document.createElement('a');a.href='recipe.html?row='+r.row;a.textContent=r.local||r.name;title.append(a);
 const subtitle=document.createElement('p');subtitle.textContent=r.name!==r.local?r.name:'';
 const meta=document.createElement('p');meta.className='imported-meta';meta.textContent=r.classification+(r.difficulty?' · '+r.difficulty:'');
 article.append(label,title,subtitle,meta);cards.append(article)});
 // A filter/search reset replaces the result set; Show more appends the next page.
 if(reset)host.replaceChildren(cards);
 else host.appendChild(cards);
 const more=get('catalogMore');if(more){more.hidden=(page+1)*PAGE>=filtered.length;more.textContent='Show more recipes'}
 const status=get('catalogStatus');if(status)status.textContent='Showing '+Math.min((page+1)*PAGE,filtered.length)+' of '+filtered.length+' additional recipes (photographs pending)';
 if(count){const visible=[...grid.querySelectorAll('.recipe-card')].filter(x=>!x.hidden&&getComputedStyle(x).display!=='none').length;count.textContent=(visible+filtered.length)+' recipes found'}
}
function refresh(){draw(true)}
fetch('catalog/recipe-index.json').then(r=>{if(!r.ok)throw Error();return r.json()}).then(rows=>{
 entries=rows.filter(x=>!published.has(x.row));[['browserWorldRegion','world'],['browserCountry','country'],['browserRegion','region'],['browserClassification','classification'],['browserDifficulty','difficulty']].forEach(x=>addOptions(...x));
 document.querySelectorAll('#categories .filter').forEach(x=>x.addEventListener('click',()=>setTimeout(refresh,0)));
 selectors.forEach(id=>get(id)?.addEventListener('change',()=>setTimeout(refresh,0)));
 get('recipeSearch')?.addEventListener('input',()=>setTimeout(refresh,0));
 get('browserClear')?.addEventListener('click',()=>setTimeout(refresh,0));
 get('favoritesOnly')?.addEventListener('change',()=>setTimeout(refresh,0));
 get('catalogMore')?.addEventListener('click',()=>{page++;draw(false)});
 draw(true);
}).catch(()=>{const el=get('catalogStatus');if(el)el.textContent='Additional recipes are temporarily unavailable'});
})();