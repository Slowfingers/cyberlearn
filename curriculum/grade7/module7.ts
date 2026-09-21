import { Task } from '../../types';

export const MODULE7_TASKS: Task[] = [
  {
    id: 'g7_l44',
    courseId: 'course_grade7',
    module: 'Блок 7: Сети, Интернет и Кибербезопасность',
    title: 'Урок 44: Стек протоколов — слои интернета',
    type: 'network_route',
    description: 'CSTA 2-NI-04, UK KS3, ACARA ACTDIK023: Модель OSI и TCP/IP: Прикладной уровень (HTTP, DNS), Транспортный (TCP/UDP), Сетевой (IP), Канальный (Ethernet/Wi-Fi).',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 font-mono text-cyan-300">
            🌐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Стек протоколов TCP/IP: Как устроен интернет
            </h3>
            <p class="text-xs text-slate-300">
              Данные разбиваются на независимые IP-пакеты. Протокол TCP гарантирует надежную доставку с подтверждением приема (Handshake), а UDP передает видео и игровой поток без задержек.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g7_l45',
    courseId: 'course_grade7',
    module: 'Блок 7: Сети, Интернет и Кибербезопасность',
    title: 'Урок 45: IP, порты, ping, traceroute',
    type: 'terminal',
    description: 'CSTA 2-NI-04: Адресация IPv4 / IPv6, сокеты и порты (80 HTTP, 443 HTTPS, 22 SSH, 53 DNS), сетевая диагностика утилитами ping и traceroute.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            📡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Сетевая диагностика: ping и traceroute
            </h3>
            <p class="text-xs text-slate-300">
              Команда <code class="text-yellow-300 font-mono">ping</code> измеряет RTT (Round Trip Time) — время полета пакета туда и обратно в миллисекундах. Утилита <code class="text-cyan-300 font-mono">traceroute</code> показывает все промежуточные маршрутизаторы на планете.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'ping -c 3 8.8.8.8',
    terminalOutput: '> 64 bytes from 8.8.8.8: icmp_seq=1 ttl=118 time=12.4 ms\n> 64 bytes from 8.8.8.8: icmp_seq=2 ttl=118 time=11.9 ms\n> 64 bytes from 8.8.8.8: icmp_seq=3 ttl=118 time=12.1 ms\n> --- 8.8.8.8 ping statistics: 0% packet loss ---'
  },
  {
    id: 'g7_l46',
    courseId: 'course_grade7',
    module: 'Блок 7: Сети, Интернет и Кибербезопасность',
    title: 'Урок 46: Анатомия HTTP — читаем настоящие запросы и ответы',
    type: 'quiz',
    description: 'CSTA 2-NI-04, ACARA ACTDIK023: Клиент-серверная архитектура, методы GET, POST, PUT, DELETE, заголовки Headers (User-Agent, Content-Type, Authorization), тело Body JSON.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-cyan-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 font-mono text-purple-300">
            📨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Анатомия HTTP-запроса
            </h3>
            <p class="text-xs text-slate-300">
              Запрос состоит из строки запроса (<code class="text-yellow-300 font-mono">GET /index.html HTTP/1.1</code>), заголовков (метаданные о браузере и кодировке) и тела запроса (при отправке форм методом POST).
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой HTTP метод используется браузером для отправки формы с паролем или создания новой записи на сервере?',
      options: [
        'POST',
        'GET',
        'HEAD',
        'OPTIONS'
      ],
      correctIndex: 0,
      explanation: 'Метод POST предназначен для отправки полезной нагрузки на сервер (регистрация, авторизация, публикация постов).'
    }
  },
  {
    id: 'g7_l47',
    courseId: 'course_grade7',
    module: 'Блок 7: Сети, Интернет и Кибербезопасность',
    title: 'Урок 47: Менеджер паролей как привычка',
    type: 'quiz',
    description: 'CSTA 2-NI-05, UK KS3, Singapore, ABEGS, ISTE, DigComp, KZ ЦГ 4.1.3.1 / 8.4.2.1: Энтропия паролей, мастер-пароль, сквозное шифрование AES-256, двухфакторная аутентификация (2FA / TOTP), риски повторного использования паролей.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            🔐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Энтропия паролей и менеджеры шифрования
            </h3>
            <p class="text-xs text-slate-300">
              Одинаковый пароль на разных сайтах — главная уязвимость (Credential Stuffing). Менеджер паролей генерирует случайные 20-значные ключи с высокой криптографической энтропией.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Почему один и тот же сложный пароль нельзя использовать на нескольких разных сайтах?',
      options: [
        'Утечка одного сайта откроет все аккаунты',
        'Пароль портится от слишком частого ввода',
        'Браузер перестанет сохранять этот пароль',
        'Сайты обмениваются паролями между собой'
      ],
      correctIndex: 0,
      explanation: 'Атака Credential Stuffing основана именно на том, что утекшие с одного взломанного форума пароли автоматически тестируются злоумышленниками на почте и соцсетях жертвы.'
    }
  },
  {
    id: 'g7_l48',
    courseId: 'course_grade7',
    module: 'Блок 7: Сети, Интернет и Кибербезопасность',
    title: 'Урок 48: Криминалистика фишинга',
    type: 'phishing_detect',
    description: 'CSTA 2-NI-05, UK, Singapore, Common Sense, KZ Инф 8.4.2.1: Анализ SPF, DKIM, DMARC, спуфинг доменов, гомоглифы (unicode spoofing), поддельные ссылки и сценарии социальной инженерии.',
    difficulty: 'Хакер',
    xpReward: 115,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-amber-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 font-mono text-red-300">
            🕵️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Криминалистика фишинга: Анализ заголовков и доменов
            </h3>
            <p class="text-xs text-slate-300">
              Атакующие создают домены-двойники (например, <code class="text-yellow-300 font-mono">paypaI.com</code> с большой буквой «I» вместо «l»). Внимательно проверяй сертификат SSL и настоящий домен в строке адреса!
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g7_l49',
    courseId: 'course_grade7',
    module: 'Блок 7: Сети, Интернет и Кибербезопасность',
    title: 'Урок 49: Безопасность браузера и введение в моделирование угроз',
    type: 'quiz',
    description: 'CSTA 2-NI-06, UK KS3, ACARA ACTDIK023, KZ Инф 8.4.2.1: Политика Same-Origin Policy (SOP), HTTPS и сертификаты TLS, куки (SameSite, HttpOnly), модель угроз STRIDE.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-blue-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 font-mono text-indigo-300">
            🛡️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Песочница браузера: Same-Origin Policy и HTTPS
            </h3>
            <p class="text-xs text-slate-300">
              Политика единого источника (Same-Origin Policy) запрещает скрипту с одного сайта читать конфиденциальные куки или данные другого сайта в соседней вкладке.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что защищает протокол HTTPS в сравнении с устаревшим открытым HTTP?',
      options: [
        'Шифрует трафик протоколом TLS',
        'Ускоряет загрузку видео и картинок',
        'Блокирует рекламу на всех страницах',
        'Проверяет сайт на наличие вирусов'
      ],
      correctIndex: 0,
      explanation: 'HTTPS шифрует пакеты криптографическим протоколом TLS, гарантируя конфиденциальность данных и защиту от перехвата атакой Man-in-the-Middle.'
    }
  }
];
