(function(){
'use strict';
const labels={
 en:{world:'World Region',country:'Cuisine / Country',classification:'Recipe Classification',difficulty:'Preparation Difficulty',region:'Region',defaults:['All world regions','All countries','All classifications','All difficulties','All regions'],saved:'♡ Saved recipes',clear:'Clear filters',singular:'recipe found',plural:'recipes found',savedSingular:'saved recipe',savedPlural:'saved recipes',options:{'Southern Europe':'Southern Europe','Italy':'Italy','ITALY':'Italy','Sicilia':'Sicilia','Campania':'Campania','Marche':'Marche','Entree':'Entrée','Easy':'Easy','Moderate':'Moderate','Challenging':'Challenging'}},
 es:{world:'Región del mundo',country:'Cocina / País',classification:'Clasificación de la receta',difficulty:'Dificultad de preparación',region:'Región',defaults:['Todas las regiones del mundo','Todos los países','Todas las clasificaciones','Todas las dificultades','Todas las regiones'],saved:'♡ Recetas guardadas',clear:'Borrar filtros',singular:'receta encontrada',plural:'recetas encontradas',savedSingular:'receta guardada',savedPlural:'recetas guardadas',options:{'Southern Europe':'Europa meridional','Italy':'Italia','ITALY':'Italia','Sicilia':'Sicilia','Campania':'Campania','Marche':'Marcas','Entree':'Plato principal','Easy':'Fácil','Moderate':'Moderada','Challenging':'Difícil'}},
 fr:{world:'Région du monde',country:'Cuisine / Pays',classification:'Catégorie de recette',difficulty:'Difficulté de préparation',region:'Région',defaults:['Toutes les régions du monde','Tous les pays','Toutes les catégories','Toutes les difficultés','Toutes les régions'],saved:'♡ Recettes favorites',clear:'Effacer les filtres',singular:'recette trouvée',plural:'recettes trouvées',savedSingular:'recette favorite',savedPlural:'recettes favorites',options:{'Southern Europe':'Europe du Sud','Italy':'Italie','ITALY':'Italie','Sicilia':'Sicile','Campania':'Campanie','Marche':'Marches','Entree':'Plat principal','Easy':'Facile','Moderate':'Moyenne','Challenging':'Difficile'}}
};
const fields=[['browserWorldRegion','world',0],['browserCountry','country',1],['browserClassification','classification',2],['browserDifficulty','difficulty',3],['browserRegion','region',4]];
function language(){const v=window.KitchenTableI18n?.getLanguage?.()||document.documentElement.lang||'en';return labels[v]?v:'en'}
function update(){
 const d=labels[language()];
 fields.forEach(([id,key,index])=>{
 const sel=document.getElementById(id);if(!sel)return;
 const label=sel.closest('label')?.querySelector('span');if(label)label.textContent=d[key];
 [...sel.options].forEach(option=>{
  if(option.value==='all')option.textContent=d.defaults[index];
  else option.textContent=d.options[option.value]||option.dataset.originalLabel||option.value;
 });
 });
 const saved=document.querySelector('.favorite-filter-label > span:not([id])');if(saved)saved.textContent=d.saved;
 const clear=document.getElementById('browserClear');if(clear)clear.textContent=d.clear;
 const result=document.getElementById('browserResultCount');
 if(result){const n=Number((result.textContent||'').match(/\d+/)?.[0]||0);const text=n+' '+(n===1?d.singular:d.plural);if(result.textContent!==text)result.textContent=text}
 const savedCount=document.getElementById('favoriteVisibleCount');
 if(savedCount&&savedCount.textContent.trim()){const n=Number(savedCount.textContent.match(/\d+/)?.[0]||0);const text=n+' '+(n===1?d.savedSingular:d.savedPlural);if(savedCount.textContent!==text)savedCount.textContent=text}
}
function init(){
 const count=document.getElementById('browserResultCount');
 if(!count)return;
 update();
 document.addEventListener('kitchen-table-language-change',update);
 const observer=new MutationObserver(update);
 observer.observe(count,{childList:true,characterData:true,subtree:true});
 const saved=document.getElementById('favoriteVisibleCount');
 if(saved)observer.observe(saved,{childList:true,characterData:true,subtree:true});
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
})();
