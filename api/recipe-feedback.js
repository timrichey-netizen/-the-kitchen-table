function json(res,status,body){
  res.statusCode=status;
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.setHeader('Cache-Control','no-store');
  res.end(JSON.stringify(body));
}

function cleanSlug(value){
  return String(value||'').toLowerCase().replace(/[^a-z0-9-]/g,'').slice(0,120);
}
function cleanText(value,max){
  return String(value||'').replace(/[\u0000-\u001f\u007f]/g,' ').replace(/\s+/g,' ').trim().slice(0,max);
}
function redisConfig(){
  var url=(process.env.UPSTASH_REDIS_REST_URL||'').replace(/\/$/,'');
  var token=process.env.UPSTASH_REDIS_REST_TOKEN||'';
  if(!url||!token)throw new Error('Recipe feedback storage is not configured.');
  return {url:url,token:token};
}
async function command(args){
  var cfg=redisConfig();
  var response=await fetch(cfg.url,{
    method:'POST',
    headers:{'Authorization':'Bearer '+cfg.token,'Content-Type':'application/json'},
    body:JSON.stringify(args)
  });
  var data=await response.json().catch(function(){return{};});
  if(!response.ok)throw new Error(data.error||'Feedback storage request failed.');
  return data.result;
}
async function pipeline(commands){
  var cfg=redisConfig();
  var response=await fetch(cfg.url+'/pipeline',{
    method:'POST',
    headers:{'Authorization':'Bearer '+cfg.token,'Content-Type':'application/json'},
    body:JSON.stringify(commands)
  });
  var data=await response.json().catch(function(){return[];});
  if(!response.ok)throw new Error('Feedback storage request failed.');
  return data;
}
function statsFrom(values){
  var count=Number(values&&values[0]||0);
  var total=Number(values&&values[1]||0);
  return {count:count,average:count?Math.round((total/count)*10)/10:null};
}

module.exports=async function handler(req,res){
  try{
    if(req.method==='GET'){
      var raw=(req.query&&req.query.slugs)||'';
      var slugs=String(raw).split(',').map(cleanSlug).filter(Boolean).slice(0,100);
      if(!slugs.length)return json(res,400,{error:'No recipe was specified.'});

      var commands=[];
      slugs.forEach(function(slug){
        commands.push(['HMGET','recipe:rating:'+slug,'count','total']);
      });
      if(slugs.length===1){
        commands.push(['LRANGE','recipe:comments:'+slugs[0],0,19]);
      }
      var out=await pipeline(commands);
      var ratings={};
      slugs.forEach(function(slug,i){
        ratings[slug]=statsFrom(out[i]&&out[i].result);
      });
      var comments=[];
      if(slugs.length===1){
        comments=((out[slugs.length]&&out[slugs.length].result)||[]).map(function(item){
          try{return JSON.parse(item);}catch(e){return null;}
        }).filter(Boolean);
      }
      return json(res,200,{ratings:ratings,comments:comments});
    }

    if(req.method==='POST'){
      var body=req.body;
      if(typeof body==='string')body=JSON.parse(body||'{}');
      body=body||{};
      var slug=cleanSlug(body.slug);
      var rating=Number(body.rating);
      var comment=cleanText(body.comment,1200);
      var name=cleanText(body.name,80)||'Anonymous';

      if(!slug)return json(res,400,{error:'Recipe is required.'});
      if(!Number.isInteger(rating)||rating<1||rating>10){
        return json(res,400,{error:'Rating must be a whole number from 1 to 10.'});
      }
      if(!comment)return json(res,400,{error:'Please enter a comment.'});

      var now=new Date().toISOString();
      var entry=JSON.stringify({name:name,rating:rating,comment:comment,createdAt:now});
      await pipeline([
        ['HINCRBY','recipe:rating:'+slug,'count',1],
        ['HINCRBY','recipe:rating:'+slug,'total',rating],
        ['LPUSH','recipe:comments:'+slug,entry],
        ['LTRIM','recipe:comments:'+slug,0,99]
      ]);

      var values=await command(['HMGET','recipe:rating:'+slug,'count','total']);
      return json(res,200,{ok:true,stats:statsFrom(values),comment:{name:name,rating:rating,comment:comment,createdAt:now}});
    }

    res.setHeader('Allow','GET, POST');
    return json(res,405,{error:'Method not allowed.'});
  }catch(error){
    return json(res,500,{error:error&&error.message?error.message:'Could not process recipe feedback.'});
  }
};
