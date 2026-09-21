import { Task } from '../../types';

export const MODULE11_TASKS: Task[] = [
  {
    id: 'g4_l51',
    courseId: 'course_grade4',
    module: 'Модуль 11: Веб-код, сортировки и графы',
    title: 'Урок 51: Анатомия веб-страницы — читаем HTML',
    type: 'html',
    description: 'Стандарты: Exceeds. Теги заголовков <h1>, абзацев <p> и кнопок <button>: из чего собран любой сайт в интернете.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-orange-950/80 to-amber-950/80 border-2 border-orange-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-400 flex items-center justify-center text-2xl shrink-0">
            🌐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-orange-300">
              Язык разметки HTML
            </h3>
            <p class="text-xs text-slate-300">
              Теги похожи на контейнеры со скобками: <code class="text-cyan-300 font-mono">&lt;h1&gt;Заголовок&lt;/h1&gt;</code> и <code class="text-emerald-300 font-mono">&lt;button&gt;Кнопка&lt;/button&gt;</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    htmlConfig: {
      targetTag: 'button',
      targetStyle: 'color: cyan;'
    },
    initialCode: '<h1>Мой первый сайт</h1>\n<button>Нажми меня</button>'
  },
  {
    id: 'g4_l52',
    courseId: 'course_grade4',
    module: 'Модуль 11: Веб-код, сортировки и графы',
    title: 'Урок 52: Повторение эффективности и сортировка слиянием',
    type: 'sorting',
    description: 'Стандарты: CSTA 1B-AP-08 · KZ Инф 9.3.2.1 · KZ Инф 8.3.2.1. Сортировка слиянием (Merge Sort): стратегия «Разделяй и властвуй».',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Сортировка слиянием (Merge Sort)
            </h3>
            <p class="text-xs text-slate-300">
              Список делится пополам, пока не останутся одиночные элементы, а затем сливается обратно уже в идеальном порядке. Это во много раз быстрее пузырька!
            </p>
          </div>
        </div>
      </div>
    `,
    sortingConfig: {
      numbers: [30, 10, 50, 20, 40],
      algorithm: 'merge'
    }
  },
  {
    id: 'g4_l53',
    courseId: 'course_grade4',
    module: 'Модуль 11: Веб-код, сортировки и графы',
    title: 'Урок 53: Сравнение сортировок — какая победит?',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-08 · UK KS2 · KZ Инф 9.3.2.1 · KZ Инф 8.3.2.1. Битва титанов: Bubble Sort vs Merge Sort на больших массивах данных.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🥊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Сравнение скорости
            </h3>
            <p class="text-xs text-slate-300">
              Для 1 000 000 чисел пузырьковая сортировка делала бы миллиарды сравнений часами, а Merge Sort управится за доли секунды!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какая сортировка справится с миллионом чисел быстрее всех?',
      options: [
        'Сортировка слиянием O(N log N)',
        'Пузырьковая сортировка O(N²)',
        'Сортировка выбором O(N²)',
        'Случайное перемешивание'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Сортировка слиянием намного быстрее пузырьковой за счет принципа «Разделяй и властвуй».'
    }
  },
  {
    id: 'g4_l54',
    courseId: 'course_grade4',
    module: 'Модуль 11: Веб-код, сортировки и графы',
    title: 'Урок 54: Графы и поиск пути — посети каждый город',
    type: 'network_route',
    description: 'Стандарты: Exceeds. Вершины и ребра графа: как навигатор рассчитывает кратчайший маршрут объезда пробок.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-violet-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            🗺️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Графы и навигация
            </h3>
            <p class="text-xs text-slate-300">
              Города на карте — это вершины (ноды), а дороги между ними — ребра. Алгоритмы поиска пути (Дейкстра, BFS) ищут путь с наименьшей суммой километров!
            </p>
          </div>
        </div>
      </div>
    `,
    networkConfig: {
      startNode: 'A',
      endNode: 'D'
    }
  },
  {
    id: 'g4_l55',
    courseId: 'course_grade4',
    module: 'Модуль 11: Веб-код, сортировки и графы',
    title: 'Урок 55: Алгоритмические паттерны и их применение',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-08, 1B-IC-18 · UK KS2 · KZ ЦГ 1.3.1.3. Распознавание типичных задач: обход списка, фильтрация, суммирование и поиск экстремумов.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-cyan-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0">
            🧩
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              Алгоритмические шаблоны
            </h3>
            <p class="text-xs text-slate-300">
              Опытные инженеры не изобретают колесо заново, а используют проверенные паттерны: накопитель суммы, фильтр четных чисел, флаг проверки условия.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой шаблон программирования используется, когда нужно сложить стоимость всех товаров в корзине покупок?',
      options: [
        'Накопитель: total = total + цена',
        'Счётчик: count = count + 1',
        'Поиск максимума в списке',
        'Сортировка списка по цене'
      ],
      correctIndex: 0,
      explanation: 'Верно! Шаблон «Накопитель» бежит по списку и накапливает сумму в специальной переменной.'
    }
  }
];
