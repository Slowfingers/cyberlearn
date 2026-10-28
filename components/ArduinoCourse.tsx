import React,{useEffect,useRef,useState} from 'react';
import {ArrowLeft,CheckCircle2,Cpu,Loader2,RotateCcw} from 'lucide-react';
import {GameButton} from './GameUI';
import type {Task,User} from '../types';
import '../styles/arduino-course.css';

type Props={user:User;tasks:Task[];selected:Task;onSelect:(task:Task)=>void;onComplete:(task:Task)=>Promise<void>;onBack:()=>void;saving:boolean;failed?:Task;notifications?:React.ReactNode};
/** The transferred app keeps its own DOM/WebGL lifecycle and never imports platform styles. */
export default function ArduinoCourse({user,tasks,selected,onSelect,onComplete,onBack,saving,failed,notifications}:Props){
 const frame=useRef<HTMLIFrameElement>(null),callbacks=useRef({tasks,selected,onSelect,onComplete,saving});callbacks.current={tasks,selected,onSelect,onComplete,saving};
 const [expanded,setExpanded]=useState(false);
 const completed=tasks.filter(t=>t.status==='completed');
 const [src]=useState(()=>`/courses/arduino/index.html?student=${encodeURIComponent(user.id)}&done=${encodeURIComponent(completed.map(t=>t.arduinoConfig!.lessonId).join(','))}#${selected.arduinoConfig!.lessonId}`);
 const [ready,setReady]=useState(false),[unavailable,setUnavailable]=useState(false),[slow,setSlow]=useState(false),[revision,setRevision]=useState(0);
 const send=(message:Record<string,unknown>)=>frame.current?.contentWindow?.postMessage({channel:'cyberlearn-arduino',...message},window.location.origin);
 useEffect(()=>{setReady(false);setSlow(false);const timer=setTimeout(()=>setSlow(true),20000);return()=>clearTimeout(timer);},[revision]);
 useEffect(()=>{
  const receive=(event:MessageEvent)=>{
   if(event.origin!==window.location.origin||event.source!==frame.current?.contentWindow||event.data?.channel!=='cyberlearn-arduino')return;
   const data=event.data,{tasks,selected,onSelect,onComplete,saving}=callbacks.current;
   if(data.type==='view'){setExpanded(!!data.expanded);return;}
   if(data.type==='ready'){setReady(true);setSlow(false);send({type:'select',lessonId:selected.arduinoConfig?.lessonId});send({type:'sync',completed:tasks.filter(task=>task.status==='completed').map(task=>task.arduinoConfig!.lessonId)});return;}
   if(data.type==='unavailable'){setUnavailable(true);setReady(true);setSlow(false);return;}
   const task=tasks.find(t=>t.arduinoConfig?.lessonId===data.lessonId);if(!task)return;
   if(data.type==='lesson'&&selected.id!==task.id)onSelect(task);
   if(data.type==='run'&&!saving&&task.status!=='completed')void onComplete(task);
  };
  window.addEventListener('message',receive);return()=>window.removeEventListener('message',receive);
 },[]);
 useEffect(()=>{if(ready)send({type:'select',lessonId:selected.arduinoConfig?.lessonId});},[selected.id,ready]);
 useEffect(()=>{if(!expanded)return;const escape=(event:KeyboardEvent)=>{if(event.key==='Escape'){setExpanded(false);send({type:'view',expanded:false});}};window.addEventListener('keydown',escape);return()=>window.removeEventListener('keydown',escape);},[expanded]);
 const completedIds=completed.map(t=>t.arduinoConfig!.lessonId).join(',');
 useEffect(()=>{if(ready)send({type:'sync',completed:completedIds.split(',').filter(Boolean)});},[completedIds,ready]);
 return <section className={`arduino-course${expanded?' is-scene-expanded':''}`} aria-label="Курс Arduino">
  <header className="arduino-course-header">
   <GameButton size="compact" aria-label="К карте курсов" onClick={onBack}><ArrowLeft size={17}/><span>К курсам</span></GameButton>
   <div className="arduino-course-brand"><Cpu size={23}/><div><strong>Arduino</strong><small>Живая электроника · 11 уроков</small></div></div>
   <label className="arduino-lesson-picker"><span className="sr-only">Урок Arduino</span><select aria-label="Урок Arduino" value={selected.id} onChange={e=>{const task=tasks.find(t=>t.id===e.target.value);if(task)onSelect(task);}}>{tasks.map((task,index)=><option key={task.id} value={task.id}>{task.status==='completed'?'✓ ':''}{index+1}. {task.title}</option>)}</select></label>
   <div className="arduino-course-progress" aria-label={`Пройдено ${completed.length} из ${tasks.length} уроков`}><CheckCircle2 size={16}/><b>{completed.length}/{tasks.length}</b><span className="arduino-course-track"><i style={{width:`${completed.length/tasks.length*100}%`}}/></span></div>
  </header>
  <div className="arduino-lab-frame">
   <iframe key={revision} ref={frame} src={src} title="Интерактивная 3D-лаборатория Arduino на русском языке" sandbox="allow-scripts allow-same-origin" allow="fullscreen; clipboard-write"/>
   {!ready&&<div className="arduino-loading" role="status"><Loader2 size={21} className="animate-spin"/><span>{slow?'Лаборатория загружается дольше обычного.':'Готовим плату и 3D-детали…'}</span>{slow&&<GameButton size="compact" onClick={()=>setRevision(n=>n+1)}><RotateCcw size={15}/>Повторить загрузку</GameButton>}</div>}
   {unavailable&&<p className="arduino-lab-notice" role="alert">Для интерактивной модели нужен WebGL. Обзор и примеры кода остаются доступны.</p>}
  </div>
  <div className="arduino-notifications">{notifications}</div>
  <footer className="arduino-course-footer">
   <span role="status">{saving?'Сохраняем результат…':failed?`Не удалось сохранить: ${failed.title}.`:completed.some(task=>task.id===selected.id)?'✓ Урок пройден. Можно продолжить эксперимент.':'Изучи схему и нажми «Запустить» — результат сохранится в CyberLearn.'}</span>
   {failed&&<GameButton size="compact" disabled={saving} onClick={()=>void onComplete(failed)}>Повторить сохранение</GameButton>}
  </footer>
 </section>;
}
