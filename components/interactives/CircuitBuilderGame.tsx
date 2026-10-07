import {GameButton} from '../GameUI';
import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Zap, Lightbulb, CheckCircle2, RotateCcw, Sparkles, BookOpen, X, Star, HelpCircle, ArrowRight } from 'lucide-react';

interface GateChallenge {
  id: 'and' | 'or' | 'xor' | 'nand';
  title: string;
  nameRu: string;
  rule: string;
  analogy: string;
  targetStateDesc: string;
  isTargetMet: (a: boolean, b: boolean) => boolean;
}

const CHALLENGES: GateChallenge[] = [
  {
    id: 'and',
    title: 'Уровень 1: Логический элемент «И» (AND)',
    nameRu: '«И» (AND)',
    rule: 'Ток идёт (1) ТОЛЬКО когда ОБА рубильника включены (1 и 1). Если хоть один выключен — цепь разомкнута (0).',
    analogy: 'Как вход в космический корабль: нужен ключ капитана И ключ штурмана одновременно!',
    targetStateDesc: 'Настрой входы так, чтобы лампочка загорелась.',
    isTargetMet: (a, b) => a === true && b === true
  },
  {
    id: 'or',
    title: 'Уровень 2: Логический элемент «ИЛИ» (OR)',
    nameRu: '«ИЛИ» (OR)',
    rule: 'Ток идёт (1), если включен ХОТЯ БЫ ОДИН рубильник (или оба). Лампочка не горит (0) только когда оба выключены.',
    analogy: 'Как звонок у двери дома: можно нажать кнопку у калитки ИЛИ кнопку у крыльца — звонок зазвенит!',
    targetStateDesc: 'Настрой входы так, чтобы лампочка загорелась.',
    isTargetMet: (a, b) => a || b
  },
  {
    id: 'xor',
    title: 'Уровень 3: Исключающее «ИЛИ» (XOR)',
    nameRu: '«XOR» (Сложение по модулю 2)',
    rule: 'Ток идёт (1), когда рубильники в РАЗНЫХ положениях! Если оба выключены (0,0) или оба включены (1,1) — свет гаснет (0).',
    analogy: 'Переключатель люстры в коридоре: вошёл — щёлкнул снизу (свет горит), поднялся наверх — щёлкнул вторым (свет погас)!',
    targetStateDesc: 'Настрой входы так, чтобы лампочка загорелась.',
    isTargetMet: (a, b) => (a && !b) || (!a && b)
  },
  {
    id: 'nand',
    title: 'Уровень 4: Элемент «НЕ-И» (NAND)',
    nameRu: '«NAND» (Отрицание И)',
    rule: 'Инвертор: выдаёт 1 всегда, КРОМЕ случая, когда оба рубильника включены (1,1). Основа flash-памяти в SSD и смартфонах!',
    analogy: 'Аварийный предохранитель: свет горит штатно, но если сработали ОБА датчика перегрузки — питание аварийно отключается!',
    targetStateDesc: 'Настрой входы так, чтобы лампочка погасла.',
    isTargetMet: (a, b) => a === true && b === true
  }
];

// Конфиг уровней из задачи: полный формат gates[] или краткий gate/targetGate (регистр любой)
export const resolveCircuitGates = (task: Task): GateChallenge[] => {
  const cfg = task.circuitConfig;
  const ids = cfg?.gates?.length
    ? cfg.gates.map(String)
    : (cfg?.gate ?? cfg?.targetGate) != null
      ? [String(cfg.gate ?? cfg.targetGate)]
      : [];
  const found = ids
    .map(g => CHALLENGES.find(c => c.id === g.toLowerCase()))
    .filter((c): c is GateChallenge => !!c);
  const selected = found.length > 0 ? found : CHALLENGES;
  const output = cfg?.expectedOutput ?? cfg?.targetOutput;
  return typeof output !== 'boolean' ? selected : selected.map(challenge => ({...challenge,
    targetStateDesc: output ? 'Настрой входы так, чтобы лампочка загорелась.' : 'Настрой входы так, чтобы лампочка погасла.',
    isTargetMet: (a:boolean,b:boolean) => {
      const actual = challenge.id === 'and' ? a && b : challenge.id === 'or' ? a || b : challenge.id === 'xor' ? a !== b : !(a && b);
      return actual === output;
    }
  }));
};

export const CircuitBuilderGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const challenges = resolveCircuitGates(task);
  const transition = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {if(timer.current) clearTimeout(timer.current);}, []);
  const [error,setError]=useState('');
  const [levelIdx, setLevelIdx] = useState(0);
  const [switchA, setSwitchA] = useState(false);
  const [switchB, setSwitchB] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stars, setStars] = useState(0);

  const currentChallenge = challenges[levelIdx];
  const mode = currentChallenge.id;

  const calculateOutput = (a: boolean, b: boolean, gate: 'and' | 'or' | 'xor' | 'nand') => {
    switch (gate) {
      case 'and': return a && b;
      case 'or': return a || b;
      case 'xor': return (a && !b) || (!a && b);
      case 'nand': return !(a && b);
      default: return a && b;
    }
  };

  const isPowered = calculateOutput(switchA, switchB, mode);
  const isGoalMet = currentChallenge.isTargetMet(switchA, switchB);

  const toggleSwitchA = () => {
    if (transition.current || completed) return;
    playSound('click');
    const nextA = !switchA;
    setSwitchA(nextA);
    setError('');
  };

  const toggleSwitchB = () => {
    if (transition.current || completed) return;
    playSound('click');
    const nextB = !switchB;
    setSwitchB(nextB);
    setError('');
  };

  const checkProgress = (a: boolean, b: boolean) => {
    if(transition.current || completed)return;
    if(!currentChallenge.isTargetMet(a,b)){setError('Выход пока не соответствует условию. Сравни входы с правилом схемы.');playSound('error');return;}
    setError('');
    if (currentChallenge.isTargetMet(a, b)) {
      transition.current = true;
      playSound('hit');
      setStars(prev => prev + 1);

      if (levelIdx + 1 < challenges.length) {
        timer.current = setTimeout(() => {
          setLevelIdx(prev => prev + 1);
          setSwitchA(false);
          setSwitchB(false);
          transition.current = false;
        }, 1200);
      } else {
        playSound('success');
        setCompleted(true);
        timer.current = setTimeout(() => {
          onComplete();
        }, 1800);
      }
    }
  };

  // Truth table rows
  const truthTable = [
    { a: false, b: false, out: calculateOutput(false, false, mode) },
    { a: false, b: true, out: calculateOutput(false, true, mode) },
    { a: true, b: false, out: calculateOutput(true, false, mode) },
    { a: true, b: true, out: calculateOutput(true, true, mode) },
  ];

  return (
    <div className="ui-trainer-family workshop-legacy circuit-workshop h-full flex flex-col bg-slate-950 p-4 select-none text-white overflow-y-auto">
      {/* Header Banner */}
      <div className="workshop-banner flex flex-wrap items-center justify-between bg-slate-900/90 border-2 border-yellow-500/40 p-4 rounded-2xl mb-4 shadow-lg gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0">
            ⚡
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base md:text-xl font-bold text-yellow-300">
                {currentChallenge.title}
              </h2>
            </div>
            <p className="text-xs text-slate-300">{currentChallenge.targetStateDesc}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <GameButton size="compact"
            onClick={() => setShowGuide(!showGuide)} aria-expanded={showGuide}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              showGuide
                ? 'bg-yellow-400 text-black shadow-yellow-400/30'
                : 'bg-yellow-950/80 border border-yellow-500/50 text-yellow-300 hover:bg-yellow-900/80'
            }`}
          >
            <BookOpen size={14} />
            <span>Как работает правило</span>
          </GameButton>

          <div className="flex items-center gap-1 px-3 py-1.5 bg-yellow-950/80 border border-yellow-500/40 rounded-xl text-yellow-300 font-bold text-xs font-mono">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span>Уровень {levelIdx + 1} из {challenges.length}</span>
          </div>
        </div>
      </div>

      {/* Teacher Guide Panel (Collapsible) */}
      {showGuide && (
        <div className="mb-4 bg-gradient-to-r from-yellow-950/90 via-slate-900 to-yellow-950/90 border-2 border-yellow-400/60 p-4 rounded-2xl shadow-2xl relative animate-in fade-in duration-200">
          <GameButton size="compact"
            onClick={() => setShowGuide(false)}
            className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg bg-black/40"
          >
            <X size={16} />
          </GameButton>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-yellow-400/20 text-yellow-300 rounded-xl shrink-0 mt-0.5">
              <Lightbulb size={20} />
            </div>
            <div className="space-y-2 pr-6">
              <h3 className="text-sm font-bold text-yellow-300 uppercase tracking-wide">
                Методическое пояснение: Как работает вентиль {currentChallenge.nameRu}
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                {currentChallenge.rule}
              </p>
              <div className="p-2.5 bg-black/60 rounded-xl border border-yellow-500/30 text-xs text-amber-200">
                <span className="font-bold text-white">💡 Пример из жизни: </span>
                {currentChallenge.analogy}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Main Visual Circuit Board */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-4xl mx-auto w-full gap-4">
        <div className="w-full bg-slate-900/90 border-2 border-slate-700 rounded-3xl p-6 shadow-2xl relative">

          {/* Circuit Components Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center">

            {/* 1. Battery Power Source (3 cols) */}
            <div className="md:col-span-3 flex flex-col items-center p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-2">1. Источник тока</div>
              <div className="w-16 h-24 bg-gradient-to-b from-amber-500 to-amber-700 rounded-2xl border-2 border-amber-300 flex flex-col items-center justify-between p-2 shadow-lg">
                <div className="w-6 h-2.5 bg-slate-300 rounded-t -mt-3.5 border border-slate-400"></div>
                <div className="text-xl">🔋</div>
                <div className="text-[9px] font-extrabold text-black font-mono">9V BATT</div>
              </div>
              <div className="text-[11px] text-amber-300 font-bold mt-2">Питание подано</div>
            </div>

            {/* 2. Logic Gate & Switches (6 cols) */}
            <div className="md:col-span-6 flex flex-col gap-3">
              <div className="p-2.5 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <span className="text-slate-400 font-mono">Вентиль на плате:</span>
                <span className="px-2.5 py-0.5 bg-yellow-400/20 text-yellow-300 border border-yellow-400/40 rounded-lg font-bold font-mono">
                  {currentChallenge.nameRu}
                </span>
              </div>

              {/* Switch A */}
              <div className={`p-3.5 rounded-xl border-2 flex items-center justify-between transition-all ${
                switchA ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-slate-950 border-slate-800'
              }`}>
                <div>
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <span>🔘 Рубильник А (Вход 1)</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Сигнал: <span className={switchA ? 'text-cyan-300 font-bold' : 'text-slate-500'}>{switchA ? '1 (ВКЛ)' : '0 (ВЫКЛ)'}</span>
                  </div>
                </div>
                <GameButton size="compact"
                  onClick={toggleSwitchA} aria-label="Рубильник A" aria-pressed={switchA} disabled={completed}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                    switchA ? 'bg-cyan-400 text-black shadow-lg scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {switchA ? '1: ВКЛ' : '0: ВЫКЛ'}
                </GameButton>
              </div>

              {/* Switch B */}
              <div className={`p-3.5 rounded-xl border-2 flex items-center justify-between transition-all ${
                switchB ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]' : 'bg-slate-950 border-slate-800'
              }`}>
                <div>
                  <div className="font-bold text-xs flex items-center gap-1.5">
                    <span>🚪 Рубильник B (Вход 2)</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono">
                    Сигнал: <span className={switchB ? 'text-cyan-300 font-bold' : 'text-slate-500'}>{switchB ? '1 (ВКЛ)' : '0 (ВЫКЛ)'}</span>
                  </div>
                </div>
                <GameButton size="compact"
                  onClick={toggleSwitchB} aria-label="Рубильник B" aria-pressed={switchB} disabled={completed}
                  className={`px-4 py-2 rounded-xl text-xs font-bold font-mono transition-all ${
                    switchB ? 'bg-cyan-400 text-black shadow-lg scale-105' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                  }`}
                >
                  {switchB ? '1: ВКЛ' : '0: ВЫКЛ'}
                </GameButton>
              </div>
            </div>

            {/* 3. Output Lamp (3 cols) */}
            <div className="md:col-span-3 flex flex-col items-center p-4 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-[11px] uppercase font-bold text-slate-400 mb-2">3. Выходной сигнал</div>
              <div className={`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
                isPowered
                  ? 'bg-yellow-400/25 border-4 border-yellow-300 shadow-[0_0_40px_rgba(250,204,21,0.8)] animate-pulse'
                  : 'bg-slate-900 border-2 border-slate-800'
              }`}>
                <Lightbulb size={48} className={isPowered ? 'text-yellow-300 fill-yellow-300 animate-bounce' : 'text-slate-700'} />
              </div>
              <div className={`text-xs font-bold mt-2 font-mono ${isPowered ? 'text-yellow-300' : 'text-slate-500'}`}>
                {isPowered ? 'ВЫХОД = 1 (СВЕТ!)' : 'ВЫХОД = 0 (ТЕМНО)'}
              </div>
            </div>

          </div>

          {/* Interactive Truth Table (Live highlights active state) */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <div className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>📊 Таблица истинности для {currentChallenge.nameRu}:</span>
              <span className="text-[10px] text-yellow-400">Жёлтая строка — текущее состояние цепи</span>
            </div>
            <div className="circuit-truth-grid grid grid-cols-4 gap-2 text-center text-xs font-mono">
              {truthTable.map((row, idx) => {
                const isActive = row.a === switchA && row.b === switchB;
                return (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-yellow-400/20 border-yellow-400 text-yellow-200 font-bold shadow-[0_0_15px_rgba(250,204,21,0.3)] scale-102'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-[10px] opacity-75">
                      А={row.a ? '1' : '0'}, В={row.b ? '1' : '0'}
                    </div>
                    <div className="text-sm font-black mt-0.5">
                      👉 {row.out ? '1 (ВКЛ)' : '0 (ВЫКЛ)'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Status Message */}
          <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs">
              <Zap size={16} className={isPowered ? 'text-yellow-400 fill-yellow-400' : 'text-slate-600'} />
              <span className={isPowered ? 'text-yellow-300 font-bold' : 'text-slate-400'}>
                {isGoalMet ? 'Выход соответствует условию. Нажми «Проверить схему».' : currentChallenge.targetStateDesc}
              </span>
            </div>
            {isGoalMet && (
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold animate-bounce">
                <CheckCircle2 size={16} />
                <span>ОТЛИЧНО!</span>
              </div>
            )}
          </div>

        </div>
      </div>
      {!completed && <GameButton variant="primary" size="compact" className="workshop-primary mt-4" disabled={transition.current} onClick={()=>checkProgress(switchA,switchB)}>Проверить схему</GameButton>}
      {error && <p role="alert" className="text-rose-300 mt-3">{error}</p>}
    </div>
  );
};

