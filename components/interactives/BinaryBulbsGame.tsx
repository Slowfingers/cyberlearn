import {GameButton, WorkshopHeader, WorkshopBadge} from '../GameUI';
import React, { useState, useMemo, useRef, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Lightbulb, CheckCircle2, Sparkles, Star, Trophy, HelpCircle, BookOpen, X } from 'lucide-react';

const ROUNDS = [
  { target: 3, formula: '2 + 1', hint: 'Включи лампочки 2 и 1' },
  { target: 5, formula: '4 + 1', hint: 'Включи лампочки 4 и 1' },
  { target: 9, formula: '8 + 1', hint: 'Включи лампочки 8 и 1' },
  { target: 12, formula: '8 + 4', hint: 'Включи лампочки 8 и 4' },
  { target: 15, formula: '8 + 4 + 2 + 1', hint: 'Зажги ВСЕ 4 лампочки сразу!' },
];

export function getBinaryScenario(task: Task) {
  const bitCount = task.binaryConfig?.bitsCount ?? 4;
  const weights = Array.from({length: bitCount}, (_, i) => 2 ** (bitCount - i - 1));
  const rounds: {target:number}[] = task.binaryConfig?.rounds?.length ? task.binaryConfig.rounds
    : task.binaryConfig?.targetNumber !== undefined ? [{target:task.binaryConfig.targetNumber}] : ROUNDS;
  return {weights, rounds};
}
export const BinaryBulbsGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const {weights, rounds}=getBinaryScenario(task);
  const transition = useRef(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if(timer.current) clearTimeout(timer.current); }, []);
  const showHex = task.binaryConfig?.showHex === true;
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [bits, setBits] = useState<number[]>(weights.map(() => 0)); // weights: 8, 4, 2, 1
  const [stars, setStars] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const currentRound = rounds[currentRoundIdx];
  const toHex = (n: number) => n.toString(16).toUpperCase();


  const currentSum = useMemo(() => {
    return bits.reduce((sum, bit, i) => sum + bit * weights[i], 0);
  }, [bits]);

  const toggleBit = (index: number) => {
    if (transition.current || completed) return;
    playSound('click');
    const newBits = [...bits];
    newBits[index] = newBits[index] === 1 ? 0 : 1;
    setBits(newBits);

    const newSum = newBits.reduce((sum, bit, i) => sum + bit * weights[i], 0);
    if (newSum === currentRound.target) {
      transition.current = true;
      playSound('hit');
      setStars(prev => prev + 1);

      if (currentRoundIdx + 1 < rounds.length) {
        timer.current = setTimeout(() => {
          setCurrentRoundIdx(prev => prev + 1);
          setBits(weights.map(() => 0));
          transition.current = false;
        }, 1000);
      } else {
        playSound('success');
        setCompleted(true);
        timer.current = setTimeout(() => {
          onComplete();
        }, 1500);
      }
    }
  };

  const isMatched = currentSum === currentRound.target;

  return (
    <div className="ui-trainer-family workshop-legacy binary-workshop h-full flex flex-col bg-slate-950 p-4 select-none text-white overflow-y-auto">
      {/* Header Banner */}
      <WorkshopHeader icon={<Lightbulb size={26}/>} title="Пульт двоичной энергии" description="Включай лампочки (1) и выключай (0), чтобы собрать число"
        badges={<WorkshopBadge label="Раунд"><Star size={12} className="workshop-badge-star"/> {currentRoundIdx + 1} из {rounds.length}</WorkshopBadge>}>
        <GameButton size="compact"
          onClick={() => setShowGuide(!showGuide)} aria-expanded={showGuide}
          className="workshop-guide-toggle"
        >
          <BookOpen size={14} />
          <span>Шпаргалка Учителя</span>
        </GameButton>
      </WorkshopHeader>

      {/* Teacher Guide Panel (Collapsible) */}
      {showGuide && (
        <div className="mb-4 bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 border-2 border-amber-400/60 p-4 rounded-2xl shadow-2xl relative">
          <GameButton size="compact"
            onClick={() => setShowGuide(false)}
            className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg bg-black/40"
          >
            <X size={16} />
          </GameButton>

          <div className="flex items-center gap-2 font-bold text-amber-300 text-sm mb-2">
            <span>🎓</span> Объяснение от Учителя: Как работает двоичный код?
          </div>

          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Внутри микропроцессора нет пальцев. Но есть крошечные переключатели — транзисторы!
            Когда выключатель выключен — это <strong className="text-white">0</strong>. Когда включен и течет ток — это <strong className="text-amber-400">1</strong>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-xs mb-3">
            {weights.map((weight, i) => <div key={weight} className="p-2 bg-slate-900/80 border border-amber-500/30 rounded-lg text-center">
              <span className="font-bold text-amber-400 block text-sm">+{weight}</span>
              <span className="text-xs text-slate-400">Разряд {weights.length-i}</span>
            </div>)}
          </div>

          <div className="p-2.5 bg-black/40 rounded-xl text-xs text-amber-200/90 font-mono space-y-1 border border-amber-500/20">
            <div>💡 <strong>Пример:</strong> Как получить число <strong>5</strong>? ➔ 5 = 4 + 1 ➔ включаем лампы <strong>+4</strong> и <strong>+1</strong> (код 0101).</div>
            <div>💡 <strong>Пример:</strong> Как получить число <strong>12</strong>? ➔ 12 = 8 + 4 ➔ включаем лампы <strong>+8</strong> и <strong>+4</strong> (код 1100).</div>
          </div>
        </div>
      )}

      {/* Target Mission Card */}
      <div className="binary-mission bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-amber-950/40 border-2 border-amber-500/50 p-4 md:p-5 rounded-2xl text-center mb-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] relative overflow-hidden">
        <div className="text-xs uppercase tracking-widest text-amber-400 font-bold mb-1">ТВОЯ ЗАДАЧА:</div>
        <div className="binary-target text-2xl md:text-4xl font-extrabold text-white flex items-center justify-center gap-3">
          <span>Собери число:</span>
          <span className="px-4 py-1 bg-amber-500 text-black rounded-2xl shadow-lg transform scale-110">
            {currentRound.target}
          </span>
          {showHex && (
            <span className="px-3 py-1 bg-cyan-500 text-black rounded-2xl shadow-lg font-mono" title="Шестнадцатеричная цифра">
              = {toHex(currentRound.target)}₁₆
            </span>
          )}
        </div>
      </div>

      {/* 4 Interactive Bulbs */}
      <div className="energy-console flex-1 flex flex-col justify-center items-center max-w-4xl mx-auto w-full">
        <div className="console-readout" aria-live="polite">
          <div><span>Двоичный код</span><strong>{bits.join('')}</strong></div>
          <div data-matched={isMatched}><span>Сейчас на пульте</span><strong data-current-sum>{currentSum}</strong></div>
        </div>
        <div className="binary-switch-grid energy-cell-grid w-full">
          {weights.map((weight, idx) => {
            const isOn = bits[idx] === 1;
            return (
              <div
                key={weight}
                data-powered={isOn}
                className={`energy-cell flex flex-col items-center p-2.5 md:p-5 rounded-2xl border-2 transition-all duration-300 ${
                  isOn
                    ? 'bg-amber-500/15 border-amber-400 shadow-[0_0_30px_rgba(245,158,11,0.3)] scale-105'
                    : 'bg-slate-900/60 border-slate-800 opacity-80'
                }`}
              >
                {/* Weight Tag */}
                <div className={`text-xs md:text-sm font-bold uppercase mb-2 px-2 py-0.5 rounded-full ${
                  isOn ? 'bg-amber-400 text-black' : 'bg-slate-800 text-slate-400'
                }`}>
                  +{weight}
                </div>

                {/* Lightbulb Visual */}
                <div className={`energy-cell-art transition-all duration-300 ${
                  isOn
                    ? 'bg-amber-400/30 text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-800/80 text-slate-600'
                }`}>
                  <img src={`/art/cyber-city/energy-cell-${isOn ? 'on' : 'off'}.png`} width={160} height={200} alt="" draggable={false} />
                </div>

                {/* Bit Value Display */}
                <div className={`text-xl md:text-3xl font-mono font-extrabold mb-3 ${
                  isOn ? 'text-amber-400' : 'text-slate-500'
                }`}>
                  {isOn ? '1' : '0'}
                </div>

                {/* Interactive Toggle Button */}
                <GameButton size="compact"
                  onClick={() => toggleBit(idx)}
                  aria-label={`Лампочка с весом ${weight}`} aria-pressed={isOn} disabled={completed || transition.current}
                  className={`w-full py-2 md:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-1 ${
                    isOn
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isOn ? 'ВКЛ' : 'ВЫКЛ'}
                </GameButton>
              </div>
            );
          })}
        </div>

        {/* Real-time Math Formula & Status */}
        <div className="mt-6 w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="energy-formula flex items-center gap-2 text-sm md:text-base font-mono">
            <span className="text-slate-400">Сумма:</span>
            <span className="font-bold text-cyan-300">
              {bits.map((bit, i) => bit * weights[i]).join(' + ')}
            </span>
            <span className="text-slate-400">=</span>
            <span className={`text-xl font-extrabold px-3 py-1 rounded-xl transition-all ${
              isMatched ? 'bg-emerald-500 text-black animate-bounce' : 'bg-slate-800 text-amber-300'
            }`}>
              {currentSum}
            </span>
            {showHex && (
              <span className="font-bold text-cyan-300" title="То же число в шестнадцатеричной системе">
                (HEX {toHex(currentSum)})
              </span>
            )}
          </div>

          <div>
            {isMatched ? (
              <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm bg-emerald-950/60 px-4 py-2 rounded-xl border border-emerald-500/40">
                <CheckCircle2 size={18} />
                <span>ТОЧНО В ЦЕЛЬ! Переходим дальше... 🎉</span>
              </div>
            ) : (
              <div className="text-xs text-amber-300/90 font-medium">
                {currentSum < currentRound.target
                  ? `Маловато (${currentSum} < ${currentRound.target}). Включи ещё лампочку! ⬆️`
                  : `Многовато (${currentSum} > ${currentRound.target}). Выключи лишнюю лампу! ⬇️`}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
