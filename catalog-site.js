(function(){
'use strict';
const root=document.getElementById('catalogRoot'),detail=document.getElementById('catalogRecipe');
if(!root&&!detail)return;
const safe=s=>String(s||'');
const esc=s=>safe(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const files=Array.from({length:20},(_,i)=>'catalog/recipes-'+(3+i*50)+'.json');
const localPages={3:'neapolitan-lasagna.html',4:'vincisgrassi.html',5:'pasta-alla-norma.html',11:'pasta-with-bottarga.html'};
const href=r=>localPages[r.id]||('catalog-recipe.html?row='+r.id);
const rowsText=t=>esc(t).replace(/\r?\n/g,'<br>');
async function get(path){const response=await fetch(path);if(!response.ok)throw Error('Could not load '+path);return response.json()}
if(root){
 let recipes=[],selected='all',region='all',country='all',difficulty='all',keyword='';
 root.innerHTML='<div class="catalog-bar"><input id="catalogSearch" type="search" placeholder="Search recipes, ingredients and places" aria-label="Search published recipes"><select id="catalogType"><option value="all">All recipe classifications</option></select><select id="catalogRegion"><option value="all">All world regions</option></select><select id="catalogCountry"><option value="all">All countries</option></select><select id="catalogDifficulty"><option value="all">All difficulties</option></select></div><p id="catalogCount" aria-live="polite">Loading recipes…</p><div class="catalog-grid" id="catalogGrid"></div><button id="catalogMore" type="button" hidden>Show more recipes</button>';
 const grid=document.getElementById('catalogGrid'),count=document.getElementById('catalogCount'),more=document.getElementById('catalogMore');
 let shown=0,matched=[];
 function choices(id,field){let el=document.getElementById(id);[...new Set(recipes.map(x=>safe(x[field]).trim()).filter(Boolean))].sort((a,b)=>a.localeCompare(b)).forEach(value=>{let opt=document.createElement('option');opt.value=value;opt.textContent=value;el.append(opt)})}
 function card(r){let a=document.createElement('article');a.className='catalog-card';let image=r.y?'<img loading="lazy" alt="" src="https://drive.google.com/thumbnail?id='+encodeURIComponent(r.y)+'&sz=w500" onerror="this.remove()">':'';a.innerHTML='<a href="'+esc(href(r))+'">'+image+'<span class="catalog-card-inner"><span class="catalog-card-place">'+esc([r.h,r.f,r.g].filter(Boolean).join(' · '))+'</span><strong>'+esc(r.p)+'</strong>'+((r.q&&r.q!==r.p)?'<span class="catalog-english">'+esc(r.q)+'</span>':'')+'<span class="catalog-card-summary">'+esc(r.u)+'</span><span class="catalog-card-view">View recipe →</span></span></a>';return a}
 function render(reset){if(reset){grid.replaceChildren();shown=0}let stop=Math.min(shown+30,matched.length);let fragment=document.createDocumentFragment();for(let i=shown;i<stop;i++)fragment.append(card(matched[i]));grid.append(fragment);shown=stop;more.hidden=shown>=matched.length;count.textContent=matched.length+' recipes found'}
 function filter(){keyword=document.getElementById('catalogSearch').value.trim().toLowerCase();selected=document.getElementById('catalogType').value;region=document.getElementById('catalogRegion').value;country=document.getElementById('catalogCountry').value;difficulty=document.getElementById('catalogDifficulty').value;matched=recipes.filter(x=>(selected==='all'||x.ae===selected)&&(region==='all'||x.h===region)&&(country==='all'||x.f===country)&&(difficulty==='all'||x.af===difficulty)&&(!keyword||[x.p,x.q,x.c,x.f,x.g,x.u].join(' ').toLowerCase().includes(keyword)));render(true)}
 ['catalogSearch','catalogType','catalogRegion','catalogCountry','catalogDifficulty'].forEach(id=>document.getElementById(id).addEventListener(id==='catalogSearch'?'input':'change',filter));
 more.addEventListener('click',()=>render(false));
 Promise.all(files.map(get)).then(parts=>{recipes=parts.flat().filter(x=>x.p&&x.c&&x.s);choices('catalogType','ae');choices('catalogRegion','h');choices('catalogCountry','f');choices('catalogDifficulty','af');filter()}).catch(()=>count.textContent='Recipe collection is temporarily unavailable.');
}
if(detail){
 const row=Number(new URLSearchParams(location.search).get('row'));
 if(!Number.isInteger(row)||row<3||row>1004){detail.textContent='Recipe not found';return}
 const bucket=3+Math.floor((row-3)/50)*50;
 get('catalog/recipes-'+bucket+'.json').then(items=>{
  const r=items.find(x=>x.id===row);if(!r){detail.textContent='Recipe not published';return}
  document.title=r.p+' | The Kitchen Table';
  const image=r.y?'<img class="catalog-detail-image" src="https://drive.google.com/thumbnail?id='+encodeURIComponent(r.y)+'&sz=w1200" alt="'+esc(r.p)+'" onerror="this.remove()">':'';
  const body=(r.s||'').split(/\n/).map(x=>x.trim()).filter(Boolean);
  const instructions=body.map(x=>/^(?:\d+[.)]|step\s+\d+)/i.test(x)?'<p class="catalog-step">'+esc(x)+'</p>':'<p>'+esc(x)+'</p>').join('');
  detail.innerHTML='<a class="catalog-back" href="all-recipes.html">← All recipes</a><div class="catalog-detail-heading"><p class="eyebrow">'+esc([r.h,r.f,r.g].filter(Boolean).join(' · '))+'</p><h1>'+esc(r.p)+'</h1>'+((r.q&&r.q!==r.p)?'<p class="catalog-subtitle">'+esc(r.q)+'</p>':'')+'<p>'+esc(r.t)+'</p><p class="catalog-meta">'+esc([r.i,r.m&&'Total '+r.m+' min',r.ae,r.af].filter(Boolean).join(' · '))+'</p></div>'+image+'<div class="catalog-detail-actions"><button type="button" id="catalogPrint">Print recipe</button><button type="button" id="catalogShare">Share recipe</button><button type="button" id="catalogFavorite">♡ Save favorite</button></div><div class="catalog-detail-columns"><section><h2>Ingredients</h2><div class="catalog-lines">'+rowsText(r.c)+'</div><h2>Equipment</h2><div class="catalog-lines">'+rowsText(r.e)+'</div><h2>Allergens</h2><p>'+esc(r.n||'Not specified; absence of information does not mean allergen-free')+'</p></section><section><h2>Preparation</h2><div class="catalog-steps">'+instructions+'</div><h2>Possible Alterations & Benefits</h2><div class="catalog-lines">'+rowsText(r.v)+'</div></section></div>';
  document.getElementById('catalogPrint').onclick=()=>window.print();
  document.getElementById('catalogShare').onclick=()=>{if(navigator.share)navigator.share({title:r.p,url:location.href}).catch(()=>{});else if(navigator.clipboard)navigator.clipboard.writeText(location.href)};
  const favorite=document.getElementById('catalogFavorite'),key='kitchen-table-favorites-v1',slug=href(r);
  function saved(){try{return JSON.parse(localStorage.getItem(key)||'[]')}catch(e){return []}}
  function refresh(){favorite.textContent=saved().includes(slug)?'♥ Saved':'♡ Save favorite'}
  favorite.onclick=()=>{let next=saved();next=next.includes(slug)?next.filter(x=>x!==slug):next.concat(slug);localStorage.setItem(key,JSON.stringify(next));refresh()};refresh();
 }).catch(()=>detail.textContent='Recipe unavailable. Please try again later.');
}
})();