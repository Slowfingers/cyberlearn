import {GameButton} from './GameUI';
import {PlayerShop, PlayerProfile} from './PlayerPanels';
import { AssessmentPlayer } from './AssessmentPanel';

import React, { useState, useEffect, useRef, useCallback, useMemo, lazy, Suspense } from 'react';
import { COSMETICS, SHOP_COSMETICS, ACHIEVEMENTS, COURSES } from '../constants';
import { Task, ExecutionResult, User, Course, GridEvent } from '../types';
import { terminalLanguage } from '../services/terminal';
import {applyCompletedTasks, nextUnfinishedTask} from '../services/taskProgress';
import { evaluateCodeLocally, shuffledQuiz } from '../services/localEvaluation';
import { getNextLevelThreshold, getAllTasks, getCoursesWithProgress, buyItem, equipItem, saveTaskProgress, getTaskAttempts, saveTaskAttempts, getHiddenCoursesForStudent, getStreak, recordActivity, StreakData } from '../services/mockBackend';
import { fbCompleteTask } from '../services/firebase';
import { rewardMultiplier } from '../services/scoring';
import { stripStandardsPrefix } from '../utils/theoryText';
import ShopAvatar, { STREET_AVATARS } from './ShopAvatar';
import StudentHome from './StudentHome';
import { PracticeSurface } from './PracticeSurface';
import { LessonHeader } from './LessonHeader';
import CyberToast, { ToastMessage } from './CyberToast';
import { Play, RotateCcw, CheckCircle, Lock, BookOpen, Zap, ArrowRight, ChevronLeft, Trophy, X, Bot, Code, Terminal as TerminalIcon, Cpu, Globe, Grid, LayoutList, Eye, Loader2, HelpCircle, ShoppingBag, Coins, BrainCircuit, Puzzle, Award, Flame, Activity, ArrowUpDown, GitBranch, ShieldAlert, Brain, Lightbulb, Folder, Smartphone, ShieldCheck } from 'lucide-react';
import { playSound } from '../utils/sound';
import { startTaskAttempt, recordError, endTaskAttempt, cleanupTracker, initActivityTracking } from '../utils/activityTracker';

// Тренажёры занимают большую часть клиентского кода. Загружаем каждый только тогда,
// когда ребёнок действительно открывает соответствующий урок: быстрее старт на
// школьных ноутбуках и меньше трафика, при этом весь курс остаётся доступен офлайн после загрузки.
const GameGrid = lazy(() => import('./GameGrid'));
const HanoiGame = lazy(() => import('./HanoiGame'));
const BlockCoding = lazy(() => import('./BlockCoding'));
const BigCharacter3D = lazy(() => import('./BigCharacter3D').then(m => ({ default: m.BigCharacter3D })));
const BigMascotTheoryStory = lazy(() => import('./BigMascotTheoryStory').then(m => ({ default: m.BigMascotTheoryStory })));
const TypingGame = lazy(() => import('./interactives/TypingGame').then(m => ({ default: m.TypingGame })));
const ProcessManagerGame = lazy(() => import('./interactives/ProcessManagerGame').then(m => ({ default: m.ProcessManagerGame })));
const SpreadsheetGame = lazy(() => import('./interactives/SpreadsheetGame').then(m => ({ default: m.SpreadsheetGame })));
const SortingGame = lazy(() => import('./interactives/SortingGame').then(m => ({ default: m.SortingGame })));
const BinaryTreeGame = lazy(() => import('./interactives/BinaryTreeGame').then(m => ({ default: m.BinaryTreeGame })));
const PhishingInspectorGame = lazy(() => import('./interactives/PhishingInspectorGame').then(m => ({ default: m.PhishingInspectorGame })));
const NeuronLabGame = lazy(() => import('./interactives/NeuronLabGame').then(m => ({ default: m.NeuronLabGame })));
const NetworkRouteGame = lazy(() => import('./interactives/NetworkRouteGame').then(m => ({ default: m.NetworkRouteGame })));
const FileOrganizerGame = lazy(() => import('./interactives/FileOrganizerGame').then(m => ({ default: m.FileOrganizerGame })));
const BinaryBulbsGame = lazy(() => import('./interactives/BinaryBulbsGame').then(m => ({ default: m.BinaryBulbsGame })));
const WireframeBuilderGame = lazy(() => import('./interactives/WireframeBuilderGame').then(m => ({ default: m.WireframeBuilderGame })));
const FakeDetectorGame = lazy(() => import('./interactives/FakeDetectorGame').then(m => ({ default: m.FakeDetectorGame })));
const CircuitBuilderGame = lazy(() => import('./interactives/CircuitBuilderGame').then(m => ({ default: m.CircuitBuilderGame })));
const AiKidsTrainerGame = lazy(() => import('./interactives/AiKidsTrainerGame').then(m => ({ default: m.AiKidsTrainerGame })));

const LessonLoader: React.FC = () => (
  <div className="flex flex-1 min-h-48 items-center justify-center bg-black text-cyber-neonBlue font-mono text-xs tracking-widest">
    <Loader2 className="mr-3 animate-spin" size={20} /> ЗАГРУЖАЕМ_ЛАБОРАТОРИЮ…
  </div>
);

type MobileTab = 'tasks' | 'code' | 'visual';

// Helper labels for curriculum tasks
export const getTaskTypeLabel = (type: string) => {
  switch (type) {
    case 'grid': return 'Управление роботом';
    case 'quiz': return 'Тест на понимание';
    case 'theory': return 'Теоретический модуль';
    case 'html': return 'Веб-разработка';
    case 'terminal': return 'Кибер-терминал';
    case 'hanoi': return 'Декомпозиция (Башня)';
    case 'blocks': return 'Блочное программирование';
    case 'typing': return 'Клавиатурный тренажер';
    case 'process_manager': return 'Диспетчер процессов';
    case 'spreadsheet': return 'Электронные таблицы';
    case 'sorting': return 'Сортировка кристаллов';
    case 'tree_search': return 'Бинарные деревья';
    case 'phishing_detect': return 'Анализ фишинга';
    case 'ai_neuron': return 'Нейролаборатория';
    case 'network_route': return 'Сетевой маршрут';
    case 'file_organizer': return 'Сортировщик файлов';
    case 'binary_switches':
    case 'binary_bulbs': return 'Двоичные лампочки';
    case 'wireframe_builder': return 'Прототип интерфейса';
    case 'circuit_builder':
    case 'circuit': return 'Сборка микросхем';
    case 'fake_detector': return 'Детектор фейков';
    case 'ai_kids_trainer':
    case 'ai_trainer': return 'Обучение ИИ';
    default: return 'Практическое задание';
  }
};

export const getTaskPracticeGoal = (task: Task) => {
  if (task.lesson) return task.lesson.goal;
  if (task.type === 'file_organizer') {
    return 'Перед тобой откроется рабочий стол с неразобранными файлами (.png, .mp3, .docx, .exe). Ориентируясь на расширение файла, перетащи каждый файл мышкой в подходящую по цвету папку!';
  }
  if (task.type === 'binary_switches' || task.type === 'binary_bulbs') {
    return 'Включай лампочки с весами 8, 4, 2, 1, чтобы получить в сумме число, загаданное компьютером. Потренируйся считать в двоичном коде!';
  }
  if (task.type === 'quiz') {
    return 'Внимательно прочитай контрольный вопрос и выбери правильный ответ, чтобы подтвердить нейросетевой допуск!';
  }
  if (task.type === 'typing') {
    return 'Расположи пальчики на домашнем ряду клавиатуры (ФЫВА ОЛДЖ) и напечатай кодовые команды быстро и без опечаток!';
  }
  if (task.type === 'sorting') {
    return 'Сравнивай соседние кристаллы и меняй их местами пузырьковым методом, чтобы упорядочить ряд по возрастанию энергии!';
  }
  if (task.type === 'hanoi') {
    return 'Перенеси пирамидку деталей робота на третий штырек, соблюдая строгое правило: меньшая деталь всегда должна лежать сверху!';
  }
  if (task.type === 'grid') {
    return 'Составь точную программу для робота, обойди опасные препятствия и лазеры и доведи его до целевого кристалла!';
  }
  if (task.type === 'circuit_builder') {
    return 'Соедини логические вентили (И, ИЛИ, НЕ, XOR) в единую схему, чтобы зажечь сигнальный светодиод питания!';
  }
  if (task.type === 'fake_detector') {
    return 'Исследуй элементы страницы: проверь значок замка, адрес сайта (URL) и ошибки, чтобы защитить систему от подделки!';
  }
  if (task.type === 'ai_kids_trainer') {
    return 'Обучи нейросеть распознавать изображения: разметь обучающие карточки и протестируй точность работы ИИ!';
  }
  if (task.type === 'wireframe_builder') {
    return 'Спроектируй удобный мобильный интерфейс: перетащи блоки кнопок, картинок и текста на макет экрана смартфона!';
  }
  return stripStandardsPrefix(task.description || '');
};

// Фолбэк для 3D-наставника: если BigMascotTheoryStory упал, показываем обычную теорию
class MascotErrorBoundary extends React.Component<{ fallback: React.ReactNode; children: React.ReactNode }, { hasError: boolean }> {
  state = { hasError: false };
  static getDerivedStateFromError() { return { hasError: true }; }
  render() { return this.state.hasError ? this.props.fallback : this.props.children; }
}

interface StudentDashboardProps {
  currentUser: import('../types').User;
}

const StudentDashboard: React.FC<StudentDashboardProps> = ({ currentUser: propUser }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [courses, setCourses] = useState<(Course & { progress: number, totalTasks: number })[]>([]);

  // Navigation State
  const [activeCourseId, setActiveCourseId] = useState<string | null>(null);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [taskTab, setTaskTab] = useState<'info' | 'code' | 'visual'>('info');
  const [showMobileSidebar, setShowMobileSidebar] = useState<boolean>(true);
  // Счётчики провальных попыток: персистентны в localStorage, живут пока задача не сдана.
  // attemptUserId — кому принадлежит текущее состояние attemptCount (защита от записи
  // чужих счётчиков в хранилище нового пользователя между сменой propUser.id и sync-эффектом).
  const attemptUserId = useRef(propUser.id);
  const [attemptCount, setAttemptCount] = useState<Record<string, number>>(() => getTaskAttempts(propUser.id));
  const bumpAttempt = (taskId: string) => {
      setAttemptCount(prev => ({ ...prev, [taskId]: (prev[taskId] || 0) + 1 }));
  };
  const [pendingCompletion, setPendingCompletion] = useState<{task:Task; autoAdvance:boolean} | null>(null);
  const [savingCompletion, setSavingCompletion] = useState(false);
  const rewardedTaskIds = useRef<Set<string>>(new Set());
  const acknowledgedProgress = useRef({userId:propUser.id, ids:new Set(propUser.completedTaskIds ?? [])});
  if(acknowledgedProgress.current.userId !== propUser.id) acknowledgedProgress.current={userId:propUser.id,ids:new Set(propUser.completedTaskIds ?? [])};
  for(const id of propUser.completedTaskIds ?? []) acknowledgedProgress.current.ids.add(id);

  // Profile State
  const [currentUser, setCurrentUser] = useState<User | null>(propUser);

  // Editor State
  const [code, setCode] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>(['> SYSTEM_INIT...', '> CONNECTED.']);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [playerPos, setPlayerPos] = useState<[number, number]>([0,0]);
  const [pathHistory, setPathHistory] = useState<[number, number][]>([]);

  // Lesson stage: 1 = объяснение (Байтик + теория), 2 = практика
  const [lessonStage, setLessonStage] = useState<'explanation' | 'practice'>('explanation');
  // Стадия, которую выставить ПОСЛЕ смены задачи (эффект сброса перезаписывает state)
  const pendingLessonStage = useRef<'explanation' | 'practice'>('explanation');

  // Grid action animation state
  const [activeGridAction, setActiveGridAction] = useState<GridEvent | null>(null);
  const [playerHeading, setPlayerHeading] = useState<'E'|'S'|'W'|'N'>('E');
  const [destroyedObstacles, setDestroyedObstacles] = useState<string[]>([]);

  const [hint, setHint] = useState<string>('');
  const [isHintLoading, setIsHintLoading] = useState(false);
  const [showHintModal, setShowHintModal] = useState(false);

  const [aiFeedback, setAiFeedback] = useState<string>('');
  const [showTheory, setShowTheory] = useState(false);
  const [missionSuccess, setMissionSuccess] = useState(false);

  // Quiz State
  const [quizSelectedOption, setQuizSelectedOption] = useState<number | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizIsCorrect, setQuizIsCorrect] = useState(false);
  const [lastXpAwarded, setLastXpAwarded] = useState(false);

  // Customization & Market
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showMarketModal, setShowMarketModal] = useState(false);

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = useCallback((text: string, type: ToastMessage['type'] = 'info') => {
      setToasts(prev => [...prev, { id: `t_${Date.now()}_${Math.random()}`, text, type }]);
  }, []);
  const dismissToast = useCallback((id: string) => {
      setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Streak / Daily progress
  const [streak, setStreak] = useState<StreakData>(() => getStreak(propUser.id));

  // Live Feed visualization for terminal tasks
  const [liveOutput, setLiveOutput] = useState<{ text: string; type: 'cmd' | 'out' | 'ok' | 'err' | 'info' }[]>([]);
  const [liveOutputReady, setLiveOutputReady] = useState(false);
  const liveOutputRef = useRef<HTMLDivElement>(null);

  const activeTaskIdRef = useRef(activeTask?.id);
  activeTaskIdRef.current = activeTask?.id;
  const editorRef = useRef<HTMLTextAreaElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  // Персист счётчиков попыток: пишем только если attemptCount принадлежит текущему
  // пользователю (иначе sync-эффект ниже подгрузит чужие данные, а этот эффект
  // молча пропустит запись — порядок эффектов важен: этот объявлен первым).
  useEffect(() => {
      if (attemptUserId.current !== propUser.id) return;
      saveTaskAttempts(propUser.id, attemptCount);
  }, [attemptCount, propUser.id]);

  // Смена пользователя без перемонтирования: подгружаем его счётчики
  useEffect(() => {
      if (attemptUserId.current !== propUser.id) {
          attemptUserId.current = propUser.id;
          setAttemptCount(getTaskAttempts(propUser.id));
      }
  }, [propUser.id]);

  useEffect(() => {
      let cancelled = false;
      const refresh = async () => {
          try {
              const allTasks = await getAllTasks(propUser.id);
              const hidden = await getHiddenCoursesForStudent(propUser.id);
              if (cancelled) return;
              for(const task of allTasks) if(task.status==='completed') acknowledgedProgress.current.ids.add(task.id);
              const refreshed=applyCompletedTasks(allTasks,acknowledgedProgress.current.ids);
              setTasks(refreshed);
              setCourses(getCoursesWithProgress(refreshed, hidden));
          } catch { if (!cancelled) addToast('Не удалось загрузить задания. Обновите страницу.', 'error'); }
      };
      void refresh();
      const timer=setInterval(refresh,10000);
      return () => { cancelled = true; clearInterval(timer); };
  }, [propUser.id]);

  const filteredTasks = tasks.filter(t => t.courseId === activeCourseId);
  const modules = Array.from(new Set(filteredTasks.map(t => t.module))) as string[];

  // Sync user from prop when it changes
  useEffect(() => {
    setCurrentUser(propUser);
  }, [propUser]);

  // Initialize activity tracker on mount, cleanup on unmount
  useEffect(() => {
    if (propUser?.id) {
      initActivityTracking(propUser.id);
    }
    return () => {
      cleanupTracker();
    };
  }, [propUser?.id]);

  useEffect(() => {
    // Scroll to bottom of terminal whenever history updates
    if (terminalEndRef.current) {
        terminalEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [terminalHistory]);

  useEffect(() => {
    if (liveOutputRef.current) {
        liveOutputRef.current.scrollTop = liveOutputRef.current.scrollHeight;
    }
  }, [liveOutput]);

  // Ответы квиза перемешиваются детерминированно по id задачи (correctIndex в данных всегда 0)
  const quiz = useMemo(
    () => (activeTask?.type === 'quiz' && activeTask.quizData ? shuffledQuiz(activeTask.id, activeTask.quizData) : null),
    [activeTask?.id]
  );

  useEffect(() => {
    if (!activeTask) return;

    // Reset States
    setLogs([`> СИСТЕМА ГОТОВА. ЦЕЛЬ: ${activeTask.title}`]);
    setHint('');
    setAiFeedback('');
    setMissionSuccess(false);
    setShowTheory(false);
    setLessonStage(pendingLessonStage.current);
    pendingLessonStage.current = 'explanation';
    setActiveGridAction(null);
    setPlayerHeading('E');
    setDestroyedObstacles([]);
    setShowHintModal(false);

    // Specific Task Type Resets
    if (activeTask.type === 'grid' || activeTask.type === 'html') {
        setCode(activeTask.lesson?.starterCode ?? activeTask.initialCode ?? '');
        if (activeTask.mapConfig) {
            setPlayerPos(activeTask.mapConfig.start);
            setPathHistory([activeTask.mapConfig.start]);
        }
    } else if (activeTask.type === 'terminal') {
        setCode(activeTask.lesson?.starterCode ?? activeTask.initialCode ?? '');
        setTerminalHistory(['> Учебный терминал готов. Дополни решение и нажми «Запустить».']);
        setLiveOutput([]);
        setLiveOutputReady(false);
    }

    if (window.innerWidth < 768) {
         if (['grid', 'html', 'terminal'].includes(activeTask.type)) setTaskTab('info');
    }

    // For completed quizzes: show in read-only "already answered" state to prevent XP farming
    if (activeTask.type === 'quiz' && activeTask.status === 'completed') {
        setQuizSubmitted(true);
        setQuizIsCorrect(true);
        setQuizSelectedOption(quiz?.correctIndex ?? null);
    } else {
        setQuizSelectedOption(null);
        setQuizSubmitted(false);
        setQuizIsCorrect(false);
    }

  }, [activeTask]);

  // Separate effect for tracking task attempts
  useEffect(() => {
    if (currentUser && activeTask && ['grid', 'html', 'terminal', 'quiz'].includes(activeTask.type)) {
        startTaskAttempt(activeTask.id, currentUser.id);
    }
  }, [activeTask?.id, currentUser?.id]);

  const handleRunCode = async () => {
    if (isRunning || !activeTask) return;
    if (!['grid', 'html', 'terminal'].includes(activeTask.type)) return;

    playSound('click');
    setIsRunning(true);
    setMissionSuccess(false);

    // On Mobile, switch to Visual tab to see result
    if (window.innerWidth < 768) {
        setTaskTab('visual');
    }

    setLogs(['> ИНИЦИАЛИЗАЦИЯ...']);
    if (activeTask.mapConfig) {
        setPlayerPos(activeTask.mapConfig.start);
        setPathHistory([activeTask.mapConfig.start]);
        setDestroyedObstacles([]);
        setActiveGridAction(null);
        setPlayerHeading('E');
    }

    const runTaskId = activeTask.id;
    const stillActive = () => activeTaskIdRef.current === runTaskId;
    const currentInput = code;
    if (activeTask.type === 'terminal') {
        setTerminalHistory(prev => [...prev, '$ EXECUTE SCRIPT...']);
        setLiveOutput([]);
        setLiveOutputReady(false);
    }

    // --- INSTANT LOCAL CHECK ---
    let result: ExecutionResult;
    try { result = await evaluateCodeLocally(currentInput, activeTask); }
    catch { result = { success: false, logs: [], steps: [], error: 'Не удалось выполнить проверку. Повторите попытку.' }; }
    if (!stillActive()) { setIsRunning(false); return; }

    // Grid animation: события move/jump/attack, иначе просто путь
    if (result.gridEvents && result.gridEvents.length > 0) {
        for (let i = 0; i < result.gridEvents.length; i++) {
            if (!stillActive()) { setIsRunning(false); return; }
            const event = result.gridEvents[i];
            setActiveGridAction(event);
            if(event.heading)setPlayerHeading(event.heading);

            if (event.type === 'move') {
                await new Promise(r => setTimeout(r, 200));
                setPlayerPos([event.x, event.y]);
                setPathHistory(prev => [...prev, [event.x, event.y]]);
            } else if (event.type === 'jump') {
                await new Promise(r => setTimeout(r, 400));
                setPlayerPos([event.x, event.y]);
                setPathHistory(prev => [...prev, [event.x, event.y]]);
            } else if (event.type === 'turn') {
                await new Promise(r => setTimeout(r, 350));
            } else if (event.type === 'attack') {
                await new Promise(r => setTimeout(r, 300));
                const targetKey = `${event.targetX},${event.targetY}`;
                const isObstacle = activeTask.mapConfig?.obstacles.some(o => o[0] === event.targetX && o[1] === event.targetY);
                if (isObstacle) {
                    setDestroyedObstacles(prev => [...prev, targetKey]);
                }
            }

            setActiveGridAction(null);
            await new Promise(r => setTimeout(r, 100));
        }
    } else if (result.steps && result.steps.length > 0) {
        for (let i = 0; i < result.steps.length; i++) {
            await new Promise(r => setTimeout(r, 200));
            const step = result.steps[i];
            setPlayerPos([step[0], step[1]]);
            setPathHistory(prev => [...prev, [step[0], step[1]]]);
        }
    }

    if (result.terminalOutput) {
        setTerminalHistory(prev => [...prev, result.terminalOutput || '']);
    }

    if (result.logs) {
        setLogs(prev => [...prev, ...result.logs]);
    }

    // --- LIVE FEED ANIMATION for terminal tasks ---
    if (activeTask.type === 'terminal') {
        const lines: { text: string; type: 'cmd' | 'out' | 'ok' | 'err' | 'info' }[] = [];
        // Show code lines as commands
        const codeLines = currentInput.split('\n').filter(l => l.trim() && !l.trim().startsWith('#'));
        codeLines.forEach(l => lines.push({ text: l.trim(), type: 'cmd' }));
        // Show output
        if (result.terminalOutput) {
            result.terminalOutput.split('\n').forEach(l => {
                if (l.trim()) lines.push({ text: l, type: 'out' });
            });
        }
        // Show result status
        if (result.success) {
            lines.push({ text: '─────────────────────', type: 'info' });
            lines.push({ text: '✓ ЗАДАЧА ВЫПОЛНЕНА', type: 'ok' });
        } else {
            lines.push({ text: '─────────────────────', type: 'info' });
            lines.push({ text: `✗ ${result.error || 'Ошибка'}`, type: 'err' });
        }
        // Animate lines one by one
        for (let i = 0; i < lines.length; i++) {
            await new Promise(r => setTimeout(r, 80));
            setLiveOutput(prev => [...prev, lines[i]]);
        }
        setLiveOutputReady(true);
    }

    if (!stillActive()) { setIsRunning(false); return; }
    if (result.success) {
        setLogs(prev => [...prev, '>>> ЦЕЛЬ ДОСТИГНУТА. ПРОТОКОЛ ЗАВЕРШЕН <<<']);
        setMissionSuccess(true);
        playSound('success');
        if (currentUser) {
            await endTaskAttempt(currentUser.id, true);
        }
        await handleTaskCompletion(activeTask);
    } else {
        const errorMsg = result.error || 'Ошибка исполнения';
        setLogs(prev => [...prev, `[ОШИБКА]: ${errorMsg}`]);
        playSound('error');
        recordError();
        if (result.feedback) setAiFeedback(result.feedback);
        // Save failed attempt to Firebase and start new attempt for next try
        if (currentUser) {
            await endTaskAttempt(currentUser.id, false);
            startTaskAttempt(activeTask.id, currentUser.id);
        }
        // Increment persistent attempt counter on failure
        bumpAttempt(activeTask.id);
    }

    setIsRunning(false);
  };

  const handleQuizSubmit = async () => {
      if (!activeTask || activeTask.type !== 'quiz' || quizSelectedOption === null) return;

      const isCorrect = quizSelectedOption === quiz?.correctIndex;
      setQuizSubmitted(true);
      setQuizIsCorrect(isCorrect);

      if (isCorrect) {
          playSound('success');
          if (currentUser) {
              await endTaskAttempt(currentUser.id, true);
          }
          // Don't auto-advance instantly on quiz so user can see "Correct" state
          await handleTaskCompletion(activeTask, false);
      } else {
          playSound('error');
          recordError();
          if (currentUser) {
              await endTaskAttempt(currentUser.id, false);
              startTaskAttempt(activeTask.id, currentUser.id);
          }
          // Increment persistent attempt counter on wrong answer
          bumpAttempt(activeTask.id);
      }
  };

  const handleQuizRetry = () => {
      setQuizSubmitted(false);
      setQuizIsCorrect(false);
      setQuizSelectedOption(null);
      playSound('click');
  };

  const handleTheoryComplete = async () => {
      playSound('success');
      if (activeTask) {
          await handleTaskCompletion(activeTask, true); // Auto-advance
      }
  };

  const handleTaskCompletion = async (task: Task, autoAdvance = false) => {
      if (!currentUser || rewardedTaskIds.current.has(task.id)) return;
      rewardedTaskIds.current.add(task.id);
      setSavingCompletion(true);
      try {
          const { user: savedUser, awarded } = await fbCompleteTask(task.id, attemptCount[task.id] || 0);
          setPendingCompletion(null);
          if (activeTaskIdRef.current === task.id) {
              setMissionSuccess(true);
              if (task.type === 'quiz') { setQuizSubmitted(true); setQuizIsCorrect(true); }
          }
          setCurrentUser(savedUser);
          setLastXpAwarded(awarded);
          for(const id of savedUser.completedTaskIds ?? []) acknowledgedProgress.current.ids.add(id);
          const updatedTasks = applyCompletedTasks(tasks,acknowledgedProgress.current.ids);
          const next = nextUnfinishedTask(updatedTasks,task);
          if (next?.status === 'locked') next.status = 'open';
          setTasks(updatedTasks);
          setCourses(previous => getCoursesWithProgress(updatedTasks, COURSES.filter(c => !previous.some(p => p.id === c.id)).map(c => c.id)));
          const progressMap: Record<string, 'open' | 'completed' | 'locked'> = {};
          updatedTasks.forEach(t => { progressMap[t.id] = t.status; });
          saveTaskProgress(currentUser.id, progressMap);
          if (awarded) {
              const localStreak = recordActivity(currentUser.id);
              setStreak({ ...localStreak, currentStreak:savedUser.streak || 0, lastActiveDate:savedUser.lastActiveDate || localStreak.lastActiveDate });
              for (const id of savedUser.achievements || []) {
                  if (!currentUser.achievements?.includes(id)) {
                      const achievement = ACHIEVEMENTS.find(a => a.id === id);
                      if (achievement) addToast(`🏆 ${achievement.title}`, 'success');
                  }
              }
          }
          if (autoAdvance) {
              setActiveTask(next || null);
              if (!next) { setActiveCourseId(null); setShowMobileSidebar(true); }
          }
      } catch {
          setPendingCompletion({task,autoAdvance});
          setMissionSuccess(false);
          setQuizSubmitted(false);
          addToast('Результат не сохранён. Проверьте соединение и повторите отправку.', 'error');
      } finally { rewardedTaskIds.current.delete(task.id); setSavingCompletion(false); }
  };

  const handleBuyItem = async (itemId: string) => {
      if (!currentUser) return;
      const res = await buyItem(currentUser.id, itemId);
      if (res.success && res.user) {
          setCurrentUser(res.user);
          playSound('success');
          const item = COSMETICS.find(c => c.id === itemId);
          addToast(`${item?.name || 'Предмет'} приобретён!`, 'success');
      } else {
          playSound('error');
          throw new Error(res.error || 'Не удалось купить предмет');
      }
  };

  const handleEquipItem = async (itemId: string) => {
      if (!currentUser) return;
      let res;
      try { res = await equipItem(currentUser.id, itemId); }
      catch { throw new Error("Не удалось сохранить выбранный предмет"); }
      if (res.success && res.user) {
          setCurrentUser(res.user);
          playSound('click');
      } else { throw new Error(res.error || 'Не удалось выбрать предмет'); }
  };

  const handleNextTask = () => {
    if (!activeTask) return;
    const nextTask = nextUnfinishedTask(applyCompletedTasks(tasks,acknowledgedProgress.current.ids),activeTask);
    if (nextTask) {
        setActiveTask(nextTask);
        if (window.innerWidth < 768) {
             if (['grid', 'html', 'terminal'].includes(nextTask.type)) setTaskTab('info');
        }
        playSound('open');
    } else {
        // Course Done? Just return to menu
        setActiveTask(null);
        setActiveCourseId(null);
        setShowMobileSidebar(true);
        playSound('open');
    }
  };

  const handleGetHint = async () => {
      if (!activeTask) return;
      playSound('click');
      setIsHintLoading(true);
      setShowHintModal(true);
      // Локальная подсказка на основе типа задачи
      let newHint = '';
      if (activeTask.type === 'terminal') {
          const language = terminalLanguage(activeTask);
          newHint = language === 'python' ? '💡 Проверь вычисления и отступы. Используй print() для вывода результата.' : language === 'javascript' ? '💡 Проверь вычисления и используй console.log() для вывода результата.' : language === 'sql' ? '💡 Проверь таблицу, выбранные столбцы и условия SQL-запроса.' : '💡 Выполняй команды по порядку в учебной файловой системе. Проверь имена файлов и параметры.';
      } else if (activeTask.type === 'html') {
          newHint = `💡 Подсказка: Убедись, что все CSS-свойства написаны правильно. Проверь селекторы.`;
      } else if (activeTask.type === 'grid') {
          newHint = `💡 Подсказка: Спланируй маршрут от старта до финиша, избегая препятствий.`;
      } else {
          newHint = `💡 Подсказка: Внимательно прочитай описание задачи и проверь свой код.`;
      }
      setHint(newHint);
      setIsHintLoading(false);
  };

  const insertCommand = (cmd: string) => {
      playSound('type');
      setCode(prev => {
        const last = prev.trimEnd().split('\n').at(-1) ?? '';
        const indent = last.match(/^\s*/)?.[0] ?? '';
        const prefix = activeTask?.type === 'grid' ? indent + (last.trim().endsWith(':') ? '    ' : '') : '';
        const command = activeTask?.type === 'grid' ? cmd.replace(/range\(\d+\)/, 'range()') : cmd;
        return prev.trimEnd() + (prev.trim() ? '\n' : '') + prefix + command;
      });
  };

  const getIcon = (name: string) => {
      switch(name) {
          case 'Cpu': return <Cpu size={24} />;
          case 'Terminal': return <TerminalIcon size={24} />;
          case 'Globe': return <Globe size={24} />;
          case 'BrainCircuit': return <BrainCircuit size={24} />;
          default: return <Grid size={24} />;
      }
  };

  // Gamification Calc
  const currentXP = currentUser?.xp || 0;
  const currentLevel = currentUser?.level || 1;
  const nextLevelXP = getNextLevelThreshold(currentLevel);
  const prevLevelXP = getNextLevelThreshold(currentLevel - 1);
  const progressPercent = Math.min(100, Math.max(0, ((currentXP - (currentLevel === 1 ? 0 : prevLevelXP)) / (nextLevelXP - (currentLevel === 1 ? 0 : prevLevelXP))) * 100));


  // --------------------------------------------------------------------------
  // RENDER: COURSE SELECTION
  // --------------------------------------------------------------------------
  if (!activeCourseId) {
    return (
        <div className="academy-home-shell flex-1 w-full overflow-y-auto">
             <CyberToast toasts={toasts} onDismiss={dismissToast} />
             {currentUser && <StudentHome user={currentUser} courses={courses} tasks={tasks} progress={progressPercent} today={streak.tasksToday}
               onShop={() => setShowMarketModal(true)} onProfile={() => { playSound('open'); setShowProfileModal(true); }}
               onCourse={(id, resume) => {
                 playSound('click'); setActiveCourseId(id);
                 const courseTasks = tasks.filter(t => t.courseId === id);
                 setActiveTask(courseTasks.find(t => t.status !== 'completed') || null);
                 setLessonStage('explanation'); setShowMobileSidebar(!resume);
                 if (sidebarRef.current) sidebarRef.current.scrollTop = 0;
               }} />}

             {showProfileModal && currentUser && <PlayerProfile user={currentUser} courses={courses} completed={tasks.filter(t=>t.status==='completed').length} streak={streak} currentLevel={currentLevel} nextLevelXP={nextLevelXP} progress={progressPercent} onClose={()=>setShowProfileModal(false)} onShop={()=>{setShowProfileModal(false);setShowMarketModal(true);}}/>}
             {showMarketModal && currentUser && <PlayerShop user={currentUser} onClose={()=>setShowMarketModal(false)} onBuy={handleBuyItem} onEquip={handleEquipItem}/>}

        </div>
    );
  }

  // --------------------------------------------------------------------------
  // RENDER: TASK VIEW
  // --------------------------------------------------------------------------

  const isCodingTask = activeTask ? ['grid', 'html', 'terminal'].includes(activeTask.type) : false;
  const isHanoiTask = activeTask?.type === 'hanoi';

  const equippedDroneColorValue = (() => {
      if (!currentUser?.equipped?.droneColor) return '#00f3ff';
      const equipped = currentUser.equipped.droneColor;
      const cosmetic = COSMETICS.find(c => c.type === 'droneColor' && c.id === equipped);
      return cosmetic?.value || equipped;
  })();

  const equippedAvatarId = (() => {
      if (!currentUser?.equipped?.avatar) return '2';
      const cosmetic = COSMETICS.find(c => c.type === 'avatar' && c.id === currentUser.equipped.avatar);
      return cosmetic?.value || '2';
  })();

  const currentCourse = courses.find(course => course.id === activeCourseId);
  const courseDone = filteredTasks.filter(task => task.status === 'completed').length;
  const coursePercent = filteredTasks.length ? Math.round(courseDone / filteredTasks.length * 100) : 0;
  const resumeTask = filteredTasks.find(task => task.status === 'open');

  return (
    <div className="academy-lesson game-workspace flex-1 w-full relative flex flex-col md:flex-row overflow-hidden bg-black text-gray-300">
      <CyberToast toasts={toasts} onDismiss={dismissToast} />

      {/* Course drawer never reduces the practice workspace. */}
      {showMobileSidebar && <button className="lesson-nav-backdrop" aria-label="Закрыть меню курса" onClick={() => setShowMobileSidebar(false)} />}
      {/* SIDEBAR (Courses) */}
      <div className={`academy-lesson-nav ${showMobileSidebar ? 'is-open' : ''} flex absolute inset-y-0 left-0 border-r border-cyber-neonBlue/20 bg-cyber-glass backdrop-blur-md flex-col shrink-0 z-30`}>
        <div className="course-nav-toolbar h-14 flex items-center justify-between border-b border-cyber-neonBlue/20 px-3 shrink-0">
            <GameButton size="compact"
                onClick={() => {
                    playSound('click');
                    setActiveCourseId(null);
                    setActiveTask(null);
                }}
                className="flex items-center gap-1 text-gray-200 active:text-white py-3 pr-4 text-xs font-bold uppercase tracking-wider hover:text-cyber-neonBlue transition-colors"
            >
                <ChevronLeft size={18} /> На базу
            </GameButton>
            {currentUser && (
                <div className="flex items-center gap-2">
                    <span className="text-cyber-neonYellow font-mono text-xs font-bold">LVL {currentUser.level}</span>
                    <span className="text-gray-600 text-xs">|</span>
                    <span className="text-cyber-neonBlue font-mono text-xs">{currentUser.xp} XP</span>
                </div>
            )}
        </div>

        <GameButton size="compact" className="lesson-nav-close" onClick={() => setShowMobileSidebar(false)} aria-label="Скрыть меню курса"><ChevronLeft size={18}/> Скрыть меню</GameButton>
        <div ref={sidebarRef} className="flex-1 overflow-y-auto p-2 space-y-4 custom-scrollbar pb-6">
            <section className="course-nav-overview" aria-label="Прогресс курса">
              <span className="course-nav-eyebrow">Карта миссий</span>
              <h2>{currentCourse?.title || 'Учебные работы'}</h2>
              <p><span>Пройдено {courseDone} из {filteredTasks.length}</span><strong>{coursePercent}%</strong></p>
              <div className="course-nav-progress" role="progressbar" aria-label="Пройдено уроков" aria-valuemin={0} aria-valuemax={filteredTasks.length || 1} aria-valuenow={courseDone}><i style={{width:`${coursePercent}%`}}/></div>
              {resumeTask && <GameButton variant="primary" className="course-resume" onClick={() => {setActiveTask(resumeTask);setLessonStage('explanation');setShowMobileSidebar(false);setTaskTab('info');}}>Продолжить курс <ArrowRight size={16}/></GameButton>}
              {!resumeTask && courseDone > 0 && <span className="course-finished"><CheckCircle size={15}/> Курс пройден. Можно повторить!</span>}
              <small>Нажми на раздел, чтобы увидеть уроки</small>
            </section>
            {modules.map((modName, moduleIndex) => {
                const modTasks = filteredTasks.filter(t => t.module === modName);
                const modCompleted = modTasks.filter(t => t.status === 'completed').length;
                const modTotal = modTasks.length;
                const modProgress = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
                return (
                <details className="academy-module" data-completed={modCompleted === modTotal} key={modName} open={activeTask?.module === modName || (!activeTask && moduleIndex === 0)}>
                    <summary className="flex items-center justify-between gap-2 mb-2 py-2 pl-2 ml-1 border-l-2 border-gray-500 cursor-pointer">
                        <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                            {modName}
                        </h3>
                        <div className="flex items-center gap-1.5 pr-1">
                            <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-cyber-neonGreen transition-all duration-300" style={{ width: `${modProgress}%` }}></div>
                            </div>
                            <span className="text-[9px] font-mono text-gray-400">{modCompleted}/{modTotal}</span>
                        </div>
                    </summary>
                    <div className="space-y-1">
                        {modTasks.map(task => (
                             <div
                                key={task.id}
                                data-active={activeTask?.id === task.id}
                                data-status={task.status}
                                className={`academy-lesson-node w-full relative group text-left p-2 md:p-2 py-3 md:py-2 rounded-md flex items-center gap-3 transition-all duration-200 border border-transparent
                                    ${activeTask?.id === task.id
                                    ? 'bg-cyber-neonBlue/10 border-cyber-neonBlue/50 text-white shadow-[inset_0_0_15px_rgba(0,243,255,0.1)]'
                                    : 'hover:bg-white/5 text-gray-200 hover:text-white'}
                                    ${task.status === 'locked' ? 'opacity-40 grayscale' : ''}`}
                            >
                                <GameButton size="compact"
                                    onClick={() => {
                                        playSound('click');
                                        setActiveTask(task);
                                        setLessonStage('explanation');
                                        if (window.innerWidth < 768) {
                                            setShowMobileSidebar(false);
                                            if (['grid', 'html', 'terminal'].includes(task.type)) {
                                                setTaskTab('info');
                                            }
                                        }
                                    }}
                                    aria-current={activeTask?.id === task.id ? 'step' : undefined}
                                    disabled={task.status === 'locked'}
                                    className="flex-1 min-w-0 flex items-center gap-3 text-left cursor-pointer disabled:cursor-not-allowed"
                                >
                                    <div className="shrink-0">
                                        {task.status === 'locked' ? <Lock size={16} /> :
                                         task.status === 'completed' ? <CheckCircle size={16} className="text-cyber-neonGreen drop-shadow-[0_0_5px_rgba(0,255,65,0.8)]"/> :
                                         task.type === 'theory' ? <BookOpen size={16} className="text-cyber-neonPink" /> :
                                         task.type === 'quiz' ? <HelpCircle size={16} className="text-cyber-neonYellow" /> :
                                         task.type === 'terminal' ? <TerminalIcon size={16} className="text-cyber-neonGreen" /> :
                                         task.type === 'html' ? <Globe size={16} className="text-cyber-neonPink" /> :
                                         task.type === 'blocks' ? <Puzzle size={16} className="text-cyan-400" /> :
                                         task.type === 'hanoi' ? <BrainCircuit size={16} className="text-cyber-neonBlue" /> :
                                         task.type === 'typing' ? <TerminalIcon size={16} className="text-cyber-neonBlue" /> :
                                         task.type === 'process_manager' ? <Activity size={16} className="text-red-400" /> :
                                         task.type === 'spreadsheet' ? <Grid size={16} className="text-cyber-neonGreen" /> :
                                         task.type === 'sorting' ? <ArrowUpDown size={16} className="text-cyber-neonYellow" /> :
                                         task.type === 'tree_search' ? <GitBranch size={16} className="text-cyber-neonGreen" /> :
                                         task.type === 'phishing_detect' ? <ShieldAlert size={16} className="text-cyber-neonPink" /> :
                                         task.type === 'ai_neuron' ? <Brain size={16} className="text-purple-400" /> :
                                         task.type === 'network_route' ? <Globe size={16} className="text-cyber-neonBlue" /> :
                                         task.type === 'file_organizer' ? <Folder size={16} className="text-cyan-400" /> :
                                         task.type === 'binary_switches' || task.type === 'binary_bulbs' ? <Lightbulb size={16} className="text-amber-400" /> :
                                         task.type === 'wireframe_builder' ? <Smartphone size={16} className="text-indigo-400" /> :
                                         task.type === 'fake_detector' ? <ShieldCheck size={16} className="text-emerald-400" /> :
                                         task.type === 'circuit_builder' ? <Zap size={16} className="text-yellow-400" /> :
                                         task.type === 'ai_kids_trainer' ? <Bot size={16} className="text-purple-400" /> :
                                         <div className={`w-4 h-4 rounded-sm border ${activeTask?.id === task.id ? 'bg-cyber-neonBlue border-cyber-neonBlue animate-pulse' : 'border-gray-500'}`}></div>}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm md:text-sm font-bold leading-tight font-sans break-words">{task.title}</div>
                                        <div className="text-[11px] mt-1 text-gray-400">{task.status === 'completed' ? 'Пройдено · можно повторить' : task.status === 'locked' ? 'Пока закрыто' : activeTask?.id === task.id ? 'Ты здесь' : task.type === 'quiz' ? 'Проверяем понимание' : 'Практикуемся'}</div>
                                    </div>
                                </GameButton>


                            </div>
                        ))}
                    </div>
                </details>
                );
            })}
        </div>
      </div>

      {activeTask?.type === 'assessment' && <div className={`flex flex-1 min-h-0 overflow-y-auto flex-col`}><LessonHeader title={activeTask.title} practice onMenu={() => setShowMobileSidebar(true)}/><button className="academy-secondary m-3 self-start" onClick={()=>setActiveCourseId(null)}>← К работам и курсам</button><AssessmentPlayer key={activeTask.id} task={activeTask}/></div>}
      {/* 0. EMPTY TASK STATE */}
      {!activeTask && (
          <div className={`flex flex-1 items-center justify-center text-gray-600 bg-black`}>
              <div className="course-empty"><Trophy size={42}/><h2>{coursePercent === 100 ? 'Курс завершён!' : 'Выбери миссию'}</h2><p>{coursePercent === 100 ? 'Отличная работа. Любой урок можно пройти ещё раз — выбирай его в меню курса.' : 'Открой раздел в меню курса и выбери урок, с которого хочешь начать.'}</p><button className="academy-primary" onClick={()=>setShowMobileSidebar(true)}>Открыть меню курса</button></div>
          </div>
      )}

      {/* 1. EXPLANATION STAGE (Байтик + теория) — также покрывает type 'theory' */}
      {activeTask && activeTask.type !== 'assessment' && (lessonStage === 'explanation' || activeTask.type === 'theory') && (
          <div className={`flex flex-1 flex-col bg-black relative overflow-hidden`}>
                <LessonHeader title={activeTask.title} practice={false} onMenu={() => setShowMobileSidebar(true)} onExplanation={() => setLessonStage('explanation')}/>
                <div className="lesson-explanation-scroll flex-1 overflow-y-auto p-4 md:p-8">
                <div className="max-w-4xl mx-auto w-full space-y-6">
                    <MascotErrorBoundary fallback={activeTask.theory ? (
                        <div className="bg-black/80 border border-gray-800 p-6 md:p-8 rounded-xl shadow-xl prose prose-invert max-w-none text-sm leading-relaxed">
                            <div className="lesson-theory-copy" dangerouslySetInnerHTML={{ __html: activeTask.theory }} />
                        </div>
                    ) : null}>
                        <Suspense fallback={<LessonLoader />}>
                            <BigMascotTheoryStory
                                task={activeTask}
                                mascotSkinItemId={currentUser?.equipped?.mascotSkin}
                                practiceGoal={getTaskPracticeGoal(activeTask)}
                                onStartPractice={() => {
                                    playSound('click');
                                    if (activeTask.type !== 'theory') {
                                        setLessonStage('practice');
                                    } else {
                                        handleTheoryComplete();
                                    }
                                }}
                            />
                        </Suspense>
                    </MascotErrorBoundary>


                </div>
                </div>
          </div>
      )}

      {/* 2. QUIZ VIEW */}
      {activeTask?.type === 'quiz' && lessonStage === 'practice' && (
          <div className={`flex flex-1 flex-col bg-black relative overflow-hidden`}>
              <LessonHeader title={activeTask.title} practice={true} onMenu={() => setShowMobileSidebar(true)} onExplanation={() => setLessonStage('explanation')}/>
              <div className="lesson-quiz-scroll flex-1 overflow-y-auto p-4 md:p-12 flex flex-col items-center justify-start md:justify-center">
              <div className="lesson-quiz-panel max-w-2xl w-full bg-[#0e0e12] border border-gray-800 p-6 md:p-12 relative shadow-2xl">
                  {/* Decor */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-neonYellow"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-neonYellow"></div>

                  <div className="text-center mb-8">
                      <div className="inline-block px-3 py-1 bg-cyber-neonYellow/20 text-cyber-neonYellow text-xs font-bold uppercase tracking-widest mb-4 border border-cyber-neonYellow/50">
                          Проверяем понимание
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-6 whitespace-pre-line break-words">
                          {activeTask.quizData?.question}
                      </h2>
                  </div>

                  <div className="space-y-4">
                      {quiz?.options.map((opt, idx) => {
                          let stateClass = "border-gray-700 hover:border-cyber-neonBlue hover:bg-white/5 text-gray-300";
                          if (quizSubmitted) {
                              if (idx === quiz?.correctIndex) stateClass = "border-cyber-neonGreen bg-cyber-neonGreen/20 text-cyber-neonGreen";
                              else if (idx === quizSelectedOption) stateClass = "border-red-500 bg-red-500/20 text-red-500";
                              else stateClass = "border-gray-800 opacity-50";
                          } else if (idx === quizSelectedOption) {
                              stateClass = "border-cyber-neonBlue bg-cyber-neonBlue/20 text-white";
                          }

                          return (
                            <GameButton size="compact"
                                key={idx}
                                disabled={quizSubmitted}
                                onClick={() => { playSound('click'); setQuizSelectedOption(idx); }}
                                aria-pressed={quizSelectedOption === idx}
                                className={`lesson-answer w-full p-4 border text-left font-mono text-sm md:text-base transition-all duration-200 ${stateClass}`}
                            >
                                <span className="mr-4 opacity-50">{idx + 1}.</span>
                                {opt}
                            </GameButton>
                          )
                      })}
                  </div>

                  {quizSubmitted && activeTask.quizData?.explanation && (
                      <div className={`mt-6 p-4 border rounded text-sm ${quizIsCorrect ? 'border-cyber-neonGreen/30 bg-cyber-neonGreen/5 text-gray-300' : 'border-red-500/30 bg-red-500/5 text-gray-300'}`}>
                          <span className="font-bold text-white block mb-1">{quizIsCorrect ? '💡 Пояснение:' : '📖 Разбор:'}</span>
                          {activeTask.quizData.explanation}
                      </div>
                  )}

                  {quizSubmitted && quizIsCorrect && activeTask.lesson && <p className="mt-4 text-sm text-gray-300"><strong>Объясни своими словами: </strong>{activeTask.lesson.reflection}</p>}
                  <div className="lesson-quiz-actions mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
                      <div className="text-sm">
                          {quizSubmitted && (
                              <span className={quizIsCorrect ? "text-cyber-neonGreen font-bold" : "text-red-500 font-bold"}>
                                  {quizIsCorrect ? "Верно. Посмотри, почему." : "Попробуем разобраться."}
                              </span>
                          )}
                      </div>

                      {!quizSubmitted ? (
                          <GameButton size="compact"
                             variant="primary" onClick={handleQuizSubmit}
                             disabled={quizSelectedOption === null}
                             className={`academy-primary lesson-check px-8 py-3 font-bold uppercase tracking-widest transition-all ${quizSelectedOption !== null ? 'bg-cyber-neonBlue text-black hover:bg-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                          >
                              Проверить
                          </GameButton>
                      ) : (
                          quizIsCorrect ? (
                              !missionSuccess && <GameButton size="compact"
                                variant="primary" onClick={handleNextTask}
                                className={`academy-primary flex px-6 py-3 bg-cyber-neonGreen text-black hover:bg-white border border-cyber-neonGreen font-bold uppercase items-center gap-2 text-sm md:text-base`}
                              >
                                  {(tasks.filter(t => t.courseId === activeTask.courseId).findIndex(t => t.id === activeTask.id) < tasks.filter(t => t.courseId === activeTask.courseId).length - 1) ? 'Далее' : 'Завершить'} <ArrowRight size={18} />
                              </GameButton>
                          ) : (
                              <GameButton size="compact"
                                onClick={handleQuizRetry}
                                className="academy-secondary px-6 py-3 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-black border border-red-500 font-bold uppercase flex items-center gap-2 transition-colors text-sm md:text-base"
                              >
                                  <RotateCcw size={18} /> Повторить
                              </GameButton>
                          )
                      )}
                  </div>
              </div>
              </div>{/* end scroll container */}
          </div>
      )}

      {/* 3. BLOCKS (drag-and-drop) VIEW */}
      {activeTask?.type === 'blocks' && lessonStage === 'practice' && (
          <div className={`flex flex-1 flex-col bg-black relative overflow-hidden`}>
              <LessonHeader title={activeTask.title} practice={true} onMenu={() => setShowMobileSidebar(true)} onExplanation={() => setLessonStage('explanation')}/>
              <Suspense fallback={<LessonLoader />}>
                  <BlockCoding
                    key={activeTask.id}
                    task={activeTask}
                    onSuccess={() => { playSound('success'); setMissionSuccess(true); handleTaskCompletion(activeTask, false); }}
                    onFail={() => {
                        bumpAttempt(activeTask.id);
                    }}
                  />
              </Suspense>
          </div>
      )}

      {/* 4. TOWER OF HANOI MINI GAME */}
      {isHanoiTask && lessonStage === 'practice' && (
        <div className={`flex flex-1 flex-col w-full relative overflow-hidden`}>
            <LessonHeader title={activeTask!.title} practice={true} onMenu={() => setShowMobileSidebar(true)} onExplanation={() => setLessonStage('explanation')}/>
            <PracticeSurface kind={activeTask!.type} goal={getTaskPracticeGoal(activeTask!)}><Suspense fallback={<LessonLoader />}>
                <HanoiGame key={activeTask!.id} task={activeTask!} onComplete={() => handleTaskCompletion(activeTask!)} />
            </Suspense></PracticeSurface>
        </div>
      )}

      {/* 5. INTERACTIVE TRAINERS */}
      {activeTask && lessonStage === 'practice' && (() => {
          const t = activeTask;
          const complete = () => handleTaskCompletion(t);
          const header = <LessonHeader title={t.title} practice onMenu={() => setShowMobileSidebar(true)} onExplanation={() => setLessonStage('explanation')}/>;
          const wrap = (game: React.ReactNode) => (
              <div className={`flex flex-1 flex-col bg-black relative overflow-hidden`}>
                  {header}
                  <PracticeSurface kind={t.type} goal={getTaskPracticeGoal(t)}><Suspense key={t.id} fallback={<LessonLoader />}>{game}</Suspense></PracticeSurface>
              </div>
          );

          switch (t.type) {
              case 'typing': return wrap(<TypingGame task={t} onComplete={complete} />);
              case 'process_manager': return wrap(<ProcessManagerGame task={t} onComplete={complete} />);
              case 'spreadsheet': return wrap(<SpreadsheetGame task={t} onComplete={complete} />);
              case 'sorting': return wrap(<SortingGame task={t} onComplete={complete} />);
              case 'tree_search': return wrap(<BinaryTreeGame task={t} onComplete={complete} />);
              case 'phishing_detect': return wrap(<PhishingInspectorGame task={t} onComplete={complete} />);
              case 'ai_neuron': return wrap(<NeuronLabGame task={t} onComplete={complete} />);
              case 'network_route': return wrap(<NetworkRouteGame task={t} onComplete={complete} />);
              case 'file_organizer': return wrap(<FileOrganizerGame task={t} onComplete={complete} />);
              case 'binary_switches':
              case 'binary_bulbs': return wrap(<BinaryBulbsGame task={t} onComplete={complete} />);
              case 'wireframe_builder': return wrap(<WireframeBuilderGame task={t} onComplete={complete} />);
              case 'circuit_builder':
              case 'circuit': return wrap(<CircuitBuilderGame task={t} onComplete={complete} />);
              case 'fake_detector': return wrap(<FakeDetectorGame task={t} onComplete={complete} />);
              case 'ai_kids_trainer':
              case 'ai_trainer': return wrap(<AiKidsTrainerGame task={t} onComplete={complete} />);
              default: return null;
          }
      })()}

      {/* 6. CODE/TERMINAL TASK VIEW */}
      {isCodingTask && activeTask && lessonStage === 'practice' && (
          <div className={`flex ui-code-workspace flex-1 flex-col min-w-0 overflow-hidden`}>
            {/* MOBILE TOP BAR (always visible for coding tasks) */}
            <div className="lg:hidden flex items-center border-b border-gray-800 px-2 py-2 bg-gray-950 shrink-0 gap-2">
                <GameButton size="compact" aria-label="Меню курса" onClick={() => setShowMobileSidebar(true)} className="p-2 text-gray-200 active:text-white shrink-0"><ChevronLeft size={20}/></GameButton>
                <span className="text-xs font-bold text-gray-300 uppercase leading-tight break-words flex-1">{activeTask.title}</span>
                  {lessonStage === 'practice' && <GameButton size="compact" onClick={() => setLessonStage('explanation')} className="text-sm text-cyan-300 px-3 py-2">К объяснению</GameButton>}
                <GameButton size="compact" variant="primary"
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className={`shrink-0 px-4 py-2 text-xs font-bold uppercase flex items-center gap-1 ${isRunning ? 'bg-gray-700 text-gray-400' : 'bg-cyber-neonGreen text-black'}`}
                >
                    {isRunning ? <Loader2 size={14} className="animate-spin"/> : <Play size={14} className="fill-current"/>}
                    {isRunning ? '...' : 'Запустить'}
                </GameButton>
            </div>

            <section className="academy-task-brief academy-code-brief" aria-label="Задача"><span>Твоя задача</span><p>{getTaskPracticeGoal(activeTask)}</p></section>
            {/* CONTENT AREA: tabs on mobile, side-by-side on desktop */}
            <div className="flex-1 flex flex-col lg:flex-row min-w-0 overflow-hidden">

            {/* MOBILE: TASK INFO TAB */}
            <div className={`${taskTab === 'info' ? 'flex' : 'hidden'} lg:hidden flex-1 flex-col bg-gray-950 overflow-hidden`}>
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="prose prose-invert prose-sm max-w-none">
                        <h3 className="text-cyber-neonGreen font-mono">Задание</h3>
                        <p className="text-gray-400">{stripStandardsPrefix(activeTask.description || '')}</p>
                        <div className="h-px bg-gray-800 my-4"></div>
                        <h3 className="text-cyber-neonBlue font-mono flex items-center gap-2"><BookOpen size={16}/> Подсказка</h3>
                        <div className="lesson-theory-copy" dangerouslySetInnerHTML={{ __html: activeTask.theory || '' }} />
                    </div>
                </div>
            </div>

            {/* EDITOR AREA / TERMINAL INPUT */}
            <div className={`${taskTab === 'code' ? 'flex' : 'hidden'} lg:flex flex-1 flex-col relative min-w-0 bg-black overflow-hidden`}>
                 {/* Top Bar Desktop Only */}
                 <div className="hidden lg:flex min-h-[3.5rem] py-2 bg-gray-900 border-b border-cyber-neonBlue/20 items-center justify-between px-4 shrink-0">
                     <div className="flex items-center gap-3 min-w-0">
                         <div className="bg-cyber-neonPink/20 p-1.5 rounded text-cyber-neonPink border border-cyber-neonPink/50 shrink-0"><Code size={16} /></div>
                         <div className="min-w-0">
                             <h1 className="text-sm font-bold text-white uppercase leading-tight break-words flex-1">{activeTask.title}</h1>
                             <div className="text-[10px] text-gray-500 font-mono leading-tight break-words">{stripStandardsPrefix(activeTask.description || '')}</div>
                         </div>
                     </div>
                     <div className="flex gap-2">
                         <GameButton size="compact" onClick={() => setLessonStage('explanation')} className="text-sm text-cyan-300 px-3 py-2">К объяснению</GameButton>
                         <GameButton size="compact"
                            title="Сбросить код к начальному"
                            onClick={() => { playSound('click'); setCode(activeTask.lesson?.starterCode ?? activeTask.initialCode ?? ''); }}
                            className="p-2 text-gray-500 hover:text-red-400"
                        >
                            <RotateCcw size={18} />
                        </GameButton>
                         <GameButton size="compact"
                            onClick={() => setShowTheory(!showTheory)}
                            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase border transition-all ${showTheory ? 'bg-cyber-neonBlue text-black border-cyber-neonBlue' : 'border-cyber-neonBlue/30 text-cyber-neonBlue'}`}
                        >
                            <BookOpen size={14} /> Справка
                        </GameButton>
                     </div>
                 </div>

                 {/* Theory Panel (Desktop) */}
                 <div className={`hidden lg:block bg-gray-900 border-b border-cyber-neonBlue/20 overflow-hidden transition-all duration-300 ${showTheory ? 'max-h-[35vh]' : 'max-h-0'}`}>
                    <div className="p-6 overflow-y-auto max-h-[35vh] prose prose-invert prose-sm max-w-none">
                        <h3 className="text-cyber-neonGreen font-mono">Главная идея</h3>
                        <div className="lesson-theory-copy" dangerouslySetInnerHTML={{ __html: activeTask.theory || '' }} />
                    </div>
                 </div>

                 <div className="flex-1 flex flex-col relative min-h-0">
                    {activeTask.type === 'terminal' ? (
                        /* TERMINAL UI - Now using TextArea for Multi-line */
                        <div className="flex-1 bg-black p-4 font-mono text-sm text-cyber-neonGreen overflow-y-auto flex flex-col" onClick={() => editorRef.current?.focus()}>
                            {terminalHistory.map((line, i) => (
                                <div key={i} className="whitespace-pre-wrap mb-1">{line}</div>
                            ))}
                            <div className="flex items-start gap-2 mt-2">
                                <span className="text-cyber-neonPink mt-0.5">$</span>
                                <textarea
                                    ref={editorRef}
                                    aria-label="Код решения"
                                    autoFocus
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    // Removed Enter key binding to allow multiline typing
                                    className="flex-1 bg-transparent border-none outline-none text-cyber-neonGreen font-mono resize-none min-h-[120px] lg:min-h-[200px]"
                                    spellCheck={false}
                                />
                            </div>
                            <div ref={terminalEndRef}></div>
                        </div>
                    ) : (
                        /* NORMAL CODE EDITOR */
                        <>
                             {activeTask.allowedCommands && (
                                <div className="bg-[#0e0e12] border-b border-gray-800 p-2 flex flex-wrap gap-2 shrink-0 items-center z-20">
                                    <span className="text-[10px] font-bold text-gray-600 uppercase shrink-0 px-2">Команды:</span>
                                    {activeTask.allowedCommands.map(cmd => (
                                        <GameButton size="compact"
                                            key={cmd}
                                            onClick={() => insertCommand(cmd)}
                                            className="px-3 py-2 bg-[#1a1a20] border border-gray-700 text-gray-300 text-xs font-mono rounded active:bg-cyber-neonBlue active:text-black whitespace-nowrap"
                                        >
                                            {activeTask.type === 'grid' ? <span className="flex flex-col whitespace-normal text-left"><strong>{activeTask.lesson?.commands?.find(c=>c.code===cmd)?.meaning ?? cmd}</strong><small>{cmd.replace(/range\(\d+\)/,'range(число)')}</small></span> : cmd}
                                        </GameButton>
                                    ))}
                                </div>
                            )}

                            <textarea
                                ref={editorRef}
                                    aria-label="Код решения"
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="flex-1 bg-black text-gray-200 p-4 font-mono text-sm resize-none focus:outline-none leading-relaxed whitespace-pre min-w-0 min-h-[200px] lg:min-h-[300px]"
                                spellCheck={false}
                                placeholder={activeTask.type === 'html' ? "<!-- Пиши HTML код здесь -->" : "// Введите код..."}
                            />
                        </>
                    )}

                    {/* Execute Button Desktop */}
                    <div className="ui-code-runbar hidden lg:flex">
                        <GameButton size="compact" variant="primary"
                            onClick={handleRunCode}
                            disabled={isRunning}
                            className={`pl-6 pr-8 py-4 bg-cyber-neonGreen text-black font-bold font-sans text-lg uppercase tracking-widest clip-path-polygon hover:bg-white transition-all ${isRunning ? 'opacity-70 cursor-wait' : 'hover:scale-105'}`}

                        >
                            <div className="flex items-center gap-3">{isRunning ? <Loader2 className="animate-spin" /> : <Play className="fill-current" />} {isRunning ? 'ВЫПОЛНЕНИЕ...' : 'ЗАПУСК'}</div>
                        </GameButton>
                    </div>
                 </div>
            </div>

            {/* VISUAL AREA */}
            <div className={`${taskTab === 'visual' ? 'flex' : 'hidden'} lg:flex lg:w-96 bg-[#0c0c10] flex-col shrink-0 relative z-20 border-l border-gray-800 overflow-hidden`}>

                 {/* === HTML TASK: Full browser-like preview === */}
                 {activeTask.type === 'html' && (
                     <div className="flex flex-col flex-1 min-h-0">
                         {/* Browser chrome */}
                         <div className="flex items-center gap-2 px-3 py-2 bg-gray-900 border-b border-gray-800 shrink-0">
                             <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                             <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                             <div className="flex-1 ml-2 bg-black/50 rounded px-3 py-1 flex items-center gap-2">
                                 <Globe size={10} className="text-gray-600 shrink-0" />
                                 <span className="text-[10px] text-gray-500 font-mono break-all leading-tight">localhost:3000/preview</span>
                             </div>
                         </div>
                         {/* Live iframe preview - updates in real time */}
                         <div className="flex-1 bg-white relative overflow-hidden">
                             <iframe
                                 title="HTML Preview"
                                 className="w-full h-full border-0"
                                 sandbox="allow-scripts"
                                 srcDoc={`<!DOCTYPE html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{margin:0;padding:16px;font-family:system-ui,-apple-system,sans-serif;}</style></head><body>${code}</body></html>`}
                             />
                             <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,18,18,0)_50%,rgba(0,0,0,0.03)_50%)] bg-[size:100%_2px] z-10 opacity-30"></div>
                         </div>
                         {/* Compact logs */}
                         <div className="shrink-0 border-t border-gray-800 bg-cyber-panel/50">
                             <div className="p-2 flex items-center gap-2 overflow-x-auto no-scrollbar">
                                 <Bot size={14} className="text-cyber-neonBlue shrink-0" />
                                 <div className="text-[10px] text-gray-500 font-mono leading-tight break-words flex-1">
                                     {logs.length > 0 ? logs[logs.length - 1] : '> Ready'}
                                 </div>
                                 <GameButton size="compact" onClick={handleGetHint} disabled={isHintLoading} className="px-2 py-1 border border-cyber-neonBlue/30 bg-cyber-neonBlue/5 text-cyber-neonBlue font-bold text-[10px] uppercase flex items-center gap-1 shrink-0 rounded">{isHintLoading ? <Loader2 className="animate-spin w-3 h-3"/> : <Zap size={10}/>} Подсказка</GameButton>
                             </div>
                         </div>
                     </div>
                 )}

                 {/* === GRID / TERMINAL TASKS: Render box + logs === */}
                 {activeTask.type !== 'html' && (
                     <>
                         <div className="p-3 border-b border-gray-800 bg-cyber-panel flex justify-between items-center shrink-0">
                             <span className="text-xs font-bold text-cyber-neonBlue tracking-widest uppercase flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> Результат</span>
                             <span className="text-[10px] font-mono text-gray-500">MODE: {activeTask.type === 'terminal' ? 'SHELL' : 'DRONE'}</span>
                         </div>

                         {/* RENDER BOX */}
                         <div className="w-full relative bg-black flex items-center justify-center overflow-hidden border-b border-cyber-neonBlue/20 shrink-0 aspect-square lg:max-h-[50vh]">

                             {activeTask.type === 'grid' && activeTask.mapConfig && (
                                <Suspense fallback={<LessonLoader />}>
                                    <GameGrid task={activeTask} playerPos={playerPos} heading={playerHeading} pathHistory={pathHistory} droneColor={equippedDroneColorValue} activeAction={activeGridAction} destroyedObstacles={destroyedObstacles} />
                                    <p className="absolute bottom-1 inset-x-2 text-center text-xs bg-black/80 text-cyber-neonBlue p-1 pointer-events-none">Робот смотрит {{E:'→ вправо',S:'↓ вниз',W:'← влево',N:'↑ вверх'}[playerHeading]}. Вперёд — по направлению стрелки.</p>
                                </Suspense>
                             )}

                             {activeTask.type === 'terminal' && (
                                 <div className="w-full h-full bg-black flex flex-col overflow-hidden font-mono text-xs relative">
                                     {/* Animated avatar */}
                                     <div className="flex items-end justify-center py-3 bg-gradient-to-b from-gray-900 to-black border-b border-gray-800/50 shrink-0">
                                         <div className="relative">
                                             <ShopAvatar
                                                 avatarId={equippedAvatarId}
                                                 animation={isRunning ? 'Special' : 'Idle'}
                                                 frameId={currentUser?.equipped.avatarFrame}
                                                 scale={3}
                                                 fps={isRunning ? 12 : 6}
                                             />
                                             {isRunning && (
                                                 <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-24 h-1 bg-cyber-neonGreen/30 rounded-full blur-sm animate-pulse"></div>
                                             )}
                                         </div>
                                     </div>
                                     {/* Output area */}
                                     <div ref={liveOutputRef} className="flex-1 overflow-y-auto p-3 space-y-[3px]">
                                         {liveOutput.length === 0 && !isRunning && (
                                             <div className="flex flex-col items-center justify-center h-full text-gray-700 gap-2">
                                                 <span className="text-[10px] uppercase tracking-widest">Нажми ЗАПУСК</span>
                                             </div>
                                         )}
                                         {isRunning && liveOutput.length === 0 && (
                                             <div className="flex items-center gap-2 text-cyber-neonGreen animate-pulse">
                                                 <span>$</span><span className="w-2 h-4 bg-cyber-neonGreen inline-block animate-pulse"></span>
                                             </div>
                                         )}
                                         {liveOutput.map((line, i) => (
                                             <div key={i} className={`flex items-start gap-2 leading-relaxed animate-in fade-in slide-in-from-left-2 duration-200 ${
                                                 line.type === 'cmd'  ? 'text-cyber-neonBlue' :
                                                 line.type === 'out'  ? 'text-cyber-neonGreen' :
                                                 line.type === 'ok'   ? 'text-green-400 font-bold' :
                                                 line.type === 'err'  ? 'text-red-400 font-bold' :
                                                 'text-gray-600'
                                             }`}>
                                                 {line.type === 'cmd' && <span className="text-gray-600 shrink-0">$</span>}
                                                 {line.type === 'out' && <span className="text-gray-600 shrink-0">›</span>}
                                                 {(line.type === 'ok' || line.type === 'err') && <span className="shrink-0"> </span>}
                                                 <span className="whitespace-pre-wrap break-all">{line.text}</span>
                                             </div>
                                         ))}
                                         {isRunning && liveOutput.length > 0 && (
                                             <span className="inline-block w-2 h-4 bg-cyber-neonGreen animate-pulse ml-4"></span>
                                         )}
                                     </div>
                                 </div>
                             )}
                         </div>

                         <div className="flex-1 flex flex-col p-4 bg-cyber-panel/50 min-h-0 overflow-hidden">
                             <div className="flex items-center gap-2 mb-2 opacity-70 shrink-0"><Bot size={20} className="text-cyber-neonBlue" /><h3 className="font-bold text-gray-300 text-xs">Проверка решения</h3></div>
                             <div className="flex-1 border border-dashed border-gray-700 rounded-lg p-3 mb-3 bg-black/40 text-xs text-gray-400 font-mono overflow-y-auto">
                                 {logs.map((log, i) => <div key={i} className={log.includes('ОШИБКА') ? 'text-red-500' : 'text-gray-400'}>{log}</div>)}
                             </div>
                             <GameButton size="compact" onClick={handleGetHint} disabled={isHintLoading} className="w-full py-3 border border-cyber-neonBlue/30 bg-cyber-neonBlue/5 text-cyber-neonBlue font-bold text-xs uppercase flex justify-center items-center gap-2 shrink-0">{isHintLoading ? <Loader2 className="animate-spin w-4 h-4"/> : <Zap size={16}/>} ПОДСКАЗКА</GameButton>
                         </div>
                     </>
                 )}
            </div>{/* end visual area */}

            </div>{/* end content area flex row */}
      {/* --- MOBILE BOTTOM NAVIGATION (coding tasks only) --- */}
      {isCodingTask && lessonStage === 'practice' && !showMobileSidebar && (
        <div className="lg:hidden h-14 bg-gray-900 border-t border-gray-800 flex items-stretch shrink-0 z-[60] w-full">
            <GameButton size="compact" aria-pressed={taskTab === 'info'} onClick={() => setTaskTab('info')} className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 ${taskTab === 'info' ? 'text-cyber-neonBlue bg-black' : 'text-gray-500'}`}>
                <LayoutList size={18} />
                <span className="text-[9px] font-bold uppercase">Задача</span>
            </GameButton>
            <GameButton size="compact" aria-pressed={taskTab === 'code'} onClick={() => setTaskTab('code')} className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 ${taskTab === 'code' ? 'text-cyber-neonBlue bg-black' : 'text-gray-500'}`}>
                <Code size={18} />
                <span className="text-[9px] font-bold uppercase">Код</span>
            </GameButton>
            <GameButton size="compact" aria-pressed={taskTab === 'visual'} onClick={() => setTaskTab('visual')} className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 ${taskTab === 'visual' ? 'text-cyber-neonBlue bg-black' : 'text-gray-500'}`}>
                <Eye size={18} />
                <span className="text-[9px] font-bold uppercase">Результат</span>
            </GameButton>
        </div>
      )}


          </div>
      )}

      {/* --- MISSION COMPLETE BANNER (compact, doesn't block LIVE FEED) --- */}
      {(missionSuccess || activeTask?.status === 'completed') && activeTask && (
          <div className="academy-completion">
               <div className="bg-[#0a0a10] border border-cyber-neonYellow/50 rounded-lg p-4 shadow-[0_0_40px_rgba(252,238,10,0.15)] flex items-center gap-4">
                   <Suspense fallback={<Trophy size={32} className="text-cyber-neonYellow shrink-0" />}><BigCharacter3D skin={currentUser.equipped.mascotSkin} mood="celebrate" className="mentor-completion-character" /></Suspense>
                   <div className="flex-1 min-w-0">
                       <h2 className="text-sm font-bold text-white">{missionSuccess ? 'Задание выполнено' : 'Урок уже пройден — можно повторить или идти дальше'}</h2>
                       {activeTask.lesson && <p className="text-sm text-gray-300 mt-2">{activeTask.lesson.reflection}</p>}
                       <div className="text-cyber-neonBlue font-mono text-xs mt-0.5">
                           {missionSuccess && lastXpAwarded ? (() => {
                               const attempts = attemptCount[activeTask.id] || 0;
                               const multiplier = rewardMultiplier(attempts);
                               const rewardPercent = Math.round(multiplier * 100);
                               const actualXP = Math.max(1, Math.round(activeTask.xpReward * multiplier));
                               const actualCurrency = Math.max(0, Math.round((activeTask.currencyReward || 0) * multiplier));
                               const hasPenalty = attempts > 0;
                               return (
                                   <>
                                       <span className={hasPenalty ? 'line-through opacity-50' : ''}>
                                           + {activeTask.xpReward} XP | + {activeTask.currencyReward} BITS
                                       </span>
                                       {hasPenalty && (
                                           <span className="text-red-400 ml-2">
                                               → {actualXP} XP | {actualCurrency} BITS ({rewardPercent}%)
                                           </span>
                                       )}
                                   </>
                               );
                           })() : 'Уже пройдено ранее'}
                       </div>
                   </div>
                   <button
                      onClick={handleNextTask}
                      className="px-5 py-2.5 bg-cyber-neonBlue text-black font-bold uppercase tracking-widest hover:bg-white transition-all flex items-center gap-1.5 text-sm shrink-0 rounded"
                   >
                       Далее <ArrowRight size={16} />
                   </button>
               </div>
          </div>
      )}

       {pendingCompletion && <div role="alert" className="fixed bottom-4 left-4 right-4 z-[110] bg-red-950 border border-red-400 p-4 rounded text-white flex items-center gap-4">
         <span>Результат «{pendingCompletion.task.title}» не сохранён.</span>
         <button disabled={savingCompletion} onClick={() => handleTaskCompletion(pendingCompletion.task,pendingCompletion.autoAdvance)} className="px-4 py-2 bg-white text-black rounded disabled:opacity-50">{savingCompletion ? 'Сохранение…' : 'Повторить сохранение'}</button>
       </div>}
       {/* HINT MODAL */}
       {showHintModal && (
            <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex flex-col">
                <div className="h-14 md:h-16 shrink-0" />
                <div className="flex-1 flex items-center justify-center p-4">
                <div className="w-full max-w-lg bg-[#0a0a0f] border border-cyber-neonBlue p-6 relative rounded-lg">
                    <button onClick={() => setShowHintModal(false)} className="absolute top-2 right-2 text-gray-500 hover:text-white p-1"><X size={24} /></button>
                    <h2 className="text-cyber-neonBlue font-mono font-bold mb-4">ВХОДЯЩЕЕ СООБЩЕНИЕ</h2>
                    <div className="font-mono text-gray-300">{isHintLoading ? "Анализ..." : hint || "Ошибка."}</div>
                </div>
                </div>
            </div>
        )}
    </div>
  );
};

export default StudentDashboard;
