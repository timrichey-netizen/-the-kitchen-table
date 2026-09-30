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
var pairingDishes=[
{title:'Elegant Roasted Potato Stacks',url:'elegant-roasted-potato-stacks.html',kind:'side',cuisines:['French','Italian','Mediterranean'],tags:['beef','chicken','pork','veal','fish']},
{title:'Pasta Aglio e Olio',url:'pasta-aglio-e-olio.html',kind:'side',cuisines:['Italian','Mediterranean'],tags:['chicken','veal','fish','shrimp']},
{title:'Tomatillo-Avocado Salsa over Cauliflower Rice',url:'tomatillo-avocado-salsa-cauliflower-rice.html',kind:'side',cuisines:['Latin-Inspired'],tags:['shrimp','fish','chicken']},
{title:'Roasted Hasselback Vegetable Bake',url:'roasted-hasselback-vegetable-bake.html',kind:'side',cuisines:['French','Mediterranean','Italian'],tags:['beef','chicken','pork','veal']},
{title:'Roasted Zucchini with Lemon and Thyme',url:'roasted-zucchini-lemon-thyme.html',kind:'vegetable',cuisines:['Mediterranean','Italian','Greek'],tags:['chicken','fish','shrimp','veal']},
{title:'Roasted Broccoli with Lemon & Almonds',url:'roasted-broccoli-lemon-almonds.html',kind:'vegetable',cuisines:['Mediterranean','Italian'],tags:['chicken','fish','shrimp','pork']},
{title:'Roasted Green Beans with Parmesan',url:'roasted-green-beans-parmesan.html',kind:'vegetable',cuisines:['Italian','French'],tags:['beef','chicken','pork','veal']},
{title:'Sautéed Spinach with Garlic',url:'sauteed-spinach-garlic.html',kind:'vegetable',cuisines:['Italian','Mediterranean','Greek'],tags:['beef','chicken','veal','fish','shrimp']},
{title:'Roasted Eggplant & Cherry Tomatoes',url:'roasted-eggplant-cherry-tomatoes.html',kind:'vegetable',cuisines:['Italian','Mediterranean','Greek'],tags:['chicken','fish','shrimp','pasta']},
{title:'Baked Cauliflower',url:'baked-cauliflower.html',kind:'vegetable',cuisines:['French','Italian'],tags:['beef','chicken','pork']},
{title:'Spinach Salad with Bagna Càuda Dressing',url:'spinach-salad-bagna-cauda.html',kind:'salad',cuisines:['Italian'],tags:['beef','chicken','pork','veal','pasta']},
{title:'Roasted Tomato Caprese Salad',url:'roasted-tomato-caprese-salad.html',kind:'salad',cuisines:['Italian','Mediterranean'],tags:['chicken','fish','shrimp','pasta']},
{title:'Salsa Criolla',url:'salsa-criolla.html',kind:'salad',cuisines:['Latin-Inspired'],tags:['beef','chicken','fish','shrimp']}
];

var dessertRecipes={
'Italian':[{title:'Tiramisu',url:'tiramisu.html'}],
'French':[{title:'Crème Brûlée',url:'creme-brulee.html'},{title:'Chocolate Lava Cake',url:'chocolate-lava-cake.html'}],
'Mediterranean':[{title:'Lemon Squares',url:'lemon-squares.html'},{title:'Key Lime Pie',url:'key-lime-pie.html'}],
'Greek':[{title:'Lemon Squares',url:'lemon-squares.html'}],
'Cajun / Creole':[{title:'Classic American Apple Pie',url:'classic-american-apple-pie.html'},{title:'Brownies',url:'brownies.html'}],
'Asian-Inspired':[{title:'Key Lime Pie',url:'key-lime-pie.html'},{title:'Lemon Squares',url:'lemon-squares.html'}],
'Latin-Inspired':[{title:'Key Lime Pie',url:'key-lime-pie.html'},{title:'Peach Pie',url:'peach-pie.html'}],
'Any':[{title:'Apple Crumble',url:'apple-crumble.html'},{title:'Brownies',url:'brownies.html'},{title:'Classic American Apple Pie',url:'classic-american-apple-pie.html'}]
};

var dessertPairings={
'Italian':['Tiramisu','Panna Cotta with Berries','Lemon Sorbet'],
'French':['Tarte Tatin','Chocolate Mousse','Crème Brûlée'],
'Mediterranean':['Lemon Olive-Oil Cake','Fresh Berries with Mascarpone','Honey Yogurt with Walnuts'],
'Greek':['Baklava','Greek Yogurt with Honey and Walnuts','Orange Semolina Cake'],
'Cajun / Creole':['Bread Pudding with Bourbon Sauce','Bananas Foster','Pecan Praline Ice Cream'],
'Asian-Inspired':['Mango with Coconut Cream','Ginger Ice Cream','Sesame Shortbread'],
'Latin-Inspired':['Flan','Tres Leches Cake','Cinnamon-Chocolate Pots de Crème'],
'Any':['Seasonal Fruit Tart','Vanilla Panna Cotta','Dark Chocolate Mousse']
};

var recipeIndex={
'mediterranean-lemon-shallot-chicken.html':{proteins:['chicken'],prep:['low-carb','high-protein','mediterranean','saute','one-pan','quick']},
'sage-mushroom-chicken-skillet.html':{proteins:['chicken','mushroom'],prep:['low-carb','high-protein','saute','one-pan','quick']},
'veal-piccata.html':{proteins:['veal'],prep:['low-carb','high-protein','saute','one-pan','quick']},
'boeuf-bourguignon.html':{proteins:['beef'],prep:['high-protein','braise']},
'pork-chop-milanese.html':{proteins:['pork'],prep:['high-protein','saute','quick']},
'shrimp-piccata-skewers.html':{proteins:['shrimp','shellfish'],prep:['low-carb','high-protein','grill','mediterranean','quick']},
'shrimp-saganaki.html':{proteins:['shrimp','shellfish','cheese'],prep:['low-carb','high-protein','mediterranean','bake','one-pan','quick']},
'lemon-stuffed-grilled-branzino.html':{proteins:['fish'],prep:['low-carb','high-protein','mediterranean','grill']},
'herb-crusted-salmon.html':{proteins:['fish'],prep:['low-carb','high-protein','bake','roast','quick','mediterranean']},
'shrimp-herb-stir-fry.html':{proteins:['shrimp','shellfish'],prep:['low-carb','high-protein','stir-fry','quick','one-pan']},
'spaghetti-carbonara.html':{proteins:['eggs','pork','cheese'],prep:['high-protein','saute','quick']},
'pasta-cacio-e-pepe.html':{proteins:['cheese'],prep:['quick']},
'pasta-alla-norma.html':{proteins:['cheese'],prep:['mediterranean','saute']},
'miso-mushroom-leek-pasta.html':{proteins:['mushroom','tofu'],prep:['saute','quick']},
'creamy-seafood-risotto.html':{proteins:['shrimp','shellfish','fish','cheese'],prep:['high-protein','saute']},
'zucchini-risotto-shrimp.html':{proteins:['shrimp','shellfish','cheese'],prep:['high-protein','mediterranean','saute']},
'zucchini-lasagna.html':{proteins:['cheese','eggs'],prep:['low-carb','high-protein','bake','mediterranean']},
'elegant-roasted-potato-stacks.html':{proteins:['cheese'],prep:['bake','roast']},
'roasted-zucchini-lemon-thyme.html':{proteins:[],prep:['low-carb','mediterranean','roast','quick']},
'roasted-broccoli-lemon-almonds.html':{proteins:['nuts'],prep:['low-carb','mediterranean','roast','quick']},
'roasted-green-beans-parmesan.html':{proteins:['cheese'],prep:['low-carb','roast','quick']},
'pasta-aglio-e-olio.html':{proteins:[],prep:['saute','quick','mediterranean']},
'tomatillo-avocado-salsa-cauliflower-rice.html':{proteins:[],prep:['low-carb','quick']},
'lemon-tomatillo-salsa-verde.html':{proteins:[],prep:['low-carb','quick']},
'spinach-salad-bagna-cauda.html':{proteins:['fish','cheese'],prep:['low-carb','mediterranean','quick']},
'roasted-tomato-caprese-salad.html':{proteins:['cheese'],prep:['low-carb','mediterranean','roast','quick']},
'sauteed-spinach-garlic.html':{proteins:[],prep:['low-carb','saute','quick']},
'roasted-eggplant-cherry-tomatoes.html':{proteins:[],prep:['low-carb','mediterranean','roast']},
'baked-cauliflower.html':{proteins:['cheese'],prep:['low-carb','bake','roast']}
};

var state={proteins:[],prepStyles:[],cuisine:'Any',mainType:'any',sideType:'any',vegType:'any'};
var steps=[].slice.call(document.querySelectorAll('.planner-step')),back=document.getElementById('plannerBack'),next=document.getElementById('plannerNext'),card=document.getElementById('plannerCard'),results=document.getElementById('plannerResults'),progress=document.getElementById('plannerProgressBar'),step=0;
document.querySelectorAll('.planner-options').forEach(function(group){var key=group.dataset.key,multi=group.classList.contains('multi');group.querySelectorAll('button').forEach(function(button){button.addEventListener('click',function(){if(multi){button.classList.toggle('selected');state[key]=[].slice.call(group.querySelectorAll('button.selected')).map(function(b){return b.dataset.value;});}else{group.querySelectorAll('button').forEach(function(b){b.classList.remove('selected');});button.classList.add('selected');state[key]=button.dataset.value;}});});});
function showStep(){steps.forEach(function(el,i){el.classList.toggle('active',i===step);});back.disabled=step===0;next.textContent=step===steps.length-1?'Build my meal':'Next';progress.style.width=((step+1)/steps.length*100)+'%';}
function score(r,role,type){
  var n=0;
  if(r.role!==role)return-999;
  if(type!=='any'&&r.type===type)n+=5;
  if(state.cuisine!=='Any'&&r.cuisine===state.cuisine)n+=4;
  if(r.cuisine==='Any')n+=1;

  var idx=recipeIndex[r.url]||{proteins:[],prep:[]};
  state.proteins.forEach(function(p){if(idx.proteins.indexOf(p)>=0)n+=4;});
  state.prepStyles.forEach(function(p){if(idx.prep.indexOf(p)>=0)n+=3;});

  return n;
}
function pick(role,type,excluded){excluded=excluded||[];var ranked=recipes.filter(function(r){return excluded.indexOf(r.url)<0;}).map(function(r){return{r:r,s:score(r,role,type)};}).filter(function(x){return x.s>-999;}).sort(function(a,b){return b.s-a.s||a.r.title.localeCompare(b.r.title);});return ranked.length?ranked[0].r:null;}
function mainTags(main){
  return (main&&main.tags)||[];
}
function pairingScore(item,main){
  var n=0;
  var cuisine=main&&main.cuisine?main.cuisine:state.cuisine;
  if(item.cuisines.indexOf(cuisine)>=0)n+=5;
  if(cuisine==='Any')n+=1;
  mainTags(main).forEach(function(tag){if(item.tags.indexOf(tag)>=0)n+=3;});
  state.proteins.forEach(function(tag){if(item.tags.indexOf(tag)>=0)n+=1;});
  return n;
}
function topPairings(kind,main,count){
  return pairingDishes.filter(function(x){return x.kind===kind;})
    .map(function(x){return{x:x,s:pairingScore(x,main)};})
    .sort(function(a,b){return b.s-a.s||a.x.title.localeCompare(b.x.title);})
    .slice(0,count).map(function(x){return x.x;});
}
function renderPairings(main){
  function links(items){
    return items.map(function(x){
      return '<a class="pairing-item" href="'+x.url+'"><span>'+x.title+'</span><small>View recipe →</small></a>';
    }).join('');
  }
  document.getElementById('pairingSides').innerHTML=links(topPairings('side',main,3));
  document.getElementById('pairingVegetables').innerHTML=links(topPairings('vegetable',main,3));
  document.getElementById('pairingSalads').innerHTML=links(topPairings('salad',main,3));

  var cuisine=(main&&main.cuisine)||state.cuisine||'Any';
  var desserts=dessertRecipes[cuisine]||dessertRecipes.Any;
  document.getElementById('pairingDesserts').innerHTML=desserts.map(function(d){
    return '<a class="pairing-item" href="'+d.url+'"><span>'+d.title+'</span><small>View recipe →</small></a>';
  }).join('');
}
function buildMeal(){var main=pick('main',state.mainType),side=pick('side',state.sideType,[main&&main.url]),veg=pick('veg',state.vegType,[main&&main.url,side&&side.url]),meal=[['Main',main],['Side',side],['Vegetable / Salad',veg]];document.getElementById('plannerSummary').textContent=(state.cuisine==='Any'?'A mixed-cuisine meal':'A '+state.cuisine+'-leaning meal')+(state.proteins.length?' built around '+state.proteins.join(', ')+'.':'.')+(state.prepStyles.length?' Preferred style: '+state.prepStyles.join(', ')+'.':'');document.getElementById('plannedMealGrid').innerHTML=meal.map(function(item){return'<article class="planned-dish"><p class="eyebrow">'+item[0]+'</p><h3>'+item[1].title+'</h3><a class="text-link" href="'+item[1].url+'">View recipe →</a></article>';}).join('');renderPairings(main);card.hidden=true;results.hidden=false;results.scrollIntoView({behavior:'smooth',block:'start'});}
next.addEventListener('click',function(){if(step<steps.length-1){step++;showStep();}else buildMeal();});back.addEventListener('click',function(){if(step>0){step--;showStep();}});document.getElementById('plannerRestart').addEventListener('click',function(){step=0;card.hidden=false;results.hidden=true;showStep();window.scrollTo({top:0,behavior:'smooth'});});showStep();
})();