(function(){'use strict';
const key='kitchen-table-favorites-v1';
const catalog=[
{id:'neapolitan-lasagna.html',name:'Lasagna Napoletana',english:'Neapolitan Lasagna',place:'Italy · Campania',desc:'Traditional Neapolitan lasagna',image:''},
{id:'vincisgrassi.html',name:'Vincisgrassi',english:'',place:'Italy · Marche',desc:'Traditional layered pasta from Marche',image:''},
{id:'pasta-alla-norma.html',name:'Pasta alla Norma',english:'',place:'Italy · Sicilia',desc:'Tomato, eggplant, ricotta salata and basil',image:'https://drive.google.com/thumbnail?id=1nyaXVKS54iHgJMLFd9-022BO50t-fXmJ&sz=w1200'},
{id:'pasta-with-bottarga.html',name:'Pasta con la Bottarga',english:'Pasta with Bottarga',place:'Italy · Sicilia',desc:'Pasta with cured tuna roe, olive oil and garlic',image:'https://drive.google.com/thumbnail?id=1ARuukNqXeHcAkWHqmheo9SQCR5udWTnO&sz=w1200'}
];
let cloud=null;
function auth(){const a=window.KitchenTableAccount;return a&&a.ready&&a.user?a:null}
function get(){if(auth())return cloud||[];try{const s=JSON.parse(localStorage.getItem(key)||'[]');return Array.isArray(s)?s:[]}catch(e){return[]}}
function draw(){
 const saved=get();const rows=catalog.filter(r=>saved.includes(r.id));
 const grid=document.getElementById('savedRecipes'),empty=document.getElementById('savedEmpty');
 grid.replaceChildren();document.getElementById('savedCount').textContent=rows.length+' saved recipe'+(rows.length===1?'':'s');empty.hidden=rows.length!==0;grid.hidden=rows.length===0;
 rows.forEach(r=>{const article=document.createElement('article');article.className='saved-card';
 if(r.image){const link=document.createElement('a');link.href=r.id;const img=document.createElement('img');img.src=r.image;img.alt=r.name;img.loading='lazy';img.onerror=()=>img.remove();link.append(img);article.append(link)}
 const body=document.createElement('div');body.className='saved-card-body';const meta=document.createElement('p');meta.className='saved-card-meta';meta.textContent=r.place;const title=document.createElement('h2');const a=document.createElement('a');a.href=r.id;a.textContent=r.name;title.append(a);const desc=document.createElement('p');desc.textContent=r.desc;
 const actions=document.createElement('div');actions.className='saved-card-actions';const view=document.createElement('a');view.href=r.id;view.className='saved-view';view.textContent='View recipe →';const remove=document.createElement('button');remove.type='button';remove.className='saved-remove';remove.textContent='Remove ♡';remove.setAttribute('aria-label','Remove '+r.name+' from favorites');remove.onclick=()=>discard(r.id);actions.append(view,remove);body.append(meta,title,desc,actions);article.append(body);grid.append(article)})
}
async function discard(id){const a=auth();if(a){cloud=(cloud||[]).filter(x=>x!==id);draw();try{const response=await a.request('remove',id);cloud=response.favorites;draw()}catch(e){await sync()}}else{localStorage.setItem(key,JSON.stringify(get().filter(x=>x!==id)));draw()}}
async function sync(){const a=auth();if(!a){cloud=null;draw();return}try{const r=await a.request('list');cloud=r.favorites||[]}catch(e){cloud=[]}draw()}
window.addEventListener('storage',draw);document.addEventListener('kitchen-table-account-change',sync);if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',sync);else sync();
})();