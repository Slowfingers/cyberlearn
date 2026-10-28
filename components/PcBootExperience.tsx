import React,{useEffect,useState} from 'react';
import {X} from 'lucide-react';

/** User-provided GIF is served locally, inside the physical workshop monitor. */
export default function PcBootExperience({onClose}:{onClose:()=>void}){
 const [phase,setPhase]=useState<'bios'|'system'|'gif'>('bios');
 useEffect(()=>{
  const system=setTimeout(()=>setPhase('system'),3200);
  const gif=setTimeout(()=>setPhase('gif'),5200);
  return()=>{clearTimeout(system);clearTimeout(gif);};
 },[]);
 return <section className="pc-first-boot" aria-label="Первый запуск компьютера" data-phase={phase} onKeyDown={e=>{if(e.key==='Escape'){e.stopPropagation();onClose();}}}>
  <header className="pc-boot-bar"><span>{phase==='gif'?'Rick Astley · Never Gonna Give You Up':'CYBERLEARN / FIRST BOOT'}</span><button autoFocus onClick={onClose} aria-label="Вернуться к сборке"><X size={16}/><span>К сборке</span></button></header>
  {phase==='bios'?<div className="pc-boot-bios" role="status">
   <strong>CYBER BIOS <small>v1.0</small></strong>
   <p>Процессор и память <b>OK</b></p><p>Накопитель и видеокарта <b>OK</b></p><p>Питание и подключения <b>OK</b></p>
   <div className="pc-boot-prompt">POST завершён. Запуск системы<span aria-hidden="true">_</span></div>
  </div>:phase==='system'?<div className="pc-boot-system" role="status"><div className="pc-boot-emblem" aria-hidden="true">C<span>↗</span></div><h3>CyberOS</h3><p>Твой компьютер оживает</p><div className="pc-boot-loader" aria-hidden="true"><i/></div></div>:<div className="pc-boot-rickroll">
   <img src="/art/pc-builder/rickroll.gif" alt="Рик Эстли танцует — Never Gonna Give You Up" draggable={false}/>
  </div>}
 </section>;
}
