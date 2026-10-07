import {GameButton} from '../GameUI';
import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { ShieldCheck, ShieldAlert, Sparkles, CheckCircle2, RotateCcw, Award, BookOpen, HelpCircle, X } from 'lucide-react';

interface CaseItem {
  id: string;
  icon: string;
  title: string;
  text: string;
  isDangerOrFake: boolean;
  teacherHint: string;
  explanation: string;
}

const CASES: CaseItem[] = [
  {
    id: 'c1',
    icon: '🎁',
    title: 'Подозрительное сообщение',
    text: '«Поздравляем! Ты выиграл 1 000 000 игровой валюты! Срочно напиши свой пароль и логин, чтобы получить приз!»',
    isDangerOrFake: true,
    teacherHint: 'Обрати внимание: тебе обещают сказочный выигрыш и требуют пароль. Настоящие компании никогда не просят пароль!',
    explanation: 'Никогда и никому нельзя отдавать свои пароли! Настоящие разработчики игр никогда их не просят.'
  },
  {
    id: 'c2',
    icon: '🦛',
    title: 'Сенсация в соцсетях',
    text: '«Учёные обнаружили фиолетового бегемота с крыльями бабочки и шестью ногами в лесу под Москвой!»',
    isDangerOrFake: true,
    teacherHint: 'Фиолетовый бегемот с крыльями? Звучит как выдумка нейросети или фотошоп. Проверяй факты в научных книгах!',
    explanation: 'Это картинка, созданная нейросетью или фотошопом! Всегда проверяй факты в детских энциклопедиях.'
  },
  {
    id: 'c3',
    icon: '🎮',
    title: 'Сообщение от одноклассника',
    text: '«Привет! Учительница задала по математике страницу 45, номер 3. Давай делать вместе?»',
    isDangerOrFake: false,
    teacherHint: 'Здесь нет ссылок, угроз или требований пароля. Это обычное школьное домашнее задание от друга.',
    explanation: 'Это обычное дружеское общение со знакомым человеком из школы. Это безопасно!'
  },
  {
    id: 'c4',
    icon: '⚠️',
    title: 'Грозное окно на экране',
    text: '«ВНИМАНИЕ! Твой планшет заблокирован вирусом! Срочно отправь СМС с кодом на платный номер!»',
    isDangerOrFake: true,
    teacherHint: 'Мошенники часто пугают людей «вирусами» и требуют отправить платные СМС. Это баннер-обманка!',
    explanation: 'Это пугалка от мошенников (баннер-вымогатель). Ничего не отправляй, просто позови взрослых!'
  },
  {
    id: 'c5',
    icon: '👤',
    title: 'Незнакомец в онлайн-игре',
    text: '«Привет! Ты круто играешь. Скажи, на какой улице ты живёшь и в какую школу ходишь?»',
    isDangerOrFake: true,
    teacherHint: 'Незнакомец пытается выведать твой адрес и школу. Личную информацию нельзя разглашать посторонним!',
    explanation: 'Незнакомцам в играх нельзя называть свой адрес, номер школы и телефон. Это личная тайна!'
  },
  {
    id: 'c6',
    icon: '📖',
    title: 'Сайт школьной библиотеки',
    text: '«Официальный каталог книг: Сказки Пушкина и рассказы Носова. Читать онлайн.»',
    isDangerOrFake: false,
    teacherHint: 'Это проверенный официальный ресурс для учебы. Здесь нет требований денег или подозрительных файлов.',
    explanation: 'Это проверенный полезный образовательный сайт для чтения книг.'
  },
];

// Конфиг кейсов из задачи: полный формат cases[] или краткий { claim, isFake, explanation }
export const resolveFakeCases = (task: Task): CaseItem[] => {
  const cfg = task.fakeDetectorConfig;
  if (cfg?.cases?.length) return cfg.cases;
  if (cfg?.claim) {
    return [{
      id: 'case_' + task.id,
      icon: '🕵️',
      title: task.title,
      text: cfg.claim,
      isDangerOrFake: cfg.isFake ?? true,
      teacherHint: task.hint ?? '',
      explanation: cfg.explanation ?? '',
    }];
  }
  return CASES;
};

export const FakeDetectorGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const cases = resolveFakeCases(task);
  const verification=task.fakeDetectorConfig?.decisionMode==='verification';
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {if(timer.current) clearTimeout(timer.current);}, []);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<{ isCorrect: boolean; text: string } | null>(null);
  const [completed, setCompleted] = useState(false);
  const [showRules, setShowRules] = useState(false);
  const [showHint, setShowHint] = useState(false);

  const currentCase = cases[currentIdx];

  const handleAnswer = (choseDangerOrFake: boolean) => {
    const isCorrect = choseDangerOrFake === currentCase.isDangerOrFake;

    if (isCorrect) {
      playSound('hit');
      setScore(prev => prev + 1);
      setFeedback({
        isCorrect: true,
        text: `Верно! 🕵️ ${currentCase.explanation}`
      });
    } else {
      playSound('error');
      setFeedback({
        isCorrect: false,
        text: `Ой, будь осторожен! 🧐 ${currentCase.explanation}`
      });
    }
  };

  const handleNext = () => {
    if (!feedback?.isCorrect || completed) return;
    playSound('click');
    setFeedback(null);
    setShowHint(false);
    if (currentIdx + 1 < cases.length) {
      setCurrentIdx(prev => prev + 1);
    } else {
      playSound('success');
      setCompleted(true);
      timer.current = setTimeout(() => {
        onComplete();
      }, 1500);
    }
  };

  const handleReset = () => {
    if(timer.current) clearTimeout(timer.current);
    setCurrentIdx(0);
    setScore(0);
    setFeedback(null);
    setCompleted(false);
    setShowHint(false);
  };

  return (
    <div className="ui-trainer-family safety-workshop workshop-legacy h-full flex flex-col bg-slate-950 p-4 select-none text-white overflow-y-auto">
      {/* Header Banner */}
      <div className="workshop-banner flex flex-wrap items-center justify-between bg-slate-900/90 border-2 border-emerald-500/40 p-3 md:p-4 rounded-2xl mb-4 shadow-lg gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🕵️‍♂️
          </div>
          <div>
            <h2 className="text-base md:text-xl font-bold text-emerald-300">Кибер-Детектив: Правда или Опасный Фейк?</h2>
            <p className="text-xs text-slate-300">{verification ? 'Изучи сообщение: оно подтверждено или его ещё нужно проверить?' : 'Изучи карточку и реши: это безопасно или это ловушка?'}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {/* Rules Guide Button */}
          <GameButton size="compact"
            onClick={() => setShowRules(!showRules)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl font-bold text-xs transition-all shadow-md ${
              showRules
                ? 'bg-emerald-400 text-black shadow-emerald-400/30'
                : 'bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 hover:bg-emerald-900/80'
            }`}
          >
            <BookOpen size={14} />
            <span>Памятка Детектива</span>
          </GameButton>

          <div className="px-3 py-1.5 bg-emerald-950/80 border border-emerald-500/50 rounded-xl text-emerald-300 font-bold text-xs">
            Дело {currentIdx + 1} из {cases.length}
          </div>

          <GameButton size="compact"
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"
            title="Начать заново"
          >
            <RotateCcw size={16} />
          </GameButton>
        </div>
      </div>

      {/* Rules Guide Panel (Collapsible) */}
      {showRules && (
        <div className="mb-4 bg-gradient-to-r from-emerald-950/90 via-slate-900 to-emerald-950/90 border-2 border-emerald-400/60 p-4 rounded-2xl shadow-2xl relative">
          <GameButton size="compact"
            onClick={() => setShowRules(false)}
            className="absolute top-3 right-3 text-slate-400 hover:text-white p-1 rounded-lg bg-black/40"
          >
            <X size={16} />
          </GameButton>

          <div className="flex items-center gap-2 font-bold text-emerald-300 text-sm mb-2">
            <span>🛡️</span> 4 Золотых Закона Безопасности в Интернете:
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
            <div className="p-2.5 bg-slate-900/80 border border-emerald-500/30 rounded-xl">
              <strong className="text-yellow-400 block mb-0.5">🔑 Пароль — личная тайна</strong>
              <p className="text-slate-300 text-[11px]">Никому не говори свой пароль, даже лучшим друзьям или тем, кто представляется администратором игры.</p>
            </div>
            <div className="p-2.5 bg-slate-900/80 border border-emerald-500/30 rounded-xl">
              <strong className="text-rose-400 block mb-0.5">🎁 Бесплатный сыр в мышеловке</strong>
              <p className="text-slate-300 text-[11px]">«Ты выиграл миллион», «Скачай читы» — так мошенники заманивают на опасные вирусы.</p>
            </div>
            <div className="p-2.5 bg-slate-900/80 border border-emerald-500/30 rounded-xl">
              <strong className="text-cyan-400 block mb-0.5">📍 Личные данные под замком</strong>
              <p className="text-slate-300 text-[11px]">Адрес твоего дома, номер школы, телефон родителей — никогда не пиши незнакомцам.</p>
            </div>
            <div className="p-2.5 bg-slate-900/80 border border-emerald-500/30 rounded-xl">
              <strong className="text-purple-400 block mb-0.5">👨‍👩‍👦 Правило 5 секунд: Зови взрослых</strong>
              <p className="text-slate-300 text-[11px]">Если окно пугает, угрожает блокировкой или просит денег — не нажимай ничего, позови родителей!</p>
            </div>
          </div>
        </div>
      )}

      {/* Main Detective Case Area */}
      <div className="flex-1 flex flex-col items-center justify-center max-w-xl mx-auto w-full">
        {/* The Card */}
        <div className="w-full bg-slate-900 border-2 border-slate-700 rounded-3xl p-5 md:p-6 shadow-2xl relative overflow-hidden mb-6">
          <div className="fake-clue-heading flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2.5 bg-slate-800 rounded-2xl">{currentCase.icon}</span>
              <div>
                <div className="text-xs uppercase font-bold text-slate-400 tracking-wider">Улика #{currentIdx + 1}</div>
                <h3 className="text-base md:text-lg font-bold text-white">{currentCase.title}</h3>
              </div>
            </div>

            {/* Clue button */}
            {!feedback && (
              <GameButton size="compact"
                onClick={() => setShowHint(!showHint)}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-semibold transition-all ${
                  showHint ? 'bg-cyan-400 text-black' : 'bg-slate-800 text-cyan-300 hover:bg-slate-700'
                }`}
              >
                <HelpCircle size={14} />
                <span>{showHint ? 'Скрыть совет' : 'Совет Учителя'}</span>
              </GameButton>
            )}
          </div>

          {/* Teacher Clue Banner */}
          {showHint && !feedback && currentCase.teacherHint && (
            <div className="p-3 mb-4 bg-cyan-950/60 border border-cyan-400/40 rounded-xl text-xs text-cyan-200 animate-fadeIn">
              Проверь источник, дату, доказательства и просьбы в сообщении. Выбери ответ по этим признакам.
            </div>
          )}

          <div className="bg-slate-950/90 border border-slate-800 rounded-2xl p-5 mb-6 text-sm md:text-base leading-relaxed text-slate-200">
            {currentCase.text}
          </div>

          {/* Feedback section if answered */}
          {feedback ? (
            <div className={`p-4 rounded-2xl border mb-4 ${
              feedback.isCorrect
                ? 'bg-emerald-950/80 border-emerald-500 text-emerald-200'
                : 'bg-rose-950/80 border-rose-500 text-rose-200'
            }`}>
              <div className="font-bold text-sm mb-1">
                {feedback.isCorrect ? '✅ ПРАВИЛЬНЫЙ ВЕРДИКТ!' : '❌ ОШИБКА ДЕТЕКТИВА!'}
              </div>
              <p className="text-xs leading-relaxed">{feedback.text}</p>

              <GameButton size="compact"
                onClick={() => feedback.isCorrect ? handleNext() : setFeedback(null)}
                className="mt-3 w-full py-2.5 bg-white text-black font-bold uppercase rounded-xl text-xs hover:bg-slate-200 transition-colors shadow-lg"
              >
                {!feedback.isCorrect ? 'Попробовать ещё раз' : currentIdx + 1 < cases.length ? 'СЛЕДУЮЩЕЕ ДЕЛО ➡️' : 'ЗАВЕРШИТЬ РАССЛЕДОВАНИЕ 🏆'}
              </GameButton>
            </div>
          ) : (
            /* Action Buttons */
            <div className="grid grid-cols-2 gap-4">
              <GameButton size="compact"
                onClick={() => handleAnswer(true)}
                className="py-3.5 px-4 bg-rose-600 hover:bg-rose-500 text-white rounded-2xl font-bold uppercase text-xs md:text-sm flex flex-col items-center justify-center gap-2 shadow-lg shadow-rose-600/30 active:scale-95 transition-all"
              >
                <ShieldAlert size={28} />
                <span>{verification ? 'Нужна проверка' : '🚨 ФЕЙК / ОПАСНО!'}</span>
              </GameButton>

              <GameButton size="compact"
                onClick={() => handleAnswer(false)}
                className="py-3.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl font-bold uppercase text-xs md:text-sm flex flex-col items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 active:scale-95 transition-all"
              >
                <ShieldCheck size={28} />
                <span>{verification ? 'Есть подтверждение' : '🛡️ ПРАВДА / БЕЗОПАСНО'}</span>
              </GameButton>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
