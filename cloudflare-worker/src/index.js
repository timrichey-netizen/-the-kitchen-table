const ALLOWED_ORIGINS=new Set([
  "https://timrichey-netizen.github.io",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
]);

const RECIPES={
  "shrimp-bisque":{
    name:"New Orleans Shrimp & Corn Bisque",
    visual:"a small ramekin or shallow cup of creamy New Orleans shrimp and corn bisque with visible shrimp, sweet corn, green onion and parsley"
  },
  "lemon-chicken":{
    name:"Mediterranean Lemon Shallot Chicken with Fresh Herbs",
    visual:"an individual portion of golden seared chicken with caramelized shallots, lemon, capers, garlic, white-wine pan sauce, parsley, dill, oregano, basil and thyme"
  },
  "hasselback-vegetables":{
    name:"Roasted Hasselback Root Vegetable & Zucchini Bake",
    visual:"an individual portion of thinly sliced roasted zucchini, carrot, parsnip and sweet potato in a compact hasselback or tian-style stack with olive oil, garlic and herbs"
  },
  "moo-shu-chicken":{
    name:"Moo Shu Chicken",
    visual:"an individual portion of moo shu chicken with sliced chicken, cabbage, shiitake mushrooms, carrot, scrambled egg and green onion, with a small folded Mandarin pancake and a restrained spoonful of hoisin"
  }
};

const PRESENTATIONS={
  elegant:"elegant restaurant-style individual dinner plate",
  rustic:"warm rustic farmhouse individual dinner plate",
  casual:"casual family dinner plate",
  "french-country":"refined French-country individual dinner plate"
};
const PORTIONS={
  balanced:"balanced individual portions with every selected dish clearly visible",
  tasting:"small tasting portions arranged harmoniously with negative space",
  generous:"generous dinner portions arranged without overcrowding the plate"
};
const BACKGROUNDS={
  natural:"soft natural daylight on a neutral linen table",
  farmhouse:"warm French farmhouse table with subtle rustic styling and natural window light",
  studio:"clean editorial food photography on a pale stone surface with soft studio light"
};

const PLATE_TYPES={
  "white-porcelain":"classic white porcelain dinner plate",
  "rustic-stoneware":"handcrafted rustic stoneware dinner plate in a warm neutral glaze",
  "coupe":"wide rimless coupe dinner plate",
  "shallow-bowl":"shallow wide pasta bowl suitable for a composed entree",
  "dark-ceramic":"matte dark charcoal ceramic dinner plate",
  "french-faience":"traditional French faience dinner plate with subtle blue detailing"
};

const requestBuckets=new Map();

function cors(origin){
  const h={
    "Access-Control-Allow-Methods":"GET, POST, OPTIONS",
    "Access-Control-Allow-Headers":"Content-Type",
    "Access-Control-Max-Age":"86400",
    "Vary":"Origin",
    "Cache-Control":"no-store"
  };
  if(ALLOWED_ORIGINS.has(origin))h["Access-Control-Allow-Origin"]=origin;
  return h;
}
function response(data,status,origin){
  return new Response(JSON.stringify(data),{
    status,
    headers:{"Content-Type":"application/json; charset=utf-8",...cors(origin)}
  });
}
function allowed(origin){return ALLOWED_ORIGINS.has(origin);}
function rateLimit(ip){
  const now=Date.now(),windowMs=10*60*1000,max=5;
  const recent=(requestBuckets.get(ip)||[]).filter(t=>now-t<windowMs);
  if(recent.length>=max){requestBuckets.set(ip,recent);return false;}
  recent.push(now);requestBuckets.set(ip,recent);return true;
}
function promptFor(ids,presentation,portion,background,plateType){
  const chosen=ids.map(id=>RECIPES[id]);
  return [
    "Create one photorealistic editorial food photograph of a SINGLE individual dinner plate.",
    "",
    "The plate must contain exactly these selected Kitchen Table dishes:",
    ...chosen.map((r,i)=>`${i+1}. ${r.name}: ${r.visual}.`),
    "",
    `Presentation: ${PRESENTATIONS[presentation]}.`,
    `Portioning: ${PORTIONS[portion]}.`,
    `Setting: ${BACKGROUNDS[background]}.`,
    `Plate type: ${PLATE_TYPES[plateType]}.`,
    "",
    "Composition requirements:",
    "- Make every selected dish visually recognizable and distinct while forming one coherent plate.",
    "- If shrimp bisque is selected, serve it in a small ramekin or cup placed on the plate.",
    "- Use realistic individual serving proportions and professional chef plating.",
    "- Do not add unrelated side dishes, extra proteins, extra starches, or duplicate dishes.",
    "- Natural, appetizing textures and restrained garnish only.",
    "- No text, labels, menus, logos, people, hands, or multiple plates.",
    "- Landscape food photography, shallow depth of field, realistic color, polished but believable."
  ].join("\n");
}

export default{
  async fetch(request,env){
    const origin=request.headers.get("Origin")||"";
    const url=new URL(request.url);

    if(request.method==="OPTIONS"){
      if(!allowed(origin))return new Response(null,{status:403});
      return new Response(null,{status:204,headers:cors(origin)});
    }

    if(request.method==="GET"&&url.pathname==="/health"){
      return response({ok:true,service:"the-kitchen-table-plate-generator"},200,origin);
    }

    if(request.method!=="POST"||url.pathname!=="/generate-plate"){
      return response({error:"Not found."},404,origin);
    }
    if(!allowed(origin))return response({error:"Origin not allowed."},403,origin);
    if(!env.OPENAI_API_KEY)return response({error:"Server is missing OPENAI_API_KEY."},500,origin);

    const ip=request.headers.get("CF-Connecting-IP")||"unknown";
    if(!rateLimit(ip))return response({error:"Too many image requests. Please try again in a few minutes."},429,origin);

    let body;
    try{body=await request.json();}catch{return response({error:"Invalid JSON."},400,origin);}

    const ids=Array.isArray(body.recipes)?[...new Set(body.recipes)]:[];
    if(ids.length<1||ids.length>4||ids.some(id=>!RECIPES[id])){
      return response({error:"Select between 1 and 4 valid recipes."},400,origin);
    }
    const presentation=PRESENTATIONS[body.presentation]?body.presentation:"elegant";
    const portion=PORTIONS[body.portionStyle]?body.portionStyle:"balanced";
    const background=BACKGROUNDS[body.backgroundStyle]?body.backgroundStyle:"natural";
    const plateType=PLATE_TYPES[body.plateType]?body.plateType:"white-porcelain";

    const api=await fetch("https://api.openai.com/v1/images/generations",{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:"gpt-image-2.5-flare",
        prompt:promptFor(ids,presentation,portion,background,plateType),
        size:"1536x1024",
        quality:"high",
        output_format:"jpeg",
        output_compression:85,
        n:1
      })
    });

    let result;
    try{result=await api.json();}catch{return response({error:"Invalid response from image service."},502,origin);}

    if(!api.ok){
      console.error("OpenAI image error",api.status,result?.error?.code||"unknown");
      return response({error:result?.error?.message||"Image generation failed."},api.status>=500?502:400,origin);
    }

    const imageBase64=result?.data?.[0]?.b64_json;
    if(!imageBase64)return response({error:"No image was returned."},502,origin);

    return response({imageBase64,mimeType:"image/jpeg"},200,origin);
  }
};
