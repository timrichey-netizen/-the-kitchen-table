// Install in the same bound Google Apps Script project as Members.gs.
// Run installRecipeEmailTrigger() once from an authorized editor account.
// Script property RECIPE_EMAILS_ENABLED must equal "true" before any email is sent.
// Uses MailApp under the script owner's authorized account.
const EMAIL_CATALOG=[
 {id:'neapolitan-lasagna.html',title:'Lasagna Napoletana',type:'Entrees & Mains'},
 {id:'vincisgrassi.html',title:'Vincisgrassi',type:'Entrees & Mains'},
 {id:'pasta-alla-norma.html',title:'Pasta alla Norma',type:'Entrees & Mains'},
 {id:'pasta-with-bottarga.html',title:'Pasta con la Bottarga',type:'Entrees & Mains'}
];
const EMAIL_SITE='https://timrichey-netizen.github.io/-the-kitchen-table/';
function installRecipeEmailTrigger(){
 ScriptApp.getProjectTriggers().filter(t=>t.getHandlerFunction()==='sendScheduledRecipeEmails').forEach(t=>ScriptApp.deleteTrigger(t));
 ScriptApp.newTrigger('sendScheduledRecipeEmails').timeBased().everyDays(1).atHour(9).create();
}
function sendScheduledRecipeEmails(){
 if(PropertiesService.getScriptProperties().getProperty('RECIPE_EMAILS_ENABLED')!=='true')return;
 const sheet=SpreadsheetApp.getActiveSpreadsheet().getSheetByName('EmailSubscriptions');
 if(!sheet)throw Error('EmailSubscriptions sheet missing');
 const lock=LockService.getScriptLock();
 if(!lock.tryLock(1000))return;
 try{
  const rows=sheet.getDataRange().getValues();
  let remaining=MailApp.getRemainingDailyQuota();
  const now=new Date(),days={daily:1,weekly:7,biweekly:14,monthly:30};
  for(let i=1;i<rows.length;i++){
   if(remaining<=0)break;
   const row=rows[i],email=String(row[1]||''),status=String(row[2]||''),frequency=String(row[3]||'');
   if(status!=='active'||!days[frequency]||!email||!/^\S+@\S+\.\S+$/.test(email))continue;
   const prior=row[6]?new Date(row[6]):null;
   if(prior&&!isNaN(prior.getTime())&&now.getTime()-prior.getTime()<days[frequency]*86400000)continue;
   let categories;try{categories=JSON.parse(String(row[5]||'[]'))}catch(e){continue}
   if(!Array.isArray(categories))continue;
   const available=EMAIL_CATALOG.filter(r=>categories.includes(r.type));
   if(!available.length)continue; // No recipes yet in chosen categories; never invent dishes.
   const count=Math.max(1,Math.min(10,Number(row[4])||1));
   const cursor=Math.max(0,Number(row[8])||0);
   const chosen=Array.from({length:Math.min(count,available.length)},(_,j)=>available[(cursor+j)%available.length]);
   const list=chosen.map(r=>r.title+' — '+EMAIL_SITE+r.id).join('\n\n');
   const body='Here are your selected Kitchen Table recipes:\n\n'+list+'\n\nManage or stop emails by signing into '+EMAIL_SITE+'account.html';
   try{
    MailApp.sendEmail({to:email,subject:'Your Kitchen Table recipes',body,name:'The Kitchen Table'});
    sheet.getRange(i+1,7).setValue(now.toISOString()); // last sent, only after successful delivery
    sheet.getRange(i+1,9).setValue((cursor+chosen.length)%available.length);
    remaining--;
   }catch(err){console.error('Recipe email delivery failed on row '+(i+1)+': '+err)}
  }
 }finally{lock.releaseLock()}
}
