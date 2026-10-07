// Isolated UI fixture. Purchases update React state only; no server or stored student data.
import React,{useState} from 'react';
import {createRoot} from 'react-dom/client';
import {PlayerShop,PlayerProfile} from '../components/PlayerPanels';
import {GameButton} from '../components/GameUI';
import {COSMETICS,COURSES} from '../constants';
import type {User} from '../types';
import '../index.css';
function Preview(){
 const avatar=COSMETICS.find(c=>c.value==='street_frost')!.id;
 const [user,setUser]=useState<User>({id:'panel-preview',name:'Саша',role:'student',xp:500,currency:1000,level:3,inventory:[avatar,'av_1'],achievements:[],equipped:{avatar,droneColor:'#00f3ff',mascotSkin:'skin_sparky'}});
 const [panel,setPanel]=useState('shop');const [fail,setFail]=useState(false);
 return <div className="academy-app" style={{minHeight:'100vh',padding:24,display:'flex',gap:12}}><GameButton onClick={()=>setPanel('shop')}>Магазин</GameButton><GameButton onClick={()=>setPanel('profile')}>Профиль</GameButton><label><input type="checkbox" checked={fail} onChange={e=>setFail(e.target.checked)}/>Ошибка сохранения</label>{panel==='shop'&&<PlayerShop user={user} onClose={()=>setPanel('')} onBuy={async id=>{if(fail)throw new Error('Тест: сервер не отвечает');const item=COSMETICS.find(c=>c.id===id)!;setUser(u=>({...u,currency:u.currency-item.cost,inventory:[...u.inventory,id]}));}} onEquip={async id=>{if(fail)throw new Error('Тест: сервер не отвечает');const item=COSMETICS.find(c=>c.id===id)!;setUser(u=>({...u,equipped:{...u.equipped,[item.type]:id}}));}}/>}{panel==='profile'&&<PlayerProfile user={user} courses={COURSES.map((c,i)=>({...c,progress:i===0?25:0}))} completed={14} streak={{currentStreak:2,longestStreak:5,tasksToday:2,lastActiveDate:'',todayDate:''}} currentLevel={3} nextLevelXP={800} progress={25} onClose={()=>setPanel('')} onShop={()=>setPanel('shop')}/>}</div>;
}
createRoot(document.getElementById('root')!).render(<Preview/>);
