import { Task } from '../../types';

export const MODULE1_TASKS: Task[] = [
  {
    id: 'g7_l01',
    courseId: 'course_grade7',
    module: 'Блок 1: Введение в Python и среда разработчика',
    title: 'Урок 1: Добро пожаловать в 7 класс — теперь ты программист',
    type: 'quiz',
    description: 'Вводный урок 7 класса: стандарты CSTA 2-CS-03, UK KS3, ACARA ACTDIP027, KZ Инф 6.1.2.2. Роль текстового программирования в реальном мире.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🐍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Рубеж 7 класса: От блоков к профессиональному коду
            </h3>
            <p class="text-xs text-slate-300">
              Поздравляем с переходом в 7 класс! Теперь мы переходим от блочного программирования к живому синтаксису Python, профессиональным скриптам и инженерным алгоритмам.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3 bg-slate-900 border border-indigo-500/40 rounded-xl space-y-1">
            <div class="text-indigo-400 font-bold text-xs uppercase">1. Текстовый код</div>
            <p class="text-xs text-slate-300">Никаких визуальных пазлов. Каждая строчка — точная инструкция для интерпретатора.</p>
          </div>
          <div class="p-3 bg-slate-900 border border-emerald-500/40 rounded-xl space-y-1">
            <div class="text-emerald-400 font-bold text-xs uppercase">2. Автоматизация</div>
            <p class="text-xs text-slate-300">Скрипты обрабатывают гигабайты файлов, строят графики и управляют серверами за секунды.</p>
          </div>
          <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-1">
            <div class="text-cyan-400 font-bold text-xs uppercase">3. Реальная экосистема</div>
            <p class="text-xs text-slate-300">Те же инструменты, что используют разработчики в NASA, Google, YouTube и OpenAI.</p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'В чем ключевое преимущество перехода на текстовый язык программирования (Python) в 7 классе?',
      options: [
        'Доступ к библиотекам и сложным алгоритмам',
        'Текстовый код всегда работает быстрее блоков',
        'Текстовые программы работают без интернета',
        'В текстовом коде не бывает синтаксических ошибок'
      ],
      correctIndex: 0,
      explanation: 'Текстовый язык предоставляет программисту полную выразительную свободу, гибкие структуры данных и доступ к профессиональной экосистеме разработки.'
    }
  },
  {
    id: 'g7_l02',
    courseId: 'course_grade7',
    module: 'Блок 1: Введение в Python и среда разработчика',
    title: 'Урок 2: Три языка 7 класса',
    type: 'quiz',
    description: 'UK KS3 / CSTA: Три столпа современной разработки — Python (логика и данные), JavaScript (интерактивность клиента), SQL (хранение в БД).',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Три языка цифрового мира: Python, JavaScript, SQL
            </h3>
            <p class="text-xs text-slate-300">
              В 7 классе программист видит систему целиком: бэкенд, фронтенд и базу данных.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
          <div class="p-3 bg-slate-900 border border-yellow-500/40 rounded-xl space-y-1">
            <div class="font-bold text-yellow-400">🐍 Python</div>
            <p class="text-slate-300">Серверная логика, искусственный интеллект, математический анализ, обработка файлов.</p>
          </div>
          <div class="p-3 bg-slate-900 border border-amber-500/40 rounded-xl space-y-1">
            <div class="font-bold text-amber-400">🌐 JavaScript</div>
            <p class="text-slate-300">Интерактивный интерфейс в браузере: кнопки, анимации, валидация полей ввода.</p>
          </div>
          <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-1">
            <div class="font-bold text-cyan-400">🗄️ SQL</div>
            <p class="text-slate-300">Язык запросов к базам данных: структурированный поиск, сортировка и сохранение миллионов записей.</p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой язык позволяет запросить нужные строки из таблицы базы данных?',
      options: [
        'SQL',
        'HTML',
        'CSS',
        'JSON'
      ],
      correctIndex: 0,
      explanation: 'SQL — стандартный язык реляционных баз данных для эффективной выборки и модификации структурированных данных.'
    }
  },
  {
    id: 'g7_l03',
    courseId: 'course_grade7',
    module: 'Блок 1: Введение в Python и среда разработчика',
    title: 'Урок 3: print, комментарии и первый скрипт',
    type: 'terminal',
    description: 'CSTA 2-AP-11, 2-AP-17, UK KS3, ACARA ACTDIP030, KZ Инф 6.3.2.1: Функция print(), одинарные и двойные кавычки, однострочные комментарии (#).',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-400">
            &gt;_
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Функция print() и комментарии в Python
            </h3>
            <p class="text-xs text-slate-300">
              Функция <code class="text-yellow-300 font-mono">print()</code> выводит результат вычислений или текст в стандартный поток вывода (консоль терминала).
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-2 font-mono text-xs">
          <div class="text-emerald-400 font-bold">Пример программы:</div>
          <div class="text-slate-400"># Это комментарий для человека, Python его игнорирует</div>
          <div class="text-white">print("Система запущена!")</div>
          <div class="text-cyan-300">print("Результат вычисления:", 40 + 2)</div>
        </div>
      </div>
    `,
    initialCode: '# Напиши команду вывода в терминал\nprint("CyberSchool Grade 7 Online")',
    terminalOutput: '> CyberSchool Grade 7 Online\n> Execution completed successfully.'
  },
  {
    id: 'g7_l04',
    courseId: 'course_grade7',
    module: 'Блок 1: Введение в Python и среда разработчика',
    title: 'Урок 4: Переменные и типы',
    type: 'quiz',
    description: 'CSTA 2-AP-11, UK KS3, ACARA ACTDIP030, ABEGS, KZ Инф 6.3.2.1 / 6.3.3.1: Динамическая типизация, int, float, str, bool, type().',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0">
            📦
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Фундаментальные типы данных Python
            </h3>
            <p class="text-xs text-slate-300">
              Переменная — это именованная ссылка на область оперативной памяти, хранящую значение определенного типа.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 md:grid-cols-4 gap-2 text-xs font-mono">
          <div class="p-2.5 bg-slate-900 border border-emerald-500/40 rounded-lg">
            <div class="text-emerald-400 font-bold">int</div>
            <div class="text-slate-300 text-[11px]">Целые числа: 42, -5, 0</div>
          </div>
          <div class="p-2.5 bg-slate-900 border border-cyan-500/40 rounded-lg">
            <div class="text-cyan-400 font-bold">float</div>
            <div class="text-slate-300 text-[11px]">Дробные числа: 3.14, -0.5</div>
          </div>
          <div class="p-2.5 bg-slate-900 border border-yellow-500/40 rounded-lg">
            <div class="text-yellow-400 font-bold">str</div>
            <div class="text-slate-300 text-[11px]">Строки текста: "Привет"</div>
          </div>
          <div class="p-2.5 bg-slate-900 border border-purple-500/40 rounded-lg">
            <div class="text-purple-400 font-bold">bool</div>
            <div class="text-slate-300 text-[11px]">Булевы значения: True, False</div>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой тип данных будет у переменной score после выполнения строки: score = 98.5 ?',
      options: [
        'float',
        'int',
        'str',
        'bool'
      ],
      correctIndex: 0,
      explanation: 'Числа с десятичной точкой в Python автоматически получают тип данных float.'
    }
  },
  {
    id: 'g7_l05',
    courseId: 'course_grade7',
    module: 'Блок 1: Введение в Python и среда разработчика',
    title: 'Урок 5: Операторы — математика, сравнение и логика',
    type: 'quiz',
    description: 'UK KS3, CSTA 2-AP-12, ACARA ACTDIP029, KZ Инф 6.3.2.1 / 7.3.3.3: Арифметика (+, -, *, /, //, %, **), операторы сравнения (==, !=, >, <, >=, <=) и логика (and, or, not).',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            🧮
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Математические и логические операторы
            </h3>
            <p class="text-xs text-slate-300">
              Python поддерживает целочисленное деление <code class="text-yellow-300 font-mono">//</code>, остаток от деления <code class="text-yellow-300 font-mono">%</code>, возведение в степень <code class="text-yellow-300 font-mono">**</code> и логические связки <code class="text-cyan-300 font-mono">and, or, not</code>.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl font-mono text-xs space-y-1">
          <div><span class="text-slate-400">17 // 5  # Результат: </span><strong class="text-emerald-400">3</strong> (целая часть)</div>
          <div><span class="text-slate-400">17 % 5   # Результат: </span><strong class="text-cyan-400">2</strong> (остаток)</div>
          <div><span class="text-slate-400">2 ** 8   # Результат: </span><strong class="text-yellow-400">256</strong> (возведение в степень)</div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое значение вернет выражение: 20 // 6 + 20 % 6 ?',
      options: [
        '5',
        '3',
        '26',
        '3.33'
      ],
      correctIndex: 0,
      explanation: '20 // 6 дает целую часть 3, а 20 % 6 дает остаток 2. В сумме 3 + 2 = 5.'
    }
  },
  {
    id: 'g7_l06',
    courseId: 'course_grade7',
    module: 'Блок 1: Введение в Python и среда разработчика',
    title: 'Урок 6: Строки — больше, чем просто буквы',
    type: 'quiz',
    description: 'CSTA 2-AP-11, 2-AP-12, UK KS3, ACARA ACTDIP030, KZ Инф 6.3.2.1: Конкатенация, индексация [0], срезы [start:end], длина len(), методы upper(), lower(), strip().',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-pink-950/80 to-purple-950/80 border-2 border-pink-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-2xl shrink-0">
            🔤
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-pink-300">
              Строки как упорядоченные последовательности
            </h3>
            <p class="text-xs text-slate-300">
              Каждый символ строки имеет нулевой индекс. К символам обращаются через квадратные скобки: <code class="text-yellow-300 font-mono">text[0]</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что вернет обращение text[0:3], если переменная text = "Python"?',
      options: [
        '"Pyt"',
        '"Pyth"',
        '"yth"',
        '"Python"'
      ],
      correctIndex: 0,
      explanation: 'Срез [start:end] в Python не включает правый индекс end. Индексы 0, 1, 2 соответствуют буквам "P", "y", "t".'
    }
  },
  {
    id: 'g7_l07',
    courseId: 'course_grade7',
    module: 'Блок 1: Введение в Python и среда разработчика',
    title: 'Урок 7: Ввод, вывод и преобразование типов',
    type: 'terminal',
    description: 'CSTA 2-AP-12, UK KS3, ACARA ACTDIP025, KZ Инф 6.3.2.1 / 6.3.3.1: Функция input() всегда возвращает str. Явное приведение типов: int(input()), float(), f-строки.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-teal-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0 font-mono text-teal-300">
            ⌨️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              Ввод данных с консоли и Type Casting
            </h3>
            <p class="text-xs text-slate-300">
              Функция <code class="text-yellow-300 font-mono">input()</code> считывает текст от пользователя. Чтобы выполнять сложение чисел, нужно преобразовать строку в число: <code class="text-emerald-300 font-mono">age = int(input())</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: '# Преобразуй строковый ввод в число и вычисли возраст через 5 лет\ncurrent_age = int("13")\nfuture_age = current_age + 5\nprint(f"Через 5 лет мне будет: {future_age}")',
    terminalOutput: '> Через 5 лет мне будет: 18\n> Execution completed successfully.'
  },
  {
    id: 'g7_l08',
    courseId: 'course_grade7',
    module: 'Блок 1: Введение в Python и среда разработчика',
    title: 'Урок 8: Мини-проект по основам — конструктор личного профиля',
    type: 'terminal',
    description: 'CSTA 2-AP-15, 2-AP-17, UK KS3, ACARA ACTDIP027, ACTDIP030, KZ Инф 6.3.2.1 / 8.3.1.1: Создание интерактивной карточки профиля инженера с f-строками и валидацией данных.',
    difficulty: 'Легенда',
    xpReward: 120,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            🏆
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Мини-проект 1: Личная карточка инженера CyberNet
            </h3>
            <p class="text-xs text-slate-300">
              Объедини полученные знания: переменные, типизацию, f-строки и форматированный консольный интерфейс.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'name = "Алекс"\ngrade = 7\nspecialty = "Cybersecurity"\nxp = 1250\nprint("=" * 30)\nprint(f"ID КАРТА: {name.upper()}")\nprint(f"Класс: {grade} | Направление: {specialty}")\nprint(f"Баланс опыта: {xp} XP")\nprint("=" * 30)',
    terminalOutput: '> ==============================\n> ID КАРТА: АЛЕКС\n> Класс: 7 | Направление: Cybersecurity\n> Баланс опыта: 1250 XP\n> =============================='
  }
];
