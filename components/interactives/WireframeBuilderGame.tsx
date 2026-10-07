import {GameButton} from '../GameUI';
import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { RotateCcw, Play, X, Settings, Trophy, Star } from 'lucide-react';
import { WorkshopArt, WorkshopHeader, WorkshopProgress } from './WorkshopArt';

interface Widget {
  id: string;
  name: string;
  slot: 'header' | 'hero' | 'action' | 'footer';
  icon: string;
  desc: string;
}

const AVAILABLE_WIDGETS: Widget[] = [
  { id: 'w1', name: 'Аватар и Уровень игрока', slot: 'header', icon: '🤖', desc: 'Показывает твоего кибер-робота' },
  { id: 'w2', name: 'Большая картинка игры', slot: 'hero', icon: '🚀', desc: 'Космический корабль в космосе' },
  { id: 'w3', name: 'Кнопка «СТАРТ ИГРЫ»', slot: 'action', icon: '▶️', desc: 'Яркая зеленая кнопка запуска' },
  { id: 'w4', name: 'Панель «Звезды и Очки»', slot: 'footer', icon: '⭐', desc: 'Счетчик рекордов внизу' },
  { id: 'w5', name: 'Кнопка настроек звука', slot: 'header', icon: '⚙️', desc: 'Переключатель музыки' },
  { id: 'w6', name: 'Таблица рекордов друзей', slot: 'hero', icon: '🏆', desc: 'Список лучших игроков' },
];

type SlotName = 'header' | 'hero' | 'action' | 'footer';

// Алиасы имён элементов из краткого формата requiredElements -> слоты экрана
const SLOT_ALIASES: Record<string, SlotName> = {
  header: 'header',
  canvas: 'hero',
  hero: 'hero',
  controls: 'action',
  action: 'action',
  button: 'action',
  footer: 'footer',
  stats: 'footer',
};

const ALL_SLOTS: SlotName[] = ['header', 'hero', 'action', 'footer'];

// Конфиг виджетов и требуемых слотов из задачи (полный widgets[] или краткий requiredElements[])
export const resolveWireframeWidgets = (task: Task): { widgets: Widget[]; requiredSlots: SlotName[] } => {
  const cfg = task.wireframeConfig;
  if (cfg?.widgets?.length) {
    return { widgets: cfg.widgets, requiredSlots: [...new Set(cfg.widgets.map(w => w.slot))] };
  }
  if (cfg?.requiredElements?.length) {
    const requiredSlots = [...new Set(
      cfg.requiredElements.map(e => SLOT_ALIASES[e]).filter((s): s is SlotName => !!s)
    )];
    const widgets = AVAILABLE_WIDGETS.filter(w => requiredSlots.includes(w.slot));
    if (widgets.length > 0 && requiredSlots.length > 0) {
      return { widgets, requiredSlots };
    }
  }
  return { widgets: AVAILABLE_WIDGETS, requiredSlots: ALL_SLOTS };
};


const SLOT_LABELS: Record<SlotName, string> = { header: 'Верхняя панель', hero: 'Главная область', action: 'Главное действие', footer: 'Нижняя панель' };
export const WireframeBuilderGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const { widgets, requiredSlots } = resolveWireframeWidgets(task);
  const [slots, setSlots] = useState<Partial<Record<SlotName, Widget>>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [running, setRunning] = useState(false);
  const [feedback, setFeedback] = useState('Выбери деталь и нажми на подходящую область экрана.');
  const finished = useRef(false);
  const [ghost, setGhost] = useState<{ id: string; x: number; y: number } | null>(null);
  const pointer = useRef<{ id: string; x: number; y: number; moved: boolean } | null>(null);
  const suppressClick = useRef<string | null>(null);
  const reset = () => { setSlots({}); setSelected(null); setRunning(false); finished.current = false; setFeedback('Выбери деталь и нажми на подходящую область экрана.'); pointer.current = null; setGhost(null); };
  useEffect(reset, [task.id]);
  const place = (id: string | null, slot: SlotName) => {
    if (running) return;
    const widget = widgets.find(w => w.id === id); if (!widget) return;
    if (widget.slot !== slot) { setFeedback(`Этой детали нужна другая область. ${widget.desc}`); playSound('error'); return; }
    setSlots(prev => ({ ...prev, [slot]: widget })); setSelected(null); setFeedback('Деталь на месте! Продолжай собирать экран.'); playSound('hit');
  };
  const count = requiredSlots.filter(s => slots[s]).length;
  const launch = () => { if (finished.current || count !== requiredSlots.length) return; finished.current = true; setRunning(true); setFeedback('Твой экран готов! Все нужные элементы на своих местах.'); playSound('success'); onComplete(); };
  const slotAt = (x: number, y: number) => document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-screen-slot]')?.dataset.screenSlot as SlotName | undefined;
  const art = (widget: Widget) => widget.slot === 'hero' ? <WorkshopArt kind="image" /> : widget.slot === 'header' ? widget.id === 'w5' ? <Settings /> : <WorkshopArt /> : widget.slot === 'footer' ? <Star /> : <Play />;
  return <div className="workshop-game">
    <WorkshopHeader title="Студия игровых экранов" description="Собери приложение из деталей, а затем запусти его."><GameButton variant="secondary" size="icon" className="workshop-icon-button" onClick={reset} aria-label="Начать заново"><RotateCcw size={19} /></GameButton></WorkshopHeader>
    <WorkshopProgress value={count} total={requiredSlots.length} /><p className="workshop-feedback" role="status">{feedback}</p>
    <div className="screen-builder"><section><div className="workshop-section-title">Твои детали</div><div className="widget-grid">{widgets.map(w => <button key={w.id} disabled={running || slots[w.slot]?.id === w.id} className={`widget-card ${selected === w.id ? 'is-selected' : ''}`} aria-pressed={selected === w.id}
      onClick={() => { if (suppressClick.current === w.id) { suppressClick.current = null; return; } suppressClick.current = null; setSelected(w.id); setFeedback(w.desc); }}
      onPointerDown={e => { if (e.button !== 0) return; pointer.current = { id: w.id, x: e.clientX, y: e.clientY, moved: false }; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={e => { const p = pointer.current; if (!p || p.id !== w.id) return; if (Math.hypot(e.clientX-p.x,e.clientY-p.y)>8) p.moved = true; if (p.moved) setGhost({ id: w.id, x: e.clientX, y: e.clientY }); }}
      onPointerUp={e => { const p = pointer.current; if (p?.moved) { suppressClick.current = w.id; const slot = slotAt(e.clientX,e.clientY); if (slot) place(w.id,slot); } pointer.current = null; setGhost(null); }}
      onPointerCancel={() => { pointer.current = null; setGhost(null); }}>
      <div className="widget-art">{art(w)}</div><strong>{w.name}</strong><span>{slots[w.slot]?.id === w.id ? 'На экране ✓' : 'Взять деталь'}</span></button>)}</div></section>
      <section className="phone-studio"><div className="studio-phone"><div className="phone-camera" /><div className={`phone-screen ${running ? 'is-running' : ''}`}>{requiredSlots.map((slot, index) => <div key={slot} data-screen-slot={slot} className={`screen-slot slot-${slot} ${slots[slot] ? 'is-filled' : ''}`}><button className="slot-target" disabled={running} onClick={() => place(selected, slot)} aria-label={`Область ${SLOT_LABELS[slot]}`}>{slots[slot] ? <>{art(slots[slot]!)}<strong>{slots[slot]!.name}</strong></> : <><span className="slot-number">{index + 1}</span><span>{SLOT_LABELS[slot]}</span><small>Помести деталь сюда</small></>}</button>{slots[slot] && !running && <button className="slot-remove" aria-label={`Убрать: ${slots[slot]!.name}`} onClick={() => setSlots(prev => { const next = { ...prev }; delete next[slot]; return next; })}><X size={16} /></button>}</div>)}</div></div>
      <GameButton variant="primary" size="compact" className="workshop-primary" disabled={count !== requiredSlots.length || running} onClick={launch}>{running ? <><Trophy size={18} /> Экран готов!</> : <><Play size={18} /> Запустить приложение</>}</GameButton></section>
    </div>{ghost && <div className="parcel-ghost" style={{ left: ghost.x, top: ghost.y }}><WorkshopArt /></div>}
  </div>;
};
