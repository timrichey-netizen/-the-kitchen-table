(function(){
'use strict';
const key='kt-personal-recipe-ratings-v1';
function read(){try{return JSON.parse(localStorage.getItem(key)||'{}')||{}}catch(e){return{}}}
function write(values){try{localStorage.setItem(key,JSON.stringify(values));return true}catch(e){return false}}
function id(url){try{return new URL(url,location.href).pathname.split('/').pop()}catch(e){return''}}
function render(){const values=read();document.querySelectorAll('[data-recipe-rating-id]').forEach(widget=>{
 const current=Number(values[widget.dataset.recipeRatingId]||0);
 widget.querySelectorAll('[data-star]').forEach(button=>{const n=Number(button.dataset.star);button.classList.toggle('chosen',n<=current);button.setAttribute('aria-pressed',String(n===current));});
 const status=widget.querySelector('.personal-rating-status');
 if(status)status.textContent=current?'Your rating: '+current+' of 5 stars':'Select a star to rate this recipe';
});
}
function initPage(){
 const page=document.querySelector('.recipe-page.recipe-detail');if(!page)return;
 const slug=id(location.href);const toolbar=page.querySelector('.recipe-print-toolbar');const image=page.querySelector('.recipe-image-large');
 if(!slug||!image||document.querySelector('[data-recipe-rating-id]'))return;
 const panel=document.createElement('section');panel.className='personal-recipe-rating';panel.dataset.recipeRatingId=slug;
 panel.setAttribute('aria-label','Rate this recipe');
 const heading=document.createElement('div');heading.className='personal-rating-heading';heading.textContent='RATE THIS RECIPE';
 const buttons=document.createElement('div');buttons.className='personal-rating-buttons';buttons.setAttribute('role','group');buttons.setAttribute('aria-label','Rating from one to five stars');
 for(let n=1;n<=5;n++){const b=document.createElement('button');b.type='button';b.dataset.star=String(n);b.textContent='★';b.title=n+' '+(n===1?'star':'stars');b.setAttribute('aria-label',n+' out of 5 stars');b.addEventListener('click',()=>{const v=read();v[slug]=n;if(write(v))render();else{const status=panel.querySelector('.personal-rating-status');if(status)status.textContent='Could not save this rating in your browser.'}});buttons.appendChild(b)}
 const line=document.createElement('p');line.className='personal-rating-status';line.setAttribute('role','status');panel.append(heading,buttons,line);
 if(toolbar)toolbar.insertAdjacentElement('afterend',panel);else image.insertAdjacentElement('afterend',panel);
}
function init(){initPage();document.querySelectorAll('#recipeGrid .personal-card-rating').forEach(node=>node.remove());render()}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
window.addEventListener('storage',render);
})();