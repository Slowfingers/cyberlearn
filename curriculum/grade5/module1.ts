import { Task } from '../../types';

export const MODULE1_TASKS: Task[] = [
  {
    id: 'g5_l1',
    courseId: 'course_grade5',
    module: 'Блок 1: Архитектура, Логика и Компьютерные Сети',
    title: 'Урок 1: Добро пожаловать в 5 класс и печать для программистов',
    type: 'typing',
    description: 'Вводный урок в 5 класс: переход к продвинутым алгоритмам и скоростная печать символов программиста (скобки, знаки равенства и логические операторы).',
    difficulty: 'Новичок',
    xpReward: 80,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🚀
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Добро пожаловать в 5 класс!
            </h3>
            <p class="text-xs text-slate-300">
              В этом учебном году мы погружаемся в настоящую инженерию: архитектуру компьютеров, логические вентили XOR и NAND, рекурсию, сетевые пакеты и алгоритмы искусственного интеллекта.
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-indigo-400 font-bold">⌨️ Слепая печать для кода</span>
            <p class="text-slate-400 text-[11px]">
              Программисты тратят до 30% времени на спецсимволы: <code class="text-yellow-300 font-mono">()</code>, <code class="text-cyan-300 font-mono">[]</code>, <code class="text-emerald-300 font-mono">{}</code>, <code class="text-pink-300 font-mono">&gt;=</code>, <code class="text-purple-300 font-mono">!=</code>.
            </p>
          </div>
          <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl space-y-1">
            <span class="text-emerald-400 font-bold">🎯 Твоя миссия</span>
            <p class="text-slate-400 text-[11px]">
              Тренируй мышечную память пальцев на специальном тренажере клавиатуры программиста.
            </p>
          </div>
        </div>
      </div>
    `,
    typingConfig: {
      targetText: 'if (power >= 100) { startEngine(); }',
      allowedMistakes: 2
    },
    typingData: {
      text: 'if (power >= 100) { startEngine(); }',
      targetWPM: 25
    }
  },
  {
    id: 'g5_l2',
    courseId: 'course_grade5',
    module: 'Блок 1: Архитектура, Логика и Компьютерные Сети',
    title: 'Урок 2: Повторение систем и компьютерные сети',
    type: 'network_route',
    description: 'Вспомни, как цифровые данные разбиваются на пакеты и преодолевают маршрутизаторы в локальных (LAN) и глобальных (WAN) сетях.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🌐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Компьютерные сети и передача пакетов
            </h3>
            <p class="text-xs text-slate-300">
              Интернет — это глобальная паутина из миллиардов компьютеров, соединенных маршрутизаторами (роутерами) и оптоволоконными кабелями.
            </p>
          </div>
        </div>

        <div class="space-y-2 text-xs">
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
            <span class="text-cyan-400 font-bold">LAN (Local Area Network)</span>
            <span class="text-slate-400 font-sans">Локальная сеть дома, школы или офиса</span>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
            <span class="text-emerald-400 font-bold">WAN (Wide Area Network)</span>
            <span class="text-slate-400 font-sans">Глобальная сеть между городами и континентами</span>
          </div>
          <div class="p-2.5 bg-slate-900 border border-slate-700 rounded-lg flex items-center justify-between">
            <span class="text-amber-400 font-bold">IP-пакет</span>
            <span class="text-slate-400 font-sans">Порция данных с адресами отправителя и получателя</span>
          </div>
        </div>
      </div>
    `,
    networkConfig: {
      startNode: 'A',
      endNode: 'F'
    }
  },
  {
    id: 'g5_l3',
    courseId: 'course_grade5',
    module: 'Блок 1: Архитектура, Логика и Компьютерные Сети',
    title: 'Урок 3: Повторение логических вентилей и вентиль XOR',
    type: 'circuit_builder',
    description: 'Изучи логический вентиль XOR («Исключающее ИЛИ»): лампа горит только тогда, когда переключатели находятся в разных положениях!',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🔀
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Вентиль XOR (Исключающее ИЛИ)
            </h3>
            <p class="text-xs text-slate-300">
              В отличие от обычного OR, вентиль XOR выдает единицу (1) <strong>строго тогда, когда ровно один из входов равен 1</strong>. Если оба 1 или оба 0 — на выходе 0.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-2">
          <div class="font-bold text-purple-400">Таблица истинности XOR:</div>
          <div class="grid grid-cols-3 gap-1 font-mono text-center">
            <div class="bg-black/50 p-1.5 rounded text-slate-400">Вход A</div>
            <div class="bg-black/50 p-1.5 rounded text-slate-400">Вход B</div>
            <div class="bg-black/50 p-1.5 rounded text-yellow-300 font-bold">Выход XOR</div>
            <div class="p-1 bg-slate-950">0</div><div class="p-1 bg-slate-950">0</div><div class="p-1 bg-slate-950 text-red-400 font-bold">0</div>
            <div class="p-1 bg-slate-950">0</div><div class="p-1 bg-slate-950">1</div><div class="p-1 bg-slate-950 text-emerald-400 font-bold">1</div>
            <div class="p-1 bg-slate-950">1</div><div class="p-1 bg-slate-950">0</div><div class="p-1 bg-slate-950 text-emerald-400 font-bold">1</div>
            <div class="p-1 bg-slate-950">1</div><div class="p-1 bg-slate-950">1</div><div class="p-1 bg-slate-950 text-red-400 font-bold">0</div>
          </div>
        </div>
      </div>
    `,
    circuitConfig: {
      gate: 'xor',
      targetOutput: true
    }
  },
  {
    id: 'g5_l4',
    courseId: 'course_grade5',
    module: 'Блок 1: Архитектура, Логика и Компьютерные Сети',
    title: 'Урок 4: Вентиль NAND — универсальный переключатель',
    type: 'circuit_builder',
    description: 'Вентиль NAND (НЕ-И) называют фундаментом процессоростроения. Из комбинаций одних только NAND можно собрать абсолютно любой чип!',
    difficulty: 'Хакер',
    xpReward: 110,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-red-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            ⚡
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              NAND (NOT-AND): Король микросхем
            </h3>
            <p class="text-xs text-slate-300">
              Вентиль NAND выдает 0 <strong>только тогда, когда оба входа равны 1</strong>. Во всех остальных случаях он выдает 1.
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs space-y-2">
          <div class="font-bold text-amber-400">Универсальный логический базис:</div>
          <p class="text-slate-300 text-[11px]">
            В курсе компьютерных наук «From NAND to Tetris» студенты строят процессор, память и операционную систему, начиная всего с одного базового вентиля NAND!
          </p>
        </div>
      </div>
    `,
    circuitConfig: {
      gate: 'nand',
      targetOutput: true
    }
  },
  {
    id: 'g5_l5',
    courseId: 'course_grade5',
    module: 'Блок 1: Архитектура, Логика и Компьютерные Сети',
    title: 'Урок 5: Сложные схемы из всех вентилей',
    type: 'circuit_builder',
    description: 'Собери сложную электронную схему, объединяющую вентили AND, OR, XOR и NAND в законченную логическую цепь.',
    difficulty: 'Элита',
    xpReward: 120,
    currencyReward: 45,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎛️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Полусумматор и сложение битов
            </h3>
            <p class="text-xs text-slate-300">
              Когда компьютер складывает 1 + 1 в двоичной системе, получается 10 (двойка). Бит суммы считается вентилем XOR, а бит переноса в старший разряд — вентилем AND!
            </p>
          </div>
        </div>

        <div class="p-3 bg-slate-900 border border-slate-700 rounded-xl text-xs font-mono space-y-1">
          <div class="text-emerald-400 font-bold">Схема полусумматора (Half Adder):</div>
          <div class="text-slate-300">Сумма (Sum) = A XOR B</div>
          <div class="text-slate-300">Перенос (Carry) = A AND B</div>
        </div>
      </div>
    `,
    circuitConfig: {
      gate: 'and',
      targetOutput: true
    }
  }
];
