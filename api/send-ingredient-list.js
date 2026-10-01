function sendJson(res,status,body){
  res.statusCode=status;
  res.setHeader('Content-Type','application/json; charset=utf-8');
  res.end(JSON.stringify(body));
}

function escapeHtml(value){
  return String(value||'').replace(/[&<>"']/g,function(ch){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch];
  });
}

function normalizeGroups(groups){
  if(!Array.isArray(groups))return[];
  return groups.slice(0,10).map(function(group){
    return {
      label:String(group&&group.label||'Course').slice(0,80),
      title:String(group&&group.title||'Recipe').slice(0,160),
      url:String(group&&group.url||'').slice(0,1000),
      ingredients:Array.isArray(group&&group.ingredients)
        ?group.ingredients.slice(0,100).map(function(x){return String(x).slice(0,300);})
        :[]
    };
  });
}

function textList(groups){
  var lines=['The Kitchen Table — Ingredient List',''];
  groups.forEach(function(group){
    lines.push(group.label+': '+group.title);
    group.ingredients.forEach(function(item){lines.push('• '+item);});
    if(group.url)lines.push(group.url);
    lines.push('');
  });
  return lines.join('\n').trim();
}

function htmlList(groups){
  var sections=groups.map(function(group){
    var ingredients=group.ingredients.length
      ?'<ul>'+group.ingredients.map(function(item){return '<li>'+escapeHtml(item)+'</li>';}).join('')+'</ul>'
      :'<p>Open the recipe for ingredient details.</p>';
    var title=group.url
      ?'<a href="'+escapeHtml(group.url)+'">'+escapeHtml(group.title)+'</a>'
      :escapeHtml(group.title);
    return '<section style="margin:0 0 24px"><h2 style="font-size:18px;margin:0 0 8px">'+escapeHtml(group.label)+': '+title+'</h2>'+ingredients+'</section>';
  }).join('');
  return '<div style="font-family:Arial,sans-serif;max-width:680px;margin:auto;color:#2b241f"><h1>The Kitchen Table</h1><p>Your ingredient list:</p>'+sections+'</div>';
}

async function sendEmail(recipient,groups,title){
  var key=process.env.RESEND_API_KEY;
  var from=process.env.INGREDIENT_EMAIL_FROM;
  if(!key||!from)throw new Error('Email delivery is not configured.');
  var response=await fetch('https://api.resend.com/emails',{
    method:'POST',
    headers:{'Authorization':'Bearer '+key,'Content-Type':'application/json'},
    body:JSON.stringify({
      from:from,
      to:[recipient],
      subject:title||'The Kitchen Table ingredient list',
      text:textList(groups),
      html:htmlList(groups)
    })
  });
  var data=await response.json().catch(function(){return{};});
  if(!response.ok)throw new Error(data.message||'Email provider rejected the request.');
  return {id:data.id||null};
}

async function sendSms(recipient,groups){
  var sid=process.env.TWILIO_ACCOUNT_SID;
  var token=process.env.TWILIO_AUTH_TOKEN;
  var from=process.env.TWILIO_FROM_NUMBER;
  if(!sid||!token||!from)throw new Error('Text delivery is not configured.');
  var body=textList(groups);
  if(body.length>1400)body=body.slice(0,1390)+'\n…';
  var form=new URLSearchParams();
  form.set('To',recipient);
  form.set('From',from);
  form.set('Body',body);
  var response=await fetch('https://api.twilio.com/2010-04-01/Accounts/'+encodeURIComponent(sid)+'/Messages.json',{
    method:'POST',
    headers:{
      'Authorization':'Basic '+Buffer.from(sid+':'+token).toString('base64'),
      'Content-Type':'application/x-www-form-urlencoded'
    },
    body:form.toString()
  });
  var data=await response.json().catch(function(){return{};});
  if(!response.ok)throw new Error(data.message||'SMS provider rejected the request.');
  return {id:data.sid||null};
}

module.exports=async function handler(req,res){
  if(req.method!=='POST'){
    res.setHeader('Allow','POST');
    return sendJson(res,405,{error:'Method not allowed.'});
  }

  try{
    var body=req.body;
    if(typeof body==='string')body=JSON.parse(body||'{}');
    body=body||{};
    var channel=String(body.channel||'');
    var recipient=String(body.recipient||'').trim();
    var groups=normalizeGroups(body.groups);
    var title=String(body.mealTitle||'The Kitchen Table ingredient list').slice(0,160);

    if(!groups.length)return sendJson(res,400,{error:'No ingredient list was provided.'});

    if(channel==='email'){
      if(!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(recipient)){
        return sendJson(res,400,{error:'Enter a valid email address.'});
      }
      var emailResult=await sendEmail(recipient,groups,title);
      return sendJson(res,200,{ok:true,channel:'email',id:emailResult.id});
    }

    if(channel==='sms'){
      var phone=recipient.replace(/[()\s.-]/g,'');
      if(!/^\+[1-9]\d{7,14}$/.test(phone)){
        return sendJson(res,400,{error:'Enter the mobile number with country code, for example +15551234567.'});
      }
      var smsResult=await sendSms(phone,groups);
      return sendJson(res,200,{ok:true,channel:'sms',id:smsResult.id});
    }

    return sendJson(res,400,{error:'Unsupported delivery method.'});
  }catch(error){
    return sendJson(res,500,{error:error&&error.message?error.message:'Could not send the ingredient list.'});
  }
};
