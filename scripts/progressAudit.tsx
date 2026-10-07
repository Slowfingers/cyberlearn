// Dev-only, isolated API fixture. No real student records are read or changed.
import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import StudentDashboard from '../components/StudentDashboard';
import {MOCK_TASKS} from '../constants';
import type {User} from '../types';
import '../index.css';
const grade=['3','4','5','6','7','8'].includes(new URLSearchParams(window.location.search).get('grade')??'')?new URLSearchParams(window.location.search).get('grade')!:'5';
const courseId=`course_grade${grade}`,remaining=grade==='8'?['g8_l01','g8_l08']:grade==='7'?['g7_l01','g7_l04']:grade==='6'?['g6_m1_l1','g6_m1_l3']:['g5_l20','g5_l46'];
const allQuizzes=new URLSearchParams(window.location.search).get('all')==='1';
if(allQuizzes) remaining.splice(0,remaining.length,...MOCK_TASKS.filter(t=>t.courseId===courseId&&t.type==='quiz').map(t=>t.id));
const single=new URLSearchParams(window.location.search).get('task');
if(single&&MOCK_TASKS.some(t=>t.id===single&&t.courseId===courseId))remaining.splice(0,remaining.length,single);
const total=MOCK_TASKS.filter(t=>t.courseId===courseId).length;
const initial:User={id:`audit_grade${grade}`,name:'Проверка прогресса',role:'student',xp:0,currency:0,level:1,inventory:['av_1'],achievements:[],equipped:{avatar:'av_1',droneColor:'#00f3ff',mascotSkin:'skin_sparky'},completedTaskIds:MOCK_TASKS.filter(t=>t.courseId===courseId&&!remaining.includes(t.id)).map(t=>t.id)};
let user=structuredClone(initial),stale=false,notify=()=>{};
let report=`Подготовлено: ${total-remaining.length} из ${total}`;
const originalFetch=window.fetch.bind(window);
window.fetch=async(input,options)=>{
 if(String(input)!=='/api/local')return originalFetch(input,options);
 const data=JSON.parse(String(options?.body??'{}'));let result:unknown=null;
 switch(data.operation){
  case 'getUser':result=structuredClone(stale?initial:user);if(stale){stale=false;report=`Старый ответ с ${total-remaining.length} уроками получен`;notify();}break;
  case 'listTasks':result=[{...MOCK_TASKS.find(t=>t.id===remaining[0])!,title:'Старая копия урока'}];break;
  case 'completeTask':{const awarded=!user.completedTaskIds!.includes(data.taskId);if(awarded)user={...user,completedTaskIds:[...user.completedTaskIds!,data.taskId],xp:user.xp+100};result={user:structuredClone(user),awarded};report=`Сохранено: ${user.completedTaskIds!.length} из ${total}`;notify();break;}
  case 'listUsers':case 'listClassrooms':case 'listSubmissions':result=[];break;
  case 'recordAttempt':case 'incrementSwitches':break;
  default:return new Response(JSON.stringify({error:`Неизвестная операция теста: ${data.operation}`}),{status:400,headers:{'Content-Type':'application/json'}});
 }
 return new Response(JSON.stringify({data:result}),{headers:{'Content-Type':'application/json'}});
};
function Audit(){const [,render]=useState(0);notify=()=>render(n=>n+1);return <div className="academy-app"><header style={{padding:8}}><button onClick={()=>{stale=true;report='Ожидаем старый ответ';notify();}}>Имитировать старое обновление</button><p role="status">{report}</p></header><StudentDashboard currentUser={initial}/></div>;}
const root=createRoot(document.getElementById('root')!);root.render(<Audit/>);
import.meta.hot?.dispose(()=>{window.fetch=originalFetch;root.unmount();});
