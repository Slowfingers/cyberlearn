import { Task } from '../../types';

export const MODULE6_TASKS: Task[] = [
  {
    id: 'g5_l25',
    courseId: 'course_grade5',
    module: 'Блок 6: Веб-технологии, Cookie, Кэш и Криптография',
    title: 'Урок 25: Как устроен веб и что такое cookie',
    type: 'quiz',
    description: 'Клиент-серверная модель (HTTP GET/POST) и файлы Cookie: как сайты запоминают авторизацию и товары в корзине пользователя.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🍪
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Куки (Cookies) в браузере
            </h3>
            <p class="text-xs text-slate-300">
              Протокол HTTP не имеет встроенной памяти. Cookie — это маленькие текстовые заметки, которые сервер сохраняет в твоем браузере, чтобы узнавать тебя при обновлении страницы.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-cyan-400 font-bold">Пример куки:</div>
          <p class="text-slate-300 text-[11px] font-mono">
            session_token=a9f8e4b; theme=dark; language=ru
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Для чего веб-сайты используют файлы Cookie?',
      options: [
        'Хранят вход в аккаунт и настройки сайта',
        'Ускоряют работу процессора компьютера',
        'Защищают компьютер от вирусов в сети',
        'Хранят пароли в открытом виде на сервере'
      ],
      correctIndex: 0,
      explanation: 'Файлы Cookie сохраняют уникальный идентификатор сессии пользователя, избавляя от необходимости вводить логин и пароль при каждом клике.'
    }
  },
  {
    id: 'g5_l26',
    courseId: 'course_grade5',
    module: 'Блок 6: Веб-технологии, Cookie, Кэш и Криптография',
    title: 'Урок 26: Кэш браузера, скорость и инструменты разработчика',
    type: 'quiz',
    description: 'Кэширование картинок и стилей на жестком диске, вкладка Network в DevTools (F12) и измерение скорости загрузки страниц.',
    difficulty: 'Хакер',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Кэш браузера (Browser Cache)
            </h3>
            <p class="text-xs text-slate-300">
              Чтобы не скачивать тяжелый логотип сайта и шрифты заново при каждом открытии страницы, браузер сохраняет их копии в локальной папке кэша.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-emerald-400 font-bold">Инструменты разработчика (DevTools):</div>
          <p class="text-slate-300 text-[11px]">
            Нажав <strong class="text-cyan-300 font-mono">F12</strong>, инженер видит код DOM, ошибки JavaScript в Console и время скачивания файлов во вкладке Network.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Почему после очистки кэша браузера сайты при первом открытии могут загружаться немного дольше обычного?',
      options: [
        'Файлы скачиваются из сети заново',
        'Провайдер снижает скорость после очистки',
        'Процессор работает медленнее без кэша',
        'Сервер сайта перезагружается заново'
      ],
      correctIndex: 0,
      explanation: 'Кэш хранит локальные копии ресурсов. Если кэш пуст, браузер повторно загружает все файлы по сети.'
    }
  },
  {
    id: 'g5_l27',
    courseId: 'course_grade5',
    module: 'Блок 6: Веб-технологии, Cookie, Кэш и Криптография',
    title: 'Урок 27: Поисковые системы вглубь',
    type: 'quiz',
    description: 'Как работают Google и Яндекс: поисковые роботы (веб-пауки), обратный индекс (Inverted Index) и алгоритмы ранжирования ссылок.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🕷️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Поисковые пауки (Web Crawlers)
            </h3>
            <p class="text-xs text-slate-300">
              Поисковик не ищет по живому интернету во время твоего запроса. Боты заранее сканируют миллиарды страниц и заносят каждое слово в гигантскую базу данных — <strong>поисковый индекс</strong>!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-purple-400 font-bold">Операторы поиска для инженера:</div>
          <p class="text-slate-300 text-[11px] font-mono">
            "точная фраза" | site:wikipedia.org | filetype:pdf | -минус_слово
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Где на самом деле поисковая система ищет ответ на твой запрос за доли секунды?',
      options: [
        'В своём заранее построенном индексе',
        'Опрашивает все сайты в момент запроса',
        'Выбирает десять случайных сайтов сети',
        'В памяти твоего собственного телефона'
      ],
      correctIndex: 0,
      explanation: 'Поисковые пауки непрерывно индексируют веб заранее, поэтому выдача результатов занимает всего несколько миллисекунд.'
    }
  },
  {
    id: 'g5_l28',
    courseId: 'course_grade5',
    module: 'Блок 6: Веб-технологии, Cookie, Кэш и Криптография',
    title: 'Урок 28: Что такое шифрование и шифр Цезаря',
    type: 'quiz',
    description: 'Основы криптографии: открытый текст, шифротекст, ключ смещения и исторический шифр Юлия Цезаря.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-red-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🏛️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Шифр Цезаря: Сдвиг по алфавиту
            </h3>
            <p class="text-xs text-slate-300">
              Римский полководец защищал тайные донесения, сдвигая каждую букву на фиксированный ключ (например, сдвиг +3). Буква А превращалась в Г, Б — в Д!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1 font-mono">
          <div class="text-amber-400 font-bold">Пример сдвига +1:</div>
          <div class="text-slate-300">КОД ➔ ЛПЕ</div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое слово получится при шифровании слова "АБВ" шифром Цезаря со сдвигом ключа +2 по русскому алфавиту?',
      options: [
        'ВГД',
        'ГДЕ',
        'ЯЮЭ',
        'АБВ'
      ],
      correctIndex: 0,
      explanation: 'А (+2 шага) = В, Б (+2 шага) = Г, В (+2 шага) = Д. Получается ВГД.'
    }
  },
  {
    id: 'g5_l29',
    courseId: 'course_grade5',
    module: 'Блок 6: Веб-технологии, Cookie, Кэш и Криптография',
    title: 'Урок 29: Надёжное шифрование и право на приватность',
    type: 'quiz',
    description: 'Современная криптография: асимметричное шифрование с открытым и закрытым ключами (RSA, AES), сквозное шифрование (End-to-End) в мессенджерах.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Сквозное шифрование (End-to-End Encryption)
            </h3>
            <p class="text-xs text-slate-300">
              Сообщение шифруется на телефоне отправителя и расшифровывается только на телефоне получателя. Даже сервера мессенджера видят только бессмысленный шум!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-purple-400 font-bold">HTTPS и замочек в браузере:</div>
          <p class="text-slate-300 text-[11px]">
            Буква «S» означает Secure (TLS-шифрование). Злоумышленник в публичном Wi-Fi кафе не сможет перехватить твои пароли.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что гарантирует протокол сквозного шифрования (End-to-End Encryption, E2EE) в современных мессенджерах?',
      options: [
        'Ключи есть только у собеседников',
        'Ключи хранятся на сервере компании',
        'Сообщения передаются быстрее обычных',
        'Сообщения удаляются через сутки сами'
      ],
      correctIndex: 0,
      explanation: 'E2EE гарантирует абсолютную математическую конфиденциальность: расшифровать текст можно только секретным приватным ключом на устройстве собеседника.'
    }
  },
  {
    id: 'g5_l30',
    courseId: 'course_grade5',
    module: 'Блок 6: Веб-технологии, Cookie, Кэш и Криптография',
    title: 'Урок 30: Повторение правил кибербезопасности',
    type: 'phishing_detect',
    description: 'Интерактивный симулятор кибердетектива: проанализируй поддельное письмо и разоблачи все признаки фишинговой атаки!',
    difficulty: 'Элита',
    xpReward: 125,
    currencyReward: 45,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-amber-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🕵️‍♂️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Анатомия фишинга: Чек-лист безопасности
            </h3>
            <p class="text-xs text-slate-300">
              Мошенники маскируются под техподдержку и пугают блокировкой аккаунта: «Срочно перейдите по ссылке за 5 минут!». Это уловка социальной инженерии.
            </p>
          </div>
        </div>
      </div>
    `,
    phishingConfig: {
      sender: 'support@val1ve-steam-security.com',
      subject: 'ВНИМАНИЕ: Ваш игровой аккаунт будет удален через 1 час!',
      body: 'Здравствуйте! Мы зафиксировали вход с неизвестного устройства. Срочно перейдите по ссылке http://steam-login-verify.xyz/auth и введите логин, пароль и код из SMS для отмены блокировки!',
      threatCount: 3
    }
  }
];
