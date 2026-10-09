/* A photograph is optional. Missing images never make a published recipe unavailable. */
(function(){
 'use strict';
 function missing(img){
   if(img.dataset.imageStatus==='missing')return;
   const card=img.closest('.recipe-card');
   const detail=img.closest('.recipe-page.recipe-detail');
   if(!card&&!detail)return;
   img.dataset.imageStatus='missing';
   img.hidden=true;
   img.style.display='none';
   const parent=img.parentElement;
   if(!parent)return;
   if(parent.querySelector('.recipe-image-unavailable-note'))return;
   const note=document.createElement('span');
   note.className='recipe-image-unavailable-note';
   note.textContent='Recipe available · Photograph coming soon';
   note.setAttribute('role','status');
   parent.appendChild(note);
 }
 document.addEventListener('error',function(e){if(e.target instanceof HTMLImageElement)missing(e.target)},true);
 function check(){
   document.querySelectorAll('.recipe-card img,.recipe-page.recipe-detail img').forEach(function(img){
     if(img.complete&&img.naturalWidth===0)missing(img);
   });
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',check);
 else check();
})();
