import React, { useState } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Smartphone, Sparkles, CheckCircle2, RotateCcw, Play, Star, Plus, Trash2 } from 'lucide-react';

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

export const WireframeBuilderGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const { widgets, requiredSlots } = resolveWireframeWidgets(task);
  const [screenSlots, setScreenSlots] = useState<{
    header: Widget | null;
    hero: Widget | null;
    action: Widget | null;
    footer: Widget | null;
  }>({
    header: null,
    hero: null,
    action: null,
    footer: null,
  });

  const [isRunning, setIsRunning] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handleAddWidget = (widget: Widget) => {
    playSound('hit');
    setScreenSlots(prev => ({
      ...prev,
      [widget.slot]: widget,
    }));
  };

  const handleRemoveWidget = (slot: 'header' | 'hero' | 'action' | 'footer') => {
    playSound('click');
    setScreenSlots(prev => ({
      ...prev,
      [slot]: null,
    }));
  };

  const isFull = requiredSlots.every(s => !!screenSlots[s]);

  const handleLaunch = () => {
    playSound('success');
    setIsRunning(true);
    setIsCompleted(true);
    setTimeout(() => {
      onComplete();
    }, 1800);
  };

  const handleReset = () => {
    setScreenSlots({ header: null, hero: null, action: null, footer: null });
    setIsRunning(false);
    setIsCompleted(false);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 p-4 select-none text-white overflow-y-auto">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-slate-900/90 border-2 border-indigo-500/40 p-4 rounded-2xl mb-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl">
            📱
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-indigo-300">Конструктор приложений: Собери свой экран!</h2>
            <p className="text-xs text-slate-300">Выбирай детали слева и заполни все 4 зоны на планшете</p>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"
          title="Очистить экран"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6 flex-1 items-start">
        {/* Left: Palette of Blocks (7 cols) */}
        <div className="md:col-span-6 flex flex-col gap-3">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-400 flex items-center justify-between">
            <span>Элементы для интерфейса:</span>
            <span className="text-[10px] text-slate-400">Нажми «+ Добавить»</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {widgets.map((w) => {
              const isAdded = screenSlots[w.slot]?.id === w.id;
              return (
                <div
                  key={w.id}
                  className={`p-3 rounded-xl border transition-all ${
                    isAdded 
                      ? 'bg-indigo-950/40 border-indigo-500/60 opacity-60' 
                      : 'bg-slate-900/80 border-slate-800 hover:border-indigo-400/80'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-2xl">{w.icon}</span>
                    <div className="font-bold text-xs text-white truncate">{w.name}</div>
                  </div>
                  <div className="text-[10px] text-slate-400 mb-2 leading-relaxed">{w.desc}</div>
                  <button
                    onClick={() => handleAddWidget(w)}
                    disabled={isAdded}
                    className={`w-full py-1.5 rounded-lg text-xs font-bold uppercase flex items-center justify-center gap-1 transition-all ${
                      isAdded
                        ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                        : 'bg-indigo-600 hover:bg-indigo-500 text-white shadow-md active:scale-95'
                    }`}
                  >
                    {isAdded ? 'Уже на экране' : <><Plus size={14}/> Добавить на экран</>}
                  </button>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Phone Frame Preview (5 cols) */}
        <div className="md:col-span-6 flex flex-col items-center justify-center">
          <div className="w-[280px] bg-slate-900 border-4 border-slate-700 rounded-[36px] p-3 shadow-[0_0_40px_rgba(99,102,241,0.2)] relative">
            {/* Phone Notch */}
            <div className="w-24 h-4 bg-slate-800 rounded-full mx-auto mb-3 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-slate-950 mr-2"></div>
              <div className="w-8 h-1 rounded-full bg-slate-900"></div>
            </div>

            {/* App Screen Content */}
            <div className={`h-[380px] rounded-2xl p-2.5 flex flex-col gap-2 transition-all ${
              isRunning ? 'bg-gradient-to-b from-indigo-900 via-purple-900 to-black' : 'bg-slate-950'
            }`}>
              {/* Slot 1: Header */}
              <div className={`h-12 rounded-xl border-2 border-dashed flex items-center justify-between px-3 transition-all ${
                screenSlots.header 
                  ? 'bg-indigo-950/60 border-indigo-400 text-white' 
                  : 'border-slate-800 text-slate-600'
              }`}>
                {screenSlots.header ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{screenSlots.header.icon}</span>
                      <span className="text-[11px] font-bold">{screenSlots.header.name}</span>
                    </div>
                    {!isRunning && (
                      <button onClick={() => handleRemoveWidget('header')} className="text-rose-400 hover:text-white p-1">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </>
                ) : (
                  <span className="text-[10px] uppercase font-bold mx-auto text-slate-500">1. Зона Шапки (Header)</span>
                )}
              </div>

              {/* Slot 2: Hero */}
              <div className={`flex-1 rounded-xl border-2 border-dashed flex flex-col items-center justify-center p-2 text-center transition-all ${
                screenSlots.hero 
                  ? 'bg-indigo-950/40 border-indigo-400 text-white' 
                  : 'border-slate-800 text-slate-600'
              }`}>
                {screenSlots.hero ? (
                  <>
                    <span className={`text-4xl mb-1 ${isRunning ? 'animate-bounce' : ''}`}>{screenSlots.hero.icon}</span>
                    <span className="text-xs font-bold">{screenSlots.hero.name}</span>
                    {!isRunning && (
                      <button onClick={() => handleRemoveWidget('hero')} className="text-rose-400 hover:text-white p-1 mt-1">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </>
                ) : (
                  <span className="text-[10px] uppercase font-bold text-slate-500">2. Главный баннер (Hero)</span>
                )}
              </div>

              {/* Slot 3: Action */}
              <div className={`h-14 rounded-xl border-2 border-dashed flex items-center justify-between px-3 transition-all ${
                screenSlots.action 
                  ? 'bg-emerald-950/70 border-emerald-400 text-white' 
                  : 'border-slate-800 text-slate-600'
              }`}>
                {screenSlots.action ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">{screenSlots.action.icon}</span>
                      <span className="text-xs font-bold text-emerald-300">{screenSlots.action.name}</span>
                    </div>
                    {!isRunning && (
                      <button onClick={() => handleRemoveWidget('action')} className="text-rose-400 hover:text-white p-1">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </>
                ) : (
                  <span className="text-[10px] uppercase font-bold mx-auto text-slate-500">3. Кнопка Действия (Action)</span>
                )}
              </div>

              {/* Slot 4: Footer */}
              <div className={`h-12 rounded-xl border-2 border-dashed flex items-center justify-between px-3 transition-all ${
                screenSlots.footer 
                  ? 'bg-amber-950/60 border-amber-400 text-white' 
                  : 'border-slate-800 text-slate-600'
              }`}>
                {screenSlots.footer ? (
                  <>
                    <div className="flex items-center gap-2">
                      <span className="text-xl">{screenSlots.footer.icon}</span>
                      <span className="text-[11px] font-bold text-amber-300">{screenSlots.footer.name}</span>
                    </div>
                    {!isRunning && (
                      <button onClick={() => handleRemoveWidget('footer')} className="text-rose-400 hover:text-white p-1">
                        <Trash2 size={14} />
                      </button>
                    )}
                  </>
                ) : (
                  <span className="text-[10px] uppercase font-bold mx-auto text-slate-500">4. Подвал (Footer)</span>
                )}
              </div>
            </div>

            {/* Launch Button */}
            <div className="mt-4">
              <button
                onClick={handleLaunch}
                disabled={!isFull || isRunning}
                className={`w-full py-3 rounded-2xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 transition-all transform active:scale-95 ${
                  isFull && !isRunning
                    ? 'bg-emerald-500 hover:bg-emerald-400 text-black shadow-lg shadow-emerald-500/30'
                    : isRunning
                    ? 'bg-indigo-600 text-white animate-pulse'
                    : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                }`}
              >
                {isRunning ? (
                  <>
                    <Sparkles size={16} /> ПРИЛОЖЕНИЕ РАБОТАЕТ!
                  </>
                ) : (
                  <>
                    <Play size={16} /> ЗАПУСТИТЬ ПРИЛОЖЕНИЕ ({requiredSlots.filter(s => screenSlots[s]).length}/{requiredSlots.length})
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
