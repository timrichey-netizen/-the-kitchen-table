(function(){'use strict';
const root=document.getElementById('sourceRecipe');if(!root)return;
const row=Number(new URLSearchParams(location.search).get('row'));
function error(msg){root.textContent=msg}
if(!Number.isInteger(row)||row<2||row>1001){error('Recipe not found');return}
const start=2+Math.floor((row-2)/100)*100,end=start+99;
const html=(tag,cls,txt)=>{const el=document.createElement(tag);if(cls)el.className=cls;el.textContent=txt||'';return el};
Promise.all([fetch('catalog/recipes-'+start+'-'+end+'.json').then(r=>{if(!r.ok)throw Error();return r.json()}),fetch('data/recipe-catalog.json',{cache:'no-cache'}).then(r=>{if(!r.ok)throw Error();return r.json()})]).then(([rows,catalog])=>{
 const r=rows.find(x=>x.row===row),published=(catalog.recipes||[]).find(x=>x.id==='sheet-'+row);
 if(!r||!published||published.status!=='available'||published.name!==r.local||published.english!==r.title||published.country!==r.country||published.region!==r.region)throw Error();
 document.title=(r.title||r.local)+' | The Kitchen Table';root.replaceChildren();
 const back=html('a','','← All recipes');back.href='index.html#recipes';root.append(back);
 const eyebrow=html('p','eyebrow',r.world+' / '+r.country+' / '+r.region);root.append(eyebrow);
 root.append(html('h1','',r.local||r.title));
 if(r.title&&r.title!==r.local)root.append(html('p','source-subtitle','('+r.title+')'));
 if(r.history)root.append(html('p','',r.history));
 const meta=html('div','source-metadata','');
 [r.servings,r.total&&r.total+' minutes total',r.allergens&&'Allergens: '+r.allergens].filter(Boolean).forEach(v=>meta.append(html('span','',v)));root.append(meta);
 const actions=html('div','source-actions','');
 const print=html('button','','Print recipe');print.onclick=()=>window.print();
 const share=html('button','','Share recipe');share.onclick=async()=>{if(navigator.share){try{await navigator.share({title:document.title,url:location.href})}catch(e){}}else if(navigator.clipboard){await navigator.clipboard.writeText(location.href);share.textContent='Link copied'}};
 actions.append(print,share);root.append(actions);
 const grid=html('div','source-grid','');
 const left=html('section','','');left.append(html('h2','','Ingredients'),html('div','source-copy',r.ingredients||'Ingredients not available'));
 if(r.equipment){left.append(html('h2','','Equipment'),html('div','source-copy',r.equipment))}
 const right=html('section','','');right.append(html('h2','','Preparation'),html('div','source-copy',r.instructions||'Instructions not available'));
 grid.append(left,right);root.append(grid);
 root.append(html('p','source-note','Imported from the source spreadsheet · Photograph not yet available'));
}).catch(()=>error('This recipe could not be loaded. Please try again.'));
})();