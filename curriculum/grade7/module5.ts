import { Task } from '../../types';

export const MODULE5_TASKS: Task[] = [
  {
    id: 'g7_l30',
    courseId: 'course_grade7',
    module: 'Блок 5: Веб-разработка — JavaScript и Интерактивный DOM',
    title: 'Урок 30: От статичного к живому — зачем JavaScript?',
    type: 'quiz',
    description: 'UK KS3: HTML (скелет), CSS (стиль), JavaScript (поведение). Клиентский скриптинг в браузере V8.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0 font-mono text-yellow-300 font-bold">
            JS
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              JavaScript: Оживление веб-страниц
            </h3>
            <p class="text-xs text-slate-300">
              HTML строит каркас разметки, CSS красит цвета и сетки, а JavaScript реагирует на клики мыши, отправляет сетевые запросы и обновляет интерфейс без перезагрузки вкладки.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какую главную роль выполняет JavaScript на веб-странице?',
      options: [
        'Делает страницу интерактивной',
        'Задаёт цвета и расположение блоков',
        'Хранит данные пользователей на сервере',
        'Определяет структуру заголовков страницы'
      ],
      correctIndex: 0,
      explanation: 'JavaScript — язык программирования клиентской интерактивности браузера, позволяющий динамически изменять страницу без перезагрузки.'
    }
  },
  {
    id: 'g7_l31',
    courseId: 'course_grade7',
    module: 'Блок 5: Веб-разработка — JavaScript и Интерактивный DOM',
    title: 'Урок 31: Основы JS — переменные, функции, if/else',
    type: 'terminal',
    description: 'UK KS3: Синтаксис современного JS (ES6+): let, const, стрелочные функции () => {}, шаблонные строки \`\${}\`, console.log.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-blue-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0 font-mono text-yellow-300">
            {}
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Синтаксис ECMAScript: let, const и стрелочные функции
            </h3>
            <p class="text-xs text-slate-300">
              Используйте <code class="text-emerald-300 font-mono">const</code> для неизменяемых значений и <code class="text-cyan-300 font-mono">let</code> для переменных. Фигурные скобки обрамляют блоки кода, а точка с запятой завершает инструкции.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'const calculateTotal = (price, tax) => price + (price * tax);\nconst finalPrice = calculateTotal(100, 0.12);\nconsole.log(`Итого к оплате с НДС: ${finalPrice} KZT`);',
    terminalOutput: '> Итого к оплате с НДС: 112 KZT\n> JS engine V8: 0 errors'
  },
  {
    id: 'g7_l32',
    courseId: 'course_grade7',
    module: 'Блок 5: Веб-разработка — JavaScript и Интерактивный DOM',
    title: 'Урок 32: DOM — твоя страница как дерево',
    type: 'quiz',
    description: 'UK KS3: Document Object Model, древовидная иерархия document, document.getElementById, querySelector, innerHTML, textContent.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-green-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            🌳
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              DOM (Document Object Model): Страница как живое дерево объектов
            </h3>
            <p class="text-xs text-slate-300">
              Браузер парсит HTML и строит дерево узлов (Node Tree). Через объект <code class="text-yellow-300 font-mono">document</code> JS может мгновенно менять текст, цвет и классы любого элемента.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой метод JavaScript находит элемент на странице по его уникальному идентификатору id?',
      options: [
        'document.getElementById("my-id")',
        'document.searchPage("my-id")',
        'document.findHTML("my-id")',
        'window.openId("my-id")'
      ],
      correctIndex: 0,
      explanation: 'document.getElementById() — стандартный высокопроизводительный метод DOM для получения ссылки на элемент по его атрибуту id.'
    }
  },
  {
    id: 'g7_l33',
    courseId: 'course_grade7',
    module: 'Блок 5: Веб-разработка — JavaScript и Интерактивный DOM',
    title: 'Урок 33: События — страницы, которые слушают',
    type: 'quiz',
    description: 'UK KS3, ACARA ACTDIP028: Слушатели событий element.addEventListener("click", callback), события mouseover, keydown, submit, объект события event.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 font-mono text-purple-300">
            👂
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Event Listeners: Реакция на действия пользователя
            </h3>
            <p class="text-xs text-slate-300">
              Метод <code class="text-yellow-300 font-mono">btn.addEventListener("click", () => { ... })</code> подписывает кнопку на физический клик и запускает функцию-обработчик.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      "question": "Кнопка должна увеличивать счёт при нажатии. Где нужно описать это действие?",
      "options": [
            "В обработчике события нажатия кнопки",
            "В названии файла с изображением кнопки",
            "В подписи цветовой палитры страницы",
            "В адресе папки с файлами страницы"
      ],
      "correctIndex": 0,
      "explanation": "Обработчик события выполняет команды в ответ на нажатие. HTML создаёт кнопку, а JavaScript описывает действие после нажатия."
}
  },
  {
    id: 'g7_l34',
    courseId: 'course_grade7',
    module: 'Блок 5: Веб-разработка — JavaScript и Интерактивный DOM',
    title: 'Урок 34: Создаём интерактивную страницу',
    type: 'html',
    description: 'UK KS3, ACARA ACTDIP028, ACTDIP030, CSTA 2-AP-15: Полноценное веб-приложение: счетчик кликов, переключение темы (Dark/Light mode) и валидация формы ввода.',
    difficulty: 'Легенда',
    xpReward: 125,
    currencyReward: 40,
    status: 'open',
    initialCode: '<div style="font-family:sans-serif; text-align:center; padding:20px; background:#0f172a; color:#38bdf8; border-radius:12px;">\n  <h2>Кибер-счетчик</h2>\n  <p id="counter" style="font-size:32px; font-weight:bold; color:#4ade80;">0</p>\n  <button onclick="document.getElementById(\'counter\').innerText = parseInt(document.getElementById(\'counter\').innerText) + 1" style="padding:10px 20px; background:#06b6d4; color:#fff; border:none; border-radius:8px; cursor:pointer; font-weight:bold;">Кликнуть +1</button>\n</div>',
    htmlConfig: {}
  },
  {
    id: 'g7_l35',
    courseId: 'course_grade7',
    module: 'Блок 5: Веб-разработка — JavaScript и Интерактивный DOM',
    title: 'Урок 35: Адаптивный веб и глубокое погружение в инструменты разработчика',
    type: 'quiz',
    description: 'ACARA ACTDIP031, CSTA 2-CS-01, 2-CS-03, KZ Инф 7.4.1.1: DevTools (F12): вкладка Elements, Console, Network (анализ загрузки и статус-кодов), медиа-запросы @media, эмуляция мобильных экранов.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 font-mono text-cyan-300">
            🔍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Вкладка Network и адаптивный дизайн
            </h3>
            <p class="text-xs text-slate-300">
              Вкладка Network в Chrome DevTools позволяет замерить время загрузки каждого файла (TTFB, размер в килобайтах) и отследить HTTP-статусы (200 OK, 404 Not Found, 500 Server Error).
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой HTTP статус-код означает, что запрос браузера к серверу прошел полностью успешно?',
      options: [
        '200 OK',
        '404 Not Found',
        '500 Internal Server Error',
        '403 Forbidden'
      ],
      correctIndex: 0,
      explanation: 'Код 200 OK означает успешный ответ HTTP-сервера и корректную передачу запрашиваемого ресурса.'
    }
  }
];
