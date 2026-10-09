import fs from 'node:fs';
const pages=fs.readdirSync('.').filter(name=>name.endsWith('.html'));
const defects=[];
for(const file of pages){
 const html=fs.readFileSync(file,'utf8');
 if(!/<html\s[^>]*lang=["'][^"']+["']/i.test(html))defects.push(file+': missing document language');
 if(!/<title>[^<]+<\/title>/i.test(html))defects.push(file+': missing title');
 if(!html.includes('href="accessibility.css"'))defects.push(file+': shared focus styling missing');
 if(!html.includes('src="accessibility.js"'))defects.push(file+': keyboard/navigation enhancement missing');
 if(html.includes('class="menu-toggle"')&&!/class="menu-toggle"[^>]+aria-expanded=/i.test(html))defects.push(file+': menu is missing expanded state');
 if(html.includes('<header class="site-header"')&&!/<nav[^>]+aria-label=/i.test(html))defects.push(file+': navigation is missing accessible name');
}
if(defects.length){console.error(defects.join('\n'));process.exitCode=1}
else console.log('Accessibility structural checks passed: '+pages.length+' pages');
