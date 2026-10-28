import { useEffect, useRef, useState } from 'react';
import type { Task } from '../types';
import { callServer } from '../services/firebase';
import { lessonVersion } from '../functions/lessonCheckpoint.mjs';
export interface PilotLessonState {phase:number;idea:number;path:number;typed:string;removed:boolean;choice:string|null}
const initial: PilotLessonState={phase:0,idea:0,path:0,typed:'',removed:false,choice:null};
export function useLessonCheckpoint(task:Task) {
 const [state,setState]=useState(initial);
 const [loaded,setLoaded]=useState(false);
 const [status,setStatus]=useState('Восстанавливаем шаг урока…');
 const [retry,setRetry]=useState(0);
 const restored=useRef(false);
 const writes=useRef<Promise<unknown>>(Promise.resolve());
 const version=lessonVersion(task);
 useEffect(()=>{let active=true;setLoaded(false);restored.current=false;
  callServer<{checkpoint:{state:PilotLessonState}|null;version:string}>('getLessonCheckpoint',{taskId:task.id}).then(result=>{if(!active)return;const saved=result.checkpoint?.state;setState(saved?{...saved,idea:Math.min(saved.idea,Math.max(0,(task.lesson?.explanation??'').split(/\n\s*\n/).filter(Boolean).length-1))}:initial);setStatus(saved?'Продолжаем с сохранённого шага.':'');restored.current=true;setLoaded(true);}).catch(()=>{if(active){setStatus('Не удалось восстановить шаг. Можно заниматься, но сохранение пока недоступно.');setLoaded(true);}});
  return()=>{active=false;};
 },[task.id,version]);
 useEffect(()=>{if(!loaded||!restored.current)return;let active=true;
  setStatus('Сохраняем шаг…');
  const timer=setTimeout(()=>{writes.current=writes.current.catch(()=>{}).then(()=>callServer('saveLessonCheckpoint',{taskId:task.id,version,state}));writes.current.then(()=>{if(active)setStatus('Шаг сохранён');}).catch(()=>{if(active)setStatus('Шаг не сохранён. Ответ остаётся на экране; попробуй сохранить ещё раз.');});},500);
  return()=>{active=false;clearTimeout(timer);};
 },[state,loaded,retry,task.id,version]);
 return {state,setState,loaded,status,retry:()=>{restored.current=true;setRetry(value=>value+1);}};
}
