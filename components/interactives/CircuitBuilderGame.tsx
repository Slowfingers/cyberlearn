import {GameButton, WorkshopHeader, WorkshopBadge} from '../GameUI';
import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Zap, Lightbulb, CheckCircle2, Sparkles, BookOpen, X, Star, HelpCircle, ArrowRight } from 'lucide-react';

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
      ? [String(cfg?.gate ?? cfg?.targetGate)]
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

export const resolveCircuitMission = (task: Task): 'target' | 'single' | 'explore' | 'predict' =>
  task.circuitConfig?.mission ?? 'target';

const PAIR_KEY = (a: boolean, b: boolean) => `${a ? 1 : 0}${b ? 1 : 0}`;
const PREDICT_PAIRS: [boolean, boolean][] = [[false, false], [false, true], [true, false], [true, true]];

export const CircuitBuilderGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const challenges = resolveCircuitGates(task);
  const mission = resolveCircuitMission(task);
  const transition = useRef(false);
  const finished = useRef(false);
  const [locked, setLocked] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {if(timer.current) clearTimeout(timer.current);}, []);
  const [error,setError]=useState('');
  const [levelIdx, setLevelIdx] = useState(0);
  const [switchA, setSwitchA] = useState(false);
  const [switchB, setSwitchB] = useState(false);
  const [showGuide, setShowGuide] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [stars, setStars] = useState(0);
  // explore: посещённые строки таблицы; predict: текущая строка и раскрыт ли выход
  const [visited, setVisited] = useState<Set<string>>(new Set([PAIR_KEY(false, false)]));
  const [predictIdx, setPredictIdx] = useState(0);
  const [predictRevealed, setPredictRevealed] = useState(false);

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

  const predicting = mission === 'predict';
  const pair = PREDICT_PAIRS[predictIdx] ?? PREDICT_PAIRS[PREDICT_PAIRS.length - 1];
  const effA = predicting ? pair[0] : switchA;
  const effB = predicting ? pair[1] : switchB;

  const isPowered = calculateOutput(effA, effB, mode);
  const isGoalMet = mission === 'single'
    ? isPowered && effA !== effB
    : currentChallenge.isTargetMet(effA, effB);

  const missionDesc = mission === 'single'
    ? 'Зажги лампу, включив только ОДИН вход — проверь, что одного достаточно.'
    : mission === 'explore'
      ? 'Проверь все четыре сочетания входов и посмотри, когда горит лампа.'
      : predicting
        ? 'Сначала скажи, загорится ли лампа, а потом проверь.'
        : currentChallenge.targetStateDesc;

  const finishLevel = () => {
    if (finished.current) return;
    if (levelIdx + 1 < challenges.length) {
      transition.current = true;
      setLocked(true);
      timer.current = setTimeout(() => {
        setLevelIdx(prev => prev + 1);
        setSwitchA(false);
        setSwitchB(false);
        setVisited(new Set([PAIR_KEY(false, false)]));
        setPredictIdx(0);
        setPredictRevealed(false);
        transition.current = false;
        setLocked(false);
      }, 1200);
    } else {
      finished.current = true;
      playSound('success');
      setCompleted(true);
      onComplete();
    }
  };

  const applyToggle = (nextA: boolean, nextB: boolean) => {
    setSwitchA(nextA);
    setSwitchB(nextB);
    setError('');
    setVisited(prev => { const next = new Set(prev); next.add(PAIR_KEY(nextA, nextB)); return next; });
  };

  const toggleSwitchA = () => {
    if (transition.current || completed || predicting) return;
    playSound('click');
    applyToggle(!switchA, switchB);
  };

  const toggleSwitchB = () => {
    if (transition.current || completed || predicting) return;
    playSound('click');
    applyToggle(switchA, !switchB);
  };

  const checkProgress = (a: boolean, b: boolean) => {
    if(transition.current || completed)return;
    if (mission === 'single' && a && b && calculateOutput(a, b, mode)) {
      setError('Лампа горит, но включены оба входа. Оставь только один.');
      playSound('error');
      return;
    }
    if (mission === 'explore') {
      setVisited(prev => { const next = new Set(prev); next.add(PAIR_KEY(a, b)); return next; });
      if (visited.size < 4) { setError('Сначала проверь все четыре сочетания входов — щёлкай рубильники.'); playSound('error'); return; }
      setError('');
      playSound('hit');
      setStars(prev => prev + 1);
      finishLevel();
      return;
    }
    const goalMet = mission === 'single' ? calculateOutput(a, b, mode) && a !== b : currentChallenge.isTargetMet(a, b);
    if(!goalMet){setError('Выход пока не соответствует условию. Сравни входы с правилом схемы.');playSound('error');return;}
    setError('');
    playSound('hit');
    setStars(prev => prev + 1);
    finishLevel();
  };

  const predictGuess = (guess: boolean) => {
    if (completed || finished.current) return;
    setPredictRevealed(true);
    const actual = calculateOutput(pair[0], pair[1], mode);
    if (guess !== actual) {
      setError(`Не так. ${currentChallenge.rule} Попробуй ещё раз.`);
      playSound('error');
      return;
    }
    setError('');
    playSound('hit');
    setStars(prev => prev + 1);
    if (predictIdx + 1 < PREDICT_PAIRS.length) {
      setPredictIdx(prev => prev + 1);
      setPredictRevealed(false);
    } else {
      finishLevel();
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
      <WorkshopHeader icon={<Zap size={26}/>} eyebrow="Логическая схема" title={`Вентиль ${currentChallenge.nameRu}`} description={missionDesc}
        badges={<WorkshopBadge label="Уровень"><Star size={12} className="workshop-badge-star"/> {levelIdx + 1} из {challenges.length}</WorkshopBadge>}>
        <GameButton size="compact"
          onClick={() => setShowGuide(!showGuide)} aria-expanded={showGuide}
          className="workshop-guide-toggle"
        >
          <BookOpen size={14} />
          <span>Как работает правило</span>
        </GameButton>
      </WorkshopHeader>

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
        <div className="logic-workbench w-full border-2 border-slate-700 rounded-3xl p-6 shadow-2xl relative">

          {/* Circuit Components Grid */}
          <div className="logic-circuit">

            {/* 1. Battery Power Source (3 cols) */}
            <div className="logic-power"><Zap size={16} aria-hidden="true" /> Питание платы подано · входы → правило → выход</div>

            {/* 2. Logic Gate & Switches (6 cols) */}
            <div className="logic-inputs">
              {/* Switch A */}
              <div className="logic-input-row" data-powered={effA}>
                <div><strong>Вход A</strong><span>Сигнал: {effA ? '1' : '0'}</span></div>
                <GameButton size="compact" onClick={toggleSwitchA} aria-label="Рубильник A" aria-pressed={effA} disabled={completed || locked || predicting}>
                  <span className="logic-toggle" aria-hidden="true" />{effA ? '1: ВКЛ' : '0: ВЫКЛ'}
                </GameButton>
              </div>

              {/* Switch B */}
              <div className="logic-input-row" data-powered={effB}>
                <div><strong>Вход B</strong><span>Сигнал: {effB ? '1' : '0'}</span></div>
                <GameButton size="compact" onClick={toggleSwitchB} aria-label="Рубильник B" aria-pressed={effB} disabled={completed || locked || predicting}>
                  <span className="logic-toggle" aria-hidden="true" />{effB ? '1: ВКЛ' : '0: ВЫКЛ'}
                </GameButton>
              </div>
            </div>
            <div className="logic-chip" data-powered={isPowered}>
              <img src="/art/cyber-city/logic-chip.png" width={192} height={160} alt="" draggable={false} />
              <strong>{mode.toUpperCase()}</strong>
              <span>{currentChallenge.nameRu}</span>
            </div>

            {/* 3. Output Lamp (3 cols); в predict выход раскрывается только после ответа */}
            <div className="logic-output" data-powered={predicting && !predictRevealed ? false : isPowered}>
              <span>Выходной сигнал</span>
              <img src={`/art/cyber-city/energy-cell-${predicting && !predictRevealed ? 'off' : isPowered ? 'on' : 'off'}.png`} width={160} height={200} alt="" draggable={false} />
              <strong aria-live="polite">{predicting && !predictRevealed ? 'ВЫХОД = ? (СКАЖИ САМ)' : isPowered ? 'ВЫХОД = 1 (СВЕТ!)' : 'ВЫХОД = 0 (ТЕМНО)'}</strong>
            </div>

          </div>

          {/* Interactive Truth Table (Live highlights active state) */}
          <div className="mt-5 pt-4 border-t border-slate-800">
            <div className="text-xs font-bold font-mono text-slate-400 uppercase tracking-wider mb-2 flex items-center justify-between">
              <span>📊 Таблица истинности для {currentChallenge.nameRu}:</span>
              <span className="text-xs text-yellow-400">Жёлтая строка — текущее состояние цепи</span>
            </div>
            <div className="circuit-truth-grid grid grid-cols-4 gap-2 text-center text-xs font-mono">
              {truthTable.map((row, idx) => {
                const isActive = row.a === effA && row.b === effB;
                const seen = visited.has(PAIR_KEY(row.a, row.b));
                // predict: выход раскрывается только для уже решённых строк; explore: только после посещения
                const hiddenOut = predicting
                  ? !(isActive && predictRevealed) && PREDICT_PAIRS.findIndex(p => p[0] === row.a && p[1] === row.b) >= predictIdx
                  : mission === 'explore' && !seen;
                return (
                  <div
                    key={idx}
                    className={`p-2 rounded-xl border transition-all ${
                      isActive
                        ? 'bg-yellow-400/20 border-yellow-400 text-yellow-200 font-bold shadow-[0_0_15px_rgba(250,204,21,0.3)] scale-102'
                        : 'bg-slate-950/60 border-slate-800 text-slate-400'
                    }`}
                  >
                    <div className="text-xs opacity-75">
                      А={row.a ? '1' : '0'}, В={row.b ? '1' : '0'}
                    </div>
                    <div className="text-sm font-black mt-0.5">
                      👉 {hiddenOut ? '?' : row.out ? '1 (ВКЛ)' : '0 (ВЫКЛ)'}
                    </div>
                    {mission === 'explore' && <div className={`mt-0.5 text-[11px] ${seen ? 'text-emerald-400' : 'text-slate-600'}`}>{seen ? '✓ проверено' : 'ещё нет'}</div>}
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
                {predicting ? `Строка ${predictIdx + 1} из ${PREDICT_PAIRS.length}. Входы выставлены — какой будет выход?` : isGoalMet && !predicting ? 'Выход соответствует условию. Нажми «Проверить схему».' : missionDesc}
              </span>
            </div>
            {isGoalMet && !predicting && (
              <div className="flex items-center gap-1 text-emerald-400 text-xs font-bold">
                <CheckCircle2 size={16} />
                <span>Можно проверять</span>
              </div>
            )}
          </div>
          {mission === 'explore' && mode === 'and' && (effA !== effB) && (
            <p className="mt-2 text-xs text-amber-300">Подсказка: для «И» одного входа мало.</p>
          )}

        </div>
      </div>
      {predicting && !completed && (
        <div className="mt-4 flex flex-wrap gap-3 justify-center" role="group" aria-label="Твоё предсказание">
          <GameButton variant="primary" size="compact" className="min-h-[56px] min-w-[170px]" onClick={() => predictGuess(true)}>Лампа загорится (1)</GameButton>
          <GameButton variant="secondary" size="compact" className="min-h-[56px] min-w-[170px]" onClick={() => predictGuess(false)}>Лампа не загорится (0)</GameButton>
        </div>
      )}
      {!predicting && !completed && <GameButton variant="primary" size="compact" className="workshop-primary mt-4" disabled={locked} onClick={()=>checkProgress(effA,effB)}>Проверить схему</GameButton>}
      {error && <p role="alert" className="workshop-feedback workshop-feedback--error mt-3">{error}</p>}
      {completed && (
        <div role="status" className="mt-4 p-4 bg-emerald-500/15 border border-emerald-400 rounded-xl text-emerald-200 text-sm font-bold text-center">
          Схема работает! Нажми «Далее» внизу.
        </div>
      )}
    </div>
  );
};

