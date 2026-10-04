import type { User } from '../types';
export async function serverCall<T>(operation:string,data:Record<string,unknown>={}):Promise<T> {
 const response=await fetch('/api/local',{method:'POST',credentials:'same-origin',headers:{'Content-Type':'application/json'},body:JSON.stringify({operation,...data})});
 const result=await response.json();
 if(!response.ok) throw new Error(result.error || 'Не удалось связаться с сервером.');
 return result.data;
}
export function observeServer(callback:(user:User|null,error?:unknown)=>void) {
 let cancelled=false;
 const refresh=()=>serverCall<User>('getUser').then(user=>{if(!cancelled)callback(user);}).catch(()=>{if(!cancelled)callback(null);});
 void refresh(); window.addEventListener('cyberlearn-session',refresh);
 return ()=>{cancelled=true;window.removeEventListener('cyberlearn-session',refresh);};
}
export function sessionChanged(){window.dispatchEvent(new Event('cyberlearn-session'));}
