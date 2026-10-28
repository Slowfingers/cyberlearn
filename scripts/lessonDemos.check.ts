import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { MOCK_TASKS } from '../constants';
import { LESSON_DEMOS } from '../curriculum/lessonDemos';

const byId = new Map(MOCK_TASKS.map(t => [t.id, t]));

function runPython(code: string): string {
  const result = spawnSync('python3', ['-c', code], { timeout: 5000, encoding: 'utf-8' });
  assert.equal(result.status, 0, `python3 завершился с ошибкой: ${result.stderr}`);
  return result.stdout;
}

// Формат вывода sql-демо: скрипт из CREATE/INSERT/SELECT выполняется целиком в sqlite3;
// каждая строка результата — значения колонок через ' | ', по строке на запись (как в
// стандартной python-обёртке sqlite3 через cursor.fetchall()).
function runSql(code: string): string {
  const harness = `import sqlite3
con = sqlite3.connect(':memory:')
cur = con.cursor()
code = '''${code.replace(/'/g, "\\'")}'''
for statement in code.split(';'):
    statement = statement.strip()
    if not statement:
        continue
    result = cur.execute(statement)
    if statement.lstrip().upper().startswith('SELECT'):
        for row in result.fetchall():
            print(' | '.join(str(value) for value in row))
`;
  return runPython(harness);
}

for (const [id, demo] of Object.entries(LESSON_DEMOS)) {
  const task = byId.get(id);
  assert.ok(task, `${id}: демо относится к существующему заданию`);
  assert.equal(task.lesson?.demo, demo, `${id}: демо прикреплено к уроку`);
  const lines = demo.code.split('\n');
  assert.ok(demo.steps.length > 0, `${id}: есть хотя бы один шаг`);
  for (const step of demo.steps) {
    assert.ok(step.line >= 1 && step.line <= lines.length, `${id}: строка ${step.line} внутри кода`);
    assert.ok(step.say.length > 0, `${id}: у шага есть реплика наставника`);
  }
  if (demo.predict) {
    assert.ok(demo.predict.options.length >= 3, `${id}: хотя бы 3 варианта прогноза`);
    assert.ok(demo.predict.correct >= 0 && demo.predict.correct < demo.predict.options.length, `${id}: верный вариант в границах`);
    assert.ok(demo.predict.why.length > 0, `${id}: есть объяснение прогноза`);
  }
  if (demo.output !== undefined) {
    const actual = demo.language === 'python' ? runPython(demo.code) : demo.language === 'sql' ? runSql(demo.code) : demo.output;
    assert.equal(actual.trim(), demo.output.trim(), `${id}: вывод демо совпадает с реальным запуском`);
  }
  if (task.terminalOutput !== undefined) {
    assert.notEqual(demo.output?.trim(), task.terminalOutput.trim(), `${id}: демо не выдаёт ответ практики`);
    assert.ok(!demo.code.includes(task.terminalOutput.trim()), `${id}: код демо не содержит ответ практики`);
  }
  // Дандеры (__init__ и т.п.) — синтаксис языка, а не авторское имя: демо специально учит тому же контракту.
  for (const match of task.lesson?.starterCode?.matchAll(/def\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/g) ?? []) {
    if (/^__.*__$/.test(match[1])) continue;
    assert.ok(!demo.code.includes(`def ${match[1]}(`), `${id}: демо использует свои имена, не ${match[1]} из практики`);
  }
}
console.log(`lessonDemos.check: ${Object.keys(LESSON_DEMOS).length} демо проверены (шаги, прогнозы, реальный вывод, независимость от практики)`);
