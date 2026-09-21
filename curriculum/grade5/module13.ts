import { Task } from '../../types';

export const MODULE13_TASKS: Task[] = [
  {
    id: 'g5_l60',
    courseId: 'course_grade5',
    module: 'Блок 13: Обучение ИИ, Алгоритмы рекомендаций и Медиаграмотность',
    title: 'Урок 60: Битва тренеров ИИ — обучи, проверь, улучши классификатор',
    type: 'ai_kids_trainer',
    description: 'Машинное обучение на практике: добавление контрастных примеров, валидация точности (Accuracy) и устранение ложных срабатываний.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🥊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Тестовая выборка (Validation Dataset)
            </h3>
            <p class="text-xs text-slate-300">
              Модель нельзя проверять на тех же картинках, на которых она училась! Настоящая точность проверяется на совершенно новых, незнакомых примерах.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g5_l61',
    courseId: 'course_grade5',
    module: 'Блок 13: Обучение ИИ, Алгоритмы рекомендаций и Медиаграмотность',
    title: 'Урок 61: Знай алгоритм — как ленты не дают оторваться',
    type: 'quiz',
    description: 'Экономика внимания: как рекомендательные алгоритмы TikTok и YouTube анализируют секунды просмотра и создают дофаминовую петлю.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-red-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📱
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Экономика внимания и Рекомендательные ленты
            </h3>
            <p class="text-xs text-slate-300">
              Бесконечная лента не имеет конца намеренно. Алгоритм отслеживает миллисекунды задержки пальца на видео и подсовывает похожие ролики, заставляя забыть о времени.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какая главная цель заложена создателями в алгоритмы рекомендаций коротких видео в социальных сетях?',
      options: [
        'Удержать внимание подольше ради рекламы',
        'Помочь пользователю вовремя лечь спать',
        'Показать самые полезные обучающие видео',
        'Освободить память смартфона от мусора'
      ],
      correctIndex: 0,
      explanation: 'Рекомендательные системы оптимизированы на максимизацию времени удержания внимания (Watch Time).'
    }
  },
  {
    id: 'g5_l62',
    courseId: 'course_grade5',
    module: 'Блок 13: Обучение ИИ, Алгоритмы рекомендаций и Медиаграмотность',
    title: 'Урок 62: Дипфейки существуют — глазам больше нельзя верить',
    type: 'fake_detector',
    description: 'Технологии Deepfake: генерация синтетических лиц, клонирование голоса и артефакты нейросетей (неровные пальцы, неестественное моргание).',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-pink-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎭
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-pink-300">
              Дипфейки (Deepfakes): Разоблачение подделок
            </h3>
            <p class="text-xs text-slate-300">
              Нейросети могут заставить лицо знаменитости говорить любые слова. Обращай внимание на контуры лица, границу зубов, узоры на одежде и размытие ушей!
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g5_l63',
    courseId: 'course_grade5',
    module: 'Блок 13: Обучение ИИ, Алгоритмы рекомендаций и Медиаграмотность',
    title: 'Урок 63: Цифровая драма или буллинг — когда дразнилки переходят черту',
    type: 'quiz',
    description: 'Грань между дружеской шуткой и кибербуллингом: систематичность, дисбаланс сил и психологические последствия в виртуальном пространстве.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-purple-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🛑
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Когда шутка становится травлей?
            </h3>
            <p class="text-xs text-slate-300">
              Если человеку неприятно, он попросил остановиться, но насмешки продолжаются изо дня в день группой людей — это кибербуллинг, требующий вмешательства взрослых.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что отличает кибербуллинг (травлю) от безобидной шутки между друзьями?',
      options: [
        'Повторяемость и желание унизить',
        'Использование смайликов в сообщении',
        'Время суток, когда написано сообщение',
        'Количество людей в чате переписки'
      ],
      correctIndex: 0,
      explanation: 'Систематическое преследование и осознанное причинение дискомфорта — главные признаки травли.'
    }
  },
  {
    id: 'g5_l64',
    courseId: 'course_grade5',
    module: 'Блок 13: Обучение ИИ, Алгоритмы рекомендаций и Медиаграмотность',
    title: 'Урок 64: Первые шаги в соцсетях — когда у тебя появляется аккаунт',
    type: 'quiz',
    description: 'Настройки приватности нового профиля: закрытый аккаунт, отключение геолокации в публикациях и двухфакторная аутентификация (2FA).',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔒
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Чек-лист нового профиля: Безопасный старт
            </h3>
            <p class="text-xs text-slate-300">
              1. Сделай аккаунт приватным (только для друзей). 2. Отключи геолокацию на фотографиях. 3. Никогда не ставь в качестве пароля свое имя или год рождения!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Почему при публикации фото в социальных сетях важно отключать геометку (геолокацию)?',
      options: [
        'Посторонние узнают адрес дома и школы',
        'Фотография потеряет качество и цвет',
        'GPS быстро разрядит батарею телефона',
        'Соцсеть удалит фото через сутки'
      ],
      correctIndex: 0,
      explanation: 'Геометки раскрывают паттерны перемещений и точное местоположение ребенка, создавая физическую угрозу безопасности.'
    }
  },
  {
    id: 'g5_l65',
    courseId: 'course_grade5',
    module: 'Блок 13: Обучение ИИ, Алгоритмы рекомендаций и Медиаграмотность',
    title: 'Урок 65: Люди, которые притворяются — как выглядит груминг',
    type: 'quiz',
    description: 'Опасность онлайн-знакомств: фейковые аккаунты, попытки выведать домашний адрес, манипуляции «секретами от родителей» и правила безопасности.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-orange-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🚨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Красные флаги незнакомцев в интернете
            </h3>
            <p class="text-xs text-slate-300">
              Взрослый человек может поставить на аватарку фото подростка из игры. Если незнакомец в чате просит сохранить разговор втайне от родителей или зовет на личную встречу — немедленно расскажи взрослым!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что делать, если незнакомый человек в сетевой игре или чате настойчиво расспрашивает твой адрес и просит «никому не рассказывать об этом секрете»?',
      options: [
        'Прекратить общение и сказать взрослым',
        'Назвать выдуманный адрес и пойти одному',
        'Прислать фото документа для проверки',
        'Договориться о встрече в людном месте'
      ],
      correctIndex: 0,
      explanation: 'Любая попытка утаить общение от родителей — главный тревожный сигнал онлайн-хищников (груминга).'
    }
  }
];
