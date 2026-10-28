// Normalize generated atlas dimensions and build principal per-cell alpha masks.
import {readFile,writeFile} from 'node:fs/promises';
const sharp=(await import(process.env.SHARP_MODULE||'/Users/alexgsi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs')).default;
const manifest=JSON.parse(await readFile(process.argv[2]||'docs/street-avatars-v2.json','utf8'));
const metadataFile='components/spriteSilhouettes.ts';let source=await readFile(metadataFile,'utf8');
const prefix=source.slice(0,source.indexOf('export const SPRITE_SILHOUETTES = '));const all=JSON.parse(source.slice(source.indexOf(' = ')+3,source.lastIndexOf(' as const;')));
for(const {name,path}of manifest){
 const original=await sharp(path).metadata();if(!original.hasAlpha)throw Error(`${name}: alpha channel required`);
 const output=`public/avatar/street/${name}.png`;
 await sharp(path).resize(2172,724,{fit:'fill'}).png({compressionLevel:9}).toFile(output);
 const {data,info}=await sharp(output).ensureAlpha().raw().toBuffer({resolveWithObject:true});
 const paths=[];
 for(let frame=0;frame<6;frame++){
  const w=362,h=724,seen=new Uint8Array(w*h),components=[];
  const alpha=i=>data[((Math.floor(i/w)*info.width+frame*w+i%w)*4)+3];
  for(let i=0;i<w*h;i++){
   if(seen[i]||alpha(i)<16)continue;const queue=[i];seen[i]=1;
   for(let k=0;k<queue.length;k++){const p=queue[k],x=p%w,y=Math.floor(p/w);for(const q of[x>0?p-1:-1,x<w-1?p+1:-1,y>0?p-w:-1,y<h-1?p+w:-1])if(q>=0&&!seen[q]&&alpha(q)>=16){seen[q]=1;queue.push(q);}}
   components.push(queue);
  }
  components.sort((a,b)=>b.length-a.length);if(!components[0]?.length)throw Error(`${name}/${frame}: empty cell`);
  const shapes=components.filter(c=>c.length>=components[0].length*.03).map(c=>{
   const rows=new Map();for(const p of c){const y=Math.floor(p/w),x=p%w,r=rows.get(y)||[w,0];r[0]=Math.min(r[0],x);r[1]=Math.max(r[1],x);rows.set(y,r);}
   const ys=[...rows.keys()].sort((a,b)=>a-b);const left=ys.map(y=>[rows.get(y)[0],y]),right=ys.map(y=>[rows.get(y)[1]+1,y]).reverse();
   const points=[...left,...right];const simplified=points.filter((p,i)=>{const a=points[(i+points.length-1)%points.length],b=points[(i+1)%points.length];return(p[0]-a[0])*(b[1]-p[1])!==(p[1]-a[1])*(b[0]-p[0]);});
   return 'M'+simplified.map(p=>p.join(' ')).join('L')+'Z';
  });paths.push(shapes.join(''));
 }
 all[name]={idle:{width:362,height:724,rows:1,paths}};console.log(`${name}: transparent 6-cell atlas and alpha silhouettes saved`);
}
await writeFile(metadataFile,prefix+'export const SPRITE_SILHOUETTES = '+JSON.stringify(all)+' as const;\n');
