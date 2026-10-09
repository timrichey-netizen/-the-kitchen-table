import { chromium, devices } from 'playwright';
import fs from 'node:fs';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const axePath=require.resolve('axe-core/axe.min.js');
const base=process.env.A11Y_BASE_URL||'http://127.0.0.1:4173';
const reports=[];
const browser=await chromium.launch({headless:true});
async function check(name,fn){try{await fn();reports.push({name,status:'PASS'});console.log('PASS '+name)}catch(e){reports.push({name,status:'FAIL',error:String(e.message||e)});console.error('FAIL '+name+': '+String(e.message||e));process.exitCode=1}}
async function newPage(mobile=false){const context=await browser.newContext(mobile?{...devices['iPhone 13'],serviceWorkers:'block'}:{viewport:{width:1366,height:900},serviceWorkers:'block'});const page=await context.newPage();page.on('pageerror',err=>console.warn('Page script warning: '+err.message));return {page,context}}
async function axe(page,label){await page.addScriptTag({path:axePath});const result=await page.evaluate(async()=>window.axe.run(document,{runOnly:{type:'tag',values:['wcag2a','wcag2aa','wcag21a','wcag21aa']},rules:{'color-contrast':{enabled:false}}}));if(result.violations.length)throw Error(label+': '+result.violations.map(v=>v.id+' ('+v.nodes.length+')').join(', '))}
await check('Mobile navigation keyboard and dismissal',async()=>{
 const {page,context}=await newPage(true);try{
 await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
 const toggle=page.locator('.site-header .menu-toggle');await toggle.click();
 if(await toggle.getAttribute('aria-expanded')!=='true')throw Error('menu did not open');
 await page.keyboard.press('Escape');
 if(await toggle.getAttribute('aria-expanded')!=='false')throw Error('Escape did not close menu');
 await toggle.click();await page.locator('.site-header .nav a[href="#recipes"]').click();
 if(await toggle.getAttribute('aria-expanded')!=='false')throw Error('navigation did not close menu');
 await axe(page,'mobile navigation');
 }finally{await context.close()}
});
await check('Recipe filtering and live result counts',async()=>{
 const {page,context}=await newPage();try{
 await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
 await page.locator('#browserDifficulty').selectOption('Easy');
 await page.waitForTimeout(150);
 const shown=await page.locator('#recipeGrid .recipe-card:visible').count();
 if(shown!==1)throw Error('Expected one easy recipe; got '+shown);
 const count=await page.locator('#browserResultCount').innerText();
 if(!/1\s+recipe/.test(count))throw Error('Count not updated: '+count);
 await page.locator('#browserClear').click();
 if(await page.locator('#recipeGrid .recipe-card:visible').count()!==4)throw Error('Clear did not restore recipes');
 await page.locator('#browserAllergen').selectOption('Milk');
 if(await page.locator('#recipeGrid .recipe-card:visible').count()!==1)throw Error('Milk exclusion mismatch');
 await axe(page,'recipe filtering');
 }finally{await context.close()}
});
await check('Favorites persist without authentication',async()=>{
 const {page,context}=await newPage();try{
 await page.goto(base+'/favorites.html',{waitUntil:'domcontentloaded'});
 await page.evaluate(()=>localStorage.setItem('kitchen-table-favorites-v1',JSON.stringify(['pasta-alla-norma.html'])));
 await page.reload({waitUntil:'domcontentloaded'});
 if(await page.locator('#savedRecipes .saved-card').count()!==1)throw Error('Guest favorite unavailable');
 if(await page.locator('#savedRecipes .saved-card a[href="pasta-alla-norma.html"]').count()===0)throw Error('Favorite link missing');
 await axe(page,'favorites');
 }finally{await context.close()}
});
await check('Public recipe and optional authentication',async()=>{
 const {page,context}=await newPage();try{
 await page.goto(base+'/pasta-alla-norma.html',{waitUntil:'domcontentloaded'});
 if(!await page.locator('main').count())throw Error('Recipe content missing without sign-in');
 if(/account\.html/.test(page.url()))throw Error('Guest redirected to sign-in');
 await axe(page,'public recipe');
 await page.goto(base+'/account.html',{waitUntil:'domcontentloaded'});
 if(!await page.locator('#accountGuest').count())throw Error('Guest account controls missing');
 if(!await page.locator('#accountStatus[aria-live],#accountStatus[role="status"]').count())throw Error('Account status not announced');
 await axe(page,'account');
 }finally{await context.close()}
});
await check('Updated content is announced',async()=>{
 const {page,context}=await newPage();try{
 await page.goto(base+'/index.html',{waitUntil:'domcontentloaded'});
 const count=page.locator('#browserResultCount');
 if(await count.getAttribute('aria-live')!=='polite')throw Error('Results missing aria-live');
 await page.locator('#browserDifficulty').selectOption('Easy');
 if(!/1\s+recipe/.test(await count.innerText()))throw Error('Live region not updated');
 await page.goto(base+'/favorites.html',{waitUntil:'domcontentloaded'});
 if(!await page.locator('#savedCount').count())throw Error('Favorite count missing');
 }finally{await context.close()}
});
await browser.close();
fs.mkdirSync('test-results',{recursive:true});
fs.writeFileSync('test-results/accessibility-browser.json',JSON.stringify({date:new Date().toISOString(),reports},null,2));
if(process.exitCode)process.exit(process.exitCode);
