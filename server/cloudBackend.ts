import {createHash,randomBytes} from 'node:crypto';
import {dispatchSchool,provisionTeacher,withSchoolSnapshot} from './localBackend';
import {firebaseStore,type CloudStore,type CloudSnapshot} from './firebaseStore';
export async function cloudOperation(store:CloudStore,operation:string,data:Record<string,unknown>,cookie:string,ip:string) {
 const token=operation==='login'?randomBytes(32).toString('hex'):(cookie.match(/(?:^|;\s*)cyberlearn_session=([a-f0-9]{64})/)?.[1] ?? randomBytes(32).toString('hex'));
 for(let attempt=0;attempt<5;attempt++) {
  const {snapshot:stored,etag}=await store.load();
  const original=stored ? JSON.stringify(stored) : undefined;
  const snapshot:CloudSnapshot=stored ?? {state:{version:1,users:{},classes:{},tasks:{},credentials:{}},sessions:{},loginLimits:{}};
  snapshot.loginLimits ??= {};
  let result:unknown=null,error:string|undefined;
  await withSchoolSnapshot(snapshot,token,async()=>{
   if(!stored) {
    const password=process.env.CYBERLEARN_TEACHER_PASSWORD;
    if(!password || password.length<12) throw Error('Для первого запуска задайте CYBERLEARN_TEACHER_PASSWORD длиной от 12 символов в Vercel.');
    await provisionTeacher(process.env.CYBERLEARN_TEACHER_LOGIN ?? 'imyourteacher',password);
   }
   if(operation==='login') {
    const key=createHash('sha256').update(ip).digest('hex'),now=Date.now();
    for(const old of Object.keys(snapshot.loginLimits)) if(snapshot.loginLimits[old].until<=now) delete snapshot.loginLimits[old];
    const limit=snapshot.loginLimits[key] ?? {count:0,until:now+60000};
    if(limit.count>=20) {error='Слишком много попыток. Попробуй через минуту.';return;}
    limit.count++;snapshot.loginLimits[key]=limit;
   }
   try {result=await dispatchSchool(operation,data);} catch(e) {error=e instanceof Error?e.message:'Ошибка сервера';}
  });
  // Conditional writes prevent concurrent requests from losing another pupil's progress.
  if((stored && JSON.stringify(snapshot)===original) || await store.save(snapshot,etag)) return {result,error,token};
 }
 throw Error('Класс сейчас активно сохраняет данные. Попробуй ещё раз.');
}
export async function cloudApi(req:any,res:any) {
 res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');
 if(req.method!=='POST'){res.statusCode=405;res.setHeader('Allow','POST');return res.end(JSON.stringify({error:'Используйте POST.'}));}
 try {
  if(req.headers.origin && new URL(req.headers.origin).host!==req.headers.host) {res.statusCode=403;return res.end(JSON.stringify({error:'Недопустимый источник запроса.'}));}
  const body=typeof req.body==='string'?JSON.parse(req.body):req.body;
  if(!body || typeof body!=='object' || Array.isArray(body) || JSON.stringify(body).length>250000 || typeof body.operation!=='string') {res.statusCode=400;return res.end(JSON.stringify({error:'Неверный запрос.'}));}
  const {operation,...data}=body;
  const ip=String(req.headers['x-forwarded-for'] ?? req.socket?.remoteAddress ?? 'unknown').split(',')[0].trim();
  const answer=await cloudOperation(firebaseStore(),operation,data,req.headers.cookie ?? '',ip);
  if(answer.error){res.statusCode=400;return res.end(JSON.stringify({error:answer.error}));}
  if(operation==='login')res.setHeader('Set-Cookie',`cyberlearn_session=${answer.token}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=43200`);
  if(operation==='logout')res.setHeader('Set-Cookie','cyberlearn_session=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0');
  res.statusCode=200;res.end(JSON.stringify({data:answer.result ?? null}));
 } catch(e) {res.statusCode=503;res.end(JSON.stringify({error:e instanceof Error?e.message:'Сервер временно недоступен.'}));}
}
