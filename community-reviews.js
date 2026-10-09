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
  if(cfg.googleClientId){
   const panel=document.createElement('div');panel.className='community-submit';
   const heading=document.createElement('h3');heading.textContent='Submit your community rating';
   const help=document.createElement('p');help.textContent='Sign in with Google to submit one rating per recipe. Comments are reviewed before appearing publicly.';
   const login=document.createElement('div');
   const stars=document.createElement('div');stars.className='community-rating-stars';stars.setAttribute('role','group');stars.setAttribute('aria-label','Choose one to five stars');
   let chosen=0,credential='';
   const comment=document.createElement('textarea');comment.placeholder='Optional comment (up to 1,200 characters)';comment.maxLength=1200;comment.rows=3;
   const submit=document.createElement('button');submit.type='button';submit.className='community-rating-submit';submit.textContent='Submit community rating';submit.disabled=true;
   const status=document.createElement('p');status.setAttribute('role','status');
   for(let n=1;n<=5;n++){const b=document.createElement('button');b.type='button';b.textContent='★';b.title=n+' stars';b.setAttribute('aria-label',n+' stars');b.addEventListener('click',()=>{chosen=n;stars.querySelectorAll('button').forEach((x,i)=>x.classList.toggle('chosen',i<n));submit.disabled=!credential});stars.appendChild(b)}
   submit.addEventListener('click',()=>{
     if(!credential||!chosen)return;
     const form=document.createElement('form');form.method='POST';form.action=cfg.appsScriptUrl;form.target='_blank';
     const entries={recipe:id,rating:String(chosen),comment:comment.value,idToken:credential,action:'review'};
     Object.entries(entries).forEach(([name,value])=>{const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;form.appendChild(input)});
     document.body.appendChild(form);form.submit();form.remove();
     status.textContent='A Google confirmation tab has opened. Return here and refresh to view the updated community average. Comments await approval.';
   });
   panel.append(heading,help,login,stars,comment,submit,status);box.appendChild(panel);
   function renderGoogleSignIn(){
    if(!window.google?.accounts?.id)return;
    google.accounts.id.initialize({client_id:cfg.googleClientId,callback:response=>{credential=response.credential;submit.disabled=!chosen;status.textContent='Signed in. Choose a star rating.'}});
    google.accounts.id.renderButton(login,{theme:'outline',size:'medium',text:'signin_with'});
   }
   if(window.google?.accounts?.id)renderGoogleSignIn();
   else{const script=document.createElement('script');script.src='https://accounts.google.com/gsi/client';script.async=true;script.onload=renderGoogleSignIn;document.head.appendChild(script)}
  }
  const anchor=page.querySelector('.recipe-cols');if(anchor)anchor.insertAdjacentElement('afterend',box);
  load(id,data=>display(data,id));
 }
 // Recipe cards use the single aggregated rating from /api/recipe-feedback.
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
