import { Task } from '../../types';

export const MODULE7_TASKS: Task[] = [
  {
    id: 'g5_l31',
    courseId: 'course_grade5',
    module: 'Блок 7: Искусственный Интеллект, Модели и Модульный код',
    title: 'Урок 31: Повторение ИИ и Teachable Machine',
    type: 'ai_kids_trainer',
    description: 'Машинное обучение с учителем (Supervised Learning): разметка обучающего датасета и классификация объектов с помощью нейросетей.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🤖
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Обучение с учителем (Supervised Learning)
            </h3>
            <p class="text-xs text-slate-300">
              Искусственный интеллект не пишет правила вручную. Человек дает модели тысячи примеров с метками («это кошка», «это собака»), а нейросеть сама находит скрытые математические признаки!
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g5_l32',
    courseId: 'course_grade5',
    module: 'Блок 7: Искусственный Интеллект, Модели и Модульный код',
    title: 'Урок 32: Улучшение моделей ИИ и предвзятость ИИ',
    type: 'ai_kids_trainer',
    description: 'Проблема предвзятости данных (Data Bias): почему несбалансированная обучающая выборка приводит к грубым ошибкам алгоритма.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚖️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Предвзятость ИИ (AI Bias)
            </h3>
            <p class="text-xs text-slate-300">
              «Мусор на входе — мусор на выходе» (Garbage In, Garbage Out). Если обучить нейросеть распознавать кошек только по белым котам, черную кошку модель не узнает!
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g5_l33',
    courseId: 'course_grade5',
    module: 'Блок 7: Искусственный Интеллект, Модели и Модульный код',
    title: 'Урок 33: Этика ИИ и будущее',
    type: 'quiz',
    description: 'Этические дилеммы автономного транспорта, авторское право генеративных нейросетей и ответственность разработчиков за решения алгоритмов.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🧭
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Этика искусственного интеллекта
            </h3>
            <p class="text-xs text-slate-300">
              Кто несет ответственность, если автопилот машины попал в аварию? Программист, производитель датчиков или владелец автомобиля?
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-emerald-400 font-bold">Принцип прозрачности (Explainable AI):</div>
          <p class="text-slate-300 text-[11px]">
            Модель ИИ не должна быть «черным ящиком» — инженер обязан уметь объяснить, почему алгоритм принял именно такое решение.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Кто несет главную моральную и правовую ответственность за ошибки и предвзятость алгоритмов искусственного интеллекта?',
      options: [
        'Люди: разработчики и компания-создатель',
        'Сам компьютер, ведь он принял решение',
        'Пользователь, который задал вопрос',
        'Никто: у алгоритма нет ответственного'
      ],
      correctIndex: 0,
      explanation: 'ИИ — это математический инструмент, созданный человеком. Вся полнота ответственности за безопасность лежит на людях-разработчиках.'
    }
  },
  {
    id: 'g5_l34',
    courseId: 'course_grade5',
    module: 'Блок 7: Искусственный Интеллект, Модели и Модульный код',
    title: 'Урок 34: Мастерство собственных блоков — функции с параметрами',
    type: 'quiz',
    description: 'Продвинутое проектирование функций: возвращаемые значения (Return), локальные переменные области видимости (Scope) и чистые функции.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🧩
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Область видимости (Scope) и Чистые функции
            </h3>
            <p class="text-xs text-slate-300">
              Хорошая функция похожа на надежный тостер: положил хлеб (входной параметр) ➔ получил тост (результат). Она не должна менять чужие переменные без спроса!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-cyan-400 font-bold">Локальные vs Глобальные переменные:</div>
          <p class="text-slate-300 text-[11px]">
            Локальная переменная доступна <strong>только внутри этого спрайта или блока</strong>, предотвращая случайную перезапись данных другими частями программы.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Почему в больших проектах рекомендуется использовать локальные переменные «только для этого спрайта»?',
      options: [
        'Чтобы переменные спрайтов не мешали друг другу',
        'Чтобы код занимал меньше места на экране',
        'Чтобы переменные работали в два раза быстрее',
        'Чтобы блоки окрашивались в разные цвета'
      ],
      correctIndex: 0,
      explanation: 'Инкапсуляция и локальные переменные защищают программу от трудноуловимых багов взаимного влияния.'
    }
  },
  {
    id: 'g5_l35',
    courseId: 'course_grade5',
    module: 'Блок 7: Искусственный Интеллект, Модели и Модульный код',
    title: 'Урок 35: Модульный блочный код — организация больших программ',
    type: 'quiz',
    description: 'Декомпозиция сложной системы: как разбить масштабную RPG-игру на независимые модули боевой системы, инвентаря, диалогов и физики.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🏛️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Декомпозиция: Разделяй и управляй
            </h3>
            <p class="text-xs text-slate-300">
              Если задача кажется слишком огромной, разбей ее на 5 простых подзадач. Каждую подзадачу поручи отдельному модулю или функции.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что в инженерном проектировании означает термин "Декомпозиция"?',
      options: [
        'Разбиение задачи на простые подзадачи',
        'Полное удаление устаревшего кода',
        'Перестановка команд в случайном порядке',
        'Перевод программы на другой язык'
      ],
      correctIndex: 0,
      explanation: 'Декомпозиция — фундаментальный навык инженера: любая сложнейшая система состоит из простых кирпичиков.'
    }
  }
];
