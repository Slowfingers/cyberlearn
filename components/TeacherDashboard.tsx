
import React, { useState, useEffect, useCallback } from 'react';
import { Classroom, User, StudentProgress, Task } from '../types';
import { createClassroom, getClassStudents, createTaskForClass, updateClassroom, deleteClassroom } from '../services/mockBackend';
import { COURSES } from '../constants';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Users, Activity, BrainCircuit, Key, Copy, PlusCircle, RefreshCw, Layers, ChevronRight, Hash, Edit3, Save, Flag, PlayCircle, Ban, Menu, X, ArrowLeft, LogOut, BookOpen, EyeOff, Eye, Flame, Trophy, ChevronDown, ChevronUp, CheckCircle, ArrowUpDown, Target, Trash2, ExternalLink } from 'lucide-react';
import { playSound } from '../utils/sound';
import CyberToast, { ToastMessage } from './CyberToast';

interface TeacherDashboardProps {
  currentUser: User;
  classrooms: Classroom[];
  activeClassId: string | null;
  onSelectClass: (id: string | null) => void;
  onClassCreated: (newClass: Classroom) => void;
  onReorderClassrooms: (classrooms: Classroom[]) => void;
}

type SortKey = 'name' | 'totalXP' | 'tasksCompleted' | 'totalErrors' | 'level' | 'streak' | 'totalTabSwitches';
type SortDir = 'asc' | 'desc';

const TeacherDashboard: React.FC<TeacherDashboardProps> = ({ 
    currentUser, 
    classrooms, 
    activeClassId, 
    onSelectClass, 
    onClassCreated,
    onReorderClassrooms
}) => {
  const [viewMode, setViewMode] = useState<'dashboard' | 'create-task'>('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // Dashboard State
  const [newClassName, setNewClassName] = useState('');
  const [students, setStudents] = useState<StudentProgress[]>([]);
  const [isCreatingClass, setIsCreatingClass] = useState(false);

  // Student detail view
  const [selectedStudent, setSelectedStudent] = useState<StudentProgress | null>(null);

  // Sorting
  const [sortKey, setSortKey] = useState<SortKey>('totalXP');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  // Class renaming
  const [isRenaming, setIsRenaming] = useState(false);
  const [renameValue, setRenameValue] = useState('');

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const addToast = useCallback((text: string, type: ToastMessage['type'] = 'info') => {
      setToasts(prev => [...prev, { id: `t_${Date.now()}_${Math.random()}`, text, type }]);
  }, []);
  const dismissToast = useCallback((id: string) => {
      setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  // Task Creator State
  const [taskTitle, setTaskTitle] = useState('');
  const [taskDesc, setTaskDesc] = useState('');
  const [gridSize, setGridSize] = useState(5);
  const [editorMode, setEditorMode] = useState<'wall' | 'start' | 'end'>('wall');
  const [obstacles, setObstacles] = useState<string[]>([]);
  const [startPos, setStartPos] = useState<[number, number]>([0,0]);
  const [endPos, setEndPos] = useState<[number, number]>([gridSize-1, gridSize-1]);

  // Derived state
  const currentClass = classrooms.find(c => c.id === activeClassId);

  // Sorted students
  const sortedStudents = [...students].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === 'string' && typeof bVal === 'string') {
          return sortDir === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === 'asc' ? (aVal as number) - (bVal as number) : (bVal as number) - (aVal as number);
  });

  // Stats
  const avgCompletion = students.length > 0
      ? Math.round(students.reduce((sum, s) => sum + (s.totalTasks > 0 ? (s.tasksCompleted / s.totalTasks) * 100 : 0), 0) / students.length)
      : 0;
  const totalTasksDone = students.reduce((sum, s) => sum + s.tasksCompleted, 0);

  useEffect(() => {
    if (classrooms.length === 0 && !isCreatingClass) {}
  }, [classrooms.length]);

  useEffect(() => {
    if (currentClass) {
        getClassStudents(currentClass.id).then(s => setStudents(s));
        setIsCreatingClass(false);
        setViewMode('dashboard');
        setIsMobileMenuOpen(false);
        setSelectedStudent(null);
    } else if (activeClassId === 'NEW') {
        setIsCreatingClass(true);
        setIsMobileMenuOpen(false);
    }
  }, [currentClass, activeClassId]);

  const handleCreateClass = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!newClassName.trim()) return;
      playSound('success');
      const cls = await createClassroom(currentUser.id, newClassName);
      onClassCreated(cls);
      setNewClassName('');
      setIsCreatingClass(false);
      addToast(`Сектор "${newClassName}" создан`, 'success');
  };

  const handleRenameClass = async () => {
      if (!currentClass || !renameValue.trim()) return;
      const updated = { ...currentClass, name: renameValue.trim() };
      await updateClassroom(updated);
      onClassCreated(updated);
      setIsRenaming(false);
      playSound('success');
      addToast('Сектор переименован', 'success');
  };

  const handleDeleteClass = async () => {
      if (!currentClass) return;
      if (!confirm(`Удалить сектор "${currentClass.name}"? Все студенты будут отключены от класса.`)) return;
      const success = await deleteClassroom(currentClass.id);
      if (success) {
          playSound('success');
          addToast('Сектор удалён', 'success');
          onSelectClass(null);
          window.location.reload();
      } else {
          playSound('error');
          addToast('Ошибка удаления', 'error');
      }
  };

  const copyCode = () => {
      if(currentClass) {
          navigator.clipboard.writeText(currentClass.inviteCode);
          playSound('click');
          addToast('Код скопирован', 'info');
      }
  };

  const handleSort = (key: SortKey) => {
      if (sortKey === key) {
          setSortDir(prev => prev === 'asc' ? 'desc' : 'asc');
      } else {
          setSortKey(key);
          setSortDir('desc');
      }
      playSound('click');
  };

  const refreshStudents = async () => {
      if (currentClass) {
          const s = await getClassStudents(currentClass.id);
          setStudents(s);
          playSound('click');
          addToast('Данные обновлены', 'info');
      }
  };

  const moveClassroom = (idx: number, direction: 'up' | 'down') => {
      const targetIdx = direction === 'up' ? idx - 1 : idx + 1;
      if (targetIdx < 0 || targetIdx >= classrooms.length) return;
      const reordered = [...classrooms];
      [reordered[idx], reordered[targetIdx]] = [reordered[targetIdx], reordered[idx]];
      onReorderClassrooms(reordered);
      playSound('click');
  };

  // --- EDITOR LOGIC ---
  const handleGridClick = (x: number, y: number) => {
      playSound('type');
      if (editorMode === 'start') {
          setStartPos([x,y]);
      } else if (editorMode === 'end') {
          setEndPos([x,y]);
      } else if (editorMode === 'wall') {
          const key = `${x},${y}`;
          if (obstacles.includes(key)) {
              setObstacles(prev => prev.filter(o => o !== key));
          } else {
              setObstacles(prev => [...prev, key]);
          }
      }
  };

  const saveTask = () => {
      if (!currentClass || !taskTitle) {
          playSound('error');
          addToast('Заполните название миссии', 'error');
          return;
      }
      
      const newTask: Task = {
          id: `custom_${Date.now()}`,
          courseId: 'course_cs101',
          module: 'Кастомные миссии',
          title: taskTitle,
          type: 'grid',
          description: taskDesc,
          theory: '<h3>Указание от Куратора</h3><p>Выполните поставленную задачу.</p>',
          allowedCommands: ['moveRight();', 'moveDown();', 'moveLeft();', 'moveUp();', 'for loop'],
          difficulty: 'Хакер',
          xpReward: 500,
          currencyReward: 100,
          status: 'open',
          initialCode: '// Ваш код здесь\n',
          mapConfig: {
              gridSize: gridSize,
              start: startPos,
              end: endPos,
              obstacles: obstacles.map(s => {
                  const [x,y] = s.split(',').map(Number);
                  return [x,y];
              })
          }
      };
      
      createTaskForClass(currentClass.id, newTask);
      playSound('success');
      addToast('Миссия создана и доступна студентам!', 'success');
      setViewMode('dashboard');
      setTaskTitle('');
      setTaskDesc('');
      setObstacles([]);
  };

  // --- RENDER HELPERS ---
  
  // 1. CLASS LIST VIEW (Mobile: Main Screen when no class selected / Desktop: Sidebar)
  const ClassList = ({ isMobile = false }) => (
      <div className={`flex flex-col h-full ${isMobile ? 'bg-black' : ''}`}>
          <div className="p-4 border-b border-cyber-neonBlue/20 flex justify-between items-center shrink-0">
                <h2 className="text-white font-bold tracking-widest flex items-center gap-2 text-sm uppercase">
                    <Layers size={16} className="text-cyber-neonPink" /> Сектора
                </h2>
                {/* On Desktop sidebar, no close button needed usually, but for consistency */}
                {!isMobile && (
                    <div className="text-[10px] text-gray-600 font-mono">SEC_LIST_V1</div>
                )}
          </div>
          
          <div className="flex-1 overflow-y-auto p-2 space-y-2">
                {classrooms.length === 0 && (
                    <div className="text-center p-8 text-gray-600 text-xs font-mono">
                        Нет активных секторов.
                    </div>
                )}
                {classrooms.map((cls, idx) => (
                    <div key={cls.id} className="flex items-center gap-1">
                        <button
                            onClick={() => {
                                playSound('click');
                                onSelectClass(cls.id);
                            }}
                            className={`flex-1 text-left p-4 md:p-3 rounded flex items-center gap-3 transition-all ${
                                activeClassId === cls.id
                                ? 'bg-cyber-neonBlue/20 border border-cyber-neonBlue text-white shadow-[0_0_10px_rgba(0,243,255,0.2)]'
                                : 'bg-gray-900/50 md:bg-transparent hover:bg-white/5 text-gray-300 border border-transparent hover:border-gray-700'
                            }`}
                        >
                            <div className={`p-2 rounded ${activeClassId === cls.id ? 'bg-cyber-neonBlue text-black' : 'bg-black border border-gray-700'}`}>
                                 <Hash size={16} />
                            </div>
                            <div className="flex-1">
                                <div className="font-bold text-sm">{cls.name}</div>
                                <div className="text-[10px] font-mono opacity-50">CODE: {cls.inviteCode}</div>
                            </div>
                            <ChevronRight size={16} className={activeClassId === cls.id ? 'text-cyber-neonBlue' : 'text-gray-600'} />
                        </button>
                        {classrooms.length > 1 && (
                            <div className="flex flex-col gap-0.5 shrink-0">
                                <button
                                    onClick={(e) => { e.stopPropagation(); moveClassroom(idx, 'up'); }}
                                    disabled={idx === 0}
                                    className={`p-0.5 rounded transition-colors ${idx === 0 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                                    title="Переместить вверх"
                                >
                                    <ChevronUp size={14} />
                                </button>
                                <button
                                    onClick={(e) => { e.stopPropagation(); moveClassroom(idx, 'down'); }}
                                    disabled={idx === classrooms.length - 1}
                                    className={`p-0.5 rounded transition-colors ${idx === classrooms.length - 1 ? 'text-gray-700 cursor-not-allowed' : 'text-gray-400 hover:text-white hover:bg-gray-700'}`}
                                    title="Переместить вниз"
                                >
                                    <ChevronDown size={14} />
                                </button>
                            </div>
                        )}
                    </div>
                ))}
            </div>

            <div className="p-4 border-t border-cyber-neonBlue/20 pb-[env(safe-area-inset-bottom)] md:pb-4 shrink-0">
                <button 
                    onClick={() => {
                        playSound('click');
                        onSelectClass('NEW');
                    }}
                    className={`w-full flex items-center justify-center gap-2 p-4 md:p-3 rounded border border-dashed transition-all uppercase text-xs font-bold tracking-widest ${
                        activeClassId === 'NEW' 
                        ? 'border-cyber-neonGreen text-cyber-neonGreen bg-cyber-neonGreen/10' 
                        : 'border-gray-700 text-gray-500 hover:border-cyber-neonGreen hover:text-cyber-neonGreen'
                    }`}
                >
                    <PlusCircle size={16} /> {isMobile ? 'Инициализировать Сектор' : 'Создать Сектор'}
                </button>
            </div>
      </div>
  );

  return (
    <div className="flex flex-col md:flex-row h-full overflow-hidden relative">
        <CyberToast toasts={toasts} onDismiss={dismissToast} />
        
        {/* --- MOBILE: LIST VIEW (Master) --- */}
        {/* Only visible on mobile when NO class is selected OR when creating new */}
        <div className={`md:hidden flex-1 flex flex-col ${currentClass && !isCreatingClass ? 'hidden' : 'flex'}`}>
             {/* If creating class, we show the creator, otherwise the list */}
             {isCreatingClass ? (
                 null /* Will be handled by MAIN CONTENT area logic below */
             ) : (
                 <ClassList isMobile={true} />
             )}
        </div>

        {/* --- DESKTOP: SIDEBAR (Always visible) --- */}
        <div className="hidden md:flex w-64 bg-cyber-glass border-r border-cyber-neonBlue/20 flex-col shrink-0 z-20">
            <ClassList />
        </div>

        {/* --- MAIN CONTENT AREA --- */}
        {/* On mobile, this is hidden if no class selected, unless creating */}
        <div className={`flex-1 overflow-y-auto bg-black relative flex flex-col ${!currentClass && !isCreatingClass ? 'hidden md:flex' : 'flex'}`}>
            
            {/* MOBILE HEADER (Only for Class View) */}
            {currentClass && !isCreatingClass && (
                <div className="md:hidden h-14 bg-cyber-dark border-b border-cyber-neonBlue/20 flex items-center justify-between px-4 shrink-0 sticky top-0 z-30">
                    <button 
                        onClick={() => {
                            playSound('click');
                            onSelectClass(null); // Go back to list
                        }}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft size={20} />
                        <span className="text-xs font-bold uppercase tracking-wider">Все сектора</span>
                    </button>
                    
                    <div className="flex items-center gap-2 min-w-0 flex-1 justify-end">
                        <div className="w-2 h-2 bg-cyber-neonGreen rounded-full animate-pulse shrink-0"></div>
                        <span className="text-xs font-mono font-bold text-cyber-neonBlue break-words leading-tight">
                            {currentClass.name}
                        </span>
                    </div>
                </div>
            )}

            {/* CREATE CLASS MODE */}
            {isCreatingClass ? (
                <div className="flex-1 flex items-center justify-center p-4 md:p-6 bg-[url('https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center relative min-h-[100dvh] md:min-h-0 overflow-y-auto">
                    <div className="absolute inset-0 bg-black/90 backdrop-blur-sm"></div>
                    
                    {/* Mobile Back Button for Creator */}
                    <button 
                        onClick={() => onSelectClass(null)}
                        className="md:hidden absolute top-4 left-4 z-20 text-white flex items-center gap-2 bg-black/50 p-2 rounded backdrop-blur"
                    >
                        <ArrowLeft size={20} /> <span className="text-xs font-bold">Назад</span>
                    </button>

                    <div className="relative z-10 w-full max-w-lg p-6 md:p-8 bg-cyber-panel border-2 border-cyber-neonBlue shadow-[0_0_50px_rgba(0,243,255,0.2)] animate-in zoom-in-95 my-auto">
                        <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyber-neonBlue"></div>
                        <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyber-neonBlue"></div>

                        <div className="text-center mb-8">
                            <h2 className="text-xl md:text-2xl font-bold text-white tracking-widest uppercase mb-2">Инициализация Сектора</h2>
                            <p className="text-cyber-neonBlue font-mono text-xs md:text-sm">Создайте новое учебное пространство</p>
                        </div>

                        <form onSubmit={handleCreateClass} className="space-y-6">
                            <div>
                                <label className="block text-cyber-neonPink font-bold text-xs uppercase mb-2">Название Класса</label>
                                <input 
                                    type="text" 
                                    value={newClassName}
                                    onChange={(e) => {
                                        setNewClassName(e.target.value);
                                        playSound('type');
                                    }}
                                    placeholder="Напр. 7 'Б' - КиберОтряд"
                                    className="w-full bg-black border border-gray-700 text-white p-4 focus:border-cyber-neonBlue focus:outline-none focus:shadow-[0_0_15px_rgba(0,243,255,0.3)] font-mono transition-all"
                                    autoFocus
                                />
                            </div>
                            <div className="flex gap-4">
                                {classrooms.length > 0 && (
                                    <button
                                        type="button"
                                        onClick={() => onSelectClass(classrooms[0].id || null)}
                                        className="flex-1 py-4 border border-gray-700 text-gray-400 hover:text-white transition-colors uppercase font-bold text-sm"
                                    >
                                        Отмена
                                    </button>
                                )}
                                <button 
                                    type="submit"
                                    className="flex-1 bg-cyber-neonBlue text-black font-bold py-4 hover:bg-white hover:shadow-[0_0_20px_rgba(255,255,255,0.5)] transition-all uppercase tracking-widest flex items-center justify-center gap-2"
                                >
                                    <PlusCircle size={20} /> Создать
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            ) : currentClass ? (
                // VIEW MODES
                viewMode === 'dashboard' ? (
                    <div className="p-4 md:p-6 pb-20 md:pb-6">
                        {/* HEADER with rename */}
                        <div className="mb-8 flex flex-col xl:flex-row xl:items-end justify-between gap-4">
                            <div>
                                {isRenaming ? (
                                    <div className="flex items-center gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={renameValue}
                                            onChange={(e) => setRenameValue(e.target.value)}
                                            onKeyDown={(e) => e.key === 'Enter' && handleRenameClass()}
                                            className="text-2xl md:text-3xl font-bold bg-transparent border-b-2 border-cyber-neonBlue text-white focus:outline-none uppercase tracking-widest"
                                            autoFocus
                                        />
                                        <button onClick={handleRenameClass} className="text-cyber-neonGreen hover:text-white p-1"><Save size={20}/></button>
                                        <button onClick={() => setIsRenaming(false)} className="text-gray-500 hover:text-white p-1"><X size={20}/></button>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-3 mb-2">
                                        <h2 className="text-2xl md:text-3xl font-bold text-white tracking-widest font-sans uppercase break-words">{currentClass.name}</h2>
                                        <button
                                            onClick={() => { setRenameValue(currentClass.name); setIsRenaming(true); }}
                                            className="text-gray-600 hover:text-cyber-neonBlue transition-colors p-1"
                                            title="Переименовать"
                                        >
                                            <Edit3 size={16} />
                                        </button>
                                    </div>
                                )}
                                <p className="text-cyber-neonBlue font-mono text-sm">{'>> СТАТУС: АКТИВЕН'} • {students.length} студентов</p>
                            </div>

                            <div className="flex flex-col sm:flex-row gap-3">
                                <button 
                                    onClick={() => setViewMode('create-task')}
                                    className="px-5 py-3 bg-cyber-neonPink/10 border border-cyber-neonPink text-cyber-neonPink hover:bg-cyber-neonPink hover:text-black transition-all uppercase font-bold text-xs tracking-widest flex items-center justify-center gap-2 rounded"
                                >
                                    <Edit3 size={16} /> Создать Миссию
                                </button>

                                <button 
                                    onClick={handleDeleteClass}
                                    className="px-5 py-3 bg-red-900/10 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white transition-all uppercase font-bold text-xs tracking-widest flex items-center justify-center gap-2 rounded"
                                >
                                    <Trash2 size={16} /> Удалить
                                </button>

                                <div className="bg-cyber-dark border border-cyber-neonGreen p-2 px-4 flex items-center justify-between gap-4 shadow-[0_0_20px_rgba(0,255,65,0.1)] rounded">
                                    <div className="flex flex-col">
                                        <div className="text-gray-500 text-[8px] font-bold uppercase tracking-widest mb-1">Код доступа</div>
                                        <div className="text-lg md:text-xl font-mono font-bold text-cyber-neonGreen tracking-wider">{currentClass.inviteCode}</div>
                                    </div>
                                    <button 
                                        onClick={copyCode}
                                        className="p-3 bg-gray-900 hover:bg-cyber-neonGreen hover:text-black border border-gray-700 hover:border-cyber-neonGreen transition-all rounded text-gray-400"
                                        title="Копировать"
                                    >
                                        <Copy size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Stats Grid — REAL DATA */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
                            <div className="bg-cyber-panel border border-cyber-neonBlue/30 p-4 relative overflow-hidden group hover:border-cyber-neonBlue transition-colors rounded">
                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Users size={48} /></div>
                                <h3 className="text-gray-400 font-mono text-[10px] mb-1">СТУДЕНТЫ</h3>
                                <div className="text-2xl md:text-3xl font-bold text-white">{students.length}</div>
                            </div>
                            <div className="bg-cyber-panel border border-cyber-neonPink/30 p-4 relative overflow-hidden group hover:border-cyber-neonPink transition-colors rounded">
                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Activity size={48} /></div>
                                <h3 className="text-gray-400 font-mono text-[10px] mb-1">СРЕДНИЙ %</h3>
                                <div className="text-2xl md:text-3xl font-bold text-white">{avgCompletion}%</div>
                                <div className="w-full h-1 bg-gray-800 mt-3 rounded-full overflow-hidden">
                                    <div className="h-full bg-cyber-neonPink transition-all" style={{ width: `${avgCompletion}%` }}></div>
                                </div>
                            </div>
                            <div className="bg-cyber-panel border border-cyber-neonYellow/30 p-4 relative overflow-hidden group hover:border-cyber-neonYellow transition-colors rounded">
                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Target size={48} /></div>
                                <h3 className="text-gray-400 font-mono text-[10px] mb-1">ЗАДАЧ РЕШЕНО</h3>
                                <div className="text-2xl md:text-3xl font-bold text-white">{totalTasksDone}</div>
                            </div>
                            <div className="bg-cyber-panel border border-cyber-neonGreen/30 p-4 relative overflow-hidden group hover:border-cyber-neonGreen transition-colors rounded">
                                <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity"><Trophy size={48} /></div>
                                <h3 className="text-gray-400 font-mono text-[10px] mb-1">ЛУЧШИЙ XP</h3>
                                <div className="text-2xl md:text-3xl font-bold text-white">{students.length > 0 ? Math.max(...students.map(s => s.totalXP)) : 0}</div>
                            </div>
                        </div>

                        {students.length === 0 ? (
                            <div className="bg-cyber-panel/50 border border-dashed border-gray-700 p-8 md:p-12 text-center rounded">
                                <Key className="mx-auto text-gray-600 mb-4" size={48} />
                                <h3 className="text-gray-300 font-bold text-lg mb-2">Сектор пуст</h3>
                                <p className="text-gray-500 max-w-md mx-auto text-sm">
                                    Передайте код <span className="text-cyber-neonGreen font-mono font-bold">{currentClass.inviteCode}</span> ученикам, чтобы они могли подключиться.
                                </p>
                            </div>
                        ) : (
                            <>
                            {/* XP Chart */}
                            <div className="bg-cyber-panel border border-gray-800 p-4 rounded mb-6">
                                <h3 className="text-cyber-neonBlue font-mono text-sm mb-4">{'>> РЕЙТИНГ XP'}</h3>
                                <div className="h-48 md:h-64">
                                    <ResponsiveContainer width="100%" height="100%">
                                        <BarChart data={sortedStudents}>
                                            <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                                            <XAxis dataKey="name" stroke="#666" fontSize={10} tick={{fill: '#888'}} />
                                            <YAxis stroke="#666" fontSize={10} tick={{fill: '#888'}} />
                                            <Tooltip 
                                                contentStyle={{ backgroundColor: '#0a0a0f', borderColor: '#00f3ff', color: '#fff' }} 
                                                itemStyle={{ color: '#00f3ff' }}
                                                cursor={{fill: 'rgba(0, 243, 255, 0.1)'}}
                                            />
                                            <Bar dataKey="totalXP" fill="#00f3ff" radius={[4, 4, 0, 0]} name="XP" />
                                        </BarChart>
                                    </ResponsiveContainer>
                                </div>
                            </div>

                            {/* SORTABLE STUDENT TABLE */}
                            <div className="bg-cyber-panel border border-gray-800 flex flex-col rounded mb-6">
                                <div className="p-4 border-b border-gray-800 flex justify-between items-center">
                                    <h3 className="text-white font-bold font-sans flex items-center gap-2"><Users size={16} className="text-cyber-neonBlue" /> СПИСОК ГРУППЫ</h3>
                                    <button onClick={refreshStudents} className="text-gray-500 hover:text-white flex items-center gap-1 text-xs">
                                        <RefreshCw size={14} /> <span className="hidden sm:inline">Обновить</span>
                                    </button>
                                </div>
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left text-sm font-mono text-gray-400">
                                        <thead className="bg-black text-cyber-neonBlue uppercase text-[10px]">
                                            <tr>
                                                {([
                                                    ['name', 'Имя'],
                                                    ['level', 'LVL'],
                                                    ['totalXP', 'XP'],
                                                    ['tasksCompleted', 'Задачи'],
                                                    ['totalErrors', 'Ошибки'],
                                                    ['totalTabSwitches', 'Вкладки'],
                                                    ['streak', 'Streak'],
                                                ] as [SortKey, string][]).map(([key, label]) => (
                                                    <th
                                                        key={key}
                                                        onClick={() => handleSort(key)}
                                                        className="p-3 whitespace-nowrap cursor-pointer hover:text-white transition-colors select-none"
                                                    >
                                                        <span className="flex items-center gap-1">
                                                            {label}
                                                            {sortKey === key ? (
                                                                sortDir === 'asc' ? <ChevronUp size={12} /> : <ChevronDown size={12} />
                                                            ) : (
                                                                <ArrowUpDown size={10} className="opacity-30" />
                                                            )}
                                                        </span>
                                                    </th>
                                                ))}
                                                <th className="p-3 whitespace-nowrap">Активность</th>
                                                <th className="p-3 whitespace-nowrap">Прогресс</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-gray-800">
                                            {sortedStudents.map((student) => {
                                                const pct = student.totalTasks > 0 ? Math.round((student.tasksCompleted / student.totalTasks) * 100) : 0;
                                                return (
                                                <tr 
                                                    key={student.studentId} 
                                                    onClick={() => { playSound('click'); setSelectedStudent(student); }}
                                                    className="hover:bg-cyber-neonBlue/5 transition-colors cursor-pointer"
                                                >
                                                    <td className="p-3 text-white font-bold break-words leading-tight">{student.name}</td>
                                                    <td className="p-3 whitespace-nowrap text-cyber-neonYellow">{student.level}</td>
                                                    <td className="p-3 whitespace-nowrap text-cyber-neonBlue">{student.totalXP}</td>
                                                    <td className="p-3 whitespace-nowrap">{student.tasksCompleted}/{student.totalTasks}</td>
                                                    <td className="p-3 whitespace-nowrap text-red-400">{student.totalErrors}</td>
                                                    <td className="p-3 whitespace-nowrap">
                                                        <span className={`flex items-center gap-1 ${student.totalTabSwitches > 20 ? 'text-orange-500 font-bold' : student.totalTabSwitches > 10 ? 'text-yellow-500' : 'text-gray-400'}`}>
                                                            <ExternalLink size={12} /> {student.totalTabSwitches}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 whitespace-nowrap">
                                                        {student.streak > 0 ? (
                                                            <span className="flex items-center gap-1 text-orange-400"><Flame size={12} /> {student.streak}</span>
                                                        ) : (
                                                            <span className="text-gray-600">—</span>
                                                        )}
                                                    </td>
                                                    <td className="p-3 whitespace-nowrap text-xs">
                                                        <span className={`${student.lastActive === 'Сегодня' ? 'text-cyber-neonGreen' : student.lastActive === 'Вчера' ? 'text-yellow-400' : 'text-gray-500'}`}>
                                                            {student.lastActive}
                                                        </span>
                                                    </td>
                                                    <td className="p-3 whitespace-nowrap">
                                                        <div className="flex items-center gap-2">
                                                            <div className="w-16 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                                <div className="h-full bg-cyber-neonGreen transition-all" style={{ width: `${pct}%` }}></div>
                                                            </div>
                                                            <span className="text-[10px] text-gray-500">{pct}%</span>
                                                        </div>
                                                    </td>
                                                </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            </>
                        )}

                        {/* COURSE VISIBILITY MANAGEMENT */}
                        <div className="bg-cyber-panel border border-gray-800 rounded overflow-hidden">
                            <div className="p-4 border-b border-gray-800 flex items-center justify-between">
                                <h3 className="text-white font-bold font-sans flex items-center gap-2">
                                    <BookOpen size={16} className="text-cyber-neonPink" />
                                    ДОСТУП К КУРСАМ
                                </h3>
                                <span className="text-gray-600 text-[10px] font-mono">ВИДИМОСТЬ ДЛЯ УЧЕНИКОВ</span>
                            </div>
                            <div className="divide-y divide-gray-800/50">
                                {COURSES.map(course => {
                                    const isHidden = (currentClass.hiddenCourses || []).includes(course.id);
                                    return (
                                        <div 
                                            key={course.id}
                                            className={`flex items-center justify-between p-3 md:p-4 transition-colors ${isHidden ? 'bg-red-950/20' : 'hover:bg-white/[0.02]'}`}
                                        >
                                            <div className="flex items-center gap-3 min-w-0">
                                                <span className="text-xl shrink-0">{course.icon}</span>
                                                <div className="min-w-0 flex-1">
                                                    <div className={`font-bold text-sm leading-tight break-words ${isHidden ? 'text-gray-600 line-through' : 'text-white'}`}>
                                                        {course.title}
                                                    </div>
                                                    <div className="text-[10px] text-gray-600 font-mono break-words">
                                                        {course.totalModules} модулей • {course.difficulty}
                                                    </div>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => {
                                                    playSound('click');
                                                    const hidden = currentClass.hiddenCourses || [];
                                                    const updated = isHidden
                                                        ? hidden.filter(id => id !== course.id)
                                                        : [...hidden, course.id];
                                                    const updatedClass = { ...currentClass, hiddenCourses: updated };
                                                    updateClassroom(updatedClass);
                                                    onClassCreated(updatedClass);
                                                    addToast(isHidden ? `${course.title.split(':')[0]} — виден` : `${course.title.split(':')[0]} — скрыт`, 'info');
                                                }}
                                                className={`shrink-0 flex items-center gap-1.5 px-3 py-1.5 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                                                    isHidden 
                                                        ? 'bg-red-900/30 border border-red-500/50 text-red-400 hover:bg-red-900/50' 
                                                        : 'bg-cyber-neonGreen/10 border border-cyber-neonGreen/30 text-cyber-neonGreen hover:bg-cyber-neonGreen/20'
                                                }`}
                                            >
                                                {isHidden ? <EyeOff size={14} /> : <Eye size={14} />}
                                                <span className="hidden sm:inline">{isHidden ? 'Скрыт' : 'Виден'}</span>
                                            </button>
                                        </div>
                                    );
                                })}
                            </div>
                        </div>

                        {/* STUDENT DETAIL MODAL */}
                        {selectedStudent && (
                            <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex flex-col" onClick={(e) => { if (e.target === e.currentTarget) setSelectedStudent(null); }}>
                                <div className="h-14 md:h-16 shrink-0" />
                                <div className="flex-1 flex items-start md:items-center justify-center p-3 md:p-4 overflow-hidden">
                                <div className="w-full max-w-lg max-h-full md:max-h-[85vh] bg-[#0c0c10] border border-cyber-neonBlue rounded-lg flex flex-col relative shadow-2xl animate-in zoom-in-95 overflow-hidden">
                                    <button onClick={() => setSelectedStudent(null)} className="absolute top-3 right-3 z-50 text-gray-500 hover:text-white p-2 active:bg-gray-800 rounded"><X size={24} /></button>
                                    <div className="p-6 overflow-y-auto custom-scrollbar">
                                        {/* Student Header */}
                                        <div className="text-center mb-6">
                                            <div className="w-16 h-16 mx-auto rounded-full bg-cyber-neonBlue/20 border-2 border-cyber-neonBlue flex items-center justify-center mb-3">
                                                <span className="text-2xl font-bold text-cyber-neonBlue">{selectedStudent.name.charAt(0).toUpperCase()}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white uppercase">{selectedStudent.name}</h3>
                                            <span className="text-cyber-neonYellow font-mono text-sm">УРОВЕНЬ {selectedStudent.level}</span>
                                        </div>

                                        {/* Stats */}
                                        <div className="grid grid-cols-5 gap-2 mb-6">
                                            <div className="bg-gray-900 border border-gray-800 rounded p-2 text-center">
                                                <div className="text-cyber-neonBlue font-mono font-bold">{selectedStudent.totalXP}</div>
                                                <div className="text-gray-500 text-[9px] uppercase">XP</div>
                                            </div>
                                            <div className="bg-gray-900 border border-gray-800 rounded p-2 text-center">
                                                <div className="text-cyber-neonGreen font-mono font-bold">{selectedStudent.tasksCompleted}</div>
                                                <div className="text-gray-500 text-[9px] uppercase">Задач</div>
                                            </div>
                                            <div className="bg-gray-900 border border-red-500/30 rounded p-2 text-center">
                                                <div className="text-red-400 font-mono font-bold">{selectedStudent.totalErrors}</div>
                                                <div className="text-gray-500 text-[9px] uppercase">Ошибки</div>
                                            </div>
                                            <div className="bg-gray-900 border border-orange-500/30 rounded p-2 text-center">
                                                <div className="text-orange-400 font-mono font-bold">{selectedStudent.streak}</div>
                                                <div className="text-gray-500 text-[9px] uppercase">Streak</div>
                                            </div>
                                            <div className="bg-gray-900 border border-gray-800 rounded p-2 text-center overflow-hidden">
                                                <div className="text-white font-mono font-bold text-xs truncate">{selectedStudent.lastActive}</div>
                                                <div className="text-gray-500 text-[9px] uppercase">Был</div>
                                            </div>
                                        </div>

                                        {/* Overall progress */}
                                        <div className="mb-6">
                                            <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                <span>Общий прогресс</span>
                                                <span className="font-mono">{selectedStudent.tasksCompleted}/{selectedStudent.totalTasks}</span>
                                            </div>
                                            <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-cyber-neonBlue to-cyber-neonGreen transition-all" style={{ width: `${selectedStudent.totalTasks > 0 ? Math.round((selectedStudent.tasksCompleted / selectedStudent.totalTasks) * 100) : 0}%` }}></div>
                                            </div>
                                        </div>

                                        {/* Activity Monitoring */}
                                        <div className="mb-6 bg-gray-900/50 border border-gray-800 rounded p-4">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center gap-2">
                                                <ExternalLink size={14} className="text-cyber-neonBlue" />
                                                Мониторинг активности
                                            </h4>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div className="text-center">
                                                    <div className={`text-lg font-bold font-mono ${selectedStudent.totalTabSwitches > 20 ? 'text-red-500' : selectedStudent.totalTabSwitches > 10 ? 'text-orange-500' : 'text-gray-400'}`}>
                                                        {selectedStudent.totalTabSwitches}
                                                    </div>
                                                    <div className="text-[9px] text-gray-500 uppercase">Переключений вкладки</div>
                                                </div>
                                                <div className="text-center">
                                                    <div className="text-lg font-bold font-mono text-gray-400">
                                                        {selectedStudent.avgErrorsPerTask}
                                                    </div>
                                                    <div className="text-[9px] text-gray-500 uppercase">Ср. ошибок</div>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Recent Attempts */}
                                        {selectedStudent.recentAttempts && selectedStudent.recentAttempts.length > 0 && (
                                            <div className="mb-6">
                                                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Последние попытки</h4>
                                                <div className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                                                    {selectedStudent.recentAttempts.map((attempt, idx) => (
                                                        <div key={idx} className="bg-gray-900/50 border border-gray-800 rounded p-2 text-[10px]">
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-gray-400 font-mono">{attempt.taskId}</span>
                                                                <span className={`font-bold ${attempt.success ? 'text-green-500' : 'text-red-500'}`}>
                                                                    {attempt.success ? '✓' : '✗'}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center gap-3 text-gray-500">
                                                                <span>Ошибки: <span className={attempt.errors > 10 ? 'text-red-500 font-bold' : 'text-gray-400'}>{attempt.errors}</span></span>
                                                                <span>Вкладки: <span className={attempt.tabSwitches > 5 ? 'text-orange-500 font-bold' : 'text-gray-400'}>{attempt.tabSwitches}</span></span>
                                                                <span>Время: {Math.floor(attempt.duration / 60)}:{(attempt.duration % 60).toString().padStart(2, '0')}</span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        {/* Per-course progress */}
                                        <div className="mb-6">
                                            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3">Прогресс по курсам</h4>
                                            <div className="space-y-3">
                                                {selectedStudent.courseProgress.map(cp => {
                                                    const pct = cp.total > 0 ? Math.round((cp.completed / cp.total) * 100) : 0;
                                                    return (
                                                        <div key={cp.courseId}>
                                                            <div className="flex items-center justify-between mb-1">
                                                                <span className="text-xs text-gray-300">{cp.title}</span>
                                                                <span className="text-[10px] font-mono text-gray-500">{cp.completed}/{cp.total} ({pct}%)</span>
                                                            </div>
                                                            <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                                                                <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, backgroundColor: cp.color }}></div>
                                                            </div>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>

                                        <button onClick={() => setSelectedStudent(null)} className="w-full bg-cyber-neonBlue text-black py-3 font-bold uppercase tracking-widest hover:bg-white transition-colors rounded">ЗАКРЫТЬ</button>
                                    </div>
                                </div>
                                </div>
                            </div>
                        )}
                    </div>
                ) : (
                    // TASK CREATOR MODE (Responsive)
                    <div className="h-full flex flex-col">
                        <div className="p-4 border-b border-gray-800 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-gray-900 shrink-0">
                             <div className="flex items-center gap-4 w-full sm:w-auto">
                                <button onClick={() => setViewMode('dashboard')} className="text-gray-500 hover:text-white flex items-center gap-1">
                                    <ArrowLeft size={18}/> <span className="hidden sm:inline">Назад</span>
                                </button>
                                <h2 className="text-lg md:text-xl font-bold text-cyber-neonPink uppercase tracking-wider leading-tight break-words flex-1">Конструктор</h2>
                             </div>
                             <button onClick={saveTask} className="w-full sm:w-auto px-6 py-3 bg-cyber-neonGreen text-black font-bold uppercase tracking-widest text-xs flex items-center justify-center gap-2 hover:bg-white transition-colors rounded">
                                 <Save size={16} /> Сохранить
                             </button>
                        </div>
                        
                        <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
                            {/* SETTINGS (Stacked on mobile) */}
                            <div className="w-full md:w-80 border-b md:border-b-0 md:border-r border-gray-800 bg-black p-4 md:p-6 overflow-y-auto shrink-0 max-h-[40vh] md:max-h-full">
                                <div className="space-y-4 md:space-y-6">
                                    <div>
                                        <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Название</label>
                                        <input 
                                            type="text" 
                                            className="w-full bg-gray-900 border border-gray-700 p-2 text-white text-sm focus:border-cyber-neonBlue focus:outline-none"
                                            value={taskTitle}
                                            onChange={(e) => {
                                                setTaskTitle(e.target.value);
                                                playSound('type');
                                            }}
                                            placeholder="Операция 'Омега'"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Описание</label>
                                        <textarea 
                                            className="w-full bg-gray-900 border border-gray-700 p-2 text-white text-sm h-16 md:h-24 resize-none focus:border-cyber-neonBlue focus:outline-none"
                                            value={taskDesc}
                                            onChange={(e) => {
                                                setTaskDesc(e.target.value);
                                                playSound('type');
                                            }}
                                            placeholder="Брифинг..."
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-gray-500 text-xs font-bold uppercase mb-2">Размер Сетки: <span className="text-cyber-neonBlue">{gridSize}x{gridSize}</span></label>
                                        <input 
                                            type="range" min="3" max="8" 
                                            value={gridSize} 
                                            onChange={(e) => setGridSize(Number(e.target.value))}
                                            className="w-full accent-cyber-neonBlue"
                                        />
                                    </div>
                                </div>
                                
                                <div className="mt-6 md:mt-8 border-t border-gray-800 pt-4 md:pt-6">
                                    <h4 className="text-white font-bold text-sm mb-4">ИНСТРУМЕНТЫ</h4>
                                    <div className="grid grid-cols-3 md:grid-cols-1 gap-2">
                                        <button 
                                            onClick={() => setEditorMode('wall')}
                                            className={`p-2 md:p-3 border rounded flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 text-[10px] md:text-sm font-bold uppercase transition-all ${editorMode === 'wall' ? 'border-red-500 bg-red-500/10 text-red-500' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                                        >
                                            <Ban size={16} /> Стена
                                        </button>
                                        <button 
                                            onClick={() => setEditorMode('start')}
                                            className={`p-2 md:p-3 border rounded flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 text-[10px] md:text-sm font-bold uppercase transition-all ${editorMode === 'start' ? 'border-cyber-neonBlue bg-cyber-neonBlue/10 text-cyber-neonBlue' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                                        >
                                            <PlayCircle size={16} /> Старт
                                        </button>
                                        <button 
                                            onClick={() => setEditorMode('end')}
                                            className={`p-2 md:p-3 border rounded flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 text-[10px] md:text-sm font-bold uppercase transition-all ${editorMode === 'end' ? 'border-cyber-neonGreen bg-cyber-neonGreen/10 text-cyber-neonGreen' : 'border-gray-700 text-gray-400 hover:border-gray-500'}`}
                                        >
                                            <Flag size={16} /> Финиш
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* PREVIEW CENTER (Responsive Grid) */}
                            <div className="flex-1 bg-[#0c0c10] flex items-center justify-center p-4 md:p-8 bg-[radial-gradient(circle_at_center,_#1a1a20_1px,_transparent_1px)] bg-[size:20px_20px] overflow-auto">
                                <div 
                                    className="bg-black border border-cyber-neonBlue/30 relative shadow-2xl touch-none max-h-full"
                                    style={{
                                        display: 'grid',
                                        gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
                                        aspectRatio: '1/1',
                                        width: '100%',
                                        maxWidth: '500px', // Prevent too large on desktop
                                        gap: '2px',
                                        padding: '2px'
                                    }}
                                >
                                    {Array.from({length: gridSize * gridSize}).map((_, i) => {
                                        const x = i % gridSize;
                                        const y = Math.floor(i / gridSize);
                                        const isWall = obstacles.includes(`${x},${y}`);
                                        const isStart = startPos[0] === x && startPos[1] === y;
                                        const isEnd = endPos[0] === x && endPos[1] === y;
                                        
                                        return (
                                            <div 
                                                key={i}
                                                // Support both touch and click
                                                onClick={() => handleGridClick(x, y)}
                                                className={`
                                                    w-full h-full cursor-pointer transition-all flex items-center justify-center
                                                    ${isWall ? 'bg-red-900/50 border border-red-500' : 'bg-gray-900/50 hover:bg-gray-800'}
                                                    ${isStart ? 'bg-cyber-neonBlue/20 border-2 border-cyber-neonBlue' : ''}
                                                    ${isEnd ? 'bg-cyber-neonGreen/20 border-2 border-cyber-neonGreen' : ''}
                                                `}
                                            >
                                                {isStart && <div className="w-2 md:w-3 h-2 md:h-3 bg-cyber-neonBlue rounded-full animate-pulse shadow-[0_0_10px_#00f3ff]"></div>}
                                                {isEnd && <div className="w-2 md:w-3 h-2 md:h-3 bg-cyber-neonGreen rotate-45 shadow-[0_0_10px_#00ff41]"></div>}
                                                {isWall && <div className="text-red-500 font-mono text-[10px] md:text-xs">X</div>}
                                            </div>
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>
                )
            ) : (
                /* DESKTOP EMPTY STATE (Mobile is handled by list view) */
                <div className="hidden md:flex flex-1 items-center justify-center text-gray-600">
                    Выберите сектор для управления
                </div>
            )}
        </div>
    </div>
  );
};

export default TeacherDashboard;
