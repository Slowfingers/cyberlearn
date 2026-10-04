import { Task } from '../../types';

export const MODULE10_TASKS: Task[] = [
  {
    id: 'g7_l56',
    courseId: 'course_grade7',
    module: 'Блок 10: Архитектура ЭВМ, Алгоритмы и Большой финал',
    title: 'Урок 56: Внутри процессора — конвейер и тактовая частота',
    type: 'quiz',
    description: 'CSTA 2-CS-02, UK KS3, ACARA ACTDIK023, CSTA GCSE, KZ Инф 8.1.1.1: Архитектура фон Неймана, цикл «выборка-декодирование-выполнение» (Fetch-Decode-Execute), конвейер инструкций (Pipelining), тактовая частота ГГц, ALU и регистры.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 font-mono text-cyan-300">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Анатомия CPU: Цикл Fetch-Decode-Execute и конвейер
            </h3>
            <p class="text-xs text-slate-300">
              Тактовый генератор задает ритм (например, 3.5 ГГц — это 3.5 миллиарда тактов в секунду). На каждом такте процессор выбирает инструкцию из памяти, расшифровывает её и вычисляет в АЛУ.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что выполняет арифметико-логическое устройство (ALU / АЛУ) внутри центрального процессора?',
      options: [
        'Выполняет арифметику и логические операции',
        'Хранит данные между запусками программы',
        'Управляет охлаждением микросхемы',
        'Выводит изображение на экран монитора'
      ],
      correctIndex: 0,
      explanation: 'АЛУ (Arithmetic Logic Unit) — исполнительный математический блок процессора, выполняющий базовые битовые и арифметические операции.'
    }
  },
  {
    id: 'g7_l57',
    courseId: 'course_grade7',
    module: 'Блок 10: Архитектура ЭВМ, Алгоритмы и Большой финал',
    title: 'Урок 57: Иерархия памяти и как выполняется Python',
    type: 'quiz',
    description: 'CSTA 2-CS-02, UK KS3, KZ Инф 7.1.1.1: Пирамида памяти (Регистры -> Кэш L1/L2/L3 -> RAM -> SSD/NVMe -> HDD), байткод Python (.pyc), виртуальная машина PVM, сборщик мусора Garbage Collector.',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 font-mono text-purple-300">
            📊
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Иерархия памяти: Закон компромисса «Скорость против Объема»
            </h3>
            <p class="text-xs text-slate-300">
              Регистры CPU работают за доли наносекунды, но вмещают лишь байты. Оперативная память RAM вмещает гигабайты, но в сотни раз медленнее регистров. SSD хранит терабайты без питания, но медленнее RAM.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какие небольшие ячейки внутри процессора хранят значения для текущих вычислений?',
      options: [
        'Регистры процессора',
        'Оперативная память DDR5',
        'SSD-накопитель NVMe',
        'Кэш-память L3'
      ],
      correctIndex: 0,
      explanation: 'Регистры находятся непосредственно внутри вычислительных ядер процессора и работают на пиковой тактовой частоте кристалла.'
    }
  },
  {
    id: 'g7_l58',
    courseId: 'course_grade7',
    module: 'Блок 10: Архитектура ЭВМ, Алгоритмы и Большой финал',
    title: 'Урок 58: Сортировка, поиск, стеки и очереди — на Python',
    type: 'tree_search',
    description: 'CSTA 2-AP-12, 2-AP-14, UK KS3, KZ Инф 9.3.2.1 / 9.3.3.1: Стеки LIFO (Last In First Out), очереди FIFO (First In First Out), бинарный поиск в дереве $O(\\log N)$.',
    difficulty: 'Хакер',
    xpReward: 120,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            🌲
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Бинарные деревья поиска: Алгоритмический поиск за O(log N)
            </h3>
            <p class="text-xs text-slate-300">
              В каждом узле дерева меньшие элементы лежат слева, а большие — справа. При миллионе записей ответ находится всего за 20 сравнений!
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g7_l59',
    courseId: 'course_grade7',
    module: 'Блок 10: Архитектура ЭВМ, Алгоритмы и Большой финал',
    title: 'Урок 59: Итоговый проект — выбери, что построить',
    type: 'terminal',
    description: 'CSTA 2-AP-15, 2-AP-17, UK KS3, ACARA ACTDIP027, ACTDIP030, ACTDIP031, ACTDIP032, KZ Инф 8.3.1.1: Разработка комплексного финального проекта 7 класса (консольное приложение с модулями, сохранением состояния и защитой от сбоев).',
    difficulty: 'Легенда',
    xpReward: 150,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-yellow-950/80 to-purple-950/80 border-2 border-yellow-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-yellow-500/20 border border-yellow-400 flex items-center justify-center text-2xl shrink-0 font-mono text-yellow-300">
            🏆
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-yellow-300">
              Гранд-проект 7 класса: Архитектура законченного приложения
            </h3>
            <p class="text-xs text-slate-300">
              Объединяем все знания года: обработку ввода, списки словарей, алгоритмы сортировки, функции с return и форматированный вывод.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'class CyberSecurityAudit:\n    def __init__(self, target_domain):\n        self.target = target_domain\n        self.vulnerabilities = []\n\n    def scan_ports(self, open_ports):\n        for port in open_ports:\n            if port in [21, 23, 80]:\n                self.vulnerabilities.append(f"Незащищенный порт: {port}")\n        return len(self.vulnerabilities) == 0\n\naudit = CyberSecurityAudit("school-network.kz")\nis_secure = audit.scan_ports([80, 443, 22])\nprint(f"Аудит домена {audit.target}: Защищен={is_secure}")\nprint(f"Найденные предупреждения: {audit.vulnerabilities}")',
    terminalOutput: '> Аудит домена school-network.kz: Защищен=False\n> Найденные предупреждения: [\'Незащищенный порт: 80\']\n> Отчет сгенерирован успешно.'
  },
  {
    id: 'g7_l60',
    courseId: 'course_grade7',
    module: 'Блок 10: Архитектура ЭВМ, Алгоритмы и Большой финал',
    title: 'Урок 60: Рефлексия, показ работ и анонс 8 класса',
    type: 'terminal',
    description: 'CSTA 2-AP-19, ACARA ACTDIP033: Инженерная рефлексия, код-ревью (Code Review), сохранение релиза в Git (git commit, git push) и анонс 8 класса (ООП, алгоритмы графов, бэкенд на Python).',
    difficulty: 'Легенда',
    xpReward: 150,
    currencyReward: 50,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-blue-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            🚀
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Поздравляем с завершением курса 7 класса!
            </h3>
            <p class="text-xs text-slate-300">
              Вы освоили фундаментальный синтаксис Python, реляционные базы данных SQL, интерактивный JavaScript, сети TCP/IP, микроконтроллеры и машинное обучение!
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'git add .\ngit commit -m "feat: Grade 7 Computer Science completed! Ready for Grade 8"\ngit push origin main',
    terminalOutput: '> [main 7a2f10b] feat: Grade 7 Computer Science completed! Ready for Grade 8\n> 60 files changed, 2400 insertions(+)\n> To github.com:cyber-academy/grade7.git\n> * [new branch] main -> main\n> РЕЛИЗ 7 КЛАССА ОПУБЛИКОВАН!'
  }
];
