// Self-check: grid command builder helpers operate on the same code string.
import { MOCK_TASKS } from '../constants';
import { describeGridCommand, gridDirectionLabel, isSimpleCommandSet, listCommandLines, moveCommandLine, removeCommandLine } from '../utils/gridCommands';

let failures = 0;
const check = (cond: boolean, msg: string) => { if (!cond) { failures++; console.error(`FAIL: ${msg}`); } };

check(describeGridCommand('drone.move_right()')?.heading === 'E', 'move_right -> E');
check(describeGridCommand('drone.move_right()')?.isoGlyph === '↗', 'east follows the up-right camera axis');
check(describeGridCommand('drone.move_up()')?.isoGlyph === '↖', 'north follows the up-left camera axis');
check(describeGridCommand('drone.moveUp()')?.heading === 'N', 'moveUp -> N');
check(describeGridCommand('drone.move_left()')?.label === 'Влево', 'move_left label');
check(describeGridCommand('forward()')?.label === 'Вперёд', 'forward label');
check(describeGridCommand('right()')?.label === 'Повернуть направо', 'bare right() is a turn, not a screen direction');
check(describeGridCommand('turnLeft()')?.label === 'Повернуть налево', 'turnLeft label');
check(describeGridCommand('jump()') === null && describeGridCommand('drone.attackRight()') === null, 'jump/attack are not simple');
check(describeGridCommand('for i in range(3):') === null, 'loop is not simple');
check(!isSimpleCommandSet(['drone.move_right()', 'drone.jump()']), 'jump disables builder');
check(isSimpleCommandSet(['moveForward()', 'turnLeft()', 'turnRight()']), 'forward/turn set is simple');

const code = 'a()\n\nb()\nc()';
check(moveCommandLine(code, 3, -1) === 'a()\n\nc()\nb()', 'move up swaps with previous non-empty line');
check(moveCommandLine(code, 0, -1) === code, 'first line cannot move up');
check(removeCommandLine(code, 2) === 'a()\n\nc()', 'remove deletes exactly one line');
check(listCommandLines(code).map(l => l.index).join() === '0,2,3', 'list skips blank lines');

const commented = '# Составь маршрут\na()\n// заметка\nb()';
check(listCommandLines(commented).map(l => l.index).join() === '1,3', 'comment lines are not commands');
check(moveCommandLine(commented, 3, -1) === '# Составь маршрут\nb()\n// заметка\na()', 'reorder skips comments and keeps them in place');
check(removeCommandLine(commented, 1) === '# Составь маршрут\n// заметка\nb()', 'remove keeps comment lines');

const grid = MOCK_TASKS.filter(t => t.type === 'grid');
const simple = grid.filter(t => isSimpleCommandSet(t.allowedCommands));
console.log(`grid tasks: ${grid.length}, builder-eligible: ${simple.length}`);
check(simple.length > 0, 'some grid tasks use the builder');
for (const t of simple) check(t.allowedCommands!.every(c => describeGridCommand(c)), `${t.id}: every command described`);

for (const [command, top, iso] of [['up','Вверх','Вверх-влево'],['right','Вправо','Вверх-вправо'],['down','Вниз','Вниз-вправо'],['left','Влево','Вниз-влево']]) {
 const info = describeGridCommand(`drone.move_${command}()`)!;
 check(gridDirectionLabel(info,'top') === top, `${command}: top label`);
 check(gridDirectionLabel(info,'iso') === iso, `${command}: visible diagonal label`);
}

if (failures === 0) console.log('gridCommands.check: все проверки прошли');
process.exit(failures ? 1 : 0);

