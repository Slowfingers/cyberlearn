// Лестница награды по числу провальных попыток:
// 0 ошибок -> 100%, 1 -> 50%, 2 -> 25%, 3+ -> 10% (минимум 1 XP обеспечивает вызывающий код).
export function rewardMultiplier(failedAttempts: number): number {
  if (failedAttempts <= 0) return 1;
  if (failedAttempts === 1) return 0.5;
  if (failedAttempts === 2) return 0.25;
  return 0.1;
}
