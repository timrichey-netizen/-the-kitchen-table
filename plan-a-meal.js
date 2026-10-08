(function(){
var recipes=[
{title:'Lasagna Napoletana',url:'neapolitan-lasagna.html',role:'main',type:'pasta',cuisine:'Italian',tags:['pasta','lasagna']},
{title:'Vincisgrassi',url:'vincisgrassi.html',role:'main',type:'pasta',cuisine:'Italian',tags:['pasta','lasagna']},
{title:'Pasta alla Norma',url:'pasta-alla-norma.html',role:'main',type:'pasta',cuisine:'Italian',tags:['pasta','eggplant']},
{title:'Pasta con la Bottarga',url:'pasta-with-bottarga.html',role:'main',type:'pasta',cuisine:'Italian',tags:['pasta','fish']}
];
var planningIndex={
'mediterranean-lemon-shallot-chicken.html':{moods:['light','elegant','mediterranean','healthy'],ingredients:['chicken'],effort:'moderate',avoid:[],occasions:['weeknight','family','date','entertaining']},
'sage-mushroom-chicken-skillet.html':{moods:['comfort','rustic','hearty'],ingredients:['chicken','mushroom'],effort:'moderate',avoid:['mushroom'],occasions:['weeknight','family']},
'veal-piccata.html':{moods:['light','elegant','italian'],ingredients:['veal'],effort:'quick',avoid:[],occasions:['date','entertaining','special']},
'boeuf-bourguignon.html':{moods:['comfort','hearty','french','rustic'],ingredients:['beef'],effort:'slow',avoid:[],occasions:['family','entertaining','special','holiday']},
'pork-chop-milanese.html':{moods:['comfort','italian'],ingredients:['pork'],effort:'moderate',avoid:['no-pork'],occasions:['weeknight','family']},
'shrimp-piccata-skewers.html':{moods:['light','mediterranean','elegant'],ingredients:['shrimp','shellfish'],effort:'quick',avoid:['shellfish-free'],occasions:['weeknight','date','outdoor']},
'shrimp-saganaki.html':{moods:['mediterranean','hearty','rustic'],ingredients:['shrimp','shellfish','cheese'],effort:'moderate',avoid:['shellfish-free','dairy-free'],occasions:['family','entertaining']},
'lemon-stuffed-grilled-branzino.html':{moods:['light','mediterranean','elegant','healthy'],ingredients:['fish'],effort:'moderate',avoid:[],occasions:['date','entertaining','outdoor','special']},
'herb-crusted-salmon.html':{moods:['light','healthy','elegant'],ingredients:['fish'],effort:'quick',avoid:[],occasions:['weeknight','date','family']},
'shrimp-herb-stir-fry.html':{moods:['light','healthy','spicy'],ingredients:['shrimp','shellfish'],effort:'quick',avoid:['shellfish-free'],occasions:['weeknight']},
'spaghetti-carbonara.html':{moods:['comfort','hearty','italian','indulgent'],ingredients:['pasta','eggs','pork','cheese'],effort:'quick',avoid:['no-pork','dairy-free','gluten-free'],occasions:['weeknight','date']},
'pasta-cacio-e-pepe.html':{moods:['comfort','italian','indulgent'],ingredients:['pasta','cheese'],effort:'quick',avoid:['dairy-free','gluten-free'],occasions:['weeknight','date']},
'pasta-alla-norma.html':{moods:['italian','mediterranean','rustic'],ingredients:['pasta','vegetables','cheese'],effort:'moderate',avoid:['dairy-free','gluten-free'],occasions:['family','weeknight']},
'miso-mushroom-leek-pasta.html':{moods:['comfort','rustic'],ingredients:['pasta','mushroom'],effort:'quick',avoid:['mushroom','gluten-free'],occasions:['weeknight']},
'creamy-seafood-risotto.html':{moods:['elegant','indulgent','italian'],ingredients:['rice','shrimp','shellfish','fish','cheese'],effort:'project',avoid:['shellfish-free','dairy-free'],occasions:['date','entertaining','special']},
'zucchini-risotto-shrimp.html':{moods:['light','italian','mediterranean'],ingredients:['rice','shrimp','shellfish','vegetables'],effort:'moderate',avoid:['shellfish-free','dairy-free'],occasions:['family','date']},
'zucchini-lasagna.html':{moods:['comfort','italian','healthy'],ingredients:['vegetables','cheese','eggs'],effort:'project',avoid:['dairy-free'],occasions:['family']}
};

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

var state={mood:[],mainIngredients:[],effort:'any',restrictions:[],occasion:'weeknight',dessert:'surprise',avoidText:'',custom:{}};
var currentMeal={main:null,side:null,veg:null,dessert:null};
var currentIngredientGroups=[];
var steps=[].slice.call(document.querySelectorAll('.planner-step')),back=document.getElementById('plannerBack'),next=document.getElementById('plannerNext'),card=document.getElementById('plannerCard'),results=document.getElementById('plannerResults'),progress=document.getElementById('plannerProgressBar'),step=0;
document.querySelectorAll('.planner-options').forEach(function(group){var key=group.dataset.key,multi=group.classList.contains('multi');group.querySelectorAll('button').forEach(function(button){button.addEventListener('click',function(){if(multi){button.classList.toggle('selected');state[key]=[].slice.call(group.querySelectorAll('button.selected')).map(function(b){return b.dataset.value;});}else{group.querySelectorAll('button').forEach(function(b){b.classList.remove('selected');});button.classList.add('selected');state[key]=button.dataset.value;}});});});
function showStep(){steps.forEach(function(el,i){el.classList.toggle('active',i===step);});back.disabled=step===0;next.textContent=step===steps.length-1?'Build my meal':'Next';progress.style.width=((step+1)/steps.length*100)+'%';}
function score(r,role,type){
  var n=0;
  if(r.role!==role)return-999;

  var idx=recipeIndex[r.url]||{proteins:[],prep:[]};
  var plan=planningIndex[r.url]||{moods:[],ingredients:[],effort:'any',avoid:[],occasions:[]};

  if(type && type!=='any' && r.type===type)n+=5;
  if(r.cuisine==='Any')n+=1;

  if(role==='main'){
    state.mood.forEach(function(m){if(plan.moods.indexOf(m)>=0)n+=4;});
    state.mainIngredients.forEach(function(p){
      if(plan.ingredients.indexOf(p)>=0 || idx.proteins.indexOf(p)>=0)n+=5;
    });
    if(state.effort && state.effort!=='any' && plan.effort===state.effort)n+=4;
    if(state.occasion && plan.occasions.indexOf(state.occasion)>=0)n+=3;

    var blocked=false;
    state.restrictions.forEach(function(x){
      if(plan.avoid.indexOf(x)>=0)blocked=true;
    });
    if(blocked)return-999;
  }

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
  state.mainIngredients.forEach(function(tag){if(item.tags.indexOf(tag)>=0)n+=1;});
  return n;
}
function topPairings(kind,main,count){
  return pairingDishes.filter(function(x){return x.kind===kind;})
    .map(function(x){return{x:x,s:pairingScore(x,main)};})
    .sort(function(a,b){return b.s-a.s||a.x.title.localeCompare(b.x.title);})
    .slice(0,count).map(function(x){return x.x;});
}
function renderPairings(main){
  function swapItems(items,slot){
    return items.map(function(x){
      return '<div class="pairing-item pairing-swap-item"><a href="'+x.url+'"><span>'+x.title+'</span><small>View recipe →</small></a><button type="button" class="pairing-swap" data-slot="'+slot+'" data-title="'+x.title.replace(/"/g,'&quot;')+'" data-url="'+x.url+'">Swap into menu</button></div>';
    }).join('');
  }
  document.getElementById('pairingSides').innerHTML=swapItems(topPairings('side',main,3),'side');
  document.getElementById('pairingVegetables').innerHTML=swapItems(topPairings('vegetable',main,3),'veg');
  document.getElementById('pairingSalads').innerHTML=swapItems(topPairings('salad',main,3),'veg');

  var desserts=dessertChoices();
  document.getElementById('pairingDesserts').innerHTML=desserts.length?swapItems(desserts,'dessert'):'<div class="pairing-item pairing-suggestion"><span>No dessert selected</span></div>';
  bindSwapButtons();
}
function dessertChoices(){
  var all=[
    {title:'Tiramisu',url:'tiramisu.html',type:'creamy'},
    {title:'Crème Brûlée',url:'creme-brulee.html',type:'creamy'},
    {title:'Chocolate Lava Cake',url:'chocolate-lava-cake.html',type:'chocolate'},
    {title:'Apple Crumble',url:'apple-crumble.html',type:'fruit'},
    {title:'Lemon Squares',url:'lemon-squares.html',type:'lemon'},
    {title:'Brownies',url:'brownies.html',type:'chocolate'},
    {title:'Key Lime Pie',url:'key-lime-pie.html',type:'pie'},
    {title:'Classic American Apple Pie',url:'classic-american-apple-pie.html',type:'pie'},
    {title:'Peach Pie',url:'peach-pie.html',type:'pie'}
  ];
  if(state.dessert==='none')return[];
  if(state.dessert==='surprise')return all.slice(0,3);
  if(state.dessert==='cake')return all.filter(function(x){return x.title.toLowerCase().indexOf('cake')>=0;}).slice(0,3);
  return all.filter(function(x){return x.type===state.dessert;}).slice(0,3);
}
function readCustomize(){
  state.avoidText=(document.getElementById('avoidText')||{}).value||'';
  state.custom={
    drinks:(document.getElementById('customDrinks')||{}).value||'',
    appetizer:(document.getElementById('customAppetizer')||{}).value||'',
    extraSide:(document.getElementById('customExtraSide')||{}).value||'',
    cheese:(document.getElementById('customCheese')||{}).value||'',
    afterDrink:(document.getElementById('customAfterDrink')||{}).value||'',
    presentation:(document.getElementById('customPresentation')||{}).value||'',
    people:(document.getElementById('customPeople')||{}).value||'',
    budget:(document.getElementById('customBudget')||{}).value||'',
    pantry:(document.getElementById('customPantry')||{}).value||'',
    equipment:(document.getElementById('customEquipment')||{}).value||''
  };
}
function selectedMealItems(){
  var items=[['Main',currentMeal.main],['Side',currentMeal.side],['Vegetable / Salad',currentMeal.veg]];
  if(currentMeal.dessert)items.push(['Dessert',currentMeal.dessert]);
  return items.filter(function(x){return x[1];});
}
function renderCurrentMeal(){
  document.getElementById('plannedMealGrid').innerHTML=selectedMealItems().map(function(item){
    return '<article class="planned-dish"><p class="eyebrow">'+item[0]+'</p><h3>'+item[1].title+'</h3><a class="text-link" href="'+item[1].url+'">View recipe →</a></article>';
  }).join('');
  var ingredientPanel=document.getElementById('ingredientListPanel');
  if(ingredientPanel)ingredientPanel.hidden=true;
}
function bindSwapButtons(){
  document.querySelectorAll('.pairing-swap').forEach(function(button){
    button.addEventListener('click',function(){
      var slot=button.dataset.slot;
      currentMeal[slot]={title:button.dataset.title,url:button.dataset.url};
      renderCurrentMeal();
      button.textContent='Added to menu';
      setTimeout(function(){button.textContent='Swap into menu';},1200);
    });
  });
}
function cleanIngredientText(text){
  return (text||'').replace(/\s+/g,' ').trim();
}
function extractIngredients(html){
  var doc=new DOMParser().parseFromString(html,'text/html');
  var panel=doc.querySelector('.ingredients-panel');
  if(!panel)return[];
  var lis=[].slice.call(panel.querySelectorAll('li')).map(function(li){return cleanIngredientText(li.textContent);}).filter(Boolean);
  if(lis.length)return lis;
  return [cleanIngredientText(panel.textContent.replace(/Ingredients?/i,''))].filter(Boolean);
}
function createIngredientList(){
  var panel=document.getElementById('ingredientListPanel');
  var status=document.getElementById('ingredientListStatus');
  var content=document.getElementById('ingredientListContent');
  var items=selectedMealItems();
  panel.hidden=false;
  status.textContent='Building ingredient list…';
  content.innerHTML='';
  Promise.all(items.map(function(item){
    return fetch(item[1].url).then(function(response){
      if(!response.ok)throw new Error('Could not open '+item[1].title);
      return response.text();
    }).then(function(html){
      return {label:item[0],dish:item[1],ingredients:extractIngredients(html)};
    }).catch(function(){
      return {label:item[0],dish:item[1],ingredients:[]};
    });
  })).then(function(groups){
    currentIngredientGroups=groups;
    status.textContent='';
    content.innerHTML=groups.map(function(group){
      var body=group.ingredients.length
        ?'<ul>'+group.ingredients.map(function(x){return'<li>'+x+'</li>';}).join('')+'</ul>'
        :'<p class="muted-copy">Ingredients could not be read automatically. <a href="'+group.dish.url+'">Open recipe</a>.</p>';
      return '<section class="ingredient-dish-group"><h3>'+group.label+': <a href="'+group.dish.url+'">'+group.dish.title+'</a></h3>'+body+'</section>';
    }).join('');
    panel.scrollIntoView({behavior:'smooth',block:'start'});
  });
}
function ingredientPayload(){
  return currentIngredientGroups.map(function(group){
    return {
      label:group.label,
      title:group.dish.title,
      url:new URL(group.dish.url,window.location.href).href,
      ingredients:group.ingredients
    };
  });
}
function sendIngredientList(channel,recipient,submitButton){
  var shareStatus=document.getElementById('ingredientShareStatus');
  if(!currentIngredientGroups.length){
    shareStatus.textContent='Create the ingredient list first.';
    return Promise.resolve();
  }
  var original=submitButton.textContent;
  submitButton.disabled=true;
  submitButton.textContent='Sending…';
  shareStatus.textContent='';
  return fetch('/api/send-ingredient-list',{
    method:'POST',
    headers:{'Content-Type':'application/json'},
    body:JSON.stringify({
      channel:channel,
      recipient:recipient,
      mealTitle:'The Kitchen Table ingredient list',
      groups:ingredientPayload()
    })
  }).then(function(response){
    return response.json().catch(function(){return {};}).then(function(data){
      if(!response.ok)throw new Error(data.error||'Could not send the ingredient list.');
      shareStatus.textContent=channel==='email'?'Ingredient list emailed successfully.':'Ingredient list texted successfully.';
    });
  }).catch(function(error){
    shareStatus.textContent=error.message||'Could not send the ingredient list.';
  }).finally(function(){
    submitButton.disabled=false;
    submitButton.textContent=original;
  });
}
function bindIngredientSharing(){
  var emailForm=document.getElementById('emailIngredientForm');
  if(emailForm)emailForm.addEventListener('submit',function(event){
    event.preventDefault();
    var input=document.getElementById('ingredientEmail');
    sendIngredientList('email',input.value.trim(),emailForm.querySelector('button[type="submit"]'));
  });
  var textForm=document.getElementById('textIngredientForm');
  if(textForm)textForm.addEventListener('submit',function(event){
    event.preventDefault();
    var input=document.getElementById('ingredientPhone');
    sendIngredientList('sms',input.value.trim(),textForm.querySelector('button[type="submit"]'));
  });
}
function buildMeal(){readCustomize();var main=pick('main',state.mainType),side=pick('side',state.sideType,[main&&main.url]),veg=pick('veg',state.vegType,[main&&main.url,side&&side.url]);currentMeal={main:main,side:side,veg:veg,dessert:null};document.getElementById('plannerSummary').textContent=
  (state.mood.length?'Mood: '+state.mood.join(', ')+'. ':'')+
  (state.mainIngredients.length?'Main ingredients: '+state.mainIngredients.join(', ')+'. ':'')+
  (state.effort!=='any'?'Effort: '+state.effort+'. ':'')+
  'Meal type: '+state.occasion+'.';renderCurrentMeal();renderPairings(main);card.hidden=true;results.hidden=false;results.scrollIntoView({behavior:'smooth',block:'start'});}
next.addEventListener('click',function(){if(step<steps.length-1){step++;showStep();}else buildMeal();});
back.addEventListener('click',function(){if(step>0){step--;showStep();}});
document.getElementById('plannerRestart').addEventListener('click',function(){step=0;currentMeal={main:null,side:null,veg:null,dessert:null};card.hidden=false;results.hidden=true;showStep();window.scrollTo({top:0,behavior:'smooth'});});
var ingredientButton=document.getElementById('createIngredientList');
if(ingredientButton)ingredientButton.addEventListener('click',createIngredientList);
var printButton=document.getElementById('printIngredientList');
if(printButton)printButton.addEventListener('click',function(){window.print();});
bindIngredientSharing();
showStep();
})();