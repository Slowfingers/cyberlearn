import{readFile}from'node:fs/promises';
import sharp from '/Users/alexgsi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs';
const manifest=JSON.parse(await readFile(process.argv[2]||'docs/avatar-room-v4-art.json','utf8'));
for(const{name,path}of manifest){
 const meta=await sharp(path).metadata();
 if(name==='building-v2'){await sharp(path).resize(1483,1061,{fit:'fill'}).webp({quality:94}).toFile('public/art/avatar-room/building-v2.webp');console.log(name,'registered to original canvas');continue;}
 if(!meta.hasAlpha)throw Error(name+': missing alpha');
 const result=await sharp(path).trim({threshold:10}).resize({width:name.startsWith('poster_')?640:768,withoutEnlargement:true}).webp({quality:94,alphaQuality:100}).toFile(`public/art/avatar-room/${name}-v1.webp`);
 console.log(name,result.width,result.height,result.size);
}
