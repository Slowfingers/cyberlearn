import assert from 'node:assert/strict';
import {mkdtempSync,writeFileSync,rmSync} from 'node:fs';import {tmpdir} from 'node:os';import {join} from 'node:path';
import {compileArduino} from '../server/arduinoCompiler';
import {CityAvr,assessAvrFrames,parseArduinoHex} from '../utils/arduinoAvr';
import {CITY_SOLUTIONS,CITY_STARTERS} from '../curriculum/smartCity';
const run=(hex:string,distance:number,ms:number)=>{const avr=new CityAvr(hex,distance,true);avr.advance(ms);return{avr,trace:avr.finishTrace()};};
const main=async()=>{
 const traffic=await compileArduino(CITY_SOLUTIONS.traffic);assert.equal(assessAvrFrames('traffic',[run(traffic.hex,80,13000).trace]).passed,true);
 const broken=await compileArduino(CITY_STARTERS.traffic);assert.equal(assessAvrFrames('traffic',[run(broken.hex,80,13000).trace]).passed,false);
 const gate=await compileArduino(CITY_SOLUTIONS.gate);assert.equal(assessAvrFrames('gate',[15,39,40,65,120].map(d=>run(gate.hex,d,350).trace)).passed,true);
 const reversed=await compileArduino(CITY_SOLUTIONS.gate.replace('< 40','<= 40'));assert.equal(assessAvrFrames('gate',[15,39,40,65,120].map(d=>run(reversed.hex,d,350).trace)).passed,false);
 const advanced=await compileArduino(`const byte pins[]={8,10,9}; const int waits[]={2000,2000,800};
void phase(byte pin,int ms){digitalWrite(pin,HIGH);delay(ms);digitalWrite(pin,LOW);}
void setup(){Serial.begin(9600);for(byte i=0;i<3;i++){pinMode(pins[i],OUTPUT);}}
void loop(){for(byte i=0;i<3;i++){phase(pins[i],waits[i]);}Serial.println("Цикл завершён");}`);
 const actual=run(advanced.hex,80,13000);assert.equal(assessAvrFrames('traffic',[actual.trace]).passed,true);assert.ok(actual.avr.serial.includes('Цикл завершён'),'UART executes real Serial code');
 const counter=await compileArduino('int count=0;void setup(){Serial.begin(9600);}void loop(){Serial.println(++count);delay(10);}');assert.match(run(counter.hex,80,100).avr.serial,/3/,'global state continues beyond two cycles');
 await assert.rejects(compileArduino('void setup() {} void loop(){ mystery(1); }'),/sketch\.ino:1|mystery/);
 const fixture=mkdtempSync(join(tmpdir(),'cyberlearn-compiler-host-'));const privateHeader=join(fixture,'private.h');writeFileSync(privateHeader,'const int secret = 123;');
 try{await assert.rejects(compileArduino(`#include "${privateHeader}"\nvoid setup(){} void loop(){delay(secret);}`),/No such file|fatal error/);}finally{rmSync(fixture,{recursive:true});}
 assert.throws(()=>parseArduinoHex(':00000001FE'),/сумма/);await assert.rejects(compileArduino('x'.repeat(33000)),/32768/);
 console.log('Arduino C++: genuine GCC/HEX, timers/GPIO, Servo/HC-SR04 at five distances, arrays/functions/for, UART, persistent globals, diagnostics and host filesystem isolation OK');
};await main();
