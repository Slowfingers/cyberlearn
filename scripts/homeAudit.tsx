// Dev-only visual fixture; no API calls or student records.
import React, {useState} from 'react';
import {createRoot} from 'react-dom/client';
import StudentHome from '../components/StudentHome';
import {COSMETICS, COURSES, MOCK_TASKS} from '../constants';
import type {User} from '../types';
import '../index.css';
import {GameButton,GameDialog} from '../components/GameUI';
function Preview(){
 const [avatar,setAvatar]=useState(COSMETICS.find(c=>c.value==='street_frost')!.id);
 const [message,setMessage]=useState('');
 const [dialog,setDialog]=useState(false);
 const [state,setState]=useState('progress');
 const user:User={id:'design-preview',name:'Саша',role:'student',xp:500,currency:240,level:3,inventory:[avatar],achievements:[],equipped:{avatar,droneColor:'#00f3ff',mascotSkin:'skin_sparky'}};
 const courses=COURSES.map((c,i)=>({...c,status:state==='locked'?'locked' as const:c.status,progress:state==='complete'?100:i===0?25:0,totalTasks:MOCK_TASKS.filter(t=>t.courseId===c.id).length}));
 return <div className="academy-app"><div style={{padding:8,display:'flex',gap:10,flexWrap:'wrap'}}><label>Аватар <select value={avatar} onChange={e=>setAvatar(e.target.value)}>{COSMETICS.filter(c=>c.type==='avatar').map(c=><option key={c.id} value={c.id}>{c.name}</option>)}</select></label><label>Состояние <select value={state} onChange={e=>setState(e.target.value)}><option value="progress">В процессе</option><option value="complete">Завершено</option><option value="locked">Закрыто</option></select></label><GameButton size="compact" onClick={()=>setDialog(true)}>Образец попапа</GameButton><output>{message}</output></div><StudentHome user={user} courses={courses} tasks={MOCK_TASKS.map(t=>({...t,status:state==='complete'?'completed':'open'}))} progress={25} today={2} onCourse={(id,resume)=>setMessage(`Курс: ${id}; продолжить: ${!!resume}`)} onShop={()=>setMessage('Магазин')} onProfile={()=>setMessage('Профиль')}/>{dialog&&<GameDialog title="Начать новую миссию?" onClose={()=>setDialog(false)}><p>Впереди короткое объяснение наставника и самостоятельное задание.</p><div className="ui-dialog-actions"><GameButton onClick={()=>setDialog(false)}>Вернуться</GameButton><GameButton variant="primary" onClick={()=>{setDialog(false);setMessage('Начать миссию');}}>Начать миссию</GameButton></div></GameDialog>}</div>;
}
createRoot(document.getElementById('root')!).render(<Preview/>);
