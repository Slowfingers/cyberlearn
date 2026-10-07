import { Task } from '../../types';

export const MODULE3_TASKS: Task[] = [
  {
    id: 'g4_l11',
    courseId: 'course_grade4',
    module: 'Модуль 3: Анимация, звук и событийная модель',
    title: 'Урок 11: Паттерны движения и визуальные эффекты',
    type: 'grid',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI4P03 · KZ ЦГ 1.4.2.1. Изучи траектории движения: зигзаги, отскоки от стен и циклические петли патрулирования.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-pink-950/80 to-purple-950/80 border-2 border-pink-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-2xl shrink-0">
            ✨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-pink-300">
              Паттерны движения спрайтов
            </h3>
            <p class="text-xs text-slate-300">
              Движение объектов создается изменением координат X (горизонталь) и Y (вертикаль). Зигзаг — это чередование шага вправо и шага вниз!
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'drone.move_right()\ndrone.move_down()\ndrone.move_right()\ndrone.move_down()',
    allowedCommands: ['drone.move_right()', 'drone.move_down()', 'drone.move_left()', 'drone.move_up()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [2, 2],
      obstacles: [[0, 1], [1, 2]]
    }
  },
  {
    id: 'g4_l12',
    courseId: 'course_grade4',
    module: 'Модуль 3: Анимация, звук и событийная модель',
    title: 'Урок 12: Анимация и звуковой дизайн',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI4P03 · KZ ЦГ 3.4.2.3 · KZ ЦГ 2.2.4.2. Как покадровая смена костюмов и частота кадров (FPS) создают иллюзию плавного движения.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-violet-950/80 to-indigo-950/80 border-2 border-violet-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-violet-500/20 border border-violet-400 flex items-center justify-center text-2xl shrink-0">
            🎬
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-violet-300">
              Кадры в секунду (FPS) и костюмы
            </h3>
            <p class="text-xs text-slate-300">
              Человеческий глаз воспринимает отдельные картинки как слитное видео при скорости от 24 кадров в секунду (FPS). В играх стандарт — 60 FPS.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что означает сокращение FPS в анимации и играх?',
      options: [
        'Frames Per Second — кадров в секунду',
        'Fast Player Speed — скорость игрока',
        'File Protection System — защита файлов',
        'Final Pixel Shader — обработка пикселей'
      ],
      correctIndex: 0,
      explanation: 'Правильно! FPS — это Frames Per Second (кадры в секунду). FPS показывает число кадров за секунду; плавность также зависит от равномерности их показа.'
    }
  },
  {
    id: 'g4_l13',
    courseId: 'course_grade4',
    module: 'Модуль 3: Анимация, звук и событийная модель',
    title: 'Урок 13: Звуковые эффекты и создание музыки',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI4P03 · KZ ЦГ 2.2.4.2. Цифровой звук: частота дискретизации, громкость, ноты и синхронизация аудиоряда с действиями на экране.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0">
            🎵
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Событийный звук в играх
            </h3>
            <p class="text-xs text-slate-300">
              В хорошей игре каждый прыжок сопровождается свистом, сбор монеты — звоном, а победа — фанфарами. Это называется обратной связью (feedback).
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'В этой игре нажатие клавиши сразу запускает прыжок. Когда должен звучать эффект прыжка?',
      options: [
        'В момент нажатия клавиши прыжка',
        'Один раз в самом начале игры',
        'При закрытии окна игры',
        'Каждую секунду без остановки'
      ],
      correctIndex: 0,
      explanation: 'Точно! Звук привязывается к конкретному событию — нажатию клавиши прыжка игроком.'
    }
  },
  {
    id: 'g4_l14',
    courseId: 'course_grade4',
    module: 'Модуль 3: Анимация, звук и событийная модель',
    title: 'Урок 14: Практический проект по основам',
    type: 'wireframe_builder',
    description: 'Стандарты: CSTA 1B-AP-12 · UK KS2 · ACARA AC9TDI6P10 · KZ ЦГ 3.4.2.2. Собери интерфейс интерактивной мини-игры: холст для героя, счетчик монет и кнопку прыжка.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-green-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🛠️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Прототип игрового экрана (Wireframe)
            </h3>
            <p class="text-xs text-slate-300">
              Перед кодингом геймдизайнер собирает каркас: панель очков наверху, игровую зону в центре и кнопки управления под пальцами игрока.
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
    id: 'g4_l15',
    courseId: 'course_grade4',
    module: 'Модуль 3: Анимация, звук и событийная модель',
    title: 'Урок 15: События и передача сообщений',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-10 · UK KS2 · ACARA AC9TDI6P04 · KZ ЦГ 2.4.2.3. Как работает передача сообщений (broadcast message) между разными спрайтами в проекте.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-amber-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0">
            📡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              События «Разослать сообщение» (Broadcast)
            </h3>
            <p class="text-xs text-slate-300">
              Один спрайт кричит в рупор: «Разослать [Game Over]!». Все остальные спрайты слушают: «Когда я получу [Game Over] — спрятаться и остановиться».
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Зачем спрайту использовать блок «Разослать сообщение», а не просто менять свои координаты?',
      options: [
        'Чтобы запустить код других спрайтов',
        'Чтобы сохранить проект на диск',
        'Чтобы ускорить работу программы',
        'Чтобы спрайт двигался плавнее'
      ],
      correctIndex: 0,
      explanation: 'Именно так! Передача сообщений позволяет разным спрайтам слаженно общаться и реагировать на общие игровые события.'
    }
  }
];
