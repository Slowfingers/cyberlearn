import assert from 'node:assert/strict';
import {MOCK_TASKS} from '../constants';
import {resolveCircuitGates} from '../components/interactives/CircuitBuilderGame';
import {getNetworkScenario} from '../components/interactives/NetworkRouteGame';
const tasks=MOCK_TASKS.filter(t=>t.courseId==='course_grade5');
assert.equal(tasks.length,70);
for(const field of ['id','title'] as const)assert.equal(new Set(tasks.map(t=>t[field])).size,70,`Повтор ${field}`);
const scenarios=new Map<string,string>();
for(const task of tasks){
 let scenario:unknown;
 if(task.type==='quiz')scenario=task.quizData;
 else if(task.type==='circuit_builder')scenario=resolveCircuitGates(task).map(g=>({id:g.id,truth:[false,true].flatMap(a=>[false,true].map(b=>g.isTargetMet(a,b)))}));
 else if(task.type==='network_route')scenario=getNetworkScenario(task);
 else scenario={typing:task.typingConfig,binary:task.binaryConfig,sorting:task.sortingConfig,tree:task.treeConfig,hanoi:task.hanoiConfig,grid:task.mapConfig,code:task.initialCode,commands:task.allowedCommands,sheet:task.spreadsheetConfig,wireframe:task.wireframeConfig,phishing:task.phishingConfig,fake:task.fakeDetectorConfig,ai:task.aiTrainerConfig,html:task.htmlConfig,terminal:task.terminalConfig};
 const key=task.type+JSON.stringify(scenario);
 assert.ok(!scenarios.has(key),`${task.id} повторяет сценарий ${scenarios.get(key)}`);
 scenarios.set(key,task.id);
}
const boundary=tasks.find(t=>t.id==='g5_l57')!.spreadsheetConfig!;
assert.ok(boundary.tableData.some(r=>r.val1===60),'В уроке о границе нет граничного примера');
console.log('grade5.check: 70 уникальных ID, названий и сценариев; граничное значение 60 включено.');
