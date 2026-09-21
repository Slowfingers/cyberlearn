import { Task } from '../../types';

export const MODULE11_TASKS: Task[] = [
  {
    id: 'g5_l51',
    courseId: 'course_grade5',
    module: 'Блок 11: Цифровое искусство, Вектор, Анимация и Портфолио',
    title: 'Урок 51: Продвинутое цифровое искусство и векторная графика',
    type: 'quiz',
    description: 'Векторная графика в деталях: кривые Безье, опорные точки (Anchor Points), заливка градиентом и масштабирование интерфейсов без потери качества.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-pink-950/80 to-purple-950/80 border-2 border-pink-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-pink-500/20 border border-pink-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎨
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-pink-300">
              Кривые Безье и Векторные опорные точки
            </h3>
            <p class="text-xs text-slate-300">
              Векторная иллюстрация строится из математических точек и направляющих ручек («усиков»). Растягивая усик точки, дизайнер управляет кривизной линии!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Чем векторный рисунок кардинально отличается от растрового (пиксельного)?',
      options: [
        'Вектор — это формулы, его можно увеличивать',
        'Вектор рисуется только чёрным цветом',
        'Вектор нельзя открыть на телефоне',
        'Вектор весит больше, чем растровый файл'
      ],
      correctIndex: 0,
      explanation: 'Векторная графика математически пересчитывается при каждом изменении размера, оставаясь кристально четкой.'
    }
  },
  {
    id: 'g5_l52',
    courseId: 'course_grade5',
    module: 'Блок 11: Цифровое искусство, Вектор, Анимация и Портфолио',
    title: 'Урок 52: Обработка фотографий и анимация для игр',
    type: 'quiz',
    description: 'Покадровая анимация (Spritesheet), частота кадров (FPS), фазы бега персонажа (Run Cycle) и цветокоррекция игровых текстур.',
    difficulty: 'Хакер',
    xpReward: 95,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-indigo-950/80 to-cyan-950/80 border-2 border-indigo-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-indigo-500/20 border border-indigo-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            🎞️
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-indigo-300">
              Спрайтшит (Spritesheet) и Анимационный цикл
            </h3>
            <p class="text-xs text-slate-300">
              Все кадры анимации бега персонажа упаковываются в одну общую картинку-атлас (Spritesheet). Программа лишь сдвигает видимый прямоугольник каждые несколько миллисекунд!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Зачем разработчики игр упаковывают все кадры анимации героя в один общий атлас текстур (Spritesheet)?',
      options: [
        'Видеокарта грузит один файл вместо сотен',
        'Так кадры анимации нельзя подсмотреть',
        'Так игра занимает больше места на диске',
        'Так каждый кадр можно править отдельно'
      ],
      correctIndex: 0,
      explanation: 'Атласы текстур кардинально сокращают количество вызовов отрисовки (Draw Calls) в графическом конвейере.'
    }
  },
  {
    id: 'g5_l53',
    courseId: 'course_grade5',
    module: 'Блок 11: Цифровое искусство, Вектор, Анимация и Портфолио',
    title: 'Урок 53: Визуальный сторителлинг и графика интерфейсов',
    type: 'wireframe_builder',
    description: 'Проектирование пользовательского пути (User Journey): создание интерактивного прототипа экрана мобильного приложения.',
    difficulty: 'Хакер',
    xpReward: 105,
    currencyReward: 35,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-purple-950/80 to-blue-950/80 border-2 border-purple-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-purple-500/20 border border-purple-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            📱
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-purple-300">
              UI/UX Дизайн: Интуитивный интерфейс
            </h3>
            <p class="text-xs text-slate-300">
              Хороший интерфейс не требует инструкции: кнопка главного действия (Call-to-Action) заметна сразу, а шрифт четко читается на контрастном фоне.
            </p>
          </div>
        </div>
      </div>
    `
  },
  {
    id: 'g5_l54',
    courseId: 'course_grade5',
    module: 'Блок 11: Цифровое искусство, Вектор, Анимация и Портфолио',
    title: 'Урок 54: Цифровое портфолио и творческий показ',
    type: 'quiz',
    description: 'Сборка цифрового портфолио инженера: лицензии Creative Commons, защита авторских прав и подготовка публичного проекта.',
    difficulty: 'Новичок',
    xpReward: 90,
    currencyReward: 30,
    status: 'open',
    theory: `
      <div class="space-y-4">
        <div class="p-3 bg-gradient-to-r from-emerald-950/80 to-teal-950/80 border-2 border-emerald-400/50 rounded-2xl flex items-center gap-3 shadow-lg">
          <div class="w-12 h-12 rounded-xl bg-emerald-500/20 border border-emerald-400 flex items-center justify-center text-2xl shrink-0 animate-pulse">
            💼
          </div>
          <div>
            <h3 class="text-base md:text-lg font-bold text-emerald-300">
              Лицензии Creative Commons (CC)
            </h3>
            <p class="text-xs text-slate-300">
              Нельзя просто взять картинку из поиска: она защищена копирайтом. Используй ресурсы со свободной лицензией CC BY (с указанием автора)!
            </p>
          </div>
        </div>
      </div>
    `,
    quizData: {
      question: 'Что означает значок лицензии «CC BY» рядом с музыкальным треком или спрайтом в интернете?',
      options: [
        'Использовать можно, указав автора',
        'Использовать можно только за плату',
        'Использовать запрещено без разрешения',
        'Использовать можно, автора указывать не нужно'
      ],
      correctIndex: 0,
      explanation: 'Лицензия Creative Commons Attribution (CC BY) разрешает свободное использование при сохранении ссылки на первоисточник.'
    }
  }
];
