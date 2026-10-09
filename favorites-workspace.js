(function(){
'use strict';
const FAV='kitchen-table-favorites-v1',COL='kt-favorite-collections-v1',MENUS='kt-saved-menus-v1',MEAL='kitchenTableMyMeal',FINAL='kitchenTableFinalizedMeal';
const valid=['neapolitan-lasagna.html','vincisgrassi.html','pasta-alla-norma.html','pasta-with-bottarga.html'];
const defaults=['Weeknight Dinners','Holiday Meals','Italian Favorites','Recipes to Try'];
function read(key,fallback){try{const v=JSON.parse(localStorage.getItem(key)||'null');return v??fallback}catch(e){return fallback}}
function write(key,value){localStorage.setItem(key,JSON.stringify(value))}
function favorites(){return read(FAV,[]).filter(id=>valid.includes(id))}
function library(){return [...document.querySelectorAll('#recipeGrid .recipe-card')].map(card=>({id:card.querySelector('h3 a[href]')?.getAttribute('href')?.split('?')[0],name:card.querySelector('h3')?.textContent.trim()||'',card})).filter(x=>valid.includes(x.id))}
function collections(){const v=read(COL,{});const o=v&&typeof v==='object'&&!Array.isArray(v)?v:{};defaults.forEach(n=>{if(!Array.isArray(o[n]))o[n]=[]});return o}
function h(tag,text,attrs){const el=document.createElement(tag);if(text!=null)el.textContent=text;Object.entries(attrs||{}).forEach(([k,v])=>el.setAttribute(k,v));return el}
function button(label,fn){const b=h('button',label,{type:'button',class:'favorite-workspace-button'});b.addEventListener('click',fn);return b}
function status(message){const el=document.getElementById('favoriteWorkspaceStatus');if(el)el.textContent=message}
async function shareText(title,text,url){if(navigator.share){try{await navigator.share({title,text,url});return}catch(e){if(e.name==='AbortError')return}}try{await navigator.clipboard.writeText(text+'\n'+(url||''));status('Copied to clipboard')}catch(e){window.prompt('Copy to share',text+'\n'+(url||''))}}
function render(){
 const root=document.getElementById('favoriteWorkspace');if(!root)return;
 const saved=favorites(),items=library().filter(r=>saved.includes(r.id)),groups=collections();
 root.replaceChildren();
 root.appendChild(h('h2','My Favorites Collections'));
 root.appendChild(h('p','Organize favorites, prepare a shopping list, and save menus — no account required.'));
 const creator=h('div',null,{class:'favorite-workspace-controls'});
 const name=h('input',null,{type:'text',placeholder:'New collection name',maxlength:'60','aria-label':'New collection name'});
 creator.append(name,button('Create Collection',()=>{const v=name.value.trim();if(!v)return;if(groups[v]){status('That collection already exists');return}groups[v]=[];write(COL,groups);render()}));root.appendChild(creator);
 const list=h('div',null,{class:'favorite-collection-list'});
 Object.entries(groups).forEach(([name,ids])=>{
 const section=h('section',null,{class:'favorite-collection'});
 const heading=h('div',null,{class:'favorite-collection-heading'});heading.append(h('h3',name),button('Delete',()=>{if(!window.confirm('Delete collection '+name+'?'))return;delete groups[name];write(COL,groups);render()}));section.append(heading);
 const options=h('div',null,{class:'favorite-collection-options'});
 items.forEach(({id,name:recipeName})=>{const label=h('label');const check=h('input',null,{type:'checkbox'});check.checked=ids.includes(id);check.addEventListener('change',()=>{groups[name]=check.checked?[...new Set([...ids,id])]:ids.filter(x=>x!==id);write(COL,groups);render()});label.append(check,h('span',recipeName));options.append(label)});
 section.append(options);if(!items.length)section.append(h('p','Save recipes with the heart icon to add them to collections'));
 list.append(section);
 });root.append(list);
 const shopper=h('section',null,{class:'favorite-shopping'});shopper.append(h('h2','Shopping List'),h('p','Select favorite recipes and change servings to prepare a combined list'));
 const selection=h('div',null,{class:'favorite-shopping-options'});
 items.forEach(({id,name})=>{const line=h('label');const check=h('input',null,{type:'checkbox',value:id,class:'favorite-shopping-select'});check.checked=true;const num=h('input',null,{type:'number',min:'1',max:'100',value:'4',class:'favorite-serving-count','aria-label':'Desired servings for '+name});line.append(check,h('span',name+' — servings'),num);selection.append(line)});shopper.append(selection);
 const listOutput=h('div',null,{id:'favoriteShoppingOutput',class:'favorite-shopping-output'});
 const shopActions=h('div',null,{class:'favorite-workspace-controls'});
 shopActions.append(button('Create Shopping List',()=>buildShopping(selection,listOutput)),button('Print List',()=>printShopping(listOutput)),button('Share List',()=>shareText('Shopping List',listOutput.innerText,location.href)));
 shopper.append(shopActions,listOutput);root.append(shopper);
 const mealSection=h('section',null,{class:'favorite-menus'});mealSection.append(h('h2','Save and Share Menus'),h('p','Select favorites to build a menu, then open it in My Meal or share a link'));
 const menuOptions=h('div',null,{class:'favorite-menu-options'});
 items.forEach(({id,name})=>{const label=h('label');const check=h('input',null,{type:'checkbox',class:'favorite-menu-select',value:id});label.append(check,h('span',name));menuOptions.append(label)});mealSection.append(menuOptions);
 const menuName=h('input',null,{type:'text',placeholder:'Menu name',maxlength:'80','aria-label':'Menu name'});const controls=h('div',null,{class:'favorite-workspace-controls'});
 controls.append(menuName,button('Save Menu',()=>{const ids=[...menuOptions.querySelectorAll('input:checked')].map(c=>c.value);const title=menuName.value.trim();if(!title||!ids.length){status('Enter a menu name and select recipes');return}const all=read(MENUS,[]);all.push({id:Date.now().toString(36),name:title,recipes:ids,created:new Date().toISOString()});write(MENUS,all);render();status('Menu saved locally')}));
 mealSection.append(controls);
 const menus=h('div',null,{class:'favorite-saved-menus'});
 read(MENUS,[]).forEach(m=>{const line=h('div',null,{class:'favorite-saved-menu'});line.append(h('strong',m.name+' ('+m.recipes.length+' recipes)'));
 line.append(button('Open in My Meal',()=>{const catalog=library();const arr=m.recipes.map(id=>catalog.find(x=>x.id===id)).filter(Boolean).map(x=>({title:x.name,url:x.id,image:x.card.querySelector('img')?.getAttribute('src')||'',description:x.card.querySelector('.recipe-card-description')?.textContent||''}));write(MEAL,arr);localStorage.removeItem(FINAL);location.href='my-meal.html'}));
 line.append(button('Share Menu',()=>{const url=new URL('index.html',location.href);url.searchParams.set('sharedMenu',m.recipes.join(','));shareText(m.name,m.name+'\n'+m.recipes.map(id=>new URL(id,location.href).href).join('\n'),url.href)}));
 line.append(button('Delete',()=>{write(MENUS,read(MENUS,[]).filter(x=>x.id!==m.id));render()}));menus.append(line)});mealSection.append(menus);root.append(mealSection,h('p','',{id:'favoriteWorkspaceStatus',role:'status'}));
}
function frac(s){if(!s)return 0;const p=s.split('/');return p.length===2?Number(p[0])/Number(p[1]):Number(s)}
function parsed(line){const m=line.match(/^(\d+(?:\s+\d+\/\d+|\/\d+|\.\d+)?)\s+(cups?|tbsp|tsp|lb|oz|qt|g|kg|ml|l|cloves?|eggs?)\s+(.+)$/i);if(!m)return null;const raw=m[1].split(' ');const qty=raw.reduce((a,v)=>a+frac(v),0);return {qty,unit:m[2].toLowerCase().replace(/s$/,''),name:m[3].trim()}}
async function buildShopping(selection,out){
 const entries=[...selection.querySelectorAll('label')].filter(l=>l.querySelector('input[type=checkbox]')?.checked).map(l=>({id:l.querySelector('input[type=checkbox]').value,servings:Number(l.querySelector('input[type=number]').value)||4}));
 if(!entries.length){out.textContent='Choose at least one recipe';return}
 out.textContent='Gathering ingredients…';const combined=new Map(),notes=[];
 for(const entry of entries){try{
  const response=await fetch(entry.id);if(!response.ok)throw Error('Recipe unavailable');
  const doc=new DOMParser().parseFromString(await response.text(),'text/html');
  const heading=[...doc.querySelectorAll('h2')].find(e=>e.textContent.trim()==='Ingredients');
  if(!heading)throw Error('Ingredients not found');
  const panel=heading.closest('.recipe-panel')||heading.parentElement;
  const recipeInfo=doc.querySelector('.recipe-meta-details');const original=Number((recipeInfo?.textContent||'').match(/Servings\s*(\d+)/i)?.[1]||4);
  let el=heading.nextElementSibling;while(el&&el.tagName!=='H2'){if(el.classList.contains('recipe-line')){const line=el.textContent.trim();const p=parsed(line);if(p){const key=p.unit+'|'+p.name.toLowerCase();const current=combined.get(key)||{qty:0,unit:p.unit,name:p.name};current.qty+=p.qty*(entry.servings/original);combined.set(key,current)}else if(line)notes.push(line+' — '+entry.id)}el=el.nextElementSibling}
 }catch(e){notes.push('Could not retrieve '+entry.id)}}
 out.replaceChildren(h('h3','Consolidated Shopping List'));const ul=h('ul');[...combined.values()].sort((a,b)=>a.name.localeCompare(b.name)).forEach(x=>{const rounded=Math.round(x.qty*100)/100;ul.append(h('li',rounded+' '+x.unit+(rounded!==1?'s':'')+' '+x.name))});out.append(ul);
 if(notes.length){out.append(h('h4','Review separately — complex quantities or headings'));const list=h('ul');notes.forEach(n=>list.append(h('li',n)));out.append(list)}
 out.append(h('p','Quantities are scaled from each recipe’s recorded servings. Check the full recipes before shopping; mixed measures and complex quantities require review.'));
}
function printShopping(out){if(!out.innerText.trim()){status('Create a shopping list first');return}const popup=window.open('','_blank');if(!popup){status('Allow pop-ups to print the list');return}popup.document.write('<!doctype html><title>Shopping List</title><style>body{font:16px Arial;max-width:750px;margin:30px auto}h1{font-family:Georgia}</style><h1>The Kitchen Table — Shopping List</h1>'+out.innerHTML);popup.document.close();popup.focus();popup.print()}
function setup(){const recipes=document.getElementById('recipes');if(!recipes)return;const container=document.createElement('section');container.id='favoriteWorkspace';container.className='favorite-workspace';recipes.querySelector('.container')?.append(container);const toggle=document.getElementById('favoritesOnly');function sync(){container.hidden=!(toggle?.checked);if(!container.hidden)render()}toggle?.addEventListener('change',sync);document.addEventListener('click',e=>{if(e.target.closest('[data-favorite-id],[data-favorites-nav]'))setTimeout(sync,50)});window.addEventListener('storage',sync);document.addEventListener('kitchen-table-account-change',sync);sync();
 const shared=new URLSearchParams(location.search).get('sharedMenu');if(shared){const ids=shared.split(',').filter(id=>valid.includes(id));if(ids.length){const box=h('section',null,{class:'favorite-shared-menu'});box.append(h('h2','Shared Menu'));ids.forEach(id=>{const a=h('a',id.replace('.html','').replaceAll('-',' '),{href:id});box.append(a)});const c=recipes.querySelector('.container');c?.prepend(box)}}
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',setup);else setup();
})();