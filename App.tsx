import { GameButton } from './components/GameUI';

import React, { useState, useEffect, lazy, Suspense } from 'react';
import CyberLayout from './components/CyberLayout';
import { AcademyArt } from './components/AcademyArt';
import { BookOpen, Sparkles } from 'lucide-react';
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
    return <div className="academy-app academy-welcome">
      <header className="academy-welcome-brand academy-brand"><span className="academy-brand-mark"><BookOpen size={23}/></span><span>Cyber<span>Learn</span><small>Академия будущего</small></span></header>
      <main className="academy-welcome-grid"><section className="academy-welcome-story"><span className="academy-pill"><Sparkles size={15}/> Для любопытных умов</span><h1>Маленькие шаги.<br/><em>Большие открытия.</em></h1><p>Преврати интерес к компьютерам в настоящие навыки. Учись через игру, решай задачи и создавай своё.</p><AcademyArt variant={0} hero/><div className="academy-welcome-features"><span>3–8 классы</span><span>Понятные объяснения</span><span>Практика в каждом курсе</span></div></section>
        <section className="academy-auth-card">
          {authMode === 'select' ? <><span className="academy-eyebrow">ТВОЁ ПРИКЛЮЧЕНИЕ ЖДЁТ</span><h2>Рады тебя видеть!</h2><p>Выбери, как войти в академию.</p><GameButton size="compact" variant="primary" className="academy-primary academy-auth-action" onClick={()=>{setPassword('');setError('');setAuthMode('student-login');}}>Я ученик <ArrowRight size={19}/></GameButton><GameButton size="compact" className="academy-secondary academy-auth-action" onClick={()=>{setPassword('');setError('');setAuthMode('teacher-login');}}><Shield size={18}/> Кабинет учителя</GameButton><div className="academy-auth-note"><BookOpen size={20}/><span>Код класса и данные для входа подскажет учитель.</span></div></> : <>
            <GameButton size="compact" className="academy-auth-back" onClick={()=>{setAuthMode('select');setError('');}}><ArrowLeft size={17}/> Назад</GameButton><h2>{student ? 'Начнём приключение' : 'Вход для учителя'}</h2><p>{student ? 'Введи своё имя и код класса от учителя.' : 'Войдите, чтобы управлять классами и видеть прогресс учеников.'}</p>
            <form onSubmit={student ? handleStudentLogin : handleTeacherLogin} className="academy-auth-form">
              <label htmlFor="login-name">{student ? 'Твоё имя' : 'Логин учителя'}</label><input id="login-name" value={name} onChange={e=>setName(e.target.value)} autoComplete="username" placeholder={student ? 'Например, Саша' : 'Логин'} required autoFocus/>
              {student && <><label htmlFor="class-code">Код класса</label><input id="class-code" value={inviteCode} onChange={e=>setInviteCode(e.target.value.toUpperCase())} placeholder="Код от учителя" maxLength={12} required autoCapitalize="characters" autoComplete="off"/></>}
              {!student && <><label htmlFor={student ? 'student-password' : 'teacher-password'}>Пароль</label><input id={student ? 'student-password' : 'teacher-password'} type="password" value={password} onChange={e=>setPassword(e.target.value)} autoComplete="current-password" required/></>}

              {error && <p role="alert" className="academy-auth-error">{error}</p>}
              <GameButton size="compact" variant="primary" className="academy-primary academy-auth-action" disabled={loading} type="submit">{loading ? <Loader2 className="animate-spin" size={20}/> : <>Войти <ArrowRight size={18}/></>}</GameButton>
            </form>
          </>}
          {authMode === 'select' && error && <p role="alert" className="academy-auth-error">{error}</p>}
          {LOCAL_DEMO && <aside className="academy-demo-panel"><strong>Тестовый режим</strong><p>Прогресс сохраняется в этом браузере. Код класса: TEST01.</p><div><GameButton size="compact" disabled={loading} onClick={()=>handleDemoLogin('student')}>Тестировать как ученик</GameButton><GameButton size="compact" disabled={loading} onClick={()=>handleDemoLogin('teacher')}>Тестировать как учитель</GameButton></div></aside>}
        </section>
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
