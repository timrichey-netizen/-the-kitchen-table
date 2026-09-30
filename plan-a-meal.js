(function(){
var recipes=[
{title:'Mediterranean Lemon Shallot Chicken',url:'mediterranean-lemon-shallot-chicken.html',role:'main',type:'meat',cuisine:'Mediterranean',tags:['chicken','lemon']},
{title:'Sage & Mushroom Chicken Skillet',url:'sage-mushroom-chicken-skillet.html',role:'main',type:'meat',cuisine:'Italian',tags:['chicken','mushroom']},
{title:'Veal Piccata',url:'veal-piccata.html',role:'main',type:'meat',cuisine:'Italian',tags:['veal','lemon']},
{title:'Boeuf Bourguignon',url:'boeuf-bourguignon.html',role:'main',type:'meat',cuisine:'French',tags:['beef','mushroom']},
{title:'Pork Chop Milanese',url:'pork-chop-milanese.html',role:'main',type:'meat',cuisine:'Italian',tags:['pork']},
{title:'Shrimp Piccata Skewers',url:'shrimp-piccata-skewers.html',role:'main',type:'seafood',cuisine:'Italian',tags:['shrimp','lemon']},
{title:'Shrimp Saganaki',url:'shrimp-saganaki.html',role:'main',type:'seafood',cuisine:'Greek',tags:['shrimp','tomato']},
{title:'Lemon-Stuffed Grilled Branzino',url:'lemon-stuffed-grilled-branzino.html',role:'main',type:'seafood',cuisine:'Mediterranean',tags:['fish','lemon']},
{title:'Herb-Crusted Salmon',url:'herb-crusted-salmon.html',role:'main',type:'seafood',cuisine:'Mediterranean',tags:['fish']},
{title:'Shrimp & Herb Stir-Fry',url:'shrimp-herb-stir-fry.html',role:'main',type:'seafood',cuisine:'Asian-Inspired',tags:['shrimp']},
{title:'Spaghetti Carbonara',url:'spaghetti-carbonara.html',role:'main',type:'pasta',cuisine:'Italian',tags:['pasta','pork']},
{title:'Pasta Cacio e Pepe',url:'pasta-cacio-e-pepe.html',role:'main',type:'pasta',cuisine:'Italian',tags:['pasta']},
{title:'Pasta alla Norma',url:'pasta-alla-norma.html',role:'main',type:'vegetarian',cuisine:'Italian',tags:['pasta','eggplant','tomato']},
{title:'Miso Mushroom and Leek Pasta',url:'miso-mushroom-leek-pasta.html',role:'main',type:'pasta',cuisine:'Asian-Inspired',tags:['pasta','mushroom']},
{title:'Creamy Seafood Risotto',url:'creamy-seafood-risotto.html',role:'main',type:'rice',cuisine:'Italian',tags:['rice','shrimp','fish']},
{title:'Zucchini Risotto with Shrimp',url:'zucchini-risotto-shrimp.html',role:'main',type:'rice',cuisine:'Italian',tags:['rice','shrimp','zucchini']},
{title:'Zucchini “Lasagna”',url:'zucchini-lasagna.html',role:'main',type:'vegetarian',cuisine:'Italian',tags:['zucchini','tomato']},
{title:'Elegant Roasted Potato Stacks',url:'elegant-roasted-potato-stacks.html',role:'side',type:'potato',cuisine:'Any',tags:['potato']},
{title:'Roasted Zucchini with Lemon and Thyme',url:'roasted-zucchini-lemon-thyme.html',role:'side',type:'vegetable',cuisine:'Mediterranean',tags:['zucchini','lemon']},
{title:'Roasted Broccoli with Lemon & Almonds',url:'roasted-broccoli-lemon-almonds.html',role:'side',type:'vegetable',cuisine:'Mediterranean',tags:['broccoli','lemon']},
{title:'Roasted Green Beans with Parmesan',url:'roasted-green-beans-parmesan.html',role:'side',type:'vegetable',cuisine:'Italian',tags:['green beans']},
{title:'Pasta Aglio e Olio',url:'pasta-aglio-e-olio.html',role:'side',type:'pasta',cuisine:'Italian',tags:['pasta']},
{title:'Tomatillo-Avocado Salsa over Cauliflower Rice',url:'tomatillo-avocado-salsa-cauliflower-rice.html',role:'side',type:'rice',cuisine:'Latin-Inspired',tags:['rice','cauliflower','tomatillo']},
{title:'Lemon & Tomatillo Salsa Verde',url:'lemon-tomatillo-salsa-verde.html',role:'side',type:'sauce',cuisine:'Latin-Inspired',tags:['tomatillo','lemon']},
{title:'Spinach Salad with Bagna Càuda Dressing',url:'spinach-salad-bagna-cauda.html',role:'veg',type:'salad',cuisine:'Italian',tags:['spinach']},
{title:'Roasted Tomato Caprese Salad',url:'roasted-tomato-caprese-salad.html',role:'veg',type:'salad',cuisine:'Italian',tags:['tomato']},
{title:'Sautéed Spinach with Garlic',url:'sauteed-spinach-garlic.html',role:'veg',type:'green',cuisine:'Any',tags:['spinach']},
{title:'Roasted Green Beans with Parmesan',url:'roasted-green-beans-parmesan.html',role:'veg',type:'green',cuisine:'Italian',tags:['green beans']},
{title:'Roasted Broccoli with Lemon & Almonds',url:'roasted-broccoli-lemon-almonds.html',role:'veg',type:'green',cuisine:'Mediterranean',tags:['broccoli','lemon']},
{title:'Roasted Eggplant & Cherry Tomatoes',url:'roasted-eggplant-cherry-tomatoes.html',role:'veg',type:'roasted',cuisine:'Mediterranean',tags:['eggplant','tomato']},
{title:'Roasted Zucchini with Lemon and Thyme',url:'roasted-zucchini-lemon-thyme.html',role:'veg',type:'roasted',cuisine:'Mediterranean',tags:['zucchini','lemon']},
{title:'Baked Cauliflower',url:'baked-cauliflower.html',role:'veg',type:'roasted',cuisine:'Any',tags:['cauliflower']}
];
var state={ingredients:[],cuisine:'Any',mainType:'any',sideType:'any',vegType:'any'};
var steps=[].slice.call(document.querySelectorAll('.planner-step')),back=document.getElementById('plannerBack'),next=document.getElementById('plannerNext'),card=document.getElementById('plannerCard'),results=document.getElementById('plannerResults'),progress=document.getElementById('plannerProgressBar'),step=0;
document.querySelectorAll('.planner-options').forEach(function(group){var key=group.dataset.key,multi=group.classList.contains('multi');group.querySelectorAll('button').forEach(function(button){button.addEventListener('click',function(){if(multi){button.classList.toggle('selected');state[key]=[].slice.call(group.querySelectorAll('button.selected')).map(function(b){return b.dataset.value;});}else{group.querySelectorAll('button').forEach(function(b){b.classList.remove('selected');});button.classList.add('selected');state[key]=button.dataset.value;}});});});
function showStep(){steps.forEach(function(el,i){el.classList.toggle('active',i===step);});back.disabled=step===0;next.textContent=step===steps.length-1?'Build my meal':'Next';progress.style.width=((step+1)/steps.length*100)+'%';}
function score(r,role,type){var n=0;if(r.role!==role)return-999;if(type!=='any'&&r.type===type)n+=5;if(state.cuisine!=='Any'&&r.cuisine===state.cuisine)n+=4;if(r.cuisine==='Any')n+=1;state.ingredients.forEach(function(t){if(r.tags.indexOf(t)>=0)n+=3;});return n;}
function pick(role,type,excluded){excluded=excluded||[];var ranked=recipes.filter(function(r){return excluded.indexOf(r.url)<0;}).map(function(r){return{r:r,s:score(r,role,type)};}).filter(function(x){return x.s>-999;}).sort(function(a,b){return b.s-a.s||a.r.title.localeCompare(b.r.title);});return ranked.length?ranked[0].r:null;}
function buildMeal(){var main=pick('main',state.mainType),side=pick('side',state.sideType,[main&&main.url]),veg=pick('veg',state.vegType,[main&&main.url,side&&side.url]),meal=[['Main',main],['Side',side],['Vegetable / Salad',veg]];document.getElementById('plannerSummary').textContent=(state.cuisine==='Any'?'A mixed-cuisine meal':'A '+state.cuisine+'-leaning meal')+(state.ingredients.length?' built around '+state.ingredients.join(', ')+'.':'.');document.getElementById('plannedMealGrid').innerHTML=meal.map(function(item){return'<article class="planned-dish"><p class="eyebrow">'+item[0]+'</p><h3>'+item[1].title+'</h3><a class="text-link" href="'+item[1].url+'">View recipe →</a></article>';}).join('');card.hidden=true;results.hidden=false;results.scrollIntoView({behavior:'smooth',block:'start'});}
next.addEventListener('click',function(){if(step<steps.length-1){step++;showStep();}else buildMeal();});back.addEventListener('click',function(){if(step>0){step--;showStep();}});document.getElementById('plannerRestart').addEventListener('click',function(){step=0;card.hidden=false;results.hidden=true;showStep();window.scrollTo({top:0,behavior:'smooth'});});showStep();
})();