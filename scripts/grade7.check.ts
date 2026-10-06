import assert from 'node:assert/strict';
import {MOCK_TASKS} from '../constants';
import {runGridProgram,evaluateCodeLocally} from '../services/localEvaluation';
import {terminalLanguage,checkShell} from '../services/terminal';
import {getNetworkScenario} from '../components/interactives/NetworkRouteGame';
const tasks=MOCK_TASKS.filter(t=>t.courseId==='course_grade7');
assert.equal(tasks.length,70);
for(const field of ['id','title'] as const)assert.equal(new Set(tasks.map(t=>t[field])).size,70,`Повтор ${field}`);
assert.equal(new Set(tasks.map(t=>t.lesson!.explanation)).size,70,'Повтор объяснения');
const signatures=new Set<string>();
for(const t of tasks){
 const signature=JSON.stringify([t.type,t.quizData,t.initialCode,t.mapConfig,t.sortingConfig,t.treeConfig,t.networkConfig,t.spreadsheetConfig,t.neuronConfig,t.phishingConfig]);
 assert.ok(!signatures.has(signature),`${t.id}: повтор задания`);signatures.add(signature);
 if(t.type==='quiz'){
  assert.ok(t.quizData);assert.ok(t.quizData.correctIndex>=0&&t.quizData.correctIndex<t.quizData.options.length);
  assert.equal(new Set(t.quizData.options).size,t.quizData.options.length);
 }
 if(['grid','terminal','html'].includes(t.type))assert.equal((await evaluateCodeLocally(t.lesson!.starterCode!,t)).success,false,`${t.id}: заготовка уже решена`);
 if(t.type==='terminal'&&terminalLanguage(t)==='shell')assert.ok(checkShell(t.initialCode!,t));
 if(t.type==='grid')assert.equal(runGridProgram(t.initialCode!,t.mapConfig!).success,true);
}
const sheet=tasks.find(t=>t.id==='g7_l41')!.spreadsheetConfig!;
assert.deepEqual(sheet.tableData.map(r=>r.val1),[76,60,59]);
const model=tasks.find(t=>t.id==='g7_l50')!.neuronConfig!;
for(const sample of model.samples!)assert.equal(Number(sample.x1*model.targetWeight1+sample.x2*model.targetWeight2+model.threshold>0),sample.target);
const network=getNetworkScenario(tasks.find(t=>t.id==='g7_l44')!);
assert.ok(network.nodes.every(n=>!/(TCP|DNS|UDP|HTTP|IP:)/.test(n.label)),'Узлы — устройства, а не протоколы');
assert.ok(tasks.find(t=>t.id==='g7_l34')!.htmlConfig!.counter);
assert.ok(tasks.find(t=>t.id==='g7_l55')!.lesson!.starterCode!.includes('if False: # Проверь освещённость'));
console.log('grade7.check: 70 уникальных уроков, сценарии, заготовки, граница IF, веса модели, маршрут и интерактивный счётчик проверены.');
