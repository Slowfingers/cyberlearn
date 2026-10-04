import assert from 'node:assert/strict';
import {spawnSync} from 'node:child_process';
import {GRADE8_TASKS} from '../curriculum/grade8';
import {COURSES,MOCK_TASKS} from '../constants';
import {getMentorQuestion} from '../curriculum/mentorActivities';
import {terminalLanguage} from '../services/terminal';
assert.equal(GRADE8_TASKS.length,70);
assert.deepEqual(MOCK_TASKS.filter(t=>t.courseId==='course_grade8').map(t=>t.id),Array.from({length:70},(_,i)=>`g8_l${String(i+1).padStart(2,'0')}`));
assert.equal(COURSES.find(c=>c.id==='course_grade8')?.totalModules,14);
let checked=0;
for(const task of GRADE8_TASKS) {
 const question=getMentorQuestion(task);
 assert.equal(new Set(question.options.map(o=>o.text)).size,3,task.id);
 assert.ok(question.options.every(o=>o.feedback.length>20),task.id);
 if(task.type==='quiz') assert.notEqual(question.prompt,task.quizData!.question,task.id+' uses a separate teaching question');
 if(task.type!=='terminal') continue;
 assert.notEqual(task.lesson!.starterCode,task.initialCode,task.id);
 if(terminalLanguage(task)==='sql') {
  const code=`import sqlite3\nc=sqlite3.connect(':memory:')\nc.executescript(${JSON.stringify(task.terminalSetup ?? '')})\nc.executescript(${JSON.stringify(task.initialCode)})\n`;
  const result=spawnSync('python3',['-c',code],{encoding:'utf8',timeout:5000});
  assert.equal(result.status,0,task.id+': '+result.stderr);
 } else {
  const run=(code:string)=>spawnSync('python3',['-c',code+'\n'+task.terminalTests],{encoding:'utf8',timeout:5000});
  const result=run(task.initialCode!);
  assert.equal(result.status,0,task.id+': '+result.stderr);
  assert.notEqual(run(task.lesson!.starterCode!).status,0,task.id+' must reject untouched scaffolding');
  assert.notEqual(run('print("'+result.stdout.trim().replace(/"/g,'\\"').replace(/\n/g,'\\n')+'")').status,0,task.id+' must reject printing the answer without implementing the contract');
 }
 checked++;
}
console.log(`grade8.check: 70 ordered lessons; 14 modules; ${checked} Python/SQL reference programs run; unfinished scaffolds and output-only answers rejected.`);
