import {CPU,avrInstruction,AVRIOPort,portBConfig,portCConfig,portDConfig,AVRTimer,timer0Config,timer1Config,timer2Config,AVRUSART,usart0Config,AVRADC,adcConfig,PinState} from 'avr8js';
import type {CityFrame,CityMission} from './smartCityRuntime';
const HZ=16000000;
export function parseArduinoHex(hex:string){
 if(hex.length>100000)throw new Error('Прошивка слишком большая.');const bytes=new Uint8Array(32768);bytes.fill(255);let base=0,loaded=0,ended=false;
 for(const line of hex.trim().split(/\r?\n/)){if(!/^:[\da-f]+$/i.test(line)||line.length<11||line.length%2!==1)throw new Error('Повреждён формат HEX.');const record=Array.from({length:(line.length-1)/2},(_,i)=>parseInt(line.slice(1+i*2,3+i*2),16));const [length,hi,lo,type]=record;if(record.length!==length+5||record.reduce((a,b)=>a+b,0)%256)throw new Error('Неверная контрольная сумма HEX.');const data=record.slice(4,-1);
  if(type===0){const start=base+(hi<<8)+lo;if(start+length>bytes.length)throw new Error('Прошивка не помещается в Arduino Uno.');bytes.set(data,start);loaded+=length;}
  else if(type===1){ended=true;break;}else if(type===4&&length===2)base=((data[0]<<8)+data[1])*65536;else if(type===2&&length===2)base=((data[0]<<8)+data[1])*16;else if(![3,5].includes(type))throw new Error('Неподдерживаемая запись HEX.');
 }if(!loaded||!ended)throw new Error('Неполная прошивка HEX.');return new Uint16Array(bytes.buffer);
}
/** Executes actual ATmega328P instructions. External HC-SR04 and servo use GPIO edges. */
export class CityAvr {
 readonly cpu:CPU;readonly portB:AVRIOPort;readonly portD:AVRIOPort;readonly portC:AVRIOPort;
 distance=80;angle=0;serial='';private serialDecoder=new TextDecoder();private servoRise=-1;private trace:CityFrame[]=[];private lastSignature='';
 constructor(hex:string,distance=80,private capture=false){
  this.distance=distance;this.cpu=new CPU(parseArduinoHex(hex),2048);this.portB=new AVRIOPort(this.cpu,portBConfig);this.portD=new AVRIOPort(this.cpu,portDConfig);this.portC=new AVRIOPort(this.cpu,portCConfig);
  new AVRTimer(this.cpu,timer0Config);new AVRTimer(this.cpu,timer1Config);new AVRTimer(this.cpu,timer2Config);new AVRADC(this.cpu,adcConfig);
  const serial=new AVRUSART(this.cpu,usart0Config,HZ);serial.onByteTransmit=byte=>{this.serial=(this.serial+this.serialDecoder.decode(new Uint8Array([byte]),{stream:true})).slice(-4096);};
  this.portB.addListener((value,previous)=>{
   // A falling TRIG on D9 emits a real ECHO pulse on D10 after 200us.
   if(previous&2&&!(value&2)&&this.portB.pinState(1)!==PinState.Input){const width=Math.round(Math.max(2,Math.min(400,this.distance))*58*16);this.cpu.addClockEvent(()=>{this.portB.setPin(2,true);this.cpu.addClockEvent(()=>this.portB.setPin(2,false),width);},3200);}
   this.record();
  });
  this.portD.addListener((value,previous)=>{
   if((value&64)&&!(previous&64))this.servoRise=this.cpu.cycles;
   if(!(value&64)&&(previous&64)&&this.servoRise>=0){const us=(this.cpu.cycles-this.servoRise)/16;if(us>=400&&us<=2600)this.angle=Math.max(0,Math.min(180,Math.round((us-544)/1856*180)));this.servoRise=-1;}
   this.record();
  });this.record();
 }
 get milliseconds(){return this.cpu.cycles/16000;}
 get frame():CityFrame {const pins:Record<number,number>={};for(let n=0;n<14;n++)pins[n]=+(n<8?this.portD.pinState(n)===PinState.High:this.portB.pinState(n-8)===PinState.High);return{time:this.milliseconds,duration:0,pins,angle:this.angle,line:0};}
 private record(){if(!this.capture)return;const f=this.frame;const signature=`${f.pins[8]}${f.pins[9]}${f.pins[10]}:${f.angle}`;if(signature!==this.lastSignature){if(this.trace.length>=50000)throw new Error('Слишком частые переключения. Добавь задержку.');this.trace.push(f);this.lastSignature=signature;}}
 advance(milliseconds:number){const end=this.cpu.cycles+Math.max(0,milliseconds)*16000;while(this.cpu.cycles<end){avrInstruction(this.cpu);this.cpu.tick();}}
 finishTrace(){const all=[...this.trace,this.frame];return all.map((f,i)=>({...f,duration:i<all.length-1?all[i+1].time-f.time:0}));}
}
export function assessAvrFrames(mission:CityMission,traces:CityFrame[][]){
 if(mission==='traffic'){
  // Discard microsecond switching gaps, but keep every observable unsafe state.
  const frames=traces[0].filter(f=>f.duration>=50);const states=frames.map(f=>f.pins[8]?'R':f.pins[10]?'G':f.pins[9]?'Y':'-');
  const first=frames.slice(0,3);const checks=[{label:'На каждом этапе горит ровно один сигнал',passed:frames.length>=4&&frames.every(f=>[8,9,10].reduce((n,p)=>n+(f.pins[p]||0),0)===1)},
   {label:'Цикл: красный → зелёный → жёлтый → красный',passed:states.slice(0,4).join('')==='RGYR'},
   {label:'Красный и зелёный: 1–5 с; жёлтый: 0,3–1,5 с',passed:first.length===3&&first.every((f,i)=>states[i]==='Y'?f.duration>=295&&f.duration<=1505:f.duration>=995&&f.duration<=5005)}];return{passed:checks.every(c=>c.passed),checks};
 }
 const correct=(index:number,angle:number)=>{const frames=traces[index].filter(f=>f.time+f.duration>100&&f.duration>0);return frames.length>0&&frames.every(f=>Math.abs(f.angle-angle)<=1);};
 const checks=[{label:'Ближе 40 см: шлагбаум открыт на 90°',passed:correct(0,90)&&correct(1,90)},{label:'От 40 см и дальше: шлагбаум закрыт',passed:correct(2,0)&&correct(3,0)&&correct(4,0)}];return{passed:checks.every(c=>c.passed),checks};
}
