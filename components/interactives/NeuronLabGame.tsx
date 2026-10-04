import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Brain, CheckCircle, Sliders, Cpu, Sparkles, RotateCcw } from 'lucide-react';

interface NeuronLabGameProps {
  task: Task;
  onComplete: () => void;
}

interface DatasetSample {
  id: number;
  label: string;
  x1: number; // Antenna
  x2: number; // Metal
  target: number; // 1 = Robot, 0 = Human
}

const SAMPLES: DatasetSample[] = [
  { id: 1, label: 'Кибер-Дрон', x1: 1, x2: 1, target: 1 },
  { id: 2, label: 'Антенный маяк', x1: 1, x2: 0, target: 1 },
  { id: 3, label: 'Школьник', x1: 0, x2: 0, target: 0 },
  { id: 4, label: 'Железный чайник', x1: 0, x2: 1, target: 0 }
];

const DEFAULT_FEATURES = { x1: 'Антенна', x2: 'Металл' };

export const NeuronLabGame: React.FC<NeuronLabGameProps> = ({ task, onComplete }) => {
  const samples = task.neuronConfig?.samples ?? SAMPLES;
  const features = task.neuronConfig?.featureNames ?? DEFAULT_FEATURES;
  const [w1, setW1] = useState<number>(0);
  const [w2, setW2] = useState<number>(0);
  const [bias, setBias] = useState<number>(-1);
  const [completed, setCompleted] = useState<boolean>(false);

  useEffect(() => {
    resetGame();
  }, [task.id]);

  const resetGame = () => {
    setW1(0);
    setW2(0);
    setBias(-1);
    setCompleted(false);
  };

  // Evaluate dataset
  const results = samples.map(sample => {
    const sum = (sample.x1 * w1) + (sample.x2 * w2) + bias;
    const prediction = sum > 0 ? 1 : 0;
    const isCorrect = prediction === sample.target;
    return { ...sample, sum, prediction, isCorrect };
  });

  const correctCount = results.filter(r => r.isCorrect).length;
  const accuracy = Math.round((correctCount / samples.length) * 100);

  // Check completion
  useEffect(() => {
    if (correctCount === samples.length && !completed) {
      setCompleted(true);
      playSound('success');
      onComplete();
    }
  }, [correctCount, completed]);

  return (
    <div className="workshop-legacy flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <div className="workshop-banner flex flex-wrap items-center justify-between gap-4 p-4 bg-black/70 border border-cyber-neonBlue/30 rounded-xl mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-purple-950/60 text-purple-400 border border-purple-500/40">
            <Brain size={22} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">НЕЙРОСЕТИ И ИСКУССТВЕННЫЙ ИНТЕЛЛЕКТ</div>
            <h2 className="text-base md:text-lg font-bold text-white">Обучение Перцептрона: Веса и Смещение (Bias)</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-900 border border-purple-500/30 px-3 py-1.5 rounded-lg text-center font-mono">
            <div className="text-[9px] text-gray-400">ТОЧНОСТЬ МОДЕЛИ</div>
            <div className={`text-lg font-bold ${accuracy === 100 ? 'text-cyber-neonGreen' : 'text-cyber-neonYellow'}`}>
              {accuracy}% ({correctCount}/{samples.length})
            </div>
          </div>
          <button
            onClick={resetGame}
            className="p-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 rounded-lg transition-colors"
            title="Сброс"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Concept Explainer */}
      <div className="bg-gray-900/80 border border-cyber-neonBlue/30 rounded-xl p-3.5 mb-4 text-xs font-mono text-gray-200">
        <div className="flex items-center gap-2 mb-1 text-cyber-neonBlue font-bold">
          <Sliders size={16} /> ФОРМУЛА НЕЙРОНА: Сумма = (X₁ × W₁) + (X₂ × W₂) + Смещение
        </div>
        <p className="text-gray-300">
          Настрой веса признаков «{features.x1}» и «{features.x2}». При сумме больше 0 модель выбирает класс 1, иначе — класс 0. Сравни ответ с ожидаемым для каждого примера.
        </p>
      </div>

      {/* Neuron Graphic & Controls */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
        {/* Sliders Box */}
        <div className="bg-black border border-gray-800 rounded-xl p-5 space-y-4">
          <h3 className="text-xs font-mono font-bold text-gray-300 uppercase flex items-center gap-2 border-b border-gray-800 pb-2">
            <Cpu size={14} className="text-purple-400" /> НАСТРОЙКА ВЕСОВ СИНАПСОВ
          </h3>

          {/* Weight 1 */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-gray-400">Вес W₁ (Чувствительность к признаку «{features.x1}»):</span>
              <span className="font-bold text-cyber-neonBlue">{w1 > 0 ? `+${w1}` : w1}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="1"
              value={w1}
              onChange={(e) => {
                setW1(parseInt(e.target.value, 10));
                playSound('click');
              }}
              className="w-full accent-cyber-neonBlue cursor-pointer"
            />
          </div>

          {/* Weight 2 */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-gray-400">Вес W₂ (Чувствительность к признаку «{features.x2}»):</span>
              <span className="font-bold text-cyber-neonPink">{w2 > 0 ? `+${w2}` : w2}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="1"
              value={w2}
              onChange={(e) => {
                setW2(parseInt(e.target.value, 10));
                playSound('click');
              }}
              className="w-full accent-cyber-neonPink cursor-pointer"
            />
          </div>

          {/* Bias */}
          <div>
            <div className="flex justify-between text-xs font-mono mb-1">
              <span className="text-gray-400">Смещение Bias (Порог активации):</span>
              <span className="font-bold text-cyber-neonYellow">{bias > 0 ? `+${bias}` : bias}</span>
            </div>
            <input
              type="range"
              min="-5"
              max="5"
              step="1"
              value={bias}
              onChange={(e) => {
                setBias(parseInt(e.target.value, 10));
                playSound('click');
              }}
              className="w-full accent-cyber-neonYellow cursor-pointer"
            />
          </div>
        </div>

        {/* Dataset Verification Grid */}
        <div className="bg-black border border-gray-800 rounded-xl p-5 flex flex-col justify-between">
          <h3 className="text-xs font-mono font-bold text-gray-300 uppercase border-b border-gray-800 pb-2">
            ПРОВЕРКА НА ТРЕНИРОВОЧНОМ ДАТАСЕТЕ
          </h3>

          <div className="divide-y divide-gray-900 my-2">
            {results.map(res => (
              <div key={res.id} className="py-2.5 flex items-center justify-between text-xs font-mono">
                <div>
                  <div className="text-white font-bold">{res.label}</div>
                  <div className="text-[10px] text-gray-500">
                    {features.x1}: {res.x1} | {features.x2}: {res.x2}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-[10px] text-gray-400">Σ = {res.sum}</div>
                    <div className={`font-bold ${res.prediction === 1 ? 'text-cyber-neonGreen' : 'text-blue-400'}`}>
                      {`Класс ${res.prediction} · ожидается ${res.target}`}
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold text-xs ${
                    res.isCorrect ? 'bg-cyber-neonGreen text-black' : 'bg-red-950 text-red-400 border border-red-800'
                  }`}>
                    {res.isCorrect ? '✓' : '✗'}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-[10px] font-mono text-gray-500 text-center">
            {accuracy === 100
              ? 'Все показанные примеры распознаны. Это ещё не гарантирует верный ответ на новых данных.'
              : 'Меняй один вес за раз. Проверь, какие примеры стали распознаваться лучше, а какие — хуже.'}
          </div>
        </div>
      </div>

      {/* Victory Banner */}
      {completed && (
        <div className="p-4 bg-cyber-neonGreen/15 border border-cyber-neonGreen rounded-xl flex items-center justify-between text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyber-neonGreen" size={26} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase">НЕЙРОН УСПЕШНО ОБУЧЕН!</div>
              <div className="text-xs text-gray-300">
                Точность инференса достигла 100%. Математическая модель готова к боевой классификации!
              </div>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-5 py-2 bg-cyber-neonGreen text-black font-bold uppercase rounded-lg text-xs hover:bg-white transition-colors"
          >
            СОХРАНИТЬ ВЕСА (+{task.xpReward} XP)
          </button>
        </div>
      )}
    </div>
  );
};
