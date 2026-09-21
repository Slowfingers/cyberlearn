import { Task } from '../../types';

export const MODULE8_TASKS: Task[] = [
  {
    id: 'g4_l36',
    courseId: 'course_grade4',
    module: 'Модуль 8: Искусственный интеллект и логика',
    title: 'Урок 36: Обучение ИИ и его ограничения',
    type: 'ai_kids_trainer',
    description: 'Стандарты: CSTA 1B-IC-18 · MIL. Натренируй модель распознавать роботов и яблоки по обучающей выборке признаков.',
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
              Как учится нейросеть
            </h3>
            <p class="text-xs text-slate-300">
              ИИ не обладает сознанием. Он ищет математические шаблоны в миллионах примеров с метками. Чем чище обучающие данные, тем умнее модель!
            </p>
          </div>
        </div>
      </div>
    `,
    aiTrainerConfig: {
      targetClass: 'robot',
      samplesNeeded: 3
    }
  },
  {
    id: 'g4_l37',
    courseId: 'course_grade4',
    module: 'Модуль 8: Искусственный интеллект и логика',
    title: 'Урок 37: Применение ИИ и справедливость',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-IC-18, 1B-IC-20 · UK KS2 · AI4K12-aligned. Смещение данных (Bias), галлюцинации нейросетей и этика использования ИИ в учебе.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-pink-950/80 to-rose-950/80 border-2 border-pink-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-2xl shrink-0">
            ⚖️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-pink-300">
              Справедливость и проверка фактов
            </h3>
            <p class="text-xs text-slate-300">
              Нейросети иногда уверенно «выдумывают» несуществующие факты и даты (галлюцинации). Не списывай слепо — всегда перепроверяй ответы ИИ в книгах и энциклопедиях!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что нужно делать с текстом или докладом, сгенерированным языковой нейросетью?',
      options: [
        'Прочитать, проверить факты, переписать',
        'Скопировать как есть: ИИ не ошибается',
        'Сдать без чтения: экономия времени',
        'Перевести текст на другой язык'
      ],
      correctIndex: 0,
      explanation: 'Верно! ИИ — отличный помощник для поиска идей, но ответственность за точность знаний всегда лежит на человеке.'
    }
  },
  {
    id: 'g4_l38',
    courseId: 'course_grade4',
    module: 'Модуль 8: Искусственный интеллект и логика',
    title: 'Урок 38: Итоговый проект 4 класса',
    type: 'grid',
    description: 'Стандарты: CSTA 1B-AP-12, 1B-AP-17 · UK KS2 · ACARA AC9TDI6P10 · KZ ЦГ 4.4.2.2. Комплексный проект: объедини циклы, условия и навигацию по карте.',
    difficulty: 'Хакер',
    xpReward: 150,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            🏆
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Финальный проект года
            </h3>
            <p class="text-xs text-slate-300">
              Ты преодолел весь путь начальной школы по программированию! Напиши идеальный алгоритм прохождения сложного лабиринта кибердеки.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'drone.jump()\ndrone.move_right()\nfor i in range(2):\n    drone.move_down()',
    allowedCommands: ['for i in range(2):', 'drone.move_right()', 'drone.move_down()', 'drone.jump()', 'drone.move_left()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [3, 2],
      obstacles: [[1, 0], [2, 1], [1, 2]]
    }
  },
  {
    id: 'g4_l39',
    courseId: 'course_grade4',
    module: 'Модуль 8: Искусственный интеллект и логика',
    title: 'Урок 39: Рефлексия и анонс 5 класса',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-17. Подведение итогов учебного года и взгляд в будущее: что ждет юных программистов в 5 классе.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🎓
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Поздравляем с переходом на новый уровень!
            </h3>
            <p class="text-xs text-slate-300">
              В 5 классе тебя ждут настоящие текстовые скрипты на Python, работа с базами данных, веб-дизайн и углубленная схемотехника!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой главный навык программиста помогает справиться со сложной задачей любого уровня?',
      options: [
        'Декомпозиция: разбить задачу на шаги',
        'Скорость печати на клавиатуре',
        'Знание наизусть всех команд языка',
        'Умение быстро искать готовый код'
      ],
      correctIndex: 0,
      explanation: 'Великолепно! Декомпозиция — суперсила любого инженера и программиста во всем мире!'
    }
  },
  {
    id: 'g4_l40',
    courseId: 'course_grade4',
    module: 'Модуль 8: Искусственный интеллект и логика',
    title: 'Урок 40: Повторение логических элементов и их комбинации',
    type: 'circuit_builder',
    description: 'Стандарты: Exceeds · KZ ЦГ 4.4.1.2. Продвинутая цифровая схемотехника: объединение вентилей И (AND), ИЛИ (OR) и НЕ (NOT).',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0">
            🔌
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Комбинационная логика
            </h3>
            <p class="text-xs text-slate-300">
              Внутри процессора миллиарды транзисторов образуют логические цепочки: сигнал проходит через отрицание (NOT), затем через вентиль OR.
            </p>
          </div>
        </div>
      </div>
    `,
    circuitConfig: {
      targetGate: 'OR',
      expectedOutput: true
    }
  }
];
