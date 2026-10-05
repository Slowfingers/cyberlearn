import type { User } from '../types';
export async function serverCall<T>(operation:string,data:Record<string,unknown>={}):Promise<T> {
 const response=await fetch('/api/local',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({operation,...data})});
 if(response.status===404 || !response.headers.get('content-type')?.includes('application/json')) {
  throw new Error('Сервер входа недоступен. На опубликованном сайте ещё не подключён сервер классов. Для локальной проверки откройте http://127.0.0.1:3000/.');
 }
 const result=await response.json();
 if(!response.ok) throw new Error(result.error || 'Не удалось связаться с сервером.');
 return result.data;
}
export function observeServer(callback:(user:User|null,error?:unknown)=>void) {
 let cancelled=false, pending=false, previous:string|undefined;
 const refresh=async()=>{
  if(cancelled || pending)return;
  pending=true;
  try {
   const user=await serverCall<User|null>('getUser'), serialized=JSON.stringify(user);
   if(!cancelled && serialized!==previous){previous=serialized;callback(user);}
  } catch(error) {if(!cancelled && previous===undefined)callback(null,error);}
  finally {pending=false;}
 };
 const onVisible=()=>{if(document.visibilityState==='visible')void refresh();};
 void refresh(); const timer=window.setInterval(refresh,15000);
 window.addEventListener('cyberlearn-session',refresh);window.addEventListener('focus',refresh);document.addEventListener('visibilitychange',onVisible);
 return ()=>{cancelled=true;window.clearInterval(timer);window.removeEventListener('cyberlearn-session',refresh);window.removeEventListener('focus',refresh);document.removeEventListener('visibilitychange',onVisible);};
}
export function sessionChanged(){window.dispatchEvent(new Event('cyberlearn-session'));}
