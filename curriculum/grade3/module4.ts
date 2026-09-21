import { Task } from '../../types';

export const MODULE4_TASKS: Task[] = [
  {
    id: 'g3_m4_l1',
    courseId: 'course_grade3',
    module: 'Модуль 4: Создаем свою первую игру',
    title: 'Урок 1: Координатная сетка экрана: Оси X и Y',
    type: 'grid',
    description: 'Как компьютер знает, где находится персонаж? Познакомься с горизонтальной осью X и вертикальной осью Y!',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎯
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Координаты экрана: Оси X и Y
            </h3>
            <p class="text-xs text-slate-300">
              Экран любого устройства разбит на пиксели. Каждый объект находится в точке с адресом [X, Y].
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-1">
            <div class="text-cyan-300 font-bold text-sm">↔️ Ось X (Горизонталь)</div>
            <p class="text-slate-300 text-[11px]">Движение влево и вправо. При движении вправо X растет!</p>
          </div>
          <div class="p-3 bg-slate-900 border border-yellow-500/40 rounded-xl space-y-1">
            <div class="text-yellow-300 font-bold text-sm">↕️ Ось Y (Вертикаль)</div>
            <p class="text-slate-300 text-[11px]">Движение вверх и вниз по экрану.</p>
          </div>
        </div>

        <div class="p-2.5 bg-indigo-950/40 border border-indigo-500/40 rounded-lg text-indigo-200">
          🎮 Перемести героя по сетке координат к финишу!
        </div>
      </div>
    `,
    initialCode: `right()\nforward()\nforward()\nleft()\nforward()\nforward()`,
    allowedCommands: ['forward()', 'right()', 'left()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [2, 2],
      obstacles: [[1, 0]]
    }
  },
  {
    id: 'g3_m4_l2',
    courseId: 'course_grade3',
    module: 'Модуль 4: Создаем свою первую игру',
    title: 'Урок 2: Спрайты персонажей: Что такое Sprite',
    type: 'quiz',
    description: 'Узнай, как в программировании называют героев, врагов, деревья и платформы!',
    difficulty: 'Новичок',
    xpReward: 85,
    currencyReward: 20,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-pink-950/60 border border-pink-500/40 rounded-xl">
          <h4 class="font-bold text-pink-300 text-sm mb-1">👾 Спрайт (Sprite) — главный актер игры</h4>
          <p>В геймдеве любой двухмерный графический объект, которым управляет программа, называют <strong>спрайтом</strong>.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1 text-xs">
          <div class="text-cyan-300 font-bold">Примеры спрайтов в игре:</div>
          <ul class="list-disc list-inside text-slate-300 space-y-1 text-[11px]">
            <li>Спрайт главного героя (Марио, Соник).</li>
            <li>Спрайты врагов (грибы, дракончики).</li>
            <li>Спрайты предметов (монетки, аптечки, ключи от дверей).</li>
          </ul>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как разработчики игр называют управляемый 2D-рисунок персонажа или предмета?',
      options: [
        'Спрайт (Sprite)',
        'Пиксель (Pixel)',
        'Скрипт (Script)',
        'Фон (Background)'
      ],
      correctIndex: 0,
      explanation: 'Спрайт — общепринятый термин для двухмерных визуальных объектов в играх!'
    }
  },
  {
    id: 'g3_m4_l3',
    courseId: 'course_grade3',
    module: 'Модуль 4: Создаем свою первую игру',
    title: 'Урок 3: Анимация движения: Кадры и смена костюмов',
    type: 'quiz',
    description: 'Почему нарисованный персонаж начинает бегать, прыгать и махать руками? Секрет 24 кадров в секунду.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-amber-950/60 border border-amber-500/40 rounded-xl">
          <h4 class="font-bold text-amber-300 text-sm mb-1">🏃 Смена костюмов (Кадры анимации)</h4>
          <p>Чтобы герой побежал, художник рисует несколько картинок с разным положением рук и ног:</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <p class="text-slate-300">
            Компьютер переключает картинки-костюмы много раз за секунду (частота кадров — FPS). Наш мозг не успевает заметить смену и видит плавное живое движение!
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'За счет чего в компьютерных играх создается иллюзия плавного бега персонажа?',
      options: [
        'Быстрая смена кадров с разными позами',
        'Картинка плавно растягивается вбок',
        'Фон меняет цвет, персонаж стоит',
        'Экран физически двигается вправо'
      ],
      correctIndex: 0,
      explanation: 'Анимация создается быстрой сменой отдельных кадров (рисунков), похожей на листание блокнота с картинками!'
    }
  },
  {
    id: 'g3_m4_l4',
    courseId: 'course_grade3',
    module: 'Модуль 4: Создаем свою первую игру',
    title: 'Урок 4: Сбор предметов и столкновения (Коллизии)',
    type: 'grid',
    description: 'Как игра понимает, что герой коснулся монетки? Напиши алгоритм сбора сокровищ в лабиринте!',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-teal-950/60 border border-teal-500/40 rounded-xl">
          <h4 class="font-bold text-teal-300 text-sm mb-1">💥 Детектор столкновений (Collision Detection)</h4>
          <p>Каждую миллисекунду движок игры проверяет, не пересеклись ли координаты героя и кристалла. При касании начисляются очки!</p>
        </div>
      </div>
    `,
    initialCode: `right()\nforward()\nleft()\nforward()\nforward()\nright()\nforward()`,
    allowedCommands: ['forward()', 'right()', 'left()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 1],
      end: [2, 3],
      obstacles: [[1, 1]]
    }
  },
  {
    id: 'g3_m4_l5',
    courseId: 'course_grade3',
    module: 'Модуль 4: Создаем свою первую игру',
    title: 'Урок 5: Переменная счета: Очки и монетки (Score)',
    type: 'quiz',
    description: 'Что такое переменная? Как компьютер запоминает, сколько очков или жизней набрал игрок?',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border border-blue-500/40 rounded-xl">
          <h4 class="font-bold text-blue-300 text-sm mb-1">📦 Переменная — это именованная коробочка</h4>
          <p>В коде переменную можно представить как коробку с наклейкой. На наклейке написано имя: <code>score</code>, а внутри лежит число: <code>100</code>.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1 text-xs">
          <p class="text-slate-300">Каждый раз, когда герой подбирает монету, код прибавляет к переменной число: <code>score = score + 10</code>.</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что делает команда «score = score + 10» в коде игры?',
      options: [
        'Прибавляет к счёту 10 очков',
        'Делает счёт равным 10',
        'Умножает счёт на 10',
        'Отнимает от счёта 10 очков'
      ],
      correctIndex: 0,
      explanation: 'Команда берет текущее значение счета, прибавляет 10 и сохраняет новое число обратно в переменную score!'
    }
  },
  {
    id: 'g3_m4_l6',
    courseId: 'course_grade3',
    module: 'Модуль 4: Создаем свою первую игру',
    title: 'Урок 6: Игровой цикл, таймер и условия победы',
    type: 'quiz',
    description: 'Как работают экраны Победы (Victory) и Поражения (Game Over)? Изучаем правила завершения раунда.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-purple-950/80 border border-red-500/40 rounded-xl">
          <h4 class="font-bold text-red-300 text-sm mb-1">⏱️ Условия окончания игры</h4>
          <p>В любой игре есть правила финала:</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div class="p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded-lg">
            <strong class="text-emerald-300">Победа (Victory):</strong> дошел до финиша или собрал все ключи.
          </div>
          <div class="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-lg">
            <strong class="text-rose-300">Поражение (Game Over):</strong> жизни кончились или истек таймер.
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое условие обычно приводит к экрану Game Over в гонках на время?',
      options: [
        'Таймер дошёл до нуля раньше финиша',
        'Игрок нажал на педаль газа',
        'Машина обогнала соперника',
        'Игрок собрал все монетки'
      ],
      correctIndex: 0,
      explanation: 'Когда таймер доходит до нуля, а цель не достигнута — срабатывает условие поражения!'
    }
  },
  {
    id: 'g3_m4_l7',
    courseId: 'course_grade3',
    module: 'Модуль 4: Создаем свою первую игру',
    title: 'Урок 7: Экзамен модуля: Юный разработчик игр (GameDev)',
    type: 'quiz',
    description: 'Итоговый зачет по геймдеву: координаты X/Y, спрайты, анимация, коллизии и переменные счета!',
    difficulty: 'Хакер',
    xpReward: 130,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border border-purple-500/50 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">🎮 Финал Модуля 4</h4>
          <p>Ты изучил основы создания видеоигр: от систем координат экрана до анимации персонажей и логики очков. Вперед к победе!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какая ось координат отвечает за перемещение игрока влево и вправо по горизонтали?',
      options: [
        'Ось X',
        'Ось Y',
        'Ось Z',
        'Ось времени'
      ],
      correctIndex: 0,
      explanation: 'Горизонтальная ось — это ось X! По ней персонажи бегают вперед и назад.'
    }
  }
];
