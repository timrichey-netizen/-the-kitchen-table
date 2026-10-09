/* Optional GA4 integration: public browsing never requires tracking. */
(function(){
  'use strict';
  var config=window.KITCHEN_TABLE_ANALYTICS;
  if(!config || config.enabled!==true || config.consentReady!==true)return;
  if(!/^G-[A-Z0-9]{6,20}$/i.test(config.measurementId||''))return;
  var id=config.measurementId.toUpperCase();
  window.dataLayer=window.dataLayer||[];
  window.gtag=window.gtag||function(){window.dataLayer.push(arguments)};
  window.gtag('js',new Date());
  window.gtag('config',id,{send_page_view:true});
  var script=document.createElement('script');
  script.async=true;
  script.src='https://www.googletagmanager.com/gtag/js?id='+encodeURIComponent(id);
  document.head.appendChild(script);
})();
