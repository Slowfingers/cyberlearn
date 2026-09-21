import { Task } from '../../types';

export const MODULE1_TASKS: Task[] = [
  {
    id: 'g6_m1_l1',
    courseId: 'course_grade6',
    module: 'Блок 1: ОС, Процессы и Терминал',
    title: 'Урок 1: Архитектура операционной системы: Ядро, Память и Драйверы',
    type: 'quiz',
    description: 'Узнай, как операционная система управляет железом компьютера, распределяет процессорное время и защищает память.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-cyan-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            💻
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Архитектура ОС: Мостик между кремнием и человеком
            </h3>
            <p class="text-xs text-slate-300">
              Операционная система (Linux, Windows, macOS) — главный диспетчер компьютера. Без неё программы не знали бы, как передать сигнал на монитор или процессор.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div class="p-3.5 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-1.5">
            <div class="flex items-center gap-2 text-cyan-400 font-bold text-xs uppercase">
              <span>🧠</span> 1. Ядро (Kernel)
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Центральная часть ОС. Имеет наивысший приоритет (Ring 0), распределяет вычисления на ядра CPU и контролирует доступ к оперативной памяти.
            </p>
          </div>

          <div class="p-3.5 bg-slate-900 border border-emerald-500/40 rounded-xl space-y-1.5">
            <div class="flex items-center gap-2 text-emerald-400 font-bold text-xs uppercase">
              <span>💾</span> 2. Менеджер памяти
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Выделяет виртуальное адресное пространство каждому приложению, изолируя их друг от друга, чтобы сбой в браузере не уронил всю систему.
            </p>
          </div>

          <div class="p-3.5 bg-slate-900 border border-purple-500/40 rounded-xl space-y-1.5">
            <div class="flex items-center gap-2 text-purple-400 font-bold text-xs uppercase">
              <span>🔌</span> 3. Драйверы
            </div>
            <p class="text-xs text-slate-300 leading-relaxed">
              Специализированные программы-переводчики. Они переводят общие команды ОС на уникальный язык конкретной видеокарты, звукового чипа или Wi-Fi модуля.
            </p>
          </div>
        </div>

        <div class="p-3 bg-amber-950/40 border border-amber-500/40 rounded-xl text-xs space-y-1">
          <div class="font-bold text-amber-300 flex items-center gap-1.5">
            <span>💡</span> Инженерный принцип изоляции процессов:
          </div>
          <p class="text-slate-300 leading-relaxed">
            Если программа пытается прочитать чужую память без разрешения ядра, процессор вызывает прерывание <strong>Segmentation Fault</strong> (ошибка сегментации) и немедленно останавливает нарушителя!
          </p>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какая часть операционной системы напрямую взаимодействует с регистрами процессора и управляет распределением физической памяти между процессами?',
      options: [
        'Ядро (Kernel)',
        'Веб-браузер пользователя',
        'Драйвер видеокарты',
        'Антивирусная программа'
      ],
      correctIndex: 0,
      explanation: 'Ядро (Kernel) — это низкоуровневое сердце ОС. Оно единственное обладает правами Ring 0 и контролирует доступ ко всем аппаратным ресурсам компьютера.'
    }
  },
  {
    id: 'g6_m1_typing',
    courseId: 'course_grade6',
    module: 'Блок 1: ОС, Процессы и Терминал',
    title: 'Урок 2: Печать со скоростью инженера: Клавиатура кодера',
    type: 'typing',
    description: 'Интерактивный тренажер скорости слепой печати со спецсимволами синтаксиса: скобки, двоеточия, кавычки и операторы.',
    difficulty: 'Новичок',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-cyan-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⌨️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Спецсимволы в языках программирования
            </h3>
            <p class="text-xs text-slate-300">
              Программист печатает не только буквы, но и десятки управляющих символов. Быстрый набор скобок и кавычек экономит часы разработки!
            </p>
          </div>
        </div>

        <div class="grid grid-cols-2 sm:grid-cols-4 gap-2.5 text-xs font-mono">
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-center">
            <span class="text-emerald-400 font-bold text-base">{ }</span>
            <div class="text-[11px] text-slate-400 font-sans mt-0.5">Фигурные скобки: словари и блоки</div>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-center">
            <span class="text-cyan-400 font-bold text-base">[ ]</span>
            <div class="text-[11px] text-slate-400 font-sans mt-0.5">Квадратные скобки: списки и массивы</div>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-center">
            <span class="text-amber-400 font-bold text-base">:</span>
            <div class="text-[11px] text-slate-400 font-sans mt-0.5">Двоеточие: объявление блока в Python</div>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg text-center">
            <span class="text-pink-400 font-bold text-base">" "</span>
            <div class="text-[11px] text-slate-400 font-sans mt-0.5">Кавычки: строковые литералы</div>
          </div>
        </div>

        <div class="p-3 bg-slate-900/90 border border-slate-700 rounded-xl text-xs space-y-1">
          <div class="text-cyan-300 font-bold">🎯 Задание на практику:</div>
          <p class="text-slate-300 leading-relaxed">
            Введи фрагмент кода Python без ошибок: <code class="text-yellow-300 font-mono">for i in range(5): res[i] = {"id": i, "val": i * 2}</code>
          </p>
        </div>
      </div>
    `,
    typingConfig: {
      targetText: 'for i in range(5): res[i] = {"id": i, "val": i * 2}'
    }
  },
  {
    id: 'g6_m1_process',
    courseId: 'course_grade6',
    module: 'Блок 1: ОС, Процессы и Терминал',
    title: 'Урок 3: Процессы, память и диспетчер задач',
    type: 'process_manager',
    description: 'Интерактивный симулятор диспетчера задач: найди паразитные процессы с утечками памяти и скрытые майнеры, перегружающие CPU, и заверши их!',
    difficulty: 'Хакер',
    xpReward: 130,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-purple-950/80 border-2 border-red-500/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Анатомия процессов: PID, CPU и Memory Leak
            </h3>
            <p class="text-xs text-slate-300">
              Каждая запущенная программа становится <strong>процессом</strong> со своим идентификатором (PID) и выделенной областью ОЗУ.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-900 border border-red-500/30 rounded-xl space-y-1">
            <h4 class="text-red-400 font-bold flex items-center gap-1.5">
              <span>⚠️</span> Утечка памяти (Memory Leak)
            </h4>
            <p class="text-slate-300 leading-relaxed">
              Ошибка программиста: программа запрашивает у ОС новые мегабайты памяти, но забывает освобождать неиспользуемые. Память бесконечно растет, пока компьютер не зависнет!
            </p>
          </div>

          <div class="p-3 bg-slate-900 border border-amber-500/30 rounded-xl space-y-1">
            <h4 class="text-amber-400 font-bold flex items-center gap-1.5">
              <span>💀</span> Зомби-процессы и майнеры
            </h4>
            <p class="text-slate-300 leading-relaxed">
              Вредоносные программы маскируются под системные службы, нагружая процессор до 100% и разогревая чипы ноутбука.
            </p>
          </div>
        </div>

        <div class="p-3 bg-cyan-950/40 border border-cyan-500/40 rounded-xl text-xs space-y-1">
          <div class="font-bold text-cyan-300">🛡️ Твоя задача системного администратора:</div>
          <p class="text-slate-300">
            Обезвредь 3 вредоносных процесса (<span class="font-mono text-amber-300">miner_stealth_x64.tmp</span>, <span class="font-mono text-amber-300">infinite_loop_leak.exe</span>, <span class="font-mono text-amber-300">zombie_crawler.bin</span>) и НЕ трогай системные процессы ядра!
          </p>
        </div>
      </div>
    `,
    processConfig: {
      targetKillNames: ['miner_stealth_x64.tmp', 'infinite_loop_leak.exe', 'zombie_crawler.bin']
    }
  },
  {
    id: 'g6_m1_l3',
    courseId: 'course_grade6',
    module: 'Блок 1: ОС, Процессы и Терминал',
    title: 'Урок 4: Файловые системы: Древовидная структура, Пути и Права',
    type: 'quiz',
    description: 'Разберись, чем абсолютный путь отличается от относительного, как устроено дерево папок в Linux и что значат точки "." и "..".',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🌲
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Дерево каталогов и синтаксис путей
            </h3>
            <p class="text-xs text-slate-300">
              В современных ОС файлы организованы не свалкой, а строгим графом — деревом с единственным корнем (root).
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3.5 bg-slate-900 border border-cyan-500/40 rounded-xl space-y-1.5">
            <div class="text-cyan-400 font-bold flex items-center gap-1.5">
              <span>📍</span> Абсолютный путь
            </div>
            <p class="text-slate-300 leading-relaxed">
              Начинается от самого корня системы. В Linux это символ <code class="text-cyan-300 font-mono font-bold">/</code>, в Windows — буква диска <code class="text-cyan-300 font-mono font-bold">C:\\</code>.
            </p>
            <div class="p-2 bg-black/60 rounded font-mono text-cyan-300 text-[11px]">
              /home/student/projects/main.py
            </div>
          </div>

          <div class="p-3.5 bg-slate-900 border border-emerald-500/40 rounded-xl space-y-1.5">
            <div class="text-emerald-400 font-bold flex items-center gap-1.5">
              <span>🧭</span> Относительный путь
            </div>
            <p class="text-slate-300 leading-relaxed">
              Отсчитывается от директории, в которой ты сейчас находишься.
            </p>
            <div class="p-2 bg-black/60 rounded font-mono text-emerald-300 text-[11px]">
              ./scripts/run.sh &nbsp;или&nbsp; ../data.json
            </div>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono space-y-1 text-slate-300">
          <div><strong class="text-yellow-400">.</strong> &nbsp;— текущая директория ("здесь")</div>
          <div><strong class="text-yellow-400">..</strong> — родительская директория (шаг назад на уровень выше)</div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Ты находишься в папке "/home/student/game/src". Как кратко записать относительный путь к файлу "assets/hero.png", который лежит в папке "game"?',
      options: [
        '../assets/hero.png',
        './assets/hero.png',
        '/assets/hero.png',
        'assets/../hero.png'
      ],
      correctIndex: 0,
      explanation: 'Символ ".." поднимает нас из папки "src" на один уровень вверх в папку "game", откуда мы спускаемся в "assets/hero.png".'
    }
  },
  {
    id: 'g6_m1_term',
    courseId: 'course_grade6',
    module: 'Блок 1: ОС, Процессы и Терминал',
    title: 'Урок 5: Командная строка инженера: Навигация в Bash',
    type: 'terminal',
    description: 'Настоящая командная строка Linux. Исследуй файловую структуру с помощью pwd и ls, а затем прочитай секретный манифест через cat welcome.txt!',
    difficulty: 'Хакер',
    xpReward: 140,
    currencyReward: 55,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            💻
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              CLI (Command Line Interface) — пульт управления серверами
            </h3>
            <p class="text-xs text-slate-300">
              Графический интерфейс удобен для мышки, но 95% суперкомпьютеров и серверов мира управляются исключительно текстовыми командами в терминале.
            </p>
          </div>
        </div>

        <div class="space-y-2 text-xs font-mono">
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
            <span class="text-emerald-400 font-bold">pwd</span>
            <span class="text-slate-400 font-sans">Print Working Directory — показать, в какой папке я нахожусь</span>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
            <span class="text-cyan-400 font-bold">ls -la</span>
            <span class="text-slate-400 font-sans">List — вывести список всех файлов и скрытых директорий</span>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
            <span class="text-yellow-400 font-bold">cat имя_файла</span>
            <span class="text-slate-400 font-sans">Concatenate — вывести содержимое текстового файла на экран</span>
          </div>
        </div>

        <div class="p-3 bg-slate-900/90 border border-cyan-500/40 rounded-xl text-xs space-y-1">
          <div class="text-cyan-300 font-bold">🎯 Боевая задача:</div>
          <p class="text-slate-300">
            Введи команду <code class="text-yellow-300 font-mono font-bold">cat welcome.txt</code>, чтобы прочитать секретный манифест инженера 6 класса!
          </p>
        </div>
      </div>
    `,
    initialCode: 'pwd\nls -la\ncat welcome.txt',
    terminalConfig: {
      fileSystem: '{"welcome.txt": "Добро пожаловать в командную строку инженера 6 класса! Терминал покорен."}',
      goalCommand: 'cat welcome.txt'
    }
  }
];
