import { useEffect, useRef, useState } from 'react';
import type { Task, LessonMode } from '../types';
import { callServer } from '../services/firebase';
import { lessonVersion } from '../functions/lessonCheckpoint.mjs';
export interface PracticeState {active:boolean;typed:string;option:number|null}
const empty:PracticeState={active:false,typed:'',option:null};
export function usePracticeDraft(task:Task|null,mode:LessonMode='learn') {
 const pilot=!!task&&/^g3_m1_l[3-7]$/.test(task.id);
 const [state,setState]=useState(empty);
 const [loaded,setLoaded]=useState(false);
 const [owner,setOwner]=useState('');
 const [status,setStatus]=useState('');
 const [revision,setRevision]=useState(0);
 const version=task?lessonVersion(task):'';
 const dirty=useRef(false);
 const writes=useRef<Promise<unknown>>(Promise.resolve());
 useEffect(()=>{let active=true;dirty.current=false;setState(empty);setLoaded(!pilot);setStatus('');if(!pilot)return;
  callServer<{draft:{state:PracticeState}|null}>('getPracticeDraft',{taskId:task!.id,mode}).then(result=>{if(active){setState(result.draft?.state??empty);setOwner(`${task!.id}:${mode}`);setLoaded(true);setStatus(result.draft?'Черновик восстановлен. Ответ ещё нужно проверить.':'');}}).catch(()=>{if(active){setOwner(`${task!.id}:${mode}`);setLoaded(true);setStatus('Не удалось восстановить черновик. Новые изменения попробуем сохранить.');}});return()=>{active=false;};
 },[task?.id,version,pilot,mode]);
 useEffect(()=>{if(!pilot||!loaded||owner!==`${task?.id}:${mode}`||!dirty.current)return;let active=true;setStatus('Сохраняем черновик…');const timer=setTimeout(()=>{writes.current=writes.current.catch(()=>{}).then(()=>callServer('savePracticeDraft',{taskId:task!.id,version,state,mode}));writes.current.then(()=>{if(active)setStatus('Черновик сохранён');}).catch(()=>{if(active)setStatus('Черновик не сохранён. Ввод остаётся на экране.');});},400);return()=>{active=false;clearTimeout(timer);};},[state,loaded,revision,pilot,task?.id,version,mode]);
 const update=(patch:Partial<PracticeState>)=>{dirty.current=true;setState(old=>({...old,...patch}));};
 return {pilot,state:owner===`${task?.id}:${mode}`?state:empty,loaded:!pilot||(loaded&&owner===`${task?.id}:${mode}`),status,update,retry:()=>{dirty.current=true;setRevision(value=>value+1);}};
}
