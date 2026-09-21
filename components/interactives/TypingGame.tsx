import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Keyboard, Zap, RotateCcw, CheckCircle, AlertTriangle } from 'lucide-react';

interface TypingGameProps {
  task: Task;
  onComplete: () => void;
}

export const TypingGame: React.FC<TypingGameProps> = ({ task, onComplete }) => {
  const targetText = task.typingConfig?.targetText || task.typingData?.text || 'for i in range(10): print({"status": "active", "id": i})';
  const [input, setInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(100);
  const [mistakes, setMistakes] = useState(0);
  const [completed, setCompleted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    resetGame();
  }, [task.id]);

  const resetGame = () => {
    setInput('');
    setStartTime(null);
    setWpm(0);
    setAccuracy(100);
    setMistakes(0);
    setCompleted(false);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (completed) return;
    const val = e.target.value;
    
    if (!startTime) {
      setStartTime(Date.now());
    }

    // Check if new character is a mistake
    if (val.length > input.length) {
      const charIndex = val.length - 1;
      if (charIndex < targetText.length && val[charIndex] !== targetText[charIndex]) {
        playSound('error');
        setMistakes(m => m + 1);
      } else {
        playSound('click');
      }
    }

    setInput(val);

    // Calculate accuracy
    let errCount = 0;
    for (let i = 0; i < val.length; i++) {
      if (val[i] !== targetText[i]) errCount++;
    }
    const acc = val.length > 0 ? Math.max(0, Math.round(((val.length - errCount) / val.length) * 100)) : 100;
    setAccuracy(acc);

    // Calculate WPM
    if (startTime) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      if (elapsedMinutes > 0) {
        const words = val.length / 5;
        setWpm(Math.round(words / elapsedMinutes));
      }
    }

    // Completion condition
    if (val === targetText) {
      setCompleted(true);
      playSound('success');
      onComplete();
    }
  };

  const keyboardRows = [
    ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', '{', '}'],
    ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', ':', '"'],
    ['Z', 'X', 'C', 'V', 'B', 'N', 'M', '<', '>', '?'],
    ['(', ')', '[', ']', '=', '+', '-', ';', '/', 'SPACE']
  ];

  const nextExpectedChar = input.length < targetText.length ? targetText[input.length] : '';

  return (
    <div className="flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto">
      {/* HUD Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-black/70 border border-cyber-neonBlue/30 rounded-xl mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-cyber-neonBlue/20 text-cyber-neonBlue border border-cyber-neonBlue/40">
            <Keyboard size={22} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">ТРЕНАЖЕР СКОРОСТИ КОДЕРА</div>
            <h2 className="text-base md:text-lg font-bold text-white">Спецсимволы и Синтаксис</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-center">
            <div className="text-[9px] font-mono text-gray-400">СКОРОСТЬ (WPM)</div>
            <div className="text-lg font-bold font-mono text-cyber-neonGreen">{wpm}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-center">
            <div className="text-[9px] font-mono text-gray-400">ТОЧНОСТЬ</div>
            <div className="text-lg font-bold font-mono text-cyber-neonYellow">{accuracy}%</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-center">
            <div className="text-[9px] font-mono text-gray-400">ОШИБКИ</div>
            <div className="text-lg font-bold font-mono text-red-400">{mistakes}</div>
          </div>
          <button
            onClick={resetGame}
            className="p-2.5 bg-gray-900 hover:bg-gray-800 text-gray-400 hover:text-white border border-gray-800 rounded-lg transition-colors"
            title="Перезапустить"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* Target Text Terminal Display */}
      <div className="bg-black border border-cyber-neonBlue/40 rounded-xl p-5 mb-6 shadow-[0_0_20px_rgba(0,243,255,0.05)] relative">
        <div className="text-[10px] font-mono text-cyber-neonBlue uppercase mb-2 flex items-center justify-between">
          <span>// ТЕКСТ ДЛЯ НАБОРА (СИМВОЛЫ КОДЕРА)</span>
          <span className="text-gray-400">{input.length} / {targetText.length} символов</span>
        </div>
        
        <div className="font-mono text-base md:text-lg leading-relaxed tracking-wider break-all select-none p-3 bg-gray-950/80 rounded border border-gray-800 min-h-[80px]">
          {targetText.split('').map((char, index) => {
            let color = 'text-gray-500';
            let bg = 'transparent';

            if (index < input.length) {
              if (input[index] === char) {
                color = 'text-cyber-neonGreen';
              } else {
                color = 'text-red-400';
                bg = 'bg-red-950/60';
              }
            } else if (index === input.length) {
              color = 'text-cyber-neonYellow';
              bg = 'bg-cyber-neonYellow/20 border-b-2 border-cyber-neonYellow animate-pulse';
            }

            return (
              <span key={index} className={`${color} ${bg} px-0.5 rounded transition-colors`}>
                {char === ' ' ? '␣' : char}
              </span>
            );
          })}
        </div>

        {/* Real hidden/visible input */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={handleInputChange}
          disabled={completed}
          placeholder="Кликни сюда и начни печатать..."
          className="mt-4 w-full bg-gray-900/90 border border-cyber-neonBlue/60 text-white font-mono px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyber-neonBlue text-sm placeholder-gray-600"
          autoFocus
        />
      </div>

      {/* Virtual Interactive Keyboard with Highlights */}
      <div className="bg-black/90 border border-gray-800 rounded-xl p-4 mb-4">
        <div className="text-[10px] font-mono uppercase text-gray-500 mb-3 text-center">
          ИНТЕРАКТИВНАЯ КЛАВИАТУРА ИНЖЕНЕРА (СЛЕДУЮЩИЙ СИМВОЛ: <span className="text-cyber-neonYellow font-bold">"{nextExpectedChar === ' ' ? 'ПРОБЕЛ' : nextExpectedChar}"</span>)
        </div>

        <div className="flex flex-col gap-1.5 items-center select-none">
          {keyboardRows.map((row, rIdx) => (
            <div key={rIdx} className="flex gap-1.5 justify-center w-full max-w-2xl">
              {row.map((key) => {
                const isTarget = nextExpectedChar.toUpperCase() === key || 
                                (key === 'SPACE' && nextExpectedChar === ' ') ||
                                (key === '{' && nextExpectedChar === '{') ||
                                (key === '}' && nextExpectedChar === '}') ||
                                (key === '(' && nextExpectedChar === '(') ||
                                (key === ')' && nextExpectedChar === ')') ||
                                (key === '[' && nextExpectedChar === '[') ||
                                (key === ']' && nextExpectedChar === ']');

                return (
                  <div
                    key={key}
                    className={`h-9 md:h-11 px-2.5 md:px-3 rounded font-mono text-xs md:text-sm font-bold flex items-center justify-center border transition-all ${
                      isTarget
                        ? 'bg-cyber-neonYellow text-black border-cyber-neonYellow shadow-[0_0_15px_rgba(252,238,10,0.5)] scale-105'
                        : 'bg-gray-900/80 text-gray-300 border-gray-800 hover:border-gray-700'
                    } ${key === 'SPACE' ? 'flex-1 max-w-xs' : 'min-w-[32px] md:min-w-[42px]'}`}
                  >
                    {key}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      {/* Victory Banner */}
      {completed && (
        <div className="p-4 bg-cyber-neonGreen/15 border border-cyber-neonGreen rounded-xl flex items-center justify-between text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyber-neonGreen" size={24} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase">НОРМАТИВ ИНЖЕНЕРА ВЫПОЛНЕН!</div>
              <div className="text-xs text-gray-300">
                Итоговая скорость: <span className="font-mono text-white font-bold">{wpm} WPM</span> | Точность: <span className="font-mono text-white font-bold">{accuracy}%</span>
              </div>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-5 py-2 bg-cyber-neonGreen text-black font-bold uppercase rounded-lg text-xs hover:bg-white transition-colors"
          >
            ПОЛУЧИТЬ НАГРАДУ (+{task.xpReward} XP)
          </button>
        </div>
      )}
    </div>
  );
};
