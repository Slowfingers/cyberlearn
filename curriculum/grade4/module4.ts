import { Task } from '../../types';

export const MODULE4_TASKS: Task[] = [
  {
    id: 'g4_l16',
    courseId: 'course_grade4',
    module: 'Модуль 4: Циклы, ветвления и интерактив',
    title: 'Урок 16: Тайминг и циклы с повторением',
    type: 'grid',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI6P04 · KZ ЦГ 3.4.1.1. Замени повторяющиеся одинаковые строчки кода циклом «повторить N раз».',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0">
            🔁
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Цикл со счетчиком (Repeat N times)
            </h3>
            <p class="text-xs text-slate-300">
              Вместо 4 строк move_right() пиши: <code class="text-yellow-300 font-mono">for i in range(4): drone.move_right()</code>. Код короче, чище и не содержит опечаток!
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'for i in range(3):\n    drone.move_right()\ndrone.move_down()',
    allowedCommands: ['for i in range(3):', 'drone.move_right()', 'drone.move_down()', 'drone.move_left()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [3, 1],
      obstacles: [[1, 1], [2, 1]]
    }
  },
  {
    id: 'g4_l17',
    courseId: 'course_grade4',
    module: 'Модуль 4: Циклы, ветвления и интерактив',
    title: 'Урок 17: Бесконечные циклы и условия',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI6P03 · KZ ЦГ 3.4.1.2. Как работает главный игровой цикл (Game Loop) «Всегда / Повторять всегда» и почему внутри него обязательна пауза (wait/delay).',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-teal-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0">
            ♾️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Игровой цикл (Game Loop)
            </h3>
            <p class="text-xs text-slate-300">
              Любая игра постоянно крутит цикл: 1) считать нажатия кнопок, 2) рассчитать физику, 3) нарисовать кадр на экране.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что произойдет, если в бесконечном цикле while True не сделать небольшую паузу (тайминг)?',
      options: [
        'Процессор загрузится на 100%, игра зависнет',
        'Персонаж станет двигаться медленнее',
        'Цикл автоматически остановится сам',
        'Программа выдаст ошибку компиляции'
      ],
      correctIndex: 0,
      explanation: 'Верно! Бесконечный цикл без задержки начинает молотить миллиарды раз в секунду и подвешивает систему. Тайминг кадров (например, 60 FPS) жизненно необходим!'
    }
  },
  {
    id: 'g4_l18',
    courseId: 'course_grade4',
    module: 'Модуль 4: Циклы, ветвления и интерактив',
    title: 'Урок 18: Если-иначе и вложенная логика',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI6P03 · KZ ЦГ 2.4.1.1 · KZ Инф 7.3.3.2. Конструкция if-elif-else: проверка здоровья, ключей от дверей и счета игрока.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🔀
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Ветвление ЕСЛИ — ИНАЧЕ
            </h3>
            <p class="text-xs text-slate-300">
              <code class="text-cyan-300">ЕСЛИ (ключ == 1) ТО открыть_дверь() ИНАЧЕ сказать("Дверь заперта!")</code>. Компьютер делает осознанный выбор на основе данных!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое действие выполнится при коде: if score >= 10: win() else: continueGame(), если score равен 7?',
      options: [
        'continueGame()',
        'win()',
        'Оба действия по очереди',
        'Ни одно: будет ошибка'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Так как 7 меньше 10, условие ложно, и выполняется ветка else — продолжение игры!'
    }
  },
  {
    id: 'g4_l19',
    courseId: 'course_grade4',
    module: 'Модуль 4: Циклы, ветвления и интерактив',
    title: 'Урок 19: Столкновения и определение положения',
    type: 'grid',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI6P04 · KZ ЦГ 3.4.2.1. Определение касания стен (Hitbox / Bounding Box) и сбор бонусов при совпадении координат.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-orange-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            💥
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Коллизии и хитбоксы
            </h3>
            <p class="text-xs text-slate-300">
              Хитбокс — это невидимый прямоугольник вокруг спрайта. Когда хитбокс героя пересекается с хитбоксом монеты, вызывается обработчик сбора!
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'drone.move_down()\ndrone.move_right()\ndrone.move_right()',
    allowedCommands: ['drone.move_right()', 'drone.move_down()', 'drone.move_left()', 'drone.move_up()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [2, 1],
      obstacles: [[1, 0], [1, 2]]
    }
  },
  {
    id: 'g4_l20',
    courseId: 'course_grade4',
    module: 'Модуль 4: Циклы, ветвления и интерактив',
    title: 'Урок 20: Ввод пользователя и математические операции',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-09, 1B-AP-10 · UK KS2 · ACARA AC9TDI6P04 · KZ ЦГ 2.4.2.3. Считывание ответа пользователя (input/prompt), преобразование в число и выполнение расчетов.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            🧮
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Ввод данных и вычисления
            </h3>
            <p class="text-xs text-slate-300">
              Команда <code class="text-cyan-300 font-mono">ask("Сколько монет?")</code> сохраняет введенное число в память, чтобы программа могла умножить его или прибавить к балансу!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Игрок собрал 3 сундука по 5 монет в каждом. Какая формула правильно вычислит общий заработок?',
      options: [
        '3 * 5 = 15',
        '3 + 5 = 8',
        '5 - 3 = 2',
        '15 / 3 = 5'
      ],
      correctIndex: 0,
      explanation: 'Точно! Количество сундуков умножается на количество монет в сундуке: 3 * 5 = 15 монет.'
    }
  }
];
