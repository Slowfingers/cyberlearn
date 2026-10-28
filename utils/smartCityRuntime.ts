/** Small, bounded Arduino teaching language. No eval, host access, or pretend compilation. */
export type CityMission = 'traffic' | 'gate';
export interface CityFrame {time:number;duration:number;pins:Record<number,number>;angle:number;line:number}
type Token={text:string;line:number};
type Expr={kind:'number';value:number}|{kind:'name';name:string}|{kind:'unary';op:string;right:Expr}|{kind:'binary';op:string;left:Expr;right:Expr}|{kind:'call';name:string;args:Expr[];line:number};
type Statement={kind:'declare';name:string;value:Expr;line:number;constant:boolean}|{kind:'assign';name:string;value:Expr;line:number}|{kind:'servo';name:string;line:number}|{kind:'call';expr:Expr;line:number}|{kind:'if';condition:Expr;yes:Statement[];no:Statement[];line:number};
export class CityCodeError extends Error {constructor(message:string,public line:number){super(`Строка ${line}: ${message}`);}}
function tokens(source:string):Token[]{
 if(source.length>12000)throw new CityCodeError('программа слишком длинная.',1);
 const result:Token[]=[];let at=0,line=1;
 while(at<source.length){
  const rest=source.slice(at);const skip=/^(?:\s+|\/\/[^\n]*|\/\*[\s\S]*?\*\/|#include\s*<Servo\.h>)/.exec(rest);
  if(skip){line+=(skip[0].match(/\n/g)||[]).length;at+=skip[0].length;continue;}
  const match=/^(?:\d+(?:\.\d+)?|[A-Za-z_]\w*|==|!=|<=|>=|&&|\|\||[{}();,.=+*/!<>-])/.exec(rest);
  if(!match)throw new CityCodeError(`непонятный символ «${rest[0]}».`,line);
  result.push({text:match[0],line});at+=match[0].length;
  if(result.length>2500)throw new CityCodeError('слишком много команд.',line);
 }
 result.push({text:'<end>',line});return result;
}
const precedence:Record<string,number>={'||':1,'&&':2,'==':3,'!=':3,'<':4,'>':4,'<=':4,'>=':4,'+':5,'-':5,'*':6,'/':6};
class Parser {
 private at=0;private depth=0;private blocks=0;private list:Token[];
 constructor(source:string){this.list=tokens(source);}
 peek(){return this.list[this.at];}
 take(text?:string){const t=this.peek();if(text&&t.text!==text)throw new CityCodeError(`ожидается «${text}», найдено «${t.text}».`,t.line);this.at++;return t;}
 name(){const t=this.take();if(!/^[A-Za-z_]\w*$/.test(t.text))throw new CityCodeError('нужно имя переменной.',t.line);return t.text;}
 expr(min=0):Expr{
  if(++this.depth>60)throw new CityCodeError('слишком глубокое выражение.',this.peek().line);
  let left:Expr;const t=this.peek();
  if(['!','-','+'].includes(t.text)){this.take();left={kind:'unary',op:t.text,right:this.expr(7)};}
  else if(t.text==='('){this.take();left=this.expr();this.take(')');}
  else if(/^\d/.test(t.text)){this.take();left={kind:'number',value:Number(t.text)};}
  else {let name=this.name();if(this.peek().text==='.'){this.take();name+='.'+this.name();}
   if(this.peek().text==='('){this.take();const args:Expr[]=[];if(this.peek().text!==')'){do{args.push(this.expr());if(this.peek().text!==',')break;this.take(',');}while(true);}this.take(')');left={kind:'call',name,args,line:t.line};}
   else left={kind:'name',name};
  }
  while((precedence[this.peek().text]??-1)>=min){const op=this.take().text;left={kind:'binary',op,left,right:this.expr(precedence[op]+1)};}
  this.depth--;return left;
 }
 block():Statement[]{if(++this.blocks>40)throw new CityCodeError('слишком много вложенных условий.',this.peek().line);this.take('{');const body:Statement[]=[];while(this.peek().text!=='}'){if(this.peek().text==='<end>')throw new CityCodeError('не хватает закрывающей скобки }.',this.peek().line);body.push(this.statement());}this.take('}');this.blocks--;return body;}
 statement():Statement{
  const t=this.peek();if(t.text==='if'){this.take();this.take('(');const condition=this.expr();this.take(')');const yes=this.peek().text==='{'?this.block():[this.statement()];let no:Statement[]=[];if(this.peek().text==='else'){this.take();no=this.peek().text==='{'?this.block():[this.statement()];}return{kind:'if',condition,yes,no,line:t.line};}
  if(['int','float','bool','const'].includes(t.text)){this.take();if(t.text==='const'){if(!['int','float','bool'].includes(this.peek().text))throw new CityCodeError('после const укажи int, float или bool.',t.line);this.take();}const name=this.name();let value:Expr={kind:'number',value:0};if(this.peek().text==='='){this.take();value=this.expr();}this.take(';');return{kind:'declare',name,value,line:t.line,constant:t.text==='const'};}
  if(t.text==='Servo'){this.take();const name=this.name();this.take(';');return{kind:'servo',name,line:t.line};}
  if(this.list[this.at+1]?.text==='='){const name=this.name();this.take('=');const value=this.expr();this.take(';');return{kind:'assign',name,value,line:t.line};}
  const expr=this.expr();if(expr.kind!=='call')throw new CityCodeError('ожидается команда с круглыми скобками.',t.line);this.take(';');return{kind:'call',expr,line:t.line};
 }
 parse(){const globals:Statement[]=[];let setup:Statement[]|undefined,loop:Statement[]|undefined;
  while(this.peek().text!=='<end>'){if(this.peek().text==='void'){this.take();const name=this.name();this.take('(');this.take(')');const body=this.block();if(name==='setup'&&!setup)setup=body;else if(name==='loop'&&!loop)loop=body;else throw new CityCodeError('нужны только одна setup() и одна loop().',this.peek().line);}else globals.push(this.statement());}
  if(!setup||!loop)throw new CityCodeError('добавь void setup() и void loop().',1);return{globals,setup,loop};
 }
}
export function simulateCity(source:string,distance=80,cycles=2):CityFrame[]{
 const program=new Parser(source).parse();const globals:Record<string,number>={HIGH:1,LOW:0,OUTPUT:1,INPUT:0,true:1,false:0};const modes:Record<number,number>={},pins:Record<number,number>={},servos:Record<string,number>={};let angle=0,time=0,steps=0,lastLine=1;
 const immutable=new WeakMap<Record<string,number>,Set<string>>();immutable.set(globals,new Set(Object.keys(globals)));
 const frames:CityFrame[]=[];const fail=(message:string)=>{throw new CityCodeError(message,lastLine);};
 const number=(v:number)=>{if(!Number.isFinite(v)||Math.abs(v)>1e9)fail('число вне допустимого диапазона.');return v;};
 const evaluate=(e:Expr,env:Record<string,number>):number=>{
  if(++steps>5000)fail('слишком много действий.');
  if(e.kind==='number')return e.value;
  if(e.kind==='name'){if(!Object.hasOwn(env,e.name)&&!Object.hasOwn(globals,e.name))fail(`неизвестное имя ${e.name}.`);return Object.hasOwn(env,e.name)?env[e.name]:globals[e.name];}
  if(e.kind==='unary'){const v=evaluate(e.right,env);return e.op==='!'?Number(!v):e.op==='-'?-v:v;}
  if(e.kind==='binary'){const a=evaluate(e.left,env);if(e.op==='&&'&&!a)return 0;if(e.op==='||'&&a)return 1;const b=evaluate(e.right,env);switch(e.op){case'+':return number(a+b);case'-':return number(a-b);case'*':return number(a*b);case'/':return number(a/b);case'<':return +(a<b);case'>':return +(a>b);case'<=':return +(a<=b);case'>=':return +(a>=b);case'==':return +(a===b);case'!=':return +(a!==b);case'&&':return +!!b;case'||':return +!!b;}return 0;}
  lastLine=e.line;const args=e.args.map(a=>evaluate(a,env));const count=(n:number)=>{if(args.length!==n)fail(`${e.name}(): нужно аргументов — ${n}.`);};
  const pin=(v:number)=>{if(!Number.isInteger(v)||v<0||v>13)fail('номер цифрового вывода должен быть от 0 до 13.');return v;};
  if(e.name==='readDistance'){count(0);return Math.max(0,Math.min(200,distance));}
  if(e.name==='pinMode'){count(2);if(![0,1].includes(args[1]))fail('режим вывода: INPUT или OUTPUT.');modes[pin(args[0])]=args[1];return 0;}
  if(e.name==='digitalWrite'){count(2);const p=pin(args[0]);if(modes[p]!==1)fail(`сначала настрой вывод ${p}: pinMode(${p}, OUTPUT).`);if(![0,1].includes(args[1]))fail('digitalWrite принимает HIGH или LOW.');pins[p]=args[1];return 0;}
  if(e.name==='delay'){count(1);if(args[0]<1||args[0]>10000)fail('delay: задержка от 1 до 10000 мс.');frames.push({time,duration:args[0],pins:{...pins},angle,line:e.line});time+=args[0];if(time>180000)fail('цикл получился слишком долгим.');return 0;}
  const [object,method]=e.name.split('.');if(Object.hasOwn(servos,object)){
   count(1);if(method==='attach'){servos[object]=pin(args[0]);return 0;}if(method==='write'){if(servos[object]<0)fail(`сначала вызови ${object}.attach(6).`);if(args[0]<0||args[0]>180)fail('угол сервопривода — от 0 до 180°.');if(servos[object]===6)angle=args[0];return 0;}
  }
  fail(`команда ${e.name} не поддерживается в этой мастерской.`);return 0;
 };
 const execute=(body:Statement[],env:Record<string,number>,depth=0)=>{
  if(depth>40)fail('слишком много вложенных условий.');
  for(const s of body){lastLine=s.line;if(++steps>5000)fail('слишком много команд.');
   if(s.kind==='servo'){servos[s.name]=-1;continue;}if(s.kind==='declare'){if(Object.hasOwn(env,s.name))fail(`имя ${s.name} уже объявлено.`);env[s.name]=evaluate(s.value,env);if(s.constant){if(!immutable.has(env))immutable.set(env,new Set());immutable.get(env)!.add(s.name);}continue;}
   if(s.kind==='assign'){if(!Object.hasOwn(env,s.name)&&!Object.hasOwn(globals,s.name)||['HIGH','LOW','OUTPUT','INPUT','true','false'].includes(s.name))fail(`нельзя изменить ${s.name}.`);const owner=Object.hasOwn(env,s.name)?env:globals;if(immutable.get(owner)?.has(s.name))fail(`константу ${s.name} нельзя изменить.`);owner[s.name]=evaluate(s.value,env);continue;}
   if(s.kind==='call')evaluate(s.expr,env);else if(s.kind==='if')execute(evaluate(s.condition,env)?s.yes:s.no,env,depth+1);
  }
 };
 execute(program.globals,globals);execute(program.setup,{});for(let i=0;i<Math.min(4,Math.max(1,cycles));i++)execute(program.loop,{});
 frames.push({time,duration:0,pins:{...pins},angle,line:lastLine});return frames;
}
export const CITY_PINS=['5V','GND','D6','D8','D9','D10'] as const;
export type CityWires=Record<string,string>;
export const CITY_CONNECTIONS:Record<CityMission,{id:string;label:string;pin:string;color:string}[]>={
 traffic:[{id:'red',label:'Красный · R',pin:'D8',color:'#ff6c82'},{id:'yellow',label:'Жёлтый · Y',pin:'D9',color:'#ffd267'},{id:'green',label:'Зелёный · G',pin:'D10',color:'#54efba'},{id:'ground',label:'Общий · GND',pin:'GND',color:'#a9bbd6'}],
 gate:[{id:'servoSignal',label:'Сервопривод · сигнал',pin:'D6',color:'#ffd267'},{id:'servoPower',label:'Сервопривод · питание',pin:'5V',color:'#ff6c82'},{id:'servoGround',label:'Сервопривод · GND',pin:'GND',color:'#a9bbd6'},{id:'sensorTrig',label:'Датчик · TRIG',pin:'D9',color:'#7aa7ff'},{id:'sensorEcho',label:'Датчик · ECHO',pin:'D10',color:'#54efba'},{id:'sensorPower',label:'Датчик · питание',pin:'5V',color:'#ff6c82'},{id:'sensorGround',label:'Датчик · GND',pin:'GND',color:'#a9bbd6'}]
};
export function checkCityWires(mission:CityMission,wires:CityWires):string[]{return CITY_CONNECTIONS[mission].filter(p=>wires[p.id]!==p.pin).map(p=>`${p.label} → ${p.pin}`);}
export function checkCityProgram(mission:CityMission,source:string):{passed:boolean;checks:{label:string;passed:boolean}[]}{
 if(mission==='traffic'){
  const frames=simulateCity(source,80,2).filter(f=>f.duration>0);const signals=frames.map(f=>[f.pins[8]||0,f.pins[9]||0,f.pins[10]||0]);
  const one=signals.every(s=>s.reduce((a,b)=>a+b,0)===1);const states=signals.map(s=>s[0]?'R':s[2]?'G':s[1]?'Y':'-');const sequence=states.filter((s,i)=>s!==states[i-1]);
  const checks=[{label:'На каждом этапе горит ровно один сигнал',passed:one},{label:'Цикл: красный → зелёный → жёлтый → красный',passed:sequence.slice(0,4).join('')==='RGYR'},{label:'Красный и зелёный: 1–5 с; жёлтый: 0,3–1,5 с',passed:frames.every((f,i)=>states[i]==='Y'?f.duration>=300&&f.duration<=1500:f.duration>=1000&&f.duration<=5000)}];return{passed:checks.every(c=>c.passed),checks};
 }
 const near=[15,39].every(d=>simulateCity(source,d,2).every(f=>f.angle===90));
 const far=[40,65,120].every(d=>simulateCity(source,d,2).every(f=>f.angle===0));
 const checks=[{label:'Ближе 40 см: шлагбаум открыт на 90°',passed:near},{label:'От 40 см и дальше: шлагбаум закрыт',passed:far}];return{passed:checks.every(c=>c.passed),checks};
}
