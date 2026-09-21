import { Task } from '../../types';

export const MODULE8_TASKS: Task[] = [
  {
    id: 'g6_m8_l1',
    courseId: 'course_grade6',
    module: 'Блок 8: Программная Инженерия и Git',
    title: 'Урок 1: Жизненный цикл разработки ПО (SDLC): От идеи до деплоя',
    type: 'quiz',
    description: 'Как создаются масштабные программные продукты в IT-компаниях: этапы требований, архитектуры, разработки, тестирования и релиза.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🏗️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              SDLC (Software Development Life Cycle)
            </h3>
            <p class="text-xs text-slate-300">
              Программирование — это лишь один из этапов создания продукта. Без грамотного проектирования и тестирования код превратится в клубок багов.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2 text-xs">
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-indigo-400 font-bold">1. Анализ требований</span>
            <p class="text-slate-400 text-[11px]">Что именно нужно пользователю?</p>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-cyan-400 font-bold">2. Архитектура</span>
            <p class="text-slate-400 text-[11px]">Выбор базы данных, стека и модулей.</p>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-emerald-400 font-bold">3. QA Тестирование</span>
            <p class="text-slate-400 text-[11px]">Поиск уязвимостей и сбоев до релиза.</p>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-yellow-400 font-bold">4. Деплой & CI/CD</span>
            <p class="text-slate-400 text-[11px]">Развертывание на боевые серверы.</p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой этап жизненного цикла разработки ПО отвечает за поиск багов и проверку соответствия программы техническому заданию перед отправкой пользователям?',
      options: [
        'QA-тестирование',
        'Сбор требований',
        'Написание кода',
        'Маркетинг продукта'
      ],
      correctIndex: 0,
      explanation: 'Инженеры тестирования (QA) моделируют нестандартные сценарии поведения пользователей, чтобы гарантировать надежность системы.'
    }
  },
  {
    id: 'g6_m8_l2',
    courseId: 'course_grade6',
    module: 'Блок 8: Программная Инженерия и Git',
    title: 'Урок 2: Машина времени кода: Система контроля версий Git',
    type: 'quiz',
    description: 'Забудь про названия файлов "проект_финал_v2_точно_итог.py". Узнай, как Git хранит слепки изменений и историю коммитов.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔀
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Git: Спасательный круг каждого программиста
            </h3>
            <p class="text-xs text-slate-300">
              Созданный Линусом Торвальдсом в 2005 году, Git позволяет в любой момент откатить код до вчерашнего рабочего состояния.
            </p>
          </div>
        </div>

        <div class="space-y-2 text-xs font-mono">
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
            <span class="text-emerald-400 font-bold">git init</span>
            <span class="text-slate-400 font-sans">Создать новый Git-репозиторий в текущей папке</span>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
            <span class="text-cyan-400 font-bold">git add .</span>
            <span class="text-slate-400 font-sans">Добавить все измененные файлы в область подготовки (Staging Area)</span>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
            <span class="text-yellow-400 font-bold">git commit -m "сообщение"</span>
            <span class="text-slate-400 font-sans">Зафиксировать постоянный снимок проекта с комментарием</span>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что такое "коммит" (commit) в системе контроля версий Git?',
      options: [
        'Снимок состояния файлов с уникальным хешем',
        'Полное удаление проекта с компьютера',
        'Копия проекта, загруженная на сервер',
        'Ветка разработки с отдельным именем'
      ],
      correctIndex: 0,
      explanation: 'Коммит фиксирует точные изменения строчек кода, автора и дату, формируя непрерывную и защищенную цепочку истории версий.'
    }
  },
  {
    id: 'g6_m8_term_git',
    courseId: 'course_grade6',
    module: 'Блок 8: Программная Инженерия и Git',
    title: 'Урок 3: Практикум Git: Инициализация и первый коммит',
    type: 'terminal',
    description: 'Инициализируй репозиторий, добавь файлы в индекс и зафиксируй первый коммит командой git commit -m "feat: initial commit"!',
    difficulty: 'Хакер',
    xpReward: 140,
    currencyReward: 55,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            💻
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Стандарт Conventional Commits
            </h3>
            <p class="text-xs text-slate-300">
              В профессиональных командах коммиты называют осмысленно: <code class="text-yellow-300 font-mono">feat:</code> (новая фича), <code class="text-red-300 font-mono">fix:</code> (исправление бага), <code class="text-purple-300 font-mono">docs:</code> (документация).
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono space-y-1">
          <div class="text-emerald-400 font-bold">Команды терминала:</div>
          <div class="text-slate-300">git init</div>
          <div class="text-slate-300">git add .</div>
          <div class="text-slate-300">git commit -m "feat: initial commit"</div>
        </div>
      </div>
    `,
    initialCode: 'git init\ngit add .\ngit commit -m "feat: initial commit"',
    terminalConfig: {
      fileSystem: '{"main.py": "print(\'Grade 6 Engineer Project\')", "README.md": "# Инженерный проект"}',
      goalCommand: 'git commit'
    }
  },
  {
    id: 'g6_m8_qa',
    courseId: 'course_grade6',
    module: 'Блок 8: Программная Инженерия и Git',
    title: 'Урок 4: Тестирование ПО: Модульные тесты и граничные условия',
    type: 'quiz',
    description: 'Как автоматические тесты защищают код от регрессии: тестирование пустых массивов, отрицательных чисел и деления на 0.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-purple-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🧪
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Граничные условия (Edge Cases)
            </h3>
            <p class="text-xs text-slate-300">
              Программа может отлично работать на обычных данных, но ломаться, если пользователь введет 0, отрицательное число или оставит поле пустым.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-purple-500/40 rounded-xl text-xs space-y-1 font-mono">
          <div class="text-purple-300 font-bold">Модульный тест (Unit Test):</div>
          <div class="text-slate-300">
            assert divide(10, 2) == 5 &nbsp;# обычный случай<br/>
            assert divide(10, 0) == Error # граничный случай (деление на ноль)
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что такое "Граничное условие" (Edge Case) при тестировании программного обеспечения?',
      options: [
        'Крайнее значение: 0, пустая строка, минус',
        'Крайний срок сдачи проекта заказчику',
        'Граница между блоками кода в файле',
        'Самый частый сценарий работы пользователя'
      ],
      correctIndex: 0,
      explanation: 'Большинство опасных уязвимостей и падений программ происходит именно на границах диапазонов допустимых данных.'
    }
  },
  {
    id: 'g6_m8_boss',
    courseId: 'course_grade6',
    module: 'Блок 8: Программная Инженерия и Git',
    title: 'Урок 5: ФИНАЛЬНЫЙ БОСС-УРОВЕНЬ: Релиз инженерного проекта 6 класса!',
    type: 'terminal',
    description: 'Итоговое испытание курса 6 класса: зафиксируй релизный коммит всех созданных модулей и получи диплом Кибер-Инженера 6 класса!',
    difficulty: 'Легенда',
    xpReward: 300,
    currencyReward: 150,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-4 bg-gradient-to-r from-red-950/90 via-purple-950/90 to-amber-950/90 border-2 border-yellow-400 rounded-2xl flex items-center gap-4 shadow-xl">
          <div class="w-14 h-14 rounded-xl bg-yellow-400/20 border-2 border-yellow-400 flex items-center justify-center text-3xl shrink-0 animate-bounce">
            🏆
          </div>
          <div>
            <h3 class="text-base md:text-xl font-extrabold text-yellow-300">
              ФИНАЛЬНЫЙ БОСС 6 КЛАССА: Релиз в Продакшен
            </h3>
            <p class="text-xs text-slate-200">
              Ты изучил операционные системы, формулы таблиц, Big-O, алгоритмы деревьев, синтаксис Python, веб-дизайн, сети TCP/IP, криминалистику фишинга и обучение нейронов!
            </p>
          </div>
        </div>

        <div class="p-3.5 bg-slate-900 border border-yellow-500/50 rounded-xl text-xs space-y-1.5 font-mono">
          <div class="text-yellow-400 font-bold text-sm">Финальная команда:</div>
          <div class="p-2.5 bg-black/80 rounded border border-slate-700 text-emerald-400 font-bold">
            git add .<br/>
            git commit -m "Инженер 6 класса готов к релизу!"
          </div>
          <p class="text-slate-400 font-sans mt-1">
            Выполни эту команду в терминале, чтобы завершить миссию и занять почетное место в зале славы инженеров!
          </p>
        </div>
      </div>
    `,
    initialCode: 'git add .\ngit commit -m "Инженер 6 класса готов к релизу!"',
    terminalConfig: {
      fileSystem: '{"main.py": "print(\'Grade 6 Cyber-Engineer Certified!\')", "system.conf": "STATUS=PRODUCTION_READY"}',
      goalCommand: 'git commit'
    }
  }
];
