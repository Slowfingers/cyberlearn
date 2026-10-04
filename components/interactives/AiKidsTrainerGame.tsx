import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { RotateCcw, Sparkles } from 'lucide-react';
import { WorkshopArt, WorkshopHeader, WorkshopProgress } from './WorkshopArt';
interface TrainingCard {
  id: string;
  name: string;
  icon: string;
  category: 'cat' | 'dog';
}

const CARDS: TrainingCard[] = [
  { id: 'c1', name: 'Рыжий котенок', icon: '🐱', category: 'cat' },
  { id: 'c2', name: 'Дружелюбный пёс', icon: '🐶', category: 'dog' },
  { id: 'c3', name: 'Белый кот с бантиком', icon: '🐈', category: 'cat' },
  { id: 'c4', name: 'Щенок с мячиком', icon: '🐕', category: 'dog' },
  { id: 'c5', name: 'Пушистый сиамский кот', icon: '😺', category: 'cat' },
  { id: 'c6', name: 'Овчарка-охранник', icon: '🦮', category: 'dog' },
];


export const AiKidsTrainerGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const cards = task.aiTrainerConfig?.cards?.length ? task.aiTrainerConfig.cards : CARDS;
  const names = { cat: task.aiTrainerConfig?.categoryNames?.cat || 'Котики', dog: task.aiTrainerConfig?.categoryNames?.dog || 'Собачки' };
  const [assignments, setAssignments] = useState<Record<string, 'cat' | 'dog'>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('Роботу нужны примеры. Разложи карточки по двум наборам.');
  const [completed, setCompleted] = useState(false);
  const finished = useRef(false);
  const pointer = useRef<{ id: string; x: number; y: number; moved: boolean } | null>(null);
  const [ghost, setGhost] = useState<{ id: string; x: number; y: number } | null>(null);
  const suppressClick = useRef<string | null>(null);
  const reset = () => { setAssignments({}); setSelected(null); setCompleted(false); finished.current = false; setFeedback('Роботу нужны примеры. Разложи карточки по двум наборам.'); pointer.current = null; setGhost(null); };
  useEffect(reset, [task.id]);
  const assign = (id: string | null, category: 'cat' | 'dog') => { if (!id || completed) return; setAssignments(prev => ({ ...prev, [id]: category })); setSelected(null); setFeedback('Пример добавлен. Нажми на карточку в наборе, чтобы вернуть её.'); playSound('hit'); };
  const basketAt = (x: number, y: number) => document.elementFromPoint(x,y)?.closest<HTMLElement>('[data-basket]')?.dataset.basket as 'cat' | 'dog' | undefined;
  const train = () => { if (finished.current) return; const wrong = cards.find(c => assignments[c.id] !== c.category); if (wrong) { setFeedback(`Проверь пример «${wrong.name}»: ему нужен набор «${names[wrong.category]}». Нажми на него, чтобы вернуть и переложить.`); playSound('error'); return; } finished.current = true; setCompleted(true); setFeedback('Примеры подписаны верно! Так мы подготовили данные для обучения. Новые примеры ещё нужно проверять.'); playSound('success'); onComplete(); };
  return <div className="workshop-game"><WorkshopHeader title="Школа робота" description="Подготовь два набора примеров. Робот будет учиться на твоих подсказках."><button className="workshop-icon-button" onClick={reset} aria-label="Начать заново"><RotateCcw size={19} /></button></WorkshopHeader>
    <WorkshopProgress value={Object.keys(assignments).length} total={cards.length} /><p className="workshop-feedback" role="status">{feedback}</p>
    <div className="delivery-desk"><div className="workshop-section-title">Примеры для обучения</div><div className="parcel-grid">{cards.filter(c => !assignments[c.id]).map(c => <button key={c.id} className={`parcel-card ${selected === c.id ? 'is-selected' : ''}`} aria-pressed={selected === c.id} onClick={() => { if (suppressClick.current === c.id) { suppressClick.current = null; return; } suppressClick.current = null; setSelected(c.id); }}
      onPointerDown={e => { if (e.button !== 0) return; pointer.current = { id: c.id, x:e.clientX,y:e.clientY,moved:false }; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={e => { const p = pointer.current; if (!p || p.id !== c.id) return; if (Math.hypot(e.clientX-p.x,e.clientY-p.y)>8) p.moved=true; if (p.moved) setGhost({id:c.id,x:e.clientX,y:e.clientY}); }}
      onPointerUp={e => { if (pointer.current?.moved) { suppressClick.current = c.id; const target=basketAt(e.clientX,e.clientY); if (target) assign(c.id,target); } pointer.current=null; setGhost(null); }}
      onPointerCancel={() => {pointer.current=null;setGhost(null);}}><span className="training-card-icon">{c.icon}</span><strong className="parcel-name">{c.name}</strong><span className="parcel-select">{selected === c.id ? 'Выбрано ✓' : 'Взять пример'}</span></button>)}</div></div>
    <div className="training-baskets">{(['cat','dog'] as const).map(category => <section key={category} data-basket={category} className="training-basket"><button className="basket-target" disabled={completed} onClick={() => assign(selected,category)} aria-label={`Набор ${names[category]}`}><WorkshopArt kind={`folder-${category === 'cat' ? 'music' : 'image'}`} /><strong>{names[category]}</strong><span>{selected ? 'Добавить выбранный пример' : 'Перетащи пример сюда'}</span></button><div className="basket-examples">{cards.filter(c => assignments[c.id] === category).map(c => <button key={c.id} disabled={completed} onClick={() => setAssignments(prev => { const next = {...prev}; delete next[c.id]; return next; })} aria-label={`Вернуть: ${c.name}`} title={`${c.name} · вернуть`}><span>{c.icon}</span><small>{c.name}</small></button>)}</div></section>)}</div>
    <button className="workshop-primary" disabled={Object.keys(assignments).length !== cards.length || completed} onClick={train}><Sparkles size={18} />{completed ? 'Примеры готовы!' : 'Проверить примеры для робота'}</button>
    {ghost && <div className="parcel-ghost training-card-icon" style={{left:ghost.x,top:ghost.y}}>{cards.find(c => c.id === ghost.id)?.icon}</div>}
  </div>;
};
