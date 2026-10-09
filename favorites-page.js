(function(){'use strict';
const storageKey='kitchen-table-favorites-v1';
let cloud=null, catalog=[];
function auth(){const a=window.KitchenTableAccount;return a&&a.ready&&a.user?a:null}
function get(){if(auth())return cloud||[];try{const list=JSON.parse(localStorage.getItem(storageKey)||'[]');return Array.isArray(list)?list:[]}catch(e){return[]}}
function publishedCards(){
 return fetch('index.html',{cache:'no-cache'}).then(response=>{if(!response.ok)throw Error('Recipe library unavailable');return response.text()}).then(html=>{
  const page=new DOMParser().parseFromString(html,'text/html');
  const cards=[...page.querySelectorAll('#recipeGrid .recipe-card')];
  return cards.map(card=>{
   const title=card.querySelector('h3 a[href$=".html"]');
   if(!title)return null;
   const href=title.getAttribute('href'),url=new URL(href,location.href);
   if(url.origin!==location.origin || !/^[-a-z0-9]+\.html$/.test(url.pathname.split('/').pop()))return null;
   return {id:url.pathname.split('/').pop(),name:card.querySelector('.recipe-title-original')?.textContent.trim()||title.textContent.trim(),
    english:card.querySelector('.recipe-title-english')?.textContent.trim()||'',
    place:[card.querySelector('.card-country')?.textContent.trim(),card.querySelector('.card-region')?.textContent.trim()].filter(Boolean).join(' · '),
    desc:card.querySelector('.recipe-card-body p')?.textContent.trim()||'',
    image:card.querySelector('img')?.getAttribute('src')||''};
  }).filter(Boolean);
 });
}
function button(label,cls,onClick){const b=document.createElement('button');b.type='button';b.className=cls;b.textContent=label;b.addEventListener('click',onClick);return b}
async function shareRecipe(row,buttonEl){
 const url=new URL(row.id,location.href).href;
 if(navigator.share){try{await navigator.share({title:row.name,url});return}catch(e){if(e.name==='AbortError')return}}
 try{await navigator.clipboard.writeText(url);buttonEl.textContent='Link copied';setTimeout(()=>buttonEl.textContent='Share',1800)}
 catch(e){window.prompt('Copy recipe link',url)}
}
function draw(){
 const saved=get();const rows=catalog.filter(row=>saved.includes(row.id));
 const grid=document.getElementById('savedRecipes'),empty=document.getElementById('savedEmpty');
 if(!grid||!empty)return;
 grid.replaceChildren();
 document.getElementById('savedCount').textContent=rows.length+' saved recipe'+(rows.length===1?'':'s');
 empty.hidden=rows.length!==0;grid.hidden=rows.length===0;
 rows.forEach(row=>{
  const article=document.createElement('article');article.className='saved-card';
  if(row.image){const link=document.createElement('a');link.href=row.id;const img=document.createElement('img');img.src=row.image;img.alt=row.name;img.loading='lazy';img.onerror=()=>img.remove();link.append(img);article.append(link)}
  const body=document.createElement('div');body.className='saved-card-body';
  const meta=document.createElement('p');meta.className='saved-card-meta';meta.textContent=row.place;
  const heading=document.createElement('h2');const title=document.createElement('a');title.href=row.id;title.textContent=row.name;heading.append(title);
  const desc=document.createElement('p');desc.textContent=row.desc;
  const actions=document.createElement('div');actions.className='saved-card-actions';
  const view=document.createElement('a');view.href=row.id;view.className='saved-view';view.textContent='View recipe →';
  const print=document.createElement('a');print.href=row.id+'?print=1';print.target='_blank';print.rel='noopener';print.className='saved-action';print.textContent='Print';
  const share=button('Share','saved-action',()=>shareRecipe(row,share));
  const remove=button('Remove ♡','saved-remove',()=>discard(row.id));remove.setAttribute('aria-label','Remove '+row.name+' from favorites');
  actions.append(view,print,share,remove);body.append(meta,heading,desc,actions);article.append(body);grid.append(article);
 });
}
async function discard(id){const a=auth();if(a){cloud=(cloud||[]).filter(x=>x!==id);draw();try{const result=await a.request('remove',id);cloud=result.favorites||[];draw()}catch(e){await sync()}}else{localStorage.setItem(storageKey,JSON.stringify(get().filter(x=>x!==id)));draw()}}
async function sync(){const a=auth();if(!a){cloud=null;draw();return}try{const r=await a.request('list');cloud=r.favorites||[]}catch(e){cloud=[]}draw()}
async function init(){try{catalog=await publishedCards()}catch(e){const status=document.getElementById('savedCount');if(status)status.textContent='The recipe library could not be loaded. Refresh to try again.';return}await sync()}
window.addEventListener('storage',draw);document.addEventListener('kitchen-table-account-change',sync);
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
