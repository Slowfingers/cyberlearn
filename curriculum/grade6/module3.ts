import { Task } from '../../types';

export const MODULE3_TASKS: Task[] = [
  {
    id: 'g6_m3_l1',
    courseId: 'course_grade6',
    module: 'Блок 3: Алгоритмы, Big-O и Деревья',
    title: 'Урок 1: Эффективность алгоритмов: Сравнения и перестановки',
    type: 'quiz',
    description: 'Как измерить эффективность алгоритма без привязки к скорости процессора? Понятие элементарной операции и наихудшего сценария.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⏱️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Сравнение алгоритмов: Как считают ученые?
            </h3>
            <p class="text-xs text-slate-300">
              Нельзя измерять алгоритм секундомером — ведь на быстром компьютере он выполнится быстрее, чем на старом. Алгоритмисты считают количество <strong>элементарных операций</strong>!
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3.5 bg-slate-900 border border-amber-500/40 rounded-xl space-y-1.5">
            <h4 class="text-amber-300 font-bold flex items-center gap-1.5">
              <span>🫧</span> Пузырьковая сортировка (Bubble Sort)
            </h4>
            <p class="text-slate-300 leading-relaxed">
              Сравнивает соседние элементы и меняет их местами, если левый больше правого. Для N элементов в худшем случае требуется примерно N² операций.
            </p>
          </div>

          <div class="p-3.5 bg-slate-900 border border-emerald-500/40 rounded-xl space-y-1.5">
            <h4 class="text-emerald-300 font-bold flex items-center gap-1.5">
              <span>⚡</span> Сортировка слиянием (Merge Sort)
            </h4>
            <p class="text-slate-300 leading-relaxed">
              Принцип «Разделяй и властвуй»: делит массив пополам рекурсивно, а затем соединяет упорядоченные части. Требует всего N · log(N) шагов!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Почему программисты измеряют скорость алгоритмов не в секундах, а в количестве операций (шагов)?',
      options: [
        'Секунды зависят от мощности компьютера',
        'Процессор не умеет считать миллисекунды',
        'В языках программирования нет таймеров',
        'Так программа занимает меньше места'
      ],
      correctIndex: 0,
      explanation: 'Количество шагов абстрагировано от частоты CPU и характеристик устройства — это объективная математическая мера сложности.'
    }
  },
  {
    id: 'g6_m3_sort',
    courseId: 'course_grade6',
    module: 'Блок 3: Алгоритмы, Big-O и Деревья',
    title: 'Урок 2: Практикум: Лаборатория пузырьковой сортировки',
    type: 'sorting',
    description: 'Интерактивный тренажер: сравнивай пары чисел и меняй их местами. Упорядочи все элементы массива по возрастанию!',
    difficulty: 'Новичок',
    xpReward: 130,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🫧
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Механика «Всплытия пузырька»
            </h3>
            <p class="text-xs text-slate-300">
              Самые большие числа, подобно пузырькам воздуха в воде, за каждый полный проход перемещаются в самый конец массива.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1 font-mono">
          <div class="text-cyan-300 font-bold">Алгоритмическое правило:</div>
          <p class="text-slate-300 font-sans">
            Если <code class="text-yellow-300 font-mono">array[i] &gt; array[i+1]</code>, меняем их местами через временную переменную <code class="text-cyan-300 font-mono">temp</code>.
          </p>
        </div>
      </div>
    `,
    sortingConfig: {
      algorithm: 'bubble',
      numbers: [42, 17, 85, 9, 31]
    }
  },
  {
    id: 'g6_m3_l2',
    courseId: 'course_grade6',
    module: 'Блок 3: Алгоритмы, Big-O и Деревья',
    title: 'Урок 3: Асимптотический анализ Big-O: Насколько быстрое это «быстро»?',
    type: 'quiz',
    description: 'О-нотация без сложной высшей математики: классификация сложности алгоритмов O(1), O(log N), O(N) и O(N²).',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Big-O нотация: Поведение при росте данных N
            </h3>
            <p class="text-xs text-slate-300">
              Big-O описывает не абсолютные миллисекунды, а то, как возрастает время работы программы, когда размер входных данных N увеличивается в тысячи раз.
            </p>
          </div>
        </div>

        <div class="space-y-2 text-xs font-mono">
          <div class="p-2.5 bg-slate-900 border border-emerald-500/40 rounded-lg flex items-center justify-between">
            <span class="text-emerald-400 font-bold">O(1) — Константное</span>
            <span class="text-slate-400 font-sans">Взять элемент по индексу list[0] за 1 такт</span>
          </div>
          <div class="p-2.5 bg-slate-900 border border-cyan-500/40 rounded-lg flex items-center justify-between">
            <span class="text-cyan-400 font-bold">O(log N) — Логарифмическое</span>
            <span class="text-slate-400 font-sans">Бинарный поиск в миллионной телефонной книге за 20 шагов</span>
          </div>
          <div class="p-2.5 bg-slate-900 border border-yellow-500/40 rounded-lg flex items-center justify-between">
            <span class="text-yellow-400 font-bold">O(N) — Линейное</span>
            <span class="text-slate-400 font-sans">Один цикл for, перебирающий элементы списка от начала до конца</span>
          </div>
          <div class="p-2.5 bg-slate-900 border border-red-500/40 rounded-lg flex items-center justify-between">
            <span class="text-red-400 font-bold">O(N²) — Квадратичное</span>
            <span class="text-slate-400 font-sans">Вложенный цикл for внутри цикла for — медленно при больших N!</span>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой из алгоритмов поиска в отсортированном массиве из 1 000 000 элементов найдет нужное число всего за ~20 сравнений?',
      options: [
        'Бинарный поиск O(log N)',
        'Линейный перебор O(N)',
        'Пузырьковая сортировка O(N²)',
        'Случайный перебор O(N)'
      ],
      correctIndex: 0,
      explanation: 'Логарифм по основанию 2 от 1 000 000 равен примерно 20. Бинарный поиск на каждом шаге отсекает половину оставшихся вариантов!'
    }
  },
  {
    id: 'g6_m3_hanoi',
    courseId: 'course_grade6',
    module: 'Блок 3: Алгоритмы, Big-O и Деревья',
    title: 'Урок 4: Рекурсивные алгоритмы: Легенда Ханойской башни',
    type: 'hanoi',
    description: 'Интерактивная математическая головоломка: перемести стопку дисков со стержня 1 на стержень 3, никогда не кладя больший диск на меньший!',
    difficulty: 'Хакер',
    xpReward: 140,
    currencyReward: 55,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-pink-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🗼
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-pink-300">
              Рекурсия: Функция, вызывающая саму себя
            </h3>
            <p class="text-xs text-slate-300">
              Ханойская башня — классический пример задачи, которая решается изящным рекурсивным алгоритмом всего в 3 шага.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-2">
          <div class="text-pink-300 font-bold">Правила головоломки:</div>
          <ul class="list-disc list-inside text-slate-300 space-y-1">
            <li>За один ход можно переместить только один верхний диск.</li>
            <li>Нельзя класть больший диск на меньший.</li>
            <li>Минимальное число ходов для N дисков равно <strong>2ᴺ - 1</strong> (для 3 дисков это ровно 7 ходов).</li>
          </ul>
        </div>
      </div>
    `,
    hanoiConfig: {
      disks: 3
    }
  },
  {
    id: 'g6_m3_tree',
    courseId: 'course_grade6',
    module: 'Блок 3: Алгоритмы, Big-O и Деревья',
    title: 'Урок 5: Двоичные деревья поиска (BST): Поиск за O(log N)',
    type: 'tree_search',
    description: 'Интерактивное двоичное дерево: найди целевое число 63, принимая решения «влево (<)» или «вправо (>)» от каждого узла!',
    difficulty: 'Хакер',
    xpReward: 150,
    currencyReward: 60,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🌳
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Свойство двоичного дерева поиска (BST)
            </h3>
            <p class="text-xs text-slate-300">
              Дерево поиска упорядочено: у каждого узла левый потомок всегда строго МЕНЬШЕ значения узла, а правый потомок — строго БОЛЬШЕ.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl text-xs space-y-1">
          <div class="text-cyan-300 font-bold">Алгоритм навигации:</div>
          <p class="text-slate-300 leading-relaxed">
            Если искомое число <strong>63</strong>, а текущий узел <strong>50</strong>: 63 &gt; 50 ➔ идем <strong>Вправо</strong>! Если следующий узел <strong>75</strong>: 63 &lt; 75 ➔ идем <strong>Влево</strong>!
          </p>
        </div>
      </div>
    `,
    treeConfig: {
      target: 63,
      tree: { value: 50 }
    }
  }
];
