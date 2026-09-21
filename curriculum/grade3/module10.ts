import { Task } from '../../types';

export const MODULE10_TASKS: Task[] = [
  {
    id: 'g3_m10_l1',
    courseId: 'course_grade3',
    module: 'Модуль 10: Логика умного дома и электронные схемы',
    title: 'Урок 1: Как течет ток: Замкнутая цепь и батарейка',
    type: 'circuit_builder',
    description: 'Собери свою первую электрическую цепь! Соедини батарейку, провода и выключатель, чтобы зажечь лампочку.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-amber-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Закон электричества: Замкнутый круг!
            </h3>
            <p class="text-xs text-slate-300">
              Электроны могут бежать только тогда, когда дорога замкнута в непрерывное кольцо от плюса к минусу источника питания!
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-2.5 bg-slate-900 border border-emerald-500/40 rounded-xl">
            <strong class="text-emerald-300">💡 Замкнутая цепь (ВКЛ):</strong> выключатель замкнут, лампочка горит.
          </div>
          <div class="p-2.5 bg-slate-900 border border-rose-500/40 rounded-xl">
            <strong class="text-rose-300">🔌 Разомкнутая цепь (ВЫКЛ):</strong> провод разомкнут, ток остановлен.
          </div>
        </div>

        <div class="p-2.5 bg-yellow-950/40 border border-yellow-500/30 rounded-lg text-xs text-yellow-200">
          🎯 Нажми на выключатели на схеме, замкни цепь и зажги лампочку умного дома!
        </div>
      </div>
    `
  },
  {
    id: 'g3_m10_l2',
    courseId: 'course_grade3',
    module: 'Модуль 10: Логика умного дома и электронные схемы',
    title: 'Урок 2: Логический вентиль «И» (AND): Последовательное соединение',
    type: 'circuit_builder',
    description: 'Лампочка загорится, только если включен выключатель 1 И выключатель 2 одновременно! Схема последовательного соединения.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-500/40 rounded-xl">
          <h4 class="font-bold text-blue-300 text-sm mb-1">🔐 Логика «И» (AND): Строгий охранник</h4>
          <p>В этой схеме два выключателя стоят друг за другом в одной цепочке (последовательно).</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-yellow-300 font-bold">Пример:</div>
          <p class="text-slate-300 text-[11px]">Лампа горит = [Ключ А] И [Ключ Б]. Если хотя бы один ключ разомкнут — ток не пройдет!</p>
        </div>
      </div>
    `
  },
  {
    id: 'g3_m10_l3',
    courseId: 'course_grade3',
    module: 'Модуль 10: Логика умного дома и электронные схемы',
    title: 'Урок 3: Логический вентиль «ИЛИ» (OR): Параллельные дорожки',
    type: 'quiz',
    description: 'Как сделать так, чтобы свет в комнате можно было включить и у входа, ИЛИ возле кровати?',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl">
          <h4 class="font-bold text-emerald-300 text-sm mb-1">💡 Логика «ИЛИ» (OR): Параллельные мосты</h4>
          <p>В схеме «ИЛИ» ток раздваивается на две независимые дорожки. Если замкнут хотя бы один ключ — свет загорится!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Когда загорится лампа в электрической схеме с логикой «ИЛИ» (OR)?',
      options: [
        'Если замкнут хотя бы один выключатель',
        'Только если замкнуты оба выключателя',
        'Только если оба выключателя разомкнуты',
        'Только если замкнут ровно один из них'
      ],
      correctIndex: 0,
      explanation: 'В параллельной логике ИЛИ достаточно замкнуть любой из выключателей, чтобы ток нашел путь!'
    }
  },
  {
    id: 'g3_m10_l4',
    courseId: 'course_grade3',
    module: 'Модуль 10: Логика умного дома и электронные схемы',
    title: 'Урок 4: Логическое отрицание «НЕ» (NOT): Инвертор сигнала',
    type: 'quiz',
    description: 'Что такое инвертор? Узнай, как сделать так, чтобы свет включался, когда на улице становится темно!',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">🔄 Логика «НЕ» (NOT): Переворот с ног на голову</h4>
          <p>Инвертор превращает 1 в 0, а 0 — в 1.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-cyan-300 font-bold">Пример в умном фонаре:</div>
          <p class="text-slate-300 text-[11px]">Датчик света: день = 1 (много света). Инвертор делает 0 (фонарь спит). Ночью: свет = 0 ➔ инвертор выдает 1 (фонарь зажигается)!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что выдаст логический элемент «НЕ» (NOT), если на его вход подать сигнал 1 (ИСТИНА)?',
      options: [
        '0 (ЛОЖЬ)',
        '1 (ИСТИНА)',
        'И 0, и 1 одновременно',
        'Ничего: выход останется пустым'
      ],
      correctIndex: 0,
      explanation: 'Элемент НЕ переворачивает входной сигнал на строго противоположный: 1 превращается в 0!'
    }
  },
  {
    id: 'g3_m10_l5',
    courseId: 'course_grade3',
    module: 'Модуль 10: Логика умного дома и электронные схемы',
    title: 'Урок 5: Датчики Умного дома: Глаза, уши и градусники роботов',
    type: 'quiz',
    description: 'Как робот-пылесос видит край ступенек, а кондиционер узнает температуру в комнате? Изучаем сенсоры!',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-teal-950/60 border border-teal-500/40 rounded-xl">
          <h4 class="font-bold text-teal-300 text-sm mb-1">🌡️ Сенсоры и датчики (Sensors)</h4>
          <p>Датчики превращают физические явления (тепло, звук, движение) в электрические сигналы для процессора.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-3 gap-2 text-[11px]">
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg">
            <strong class="text-cyan-300">Датчик движения:</strong> включает лампу, когда человек вошел в коридор.
          </div>
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg">
            <strong class="text-yellow-300">Термодатчик:</strong> измеряет градусы тепла для климат-контроля.
          </div>
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg">
            <strong class="text-rose-300">Датчик дыма:</strong> бьет тревогу при малейшем возгорании.
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой датчик позволяет умному дому автоматически зажигать свет при входе человека в прихожую?',
      options: [
        'Датчик движения',
        'Датчик температуры',
        'Датчик влажности',
        'Датчик открытия двери'
      ],
      correctIndex: 0,
      explanation: 'Датчик движения улавливает перемещение человека и передает команду на включение света!'
    }
  },
  {
    id: 'g3_m10_l6',
    courseId: 'course_grade3',
    module: 'Модуль 10: Логика умного дома и электронные схемы',
    title: 'Урок 6: Интернет вещей (IoT) и сценарии автоматизации',
    type: 'quiz',
    description: 'Как чайник, шторы и лампы общаются между собой по Wi-Fi без участия человека? Создаем смарт-сценарий.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-blue-950/60 border border-blue-500/40 rounded-xl">
          <h4 class="font-bold text-blue-300 text-sm mb-1">🏠 Интернет Вещей (IoT — Internet of Things)</h4>
          <p>Это сеть умных устройств, соединенных по Wi-Fi, которые могут выполнять согласованные сценарии.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-emerald-300 font-bold">Сценарий «Доброе утро» по одной кнопке:</div>
          <p class="text-slate-300 text-[11px]">1. В 07:00 открываются электронные шторы ➔ 2. Закипает чайник ➔ 3. Колонка читает прогноз погоды.</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что такое сценарий автоматизации в умном доме?',
      options: [
        'Цепочка действий по заданному условию',
        'Инструкция к умной лампочке',
        'Список всех устройств в доме',
        'Пароль от домашнего Wi-Fi'
      ],
      correctIndex: 0,
      explanation: 'Сценарии позволяют объединить устройства в единый умный организм, который помогает человеку!'
    }
  },
  {
    id: 'g3_m10_l7',
    courseId: 'course_grade3',
    module: 'Модуль 10: Логика умного дома и электронные схемы',
    title: 'Урок 7: Большой Выпускной Экзамен: Юный Кибер-Инженер 3 Класса!',
    type: 'quiz',
    description: 'Финальный выпускной зачет за весь курс 3 класса! Проверь свои знания и получи почетное звание Мастера Информатики.',
    difficulty: 'Легенда',
    xpReward: 200,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-4 bg-gradient-to-r from-yellow-950/90 via-amber-900/80 to-purple-950/90 border-2 border-yellow-400 rounded-2xl text-center space-y-2 shadow-2xl">
          <div class="text-3xl animate-bounce">🎓 🏆 🚀</div>
          <h3 class="text-base md:text-xl font-bold text-yellow-300 uppercase tracking-wider">
            Выпускной вечер Академии Кибер-Инженеров!
          </h3>
          <p class="text-xs text-slate-200 max-w-lg mx-auto">
            Ты прошел 10 модулей: освоил файлы и папки, логику процессора и двоичный код, алгоритмы с циклами, геймдев и координаты, веб-страницы на HTML, безопасность, обучение ИИ, таблицы и умный дом!
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое главное правило безопасности должен помнить каждый пользователь интернета?',
      options: [
        'Не давать пароли, ссылки проверять со взрослыми',
        'Менять свой пароль каждый день',
        'Заходить в интернет только с телефона',
        'Не читать сообщения от незнакомых'
      ],
      correctIndex: 0,
      explanation: 'Браво! Ты прошел весь расширенный курс 3 класса! Твой цифровой фундамент несокрушим. Поздравляем с блестящим окончанием!'
    }
  }
];
