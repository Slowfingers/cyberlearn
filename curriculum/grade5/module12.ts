import { Task } from '../../types';

export const MODULE12_TASKS: Task[] = [
  {
    id: 'g5_l55',
    courseId: 'course_grade5',
    module: 'Блок 12: Анализ данных, Терминал и Проектирование интерфейсов',
    title: 'Урок 55: Продвинутые таблицы, статистика и дашборды',
    type: 'spreadsheet',
    description: 'Интерактивный дашборд: вычисление общей суммы баллов участников олимпиады по информатике с помощью формулы =SUM(D2:D4).',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Статистический дашборд
            </h3>
            <p class="text-xs text-slate-300">
              Дашборд объединяет ключевые метрики на одном экране. Быстрый суммарный подсчет выполняется формулой <code class="text-yellow-300 font-mono">=SUM(диапазон)</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    spreadsheetConfig: {
      tableData: [
        { id: '1', name: 'Команда Альфа', val1: 45, val2: 50, formulaResult: 95 },
        { id: '2', name: 'Команда Бета', val1: 40, val2: 48, formulaResult: 88 },
        { id: '3', name: 'Команда Гамма', val1: 50, val2: 49, formulaResult: 99 }
      ],
      targetFormula: '=SUM(D2:D4)',
      formulaType: 'sum'
    }
  },
  {
    id: 'g5_l56',
    courseId: 'course_grade5',
    module: 'Блок 12: Анализ данных, Терминал и Проектирование интерфейсов',
    title: 'Урок 56: Проекты с реальными данными и этика данных',
    type: 'quiz',
    description: 'Этика сбора персональных данных: обезличивание (Анонимизация), регламенты конфиденциальности (GDPR, COPPA) и согласие пользователя.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚖️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Анонимизация персональных данных (Data Anonymization)
            </h3>
            <p class="text-xs text-slate-300">
              При публикации школьной статистики нельзя оставлять фамилии, домашние адреса и телефоны. Имена заменяются на случайные ID: <code class="text-yellow-300 font-mono">User_782</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Зачем исследователи данных удаляют фамилии и номера телефонов из баз данных перед публикацией статистики?',
      options: [
        'Чтобы нельзя было опознать человека',
        'Чтобы файл занимал ровно один килобайт',
        'Чтобы таблица открывалась быстрее в Excel',
        'Чтобы данные нельзя было отсортировать'
      ],
      correctIndex: 0,
      explanation: 'Анонимизация защищает людей от утечек персональной информации и преследования.'
    }
  },
  {
    id: 'g5_l57',
    courseId: 'course_grade5',
    module: 'Блок 12: Анализ данных, Терминал и Проектирование интерфейсов',
    title: 'Урок 57: Профи электронных таблиц — проект анализа реальных данных',
    type: 'spreadsheet',
    description: 'Инженерный анализ энергопотребления серверов: автоматическая пометка статуса энергоэффективности формулой =IF(B2>=60; "ЗАЧЕТ"; "НЕЗАЧЕТ").',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-emerald-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Зеленые вычисления (Green Computing)
            </h3>
            <p class="text-xs text-slate-300">
              Инженеры дата-центров используют формулы условий для выявления перегруженных серверов и перенаправления трафика.
            </p>
          </div>
        </div>
      </div>
    `,
    spreadsheetConfig: {
      tableData: [
        { id: '1', name: 'Команда 1', val1: 75, val2: 100, formulaResult: 'ЗАЧЕТ' },
        { id: '2', name: 'Команда 2', val1: 42, val2: 100, formulaResult: 'НЕЗАЧЕТ' },
        { id: '3', name: 'Команда 3', val1: 60, val2: 100, formulaResult: 'ЗАЧЕТ' }
      ],
      targetFormula: '=IF(B2>=60; "ЗАЧЕТ"; "НЕЗАЧЕТ")',
      formulaType: 'if'
    }
  },
  {
    id: 'g5_l58',
    courseId: 'course_grade5',
    module: 'Блок 12: Анализ данных, Терминал и Проектирование интерфейсов',
    title: 'Урок 58: Прокачка терминала — файлы, папки и конвейеры для начинающих',
    type: 'terminal',
    description: 'Командная строка инженера: навигация по директориям (cd, ls), создание папок (mkdir) и чтение файлов (cat).',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-slate-900 to-black border-2 border-emerald-500/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-400">
            &gt;_
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Командная строка Linux (CLI)
            </h3>
            <p class="text-xs text-slate-300">
              Все сервера мира управляются через текстовый терминал. Команда <code class="text-yellow-300 font-mono">ls</code> выводит список файлов, <code class="text-cyan-300 font-mono">cat file.txt</code> читает файл, а конвейер <code class="text-purple-300 font-mono">|</code> передает поток данных!
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'ls',
    terminalConfig: {
      fileSystem: 'documents/, projects/, story.txt',
      goalCommand: 'ls'
    }
  },
  {
    id: 'g5_l59',
    courseId: 'course_grade5',
    module: 'Блок 12: Анализ данных, Терминал и Проектирование интерфейсов',
    title: 'Урок 59: Спроектируй настоящий интерфейс — макет приложения в Design Studio',
    type: 'wireframe_builder',
    description: 'Интерактивная дизайн-студия: разработай каркас экрана школьного портала с кнопками навигации и карточками курсов.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Вайрфрейминг (Wireframing): Чертеж приложения
            </h3>
            <p class="text-xs text-slate-300">
              Вайрфрейм — это структурный скелет экрана без отвлекающих цветов: заголовок, аватар, кнопки действий и блок контента.
            </p>
          </div>
        </div>
      </div>
    `
  }
];
