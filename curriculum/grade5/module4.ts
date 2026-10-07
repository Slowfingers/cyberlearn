import { Task } from '../../types';

export const MODULE4_TASKS: Task[] = [
  {
    id: 'g5_l14',
    courseId: 'course_grade5',
    module: 'Блок 4: Разработка 2D-платформера: Физика и Игровой движок',
    title: 'Урок 14: Основы платформера и физика гравитации',
    type: 'grid',
    description: 'Физический движок 2D-игры: вектор вертикальной скорости, ускорение свободного падения (гравитация) и проверка приземления на платформу.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🕹️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Физика гравитации: Переменная скорости Y (Vy)
            </h3>
            <p class="text-xs text-slate-300">
              Гравитация не просто телепортирует персонажа вниз — она <strong>ускоряет</strong> его с каждым кадром! <code class="text-yellow-300 font-mono">Vy = Vy - 1</code>, затем <code class="text-emerald-300 font-mono">Y = Y + Vy</code>.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1 font-mono">
          <div class="text-cyan-400 font-bold">Детекция столкновений (Hitbox):</div>
          <div class="text-slate-300">ЕСЛИ касается платформы: Vy = 0 (герой стоит на земле)</div>
          <div class="text-slate-300">ИНАЧЕ: Vy уменьшается (герой падает в воздухе)</div>
        </div>
      </div>
    `,
    allowedCommands: ['moveForward()', 'turnLeft()', 'turnRight()', 'jump()'],
    initialCode: 'jump()\njump()',
    mapConfig: {
      gridSize: 5,
      start: [0, 2],
      end: [4, 2],
      obstacles: [[1, 2], [3, 2]]
    }
  },
  {
    id: 'g5_l15',
    courseId: 'course_grade5',
    module: 'Блок 4: Разработка 2D-платформера: Физика и Игровой движок',
    title: 'Урок 15: Прокручивающиеся миры и эффект параллакса',
    type: 'quiz',
    description: 'Как создавать бесконечные миры: виртуальная камера, координаты ScrollX и эффект параллакса для создания иллюзии трехмерной глубины.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🌄
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Эффект Параллакса (Parallax Scrolling)
            </h3>
            <p class="text-xs text-slate-300">
              Когда ты едешь в поезде, ближние столбы пролетают молниеносно, а далекие горы на горизонте почти стоят на месте. В играх этот оптический закон создает глубину пространства!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1 font-mono">
          <div class="text-purple-400 font-bold">Слои параллакса:</div>
          <div class="text-slate-300">Передний план (земля): скорость 100%</div>
          <div class="text-slate-300">Средний план (деревья): скорость 50%</div>
          <div class="text-slate-300">Дальний план (горы, луна): скорость 10%</div>
        </div>
      </div>
    `,
    quizData: {
      question: 'За счет чего эффект параллакса создает ощущение трехмерного пространства в двухмерной игре?',
      options: [
        'Дальние слои движутся медленнее ближних',
        'Все слои движутся с одинаковой скоростью',
        'Персонаж уменьшается при движении вперёд',
        'Фон меняет яркость при движении камеры'
      ],
      correctIndex: 0,
      explanation: 'Разная скорость движения слоев создает оптическую иллюзию удаленности объектов от виртуальной камеры.'
    }
  },
  {
    id: 'g5_l16',
    courseId: 'course_grade5',
    module: 'Блок 4: Разработка 2D-платформера: Физика и Игровой движок',
    title: 'Урок 16: ИИ врагов и бонусы',
    type: 'grid',
    description: 'Паттерны поведения игровых ботов: патрулирование платформы от края до края, обнаружение игрока в радиусе видимости и сбор кристаллов.',
    difficulty: 'Хакер',
    xpReward: 115,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-amber-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            👾
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Игровой искусственный интеллект (Enemy AI)
            </h3>
            <p class="text-xs text-slate-300">
              Простейший ИИ патрульного монстра проверяет край платформы или сенсор стены: встретив препятствие, он разворачивает вектор скорости <code class="text-yellow-300 font-mono">Vx = Vx * -1</code>.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-red-400 font-bold">Конечный автомат врага (Finite State Machine):</div>
          <p class="text-slate-300 text-[11px]">
            1. Состояние «Патруль» ➔ 2. Заметил героя ➔ «Преследование» ➔ 3. Потерял из вида ➔ «Возврат на пост».
          </p>
        </div>
      </div>
    `,
    allowedCommands: ['moveForward()', 'turnLeft()', 'turnRight()', 'attack()'],
    initialCode: 'attack()\nfor i in range(4):\n    moveForward()',
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [4, 0],
      obstacles: [[1, 0]]
    }
  },
  {
    id: 'g5_l17',
    courseId: 'course_grade5',
    module: 'Блок 4: Разработка 2D-платформера: Физика и Игровой движок',
    title: 'Урок 17: Системы уровней и сохранений',
    type: 'quiz',
    description: 'Архитектура сохранений: кодирование прогресса в строку сохранения (Save Code), чекпоинты и сохранение данных в облако или локальное хранилище.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            💾
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Код сохранения (Save Code) и Чекпоинты
            </h3>
            <p class="text-xs text-slate-300">
              Чтобы игрок мог продолжить игру завтра, состояние персонажа сжимается в строку: например, <code class="text-yellow-300 font-mono">LVL3_HP100_COINS45</code>.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-emerald-400 font-bold">Сериализация данных:</div>
          <p class="text-slate-300 text-[11px]">
            Превращение сложных игровых переменных в компактный текст называется <strong>сериализацией</strong> (как JSON в вебе).
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как в ретро-играх и блочных проектах сохраняли прогресс без авторизации в базе данных?',
      options: [
        'Выдавали код сохранения с номером уровня',
        'Просили не выключать приставку никогда',
        'Записывали прогресс на бумагу игроку',
        'Сохраняли прогресс в облаке по интернету'
      ],
      correctIndex: 0,
      explanation: 'Система паролей (Save Codes) кодировала ключевые переменные прогресса в компактный набор букв и цифр.'
    }
  },
  {
    id: 'g5_l18',
    courseId: 'course_grade5',
    module: 'Блок 4: Разработка 2D-платформера: Физика и Игровой движок',
    title: 'Урок 18: Звуковой дизайн и законченный платформер',
    type: 'quiz',
    description: 'Инженерия звука в играх: аудиодорожка фона, звуковые эффекты (SFX), аудиомикшер и предотвращение наложения громких шумов.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-red-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎵
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Звуковой дизайн: Музыка vs Звуковые эффекты (SFX)
            </h3>
            <p class="text-xs text-slate-300">
              Фоновая музыка должна играть в бесконечном цикле без скачков, а звуки прыжков и выстрелов запускаются мгновенно параллельно музыке.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-amber-400 font-bold">Золотое правило громкости:</div>
          <p class="text-slate-300 text-[11px]">
            Фоновая музыка ставится на 30–40% громкости, чтобы звуки прыжков и взрывов были четко слышны игроку.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой блок воспроизведения звука нужно использовать для звука прыжка персонажа, чтобы анимация движения не зависала?',
      options: [
        '«Включить звук»: не останавливает скрипт',
        '«Играть звук до конца»: ждёт окончания',
        '«Остановить все звуки» перед прыжком',
        '«Изменить громкость» во время прыжка'
      ],
      correctIndex: 0,
      explanation: '«Включить звук» позволяет текущему скрипту сразу выполнить следующую команду. «Играть звук до конца» задерживает продолжение этого скрипта до окончания звука.'
    }
  }
];
