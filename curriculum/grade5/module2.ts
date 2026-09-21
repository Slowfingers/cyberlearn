import { Task } from '../../types';

export const MODULE2_TASKS: Task[] = [
  {
    id: 'g5_l6',
    courseId: 'course_grade5',
    module: 'Блок 2: Алгоритмы поиска, Сортировка и Рекурсия',
    title: 'Урок 6: От псевдокода к блокам и сортировка пузырьком',
    type: 'sorting',
    description: 'Изучи классический алгоритм сортировки пузырьком (Bubble Sort): попарное сравнение соседних элементов и подъем наибольших значений наверх.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🫧
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Сортировка Пузырьком (Bubble Sort)
            </h3>
            <p class="text-xs text-slate-300">
              Как легкие пузырьки воздуха всплывают на поверхность воды, так и большие числа шаг за шагом перемещаются в конец массива.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-2 font-mono">
          <div class="text-cyan-400 font-bold">Алгоритм на псевдокоде:</div>
          <div class="text-slate-300 bg-black/60 p-2 rounded">
            ПОКА массив не отсортирован:<br/>
            &nbsp;&nbsp;ДЛЯ каждого элемента от 0 до N-1:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;ЕСЛИ элемент[i] &gt; элемент[i+1]:<br/>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;поменять их местами!
          </div>
        </div>
      </div>
    `,
    sortingConfig: {
      numbers: [42, 15, 88, 7, 23],
      algorithm: 'bubble'
    }
  },
  {
    id: 'g5_l7',
    courseId: 'course_grade5',
    module: 'Блок 2: Алгоритмы поиска, Сортировка и Рекурсия',
    title: 'Урок 7: Сортировка выбором и линейный поиск',
    type: 'quiz',
    description: 'Сравни линейный перебор элементов с поиском минимального элемента в алгоритме Selection Sort (сортировка выбором).',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Линейный поиск и Сортировка выбором
            </h3>
            <p class="text-xs text-slate-300">
              Линейный поиск проверяет каждый элемент по очереди слева направо. Если в массиве 1 000 000 элементов, в худшем случае придется сделать 1 000 000 проверок!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-amber-400 font-bold">Сортировка выбором (Selection Sort):</div>
          <p class="text-slate-300 text-[11px]">
            На каждом проходе алгоритм ищет <strong>самый маленький элемент</strong> во всей оставшейся части массива и ставит его на первое свободное место.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'В чем ключевое отличие сортировки выбором (Selection Sort) от сортировки пузырьком?',
      options: [
        'Находит минимум и сразу ставит на место',
        'Всегда меняет местами соседние элементы',
        'Работает только с числами, но не с текстом',
        'Требует, чтобы список был отсортирован'
      ],
      correctIndex: 0,
      explanation: 'Сортировка выбором делает значительно меньше перестановок (swaps) в памяти, находя абсолютный минимум за один полный проход.'
    }
  },
  {
    id: 'g5_l8',
    courseId: 'course_grade5',
    module: 'Блок 2: Алгоритмы поиска, Сортировка и Рекурсия',
    title: 'Урок 8: Двоичный поиск и эффективность алгоритмов',
    type: 'tree_search',
    description: 'Двоичный поиск (Binary Search): почему деление отсортированного списка пополам позволяет найти любое число среди миллиарда всего за 30 шагов!',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Двоичный поиск: Стратегия «Разделяй и властвуй»
            </h3>
            <p class="text-xs text-slate-300">
              Главное условие: массив <strong>ОБЯЗАН быть отсортирован</strong>! Мы смотрим в середину: если наше число больше — отбрасываем всю левую половину, если меньше — правую.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1 font-mono">
          <div class="text-emerald-400 font-bold">Сравнение скорости (число шагов):</div>
          <div class="text-slate-300">Для 1 000 элементов: Линейный = 1 000 | Двоичный = 10 шагов!</div>
          <div class="text-slate-300">Для 1 000 000 элементов: Линейный = 1 000 000 | Двоичный = 20 шагов!</div>
        </div>
      </div>
    `,
    treeConfig: {
      target: 27,
      tree: {
        value: 50,
        left: {
          value: 25,
          left: { value: 12 },
          right: { value: 27 }
        },
        right: {
          value: 75,
          left: { value: 60 },
          right: { value: 90 }
        }
      }
    }
  },
  {
    id: 'g5_l9',
    courseId: 'course_grade5',
    module: 'Блок 2: Алгоритмы поиска, Сортировка и Рекурсия',
    title: 'Урок 9: Введение в рекурсию — зеркала и фракталы',
    type: 'hanoi',
    description: 'Что такое рекурсия: когда функция вызывает саму себя для решения подзадачи меньшего размера. Реши легендарную головоломку Ханойских башен!',
    difficulty: 'Элита',
    xpReward: 130,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🪞
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Рекурсия: Самоподобие и базовый случай
            </h3>
            <p class="text-xs text-slate-300">
              Два зеркала напротив друг друга создают бесконечный коридор отражений. В программировании рекурсивная функция вызывает саму себя, пока не достигнет базового случая (условия остановки).
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-purple-400 font-bold">Ханойская Башня (Towers of Hanoi):</div>
          <p class="text-slate-300 text-[11px]">
            Чтобы переместить башню из N дисков на целевой колышек, нужно сначала рекурсивно переместить верхние (N-1) дисков на запасной колышек, перенести самый большой диск, и затем вернуть (N-1) дисков наверх!
          </p>
        </div>
      </div>
    `,
    hanoiConfig: {
      disks: 3
    }
  }
];
