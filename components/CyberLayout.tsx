import {GameButton, GameDialog} from './GameUI';
import { RaiseHand } from './ClassFolders';
import React, { useState } from 'react';
import { BookOpen, LogOut, Volume2, VolumeX } from 'lucide-react';
import { Role } from '../types';
import { isSoundMuted, toggleSound, playSound } from '../utils/sound';
interface LayoutProps { children: React.ReactNode; role: Role; onLogout: () => void; title?: string; localDemo?: boolean }
const CyberLayout: React.FC<LayoutProps> = ({ children, role, onLogout, localDemo }) => {
  const [muted,setMuted] = useState(isSoundMuted());
  const [confirm,setConfirm] = useState(false);
  return <div className="academy-app">
    <header className="academy-topbar"><div className="academy-brand"><span className="academy-brand-mark"><BookOpen size={23}/></span><span>Cyber<span>Learn</span><small>Академия будущего</small></span></div>
      <span className="academy-role-label">{role === 'teacher' ? 'Кабинет учителя' : 'Мир твоих возможностей'}</span>
      <div className="academy-top-actions">{localDemo && <span className="academy-demo-badge">Локальный тест</span>}<GameButton size="icon" onClick={() => {const value=toggleSound();setMuted(value);if(!value)playSound('click');}} aria-label={muted ? 'Включить звук' : 'Выключить звук'} title={muted ? 'Включить звук' : 'Выключить звук'}>{muted ? <VolumeX size={19}/> : <Volume2 size={19}/>}</GameButton><GameButton size="compact" aria-label="Выйти из аккаунта" onClick={() => setConfirm(true)}><LogOut size={18}/><span>Выйти</span></GameButton></div>
    </header>
    <main className="academy-main">{role==='student'&&<RaiseHand/>}{children}</main>
    {confirm && <GameDialog title="Выйти из аккаунта?" onClose={()=>setConfirm(false)}><p>Твой прогресс сохранён. Продолжишь, когда вернёшься.</p><div className="ui-dialog-actions"><GameButton autoFocus onClick={()=>setConfirm(false)}>Остаться</GameButton><GameButton variant="primary" onClick={()=>{setConfirm(false);onLogout();}}>Выйти</GameButton></div></GameDialog>}
  </div>;
};
export default CyberLayout;
