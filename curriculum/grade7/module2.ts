import { Task } from '../../types';

export const MODULE2_TASKS: Task[] = [
  {
    id: 'g7_l09',
    courseId: 'course_grade7',
    module: 'Блок 2: Управление ходом программы и структуры данных',
    title: 'Урок 9: if / elif / else',
    type: 'quiz',
    description: 'CSTA 2-AP-12, UK KS3, ACARA ACTDIP029, KZ Инф 7.3.2.1 / 7.3.3.2: Ветвление логики, отступы (4 пробела), каскадные условия и вложенные проверки.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 font-mono text-indigo-300">
            🔀
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Ветвление логики: if, elif, else
            </h3>
            <p class="text-xs text-slate-300">
              Отступы в 4 пробела в Python определяют тело блока кода. Условия проверяются сверху вниз до первого истинного выражения.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой блок выполнится, если переменная score = 85 в коде: if score >= 90: print("A") elif score >= 80: print("B") else: print("C")?',
      options: [
        'B',
        'A',
        'C',
        'Сначала A, потом B'
      ],
      correctIndex: 0,
      explanation: 'Первое условие 85 >= 90 ложно. Второе условие 85 >= 80 истинно, поэтому выполняется ветка elif с выводом "B".'
    }
  },
  {
    id: 'g7_l10',
    courseId: 'course_grade7',
    module: 'Блок 2: Управление ходом программы и структуры данных',
    title: 'Урок 10: Циклы for и range',
    type: 'terminal',
    description: 'CSTA 2-AP-12, UK KS3, ACARA ACTDIP029, KZ Инф 8.3.3.2: Итерации с заданным числом повторений: range(stop), range(start, stop, step), перебор символов строки.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            🔁
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Цикл со счетчиком for i in range()
            </h3>
            <p class="text-xs text-slate-300">
              Генератор <code class="text-yellow-300 font-mono">range(1, 6)</code> создает последовательность чисел от 1 до 5 (правая граница не включается!).
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'print("Обратный отсчет до старта:")\nfor sec in range(5, 0, -1):\n    print(f"{sec}...")\nprint("СТАРТ ДРОНА!")',
    terminalOutput: '> Обратный отсчет до старта:\n> 5...\n> 4...\n> 3...\n> 2...\n> 1...\n> СТАРТ ДРОНА!'
  },
  {
    id: 'g7_l11',
    courseId: 'course_grade7',
    module: 'Блок 2: Управление ходом программы и структуры данных',
    title: 'Урок 11: Циклы while',
    type: 'quiz',
    description: 'CSTA 2-AP-12, UK KS3, ACARA ACTDIP029, KZ Инф 8.3.3.1: Цикл с предусловием while condition:, бесконечные циклы while True, условие завершения цикла.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 font-mono text-purple-300">
            ⏳
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Цикл с предусловием while
            </h3>
            <p class="text-xs text-slate-300">
              Цикл <code class="text-yellow-300 font-mono">while</code> выполняется до тех пор, пока проверяемое условие остается <code class="text-emerald-300 font-mono">True</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что произойдет, если в теле цикла while условие никогда не станет False и нет команды выхода break?',
      options: [
        'Программа зациклится и зависнет',
        'Программа удалит собственный файл',
        'Цикл остановится ровно через 100 шагов',
        'Python выдаст ошибку ещё до запуска'
      ],
      correctIndex: 0,
      explanation: 'Без изменения переменных условия цикл while будет выполняться бесконечно, что приводит к зависанию процесса.'
    }
  },
  {
    id: 'g7_l12',
    courseId: 'course_grade7',
    module: 'Блок 2: Управление ходом программы и структуры данных',
    title: 'Урок 12: break, continue и вложенные циклы',
    type: 'quiz',
    description: 'CSTA 2-AP-12, UK KS3, ACARA ACTDIP029, KZ Инф 8.3.3.3: Экстренный выход break, пропуск текущей итерации continue, двумерные матрицы и вложенные циклы.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-amber-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 font-mono text-amber-300">
            ⛔
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Управление итерациями: break и continue
            </h3>
            <p class="text-xs text-slate-300">
              Команда <code class="text-red-400 font-mono">break</code> мгновенно прерывает цикл. Команда <code class="text-cyan-400 font-mono">continue</code> пропускает оставшуюся часть текущей итерации и переходит к следующему шагу.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Чем отличается оператор continue от break?',
      options: [
        'continue пропускает шаг, break выходит',
        'break пропускает шаг, continue выходит',
        'Они делают одно и то же действие',
        'continue работает только внутри while'
      ],
      correctIndex: 0,
      explanation: 'break немедленно выходит из цикла, а continue просто завершает текущий шаг и переходит к следующей итерации.'
    }
  },
  {
    id: 'g7_l13',
    courseId: 'course_grade7',
    module: 'Блок 2: Управление ходом программы и структуры данных',
    title: 'Урок 13: Мини-проект по управлению ходом программы — игра «Угадай число»',
    type: 'terminal',
    description: 'CSTA 2-AP-15, 2-AP-17, UK KS3, ACARA ACTDIP027, ACTDIP032, KZ Инф 7.3.2.1 / 8.3.3.1 / 8.3.3.3 / 8.3.1.1: Разработка игры с генератором random.randint, счетчиком попыток и бинарной стратегией поиска.',
    difficulty: 'Легенда',
    xpReward: 125,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 font-mono text-indigo-300">
            🎲
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Мини-проект: Игра «Угадай число» с бинарным сужением диапазона
            </h3>
            <p class="text-xs text-slate-300">
              В игре от 1 до 100 компьютер сообщает подсказки («Больше» / «Меньше»). Умный игрок находит число максимум за 7 шагов с помощью бинарного поиска ($2^7 = 128 > 100$).
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'import random\nsecret = 42\nguesses = [50, 25, 37, 42]\nattempts = 0\nfor g in guesses:\n    attempts += 1\n    if g == secret:\n        print(f"ПОБЕДА! Число {secret} угадано за {attempts} попыток!")\n        break\n    elif g < secret:\n        print(f"Попытка {g}: Моё число БОЛЬШЕ")\n    else:\n        print(f"Попытка {g}: Моё число МЕНЬШЕ")',
    terminalOutput: '> Попытка 50: Моё число МЕНЬШЕ\n> Попытка 25: Моё число БОЛЬШЕ\n> Попытка 37: Моё число БОЛЬШЕ\n> ПОБЕДА! Число 42 угадано за 4 попыток!'
  },
  {
    id: 'g7_l14',
    courseId: 'course_grade7',
    module: 'Блок 2: Управление ходом программы и структуры данных',
    title: 'Урок 14: Списки — первая настоящая коллекция',
    type: 'quiz',
    description: 'CSTA 2-AP-11, UK KS3, ACARA ACTDIP030, KZ Инф 9.3.3.1: Списки list [], изменение по индексу, методы append(), pop(), insert(), срезы списков.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            📋
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Списки (list) в Python: Изменяемые коллекции
            </h3>
            <p class="text-xs text-slate-300">
              Список позволяет хранить группу элементов в строго определенном порядке. Элементы можно добавлять <code class="text-yellow-300 font-mono">.append()</code> и удалять <code class="text-red-400 font-mono">.pop()</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой элемент вернет inventory[-1], если список inventory = ["меч", "щит", "зелье"]?',
      options: [
        '"зелье"',
        '"меч"',
        '"щит"',
        'IndexError'
      ],
      correctIndex: 0,
      explanation: 'Отрицательные индексы в Python осуществляют доступ с конца списка: -1 указывает на самый последний элемент.'
    }
  },
  {
    id: 'g7_l15',
    courseId: 'course_grade7',
    module: 'Блок 2: Управление ходом программы и структуры данных',
    title: 'Урок 15: Алгоритмы со списками',
    type: 'sorting',
    description: 'CSTA 2-AP-12, 2-DA-08, UK KS3, ACARA ACTDIP029, KZ Инф 9.3.3.1: Поиск минимума/максимума, суммирование, линейный поиск и алгоритмическая сортировка.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 font-mono text-purple-300">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Алгоритмическая обработка списков
            </h3>
            <p class="text-xs text-slate-300">
              Сортировка пузырьком меняет соседние элементы местами, пока список не упорядочится от меньшего к большему за $O(N^2)$ операций.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g7_l16',
    courseId: 'course_grade7',
    module: 'Блок 2: Управление ходом программы и структуры данных',
    title: 'Урок 16: Словари — сила пар «ключ-значение»',
    type: 'quiz',
    description: 'CSTA 2-AP-11, UK KS3, ACARA ACTDIP025: Ассоциативные массивы dict {}, поиск по ключу за O(1), методы keys(), values(), items().',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 font-mono text-amber-300">
            🔑
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Словари (dict): Мгновенный поиск по ключу
            </h3>
            <p class="text-xs text-slate-300">
              В отличие от списков, где элементы ищутся по порядковому номеру, словарь находит значение по уникальному текстовому ключу мгновенно: <code class="text-yellow-300 font-mono">user["email"]</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Дан словарь legs = {"кот": 4, "паук": 8}. Как получить число лап кота?',
      options: [
        'legs["кот"]',
        'legs[0]',
        'legs[4]',
        'legs["лап"]'
      ],
      correctIndex: 0,
      explanation: 'В словаре значение читают по ключу. Ключ «кот» связан со значением 4; это не позиция в списке.'
    }
  },
  {
    id: 'g7_l17',
    courseId: 'course_grade7',
    module: 'Блок 2: Управление ходом программы и структуры данных',
    title: 'Урок 17: Множества, кортежи и выбор подходящей коллекции',
    type: 'quiz',
    description: 'CSTA 2-AP-11, UK KS3, ACARA ACTDIP029: Неизменяемые кортежи tuple (), множества уникальных элементов set {}, операции объединения и пересечения.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 font-mono text-cyan-300">
            🎯
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Кортежи (tuple) и Множества (set)
            </h3>
            <p class="text-xs text-slate-300">
              Кортеж фиксирует константы, которые нельзя изменить. Множество <code class="text-yellow-300 font-mono">set</code> мгновенно удаляет все дубликаты из списка.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой результат вернет len(set([1, 2, 2, 3, 3, 3]))?',
      options: [
        '3',
        '6',
        '2',
        'TypeError'
      ],
      correctIndex: 0,
      explanation: 'Множество (set) автоматически отбрасывает дубликаты, оставляя только уникальные элементы {1, 2, 3}. Длина множества равна 3.'
    }
  },
  {
    id: 'g7_l18',
    courseId: 'course_grade7',
    module: 'Блок 2: Управление ходом программы и структуры данных',
    title: 'Урок 18: Мини-проект по коллекциям — классный журнал',
    type: 'terminal',
    description: 'CSTA 2-AP-15, UK KS3, ACARA ACTDIP025, ACTDIP027, KZ Инф 8.3.1.1 / 9.3.3.1: Разработка структуры данных электронного дневника на списках словарей с расчетом среднего балла GPA.',
    difficulty: 'Легенда',
    xpReward: 125,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-indigo-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            📖
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Мини-проект 2: Электронный журнал 7 класса
            </h3>
            <p class="text-xs text-slate-300">
              Используем вложенные структуры данных: список учеников, где каждый ученик представлен словарем с оценками.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'students = [\n    {"name": "Айдар", "grades": [5, 5, 4, 5]},\n    {"name": "Динара", "grades": [4, 5, 5, 5]},\n    {"name": "Максим", "grades": [5, 4, 4, 4]}\n]\nfor s in students:\n    avg = sum(s["grades"]) / len(s["grades"])\n    print(f"Ученик: {s[\'name\']:<8} | Ср. балл: {avg:.2f}")',
    terminalOutput: '> Ученик: Айдар    | Ср. балл: 4.75\n> Ученик: Динара   | Ср. балл: 4.75\n> Ученик: Максим   | Ср. балл: 4.25\n> Все ведомости успешно рассчитаны.'
  }
];
