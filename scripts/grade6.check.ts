import {getProcessScenario} from '../components/interactives/ProcessManagerGame';
import assert from 'node:assert/strict';
import {MOCK_TASKS} from '../constants';
import {resolveCircuitGates} from '../components/interactives/CircuitBuilderGame';
import {getNetworkScenario} from '../components/interactives/NetworkRouteGame';
const tasks=MOCK_TASKS.filter(t=>t.courseId==='course_grade6');
assert.equal(tasks.length,40);
for(const field of ['id','title'] as const)assert.equal(new Set(tasks.map(t=>t[field])).size,40,`Повтор ${field}`);
const scenarios=new Map<string,string>();
for(const task of tasks){
 let scenario:unknown;
 if(task.type==='quiz')scenario=task.quizData;
 else if(task.type==='circuit_builder')scenario=resolveCircuitGates(task).map(g=>({id:g.id,truth:[false,true].flatMap(a=>[false,true].map(b=>g.isTargetMet(a,b)))}));
 else if(task.type==='network_route')scenario=getNetworkScenario(task);
 else scenario={process:task.processConfig,neuron:task.neuronConfig,typing:task.typingConfig,binary:task.binaryConfig,sorting:task.sortingConfig,tree:task.treeConfig,hanoi:task.hanoiConfig,grid:task.mapConfig,code:task.initialCode,commands:task.allowedCommands,sheet:task.spreadsheetConfig,wireframe:task.wireframeConfig,phishing:task.phishingConfig,fake:task.fakeDetectorConfig,ai:task.aiTrainerConfig,html:task.htmlConfig,terminal:task.terminalConfig};
 const key=task.type+JSON.stringify(scenario);
 assert.ok(!scenarios.has(key),`${task.id} повторяет сценарий ${scenarios.get(key)}`);
 scenarios.set(key,task.id);
}
for(const task of tasks){
 if(task.type==='spreadsheet')assert.equal(task.spreadsheetConfig?.tableData.length,3,`${task.id}: нужны авторские строки`);
 if(task.type==='process_manager'){const scenario=getProcessScenario(task);assert.ok(scenario.targets.length>0&&scenario.targets.every(name=>scenario.processes.some(p=>p.name===name&&!p.isCritical)));}
}
const boundary=tasks.find(t=>t.id==='g6_m2_sheets_if')!.spreadsheetConfig!;
assert.deepEqual(boundary.tableData.map(r=>r.val1),[84,70,69]);
assert.equal(new Set(tasks.map(t=>t.lesson!.explanation)).size,40,'Повтор объяснения');
assert.equal(tasks.find(t=>t.id==='g6_m3_hanoi')!.hanoiConfig!.disks,4);
console.log('grade6.check: 40 уникальных уроков и сценариев, авторские таблицы, граница IF, процессные цели и четыре диска проверены.');
