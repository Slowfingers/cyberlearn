import { Task } from '../../types';

export const MODULE11_TASKS: Task[] = [
  {
    id: 'g7_l61',
    courseId: 'course_grade7',
    module: 'Блок 11: Цифровая грамотность, Этика и Личный бренд',
    title: 'Урок 61: Баланс технологий и жизни — отслеживаем собственные привычки',
    type: 'quiz',
    description: 'Common Sense, UK, Singapore, DigComp, KZ Инф 8.4.1.1 / 9.4.1.1: Цифровой детокс, дофаминовые циклы уведомлений (Infinite Scroll, Variable Rewards), экранное время и сон.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🌱
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Цифровая гигиена: Дофаминовые петли и внимание
            </h3>
            <p class="text-xs text-slate-300">
              Интерфейсы с бесконечной лентой (Infinite Scroll) специально спроектированы для удержания взгляда за счет непредсказуемого дофаминового вознаграждения. Осознанный инженер управляет технологиями, а не технологии им!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой дизайн-паттерн в приложениях сильнее всего провоцирует бесконтрольное пролистывание ленты?',
      options: [
        'Бесконечная прокрутка ленты',
        'Кнопка выхода из аккаунта',
        'Тёмная тема оформления',
        'Значок непрочитанных сообщений'
      ],
      correctIndex: 0,
      explanation: 'Бесконечная лента устраняет естественные точки остановки внимания, заставляя мозг бесконечно ждать новой дозы интересной информации.'
    }
  },
  {
    id: 'g7_l62',
    courseId: 'course_grade7',
    module: 'Блок 11: Цифровая грамотность, Этика и Личный бренд',
    title: 'Урок 62: Триангуляция источников — как проверяют факты журналисты',
    type: 'quiz',
    description: 'Common Sense, UK, Singapore, MIL, ISTE, DigComp, KZ Инф 9.2.1.1: Метод латерального чтения (Lateral Reading), проверка минимум по 3 независимым авторитетным источникам, поиск первоисточника фото/видео через обратный поиск.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0">
            🔍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Латеральное чтение и метод триангуляции
            </h3>
            <p class="text-xs text-slate-300">
              Профессиональные фактчекеры не оценивают сайт по его внешнему красивому дизайну. Они сразу открывают соседние вкладки браузера, чтобы узнать, что об этом авторе и исследовании пишут признанные международные институты.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'В чем суть метода триангуляции источников при проверке громкой новости в сети?',
      options: [
        'Подтвердить факт в трёх независимых источниках',
        'Прочитать новость три раза подряд внимательно',
        'Переслать новость трём друзьям для проверки',
        'Найти три комментария, согласных с новостью'
      ],
      correctIndex: 0,
      explanation: 'Триангуляция требует независимого совпадения данных из 3 различных авторитетных источников информации.'
    }
  },
  {
    id: 'g7_l63',
    courseId: 'course_grade7',
    module: 'Блок 11: Цифровая грамотность, Этика и Личный бренд',
    title: 'Урок 63: Кибербуллинг — закон, психология, действие',
    type: 'quiz',
    description: 'Common Sense, UK, Singapore, MIL, ISTE, DigComp, KZ Инф 8.4.2.1 / 9.4.2.1: Юридическая ответственность, фиксация доказательств (скриншоты с URL и датой), запрет ответной эскалации, поддержка жертв травли.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-amber-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0">
            🛡️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Протокол реагирования на кибербуллинг
            </h3>
            <p class="text-xs text-slate-300">
              Золотое правило: <strong>Не отвечать, Зафиксировать (скриншот), Заблокировать, Сообщить взрослым/модераторам</strong>. Оскорбления и угрозы в сети преследуются законом.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое первое правильное действие необходимо предпринять при столкновении с онлайн-травлей или угрозами?',
      options: [
        'Сохранить скриншоты, заблокировать, сказать взрослым',
        'Ответить обидчику так же резко и капслоком',
        'Удалить свой аккаунт и все переписки сразу',
        'Промолчать: обидчику быстро надоест самому'
      ],
      correctIndex: 0,
      explanation: 'Фиксация улик и блокировка с привлечением доверенных взрослых — единственный эффективный и безопасный алгоритм защиты.'
    }
  },
  {
    id: 'g7_l64',
    courseId: 'course_grade7',
    module: 'Блок 11: Цифровая грамотность, Этика и Личный бренд',
    title: 'Урок 64: Парасоциальные отношения и манипуляции инфлюенсеров',
    type: 'quiz',
    description: 'Common Sense, UK, Singapore, MIL, ISTE, DigComp: Иллюзия односторонней дружбы (Parasocial Interaction), скрытая реклама, методы убеждения, критический анализ блогерских рекомендаций.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            🎭
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Парасоциальные связи: Иллюзия дружбы
            </h3>
            <p class="text-xs text-slate-300">
              Когда стример обращается в камеру на «ты», мозгу кажется, что это близкий друг. Однако блогер создает коммерческий контент и продает товары аудитории.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что такое «парасоциальные отношения» в медиапространстве?',
      options: [
        'Односторонняя привязанность зрителя к блогеру',
        'Дружба двух блогеров между собой в сети',
        'Переписка подписчиков в комментариях к видео',
        'Совместный стрим нескольких популярных авторов'
      ],
      correctIndex: 0,
      explanation: 'Парасоциальные отношения создают иллюзию взаимности, которой часто пользуются маркетологи для эмоциональных продаж.'
    }
  },
  {
    id: 'g7_l65',
    courseId: 'course_grade7',
    module: 'Блок 11: Цифровая грамотность, Этика и Личный бренд',
    title: 'Урок 65: Тактики онлайн-хищников и план безопасности',
    type: 'quiz',
    description: 'Common Sense, UK, Singapore, MIL, ISTE, DigComp, KZ Инф 8.4.2.1: Тактики груминга, попытки выманивания геопозиции, домашних адресов и личных интимных фото, протокол категорического отказа («НЕТ — СТОП — ВЗРОСЛЫЕ»).',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-slate-900 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0">
            🛑
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Красные флаги онлайн-безопасности: Защита персонального периметра
            </h3>
            <p class="text-xs text-slate-300">
              Если незнакомец в игре или мессенджере просит «сохранить общение в секрете от родителей», прислать домашний адрес или включить веб-камеру один на один — это мгновенный сигнал тревоги!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое требование незнакомца в сети является главным «красным флагом» опасности?',
      options: [
        'Просьба сохранить общение в тайне от родителей',
        'Приглашение в открытый школьный турнир по шахматам',
        'Ссылка на официальную документацию по Python',
        'Вопрос о том, какая сегодня погода в городе'
      ],
      correctIndex: 0,
      explanation: 'Требование секретности от семьи и выманивание персональных сведений — классический признак манипуляции и груминга.'
    }
  },
  {
    id: 'g7_l66',
    courseId: 'course_grade7',
    module: 'Блок 11: Цифровая грамотность, Этика и Личный бренд',
    title: 'Урок 66: Соавторство с ИИ — партнёр, а не костыль',
    type: 'quiz',
    description: 'Common Sense, UK, Singapore, MIL, ISTE, DigComp, KZ Инф 6.4.2.2 / 6.4.2.3: Грамотный промпт-инжиниринг, критическая верификация галлюцинаций нейросетей, академическая честность и соавторство.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-blue-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0">
            🤖
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              ИИ как усилитель интеллекта, а не замена мышления
            </h3>
            <p class="text-xs text-slate-300">
              Использовать ИИ для генерации идей, поиска опечаток и объяснения сложных формул — профессионально. Слепо копировать чужой не проверенный текст без понимания — путь к деградации навыков.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что такое «галлюцинация» генеративного искусственного интеллекта (LLM)?',
      options: [
        'Модель уверенно выдаёт выдуманные факты',
        'Компьютер перегревается от долгой работы',
        'Нейросеть отказывается отвечать на вопрос',
        'Ответ приходит с очень большой задержкой'
      ],
      correctIndex: 0,
      explanation: 'Языковые модели предсказывают наиболее вероятные цепочки слов, поэтому могут очень правдоподобно сочинять несуществующие научные факты и авторов.'
    }
  },
  {
    id: 'g7_l67',
    courseId: 'course_grade7',
    module: 'Блок 11: Цифровая грамотность, Этика и Личный бренд',
    title: 'Урок 67: Двоичная и шестнадцатеричная системы и представление данных',
    type: 'quiz',
    description: 'UK KS3, ACARA ACTDIK024, CSTA 2-DA-07, KZ Инф 5.2.1.3 / 5.2.1.4 / 7.1.2.1 / 7.2.1.1: Перевод систем счисления (BIN -> DEC -> HEX), кодирование цветов #RRGGBB, кодировка текста UTF-8 и ASCII.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-purple-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0 font-mono text-yellow-300">
            0x
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Шестнадцатеричная система (Hexadecimal) в IT
            </h3>
            <p class="text-xs text-slate-300">
              Один шестнадцатеричный символ (0-9, A-F) кодирует ровно 4 бита (полубайт / ниббл). Два символа (например, <code class="text-emerald-300 font-mono">0xFF = 255</code>) кодируют ровно один байт информации.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое десятичное число соответствует шестнадцатеричному коду 0x10?',
      options: [
        '16',
        '10',
        '100',
        '256'
      ],
      correctIndex: 0,
      explanation: 'В шестнадцатеричной системе основанием является число 16. Число 0x10 = 1 * 16 + 0 = 16 в десятичной системе.'
    }
  },
  {
    id: 'g7_l68',
    courseId: 'course_grade7',
    module: 'Блок 11: Цифровая грамотность, Этика и Личный бренд',
    title: 'Урок 68: Онлайн-покупки и финансовое мошенничество',
    type: 'quiz',
    description: 'Common Sense, UK, Singapore, ISTE, DigComp, KZ Инф 8.4.2.1: Безопасность онлайн-платежей, 3-D Secure, виртуальные одноразовые карты, скам в онлайн-играх (скины, донат) и поддельные магазины.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            💳
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Финансовая кибербезопасность
            </h3>
            <p class="text-xs text-slate-300">
              Никогда не вводите CVV-код основной банковской карты родителей на сомнительных сайтах. Для покупок в играх и интернете используются виртуальные цифровые карты с установленным лимитом.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какую информацию о банковской карте категорически запрещено сообщать кому-либо по телефону или в чатах?',
      options: [
        'CVV-код и одноразовые коды из СМС',
        'Название банка, выпустившего карту',
        'Имя владельца, написанное на карте',
        'Срок действия, указанный на карте'
      ],
      correctIndex: 0,
      explanation: 'CVV-код и SMS-коды 3-D Secure дают полный доступ к списанию денежных средств со счета.'
    }
  },
  {
    id: 'g7_l69',
    courseId: 'course_grade7',
    module: 'Блок 11: Цифровая грамотность, Этика и Личный бренд',
    title: 'Урок 69: Здоровые онлайн-сообщества — углублённо',
    type: 'quiz',
    description: 'Common Sense, UK, Singapore, MIL, DigComp, KZ Инф 9.4.2.1: Модерация сообществ, правила этикета (Netiquette), конструктивная критика в открытом коде (Open Source), токсичность и ее предотвращение.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0">
            🤝
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Культура Open Source и сетевой этикет
            </h3>
            <p class="text-xs text-slate-300">
              Уважительное общение в issue трекерах GitHub и discord-каналах разработчиков привлекает таланты и создает великие продукты. Конструктивная критика всегда направлена на код, а не на личность автора.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой комментарий к чужому программному коду является примером конструктивного ревью?',
      options: [
        '«Здесь будет ZeroDivisionError при b=0»',
        '«Твой код ужасен, удали его скорее»',
        '«Мне не нравится, как ты назвал переменные»',
        '«Я бы написал это гораздо быстрее тебя»'
      ],
      correctIndex: 0,
      explanation: 'Конструктивное ревью указывает конкретную потенциальную ошибку и предлагает безопасное техническое решение.'
    }
  },
  {
    id: 'g7_l70',
    courseId: 'course_grade7',
    module: 'Блок 11: Цифровая грамотность, Этика и Личный бренд',
    title: 'Урок 70: Личный бренд и публичное «я» — введение',
    type: 'terminal',
    description: 'Common Sense, UK, Singapore, MIL, ISTE, DigComp, KZ Инф 9.4.2.1: Цифровой след (Digital Footprint), оформление профиля разработчика на GitHub, открытое портфолио проектов и цифровая репутация.',
    difficulty: 'Легенда',
    xpReward: 125,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-teal-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0">
            🌟
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              Твой цифровой след и GitHub-портфолио
            </h3>
            <p class="text-xs text-slate-300">
              Все опубликованные репозитории, комментарии и статьи формируют репутацию будущего инженера. Аккуратный README.md в профиле — твоя главная визитка в IT-индустрии!
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'portfolio = {\n    "author": "Junior Python Developer",\n    "projects_completed": 8,\n    "stack": ["Python 3", "SQLite", "JavaScript", "Linux CLI", "Git"],\n    "status": "Ready for Grade 8!"\n}\nprint("=" * 35)\nprint(f"ПОРТФОЛИО ИНЖЕНЕРА: {portfolio[\'author\']}")\nprint(f"Стек технологий: {\', \'.join(portfolio[\'stack\'])}")\nprint(f"Статус: {portfolio[\'status\']}")\nprint("=" * 35)',
    terminalOutput: '> ===================================\n> ПОРТФОЛИО ИНЖЕНЕРА: Junior Python Developer\n> Стек технологий: Python 3, SQLite, JavaScript, Linux CLI, Git\n> Статус: Ready for Grade 8!\n> ==================================='
  }
];
