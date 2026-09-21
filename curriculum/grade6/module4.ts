import { Task } from '../../types';

export const MODULE4_TASKS: Task[] = [
  {
    id: 'g6_m4_l1',
    courseId: 'course_grade6',
    module: 'Блок 4: От Блоков к Python и Геймдеву',
    title: 'Урок 1: Архитектура видеоигр: Игровой цикл 60 FPS и Хитбоксы',
    type: 'quiz',
    description: 'Узнай, как устроены игровые движки изнутри: Game Loop, расчет физики, обнаружение коллизий и частота кадров.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎮
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Анатомия Game Engine: Главный игровой цикл
            </h3>
            <p class="text-xs text-slate-300">
              Любая игра — от тетриса до Cyberpunk — работает внутри бесконечного цикла <strong>Game Loop</strong>, который повторяется 60 раз в секунду (60 FPS).
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-2.5 text-xs font-mono">
          <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl">
            <div class="text-cyan-400 font-bold mb-1 font-sans">1. Ввод (Input)</div>
            Считывание нажатий клавиш, кнопок геймпада и координат курсора мыши.
          </div>
          <div class="p-3 bg-slate-900 border border-emerald-500/40 rounded-xl">
            <div class="text-emerald-400 font-bold mb-1 font-sans">2. Физика (Update)</div>
            Расчет гравитации, скоростей и столкновения невидимых рамок — хитбоксов (Hitbox).
          </div>
          <div class="p-3 bg-slate-900 border border-pink-500/40 rounded-xl">
            <div class="text-pink-400 font-bold mb-1 font-sans">3. Отрисовка (Render)</div>
            Видеокарта рисует готовый кадр пикселей на дисплей монитора.
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что такое "Хитбокс" (Hitbox) в программировании видеоигр?',
      options: [
        'Невидимая фигура для проверки столкновений',
        'Ящик с наградой, который покупают за донат',
        'Звук при попадании по противнику',
        'Клавиша удара на геймпаде игрока'
      ],
      correctIndex: 0,
      explanation: 'Хитбоксы — упрощенные невидимые прямоугольники или круги. Проверять пересечение простых прямоугольников в математике гораздо быстрее, чем сложные 3D-модели!'
    }
  },
  {
    id: 'g6_m4_l2',
    courseId: 'course_grade6',
    module: 'Блок 4: От Блоков к Python и Геймдеву',
    title: 'Урок 2: Основы синтаксиса Python: Переменные, Типы данных и Отступы',
    type: 'quiz',
    description: 'Переход от визуальных блоков Scratch к текстовому программированию на языке Python: золотое правило 4 пробелов и типизация.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-emerald-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🐍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Python: Язык инженеров и создателей ИИ
            </h3>
            <p class="text-xs text-slate-300">
              В отличие от языков C++ или Java, в Python нет фигурных скобок <code>{ }</code> для блоков кода. Вся структура строится на <strong>отступах</strong>!
            </p>
          </div>
        </div>

        <div class="bg-black/80 p-4 border border-yellow-500/40 rounded-xl font-mono text-xs space-y-1">
          <div class="text-slate-500"># Пример условия в Python:</div>
          <div><span class="text-cyan-300">score</span> = <span class="text-purple-300">100</span></div>
          <div><span class="text-yellow-400 font-bold">if</span> score &gt;= <span class="text-purple-300">100</span>:</div>
          <div class="pl-4 text-emerald-400">print("Новый рекорд!") &nbsp;# &lt;-- строго 4 пробела отступа!</div>
          <div><span class="text-yellow-400 font-bold">else</span>:</div>
          <div class="pl-4 text-red-400">print("Продолжай тренировки")</div>
        </div>

        <div class="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs space-y-1">
          <div class="text-amber-300 font-bold">⚠️ Ошибка IndentationError:</div>
          <p class="text-slate-300">
            Если случайно пропустить пробелы внутри блока <code>if</code> или <code>for</code>, интерпретатор Python не сможет выполнить код и выдаст ошибку отступа!
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как в языке Python выделяются блоки кода внутри условий "if" и циклов "for"?',
      options: [
        'Отступами в начале строки',
        'Фигурными скобками { }',
        'Словами begin и end',
        'Точкой с запятой в конце'
      ],
      correctIndex: 0,
      explanation: 'Главное отличие синтаксиса Python — отступы являются частью грамматики языка, делая код чистым и легко читаемым.'
    }
  },
  {
    id: 'g6_m4_typing',
    courseId: 'course_grade6',
    module: 'Блок 4: От Блоков к Python и Геймдеву',
    title: 'Урок 3: Синтаксический тренажер: Циклы и операторы Python',
    type: 'typing',
    description: 'Натренируй мышечную память для набора циклов со счетчиком range() и арифметических проверок деления с остатком %!',
    difficulty: 'Новичок',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⌨️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Цикл for i in range() и остаток от деления %
            </h3>
            <p class="text-xs text-slate-300">
              Конструкция <code>for i in range(10)</code> повторяет тело цикла 10 раз со значениями <code>i</code> от 0 до 9.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl text-xs font-mono space-y-1 text-slate-300">
          <div class="text-yellow-400">target text:</div>
          <div class="text-emerald-400 font-bold">for i in range(10): if i % 2 == 0: total += i</div>
        </div>
      </div>
    `,
    typingConfig: {
      targetText: 'for i in range(10): if i % 2 == 0: total += i'
    }
  },
  {
    id: 'g6_m4_grid1',
    courseId: 'course_grade6',
    module: 'Блок 4: От Блоков к Python и Геймдеву',
    title: 'Урок 4: Алгоритм автономного дрона: Навигация и лазерный импульс',
    type: 'grid',
    description: 'Напиши программу управления разведывательным дроном: подлети к файрволу, деактивируй его импульсом attackRight() и доберись до финиша!',
    difficulty: 'Хакер',
    xpReward: 140,
    currencyReward: 55,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🛸
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Команды API автономного дрона
            </h3>
            <p class="text-xs text-slate-300">
              Дрон слушается твоих программных команд: перемещение по координатной сетке и деактивация защитных барьеров.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono">
          <div class="p-2 bg-slate-900 border border-slate-700 rounded">
            <span class="text-cyan-400 font-bold">drone.moveRight()</span> — шаг вправо
          </div>
          <div class="p-2 bg-slate-900 border border-slate-700 rounded">
            <span class="text-red-400 font-bold">drone.attackRight()</span> — лазер вправо
          </div>
        </div>
      </div>
    `,
    initialCode: '# 1. Подлети к препятствию\ndrone.moveRight()\n# 2. Выстрели лазером\ndrone.attackRight()\n# 3. Двигайся к финишу\nfor i in range(3):\n    drone.moveRight()',
    allowedCommands: ['drone.moveRight()', 'drone.moveLeft()', 'drone.moveDown()', 'drone.moveUp()', 'drone.attackRight()', 'drone.jump()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 2],
      end: [4, 2],
      obstacles: [[2, 2]]
    }
  },
  {
    id: 'g6_m4_grid2',
    courseId: 'course_grade6',
    module: 'Блок 4: От Блоков к Python и Геймдеву',
    title: 'Урок 5: Сложный лабиринт с препятствиями: Прыжки и циклы дрона',
    type: 'grid',
    description: 'Продвинутая миссия дрона: обойди силовые поля, используя прыжки через препятствия и точные повороты маршрута!',
    difficulty: 'Элита',
    xpReward: 160,
    currencyReward: 70,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-red-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎯
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Тактическое маневрирование: drone.jump()
            </h3>
            <p class="text-xs text-slate-300">
              Команда <code>drone.jump()</code> позволяет дрону перепрыгнуть через препятствие прямо по направлению движения.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-amber-500/40 rounded-xl text-xs space-y-1">
          <div class="text-amber-300 font-bold">Спланируй алгоритм:</div>
          <p class="text-slate-300">
            Изучи расположение препятствий на 5x5 сетке и составь оптимальную последовательность команд до зеленого сектора финиша.
          </p>
        </div>
      </div>
    `,
    initialCode: 'drone.moveRight()\ndrone.jump()\ndrone.moveRight()',
    allowedCommands: ['drone.moveRight()', 'drone.moveLeft()', 'drone.moveDown()', 'drone.moveUp()', 'drone.attackRight()', 'drone.jump()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 1],
      end: [4, 1],
      obstacles: [[2, 1], [3, 2]]
    }
  }
];
