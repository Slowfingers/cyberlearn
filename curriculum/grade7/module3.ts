import { Task } from '../../types';

export const MODULE3_TASKS: Task[] = [
  {
    id: 'g7_l19',
    courseId: 'course_grade7',
    module: 'Блок 3: Функции, Модули и Текстовые проекты',
    title: 'Урок 19: Функции — def, параметры, return, область видимости',
    type: 'terminal',
    description: 'CSTA 2-AP-13, UK KS3, ACARA ACTDIP029: Создание переиспользуемых функций def, позиционные аргументы, возврат значения return, локальная и глобальная область видимости (Scope).',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-purple-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 font-mono text-purple-300">
            ⚙️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              Функции: Принцип DRY (Don't Repeat Yourself)
            </h3>
            <p class="text-xs text-slate-300">
              Функция изолирует законченный блок вычислений. Она принимает входные аргументы и возвращает результат через оператор <code class="text-yellow-300 font-mono">return</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'def calculate_damage(base_attack, crit_multiplier):\n    return base_attack * crit_multiplier\n\nhero_hit = calculate_damage(50, 1.5)\nprint(f"Критический урон героя: {hero_hit} HP")',
    terminalOutput: '> Критический урон героя: 75.0 HP\n> Функция отработала корректно.'
  },
  {
    id: 'g7_l20',
    courseId: 'course_grade7',
    module: 'Блок 3: Функции, Модули и Текстовые проекты',
    title: 'Урок 20: Модули — импортируем силу',
    type: 'quiz',
    description: 'CSTA 2-AP-14, 2-AP-16, UK KS3: Модульная организация кода, import math, import random, datetime, структура стандартной библиотеки Python.',
    difficulty: 'Новичок',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            📦
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Экосистема модулей Python
            </h3>
            <p class="text-xs text-slate-300">
              Модуль — это файл с готовым протестированным кодом. Подключается с помощью <code class="text-yellow-300 font-mono">import module_name</code>.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Какой модуль стандартной библиотеки Python содержит функции вычисления квадратного корня sqrt() и тригонометрию?',
      options: [
        'math',
        'random',
        'sys',
        'os'
      ],
      correctIndex: 0,
      explanation: 'Модуль math предоставляет доступ к математическим функциям стандарта C (sqrt, sin, cos, pi, floor, ceil).'
    }
  },
  {
    id: 'g7_l21',
    courseId: 'course_grade7',
    module: 'Блок 3: Функции, Модули и Текстовые проекты',
    title: 'Урок 21: Графика turtle — функции, которые рисуют',
    type: 'grid',
    description: 'CSTA 2-AP-14, UK KS3, ACARA ACTDIP028: Алгоритмическая черепашья графика, процедуры рисования геометрических фракталов, циклы и параметры угла поворота.',
    difficulty: 'Новичок',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    allowedCommands: ['forward', 'backward', 'turnLeft', 'turnRight', 'jump'],
    mapConfig: {
      gridSize: 5,
      start: [0, 0],
      end: [4, 4],
      obstacles: [[1, 0], [2, 2], [3, 2]]
    },
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-blue-950/80 border-2 border-teal-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-teal-500/20 border border-teal-400 flex items-center justify-center text-2xl shrink-0 font-mono text-teal-300">
            🐢
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-teal-300">
              Черепашья графика и вычислительная геометрия
            </h3>
            <p class="text-xs text-slate-300">
              Координаты и углы поворота позволяют роботу строить правильные многоугольники и обходить препятствия по точной траектории.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'turnRight()\nfor i in range(4):\n    forward()\nturnLeft()\nfor i in range(4):\n    forward()'
  },
  {
    id: 'g7_l22',
    courseId: 'course_grade7',
    module: 'Блок 3: Функции, Модули и Текстовые проекты',
    title: 'Урок 22: Проект — умный калькулятор',
    type: 'terminal',
    description: 'CSTA 2-AP-15, 2-AP-17, UK KS3, ACARA ACTDIP027, ACTDIP030, KZ Инф 7.3.2.1 / 8.3.3.1 / 8.3.1.1: Проектирование модульного калькулятора с функциями add, subtract, multiply, divide и обработкой деления на ноль ZeroDivisionError.',
    difficulty: 'Хакер',
    xpReward: 115,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-cyan-950/80 border-2 border-cyan-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl shrink-0 font-mono text-cyan-300">
            📱
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-cyan-300">
              Инженерный проект: Отказоустойчивый калькулятор
            </h3>
            <p class="text-xs text-slate-300">
              Реализуем функции для всех операций и добавим обязательную проверку защиты от деления на ноль.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'def divide(a, b):\n    if b == 0:\n        return "ОШИБКА: Деление на ноль запрещено!"\n    return a / b\n\nprint("Тест 1 (100 / 4):", divide(100, 4))\nprint("Тест 2 (50 / 0):", divide(50, 0))',
    terminalOutput: '> Тест 1 (100 / 4): 25.0\n> Тест 2 (50 / 0): ОШИБКА: Деление на ноль запрещено!\n> Все тесты безопасности пройдены.'
  },
  {
    id: 'g7_l23',
    courseId: 'course_grade7',
    module: 'Блок 3: Функции, Модули и Текстовые проекты',
    title: 'Урок 23: Проект — текстовое приключение',
    type: 'terminal',
    description: 'CSTA 2-AP-15, UK KS3, ACARA ACTDIP028, KZ Инф 7.3.2.1 / 8.3.1.1: Разработка текстового RPG-квеста с графом локаций, словарями комнат, инвентарем и циклом обработки команд игрока.',
    difficulty: 'Хакер',
    xpReward: 120,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-amber-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 font-mono text-amber-300">
            🏰
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Архитектура текстового квеста на графе локаций
            </h3>
            <p class="text-xs text-slate-300">
              Комнаты подземелья связываются как узлы графа в словаре: у каждой комнаты есть доступные выходы (север, юг, восток, запад).
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'rooms = {\n    "зал": {"desc": "Главный холл замка", "east": "библиотека"},\n    "библиотека": {"desc": "Комната древних манускриптов", "west": "зал"}\n}\ncurrent_room = "зал"\nprint(f"Ты входишь в: {rooms[current_room][\'desc\']}")\n# Переход на восток\ncurrent_room = rooms[current_room]["east"]\nprint(f"Ты переместился в: {rooms[current_room][\'desc\']}")',
    terminalOutput: '> Ты входишь в: Главный холл замка\n> Ты переместился в: Комната древних манускриптов\n> Игровой движок функционирует отлично.'
  },
  {
    id: 'g7_l24',
    courseId: 'course_grade7',
    module: 'Блок 3: Функции, Модули и Текстовые проекты',
    title: 'Урок 24: Проект — работа с файлами и сводка данных',
    type: 'terminal',
    description: 'CSTA 2-AP-15, 2-DA-08, UK KS3, ACARA ACTDIP025, KZ Инф 7.3.3.1: Файловые потоки, контекстный менеджер with open() as f:, чтение readlines(), запись write() и генерация сводного отчета.',
    difficulty: 'Хакер',
    xpReward: 120,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-blue-950/80 to-emerald-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            📄
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Потоковый ввод-вывод: Контекстный менеджер with open()
            </h3>
            <p class="text-xs text-slate-300">
              Конструкция <code class="text-yellow-300 font-mono">with open("log.txt", "w") as f:</code> гарантирует корректное закрытие дескриптора файла операционной системой даже в случае ошибки.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: 'log_data = ["User_101: LOGIN SUCCESS\\n", "User_102: INVALID PASSWORD\\n", "User_103: LOGIN SUCCESS\\n"]\nsuccess_count = sum(1 for line in log_data if "SUCCESS" in line)\nprint("=" * 30)\nprint("СВОДНЫЙ ОТЧЕТ СИСТЕМЫ БЕЗОПАСНОСТИ:")\nprint(f"Всего событий: {len(log_data)}")\nprint(f"Успешных входов: {success_count}")\nprint("=" * 30)',
    terminalOutput: '> ==============================\n> СВОДНЫЙ ОТЧЕТ СИСТЕМЫ БЕЗОПАСНОСТИ:\n> Всего событий: 3\n> Успешных входов: 2\n> =============================='
  },
  {
    id: 'g7_l25',
    courseId: 'course_grade7',
    module: 'Блок 3: Функции, Модули и Текстовые проекты',
    title: 'Урок 25: Проект — день отладки',
    type: 'quiz',
    description: 'CSTA 2-CS-03, UK KS3, ACARA ACTDIP031, KZ Инф 8.3.2.1: Классификация ошибок: синтаксические (SyntaxError), времени выполнения (TypeError, IndexError, ZeroDivisionError) и логические баги.',
    difficulty: 'Легенда',
    xpReward: 125,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-red-950/80 to-purple-950/80 border-2 border-red-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-red-500/20 border border-red-400 flex items-center justify-center text-2xl shrink-0 font-mono text-red-300">
            🐞
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-red-300">
              Профессиональная отладка: Чтение стека ошибок Traceback
            </h3>
            <p class="text-xs text-slate-300">
              Сообщение Traceback указывает точный номер строки и тип исключения. Настоящий инженер не боится ошибок, а читает их как карту пути.
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'К какому типу относится ошибка, если программа компилируется и работает без падений, но в чеке покупателя выводит неверную итоговую сумму скидки?',
      options: [
        'Логическая ошибка в алгоритме',
        'Синтаксическая ошибка SyntaxError',
        'Ошибка нехватки памяти MemoryError',
        'Ошибка импорта модуля ImportError'
      ],
      correctIndex: 0,
      explanation: 'Логические ошибки — самые коварные: синтаксис верен, программа не падает, но результат вычислений неверен из-за ошибки в алгоритме или математической логике.'
    }
  }
];
