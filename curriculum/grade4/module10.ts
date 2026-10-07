import { Task } from '../../types';

export const MODULE10_TASKS: Task[] = [
  {
    id: 'g4_l46',
    courseId: 'course_grade4',
    module: 'Модуль 10: Диаграммы, веб и адресация',
    title: 'Урок 46: Линейные и круговые диаграммы',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-DA-06, 1B-DA-07 · UK KS2 · ACARA AC9TDI6P10 · KZ Инф 7.2.2.3. Когда использовать круговую диаграмму (доли от целого 100%), а когда линейный график (динамика во времени).',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🥧
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Типы графиков
            </h3>
            <p class="text-xs text-slate-300">
              <b>Круговая (Pie chart)</b> — пирог, делящийся на куски (например, доли браузеров). <b>Линейная (Line chart)</b> — показывает, как менялась температура или счет по часам.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой тип диаграммы лучше всего покажет, как менялась температура воздуха каждый день в течение недели?',
      options: [
        'Линейный график',
        'Круговая диаграмма',
        'Столбчатая диаграмма',
        'Таблица со списком'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Линейный график идеально отображает изменения показателей во времени (тренды).'
    }
  },
  {
    id: 'g4_l47',
    courseId: 'course_grade4',
    module: 'Модуль 10: Диаграммы, веб и адресация',
    title: 'Урок 47: Работа с данными и дизайн диаграмм',
    type: 'spreadsheet',
    description: 'Стандарты: CSTA 1B-DA-06, 1B-IC-19 · UK KS2 · ACARA AC9TDI6P10 · KZ Инф 7.2.2.3. Оформление диаграммы: понятные заголовки, подписи осей и правильная цветовая гамма.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0">
            📈
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Чистота инфографики
            </h3>
            <p class="text-xs text-slate-300">
              График без подписей осей бессмыслен. Зритель должен сразу понять, что отложено по горизонтали (дни) и по вертикали (баллы).
            </p>
          </div>
        </div>
      </div>
    `,
    spreadsheetConfig: {
      tableData: [
        { id: '1', name: 'Понедельник', val1: 45, val2: 10 },
        { id: '2', name: 'Вторник', val1: 55, val2: 15 },
        { id: '3', name: 'Среда', val1: 70, val2: 20 }
      ],
      targetFormula: '=SUM(B1:B3)',
      formulaType: 'sum'
    }
  },
  {
    id: 'g4_l48',
    courseId: 'course_grade4',
    module: 'Модуль 10: Диаграммы, веб и адресация',
    title: 'Урок 48: Сайты и структура URL',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-NI-04 · UK KS2 · ACARA AC9TDI6K01. Поддомены, порты и якоря на странице: как браузер безошибочно находит нужный документ.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            🔗
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Из чего состоит веб-адрес
            </h3>
            <p class="text-xs text-slate-300">
              В адресе <code class="text-yellow-300 font-mono">blog.game.com/news#top</code>: «blog» — поддомен, «game.com» — домен, «/news» — раздел, а «#top» — якорь для прыжка наверх страницы.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какая часть URL указывает на конкретный раздел или файл на сервере?',
      options: [
        'Путь: /games/level1.html',
        'Протокол: https://',
        'Домен: example.com',
        'Порт: :443'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Путь (Path) указывает запрашиваемый ресурс или раздел. Он не обязательно совпадает с папкой на диске сервера.'
    }
  },
  {
    id: 'g4_l49',
    courseId: 'course_grade4',
    module: 'Модуль 10: Диаграммы, веб и адресация',
    title: 'Урок 49: DNS и веб-безопасность',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-NI-04, 2-NI-05 · UK KS2, KS3 · KZ ЦГ 3.1.3.1. Телефонная книга интернета: как служба DNS переводит понятное имя сайта в IP-адрес.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0">
            📖
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              DNS — Записная книжка сети
            </h3>
            <p class="text-xs text-slate-300">
              Людям легко запомнить «google.com», а компьютерам нужны цифры: 142.250.186.46. Сервер DNS мгновенно сопоставляет имя и IP-адрес!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какую главную задачу выполняет сервер DNS в интернете?',
      options: [
        'Превращает имя сайта в IP-адрес',
        'Хранит все страницы сайтов мира',
        'Проверяет пароли пользователей',
        'Раздаёт Wi-Fi в квартире'
      ],
      correctIndex: 0,
      explanation: 'Точно! DNS (Domain Name System) находит нужный IP-адрес по буквенному имени сайта.'
    }
  },
  {
    id: 'g4_l50',
    courseId: 'course_grade4',
    module: 'Модуль 10: Диаграммы, веб и адресация',
    title: 'Урок 50: Как путешествуют данные',
    type: 'network_route',
    description: 'Стандарты: CSTA 1B-NI-04. Пакетная коммутация: фото разбивается на тысячи пакетов, летит по оптоволокну и собирается воедино на твоем экране.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-orange-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            📦
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Пакеты данных
            </h3>
            <p class="text-xs text-slate-300">
              Большие файлы не передаются одним куском. Они делятся на маленькие пронумерованные конверты — сетевые пакеты, каждый из которых может лететь своим путем!
            </p>
          </div>
        </div>
      </div>
    `,
    networkConfig: {
      startNode: 'A',
      endNode: 'D'
    }
  }
];
