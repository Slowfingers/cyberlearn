import { PlayerAvatar } from './PlayerAvatar';
import type { User } from '../types';
import {GameButton} from './GameUI';
import React from 'react';
import { BookOpen, Check, LayoutList } from 'lucide-react';
import '../styles/game-shell.css';

const PHASES = ['Объяснение', 'Практика', 'Результат'];

/** The same orientation controls for explanation, quiz and interactive practice. */
export function LessonHeader({title, practice=false, result=false, onMenu, onExplanation, player}: {title:string; player?:Pick<User,'equipped'>; practice?:boolean; result?:boolean; onMenu:()=>void; onExplanation?:()=>void}) {
  const current = result ? 2 : practice ? 1 : 0;
  return <header className="lesson-toolbar">
    <GameButton size="compact" className="lesson-menu-toggle" aria-label="Меню курса" onClick={onMenu}><LayoutList size={19}/><span>Уроки</span></GameButton>
    <div className="lesson-toolbar-title"><span>Миссия</span><h2>{title}</h2></div>
    <ol className="lesson-phases" aria-label="Этапы урока">{PHASES.map((name, i) => <li key={name} className={i < current ? 'is-done' : i === current ? 'is-current' : ''} aria-current={i === current ? 'step' : undefined}>{i < current && <Check size={14} aria-hidden="true"/>}{name}</li>)}</ol>
    {player && <div className="lesson-player-avatar" title="Твой персонаж"><PlayerAvatar user={player} scale={0.8}/></div>}
    {practice && onExplanation && <GameButton size="compact" className="lesson-explanation-link" aria-label="К объяснению" onClick={onExplanation}><BookOpen size={17}/><span>К объяснению</span></GameButton>}
  </header>;
}
