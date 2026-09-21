import { Task } from '../../types';

export const MODULE6_TASKS: Task[] = [
  {
    id: 'g3_m6_l1',
    courseId: 'course_grade3',
    module: 'Модуль 6: Кибер-Детектив: Безопасность и правда',
    title: 'Урок 1: Детектор правды и фейков: Реальность vs Обман',
    type: 'fake_detector',
    description: 'В интернете много ловушек и выдумок! Проверь 6 реальных историй и разоблачи фейки и опасные ссылки.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-amber-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🕵️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Как отличить правду от обмана в интернете?
            </h3>
            <p class="text-xs text-slate-300">
              Не всё, что написано на красивой картинке в сети — чистая правда.
            </p>
          </div>
        </div>
        <div class="p-2.5 bg-yellow-950/40 border border-yellow-500/30 rounded-lg text-yellow-200">
          🎯 Нажимай кнопку «Опасно/Фейк» или «Безопасно» для каждого случая!
        </div>
      </div>
    `
  },
  {
    id: 'g3_m6_l2',
    courseId: 'course_grade3',
    module: 'Модуль 6: Кибер-Детектив: Безопасность и правда',
    title: 'Урок 2: Формула идеального пароля: Цифровой сейф',
    type: 'quiz',
    description: 'Почему простые пароли "123456" и "qwerty" ломаются мгновенно? Создай надежный замок на свой аккаунт!',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl">
          <h4 class="font-bold text-cyan-300 text-sm mb-1">🔑 Формула идеального пароля</h4>
          <p>Пароль — это ключ от твоей учетной записи. Простой пароль робот-взломщик подбирает за доли секунды!</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-rose-950/40 border border-rose-500/40 rounded-xl space-y-1">
            <div class="text-rose-300 font-bold">❌ Слабый пароль (0 секунд):</div>
            <ul class="list-disc list-inside text-slate-300 text-[11px] space-y-0.5 pl-1">
              <li><code>12345678</code></li>
              <li><code>qwerty</code> или имя питомца</li>
            </ul>
          </div>
          <div class="p-3 bg-emerald-950/40 border border-emerald-500/40 rounded-xl space-y-1">
            <div class="text-emerald-300 font-bold">✅ Надежный пароль:</div>
            <ul class="list-disc list-inside text-slate-300 text-[11px] space-y-0.5 pl-1">
              <li>Не менее 10-12 знаков</li>
              <li>БОЛЬШИЕ и маленькие буквы: <code>Kot_</code></li>
              <li>Цифры и спецсимволы: <code>!99</code></li>
            </ul>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой из этих паролей наиболее надежен и защищен от автоматического подбора?',
      options: [
        'Super#Robot2026!',
        'Ivanov2015god',
        '1234567890',
        'qwertyuiop'
      ],
      correctIndex: 0,
      explanation: 'Пароль "Super#Robot2026!" длинный, с заглавными буквами, цифрами и знаками (#, !). Его невозможно взломать простым перебором!'
    }
  },
  {
    id: 'g3_m6_l3',
    courseId: 'course_grade3',
    module: 'Модуль 6: Кибер-Детектив: Безопасность и правда',
    title: 'Урок 3: Двухфакторная защита (2FA): СМС и код подтверждения',
    type: 'quiz',
    description: 'Что такое второй фактор защиты и почему даже украденный пароль не поможет вору?',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-xl">
          <h4 class="font-bold text-indigo-300 text-sm mb-1">🛡️ Два замка на одну дверь (2FA)</h4>
          <p>Двухфакторная аутентификация — это когда для входа нужны ДВА подтверждения:</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1.5 text-xs">
          <div>1️⃣ <strong>Что ты знаешь:</strong> твой логин и пароль.</div>
          <div>2️⃣ <strong>Что у тебя есть:</strong> телефон родителей, на который приходит одноразовый секретный СМС-код.</div>
          <p class="text-slate-400 text-[11px] mt-1">Даже если вор подсмотрел твой пароль, без телефона он не сможет зайти в профиль!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как двухфакторная защита (2FA) защищает аккаунт, если злоумышленник узнал пароль?',
      options: [
        'Нужен второй код из СМС на телефон',
        'Пароль меняется сам каждый день',
        'Вход разрешён только с одного ПК',
        'Пароль скрыт звёздочками при вводе'
      ],
      correctIndex: 0,
      explanation: 'Второй фактор (одноразовый код на телефон) надежно блокирует доступ чужим людям!'
    }
  },
  {
    id: 'g3_m6_l4',
    courseId: 'course_grade3',
    module: 'Модуль 6: Кибер-Детектив: Безопасность и правда',
    title: 'Урок 4: Ловушки фишинга: Письма с фальшивой наживкой',
    type: 'phishing_detect',
    description: 'Мошенники присылают поддельные письма от любимых игр. Найди все 4 опасные зоны в фишинговом письме!',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl">
          <h4 class="font-bold text-rose-300 text-sm mb-1">🎣 Фишинг (Рыбалка мошенников)</h4>
          <p>Пираты рассылают фальшивые письма, чтобы напугать и выведать пароль от аккаунта.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-yellow-300 font-bold">4 признака обмана:</div>
          <ul class="list-disc list-inside text-slate-300 text-[11px] space-y-0.5">
            <li>Странный адрес отправителя (не официальный домен игры).</li>
            <li>Искусственная спешка: «Срочно, через 10 минут всё удалится!»</li>
            <li>Фальшивая ссылка.</li>
            <li>Опасное вложение (.exe).</li>
          </ul>
        </div>
      </div>
    `
  },
  {
    id: 'g3_m6_l5',
    courseId: 'course_grade3',
    module: 'Модуль 6: Кибер-Детектив: Безопасность и правда',
    title: 'Урок 5: Личная тайна и цифровой след в сети',
    type: 'quiz',
    description: 'Узнай, какую информацию категорически нельзя публиковать в открытом доступе в интернете!',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border border-purple-500/40 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">👣 Цифровой след</h4>
          <p>Каждое фото, пост и комментарий навсегда остаются в архивах сети. Их могут найти незнакомцы.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1 text-xs">
          <div class="text-rose-400 font-bold">🚫 СТРОГО СЕКРЕТНО:</div>
          <ul class="list-disc list-inside space-y-0.5 text-slate-300 text-[11px]">
            <li>Домашний адрес и номер квартиры</li>
            <li>Номер школы и расписание секций</li>
            <li>Телефоны и банковские карты родителей</li>
          </ul>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какую информацию можно БЕЗОПАСНО опубликовать на детском форуме?',
      options: [
        'Любимый цвет и породу своей собаки',
        'Название школы и номер класса',
        'Домашний адрес и номер квартиры',
        'Номер телефона мамы'
      ],
      correctIndex: 0,
      explanation: 'Любимый цвет и увлечения — это безопасная информация. А домашний адрес и документы раскрывать нельзя!'
    }
  },
  {
    id: 'g3_m6_l6',
    courseId: 'course_grade3',
    module: 'Модуль 6: Кибер-Детектив: Безопасность и правда',
    title: 'Урок 6: Кибербуллинг и правила вежливого общения в чатах',
    type: 'quiz',
    description: 'Что делать, если в онлайн-игре или чате начинают дразнить и обижать? Как правильно реагировать на грубость.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-blue-950/60 border border-blue-500/40 rounded-xl">
          <h4 class="font-bold text-blue-300 text-sm mb-1">🤝 Цифровой этикет и защита от троллей</h4>
          <p>Если кто-то в игре злится и пишет обидные слова (кибербуллинг), не нужно отвечать тем же!</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-yellow-300 font-bold">Золотые правила:</div>
          <p class="text-slate-300 text-[11px]">1. Нажми кнопку <strong>«Пожаловаться» (Report)</strong> модераторам игры.</p>
          <p class="text-slate-300 text-[11px]">2. Отправь обидчика в <strong>Чёрный список (Block/Mute)</strong>.</p>
          <p class="text-slate-300 text-[11px]">3. Расскажи родителям или учителю.</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как правильнее всего поступить, если незнакомый игрок в чате начинает грубить и дразниться?',
      options: [
        'Заблокировать его и сказать родителям',
        'Ответить ему так же грубо',
        'Удалить свой аккаунт навсегда',
        'Попросить у него прощения'
      ],
      correctIndex: 0,
      explanation: 'Тролли ищут внимания. Лучшая защита — кнопка блокировки (Blacklist) и поддержка взрослых!'
    }
  },
  {
    id: 'g3_m6_l7',
    courseId: 'course_grade3',
    module: 'Модуль 6: Кибер-Детектив: Безопасность и правда',
    title: 'Урок 7: Экзамен модуля: Диплом Специалиста по Кибербезопасности',
    type: 'quiz',
    description: 'Главный зачет по цифровой гигиене: сложные пароли, фишинг, защита от вирусов и личная тайна!',
    difficulty: 'Хакер',
    xpReward: 130,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-emerald-950/80 border border-emerald-500/50 rounded-xl">
          <h4 class="font-bold text-emerald-300 text-sm mb-1">🛡️ Финал Модуля 6</h4>
          <p>Ты научился создавать несокрушимые пароли, распознавать фишинговые ловушки и беречь свои личные данные. Пройди финальный тест!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что является главным правилом при получении письма с сообщением «Вы выиграли миллион, кликните сюда»?',
      options: [
        'Не открывать ссылку, показать родителям',
        'Открыть ссылку и посмотреть, что там',
        'Ответить и спросить подробности',
        'Переслать письмо одноклассникам'
      ],
      correctIndex: 0,
      explanation: 'Обещания легких денег и призов в интернете — это классическая ловушка мошенников!'
    }
  }
];
