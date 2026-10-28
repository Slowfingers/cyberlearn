// Normalize the generated source sprites into the isometric renderer's fixed anchors.
// Requires sharp (or set SHARP_MODULE to an existing sharp ESM entry point).
import {existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
const sharp=(await import(process.env.SHARP_MODULE || 'sharp')).default;
const root=fileURLToPath(new URL('../public/art/neo-academy/',import.meta.url));
for(const name of ['city','room']) await sharp(`${root}/sources/${name}-v2.png`).resize({width:1920,withoutEnlargement:true}).webp({quality:91}).toFile(`${root}/${name}-v2.webp`);
for(const [name,width,height] of [['tile',512,320],['block',512,448],['portal',512,768]]){
 const path=`${root}/sources/${name}-v2.png`;
 if(!existsSync(path))throw new Error(`Missing generated source: ${name}`);
 const {data,info}=await sharp(path).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 let minX=info.width,minY=info.height,maxX=0,maxY=0;
 for(let y=0;y<info.height;y++)for(let x=0;x<info.width;x++)if(data[(y*info.width+x)*4+3]>32){minX=Math.min(minX,x);maxX=Math.max(maxX,x);minY=Math.min(minY,y);maxY=Math.max(maxY,y);}
 if(minX>maxX||minY>maxY)throw new Error(`Empty sprite: ${name}`);
 const crop={left:minX,top:minY,width:maxX-minX+1,height:maxY-minY+1};
 await sharp(path).extract(crop).resize(width,height,{fit:'fill'}).png().toFile(`${root}/${name}-v2.png`);
 console.log(`${name}: ${width}x${height}; alpha bounds ${JSON.stringify(crop)}`);
}
