import { Task } from '../../types';

export const MODULE12_TASKS: Task[] = [
  {
    id: 'g4_l56',
    courseId: 'course_grade4',
    module: 'Модуль 12: Алгоритмический турнир и цифровое искусство',
    title: 'Урок 56: Чемпионат по алгоритмам',
    type: 'grid',
    description: 'Стандарты: CSTA 1B-AP-08 · ACARA AC9TDI6P03 · KZ Инф 9.3.2.1. Финальное испытание олимпиадного уровня: напиши кратчайший маршрут обхода лабиринта.',
    difficulty: 'Элита',
    xpReward: 140,
    currencyReward: 45,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            🥇
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Олимпиадный уровень
            </h3>
            <p class="text-xs text-slate-300">
              На чемпионате ценится не просто работающий код, а минимальное число инструкций и максимальная скорость исполнения!
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'for i in range(2):\n    drone.jump()',
    allowedCommands: ['for i in range(3):', 'drone.move_right()', 'drone.move_down()', 'drone.jump()', 'drone.move_left()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [4, 0],
      obstacles: [[1, 0], [3, 0]]
    }
  },
  {
    id: 'g4_l57',
    courseId: 'course_grade4',
    module: 'Модуль 12: Алгоритмический турнир и цифровое искусство',
    title: 'Урок 57: Цифровое искусство и геометрические узоры',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-12, 1B-IC-19 · UK KS2 · ACARA AC9TDI6P10 · KZ Инф 5.2.2.2. Генеративное искусство и фракталы: как с помощью цикла и поворота угла нарисовать снежинку Коха или спираль.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-pink-950/80 to-purple-950/80 border-2 border-pink-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-2xl shrink-0">
            🎨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-pink-300">
              Черепашья графика (Turtle Art)
            </h3>
            <p class="text-xs text-slate-300">
              Исполнитель «Перо» идет вперед и поворачивает на заданный угол. Квадрат: 4 раза (вперед 100, вправо на 90°). Правильный шестиугольник: 6 раз с поворотом на 60°!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'На какой угол нужно поворачивать перо каждый раз в цикле из 4 шагов, чтобы нарисовать квадрат?',
      options: [
        'На 90 градусов',
        'На 45 градусов',
        'На 180 градусов',
        'На 360 градусов'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Полный оборот — 360°. Для 4 сторон квадрата: 360 / 4 = 90°.'
    }
  },
  {
    id: 'g4_l58',
    courseId: 'course_grade4',
    module: 'Модуль 12: Алгоритмический турнир и цифровое искусство',
    title: 'Урок 58: Пиксель-арт и дизайн инфографики',
    type: 'wireframe_builder',
    description: 'Стандарты: CSTA 1B-DA-06, 1B-IC-19 · UK KS2 · ACARA AC9TDI6P10 · KZ Инф 5.2.2.2. Разрешение экрана, пиксельная сетка (16x16, 32x32) и контраст цветов.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-emerald-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0">
            👾
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              Пиксель-арт (Pixel Art)
            </h3>
            <p class="text-xs text-slate-300">
              Каждый персонаж в ретро-играх нарисован по пикселям в ограниченной палитре цветов. Чистый силуэт и яркий контраст делают героя узнаваемым с первого взгляда.
            </p>
          </div>
        </div>
      </div>
    `,
    wireframeConfig: {
      requiredElements: ['header', 'canvas', 'controls']
    }
  },
  {
    id: 'g4_l59',
    courseId: 'course_grade4',
    module: 'Модуль 12: Алгоритмический турнир и цифровое искусство',
    title: 'Урок 59: Принципы анимации',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI4P03. 12 принципов диснеевской анимации: сжатие и растяжение (Squash & Stretch), подготовка к действию (Anticipation) и плавный замах.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-violet-950/80 to-purple-950/80 border-2 border-violet-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-400 flex items-center justify-center text-2xl shrink-0">
            🎞️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-violet-300">
              Сжатие и растяжение (Squash & Stretch)
            </h3>
            <p class="text-xs text-slate-300">
              Когда резиновый мяч ударяется о пол, он сжимается по вертикали и расширяется в стороны. Это придает анимации ощущение массы и живости!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Зачем аниматоры слегка сжимают персонажа перед прыжком вверх?',
      options: [
        'Это подготовка к прыжку (Anticipation)',
        'Так файл анимации весит меньше',
        'Так экономится заряд батареи',
        'Так персонаж кажется выше ростом'
      ],
      correctIndex: 0,
      explanation: 'Точно! Присед перед прыжком делает движение физически реалистичным и понятным для зрителя.'
    }
  },
  {
    id: 'g4_l60',
    courseId: 'course_grade4',
    module: 'Модуль 12: Алгоритмический турнир и цифровое искусство',
    title: 'Урок 60: Творческое портфолио',
    type: 'html',
    description: 'Стандарты: CSTA 1B-AP-17, 1B-IC-21 · UK KS2 · ACARA AC9TDI6P10. Создание веб-страницы портфолио с демонстрацией лучших проектов 4 класса.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            📁
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Цифровое портфолио
            </h3>
            <p class="text-xs text-slate-300">
              Портфолио — визитная карточка разработчика. Напиши свое имя, прикрепи скриншоты игр и поделись гордостью за свои достижения!
            </p>
          </div>
        </div>
      </div>
    `,
    htmlConfig: {
      targetTag: 'h1',
      targetStyle: 'color: lime;'
    },
    initialCode: '<h1>Портфолио ученика 4 класса</h1>\n<p>Мои лучшие игры и программы</p>'
  }
];
