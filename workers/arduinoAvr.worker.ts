/// <reference lib="webworker" />
import {CityAvr,assessAvrFrames} from '../utils/arduinoAvr';
import type {CityMission,CityFrame} from '../utils/smartCityRuntime';
let playbackSpeed=.5;
let generation=0,machine:CityAvr|undefined,timer:ReturnType<typeof setTimeout>|undefined;
const pause=()=>new Promise<void>(resolve=>setTimeout(resolve,0));
self.onmessage=async(event:MessageEvent)=>{
 const data=event.data;
 if(data.type==='speed'){playbackSpeed=[.25,.5,1].includes(data.speed)?data.speed:.5;return;}
 if(data.type==='distance'){if(machine)machine.distance=data.distance;return;}
 generation++;const current=generation;clearTimeout(timer);machine=undefined;
 try{
  if(data.type==='stop')return;
  if(data.type==='start'){
   playbackSpeed=[.25,.5,1].includes(data.speed)?data.speed:.5;machine=new CityAvr(data.hex,data.distance);let lastSerial='',lastTime=performance.now(),lastPost=0;const tick=()=>{if(generation!==current||!machine)return;try{const now=performance.now();machine.advance(Math.min(50,Math.max(0,now-lastTime))*playbackSpeed);lastTime=now;if(now-lastPost>=33){self.postMessage({type:'frame',frame:machine.frame,serial:machine.serial!==lastSerial?machine.serial:undefined});lastSerial=machine.serial;lastPost=now;}timer=setTimeout(tick,8);}catch(error){self.postMessage({type:'error',message:error instanceof Error?error.message:'Ошибка эмуляции.'});}};tick();return;
  }
  if(data.type==='verify'){
   const mission=data.mission as CityMission;const distances=mission==='gate'?[15,39,40,65,120]:[80];const traces:CityFrame[][]=[];const total=mission==='traffic'?13000:350;
   for(let index=0;index<distances.length;index++){const run=new CityAvr(data.hex,distances[index],true);while(run.milliseconds<total){if(generation!==current)return;run.advance(20);self.postMessage({type:'progress',progress:Math.round((index+run.milliseconds/total)/distances.length*100)});await pause();}traces.push(run.finishTrace());}
   if(generation===current)self.postMessage({type:'verified',...assessAvrFrames(mission,traces)});
  }
 }catch(error){self.postMessage({type:'error',message:error instanceof Error?error.message:'Ошибка эмуляции.'});}
};
