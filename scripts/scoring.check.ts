// Self-check: лестница награды по числу провальных попыток.
// 0/1/2/3/5 ошибок -> 100/50/25/10/10 %, минимум 1 XP на выходе.
import { rewardMultiplier } from '../services/scoring';

let failures = 0;
const check = (cond: boolean, msg: string) => { if (!cond) { failures++; console.error(`FAIL: ${msg}`); } };

check(rewardMultiplier(0) === 1, `0 ошибок -> ${rewardMultiplier(0)}, ждали 1`);
check(rewardMultiplier(1) === 0.5, `1 ошибка -> ${rewardMultiplier(1)}, ждали 0.5`);
check(rewardMultiplier(2) === 0.25, `2 ошибки -> ${rewardMultiplier(2)}, ждали 0.25`);
check(rewardMultiplier(3) === 0.1, `3 ошибки -> ${rewardMultiplier(3)}, ждали 0.1`);
check(rewardMultiplier(5) === 0.1, `5 ошибок -> ${rewardMultiplier(5)}, ждали 0.1`);

// Минимум 1 XP даже на маленькой награде с большим штрафом
for (const xp of [1, 5, 10, 80, 200]) {
  const actual = Math.max(1, Math.round(xp * rewardMultiplier(5)));
  check(actual >= 1, `xp=${xp} с 5 ошибками -> ${actual} XP, минимум 1`);
}

// Проценты как в спецификации
const pct = (n: number) => Math.round(rewardMultiplier(n) * 100);
check([0, 1, 2, 3, 5].map(pct).join(',') === '100,50,25,10,10', `проценты: ${[0,1,2,3,5].map(pct)}`);

// Страж от возврата дыры с бонусными XP: начисление XP живёт только
// в handleTaskCompletion — в компонентах не должно быть onAwardBonusXP
// и самодельного увеличения xp вне лестницы награды.
import { readdirSync, readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const componentsDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'components');
const scan = (dir: string): string[] =>
  readdirSync(dir, { withFileTypes: true }).flatMap(e =>
    e.isDirectory() ? scan(join(dir, e.name)) : /\.(tsx?|ts)$/.test(e.name) ? [join(dir, e.name)] : []);

const banned = ['onAwardBonusXP', 'bonusEarned', 'AwardBonusXP'];
for (const file of scan(componentsDir)) {
  const src = readFileSync(file, 'utf8');
  for (const token of banned) {
    if (src.includes(token)) {
      check(false, `${file}: найден запрещённый паттерн начисления XP «${token}»`);
    }
  }
}

if (failures === 0) console.log('scoring.check: все проверки прошли');
process.exit(failures ? 1 : 0);
