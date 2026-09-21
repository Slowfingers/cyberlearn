import { Task } from '../../types';

export const MODULE7_TASKS: Task[] = [
  {
    id: 'g3_m7_l1',
    courseId: 'course_grade3',
    module: 'Модуль 7: Дрессировщик ИИ: Обучи робота',
    title: 'Урок 1: Что такое Искусственный Интеллект и Нейросеть',
    type: 'quiz',
    description: 'В чем разница между обычным калькулятором и нейросетью? Узнай, как компьютер учится на примерах!',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🤖
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Что умеет Искусственный Интеллект (ИИ)?
            </h3>
            <p class="text-xs text-slate-300">
              Обычная программа делает только то, что жестко записано в коде. А нейросеть умеет учиться на примерах, как человек!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Чем искусственный интеллект (нейросеть) отличается от обычного калькулятора?',
      options: [
        'ИИ учится на примерах и узнаёт образы',
        'ИИ считает быстрее калькулятора',
        'ИИ работает без электричества',
        'ИИ никогда не делает ошибок'
      ],
      correctIndex: 0,
      explanation: 'Нейросеть не просто считает формулы, она учится находить скрытые закономерности в картинках, звуках и тексте!'
    }
  },
  {
    id: 'g3_m7_l2',
    courseId: 'course_grade3',
    module: 'Модуль 7: Дрессировщик ИИ: Обучи робота',
    title: 'Урок 2: Обучающая выборка (Датасет): Разделение котиков и собак',
    type: 'ai_kids_trainer',
    description: 'Стань главным тренером нейросети! Разложи карточки по обучающим корзинам и запусти процесс тренировки.',
    difficulty: 'Новичок',
    xpReward: 105,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border border-purple-400/50 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">🐾 Что такое датасет (Data Set)?</h4>
          <p>Датасет — это учебник для робота. Если дать роботу правильные картинки с подписями, он научится различать животных!</p>
        </div>
        <div class="p-2.5 bg-purple-950/40 border border-purple-500/30 rounded-lg text-purple-200 text-xs">
          🎯 Перетащи всех котиков в корзину котиков, а собак — в корзину собак, затем нажми «ОБУЧИТЬ»!
        </div>
      </div>
    `
  },
  {
    id: 'g3_m7_l3',
    courseId: 'course_grade3',
    module: 'Модуль 7: Дрессировщик ИИ: Обучи робота',
    title: 'Урок 3: Как нейросеть видит картинку: Пиксели и признаки',
    type: 'quiz',
    description: 'У робота нет биологических глаз. Как нейросеть понимает, где на фотографии нос, уши и усы?',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl">
          <h4 class="font-bold text-cyan-300 text-sm mb-1">🖼️ Глаза робота — это цифры яркости</h4>
          <p>Для компьютера любое фото — это таблица чисел. Каждое число показывает цвет одного пикселя (от 0 до 255).</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1 text-xs">
          <div class="text-yellow-300 font-bold">Выделение признаков (Features):</div>
          <p class="text-slate-300 text-[11px]">Нейросеть сначала находит простые линии и углы, затем собирает из них круги и треугольники (ушки кота), а потом узнает всю мордочку целиком!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'В каком виде компьютер воспринимает любую цифровую фотографию?',
      options: [
        'Как таблицу чисел: число — цвет пикселя',
        'Как набор слов с описанием картинки',
        'Как одно очень большое число',
        'Как звук разной громкости'
      ],
      correctIndex: 0,
      explanation: 'Каждое изображение в памяти компьютера хранится как сетка пикселей с числовыми значениями цветов!'
    }
  },
  {
    id: 'g3_m7_l4',
    courseId: 'course_grade3',
    module: 'Модуль 7: Дрессировщик ИИ: Обучи робота',
    title: 'Урок 4: Ошибки и галлюцинации нейросетей',
    type: 'quiz',
    description: 'Почему нейросеть может нарисовать человеку 6 пальцев или спутать кекс с собачкой? Узнай о сбоях ИИ.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-amber-950/60 border border-amber-500/40 rounded-xl">
          <h4 class="font-bold text-amber-300 text-sm mb-1">🧁 Загадка кекса и чихуахуа</h4>
          <p>Кекс с изюмом очень похож на мордочку маленькой собачки. Нейросети часто путают их, потому что сравнивают узоры пикселей, но не понимают физики реального мира!</p>
        </div>
        <div class="p-2.5 bg-yellow-950/30 border border-yellow-500/30 rounded-lg text-yellow-200 text-xs">
          💡 Именно поэтому ответы и картинки ИИ всегда должен проверять человек!
        </div>
      </div>
    `,
    quizData: {
      question: 'Почему нейросеть может ошибиться и назвать круглый полосатый мяч арбузом?',
      options: [
        'Она видит узор, но не знает, что это мяч',
        'Она специально так шутит с человеком',
        'У неё сломалась камера телефона',
        'Она не различает зелёный цвет'
      ],
      correctIndex: 0,
      explanation: 'ИИ сравнивает визуальные текстуры. Без понимания физического мира нейросеть способна перепутать похожие вещи!'
    }
  },
  {
    id: 'g3_m7_l5',
    courseId: 'course_grade3',
    module: 'Модуль 7: Дрессировщик ИИ: Обучи робота',
    title: 'Урок 5: Промпт-инжиниринг: Как правильно просить нейросеть',
    type: 'quiz',
    description: 'Что такое «промпт»? Научись составлять точные и ясные подсказки для чат-ботов и генераторов картинок!',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border border-blue-500/40 rounded-xl">
          <h4 class="font-bold text-blue-300 text-sm mb-1">✍️ Что такое Промпт (Prompt)?</h4>
          <p>Промпт — это текстовая инструкция или задание, которое человек пишет нейросети.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div class="p-2.5 bg-rose-950/40 border border-rose-500/40 rounded-lg">
            <div class="text-rose-300 font-bold">Плохой промпт:</div>
            <p class="text-slate-300 text-[11px]">«Нарисуй что-нибудь красивое» (ИИ не знает, что ты любишь).</p>
          </div>
          <div class="p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded-lg">
            <div class="text-emerald-300 font-bold">Хороший промпт:</div>
            <p class="text-slate-300 text-[11px]">«Рыжий кот в космическом шлеме летит на ракете, мультяшный стиль 3D».</p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой запрос к генератору картинок даст самый предсказуемый и красивый результат?',
      options: [
        '«Белый щенок в очках на траве, мультстиль»',
        '«Собака»',
        '«Нарисуй что-нибудь красивое»',
        '«Щенок, но сделай нормально»'
      ],
      correctIndex: 0,
      explanation: 'Чем точнее и подробнее описан объект, окружение и стиль, тем качественнее результат генерации ИИ!'
    }
  },
  {
    id: 'g3_m7_l6',
    courseId: 'course_grade3',
    module: 'Модуль 7: Дрессировщик ИИ: Обучи робота',
    title: 'Урок 6: Голосовые ассистенты: От звука к действию (NLP)',
    type: 'quiz',
    description: 'Как умная колонка Алиса или Маруся понимает голос ребенка и включает любимую сказку?',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-blue-950/80 border border-teal-500/40 rounded-xl">
          <h4 class="font-bold text-teal-300 text-sm mb-1">🗣️ Три шага умной колонки</h4>
          <p>Каждый голосовой запрос обрабатывается тремя нейросетями:</p>
        </div>
        <div class="space-y-1.5 text-[11px]">
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg">
            <strong class="text-cyan-300">1. Распознавание речи:</strong> перевод звуковой волны в напечатанный текст.
          </div>
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg">
            <strong class="text-yellow-300">2. Понимание смысла (NLP):</strong> выбор нужной команды («Включить музыку»).
          </div>
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg">
            <strong class="text-emerald-300">3. Синтез голоса:</strong> озвучивание ответа.
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как называется технология, превращающая голос из микрофона в напечатанный текст?',
      options: [
        'Распознавание речи (Speech-to-Text)',
        'Синтез речи (Text-to-Speech)',
        'Распознавание лиц (Face ID)',
        'Машинный перевод текста'
      ],
      correctIndex: 0,
      explanation: 'Модели Speech-to-Text анализируют аудиосигнал и переводят звуковые колебания в слова!'
    }
  },
  {
    id: 'g3_m7_l7',
    courseId: 'course_grade3',
    module: 'Модуль 7: Дрессировщик ИИ: Обучи робота',
    title: 'Урок 7: Экзамен модуля: Мастер Искусственного Интеллекта',
    type: 'quiz',
    description: 'Итоговый зачет по нейросетям, датасетам, распознаванию изображений, промптам и голосовым помощникам!',
    difficulty: 'Хакер',
    xpReward: 130,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border border-purple-500/50 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">🤖 Финал Модуля 7</h4>
          <p>Ты обучил свою первую модель, разобрался в галлюцинациях ИИ и научился писать грамотные промпты. Ответь на финальный вопрос!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что такое датасет (dataset) в машинном обучении?',
      options: [
        'Набор примеров для обучения нейросети',
        'Программа, которая рисует картинки',
        'Ошибка в работе нейросети',
        'Скорость работы нейросети'
      ],
      correctIndex: 0,
      explanation: 'Датасет — это структурированная обучающая выборка, благодаря которой алгоритм приобретает новые навыки!'
    }
  }
];
