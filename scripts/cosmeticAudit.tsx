import React, { useState } from 'react';
import { createRoot } from 'react-dom/client';
import '../index.css';
import ShopAvatar, { STREET_AVATARS } from '../components/ShopAvatar';
import { BigCharacter3D, MENTOR_NAMES, type MascotMood } from '../components/BigCharacter3D';
function Audit() {
 const [frame,setFrame]=useState(0);const [mood,setMood]=useState<MascotMood>('celebrate');
 return <main className="academy-app sprite-audit" style={{overflow:'auto',padding:16,height:'100dvh'}}>
  <style>{`.sprite-audit .street-avatar-strip,.sprite-audit .mentor-movement-strip{animation:none!important;transform:translateX(${-362*frame}px)!important}.sprite-audit .mentor-reaction-pixels{display:none}.sprite-audit-grid{display:grid;grid-template-columns:repeat(7,minmax(0,1fr));gap:12px}.sprite-audit-card{display:flex;flex-direction:column;align-items:center;background:#122338;border:1px solid #426782;padding:10px;gap:8px}.sprite-audit-card .mentor-character{width:88px;height:176px}@media(max-width:700px){.sprite-audit-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}`}</style>
  <header style={{display:'flex',gap:12,flexWrap:'wrap',marginBottom:16}}><label>Кадр <select aria-label="Кадр" value={frame} onChange={e=>setFrame(Number(e.target.value))}>{Array.from({length:6},(_,i)=><option key={i} value={i}>{i+1}</option>)}</select></label><label>Реакция <select aria-label="Реакция" value={mood} onChange={e=>setMood(e.target.value as MascotMood)}><option value="idle">Ожидание</option><option value="celebrate">Радость</option><option value="thinking">Поддержка</option></select></label></header>
  <div className="sprite-audit-grid">{STREET_AVATARS.map(a=><article className="sprite-audit-card" key={a.value}><ShopAvatar avatarId={a.value} fullBody scale={3.6}/><strong>{a.name}</strong></article>)}{Object.entries(MENTOR_NAMES).map(([skin,name])=><article className="sprite-audit-card" key={skin}><BigCharacter3D skin={skin} mood={mood}/><strong>{name}</strong></article>)}</div>
 </main>;
}
createRoot(document.getElementById('root')!).render(<Audit/>);
