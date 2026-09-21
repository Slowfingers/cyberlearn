import { Task } from '../../types';

export const MODULE8_TASKS: Task[] = [
  {
    id: 'g3_m8_l1',
    courseId: 'course_grade3',
    module: 'Модуль 8: Электронные таблицы и базы данных',
    title: 'Урок 1: Строки, столбцы и адрес ячейки в таблице',
    type: 'spreadsheet',
    description: 'Освой электронные таблицы! Узнай, как находить адрес ячейки по букве столбца и номеру строки.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Координаты ячейки в Excel
            </h3>
            <p class="text-xs text-slate-300">
              Таблица похожа на морской бой: столбец обозначается буквой (A, B, C, D), а строка — цифрой (1, 2, 3)!
            </p>
          </div>
        </div>
        <div class="p-2.5 bg-emerald-950/40 border border-emerald-500/30 rounded-lg text-xs text-emerald-200">
          🎯 Нажми на ячейку D5 и напиши формулу суммы <code>=SUM(D2:D4)</code>!
        </div>
      </div>
    `
  },
  {
    id: 'g3_m8_l2',
    courseId: 'course_grade3',
    module: 'Модуль 8: Электронные таблицы и базы данных',
    title: 'Урок 2: Знак «=» и формула автосуммы: =SUM(D2:D4)',
    type: 'spreadsheet',
    description: 'Пусть компьютер считает за тебя! Узнай, почему любая формула начинается со знака равно «=».',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-blue-950/80 border border-teal-500/40 rounded-xl">
          <h4 class="font-bold text-teal-300 text-sm mb-1">🧮 Знак РАВНО «=» включает калькулятор</h4>
          <p>Если написать «5+5», таблица сохранит это как простой текст. А если написать <code>=5+5</code> — таблица выдаст ответ 10!</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="font-mono text-emerald-400 font-bold">=SUM(D2:D4)</div>
          <p class="text-slate-300 text-[11px]">Складывает все ячейки от D2 до D4 через двоеточие.</p>
        </div>
      </div>
    `
  },
  {
    id: 'g3_m8_l3',
    courseId: 'course_grade3',
    module: 'Модуль 8: Электронные таблицы и базы данных',
    title: 'Урок 3: Диаграммы и графики: Наглядные данные',
    type: 'quiz',
    description: 'Зачем сухие цифры превращают в разноцветные столбики и круговые диаграммы? Узнай силу визуализации данных!',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-blue-950/60 border border-blue-500/40 rounded-xl">
          <h4 class="font-bold text-blue-300 text-sm mb-1">📈 Столбики и круги вместо скучных списков</h4>
          <p>Глаз человека моментально видит, какой столбик выше, не читая длинные ряды цифр.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg">
            <strong class="text-cyan-300">Столбчатая диаграмма:</strong> сравнение (кто собрал больше яблок).
          </div>
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg">
            <strong class="text-yellow-300">Круговая диаграмма:</strong> доли от целого пирога (сколько времени ушло на уроки, а сколько на сон).
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Для чего в электронных таблицах строят диаграммы и графики?',
      options: [
        'Чтобы быстро сравнить числа глазами',
        'Чтобы таблица занимала меньше места',
        'Чтобы формулы считались быстрее',
        'Чтобы данные нельзя было изменить'
      ],
      correctIndex: 0,
      explanation: 'Диаграммы визуализируют числовые данные, делая выводы быстрыми и очевидными!'
    }
  },
  {
    id: 'g3_m8_l4',
    courseId: 'course_grade3',
    module: 'Модуль 8: Электронные таблицы и базы данных',
    title: 'Урок 4: Сортировка данных: Алгоритм «Пузырек»',
    type: 'sorting',
    description: 'Упорядочи кристаллы от легкого к тяжелому! Сравнивай соседние элементы и меняй местами.',
    difficulty: 'Новичок',
    xpReward: 105,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-yellow-950/60 border border-yellow-500/40 rounded-xl">
          <h4 class="font-bold text-yellow-300 text-sm mb-1">🫧 Сортировка пузырьком (Bubble Sort)</h4>
          <p>Тяжелые элементы постепенно «тонут» вниз, а легкие «всплывают» наверх, как пузырьки в лимонаде!</p>
        </div>
        <div class="p-2.5 bg-yellow-950/40 border border-yellow-500/30 rounded-lg text-xs text-yellow-200">
          🎯 Нажимай шаг алгоритма и расставь ряд чисел по возрастанию!
        </div>
      </div>
    `,
    sortingConfig: {
      numbers: [15, 4, 22, 8, 3],
      algorithm: 'bubble'
    }
  },
  {
    id: 'g3_m8_l5',
    courseId: 'course_grade3',
    module: 'Модуль 8: Электронные таблицы и базы данных',
    title: 'Урок 5: Базы данных: Как хранить миллионы записей',
    type: 'quiz',
    description: 'Почему школьный журнал или интернет-магазин нельзя хранить в блокноте? Познакомься с базами данных.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-500/40 rounded-xl">
          <h4 class="font-bold text-blue-300 text-sm mb-1">🗄️ База Данных (Database)</h4>
          <p>Это надежный электронный шкаф, в котором хранятся карточки миллионов людей, товаров и заказов с мгновенным поиском за сотые доли секунды.</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'В чем главное преимущество базы данных перед обычным текстовым файлом?',
      options: [
        'Можно мгновенно найти нужную запись',
        'Она занимает меньше места на диске',
        'Её можно открыть в любом блокноте',
        'Её не нужно сохранять вручную'
      ],
      correctIndex: 0,
      explanation: 'Базы данных созданы для надежного хранения и молниеносного поиска среди огромных массивов информации!'
    }
  },
  {
    id: 'g3_m8_l6',
    courseId: 'course_grade3',
    module: 'Модуль 8: Электронные таблицы и базы данных',
    title: 'Урок 6: Первичный ключ (ID): Уникальный номер записи',
    type: 'quiz',
    description: 'Что делать, если в школе 5 мальчиков по имени Саша Иванов? Узнай, как уникальный ID решает путаницу.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">🏷️ Уникальный ключ ID (Identifier)</h4>
          <p>У каждого ученика, товара на складе и билета на самолет есть личный неповторимый номер ID.</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs">
          <p class="text-slate-300">Даже если имя и фамилия полностью совпадают, их ID строго разные (например, ID=101 и ID=102)!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Зачем в базах данных каждой записи присваивают персональный ID?',
      options: [
        'Чтобы различать записи с одинаковыми именами',
        'Чтобы записи шли строго по алфавиту',
        'Чтобы записи нельзя было удалить',
        'Чтобы знать, кто создал запись'
      ],
      correctIndex: 0,
      explanation: 'Уникальный ID гарантирует, что система никогда не перепутает тезок или одинаковые товары!'
    }
  },
  {
    id: 'g3_m8_l7',
    courseId: 'course_grade3',
    module: 'Модуль 8: Электронные таблицы и базы данных',
    title: 'Урок 7: Экзамен модуля: Аналитик данных и таблиц',
    type: 'quiz',
    description: 'Итоговый зачет по ячейкам, формулам, автосумме SUM, пузырьковой сортировке и базам данных!',
    difficulty: 'Хакер',
    xpReward: 130,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border border-emerald-500/50 rounded-xl">
          <h4 class="font-bold text-emerald-300 text-sm mb-1">📊 Финал Модуля 8</h4>
          <p>Ты освоил адресацию ячеек, научил компьютер считать по формулам и разобрался в архитектуре баз данных. Заверши модуль на отлично!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'С какого обязательного символа начинается любая формула в электронных таблицах?',
      options: [
        'Со знака =',
        'Со знака +',
        'С буквы f',
        'Со скобки ('
      ],
      correctIndex: 0,
      explanation: 'Знак "=" сообщает таблице: «Внимание, это формула, посчитай математический результат»!'
    }
  }
];
