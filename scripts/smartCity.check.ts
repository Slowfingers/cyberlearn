import assert from 'node:assert/strict';
import {advanceCityCar,CITY_TRAFFIC_LANES,CITY_CAR_SPEED} from '../utils/cityTraffic';
import {simulateCity,checkCityProgram,checkCityWires,CITY_CONNECTIONS,CityCodeError} from '../utils/smartCityRuntime';
import {CITY_STARTERS,CITY_SOLUTIONS,SMART_CITY_TASKS} from '../curriculum/smartCity';
for(const mission of ['traffic','gate'] as const){
 assert.equal(checkCityProgram(mission,CITY_STARTERS[mission]).passed,false,`${mission}: starter needs repair`);
 assert.equal(checkCityProgram(mission,CITY_SOLUTIONS[mission]).passed,true,`${mission}: semantic solution`);
 assert.ok(checkCityWires(mission,{}).length>0);
 const wires=Object.fromEntries(CITY_CONNECTIONS[mission].map(c=>[c.id,c.pin]));assert.deepEqual(checkCityWires(mission,wires),[]);wires[CITY_CONNECTIONS[mission][0].id]='D10';assert.equal(checkCityWires(mission,wires).length,1);
}
assert.equal(checkCityProgram('traffic',CITY_SOLUTIONS.traffic.replaceAll('delay(2000)','delay(200)')).passed,false,'timing matters');
assert.equal(checkCityProgram('traffic',CITY_SOLUTIONS.traffic.replace('digitalWrite(8, LOW);','digitalWrite(8, HIGH);')).passed,false,'overlapping red and green are unsafe');
assert.equal(checkCityProgram('gate',CITY_SOLUTIONS.gate.replace('< 40','<= 40')).passed,false,'test exact threshold');
assert.equal(checkCityProgram('gate',CITY_SOLUTIONS.gate.replace('< 40','> 40')).passed,false,'test both branches');
assert.equal(checkCityProgram('gate',CITY_SOLUTIONS.gate.replace('int distance = readDistance();','int distance = 10;')).passed,false,'constant fake sensor fails');
assert.equal(simulateCity(CITY_SOLUTIONS.gate,20).at(-1)?.angle,90);assert.equal(simulateCity(CITY_SOLUTIONS.gate,80).at(-1)?.angle,0);
for(const source of ['void setup() {} void loop(){ while(true){} }','void setup() {} void loop(){ alert(1); }','void setup() {} void loop(){ delay(1000000); }','void setup() {} void loop(){ digitalWrite(8,HIGH); }','void setup() {} void loop(){ delay(5/0); }','void setup() {} void loop(){ if (1) { delay(10); }'])assert.throws(()=>simulateCity(source),CityCodeError);
assert.equal(checkCityProgram('gate',CITY_SOLUTIONS.gate.replace('write(90)','write(85)')).passed,false,'requested opening angle is exactly 90 degrees');
assert.equal(checkCityProgram('gate',CITY_SOLUTIONS.gate.replace('attach(6)','attach(8)')).passed,false,'servo must use the wired pin');
assert.equal(simulateCity('int count=0; void setup(){pinMode(8,OUTPUT);} void loop(){count=count+1; if(count>1){digitalWrite(8,HIGH);} delay(100);}',80,2)[1].pins[8],1,'global assignments persist across loop iterations');
assert.throws(()=>simulateCity('const int limit=40; void setup(){} void loop(){limit=5; delay(100);}'),CityCodeError);
assert.equal(SMART_CITY_TASKS.length,2);console.log('Smart city: repaired programs, wrong timing/wiring, unsafe signals, five sensor distances, threshold and unsupported code OK');

for(const lane of CITY_TRAFFIC_LANES){
 const waiting=advanceCityCar(lane.start,lane,false,20);assert.equal(waiting,lane.stopLine,'red clamps at the stop line without overshoot');
 assert.equal(advanceCityCar(waiting,lane,false,1),waiting,'a waiting car stays before the crossing');
 const entered=advanceCityCar(waiting,lane,true,.5);assert.equal(entered,waiting+lane.direction*CITY_CAR_SPEED*.5);
 const clearing=advanceCityCar(entered,lane,false,.5);assert.equal(clearing,entered+lane.direction*CITY_CAR_SPEED*.5,'red cannot stop a car already on the crossing');
 assert.equal(advanceCityCar(clearing,lane,false,0),clearing,'paused time does not move cars');
 assert.equal(advanceCityCar(lane.direction*7.1,lane,false,.2),-lane.direction*7.2,'cars respawn beyond the end of the road');
}
const phase=simulateCity(CITY_SOLUTIONS.traffic).filter(f=>f.duration>0);
assert.deepEqual(phase.slice(0,3).map(f=>f.duration/.5),[4000,4000,1600],'half-speed preview preserves programmed timing ratios');
console.log('Traffic: both lanes stop before the crossing, clear it on red, wrap independently, and respect playback time OK');
