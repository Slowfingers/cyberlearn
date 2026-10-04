import {createSign} from 'node:crypto';
import type {SchoolSnapshot} from './localBackend';
export interface CloudSnapshot extends SchoolSnapshot {
 loginLimits: Record<string,{count:number;until:number}>;
}
interface ServiceAccount {client_email:string;private_key:string;project_id:string}
let cachedToken:{value:string;expires:number}|undefined;
let lockedRulesUntil=0;
function account():ServiceAccount {
 const raw=process.env.FIREBASE_SERVICE_ACCOUNT;
 if(!raw) throw Error('Не настроен сервер входа: добавьте FIREBASE_SERVICE_ACCOUNT в переменные Vercel.');
 try {
  const value=JSON.parse(raw);
  if(!value.client_email || !value.private_key || !value.project_id) throw Error();
  return value;
 } catch {throw Error('Неверная конфигурация серверного доступа Firebase.');}
}
async function accessToken():Promise<string> {
 if(cachedToken && cachedToken.expires>Date.now()+60000) return cachedToken.value;
 const service=account(), now=Math.floor(Date.now()/1000);
 const encode=(value:unknown)=>Buffer.from(JSON.stringify(value)).toString('base64url');
 const unsigned=encode({alg:'RS256',typ:'JWT'})+'.'+encode({iss:service.client_email,scope:'https://www.googleapis.com/auth/firebase.database https://www.googleapis.com/auth/userinfo.email',aud:'https://oauth2.googleapis.com/token',iat:now,exp:now+3600});
 const signature=createSign('RSA-SHA256').update(unsigned).sign(service.private_key).toString('base64url');
 const response=await fetch('https://oauth2.googleapis.com/token',{method:'POST',headers:{'Content-Type':'application/x-www-form-urlencoded'},body:new URLSearchParams({grant_type:'urn:ietf:params:oauth:grant-type:jwt-bearer',assertion:unsigned+'.'+signature}),signal:AbortSignal.timeout(10000)});
 if(!response.ok) throw Error('Серверу не удалось авторизоваться в Firebase. Проверьте серверные настройки.');
 const result=await response.json();
 if(typeof result.access_token!=='string') throw Error('Firebase не предоставил серверный доступ.');
 cachedToken={value:result.access_token,expires:Date.now()+Number(result.expires_in ?? 3600)*1000};
 return cachedToken.value;
}
function endpoint() {
 const url=new URL(process.env.CYBERLEARN_DATABASE_URL ?? 'https://cyberlearn-12348-default-rtdb.europe-west1.firebasedatabase.app');
 if(url.protocol!=='https:' || !/(\.firebasedatabase\.app|\.firebaseio\.com)$/.test(url.hostname) || url.username || url.password) throw Error('Неверный адрес Firebase.');
 return url.origin+'/schoolServerV1.json';
}
async function assertPrivateRules(url:string) {
 if(lockedRulesUntil>Date.now()) return;
 const probe=await fetch(url+'?shallow=true',{signal:AbortSignal.timeout(10000)});
 if(probe.status!==401 && probe.status!==403) throw Error('Хранилище Firebase открыто для браузера. Сначала примените закрытые database.rules.json.');
 lockedRulesUntil=Date.now()+60000;
}
export interface CloudStore {
 load():Promise<{snapshot:CloudSnapshot|null;etag:string}>;
 save(snapshot:CloudSnapshot,etag:string):Promise<boolean>;
}
export function firebaseStore():CloudStore {
 const url=endpoint();
 return {
  async load() {
   await assertPrivateRules(url);
   const response=await fetch(url,{headers:{Authorization:'Bearer '+await accessToken(),'X-Firebase-ETag':'true'},signal:AbortSignal.timeout(10000)});
   if(!response.ok) throw Error('Не удалось прочитать данные классов в Firebase.');
   const etag=response.headers.get('etag');
   if(!etag) throw Error('Хранилище не подтвердило версию данных.');
   // The envelope preserves empty arrays and empty dictionaries which RTDB otherwise drops.
   const value=await response.json();
   return {snapshot:value?.payload ? JSON.parse(value.payload) : null,etag};
  },
  async save(snapshot,etag) {
   const response=await fetch(url,{method:'PUT',headers:{Authorization:'Bearer '+await accessToken(),'Content-Type':'application/json','if-match':etag},body:JSON.stringify({payload:JSON.stringify(snapshot)}),signal:AbortSignal.timeout(10000)});
   if(response.status===412) return false;
   if(!response.ok) throw Error('Не удалось сохранить данные классов в Firebase.');
   return true;
  },
 };
}
export async function readLegacyFirebase():Promise<{users:Record<string,unknown>;classrooms:Record<string,unknown>;tasks:Record<string,unknown>}> {
 const base=new URL(endpoint()).origin;
 const headers={Authorization:'Bearer '+await accessToken()};
 const nodes=['users','classrooms','tasks'] as const;
 const values=await Promise.all(nodes.map(async node=>{
  const response=await fetch(`${base}/${node}.json`,{headers,signal:AbortSignal.timeout(10000)});
  if(!response.ok)throw Error(`Не удалось прочитать старый раздел ${node}.`);
  return await response.json() ?? {};
 }));
 return Object.fromEntries(nodes.map((node,i)=>[node,values[i]])) as any;
}
