import assert from 'node:assert';
import { runGridProgram } from '../services/localEvaluation';
import { Task } from '../types';
import { MOCK_TASKS } from '../constants';

const map = (over: Partial<NonNullable<Task['mapConfig']>> = {}): NonNullable<Task['mapConfig']> => ({
    gridSize: 3,
    start: [0, 0],
    end: [2, 2],
    obstacles: [],
    ...over,
});

// (a) forward() из [0,0] на 3x3 -> [1,0]
{
    const r = runGridProgram('forward()', map({ end: [1, 0] }));
    assert.deepStrictEqual(r.steps.at(-1), [1, 0]);
    assert.strictEqual(r.success, true);
}

// (b) right()\nforward() -> [0,1]
{
    const r = runGridProgram('right()\nforward()', map({ end: [0, 1] }));
    assert.deepStrictEqual(r.steps.at(-1), [0, 1]);
    assert.strictEqual(r.success, true);
}

// (c) drone.move_down() ставит heading S, значит forward() -> [0,2]
{
    const r = runGridProgram('drone.move_down()\nforward()', map({ end: [0, 2] }));
    assert.deepStrictEqual(r.steps.at(-1), [0, 2]);
    assert.strictEqual(r.success, true);
}

// (d) jump через препятствие [1,0] из [0,0] -> [2,0]
{
    const r = runGridProgram('jump()', map({ end: [2, 0], obstacles: [[1, 0]] }));
    assert.deepStrictEqual(r.steps.at(-1), [2, 0]);
    assert.strictEqual(r.success, true);
}

// (e) attack без препятствия впереди — без ошибки
{
    const r = runGridProgram('attack()', map({ end: [0, 0] }));
    assert.strictEqual(r.error, undefined);
    assert.strictEqual(r.success, true);
}

// (f) вложенный Python-цикл: 2x2 = 4 шага
{
    const r = runGridProgram('for i in range(2):\n    for j in range(2):\n        forward()', map({ gridSize: 5, end: [4, 0] }));
    assert.strictEqual(r.steps.length, 5); // start + 4 шага
    assert.deepStrictEqual(r.steps.at(-1), [4, 0]);
    assert.strictEqual(r.success, true);
}

// (g) Lua однострочный цикл: 2 шага
{
    const r = runGridProgram('for i=1,2 do forward() end', map({ end: [2, 0] }));
    assert.strictEqual(r.steps.length, 3);
    assert.deepStrictEqual(r.steps.at(-1), [2, 0]);
    assert.strictEqual(r.success, true);
}

// (h) неизвестная команда -> error
{
    const r = runGridProgram('teleport()', map());
    assert.ok(r.error?.includes('Неизвестная команда'));
    assert.strictEqual(r.success, false);
}

// (i) range(999999) -> ошибка лимита, не зависание
{
    const r = runGridProgram('for i in range(999999):\n    forward()', map());
    assert.ok(r.error?.includes('лимит'));
    assert.strictEqual(r.success, false);
}

{
 const r=runGridProgram('right()\nright()\nright()\nright()',map({end:[0,0]}));
 assert.deepStrictEqual(r.gridEvents.map(e=>e.heading),['S','W','N','E']);
 assert.ok(r.gridEvents.every(e=>e.type==='turn' && e.x===0 && e.y===0));
 assert.equal(r.steps.length,1,'Повороты не добавляют шаги маршрута');
}
for(const code of ['for i in range(2):\nforward()','for i in range(2):','for i in range():']) {
 const r=runGridProgram(code,map());assert.equal(r.success,false);assert.ok(r.error && !r.error.includes('лимит'),'Понятная ошибка цикла вместо неверного выполнения');
}
{
 const r=runGridProgram('drone.move_down()',map({obstacles:[[0,1]]}));
 assert.equal(r.gridEvents[0].heading,'S');assert.equal(r.gridEvents[0].type,'turn');assert.deepStrictEqual(r.steps,[[0,0]]);
}
const routes=MOCK_TASKS.filter(t=>t.type==='grid');
assert.equal(runGridProgram('for i=2,4 do forward() end',map({gridSize:4,end:[3,0]})).success,true);
for(const task of routes) {
 const r=runGridProgram(task.initialCode!,task.mapConfig!);
 assert.equal(r.success,task.id!=='g4_l43',`${task.id}: эталон достигает цели (кроме задания на исправление ошибки)`);
 assert.ok(r.gridEvents.every(e=>e.heading),`${task.id}: каждое событие имеет направление для анимации`);
 const blank=runGridProgram(task.lesson!.starterCode!,task.mapConfig!);
 assert.equal(blank.success,false,`${task.id}: заготовка не выдаёт готовый маршрут`);
}
console.log(`gridInterpreter.check: turns, headings, invalid loops, collisions and all ${routes.length} course routes passed.`);
