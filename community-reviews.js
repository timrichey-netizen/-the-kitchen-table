(function(){
'use strict';
const cfg=window.KITCHEN_TABLE_REVIEWS||{};
if(!cfg.enabled||!cfg.appsScriptUrl)return;
const clean=x=>String(x||'').replace(/[^a-z0-9-]/gi,'').slice(0,100);
function slug(url){try{return clean(new URL(url,location.href).pathname.split('/').pop().replace(/\.html$/,''))}catch(e){return''}}
function load(id,done){
  const cb='ktReviewsCallback_'+Date.now()+'_'+Math.round(Math.random()*1e6);
  const tag=document.createElement('script');let finished=false;
  const clear=()=>{delete window[cb];tag.remove()};
  window[cb]=data=>{finished=true;clear();done(data)};
  tag.src=cfg.appsScriptUrl+'?recipe='+encodeURIComponent(id)+'&callback='+cb;
  tag.onerror=()=>{if(!finished){clear();done({ok:false})}};
  document.head.appendChild(tag);
  setTimeout(()=>{if(!finished){clear();done({ok:false})}},12000);
}
function summaryText(r){if(!r||!r.count)return 'No community ratings yet';return '★ '+r.average.toFixed(1)+'/5 · '+r.count+' community rating'+(r.count===1?'':'s')}
function display(data,id){
 if(!data?.ok)return;
 const box=document.querySelector('[data-community-recipe="'+id+'"]');
 if(box){
   const stats=box.querySelector('.community-stats');if(stats)stats.textContent=summaryText(data.rating);
   const comments=box.querySelector('.community-comments');
   if(comments){
     comments.replaceChildren();
     (data.comments||[]).forEach(c=>{const item=document.createElement('article');item.className='community-review';
       const person=document.createElement('strong');person.textContent=c.name||'Visitor';
       const para=document.createElement('p');para.textContent=c.comment||'';
       item.append(person,para);comments.appendChild(item)
     });
     if(!comments.children.length)comments.textContent='No approved comments yet.';
   }
 }
 document.querySelectorAll('#recipeGrid .recipe-card').forEach(card=>{
  if(slug(card.querySelector('h3 a')?.href)!==id)return;
  let label=card.querySelector('.community-card-rating');if(!label){label=document.createElement('div');label.className='community-card-rating';card.querySelector('.recipe-card-body')?.prepend(label)}
  if(label)label.textContent=summaryText(data.rating);
 });
}
function init(){
 const page=document.querySelector('.recipe-page.recipe-detail');
 if(page){
  const id=slug(location.href);
  const box=document.createElement('section');box.className='community-reviews';box.dataset.communityRecipe=id;
  const title=document.createElement('h2');title.textContent='Community ratings & reviews';
  const stat=document.createElement('p');stat.className='community-stats';stat.textContent='Loading community ratings…';
  const comments=document.createElement('div');comments.className='community-comments';
  box.append(title,stat,comments);
  const anchor=page.querySelector('.recipe-cols');if(anchor)anchor.insertAdjacentElement('afterend',box);
  load(id,data=>display(data,id));
 }
 document.querySelectorAll('#recipeGrid .recipe-card').forEach(card=>{const id=slug(card.querySelector('h3 a')?.href);if(id)load(id,data=>display(data,id))});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
