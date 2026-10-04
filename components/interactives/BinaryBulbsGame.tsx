import React, { useState, useMemo } from 'react';
import { WorkshopArt } from './WorkshopArt';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Lightbulb, CheckCircle2, Sparkles, Star, Trophy, RotateCcw, HelpCircle, BookOpen, X } from 'lucide-react';

const ROUNDS = [
  { target: 3, formula: '2 + 1', hint: 'Включи лампочки 2 и 1' },
  { target: 5, formula: '4 + 1', hint: 'Включи лампочки 4 и 1' },
  { target: 9, formula: '8 + 1', hint: 'Включи лампочки 8 и 1' },
  { target: 12, formula: '8 + 4', hint: 'Включи лампочки 8 и 4' },
  { target: 15, formula: '8 + 4 + 2 + 1', hint: 'Зажги ВСЕ 4 лампочки сразу!' },
];

export const BinaryBulbsGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const rounds: { target: number; formula: string; hint: string }[] =
    task.binaryConfig?.rounds?.length ? task.binaryConfig.rounds : ROUNDS;
  const showHex = task.binaryConfig?.showHex === true;
  const [currentRoundIdx, setCurrentRoundIdx] = useState(0);
  const [bits, setBits] = useState<[number, number, number, number]>([0, 0, 0, 0]); // weights: 8, 4, 2, 1
  const [stars, setStars] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [showGuide, setShowGuide] = useState(false);

  const currentRound = rounds[currentRoundIdx];
  const toHex = (n: number) => n.toString(16).toUpperCase();
  const weights = [8, 4, 2, 1];

  const currentSum = useMemo(() => {
    return bits[0] * 8 + bits[1] * 4 + bits[2] * 2 + bits[3] * 1;
  }, [bits]);

  const toggleBit = (index: number) => {
    playSound('click');
    const newBits = [...bits] as [number, number, number, number];
    newBits[index] = newBits[index] === 1 ? 0 : 1;
    setBits(newBits);

    const newSum = newBits[0] * 8 + newBits[1] * 4 + newBits[2] * 2 + newBits[3] * 1;
    if (newSum === currentRound.target) {
      playSound('hit');
      setStars(prev => prev + 1);

      if (currentRoundIdx + 1 < rounds.length) {
        setTimeout(() => {
          setCurrentRoundIdx(prev => prev + 1);
          setBits([0, 0, 0, 0]);
        }, 1000);
      } else {
        playSound('success');
        setCompleted(true);
        setTimeout(() => {
          onComplete();
        }, 1500);
      }
    }
  };

  const isMatched = currentSum === currentRound.target;

  return (
    <div className="workshop-legacy binary-workshop h-full flex flex-col bg-slate-950 p-4 select-none text-white overflow-y-auto">
      {/* Header Banner */}
      <div className="workshop-banner flex flex-wrap items-center justify-between bg-slate-900/90 border-2 border-amber-500/40 p-3 md:p-4 rounded-2xl mb-4 shadow-lg gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            💡
          </div>
          <div>
            <h2 className="text-base md:text-xl font-bold text-amber-300">Двоичный шифратор: Считаем как компьютер!</h2>
            <p className="text-xs text-slate-300">Включай лампочки (1) и выключай (0), чтобы собрать число</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Guide Button */}
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              showGuide
                ? 'bg-amber-400 text-black shadow-amber-400/30'
                : 'bg-amber-950/80 border border-amber-500/50 text-amber-300 hover:bg-amber-900/80'
            }`}
          >
            <BookOpen size={14} />
            <span>Шпаргалка Учителя</span>
          </button>

          <div className="flex items-center gap-1 px-3 py-1.5 bg-amber-950/80 border border-amber-500/40 rounded-xl text-amber-300 font-bold text-xs">
            <Star size={14} className="fill-amber-400 text-amber-400" />
            <span>Раунд {currentRoundIdx + 1} из {rounds.length}</span>
          </div>
        </div>
      </div>

      {/* Teacher Guide Panel (Collapsible) */}
      {showGuide && (
        <div className="mb-4 bg-gradient-to-r from-amber-950/90 via-slate-900 to-amber-950/90 border-2 border-amber-400/60 p-4 rounded-2xl shadow-2xl relative">
          <button 
            onClick={() => setShowGuide(false)}
            className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg bg-black/40"
          >
            <X size={16} />
          </button>

          <div className="flex items-center gap-2 font-bold text-amber-300 text-sm mb-2">
            <span>🎓</span> Объяснение от Учителя: Как работает двоичный код?
          </div>

          <p className="text-xs text-slate-300 mb-3 leading-relaxed">
            Внутри микропроцессора нет пальцев. Но есть крошечные переключатели — транзисторы! 
            Когда выключатель выключен — это <strong className="text-white">0</strong>. Когда включен и течет ток — это <strong className="text-amber-400">1</strong>.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs mb-3">
            <div className="p-2 bg-slate-900/80 border border-amber-500/30 rounded-lg text-center">
              <span className="font-bold text-amber-400 block text-sm">+8</span>
              <span className="text-[10px] text-slate-400">Лампочка №4</span>
            </div>
            <div className="p-2 bg-slate-900/80 border border-amber-500/30 rounded-lg text-center">
              <span className="font-bold text-amber-400 block text-sm">+4</span>
              <span className="text-[10px] text-slate-400">Лампочка №3</span>
            </div>
            <div className="p-2 bg-slate-900/80 border border-amber-500/30 rounded-lg text-center">
              <span className="font-bold text-amber-400 block text-sm">+2</span>
              <span className="text-[10px] text-slate-400">Лампочка №2</span>
            </div>
            <div className="p-2 bg-slate-900/80 border border-amber-500/30 rounded-lg text-center">
              <span className="font-bold text-amber-400 block text-sm">+1</span>
              <span className="text-[10px] text-slate-400">Лампочка №1</span>
            </div>
          </div>

          <div className="p-2.5 bg-black/40 rounded-xl text-[11px] text-amber-200/90 font-mono space-y-1 border border-amber-500/20">
            <div>💡 <strong>Пример:</strong> Как получить число <strong>5</strong>? ➔ 5 = 4 + 1 ➔ включаем лампы <strong>+4</strong> и <strong>+1</strong> (код 0101).</div>
            <div>💡 <strong>Пример:</strong> Как получить число <strong>12</strong>? ➔ 12 = 8 + 4 ➔ включаем лампы <strong>+8</strong> и <strong>+4</strong> (код 1100).</div>
          </div>
        </div>
      )}

      {/* Target Mission Card */}
      <div className="bg-gradient-to-r from-amber-950/40 via-purple-950/30 to-amber-950/40 border-2 border-amber-500/50 p-4 md:p-5 rounded-2xl text-center mb-6 shadow-[0_0_25px_rgba(245,158,11,0.15)] relative overflow-hidden">
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
        <div className="text-xs text-amber-200 mt-2 font-mono bg-black/40 inline-block px-3 py-1 rounded-full border border-amber-500/30">
          💡 Подсказка: {currentRound.target} = {currentRound.formula}
        </div>
      </div>

      {/* 4 Interactive Bulbs */}
      <div className="flex-1 flex flex-col justify-center items-center max-w-2xl mx-auto w-full">
        <div className="binary-switch-grid grid grid-cols-4 gap-2.5 md:gap-6 w-full">
          {weights.map((weight, idx) => {
            const isOn = bits[idx] === 1;
            return (
              <div 
                key={weight} 
                className={`flex flex-col items-center p-2.5 md:p-5 rounded-2xl border-2 transition-all duration-300 ${
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
                <div className={`p-3 md:p-4 rounded-full mb-3 transition-all duration-300 ${
                  isOn 
                    ? 'bg-amber-400/30 text-amber-300 drop-shadow-[0_0_12px_rgba(245,158,11,0.25)]'
                    : 'bg-slate-800/80 text-slate-600'
                }`}>
                  <WorkshopArt kind={isOn ? 'bulb-on' : 'bulb-off'} className="workshop-bulb" />
                </div>

                {/* Bit Value Display */}
                <div className={`text-xl md:text-3xl font-mono font-extrabold mb-3 ${
                  isOn ? 'text-amber-400' : 'text-slate-500'
                }`}>
                  {isOn ? '1' : '0'}
                </div>

                {/* Interactive Toggle Button */}
                <button
                  onClick={() => toggleBit(idx)}
                  className={`w-full py-2 md:py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all transform active:scale-95 shadow-md flex items-center justify-center gap-1 ${
                    isOn
                      ? 'bg-amber-500 hover:bg-amber-400 text-black shadow-amber-500/20'
                      : 'bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700'
                  }`}
                >
                  {isOn ? 'ВКЛ' : 'ВЫКЛ'}
                </button>
              </div>
            );
          })}
        </div>

        {/* Real-time Math Formula & Status */}
        <div className="mt-6 w-full bg-slate-900 border border-slate-800 p-4 rounded-2xl flex flex-col md:flex-row items-center justify-between gap-4 shadow-lg">
          <div className="flex items-center gap-2 text-sm md:text-base font-mono">
            <span className="text-slate-400">Сумма:</span>
            <span className="font-bold text-cyan-300">
              {bits[0] * 8} + {bits[1] * 4} + {bits[2] * 2} + {bits[3] * 1}
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

