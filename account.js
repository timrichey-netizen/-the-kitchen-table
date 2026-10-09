(function(){
'use strict';
const cfg=window.KITCHEN_TABLE_ACCOUNT_CONFIG||{};
const enabled=cfg.enabled===true&&/^https:\/\/script\.google\.com\/macros\/s\/[^/]+\/exec$/.test(cfg.appsScriptUrl||'')&&/\.apps\.googleusercontent\.com$/.test(cfg.googleClientId||'');
let credential='',user=null,favorites=null;
const pending=new Map();
const api={ready:enabled,get user(){return user},get favorites(){return favorites?favorites.slice():null},request};
window.KitchenTableAccount=api;
function status(message){const el=document.getElementById('accountStatus');if(el)el.textContent=message}
function notify(){document.querySelectorAll('[data-account-link]').forEach(a=>a.textContent=user?'My Account':'Sign In');const guest=document.getElementById('accountGuest'),member=document.getElementById('accountMember');if(guest)guest.hidden=!!user;if(member)member.hidden=!user;const email=document.getElementById('accountEmail');if(email)email.textContent=user?.email||'';document.dispatchEvent(new CustomEvent('kitchen-table-account-change',{detail:{signedIn:!!user}}))}
function request(action,recipe){
 if(!enabled||!credential)return Promise.reject(new Error('Sign in with Google first'));
 if(!['list','add','remove'].includes(action))return Promise.reject(new Error('Invalid action'));
 const id='kt'+Date.now()+Math.random().toString(36).slice(2);
 return new Promise((resolve,reject)=>{
  const iframe=document.createElement('iframe');iframe.hidden=true;iframe.name=id;iframe.title='Private account synchronization';document.body.appendChild(iframe);
  const form=document.createElement('form');form.hidden=true;form.method='POST';form.action=cfg.appsScriptUrl;form.target=id;
  const fields={requestId:id,action,recipe:recipe||'',idToken:credential};
  Object.entries(fields).forEach(([name,value])=>{const input=document.createElement('input');input.type='hidden';input.name=name;input.value=value;form.appendChild(input)});
  document.body.appendChild(form);
  const timeout=setTimeout(()=>finish(new Error('Sync timed out')),20000);
  function finish(err,result){clearTimeout(timeout);pending.delete(id);form.remove();iframe.remove();if(err)reject(err);else resolve(result)}
  pending.set(id,finish);
  form.submit();
 });
}
window.addEventListener('message',function(event){
 // Apps Script HTML service uses Google-hosted iframe origins.
 if(!/^https:\/\/(?:script\.googleusercontent\.com|script\.google\.com|[a-z0-9-]+\.googleusercontent\.com)$/.test(event.origin))return;
 const data=event.data;
 if(!data||typeof data!=='object'||typeof data.requestId!=='string')return;
 const complete=pending.get(data.requestId);if(!complete)return;
 if(data.ok!==true){complete(new Error(data.error||'Account service error'));return}
 if(!Array.isArray(data.favorites)||data.favorites.some(x=>typeof x!=='string')){complete(new Error('Invalid favorites response'));return}
 favorites=data.favorites;
 complete(null,data);
 document.dispatchEvent(new CustomEvent('kitchen-table-account-change',{detail:{signedIn:!!user}}));
});
async function signIn(response){
 credential=response?.credential||'';
 if(!credential)return;
 try{
   const result=await request('list');
   user=result.user;favorites=result.favorites;
   status('Signed in. Your favorites are synchronized with your account.');
   notify();
 }catch(err){credential='';user=null;favorites=null;status('Sign-in could not be completed: '+err.message);notify()}
}
function initGoogle(){
 if(!window.google?.accounts?.id)return;
 google.accounts.id.initialize({client_id:cfg.googleClientId,callback:signIn,auto_select:false});
 const target=document.getElementById('accountGoogleButton');if(target)google.accounts.id.renderButton(target,{theme:'outline',size:'large',text:'continue_with'});
}
function init(){
 notify();
 if(!enabled){status('Member sign-in is not activated yet. All recipes and local favorites remain available without an account.');return}
 status('Continue with Google to register or sign in and sync favorites.');
 if(window.google?.accounts?.id)initGoogle();
 else{const script=document.createElement('script');script.src='https://accounts.google.com/gsi/client';script.async=true;script.onload=initGoogle;script.onerror=()=>status('Google sign-in is temporarily unavailable');document.head.appendChild(script)}
 const signOut=document.getElementById('accountSignOut');
 signOut?.addEventListener('click',()=>{credential='';user=null;favorites=null;window.google?.accounts?.id?.disableAutoSelect();status('Signed out. Local recipe access remains unrestricted.');notify()});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
