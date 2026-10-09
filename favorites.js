(function(){
'use strict';
const KEY='kitchen-table-favorites-v1';
let cloudFavorites=null;
const allowedIds=new Set(['neapolitan-lasagna.html','vincisgrassi.html','pasta-alla-norma.html','pasta-with-bottarga.html']);
function backend(){const a=window.KitchenTableAccount;return a&&a.ready&&a.user?a:null}
async function loadCloud(){
 const a=backend();
 if(!a){cloudFavorites=null;refresh();return}
 if(Array.isArray(a.favorites)){cloudFavorites=a.favorites.filter(id=>allowedIds.has(id));refresh();return}
 try{const response=await a.request('list');cloudFavorites=response.favorites.filter(id=>allowedIds.has(id));refresh()}
 catch(err){console.warn('Favorites sync unavailable:',err.message);cloudFavorites=null;refresh()}
}
async function persistCloud(id,on){
 const a=backend();if(!a)return;
 try{const result=await a.request(on?'add':'remove',id);cloudFavorites=result.favorites.filter(x=>allowedIds.has(x));refresh()}
 catch(err){console.warn('Favorites could not sync:',err.message);await loadCloud()}
}

function get(){if(backend()&&cloudFavorites!==null)return cloudFavorites.slice();if(backend())return [];try{const v=JSON.parse(localStorage.getItem(KEY)||'[]');return Array.isArray(v)?v.filter(x=>allowedIds.has(x)):[]}catch(e){return[]}}
function save(v){try{localStorage.setItem(KEY,JSON.stringify(v))}catch(e){}}
function slug(url){try{return new URL(url,location.href).pathname.split('/').pop()}catch(e){return url}}
function toggle(id){if(!allowedIds.has(id))return;const list=get();const add=!list.includes(id);const next=add?[...list,id]:list.filter(x=>x!==id);if(backend()){if(cloudFavorites===null)return;cloudFavorites=next;refresh();persistCloud(id,add)}else{save(next);refresh()}}
function make(id){const b=document.createElement('button');b.type='button';b.className='favorite-toggle';b.dataset.favoriteId=id;b.setAttribute('aria-label','Save recipe to favorites');b.innerHTML='<svg viewBox="0 0 24 24" width="23" height="23" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1.1-1.1a5.5 5.5 0 0 0-7.8 7.8L12 21l8.8-8.6a5.5 5.5 0 0 0 0-7.8Z"/></svg>';b.addEventListener('click',()=>toggle(id));return b}
function refresh(){const saved=get();document.querySelectorAll('[data-favorite-id]').forEach(b=>{const yes=saved.includes(b.dataset.favoriteId);b.classList.toggle('is-favorite',yes);b.setAttribute('aria-pressed',String(yes));b.setAttribute('aria-label',yes?'Remove from favorites':'Save recipe to favorites');b.title=yes?'Remove from favorites':'Save to favorites'});const count=document.getElementById('favoriteCount');if(count)count.textContent=saved.length?' ('+saved.length+')':'';const only=document.getElementById('favoritesOnly');if(only&&only.checked)filter();else if(document.getElementById('favoritesOnly'))filter()}
function filter(){const check=document.getElementById('favoritesOnly');if(!check)return;const saved=get();document.body.classList.toggle('favorites-view',check.checked);document.querySelectorAll('#recipeGrid .recipe-card').forEach(c=>{const id=c.querySelector('[data-favorite-id]')?.dataset.favoriteId;const filtered=check.checked&&!saved.includes(id);c.classList.toggle('favorite-filter-hidden',filtered)});const count=document.getElementById('favoriteVisibleCount');if(count)count.textContent=check.checked?saved.length+' saved recipe'+(saved.length===1?'':'s'):''}
function addFavoriteActions(card){
 if(card.querySelector('.favorite-card-actions'))return;
 const link=card.querySelector('h3 a[href]');if(!link)return;
 const id=slug(link.href);if(!allowedIds.has(id))return;
 const actions=document.createElement('div');actions.className='favorite-card-actions';
 const print=document.createElement('a');print.className='favorite-card-action';print.href=id+'?print=1';print.target='_blank';print.rel='noopener';print.textContent='Print';print.setAttribute('aria-label','Print '+link.textContent.trim());
 const share=document.createElement('button');share.type='button';share.className='favorite-card-action';share.textContent='Share';share.setAttribute('aria-label','Share '+link.textContent.trim());
 share.addEventListener('click',async()=>{
  const url=new URL(id,location.href).href;
  const title=link.textContent.trim();
  if(navigator.share){try{await navigator.share({title,url});return}catch(e){if(e.name==='AbortError')return}}
  try{await navigator.clipboard.writeText(url);share.textContent='Link copied';setTimeout(()=>share.textContent='Share',1800)}
  catch(e){window.prompt('Copy this recipe link',url)}
 });
 actions.append(print,share);card.appendChild(actions);
}
function init(){document.querySelectorAll('#recipeGrid .recipe-card').forEach(c=>{const a=c.querySelector('h3 a');if(!a)return;const id=slug(a.href);if(!c.querySelector('.favorite-toggle'))c.appendChild(make(id));addFavoriteActions(c)});const page=document.querySelector('.recipe-page.recipe-detail');if(page&&!page.querySelector('.favorite-toggle')){const id=slug(location.href);const toolbar=page.querySelector('.recipe-print-toolbar');const b=make(id);b.classList.add('favorite-page-button');if(toolbar)toolbar.appendChild(b);else page.prepend(b)}document.getElementById('favoritesOnly')?.addEventListener('change',filter);document.querySelectorAll('[data-favorites-nav]').forEach(a=>a.addEventListener('click',()=>{const check=document.getElementById('favoritesOnly');if(check){check.checked=true;filter();document.getElementById('browserResultCount').textContent=document.querySelectorAll('#recipeGrid .recipe-card:not([hidden]):not(.favorite-filter-hidden)').length+' saved recipes';}}));if(location.hash==='#favorites'||new URLSearchParams(location.search).get('favorites')==='1'){const check=document.getElementById('favoritesOnly');if(check){check.checked=true;filter();}}refresh()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.addEventListener('storage',refresh);
document.addEventListener('kitchen-table-account-change',loadCloud);
})();