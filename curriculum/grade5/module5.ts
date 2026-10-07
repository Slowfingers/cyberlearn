import { Task } from '../../types';

export const MODULE5_TASKS: Task[] = [
  {
    id: 'g5_l19',
    courseId: 'course_grade5',
    module: 'Блок 5: Системы счисления (HEX, RGB), Сжатие и Таблицы',
    title: 'Урок 19: Повторение двоичной системы и шестнадцатеричная система',
    type: 'binary_bulbs',
    description: 'Вспомни степени двойки (1, 2, 4, 8) и познакомься с шестнадцатеричной системой (HEX): почему один байт записывается всего двумя цифрами от 0 до FF!',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔢
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Шестнадцатеричная система счисления (HEX)
            </h3>
            <p class="text-xs text-slate-300">
              В двоичной системе числа очень длинные: <code class="text-yellow-300 font-mono">11111111</code>. В шестнадцатеричной системе это же число записывается кратко: <code class="text-emerald-300 font-mono">#FF</code>!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-2">
          <div class="font-bold text-indigo-400">Алфавит HEX (основание 16):</div>
          <p class="text-slate-300 text-[11px]">
            Цифры от 0 до 9, а затем буквы: <strong class="text-cyan-300">A=10, B=11, C=12, D=13, E=14, F=15</strong>. Ровно 4 бита (тетрада) превращаются в один HEX-символ!
          </p>
        </div>
      </div>
    `
  },
  {
    id: 'g5_l20',
    courseId: 'course_grade5',
    module: 'Блок 5: Системы счисления (HEX, RGB), Сжатие и Таблицы',
    title: 'Урок 20: Цвета RGB и форматы файлов',
    type: 'quiz',
    description: 'Цветовая модель RGB: красный, зеленый и синий каналы от 0 до 255, кодировка HEX (#FF0000) и различия между PNG, JPG и SVG.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Цветовая модель RGB (Red, Green, Blue)
            </h3>
            <p class="text-xs text-slate-300">
              Каждый пиксель на экране светится тремя микро-лампами. Смешение максимальной яркости дает чистый белый: <code class="text-white font-mono">#FFFFFF = rgb(255, 255, 255)</code>!
            </p>
          </div>
        </div>

        <div class="grid grid-cols-3 gap-2 text-xs font-mono text-center">
          <div class="p-2 bg-red-950/60 border border-red-500 rounded text-red-300 font-bold">#FF0000 Красный</div>
          <div class="p-2 bg-green-950/60 border border-green-500 rounded text-green-300 font-bold">#00FF00 Зеленый</div>
          <div class="p-2 bg-blue-950/60 border border-blue-500 rounded text-blue-300 font-bold">#0000FF Синий</div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой графический формат файлов сохраняет векторные линии математическими формулами и не теряет четкость при любом увеличении?',
      options: [
        'SVG',
        'JPEG',
        'BMP',
        'GIF'
      ],
      correctIndex: 0,
      explanation: 'SVG поддерживает описание векторных линий и кривых, которые масштабируются без пиксельной сетки. Встроенные растровые картинки в SVG такой способности не получают.'
    }
  },
  {
    id: 'g5_l21',
    courseId: 'course_grade5',
    module: 'Блок 5: Системы счисления (HEX, RGB), Сжатие и Таблицы',
    title: 'Урок 21: Сжатие данных и итоговое испытание по данным',
    type: 'quiz',
    description: 'Алгоритмы сжатия без потерь (Lossless: RLE, ZIP) против сжатия с потерями (Lossy: MP3, JPEG для фото и видео).',
    difficulty: 'Хакер',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🗜️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Сжатие без потерь: Алгоритм RLE (Run-Length Encoding)
            </h3>
            <p class="text-xs text-slate-300">
              Строка «WWWWWBBAAAAA» превращается в короткую запись <code class="text-yellow-300 font-mono">5W2B5A</code>. Ни один пиксель или байт не потерян!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-emerald-400 font-bold">Сжатие с потерями (Lossy):</div>
          <p class="text-slate-300 text-[11px]">
            Человеческий глаз не замечает микроскопической разницы между оттенками синего на небе. JPEG удаляет незаметные детали, уменьшая вес фото в 10 раз!
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой тип сжатия данных ОБЯЗАТЕЛЕН при архивации программного кода или текстовых документов?',
      options: [
        'Без потерь (lossless, как в ZIP)',
        'С потерями (lossy, как в JPEG)',
        'С удалением каждого третьего слова',
        'С заменой повторов на случайные знаки'
      ],
      correctIndex: 0,
      explanation: 'В тексте и исходном коде программ каждая точка или скобка критически важна, поэтому используется строго сжатие без потерь.'
    }
  },
  {
    id: 'g5_l22',
    courseId: 'course_grade5',
    module: 'Блок 5: Системы счисления (HEX, RGB), Сжатие и Таблицы',
    title: 'Урок 22: Основы электронных таблиц и формулы',
    type: 'spreadsheet',
    description: 'Табличный процессор: адреса ячеек (A1, B2), автоматический расчет сумм с помощью формулы =SUM(D2:D4).',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Электронные таблицы: Вычисления на автомате
            </h3>
            <p class="text-xs text-slate-300">
              Любая формула в таблице начинается со знака «=». Чтобы сложить числа в столбце D со 2 по 4 строку, пишем <code class="text-yellow-300 font-mono">=SUM(D2:D4)</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    spreadsheetConfig: {
      tableData: [
        { id: '1', name: 'Процессор i5', val1: 1, val2: 12000, formulaResult: 12000 },
        { id: '2', name: 'Оперативная память 16GB', val1: 2, val2: 4000, formulaResult: 8000 },
        { id: '3', name: 'SSD накопитель 1TB', val1: 1, val2: 6000, formulaResult: 6000 }
      ],
      targetFormula: '=SUM(D2:D4)',
      formulaType: 'sum'
    }
  },
  {
    id: 'g5_l23',
    courseId: 'course_grade5',
    module: 'Блок 5: Системы счисления (HEX, RGB), Сжатие и Таблицы',
    title: 'Урок 23: Функции и диаграммы из данных',
    type: 'spreadsheet',
    description: 'Логические условия в таблицах: автоматическая проверка оценок с помощью формулы =IF(B2>=60; "ЗАЧЕТ"; "НЕЗАЧЕТ").',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📈
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Функция =IF (ЕСЛИ) в электронных таблицах
            </h3>
            <p class="text-xs text-slate-300">
              Синтаксис: <code class="text-yellow-300 font-mono">=IF(условие; значение_если_истина; значение_если_ложь)</code>. Таблица сама принимает решения за долю секунды!
            </p>
          </div>
        </div>
      </div>
    `,
    spreadsheetConfig: {
      tableData: [
        { id: '1', name: 'Алиса (Тест по коду)', val1: 85, val2: 100, formulaResult: 'ЗАЧЕТ' },
        { id: '2', name: 'Максим (Тест по сетям)', val1: 45, val2: 100, formulaResult: 'НЕЗАЧЕТ' },
        { id: '3', name: 'Данияр (Тест по логике)', val1: 90, val2: 100, formulaResult: 'ЗАЧЕТ' }
      ],
      targetFormula: '=IF(B2>=60; "ЗАЧЕТ"; "НЕЗАЧЕТ")',
      formulaType: 'if'
    }
  },
  {
    id: 'g5_l24',
    courseId: 'course_grade5',
    module: 'Блок 5: Системы счисления (HEX, RGB), Сжатие и Таблицы',
    title: 'Урок 24: Проект по анализу реальных данных',
    type: 'spreadsheet',
    description: 'Инженерный проект: обработка статистики школьной метеостанции, вычисление среднего значения и поиск пиковых температур.',
    difficulty: 'Элита',
    xpReward: 120,
    currencyReward: 45,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-emerald-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🌡️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Data Science в 5 классе: Анализ датчиков
            </h3>
            <p class="text-xs text-slate-300">
              В реальной науке данные собираются сенсорами каждые 10 секунд. Формулы <code class="text-yellow-300 font-mono">=AVERAGE()</code>, <code class="text-cyan-300 font-mono">=MAX()</code> и <code class="text-purple-300 font-mono">=MIN()</code> мгновенно выявляют закономерности климата.
            </p>
          </div>
        </div>
      </div>
    `,
    spreadsheetConfig: {
      tableData: [
        { id: '1', name: 'Датчик 1 (Северный фасад)', val1: 18, val2: 24, formulaResult: 42 },
        { id: '2', name: 'Датчик 2 (Южная теплица)', val1: 22, val2: 28, formulaResult: 50 },
        { id: '3', name: 'Датчик 3 (Школьный двор)', val1: 16, val2: 20, formulaResult: 36 }
      ],
      targetFormula: '=SUM(D2:D4)',
      formulaType: 'sum'
    }
  }
];
