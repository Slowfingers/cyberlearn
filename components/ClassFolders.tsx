import React,{useEffect,useState} from 'react';
import { callServer, fbUpdateClassroom } from '../services/firebase';
import type {Classroom,User} from '../types';
export function FolderFilter({value,onChange}:{value:string;onChange:(value:string)=>void}) {
 const [folders,setFolders]=useState<string[]>([]);const [error,setError]=useState('');
 useEffect(()=>{callServer<string[]>('listFolders').then(setFolders).catch(e=>setError(e.message));},[]);
 return <div className="school-folder-controls"><label>Папка<select value={value} onChange={e=>onChange(e.target.value)}><option value="*">Все классы</option><option value="">Без папки</option>{folders.map(f=><option key={f}>{f}</option>)}</select></label>
 <form onSubmit={async e=>{e.preventDefault();const form=e.currentTarget;const name=String(new FormData(form).get('folder')||'');try{setFolders(await callServer<string[]>('createFolder',{name}));onChange(name);form.reset();setError('');}catch(e){setError((e as Error).message);}}}><input name="folder" aria-label="Название новой папки" placeholder="Название папки" maxLength={100} required/><button type="submit" aria-label="Создать папку">＋</button></form>{error&&<p role="alert">{error}</p>}</div>;
}
export function TeacherSupport({classes,current,onUpdated}:{classes:Classroom[];current?:Classroom;onUpdated:(c:Classroom)=>void}) {
 const [requests,setRequests]=useState<User[]>([]);const [folders,setFolders]=useState<string[]>([]);const [error,setError]=useState('');
 useEffect(()=>{let alive=true; const refresh=async()=>{try{const [users,fs]=await Promise.all([callServer<User[]>('listUsers'),callServer<string[]>('listFolders')]);if(alive){setRequests(users.filter(u=>u.helpRequestedAt).sort((a,b)=>a.helpRequestedAt!.localeCompare(b.helpRequestedAt!)));setFolders(fs);setError('');}}catch(e){if(alive)setError('Не удалось обновить запросы помощи.');}};void refresh();const timer=setInterval(refresh,4000);return()=>{alive=false;clearInterval(timer);};},[classes]);
 return <section className="teacher-support">
 {current&&<label>Папка класса<select aria-label="Папка класса" value={current.folder ?? ''} onChange={async e=>{try{const updated={...current,folder:e.target.value};await fbUpdateClassroom(updated);onUpdated(updated);}catch(e){setError((e as Error).message);}}}><option value="">Без папки</option>{[...new Set([...folders,...classes.map(c=>c.folder).filter(Boolean)])].map(f=><option key={f}>{f}</option>)}</select></label>}
 {requests.length>0&&<div role="status"><h3>✋ Нужна помощь: {requests.length}</h3>{requests.map(u=>{const cls=classes.find(c=>c.id===u.classId);return <div className="help-request" key={u.id}><span><strong>{u.name}</strong><small>{cls?.folder ? cls.folder+' · ' : ''}{cls?.name}</small></span><button onClick={async()=>{try{await callServer('resolveHand',{studentId:u.id});setRequests(r=>r.filter(s=>s.id!==u.id));}catch(e){setError((e as Error).message);}}}>Помог</button></div>;})}</div>}
 {error&&<p role="alert">{error}</p>}
 </section>;
}
export function RaiseHand() {
 const [raised,setRaised]=useState(false);const [pending,setPending]=useState(false);const [error,setError]=useState('');
 useEffect(()=>{let alive=true;const refresh=()=>callServer<User>('getUser').then(u=>{if(alive)setRaised(Boolean(u.helpRequestedAt));}).catch(()=>{});void refresh();const timer=setInterval(refresh,4000);return()=>{alive=false;clearInterval(timer);};},[]);
 return <div className="raise-hand"><button disabled={pending} aria-pressed={raised} onClick={async()=>{setPending(true);try{const user=await callServer<User>('raiseHand',{raised:!raised});setRaised(Boolean(user.helpRequestedAt));setError('');}catch(e){setError((e as Error).message);}finally{setPending(false);}}}>{raised?'✋ Жду учителя · отменить':'✋ Поднять руку'}</button>{error&&<span role="alert">{error}</span>}</div>;
}
