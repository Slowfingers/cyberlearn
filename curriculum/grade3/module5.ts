import { Task } from '../../types';

export const MODULE5_TASKS: Task[] = [
  {
    id: 'g3_m5_l1',
    courseId: 'course_grade3',
    module: 'Модуль 5: Как устроен интернет и сайты',
    title: 'Урок 1: Маршрутизация пакетов: От клиента к серверу',
    type: 'network_route',
    description: 'Данные в интернете мчатся пакетами через цепочки роутеров по оптоволокну. Проложи путь сигнала!',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🌐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Как путешествует интернет-сигнал?
            </h3>
            <p class="text-xs text-slate-300">
              Сообщения нарезаются на пакетики и летят через роутеры со скоростью света.
            </p>
          </div>
        </div>
        <div class="p-2.5 bg-cyan-950/40 border border-cyan-500/30 rounded-lg text-cyan-200">
          🎯 Соедини промежуточные роутеры от клиента к серверу!
        </div>
      </div>
    `
  },
  {
    id: 'g3_m5_l2',
    courseId: 'course_grade3',
    module: 'Модуль 5: Как устроен интернет и сайты',
    title: 'Урок 2: Клиент и Сервер: Диалог в цифровом кафе',
    type: 'quiz',
    description: 'Кто заказывает сайт, а кто отправляет готовые страницы? Пойми архитектуру Всемирной паутины.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">🍕 Клиент и Сервер</h4>
          <p>Каждый раз, когда ты открываешь сайт, происходит диалог двух компьютеров:</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-2.5 bg-slate-900 border border-cyan-500/40 rounded-xl">
            <strong class="text-cyan-300">Клиент (Браузер):</strong> отправляет запрос («Открой сайт!»).
          </div>
          <div class="p-2.5 bg-slate-900 border border-yellow-500/40 rounded-xl">
            <strong class="text-yellow-300">Сервер (В дата-центре):</strong> отсылает готовый ответ с кодом страницы.
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какую роль выполняет браузер пользователя (Chrome, Яндекс Браузер) при посещении сайта?',
      options: [
        'Клиента: запрашивает и показывает страницу',
        'Сервера: хранит и раздаёт страницы',
        'Провайдера: проводит интернет в дом',
        'Роутера: раздаёт Wi-Fi по квартире'
      ],
      correctIndex: 0,
      explanation: 'Браузер на устройстве пользователя выступает клиентом: он запрашивает и показывает страницы!'
    }
  },
  {
    id: 'g3_m5_l3',
    courseId: 'course_grade3',
    module: 'Модуль 5: Как устроен интернет и сайты',
    title: 'Урок 3: IP-адреса и телефонная книга интернета (DNS)',
    type: 'quiz',
    description: 'Зачем нужны доменные имена и почему мы не учим наизусть цифровые IP-адреса сайтов?',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-teal-950/60 border border-teal-500/40 rounded-xl">
          <h4 class="font-bold text-teal-300 text-sm mb-1">📖 Служба DNS (Domain Name System)</h4>
          <p>У каждого компьютера в сети есть цифровой паспорт — <strong>IP-адрес</strong> (например, <code>77.88.55.66</code>).</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <p class="text-slate-300">
            Людям трудно помнить цифры, поэтому придумали понятные доменные имена (<code>yandex.ru</code>, <code>google.com</code>). DNS-сервер работает как телефонная книга: переводит буквенное имя в точный IP-адрес!
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что делает DNS-сервер в интернете?',
      options: [
        'Переводит имя сайта в IP-адрес',
        'Хранит все страницы сайта',
        'Проверяет пароль при входе',
        'Ускоряет загрузку картинок'
      ],
      correctIndex: 0,
      explanation: 'DNS связывает удобные буквенные имена сайтов с реальными числовыми IP-адресами серверов в сети.'
    }
  },
  {
    id: 'g3_m5_l4',
    courseId: 'course_grade3',
    module: 'Модуль 5: Как устроен интернет и сайты',
    title: 'Урок 4: Язык HTML: Теги &lt;h1&gt; и &lt;p&gt;',
    type: 'html',
    description: 'Напиши свой первый настоящий веб-документ на языке разметки HTML с заголовком и абзацем!',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-orange-950/80 to-amber-950/80 border border-orange-500/40 rounded-xl">
          <h4 class="font-bold text-orange-300 text-sm mb-1">🏷️ Теги разметки HTML</h4>
          <p>HTML подсказывает браузеру структуру текста с помощью открывающих и закрывающих угловых скобок.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div><code>&lt;h1&gt;...&lt;/h1&gt;</code> — крупный главный заголовок (Heading 1).</div>
          <div><code>&lt;p&gt;...&lt;/p&gt;</code> — абзац обычного текста (Paragraph).</div>
        </div>
      </div>
    `,
    initialCode: `<h1>Привет, планета Земля!</h1>\n<p>Это мой первый сайт, написанный своими руками в 3 классе!</p>`,
    htmlConfig: {
      targetTag: 'h1'
    }
  },
  {
    id: 'g3_m5_l5',
    courseId: 'course_grade3',
    module: 'Модуль 5: Как устроен интернет и сайты',
    title: 'Урок 5: Интерактивная кнопка: Тег &lt;button&gt; и стили',
    type: 'html',
    description: 'Добавь на веб-страницу настоящую кнопку действия и настрой её оформление с помощью стилей!',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl">
          <h4 class="font-bold text-emerald-300 text-sm mb-1">🔘 Тег &lt;button&gt; для нажатий</h4>
          <p>Чтобы пользователь мог взаимодействовать со страницей, добавляют интерактивные кнопки.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs">
          <code class="text-emerald-400 font-mono">&lt;button style="background: #00f3ff; font-weight: bold;"&gt;ПУСК&lt;/button&gt;</code>
        </div>
      </div>
    `,
    initialCode: `<h2>Кибер-Космодром</h2>\n<p>Нажми кнопку ниже, чтобы запустить двигатели:</p>\n<button style="background: #00f3ff; color: black; padding: 10px 20px; font-weight: bold; border-radius: 8px;">ЗАПУСК 🚀</button>`,
    htmlConfig: {
      targetTag: 'button'
    }
  },
  {
    id: 'g3_m5_l6',
    courseId: 'course_grade3',
    module: 'Модуль 5: Как устроен интернет и сайты',
    title: 'Урок 6: Безопасный замочек HTTPS и шифрование данных',
    type: 'quiz',
    description: 'Что означает буква S в протоколе HTTPS? Узнай, как шифрование защищает пароли от перехвата в кафе.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-blue-950/80 border border-teal-500/40 rounded-xl">
          <h4 class="font-bold text-teal-300 text-sm mb-1">🔐 Замочек HTTPS в браузере</h4>
          <p>Буква «S» в протоколе означает Secure (Защищено). Весь трафик между твоим телефоном и сервером превращается в тайный шифр!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что защищает HTTPS при отправке пароля на сайт?',
      options: [
        'Шифрует передачу данных между браузером и сайтом',
        'Такие сайты загружаются быстрее',
        'На таких сайтах нет рекламы',
        'Такие сайты проверены учителем'
      ],
      correctIndex: 0,
      explanation: 'HTTPS защищает передачу данных от постороннего чтения по дороге. Но сам сайт получает отправленные данные, поэтому нужно отдельно проверить его адрес и надёжность.'
    }
  },
  {
    id: 'g3_m5_l7',
    courseId: 'course_grade3',
    module: 'Модуль 5: Как устроен интернет и сайты',
    title: 'Урок 7: Экзамен модуля: Юный веб-мастер и сетевой инженер',
    type: 'quiz',
    description: 'Большой зачет по сетям, клиентам, серверам, DNS, HTML-тегам и защите HTTPS!',
    difficulty: 'Хакер',
    xpReward: 125,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-teal-950/80 border border-blue-500/50 rounded-xl">
          <h4 class="font-bold text-blue-300 text-sm mb-1">🏁 Финал Модуля 5</h4>
          <p>Ты узнал, как устроен глобальный интернет, написал первую веб-страницу на HTML и разобрался в сетевой безопасности!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой тег в HTML используется для выделения главного крупного заголовка статьи?',
      options: [
        '<h1>',
        '<p>',
        '<img>',
        '<b>'
      ],
      correctIndex: 0,
      explanation: 'Тег <h1> (Heading 1) обозначает самый крупный и главный заголовок первого уровня!'
    }
  }
];
