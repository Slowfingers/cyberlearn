import { Task } from '../../types';

export const MODULE2_TASKS: Task[] = [
  {
    id: 'g4_l6',
    courseId: 'course_grade4',
    module: 'Модуль 2: Алгоритмы, сортировка и блок-схемы',
    title: 'Урок 6: Блок-схемы и псевдокод',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-11 · UK KS2 · ACARA AC9TDI4P02, AC9TDI6P05 · KZ ЦГ 2.4.1.3. Научись изображать логику программ с помощью блоков: овал (начало), ромб (условие) и прямоугольник (действие).',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-emerald-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              Язык блок-схем
            </h3>
            <p class="text-xs text-slate-300">
              Перед написанием кода программисты рисуют схему: <b>Овал</b> — старт/стоп, <b>Прямоугольник</b> — операция/шаг, <b>Ромб</b> — развилка «Да/Нет».
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой геометрической фигурой на блок-схеме обозначается проверка условия (развилка «Если — То»)?',
      options: [
        'Ромб',
        'Прямоугольник',
        'Овал',
        'Параллелограмм'
      ],
      correctIndex: 0,
      explanation: 'Верно! Ромб используется для ветвления алгоритма, из него выходят стрелки «Да» и «Нет».'
    }
  },
  {
    id: 'g4_l7',
    courseId: 'course_grade4',
    module: 'Модуль 2: Алгоритмы, сортировка и блок-схемы',
    title: 'Урок 7: Алгоритмы сортировки — пузырьком и выбором',
    type: 'sorting',
    description: 'Стандарты: CSTA 1B-AP-08 · UK KS2 · ACARA AC9TDI6P03 · KZ Инф 9.3.2.1. Расставь числа по возрастанию методом пузырька (Bubble Sort), сравнивая соседние элементы.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            🫧
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Пузырьковая сортировка (Bubble Sort)
            </h3>
            <p class="text-xs text-slate-300">
              Алгоритм проходит по ряду чисел: если левое число больше правого, они меняются местами. Самые большие числа всплывают в конец, как пузырьки воздуха в воде!
            </p>
          </div>
        </div>
      </div>
    `,
    sortingConfig: {
      numbers: [42, 12, 88, 5, 23],
      algorithm: 'bubble'
    }
  },
  {
    id: 'g4_l8',
    courseId: 'course_grade4',
    module: 'Модуль 2: Алгоритмы, сортировка и блок-схемы',
    title: 'Урок 8: Алгоритмы поиска — линейный и двоичный',
    type: 'tree_search',
    description: 'Стандарты: CSTA 1B-AP-08 · UK KS2 · ACARA AC9TDI6P03 · KZ Инф 8.3.2.1. Найди число в отсортированном дереве двоичным поиском, каждый раз отсекая половину вариантов.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0">
            🔍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Линейный vs Двоичный поиск
            </h3>
            <p class="text-xs text-slate-300">
              Линейный поиск проверяет всё подряд (медленно при миллионе записей). Двоичный поиск смотрит в середину: если искомое число больше — ищем справа, если меньше — слева!
            </p>
          </div>
        </div>
      </div>
    `,
    treeConfig: {
      target: 27,
      tree: {
        value: 20,
        left: { value: 10, left: { value: 5 }, right: { value: 15 } },
        right: { value: 30, left: { value: 27 }, right: { value: 35 } }
      }
    }
  },
  {
    id: 'g4_l9',
    courseId: 'course_grade4',
    module: 'Модуль 2: Алгоритмы, сортировка и блок-схемы',
    title: 'Урок 9: Гонка скоростей алгоритмов',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-08, 1B-IC-18 · UK KS2 · ACARA AC9TDI6P05 · KZ Инф 9.3.2.1. Сравни эффективность и количество шагов при разных объемах данных.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-rose-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0">
            🏎️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Оценка скорости (Сложность алгоритма)
            </h3>
            <p class="text-xs text-slate-300">
              Для поиска в телефонной книге из 1 000 000 контактов линейному поиску может потребоваться 1 000 000 шагов, а бинарному — всего около 20 шагов!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Сколько максимум шагов потребуется бинарному поиску, чтобы угадать число от 1 до 16?',
      options: [
        '4 шага',
        '8 шагов',
        '16 шагов',
        '2 шага'
      ],
      correctIndex: 0,
      explanation: 'Верно! Каждый шаг делит количество вариантов пополам: 16 / 2 = 8, затем 4, затем 2, затем 1. Ровно 4 шага (2^4 = 16)!'
    }
  },
  {
    id: 'g4_l10',
    courseId: 'course_grade4',
    module: 'Модуль 2: Алгоритмы, сортировка и блок-схемы',
    title: 'Урок 10: Повторение Block Studio и мастерство движения',
    type: 'grid',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI4P03 · KZ ЦГ 1.4.2.2. Запрограммируй перемещение дрона к энергоядру, огибая препятствия.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            🤖
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Координаты и точные команды
            </h3>
            <p class="text-xs text-slate-300">
              Компьютер исполняет команды строго по порядку сверху вниз. Используй move_right(), move_down() и jump() для навигации.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'drone.move_down()\ndrone.move_down()\ndrone.move_right()\ndrone.move_right()\ndrone.move_right()',
    allowedCommands: ['drone.move_right()', 'drone.move_down()', 'drone.move_left()', 'drone.move_up()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [3, 2],
      obstacles: [[1, 0], [1, 1], [2, 1]]
    }
  }
];
