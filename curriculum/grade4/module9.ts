import { Task } from '../../types';

export const MODULE9_TASKS: Task[] = [
  {
    id: 'g4_l41',
    courseId: 'course_grade4',
    module: 'Модуль 9: Продвинутая логика и диаграммы',
    title: 'Урок 41: Логика с несколькими входами и в реальном мире',
    type: 'quiz',
    description: 'Стандарты: Exceeds · KZ ЦГ 4.4.1.2. Применение булевой логики в бытовых приборах: микроволновка греет, ТОЛЬКО если дверь закрыта И включен таймер И нажата кнопка «Старт».',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            💡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Логика вокруг нас
            </h3>
            <p class="text-xs text-slate-300">
              Лифт едет, если (двери закрыты) И (нажата кнопка этажа) И (нет перегруза). Это трехвходовый вентиль AND!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое логическое выражение описывает запуск ракеты: «Капитан нажал кнопку И штурман повернул ключ»?',
      options: [
        'кнопка_капитана AND ключ_штурмана',
        'кнопка_капитана OR ключ_штурмана',
        'NOT кнопка_капитана',
        'кнопка_капитана XOR ключ_штурмана'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Слово «И» требует одновременного выполнения обоих условий — логический оператор AND.'
    }
  },
  {
    id: 'g4_l42',
    courseId: 'course_grade4',
    module: 'Модуль 9: Продвинутая логика и диаграммы',
    title: 'Урок 42: Схемы безопасности и логика в коде',
    type: 'circuit_builder',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI6P03 · KZ ЦГ 4.4.1.2. Построй логическую схему лазерной сигнализации хранилища.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-rose-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0">
            🚨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Системы сигнализации
            </h3>
            <p class="text-xs text-slate-300">
              Тревога включается, если (датчик движения сработал) ИЛИ (луч лазера пересечен). Используем вентиль OR!
            </p>
          </div>
        </div>
      </div>
    `,
    circuitConfig: {
      targetGate: 'OR',
      expectedOutput: true
    }
  },
  {
    id: 'g4_l43',
    courseId: 'course_grade4',
    module: 'Модуль 9: Продвинутая логика и диаграммы',
    title: 'Урок 43: Отладка логики и геймдизайн',
    type: 'grid',
    description: 'Стандарты: CSTA 1B-AP-15 · UK KS2 · ACARA AC9TDI6P10 · KZ ЦГ 4.4.1.2. Исправь баг в коде дрона, когда из-за неверного условия он врезается в стену.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-emerald-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0">
            🔍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              Пошаговая отладка (Step by step)
            </h3>
            <p class="text-xs text-slate-300">
              Запусти код мысленно строка за строкой. Где именно персонаж делает неверный шаг? Измени неверную команду на правильную!
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
      obstacles: [[0, 1]]
    }
  },
  {
    id: 'g4_l44',
    courseId: 'course_grade4',
    module: 'Модуль 9: Продвинутая логика и диаграммы',
    title: 'Урок 44: Связь двоичного кода с логикой и чемпионат',
    type: 'binary_switches',
    description: 'Стандарты: Exceeds · KZ Инф 5.2.1.4 · KZ ЦГ 4.4.1.2. Чемпионат по скоростному переводу чисел в двоичный код.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Биты как логические состояния
            </h3>
            <p class="text-xs text-slate-300">
              Бит 1 — это ИСТИНА (True / высокий уровень напряжения). Бит 0 — это ЛОЖЬ (False / отсутствие напряжения).
            </p>
          </div>
        </div>
      </div>
    `,
    binaryConfig: {
      targetNumber: 21,
      bitsCount: 5
    }
  },
  {
    id: 'g4_l45',
    courseId: 'course_grade4',
    module: 'Модуль 9: Продвинутая логика и диаграммы',
    title: 'Урок 45: Знакомство с диаграммами и столбчатые диаграммы',
    type: 'spreadsheet',
    description: 'Стандарты: CSTA 1B-DA-06 · UK KS2 · ACARA AC9TDI6P10 · ABEGS · KZ Инф 7.2.2.3. Построй столбчатую диаграмму популярности школьных кружков.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Визуализация данных
            </h3>
            <p class="text-xs text-slate-300">
              Столбчатая диаграмма (Bar Chart) позволяет за долю секунды сравнить категории по высоте столбиков, не читая длинные списки чисел!
            </p>
          </div>
        </div>
      </div>
    `,
    spreadsheetConfig: {
      tableData: [
        { id: '1', name: 'Робототехника', val1: 25, val2: 5 },
        { id: '2', name: 'Шахматы', val1: 18, val2: 2 },
        { id: '3', name: 'Дизайн', val1: 22, val2: 3 }
      ],
      targetFormula: '=SUM(B1:B3)',
      formulaType: 'sum'
    }
  }
];
