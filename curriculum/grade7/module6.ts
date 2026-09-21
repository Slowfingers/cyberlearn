import { Task } from '../../types';

export const MODULE6_TASKS: Task[] = [
  {
    id: 'g7_l36',
    courseId: 'course_grade7',
    module: 'Блок 6: Базы данных, SQL и Анализ данных',
    title: 'Урок 36: Что такое база данных?',
    type: 'quiz',
    description: 'UK KS3, ACARA ACTDIP025, ABEGS, KZ Инф 9.2.2.1: Реляционная модель (Кодд), таблицы, строки (кортежи), столбцы (атрибуты), первичный ключ Primary Key, сравнение с Excel.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 font-mono text-indigo-300">
            🗄️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Реляционные базы данных (RDBMS)
            </h3>
            <p class="text-xs text-slate-300">
              База данных — это структурированное хранилище с гарантией целостности ACID. Каждая таблица имеет уникальный первичный ключ (<code class="text-yellow-300 font-mono">PRIMARY KEY</code>), гарантирующий неповторимость строк.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Зачем в таблице базы данных нужен первичный ключ (PRIMARY KEY)?',
      options: [
        'Чтобы однозначно отличать каждую запись',
        'Чтобы закрыть таблицу паролем от чужих',
        'Чтобы таблица сортировалась по алфавиту',
        'Чтобы записи нельзя было удалить'
      ],
      correctIndex: 0,
      explanation: 'Primary Key — фундаментальное правило реляционных БД, гарантирующее уникальность каждого кортежа (строки) таблицы.'
    }
  },
  {
    id: 'g7_l37',
    courseId: 'course_grade7',
    module: 'Блок 6: Базы данных, SQL и Анализ данных',
    title: 'Урок 37: SELECT и WHERE — язык вопросов',
    type: 'terminal',
    description: 'UK KS3, ACARA ACTDIP025, KZ Инф 9.2.2.3: Декларативный синтаксис SQL: SELECT columns FROM table WHERE condition AND/OR, операторы LIKE, IN, BETWEEN.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            🔍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Запросы SELECT ... WHERE
            </h3>
            <p class="text-xs text-slate-300">
              В отличие от императивных языков, в SQL вы описываете, ЧТО хотите получить: <code class="text-yellow-300 font-mono">SELECT name, score FROM students WHERE score >= 90;</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'SELECT name, role, level FROM players WHERE level >= 10 AND status = "active";',
    terminalOutput: '> Query executed successfully:\n> +----------+---------+-------+\n> | name     | role    | level |\n> +----------+---------+-------+\n> | Neo      | hacker  | 14    |\n> | Morpheus | teacher | 25    |\n> +----------+---------+-------+\n> 2 rows in set (0.002 sec)'
  },
  {
    id: 'g7_l38',
    courseId: 'course_grade7',
    module: 'Блок 6: Базы данных, SQL и Анализ данных',
    title: 'Урок 38: ORDER BY, LIMIT и встроенные функции',
    type: 'terminal',
    description: 'UK KS3, ACARA ACTDIP026, KZ Инф 9.2.2.3: Сортировка ORDER BY col DESC/ASC, пагинация LIMIT N OFFSET M, агрегаты COUNT(), SUM(), AVG(), MIN(), MAX().',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-indigo-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 font-mono text-cyan-300">
            📈
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Агрегация и сортировка результатов в SQL
            </h3>
            <p class="text-xs text-slate-300">
              Функция <code class="text-yellow-300 font-mono">AVG(rating)</code> вычисляет средний рейтинг, а <code class="text-cyan-300 font-mono">ORDER BY score DESC LIMIT 3</code> выбирает топ-3 лидеров таблицы.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'SELECT username, score FROM leaderboard ORDER BY score DESC LIMIT 3;',
    terminalOutput: '> Топ-3 игрока:\n> 1. CyberGhost  - 9840 pts\n> 2. ZeroCool    - 9210 pts\n> 3. Trinity     - 8950 pts\n> Query executed in 0.001s'
  },
  {
    id: 'g7_l39',
    courseId: 'course_grade7',
    module: 'Блок 6: Базы данных, SQL и Анализ данных',
    title: 'Урок 39: INSERT, UPDATE, DELETE — изменяем базу данных',
    type: 'quiz',
    description: 'ACARA ACTDIP025, KZ Инф 9.2.2.2: Модификация данных (DML): INSERT INTO, UPDATE table SET col = val WHERE id = X, опасность забытого WHERE при DELETE, транзакции.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-amber-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 font-mono text-red-300">
            ⚠️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Золотое правило инженера баз данных: Всегда проверяй WHERE!
            </h3>
            <p class="text-xs text-slate-300">
              Запрос <code class="text-red-400 font-mono">DELETE FROM users;</code> без условия WHERE удалит вообще ВСЕ строки в таблице без возможности отмены!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что произойдет при выполнении запроса: UPDATE accounts SET balance = 0; если программист случайно забыл дописать условие WHERE id = 5?',
      options: [
        'Баланс обнулится у всех пользователей',
        'Обновится только первая строка таблицы',
        'База откажется выполнять такой запрос',
        'Ничего не изменится без условия WHERE'
      ],
      correctIndex: 0,
      explanation: 'В SQL команда UPDATE без блока WHERE применяется ко всем строкам таблицы, что может привести к катастрофической потере данных!'
    }
  },
  {
    id: 'g7_l40',
    courseId: 'course_grade7',
    module: 'Блок 6: Базы данных, SQL и Анализ данных',
    title: 'Урок 40: Проектирование схемы и мини-проект базы данных',
    type: 'terminal',
    description: 'UK KS3, ACARA ACTDIP025, ACTDIP027, KZ Инф 9.2.2.2 / 9.2.2.3: Схема БД: таблицы, связи «один-ко-многим», внешний ключ Foreign Key, создание таблиц CREATE TABLE.',
    difficulty: 'Легенда',
    xpReward: 125,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-purple-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 font-mono text-indigo-300">
            📐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Мини-проект 3: Реляционная схема «Школьная библиотека»
            </h3>
            <p class="text-xs text-slate-300">
              Таблица <code class="text-cyan-300 font-mono">books</code> связана с таблицей <code class="text-yellow-300 font-mono">authors</code> через внешний ключ <code class="text-emerald-300 font-mono">author_id FOREIGN KEY</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'CREATE TABLE books (\n    id INTEGER PRIMARY KEY,\n    title TEXT NOT NULL,\n    author TEXT NOT NULL,\n    year INTEGER\n);\nINSERT INTO books VALUES (1, "Python для инженеров", "А. Смит", 2024);\nSELECT * FROM books;',
    terminalOutput: '> Table "books" created successfully.\n> 1 row inserted.\n> Query result: [1, "Python для инженеров", "А. Смит", 2024]'
  },
  {
    id: 'g7_l41',
    courseId: 'course_grade7',
    module: 'Блок 6: Базы данных, SQL и Анализ данных',
    title: 'Урок 41: Прокачка электронных таблиц — группировка и сводный анализ',
    type: 'spreadsheet',
    description: 'CSTA 2-DA-08, ACARA ACTDIP025, ACTDIP026, Singapore, KZ Инф 7.2.2.6 / 7.2.2.3 / 8.2.2.3: Сводные таблицы Pivot Tables, фильтры, формулы VLOOKUP / XLOOKUP, условное форматирование.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Сводный анализ больших массивов данных
            </h3>
            <p class="text-xs text-slate-300">
              Сводные таблицы (Pivot Tables) мгновенно агрегируют тысячи строк по категориям, вычисляя суммы и доли без ручного пересчета.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g7_l42',
    courseId: 'course_grade7',
    module: 'Блок 6: Базы данных, SQL и Анализ данных',
    title: 'Урок 42: CSV и Python — читаем настоящие данные',
    type: 'terminal',
    description: 'CSTA 2-DA-08, ACARA ACTDIP025, UK KS3, KZ Инф 7.3.3.1 / 8.3.1.1: Модуль import csv, csv.reader, csv.DictReader, парсинг реальных датасетов погоды и датчиков.',
    difficulty: 'Хакер',
    xpReward: 115,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 font-mono text-purple-300">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Формат CSV (Comma-Separated Values) и модуль csv
            </h3>
            <p class="text-xs text-slate-300">
              CSV — мировой стандарт открытых датасетов. Python читает строки CSV прямо в удобные словари <code class="text-yellow-300 font-mono">csv.DictReader</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'import csv\nraw_data = "city,temp\\nAlmaty,22\\nAstana,15\\nShymkent,28"\nlines = raw_data.strip().split("\\n")\nreader = csv.DictReader(lines)\nfor row in reader:\n    print(f"Город: {row[\'city\']:<10} | Температура: {row[\'temp\']}°C")',
    terminalOutput: '> Город: Almaty     | Температура: 22°C\n> Город: Astana     | Температура: 15°C\n> Город: Shymkent   | Температура: 28°C\n> CSV успешно распарсен.'
  },
  {
    id: 'g7_l43',
    courseId: 'course_grade7',
    module: 'Блок 6: Базы данных, SQL и Анализ данных',
    title: 'Урок 43: От вопроса к выводу — мини-проект по данным',
    type: 'terminal',
    description: 'CSTA 2-DA-08, 2-DA-09, ACARA ACTDIP026, ACTDIP031, KZ Инф 4.1.3.1 / 7.2.2.3 / 8.3.1.1: Полный цикл Data Science: постановка гипотезы, очистка пропусков, расчет метрик и визуальный вывод в консоль.',
    difficulty: 'Легенда',
    xpReward: 125,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            🔬
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Мини-проект 4: Исследовательский анализ датасета
            </h3>
            <p class="text-xs text-slate-300">
              Проверяем гипотезу: зависит ли скорость загрузки сайта от размера подключенных скриптов.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'speeds = [120, 145, 95, 210, 180, 115, 300]\navg_speed = sum(speeds) / len(speeds)\nmax_speed = max(speeds)\nmin_speed = min(speeds)\nprint(f"Средний пинг: {avg_speed:.1f} ms")\nprint(f"Лучший пинг: {min_speed} ms | Худший пинг: {max_speed} ms")',
    terminalOutput: '> Средний пинг: 166.4 ms\n> Лучший пинг: 95 ms | Худший пинг: 300 ms\n> Анализ завершен: гипотеза подтверждена.'
  }
];
