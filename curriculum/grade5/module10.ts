import { Task } from '../../types';

export const MODULE10_TASKS: Task[] = [
  {
    id: 'g5_l46',
    courseId: 'course_grade5',
    module: 'Блок 10: Продвинутые игровые системы и Детекторы XOR',
    title: 'Урок 46: Библиотеки собственных блоков и продвинутые клоны',
    type: 'quiz',
    description: 'Создание переиспользуемых модулей (Custom Block Packages), передача клонам персональных ID и пулы объектов (Object Pooling).',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📚
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Библиотеки блоков и Пул объектов (Object Pool)
            </h3>
            <p class="text-xs text-slate-300">
              Вместо бесконечного создания и удаления сотен клонов в секунду профессионалы создают пул из 20 готовых объектов и просто перемещают их на экран по очереди!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'В чем преимущество паттерна "Пул объектов" (Object Pooling) в играх?',
      options: [
        'Переиспользует объекты вместо создания новых',
        'Увеличивает громкость звуковых эффектов',
        'Позволяет запустить игру без видеокарты',
        'Уменьшает размер файла игры на диске'
      ],
      correctIndex: 0,
      explanation: 'Пул объектов повторно использует уже созданные спрайты, сохраняя стабильные 60 кадров в секунду.'
    }
  },
  {
    id: 'g5_l47',
    courseId: 'course_grade5',
    module: 'Блок 10: Продвинутые игровые системы и Детекторы XOR',
    title: 'Урок 47: Системы столкновений и конечные автоматы',
    type: 'grid',
    description: 'AABB (Axis-Aligned Bounding Box) коллизии и программирование состояний персонажа: Покой, Бег, Прыжок, Урон.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            💥
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Хитбоксы и Конечный автомат персонажа
            </h3>
            <p class="text-xs text-slate-300">
              Персонаж не может одновременно находиться в состоянии бега и в состоянии прыжка. Конечный автомат (State Machine) строго регулирует допустимые переходы!
            </p>
          </div>
        </div>
      </div>
    `,
    allowedCommands: ['moveForward()', 'turnLeft()', 'turnRight()', 'jump()'],
    initialCode: 'jump()\nmoveForward()',
    mapConfig: {
      gridSize: 5,
      start: [0, 1],
      end: [3, 1],
      obstacles: [[1, 1]]
    }
  },
  {
    id: 'g5_l48',
    courseId: 'course_grade5',
    module: 'Блок 10: Продвинутые игровые системы и Детекторы XOR',
    title: 'Урок 48: Камера, звук, сохранения и интерфейс',
    type: 'wireframe_builder',
    description: 'Интерфейс игрового дашборда: полоска здоровья (Health Bar), мини-карта, инвентарь и плавное следование камеры за героем.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🖥️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              HUD (Heads-Up Display): Игровой интерфейс
            </h3>
            <p class="text-xs text-slate-300">
              HUD всегда привязан к координатам экрана (Screen Space), а не мира! Он не двигается, когда камера летит по игровому уровню.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g5_l49',
    courseId: 'course_grade5',
    module: 'Блок 10: Продвинутые игровые системы и Детекторы XOR',
    title: 'Урок 49: Игровой ИИ, дизайн уровней, мультиплеер и полировка',
    type: 'grid',
    description: 'Геймдизайн: кривая сложности, темп игры (Pacing), «сочность» управления (Juice/Screen Shake) и финальный баланс.',
    difficulty: 'Элита',
    xpReward: 120,
    currencyReward: 45,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-red-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ✨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Game Feel & Juice: Эффект сочности
            </h3>
            <p class="text-xs text-slate-300">
              Микро-пауза при ударе (Hitstop), частицы пыли при беге и легкая встряска экрана превращают обычную игру в настоящий шедевр.
            </p>
          </div>
        </div>
      </div>
    `,
    allowedCommands: ['moveForward()', 'turnLeft()', 'turnRight()', 'attack()'],
    initialCode: 'turnLeft()\nmoveForward()\nattack()\nmoveForward()\nmoveForward()',
    mapConfig: {
      gridSize: 5,
      start: [1, 4],
      end: [1, 1],
      obstacles: [[1, 2]]
    }
  },
  {
    id: 'g5_l50',
    courseId: 'course_grade5',
    module: 'Блок 10: Продвинутые игровые системы и Детекторы XOR',
    title: 'Урок 50: XOR вглубь — детектор различий',
    type: 'circuit_builder',
    description: 'В криптографии и контрольных суммах XOR используется как идеальный детектор различий. Собери схему сравнения битов!',
    difficulty: 'Легенда',
    xpReward: 130,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-teal-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              XOR: Детектор несовпадений
            </h3>
            <p class="text-xs text-slate-300">
              Если два бита равны (0 и 0 или 1 и 1) — XOR выдает 0. Если биты отличаются (0 и 1) — XOR мгновенно бьет тревогу и выдает 1!
            </p>
          </div>
        </div>
      </div>
    `,
    circuitConfig: {
      gate: 'xor',
      targetOutput: true
    }
  }
];
