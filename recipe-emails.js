/* Optional member recipe emails — controlled by the account backend. */
(function(){
'use strict';
const TYPES=['Appetizers & Starters','Entrees & Mains','Soups, Stews & Broths','Salads & Sides','Breakfast & Baked Breads','Sauces, Gravies & Seasonings','Desserts (Baked & Confections)','Desserts (Chilled & Creamy)','Beverages','Preserved Foods & Accompaniments'];
const section=document.getElementById('recipeEmails');if(!section)return;
const frequency=section.querySelector('[name="frequency"]'),amount=section.querySelector('[name="amount"]'),categories=section.querySelector('#emailRecipeTypes'),status=section.querySelector('#emailPreferenceStatus');
TYPES.forEach(type=>{const label=document.createElement('label');label.className='email-type';const box=document.createElement('input');box.type='checkbox';box.value=type;label.append(box,document.createTextNode(' '+type));categories.appendChild(label)});
function updateAccess(){
const logged=!!window.KitchenTableAccount?.user;
section.querySelectorAll('input,select,button').forEach(el=>el.disabled=!logged);
status.textContent=logged?'Select your preferences. Email delivery starts only after you opt in.':'Sign in to configure email delivery. Browsing and saving favorites locally do not require an account.';
if(logged)load();
}
async function load(){
try{const x=await window.KitchenTableAccount.request('email-get');const p=x.subscription||{};frequency.value=p.frequency||'weekly';amount.value=String(p.count||3);categories.querySelectorAll('input').forEach(c=>c.checked=(p.categories||[]).includes(c.value));section.querySelector('[name="emailOptIn"]').checked=p.enabled===true;status.textContent=p.enabled?'Your subscription is active.':'Email delivery is off until you opt in.'}catch(e){status.textContent='Could not load email preferences: '+e.message}
}
section.querySelector('#emailPrefsSave').addEventListener('click',async()=>{
const consent=section.querySelector('[name="emailOptIn"]').checked;
const selected=[...categories.querySelectorAll('input:checked')].map(i=>i.value);
if(consent&&!selected.length){status.textContent='Select at least one recipe category.';return}
const payload=JSON.stringify({enabled:consent,frequency:frequency.value,count:Number(amount.value),categories:selected});
status.textContent='Saving preferences…';
try{await window.KitchenTableAccount.request('email-save',payload);status.textContent=consent?'Preferences saved. Recipe emails will begin after the email service is activated.':'Email subscription disabled.'}catch(e){status.textContent='Could not save preferences: '+e.message}
});
section.querySelector('#unsubscribeAll')?.addEventListener('click',async()=>{
  if(!window.KitchenTableAccount?.user){status.textContent='Sign in to change account subscriptions.';return}
  status.textContent='Turning off all messages…';
  const payload=JSON.stringify({enabled:false,frequency:frequency.value,count:Number(amount.value),categories:[]});
  try{
    await window.KitchenTableAccount.request('email-save',payload);
    section.querySelector('[name="emailOptIn"]').checked=false;
    status.textContent='Unsubscribed from recipe emails. No push notifications are currently sent by this website.';
  }catch(e){status.textContent='Unsubscribe could not be confirmed: '+e.message}
});
document.addEventListener('kitchen-table-account-change',updateAccess);updateAccess();
})();