(function(){
'use strict';
const form=document.getElementById('curatedMenuForm');
const output=document.getElementById('curatedMenuResults');
if(!form||!output)return;
const published=[
 {name:'Lasagna Napoletana',url:'neapolitan-lasagna.html',allergens:['Milk','Eggs','Wheat'],terms:['lasagna','pasta','meat','italian','family'],difficulty:'challenging',notes:'A festive layered pasta suited to a special gathering'},
 {name:'Vincisgrassi',url:'vincisgrassi.html',allergens:['Milk','Eggs','Wheat'],terms:['lasagna','pasta','meat','italian','family'],difficulty:'challenging',notes:'A traditional layered pasta for a substantial main course'},
 {name:'Pasta alla Norma',url:'pasta-alla-norma.html',allergens:['Milk','Wheat'],terms:['pasta','eggplant','vegetarian','italian','sicilian'],difficulty:'moderate',notes:'A Sicilian pasta dish featuring eggplant'},
 {name:'Pasta con la Bottarga',url:'pasta-with-bottarga.html',allergens:['Wheat','Fish'],terms:['pasta','fish','seafood','italian','sicilian'],difficulty:'easy',notes:'An Italian seafood pasta with bottarga'}
];
const allergenWords={
 Milk:/\b(milk|dairy|lactose|cheese|butter|cream)\b/i,Eggs:/\b(eggs?|egg.free)\b/i,
 Fish:/\b(fish|seafood|bottarga)\b/i,Wheat:/\b(wheat|gluten|flour|pasta)\b/i
};
const escape=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const tidy=s=>String(s||'').toLowerCase().trim();
function generate(e){
 e.preventDefault();
 const d=Object.fromEntries(new FormData(form).entries());
 const text=tidy([d.diet,d.theme,d.notes].join(' '));
 const exclusions=Object.entries(allergenWords).filter(([_,rx])=>rx.test(tidy(d.diet))).map(([name])=>name);
 const strictFlags=/\b(vegan|vegetarian|peanut|tree nut|shellfish|soy|sesame|allerg|celiac|coeliac|halal|kosher)\b/i.test(d.diet);
 const vegetarian=/\b(vegan|vegetarian)\b/i.test(d.diet);
 const vegan=/\bvegan\b/i.test(d.diet);
 const canOffer=r=>{
   if(exclusions.some(a=>r.allergens.includes(a)))return false;
   if(vegan)return false; // none of the four published recipes is vegan as written
   if(vegetarian && r.url!=='pasta-alla-norma.html')return false;
   if(d.effort==='easy'&&r.difficulty!=='easy')return false;
   if(d.effort==='moderate'&&r.difficulty==='challenging')return false;
   return true;
 };
 const choices=published.filter(canOffer).map(r=>({r,score:r.terms.reduce((n,t)=>n+(text.includes(t)?2:0),0)+(d.occasion==='family gathering'&&r.terms.includes('family')?1:0)+(d.occasion==='date night'&&r.difficulty==='easy'?1:0)})).sort((a,b)=>b.score-a.score||a.r.name.localeCompare(b.r.name));
 const courseCount=Number(d.courses)||4;
 const style=d.style||'seated';
 const plan= style==='cocktail'?['Welcome drinks','Small plates','Main offering','Dessert','After-dinner drinks','Additional bites']:
 style==='brunch'?['Welcome drinks','Breakfast course','Savory main','Fruit or lighter side','Sweet course','Coffee or tea']:
 ['Welcome drinks','Appetizer','Main course','Side or salad','Dessert','Coffee or tea'];
 const titles=plan.slice(0,courseCount);
 // Ensure a main is represented even in a 3-course plan.
 if(!titles.includes('Main course')&&!titles.includes('Savory main')&&!titles.includes('Main offering'))titles[Math.min(2,titles.length-1)]='Main course';
 let mainPlaced=false,listing='';
 titles.forEach((course,i)=>{
   const main=/main|savory main|offering/i.test(course);
   let description='Course not yet available in the published recipe collection';
   if(main&&choices.length){const match=choices[0].r;description='<a href="'+escape(match.url)+'">'+escape(match.name)+'</a> — '+escape(match.notes);mainPlaced=true}
   listing+='<div class="curated-course"><strong>'+escape(String(i+1)+'. '+course)+'</strong><div>'+description+'</div></div>';
 });
 const people=Math.max(1,Math.min(500,Number(d.guests)||1));
 const notes=[];
 if(d.budget)notes.push('Target budget: $'+escape(d.budget)+' per guest (not cost-verified)');
 if(d.theme)notes.push('Theme / cuisine: '+escape(d.theme));
 if(d.diet)notes.push('Dietary requirements: '+escape(d.diet));
 if(d.notes)notes.push('Additional details: '+escape(d.notes));
 let caution='Only four recipes are currently published, all Italian pasta main dishes. Unavailable courses are identified rather than filled with invented recipes.';
 if(strictFlags)caution+=' Special diets, allergies and cross-contact cannot be verified automatically. Check each recipe and ingredient label before serving.';
 if(!choices.length)caution+=' No currently published main matches the selected constraints.';
 let heading='Curated menu: '+escape(d.occasion);
 let html='<p class="eyebrow">YOUR OCCASION MENU</p><h2>'+heading+'</h2><p>'+people+' guest'+(people===1?'':'s')+' · '+escape(style.replace(/-/g,' '))+' service · '+courseCount+' courses</p>'+listing+
 '<p class="curated-alert">'+escape(caution)+'</p>';
 if(notes.length)html+='<h3>Event requirements</h3><p class="curated-note">'+notes.join('<br>')+'</p>';
 html+='<h3>Hosting checklist</h3><p class="curated-note">Confirm guests and dietary restrictions · Select recipes for missing courses · Check recipe yields and adjust quantities for '+people+' guest'+(people===1?'':'s')+' · Prepare a shopping list · Plan make-ahead work · Confirm equipment and serving times</p>';
 if(mainPlaced)html+='<p class="curated-note">Published main-course recipes are linked above. Open each recipe for ingredients, preparation and printing.</p>';
 html+='<div class="curated-buttons"><button type="button" id="curatedPrint" class="button primary">Print menu</button><button type="button" id="curatedCopy" class="button secondary">Copy menu</button></div>';
 output.innerHTML=html;output.hidden=false;
 document.getElementById('curatedPrint').onclick=()=>window.print();
 document.getElementById('curatedCopy').onclick=()=>{
   const textCopy=output.innerText.replace(/Print menu\s*Copy menu/g,'').trim();
   if(navigator.clipboard?.writeText)navigator.clipboard.writeText(textCopy).then(()=>{document.getElementById('curatedCopy').textContent='Copied'}).catch(()=>window.prompt('Copy your menu:',textCopy));
   else window.prompt('Copy your menu:',textCopy);
 };
 output.scrollIntoView({behavior:'smooth',block:'start'});
}
form.addEventListener('submit',generate);
form.addEventListener('reset',()=>{output.hidden=true;output.replaceChildren()});
})();