import { Task } from '../../types';

export const MODULE7_TASKS: Task[] = [
  {
    id: 'g4_l31',
    courseId: 'course_grade4',
    module: 'Модуль 7: Клиент-сервер, сеть и безопасность',
    title: 'Урок 31: Веб-безопасность и клиент-сервер',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-NI-04, 1B-NI-05 · UK KS2 · ACARA AC9TDI6K01 · KZ ЦГ 3.1.3.1. Клиент отправляет Request (запрос), сервер отвечает Response (данные). Замочек HTTPS шифрует весь трафик.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0">
            🖥️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Модель Клиент — Сервер
            </h3>
            <p class="text-xs text-slate-300">
              Твой браузер — это <b>Клиент</b> (он просит страницу). Мощный компьютер в дата-центре — это <b>Сервер</b> (он находит страницу и отправляет тебе).
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что означает значок закрытого замочка и надпись «https://» в адресной строке браузера?',
      options: [
        'Соединение зашифровано',
        'Сайт заблокирован в стране',
        'На компьютере найден вирус',
        'Сайт принадлежит банку'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Протокол HTTPS (буква S — Secure) шифрует канал между твоим браузером и сервером.'
    }
  },
  {
    id: 'g4_l32',
    courseId: 'course_grade4',
    module: 'Модуль 7: Клиент-сервер, сеть и безопасность',
    title: 'Урок 32: Скачивание, выгрузка и передача данных',
    type: 'network_route',
    description: 'Стандарты: CSTA 1B-NI-04 · UK KS2 · ACARA AC9TDI6K01 · KZ Инф 8.1.3.1. Разница между Download (скачивание) и Upload (отправка в облако), пакетная маршрутизация.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-cyan-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0">
            📡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              Download vs Upload
            </h3>
            <p class="text-xs text-slate-300">
              <b>Download</b> (скачивание) — получение файла из сети на свое устройство. <b>Upload</b> (выгрузка) — отправка видео или домашки в облако.
            </p>
          </div>
        </div>
      </div>
    `,
    networkConfig: {
      startNode: 'A',
      endNode: 'C'
    }
  },
  {
    id: 'g4_l33',
    courseId: 'course_grade4',
    module: 'Модуль 7: Клиент-сервер, сеть и безопасность',
    title: 'Урок 33: Аутентификация и фишинг',
    type: 'phishing_detect',
    description: 'Стандарты: CSTA 1B-NI-05 · UK KS2 · ACARA AC9TDI6P09 · CISA and NIST 800-63B · KZ ЦГ 4.1.3.1. Распознай поддельное письмо мошенников с ложными обещаниями подарков.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-rose-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0">
            🎣
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Опасность фишинга
            </h3>
            <p class="text-xs text-slate-300">
              Фишинг (от «fishing» — рыбалка) — это приманка с фальшивой ссылкой, чтобы выудить твой логин и пароль. Всегда проверяй адрес отправителя!
            </p>
          </div>
        </div>
      </div>
    `,
    phishingConfig: {
      sender: 'support@robl0x-free-premium.xyz',
      subject: 'Срочно! Твой аккаунт получит 1000 Robux прямо сейчас!',
      body: 'Поздравляем! Ты победил в лотерее. Чтобы получить монеты, перейди по ссылке и введи свой пароль от аккаунта в течение 5 минут, иначе приз сгорит!',
      threatCount: 3
    }
  },
  {
    id: 'g4_l34',
    courseId: 'course_grade4',
    module: 'Модуль 7: Клиент-сервер, сеть и безопасность',
    title: 'Урок 34: Безопасные загрузки и здоровье компьютера',
    type: 'fake_detector',
    description: 'Стандарты: CSTA 1B-NI-05, 1B-CS-03 · UK KS2 · ACARA AC9TDI6P09 · KZ Инф 7.4.2.1. Отличай настоящие файлы от вирусов, троянов и фальшивых кнопок «Скачать».',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            🛡️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Вредоносные программы (Malware)
            </h3>
            <p class="text-xs text-slate-300">
              Фальшивые читы или моды часто прячут расширение: <code class="text-red-400 font-mono">skin.png.exe</code>. Если картинка заканчивается на .exe — это вирус!
            </p>
          </div>
        </div>
      </div>
    `,
    fakeDetectorConfig: {
      claim: 'Сайт предлагает скачать «Читы_для_игры.exe», обещая бессмертие, но антивирус выдает предупреждение.',
      isFake: true,
      explanation: 'Антивирус предупреждает об опасности, а неизвестный сайт предлагает запустить программу. Не запускай и не отключай защиту; покажи предупреждение взрослому.'
    }
  },
  {
    id: 'g4_l35',
    courseId: 'course_grade4',
    module: 'Модуль 7: Клиент-сервер, сеть и безопасность',
    title: 'Урок 35: Безопасность онлайн-аккаунтов',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-NI-05 · UK KS2 · ACARA AC9TDI6P09 · KZ ЦГ 4.1.3.1. Создание надежных паролей, двухфакторная аутентификация (2FA) и менеджеры паролей.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-green-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🔐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Двухфакторная защита (2FA)
            </h3>
            <p class="text-xs text-slate-300">
              Даже если злоумышленник подглядел твой пароль, 2FA потребует ввести одноразовый 6-значный код из SMS или приложения-аутентификатора на телефоне!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой пароль является самым надежным и устойчивым ко взлому?',
      options: [
        'K@zakhstan_2026!Rocket',
        'Ivan2015Astana',
        '1234567890abc',
        'qwertyuiopasdf'
      ],
      correctIndex: 0,
      explanation: 'Идеально! Пароль длинный (больше 12 символов), содержит заглавные и строчные буквы, цифры и спецсимволы (@, !, _).'
    }
  }
];
