import { Task } from '../../types';

export const MODULE14_TASKS: Task[] = [
  {
    id: 'g4_l66',
    courseId: 'course_grade4',
    module: 'Модуль 14: Цифровое право, инклюзия и будущее',
    title: 'Урок 66: Данные, которые мы отдаём — приложения и разрешения',
    type: 'quiz',
    description: 'Стандарты: Common Sense · UK · Singapore · ISTE · DigComp · derived from FTC COPPA · KZ Инф 7.4.2.1. Разрешения приложений (Permissions): зачем калькулятору доступ к камере, микрофону и геолокации?',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-amber-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0">
            📱
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Лишние разрешения (Permissions)
            </h3>
            <p class="text-xs text-slate-300">
              Всегда задавай вопрос: зачем этому приложению мои контакты? Фонарику или калькулятору не нужны твои фото и микрофон. Запрещай подозрительный доступ!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Новая простая игра-головоломка запрашивает доступ к списку контактов и микрофону. Как поступить?',
      options: [
        'Отклонить: игре они не нужны',
        'Разрешить: иначе игра не запустится',
        'Разрешить только доступ к контактам',
        'Разрешить, но потом отключить звук'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Приложения должны получать доступ только к тем датчикам, которые напрямую нужны для их работы.'
    }
  },
  {
    id: 'g4_l67',
    courseId: 'course_grade4',
    module: 'Модуль 14: Цифровое право, инклюзия и будущее',
    title: 'Урок 67: Авторское право — когда можно и нельзя брать',
    type: 'quiz',
    description: 'Стандарты: Common Sense · UK · Singapore · ISTE · DigComp · KZ Инф 7.4.2.2 · KZ ЦГ 4.3.1.2. Авторское право (Copyright), свободные лицензии Creative Commons и указание авторства (Attribution).',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-amber-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0">
            ©️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Creative Commons и уважение авторов
            </h3>
            <p class="text-xs text-slate-300">
              Картинка в интернете принадлежит тому, кто ее нарисовал. Для школьных проектов и игр ищи материалы с лицензией Creative Commons (CC) и указывай автора.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что означает лицензия Creative Commons с пометкой CC-BY?',
      options: [
        'Использовать можно, указав автора',
        'Использовать нельзя ни при каких условиях',
        'Использовать можно только за деньги',
        'Использовать можно, автора указывать не нужно'
      ],
      correctIndex: 0,
      explanation: 'Верно! «BY» означает «Attribution» (авторство). Укажи автора, источник и лицензию, а также отметь изменения, если они были. Соблюдай условия выбранной лицензии.'
    }
  },
  {
    id: 'g4_l68',
    courseId: 'course_grade4',
    module: 'Модуль 14: Цифровое право, инклюзия и будущее',
    title: 'Урок 68: Дизайн для всех — доступность и инклюзия',
    type: 'wireframe_builder',
    description: 'Стандарты: Common Sense · UK · Singapore · derived from W3C WAI · ISTE · DigComp · KZ Инф 7.4.1.1. Цифровая доступность (Accessibility / a11y): крупный шрифт, контрастность и поддержка скринридеров.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            ♿
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Доступность интерфейсов (a11y)
            </h3>
            <p class="text-xs text-slate-300">
              Программы должны быть удобны всем: людям с нарушениями зрения (высокий контраст, крупные кнопки), слуха (субтитры) и моторики.
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
    id: 'g4_l69',
    courseId: 'course_grade4',
    module: 'Модуль 14: Цифровое право, инклюзия и будущее',
    title: 'Урок 69: Компьютеры меняют мир — профессии и будущее',
    type: 'quiz',
    description: 'Стандарты: Common Sense · UK · Singapore · ISTE · DigComp · KZ Инф 8.1.1.1 · KZ ЦГ 1.1.3.1. IT-профессии будущего: геймдев, кибербезопасность, дата-сайнс, биоинформатика и робототехника.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            🚀
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Мир цифровых профессий
            </h3>
            <p class="text-xs text-slate-300">
              Программисты создают марсоходы, врачи печатают импланты на 3D-принтерах, а экологи анализируют спутниковые снимки лесов с помощью нейросетей.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Чем занимается специалист по кибербезопасности (White Hat Hacker)?',
      options: [
        'Ищет уязвимости и защищает данные',
        'Взламывает чужие аккаунты ради денег',
        'Продаёт компьютеры и комплектующие',
        'Пишет вирусы для проверки антивирусов'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Белые хакеры — защитники цифрового мира, обеспечивающие безопасность интернета.'
    }
  },
  {
    id: 'g4_l70',
    courseId: 'course_grade4',
    module: 'Модуль 14: Цифровое право, инклюзия и будущее',
    title: 'Урок 70: Наш цифровой договор — правила на 4 класс и дальше',
    type: 'quiz',
    description: 'Стандарты: Common Sense · UK · Singapore · ISTE · DigComp · KZ ЦГ 4.1.3.1 · KZ ЦГ 2.1.3.2. Личный кодекс цифрового гражданина: баланс экрана, уважение в сети, надежные пароли и любознательность.',
    difficulty: 'Новичок',
    xpReward: 120,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            📜
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Кодекс кибер-мастера 4 класса
            </h3>
            <p class="text-xs text-slate-300">
              Поздравляем с завершением курса! Ты овладел алгоритмами, логикой, безопасностью, сетями и веб-кодом. Используй свои знания для созидания и помощи другим!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что является главным правилом ответственного пользователя интернета?',
      options: [
        'Общаться в сети так же вежливо, как вживую',
        'Никогда не выключать свой компьютер',
        'Верить новостям из популярных пабликов',
        'Скачивать программы с любых сайтов'
      ],
      correctIndex: 0,
      explanation: 'Блестяще! Вежливость, критическое мышление и цифровая гигиена делают интернет безопасным и дружелюбным местом для всех нас!'
    }
  }
];
