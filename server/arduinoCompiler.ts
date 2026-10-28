import {spawn,execFile} from 'node:child_process';
import {promisify} from 'node:util';
import {createHash,randomUUID} from 'node:crypto';
const IMAGE='cyberlearn-avr:1';const cache=new Map<string,{hex:string;compiler:string}>();let active=0;
export async function compileArduino(code:string):Promise<{hex:string;compiler:string}>{
 if(typeof code!=='string'||!code.trim()||Buffer.byteLength(code)>32768)return Promise.reject(new Error('Программа должна содержать от 1 до 32768 байт.'));
 if(active>=2)throw new Error('Компилятор занят. Повтори запуск через несколько секунд.');
 active++;let image:string;
 try{image=(await promisify(execFile)('docker',['image','inspect','--format','{{.Id}}',IMAGE],{timeout:3000,maxBuffer:10000})).stdout.trim();}catch{active--;throw new Error('Локальный компилятор недоступен. Запусти Docker и npm run setup:arduino-cpp.');}
 const key=createHash('sha256').update(image+'\0'+code).digest('hex');const cached=cache.get(key);if(cached){active--;return cached;}
 return new Promise((resolve,reject)=>{
  const name='cyberlearn-compile-'+randomUUID();let output='',diagnostic='',finished=false;
  const process=spawn('docker',['run','--pull=never','--rm','-i','--name',name,'--network','none','--read-only','--cap-drop','ALL','--security-opt','no-new-privileges','--pids-limit','64','--memory','256m','--cpus','1','--user','65534:65534','--log-driver','none','--tmpfs','/work:rw,nosuid,nodev,noexec,size=16m,mode=1777','--tmpfs','/tmp:rw,nosuid,nodev,noexec,size=8m,mode=1777',IMAGE],{stdio:['pipe','pipe','pipe']});
  const stop=()=>{execFile('docker',['kill',name],{timeout:3000},()=>{});process.kill('SIGKILL');};
  const finish=(error?:Error,value?:{hex:string;compiler:string})=>{if(finished)return;finished=true;clearTimeout(timer);active--;if(error)reject(error);else resolve(value!);};
  const timer=setTimeout(()=>{stop();finish(new Error('Компиляция превысила 25 секунд. Упрости программу и повтори запуск.'));},25000);
  process.on('error',()=>finish(new Error('Локальный компилятор недоступен. Запусти Docker и npm run setup:arduino-cpp.')));
  process.stdout.on('data',chunk=>{output+=chunk;if(output.length>200000){stop();finish(new Error('Слишком большой результат компиляции.'));}});
  process.stderr.on('data',chunk=>{diagnostic=(diagnostic+chunk).slice(-16000);});process.stdin.on('error',()=>{});process.stdin.end(code);
  process.on('close',status=>{
   if(finished)return;
   try{const result=JSON.parse(output);if(status!==0||!result.hex)throw new Error(String(result.error||'Не удалось скомпилировать программу.').replaceAll('/work/','').slice(0,12000));
    if(typeof result.hex!=='string'||result.hex.length>100000||!result.hex.startsWith(':'))throw new Error('Компилятор вернул повреждённую прошивку.');
    const value={hex:result.hex,compiler:'AVR GCC · Arduino Uno / ATmega328P'};cache.set(key,value);if(cache.size>32)cache.delete(cache.keys().next().value!);finish(undefined,value);
   }catch(error){finish(new Error(output?error instanceof Error?error.message:'Ошибка компиляции.':`Компилятор недоступен. Запусти Docker и npm run setup:arduino-cpp.${diagnostic.includes('No such image')?' Образ ещё не установлен.':''}`));}
  });
 });
}
/** Local development only. Production needs a separately isolated compilation service. */
export function arduinoCompilerApi(req:any,res:any,next:any){
 if(req.url?.split('?')[0]!=='/api/arduino/compile')return next();
 res.setHeader('Content-Type','application/json; charset=utf-8');res.setHeader('Cache-Control','no-store');
 const reply=(status:number,body:unknown)=>{res.statusCode=status;res.end(JSON.stringify(body));};
 if(req.method!=='POST')return reply(405,{error:'Используй POST.'});
 let hostname='';try{hostname=new URL('http://'+req.headers.host).hostname;}catch{}
 if(!['localhost','127.0.0.1','[::1]'].includes(hostname))return reply(403,{error:'Используй локальный адрес localhost.'});
 const ip=req.socket.remoteAddress||'';if(!['127.0.0.1','::1','::ffff:127.0.0.1'].includes(ip))return reply(403,{error:'Компиляция пока доступна только на локальном компьютере.'});
 try{if(req.headers.origin&&new URL(req.headers.origin).host!==req.headers.host)return reply(403,{error:'Недопустимый источник запроса.'});}catch{return reply(403,{error:'Недопустимый источник запроса.'});}
 let body='';req.on('data',(chunk:any)=>{body+=chunk;if(Buffer.byteLength(body)>100000)req.destroy();});req.on('end',async()=>{try{const input=JSON.parse(body);const result=await compileArduino(input.code);reply(200,result);}catch(error){reply(400,{error:error instanceof Error?error.message:'Ошибка компиляции.'});}});
}
