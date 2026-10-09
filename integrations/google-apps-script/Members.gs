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
  if(!['list','add','remove'].includes(action))throw Error('Invalid action');
  const recipe=String(x.recipe||'');
  if(action!=='list'&&!ALLOWED.includes(recipe))throw Error('Unpublished recipe');
  const lock=LockService.getScriptLock();lock.waitLock(15000);
  let favorites=[];
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
  }finally{lock.releaseLock()}
  return html({ok:true,requestId,user:{name:user.name,email:user.email},favorites:[...new Set(favorites)]});
 }catch(err){return html({ok:false,requestId,error:String(err.message||'Request failed')})}
}
function doGet(){return ContentService.createTextOutput('Member service is running. Authenticated POST required.')}
