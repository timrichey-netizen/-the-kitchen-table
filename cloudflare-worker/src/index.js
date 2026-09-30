const ALLOWED_ORIGINS=new Set([
  "https://timrichey-netizen.github.io",
  "http://localhost:5500",
  "http://127.0.0.1:5500"
]);

const RECIPES={
  "shrimp-piccata-skewers":{name:"Shrimp Piccata Skewers",visual:"grilled shrimp skewers glazed with lemon-caper piccata butter, parsley and charred lemon"},
  "spaghetti-carbonara":{name:"Spaghetti Carbonara",visual:"glossy traditional spaghetti carbonara with crisp guanciale, Pecorino Romano and black pepper, no cream"},
  "pasta-cacio-e-pepe":{name:"Pasta Cacio e Pepe",visual:"creamy glossy cacio e pepe with long pasta, Pecorino Romano and abundant black pepper"},
  "rigatoni-amatriciana":{name:"Rigatoni Amatriciana",visual:"rigatoni amatriciana in tomato sauce with crisp guanciale and Pecorino Romano"},
  "perciatelli-alla-gricia":{name:"Perciatelli alla Gricia",visual:"perciatelli alla gricia with glossy strands, crisp guanciale, Pecorino Romano and black pepper"},
  "fettuccine-alfredo":{name:"Fettuccine Alfredo",visual:"silky fettuccine Alfredo coated only in butter and Parmigiano-Reggiano, no heavy cream"},
  "pasta-e-ceci":{name:"Pasta e Ceci",visual:"rustic pasta e ceci with small pasta, chickpeas, rosemary and a creamy brothy texture"},
  "rigatoni-pecorino-crispy-guanciale":{name:"Rigatoni with Pecorino and Crispy Guanciale",visual:"rigatoni coated in creamy Pecorino sauce topped with crisp golden guanciale"},
  "rigatoni-pork-ragu-ricotta":{name:"Rigatoni with Pork Ragù and Fresh Ricotta",visual:"rigatoni with rich pork ragù, dollops of fresh ricotta and Parmigiano-Reggiano"},
  "penne-arrabbiata":{name:"Penne all’Arrabbiata",visual:"penne all'arrabbiata in vivid spicy tomato sauce with garlic, chile and parsley"},
  "bucatini-amatriciana":{name:"Bucatini Amatriciana",visual:"bucatini amatriciana with tomato sauce, crisp guanciale and Pecorino Romano"},
  "spaghetti-shrimp-lemon-mint-pecorino":{name:"Spaghetti with Shrimp, Lemon, Mint, and Pecorino",visual:"spaghetti with pink shrimp, lemon, fresh mint and finely grated Pecorino Romano"},
  "osso-buco-red-wine":{name:"Osso Buco with Red Wine",visual:"braised osso buco veal shank with glossy red-wine sauce, vegetables and fresh gremolata"},
  "eggplant-parmesan":{name:"Eggplant Parmesan",visual:"individual square of eggplant Parmesan with layered eggplant, tomato, melted mozzarella, Parmigiano and basil"},
  "lemon-stuffed-grilled-branzino":{name:"Lemon-Stuffed Grilled Branzino",visual:"whole grilled branzino with crisp skin stuffed with lemon slices, garlic and fresh herbs"},
  "creamy-seafood-risotto":{name:"Creamy Seafood Risotto",visual:"creamy seafood risotto with Arborio rice, shrimp, scallops, mussels, parsley and lemon zest"},
  "florentine-steak-balsamic-rosemary":{name:"Balsamic and Rosemary-Marinated Florentine Steak",visual:"sliced Florentine-style porterhouse steak, deeply charred, rosy center, balsamic rosemary glaze and herbs"},
  "pasta-alla-norma":{name:"Pasta alla Norma",visual:"Sicilian pasta alla Norma with tomato sauce, golden eggplant, basil and shaved ricotta salata"},
  "pork-chop-milanese":{name:"Pork Chop Milanese",visual:"golden crisp pork chop Milanese with arugula salad, shaved Parmesan and lemon"},
  "gnocchi-alla-sorrentina":{name:"Gnocchi alla Sorrentina",visual:"gnocchi alla Sorrentina bubbling with tomato sauce, melted mozzarella, Parmigiano and basil"},
  "cioppino":{name:"Cioppino",visual:"rustic cioppino seafood stew with mussels, clams, shrimp and fish in a tomato wine broth"},
  "spaghetti-with-mussels":{name:"Spaghetti with Mussels",visual:"spaghetti with open mussels, garlic, white wine, parsley, lemon and glossy briny sauce"},
  "butternut-squash-ravioli-brown-butter-sage":{name:"Butternut Squash Ravioli with Brown Butter and Sage",visual:"butternut squash ravioli in glossy brown butter with crisp sage and Parmigiano-Reggiano"},
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

const PLATE_SHAPES={
  round:"round plate",
  oval:"oval plate",
  square:"square plate with gently softened corners",
  rectangular:"rectangular plate with clean modern proportions",
  organic:"organic free-form artisan plate with an irregular natural edge",
  "rimmed-round":"round plate with a broad defined rim"
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
function singleDishPrompt(id){
  const r=RECIPES[id];
  return [
    "Create one photorealistic editorial food photograph of a SINGLE individual plated portion.",
    "Dish: "+r.name+".",
    "Appearance: "+r.visual+".",
    "Use a tasteful neutral ceramic plate or bowl appropriate to the dish.",
    "Warm natural restaurant light, realistic texture, appetizing but believable presentation.",
    "No text, labels, menus, hands, people, logos, duplicate plates, or unrelated foods.",
    "Landscape composition suitable for a recipe website card and recipe hero image."
  ].join("\n");
}
function base64Bytes(b64){
  const bin=atob(b64);
  const bytes=new Uint8Array(bin.length);
  for(let i=0;i<bin.length;i++) bytes[i]=bin.charCodeAt(i);
  return bytes;
}

function promptFor(ids,presentation,portion,background,plateType,plateShape){
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
    `Plate shape: ${PLATE_SHAPES[plateShape]}.`,
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
  async fetch(request,env,ctx){
    const origin=request.headers.get("Origin")||"";
    const url=new URL(request.url);

    if(request.method==="OPTIONS"){
      if(!allowed(origin))return new Response(null,{status:403});
      return new Response(null,{status:204,headers:cors(origin)});
    }

    if(request.method==="GET"&&url.pathname==="/health"){
      return response({ok:true,service:"the-kitchen-table-plate-generator"},200,origin);
    }

    if(request.method==="GET"&&url.pathname==="/recipe-image"){
      const id=url.searchParams.get("id");
      if(!id||!RECIPES[id]) return response({error:"Unknown recipe."},404,origin);
      if(!env.OPENAI_API_KEY) return response({error:"Server is missing OPENAI_API_KEY."},500,origin);

      const cache=caches.default;
      const cacheKey=new Request(url.toString(),{method:"GET"});
      const cached=await cache.match(cacheKey);
      if(cached) return cached;

      const api=await fetch("https://api.openai.com/v1/images/generations",{
        method:"POST",
        headers:{
          "Authorization":`Bearer ${env.OPENAI_API_KEY}`,
          "Content-Type":"application/json"
        },
        body:JSON.stringify({
          model:"gpt-image-2.5-flare",
          prompt:singleDishPrompt(id),
          size:"1536x1024",
          quality:"high",
          output_format:"jpeg",
          output_compression:85,
          n:1
        })
      });
      const result=await api.json();
      if(!api.ok) return response({error:result?.error?.message||"Image generation failed."},502,origin);
      const b64=result?.data?.[0]?.b64_json;
      if(!b64) return response({error:"No image was returned."},502,origin);

      const img=new Response(base64Bytes(b64),{
        status:200,
        headers:{
          "Content-Type":"image/jpeg",
          "Cache-Control":"public, max-age=31536000, immutable",
          "Access-Control-Allow-Origin":"*"
        }
      });
      ctx.waitUntil(cache.put(cacheKey,img.clone()));
      return img;
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
    const plateShape=PLATE_SHAPES[body.plateShape]?body.plateShape:"round";

    const api=await fetch("https://api.openai.com/v1/images/generations",{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${env.OPENAI_API_KEY}`,
        "Content-Type":"application/json"
      },
      body:JSON.stringify({
        model:"gpt-image-2.5-flare",
        prompt:promptFor(ids,presentation,portion,background,plateType,plateShape),
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
