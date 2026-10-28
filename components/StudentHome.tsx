import React, { Suspense, lazy, useEffect, useMemo, useRef, useState } from 'react';
import { Home, ArrowRight, BookOpen, Brain, Check, Code, Coins, Compass, Cpu, FolderOpen, Globe, HelpCircle, Keyboard, Lock, Map as MapIcon, Network, ShieldAlert, ShoppingBag, Star, Table, Terminal, UserRound } from 'lucide-react';
import { Course, Task, User } from '../types';
import { GameButton } from './GameUI';
import { PlayerAvatar } from './PlayerAvatar';
import { CampaignCity } from './CampaignCity';
import CourseDistrictMap from './CourseDistrictMap';
import { CampaignTraveler } from './CampaignTraveler';
import { CITY_ROAD, cityRoadBetween, cityPathForCount, MISSIONS_PER_CITY_LEG, cityLegForTask, cityPointOnMap } from '../utils/campaignGeometry';
import { cleanLessonTitle, stripStandardsPrefix } from '../utils/theoryText';
import '../styles/campaign.css';

const GameGrid = lazy(() => import('./GameGrid'));

type HomeCourse = Course & { progress: number; totalTasks: number };
interface Props {
  user: User;
  courses: HomeCourse[];
  tasks: Task[];
  progress: number;
  today: number;
  onCourse: (id: string, resume?: boolean, taskId?: string) => void;
  onShop: () => void;
  onProfile: () => void;
  onRoom?: () => void;
}

interface Region { name: string; tasks: Task[]; done: number }

const SCENES = 4;
const STATUS_TEXT: Record<Task['status'], string> = { completed: 'пройдена', open: 'доступна', locked: 'закрыта' };
const TYPE_ART: Record<string, { label: string; Icon: React.ComponentType<{ size?: number }> }> = {
  pc_builder:{label:'Сборка ПК · 3D-конструктор',Icon:Cpu},
  smart_city:{label:'Умный город · мастерская',Icon:Cpu},
  arduino:{label:'Arduino · 3D-лаборатория',Icon:Cpu},
  quiz: { label: 'Вопрос', Icon: HelpCircle },
  typing: { label: 'Клавиатура', Icon: Keyboard },
  spreadsheet: { label: 'Таблица', Icon: Table },
  html: { label: 'Веб-страница', Icon: Globe },
  terminal: { label: 'Терминал', Icon: Terminal },
  network_route: { label: 'Сеть', Icon: Network },
  file_organizer: { label: 'Файлы', Icon: FolderOpen },
  circuit_builder: { label: 'Схема', Icon: Cpu },
  circuit: { label: 'Схема', Icon: Cpu },
  ai_neuron: { label: 'Нейросеть', Icon: Brain },
  ai_kids_trainer: { label: 'Обучение ИИ', Icon: Brain },
  ai_trainer: { label: 'Обучение ИИ', Icon: Brain },
  phishing_detect: { label: 'Безопасность', Icon: ShieldAlert },
  fake_detector: { label: 'Проверка фактов', Icon: ShieldAlert },
  blocks: { label: 'Блоки', Icon: Code },
};

export const missionGoal = (task: Task) => task.lesson?.goal || stripStandardsPrefix(task.description || '');

/** Modules in the order they first appear in the course; no text-based semantics. */
export function buildRegions(courseTasks: Task[]): Region[] {
  const order: string[] = [];
  const groups = new Map<string, Task[]>();
  for (const task of courseTasks) {
    if (!groups.has(task.module)) { groups.set(task.module, []); order.push(task.module); }
    groups.get(task.module)!.push(task);
  }
  return order.map(name => { const list = groups.get(name)!; return { name, tasks: list, done: list.filter(t => t.status === 'completed').length }; });
}

/** Mission markers are authored on the painted plaza, not distributed over roofs. */
export function nodePositions(count: number, _maxCols = 5, width = 960, height = 640): { x: number; y: number }[] {
  return cityPathForCount(count).map(point => cityPointOnMap(point, width, height));
}
export function boardHeight(_count: number, _maxCols = 5, width = 0): number {
  return Math.max(600, Math.ceil(width / 1.5));
}

function MissionPreview({ task, scene, user }: { task: Task; scene: number; user: User }) {
  if (task.type === 'grid' && task.mapConfig) {
    return (
      <div className="campaign-preview" role="img" aria-label="Карта миссии: старт и цель без готового маршрута">
        <Suspense fallback={null}>
          <GameGrid task={task} playerPos={task.mapConfig.start} pathHistory={[task.mapConfig.start]} player={user} preview view="iso" />
        </Suspense>
      </div>
    );
  }
  const art = TYPE_ART[task.type] ?? { label: 'Урок', Icon: BookOpen };
  return (
    <div className="campaign-preview campaign-preview--icon" style={{ backgroundImage: `url(/art/neo-academy/city-${/^course_grade[3-8]$/.test(task.courseId)?task.courseId.replace('course_',''):'grade3'}-v5.webp)` }} role="img" aria-label={`Тип миссии: ${art.label}`}>
      <span><art.Icon size={40} /></span>
      <strong>{art.label}</strong>
    </div>
  );
}

export default function StudentHome({ user, courses, tasks, progress, today, onCourse, onShop, onProfile, onRoom }: Props) {
  const available = courses.filter(c => c.status === 'active');
  const defaultCourse = available.find(c => c.progress > 0 && c.progress < 100) || available.find(c => c.progress < 100) || available[0];
  const [courseId, setCourseId] = useState(defaultCourse?.id ?? '');
  const course = available.find(c => c.id === courseId) ?? defaultCourse;

  const courseTasks = useMemo(() => tasks.filter(t => t.courseId === course?.id), [tasks, course?.id]);
  const regions = useMemo(() => buildRegions(courseTasks), [courseTasks]);
  const nextTask = courseTasks.find(t => t.status === 'open');
  const resumeTask=nextTask??courseTasks.filter(t=>t.status==='completed').at(-1)??courseTasks[0];
  const resumeRegionIndex=Math.max(0,regions.findIndex(r=>r.tasks.some(t=>t.id===resumeTask?.id)));
  const nextRegionIndex = Math.max(0, regions.findIndex(r => r.tasks.some(t => t.id === nextTask?.id)));

  const [regionIndex, setRegionIndex] = useState(nextRegionIndex);
  const [mapView,setMapView]=useState<'city'|'district'>('city');
  const [taskId, setTaskId] = useState<string | undefined>(nextTask?.id);
  const courseKey = useRef(course?.id);
  useEffect(() => {
    if (courseKey.current === course?.id) return;
    courseKey.current = course?.id;
    setRegionIndex(nextRegionIndex);
    setMapView('city');
    setTaskId(nextTask?.id ?? regions[nextRegionIndex]?.tasks[0]?.id);
  }, [course?.id, nextRegionIndex, nextTask?.id, regions]);

  const region = regions[Math.min(regionIndex, Math.max(0, regions.length - 1))];
  const selected = region?.tasks.find(t => t.id === taskId) ?? region?.tasks.find(t => t.status === 'open') ?? region?.tasks[0];
  const selectedIndex = Math.max(0, region?.tasks.findIndex(task => task.id === selected?.id) ?? 0);
  const leg = cityLegForTask(selectedIndex);
  const legStart = leg * MISSIONS_PER_CITY_LEG;
  const visibleTasks = useMemo(() => region?.tasks.slice(legStart, legStart + MISSIONS_PER_CITY_LEG) ?? [], [region, legStart]);
  const legCount = Math.ceil((region?.tasks.length ?? 0) / MISSIONS_PER_CITY_LEG);
  const mapRef = useRef<HTMLDivElement>(null);
  const [mapSize, setMapSize] = useState({width:960,height:640});
  useEffect(() => {
    if (!mapRef.current) return;
    const observer = new ResizeObserver(([entry]) => {
      const {width,height} = entry.contentRect;
      if (width > 0 && height > 0) setMapSize(previous => Math.abs(previous.width-width) < 1 && Math.abs(previous.height-height) < 1 ? previous : {width,height});
    });
    observer.observe(mapRef.current);
    return () => observer.disconnect();
  }, [course?.id, region?.name, mapView]);
  const taskCount = visibleTasks.length;
  const mapHeight = boardHeight(taskCount, 5, mapSize.width);
  const positions = useMemo(() => nodePositions(taskCount, 5, mapSize.width, mapSize.height), [taskCount, mapSize]);
  useEffect(() => {
    const map = mapRef.current;
    const viewport = map?.parentElement;
    const index = visibleTasks.findIndex(task => task.id === selected?.id);
    if (!map || !viewport || index < 0) return;
    viewport.scrollLeft = positions[index].x / 100 * map.clientWidth - viewport.clientWidth / 2;
  }, [selected?.id, positions, visibleTasks]);
  const road = useMemo(() => CITY_ROAD.map(point => cityPointOnMap(point, mapSize.width, mapSize.height)), [mapSize]);
  const scene = Math.max(0, regionIndex) % SCENES;
  const [effectsPaused, setEffectsPaused] = useState(false);
  const travelerStops = useMemo(() => visibleTasks.map((task, i) => ({ id: task.id, ...positions[i], locked: task.status === 'locked' })), [visibleTasks, positions]);
  const goToLeg = (nextLeg: number) => {
    const candidates = region?.tasks.slice(nextLeg * MISSIONS_PER_CITY_LEG, (nextLeg + 1) * MISSIONS_PER_CITY_LEG);
    setTaskId((candidates?.find(task => task.status === 'open') ?? candidates?.[0])?.id);
  };
  const goToRegion = (i: number) => { setMapView('district');setRegionIndex(i); const next = regions[i]?.tasks.find(t => t.status === 'open') ?? regions[i]?.tasks[0]; setTaskId(next?.id); };
  const top = useRef<HTMLDivElement>(null);
  const [listOpen] = useState(() => typeof window !== 'undefined' && window.matchMedia('(min-width:1024px)').matches);

  const canStart = !!course && course.status === 'active' && !!selected && selected.status !== 'locked';
  const startLabel = !selected ? 'Выбери миссию' : selected.status === 'completed' ? 'Повторить · без новой награды' : selected.status === 'locked' ? 'Миссия закрыта' : 'Начать миссию';
  const replay = selected?.status === 'completed';

  const segments = region ? visibleTasks.slice(1).map((task, i) => {
    const prev = visibleTasks[i];
    const state = task.status === 'locked' ? 'locked' : prev.status === 'completed' && task.status === 'completed' ? 'done' : 'open';
    return { state, points: cityRoadBetween(positions[i], positions[i+1], road).map(p=>`${p.x},${p.y}`).join(' '), key: task.id };
  }) : [];

  return (
    <div ref={top} className="campaign">
      <div className="campaign-top">
        <header className="campaign-hud" aria-label="Игрок">
          <div className="campaign-hud__player">
            <PlayerAvatar user={user} className="campaign-hud__avatar" />
            <div>
              <strong>{user.name}</strong>
              <span>Уровень {user.level}</span>
            </div>
          </div>
          <div className="campaign-hud__xp" role="progressbar" aria-label="Опыт до следующего уровня" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}>
            <i style={{ width: `${Math.round(progress)}%` }} /><span>{user.xp} XP</span>
          </div>
          <div className="campaign-hud__stat"><Coins size={18} aria-hidden="true" /><strong>{user.currency || 0}</strong><span>монет</span></div>
          <div className="campaign-hud__stat"><Star size={18} aria-hidden="true" /><strong>{today}</strong><span>сегодня</span></div>
        </header>
        <nav className="campaign-nav" aria-label="Главная навигация">
          <GameButton className="is-active" aria-current="page" onClick={() => top.current?.scrollIntoView({ block: 'start', behavior: 'smooth' })}><MapIcon size={20} />Кампания</GameButton>
          {onRoom&&<GameButton onClick={onRoom}><Home size={20}/>Моя комната</GameButton>}
          <GameButton onClick={onProfile}><UserRound size={20} />Герой</GameButton>
          <GameButton onClick={onShop}><ShoppingBag size={20} />Магазин</GameButton>
        </nav>
      </div>

      <main className="campaign-main">
        <section className="campaign-map-panel" aria-label="Карта кампании">
          <div className="campaign-map-head">
            <label className="campaign-select">
              <span>Класс / Кампания</span>
              <select value={course?.id ?? ''} onChange={e => {setMapView('city');setCourseId(e.target.value);}}>
                {courses.map(c => <option key={c.id} value={c.id} disabled={c.status !== 'active'}>{c.title}{c.status === 'active' ? '' : c.status === 'coming_soon' ? ' — скоро' : ' — откроет учитель'}</option>)}
              </select>
            </label>
            <p className="campaign-course-progress"><strong>{course?.progress ?? 0}%</strong> пройдено</p>
          </div>

          {!course ? (
            <p className="campaign-empty" role="status">Все кампании сейчас закрыты. Когда учитель откроет курс, он появится здесь.</p>
          ) : regions.length > 0 ? (
            <>
              <div className="campaign-city-navigation">
                {mapView==='district'?<><button type="button" onClick={()=>setMapView('city')}><MapIcon size={17}/>Город курса</button><span aria-hidden="true">/</span><label className="campaign-district-select"><span className="sr-only">Перейти в район</span><select aria-label="Перейти в район" value={Math.min(regionIndex,regions.length-1)} onChange={e=>goToRegion(Number(e.target.value))}>{regions.map((r,i)=><option key={r.name} value={i}>{i+1}. {r.name}</option>)}</select></label></>:<p><strong>{regions.length} {regions.length%10===1&&regions.length%100!==11?'район':regions.length%10>=2&&regions.length%10<=4&&(regions.length%100<12||regions.length%100>14)?'района':'районов'}</strong> · каждый район — модуль курса</p>}
              </div>
              {mapView==='city'?<><CourseDistrictMap courseId={course.id} regions={regions} activeIndex={Math.min(regionIndex,regions.length-1)} nextIndex={resumeRegionIndex} user={user} onSelect={goToRegion}/><div className="campaign-resume"><span>{nextTask?'Следующая миссия':'Продолжить с миссии'}: <strong>{resumeTask?cleanLessonTitle(resumeTask.title):region.name}</strong></span><button type="button" onClick={()=>{goToRegion(resumeRegionIndex);setTaskId(resumeTask?.id);}}>Показать в районе<ArrowRight size={16}/></button></div></>:<>
              <div className="campaign-district-caption"><span><Compass size={18} aria-hidden="true"/>Район {String(regionIndex + 1).padStart(2, '0')}</span><strong>{region.name}</strong><small>{region.done} / {region.tasks.length} миссий</small><button type="button" className="campaign-effects-toggle" aria-pressed={effectsPaused} onClick={() => setEffectsPaused(value => !value)}>{effectsPaused ? 'Включить эффекты' : 'Остановить эффекты'}</button></div>
              <div className="campaign-map-viewport" tabIndex={0} aria-label="Карта района. Прокручивай по горизонтали, чтобы увидеть весь маршрут"><div ref={mapRef} className="campaign-map" data-scene={scene} data-leg={leg} style={{ minHeight: mapHeight, '--campaign-height': `${mapHeight}px` } as React.CSSProperties}>
                <CampaignCity courseId={course.id} scene={scene} paused={effectsPaused}/>
                <div className="campaign-map__atmosphere" aria-hidden="true"/>
                <svg className="campaign-routes" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                  {segments.map(s => <polyline key={`street-${s.key}`} className="campaign-street" points={s.points} fill="none" />)}
                  {segments.map(s => <polyline key={s.key} className={`campaign-route campaign-route--${s.state}`} points={s.points} fill="none" />)}
                </svg>
                {visibleTasks.map((task, i) => {
                  const state = task.status === 'completed' ? 'done' : task.status === 'locked' ? 'locked' : 'open';
                  const isCurrent = task.id === nextTask?.id;
                  const title = cleanLessonTitle(task.title);
                  return (
                    <button
                      key={task.id}
                      data-mission-id={task.id}
                      type="button"
                      className={`campaign-node campaign-node--${state}${selected?.id === task.id ? ' is-selected' : ''}${isCurrent ? ' is-current' : ''}`}
                      style={{ left: `${positions[i].x}%`, top: `${positions[i].y}%` }}
                      aria-pressed={selected?.id === task.id}
                      aria-label={`Миссия ${legStart + i + 1}: ${title}. ${STATUS_TEXT[task.status]}`}
                      onClick={() => setTaskId(task.id)}
                    >
                      <span>{legStart + i + 1}</span>{state === 'done' ? <i className="campaign-node__badge"><Check size={12} aria-hidden="true" /></i> : state === 'locked' ? <i className="campaign-node__badge"><Lock size={11} aria-hidden="true" /></i> : null}
                    </button>
                  );
                })}
                <CampaignTraveler key={`${course.id}:${region.name}:${leg}`} user={user} road={road} stops={travelerStops} selectedId={selected?.id}/>
                <div className="campaign-map-legend" aria-hidden="true"><span><i className="is-done"/>Пройдено</span><span><i className="is-open"/>Доступно</span><span><Lock size={12}/>Закрыто</span></div>
              </div>
              </div>
              <p className="campaign-pan-hint">← Прокручивай карту, чтобы увидеть весь маршрут →</p>
              <nav className="campaign-leg-nav" aria-label="Участки района">
                <button type="button" disabled={leg === 0} onClick={() => goToLeg(leg-1)}>← Предыдущий</button>
                <span>Участок {leg+1} / {legCount}<small>Миссии {legStart+1}–{legStart+taskCount} из {region.tasks.length}</small></span>
                <button type="button" disabled={leg+1 >= legCount} onClick={() => goToLeg(leg+1)}>Следующий →</button>
              </nav>
              <details className="campaign-mission-details" open={listOpen}>
                <summary>Все миссии района ({region.tasks.length})</summary>
                <ol className="campaign-mission-list" aria-label={`Миссии района «${region.name}»`}>
                  {region.tasks.map((task, i) => (
                    <li key={task.id}>
                      <button type="button" aria-pressed={selected?.id === task.id} className={`campaign-mission campaign-mission--${task.status}`} onClick={() => setTaskId(task.id)}>
                        <span className="campaign-mission__n">{task.status === 'completed' ? <Check size={16} aria-hidden="true" /> : task.status === 'locked' ? <Lock size={14} aria-hidden="true" /> : i + 1}</span>
                        <span>{cleanLessonTitle(task.title)}</span>
                        <small>{STATUS_TEXT[task.status]}</small>
                      </button>
                    </li>
                  ))}
                </ol>
              </details>
              </>}
            </>
          ) : (
            <p className="campaign-empty">В этой кампании пока нет миссий. Выбери другой класс.</p>
          )}
        </section>

        <aside className="campaign-brief" aria-label="Задание миссии">
          {selected && course ? (
            <>
              <MissionPreview task={selected} scene={scene} user={user} />
              <span className="campaign-brief__region"><Compass size={16} aria-hidden="true" /> {region.name}</span>
              <h1>{cleanLessonTitle(selected.title)}</h1>
              <span className={`campaign-brief__status campaign-brief__status--${selected.status}`}>{selected.status === 'completed' ? 'Пройдена' : selected.status === 'locked' ? 'Закрыта' : 'Доступна'}</span>
              <h2>Цель</h2>
              <p>{missionGoal(selected)}</p>
              <dl className="campaign-rewards">
                <div><dt>Опыт</dt><dd>{replay ? '0 XP' : `до ${selected.xpReward} XP`}</dd></div>
                <div><dt>Монеты</dt><dd>{replay ? '0' : `до ${selected.currencyReward || 0}`}</dd></div>
              </dl>
              <p className="campaign-brief__note">
                {replay ? 'Награда за эту миссию уже получена, повтор новой не даёт.' : selected.status === 'locked' ? 'Сначала пройди предыдущие миссии.' : 'Награда уменьшается за ошибки: чем меньше попыток, тем больше опыта.'}
              </p>
              <GameButton variant="primary" disabled={!canStart} onClick={() => canStart && onCourse(course.id, true, selected.id)}>{startLabel}<ArrowRight size={20} aria-hidden="true" /></GameButton>
            </>
          ) : (
            <p className="campaign-empty">Выбери миссию на карте.</p>
          )}
        </aside>
      </main>
    </div>
  );
}
