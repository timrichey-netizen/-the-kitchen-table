/* Optional, consent-based member signals. Browser-only until verified backend exists. */
(function(){
'use strict';
const KEY='kt-member-interests-v1', MAX_EVENTS=160, COOL_OFF_MS=21*86400000;
const RECIPES=['neapolitan-lasagna.html','vincisgrassi.html','pasta-alla-norma.html','pasta-with-bottarga.html'];
const TITLES={'neapolitan-lasagna.html':'Lasagna Napoletana','vincisgrassi.html':'Vincisgrassi','pasta-alla-norma.html':'Pasta alla Norma','pasta-with-bottarga.html':'Pasta con la Bottarga'};
function loggedIn(){return !!(window.KitchenTableAccount?.ready&&window.KitchenTableAccount?.user)}
function read(){try{const x=JSON.parse(localStorage.getItem(KEY)||'{}');return {consent:x.consent===true,events:Array.isArray(x.events)?x.events.slice(-MAX_EVENTS):[]}}catch(e){return {consent:false,events:[]}}}
function save(x){localStorage.setItem(KEY,JSON.stringify(x))}
function recipeId(s){try{const name=new URL(s,location.href).pathname.split('/').pop();return RECIPES.includes(name)?name:null}catch(e){return null}}
function record(type,details={}){
 if(!loggedIn())return;
 const x=read();if(!x.consent)return;
 const allowed=['view','search','filter','share','print','favorite','recommended'];
 if(!allowed.includes(type))return;
 const id=recipeId(details.recipe||location.href);
 // Search terms are NOT retained to avoid collecting potentially sensitive free text.
 const event={type,at:Date.now()};
 if(id)event.recipe=id;
 if(type==='filter'&&typeof details.filter==='string')event.filter=details.filter.slice(0,64);
 if(type==='search')event.type='search'; 
 x.events.push(event);x.events=x.events.slice(-MAX_EVENTS);save(x);
}
function recommend(){
 if(!loggedIn()||!read().consent)return [];
 const x=read(),now=Date.now(),seen=new Map(),weights={favorite:8,print:6,share:5,view:2};
 const scores=Object.fromEntries(RECIPES.map(id=>[id,0]));
 x.events.forEach(e=>{
   if(e.recipe&&!RECIPES.includes(e.recipe))return;
   if(e.type==='recommended'&&e.recipe)seen.set(e.recipe,Math.max(seen.get(e.recipe)||0,e.at));
   if(e.recipe&&weights[e.type])scores[e.recipe]+=weights[e.type];
 });
 return RECIPES.filter(id=>now-(seen.get(id)||0)>COOL_OFF_MS)
   .sort((a,b)=>scores[b]-scores[a]||(seen.get(a)||0)-(seen.get(b)||0))
   .map(id=>({id,title:TITLES[id]}));
}
function widget(){
 const host=document.getElementById('memberInterestSettings');if(!host)return;
 const check=host.querySelector('#memberInterestOptIn'),clear=host.querySelector('#memberInterestClear'),status=host.querySelector('#memberInterestStatus');
 const x=read();check.checked=x.consent;
 check.addEventListener('change',()=>{const y=read();y.consent=check.checked;if(!check.checked)y.events=[];save(y);status.textContent=check.checked?'Preference tracking enabled on this device when signed in.':'Tracking disabled and local activity history cleared.';render()});
 clear.addEventListener('click',()=>{save({consent:false,events:[]});check.checked=false;status.textContent='Local preference history cleared.';render()});
 render();
}
function render(){
 const host=document.getElementById('memberInterestSuggestions');if(!host)return;host.replaceChildren();
 if(!loggedIn()){host.textContent='Sign in to use optional member recommendations.';return}
 if(!read().consent){host.textContent='Enable activity-based recommendations above to see suggestions.';return}
 const suggestions=recommend();if(!suggestions.length){host.textContent='You have seen all available recommendations recently. Check back as new recipes are added.';return}
 suggestions.slice(0,3).forEach(s=>{record('recommended',{recipe:s.id});const p=document.createElement('p');const link=document.createElement('a');link.href=s.id;link.textContent=s.title;p.append(link);host.append(p)});
}
document.addEventListener('click',e=>{
 const link=e.target.closest('a[href$=".html"]');
 if(link){const id=recipeId(link.href);if(id)record('view',{recipe:id})}
 const fav=e.target.closest('.favorite-toggle,[data-favorite],.favorite-page-button');
 if(fav)record('favorite');
 const share=e.target.closest('[onclick*="Share"],[onclick*="share"],[data-share]');
 if(share)record('share');
 const filters=e.target.closest('#categories [data-filter]');
 if(filters)record('filter',{filter:filters.dataset.filter});
});
document.addEventListener('change',e=>{if(e.target.matches('#browserWorldRegion,#browserCountry,#browserRegion,#browserClassification,#browserDifficulty,#browserAllergen'))record('filter',{filter:e.target.id+':'+e.target.value})});
document.addEventListener('submit',e=>{if(e.target.matches('form[role="search"]'))record('search')});
let searchTouched=false;
document.addEventListener('input',e=>{if(e.target.id==='recipeSearch'&&!searchTouched&&e.target.value.trim()){searchTouched=true;record('search')}});
document.addEventListener('change',e=>{if(e.target.id==='recipeSearch')searchTouched=false});
window.addEventListener('beforeprint',()=>record('print'));
document.addEventListener('kitchen-table-account-change',render);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',widget);else widget();
window.KitchenTableMemberInterests={record,recommend,read};
})();