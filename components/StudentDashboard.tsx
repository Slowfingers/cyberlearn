
import React, { useState, useEffect, useRef, useCallback } from 'react';
import { COSMETICS, ACHIEVEMENTS } from '../constants';
import { Task, ExecutionResult, User, Course } from '../types';
import { evaluateCodeLocally } from '../services/localEvaluation'; 
import { calculateLevel, getNextLevelThreshold, updateUserProfile, getAllTasks, getCoursesWithProgress, buyItem, equipItem, saveTaskProgress, getTaskProgress, getHiddenCoursesForStudent, getStreak, recordActivity, StreakData } from '../services/mockBackend';
import GameGrid from './GameGrid';
import HanoiGame from './HanoiGame';
import BlockCoding from './BlockCoding';
import AnimatedSprite, { hasAnimation } from './AnimatedSprite';
import CyberToast, { ToastMessage } from './CyberToast';
import { Play, RotateCcw, CheckCircle, Lock, BookOpen, Zap, ArrowRight, ChevronLeft, Trophy, X, Bot, Code, Terminal as TerminalIcon, Cpu, Globe, Grid, LayoutList, Eye, Loader2, HelpCircle, ShoppingBag, Coins, BrainCircuit, Puzzle, Award, Flame } from 'lucide-react';
import { playSound } from '../utils/sound';
import { startTaskAttempt, recordError, endTaskAttempt, cleanupTracker, initActivityTracking } from '../utils/activityTracker';

type MobileTab = 'tasks' | 'code' | 'visual';

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
  const [attemptCount, setAttemptCount] = useState<Record<string, number>>({});
  const rewardedTaskIds = useRef<Set<string>>(new Set());
  
  // Profile State
  const [currentUser, setCurrentUser] = useState<User | null>(propUser);

  // Editor State
  const [code, setCode] = useState('');
  const [terminalHistory, setTerminalHistory] = useState<string[]>(['> SYSTEM_INIT...', '> CONNECTED.']);
  const [isRunning, setIsRunning] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [playerPos, setPlayerPos] = useState<[number, number]>([0,0]);
  const [pathHistory, setPathHistory] = useState<[number, number][]>([]);
  
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

  const editorRef = useRef<HTMLTextAreaElement>(null);
  const terminalEndRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
      (async () => {
          // Bidirectional sync: merge localStorage and Firebase completed task IDs
          const localProgress = getTaskProgress(propUser.id);
          const localCompletedIds = Object.entries(localProgress)
              .filter(([, v]) => v === 'completed')
              .map(([k]) => k);
          const firebaseCompletedIds = propUser.completedTaskIds || [];

          // Merge both sources to get the true set of completed tasks
          const mergedCompletedIds = [...new Set([...firebaseCompletedIds, ...localCompletedIds])];
          const mergedSet = new Set(mergedCompletedIds);

          // Sync Firebase → localStorage: mark Firebase-completed tasks in localStorage
          if (firebaseCompletedIds.length > 0) {
              const updatedProgress = { ...localProgress };
              let localChanged = false;
              for (const tid of firebaseCompletedIds) {
                  if (updatedProgress[tid] !== 'completed') {
                      updatedProgress[tid] = 'completed';
                      localChanged = true;
                  }
              }
              if (localChanged) {
                  saveTaskProgress(propUser.id, updatedProgress);
              }
          }

          // Load tasks with the merged progress applied
          const allTasks = getAllTasks(propUser.id);
          // Also apply Firebase completedTaskIds that may not be in localStorage yet
          const patchedTasks = allTasks.map(t => ({
              ...t,
              status: mergedSet.has(t.id) ? 'completed' as const : t.status,
          }));
          setTasks(patchedTasks);
          const hidden = await getHiddenCoursesForStudent(propUser.id);
          setCourses(getCoursesWithProgress(patchedTasks, hidden));

          // Sync localStorage → Firebase: push merged data if Firebase is behind
          const needsFirebaseUpdate = mergedCompletedIds.length > firebaseCompletedIds.length;
          if (needsFirebaseUpdate) {
              const streakData = getStreak(propUser.id);
              const updatedUser: User = {
                  ...propUser,
                  completedTaskIds: mergedCompletedIds,
                  tasksCompleted: mergedCompletedIds.length,
                  lastActiveDate: streakData.lastActiveDate || propUser.lastActiveDate,
                  streak: streakData.currentStreak ?? propUser.streak,
              };
              updateUserProfile(updatedUser);
              setCurrentUser(updatedUser);
          }
      })();
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

  useEffect(() => {
    if (!activeTask) return;
    
    // Reset States
    setLogs([`> СИСТЕМА ГОТОВА. ЦЕЛЬ: ${activeTask.title}`]);
    setHint('');
    setAiFeedback('');
    setMissionSuccess(false);
    setShowTheory(false); 
    setShowHintModal(false);
    
    // Reset attempt counter for new task (keep history for completed tasks)
    if (activeTask.status !== 'completed') {
        setAttemptCount(prev => ({ ...prev, [activeTask.id]: 0 }));
    }

    // Specific Task Type Resets
    if (activeTask.type === 'grid' || activeTask.type === 'html') {
        setCode(activeTask.initialCode || '');
        if (activeTask.mapConfig) {
            setPlayerPos(activeTask.mapConfig.start);
            setPathHistory([activeTask.mapConfig.start]);
        }
    } else if (activeTask.type === 'terminal') {
        setCode(activeTask.initialCode || ''); 
        setTerminalHistory(['> Welcome to CyberShell v1.0', '> Ready for script execution...']);
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
        setQuizSelectedOption(activeTask.quizData?.correctIndex ?? null);
    } else {
        setQuizSelectedOption(null);
        setQuizSubmitted(false);
        setQuizIsCorrect(false);
    }

    if (currentUser && ['grid', 'html', 'terminal', 'quiz'].includes(activeTask.type)) {
        startTaskAttempt(activeTask.id, currentUser.id);
    }

  }, [activeTask, currentUser]);

  const handleRunCode = async () => {
    if (isRunning || !activeTask) return;
    if (!['grid', 'html', 'terminal'].includes(activeTask.type)) return;

    playSound('click');
    setIsRunning(true);
    setMissionSuccess(false);
    
    // On Mobile, switch to Visual tab to see result
    if (window.innerWidth < 768 && activeTask.type !== 'terminal') {
        setTaskTab('visual');
    }

    setLogs(['> ИНИЦИАЛИЗАЦИЯ...']);
    if (activeTask.mapConfig) {
        setPlayerPos(activeTask.mapConfig.start);
        setPathHistory([activeTask.mapConfig.start]);
    }

    const currentInput = code;
    if (activeTask.type === 'terminal') {
        setTerminalHistory(prev => [...prev, '$ EXECUTE SCRIPT...']);
        setLiveOutput([]);
        setLiveOutputReady(false);
    }

    // --- INSTANT LOCAL CHECK ---
    const result: ExecutionResult = await evaluateCodeLocally(currentInput, activeTask);
    
    // Grid animation
    if (result.steps && result.steps.length > 0) {
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

    if (result.success) {
        setLogs(prev => [...prev, '>>> ЦЕЛЬ ДОСТИГНУТА. ПРОТОКОЛ ЗАВЕРШЕН <<<']);
        setMissionSuccess(true);
        playSound('success');
        if (currentUser) {
            await endTaskAttempt(currentUser.id, true);
        }
        handleTaskCompletion(activeTask);
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
        // Increment attempt counter on failure
        setAttemptCount(prev => ({
            ...prev,
            [activeTask.id]: (prev[activeTask.id] || 0) + 1
        }));
    }

    setIsRunning(false);
  };

  const handleQuizSubmit = () => {
      if (!activeTask || activeTask.type !== 'quiz' || quizSelectedOption === null) return;
      
      const isCorrect = quizSelectedOption === activeTask.quizData?.correctIndex;
      setQuizSubmitted(true);
      setQuizIsCorrect(isCorrect);
      
      if (isCorrect) {
          playSound('success');
          if (currentUser) {
              endTaskAttempt(currentUser.id, true);
          }
          // Don't auto-advance instantly on quiz so user can see "Correct" state
          handleTaskCompletion(activeTask, false);
      } else {
          playSound('error');
          recordError();
          if (currentUser) {
              endTaskAttempt(currentUser.id, false);
              startTaskAttempt(activeTask.id, currentUser.id);
          }
          // Increment attempt counter on wrong answer
          setAttemptCount(prev => ({
              ...prev,
              [activeTask.id]: (prev[activeTask.id] || 0) + 1
          }));
      }
  };

  const handleQuizRetry = () => {
      setQuizSubmitted(false);
      setQuizIsCorrect(false);
      setQuizSelectedOption(null);
      playSound('click');
  };

  const handleTheoryComplete = () => {
      playSound('success');
      if (activeTask) {
          handleTaskCompletion(activeTask, true); // Auto-advance
      }
  };
  
  const handleTaskCompletion = (task: Task, autoAdvance = false) => {
      const taskIndex = tasks.findIndex(t => t.id === task.id);
      let isAlreadyCompleted = false;

      if (taskIndex !== -1) {
          const updatedTasks = [...tasks];
          isAlreadyCompleted = updatedTasks[taskIndex].status === 'completed' || rewardedTaskIds.current.has(task.id);
          updatedTasks[taskIndex] = { ...updatedTasks[taskIndex], status: 'completed' };
          
          let nextTaskToActivate: Task | null = null;

          // Unlock next logic
          const courseTasks = updatedTasks.filter(t => t.courseId === task.courseId);
          const currentInCourseIdx = courseTasks.findIndex(t => t.id === task.id);
          
          if (currentInCourseIdx !== -1 && currentInCourseIdx < courseTasks.length - 1) {
             const nextTask = courseTasks[currentInCourseIdx + 1];
             const globalNextIdx = updatedTasks.findIndex(t => t.id === nextTask.id);
             if (globalNextIdx !== -1) {
                 if (updatedTasks[globalNextIdx].status === 'locked') {
                     updatedTasks[globalNextIdx] = { ...updatedTasks[globalNextIdx], status: 'open' };
                 }
                 nextTaskToActivate = updatedTasks[globalNextIdx];
             }
          }
          
          setTasks(updatedTasks);
          getHiddenCoursesForStudent(propUser.id).then(hidden => {
              setCourses(getCoursesWithProgress(updatedTasks, hidden));
          });

          // Persist task progress to localStorage
          if (currentUser) {
              const progressMap: Record<string, 'open' | 'completed' | 'locked'> = {};
              updatedTasks.forEach(t => { progressMap[t.id] = t.status; });
              saveTaskProgress(currentUser.id, progressMap);
          }

          if (autoAdvance) {
              if (nextTaskToActivate) {
                  setActiveTask(nextTaskToActivate);
                  if (window.innerWidth < 768) {
                       if (['grid', 'html', 'terminal'].includes(nextTaskToActivate.type)) setTaskTab('info');
                  }
                  playSound('open');
              } else {
                  setActiveTask(null);
                  setActiveCourseId(null);
                  setShowMobileSidebar(true);
                  playSound('open');
              }
          }
      }

      // Only award XP and Currency if the task wasn't already completed
      setLastXpAwarded(!isAlreadyCompleted);
      if (currentUser && !isAlreadyCompleted) {
          rewardedTaskIds.current.add(task.id);
          // Record streak activity
          const updatedStreak = recordActivity(currentUser.id);
          setStreak(updatedStreak);
          // Calculate penalty based on failed attempts
          const attempts = attemptCount[task.id] || 0;
          const penaltyPercent = Math.min(attempts * 20, 80); // Max 80% penalty (min 20% reward)
          const multiplier = (100 - penaltyPercent) / 100;
          
          const actualXP = Math.max(1, Math.round(task.xpReward * multiplier));
          const actualCurrency = Math.max(1, Math.round((task.currencyReward || 0) * multiplier));
          
          const newXP = currentUser.xp + actualXP;
          const newCurrency = (currentUser.currency || 0) + actualCurrency;
          const newLevel = calculateLevel(newXP);
          
          // Show penalty message if attempts > 0
          if (attempts > 0) {
              setLogs(prev => [...prev, `⚠ Штраф за ${attempts} ошибок: -${penaltyPercent}% награды`]);
          }
          
          const newAchievements = [...(currentUser.achievements || [])];
          if (!newAchievements.includes('ach_1')) newAchievements.push('ach_1');
          if (task.type === 'terminal' && !newAchievements.includes('ach_4')) newAchievements.push('ach_4');
          if (task.type === 'hanoi' && !newAchievements.includes('ach_5')) newAchievements.push('ach_5');

          // Course completion achievements (data-driven)
          const courseAchMap: Record<string, string> = {
              'course_code100': 'ach_code100',
              'course_cs101': 'ach_cs101',
              'course_lua101': 'ach_lua101',
              'course_py200': 'ach_py200',
              'course_web300': 'ach_web300',
              'course_alg101': 'ach_alg404',
          };
          const achId = courseAchMap[task.courseId];
          if (achId && !newAchievements.includes(achId)) {
              const courseTasks = tasks.filter(t => t.courseId === task.courseId);
              const allDone = courseTasks.every(t => t.id === task.id ? true : t.status === 'completed');
              if (allDone) {
                  newAchievements.push(achId);
                  const achInfo = ACHIEVEMENTS.find(a => a.id === achId);
                  if (achInfo) addToast(`🏆 ${achInfo.title}`, 'success');
              }
          }

          const prevErrors = currentUser.totalErrors || 0;

          // MERGE: combine Firebase completedTaskIds + current tasks state + this task
          const existingFirebaseIds = currentUser.completedTaskIds || [];
          const currentTasksCompleted = tasks
              .filter(t => t.status === 'completed')
              .map(t => t.id);
          const uniqueCompletedIds = [...new Set([...existingFirebaseIds, ...currentTasksCompleted, task.id])];

          const updatedUser = {
              ...currentUser,
              xp: newXP,
              currency: newCurrency,
              level: newLevel,
              achievements: newAchievements,
              tasksCompleted: uniqueCompletedIds.length,
              totalErrors: prevErrors + attempts,
              completedTaskIds: uniqueCompletedIds,
              lastActiveDate: updatedStreak.lastActiveDate,
              streak: updatedStreak.currentStreak,
          };
          
          setCurrentUser(updatedUser);
          updateUserProfile(updatedUser); // async, fire-and-forget
      }
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
          addToast(res.error || 'Ошибка покупки', 'error');
      }
  };

  const handleEquipItem = async (itemId: string) => {
      if (!currentUser) return;
      const res = await equipItem(currentUser.id, itemId);
      if (res.success && res.user) {
          setCurrentUser(res.user);
          playSound('click');
      }
  };

  const handleNextTask = () => {
    if (!activeTask) return;
    const courseTasks = tasks.filter(t => t.courseId === activeTask.courseId);
    const currentIndex = courseTasks.findIndex(t => t.id === activeTask.id);

    // If next task exists in THIS course
    if (currentIndex !== -1 && currentIndex < courseTasks.length - 1) {
        const nextTask = courseTasks[currentIndex + 1];
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
          newHint = `💡 Подсказка: Проверь синтаксис команд. Используй print() для вывода результата.`;
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
      setCode(prev => prev + (prev.endsWith('\n') || prev === '' ? '' : '\n') + cmd);
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
        <div className="flex-1 w-full bg-black p-4 md:p-8 overflow-y-auto">
             <CyberToast toasts={toasts} onDismiss={dismissToast} />
             {/* Header */}
             <div className="max-w-6xl mx-auto mb-6 md:mb-12 animate-in slide-in-from-top-4 duration-500">
                 <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <div>
                        <h1 className="text-2xl md:text-4xl font-bold text-white tracking-widest uppercase mb-1">
                            Академия <span className="text-cyber-neonBlue">Netrunner</span>
                        </h1>
                        <p className="text-gray-400 font-mono text-xs md:text-sm">Выберите программу обучения</p>
                    </div>

                    {currentUser && (
                        <div className="flex items-center gap-1.5 md:gap-4 w-full md:w-auto flex-wrap">
                            {/* STREAK DISPLAY */}
                            {streak.currentStreak > 0 && (
                                <div className="flex items-center gap-1.5 bg-black border border-orange-500/50 px-2.5 py-1.5 rounded" title={`Рекорд: ${streak.longestStreak} дней`}>
                                    <Flame size={14} className="text-orange-400 shrink-0" />
                                    <span className="font-mono font-bold text-orange-400 text-sm">{streak.currentStreak}</span>
                                </div>
                            )}

                            {/* DAILY PROGRESS */}
                            {streak.tasksToday > 0 && (
                                <div className="flex items-center gap-1.5 bg-black border border-cyber-neonGreen/50 px-2.5 py-1.5 rounded">
                                    <CheckCircle size={14} className="text-cyber-neonGreen shrink-0" />
                                    <span className="font-mono font-bold text-cyber-neonGreen text-sm">{streak.tasksToday}</span>
                                    <span className="hidden sm:inline text-[10px] text-gray-500">сегодня</span>
                                </div>
                            )}

                            {/* CURRENCY DISPLAY */}
                            <div className="flex items-center gap-1.5 bg-black border border-cyber-neonYellow/50 px-2.5 py-1.5 rounded">
                                <Coins size={14} className="text-cyber-neonYellow shrink-0" />
                                <span className="font-mono font-bold text-cyber-neonYellow text-sm">{currentUser.currency || 0}</span>
                            </div>

                            <button onClick={() => setShowMarketModal(true)} className="flex items-center gap-1.5 bg-black border border-cyber-neonPink/50 px-2 py-1.5 rounded active:bg-cyber-neonPink/20 transition-colors">
                                <ShoppingBag size={14} className="text-cyber-neonPink shrink-0" />
                                <span className="hidden sm:inline text-xs font-bold text-cyber-neonPink">МАГАЗИН</span>
                            </button>

                            <button 
                                onClick={() => { playSound('open'); setShowProfileModal(true); }}
                                className="flex items-center gap-2 md:gap-3 bg-cyber-panel border border-gray-700 p-1.5 md:p-2 rounded active:border-cyber-neonBlue transition-all group ml-auto md:ml-0"
                            >
                                <div className="text-right hidden md:block">
                                    <div className="text-white font-bold text-sm">{currentUser.name}</div>
                                    <div className="text-cyber-neonYellow font-mono text-xs">LVL {currentUser.level}</div>
                                </div>
                                <div className="text-right md:hidden">
                                    <div className="text-white font-bold text-[10px] leading-none">{currentUser.name}</div>
                                    <div className="text-cyber-neonYellow font-mono text-[9px] mt-0.5">LVL {currentUser.level}</div>
                                </div>
                                 <div className="w-10 h-10 md:w-12 md:h-12 rounded bg-black border-2 border-cyber-neonBlue overflow-hidden shrink-0 flex items-center justify-center">
                                     <div style={{ transform: 'scale(1.5)', transformOrigin: 'center center' }}>
                                       <AnimatedSprite avatarId={COSMETICS.find(c => c.id === currentUser.equipped.avatar)?.value || '2'} animation="Idle" scale={1} />
                                     </div>
                                 </div>
                            </button>
                        </div>
                    )}
                 </div>
                 
                 {/* XP BAR GLOBAL */}
                 <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden relative">
                      <div className="h-full bg-gradient-to-r from-cyber-neonBlue to-cyber-neonPink" style={{ width: `${progressPercent}%` }}></div>
                 </div>
             </div>

             {/* COURSES GRID */}
             <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 pb-12">
                {courses.map((course, idx) => (
                    <button
                        key={course.id}
                        disabled={course.status === 'locked' || course.status === 'coming_soon'}
                        onClick={() => {
                            playSound('click');
                            setActiveCourseId(course.id);
                            const courseTasks = tasks.filter(t => t.courseId === course.id);
                            if (courseTasks.length > 0) {
                                const firstOpen = courseTasks.find(t => t.status === 'open') || courseTasks[0];
                                setActiveTask(firstOpen);
                            } else {
                                setActiveTask(null);
                            }
                            setShowMobileSidebar(true);
                            setTimeout(() => { if (sidebarRef.current) sidebarRef.current.scrollTop = 0; }, 50);
                        }}
                        className={`
                            relative min-h-[14rem] md:min-h-[20rem] flex flex-col justify-between rounded-xl border-2 p-4 md:p-5 text-left transition-all duration-300 group overflow-hidden
                            ${course.status === 'active' 
                                ? 'bg-cyber-panel border-gray-700 active:border-cyber-neonBlue active:scale-95 md:hover:border-cyber-neonBlue md:hover:-translate-y-1' 
                                : 'bg-black border-gray-800 opacity-60 cursor-not-allowed'}
                        `}
                        style={{ borderColor: course.status === 'active' ? undefined : '#333' }}
                    >
                        {/* Decor */}
                        <div className="absolute top-0 left-0 w-6 h-6 border-t-2 border-l-2 border-current opacity-50" style={{color: course.color}}></div>
                        <div className="absolute bottom-0 right-0 w-6 h-6 border-b-2 border-r-2 border-current opacity-50" style={{color: course.color}}></div>

                        <div className="mb-4">
                            <div 
                                className="w-10 h-10 md:w-16 md:h-16 rounded-lg mb-3 md:mb-6 flex items-center justify-center text-black font-bold shadow-lg shrink-0"
                                style={{ backgroundColor: course.color }}
                            >
                                {getIcon(course.icon)}
                            </div>
                            
                            <h2 className="text-base md:text-xl font-bold text-white uppercase tracking-wider mb-1.5 md:mb-2 font-sans break-words leading-tight">{course.title}</h2>
                            <p className="text-gray-400 text-[11px] md:text-sm leading-relaxed break-words line-clamp-3">{course.description}</p>
                        </div>

                        <div className="mt-auto">
                            <div className="flex justify-between text-xs font-mono text-gray-500 mb-2 uppercase">
                                <span>Прогресс</span>
                                <span>{course.progress}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden shrink-0">
                                <div 
                                    className="h-full transition-all duration-1000" 
                                    style={{ width: `${course.progress}%`, backgroundColor: course.color }}
                                ></div>
                            </div>
                            
                            <div className="mt-4 flex justify-between items-center h-8 relative z-10 gap-2">
                                <span 
                                    className="text-[9px] md:text-[10px] font-bold px-2 py-1 rounded bg-black border border-gray-700 uppercase leading-tight break-words"
                                    style={{ color: course.color }}
                                >
                                    {course.difficulty}
                                </span>
                                {course.status === 'active' ? (
                                    <span className="text-white text-[10px] md:text-xs font-bold flex items-center gap-1 group-hover:translate-x-1 transition-transform bg-black/50 px-2 py-1 rounded backdrop-blur-sm shrink-0">
                                        НАЧАТЬ <ArrowRight size={14} className="shrink-0" />
                                    </span>
                                ) : (
                                    <span className="text-gray-600 text-[10px] md:text-xs font-bold flex items-center gap-1 bg-black/50 px-2 py-1 rounded backdrop-blur-sm shrink-0">
                                        <Lock size={12} className="shrink-0" /> НЕДОСТУПНО
                                    </span>
                                )}
                            </div>
                        </div>
                    </button>
                ))}
             </div>
             
             {/* PROFILE MODAL (Enhanced) */}
             {showProfileModal && currentUser && (() => {
                 const userAchievements = ACHIEVEMENTS.filter(a => currentUser.achievements.includes(a.id));
                 const totalCompleted = tasks.filter(t => t.status === 'completed').length;
                 const totalTasks = tasks.length;

                 return (
                 <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col" onClick={(e) => { if (e.target === e.currentTarget) setShowProfileModal(false); }}>
                     <div className="h-14 md:h-16 shrink-0" />
                     <div className="flex-1 flex items-start md:items-center justify-center p-3 md:p-4 overflow-hidden">
                     <div className="w-full max-w-md max-h-full md:max-h-[85vh] bg-[#0c0c10] border border-gray-700 flex flex-col relative rounded-lg overflow-hidden shadow-2xl animate-in zoom-in-95">
                        <button onClick={() => setShowProfileModal(false)} className="absolute top-3 right-3 z-50 text-gray-500 hover:text-white p-2 active:bg-gray-800 rounded">
                            <X size={24} />
                        </button>
                        <div className="p-6 md:p-8 overflow-y-auto custom-scrollbar">
                            {/* Avatar + Name */}
                            <div className="text-center mb-6">
                                <div className="w-28 h-28 mx-auto rounded-full border-4 border-cyber-neonBlue bg-black mb-4 flex items-center justify-center shadow-[0_0_30px_rgba(0,243,255,0.3)]">
                                    <AnimatedSprite avatarId={COSMETICS.find(c => c.id === currentUser.equipped.avatar)?.value || '2'} animation="Idle" scale={2} />
                                </div>
                                <h3 className="text-2xl font-bold text-white uppercase">{currentUser.name}</h3>
                                <span className="text-cyber-neonYellow font-mono text-sm">УРОВЕНЬ {currentUser.level}</span>
                            </div>

                            {/* Stats Grid */}
                            <div className="grid grid-cols-3 gap-3 mb-6">
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center">
                                    <div className="text-cyber-neonBlue font-mono font-bold text-lg">{currentUser.xp}</div>
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider">XP</div>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center">
                                    <div className="text-cyber-neonYellow font-mono font-bold text-lg">{currentUser.currency}</div>
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider">Bits</div>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center">
                                    <div className="text-cyber-neonGreen font-mono font-bold text-lg">{totalCompleted}</div>
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider">Задач</div>
                                </div>
                                <div className="bg-gray-900 border border-orange-500/30 rounded-lg p-3 text-center">
                                    <div className="text-orange-400 font-mono font-bold text-lg">{streak.currentStreak}</div>
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider">Streak</div>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center">
                                    <div className="text-orange-300 font-mono font-bold text-lg">{streak.longestStreak}</div>
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider">Рекорд</div>
                                </div>
                                <div className="bg-gray-900 border border-gray-800 rounded-lg p-3 text-center">
                                    <div className="text-cyber-neonGreen font-mono font-bold text-lg">{streak.tasksToday}</div>
                                    <div className="text-gray-500 text-[10px] uppercase tracking-wider">Сегодня</div>
                                </div>
                            </div>

                            {/* XP Progress to Next Level */}
                            <div className="mb-6">
                                <div className="flex justify-between text-xs text-gray-500 mb-1">
                                    <span>Прогресс до LVL {currentLevel + 1}</span>
                                    <span className="font-mono">{currentXP} / {nextLevelXP}</span>
                                </div>
                                <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-cyber-neonBlue to-cyber-neonPink transition-all duration-500" style={{ width: `${progressPercent}%` }}></div>
                                </div>
                            </div>

                            {/* Course Progress */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Flame size={14} className="text-cyber-neonPink" /> Прогресс по курсам
                                </h4>
                                <div className="space-y-2">
                                    {courses.filter(c => c.status === 'active').map(course => (
                                        <div key={course.id} className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: course.color }}></div>
                                            <span className="text-xs text-gray-300 flex-1 leading-tight break-words">{course.title.split(':')[0]}</span>
                                            <div className="w-20 h-1.5 bg-gray-800 rounded-full overflow-hidden shrink-0">
                                                <div className="h-full transition-all" style={{ width: `${course.progress}%`, backgroundColor: course.color }}></div>
                                            </div>
                                            <span className="text-[10px] font-mono text-gray-500 w-8 text-right">{course.progress}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Achievements */}
                            <div className="mb-6">
                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                    <Award size={14} className="text-cyber-neonYellow" /> Достижения ({userAchievements.length}/{ACHIEVEMENTS.length})
                                </h4>
                                {userAchievements.length === 0 ? (
                                    <div className="text-center py-4 text-gray-600 text-xs font-mono">Нет разблокированных достижений</div>
                                ) : (
                                    <div className="grid grid-cols-2 gap-2">
                                        {userAchievements.map(ach => (
                                            <div key={ach.id} className="bg-gray-900 border border-cyber-neonYellow/20 rounded-lg p-3 flex items-center gap-2">
                                                <span className="text-xl shrink-0">{ach.icon}</span>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] font-bold text-white leading-tight break-words">{ach.title}</div>
                                                    <div className="text-[9px] text-gray-500 leading-tight break-words">{ach.description}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                                {/* Locked achievements teaser */}
                                {userAchievements.length < ACHIEVEMENTS.length && (
                                    <div className="mt-2 grid grid-cols-2 gap-2">
                                        {ACHIEVEMENTS.filter(a => !currentUser.achievements.includes(a.id)).slice(0, 4).map(ach => (
                                            <div key={ach.id} className="bg-gray-900/50 border border-gray-800 rounded-lg p-3 flex items-center gap-2 opacity-40">
                                                <span className="text-xl shrink-0 grayscale">🔒</span>
                                                <div className="min-w-0">
                                                    <div className="text-[10px] font-bold text-gray-500 leading-tight break-words">???</div>
                                                    <div className="text-[9px] text-gray-600 leading-tight break-words">{ach.description}</div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <button onClick={() => setShowProfileModal(false)} className="w-full bg-cyber-neonBlue text-black py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors rounded">ЗАКРЫТЬ</button>
                        </div>
                     </div>
                     </div>
                 </div>
                 );
             })()}

             {/* MARKET MODAL */}
             {showMarketModal && currentUser && (
                 <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col" onClick={(e) => { if (e.target === e.currentTarget) setShowMarketModal(false); }}>
                     {/* Spacer for global header on mobile */}
                     <div className="h-14 md:h-16 shrink-0" />
                     <div className="flex-1 flex items-start md:items-center justify-center p-3 md:p-4 overflow-hidden">
                     <div className="w-full max-w-lg md:max-w-5xl h-full md:h-[85vh] bg-[#0c0c10] border border-cyber-neonPink flex flex-col relative rounded-lg overflow-hidden shadow-[0_0_50px_rgba(255,0,255,0.1)]">
                        <div className="p-3 md:p-4 border-b border-gray-800 flex justify-between items-center bg-gray-900 shrink-0">
                             <div className="flex items-center gap-2">
                                 <button onClick={() => setShowMarketModal(false)} className="text-gray-400 hover:text-white p-1.5 -ml-1 active:bg-gray-800 rounded"><ChevronLeft size={22} /></button>
                                 <h2 className="text-base md:text-xl font-bold text-cyber-neonPink flex items-center gap-2"><ShoppingBag size={18} /> <span className="hidden sm:inline">ЧЕРНЫЙ</span> РЫНОК</h2>
                             </div>
                             <div className="flex items-center gap-2 md:gap-4">
                                 <div className="text-cyber-neonYellow font-mono font-bold flex items-center gap-1.5 bg-black px-2 md:px-3 py-1 rounded border border-cyber-neonYellow/30 text-sm">
                                     <Coins size={14}/> {currentUser.currency}
                                 </div>
                                 <button onClick={() => setShowMarketModal(false)} className="text-gray-500 hover:text-white p-1.5 active:bg-gray-800 rounded"><X size={22} /></button>
                             </div>
                        </div>
                        
                        <div className="flex-1 overflow-y-auto p-3 md:p-6 grid grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 auto-rows-max">
                            {COSMETICS.map(item => {
                                const isOwned = currentUser.inventory.includes(item.id);
                                const isEquipped = currentUser.equipped.avatar === item.id || currentUser.equipped.droneColor === item.id;
                                const canAfford = currentUser.currency >= item.cost;
                                const isLocked = currentUser.level < item.unlockLevel;

                                return (
                                    <div key={item.id} className={`bg-black border rounded-lg ${isEquipped ? 'border-cyber-neonBlue' : 'border-gray-800'} p-3 md:p-4 flex flex-col items-center text-center relative group hover:border-gray-600 transition-colors`}>
                                        {isLocked && (
                                            <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-10 flex-col">
                                                <Lock className="text-gray-500 mb-2" />
                                                <span className="text-xs text-gray-500 font-mono">REQ: LVL {item.unlockLevel}</span>
                                            </div>
                                        )}
                                        
                                        <div className="w-16 h-16 md:w-20 md:h-20 mb-3 md:mb-4 rounded-full border border-gray-700 flex items-center justify-center overflow-hidden bg-gray-900">
                                            {item.type === 'avatar' ? (
                                                <AnimatedSprite avatarId={item.value} animation="Idle" scale={1.5} />
                                            ) : (
                                                <div className="w-10 h-10 rounded-full shadow-[0_0_15px]" style={{backgroundColor: item.value, boxShadow: `0 0 15px ${item.value}`}}></div>
                                            )}
                                        </div>
                                        
                                        <h3 className="text-white font-bold text-xs md:text-sm mb-0.5 md:mb-1 leading-tight">{item.name}</h3>
                                        <p className="text-gray-500 text-[9px] md:text-[10px] uppercase mb-2 md:mb-4">{item.type === 'avatar' ? 'Аватар' : 'Цвет Дрона'}</p>
                                        
                                        {isOwned ? (
                                            <button 
                                                onClick={() => handleEquipItem(item.id)}
                                                disabled={isEquipped}
                                                className={`w-full py-1.5 md:py-2 text-[10px] md:text-xs font-bold uppercase rounded ${isEquipped ? 'bg-cyber-neonBlue text-black cursor-default' : 'bg-gray-800 text-white hover:bg-gray-700'}`}
                                            >
                                                {isEquipped ? 'Экипировано' : 'Надеть'}
                                            </button>
                                        ) : (
                                            <button 
                                                onClick={() => handleBuyItem(item.id)}
                                                disabled={!canAfford || isLocked}
                                                className={`w-full py-1.5 md:py-2 text-[10px] md:text-xs font-bold uppercase flex items-center justify-center gap-1.5 rounded ${canAfford ? 'bg-cyber-neonPink text-black hover:bg-white' : 'bg-gray-900 text-gray-600 cursor-not-allowed'}`}
                                            >
                                                <span>Купить</span>
                                                <span className="flex items-center gap-1"><Coins size={10}/> {item.cost}</span>
                                            </button>
                                        )}
                                    </div>
                                )
                            })}
                        </div>
                     </div>
                     </div>
                 </div>
             )}
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

  return (
    <div className="flex-1 w-full relative flex flex-col md:flex-row overflow-hidden bg-black text-gray-300">
      <CyberToast toasts={toasts} onDismiss={dismissToast} />
      
      {/* SIDEBAR (Courses) */}
      <div className={`${showMobileSidebar ? 'flex' : 'hidden'} md:flex absolute md:relative inset-0 md:inset-auto md:w-64 border-r border-cyber-neonBlue/20 bg-cyber-glass backdrop-blur-md flex-col shrink-0 z-30`}>
        <div className="h-14 flex items-center justify-between border-b border-cyber-neonBlue/20 px-3 shrink-0">
            <button 
                onClick={() => {
                    playSound('click');
                    setActiveCourseId(null);
                    setActiveTask(null);
                }}
                className="flex items-center gap-1 text-gray-200 active:text-white py-3 pr-4 text-xs font-bold uppercase tracking-wider hover:text-cyber-neonBlue transition-colors"
            >
                <ChevronLeft size={18} /> Курсы
            </button>
            {currentUser && (
                <div className="flex items-center gap-2">
                    <span className="text-cyber-neonYellow font-mono text-xs font-bold">LVL {currentUser.level}</span>
                    <span className="text-gray-600 text-xs">|</span>
                    <span className="text-cyber-neonBlue font-mono text-xs">{currentUser.xp} XP</span>
                </div>
            )}
        </div>

        <div ref={sidebarRef} className="flex-1 overflow-y-auto p-2 space-y-4 custom-scrollbar pb-6">
            {modules.map((modName) => {
                const modTasks = filteredTasks.filter(t => t.module === modName);
                const modCompleted = modTasks.filter(t => t.status === 'completed').length;
                const modTotal = modTasks.length;
                const modProgress = modTotal > 0 ? Math.round((modCompleted / modTotal) * 100) : 0;
                return (
                <div key={modName}>
                    <div className="flex items-center justify-between mb-2 pl-2 ml-1 border-l-2 border-gray-500">
                        <h3 className="text-[10px] font-bold text-gray-300 uppercase tracking-widest">
                            {modName}
                        </h3>
                        <div className="flex items-center gap-1.5 pr-1">
                            <div className="w-12 h-1 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-cyber-neonGreen transition-all duration-300" style={{ width: `${modProgress}%` }}></div>
                            </div>
                            <span className="text-[9px] font-mono text-gray-400">{modCompleted}/{modTotal}</span>
                        </div>
                    </div>
                    <div className="space-y-1">
                        {filteredTasks.filter(t => t.module === modName).map(task => (
                             <button 
                                key={task.id}
                                onClick={() => {
                                    playSound('click');
                                    setActiveTask(task);
                                    if (window.innerWidth < 768) {
                                        setShowMobileSidebar(false);
                                        if (['grid', 'html', 'terminal'].includes(task.type)) {
                                            setTaskTab('info');
                                        }
                                    }
                                }}
                                disabled={task.status === 'locked'}
                                className={`w-full relative group text-left p-2 md:p-2 py-3 md:py-2 rounded-md flex items-center gap-3 transition-all duration-200 border border-transparent
                                    ${activeTask?.id === task.id 
                                    ? 'bg-cyber-neonBlue/10 border-cyber-neonBlue/50 text-white shadow-[inset_0_0_15px_rgba(0,243,255,0.1)]' 
                                    : 'hover:bg-white/5 text-gray-200 hover:text-white'} 
                                    ${task.status === 'locked' ? 'opacity-40 cursor-not-allowed grayscale' : 'cursor-pointer'}`}
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
                                     <div className={`w-4 h-4 rounded-sm border ${activeTask?.id === task.id ? 'bg-cyber-neonBlue border-cyber-neonBlue animate-pulse' : 'border-gray-500'}`}></div>}
                                </div>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="text-sm md:text-sm font-bold leading-tight font-sans break-words">{task.title}</div>
                                    <div className="text-[10px] font-mono mt-1 md:mt-1 opacity-80 text-cyber-neonYellow">XP: {task.xpReward}</div>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>
                );
            })}
        </div>
      </div>

      {/* 0. EMPTY TASK STATE */}
      {!activeTask && (
          <div className={`${!showMobileSidebar ? 'flex' : 'hidden'} md:flex flex-1 items-center justify-center text-gray-600 bg-black`}>
              Выберите задачу в меню слева
          </div>
      )}

      {/* 1. THEORY VIEW */}
      {activeTask?.type === 'theory' && (
          <div className={`${!showMobileSidebar ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-black relative overflow-hidden`}>
                <div className="flex items-center border-b border-gray-800 px-4 py-3 bg-gray-950 shrink-0">
                    <button 
                        onClick={() => setShowMobileSidebar(true)} 
                        className="md:hidden flex items-center gap-2 text-gray-200 active:text-white mr-3"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <span className="text-xs font-bold uppercase text-gray-300 tracking-widest leading-tight break-words flex-1">{activeTask.title}</span>
                </div>
                <div className="flex-1 overflow-y-auto p-5 md:p-12">
                <div className="max-w-3xl mx-auto w-full">
                    <div className="mb-8 border-b border-gray-800 pb-4">
                        <h1 className="text-3xl md:text-5xl font-bold text-cyber-neonPink font-sans uppercase mb-2 animate-in slide-in-from-left">
                            {activeTask.title}
                        </h1>
                        <div className="text-cyber-neonBlue font-mono text-sm tracking-widest">{'>> ЗАГРУЗКА_ДАННЫХ...'}</div>
                    </div>
                    
                    <div className="prose prose-invert prose-lg max-w-none font-sans text-gray-300 space-y-6">
                         <div dangerouslySetInnerHTML={{ __html: activeTask.theory || '' }} />
                    </div>

                    <div className="mt-12 pt-8 border-t border-gray-800 flex justify-end">
                        <button 
                            onClick={activeTask.status === 'completed' ? handleNextTask : handleTheoryComplete}
                            className="px-8 py-4 bg-cyber-neonBlue text-black font-bold text-lg uppercase tracking-widest hover:bg-white transition-all flex items-center gap-3"
                            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                        >
                             {(() => {
                                 const courseTasks = tasks.filter(t => t.courseId === activeTask.courseId);
                                 const idx = courseTasks.findIndex(t => t.id === activeTask.id);
                                 return idx < courseTasks.length - 1 ? 'Далее' : 'Завершить';
                             })()} <ArrowRight />
                        </button>
                    </div>
                </div>
                </div>
          </div>
      )}

      {/* 2. QUIZ VIEW */}
      {activeTask?.type === 'quiz' && (
          <div className={`${!showMobileSidebar ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-black relative overflow-hidden`}>
              <div className="flex items-center border-b border-gray-800 px-4 py-3 bg-gray-950 shrink-0">
                  <button 
                      onClick={() => setShowMobileSidebar(true)} 
                      className="md:hidden flex items-center gap-2 text-gray-200 active:text-white mr-3"
                  >
                      <ChevronLeft size={20} />
                  </button>
                  <span className="text-xs font-bold uppercase text-gray-300 tracking-widest leading-tight break-words flex-1">{activeTask.title}</span>
              </div>
              <div className="flex-1 overflow-y-auto p-4 md:p-12 flex flex-col items-center justify-start md:justify-center">
              <div className="max-w-2xl w-full bg-[#0e0e12] border border-gray-800 p-6 md:p-12 relative shadow-2xl">
                  {/* Decor */}
                  <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-neonYellow"></div>
                  <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-neonYellow"></div>

                  <div className="text-center mb-8">
                      <div className="inline-block px-3 py-1 bg-cyber-neonYellow/20 text-cyber-neonYellow text-xs font-bold uppercase tracking-widest mb-4 border border-cyber-neonYellow/50">
                          Системная Диагностика
                      </div>
                      <h2 className="text-xl md:text-2xl font-bold text-white mb-6 whitespace-pre-line break-words">
                          {activeTask.quizData?.question}
                      </h2>
                  </div>

                  <div className="space-y-4">
                      {activeTask.quizData?.options.map((opt, idx) => {
                          let stateClass = "border-gray-700 hover:border-cyber-neonBlue hover:bg-white/5 text-gray-300";
                          if (quizSubmitted) {
                              if (idx === activeTask.quizData?.correctIndex) stateClass = "border-cyber-neonGreen bg-cyber-neonGreen/20 text-cyber-neonGreen";
                              else if (idx === quizSelectedOption) stateClass = "border-red-500 bg-red-500/20 text-red-500";
                              else stateClass = "border-gray-800 opacity-50";
                          } else if (idx === quizSelectedOption) {
                              stateClass = "border-cyber-neonBlue bg-cyber-neonBlue/20 text-white";
                          }

                          return (
                            <button
                                key={idx}
                                disabled={quizSubmitted}
                                onClick={() => { playSound('click'); setQuizSelectedOption(idx); }}
                                className={`w-full p-4 border text-left font-mono text-sm md:text-base transition-all duration-200 ${stateClass}`}
                            >
                                <span className="mr-4 opacity-50">{idx + 1}.</span>
                                {opt}
                            </button>
                          )
                      })}
                  </div>

                  {quizSubmitted && activeTask.quizData?.explanation && (
                      <div className={`mt-6 p-4 border rounded text-sm ${quizIsCorrect ? 'border-cyber-neonGreen/30 bg-cyber-neonGreen/5 text-gray-300' : 'border-red-500/30 bg-red-500/5 text-gray-300'}`}>
                          <span className="font-bold text-white block mb-1">{quizIsCorrect ? '💡 Пояснение:' : '📖 Разбор:'}</span>
                          {activeTask.quizData.explanation}
                      </div>
                  )}

                  <div className="mt-8 pt-6 border-t border-gray-800 flex justify-between items-center">
                      <div className="text-sm">
                          {quizSubmitted && (
                              <span className={quizIsCorrect ? "text-cyber-neonGreen font-bold" : "text-red-500 font-bold"}>
                                  {quizIsCorrect ? ">> ДОСТУП РАЗРЕШЕН" : ">> ОШИБКА ДОСТУПА"}
                              </span>
                          )}
                      </div>
                      
                      {!quizSubmitted ? (
                          <button 
                             onClick={handleQuizSubmit}
                             disabled={quizSelectedOption === null}
                             className={`px-8 py-3 font-bold uppercase tracking-widest transition-all ${quizSelectedOption !== null ? 'bg-cyber-neonBlue text-black hover:bg-white' : 'bg-gray-800 text-gray-500 cursor-not-allowed'}`}
                          >
                              Проверить
                          </button>
                      ) : (
                          quizIsCorrect ? (
                              <button 
                                onClick={handleNextTask}
                                className="px-6 py-3 bg-cyber-neonGreen text-black hover:bg-white border border-cyber-neonGreen font-bold uppercase flex items-center gap-2 text-sm md:text-base"
                              >
                                  {(tasks.filter(t => t.courseId === activeTask.courseId).findIndex(t => t.id === activeTask.id) < tasks.filter(t => t.courseId === activeTask.courseId).length - 1) ? 'Далее' : 'Завершить'} <ArrowRight size={18} />
                              </button>
                          ) : (
                              <button 
                                onClick={handleQuizRetry}
                                className="px-6 py-3 bg-red-500/20 text-red-500 hover:bg-red-500 hover:text-black border border-red-500 font-bold uppercase flex items-center gap-2 transition-colors text-sm md:text-base"
                              >
                                  <RotateCcw size={18} /> Повторить
                              </button>
                          )
                      )}
                  </div>
              </div>
              </div>{/* end scroll container */}
          </div>
      )}

      {/* 3. BLOCKS (drag-and-drop) VIEW */}
      {activeTask?.type === 'blocks' && (
          <div className={`${!showMobileSidebar ? 'flex' : 'hidden'} md:flex flex-1 flex-col bg-black relative overflow-hidden`}>
              <div className="flex items-center border-b border-gray-800 px-4 py-3 bg-gray-950 shrink-0">
                  <button 
                      onClick={() => setShowMobileSidebar(true)} 
                      className="md:hidden flex items-center gap-2 text-gray-200 active:text-white mr-3"
                  >
                      <ChevronLeft size={20} />
                  </button>
                  <span className="text-xs font-bold uppercase text-gray-300 tracking-widest leading-tight break-words flex-1">{activeTask.title}</span>
              </div>
              <BlockCoding 
                task={activeTask} 
                onSuccess={() => { playSound('success'); setMissionSuccess(true); handleTaskCompletion(activeTask, false); }}
                onFail={() => {
                    setAttemptCount(prev => ({
                        ...prev,
                        [activeTask.id]: (prev[activeTask.id] || 0) + 1
                    }));
                }}
              />
          </div>
      )}

      {/* 4. TOWER OF HANOI MINI GAME */}
      {isHanoiTask && (
        <div className={`${!showMobileSidebar ? 'flex' : 'hidden'} md:flex flex-1 flex-col w-full relative overflow-hidden`}>
            <div className="flex items-center border-b border-gray-800 px-4 py-3 bg-gray-950 shrink-0">
                <button 
                    onClick={() => setShowMobileSidebar(true)} 
                    className="md:hidden flex items-center gap-2 text-gray-200 active:text-white mr-3"
                >
                    <ChevronLeft size={20} />
                </button>
                <span className="text-xs font-bold uppercase text-gray-300 tracking-widest leading-tight break-words flex-1">{activeTask?.title}</span>
            </div>
            <div className="flex-1 overflow-hidden">
                <HanoiGame task={activeTask!} onComplete={() => handleTaskCompletion(activeTask!)} />
            </div>
        </div>
      )}

      {/* 4. CODE/TERMINAL TASK VIEW */}
      {isCodingTask && activeTask && (
          <div className={`${!showMobileSidebar ? 'flex' : 'hidden'} md:flex flex-1 flex-col min-w-0 overflow-hidden`}>
            {/* MOBILE TOP BAR (always visible for coding tasks) */}
            <div className="md:hidden flex items-center border-b border-gray-800 px-2 py-2 bg-gray-950 shrink-0 gap-2">
                <button onClick={() => setShowMobileSidebar(true)} className="p-2 text-gray-200 active:text-white shrink-0"><ChevronLeft size={20}/></button>
                <span className="text-xs font-bold text-gray-300 uppercase leading-tight break-words flex-1">{activeTask.title}</span>
                <button 
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className={`shrink-0 px-4 py-2 text-xs font-bold uppercase flex items-center gap-1 ${isRunning ? 'bg-gray-700 text-gray-400' : 'bg-cyber-neonGreen text-black'}`}
                >
                    {isRunning ? <Loader2 size={14} className="animate-spin"/> : <Play size={14} className="fill-current"/>}
                    {isRunning ? '...' : 'RUN'}
                </button>
            </div>

            {/* CONTENT AREA: tabs on mobile, side-by-side on desktop */}
            <div className="flex-1 flex flex-col md:flex-row min-w-0 overflow-hidden">

            {/* MOBILE: TASK INFO TAB */}
            <div className={`${taskTab === 'info' ? 'flex' : 'hidden'} md:hidden flex-1 flex-col bg-gray-950 overflow-hidden`}>
                <div className="flex-1 overflow-y-auto p-4">
                    <div className="prose prose-invert prose-sm max-w-none">
                        <h3 className="text-cyber-neonGreen font-mono">БРИФИНГ</h3>
                        <p className="text-gray-400">{activeTask.description}</p>
                        <div className="h-px bg-gray-800 my-4"></div>
                        <h3 className="text-cyber-neonBlue font-mono flex items-center gap-2"><BookOpen size={16}/> СПРАВОЧНИК</h3>
                        <div dangerouslySetInnerHTML={{ __html: activeTask.theory || '' }} />
                    </div>
                </div>
            </div>

            {/* EDITOR AREA / TERMINAL INPUT */}
            <div className={`${taskTab === 'code' ? 'flex' : 'hidden'} md:flex flex-1 flex-col relative min-w-0 bg-black overflow-hidden`}>
                 {/* Top Bar Desktop Only */}
                 <div className="hidden md:flex min-h-[3.5rem] py-2 bg-gray-900 border-b border-cyber-neonBlue/20 items-center justify-between px-4 shrink-0">
                     <div className="flex items-center gap-3 min-w-0">
                         <div className="bg-cyber-neonPink/20 p-1.5 rounded text-cyber-neonPink border border-cyber-neonPink/50 shrink-0"><Code size={16} /></div>
                         <div className="min-w-0">
                             <h1 className="text-sm font-bold text-white uppercase leading-tight break-words flex-1">{activeTask.title}</h1>
                             <div className="text-[10px] text-gray-500 font-mono leading-tight break-words">OBJ: {activeTask.description}</div>
                         </div>
                     </div>
                     <div className="flex gap-2">
                         <button 
                            title="Сбросить код к начальному"
                            onClick={() => { playSound('click'); setCode(activeTask.initialCode || ''); }} 
                            className="p-2 text-gray-500 hover:text-red-400"
                        >
                            <RotateCcw size={18} />
                        </button>
                         <button 
                            onClick={() => setShowTheory(!showTheory)} 
                            className={`flex items-center gap-2 px-3 py-1.5 text-xs font-bold uppercase border transition-all ${showTheory ? 'bg-cyber-neonBlue text-black border-cyber-neonBlue' : 'border-cyber-neonBlue/30 text-cyber-neonBlue'}`}
                        >
                            <BookOpen size={14} /> Справка
                        </button>
                     </div>
                 </div>

                 {/* Theory Panel (Desktop) */}
                 <div className={`hidden md:block bg-gray-900 border-b border-cyber-neonBlue/20 overflow-hidden transition-all duration-300 ${showTheory ? 'max-h-[35vh]' : 'max-h-0'}`}>
                    <div className="p-6 overflow-y-auto max-h-[35vh] prose prose-invert prose-sm max-w-none">
                        <h3 className="text-cyber-neonGreen font-mono">БАЗА_ЗНАНИЙ</h3>
                        <div dangerouslySetInnerHTML={{ __html: activeTask.theory || '' }} />
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
                                    autoFocus
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    // Removed Enter key binding to allow multiline typing
                                    className="flex-1 bg-transparent border-none outline-none text-cyber-neonGreen font-mono resize-none min-h-[120px] md:min-h-[80px]"
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
                                    <span className="text-[10px] font-bold text-gray-600 uppercase shrink-0 px-2">Hacks:</span>
                                    {activeTask.allowedCommands.map(cmd => (
                                        <button 
                                            key={cmd}
                                            onClick={() => insertCommand(cmd)}
                                            className="px-3 py-2 bg-[#1a1a20] border border-gray-700 text-gray-300 text-xs font-mono rounded active:bg-cyber-neonBlue active:text-black whitespace-nowrap"
                                        >
                                            {cmd}
                                        </button>
                                    ))}
                                </div>
                            )}

                            <textarea
                                ref={editorRef}
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
                                className="flex-1 bg-black text-gray-200 p-4 font-mono text-sm resize-none focus:outline-none leading-relaxed whitespace-pre min-w-0 min-h-[200px] md:min-h-0"
                                spellCheck={false}
                                placeholder={activeTask.type === 'html' ? "<!-- Пиши HTML код здесь -->" : "// Введите код..."}
                            />
                        </>
                    )}
                    
                    {/* Execute Button Desktop */}
                    <div className="absolute bottom-6 right-6 z-20 hidden md:block">
                        <button 
                            onClick={handleRunCode}
                            disabled={isRunning}
                            className={`pl-6 pr-8 py-4 bg-cyber-neonGreen text-black font-bold font-sans text-lg uppercase tracking-widest clip-path-polygon hover:bg-white transition-all ${isRunning ? 'opacity-70 cursor-wait' : 'hover:scale-105'}`}
                            style={{ clipPath: 'polygon(10% 0, 100% 0, 100% 70%, 90% 100%, 0 100%, 0 30%)' }}
                        >
                            <div className="flex items-center gap-3">{isRunning ? <Loader2 className="animate-spin" /> : <Play className="fill-current" />} {isRunning ? 'ВЫПОЛНЕНИЕ...' : 'ЗАПУСК'}</div>
                        </button>
                    </div>
                 </div>
            </div>

            {/* VISUAL AREA */}
            <div className={`${taskTab === 'visual' ? 'flex' : 'hidden'} md:flex md:w-96 bg-[#0c0c10] flex-col shrink-0 relative z-20 border-l border-gray-800 overflow-hidden`}>

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
                                 sandbox="allow-same-origin"
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
                                 <button onClick={handleGetHint} disabled={isHintLoading} className="px-2 py-1 border border-cyber-neonBlue/30 bg-cyber-neonBlue/5 text-cyber-neonBlue font-bold text-[10px] uppercase flex items-center gap-1 shrink-0 rounded">{isHintLoading ? <Loader2 className="animate-spin w-3 h-3"/> : <Zap size={10}/>} Хинт</button>
                             </div>
                         </div>
                     </div>
                 )}

                 {/* === GRID / TERMINAL TASKS: Render box + logs === */}
                 {activeTask.type !== 'html' && (
                     <>
                         <div className="p-3 border-b border-gray-800 bg-cyber-panel flex justify-between items-center shrink-0">
                             <span className="text-xs font-bold text-cyber-neonBlue tracking-widest uppercase flex items-center gap-2"><div className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></div> LIVE FEED</span>
                             <span className="text-[10px] font-mono text-gray-500">MODE: {activeTask.type === 'terminal' ? 'SHELL' : 'DRONE'}</span>
                         </div>

                         {/* RENDER BOX */}
                         <div className="w-full relative bg-black flex items-center justify-center overflow-hidden border-b border-cyber-neonBlue/20 shrink-0 aspect-square md:max-h-[50vh]">
                             
                             {activeTask.type === 'grid' && activeTask.mapConfig && (
                                <GameGrid task={activeTask} playerPos={playerPos} pathHistory={pathHistory} droneColor={equippedDroneColorValue} />
                             )}

                             {activeTask.type === 'terminal' && (
                                 <div className="w-full h-full bg-black flex flex-col overflow-hidden font-mono text-xs relative">
                                     {/* Animated avatar */}
                                     <div className="flex items-end justify-center py-3 bg-gradient-to-b from-gray-900 to-black border-b border-gray-800/50 shrink-0">
                                         <div className="relative">
                                             <AnimatedSprite
                                                 avatarId={equippedAvatarId}
                                                 animation={isRunning ? (hasAnimation(equippedAvatarId, 'Special') ? 'Special' : 'Walk') : 'Idle'}
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
                             <div className="flex items-center gap-2 mb-2 opacity-70 shrink-0"><Bot size={20} className="text-cyber-neonBlue" /><h3 className="font-bold text-gray-300 text-xs">LOGS</h3></div>
                             <div className="flex-1 border border-dashed border-gray-700 rounded-lg p-3 mb-3 bg-black/40 text-xs text-gray-400 font-mono overflow-y-auto">
                                 {logs.map((log, i) => <div key={i} className={log.includes('ОШИБКА') ? 'text-red-500' : 'text-gray-400'}>{log}</div>)}
                             </div>
                             <button onClick={handleGetHint} disabled={isHintLoading} className="w-full py-3 border border-cyber-neonBlue/30 bg-cyber-neonBlue/5 text-cyber-neonBlue font-bold text-xs uppercase flex justify-center items-center gap-2 shrink-0">{isHintLoading ? <Loader2 className="animate-spin w-4 h-4"/> : <Zap size={16}/>} ПОДСКАЗКА</button>
                         </div>
                     </>
                 )}
            </div>{/* end visual area */}

            </div>{/* end content area flex row */}
          </div>
      )}

      {/* --- MOBILE BOTTOM NAVIGATION (coding tasks only) --- */}
      {isCodingTask && !showMobileSidebar && (
        <div className="md:hidden h-14 bg-gray-900 border-t border-gray-800 flex items-stretch shrink-0 z-[60] w-full">
            <button onClick={() => setTaskTab('info')} className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 ${taskTab === 'info' ? 'text-cyber-neonBlue bg-black' : 'text-gray-500'}`}>
                <LayoutList size={18} />
                <span className="text-[9px] font-bold uppercase">Инфо</span>
            </button>
            <button onClick={() => setTaskTab('code')} className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 ${taskTab === 'code' ? 'text-cyber-neonBlue bg-black' : 'text-gray-500'}`}>
                <Code size={18} />
                <span className="text-[9px] font-bold uppercase">Код</span>
            </button>
            <button onClick={() => setTaskTab('visual')} className={`flex flex-col items-center justify-center flex-1 py-2 gap-1 ${taskTab === 'visual' ? 'text-cyber-neonBlue bg-black' : 'text-gray-500'}`}>
                <Eye size={18} />
                <span className="text-[9px] font-bold uppercase">Вывод</span>
            </button>
        </div>
      )}

      {/* --- MISSION COMPLETE BANNER (compact, doesn't block LIVE FEED) --- */}
      {missionSuccess && activeTask && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-[200] animate-in slide-in-from-bottom-4 fade-in duration-500 w-[90%] max-w-md">
               <div className="bg-[#0a0a10] border border-cyber-neonYellow/50 rounded-lg p-4 shadow-[0_0_40px_rgba(252,238,10,0.15)] flex items-center gap-4">
                   <Trophy size={32} className="text-cyber-neonYellow shrink-0 animate-bounce" />
                   <div className="flex-1 min-w-0">
                       <h2 className="text-sm font-bold text-white uppercase tracking-widest">Миссия Выполнена</h2>
                       <div className="text-cyber-neonBlue font-mono text-xs mt-0.5">
                           {lastXpAwarded ? (() => {
                               const attempts = attemptCount[activeTask.id] || 0;
                               const penaltyPercent = Math.min(attempts * 20, 80);
                               const multiplier = (100 - penaltyPercent) / 100;
                               const actualXP = Math.max(1, Math.round(activeTask.xpReward * multiplier));
                               const actualCurrency = Math.max(1, Math.round((activeTask.currencyReward || 0) * multiplier));
                               const hasPenalty = attempts > 0;
                               return (
                                   <>
                                       <span className={hasPenalty ? 'line-through opacity-50' : ''}>
                                           + {activeTask.xpReward} XP | + {activeTask.currencyReward} BITS
                                       </span>
                                       {hasPenalty && (
                                           <span className="text-red-400 ml-2">
                                               → {actualXP} XP | {actualCurrency} BITS (-{penaltyPercent}%)
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
