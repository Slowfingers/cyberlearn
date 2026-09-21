import { Task } from '../../types';

export const MODULE2_TASKS: Task[] = [
  {
    id: 'g6_m2_l1',
    courseId: 'course_grade6',
    module: 'Блок 2: Таблицы, Данные и Аналитика',
    title: 'Урок 1: Анатомия электронных таблиц: Координаты и знак равенства',
    type: 'quiz',
    description: 'Как табличные процессоры (Excel, Google Таблицы) рассчитывают миллионы операций: сетка ячеек, адресация и математический режим.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Электронные таблицы — вычислительный двигатель бизнеса
            </h3>
            <p class="text-xs text-slate-300">
              Таблицы оперируют двумерной матрицей: столбцы обозначаются латинскими буквами (A, B, C...), а строки — числами (1, 2, 3...).
            </p>
          </div>
        </div>

        <div class="p-3.5 bg-slate-900 border border-emerald-500/40 rounded-xl space-y-2 text-xs">
          <div class="font-bold text-yellow-300 flex items-center gap-1.5">
            <span>🔑</span> Фундаментальное правило формул:
          </div>
          <p class="text-slate-200 leading-relaxed">
            Если ты напишешь в ячейке <code class="bg-black/60 px-2 py-0.5 rounded text-cyan-300 font-mono">10+5</code>, таблица отобразит просто текст «10+5». Но если перед выражением поставить знак равенства <code class="bg-black/60 px-2 py-0.5 rounded text-yellow-400 font-mono font-bold">=10+5</code>, процессор мгновенно вычислит математический результат: <strong>15</strong>!
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-cyan-400 font-bold font-mono text-sm">A1:B10</span>
            <p class="text-slate-300">
              <strong>Диапазон ячеек:</strong> Прямоугольная область ячеек от верхнего левого угла (A1) до нижнего правого угла (B10).
            </p>
          </div>
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-emerald-400 font-bold font-mono text-sm">=SUM(C2:C20)</span>
            <p class="text-slate-300">
              <strong>Встроенная функция:</strong> Складывает все числовые значения в столбце C от 2-й до 20-й строки включительно.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'С какого символа в электронных таблицах ВСЕГДА должна начинаться любая формула или расчетное выражение?',
      options: [
        'Со знака =',
        'Со знака #',
        'Со знака /',
        'Со знака @'
      ],
      correctIndex: 0,
      explanation: 'Знак "=" переключает ячейку из режима отображения сырого текста в режим динамического вычисления формулы.'
    }
  },
  {
    id: 'g6_m2_sheets_sum',
    courseId: 'course_grade6',
    module: 'Блок 2: Таблицы, Данные и Аналитика',
    title: 'Урок 2: Расчет сметы миссии через формулу диапазона =SUM(D2:D4)',
    type: 'spreadsheet',
    description: 'Интерактивная таблица: выдели целевую ячейку и введи формулу сложения диапазона =SUM(D2:D4), чтобы рассчитать общие расходы.',
    difficulty: 'Новичок',
    xpReward: 120,
    currencyReward: 45,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🧮
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Функция SUM / СУММ: Масштабируемые подсчеты
            </h3>
            <p class="text-xs text-slate-300">
              Складывать ячейки вручную через знак плюс (<code class="font-mono text-yellow-300">=D2+D3+D4</code>) долго и неудобно, если строк тысячи. Диапазоны решают эту проблему в 1 строчку!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl text-xs space-y-2">
          <div class="font-bold text-cyan-400">Формат записи:</div>
          <div class="p-2.5 bg-black/60 rounded font-mono text-yellow-400 font-bold text-sm">
            =SUM(D2:D4)
          </div>
          <p class="text-slate-300 text-[11px] leading-relaxed">
            Двоеточие <code class="text-cyan-300 font-mono">:</code> обозначает непрерывный интервал между первой и последней ячейкой.
          </p>
        </div>
      </div>
    `,
    spreadsheetConfig: {
      formulaType: 'sum',
      targetFormula: '=SUM(D2:D4)',
      tableData: []
    }
  },
  {
    id: 'g6_m2_l2',
    courseId: 'course_grade6',
    module: 'Блок 2: Таблицы, Данные и Аналитика',
    title: 'Урок 3: Логические ветвления: Умная функция =IF(условие; да; нет)',
    type: 'quiz',
    description: 'Узнай, как заставить электронную таблицу самостоятельно принимать решения на основе данных с помощью функции IF (ЕСЛИ).',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🚦
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Логика IF (ЕСЛИ) в анализе больших данных
            </h3>
            <p class="text-xs text-slate-300">
              Функция <code>IF</code> проверяет условие. Если оно истинно (True), вычисляется одно значение, если ложно (False) — другое.
            </p>
          </div>
        </div>

        <div class="bg-black/80 p-4 border border-purple-500/40 rounded-xl space-y-2 text-xs font-mono">
          <div class="text-yellow-400 font-bold text-sm">
            =IF( условие ; значение_если_ДА ; значение_если_НЕТ )
          </div>
          <div class="text-slate-300 leading-relaxed font-sans text-xs">
            Пример для школы:<br/>
            <code class="text-emerald-400 font-mono">=IF(B2 >= 60; "СДАЛ"; "ПЕРЕСДАЧА")</code><br/>
            Если ученик набрал 60 баллов или больше — в графу результата пишется "СДАЛ", иначе — "ПЕРЕСДАЧА".
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что выведет формула =IF(A1 > 50; "Победа"; "Поражение"), если в ячейке A1 находится число 75?',
      options: [
        'Победа',
        'Поражение',
        '75',
        '#VALUE!'
      ],
      correctIndex: 0,
      explanation: '75 строго больше 50 (условие True), поэтому функция IF возвращает первое значение — "Победа".'
    }
  },
  {
    id: 'g6_m2_sheets_if',
    courseId: 'course_grade6',
    module: 'Блок 2: Таблицы, Данные и Аналитика',
    title: 'Урок 4: Автоматический классификатор результатов через формулу IF',
    type: 'spreadsheet',
    description: 'Примени логическую формулу =IF(B2>=60; "СДАЛ"; "ПЕРЕСДАЧА") для автоматического вычисления статуса экзамена группы студентов!',
    difficulty: 'Хакер',
    xpReward: 140,
    currencyReward: 55,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-purple-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Практика: Роботизация выставления зачетов
            </h3>
            <p class="text-xs text-slate-300">
              В больших институтах и онлайн-сервисах тысячи студентов. Проверять каждого вручную слишком долго — аналитик настраивает формулу автопроверки!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1 font-mono">
          <div class="text-cyan-300 font-bold">Целевая формула:</div>
          <div class="p-2 bg-black/60 rounded text-yellow-400 font-bold">
            =IF(B2>=60; "СДАЛ"; "ПЕРЕСДАЧА")
          </div>
          <p class="text-slate-400 font-sans mt-1">
            Обрати внимание на точку с запятой и кавычки вокруг строковых значений.
          </p>
        </div>
      </div>
    `,
    spreadsheetConfig: {
      formulaType: 'if',
      targetFormula: '=IF(B2>=60; "СДАЛ"; "ПЕРЕСДАЧА")',
      tableData: []
    }
  },
  {
    id: 'g6_m2_quiz',
    courseId: 'course_grade6',
    module: 'Блок 2: Таблицы, Данные и Аналитика',
    title: 'Урок 5: Этика данных и визуализация: Ловушки манипуляций со шкалой',
    type: 'quiz',
    description: 'Инженерный фактчек графиков: как недобросовестные маркетологи искажают диаграммы и как инженер отличает правду от иллюзий.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-blue-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📉
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Этика инженера данных: Честные диаграммы
            </h3>
            <p class="text-xs text-slate-300">
              Один и тот же массив данных можно нарисовать так, чтобы вызвать панику, или так, чтобы показать объективную реальность.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-red-500/40 rounded-xl text-xs space-y-1.5">
          <div class="text-red-400 font-bold flex items-center gap-1.5">
            <span>⚠️</span> Усечение базовой линии (Truncated Y-Axis):
          </div>
          <p class="text-slate-300 leading-relaxed">
            Если столбик данных равен 96%, а соседний 98%, при шкале от 0% до 100% разница почти незаметна. Но если начать шкалу с 95%, столбик 98% будет казаться в 3 раза выше, чем 96%! Это популярный обман в рекламе.
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Аналитик построил столбчатую диаграмму, у которой шкала оси Y начинается не с 0, а с 95. К чему это приведет при визуализации данных?',
      options: [
        'Разница 96 и 98 покажется огромной',
        'Диаграмма станет круговой автоматически',
        'Формула =SUM() посчитает быстрее',
        'Таблица выдаст ошибку деления на ноль'
      ],
      correctIndex: 0,
      explanation: 'Правило честной инфографики: усечение шкалы заставляет крошечные колебания выглядеть гигантскими скачками.'
    }
  }
];
