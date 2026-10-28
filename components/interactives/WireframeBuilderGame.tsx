import {GameButton} from '../GameUI';
import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Play, X, Trophy, LayoutTemplate } from 'lucide-react';
import { WorkshopHeader, WorkshopProgress } from './WorkshopArt';

interface Widget {
  id: string;
  name: string;
  slot: 'header' | 'hero' | 'action' | 'footer' | 'none';
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
    const required = [...new Set(cfg.widgets.map(w => w.slot))].filter((s): s is SlotName => s !== 'none');
    return { widgets: cfg.widgets, requiredSlots: required };
  }
  if (cfg?.requiredElements?.length) {
    const requiredSlots = [...new Set(
      cfg.requiredElements.map(e => SLOT_ALIASES[e]).filter((s): s is SlotName => !!s)
    )];
    const widgets = AVAILABLE_WIDGETS.filter(w => requiredSlots.includes(w.slot as SlotName));
    if (widgets.length > 0 && requiredSlots.length > 0) {
      return { widgets, requiredSlots };
    }
  }
  return { widgets: AVAILABLE_WIDGETS, requiredSlots: ALL_SLOTS };
};

const SLOT_LABELS: Record<SlotName, string> = { header: 'Верхняя панель', hero: 'Главная область', action: 'Главное действие', footer: 'Нижняя панель' };
const SLOT_PURPOSE: Record<SlotName, string> = {
  header: 'кто играет и его успехи',
  hero: 'то, ради чего открыли экран',
  action: 'одна крупная кнопка',
  footer: 'дополнительные кнопки',
};
// Когда подписи областей заданы конфигом, назначение описываем только позицией
const SLOT_PURPOSE_POSITION: Record<SlotName, string> = {
  header: 'сверху',
  hero: 'в центре, самое крупное',
  action: 'рядом с главной областью',
  footer: 'внизу',
};

// Миниатюра интерфейса: как эта деталь будет выглядеть на экране
const SlotPreview: React.FC<{ slot: Widget['slot'] }> = ({ slot }) => (
  <div className={`wf-preview wf-preview-${slot}`} aria-hidden="true">
    {slot === 'header' && <><i className="wf-avatar" /><i className="wf-bar" /><i className="wf-bar wf-bar-short" /></>}
    {slot === 'hero' && <i className="wf-picture" />}
    {slot === 'action' && <i className="wf-button" />}
    {slot === 'footer' && <><i /><i /><i /></>}
    {slot === 'none' && <i className="wf-cross" />}
  </div>
);

export const WireframeBuilderGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const cfg = task.wireframeConfig;
  const { widgets, requiredSlots } = resolveWireframeWidgets(task);
  const labels: Record<SlotName, string> = { ...SLOT_LABELS, ...cfg?.slotLabels };
  const purposes = cfg?.slotLabels ? SLOT_PURPOSE_POSITION : SLOT_PURPOSE;
  const screenTitle = cfg?.screenTitle ?? 'Новое приложение';
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
    // Деталь-ловушка: настоящее приложение её не содержит — объясняем почему
    if (widget.slot === 'none') { setFeedback(widget.desc); playSound('error'); return; }
    if (widget.slot !== slot) { setFeedback(`Этой детали нужна другая область. ${widget.desc}`); playSound('error'); return; }
    setSlots(prev => ({ ...prev, [slot]: widget })); setSelected(null); setFeedback('Деталь на месте! Продолжай собирать экран.'); playSound('hit');
  };
  const count = requiredSlots.filter(s => slots[s]).length;
  const launch = () => { if (finished.current || count !== requiredSlots.length) return; finished.current = true; setRunning(true); setFeedback('Приложение запущено ✓'); playSound('success'); onComplete(); };
  const slotAt = (x: number, y: number) => document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-screen-slot]')?.dataset.screenSlot as SlotName | undefined;
  return <div className="workshop-game">
    <WorkshopHeader icon={<LayoutTemplate size={26}/>} title="Студия игровых экранов" description="Собери приложение из деталей, а затем запусти его." onReset={reset}/>
    <WorkshopProgress value={count} total={requiredSlots.length} /><p className="workshop-feedback" role="status">{feedback}</p>
    <div className="screen-builder">
      <aside className="wf-rules" aria-label="Как устроен экран">
        <div className="workshop-section-title">Как устроен экран</div>
        <ul>
          {ALL_SLOTS.map(s => <li key={s}><SlotPreview slot={s} /><span><strong>{labels[s]}</strong> — {purposes[s]}</span></li>)}
        </ul>
        <p>Не все детали нужны — некоторые только мешают.</p>
      </aside>
      <section><div className="workshop-section-title">Твои детали</div><div className="widget-grid">{widgets.map(w => <button key={w.id} disabled={running || (w.slot !== 'none' && slots[w.slot]?.id === w.id)} className={`widget-card ${selected === w.id ? 'is-selected' : ''}`} aria-pressed={selected === w.id}
      onClick={() => { if (suppressClick.current === w.id) { suppressClick.current = null; return; } suppressClick.current = null; setSelected(w.id); setFeedback(w.desc); }}
      onPointerDown={e => { if (e.button !== 0) return; pointer.current = { id: w.id, x: e.clientX, y: e.clientY, moved: false }; e.currentTarget.setPointerCapture(e.pointerId); }}
      onPointerMove={e => { const p = pointer.current; if (!p || p.id !== w.id) return; if (Math.hypot(e.clientX-p.x,e.clientY-p.y)>8) p.moved = true; if (p.moved) setGhost({ id: w.id, x: e.clientX, y: e.clientY }); }}
      onPointerUp={e => { const p = pointer.current; if (p?.moved) { suppressClick.current = w.id; const slot = slotAt(e.clientX,e.clientY); if (slot) place(w.id,slot); } pointer.current = null; setGhost(null); }}
      onPointerCancel={() => { pointer.current = null; setGhost(null); }}>
      <div className="widget-art"><SlotPreview slot={w.slot} /></div><strong>{w.name}</strong><span>{w.slot !== 'none' && slots[w.slot]?.id === w.id ? 'На экране ✓' : 'Взять деталь'}</span></button>)}</div></section>
      <section className="phone-studio"><div className="studio-phone"><div className="phone-camera" /><div className={`phone-screen ${running ? 'is-running' : ''}`}><div className="wf-titlebar">{screenTitle}</div>{requiredSlots.map((slot, index) => <div key={slot} data-screen-slot={slot} className={`screen-slot slot-${slot} ${slots[slot] ? 'is-filled' : ''}`}><button className="slot-target" disabled={running} onClick={() => place(selected, slot)} aria-label={`Область ${labels[slot]}`}>{slots[slot] ? <><SlotPreview slot={slot} /><strong>{slots[slot]!.name}</strong></> : <><SlotPreview slot={slot} /><span className="slot-number">{index + 1}</span><span>{labels[slot]}</span><small>Помести деталь сюда</small></>}</button>{slots[slot] && !running && <button className="slot-remove" aria-label={`Убрать: ${slots[slot]!.name}`} onClick={() => setSlots(prev => { const next = { ...prev }; delete next[slot]; return next; })}><X size={16} /></button>}</div>)}{running && <div className="wf-launched" role="status">Приложение запущено ✓</div>}</div></div>
      <GameButton variant="primary" size="compact" className="workshop-primary" disabled={count !== requiredSlots.length || running} onClick={launch}>{running ? <><Trophy size={18} /> Экран готов!</> : <><Play size={18} /> Запустить приложение</>}</GameButton></section>
    </div>{ghost && <div className="parcel-ghost"><SlotPreview slot={widgets.find(w => w.id === ghost.id)?.slot ?? 'header'} /></div>}
  </div>;
};
