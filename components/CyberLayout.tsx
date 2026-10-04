import { RaiseHand } from './ClassFolders';
import React, { useState } from 'react';
import { BookOpen, LogOut, Volume2, VolumeX, X } from 'lucide-react';
import { Role } from '../types';
import { isSoundMuted, toggleSound, playSound } from '../utils/sound';
interface LayoutProps { children: React.ReactNode; role: Role; onLogout: () => void; title?: string; localDemo?: boolean }
const CyberLayout: React.FC<LayoutProps> = ({ children, role, onLogout, localDemo }) => {
  const [muted,setMuted] = useState(isSoundMuted());
  const [confirm,setConfirm] = useState(false);
  return <div className="academy-app">
    <header className="academy-topbar"><div className="academy-brand"><span className="academy-brand-mark"><BookOpen size={23}/></span><span>Cyber<span>Learn</span><small>Академия будущего</small></span></div>
      <span className="academy-role-label">{role === 'teacher' ? 'Кабинет учителя' : 'Мир твоих возможностей'}</span>
      <div className="academy-top-actions">{localDemo && <span className="academy-demo-badge">Локальный тест</span>}<button onClick={() => {const value=toggleSound();setMuted(value);if(!value)playSound('click');}} aria-label={muted ? 'Включить звук' : 'Выключить звук'} title={muted ? 'Включить звук' : 'Выключить звук'}>{muted ? <VolumeX size={19}/> : <Volume2 size={19}/>}</button><button aria-label="Выйти из аккаунта" onClick={() => setConfirm(true)}><LogOut size={18}/><span>Выйти</span></button></div>
    </header>
    <main className="academy-main">{role==='student'&&<RaiseHand/>}{children}</main>
    {confirm && <div className="academy-dialog-backdrop" onKeyDown={e=>{if(e.key==='Escape')setConfirm(false);}}><section className="academy-dialog" role="dialog" aria-modal="true" aria-labelledby="logout-heading"><button className="academy-dialog-close" aria-label="Отмена" onClick={()=>setConfirm(false)}><X size={20}/></button><h2 id="logout-heading">Выйти из аккаунта?</h2><p>Твой прогресс сохранён. Продолжишь, когда вернёшься.</p><div className="academy-dialog-actions"><button autoFocus className="academy-secondary" onClick={()=>setConfirm(false)}>Остаться</button><button className="academy-primary" onClick={()=>{setConfirm(false);onLogout();}}>Выйти</button></div></section></div>}
  </div>;
};
export default CyberLayout;
