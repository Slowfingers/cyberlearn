import { Task } from '../types';
import { resolveCircuitGates } from '../components/interactives/CircuitBuilderGame';
import { resolveWireframeWidgets } from '../components/interactives/WireframeBuilderGame';
import { resolveFakeCases } from '../components/interactives/FakeDetectorGame';

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
  w.widgets.length > 0 && w.widgets.every(x => w.requiredSlots.includes(x.slot)));
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

console.log(`\nВсе ${passed} проверок прошли`);
