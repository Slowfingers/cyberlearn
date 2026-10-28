import {mkdir,copyFile} from 'node:fs/promises';
import sharp from '/Users/alexgsi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs';
const dir='public/art/avatar-room';
const names={shell:'502d4c83-e714-4485-95f9-6f99c246efca',bed:'2004df00-aa6c-498f-ba98-fd64973de265',rug:'9af36a42-1d44-47cd-b784-0e53f957decb',desk:'de0595c1-0406-4328-9e52-a5c6109e3228',chair:'3f65f8d6-e1f7-4363-9cdb-8ad733119970',bookcase:'93befb9c-5460-4244-b322-931940d8caef',plant:'3e2894eb-af64-4e6b-9873-0c04d0a77d1d',lamp:'f5d424fb-1a44-4f5b-b9f0-b171477f5ce8'};
await mkdir(`${dir}/sources`,{recursive:true});
for(const [name,id] of Object.entries(names)){
 const source=`${dir}/sources/${name}-v1.png`;
 try{await sharp(source).metadata();}catch{await copyFile(`/Users/alexgsi/.codex/generated_images/01a157f5-672d-7b11-8b62-f3048c392815/exec-${id}.png`,source);}
 let pipeline=sharp(source);const meta=await pipeline.metadata();
 if(name!=='shell'){if(!meta.hasAlpha)throw new Error(`${name} has no transparency`);pipeline=pipeline.trim({threshold:10});}
 const result=await pipeline.resize({width:name==='shell'?1536:768,withoutEnlargement:true}).webp({quality:94,alphaQuality:100}).toFile(`${dir}/${name}-v1.webp`);
 console.log(name,result.width,result.height,result.size);
}
