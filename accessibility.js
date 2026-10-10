/* Progressive accessibility improvements; all content stays public. */
(function(){
'use strict';
function init(){
 var nav=document.querySelector('.site-header .nav');
 var toggle=document.querySelector('.site-header .menu-toggle');
 var main=document.querySelector('main');
 if(main){
  if(!main.id)main.id='main-content';
  if(!document.querySelector('.skip-link')){
   var skip=document.createElement('a');skip.className='skip-link';skip.href='#'+main.id;skip.textContent='Skip to main content';
   document.body.insertBefore(skip,document.body.firstChild);
  }
  main.setAttribute('tabindex','-1');
 }
 if(nav&&toggle){
  if(!nav.id)nav.id='site-primary-nav';
  toggle.setAttribute('aria-controls',nav.id);
  toggle.setAttribute('aria-label','Open navigation menu');
  function close(){
   nav.classList.remove('open');toggle.setAttribute('aria-expanded','false');
   toggle.setAttribute('aria-label','Open navigation menu');
  }
  function update(){toggle.setAttribute('aria-label',nav.classList.contains('open')?'Close navigation menu':'Open navigation menu')}
  toggle.addEventListener('click',update);
  nav.addEventListener('click',function(e){if(e.target.closest('a[href]')){close()}});
  window.addEventListener('hashchange',close);
  document.addEventListener('pointerdown',function(e){if(nav.classList.contains('open')&&!nav.contains(e.target)&&!toggle.contains(e.target))close()});
  document.addEventListener('keydown',function(e){if(e.key==='Escape'&&nav.classList.contains('open')){close();toggle.focus()}});
  window.addEventListener('resize',function(){if(window.innerWidth>1050)close()});
  update();
 }
 document.querySelectorAll('img:not([alt])').forEach(function(img){img.alt=''});
 document.querySelectorAll('input[type="search"]').forEach(function(input){
  if(!input.getAttribute('aria-label')&&!input.labels?.length)input.setAttribute('aria-label','Search recipes');
 });
 document.querySelectorAll('[data-ad-placement]').forEach(function(el){if(el.hidden)el.setAttribute('aria-hidden','true')});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();

/* Load Our Table destination photography only on the homepage. */
(function(){if(!document.querySelector('.opening-hero'))return;var script=document.createElement('script');script.src='our-table-rotation.js';script.defer=true;document.head.appendChild(script);})();

/* Keep recipe ingredients exclusively in the left panel.
   Imported preparation text sometimes repeats the title, yield and full
   ingredient block before its actual cooking directions. */
(function(){
 'use strict';
 function cleanRecipePreparation(){
  var panels=document.querySelectorAll('.recipe-cols > .recipe-panel');
  if(panels.length<2)return;
  var right=panels[1], heading=right.querySelector('h2');
  if(!heading || !/^preparation$/i.test(heading.textContent.trim()))return;
  var sectionHeadings=Array.from(right.querySelectorAll('h3'));
  var ingredientHeading=Array.from(right.querySelectorAll('.recipe-line,h3')).find(function(el){
   return /^ingredients\s*:?$/i.test(el.textContent.trim());
  });
  var stepsHeading=sectionHeadings.find(function(el){
   return /^preparation\s*:?$/i.test(el.textContent.trim()) &&
          (!ingredientHeading || Boolean(ingredientHeading.compareDocumentPosition(el)&Node.DOCUMENT_POSITION_FOLLOWING));
  });
  // Only remove the imported preamble when both boundaries are present.
  // Never discard instruction text if a genuine preparation boundary is missing.
  if(!ingredientHeading || !stepsHeading)return;
  var node=heading.nextSibling;
  while(node && node!==stepsHeading){
   var next=node.nextSibling;node.remove();node=next;
  }
  stepsHeading.remove(); // The panel already has the Preparation title.
  var first=heading.nextElementSibling;
  if(first && first.classList.contains('recipe-gap'))first.remove();
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',cleanRecipePreparation);
 else cleanRecipePreparation();
})();
