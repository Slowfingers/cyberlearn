export const publicUser = user => {
  const { password, _fbKey, ...safe } = user;
  return safe;
};
export function buyCosmetic(user, item, equipOnly = false) {
  if (!item) throw new Error('Предмет не найден');
  const next = structuredClone(user);
  next.inventory ||= [];
  next.equipped ||= { avatar: 'av_1', droneColor: 'col_default' };
  if (!equipOnly) {
    if (next.inventory.includes(item.id)) throw new Error('Предмет уже куплен');
    if (next.currency < item.cost) throw new Error('Недостаточно средств');
    if (next.level < item.unlockLevel) throw new Error('Уровень слишком низок');
    next.currency -= item.cost;
    next.inventory.push(item.id);
  } else if (!next.inventory.includes(item.id)) throw new Error('Предмет не куплен');
  next.equipped[item.type] = item.id;
  return next;
}
export function completeTask(user, task, attempts, catalog, now = new Date()) {
  if (!task) throw new Error('Задание не найдено');
  const next = structuredClone(user);
  next.completedTaskIds ||= [];
  if (next.completedTaskIds.includes(task.id)) return { user: next, awarded: false };
  if (!Number.isInteger(attempts) || attempts < 0 || attempts > 100000) throw new Error('Неверное число попыток');
  const multiplier = attempts === 0 ? 1 : attempts === 1 ? .5 : attempts === 2 ? .25 : .1;
  next.xp = (next.xp || 0) + Math.max(1, Math.round(task.xpReward * multiplier));
  next.currency = (next.currency || 0) + Math.max(0, Math.round((task.currencyReward || 0) * multiplier));
  next.level = catalog.levels.reduce((level, threshold, i) => next.xp >= threshold ? i + 1 : level, 1);
  next.completedTaskIds.push(task.id);
  next.tasksCompleted = next.completedTaskIds.length;
  next.totalErrors = (next.totalErrors || 0) + attempts;
  // A single server timezone keeps streaks consistent across devices.
  const today = new Intl.DateTimeFormat('en-CA', { timeZone: 'Asia/Tashkent', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
  if (next.lastActiveDate !== today) {
    const days = Math.round((Date.parse(today) - Date.parse(next.lastActiveDate || '')) / 86400000);
    next.streak = days === 1 ? (next.streak || 0) + 1 : 1;
    next.lastActiveDate = today;
  }
  const types = { typing:'ach_typing', binary_switches:'ach_binary', binary_bulbs:'ach_binary', circuit_builder:'ach_circuit', circuit:'ach_circuit', grid:'ach_robot', terminal:'ach_terminal', html:'ach_web', hanoi:'ach_hanoi', phishing_detect:'ach_safety', fake_detector:'ach_safety', ai_neuron:'ach_ai', ai_kids_trainer:'ach_ai', ai_trainer:'ach_ai' };
  const achievements = new Set(next.achievements || []);
  achievements.add('ach_1');
  if (types[task.type]) achievements.add(types[task.type]);
  const courseTasks = catalog.tasks.filter(t => t.courseId === task.courseId);
  if (courseTasks.length && courseTasks.every(t => next.completedTaskIds.includes(t.id))) achievements.add(`ach_${task.courseId.replace('course_', '')}`);
  next.achievements = [...achievements].filter(id => catalog.achievements.some(a => a.id === id));
  return { user: next, awarded: true };
}
export function validateMap(map) {
  if (!map || !Number.isInteger(map.gridSize) || map.gridSize < 3 || map.gridSize > 8 || !Array.isArray(map.obstacles) || map.obstacles.length > 64) throw new Error('Неверная карта');
  const valid = p => Array.isArray(p) && p.length === 2 && p.every(n => Number.isInteger(n) && n >= 0 && n < map.gridSize);
  if (!valid(map.start) || !valid(map.end) || !map.obstacles.every(valid)) throw new Error('Координаты вне карты');
  const walls = new Set(map.obstacles.map(p => p.join(',')));
  if (walls.has(map.start.join(',')) || walls.has(map.end.join(',')) || map.start.join(',') === map.end.join(',')) throw new Error('Старт и финиш должны быть разными свободными клетками');
  const queue = [map.start], seen = new Set([map.start.join(',')]);
  for (let i = 0; i < queue.length; i++) {
    const [x,y] = queue[i];
    if (x === map.end[0] && y === map.end[1]) return;
    for (const p of [[x+1,y],[x-1,y],[x,y+1],[x,y-1]]) if (valid(p) && !walls.has(p.join(',')) && !seen.has(p.join(','))) { seen.add(p.join(',')); queue.push(p); }
  }
  throw new Error('Финиш недостижим');
}
