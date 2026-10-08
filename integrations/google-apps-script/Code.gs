/**
 * The Kitchen Table — Ratings & Reviews (Google Apps Script)
 * Bind this script to the Ratings & Reviews Google Spreadsheet.
 * Script Properties: GOOGLE_CLIENT_ID = OAuth web client ID (from Google Cloud).
 * Deploy as Web App: Execute as Me; access Anyone.
 * Public reads are JSONP; public writes require verified Google ID tokens.
 * Do NOT publish spreadsheet sharing to Anyone.
 */
const TAB={recipes:'Recipes',ratings:'Ratings',comments:'Comments'};
const HEAD={ratings:['review_id','recipe_id','reviewer_id','rating_1_to_5','created_at','updated_at','status'],comments:['comment_id','recipe_id','reviewer_id','display_name','comment_text','created_at','moderation_status','moderated_at']};
function sheet(name){return SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name)}
function rows(name){const v=sheet(name).getDataRange().getValues();return v.slice(1).filter(x=>x[0]!=='')}
function response(data,callback){const json=JSON.stringify(data);if(callback&&/^[a-zA-Z_$][\w$\.]{0,90}$/.test(callback)){return ContentService.createTextOutput(callback+'('+json+');').setMimeType(ContentService.MimeType.JAVASCRIPT)}return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON)}
function allowedRecipe(id){return rows(TAB.recipes).some(x=>String(x[0])===id&&x[5]===true)}
function ratingStats(id){const items=rows(TAB.ratings).filter(r=>String(r[1])===id&&r[6]==='approved');let histogram=[0,0,0,0,0],sum=0;items.forEach(r=>{const n=Number(r[3]);if(n>=1&&n<=5){histogram[n-1]++;sum+=n}});const count=histogram.reduce((a,b)=>a+b,0);return {count,average:count?Math.round(sum/count*10)/10:0,distribution:histogram}}
function publicComments(id){return rows(TAB.comments).filter(r=>String(r[1])===id&&r[6]==='approved').slice(-60).reverse().map(r=>({name:String(r[3]||'Visitor').slice(0,80),comment:String(r[4]).slice(0,1200),createdAt:new Date(r[5]).toISOString()}))}
function doGet(e){try{const q=e.parameter||{};let recipe=String(q.recipe||'').slice(0,100);if(!recipe||!allowedRecipe(recipe))return response({ok:false,error:'Unknown recipe'},q.callback);return response({ok:true,recipe,rating:ratingStats(recipe),comments:publicComments(recipe)},q.callback)}catch(err){return response({ok:false,error:'Could not load reviews'},e.parameter&&e.parameter.callback)}}
function authenticate(idToken){
 const clientId=PropertiesService.getScriptProperties().getProperty('GOOGLE_CLIENT_ID');
 if(!clientId)throw Error('Backend authentication is not configured');
 if(!idToken||idToken.length>4500)throw Error('Google sign-in required');
 const url='https://oauth2.googleapis.com/tokeninfo?id_token='+encodeURIComponent(idToken);
 const result=UrlFetchApp.fetch(url,{muteHttpExceptions:true});
 if(result.getResponseCode()!==200)throw Error('Invalid identity token');
 const v=JSON.parse(result.getContentText());
 if(v.aud!==clientId||!['accounts.google.com','https://accounts.google.com'].includes(v.iss)||v.email_verified!=='true'||!v.sub)throw Error('Identity token verification failed');
 return {id:String(v.sub),name:String(v.name||'Visitor').slice(0,80)};
}
function parse(e){const raw=e.postData&&e.postData.contents||'';if(raw.length>14000)throw Error('Request too large');if((e.postData.type||'').startsWith('application/json'))return JSON.parse(raw);return e.parameter||{}}
function doPost(e){try{
 const x=parse(e),recipe=String(x.recipe||'').slice(0,100);
 if(!allowedRecipe(recipe))throw Error('Unknown recipe');
 const user=authenticate(String(x.idToken||''));
 const n=Number(x.rating);if(!Number.isInteger(n)||n<1||n>5)throw Error('Rating must be from 1 to 5');
 const comment=String(x.comment||'').trim();
 if(comment.length>1200)throw Error('Comment too long');
 const action=String(x.action||'rate');if(!['rate','review'].includes(action))throw Error('Unsupported request');
 // Lock prevents concurrent inserts of duplicate reviewer/recipe rows.
 const lock=LockService.getScriptLock();lock.waitLock(15000);
 try{
   const now=new Date().toISOString(),rs=sheet(TAB.ratings),data=rows(TAB.ratings);
   const found=data.findIndex(r=>String(r[1])===recipe&&String(r[2])===user.id);
   if(found>=0){const originalRow=found+2;rs.getRange(originalRow,4).setValue(n);rs.getRange(originalRow,6).setValue(now);rs.getRange(originalRow,7).setValue('approved')}
   else rs.appendRow([Utilities.getUuid(),recipe,user.id,n,now,now,'approved']);
   if(comment){sheet(TAB.comments).appendRow([Utilities.getUuid(),recipe,user.id,user.name,comment,now,'pending',''])}
 }finally{lock.releaseLock()}
 return response({ok:true,message:comment?'Rating saved; comment awaiting moderation':'Rating saved'});
 }catch(err){return response({ok:false,error:String(err.message||'Could not save rating')})}}
/** Run manually as the owner after moderating the Comments sheet. */
function updateSummarySheet(){const ss=SpreadsheetApp.getActiveSpreadsheet(),out=ss.getSheetByName('Rating Summary');const ids=rows(TAB.recipes).map(r=>String(r[0]));const table=[['recipe_id','rating_count','average_rating','five_stars','four_stars','three_stars','two_stars','one_star']];ids.forEach(id=>{const s=ratingStats(id);table.push([id,s.count,s.average,...s.distribution.slice().reverse()])});out.clearContents();out.getRange(1,1,table.length,8).setValues(table)}
