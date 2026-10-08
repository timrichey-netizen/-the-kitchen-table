/* Keep local and English recipe names on distinct single lines and fit each to its available width. */
(function(){
  function fit(){
    document.querySelectorAll('.recipe-card-heading h3, .recipe-top .recipe-name-local, .recipe-top .recipe-name-english').forEach(function(holder){
      var targets=holder.matches('h3')?Array.from(holder.querySelectorAll('.recipe-title-original,.recipe-title-english')):[holder];
      targets.forEach(function(el){
        if(el.classList.contains('recipe-title-original')){
          el.style.display='block';
          el.style.whiteSpace='normal';
          el.style.maxWidth='100%';
          el.style.overflow='visible';
          el.style.textOverflow='clip';
          el.style.fontSize='';
          el.style.width='';
          return;
        }
        el.style.display='block';
        el.style.whiteSpace='nowrap';
        el.style.maxWidth='100%';
        el.style.overflow='hidden';
        el.style.textOverflow='clip';
        el.style.fontSize='';
        var width=holder.clientWidth;
        if(!width)return;
        var computed=getComputedStyle(el);
        var size=parseFloat(computed.fontSize)||16;
        el.style.width='max-content';
        var natural=el.getBoundingClientRect().width;
        el.style.width='';
        if(natural>width){
          el.style.fontSize=Math.max(7,size*width/natural*.97).toFixed(2)+'px';
        }
      });
    });
  }
  function start(){
    fit();
    if(document.fonts&&document.fonts.ready)document.fonts.ready.then(fit);
    window.addEventListener('resize',fit,{passive:true});
    if(window.ResizeObserver){var obs=new ResizeObserver(fit);document.querySelectorAll('.recipe-card-heading h3,.recipe-top').forEach(function(el){obs.observe(el)});}
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();