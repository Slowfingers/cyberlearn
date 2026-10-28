import { FuturisticCity } from './components/FuturisticCity';
import { Pause, Play } from 'lucide-react';
import { GameButton } from './components/GameUI';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import CyberLayout from './components/CyberLayout';
import { BookOpen } from 'lucide-react';
const TeacherDashboard = lazy(() => import('./components/TeacherDashboard'));
const StudentDashboard = lazy(() => import('./components/StudentDashboard'));
import { LOCAL_DEMO, observeSession, logout, fbLogin, fbGetClassrooms } from './services/firebase';
import { User, Classroom } from './types';
import { Shield, Terminal, ArrowLeft, ArrowRight, Loader2, KeyRound, User as UserIcon } from 'lucide-react';

type AuthMode = 'select' | 'teacher-login' | 'student-login';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [sessionLoading, setSessionLoading] = useState(true);

  const [classrooms, setClassrooms] = useState<Classroom[]>([]);
  const [activeClassId, setActiveClassId] = useState<string | null>(null);

  const [cityPaused, setCityPaused] = useState(false);
  const [authMode, setAuthMode] = useState<AuthMode>('select');

  // Form States
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [inviteCode, setInviteCode] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => observeSession(async (restored, restoreError) => {
    if (restoreError) setError('Не удалось восстановить сессию. Повторите вход.');
    setUser(restored);
    if (!restored) { setName(''); setInviteCode(''); setPassword(''); }
    try {
      if (restored?.role === 'teacher') {
        const classes = await fbGetClassrooms();
        setClassrooms(classes);
        setActiveClassId(classes[0]?.id || null);
      }
    } catch { setError('Не удалось загрузить классы'); }
    finally { setSessionLoading(false); }
  }), []);

  const handleLogout = async () => {
    try { await logout(); } catch { setError("Не удалось выйти. Повторите попытку."); return; }
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

  const handleTeacherLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !password.trim()) {
          setError("Укажите имя и пароль");
          return;
      }
      setLoading(true);
      setError('');

      try {
        const authenticated = await fbLogin('teacher',name,password);
        const classes = await fbGetClassrooms();
        setUser(authenticated);
        setClassrooms(classes);
        setActiveClassId(classes[0]?.id || null);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка подключения к серверу");
        console.error(err);
      }
      setLoading(false);
  };

  const handleStudentLogin = async (e: React.FormEvent) => {
      e.preventDefault();
      if (!name.trim() || !inviteCode.trim() ) {
          setError("Заполните все поля");
          return;
      }
      setLoading(true);
      setError('');

      try {
        setUser(await fbLogin('student',name,password,inviteCode.trim().toUpperCase()));
      } catch (err) {
        setError(err instanceof Error ? err.message : "Ошибка подключения к серверу");
        console.error(err);
      }
      setLoading(false);
  };

  const handleDemoLogin = async (role: 'student' | 'teacher') => {
    setLoading(true); setError('');
    try {
      const authenticated = await fbLogin(role, role === 'student' ? 'Тестовый ученик' : 'Тестовый учитель', 'Test12345', 'TEST01');
      setUser(authenticated);
      if (role === 'teacher') { const classes = await fbGetClassrooms(); setClassrooms(classes); setActiveClassId(classes[0]?.id ?? null); }
    } catch (error) { setError(error instanceof Error ? error.message : 'Не удалось открыть тестовый аккаунт.'); }
    finally { setLoading(false); }
  };

  const onClassCreated = (newClass: Classroom) => {
      setClassrooms(previous => previous.some(c => c.id === newClass.id)
          ? previous.map(c => c.id === newClass.id ? newClass : c)
          : [...previous, newClass]);
      setActiveClassId(newClass.id);
  };

  // --- RENDER LOGIN SCREENS ---

  if (sessionLoading) {
    return (
      <div className="min-h-[100dvh] bg-black flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="animate-spin text-cyber-neonBlue mx-auto mb-4" size={40} />
          <p className="text-cyber-neonBlue font-mono text-sm tracking-widest animate-pulse">{'Открываем академию…'}</p>
        </div>
      </div>
    );
  }

  if (!user) {
    const student = authMode === 'student-login';
    const sparks = [[16,22],[30,64],[44,30],[55,70],[66,26],[78,58],[88,38],[50,82]];
    return <div className="academy-app academy-welcome" data-motion-paused={cityPaused}>
      <FuturisticCity paused={cityPaused}/>
      <div className="academy-welcome-sparks" aria-hidden="true">{sparks.map(([x, y], i) => <i key={i} style={{ left: `${x}%`, top: `${y}%`, animationDelay: `${i * 0.45}s` }}/>)}</div>
      <header className="academy-welcome-brand academy-brand"><span className="academy-brand-mark"><BookOpen size={23}/></span><span>Cyber<span>Learn</span></span><button className="academy-city-toggle" type="button" aria-label={cityPaused ? 'Включить движение города' : 'Остановить движение города'} aria-pressed={cityPaused} onClick={() => setCityPaused(value => !value)}>{cityPaused ? <Play size={17}/> : <Pause size={17}/>}</button></header>
      <main className="academy-welcome-grid"><section className="academy-welcome-story"><h1 aria-label="Маленькие шаги. Большие открытия."><span className="cyber-headline-line" data-text="Маленькие шаги.">Маленькие шаги.</span><em className="cyber-headline-line" data-text="Большие открытия.">Большие открытия.</em></h1><p>Учись, играй и создавай свой цифровой мир.</p></section>
        <div className="academy-welcome-side">
        <section className="academy-auth-card">
          {authMode === 'select' ? <><h2>Войти в академию</h2><GameButton size="compact" variant="primary" className="academy-auth-action academy-auth-student" onClick={()=>{setPassword('');setError('');setAuthMode('student-login');}}>Я ученик <ArrowRight size={19}/></GameButton><button type="button" className="academy-auth-teacher" onClick={()=>{setPassword('');setError('');setAuthMode('teacher-login');}}><Shield size={16}/> Вход для учителя</button></> : <>
            <GameButton size="compact" className="academy-auth-back" onClick={()=>{setAuthMode('select');setError('');}}><ArrowLeft size={17}/> Назад</GameButton><h2>{student ? 'Начнём приключение' : 'Вход для учителя'}</h2><p>{student ? 'Введи своё имя и код класса от учителя.' : 'Войдите, чтобы управлять классами и видеть прогресс учеников.'}</p>
            <form onSubmit={student ? handleStudentLogin : handleTeacherLogin} className="academy-auth-form">
              <label htmlFor="login-name">{student ? 'Твоё имя' : 'Логин учителя'}</label><input id="login-name" value={name} onChange={e=>setName(e.target.value)} autoComplete="username" placeholder={student ? 'Например, Саша' : 'Логин'} required autoFocus/>
              {student && <><label htmlFor="class-code">Код класса</label><input id="class-code" value={inviteCode} onChange={e=>setInviteCode(e.target.value.toUpperCase())} placeholder="Код от учителя" maxLength={12} required autoCapitalize="characters" autoComplete="off"/></>}
              {!student && <><label htmlFor={student ? 'student-password' : 'teacher-password'}>Пароль</label><input id={student ? 'student-password' : 'teacher-password'} type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/></>}

              {error && <p role="alert" className="academy-auth-error">{error}</p>}
              <GameButton size="compact" variant="primary" className="academy-auth-action" disabled={loading} type="submit">{loading ? <Loader2 className="animate-spin" size={20}/> : <>Войти <ArrowRight size={18}/></>}</GameButton>
            </form>
          </>}
          {authMode === 'select' && error && <p role="alert" className="academy-auth-error">{error}</p>}
        </section>
        {LOCAL_DEMO && <details className="academy-demo-panel"><summary>Тестовый режим</summary><p>Прогресс сохраняется в этом браузере. Код класса: TEST01.</p><div><GameButton size="compact" disabled={loading} onClick={()=>handleDemoLogin('student')}>Тестировать как ученик</GameButton><GameButton size="compact" disabled={loading} onClick={()=>handleDemoLogin('teacher')}>Тестировать как учитель</GameButton></div></details>}
        </div>
      </main>
    </div>;
  }

  const currentClass = classrooms.find(c => c.id === activeClassId);

  return (
    <Suspense fallback={<div className="p-8 text-white">Загрузка кабинета…</div>}>
    <CyberLayout
      role={user.role} localDemo={LOCAL_DEMO}
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
            onReorderClassrooms={setClassrooms}
        />
      ) : (
        <StudentDashboard key={user.id} currentUser={user} />
      )}
    </CyberLayout>
    </Suspense>
  );
};

export default App;
