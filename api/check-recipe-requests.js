// Invoked by a trusted scheduler. Matches pending requests to explicitly published recipes.
function reply(res,status,data){res.statusCode=status;res.setHeader('Content-Type','application/json');res.end(JSON.stringify(data));}
function norm(v){return String(v||'').normalize('NFKD').replace(/[\u0300-\u036f]/g,'').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();}
async function redis(args){const base=(process.env.UPSTASH_REDIS_REST_URL||'').replace(/\/$/,'');const tok=process.env.UPSTASH_REDIS_REST_TOKEN;if(!base||!tok)throw Error('Queue storage not configured');const r=await fetch(base,{method:'POST',headers:{Authorization:'Bearer '+tok,'Content-Type':'application/json'},body:JSON.stringify(args)});const d=await r.json();if(!r.ok||d.error)throw Error(d.error||'Queue unavailable');return d.result;}
module.exports=async function handler(req,res){
 if(req.method!=='POST')return reply(res,405,{error:'POST required'});
 const configured=process.env.RECIPE_REQUEST_CRON_SECRET||'';
 const authorization=req.headers.authorization||'';
 if(!configured||authorization!=='Bearer '+configured)return reply(res,401,{error:'Unauthorized'});
 try{
  const base=process.env.RECIPE_SITE_URL;
  if(!base||!/^https:\/\//.test(base))throw Error('RECIPE_SITE_URL must be configured');
  const url=base.replace(/\/$/,'')+'/data/recipe-catalog.json';
  const response=await fetch(url,{headers:{'Cache-Control':'no-cache'}});
  if(!response.ok)throw Error('Published catalog unavailable');
  const manifest=await response.json();
  const available=(manifest.recipes||[]).filter(x=>x.status==='available'&&x.url);
  const ids=(await redis(['SMEMBERS','recipe:requests:pending'])||[]).slice(0,300);
  let matched=0,sent=0,failed=0;
  for(const id of ids){
    try{
      const raw=await redis(['GET','recipe:request:'+id]);if(!raw)continue;
      const request=JSON.parse(raw);
      if(request.status!=='pending')continue;
      const names=[request.localName,request.englishName].map(norm).filter(Boolean);
      if(!names.length)continue;
      const recipe=available.find(r=>names.some(n=>n===norm(r.name)||n===norm(r.english)));
      if(!recipe)continue;
      matched++;
      const direct=new URL(recipe.url,base+'/');
      if(direct.origin!==new URL(base).origin)continue;
      // Check that the published recipe link itself is live.
      const check=await fetch(direct.toString(),{method:'GET'});
      if(!check.ok)continue;
      if(!request.notify||!request.email){
        request.status='available';request.recipeUrl=direct.toString();
      }else{
        const key=process.env.RESEND_API_KEY,from=process.env.RECIPE_NOTIFICATION_FROM;
        if(!key||!from)throw Error('Email delivery not configured');
        const title=String(recipe.english||recipe.name).slice(0,150);
        const mail=await fetch('https://api.resend.com/emails',{
          method:'POST',headers:{Authorization:'Bearer '+key,'Content-Type':'application/json'},
          body:JSON.stringify({from,to:[request.email],subject:'Your requested recipe is ready: '+title,
            text:'Good news! The recipe you requested is now available on The Kitchen Table.\n\n'+title+'\n'+direct.toString()+'\n\nYou received this email because you asked to be notified when this recipe became available.'})
        });
        if(!mail.ok)throw Error('Email provider rejected notification');
        request.status='notified';request.notifiedAt=new Date().toISOString();request.recipeUrl=direct.toString();
        sent++;
      }
      await redis(['SET','recipe:request:'+id,JSON.stringify(request)]);
      await redis(['SREM','recipe:requests:pending',id]);
    }catch(e){failed++;console.error('Recipe request processing failed:',id,e.message);}
  }
  reply(res,200,{ok:true,checked:ids.length,matched,sent,failed});
 }catch(e){reply(res,500,{error:e.message});}
};
