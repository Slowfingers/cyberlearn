import { readFileSync, writeFileSync, mkdirSync, renameSync } from 'node:fs';
import { AsyncLocalStorage } from 'node:async_hooks';
import { randomBytes, createHash } from 'node:crypto';
import {validateAssessment, publicTask, gradeAssessment} from './assessments';
import type { AssessmentSubmission, Classroom, Task, TaskAttempt, User } from '../types';
import { ACHIEVEMENTS, COSMETICS, LEVEL_THRESHOLDS, MOCK_TASKS } from '../constants';
import { buyCosmetic, completeTask, validateMap } from '../functions/domain.mjs';

const context = new AsyncLocalStorage<string>();
export type Sessions=Record<string,{uid:string;expires:number}>;
export interface SchoolSnapshot {state: State; sessions: Sessions}
const storageContext = new AsyncLocalStorage<SchoolSnapshot>();
const sessionKey=(token:string)=>createHash('sha256').update(token).digest('hex');
function readSessions():Sessions {const storage=storageContext.getStore();if(storage)return structuredClone(storage.sessions);try{return JSON.parse(readFileSync('.cyberlearn/sessions.json','utf8'));}catch{return {};}}
function saveSessions(sessions:Sessions){for(const key of Object.keys(sessions)) if(sessions[key].expires<=Date.now()) delete sessions[key];const storage=storageContext.getStore();if(storage){storage.sessions=structuredClone(sessions);return;}mkdirSync('.cyberlearn',{recursive:true,mode:0o700});writeFileSync('.cyberlearn/sessions.json.tmp',JSON.stringify(sessions),{mode:0o600});renameSync('.cyberlearn/sessions.json.tmp','.cyberlearn/sessions.json');}
const file = '.cyberlearn/data.json';
interface Credential { uid: string; salt: string; digest: string }
export interface State { submissions?: AssessmentSubmission[]; folders?: string[]; version: 1; users: Record<string, User>; classes: Record<string, Classroom>; tasks: Record<string, Task[]>; credentials: Record<string, Credential> }
const newUser = (id: string, name: string, role: User['role'], classId?: string): User => ({ id, name, role, ...(classId ? {classId} : {}), xp: 0, currency: 0, level: 1, tasksCompleted: 0, totalErrors: 0, completedTaskIds: [], inventory: ['av_1','col_default','frame_none','skin_sparky'], achievements: [], equipped: {avatar:'av_1',droneColor:'col_default',avatarFrame:'frame_none',mascotSkin:'skin_sparky'} });
function read(): State {
  const storage=storageContext.getStore();if(storage)return structuredClone(storage.state);
  return JSON.parse(readFileSync(file,'utf8'));
}
function save(state: State) {
  const storage=storageContext.getStore();if(storage){storage.state=structuredClone(state);return;}
  mkdirSync('.cyberlearn',{recursive:true,mode:0o700});
  writeFileSync(file+'.tmp',JSON.stringify(state),{mode:0o600});
  renameSync(file+'.tmp',file);
}
/** Shared authorization and school logic, with a request-scoped persistent-store snapshot. */
export function withSchoolSnapshot<T>(snapshot:SchoolSnapshot,token:string,work:()=>Promise<T>):Promise<T> {
  return storageContext.run(snapshot,()=>context.run(token,work));
}
export async function dispatchSchool(operation:string,data:Record<string,unknown>):Promise<unknown> {
  if(operation==='login') return loginLocal(data.role as 'teacher'|'student',data.name as string,(data.password ?? '') as string,data.inviteCode as string|undefined);
  if(operation==='logout') return logoutLocal();
  return localCall(operation,data);
}
export async function provisionTeacher(name: string, password: string) {
  let state: State;
  try { state=read(); } catch { state={version:1,users:{},classes:{},tasks:{},credentials:{}}; }
  const teacher=Object.values(state.users).find(u=>u.role==='teacher') ?? newUser('teacher',name,'teacher');
  teacher.name=name;
  state.users[teacher.id]=teacher;
  for(const key of Object.keys(state.credentials)) if(state.credentials[key].uid===teacher.id) delete state.credentials[key];
  state.credentials[identity('teacher',name)]=await credential(teacher.id,password);
  save(state);
  saveSessions({});
}
export async function provisionImportedStudent(user:User) {
  const state=read();
  if(user.role!=='student' || !user.classId || !state.classes[user.classId] || !state.users[user.id]) throw Error('Неверная связь импортируемого ученика с классом.');
  const key=identity('student',user.name,user.classId);
  if(state.credentials[key] && state.credentials[key].uid!==user.id) throw Error('Дублирующееся имя ученика в классе.');
  state.credentials[key]=await credential(user.id,'class-code-entry');
  save(state);
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
function current(state=read()): User|null {
  const session=readSessions()[sessionKey(context.getStore() ?? '')];
  return session && session.expires>Date.now() ? state.users[session.uid] ?? null : null;
}
function notify() {}
export async function logoutLocal() { const sessions=readSessions();delete sessions[sessionKey(context.getStore() ?? '')];saveSessions(sessions); }
export async function loginLocal(role: 'teacher' | 'student', name: string, password: string, inviteCode?: string): Promise<User> {
  if(role!=='teacher' && role!=='student') throw new Error('Неверный тип входа.');
  if(typeof name!=='string' || name.length>100 || typeof password!=='string') throw new Error('Неверные данные входа.');
  if (!name.trim()) throw new Error('Укажи имя.');
  if (role === 'teacher' && password.length < 8) throw new Error('Для локального аккаунта нужен пароль от 8 символов.');
  let state = read();
  const cls = role === 'student' ? Object.values(state.classes).find(c => c.inviteCode === inviteCode?.trim().toUpperCase()) : undefined;
  if (role === 'student' && !cls) throw new Error('Класс не найден. Проверь код у учителя.');
  const key = identity(role,name,cls?.id);
  const stored = state.credentials[key];
  if(role==='teacher' && !stored) throw new Error('Неверный логин или пароль. Регистрация учителей закрыта.');
  if(role==='student') password = 'class-code-entry';
  let user: User;
  if (stored) {
    if (await digest(password,stored.salt) !== stored.digest) throw new Error('Неверный пароль локального аккаунта.');
    state = read();
    user = state.users[stored.uid];
    if (!user) throw new Error('Локальный аккаунт не найден.');
  } else {
    const id = `student_${crypto.randomUUID()}`;
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
  const sessions=readSessions();sessions[sessionKey(context.getStore()!)]= {uid:user.id,expires:Date.now()+12*60*60*1000};saveSessions(sessions);
  notify();
  return structuredClone(user);
}
export async function localCall<T>(operation: string, data: Record<string, unknown> = {}): Promise<T> {
  const state = read();
  const user = current(state);
  // Checking the session before login (or after expiry) is normal, not an error.
  if (operation === 'getUser') return structuredClone(user ?? null) as T;
  if (!user) throw new Error('Войди в локальный аккаунт.');
  const owned = (id: string) => {
    const cls = state.classes[id];
    if (user.role !== 'teacher' || cls?.teacherId !== user.id) throw new Error('Нет доступа к этому классу.');
    return cls;
  };
  let result: unknown = null;
  let changed = false;
  switch(operation) {
    case 'listFolders': { if(user.role!=='teacher') throw new Error('Нет доступа.'); result=state.folders ?? []; break; }
    case 'createFolder': { if(user.role!=='teacher') throw new Error('Нет доступа.'); const name=String(data.name ?? '').trim().slice(0,100); if(!name) throw new Error('Укажи название папки.'); state.folders=[...new Set([...(state.folders ?? []),name])]; changed=true; result=state.folders; break; }
    case 'raiseHand': { if(user.role!=='student'||!user.classId||!state.classes[user.classId]) throw new Error('Нет класса.'); user.helpRequestedAt = data.raised ? (user.helpRequestedAt ?? new Date().toISOString()) : undefined; user.helpTaskId = data.raised ? String(data.taskId ?? '').slice(0,100) : undefined; changed=true; result=user; break; }
    case 'resolveHand': { const student=state.users[String(data.studentId)]; if(!student?.classId) throw new Error('Ученик не найден.'); owned(student.classId); student.helpRequestedAt=undefined; student.helpTaskId=undefined; changed=true; break; }
    case 'listClassrooms': result = Object.values(state.classes).filter(cls => user.role === 'teacher' ? cls.teacherId === user.id : cls.id === user.classId); break;
    case 'listUsers': {
      if (user.role !== 'teacher') throw new Error('Нет доступа.');
      if (data.classId) owned(String(data.classId));
      const ids = new Set(Object.values(state.classes).filter(cls => cls.teacherId === user.id).map(cls => cls.id));
      result = Object.values(state.users).filter(u => u.role === 'student' && ids.has(u.classId ?? '') && (!data.classId || u.classId === data.classId)); break;
    }
    case 'createClassroom': {
      if(user.role !== 'teacher') throw new Error('Нет доступа.');
      const name = String(data.name ?? '').trim().slice(0,100); if (!name) throw new Error('Укажи название класса.');
      const cls: Classroom = {id:`local_class_${crypto.randomUUID()}`,name,teacherId:user.id,inviteCode:crypto.randomUUID().replace(/-/g,'').slice(0,12).toUpperCase(),studentIds:[]};
      state.classes[cls.id] = cls; result = cls; changed = true; break;
    }
    case 'updateClassroom': {
      const updated = data.classroom as Classroom; const cls = owned(updated.id);
      cls.name = updated.name; cls.hiddenCourses = updated.hiddenCourses ?? []; cls.folder = String(updated.folder ?? '').trim().slice(0,100); changed = true; break;
    }
    case 'deleteClassroom': { const id = String(data.classId); owned(id); delete state.classes[id]; delete state.tasks[id]; result = true; changed = true; break; }
    case 'listTasks': { if(user.role==='teacher'){ const cls=owned(String(data.classId)); result=state.tasks[cls.id] ?? []; }else{ result=(state.tasks[user.classId ?? ''] ?? []).filter(t=>!t.assessment || t.assessment.published || state.submissions?.some(s=>s.taskId===t.id && s.studentId===user.id)).map(publicTask); } break; }
    case 'createTask': {
      const cls = owned(String(data.classId)); const task = data.task as Task;
      validateMap(task.mapConfig);
      if (task.type !== 'grid') throw new Error('Поддерживается задание с картой.');
      const safe: Task = {...task,id:`custom_${crypto.randomUUID()}`,courseId:'course_teacher',module:'Минизадания',xpReward:500,currencyReward:100,status:'open',initialCode:'',allowedCommands:['moveRight();','moveDown();','moveLeft();','moveUp();']};
      (state.tasks[cls.id] ??= []).push(safe); changed = true; break;
    }
    case 'saveAssessment': {
      const cls=owned(String(data.classId)); const input=data.task as Task;
      const config=validateAssessment(input.assessment);
      const title=String(input.title ?? '').trim().slice(0,150); if(!title) throw new Error('Укажи название работы.');
      const tasks=state.tasks[cls.id] ??= [];
      const existing=input.id ? tasks.find(t=>t.id===input.id && t.type==='assessment') : undefined;
      if(input.id && !existing) throw new Error('Работа не найдена.');
      if(existing && state.submissions?.some(s=>s.taskId===existing.id)) throw new Error('У работы уже есть ответы. Изменить вопросы нельзя.');
      const task:Task={id:existing?.id ?? `assessment_${crypto.randomUUID()}`,type:'assessment',courseId:'course_teacher',module:'Контрольные',title,description:String(input.description ?? '').slice(0,3000),assessment:config,difficulty:'Новичок',xpReward:0,currencyReward:0,status:'open'};
      if(existing) tasks[tasks.indexOf(existing)]=task; else tasks.push(task);
      result=task;changed=true;break;
    }
    case 'publishAssessment': { const cls=owned(String(data.classId));const task=state.tasks[cls.id]?.find(t=>t.id===data.taskId && t.assessment);if(!task) throw new Error('Работа не найдена.');task.assessment!.published=Boolean(data.published);changed=true;break; }
    case 'listSubmissions': {
      if(user.role==='teacher'){ const cls=owned(String(data.classId));result=(state.submissions ?? []).filter(s=>s.classId===cls.id); }
      else result=(state.submissions ?? []).filter(s=>s.studentId===user.id);
      break;
    }
    case 'submitAssessment': {
      if(user.role!=='student'||!user.classId) throw new Error('Нет доступа.');
      const task=state.tasks[user.classId]?.find(t=>t.id===data.taskId && t.assessment?.published);if(!task) throw new Error('Работа закрыта.');
      if(state.submissions?.some(s=>s.studentId===user.id && s.taskId===task.id)) throw new Error('Работа уже отправлена.');
      const answers=data.answers as Record<string,string>;
      const graded=gradeAssessment(task.assessment!.questions,answers);
      const submission:AssessmentSubmission={id:crypto.randomUUID(),taskId:task.id,studentId:user.id,studentName:user.name,classId:user.classId,answers:graded.answers,grades:graded.grades,submittedAt:new Date().toISOString()};
      (state.submissions ??= []).push(submission);
      user.completedTaskIds=[...new Set([...(user.completedTaskIds ?? []),task.id])];user.tasksCompleted=user.completedTaskIds.length;
      result=submission;changed=true;break;
    }
    case 'reviewSubmission': {
      const submission=state.submissions?.find(s=>s.id===data.submissionId);if(!submission) throw new Error('Ответ не найден.');owned(submission.classId);
      const task=state.tasks[submission.classId]?.find(t=>t.id===submission.taskId);
      const question=task?.assessment?.questions.find(q=>q.id===data.questionId);if(!question) throw new Error('Вопрос не найден.');
      const points=Number(data.points);if(!Number.isFinite(points)||points<0||points>question.points) throw new Error('Баллы вне допустимого диапазона.');
      submission.grades[question.id]={points,comment:String(data.comment ?? '').slice(0,2000)};result=submission;changed=true;break;
    }
    case 'buyItem': case 'equipItem': result = state.users[user.id] = buyCosmetic(user,COSMETICS.find(item => item.id === data.itemId),operation === 'equipItem') as User; changed = true; break;
    case 'completeTask': {
      if (user.role !== 'student') throw new Error('Задания проходят в аккаунте ученика.');
      const cls = user.classId ? state.classes[user.classId] : undefined;
      if (user.classId && !cls) throw new Error('Этот класс удалён.');
      const task = [...MOCK_TASKS,...(cls ? state.tasks[cls.id] ?? [] : [])].find(t => t.id === data.taskId);
      if(task?.type==='assessment') throw new Error('Отправь ответы контрольной.');
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
    case 'resetStudentPassword': throw new Error('Ученики входят по коду класса без пароля.');
    default: throw new Error(`Операция недоступна в локальном режиме: ${operation}`);
  }
  if (changed) save(state);
  return structuredClone(result) as T;
}

let queue=Promise.resolve();
const attempts=new Map<string,{count:number;until:number}>();
export function localApi(req:any,res:any,next:any) {
 if(req.url?.split('?')[0]!=='/api/local') return next();
 if(req.method!=='POST') {res.statusCode=405;return res.end();}
 const origin=req.headers.origin;
 try { if(origin && new URL(origin).host!==req.headers.host) {res.statusCode=403;return res.end();} } catch {res.statusCode=403;return res.end();}
 let body=''; req.on('data',(chunk:any)=>{body+=chunk; if(body.length>250000) req.destroy();});
 req.on('end',()=>{
 const work=async()=>{
 let token=req.headers.cookie?.match(/(?:^|;\s*)cyberlearn_session=([a-f0-9]{64})/)?.[1] ?? randomBytes(32).toString('hex');
 try {
 const {operation,...data}=JSON.parse(body);
 const ip=req.socket.remoteAddress ?? 'local';
 if(operation==='login') {
 const limit=attempts.get(ip); if(limit && limit.until>Date.now() && limit.count>=60) throw new Error('Слишком много попыток. Попробуй через минуту.');
 attempts.set(ip,{count:(limit && limit.until>Date.now()?limit.count:0)+1,until:Date.now()+60000});
 token=randomBytes(32).toString('hex');
 }
 const result=await context.run(token,async()=>operation==='login'?loginLocal(data.role,data.name,data.password ?? '',data.inviteCode):operation==='logout'?logoutLocal():localCall(operation,data));
 if(operation==='login') attempts.delete(ip);
 res.setHeader('Content-Type','application/json; charset=utf-8'); res.setHeader('Cache-Control','no-store');
 if(operation==='login') res.setHeader('Set-Cookie',`cyberlearn_session=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=43200${req.socket.encrypted?'; Secure':''}`);
 if(operation==='logout') res.setHeader('Set-Cookie','cyberlearn_session=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0');
 res.end(JSON.stringify({data:result ?? null}));
 }catch(error){res.statusCode=400;res.setHeader('Content-Type','application/json; charset=utf-8');res.end(JSON.stringify({error:error instanceof Error?error.message:'Ошибка сервера'}));}
 };
 queue=queue.then(work,work);
 });
}
