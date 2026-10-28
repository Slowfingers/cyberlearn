// Development-only sprite exporter. Normal lessons use pre-rendered local PNGs.
import * as THREE from 'three';
import {PC_PARTS} from './pcAssembly';
export function renderPcInventoryArt(renderer:THREE.WebGLRenderer,environment:THREE.Texture|null,visuals:Map<string,THREE.Group>){
 const artwork:Record<string,string>={},target=new THREE.WebGLRenderTarget(256,192),scene=new THREE.Scene();scene.environment=environment;scene.environmentIntensity=.8;
 scene.add(new THREE.HemisphereLight('#e4efff','#334764',3));const light=new THREE.DirectionalLight('#ffffff',3);light.position.set(3,6,5);scene.add(light);
 const camera=new THREE.PerspectiveCamera(32,256/192,.01,100),pixels=new Uint8Array(256*192*4),canvas=document.createElement('canvas');canvas.width=256;canvas.height=192;const ctx=canvas.getContext('2d')!;
 const oldColor=renderer.getClearColor(new THREE.Color()),oldAlpha=renderer.getClearAlpha(),shadows=renderer.shadowMap.enabled,oldTarget=renderer.getRenderTarget();
 try{
  renderer.shadowMap.enabled=false;renderer.setClearColor(0x000000,0);
  for(const part of PC_PARTS){
   const model=visuals.get(part.id)!.clone(true);model.position.set(0,0,0);model.visible=true;model.updateMatrixWorld(true);
   const bounds=new THREE.Box3().setFromObject(model),center=bounds.getCenter(new THREE.Vector3()),sphere=bounds.getBoundingSphere(new THREE.Sphere());model.position.sub(center);scene.add(model);
   const distance=Math.max(.3,sphere.radius)/Math.sin(THREE.MathUtils.degToRad(16))*1.1;camera.position.set(3,4.5,5).normalize().multiplyScalar(distance);camera.lookAt(0,0,0);camera.far=distance+20;camera.updateProjectionMatrix();
   renderer.setRenderTarget(target);renderer.render(scene,camera);renderer.readRenderTargetPixels(target,0,0,256,192,pixels);
   const image=ctx.createImageData(256,192);for(let y=0;y<192;y++)image.data.set(pixels.subarray((191-y)*256*4,(192-y)*256*4),y*256*4);ctx.putImageData(image,0,0);artwork[part.id]=canvas.toDataURL('image/png');scene.remove(model);
  }
 }finally{renderer.setRenderTarget(oldTarget);renderer.setClearColor(oldColor,oldAlpha);renderer.shadowMap.enabled=shadows;target.dispose();}
 return artwork;
}
