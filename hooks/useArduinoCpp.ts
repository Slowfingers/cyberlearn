import {useEffect,useRef,useState} from 'react';
import {compileArduinoCode} from '../services/arduinoCompile';
import type {CityFrame,CityMission} from '../utils/smartCityRuntime';
export type CppResult={passed:boolean;checks:{label:string;passed:boolean}[]};
export function useArduinoCpp(){
 const playbackSpeed=useRef(.5);
 const worker=useRef<Worker>(null),abort=useRef<AbortController>(null),version=useRef(0),pending=useRef<(error:Error)=>void>(null),timeout=useRef<ReturnType<typeof setTimeout>>(null);
 const [frame,setFrame]=useState<CityFrame>(),[serial,setSerial]=useState(''),[busy,setBusy]=useState(false),[running,setRunning]=useState(false),[error,setError]=useState(''),[progress,setProgress]=useState<number>();
 const release=()=>{version.current++;abort.current?.abort();worker.current?.terminate();worker.current=null;clearTimeout(timeout.current);pending.current?.(new DOMException('Отменено','AbortError'));pending.current=null;};
 useEffect(()=>()=>release(),[]);
 const stop=()=>{release();setBusy(false);setRunning(false);setProgress(undefined);setError('');};
 const bindLive=(instance:Worker)=>{instance.onmessage=event=>{if(worker.current!==instance)return;const data=event.data;if(data.type==='frame'){setFrame(data.frame);if(typeof data.serial==='string')setSerial(data.serial);}else if(data.type==='error'){setError(data.message);setRunning(false);instance.terminate();}};instance.onerror=()=>{setError('Не удалось запустить эмулятор. Обнови страницу и повтори.');setRunning(false);setBusy(false);instance.terminate();};};
 const create=()=>{const instance=new Worker(new URL('../workers/arduinoAvr.worker.ts',import.meta.url),{type:'module'});worker.current=instance;return instance;};
 const start=async(code:string,distance:number)=>{
  release();const current=version.current;abort.current=new AbortController();setError('');setSerial('');setFrame(undefined);setRunning(false);setBusy(true);setProgress(undefined);
  try{const hex=await compileArduinoCode(code,abort.current.signal);if(current!==version.current)return;const instance=create();bindLive(instance);instance.postMessage({type:'start',hex,distance,speed:playbackSpeed.current});setRunning(true);return true;}catch(e){if(current===version.current&&e instanceof Error&&e.name!=='AbortError'){setError(e.message);return false;}}finally{if(current===version.current)setBusy(false);}
 };
 const verify=async(code:string,mission:CityMission,distance:number):Promise<CppResult|undefined>=>{
  release();const current=version.current;abort.current=new AbortController();setError('');setBusy(true);setRunning(false);setProgress(undefined);
  try{const hex=await compileArduinoCode(code,abort.current.signal);if(current!==version.current)return;const instance=create();setProgress(0);
   const result=await new Promise<CppResult>((resolve,reject)=>{pending.current=reject;timeout.current=setTimeout(()=>{instance.terminate();reject(new Error('Проверка превысила 40 секунд. Упрости программу и попробуй снова.'));},40000);instance.onerror=()=>reject(new Error('Ошибка запуска эмулятора.'));instance.onmessage=event=>{const data=event.data;if(data.type==='progress')setProgress(data.progress);else if(data.type==='verified')resolve({passed:data.passed,checks:data.checks});else if(data.type==='error')reject(new Error(data.message));};instance.postMessage({type:'verify',hex,mission});});
   clearTimeout(timeout.current);pending.current=null;if(current!==version.current)return;bindLive(instance);instance.postMessage({type:'start',hex,distance,speed:playbackSpeed.current});setRunning(true);setSerial('');return result;
  }catch(e){if(current===version.current&&e instanceof Error&&e.name!=='AbortError'){setError(e.message);worker.current?.terminate();}}finally{if(current===version.current){clearTimeout(timeout.current);pending.current=null;setBusy(false);setProgress(undefined);}}
 };
 const setDistance=(distance:number)=>worker.current?.postMessage({type:'distance',distance});
 const setSpeed=(speed:number)=>{playbackSpeed.current=speed;worker.current?.postMessage({type:'speed',speed});};
 return{setSpeed,frame,serial,busy,running,error,progress,start,stop,verify,setDistance,clearSerial:()=>setSerial('')};
}
