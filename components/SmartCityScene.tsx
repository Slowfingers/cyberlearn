import React,{useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RotateCcw,Plus,Minus} from 'lucide-react';
import {advanceCityCar,CITY_TRAFFIC_LANES} from '../utils/cityTraffic';
import type {CityMission,CityFrame} from '../utils/smartCityRuntime';
interface Props {mission:CityMission;frame?:CityFrame;distance:number;connected:boolean;running:boolean;speed:number;onSpeedChange:(speed:number)=>void}
/** Original procedural scenery and devices; no imported course models or textures. */
export default function SmartCityScene(props:Props){
 const host=useRef<HTMLDivElement>(null),state=useRef(props);state.current=props;const controlsRef=useRef<OrbitControls>(null);const [unavailable,setUnavailable]=useState(false);
 useEffect(()=>{
  const element=host.current!;let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({antialias:true,alpha:false,preserveDrawingBuffer:true});}catch{setUnavailable(true);return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.75));renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.35;
  element.append(renderer.domElement);renderer.domElement.setAttribute('aria-label','Интерактивная 3D-модель умного города');
  const scene=new THREE.Scene();scene.background=new THREE.Color('#101b34');scene.fog=new THREE.Fog('#101b34',15,35);
  const camera=new THREE.PerspectiveCamera(38,1,.1,70);camera.position.set(9,7.8,11);const controls=new OrbitControls(camera,renderer.domElement);controlsRef.current=controls;controls.target.set(0,.8,0);controls.enableDamping=true;controls.minDistance=5;controls.maxDistance=23;controls.maxPolarAngle=Math.PI*.48;controls.update();controls.saveState();
  scene.add(new THREE.HemisphereLight('#b8d6ff','#303e5b',2.6));const sun=new THREE.DirectionalLight('#e1e9ff',3.5);sun.position.set(-5,10,6);sun.castShadow=true;sun.shadow.mapSize.set(1024,1024);sun.shadow.camera.left=-10;sun.shadow.camera.right=10;sun.shadow.camera.top=10;sun.shadow.camera.bottom=-10;sun.shadow.normalBias=.025;scene.add(sun);
  const cyan=new THREE.PointLight('#28d9ff',25,14);cyan.position.set(-4,3,-3);scene.add(cyan);const violet=new THREE.PointLight('#ab71ff',20,12);violet.position.set(5,3,-4);scene.add(violet);
  const mat=(color:string,metalness=.15,roughness=.5)=>new THREE.MeshStandardMaterial({color,metalness,roughness});
  const asphalt=mat('#202a3b',.1,.85),concrete=mat('#53637c',.1,.85),white=mat('#e5eaf5'),metal=mat('#74839b',.8,.25),dark=mat('#111a2a',.4,.35),neon=new THREE.MeshStandardMaterial({color:'#46d9ed',emissive:'#22b9d2',emissiveIntensity:1.4});
  const box=(w:number,h:number,d:number,x:number,y:number,z:number,m:THREE.Material,parent:THREE.Object3D=scene)=>{const mesh=new THREE.Mesh(new THREE.BoxGeometry(w,h,d),m);mesh.position.set(x,y,z);mesh.castShadow=true;mesh.receiveShadow=true;parent.add(mesh);return mesh;};
  const cylinder=(r:number,h:number,x:number,y:number,z:number,m:THREE.Material,parent:THREE.Object3D=scene)=>{const mesh=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,24),m);mesh.position.set(x,y,z);mesh.castShadow=true;parent.add(mesh);return mesh;};
  const sign=(text:string,x:number,y:number,z:number,w=2.2)=>{const canvas=document.createElement('canvas');canvas.width=768;canvas.height=144;const ctx=canvas.getContext('2d')!;ctx.fillStyle='#122b42';ctx.fillRect(0,0,768,144);ctx.strokeStyle='#55daed';ctx.lineWidth=6;ctx.strokeRect(4,4,760,136);ctx.fillStyle='#b7f3ff';ctx.font='bold 55px Arial';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(text,384,74);const texture=new THREE.CanvasTexture(canvas);texture.colorSpace=THREE.SRGBColorSpace;const mesh=new THREE.Mesh(new THREE.PlaneGeometry(w,w*144/768),new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));mesh.position.set(x,y,z);scene.add(mesh);return mesh;};
  // A quiet city block, with a large legible device in the foreground.
  box(12,.35,13,0,-.35,0,mat('#18273f'));box(3.4,.08,12,0,-.12,0,asphalt);
  for(const x of[-3.6,3.6]){box(3.6,.2,12,x,-.04,0,concrete);box(.08,.06,12,x<0?-1.9:1.9,.1,0,neon);}
  for(let z=-5.5;z<=5.5;z+=1.5)box(.08,.012,.65,0,-.072,z,white);
  for(let i=0;i<7;i++)box(2.8,.015,.24,0,-.06,.6+i*.46,white);
  const cityColors=['#243754','#30405a','#1d2e49'];
  for(let i=0;i<7;i++){const x=(i-3)*2.5,z=-5.7-(i%2)*1.2,h=2.4+(i*7%5)*.8;box(1.8,h,1.6,x,h/2,z,mat(cityColors[i%3],.35,.45));box(.06,h*.74,.04,x-.58,h*.53,z+.82,neon);for(let row=0;row<3;row++)for(let col=0;col<3;col++)box(.2,.16,.025,x-.45+col*.45,.7+row*.55,z+.82,mat(i%2?'#97a3d3':'#74c6d8'));box(1.9,.12,1.7,x,h,z,metal);}
  sign('CYBER / DISTRICT',-2.8,2.2,-4.7,2.5);
  for(const [x,z]of[[-3,3.7],[3.1,-3.2]] as const){box(.75,.45,.75,x,.15,z,dark);cylinder(.09,1,x,.75,z,mat('#5d4050'));const leaves=new THREE.Mesh(new THREE.IcosahedronGeometry(.63,1),mat('#3d7b79',.1,.8));leaves.position.set(x,1.35,z);scene.add(leaves);}
  // Original stylised Arduino board on a service pedestal.
  const board=new THREE.Group();board.position.set(-3.1,.62,1.2);board.rotation.y=.18;scene.add(board);box(2.4,.48,1.7,-3.1,.16,1.2,mat('#2b405b'));box(1.9,.09,1.25,0,0,0,mat('#16778a',.4,.4),board);
  box(.7,.13,.33,.1,.1,0,dark,board);box(.36,.3,.4,-.8,.15,.32,metal,board);box(.28,.22,.3,-.77,.13,-.36,dark,board);
  for(const z of[-.51,.51]){box(1.3,.14,.12,.12,.13,z,dark,board);for(let i=0;i<8;i++)box(.055,.02,.07,-.43+i*.15,.21,z,mat('#e0ba73',.8,.3),board);}
  for(let i=0;i<3;i++)cylinder(.065,.15,-.35+i*.18,.12,.28,metal,board);
  const boardLed=new THREE.MeshStandardMaterial({color:'#40dfc0',emissive:'#16bb9d',emissiveIntensity:2});box(.07,.025,.05,.58,.075,.22,boardLed,board);
  sign('ARDUINO / SERVICE',-3.1,1.35,1.85,1.8);
  // Traffic light with deep lens hoods and emissive bulbs.
  const lenses:THREE.MeshBasicMaterial[]=[];
  if(props.mission==='traffic'){
   box(1.45,.015,.08,-.85,-.055,3.56,white);box(1.45,.015,.08,.85,-.055,.38,white);
   cylinder(.075,2.3,1.55,1.1,.45,metal);box(.48,.18,.48,1.55,.09,.45,dark);box(.6,1.55,.48,1.55,2.65,.45,dark);box(.73,.12,.62,1.55,3.46,.45,metal);
   for(const [i,color]of['#ff4067','#ffca41','#2be6a5'].entries()){const ring=cylinder(.205,.12,1.55,3.13-i*.48,.74,dark);ring.rotation.x=Math.PI/2;const material=new THREE.MeshBasicMaterial({color:'#252e3c',toneMapped:false});lenses.push(material);const lens=new THREE.Mesh(new THREE.SphereGeometry(.158,24,16),material);lens.scale.z=.3;lens.position.set(1.55,3.13-i*.48,.82);scene.add(lens);box(.45,.07,.32,1.55,3.35-i*.48,.83,dark);}
   sign('CROSSING / 01',2.9,1.8,-1.5,1.9);
  }
  const arm=new THREE.Group();arm.position.set(1.55,1.22,-.35);
  if(props.mission==='gate'){
   scene.add(arm);box(.52,1.22,.58,1.55,.56,-.35,mat('#e1b74d',.5,.3));box(.62,.17,.67,1.55,1.22,-.35,dark);box(.55,.08,.6,1.55,.04,-.35,metal);
   box(3.3,.16,.2,-1.55,0,0,white,arm);for(let i=0;i<6;i++)box(.25,.17,.21,-.25-i*.54,0,0,mat('#fb536d'),arm);box(3.2,.03,.03,-1.55,-.1,.12,neon,arm);
   const servo=cylinder(.19,.24,1.55,1.22,.03,metal);servo.rotation.x=Math.PI/2;
   box(.85,.36,.12,2.5,1.08,.12,mat('#176b94'));for(const x of[2.25,2.72]){const sensor=cylinder(.185,.2,x,1.1,.26,metal);sensor.rotation.x=Math.PI/2;const inner=cylinder(.13,.014,x,1.1,.37,dark);inner.rotation.x=Math.PI/2;}
   cylinder(.045,.8,2.5,.5,.1,metal);sign('SMART / ENTRY',2.8,2.3,-1.1,2.1);
  }
  // Curved signal cables visibly connect the service board to the device.
  const wires=new THREE.Group();scene.add(wires);for(let i=0;i<3;i++){const points=[new THREE.Vector3(-2.5,.72,1.3+i*.11),new THREE.Vector3(-2,.3,2.8+i*.1),new THREE.Vector3(2.4,.25,2.8+i*.1),new THREE.Vector3(props.mission==='traffic'?1.55:2.2,.35,.4)];const curve=new THREE.CatmullRomCurve3(points);wires.add(new THREE.Mesh(new THREE.TubeGeometry(curve,40,.018,5,false),mat(['#f76989','#e3be5a','#5bd5d5'][i])));}
  function car(color:string){const root=new THREE.Group();const body=mat(color,.65,.28);box(.92,.28,1.75,0,.4,0,body,root);box(.76,.3,.8,0,.67,-.1,mat('#173953',.65,.15),root);box(.82,.06,.85,0,.86,-.1,body,root);box(.83,.08,.08,0,.38,.9,metal,root);for(const x of[-.47,.47])for(const z of[-.54,.52]){const tire=cylinder(.21,.13,x,.23,z,dark,root);tire.rotation.z=Math.PI/2;const hub=cylinder(.105,.14,x,.23,z,metal,root);hub.rotation.z=Math.PI/2;}for(const x of[-.31,.31])box(.18,.09,.03,x,.46,.89,neon,root);box(.65,.045,.02,0,.46,-.89,mat('#fc496c'),root);scene.add(root);return root;}
  const vehicle=car('#785bea');vehicle.position.set(-.85,0,5.2);vehicle.rotation.y=Math.PI;const second=props.mission==='traffic'?car('#2da6b7'):null;if(second){second.position.set(.85,0,CITY_TRAFFIC_LANES[1].start);second.rotation.y=0;}
  const resize=()=>{const {width,height}=element.getBoundingClientRect();if(!width||!height)return;renderer.setSize(width,height);camera.aspect=width/height;camera.updateProjectionMatrix();};const observer=new ResizeObserver(resize);observer.observe(element);resize();
  let request=0,last=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
  const render=(now:number)=>{request=requestAnimationFrame(render);const p=state.current,dt=Math.min((now-last)/1000,.06);last=now;const live=p.running&&p.connected;const frame=live?p.frame:undefined;
   lenses.forEach((m,i)=>{const active=!!frame?.pins[[8,9,10][i]];m.color.set(active?['#ff456d','#ffcc52','#43efb5'][i]:'#263348');});
   if(props.mission==='gate'){const target=-(frame?.angle??0)*Math.PI/180;arm.rotation.z=reduced?target:THREE.MathUtils.damp(arm.rotation.z,target,7,dt);vehicle.position.z=.525+p.distance/40;}
   else if(live){const green=!!frame?.pins[10]&&!frame?.pins[8]&&!frame?.pins[9];vehicle.position.z=advanceCityCar(vehicle.position.z,CITY_TRAFFIC_LANES[0],green,dt*p.speed);if(second)second.position.z=advanceCityCar(second.position.z,CITY_TRAFFIC_LANES[1],green,dt*p.speed);}
   element.dataset.carZ=String(vehicle.position.z);if(second)element.dataset.secondCarZ=String(second.position.z);element.dataset.signal=frame?.pins[8]?'red':frame?.pins[9]?'yellow':frame?.pins[10]?'green':'off';
   wires.visible=p.connected;boardLed.emissiveIntensity=live?2.3:.15;controls.update();renderer.render(scene,camera);
  };request=requestAnimationFrame(render);
  return()=>{cancelAnimationFrame(request);observer.disconnect();controls.dispose();controlsRef.current=null;const geometries=new Set<THREE.BufferGeometry>(),materials=new Set<THREE.Material>(),textures=new Set<THREE.Texture>();scene.traverse(object=>{if(object instanceof THREE.Mesh){geometries.add(object.geometry);for(const m of Array.isArray(object.material)?object.material:[object.material]){materials.add(m);const texture=(m as THREE.MeshBasicMaterial).map;if(texture)textures.add(texture);}}});geometries.forEach(g=>g.dispose());materials.forEach(m=>m.dispose());textures.forEach(t=>t.dispose());renderer.dispose();renderer.domElement.remove();};
 },[props.mission]);
 return <><div className="city-scene-canvas" ref={host} data-scene={props.mission}/>{unavailable&&<div className="city-webgl-error" role="alert">3D-модель недоступна: включи WebGL в браузере. Схему и программу можно изучать на вкладке «Подключение».</div>}<div className="city-camera"><select aria-label="Темп симуляции" title="Темп просмотра: ½× вдвое медленнее времени Arduino" value={props.speed} onChange={e=>props.onSpeedChange(Number(e.target.value))}><option value={.25}>¼×</option><option value={.5}>½×</option><option value={1}>1×</option></select><button aria-label="Отдалить модель" onClick={()=>{const c=controlsRef.current;if(c){c.object.position.sub(c.target).multiplyScalar(1.2).add(c.target);c.update();}}}><Minus size={17}/></button><button aria-label="Приблизить модель" onClick={()=>{const c=controlsRef.current;if(c){c.object.position.sub(c.target).multiplyScalar(.83).add(c.target);c.update();}}}><Plus size={17}/></button><button aria-label="Вернуть вид модели" onClick={()=>controlsRef.current?.reset()}><RotateCcw size={17}/></button><span>Вращай · приближай</span></div></>;
}
