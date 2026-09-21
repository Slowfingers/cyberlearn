import { Task } from '../../types';

export const MODULE1_TASKS: Task[] = [
  {
    id: 'g3_m1_l1',
    courseId: 'course_grade3',
    module: 'Модуль 1: Компьютер, файлы и клавиатура',
    title: 'Урок 1: Что такое файл и расширение файла',
    type: 'quiz',
    description: 'У каждого файла есть «Имя» и «Фамилия» — расширение. Узнай, как компьютер понимает, что внутри файла!',
    difficulty: 'Новичок',
    xpReward: 80,
    currencyReward: 20,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎓
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Как устроен файл и его «паспорт»?
            </h3>
            <p class="text-xs text-slate-300">
              У каждого человека есть имя и фамилия. У файлов в компьютере точно так же!
            </p>
          </div>
        </div>

        <div class="p-3.5 bg-slate-900/90 border border-slate-700 rounded-xl space-y-2 text-xs">
          <div class="flex items-center gap-2 font-bold text-yellow-300">
            <span>💡</span> Главное правило компьютера:
          </div>
          <p class="text-slate-200 leading-relaxed">
            Файл состоит из двух частей, разделённых точкой: <code class="px-2 py-0.5 bg-black/60 rounded text-cyan-300 font-mono font-bold text-sm">котик.png</code>
          </p>
          <ul class="list-disc list-inside space-y-1 text-slate-300 pl-1">
            <li><strong>Имя файла</strong> (<span class="text-cyan-300 font-mono">котик</span>) — придумываешь ты сам, чтобы помнить, что там внутри.</li>
            <li><strong>Расширение</strong> (<span class="text-yellow-400 font-mono font-bold">.png</span>) — 3-4 английские буквы после точки. Это тип файла! Они сообщают операционной системе, какой программой открывать этот файл.</li>
          </ul>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что указывает компьютеру, какой программой нужно открывать файл?',
      options: [
        'Расширение файла: буквы после точки',
        'Имя файла до точки',
        'Размер файла в килобайтах',
        'Дата создания файла'
      ],
      correctIndex: 0,
      explanation: 'Расширение файла (например, .png, .docx, .mp3) — это тип файла, по которому компьютер определяет нужную программу!'
    }
  },
  {
    id: 'g3_m1_l2',
    courseId: 'course_grade3',
    module: 'Модуль 1: Компьютер, файлы и клавиатура',
    title: 'Урок 2: Разложи файлы по папкам: Картинки, музыка, документы и вирусы',
    type: 'file_organizer',
    description: 'Наведи порядок на рабочем столе! Рассортируй файлы .png, .mp3, .docx и опасные .exe по полочкам.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="text-xs font-bold text-cyan-400 uppercase tracking-wider">
          Четыре главные папки и их расширения:
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5 text-xs">
          <div class="p-3 bg-blue-950/60 border border-blue-500/50 rounded-xl flex flex-col gap-1 shadow-sm">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🖼️</span>
              <strong class="text-blue-300 text-sm">Рисунки</strong>
            </div>
            <div class="flex gap-1 my-0.5">
              <span class="px-1.5 py-0.5 bg-blue-900 rounded font-mono font-bold text-cyan-300 text-[10px]">.png</span>
              <span class="px-1.5 py-0.5 bg-blue-900 rounded font-mono font-bold text-cyan-300 text-[10px]">.jpg</span>
            </div>
            <p class="text-[11px] text-slate-300 leading-tight">
              Картинки, обои, фото на камеру и рисунки.
            </p>
          </div>

          <div class="p-3 bg-purple-950/60 border border-purple-500/50 rounded-xl flex flex-col gap-1 shadow-sm">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🎵</span>
              <strong class="text-purple-300 text-sm">Музыка</strong>
            </div>
            <div class="flex gap-1 my-0.5">
              <span class="px-1.5 py-0.5 bg-purple-900 rounded font-mono font-bold text-purple-300 text-[10px]">.mp3</span>
              <span class="px-1.5 py-0.5 bg-purple-900 rounded font-mono font-bold text-purple-300 text-[10px]">.wav</span>
            </div>
            <p class="text-[11px] text-slate-300 leading-tight">
              Песни, звуковые эффекты для игр.
            </p>
          </div>

          <div class="p-3 bg-emerald-950/60 border border-emerald-500/50 rounded-xl flex flex-col gap-1 shadow-sm">
            <div class="flex items-center gap-2">
              <span class="text-2xl">📄</span>
              <strong class="text-emerald-300 text-sm">Документы</strong>
            </div>
            <div class="flex gap-1 my-0.5">
              <span class="px-1.5 py-0.5 bg-emerald-900 rounded font-mono font-bold text-emerald-300 text-[10px]">.docx</span>
              <span class="px-1.5 py-0.5 bg-emerald-900 rounded font-mono font-bold text-emerald-300 text-[10px]">.txt</span>
            </div>
            <p class="text-[11px] text-slate-300 leading-tight">
              Сочинения, доклады, заметки.
            </p>
          </div>

          <div class="p-3 bg-rose-950/60 border border-rose-500/50 rounded-xl flex flex-col gap-1 shadow-sm">
            <div class="flex items-center gap-2">
              <span class="text-2xl">🗑️</span>
              <strong class="text-rose-300 text-sm">Корзина</strong>
            </div>
            <div class="flex gap-1 my-0.5">
              <span class="px-1.5 py-0.5 bg-rose-900 rounded font-mono font-bold text-rose-300 text-[10px]">.exe</span>
              <span class="px-1.5 py-0.5 bg-rose-900 rounded font-mono font-bold text-rose-300 text-[10px]">.bat</span>
            </div>
            <p class="text-[11px] text-slate-300 leading-tight">
              Опасные программы и вирусы!
            </p>
          </div>
        </div>

        <div class="p-2.5 bg-cyan-950/40 border border-cyan-500/30 rounded-lg text-xs text-cyan-200">
          🎯 <strong>Задание:</strong> Посмотри на расширение файла и перетащи его в правильную папку!
        </div>
      </div>
    `
  },
  {
    id: 'g3_m1_l3',
    courseId: 'course_grade3',
    module: 'Модуль 1: Компьютер, файлы и клавиатура',
    title: 'Урок 3: Иерархия папок и файловое дерево',
    type: 'quiz',
    description: 'Узнай, как устроен жесткий диск и почему папки называют файловым деревом!',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded-xl">
          <h4 class="font-bold text-emerald-300 text-sm mb-1">🌳 Что такое иерархия и дерево папок?</h4>
          <p>Представь большой шкаф: в нем полки, на полках коробки, а внутри коробок лежат блокноты. В компьютере точно так же!</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-2">
          <div class="text-cyan-300 font-bold">Пример пути к файлу:</div>
          <div class="p-2 bg-black/60 rounded font-mono text-yellow-300 text-xs">
            C:\\Школа\\3 класс\\Информатика\\робот.png
          </div>
          <ul class="list-disc list-inside text-[11px] text-slate-300 space-y-1">
            <li><strong>C:</strong> — Главный диск компьютера (корень дерева).</li>
            <li><strong>Школа</strong> — главная папка.</li>
            <li><strong>3 класс</strong> — подпапка (папка внутри папки).</li>
            <li><strong>робот.png</strong> — сам файл на «листочке» дерева!</li>
          </ul>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как называется папка, которая находится внутри другой папки?',
      options: [
        'Подпапка (вложенная папка)',
        'Корневая папка диска',
        'Ярлык на рабочем столе',
        'Архив с файлами'
      ],
      correctIndex: 0,
      explanation: 'Папка внутри другой папки называется подпапкой или вложенной папкой. Это позволяет аккуратно раскладывать файлы!'
    }
  },
  {
    id: 'g3_m1_l4',
    courseId: 'course_grade3',
    module: 'Модуль 1: Компьютер, файлы и клавиатура',
    title: 'Урок 4: Домашний ряд клавиатуры: ФЫВА и ОЛДЖ',
    type: 'typing',
    description: 'Освой правильную посадку пальцев. Клавиши Ф-Ы-В-А для левой руки и О-Л-Д-Ж для правой руки!',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-purple-950/60 border border-purple-500/40 rounded-xl">
          <h4 class="font-bold text-purple-300 text-sm mb-1">⌨️ Домашний ряд: Исходная позиция</h4>
          <p>Настоящие программисты печатают всеми десятью пальцами вслепую! Основа — средний ряд клавиатуры.</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px]">
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl">
            <div class="text-cyan-400 font-bold mb-1">👈 Левая рука (Ф-Ы-В-А):</div>
            <ul class="space-y-1 text-slate-300">
              <li>Мизинец ➔ <code class="px-1 bg-black rounded text-cyan-300">Ф</code></li>
              <li>Безымянный ➔ <code class="px-1 bg-black rounded text-cyan-300">Ы</code></li>
              <li>Средний ➔ <code class="px-1 bg-black rounded text-cyan-300">В</code></li>
              <li>Указательный ➔ <code class="px-1 bg-black rounded text-yellow-300 font-bold">А</code> (бугорок!)</li>
            </ul>
          </div>
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl">
            <div class="text-yellow-400 font-bold mb-1">👉 Правая рука (О-Л-Д-Ж):</div>
            <ul class="space-y-1 text-slate-300">
              <li>Указательный ➔ <code class="px-1 bg-black rounded text-yellow-300 font-bold">О</code> (бугорок!)</li>
              <li>Средний ➔ <code class="px-1 bg-black rounded text-yellow-300">Л</code></li>
              <li>Безымянный ➔ <code class="px-1 bg-black rounded text-yellow-300">Д</code></li>
              <li>Мизинец ➔ <code class="px-1 bg-black rounded text-yellow-300">Ж</code></li>
            </ul>
          </div>
        </div>
        <div class="p-2.5 bg-yellow-950/40 border border-yellow-500/40 rounded-lg text-yellow-200">
          💡 Большие пальцы обеих рук всегда отдыхают на Пробеле!
        </div>
      </div>
    `,
    typingConfig: {
      targetText: 'ао фа ло ва да фала вода олжа',
      allowedMistakes: 3
    },
    typingData: {
      text: 'ао фа ло ва да фала вода олжа',
      targetWPM: 15
    }
  },
  {
    id: 'g3_m1_l5',
    courseId: 'course_grade3',
    module: 'Модуль 1: Компьютер, файлы и клавиатура',
    title: 'Урок 5: Верхний ряд клавиатуры и клавиша Shift',
    type: 'typing',
    description: 'Учимся дотягиваться пальцами до верхнего ряда букв и печатать заглавные буквы с помощью клавиши Shift!',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-blue-950/60 border border-blue-500/40 rounded-xl">
          <h4 class="font-bold text-blue-300 text-sm mb-1">🚀 Дотягивание и волшебный Shift</h4>
          <p>После каждого нажатия клавиши верхнего ряда палец <strong>сразу возвращается в свой домик</strong> на среднем ряду!</p>
        </div>
        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-pink-400 font-bold">Как сделать заглавную букву:</div>
          <p class="text-slate-300">
            Зажми мизинцем клавишу <code class="px-1.5 py-0.5 bg-black rounded text-yellow-300 font-bold">Shift</code> и нажми нужную букву. Получится БОЛЬШАЯ буква!
          </p>
        </div>
      </div>
    `,
    typingConfig: {
      targetText: 'Привет, робот! Мы пишем код.',
      allowedMistakes: 3
    },
    typingData: {
      text: 'Привет, робот! Мы пишем код.',
      targetWPM: 18
    }
  },
  {
    id: 'g3_m1_l6',
    courseId: 'course_grade3',
    module: 'Модуль 1: Компьютер, файлы и клавиатура',
    title: 'Урок 6: Корзина, ярлыки и безопасное извлечение флешки',
    type: 'quiz',
    description: 'В чем разница между файлом и ярлыком со стрелочкой? Как правильно вынимать флешку из разъема?',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-indigo-950/60 border border-indigo-500/40 rounded-xl">
          <h4 class="font-bold text-indigo-300 text-sm mb-1">🏷️ Ярлык — это указатель, а не файл!</h4>
          <p>Ярлык со стрелочкой похож на дорожный указатель «В музей ➔». Если сломать указатель, сам музей никуда не исчезнет!</p>
        </div>
        <div class="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-[11px]">
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg">
            <span class="text-base">🗑️</span>
            <div class="font-bold text-cyan-300 mt-1">Корзина:</div>
            <p class="text-slate-400">Удаленные файлы попадают сюда. Их можно вернуть обратно кнопкой «Восстановить».</p>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg">
            <span class="text-base">💾</span>
            <div class="font-bold text-emerald-300 mt-1">Безопасное извлечение флешки:</div>
            <p class="text-slate-400">Всегда нажимай значок флешки в трее, чтобы данные успели дозаписаться.</p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что произойдет, если удалить с Рабочего стола ярлык игры (со стрелочкой в углу)?',
      options: [
        'Удалится только ярлык, игра останется на диске',
        'Игра полностью удалится с компьютера',
        'Игра останется, но перестанет запускаться',
        'Удалятся сохранения, а игра останется'
      ],
      correctIndex: 0,
      explanation: 'Ярлык — это просто ссылка-указатель на игру. Удаление ярлыка не удаляет саму игру с компьютера!'
    }
  },
  {
    id: 'g3_m1_l7',
    courseId: 'course_grade3',
    module: 'Модуль 1: Компьютер, файлы и клавиатура',
    title: 'Урок 7: Экзамен модуля: Мастер файлов и клавиатуры',
    type: 'quiz',
    description: 'Итоговая проверка знаний по файлам, папкам, расширениям, Корзине и слепой печати!',
    difficulty: 'Хакер',
    xpReward: 130,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-3 text-xs text-slate-200">
        <div class="p-3 bg-gradient-to-r from-yellow-950/70 to-amber-950/70 border border-yellow-500/50 rounded-xl">
          <h4 class="font-bold text-yellow-300 text-sm mb-1">🏆 Главный зачет Модуля 1</h4>
          <p>Вспомни всё, чему научился: расширения файлов, домашний ряд ФЫВА-ОЛДЖ и правила безопасности при удалении файлов.</p>
        </div>
      </div>
    `,
    quizData: {
      question: 'К какому типу файлов относится файл с именем «сказка_про_дракона.docx»?',
      options: [
        'Текстовый документ',
        'Музыкальный файл',
        'Фотография с камеры',
        'Видеозапись урока'
      ],
      correctIndex: 0,
      explanation: 'Расширение .docx — это формат текстового документа (например, программы Microsoft Word)!'
    }
  }
];
