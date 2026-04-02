
import React, { useState, useEffect } from 'react';
import CyberLayout from './components/CyberLayout';
import TeacherDashboard from './components/TeacherDashboard';
import StudentDashboard from './components/StudentDashboard';
import { User, Classroom } from './types';
import { loginOrRegisterTeacher, joinClassroom } from './services/mockBackend';
import { Shield, Terminal, ArrowLeft, ArrowRight, Loader2, KeyRound, User as UserIcon } from 'lucide-react';

type AuthMode = 'select' | 'teacher-login' | 'student-login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  
  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [activeClassId, setActiveClassId] = useState<string | null>(null);

  const [authMode, setAuthMode] = useState<AuthMode>('select');

  // Form States
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Session Persistence
  useEffect(() => {
      const savedUserId = localStorage.getItem('cyberlearn_session_id');
      const savedUserRole = localStorage.getItem('cyberlearn_session_role');
      if (savedUserId && savedUserRole) {
          const usersData = localStorage.getItem('cyberlearn_users');
          if (usersData) {
              const users: User[] = JSON.parse(usersData);
              const found = users.find(u => u.id === savedUserId);
              if (found) {
                  setUser(found);
                  if (found.role === 'teacher') {
                      const classesData = localStorage.getItem('cyberlearn_classes');
                      if (classesData) {
                          const classes: Classroom[] = JSON.parse(classesData);
                          const teacherClasses = classes.filter(c => c.teacherId === found.id);
                          setClassrooms(teacherClasses);
                          if (teacherClasses.length > 0) setActiveClassId(teacherClasses[0].id);
                      }
                  }
              }
          }
      }
  }, []);

  const handleLogout = () => {
    setUser(null);
    setClassrooms([]);
    setActiveClassId(null);
    setAuthMode('select');
    setName('');
    setPassword('');
    setInviteCode('');
    setError('');
    localStorage.removeItem('cyberlearn_session_id');
    localStorage.removeItem('cyberlearn_session_role');
  };

  const handleTeacherLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !password.trim()) {
          setError("Укажите имя и пароль");
          return;
      }
      setLoading(true);
      setError('');

      // Simulate network delay
      setTimeout(() => {
        const result = loginOrRegisterTeacher(name, password);
        if (result.success && result.user) {
            setUser(result.user);
            setClassrooms(result.classrooms || []);
            if (result.classrooms && result.classrooms.length > 0) {
                setActiveClassId(result.classrooms[0].id);
            } else {
                setActiveClassId(null);
            }
            localStorage.setItem('cyberlearn_session_id', result.user.id);
            localStorage.setItem('cyberlearn_session_role', result.user.role || '');
        } else {
            setError(result.error || "Ошибка авторизации");
        }
        setLoading(false);
      }, 800);
  };

  const handleStudentLogin = (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !inviteCode.trim()) {
          setError("Заполните все поля");
          return;
      }
      setLoading(true);
      setError('');

      setTimeout(() => {
        const result = joinClassroom(name, inviteCode);
        if (result.success && result.user) {
            setUser(result.user);
            localStorage.setItem('cyberlearn_session_id', result.user.id);
            localStorage.setItem('cyberlearn_session_role', result.user.role || '');
        } else {
            setError(result.error || "Ошибка авторизации");
        }
        setLoading(false);
      }, 800);
  };

  const onClassCreated = (newClass: Classroom) => {
      const exists = classrooms.some(c => c.id === newClass.id);
      const updated = exists
          ? classrooms.map(c => c.id === newClass.id ? newClass : c)
          : [...classrooms, newClass];
      setClassrooms(updated);
      setActiveClassId(newClass.id);
  };

  // --- RENDER LOGIN SCREENS ---

  if (!user) {
    return (
      <div className="min-h-[100dvh] bg-black flex items-center justify-center font-sans relative overflow-x-hidden overflow-y-auto p-4 md:p-8 w-full">
        {/* Background Effects */}
        <div className="fixed inset-0 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        <div className="fixed inset-0 bg-gradient-to-t from-black via-transparent to-black pointer-events-none"></div>
        {/* Animated glow orbs */}
        <div className="fixed -left-10 top-10 w-40 h-40 bg-cyber-neonBlue/20 blur-3xl animate-pulse"></div>
        <div className="fixed right-0 bottom-10 w-48 h-48 bg-cyber-neonPink/20 blur-3xl animate-ping"></div>
        {/* Scanline sheen */}
        <div className="fixed inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03)_0%,rgba(0,0,0,0)_40%)] mix-blend-screen animate-pulse pointer-events-none"></div>
        {/* Moving neon sweep */}
        <div className="fixed inset-x-0 top-1/3 h-24 bg-gradient-to-r from-transparent via-cyber-neonBlue/10 to-transparent blur-2xl animate-[pulse_6s_ease-in-out_infinite]"></div>
        {/* Floating particles */}
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute left-10 top-1/4 w-1 h-1 bg-cyber-neonBlue/80 animate-ping"></div>
          <div className="absolute right-16 top-1/3 w-1.5 h-1.5 bg-cyber-neonPink/80 animate-bounce"></div>
          <div className="absolute left-1/2 bottom-10 w-1 h-1 bg-cyber-neonGreen/80 animate-ping"></div>
          <div className="absolute right-1/3 bottom-1/4 w-1 h-1 bg-white/70 animate-bounce"></div>
        </div>

        <div className="z-10 w-full max-w-4xl relative my-auto">
            
            {/* Header / Title */}
            <div className={`text-center transition-all duration-500 ${authMode !== 'select' ? 'mb-6 md:mb-8 scale-90 md:scale-75' : 'mb-8 md:mb-12'}`}>
                <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyber-neonBlue to-cyber-neonPink tracking-tighter mb-2 animate-pulse drop-shadow-[0_0_15px_rgba(0,243,255,0.5)]">
                    CYBER<span className="text-white">LEARN</span>
                </h1>
                <p className="text-cyber-neonGreen font-mono tracking-widest text-[10px] sm:text-xs md:text-lg whitespace-nowrap overflow-hidden text-ellipsis">
                    {'>> СИСТЕМА.ЗАПУСК_ПРОТОКОЛА(v2.5)'}
                </p>
            </div>

            {/* SELECTION SCREEN */}
            {authMode === 'select' && (
                <div className="relative w-full max-w-3xl mx-auto px-2 sm:px-0">
                    {/* Corner brackets */}
                    <div className="pointer-events-none absolute -inset-2 sm:-inset-4 border border-cyber-neonBlue/30 rounded-[16px] sm:rounded-[24px] blur-sm"></div>
                    <div className="pointer-events-none absolute -inset-2 sm:-inset-4 border border-cyber-neonPink/20 rounded-[16px] sm:rounded-[24px] animate-pulse"></div>
                    <div className="pointer-events-none absolute inset-2 sm:inset-6 rounded-[12px] sm:rounded-[20px] border border-white/5 backdrop-blur-sm bg-white/2 animate-[pulse_5s_ease-in-out_infinite]"></div>
                    <div className="pointer-events-none absolute -top-4 sm:-top-8 left-1/2 -translate-x-1/2 w-24 sm:w-32 h-6 sm:h-8 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-lg animate-pulse"></div>

                    {/* Selection cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 animate-in fade-in slide-in-from-bottom-10 duration-500">
                        <button 
                            onClick={() => setAuthMode('student-login')}
                            className="group relative bg-black/60 backdrop-blur border border-cyber-neonBlue/40 hover:border-cyber-neonBlue p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(0,243,255,0.35)] md:hover:-translate-y-2 text-left overflow-hidden rounded-xl sm:rounded-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyber-neonBlue/10 via-transparent to-cyber-neonGreen/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute -left-12 top-10 w-24 h-24 bg-cyber-neonBlue/20 blur-2xl group-hover:animate-pulse"></div>
                            <div className="absolute top-4 right-4 text-cyber-neonBlue/30 group-hover:text-cyber-neonBlue transition-colors hidden sm:block">
                                <ArrowRight size={24} />
                            </div>
                            <Terminal className="w-8 h-8 sm:w-12 sm:h-12 text-cyber-neonBlue mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">НЕТРАННЕР</h2>
                            <p className="text-gray-400 font-mono text-[10px] sm:text-xs mb-4 sm:mb-6 sm:h-10">Подключение к учебному сектору через код доступа.</p>
                            <div className="inline-block bg-cyber-neonBlue text-black font-bold px-4 py-2 sm:px-6 sm:py-2 text-[10px] sm:text-sm skew-x-[-15deg] transition-transform group-hover:skew-x-[-5deg]">
                                <span className="inline-block skew-x-[15deg] group-hover:skew-x-[5deg]">НАЧАТЬ_СЕССИЮ</span>
                            </div>
                        </button>

                        <button 
                            onClick={() => setAuthMode('teacher-login')}
                            className="group relative bg-black/60 backdrop-blur border border-cyber-neonPink/40 hover:border-cyber-neonPink p-6 sm:p-8 transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,0,255,0.35)] md:hover:-translate-y-2 text-left overflow-hidden rounded-xl sm:rounded-2xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-cyber-neonPink/10 via-transparent to-cyber-neonBlue/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <div className="absolute -right-12 bottom-8 w-24 h-24 bg-cyber-neonPink/20 blur-2xl group-hover:animate-pulse"></div>
                            <div className="absolute top-4 right-4 text-cyber-neonPink/30 group-hover:text-cyber-neonPink transition-colors hidden sm:block">
                                <ArrowRight size={24} />
                            </div>
                            <Shield className="w-8 h-8 sm:w-12 sm:h-12 text-cyber-neonPink mb-4 sm:mb-6 group-hover:scale-110 transition-transform" />
                            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">КУРАТОР</h2>
                            <p className="text-gray-400 font-mono text-[10px] sm:text-xs mb-4 sm:mb-6 sm:h-10">Управление классом и отслеживание прогресса.</p>
                            <div className="inline-block bg-cyber-neonPink text-black font-bold px-4 py-2 sm:px-6 sm:py-2 text-[10px] sm:text-sm skew-x-[-15deg] transition-transform group-hover:skew-x-[-5deg]">
                                <span className="inline-block skew-x-[15deg] group-hover:skew-x-[5deg]">АВТОРИЗАЦИЯ</span>
                            </div>
                        </button>
                    </div>
                </div>
            )}

            {/* TEACHER FORM */}
            {authMode === 'teacher-login' && (
                <div className="w-full max-w-md mx-auto bg-cyber-panel border border-cyber-neonPink p-6 sm:p-8 shadow-[0_0_30px_rgba(255,0,255,0.15)] animate-in zoom-in-95 duration-300 relative">
                    <button onClick={() => setAuthMode('select')} className="absolute top-4 right-4 text-gray-500 hover:text-white p-2">
                        <ArrowLeft size={20}/>
                    </button>
                    
                    <h2 className="text-lg sm:text-xl font-bold text-cyber-neonPink mb-6 flex items-center gap-2 pr-8">
                        <Shield size={20} className="shrink-0" /> <span className="truncate">ИДЕНТИФИКАЦИЯ КУРАТОРА</span>
                    </h2>

                    <form onSubmit={handleTeacherLogin} className="space-y-4">
                        {error && (
                            <div className="p-2 bg-red-900/30 border border-red-500/50 text-red-400 text-xs font-mono break-words">
                                [ОШИБКА]: {error}
                            </div>
                        )}
                        <div>
                            <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Имя / Позывной</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-black border border-gray-700 p-2.5 pl-10 text-white focus:border-cyber-neonPink focus:outline-none focus:shadow-[0_0_10px_rgba(255,0,255,0.3)] transition-all font-mono text-sm sm:text-base"
                                    placeholder="Mr. Anderson"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Пароль / Ключ</label>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input 
                                    type="password" 
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black border border-gray-700 p-2.5 pl-10 text-white focus:border-cyber-neonPink focus:outline-none focus:shadow-[0_0_10px_rgba(255,0,255,0.3)] transition-all font-mono text-sm sm:text-base"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-cyber-neonPink text-black font-bold py-3 hover:bg-white transition-colors flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'ВОЙТИ В СИСТЕМУ'}
                        </button>
                    </form>
                </div>
            )}

            {/* STUDENT FORM */}
            {authMode === 'student-login' && (
                <div className="w-full max-w-md mx-auto bg-cyber-panel border border-cyber-neonBlue p-6 sm:p-8 shadow-[0_0_30px_rgba(0,243,255,0.15)] animate-in zoom-in-95 duration-300 relative">
                    <button onClick={() => setAuthMode('select')} className="absolute top-4 right-4 text-gray-500 hover:text-white p-2">
                        <ArrowLeft size={20}/>
                    </button>
                    
                    <h2 className="text-lg sm:text-xl font-bold text-cyber-neonBlue mb-6 flex items-center gap-2 pr-8">
                        <Terminal size={20} className="shrink-0" /> <span className="truncate">ПОДКЛЮЧЕНИЕ К УЗЛУ</span>
                    </h2>

                    <form onSubmit={handleStudentLogin} className="space-y-4">
                         <div>
                            <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Имя Нетраннера</label>
                            <div className="relative">
                                <UserIcon className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input 
                                    type="text" 
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-black border border-gray-700 p-2.5 pl-10 text-white focus:border-cyber-neonBlue focus:outline-none focus:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all font-mono text-sm sm:text-base"
                                    placeholder="Neo"
                                    autoFocus
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-400 text-xs uppercase font-bold mb-1">Код Доступа (Invite Code)</label>
                            <div className="relative">
                                <KeyRound className="absolute left-3 top-3 text-gray-500" size={18} />
                                <input 
                                    type="text" 
                                    value={inviteCode}
                                    onChange={(e) => setInviteCode(e.target.value.toUpperCase())}
                                    className="w-full bg-black border border-gray-700 p-2.5 pl-10 text-white focus:border-cyber-neonBlue focus:outline-none focus:shadow-[0_0_10px_rgba(0,243,255,0.3)] transition-all font-mono uppercase tracking-widest text-sm sm:text-base"
                                    placeholder="XXX-XX"
                                    maxLength={7}
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="p-2 bg-red-900/30 border border-red-500/50 text-red-400 text-xs font-mono break-words">
                                [ОШИБКА]: {error}
                            </div>
                        )}

                        <button 
                            type="submit" 
                            disabled={loading}
                            className="w-full bg-cyber-neonBlue text-black font-bold py-3 hover:bg-white transition-colors flex items-center justify-center gap-2 text-sm sm:text-base mt-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'УСТАНОВИТЬ СВЯЗЬ'}
                        </button>
                    </form>
                </div>
            )}
        </div>
      </div>
    );
  }

  const currentClass = classrooms.find(c => c.id === activeClassId);

  return (
    <CyberLayout 
      role={user.role} 
      onLogout={handleLogout}
      title={user.role === 'teacher' ? 'ИНТЕРФЕЙС_КУРАТОРА' : 'ТЕРМИНАЛ_НЕТРАННЕРА'}
    >
      {user.role === 'teacher' ? (
        <TeacherDashboard 
            currentUser={user} 
            classrooms={classrooms}
            activeClassId={activeClassId}
            onSelectClass={setActiveClassId}
            onClassCreated={onClassCreated} 
        />
      ) : (
        <StudentDashboard currentUser={user} />
      )}
    </CyberLayout>
  );
};

export default App;
