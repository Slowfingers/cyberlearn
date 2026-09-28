import React, { useState, useEffect, useCallback } from 'react';
import {
  Volume2,
  VolumeX,
  Sparkles,
  Lightbulb,
  ArrowRight,
  ArrowLeft,
  Smile,
  Award
} from 'lucide-react';
import { Task } from '../types';
import { COSMETICS } from '../constants';
import { playSound } from '../utils/sound';
import {
  cleanLessonTitle,
  stripStandardsPrefix,
  extractTheoryBlocks,
  groupTheoryBlocks,
  decodeEntities,
  TheoryBlock
} from '../utils/theoryText';
import { BigCharacter3D, MascotSkin, MascotMood, MascotGesture } from './BigCharacter3D';

interface BigMascotTheoryStoryProps {
  task: Task;
  onStartPractice: () => void;
  onCompleteTheory?: () => void;
  /** id экипированного предмета-скина из магазина (equipped.mascotSkin) */
  mascotSkinItemId?: string;
  /** цель практики из getTaskPracticeGoal (передаётся родителем, чтобы не тянуть StudentDashboard) */
  practiceGoal?: string;
}

type StepDef =
  | { kind: 'intro' }
  | { kind: 'theory'; blocks: TheoryBlock[] }
  | { kind: 'ready' };

export interface StoryContent {
  title: string;
  intro: string;
  theoryGroups: TheoryBlock[][];
  demoType?: 'logic_gate';
}

// Наставник рассказывает теорию ЭТОГО урока (task.theory), а не шаблон по ключевым словам.
export function getStoryContent(task: Task): StoryContent {
  const title = cleanLessonTitle(decodeEntities(task.title));
  const description = decodeEntities(stripStandardsPrefix(task.description || ''));
  const intro = description
    ? `Привет! Сегодня разбираем тему «${title}». ${description}`
    : `Привет! Сегодня разбираем тему «${title}».`;

  const theoryGroups = groupTheoryBlocks(extractTheoryBlocks(task.theory));

  // Интерактивное демо — только если оно соответствует фактическому типу задачи.
  const demoType: StoryContent['demoType'] =
    task.type === 'circuit_builder' || task.type === 'circuit' ? 'logic_gate' : undefined;

  return { title, intro, theoryGroups, demoType };
}

const VALID_SKINS: MascotSkin[] = ['sparky', 'astro', 'cat', 'prof'];

export const BigMascotTheoryStory: React.FC<BigMascotTheoryStoryProps> = ({
  task,
  onStartPractice,
  mascotSkinItemId,
  practiceGoal
}) => {
  const story = getStoryContent(task);

  // Скин только читается: магазин (equipped.mascotSkin) -> localStorage -> 'sparky'
  const skin: MascotSkin = (() => {
    const equippedValue = mascotSkinItemId
      ? COSMETICS.find(c => c.id === mascotSkinItemId && c.type === 'mascotSkin')?.value
      : undefined;
    if (equippedValue && VALID_SKINS.includes(equippedValue as MascotSkin)) {
      return equippedValue as MascotSkin;
    }
    const saved = typeof window !== 'undefined' ? localStorage.getItem('cyber_mascot_skin') : null;
    if (saved === 'clippy') return 'sparky';
    if (saved && VALID_SKINS.includes(saved as MascotSkin)) return saved as MascotSkin;
    return 'sparky';
  })();

  const steps: StepDef[] = [
    { kind: 'intro' },
    ...story.theoryGroups.map((blocks): StepDef => ({ kind: 'theory', blocks })),
    { kind: 'ready' }
  ];
  const lastStep = steps.length - 1;

  const [currentStep, setCurrentStep] = useState<number>(0);
  const currentStepDef = steps[Math.min(currentStep, lastStep)];

  const [mood, setMood] = useState<MascotMood>('happy');
  const [gesture, setGesture] = useState<MascotGesture>('point_cloud');

  // Audio / Speech Synthesis
  const [isSpeaking, setIsSpeaking] = useState<boolean>(false);
  const [isVoiceSupported, setIsVoiceSupported] = useState<boolean>(false);

  // Logic gate mini-demo state (только для circuit_builder / circuit)
  const [gateA, setGateA] = useState<boolean>(false);
  const [gateB, setGateB] = useState<boolean>(false);
  const [gateType, setGateType] = useState<'AND' | 'OR' | 'XOR'>('AND');

  // Check speech synthesis support
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsVoiceSupported(true);
    }
  }, []);

  // Reset on task change
  useEffect(() => {
    setCurrentStep(0);
  }, [task.id]);

  // Update mood and gesture based on current step
  useEffect(() => {
    const kind = currentStepDef.kind;
    if (kind === 'intro') {
      setMood('happy');
      setGesture('point_cloud');
    } else if (kind === 'theory') {
      setMood('curious');
      setGesture('point_cloud');
    } else {
      setMood('celebrate');
      setGesture('thumbs_up');
    }
  }, [currentStep, currentStepDef.kind]);

  // Read aloud helper using Web Speech API
  const speakCurrentText = useCallback((textToSpeak: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }

    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(textToSpeak);
    utterance.lang = 'ru-RU';
    utterance.rate = 1.0;
    utterance.pitch = skin === 'sparky' ? 1.2 : skin === 'astro' ? 1.1 : skin === 'cat' ? 1.3 : 0.95;

    const voices = window.speechSynthesis.getVoices();
    const ruVoice = voices.find(v => v.lang.startsWith('ru'));
    if (ruVoice) {
      utterance.voice = ruVoice;
    }

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  }, [isSpeaking, skin]);

  const handleNextStep = () => {
    playSound('click');
    if (currentStep < lastStep) {
      setCurrentStep(prev => prev + 1);
    } else {
      onStartPractice();
    }
  };

  const handlePrevStep = () => {
    playSound('click');
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const getGateOutput = () => {
    if (gateType === 'AND') return gateA && gateB;
    if (gateType === 'OR') return gateA || gateB;
    if (gateType === 'XOR') return gateA !== gateB;
    return false;
  };

  // Get current active narration text for speech synthesis
  const getCurrentSpeechText = () => {
    if (currentStepDef.kind === 'intro') return story.intro;
    if (currentStepDef.kind === 'theory') return currentStepDef.blocks.map(b => b.text).join(' ');
    return 'Отличная работа! Теперь переходим к практическому заданию!';
  };

  const stepTitle = (() => {
    if (currentStepDef.kind === 'intro') return '🌟 О чём этот урок';
    if (currentStepDef.kind === 'theory') return '📖 Разбираем теорию';
    return '🚀 Ты готов к практике!';
  })();

  const mascotName = skin === 'sparky' ? 'Байтик' : skin === 'cat' ? 'Нео-Кот' : skin === 'astro' ? 'Астро-Бот' : 'Профессор';
  const mascotStatus = skin === 'sparky' ? 'Байтик онлайн' : skin === 'cat' ? 'Нео-Кот слушает' : skin === 'astro' ? 'Астро-Бот на связи' : 'Профессор на связи';

  const isLastTheoryStep = currentStepDef.kind === 'theory' && currentStep === story.theoryGroups.length;
  // Единая восьмифазная дуга делает урок предсказуемым для ребёнка: история,
  // понятие, разбор, короткая передышка, новый пример, лаборатория, вспоминание, награда.
  // Этапы 6–8 продолжаются уже в практическом тренажёре и на экране победы.
  const phaseLabels = ['Завязка', 'Аналогия', 'Механизм', 'Передышка', 'Поворот', 'Лаборатория', 'Синтез', 'Победа'];
  const currentPhase = currentStepDef.kind === 'intro'
    ? 0
    : currentStepDef.kind === 'ready'
      ? 5
      : Math.min(4, 1 + Math.floor(((currentStep - 1) / Math.max(story.theoryGroups.length, 1)) * 4));

  return (
    <div className="w-full flex flex-col space-y-6">

      <div className="rounded-2xl border border-cyber-neonBlue/25 bg-slate-950/80 px-3 py-3" aria-label={`Этап урока: ${phaseLabels[currentPhase]}`}>
        <div className="mb-2 flex items-center justify-between font-mono text-[10px] uppercase tracking-wider">
          <span className="text-cyber-neonBlue">Маршрут урока</span>
          <span className="text-slate-400">Этап {currentPhase + 1} из 8: {phaseLabels[currentPhase]}</span>
        </div>
        <ol className="grid grid-cols-4 gap-1 sm:grid-cols-8" aria-label="Восемь этапов урока">
          {phaseLabels.map((label, index) => (
            <li key={label} className="min-w-0">
              <div className={`h-1.5 rounded-full transition-colors ${index < currentPhase ? 'bg-cyber-neonGreen' : index === currentPhase ? 'bg-cyber-neonBlue animate-pulse' : 'bg-slate-800'}`} />
              <span className={`mt-1 block truncate text-[9px] ${index === currentPhase ? 'font-bold text-cyan-200' : 'text-slate-500'}`} title={label}>{index + 1}. {label}</span>
            </li>
          ))}
        </ol>
      </div>

      {/* =================================================================== */}
      {/* TOP COMPACT CONTROL BAR (AUDIO + PRACTICE SHORTCUT)                 */}
      {/* =================================================================== */}
      <div className="flex flex-wrap items-center justify-end gap-3 p-3.5 bg-gray-900/90 border border-gray-800 rounded-2xl">
        <div className="flex items-center gap-3">
          {/* Read Aloud Button */}
          {isVoiceSupported && (
            <button
              onClick={() => speakCurrentText(getCurrentSpeechText())}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold flex items-center gap-2 border transition-all ${
                isSpeaking
                  ? 'bg-cyber-neonYellow text-black border-cyber-neonYellow shadow-[0_0_15px_rgba(252,238,10,0.5)] animate-pulse'
                  : 'bg-black text-gray-300 border-gray-700 hover:text-cyber-neonYellow hover:border-cyber-neonYellow'
              }`}
              title="Озвучить слова персонажа"
            >
              {isSpeaking ? <VolumeX size={14} /> : <Volume2 size={14} />}
              <span>{isSpeaking ? 'Остановить' : 'Озвучить'}</span>
            </button>
          )}

          {/* Practice Fast Forward Button */}
          <button
            onClick={onStartPractice}
            className="px-3.5 py-1.5 bg-cyber-neonGreen text-black text-xs font-bold font-mono uppercase rounded-xl hover:bg-white transition-all shadow-[0_0_12px_rgba(0,255,65,0.3)] flex items-center gap-1.5"
          >
            <span>К коду</span>
            <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* =================================================================== */}
      {/* MAIN STAGE: BIG 3D CHARACTER + EXPANDED COMIC SPEECH CLOUD          */}
      {/* =================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">

        {/* ----------------------------------------------------------------- */}
        {/* LEFT / CENTER: THE BIG ANIMATED 3D CHARACTER                      */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-4 flex flex-col items-center justify-center p-4 bg-gray-950/80 border border-cyber-neonGreen/30 rounded-3xl relative overflow-hidden group">
          {/* Character Title / Status Badge */}
          <div className="w-full flex items-center justify-between mb-2 px-2">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-cyber-neonGreen animate-ping" />
              <span className="text-[11px] font-mono font-bold text-cyber-neonGreen uppercase tracking-wider">
                {mascotStatus}
              </span>
            </div>
          </div>

          {/* THE BIG CHARACTER COMPONENT */}
          <div className="my-2 transform group-hover:scale-105 transition-transform duration-300">
            <BigCharacter3D
              skin={skin}
              mood={mood}
              isSpeaking={isSpeaking}
              gesture={gesture}
              onPoke={() => {
                setMood('celebrate');
                setTimeout(() => setMood('happy'), 1200);
              }}
            />
          </div>

          {/* Character Quick Action Pills */}
          <div className="w-full flex items-center justify-center gap-2 mt-4 pt-3 border-t border-gray-800/80">
            <button
              onClick={() => {
                playSound('mascot_pop');
                setMood('wink');
              }}
              className="px-2.5 py-1 bg-black/80 hover:bg-cyber-neonBlue hover:text-black border border-gray-800 text-gray-300 rounded-lg text-[11px] font-mono transition-colors flex items-center gap-1"
            >
              <Smile size={12} />
              <span>Подмигнуть</span>
            </button>
            <button
              onClick={() => {
                playSound('success');
                setMood('celebrate');
              }}
              className="px-2.5 py-1 bg-black/80 hover:bg-cyber-neonYellow hover:text-black border border-gray-800 text-gray-300 rounded-lg text-[11px] font-mono transition-colors flex items-center gap-1"
            >
              <Sparkles size={12} />
              <span>Салют</span>
            </button>
          </div>
        </div>

        {/* ----------------------------------------------------------------- */}
        {/* RIGHT: THE LARGE COMIC SPEECH CLOUD                               */}
        {/* ----------------------------------------------------------------- */}
        <div className="lg:col-span-8 relative flex flex-col">

          {/* SVG Comic Speech Bubble Tail */}
          <div className="hidden lg:block absolute -left-5 top-24 w-6 h-10 pointer-events-none z-20">
            <svg viewBox="0 0 24 40" className="w-full h-full filter drop-shadow-[-4px_0_6px_rgba(0,255,65,0.3)]">
              <polygon points="24,0 0,20 24,40" fill="#090d16" stroke="#00ff41" strokeWidth="2.5" />
            </svg>
          </div>

          {/* Speech Bubble Container */}
          <div className="w-full bg-gradient-to-br from-gray-900/95 via-black to-gray-950 border-2 border-cyber-neonGreen/60 rounded-3xl p-6 md:p-8 shadow-[0_10px_35px_rgba(0,255,65,0.15)] relative flex flex-col min-h-[440px]">

            {/* Top Cloud Header: Step indicator, Name Tag */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-5 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-2xl bg-cyber-neonGreen/20 border border-cyber-neonGreen flex items-center justify-center text-cyber-neonGreen font-bold">
                  {currentStep + 1}
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-widest text-cyber-neonGreen font-bold flex items-center gap-1.5">
                    <span>{mascotName} говорит:</span>
                    {isSpeaking && (
                      <span className="flex items-center gap-0.5 px-1.5 py-0.5 bg-cyber-neonYellow text-black rounded text-[9px] font-bold animate-pulse">
                        <Volume2 size={10} /> Голос
                      </span>
                    )}
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-white">
                    {stepTitle}
                  </h3>
                </div>
              </div>

              {/* Step Progress Dots */}
              <div className="flex items-center gap-1.5 bg-black/60 px-3 py-1.5 rounded-full border border-gray-800">
                {steps.map((s, idx) => (
                  <button
                    key={idx}
                    onClick={() => { playSound('click'); setCurrentStep(idx); }}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      currentStep === idx
                        ? 'bg-cyber-neonGreen scale-125 shadow-[0_0_8px_#00ff41]'
                        : idx < currentStep
                        ? 'bg-cyan-500'
                        : 'bg-gray-700 hover:bg-gray-500'
                    }`}
                    title={`Шаг ${idx + 1}`}
                  />
                ))}
              </div>
            </div>

            {/* ------------------------------------------------------------- */}
            {/* SPEECH NARRATIVE BODY                                         */}
            {/* ------------------------------------------------------------- */}
            <div className="flex-1 flex flex-col justify-between space-y-6">

              {/* STEP: INTRO */}
              {currentStepDef.kind === 'intro' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-gray-900/80 border border-gray-800 text-gray-100 text-sm md:text-base leading-relaxed">
                    <p>{story.intro}</p>
                  </div>
                </div>
              )}

              {/* STEP: THEORY BLOCKS (из task.theory) */}
              {currentStepDef.kind === 'theory' && (
                <div className="space-y-4 text-sm md:text-base leading-relaxed text-gray-100 [&_code]:text-cyan-300 [&_code]:font-mono">
                  {currentStepDef.blocks.map((block, bIdx) => (
                    <div key={bIdx} dangerouslySetInnerHTML={{ __html: block.html }} />
                  ))}

                  {/* LIVE INTERACTIVE MINI-WIDGET — только на последнем шаге теории и только для схем */}
                  {isLastTheoryStep && story.demoType === 'logic_gate' && (
                    <div className="p-4 rounded-xl bg-black border border-cyber-neonGreen/40 flex flex-col gap-3">
                      <div className="flex items-center justify-between text-xs font-mono text-cyber-neonGreen uppercase font-bold">
                        <span>Попробуй сам: Вентиль {gateType}</span>
                        <div className="flex gap-1">
                          {(['AND', 'OR', 'XOR'] as const).map(type => (
                            <button
                              key={type}
                              onClick={() => { playSound('click'); setGateType(type); }}
                              className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                gateType === type ? 'bg-cyber-neonGreen text-black' : 'bg-gray-800 text-gray-300'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="flex items-center justify-around py-2">
                        <button
                          onClick={() => { playSound('click'); setGateA(!gateA); }}
                          className={`px-4 py-2 rounded-xl font-mono font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                            gateA ? 'bg-cyber-neonGreen text-black shadow-[0_0_15px_#00ff41]' : 'bg-gray-800 text-gray-400'
                          }`}
                        >
                          <span>Вход A: {gateA ? '1 (ВКЛ)' : '0 (ВЫКЛ)'}</span>
                          <span className="text-[10px] opacity-80">Жми переключить</span>
                        </button>

                        <span className="text-base font-bold font-mono text-gray-400">+</span>

                        <button
                          onClick={() => { playSound('click'); setGateB(!gateB); }}
                          className={`px-4 py-2 rounded-xl font-mono font-bold text-xs flex flex-col items-center gap-1 transition-all ${
                            gateB ? 'bg-cyber-neonGreen text-black shadow-[0_0_15px_#00ff41]' : 'bg-gray-800 text-gray-400'
                          }`}
                        >
                          <span>Вход B: {gateB ? '1 (ВКЛ)' : '0 (ВЫКЛ)'}</span>
                          <span className="text-[10px] opacity-80">Жми переключить</span>
                        </button>

                        <span className="text-base font-bold font-mono text-gray-400">=</span>

                        <div className={`flex flex-col items-center gap-1 p-3 rounded-xl border ${
                          getGateOutput()
                            ? 'bg-cyber-neonYellow/20 border-cyber-neonYellow text-cyber-neonYellow shadow-[0_0_20px_rgba(252,238,10,0.5)]'
                            : 'bg-gray-900 border-gray-800 text-gray-600'
                        }`}>
                          <Lightbulb size={24} className={getGateOutput() ? 'animate-bounce' : ''} />
                          <span className="text-[10px] font-mono font-bold">
                            {getGateOutput() ? 'ЛАМПА ГОРИТ (1)!' : 'ЛАМПА ПОГАСЛА (0)'}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* STEP: READY FOR PRACTICE */}
              {currentStepDef.kind === 'ready' && (
                <div className="space-y-4 text-center py-4">
                  <div className="w-16 h-16 rounded-full bg-cyber-neonGreen/20 border-2 border-cyber-neonGreen flex items-center justify-center text-cyber-neonGreen mx-auto">
                    <Award size={32} />
                  </div>
                  <h4 className="text-lg md:text-xl font-bold text-white">
                    Теория разобрана — пора к практике!
                  </h4>
                  {practiceGoal && (
                    <p className="text-xs md:text-sm text-gray-300 max-w-md mx-auto leading-relaxed">
                      {practiceGoal}
                    </p>
                  )}
                </div>
              )}

              {/* ------------------------------------------------------------- */}
              {/* STEP NAVIGATION (BOTTOM OF SPEECH BUBBLE)                     */}
              {/* ------------------------------------------------------------- */}
              <div className="pt-4 border-t border-gray-800/80 flex items-center justify-between gap-3">
                <div className="text-xs font-mono text-gray-500">
                  Шаг {currentStep + 1} из {steps.length}
                </div>

                <div className="flex items-center gap-2">
                  {currentStep > 0 && (
                    <button
                      onClick={handlePrevStep}
                      className="px-3.5 py-2 rounded-xl bg-black border border-gray-800 text-gray-300 hover:text-white text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                    >
                      <ArrowLeft size={13} />
                      <span>Назад</span>
                    </button>
                  )}

                  {currentStep < lastStep ? (
                    <button
                      onClick={handleNextStep}
                      className="px-5 py-2 rounded-xl bg-cyber-neonGreen text-black font-mono font-bold text-xs uppercase hover:bg-white transition-all shadow-[0_0_15px_rgba(0,255,65,0.4)] flex items-center gap-1.5"
                    >
                      <span>Дальше</span>
                      <ArrowRight size={14} />
                    </button>
                  ) : (
                    <button
                      onClick={onStartPractice}
                      className="px-6 py-2.5 rounded-xl bg-cyber-neonGreen text-black font-mono font-bold text-xs uppercase hover:bg-white transition-all shadow-[0_0_20px_rgba(0,255,65,0.6)] animate-pulse flex items-center gap-2"
                    >
                      <span>Погнали кодить! 🚀</span>
                    </button>
                  )}
                </div>

              </div>

            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
