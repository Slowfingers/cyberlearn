import { Task } from '../../types';

export const MODULE3_TASKS: Task[] = [
  {
    id: 'g5_l10',
    courseId: 'course_grade5',
    module: 'Блок 3: Продвинутое блочное программирование и Функции',
    title: 'Урок 10: Собственные блоки и параметры',
    type: 'quiz',
    description: 'Как создавать функции и собственные блоки (My Blocks) с аргументами, избегая дублирования сотен одинаковых строк кода.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🧱
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Собственные блоки (Функции) с параметрами
            </h3>
            <p class="text-xs text-slate-300">
              Вместо копирования кода рисования квадрата 10 раз, мы создаем блок <code class="text-yellow-300 font-mono">нарисовать_квадрат(размер, цвет)</code> и передаем ему нужные значения!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-blue-400 font-bold">Принцип DRY (Don't Repeat Yourself):</div>
          <p class="text-slate-300 text-[11px]">
            «Не повторяйся». Если фрагмент кода встречается больше одного раза — выноси его в отдельный блок или функцию с параметрами.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Зачем в блочном коде или функциях используются параметры (аргументы)?',
      options: [
        'Чтобы блок работал с разными данными',
        'Чтобы блок выполнялся быстрее обычного',
        'Чтобы блок нельзя было случайно удалить',
        'Чтобы блок запускался автоматически'
      ],
      correctIndex: 0,
      explanation: 'Параметры делают блоки универсальными и гибкими, превращая шаблонный алгоритм в мощный многоразовый инструмент.'
    }
  },
  {
    id: 'g5_l11',
    courseId: 'course_grade5',
    module: 'Блок 3: Продвинутое блочное программирование и Функции',
    title: 'Урок 11: Клоны вглубь и расширение «Перо»',
    type: 'quiz',
    description: 'Управление динамическими объектами через клонирование спрайтов и процедурная генерация графики расширением «Перо» (Pen).',
    difficulty: 'Хакер',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🪶
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Клонирование и рисование пером
            </h3>
            <p class="text-xs text-slate-300">
              Клоны позволяют создавать сотни пуль, врагов или снежинок на лету без создания сотен отдельных спрайтов. А расширение «Перо» оставляет за спрайтом след, рисуя спирали и фракталы!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-emerald-400 font-bold">Очистка памяти (Garbage Collection):</div>
          <p class="text-slate-300 text-[11px]">
            Каждый клон занимает оперативную память. Обязательно вызывай блок <code class="text-yellow-300 font-mono">удалить клон</code>, когда пуля улетела за край экрана!
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что произойдет, если в игре непрерывно создавать клоны спрайтов и никогда не удалять их?',
      options: [
        'Вырастет нагрузка или будет достигнут лимит',
        'Клоны сами исчезнут через минуту',
        'Игра будет работать быстрее прежнего',
        'Ничего: память клоны не занимают'
      ],
      correctIndex: 0,
      explanation: 'Клоны используют ресурсы, а среда может ограничивать их количество. Удаляй копии после завершения их задачи.'
    }
  },
  {
    id: 'g5_l12',
    courseId: 'course_grade5',
    module: 'Блок 3: Продвинутое блочное программирование и Функции',
    title: 'Урок 12: Продвинутые списки и оптимизация кода',
    type: 'quiz',
    description: 'Динамические списки, инвентарь игрока, стек, очередь и методы оптимизации скорости выполнения алгоритмов.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📋
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Списки (Массивы) в разработке игр
            </h3>
            <p class="text-xs text-slate-300">
              Одиночная переменная может хранить только одно значение (например, количество жизней). Список же хранит последовательность данных: таблицу рекордов, инвентарь предметов или координаты врагов.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-amber-400 font-bold">Оптимизация «Запуск без обновления экрана»:</div>
          <p class="text-slate-300 text-[11px]">
            Включение опции «Run without screen refresh» позволяет выполнить цикл по 10 000 элементам списка за 1 миллисекунду вместо 5 секунд!
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какая структура данных лучше всего подходит для хранения предметов в рюкзаке персонажа RPG-игры?',
      options: [
        'Список (массив) предметов',
        'Одна числовая переменная',
        'Отдельная переменная на каждый предмет',
        'Текстовая строка с названиями через запятую'
      ],
      correctIndex: 0,
      explanation: 'Список позволяет динамически пополнять предметы, подсчитывать их количество и искать нужный артефакт.'
    }
  },
  {
    id: 'g5_l13',
    courseId: 'course_grade5',
    module: 'Блок 3: Продвинутое блочное программирование и Функции',
    title: 'Урок 13: Организация проектов и расширения',
    type: 'quiz',
    description: 'Модульная структура проекта: разделение спрайтов логики, графики и звука, а также подключение расширений (видеораспознавание, переводчик, Makey Makey).',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📦
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Архитектура крупных программных проектов
            </h3>
            <p class="text-xs text-slate-300">
              Когда в проекте более 50 скриптов, беспорядок ведет к багам. Профессионалы создают невидимый спрайт <code class="text-cyan-300 font-mono">GameController</code> (Диспетчер игры), управляющий состояниями.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-pink-400 font-bold">Событийная модель (Broadcasting):</div>
          <p class="text-slate-300 text-[11px]">
            Блоки сообщений («передать сигнал СТАРТ», «когда я получу ПОБЕДА») изолируют логику спрайтов друг от друга.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как профессиональные инженеры координируют переход между меню, игровым уровнем и экраном победы?',
      options: [
        'Сигналы (broadcast) и переменная состояния',
        'Сто блоков «ждать 1 секунду» подряд',
        'Удаление всех спрайтов при каждой смене',
        'Перезапуск проекта зелёным флагом'
      ],
      correctIndex: 0,
      explanation: 'Сообщения запускают обработчики нужного имени, а переменная состояния хранит текущий режим. Это помогает согласовать действия разных спрайтов.'
    }
  }
];
