// Dev-only fixture: campaign map and grid mission harness. No API calls or student records.
import React, { useMemo, useState } from 'react';
import { createRoot } from 'react-dom/client';
import StudentHome from '../components/StudentHome';
import GameGrid from '../components/GameGrid';
import type { ViewMode } from '../components/GameGrid';
import GridCommandBuilder from '../components/GridCommandBuilder';
import { COSMETICS, COURSES, MOCK_TASKS } from '../constants';
import { DEFAULT_PARTS } from '../functions/characterLooks.mjs';
import { evaluateCodeLocally } from '../services/localEvaluation';
import { isSimpleCommandSet } from '../utils/gridCommands';
import type { GridEvent, GridHeading, Task, User } from '../types';
import '../index.css';
import '../styles/game-shell.css';

const heroes: Record<string, User['equipped']> = {
  elli: {avatar:'av_street_elli',droneColor:'col_default'},
  numeric: { avatar: COSMETICS.find(c => c.type === 'avatar' && /^\d+$/.test(c.value) && c.value !== '2')!.id, droneColor: '#00f3ff', mascotSkin: 'skin_sparky' },
  street: { avatar: COSMETICS.find(c => c.value === 'street_frost')!.id, droneColor: '#00f3ff', mascotSkin: 'skin_sparky' },
  modular: { avatar: 'av_1', characterParts: DEFAULT_PARTS, droneColor: '#00f3ff', mascotSkin: 'skin_sparky' },
};
const makeUser = (hero: string): User => ({ id: 'campaign-preview', name: 'Саша', role: 'student', xp: 500, currency: 240, level: 3, inventory: ['av_1'], achievements: [], equipped: heroes[hero] });
const gridTasks = MOCK_TASKS.filter(t => t.type === 'grid' && t.mapConfig);
const previewParams = new URLSearchParams(window.location.search);

function statusesFor(tasks: Task[], mode: string): Task[] {
  const perCourse = new Map<string, number>();
  return tasks.map(t => {
    const i = perCourse.get(t.courseId) ?? 0; perCourse.set(t.courseId, i + 1);
    if (mode === 'complete') return { ...t, status: 'completed' as const };
    return { ...t, status: i < 3 ? ('completed' as const) : i === 3 ? ('open' as const) : ('locked' as const) };
  });
}

function GridHarness({ hero }: { hero: string }) {
  const [taskId, setTaskId] = useState(gridTasks.find(task => task.id === previewParams.get('mission'))?.id ?? gridTasks[0].id);
  const task = gridTasks.find(t => t.id === taskId)!;
  const [code, setCode] = useState(task.lesson?.starterCode ?? task.initialCode ?? '');
  const [pos, setPos] = useState<[number, number]>(task.mapConfig!.start);
  const [path, setPath] = useState<[number, number][]>([task.mapConfig!.start]);
  const [heading, setHeading] = useState<GridHeading>('E');
  const [action, setAction] = useState<GridEvent | null>(null);
  const [destroyed, setDestroyed] = useState<string[]>([]);
  const [view, setView] = useState<ViewMode>('iso');
  const [running, setRunning] = useState(false);
  const [showSource, setShowSource] = useState(false);
  const [message, setMessage] = useState('');
  const [outcome, setOutcome] = useState<'idle' | 'success' | 'retry'>('idle');
  const player = useMemo(() => makeUser(hero), [hero]);

  const pick = (id: string) => {
    const next = gridTasks.find(t => t.id === id)!;
    setTaskId(id); setCode(next.lesson?.starterCode ?? next.initialCode ?? '');
    setPos(next.mapConfig!.start); setPath([next.mapConfig!.start]); setHeading('E'); setDestroyed([]); setAction(null); setMessage(''); setOutcome('idle'); setShowSource(false);
  };
  const restart = () => { setOutcome('idle'); setPos(task.mapConfig!.start); setPath([task.mapConfig!.start]); setHeading('E'); setDestroyed([]); setAction(null); };
  const insert = (cmd: string) => setCode(prev => prev.trimEnd() + (prev.trim() ? '\n' : '') + cmd);
  const builder = isSimpleCommandSet(task.allowedCommands);
  const run = async () => {
    setRunning(true); restart();
    const result = await evaluateCodeLocally(code, task);
    for (const ev of result.gridEvents ?? []) {
      setAction(ev); if (ev.heading) setHeading(ev.heading);
      if (ev.type === 'move' || ev.type === 'jump') { setPos([ev.x, ev.y]); setPath(p => [...p, [ev.x, ev.y]]); }
      if (ev.type === 'attack' && ev.targetX !== undefined) setDestroyed(d => [...d, `${ev.targetX},${ev.targetY}`]);
      await new Promise(r => setTimeout(r, ev.type === 'jump' ? 420 : 260));
    }
    setAction(null);
    setOutcome(result.success ? 'success' : 'retry');
    setMessage(result.success ? 'Миссия выполнена' : result.error || 'Цель не достигнута');
    setRunning(false);
  };

  return <section aria-label="Проверка сетки" style={{ padding: 8, overflowY: 'auto', minHeight: 0, flex: 1 }}>
    <label>Миссия-сетка <select aria-label="Миссия-сетка" value={taskId} onChange={e => pick(e.target.value)} style={{ background: '#18283c', maxWidth: '100%' }}>{gridTasks.map(t => <option key={t.id} value={t.id}>{t.id} · {t.title}</option>)}</select></label>
    <div className="mission-grid-workspace" data-tab="visual" style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
      <div className="mission-render" style={{ height: 620, flex: 'none' }}>
        <GameGrid task={task} playerPos={pos} pathHistory={path} heading={heading} activeAction={action} destroyedObstacles={destroyed} player={player} outcome={outcome} running={running} view={view} onViewChange={setView} />
      </div>
      {builder && <GridCommandBuilder task={task} code={code} view={view} disabled={running} onCodeChange={setCode} onInsert={insert} onResetDraft={() => setCode(task.lesson?.starterCode ?? task.initialCode ?? '')} onRestartCharacter={restart} showSource={showSource} onToggleSource={() => setShowSource(s => !s)} />}
      {(!builder || showSource) && <textarea aria-label="Код решения" value={code} onChange={e => setCode(e.target.value)} style={{ minHeight: 120, background: '#0b1328', color: '#eaf2ff' }} />}
      <button type="button" onClick={run} disabled={running} style={{ minHeight: 48, background: '#ffd369', color: '#202a35', fontWeight: 700 }}>Запустить</button>
      <output aria-label="Результат запуска">{message}</output>
    </div>
  </section>;
}

function Preview() {
  const [mode, setMode] = useState('progress');
  const [screen, setScreen] = useState<string>(previewParams.get('screen') === 'grid' ? 'grid' : 'campaign');
  const [hero, setHero] = useState(previewParams.get('hero') && Object.hasOwn(heroes, previewParams.get('hero')!) ? previewParams.get('hero')! : 'numeric');
  const [log, setLog] = useState('');
  const tasks = useMemo(() => statusesFor(MOCK_TASKS, mode), [mode]);
  const user = useMemo(() => makeUser(hero), [hero]);
  const courses = COURSES.map((c, i) => ({ ...c, status: mode === 'current-locked' && i === 0 ? ('locked' as const) : c.status, progress: i === 0 ? 25 : 0, totalTasks: MOCK_TASKS.filter(t => t.courseId === c.id).length }));
  const allLocked = mode === 'all-locked' ? courses.map(c => ({ ...c, status: 'locked' as const })) : courses;
  return <div className="academy-app">
    <div style={{ padding: 8, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
      <label>Экран <select aria-label="Экран" value={screen} onChange={e => setScreen(e.target.value)}><option value="campaign">Кампания</option><option value="grid">Миссия-сетка</option></select></label>
      <label>Состояние <select aria-label="Состояние" value={mode} onChange={e => setMode(e.target.value)}><option value="progress">В процессе</option><option value="complete">Всё пройдено</option><option value="current-locked">Первый курс закрыт</option><option value="all-locked">Все курсы закрыты</option></select></label>
      <label>Герой <select aria-label="Герой" value={hero} onChange={e => setHero(e.target.value)}><option value="elli">Элли</option><option value="numeric">Числовой</option><option value="street">Уличный</option><option value="modular">Конструктор</option></select></label>
      <output aria-label="Лог вызовов" data-testid="log">{log}</output>
    </div>
    {screen === 'campaign'
      ? <StudentHome user={user} courses={allLocked} tasks={tasks} progress={40} today={2}
          onCourse={(id, resume, taskId) => setLog(`course=${id};resume=${!!resume};task=${taskId ?? ''}`)}
          onShop={() => setLog('shop')} onProfile={() => setLog('profile')} />
      : <GridHarness hero={hero} />}
  </div>;
}

const root = createRoot(document.getElementById('root')!);
root.render(<Preview />);
import.meta.hot?.dispose(() => root.unmount());
