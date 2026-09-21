import { Task } from '../../types';

export const MODULE3_TASKS: Task[] = [
  {
    id: 'g3_m3_l1',
    courseId: 'course_grade3',
    module: 'Модуль 3: Алгоритмы и веселые лабиринты',
    title: 'Урок 1: Что такое алгоритм? Исполнители и шаги',
    type: 'grid',
    description: 'Научи робота Роби двигаться вперед! Робот понимает только точные команды, написанные человеком.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-green-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🤖
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Что такое алгоритм простыми словами?
            </h3>
            <p class="text-xs text-slate-300">
              <strong>Алгоритм</strong> — это точный список действий (шагов), приводящий к нужной цели!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-2 text-xs">
          <div class="text-yellow-300 font-bold">Пример из жизни: Чистим зубы</div>
          <ol class="list-decimal list-inside space-y-1 text-slate-300 pl-1 text-[11px]">
            <li>Взять зубную щетку в руку.</li>
            <li>Выдавить горошину пасты.</li>
            <li>Чистить зубы 2 минуты.</li>
            <li>Прополоскать рот чистой водой.</li>
          </ol>
        </div>

        <div class="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs text-emerald-300">
          🎯 <strong>Твоя цель в игре:</strong> Напиши 3 команды <code>forward()</code>, чтобы робот дошел до зеленой точки финиша!
        </div>
      </div>
    `,
    initialCode: `forward()\nforward()\nforward()`,
    allowedCommands: ['forward()', 'right()', 'left()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 2],
      end: [3, 2],
      obstacles: []
    }
  },
  {
    id: 'g3_m3_l2',
    courseId: 'course_grade3',
    module: 'Модуль 3: Алгоритмы и веселые лабиринты',
    title: 'Урок 2: Команды поворотов: Направо right() и Налево left()',
    type: 'grid',
    description: 'Научись поворачивать робота на 90 градусов. Помни: где у робота право, зависит от того, куда он смотрит!',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-cyan-950/60 border border-cyan-500/40 rounded-xl">
          <h4 class="font-bold text-cyan-300 text-sm mb-1">🧭 Где у робота право и лево?</h4>
          <p>Поворот меняет направление взгляда робота на месте. Чтобы пойти туда, после поворота нужна команда <code>forward()</code>!</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-xl">
            <strong class="text-yellow-300">right():</strong> поворот по часовой стрелке.
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-xl">
            <strong class="text-cyan-300">left():</strong> поворот против часовой стрелки.
          </div>
        </div>
      </div>
    `,
    initialCode: `forward()\nright()\nforward()\nforward()`,
    allowedCommands: ['forward()', 'right()', 'left()'],
    mapConfig: {
      gridSize: 5,
      start: [1, 1],
      end: [2, 3],
      obstacles: [[1, 2]]
    }
  },
  {
    id: 'g3_m3_l3',
    courseId: 'course_grade3',
    module: 'Модуль 3: Алгоритмы и веселые лабиринты',
    title: 'Урок 3: Обход препятствий и лазерных стен',
    type: 'grid',
    description: 'На пути робота выросли стены! Составь безопасный маршрут в обход препятствий.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-rose-950/60 border border-rose-500/40 rounded-xl">
          <h4 class="font-bold text-rose-300 text-sm mb-1">⛔ Не врезайся в стены!</h4>
          <p>Если робот шагнет в клетку с лазерной стеной, уровень придется начать заново. Внимательно рассчитай траекторию в обход!</p>
        </div>
      </div>
    `,
    initialCode: `right()\nforward()\nforward()\nleft()\nforward()\nforward()\nright()\nforward()`,
    allowedCommands: ['forward()', 'right()', 'left()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [2, 3],
      obstacles: [[1, 0], [1, 1]]
    }
  },
  {
    id: 'g3_m3_l4',
    courseId: 'course_grade3',
    module: 'Модуль 3: Алгоритмы и веселые лабиринты',
    title: 'Урок 4: Циклы повторения: Команда for i in range()',
    type: 'grid',
    description: 'Зачем писать 10 раз одно и то же? Программисты используют циклы, чтобы сократить код и ускорить работу!',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">🔁 Магия цикла повторения</h4>
          <p>Вместо 4 строк <code>forward()</code> можно написать короткий цикл на Python:</p>
          <pre class="bg-black/60 p-2 rounded text-emerald-300 font-mono mt-2">for i in range(4):\n    forward()</pre>
        </div>
      </div>
    `,
    initialCode: `for i in range(4):\n    forward()`,
    allowedCommands: ['forward()', 'right()', 'left()'],
    mapConfig: {
      gridSize: 6,
      start: [0, 1],
      end: [4, 1],
      obstacles: []
    }
  },
  {
    id: 'g3_m3_l5',
    courseId: 'course_grade3',
    module: 'Модуль 3: Алгоритмы и веселые лабиринты',
    title: 'Урок 5: Поиск и исправление ошибок (Отладка и Дебаг)',
    type: 'quiz',
    description: 'Что делать, если в алгоритме закралась ошибка? Узнай, как находить баги и тестировать свои программы.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-amber-950/60 border border-amber-500/40 rounded-xl">
          <h4 class="font-bold text-amber-300 text-sm mb-1">🔍 Отладка (Дебаг / Debugging)</h4>
          <p>Даже самые опытные программисты допускают ошибки. Процесс поиска и исправления ошибок в коде называется <strong>отладкой</strong>.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1 text-xs">
          <div class="text-cyan-300 font-bold">Как найти ошибку:</div>
          <p class="text-slate-300 text-[11px]">Выполняй алгоритм медленно, шаг за шагом, как будто ты сам робот, и смотри, на каком именно шаге робот свернул не туда!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как называется процесс поиска и устранения ошибок в программе?',
      options: [
        'Отладка (дебаг)',
        'Компиляция',
        'Форматирование',
        'Архивация'
      ],
      correctIndex: 0,
      explanation: 'Отладка (debugging) — это методичный поиск и исправление неточностей и сбоев в алгоритме!'
    }
  },
  {
    id: 'g3_m3_l6',
    courseId: 'course_grade3',
    module: 'Модуль 3: Алгоритмы и веселые лабиринты',
    title: 'Урок 6: Ветвление: Условия «ЕСЛИ... ТО... ИНАЧЕ...» (if/else)',
    type: 'quiz',
    description: 'Как программа делает выбор? Познакомься со служебными словами if и else на развилке дорог.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 border border-yellow-500/50 rounded-xl">
          <h4 class="font-bold text-yellow-300 text-sm mb-1">🔀 Развилки на дороге: Ветвление в коде</h4>
          <p>Ветвление позволяет роботу действовать по обстоятельствам.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-2 text-xs">
          <pre class="p-2.5 bg-black/70 rounded border border-gray-800 font-mono text-xs text-green-400">
if стена_впереди:
    right()
else:
    forward()
          </pre>
          <p class="text-slate-300 text-[11px]">Если путь свободен — шагай вперед, иначе — поворачивай направо!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое ключевое слово в языках программирования проверяет условие («ЕСЛИ»)?',
      options: [
        'if',
        'for',
        'print',
        'else'
      ],
      correctIndex: 0,
      explanation: 'Команда "if" переводится как "ЕСЛИ". Она проверяет условие и направляет робота по нужной ветке алгоритма!'
    }
  },
  {
    id: 'g3_m3_l7',
    courseId: 'course_grade3',
    module: 'Модуль 3: Алгоритмы и веселые лабиринты',
    title: 'Урок 7: Экзамен модуля: Мастер алгоритмов и логики',
    type: 'quiz',
    description: 'Итоговая проверка знаний: шаги исполнителя, циклы, ветвления и поиск ошибок!',
    difficulty: 'Хакер',
    xpReward: 125,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/50 rounded-xl">
          <h4 class="font-bold text-emerald-300 text-sm mb-1">🏁 Главный зачет Модуля 3</h4>
          <p>Ты научил робота ходить, поворачивать, обходить стены, повторять действия в цикле и принимать решения по условию if!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что произойдет, если в алгоритме перепутать порядок двух обязательных шагов?',
      options: [
        'Алгоритм выполнится неверно или с ошибкой',
        'Компьютер сам переставит шаги правильно',
        'Ничего не изменится: порядок не важен',
        'Алгоритм выполнится, но вдвое медленнее'
      ],
      correctIndex: 0,
      explanation: 'Компьютер строго и буквально выполняет шаги ровно в том порядке, в котором их задал программист!'
    }
  }
];
