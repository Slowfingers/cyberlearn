import assert from 'node:assert/strict';
import {readFileSync} from 'node:fs';
import {createHash} from 'node:crypto';
import {PC_PARTS} from '../utils/pcAssembly';
const root=new URL('../public/art/pc-builder/models/',import.meta.url),manifest=JSON.parse(readFileSync(new URL('manifest.json',root),'utf8'));
assert.equal(manifest.files.length,6);assert.equal(manifest.license,'CC-BY-4.0');
const credits=readFileSync(new URL('LICENSES.md',root),'utf8');
for(const file of manifest.files){const b=readFileSync(new URL(file.file,root));assert.equal(b.readUInt32LE(0),0x46546c67);assert.equal(b.readUInt32LE(4),2);assert.equal(b.readUInt32LE(8),b.length);assert.equal(createHash('sha256').update(b).digest('hex'),file.sha256);const gltf=JSON.parse(b.subarray(20,20+b.readUInt32LE(12)).toString());assert.ok(gltf.meshes.length);assert.ok(gltf.materials.length);assert.ok(gltf.extensionsUsed.includes('EXT_meshopt_compression'));assert.ok((gltf.images??[]).every((i:any)=>!i.uri));assert.ok(credits.includes(file.file));assert.ok(PC_PARTS.some(p=>p.asset===file.file.replace('.glb','')));}
console.log(`PC assets: ${manifest.files.length} verified local GLBs, ${(manifest.files.reduce((n:number,f:any)=>n+f.bytes,0)/1e6).toFixed(2)} MB, embedded PBR/meshopt, hashes and attribution OK`);

let iconBytes=0;
for(const part of PC_PARTS){const image=readFileSync(`public/art/pc-builder/parts/${part.id}.png`);assert.equal(image.subarray(1,4).toString(),'PNG',part.id);assert.equal(image.readUInt32BE(16),256,part.id);assert.equal(image.readUInt32BE(20),192,part.id);iconBytes+=image.length;}
console.log(`PC inventory: ${PC_PARTS.length} local pre-rendered sprites, ${(iconBytes/1024/1024).toFixed(2)} MB; no lesson-time GPU readbacks`);
