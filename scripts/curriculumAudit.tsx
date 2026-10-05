import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {MOCK_TASKS} from '../constants';
import {evaluateCodeLocally} from '../services/localEvaluation';
import '../index.css';
function Audit(){
 const [running,setRunning]=useState(false),[report,setReport]=useState<string[]>([]);
 const tasks=MOCK_TASKS.filter(t=>['grid','terminal','html'].includes(t.type));
 async function run(){setRunning(true);setReport([]);const lines:string[]=[];for(const t of tasks){
  try{const r=await evaluateCodeLocally(t.initialCode!,t);const expected=!['g4_l43','g4_l51','g4_l60'].includes(t.id);lines.push(`${r.success===expected?'OK':'FAIL'} ${t.id} ${t.type}${r.success===expected?'':' — '+r.error}`);}catch(e){lines.push(`FAIL ${t.id} — ${String(e)}`);}setReport([...lines]);
 }
 for(const [id,code] of Object.entries({g4_l43:'forward()\nforward()\nright()\nforward()',g4_l51:'<h1>Мой первый сайт</h1><button style="color: cyan;">Нажми меня</button>',g4_l60:'<h1 style="color: lime;">Портфолио ученика 4 класса</h1><p>Мои лучшие игры и программы</p>'})){const result=await evaluateCodeLocally(code,MOCK_TASKS.find(t=>t.id===id)!);lines.push(`${result.success?'OK':'FAIL'} ${id} готовое решение${result.success?'':' — '+result.error}`);}
 setReport([...lines,`Готово: ${lines.length}, ошибок: ${lines.filter(l=>l.startsWith('FAIL')).length}`]);setRunning(false);}
 return <main style={{padding:20,background:'#0c1220',color:'white',minHeight:'100vh'}}><h1>Проверка эталонов всех курсов</h1><p>Используется настоящая проверка тренажёра; прогресс учеников не изменяется.</p><button disabled={running} onClick={run}>Проверить все эталоны</button><pre role="status" style={{whiteSpace:'pre-wrap'}}>{report.join('\n')}</pre></main>;
}const root=createRoot(document.getElementById('root')!);
root.render(<Audit/>);
import.meta.hot?.dispose(()=>root.unmount());
