import { Task } from '../../types';

export const MODULE9_TASKS: Task[] = [
  {
    id: 'g3_m9_l1',
    courseId: 'course_grade3',
    module: 'Модуль 9: Конструктор приложений (Вайрфреймы)',
    title: 'Урок 1: Введение в интерфейсы: Что такое UI и UX дизайн',
    type: 'quiz',
    description: 'Почему одни приложения понятны с первой секунды, а в других легко запутаться? Секреты крутого интерфейса.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Две половинки дизайна: UI и UX
            </h3>
            <p class="text-xs text-slate-300">
              Создатели приложений делят свою работу на красоту (UI) и удобство (UX).
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-1">
            <strong class="text-cyan-300">UI (Внешний вид):</strong> закругленные кнопки, цвета, шрифты и иконки.
          </div>
          <div class="p-3 bg-slate-900 border border-yellow-500/40 rounded-xl space-y-1">
            <strong class="text-yellow-300">UX (Удобство):</strong> логика, понятные переходы, легкость использования.
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'За что отвечает UX-дизайнер при создании мобильной игры?',
      options: [
        'За удобство и понятность для игрока',
        'За красоту картинок и подбор цветов',
        'За скорость работы программы',
        'За музыку и звуковые эффекты'
      ],
      correctIndex: 0,
      explanation: 'UX (User Experience) отвечает за то, чтобы игроку было легко, приятно и понятно пользоваться игрой!'
    }
  },
  {
    id: 'g3_m9_l2',
    courseId: 'course_grade3',
    module: 'Модуль 9: Конструктор приложений (Вайрфреймы)',
    title: 'Урок 2: Вайрфрейм: Архитектура экрана смартфона',
    type: 'wireframe_builder',
    description: 'Собери чертеж интерфейса приложения из блоков: Шапка, Баннер, Кнопка действия и Подвал!',
    difficulty: 'Новичок',
    xpReward: 120,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-blue-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📱
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Что такое Вайрфрейм (Wireframe)?
            </h3>
            <p class="text-xs text-slate-300">
              Вайрфрейм — это каркас или чертеж будущего приложения до того, как его раскрасят художники!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1.5 text-xs">
          <div class="text-yellow-300 font-bold">4 этажа экрана:</div>
          <p class="text-slate-300 text-[11px]">1. <strong>Header:</strong> шапка с аватаром и монетами.</p>
          <p class="text-slate-300 text-[11px]">2. <strong>Hero:</strong> баннер игры или статус уровня.</p>
          <p class="text-slate-300 text-[11px]">3. <strong>Action:</strong> главная кнопка запуска под большой палец.</p>
          <p class="text-slate-300 text-[11px]">4. <strong>Footer:</strong> нижнее навигационное меню.</p>
        </div>

        <div class="p-2.5 bg-indigo-950/40 border border-indigo-500/30 rounded-lg text-xs text-indigo-200">
          🎯 Нажимай на карточки виджетов и заполни все 4 слота экрана смартфона, затем нажми «ЗАПУСК ЭКРАНА»!
        </div>
      </div>
    `
  },
  {
    id: 'g3_m9_l3',
    courseId: 'course_grade3',
    module: 'Модуль 9: Конструктор приложений (Вайрфреймы)',
    title: 'Урок 3: Психология цвета: Зеленый «Пуск» и Красный «Стоп»',
    type: 'quiz',
    description: 'Узнай тайный язык цветов: почему важные кнопки окрашивают по принципу дорожного светофора!',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-teal-950/60 border border-teal-500/40 rounded-xl">
          <h4 class="font-bold text-teal-300 text-sm mb-1">🚦 Цвета-сигналы в интерфейсах</h4>
          <p>Цвета подсказывают игроку последствия нажатия до того, как он прочитает надпись на кнопке.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
          <div class="p-2 bg-slate-900 border border-emerald-500/40 rounded-lg">
            <strong class="text-emerald-400">🟢 Зеленый:</strong> подтверждение, сохранение, старт.
          </div>
          <div class="p-2 bg-slate-900 border border-rose-500/40 rounded-lg">
            <strong class="text-rose-400">🔴 Красный:</strong> безвозвратное удаление, опасность, стоп.
          </div>
          <div class="p-2 bg-slate-900 border border-yellow-500/40 rounded-lg">
            <strong class="text-yellow-400">🟡 Желтый:</strong> предупреждение и внимание.
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Каким цветом следует выделить кнопку безвозвратного удаления аккаунта?',
      options: [
        'Красным',
        'Зелёным',
        'Синим',
        'Серым'
      ],
      correctIndex: 0,
      explanation: 'Красный цвет мгновенно предупреждает пользователя об опасных последствиях!'
    }
  },
  {
    id: 'g3_m9_l4',
    courseId: 'course_grade3',
    module: 'Модуль 9: Конструктор приложений (Вайрфреймы)',
    title: 'Урок 4: Иконки и читаемость шрифтов: Дизайн без лишних слов',
    type: 'quiz',
    description: 'Почему пиктограмма корзины понятна в любой стране мира? Правила выбора читаемых шрифтов.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl">
          <h4 class="font-bold text-cyan-300 text-sm mb-1">🔍 Иконки — международный язык</h4>
          <p>Домик — главная страница, лупа — поиск, шестеренка — настройки. Иконки считываются в 10 раз быстрее текста!</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <strong class="text-yellow-300">Контраст шрифта:</strong>
          <p class="text-slate-300 text-[11px]">Темно-серый текст на черном фоне невозможно прочитать на солнце. Хороший дизайнер всегда делает буквы четкими и контрастными!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой значок часто используют для настроек приложения?',
      options: [
        'Шестерёнка',
        'Домик',
        'Лупа',
        'Звёздочка'
      ],
      correctIndex: 0,
      explanation: 'Иконка шестеренки — общепризнанный символ настроек и параметров программы!'
    }
  },
  {
    id: 'g3_m9_l5',
    courseId: 'course_grade3',
    module: 'Модуль 9: Конструктор приложений (Вайрфреймы)',
    title: 'Урок 5: Зона большого пальца (Thumb Zone) на смартфонах',
    type: 'quiz',
    description: 'Где на экране смартфона удобнее всего нажимать кнопки одной рукой, когда держишь телефон?',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">👍 Зона большого пальца</h4>
          <p>Когда человек держит смартфон одной рукой, его большой палец легко достает только до нижней трети экрана.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs">
          <p class="text-slate-300">Именно поэтому кнопки «Купить», «Играть» и нижнее меню навигации всегда размещают снизу, а не в самом верхнем углу!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Если телефон держат одной рукой, где обычно удобнее нажимать главную кнопку большим пальцем?',
      options: [
        'Внизу: туда достаёт большой палец',
        'Вверху: там кнопку лучше видно',
        'В центре: это середина экрана',
        'В верхнем углу: там больше места'
      ],
      correctIndex: 0,
      explanation: 'Нижняя часть экрана — самая доступная и комфортная зона для управления одной рукой!'
    }
  },
  {
    id: 'g3_m9_l6',
    courseId: 'course_grade3',
    module: 'Модуль 9: Конструктор приложений (Вайрфреймы)',
    title: 'Урок 6: Профессия тестировщик (QA): Откуда берутся баги',
    type: 'quiz',
    description: 'История первого настоящего жука (bug) в компьютере. Как тестировщики спасают приложения от крашей.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-amber-950/80 border border-yellow-500/40 rounded-xl">
          <h4 class="font-bold text-yellow-300 text-sm mb-1">🐛 Откуда взялось слово «БАГ»?</h4>
          <p>В 1947 году ученые нашли настоящего мотылька, застрявшего в реле ЭВМ. С тех пор ошибки в коде и интерфейсе называют багами!</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1 text-xs">
          <strong class="text-cyan-300">Тестирование интерфейса:</strong>
          <p class="text-slate-300 text-[11px]">QA-инженер проверяет: не наползает ли текст на кнопку, открывается ли клавиатура и что будет, если нажать кнопку 20 раз подряд!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что делает специалист по тестированию (QA-инженер)?',
      options: [
        'Ищет ошибки и проверяет удобство',
        'Рисует кнопки и иконки',
        'Пишет код программы',
        'Продаёт программу покупателям'
      ],
      correctIndex: 0,
      explanation: 'Тестировщик всесторонне проверяет программу, находя баги и помогая сделать приложение безупречным!'
    }
  },
  {
    id: 'g3_m9_l7',
    courseId: 'course_grade3',
    module: 'Модуль 9: Конструктор приложений (Вайрфреймы)',
    title: 'Урок 7: Экзамен модуля: Сертифицированный UI/UX Дизайнер',
    type: 'quiz',
    description: 'Итоговый зачет по прототипированию: вайрфреймы, психология цветов, иконки, зоны пальца и поиск багов!',
    difficulty: 'Хакер',
    xpReward: 130,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border border-indigo-500/50 rounded-xl">
          <h4 class="font-bold text-indigo-300 text-sm mb-1">📱 Финал Модуля 9</h4>
          <p>Поздравляем! Ты узнал, как проектировать удобные и красивые мобильные экраны и понимать потребности пользователей.</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что такое вайрфрейм (wireframe) в создании цифровых продуктов?',
      options: [
        'Схема экрана: где какие блоки и кнопки',
        'Готовый дизайн с цветами и картинками',
        'Список найденных ошибок приложения',
        'Исходный код приложения'
      ],
      correctIndex: 0,
      explanation: 'Вайрфрейм — это структурный эскиз интерфейса, показывающий компоновку элементов страницы!'
    }
  }
];
