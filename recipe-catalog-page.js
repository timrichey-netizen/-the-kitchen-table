(function(){'use strict';
const grid=document.getElementById('catalogGrid'),search=document.getElementById('catalogSearch'),availability=document.getElementById('catalogAvailability'),dishType=document.getElementById('catalogDishType'),count=document.getElementById('catalogCount');
if(!grid)return;
let recipes=[];
function node(type,cls,content){let e=document.createElement(type);if(cls)e.className=cls;if(content)e.textContent=content;return e}
function render(){
 const needle=search.value.toLocaleLowerCase().trim(),state=availability.value,dish=dishType.value;
 const matched=recipes.filter(r=>(state==='all'||r.status===state)&&(dish==='all'||r.dishType===dish)&&(!needle||[r.name,r.english,r.country,r.region,r.worldRegion,r.dishType].some(v=>String(v||'').toLocaleLowerCase().includes(needle))));
 count.textContent=matched.length.toLocaleString()+' recipes found · '+recipes.filter(r=>r.status==='available').length+' available now';
 const frag=document.createDocumentFragment();
 matched.slice(0,250).forEach(r=>{
  const article=node('article','catalog-entry');article.dataset.status=r.status;
  article.appendChild(node('h2','',r.name));
  if(r.english&&r.english!==r.name)article.appendChild(node('div','catalog-subtitle',r.english));
  article.appendChild(node('div','catalog-place',[r.country,r.region].filter(Boolean).join(' · ')));
  if(r.status==='available'&&/^[a-z0-9-]+\.html$/.test(r.url||'')){
    const link=node('a','', 'View recipe →');link.href=r.url;article.appendChild(link);
  }else article.appendChild(node('span','catalog-status','Not yet available'));
  frag.appendChild(article);
 });
 grid.replaceChildren(frag);
 if(matched.length>250)grid.appendChild(node('p','catalog-count','Showing first 250 matches. Refine your search to see more.'));
}
fetch('data/recipe-catalog.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error('Catalog unavailable');return r.json()}).then(data=>{
 recipes=Array.isArray(data.recipes)?data.recipes:[];
 [...new Set(recipes.map(r=>r.dishType).filter(Boolean))].sort().forEach(t=>{let opt=document.createElement('option');opt.value=t;opt.textContent=t;dishType.appendChild(opt)});
 [search,availability,dishType].forEach(el=>el.addEventListener(el===search?'input':'change',render));
 render();
}).catch(()=>{count.textContent='Catalog temporarily unavailable. Please try again later.'});
})();