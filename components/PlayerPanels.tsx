import React, {lazy, Suspense, useState} from 'react';
import {Coins, Lock, Check, Bot} from 'lucide-react';
import {GameButton, GameDialog} from './GameUI';
import ShopAvatar, {STREET_AVATARS} from './ShopAvatar';
import {COSMETICS, SHOP_COSMETICS, ACHIEVEMENTS} from '../constants';
import type {User} from '../types';
import type {StreakData} from '../services/mockBackend';
const Mentor=lazy(()=>import('./BigCharacter3D').then(m=>({default:m.BigCharacter3D})));
const categories=[['avatar','Герои'],['avatarFrame','Рамки'],['mascotSkin','Наставники'],['droneColor','Дрон']] as const;
export function PlayerShop({user,onClose,onBuy,onEquip}: {user:User;onClose:()=>void;onBuy:(id:string)=>Promise<void>;onEquip:(id:string)=>Promise<void>}) {
 const [category,setCategory]=useState<typeof categories[number][0]>('avatar');
 const [pending,setPending]=useState<string|null>(null);
 const [error,setError]=useState('');
 async function act(id:string,owned:boolean){if(pending)return;setPending(id);setError('');try{await (owned?onEquip(id):onBuy(id));}catch(e){setError(e instanceof Error?e.message:'Не удалось сохранить. Попробуй ещё раз.');}finally{setPending(null);}}
 const avatar=COSMETICS.find(c=>c.id===user.equipped.avatar)?.value||'2';
 return <GameDialog size="wide" title="Магазин открытий" onClose={onClose} headerExtra={<span className="ui-wallet" aria-label={`${user.currency} монет`}><Coins size={18}/>{user.currency}</span>}>
  <div className="player-shop">
   <nav className="ui-category-nav" aria-label="Категории магазина">{categories.map(([type,label])=><GameButton size="compact" key={type} aria-pressed={category===type} onClick={()=>{setCategory(type);setError('');}}>{label}</GameButton>)}</nav>
   <p className="ui-shop-intro">{category==='avatar'?'Выбери героя для своей базы.':category==='mascotSkin'?'Выбери помощника для уроков.':category==='avatarFrame'?'Добавь рамку своему герою.':'Выбери цвет своего дрона.'} Покупки — за монеты, заработанные в уроках.</p>
   {error&&<p role="alert" className="ui-panel-message">{error}</p>}
   <div className="ui-shop-catalog">{SHOP_COSMETICS.filter(item=>item.type===category).map(item=>{
    const street=STREET_AVATARS.find(a=>a.value===item.value);
    const owned=user.inventory.includes(item.id);
    const equipped=user.equipped[item.type as keyof User['equipped']]===item.id;
    const locked=user.level<item.unlockLevel;
    const shortage=Math.max(0,item.cost-user.currency);
    return <article key={item.id} data-cosmetic-id={item.id} className="ui-shop-card" data-equipped={equipped}>
     <div className="ui-item-status">{equipped?<span><Check size={14}/>Выбрано</span>:owned?<span>В коллекции</span>:locked?<span><Lock size={14}/>Уровень {item.unlockLevel}</span>:<span><Coins size={14}/>{item.cost}</span>}</div>
     <div className="ui-item-preview">{item.type==='avatar'||item.type==='avatarFrame'?<ShopAvatar avatarId={item.type==='avatar'?item.value:avatar} frameId={item.type==='avatarFrame'?item.id:user.equipped.avatarFrame} scale={street?3:2} fullBody={!!street} stage={item.type==='avatar'&&!!street}/>:item.type==='mascotSkin'?<div className="mentor-shop-stage"><Suspense fallback={<Bot size={30}/>}><Mentor skin={item.value} mood="happy" gesture="idle"/></Suspense></div>:<span className="ui-drone-swatch" style={{backgroundColor:item.value}}/>}</div>
     <h3>{item.name}</h3><p className="ui-item-description">{street?street.role:item.type==='avatarFrame'?'Рамка профиля':item.type==='mascotSkin'?'Помощник в уроках':'Цвет дрона'}</p>
     <GameButton variant={owned||equipped?'secondary':'primary'} disabled={!!pending||equipped||(!owned&&(locked||shortage>0))} onClick={()=>act(item.id,owned)}>{pending===item.id?'Сохраняем…':equipped?'Выбрано':owned?(item.type==='avatarFrame'&&item.id==='frame_none'?'Снять рамку':'Выбрать'):locked?`С уровня ${item.unlockLevel}`:shortage>0?`Не хватает ${shortage}`:<><Coins size={16}/>Купить за {item.cost}</>}</GameButton>
    </article>;
   })}</div>
  </div>
 </GameDialog>;
}
export function PlayerProfile({user,courses,completed,streak,currentLevel,nextLevelXP,progress,onClose,onShop}: {user:User;courses:{id:string;title:string;status:string;progress:number}[];completed:number;streak:StreakData;currentLevel:number;nextLevelXP:number;progress:number;onClose:()=>void;onShop:()=>void}) {
 const unlocked=ACHIEVEMENTS.filter(a=>user.achievements.includes(a.id));
 return <GameDialog size="wide" title="Мой профиль" onClose={onClose}><div className="ui-profile">
  <section className="ui-profile-hero"><ShopAvatar avatarId={COSMETICS.find(c=>c.id===user.equipped.avatar)?.value||'2'} frameId={user.equipped.avatarFrame} scale={2}/><h3>{user.name}</h3><span>Уровень {currentLevel}</span><GameButton onClick={onShop}>Изменить героя</GameButton></section>
  <div className="ui-profile-details"><dl className="ui-profile-stats">{[[user.xp,'Опыта'],[user.currency,'Монет'],[completed,'Заданий'],[streak.currentStreak,'Дней подряд'],[streak.longestStreak,'Рекорд дней'],[streak.tasksToday,'Сегодня']].map(([value,label])=><div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
   <section className="ui-profile-section"><h3>До уровня {currentLevel+1}</h3><p>{user.xp} / {nextLevelXP} опыта</p><div className="ui-progress" role="progressbar" aria-label="Опыт до нового уровня" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)}><i style={{width:`${progress}%`}}/></div></section>
   <section className="ui-profile-section"><h3>Мои курсы</h3>{courses.filter(c=>c.status==='active').map(c=><div className="ui-course-progress" key={c.id}><span>{c.title}</span><strong>{c.progress}%</strong><div className="ui-progress"><i style={{width:`${c.progress}%`}}/></div></div>)}</section>
   <section className="ui-profile-section"><h3>Достижения · {unlocked.length}/{ACHIEVEMENTS.length}</h3>{!unlocked.length&&<p>Пока нет наград. Проходи задания — и здесь появятся твои достижения.</p>}<div className="ui-achievement-grid">{unlocked.map(a=><div key={a.id}><span aria-hidden="true">{a.icon}</span><h4>{a.title}</h4><p>{a.description}</p></div>)}{ACHIEVEMENTS.filter(a=>!user.achievements.includes(a.id)).slice(0,4).map(a=><div key={a.id} data-locked="true"><Lock size={18}/><h4>Ещё впереди</h4><p>{a.description}</p></div>)}</div></section>
  </div>
 </div></GameDialog>;
}
