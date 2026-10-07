import { Task } from '../../types';

export const MODULE6_TASKS: Task[] = [
  {
    id: 'g4_l26',
    courseId: 'course_grade4',
    module: 'Модуль 6: Разработка игр и интернет-системы',
    title: 'Урок 26: Цели, испытания и полировка',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-13 · UK KS2 · ACARA AC9TDI6P10 · KZ ЦГ 4.4.2.2. Как выстроить кривую сложности (Flow State): от простого первого уровня к финальному боссу.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-orange-950/80 to-amber-950/80 border-2 border-orange-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-orange-500/20 border border-orange-400 flex items-center justify-center text-2xl shrink-0">
            🎯
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-orange-300">
              Баланс сложности и поток (Flow)
            </h3>
            <p class="text-xs text-slate-300">
              Слишком легкая игра навевает скуку, а слишком тяжелая — бесит. Секрет мастеров — постепенное обучение новым трюкам перед сложными испытаниями.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как называется состояние, когда игра увлекает, не давая заскучать и не вызывая злости?',
      options: [
        'Поток (Flow)',
        'Перегрузка (Overload)',
        'Задержка (Lag)',
        'Скука (Boredom)'
      ],
      correctIndex: 0,
      explanation: 'Правильно! Состояние потока достигается идеальным балансом между навыком игрока и сложностью вызова!'
    }
  },
  {
    id: 'g4_l27',
    courseId: 'course_grade4',
    module: 'Модуль 6: Разработка игр и интернет-системы',
    title: 'Урок 27: Планирование игры и архитектура',
    type: 'wireframe_builder',
    description: 'Стандарты: CSTA 1B-AP-11 · UK KS2 · ACARA AC9TDI6P10 · KZ ЦГ 4.4.2.2. Дизайн-документ игры (GDD): выбор сеттинга, персонажей, механик и победных условий.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-indigo-950/80 border-2 border-blue-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-blue-500/20 border border-blue-400 flex items-center justify-center text-2xl shrink-0">
            📐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-blue-300">
              Дизайн-документ (GDD)
            </h3>
            <p class="text-xs text-slate-300">
              Ни одна крупная игра не пишется без чертежа. GDD описывает правила, персонажей, графику и цели проекта для всей команды.
            </p>
          </div>
        </div>
      </div>
    `,
    wireframeConfig: {
      requiredElements: ['header', 'canvas', 'controls']
    }
  },
  {
    id: 'g4_l28',
    courseId: 'course_grade4',
    module: 'Модуль 6: Разработка игр и интернет-системы',
    title: 'Урок 28: Игровые механики и доработка',
    type: 'grid',
    description: 'Стандарты: CSTA 1B-AP-15 · UK KS2 · ACARA AC9TDI6P10 · KZ ЦГ 4.4.2.2. Добавление двойного прыжка, порталов и бонусов скорости в игровой уровень.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-violet-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0">
            🌀
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Необычные механики
            </h3>
            <p class="text-xs text-slate-300">
              Механика — это правило взаимодействия: порталы мгновенно телепортируют, батуты подбрасывают в 2 раза выше, а лед добавляет скольжения.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'drone.jump()\ndrone.move_right()',
    allowedCommands: ['drone.move_right()', 'drone.move_down()', 'drone.jump()', 'drone.move_up()'],
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [3, 0],
      obstacles: [[1, 0]]
    }
  },
  {
    id: 'g4_l29',
    courseId: 'course_grade4',
    module: 'Модуль 6: Разработка игр и интернет-системы',
    title: 'Урок 29: Тестирование, отладка и презентация',
    type: 'quiz',
    description: 'Стандарты: CSTA 1B-AP-15, 1B-AP-16, 1B-AP-17 · UK KS2 · ACARA AC9TDI6P10 · KZ ЦГ 4.4.2.2. Плейтесты с одноклассниками, сбор отзывов, поиск краевых багов и питч проекта.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 25,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0">
            🐞
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Плейтесты и отладка (Debugging)
            </h3>
            <p class="text-xs text-slate-300">
              Дай поиграть другу, ничего не подсказывая! Если он заблудился на уровне — это не его вина, а подсказка тебе улучшить навигацию и подсказки в игре.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что является лучшим способом найти неожиданные ошибки в своей игре?',
      options: [
        'Дать друзьям поиграть и смотреть за ними',
        'Перечитать свой код ещё десять раз',
        'Показать игру только себе самому',
        'Переписать игру с нуля заново'
      ],
      correctIndex: 0,
      explanation: 'Отлично! Наблюдение за другими игроками помогает заметить неожиданные действия, ошибки и непонятные элементы интерфейса.'
    }
  },
  {
    id: 'g4_l30',
    courseId: 'course_grade4',
    module: 'Модуль 6: Разработка игр и интернет-системы',
    title: 'Урок 30: Устройство интернета и URL-адреса',
    type: 'network_route',
    description: 'Стандарты: CSTA 1B-NI-04, 1B-NI-05 · UK KS2 · ACARA AC9TDI6K01 · KZ ЦГ 3.1.3.1. Как устроен веб-адрес: протокол https://, домен второго уровня, доменная зона (.com, .kz) и путь к файлу.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-cyan-950/80 to-blue-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0">
            🌐
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Анатомия URL-ссылки
            </h3>
            <p class="text-xs text-slate-300">
              <code class="text-emerald-300 font-mono">https://</code> — безопасный протокол передачи данных; <code class="text-yellow-300 font-mono">school.kz</code> — доменное имя; <code class="text-cyan-300 font-mono">/lessons/grade4</code> — путь к конкретной странице на сервере.
            </p>
          </div>
        </div>
      </div>
    `,
    networkConfig: {
      startNode: 'A',
      endNode: 'D'
    }
  }
];
