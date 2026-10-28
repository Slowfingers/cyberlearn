import React,{useEffect,useRef,useState} from 'react';
import * as THREE from 'three';
import {createPortal} from 'react-dom';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {RectAreaLightUniformsLib} from 'three/addons/lights/RectAreaLightUniformsLib.js';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
import {RoundedBoxGeometry} from 'three/addons/geometries/RoundedBoxGeometry.js';
import {createPcModel,loadPcModels} from '../utils/pcModelAssets';
import {Minus,Plus,RotateCcw} from 'lucide-react';
import {PC_LABELS,PC_PARTS,PC_SLOTS,PC_MOUNTS,PC_PORTS,PC_CABLES,pcIsCable,pcPart,pcPortLabel,pcMountLabel,pcPortPosition,pcRamSlots,PC_DEFAULTS,type PcPart,type PcBuild,type PcSlot,type PcMountId,type PcPortId} from '../utils/pcAssembly';
let areaLightsReady=false;
const inventoryArtwork=Object.fromEntries(PC_PARTS.map(part=>[part.id,`/art/pc-builder/parts/${part.id}.png`]));
interface Props {onArtwork:(art:Record<string,string>)=>void;build:PcBuild;selected:string|null;powered:boolean;bootScreen?:React.ReactNode;onExitBoot?:()=>void;labels:boolean;selectedPort:PcPortId|null;onMount:(mount:PcMountId)=>void;onPort:(port:PcPortId)=>void;onInspect:(slot:PcSlot)=>void}
const POS:Record<PcSlot,[number,number,number]>={board:[-.8,.34,0],cpu:[-1.35,.53,-.7],paste:[-1.35,.69,-.7],cooler:[-1.35,.78,-.7],ram:[.38,.55,-.55],ssd:[-.3,.47,.75],psu:[2.28,.6,-.15],gpu:[-1.1,.63,1.5],atx:[.82,.53,-.2],eps:[-2.3,.53,-1.8],pcie:[.15,1.28,1.5],front:[.65,.52,1.6],display:[-2.9,1.05,1.5]};
const SIZE:Record<PcSlot,[number,number,number]>={board:[4.1,.12,4.2],cpu:[.83,.16,.83],paste:[.3,.04,.3],cooler:[1.22,1.2,1.13],ram:[.58,.7,2.1],ssd:[.5,.08,1.15],psu:[1.75,1.1,2.9],gpu:[3.5,1.15,.8],atx:[.38,.12,.72],eps:[.5,.12,.3],pcie:[.4,.16,.25],front:[.32,.12,.35],display:[.25,.25,.6]};
/** Original interactive workshop plus attributed CC BY component models. See the in-game credits. */
export default function PcBuilderScene(props:Props){
 const host=useRef<HTMLDivElement>(null),labelHost=useRef<HTMLDivElement>(null),current=useRef(props);current.current=props;
 const [monitorElement]=useState(()=>{const node=document.createElement('div');node.className='pc-monitor-display';return node;});
 const controlsRef=useRef<OrbitControls>(null);const [unavailable,setUnavailable]=useState(false);
 useEffect(()=>{
  const element=host.current!;let renderer:THREE.WebGLRenderer;
  try{renderer=new THREE.WebGLRenderer({alpha:true,antialias:true,preserveDrawingBuffer:true});}catch{setUnavailable(true);return;}
  renderer.setPixelRatio(Math.min(devicePixelRatio,1.6));renderer.outputColorSpace=THREE.SRGBColorSpace;renderer.toneMapping=THREE.ACESFilmicToneMapping;renderer.toneMappingExposure=1.05;renderer.shadowMap.enabled=true;renderer.shadowMap.type=THREE.PCFSoftShadowMap;
  renderer.domElement.setAttribute('aria-label','3D-конструктор компьютера. Вращай мышью или пальцем. Выбери деталь и место установки или соедини два разъёма кабелем.');element.append(renderer.domElement);renderer.domElement.style.position='absolute';renderer.domElement.style.inset='0';renderer.domElement.style.zIndex='1';
  const displayLayer=document.createElement('div');displayLayer.className='pc-monitor-layer';displayLayer.append(monitorElement);element.append(displayLayer);
  let sceneDirty=true,renderCount=0;
  const scene=new THREE.Scene();scene.background=new THREE.Color('#202c30');scene.fog=new THREE.Fog('#202c30',28,60);
  const pmrem=new THREE.PMREMGenerator(renderer),environment=new RoomEnvironment();const envTarget=pmrem.fromScene(environment,.04);scene.environment=envTarget.texture;environment.dispose();pmrem.dispose();scene.environmentIntensity=.55;
  const camera=new THREE.PerspectiveCamera(36,1,.1,80);camera.position.set(7,10.2,11);const controls=new OrbitControls(camera,renderer.domElement);controlsRef.current=controls;controls.target.set(0,1.0,-.3);controls.enableDamping=true;controls.minDistance=7;controls.maxDistance=55;controls.maxPolarAngle=Math.PI*.46;controls.update();controls.saveState();
  scene.add(new THREE.HemisphereLight('#dbe9f5','#30312e',.7));
  const key=new THREE.DirectionalLight('#ffe4c0',2.65);key.position.set(-3,10,5);key.castShadow=true;key.shadow.mapSize.set(2048,2048);key.shadow.camera.left=-9;key.shadow.camera.right=9;key.shadow.camera.top=9;key.shadow.camera.bottom=-9;key.shadow.normalBias=.025;key.shadow.bias=-.00015;key.shadow.radius=4;scene.add(key);
  const fill=new THREE.DirectionalLight('#b6cfdf',.65);fill.position.set(6,4,-3);scene.add(fill);
  if(!areaLightsReady){RectAreaLightUniformsLib.init();areaLightsReady=true;}const softbox=new THREE.RectAreaLight('#ffe4be',4,5,3);softbox.position.set(-4,6,1);softbox.lookAt(0,0,0);scene.add(softbox);
  const cyan=new THREE.PointLight('#65d4e4',9,12);cyan.position.set(-5,2,-3);scene.add(cyan);const purple=new THREE.PointLight('#a89cdd',7,12);purple.position.set(5,3,-1);scene.add(purple);
  const materials:THREE.Material[]=[];
  const material=(color:string,metalness=.3,roughness=.45)=>{const m=new THREE.MeshStandardMaterial({color,metalness,roughness});materials.push(m);return m;};
  const glow=(color:string)=>{const m=new THREE.MeshStandardMaterial({color,emissive:color,emissiveIntensity:1.7,roughness:.3});materials.push(m);return m;};
  const dark=material('#192336',.65,.38),edge=material('#637896',.85,.26),black=material('#0e1520',.4,.5),silver=material('#c0ccda',.85,.3),gold=material('#d5b66a',.8,.3),pcb=material('#234a51',.35,.55),cyanMat=glow('#53d6d2'),violet=glow('#9568f7'),white=material('#d6e5f4');
  const grain=new Uint8Array(256*64*4);for(let y=0;y<64;y++)for(let x=0;x<256;x++){const i=(y*256+x)*4,n=((x*73+y*19)%17)-8;grain[i]=128+n;grain[i+1]=128+Math.round(Math.sin(x*.9)*3);grain[i+2]=255;grain[i+3]=255;}const brushed=new THREE.DataTexture(grain,256,64,THREE.RGBAFormat);brushed.wrapS=brushed.wrapT=THREE.RepeatWrapping;brushed.repeat.set(3,3);brushed.needsUpdate=true;silver.normalMap=brushed;silver.normalScale.set(.13,.13);edge.normalMap=brushed;edge.normalScale.set(.08,.08);
  const box=(parent:THREE.Object3D,w:number,h:number,d:number,x:number,y:number,z:number,m:THREE.Material)=>{const o=new THREE.Mesh(w>1&&h>.3&&d>.3?new RoundedBoxGeometry(w,h,d,2,Math.min(w,h,d)*.08):new THREE.BoxGeometry(w,h,d),m);o.position.set(x,y,z);o.castShadow=true;o.receiveShadow=true;parent.add(o);return o;};
  const cyl=(parent:THREE.Object3D,r:number,h:number,x:number,y:number,z:number,m:THREE.Material,segments=24)=>{const o=new THREE.Mesh(new THREE.CylinderGeometry(r,r,h,segments),m);o.position.set(x,y,z);o.castShadow=true;parent.add(o);return o;};
  const text=(parent:THREE.Object3D,label:string,w:number,x:number,y:number,z:number,ground=true,color='#bce9ed')=>{const canvas=document.createElement('canvas');canvas.width=512;canvas.height=80;const ctx=canvas.getContext('2d')!;ctx.fillStyle=color;ctx.font='600 38px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(label,256,43,496);const map=new THREE.CanvasTexture(canvas);map.colorSpace=THREE.SRGBColorSpace;const m=new THREE.MeshBasicMaterial({map,transparent:true,depthWrite:false,side:THREE.DoubleSide});materials.push(m);const o=new THREE.Mesh(new THREE.PlaneGeometry(w,w*80/512),m);o.position.set(x,y,z);if(ground)o.rotation.x=-Math.PI/2;parent.add(o);return o;};
  const line=(parent:THREE.Object3D,points:number[][],m:THREE.Material,r=.035)=>{const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p as [number,number,number])));const o=new THREE.Mesh(new THREE.TubeGeometry(curve,32,r,8,false),m);parent.add(o);return o;};
  const fans:THREE.Group[]=[];
  const fan=(parent:THREE.Object3D,r:number,x:number,y:number,z:number,orientation:'top'|'front'='top')=>{
   const g=new THREE.Group();g.position.set(x,y,z);if(orientation==='front')g.rotation.x=Math.PI/2;parent.add(g);g.userData.pcFan=true;
   cyl(g,r,.08,0,0,0,black,32);const ring=new THREE.Mesh(new THREE.TorusGeometry(r*.92,.025,8,48),cyanMat);ring.rotation.x=Math.PI/2;ring.position.y=.055;g.add(ring);
   const rotor=new THREE.Group();rotor.userData.pcRotor=true;rotor.position.y=.07;g.add(rotor);for(let i=0;i<7;i++){const blade=box(rotor,r*.37,.03,r*.72,0,0,r*.45,dark);blade.rotation.y=i*Math.PI*2/7+.45;blade.position.set(Math.sin(i*Math.PI*2/7)*r*.45,0,Math.cos(i*Math.PI*2/7)*r*.45);}cyl(rotor,r*.2,.06,0,.03,0,silver);fans.push(rotor);return g;
  };
  // A real layered workbench: walnut top, soft task lamp, ESD mat and tools.
  const woodCanvas=document.createElement('canvas');woodCanvas.width=1024;woodCanvas.height=512;const woodCtx=woodCanvas.getContext('2d')!;
  woodCtx.fillStyle='#72523d';woodCtx.fillRect(0,0,1024,512);
  for(let y=0;y<512;y++){const shade=91+Math.sin(y*.13)*9+Math.sin(y*.71)*4;woodCtx.strokeStyle=`rgba(${shade+45},${shade+9},${shade-14},.42)`;woodCtx.lineWidth=y%17===0?2:1;woodCtx.beginPath();woodCtx.moveTo(0,y);for(let x=0;x<=1024;x+=16)woodCtx.lineTo(x,y+Math.sin(x*.008+y*.031)*2.5);woodCtx.stroke();}
  const woodTexture=new THREE.CanvasTexture(woodCanvas);woodTexture.colorSpace=THREE.SRGBColorSpace;woodTexture.wrapS=woodTexture.wrapT=THREE.RepeatWrapping;woodTexture.repeat.set(2,1);woodTexture.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());
  const walnut=material('#ffffff',.05,.66);walnut.map=woodTexture;
  box(scene,12.8,.42,9.8,0,-.43,-.7,walnut);box(scene,12.9,.09,9.9,0,-.69,-.7,dark);
  for(const x of[-5.7,5.7])for(const z of[-4.6,3.9])box(scene,.3,2.5,.3,x,-1.9,z,black);
  const floor=box(scene,15.4,.14,12.4,0,-3.2,-.5,material('#514c43',.02,.93));floor.receiveShadow=true;
  for(let i=0;i<16;i++)box(scene,.012,.003,12.3,-7.2+i*.96,-3.125,-.5,material('#393b36',0,1));
  box(scene,10,.025,4.6,0,-3.11,2.2,material('#3b5356',0,1));
  for(const z of[.08,4.32])box(scene,9.6,.005,.04,0,-3.095,z,material('#84918a',0,1));
  // Closed storage under the worktop keeps a small room useful without cluttering the bench.
  box(scene,1.8,2.55,2.2,-5.2,-1.95,.4,material('#3b4a4b',.05,.84));
  for(let i=0;i<3;i++){box(scene,1.65,.7,.06,-5.2,-2.73+i*.8,1.53,material('#59625b',.04,.8));box(scene,.58,.045,.07,-5.2,-2.64+i*.8,1.59,edge);}

  box(scene,9.5,.045,7.1,-.3,-.19,.35,material('#203d47',.02,.94));
  // Fine seam around the mat, no full-screen grid competing with the hardware.
  for(const z of[-3.08,3.78])box(scene,9.2,.003,.012,-.3,-.164,z,material('#58757b',.05,.9));
  for(const x of[-4.85,4.25])box(scene,.012,.003,6.85,x,-.164,.35,material('#58757b',.05,.9));
  text(scene,'CYBERLEARN / HARDWARE LAB',3.3,-1,-.16,3.5,true,'#8da9ac');
  text(scene,'ESD  /  WORK AREA',1.9,-3,-.16,-2.8,true,'#8da9ac');
  const lampWarm=glow('#ffe4b5');lampWarm.emissiveIntensity=1.1;
  cyl(scene,.55,.12,-5.3,-.14,-3.6,dark);line(scene,[[-5.3,-.05,-3.6],[-5.3,3.3,-3.6],[-3.7,4.4,-3.1]],edge,.07);
  const lampHead=box(scene,2.0,.16,.65,-3.6,4.4,-3.1,dark);lampHead.rotation.z=-.12;box(scene,1.8,.025,.48,-3.6,4.29,-3.1,lampWarm);
  // Rear wall and a modest tool rail keep the workspace grounded in a room.
  const backdrop=new THREE.Group();scene.add(backdrop);
  box(backdrop,14.2,7,.18,0,.5,-5.75,material('#34423f',.03,.96));
  box(backdrop,14.2,.19,.11,0,-2.84,-5.59,walnut);
  const sideWall=new THREE.Group();scene.add(sideWall);
  box(sideWall,.18,7,10.4,-7.05,.5,-.64,material('#565347',.02,.96));
  box(sideWall,.11,.19,10.3,-6.9,-2.84,-.64,walnut);
  // A small frosted side window gives cool, broad fill opposite the warm task lamp.
  box(sideWall,.13,2.3,2.9,-6.91,1.55,1.5,walnut);
  const nightGlass=material('#405c69',.1,.6);nightGlass.emissive.set('#283c4b');nightGlass.emissiveIntensity=.45;
  box(sideWall,.035,2.05,2.62,-6.83,1.55,1.5,nightGlass);
  for(let i=0;i<8;i++)box(sideWall,.08,.035,2.58,-6.78,.69+i*.245,1.5,material('#a5a08a',.03,.92));
  box(sideWall,.48,.1,3.05,-6.75,.35,1.5,walnut);
  const windowFill=new THREE.RectAreaLight('#accbdd',1.5,2.5,1.9);windowFill.position.set(-6.7,1.65,1.5);windowFill.lookAt(0,.2,0);sideWall.add(windowFill);
  // Small acoustic felt panels add texture to the near side wall.
  for(let i=0;i<3;i++)box(sideWall,.06,2.2,1.0,-6.93,1.0,-3.8+i*1.2,material(i===1?'#8b7e64':'#6d766b',.01,.97));

  for(const x of[-6,-3,0,3,6])box(backdrop,.025,5.7,.015,x,0,-5.64,edge);
  box(backdrop,4.7,1.7,.12,-4,2.0,-5.5,material('#314755',.3,.7));
  for(let row=0;row<5;row++)for(let col=0;col<12;col++)cyl(backdrop,.016,.035,-6.1+col*.37,1.42+row*.26,-5.41,black,8).rotation.x=Math.PI/2;
  for(let i=0;i<3;i++){box(backdrop,.17,.55,.15,-5.5+i*.7,1.95,-5.32,i===1?cyanMat:material('#b87f4d'));box(backdrop,.035,.5,.035,-5.5+i*.7,1.47,-5.32,silver);}
  // Taped, slightly crooked paper posters with lifted lower corners.
  const posterMaps:THREE.Texture[]=[];
  const posterAtlas=new THREE.TextureLoader().load('/art/pc-builder/workshop-meme-posters-v2.webp',()=>{sceneDirty=true;for(const map of posterMaps)map.needsUpdate=true;element.dataset.postersLoaded='2';});
  posterAtlas.colorSpace=THREE.SRGBColorSpace;
  const paperBack=material('#e5d7b5',0,.98),tapeMat=new THREE.MeshStandardMaterial({color:'#d7c79c',roughness:.97,transparent:true,opacity:.73,side:THREE.DoubleSide});materials.push(tapeMat);paperBack.side=THREE.DoubleSide;
  for(let i=0;i<2;i++){
   const sheet=new THREE.Group();sheet.position.set(3.05+i*2.4,1.65,-5.625);sheet.rotation.z=i?-.052:.036;backdrop.add(sheet);
   const geometry=new THREE.PlaneGeometry(2.0,2.667,18,24),positions=geometry.attributes.position;
   for(let v=0;v<positions.count;v++){const x=positions.getX(v),y=positions.getY(v),u=(x+1)/2,t=(y+1.3335)/2.667,corner=i?1-u:u;
    const bottom=Math.pow(Math.max(0,1-t/.28),2);positions.setZ(v,.012+bottom*(.055+.22*Math.pow(corner,3))+.008*Math.sin(u*8+t*5)*Math.pow(1-t,2));
   }geometry.computeVertexNormals();
   const map=posterAtlas.clone();map.repeat.set(.5,1);map.offset.x=i*.5;map.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());posterMaps.push(map);
   const paper=new THREE.MeshStandardMaterial({map,roughness:.98,metalness:0,emissive:'#ffffff',emissiveMap:map,emissiveIntensity:.08,shadowSide:THREE.DoubleSide});materials.push(paper);
   const back=new THREE.Mesh(geometry,paperBack);back.position.z=-.006;back.scale.set(1.012,1.009,1);back.castShadow=true;sheet.add(back);
   const art=new THREE.Mesh(geometry,paper);art.castShadow=art.receiveShadow=true;sheet.add(art);
   for(const [x,angle] of [[-.73,-.24],[.73,.19]]){const strip=new THREE.Mesh(new THREE.PlaneGeometry(.37,.19,3,1),tapeMat);strip.position.set(x,1.23,.028);strip.rotation.z=angle*(i?-1:1);sheet.add(strip);}
  }
  const wallWash=new THREE.PointLight('#ffd3a0',5,7,2);wallWash.position.set(4.3,2.8,-4.75);scene.add(wallWash);
  // A floating shelf, quiet books and a small plant soften the technical room.
  box(backdrop,4.5,.14,.8,-4.25,.32,-5.1,walnut);
  for(const x of[-5.9,-2.7])box(backdrop,.09,.35,.55,x,.08,-5.2,dark);
  const bookColors=['#a5694e','#4e7c86','#d2bd88','#77749c'];
  for(let i=0;i<4;i++){const h=.48+(i%2)*.11,x=-5.85+i*.23;box(backdrop,.18,h,.48,x,.41+h/2,-5.1,material(bookColors[i],.02,.9));box(backdrop,.13,h*.8,.012,x,.41+h/2,-4.85,material('#c9bea4',.01,.95));}
  const plant=(x:number,y:number,z:number,scale=1,parent:THREE.Object3D=scene)=>{
   const g=new THREE.Group();g.position.set(x,y,z);g.scale.setScalar(scale);parent.add(g);
   const pot=new THREE.Mesh(new THREE.CylinderGeometry(.28,.2,.4,24),material('#bf9574',.04,.88));pot.position.y=.2;pot.castShadow=true;g.add(pot);cyl(g,.255,.025,0,.406,0,material('#3b3028',0,1));
   const leafMat=material('#486e53',.02,.83);
   for(let i=0;i<7;i++){const angle=i*2.4,height=.52+(i%3)*.17,end=new THREE.Vector3(Math.cos(angle)*.34,height+.32,Math.sin(angle)*.3);line(g,[[0,.39,0],[end.x*.4,height,end.z*.4],end.toArray()],leafMat,.014);const leaf=new THREE.Mesh(new THREE.SphereGeometry(1,10,6),leafMat);leaf.scale.set(.09,.27,.055);leaf.position.copy(end);leaf.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),new THREE.Vector3(end.x,.22,end.z).normalize());leaf.castShadow=true;g.add(leaf);}
  };
  plant(-3.25,.4,-5.08,.8,backdrop);plant(-5.9,-.2,-4.6,1.1);
  // Warm under-shelf strip and a mug on a coaster, well clear of installation targets.
  box(backdrop,4.1,.014,.05,-4.25,.235,-4.78,lampWarm);
  cyl(scene,.35,.018,-5.45,-.202,-1.4,material('#b39a76',.01,.9));
  const ceramic=material('#81a7aa',.04,.28),cup=new THREE.Mesh(new THREE.CylinderGeometry(.23,.2,.38,32,1,true),ceramic);cup.position.set(-5.45,0,-1.4);cup.castShadow=true;scene.add(cup);cyl(scene,.2,.025,-5.45,-.17,-1.4,ceramic);cyl(scene,.205,.012,-5.45,.16,-1.4,material('#5b3e2a',0,.3));
  const rim=new THREE.Mesh(new THREE.TorusGeometry(.225,.018,8,32),ceramic);rim.rotation.x=Math.PI/2;rim.position.set(-5.45,.19,-1.4);scene.add(rim);
  const handle=new THREE.Mesh(new THREE.TorusGeometry(.13,.033,8,24),ceramic);handle.position.set(-5.17,.015,-1.4);scene.add(handle);
  const taskLight=new THREE.SpotLight('#ffd9a3',18,15,.73,.9,2);taskLight.position.set(-3.6,4.25,-3.1);taskLight.target.position.set(-.4,.1,.3);taskLight.castShadow=element.clientWidth>650;taskLight.shadow.mapSize.set(1024,1024);taskLight.shadow.normalBias=.025;scene.add(taskLight,taskLight.target);
  const contactCanvas=document.createElement('canvas');contactCanvas.width=512;contactCanvas.height=512;const contactCtx=contactCanvas.getContext('2d')!,contactGradient=contactCtx.createRadialGradient(256,256,55,256,256,250);contactGradient.addColorStop(0,'rgba(0,0,0,.34)');contactGradient.addColorStop(.7,'rgba(0,0,0,.14)');contactGradient.addColorStop(1,'rgba(0,0,0,0)');contactCtx.fillStyle=contactGradient;contactCtx.fillRect(0,0,512,512);
  const contactMap=new THREE.CanvasTexture(contactCanvas),contactMaterial=new THREE.MeshBasicMaterial({map:contactMap,transparent:true,depthWrite:false});materials.push(contactMaterial);const contact=new THREE.Mesh(new THREE.PlaneGeometry(8.8,6.8),contactMaterial);contact.rotation.x=-Math.PI/2;contact.position.set(0,-.155,0);scene.add(contact);
  // Magnetic screw tray and two hand tools, outside the chassis picking area.
  box(scene,1.0,.08,1.1,-5.35,-.15,2.45,dark);for(let i=0;i<6;i++){const x=-5.65+(i%3)*.27,z=2.2+Math.floor(i/3)*.43;cyl(scene,.055,.07,x,-.07,z,silver,12);box(scene,.055,.005,.012,x,-.031,z,black);}
  const screwdriver=new THREE.Group();screwdriver.position.set(5.2,-.08,.8);screwdriver.rotation.z=Math.PI/2;screwdriver.rotation.y=.24;scene.add(screwdriver);cyl(screwdriver,.14,.55,0,0,0,material('#b77649'));cyl(screwdriver,.035,.8,0,.65,0,silver,12);box(screwdriver,.06,.13,.025,0,1.1,0,silver);
  const driver2=screwdriver.clone(true);driver2.position.set(5.7,-.08,1.2);driver2.scale.setScalar(.75);scene.add(driver2);
  line(scene,[[-4.9,-.06,-.5],[-5.7,-.06,-.3],[-5.9,-.06,.5],[-5.2,-.06,.8]],material('#3c90a5'),.025);
  box(scene,.55,.07,.35,-4.85,-.09,-.5,material('#4f90a1'));
  box(scene,7.5,.18,5.5,0,0,0,edge);box(scene,7.25,.08,5.25,0,.13,0,dark);
  for(const z of[-2.66,2.66]){box(scene,7.35,.38,.12,0,.31,z,dark);box(scene,7.35,.035,.025,0,.5,z,cyanMat);}
  box(scene,.12,.5,5.3,-3.65,.36,0,edge);box(scene,.18,.9,5.3,3.65,.55,0,dark);
  box(scene,.08,.72,3.65,3.76,.57,-.1,black);for(let i=0;i<18;i++)box(scene,.015,.025,3.4,3.81,.27+i*.035,-.1,edge);
  const powerLed=glow('#43e0c3');cyl(scene,.1,.04,3.63,1.04,1.94,powerLed);text(scene,'POWER',.7,3.2,.52,2.3);for(const x of[-3.3,3.3])for(const z of[-2.3,2.3])cyl(scene,.15,.28,x,-.17,z,black);
  // Standoffs and motherboard landing bay.
  for(const x of[-2.6,.95])for(const z of[-1.8,1.8])cyl(scene,.065,.15,x,.24,z,gold,12);
  const groups={} as Record<PcSlot,THREE.Group>,hitTargets:THREE.Mesh[]=[];
  for(const slot of PC_SLOTS){const g=new THREE.Group();g.position.set(...POS[slot]);scene.add(g);groups[slot]=g;const hit=new THREE.Mesh(new THREE.BoxGeometry(...SIZE[slot]),new THREE.MeshBasicMaterial({visible:false}));hit.position.set(...POS[slot]);hit.position.y+=SIZE[slot][1]/2;hit.userData.slot=slot;scene.add(hit);hitTargets.push(hit);}
  const b=groups.board;box(b,4.1,.1,4.2,0,0,0,pcb);
  for(let i=0;i<4;i++){box(b,.35,.2,.35,-1.82,.22,-1.35+i*.47,silver);box(b,.05,.12,.26,-2.01,.23,-1.35+i*.47,black);}
  // Copper traces deliberately give the board a manufactured, readable surface.
  const trace=material('#3b7775',.65,.45);for(let i=0;i<18;i++){const x=-1.85+i*.215;box(b,.012,.008,.55,x,.058,1.57,trace);box(b,.16,.008,.012,x+.08,.058,1.3,trace);}
  for(let i=0;i<12;i++){const x=-1.2+(i%4)*.3,z=.1+Math.floor(i/4)*.27;box(b,.18,.07,.16,x,.11,z,black);}
  for(let i=0;i<11;i++){const z=-1.8+i*.31;box(b,.55,.008,.012,-1.65,.058,z,trace);}
  for(const x of[-1.8,1.8])for(const z of[-1.8,1.8]){cyl(b,.065,.03,x,.065,z,silver,12);box(b,.07,.007,.012,x,.084,z,black);}
  // Empty CPU socket, RAM A1/A2/B1/B2, M.2 connector and PCIe slot.
  box(b,.99,.1,.99,-.55,.12,-.7,black);box(b,.9,.04,.9,-.55,.19,-.7,edge);for(let i=0;i<4;i++){box(b,.11,.13,2.15,.76+i*.21,.14,-.55,black).userData.pcDimm=i;for(const z of[-1.67,.57])box(b,.15,.17,.12,.76+i*.21,.16,z,i%2?white:edge).userData.pcDimm=i;}
  box(b,3.3,.15,.15,-.1,.14,1.5,black);box(b,.45,.12,.14,.5,.12,.24,black);
  for(let i=0;i<6;i++){box(b,.28,.25,.24,-1.35+i*.24,.18,-1.7,edge);for(let f=0;f<4;f++)box(b,.025,.07,.26,-1.46+i*.24+f*.065,.34,-1.7,silver);}
  for(let i=0;i<9;i++){cyl(b,.055,.17,-1.7+i*.17,.14,-1.25,silver,12);cyl(b,.04,.02,-1.7+i*.17,.235,-1.25,black,12);}
  box(b,.5,.3,.9,-1.8,.2,-.25,silver);box(b,.48,.15,.45,-.35,.15,.72,black);text(b,'NOVA / PC LAB',1.3,-.6,.07,.1);const dimmLegend=text(b,'A2   B2',.9,1.1,.07,.88);dimmLegend.userData.pcDimmLegend=true;text(b,'M.2',.6,.6,.07,.77);text(b,'PCIe x16',1.6,-.5,.07,1.85);
  const cpu=groups.cpu;box(cpu,.84,.06,.84,0,0,0,material('#345d5c'));box(cpu,.76,.12,.76,0,.09,0,silver);text(cpu,'CPU',.65,0,.155,0).userData.pcCpuLegend=true;const mark=new THREE.Mesh(new THREE.CircleGeometry(.06,3),gold);mark.rotation.x=-Math.PI/2;mark.position.set(-.3,.156,.3);cpu.add(mark);
  const paste=groups.paste;const dot=new THREE.Mesh(new THREE.SphereGeometry(.14,16,8),material('#b5b9c6'));dot.scale.y=.17;paste.add(dot);
  const cooler=groups.cooler;box(cooler,1.04,.12,.95,0,.01,0,silver);for(let i=0;i<12;i++)box(cooler,1.06,.035,.95,0,.15+i*.064,0,silver);for(const x of[-.32,.32])cyl(cooler,.045,.93,x,.42,0,gold);box(cooler,1.14,.08,1.05,0,.94,0,dark);fan(cooler,.46,0,1.02,0);text(cooler,'NOVA',.8,0,.965,.42);
  const ram=groups.ram;for(const x of[-.21,.21]){box(ram,.07,.56,2.0,x,.25,0,pcb);box(ram,.12,.44,1.9,x,.34,0,material('#5a4d80',.7,.35));box(ram,.13,.045,1.98,x,.58,0,violet);box(ram,.08,.1,1.8,x,.025,0,gold);for(let i=0;i<6;i++)box(ram,.14,.1,.14,x,.26,-.7+i*.26,black);}
  const ssd=groups.ssd;box(ssd,.45,.04,1.12,0,0,0,pcb);for(let i=0;i<3;i++)box(ssd,.32,.055,.22,0,.05,-.3+i*.3,black);box(ssd,.42,.014,.13,0,.015,-.57,gold);text(ssd,'NVMe',.4,0,.084,.34);
  const psu=groups.psu;box(psu,1.75,1.05,2.9,0,.05,0,dark);box(psu,1.7,.03,2.85,0,.59,0,edge);fan(psu,.64,0,.64,0);text(psu,'POWER / ATX',1.5,0,.61,1.12).userData.pcPsuLegend=true;for(let i=0;i<8;i++)box(psu,.07,.56,.025,-.65+i*.185,.1,1.46,black);
  const gpu=groups.gpu;box(gpu,3.4,1.0,.08,0,.43,0,pcb);box(gpu,3.55,.97,.45,0,.46,.22,dark);box(gpu,3.5,.06,.5,0,.99,.22,edge);box(gpu,3.25,.035,.055,0,.93,.49,violet);box(gpu,2.8,.15,.045,-.1,-.05,0,gold);for(const x of[-.92,.92])fan(gpu,.39,x,.46,.49,'front');box(gpu,.1,1.22,.7,-1.8,.48,.1,silver);const gpuName=text(gpu,'NOVA / 8 GB',1.4,0,1.03,.2);gpuName.userData.pcGpuName=true;
  // Distinct cable routes, with connectors at both ends, no tangled spaghetti.
  const cableSpecs:Record<string,{end:[number,number,number];mid:[number,number,number];color:THREE.Material}>={atx:{end:[2.1,.85,.8],mid:[1.4,1.15,.9],color:cyanMat},eps:{end:[2.1,.85,-1.1],mid:[-.5,1,-2.18],color:material('#8caaff')},pcie:{end:[2.1,.85,1.1],mid:[1.1,1.6,1.9],color:violet},front:{end:[3.5,.85,1.95],mid:[1.8,.45,2.3],color:gold},display:{end:[-1.8,1.15,-3.15],mid:[-3.7,.9,-1.7],color:material('#62d9f4')}};
  const cableTubes=new Map<PcSlot,THREE.Mesh>();
  for(const slot of ['atx','eps','pcie','front','display'] as const){const g=groups[slot],origin=new THREE.Vector3(...POS[slot]),spec=cableSpecs[slot];box(g,SIZE[slot][0],.16,SIZE[slot][2],0,.08,0,black);cableTubes.set(slot,line(g,[[0,.13,0],new THREE.Vector3(...spec.mid).sub(origin).toArray(),new THREE.Vector3(...spec.end).sub(origin).toArray()],spec.color,slot==='atx'?.065:.04));}
  // Large monitor behind the cutaway chassis; POST is readable during the final launch.
  const monitor=new THREE.Group();monitor.position.set(0,1.05,-3.5);monitor.scale.setScalar(1.8);monitor.rotation.y=.15;scene.add(monitor);box(monitor,2,1.25,.12,0,.7,0,dark);box(monitor,.14,.85,.12,0,-.15,0,edge);box(monitor,1.0,.06,.65,0,-.58,.15,dark);
  const activeScreen=new THREE.MeshBasicMaterial({color:'#113844'});materials.push(activeScreen);
  const screen=box(monitor,1.82,1.06,.015,0,.7,.07,black);const screenText=text(monitor,'POST  /  OK',1.6,0,.8,.085,false,'#66ffe0');screenText.visible=false;const screenSub=text(monitor,'16 GB · NVMe 1 TB',1.6,0,.5,.085,false);screenSub.visible=false;
  // Project the four real screen corners into a CSS homography. Keeping the
  // player in viewport space avoids nested CSS3D iframe hit-testing bugs.
  const projectScreen=()=>{
   const w=element.clientWidth,h=element.clientHeight;
   const points=[[-.91,1.23],[.91,1.23],[.91,.17],[-.91,.17]].map(([x,y])=>{
    const v=monitor.localToWorld(new THREE.Vector3(x,y,.081)).project(camera);return{x:(v.x+1)*w/2,y:(1-v.y)*h/2};
   });
   const [p0,p1,p2,p3]=points,dx1=p1.x-p2.x,dx2=p3.x-p2.x,dy1=p1.y-p2.y,dy2=p3.y-p2.y;
   const sx=p0.x-p1.x+p2.x-p3.x,sy=p0.y-p1.y+p2.y-p3.y,den=dx1*dy2-dx2*dy1;
   if(Math.abs(den)<.001)return;
   const g=(sx*dy2-dx2*sy)/den,j=(dx1*sy-sx*dy1)/den;
   const a=p1.x-p0.x+g*p1.x,b=p3.x-p0.x+j*p3.x,d=p1.y-p0.y+g*p1.y,e=p3.y-p0.y+j*p3.y;
   monitorElement.style.transform=`matrix3d(${a/960},${d/960},0,${g/960},${b/560},${e/560},0,${j/560},0,0,1,0,${p0.x},${p0.y},0,1)`;
  };
  let watching=false;
  const fitMonitor=()=>{
   const center=monitor.localToWorld(new THREE.Vector3(0,.7,.081)),normal=new THREE.Vector3(0,0,1).applyQuaternion(monitor.quaternion);
   const distance=Math.max(1.06*1.8/2,1.82*1.8/2/camera.aspect)/Math.tan(THREE.MathUtils.degToRad(camera.fov/2))*1.12;
   controls.minDistance=1;controls.target.copy(center);camera.position.copy(center).addScaledVector(normal,distance);
  };
  const savedCamera=new THREE.Vector3(),savedTarget=new THREE.Vector3();let savedMinDistance=7;
  const templates={} as Record<PcSlot,THREE.Group>,visuals=new Map<string,THREE.Group>(),rotors=new Set<THREE.Object3D>(),mixers=new Map<string,THREE.AnimationMixer>();
  for(const slot of PC_SLOTS){const template=new THREE.Group();for(const child of [...groups[slot].children])template.add(child);templates[slot]=template;}
  const registerRotors=(root:THREE.Object3D)=>root.traverse(o=>{if(o.userData.pcRotor)rotors.add(o);});
  const pcbTexture=(part:PcPart)=>{
   const c=document.createElement('canvas');c.width=c.height=1024;const ctx=c.getContext('2d')!;
   const colors:Record<string,string>={amber:'#252522',silver:'#313c4b',violet:'#29263e',compact:'#163f3d',teal:'#143e43'};ctx.fillStyle=colors[part.style??'teal'];ctx.fillRect(0,0,1024,1024);
   for(let i=0;i<150;i++){const x=20+(i*137)%980,y=20+(i*211)%980;ctx.strokeStyle=i%3?'#458383':'#b6ac79';ctx.lineWidth=i%3?1.2:2;ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x+20,y);ctx.lineTo(x+40,y+20);ctx.lineTo(x+40,y+65);ctx.stroke();ctx.fillStyle='#d6cda3';ctx.fillRect(x-2,y-2,4,4);}
   ctx.fillStyle='#d3e6e4';ctx.font='600 28px sans-serif';ctx.fillText(`${part.socket}  /  ${part.ramType}`,220,590);ctx.font='600 23px sans-serif';ctx.fillText(part.name,210,630);ctx.font='18px sans-serif';ctx.fillText('CYBERLEARN · HARDWARE LAB',280,960);
   const t=new THREE.CanvasTexture(c);t.colorSpace=THREE.SRGBColorSpace;t.anisotropy=Math.min(8,renderer.capabilities.getMaxAnisotropy());return t;
  };
  const nativeVisual=(part:PcPart)=>{
   let v=templates[part.slot].clone(true);
   if(part.slot==='board'){
    for(const child of [...v.children])if(child.userData.pcDimmLegend||part.dimmSlots===2&&child.userData.pcDimm!==undefined&&child.userData.pcDimm%2===0)child.removeFromParent();text(v,part.dimmSlots===2?'A1   B1':'A2   B2',.9,1.1,.07,.88);
    const texture=pcbTexture(part);v.traverse(o=>{if(o instanceof THREE.Mesh&&o.material===pcb){const m=pcb.clone();m.color.set('#ffffff');m.map=texture;materials.push(m);o.material=m;}});
   }
   if(part.slot==='cpu'){for(const child of [...v.children])if(child.userData.pcCpuLegend)child.removeFromParent();if(part.socket==='LGA1700')v.scale.z=1.16;text(v,part.name.includes('Intel')?'Intel':part.name.includes('AMD')?'Ryzen':'NOVA',.57,0,.16,0);}
   if(part.slot==='psu'){for(const child of [...v.children])if(child.userData.pcPsuLegend)child.removeFromParent();text(v,`${part.watts} W`,1.1,0,.62,1.12);}
   if(part.slot==='gpu'&&part.style==='white')v.traverse(o=>{if(o instanceof THREE.Mesh&&o.material===dark){const m=dark.clone();m.color.set('#d4dfeb');materials.push(m);o.material=m;}});
   if(part.slot==='gpu'){
    for(const child of [...v.children])if(child.userData.pcGpuName)child.removeFromParent();
    text(v,`${part.id==='gpu_5080'?'RTX 5080':'NOVA'} / ${part.capacity} GB`,1.4,0,1.03,.2);
   }
   if(part.slot==='gpu'&&part.style==='single'){
    for(const child of [...v.children])if(child.userData.pcFan)child.removeFromParent();
    fan(v,.39,0,.46,.49,'front');v.scale.x=.79;
   }
   if(part.slot==='gpu'&&part.style==='triple'){fan(v,.31,0,.46,.5,'front');}
   if(part.slot==='gpu'&&part.lengthMm)v.scale.x=part.lengthMm/300;
   if(part.slot==='cooler'&&part.style==='low'){v.scale.y=.42;}
   if(part.slot==='cooler'&&part.style==='dual'){v.scale.x=1.2;for(let i=0;i<12;i++)box(v,.45,.035,.9,.72,.15+i*.064,0,silver);}
   if(part.slot==='cooler'&&part.style==='aio'){
    v=new THREE.Group();cyl(v,.4,.3,0,.1,0,dark);cyl(v,.29,.02,0,.27,0,violet);
    box(v,1,.15,2.5,-1.85,.35,0,dark);fan(v,.45,-1.85,.48,-.64);fan(v,.45,-1.85,.48,.64);
    line(v,[[.22,.2,-.18],[-.4,.8,-.5],[-1.4,.48,-1.1]],dark,.06);line(v,[[.22,.2,.18],[-.4,.8,.5],[-1.4,.48,1.1]],dark,.06);
   }
   if(part.slot==='pcie'&&part.connector!=='8-pin'){box(v,.14,.16,.16,.2,.08,0,black);}
   registerRotors(v);return v;
  };
  for(const part of PC_PARTS){const v=nativeVisual(part);v.visible=false;groups[part.slot].add(v);visuals.set(part.id,v);}
  const exportArt=import.meta.env.DEV&&new URLSearchParams(location.search).get('pcArt')==='1';
  current.current.onArtwork(inventoryArtwork);element.dataset.artworkReady=String(!exportArt);element.dataset.artworkCount=String(PC_PARTS.length);
  let disposed=false;
  loadPcModels().then(assets=>{
   if(disposed)return;sceneDirty=true;
   for(const part of PC_PARTS){const imported=createPcModel(part,assets);if(!imported)continue;const v=imported.object;
    if(part.slot==='psu')text(v,`${part.watts} W`,.8,0,1.11,.7);
    if(part.slot==='cooler'&&part.style==='low'){box(v,1.0,.17,1.0,0,.06,0,silver);}
    v.visible=false;v.userData.imported=part.asset;groups[part.slot].add(v);visuals.set(part.id,v);
    if(imported.animations.length){const mixer=new THREE.AnimationMixer(v);const clip=imported.animations.find(c=>c.name.includes('600rpm'))??imported.animations[0];mixer.clipAction(clip).play();mixers.set(part.id,mixer);}
   }
   element.dataset.modelsLoaded=String(Object.keys(assets).length);
   if(exportArt)import('../utils/pcInventoryArt').then(({renderPcInventoryArt})=>{if(disposed)return;current.current.onArtwork(renderPcInventoryArt(renderer,scene.environment,visuals));element.dataset.artworkReady='true';sceneDirty=true;});
  });
  const portMeshes=PC_PORTS.map(port=>{
   const g=new THREE.Group();g.position.fromArray(port.position);scene.add(g);
   box(g,.27,.13,.18,0,0,0,black);for(let i=0;i<3;i++)box(g,.035,.02,.06,-.075+i*.075,.08,0,gold);
   const ring=new THREE.Mesh(new THREE.TorusGeometry(.22,.035,8,32),new THREE.MeshBasicMaterial({color:'#8de8dc',depthTest:false}));ring.rotation.x=-Math.PI/2;ring.position.y=.13;ring.renderOrder=7;g.add(ring);ring.visible=false;return {port,group:g,ring};
  });
  const previewMaterial=new THREE.LineDashedMaterial({color:'#a8e5dc',dashSize:.12,gapSize:.08,transparent:true,opacity:.8,depthTest:false});materials.push(previewMaterial);
  const wirePreview=new THREE.Line(new THREE.BufferGeometry(),previewMaterial);wirePreview.renderOrder=6;wirePreview.visible=false;scene.add(wirePreview);let previewKey='';
  const mountHits=PC_MOUNTS.map(m=>{const slot=m.slots[0],hit=new THREE.Mesh(new THREE.BoxGeometry(...SIZE[slot]),new THREE.MeshBasicMaterial({visible:false}));hit.position.fromArray(m.position);hit.position.y+=SIZE[slot][1]*.35;hit.userData.mount=m.id;scene.add(hit);return hit;});
  const portHits=PC_PORTS.map(p=>{const hit=new THREE.Mesh(new THREE.SphereGeometry(.24,8,6),new THREE.MeshBasicMaterial({visible:false}));hit.position.fromArray(p.position);hit.userData.port=p.id;scene.add(hit);return hit;});
  // DOM labels retain legible Cyrillic and keyboard access, with leaders to actual 3D positions.
  const labelLayer=labelHost.current!,ns='http://www.w3.org/2000/svg';
  const labelSvg=document.createElementNS(ns,'svg');labelSvg.classList.add('pc-label-lines');labelLayer.append(labelSvg);
  type Label={id:string;kind:'mount'|'port'|'part';point:THREE.Vector3;button:HTMLButtonElement;line:SVGLineElement;slot?:PcSlot;owner?:PcSlot|null};
  const annotations:Label[]=[];
  const addLabel=(id:string,kind:Label['kind'],title:string,point:readonly number[],slot?:PcSlot,owner?:PcSlot|null)=>{
   const button=document.createElement('button');button.className='pc-model-tag';button.dataset.kind=kind;button.dataset.id=id;button.textContent=title;button.hidden=true;
   button.setAttribute('aria-label',kind==='mount'?`На модели: ${title}`:kind==='port'?`На модели: разъём ${title}`:`Изучить: ${title}`);
   button.onclick=()=>{const p=current.current;if(kind==='mount')p.onMount(id as PcMountId);else if(kind==='port')p.onPort(id as PcPortId);else p.onInspect(slot!);};
   labelLayer.append(button);const leader=document.createElementNS(ns,'line');labelSvg.append(leader);
   annotations.push({id,kind,point:new THREE.Vector3(...point as [number,number,number]),button,line:leader,slot,owner});
  };
  for(const m of PC_MOUNTS)addLabel(m.id,'mount',m.label,m.position);
  for(const p of PC_PORTS)addLabel(p.id,'port',p.label,p.position,undefined,p.owner);
  for(const slot of ['board','cpu','cooler','ram','ssd','psu','gpu'] as const){const point=[...POS[slot]];point[1]+=SIZE[slot][1];addLabel(slot,'part',slot==='board'?'Плата ATX':slot==='ram'?'RAM · DDR5':slot==='ssd'?'SSD · NVMe':PC_LABELS[slot],point,slot);}
  addLabel('monitor','part','Монитор',[0,2.5,-3.5],'display');
  const ray=new THREE.Raycaster(),pointer=new THREE.Vector2();
  const targetAt=(x:number,y:number)=>{
   const rect=renderer.domElement.getBoundingClientRect();pointer.set((x-rect.left)/rect.width*2-1,-(y-rect.top)/rect.height*2+1);ray.setFromCamera(pointer,camera);
   const p=current.current,selected=pcPart(p.selected??undefined);
   const targets=selected?pcIsCable(selected.slot)?portHits.filter(h=>{const port=PC_PORTS.find(p=>p.id===h.userData.port)!;const pair=PC_CABLES[selected.slot as keyof typeof PC_CABLES];return [pair.source,pair.target].includes(port.id as never)&&(!port.owner||p.build[port.owner]);}):mountHits.filter(h=>{const mount=PC_MOUNTS.find(m=>m.id===h.userData.mount)!;return (mount.slots as readonly string[]).includes(selected.slot)&&(['case_atx','psu_bay'].includes(mount.id)||p.build.board);}):hitTargets.filter(h=>p.build[h.userData.slot as PcSlot]);
   return ray.intersectObjects(targets,false)[0]?.object.userData;
  };
  const activate=(target:Record<string,any>|undefined)=>{if(!target)return;const p=current.current;if(target.mount)p.onMount(target.mount);else if(target.port)p.onPort(target.port);else if(target.slot)p.onInspect(target.slot);};
  let down:[number,number]|null=null;const pointerDown=(e:PointerEvent)=>{down=[e.clientX,e.clientY];};
  const pointerUp=(e:PointerEvent)=>{if(down&&Math.hypot(e.clientX-down[0],e.clientY-down[1])<6)activate(targetAt(e.clientX,e.clientY));down=null;};
  const dragOver=(e:DragEvent)=>{e.preventDefault();if(e.dataTransfer)e.dataTransfer.dropEffect='copy';};const drop=(e:DragEvent)=>{e.preventDefault();activate(targetAt(e.clientX,e.clientY));};
  const lost=(e:Event)=>{e.preventDefault();setUnavailable(true);};renderer.domElement.addEventListener('pointerdown',pointerDown);renderer.domElement.addEventListener('pointerup',pointerUp);renderer.domElement.addEventListener('dragover',dragOver);renderer.domElement.addEventListener('drop',drop);renderer.domElement.addEventListener('webglcontextlost',lost);
  // Fit from absolute chassis bounds, rather than repeatedly multiplying camera distance on resize.
  let previousFit=0;
  const resize=()=>{const w=element.clientWidth,h=element.clientHeight;if(!w||!h)return;sceneDirty=true;
   if(watching||current.current.powered&&!!current.current.bootScreen){if(!watching){savedCamera.copy(camera.position);savedTarget.copy(controls.target);savedMinDistance=controls.minDistance;watching=true;}renderer.setSize(w,h);camera.aspect=w/h;camera.updateProjectionMatrix();fitMonitor();controls.update();return;}
   const aspect=w/h,direction=camera.position.clone().sub(controls.target).normalize(),right=new THREE.Vector3().crossVectors(new THREE.Vector3(0,1,0),direction).normalize(),up=new THREE.Vector3().crossVectors(direction,right).normalize();
   let distance=0;const tan=Math.tan(THREE.MathUtils.degToRad(camera.fov/2));
   for(const x of [-4,4])for(const y of [0,3.8])for(const z of [-3.7,2.8]){const point=new THREE.Vector3(x,y,z).sub(controls.target),depth=point.dot(direction);distance=Math.max(distance,depth+Math.abs(point.dot(up))/(tan*.85),depth+Math.abs(point.dot(right))/(tan*aspect*.86));}
   const zoom=previousFit?camera.position.distanceTo(controls.target)/previousFit:1;previousFit=distance;camera.position.copy(controls.target).addScaledVector(direction,distance*zoom);
   renderer.setSize(w,h);camera.aspect=aspect;camera.updateProjectionMatrix();controls.update();controls.saveState();renderer.render(scene,camera);
  };
  const observer=new ResizeObserver(resize);observer.observe(element);resize();
  let cableGpu='';
  const shown=new Set<PcSlot>(),clock=new THREE.Clock();let frame=0,lastDraw=0;const reduce=matchMedia('(prefers-reduced-motion: reduce)');
  const animate=(now=0)=>{frame=requestAnimationFrame(animate);
   if(now&&now-lastDraw<1000/30)return;lastDraw=now;
   const p=current.current,showDisplay=p.powered&&!!p.bootScreen;
   if(watching&&showDisplay&&!sceneDirty)return;
   const dt=Math.min(clock.getDelta(),.05);
   if(showDisplay&&!watching){savedCamera.copy(camera.position);savedTarget.copy(controls.target);savedMinDistance=controls.minDistance;fitMonitor();}
   else if(!showDisplay&&watching){controls.minDistance=savedMinDistance;camera.position.copy(savedCamera);controls.target.copy(savedTarget);watching=false;resize();}
   watching=showDisplay;controls.enabled=!showDisplay;element.style.pointerEvents=showDisplay?'none':'auto';renderer.domElement.style.pointerEvents=showDisplay?'none':'auto';
   labelHost.current!.hidden=showDisplay;
   displayLayer.style.display=showDisplay?'block':'none';screen.material=p.powered?activeScreen:black;screenText.visible=screenSub.visible=p.powered&&!showDisplay;
   backdrop.visible=camera.position.z>-5.35;sideWall.visible=camera.position.x>-6.7;

   for(const slot of PC_SLOTS){const g=groups[slot],visible=!!p.build[slot];for(const child of g.children)child.visible=child===visuals.get(p.build[slot]??'');g.visible=visible;if(visible){if(g.userData.part!==p.build[slot]){shown.delete(slot);g.userData.part=p.build[slot];}if(!shown.has(slot)){g.position.y=POS[slot][1]+(reduce.matches?0:1.6);shown.add(slot);}g.position.y=THREE.MathUtils.damp(g.position.y,POS[slot][1],9,dt);}else shown.delete(slot);}
   if(cableGpu!==(p.build.gpu??'')){
    cableGpu=p.build.gpu??'';const origin=new THREE.Vector3(...pcPortPosition('gpu_power',p.build));origin.y-=.13;const spec=cableSpecs.pcie;
    for(const part of PC_PARTS.filter(part=>part.slot==='pcie')){const v=visuals.get(part.id)!;v.traverse(o=>{if(o instanceof THREE.Mesh&&o.geometry instanceof THREE.TubeGeometry){const old=o.geometry;const curve=new THREE.CatmullRomCurve3([new THREE.Vector3(0,.13,0),new THREE.Vector3(...spec.mid).sub(origin),new THREE.Vector3(...spec.end).sub(origin)]);o.geometry=new THREE.TubeGeometry(curve,32,.04,8,false);if(!old.userData.pcShared)old.dispose();}});}
    groups.pcie.position.copy(origin);
   }
   if(p.build.gpu==='gpu_3080'){const inlet=pcPortPosition('gpu_power',p.build);groups.pcie.position.set(inlet[0],inlet[1]-.13,inlet[2]);}
   const selected=pcPart(p.selected??undefined),mode=selected?pcIsCable(selected.slot)?'port':'mount':'part';
   const cablePair=selected&&pcIsCable(selected.slot)?PC_CABLES[selected.slot]:undefined;
   const cablePorts=cablePair?[cablePair.source,cablePair.target]:[];
   for(const entry of portMeshes){
    const available=!entry.port.owner||!!p.build[entry.port.owner];entry.group.visible=available;entry.group.position.fromArray(pcPortPosition(entry.port.id,p.build));
    const relevant=!!cablePair&&cablePorts.includes(entry.port.id as never);entry.ring.visible=relevant&&available;
    if(relevant){const connected=p.selectedPort===entry.port.id;(entry.ring.material as THREE.MeshBasicMaterial).color.set(connected?'#8ff3b9':'#a5e7ff');entry.ring.scale.setScalar(connected?1:reduce.matches?1:1+Math.sin(clock.elapsedTime*3)*.12);}
   }
   for(const hit of portHits)hit.position.fromArray(pcPortPosition(hit.userData.port,p.build));
   wirePreview.visible=!!cablePair&&!!p.selectedPort&&cablePorts.every(id=>{const port=PC_PORTS.find(p=>p.id===id)!;return !port.owner||!!p.build[port.owner];});
   const nextPreviewKey=wirePreview.visible?`${selected!.id}:${p.build.gpu}`:'';
   if(nextPreviewKey&&nextPreviewKey!==previewKey){const from=new THREE.Vector3(...pcPortPosition(cablePair!.source,p.build)),to=new THREE.Vector3(...pcPortPosition(cablePair!.target,p.build)),mid=from.clone().lerp(to,.5);mid.y+=.55;wirePreview.geometry.dispose();wirePreview.geometry=new THREE.BufferGeometry().setFromPoints(new THREE.CatmullRomCurve3([from,mid,to]).getPoints(48));wirePreview.computeLineDistances();}previewKey=nextPreviewKey;
   const w=element.clientWidth,h=element.clientHeight;
   controls.update();scene.updateMatrixWorld();camera.updateMatrixWorld();
   const sides:{a:Label;x:number;y:number}[][]=[[],[]];
   for(const a of annotations){
    if(a.kind==='port'){a.point.fromArray(pcPortPosition(a.id as PcPortId,p.build));const name=pcPortLabel(a.id as PcPortId,p.build);const title=`${cablePair&&a.id===cablePair.source?'1 · ':cablePair&&a.id===cablePair.target?'2 · ':''}${name}`;if(a.button.textContent!==title){a.button.textContent=title;a.button.setAttribute('aria-label',`На модели: разъём ${name}`);}}
    if(a.kind==='mount'){const name=pcMountLabel(a.id as PcMountId,p.build);if(a.button.textContent!==name){a.button.textContent=name;a.button.setAttribute('aria-label',`На модели: ${name}`);}}
    if(a.kind==='part'&&a.slot==='ram'){const title=`RAM · ${pcPart(p.build.ram)?.ramType??'DDR5'}`;if(a.button.textContent!==title)a.button.textContent=title;}
    let visible=!showDisplay&&a.kind===mode&&(p.labels||mode!=='part');
    if(a.kind==='part')visible=visible&&(a.id==='monitor'||!!p.build[a.slot!])&&!(a.slot==='cpu'&&p.build.cooler);
    if(a.kind==='mount'){const mount=PC_MOUNTS.find(m=>m.id===a.id)!;visible=visible&&!!selected&&(mount.slots as readonly string[]).includes(selected.slot)&&(['case_atx','psu_bay'].includes(a.id)||!!p.build.board);}
    if(a.kind==='port')visible=visible&&cablePorts.includes(a.id as never)&&(!a.owner||!!p.build[a.owner]);
    const point=a.point.clone().project(camera);visible=visible&&point.z>-1&&point.z<1;
    a.button.hidden=!visible;a.line.style.display=visible?'':'none';if(!visible)continue;
    const x=(point.x+1)*w/2,y=(1-point.y)*h/2;
    a.button.dataset.active=String(a.kind==='port'&&a.id===p.selectedPort);
    sides[x<w/2?0:1].push({a,x,y});
   }
   sides.forEach((list,side)=>{
    list.sort((a,b)=>a.y-b.y);const gap=Math.min(32,(h-65)/Math.max(1,list.length)),start=Math.max(15,Math.min((list[0]?.y??0)-gap*.5,h-45-list.length*gap));
    list.forEach(({a,x,y},i)=>{const width=Math.min(w<500?145:190,Math.max(85,a.button.offsetWidth)),tx=side===0?10:w-width-10,ty=start+i*gap;
     a.button.style.left=`${tx}px`;a.button.style.top=`${ty}px`;
     a.line.setAttribute('x1',String(x));a.line.setAttribute('y1',String(y));a.line.setAttribute('x2',String(side===0?tx+width:tx));a.line.setAttribute('y2',String(ty+12));
    });
   });
   for(const rotor of rotors)if(p.powered&&!reduce.matches)rotor.rotation.y+=dt*15;for(const [id,mixer]of mixers)if(p.powered&&p.build.gpu===id&&!reduce.matches)mixer.update(dt);
   const ram=pcPart(p.build.ram),ssd=pcPart(p.build.ssd),status=`${ram?.capacity??0} GB · NVMe ${(ssd?.capacity??0)>=1000?`${(ssd?.capacity??0)/1000} TB`:`${ssd?.capacity??0} GB`}`;if(screenSub.userData.status!==status){screenSub.userData.status=status;const map=(screenSub.material as THREE.MeshBasicMaterial).map as THREE.CanvasTexture,canvas=map.image as HTMLCanvasElement,ctx=canvas.getContext('2d')!;ctx.clearRect(0,0,512,80);ctx.fillStyle='#bce9ed';ctx.font='600 38px sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(status,256,43,496);map.needsUpdate=true;}
   element.dataset.visualModels=Object.values(p.build).flatMap(id=>{const v=visuals.get(id!);return v?.userData.imported?[v.userData.imported]:[];}).join(',');element.dataset.installed=String(Object.keys(p.build).length);element.dataset.powered=String(p.powered);renderer.render(scene,camera);renderCount++;element.dataset.renderCount=String(renderCount);sceneDirty=false;if(showDisplay)projectScreen();
  };animate();
  return()=>{displayLayer.remove();monitorElement.remove();disposed=true;for(const mixer of mixers.values())mixer.stopAllAction();cancelAnimationFrame(frame);observer.disconnect();controls.dispose();controlsRef.current=null;labelLayer.replaceChildren();envTarget.dispose();renderer.domElement.removeEventListener('pointerdown',pointerDown);renderer.domElement.removeEventListener('pointerup',pointerUp);renderer.domElement.removeEventListener('dragover',dragOver);renderer.domElement.removeEventListener('drop',drop);renderer.domElement.removeEventListener('webglcontextlost',lost);const geometries=new Set<THREE.BufferGeometry>(),mats=new Set<THREE.Material>(materials),textures=new Set<THREE.Texture>([posterAtlas]);scene.traverse(o=>{if(o instanceof THREE.Mesh||o instanceof THREE.LineSegments){geometries.add(o.geometry);for(const m of Array.isArray(o.material)?o.material:[o.material])mats.add(m);}});const sharedTextures=new Set<THREE.Texture>();for(const m of mats){for(const key of ['map','normalMap','roughnessMap','metalnessMap','aoMap','emissiveMap']){const t=(m as any)[key] as THREE.Texture|undefined;if(t){textures.add(t);if(m.userData.pcShared)sharedTextures.add(t);}}if(!m.userData.pcShared)m.dispose();}textures.forEach(t=>{if(!sharedTextures.has(t))t.dispose();});geometries.forEach(g=>{if(!g.userData.pcShared)g.dispose();});renderer.dispose();renderer.forceContextLoss();renderer.domElement.remove();};
 },[]);
 return <div className="pc-scene-wrap">{createPortal(props.bootScreen,monitorElement)}<div className="pc-canvas" ref={host}/><div className="pc-annotation-layer" ref={labelHost}/>{unavailable&&<p className="pc-webgl-fallback" role="status">3D недоступно в этом браузере. Сборку можно продолжить: выбери деталь и открой «Места установки» в инструкции. Для кабеля выбери два разъёма. Все проверки работают.</p>}<div className="pc-camera">{props.bootScreen&&<button onClick={props.onExitBoot} aria-label="Отойти от монитора">К сборке</button>}<button onClick={()=>controlsRef.current?.reset()} aria-label="Вернуть камеру"><RotateCcw size={17}/></button><button onClick={()=>{const c=controlsRef.current;if(c){c.object.position.lerp(c.target,.15);c.update();}}} aria-label="Приблизить модель"><Plus size={18}/></button><button onClick={()=>{const c=controlsRef.current;if(c){c.object.position.sub(c.target).multiplyScalar(1.15).add(c.target);c.update();}}} aria-label="Отдалить модель"><Minus size={18}/></button></div></div>;
}
