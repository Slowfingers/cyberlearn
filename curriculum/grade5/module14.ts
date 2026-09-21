import { Task } from '../../types';

export const MODULE14_TASKS: Task[] = [
  {
    id: 'g5_l66',
    courseId: 'course_grade5',
    module: 'Блок 14: Академическая честность, Электронная коммерция и Физические датчики',
    title: 'Урок 66: Использовать ИИ без списывания — честность ученика',
    type: 'quiz',
    description: 'ИИ как персональный тьютор против слепого плагиата: как использовать нейросети для генерации идей и поиска ошибок, не нарушая академическую честность.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎓
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              ИИ как тренажер ума, а не генератор списывания
            </h3>
            <p class="text-xs text-slate-300">
              Попросить ИИ: «Объясни мне закон всемирного тяготения простыми словами с примерами из футбола» — это грамотная учеба. Попросить ИИ написать сочинение вместо себя — плагиат и самообман.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой из следующих вариантов является этичным и правильным использованием искусственного интеллекта в учебе?',
      options: [
        'Попросить объяснить тему и сделать тест',
        'Сдать сгенерированный текст как своё сочинение',
        'Попросить ИИ написать справку для школы',
        'Дать ИИ решить контрольную за тебя'
      ],
      correctIndex: 0,
      explanation: 'ИИ задуман как интеллектуальный репетитор и наставник, развивающий самостоятельное мышление ученика.'
    }
  },
  {
    id: 'g5_l67',
    courseId: 'course_grade5',
    module: 'Блок 14: Академическая честность, Электронная коммерция и Физические датчики',
    title: 'Урок 67: Безопасные покупки в интернете',
    type: 'quiz',
    description: 'Интернет-магазины: одноразовые виртуальные карты, проверка подлинности домена, 3D-Secure подтверждения и защита от скрытых подписок.',
    difficulty: 'Хакер',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            💳
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Безопасность онлайн-платежей
            </h3>
            <p class="text-xs text-slate-300">
              Никогда не вводи данные банковской карты на сайтах без защищенного соединения HTTPS (замочек в адресной строке) и без согласия родителей!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое главное правило безопасности при покупке игровых предметов или вещей в интернете?',
      options: [
        'Покупать с родителями на проверенных сайтах',
        'Вводить карту на сайтах с бесплатной валютой',
        'Отправлять фото карты продавцу в чате',
        'Сохранять данные карты в игровом клубе'
      ],
      correctIndex: 0,
      explanation: 'Финансовые операции в сети требуют родительского контроля, официального шлюза эквайринга и двухфакторной защиты 3D-Secure.'
    }
  },
  {
    id: 'g5_l68',
    courseId: 'course_grade5',
    module: 'Блок 14: Академическая честность, Электронная коммерция и Физические датчики',
    title: 'Урок 68: Истории датчиков — итоговый проект по физическим вычислениям',
    type: 'quiz',
    description: 'Физические вычисления (Physical Computing): микроконтроллеры (micro:bit, Arduino), датчики света, звука, наклона и актуаторы (моторы, пьезопищалки).',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔌
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Микроконтроллеры и Интернет вещей (IoT)
            </h3>
            <p class="text-xs text-slate-300">
              Код оживает в материальном мире! Микрокомпьютер micro:bit считывает данные акселерометра и зажигает светодиодное сердце, когда ты его встряхиваешь.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой датчик микроконтроллера позволяет определить, что устройство уронили, встряхнули или повернули на бок?',
      options: [
        'Акселерометр',
        'Термометр',
        'Датчик влажности',
        'Микрофон'
      ],
      correctIndex: 0,
      explanation: 'Акселерометр измеряет проекцию ускорения по трем осям (X, Y, Z), отслеживая любые движения гаджета.'
    }
  },
  {
    id: 'g5_l69',
    courseId: 'course_grade5',
    module: 'Блок 14: Академическая честность, Электронная коммерция и Физические датчики',
    title: 'Урок 69: Этикет электронной почты и переписки',
    type: 'quiz',
    description: 'Деловая переписка инженера: тема письма (Subject line), вежливое обращение, четкая суть в первых двух предложениях и подпись отправителя.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ✉️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Анатомия грамотного электронного письма (Email)
            </h3>
            <p class="text-xs text-slate-300">
              1. <strong>Тема письма</strong> (всегда заполнена!). 2. Приветствие по имени. 3. Суть вопроса или просьбы. 4. Заключение и подпись с классом и фамилией.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Почему отправлять учителю или научному руководителю письмо с пустой строкой «Тема» (Subject) считается дурным тоном?',
      options: [
        'Письмо непонятно и попадёт в спам',
        'Почта возьмёт плату за пустую тему',
        'Письмо придёт получателю с задержкой',
        'Письмо нельзя будет переслать дальше'
      ],
      correctIndex: 0,
      explanation: 'Тема письма позволяет адресату сразу понять срочность и содержание вопроса, а спам-фильтрам — не заблокировать сообщение.'
    }
  },
  {
    id: 'g5_l70',
    courseId: 'course_grade5',
    module: 'Блок 14: Академическая честность, Электронная коммерция и Физические датчики',
    title: 'Урок 70: Указывай источники — даже если это ИИ',
    type: 'quiz',
    description: 'Цитирование цифровых источников и ИИ-инструментов: оформление списка литературы, ссылки на авторов и честное указание соавторства технологий.',
    difficulty: 'Новичок',
    xpReward: 120,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-purple-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎓
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Финальный шаг 5 класса: Культура цитирования
            </h3>
            <p class="text-xs text-slate-300">
              Если идея или код были найдены на сайте или сгенерированы с помощью нейросети — честно укажи это в сноске: «Иллюстрация создана с помощью нейросети». Настоящий ученый всегда честен!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как следует поступить пятикласснику в школьном проекте, если диаграмму или фрагмент кода ему помог составить искусственный интеллект?',
      options: [
        'Указать ИИ в списке источников работы',
        'Сказать, что всё сделано полностью самому',
        'Удалить диаграмму из готового проекта',
        'Не упоминать ИИ: это личное дело автора'
      ],
      correctIndex: 0,
      explanation: 'Прозрачность и честное указание использованных инструментов — основа современной научной этики.'
    }
  }
];
