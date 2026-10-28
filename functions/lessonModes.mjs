import {lessonVersion} from './lessonCheckpoint.mjs';
export const LESSON_MODES={learn:{label:'Изучаю',hints:true},train:{label:'Тренируюсь',hints:true},check:{label:'Проверяю себя',hints:false}};
export function submitPilotAttempt(user,data,task) {
 if(user.role!=='student'||!task||!/^g3_m1_l[3-7]$/.test(task.id))throw new Error('Урок не входит в пилот');
 if(!Object.hasOwn(LESSON_MODES,data.mode)||data.version!==lessonVersion(task))throw new Error('Неверный режим или версия');
 if(typeof data.requestId!=='string'||!/^[a-zA-Z0-9_-]{8,80}$/.test(data.requestId))throw new Error('Неверный номер отправки');
 const existing=user.lessonModeAttempts?.find(a=>a.requestId===data.requestId);
 if(existing){if(existing.taskId!==task.id||existing.mode!==data.mode||existing.version!==data.version)throw new Error('Номер отправки уже используется');return {user,result:existing};}
 const target=task.type==='typing'?task.typingConfig?.targetText??task.typingData?.text:undefined;
 if(typeof data.answer!=='string'||data.answer.length>2000)throw new Error('Неверный ответ');
 const correct=task.type==='typing'?data.answer===target:task.type==='quiz'?data.answer===task.quizData?.options[task.quizData.correctIndex]:false;
 const result={requestId:data.requestId,taskId:task.id,version:data.version,mode:data.mode,correct,at:new Date().toISOString()};
 const next=structuredClone(user);next.lessonModeAttempts=[...(next.lessonModeAttempts??[]),result].slice(-200);
 return {user:next,result};
}
