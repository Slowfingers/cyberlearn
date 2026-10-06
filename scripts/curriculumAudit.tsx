import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {MOCK_TASKS} from '../constants';
import {evaluateCodeLocally} from '../services/localEvaluation';
import '../index.css';
function Audit(){
 const [running,setRunning]=useState(false),[report,setReport]=useState<string[]>([]);
 const tasks=MOCK_TASKS.filter(t=>['grid','terminal','html'].includes(t.type));
 async function checkGrade(grade:number){setRunning(true);const lines:string[]=[];for(const task of tasks.filter(t=>t.courseId===`course_grade${grade}`)){
  for(const [label,code,expected] of [['заготовка',task.lesson!.starterCode!,false],['решение',task.initialCode!,true]] as const){
   const result=await evaluateCodeLocally(code,task);lines.push(`${result.success===expected?'OK':'FAIL'} ${task.id} ${label}${result.success===expected?'':' — '+result.error}`);
  }
 }
 if(grade===7){
  const counter=tasks.find(t=>t.id==='g7_l34')!,iot=tasks.find(t=>t.id==='g7_l55')!;
  const negatives=[
   [counter,'счёт растёт на два',counter.initialCode!.replace('+ 1;', '+ 2;')],
   [counter,'кнопка без действия','<p id="counter">0</p><button id="add">Очко</button>'],
   [iot,'неверная граница температуры',iot.initialCode!.replace('temp > 28.0','temp >= 28.0')],
   [iot,'неверная граница света',iot.initialCode!.replace('light < 300','light <= 300')],
  ] as const;
  for(const [task,label,code] of negatives){const result=await evaluateCodeLocally(code,task);lines.push(`${!result.success?'OK':'FAIL'} ${task.id} ${label}`);}
 }
 setReport([...lines,`Готово: ${lines.length}, ошибок: ${lines.filter(l=>l.startsWith('FAIL')).length}`]);setRunning(false);}
 async function run(){setRunning(true);setReport([]);const lines:string[]=[];for(const t of tasks){
  try{const r=await evaluateCodeLocally(t.initialCode!,t);const expected=!['g4_l43','g4_l51','g4_l60'].includes(t.id);lines.push(`${r.success===expected?'OK':'FAIL'} ${t.id} ${t.type}${r.success===expected?'':' — '+r.error}`);}catch(e){lines.push(`FAIL ${t.id} — ${String(e)}`);}setReport([...lines]);
 }
 for(const [id,code] of Object.entries({g4_l43:'forward()\nforward()\nright()\nforward()',g4_l51:'<h1>Мой первый сайт</h1><button style="color: cyan;">Нажми меня</button>',g4_l60:'<h1 style="color: lime;">Портфолио ученика 4 класса</h1><p>Мои лучшие игры и программы</p>'})){const result=await evaluateCodeLocally(code,MOCK_TASKS.find(t=>t.id===id)!);lines.push(`${result.success?'OK':'FAIL'} ${id} готовое решение${result.success?'':' — '+result.error}`);}
 setReport([...lines,`Готово: ${lines.length}, ошибок: ${lines.filter(l=>l.startsWith('FAIL')).length}`]);setRunning(false);}
 return <main style={{padding:20,background:'#0c1220',color:'white',minHeight:'100vh'}}><h1>Проверка эталонов всех курсов</h1><p>Используется настоящая проверка тренажёра; прогресс учеников не изменяется.</p><button disabled={running} onClick={run}>Проверить все эталоны</button><button disabled={running} onClick={()=>checkGrade(6)}>Проверить 6 класс: заготовки и решения</button><button disabled={running} onClick={()=>checkGrade(7)}>Проверить 7 класс: заготовки и решения</button><button disabled={running} onClick={()=>checkGrade(8)}>Проверить 8 класс: заготовки и решения</button><pre role="status" style={{whiteSpace:'pre-wrap'}}>{report.join('\n')}</pre></main>;
}const root=createRoot(document.getElementById('root')!);
root.render(<Audit/>);
import.meta.hot?.dispose(()=>root.unmount());
