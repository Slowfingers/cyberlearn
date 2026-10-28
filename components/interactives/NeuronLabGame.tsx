import {GameButton, WorkshopHeader, WorkshopBadge} from '../GameUI';
import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Brain, CheckCircle, Sliders, Cpu, Sparkles } from 'lucide-react';

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
  const finished=useRef(false);
  const [error,setError]=useState('');
  const [completed, setCompleted] = useState<boolean>(false);
  const [selId, setSelId] = useState<number>(samples[0]?.id ?? 0);

  useEffect(() => {
    resetGame();
  }, [task.id]);

  const resetGame = () => {
    finished.current=false;setError('');
    setW1(0);
    setW2(0);
    setBias(-1);
    setCompleted(false);
    setSelId(samples[0]?.id ?? 0);
  };

  // Evaluate dataset
  const results = samples.map(sample => {
    const sum = (sample.x1 * w1) + (sample.x2 * w2) + bias;
    const prediction = sum > 0 ? 1 : 0;
    const isCorrect = prediction === sample.target;
    return { ...sample, sum, prediction, isCorrect };
  });

  const selectedResult = results.find(r => r.id === selId) ?? results[0];
  const correctCount = results.filter(r => r.isCorrect).length;
  const accuracy = Math.round((correctCount / samples.length) * 100);

  const checkModel=()=>{
    if(finished.current)return;
    if(correctCount!==samples.length){setError('Не все ответы совпали. Найди ошибочный пример, пересчитай сумму и измени один параметр.');playSound('error');return;}
    finished.current=true;setCompleted(true);setError('');playSound('success');onComplete();
  };

  return (
    <div className="ui-trainer-family workshop-legacy neuron-workshop flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <WorkshopHeader icon={<Brain size={26}/>} eyebrow="Нейросети и искусственный интеллект" title="Обучение перцептрона" description={task.lesson?.goal || `Подбери веса для признаков «${features.x1}» и «${features.x2}» на ${samples.length} примерах.`} onReset={resetGame}
        badges={<WorkshopBadge label="Точность модели">{accuracy}% ({correctCount}/{samples.length})</WorkshopBadge>}/>

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
          {selectedResult && (
            <figure className="neuron-figure">
              <figcaption className="neuron-figure-caption">Как нейрон считает пример «{selectedResult.label}»</figcaption>
              <svg className="neuron-diagram" viewBox="0 0 560 110" role="img" aria-label={`Схема нейрона для примера ${selectedResult.label}: сумма ${selectedResult.sum}, класс ${selectedResult.prediction}`}>
                <text x="8" y="16" textAnchor="start" fontSize="18" fill="#9fb4cc">X₁ {features.x1}</text>
                <text x="8" y="105" textAnchor="start" fontSize="18" fill="#9fb4cc">X₂ {features.x2}</text>
                <line x1="91" y1="32" x2="390" y2="50" stroke={w1 < 0 ? '#ff8fa3' : '#58dfff'} strokeWidth={2 + Math.abs(w1) * 0.8} strokeDasharray={w1 < 0 ? '8 5' : undefined} />
                <line x1="91" y1="80" x2="390" y2="62" stroke={w2 < 0 ? '#ff8fa3' : '#e58bff'} strokeWidth={2 + Math.abs(w2) * 0.8} strokeDasharray={w2 < 0 ? '8 5' : undefined} />
                <text x="220" y="36" fontSize="18" fill="#8ce9e4">W₁ {w1 > 0 ? `+${w1}` : w1}</text>
                <text x="220" y="92" fontSize="18" fill="#d6a6ff">W₂ {w2 > 0 ? `+${w2}` : w2}</text>
                <circle cx="75" cy="32" r="15" fill="#14273f" stroke="#58dfff" strokeWidth="2" />
                <text x="75" y="38" textAnchor="middle" fontSize="19" fill="#eaf4ff">{selectedResult.x1}</text>
                <circle cx="75" cy="80" r="15" fill="#14273f" stroke="#e58bff" strokeWidth="2" />
                <text x="75" y="86" textAnchor="middle" fontSize="19" fill="#eaf4ff">{selectedResult.x2}</text>
                <circle cx="415" cy="55" r="20" fill="#1a2c49" stroke="#f9d274" strokeWidth="2" />
                <text x="415" y="61" textAnchor="middle" fontSize="18" fill="#ffe9a8">Σ {selectedResult.sum}</text>
                <text x="415" y="100" textAnchor="middle" fontSize="18" fill="#9fb4cc">смещение {bias > 0 ? `+${bias}` : bias}</text>
                <line x1="435" y1="55" x2="500" y2="55" stroke="#58dfff" strokeWidth="2" />
                <circle cx="522" cy="55" r="15" fill={selectedResult.prediction === 1 ? '#1f5a3a' : '#22344f'} stroke={selectedResult.prediction === 1 ? '#6fe3b1' : '#6687aa'} strokeWidth="2" />
                <text x="522" y="61" textAnchor="middle" fontSize="19" fill="#eaf4ff">{selectedResult.prediction}</text>
                <text x="522" y="95" textAnchor="middle" fontSize="18" fill="#9fb4cc">Класс {selectedResult.prediction}</text>
              </svg>
            </figure>
          )}
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
              aria-label="Вес первого признака"
              disabled={completed}
              type = "range"
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
              aria-label="Вес второго признака"
              disabled={completed}
              type = "range"
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
              aria-label="Смещение"
              disabled={completed}
              type = "range"
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
              <button type="button" key={res.id} aria-pressed={res.id === selectedResult?.id} onClick={() => setSelId(res.id)} className={`neuron-sample w-full text-left py-2.5 flex items-center justify-between text-xs font-mono ${res.id === selectedResult?.id ? 'is-selected' : ''}`}>
                <div>
                  <div className="text-white font-bold">{res.label}</div>
                  <div className="text-xs text-gray-500">
                    {features.x1}: {res.x1} | {features.x2}: {res.x2}
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <div className="text-xs text-gray-400">Σ = {res.sum}</div>
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
              </button>
            ))}
          </div>

          <div className="text-xs font-mono text-gray-500 text-center">
            {accuracy === 100
              ? 'Все показанные примеры распознаны. Это ещё не гарантирует верный ответ на новых данных.'
              : 'Меняй один вес за раз. Проверь, какие примеры стали распознаваться лучше, а какие — хуже.'}
          </div>
        </div>
      </div>

{error && <p role="alert" className="workshop-feedback workshop-feedback--error">{error}</p>}
      {!completed && <GameButton variant="primary" size="compact" className="workshop-primary" onClick={checkModel}>Проверить модель</GameButton>}
      {/* Victory Banner */}
      {completed && (
        <div className="workshop-feedback workshop-feedback--success animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyber-neonGreen" size={26} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase">ПРИМЕРЫ ПРОВЕРЕНЫ!</div>
              <div className="text-xs text-gray-300">
                Все учебные ответы совпали. Для применения нужны отдельные новые примеры.
              </div>
            </div>
          </div>

        </div>
      )}
    </div>
  );
};
