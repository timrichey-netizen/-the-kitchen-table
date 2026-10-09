(function(){
  'use strict';
  var config=window.KITCHEN_TABLE_ADS;
  if(!config || config.enabled!==true || config.consentReady!==true)return;
  if(!/^ca-pub-\d{16}$/.test(config.publisherId))return;
  var slots=document.querySelectorAll('[data-ad-placement]');
  var valid=[];
  slots.forEach(function(host){
    var type=host.dataset.adPlacement;
    var slot=config.slots && config.slots[type];
    if(!/^\d+$/.test(String(slot||'')))return;
    var label=document.createElement('div');label.className='ad-label';label.textContent='Advertisement';
    var ins=document.createElement('ins');ins.className='adsbygoogle';ins.style.display='block';
    ins.dataset.adClient=config.publisherId;ins.dataset.adSlot=slot;
    ins.dataset.adFormat='auto';ins.dataset.fullWidthResponsive='true';
    host.replaceChildren(label,ins);host.hidden=false;valid.push(ins);
  });
  if(!valid.length)return;
  var script=document.createElement('script');script.async=true;
  script.src='https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client='+encodeURIComponent(config.publisherId);
  script.crossOrigin='anonymous';
  script.onload=function(){valid.forEach(function(){try{(window.adsbygoogle=window.adsbygoogle||[]).push({})}catch(e){console.warn('Ad placement failed',e)}})};
  document.head.appendChild(script);
})();
