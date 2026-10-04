import type {Classroom,User,Task} from '../types';
import type {CloudSnapshot} from './firebaseStore';
import {withSchoolSnapshot,provisionTeacher,provisionImportedStudent} from './localBackend';
type Legacy = {users:Record<string,unknown>;classrooms:Record<string,unknown>;tasks:Record<string,unknown>};
export function legacySummary(legacy:Legacy,teacherId?:string) {
 const users=Object.values(legacy.users) as any[],classes=Object.values(legacy.classrooms) as any[];
 const teachers=users.filter(u=>u?.role==='teacher');
 const teacher=teacherId ? teachers.find(t=>t.id===teacherId) : teachers.length===1?teachers[0]:undefined;
 if(!teacher)throw Error('Укажите CYBERLEARN_LEGACY_TEACHER_ID: преподаватель не выбран однозначно.');
 const owned=classes.filter(c=>c?.teacherId===teacher.id);
 return {teacher,classes:owned,students:users.filter(u=>u?.role==='student' && owned.some(c=>c.id===u.classId)),excludedClasses:classes.length-owned.length};
}
function importedUser(source:any):User {
 if(typeof source.id!=='string' || typeof source.name!=='string' || !source.name.trim())throw Error('В старых данных найден аккаунт без ID или имени.');
 const strings=(value:any)=>Array.isArray(value)?value.filter(v=>typeof v==='string'):[];
 const number=(value:any,fallback=0)=>typeof value==='number' && Number.isFinite(value) && value>=0?value:fallback;
 // Whitelist profile fields: legacy passwords and tokens never enter the new store.
 return {id:source.id,name:source.name.trim(),role:source.role,...(source.classId?{classId:source.classId}:{}),
 xp:number(source.xp),currency:number(source.currency),level:number(source.level,1),totalErrors:number(source.totalErrors),
 tasksCompleted:number(source.tasksCompleted),completedTaskIds:strings(source.completedTaskIds),inventory:strings(source.inventory),achievements:strings(source.achievements),
 equipped:{avatar:source.equipped?.avatar ?? 'av_1',droneColor:source.equipped?.droneColor ?? 'col_default',...(source.equipped?.mascotSkin?{mascotSkin:source.equipped.mascotSkin}:{}),...(source.equipped?.avatarFrame?{avatarFrame:source.equipped.avatarFrame}:{})},
 ...(source.lastActiveDate?{lastActiveDate:source.lastActiveDate}:{}),...(source.streak!==undefined?{streak:number(source.streak)}:{}),
 ...(Array.isArray(source.taskAttempts)?{taskAttempts:source.taskAttempts.map(({taskId,timestamp,errors,tabSwitches,duration,success}:any)=>({taskId,timestamp,errors,tabSwitches,duration,success}))}:{}),
 };
}
export async function importLegacySchool(legacy:Legacy,login:string,password:string,teacherId?:string):Promise<CloudSnapshot> {
 if(password.length<12)throw Error('Нужен новый пароль единственного учителя длиной от 12 символов.');
 const selected=legacySummary(legacy,teacherId);
 const snapshot:CloudSnapshot={state:{version:1,users:{},classes:{},tasks:{},credentials:{},folders:[]},sessions:{},loginLimits:{}};
 const state=snapshot.state;
 const names=new Set<string>(),codes=new Set<string>();
 for(const raw of selected.classes) {
  if(typeof raw.id!=='string' || typeof raw.name!=='string' || typeof raw.inviteCode!=='string' || !raw.inviteCode.trim())throw Error('В старых данных найден класс без ID, имени или кода.');
  const code=raw.inviteCode.trim().toUpperCase();
  if(codes.has(code))throw Error('Дублирующиеся коды старых классов. Исправьте их до переноса.');codes.add(code);
  const cls:Classroom={id:raw.id,name:raw.name,teacherId:selected.teacher.id,inviteCode:code,studentIds:[],...(typeof raw.folder==='string'?{folder:raw.folder}:{}),...(Array.isArray(raw.hiddenCourses)?{hiddenCourses:raw.hiddenCourses}:{})};
  if(state.classes[cls.id])throw Error('Дублирующиеся ID старых классов.');
  state.classes[cls.id]=cls;if(cls.folder && !state.folders!.includes(cls.folder))state.folders!.push(cls.folder);
 }
 for(const raw of [selected.teacher,...selected.students]) {
  const user=importedUser(raw);
  if(state.users[user.id])throw Error('Дублирующиеся ID старых аккаунтов.');
  if(user.role==='student') {
   const identity=JSON.stringify([user.classId,user.name.toLocaleLowerCase('ru')]);
   if(names.has(identity))throw Error('Совпадающие имена учеников внутри класса. Исправьте их до переноса.');names.add(identity);
   state.classes[user.classId!].studentIds.push(user.id);
  }
  state.users[user.id]=user;
 }
 // Import only tasks carrying an explicit class association; unscoped work is not assigned arbitrarily.
 for(const [key,value] of Object.entries(legacy.tasks)) {
  const items=Array.isArray(value)?value:[value];
  for(const raw of items as any[]) {
   const classId=raw?.classId ?? (state.classes[key]?key:undefined);
   if(classId && state.classes[classId] && raw?.id && raw?.type) (state.tasks[classId] ??= []).push(raw as Task);
  }
 }
 await withSchoolSnapshot(snapshot,'import',async()=>{
  await provisionTeacher(login,password);
  for(const user of selected.students)await provisionImportedStudent(state.users[user.id]);
 });
 return snapshot;
}
