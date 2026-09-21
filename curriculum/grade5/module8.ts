import { Task } from '../../types';

export const MODULE8_TASKS: Task[] = [
  {
    id: 'g5_l36',
    courseId: 'course_grade5',
    module: 'Блок 8: Первая HTML-страница, Поиск в ширину и Лабиринты',
    title: 'Урок 36: Веб-история на одну страницу — моя первая HTML-страница',
    type: 'html',
    description: 'Создай свою первую настоящую веб-страницу на языке HTML: теги <h1>, <p>, <strong> и гиперссылки <a>.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🌐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              HTML: Скелет всемирной паутины
            </h3>
            <p class="text-xs text-slate-300">
              HTML (HyperText Markup Language) размечает текст с помощью тегов: открывающий <code class="text-yellow-300 font-mono">&lt;h1&gt;</code> и закрывающий <code class="text-pink-300 font-mono">&lt;/h1&gt;</code>.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1 font-mono">
          <div class="text-cyan-400 font-bold">Базовые теги:</div>
          <div class="text-slate-300">&lt;h1&gt;Главный заголовок&lt;/h1&gt;</div>
          <div class="text-slate-300">&lt;p&gt;Обычный абзац текста&lt;/p&gt;</div>
          <div class="text-slate-300">&lt;button&gt;Кнопка действия&lt;/button&gt;</div>
        </div>
      </div>
    `,
    initialCode: '<h1>Мой первый сайт</h1>\n<p>Привет, всемирная паутина! Я ученик 5 класса.</p>',
    htmlConfig: {
      targetTag: 'h1'
    }
  },
  {
    id: 'g5_l37',
    courseId: 'course_grade5',
    module: 'Блок 8: Первая HTML-страница, Поиск в ширину и Лабиринты',
    title: 'Урок 37: Планирование и разработка итогового проекта',
    type: 'quiz',
    description: 'Инженерная методология: составление дорожной карты проекта (Roadmap), доска задач Канбан и оценка времени на разработку.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📋
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Канбан-доска: Сделать ➔ В работе ➔ Готово
            </h3>
            <p class="text-xs text-slate-300">
              Прежде чем бросаться писать код, составь список задач (Backlog). Не бери больше 2 задач в работу одновременно!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'С чего грамотный IT-инженер начинает работу над любым новым программным проектом?',
      options: [
        'С требований и плана задач',
        'С рисования экрана победы',
        'С выбора цвета кнопок меню',
        'С публикации проекта в сети'
      ],
      correctIndex: 0,
      explanation: 'Четкое техническое задание и декомпозиция задач экономят десятки часов переписывания кода.'
    }
  },
  {
    id: 'g5_l38',
    courseId: 'course_grade5',
    module: 'Блок 8: Первая HTML-страница, Поиск в ширину и Лабиринты',
    title: 'Урок 38: Показ итоговых проектов и рефлексия 5 класса',
    type: 'quiz',
    description: 'Презентация продукта (Demo Day): конструктивная обратная связь (Code Review), анализ метрик успеха и рефлексия инженера.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎤
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Demo Day: Презентация проекта и Code Review
            </h3>
            <p class="text-xs text-slate-300">
              Умение показать работающий прототип, объяснить архитектурные решения и спокойно воспринять замечания тестировщиков — признак взрослого инженера.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что такое "Code Review" (Ревью кода) в профессиональных командах разработчиков?',
      options: [
        'Проверка кода другим инженером',
        'Печать кода на цветном принтере',
        'Автоматический запуск всех тестов',
        'Удаление комментариев перед сдачей'
      ],
      correctIndex: 0,
      explanation: 'Code Review помогает обнаружить ошибки до релиза и повысить надежность всей программной системы.'
    }
  },
  {
    id: 'g5_l39',
    courseId: 'course_grade5',
    module: 'Блок 8: Первая HTML-страница, Поиск в ширину и Лабиринты',
    title: 'Урок 39: Возвращение в лабиринт и визуализация алгоритмов',
    type: 'grid',
    description: 'Правило правой руки для прохождения лабиринтов: алгоритм обхода стен и выход из тупиков.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🧭
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Правило правой руки (Wall Follower)
            </h3>
            <p class="text-xs text-slate-300">
              Если в простом лабиринте положить правую руку на стену и ни разу не отрывать ее при ходьбе, алгоритм гарантированно приведет тебя к выходу!
            </p>
          </div>
        </div>
      </div>
    `,
    allowedCommands: ['moveForward()', 'turnLeft()', 'turnRight()'],
    initialCode: 'turnRight()\nmoveForward()\nmoveForward()\nturnLeft()\nmoveForward()\nmoveForward()',
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [2, 2],
      obstacles: [[1, 0], [1, 1]]
    }
  },
  {
    id: 'g5_l40',
    courseId: 'course_grade5',
    module: 'Блок 8: Первая HTML-страница, Поиск в ширину и Лабиринты',
    title: 'Урок 40: Поиск в ширину — кратчайший путь и генерация лабиринтов',
    type: 'network_route',
    description: 'Алгоритм BFS (Breadth-First Search, Поиск в ширину): использование очереди (Queue) для нахождения гарантированно кратчайшего пути на графе.',
    difficulty: 'Элита',
    xpReward: 125,
    currencyReward: 45,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🌊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Поиск в ширину (BFS): Волновой алгоритм
            </h3>
            <p class="text-xs text-slate-300">
              Представь каплю воды, падающую в лабиринт: волна равномерно растекается во все стороны на 1 шаг, затем на 2 шага, затем на 3. Первый путь, достигший цели, и есть самый короткий!
            </p>
          </div>
        </div>
      </div>
    `,
    networkConfig: {
      startNode: 'A',
      endNode: 'F'
    }
  },
  {
    id: 'g5_l41',
    courseId: 'course_grade5',
    module: 'Блок 8: Первая HTML-страница, Поиск в ширину и Лабиринты',
    title: 'Урок 41: Адаптивные лабиринты и чемпионат лабиринтов',
    type: 'grid',
    description: 'Продвинутая навигация дрона в динамически изменяющемся лабиринте с ловушками и подвижными стенами.',
    difficulty: 'Легенда',
    xpReward: 140,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-red-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🏆
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Чемпионат лабиринтов: Автономный робот
            </h3>
            <p class="text-xs text-slate-300">
              Робот оснащен ультразвуковыми дальномерами. Встретив препятствие, он пересчитывает маршрут и находит обходной путь!
            </p>
          </div>
        </div>
      </div>
    `,
    allowedCommands: ['moveForward()', 'turnLeft()', 'turnRight()', 'jump()'],
    initialCode: 'moveForward()\njump()\nmoveForward()',
    mapConfig: {
      gridSize: 5,
      start: [0, 4],
      end: [4, 4],
      obstacles: [[2, 4]]
    }
  }
];
