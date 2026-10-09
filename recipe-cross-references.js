/* Public recipe cross-references. Only link to actually published recipe pages.
   No authentication required. New .html recipe sheets are discovered automatically. */
(function(){
'use strict';
const root=document.querySelector('.recipe-page.recipe-detail');
if(!root)return;
const panels=root.querySelectorAll('.recipe-cols > .recipe-panel');
const ingredientPanel=panels[0];
if(!ingredientPanel)return;
const ingredientHeading=[...ingredientPanel.querySelectorAll('h2,h3')].find(n=>/^ingredients$/i.test(n.textContent.trim()));
if(!ingredientHeading)return;
const candidates=[];
for(let n=ingredientHeading.nextElementSibling;n;n=n.nextElementSibling){
 if(/^H[23]$/.test(n.tagName))break;
 if(n.classList?.contains('recipe-line') && n.textContent.trim())candidates.push(n);
}
if(!candidates.length)return;
const api='https://api.github.com/repos/timrichey-netizen/-the-kitchen-table/contents';
const skip=new Set(['index.html','my-meal.html','pantry-to-plate.html','plan-a-meal.html','plate-composer.html','guides.html','sauces.html','privacy.html']);
const current=location.pathname.split('/').pop().toLowerCase();
const known=[
 ['neapolitan-lasagna.html','Lasagna Napoletana','Neapolitan Lasagna'],
 ['vincisgrassi.html','Vincisgrassi','Vincisgrassi'],
 ['pasta-alla-norma.html','Pasta alla Norma','Pasta alla Norma'],
 ['pasta-with-bottarga.html','Pasta con la Bottarga','Pasta with Bottarga']
];
function normalize(x){return String(x||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim()}
function words(x){return normalize(x).split(' ').filter(Boolean)}
function specificity(x){return words(x).filter(w=>!['the','with','and','alla','al','con','di','de','da','in','a','sauce','recipe','stock','broth'].includes(w)).length}
function ingredientMatch(text,name){
 const nameNorm=normalize(name),ingredient=normalize(text);
 if(!nameNorm||!ingredient)return false;
 // Specific exact recipe names are linked when explicitly mentioned.
 const tokens=words(name);
 if(tokens.length>=2 && specificity(name)>=1 && ingredient.includes(nameNorm))return true;
 // For sauces, stocks and broths, avoid linking an unspecified ingredient
 // to an unrelated flavored preparation (e.g. chicken stock to fish stock).
 const recipeKind=/\b(sauce|broth|stock|gravy|jus|salsa)\b/.test(nameNorm);
 if(!recipeKind)return false;
 const kindTokens=tokens.filter(t=>!['recipe','the','a','of','and'].includes(t));
 if(kindTokens.length===1)return new RegExp('\\b'+kindTokens[0]+'\\b').test(ingredient);
 return kindTokens.every(token=>new RegExp('\\b'+token+'\\b').test(ingredient));
}
function nameFrom(doc){
 const r=doc.querySelector('.recipe-page.recipe-detail');if(!r)return null;
 const a=r.querySelector('.recipe-name-local')?.textContent.trim();
 if(!a)return null;
 const b=(r.querySelector('.recipe-name-english')?.textContent||'').replace(/^\(|\)$/g,'').trim();
 return [a,b];
}
async function discover(){
 const data=new Map(known.map(([path,a,b])=>[path,{path,names:[a,b]}]));
 try{
  const response=await fetch(api,{headers:{Accept:'application/vnd.github+json'}});
  if(!response.ok)throw Error('Catalog unavailable');
  const list=await response.json();
  const files=list.filter(f=>f.type==='file' && f.name.endsWith('.html') && !skip.has(f.name));
  await Promise.all(files.map(async file=>{
   if(data.has(file.name))return;
   try{
    const response=await fetch(file.name);
    if(!response.ok)return;
    const doc=new DOMParser().parseFromString(await response.text(),'text/html');
    const names=nameFrom(doc);
    if(names)data.set(file.name,{path:file.name,names});
   }catch(e){}
  }));
 }catch(e){/* Published starter recipes remain available offline. */}
 return [...data.values()].filter(entry=>entry.path.toLowerCase()!==current);
}
function linkMatches(catalog){
 candidates.forEach(line=>{
  if(line.querySelector('.recipe-cross-reference'))return;
  const found=catalog.flatMap(recipe=>{
   const names=[...new Set(recipe.names.filter(Boolean))];
   const match=names.find(n=>ingredientMatch(line.textContent,n));
   return match?[{recipe,match}]:[];
  });
  // Links should only ever point to a single unambiguous recipe.
  if(found.length!==1)return;
  const {recipe,match}=found[0];
  const a=document.createElement('a');
  a.href=recipe.path;
  a.className='recipe-cross-reference';
  a.textContent='View '+(recipe.names[1]||recipe.names[0])+' recipe →';
  a.title='Open the related published recipe for '+match;
  line.appendChild(document.createTextNode(' '));line.appendChild(a);
 });
}
discover().then(linkMatches);
})();
