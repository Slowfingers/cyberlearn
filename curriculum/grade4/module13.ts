import { Task } from '../../types';

export const MODULE13_TASKS: Task[] = [
  {
    id: 'g4_l61',
    courseId: 'course_grade4',
    module: 'Модуль 13: Цифровое благополучие и медиаграмотность',
    title: 'Урок 61: Захват уведомлениями — возвращаем себе внимание',
    type: 'quiz',
    description: 'Стандарты: Common Sense · UK · Singapore · DigComp · KZ Инф 6.4.2.1. Психология бесконечной ленты (Doomscrolling), красные кружки уведомлений и цифровой детокс.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-amber-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0">
            🔔
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Экономика внимания
            </h3>
            <p class="text-xs text-slate-300">
              Приложения специально красят значки уведомлений в ярко-красный цвет тревоги, чтобы ты чаще открывал телефон. Отключай лишние пуши во время уроков и отдыха!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой самый эффективный способ не отвлекаться на смартфон во время выполнения домашнего задания?',
      options: [
        'Включить режим «Не беспокоить»',
        'Проверять сообщения каждые пять минут',
        'Включить звук уведомлений громче',
        'Положить телефон рядом с тетрадью'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Режим «Не беспокоить» защищает твою концентрацию и помогает меньше отвлекаться на необязательные сигналы.'
    }
  },
  {
    id: 'g4_l62',
    courseId: 'course_grade4',
    module: 'Модуль 13: Цифровое благополучие и медиаграмотность',
    title: 'Урок 62: Дезинформация 101 — латеральное чтение',
    type: 'fake_detector',
    description: 'Стандарты: Common Sense · UK · Singapore · MIL · ISTE · DigComp · derived from Stanford · KZ ЦГ 4.3.1.1 · KZ Инф 9.2.1.1. Латеральное чтение (открытие соседних вкладок для проверки первоисточника новости).',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-amber-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0">
            📰
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Латеральное чтение (Stanford Method)
            </h3>
            <p class="text-xs text-slate-300">
              Не оставайся на сомнительном сайте! Профессиональные фактчекеры открывают новую вкладку поиска и смотрят: кто автор? что говорят авторитетные научные источники?
            </p>
          </div>
        </div>
      </div>
    `,
    fakeDetectorConfig: {
      claim: 'В чате переслали сенсацию: «Ученые заявили, что шоколад заменяет сон и чистку зубов!» без ссылок на исследования.',
      isFake: true,
      explanation: 'Сенсационное обещание без источника нельзя принимать за факт. Найди исходное исследование и проверь сообщение вместе со взрослым; не меняй привычки по совету из чата.'
    }
  },
  {
    id: 'g4_l63',
    courseId: 'course_grade4',
    module: 'Модуль 13: Цифровое благополучие и медиаграмотность',
    title: 'Урок 63: От наблюдателя к заступнику',
    type: 'quiz',
    description: 'Стандарты: Common Sense · UK · Singapore · ISTE · DigComp · KZ Инф 8.4.2.1 · KZ ЦГ 2.1.3.2. Кибербуллинг в чатах: как не оставаться молчаливым свидетелем (Upstander vs Bystander).',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-green-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🤝
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Позиция защитника (Upstander)
            </h3>
            <p class="text-xs text-slate-300">
              Если в школьном чате кого-то дразнят или травят, молчаливое наблюдение поощряет обидчика. Напиши слова поддержки, сделай скриншот и сообщи учителю или родителям.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что отличает защитника (Upstander) от пассивного свидетеля (Bystander) в онлайн-чате?',
      options: [
        'Поддерживает жертву и зовёт взрослых',
        'Ставит смайлики под сообщениями обидчика',
        'Молча выходит из чата и забывает',
        'Отвечает обидчику такой же грубостью'
      ],
      correctIndex: 0,
      explanation: 'Абсолютно верно! Доброе слово поддержки и обращение к взрослым помогают получить защиту и не оставлять человека одного.'
    }
  },
  {
    id: 'g4_l64',
    courseId: 'course_grade4',
    module: 'Модуль 13: Цифровое благополучие и медиаграмотность',
    title: 'Урок 64: Онлайн-сообщества — где безопасно проводить время',
    type: 'quiz',
    description: 'Стандарты: Common Sense · UK · Singapore · DigComp · KZ ЦГ 3.1.3.1 · KZ ЦГ 2.1.3.2. Правила модерируемых серверов: приватные каналы с друзьями vs открытые публичные голосовые чаты.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0">
            🛡️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Безопасные сообщества
            </h3>
            <p class="text-xs text-slate-300">
              В хороших комьюнити есть строгие правила, фильтры мата и модераторы, следящие за порядком. Никогда не включай веб-камеру с незнакомцами в открытых комнатах.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какую информацию категорически запрещено публиковать на открытых игровых форумах и серверах?',
      options: [
        'Домашний адрес, номер школы, телефон',
        'Свой игровой псевдоним (никнейм)',
        'Любимый жанр компьютерных игр',
        'Название только что пройденной игры'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Личные персональные данные должны оставаться в тайне от незнакомых людей в интернете.'
    }
  },
  {
    id: 'g4_l65',
    courseId: 'course_grade4',
    module: 'Модуль 13: Цифровое благополучие и медиаграмотность',
    title: 'Урок 65: Онлайн-«друзья», которые лгут — что должно насторожить',
    type: 'quiz',
    description: 'Стандарты: UK · NSPCC and IWF educator · Common Sense · Singapore · ISTE · DigComp · KZ ЦГ 3.1.3.1 · KZ Инф 8.4.2.1. Красные флаги онлайн-знакомств: просьбы сохранить секрет от родителей, прислать личные фото или встретиться.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            🚨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Красные флаги (Red Flags)
            </h3>
            <p class="text-xs text-slate-300">
              Человек в интернете может выдать себя за кого угодно: поставить фото подростка, говорить комплименты. Если он просит: «Никому не говори, это наш секрет» — СРАЗУ расскажи родителям!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Интернет-знакомый из игры просит прислать домашний адрес и обещает прислать подарок, но просит «хранить это в тайне от мамы». Что сделать?',
      options: [
        'Прекратить общение и сказать родителям',
        'Отправить адрес и ждать подарок',
        'Прислать вместо дома адрес школы',
        'Согласиться, но попросить два подарка'
      ],
      correctIndex: 0,
      explanation: 'Единственно верное решение! Любая просьба о секретах от родителей — сигнал серьезной опасности.'
    }
  }
];
