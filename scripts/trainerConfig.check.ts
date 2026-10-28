import { Task } from '../types';
import { resolveCircuitGates, resolveCircuitMission } from '../components/interactives/CircuitBuilderGame';
import { resolveWireframeWidgets } from '../components/interactives/WireframeBuilderGame';
import { resolveFakeCases } from '../components/interactives/FakeDetectorGame';
import { getNetworkScenario } from '../components/interactives/NetworkRouteGame';
import { MOCK_TASKS } from '../constants';

const t = (over: Partial<Task>): Task => ({
  id: 't1',
  courseId: 'course_grade3',
  module: 'm',
  title: 'Тест',
  type: 'circuit_builder',
  description: 'd',
  difficulty: 'Новичок',
  xpReward: 10,
  currencyReward: 0,
  status: 'open',
  ...over,
} as Task);

let passed = 0;
const check = (name: string, cond: boolean) => {
  if (!cond) { console.error(`FAIL: ${name}`); process.exit(1); }
  passed++;
  console.log(`ok: ${name}`);
};

// --- CircuitBuilderGame ---
let g = resolveCircuitGates(t({ circuitConfig: { targetGate: 'OR', expectedOutput: true } }));
check('targetGate OR -> 1 уровень or', g.length === 1 && g[0].id === 'or');
g = resolveCircuitGates(t({ circuitConfig: { gate: 'xor', targetOutput: true } }));
check('gate xor -> 1 уровень xor', g.length === 1 && g[0].id === 'xor');
g = resolveCircuitGates(t({ circuitConfig: { gates: ['and', 'nand'] } }));
check('gates [and,nand] -> 2 уровня', g.length === 2 && g[0].id === 'and' && g[1].id === 'nand');
g = resolveCircuitGates(t({ circuitConfig: { gate: 'notagate' } }));
check('мусорный вентиль -> полный дефолт (4)', g.length === 4);
g = resolveCircuitGates(t({}));
check('нет конфига -> дефолт (4)', g.length === 4);

// --- WireframeBuilderGame ---
let w = resolveWireframeWidgets(t({ wireframeConfig: { requiredElements: ['header', 'canvas', 'controls'] } }));
check('requiredElements -> 3 слота header/hero/action',
  w.requiredSlots.length === 3 && w.requiredSlots.includes('header') && w.requiredSlots.includes('hero') && w.requiredSlots.includes('action'));
check('requiredElements -> виджеты только нужных слотов',
  w.widgets.length > 0 && w.widgets.every(x => x.slot === 'none' || w.requiredSlots.includes(x.slot)));
w = resolveWireframeWidgets(t({}));
check('wireframe без конфига -> дефолт 4 слота', w.requiredSlots.length === 4 && w.widgets.length === 6);
w = resolveWireframeWidgets(t({ wireframeConfig: { requiredElements: ['nonsense'] } }));
check('мусорный requiredElements -> дефолт', w.widgets.length === 6 && w.requiredSlots.length === 4);

// --- FakeDetectorGame ---
let c = resolveFakeCases(t({ fakeDetectorConfig: { claim: 'Вира! Срочно введи пароль!', isFake: true, explanation: 'Фейк.' } }));
check('claim -> 1 кейс с текстом', c.length === 1 && c[0].text === 'Вира! Срочно введи пароль!' && c[0].isDangerOrFake === true && c[0].explanation === 'Фейк.');
c = resolveFakeCases(t({ fakeDetectorConfig: { claim: 'Обычное сообщение', isFake: false } }));
check('claim isFake=false -> безопасный кейс', c.length === 1 && c[0].isDangerOrFake === false);
c = resolveFakeCases(t({}));
check('fakeDetector без конфига -> дефолт 6 кейсов', c.length === 6);

// --- Миссии схем ---
check('g3_m10_l1 mission single', resolveCircuitMission(MOCK_TASKS.find(x => x.id === 'g3_m10_l1')!) === 'single');
check('g3_m10_l2 mission explore', resolveCircuitMission(MOCK_TASKS.find(x => x.id === 'g3_m10_l2')!) === 'explore');
check('g4_l40 mission explore', resolveCircuitMission(MOCK_TASKS.find(x => x.id === 'g4_l40')!) === 'explore');
check('g4_l42 mission predict', resolveCircuitMission(MOCK_TASKS.find(x => x.id === 'g4_l42')!) === 'predict');
check('mission не задана -> target', resolveCircuitMission(t({})) === 'target');

// --- NetworkRouteGame: у каждой сетевой задачи есть валидный простой путь ---
const networkPaths = (task: Task): { path: string[]; latency: number }[] => {
  const { nodes, edges, startNode, endNode } = getNetworkScenario(task);
  const out: { path: string[]; latency: number }[] = [];
  const adj = new Map<string, { to: string; latency: number }[]>();
  for (const e of edges) {
    if (e.status === 'down') continue;
    adj.set(e.from, [...(adj.get(e.from) ?? []), { to: e.to, latency: e.latencyMs }]);
    adj.set(e.to, [...(adj.get(e.to) ?? []), { to: e.from, latency: e.latencyMs }]);
  }
  const dead = new Set(nodes.filter(n => n.status === 'overloaded').map(n => n.id));
  const walk = (node: string, seen: Set<string>, path: string[], lat: number) => {
    if (node === endNode) { out.push({ path, latency: lat }); return; }
    for (const next of adj.get(node) ?? []) {
      if (seen.has(next.to) || dead.has(next.to)) continue;
      walk(next.to, new Set([...seen, next.to]), [...path, next.to], lat + next.latency);
    }
  };
  walk(startNode, new Set([startNode]), [startNode], 0);
  return out;
};
for (const task of MOCK_TASKS.filter(x => x.type === 'network_route')) {
  const { maxLatency } = getNetworkScenario(task);
  const valid = networkPaths(task).filter(p => p.latency <= maxLatency);
  check(`network ${task.id}: есть путь ≤ ${maxLatency} мс`, valid.length > 0);
}
{
  const l50 = MOCK_TASKS.find(x => x.id === 'g4_l50')!;
  const valid50 = networkPaths(l50).filter(p => p.latency <= getNetworkScenario(l50).maxLatency);
  check('g4_l50 единственный путь home→r1→r3→site', valid50.length === 1 && valid50[0].path.join('>') === 'home>r1>r3>site' && valid50[0].latency === 45);
  const l54 = MOCK_TASKS.find(x => x.id === 'g4_l54')!;
  const valid54 = networkPaths(l54).filter(p => p.latency <= getNetworkScenario(l54).maxLatency);
  check('g4_l54 единственный путь pc→b→c→srv', valid54.length === 1 && valid54[0].path.join('>') === 'pc>b>c>srv' && valid54[0].latency === 40);
}

// --- WireframeBuilderGame: на каждый обязательный слот есть не-ловушечная деталь ---
for (const task of MOCK_TASKS.filter(x => x.type === 'wireframe_builder')) {
  const w = resolveWireframeWidgets(task);
  check(`wireframe ${task.id}: все слоты закрываются деталями`,
    w.requiredSlots.every(s => w.widgets.some(x => x.slot === s)));
}

console.log(`\nВсе ${passed} проверок прошли`);
