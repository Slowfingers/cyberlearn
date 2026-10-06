import React from 'react';
import { BookOpen, LayoutList } from 'lucide-react';

/** The same orientation controls for explanation, quiz and interactive practice. */
export function LessonHeader({title, practice=false, onMenu, onExplanation}: {title:string; practice?:boolean; onMenu:()=>void; onExplanation?:()=>void}) {
  return <header className="lesson-toolbar">
    <button className="lesson-menu-toggle" aria-label="Меню курса" onClick={onMenu}><LayoutList size={19}/><span>Уроки</span></button>
    <div className="lesson-toolbar-title"><span>{practice ? 'Практика' : 'Разбираемся с наставником'}</span><h2>{title}</h2></div>
    {practice && onExplanation && <button className="lesson-explanation-link" onClick={onExplanation}><BookOpen size={17}/><span>К объяснению</span></button>}
  </header>;
}
