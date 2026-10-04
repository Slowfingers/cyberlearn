import type { Classroom, Task, TaskAttempt, User } from '../types';
import { ACHIEVEMENTS, COSMETICS, LEVEL_THRESHOLDS, MOCK_TASKS } from '../constants';
import { buyCosmetic, completeTask, validateMap } from '../functions/domain.mjs';

const KEY = 'cyberlearn_local_demo_v1';
const SESSION = 'cyberlearn_local_demo_session_v1';
const EVENT = 'cyberlearn-local-session';
interface Credential { uid: string; salt: string; digest: string }
interface State { version: 1; users: Record<string, User>; classes: Record<string, Classroom>; tasks: Record<string, Task[]>; credentials: Record<string, Credential> }
const newUser = (id: string, name: string, role: User['role'], classId?: string): User => ({ id, name, role, ...(classId ? {classId} : {}), xp: 0, currency: 0, level: 1, tasksCompleted: 0, totalErrors: 0, completedTaskIds: [], inventory: ['av_1','col_default','frame_none','skin_sparky'], achievements: [], equipped: {avatar:'av_1',droneColor:'col_default',avatarFrame:'frame_none',mascotSkin:'skin_sparky'} });
function read(): State {
  const raw = localStorage.getItem(KEY);
  if (raw) {
    try {
      const value = JSON.parse(raw);
      if (value.version === 1 && value.users && value.classes && value.tasks && value.credentials) return value;
    } catch { /* Rebuild only the demo namespace, never production caches. */ }
  }
  return {version:1,users:{demo_teacher:newUser('demo_teacher','Тестовый учитель','teacher')}, classes:{demo_class:{id:'demo_class',teacherId:'demo_teacher',name:'Тестовый класс',inviteCode:'TEST01',studentIds:[]}},tasks:{},credentials:{}};
}
function save(state: State) {
  try { localStorage.setItem(KEY, JSON.stringify(state)); }
  catch { throw new Error('Браузер не разрешает сохранить тестовые данные. Проверь настройки хранилища.'); }
}
const identity = (role: string, name: string, classId = '') => JSON.stringify([role,name.trim().toLocaleLowerCase('ru'),classId]);
async function digest(password: string, salt: string) {
  const key = await crypto.subtle.importKey('raw',new TextEncoder().encode(password),'PBKDF2',false,['deriveBits']);
  const bits = await crypto.subtle.deriveBits({name:'PBKDF2',hash:'SHA-256',salt:new TextEncoder().encode(salt),iterations:100000},key,256);
  return Array.from(new Uint8Array(bits), b => b.toString(16).padStart(2,'0')).join('');
}
async function credential(uid: string, password: string): Promise<Credential> {
  const salt = crypto.randomUUID();
  return {uid,salt,digest:await digest(password,salt)};
}
function current(state = read()): User | null { return state.users[localStorage.getItem(SESSION) ?? ''] ?? null; }
function notify() { window.dispatchEvent(new Event(EVENT)); }
export function observeLocalSession(callback: (user: User | null, error?: unknown) => void) {
  const publish = () => { try { callback(current()); } catch(error) { callback(null,error); } };
  const storage = (event: StorageEvent) => { if (event.key === SESSION || event.key === KEY || event.key === null) publish(); };
  window.addEventListener(EVENT,publish);
  window.addEventListener('storage',storage);
  publish();
  return () => { window.removeEventListener(EVENT,publish); window.removeEventListener('storage',storage); };
}
export async function logoutLocal() { localStorage.removeItem(SESSION); notify(); }
export async function loginLocal(role: 'teacher' | 'student', name: string, password: string, inviteCode?: string): Promise<User> {
  if (!name.trim()) throw new Error('Укажи имя.');
  if (password.length < 8) throw new Error('Для локального аккаунта нужен пароль от 8 символов.');
  let state = read();
  const cls = role === 'student' ? Object.values(state.classes).find(c => c.inviteCode === inviteCode?.trim().toUpperCase()) : undefined;
  if (role === 'student' && !cls) throw new Error('Тестовый класс не найден. Используй код TEST01 или код класса локального учителя.');
  const key = identity(role,name,cls?.id);
  const stored = state.credentials[key];
  let user: User;
  if (stored) {
    if (await digest(password,stored.salt) !== stored.digest) throw new Error('Неверный пароль локального аккаунта.');
    state = read();
    user = state.users[stored.uid];
    if (!user) throw new Error('Локальный аккаунт не найден.');
  } else {
    const id = role === 'teacher' && name.trim() === 'Тестовый учитель' ? 'demo_teacher' : `local_${crypto.randomUUID()}`;
    const record = await credential(id,password);
    state = read();
    if (state.credentials[key]) return loginLocal(role,name,password,inviteCode);
    if (cls && !state.classes[cls.id]) throw new Error('Этот класс уже удалён.');
    user = state.users[id] ?? newUser(id,name.trim(),role,cls?.id);
    state.users[id] = user;
    state.credentials[key] = record;
    if (cls) state.classes[cls.id].studentIds.push(id);
    save(state);
  }
  localStorage.setItem(SESSION,user.id);
  notify();
  return structuredClone(user);
}
export async function localCall<T>(operation: string, data: Record<string, unknown> = {}): Promise<T> {
  const state = read();
  const user = current(state);
  if (!user) throw new Error('Войди в локальный аккаунт.');
  const owned = (id: string) => {
    const cls = state.classes[id];
    if (user.role !== 'teacher' || cls?.teacherId !== user.id) throw new Error('Нет доступа к этому классу.');
    return cls;
  };
  let result: unknown = null;
  let changed = false;
  switch(operation) {
    case 'getUser': result = user; break;
    case 'listClassrooms': result = Object.values(state.classes).filter(cls => user.role === 'teacher' ? cls.teacherId === user.id : cls.id === user.classId); break;
    case 'listUsers': {
      if (user.role !== 'teacher') throw new Error('Нет доступа.');
      if (data.classId) owned(String(data.classId));
      const ids = new Set(Object.values(state.classes).filter(cls => cls.teacherId === user.id).map(cls => cls.id));
      result = Object.values(state.users).filter(u => u.role === 'student' && ids.has(u.classId ?? '') && (!data.classId || u.classId === data.classId)); break;
    }
    case 'createClassroom': {
      if(user.role !== 'teacher') throw new Error('Нет доступа.');
      const name = String(data.name ?? '').trim(); if (!name) throw new Error('Укажи название класса.');
      const cls: Classroom = {id:`local_class_${crypto.randomUUID()}`,name,teacherId:user.id,inviteCode:crypto.randomUUID().replace(/-/g,'').slice(0,12).toUpperCase(),studentIds:[]};
      state.classes[cls.id] = cls; result = cls; changed = true; break;
    }
    case 'updateClassroom': {
      const updated = data.classroom as Classroom; const cls = owned(updated.id);
      cls.name = updated.name; cls.hiddenCourses = updated.hiddenCourses ?? []; changed = true; break;
    }
    case 'deleteClassroom': { const id = String(data.classId); owned(id); delete state.classes[id]; delete state.tasks[id]; result = true; changed = true; break; }
    case 'listTasks': result = user.classId && state.classes[user.classId] ? state.tasks[user.classId] ?? [] : []; break;
    case 'createTask': {
      const cls = owned(String(data.classId)); const task = data.task as Task;
      validateMap(task.mapConfig);
      if (task.type !== 'grid') throw new Error('Поддерживается задание с картой.');
      const safe: Task = {...task,id:`custom_${crypto.randomUUID()}`,courseId:'course_grade3',module:'Кастомные миссии',xpReward:500,currencyReward:100,status:'open',initialCode:'',allowedCommands:['moveRight();','moveDown();','moveLeft();','moveUp();']};
      (state.tasks[cls.id] ??= []).push(safe); changed = true; break;
    }
    case 'buyItem': case 'equipItem': result = state.users[user.id] = buyCosmetic(user,COSMETICS.find(item => item.id === data.itemId),operation === 'equipItem') as User; changed = true; break;
    case 'completeTask': {
      if (user.role !== 'student') throw new Error('Задания проходят в аккаунте ученика.');
      const cls = user.classId ? state.classes[user.classId] : undefined;
      if (user.classId && !cls) throw new Error('Этот класс удалён.');
      const task = [...MOCK_TASKS,...(cls ? state.tasks[cls.id] ?? [] : [])].find(t => t.id === data.taskId);
      if (cls?.hiddenCourses?.includes(task?.courseId ?? '')) throw new Error('Курс скрыт учителем.');
      result = completeTask(user,task,data.attempts,{tasks:MOCK_TASKS,levels:LEVEL_THRESHOLDS,achievements:ACHIEVEMENTS});
      state.users[user.id] = (result as {user:User}).user; changed = true; break;
    }
    case 'recordAttempt': {
      const attempt = data.attempt as TaskAttempt;
      if (!attempt || typeof attempt.success !== 'boolean' || ![attempt.errors,attempt.duration,attempt.tabSwitches].every(n => Number.isFinite(n) && n >= 0)) throw new Error('Неверная попытка.');
      user.taskAttempts = [...(user.taskAttempts ?? []),{...attempt,timestamp:new Date().toISOString()}].slice(-50); changed = true; break;
    }
    case 'incrementSwitches': {
      const count = Number(data.count); if (!Number.isInteger(count) || count < 1 || count > 1000) throw new Error('Неверный счётчик.');
      user.suspiciousActivity = {highErrorTasks:user.suspiciousActivity?.highErrorTasks ?? [],totalTabSwitches:(user.suspiciousActivity?.totalTabSwitches ?? 0) + count}; changed = true; break;
    }
    case 'resetStudentPassword': {
      const student = state.users[String(data.studentId)];
      if (!student || student.role !== 'student' || !student.classId) throw new Error('Ученик не найден.');
      owned(student.classId);
      const password = crypto.randomUUID().slice(0,12);
      const record = await credential(student.id,password);
      const latest = read(); latest.credentials[identity('student',student.name,student.classId)] = record; save(latest); return password as T;
    }
    default: throw new Error(`Операция недоступна в локальном режиме: ${operation}`);
  }
  if (changed) save(state);
  return structuredClone(result) as T;
}
