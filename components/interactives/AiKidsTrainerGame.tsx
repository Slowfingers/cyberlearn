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
  const [phase,setPhase]=useState<'train'|'test'|'review'>('train');
  const [reviewFeedback,setReviewFeedback]=useState('');
  const cards = phase==='test' ? task.aiTrainerConfig!.testCards! : task.aiTrainerConfig?.cards?.length ? task.aiTrainerConfig.cards : CARDS;
  const names = { cat: task.aiTrainerConfig?.categoryNames?.cat || 'Котики', dog: task.aiTrainerConfig?.categoryNames?.dog || 'Собачки' };
  const [assignments, setAssignments] = useState<Record<string, 'cat' | 'dog'>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('Роботу нужны примеры. Разложи карточки по двум наборам.');
  const [completed, setCompleted] = useState(false);
  const finished = useRef(false);
  const pointer = useRef<{ id: string; x: number; y: number; moved: boolean } | null>(null);
  const [ghost, setGhost] = useState<{ id: string; x: number; y: number } | null>(null);
  const suppressClick = useRef<string | null>(null);
  const reset = () => { setPhase('train');setReviewFeedback('');setAssignments({}); setSelected(null); setCompleted(false); finished.current = false; setFeedback('Роботу нужны примеры. Разложи карточки по двум наборам.'); pointer.current = null; setGhost(null); };
  useEffect(reset, [task.id]);
  const assign = (id: string | null, category: 'cat' | 'dog') => { if (!id || completed) return; setAssignments(prev => ({ ...prev, [id]: category })); setSelected(null); setFeedback('Пример добавлен. Нажми на карточку в наборе, чтобы вернуть её.'); playSound('hit'); };
  const basketAt = (x: number, y: number) => document.elementFromPoint(x,y)?.closest<HTMLElement>('[data-basket]')?.dataset.basket as 'cat' | 'dog' | undefined;
  const finish = () => {if(finished.current)return;finished.current=true;setCompleted(true);setFeedback('Разметка проверена. Данные подготовлены; настоящую модель ещё нужно обучить и испытать.');playSound('success');onComplete();};
  const train = () => {
    if(finished.current)return;
    const wrong=cards.find(c=>assignments[c.id]!==c.category);
    if(wrong){setFeedback(`Проверь пример «${wrong.name}»: соответствует ли он выбранному набору? Нажми на карточку, чтобы вернуть её.`);playSound('error');return;}
    if(phase==='train' && task.aiTrainerConfig?.testCards?.length){setPhase('test');setAssignments({});setSelected(null);setFeedback('Теперь другие примеры. Подпиши их независимо от учебного набора.');return;}
    if(task.aiTrainerConfig?.review){setPhase('review');setSelected(null);return;}
    finish();
  };
  if(phase==='review'){
    const review=task.aiTrainerConfig!.review!;
    return <div className="workshop-game"><WorkshopHeader title="Проверка учебных данных" description="Объясни, зачем были нужны эти примеры."><button className="workshop-icon-button" onClick={reset} aria-label="Начать заново"><RotateCcw size={19}/></button></WorkshopHeader><h3 className="text-lg font-semibold">{review.question}</h3><div className="flex flex-col gap-3">{review.options.map((option,i)=><button key={option} disabled={completed} className="academy-secondary text-left p-4" onClick={()=>{if(i===review.correctIndex){setReviewFeedback(review.explanation);finish();}else{setReviewFeedback('Подумай ещё раз: что должны показывать учебные и новые примеры?');playSound('error');}}}>{option}</button>)}</div><p role="status">{reviewFeedback}</p></div>;
  }

  return <div className="workshop-game"><WorkshopHeader title="Школа робота" description="Подпиши примеры по правилу. Это подготовка данных для будущего обучения."><button className="workshop-icon-button" onClick={reset} aria-label="Начать заново"><RotateCcw size={19} /></button></WorkshopHeader>
    <WorkshopProgress value={Object.keys(assignments).length} total={cards.length} /><p className="workshop-feedback" role="status">{feedback}</p>
    <div className="delivery-desk"><div className="workshop-section-title">{phase==='test' ? 'Новые проверочные примеры' : 'Примеры для обучения'}</div><div className="parcel-grid">{cards.filter(c => !assignments[c.id]).map(c => <button key={c.id} className={`parcel-card ${selected === c.id ? 'is-selected' : ''}`} aria-pressed={selected === c.id} onClick={() => { if (suppressClick.current === c.id) { suppressClick.current = null; return; } suppressClick.current = null; setSelected(c.id); }}
      onPointerDown={e => { if (e.button !== 0) return; pointer.current = { id: c.id, x:e.clientX,y:e.clientY,moved:false }; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={e => { const p = pointer.current; if (!p || p.id !== c.id) return; if (Math.hypot(e.clientX-p.x,e.clientY-p.y)>8) p.moved=true; if (p.moved) setGhost({id:c.id,x:e.clientX,y:e.clientY}); }}
      onPointerUp={e => { if (pointer.current?.moved) { suppressClick.current = c.id; const target=basketAt(e.clientX,e.clientY); if (target) assign(c.id,target); } pointer.current=null; setGhost(null); }}
      onPointerCancel={() => {pointer.current=null;setGhost(null);}}><span className="training-card-icon">{c.icon}</span><strong className="parcel-name">{c.name}</strong><span className="parcel-select">{selected === c.id ? 'Выбрано ✓' : 'Взять пример'}</span></button>)}</div></div>
    <div className="training-baskets">{(['cat','dog'] as const).map(category => <section key={category} data-basket={category} className="training-basket"><button className="basket-target" disabled={completed} onClick={() => assign(selected,category)} aria-label={`Набор ${names[category]}`}><WorkshopArt kind={`folder-${category === 'cat' ? 'music' : 'image'}`} /><strong>{names[category]}</strong><span>{selected ? 'Добавить выбранный пример' : 'Перетащи пример сюда'}</span></button><div className="basket-examples">{cards.filter(c => assignments[c.id] === category).map(c => <button key={c.id} disabled={completed} onClick={() => setAssignments(prev => { const next = {...prev}; delete next[c.id]; return next; })} aria-label={`Вернуть: ${c.name}`} title={`${c.name} · вернуть`}><span>{c.icon}</span><small>{c.name}</small></button>)}</div></section>)}</div>
    <button className="workshop-primary" disabled={Object.keys(assignments).length !== cards.length || completed} onClick={train}><Sparkles size={18} />{completed ? 'Примеры готовы!' : phase==='test' ? 'Проверить новые примеры' : 'Проверить примеры для робота'}</button>
    {ghost && <div className="parcel-ghost training-card-icon" style={{left:ghost.x,top:ghost.y}}>{cards.find(c => c.id === ghost.id)?.icon}</div>}
  </div>;
};
