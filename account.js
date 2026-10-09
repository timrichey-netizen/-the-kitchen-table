(function(){'use strict';
const cfg=window.KITCHEN_TABLE_ACCOUNT_CONFIG||{};
const ready=cfg.enabled===true && /^https:\/\/[a-z0-9-]+\.supabase\.co\/?$/.test(cfg.supabaseUrl||'') && /^sb_publishable_|^eyJ/.test(cfg.publishableKey||'');
let client=null;const listeners=new Set();let session=null;
const api={ready,get user(){return session?.user||null},onChange(fn){listeners.add(fn);return()=>listeners.delete(fn)},client(){return client}};
window.KitchenTableAccount=api;
function notify(){listeners.forEach(fn=>{try{fn(api.user)}catch(e){console.error(e)}});document.dispatchEvent(new CustomEvent('kitchen-table-account-change',{detail:{signedIn:!!api.user}}))}
function status(msg){const el=document.getElementById('accountStatus');if(el)el.textContent=msg}
function update(){const user=api.user;document.querySelectorAll('[data-account-link]').forEach(a=>{a.textContent=user?'My Account':'Sign In';});const guest=document.getElementById('accountGuest');const member=document.getElementById('accountMember');if(guest)guest.hidden=!!user;if(member)member.hidden=!user;const email=document.getElementById('accountEmail');if(email)email.textContent=user?.email||'';notify()}
async function init(){if(!ready){status('Online accounts are not active yet. Favorites remain saved in this browser.');return}try{
 const sdk=await import('https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm');
 client=sdk.createClient(cfg.supabaseUrl,cfg.publishableKey,{auth:{experimental:{passkey:true},autoRefreshToken:true,persistSession:true,detectSessionInUrl:true}});
 const result=await client.auth.getSession();if(result.error)throw result.error;session=result.data.session;
 client.auth.onAuthStateChange((_event,next)=>{session=next;update()});update();status(session?'Signed in. Your favorites can sync across devices.':'Sign in to sync your favorite recipes across devices.');
 }catch(e){status('Account service could not be initialized: '+e.message)}}
async function run(op){if(!client){status('Online accounts have not been configured yet.');return}try{status('Please wait…');await op();}catch(e){status(e?.message||'Unable to complete this action')}}
function setup(){const mail=document.getElementById('accountMagicLink');mail?.addEventListener('submit',e=>{e.preventDefault();run(async()=>{const email=mail.querySelector('input[type=email]').value.trim();const redirectTo=location.origin+location.pathname;const {error}=await client.auth.signInWithOtp({email,options:{emailRedirectTo:redirectTo,shouldCreateUser:true}});if(error)throw error;status('Check your email for a secure sign-in link.')}})});
 document.getElementById('accountPasskeySignIn')?.addEventListener('click',()=>run(async()=>{const {error}=await client.auth.signInWithPasskey();if(error)throw error;status('Signed in with your passkey.')}));
 document.getElementById('accountCreatePasskey')?.addEventListener('click',()=>run(async()=>{const {error}=await client.auth.registerPasskey();if(error)throw error;status('Passkey saved. You can use Face ID, Touch ID, or your device passcode next time.')}));
 document.getElementById('accountSignOut')?.addEventListener('click',()=>run(async()=>{const {error}=await client.auth.signOut();if(error)throw error;status('Signed out.')}));}
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',()=>{setup();init()});else{setup();init()}
})();
