import { Task } from '../../types';

export const MODULE9_TASKS: Task[] = [
  {
    id: 'g7_l53',
    courseId: 'course_grade7',
    module: 'Блок 9: Физические вычисления и Микроконтроллеры',
    title: 'Урок 53: Привет, микроконтроллер',
    type: 'quiz',
    description: 'ACARA ACTDIK023: Архитектура SoC/MCU (Arduino, micro:bit, Raspberry Pi Pico), тактовый генератор, энергонезависимая Flash-память, пины общего назначения GPIO.',
    difficulty: 'Новичок',
    xpReward: 100,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            🔌
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Микроконтроллеры: Мозг умных устройств
            </h3>
            <p class="text-xs text-slate-300">
              Микроконтроллер (MCU) — это однокристальный компьютер, где процессор, память и периферия объединены на одном чипе. Пины GPIO принимают и выдают электрические сигналы (0V или 3.3V/5V).
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Для чего служат выводы (пины) GPIO на плате микроконтроллера?',
      options: [
        'Для обмена сигналами с датчиками',
        'Для подключения платы к розетке 220 В',
        'Для зарядки аккумулятора автомобиля',
        'Для охлаждения микросхемы платы'
      ],
      correctIndex: 0,
      explanation: 'GPIO (General Purpose Input/Output) — универсальные программируемые выводы ввода-вывода для связи контроллера с внешним электронным миром.'
    }
  },
  {
    id: 'g7_l54',
    courseId: 'course_grade7',
    module: 'Блок 9: Физические вычисления и Микроконтроллеры',
    title: 'Урок 54: Кнопки, датчики и входы',
    type: 'quiz',
    description: 'ACARA ACTDIK023, KZ Инф 7.3.2.1: Цифровые и аналоговые сигналы, АЦП (ADC), широтно-импульсная модуляция (PWM), датчики температуры, освещенности (фоторезистор) и ультразвуковые дальномеры.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-amber-950/80 to-blue-950/80 border-2 border-amber-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-amber-500/20 border border-amber-400 flex items-center justify-center text-2xl shrink-0 font-mono text-amber-300">
            🎛️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-amber-300">
              Аналого-цифровой преобразователь (АЦП / ADC)
            </h3>
            <p class="text-xs text-slate-300">
              Физический мир непрерывен (плавное изменение температуры или яркости). АЦП преобразует аналоговое напряжение датчика в дискретный цифровой код (например, от 0 до 1023 в 10-битном регистре).
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Как отличается двоичный цифровой сигнал в нашей модели от плавно меняющейся аналоговой величины?',
      options: [
        'Два состояния вместо плавного изменения',
        'Аналоговый передаётся только по воздуху',
        'Цифровой сигнал не требует проводов',
        'Аналоговый сигнал не переносит энергию'
      ],
      correctIndex: 0,
      explanation: 'В этой двоичной модели сигнал читают как 0 или 1. Аналоговая величина, например напряжение датчика, может плавно меняться. Не любой цифровой способ использует только два уровня.'
    }
  },
  {
    id: 'g7_l55',
    courseId: 'course_grade7',
    module: 'Блок 9: Физические вычисления и Микроконтроллеры',
    title: 'Урок 55: Проект схемы умного дома',
    type: 'terminal',
    description: 'ACARA ACTDIK023, ACTDIP027, ACTDIP030, ACTDIP032, CSTA 2-CS-01, KZ Инф 7.3.2.1: Проектирование IoT-системы климат-контроля: цикл опроса датчиков, пороги включения вентилятора и сигнализации.',
    difficulty: 'Легенда',
    xpReward: 125,
    currencyReward: 40,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-teal-950/80 to-emerald-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 font-mono text-emerald-300">
            🏠
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Мини-проект 5: IoT-контроллер Умного Дома
            </h3>
            <p class="text-xs text-slate-300">
              Программа считывает температуру и освещенность. Если температура превышает +28°C — контроллер подает сигнал на реле включения охлаждения.
            </p>
          </div>
        </div>
      </div>
    `,
    initialCode: "def devices(temp, light):\n    relay_fan = False\n    relay_lamp = False\n    if temp > 28.0:\n        relay_fan = True\n    if light < 300:\n        relay_lamp = True\n    return relay_fan, relay_lamp\n\nfor temp, light in [(29.5, 420), (28, 300), (27, 299), (29, 299)]:\n    fan, lamp = devices(temp, light)\n    print(f\"Датчики {temp}, {light}: вентилятор={fan}, лампа={lamp}\")",
    terminalOutput: '> СТАТУС IOT УМНОГО ДОМА: Вентилятор=ВКЛ, Освещение=ВЫКЛ\n> Все исполнительные реле переключены корректно.'
  }
];
