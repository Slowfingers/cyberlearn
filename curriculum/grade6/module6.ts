import { Task } from '../../types';

export const MODULE6_TASKS: Task[] = [
  {
    id: 'g6_m6_l1',
    courseId: 'course_grade6',
    module: 'Блок 6: Сети, DNS и Кибербезопасность',
    title: 'Урок 1: DNS изнутри: Как доменные имена превращаются в IP-адреса',
    type: 'quiz',
    description: 'Система доменных имен DNS — всемирная телефонная книга интернета. Разберись, как браузер находит сервер сайта.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🌐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              DNS (Domain Name System) — навигатор всемирной сети
            </h3>
            <p class="text-xs text-slate-300">
              Людям легко запоминать слова (<code class="text-yellow-300 font-mono">yandex.ru</code>), а маршрутизаторы интернета понимают только числовые IP-адреса (<code class="text-cyan-300 font-mono">87.250.250.242</code>).
            </p>
          </div>
        </div>

        <div class="bg-black/80 p-4 border border-cyan-500/40 rounded-xl space-y-1.5 font-mono text-xs">
          <div class="text-cyan-400 font-bold font-sans">Цепочка разрешения DNS-запроса:</div>
          <div class="text-slate-300">1. Браузер спрашивает: «Какой IP у school.edu?»</div>
          <div class="text-slate-300">2. DNS-резолвер опрашивает корневые серверы (.)</div>
          <div class="text-slate-300">3. Сервер зоны .edu указывает на авторитетный сервер школы</div>
          <div class="text-emerald-400 font-bold">4. Браузер получает IP-адрес и мгновенно подключается!</div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какую главную функцию выполняет служба DNS (Domain Name System) в сети интернет?',
      options: [
        'Переводит доменное имя в IP-адрес',
        'Удаляет вирусы с жёсткого диска',
        'Шифрует трафик между браузером и сайтом',
        'Хранит копии страниц популярных сайтов'
      ],
      correctIndex: 0,
      explanation: 'DNS переводит буквенные домены в IP-адреса, позволяя компьютерам быстро находить нужные серверы по всему земному шару.'
    }
  },
  {
    id: 'g6_m6_phish',
    courseId: 'course_grade6',
    module: 'Блок 6: Сети, DNS и Кибербезопасность',
    title: 'Урок 2: Криминалистика фишинга: Расследование 4 скрытых угроз',
    type: 'phishing_detect',
    description: 'Интерактивный симулятор криминалистического анализа: исследуй фальшивое письмо мошенников и кликни по всем 4 ловушкам!',
    difficulty: 'Хакер',
    xpReward: 140,
    currencyReward: 60,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-purple-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎣
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Фишинг: Анатомия социальной инженерии
            </h3>
            <p class="text-xs text-slate-300">
              Хакеры редко взламывают сложные криптоалгоритмы — чаще они обманывают невнимательных пользователей через письма-приманки.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-900 border border-red-500/30 rounded-xl space-y-1">
            <span class="text-red-400 font-bold">1. Фальшивый домен</span>
            <p class="text-slate-300">Буквы подменяются созвучными (<code class="font-mono text-yellow-300">sber-security.cc</code> вместо официального сайта).</p>
          </div>
          <div class="p-3 bg-slate-900 border border-red-500/30 rounded-xl space-y-1">
            <span class="text-red-400 font-bold">2. Срочность и паника</span>
            <p class="text-slate-300">«Ваш счет заблокирован через 15 минут!» — чтобы отключить критическое мышление жертвы.</p>
          </div>
        </div>
      </div>
    `,
    phishingConfig: {
      sender: 'security-alert@sber-security-check.cc',
      subject: '[КРИТИЧЕСКИ] Ваша учетная запись заблокирована!',
      body: 'У вас 15 минут...',
      threatCount: 4
    }
  },
  {
    id: 'g6_m6_l2',
    courseId: 'course_grade6',
    module: 'Блок 6: Сети, DNS и Кибербезопасность',
    title: 'Урок 3: Двухфакторная аутентификация 2FA: Алгоритм TOTP',
    type: 'quiz',
    description: 'Как работает приложение-аутентификатор без интернета? Синхронизация времени Unix, секретный ключ и криптохеш HMAC.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔑
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              2FA: Два независимых фактора проверки
            </h3>
            <p class="text-xs text-slate-300">
              Даже если злоумышленник подсмотрел твой пароль, он не сможет войти без второго фактора, хранящегося на твоем физическом устройстве.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-cyan-400 font-bold">Фактор знания</span>
            <p class="text-slate-300">То, что ты знаешь: пароль, пин-код или кодовое слово.</p>
          </div>
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-emerald-400 font-bold">Фактор владения</span>
            <p class="text-slate-300">То, чем ты владеешь: твой смартфон с генератором кодов TOTP (Google Authenticator) или аппаратный ключ YubiKey.</p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Почему временные 6-значные коды в приложении аутентификаторе (Google Authenticator) генерируются даже в режиме полета без интернета?',
      options: [
        'Код считается из секретного ключа и времени',
        'Телефон тайно ловит сигнал спутников GPS',
        'Все коды заранее записаны на SIM-карту',
        'Код приходит по СМС и сохраняется заранее'
      ],
      correctIndex: 0,
      explanation: 'Алгоритм TOTP (Time-based One-Time Password) берет текущую метку времени (Unix timestamp / 30) и секретный ключ, прогоняя через хеш HMAC.'
    }
  },
  {
    id: 'g6_m6_fake',
    courseId: 'course_grade6',
    module: 'Блок 6: Сети, DNS и Кибербезопасность',
    title: 'Урок 4: Цифровой фактчекинг: Детектор манипуляций и фейков',
    type: 'fake_detector',
    description: 'Интерактивный анализ медиа: разоблачи сомнительные сенсации, кликбейтные заголовки и манипулятивные вбросы!',
    difficulty: 'Хакер',
    xpReward: 130,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Критическое мышление в эпоху дипфейков
            </h3>
            <p class="text-xs text-slate-300">
              В современном интернете любая шокирующая новость может быть сгенерирована ботом для сбора просмотров и распространения вредоносного софта.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-purple-300 font-bold">Чек-лист фактчекера:</div>
          <ul class="list-disc list-inside text-slate-300 space-y-1">
            <li>Есть ли первоисточник и официальное подтверждение в научных изданиях?</li>
            <li>Не содержит ли заголовок капслока и слов «ШОК! СРОЧНО РЕПОСТ»?</li>
            <li>Проверь дату публикации — часто старые фото выдают за свежие события.</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 'g6_m6_pass',
    courseId: 'course_grade6',
    module: 'Блок 6: Сети, DNS и Кибербезопасность',
    title: 'Урок 5: Энтропия паролей: Математика взлома методом Brute-Force',
    type: 'quiz',
    description: 'Почему длина пароля в 16 символов в миллиарды раз надежнее короткого пароля со спецсимволом: комбинаторика защиты.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-red-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🛡️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Формула перебора: Количество комбинаций Nᴸ
            </h3>
            <p class="text-xs text-slate-300">
              Число возможных вариантов пароля равно размеру алфавита (N), возведенному в степень длины пароля (L).
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-amber-500/40 rounded-xl text-xs space-y-1.5 font-mono">
          <div class="text-slate-300">Пароль из 8 символов: <code class="text-red-400 font-bold">26⁸ ≈ 200 миллиардов</code> (взлом видеокартой за секунды)</div>
          <div class="text-slate-300">Пароль-фраза из 16 символов: <code class="text-emerald-400 font-bold">26¹⁶ ≈ 43 септиллиона</code> (взлом займет миллионы лет!)</div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой пароль будет наиболее устойчив к автоматизированному подбору (Brute-force) суперкомпьютером?',
      options: [
        'galaxy-orbit-coffee-bridge',
        'qwertyuiopasdfghjkl',
        'P@ss1',
        '12052011'
      ],
      correctIndex: 0,
      explanation: 'Экспоненциальная сложность: длина пароля влияет на устойчивость к перебору неизмеримо сильнее, чем замена одной буквы на спецсимвол.'
    }
  }
];
