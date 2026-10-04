import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { ArrowUpDown, RotateCcw, CheckCircle, Sparkles, HelpCircle, Layers, BookOpen, X, Lightbulb, Play, AlertCircle } from 'lucide-react';

interface SortingGameProps {
  task: Task;
  onComplete: () => void;
}

export const SortingGame: React.FC<SortingGameProps> = ({ task, onComplete }) => {
  const isGrade3 = task.courseId === 'course_grade3' || task.id.startsWith('g3_');
  const initialData = task.sortingConfig?.numbers || (isGrade3 ? [12, 5, 28, 9, 3] : [42, 15, 88, 7, 33, 21]);
  const [array, setArray] = useState<number[]>(initialData);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [passNumber, setPassNumber] = useState<number>(1);
  const [comparisons, setComparisons] = useState<number>(0);
  const [swaps, setSwaps] = useState<number>(0);
  const [isSorted, setIsSorted] = useState<boolean>(false);
  const [showGuide, setShowGuide] = useState<boolean>(false);
  const [teacherAdvice, setTeacherAdvice] = useState<{ type: 'info' | 'success' | 'warn'; msg: string } | null>(null);

  useEffect(() => {
    resetGame();
  }, [task.id]);

  const resetGame = () => {
    setArray([...initialData]);
    setCurrentIndex(0);
    setPassNumber(1);
    setComparisons(0);
    setSwaps(0);
    setIsSorted(false);
    setTeacherAdvice({
      type: 'info',
      msg: 'Сравни текущую пару: если левое число больше правого — поменяй их местами, чтобы большее всплыло вправо!'
    });
  };

  const checkIfArrayIsSorted = (arr: number[]) => {
    for (let i = 0; i < arr.length - 1; i++) {
      if (arr[i] > arr[i + 1]) return false;
    }
    return true;
  };

  const left = array[currentIndex];
  const right = array[currentIndex + 1];
  const needsSwap = left > right;

  // Student decided to swap
  const handleStudentSwap = () => {
    if (isSorted) return;
    setComparisons(c => c + 1);

    if (!needsSwap) {
      playSound('error');
      setTeacherAdvice({
        type: 'warn',
        msg: `Учитель подсказывает: Число ${left} уже меньше или равно ${right}! Они стоят в верном порядке возрастания. Менять их не нужно!`
      });
      return;
    }

    // Correct swap!
    playSound('move');
    const nextArr = [...array];
    nextArr[currentIndex] = right;
    nextArr[currentIndex + 1] = left;
    setArray(nextArr);
    setSwaps(s => s + 1);

    setTeacherAdvice({
      type: 'success',
      msg: `Отлично! ${left} > ${right}. Число ${left} сдвинулось ближе к концу списка!`
    });

    advanceStep(nextArr);
  };

  // Student decided to keep order
  const handleStudentKeep = () => {
    if (isSorted) return;
    setComparisons(c => c + 1);

    if (needsSwap) {
      playSound('error');
      setTeacherAdvice({
        type: 'warn',
        msg: `Учитель подсказывает: Внимание! ${left} БОЛЬШЕ, чем ${right}. Чтобы отсортировать от меньшего к большему, большее число должно идти вправо. Нажми «Поменять местами»!`
      });
      return;
    }

    // Correct keep!
    playSound('click');
    setTeacherAdvice({
      type: 'success',
      msg: `Верно! ${left} ≤ ${right}. Порядок правильный, переходим к следующей паре.`
    });

    advanceStep(array);
  };

  const advanceStep = (currentArray: number[]) => {
    const nextIdx = currentIndex + 1;
    if (nextIdx >= currentArray.length - 1) {
      // Completed a pass
      if (checkIfArrayIsSorted(currentArray)) {
        setIsSorted(true);
        playSound('success');
        setTeacherAdvice({
          type: 'success',
          msg: '🎉 Ура! Все элементы выстроились по возрастанию! Алгоритм завершен!'
        });
        setTimeout(() => {
          onComplete();
        }, 1200);
      } else {
        setCurrentIndex(0);
        setPassNumber(p => p + 1);
      }
    } else {
      setCurrentIndex(nextIdx);
    }
  };

  const maxVal = Math.max(...array, 100);

  return (
    <div className="workshop-legacy flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto select-none">
      {/* Header */}
      <div className="workshop-banner flex flex-wrap items-center justify-between gap-4 p-4 bg-black/70 border border-cyber-neonBlue/30 rounded-2xl mb-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-cyber-neonGreen/20 text-cyber-neonGreen border border-cyber-neonGreen/40 text-xl">
            <ArrowUpDown size={22} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">АЛГОРИТМИЧЕСКИЙ ТРЕНАЖЕР</div>
            <h2 className="text-base md:text-lg font-bold text-white">Пузырьковая Сортировка: Шаг за Шагом</h2>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Guide Button */}
          <button
            onClick={() => setShowGuide(!showGuide)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              showGuide
                ? 'bg-cyber-neonBlue text-black shadow-cyber-neonBlue/30'
                : 'bg-gray-900 border border-cyber-neonBlue/40 text-cyber-neonBlue hover:bg-cyber-neonBlue/10'
            }`}
          >
            <BookOpen size={14} />
            <span>Шпаргалка Учителя</span>
          </button>

          <div className="bg-gray-900 border border-gray-800 px-3 py-1 rounded-xl text-center font-mono">
            <div className="text-[9px] text-gray-400">ПРОХОД</div>
            <div className="text-sm font-bold text-cyber-neonBlue">№{passNumber}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 px-3 py-1 rounded-xl text-center font-mono">
            <div className="text-[9px] text-gray-400">СРАВНЕНИЙ</div>
            <div className="text-sm font-bold text-cyber-neonYellow">{comparisons}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 px-3 py-1 rounded-xl text-center font-mono">
            <div className="text-[9px] text-gray-400">ОБМЕНОВ</div>
            <div className="text-sm font-bold text-cyber-neonPink">{swaps}</div>
          </div>
          <button
            onClick={resetGame}
            className="p-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 rounded-xl transition-colors"
            title="Начать заново"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Teacher Guide Panel (Collapsible) */}
      {showGuide && (
        <div className="mb-4 bg-gradient-to-r from-cyan-950/90 via-slate-900 to-cyan-950/90 border-2 border-cyan-400/60 p-4 rounded-2xl shadow-2xl relative animate-in fade-in duration-200">
          <button 
            onClick={() => setShowGuide(false)}
            className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg bg-black/40"
          >
            <X size={16} />
          </button>

          <div className="flex items-start gap-3">
            <div className="p-2 bg-cyan-400/20 text-cyan-300 rounded-xl shrink-0 mt-0.5">
              <Lightbulb size={20} />
            </div>
            <div className="space-y-2 pr-6">
              <h3 className="text-sm font-bold text-cyan-300 uppercase tracking-wide">
                Методическое правило: Сортировка Пузырьком (Bubble Sort)
              </h3>
              <p className="text-xs text-slate-200 leading-relaxed">
                Почему «пузырёк»? Самые большие числа, словно лёгкие пузырьки воздуха в лимонаде, за каждый проход всплывают на самый верх (в конец списка).
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 bg-black/60 rounded-xl border border-cyan-500/30 text-slate-200">
                  <span className="font-bold text-yellow-300">1. Если Левый &gt; Правый:</span>
                  <div className="text-slate-400 mt-1">Они стоят неправильно. Нажми «Поменять местами», чтобы большее число шагнуло вправо.</div>
                </div>
                <div className="p-2.5 bg-black/60 rounded-xl border border-cyan-500/30 text-slate-200">
                  <span className="font-bold text-emerald-300">2. Если Левый ≤ Правый:</span>
                  <div className="text-slate-400 mt-1">Они уже стоят по порядку. Нажми «Оставить порядок», чтобы перейти к следующей паре.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Teacher Real-time Advice Banner */}
      {teacherAdvice && (
        <div className={`p-3.5 rounded-xl mb-4 border flex items-center gap-3 transition-all ${
          teacherAdvice.type === 'warn' 
            ? 'bg-red-950/70 border-red-500/60 text-red-200 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
            : teacherAdvice.type === 'success' 
            ? 'bg-emerald-950/70 border-emerald-500/60 text-emerald-200' 
            : 'bg-slate-900 border-slate-700 text-slate-300'
        }`}>
          {teacherAdvice.type === 'warn' ? (
            <AlertCircle size={20} className="text-red-400 shrink-0" />
          ) : teacherAdvice.type === 'success' ? (
            <CheckCircle size={20} className="text-emerald-400 shrink-0" />
          ) : (
            <Layers size={20} className="text-cyber-neonBlue shrink-0" />
          )}
          <span className="text-xs font-mono">{teacherAdvice.msg}</span>
        </div>
      )}

      {/* Visual Bars & Cards */}
      <div className="flex-1 bg-black border border-gray-800 rounded-2xl p-6 flex flex-col justify-end items-center mb-4 min-h-[260px] relative overflow-hidden">
        <div className="sorting-bars w-full flex items-end justify-center gap-3 md:gap-6 h-52 pb-4">
          {array.map((num, idx) => {
            const isComparingLeft = idx === currentIndex;
            const isComparingRight = idx === currentIndex + 1;
            const isBeingCompared = isComparingLeft || isComparingRight;
            const heightPercent = Math.max(25, Math.round((num / maxVal) * 100));

            return (
              <div key={idx} className="flex flex-col items-center gap-2 flex-1 max-w-[70px]">
                {/* Number Badge */}
                <div
                  className={`text-xs md:text-sm font-bold font-mono px-2.5 py-1 rounded-lg transition-all ${
                    isBeingCompared
                      ? 'bg-cyber-neonYellow text-black scale-110 shadow-[0_0_20px_rgba(252,238,10,0.5)] ring-2 ring-white'
                      : isSorted
                      ? 'bg-cyber-neonGreen/20 text-cyber-neonGreen border border-cyber-neonGreen/40'
                      : 'bg-gray-900 text-white border border-gray-800'
                  }`}
                >
                  {num}
                </div>

                {/* Animated Vertical Bar */}
                <div
                  className={`w-full rounded-t-xl transition-all duration-300 relative ${
                    isBeingCompared
                      ? 'bg-gradient-to-t from-amber-500 to-cyber-neonYellow border-t-2 border-white'
                      : isSorted
                      ? 'bg-gradient-to-t from-emerald-700 to-cyber-neonGreen'
                      : 'bg-gradient-to-t from-gray-800 to-cyber-neonBlue/70'
                  }`}
                  style={{ height: `${heightPercent}%` }}
                >
                  {isBeingCompared && (
                    <div className="absolute inset-0 bg-white/20 animate-pulse rounded-t-xl" />
                  )}
                </div>

                {/* Index label */}
                <div className="text-[10px] font-mono text-gray-500">[{idx}]</div>
              </div>
            );
          })}
        </div>

        {/* Pointer indicator */}
        {!isSorted && (
          <div className="text-xs font-mono text-cyber-neonYellow flex items-center gap-2 mt-2 bg-black/80 px-4 py-1.5 rounded-full border border-yellow-500/30">
            ▲ Сравниваем: <span className="font-bold text-white">[{left}]</span> и <span className="font-bold text-white">[{right}]</span>
          </div>
        )}
      </div>

      {/* Control Actions: Real Decision Making */}
      {!isSorted ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            onClick={handleStudentSwap}
            className="py-4 px-4 bg-cyber-neonYellow hover:bg-white text-black font-bold uppercase text-xs md:text-sm font-mono rounded-2xl transition-all shadow-[0_0_20px_rgba(252,238,10,0.25)] flex items-center justify-center gap-2.5 active:scale-98"
          >
            <ArrowUpDown size={18} />
            <span>Поменять местами: {left} &gt; {right}</span>
          </button>
          <button
            onClick={handleStudentKeep}
            className="py-4 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-xs md:text-sm font-mono rounded-2xl transition-all border border-slate-700 flex items-center justify-center gap-2.5 active:scale-98"
          >
            <span>Оставить порядок: {left} ≤ {right} ➔</span>
          </button>
        </div>
      ) : (
        <div className="p-5 bg-cyber-neonGreen/15 border border-cyber-neonGreen rounded-2xl flex flex-wrap items-center justify-between gap-4 text-white animate-fade-in shadow-[0_0_30px_rgba(0,255,65,0.2)]">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyber-neonGreen" size={30} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase tracking-wider">МАССИВ УСПЕШНО ОТСОРТИРОВАН!</div>
              <div className="text-xs text-gray-300">
                Завершено за <span className="font-bold text-white">{comparisons} проверок</span> и <span className="font-bold text-white">{swaps} перестановок</span>.
              </div>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-6 py-2.5 bg-cyber-neonGreen text-black font-bold uppercase rounded-xl text-xs hover:bg-white transition-all shadow-lg"
          >
            ЗАБРАТЬ НАГРАДУ (+{task.xpReward} XP)
          </button>
        </div>
      )}
    </div>
  );
};

