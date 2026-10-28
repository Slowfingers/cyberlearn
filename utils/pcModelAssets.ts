import * as THREE from 'three';
import {GLTFLoader,type GLTF} from 'three/addons/loaders/GLTFLoader.js';
import {MeshoptDecoder} from 'three/addons/libs/meshopt_decoder.module.js';
import {clone} from 'three/addons/utils/SkeletonUtils.js';
import type {PcPart} from './pcAssembly';
export const PC_MODEL_CREDITS=[
 {id:'cpu',title:'PC CPU processor',author:'apleesee',url:'https://sketchfab.com/3d-models/pc-cpu-processor-efb6b95b255c4a37a9661df178ea3bb3'},
 {id:'gpu',title:'GeForce RTX 3080 Graphics Card',author:'_surovic_',url:'https://sketchfab.com/3d-models/geforce-rtx-3080-graphics-card-8b947ee1bf7a4e3d8ffa1c24893ac160'},
 {id:'psu',title:'PSU Power Supply Unit',author:'Groovex',url:'https://sketchfab.com/3d-models/psu-power-supply-unit-69ccd1be3a77497cb2acc9e39e7c52b3'},
 {id:'ram',title:'Corsairn VENGEANCE RGB PRO',author:'Nouraiz',url:'https://sketchfab.com/3d-models/corsairn-vengeance-rgb-pro-9b163c4d5ad34edca58488500b5f4daf'},
 {id:'storage',title:'M.2 NVME SSD Samsung 990 Pro 1TB',author:'lime.ball.animations',url:'https://sketchfab.com/3d-models/m2-nvme-ssd-samsung-990-pro-1tb-3d-model-41b7bfda7eab40f8b13330913fd66fc2'},
 {id:'fan',title:'120mm Computer Fans',author:'kusuma844',url:'https://sketchfab.com/3d-models/120mm-computer-fans-6c17bfc4a2a5438eb9996fb3c73e1a91'},
] as const;
export type PcAssetId=typeof PC_MODEL_CREDITS[number]['id'];
let loading:Promise<Partial<Record<PcAssetId,GLTF>>>|undefined;
export function loadPcModels(){
 return loading??=(async()=>{const loader=new GLTFLoader().setMeshoptDecoder(MeshoptDecoder);const results=await Promise.allSettled(PC_MODEL_CREDITS.map(async entry=>{
  const gltf=await loader.loadAsync(`/art/pc-builder/models/${entry.id}.glb`);
  // Cached source resources live for the page; mounted copies must not dispose them.
  gltf.scene.traverse(o=>{if(o instanceof THREE.Mesh){o.geometry.userData.pcShared=true;for(const m of Array.isArray(o.material)?o.material:[o.material])m.userData.pcShared=true;}});
  return [entry.id,gltf] as const;
 }));return Object.fromEntries(results.flatMap(r=>r.status==='fulfilled'?[r.value]:[]));})();
}
function fit(source:THREE.Object3D,rotation:[number,number,number],size:[number,number,number],uniform=true,stripJunk=false){
 const model=clone(source);model.position.set(0,0,0);const junk=model.getObjectByName('Object_78');if(stripJunk&&junk)junk.removeFromParent();
 const root=new THREE.Group();root.add(model);root.rotation.set(...rotation);root.updateMatrixWorld(true);let bounds=new THREE.Box3().setFromObject(root),extent=bounds.getSize(new THREE.Vector3());
 const scale=uniform?Math.min(...size.map((n,i)=>n/Math.max(.0001,extent.getComponent(i)))):undefined;
 root.scale.set(...(scale?[scale,scale,scale]:size.map((n,i)=>n/Math.max(.0001,extent.getComponent(i)))) as [number,number,number]);root.updateMatrixWorld(true);
 bounds=new THREE.Box3().setFromObject(root);const center=bounds.getCenter(new THREE.Vector3());root.position.set(-center.x,-bounds.min.y,-center.z);
 const wrapper=new THREE.Group();wrapper.add(root);return wrapper;
}
export function createPcModel(part:PcPart,assets:Partial<Record<PcAssetId,GLTF>>):{object:THREE.Group;animations:THREE.AnimationClip[]}|undefined{
 const gltf=part.asset&&assets[part.asset];if(!gltf)return;
 let object:THREE.Group;
 if(part.asset==='gpu')object=fit(gltf.scene,[-Math.PI/2,0,Math.PI/2],[3.5,1.5,.65]);
 else if(part.asset==='cpu')object=fit(gltf.scene,[0,0,0],[.83,.15,.83]);
 else if(part.asset==='psu')object=fit(gltf.scene,[0,Math.PI/2,0],[1.75,1.1,2.3],false,true);
 else if(part.asset==='storage')object=fit(gltf.scene,[0,Math.PI/2,0],[.45,.08,1.12]);
 else if(part.asset==='ram'){
  object=new THREE.Group();for(const x of[-.21,.21]){const stick=fit(gltf.scene,[0,0,0],[.13,.8,2]);stick.position.x=x;object.add(stick);}
 }else{
  const bounds=new THREE.Box3().setFromObject(gltf.scene),size=bounds.getSize(new THREE.Vector3());const axis=size.x<size.y&&size.x<size.z?0:size.z<size.y?2:1;
  object=fit(gltf.scene,axis===0?[0,0,Math.PI/2]:axis===2?[Math.PI/2,0,0]:[0,0,0],[1.15,.32,1.15]);object.position.y=.2;
 }
 return{object,animations:gltf.animations};
}
