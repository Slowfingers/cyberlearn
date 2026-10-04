import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import '../index.css';
import {GRADE8_TASKS} from '../curriculum/grade8';
import {evaluateCodeLocally} from '../services/localEvaluation';
function Audit(){
 const tasks=GRADE8_TASKS.filter(t=>['terminal','html'].includes(t.type));
 const [id,setId]=useState(tasks[0].id),[busy,setBusy]=useState(false),[result,setResult]=useState('');
 const task=tasks.find(t=>t.id===id)!;
 async function run(reference:boolean){setBusy(true);setResult('Исполняется…');try{const result=await evaluateCodeLocally(reference?task.initialCode!:task.lesson!.starterCode!,task);setResult(JSON.stringify(result,null,2));}catch(e){setResult(String(e));}finally{setBusy(false);}}
 return <main style={{minHeight:'100dvh',padding:24,color:'#e2e8f0',background:'#0c1220'}}><h1>Проверка курса 8 класса</h1><label>Задание <select style={{width:'100%',maxWidth:'100%'}} aria-label="Задание" value={id} disabled={busy} onChange={e=>{setId(e.target.value);setResult('');}}>{tasks.map(t=><option key={t.id} value={t.id}>{t.id} · {t.title}</option>)}</select></label><p>{task.lesson!.goal}</p><div style={{display:'flex',gap:12,flexWrap:'wrap'}}><button disabled={busy} onClick={()=>run(true)}>Проверить эталон</button><button disabled={busy} onClick={()=>run(false)}>Проверить шаблон</button></div><pre aria-live="polite" style={{whiteSpace:'pre-wrap',overflowWrap:'anywhere',marginTop:20}}>{result}</pre></main>;
}
createRoot(document.getElementById('root')!).render(<Audit/>);
