import {mkdir,copyFile,readFile} from 'node:fs/promises';
import sharp from '/Users/alexgsi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs';
const manifest=JSON.parse(await readFile(process.argv[2]??'docs/avatar-room-v2-art.json','utf8'));
const dir='public/art/avatar-room';await mkdir(`${dir}/sources`,{recursive:true});
for(const item of manifest){
 const source=`${dir}/sources/${item.name}-v1.png`;
 try{await sharp(source).metadata();}catch{await copyFile(item.path,source);}
 const meta=await sharp(source).metadata();if(!meta.hasAlpha)throw new Error(`${item.name}: no alpha`);
 const result=await sharp(source).trim({threshold:10}).resize({width:768,withoutEnlargement:true}).webp({quality:94,alphaQuality:100}).toFile(`${dir}/${item.name}-v1.webp`);
 console.log(item.name,result.width,result.height,result.size);
}
