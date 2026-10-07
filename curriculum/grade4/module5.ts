import { Task } from '../../types';

export const MODULE5_TASKS: Task[] = [
  {
    id: 'g4_l21',
    courseId: 'course_grade4',
    module: 'Модуль 5: Данные, списки и геймдизайн',
    title: 'Урок 21: Булева логика и случайность',
    type: 'circuit_builder',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI6P03 · KZ ЦГ 4.4.1.2. Булевы значения (ИСТИНА/ЛОЖЬ), логическое И (AND), ИЛИ (OR) и генератор случайных чисел (random).',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-green-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🎲
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Логика и рандом
            </h3>
            <p class="text-xs text-slate-300">
              Вентиль <b>И (AND)</b> загорается, только когда ОБА условия верны (есть ключ И нажат рычаг). Функция <code class="text-yellow-300">random(1, 6)</code> бросает виртуальный игровой кубик!
            </p>
          </div>
        </div>
      </div>
    `,
    circuitConfig: {
      targetGate: 'AND',
      expectedOutput: true
    }
  },
  {
    id: 'g4_l22',
    courseId: 'course_grade4',
    module: 'Модуль 5: Данные, списки и геймдизайн',
    title: 'Урок 22: Переменные и системы очков',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-09 · UK KS2 · ACARA AC9TDI6P04 · KZ ЦГ 4.4.2.1. Инициализация переменной, увеличение значения на 1 (инкремент) и сохранение рекорда.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0">
            📦
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Переменная — подписанная коробка
            </h3>
            <p class="text-xs text-slate-300">
              Переменная хранит значение, которое может меняться: <code class="text-cyan-300 font-mono">score = score + 10</code>. В начале раунда важно не забывать обнулять счёт (<code class="text-yellow-300 font-mono">score = 0</code>)!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'В игре уже есть набранные очки. Что произойдёт при новом раунде в той же программе, если не выполнить «очки = 0»?',
      options: [
        'Новая игра начнётся со старыми очками',
        'Игра не сможет запуститься вообще',
        'Очки всегда будут показывать ноль',
        'Программа выдаст ошибку при старте'
      ],
      correctIndex: 0,
      explanation: 'Верно! Это классический баг новичков: переменные обязательно нужно инициализировать (задавать стартовое значение) при перезапуске!'
    }
  },
  {
    id: 'g4_l23',
    courseId: 'course_grade4',
    module: 'Модуль 5: Данные, списки и геймдизайн',
    title: 'Урок 23: Таймеры и знакомство со списками',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-09 · UK KS2 · ACARA AC9TDI6P04 · KZ Инф 9.3.3.1. Обратный отсчет времени и структура данных «Список» (массив) для хранения инвентаря.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            📜
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Списки (Массивы предметов)
            </h3>
            <p class="text-xs text-slate-300">
              Список — это цепочка ячеек под одним именем: <code class="text-emerald-300 font-mono">inventory = ["Меч", "Зелье", "Щит"]</code>. Можно добавлять новые вещи в конец списка!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой элемент окажется первым в списке inventory = ["Факел", "Ключ", "Яблоко"]?',
      options: [
        'Факел',
        'Ключ',
        'Яблоко',
        'Список пуст'
      ],
      correctIndex: 0,
      explanation: 'Именно так! Элементы в списке идут строго по порядку, и первый предмет — "Факел".'
    }
  },
  {
    id: 'g4_l24',
    courseId: 'course_grade4',
    module: 'Модуль 5: Данные, списки и геймдизайн',
    title: 'Урок 24: Операции со списками и практика с данными',
    type: 'spreadsheet',
    description: 'Стандарты: CSTA 1B-AP-09 · UK KS2 · ACARA AC9TDI6P04 · KZ Инф 9.3.3.1. Подсчет общей суммы предметов в инвентаре с помощью формулы СУММ (SUM).',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-emerald-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              Суммирование данных
            </h3>
            <p class="text-xs text-slate-300">
              Компьютерные базы данных и электронные таблицы умеют мгновенно суммировать сотни строк. Формула <code class="text-cyan-300 font-mono">=SUM(A1:A5)</code> складывает все числа диапазона!
            </p>
          </div>
        </div>
      </div>
    `,
    spreadsheetConfig: {
      tableData: [
        { id: '1', name: 'Золотые монеты', val1: 15, val2: 10 },
        { id: '2', name: 'Кристаллы', val1: 20, val2: 5 },
        { id: '3', name: 'Эликсиры', val1: 5, val2: 5 }
      ],
      targetFormula: '=SUM(C1:C3)',
      formulaType: 'sum'
    }
  },
  {
    id: 'g4_l25',
    courseId: 'course_grade4',
    module: 'Модуль 5: Данные, списки и геймдизайн',
    title: 'Урок 25: Веселье в играх и дизайн управления',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-IC-19, 1B-AP-13 · UK KS2 · ACARA AC9TDI6P10 · KZ Инф 7.4.1.1. Что делает управление отзывчивым: инерция, задержка ввода (input lag) и доступность для игроков.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            🎮
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Геймдизайн и эргономика
            </h3>
            <p class="text-xs text-slate-300">
              Если герой реагирует на кнопку с задержкой в полсекунды, играть неприятно. Хороший геймдизайнер тестирует физику движения, пока прыжок не станет идеальным!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой вариант описывает отзывчивость управления — одну из составляющих Game Feel?',
      options: [
        'Насколько отзывчиво управление игрой',
        'Насколько красивая графика в игре',
        'Сколько места игра занимает на диске',
        'Как быстро игра загружается'
      ],
      correctIndex: 0,
      explanation: 'Именно так! Game Feel — это гармония управления, анимаций и звука, создающая удовольствие от каждого действия в игре.'
    }
  }
];
