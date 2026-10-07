import assert from 'node:assert/strict';
import {observeServer, sessionChanged} from '../services/localServer';

const originalFetch=globalThis.fetch;
let tick:()=>void, cleared=false, calls=0, offline=false;
let user:unknown={id:'student_test',role:'student',name:'Тест'};
const win=new EventTarget() as any;
win.setInterval=(callback:()=>void,ms:number)=>{assert.equal(ms,3000);tick=callback;return 1;};
win.clearInterval=()=>{cleared=true;};
const doc=new EventTarget() as any;doc.visibilityState='visible';
Object.assign(globalThis,{window:win,document:doc});
globalThis.fetch=async()=>{calls++;if(offline)throw Error('offline');return new Response(JSON.stringify({data:user}),{headers:{'Content-Type':'application/json'}});};
const observed:unknown[]=[];
const flush=()=>new Promise<void>(resolve=>setImmediate(resolve));
try {
 const stop=observeServer(u=>observed.push(u));await flush();
 assert.equal(observed.length,1);
 tick!();await flush();assert.equal(observed.length,1,'Неизменная сессия не сбрасывает выбранный класс учителя');
 offline=true;tick!();await flush();assert.equal(observed.length,1,'Сбой сети не завершает работающий сеанс');
 offline=false;user=null;tick!();await flush();assert.equal(observed.at(-1),null,'Отзыв сессии выводит ученика');
 user={id:'student_returned',role:'student'};sessionChanged();await flush();assert.equal((observed.at(-1) as any).id,'student_returned');
 user=null;win.dispatchEvent(new Event('focus'));await flush();assert.equal(observed.at(-1),null);
 stop();assert.ok(cleared);const before=calls;sessionChanged();tick!();await flush();assert.equal(calls,before);
 console.log('sessionObserver.check: revocation polling, focus refresh, unchanged sessions, transient network errors and cleanup passed.');
} finally {globalThis.fetch=originalFetch;delete (globalThis as any).window;delete (globalThis as any).document;}
