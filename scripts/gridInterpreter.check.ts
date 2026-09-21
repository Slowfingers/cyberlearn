import assert from 'node:assert';
import { runGridProgram } from '../services/localEvaluation';
import { Task } from '../types';

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

console.log('gridInterpreter.check: все 9 проверок прошли');
