(function(){
'use strict';
const KEY='kt-recipe-preferences-v1';
const FAVORITES='kitchen-table-favorites-v1';
const APPROVED=['neapolitan-lasagna.html','vincisgrassi.html','pasta-alla-norma.html','pasta-with-bottarga.html'];
const TITLES={'neapolitan-lasagna.html':'Lasagna Napoletana','vincisgrassi.html':'Vincisgrassi','pasta-alla-norma.html':'Pasta alla Norma','pasta-with-bottarga.html':'Pasta con la Bottarga'};
function defaults(){return {preferred:[],difficulty:'all',region:'all',prioritizeFavorites:true,personalizeDaily:true};}
function read(){let obj;try{obj=JSON.parse(localStorage.getItem(KEY)||'{}')}catch(e){obj={}}return {...defaults(),...obj,preferred:Array.isArray(obj.preferred)?obj.preferred.filter(x=>APPROVED.includes(x)):[]};}
function write(value){localStorage.setItem(KEY,JSON.stringify(value));document.dispatchEvent(new Event('kt-preferences-changed'));}
function favorites(){try{return JSON.parse(localStorage.getItem(FAVORITES)||'[]').filter(x=>APPROVED.includes(x))}catch(e){return []}}
function catalog(){
 const cards=[...document.querySelectorAll('#recipeGrid .recipe-card')];
 return cards.map(card=>{const link=card.querySelector('h3 a[href]')||card.querySelector('a[href$=".html"]');const id=link?.getAttribute('href')?.split('/').pop();return{id,card,region:card.querySelector('.card-region')?.textContent.trim()||'',difficulty:card.dataset.difficulty||''}}).filter(x=>APPROVED.includes(x.id));
}
function ranked(items,prefs){
 const favoritesSet=new Set(favorites());
 return items.map(item=>({...item,score:(prefs.preferred.includes(item.id)?100:0)+(prefs.prioritizeFavorites&&favoritesSet.has(item.id)?50:0)+(prefs.difficulty!=='all'&&prefs.difficulty===item.difficulty?20:0)+(prefs.region!=='all'&&prefs.region===item.region?20:0)})).sort((a,b)=>b.score-a.score||a.id.localeCompare(b.id));
}
function chooseDay(items,prefs){if(!items.length)return null;const pool=ranked(items,prefs);const best=pool[0].score;const candidates=best>0?pool.filter(x=>x.score===best):pool;return candidates[Math.floor(Date.now()/86400000)%candidates.length]}
function updateDaily(){
 const prefs=read();if(!prefs.personalizeDaily)return;
 const item=chooseDay(catalog(),prefs);if(!item)return;
 const card=item.card;const title=card.querySelector('.recipe-title-original')?.textContent.trim()||TITLES[item.id];const english=card.querySelector('.recipe-title-english')?.textContent.trim()||'';
 const heading=document.getElementById('featuredRecipeTitle');if(!heading)return;
 heading.replaceChildren();const local=document.createElement('span');local.className='featured-local-name';local.textContent=title;heading.appendChild(local);
 if(english&&english.toLowerCase()!==title.toLowerCase()){const sub=document.createElement('span');sub.className='featured-english-name';sub.textContent=english.startsWith('(')?english:'('+english+')';heading.appendChild(sub)}
 const description=document.getElementById('featuredRecipeDescription');if(description)description.textContent=card.querySelector('.recipe-card-body p')?.textContent.trim()||'';
 const link=document.getElementById('featuredRecipeLink');if(link){link.href=item.id;link.hidden=false}
 const image=document.getElementById('featuredRecipeImage');const src=card.querySelector('img')?.getAttribute('src');if(image&&src)image.src=src;
 const location=document.getElementById('featuredRecipeLocation');const cardLocation=card.querySelector('.recipe-card-location');if(location&&cardLocation)location.textContent=cardLocation.textContent.trim();
}
function initPage(){
 const form=document.getElementById('recipePreferencesForm');if(!form)return;
 const prefs=read();const picks=document.getElementById('preferredRecipeChoices');
 APPROVED.forEach(id=>{const label=document.createElement('label');label.className='preference-pick';const box=document.createElement('input');box.type='checkbox';box.name='preferredRecipe';box.value=id;box.checked=prefs.preferred.includes(id);label.append(box,document.createTextNode(' '+TITLES[id]));picks.appendChild(label)});
 ['difficulty','region'].forEach(k=>{form.elements[k].value=prefs[k]});
 form.elements.prioritizeFavorites.checked=prefs.prioritizeFavorites;form.elements.personalizeDaily.checked=prefs.personalizeDaily;
 form.addEventListener('submit',e=>{e.preventDefault();const next={preferred:[...form.querySelectorAll('input[name="preferredRecipe"]:checked')].map(x=>x.value),difficulty:form.elements.difficulty.value,region:form.elements.region.value,prioritizeFavorites:form.elements.prioritizeFavorites.checked,personalizeDaily:form.elements.personalizeDaily.checked};write(next);document.getElementById('preferencesStatus').textContent='Preferences saved on this device. Account synchronization will become available after the member service is connected.'});
}
function suggestions(){
 const area=document.getElementById('suggestedRecipeList');if(!area)return;
 const prefs=read();
 const recipes=APPROVED.map(id=>({id,region:id==='vincisgrassi.html'?'Marche':id==='neapolitan-lasagna.html'?'Campania':'Sicilia',difficulty:id==='pasta-with-bottarga.html'?'Easy':id==='pasta-alla-norma.html'?'Moderate':'Challenging'}));
 const favSet=new Set(favorites());ranked(recipes,prefs).forEach(item=>{let why=[];if(prefs.preferred.includes(item.id))why.push('Preferred recipe');if(prefs.prioritizeFavorites&&favSet.has(item.id))why.push('Saved favorite');if(prefs.difficulty===item.difficulty)why.push('Preferred difficulty');if(prefs.region===item.region)why.push('Preferred region');const card=document.createElement('article');card.className='suggested-item';const h=document.createElement('h2');h.textContent=TITLES[item.id];const note=document.createElement('p');note.textContent=why.join(' · ')||'Explore a published recipe';const a=document.createElement('a');a.href=item.id;a.textContent='View recipe →';card.append(h,note,a);area.appendChild(card)});
}
function init(){initPage();suggestions();updateDaily();document.addEventListener('kt-preferences-changed',updateDaily);}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.KitchenTableRecipePreferences={read,write};
})();