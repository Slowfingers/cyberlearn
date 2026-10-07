import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import TeacherDashboard from '../components/TeacherDashboard';
import {User,Classroom} from '../types';
import '../index.css';
// All server requests stay in this isolated visual preview.
const room:Classroom={id:'preview-class',name:'6 А — тестовый класс',teacherId:'design-preview',inviteCode:'PREVIEW',studentIds:['preview-student'],folder:'Учебная папка'};
const user:User={id:'design-preview',name:'Предпросмотр учителя',role:'teacher',xp:0,currency:0,level:1,inventory:[],achievements:[],equipped:{avatar:'av_1',droneColor:'#55dfd4'}};
const pupil:User={...user,id:'preview-student',role:'student',classId:room.id,name:'Александра — пример длинного имени',completedTaskIds:[],xp:120,level:2};
const originalFetch=window.fetch.bind(window);
window.fetch=async(input,options)=>{
 if(String(input)!=='/api/local')return originalFetch(input,options);
 const {operation}=JSON.parse(String(options?.body ?? '{}'));
 const data=operation==='listClassrooms'?[room]:operation==='listUsers'?[pupil]:operation==='listFolders'?['Учебная папка']:[];
 return new Response(JSON.stringify({data}),{headers:{'Content-Type':'application/json'}});
};
function Preview(){const [active,setActive]=useState<string|null>(room.id);return <div className="academy-app" style={{height:'100dvh'}}><TeacherDashboard currentUser={user} classrooms={[room]} activeClassId={active} onSelectClass={setActive} onClassCreated={()=>{}} onReorderClassrooms={()=>{}}/></div>;}
const root=createRoot(document.getElementById('root')!);root.render(<Preview/>);
import.meta.hot?.dispose(()=>{window.fetch=originalFetch;root.unmount();});
