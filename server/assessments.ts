import type {AssessmentQuestion,Task} from '../types';
export function validateAssessment(value:Task['assessment']):NonNullable<Task['assessment']> {
 if(!value||!Array.isArray(value.questions)||value.questions.length<1||value.questions.length>30) throw new Error('Добавьте от 1 до 30 вопросов.');
 const ids=new Set<string>();
 const questions=value.questions.map(q=>{
  if(!q||typeof q.id!=='string'||ids.has(q.id)||q.id.length>100) throw new Error('Неверный идентификатор вопроса.');ids.add(q.id);
  const prompt=String(q.prompt ?? '').trim().slice(0,3000);
  if(!prompt||!['choice','open','short'].includes(q.type)||!Number.isInteger(q.points)||q.points<1||q.points>100) throw new Error('Проверьте текст, тип и баллы вопросов.');
  const safe:AssessmentQuestion={id:q.id,type:q.type,prompt,points:q.points};
  if(q.type==='choice'){
   if(!Array.isArray(q.options)||q.options.length<2||q.options.length>6||q.options.some(o=>typeof o!=='string'||!o.trim()||o.length>500)||!Number.isInteger(q.correctIndex)||q.correctIndex!<0||q.correctIndex!>=q.options.length) throw new Error('Для теста заполните варианты и выберите правильный.');
   safe.options=q.options.map(o=>o.trim());safe.correctIndex=q.correctIndex;
  }
  if(q.type==='short'){if(typeof q.expectedAnswer!=='string'||!q.expectedAnswer.trim()||q.expectedAnswer.length>500) throw new Error('Укажите правильный короткий ответ.');safe.expectedAnswer=q.expectedAnswer.trim();}
  return safe;
 });
 return {published:Boolean(value.published),questions};
}
export function publicTask(task:Task):Task {
 if(!task.assessment)return task;
 return {...task,assessment:{...task.assessment,questions:task.assessment.questions.map(({correctIndex,expectedAnswer,...q})=>q)}};
}
const normalize=(s:string)=>s.normalize('NFKC').trim().replace(/\s+/g,' ').toLocaleLowerCase('ru');
export function gradeAssessment(questions:AssessmentQuestion[],input:Record<string,string>){
 if(!input||typeof input!=='object'||Array.isArray(input)) throw new Error('Нет ответов.');
 const answers:Record<string,string>={};const grades:Record<string,{points:number|null;comment:string}>={};
 for(const q of questions){const answer=input[q.id];if(typeof answer!=='string'||!answer.trim()||answer.length>5000) throw new Error('Ответьте на каждый вопрос.');
  if(q.type==='choice'&&!q.options?.[Number(answer)]) throw new Error('Выберите вариант ответа.');
  answers[q.id]=answer.trim();grades[q.id]={points:q.type==='open'?null:q.type==='choice'?(answer===String(q.correctIndex)?q.points:0):(normalize(answer)===normalize(q.expectedAnswer!)?q.points:0),comment:''};
 }
 return {answers,grades};
}
