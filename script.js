if (!window.KitchenTableI18n) {

// Site-wide language support: English, Spanish, French.
(function(){
  var STORAGE_KEY='kitchenTableLanguage';
  var supported=['en','es','fr'];
  var saved='';
  try{ saved=localStorage.getItem(STORAGE_KEY)||''; }catch(e){}
  var current=supported.indexOf(saved)>=0?saved:'en';

  var translations={
    es:{
      'Recipes':'Recetas','My Meal':'Mi Comida','Pantry to Plate':'Despensa al Plato','Sauces':'Salsas','Guides':'Guías','Plan a Meal':'Planificar una Comida','About':'Acerca de',
      'Home':'Inicio','Cooking Guides':'Guías de Cocina','Open guide →':'Abrir guía →','View recipe →':'Ver receta →','View sauce →':'Ver salsa →',
      'Browse recipes':'Explorar recetas','View categories':'Ver categorías','RECIPE OF THE DAY':'RECETA DEL DÍA','A PERSONAL COOKBOOK':'UN RECETARIO PERSONAL',
      'Recipes worth making again.':'Recetas que vale la pena repetir.','Find something delicious.':'Encuentra algo delicioso.','RECIPE COLLECTION':'COLECCIÓN DE RECETAS',
      'Search recipes…':'Buscar recetas…','All cuisines':'Todas las cocinas','Cuisine':'Cocina','American':'Estadounidense','American cuisine':'Cocina estadounidense','All American':'Toda la cocina estadounidense','General American':'Estadounidense general','Cajun / Creole':'Cajún / Criolla','European':'Europea','European country':'País europeo','All European':'Toda Europa','Italy':'Italia','France':'Francia','United Kingdom':'Reino Unido','Switzerland':'Suiza','Belgium':'Bélgica','Spain':'España','Greece':'Grecia','Food type':'Tipo de comida','All':'Todo','Meat':'Carnes','Pasta':'Pasta','Rice':'Arroz','Seafood':'Mariscos','Vegetables & Sides':'Verduras y Guarniciones','Soups & Salads':'Sopas y Ensaladas','Sauces / Broths':'Salsas / Caldos','Extras':'Extras','Desserts':'Postres',
      'Ingredients':'Ingredientes','Preparation':'Preparación','Related Recipes':'Recetas Relacionadas','All recipes':'Todas las recetas','Print Recipe':'Imprimir receta','Print recipe':'Imprimir receta',
      'Add to My Meal':'Agregar a Mi Comida','Already in My Meal':'Ya está en Mi Comida','Added to My Meal':'Agregado a Mi Comida',
      'Back to Guides':'Volver a Guías','Back to all recipes':'Volver a todas las recetas','Back to recipes':'Volver a recetas','Cooking Guide':'Guía de Cocina',
      'PANTRY TO PLATE':'DESPENSA AL PLATO','Cook with what you already have.':'Cocina con lo que ya tienes.','Select the ingredients you already have, and we’ll recommend dishes you can make.':'Selecciona los ingredientes que ya tienes y te recomendaremos platos que puedes preparar.',
      'ingredients selected':'ingredientes seleccionados','Proteins':'Proteínas','Vegetables':'Verduras','Fruit':'Frutas','Grains':'Granos','Dairy':'Lácteos','Pantry':'Despensa','Herbs & Spices':'Hierbas y Especias','Condiments':'Condimentos',
      'Find Dishes':'Buscar Platos','Clear selections':'Borrar selección','RECOMMENDED':'RECOMENDADO','Dishes that match your pantry':'Platos que coinciden con tu despensa',
      'Choose at least one ingredient to get recommendations.':'Selecciona al menos un ingrediente para obtener recomendaciones.','Finding dishes…':'Buscando platos…',
      'No close matches found yet. Try a broader combination of ingredients.':'No se encontraron coincidencias cercanas. Prueba una combinación más amplia de ingredientes.',
      'My Meal':'Mi Comida','Finalize Meal':'Finalizar Comida','Ingredient List':'Lista de Ingredientes','Print list':'Imprimir lista',
      'Mother Sauces':'Salsas Madre','Daughter Sauces by Mother':'Salsas Derivadas por Salsa Madre','Other Sauces':'Otras Salsas','The Five Mother Sauces Guide':'Guía de las Cinco Salsas Madre',
      'Seafood & Fish Guide':'Guía de Pescados y Mariscos','Pasta Guide':'Guía de Pasta','Mushroom Guide':'Guía de Hongos','Meat Guide':'Guía de Carnes','Tortilla Guide':'Guía de Tortillas',
      'Shapes, styles, pairings, preparation, and pasta fundamentals.':'Formas, estilos, combinaciones, preparación y fundamentos de la pasta.',
      'Common varieties, flavor profiles, cooking uses, and handling.':'Variedades comunes, perfiles de sabor, usos culinarios y manipulación.',
      'Cuts, cooking methods, doneness, and practical meat references.':'Cortes, métodos de cocción, puntos de cocción y referencias prácticas sobre carnes.',
      'The classic foundation sauces and the families of sauces built from them.':'Las salsas clásicas fundamentales y las familias de salsas que se derivan de ellas.',
      'Types, preparation methods, ingredients, and serving uses.':'Tipos, métodos de preparación, ingredientes y formas de servir.',
      'Fish types, shellfish, cuts, freshness, cooking methods, doneness, and preparation.':'Tipos de pescado, mariscos, cortes, frescura, métodos de cocción, puntos de cocción y preparación.',
      'Practical references for ingredients, techniques, sauces, cuts, and kitchen fundamentals—all gathered in one place.':'Referencias prácticas sobre ingredientes, técnicas, salsas, cortes y fundamentos de cocina, reunidas en un solo lugar.',
      'From the five classical French mother sauces to their daughter sauces and other kitchen staples, browse the sauce collection in one place.':'Desde las cinco salsas madre clásicas francesas hasta sus salsas derivadas y otros básicos de cocina, explora toda la colección de salsas en un solo lugar.',
      'Start with Béchamel, Velouté, Espagnole, Sauce Tomate, and Hollandaise, then explore the sauces derived from them.':'Comienza con Béchamel, Velouté, Espagnole, Sauce Tomate y Hollandaise, y luego explora las salsas derivadas de ellas.',
      'Select the ingredients you already have, and we’ll recommend dishes you can make.':'Selecciona los ingredientes que ya tienes y te recomendaremos platos que puedes preparar.',
      'Recipes you add while browsing appear here. Review your selections, remove anything you do not want, then finalize the meal when it looks right.':'Las recetas que agregues mientras navegas aparecerán aquí. Revisa tus selecciones, elimina lo que no quieras y finaliza la comida cuando esté lista.',
      'Selected dishes':'Platos seleccionados','Clear all':'Borrar todo','Finalize meal':'Finalizar comida','Create ingredient list':'Crear lista de ingredientes','Edit meal':'Editar comida','Browse recipes':'Explorar recetas',
      'No recipes have been added yet.':'Todavía no se han agregado recetas.','No dishes selected yet.':'Todavía no hay platos seleccionados.','Your Kitchen Table meal':'Tu comida de The Kitchen Table',
      'These are the dishes currently included in your finalized meal.':'Estos son los platos incluidos actualmente en tu comida finalizada.','Built from your finalized meal.':'Creada a partir de tu comida finalizada.',
      'Remove':'Eliminar','View recipe →':'Ver receta →','Open guide →':'Abrir guía →','Open the guide →':'Abrir la guía →','View sauce →':'Ver salsa →',
      'Find Dishes':'Buscar platos','Clear selections':'Borrar selección','Print list':'Imprimir lista','Print':'Imprimir','Close':'Cerrar','Submit':'Enviar','Save':'Guardar','Cancel':'Cancelar'
    },
    fr:{
      'Recipes':'Recettes','My Meal':'Mon Repas','Pantry to Plate':'Du Garde-Manger à l’Assiette','Sauces':'Sauces','Guides':'Guides','Plan a Meal':'Planifier un Repas','About':'À propos',
      'Home':'Accueil','Cooking Guides':'Guides de Cuisine','Open guide →':'Ouvrir le guide →','View recipe →':'Voir la recette →','View sauce →':'Voir la sauce →',
      'Browse recipes':'Parcourir les recettes','View categories':'Voir les catégories','RECIPE OF THE DAY':'RECETTE DU JOUR','A PERSONAL COOKBOOK':'UN LIVRE DE RECETTES PERSONNEL',
      'Recipes worth making again.':'Des recettes à refaire encore et encore.','Find something delicious.':'Trouvez quelque chose de délicieux.','RECIPE COLLECTION':'COLLECTION DE RECETTES',
      'Search recipes…':'Rechercher des recettes…','All cuisines':'Toutes les cuisines','Cuisine':'Cuisine','American':'Américaine','American cuisine':'Cuisine américaine','All American':'Toute la cuisine américaine','General American':'Américaine générale','Cajun / Creole':'Cajun / Créole','European':'Européenne','European country':'Pays européen','All European':'Toute l’Europe','Italy':'Italie','France':'France','United Kingdom':'Royaume-Uni','Switzerland':'Suisse','Belgium':'Belgique','Spain':'Espagne','Greece':'Grèce','Food type':'Type de plat','All':'Tout','Meat':'Viandes','Pasta':'Pâtes','Rice':'Riz','Seafood':'Fruits de mer','Vegetables & Sides':'Légumes et Accompagnements','Soups & Salads':'Soupes et Salades','Sauces / Broths':'Sauces / Bouillons','Extras':'Extras','Desserts':'Desserts',
      'Ingredients':'Ingrédients','Preparation':'Préparation','Related Recipes':'Recettes Associées','All recipes':'Toutes les recettes','Print Recipe':'Imprimer la recette','Print recipe':'Imprimer la recette',
      'Add to My Meal':'Ajouter à Mon Repas','Already in My Meal':'Déjà dans Mon Repas','Added to My Meal':'Ajouté à Mon Repas',
      'Back to Guides':'Retour aux Guides','Back to all recipes':'Retour à toutes les recettes','Back to recipes':'Retour aux recettes','Cooking Guide':'Guide de Cuisine',
      'PANTRY TO PLATE':'DU GARDE-MANGER À L’ASSIETTE','Cook with what you already have.':'Cuisinez avec ce que vous avez déjà.','Select the ingredients you already have, and we’ll recommend dishes you can make.':'Sélectionnez les ingrédients que vous avez déjà et nous vous proposerons des plats à préparer.',
      'ingredients selected':'ingrédients sélectionnés','Proteins':'Protéines','Vegetables':'Légumes','Fruit':'Fruits','Grains':'Céréales','Dairy':'Produits Laitiers','Pantry':'Garde-Manger','Herbs & Spices':'Herbes et Épices','Condiments':'Condiments',
      'Find Dishes':'Trouver des Plats','Clear selections':'Effacer la sélection','RECOMMENDED':'RECOMMANDÉ','Dishes that match your pantry':'Plats correspondant à votre garde-manger',
      'Choose at least one ingredient to get recommendations.':'Choisissez au moins un ingrédient pour obtenir des recommandations.','Finding dishes…':'Recherche de plats…',
      'No close matches found yet. Try a broader combination of ingredients.':'Aucune correspondance proche. Essayez une combinaison plus large d’ingrédients.',
      'Finalize Meal':'Finaliser le Repas','Ingredient List':'Liste des Ingrédients','Print list':'Imprimer la liste',
      'Mother Sauces':'Sauces Mères','Daughter Sauces by Mother':'Sauces Dérivées par Sauce Mère','Other Sauces':'Autres Sauces','The Five Mother Sauces Guide':'Guide des Cinq Sauces Mères',
      'Seafood & Fish Guide':'Guide des Poissons et Fruits de Mer','Pasta Guide':'Guide des Pâtes','Mushroom Guide':'Guide des Champignons','Meat Guide':'Guide des Viandes','Tortilla Guide':'Guide des Tortillas',
      'Shapes, styles, pairings, preparation, and pasta fundamentals.':'Formes, styles, accords, préparation et bases des pâtes.',
      'Common varieties, flavor profiles, cooking uses, and handling.':'Variétés courantes, profils de saveur, usages culinaires et manipulation.',
      'Cuts, cooking methods, doneness, and practical meat references.':'Coupes, méthodes de cuisson, degrés de cuisson et références pratiques sur les viandes.',
      'The classic foundation sauces and the families of sauces built from them.':'Les sauces classiques de base et les familles de sauces qui en dérivent.',
      'Types, preparation methods, ingredients, and serving uses.':'Types, méthodes de préparation, ingrédients et façons de servir.',
      'Fish types, shellfish, cuts, freshness, cooking methods, doneness, and preparation.':'Types de poissons, fruits de mer, découpes, fraîcheur, méthodes de cuisson, degrés de cuisson et préparation.',
      'Practical references for ingredients, techniques, sauces, cuts, and kitchen fundamentals—all gathered in one place.':'Des références pratiques sur les ingrédients, techniques, sauces, découpes et fondamentaux de cuisine, réunies en un seul endroit.',
      'From the five classical French mother sauces to their daughter sauces and other kitchen staples, browse the sauce collection in one place.':'Des cinq sauces mères françaises classiques à leurs sauces dérivées et autres essentiels de cuisine, parcourez toute la collection de sauces en un seul endroit.',
      'Start with Béchamel, Velouté, Espagnole, Sauce Tomate, and Hollandaise, then explore the sauces derived from them.':'Commencez par la Béchamel, le Velouté, l’Espagnole, la Sauce Tomate et la Hollandaise, puis explorez les sauces qui en dérivent.',
      'Select the ingredients you already have, and we’ll recommend dishes you can make.':'Sélectionnez les ingrédients que vous avez déjà et nous vous proposerons des plats à préparer.',
      'Recipes you add while browsing appear here. Review your selections, remove anything you do not want, then finalize the meal when it looks right.':'Les recettes que vous ajoutez en parcourant le site apparaissent ici. Vérifiez vos choix, retirez ce que vous ne souhaitez pas, puis finalisez le repas.',
      'Selected dishes':'Plats sélectionnés','Clear all':'Tout effacer','Finalize meal':'Finaliser le repas','Create ingredient list':'Créer la liste des ingrédients','Edit meal':'Modifier le repas','Browse recipes':'Parcourir les recettes',
      'No recipes have been added yet.':'Aucune recette n’a encore été ajoutée.','No dishes selected yet.':'Aucun plat sélectionné.','Your Kitchen Table meal':'Votre repas The Kitchen Table',
      'These are the dishes currently included in your finalized meal.':'Voici les plats actuellement inclus dans votre repas finalisé.','Built from your finalized meal.':'Créée à partir de votre repas finalisé.',
      'Remove':'Retirer','View recipe →':'Voir la recette →','Open guide →':'Ouvrir le guide →','Open the guide →':'Ouvrir le guide →','View sauce →':'Voir la sauce →',
      'Find Dishes':'Trouver des plats','Clear selections':'Effacer la sélection','Print list':'Imprimer la liste','Print':'Imprimer','Close':'Fermer','Submit':'Envoyer','Save':'Enregistrer','Cancel':'Annuler'
    }
  };

  function translateExact(value){
    if(current==='en') return value;
    var trimmed=(value||'').trim();
    if(!trimmed)return value;
    var translated=(window.KitchenTableLocaleContent&&window.KitchenTableLocaleContent[current]&&window.KitchenTableLocaleContent[current][trimmed])||(translations[current]&&translations[current][trimmed]);
    if(!translated)return value;
    var lead=value.match(/^\s*/)[0], tail=value.match(/\s*$/)[0];
    return lead+translated+tail;
  }

  function translateDOM(){
    document.documentElement.lang=current;
    document.querySelectorAll('[data-i18n-lang-content]').forEach(function(block){var lang=block.getAttribute('data-i18n-lang-content');block.hidden=lang!==current;});
    var notice=document.getElementById('recipeTranslationNotice');if(notice){notice.hidden=current==='en';notice.textContent=current==='es'?'Esta receta aún no tiene una traducción verificada. Los ingredientes y las instrucciones se muestran en inglés.':current==='fr'?'Cette recette ne dispose pas encore d’une traduction vérifiée. Les ingrédients et les instructions sont affichés en anglais.':'';}
    var walker=document.createTreeWalker(document.body,NodeFilter.SHOW_TEXT,{
      acceptNode:function(node){
        var p=node.parentElement;
        if(!p||/^(SCRIPT|STYLE|TEXTAREA|OPTION)$/i.test(p.tagName))return NodeFilter.FILTER_REJECT;
        if(p.closest&&p.closest('.language-switcher'))return NodeFilter.FILTER_REJECT;
        return node.nodeValue&&node.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
      }
    });
    var nodes=[],n;
    while((n=walker.nextNode()))nodes.push(n);
    nodes.forEach(function(node){
      if(typeof node.__ktI18nOriginal==='undefined') node.__ktI18nOriginal=node.nodeValue;
      var original=node.__ktI18nOriginal;
      var desired=current==='en'?original:translateExact(original);
      if(node.nodeValue!==desired) node.nodeValue=desired;
    });

    document.querySelectorAll('input[placeholder],textarea[placeholder]').forEach(function(el){
      if(typeof el.__ktI18nPlaceholder==='undefined')el.__ktI18nPlaceholder=el.getAttribute('placeholder')||'';
      var original=el.__ktI18nPlaceholder;
      el.setAttribute('placeholder',current==='en'?original:translateExact(original));
    });

    document.querySelectorAll('input[type="button"],input[type="submit"],input[type="reset"]').forEach(function(el){
      if(typeof el.__ktI18nValue==='undefined')el.__ktI18nValue=el.value||'';
      var original=el.__ktI18nValue;
      el.value=current==='en'?original:translateExact(original);
    });

    document.querySelectorAll('[aria-label]').forEach(function(el){
      if(typeof el.__ktI18nAria==='undefined')el.__ktI18nAria=el.getAttribute('aria-label')||'';
      var original=el.__ktI18nAria;
      el.setAttribute('aria-label',current==='en'?original:translateExact(original));
    });

    document.querySelectorAll('[title]').forEach(function(el){
      if(typeof el.__ktI18nTitle==='undefined')el.__ktI18nTitle=el.getAttribute('title')||'';
      var original=el.__ktI18nTitle;
      el.setAttribute('title',current==='en'?original:translateExact(original));
    });
  }

  function addSwitcher(){
    if(!document.getElementById('kitchen-table-language-styles')){
      var style=document.createElement('style');
      style.id='kitchen-table-language-styles';
      style.textContent='.language-switcher{display:flex;align-items:center;gap:4px;margin-left:10px;flex:0 0 auto}.language-switcher button{border:1px solid rgba(120,100,80,.28);background:rgba(255,255,255,.72);color:inherit;border-radius:999px;padding:5px 8px;font:700 11px/1 Inter,Arial,sans-serif;letter-spacing:.06em;cursor:pointer}.language-switcher button.active{background:#a4442f;color:#fff;border-color:#a4442f}.topbar .language-switcher button{background:rgba(255,255,255,.1);border-color:rgba(255,255,255,.28);color:#fff}.topbar .language-switcher button.active{background:#d8a35d;color:#20262a;border-color:#d8a35d}@media(max-width:760px){.language-switcher{margin-left:0}.nav-wrap .language-switcher{order:3}.language-switcher button{padding:6px 9px}}';
      document.head.appendChild(style);
    }
    if(document.querySelector('.language-switcher'))return;
    var host=document.querySelector('.nav-wrap')||document.querySelector('.topbar')||document.querySelector('.site-header');
    if(!host)return;
    var wrap=document.createElement('div');
    wrap.className='language-switcher';
    wrap.setAttribute('aria-label','Language');
    wrap.innerHTML='<button type="button" data-lang="en">EN</button><button type="button" data-lang="es">ES</button><button type="button" data-lang="fr">FR</button>';
    host.appendChild(wrap);
    wrap.querySelectorAll('button').forEach(function(btn){
      btn.classList.toggle('active',btn.dataset.lang===current);
      btn.addEventListener('click',function(){
        current=btn.dataset.lang;
        try{localStorage.setItem(STORAGE_KEY,current);}catch(e){}
        wrap.querySelectorAll('button').forEach(function(b){b.classList.toggle('active',b.dataset.lang===current);});
        translateDOM();
        document.dispatchEvent(new CustomEvent('kitchen-table-language-change',{detail:{language:current}}));
      });
    });
  }

  window.KitchenTableI18n={
    getLanguage:function(){return current;},
    t:function(value){return current==='en'?value:translateExact(value);},
    register:function(lang,entries){window.KitchenTableLocaleContent=window.KitchenTableLocaleContent||{};Object.assign(window.KitchenTableLocaleContent[lang]||(window.KitchenTableLocaleContent[lang]={}),entries||{});translateDOM();},
    apply:translateDOM
  };

  function init(){addSwitcher();translateDOM();}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);
  else init();

  // Translate controls or status text inserted later by existing site scripts.
  var observerQueued=false;
  var observer=new MutationObserver(function(mutations){
    if(current==='en'||observerQueued)return;
    var changed=mutations.some(function(m){
      return (m.type==='childList'&&m.addedNodes.length) || m.type==='characterData' || m.type==='attributes';
    });
    if(!changed)return;
    observerQueued=true;
    requestAnimationFrame(function(){
      observerQueued=false;
      translateDOM();
    });
  });
  if(document.documentElement)observer.observe(document.documentElement,{
    childList:true,subtree:true,characterData:true,attributes:true,
    attributeFilter:['placeholder','aria-label','title','value']
  });
})();


}
// Browser scroll restoration is handled early on the homepage in index.html.
if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (menuButton && nav) {
  function closeMobileMenu() {
    nav.classList.remove('open');
    menuButton.setAttribute('aria-expanded', 'false');
  }
  menuButton.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });
  nav.addEventListener('click', event => {
    if (event.target.closest('a[href]')) closeMobileMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') closeMobileMenu();
  });
}



function addMetricIngredientMeasurements(root) {
  root = root || document;
  var fractionMap = {'¼':0.25,'½':0.5,'¾':0.75,'⅓':1/3,'⅔':2/3,'⅛':0.125,'⅜':0.375,'⅝':0.625,'⅞':0.875};

  function parseQty(raw) {
    raw = (raw || '').trim();
    if (!raw) return null;
    if (fractionMap[raw] != null) return fractionMap[raw];
    var mixed = raw.match(/^(\d+)\s+([¼½¾⅓⅔⅛⅜⅝⅞])$/);
    if (mixed) return Number(mixed[1]) + fractionMap[mixed[2]];
    var slashMixed = raw.match(/^(\d+)\s+(\d+)\/(\d+)$/);
    if (slashMixed) return Number(slashMixed[1]) + Number(slashMixed[2]) / Number(slashMixed[3]);
    var frac = raw.match(/^(\d+)\/(\d+)$/);
    if (frac) return Number(frac[1]) / Number(frac[2]);
    var n = Number(raw);
    return isFinite(n) ? n : null;
  }

  function pretty(n, unit) {
    if (unit === 'kg' && n < 1) return Math.round(n * 1000) + ' g';
    if (unit === 'L' && n < 1) return Math.round(n * 1000) + ' mL';
    if (unit === 'g') return Math.round(n) + ' g';
    if (unit === 'mL') {
      var rounded = n < 20 ? Math.round(n * 2) / 2 : Math.round(n);
      return rounded + ' mL';
    }
    var v = Math.round(n * 100) / 100;
    return v + ' ' + unit;
  }

  var dryCupWeights = [
    [/all[- ]purpose flour|bread flour|cake flour|flour\b/i,120],
    [/granulated sugar|white sugar|sugar\b/i,200],
    [/brown sugar/i,220],
    [/powdered sugar|confectioners'? sugar|icing sugar/i,120],
    [/rice\b/i,185],
    [/quinoa\b/i,170],
    [/oats?|rolled oats/i,90],
    [/barley\b/i,200],
    [/couscous\b/i,173],
    [/cornmeal|polenta|grits/i,160],
    [/farro\b/i,190],
    [/bulgur\b/i,140],
    [/millet\b/i,200],
    [/buckwheat\b/i,170],
    [/wild rice/i,160],
    [/freekeh\b/i,180],
    [/wheat berries/i,190],
    [/breadcrumbs?|panko/i,110],
    [/cocoa powder|cacao powder/i,85],
    [/cornstarch/i,128],
    [/baking powder/i,192],
    [/baking soda/i,220],
    [/salt\b|kosher salt|sea salt/i,288],
    [/black pepper|pepper flakes|chili powder|paprika|cumin|turmeric|cayenne|oregano|basil|thyme|rosemary|sage/i,96],
    [/parmesan|pecorino|grated cheese/i,100],
    [/shredded cheese|cheddar|mozzarella/i,113],
    [/nuts?|almonds?|walnuts?|pecans?|peanuts?/i,120],
    [/seeds?|sesame|sunflower|pumpkin seeds/i,145],
    [/chocolate chips?|chopped chocolate/i,170]
  ];

  function dryGramsPerCup(line) {
    for (var i=0;i<dryCupWeights.length;i++) {
      if (dryCupWeights[i][0].test(line)) return dryCupWeights[i][1];
    }
    return null;
  }

  function metricFor(line) {
    if (/\([^)]*(?:g|kg|ml|mL|l|L)\b[^)]*\)/.test(line)) return null;
    var qtyPattern = '(\\d+\\s+[¼½¾⅓⅔⅛⅜⅝⅞]|\\d+\\s+\\d+\\/\\d+|\\d+\\/\\d+|[¼½¾⅓⅔⅛⅜⅝⅞]|\\d+(?:\\.\\d+)?)';
    var re = new RegExp('^\\s*' + qtyPattern + '\\s*(lb|lbs|pound|pounds|oz|ounce|ounces|qt|quart|quarts|gal|gallon|gallons|cup|cups|tbsp|tablespoon|tablespoons|tsp|teaspoon|teaspoons)\\b', 'i');
    var m = line.match(re);
    if (!m) return null;
    var q = parseQty(m[1]);
    if (q == null) return null;
    var u = m[2].toLowerCase();

    if (/^(lb|lbs|pound|pounds)$/.test(u)) return pretty(q * 453.59237, 'g');
    if (/^(oz|ounce|ounces)$/.test(u)) return pretty(q * 28.349523125, 'g');

    var gramsPerCup = dryGramsPerCup(line);
    if (gramsPerCup != null) {
      if (/^(cup|cups)$/.test(u)) return pretty(q * gramsPerCup, 'g');
      if (/^(tbsp|tablespoon|tablespoons)$/.test(u)) return pretty(q * gramsPerCup / 16, 'g');
      if (/^(tsp|teaspoon|teaspoons)$/.test(u)) return pretty(q * gramsPerCup / 48, 'g');
    }

    if (/^(qt|quart|quarts)$/.test(u)) return pretty(q * 0.946352946, 'L');
    if (/^(gal|gallon|gallons)$/.test(u)) return pretty(q * 3.785411784, 'L');
    if (/^(cup|cups)$/.test(u)) return pretty(q * 236.5882365, 'mL');
    if (/^(tbsp|tablespoon|tablespoons)$/.test(u)) return pretty(q * 14.7867648, 'mL');
    if (/^(tsp|teaspoon|teaspoons)$/.test(u)) return pretty(q * 4.92892159, 'mL');
    return null;
  }

  root.querySelectorAll('.ingredients-panel li').forEach(function(li) {
    if (li.dataset.metricAdded === 'true') return;
    var original = (li.textContent || '').replace(/\s+/g, ' ').trim();
    var metric = metricFor(original);
    if (metric) {
      li.innerHTML = '';
      var imperial = document.createElement('span');
      imperial.className = 'ingredient-imperial';
      imperial.textContent = original;
      var metricSpan = document.createElement('span');
      metricSpan.className = 'ingredient-metric';
      metricSpan.textContent = ' (' + metric + ')';
      li.appendChild(imperial);
      li.appendChild(metricSpan);
    }
    li.dataset.metricAdded = 'true';
  });
}

const recipeEnglishNames = {
  "Osh Plov":"Uzbek Rice Pilaf","Plov":"Azerbaijani Rice Pilaf","Turkmen Palaw":"Turkmen Rice Pilaf",
  "Lagman":"Uzbek Noodle Soup","Uzbek Manti":"Uzbek Steamed Dumplings","Manti":"Steamed Meat Dumplings","Samsa":"Uzbek Baked Meat Pastries","Shurpa":"Uzbek Meat and Vegetable Soup",
  "Dimlama":"Uzbek Layered Meat and Vegetable Stew","Norin":"Uzbek Noodles with Meat","Mastava":"Uzbek Rice Soup","Chuchvara":"Uzbek Meat Dumplings",
  "Khinkali":"Georgian Soup Dumplings","Khachapuri":"Georgian Cheese Bread","Khachapuri Adjaruli":"Adjarian Cheese Bread with Egg","Chakhokhbili":"Georgian Chicken Stew",
  "Satsivi":"Georgian Walnut Sauce with Poultry","Shkmeruli":"Georgian Garlic Chicken","Mtsvadi":"Georgian Grilled Meat Skewers","Lobio":"Georgian Bean Stew",
  "Chanakhi":"Georgian Lamb and Vegetable Stew","Kharcho":"Georgian Beef and Walnut Soup","Ojakhuri":"Georgian Meat and Potatoes",
  "Khorovats":"Armenian Grilled Meat","Harissa":"Armenian Wheat and Chicken Porridge","Dolma":"Stuffed Grape Leaves and Vegetables","Khash":"Armenian Slow-Cooked Beef Soup",
  "Ghapama":"Armenian Stuffed Pumpkin","Tjvjik":"Armenian Liver and Onion Dish","Lahmajoun":"Armenian Flatbread with Spiced Meat",
  "Dushbara":"Azerbaijani Tiny Meat Dumpling Soup","Qutab":"Azerbaijani Stuffed Flatbread","Piti":"Azerbaijani Lamb and Chickpea Stew","Kufta Bozbash":"Azerbaijani Meatball and Chickpea Soup",
  "Govurma":"Azerbaijani Braised Meat","Dovga":"Azerbaijani Yogurt and Herb Soup","Azerbaijani Dolma":"Azerbaijani Stuffed Grape Leaves",
  "Dograma":"Turkmen Bread and Meat Soup","Dograma Bread":"Turkmen Flatbread for Dograma",
  "Dashi":"Japanese Soup Stock","Kombu Dashi":"Kelp Soup Stock","Shiitake Dashi":"Shiitake Mushroom Soup Stock",
  "Tonkotsu Broth":"Pork Bone Broth","Pho Broth":"Vietnamese Noodle Soup Broth","Tom Yum Broth":"Thai Hot and Sour Soup Broth","Tom Kha Broth":"Thai Coconut Soup Broth",
  "Mexican Caldo de Pollo":"Mexican Chicken Soup","Mexican Caldo de Res":"Mexican Beef Soup","Consommé":"Clear Broth","Court-Bouillon":"Quick Aromatic Broth","Italian Brodo":"Italian Broth",
  "Tres Leches Cake":"Three-Milk Cake","Flan Napolitano":"Neapolitan Flan","Pastel de Elote":"Sweet Corn Cake","Arroz con Leche":"Rice Pudding","Buñuelos":"Fried Sweet Fritters",
  "Capirotada":"Mexican Bread Pudding","Conchas":"Mexican Sweet Shell Breads","Pan de Muerto":"Bread of the Dead","Carlota de Limón":"Mexican Lime Icebox Cake","Pastel de Cajeta":"Goat-Milk Caramel Cake",
  "Empanadas de Cajeta":"Goat-Milk Caramel Turnovers","Cocadas":"Coconut Sweets","Alegrías":"Amaranth Seed Sweets","Mazapán de Cacahuate":"Peanut Marzipan","Camotes Poblanos":"Puebla-Style Sweet Potato Candy",
  "Dulce de Leche":"Milk Caramel","Cajeta":"Goat-Milk Caramel","Paletas Mexicanas":"Mexican Ice Pops","Nieves Mexicanas":"Mexican Sorbet","Fresas con Crema":"Strawberries with Cream",
  "Plátanos Fritos con Crema":"Fried Plantains with Cream","Gorditas de Azúcar":"Sweet Sugar Griddle Cakes","Polvorones Mexicanos":"Mexican Shortbread Cookies","Marranitos":"Mexican Gingerbread Pig Cookies",
  "Orejas":"Palmier Pastries","Gelatina de Mosaico":"Mosaic Gelatin",
  "Spaghetti Carbonara":"Spaghetti with Egg, Pecorino and Guanciale","Pasta Cacio e Pepe":"Pasta with Cheese and Pepper","Rigatoni Amatriciana":"Rigatoni with Tomato and Guanciale",
  "Perciatelli alla Gricia":"Perciatelli with Guanciale and Pecorino","Pasta e Ceci":"Pasta and Chickpeas","Penne all’Arrabbiata":"Penne with Spicy Tomato Sauce","Bucatini Amatriciana":"Bucatini with Tomato and Guanciale",
  "Osso Buco with Red Wine":"Braised Veal Shanks with Red Wine","Pasta con i Tenerumi":"Pasta with Sicilian Squash Greens","Pasta con le Melanzane e Ricotta Salata":"Pasta with Eggplant and Ricotta Salata","Pasta alla Norma":"Sicilian Pasta with Eggplant","Pork Chop Milanese":"Milan-Style Breaded Pork Chop","Gnocchi alla Sorrentina":"Sorrento-Style Gnocchi",
  "Ricotta and Parmesan Gnudi":"Ricotta and Parmesan Dumplings","Pasta ’Ncasciata":"Sicilian Baked Pasta","Pasta Aglio e Olio":"Pasta with Garlic and Olive Oil","Stracotto di Fassona Piemontese":"Piedmontese Slow-Braised Beef",
  "Boeuf Bourguignon":"Burgundy-Style Braised Beef","Bagna Càuda":"Warm Garlic-Anchovy Dip","Crème Brûlée":"Burnt Cream Custard","Moules Marinières":"Sailor-Style Mussels","Rösti":"Swiss Crispy Potato Cake",
  "Asado Argentino":"Argentine Barbecue","Bife de Chorizo con Chimichurri":"Sirloin Steak with Chimichurri","Milanesa Napolitana":"Neapolitan-Style Breaded Cutlet","Empanadas Argentinas":"Argentine Savory Turnovers",
  "Locro":"Argentine Corn and Bean Stew","Matambre Arrollado":"Rolled Stuffed Flank Steak","Pastel de Papa":"Argentine Cottage Pie","Carbonada Criolla":"Argentine Beef and Vegetable Stew","Humita en Chala":"Corn Pudding in Corn Husks",
  "Pollo al Disco":"Disc-Cooked Chicken","Provoleta":"Grilled Provolone Cheese","Ensalada Rusa":"Russian Potato Salad","Ensalada Criolla":"Creole Salad","Papas Fritas":"French Fries",
  "Papas a la Provenzal":"Potatoes with Garlic and Parsley","Puré de Papas":"Mashed Potatoes","Zapallitos Rellenos":"Stuffed Zucchini","Berenjenas en Escabeche":"Pickled Eggplant","Choclo a la Parrilla":"Grilled Corn",
  "Papas al Plomo":"Ember-Baked Potatoes","Chocotorta":"Chocolate Cookie Cake","Alfajores":"Dulce de Leche Sandwich Cookies","Flan con Dulce de Leche":"Flan with Milk Caramel","Panqueques con Dulce de Leche":"Crepes with Milk Caramel",
  "Chivito":"Uruguayan Steak Sandwich","Asado Uruguayo":"Uruguayan Barbecue","Chivito al Plato":"Uruguayan Steak Platter","Pamplona de Carne":"Stuffed Rolled Beef","Puchero Uruguayo":"Uruguayan Meat and Vegetable Stew",
  "Empanadas Uruguayas":"Uruguayan Savory Turnovers","Matambre Relleno":"Stuffed Flank Steak","Ñoquis con Tuco":"Gnocchi with Tomato-Meat Sauce","Revuelto Gramajo":"Potato, Egg and Ham Scramble","Capeletis a la Caruso":"Cappelletti with Caruso Sauce",
  "Arroz con Pollo":"Chicken with Rice","Pollo a la Parrilla":"Grilled Chicken",
  "Béchamel":"White Sauce","Velouté":"Velvety Stock Sauce","Espagnole":"Brown Sauce","Sauce Tomate":"Tomato Sauce","Hollandaise":"Dutch-Style Butter and Egg Sauce","Mornay":"Cheese Béchamel Sauce",
  "Soubise":"Onion Cream Sauce","Nantua":"Crayfish Cream Sauce","Suprême":"Creamy Chicken Velouté","Allemande":"German-Style Velouté","Normande":"Normandy-Style Cream Sauce","Bercy":"White Wine Shallot Sauce",
  "Poulette":"Mushroom-Parsley Velouté","Béarnaise":"Tarragon Butter Sauce","Choron":"Tomato Béarnaise Sauce","Foyot":"Meat-Glace Béarnaise Sauce","Mousseline":"Whipped Hollandaise","Maltaise":"Orange Hollandaise",
  "Noisette":"Brown Butter Sauce","Provençale":"Provence-Style Tomato Sauce",
  "Salsa Roja":"Red Sauce","Salsa Verde":"Green Sauce","Pico de Gallo":"Fresh Tomato Salsa","Salsa Ranchera":"Ranch-Style Salsa","Salsa Taquera":"Taco-Shop Salsa","Salsa de Chile de Árbol":"Chile de Árbol Salsa",
  "Salsa Macha":"Oil-Based Chile Salsa","Mole Poblano":"Puebla-Style Mole Sauce","Mole Negro":"Black Mole Sauce","Salsa de Guajillo":"Guajillo Chile Salsa","Salsa de Chipotle":"Chipotle Salsa","Salsa de Tomatillo":"Tomatillo Salsa",
  "Salsa Borracha":"Drunken Salsa","Salsa de Aguacate":"Avocado Salsa","Salsa Habanero":"Habanero Salsa","Salsa Morita":"Morita Chile Salsa","Salsa de Cacahuate":"Peanut Salsa","Salsa de Molcajete":"Stone-Mortar Salsa","Salsa Xni-Pec":"Yucatecan Habanero Salsa",
  "Lomo Saltado":"Peruvian Stir-Fried Beef","Ají de Gallina":"Peruvian Creamy Chile Chicken","Ceviche Peruano":"Peruvian Ceviche","Pollo a la Brasa":"Peruvian Rotisserie Chicken","Arroz con Mariscos":"Rice with Seafood",
  "Seco de Res":"Peruvian Cilantro Beef Stew","Tacu Tacu":"Peruvian Rice and Bean Cake","Causa Rellena":"Stuffed Peruvian Potato Terrine","Anticuchos de Corazón":"Beef Heart Skewers","Papas a la Huancaína":"Potatoes with Huancaína Cheese Sauce",
  "Causa Limeña":"Lima-Style Potato Terrine","Yuca Frita":"Fried Cassava","Arroz Peruano":"Peruvian Rice","Solterito Arequipeño":"Arequipa-Style Bean and Cheese Salad","Choclo con Queso":"Corn with Cheese","Papa Rellena":"Stuffed Potato",
  "Tamal Peruano":"Peruvian Tamale","Camote Frito":"Fried Sweet Potato",
  "Tacos al Pastor":"Shepherd-Style Tacos","Mole Poblano con Pollo":"Chicken with Puebla-Style Mole","Cochinita Pibil":"Yucatan-Style Achiote Pork","Carnitas":"Slow-Cooked Pork","Barbacoa":"Slow-Cooked Barbecue Meat",
  "Chile Relleno":"Stuffed Chile","Enchiladas Rojas":"Red Enchiladas","Enchiladas Verdes":"Green Enchiladas","Pozole Rojo":"Red Hominy Stew","Chiles en Nogada":"Stuffed Chiles with Walnut Sauce","Carne Asada":"Grilled Beef",
  "Pescado a la Veracruzana":"Veracruz-Style Fish","Tacos de Pescado":"Fish Tacos","Pollo en Mole Negro":"Chicken in Black Mole","Costillas en Chile Colorado":"Ribs in Red Chile Sauce","Enfrijoladas":"Bean-Sauce Enchiladas","Tinga de Pollo":"Shredded Chicken Tinga",
  "Cabrito al Pastor":"Shepherd-Style Roasted Kid Goat",
  "Arroz Rojo":"Red Rice","Arroz Verde":"Green Rice","Frijoles Refritos":"Refried Beans","Frijoles Charros":"Cowboy Beans","Frijoles de la Olla":"Pot Beans","Elote":"Mexican Street Corn","Esquites":"Mexican Corn Cup",
  "Nopales Asados":"Grilled Cactus Paddles","Ensalada de Nopales":"Cactus Salad","Rajas con Crema":"Roasted Chile Strips with Cream","Calabacitas a la Mexicana":"Mexican-Style Zucchini","Papas con Chorizo":"Potatoes with Chorizo",
  "Papas a la Mexicana":"Mexican-Style Potatoes","Chiles Toreados":"Blistered Chiles","Cebollitas Asadas":"Grilled Green Onions","Choriqueso":"Chorizo Cheese Dip","Queso Fundido":"Melted Cheese","Chiles Rellenos de Queso":"Cheese-Stuffed Chiles",
  "Ensalada de Jícama":"Jicama Salad","Ensalada de Aguacate":"Avocado Salad","Coleslaw Estilo Baja":"Baja-Style Coleslaw","Chayotes con Crema":"Chayote with Cream","Ejotes a la Mexicana":"Mexican-Style Green Beans",
  "Calabaza con Elote":"Squash with Corn","Plátanos Fritos":"Fried Plantains","Yuca con Chile y Limón":"Cassava with Chile and Lime","Tortillas de Maíz Hechas a Mano":"Handmade Corn Tortillas",
  "Huevos Rancheros":"Ranch-Style Eggs","Chilaquiles Rojos":"Red Chilaquiles","Chilaquiles Verdes":"Green Chilaquiles","Huevos a la Mexicana":"Mexican-Style Eggs","Huevos Divorciados":"Divorced Eggs","Huevos Motuleños":"Motul-Style Eggs",
  "Huevos con Chorizo":"Eggs with Chorizo","Huevos con Machaca":"Eggs with Dried Shredded Beef","Molletes":"Mexican Bean and Cheese Toasts","Entomatadas":"Tomato-Sauce Tortillas","Migas Mexicanas":"Mexican-Style Migas","Gorditas de Desayuno":"Breakfast Gorditas",
  "Tamales con Atole":"Tamales with Atole","Quesadillas de Flor de Calabaza":"Squash Blossom Quesadillas","Tacos de Barbacoa":"Barbacoa Tacos","Tacos de Canasta":"Basket Tacos","Birria con Consomé":"Birria with Consommé",
  "Menudo":"Mexican Tripe Soup","Papas con Chorizo y Huevo":"Potatoes with Chorizo and Egg","Nopales con Huevo":"Cactus with Egg","Pan Dulce con Café de Olla":"Sweet Bread with Spiced Pot Coffee"
};

function toRecipeTitleCase(value) {
  const smallWords = new Set([
    'a','an','the','and','but','or','nor','for','so','yet',
    'of','in','to','with','on','at','by','from','de','del','con','al','en','y'
  ]);
  const words = String(value || '').trim().split(/\s+/);
  return words.map(function(word, index) {
    // Preserve acronyms, all-caps culinary terms, numbers, and mixed-case names.
    if (!word) return word;
    const core = word.replace(/^[^A-Za-zÀ-ÖØ-öø-ÿ]+|[^A-Za-zÀ-ÖØ-öø-ÿ]+$/g, '');
    if (!core) return word;
    if (core.length > 1 && core === core.toUpperCase()) return word;
    if (/[A-ZÀ-ÖØ-Þ].*[A-ZÀ-ÖØ-Þ]/.test(core.slice(1))) return word;

    const lower = core.toLowerCase();
    const shouldLower = index > 0 && index < words.length - 1 && smallWords.has(lower);
    const replacement = shouldLower
      ? lower
      : lower.charAt(0).toUpperCase() + lower.slice(1);
    return word.replace(core, replacement);
  }).join(' ');
}

function addEnglishRecipeNames() {
  function fallbackEnglishName(title) {
    const originalTitle=(title || '').trim();
    if (!originalTitle) return '';
    const displayTitle=toRecipeTitleCase(originalTitle);
    const normalizedTitle=normalizeSearchText(originalTitle);
    const normalizedKey=Object.keys(recipeEnglishNames).find(function(key){
      return normalizeSearchText(key) === normalizedTitle;
    });
    return recipeEnglishNames[originalTitle] ||
      recipeEnglishNames[displayTitle] ||
      (normalizedKey ? recipeEnglishNames[normalizedKey] : '');
  }

  function translated(title, explicitEnglish) {
    title = (title || '').trim();
    if (!title) return title;
    const displayTitle = toRecipeTitleCase(title);

    // Preferred source: explicit recipe metadata.
    // Cards: data-title-en="..."
    // Detail pages: <meta name="recipe-title-en" content="...">
    // The legacy dictionary below is migration-only fallback for recipes
    // that have not yet been upgraded to explicit metadata.
    const englishName=(explicitEnglish || '').trim() || fallbackEnglishName(title);
    if (englishName && normalizeSearchText(englishName) !== normalizeSearchText(displayTitle)) {
      return displayTitle + ' (' + toRecipeTitleCase(englishName) + ')';
    }
    title = displayTitle;

    let m = title.match(/^Tacos\s+de\s+(.+)$/i);
    if (m) {
      const tacoTerms = {
        "Adobada":"Adobo-Marinated Pork","Bistec":"Steak","Alambre":"Grilled Meat and Peppers","Pastor Negro":"Black-Marinated Shepherd-Style Pork","Mixiote":"Pit-Style Marinated Meat","Machaca":"Dried Shredded Beef","Discada":"Disc-Griddled Mixed Meat","Lechón":"Roast Suckling Pig","Buche":"Pork Stomach","Cachete":"Beef Cheek","Labio":"Beef Lip","Sesos":"Brains","Chicharrón":"Pork Cracklings","Chicharrón Prensado":"Pressed Pork Cracklings","Longaniza":"Mexican Sausage","Pollo Asado":"Grilled Chicken","Tinga":"Shredded Tinga","Mole":"Mole Sauce","Chile Relleno":"Stuffed Chile","Papa":"Potato","Frijoles con Queso":"Beans and Cheese","Flor de Calabaza":"Squash Blossom","Huitlacoche":"Corn Truffle","Hongos":"Mushrooms","Pulpo":"Octopus","Marlín Ahumado":"Smoked Marlin","Pescado Zarandeado":"Grilled Zarandeado Fish","Jaiba":"Crab","Langosta":"Lobster","Chapulines":"Grasshoppers","Pescado Capeado":"Battered Fish","Pescado a la Plancha":"Griddled Fish","Pescado al Pastor":"Shepherd-Style Fish","Pescado al Ajillo":"Garlic Fish","Pescado Ensenada":"Ensenada-Style Fish","Pescado Tikin Xic":"Yucatan Achiote Fish","Pescado Adobado":"Adobo-Marinated Fish","Pescado Ahumado":"Smoked Fish","Pescado a la Veracruzana":"Veracruz-Style Fish","Camarón Capeado":"Battered Shrimp","Camarón al Ajillo":"Garlic Shrimp","Camarón a la Diabla":"Spicy Devil-Style Shrimp","Camarón al Pastor":"Shepherd-Style Shrimp","Camarón con Queso":"Shrimp with Cheese","Camarón Empanizado":"Breaded Shrimp","Camarón a la Plancha":"Griddled Shrimp","Camarón Gobernador":"Governor-Style Shrimp","Pulpo al Ajillo":"Garlic Octopus","Pulpo a la Parrilla":"Grilled Octopus","Pulpo Enamorado":"Creamy Marinated Octopus","Calamar":"Squid","Calamar Frito":"Fried Squid","Atún Sellado":"Seared Tuna","Atún con Aguacate":"Tuna with Avocado","Cazón":"Dogfish","Mantaraya":"Stingray","Ostiones":"Oysters","Callo de Hacha":"Scallops","Mariscos Mixtos":"Mixed Seafood"
      };
      const tacoKey = Object.keys(tacoTerms).find(function(key){
        return normalizeSearchText(key) === normalizeSearchText(m[1]);
      });
      if (tacoKey) return title + ' (' + tacoTerms[tacoKey] + ' Tacos)';
    }
    return title;
  }

  function renderTranslatedTitle(el) {
    if (!el) return;

    // Spreadsheet-managed titles are authoritative. Do not replace Column Q
    // with legacy translations or erase already-formatted local/English spans.
    if (el.querySelector('.recipe-title-original')) return;
    if (el.classList.contains('recipe-name-local')) return;
    if (el.closest('.recipe-detail') &&
        el.closest('.recipe-detail').querySelector('.recipe-name-local')) return;

    const card=el.closest('.recipe-card');
    const detail=el.closest('.recipe-detail');
    let explicitEnglish='';

    if (card) {
      explicitEnglish=(card.dataset.titleEn || '').trim();
    } else if (detail) {
      explicitEnglish=(document.querySelector('meta[name="recipe-title-en"]')?.content || '').trim();
    }

    const full = translated(el.textContent, explicitEnglish);
    const match = full.match(/^(.*?)\s*\(([^()]*)\)\s*$/);
    if (!match) {
      el.textContent = full;
      return;
    }
    el.textContent = '';
    const original = document.createElement('span');
    original.className = 'recipe-title-original';
    original.textContent = match[1].trim();
    const english = document.createElement('span');
    english.className = 'recipe-title-english';
    english.textContent = match[2].trim();
    el.appendChild(original);
    el.appendChild(english);
  }

  document.querySelectorAll('.recipe-card h3').forEach(renderTranslatedTitle);
  renderTranslatedTitle(document.querySelector('.recipe-detail h1, .recipe-detail h2'));
}

removeRedundantRecipeCardMetadata();

if (!window.__ktRegionalMetadataObserver) {
  window.__ktRegionalMetadataObserver = new MutationObserver(function(mutations) {
    const hasRecipeContent = mutations.some(function(m) {
      return [...m.addedNodes].some(function(node) {
        return node.nodeType===1 && (
          node.matches?.('.recipe-card,.recipe-detail') ||
          node.querySelector?.('.recipe-card,.recipe-detail')
        );
      });
    });
    if (hasRecipeContent) {
      simplifyNamedRegionalLabels(document);
      standardizeRegionalMetadata(document);
    }
  });
  window.__ktRegionalMetadataObserver.observe(document.body,{childList:true,subtree:true});
}

const cards = [...document.querySelectorAll('.recipe-card')];
const search = document.getElementById('recipeSearch');
const cuisineFiltersWrap = document.getElementById('cuisineFilters');
const europeanSubcuisineGroup = document.getElementById('europeanSubcuisineGroup');
const europeanSubcuisineFilters = document.getElementById('europeanSubcuisineFilters');
const americanSubcuisineGroup = document.getElementById('americanSubcuisineGroup');
const americanSubcuisineFilters = document.getElementById('americanSubcuisineFilters');
const asianSubcuisineGroup = document.getElementById('asianSubcuisineGroup');
const asianSubcuisineFilters = document.getElementById('asianSubcuisineFilters');
const latinSubcuisineGroup = document.getElementById('latinSubcuisineGroup');
const latinSubcuisineFilters = document.getElementById('latinSubcuisineFilters');
const mexicanSubcategoryGroup = document.getElementById('mexicanSubcategoryGroup');
const mexicanSubcategoryFilters = document.getElementById('mexicanSubcategoryFilters');
const filters = [...document.querySelectorAll('.filter')];
const noResults = document.getElementById('noResults');
const browserWorldRegion=document.getElementById('browserWorldRegion');
const browserCountry=document.getElementById('browserCountry');
const browserRegion=document.getElementById('browserRegion');
const browserClassification=document.getElementById('browserClassification');
const browserDifficulty=document.getElementById('browserDifficulty');
const browserAllergen=document.getElementById('browserAllergen');
const browserCount=document.getElementById('browserResultCount');
const browserClear=document.getElementById('browserClear');
function browserCardValue(card,type){
  if(type==='country')return card.querySelector('.card-country')?.textContent.trim()||'';
  if(type==='region')return card.querySelector('.card-region')?.textContent.trim()||'';
  return card.dataset[type]||'';
}
function populateBrowserOptions(){
  [[browserWorldRegion,'worldRegion'],[browserCountry,'country'],[browserRegion,'region'],[browserClassification,'classification'],[browserDifficulty,'difficulty']].forEach(([select,type])=>{
    if(!select)return;
    const values=[...new Set(cards.map(card=>browserCardValue(card,type)).filter(Boolean))].sort((a,b)=>a.localeCompare(b));
    values.forEach(value=>{const option=document.createElement('option');option.value=value;option.textContent=value;select.appendChild(option);});
  });
}
populateBrowserOptions();
[browserWorldRegion,browserCountry,browserRegion,browserClassification,browserDifficulty,browserAllergen].forEach(select=>select?.addEventListener('change',updateRecipes));
browserClear?.addEventListener('click',()=>{
  if(search)search.value='';
  [browserWorldRegion,browserCountry,browserRegion,browserClassification,browserDifficulty,browserAllergen].forEach(select=>{if(select)select.value='all';});
  activeFilter='all';
  filters.forEach(button=>button.classList.toggle('active',button.dataset.filter==='all'));
  activeCuisine='all';
  updateRecipes();
});

let activeFilter = 'all';
let activeCuisine = 'all';
let activeAmericanSubcuisine = 'all';
let activeEuropeanSubcuisine = 'all';
let activeAsianSubcuisine = 'all';
let activeLatinSubcuisine = 'all';
let activeMexicanSubcategory = 'all';

const MEXICAN_SUBCATEGORIES = [
  ['Breakfast & Brunch', ['huevos','chilaquiles','molletes','migas mexicanas','gorditas de desayuno','tamales con atole','pan dulce','cafe de olla','nopales con huevo','papas con chorizo y huevo']],
  ['Tacos', ['taco','tacos']],
  ['Salsas, Moles & Adobos', ['salsa','mole','adobo','xni pec']],
  ['Soups & Stews', ['pozole','menudo','birria','consome','caldo']],
  ['Main Dishes', ['cochinita','carnitas','barbacoa','chile relleno','enchilada','carne asada','pescado a la veracruzana','tinga','cabrito']],
  ['Seafood', ['pescado','camaron','shrimp','pulpo','calamar','atun','cazon','mantaraya','ostiones','callo de hacha','mariscos','langosta','jaiba']],
  ['Sides, Vegetables & Beans', ['arroz rojo','arroz verde','frijoles','elote','esquites','nopales','rajas','calabacitas','papas','chiles toreados','cebollitas','jicama','chayotes','verdolagas','ejotes','calabaza','platanos','yuca']],
  ['Cheese, Tortillas & Antojitos', ['queso','quesadilla','choriqueso','tortilla','gordita','tamal','enfrijolada','entomatada']],
  ['Desserts & Drinks', ['dessert','dulce','cafe de olla','atole']]
];

const LATIN_SUBCUISINES = [
  ['Mexico', ['mexican','mexico','tomatillo','enchilada','taco','chilaquiles','huevos rancheros','mole']],
  ['Argentina', ['argentine','argentina','criolla','provoleta','milanesa','chimichurri','asado']],
  ['Uruguay', ['uruguayan','uruguay','chivito']],
  ['Peru', ['peruvian','peru','ceviche','lomo saltado','aji']],
  ['Brazil', ['brazilian','brazil','feijoada','moqueca']],
  ['Colombia', ['colombian','colombia','arepa','ajiaco']],
  ['Venezuela', ['venezuelan','venezuela','arepa','pabellon']],
  ['Chile', ['chilean','chile','pastel de choclo']],
  ['Cuba', ['cuban','cuba','ropa vieja']],
  ['Puerto Rico', ['puerto rican','puerto rico','mofongo']],
  ['Dominican Republic', ['dominican','dominican republic','mangu']],
  ['Central America', ['guatemalan','guatemala','salvadoran','el salvador','honduran','honduras','nicaraguan','nicaragua','costa rican','costa rica','panamanian','panama']]
];

const AMERICAN_SUBCUISINES = [
  ['New England', ['new england','maine','new hampshire','vermont','massachusetts','rhode island','connecticut','boston']],
  ['Mid-Atlantic', ['mid atlantic','new york','new jersey','pennsylvania','delaware','maryland','district of columbia','washington dc','virginia','philadelphia','baltimore']],
  ['Cajun / Creole', ['cajun','creole','new orleans','louisiana']],
  ['South', ['southern','southeast','deep south','georgia','alabama','mississippi','tennessee','kentucky','north carolina','south carolina','arkansas','florida','lowcountry','appalachian']],
  ['Midwest', ['midwest','ohio','michigan','indiana','illinois','wisconsin','minnesota','iowa','missouri','chicago','detroit']],
  ['Great Plains', ['great plains','kansas','nebraska','north dakota','south dakota','oklahoma']],
  ['Southwest', ['southwest','arizona','new mexico','texas','sonoran']],
  ['Mountain West', ['rocky mountain','colorado','utah','idaho','montana','wyoming','nevada']],
  ['Pacific Northwest', ['pacific northwest','washington','oregon','seattle','portland']],
  ['California / West Coast', ['california','west coast','san francisco','los angeles','san diego']],
  ['Alaska / Hawaii', ['alaska','hawaii']]
];

const EUROPEAN_SUBCUISINES = [
  ['Italy', ['italian','italy','roman','sicilian','venetian','piedmont','piedmontese','campanian','florentine','milanese','sorrentina','amatriciana','carbonara','cacio e pepe','gricia','arrabbiata','bolognese','cioppino']],
  ['France', ['french','france','bourguignon','béchamel','bechamel','veloute','velouté','espagnole','hollandaise','bearnaise','béarnaise','provençale','provencale']],
  ['United Kingdom', ['british','english','scottish','welsh','sticky toffee','spotted dick','bread pudding']],
  ['Switzerland', ['swiss','switzerland','zurich','zürich','rosti','rösti','fondue']],
  ['Belgium', ['belgian','belgium','moules-frites','frites']],
  ['Spain', ['spanish','spain','catalan','basque']],
  ['Greece', ['greek','greece','saganaki']]
];

const ASIAN_SUBCUISINES = [
  ['Chinese', ['chinese','moo shu','mandarin']],
  ['Japanese', ['japanese','miso']],
  ['Korean', ['korean','gochujang','kimchi']],
  ['Thai', ['thai','pad thai','lemongrass']],
  ['Vietnamese', ['vietnamese','pho','banh','nuoc cham']],
  ['Fusion', ['fusion','asian-inspired','stir-fry']]
];

const CUISINES = [
  ['European', ['italian','italy','roman','sicilian','venetian','piedmont','piedmontese','campanian','florentine','milanese','sorrentina','amatriciana','carbonara','cacio e pepe','gricia','arrabbiata','bolognese','cioppino','french','france','bourguignon','béchamel','bechamel','veloute','velouté','espagnole','hollandaise','bearnaise','béarnaise','provençale','provencale','british','english','scottish','welsh','sticky toffee','spotted dick','swiss','switzerland','zurich','zürich','rosti','rösti','fondue','belgian','belgium','moules-frites','frites','spanish','spain','catalan','basque','greek','greece','saganaki']],
  ['Mediterranean', ['mediterranean']],
  ['Latin American', ['latin','mexican','mexico','argentinian','argentine','argentina','uruguayan','uruguay','peruvian','peru','brazilian','brazil','colombian','colombia','venezuelan','venezuela','chilean','cuban','cuba','puerto rican','puerto rico','dominican','dominican republic','guatemalan','guatemala','salvadoran','el salvador','honduran','honduras','nicaraguan','nicaragua','costa rican','costa rica','panamanian','panama','criolla','tomatillo','enchilada','taco','chilaquiles','huevos rancheros','mole','provoleta','milanesa','chimichurri','asado','chivito','ceviche','lomo saltado','aji','feijoada','moqueca','arepa','ajiaco','pabellon','pastel de choclo','ropa vieja','mofongo','mangu']],
  ['Asian', ['asian','chinese','moo shu','mandarin','japanese','miso','korean','gochujang','thai','vietnamese','fusion','stir-fry']],
  ['American', ['american','san francisco','cajun','creole','new orleans']]
];

function normalizeSearchText(value) {
  return (value || '')
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();
}

function simplifyNamedRegionalLabels(root) {
  const scope=root || document;
  const namedRegions=[
    'Pacific Northwest','New England','Midwest','Southwest','Southeast',
    'Deep South','Gulf Coast','Mid-Atlantic','Rocky Mountain','Great Plains',
    'Appalachian','Lowcountry','Northeast'
  ];
  const regionSet=new Set(namedRegions.map(normalizeSearchText));

  scope.querySelectorAll('.recipe-card, .recipe-detail').forEach(function(container){
    [...container.querySelectorAll('*')].forEach(function(el){
      if(el.children.length) return;
      const raw=(el.textContent||'').trim();
      const m=raw.match(/^(.+?)\s*\(([^)]+)\)$/);
      if(!m) return;
      const region=normalizeSearchText(m[1]);
      if(regionSet.has(region)) el.textContent=m[1].trim();
    });
  });
}

function standardizeRegionalMetadata(root) {
  const scope = root || document;

  // Kitchen Table recipe metadata standard:
  // FOOD TYPE / COUNTRY · CITY, REGION
  // Never invent a city or region when the recipe metadata does not provide one.

  const countryRules = [
    {country:'United States', terms:['american','united states','usa','u.s.','cajun','creole']},
    {country:'Mexico', terms:['mexican','mexico']},
    {country:'Argentina', terms:['argentine','argentinian','argentina']},
    {country:'Uruguay', terms:['uruguayan','uruguay']},
    {country:'Peru', terms:['peruvian','peru']},
    {country:'Brazil', terms:['brazilian','brazil']},
    {country:'Colombia', terms:['colombian','colombia']},
    {country:'Venezuela', terms:['venezuelan','venezuela']},
    {country:'Chile', terms:['chilean','chile']},
    {country:'Cuba', terms:['cuban','cuba']},
    {country:'Puerto Rico', terms:['puerto rican','puerto rico']},
    {country:'Dominican Republic', terms:['dominican','dominican republic']},
    {country:'Guatemala', terms:['guatemalan','guatemala']},
    {country:'El Salvador', terms:['salvadoran','el salvador']},
    {country:'Honduras', terms:['honduran','honduras']},
    {country:'Nicaragua', terms:['nicaraguan','nicaragua']},
    {country:'Costa Rica', terms:['costa rican','costa rica']},
    {country:'Panama', terms:['panamanian','panama']},
    {country:'Italy', terms:['italian','italy','roman','sicilian','venetian','piedmontese','florentine','milanese','neapolitan']},
    {country:'France', terms:['french','france','provençal','provencal','burgundy']},
    {country:'United Kingdom', terms:['british','english','scottish','welsh','united kingdom','england','scotland','wales']},
    {country:'Ireland', terms:['irish','ireland']},
    {country:'Switzerland', terms:['swiss','switzerland']},
    {country:'Belgium', terms:['belgian','belgium']},
    {country:'Spain', terms:['spanish','spain','catalan','basque']},
    {country:'Greece', terms:['greek','greece']},
    {country:'Portugal', terms:['portuguese','portugal']},
    {country:'Germany', terms:['german','germany']},
    {country:'Austria', terms:['austrian','austria']},
    {country:'Poland', terms:['polish','poland']},
    {country:'Hungary', terms:['hungarian','hungary']},
    {country:'Czechia', terms:['czech','czechia','czech republic']},
    {country:'Slovakia', terms:['slovak','slovakia']},
    {country:'Romania', terms:['romanian','romania']},
    {country:'Bulgaria', terms:['bulgarian','bulgaria']},
    {country:'Croatia', terms:['croatian','croatia']},
    {country:'Serbia', terms:['serbian','serbia']},
    {country:'Bosnia and Herzegovina', terms:['bosnian','bosnia','bosnia and herzegovina']},
    {country:'Slovenia', terms:['slovenian','slovenia']},
    {country:'Albania', terms:['albanian','albania']},
    {country:'Georgia', terms:['georgian','georgia']},
    {country:'Armenia', terms:['armenian','armenia']},
    {country:'Azerbaijan', terms:['azerbaijani','azerbaijan']},
    {country:'Uzbekistan', terms:['uzbek','uzbekistan']},
    {country:'Turkmenistan', terms:['turkmen','turkmenistan']},
    {country:'Kazakhstan', terms:['kazakh','kazakhstan']},
    {country:'Kyrgyzstan', terms:['kyrgyz','kyrgyzstan']},
    {country:'Tajikistan', terms:['tajik','tajikistan']},
    {country:'Türkiye', terms:['turkish','turkey','türkiye']},
    {country:'China', terms:['chinese','china']},
    {country:'Japan', terms:['japanese','japan']},
    {country:'South Korea', terms:['korean','south korea','korea']},
    {country:'Thailand', terms:['thai','thailand']},
    {country:'Vietnam', terms:['vietnamese','vietnam']},
    {country:'India', terms:['indian','india']},
    {country:'Indonesia', terms:['indonesian','indonesia']},
    {country:'Philippines', terms:['filipino','philippines']},
    {country:'Malaysia', terms:['malaysian','malaysia']},
    {country:'Singapore', terms:['singaporean','singapore']},
    {country:'Lebanon', terms:['lebanese','lebanon']},
    {country:'Morocco', terms:['moroccan','morocco']},
    {country:'Egypt', terms:['egyptian','egypt']},
    {country:'Tunisia', terms:['tunisian','tunisia']},
    {country:'Ethiopia', terms:['ethiopian','ethiopia']},
    {country:'Nigeria', terms:['nigerian','nigeria']},
    {country:'South Africa', terms:['south african','south africa']},
    {country:'Australia', terms:['australian','australia']},
    {country:'New Zealand', terms:['new zealand']}
  ];

  const cityRegionRules = [
    {terms:['new orleans'], location:'New Orleans, Louisiana'},
    {terms:['san francisco'], location:'San Francisco, California'}
  ];

  const foodTypes = {
    'meat':'Meat','beef':'Beef','pork':'Pork','lamb':'Lamb','veal':'Veal',
    'chicken':'Chicken','poultry':'Poultry','seafood':'Seafood','fish':'Fish',
    'pasta':'Pasta','rice':'Rice','bread':'Bread','breakfast':'Breakfast',
    'vegetable':'Vegetable','vegetables':'Vegetables','side':'Side','salad':'Salad',
    'soup':'Soup','soups':'Soup','dessert':'Dessert','sauce':'Sauce',
    'broth':'Broth','stock':'Broth & Stock','cheese':'Cheese',
    'sandwich':'Sandwich','taco':'Tacos','tacos':'Tacos'
  };

  function norm(value) {
    return normalizeSearchText(value || '');
  }

  function contains(text, term) {
    return (' ' + norm(text) + ' ').includes(' ' + norm(term) + ' ');
  }

  function inferCountry(text) {
    for (const rule of countryRules) {
      if (rule.terms.some(function(term){ return contains(text, term); })) return rule.country;
    }
    return '';
  }

  function escapeRegExp(value) {
    return String(value).replace(/[.*+?^{}()|[\]\\$]/g, '\\$&');
  }

  function stripCountry(text, country) {
    let out=String(text || '').trim();
    const rule=countryRules.find(function(r){ return r.country === country; });
    const aliases=[country].concat(rule ? rule.terms : []).sort(function(a,b){ return b.length-a.length; });
    aliases.forEach(function(alias){
      out=out.replace(new RegExp('(?:\\s*,\\s*|\\s+)'+escapeRegExp(alias)+'\\s*$','i'),'').trim();
    });
    return out.replace(/^[,·/\s]+|[,·/\s]+$/g,'').trim();
  }

  function inferSpecificCardType(container) {
    const structured=[
      container.dataset && container.dataset.category || '',
      container.dataset && container.dataset.search || '',
      [...container.querySelectorAll('.recipe-meta span')].map(function(el){return el.textContent || '';}).join(' '),
      container.querySelector('h3,h1,h2')?.textContent || ''
    ].join(' ');
    const text=norm(structured);

    const proteinRules=[
      ['Chicken',['chicken','pollo']],
      ['Beef',['beef','steak','bistec','carne asada','short rib','brisket','veal beef']],
      ['Pork',['pork','porc','pig','ham','bacon','guanciale','pancetta','chorizo','sausage','carnitas','adobada']],
      ['Lamb',['lamb','mutton']],
      ['Veal',['veal','vitello','osso buco']],
      ['Duck',['duck']],
      ['Turkey',['turkey']],
      ['Goat',['goat','cabrito']],
      ['Fish',['fish','pescado','cod','salmon','tuna','atun','trout','halibut','snapper','redfish','mahi','swordfish']],
      ['Shrimp',['shrimp','prawn','camarón','camaron']],
      ['Mussels',['mussel','mussels','moules']],
      ['Clams',['clam','clams']],
      ['Crab',['crab','jaiba']],
      ['Lobster',['lobster','langosta']],
      ['Scallops',['scallop','scallops','callo de hacha']],
      ['Octopus',['octopus','pulpo']],
      ['Squid',['squid','calamar']]
    ];

    for (const rule of proteinRules) {
      if (rule[1].some(function(term){ return contains(text, term); })) return rule[0];
    }

    return inferFoodType(container);
  }

  function inferFoodType(container) {
    const categories=(container.dataset && container.dataset.category || '')
      .split(/\s+/)
      .filter(Boolean);

    // Controlled category metadata is the preferred source.
    for (const category of categories) {
      const mapped=foodTypes[norm(category)];
      if (mapped) return mapped;
    }

    // Recognized existing metadata may be used, but unknown cuisine labels
    // such as "Italian (Sicilian)" must never become the food type.
    const meta=container.querySelector('.recipe-meta');
    if (meta) {
      for (const span of [...meta.querySelectorAll('span')]) {
        const raw=(span.textContent || '').split(/[·/|]/)[0].trim();
        const mapped=foodTypes[norm(raw)];
        if (mapped) return mapped;
      }
    }

    // Title is safe for a small set of explicit food-type names.
    const title=(container.querySelector('h3,h1,h2')?.textContent || '').trim();
    const titleNorm=norm(title);
    const titleRules=[
      ['Pasta', ['pasta','spaghetti','rigatoni','linguine','fettuccine','bucatini','penne','gnocchi','lasagna','lasagne','ravioli','tagliatelle','orecchiette']],
      ['Tacos', ['taco','tacos']],
      ['Soup', ['soup','caldo','broth','bisque','chowder','pozole','menudo']],
      ['Salad', ['salad','ensalada']],
      ['Seafood', ['fish','seafood','shrimp','mussels','clam','clams','oyster','oysters','lobster','crab','ceviche']],
      ['Rice', ['rice','risotto','paella','plov','pilaf']],
      ['Dessert', ['cake','pie','flan','pudding','tiramisu','mousse','brownie','cookie','cookies','ice cream']]
    ];
    for (const rule of titleRules) {
      if (rule[1].some(function(term){ return contains(titleNorm, term); })) return rule[0];
    }

    return 'Food';
  }

  function inferLocation(container, country, allText) {
    const leaves=[...container.querySelectorAll('*')].filter(function(el){
      return !el.children.length && (el.textContent || '').trim();
    });

    let best='';
    if (country) {
      leaves.forEach(function(el){
        const raw=(el.textContent || '').trim();
        if (!contains(raw, country)) return;
        const cleaned=stripCountry(raw, country);
        if (cleaned && cleaned.length > best.length && !/\d/.test(cleaned)) best=cleaned;
      });
    }
    if (best) return best;

    for (const rule of cityRegionRules) {
      if (rule.terms.some(function(term){ return contains(allText, term); })) return rule.location;
    }

    return '';
  }

  function format(foodType, country, location) {
    const type=(foodType || 'Food').toUpperCase();
    const c=(country || '').toUpperCase();
    const loc=(location || '').toUpperCase();
    if (c && loc) return type + ' / ' + c + ' · ' + loc;
    if (c) return type + ' / ' + c;
    if (loc) return type + ' · ' + loc;
    return type;
  }

  function normalizeContainer(container) {
    const isCard=container.matches('.recipe-card');

    // IMPORTANT: card metadata must never use free-form description/body text.
    // Only structured attributes, existing metadata spans, categories and title
    // may participate in display classification.
    const metaText=isCard
      ? [...container.querySelectorAll('.recipe-meta span')].map(function(el){return el.textContent || '';}).join(' ')
      : (container.textContent || '');

    const structuredText=[
      metaText,
      container.dataset && container.dataset.search || '',
      container.dataset && container.dataset.category || '',
      container.dataset && container.dataset.country || '',
      container.querySelector('h3,h1,h2')?.textContent || ''
    ].join(' ');

    const foodType=isCard ? inferSpecificCardType(container) : inferFoodType(container);
    const country=(container.dataset && container.dataset.country || '').trim() || inferCountry(structuredText);

    if (isCard) {
      const meta=container.querySelector('.recipe-meta');
      if (!meta) return;

      // Enforce exactly two display fields:
      // FOOD TYPE (left) | COUNTRY (right)
      meta.innerHTML='';

      const left=document.createElement('span');
      left.className='recipe-food-type';
      left.textContent=(foodType || 'Food').toUpperCase();

      const right=document.createElement('span');
      right.className='recipe-country';
      right.textContent=(country || '').toUpperCase();
      right.hidden=!country;

      meta.append(left,right);
      return;
    }

    // Detail pages may still use richer geographic presentation.
    const allText=structuredText;
    const location=inferLocation(container, country, allText);
    const label=format(foodType, country, location);

    if (container.matches('.recipe-detail')) {
      const eyebrow=container.querySelector('.eyebrow');
      if (eyebrow) eyebrow.textContent=label;

      const stats=container.querySelector('.stats');
      if (stats) {
        [...stats.querySelectorAll('span')].forEach(function(span){
          const raw=(span.textContent || '').trim();
          if (!/\d/.test(raw) && (inferCountry(raw) || (location && norm(stripCountry(raw,country))===norm(location)))) {
            span.remove();
          }
        });
      }
    }
  }

  scope.querySelectorAll('.recipe-card').forEach(normalizeContainer);
  const detail=scope.matches && scope.matches('.recipe-detail')
    ? scope
    : scope.querySelector && scope.querySelector('.recipe-detail');
  if (detail) normalizeContainer(detail);
}

function removeRedundantRecipeCardMetadata() {
  simplifyNamedRegionalLabels(document);
  standardizeRegionalMetadata(document);
}

function cardHaystack(card) {
  return normalizeSearchText(`${card.dataset.search || ''} ${card.textContent || ''}`);
}

function containsCuisineTerm(text, term) {
  const normalized = normalizeSearchText(term);
  return (' ' + text + ' ').includes(' ' + normalized + ' ');
}

function detectCuisine(card) {
  // Prefer the recipe's explicit metadata over descriptive ingredient/method text.
  // This prevents terms such as "bread pudding", "chile", "French bread",
  // or "Italian sausage" from moving a recipe into the wrong cuisine.
  const meta = normalizeSearchText(
    (card.querySelector('.recipe-meta')?.textContent || '') + ' ' +
    (card.dataset.category || '')
  );

  const explicitGroups = [
    ['Latin American', ['latin','mexican','mexico','argentinian','argentine','argentina','uruguayan','uruguay','peruvian','peru','brazilian','brazil','colombian','colombia','venezuelan','venezuela','chilean','cuban','puerto rican','dominican','guatemalan','salvadoran','honduran','nicaraguan','costa rican','panamanian']],
    ['American', ['american','cajun','creole','new orleans']],
    ['Asian', ['asian','chinese','japanese','korean','thai','vietnamese']],
    ['Mediterranean', ['mediterranean']],
    ['European', ['italian','roman','sicilian','venetian','piedmontese','florentine','milanese','french','british','english','scottish','welsh','swiss','belgian','spanish','catalan','basque','greek']]
  ];

  for (const [label, terms] of explicitGroups) {
    if (terms.some(term => containsCuisineTerm(meta, term))) return label;
  }

  const text = cardHaystack(card);
  // Fallback only when the card has no explicit cuisine metadata.
  // Match complete normalized terms rather than arbitrary substrings.
  for (const [label, terms] of CUISINES) {
    if (terms.some(term => containsCuisineTerm(text, term))) return label;
  }
  return '';
}

function detectAmericanSubcuisine(card) {
  const text = cardHaystack(card);
  for (const [label, terms] of AMERICAN_SUBCUISINES) {
    if (terms.some(term => containsCuisineTerm(text, term))) return label;
  }
  return detectCuisine(card) === 'American' ? 'General American' : '';
}

function detectEuropeanSubcuisine(card) {
  const text = cardHaystack(card);
  for (const [label, terms] of EUROPEAN_SUBCUISINES) {
    if (terms.some(term => containsCuisineTerm(text, term))) return label;
  }
  return '';
}

function detectAsianSubcuisine(card) {
  const text = cardHaystack(card);
  for (const [label, terms] of ASIAN_SUBCUISINES) {
    if (terms.some(term => containsCuisineTerm(text, term))) return label;
  }
  return '';
}

function detectLatinSubcuisine(card) {
  const text = cardHaystack(card);
  for (const [label, terms] of LATIN_SUBCUISINES) {
    if (terms.some(term => containsCuisineTerm(text, term))) return label;
  }
  return '';
}

function detectMexicanSubcategory(card) {
  const text = cardHaystack(card);
  for (const [label, terms] of MEXICAN_SUBCATEGORIES) {
    if (terms.some(term => containsCuisineTerm(text, term))) return label;
  }
  return 'Other Mexican';
}

function populateMexicanSubcategories() {
  if (!mexicanSubcategoryFilters) return;
  const mexicanCards = cards.filter(card => detectLatinSubcuisine(card) === 'Mexico');
  const represented = [...new Set(mexicanCards.map(detectMexicanSubcategory).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b));
  mexicanSubcategoryFilters.innerHTML =
    '<button class="cuisine-filter active" data-mexican="all">All Mexican food</button>' +
    represented.map(name => `<button class="cuisine-filter" data-mexican="${name}">${name}</button>`).join('');
  mexicanSubcategoryFilters.querySelectorAll('.cuisine-filter').forEach(button => {
    button.addEventListener('click', () => {
      mexicanSubcategoryFilters.querySelectorAll('.cuisine-filter').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      activeMexicanSubcategory = button.dataset.mexican || 'all';
      updateRecipes();
    });
  });
}

function syncMexicanSubcategoryVisibility() {
  const show = activeCuisine === 'Latin American' && activeLatinSubcuisine === 'Mexico';
  if (mexicanSubcategoryGroup) mexicanSubcategoryGroup.hidden = !show;
  if (show) populateMexicanSubcategories();
  else activeMexicanSubcategory = 'all';
}

function populateLatinSubcuisines() {
  if (!latinSubcuisineFilters) return;
  const latinCards = cards.filter(card => detectCuisine(card) === 'Latin American');
  const represented = [...new Set(latinCards.map(detectLatinSubcuisine).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b));

  latinSubcuisineFilters.innerHTML =
    '<button class="cuisine-filter active" data-latin="all">All Latin American</button>' +
    represented.map(name =>
      `<button class="cuisine-filter" data-latin="${name}">${name}</button>`
    ).join('');

  latinSubcuisineFilters.querySelectorAll('.cuisine-filter').forEach(button => {
    button.addEventListener('click', () => {
      latinSubcuisineFilters.querySelectorAll('.cuisine-filter')
        .forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      activeLatinSubcuisine = button.dataset.latin || 'all';
      activeMexicanSubcategory = 'all';
      syncMexicanSubcategoryVisibility();
      updateRecipes();
    });
  });
}

function populateAmericanSubcuisines() {
  if (!americanSubcuisineFilters) return;
  const americanCards = cards.filter(card => detectCuisine(card) === 'American');
  const represented = [...new Set(americanCards.map(detectAmericanSubcuisine).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b));
  americanSubcuisineFilters.innerHTML =
    '<button class="cuisine-filter active" data-american="all">All American</button>' +
    represented.map(name => `<button class="cuisine-filter" data-american="${name}">${name}</button>`).join('');
  americanSubcuisineFilters.querySelectorAll('.cuisine-filter').forEach(button => {
    button.addEventListener('click', () => {
      americanSubcuisineFilters.querySelectorAll('.cuisine-filter').forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      activeAmericanSubcuisine = button.dataset.american || 'all';
      updateRecipes();
    });
  });
}

function populateEuropeanSubcuisines() {
  if (!europeanSubcuisineFilters) return;
  const europeanCards = cards.filter(card => detectCuisine(card) === 'European');
  const represented = [...new Set(europeanCards.map(detectEuropeanSubcuisine).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b));

  europeanSubcuisineFilters.innerHTML =
    '<button class="cuisine-filter active" data-european="all">All European</button>' +
    represented.map(name =>
      `<button class="cuisine-filter" data-european="${name}">${name}</button>`
    ).join('');

  europeanSubcuisineFilters.querySelectorAll('.cuisine-filter').forEach(button => {
    button.addEventListener('click', () => {
      europeanSubcuisineFilters.querySelectorAll('.cuisine-filter')
        .forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      activeEuropeanSubcuisine = button.dataset.european || 'all';
      updateRecipes();
    });
  });
}

function populateAsianSubcuisines() {
  if (!asianSubcuisineFilters) return;
  const asianCards = cards.filter(card => detectCuisine(card) === 'Asian');
  const represented = [...new Set(asianCards.map(detectAsianSubcuisine).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b));

  asianSubcuisineFilters.innerHTML =
    '<button class="cuisine-filter active" data-asian="all">All Asian</button>' +
    represented.map(name =>
      `<button class="cuisine-filter" data-asian="${name}">${name}</button>`
    ).join('');

  asianSubcuisineFilters.querySelectorAll('.cuisine-filter').forEach(button => {
    button.addEventListener('click', () => {
      asianSubcuisineFilters.querySelectorAll('.cuisine-filter')
        .forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      activeAsianSubcuisine = button.dataset.asian || 'all';
      updateRecipes();
    });
  });
}

function populateCuisineFilter() {
  if (!cuisineFiltersWrap) return;
  const cuisines = [...new Set(cards.map(detectCuisine).filter(Boolean))]
    .sort((a,b) => a.localeCompare(b));

  cuisineFiltersWrap.innerHTML =
    '<button class="cuisine-filter active" data-cuisine="all">All cuisines</button>' +
    cuisines.map(name =>
      `<button class="cuisine-filter" data-cuisine="${name}">${name}</button>`
    ).join('');

  cuisineFiltersWrap.querySelectorAll('.cuisine-filter').forEach(button => {
    button.addEventListener('click', () => {
      cuisineFiltersWrap.querySelectorAll('.cuisine-filter')
        .forEach(b => b.classList.remove('active'));
      button.classList.add('active');
      activeCuisine = button.dataset.cuisine || 'all';
      activeAmericanSubcuisine = 'all';
      activeEuropeanSubcuisine = 'all';
      activeAsianSubcuisine = 'all';
      activeLatinSubcuisine = 'all';
      activeMexicanSubcategory = 'all';

      if (americanSubcuisineGroup) {
        americanSubcuisineGroup.hidden = activeCuisine !== 'American';
      }
      if (europeanSubcuisineGroup) {
        europeanSubcuisineGroup.hidden = activeCuisine !== 'European';
      }
      if (asianSubcuisineGroup) {
        asianSubcuisineGroup.hidden = activeCuisine !== 'Asian';
      }
      if (latinSubcuisineGroup) {
        latinSubcuisineGroup.hidden = activeCuisine !== 'Latin American';
      }
      if (activeCuisine === 'American') populateAmericanSubcuisines();
      if (activeCuisine === 'European') populateEuropeanSubcuisines();
      if (activeCuisine === 'Asian') populateAsianSubcuisines();
      if (activeCuisine === 'Latin American') populateLatinSubcuisines();
      syncMexicanSubcategoryVisibility();

      // Cuisine is the primary filter: reset food type to All when cuisine changes.
      activeFilter = 'all';
      filters.forEach(b => b.classList.toggle('active', (b.dataset.filter || 'all') === 'all'));

      updateRecipes();
    });
  });
}

function matchesBroadCategory(card, filter) {
  if (filter === 'all') return true;
  // Category is assigned from the recipe's published dish-type metadata.
  // Do not infer a dish category from ingredients or text: a pasta dish
  // containing vegetables must not also appear under Salads & Sides.
  return (card.dataset.category || '').trim().toLowerCase() === filter;
}

function recipeDisplayPriority(card) {
  const categories = (card.dataset.category || '').toLowerCase();
  const text = cardHaystack(card);

  // Put entree/main-dish recipes first in the default collection view.
  const clearlyNonMain =
    /dessert|sauce|seasoning|side|salad|soup|bread|drink|beverage|appetizer|starter/.test(categories) ||
    /dessert|sauce|seasoning|side dish|salad|soup|bread|cocktail|appetizer|starter/.test(text);
  if (clearlyNonMain) return 1;

  const mainDish =
    /chicken|beef|pork|veal|lamb|turkey|duck|sausage|fish|seafood|pasta|rice|main|entree|entrée|entrees-mains/.test(categories) ||
    /chicken|steak|beef|pork|veal|lamb|turkey|duck|sausage|salmon|shrimp|fish|mussels|pasta|spaghetti|rigatoni|risotto/.test(text);
  return mainDish ? 0 : 1;
}

function shuffleMainRecipesOnLoad() {
  const grid = document.getElementById('recipeGrid');
  if (!grid) return;

  const main = [];
  const other = [];

  cards.forEach((card, index) => {
    (recipeDisplayPriority(card) === 0 ? main : other).push({card, index});
  });

  // Fisher-Yates shuffle: create a fresh main-dish order every page load.
  for (let i = main.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [main[i], main[j]] = [main[j], main[i]];
  }

  // Keep main dishes as the discovery set; leave non-main recipes in their
  // existing order after them so filters and search continue to expose all recipes.
  [...main, ...other].forEach(item => grid.appendChild(item.card));
}

function updateRecipes() {
  const q = normalizeSearchText(search?.value || '');
  const terms = q ? q.split(/\s+/).filter(Boolean) : [];
  let visible = 0;

  cards.forEach(card => {
    const haystack = cardHaystack(card);
    const cuisine = detectCuisine(card);
    const matchesCategory = matchesBroadCategory(card, activeFilter);
    const matchesCuisine = activeCuisine === 'all' || cuisine === activeCuisine;
    const americanSubcuisine = detectAmericanSubcuisine(card);
    const matchesAmericanSubcuisine =
      activeCuisine !== 'American' ||
      activeAmericanSubcuisine === 'all' ||
      americanSubcuisine === activeAmericanSubcuisine;
    const europeanSubcuisine = detectEuropeanSubcuisine(card);
    const matchesEuropeanSubcuisine =
      activeCuisine !== 'European' ||
      activeEuropeanSubcuisine === 'all' ||
      europeanSubcuisine === activeEuropeanSubcuisine;
    const asianSubcuisine = detectAsianSubcuisine(card);
    const matchesAsianSubcuisine =
      activeCuisine !== 'Asian' ||
      activeAsianSubcuisine === 'all' ||
      asianSubcuisine === activeAsianSubcuisine;
    const latinSubcuisine = detectLatinSubcuisine(card);
    const matchesLatinSubcuisine =
      activeCuisine !== 'Latin American' ||
      activeLatinSubcuisine === 'all' ||
      latinSubcuisine === activeLatinSubcuisine;
    const mexicanSubcategory = detectMexicanSubcategory(card);
    const matchesMexicanSubcategory =
      activeCuisine !== 'Latin American' ||
      activeLatinSubcuisine !== 'Mexico' ||
      activeMexicanSubcategory === 'all' ||
      mexicanSubcategory === activeMexicanSubcategory;
    const matchesSearch = terms.length === 0 || terms.every(term => haystack.includes(term));
    const browserMatches=[[browserWorldRegion,'worldRegion'],[browserCountry,'country'],[browserRegion,'region'],[browserClassification,'classification'],[browserDifficulty,'difficulty']].every(([select,type])=>!select||select.value==='all'||browserCardValue(card,type)===select.value);
    const allergens=(card.dataset.allergens||'').split(',').map(x=>x.trim()).filter(Boolean);
    const matchesAllergen=!browserAllergen||browserAllergen.value==='all'||(allergens.length>0&&!allergens.includes(browserAllergen.value));
    const show = matchesAllergen && matchesCategory && matchesCuisine && matchesAmericanSubcuisine && matchesEuropeanSubcuisine && matchesAsianSubcuisine && matchesLatinSubcuisine && matchesMexicanSubcategory && matchesSearch && browserMatches;

    card.hidden = !show;
    if (show) card.style.removeProperty('display');
    else card.style.setProperty('display','none','important');
    if (show) visible++;
  });

  if (noResults) noResults.hidden = visible !== 0;
  if (browserCount) browserCount.textContent = visible + (visible===1?' recipe found':' recipes found');
}

search?.addEventListener('input', () => {
  // Searching should search the entire cookbook rather than only the currently
  // selected cuisine or food-type filter.
  if ((search.value || '').trim()) {
    activeFilter = 'all';
    activeCuisine = 'all';
    activeAmericanSubcuisine = 'all';
    activeEuropeanSubcuisine = 'all';
    activeAsianSubcuisine = 'all';
    activeLatinSubcuisine = 'all';
    activeMexicanSubcategory = 'all';
    filters.forEach(b => b.classList.toggle('active', (b.dataset.filter || 'all') === 'all'));
    cuisineFiltersWrap?.querySelectorAll('.cuisine-filter').forEach(b => {
      b.classList.toggle('active', (b.dataset.cuisine || '') === 'all');
    });
    if (americanSubcuisineGroup) americanSubcuisineGroup.hidden = true;
    if (europeanSubcuisineGroup) europeanSubcuisineGroup.hidden = true;
    if (asianSubcuisineGroup) asianSubcuisineGroup.hidden = true;
    if (latinSubcuisineGroup) latinSubcuisineGroup.hidden = true;
    if (mexicanSubcategoryGroup) mexicanSubcategoryGroup.hidden = true;
  }
  updateRecipes();
});


filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  button.classList.add('active');
  activeFilter = button.dataset.filter || 'all';
  updateRecipes();
}));

addMetricIngredientMeasurements();
addEnglishRecipeNames();
shuffleMainRecipesOnLoad();
populateCuisineFilter();
populateAmericanSubcuisines();
populateEuropeanSubcuisines();
populateAsianSubcuisines();
populateLatinSubcuisines();
populateMexicanSubcategories();
syncMexicanSubcategoryVisibility();
updateRecipes();


// Keep optional methods, sauce pairings, and technique alternatives below the recipe itself.
(function moveRecipeAlternativesBelowRecipe(){
  function moveAlternatives(){
    const detail=document.querySelector('.recipe-detail');
    const recipe=detail?.querySelector('.recipe-layout');
    if(!detail || !recipe) return;

    // Any dynamically-created recommendation/cross-reference panel uses a
    // *-tip class. Keep all such panels below the core recipe instead of trying
    // to maintain an ever-growing list of individual panel classes.
    const alternatives=[...detail.querySelectorAll('[class~="meat-tip"], [class$="-tip"], [class*="-tip "]')]
      .filter(el => !el.closest('.recipe-alternatives'));
    if(!alternatives.length) return;

    let section=detail.querySelector('.recipe-alternatives');
    if(!section){
      section=document.createElement('section');
      section.className='container recipe-alternatives';
      section.style.cssText='margin-top:28px';
      section.innerHTML='<h2 style="margin:0 0 14px">Cross-References, Alternatives & Pairings</h2>';
    }

    alternatives.forEach(el=>section.appendChild(el));

    const broth=detail.querySelector('.broth-xref');
    if(broth) detail.insertBefore(section,broth);
    else recipe.insertAdjacentElement('afterend',section);
  }

  // Pairing panels are created elsewhere in this script. Queue relocation after
  // those initializers have finished, and repeat once for any late DOM additions.
  setTimeout(moveAlternatives,0);
  setTimeout(moveAlternatives,100);
  setTimeout(moveAlternatives,300);
  setTimeout(moveAlternatives,700);
})();


/* Link ingredient names to existing Kitchen Table recipes.
   Stock and broth are treated as equivalent ingredient terms for cross-references. */
(function linkRecipeIngredients(){
  const ingredientMap = [
    {aliases:['beef stock','beef broth'],href:'beef-broth.html',title:'Beef Broth'},
    {aliases:['veal stock','veal broth'],href:'veal-broth.html',title:'Veal Broth'},
    {aliases:['chicken stock','chicken broth'],href:'chicken-broth.html',title:'Chicken Broth'},
    {aliases:['turkey stock','turkey broth'],href:'turkey-broth.html',title:'Turkey Broth'},
    {aliases:['pork stock','pork broth'],href:'pork-broth.html',title:'Pork Broth'},
    {aliases:['vegetable stock','vegetable broth'],href:'vegetable-broth.html',title:'Vegetable Broth'},
    {aliases:['mushroom stock','mushroom broth'],href:'mushroom-broth.html',title:'Mushroom Broth'},
    {aliases:['lamb stock','lamb broth'],href:'lamb-broth.html',title:'Lamb Broth'},
    {aliases:['clam stock','clam broth'],href:'clam-broth.html',title:'Clam Broth'},
    {aliases:['crab stock','crab broth'],href:'crab-broth.html',title:'Crab Broth'},
    {aliases:['lobster stock','lobster broth'],href:'lobster-broth.html',title:'Lobster Broth'},
    {aliases:['shrimp stock','shrimp broth'],href:'shrimp-broth.html',title:'Shrimp Broth'},
    {aliases:['shellfish stock','shellfish broth','seafood stock','seafood broth'],href:'shellfish-broth.html',title:'Shellfish Broth'},
    {aliases:['fish stock'],href:'fish-stock.html',title:'Fish Stock'},
    {aliases:['fish broth'],href:'fish-broth.html',title:'Fish Broth'},
    {aliases:['bone broth','bone stock'],href:'bone-broth.html',title:'Bone Broth'},
    {aliases:['beef bone broth','beef bone stock'],href:'beef-bone-broth.html',title:'Beef Bone Broth'},
    {aliases:['chicken bone broth','chicken bone stock'],href:'chicken-bone-broth.html',title:'Chicken Bone Broth'},
    {aliases:['consommé','consomme'],href:'consomme.html',title:'Consommé'},
    {aliases:['hollandaise'],href:'hollandaise-sauce.html',title:'Hollandaise'},
    {aliases:['béarnaise','bearnaise'],href:'bearnaise-sauce.html',title:'Béarnaise'},
    {aliases:['béchamel','bechamel'],href:'bechamel-sauce.html',title:'Béchamel'},
    {aliases:['velouté','veloute'],href:'veloute-sauce.html',title:'Velouté'},
    {aliases:['espagnole'],href:'espagnole-sauce.html',title:'Espagnole'},
    {aliases:['mornay'],href:'mornay-sauce.html',title:'Mornay'},
    {aliases:['marinara sauce','marinara'],href:'marinara-sauce.html',title:'Marinara Sauce'},
    {aliases:['vodka sauce'],href:'vodka-sauce.html',title:'Vodka Sauce'},
    {aliases:['chimichurri'],href:'chimichurri.html',title:'Chimichurri'},
    {aliases:['pesto alla genovese'],href:'pesto-alla-genovese.html',title:'Pesto alla Genovese'},
    {aliases:['pesto'],href:'pesto.html',title:'Pesto'},
    {aliases:['salsa verde'],href:'salsa-verde.html',title:'Salsa Verde'},
    {aliases:['salsa roja'],href:'salsa-roja.html',title:'Salsa Roja'},
    {aliases:['salsa taquera'],href:'salsa-taquera.html',title:'Salsa Taquera'},
    {aliases:['salsa macha'],href:'salsa-macha.html',title:'Salsa Macha'},
    {aliases:['salsa ranchera'],href:'salsa-ranchera.html',title:'Salsa Ranchera'},
    {aliases:['pico de gallo'],href:'pico-de-gallo.html',title:'Pico de Gallo'},
    {aliases:['mole poblano'],href:'mole-poblano.html',title:'Mole Poblano'},
    {aliases:['mole negro'],href:'mole-negro.html',title:'Mole Negro'},
    {aliases:['mexican adobo','adobo sauce'],href:'mexican-adobo.html',title:'Mexican Adobo'},
    {aliases:['cajun seasoning','cajun seasoning mix'],href:'cajun-seasoning-mix.html',title:'Cajun Seasoning Mix'},
    {aliases:['fresh pasta'],href:'fresh-pasta-hard-soft-flour.html',title:'Fresh Pasta with Hard + Soft Flour'},
    {aliases:['corn tortillas','corn tortilla'],href:'tortillas-maiz-hechas-mano.html',title:'Handmade Corn Tortillas'}
  ];

  const aliases=[];
  ingredientMap.forEach(item=>{
    item.aliases.forEach(alias=>aliases.push({
      alias:alias,
      normalized:alias.toLowerCase(),
      href:item.href,
      title:item.title
    }));
  });
  aliases.sort((a,b)=>b.alias.length-a.alias.length);

  function linkTextNode(node){
    if(!node.nodeValue || !node.nodeValue.trim()) return;
    if(node.parentElement && node.parentElement.closest('a')) return;

    const original=node.nodeValue;
    const lower=original.toLowerCase();
    let best=null;

    aliases.forEach(item=>{
      const idx=lower.indexOf(item.normalized);
      if(idx<0) return;
      const before=idx===0?' ':lower[idx-1];
      const after=idx+item.normalized.length>=lower.length?' ':lower[idx+item.normalized.length];
      if(/[a-z0-9]/i.test(before) || /[a-z0-9]/i.test(after)) return;
      if(!best || idx<best.idx || (idx===best.idx && item.alias.length>best.item.alias.length)){
        best={idx:idx,item:item};
      }
    });

    if(!best) return;

    const frag=document.createDocumentFragment();
    const before=original.slice(0,best.idx);
    const matched=original.slice(best.idx,best.idx+best.item.alias.length);
    const after=original.slice(best.idx+best.item.alias.length);

    if(before) frag.appendChild(document.createTextNode(before));
    const a=document.createElement('a');
    a.href=best.item.href;
    a.className='ingredient-recipe-link';
    a.textContent=matched;
    a.title='Open '+best.item.title+' recipe';
    frag.appendChild(a);
    if(after) frag.appendChild(document.createTextNode(after));
    node.replaceWith(frag);
  }

  function applyIngredientLinks(){
    const panels=document.querySelectorAll('.ingredients-panel');
    if(!panels.length) return;
    panels.forEach(panel=>{
      const walker=document.createTreeWalker(panel,NodeFilter.SHOW_TEXT,{
        acceptNode:function(node){
          const p=node.parentElement;
          if(!p || p.closest('a,script,style')) return NodeFilter.FILTER_REJECT;
          return node.nodeValue.trim()?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT;
        }
      });
      const nodes=[];
      let n;
      while((n=walker.nextNode())) nodes.push(n);
      nodes.forEach(linkTextNode);
    });
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',applyIngredientLinks);
  else applyIngredientLinks();
})();

// Recipe images are served only from local GitHub Pages assets.


/* Featured recipe: rotate daily across the full published entree portfolio. */
function setRecipeOfTheDay() {
  const image = document.getElementById('featuredRecipeImage');
  const title = document.getElementById('featuredRecipeTitle');
  const description = document.getElementById('featuredRecipeDescription');
  const link = document.getElementById('featuredRecipeLink');
  if (!image || !title || !description || !link) return;
  const recipes = Array.from(document.querySelectorAll('#recipeGrid .recipe-card'))
    .filter(card => recipeDisplayPriority(card) === 0)
    .map(card => {
    const anchor = card.querySelector('.recipe-card-heading h3 a');
    const photo = card.querySelector('img');
    const name = card.querySelector('.recipe-title-original');
    const subtitle = card.querySelector('.recipe-title-english');
    const text = card.querySelector('.recipe-card-body p');
    return { href: anchor && anchor.getAttribute('href'),
      title: name && name.textContent.trim(),
      subtitle: subtitle && subtitle.textContent.trim(),
      description: text && text.textContent.trim(),
      image: photo && photo.getAttribute('src') };
  }).filter(recipe => recipe.href && recipe.title)
    .sort((a, b) => a.href.localeCompare(b.href));
  if (!recipes.length) return;
  const now = new Date();
  const dayKey = Math.floor(Date.UTC(now.getFullYear(), now.getMonth(), now.getDate()) / 86400000);
  const recipe = recipes[((dayKey % recipes.length) + recipes.length) % recipes.length];
  title.replaceChildren();
  const local = document.createElement('span');
  local.className = 'featured-local-name';
  local.textContent = recipe.title;
  title.appendChild(local);
  const normalized = x => String(x || '').replace(/[()]/g, '').trim().toLocaleLowerCase();
  if (recipe.subtitle && normalized(recipe.subtitle) !== normalized(recipe.title)) {
    const english = document.createElement('span');
    english.className = 'featured-english-name';
    english.textContent = recipe.subtitle.startsWith('(') ? recipe.subtitle : '(' + recipe.subtitle + ')';
    title.appendChild(english);
  }
  description.textContent = recipe.description || '';
  link.href = recipe.href;
  link.hidden = false;
  if (recipe.image) {
    image.onerror = () => { image.hidden = true; };
    image.src = recipe.image;
    image.alt = recipe.title;
    image.hidden = false;
  } else {
    image.hidden = true;
  }
}
setRecipeOfTheDay();

const MOTHER_SAUCE_LINKS = {
  "zucchini-lasagna.html": [["BÉCHAMEL","Optional classical variation: use béchamel as part of the creamy layer.","bechamel-sauce.html"]],
  "eggplant-parmesan.html": [["BÉCHAMEL","Optional richer baked variation.","bechamel-sauce.html"],["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "new-orleans-shrimp-corn-bisque.html": [["VELOUTÉ","Related roux-and-stock thickening technique.","veloute-sauce.html"]],
  "spicy-cajun-shrimp-corn-chowder.html": [["VELOUTÉ","Related stock-and-cream sauce technique.","veloute-sauce.html"]],
  "boeuf-bourguignon.html": [["ESPAGNOLE","Related classical brown-sauce technique using stock, flour, aromatics, and reduction.","espagnole-sauce.html"]],
  "stracotto-di-fassona-piemontese.html": [["ESPAGNOLE","Related brown-stock and braising-sauce technique.","espagnole-sauce.html"]],
  "gnocchi-alla-sorrentina.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "pasta-alla-norma.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "penne-arrabbiata.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "rigatoni-amatriciana.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "bucatini-amatriciana.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "milanesa-napolitana.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "shrimp-saganaki.html": [["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"]],
  "shrimp-creole.html": [["SAUCE TOMATE","Creole tomato sauce uses a related tomato-and-aromatics foundation.","sauce-tomate.html"]],
  "noquis-con-tuco.html": [["SAUCE TOMATE","Tuco uses a related long-simmered tomato-sauce foundation.","sauce-tomate.html"]],
  "herb-crusted-salmon.html": [["HOLLANDAISE","Optional classical pairing for salmon.","hollandaise-sauce.html"]],
  "lemon-stuffed-grilled-branzino.html": [["HOLLANDAISE","Optional classical pairing for delicate fish.","hollandaise-sauce.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=MOTHER_SAUCE_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".mother-sauce-tip")) return;
  const btn=document.querySelector(".print-button");
  if(!btn) return;
  const wrap=document.createElement("div");
  wrap.className="mother-sauce-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#faf7f2";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MOTHER SAUCE CROSS-REFERENCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('')+'<a class="text-link" href="mother-sauces-guide.html">See all five French mother sauces →</a>';
  btn.insertAdjacentElement("afterend",wrap);
})();

const BECHAMEL_DAUGHTER_LINKS = {
  "zucchini-lasagna.html":[["MORNAY","Optional cheesy Béchamel variation for the creamy layer.","mornay-sauce.html"],["CRÈME SAUCE","Optional richer white-sauce layer.","creme-sauce.html"]],
  "eggplant-parmesan.html":[["MORNAY","Optional cheese-sauce variation for a richer baked finish.","mornay-sauce.html"]],
  "gnocchi-gorgonzola.html":[["MORNAY","Related cheese-sauce technique for a smoother cheese emulsion.","mornay-sauce.html"]],
  "roasted-broccoli-lemon-almonds.html":[["CHEDDAR CHEESE SAUCE","Optional pairing for roasted broccoli.","cheddar-cheese-sauce.html"],["MORNAY","Optional French cheese-sauce pairing.","mornay-sauce.html"]],
  "roasted-cauliflower.html":[["CHEDDAR CHEESE SAUCE","Optional pairing for roasted cauliflower.","cheddar-cheese-sauce.html"],["MORNAY","Optional gratin-style sauce.","mornay-sauce.html"]],
  "baked-cauliflower.html":[["CHEDDAR CHEESE SAUCE","Optional classic cheese-sauce pairing.","cheddar-cheese-sauce.html"],["MORNAY","Optional French cheese-sauce pairing.","mornay-sauce.html"]],
  "pure-de-papas.html":[["CHEDDAR CHEESE SAUCE","Optional topping for mashed potatoes.","cheddar-cheese-sauce.html"]],
  "classic-american-hamburger.html":[["CHEDDAR CHEESE SAUCE","Optional pourable cheddar topping.","cheddar-cheese-sauce.html"]],
  "herb-crusted-salmon.html":[["MUSTARD SAUCE","Dijon Béchamel makes a complementary creamy sauce for salmon.","mustard-sauce-bechamel.html"],["NANTUA","Optional shellfish-enriched classical pairing.","nantua-sauce.html"]],
  "lemon-stuffed-grilled-branzino.html":[["NANTUA","Optional classical shellfish sauce for delicate fish.","nantua-sauce.html"],["MUSTARD SAUCE","Optional Dijon cream-style pairing.","mustard-sauce-bechamel.html"]],
  "shrimp-piccata-skewers.html":[["NANTUA","Optional shellfish-on-shellfish classical sauce pairing.","nantua-sauce.html"]],
  "venetian-shrimp-polenta.html":[["NANTUA","Optional crayfish/shrimp-enriched sauce variation.","nantua-sauce.html"]],
  "creamy-seafood-risotto.html":[["NANTUA","Related shellfish cream-sauce profile; use sparingly as an optional garnish.","nantua-sauce.html"]],
  "pork-chop-milanese.html":[["MUSTARD SAUCE","Optional creamy Dijon sauce for pork.","mustard-sauce-bechamel.html"]],
  "veal-piccata.html":[["MUSTARD SAUCE","Optional creamy mustard variation for veal.","mustard-sauce-bechamel.html"]],
  "mediterranean-lemon-shallot-chicken.html":[["MUSTARD SAUCE","Optional creamy Dijon pairing for chicken.","mustard-sauce-bechamel.html"],["SOUBISE","Optional onion-forward classical pairing.","soubise-sauce.html"]],
  "sage-mushroom-chicken-skillet.html":[["CRÈME SAUCE","Optional cream-enriched Béchamel variation for the pan sauce.","creme-sauce.html"]],
  "zurich-style-veal-creamy-mushroom-sauce.html":[["CRÈME SAUCE","Related classical cream-sauce technique.","creme-sauce.html"],["SOUBISE","Optional onion-enriched variation.","soubise-sauce.html"]],
  "florentine-steak-balsamic-rosemary.html":[["SOUBISE","Optional mellow onion sauce for steak.","soubise-sauce.html"]],
  "bife-de-chorizo-chimichurri.html":[["SOUBISE","Optional classical onion sauce alternative to chimichurri.","soubise-sauce.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=BECHAMEL_DAUGHTER_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".daughter-sauce-tip")) return;
  const anchor=document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="daughter-sauce-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fffaf2";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">BÉCHAMEL DAUGHTER SAUCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('')+'<a class="text-link" href="bechamel-sauce.html">See Béchamel and all daughter sauces →</a>';
  anchor.insertAdjacentElement("afterend",wrap);
})();

const VELOUTE_DAUGHTER_LINKS = {
  "mediterranean-lemon-shallot-chicken.html":[["SUPRÊME","Optional cream-finished chicken velouté pairing.","supreme-sauce.html"],["VENETIAN SAUCE","Herb-forward velouté pairing with shallot and tarragon.","venetian-sauce-veloute.html"]],
  "sage-mushroom-chicken-skillet.html":[["SUPRÊME","Optional classical cream sauce for chicken.","supreme-sauce.html"],["POULETTE","Mushroom, lemon, and parsley make this especially compatible.","poulette-sauce.html"]],
  "pollo-a-la-parrilla.html":[["SUPRÊME","Optional classical cream sauce for grilled chicken.","supreme-sauce.html"],["HUNGARIAN SAUCE","Paprika and onion make a complementary velouté variation.","hungarian-sauce-veloute.html"]],
  "arroz-con-pollo-uruguayo.html":[["HUNGARIAN SAUCE","Optional paprika-and-onion velouté variation for chicken.","hungarian-sauce-veloute.html"]],
  "veal-piccata.html":[["ALLEMANDE","Veal velouté with egg yolk, cream, and lemon is a close classical pairing.","allemande-sauce.html"],["POULETTE","Optional mushroom-and-lemon velouté sauce.","poulette-sauce.html"]],
  "zurich-style-veal-creamy-mushroom-sauce.html":[["ALLEMANDE","Related veal velouté technique finished with cream and lemon.","allemande-sauce.html"],["POULETTE","Mushroom-based velouté variation pairs naturally with this dish.","poulette-sauce.html"]],
  "osso-buco-red-wine.html":[["ALLEMANDE","Optional classical veal-sauce alternative for a lighter presentation.","allemande-sauce.html"]],
  "herb-crusted-salmon.html":[["NORMANDE","Optional enriched fish-velouté pairing.","normande-sauce.html"],["BERCY","White wine, shallot, lemon, and parsley complement salmon.","bercy-sauce.html"],["VENETIAN SAUCE","Optional herb-forward fish velouté pairing.","venetian-sauce-veloute.html"]],
  "lemon-stuffed-grilled-branzino.html":[["NORMANDE","Optional rich fish-velouté pairing.","normande-sauce.html"],["BERCY","Classic white-wine and shallot sauce for delicate fish.","bercy-sauce.html"],["VENETIAN SAUCE","Tarragon and chervil make a delicate fish pairing.","venetian-sauce-veloute.html"]],
  "swordfish-sicilian-style.html":[["BERCY","Optional white-wine, shallot, lemon, and parsley pairing.","bercy-sauce.html"],["AURORA","Optional tomato-enriched velouté variation.","aurora-sauce.html"]],
  "white-wine-garlic-mussels.html":[["BERCY","Related shallot-and-white-wine fish-sauce technique.","bercy-sauce.html"]],
  "moules-marinieres.html":[["BERCY","Closely related white-wine and shallot flavor profile.","bercy-sauce.html"]],
  "shrimp-piccata-skewers.html":[["BERCY","Lemon, white wine, shallot, and parsley make a natural seafood pairing.","bercy-sauce.html"]],
  "venetian-shrimp-polenta.html":[["VENETIAN SAUCE","The tarragon-shallot velouté variation is a fitting optional pairing.","venetian-sauce-veloute.html"],["BERCY","White wine and shallot complement shrimp.","bercy-sauce.html"]],
  "creamy-seafood-risotto.html":[["NORMANDE","Optional fish-velouté enrichment for a more classical seafood presentation.","normande-sauce.html"]],
  "zucchini-risotto-shrimp.html":[["NORMANDE","Optional enriched fish-velouté pairing.","normande-sauce.html"]],
  "new-orleans-shrimp-corn-bisque.html":[["NORMANDE","Related fish-stock, cream, and liaison technique.","normande-sauce.html"],["AURORA","Optional tomato-enriched velouté variation.","aurora-sauce.html"]],
  "shrimp-creole.html":[["AURORA","Tomato-enriched velouté is a classical cousin to this tomato-based shrimp sauce.","aurora-sauce.html"]],
  "jambalaya.html":[["HUNGARIAN SAUCE","Optional paprika-forward velouté pairing for chicken and sausage elements.","hungarian-sauce-veloute.html"]],
  "chicken-and-andouille-gumbo.html":[["HUNGARIAN SAUCE","Paprika-and-onion velouté is a related savory sauce profile.","hungarian-sauce-veloute.html"]],
  "crawfish-etouffee.html":[["AURORA","Optional tomato-enriched velouté variation for shellfish.","aurora-sauce.html"],["NORMANDE","Optional rich fish-velouté pairing for crawfish.","normande-sauce.html"]],
  "blackened-redfish.html":[["BERCY","Bright white-wine and shallot sauce is a classic counterpoint to blackened fish.","bercy-sauce.html"],["NORMANDE","Optional richer fish-velouté pairing.","normande-sauce.html"]],
  "miso-mushroom-leek-pasta.html":[["POULETTE","Related mushroom-forward velouté technique; use as an optional French-style variation.","poulette-sauce.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=VELOUTE_DAUGHTER_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".veloute-daughter-tip")) return;
  const anchor=document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="veloute-daughter-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f6fafc";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">VELOUTÉ DAUGHTER SAUCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('')+'<a class="text-link" href="veloute-sauce.html">See Velouté and all daughter sauces →</a>';
  anchor.insertAdjacentElement("afterend",wrap);
})();

const HOLLANDAISE_DAUGHTER_LINKS = {
  "florentine-steak-balsamic-rosemary.html":[["BÉARNAISE","The classic tarragon-shallot Hollandaise derivative for steak.","bearnaise-sauce.html"],["CHORON","Tomato-enriched Béarnaise for a brighter steak sauce.","choron-sauce.html"],["FOYOT","Béarnaise enriched with meat glaze for an especially savory steak sauce.","foyot-sauce.html"]],
  "bife-de-chorizo-chimichurri.html":[["BÉARNAISE","Optional classical sauce alternative for strip steak.","bearnaise-sauce.html"],["CHORON","Optional tomato-tarragon variation for grilled beef.","choron-sauce.html"],["FOYOT","Optional meat-glaze Béarnaise for a richer presentation.","foyot-sauce.html"]],
  "asado-argentino.html":[["BÉARNAISE","Optional French-style sauce for the steak portions.","bearnaise-sauce.html"],["FOYOT","Optional rich sauce for grilled beef cuts.","foyot-sauce.html"]],
  "asado-uruguayo.html":[["BÉARNAISE","Optional classical sauce for grilled beef.","bearnaise-sauce.html"],["FOYOT","Optional rich Béarnaise derivative for steaks.","foyot-sauce.html"]],
  "pork-chop-milanese.html":[["DIJON HOLLANDAISE","Optional mustard-Hollandaise pairing for pork.","dijon-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise pairs well with crisp pork cutlets.","noisette-hollandaise.html"]],
  "veal-piccata.html":[["DIJON HOLLANDAISE","Optional mustard-Hollandaise variation for veal.","dijon-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise complements veal and lemon.","noisette-hollandaise.html"]],
  "herb-crusted-salmon.html":[["MOUSSELINE","Lightened Hollandaise is especially good with delicate salmon.","mousseline-hollandaise.html"],["MALTAISE","Blood-orange Hollandaise adds a citrus pairing for salmon.","maltaise-sauce.html"],["DIJON HOLLANDAISE","Optional mustard-Hollandaise pairing.","dijon-hollandaise.html"],["NOISETTE","Nutty browned-butter Hollandaise pairs naturally with roasted salmon.","noisette-hollandaise.html"]],
  "lemon-stuffed-grilled-branzino.html":[["MOUSSELINE","Airy Hollandaise is a delicate pairing for branzino.","mousseline-hollandaise.html"],["MALTAISE","Blood-orange Hollandaise works as a bright citrus pairing.","maltaise-sauce.html"],["NOISETTE","Brown-butter Hollandaise adds nutty richness to grilled fish.","noisette-hollandaise.html"]],
  "swordfish-sicilian-style.html":[["MALTAISE","Blood-orange Hollandaise is an optional citrus-forward pairing for swordfish.","maltaise-sauce.html"],["DIJON HOLLANDAISE","Optional mustard-Hollandaise for seared swordfish.","dijon-hollandaise.html"]],
  "blackened-redfish.html":[["MOUSSELINE","Light Hollandaise softens the heat of blackened fish.","mousseline-hollandaise.html"],["DIJON HOLLANDAISE","Mustard-Hollandaise adds tangy richness.","dijon-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise complements the toasted spice crust.","noisette-hollandaise.html"]],
  "shrimp-piccata-skewers.html":[["MOUSSELINE","Lightened Hollandaise is a refined shellfish pairing.","mousseline-hollandaise.html"],["MALTAISE","Blood-orange Hollandaise gives shrimp a bright citrus counterpoint.","maltaise-sauce.html"]],
  "venetian-shrimp-polenta.html":[["MOUSSELINE","Optional airy Hollandaise for shrimp.","mousseline-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise complements shrimp and polenta.","noisette-hollandaise.html"]],
  "buttery-shrimp-peas-potatoes.html":[["NOISETTE","Brown-butter Hollandaise echoes the buttery shrimp and potatoes.","noisette-hollandaise.html"],["DIJON HOLLANDAISE","Optional mustard-Hollandaise variation.","dijon-hollandaise.html"]],
  "roasted-broccoli-lemon-almonds.html":[["MOUSSELINE","Light Hollandaise is an optional vegetable sauce.","mousseline-hollandaise.html"],["MALTAISE","Citrus Hollandaise pairs well with roasted broccoli.","maltaise-sauce.html"],["NOISETTE","Brown-butter Hollandaise complements toasted almonds.","noisette-hollandaise.html"]],
  "roasted-cauliflower.html":[["MOUSSELINE","Airy Hollandaise is an optional classical vegetable sauce.","mousseline-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise pairs especially well with roasted cauliflower.","noisette-hollandaise.html"]],
  "baked-cauliflower.html":[["DIJON HOLLANDAISE","Optional mustard-Hollandaise for baked cauliflower.","dijon-hollandaise.html"],["NOISETTE","Brown-butter Hollandaise adds nutty richness.","noisette-hollandaise.html"]],
  "mediterranean-lemon-shallot-chicken.html":[["DIJON HOLLANDAISE","Optional mustard-Hollandaise pairing for chicken.","dijon-hollandaise.html"],["MALTAISE","Optional citrus Hollandaise pairing.","maltaise-sauce.html"]],
  "pollo-a-la-parrilla.html":[["BÉARNAISE","Optional herb-forward Hollandaise derivative for grilled chicken.","bearnaise-sauce.html"],["DIJON HOLLANDAISE","Optional mustard-Hollandaise pairing.","dijon-hollandaise.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=HOLLANDAISE_DAUGHTER_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".hollandaise-daughter-tip")) return;
  const anchor=document.querySelector(".veloute-daughter-tip") || document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="hollandaise-daughter-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff8e8";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">HOLLANDAISE DAUGHTER SAUCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('')+'<a class="text-link" href="hollandaise-sauce.html">See Hollandaise and all daughter sauces →</a>';
  anchor.insertAdjacentElement("afterend",wrap);
})();

const TOMATE_DAUGHTER_LINKS = {
  "shrimp-creole.html":[["CREOLE SAUCE","Direct family match: tomato, holy trinity, herbs, and Creole seasoning.","creole-sauce.html"]],
  "jambalaya.html":[["CREOLE SAUCE","Related Creole tomato-and-aromatics profile.","creole-sauce.html"],["SPANISH SAUCE","Pepper, tomato, and paprika make a useful optional variation.","spanish-tomato-sauce.html"]],
  "chicken-and-andouille-gumbo.html":[["CREOLE SAUCE","Optional Creole tomato sauce variation for a more tomato-forward style.","creole-sauce.html"]],
  "new-orleans-bbq-shrimp.html":[["CREOLE SAUCE","Optional tomato-based New Orleans variation alongside the buttery preparation.","creole-sauce.html"]],
  "blackened-redfish.html":[["CREOLE SAUCE","Classic tomato-based Creole pairing for blackened fish.","creole-sauce.html"]],
  "pollo-al-disco.html":[["SPANISH SAUCE","Tomato, peppers, onion, and paprika align closely with this chicken dish.","spanish-tomato-sauce.html"],["PORTUGUESE SAUCE","Optional paprika-and-tomato variation.","portuguese-sauce.html"]],
  "arroz-con-pollo-uruguayo.html":[["SPANISH SAUCE","Optional pepper-and-paprika tomato sauce pairing.","spanish-tomato-sauce.html"]],
  "swordfish-sicilian-style.html":[["PROVENÇALE","Tomato, garlic, herbs, olives, and capers closely mirror this Mediterranean profile.","provencale-sauce.html"]],
  "shrimp-saganaki.html":[["PROVENÇALE","Related tomato, garlic, herb, and olive-forward Mediterranean profile.","provencale-sauce.html"]],
  "cioppino.html":[["PROVENÇALE","Optional southern French-style tomato base for seafood stew.","provencale-sauce.html"]],
  "roasted-eggplant-cherry-tomatoes.html":[["PROVENÇALE","Directly compatible with garlic, herbs, olives, and capers.","provencale-sauce.html"]],
  "pasta-alla-norma.html":[["MARINARA","A simple tomato-garlic-herb base can stand in for the sauce.","marinara-sauce.html"],["NEAPOLITAN SAUCE","Southern Italian tomato-basil profile is especially compatible.","neapolitan-sauce.html"]],
  "eggplant-parmesan.html":[["MARINARA","Classic tomato sauce choice for layering.","marinara-sauce.html"],["NEAPOLITAN SAUCE","Alternative tomato-basil sauce for the bake.","neapolitan-sauce.html"]],
  "gnocchi-alla-sorrentina.html":[["MARINARA","Simple tomato-garlic sauce works well with gnocchi and mozzarella.","marinara-sauce.html"],["NEAPOLITAN SAUCE","Especially natural southern Italian pairing.","neapolitan-sauce.html"]],
  "zucchini-lasagna.html":[["MARINARA","Direct tomato-sauce option for layering.","marinara-sauce.html"]],
  "milanesa-napolitana.html":[["NEAPOLITAN SAUCE","Natural tomato-basil sauce for the Napolitana topping.","neapolitan-sauce.html"],["MARINARA","Simple tomato sauce alternative.","marinara-sauce.html"]],
  "penne-arrabbiata.html":[["MARINARA","Related tomato-garlic base; add chile for arrabbiata character.","marinara-sauce.html"]],
  "rigatoni-amatriciana.html":[["MARINARA","Related tomato base; guanciale and Pecorino define the final sauce.","marinara-sauce.html"]],
  "bucatini-amatriciana.html":[["MARINARA","Related tomato base; guanciale and Pecorino define the final sauce.","marinara-sauce.html"]],
  "noquis-con-tuco.html":[["BOLOGNESE","Optional meat-ragù direction for the gnocchi.","bolognese-sauce-daughter.html"],["NEAPOLITAN SAUCE","Optional lighter tomato-basil alternative.","neapolitan-sauce.html"]],
  "bolognese-meat-sauce.html":[["BOLOGNESE","Direct match to the classic slow meat-ragù family.","bolognese-sauce-daughter.html"]],
  "rigatoni-pork-ragu-ricotta.html":[["BOLOGNESE","Related slow meat-ragù technique with soffritto, wine, and tomato.","bolognese-sauce-daughter.html"]],
  "pasta-ncasciata.html":[["BOLOGNESE","Related meat-ragù foundation for the baked pasta.","bolognese-sauce-daughter.html"]],
  "osso-buco-red-wine.html":[["PORTUGUESE SAUCE","Optional tomato, garlic, paprika, and wine variation for braised veal.","portuguese-sauce.html"]],
  "mediterranean-lemon-shallot-chicken.html":[["PORTUGUESE SAUCE","Optional tomato-paprika variation for chicken.","portuguese-sauce.html"],["PROVENÇALE","Optional garlic-herb tomato variation.","provencale-sauce.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=TOMATE_DAUGHTER_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".tomate-daughter-tip")) return;
  const anchor=document.querySelector(".hollandaise-daughter-tip") || document.querySelector(".veloute-daughter-tip") || document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="tomate-daughter-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff5f2";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">SAUCE TOMATE FAMILY</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('')+'<a class="text-link" href="sauce-tomate.html">See Sauce Tomate and related sauces →</a>';
  anchor.insertAdjacentElement("afterend",wrap);
})();

const MEXICAN_SAUCE_LINKS = {
  "tomatillo-avocado-salsa-cauliflower-rice.html":[["SALSA VERDE","Direct tomatillo-salsa family match.","salsa-verde.html"],["SALSA TAQUERA","Optional taco-style chile salsa for extra heat.","salsa-taquera.html"]],
  "lemon-tomatillo-salsa-verde.html":[["SALSA VERDE","Direct classical tomatillo-salsa reference.","salsa-verde.html"]],
  "classic-american-hamburger.html":[["SALSA ROJA","Optional spicy tomato salsa topping.","salsa-roja.html"],["PICO DE GALLO","Fresh topping alternative.","pico-de-gallo.html"],["SALSA MACHA","Chile-oil condiment for a smoky-hot variation.","salsa-macha.html"]],
  "florentine-steak-balsamic-rosemary.html":[["SALSA TAQUERA","Optional chile-forward steak sauce.","salsa-taquera.html"],["SALSA MACHA","Excellent chile-oil pairing for grilled steak.","salsa-macha.html"],["ADOBO","Use as an alternative chile-vinegar marinade.","mexican-adobo.html"]],
  "bife-de-chorizo-chimichurri.html":[["SALSA TAQUERA","Optional taquería-style salsa for grilled beef.","salsa-taquera.html"],["SALSA MACHA","Nutty chile-oil pairing for steak.","salsa-macha.html"],["PICO DE GALLO","Fresh acidic counterpoint to grilled beef.","pico-de-gallo.html"]],
  "asado-argentino.html":[["SALSA ROJA","Optional grilled-meat salsa.","salsa-roja.html"],["SALSA MACHA","Optional chile-oil condiment for beef and sausage.","salsa-macha.html"]],
  "asado-uruguayo.html":[["SALSA ROJA","Optional red salsa for grilled meats.","salsa-roja.html"],["SALSA MACHA","Optional chile-oil condiment.","salsa-macha.html"]],
  "pollo-a-la-parrilla.html":[["SALSA VERDE","Bright tomatillo salsa for grilled chicken.","salsa-verde.html"],["SALSA RANCHERA","Smoky roasted tomato salsa pairing.","salsa-ranchera.html"],["ADOBO","Use as an alternative chile-vinegar marinade.","mexican-adobo.html"],["MOLE POBLANO","Optional rich Puebla-style sauce for chicken.","mole-poblano.html"]],
  "mediterranean-lemon-shallot-chicken.html":[["SALSA VERDE","Optional fresh tomatillo variation.","salsa-verde.html"],["MOLE POBLANO","Alternative rich sauce direction for chicken.","mole-poblano.html"],["ADOBO","Alternative dried-chile marinade for chicken.","mexican-adobo.html"]],
  "sage-mushroom-chicken-skillet.html":[["MOLE NEGRO","Optional deep Oaxacan-style sauce for chicken.","mole-negro.html"],["MOLE POBLANO","Optional richer chile-chocolate sauce direction.","mole-poblano.html"]],
  "arroz-con-pollo-uruguayo.html":[["SALSA RANCHERA","Smoky tomato salsa works well alongside chicken and rice.","salsa-ranchera.html"],["PICO DE GALLO","Fresh topping for rice and chicken.","pico-de-gallo.html"]],
  "shrimp-piccata-skewers.html":[["SALSA VERDE","Bright tomatillo salsa for grilled shrimp.","salsa-verde.html"],["SALSA MACHA","Chile-oil condiment for shrimp.","salsa-macha.html"],["PICO DE GALLO","Fresh topping for grilled shrimp.","pico-de-gallo.html"]],
  "cajun-garlic-butter-shrimp.html":[["SALSA DE CHILE DE ÁRBOL","Fiery chile salsa for shrimp.","salsa-chile-de-arbol.html"],["SALSA MACHA","Chile-oil condiment for a Mexican-style variation.","salsa-macha.html"]],
  "spicy-garlic-butter-shrimp-lime-chili-dip.html":[["SALSA DE CHILE DE ÁRBOL","Natural high-heat salsa pairing.","salsa-chile-de-arbol.html"],["SALSA VERDE","Bright tomatillo alternative.","salsa-verde.html"]],
  "blackened-redfish.html":[["SALSA VERDE","Acidic tomatillo salsa balances blackened fish.","salsa-verde.html"],["PICO DE GALLO","Fresh tomato topping for spicy fish.","pico-de-gallo.html"]],
  "red-beans-rice-andouille.html":[["SALSA DE CHILE DE ÁRBOL","Hot chile salsa for beans and sausage.","salsa-chile-de-arbol.html"],["SALSA RANCHERA","Tomato-chile condiment for beans and rice.","salsa-ranchera.html"]],
  "locro.html":[["SALSA DE CHILE DE ÁRBOL","Optional hot chile condiment for stew.","salsa-chile-de-arbol.html"],["SALSA MACHA","Oil-based chile condiment for serving.","salsa-macha.html"]],
  "chivito.html":[["PICO DE GALLO","Optional fresh tomato-onion topping.","pico-de-gallo.html"],["SALSA TAQUERA","Optional spicy sandwich condiment.","salsa-taquera.html"]],
  "chivito-al-plato.html":[["PICO DE GALLO","Fresh topping alternative for steak and fries.","pico-de-gallo.html"],["SALSA VERDE","Bright tomatillo sauce for the steak.","salsa-verde.html"]],
  "pork-chop-milanese.html":[["ADOBO","Alternative chile-vinegar marinade before breading or grilling.","mexican-adobo.html"],["SALSA RANCHERA","Smoky tomato sauce pairing for pork.","salsa-ranchera.html"]],
  "osso-buco-red-wine.html":[["ADOBO","Alternative chile-vinegar braising direction for veal.","mexican-adobo.html"],["MOLE NEGRO","Optional deep chile-spice sauce for braised meat.","mole-negro.html"]],
  "provoleta.html":[["SALSA MACHA","Chile-oil condiment for grilled cheese.","salsa-macha.html"],["PICO DE GALLO","Fresh acidic topping for melted cheese.","pico-de-gallo.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=MEXICAN_SAUCE_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".mexican-sauce-tip")) return;
  const anchor=document.querySelector(".tomate-daughter-tip") || document.querySelector(".hollandaise-daughter-tip") || document.querySelector(".veloute-daughter-tip") || document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="mexican-sauce-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff8f0";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN SAUCE PAIRING</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See sauce →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const MEXICAN_SAUCE_LINKS_2 = {
  "tomatillo-avocado-salsa-cauliflower-rice.html":[["SALSA DE TOMATILLO","Direct tomatillo-salsa match.","salsa-tomatillo.html"],["SALSA DE AGUACATE","Creamy avocado-tomatillo variation.","salsa-aguacate.html"]],
  "lemon-tomatillo-salsa-verde.html":[["SALSA DE TOMATILLO","Direct reference for the classic tomatillo base.","salsa-tomatillo.html"]],
  "florentine-steak-balsamic-rosemary.html":[["SALSA DE GUAJILLO","Mild earthy chile sauce for grilled steak.","salsa-guajillo.html"],["SALSA BORRACHA","Traditional grilled-meat pairing.","salsa-borracha.html"],["SALSA MORITA","Smoky chile pairing for steak.","salsa-morita.html"],["SALSA DE MOLCAJETE","Rustic roasted salsa for grilled beef.","salsa-molcajete.html"]],
  "bife-de-chorizo-chimichurri.html":[["SALSA DE GUAJILLO","Optional mild chile sauce for grilled beef.","salsa-guajillo.html"],["SALSA BORRACHA","Classic barbacoa-style salsa pairing.","salsa-borracha.html"],["SALSA MORITA","Smoky alternative to chimichurri.","salsa-morita.html"]],
  "asado-argentino.html":[["SALSA BORRACHA","Especially suited to grilled meats.","salsa-borracha.html"],["SALSA DE MOLCAJETE","Rustic roasted salsa for the parrilla.","salsa-molcajete.html"]],
  "asado-uruguayo.html":[["SALSA BORRACHA","Optional grilled-meat salsa.","salsa-borracha.html"],["SALSA DE MOLCAJETE","Rustic charred salsa for beef and sausage.","salsa-molcajete.html"]],
  "pollo-a-la-parrilla.html":[["SALSA DE TOMATILLO","Bright green salsa for grilled chicken.","salsa-tomatillo.html"],["SALSA DE AGUACATE","Creamy cooling salsa for grilled chicken.","salsa-aguacate.html"],["SALSA MORITA","Smoky red chile sauce for chicken.","salsa-morita.html"],["SALSA XNI-PEC","Fresh Yucatecan habanero salsa for grilled poultry.","salsa-xni-pec.html"]],
  "mediterranean-lemon-shallot-chicken.html":[["SALSA DE GUAJILLO","Alternative chile-forward sauce direction.","salsa-guajillo.html"],["SALSA DE CHIPOTLE","Smoky tomato-chipotle pairing.","salsa-chipotle.html"]],
  "arroz-con-pollo-uruguayo.html":[["SALSA DE CHIPOTLE","Smoky salsa alongside chicken and rice.","salsa-chipotle.html"],["SALSA DE AGUACATE","Creamy topping for rice and chicken.","salsa-aguacate.html"]],
  "shrimp-piccata-skewers.html":[["SALSA DE TOMATILLO","Bright acidic salsa for grilled shrimp.","salsa-tomatillo.html"],["SALSA DE AGUACATE","Creamy avocado pairing.","salsa-aguacate.html"],["SALSA XNI-PEC","Fresh habanero-citrus topping.","salsa-xni-pec.html"]],
  "cajun-garlic-butter-shrimp.html":[["SALSA HABANERO","Very hot citrusy salsa for shrimp.","salsa-habanero.html"],["SALSA MORITA","Smoky chile pairing.","salsa-morita.html"]],
  "spicy-garlic-butter-shrimp-lime-chili-dip.html":[["SALSA HABANERO","Extra-hot citrus-forward pairing.","salsa-habanero.html"],["SALSA DE AGUACATE","Cooling creamy counterpoint.","salsa-aguacate.html"]],
  "blackened-redfish.html":[["SALSA XNI-PEC","Fresh citrus-habanero salsa cuts through blackened spice.","salsa-xni-pec.html"],["SALSA DE AGUACATE","Cooling creamy salsa for spicy fish.","salsa-aguacate.html"]],
  "pork-chop-milanese.html":[["SALSA DE GUAJILLO","Mild dried-chile sauce for pork.","salsa-guajillo.html"],["SALSA DE CACAHUATE","Nutty chile sauce pairs naturally with pork.","salsa-cacahuate.html"],["SALSA MORITA","Smoky chile sauce for pork.","salsa-morita.html"]],
  "locro.html":[["SALSA MORITA","Smoky chile condiment for pork-rich stew.","salsa-morita.html"],["SALSA DE CACAHUATE","Optional nutty chile condiment.","salsa-cacahuate.html"]],
  "red-beans-rice-andouille.html":[["SALSA DE CHIPOTLE","Smoky salsa for beans and sausage.","salsa-chipotle.html"],["SALSA MORITA","Smoky dried-chile pairing.","salsa-morita.html"]],
  "classic-american-hamburger.html":[["SALSA DE CHIPOTLE","Smoky burger topping.","salsa-chipotle.html"],["SALSA DE AGUACATE","Creamy avocado topping.","salsa-aguacate.html"],["SALSA DE MOLCAJETE","Rustic tomato-chile topping.","salsa-molcajete.html"]],
  "chivito.html":[["SALSA DE AGUACATE","Creamy topping variation.","salsa-aguacate.html"],["SALSA DE MOLCAJETE","Rustic grilled-meat salsa.","salsa-molcajete.html"]],
  "chivito-al-plato.html":[["SALSA DE MOLCAJETE","Charred salsa for steak and fries.","salsa-molcajete.html"],["SALSA XNI-PEC","Fresh habanero-citrus contrast.","salsa-xni-pec.html"]],
  "provoleta.html":[["SALSA MORITA","Smoky chile sauce for grilled cheese.","salsa-morita.html"],["SALSA DE CACAHUATE","Nutty spicy sauce for melted cheese.","salsa-cacahuate.html"]],
  "roasted-cauliflower.html":[["SALSA DE CACAHUATE","Nutty chile sauce for roasted vegetables.","salsa-cacahuate.html"],["SALSA DE AGUACATE","Creamy avocado salsa for roasted vegetables.","salsa-aguacate.html"]],
  "roasted-broccoli-lemon-almonds.html":[["SALSA DE CACAHUATE","Peanut chile sauce complements toasted nuts.","salsa-cacahuate.html"]],
  "osso-buco-red-wine.html":[["SALSA DE GUAJILLO","Optional chile-based sauce direction for braised meat.","salsa-guajillo.html"],["SALSA MORITA","Smoky alternative for braised veal.","salsa-morita.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=MEXICAN_SAUCE_LINKS_2[p];
  if(!refs || !refs.length || document.querySelector(".mexican-sauce-tip-2")) return;
  const anchor=document.querySelector(".mexican-sauce-tip") || document.querySelector(".tomate-daughter-tip") || document.querySelector(".hollandaise-daughter-tip") || document.querySelector(".veloute-daughter-tip") || document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="mexican-sauce-tip-2";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff8f0";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN SALSA PAIRING</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">See salsa →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const PERUVIAN_RECIPE_LINKS = {
  "lomo-saltado.html":[["MEAT GUIDE","High-heat searing and salting technique apply directly to the beef.","meat-guide.html"],["SALSA DE GUAJILLO","Optional mild chile sauce for the steak.","salsa-guajillo.html"],["SALSA DE MOLCAJETE","Optional roasted salsa for serving.","salsa-molcajete.html"]],
  "aji-de-gallina.html":[["SUPRÊME","Related cream-finished chicken-sauce technique.","supreme-sauce.html"],["SALSA DE AJÍ / SALSA VERDE","For a brighter chile contrast, serve a small amount alongside.","salsa-verde.html"]],
  "ceviche-peruano.html":[["SALSA XNI-PEC","Fresh habanero-citrus salsa is a natural optional pairing.","salsa-xni-pec.html"],["SALSA DE AGUACATE","Creamy avocado salsa can be served alongside.","salsa-aguacate.html"]],
  "pollo-a-la-brasa-peruano.html":[["MEAT GUIDE","Use the grilling, salting, and resting guidance for whole chicken.","meat-guide.html"],["SALSA VERDE","Bright tomatillo salsa for serving.","salsa-verde.html"],["SALSA DE AGUACATE","Cooling creamy salsa for grilled chicken.","salsa-aguacate.html"],["ADOBO","Related dried-chile marinade technique.","mexican-adobo.html"]],
  "arroz-con-mariscos-peruano.html":[["SEAFOOD PAIRING","Bright tomatillo salsa works well with seafood rice.","salsa-tomatillo.html"],["NORMANDE","Optional classical fish-stock cream-sauce reference.","normande-sauce.html"]],
  "seco-de-res.html":[["MEAT GUIDE","Braising and slow-cooking guidance apply directly to the beef.","meat-guide.html"],["SALSA DE GUAJILLO","Optional chile sauce for serving.","salsa-guajillo.html"],["SALSA BORRACHA","Optional grilled/braised meat condiment.","salsa-borracha.html"]],
  "tacu-tacu.html":[["SALSA CRIOLLA","Traditional bright onion-and-pepper accompaniment.","salsa-criolla.html"],["PICO DE GALLO","Fresh tomato-onion alternative.","pico-de-gallo.html"],["SALSA DE AGUACATE","Creamy topping option.","salsa-aguacate.html"]],
  "causa-rellena.html":[["SALSA DE AGUACATE","Avocado-based sauce complements the chilled potato layers.","salsa-aguacate.html"],["SALSA VERDE","Bright tomatillo sauce for a fresh contrast.","salsa-verde.html"]],
  "anticuchos-de-corazon.html":[["MEAT GUIDE","High-heat grilling, salting, and resting guidance apply.","meat-guide.html"],["SALSA DE GUAJILLO","Natural dried-chile accompaniment.","salsa-guajillo.html"],["SALSA MORITA","Smoky chile salsa for grilled heart.","salsa-morita.html"],["SALSA BORRACHA","Traditional grilled-meat style pairing.","salsa-borracha.html"]],
  "carapulcra.html":[["MEAT GUIDE","Slow-cooking and braising guidance apply to the pork.","meat-guide.html"],["SALSA DE CACAHUATE","Related peanut-chile flavor profile.","salsa-cacahuate.html"],["SALSA MORITA","Smoky chile condiment for serving.","salsa-morita.html"]],
  "salsa-criolla.html":[["TACU TACU","Classic accompaniment.","tacu-tacu.html"],["CARAPULCRA","Traditional bright side for the stew.","carapulcra.html"]],
  "pollo-a-la-parrilla.html":[["POLLO A LA BRASA","Compare with Peru's rotisserie-style marinated chicken.","pollo-a-la-brasa-peruano.html"]],
  "bife-de-chorizo-chimichurri.html":[["LOMO SALTADO","Compare a different South American steak tradition using high-heat stir-frying.","lomo-saltado.html"]],
  "creamy-seafood-risotto.html":[["ARROZ CON MARISCOS","Compare with Peru's ají-seasoned seafood rice.","arroz-con-mariscos-peruano.html"]],
  "shrimp-creole.html":[["ARROZ CON MARISCOS","Related seafood-and-rice flavor direction.","arroz-con-mariscos-peruano.html"]],
  "red-beans-rice-andouille.html":[["TACU TACU","Compare another rice-and-bean tradition.","tacu-tacu.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=PERUVIAN_RECIPE_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".peruvian-crossref-tip")) return;
  const anchor=document.querySelector(".mexican-sauce-tip-2") || document.querySelector(".mexican-sauce-tip") || document.querySelector(".tomate-daughter-tip") || document.querySelector(".hollandaise-daughter-tip") || document.querySelector(".veloute-daughter-tip") || document.querySelector(".daughter-sauce-tip") || document.querySelector(".mother-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="peruvian-crossref-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f8f6ef";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">PERUVIAN RECIPE CROSS-REFERENCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">View →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const PERUVIAN_SIDE_LINKS = {
  "papas-a-la-huancaina.html":[["CAUSA LIMEÑA","Another classic ají amarillo potato preparation.","causa-limena.html"],["CAUSA RELLENA","Compare a filled chilled potato preparation.","causa-rellena.html"],["AJÍ DE GALLINA","Shares the creamy ají amarillo flavor profile.","aji-de-gallina.html"]],
  "causa-limena.html":[["CAUSA RELLENA","Closely related layered potato preparation.","causa-rellena.html"],["SALSA DE AGUACATE","Avocado salsa works as an optional accompaniment.","salsa-aguacate.html"]],
  "yuca-frita.html":[["SALSA CRIOLLA","Bright onion relish for fried yuca.","salsa-criolla.html"],["SALSA DE AGUACATE","Creamy dipping sauce.","salsa-aguacate.html"],["POLLO A LA BRASA","Classic side option with roast chicken.","pollo-a-la-brasa-peruano.html"],["ANTICUCHOS","Excellent side for grilled skewers.","anticuchos-de-corazon.html"]],
  "arroz-peruano.html":[["SECO DE RES","Classic rice accompaniment.","seco-de-res.html"],["AJÍ DE GALLINA","Traditional side.","aji-de-gallina.html"],["CARAPULCRA","Ideal starch for the stew.","carapulcra.html"],["POLLO A LA BRASA","Simple rice side for roast chicken.","pollo-a-la-brasa-peruano.html"]],
  "solterito-arequipeno.html":[["ANTICUCHOS","Fresh salad alongside grilled meats.","anticuchos-de-corazon.html"],["SECO DE RES","Bright vegetable side for the braise.","seco-de-res.html"],["CHOCLO CON QUESO","Shares choclo and queso fresco ingredients.","choclo-con-queso.html"]],
  "ensalada-criolla-peruana.html":[["ANTICUCHOS","Classic bright accompaniment to grilled meat.","anticuchos-de-corazon.html"],["SECO DE RES","Fresh acidic side for the braise.","seco-de-res.html"],["CARAPULCRA","Cuts through the rich pork-and-peanut stew.","carapulcra.html"],["POLLO A LA BRASA","Fresh side for roast chicken.","pollo-a-la-brasa-peruano.html"],["TACU TACU","Natural onion-tomato accompaniment.","tacu-tacu.html"]],
  "choclo-con-queso.html":[["CEVICHE PERUANO","Classic accompaniment to ceviche.","ceviche-peruano.html"],["ANTICUCHOS","Traditional side for grilled skewers.","anticuchos-de-corazon.html"],["SOLTERITO AREQUIPEÑO","Shares choclo and queso fresco.","solterito-arequipeno.html"]],
  "papa-rellena-peruana.html":[["SALSA CRIOLLA","Traditional accompaniment.","salsa-criolla.html"],["ENSALADA CRIOLLA","Fresh onion-tomato side.","ensalada-criolla-peruana.html"],["SALSA DE AJÍ","Optional spicy salsa pairing.","salsa-roja.html"]],
  "tamal-peruano.html":[["SALSA CRIOLLA","Classic fresh accompaniment.","salsa-criolla.html"],["SALSA DE GUAJILLO","Dried-chile sauce pairs with pork or chicken filling.","salsa-guajillo.html"],["ADOBO","Related chile-and-spice flavor profile.","mexican-adobo.html"]],
  "camote-frito.html":[["CEVICHE PERUANO","Classic sweet-potato accompaniment.","ceviche-peruano.html"],["POLLO A LA BRASA","Crisp sweet-potato side for roast chicken.","pollo-a-la-brasa-peruano.html"],["ANTICUCHOS","Sweet counterpoint to smoky grilled beef heart.","anticuchos-de-corazon.html"]],
  "ceviche-peruano.html":[["CAMOTE FRITO","Classic sweet accompaniment.","camote-frito.html"],["CHOCLO CON QUESO","Choclo is a traditional ceviche side.","choclo-con-queso.html"]],
  "pollo-a-la-brasa-peruano.html":[["YUCA FRITA","Crisp cassava side.","yuca-frita.html"],["ARROZ PERUANO","Simple garlic rice side.","arroz-peruano.html"],["ENSALADA CRIOLLA","Fresh acidic side.","ensalada-criolla-peruana.html"],["CAMOTE FRITO","Sweet-potato alternative to fries.","camote-frito.html"]],
  "anticuchos-de-corazon.html":[["YUCA FRITA","Crisp cassava accompaniment.","yuca-frita.html"],["CHOCLO CON QUESO","Traditional corn-and-cheese side.","choclo-con-queso.html"],["ENSALADA CRIOLLA","Fresh acidic garnish.","ensalada-criolla-peruana.html"]],
  "seco-de-res.html":[["ARROZ PERUANO","Classic accompaniment.","arroz-peruano.html"],["ENSALADA CRIOLLA","Bright side for the cilantro braise.","ensalada-criolla-peruana.html"]],
  "carapulcra.html":[["ARROZ PERUANO","Ideal side for the stew.","arroz-peruano.html"],["ENSALADA CRIOLLA","Fresh counterpoint to rich pork and peanuts.","ensalada-criolla-peruana.html"]],
  "tacu-tacu.html":[["ENSALADA CRIOLLA","Fresh onion-tomato accompaniment.","ensalada-criolla-peruana.html"]],
  "aji-de-gallina.html":[["PAPAS A LA HUANCAÍNA","Related creamy ají amarillo preparation.","papas-a-la-huancaina.html"],["ARROZ PERUANO","Traditional rice accompaniment.","arroz-peruano.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=PERUVIAN_SIDE_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".peruvian-side-tip")) return;
  const anchor=document.querySelector(".peruvian-crossref-tip") || document.querySelector(".mexican-sauce-tip-2") || document.querySelector(".mexican-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="peruvian-side-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f5f8f2";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">PERUVIAN PAIRING</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">View →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const MEXICAN_MAIN_LINKS = {
  "tacos-al-pastor.html":[["MEAT GUIDE","Grilling, salting, and browning guidance apply to the pork.","meat-guide.html"],["ADOBO","The pork marinade is closely related to Mexican adobo.","mexican-adobo.html"],["SALSA DE GUAJILLO","Guajillo is central to the marinade and makes a natural table salsa.","salsa-guajillo.html"],["SALSA TAQUERA","Classic taco-shop pairing.","salsa-taquera.html"],["SALSA DE CHILE DE ÁRBOL","Traditional hot salsa pairing.","salsa-chile-de-arbol.html"]],
  "birria.html":[["MEAT GUIDE","Braising and slow-cooking techniques apply directly.","meat-guide.html"],["SALSA DE GUAJILLO","Direct chile-family match.","salsa-guajillo.html"],["SALSA MORITA","Smoky table salsa for birria tacos.","salsa-morita.html"],["SALSA BORRACHA","Optional robust meat-salsa pairing.","salsa-borracha.html"]],
  "mole-poblano-con-pollo.html":[["MOLE POBLANO","Uses the full Mole Poblano sauce recipe.","mole-poblano.html"],["ARROZ PERUANO","A simple garlic rice is an optional side if Mexican rice is not being served.","arroz-peruano.html"],["MEAT GUIDE","Poultry temperature and resting guidance apply.","meat-guide.html"]],
  "cochinita-pibil.html":[["MEAT GUIDE","Slow-roasting and resting guidance apply to pork shoulder.","meat-guide.html"],["SALSA XNI-PEC","Classic Yucatán pairing.","salsa-xni-pec.html"],["SALSA HABANERO","Natural regional hot-sauce pairing.","salsa-habanero.html"],["PICO DE GALLO","Milder fresh alternative.","pico-de-gallo.html"]],
  "carnitas.html":[["MEAT GUIDE","Slow cooking followed by crisping is the core technique.","meat-guide.html"],["SALSA VERDE","Classic carnitas pairing.","salsa-verde.html"],["SALSA ROJA","Classic red-salsa option.","salsa-roja.html"],["SALSA DE MOLCAJETE","Rustic roasted salsa for tacos.","salsa-molcajete.html"]],
  "barbacoa.html":[["MEAT GUIDE","Low-and-slow braising guidance applies directly.","meat-guide.html"],["SALSA BORRACHA","Traditional robust meat pairing.","salsa-borracha.html"],["SALSA DE GUAJILLO","Natural dried-chile accompaniment.","salsa-guajillo.html"],["SALSA DE MOLCAJETE","Rustic table salsa for barbacoa tacos.","salsa-molcajete.html"]],
  "chile-relleno.html":[["SALSA RANCHERA","Classic sauce for serving chile relleno.","salsa-ranchera.html"],["SALSA ROJA","Alternative red tomato-chile sauce.","salsa-roja.html"],["PICO DE GALLO","Fresh side garnish.","pico-de-gallo.html"]],
  "enchiladas-rojas.html":[["SALSA ROJA","Direct sauce-family match.","salsa-roja.html"],["SALSA DE GUAJILLO","Guajillo-based sauce is the core red enchilada flavor.","salsa-guajillo.html"],["SALSA DE CHILE DE ÁRBOL","Optional extra heat.","salsa-chile-de-arbol.html"]],
  "enchiladas-verdes.html":[["SALSA VERDE","Direct sauce-family match.","salsa-verde.html"],["SALSA DE TOMATILLO","Tomatillo is the defining base.","salsa-tomatillo.html"],["SALSA DE AGUACATE","Optional creamy garnish.","salsa-aguacate.html"]],
  "pozole-rojo.html":[["MEAT GUIDE","Long, gentle pork cooking guidance applies.","meat-guide.html"],["SALSA DE GUAJILLO","Direct chile-family match for the broth.","salsa-guajillo.html"],["SALSA DE CHILE DE ÁRBOL","Traditional table condiment for extra heat.","salsa-chile-de-arbol.html"],["SALSA MORITA","Smoky optional garnish.","salsa-morita.html"]],
  "salsa-guajillo.html":[["TACOS AL PASTOR","Guajillo is central to the pastor marinade.","tacos-al-pastor.html"],["BIRRIA","Core dried-chile flavor in the braise.","birria.html"],["ENCHILADAS ROJAS","Classic red enchilada base.","enchiladas-rojas.html"],["POZOLE ROJO","Key chile for the red broth.","pozole-rojo.html"]],
  "salsa-xni-pec.html":[["COCHINITA PIBIL","Classic Yucatán accompaniment.","cochinita-pibil.html"]],
  "salsa-verde.html":[["CARNITAS","Classic taco pairing.","carnitas.html"],["ENCHILADAS VERDES","Direct use case.","enchiladas-verdes.html"]],
  "salsa-ranchera.html":[["CHILE RELLENO","Classic serving sauce.","chile-relleno.html"]],
  "mole-poblano.html":[["MOLE POBLANO CON POLLO","Direct dish application.","mole-poblano-con-pollo.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=MEXICAN_MAIN_LINKS[p];
  if(!refs || !refs.length || document.querySelector(".mexican-main-tip")) return;
  const anchor=document.querySelector(".peruvian-side-tip") || document.querySelector(".peruvian-crossref-tip") || document.querySelector(".mexican-sauce-tip-2") || document.querySelector(".mexican-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="mexican-main-tip";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff7ec";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN RECIPE CROSS-REFERENCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">View →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const MEXICAN_MAIN_LINKS_2 = {
  "chiles-en-nogada.html":[["MEAT GUIDE","Ground-meat browning technique applies to the picadillo.","meat-guide.html"],["PICO DE GALLO","Optional fresh side, though the walnut sauce should remain the focus.","pico-de-gallo.html"]],
  "carne-asada.html":[["MEAT GUIDE","Salting, grilling, resting, and slicing guidance apply directly.","meat-guide.html"],["SALSA TAQUERA","Classic steak-taco pairing.","salsa-taquera.html"],["SALSA DE MOLCAJETE","Rustic grilled-meat salsa.","salsa-molcajete.html"],["SALSA MORITA","Smoky salsa for charred beef.","salsa-morita.html"],["SALSA DE AGUACATE","Cooling creamy topping.","salsa-aguacate.html"]],
  "pescado-a-la-veracruzana.html":[["PROVENÇALE","Related tomato, olive, caper, and herb flavor family.","provencale-sauce.html"],["SAUCE TOMATE","Classical tomato-sauce reference.","sauce-tomate.html"],["SALSA XNI-PEC","Optional citrus-habanero contrast.","salsa-xni-pec.html"]],
  "tacos-de-pescado.html":[["SALSA VERDE","Bright tomatillo salsa for fish tacos.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy avocado salsa.","salsa-aguacate.html"],["PICO DE GALLO","Classic fresh taco topping.","pico-de-gallo.html"],["SALSA XNI-PEC","Hot citrusy topping.","salsa-xni-pec.html"]],
  "pollo-en-mole-negro.html":[["MOLE NEGRO","Direct sauce application.","mole-negro.html"],["MEAT GUIDE","Poultry temperature and resting guidance apply.","meat-guide.html"]],
  "costillas-en-chile-colorado.html":[["MEAT GUIDE","Braising and slow-cooking guidance apply to the ribs.","meat-guide.html"],["SALSA DE GUAJILLO","Direct chile-family match.","salsa-guajillo.html"],["ADOBO","Related dried-chile braising profile.","mexican-adobo.html"]],
  "enfrijoladas.html":[["SALSA DE CHIPOTLE","Smoky bean-sauce variation.","salsa-chipotle.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"],["TACU TACU","Compare another rice-and-bean tradition.","tacu-tacu.html"]],
  "tinga-de-pollo.html":[["SALSA DE CHIPOTLE","Direct smoky chile-family match.","salsa-chipotle.html"],["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"],["PICO DE GALLO","Fresh tostada topping.","pico-de-gallo.html"]],
  "tamales-mexicanos.html":[["SALSA ROJA","Direct red-chile serving sauce.","salsa-roja.html"],["SALSA VERDE","Classic green-salsa alternative.","salsa-verde.html"],["SALSA DE GUAJILLO","Natural chile sauce for red tamales.","salsa-guajillo.html"],["TAMAL PERUANO","Compare with the Peruvian tamal tradition.","tamal-peruano.html"]],
  "cabrito-al-pastor.html":[["MEAT GUIDE","Slow roasting, grilling, and resting guidance apply directly.","meat-guide.html"],["SALSA BORRACHA","Excellent northern-style grilled-meat pairing.","salsa-borracha.html"],["SALSA DE MOLCAJETE","Rustic salsa for roast goat.","salsa-molcajete.html"],["SALSA DE GUAJILLO","Mild dried-chile accompaniment.","salsa-guajillo.html"]],
  "mole-negro.html":[["POLLO EN MOLE NEGRO","Direct dish application.","pollo-en-mole-negro.html"]],
  "salsa-chipotle.html":[["TINGA DE POLLO","Direct smoky tomato-chipotle use case.","tinga-de-pollo.html"],["ENFRIJOLADAS","Optional smoky bean-sauce variation.","enfrijoladas.html"]],
  "salsa-guajillo.html":[["COSTILLAS EN CHILE COLORADO","Guajillo is central to the red chile braise.","costillas-en-chile-colorado.html"],["TAMALES","Natural sauce for red tamales.","tamales-mexicanos.html"],["CABRITO AL PASTOR","Optional dried-chile accompaniment.","cabrito-al-pastor.html"]],
  "salsa-molcajete.html":[["CARNE ASADA","Classic grilled-beef pairing.","carne-asada.html"],["CABRITO AL PASTOR","Rustic salsa for roast goat.","cabrito-al-pastor.html"]],
  "salsa-verde.html":[["TACOS DE PESCADO","Classic fish-taco pairing.","tacos-de-pescado.html"],["TAMALES","Classic green-salsa serving option.","tamales-mexicanos.html"]],
  "pico-de-gallo.html":[["TACOS DE PESCADO","Classic fresh topping.","tacos-de-pescado.html"],["TINGA DE POLLO","Fresh tostada topping.","tinga-de-pollo.html"],["ENFRIJOLADAS","Fresh contrast to bean sauce.","enfrijoladas.html"]]
};
(function(){
  const p=(location.pathname.split("/").pop()||"index.html").toLowerCase();
  const refs=MEXICAN_MAIN_LINKS_2[p];
  if(!refs || !refs.length || document.querySelector(".mexican-main-tip-2")) return;
  const anchor=document.querySelector(".mexican-main-tip") || document.querySelector(".peruvian-side-tip") || document.querySelector(".peruvian-crossref-tip") || document.querySelector(".mexican-sauce-tip-2") || document.querySelector(".mexican-sauce-tip") || document.querySelector(".print-button");
  if(!anchor) return;
  const wrap=document.createElement("div");
  wrap.className="mexican-main-tip-2";
  wrap.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff6e8";
  wrap.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN RECIPE CROSS-REFERENCE</p>'+refs.map(r=>'<p style="margin:0 0 7px"><strong>'+r[0]+':</strong> '+r[1]+' <a class="text-link" href="'+r[2]+'">View →</a></p>').join('');
  anchor.insertAdjacentElement("afterend",wrap);
})();

const MEXICAN_TACO_LINKS_V2={
"tacos-de-adobada.html":[["ADOBO","Direct marinade match.","mexican-adobo.html"],["SALSA DE GUAJILLO","Natural chile pairing.","salsa-guajillo.html"],["SALSA TAQUERA","Classic taco-shop salsa.","salsa-taquera.html"]],
"tacos-de-bistec.html":[["MEAT GUIDE","High-heat searing and slicing guidance.","meat-guide.html"],["SALSA TAQUERA","Classic steak-taco salsa.","salsa-taquera.html"],["SALSA DE MOLCAJETE","Rustic grilled-beef pairing.","salsa-molcajete.html"]],
"tacos-de-alambre.html":[["MEAT GUIDE","Griddle browning applies directly.","meat-guide.html"],["SALSA ROJA","Classic red-salsa topping.","salsa-roja.html"],["SALSA DE AGUACATE","Cooling creamy topping.","salsa-aguacate.html"]],
"tacos-de-pastor-negro.html":[["ADOBO","Related dark chile marinade.","mexican-adobo.html"],["SALSA MORITA","Smoky pairing.","salsa-morita.html"],["SALSA DE CHILE DE ÁRBOL","Hot taquería pairing.","salsa-chile-de-arbol.html"]],
"tacos-de-mixiote.html":[["MEAT GUIDE","Slow cooking applies directly.","meat-guide.html"],["ADOBO","Direct dried-chile marinade connection.","mexican-adobo.html"],["SALSA DE GUAJILLO","Natural pairing.","salsa-guajillo.html"]],
"tacos-de-machaca.html":[["SALSA RANCHERA","Classic northern pairing.","salsa-ranchera.html"],["SALSA DE MOLCAJETE","Rustic salsa for beef tacos.","salsa-molcajete.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-de-discada.html":[["MEAT GUIDE","High-heat griddle browning applies.","meat-guide.html"],["SALSA MORITA","Smoky mixed-meat pairing.","salsa-morita.html"],["SALSA BORRACHA","Robust northern-style pairing.","salsa-borracha.html"]],
"tacos-de-lechon.html":[["MEAT GUIDE","Slow roasting and crisping apply.","meat-guide.html"],["SALSA XNI-PEC","Citrus-habanero pairing.","salsa-xni-pec.html"],["SALSA HABANERO","Hot pork accompaniment.","salsa-habanero.html"]],
"tacos-de-buche.html":[["MEAT GUIDE","Gentle cooking then griddle crisping.","meat-guide.html"],["SALSA TAQUERA","Classic taquería condiment.","salsa-taquera.html"],["SALSA DE CHILE DE ÁRBOL","Classic hot pairing.","salsa-chile-de-arbol.html"]],
"tacos-de-cachete.html":[["MEAT GUIDE","Low-and-slow braising is key.","meat-guide.html"],["SALSA VERDE","Bright contrast for rich beef.","salsa-verde.html"],["SALSA BORRACHA","Robust meat pairing.","salsa-borracha.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_TACO_LINKS_V2[p];if(!r||document.querySelector(".mexican-taco-tip"))return;const a=document.querySelector(".mexican-main-tip-2")||document.querySelector(".mexican-main-tip")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mexican-taco-tip";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff5e6";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_TACO_LINKS_V3={
"tacos-de-labio.html":[["MEAT GUIDE","Low-and-slow braising is the key technique.","meat-guide.html"],["SALSA VERDE","Bright contrast for rich beef.","salsa-verde.html"],["TACOS DE CACHETE","Closely related cabeza-style taco.","tacos-de-cachete.html"]],
"tacos-de-sesos.html":[["MEAT GUIDE","Gentle cooking and careful temperature control matter here.","meat-guide.html"],["SALSA VERDE","Bright classic pairing.","salsa-verde.html"],["SALSA DE CHILE DE ÁRBOL","Traditional hot taco salsa.","salsa-chile-de-arbol.html"]],
"tacos-de-chicharron.html":[["SALSA ROJA","Classic sauce for chicharrón en salsa.","salsa-roja.html"],["SALSA VERDE","Classic green alternative.","salsa-verde.html"]],
"tacos-de-chicharron-prensado.html":[["SALSA DE GUAJILLO","Direct chile-family match for the braising sauce.","salsa-guajillo.html"],["SALSA ROJA","Related red-salsa base.","salsa-roja.html"]],
"tacos-de-longaniza.html":[["SALSA MORITA","Smoky pairing for sausage.","salsa-morita.html"],["SALSA TAQUERA","Classic taco-shop condiment.","salsa-taquera.html"],["SALSA DE MOLCAJETE","Rustic roasted salsa.","salsa-molcajete.html"]],
"tacos-de-pollo-asado.html":[["MEAT GUIDE","Grilling, salting, and resting apply directly.","meat-guide.html"],["SALSA VERDE","Bright grilled-chicken pairing.","salsa-verde.html"],["SALSA DE AGUACATE","Cooling creamy topping.","salsa-aguacate.html"],["POLLO A LA BRASA","Compare another deeply seasoned grilled chicken.","pollo-a-la-brasa-peruano.html"]],
"tacos-de-tinga.html":[["TINGA DE POLLO","Direct parent recipe.","tinga-de-pollo.html"],["SALSA DE CHIPOTLE","Direct smoky chile match.","salsa-chipotle.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-de-mole.html":[["MOLE POBLANO","Primary sauce option.","mole-poblano.html"],["MOLE NEGRO","Alternative darker Oaxacan sauce.","mole-negro.html"],["MOLE POBLANO CON POLLO","Direct related dish.","mole-poblano-con-pollo.html"]],
"tacos-de-chile-relleno.html":[["CHILE RELLENO","Direct parent dish.","chile-relleno.html"],["SALSA RANCHERA","Classic chile relleno sauce.","salsa-ranchera.html"],["SALSA ROJA","Alternative red sauce.","salsa-roja.html"]],
"tacos-de-papa.html":[["SALSA ROJA","Classic crisp potato taco topping.","salsa-roja.html"],["SALSA VERDE","Bright green alternative.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_TACO_LINKS_V3[p];if(!r||document.querySelector(".mexican-taco-tip-v3"))return;const a=document.querySelector(".mexican-taco-tip")||document.querySelector(".mexican-main-tip-2")||document.querySelector(".mexican-main-tip")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mexican-taco-tip-v3";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff5e6";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_TACO_LINKS_V4={
"tacos-frijoles-queso.html":[["ENFRIJOLADAS","Related black-bean tortilla dish.","enfrijoladas.html"],["SALSA VERDE","Classic bright topping.","salsa-verde.html"],["SALSA ROJA","Classic red topping.","salsa-roja.html"]],
"tacos-flor-calabaza.html":[["PICO DE GALLO","Fresh topping for squash-blossom tacos.","pico-de-gallo.html"],["SALSA VERDE","Bright tomatillo pairing.","salsa-verde.html"],["TACOS DE HUITLACOCHE","Related milpa-style vegetarian taco.","tacos-huitlacoche.html"]],
"tacos-huitlacoche.html":[["MUSHROOM GUIDE","Huitlacoche is a fungus; the moisture and browning principles are useful here.","mushroom-guide.html"],["TACOS DE HONGOS","Compare another mushroom taco.","tacos-hongos.html"],["SALSA VERDE","Bright contrast for earthy huitlacoche.","salsa-verde.html"]],
"tacos-hongos.html":[["MUSHROOM GUIDE","Use the high-heat, uncrowded-pan method for better browning.","mushroom-guide.html"],["SALSA DE GUAJILLO","Earthy chile pairing.","salsa-guajillo.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"]],
"tacos-pulpo.html":[["SALSA MACHA","Chile-oil pairing for charred octopus.","salsa-macha.html"],["SALSA VERDE","Bright seafood pairing.","salsa-verde.html"],["TACOS DE PESCADO","Compare another seafood taco.","tacos-de-pescado.html"]],
"tacos-marlin-ahumado.html":[["SALSA DE GUAJILLO","Natural smoky-fish pairing.","salsa-guajillo.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"],["PICO DE GALLO","Fresh tomato-onion topping.","pico-de-gallo.html"]],
"tacos-pescado-zarandeado.html":[["SALSA VERDE","Direct serving pairing.","salsa-verde.html"],["PICO DE GALLO","Direct serving pairing.","pico-de-gallo.html"],["SALSA DE AGUACATE","Optional creamy topping.","salsa-aguacate.html"],["TACOS DE PESCADO","Compare the simpler fish taco.","tacos-de-pescado.html"]],
"tacos-jaiba.html":[["SALSA XNI-PEC","Citrus-habanero pairing for crab.","salsa-xni-pec.html"],["SALSA DE AGUACATE","Creamy seafood topping.","salsa-aguacate.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-langosta.html":[["SALSA VERDE","Classic bright lobster pairing.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy Baja-style topping.","salsa-aguacate.html"],["SALSA DE CHILE DE ÁRBOL","Hot chile contrast.","salsa-chile-de-arbol.html"]],
"tacos-chapulines.html":[["SALSA DE MOLCAJETE","Rustic roasted salsa pairing.","salsa-molcajete.html"],["SALSA VERDE","Bright green salsa pairing.","salsa-verde.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_TACO_LINKS_V4[p];if(!r||document.querySelector(".mexican-taco-tip-v4"))return;const a=document.querySelector(".mexican-taco-tip-v3")||document.querySelector(".mexican-taco-tip")||document.querySelector(".mexican-main-tip-2")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mexican-taco-tip-v4";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff5e6";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_FISH_TACO_LINKS={
"baja-fish-tacos.html":[["TACOS DE PESCADO","Compare the simpler base fish taco.","tacos-de-pescado.html"],["TACOS DE PESCADO ENSENADA","Closely related Baja fried-fish style.","tacos-pescado-ensenada.html"],["PICO DE GALLO","Classic fresh topping.","pico-de-gallo.html"],["SALSA DE AGUACATE","Creamy Baja-style topping.","salsa-aguacate.html"]],
"tacos-pescado-capeado.html":[["BAJA FISH TACOS","Related beer-battered technique.","baja-fish-tacos.html"],["SALSA VERDE","Bright fried-fish pairing.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"]],
"tacos-pescado-plancha.html":[["TACOS DE PESCADO","Related non-battered fish taco.","tacos-de-pescado.html"],["SALSA VERDE","Classic grilled-fish pairing.","salsa-verde.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-pescado-pastor.html":[["TACOS AL PASTOR","Direct inspiration for the marinade.","tacos-al-pastor.html"],["SALSA DE GUAJILLO","Guajillo-based pairing.","salsa-guajillo.html"],["SALSA TAQUERA","Classic taco salsa.","salsa-taquera.html"]],
"tacos-pescado-ajillo.html":[["SALSA DE GUAJILLO","Guajillo reinforces the ajillo flavor.","salsa-guajillo.html"],["SALSA DE AGUACATE","Creamy contrast.","salsa-aguacate.html"],["TACOS PESCADO PLANCHA","Compare another quick high-heat fish taco.","tacos-pescado-plancha.html"]],
"tacos-pescado-ensenada.html":[["BAJA FISH TACOS","Closely related Baja fried-fish style.","baja-fish-tacos.html"],["PICO DE GALLO","Classic fresh topping.","pico-de-gallo.html"],["SALSA ROJA","Traditional red-salsa option.","salsa-roja.html"]],
"tacos-pescado-tikin-xic.html":[["SALSA XNI-PEC","Classic Yucatán pairing.","salsa-xni-pec.html"],["SALSA HABANERO","Regional hot-sauce pairing.","salsa-habanero.html"],["COCHINITA PIBIL","Compare the same achiote-sour-orange flavor family.","cochinita-pibil.html"]],
"tacos-pescado-adobado.html":[["ADOBO","Direct marinade reference.","mexican-adobo.html"],["SALSA DE GUAJILLO","Natural red-chile pairing.","salsa-guajillo.html"],["SALSA DE AGUACATE","Cooling topping.","salsa-aguacate.html"]],
"tacos-pescado-ahumado.html":[["TACOS DE MARLÍN AHUMADO","Closest related smoked-fish taco.","tacos-marlin-ahumado.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"],["SALSA MORITA","Smoky chile pairing.","salsa-morita.html"]],
"tacos-pescado-veracruzana.html":[["PESCADO A LA VERACRUZANA","Direct parent dish.","pescado-a-la-veracruzana.html"],["PROVENÇALE","Related tomato-olive-caper sauce family.","provencale-sauce.html"],["SAUCE TOMATE","Classical tomato-sauce reference.","sauce-tomate.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_FISH_TACO_LINKS[p];if(!r||document.querySelector(".mexican-fish-taco-tip"))return;const a=document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".mexican-taco-tip-v3")||document.querySelector(".mexican-taco-tip")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mexican-fish-taco-tip";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#eef8fb";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">FISH TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_SHRIMP_OCTOPUS_TACO_LINKS={
"tacos-camaron-capeado.html":[["BAJA FISH TACOS","Related battered-seafood technique.","baja-fish-tacos.html"],["SALSA VERDE","Bright fried-seafood pairing.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"]],
"tacos-camaron-ajillo.html":[["TACOS DE PESCADO AL AJILLO","Same garlic-guajillo technique applied to fish.","tacos-pescado-ajillo.html"],["SALSA DE GUAJILLO","Direct chile pairing.","salsa-guajillo.html"],["SALSA DE AGUACATE","Creamy contrast.","salsa-aguacate.html"]],
"tacos-camaron-diabla.html":[["SALSA DE CHILE DE ÁRBOL","Core high-heat chile profile.","salsa-chile-de-arbol.html"],["SALSA ROJA","Related red-sauce family.","salsa-roja.html"],["SALSA DE AGUACATE","Cooling topping.","salsa-aguacate.html"]],
"tacos-camaron-pastor.html":[["TACOS DE PESCADO AL PASTOR","Related seafood pastor preparation.","tacos-pescado-pastor.html"],["TACOS AL PASTOR","Original pastor flavor family.","tacos-al-pastor.html"],["SALSA DE GUAJILLO","Natural chile pairing.","salsa-guajillo.html"]],
"tacos-camaron-queso.html":[["TACOS DE ALAMBRE","Related meat-and-melted-cheese taco structure.","tacos-de-alambre.html"],["SALSA DE AGUACATE","Creamy seafood pairing.","salsa-aguacate.html"],["SALSA ROJA","Classic red topping.","salsa-roja.html"]],
"tacos-camaron-empanizado.html":[["TACOS DE CAMARÓN CAPEADO","Compare battered vs breaded shrimp.","tacos-camaron-capeado.html"],["SALSA VERDE","Bright fried-seafood pairing.","salsa-verde.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-camaron-plancha.html":[["TACOS DE PESCADO A LA PLANCHA","Same high-heat plancha technique for fish.","tacos-pescado-plancha.html"],["SALSA VERDE","Classic pairing.","salsa-verde.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-camaron-gobernador.html":[["TACOS DE CAMARÓN CON QUESO","Related shrimp-and-cheese taco.","tacos-camaron-queso.html"],["SALSA DE AGUACATE","Creamy Sinaloa-style pairing.","salsa-aguacate.html"],["SALSA VERDE","Bright topping.","salsa-verde.html"]],
"tacos-pulpo-ajillo.html":[["TACOS DE PULPO","Parent octopus taco.","tacos-pulpo.html"],["TACOS DE PESCADO AL AJILLO","Related garlic-guajillo seafood technique.","tacos-pescado-ajillo.html"],["SALSA MACHA","Chile-oil pairing.","salsa-macha.html"]],
"tacos-pulpo-parrilla.html":[["TACOS DE PULPO","Parent octopus taco.","tacos-pulpo.html"],["SALSA VERDE","Bright grilled-seafood pairing.","salsa-verde.html"],["SALSA MACHA","Smoky chile-oil pairing.","salsa-macha.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_SHRIMP_OCTOPUS_TACO_LINKS[p];if(!r||document.querySelector(".shrimp-octopus-taco-tip"))return;const a=document.querySelector(".mexican-fish-taco-tip")||document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".mexican-taco-tip-v3")||document.querySelector(".mexican-taco-tip")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="shrimp-octopus-taco-tip";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#eef8fb";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">SEAFOOD TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_SEAFOOD_TACO_LINKS_V2={
"tacos-pulpo-enamorado.html":[["TACOS DE PULPO","Parent octopus taco.","tacos-pulpo.html"],["TACOS DE PULPO A LA PARRILLA","Compare a charred preparation.","tacos-pulpo-parrilla.html"],["SALSA DE AGUACATE","Creamy seafood pairing.","salsa-aguacate.html"]],
"tacos-calamar.html":[["TACOS DE CALAMAR FRITO","Compare quick-seared vs fried squid.","tacos-calamar-frito.html"],["SALSA VERDE","Bright pairing.","salsa-verde.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"]],
"tacos-calamar-frito.html":[["TACOS DE CALAMAR","Compare fried vs seared squid.","tacos-calamar.html"],["SALSA DE CHILE DE ÁRBOL","Hot crisp-seafood pairing.","salsa-chile-de-arbol.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-atun-sellado.html":[["SALSA MACHA","Chile-oil pairing for seared tuna.","salsa-macha.html"],["SALSA DE AGUACATE","Creamy topping.","salsa-aguacate.html"],["TACOS DE ATÚN CON AGUACATE","Closely related tuna taco.","tacos-atun-aguacate.html"]],
"tacos-atun-aguacate.html":[["TACOS DE ATÚN SELLADO","Compare a more seared presentation.","tacos-atun-sellado.html"],["SALSA DE AGUACATE","Direct flavor pairing.","salsa-aguacate.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"tacos-cazon.html":[["PESCADO A LA VERACRUZANA","Related tomato-fish preparation.","pescado-a-la-veracruzana.html"],["SALSA ROJA","Natural red-salsa pairing.","salsa-roja.html"],["SALSA VERDE","Bright alternative.","salsa-verde.html"]],
"tacos-mantaraya.html":[["SALSA DE GUAJILLO","Direct dried-chile pairing.","salsa-guajillo.html"],["SALSA MORITA","Smoky seafood pairing.","salsa-morita.html"],["TACOS DE CAZÓN","Compare another firm-fish taco.","tacos-cazon.html"]],
"tacos-ostiones.html":[["SALSA XNI-PEC","Citrus-habanero pairing for oysters.","salsa-xni-pec.html"],["SALSA DE AGUACATE","Creamy contrast.","salsa-aguacate.html"],["SALSA MACHA","Chile-oil pairing.","salsa-macha.html"]],
"tacos-callo-hacha.html":[["SALSA DE AGUACATE","Creamy scallop pairing.","salsa-aguacate.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"],["SALSA VERDE","Bright seafood pairing.","salsa-verde.html"]],
"tacos-mariscos-mixtos.html":[["TACOS DE CAMARÓN A LA PLANCHA","Related quick-seared seafood taco.","tacos-camaron-plancha.html"],["TACOS DE PULPO A LA PARRILLA","Related charred seafood taco.","tacos-pulpo-parrilla.html"],["SALSA MACHA","Chile-oil pairing.","salsa-macha.html"],["SALSA VERDE","Bright mixed-seafood pairing.","salsa-verde.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_SEAFOOD_TACO_LINKS_V2[p];if(!r||document.querySelector(".seafood-taco-tip-v2"))return;const a=document.querySelector(".shrimp-octopus-taco-tip")||document.querySelector(".mexican-fish-taco-tip")||document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="seafood-taco-tip-v2";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#eef8fb";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">SEAFOOD TACO CROSS-REFERENCE</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_SIDE_LINKS_1={
"arroz-rojo.html":[["FRIJOLES REFRITOS","Classic rice-and-beans pairing.","frijoles-refritos.html"],["MOLE POBLANO CON POLLO","Traditional side for mole.","mole-poblano-con-pollo.html"],["ENCHILADAS ROJAS","Classic plate companion.","enchiladas-rojas.html"]],
"arroz-verde.html":[["POLLO A LA BRASA","Bright herbaceous rice with grilled chicken.","pollo-a-la-brasa-peruano.html"],["PESCADO A LA VERACRUZANA","Fresh rice pairing for tomato-olive fish.","pescado-a-la-veracruzana.html"],["TACOS DE PESCADO A LA PLANCHA","Light side for grilled fish tacos.","tacos-pescado-plancha.html"]],
"frijoles-refritos.html":[["ARROZ ROJO","Classic pairing.","arroz-rojo.html"],["TACOS DE FRIJOLES CON QUESO","Direct bean application.","tacos-frijoles-queso.html"],["ENFRIJOLADAS","Related bean-sauce dish.","enfrijoladas.html"]],
"frijoles-charros.html":[["CARNE ASADA","Classic grilled-beef side.","carne-asada.html"],["BARBACOA","Rich bean side for slow-cooked beef.","barbacoa.html"],["CABRITO AL PASTOR","Northern-style pairing.","cabrito-al-pastor.html"]],
"frijoles-de-la-olla.html":[["CARNITAS","Simple traditional side.","carnitas.html"],["COCHINITA PIBIL","Brothy beans balance rich pork.","cochinita-pibil.html"],["ARROZ ROJO","Classic rice-and-beans pairing.","arroz-rojo.html"]],
"elote.html":[["CARNE ASADA","Classic grilled side.","carne-asada.html"],["TACOS AL PASTOR","Street-food pairing.","tacos-al-pastor.html"],["POLLO A LA BRASA","Charred corn pairs well with grilled chicken.","pollo-a-la-brasa-peruano.html"]],
"esquites.html":[["TACOS DE BISTEC","Street-food side.","tacos-de-bistec.html"],["TACOS DE POLLO ASADO","Street-food pairing.","tacos-de-pollo-asado.html"],["TACOS DE CAMARÓN A LA PLANCHA","Corn cup pairing for grilled shrimp.","tacos-camaron-plancha.html"]],
"nopales-asados.html":[["CARNE ASADA","Classic grilled vegetable with steak.","carne-asada.html"],["TACOS DE BISTEC","Grilled cactus side.","tacos-de-bistec.html"],["BARBACOA","Acidic green side for rich meat.","barbacoa.html"]],
"ensalada-nopales.html":[["CARNITAS","Fresh cactus salad cuts rich pork.","carnitas.html"],["TACOS DE LECHÓN","Bright side for roasted pork.","tacos-de-lechon.html"],["CHILE RELLENO","Fresh side for stuffed poblano.","chile-relleno.html"]],
"rajas-con-crema.html":[["TACOS DE POLLO ASADO","Creamy poblano side for grilled chicken.","tacos-de-pollo-asado.html"],["CARNE ASADA","Classic poblano side.","carne-asada.html"],["TACOS DE ALAMBRE","Matches peppers, cheese, and griddled meat.","tacos-de-alambre.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_SIDE_LINKS_1[p];if(!r||document.querySelector(".mex-side-tip-1"))return;const a=document.querySelector(".seafood-taco-tip-v2")||document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".mexican-main-tip-2")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-side-tip-1";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f6f8ee";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN SIDE PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_SIDE_LINKS_2={
"calabacitas-mexicana.html":[["QUESO FUNDIDO","Optional cheese-rich pairing.","queso-fundido.html"],["ARROZ ROJO","Classic plate companion.","arroz-rojo.html"],["TACOS DE POLLO ASADO","Fresh vegetable side for grilled chicken.","tacos-de-pollo-asado.html"]],
"papas-con-chorizo.html":[["TACOS DE LONGANIZA","Related sausage-and-potato flavor family.","tacos-de-longaniza.html"],["FRIJOLES REFRITOS","Classic side pairing.","frijoles-refritos.html"],["SALSA VERDE","Bright chile sauce for the potatoes.","salsa-verde.html"]],
"papas-mexicana.html":[["CARNE ASADA","Classic potato side.","carne-asada.html"],["TACOS DE BISTEC","Natural side for steak tacos.","tacos-de-bistec.html"],["PICO DE GALLO","Shares the tomato-onion-chile profile.","pico-de-gallo.html"]],
"chiles-toreados.html":[["CARNE ASADA","Classic table accompaniment.","carne-asada.html"],["TACOS DE BISTEC","Traditional taco garnish.","tacos-de-bistec.html"],["TACOS DE LONGANIZA","Spicy side for sausage tacos.","tacos-de-longaniza.html"]],
"cebollitas-asadas.html":[["CARNE ASADA","Classic grilled-beef accompaniment.","carne-asada.html"],["TACOS DE BISTEC","Traditional taco-side onion.","tacos-de-bistec.html"],["CABRITO AL PASTOR","Grilled onion pairing.","cabrito-al-pastor.html"]],
"guacamole.html":[["TACOS DE POLLO ASADO","Classic topping.","tacos-de-pollo-asado.html"],["TACOS DE BISTEC","Classic topping.","tacos-de-bistec.html"],["TACOS DE PESCADO","Fresh creamy topping.","tacos-de-pescado.html"],["PICO DE GALLO","Classic companion salsa.","pico-de-gallo.html"]],
"pico-de-gallo.html":[["GUACAMOLE","Classic companion dip.","guacamole.html"],["QUESO FUNDIDO","Fresh topping for melted cheese.","queso-fundido.html"],["CHORIQUESO","Fresh acidic contrast.","choriqueso.html"]],
"choriqueso.html":[["PICO DE GALLO","Fresh acidic topping.","pico-de-gallo.html"],["SALSA ROJA","Classic chile topping.","salsa-roja.html"],["TACOS DE LONGANIZA","Related sausage-and-cheese flavor family.","tacos-de-longaniza.html"]],
"queso-fundido.html":[["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"],["SALSA VERDE","Bright chile topping.","salsa-verde.html"],["TACOS DE ALAMBRE","Related grilled-meat-and-cheese profile.","tacos-de-alambre.html"]],
"chiles-rellenos-queso.html":[["CHILE RELLENO","Direct parent dish.","chile-relleno.html"],["SALSA RANCHERA","Classic serving sauce.","salsa-ranchera.html"],["ARROZ ROJO","Traditional side.","arroz-rojo.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_SIDE_LINKS_2[p];if(!r||document.querySelector(".mex-side-tip-2"))return;const a=document.querySelector(".mex-side-tip-1")||document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".mexican-main-tip-2")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-side-tip-2";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f6f8ee";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN SIDE PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_SIDE_LINKS_3={
"ensalada-jicama.html":[["TACOS DE PESCADO ENSENADA","Crisp citrus side for fried fish tacos.","tacos-pescado-ensenada.html"],["TACOS DE CAMARÓN A LA PLANCHA","Fresh side for grilled shrimp.","tacos-camaron-plancha.html"],["CHILES TOREADOS","Spicy contrast.","chiles-toreados.html"]],
"ensalada-aguacate.html":[["CARNE ASADA","Fresh creamy side.","carne-asada.html"],["TACOS DE PESCADO A LA PLANCHA","Natural fish pairing.","tacos-pescado-plancha.html"],["GUACAMOLE","Compare another avocado preparation.","guacamole.html"]],
"coleslaw-baja.html":[["BAJA FISH TACOS","Classic topping.","baja-fish-tacos.html"],["TACOS DE PESCADO CAPEADO","Classic fried-fish topping.","tacos-pescado-capeado.html"],["TACOS DE CAMARÓN EMPANIZADO","Crunchy shrimp-taco pairing.","tacos-camaron-empanizado.html"]],
"chayotes-crema.html":[["BÉCHAMEL","Related white-sauce technique.","bechamel-sauce.html"],["POLLO A LA BRASA","Creamy vegetable side for roast chicken.","pollo-a-la-brasa-peruano.html"],["CARNE ASADA","Mild creamy side for grilled beef.","carne-asada.html"]],
"verdolagas.html":[["CARNITAS","Tangy green side for rich pork.","carnitas.html"],["BARBACOA","Fresh green accompaniment.","barbacoa.html"],["FRIJOLES DE LA OLLA","Home-style pairing.","frijoles-de-la-olla.html"]],
"ejotes-mexicana.html":[["CARNE ASADA","Vegetable side for grilled beef.","carne-asada.html"],["POLLO A LA BRASA","Fresh vegetable pairing.","pollo-a-la-brasa-peruano.html"],["ARROZ ROJO","Classic plate companion.","arroz-rojo.html"]],
"calabaza-elote.html":[["POLLO A LA BRASA","Classic vegetable side.","pollo-a-la-brasa-peruano.html"],["TACOS DE POLLO ASADO","Fresh squash-and-corn side.","tacos-de-pollo-asado.html"],["ARROZ VERDE","Green rice pairing.","arroz-verde.html"]],
"platanos-fritos.html":[["MOLE POBLANO CON POLLO","Sweet counterpoint to mole.","mole-poblano-con-pollo.html"],["POLLO EN MOLE NEGRO","Sweet side for dark mole.","pollo-en-mole-negro.html"],["ENFRIJOLADAS","Sweet-savory pairing.","enfrijoladas.html"]],
"yuca-chile-limon.html":[["TACOS DE PESCADO A LA PLANCHA","Crisp citrus side for fish.","tacos-pescado-plancha.html"],["TACOS DE CAMARÓN A LA PLANCHA","Crisp side for shrimp.","tacos-camaron-plancha.html"],["SALSA VERDE","Bright dipping sauce.","salsa-verde.html"]],
"tortillas-maiz-hechas-mano.html":[["TACOS AL PASTOR","Use as the taco base.","tacos-al-pastor.html"],["CARNE ASADA","Use for steak tacos.","carne-asada.html"],["CARNITAS","Use for pork tacos.","carnitas.html"],["BARBACOA","Use for slow-cooked beef tacos.","barbacoa.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_SIDE_LINKS_3[p];if(!r||document.querySelector(".mex-side-tip-3"))return;const a=document.querySelector(".mex-side-tip-2")||document.querySelector(".mex-side-tip-1")||document.querySelector(".mexican-taco-tip-v4")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-side-tip-3";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#f6f8ee";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN SIDE PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_BREAKFAST_LINKS_1={
"huevos-rancheros.html":[["SALSA RANCHERA","Core sauce for the dish.","salsa-ranchera.html"],["FRIJOLES REFRITOS","Classic side.","frijoles-refritos.html"],["GUACAMOLE","Optional avocado side.","guacamole.html"]],
"chilaquiles-rojos.html":[["SALSA ROJA","Direct sauce match.","salsa-roja.html"],["FRIJOLES REFRITOS","Classic breakfast side.","frijoles-refritos.html"],["HUEVOS RANCHEROS","Related egg-and-salsa breakfast.","huevos-rancheros.html"]],
"chilaquiles-verdes.html":[["SALSA VERDE","Direct sauce match.","salsa-verde.html"],["SALSA DE TOMATILLO","Core green-sauce family.","salsa-tomatillo.html"],["FRIJOLES REFRITOS","Classic side.","frijoles-refritos.html"]],
"huevos-mexicana.html":[["PICO DE GALLO","Shares the tomato-onion-chile flavor profile.","pico-de-gallo.html"],["FRIJOLES DE LA OLLA","Home-style side.","frijoles-de-la-olla.html"],["TORTILLAS HECHAS A MANO","Ideal tortilla pairing.","tortillas-maiz-hechas-mano.html"]],
"huevos-divorciados.html":[["SALSA ROJA","One half of the classic sauce pairing.","salsa-roja.html"],["SALSA VERDE","The other half.","salsa-verde.html"],["FRIJOLES REFRITOS","Traditional divider and side.","frijoles-refritos.html"]],
"huevos-motulenos.html":[["PLÁTANOS FRITOS","Direct sweet-savory component.","platanos-fritos.html"],["FRIJOLES REFRITOS","Core base.","frijoles-refritos.html"],["SALSA RANCHERA","Related tomato sauce.","salsa-ranchera.html"]],
"huevos-chorizo.html":[["PAPAS CON CHORIZO","Related chorizo breakfast side.","papas-con-chorizo.html"],["SALSA VERDE","Bright topping.","salsa-verde.html"],["TORTILLAS HECHAS A MANO","Ideal serving tortilla.","tortillas-maiz-hechas-mano.html"]],
"huevos-machaca.html":[["TACOS DE MACHACA","Direct related dish.","tacos-de-machaca.html"],["SALSA RANCHERA","Classic northern pairing.","salsa-ranchera.html"],["FRIJOLES REFRITOS","Breakfast side.","frijoles-refritos.html"]],
"molletes.html":[["FRIJOLES REFRITOS","Core spread.","frijoles-refritos.html"],["PICO DE GALLO","Classic topping.","pico-de-gallo.html"],["CHORIQUESO","Optional richer cheese-and-chorizo direction.","choriqueso.html"]],
"enfrijoladas.html":[["FRIJOLES REFRITOS","Related bean base.","frijoles-refritos.html"],["HUEVOS RANCHEROS","Related breakfast plate.","huevos-rancheros.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_BREAKFAST_LINKS_1[p];if(!r||document.querySelector(".mex-breakfast-tip-1"))return;const a=document.querySelector(".mex-side-tip-3")||document.querySelector(".mex-side-tip-2")||document.querySelector(".mex-side-tip-1")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-breakfast-tip-1";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff9ec";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN BREAKFAST PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_BREAKFAST_LINKS_2={
"entomatadas.html":[["SAUCE TOMATE","Related tomato-sauce foundation.","sauce-tomate.html"],["FRIJOLES REFRITOS","Classic side.","frijoles-refritos.html"],["CHILAQUILES ROJOS","Related tortilla-and-sauce breakfast.","chilaquiles-rojos.html"]],
"migas-mexicanas.html":[["HUEVOS A LA MEXICANA","Related egg breakfast.","huevos-mexicana.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"],["FRIJOLES REFRITOS","Classic side.","frijoles-refritos.html"]],
"gorditas-desayuno.html":[["TORTILLAS DE MAÍZ","Same masa foundation.","tortillas-maiz-hechas-mano.html"],["FRIJOLES REFRITOS","Classic filling.","frijoles-refritos.html"],["HUEVOS CON CHORIZO","Excellent breakfast filling.","huevos-chorizo.html"]],
"tamales-atole.html":[["TAMALES","Use the Mexican tamales recipe.","tamales-mexicanos.html"],["SALSA VERDE","Classic tamal accompaniment.","salsa-verde.html"],["SALSA ROJA","Classic tamal accompaniment.","salsa-roja.html"]],
"quesadillas-flor-calabaza.html":[["TACOS DE FLOR DE CALABAZA","Related squash-blossom preparation.","tacos-flor-calabaza.html"],["SALSA VERDE","Classic accompaniment.","salsa-verde.html"],["QUESO FUNDIDO","Related melted-cheese technique.","queso-fundido.html"]],
"tacos-barbacoa.html":[["BARBACOA","Direct parent dish.","barbacoa.html"],["SALSA BORRACHA","Classic meat pairing.","salsa-borracha.html"],["TORTILLAS DE MAÍZ","Ideal base.","tortillas-maiz-hechas-mano.html"]],
"tacos-canasta.html":[["FRIJOLES REFRITOS","Classic filling.","frijoles-refritos.html"],["PAPAS CON CHORIZO","Classic filling direction.","papas-con-chorizo.html"],["CHICHARRÓN","Related taco filling.","tacos-de-chicharron.html"]],
"birria-consome.html":[["BIRRIA","Direct parent dish.","birria.html"],["SALSA DE CHILE DE ÁRBOL","Classic hot accompaniment.","salsa-chile-de-arbol.html"],["TORTILLAS DE MAÍZ","Ideal serving tortilla.","tortillas-maiz-hechas-mano.html"]],
"menudo.html":[["POZOLE ROJO","Compare another hominy-based Mexican soup.","pozole-rojo.html"],["TORTILLAS DE MAÍZ","Traditional accompaniment.","tortillas-maiz-hechas-mano.html"],["SALSA DE CHILE DE ÁRBOL","Optional extra heat.","salsa-chile-de-arbol.html"]],
"pozole-rojo.html":[["MENUDO","Compare another hearty Mexican breakfast soup.","menudo.html"],["BIRRIA CON CONSOMÉ","Related chile-broth breakfast.","birria-consome.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_BREAKFAST_LINKS_2[p];if(!r||document.querySelector(".mex-breakfast-tip-2"))return;const a=document.querySelector(".mex-breakfast-tip-1")||document.querySelector(".mex-side-tip-3")||document.querySelector(".mex-side-tip-2")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-breakfast-tip-2";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff9ec";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN BREAKFAST PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();

const MEXICAN_BREAKFAST_LINKS_3={
"machaca-con-huevo.html":[["HUEVOS CON MACHACA","Same northern Mexican dish under the alternate name.","huevos-machaca.html"],["TACOS DE MACHACA","Direct related taco.","tacos-de-machaca.html"],["FRIJOLES REFRITOS","Classic side.","frijoles-refritos.html"]],
"papas-chorizo-huevo.html":[["PAPAS CON CHORIZO","Core potato-and-chorizo base.","papas-con-chorizo.html"],["CHORIZO CON HUEVO","Related egg-and-chorizo breakfast.","chorizo-con-huevo.html"],["SALSA VERDE","Bright topping.","salsa-verde.html"]],
"nopales-con-huevo.html":[["ENSALADA DE NOPALES","Related cactus preparation.","ensalada-nopales.html"],["NOPALES ASADOS","Alternative cactus technique.","nopales-asados.html"],["SALSA VERDE","Classic pairing.","salsa-verde.html"]],
"chorizo-con-huevo.html":[["HUEVOS CON CHORIZO","Same classic breakfast under the alternate word order.","huevos-chorizo.html"],["PAPAS CON CHORIZO Y HUEVO","Hearty potato variation.","papas-chorizo-huevo.html"],["PICO DE GALLO","Fresh topping.","pico-de-gallo.html"]],
"pan-dulce-cafe-olla.html":[["TAMALES CON ATOLE","Another classic Mexican breakfast pairing.","tamales-atole.html"],["CHILAQUILES ROJOS","Savory breakfast option alongside café de olla.","chilaquiles-rojos.html"],["HUEVOS RANCHEROS","Another traditional breakfast plate.","huevos-rancheros.html"]]
};
(function(){const p=(location.pathname.split("/").pop()||"index.html").toLowerCase(),r=MEXICAN_BREAKFAST_LINKS_3[p];if(!r||document.querySelector(".mex-breakfast-tip-3"))return;const a=document.querySelector(".mex-breakfast-tip-2")||document.querySelector(".mex-breakfast-tip-1")||document.querySelector(".print-button");if(!a)return;const w=document.createElement("div");w.className="mex-breakfast-tip-3";w.style.cssText="margin-top:18px;padding:16px 18px;border:1px solid var(--line);border-radius:14px;background:#fff9ec";w.innerHTML='<p class="eyebrow" style="margin:0 0 8px">MEXICAN BREAKFAST PAIRINGS</p>'+r.map(x=>'<p style="margin:0 0 7px"><strong>'+x[0]+':</strong> '+x[1]+' <a class="text-link" href="'+x[2]+'">View →</a></p>').join('');a.insertAdjacentElement("afterend",w)})();


// Keep recipe imagery visible even if a third-party image host blocks hotlinking.
document.querySelectorAll('img.recipe-photo, img.recipe-feature-image').forEach(img => {
  img.addEventListener('error', () => {
    if (img.dataset.recipeImageFallback) return;
    img.dataset.recipeImageFallback = '1';
    img.src = 'assets/the-kitchen-table-hero.png';
    img.style.visibility = 'visible';
    img.style.display = '';
  });
});

// Pantry to Plate
(function(){
  var selector=document.getElementById('pantrySelector');
  var findButton=document.getElementById('findPantryDishes');
  var clearButton=document.getElementById('clearPantryIngredients');
  var results=document.getElementById('pantryResults');
  var resultsGrid=document.getElementById('pantryResultsGrid');
  var resultsSummary=document.getElementById('pantryResultsSummary');
  var countEl=document.getElementById('pantrySelectionCount');
  if(!selector||!findButton||!results||!resultsGrid)return;

  var selected=[];

  function normalize(value){
    return (value||'').toLowerCase()
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .replace(/[^a-z0-9]+/g,' ').trim();
  }

  function aliases(term){
    var map={
      'tomato':['tomato','tomatoes'],
      'onion':['onion','onions'],
      'mushroom':['mushroom','mushrooms'],
      'potato':['potato','potatoes'],
      'tortilla':['tortilla','tortillas'],
      'green beans':['green beans','green bean'],
      'canned tomato':['tomato','tomatoes'],
      'olive oil':['olive oil'],
      'stock':['stock','broth'],
      'pepper':['pepper','peppers','chile','chili'],
      'cheese':['cheese','parmesan','pecorino','mozzarella','ricotta'],
      'shellfish':['shrimp','mussels','clams','crab','lobster','shellfish']
    };
    return map[term]||[term];
  }

  function updateCount(){
    if(countEl)countEl.textContent=String(selected.length);
  }

  selector.querySelectorAll('[data-ingredient]').forEach(function(button){
    button.addEventListener('click',function(){
      var value=button.dataset.ingredient;
      var i=selected.indexOf(value);
      if(i>=0){
        selected.splice(i,1);
        button.classList.remove('selected');
        button.setAttribute('aria-pressed','false');
      }else{
        selected.push(value);
        button.classList.add('selected');
        button.setAttribute('aria-pressed','true');
      }
      updateCount();
    });
    button.setAttribute('aria-pressed','false');
  });

  // User-entered ingredients participate in the same search as preset choices.
  selector.querySelectorAll('.pantry-group').forEach(function(group){
    var input=group.querySelector('.pantry-other-input');
    var add=group.querySelector('.pantry-other-add');
    var tags=group.querySelector('.pantry-other-tags');
    if(!input||!add||!tags)return;
    function appendCustom(){
      var display=input.value.trim().replace(/\s+/g,' ');
      var value=normalize(display);
      if(!value)return;
      if(value.length<2){input.setCustomValidity('Enter at least two characters');input.reportValidity();return}
      input.setCustomValidity('');
      if(selected.indexOf(value)>=0){input.value='';return}
      selected.push(value);
      var tag=document.createElement('span');tag.className='pantry-other-tag';
      var label=document.createElement('span');label.textContent=display;
      var remove=document.createElement('button');remove.type='button';remove.textContent='×';remove.setAttribute('aria-label','Remove '+display);
      remove.addEventListener('click',function(){selected=selected.filter(function(v){return v!==value});tag.remove();updateCount()});
      tag.append(label,remove);tags.appendChild(tag);
      input.value='';updateCount();
    }
    add.addEventListener('click',appendCustom);
    input.addEventListener('keydown',function(e){if(e.key==='Enter'){e.preventDefault();appendCustom()}});
  });

  function cardData(card){
    var title=(card.querySelector('h3')||{}).textContent||'';
    var description=(card.querySelector('p')||{}).textContent||'';
    var search=card.dataset.search||'';
    var meta=(card.querySelector('.recipe-meta')||{}).textContent||'';
    var link=card.querySelector('a[href]');
    var img=card.querySelector('img');
    var haystack=normalize([title,description,search,meta,card.dataset.ingredients||''].join(' '));
    return {
      card:card,title:title.trim(),description:description.trim(),
      url:link?link.getAttribute('href'):'#',
      image:img?img.getAttribute('src'):'',
      alt:img?img.getAttribute('alt')||title:title,
      haystack:haystack
    };
  }

  function scoreRecipe(data){
    var matched=[];
    selected.forEach(function(term){
      var terms=aliases(term);
      if(terms.some(function(alias){return data.haystack.indexOf(normalize(alias))>=0;})){
        matched.push(term);
      }
    });
    return {data:data,score:matched.length,matched:matched};
  }

  function resultCard(item){
    var image=item.data.image
      ?'<img src="'+item.data.image+'" alt="'+item.data.alt.replace(/"/g,'&quot;')+'" loading="lazy">'
      :'';
    var matchText=item.matched.length
      ?'<p class="pantry-match">Matches: '+item.matched.join(', ')+'</p>'
      :'';
    return '<article class="pantry-result-card">'+image+
      '<div class="pantry-result-body"><h4>'+item.data.title+'</h4>'+
      '<p>'+item.data.description+'</p>'+matchText+
      '<a class="text-link" href="'+item.data.url+'">View recipe →</a></div></article>';
  }

  function recipeCardsForPantry(){
    var local=[].slice.call(document.querySelectorAll('#recipeGrid .recipe-card'));
    if(local.length)return Promise.resolve(local);
    return fetch('index.html')
      .then(function(response){if(!response.ok)throw new Error('Recipe catalog unavailable');return response.text();})
      .then(function(html){
        var doc=new DOMParser().parseFromString(html,'text/html');
        return [].slice.call(doc.querySelectorAll('#recipeGrid .recipe-card'));
      });
  }

  findButton.addEventListener('click',function(){
    if(!selected.length){
      results.hidden=false;
      resultsSummary.textContent='Choose at least one ingredient to get recommendations.';
      resultsGrid.innerHTML='';
      results.scrollIntoView({behavior:'smooth',block:'start'});
      return;
    }
    findButton.disabled=true;
    findButton.textContent='Finding dishes…';
    recipeCardsForPantry().then(function(recipeCards){
      var ranked=recipeCards.map(cardData).map(scoreRecipe)
        .filter(function(x){return x.score>0;})
        .sort(function(a,b){return b.score-a.score || a.data.title.localeCompare(b.data.title);})
        .slice(0,12);
      results.hidden=false;
      if(!ranked.length){
        resultsSummary.textContent='No close matches found yet. Try a broader combination of ingredients.';
        resultsGrid.innerHTML='';
      }else{
        resultsSummary.textContent='Showing '+ranked.length+' best match'+(ranked.length===1?'':'es')+
          ' for '+selected.length+' selected ingredient'+(selected.length===1?'':'s')+'.';
        resultsGrid.innerHTML=ranked.map(resultCard).join('');
      }
      results.scrollIntoView({behavior:'smooth',block:'start'});
    }).catch(function(){
      results.hidden=false;
      resultsSummary.textContent='The recipe catalog could not be loaded. Please try again.';
      resultsGrid.innerHTML='';
    }).finally(function(){
      findButton.disabled=false;
      findButton.textContent='Find Dishes';
    });
  });

  if(clearButton)clearButton.addEventListener('click',function(){
    selected=[];
    selector.querySelectorAll('.pantry-other-tags').forEach(function(tags){tags.replaceChildren()});
    selector.querySelectorAll('.pantry-other-input').forEach(function(input){input.value='';input.setCustomValidity('')});
    selector.querySelectorAll('[data-ingredient]').forEach(function(button){
      button.classList.remove('selected');
      button.setAttribute('aria-pressed','false');
    });
    updateCount();
    results.hidden=true;
    resultsGrid.innerHTML='';
    resultsSummary.textContent='';
  });

  updateCount();
})();


// Recipe ratings and comments
(function(){
  function slugFromHref(href){
    if(!href)return'';
    var file=href.split('#')[0].split('?')[0].split('/').pop()||'';
    return file.replace(/\.html$/,'').toLowerCase();
  }
  function starsText(stats){
    return stats&&stats.count
      ? stats.average.toFixed(1)+' / 10 · '+stats.count+' rating'+(stats.count===1?'':'s')
      : 'Not yet rated';
  }
  function addCardRating(card,stats){
    var body=card.querySelector('.recipe-card-body');
    if(!body)return;
    var line=body.querySelector('.recipe-card-rating');
    if(!line){
      line=document.createElement('div');
      line.className='recipe-card-rating';
      var h=body.querySelector('h3');
      if(h)h.insertAdjacentElement('afterend',line);
      else body.prepend(line);
    }
    line.textContent=starsText(stats);
  }
  function loadHomeRatings(){
    var cards=[].slice.call(document.querySelectorAll('#recipeGrid .recipe-card'));
    if(!cards.length)return;
    var mapped=cards.map(function(card){
      var link=card.querySelector('a[href$=".html"],a[href*=".html?"]');
      return {card:card,slug:slugFromHref(link&&link.getAttribute('href'))};
    }).filter(function(x){return x.slug;});
    var chunkSize=80;
    for(var i=0;i<mapped.length;i+=chunkSize){
      (function(chunk){
        fetch('/api/recipe-feedback?slugs='+encodeURIComponent(chunk.map(function(x){return x.slug;}).join(',')))
          .then(function(r){if(!r.ok)throw new Error();return r.json();})
          .then(function(data){
            chunk.forEach(function(x){addCardRating(x.card,(data.ratings||{})[x.slug]||{count:0,average:null});});
          })
          .catch(function(){
            chunk.forEach(function(x){addCardRating(x.card,{count:0,average:null});});
          });
      })(mapped.slice(i,i+chunkSize));
    }
  }

  function recipeSlug(){
    return slugFromHref(location.pathname);
  }
  function recipeTitle(){
    var h=document.querySelector('.recipe-detail h1');
    return h?h.textContent.trim():'Recipe';
  }
  function feedbackMarkup(){
    var section=document.createElement('section');
    section.className='recipe-feedback container';
    section.id='recipeFeedback';
    section.innerHTML=
      '<div class="recipe-feedback-heading">'+
        '<div><p class="eyebrow">RECIPE FEEDBACK</p><h2>Rate this recipe</h2><p class="muted-copy">Rate it from 1 to 10, with 10 being best, and leave a comment.</p></div>'+
        '<div class="recipe-rating-summary"><strong id="recipeRatingAverage">—</strong><span id="recipeRatingCount">Loading ratings…</span></div>'+
      '</div>'+
      '<form id="recipeFeedbackForm" class="recipe-feedback-form">'+
        '<div class="recipe-rating-picker" role="group" aria-label="Recipe rating from 1 to 10">'+
          Array.from({length:10},function(_,i){var n=i+1;return '<button type="button" data-rating="'+n+'" aria-pressed="false">'+n+'</button>';}).join('')+
        '</div>'+
        '<div class="recipe-feedback-fields">'+
          '<label><span>Name <small>(optional)</small></span><input id="recipeFeedbackName" type="text" maxlength="80" autocomplete="name" placeholder="Your name"></label>'+
          '<label class="recipe-comment-field"><span>Comment</span><textarea id="recipeFeedbackComment" maxlength="1200" rows="4" required placeholder="What did you think of this recipe?"></textarea></label>'+
        '</div>'+
        '<div class="recipe-feedback-actions"><button class="button primary" id="submitRecipeFeedback" type="submit" disabled>Submit rating & comment</button><p id="recipeFeedbackStatus" role="status" aria-live="polite"></p></div>'+
      '</form>'+
      '<div class="recipe-comments"><h3>Comments</h3><div id="recipeCommentsList"><p class="muted-copy">Loading comments…</p></div></div>';
    return section;
  }
  function renderSummary(stats){
    var avg=document.getElementById('recipeRatingAverage');
    var count=document.getElementById('recipeRatingCount');
    if(!avg||!count)return;
    if(stats&&stats.count){
      avg.textContent=stats.average.toFixed(1)+' / 10';
      count.textContent=stats.count+' rating'+(stats.count===1?'':'s');
    }else{
      avg.textContent='— / 10';
      count.textContent='No ratings yet';
    }
  }
  function formatDate(iso){
    try{return new Date(iso).toLocaleDateString(undefined,{year:'numeric',month:'short',day:'numeric'});}catch(e){return'';}
  }
  function renderComments(comments){
    var wrap=document.getElementById('recipeCommentsList');
    if(!wrap)return;
    if(!comments||!comments.length){
      wrap.innerHTML='<p class="muted-copy">Be the first to leave a comment.</p>';
      return;
    }
    wrap.innerHTML='';
    comments.forEach(function(item){
      var article=document.createElement('article');
      article.className='recipe-comment';
      var top=document.createElement('div');
      top.className='recipe-comment-meta';
      var strong=document.createElement('strong');
      strong.textContent=(item.name||'Anonymous')+' · '+item.rating+'/10';
      var time=document.createElement('span');
      time.textContent=formatDate(item.createdAt);
      top.append(strong,time);
      var p=document.createElement('p');
      p.textContent=item.comment||'';
      article.append(top,p);
      wrap.append(article);
    });
  }
  function loadRecipeFeedback(slug){
    fetch('/api/recipe-feedback?slugs='+encodeURIComponent(slug))
      .then(function(r){if(!r.ok)throw new Error();return r.json();})
      .then(function(data){
        renderSummary((data.ratings||{})[slug]||{count:0,average:null});
        renderComments(data.comments||[]);
      })
      .catch(function(){
        renderSummary({count:0,average:null});
        var wrap=document.getElementById('recipeCommentsList');
        if(wrap)wrap.innerHTML='<p class="muted-copy">Ratings and comments are temporarily unavailable.</p>';
      });
  }
  function initRecipeFeedback(){
    var detail=document.querySelector('.recipe-detail');
    if(!detail||document.getElementById('recipeFeedback'))return;
    var slug=recipeSlug();
    if(!slug)return;
    var section=feedbackMarkup();
    detail.insertAdjacentElement('afterend',section);

    var selectedRating=0;
    var form=document.getElementById('recipeFeedbackForm');
    var submit=document.getElementById('submitRecipeFeedback');
    var status=document.getElementById('recipeFeedbackStatus');
    section.querySelectorAll('[data-rating]').forEach(function(button){
      button.addEventListener('click',function(){
        selectedRating=Number(button.dataset.rating);
        section.querySelectorAll('[data-rating]').forEach(function(b){
          var selected=Number(b.dataset.rating)===selectedRating;
          b.classList.toggle('selected',selected);
          b.setAttribute('aria-pressed',String(selected));
        });
        submit.disabled=false;
      });
    });
    form.addEventListener('submit',function(event){
      event.preventDefault();
      var comment=document.getElementById('recipeFeedbackComment').value.trim();
      var name=document.getElementById('recipeFeedbackName').value.trim();
      if(!selectedRating){status.textContent='Choose a rating from 1 to 10.';return;}
      if(!comment){status.textContent='Please enter a comment.';return;}
      var original=submit.textContent;
      submit.disabled=true;
      submit.textContent='Submitting…';
      status.textContent='';
      fetch('/api/recipe-feedback',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify({slug:slug,rating:selectedRating,comment:comment,name:name,recipeTitle:recipeTitle()})
      }).then(function(r){
        return r.json().catch(function(){return{};}).then(function(data){
          if(!r.ok)throw new Error(data.error||'Could not submit feedback.');
          renderSummary(data.stats);
          document.getElementById('recipeFeedbackComment').value='';
          status.textContent='Thank you — your rating and comment were added.';
          loadRecipeFeedback(slug);
        });
      }).catch(function(error){
        status.textContent=error.message||'Could not submit feedback.';
      }).finally(function(){
        submit.disabled=false;
        submit.textContent=original;
      });
    });
    loadRecipeFeedback(slug);
  }

  if(document.getElementById('recipeGrid'))loadHomeRatings();
  initRecipeFeedback();
})();


// My Meal
(function(){
  var STORAGE_KEY='kitchenTableMyMeal';
  var FINAL_KEY='kitchenTableFinalizedMeal';

  // The only published recipes are the four source-spreadsheet records.
  // Purge obsolete sample recipes previously saved in browser meal lists.
  var PUBLISHED_RECIPES=new Set([
    'neapolitan-lasagna.html',
    'vincisgrassi.html',
    'pasta-alla-norma.html',
    'pasta-with-bottarga.html'
  ]);
  function permitted(item){
    if(!item||typeof item.url!=='string')return false;
    try{
      var url=new URL(item.url,window.location.href);
      return url.origin===window.location.origin &&
        PUBLISHED_RECIPES.has(url.pathname.split('/').pop().toLowerCase());
    }catch(e){return false;}
  }
  function read(key){
    try{
      var stored=JSON.parse(localStorage.getItem(key)||'[]');
      if(!Array.isArray(stored))stored=[];
      var valid=stored.filter(permitted);
      if(valid.length!==stored.length)localStorage.setItem(key,JSON.stringify(valid));
      return valid;
    }catch(e){return[];}
  }
  function write(key,value){
    localStorage.setItem(key,JSON.stringify((Array.isArray(value)?value:[]).filter(permitted)));
    updateCounts();
  }
  function normalizeUrl(url){
    try{return new URL(url,window.location.href).pathname.split('/').pop();}catch(e){return url;}
  }
  function recipeInfoFromPage(){
    var detail=document.querySelector('.recipe-detail');
    if(!detail)return null;
    var h=detail.querySelector('h1');
    if(!h)return null;
    var img=detail.querySelector('.recipe-feature-image');
    var intro=detail.querySelector('.recipe-intro');
    return {
      title:h.textContent.trim(),
      url:normalizeUrl(location.href),
      image:img?img.getAttribute('src'):'',
      description:intro?intro.textContent.trim():''
    };
  }
  function ensureMyMealNav(){
    var nav=document.querySelector('.site-header .nav');
    if(!nav||nav.querySelector('a[href="my-meal.html"]'))return;
    var link=document.createElement('a');
    link.href='my-meal.html';
    link.innerHTML='My Meal <span class="my-meal-nav-count" data-my-meal-count></span>';
    var plan=nav.querySelector('a[href*="plan-a-meal.html"]');
    if(plan)nav.insertBefore(link,plan);
    else nav.appendChild(link);
  }
  function updateCounts(){
    ensureMyMealNav();
    var count=read(STORAGE_KEY).length;
    document.querySelectorAll('[data-my-meal-count]').forEach(function(el){
      el.textContent=count?'('+count+')':'';
    });
    var pageCount=document.getElementById('myMealNavCount');
    if(pageCount)pageCount.textContent=count?'('+count+')':'';
  }
  function addCurrentRecipeButton(){
    var info=recipeInfoFromPage();
    if(!info)return;
    var detail=document.querySelector('.recipe-detail');
    // Guides use the recipe-detail layout for styling but are not recipes.
    // Never add meal-planning controls to guide/reference pages.
    var path=(window.location.pathname.split('/').pop() || '').toLowerCase();
    if(path.includes('guide') || document.querySelector('a[href="guides.html"]'))return;
    if(!permitted(info))return;
    if(!detail||detail.querySelector('.add-to-my-meal'))return;
    var print=detail.querySelector('.print-button');
    var button=document.createElement('button');
    button.type='button';
    button.className='button primary add-to-my-meal';
    button.textContent='Add to My Meal';
    button.addEventListener('click',function(){
      var items=read(STORAGE_KEY);
      if(items.some(function(x){return x.url===info.url;})){
        button.textContent='Already in My Meal';
        return;
      }
      items.push(info);
      write(STORAGE_KEY,items);
      button.textContent='Added to My Meal';
    });
    if(print){
      print.insertAdjacentElement('afterend',button);
    }else{
      var top=detail.querySelector('.recipe-layout > div');
      if(top)top.appendChild(button);
    }
  }
  function card(item,finalized){
    var article=document.createElement('article');
    article.className='my-meal-card';
    if(item.image){
      var img=document.createElement('img');
      img.src=item.image;
      img.alt=item.title;
      article.appendChild(img);
    }
    var body=document.createElement('div');
    body.className='my-meal-card-body';
    var h=document.createElement('h3');
    h.textContent=item.title;
    var p=document.createElement('p');
    p.textContent=item.description||'';
    var actions=document.createElement('div');
    actions.className='my-meal-card-actions';
    var view=document.createElement('a');
    view.className='text-link';
    view.href=item.url;
    view.textContent='View recipe →';
    actions.appendChild(view);
    if(!finalized){
      var remove=document.createElement('button');
      remove.type='button';
      remove.className='my-meal-remove';
      remove.textContent='Remove';
      remove.addEventListener('click',function(){
        var items=read(STORAGE_KEY).filter(function(x){return x.url!==item.url;});
        write(STORAGE_KEY,items);
        renderBuilder();
      });
      actions.appendChild(remove);
    }
    body.append(h,p,actions);
    article.appendChild(body);
    return article;
  }
  function renderBuilder(){
    var grid=document.getElementById('myMealSelectedGrid');
    if(!grid)return;
    var items=read(STORAGE_KEY);
    var empty=document.getElementById('myMealEmpty');
    var finalize=document.getElementById('finalizeMyMeal');
    var summary=document.getElementById('myMealSelectedSummary');
    grid.innerHTML='';
    items.forEach(function(item){grid.appendChild(card(item,false));});
    if(empty)empty.hidden=items.length>0;
    if(finalize)finalize.disabled=!items.length;
    if(summary)summary.textContent=items.length
      ?items.length+' dish'+(items.length===1?'':'es')+' selected.'
      :'No dishes selected yet.';
  }
  function renderFinalized(){
    var section=document.getElementById('finalizedMealSection');
    var grid=document.getElementById('finalizedMealGrid');
    if(!section||!grid)return;
    var items=read(FINAL_KEY);
    section.hidden=!items.length;
    grid.innerHTML='';
    items.forEach(function(item){grid.appendChild(card(item,true));});
  }
  function extractIngredients(html){
    var doc=new DOMParser().parseFromString(html,'text/html');
    var panel=doc.querySelector('.ingredients-panel');
    if(!panel)return[];
    addMetricIngredientMeasurements(doc);
    return [].slice.call(panel.querySelectorAll('li')).map(function(li){
      return (li.textContent||'').replace(/\s+/g,' ').trim();
    }).filter(Boolean);
  }
  function buildFinalIngredients(){
    var panel=document.getElementById('finalMealIngredientPanel');
    var status=document.getElementById('finalMealIngredientStatus');
    var content=document.getElementById('finalMealIngredientContent');
    var items=read(FINAL_KEY);
    if(!panel||!status||!content)return;
    panel.hidden=false;
    status.textContent='Building ingredient list…';
    content.innerHTML='';
    Promise.all(items.map(function(item){
      return fetch(item.url).then(function(r){
        if(!r.ok)throw new Error();
        return r.text();
      }).then(function(html){
        return {item:item,ingredients:extractIngredients(html)};
      }).catch(function(){
        return {item:item,ingredients:[]};
      });
    })).then(function(groups){
      status.textContent='';
      content.innerHTML=groups.map(function(group){
        var list=group.ingredients.length
          ?'<ul>'+group.ingredients.map(function(x){return '<li>'+x+'</li>';}).join('')+'</ul>'
          :'<p class="muted-copy">Ingredients could not be read automatically. <a href="'+group.item.url+'">Open recipe</a>.</p>';
        return '<section class="ingredient-dish-group"><h3><a href="'+group.item.url+'">'+group.item.title+'</a></h3>'+list+'</section>';
      }).join('');
      panel.scrollIntoView({behavior:'smooth',block:'start'});
    });
  }
  function initMyMealPage(){
    if(!document.getElementById('myMealBuilder'))return;
    renderBuilder();
    renderFinalized();
    var clear=document.getElementById('clearMyMeal');
    if(clear)clear.addEventListener('click',function(){
      write(STORAGE_KEY,[]);
      renderBuilder();
    });
    var finalize=document.getElementById('finalizeMyMeal');
    if(finalize)finalize.addEventListener('click',function(){
      var items=read(STORAGE_KEY);
      write(FINAL_KEY,items);
      renderFinalized();
      var section=document.getElementById('finalizedMealSection');
      if(section)section.scrollIntoView({behavior:'smooth',block:'start'});
    });
    var edit=document.getElementById('editMyMeal');
    if(edit)edit.addEventListener('click',function(){
      var section=document.getElementById('myMealBuilder');
      if(section)section.scrollIntoView({behavior:'smooth',block:'start'});
    });
    var ingredients=document.getElementById('createFinalMealIngredients');
    if(ingredients)ingredients.addEventListener('click',buildFinalIngredients);
    var print=document.getElementById('printFinalMealIngredients');
    if(print)print.addEventListener('click',function(){window.print();});
  }

  addCurrentRecipeButton();
  initMyMealPage();
  updateCounts();
})();

/* Site-wide legal disclosure navigation. Public recipes remain accessible. */
(function(){
  function installLegalLinks(){
    if(document.getElementById('ktLegalLinks'))return;
    var host=document.querySelector('footer.footer') || document.querySelector('footer') || document.body;
    var nav=document.createElement('nav');
    nav.id='ktLegalLinks';nav.setAttribute('aria-label','Legal information');
    nav.style.cssText='display:flex;flex-wrap:wrap;justify-content:center;align-items:center;gap:12px 19px;padding:17px 18px;border-top:1px solid #ddcfc0;background:#fbf7f0;font:12px/1.5 Inter,Arial,sans-serif';
    [['privacy.html','Privacy'],['cookies.html','Cookies'],['disclosures.html','Advertising & Affiliates'],['terms.html','Terms'],['copyright.html','Copyright'],['contact.html','Contact']].forEach(function(item){
      var link=document.createElement('a');link.href=item[0];link.textContent=item[1];link.style.cssText='color:#65483c;text-decoration:none';nav.appendChild(link);
    });
    if(host===document.body)document.body.appendChild(nav);else host.appendChild(nav);
  }
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',installLegalLinks,{once:true});else installLegalLinks();
})();
