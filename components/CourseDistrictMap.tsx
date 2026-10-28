import React,{useEffect,useRef,useId} from 'react';
import {ArrowRight,BookOpen,Brain,Check,Code,Cpu,FolderOpen,Globe,Keyboard,Lock,Network,ShieldAlert,Table,Terminal} from 'lucide-react';
import type {Task,User} from '../types';
import {courseDistrictLayout,courseDistrictRoutes} from '../utils/campaignGeometry';
import {PlayerAvatar} from './PlayerAvatar';
export interface CourseDistrict {name:string;tasks:Task[];done:number}
const ICONS:Record<string,typeof BookOpen>={grid:Code,typing:Keyboard,file_organizer:FolderOpen,spreadsheet:Table,terminal:Terminal,html:Globe,network_route:Network,phishing_detect:ShieldAlert,fake_detector:ShieldAlert,ai_neuron:Brain,ai_kids_trainer:Brain,pc_builder:Cpu,arduino:Cpu,smart_city:Cpu,circuit_builder:Cpu};
export function districtIcon(tasks:Task[]){const types=new Map<string,number>();for(const task of tasks)if(task.type!=='quiz')types.set(task.type,(types.get(task.type)??0)+1);const type=[...types].sort((a,b)=>b[1]-a[1])[0]?.[0];return ICONS[type]??BookOpen;}
export default function CourseDistrictMap({regions,activeIndex,nextIndex,courseId,user,onSelect}:{regions:CourseDistrict[];activeIndex:number;nextIndex:number;courseId:string;user:User;onSelect:(index:number)=>void}){
 const maskId=useId().replace(/:/g,''),routes=courseDistrictRoutes(regions.length);
 const layout=courseDistrictLayout(regions.length),viewport=useRef<HTMLDivElement>(null),world=useRef<HTMLDivElement>(null);
 useEffect(()=>{const frame=requestAnimationFrame(()=>{const host=viewport.current,map=world.current,point=layout.districts[activeIndex];if(host&&map&&point)host.scrollLeft=point.x/100*map.clientWidth-host.clientWidth/2;});return()=>cancelAnimationFrame(frame);},[courseId,activeIndex,regions.length]);
 return <div className="course-city" aria-label="Город курса">
  <div className="course-city-viewport" ref={viewport} tabIndex={0} aria-label="Карта районов курса. Выбери район; широкую карту можно прокручивать по горизонтали">
   <div className="course-city-world" ref={world} data-course-city={courseId} data-district-count={regions.length} style={{'--city-sectors':layout.sectors,minWidth:900*layout.sectors} as React.CSSProperties}>
    <div className="course-city-art" aria-hidden="true">{Array.from({length:layout.sectors},(_,sector)=><img key={sector} src="/art/neo-academy/city-districts-v10.webp"  alt="" draggable={false}/>)}</div>
    <svg className="course-city-route" viewBox={`0 0 ${layout.width} 1024`} aria-hidden="true">
     <defs><mask id={maskId} maskUnits="userSpaceOnUse" x="0" y="0" width={layout.width} height="1024"><rect width={layout.width} height="1024" fill="white"/>{Array.from({length:layout.sectors},(_,sector)=><g key={sector} transform={`translate(${sector*1536} 0)`}><polygon points="650,330 755,310 925,400 975,470 875,530 620,470" fill="black"/><polygon points="175,550 270,525 380,625 410,710 310,755 130,700" fill="black"/></g>)}</mask></defs>
     <g mask={`url(#${maskId})`}>{routes.map(r=><path key={r.to} data-route-to={r.to} className={`course-city-road course-city-road--${regions[r.from].done===regions[r.from].tasks.length?'done':regions[r.to].tasks.every(t=>t.status==='locked')?'locked':'open'}${r.transit?' course-city-road--transit':''}`} d={r.path} transform={r.transit?undefined:`translate(${r.sector*1536} 0)`}/>)}</g>
     {layout.districts.map(p=><g key={p.index} className={`course-city-stop${p.index===nextIndex?' is-current':''}${regions[p.index].done===regions[p.index].tasks.length?' is-done':''}${regions[p.index].tasks.every(t=>t.status==='locked')?' is-locked':''}`} transform={`translate(${p.rawX} ${p.rawY})`}><circle r="29"/><text textAnchor="middle" dominantBaseline="central">{p.index+1}</text></g>)}
    </svg>
    {layout.districts.map(p=><button key={`stop-${p.index}`} className="course-city-stop-hit" style={{left:`${p.x}%`,top:`${p.y}%`}} aria-label={`Войти в район ${p.index+1}: ${regions[p.index].name}`} onClick={()=>onSelect(p.index)}/>)}
    {layout.districts.filter(p=>p.index===nextIndex).map(p=><span key={p.index} className="course-city-traveler" style={{left:`${p.x}%`,top:`${p.y}%`}} aria-hidden="true"><PlayerAvatar user={user}/></span>)}
    <div className="course-city-districts" role="group" aria-label="Районы города">
     {layout.districts.map(p=>{const r=regions[p.index],Icon=districtIcon(r.tasks),locked=r.tasks.every(t=>t.status==='locked'),done=r.done===r.tasks.length;return <button key={r.name} type="button" className={`campaign-region course-city-district${p.index===activeIndex?' is-active':''}${locked?' is-locked':''}${done?' is-completed':''}`} style={{left:`${p.labelX}%`,top:`${p.labelY}%`,width:`calc(${20/layout.sectors}% - 22px)`}} aria-label={`Район ${p.index+1}: ${r.name}. ${r.done} из ${r.tasks.length} миссий пройдено${locked?'. Задания пока закрыты':''}`} aria-pressed={p.index===activeIndex} onClick={()=>onSelect(p.index)}>
      <span className="course-city-district-icon">{locked?<Lock size={19}/>:done?<Check size={19}/>:<Icon size={19}/>}</span><span className="course-city-district-name"><em>РАЙОН {String(p.index+1).padStart(2,'0')}</em><strong>{r.name}</strong><small>{r.done} / {r.tasks.length}</small></span><ArrowRight className="course-city-enter" size={16}/><span className="course-city-district-progress"><i style={{width:`${r.tasks.length?r.done/r.tasks.length*100:0}%`}}/></span>
     </button>;})}
    </div>
   </div>
  </div>
  <p className="course-city-hint">Путь соединяет районы по порядку курса. Нажми на название района, чтобы открыть задания. <span>← Город можно прокручивать →</span></p>
 </div>;
}
