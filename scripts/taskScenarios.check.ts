import assert from 'node:assert/strict';
import {MOCK_TASKS} from '../constants';
import {getFileScenario} from '../components/interactives/FileOrganizerGame';
import {getNetworkScenario} from '../components/interactives/NetworkRouteGame';
import {getTreeScenario} from '../services/treeScenario';
import {renderToStaticMarkup} from 'react-dom/server';
import React from 'react';
import {TypingGame} from '../components/interactives/TypingGame';
import {ProcessManagerGame} from '../components/interactives/ProcessManagerGame';
import {SpreadsheetGame} from '../components/interactives/SpreadsheetGame';
import {SortingGame} from '../components/interactives/SortingGame';
import {BinaryTreeGame} from '../components/interactives/BinaryTreeGame';
import {PhishingInspectorGame} from '../components/interactives/PhishingInspectorGame';
import {NeuronLabGame} from '../components/interactives/NeuronLabGame';
import {NetworkRouteGame} from '../components/interactives/NetworkRouteGame';
import {FileOrganizerGame} from '../components/interactives/FileOrganizerGame';
import {BinaryBulbsGame, getBinaryScenario} from '../components/interactives/BinaryBulbsGame';
import {WireframeBuilderGame, resolveWireframeWidgets} from '../components/interactives/WireframeBuilderGame';
import {CircuitBuilderGame, resolveCircuitGates} from '../components/interactives/CircuitBuilderGame';
import {FakeDetectorGame, resolveFakeCases} from '../components/interactives/FakeDetectorGame';
import {AiKidsTrainerGame} from '../components/interactives/AiKidsTrainerGame';
import {shuffledQuiz} from '../services/localEvaluation';
import HanoiGame from '../components/HanoiGame';
const components:Record<string,React.ComponentType<any>>={typing:TypingGame,process_manager:ProcessManagerGame,spreadsheet:SpreadsheetGame,sorting:SortingGame,tree_search:BinaryTreeGame,phishing_detect:PhishingInspectorGame,ai_neuron:NeuronLabGame,network_route:NetworkRouteGame,file_organizer:FileOrganizerGame,binary_bulbs:BinaryBulbsGame,binary_switches:BinaryBulbsGame,wireframe_builder:WireframeBuilderGame,circuit_builder:CircuitBuilderGame,circuit:CircuitBuilderGame,fake_detector:FakeDetectorGame,ai_kids_trainer:AiKidsTrainerGame,ai_trainer:AiKidsTrainerGame,hanoi:HanoiGame};
let rendered=0, scenarios=0;
for(const task of MOCK_TASKS){
 const check=(condition:unknown,message:string)=>assert.ok(condition,`${task.id}: ${message}`);
 const Game=components[task.type];
 if(Game){const html=renderToStaticMarkup(React.createElement(Game,{task,onComplete:()=>{}}));check(html.length>500,'пустой тренажёр');rendered++;}
 if(task.type==='quiz'){
  const quiz=task.quizData!;const shuffled=shuffledQuiz(task.id,quiz);
  check(shuffled.options[shuffled.correctIndex]===quiz.options[quiz.correctIndex],'перемешивание потеряло правильный ответ');
  check(new Set(quiz.options).size===quiz.options.length,'повторяющиеся ответы');scenarios++;
 }
 if(['circuit','circuit_builder'].includes(task.type)){const gates=resolveCircuitGates(task);check(gates.length>0&&gates.every(g=>[false,true].some(a=>[false,true].some(b=>g.isTargetMet(a,b)))),'цель схемы недостижима');scenarios++;}
 if(task.type==='wireframe_builder'){const {widgets,requiredSlots}=resolveWireframeWidgets(task);check(requiredSlots.length>0&&requiredSlots.every(slot=>widgets.some(w=>w.slot===slot)),'для области экрана нет детали');scenarios++;}
 if(task.type==='fake_detector'){const cases=resolveFakeCases(task);check(cases.length>0&&cases.every(c=>c.text&&typeof c.isDangerOrFake==='boolean'&&c.explanation),'неполное дело');scenarios++;}
 if(task.type==='phishing_detect'){check((task.phishingConfig?.threats??[]).every(t=>['sender','urgency','hidden_link','attachment'].includes(t.id)),'угроза без кликабельной зоны');scenarios++;}
 if(task.type==='ai_kids_trainer'&&task.aiTrainerConfig?.cards){const cards=task.aiTrainerConfig.cards;check(cards.length>0&&cards.every(c=>['cat','dog'].includes(c.category))&&new Set(cards.map(c=>c.id)).size===cards.length,'карточки без допустимых категорий');scenarios++;}
 if(task.type==='file_organizer'){
  const {folders,files}=getFileScenario(task);
  check(folders.length>0&&files.length>0,'нет папок или файлов');
  check(new Set(files.map(f=>f.id)).size===files.length,'повторяющиеся файлы');
  check(files.every(f=>folders.includes(f.folder!)),'нет папки назначения');scenarios++;
 }
 if(task.type==='tree_search'){
  const {root,nodes,target}=getTreeScenario(task);
  check(nodes.some(n=>n.val===target),'цель отсутствует в дереве');
  check(new Set(nodes.map(n=>n.val)).size===nodes.length,'повторяющиеся значения');
  const valid=(n:typeof root|undefined,min=-Infinity,max=Infinity):boolean=>!n||(n.val>min&&n.val<max&&valid(n.left,min,n.val)&&valid(n.right,n.val,max));
  check(valid(root),'нарушен порядок дерева поиска');check(nodes.every(n=>n.x>=20&&n.x<=480&&n.y<=260),'узел за краем схемы');scenarios++;
 }
 if(task.type==='network_route'){
  const {nodes,edges,startNode,endNode,maxLatency}=getNetworkScenario(task);const ids=new Set(nodes.map(n=>n.id));
  check(ids.size===nodes.length&&ids.has(startNode)&&ids.has(endNode),'неизвестный старт/финиш или повтор узлов');
  check(edges.every(e=>ids.has(e.from)&&ids.has(e.to)&&Number.isFinite(e.latencyMs)&&e.latencyMs>0),'невалидные соединения');
  const distance=new Map(nodes.map(n=>[n.id,n.id===startNode?0:Infinity]));
  for(let i=0;i<nodes.length;i++)for(const e of edges){if(nodes.some(n=>(n.id===e.from||n.id===e.to)&&n.status==='overloaded'))continue;
   distance.set(e.to,Math.min(distance.get(e.to)!,distance.get(e.from)!+e.latencyMs));distance.set(e.from,Math.min(distance.get(e.from)!,distance.get(e.to)!+e.latencyMs));}
  check(startNode!==endNode&&distance.get(endNode)!<=maxLatency,'нет допустимого маршрута');scenarios++;
 }
 if(task.sortingConfig){check(task.sortingConfig.numbers.length>=2&&task.sortingConfig.numbers.every(Number.isFinite),'невалидные числа');scenarios++;}
 if(task.binaryConfig){const {weights,rounds}=getBinaryScenario(task);const limit=weights.reduce((a,b)=>a+b,0);check(weights.length>=1&&weights.length<=8&&rounds.length>0&&rounds.every(r=>Number.isInteger(r.target)&&r.target>0&&r.target<=limit),'число невозможно собрать доступными битами');scenarios++;}
 if(task.neuronConfig?.samples){const samples=task.neuronConfig.samples;let solution=false;
  for(let a=-5;a<=5;a++)for(let b=-5;b<=5;b++)for(let c=-5;c<=5;c++)if(samples.every(s=>Number(a*s.x1+b*s.x2+c>0)===s.target))solution=true;
  check(samples.length>0&&solution,'выборка не обучается доступными весами');scenarios++;
 }
}
const first=getFileScenario(MOCK_TASKS.find(t=>t.id==='g4_l1')!);
assert.equal(first.files.length,4);assert.deepEqual(first.folders,['Документы','Презентации','Таблицы','Медиа']);
assert.equal(getTreeScenario(MOCK_TASKS.find(t=>t.id==='g4_l8')!).root.val,20);
assert.deepEqual(getBinaryScenario(MOCK_TASKS.find(t=>t.id==='g4_l5')!).weights,[16,8,4,2,1]);
assert.equal(getBinaryScenario(MOCK_TASKS.find(t=>t.id==='g4_l5')!).rounds[0].target,25);
console.log(`Проверено: ${MOCK_TASKS.length} заданий, ${rendered} отрисовок тренажёров, ${scenarios} сценариев с проверкой данных и достижимости.`);
