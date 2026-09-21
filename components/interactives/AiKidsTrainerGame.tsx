import React, { useState } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Bot, Sparkles, CheckCircle2, RotateCcw, Brain, Award, ArrowRight } from 'lucide-react';

interface TrainingCard {
  id: string;
  name: string;
  icon: string;
  category: 'cat' | 'dog';
}

const CARDS: TrainingCard[] = [
  { id: 'c1', name: 'Рыжий котенок', icon: '🐱', category: 'cat' },
  { id: 'c2', name: 'Дружелюбный пёс', icon: '🐶', category: 'dog' },
  { id: 'c3', name: 'Белый кот с бантиком', icon: '🐈', category: 'cat' },
  { id: 'c4', name: 'Щенок с мячиком', icon: '🐕', category: 'dog' },
  { id: 'c5', name: 'Пушистый сиамский кот', icon: '😺', category: 'cat' },
  { id: 'c6', name: 'Овчарка-охранник', icon: '🦮', category: 'dog' },
];

export const AiKidsTrainerGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const cards = task.aiTrainerConfig?.cards?.length ? task.aiTrainerConfig.cards : CARDS;
  const catName = task.aiTrainerConfig?.categoryNames?.cat || 'Котики';
  const dogName = task.aiTrainerConfig?.categoryNames?.dog || 'Собачки';
  const [unassigned, setUnassigned] = useState<TrainingCard[]>(cards);
  const [catBasket, setCatBasket] = useState<TrainingCard[]>([]);
  const [dogBasket, setDogBasket] = useState<TrainingCard[]>([]);
  const [isTrained, setIsTrained] = useState(false);
  const [isTrainingAnim, setIsTrainingAnim] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [draggedCard, setDraggedCard] = useState<TrainingCard | null>(null);
  const [hoveredBasket, setHoveredBasket] = useState<'cat' | 'dog' | null>(null);

  const handleAssign = (card: TrainingCard, target: 'cat' | 'dog') => {
    playSound('hit');
    setErrorMessage(null);
    setUnassigned(prev => prev.filter(c => c.id !== card.id));
    if (target === 'cat') {
      setCatBasket(prev => [...prev, card]);
    } else {
      setDogBasket(prev => [...prev, card]);
    }
  };

  const handleTrainModel = () => {
    // Check if everything is correctly sorted
    const catsOk = catBasket.every(c => c.category === 'cat');
    const dogsOk = dogBasket.every(c => c.category === 'dog');

    if (unassigned.length > 0) {
      playSound('error');
      setErrorMessage('Сначала распредели все карточки по корзинам обучения!');
      return;
    }

    if (!catsOk || !dogsOk) {
      playSound('error');
      setErrorMessage('Ой! В одной из корзин ошибка. Проверь внимательно: котики должны быть в наборе для котиков, а собачки — для собачек!');
      return;
    }

    setErrorMessage(null);
    playSound('click');
    setIsTrainingAnim(true);

    setTimeout(() => {
      playSound('success');
      setIsTrainingAnim(false);
      setIsTrained(true);
      setCompleted(true);
      setTimeout(() => {
        onComplete();
      }, 1600);
    }, 1200);
  };

  const handleReset = () => {
    setUnassigned(cards);
    setCatBasket([]);
    setDogBasket([]);
    setIsTrained(false);
    setIsTrainingAnim(false);
    setCompleted(false);
    setErrorMessage(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 p-4 select-none text-white overflow-y-auto">
      {/* Header Banner */}
      <div className="flex items-center justify-between bg-slate-900/90 border-2 border-purple-500/40 p-4 rounded-2xl mb-4 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl">
            🤖
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-purple-300">Обучи робота-питомца: Котики против Собачек</h2>
            <p className="text-xs text-slate-300">Робот учится на примерах! Разложи карточки по корзинам обучения</p>
          </div>
        </div>
        <button 
          onClick={handleReset}
          className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"
          title="Сбросить"
        >
          <RotateCcw size={18} />
        </button>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-5 flex-1 items-start">
        
        {/* Left: Unassigned Cards */}
        <div className="md:col-span-5 bg-slate-900/70 border border-slate-800 p-4 rounded-2xl flex flex-col">
          <div className="text-xs font-bold uppercase tracking-wider text-purple-300 mb-3 flex items-center justify-between">
            <span>Новые примеры ({unassigned.length}):</span>
            <span className="text-[10px] text-slate-400">Отправь в корзину</span>
          </div>

          {unassigned.length === 0 ? (
            <div className="py-10 text-center text-emerald-400 font-bold text-sm">
              ✨ Все примеры распределены! Можно начинать обучение!
            </div>
          ) : (
            <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
              {unassigned.map(card => (
                <div 
                  key={card.id}
                  draggable={true}
                  onDragStart={(e) => {
                    setDraggedCard(card);
                    e.dataTransfer.setData('text/plain', card.id);
                    playSound('click');
                  }}
                  onDragEnd={() => {
                    setDraggedCard(null);
                    setHoveredBasket(null);
                  }}
                  className={`p-3 bg-slate-800/90 border border-slate-700 rounded-xl flex items-center justify-between gap-3 shadow-md cursor-grab active:cursor-grabbing transition-all ${
                    draggedCard?.id === card.id ? 'opacity-40 scale-95 border-purple-500' : 'hover:border-purple-400'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{card.icon}</span>
                    <span className="text-xs font-bold">{card.name}</span>
                  </div>
                  <div className="flex items-center gap-1.5 shrink-0">
                    <button
                      onClick={() => handleAssign(card, 'cat')}
                      className="px-2.5 py-1.5 bg-rose-600/80 hover:bg-rose-500 rounded-lg text-xs font-bold text-white flex items-center gap-1 shadow-sm"
                    >
                      🐱 Кот
                    </button>
                    <button
                      onClick={() => handleAssign(card, 'dog')}
                      className="px-2.5 py-1.5 bg-blue-600/80 hover:bg-blue-500 rounded-lg text-xs font-bold text-white flex items-center gap-1 shadow-sm"
                    >
                      🐶 Пёс
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: Baskets and Robot Status */}
        <div className="md:col-span-7 flex flex-col gap-4">
          
          {/* 2 Training Baskets */}
          <div className="grid grid-cols-2 gap-3">
            {/* Cat Basket */}
            <div 
              onDragOver={(e) => {
                e.preventDefault();
                setHoveredBasket('cat');
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setHoveredBasket(null);
                }
              }}
              onDrop={(e) => {
                e.preventDefault();
                setHoveredBasket(null);
                const cId = e.dataTransfer.getData('text/plain') || draggedCard?.id;
                const card = unassigned.find(c => c.id === cId) || draggedCard;
                if (card) {
                  handleAssign(card, 'cat');
                }
                setDraggedCard(null);
              }}
              className={`p-3.5 bg-rose-950/30 border-2 rounded-2xl min-h-[140px] flex flex-col transition-all ${
                hoveredBasket === 'cat' 
                  ? 'border-rose-400 bg-rose-900/40 shadow-[0_0_20px_rgba(244,63,94,0.3)] scale-[1.02]' 
                  : 'border-rose-500/40'
              }`}
            >
              <div className="font-bold text-xs text-rose-300 flex items-center justify-between mb-2">
                <span>🐱 Датасет: {catName}</span>
                <span className="text-[10px] bg-rose-950 px-2 py-0.5 rounded-full border border-rose-800">
                  {catBasket.length} шт
                </span>
              </div>
              <div className="flex flex-wrap gap-2 flex-1 items-center justify-center p-2 bg-slate-950/60 rounded-xl">
                {catBasket.map(c => (
                  <span key={c.id} className="text-2xl p-1 bg-rose-900/40 rounded-lg border border-rose-700 animate-in zoom-in-75">
                    {c.icon}
                  </span>
                ))}
                {catBasket.length === 0 && (
                  <span className="text-[11px] text-rose-300/60 italic text-center">
                    Перетащи сюда карточки котиков
                  </span>
                )}
              </div>
            </div>

            {/* Dog Basket */}
            <div 
              onDragOver={(e) => {
                e.preventDefault();
                setHoveredBasket('dog');
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                  setHoveredBasket(null);
                }
              }}
              onDrop={(e) => {
                e.preventDefault();
                setHoveredBasket(null);
                const cId = e.dataTransfer.getData('text/plain') || draggedCard?.id;
                const card = unassigned.find(c => c.id === cId) || draggedCard;
                if (card) {
                  handleAssign(card, 'dog');
                }
                setDraggedCard(null);
              }}
              className={`p-3.5 bg-blue-950/30 border-2 rounded-2xl min-h-[140px] flex flex-col transition-all ${
                hoveredBasket === 'dog' 
                  ? 'border-blue-400 bg-blue-900/40 shadow-[0_0_20px_rgba(59,130,246,0.3)] scale-[1.02]' 
                  : 'border-blue-500/40'
              }`}
            >
              <div className="font-bold text-xs text-blue-300 flex items-center justify-between mb-2">
                <span>🐶 Датасет: {dogName}</span>
                <span className="text-[10px] bg-blue-950 px-2 py-0.5 rounded-full border border-blue-800">
                  {dogBasket.length} шт
                </span>
              </div>
              <div className="flex flex-wrap gap-2 flex-1 items-center justify-center p-2 bg-slate-950/60 rounded-xl">
                {dogBasket.map(d => (
                  <span key={d.id} className="text-2xl p-1 bg-blue-900/40 rounded-lg border border-blue-700 animate-in zoom-in-75">
                    {d.icon}
                  </span>
                ))}
                {dogBasket.length === 0 && (
                  <span className="text-[11px] text-blue-300/60 italic text-center">
                    Перетащи сюда карточки собачек
                  </span>
                )}
              </div>
            </div>
          </div>

          {errorMessage && (
            <div className="p-3 bg-red-950/80 border border-red-500/60 rounded-xl text-red-200 text-xs flex items-center gap-2">
              <span className="text-lg">⚠️</span>
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Robot Brain & Training Button */}
          <div className="bg-slate-900/90 border border-slate-800 p-5 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-3xl transition-all ${
                isTrained ? 'bg-emerald-500/20 border-2 border-emerald-400 text-emerald-300' : 'bg-purple-950/60 border border-purple-600'
              }`}>
                {isTrained ? '🏆' : '🧠'}
              </div>
              <div>
                <div className="font-bold text-sm text-white">
                  {isTrained ? 'Нейросеть обучена на 100%!' : 'Интеллект робота ждёт данных'}
                </div>
                <div className="text-xs text-slate-400 mt-0.5">
                  {isTrained 
                    ? 'Робот безошибочно узнает любого питомца!' 
                    : 'Заполни обе корзины и нажми кнопку обучения'}
                </div>
              </div>
            </div>

            <button
              onClick={handleTrainModel}
              disabled={unassigned.length > 0 || isTrainingAnim || isTrained}
              className={`px-5 py-3 rounded-xl font-bold uppercase tracking-wider text-xs flex items-center justify-center gap-2 shadow-lg transition-all ${
                isTrained
                  ? 'bg-emerald-500 text-black'
                  : unassigned.length === 0
                  ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-purple-500/25 active:scale-95'
                  : 'bg-slate-800 text-slate-500 cursor-not-allowed'
              }`}
            >
              {isTrainingAnim ? (
                <>
                  <Sparkles size={16} className="animate-spin" /> ОБУЧЕНИЕ МОДЕЛИ...
                </>
              ) : isTrained ? (
                <>
                  <CheckCircle2 size={16} /> ГОТОВО (+{task.xpReward} XP)
                </>
              ) : (
                <>
                  <Brain size={16} /> ОБУЧИТЬ РОБОТА
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
};
