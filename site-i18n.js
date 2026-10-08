
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
      'Recipes worth making again.':'Recetas que vale la pena repetir.','Find something delicious':'Encuentra algo delicioso','RECIPE COLLECTION':'COLECCIÓN DE RECETAS',
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
      'Recipes worth making again.':'Des recettes à refaire encore et encore.','Find something delicious':'Trouvez quelque chose de délicieux','RECIPE COLLECTION':'COLLECTION DE RECETTES',
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
    var notice=document.getElementById('recipeTranslationNotice');if(notice){notice.hidden=current==='en';var draft=document.body.hasAttribute('data-recipe-translation-draft');notice.textContent=current==='es'?(draft?'Traducción al español en revisión editorial; compruebe las cantidades con la receta original.':'Esta receta aún no tiene una traducción verificada. Los ingredientes y las instrucciones se muestran en inglés.'):(current==='fr'?(draft?'Traduction française en cours de révision éditoriale ; vérifiez les quantités dans la recette d’origine.':'Cette recette ne dispose pas encore d’une traduction vérifiée. Les ingrédients et les instructions sont affichés en anglais.'):'');}
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

