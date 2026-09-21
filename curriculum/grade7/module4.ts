import { Task } from '../../types';

export const MODULE4_TASKS: Task[] = [
  {
    id: 'g7_l26',
    courseId: 'course_grade7',
    module: 'Блок 4: Терминал, Командная строка и Инструменты разработчика',
    title: 'Урок 26: Терминал — это место',
    type: 'terminal',
    description: 'CSTA 2-CS-02, UK KS3, KZ ЦГ 4.3.1.2: Архитектура CLI vs GUI, потоки stdin/stdout, абсолютные и относительные пути в файловой системе, команды pwd, whoami.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-slate-900 to-cyan-950 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 font-mono text-cyan-300">
            $
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Командная строка: Сила прямого управления ОС
            </h3>
            <p class="text-xs text-slate-300">
              Терминал (Shell) — это текстовый интерфейс прямого взаимодействия с ядром системы. Команда <code class="text-yellow-300 font-mono">pwd</code> выводит текущий рабочий каталог (Print Working Directory).
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'pwd\nwhoami',
    terminalOutput: '> /home/cyberstudent/workspace\n> cyberstudent\n> Shell ready.'
  },
  {
    id: 'g7_l27',
    courseId: 'course_grade7',
    module: 'Блок 4: Терминал, Командная строка и Инструменты разработчика',
    title: 'Урок 27: Файлы и каталоги из терминала',
    type: 'terminal',
    description: 'CSTA 2-CS-02, KZ ЦГ 2.1.2.2: Навигация и манипуляции: ls -la, cd .., cd ~, mkdir, touch, cp, mv, rm -rf.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            📁
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Манипуляция файлами через UNIX-команды
            </h3>
            <p class="text-xs text-slate-300">
              Быстрое создание структуры проекта: <code class="text-yellow-300 font-mono">mkdir src</code>, создание файла <code class="text-cyan-300 font-mono">touch main.py</code> и переход в директорию <code class="text-emerald-300 font-mono">cd src</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'mkdir src\ntouch src/main.py\nls src',
    terminalOutput: '> Directory created: src/\n> File created: src/main.py\n> Contents of src/: main.py'
  },
  {
    id: 'g7_l28',
    courseId: 'course_grade7',
    module: 'Блок 4: Терминал, Командная строка и Инструменты разработчика',
    title: 'Урок 28: Конвейеры, перенаправления и фильтры',
    type: 'terminal',
    description: 'CSTA 2-CS-02, 2-AP-15: Пайплайны (Pipes |), перенаправление вывода (> и >>), утилиты grep, cat, wc -l, head, sort.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-indigo-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 font-mono text-purple-300">
            ⛓️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Философия UNIX: Конвейеры (Pipes |)
            </h3>
            <p class="text-xs text-slate-300">
              Символ пайпа <code class="text-yellow-300 font-mono">|</code> передает поток вывода одной утилиты прямо на вход другой. Например, <code class="text-cyan-300 font-mono">cat log.txt | grep ERROR | wc -l</code> мгновенно подсчитывает число ошибок в огромном логе!
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'cat access.log | grep "404" | wc -l',
    terminalOutput: '> 14\n> [INFO] Найдено 14 событий с кодом 404 Not Found'
  },
  {
    id: 'g7_l29',
    courseId: 'course_grade7',
    module: 'Блок 4: Терминал, Командная строка и Инструменты разработчика',
    title: 'Урок 29: Запуск Python из терминала',
    type: 'terminal',
    description: 'CSTA 2-CS-02, 2-AP-15: Интерпретатор python3 main.py, аргументы sys.argv, виртуальные окружения venv, установка пакетов pip install.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-slate-900 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0 font-mono text-yellow-300">
            🐍
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Интерпретатор в продакшене
            </h3>
            <p class="text-xs text-slate-300">
              Запуск скриптов с параметрами: <code class="text-yellow-300 font-mono">python3 app.py --port=8080</code>. Параметры считываются модулем <code class="text-cyan-300 font-mono">sys.argv</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'python3 src/main.py --mode=production',
    terminalOutput: '> [PYTHON 3.12] Starting src/main.py in PRODUCTION mode...\n> All microservices initialized successfully.'
  }
];
