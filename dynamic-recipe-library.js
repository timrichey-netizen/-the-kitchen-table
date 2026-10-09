/* Dynamically discover published recipe HTML pages in the public GitHub Pages repository.
 * No user account, spreadsheet authentication, or database token is required.
 * The four original cards stay available when GitHub API access is unavailable.
 */
(function(){
'use strict';
var grid=document.getElementById('recipeGrid');if(!grid)return;
var api='https://api.github.com/repos/timrichey-netizen/-the-kitchen-table/contents';
var exclude=new Set(['index.html','privacy.html','my-meal.html','pantry-to-plate.html','plan-a-meal.html','plate-composer.html','sauces.html','guides.html']);
function el(tag,cls,txt){var v=document.createElement(tag);if(cls)v.className=cls;if(txt!==undefined)v.textContent=txt;return v}
function cardFromPage(file,doc){
 var root=doc.querySelector('.recipe-page.recipe-detail');if(!root)return null;
 var title=root.querySelector('.recipe-name-local')?.textContent.trim();
 if(!title)return null;
 var english=(root.querySelector('.recipe-name-english')?.textContent||'').replace(/^\\(|\\)$/g,'').trim();
 var meta=(root.querySelector('.recipe-compact-meta')?.textContent||'').split('·').map(s=>s.trim());
 var world=meta[0]||'',country=meta[1]||'',region=meta[2]||'',classification=meta[3]||'';
 var difficulty=root.querySelector('.recipe-preparation-classification strong')?.textContent.trim()||'';
 var paragraphs=[...root.querySelectorAll('.recipe-top p')].map(x=>x.textContent.trim());
 var description=paragraphs.find(t=>t.length>65&&!t.startsWith('Preparation Classification'))||'Explore the complete recipe and preparation instructions.';
 var image=root.querySelector('.recipe-image-large')?.getAttribute('src')||'';
 var panels=[...root.querySelectorAll('.recipe-cols .recipe-panel')];
 var ingredients=(panels[0]?.innerText||panels[0]?.textContent||'').slice(0,5000);
 var allergenText=(root.textContent.match(/Allergens?\\s*[:：]\\s*([^\\n]+)/i)||[])[1]||'';
 var category=/dessert/i.test(classification)?'desserts-baked':/appetizer|starter/i.test(classification)?'appetizers-starters':/soup|stew|broth/i.test(classification)?'soups-stews-broths':/salad|side/i.test(classification)?'salads-sides':/breakfast|bread/i.test(classification)?'breakfast-breads':/sauce|seasoning/i.test(classification)?'sauces-seasonings':/beverage|drink/i.test(classification)?'beverages':'entrees-mains';
 var card=el('article','recipe-card');card.dataset.category=category;card.dataset.worldRegion=world;card.dataset.classification=classification;card.dataset.difficulty=difficulty;card.dataset.ingredients=ingredients;card.dataset.allergens=allergenText;card.dataset.search=[title,english,country,region].join(' ');
 var heading=el('div','recipe-card-heading');heading.appendChild(el('div','recipe-card-brand','THE KITCHEN TABLE'));
 var h3=el('h3');var link=el('a');link.href=file;link.appendChild(el('span','recipe-title-original',title));
 if(english&&english.toLowerCase()!==title.toLowerCase())link.appendChild(el('span','recipe-title-english','('+english+')'));
 h3.appendChild(link);heading.appendChild(h3);
 var location=el('div','recipe-card-location');location.appendChild(el('span','card-food-type',classification.toUpperCase()||'RECIPE'));location.appendChild(el('span','card-country',country.toUpperCase()));location.appendChild(el('span','card-region',region.toUpperCase()));heading.appendChild(location);card.appendChild(heading);
 if(image){var imageLink=el('a');imageLink.href=file;var img=el('img');img.src=image;img.alt=title;img.loading='lazy';img.onerror=function(){img.hidden=true};imageLink.appendChild(img);card.appendChild(imageLink)}
 var body=el('div','recipe-card-body');body.appendChild(el('p',null,description));var open=el('a',null,'View recipe →');open.href=file;body.appendChild(open);card.appendChild(body);
 return card;
}
async function discover(){
 try{
  var response=await fetch(api,{headers:{Accept:'application/vnd.github+json'}});
  if(!response.ok)throw Error('Published catalog listing unavailable');
  var files=await response.json();if(!Array.isArray(files))return;
  var paths=files.filter(x=>x.type==='file'&&/^[a-z0-9-]+\\.html$/.test(x.name)&&!exclude.has(x.name)&&!/-guide\\.html$/.test(x.name));
  var existing=new Set([...grid.querySelectorAll('article.recipe-card h3 a')].map(a=>a.getAttribute('href')?.split('?')[0]));
  var pending=paths.filter(x=>!existing.has(x.name));
  for(var index=0;index<pending.length;index+=6){
   await Promise.all(pending.slice(index,index+6).map(async item=>{
    try{var r=await fetch(item.name);if(!r.ok)return;var doc=new DOMParser().parseFromString(await r.text(),'text/html');
    var card=cardFromPage(item.name,doc);if(card&&!grid.querySelector('article.recipe-card h3 a[href="'+item.name+'"]'))grid.appendChild(card)}
    catch(e){console.warn('Recipe unavailable:',item.name)}
   }));
  }
  if(window.KitchenTableRefreshLibrary)window.KitchenTableRefreshLibrary();
 }catch(e){console.warn('Using published recipe cards embedded in site:',e.message)}
}
discover();
})();
