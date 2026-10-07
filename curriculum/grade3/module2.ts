import { Task } from '../../types';

export const MODULE2_TASKS: Task[] = [
  {
    id: 'g3_m2_l1',
    courseId: 'course_grade3',
    module: 'Модуль 2: Как устроен компьютер и двоичный код',
    title: 'Урок 1: Процессор (CPU): Главный мозг компьютера',
    type: 'quiz',
    description: 'Что делает маленький кремниевый чип в центре материнской платы? Узнай, как процессор считает миллиарды операций в секунду!',
    difficulty: 'Новичок',
    xpReward: 80,
    currencyReward: 20,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-yellow-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🧠
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Процессор (CPU — Central Processing Unit)
            </h3>
            <p class="text-xs text-slate-300">
              Это самый главный вычислитель в компьютере, телефоне и игровой приставке!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-yellow-500/40 rounded-xl space-y-2 text-xs">
          <div class="text-yellow-300 font-bold">Обязанности процессора:</div>
          <ul class="list-disc list-inside space-y-1 text-slate-300 text-[11px] pl-1">
            <li>Выполняет команды программ: сложить числа, подвинуть персонажа, проверить нажатие мышки.</li>
            <li>Работает с бешеной скоростью: совершает до нескольких <strong>миллиардов операций в секунду</strong> (гигагерцы — ГГц).</li>
            <li>Очень сильно греется, поэтому сверху на него всегда ставят радиатор и вентилятор (кулер)!</li>
          </ul>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какая деталь компьютера выполняет команды программы: вычисляет и сравнивает значения?',
      options: [
        'Процессор (CPU)',
        'Оперативная память (ОЗУ)',
        'Жёсткий диск (SSD)',
        'Блок питания'
      ],
      correctIndex: 0,
      explanation: 'Процессор — это мозг компьютера. Именно он производит все математические и логические вычисления!'
    }
  },
  {
    id: 'g3_m2_l2',
    courseId: 'course_grade3',
    module: 'Модуль 2: Как устроен компьютер и двоичный код',
    title: 'Урок 2: Память компьютера: ОЗУ против Жесткого диска (SSD)',
    type: 'quiz',
    description: 'Почему при выключении компьютера данные из оперативной памяти стираются, а на диске остаются навсегда?',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border border-blue-500/40 rounded-xl">
          <h4 class="font-bold text-blue-300 text-sm mb-1">⚡ Оперативная память (ОЗУ / RAM) vs Жесткий диск (SSD)</h4>
          <p>У компьютера есть два совершенно разных типа памяти: быстрая временная и долговечная постоянная.</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
          <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-1">
            <div class="text-cyan-300 font-bold">⚡ ОЗУ (Быстрый блокнот):</div>
            <p class="text-slate-300">
              Хранит данные тех программ, которые открыты прямо сейчас. Сверхбыстрая! Но если выключить питание — всё мгновенно стирается (энергозависимая память).
            </p>
          </div>
          <div class="p-3 bg-slate-900 border border-emerald-500/40 rounded-xl space-y-1">
            <div class="text-emerald-300 font-bold">🗄️ Жесткий диск / SSD (Шкаф):</div>
            <p class="text-slate-300">
              Хранит игры, фото, фильмы и ОС годами. Работает медленнее ОЗУ, но файлы не пропадают при выключении питания.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что произойдет с данными в оперативной памяти (ОЗУ), если выключить компьютер из розетки?',
      options: [
        'Сотрутся: ОЗУ работает только под током',
        'Сохранятся, как файлы на диске',
        'Автоматически скопируются на флешку',
        'Сохранятся, но откроются с ошибкой'
      ],
      correctIndex: 0,
      explanation: 'Оперативная память (RAM) энергозависима: она помнит открытые программы только до тех пор, пока есть электричество!'
    }
  },
  {
    id: 'g3_m2_l3',
    courseId: 'course_grade3',
    module: 'Модуль 2: Как устроен компьютер и двоичный код',
    title: 'Урок 3: Устройства ввода и вывода: Глаза, уши и голос ПК',
    type: 'quiz',
    description: 'Как компьютер общается с внешним миром? Раздели клавиатуру, монитор, микрофон и колонки на вход и выход.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">🔌 Вход (Input) и Выход (Output)</h4>
          <p>Любая техника либо принимает информацию от человека, либо отдает её обратно человеку!</p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
          <div class="p-3 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-1">
            <div class="text-cyan-300 font-bold">📥 Устройства ВВОДА (Input):</div>
            <ul class="list-disc list-inside text-slate-300 space-y-0.5">
              <li>Клавиатура (ввод букв)</li>
              <li>Мышь (ввод движений и кликов)</li>
              <li>Микрофон (ввод голоса)</li>
              <li>Веб-камера (ввод видео)</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-900 border border-amber-500/40 rounded-xl space-y-1">
            <div class="text-amber-300 font-bold">📤 Устройства ВЫВОДА (Output):</div>
            <ul class="list-disc list-inside text-slate-300 space-y-0.5">
              <li>Монитор (вывод картинки)</li>
              <li>Колонки и наушники (вывод звука)</li>
              <li>Принтер (вывод на бумагу)</li>
            </ul>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое из перечисленных устройств относится к устройствам ВЫВОДА информации?',
      options: [
        'Монитор',
        'Клавиатура',
        'Компьютерная мышь',
        'Микрофон'
      ],
      correctIndex: 0,
      explanation: 'Монитор передает обработанную информацию из компьютера человеку, поэтому это устройство ВЫВОДА!'
    }
  },
  {
    id: 'g3_m2_l4',
    courseId: 'course_grade3',
    module: 'Модуль 2: Как устроен компьютер и двоичный код',
    title: 'Урок 4: Двоичный язык компьютеров: 0 и 1 (Есть ток / Нет тока)',
    type: 'quiz',
    description: 'Почему компьютер понимает только нолики и единицы? Познакомься с битом и транзисторами.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl">
          <h4 class="font-bold text-emerald-300 text-sm mb-1">💡 Компьютер — это миллиарды выключателей!</h4>
          <p>Внутри чипов нет букв или картинок, там бежит обычное электричество. Провод может находиться только в двух состояниях:</p>
        </div>

        <div class="grid grid-cols-2 gap-3 text-center">
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl">
            <div class="text-2xl mb-1">⭕ 0</div>
            <div class="text-xs text-slate-400">Тока нет (Лампочка выключена)</div>
          </div>
          <div class="p-3 bg-slate-900 border border-yellow-500/50 rounded-xl">
            <div class="text-2xl mb-1 text-yellow-300">💡 1</div>
            <div class="text-xs text-yellow-200">Ток есть (Лампочка горит!)</div>
          </div>
        </div>

        <p class="text-slate-300 text-[11px]">
          Один такой переключатель называется <strong>БИТ (bit)</strong> — это самая маленькая неделимая единица информации во всей Вселенной!
        </p>
      </div>
    `,
    quizData: {
      "question": "В нашей двоичной модели лампочка включена или выключена. Как записывается включённое состояние?",
      "options": [
            "Цифрой 1",
            "Цифрой 0",
            "Цифрой 2",
            "Цифрой 8"
      ],
      "correctIndex": 0,
      "explanation": "Мы договорились обозначать включённое состояние единицей, выключённое — нулём. Бит имеет два значения."
}
  },
  {
    id: 'g3_m2_l5',
    courseId: 'course_grade3',
    module: 'Модуль 2: Как устроен компьютер и двоичный код',
    title: 'Урок 5: Двоичные лампочки: Веса 8-4-2-1',
    type: 'binary_switches',
    description: 'Управляй битами! Включай лампочки с весами 8, 4, 2, 1 и складывай числа 3, 5, 9, 12 и 15.',
    difficulty: 'Хакер',
    xpReward: 120,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-amber-950/80 border border-yellow-400/50 rounded-xl">
          <h4 class="font-bold text-yellow-300 text-sm mb-1">✨ Степени двойки: 8, 4, 2, 1</h4>
          <p>В двоичной системе каждая следующая позиция слева в 2 раза тяжелее предыдущей!</p>
        </div>

        <div class="grid grid-cols-4 gap-2 text-center font-mono font-bold text-sm">
          <div class="p-2 bg-yellow-950/50 border border-yellow-500 rounded-lg text-yellow-300">
            <div>8</div>
            <div class="text-[10px] text-slate-400">Лампа #4</div>
          </div>
          <div class="p-2 bg-yellow-950/50 border border-yellow-500 rounded-lg text-yellow-300">
            <div>4</div>
            <div class="text-[10px] text-slate-400">Лампа #3</div>
          </div>
          <div class="p-2 bg-yellow-950/50 border border-yellow-500 rounded-lg text-yellow-300">
            <div>2</div>
            <div class="text-[10px] text-slate-400">Лампа #2</div>
          </div>
          <div class="p-2 bg-yellow-950/50 border border-yellow-500 rounded-lg text-yellow-300">
            <div>1</div>
            <div class="text-[10px] text-slate-400">Лампа #1</div>
          </div>
        </div>

        <div class="p-2.5 bg-yellow-950/30 border border-yellow-500/30 rounded-lg text-yellow-200">
          🎯 Чтобы получить число 5, включи 4 и 1 (4 + 1 = 5). Код: 0101!
        </div>
      </div>
    `
  },
  {
    id: 'g3_m2_l6',
    courseId: 'course_grade3',
    module: 'Модуль 2: Как устроен компьютер и двоичный код',
    title: 'Урок 6: Измерение информации: Бит, Байт, Килобайт и Мегабайт',
    type: 'quiz',
    description: 'Сколько букв помещается в 1 Байте? Почему 1 Байт равен 8 Битам? Изучаем единицы информации.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-pink-950/80 border border-purple-400/50 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">⚖️ Таблица весов цифрового мира</h4>
          <p>Как граммы складываются в килограммы, так биты складываются в байты:</p>
        </div>

        <div class="space-y-1.5 text-[11px]">
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg flex justify-between">
            <span class="text-cyan-300 font-bold">1 Бит (bit)</span>
            <span class="text-slate-400">Один 0 или одна 1</span>
          </div>
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg flex justify-between">
            <span class="text-yellow-300 font-bold">1 Байт (Byte) = 8 Бит</span>
            <span class="text-slate-400">Ровно 1 символ (буква «Я»)</span>
          </div>
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg flex justify-between">
            <span class="text-emerald-300 font-bold">1 Килобайт (КБ) ≈ 1000 Байт</span>
            <span class="text-slate-400">Страница текста</span>
          </div>
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg flex justify-between">
            <span class="text-pink-300 font-bold">1 Мегабайт (МБ) ≈ 1000 КБ</span>
            <span class="text-slate-400">1 фотография или песня</span>
          </div>
          <div class="p-2 bg-slate-900 border border-slate-700 rounded-lg flex justify-between">
            <span class="text-purple-300 font-bold">1 Гигабайт (ГБ) ≈ 1000 МБ</span>
            <span class="text-slate-400">Фильм или игра</span>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Один байт состоит из 8 бит. Сколько бит в двух байтах?',
      options: [
        '16 бит',
        '8 бит',
        '2 бита',
        '10 бит'
      ],
      correctIndex: 0,
      explanation: 'В одном байте 8 бит. В двух байтах: 2 × 8 = 16 бит. Размер буквы зависит от кодировки.'
    }
  },
  {
    id: 'g3_m2_l7',
    courseId: 'course_grade3',
    module: 'Модуль 2: Как устроен компьютер и двоичный код',
    title: 'Урок 7: Экзамен модуля: Архитектура ПК и двоичный мир',
    type: 'quiz',
    description: 'Большой тест по железу ПК, процессору, памяти, устройствам ввода-вывода и битам!',
    difficulty: 'Хакер',
    xpReward: 120,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-amber-950/80 border border-yellow-500/50 rounded-xl">
          <h4 class="font-bold text-yellow-300 text-sm mb-1">🏁 Финишная прямая Модуля 2</h4>
          <p>Ты изучил процессор, память ОЗУ и SSD, устройства ввода-вывода, двоичный код и единицы информации. Покажи свои знания!</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какое максимальное десятичное число можно показать с помощью 4 двоичных бит (1111)?',
      options: [
        '15',
        '16',
        '8',
        '4'
      ],
      correctIndex: 0,
      explanation: 'Сложив веса всех четырех бит (8 + 4 + 2 + 1), получаем ровно 15!'
    }
  }
];
