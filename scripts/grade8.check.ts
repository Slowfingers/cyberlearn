import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {GRADE8_TASKS} from '../curriculum/grade8';
import {COURSES,MOCK_TASKS} from '../constants';
import {getMentorQuestion} from '../curriculum/mentorActivities';
import {terminalLanguage} from '../services/terminal';
assert.equal(GRADE8_TASKS.length,70);
assert.deepEqual(MOCK_TASKS.filter(t=>t.courseId==='course_grade8').map(t=>t.id),Array.from({length:70},(_,i)=>`g8_l${String(i+1).padStart(2,'0')}`));
assert.equal(COURSES.find(c=>c.id==='course_grade8')?.totalModules,14);
for(const field of ['id','title'] as const)assert.equal(new Set(GRADE8_TASKS.map(t=>t[field])).size,70,`Повтор ${field}`);
assert.equal(new Set(GRADE8_TASKS.map(t=>t.lesson!.explanation)).size,70,'Повтор объяснения');
assert.equal(new Set(GRADE8_TASKS.map(t=>JSON.stringify([t.type,t.quizData,t.initialCode]))).size,70,'Повтор задания');
const sqlRun=(query:string,fixture:string)=>spawnSync('python3',['-c',`import sqlite3,json
c=sqlite3.connect(':memory:')
c.executescript(${JSON.stringify(fixture)})
statement=''
result=[]
for char in ${JSON.stringify(query)}:
    statement+=char
    if char==';' and sqlite3.complete_statement(statement):
        cursor=c.execute(statement)
        if cursor.description: result.append(([x[0] for x in cursor.description],cursor.fetchall()))
        statement=''
if statement.strip():
    cursor=c.execute(statement)
    if cursor.description: result.append(([x[0] for x in cursor.description],cursor.fetchall()))
print(json.dumps(result,ensure_ascii=False))
`],{encoding:'utf8',timeout:5000});
let checked=0;
for(const task of GRADE8_TASKS) {
 const question=getMentorQuestion(task);
 assert.equal(new Set(question.options.map(o=>o.text)).size,3,task.id);
 assert.ok(question.options.every(o=>o.feedback.length>20),task.id);
 if(task.type==='quiz') assert.notEqual(question.prompt,task.quizData!.question,task.id+' uses a separate teaching question');
 if(task.type!=='terminal') continue;
 assert.notEqual(task.lesson!.starterCode,task.initialCode,task.id);
 if(terminalLanguage(task)==='sql') {
  assert.equal(task.terminalSetupVariants?.length,2,task.id+': нужны другие наборы строк');
  for(const fixture of [task.terminalSetup!,...task.terminalSetupVariants!]){
   const result=sqlRun(task.initialCode!,fixture);
   assert.equal(result.status,0,task.id+': '+result.stderr);
   assert.notEqual(sqlRun(task.lesson!.starterCode!,fixture).stdout,result.stdout,task.id+': пустой запрос не считается решением');
  }
  const base=sqlRun(task.initialCode!,task.terminalSetup!).stdout;
  assert.ok(task.terminalSetupVariants!.some(f=>sqlRun(task.initialCode!,f).stdout!==base),task.id+': данные проверки должны менять ответ');

 } else {
  const run=(code:string)=>spawnSync('python3',['-c',code+'\n'+task.terminalTests],{encoding:'utf8',timeout:5000});
  const result=run(task.initialCode!);
  assert.equal(result.status,0,task.id+': '+result.stderr);
  assert.notEqual(run(task.lesson!.starterCode!).status,0,task.id+' must reject untouched scaffolding');
  assert.notEqual(run('print("'+result.stdout.trim().replace(/"/g,'\\"').replace(/\n/g,'\\n')+'")').status,0,task.id+' must reject printing the answer without implementing the contract');
 }
 if(task.id==='g8_l51'){
  const constant=task.initialCode!.replace(/def train\(samples\):[\s\S]*?\nw, b =/, 'def train(samples):\n    return 1, 0\nw, b =');
  assert.notEqual(spawnSync('python3',['-c',constant+'\n'+task.terminalTests],{encoding:'utf8',timeout:5000}).status,0,'Заранее заданные веса не заменяют обучение');
 }
 checked++;
}
console.log(`grade8.check: 70 ordered lessons; 14 modules; ${checked} Python/SQL reference programs run; unfinished scaffolds and output-only answers rejected.`);
