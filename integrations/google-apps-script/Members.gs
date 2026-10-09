// Bind to the private "The Kitchen Table — Member Accounts" spreadsheet.
// Set Script Property GOOGLE_CLIENT_ID to the OAuth web application client ID.
// Deploy Web App execute as owner, access Anyone. All writes require verified ID tokens.
const ALLOWED=['neapolitan-lasagna.html','vincisgrassi.html','pasta-alla-norma.html','pasta-with-bottarga.html'];
function tab(n){return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(n)}
function data(n){return tab(n).getDataRange().getValues().slice(1).filter(x=>x[0]!=='')}
function verify(token){
 const clientId=PropertiesService.getScriptProperties().getProperty('GOOGLE_CLIENT_ID');
 if(!clientId)throw Error('Authentication not configured');
 if(!token||token.length>5000)throw Error('Google sign-in required');
 const r=UrlFetchApp.fetch('https://oauth2.googleapis.com/tokeninfo?id_token='+encodeURIComponent(token),{muteHttpExceptions:true});
 if(r.getResponseCode()!==200)throw Error('Invalid sign-in token');
 const x=JSON.parse(r.getContentText());
 if(x.aud!==clientId||!['accounts.google.com','https://accounts.google.com'].includes(x.iss)||!x.sub||x.email_verified!=='true')throw Error('Identity verification failed');
 return {id:String(x.sub),email:String(x.email),name:String(x.name||'').slice(0,100)};
}
function html(obj){
 const encoded=JSON.stringify(obj).replace(/</g,'\\u003c').replace(/>/g,'\\u003e').replace(/&/g,'\\u0026');
 // Response is sent to the calling page; the caller checks requestId and iframe source.
 return HtmlService.createHtmlOutput('<!doctype html><meta charset="utf-8"><script>parent.postMessage('+encoded+', "*")</scr'+'ipt>');
}
function doPost(e){
 const x=e.parameter||{},requestId=String(x.requestId||'').slice(0,100);
 try{
  const user=verify(String(x.idToken||''));
  const action=String(x.action||'list');
  if(!['list','add','remove','email-get','email-save','newsletter-signup'].includes(action))throw Error('Invalid action');
  const recipe=String(x.recipe||'');
  if(['add','remove'].includes(action)&&!ALLOWED.includes(recipe))throw Error('Unpublished recipe');
  const lock=LockService.getScriptLock();lock.waitLock(15000);
  let favorites=[],subscription=null;
  try{
   const ms=tab('Members'),members=data('Members'),found=members.findIndex(row=>String(row[0])===user.id),now=new Date().toISOString();
   if(found<0)ms.appendRow([user.id,user.email,user.name,now,now,'active']);
   else{if(members[found][5]!=='active')throw Error('Account inactive');ms.getRange(found+2,2,1,4).setValues([[user.email,user.name,members[found][3],now]])}
   const fs=tab('Favorites'),rows=data('Favorites');
   const indexes=rows.map((r,i)=>({row:r,index:i+2})).filter(x=>String(x.row[0])===user.id);
   const existing=indexes.find(x=>String(x.row[1])===recipe);
   if(action==='add'&&!existing)fs.appendRow([user.id,recipe,now]);
   if(action==='remove'&&existing)fs.deleteRow(existing.index);
   favorites=data('Favorites').filter(r=>String(r[0])===user.id&&ALLOWED.includes(String(r[1]))).map(r=>String(r[1]));
   if(action==='newsletter-signup'){
     // Explicit affirmative opt-in only; never subscribe on ordinary registration.
     const sheet=tab('EmailSubscriptions');
     if(!sheet)throw Error('EmailSubscriptions tab not configured');
     const rows=sheet.getDataRange().getValues();
     const position=rows.findIndex((r,i)=>i>0&&String(r[0])===user.id);
     const previous=position>=0?rows[position]:null;
     // Preserve a previously configured category/frequency selection.
     const values=[user.id,user.email,'active',previous?.[3]||'weekly',previous?.[4]||3,
       previous?.[5]||'[]',previous?.[6]||'',now,previous?.[8]||''];
     if(position>=0)sheet.getRange(position+1,1,1,values.length).setValues([values]);
     else sheet.appendRow(values);
   }
   if(action==='email-get'||action==='email-save'){
     const sheet=tab('EmailSubscriptions');
     if(!sheet)throw Error('EmailSubscriptions tab not configured');
     const rows=sheet.getDataRange().getValues();
     const position=rows.findIndex((r,i)=>i>0&&String(r[0])===user.id);
     if(action==='email-save'){
       const allowedTypes=['Appetizers & Starters','Entrees & Mains','Soups, Stews & Broths','Salads & Sides','Breakfast & Baked Breads','Sauces, Gravies & Seasonings','Desserts (Baked & Confections)','Desserts (Chilled & Creamy)','Beverages','Preserved Foods & Accompaniments'];
       if(recipe.length>3000)throw Error('Preference payload too large');
       let p;try{p=JSON.parse(recipe)}catch(e){throw Error('Invalid preferences')}
       if(typeof p.enabled!=='boolean'||!['daily','weekly','biweekly','monthly'].includes(p.frequency)||![1,2,3,5,10].includes(p.count)||!Array.isArray(p.categories)||p.categories.length>10||!p.categories.every(v=>allowedTypes.includes(v)))throw Error('Invalid subscription settings');
       if(p.enabled&&!p.categories.length)throw Error('Choose at least one category');
       const previous=position>=0?rows[position]:null;
       const values=[user.id,user.email,p.enabled?'active':'paused',p.frequency,p.count,JSON.stringify([...new Set(p.categories)]),previous?.[6]||'',now,previous?.[8]||''];
       if(position>=0)sheet.getRange(position+1,1,1,values.length).setValues([values]);else sheet.appendRow(values);
     }
     const current=sheet.getDataRange().getValues().slice(1).find(r=>String(r[0])===user.id);
     subscription=current?{enabled:current[2]==='active',frequency:String(current[3]),count:Number(current[4]),categories:JSON.parse(String(current[5]||'[]'))}:{enabled:false,frequency:'weekly',count:3,categories:[]};
   }
  }finally{lock.releaseLock()}
  return html({ok:true,requestId,user:{name:user.name,email:user.email},favorites:[...new Set(favorites)],subscription});
 }catch(err){return html({ok:false,requestId,error:String(err.message||'Request failed')})}
}
function doGet(){return ContentService.createTextOutput('Member service is running. Authenticated POST required.')}
