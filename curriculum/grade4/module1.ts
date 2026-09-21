import { Task } from '../../types';

export const MODULE1_TASKS: Task[] = [
  {
    id: 'g4_l1',
    courseId: 'course_grade4',
    module: 'Модуль 1: Цифровая среда, файлы и двоичный код',
    title: 'Урок 1: Добро пожаловать в 4 класс и навыки работы с документами',
    type: 'file_organizer',
    description: 'Стандарты: CSTA 1B-CS-01 · UK KS2 · ACARA AC9TDI4P03 · ABEGS · KZ ЦГ 3.2.1.2 · KZ Инф 5.2.2.1. Организуй рабочие файлы и документы школьного проекта по категориям.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📁
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Добро пожаловать в 4 класс!
            </h3>
            <p class="text-xs text-slate-300">
              В 4 классе мы научимся профессионально работать с цифровыми документами, создавать игры, управлять сетями и алгоритмами!
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-indigo-400 font-bold">📂 Иерархия папок</span>
            <p class="text-slate-400 text-[11px]">
              Документы (.docx, .pdf), презентации (.pptx) и таблицы (.xlsx) должны храниться в структурированных папках, а не на рабочем столе.
            </p>
          </div>
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-emerald-400 font-bold">🏷️ Правильные имена файлов</span>
            <p class="text-slate-400 text-[11px]">
              Называй файлы осмысленно: <code class="text-emerald-300 font-mono">Проект_Роботы_v1.docx</code> вместо <code class="text-red-400 font-mono">документ1.docx</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    fileConfig: {
      files: [
        { id: 'f1', name: 'Доклад_Природа.docx', type: 'doc', targetFolder: 'Документы' },
        { id: 'f2', name: 'Слайды_Космос.pptx', type: 'presentation', targetFolder: 'Презентации' },
        { id: 'f3', name: 'Таблица_Оценки.xlsx', type: 'table', targetFolder: 'Таблицы' },
        { id: 'f4', name: 'Фото_Класс.png', type: 'image', targetFolder: 'Медиа' }
      ],
      folders: ['Документы', 'Презентации', 'Таблицы', 'Медиа']
    }
  },
  {
    id: 'g4_l2',
    courseId: 'course_grade4',
    module: 'Модуль 1: Цифровая среда, файлы и двоичный код',
    title: 'Урок 2: Мастерство печати и устройство компьютера',
    type: 'typing',
    description: 'Стандарты: CSTA 1B-CS-01, 1B-CS-02 · UK KS2 · ACARA AC9TDI6K01 · ABEGS · KZ ЦГ 2.2.4.1. Освой десятипальцевый ввод и вспомни роль CPU, RAM и накопителя.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            ⌨️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Архитектура ПК и скорость печати
            </h3>
            <p class="text-xs text-slate-300">
              Процессор (CPU) исполняет команды, память (RAM) хранит текущую программу, а клавиатура передает нажатия клавиш в цифровые коды.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <span class="text-emerald-400 font-bold">Совет по печати:</span>
          <p class="text-slate-400 text-[11px]">
            Держи указательные пальцы на клавишах с засечками: <b>А</b> и <b>О</b> (или <b>F</b> и <b>J</b>). Печатай не глядя на клавиатуру!
          </p>
        </div>
      </div>
    `,
    typingConfig: {
      targetText: 'CPU и RAM работают вместе быстро и четко',
      allowedMistakes: 2
    },
    typingData: {
      text: 'CPU и RAM работают вместе быстро и четко',
      targetWPM: 20
    }
  },
  {
    id: 'g4_l3',
    courseId: 'course_grade4',
    module: 'Модуль 1: Цифровая среда, файлы и двоичный код',
    title: 'Урок 3: Двоичная математика и размеры файлов',
    type: 'binary_switches',
    description: 'Стандарты: CSTA 1B-DA-07 · ACARA AC9TDI4K01, AC9TDI4K03 · UK KS2 · KZ Инф 5.2.1.4. Собери число из битов и узнай, сколько килобайт в мегабайте.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Биты, байты и степени двойки
            </h3>
            <p class="text-xs text-slate-300">
              1 Байт = 8 бит. 1 Килобайт (КБ) = 1024 байта. 1 Мегабайт (МБ) = 1024 КБ. Каждый бит удваивает значение: 1, 2, 4, 8, 16, 32, 64, 128.
            </p>
          </div>
        </div>
      </div>
    `,
    binaryConfig: {
      targetNumber: 13,
      bitsCount: 4
    }
  },
  {
    id: 'g4_l4',
    courseId: 'course_grade4',
    module: 'Модуль 1: Цифровая среда, файлы и двоичный код',
    title: 'Урок 4: Кодирование и сжатие данных',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-DA-06 · ACARA AC9TDI4P01 · UK KS2 · KZ Инф 5.2.1.3. Как компьютеры кодируют текст, картинки и сжимают их без потерь (RLE-сжатие).',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            📦
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Алгоритмы сжатия (RLE)
            </h3>
            <p class="text-xs text-slate-300">
              Если строка содержит «АААААБББ», мы можем сжать её до «5А3Б». Это экономит память на диске и ускоряет передачу по сети!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как сжатие методом RLE запишет последовательность символов «БББББВВ»?',
      options: [
        '5Б2В',
        'Б5В2',
        '7БВ',
        '2В5Б'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Сжатие RLE считает идущие подряд одинаковые символы: 5 букв Б и 2 буквы В превращаются в 5Б2В.'
    }
  },
  {
    id: 'g4_l5',
    courseId: 'course_grade4',
    module: 'Модуль 1: Цифровая среда, файлы и двоичный код',
    title: 'Урок 5: Испытание: двоичный код и данные',
    type: 'binary_switches',
    description: 'Стандарты: CSTA 1B-DA-06 · KZ Инф 5.2.1.3 · KZ Инф 7.2.1.1. Финальное испытание первого модуля: расшифруй бинарное число для открытия кибер-шлюза.',
    difficulty: 'Хакер',
    xpReward: 120,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-orange-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0">
            🏆
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Испытание модуля
            </h3>
            <p class="text-xs text-slate-300">
              Примени все знания о битах (веса: 16, 8, 4, 2, 1), чтобы собрать нужное кодовое число и разблокировать следующий модуль!
            </p>
          </div>
        </div>
      </div>
    `,
    binaryConfig: {
      targetNumber: 25,
      bitsCount: 5
    }
  }
];
