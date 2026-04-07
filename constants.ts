
import { Task, StudentProgress, Achievement, CosmeticItem, Course, ComicChapter } from './types';

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500, 7500, 10000];

export const COURSES: Course[] = [
  {
    id: 'course_code100',
    title: 'CODE100: Мир Компьютера',
    description: 'Большое путешествие в мир информатики! Что такое информация, как устроен компьютер, алгоритмы, робот Робик и безопасность в сети.',
    icon: 'Bot',
    difficulty: 'Beginner',
    status: 'active',
    totalModules: 7,
    color: '#4ecdc4'
  },
  {
    id: 'course_cs101',
    title: 'CS101: Архитектура Матрицы',
    description: 'Полный курс подготовки Нетраннера. Железо, двоичный код, ОС, алгоритмы, структуры данных, сети и кибербезопасность.',
    icon: 'Cpu',
    difficulty: 'Beginner',
    status: 'active',
    totalModules: 7,
    color: '#00f3ff' // neonBlue
  },
  {
    id: 'course_lua101',
    title: 'LUA: Протоколы Дронов',
    description: 'Полный курс Lua: переменные, логика, функции, таблицы, алгоритмы, строки и модули.',
    icon: 'BrainCircuit',
    difficulty: 'Intermediate',
    status: 'active',
    totalModules: 7,
    color: '#5e60ce' // neonPurple
  },
  {
    id: 'course_py200',
    title: 'PY200: Нейро-Скриптинг',
    description: 'Полный курс Python: переменные, условия, циклы, функции, списки, словари, строки и финальный проект.',
    icon: 'Terminal',
    difficulty: 'Intermediate',
    status: 'active',
    totalModules: 7,
    color: '#fcee0a' // neonYellow
  },
  {
    id: 'course_web300',
    title: 'WEB300: Визуальный Взлом',
    description: 'Полный курс HTML/CSS: теги, стили, Flexbox, адаптивность, анимации, Grid и финальный проект.',
    icon: 'Globe',
    difficulty: 'Advanced',
    status: 'active',
    totalModules: 7,
    color: '#ff00ff' // neonPink
  },
  {
    id: 'course_alg101',
    title: 'ALG404: Запретные Протоколы',
    description: 'Полный курс алгоритмов: Big O, сортировки, рекурсия, стеки, поиск, графы и хеширование.',
    icon: 'BrainCircuit',
    difficulty: 'Intermediate',
    status: 'active',
    totalModules: 7,
    color: '#00ff41' // neonGreen
  },
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'ach_1', title: 'Hello World', description: 'Заверши первую миссию', icon: '🌱', condition: 'complete_1', type: 'cyber' },
  { id: 'ach_2', title: 'Бинарный Бог', description: 'Реши задачи на двоичный код без ошибок', icon: '01', condition: 'binary_master', type: 'cyber' },
  { id: 'ach_3', title: 'Админ Локалхоста', description: 'Успешно используй SSH в терминале', icon: '📟', condition: 'ssh_success', type: 'cyber' },
  { id: 'ach_4', title: 'Повелитель Змей', description: 'Используй цикл for в Python', icon: '🐍', condition: 'python_loop', type: 'cyber' },
  { id: 'ach_5', title: 'Рекурсия', description: 'Реши Ханойскую Башню', icon: '🗼', condition: 'hanoi_solved', type: 'cyber' },
  { id: 'ach_6', title: 'Кукловод', description: 'Напиши скрипт на Lua без ошибок', icon: '🧶', condition: 'lua_master', type: 'cyber' },
  { id: 'ach_7', title: 'Архитектор Интерфейсов', description: 'Создай свой первый CSS стиль', icon: '🎨', condition: 'css_master', type: 'cyber' },
  { id: 'ach_8', title: 'Оператор Функций', description: 'Создай свою функцию на Lua', icon: '𝑓', condition: 'lua_func', type: 'cyber' },
  { id: 'ach_code100', title: 'Исследователь Цифрового Мира', description: 'Пройди курс CODE100: Мир Компьютера полностью!', icon: '🌍', condition: 'code100_complete', type: 'cyber' },
  { id: 'ach_cs101', title: 'Нетраннер Матрицы', description: 'Пройди курс CS101: Архитектура Матрицы полностью!', icon: '🏆', condition: 'cs101_complete', type: 'cyber' },
  { id: 'ach_lua101', title: 'Повелитель Дронов', description: 'Пройди курс LUA: Протоколы Дронов полностью!', icon: '🤖', condition: 'lua101_complete', type: 'cyber' },
  { id: 'ach_py200', title: 'Нейро-Хакер', description: 'Пройди курс PY200: Нейро-Скриптинг полностью!', icon: '🐍', condition: 'py200_complete', type: 'cyber' },
  { id: 'ach_web300', title: 'Визуальный Взломщик', description: 'Пройди курс WEB300: Визуальный Взлом полностью!', icon: '🌐', condition: 'web300_complete', type: 'cyber' },
  { id: 'ach_alg404', title: 'Архитектор Протоколов', description: 'Пройди курс ALG404: Запретные Протоколы полностью!', icon: '🧠', condition: 'alg404_complete', type: 'cyber' },
];

export const COSMETICS: CosmeticItem[] = [
  // COLORS
  { id: 'col_default', type: 'droneColor', name: 'Неоновый Синий', value: '#00f3ff', unlockLevel: 1, cost: 0 },
  { id: 'col_green', type: 'droneColor', name: 'Матричный Зеленый', value: '#00ff41', unlockLevel: 2, cost: 100 },
  { id: 'col_pink', type: 'droneColor', name: 'Синтвейв Розовый', value: '#ff00ff', unlockLevel: 3, cost: 250 },
  { id: 'col_purple', type: 'droneColor', name: 'Войд Фиолетовый', value: '#5e60ce', unlockLevel: 4, cost: 400 },
  { id: 'col_yellow', type: 'droneColor', name: 'Кибер Желтый', value: '#fcee0a', unlockLevel: 5, cost: 500 },
  { id: 'col_red', type: 'droneColor', name: 'Системный Сбой', value: '#ff003c', unlockLevel: 7, cost: 1000 },
  { id: 'col_white', type: 'droneColor', name: 'Чистый Код', value: '#ffffff', unlockLevel: 10, cost: 2000 },
  
  // AVATARS (value = sprite folder ID in /public/avatars/)
  { id: 'av_1', type: 'avatar', name: 'Новичок', value: '1', unlockLevel: 1, cost: 0 },
  { id: 'av_2', type: 'avatar', name: 'Хакер', value: '2', unlockLevel: 2, cost: 150 },
  { id: 'av_3', type: 'avatar', name: 'Призрак', value: '3', unlockLevel: 3, cost: 300 },
  { id: 'av_4', type: 'avatar', name: 'Инженер', value: '4', unlockLevel: 4, cost: 400 },
  { id: 'av_5', type: 'avatar', name: 'Скаут', value: '5', unlockLevel: 5, cost: 500 },
  { id: 'av_6', type: 'avatar', name: 'Оперативник', value: '6', unlockLevel: 6, cost: 600 },
  { id: 'av_7', type: 'avatar', name: 'Снайпер', value: '7', unlockLevel: 7, cost: 750 },
  { id: 'av_8', type: 'avatar', name: 'Медик', value: '8', unlockLevel: 8, cost: 900 },
  { id: 'av_9', type: 'avatar', name: 'Сенсей', value: '9', unlockLevel: 9, cost: 1100 },
  { id: 'av_10', type: 'avatar', name: 'Командир', value: '10', unlockLevel: 10, cost: 1300 },
  { id: 'av_11', type: 'avatar', name: 'Архитектор', value: '11', unlockLevel: 11, cost: 1600 },
  { id: 'av_12', type: 'avatar', name: 'Легенда', value: '12', unlockLevel: 12, cost: 2000 },
];

export const MOCK_STUDENTS: StudentProgress[] = [
  {
    studentId: 's1',
    name: 'Нео Андерсон',
    tasksCompleted: 12,
    totalTasks: 84,
    totalXP: 4500,
    totalErrors: 3,
    level: 5,
    lastActive: '2 мин назад',
    streak: 3,
    courseProgress: [],
    skills: { loops: 80, variables: 90, logic: 75 }
  }
];

export const MOCK_TASKS: Task[] = [
  // =========================================================================
  // CODE100: МИР КОМПЬЮТЕРА — знакомство с информатикой (3-5 класс)
  // 7 модулей: Информатика, Информация, Компьютер, Алгоритмы,
  //            Робик, Данные и файлы, Интернет + Финал
  // =========================================================================

  // ── МОДУЛЬ 1: ЧТО ТАКОЕ ИНФОРМАТИКА? ─────────────────────────────────────
  {
    id: 'code100_m1_t1',
    courseId: 'course_code100',
    module: 'Модуль 1: Что такое информатика?',
    title: '🚀 Добро пожаловать в Информатику!',
    type: 'theory',
    description: 'Узнай, что изучает информатика и почему это самый важный предмет будущего!',
    difficulty: 'Новичок',
    xpReward: 25,
    currencyReward: 10,
    status: 'open',
    theory: `<div style="text-align:center;margin-bottom:20px">
  <p style="font-size:3em;margin:0">🚀</p>
  <h2 style="color:#4ecdc4;margin:8px 0">Информатика — наука о будущем!</h2>
</div>
<p style="font-size:1.1em;line-height:1.7">Привет, исследователь! Ты начинаешь <strong style="color:#4ecdc4">увлекательное путешествие</strong> в мир информатики. Но что это за наука?</p>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">🤔 Что такое информатика?</h3>
<div style="background:#0d1f2d;border:2px solid #4ecdc4;border-radius:12px;padding:16px;margin:12px 0">
  <p style="font-size:1.05em;line-height:1.7;margin:0;color:#ccc"><strong style="color:#ffe66d">Информатика</strong> — это наука о том, как <strong style="color:#4ecdc4">собирать</strong>, <strong style="color:#00ff41">хранить</strong>, <strong style="color:#ff6b6b">обрабатывать</strong> и <strong style="color:#00f3ff">передавать</strong> информацию с помощью компьютеров.</p>
</div>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">🌍 Информатика повсюду!</h3>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:16px 0">
  <div style="background:#0d1f2d;border:2px solid #00f3ff;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">🎮</p>
    <p style="color:#00f3ff;font-weight:bold;margin:6px 0 4px">Игры</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Minecraft, Roblox — всё создали программисты!</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #00ff41;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">📱</p>
    <p style="color:#00ff41;font-weight:bold;margin:6px 0 4px">Телефон</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Приложения, камера, музыка — информатика!</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ffe66d;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">🤖</p>
    <p style="color:#ffe66d;font-weight:bold;margin:6px 0 4px">Роботы</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Роботы-пылесосы, дроны, умные колонки</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ff6b6b;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">🏥</p>
    <p style="color:#ff6b6b;font-weight:bold;margin:6px 0 4px">Медицина</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Компьютер помогает врачам лечить!</p>
  </div>
</div>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">🧑‍💻 Кто такой программист?</h3>
<p style="line-height:1.7"><strong style="color:#4ecdc4">Программист</strong> — человек, который разговаривает с компьютером на специальном языке и пишет <strong style="color:#ffe66d">программы</strong> — инструкции, которые говорят компьютеру, что делать.</p>

<div style="background:#0d1f0d;border:2px solid #4ecdc4;border-radius:12px;padding:14px;margin-top:20px">
  <p style="color:#4ecdc4;font-weight:bold;margin-bottom:4px">🌟 Запомни!</p>
  <p style="margin:0;color:#a0ffa0">Информатика — это не просто «сидеть за компом». Это наука о том, как решать задачи, создавать новое и менять мир!</p>
</div>`
  },
  {
    id: 'code100_m1_q1',
    courseId: 'course_code100',
    module: 'Модуль 1: Что такое информатика?',
    title: '❓ Квиз: Что изучает информатика?',
    type: 'quiz',
    description: 'Проверим, запомнил ли ты!',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '🚀 Что изучает информатика?',
      options: ['Только компьютерные игры', 'Как собирать, хранить, обрабатывать и передавать информацию', 'Как починить компьютер', 'Только математику'],
      correctIndex: 1,
      explanation: 'Информатика — наука о работе с информацией: как её собирать, хранить, обрабатывать и передавать!'
    }
  },
  {
    id: 'code100_m1_t2',
    courseId: 'course_code100',
    module: 'Модуль 1: Что такое информатика?',
    title: '💪 Четыре суперсилы информатики',
    type: 'theory',
    description: 'Собирать, хранить, обрабатывать, передавать — что всё это значит?',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    theory: `<div style="text-align:center;margin-bottom:20px">
  <p style="font-size:3em;margin:0">💪</p>
  <h2 style="color:#4ecdc4;margin:8px 0">4 суперсилы информатики</h2>
</div>
<p style="font-size:1.05em;line-height:1.7">Информатика умеет делать с информацией четыре главных действия. Представь, что ты — секретный агент!</p>

<div style="display:flex;flex-direction:column;gap:12px;margin:20px 0">
  <div style="background:#0d1f2d;border:2px solid #00f3ff;border-radius:12px;padding:16px;display:flex;align-items:center;gap:14px">
    <div style="font-size:2.5em;min-width:50px;text-align:center">🔍</div>
    <div>
      <p style="color:#00f3ff;font-weight:bold;margin:0 0 4px;font-size:1.1em">1. Собирать</p>
      <p style="color:#aaa;margin:0;font-size:0.95em">Узнал новость, сфоткал, записал номер — <strong style="color:#ccc">собрал информацию</strong>!</p>
    </div>
  </div>
  <div style="background:#0d1f2d;border:2px solid #00ff41;border-radius:12px;padding:16px;display:flex;align-items:center;gap:14px">
    <div style="font-size:2.5em;min-width:50px;text-align:center">💾</div>
    <div>
      <p style="color:#00ff41;font-weight:bold;margin:0 0 4px;font-size:1.1em">2. Хранить</p>
      <p style="color:#aaa;margin:0;font-size:0.95em">Записал в тетрадь, сохранил файл — <strong style="color:#ccc">сохранил информацию</strong>!</p>
    </div>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ffe66d;border-radius:12px;padding:16px;display:flex;align-items:center;gap:14px">
    <div style="font-size:2.5em;min-width:50px;text-align:center">⚙️</div>
    <div>
      <p style="color:#ffe66d;font-weight:bold;margin:0 0 4px;font-size:1.1em">3. Обрабатывать</p>
      <p style="color:#aaa;margin:0;font-size:0.95em">Посчитал пример, отредактировал фото — <strong style="color:#ccc">обработал информацию</strong>!</p>
    </div>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ff6b6b;border-radius:12px;padding:16px;display:flex;align-items:center;gap:14px">
    <div style="font-size:2.5em;min-width:50px;text-align:center">📡</div>
    <div>
      <p style="color:#ff6b6b;font-weight:bold;margin:0 0 4px;font-size:1.1em">4. Передавать</p>
      <p style="color:#aaa;margin:0;font-size:0.95em">Отправил сообщение, показал рисунок — <strong style="color:#ccc">передал информацию</strong>!</p>
    </div>
  </div>
</div>

<div style="background:#0d1f0d;border:2px solid #4ecdc4;border-radius:12px;padding:14px;margin-top:16px">
  <p style="color:#4ecdc4;font-weight:bold;margin-bottom:4px">💡 Пример из жизни:</p>
  <p style="margin:0;color:#a0ffa0">Учитель <strong>собрал</strong> оценки, <strong>записал</strong> в журнал, <strong>посчитал</strong> средний балл, <strong>отправил</strong> родителям. Вот и информатика!</p>
</div>`
  },
  {
    id: 'code100_m1_b1',
    courseId: 'course_code100',
    module: 'Модуль 1: Что такое информатика?',
    title: '🧩 Расставь суперсилы по порядку!',
    type: 'blocks',
    description: 'В каком порядке агент работает с информацией?',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['🔍 Собрать информацию', '💾 Сохранить информацию', '⚙️ Обработать информацию', '📡 Передать информацию'],
      correctSequence: ['🔍 Собрать информацию', '💾 Сохранить информацию', '⚙️ Обработать информацию', '📡 Передать информацию'],
      theme: 'robot',
      successMessage: 'Отлично! Собрать → Сохранить → Обработать → Передать! Ты настоящий информатик! 🎉',
      illustration: `<div style="padding:16px;text-align:center">
  <p style="color:#4ecdc4;font-weight:bold;margin-bottom:12px;font-size:0.9em">🕵️ Миссия агента: расставь действия по порядку!</p>
  <div style="display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap">
    <div style="background:#111;border:2px solid #00f3ff;border-radius:12px;padding:10px 14px;text-align:center">
      <div style="font-size:1.6em">🔍</div><div style="color:#888;font-size:0.75em;margin-top:4px">Шаг 1</div>
    </div>
    <div style="color:#4ecdc4;font-size:1.4em">→</div>
    <div style="background:#111;border:2px solid #555;border-radius:12px;padding:10px 14px;text-align:center">
      <div style="font-size:1.6em">❓</div><div style="color:#888;font-size:0.75em;margin-top:4px">Шаг 2</div>
    </div>
    <div style="color:#4ecdc4;font-size:1.4em">→</div>
    <div style="background:#111;border:2px solid #555;border-radius:12px;padding:10px 14px;text-align:center">
      <div style="font-size:1.6em">❓</div><div style="color:#888;font-size:0.75em;margin-top:4px">Шаг 3</div>
    </div>
    <div style="color:#4ecdc4;font-size:1.4em">→</div>
    <div style="background:#111;border:2px solid #ff6b6b;border-radius:12px;padding:10px 14px;text-align:center">
      <div style="font-size:1.6em">📡</div><div style="color:#888;font-size:0.75em;margin-top:4px">Шаг 4</div>
    </div>
  </div>
</div>`
    }
  },
  {
    id: 'code100_m1_q2',
    courseId: 'course_code100',
    module: 'Модуль 1: Что такое информатика?',
    title: '❓ Квиз: Кто такой программист?',
    type: 'quiz',
    description: 'Проверим, запомнил ли ты!',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '🧑‍💻 Кто такой программист?',
      options: ['Человек, который чинит компьютеры', 'Человек, который пишет инструкции (программы) для компьютера', 'Человек, который продаёт компьютеры', 'Человек, который играет в игры'],
      correctIndex: 1,
      explanation: 'Программист пишет программы — наборы команд, которые говорят компьютеру, что делать!'
    }
  },

  // ── МОДУЛЬ 2: ЧТО ТАКОЕ ИНФОРМАЦИЯ? ──────────────────────────────────────
  {
    id: 'code100_m2_t1',
    courseId: 'course_code100',
    module: 'Модуль 2: Что такое информация?',
    title: '📡 Информация вокруг нас!',
    type: 'theory',
    description: 'Что такое информация и как мы её получаем каждый день!',
    difficulty: 'Новичок',
    xpReward: 25,
    currencyReward: 10,
    status: 'locked',
    theory: `<div style="text-align:center;margin-bottom:20px">
  <p style="font-size:3em;margin:0">📡</p>
  <h2 style="color:#4ecdc4;margin:8px 0">Информация — это знания!</h2>
</div>
<p style="font-size:1.1em;line-height:1.7"><strong style="color:#ffe66d">Информация</strong> — это сведения об окружающем мире. Всё, что ты узнаёшь, видишь, слышишь, читаешь — это информация!</p>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">👀 Как мы получаем информацию?</h3>
<p style="line-height:1.7">У человека <strong style="color:#4ecdc4">5 органов чувств</strong>:</p>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:16px 0">
  <div style="background:#0d1f2d;border:2px solid #00f3ff;border-radius:12px;padding:12px;text-align:center">
    <p style="font-size:2em;margin:0">👀</p>
    <p style="color:#00f3ff;font-weight:bold;margin:6px 0 2px">Зрение</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Видим цвета, формы, буквы</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #00ff41;border-radius:12px;padding:12px;text-align:center">
    <p style="font-size:2em;margin:0">👂</p>
    <p style="color:#00ff41;font-weight:bold;margin:6px 0 2px">Слух</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Слышим звуки, музыку, речь</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ffe66d;border-radius:12px;padding:12px;text-align:center">
    <p style="font-size:2em;margin:0">👃</p>
    <p style="color:#ffe66d;font-weight:bold;margin:6px 0 2px">Обоняние</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Чувствуем запахи</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ff6b6b;border-radius:12px;padding:12px;text-align:center">
    <p style="font-size:2em;margin:0">👅</p>
    <p style="color:#ff6b6b;font-weight:bold;margin:6px 0 2px">Вкус</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Сладкое, кислое, солёное</p>
  </div>
</div>
<div style="background:#0d1f2d;border:2px solid #ff00ff;border-radius:12px;padding:12px;text-align:center;margin-bottom:12px">
  <p style="font-size:2em;margin:0">✋</p>
  <p style="color:#ff00ff;font-weight:bold;margin:6px 0 2px">Осязание</p>
  <p style="color:#88a;font-size:0.85em;margin:0">Горячо, холодно, гладко, колючее</p>
</div>

<div style="background:#0d1f2d;border:2px solid #ffe66d;border-radius:12px;padding:16px;margin-top:16px">
  <p style="color:#ffe66d;font-weight:bold;margin-bottom:8px">🏆 Знаешь ли ты?</p>
  <p style="margin:0;color:#ccc;line-height:1.6">Больше всего информации мы получаем через <strong style="color:#00f3ff">зрение</strong> — целых 80%!</p>
</div>

<div style="background:#0d1f0d;border:2px solid #4ecdc4;border-radius:12px;padding:14px;margin-top:16px">
  <p style="color:#4ecdc4;font-weight:bold;margin-bottom:4px">🌟 Запомни!</p>
  <p style="margin:0;color:#a0ffa0">Информация — любые сведения, которые мы получаем через органы чувств, из книг, интернета и от других людей!</p>
</div>`
  },
  {
    id: 'code100_m2_q1',
    courseId: 'course_code100',
    module: 'Модуль 2: Что такое информация?',
    title: '❓ Квиз: Органы чувств',
    type: 'quiz',
    description: 'Через какое чувство мы получаем больше всего информации?',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '👀 Через какой орган чувств человек получает БОЛЬШЕ ВСЕГО информации?',
      options: ['Слух (уши)', 'Зрение (глаза)', 'Обоняние (нос)', 'Осязание (кожа)'],
      correctIndex: 1,
      explanation: 'Через зрение мы получаем около 80% всей информации!'
    }
  },
  {
    id: 'code100_m2_t2',
    courseId: 'course_code100',
    module: 'Модуль 2: Что такое информация?',
    title: '🔢 Секретный язык компьютера!',
    type: 'theory',
    description: 'Компьютер знает только два числа — 0 и 1! Как он понимает буквы и картинки?',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    theory: `<div style="text-align:center;margin-bottom:20px">
  <p style="font-size:3em;margin:0">🔢</p>
  <h2 style="color:#4ecdc4;margin:8px 0">Секретный язык: 0 и 1!</h2>
</div>
<p style="font-size:1.1em;line-height:1.7">Мы говорим словами, а компьютер «говорит» только двумя цифрами: <strong style="color:#00ff41;font-size:1.2em">0</strong> и <strong style="color:#ff6b6b;font-size:1.2em">1</strong>. Это как выключатель: <strong style="color:#00ff41">включено</strong> (1) или <strong style="color:#ff6b6b">выключено</strong> (0).</p>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">💡 Бит — самый маленький кусочек</h3>
<div style="display:flex;gap:16px;justify-content:center;margin:16px 0">
  <div style="background:#0d1f2d;border:2px solid #00ff41;border-radius:12px;padding:16px 24px;text-align:center">
    <p style="font-size:2em;font-weight:bold;color:#00ff41;margin:0">1</p>
    <p style="color:#88a;font-size:0.85em;margin:4px 0 0">Включено! 💡</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ff6b6b;border-radius:12px;padding:16px 24px;text-align:center">
    <p style="font-size:2em;font-weight:bold;color:#ff6b6b;margin:0">0</p>
    <p style="color:#88a;font-size:0.85em;margin:4px 0 0">Выключено! 🌑</p>
  </div>
</div>
<p style="line-height:1.7">Один <strong style="color:#ffe66d">бит</strong> — одна ячейка: 0 или 1. Из битов компьютер строит всё!</p>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">📦 Байт = 8 бит</h3>
<p style="line-height:1.7">Один <strong style="color:#4ecdc4">байт</strong> — это 8 бит. Хватает запомнить одну букву!</p>
<div style="background:#0d1f2d;border-radius:12px;padding:16px;margin:12px 0;text-align:center">
  <p style="font-family:monospace;font-size:1.3em;color:#00ff41;margin:0 0 8px;letter-spacing:4px">01000001</p>
  <p style="color:#ffe66d;font-weight:bold;margin:0;font-size:1.1em">= буква «A»</p>
</div>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">📏 Размеры информации</h3>
<div style="background:#0d1f2d;border:2px solid #00f3ff;border-radius:12px;padding:16px;margin:12px 0">
  <div style="display:flex;align-items:center;gap:10px;margin:6px 0"><span style="color:#00f3ff;font-weight:bold;min-width:120px">1 байт</span><span style="color:#ccc">= одна буква</span></div>
  <div style="display:flex;align-items:center;gap:10px;margin:6px 0"><span style="color:#00ff41;font-weight:bold;min-width:120px">1 килобайт</span><span style="color:#ccc">= короткий рассказ</span></div>
  <div style="display:flex;align-items:center;gap:10px;margin:6px 0"><span style="color:#ffe66d;font-weight:bold;min-width:120px">1 мегабайт</span><span style="color:#ccc">= фотография или песня</span></div>
  <div style="display:flex;align-items:center;gap:10px;margin:6px 0"><span style="color:#ff6b6b;font-weight:bold;min-width:120px">1 гигабайт</span><span style="color:#ccc">= фильм или большая игра</span></div>
</div>

<div style="background:#0d1f0d;border:2px solid #4ecdc4;border-radius:12px;padding:14px;margin-top:16px">
  <p style="color:#4ecdc4;font-weight:bold;margin-bottom:4px">🌟 Запомни!</p>
  <p style="margin:0;color:#a0ffa0">Компьютер хранит ВСЮ информацию в виде нулей и единиц!</p>
</div>`
  },
  {
    id: 'code100_m2_q2',
    courseId: 'course_code100',
    module: 'Модуль 2: Что такое информация?',
    title: '❓ Квиз: Биты и байты',
    type: 'quiz',
    description: 'Сколько бит в одном байте?',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '💡 Сколько бит в одном байте?',
      options: ['2', '4', '8', '10'],
      correctIndex: 2,
      explanation: 'В одном байте 8 бит! Этого хватает, чтобы закодировать одну букву.'
    }
  },
  {
    id: 'code100_m2_b1',
    courseId: 'course_code100',
    module: 'Модуль 2: Что такое информация?',
    title: '🧩 Виды информации по весу!',
    type: 'blocks',
    description: 'Расставь виды информации от самой лёгкой к самой тяжёлой для компьютера!',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['📝 Текст (лёгкий)', '📸 Картинка (средняя)', '🎵 Музыка (тяжелее)', '🎬 Видео (самое тяжёлое)'],
      correctSequence: ['📝 Текст (лёгкий)', '📸 Картинка (средняя)', '🎵 Музыка (тяжелее)', '🎬 Видео (самое тяжёлое)'],
      theme: 'art',
      successMessage: 'Верно! Текст занимает мало места, а видео — очень много! 🎬',
      illustration: `<div style="padding:16px;text-align:center">
  <p style="color:#ffe66d;font-weight:bold;margin-bottom:12px;font-size:0.9em">📊 Что весит больше? От лёгкого к тяжёлому!</p>
  <div style="display:flex;align-items:flex-end;justify-content:center;gap:12px;margin-top:8px">
    <div style="text-align:center"><div style="background:#00f3ff;width:30px;height:20px;border-radius:4px 4px 0 0;margin:0 auto"></div><p style="color:#888;font-size:0.7em;margin:4px 0 0">📝</p></div>
    <div style="text-align:center"><div style="background:#00ff41;width:30px;height:40px;border-radius:4px 4px 0 0;margin:0 auto"></div><p style="color:#888;font-size:0.7em;margin:4px 0 0">📸</p></div>
    <div style="text-align:center"><div style="background:#ffe66d;width:30px;height:60px;border-radius:4px 4px 0 0;margin:0 auto"></div><p style="color:#888;font-size:0.7em;margin:4px 0 0">🎵</p></div>
    <div style="text-align:center"><div style="background:#ff6b6b;width:30px;height:90px;border-radius:4px 4px 0 0;margin:0 auto"></div><p style="color:#888;font-size:0.7em;margin:4px 0 0">🎬</p></div>
  </div>
</div>`
    }
  },
  {
    id: 'code100_m2_q3',
    courseId: 'course_code100',
    module: 'Модуль 2: Что такое информация?',
    title: '❓ Квиз: Что тяжелее?',
    type: 'quiz',
    description: 'Что занимает больше места на компьютере?',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '📊 Что занимает БОЛЬШЕ места на компьютере?',
      options: ['Одна буква', 'Фотография', 'Фильм (видео)', 'Одно число'],
      correctIndex: 2,
      explanation: 'Фильм — картинки + звук! Он может занимать гигабайты, а буква — всего 1 байт.'
    }
  },

  // ── МОДУЛЬ 3: ИЗ ЧЕГО СОСТОИТ КОМПЬЮТЕР? ─────────────────────────────────
  {
    id: 'code100_m3_t1',
    courseId: 'course_code100',
    module: 'Модуль 3: Из чего состоит компьютер?',
    title: '🖥️ Знакомьтесь — Компьютер!',
    type: 'theory',
    description: 'Узнай, из каких частей состоит компьютер и зачем каждая нужна!',
    difficulty: 'Новичок',
    xpReward: 25,
    currencyReward: 10,
    status: 'locked',
    theory: `<div style="text-align:center;margin-bottom:20px">
  <p style="font-size:3em;margin:0">🖥️</p>
  <h2 style="color:#4ecdc4;margin:8px 0">Привет! Я — Компьютер!</h2>
</div>
<p style="font-size:1.1em;line-height:1.7">Компьютер — это <strong style="color:#4ecdc4">умная машина</strong>, которая умеет считать, показывать картинки, играть музыку и общаться! Но без <strong style="color:#ffe66d">команд от тебя</strong> он просто стоит.</p>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">🧩 Из чего я состою?</h3>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:12px;margin:16px 0">
  <div style="background:#0d1f2d;border:2px solid #00f3ff;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">🧠</p>
    <p style="color:#00f3ff;font-weight:bold;margin:6px 0 4px">Процессор (CPU)</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Мозг компьютера. Думает и считает!</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #00ff41;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">📝</p>
    <p style="color:#00ff41;font-weight:bold;margin:6px 0 4px">Память (RAM)</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Блокнот. Помнит, пока включён!</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ffe66d;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">💾</p>
    <p style="color:#ffe66d;font-weight:bold;margin:6px 0 4px">Диск (SSD/HDD)</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Шкаф. Хранит файлы навсегда!</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ff6b6b;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">🖥️</p>
    <p style="color:#ff6b6b;font-weight:bold;margin:6px 0 4px">Монитор</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Экран. Показывает картинку!</p>
  </div>
</div>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">🎮 Ввод и вывод</h3>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin:12px 0">
  <div style="flex:1;min-width:140px;background:#0a1a0a;border:2px solid #00ff41;border-radius:12px;padding:14px;text-align:center">
    <p style="color:#00ff41;font-weight:bold;margin:0 0 8px">📥 ВВОД</p>
    <p style="color:#aaa;font-size:0.9em;margin:4px 0">⌨️ Клавиатура</p>
    <p style="color:#aaa;font-size:0.9em;margin:4px 0">🖱️ Мышка</p>
    <p style="color:#aaa;font-size:0.9em;margin:4px 0">🎤 Микрофон</p>
  </div>
  <div style="flex:1;min-width:140px;background:#0d0a1f;border:2px solid #00f3ff;border-radius:12px;padding:14px;text-align:center">
    <p style="color:#00f3ff;font-weight:bold;margin:0 0 8px">📤 ВЫВОД</p>
    <p style="color:#aaa;font-size:0.9em;margin:4px 0">🖥️ Монитор</p>
    <p style="color:#aaa;font-size:0.9em;margin:4px 0">🔊 Колонки</p>
    <p style="color:#aaa;font-size:0.9em;margin:4px 0">🖨️ Принтер</p>
  </div>
</div>

<div style="background:#0d1f0d;border:2px solid #4ecdc4;border-radius:12px;padding:14px;margin-top:20px">
  <p style="color:#4ecdc4;font-weight:bold;margin-bottom:4px">🌟 Запомни!</p>
  <p style="margin:0;color:#a0ffa0">Ввод — ты говоришь компьютеру. Вывод — компьютер отвечает тебе!</p>
</div>`
  },
  {
    id: 'code100_m3_q1',
    courseId: 'course_code100',
    module: 'Модуль 3: Из чего состоит компьютер?',
    title: '❓ Квиз: Мозг компьютера',
    type: 'quiz',
    description: 'Что является мозгом компьютера?',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '🧠 Что является «мозгом» компьютера?',
      options: ['Монитор', 'Клавиатура', 'Процессор (CPU)', 'Мышка'],
      correctIndex: 2,
      explanation: 'Процессор — мозг компьютера! Он думает и считает миллиарды раз в секунду.'
    }
  },
  {
    id: 'code100_m3_q2',
    courseId: 'course_code100',
    module: 'Модуль 3: Из чего состоит компьютер?',
    title: '❓ Квиз: Ввод или вывод?',
    type: 'quiz',
    description: 'Клавиатура — ввод или вывод?',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '⌨️ Клавиатура — это устройство...',
      options: ['Вывода', 'Ввода', 'Хранения', 'Обработки'],
      correctIndex: 1,
      explanation: 'Клавиатура — устройство ВВОДА! Мы нажимаем клавиши и отправляем команды компьютеру.'
    }
  },
  {
    id: 'code100_m3_b1',
    courseId: 'course_code100',
    module: 'Модуль 3: Из чего состоит компьютер?',
    title: '🧩 Собери цепочку работы компьютера!',
    type: 'blocks',
    description: 'Как компьютер обрабатывает информацию? Расставь по порядку!',
    difficulty: 'Новичок',
    xpReward: 35,
    currencyReward: 15,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['⌨️ Нажимаем клавишу (ВВОД)', '🧠 Процессор думает (ОБРАБОТКА)', '📝 Сохраняет в памяти (ХРАНЕНИЕ)', '🖥️ Показывает на экране (ВЫВОД)'],
      correctSequence: ['⌨️ Нажимаем клавишу (ВВОД)', '🧠 Процессор думает (ОБРАБОТКА)', '📝 Сохраняет в памяти (ХРАНЕНИЕ)', '🖥️ Показывает на экране (ВЫВОД)'],
      theme: 'robot',
      successMessage: 'Ура! Ввод → Обработка → Хранение → Вывод! 🎉',
      illustration: `<div style="padding:16px;text-align:center">
  <p style="color:#00f3ff;font-weight:bold;margin-bottom:12px;font-size:0.9em">📌 Как работает компьютер?</p>
  <div style="display:flex;align-items:center;justify-content:center;gap:8px;flex-wrap:wrap">
    <div style="background:#111;border:2px solid #00ff41;border-radius:12px;padding:10px 14px;text-align:center">
      <div style="font-size:1.6em">⌨️</div><div style="color:#888;font-size:0.75em;margin-top:4px">Ввод</div>
    </div>
    <div style="color:#00f3ff;font-size:1.4em">→</div>
    <div style="background:#111;border:2px solid #555;border-radius:12px;padding:10px 14px;text-align:center">
      <div style="font-size:1.6em">❓</div><div style="color:#888;font-size:0.75em;margin-top:4px">???</div>
    </div>
    <div style="color:#00f3ff;font-size:1.4em">→</div>
    <div style="background:#111;border:2px solid #555;border-radius:12px;padding:10px 14px;text-align:center">
      <div style="font-size:1.6em">❓</div><div style="color:#888;font-size:0.75em;margin-top:4px">???</div>
    </div>
    <div style="color:#00f3ff;font-size:1.4em">→</div>
    <div style="background:#111;border:2px solid #00f3ff;border-radius:12px;padding:10px 14px;text-align:center">
      <div style="font-size:1.6em">🖥️</div><div style="color:#888;font-size:0.75em;margin-top:4px">Вывод</div>
    </div>
  </div>
</div>`
    }
  },
  {
    id: 'code100_m3_q3',
    courseId: 'course_code100',
    module: 'Модуль 3: Из чего состоит компьютер?',
    title: '❓ Квиз: RAM или Диск?',
    type: 'quiz',
    description: 'Что забывает всё при выключении?',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '💾 Что забывает всё, когда компьютер выключается?',
      options: ['Жёсткий диск (SSD)', 'Оперативная память (RAM)', 'Флешка', 'Монитор'],
      correctIndex: 1,
      explanation: 'RAM — быстрая, но забывает всё при выключении! Диск хранит файлы навсегда.'
    }
  },

  // ── МОДУЛЬ 4: АЛГОРИТМЫ ВОКРУГ НАС ──────────────────────────────────────
  {
    id: 'code100_m4_t1',
    courseId: 'course_code100',
    module: 'Модуль 4: Алгоритмы вокруг нас',
    title: '📋 Что такое алгоритм?',
    type: 'theory',
    description: 'Алгоритмы повсюду! Даже когда ты чистишь зубы.',
    difficulty: 'Новичок',
    xpReward: 25,
    currencyReward: 10,
    status: 'locked',
    theory: `<div style="text-align:center;margin-bottom:20px">
  <p style="font-size:3em;margin:0">📋</p>
  <h2 style="color:#4ecdc4;margin:8px 0">Алгоритм — это план!</h2>
</div>
<p style="font-size:1.1em;line-height:1.7"><strong style="color:#ffe66d">Алгоритм</strong> — это пошаговая инструкция для решения задачи. Как рецепт пирога или правила настолки!</p>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">🪥 Алгоритм: Чистим зубы</h3>
<div style="background:#0d1f2d;border:2px solid #00f3ff;border-radius:12px;padding:16px;margin:12px 0">
  <div style="display:flex;align-items:center;gap:10px;margin:8px 0"><span style="background:#00f3ff;color:black;font-weight:bold;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.85em">1</span><span style="color:#ccc">Берём зубную щётку</span></div>
  <div style="display:flex;align-items:center;gap:10px;margin:8px 0"><span style="background:#00f3ff;color:black;font-weight:bold;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.85em">2</span><span style="color:#ccc">Наносим пасту</span></div>
  <div style="display:flex;align-items:center;gap:10px;margin:8px 0"><span style="background:#00f3ff;color:black;font-weight:bold;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.85em">3</span><span style="color:#ccc">Чистим 2 минуты</span></div>
  <div style="display:flex;align-items:center;gap:10px;margin:8px 0"><span style="background:#00f3ff;color:black;font-weight:bold;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.85em">4</span><span style="color:#ccc">Полощем рот</span></div>
</div>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">⚠️ Порядок ВАЖЕН!</h3>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin:12px 0">
  <div style="flex:1;min-width:150px;background:#1a0a0a;border:2px solid #ff4444;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:1.5em;margin:0">❌</p>
    <p style="color:#ff6b6b;font-size:0.9em;margin:6px 0 0">Сначала паста, потом щётка? Беда!</p>
  </div>
  <div style="flex:1;min-width:150px;background:#0a1a0a;border:2px solid #00ff41;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:1.5em;margin:0">✅</p>
    <p style="color:#00ff41;font-size:0.9em;margin:6px 0 0">Щётка → Паста → Чистим → Полощем!</p>
  </div>
</div>

<div style="background:#0d1f0d;border:2px solid #4ecdc4;border-radius:12px;padding:14px;margin-top:20px">
  <p style="color:#4ecdc4;font-weight:bold;margin-bottom:4px">🌟 Запомни!</p>
  <p style="margin:0;color:#a0ffa0">Алгоритм = шаги по порядку. Неправильный порядок — неправильный результат!</p>
</div>`
  },
  {
    id: 'code100_m4_b1',
    courseId: 'course_code100',
    module: 'Модуль 4: Алгоритмы вокруг нас',
    title: '🥪 Собери бутерброд!',
    type: 'blocks',
    description: 'Расставь шаги в правильном порядке!',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['🍞 Возьми хлеб', '🧈 Намажь масло', '🧀 Положи сыр', '🍞 Накрой вторым кусочком'],
      correctSequence: ['🍞 Возьми хлеб', '🧈 Намажь масло', '🧀 Положи сыр', '🍞 Накрой вторым кусочком'],
      theme: 'recipe',
      successMessage: 'Вкусный бутерброд готов! Ты отличный алгоритмист! 🥪',
      illustration: `<div style="padding:16px;text-align:center">
  <p style="color:#ff6b6b;font-weight:bold;margin-bottom:12px;font-size:0.9em">🥪 Собери бутерброд слой за слоем!</p>
  <div style="display:flex;flex-direction:column;align-items:center;gap:4px">
    <div style="background:#c8a55a;border-radius:12px 12px 4px 4px;padding:6px 40px;font-size:0.8em;color:#4a3520">🍞 ?</div>
    <div style="background:#f0e68c;border-radius:4px;padding:4px 36px;font-size:0.8em;color:#666">🧀 ?</div>
    <div style="background:#fffacd;border-radius:4px;padding:4px 32px;font-size:0.8em;color:#666">🧈 ?</div>
    <div style="background:#c8a55a;border-radius:4px 4px 12px 12px;padding:6px 40px;font-size:0.8em;color:#4a3520">🍞 ?</div>
  </div>
</div>`
    }
  },
  {
    id: 'code100_m4_q1',
    courseId: 'course_code100',
    module: 'Модуль 4: Алгоритмы вокруг нас',
    title: '❓ Квиз: Что такое алгоритм?',
    type: 'quiz',
    description: 'Проверим, понял ли ты!',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '📋 Что такое алгоритм?',
      options: ['Вид компьютера', 'Пошаговая инструкция', 'Название игры', 'Часть клавиатуры'],
      correctIndex: 1,
      explanation: 'Алгоритм — пошаговая инструкция для решения задачи. Как рецепт!'
    }
  },
  {
    id: 'code100_m4_b2',
    courseId: 'course_code100',
    module: 'Модуль 4: Алгоритмы вокруг нас',
    title: '☀️ Утреннее расписание!',
    type: 'blocks',
    description: 'Составь правильный алгоритм сбора в школу!',
    difficulty: 'Новичок',
    xpReward: 35,
    currencyReward: 15,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['⏰ Проснуться', '🪥 Почистить зубы', '👕 Одеться', '🎒 Взять рюкзак', '🚶 Пойти в школу'],
      correctSequence: ['⏰ Проснуться', '🪥 Почистить зубы', '👕 Одеться', '🎒 Взять рюкзак', '🚶 Пойти в школу'],
      theme: 'morning',
      successMessage: 'Отличный алгоритм! Ты точно не опоздаешь! ☀️',
      illustration: `<div style="padding:16px;text-align:center">
  <p style="color:#ffe66d;font-weight:bold;margin-bottom:12px;font-size:0.9em">☀️ Утро школьника — что за чем?</p>
  <div style="display:flex;align-items:center;justify-content:center;gap:6px;flex-wrap:wrap">
    <div style="background:#111;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:1.4em;border:2px solid #ffe66d">🛏️</div>
    <div style="color:#ffe66d;font-size:1.2em">→</div>
    <div style="background:#111;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:1.4em;border:2px solid #555">❓</div>
    <div style="color:#ffe66d;font-size:1.2em">→</div>
    <div style="background:#111;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:1.4em;border:2px solid #555">❓</div>
    <div style="color:#ffe66d;font-size:1.2em">→</div>
    <div style="background:#111;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:1.4em;border:2px solid #555">❓</div>
    <div style="color:#ffe66d;font-size:1.2em">→</div>
    <div style="background:#111;border-radius:50%;width:44px;height:44px;display:flex;align-items:center;justify-content:center;font-size:1.4em;border:2px solid #ffe66d">🏫</div>
  </div>
</div>`
    }
  },

  // ── МОДУЛЬ 5: УПРАВЛЯЕМ РОБИКОМ! ─────────────────────────────────────────
  {
    id: 'code100_m5_t1',
    courseId: 'course_code100',
    module: 'Модуль 5: Управляем Робиком!',
    title: '🤖 Познакомься с Робиком!',
    type: 'theory',
    description: 'Робик — твой робот. Научись давать ему команды!',
    difficulty: 'Новичок',
    xpReward: 25,
    currencyReward: 10,
    status: 'locked',
    theory: `<div style="text-align:center;margin-bottom:20px">
  <p style="font-size:3em;margin:0">🤖</p>
  <h2 style="color:#4ecdc4;margin:8px 0">Это Робик!</h2>
  <p style="color:#888;font-size:0.95em">Он умный, но без команд — просто стоит на месте.</p>
</div>
<p style="font-size:1.1em;line-height:1.7">Робик живёт на <strong style="color:#4ecdc4">сетке</strong> — как на шахматной доске. Он двигается по клеткам, но только если ты скажешь!</p>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">🕹️ Команды Робика</h3>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:16px 0">
  <div style="background:#0d1f2d;border:2px solid #00f3ff;border-radius:12px;padding:12px;text-align:center">
    <p style="font-size:1.8em;margin:0">⬆️</p>
    <p style="color:#00f3ff;font-weight:bold;margin:4px 0;font-family:monospace">moveUp();</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #00ff41;border-radius:12px;padding:12px;text-align:center">
    <p style="font-size:1.8em;margin:0">⬇️</p>
    <p style="color:#00ff41;font-weight:bold;margin:4px 0;font-family:monospace">moveDown();</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ffe66d;border-radius:12px;padding:12px;text-align:center">
    <p style="font-size:1.8em;margin:0">⬅️</p>
    <p style="color:#ffe66d;font-weight:bold;margin:4px 0;font-family:monospace">moveLeft();</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ff6b6b;border-radius:12px;padding:12px;text-align:center">
    <p style="font-size:1.8em;margin:0">➡️</p>
    <p style="color:#ff6b6b;font-weight:bold;margin:4px 0;font-family:monospace">moveRight();</p>
  </div>
</div>

<div style="background:#0d1f0d;border:2px solid #4ecdc4;border-radius:12px;padding:14px;margin-top:20px">
  <p style="color:#4ecdc4;font-weight:bold;margin-bottom:4px">🌟 Совет!</p>
  <p style="margin:0;color:#a0ffa0">Сначала посчитай клетки на сетке, потом пиши команды. Как настоящий программист!</p>
</div>`
  },
  {
    id: 'code100_m5_b1',
    courseId: 'course_code100',
    module: 'Модуль 5: Управляем Робиком!',
    title: '🧩 Составь маршрут!',
    type: 'blocks',
    description: 'Собери команды, чтобы Робик дошёл до звезды!',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['➡️ Шаг вправо', '➡️ Шаг вправо', '⬇️ Шаг вниз', '⬇️ Шаг вниз'],
      correctSequence: ['➡️ Шаг вправо', '➡️ Шаг вправо', '⬇️ Шаг вниз', '⬇️ Шаг вниз'],
      theme: 'robot',
      successMessage: 'Робик дошёл до звезды! ⭐ Отличная программа!',
      gridMap: { cols: 3, rows: 3, start: [0, 0], goal: [2, 2], path: [[0, 1], [0, 2], [1, 2]] }
    }
  },
  {
    id: 'code100_m5_p1',
    courseId: 'course_code100',
    module: 'Модуль 5: Управляем Робиком!',
    title: '🎮 Проведи Робика!',
    type: 'grid',
    description: 'Напиши команды и проведи Робика до зелёной клетки!',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 15,
    status: 'locked',
    allowedCommands: ['moveRight();', 'moveDown();', 'moveLeft();', 'moveUp();'],
    initialCode: '// Проведи Робика до зелёной клетки!\nmoveRight();\nmoveRight();\nmoveDown();\n',
    mapConfig: { gridSize: 4, start: [0, 0], end: [3, 3], obstacles: [[1, 1], [2, 1]] }
  },
  {
    id: 'code100_m5_q1',
    courseId: 'course_code100',
    module: 'Модуль 5: Управляем Робиком!',
    title: '❓ Квиз: Куда придёт Робик?',
    type: 'quiz',
    description: 'Подумай, где окажется Робик после команд!',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '🤖 Робик в левом верхнем углу.\nОн выполнил: moveRight(); moveDown();\nГде он теперь?',
      options: ['В левом нижнем углу', 'На одну клетку вправо и вниз', 'На месте', 'В правом верхнем углу'],
      correctIndex: 1,
      explanation: 'moveRight — на 1 вправо, moveDown — на 1 вниз. Робик сместился по диагонали!'
    }
  },
  {
    id: 'code100_m5_p2',
    courseId: 'course_code100',
    module: 'Модуль 5: Управляем Робиком!',
    title: '🎮 Лабиринт Робика!',
    type: 'grid',
    description: 'Проведи Робика через лабиринт! Обходи препятствия!',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 20,
    status: 'locked',
    allowedCommands: ['moveRight();', 'moveDown();', 'moveLeft();', 'moveUp();'],
    initialCode: '// Обойди стены и доберись до цели!\nmoveDown();\n',
    mapConfig: { gridSize: 5, start: [0, 0], end: [4, 4], obstacles: [[1, 0], [1, 1], [3, 2], [3, 3], [3, 4]] }
  },

  // ── МОДУЛЬ 6: ДАННЫЕ И ФАЙЛЫ ─────────────────────────────────────────────
  {
    id: 'code100_m6_t1',
    courseId: 'course_code100',
    module: 'Модуль 6: Данные и файлы',
    title: '📊 Что такое данные?',
    type: 'theory',
    description: 'Узнай, что компьютер хранит и как!',
    difficulty: 'Новичок',
    xpReward: 25,
    currencyReward: 10,
    status: 'locked',
    theory: `<div style="text-align:center;margin-bottom:20px">
  <p style="font-size:3em;margin:0">📊</p>
  <h2 style="color:#4ecdc4;margin:8px 0">Данные — это информация!</h2>
</div>
<p style="font-size:1.1em;line-height:1.7">Всё, что компьютер хранит — это <strong style="color:#ffe66d">данные</strong>. Фотографии, музыка, текст, числа — всё это данные!</p>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">📁 Виды данных</h3>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:16px 0">
  <div style="background:#0d1f2d;border:2px solid #00f3ff;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">🔢</p>
    <p style="color:#00f3ff;font-weight:bold;margin:6px 0 4px">Числа</p>
    <p style="color:#88a;font-size:0.85em;margin:0">42, 100, 3+2=5</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #00ff41;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">📝</p>
    <p style="color:#00ff41;font-weight:bold;margin:6px 0 4px">Текст</p>
    <p style="color:#88a;font-size:0.85em;margin:0">"Привет!", "Маша"</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ffe66d;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">📸</p>
    <p style="color:#ffe66d;font-weight:bold;margin:6px 0 4px">Картинки</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Фото, рисунки, мемы</p>
  </div>
  <div style="background:#0d1f2d;border:2px solid #ff6b6b;border-radius:12px;padding:14px;text-align:center">
    <p style="font-size:2em;margin:0">🎵</p>
    <p style="color:#ff6b6b;font-weight:bold;margin:6px 0 4px">Звуки</p>
    <p style="color:#88a;font-size:0.85em;margin:0">Музыка, голос, звонок</p>
  </div>
</div>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">📦 Файлы и папки</h3>
<p>Компьютер хранит данные в <strong style="color:#4ecdc4">файлах</strong>. Файлы лежат в <strong style="color:#4ecdc4">папках</strong> — как тетрадки в портфеле!</p>
<div style="background:#0d1f2d;border:2px solid #00f3ff;border-radius:12px;padding:16px;margin:12px 0">
  <p style="margin:6px 0;color:#ccc">📁 Мои документы</p>
  <p style="margin:6px 0 6px 20px;color:#ccc">📁 Школа</p>
  <p style="margin:6px 0 6px 40px;color:#88a">📄 домашка.txt</p>
  <p style="margin:6px 0 6px 40px;color:#88a">📸 рисунок.png</p>
  <p style="margin:6px 0 6px 20px;color:#ccc">📁 Игры</p>
  <p style="margin:6px 0 6px 40px;color:#88a">🎮 любимая_игра.exe</p>
</div>

<div style="background:#0d1f0d;border:2px solid #4ecdc4;border-radius:12px;padding:14px;margin-top:20px">
  <p style="color:#4ecdc4;font-weight:bold;margin-bottom:4px">🌟 Запомни!</p>
  <p style="margin:0;color:#a0ffa0">Данные — любая информация. Файл — контейнер. Папка — место для файлов!</p>
</div>`
  },
  {
    id: 'code100_m6_q1',
    courseId: 'course_code100',
    module: 'Модуль 6: Данные и файлы',
    title: '❓ Квиз: Виды данных',
    type: 'quiz',
    description: 'Какие бывают данные?',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '📸 Фотография на компьютере — это...',
      options: ['Программа', 'Данные', 'Вирус', 'Процессор'],
      correctIndex: 1,
      explanation: 'Фотография — это данные! Компьютер хранит её как файл.'
    }
  },
  {
    id: 'code100_m6_b1',
    courseId: 'course_code100',
    module: 'Модуль 6: Данные и файлы',
    title: '🧩 Разложи файлы по папкам!',
    type: 'blocks',
    description: 'Расставь шаги: как найти и сохранить файл!',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['💾 Открыть диск', '📁 Найти папку "Школа"', '📄 Открыть файл "домашка"', '✏️ Написать ответ', '💾 Сохранить файл'],
      correctSequence: ['💾 Открыть диск', '📁 Найти папку "Школа"', '📄 Открыть файл "домашка"', '✏️ Написать ответ', '💾 Сохранить файл'],
      theme: 'art',
      successMessage: 'Домашка сохранена! Ты разобрался с файлами! 📁',
      illustration: `<div style="padding:16px;text-align:center">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:12px;font-size:0.9em">📂 Путь к файлу</p>
  <div style="background:#0a0a14;border-radius:10px;padding:14px;display:inline-block;text-align:left">
    <p style="margin:4px 0;color:#ccc;font-size:0.9em">💾 Диск C:</p>
    <p style="margin:4px 0 4px 16px;color:#ccc;font-size:0.9em">📁 Школа</p>
    <p style="margin:4px 0 4px 32px;color:#aaa;font-size:0.9em">📄 домашка.txt ← <span style="color:#00ff41">цель!</span></p>
  </div>
</div>`
    }
  },
  {
    id: 'code100_m6_q2',
    courseId: 'course_code100',
    module: 'Модуль 6: Данные и файлы',
    title: '❓ Квиз: Где хранятся файлы?',
    type: 'quiz',
    description: 'Где компьютер хранит файлы навсегда?',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '📁 Где компьютер хранит файлы навсегда (даже когда выключен)?',
      options: ['В процессоре', 'В памяти (RAM)', 'На диске (SSD/HDD)', 'На мониторе'],
      correctIndex: 2,
      explanation: 'Диск (SSD или HDD) хранит данные навсегда! RAM забывает всё при выключении.'
    }
  },

  // ── МОДУЛЬ 7: ИНТЕРНЕТ, БЕЗОПАСНОСТЬ И ФИНАЛ ─────────────────────────────
  {
    id: 'code100_m7_t1',
    courseId: 'course_code100',
    module: 'Модуль 7: Интернет и безопасность',
    title: '🌐 Что такое Интернет?',
    type: 'theory',
    description: 'Узнай, как компьютеры общаются друг с другом!',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    theory: `<div style="text-align:center;margin-bottom:20px">
  <p style="font-size:3em;margin:0">🌐</p>
  <h2 style="color:#4ecdc4;margin:8px 0">Интернет — всемирная паутина!</h2>
</div>
<p style="font-size:1.1em;line-height:1.7">Интернет — это когда <strong style="color:#4ecdc4">миллиарды компьютеров</strong> по всему миру соединены проводами и радиоволнами. Как огромная паутина!</p>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">📨 Как это работает?</h3>
<div style="background:#0d1f2d;border:2px solid #00f3ff;border-radius:12px;padding:16px;margin:12px 0">
  <div style="display:flex;align-items:center;gap:10px;margin:8px 0"><span style="background:#00f3ff;color:black;font-weight:bold;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.85em">1</span><span style="color:#ccc">Ты пишешь адрес сайта (google.com)</span></div>
  <div style="display:flex;align-items:center;gap:10px;margin:8px 0"><span style="background:#00f3ff;color:black;font-weight:bold;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.85em">2</span><span style="color:#ccc">Запрос летит по проводам к серверу</span></div>
  <div style="display:flex;align-items:center;gap:10px;margin:8px 0"><span style="background:#00f3ff;color:black;font-weight:bold;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.85em">3</span><span style="color:#ccc">Сервер находит нужную страницу</span></div>
  <div style="display:flex;align-items:center;gap:10px;margin:8px 0"><span style="background:#00f3ff;color:black;font-weight:bold;width:28px;height:28px;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;font-size:0.85em">4</span><span style="color:#ccc">Страница появляется у тебя на экране!</span></div>
</div>

<h3 style="color:#ff6b6b;margin-top:24px;margin-bottom:12px">🛡️ Безопасность в интернете</h3>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#1a0a0a;border-left:4px solid #ff4444;padding:12px;border-radius:0 10px 10px 0">
    <p style="margin:0;color:#ff8888"><span style="font-size:1.2em">🚫</span> <strong>НЕ</strong> сообщай пароли и адрес незнакомцам</p>
  </div>
  <div style="background:#1a0a0a;border-left:4px solid #ff4444;padding:12px;border-radius:0 10px 10px 0">
    <p style="margin:0;color:#ff8888"><span style="font-size:1.2em">🚫</span> <strong>НЕ</strong> открывай странные ссылки</p>
  </div>
  <div style="background:#0a1a0a;border-left:4px solid #00ff41;padding:12px;border-radius:0 10px 10px 0">
    <p style="margin:0;color:#a0ffa0"><span style="font-size:1.2em">✅</span> Используй <strong>сложные пароли</strong></p>
  </div>
  <div style="background:#0a1a0a;border-left:4px solid #00ff41;padding:12px;border-radius:0 10px 10px 0">
    <p style="margin:0;color:#a0ffa0"><span style="font-size:1.2em">✅</span> Рассказывай взрослым, если что-то странное</p>
  </div>
</div>

<div style="background:#0d1f0d;border:2px solid #4ecdc4;border-radius:12px;padding:14px;margin-top:20px">
  <p style="color:#4ecdc4;font-weight:bold;margin-bottom:4px">🌟 Запомни!</p>
  <p style="margin:0;color:#a0ffa0">Интернет — здорово, но будь осторожен! Не все в сети — друзья.</p>
</div>`
  },
  {
    id: 'code100_m7_q1',
    courseId: 'course_code100',
    module: 'Модуль 7: Интернет и безопасность',
    title: '❓ Квиз: Интернет',
    type: 'quiz',
    description: 'Проверим, что ты знаешь об интернете!',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '🌐 Что такое Интернет?',
      options: ['Одна большая программа', 'Сеть из миллиардов соединённых компьютеров', 'Антивирус', 'Название компьютера'],
      correctIndex: 1,
      explanation: 'Интернет — глобальная сеть компьютеров, соединённых по всему миру!'
    }
  },
  {
    id: 'code100_m7_b1',
    courseId: 'course_code100',
    module: 'Модуль 7: Интернет и безопасность',
    title: '🛡️ Составь безопасный пароль!',
    type: 'blocks',
    description: 'Расставь шаги создания надёжного пароля!',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['🔤 Придумай слово', '🔢 Добавь цифры', '❗ Добавь спец. символ (!@#)', '🔒 Никому не говори пароль'],
      correctSequence: ['🔤 Придумай слово', '🔢 Добавь цифры', '❗ Добавь спец. символ (!@#)', '🔒 Никому не говори пароль'],
      theme: 'default',
      successMessage: 'Теперь ты знаешь, как создать надёжный пароль! 🔒',
      illustration: `<div style="padding:16px;text-align:center">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:12px;font-size:0.9em">🔐 Какой пароль надёжнее?</p>
  <div style="display:flex;gap:12px;justify-content:center;flex-wrap:wrap">
    <div style="background:#1a0a0a;border:2px solid #ff4444;border-radius:12px;padding:12px 16px;text-align:center;min-width:120px">
      <p style="font-family:monospace;color:#ff6b6b;font-size:1.1em;margin:0 0 6px">1234</p>
      <p style="color:#ff4444;font-size:0.75em;margin:0">❌ Слабый</p>
    </div>
    <div style="background:#0a1a0a;border:2px solid #00ff41;border-radius:12px;padding:12px 16px;text-align:center;min-width:120px">
      <p style="font-family:monospace;color:#00ff41;font-size:1.1em;margin:0 0 6px">Kot42!#</p>
      <p style="color:#00ff41;font-size:0.75em;margin:0">✅ Надёжный</p>
    </div>
  </div>
</div>`
    }
  },
  {
    id: 'code100_m7_q2',
    courseId: 'course_code100',
    module: 'Модуль 7: Интернет и безопасность',
    title: '❓ Квиз: Безопасность',
    type: 'quiz',
    description: 'Что безопасно делать в интернете?',
    difficulty: 'Новичок',
    xpReward: 20,
    currencyReward: 5,
    status: 'locked',
    quizData: {
      question: '🛡️ Что из этого БЕЗОПАСНО делать в интернете?',
      options: ['Сообщить пароль другу в чате', 'Открыть ссылку от незнакомца', 'Рассказать взрослому о странном сообщении', 'Написать свой адрес на форуме'],
      correctIndex: 2,
      explanation: 'Правильно! Если что-то странное — всегда расскажи взрослым! 🛡️'
    }
  },
  {
    id: 'code100_m7_q3',
    courseId: 'course_code100',
    module: 'Модуль 7: Интернет и безопасность',
    title: '🏆 Финальный квиз: Всё о компьютерах!',
    type: 'quiz',
    description: 'Покажи всё, чему научился в этом курсе!',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: '🏆 Информатика — это наука о том, как...',
      options: ['Чинить компьютеры', 'Собирать, хранить, обрабатывать и передавать информацию', 'Играть в компьютерные игры', 'Рисовать картинки'],
      correctIndex: 1,
      explanation: 'Ты прошёл весь курс! Информатика — наука о работе с информацией. Ты теперь настоящий исследователь цифрового мира! 🎉🏆'
    }
  },
  // =========================================================================
  // CS101: АРХИТЕКТУРА МАТРИЦЫ — 7 модулей: Компьютер, Биты, ОС, Алгоритмы,
  //        Структуры данных, Интернет и сети, Кибербезопасность
  // 35 задач: теория + квиз + блоки в каждом модуле
  // =========================================================================

  // ── МОДУЛЬ 1: ЧТО ТАКОЕ КОМПЬЮТЕР ────────────────────────────────────────
  {
    id: 'cs101_m1_t1',
    courseId: 'course_cs101',
    module: 'Модуль 1: Что такое компьютер',
    title: 'Теория: Знакомство с машиной',
    type: 'theory',
    description: 'Узнай, из чего состоит компьютер и кто за что отвечает.',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 10,
    status: 'open',
    theory: `<p style="color:#00f3ff;font-weight:bold;margin-bottom:12px">📡 Входящее сообщение от Куратора...</p>
<p>Привет, Нетраннер! Ты только что получил доступ к секретной базе знаний. Первое задание — разобраться, <strong>как устроена машина</strong>, которую ты используешь каждый день.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🖥️ Компьютер — это команда</h3>
<p>Представь, что компьютер — это штаб кибер-отряда. В нём есть несколько бойцов, и каждый выполняет свою роль:</p>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:16px;margin:16px 0">
  <p style="margin-bottom:12px"><span style="color:#ff00ff;font-weight:bold">⚡ CPU (Процессор)</span> — это <strong>командир</strong>. Он думает, считает и раздаёт приказы всем остальным. Чем быстрее командир — тем быстрее работает весь отряд.</p>
  <p style="margin-bottom:12px"><span style="color:#00f3ff;font-weight:bold">💾 RAM (Оперативная память)</span> — это <strong>рабочий стол</strong> командира. Всё, с чем он работает прямо сейчас, лежит здесь. Но когда компьютер выключается — стол очищается!</p>
  <p style="margin-bottom:12px"><span style="color:#fcee0a;font-weight:bold">🗄️ SSD / HDD (Диск)</span> — это <strong>архив</strong>. Здесь хранятся все файлы, игры, фотографии. Архив не забывает ничего, даже когда питание выключено.</p>
  <p style="margin-bottom:12px"><span style="color:#00ff41;font-weight:bold">🎮 GPU (Видеокарта)</span> — это <strong>художник</strong>. Он отвечает за всё, что ты видишь на экране: 3D-графику, видео, игры. Чем мощнее GPU — тем красивее картинка.</p>
  <p style="margin-bottom:0"><span style="color:#ff6600;font-weight:bold">🖱️ Периферия</span> — это <strong>глаза, руки и голос</strong> отряда: монитор, клавиатура, мышь. Через них ты общаешься с машиной.</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔄 Как они работают вместе?</h3>
<p>Когда ты запускаешь игру:</p>
<ol style="padding-left:20px;line-height:2.2">
  <li>Ты нажимаешь кнопку мышью (<strong>периферия</strong>)</li>
  <li>Игра загружается с диска в оперативную память (<strong>SSD → RAM</strong>)</li>
  <li>Процессор обрабатывает логику из памяти (<strong>CPU читает RAM</strong>)</li>
  <li>Видеокарта рисует картинку (<strong>GPU</strong>)</li>
  <li>Картинка выводится на экран (<strong>периферия</strong>)</li>
</ol>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Запомни главное:</p>
  <p style="margin:0">RAM — быстрая, но забывает при выключении. Диск — медленнее, но помнит всегда. CPU считает, GPU рисует.</p>
</div>`
  },
  {
    id: 'cs101_m1_q1',
    courseId: 'course_cs101',
    module: 'Модуль 1: Что такое компьютер',
    title: 'Квиз: Кто есть кто в отряде',
    type: 'quiz',
    description: 'Проверь, запомнил ли ты роли компонентов компьютера.',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'locked',
    quizData: {
      question: 'Ты сохранил документ и выключил компьютер. Где остались данные?',
      options: [
        'В RAM — она всё помнит',
        'В CPU — он самый умный',
        'На диске (SSD/HDD) — он хранит всё даже без питания',
        'Нигде — данные исчезли'
      ],
      correctIndex: 2,
      explanation: 'Диск (SSD или HDD) — это архив. Он хранит файлы даже когда компьютер выключен. RAM очищается при выключении.'
    }
  },
  {
    id: 'cs101_m1_t2',
    courseId: 'course_cs101',
    module: 'Модуль 1: Что такое компьютер',
    title: 'Теория: Как CPU думает',
    type: 'theory',
    description: 'Разберись, как процессор выполняет команды — шаг за шагом.',
    difficulty: 'Новичок',
    xpReward: 60,
    currencyReward: 15,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🧠 Углубляемся в работу командира...</p>
<p>Ты уже знаешь, что CPU — это командир. Но как именно он думает? Давай разберём это на примере.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">⚙️ Цикл работы процессора</h3>
<p>CPU работает по простому циклу из трёх шагов, который повторяется <strong>миллиарды раз в секунду</strong>:</p>
<div style="display:flex;flex-direction:column;gap:10px;margin:16px 0">
  <div style="background:#0a0a14;border-left:3px solid #00f3ff;padding:12px 16px;border-radius:0 8px 8px 0">
    <p style="color:#00f3ff;font-weight:bold;margin-bottom:4px">1. FETCH — Взять команду</p>
    <p style="margin:0;color:#aaa">CPU берёт следующую инструкцию из памяти (RAM). Например: «сложи 5 и 3».</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #ff00ff;padding:12px 16px;border-radius:0 8px 8px 0">
    <p style="color:#ff00ff;font-weight:bold;margin-bottom:4px">2. DECODE — Понять команду</p>
    <p style="margin:0;color:#aaa">CPU расшифровывает, что нужно сделать. «Ага, нужно сложить два числа!»</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:12px 16px;border-radius:0 8px 8px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">3. EXECUTE — Выполнить</p>
    <p style="margin:0;color:#aaa">CPU выполняет команду и сохраняет результат. «5 + 3 = 8. Готово!»</p>
  </div>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🚀 Тактовая частота и ядра</h3>
<p>Скорость CPU измеряется в <strong>гигагерцах (ГГц)</strong>. 1 ГГц = 1 миллиард циклов в секунду. Процессор на 3 ГГц делает 3 000 000 000 операций каждую секунду!</p>
<p style="margin-top:8px">Современные процессоры имеют несколько <strong>ядер</strong> — это как несколько командиров, работающих одновременно. 4 ядра = 4 командира = в 4 раза больше работы за то же время!</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📊 Сравнение компонентов</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.85em">
  <p style="margin:4px 0"><span style="color:#ff00ff">CPU</span>: скорость ~5 ГГц, 8-16 ядер — <span style="color:#aaa">мало задач, но сложных</span></p>
  <p style="margin:4px 0"><span style="color:#00ff41">GPU</span>: скорость ~2 ГГц, 1000+ ядер — <span style="color:#aaa">много одинаковых задач параллельно</span></p>
  <p style="margin:4px 0"><span style="color:#00f3ff">RAM</span>: 8-64 ГБ, скорость ~50 ГБ/с — <span style="color:#aaa">быстрая, но теряет данные</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a">SSD</span>: 256 ГБ-4 ТБ, скорость ~7 ГБ/с — <span style="color:#aaa">медленнее RAM, но хранит постоянно</span></p>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">🎮 Аналогия:</p>
  <p style="margin:0">CPU — это шахматист-гроссмейстер (сложные задачи). GPU — это тысяча работников на конвейере (много простых задач одновременно). Именно поэтому GPU используют для игр и нейросетей!</p>
</div>`
  },
  {
    id: 'cs101_m1_q2',
    courseId: 'course_cs101',
    module: 'Модуль 1: Что такое компьютер',
    title: 'Квиз: Скорость и ядра',
    type: 'quiz',
    description: 'Проверь понимание работы процессора и компонентов.',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 15,
    status: 'locked',
    quizData: {
      question: 'Процессор с 4 ядрами и частотой 2 ГГц. Что это означает?',
      options: [
        '4 командира, каждый делает 2 миллиарда операций в секунду',
        '4 командира, каждый делает 2 операции в секунду',
        'Один командир делает 4 операции в секунду',
        'Процессор весит 4 грамма'
      ],
      correctIndex: 0,
      explanation: 'Каждое ядро — отдельный командир с частотой 2 ГГц (2 миллиарда операций/сек). 4 ядра работают параллельно!'
    }
  },
  {
    id: 'cs101_m1_b1',
    courseId: 'course_cs101',
    module: 'Модуль 1: Что такое компьютер',
    title: 'Практика: Запуск программы',
    type: 'blocks',
    description: 'Собери правильную последовательность: что происходит, когда ты запускаешь программу?',
    difficulty: 'Новичок',
    xpReward: 60,
    currencyReward: 15,
    status: 'locked',
    blocksConfig: {
      availableBlocks: [
        'Пользователь кликает на программу',
        'ОС читает файл с диска (SSD)',
        'Программа загружается в RAM',
        'CPU выполняет инструкции из RAM',
        'GPU отрисовывает интерфейс',
        'Результат отображается на мониторе'
      ],
      correctSequence: [
        'Пользователь кликает на программу',
        'ОС читает файл с диска (SSD)',
        'Программа загружается в RAM',
        'CPU выполняет инструкции из RAM',
        'GPU отрисовывает интерфейс',
        'Результат отображается на мониторе'
      ],
      theme: 'cyber',
      successMessage: '🖥️ Отлично! Ты понимаешь, как компьютер запускает программы — от клика до экрана!',
      illustration: `<div style="text-align:center;font-size:2em;margin:16px 0">🖱️ → 💿 → 💾 → ⚡ → 🎮 → 🖥️</div>
<p style="text-align:center;color:#aaa">Клик → Диск → RAM → CPU → GPU → Экран</p>`
    }
  },

  // ── МОДУЛЬ 2: ЯЗЫК МАШИНЫ — БИТЫ И БАЙТЫ ─────────────────────────────────
  {
    id: 'cs101_m2_t1',
    courseId: 'course_cs101',
    module: 'Модуль 2: Язык машины — биты и байты',
    title: 'Теория: Как компьютер считает',
    type: 'theory',
    description: 'Узнай, почему компьютер понимает только 0 и 1, и как из них получается всё остальное.',
    difficulty: 'Новичок',
    xpReward: 60,
    currencyReward: 15,
    status: 'locked',
    theory: `<p style="color:#00f3ff;font-weight:bold;margin-bottom:12px">⚡ Секретный язык Матрицы...</p>
<p>Ты когда-нибудь видел в фильмах про хакеров потоки цифр 0 и 1? Это не просто красиво — это <strong>настоящий язык компьютера</strong>!</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">💡 Почему только 0 и 1?</h3>
<p>Внутри компьютера миллиарды крошечных переключателей — <strong>транзисторов</strong>. Каждый может быть только в двух состояниях:</p>
<div style="display:flex;gap:12px;margin:12px 0">
  <div style="flex:1;background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;text-align:center">
    <p style="font-size:1.8em;margin:0">💚</p>
    <p style="color:#00ff41;font-weight:bold;margin:4px 0">1 = ВКЛ</p>
    <p style="color:#aaa;font-size:0.85em;margin:0">Ток есть</p>
  </div>
  <div style="flex:1;background:#1a0a0a;border:1px solid #ff003c;border-radius:8px;padding:12px;text-align:center">
    <p style="font-size:1.8em;margin:0">🔴</p>
    <p style="color:#ff003c;font-weight:bold;margin:4px 0">0 = ВЫКЛ</p>
    <p style="color:#aaa;font-size:0.85em;margin:0">Тока нет</p>
  </div>
</div>
<p>Один такой переключатель — это <strong>1 бит</strong> (от англ. binary digit — двоичная цифра).</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📦 Биты и байты</h3>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:4px 0"><span style="color:#fcee0a">8 бит</span> = <span style="color:#00f3ff">1 байт</span> — минимальная единица данных</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">1 024 байта</span> = <span style="color:#00f3ff">1 килобайт (КБ)</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a">1 024 КБ</span> = <span style="color:#00f3ff">1 мегабайт (МБ)</span> — одна песня в mp3</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">1 024 МБ</span> = <span style="color:#00f3ff">1 гигабайт (ГБ)</span> — около 250 песен</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">1 024 ГБ</span> = <span style="color:#00f3ff">1 терабайт (ТБ)</span> — целый сезон сериала в 4K</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔢 Двоичные числа</h3>
<p>Мы считаем цифрами 0–9 (десятичная система). Компьютер — только 0 и 1 (двоичная). Каждый разряд — это степень двойки:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:3px 0;color:#aaa">Позиции: <span style="color:#fcee0a">8  4  2  1</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">0</span> → <span style="color:#00ff41">0000</span> &nbsp;&nbsp; <span style="color:#fcee0a">4</span> → <span style="color:#00ff41">0100</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">1</span> → <span style="color:#00ff41">0001</span> &nbsp;&nbsp; <span style="color:#fcee0a">5</span> → <span style="color:#00ff41">0101</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">2</span> → <span style="color:#00ff41">0010</span> &nbsp;&nbsp; <span style="color:#fcee0a">6</span> → <span style="color:#00ff41">0110</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">3</span> → <span style="color:#00ff41">0011</span> &nbsp;&nbsp; <span style="color:#fcee0a">7</span> → <span style="color:#00ff41">0111</span></p>
</div>
<p>Например, <code style="color:#00ff41;background:#0a0a14;padding:2px 6px;border-radius:4px">1101</code> = 8+4+0+1 = <strong>13</strong>.</p>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">🤯 Интересный факт:</p>
  <p style="margin:0">Буква «A» хранится как число 65, а 65 в двоичном — 01000001. Любой текст, картинка и видео — это просто длинная цепочка нулей и единиц!</p>
</div>`
  },
  {
    id: 'cs101_m2_q1',
    courseId: 'course_cs101',
    module: 'Модуль 2: Язык машины — биты и байты',
    title: 'Квиз: Биты и байты',
    type: 'quiz',
    description: 'Проверь, как биты и байты живут в Матрице.',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 15,
    status: 'locked',
    quizData: {
      question: 'Сколько бит в одном байте?',
      options: ['2 бита', '4 бита', '8 бит', '16 бит'],
      correctIndex: 2,
      explanation: 'В одном байте ровно 8 бит. Байт — это минимальная единица хранения данных в компьютере.'
    }
  },
  {
    id: 'cs101_m2_t2',
    courseId: 'course_cs101',
    module: 'Модуль 2: Язык машины — биты и байты',
    title: 'Теория: Как хранятся буквы и картинки',
    type: 'theory',
    description: 'Узнай, как компьютер превращает текст, цвета и звуки в числа.',
    difficulty: 'Новичок',
    xpReward: 70,
    currencyReward: 20,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🎨 Всё — это числа!</p>
<p>Мы уже знаем, что компьютер понимает только 0 и 1. Но как тогда он хранит буквы, картинки и музыку? Всё просто — каждому символу и цвету присваивается <strong>своё число</strong>!</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔤 Текст — таблица ASCII и Unicode</h3>
<p>Учёные придумали таблицу, где каждой букве соответствует число. Базовая — <strong>ASCII</strong> (128 символов), расширенная — <strong>Unicode</strong> (150 000+ символов, включая эмодзи!):</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:3px 0"><span style="color:#ff00ff">A</span> = <span style="color:#fcee0a">65</span> = <span style="color:#00ff41">01000001</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">B</span> = <span style="color:#fcee0a">66</span> = <span style="color:#00ff41">01000010</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">a</span> = <span style="color:#fcee0a">97</span> = <span style="color:#00ff41">01100001</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">0</span> (цифра) = <span style="color:#fcee0a">48</span> = <span style="color:#00ff41">00110000</span></p>
</div>
<p>Слово «Hi» — это два числа: 72 и 105. В памяти: <code style="color:#00ff41;background:#0a0a14;padding:2px 6px;border-radius:4px">01001000 01101001</code></p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🖼️ Картинки — сетка пикселей</h3>
<p>Картинка — это сетка крошечных точек — <strong>пикселей</strong>. Каждый пиксель — это цвет, а цвет — три числа от 0 до 255: красный, зелёный, синий (<strong>RGB</strong>).</p>
<div style="display:flex;gap:8px;margin:12px 0">
  <div style="flex:1;background:#ff0000;border-radius:6px;padding:10px;text-align:center">
    <p style="color:white;font-weight:bold;margin:0;font-size:0.85em">Красный</p>
    <p style="color:white;margin:0;font-family:monospace;font-size:0.85em">255, 0, 0</p>
  </div>
  <div style="flex:1;background:#00aa00;border-radius:6px;padding:10px;text-align:center">
    <p style="color:white;font-weight:bold;margin:0;font-size:0.85em">Зелёный</p>
    <p style="color:white;margin:0;font-family:monospace;font-size:0.85em">0, 255, 0</p>
  </div>
  <div style="flex:1;background:#0000ff;border-radius:6px;padding:10px;text-align:center">
    <p style="color:white;font-weight:bold;margin:0;font-size:0.85em">Синий</p>
    <p style="color:white;margin:0;font-family:monospace;font-size:0.85em">0, 0, 255</p>
  </div>
</div>
<p>Фото 1920×1080 = 2 073 600 пикселей × 3 байта = ~6 МБ без сжатия!</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎵 Звук — оцифровка волны</h3>
<p>Звук — это волна. Компьютер <strong>семплирует</strong> (измеряет) высоту волны тысячи раз в секунду. CD-качество: 44 100 измерений/сек × 16 бит × 2 канала = <strong>1 411 200 бит/сек</strong>!</p>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Сжатие данных:</p>
  <p style="margin:0">MP3, JPEG, MP4 — форматы сжатия. Они убирают «лишние» данные, которые человек почти не замечает, и уменьшают файл в 5-10 раз!</p>
</div>`
  },
  {
    id: 'cs101_m2_q2',
    courseId: 'course_cs101',
    module: 'Модуль 2: Язык машины — биты и байты',
    title: 'Квиз: Текст и цвета',
    type: 'quiz',
    description: 'Проверь, как компьютер хранит буквы и изображения.',
    difficulty: 'Новичок',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    quizData: {
      question: 'Из чего состоит цвет одного пикселя на экране?',
      options: [
        'Из одного числа от 0 до 9',
        'Из трёх чисел: красный, зелёный, синий (RGB)',
        'Из буквы и символа',
        'Из одного бита: 0 или 1'
      ],
      correctIndex: 1,
      explanation: 'Каждый пиксель описывается тремя числами от 0 до 255 — это количество красного, зелёного и синего цвета (RGB). Смешивая их, можно получить любой цвет!'
    }
  },
  {
    id: 'cs101_m2_b1',
    courseId: 'course_cs101',
    module: 'Модуль 2: Язык машины — биты и байты',
    title: 'Практика: Единицы измерения данных',
    type: 'blocks',
    description: 'Расположи единицы измерения данных от наименьшей к наибольшей.',
    difficulty: 'Новичок',
    xpReward: 60,
    currencyReward: 15,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['Бит', 'Байт (8 бит)', 'Килобайт (1024 байт)', 'Мегабайт (1024 КБ)', 'Гигабайт (1024 МБ)', 'Терабайт (1024 ГБ)'],
      correctSequence: ['Бит', 'Байт (8 бит)', 'Килобайт (1024 байт)', 'Мегабайт (1024 КБ)', 'Гигабайт (1024 МБ)', 'Терабайт (1024 ГБ)'],
      theme: 'cyber',
      successMessage: '📊 Точно! Ты знаешь иерархию единиц измерения данных — от бита до терабайта!',
      illustration: `<div style="text-align:center;color:#aaa;margin:16px 0">
<p style="font-size:0.9em">1 бит → 8 = байт → ×1024 = КБ → ×1024 = МБ → ×1024 = ГБ → ×1024 = ТБ</p>
<p style="font-size:1.5em;margin-top:8px">💾</p></div>`
    }
  },

  // ── МОДУЛЬ 3: ОПЕРАЦИОННАЯ СИСТЕМА ────────────────────────────────────────
  {
    id: 'cs101_m3_t1',
    courseId: 'course_cs101',
    module: 'Модуль 3: Операционная система',
    title: 'Теория: Что такое ОС',
    type: 'theory',
    description: 'Узнай, что такое операционная система и зачем она нужна компьютеру.',
    difficulty: 'Новичок',
    xpReward: 70,
    currencyReward: 20,
    status: 'locked',
    theory: `<p style="color:#00f3ff;font-weight:bold;margin-bottom:12px">🏗️ Главный управляющий компьютера...</p>
<p>Ты включаешь компьютер — и видишь рабочий стол с иконками. Но кто его показывает? Кто запускает программы, следит за мышью и управляет памятью? Это делает <strong>операционная система (ОС)</strong>.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎯 Что делает ОС?</h3>
<p>Операционная система — это <strong>посредник</strong> между тобой и железом. Без неё ты бы общался с процессором на языке нулей и единиц!</p>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#0a0a14;border-left:3px solid #00f3ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00f3ff;font-weight:bold;margin-bottom:2px">📂 Управление файлами</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">ОС организует файлы в папки, позволяет копировать, перемещать и удалять их.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #ff00ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff00ff;font-weight:bold;margin-bottom:2px">⚡ Управление процессами</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">ОС решает, какая программа сейчас использует CPU, и переключается между ними тысячи раз в секунду.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #fcee0a;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#fcee0a;font-weight:bold;margin-bottom:2px">💾 Управление памятью</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">ОС распределяет RAM между программами: кому сколько выделить, и что убрать из памяти.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:2px">🖱️ Работа с устройствами</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">ОС через <strong>драйверы</strong> общается с принтером, мышью, Wi-Fi и другими устройствами.</p>
  </div>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🌍 Какие бывают ОС?</h3>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:16px;margin:12px 0">
  <p style="margin-bottom:8px"><span style="color:#00f3ff;font-weight:bold">🪟 Windows</span> — самая популярная для ПК (~74%). Игры, офис, учёба.</p>
  <p style="margin-bottom:8px"><span style="color:#aaa;font-weight:bold">🍎 macOS</span> — система от Apple. Дизайн, видеомонтаж, программирование.</p>
  <p style="margin-bottom:8px"><span style="color:#00ff41;font-weight:bold">🐧 Linux</span> — бесплатная и открытая. Серверы, хакерские инструменты, программирование.</p>
  <p style="margin-bottom:0"><span style="color:#fcee0a;font-weight:bold">📱 Android / iOS</span> — мобильные ОС для смартфонов и планшетов.</p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">🤯 Факт:</p>
  <p style="margin:0">90% серверов в интернете работают на Linux. Когда ты заходишь на YouTube или Instagram — тебе отвечает компьютер с Linux!</p>
</div>`
  },
  {
    id: 'cs101_m3_q1',
    courseId: 'course_cs101',
    module: 'Модуль 3: Операционная система',
    title: 'Квиз: Задачи ОС',
    type: 'quiz',
    description: 'Проверь, понимаешь ли ты роль операционной системы.',
    difficulty: 'Новичок',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    quizData: {
      question: 'Ты открыл браузер, текстовый редактор и музыкальный плеер одновременно. Кто решает, какая программа прямо сейчас использует процессор?',
      options: [
        'Ты сам — нужно вручную переключать',
        'CPU сам разбирается',
        'Операционная система — она распределяет ресурсы между процессами',
        'Каждая программа работает на своём отдельном процессоре'
      ],
      correctIndex: 2,
      explanation: 'ОС — главный управляющий. Она переключает CPU между программами тысячи раз в секунду, создавая иллюзию, что всё работает одновременно!'
    }
  },
  {
    id: 'cs101_m3_t2',
    courseId: 'course_cs101',
    module: 'Модуль 3: Операционная система',
    title: 'Теория: Процессы и файловая система',
    type: 'theory',
    description: 'Узнай, что такое процессы, потоки и как устроена файловая система.',
    difficulty: 'Новичок',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">⚙️ Заглядываем под капот ОС...</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔄 Процессы и потоки</h3>
<p>Каждая запущенная программа — это <strong>процесс</strong>. Браузер — процесс. Игра — процесс. У каждого процесса своя область памяти.</p>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:16px;margin:12px 0">
  <p style="margin-bottom:8px"><span style="color:#ff00ff;font-weight:bold">Процесс</span> — это программа в работе. У неё есть своя память, которую другие процессы не видят.</p>
  <p style="margin-bottom:8px"><span style="color:#00f3ff;font-weight:bold">Поток (Thread)</span> — это «рабочий» внутри процесса. Один процесс может иметь много потоков. Например, браузер: один поток загружает страницу, другой играет видео, третий обрабатывает клики.</p>
  <p style="margin-bottom:0"><span style="color:#fcee0a;font-weight:bold">Планировщик</span> — часть ОС, которая решает, какой поток запустить следующим. Он переключается между ними тысячи раз в секунду!</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📁 Файловая система</h3>
<p>Файловая система — это способ организации данных на диске. Как библиотека: книги (файлы) стоят на полках (папках), а каталог (файловая система) помогает найти нужную.</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.85em">
  <p style="color:#fcee0a;margin:2px 0">📂 C:\\</p>
  <p style="color:#aaa;margin:2px 0">&nbsp;&nbsp;├── 📂 Windows\\ <span style="color:#555">(системные файлы)</span></p>
  <p style="color:#aaa;margin:2px 0">&nbsp;&nbsp;├── 📂 Program Files\\ <span style="color:#555">(установленные программы)</span></p>
  <p style="color:#aaa;margin:2px 0">&nbsp;&nbsp;└── 📂 Users\\</p>
  <p style="color:#00ff41;margin:2px 0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📂 Нетраннер\\</p>
  <p style="color:#00ff41;margin:2px 0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── 📂 Documents\\</p>
  <p style="color:#00ff41;margin:2px 0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;├── 📂 Downloads\\</p>
  <p style="color:#00ff41;margin:2px 0">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;└── 📂 Desktop\\</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📋 Типы файловых систем</h3>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0">
  <p style="margin:4px 0"><span style="color:#00f3ff;font-weight:bold">NTFS</span> — Windows. Поддерживает большие файлы, права доступа, шифрование.</p>
  <p style="margin:4px 0"><span style="color:#00ff41;font-weight:bold">ext4</span> — Linux. Быстрая, надёжная, журналируемая.</p>
  <p style="margin:4px 0"><span style="color:#aaa;font-weight:bold">APFS</span> — macOS. Оптимизирована для SSD, поддерживает снапшоты.</p>
  <p style="margin:4px 0"><span style="color:#fcee0a;font-weight:bold">FAT32</span> — универсальная. Работает везде, но максимальный файл — 4 ГБ.</p>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">💡 Почему флешка не читает большой файл?</p>
  <p style="margin:0">Если флешка отформатирована в FAT32, файл больше 4 ГБ не поместится. Решение — переформатировать в NTFS или exFAT!</p>
</div>`
  },
  {
    id: 'cs101_m3_q2',
    courseId: 'course_cs101',
    module: 'Модуль 3: Операционная система',
    title: 'Квиз: Процессы и файлы',
    type: 'quiz',
    description: 'Проверь знания о процессах и файловых системах.',
    difficulty: 'Новичок',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'Чем процесс отличается от потока?',
      options: [
        'Это одно и то же',
        'Процесс — это программа в работе со своей памятью, а поток — это рабочий внутри процесса',
        'Поток — это программа, а процесс — папка с файлами',
        'Процесс работает на CPU, а поток — на GPU'
      ],
      correctIndex: 1,
      explanation: 'Процесс — это изолированная программа со своей памятью. Поток (thread) — это единица выполнения внутри процесса. У одного процесса может быть много потоков, и они делят общую память.'
    }
  },
  {
    id: 'cs101_m3_b1',
    courseId: 'course_cs101',
    module: 'Модуль 3: Операционная система',
    title: 'Практика: Уровни компьютерной системы',
    type: 'blocks',
    description: 'Расположи уровни компьютерной системы от железа до пользователя.',
    difficulty: 'Новичок',
    xpReward: 70,
    currencyReward: 20,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['Железо (CPU, RAM, диск)', 'Ядро ОС (kernel) — управляет железом', 'Драйверы — переводчики для устройств', 'Системные утилиты (файловый менеджер)', 'Приложения (браузер, игры, редактор)', 'Пользователь'],
      correctSequence: ['Железо (CPU, RAM, диск)', 'Ядро ОС (kernel) — управляет железом', 'Драйверы — переводчики для устройств', 'Системные утилиты (файловый менеджер)', 'Приложения (браузер, игры, редактор)', 'Пользователь'],
      theme: 'cyber',
      successMessage: '🏗️ Верно! Ты видишь всю архитектуру: от транзисторов до интерфейса пользователя!',
      illustration: `<div style="text-align:center;color:#aaa;margin:16px 0">
<p style="font-size:0.9em">Железо → Ядро ОС → Драйверы → Утилиты → Приложения → Пользователь</p>
<p style="font-size:1.5em;margin-top:8px">🔧 → ⚙️ → 🔌 → 🛠️ → 💻 → 👤</p></div>`
    }
  },

  // ── МОДУЛЬ 4: АЛГОРИТМЫ И ЛОГИКА ─────────────────────────────────────────
  {
    id: 'cs101_m4_t1',
    courseId: 'course_cs101',
    module: 'Модуль 4: Алгоритмы и логика',
    title: 'Теория: Что такое алгоритм',
    type: 'theory',
    description: 'Узнай, что такое алгоритм и как он управляет любой программой.',
    difficulty: 'Новичок',
    xpReward: 70,
    currencyReward: 20,
    status: 'locked',
    theory: `<p style="color:#00f3ff;font-weight:bold;margin-bottom:12px">🤖 Миссия: запрограммировать дрона...</p>
<p>Представь, что тебе нужно объяснить роботу, как приготовить бутерброд. Ты не можешь сказать «сделай бутерброд» — робот не понимает таких общих команд. Ему нужны <strong>точные пошаговые инструкции</strong>. Это и есть <strong>алгоритм</strong>!</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📋 Алгоритм — это рецепт</h3>
<p>Алгоритм — это чёткая последовательность шагов для решения задачи. У хорошего алгоритма есть три свойства:</p>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#0a0a14;border-left:3px solid #fcee0a;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#fcee0a;font-weight:bold;margin-bottom:2px">✅ Понятность</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Каждый шаг должен быть чётким и однозначным.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #00f3ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00f3ff;font-weight:bold;margin-bottom:2px">✅ Конечность</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Алгоритм должен когда-нибудь завершиться.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:2px">✅ Результат</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">В конце должен быть понятный результат.</p>
  </div>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔀 Три строительных блока</h3>
<p>Любой алгоритм строится из трёх базовых конструкций:</p>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:16px;margin:12px 0">
  <p style="margin-bottom:10px"><span style="color:#ff00ff;font-weight:bold">1. Последовательность</span> — шаги выполняются один за другим.<br><span style="color:#555;font-size:0.85em">Встать → Умыться → Позавтракать</span></p>
  <p style="margin-bottom:10px"><span style="color:#fcee0a;font-weight:bold">2. Ветвление (если/иначе)</span> — выбор пути в зависимости от условия.<br><span style="color:#555;font-size:0.85em">ЕСЛИ дождь → взять зонт, ИНАЧЕ → надеть очки</span></p>
  <p style="margin-bottom:0"><span style="color:#00ff41;font-weight:bold">3. Цикл (повторение)</span> — действие повторяется, пока условие верно.<br><span style="color:#555;font-size:0.85em">ПОКА тарелка не чистая → мыть тарелку</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📊 Сложность алгоритмов</h3>
<p>Не все алгоритмы одинаково быстрые. Программисты оценивают скорость с помощью <strong>Big O</strong>:</p>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:0.85em">
  <p style="margin:4px 0"><span style="color:#00ff41">O(1)</span> — мгновенно: <span style="color:#aaa">взять первый элемент списка</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a">O(n)</span> — линейно: <span style="color:#aaa">найти элемент в списке (проверить каждый)</span></p>
  <p style="margin:4px 0"><span style="color:#ff6600">O(n²)</span> — квадратично: <span style="color:#aaa">простая сортировка (пузырьком)</span></p>
  <p style="margin:4px 0"><span style="color:#00f3ff">O(log n)</span> — логарифмически: <span style="color:#aaa">бинарный поиск (умный поиск)</span></p>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">💡 Ключевая мысль:</p>
  <p style="margin:0">Любая программа — от простой игры до нейросети — это набор алгоритмов. Научившись думать алгоритмически, ты научишься программировать!</p>
</div>`
  },
  {
    id: 'cs101_m4_q1',
    courseId: 'course_cs101',
    module: 'Модуль 4: Алгоритмы и логика',
    title: 'Квиз: Три блока алгоритма',
    type: 'quiz',
    description: 'Определи, какой строительный блок используется в каждом примере.',
    difficulty: 'Новичок',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    quizData: {
      question: '«Повторять чистку зубов, пока не пройдёт 2 минуты» — это какой блок?',
      options: [
        'Последовательность — шаги один за другим',
        'Ветвление — выбор пути',
        'Цикл — повторение пока условие верно',
        'Это не алгоритм'
      ],
      correctIndex: 2,
      explanation: '«Повторять, пока…» — это цикл. Действие (чистка зубов) повторяется до тех пор, пока условие (не прошло 2 минуты) остаётся верным.'
    }
  },
  {
    id: 'cs101_m4_t2',
    courseId: 'course_cs101',
    module: 'Модуль 4: Алгоритмы и логика',
    title: 'Теория: Логика и условия',
    type: 'theory',
    description: 'Узнай, как компьютер принимает решения с помощью логических условий.',
    difficulty: 'Новичок',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🧠 Как компьютер принимает решения?</p>
<p>Каждый раз, когда программа делает выбор — «показать рекламу или нет», «пустить игрока или нет» — она использует <strong>логические условия</strong>. Это основа мышления любого компьютера.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">⚖️ Сравнения</h3>
<p>Компьютер умеет сравнивать значения и получать ответ: <strong>ИСТИНА</strong> (true) или <strong>ЛОЖЬ</strong> (false):</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:4px 0"><span style="color:#fcee0a">5 > 3</span> → <span style="color:#00ff41">ИСТИНА</span> (5 больше 3)</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">2 == 7</span> → <span style="color:#ff003c">ЛОЖЬ</span> (2 не равно 7)</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">10 >= 10</span> → <span style="color:#00ff41">ИСТИНА</span> (10 больше или равно 10)</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">"cat" == "dog"</span> → <span style="color:#ff003c">ЛОЖЬ</span> (разные слова)</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔗 Логические операторы</h3>
<p>Условия можно объединять с помощью трёх операторов:</p>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:2px">AND (И) — оба условия должны быть верны</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">«Тепло И нет дождя» → идём гулять</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #fcee0a;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#fcee0a;font-weight:bold;margin-bottom:2px">OR (ИЛИ) — хотя бы одно условие верно</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">«Устал ИЛИ поздно» → ложимся спать</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #ff00ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff00ff;font-weight:bold;margin-bottom:2px">NOT (НЕ) — переворачивает условие</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">«НЕ голоден» → не едим</p>
  </div>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📊 Таблица истинности</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.85em">
  <p style="color:#aaa;margin:0 0 8px 0">A = true, B = false:</p>
  <p style="margin:3px 0"><span style="color:#fcee0a">A AND B</span> → <span style="color:#ff003c">false</span> <span style="color:#555">(оба должны быть true)</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">A OR B</span>  → <span style="color:#00ff41">true</span>  <span style="color:#555">(хотя бы одно true)</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">NOT A</span>   → <span style="color:#ff003c">false</span> <span style="color:#555">(переворачиваем)</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">NOT B</span>   → <span style="color:#00ff41">true</span>  <span style="color:#555">(переворачиваем)</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎮 Пример из игры</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="color:#aaa;margin:0 0 8px 0">// Проверка победы в игре:</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">ЕСЛИ</span> <span style="color:#fcee0a">(жизни > 0)</span> <span style="color:#00f3ff">И</span> <span style="color:#fcee0a">(враги == 0)</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">→ показать "ПОБЕДА!"</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">ИНАЧЕ ЕСЛИ</span> <span style="color:#fcee0a">(жизни == 0)</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff003c">→ показать "ИГРА ОКОНЧЕНА"</span></p>
</div>`
  },
  {
    id: 'cs101_m4_q2',
    courseId: 'course_cs101',
    module: 'Модуль 4: Алгоритмы и логика',
    title: 'Квиз: Логические операторы',
    type: 'quiz',
    description: 'Проверь понимание логических условий.',
    difficulty: 'Новичок',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'Условие: «Температура > 20 AND нет дождя». Когда оно ИСТИННО?',
      options: [
        'Когда температура больше 20, даже если идёт дождь',
        'Только когда оба условия верны: тепло И нет дождя',
        'Когда хотя бы одно условие верно',
        'Никогда'
      ],
      correctIndex: 1,
      explanation: 'Оператор AND (И) требует, чтобы ОБА условия были истинными одновременно. Если хоть одно ложно — всё выражение ложно.'
    }
  },
  {
    id: 'cs101_m4_b1',
    courseId: 'course_cs101',
    module: 'Модуль 4: Алгоритмы и логика',
    title: 'Практика: Алгоритм бинарного поиска',
    type: 'blocks',
    description: 'Собери шаги бинарного поиска — самого эффективного способа найти элемент в отсортированном списке.',
    difficulty: 'Хакер',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['Взять отсортированный список', 'Найти средний элемент', 'Сравнить средний элемент с искомым', 'ЕСЛИ равен — нашли!', 'ЕСЛИ искомый меньше — ищем в левой половине', 'ЕСЛИ искомый больше — ищем в правой половине', 'Повторяем с шага 2 для выбранной половины'],
      correctSequence: ['Взять отсортированный список', 'Найти средний элемент', 'Сравнить средний элемент с искомым', 'ЕСЛИ равен — нашли!', 'ЕСЛИ искомый меньше — ищем в левой половине', 'ЕСЛИ искомый больше — ищем в правой половине', 'Повторяем с шага 2 для выбранной половины'],
      theme: 'cyber',
      successMessage: '🔍 Отлично! Бинарный поиск — один из самых важных алгоритмов в программировании. Он работает за O(log n)!',
      illustration: `<div style="text-align:center;color:#aaa;margin:16px 0">
<p style="font-size:0.9em">В списке из 1 000 000 элементов бинарный поиск найдёт нужный за ~20 шагов!</p>
<p style="font-size:1.5em;margin-top:8px">🔍</p></div>`
    }
  },

  // ── МОДУЛЬ 5: СТРУКТУРЫ ДАННЫХ ───────────────────────────────────────────
  {
    id: 'cs101_m5_t1',
    courseId: 'course_cs101',
    module: 'Модуль 5: Структуры данных',
    title: 'Теория: Как хранить данные',
    type: 'theory',
    description: 'Узнай, какие существуют способы организации данных и зачем это нужно.',
    difficulty: 'Хакер',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    theory: `<p style="color:#00f3ff;font-weight:bold;margin-bottom:12px">📦 Хранилища данных Матрицы...</p>
<p>Представь, что тебе нужно хранить список контактов. Можно записать их на бумажке в случайном порядке, а можно — в алфавитном в блокноте с закладками. Второй способ быстрее! <strong>Структуры данных</strong> — это способы организации информации в компьютере.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📋 Массив (Array)</h3>
<p>Самая простая структура — <strong>пронумерованный список</strong>. Элементы хранятся подряд в памяти, каждый имеет свой индекс (номер).</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="color:#aaa;margin:0 0 8px 0">// Массив оружия дрона:</p>
  <p style="margin:3px 0"><span style="color:#fcee0a">индекс:</span>  <span style="color:#555">0</span>         <span style="color:#555">1</span>        <span style="color:#555">2</span>        <span style="color:#555">3</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">данные:</span> [<span style="color:#00f3ff">"лазер"</span>, <span style="color:#00f3ff">"щит"</span>, <span style="color:#00f3ff">"ракета"</span>, <span style="color:#00f3ff">"EMP"</span>]</p>
</div>
<p><span style="color:#00ff41">✅ Плюс:</span> мгновенный доступ по индексу — O(1).<br>
<span style="color:#ff003c">❌ Минус:</span> вставка в середину — медленная, нужно сдвигать элементы.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📚 Стек (Stack) — «стопка тарелок»</h3>
<p>Принцип <strong>LIFO</strong> — Last In, First Out (последний пришёл — первый ушёл). Как стопка тарелок: берёшь верхнюю.</p>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0">
  <p style="margin:4px 0"><span style="color:#ff00ff;font-weight:bold">push()</span> — положить элемент на вершину</p>
  <p style="margin:4px 0"><span style="color:#00f3ff;font-weight:bold">pop()</span> — снять элемент с вершины</p>
  <p style="margin:4px 0"><span style="color:#aaa">Применение: Ctrl+Z (отмена), история браузера, вызовы функций</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🚶 Очередь (Queue) — «очередь в магазине»</h3>
<p>Принцип <strong>FIFO</strong> — First In, First Out (первый пришёл — первый ушёл). Как очередь в магазине.</p>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0">
  <p style="margin:4px 0"><span style="color:#ff00ff;font-weight:bold">enqueue()</span> — встать в конец очереди</p>
  <p style="margin:4px 0"><span style="color:#00f3ff;font-weight:bold">dequeue()</span> — обслужить первого</p>
  <p style="margin:4px 0"><span style="color:#aaa">Применение: очередь печати, обработка сообщений, буферизация видео</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🗂️ Хеш-таблица (Hash Map)</h3>
<p>Хранит пары <strong>ключ → значение</strong>. Как словарь: ищешь слово — получаешь определение. Поиск за O(1)!</p>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:0.85em">
  <p style="margin:3px 0"><span style="color:#fcee0a">"login"</span> → <span style="color:#00ff41">"netrunner42"</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">"level"</span> → <span style="color:#00ff41">7</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">"xp"</span>    → <span style="color:#00ff41">3500</span></p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">🎯 Как выбрать структуру?</p>
  <p style="margin:0">Нужен быстрый доступ по номеру → массив. Нужна отмена → стек. Нужна справедливая очерёдность → очередь. Нужен быстрый поиск по ключу → хеш-таблица.</p>
</div>`
  },
  {
    id: 'cs101_m5_q1',
    courseId: 'course_cs101',
    module: 'Модуль 5: Структуры данных',
    title: 'Квиз: Выбери структуру',
    type: 'quiz',
    description: 'Определи, какая структура данных лучше подходит для задачи.',
    difficulty: 'Хакер',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'Ты реализуешь кнопку «Отменить» (Ctrl+Z) в текстовом редакторе. Какая структура данных лучше всего подходит?',
      options: [
        'Массив — пронумерованный список',
        'Стек — последний пришёл, первый ушёл (LIFO)',
        'Очередь — первый пришёл, первый ушёл (FIFO)',
        'Хеш-таблица — ключ-значение'
      ],
      correctIndex: 1,
      explanation: 'Стек идеально подходит для отмены! Каждое действие кладётся на вершину стека. При отмене снимается последнее действие — именно принцип LIFO.'
    }
  },
  {
    id: 'cs101_m5_t2',
    courseId: 'course_cs101',
    module: 'Модуль 5: Структуры данных',
    title: 'Теория: Деревья и графы',
    type: 'theory',
    description: 'Узнай о продвинутых структурах данных: деревьях и графах.',
    difficulty: 'Хакер',
    xpReward: 90,
    currencyReward: 30,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🌳 Продвинутые структуры...</p>
<h3 style="color:#00f3ff;margin-top:12px;margin-bottom:8px">🌲 Дерево (Tree)</h3>
<p>Дерево — это структура, где у каждого элемента (<strong>узла</strong>) могут быть «дети». Как генеалогическое дерево или файловая система!</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.85em;text-align:center">
  <p style="margin:2px 0;color:#fcee0a">         📁 Корень</p>
  <p style="margin:2px 0;color:#aaa">        /         \\</p>
  <p style="margin:2px 0;color:#00f3ff">    📂 Левый    📂 Правый</p>
  <p style="margin:2px 0;color:#aaa">    /    \\         \\</p>
  <p style="margin:2px 0;color:#00ff41"> 📄 A   📄 B     📄 C</p>
</div>
<p>Особый вид — <strong>бинарное дерево поиска (BST)</strong>: левый ребёнок всегда меньше родителя, правый — больше. Поиск за O(log n)!</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🕸️ Граф (Graph)</h3>
<p>Граф — это набор <strong>узлов</strong> (вершин), связанных <strong>рёбрами</strong>. Дерево — это частный случай графа!</p>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0">
  <p style="margin-bottom:8px;color:#aaa">Примеры графов в реальной жизни:</p>
  <p style="margin:4px 0"><span style="color:#00f3ff">🌐 Интернет</span> — компьютеры (узлы) соединены кабелями (рёбра)</p>
  <p style="margin:4px 0"><span style="color:#ff00ff">👥 Соцсети</span> — люди (узлы) связаны дружбой (рёбра)</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">🗺️ Карта</span> — города (узлы) соединены дорогами (рёбра)</p>
  <p style="margin:4px 0"><span style="color:#00ff41">🎮 Игры</span> — локации (узлы) связаны переходами (рёбра)</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔍 Обход графа</h3>
<p>Два основных способа обойти все узлы:</p>
<div style="display:flex;gap:8px;margin:12px 0">
  <div style="flex:1;background:#0a0a14;border-left:3px solid #00f3ff;padding:10px;border-radius:0 6px 6px 0">
    <p style="color:#00f3ff;font-weight:bold;margin-bottom:2px;font-size:0.9em">BFS — в ширину</p>
    <p style="margin:0;color:#aaa;font-size:0.8em">Обходим соседей уровень за уровнем. Как волна на воде.</p>
  </div>
  <div style="flex:1;background:#0a0a14;border-left:3px solid #ff00ff;padding:10px;border-radius:0 6px 6px 0">
    <p style="color:#ff00ff;font-weight:bold;margin-bottom:2px;font-size:0.9em">DFS — в глубину</p>
    <p style="margin:0;color:#aaa;font-size:0.8em">Идём как можно глубже, потом возвращаемся. Как в лабиринте.</p>
  </div>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Где это используется?</p>
  <p style="margin:0">Google Maps ищет маршрут через граф дорог. Рекомендации друзей в соцсетях — через граф связей. Поисковые системы обходят граф интернета!</p>
</div>`
  },
  {
    id: 'cs101_m5_q2',
    courseId: 'course_cs101',
    module: 'Модуль 5: Структуры данных',
    title: 'Квиз: Деревья и графы',
    type: 'quiz',
    description: 'Проверь понимание продвинутых структур данных.',
    difficulty: 'Хакер',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    quizData: {
      question: 'Социальная сеть хранит информацию о пользователях и их друзьях. Какая структура данных лучше всего описывает эти связи?',
      options: [
        'Массив — список пользователей по номерам',
        'Стек — последний зарегистрировался, первый в ленте',
        'Граф — пользователи (узлы) связаны дружбой (рёбрами)',
        'Очередь — пользователи ждут регистрации'
      ],
      correctIndex: 2,
      explanation: 'Граф — идеальная модель для соцсети! Каждый пользователь — узел, каждая дружба — ребро. Это позволяет находить общих друзей, рекомендовать знакомых и т.д.'
    }
  },
  {
    id: 'cs101_m5_b1',
    courseId: 'course_cs101',
    module: 'Модуль 5: Структуры данных',
    title: 'Практика: Стек вызовов',
    type: 'blocks',
    description: 'Симулируй работу стека вызовов: как функции вызывают друг друга и возвращаются.',
    difficulty: 'Хакер',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['Вызов main() — кладём в стек', 'main() вызывает calculate() — кладём в стек', 'calculate() вызывает multiply() — кладём в стек', 'multiply() завершается — снимаем со стека', 'calculate() завершается — снимаем со стека', 'main() завершается — стек пуст'],
      correctSequence: ['Вызов main() — кладём в стек', 'main() вызывает calculate() — кладём в стек', 'calculate() вызывает multiply() — кладём в стек', 'multiply() завершается — снимаем со стека', 'calculate() завершается — снимаем со стека', 'main() завершается — стек пуст'],
      theme: 'cyber',
      successMessage: '📚 Верно! Так работает стек вызовов — основа выполнения любой программы. LIFO в действии!',
      illustration: `<div style="text-align:center;color:#aaa;margin:16px 0">
<p style="font-size:0.9em">push main → push calculate → push multiply → pop multiply → pop calculate → pop main</p>
<p style="font-size:1.5em;margin-top:8px">📚</p></div>`
    }
  },

  // ── МОДУЛЬ 6: ИНТЕРНЕТ И СЕТИ ─────────────────────────────────────────────
  {
    id: 'cs101_m6_t1',
    courseId: 'course_cs101',
    module: 'Модуль 6: Интернет и сети',
    title: 'Теория: Как работает интернет',
    type: 'theory',
    description: 'Узнай, как данные путешествуют по сети — от твоего компьютера до сервера.',
    difficulty: 'Хакер',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    theory: `<p style="color:#00f3ff;font-weight:bold;margin-bottom:12px">🌐 Добро пожаловать в Сеть...</p>
<p>Каждый раз, когда ты открываешь сайт или отправляешь сообщение, данные проходят длинный путь через миллионы устройств по всему миру. Как это работает?</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🏠 IP-адрес — твой адрес в сети</h3>
<p>Каждое устройство в интернете имеет уникальный <strong>IP-адрес</strong> — это как почтовый адрес дома. Без него никто не знает, куда доставить данные.</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="color:#aaa;margin:0 0 6px 0">Примеры IP-адресов:</p>
  <p style="margin:3px 0;color:#00ff41">192.168.1.1 <span style="color:#555">← твой роутер дома (IPv4)</span></p>
  <p style="margin:3px 0;color:#00ff41">8.8.8.8 <span style="color:#555">← DNS-сервер Google</span></p>
  <p style="margin:3px 0;color:#00f3ff">2001:0db8::1 <span style="color:#555">← адрес в формате IPv6 (новый стандарт)</span></p>
</div>
<p>IPv4 даёт ~4 млрд адресов (уже закончились!). IPv6 даёт 340 ундециллионов — хватит на каждую песчинку на Земле.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📦 Пакеты — посылки с данными</h3>
<p>Данные не отправляются целиком — они разбиваются на маленькие <strong>пакеты</strong>. Каждый пакет содержит:</p>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0">
  <p style="margin:4px 0"><span style="color:#fcee0a">📍 Адрес отправителя</span> — откуда пакет</p>
  <p style="margin:4px 0"><span style="color:#00f3ff">📍 Адрес получателя</span> — куда пакет</p>
  <p style="margin:4px 0"><span style="color:#00ff41">📄 Полезная нагрузка (Payload)</span> — часть файла или сообщения</p>
  <p style="margin:4px 0"><span style="color:#ff00ff">🔢 Порядковый номер</span> — чтобы собрать всё правильно</p>
  <p style="margin:4px 0"><span style="color:#ff003c">✅ Контрольная сумма</span> — проверка целостности данных</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔗 Модель OSI — 7 уровней сети</h3>
<p>Сеть работает по слоям, как торт. Каждый уровень отвечает за свою задачу:</p>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-size:0.85em">
  <p style="margin:3px 0"><span style="color:#ff003c;font-weight:bold">7. Приложение</span> — <span style="color:#aaa">HTTP, HTTPS, FTP, DNS</span></p>
  <p style="margin:3px 0"><span style="color:#ff6600;font-weight:bold">4. Транспорт</span> — <span style="color:#aaa">TCP (надёжно), UDP (быстро)</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a;font-weight:bold">3. Сеть</span> — <span style="color:#aaa">IP-адресация, маршрутизация</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41;font-weight:bold">1-2. Физический/Канал</span> — <span style="color:#aaa">кабели, Wi-Fi, Ethernet</span></p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">⚡ Интересный факт:</p>
  <p style="margin:0">Когда ты открываешь сайт, запрос проходит через все 7 уровней вниз, летит через десятки роутеров, и поднимается обратно через 7 уровней — всё за <strong>менее 100 миллисекунд</strong>!</p>
</div>`
  },
  {
    id: 'cs101_m6_q1',
    courseId: 'course_cs101',
    module: 'Модуль 6: Интернет и сети',
    title: 'Квиз: IP-адреса и пакеты',
    type: 'quiz',
    description: 'Проверь, как данные путешествуют по сети.',
    difficulty: 'Хакер',
    xpReward: 70,
    currencyReward: 20,
    status: 'locked',
    quizData: {
      question: 'Зачем данные разбиваются на пакеты при передаче по сети?',
      options: [
        'Чтобы занять меньше места на диске',
        'Чтобы передавать их по разным маршрутам и собирать на месте — это быстрее и надёжнее',
        'Потому что интернет не умеет передавать большие файлы',
        'Чтобы зашифровать данные'
      ],
      correctIndex: 1,
      explanation: 'Разбивка на пакеты позволяет отправлять их по разным маршрутам одновременно и пересылать заново только потерянные пакеты, а не весь файл целиком.'
    }
  },
  {
    id: 'cs101_m6_t2',
    courseId: 'course_cs101',
    module: 'Модуль 6: Интернет и сети',
    title: 'Теория: Протоколы и DNS',
    type: 'theory',
    description: 'Узнай, что такое протоколы, HTTP/HTTPS, DNS и как устроена веб-инфраструктура.',
    difficulty: 'Хакер',
    xpReward: 90,
    currencyReward: 30,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🔐 Правила Сети...</p>
<p>Чтобы компьютеры по всему миру понимали друг друга, они общаются по строгим правилам — <strong>протоколам</strong>.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📜 Основные протоколы</h3>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#0a0a14;border-left:3px solid #00f3ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00f3ff;font-weight:bold;margin-bottom:2px">HTTP / HTTPS</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Протокол веб-страниц. HTTPS — защищённая версия с TLS-шифрованием. Замочек в браузере = HTTPS.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #fcee0a;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#fcee0a;font-weight:bold;margin-bottom:2px">DNS — телефонная книга интернета</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Переводит имена сайтов в IP-адреса. google.com → 216.58.215.46.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:2px">TCP vs UDP</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">TCP — надёжный (проверяет доставку). UDP — быстрый (не проверяет). Видеозвонок = UDP, загрузка файла = TCP.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #ff00ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff00ff;font-weight:bold;margin-bottom:2px">FTP / SSH</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">FTP — передача файлов. SSH — безопасное удалённое управление сервером (терминал).</p>
  </div>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔍 Как работает DNS-запрос</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-size:0.85em">
  <p style="margin:4px 0"><span style="color:#fcee0a">1.</span> Ты вводишь <span style="color:#00f3ff">google.com</span> в браузере</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">2.</span> Браузер спрашивает DNS-сервер: «Какой IP у google.com?»</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">3.</span> DNS отвечает: <span style="color:#00ff41">216.58.215.46</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a">4.</span> Браузер подключается к этому IP по HTTP/HTTPS</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">5.</span> Сервер отправляет HTML-страницу</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔒 TLS/SSL — шифрование</h3>
<p>HTTPS использует <strong>TLS</strong> (Transport Layer Security) для шифрования. Процесс «рукопожатия»:</p>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-size:0.85em">
  <p style="margin:3px 0"><span style="color:#00f3ff">Клиент:</span> Привет! Я знаю шифры A, B, C</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">Сервер:</span> Давай используем B! Вот мой сертификат 📜</p>
  <p style="margin:3px 0"><span style="color:#00f3ff">Клиент:</span> Сертификат настоящий. Вот секретный ключ 🔑</p>
  <p style="margin:3px 0"><span style="color:#00ff41">Оба:</span> Теперь общаемся зашифрованно! 🔒</p>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">⚠️ Правило:</p>
  <p style="margin:0">Никогда не вводи пароли на сайтах без замочка (HTTP). Твои данные передаются открытым текстом и могут быть перехвачены!</p>
</div>`
  },
  {
    id: 'cs101_m6_q2',
    courseId: 'course_cs101',
    module: 'Модуль 6: Интернет и сети',
    title: 'Квиз: Протоколы и DNS',
    type: 'quiz',
    description: 'Проверь знания о протоколах и защите данных в сети.',
    difficulty: 'Хакер',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'Ты играешь в онлайн-игру и ведёшь голосовой чат. Какой протокол скорее всего используется для голоса?',
      options: [
        'TCP — надёжный, проверяет каждый пакет',
        'UDP — быстрый, допускает потерю пакетов',
        'HTTP — протокол веб-страниц',
        'FTP — протокол передачи файлов'
      ],
      correctIndex: 1,
      explanation: 'Для голоса и видео используется UDP — он быстрее, потому что не ждёт подтверждения каждого пакета. Потеря одного пакета голоса незаметна, а вот задержка раздражает!'
    }
  },
  {
    id: 'cs101_m6_b1',
    courseId: 'course_cs101',
    module: 'Модуль 6: Интернет и сети',
    title: 'Практика: Путь HTTP-запроса',
    type: 'blocks',
    description: 'Собери правильную последовательность: что происходит, когда ты открываешь сайт.',
    difficulty: 'Хакер',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['Вводишь URL в браузер', 'Браузер запрашивает IP у DNS-сервера', 'DNS возвращает IP-адрес сервера', 'Браузер устанавливает TCP-соединение + TLS', 'Браузер отправляет HTTP GET запрос', 'Сервер возвращает HTML/CSS/JS', 'Браузер рендерит страницу на экране'],
      correctSequence: ['Вводишь URL в браузер', 'Браузер запрашивает IP у DNS-сервера', 'DNS возвращает IP-адрес сервера', 'Браузер устанавливает TCP-соединение + TLS', 'Браузер отправляет HTTP GET запрос', 'Сервер возвращает HTML/CSS/JS', 'Браузер рендерит страницу на экране'],
      theme: 'cyber',
      successMessage: '🌐 Точно! Ты знаешь полный путь HTTP-запроса — от URL до отрендеренной страницы!',
      illustration: `<div style="text-align:center;color:#aaa;margin:16px 0">
<p style="font-size:0.9em">URL → DNS → IP → TCP+TLS → HTTP → HTML → Рендеринг</p>
<p style="font-size:1.5em;margin-top:8px">🌐</p></div>`
    }
  },

  // ── МОДУЛЬ 7: КИБЕРБЕЗОПАСНОСТЬ ──────────────────────────────────────────
  {
    id: 'cs101_m7_t1',
    courseId: 'course_cs101',
    module: 'Модуль 7: Кибербезопасность',
    title: 'Теория: Угрозы в сети',
    type: 'theory',
    description: 'Узнай о главных угрозах в интернете: вирусах, фишинге и социальной инженерии.',
    difficulty: 'Хакер',
    xpReward: 90,
    currencyReward: 30,
    status: 'locked',
    theory: `<p style="color:#ff003c;font-weight:bold;margin-bottom:12px">⚠️ Внимание! Обнаружены угрозы в Сети...</p>
<p>Интернет — это не только полезный инструмент, но и место, где водятся <strong>цифровые хищники</strong>. Чтобы защититься, нужно знать врага в лицо.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🦠 Виды вредоносного ПО (Malware)</h3>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#1a0a0a;border-left:3px solid #ff003c;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff003c;font-weight:bold;margin-bottom:2px">🦠 Вирус</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Прикрепляется к файлам и размножается. Может удалять данные, замедлять систему.</p>
  </div>
  <div style="background:#1a0a0a;border-left:3px solid #ff6600;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff6600;font-weight:bold;margin-bottom:2px">🔒 Ransomware (Шифровальщик)</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Шифрует все файлы и требует выкуп. WannaCry (2017) поразил 200 000 компьютеров в 150 странах.</p>
  </div>
  <div style="background:#1a0a0a;border-left:3px solid #ff00ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff00ff;font-weight:bold;margin-bottom:2px">🕵️ Spyware (Шпион)</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Тайно записывает пароли, скриншоты, нажатия клавиш (keylogger).</p>
  </div>
  <div style="background:#1a0a0a;border-left:3px solid #5e60ce;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#5e60ce;font-weight:bold;margin-bottom:2px">🐴 Троян</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Маскируется под полезную программу. «Бесплатный антивирус» может оказаться трояном!</p>
  </div>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎣 Фишинг и социальная инженерия</h3>
<p><strong>Фишинг</strong> — злоумышленники притворяются кем-то другим, чтобы украсть данные.</p>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0">
  <p style="margin:0 0 8px 0;color:#aaa">Пример фишингового письма:</p>
  <div style="background:#1a0a0a;border:1px solid #ff003c;border-radius:6px;padding:12px">
    <p style="color:#ff003c;font-size:0.85em;margin:0 0 4px 0">От: support@g00gle.com</p>
    <p style="color:#aaa;font-size:0.85em;margin:0 0 4px 0">Тема: Ваш аккаунт заблокирован!</p>
    <p style="color:#aaa;font-size:0.85em;margin:0">«Срочно войдите по ссылке и подтвердите пароль!»</p>
  </div>
  <p style="color:#fcee0a;font-size:0.85em;margin:8px 0 0 0">⚠️ g<strong>00</strong>gle вместо g<strong>oo</strong>gle — подделка!</p>
</div>
<p><strong>Социальная инженерия</strong> — манипуляция людьми. Хакеру проще обмануть человека, чем взломать систему. «Я из техподдержки, назовите пароль» — классика.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">💉 Атаки на веб-приложения</h3>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-size:0.85em">
  <p style="margin:4px 0"><span style="color:#ff003c;font-weight:bold">SQL-инъекция</span> — хакер вводит SQL-код в поле ввода, чтобы получить доступ к БД</p>
  <p style="margin:4px 0"><span style="color:#ff6600;font-weight:bold">XSS</span> — хакер внедряет JavaScript на страницу для кражи cookies</p>
  <p style="margin:4px 0"><span style="color:#ff00ff;font-weight:bold">DDoS</span> — тысячи компьютеров одновременно атакуют сервер, перегружая его</p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">🛡️ Как защититься:</p>
  <p style="margin:0">Проверяй URL. Не открывай подозрительные вложения. Используй антивирус. Обновляй ПО. Не доверяй незнакомцам в сети.</p>
</div>`
  },
  {
    id: 'cs101_m7_q1',
    courseId: 'course_cs101',
    module: 'Модуль 7: Кибербезопасность',
    title: 'Квиз: Распознай угрозу',
    type: 'quiz',
    description: 'Проверь, умеешь ли ты распознавать кибератаки.',
    difficulty: 'Хакер',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    quizData: {
      question: 'Тебе пришло письмо: «Ваш банковский аккаунт взломан! Срочно введите пароль на сайте bank-secure-login.ru». Что это?',
      options: [
        'Настоящее предупреждение от банка',
        'Фишинг — мошенники пытаются украсть твой пароль',
        'DDoS-атака на твой компьютер',
        'SQL-инъекция'
      ],
      correctIndex: 1,
      explanation: 'Классический фишинг! Настоящий банк никогда не просит ввести пароль по ссылке из письма. Подозрительный домен — явный признак мошенничества.'
    }
  },
  {
    id: 'cs101_m7_t2',
    courseId: 'course_cs101',
    module: 'Модуль 7: Кибербезопасность',
    title: 'Теория: Твой цифровой щит',
    type: 'theory',
    description: 'Узнай, как создавать надёжные пароли, использовать 2FA и защищать данные.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 40,
    status: 'locked',
    theory: `<p style="color:#00ff41;font-weight:bold;margin-bottom:12px">🛡️ Строим защиту...</p>
<p>Теперь ты знаешь об угрозах. Пора построить <strong>цифровой щит</strong> — набор привычек и инструментов для защиты.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔑 Надёжный пароль</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0">
  <p style="margin:4px 0"><span style="color:#00ff41">✅</span> Длина от <strong>12 символов</strong> и больше</p>
  <p style="margin:4px 0"><span style="color:#00ff41">✅</span> Смесь букв, цифр и символов: <code style="color:#fcee0a;background:#0a0a14;padding:1px 4px">K9#mX2$pL7!</code></p>
  <p style="margin:4px 0"><span style="color:#00ff41">✅</span> Разные пароли для разных сайтов</p>
  <p style="margin:4px 0"><span style="color:#00ff41">✅</span> Используй <strong>менеджер паролей</strong> (1Password, Bitwarden)</p>
  <p style="margin:4px 0"><span style="color:#ff003c">❌</span> Не используй: имя, дату, «123456», «qwerty», «password»</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📊 Время взлома пароля</h3>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:0.85em">
  <p style="margin:3px 0"><span style="color:#ff003c">123456</span>     → <span style="color:#ff003c">мгновенно</span></p>
  <p style="margin:3px 0"><span style="color:#ff6600">password1</span>  → <span style="color:#ff6600">1 секунда</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">MyDog2015!</span> → <span style="color:#fcee0a">3 дня</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">Tr0ub4dor&3#kX!</span> → <span style="color:#00ff41">34 000 лет</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔐 Двухфакторная аутентификация (2FA)</h3>
<p>Даже если пароль украден, <strong>2FA</strong> требует второй фактор:</p>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:2px">📱 Приложение-аутентификатор (лучший)</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Google Authenticator, Authy — генерируют код каждые 30 сек.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #fcee0a;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#fcee0a;font-weight:bold;margin-bottom:2px">📧 SMS-код (слабее)</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Код по SMS — лучше, чем ничего, но SIM можно перехватить.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #00f3ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00f3ff;font-weight:bold;margin-bottom:2px">🔑 Аппаратный ключ (самый надёжный)</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">YubiKey — физический USB-ключ. Без него вход невозможен.</p>
  </div>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:6px">🏆 Чеклист Нетраннера:</p>
  <p style="margin:2px 0">✅ Уникальные сложные пароли + менеджер паролей</p>
  <p style="margin:2px 0">✅ 2FA на всех важных аккаунтах</p>
  <p style="margin:2px 0">✅ Обновлённое ПО и антивирус</p>
  <p style="margin:2px 0">✅ Бэкапы важных файлов</p>
  <p style="margin:2px 0">✅ Умение распознавать фишинг и соцИнженерию</p>
  <p style="margin:2px 0">✅ VPN для публичных Wi-Fi</p>
</div>`
  },
  {
    id: 'cs101_m7_q2',
    courseId: 'course_cs101',
    module: 'Модуль 7: Кибербезопасность',
    title: 'Квиз: Финальная проверка',
    type: 'quiz',
    description: 'Финальный тест — проверь все знания курса.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 40,
    status: 'locked',
    quizData: {
      question: 'Какой из паролей самый надёжный?',
      options: [
        'ivan2010',
        '123456789',
        'qwerty',
        'Tr0ub4dor&3#kX!'
      ],
      correctIndex: 3,
      explanation: 'Tr0ub4dor&3#kX! — длинный (15 символов), содержит заглавные и строчные буквы, цифры и спецсимволы. Остальные — в топ-10 самых взламываемых паролей.'
    }
  },
  {
    id: 'cs101_m7_b1',
    courseId: 'course_cs101',
    module: 'Модуль 7: Кибербезопасность',
    title: 'Практика: Уровни защиты',
    type: 'blocks',
    description: 'Собери уровни защиты данных — от базового до максимального.',
    difficulty: 'Хакер',
    xpReward: 100,
    currencyReward: 35,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['Надёжный уникальный пароль (12+ символов)', 'Двухфакторная аутентификация (2FA)', 'Менеджер паролей для всех аккаунтов', 'Регулярные обновления ПО и ОС', 'Шифрование диска (BitLocker / FileVault)', 'VPN для публичных сетей', 'Регулярные бэкапы по правилу 3-2-1'],
      correctSequence: ['Надёжный уникальный пароль (12+ символов)', 'Двухфакторная аутентификация (2FA)', 'Менеджер паролей для всех аккаунтов', 'Регулярные обновления ПО и ОС', 'Шифрование диска (BitLocker / FileVault)', 'VPN для публичных сетей', 'Регулярные бэкапы по правилу 3-2-1'],
      theme: 'cyber',
      successMessage: '🛡️ Ты прошёл курс CS101! Теперь ты настоящий Нетраннер — знаешь архитектуру компьютера, алгоритмы, структуры данных, сети и кибербезопасность!',
      illustration: `<div style="text-align:center;color:#aaa;margin:16px 0">
<p style="font-size:0.9em">Пароль → 2FA → Менеджер → Обновления → Шифрование → VPN → Бэкапы</p>
<p style="font-size:2em;margin-top:8px">🏆</p>
<p style="color:#00ff41;font-weight:bold">Курс завершён! Ты — Нетраннер!</p></div>`
    }
  },
  
  // =========================================================================
  // LUA101: ПРОТОКОЛЫ ДРОНА — переработанный курс
  // Структура модуля: 1 теория → 1 квиз → 1-2 практики (terminal)
  // =========================================================================

  // ── МОДУЛЬ 1: ПЕРЕМЕННЫЕ И СИНТАКСИС ─────────────────────────────────────
  {
    id: 'lua_001',
    courseId: 'course_lua101',
    module: 'Модуль 1: Переменные и синтаксис',
    title: 'Теория: Твой первый код на Lua',
    type: 'theory',
    description: 'Что такое Lua, как выводить текст и хранить данные в переменных.',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 10,
    status: 'open',
    theory: `<p style="color:#00f3ff;font-weight:bold;margin-bottom:12px">📡 Инициализация протокола Lua...</p>
<p>Добро пожаловать, Нетраннер! Ты будешь программировать на языке <strong>Lua</strong> — компактном и мощном языке, который используется в играх (Roblox, World of Warcraft), роботах и встроенных системах.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">💬 Вывод текста — print()</h3>
<p>Самая первая команда — заставить программу что-то сказать. Для этого используется <code style="color:#fcee0a;background:#0a0a14;padding:1px 6px;border-radius:4px">print()</code>:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="color:#aaa;margin:0 0 6px 0">-- Вывести текст:</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#00ff41">"Привет, Матрица!"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">42</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">10 + 5</span>)  <span style="color:#555">-- выведет 15</span></p>
</div>
<p>Текст (строки) всегда в кавычках. Числа — без кавычек. Текст после <code style="color:#555">--</code> — это комментарий, компьютер его игнорирует.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📦 Переменные — коробки с данными</h3>
<p>Переменная — это именованная ячейка памяти. Создаётся с ключевым словом <code style="color:#fcee0a;background:#0a0a14;padding:1px 6px;border-radius:4px">local</code>:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">energy</span> = <span style="color:#fcee0a">100</span>      <span style="color:#555">-- число</span></p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">name</span> = <span style="color:#00ff41">"Ava"</span>     <span style="color:#555">-- строка</span></p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">alive</span> = <span style="color:#ff00ff">true</span>     <span style="color:#555">-- булево (да/нет)</span></p>
  <p style="margin:6px 0 3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">name</span>)           <span style="color:#555">-- выведет: Ava</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">energy</span>)         <span style="color:#555">-- выведет: 100</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔢 Арифметика</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">damage</span> = <span style="color:#fcee0a">50 + 30</span>   <span style="color:#555">-- 80</span></p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">hp</span> = <span style="color:#fcee0a">100 - 25</span>      <span style="color:#555">-- 75</span></p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">power</span> = <span style="color:#fcee0a">10 * 3</span>    <span style="color:#555">-- 30</span></p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">half</span> = <span style="color:#fcee0a">20 / 4</span>     <span style="color:#555">-- 5</span></p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Важно:</p>
  <p style="margin:0">Lua чувствителен к регистру! <code>print</code> работает, а <code>Print</code> или <code>PRINT</code> — нет. Всегда пиши строчными буквами.</p>
</div>`
  },
  {
    id: 'lua_001q',
    courseId: 'course_lua101',
    module: 'Модуль 1: Переменные и синтаксис',
    title: 'Квиз: Переменные и вывод',
    type: 'quiz',
    description: 'Проверь понимание переменных и команды print.',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'open',
    quizData: {
      question: 'Что выведет этот код?\n\nlocal x = 5\nlocal y = 3\nprint(x + y)',
      options: ['x + y', '53', '8', 'Ошибку — нельзя складывать переменные'],
      correctIndex: 2,
      explanation: 'x хранит 5, y хранит 3. print(x + y) вычислит 5 + 3 = 8 и выведет результат.'
    }
  },
  {id:'lua_001q2',courseId:'course_lua101',module:'Модуль 1: Переменные и синтаксис',title:'Квиз: Типы данных',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Какой тип у значения \"hello\" в Lua?",options:["number","string","boolean","table"],correctIndex:1,explanation:"Текст в кавычках — это string (строка). number — числа, boolean — true/false."}},
  {
    id: 'lua_002',
    courseId: 'course_lua101',
    module: 'Модуль 1: Переменные и синтаксис',
    title: 'Практика: Первое сообщение',
    type: 'terminal',
    description: 'Напиши программу, которая выводит фразу "Hello, Hero!" в консоль.',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'print("Hello, Hero!")' },
    initialCode: '-- Используй команду print, чтобы вывести текст\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Вывод текста</h3>
<p>Используй <code style="color:#fcee0a">print()</code> для вывода. Текст — в кавычках:</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:0"><span style="color:#ff00ff">print</span>(<span style="color:#00ff41">"Hello, Hero!"</span>)</p>
</div>`
  },
  {
    id: 'lua_003',
    courseId: 'course_lua101',
    module: 'Модуль 1: Переменные и синтаксис',
    title: 'Практика: Счёт кредитов',
    type: 'terminal',
    description: 'У тебя 7 монет (coins) и ты нашёл ещё 5 (found). Создай переменную total равную их сумме и выведи её.',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 15,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'math_sum' },
    initialCode: 'local coins = 7\nlocal found = 5\n-- Создай total = coins + found\n-- Выведи total\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Сложение переменных</h3>
<p>Переменные с числами можно складывать как обычные числа:</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">a</span> = <span style="color:#fcee0a">10</span></p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">b</span> = <span style="color:#fcee0a">5</span></p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">result</span> = <span style="color:#fcee0a">a + b</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">result</span>)  <span style="color:#555">-- 15</span></p>
</div>`
  },

  // ── МОДУЛЬ 2: ЛОГИКА И ЦИКЛЫ ──────────────────────────────────────────────
  {
    id: 'lua_007',
    courseId: 'course_lua101',
    module: 'Модуль 2: Логика и циклы',
    title: 'Теория: Условия и циклы',
    type: 'theory',
    description: 'Научи программу принимать решения (if/else) и повторять действия (while, for).',
    difficulty: 'Хакер',
    xpReward: 60,
    currencyReward: 15,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🤖 Дрон учится думать...</p>
<p>Пока что наши программы выполняются строчка за строчкой без остановок. Но что если нужно принять решение или повторить действие много раз? Для этого есть <strong>условия</strong> и <strong>циклы</strong>.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔀 Условие if / else</h3>
<p>Позволяет выполнять разный код в зависимости от условия:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">hp</span> = <span style="color:#fcee0a">80</span></p>
  <p style="margin:8px 0 3px 0"><span style="color:#ff00ff">if</span> hp &gt; <span style="color:#fcee0a">50</span> <span style="color:#ff00ff">then</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Дрон в норме"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">else</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Критическое состояние!"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>
<p>Операторы сравнения: <code style="color:#fcee0a">&gt;</code> больше, <code style="color:#fcee0a">&lt;</code> меньше, <code style="color:#fcee0a">==</code> равно, <code style="color:#fcee0a">~=</code> не равно. Логика: <code style="color:#fcee0a">and</code>, <code style="color:#fcee0a">or</code>, <code style="color:#fcee0a">not</code>.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔁 Цикл while</h3>
<p>Повторяет блок кода, пока условие истинно:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">fuel</span> = <span style="color:#fcee0a">3</span></p>
  <p style="margin:8px 0 3px 0"><span style="color:#ff00ff">while</span> fuel &gt; <span style="color:#fcee0a">0</span> <span style="color:#ff00ff">do</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Летим! Топливо: "</span> .. fuel)</p>
  <p style="margin:3px 0 3px 20px">fuel = fuel - <span style="color:#fcee0a">1</span>  <span style="color:#555">-- уменьшаем счётчик!</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔢 Цикл for</h3>
<p>Идеален, когда знаешь точное количество повторений:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">for</span> i = <span style="color:#fcee0a">1</span>, <span style="color:#fcee0a">5</span> <span style="color:#ff00ff">do</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Выстрел #"</span> .. i)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span>  <span style="color:#555">-- выведет Выстрел #1 ... Выстрел #5</span></p>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">⚠️ Важно про while:</p>
  <p style="margin:0">Всегда изменяй переменную внутри цикла! Если условие никогда не станет ложным — программа зависнет в бесконечном цикле.</p>
</div>`
  },
  {
    id: 'lua_007q',
    courseId: 'course_lua101',
    module: 'Модуль 2: Логика и циклы',
    title: 'Квиз: Условия и циклы',
    type: 'quiz',
    description: 'Проверь понимание if/else и циклов.',
    difficulty: 'Хакер',
    xpReward: 50,
    currencyReward: 15,
    status: 'locked',
    quizData: {
      question: 'Сколько раз выведется "Огонь!" в этом коде?\n\nfor i = 1, 4 do\n  print("Огонь!")\nend',
      options: ['1 раз', '3 раза', '4 раза', '5 раз'],
      correctIndex: 2,
      explanation: 'Цикл for i = 1, 4 выполняется при i=1, i=2, i=3, i=4 — ровно 4 раза.'
    }
  },
  {id:'lua_007q2',courseId:'course_lua101',module:'Модуль 2: Логика и циклы',title:'Квиз: Циклы',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Сколько раз выполнится for i=1,5 do ... end?",options:["4","5","6","Бесконечно"],correctIndex:1,explanation:"for i=1,5 — от 1 до 5 включительно = 5 итераций."}},
  {
    id: 'lua_008',
    courseId: 'course_lua101',
    module: 'Модуль 2: Логика и циклы',
    title: 'Практика: Охрана ворот',
    type: 'terminal',
    description: 'Если переменная hasKey равна true — выведи "ДОСТУП ОТКРЫТ", иначе — "ДОСТУП ЗАПРЕЩЁН".',
    difficulty: 'Хакер',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'gate_check' },
    initialCode: 'local hasKey = true\n-- Напиши if ... then ... else ... end\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">if / else</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">if</span> hasKey <span style="color:#ff00ff">then</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"ОТКРЫТО"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">else</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"ЗАКРЫТО"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>`
  },
  {
    id: 'lua_009',
    courseId: 'course_lua101',
    module: 'Модуль 2: Логика и циклы',
    title: 'Практика: Патруль дрона',
    type: 'terminal',
    description: 'Используй цикл for, чтобы вывести числа от 1 до 5 — шаги патруля дрона.',
    difficulty: 'Хакер',
    xpReward: 70,
    currencyReward: 20,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'patrol_loop' },
    initialCode: '-- Используй цикл for от 1 до 5\n-- Выведи каждое число\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Цикл for</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">for</span> i = <span style="color:#fcee0a">1</span>, <span style="color:#fcee0a">5</span> <span style="color:#ff00ff">do</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(i)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>`
  },

  // ── МОДУЛЬ 3: ФУНКЦИИ ─────────────────────────────────────────────────────
  {
    id: 'lua_013',
    courseId: 'course_lua101',
    module: 'Модуль 3: Функции',
    title: 'Теория: Функции — свои команды',
    type: 'theory',
    description: 'Научись создавать собственные команды с аргументами и возвратом значений.',
    difficulty: 'Элита',
    xpReward: 70,
    currencyReward: 20,
    status: 'locked',
    theory: `<p style="color:#00f3ff;font-weight:bold;margin-bottom:12px">⚙️ Создаём собственные команды...</p>
<p>Представь, что тебе нужно 10 раз написать одинаковый код для атаки. Это неудобно! Вместо этого можно создать <strong>функцию</strong> — блок кода с именем, который можно вызывать сколько угодно раз.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📝 Объявление функции</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="color:#aaa;margin:0 0 6px 0">-- Объявляем функцию:</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">greet</span>()</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Привет, Нетраннер!"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:10px 0 3px 0;color:#aaa">-- Вызываем функцию:</p>
  <p style="margin:3px 0"><span style="color:#fcee0a">greet</span>()  <span style="color:#555">-- выведет: Привет, Нетраннер!</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">greet</span>()  <span style="color:#555">-- можно вызывать снова!</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📨 Аргументы — данные для функции</h3>
<p>Функции могут принимать данные через <strong>аргументы</strong>:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">attack</span>(<span style="color:#00f3ff">target</span>, <span style="color:#00f3ff">damage</span>)</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Атака на "</span> .. <span style="color:#00f3ff">target</span> .. <span style="color:#00ff41">" — урон: "</span> .. <span style="color:#00f3ff">damage</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:10px 0 3px 0"><span style="color:#fcee0a">attack</span>(<span style="color:#00ff41">"Дракон"</span>, <span style="color:#fcee0a">50</span>)  <span style="color:#555">-- Атака на Дракон — урон: 50</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">attack</span>(<span style="color:#00ff41">"Робот"</span>, <span style="color:#fcee0a">30</span>)   <span style="color:#555">-- Атака на Робот — урон: 30</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📤 Return — возврат результата</h3>
<p>Функция может не только печатать, но и <strong>возвращать</strong> результат для дальнейшего использования:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">double</span>(<span style="color:#00f3ff">n</span>)</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">return</span> <span style="color:#00f3ff">n</span> * <span style="color:#fcee0a">2</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:10px 0 3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">result</span> = <span style="color:#fcee0a">double</span>(<span style="color:#fcee0a">10</span>)</p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">result</span>)  <span style="color:#555">-- 20</span></p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Зачем функции?</p>
  <p style="margin:0">Функции — это основа программирования. Они позволяют не повторять один и тот же код, делать программу понятнее и легче изменять.</p>
</div>`
  },
  {
    id: 'lua_013q',
    courseId: 'course_lua101',
    module: 'Модуль 3: Функции',
    title: 'Квиз: Функции и return',
    type: 'quiz',
    description: 'Проверь понимание функций, аргументов и возврата значений.',
    difficulty: 'Элита',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    quizData: {
      question: 'Что выведет этот код?\n\nfunction calc(x)\n  return x * 3\nend\nprint(calc(4))',
      options: ['x * 3', 'calc(4)', '12', 'Ошибку'],
      correctIndex: 2,
      explanation: 'Функция calc принимает x=4 и возвращает 4 * 3 = 12. print() выводит это значение.'
    }
  },
  {id:'lua_013q2',courseId:'course_lua101',module:'Модуль 3: Функции',title:'Квиз: Return',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Что делает return?",options:["Останавливает программу","Возвращает значение из функции","Печатает текст","Создаёт переменную"],correctIndex:1,explanation:"return завершает функцию и возвращает значение вызывающему коду."}},
  {
    id: 'lua_014',
    courseId: 'course_lua101',
    module: 'Модуль 3: Функции',
    title: 'Практика: Удар героя',
    type: 'terminal',
    description: 'Напиши функцию attack(target), которая выводит "Атака: " .. target. Вызови её для "ogre".',
    difficulty: 'Элита',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'func_attack' },
    initialCode: '-- 1. Объяви функцию attack(target)\n-- 2. Внутри выведи "Атака: " .. target\n-- 3. Вызови attack("ogre")\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Функция с аргументом</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">greet</span>(<span style="color:#00f3ff">name</span>)</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Hello "</span> .. <span style="color:#00f3ff">name</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:6px 0 3px 0"><span style="color:#fcee0a">greet</span>(<span style="color:#00ff41">"Neo"</span>)  <span style="color:#555">-- Hello Neo</span></p>
</div>`
  },
  {
    id: 'lua_016',
    courseId: 'course_lua101',
    module: 'Модуль 3: Функции',
    title: 'Практика: Расчёт урона',
    type: 'terminal',
    description: 'Напиши функцию calc(power), которая возвращает (return) удвоенное значение power. Выведи результат для calc(10).',
    difficulty: 'Элита',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'func_return' },
    initialCode: 'function calc(power)\n  -- верни power умноженный на 2\nend\nprint(calc(10))',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">return — возврат значения</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">double</span>(<span style="color:#00f3ff">n</span>)</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">return</span> <span style="color:#00f3ff">n</span> * <span style="color:#fcee0a">2</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:6px 0 3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">double</span>(<span style="color:#fcee0a">5</span>))  <span style="color:#555">-- 10</span></p>
</div>`
  },

  // ── МОДУЛЬ 4: ТАБЛИЦЫ ─────────────────────────────────────────────────────
  {
    id: 'lua_019',
    courseId: 'course_lua101',
    module: 'Модуль 4: Таблицы',
    title: 'Теория: Таблицы — списки и объекты',
    type: 'theory',
    description: 'Узнай, как хранить коллекции данных в таблицах Lua.',
    difficulty: 'Легенда',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    theory: `<p style="color:#fcee0a;font-weight:bold;margin-bottom:12px">🗄️ Загружаем базу данных...</p>
<p>До сих пор мы хранили по одному значению в переменной. Но что если нужно хранить список из 100 предметов? Для этого в Lua есть <strong>таблицы (tables)</strong> — единственная структура данных в языке, но очень мощная!</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📋 Таблица как список (массив)</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">backpack</span> = {<span style="color:#00ff41">"Зелье"</span>, <span style="color:#00ff41">"Карта"</span>, <span style="color:#00ff41">"Меч"</span>}</p>
  <p style="margin:10px 0 3px 0"><span style="color:#555">-- Доступ по индексу (в Lua счёт с 1!):</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">backpack</span>[<span style="color:#fcee0a">1</span>])  <span style="color:#555">-- Зелье</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">backpack</span>[<span style="color:#fcee0a">2</span>])  <span style="color:#555">-- Карта</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">#backpack</span>)   <span style="color:#555">-- 3 (длина таблицы)</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔁 Перебор таблицы — ipairs</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">for</span> i, item <span style="color:#ff00ff">in</span> <span style="color:#fcee0a">ipairs</span>(<span style="color:#fcee0a">backpack</span>) <span style="color:#ff00ff">do</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(i .. <span style="color:#00ff41">". "</span> .. item)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:8px 0 3px 0;color:#555">-- Выведет:</p>
  <p style="margin:3px 0;color:#555">-- 1. Зелье</p>
  <p style="margin:3px 0;color:#555">-- 2. Карта</p>
  <p style="margin:3px 0;color:#555">-- 3. Меч</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🧑‍💻 Таблица как объект (словарь)</h3>
<p>Таблица может хранить данные с именованными ключами — как профиль персонажа:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">hero</span> = {</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00f3ff">name</span> = <span style="color:#00ff41">"Ava"</span>,</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00f3ff">hp</span> = <span style="color:#fcee0a">100</span>,</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00f3ff">level</span> = <span style="color:#fcee0a">5</span></p>
  <p style="margin:3px 0">}</p>
  <p style="margin:10px 0 3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">hero</span>.<span style="color:#00f3ff">name</span>)   <span style="color:#555">-- Ava</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">hero</span>.<span style="color:#00f3ff">hp</span>)     <span style="color:#555">-- 100</span></p>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">⚠️ Важно:</p>
  <p style="margin:0">В Lua индексы массива начинаются с <strong>1</strong>, а не с 0 как во многих других языках!</p>
</div>`
  },
  {
    id: 'lua_019q',
    courseId: 'course_lua101',
    module: 'Модуль 4: Таблицы',
    title: 'Квиз: Таблицы Lua',
    type: 'quiz',
    description: 'Проверь понимание таблиц, индексов и ipairs.',
    difficulty: 'Легенда',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'Что выведет этот код?\n\nlocal items = {"A", "B", "C"}\nprint(items[2])',
      options: ['A', 'B', 'C', 'Ошибку — индексы начинаются с 0'],
      correctIndex: 1,
      explanation: 'В Lua индексы начинаются с 1. items[1] = "A", items[2] = "B", items[3] = "C". Поэтому items[2] выведет "B".'
    }
  },
  {id:'lua_019q2',courseId:'course_lua101',module:'Модуль 4: Таблицы',title:'Квиз: Индексы',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"С какого числа нумеруются элементы таблицы в Lua?",options:["0","1","Любого","-1"],correctIndex:1,explanation:"В Lua массивы нумеруются с 1, в отличие от большинства других языков."}},
  {
    id: 'lua_020',
    courseId: 'course_lua101',
    module: 'Модуль 4: Таблицы',
    title: 'Практика: Инвентарь',
    type: 'terminal',
    description: 'Дан список предметов. Выведи количество предметов в рюкзаке (длину таблицы).',
    difficulty: 'Легенда',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'table_len' },
    initialCode: 'local items = {"potion", "coin", "key", "gem"}\n-- Выведи длину таблицы items\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Длина таблицы</h3>
<p>Оператор <code style="color:#fcee0a">#</code> возвращает количество элементов:</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">#items</span>)  <span style="color:#555">-- число элементов</span></p>
</div>`
  },
  {
    id: 'lua_022',
    courseId: 'course_lua101',
    module: 'Модуль 4: Таблицы',
    title: 'Практика: Обход инвентаря',
    type: 'terminal',
    description: 'Перебери все предметы в списке с помощью ipairs и выведи каждый.',
    difficulty: 'Легенда',
    xpReward: 90,
    currencyReward: 35,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'table_iter' },
    initialCode: 'local items = {"potion", "coin", "key"}\n-- Используй for i, item in ipairs(items) do\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">ipairs — перебор таблицы</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">for</span> i, item <span style="color:#ff00ff">in</span> <span style="color:#fcee0a">ipairs</span>(items) <span style="color:#ff00ff">do</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(item)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>`
  },

  // ── МОДУЛЬ 5: АЛГОРИТМЫ И ФИНАЛ ──────────────────────────────────────────
  {
    id: 'lua_030',
    courseId: 'course_lua101',
    module: 'Модуль 5: Алгоритмы и финал',
    title: 'Теория: Алгоритмы на практике',
    type: 'theory',
    description: 'Научись применять всё изученное: поиск максимума, фильтрация и строки.',
    difficulty: 'Легенда',
    xpReward: 100,
    currencyReward: 35,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🏆 Финальный модуль — объединяем всё!</p>
<p>Ты уже знаешь переменные, условия, циклы, функции и таблицы. Теперь научимся комбинировать их для решения реальных задач — это и есть <strong>алгоритмическое мышление</strong>.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔍 Алгоритм поиска максимума</h3>
<p>Задача: найти наибольшее число в списке.</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">powers</span> = {<span style="color:#fcee0a">3</span>, <span style="color:#fcee0a">9</span>, <span style="color:#fcee0a">2</span>, <span style="color:#fcee0a">7</span>}</p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">max</span> = <span style="color:#fcee0a">0</span>  <span style="color:#555">-- начинаем с 0</span></p>
  <p style="margin:8px 0 3px 0"><span style="color:#ff00ff">for</span> _, v <span style="color:#ff00ff">in</span> <span style="color:#fcee0a">ipairs</span>(<span style="color:#fcee0a">powers</span>) <span style="color:#ff00ff">do</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">if</span> v &gt; <span style="color:#fcee0a">max</span> <span style="color:#ff00ff">then</span></p>
  <p style="margin:3px 0 3px 40px"><span style="color:#fcee0a">max</span> = v  <span style="color:#555">-- запоминаем новый максимум</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:8px 0 3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">max</span>)  <span style="color:#555">-- 9</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔤 Работа со строками</h3>
<p>Lua умеет работать с текстом. Несколько полезных функций:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">s</span> = <span style="color:#00ff41">"Hello, Netrunner!"</span></p>
  <p style="margin:8px 0 3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">#s</span>)                        <span style="color:#555">-- длина: 17</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">string.upper</span>(s))          <span style="color:#555">-- HELLO, NETRUNNER!</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">string.sub</span>(s, <span style="color:#fcee0a">1</span>, <span style="color:#fcee0a">5</span>))      <span style="color:#555">-- Hello</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">string.find</span>(s, <span style="color:#00ff41">"Net"</span>))    <span style="color:#555">-- 8 (позиция)</span></p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">🏆 Ты почти у цели!</p>
  <p style="margin:0">В финальном проекте тебе нужно будет объединить всё: таблицы, циклы, условия и функции. Это настоящий код, как у профессиональных разработчиков!</p>
</div>`
  },
  {
    id: 'lua_030q',
    courseId: 'course_lua101',
    module: 'Модуль 5: Алгоритмы и финал',
    title: 'Квиз: Алгоритмы и строки',
    type: 'quiz',
    description: 'Проверь понимание алгоритмов поиска и работы со строками.',
    difficulty: 'Легенда',
    xpReward: 90,
    currencyReward: 35,
    status: 'locked',
    quizData: {
      question: 'Что делает string.find("mana_potion", "potion")?',
      options: [
        'Удаляет слово "potion" из строки',
        'Возвращает позицию, где начинается "potion" в строке',
        'Возвращает true или false',
        'Выводит "potion" на экран'
      ],
      correctIndex: 1,
      explanation: 'string.find возвращает начальную и конечную позицию найденной подстроки. Если подстрока не найдена — возвращает nil. Это позволяет проверять, содержит ли строка нужный текст.'
    }
  },
  {id:'lua_030q2',courseId:'course_lua101',module:'Модуль 5: Алгоритмы и финал',title:'Квиз: Сложность',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Какая сложность у линейного поиска?",options:["O(1)","O(n)","O(log n)","O(n²)"],correctIndex:1,explanation:"Линейный поиск перебирает все элементы — O(n)."}},
  {
    id: 'lua_032',
    courseId: 'course_lua101',
    module: 'Модуль 5: Алгоритмы и финал',
    title: 'Практика: Поиск максимума',
    type: 'terminal',
    description: 'В массиве powers лежат уровни силы врагов. Найди и выведи самое большое число.',
    difficulty: 'Легенда',
    xpReward: 120,
    currencyReward: 50,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'algo_max' },
    initialCode: 'local powers = {3, 9, 2, 7}\nlocal max = 0\n-- Пройдись по списку через ipairs\n-- Если число больше max, обнови max\nprint(max)',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Поиск максимума</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">for</span> _, v <span style="color:#ff00ff">in</span> <span style="color:#fcee0a">ipairs</span>(list) <span style="color:#ff00ff">do</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">if</span> v &gt; max <span style="color:#ff00ff">then</span> max = v <span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>`
  },
  {
    id: 'lua_034',
    courseId: 'course_lua101',
    module: 'Модуль 5: Алгоритмы и финал',
    title: 'Финальный проект: Авто-битва',
    type: 'terminal',
    description: 'Финальный тест! Напиши скрипт: герой атакует врага. Уменьши HP врага на power героя. Если HP врага <= 0 — выведи "Victory!", иначе — "Enemy survived!".',
    difficulty: 'Легенда',
    xpReward: 200,
    currencyReward: 100,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'project_battle' },
    initialCode: 'local heroPower = 10\nlocal enemyHp = 10\n\n-- 1. Вычти heroPower из enemyHp\n-- 2. Если enemyHp <= 0 — выведи "Victory!"\n-- 3. Иначе выведи "Enemy survived!"\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Финальный алгоритм</h3>
<p>Объедини математику, условие и вывод:</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0">enemyHp = enemyHp - heroPower</p>
  <p style="margin:6px 0 3px 0"><span style="color:#ff00ff">if</span> enemyHp &lt;= <span style="color:#fcee0a">0</span> <span style="color:#ff00ff">then</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Victory!"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>`
  },

  // ── МОДУЛЬ 6: СТРОКИ И ПАТТЕРНЫ ──────────────────────────────────────────
  {
    id: 'lua_040',
    courseId: 'course_lua101',
    module: 'Модуль 6: Строки и паттерны',
    title: 'Теория: Работа со строками',
    type: 'theory',
    description: 'Узнай, как обрабатывать текст в Lua — длина, склеивание, поиск и замена.',
    difficulty: 'Хакер',
    xpReward: 70,
    currencyReward: 20,
    status: 'locked',
    theory: `<p style="color:#00f3ff;font-weight:bold;margin-bottom:12px">📝 Строковые протоколы...</p>
<p>Строки — это текстовые данные. В Lua строки — мощный инструмент: можно искать, разбивать, заменять и форматировать текст.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📏 Длина строки</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">msg</span> = <span style="color:#00ff41">"Hello"</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">#msg</span>)  <span style="color:#555">-- 5</span></p>
</div>
<p>Оператор <code style="color:#fcee0a;background:#0a0a14;padding:1px 6px;border-radius:4px">#</code> возвращает длину строки.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔗 Конкатенация (склеивание)</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">first</span> = <span style="color:#00ff41">"Cyber"</span></p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">second</span> = <span style="color:#00ff41">"punk"</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">first</span> .. <span style="color:#fcee0a">second</span>)  <span style="color:#555">-- Cyberpunk</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">first</span> .. <span style="color:#00ff41">" "</span> .. <span style="color:#fcee0a">second</span>)  <span style="color:#555">-- Cyber punk</span></p>
</div>
<p>Оператор <code style="color:#fcee0a;background:#0a0a14;padding:1px 6px;border-radius:4px">..</code> (две точки) склеивает строки вместе.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔍 Строковые функции</h3>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:4px 0"><span style="color:#ff00ff">string.upper</span>(<span style="color:#00ff41">"hello"</span>) <span style="color:#555">→ "HELLO"</span></p>
  <p style="margin:4px 0"><span style="color:#ff00ff">string.lower</span>(<span style="color:#00ff41">"HELLO"</span>) <span style="color:#555">→ "hello"</span></p>
  <p style="margin:4px 0"><span style="color:#ff00ff">string.sub</span>(<span style="color:#00ff41">"Cyberpunk"</span>, <span style="color:#fcee0a">1</span>, <span style="color:#fcee0a">5</span>) <span style="color:#555">→ "Cyber"</span></p>
  <p style="margin:4px 0"><span style="color:#ff00ff">string.find</span>(<span style="color:#00ff41">"Cyberpunk"</span>, <span style="color:#00ff41">"punk"</span>) <span style="color:#555">→ 6, 9</span></p>
  <p style="margin:4px 0"><span style="color:#ff00ff">string.gsub</span>(<span style="color:#00ff41">"hello world"</span>, <span style="color:#00ff41">"world"</span>, <span style="color:#00ff41">"Lua"</span>) <span style="color:#555">→ "hello Lua"</span></p>
  <p style="margin:4px 0"><span style="color:#ff00ff">string.rep</span>(<span style="color:#00ff41">"ab"</span>, <span style="color:#fcee0a">3</span>) <span style="color:#555">→ "ababab"</span></p>
  <p style="margin:4px 0"><span style="color:#ff00ff">string.reverse</span>(<span style="color:#00ff41">"Lua"</span>) <span style="color:#555">→ "auL"</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎯 string.format() — форматирование</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">name</span> = <span style="color:#00ff41">"Ava"</span></p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">level</span> = <span style="color:#fcee0a">7</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#ff00ff">string.format</span>(<span style="color:#00ff41">"Агент %s, уровень %d"</span>, <span style="color:#fcee0a">name</span>, <span style="color:#fcee0a">level</span>))</p>
  <p style="margin:3px 0"><span style="color:#555">-- Агент Ava, уровень 7</span></p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Паттерны Lua:</p>
  <p style="margin:0">Lua использует свои паттерны вместо регулярных выражений: <code>%d</code> — цифра, <code>%a</code> — буква, <code>%s</code> — пробел, <code>%w</code> — буква или цифра.</p>
</div>`
  },
  {
    id: 'lua_040q',
    courseId: 'course_lua101',
    module: 'Модуль 6: Строки и паттерны',
    title: 'Квиз: Строковые операции',
    type: 'quiz',
    description: 'Проверь знание строковых функций Lua.',
    difficulty: 'Хакер',
    xpReward: 50,
    currencyReward: 15,
    status: 'locked',
    quizData: {
      question: 'Что выведет этот код?\n\nlocal a = "Net"\nlocal b = "runner"\nprint(a .. b)',
      options: ['a .. b', 'Net runner', 'Netrunner', 'Ошибку'],
      correctIndex: 2,
      explanation: 'Оператор .. склеивает строки. "Net" .. "runner" = "Netrunner" — без пробела, потому что мы его не добавили.'
    }
  },
  {id:'lua_040q2',courseId:'course_lua101',module:'Модуль 6: Строки и паттерны',title:'Квиз: string.len',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Что вернёт string.len(\"abc\")?",options:["2","3","4","abc"],correctIndex:1,explanation:"string.len считает количество символов. \"abc\" = 3 символа."}},
  {
    id: 'lua_041',
    courseId: 'course_lua101',
    module: 'Модуль 6: Строки и паттерны',
    title: 'Практика: Шифровка имени',
    type: 'terminal',
    description: 'Переверни строку name с помощью string.reverse и выведи результат. Агент должен зашифровать своё имя!',
    difficulty: 'Хакер',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'string_reverse' },
    initialCode: 'local name = "Netrunner"\n-- Используй string.reverse(name) и print\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Реверс строки</h3>
<p>Функция <code style="color:#fcee0a">string.reverse()</code> переворачивает строку:</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#ff00ff">string.reverse</span>(<span style="color:#00ff41">"Lua"</span>))  <span style="color:#555">-- auL</span></p>
</div>`
  },
  {
    id: 'lua_042',
    courseId: 'course_lua101',
    module: 'Модуль 6: Строки и паттерны',
    title: 'Практика: Генератор позывного',
    type: 'terminal',
    description: 'Создай позывной агента: склей string.upper(первые 3 буквы имени) с "-" и длиной имени. Для "Netrunner" должно получиться "NET-9".',
    difficulty: 'Хакер',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'string_callsign' },
    initialCode: 'local name = "Netrunner"\n-- 1. Возьми первые 3 буквы: string.sub(name, 1, 3)\n-- 2. Сделай их заглавными: string.upper(...)\n-- 3. Склей с "-" и #name\n-- 4. Выведи результат: "NET-9"\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Комбинируем строковые функции</h3>
<p>Можно вызывать одну функцию внутри другой:</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">prefix</span> = <span style="color:#ff00ff">string.upper</span>(<span style="color:#ff00ff">string.sub</span>(<span style="color:#fcee0a">name</span>, <span style="color:#fcee0a">1</span>, <span style="color:#fcee0a">3</span>))</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">prefix</span> .. <span style="color:#00ff41">"-"</span> .. <span style="color:#fcee0a">#name</span>)</p>
</div>`
  },

  // ── МОДУЛЬ 7: МОДУЛИ И ФИНАЛЬНЫЙ ПРОЕКТ ──────────────────────────────────
  {
    id: 'lua_050',
    courseId: 'course_lua101',
    module: 'Модуль 7: Модули и мастерство',
    title: 'Теория: Продвинутые техники Lua',
    type: 'theory',
    description: 'Узнай о области видимости, замыканиях, модулях и обработке ошибок.',
    difficulty: 'Элита',
    xpReward: 90,
    currencyReward: 30,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">⚡ Продвинутый уровень...</p>
<p>Ты знаешь основы. Теперь изучим технки, которые отличают новичка от мастера.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔒 Область видимости (scope)</h3>
<p>Переменные с <code style="color:#fcee0a">local</code> видны только в своём блоке. Без local — глобальные (плохая практика!).</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">x</span> = <span style="color:#fcee0a">10</span>  <span style="color:#555">-- видна везде ниже</span></p>
  <p style="margin:6px 0 3px 0"><span style="color:#ff00ff">if</span> <span style="color:#fcee0a">true</span> <span style="color:#ff00ff">then</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">y</span> = <span style="color:#fcee0a">20</span>  <span style="color:#555">-- видна ТОЛЬКО внутри if</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">x + y</span>)  <span style="color:#555">-- 30 ✅</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">y</span>)  <span style="color:#555">-- nil ❌ (y не видна здесь)</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔄 Замыкания (closures)</h3>
<p>Функция может «запоминать» переменные из места своего создания:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">counter</span>()</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">count</span> = <span style="color:#fcee0a">0</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">return function</span>()</p>
  <p style="margin:3px 0 3px 40px"><span style="color:#fcee0a">count</span> = <span style="color:#fcee0a">count + 1</span></p>
  <p style="margin:3px 0 3px 40px"><span style="color:#ff00ff">return</span> <span style="color:#fcee0a">count</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:8px 0 3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">c</span> = <span style="color:#fcee0a">counter</span>()</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">c</span>())  <span style="color:#555">-- 1</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">c</span>())  <span style="color:#555">-- 2</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">⚠️ Обработка ошибок</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">ok</span>, <span style="color:#fcee0a">err</span> = <span style="color:#ff00ff">pcall</span>(<span style="color:#ff00ff">function</span>()</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">error</span>(<span style="color:#00ff41">"Сбой системы!"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span>)</p>
  <p style="margin:6px 0 3px 0"><span style="color:#ff00ff">if</span> <span style="color:#ff00ff">not</span> <span style="color:#fcee0a">ok</span> <span style="color:#ff00ff">then</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">print</span>(<span style="color:#00ff41">"Ошибка: "</span> .. <span style="color:#fcee0a">err</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>
<p><code style="color:#fcee0a">pcall()</code> (protected call) — ловит ошибки, не крашя программу. Первый результат — успех (true/false), второй — сообщение об ошибке.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📦 Модули</h3>
<p>Lua позволяет организовать код в модули — отдельные файлы с функциями:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="color:#aaa;margin:0 0 8px 0">-- файл weapons.lua</p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">M</span> = {}</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">M.fire</span>(<span style="color:#fcee0a">power</span>)</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">return</span> <span style="color:#00ff41">"Урон: "</span> .. <span style="color:#fcee0a">power * 2</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">return</span> <span style="color:#fcee0a">M</span></p>
  <p style="color:#aaa;margin:12px 0 8px 0">-- файл main.lua</p>
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">weapons</span> = <span style="color:#ff00ff">require</span>(<span style="color:#00ff41">"weapons"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">print</span>(<span style="color:#fcee0a">weapons.fire</span>(<span style="color:#fcee0a">50</span>))  <span style="color:#555">-- Урон: 100</span></p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">🎯 Принцип модульности:</p>
  <p style="margin:0">Каждый модуль — одна ответственность. Модуль оружия не должен знать о здоровье героя. Это делает код чище и проще для отладки.</p>
</div>`
  },
  {
    id: 'lua_050q',
    courseId: 'course_lua101',
    module: 'Модуль 7: Модули и мастерство',
    title: 'Квиз: Продвинутые концепции',
    type: 'quiz',
    description: 'Проверь понимание области видимости и замыканий.',
    difficulty: 'Элита',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    quizData: {
      question: 'Что выведет этот код?\n\nlocal x = 10\nif true then\n  local x = 20\n  print(x)\nend\nprint(x)',
      options: ['20 и 20', '10 и 10', '20 и 10', 'Ошибку — нельзя объявить x дважды'],
      correctIndex: 2,
      explanation: 'Внутри if создаётся новая ЛОКАЛЬНАЯ x = 20. Первый print выведет 20 (внутренняя x). После end внутренняя x исчезает, и второй print выведет 10 (внешняя x).'
    }
  },
  {id:'lua_050q2',courseId:'course_lua101',module:'Модуль 7: Модули и мастерство',title:'Квиз: Замыкания',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Что такое замыкание (closure)?",options:["Тип ошибки","Функция с доступом к переменным внешней функции","Цикл","Модуль"],correctIndex:1,explanation:"Замыкание — функция, которая «помнит» переменные окружения, где была создана."}},
  {
    id: 'lua_051',
    courseId: 'course_lua101',
    module: 'Модуль 7: Модули и мастерство',
    title: 'Практика: Генератор ID',
    type: 'terminal',
    description: 'Создай функцию-замыкание makeIdGenerator(), которая возвращает функцию. Каждый вызов возвращаемой функции увеличивает счётчик и возвращает "ID-N". Выведи первые 3 ID.',
    difficulty: 'Элита',
    xpReward: 100,
    currencyReward: 30,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'closure_id_gen' },
    initialCode: '-- Создай функцию makeIdGenerator\n-- Она возвращает другую функцию (замыкание)\n-- Каждый вызов возвращает "ID-1", "ID-2", ...\n\nfunction makeIdGenerator()\n  local count = 0\n  return function()\n    count = count + 1\n    return "ID-" .. count\n  end\nend\n\nlocal gen = makeIdGenerator()\nprint(gen())  -- ID-1\nprint(gen())  -- ID-2\nprint(gen())  -- ID-3\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Замыкание = функция + память</h3>
<p>Замыкание «помнит» переменные из своего окружения:</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">makeCounter</span>()</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">n</span> = <span style="color:#fcee0a">0</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">return function</span>() <span style="color:#fcee0a">n</span> = <span style="color:#fcee0a">n + 1</span>; <span style="color:#ff00ff">return</span> <span style="color:#fcee0a">n</span> <span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>`
  },
  {
    id: 'lua_052',
    courseId: 'course_lua101',
    module: 'Модуль 7: Модули и мастерство',
    title: 'Финальный проект: RPG-система',
    type: 'terminal',
    description: 'Создай мини-RPG систему: таблицу героя с hp, power, name. Функцию levelUp(hero), которая увеличивает power на 5 и hp на 20. Вызови levelUp 2 раза и выведи "NAME: HP hp, POWER power".',
    difficulty: 'Легенда',
    xpReward: 200,
    currencyReward: 100,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'project_rpg' },
    initialCode: '-- 1. Создай таблицу героя\nlocal hero = {\n  name = "Ava",\n  hp = 100,\n  power = 10\n}\n\n-- 2. Создай функцию levelUp(hero)\n-- hero.power = hero.power + 5\n-- hero.hp = hero.hp + 20\n\n-- 3. Вызови levelUp 2 раза\n\n-- 4. Выведи: "Ava: 140 hp, 20 power"\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Всё вместе: таблицы + функции</h3>
<p>Передавай таблицу в функцию — изменения сохраняются (таблицы передаются по ссылке):</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">heal</span>(<span style="color:#fcee0a">unit</span>)</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#fcee0a">unit.hp</span> = <span style="color:#fcee0a">unit.hp + 50</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
  <p style="margin:6px 0 3px 0"><span style="color:#fcee0a">heal</span>(<span style="color:#fcee0a">hero</span>)  <span style="color:#555">-- hero.hp увеличился!</span></p>
</div>`
  },
  
  // =========================================================================
  // PY200: PYTHON COURSE — ПОЛНЫЙ КУРС
  // =========================================================================

  // ── МОДУЛЬ 1: ПЕРЕМЕННЫЕ И ВЫВОД ──────────────────────────────────────────
  {
    id: 'py_001',
    courseId: 'course_py200',
    module: 'Модуль 1: Переменные и вывод',
    title: 'Теория: Первые шаги в Python',
    type: 'theory',
    description: 'Что такое Python, как выводить текст и хранить данные.',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 10,
    status: 'open',
    theory: `<p style="color:#5e60ce;font-weight:bold;margin-bottom:12px">🐍 Загрузка нейро-скриптов Python...</p>
<p><strong>Python</strong> — один из самых популярных языков в мире. Его используют для ИИ, веб-серверов, игр и хакинга. Синтаксис простой и читаемый — как английский текст.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📟 Вывод на экран — print()</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">"Hello, Netrunner!"</span>)</p>
  <p style="margin:8px 0 3px 0;color:#555"># Выведет: Hello, Netrunner!</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📦 Переменные</h3>
<p>Переменная — это имя для данных. В Python не нужно слово <code>local</code> (как в Lua):</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#fcee0a">name</span> = <span style="color:#00ff41">"Ava"</span>       <span style="color:#555"># строка (str)</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">hp</span> = <span style="color:#fcee0a">100</span>            <span style="color:#555"># целое число (int)</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">speed</span> = <span style="color:#fcee0a">3.5</span>         <span style="color:#555"># дробное число (float)</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">alive</span> = <span style="color:#ff00ff">True</span>        <span style="color:#555"># логическое (bool)</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🧮 Арифметика и склейка строк</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">10</span> + <span style="color:#fcee0a">5</span>)       <span style="color:#555"># 15</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">10</span> * <span style="color:#fcee0a">3</span>)       <span style="color:#555"># 30</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">10</span> // <span style="color:#fcee0a">3</span>)      <span style="color:#555"># 3 (целочисленное деление)</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">10</span> % <span style="color:#fcee0a">3</span>)       <span style="color:#555"># 1 (остаток)</span></p>
  <p style="margin:8px 0 3px 0"><span style="color:#555"># Склейка строк:</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Agent: "</span> + <span style="color:#fcee0a">name</span>)  <span style="color:#555"># Agent: Ava</span></p>
</div>
<div style="background:#1a0a2e;border:1px solid #5e60ce;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#5e60ce;font-weight:bold;margin-bottom:4px">💡 Отличие от Lua:</p>
  <p style="margin:0">В Python нет <code>local</code>, нет <code>end</code>, вместо <code>..</code> для склейки используется <code>+</code>, а блоки кода выделяются <strong>отступами</strong> (пробелами)!</p>
</div>`
  },
  {
    id: 'py_001q',
    courseId: 'course_py200',
    module: 'Модуль 1: Переменные и вывод',
    title: 'Квиз: Основы Python',
    type: 'quiz',
    description: 'Проверь понимание print, переменных и типов данных.',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'locked',
    quizData: {
      question: 'Что выведет этот код?\n\nx = 5\ny = 3\nprint(x + y)',
      options: ['53', '8', 'x + y', 'Ошибку'],
      correctIndex: 1,
      explanation: 'x и y — числа (int), поэтому + складывает их математически: 5 + 3 = 8. Если бы это были строки ("5" + "3"), результат был бы "53".'
    }
  },
  {id:'py_001q2',courseId:'course_py200',module:'Модуль 1: Переменные и вывод',title:'Квиз: print()',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Что выведет print(2+3)?",options:["23","5","2+3","Ошибку"],correctIndex:1,explanation:"Python вычислит 2+3=5 и выведет число 5."}},
  {
    id: 'py_002',
    courseId: 'course_py200',
    module: 'Модуль 1: Переменные и вывод',
    title: 'Практика: Hello Python',
    type: 'terminal',
    description: 'Выведи на экран "Hello, Netrunner!" с помощью print().',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'print_hello' },
    initialCode: '# Используй print() чтобы вывести текст\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">print() — вывод текста</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">"Твой текст"</span>)</p>
</div>`
  },
  {
    id: 'py_003',
    courseId: 'course_py200',
    module: 'Модуль 1: Переменные и вывод',
    title: 'Практика: Сумма кредитов',
    type: 'terminal',
    description: 'Создай две переменные coins=7 и found=5. Выведи их сумму.',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 15,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'python_sum' },
    initialCode: 'coins = 7\nfound = 5\n# Выведи сумму coins + found\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Арифметика с переменными</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#fcee0a">a</span> = <span style="color:#fcee0a">10</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">b</span> = <span style="color:#fcee0a">20</span></p>
  <p style="margin:3px 0"><span style="color:#00ff41">print</span>(<span style="color:#fcee0a">a</span> + <span style="color:#fcee0a">b</span>)  <span style="color:#555"># 30</span></p>
</div>`
  },

  // ── МОДУЛЬ 2: УСЛОВИЯ ─────────────────────────────────────────────────────
  {
    id: 'py_010',
    courseId: 'course_py200',
    module: 'Модуль 2: Условия',
    title: 'Теория: if / elif / else',
    type: 'theory',
    description: 'Научи программу принимать решения с помощью условий.',
    difficulty: 'Хакер',
    xpReward: 60,
    currencyReward: 15,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🧠 Нейросеть учится думать...</p>
<p>Условия позволяют программе выбирать разные пути. В Python используются ключевые слова <strong>if</strong>, <strong>elif</strong> и <strong>else</strong>.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔀 Простое условие — if</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#fcee0a">hp</span> = <span style="color:#fcee0a">30</span></p>
  <p style="margin:8px 0 3px 0"><span style="color:#ff00ff">if</span> hp &lt;= <span style="color:#fcee0a">0</span>:</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Game Over"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">elif</span> hp &lt; <span style="color:#fcee0a">20</span>:</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Мало HP!"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">else</span>:</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Готов к бою"</span>)</p>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:12px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">⚠️ Отступы!</p>
  <p style="margin:0">В Python <strong>отступы обязательны</strong>. Код внутри if/elif/else должен быть сдвинут на 4 пробела. Без отступа — ошибка!</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">⚖️ Операторы сравнения</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#fcee0a">==</span>  <span style="color:#555">равно</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">!=</span>  <span style="color:#555">не равно</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">&lt;</span>   <span style="color:#555">меньше</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">&gt;</span>   <span style="color:#555">больше</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">&lt;=</span>  <span style="color:#555">меньше или равно</span></p>
  <p style="margin:3px 0"><span style="color:#fcee0a">&gt;=</span>  <span style="color:#555">больше или равно</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔗 Логические операторы</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">if</span> hp &gt; <span style="color:#fcee0a">0</span> <span style="color:#ff00ff">and</span> ammo &gt; <span style="color:#fcee0a">0</span>:</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Атакуем!"</span>)</p>
  <p style="margin:8px 0 3px 0"><span style="color:#ff00ff">if</span> hp &lt;= <span style="color:#fcee0a">0</span> <span style="color:#ff00ff">or</span> ammo &lt;= <span style="color:#fcee0a">0</span>:</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Отступаем!"</span>)</p>
</div>`
  },
  {
    id: 'py_010q',
    courseId: 'course_py200',
    module: 'Модуль 2: Условия',
    title: 'Квиз: Условия Python',
    type: 'quiz',
    description: 'Проверь понимание if/elif/else и отступов.',
    difficulty: 'Хакер',
    xpReward: 50,
    currencyReward: 15,
    status: 'locked',
    quizData: {
      question: 'Что выведет этот код?\n\nlevel = 10\nif level >= 10:\n    print("Pro")\nelse:\n    print("Noob")',
      options: ['Pro', 'Noob', 'Ошибку — нужен end', 'Ничего'],
      correctIndex: 0,
      explanation: 'level = 10, а условие level >= 10 истинно (10 >= 10), поэтому выполнится первая ветка и выведет "Pro". В Python блоки заканчиваются сменой отступа, слово end не нужно.'
    }
  },
  {id:'py_010q2',courseId:'course_py200',module:'Модуль 2: Условия и циклы',title:'Квиз: range',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Что делает range(3)?",options:["[1,2,3]","[0,1,2]","[0,1,2,3]","[3]"],correctIndex:1,explanation:"range(3) генерирует 0, 1, 2 — три числа начиная с 0."}},
  {
    id: 'py_011',
    courseId: 'course_py200',
    module: 'Модуль 2: Условия',
    title: 'Практика: Доступ в сектор',
    type: 'terminal',
    description: 'Если access == "alpha" — выведи "OPEN", иначе — "DENIED".',
    difficulty: 'Хакер',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'python_access' },
    initialCode: 'access = "alpha"\n# Если access == "alpha" выведи "OPEN"\n# Иначе выведи "DENIED"\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Проверка строки</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">if</span> code == <span style="color:#00ff41">"secret"</span>:</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"OK"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">else</span>:</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"FAIL"</span>)</p>
</div>`
  },
  {
    id: 'py_012',
    courseId: 'course_py200',
    module: 'Модуль 2: Условия',
    title: 'Практика: Чёт или нечет?',
    type: 'terminal',
    description: 'Проверь число n: если чётное — выведи "EVEN", нечётное — "ODD".',
    difficulty: 'Хакер',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'python_even_odd' },
    initialCode: 'n = 7\n# Если n чётное — print("EVEN")\n# Иначе — print("ODD")\n',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Остаток от деления %</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">if</span> n % <span style="color:#fcee0a">2</span> == <span style="color:#fcee0a">0</span>:</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Чётное"</span>)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">else</span>:</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00ff41">print</span>(<span style="color:#00ff41">"Нечётное"</span>)</p>
</div>`
  },
  
  // =========================================================================
  // WEB300: HTML/CSS — ПОЛНЫЙ КУРС (5 МОДУЛЕЙ)
  // =========================================================================

  // ── МОДУЛЬ 1: ОСНОВЫ HTML (расширенный) ──────────────────────────────
  {
    id: 'web_m1_t1',
    courseId: 'course_web300',
    module: 'Модуль 1: Основы HTML',
    title: 'Теория: Что такое HTML и зачем он нужен',
    type: 'theory',
    description: 'Узнай, как браузер превращает текст в страницы и почему HTML — фундамент веба.',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'open',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🌐 Добро пожаловать в Визуальный Взлом!</p>
<p style="line-height:1.7">Каждый сайт — Google, YouTube, VK — начинается с <strong style="color:#00f3ff">HTML</strong>. Но что это?</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🤔 Зачем нужен HTML?</h3>
<p style="line-height:1.7">Представь: ты пишешь текст в блокноте. Всё одинаковое — нет заголовков, картинок, кнопок. На сайте нужно различать: что — заголовок, что — абзац, где — картинка, а где — ссылка.</p>
<p style="line-height:1.7"><strong style="color:#fcee0a">HTML (HyperText Markup Language)</strong> — язык <strong>разметки</strong>. Он говорит браузеру: «Вот заголовок, вот абзац, вот ссылка».</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔄 Как браузер показывает страницу?</h3>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#0a0a14;border-left:3px solid #00f3ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00f3ff;font-weight:bold;margin-bottom:2px">1. Ты пишешь HTML-код</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Текстовый файл с тегами — инструкциями для браузера.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #ff00ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff00ff;font-weight:bold;margin-bottom:2px">2. Браузер читает код</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Chrome / Firefox разбирают HTML и понимают структуру.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:2px">3. На экране — страница</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Заголовки крупные, абзацы обычные, ссылки кликабельные.</p>
  </div>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🏷️ Что такое тег?</h3>
<p style="line-height:1.7"><strong style="color:#fcee0a">Тег</strong> — команда для браузера в угловых скобках. Большинство тегов парные:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:14px;line-height:1.8">
  <p style="margin:2px 0"><span style="color:#00ff41">&lt;p&gt;</span><span style="color:#ccc">Это абзац текста</span><span style="color:#00ff41">&lt;/p&gt;</span></p>
  <p style="margin:6px 0 0;color:#555;font-size:0.8em">↑ открывающий &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; ↑ закрывающий (со /)</p>
</div>
<div style="background:#001a0a;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Аналогия:</p>
  <p style="margin:0">HTML — чертёж дома. Описывает структуру. А внешний вид (цвет, размер) — за CSS (Модуль 2).</p>
</div>`,
  },
  {
    id: 'web_m1_q1',
    courseId: 'course_web300',
    module: 'Модуль 1: Основы HTML',
    title: 'Квиз: Зачем нужен HTML?',
    type: 'quiz',
    description: 'Проверь, понял ли ты основную идею HTML.',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    quizData: {
      question: "Что делает HTML?",
      options: ["Раскрашивает страницу в цвета","Описывает структуру: заголовки, абзацы, ссылки","Запускает программы на сервере","Добавляет анимации"],
      correctIndex: 1,
      explanation: "HTML — язык разметки. Описывает СТРУКТУРУ. За вид — CSS, за поведение — JavaScript."
    },
  },
  {
    id: 'web_m1_t2',
    courseId: 'course_web300',
    module: 'Модуль 1: Основы HTML',
    title: 'Теория: Структура документа и главные теги',
    type: 'theory',
    description: 'Как устроен HTML-документ изнутри. Заголовки, абзацы, списки.',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 15,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🏗️ Скелет каждой веб-страницы</p>
<p style="line-height:1.7">Каждый HTML-документ имеет базовую структуру — как скелет.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📄 Структура документа</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;line-height:1.8">
  <p style="margin:2px 0"><span style="color:#555">&lt;!DOCTYPE html&gt;</span> <span style="color:#444">← «это HTML5»</span></p>
  <p style="margin:2px 0"><span style="color:#00f3ff">&lt;html&gt;</span></p>
  <p style="margin:2px 0 2px 20px"><span style="color:#ff00ff">&lt;head&gt;</span> <span style="color:#444">← служебная часть (не видна)</span></p>
  <p style="margin:2px 0 2px 40px"><span style="color:#fcee0a">&lt;title&gt;</span>Моя страница<span style="color:#fcee0a">&lt;/title&gt;</span></p>
  <p style="margin:2px 0 2px 20px"><span style="color:#ff00ff">&lt;/head&gt;</span></p>
  <p style="margin:2px 0 2px 20px"><span style="color:#ff00ff">&lt;body&gt;</span> <span style="color:#444">← всё видимое</span></p>
  <p style="margin:2px 0 2px 40px"><span style="color:#00ff41">&lt;h1&gt;</span>Привет!<span style="color:#00ff41">&lt;/h1&gt;</span></p>
  <p style="margin:2px 0 2px 40px"><span style="color:#00ff41">&lt;p&gt;</span>Абзац.<span style="color:#00ff41">&lt;/p&gt;</span></p>
  <p style="margin:2px 0 2px 20px"><span style="color:#ff00ff">&lt;/body&gt;</span></p>
  <p style="margin:2px 0"><span style="color:#00f3ff">&lt;/html&gt;</span></p>
</div>
<div style="background:#0a0a14;border:1px solid #fcee0a;border-radius:8px;padding:14px;margin:12px 0">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">📌 Запомни:</p>
  <p style="margin:0;color:#ccc"><code style="color:#ff00ff">&lt;body&gt;</code> — видимое. <code style="color:#ff00ff">&lt;head&gt;</code> — служебное (название вкладки, стили).</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔖 Теги для текста</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;line-height:2">
  <p style="margin:2px 0"><span style="color:#00ff41">&lt;h1&gt;…&lt;h6&gt;</span> — <span style="color:#aaa">заголовки (h1 крупный, h6 мелкий)</span></p>
  <p style="margin:2px 0"><span style="color:#00ff41">&lt;p&gt;</span> — <span style="color:#aaa">абзац</span></p>
  <p style="margin:2px 0"><span style="color:#00ff41">&lt;strong&gt;</span> — <span style="color:#aaa">жирный</span></p>
  <p style="margin:2px 0"><span style="color:#00ff41">&lt;em&gt;</span> — <span style="color:#aaa">курсив</span></p>
  <p style="margin:2px 0"><span style="color:#00ff41">&lt;br&gt;</span> — <span style="color:#aaa">перенос строки</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📋 Списки</h3>
<div style="display:flex;gap:12px;flex-wrap:wrap;margin:12px 0">
  <div style="flex:1;min-width:160px;background:#0a0a14;border:1px solid #00f3ff;border-radius:8px;padding:14px">
    <p style="color:#00f3ff;font-weight:bold;margin:0 0 6px">• Маркированный</p>
    <p style="font-family:monospace;font-size:0.85em;color:#aaa;margin:0">&lt;ul&gt;&lt;li&gt;…&lt;/li&gt;&lt;/ul&gt;</p>
  </div>
  <div style="flex:1;min-width:160px;background:#0a0a14;border:1px solid #ff00ff;border-radius:8px;padding:14px">
    <p style="color:#ff00ff;font-weight:bold;margin:0 0 6px">1. Нумерованный</p>
    <p style="font-family:monospace;font-size:0.85em;color:#aaa;margin:0">&lt;ol&gt;&lt;li&gt;…&lt;/li&gt;&lt;/ol&gt;</p>
  </div>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">⚠️ Вложенность</p>
  <p style="margin:0;color:#ccc">Теги закрываются в обратном порядке! ✅ &lt;p&gt;&lt;strong&gt;…&lt;/strong&gt;&lt;/p&gt;</p>
</div>`,
  },
  {
    id: 'web_m1_q2',
    courseId: 'course_web300',
    module: 'Модуль 1: Основы HTML',
    title: 'Квиз: Теги и структура',
    type: 'quiz',
    description: 'Проверь знание базовых тегов.',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'locked',
    quizData: {
      question: "Какой тег создаёт самый важный заголовок?",
      options: ["<header>","<h1>","<title>","<strong>"],
      correctIndex: 1,
      explanation: "<h1> — самый крупный заголовок (h1–h6). <title> — название вкладки. <strong> — жирный текст."
    },
  },
  {
    id: 'web_m1_t3',
    courseId: 'course_web300',
    module: 'Модуль 1: Основы HTML',
    title: 'Теория: Ссылки, картинки и атрибуты',
    type: 'theory',
    description: 'Как добавлять ссылки, картинки. Что такое атрибуты тегов.',
    difficulty: 'Новичок',
    xpReward: 50,
    currencyReward: 15,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🔗 Связываем страницы!</p>
<p style="line-height:1.7">Теги для текста ты знаешь. Теперь — <strong style="color:#00f3ff">ссылки</strong> и <strong style="color:#00f3ff">картинки</strong>.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🏷️ Атрибуты</h3>
<p style="line-height:1.7">Некоторым тегам нужна доп. информация — <strong style="color:#fcee0a">атрибуты</strong>:</p>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:13px">
  <p style="margin:2px 0"><span style="color:#00ff41">&lt;тег</span> <span style="color:#fcee0a">атрибут</span>=<span style="color:#00f3ff">"значение"</span><span style="color:#00ff41">&gt;</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔗 Ссылки — &lt;a&gt;</h3>
<p style="line-height:1.7">Атрибут <code style="color:#fcee0a">href</code> задаёт адрес:</p>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:13px">
  <p style="margin:2px 0"><span style="color:#00ff41">&lt;a</span> <span style="color:#fcee0a">href</span>=<span style="color:#00f3ff">"https://google.com"</span><span style="color:#00ff41">&gt;</span>Google<span style="color:#00ff41">&lt;/a&gt;</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🖼️ Картинки — &lt;img&gt;</h3>
<p style="line-height:1.7">Одиночный тег (без закрывающего!):</p>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:13px">
  <p style="margin:2px 0"><span style="color:#00ff41">&lt;img</span> <span style="color:#fcee0a">src</span>=<span style="color:#00f3ff">"photo.jpg"</span> <span style="color:#fcee0a">alt</span>=<span style="color:#00f3ff">"Фото"</span> <span style="color:#fcee0a">width</span>=<span style="color:#00f3ff">"300"</span><span style="color:#00ff41">&gt;</span></p>
</div>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0">
  <p style="margin:4px 0"><span style="color:#fcee0a;font-weight:bold">src</span> — <span style="color:#aaa">путь к картинке (обязательный!)</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a;font-weight:bold">alt</span> — <span style="color:#aaa">текст если не загрузилась</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a;font-weight:bold">width</span> — <span style="color:#aaa">ширина в пикселях</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📦 div и span</h3>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:13px">
  <p style="margin:4px 0"><span style="color:#00ff41">&lt;div&gt;</span> — <span style="color:#aaa">блочный контейнер (вся строка)</span></p>
  <p style="margin:4px 0"><span style="color:#00ff41">&lt;span&gt;</span> — <span style="color:#aaa">строчный (внутри текста)</span></p>
</div>
<div style="background:#001a0a;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Одиночные теги</p>
  <p style="margin:0">&lt;img&gt;, &lt;input&gt;, &lt;br&gt; — не нужен закрывающий тег.</p>
</div>`,
  },
  {
    id: 'web_m1_q3',
    courseId: 'course_web300',
    module: 'Модуль 1: Основы HTML',
    title: 'Квиз: Ссылки и атрибуты',
    type: 'quiz',
    description: 'Проверь понимание атрибутов.',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'locked',
    quizData: {
      question: "Какой атрибут тега <a> задаёт адрес ссылки?",
      options: ["src","href","link","url"],
      correctIndex: 1,
      explanation: "href — атрибут ссылки. src — для картинок и скриптов."
    },
  },
  {
    id: 'web_m1_practice',
    courseId: 'course_web300',
    module: 'Модуль 1: Основы HTML',
    title: 'Практика: Профиль Агента',
    type: 'html',
    description: 'Создай HTML-профиль: h1 "AGENT_47", абзац p и список ul с 3 навыками.',
    difficulty: 'Новичок',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    initialCode: `<!-- Создай профиль агента -->\n<!-- 1. Заголовок h1: "AGENT_47" -->\n<!-- 2. Абзац p с описанием -->\n<!-- 3. Список ul с 3 пунктами li -->\n`,
    htmlConfig: {"targetTag":"h1","targetStyle":"AGENT_47"},
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Подсказка</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace;font-size:12px;line-height:1.7">
  <p style="margin:2px 0">&lt;h1&gt;AGENT_47&lt;/h1&gt;</p>
  <p style="margin:2px 0">&lt;p&gt;Элитный нетраннер&lt;/p&gt;</p>
  <p style="margin:2px 0">&lt;ul&gt;</p>
  <p style="margin:2px 0 2px 16px">&lt;li&gt;Взлом&lt;/li&gt;</p>
  <p style="margin:2px 0 2px 16px">&lt;li&gt;Маскировка&lt;/li&gt;</p>
  <p style="margin:2px 0 2px 16px">&lt;li&gt;Дроны&lt;/li&gt;</p>
  <p style="margin:2px 0">&lt;/ul&gt;</p>
</div>`,
  },

  // ── МОДУЛЬ 2: ОСНОВЫ CSS (расширенный) ──────────────────────────────
  {
    id: 'web_m2_t1',
    courseId: 'course_web300',
    module: 'Модуль 2: Основы CSS',
    title: 'Теория: Что такое CSS и зачем он нужен',
    type: 'theory',
    description: 'Узнай, как CSS превращает скучный HTML в красивые страницы.',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🎨 Время раскрасить страницу!</p>
<p style="line-height:1.7">HTML — структура, но выглядит скучно. <strong style="color:#00f3ff">CSS</strong> отвечает за <strong>внешний вид</strong>: цвета, шрифты, отступы, размеры.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🤔 Зачем CSS?</h3>
<div style="display:grid;grid-template-columns:repeat(2,1fr);gap:10px;margin:16px 0">
  <div style="background:#0a0a14;border:1px solid #00f3ff;border-radius:8px;padding:12px;text-align:center">
    <p style="font-size:1.5em;margin:0">🎨</p><p style="color:#00f3ff;font-weight:bold;margin:4px 0">Цвета</p>
  </div>
  <div style="background:#0a0a14;border:1px solid #ff00ff;border-radius:8px;padding:12px;text-align:center">
    <p style="font-size:1.5em;margin:0">📏</p><p style="color:#ff00ff;font-weight:bold;margin:4px 0">Размеры</p>
  </div>
  <div style="background:#0a0a14;border:1px solid #00ff41;border-radius:8px;padding:12px;text-align:center">
    <p style="font-size:1.5em;margin:0">🔤</p><p style="color:#00ff41;font-weight:bold;margin:4px 0">Шрифты</p>
  </div>
  <div style="background:#0a0a14;border:1px solid #fcee0a;border-radius:8px;padding:12px;text-align:center">
    <p style="font-size:1.5em;margin:0">📐</p><p style="color:#fcee0a;font-weight:bold;margin:4px 0">Расположение</p>
  </div>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📝 Как подключить CSS?</h3>
<p style="line-height:1.7">Мы используем тег <code style="color:#ff00ff">&lt;style&gt;</code> внутри <code>&lt;head&gt;</code>:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;line-height:1.7">
  <p style="margin:2px 0"><span style="color:#ff00ff">&lt;style&gt;</span></p>
  <p style="margin:2px 0 2px 16px"><span style="color:#00ff41">h1</span> {</p>
  <p style="margin:2px 0 2px 32px"><span style="color:#fcee0a">color</span>: <span style="color:#00f3ff">red</span>;</p>
  <p style="margin:2px 0 2px 16px">}</p>
  <p style="margin:2px 0"><span style="color:#ff00ff">&lt;/style&gt;</span></p>
</div>
<p style="line-height:1.7">Это значит: «Все <code>&lt;h1&gt;</code> — <span style="color:red;font-weight:bold">красные</span>».</p>
<div style="background:#001a0a;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Аналогия:</p>
  <p style="margin:0">HTML — чертёж дома, CSS — дизайн интерьера. Чертёж: «тут стена», CSS: «стена синяя, 3м».</p>
</div>`,
  },
  {
    id: 'web_m2_q1',
    courseId: 'course_web300',
    module: 'Модуль 2: Основы CSS',
    title: 'Квиз: Зачем нужен CSS?',
    type: 'quiz',
    description: 'Проверь понимание роли CSS.',
    difficulty: 'Новичок',
    xpReward: 30,
    currencyReward: 10,
    status: 'locked',
    quizData: {
      question: "За что отвечает CSS?",
      options: ["Структуру страницы","Внешний вид: цвета, шрифты, размеры","Поведение: клики, логику","Хранение данных"],
      correctIndex: 1,
      explanation: "CSS — внешний вид. HTML — структура, JavaScript — поведение."
    },
  },
  {
    id: 'web_m2_t2',
    courseId: 'course_web300',
    module: 'Модуль 2: Основы CSS',
    title: 'Теория: Селекторы и свойства',
    type: 'theory',
    description: 'Как CSS находит элементы и какие свойства менять.',
    difficulty: 'Новичок',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🎯 Селекторы — кого стилизуем?</p>
<p style="line-height:1.7">CSS-правило: <strong style="color:#fcee0a">селектор</strong> (кого?) + <strong style="color:#00f3ff">свойства</strong> (как?):</p>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:14px">
  <p style="margin:2px 0"><span style="color:#00ff41">селектор</span> { <span style="color:#fcee0a">свойство</span>: <span style="color:#00f3ff">значение</span>; }</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🏷️ Три вида селекторов</h3>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:12px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">По тегу — все такие теги</p>
    <p style="margin:0;color:#aaa;font-family:monospace;font-size:0.9em">p { color: blue; }</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #fcee0a;padding:12px 14px;border-radius:0 6px 6px 0">
    <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">По классу (.имя) — с нужным class</p>
    <p style="margin:0;color:#aaa;font-family:monospace;font-size:0.9em">.warning { color: red; }</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #ff00ff;padding:12px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff00ff;font-weight:bold;margin-bottom:4px">По id (#имя) — один элемент</p>
    <p style="margin:0;color:#aaa;font-family:monospace;font-size:0.9em">#header { font-size: 24px; }</p>
  </div>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎨 Главные свойства</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em;line-height:2">
  <p style="margin:2px 0"><span style="color:#fcee0a">color</span>: red; <span style="color:#555">← цвет текста</span></p>
  <p style="margin:2px 0"><span style="color:#fcee0a">background-color</span>: #1a1a2e; <span style="color:#555">← фон</span></p>
  <p style="margin:2px 0"><span style="color:#fcee0a">font-size</span>: 20px; <span style="color:#555">← размер шрифта</span></p>
  <p style="margin:2px 0"><span style="color:#fcee0a">font-weight</span>: bold; <span style="color:#555">← жирность</span></p>
  <p style="margin:2px 0"><span style="color:#fcee0a">text-align</span>: center; <span style="color:#555">← выравнивание</span></p>
  <p style="margin:2px 0"><span style="color:#fcee0a">border</span>: 2px solid #00f3ff; <span style="color:#555">← рамка</span></p>
  <p style="margin:2px 0"><span style="color:#fcee0a">border-radius</span>: 8px; <span style="color:#555">← скругление</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎨 Способы задать цвет</h3>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:4px 0"><span style="color:#fcee0a">color</span>: <span style="color:red">red</span>; <span style="color:#555">← по имени</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a">color</span>: <span style="color:#00f3ff">#00f3ff</span>; <span style="color:#555">← HEX</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a">color</span>: rgb(0,243,255); <span style="color:#555">← RGB</span></p>
</div>
<div style="background:#001a0a;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Классы — самый частый селектор</p>
  <p style="margin:0">90% стилей — через .класс. Один класс можно использовать много раз!</p>
</div>`,
  },
  {
    id: 'web_m2_q2',
    courseId: 'course_web300',
    module: 'Модуль 2: Основы CSS',
    title: 'Квиз: Селекторы CSS',
    type: 'quiz',
    description: 'Проверь знание CSS-селекторов.',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'locked',
    quizData: {
      question: "Как в CSS выбрать элементы с class=\"danger\"?",
      options: ["danger { }","#danger { }",".danger { }","*danger { }"],
      correctIndex: 2,
      explanation: "Точка (.) — по классу. Решётка (#) — по id. Просто имя — по тегу."
    },
  },
  {
    id: 'web_m2_t3',
    courseId: 'course_web300',
    module: 'Модуль 2: Основы CSS',
    title: 'Теория: Блочная модель (Box Model)',
    type: 'theory',
    description: 'Как CSS считает размеры: content, padding, border, margin.',
    difficulty: 'Новичок',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">📦 Каждый элемент — коробка!</p>
<p style="line-height:1.7">В CSS <strong>каждый элемент</strong> — прямоугольник из 4 слоёв.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📐 4 слоя</h3>
<div style="background:#0a0a14;border-radius:8px;padding:20px;margin:12px 0;text-align:center">
  <div style="border:3px solid #ff6b6b;border-radius:8px;padding:14px;display:inline-block">
    <p style="color:#ff6b6b;font-size:0.75em;margin:0 0 4px">margin</p>
    <div style="border:3px solid #fcee0a;border-radius:6px;padding:12px">
      <p style="color:#fcee0a;font-size:0.75em;margin:0 0 4px">border</p>
      <div style="border:3px solid #00f3ff;border-radius:4px;padding:10px">
        <p style="color:#00f3ff;font-size:0.75em;margin:0 0 4px">padding</p>
        <div style="background:#00ff41;border-radius:4px;padding:8px">
          <p style="color:black;font-weight:bold;margin:0;font-size:0.8em">content</p>
        </div>
      </div>
    </div>
  </div>
</div>
<div style="display:flex;flex-direction:column;gap:8px;margin:16px 0">
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:2px">content — содержимое</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Текст, картинка. Размер: width/height.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #00f3ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00f3ff;font-weight:bold;margin-bottom:2px">padding — внутренний отступ</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">От содержимого до рамки. Как поролон в коробке.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #fcee0a;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#fcee0a;font-weight:bold;margin-bottom:2px">border — рамка</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Видимая граница элемента.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #ff6b6b;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff6b6b;font-weight:bold;margin-bottom:2px">margin — внешний отступ</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Расстояние до соседних элементов.</p>
  </div>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">⚡ Совет: box-sizing: border-box</p>
  <p style="margin:0;color:#ccc">Добавь <code>* { box-sizing: border-box; }</code> — padding и border НЕ увеличат ширину. Стандарт в современном CSS.</p>
</div>`,
  },
  {
    id: 'web_m2_q3',
    courseId: 'course_web300',
    module: 'Модуль 2: Основы CSS',
    title: 'Квиз: Блочная модель',
    type: 'quiz',
    description: 'Проверь понимание блочной модели.',
    difficulty: 'Новичок',
    xpReward: 40,
    currencyReward: 10,
    status: 'locked',
    quizData: {
      question: "Что такое padding?",
      options: ["Внешний отступ","Внутренний отступ от содержимого до рамки","Толщина рамки","Цвет фона"],
      correctIndex: 1,
      explanation: "padding — внутренний отступ (от содержимого до border). margin — внешний (между элементами)."
    },
  },
  {
    id: 'web_m2_practice1',
    courseId: 'course_web300',
    module: 'Модуль 2: Основы CSS',
    title: 'Практика: Стилизация карточки',
    type: 'html',
    description: 'Создай карточку с тёмным фоном, цветным текстом, рамкой и отступами.',
    difficulty: 'Новичок',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    initialCode: `<style>\n  .card {\n    /* 1. background-color: #1a1a2e */\n    /* 2. color: white */\n    /* 3. padding: 20px */\n    /* 4. border: 2px solid #00f3ff */\n    /* 5. border-radius: 12px */\n  }\n  .card h2 { /* color: #00f3ff */ }\n</style>\n<div class="card">\n  <h2>AGENT PROFILE</h2>\n  <p>Элитный нетраннер. Уровень: MAX.</p>\n</div>`,
    htmlConfig: {"targetTag":".card","targetStyle":"background-color"},
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Подсказка</h3>
<p>Раскомментируй свойства — убери /* и */.</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace;font-size:12px;line-height:1.7">
  <p style="margin:2px 0"><span style="color:#fcee0a">background-color</span> → фон</p>
  <p style="margin:2px 0"><span style="color:#fcee0a">padding</span> → внутренний отступ</p>
  <p style="margin:2px 0"><span style="color:#fcee0a">border</span> → рамка</p>
  <p style="margin:2px 0"><span style="color:#fcee0a">border-radius</span> → скругление</p>
</div>`,
  },
  {
    id: 'web_m2_practice2',
    courseId: 'course_web300',
    module: 'Модуль 2: Основы CSS',
    title: 'Практика: Кнопка хакера',
    type: 'html',
    description: 'Создай кнопку с :hover эффектом. Зелёный текст, тёмный фон, неоновая рамка.',
    difficulty: 'Новичок',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    initialCode: `<style>\n  .hack-btn {\n    background: #0a0a14;\n    color: #00ff41;\n    border: 2px solid #00ff41;\n    padding: 12px 24px;\n    font-size: 16px;\n    border-radius: 8px;\n    cursor: pointer;\n    font-family: monospace;\n    /* Добавь: transition: all 0.3s; */\n  }\n  .hack-btn:hover {\n    /* background: #00ff41; */\n    /* color: black; */\n  }\n</style>\n<button class="hack-btn">[ ВЗЛОМАТЬ ]</button>`,
    htmlConfig: {"targetTag":".hack-btn","targetStyle":"color"},
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Подсказка</h3>
<p><strong>:hover</strong> — при наведении мыши. <strong>transition</strong> — плавная анимация.</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace;font-size:12px">
  <p style="margin:2px 0">.btn:hover { background: #00ff41; color: black; }</p>
</div>`,
  },

    // ── МОДУЛЬ 3: FLEXBOX ─────────────────────────────────────────────────────
  {
    id: 'web_m3_theory',
    courseId: 'course_web300',
    module: 'Модуль 3: Flexbox',
    title: 'Теория: Flexbox — гибкие макеты',
    type: 'theory',
    description: 'Flexbox — главный инструмент для создания горизонтальных и вертикальных раскладок.',
    difficulty: 'Хакер',
    xpReward: 70,
    currencyReward: 20,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">📐 Flexbox — власть над макетом!</p>
<p>Flexbox позволяет выстраивать элементы в ряд или колонку, управлять выравниванием и распределением пространства.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🚀 Включаем Flex</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;line-height:1.8">
  <p style="margin:2px 0"><span style="color:#fcee0a">.container</span> {</p>
  <p style="margin:2px 0 2px 16px"><span style="color:#00f3ff">display</span>: <span style="color:#00ff41">flex</span>;</p>
  <p style="margin:2px 0 2px 16px"><span style="color:#00f3ff">gap</span>: <span style="color:#00ff41">16px</span>; <span style="color:#555">/* отступ между элементами */</span></p>
  <p style="margin:2px 0">}</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎯 Ключевые свойства</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;line-height:1.8">
  <p style="margin:2px 0"><span style="color:#00f3ff">flex-direction</span>: <span style="color:#00ff41">row | column</span>; <span style="color:#555">/* направление */</span></p>
  <p style="margin:2px 0"><span style="color:#00f3ff">justify-content</span>: <span style="color:#00ff41">center | space-between | space-around</span>;</p>
  <p style="margin:2px 0"><span style="color:#00f3ff">align-items</span>: <span style="color:#00ff41">center | flex-start | stretch</span>;</p>
  <p style="margin:2px 0"><span style="color:#00f3ff">flex-wrap</span>: <span style="color:#00ff41">wrap</span>; <span style="color:#555">/* перенос на новую строку */</span></p>
</div>
<div style="background:#001a0a;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Flex = контейнер + дети</p>
  <p style="margin:0">display:flex ставится на <strong>родителя</strong>. Все прямые потомки становятся flex-элементами и выстраиваются автоматически.</p>
</div>`
  },
  {
    id: 'web_m3_quiz',
    courseId: 'course_web300',
    module: 'Модуль 3: Flexbox',
    title: 'Квиз: Flexbox',
    type: 'quiz',
    description: 'Проверь знание Flexbox.',
    difficulty: 'Хакер',
    xpReward: 50,
    currencyReward: 15,
    status: 'locked',
    quizData: {
      question: 'Как выровнять все элементы по центру горизонтально во flex-контейнере?',
      options: ['text-align: center', 'justify-content: center', 'align-items: center', 'margin: auto'],
      correctIndex: 1,
      explanation: 'justify-content управляет выравниванием по главной оси (горизонтальной при row). center — по центру. align-items — по поперечной оси (вертикальной).'
    }
  },
  {id:'web_m3_q2',courseId:'course_web300',module:'Модуль 3: Flexbox',title:'Квиз: Направление',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Что делает flex-direction: column?",options:["Строка","Столбец","Справа налево","Скрывает"],correctIndex:1,explanation:"column — вертикально."}},
  {
    id: 'web_m3_practice',
    courseId: 'course_web300',
    module: 'Модуль 3: Flexbox',
    title: 'Практика: Flex-карточки',
    type: 'html',
    description: 'Создай flex-контейнер с 3 карточками в ряд, gap 16px, центрированные.',
    difficulty: 'Хакер',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    initialCode: `<style>
  .row {
    /* display: flex, gap: 16px, justify-content: center */
  }
  .card {
    background: #0a0a14;
    border: 1px solid #00f3ff;
    padding: 20px;
    color: #00f3ff;
    border-radius: 8px;
  }
</style>

<div class="row">
  <div class="card">Alpha</div>
  <div class="card">Beta</div>
  <div class="card">Gamma</div>
</div>`,
    htmlConfig: { targetTag: '.row' },
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Flex-ряд</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace;font-size:12px;line-height:1.7">
  <p style="margin:2px 0"><span style="color:#fcee0a">.row</span> {</p>
  <p style="margin:2px 0 2px 16px"><span style="color:#00f3ff">display</span>: <span style="color:#00ff41">flex</span>;</p>
  <p style="margin:2px 0 2px 16px"><span style="color:#00f3ff">gap</span>: <span style="color:#00ff41">16px</span>;</p>
  <p style="margin:2px 0 2px 16px"><span style="color:#00f3ff">justify-content</span>: <span style="color:#00ff41">center</span>;</p>
  <p style="margin:2px 0">}</p>
</div>`
  },

  // ── МОДУЛЬ 4: АДАПТИВНЫЙ ДИЗАЙН ──────────────────────────────────────────
  {
    id: 'web_m4_theory',
    courseId: 'course_web300',
    module: 'Модуль 4: Адаптивность',
    title: 'Теория: Responsive Design',
    type: 'theory',
    description: 'Медиа-запросы, единицы измерения и мобильная вёрстка.',
    difficulty: 'Элита',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    theory: `<p style="color:#fcee0a;font-weight:bold;margin-bottom:12px">📱 Один сайт — все экраны!</p>
<p>Адаптивный дизайн — это когда сайт выглядит хорошо и на телефоне, и на планшете, и на мониторе.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📏 Единицы измерения</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;line-height:1.8">
  <p style="margin:2px 0"><span style="color:#fcee0a">px</span> <span style="color:#555">— абсолютные пиксели</span></p>
  <p style="margin:2px 0"><span style="color:#fcee0a">%</span> <span style="color:#555">— процент от родителя</span></p>
  <p style="margin:2px 0"><span style="color:#fcee0a">vw / vh</span> <span style="color:#555">— процент от окна (viewport)</span></p>
  <p style="margin:2px 0"><span style="color:#fcee0a">rem</span> <span style="color:#555">— относительно корневого font-size</span></p>
  <p style="margin:2px 0"><span style="color:#fcee0a">em</span> <span style="color:#555">— относительно font-size родителя</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎯 Media Queries</h3>
<p>Позволяют применять разные стили для разных размеров экрана:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:13px;line-height:1.7">
  <p style="margin:2px 0;color:#555">/* Базовые стили — для мобильных */</p>
  <p style="margin:2px 0"><span style="color:#fcee0a">.card</span> { <span style="color:#00f3ff">width</span>: <span style="color:#00ff41">100%</span>; }</p>
  <p style="margin:10px 0 2px 0;color:#555">/* Для экранов шире 768px */</p>
  <p style="margin:2px 0"><span style="color:#ff00ff">@media</span> (<span style="color:#00f3ff">min-width</span>: <span style="color:#00ff41">768px</span>) {</p>
  <p style="margin:2px 0 2px 16px"><span style="color:#fcee0a">.card</span> { <span style="color:#00f3ff">width</span>: <span style="color:#00ff41">50%</span>; }</p>
  <p style="margin:2px 0">}</p>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">📱 Mobile First!</p>
  <p style="margin:0">Начинай с мобильных стилей, затем добавляй <code>@media (min-width)</code> для больших экранов. Это лучшая практика.</p>
</div>`
  },
  {
    id: 'web_m4_quiz',
    courseId: 'course_web300',
    module: 'Модуль 4: Адаптивность',
    title: 'Квиз: Media Queries',
    type: 'quiz',
    description: 'Проверь знание адаптивного дизайна.',
    difficulty: 'Элита',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    quizData: {
      question: 'Когда применятся стили внутри @media (min-width: 768px)?',
      options: [
        'Когда экран уже 768px',
        'Когда экран 768px или шире',
        'Только на мобильных',
        'Всегда'
      ],
      correctIndex: 1,
      explanation: 'min-width: 768px означает «при ширине экрана 768px и больше». Стили внутри этого блока применяются на планшетах и десктопах, но не на узких мобильных экранах.'
    }
  },
  {id:'web_m4_q2',courseId:'course_web300',module:'Модуль 4: Адаптивность',title:'Квиз: Единицы',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Чем % от px?",options:["Ничем","% от родителя, px фиксирован","px от экрана","Нет разницы"],correctIndex:1,explanation:"% от родителя. px фиксирован."}},
  {
    id: 'web_m4_practice',
    courseId: 'course_web300',
    module: 'Модуль 4: Адаптивность',
    title: 'Практика: Адаптивная сетка',
    type: 'html',
    description: 'Сделай карточки: 1 колонка на мобильном, 3 колонки на десктопе с @media.',
    difficulty: 'Элита',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    initialCode: `<style>
  .grid {
    display: flex;
    flex-wrap: wrap;
    gap: 12px;
  }
  .item {
    background: #1a1a2e;
    border: 1px solid #ff00ff;
    padding: 16px;
    color: white;
    border-radius: 8px;
    width: 100%;
    box-sizing: border-box;
  }
  /* Добавь @media (min-width: 600px) */
  /* Сделай .item { width: calc(33.33% - 8px); } */
</style>

<div class="grid">
  <div class="item">Node 1</div>
  <div class="item">Node 2</div>
  <div class="item">Node 3</div>
</div>`,
    htmlConfig: { targetTag: '.grid' },
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Адаптивная сетка</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace;font-size:12px">
  <p style="margin:2px 0"><span style="color:#ff00ff">@media</span> (min-width: 600px) {</p>
  <p style="margin:2px 0 2px 16px">.item { width: calc(33.33% - 8px); }</p>
  <p style="margin:2px 0">}</p>
</div>`
  },

  // ── МОДУЛЬ 5: ФИНАЛЬНЫЙ ПРОЕКТ ────────────────────────────────────────────
  {
    id: 'web_m5_theory',
    courseId: 'course_web300',
    module: 'Модуль 5: Финальный проект',
    title: 'Теория: Собираем лендинг',
    type: 'theory',
    description: 'Объединяем HTML, CSS, Flexbox и адаптивность в полноценную страницу.',
    difficulty: 'Легенда',
    xpReward: 90,
    currencyReward: 30,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🏆 Финал — собираем всё!</p>
<p>Ты знаешь HTML-теги, CSS-стили, Flexbox и адаптивность. Пора создать полноценную веб-страницу!</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📋 Структура лендинга</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:12px;line-height:1.7">
  <p style="margin:2px 0"><span style="color:#ff00ff">&lt;header&gt;</span> — шапка с навигацией</p>
  <p style="margin:2px 0"><span style="color:#ff00ff">&lt;main&gt;</span> — основной контент</p>
  <p style="margin:2px 0 2px 16px"><span style="color:#00ff41">&lt;section&gt;</span> — блок «Герой» (hero)</p>
  <p style="margin:2px 0 2px 16px"><span style="color:#00ff41">&lt;section&gt;</span> — блок «Карточки»</p>
  <p style="margin:2px 0 2px 16px"><span style="color:#00ff41">&lt;section&gt;</span> — блок «О нас»</p>
  <p style="margin:2px 0"><span style="color:#ff00ff">&lt;footer&gt;</span> — подвал</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎨 Советы по дизайну</h3>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="margin:0;color:#aaa"><span style="color:#00ff41;font-weight:bold">Контраст</span> — светлый текст на тёмном фоне (или наоборот)</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #fcee0a;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="margin:0;color:#aaa"><span style="color:#fcee0a;font-weight:bold">Отступы</span> — padding/margin создают воздух и читаемость</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #ff00ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="margin:0;color:#aaa"><span style="color:#ff00ff;font-weight:bold">Иерархия</span> — h1 > h2 > p, размеры указывают важность</p>
  </div>
</div>
<div style="background:#001a0a;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">🚀 Ты готов!</p>
  <p style="margin:0">В финальном задании создай свой лендинг с header, hero-секцией, карточками и footer. Используй всё, что знаешь!</p>
</div>`
  },
  {
    id: 'web_m5_quiz',
    courseId: 'course_web300',
    module: 'Модуль 5: Финальный проект',
    title: 'Квиз: Семантика и структура',
    type: 'quiz',
    description: 'Проверь знание семантических тегов.',
    difficulty: 'Легенда',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'Какой семантический тег лучше подходит для шапки сайта?',
      options: ['<div class="header">', '<header>', '<head>', '<top>'],
      correctIndex: 1,
      explanation: '<header> — семантический тег HTML5 для шапки сайта. <head> — служебный блок (title, meta), не отображается на странице. <div> работает, но не несёт смысловой нагрузки.'
    }
  },
  {id:'web_m5_q2',courseId:'course_web300',module:'Модуль 5: Финальный проект',title:'Квиз: Семантика',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Какой тег для навигации?",options:["<div>","<nav>","<span>","<p>"],correctIndex:1,explanation:"<nav> — семантический тег навигации."}},
  {
    id: 'web_m5_practice',
    courseId: 'course_web300',
    module: 'Модуль 5: Финальный проект',
    title: 'Финал: Кибер-лендинг',
    type: 'html',
    description: 'Создай мини-лендинг: header с названием, hero-секция с h1 и кнопкой, 3 flex-карточки, footer.',
    difficulty: 'Легенда',
    xpReward: 150,
    currencyReward: 60,
    status: 'locked',
    initialCode: `<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }
  body { background: #0a0a14; color: #e0e0e0; font-family: sans-serif; }
  
  /* Стилизуй header, .hero, .cards, .card, footer */
  /* Используй flex, padding, цвета, border-radius */
</style>

<header>
  <h2>CYBERSITE</h2>
</header>

<section class="hero">
  <h1>Добро пожаловать</h1>
  <p>Будущее начинается здесь</p>
  <button>Начать</button>
</section>

<section class="cards">
  <div class="card">
    <h3>Скорость</h3>
    <p>Мгновенная загрузка</p>
  </div>
  <div class="card">
    <h3>Защита</h3>
    <p>Полное шифрование</p>
  </div>
  <div class="card">
    <h3>Дизайн</h3>
    <p>Современный интерфейс</p>
  </div>
</section>

<footer>
  <p>© 2025 CYBERSITE</p>
</footer>`,
    htmlConfig: { targetTag: '.hero' },
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Структура лендинга</h3>
<p>Сделай header, hero, cards (flex), footer. Добавь цвета, padding, border.</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace;font-size:11px;line-height:1.6">
  <p style="margin:2px 0">header { padding: 16px; background: #111; }</p>
  <p style="margin:2px 0">.hero { text-align: center; padding: 60px 20px; }</p>
  <p style="margin:2px 0">.cards { display: flex; gap: 16px; padding: 20px; }</p>
  <p style="margin:2px 0">.card { flex: 1; background: #1a1a2e; padding: 20px; border-radius: 8px; }</p>
</div>`
  },

  // ── МОДУЛЬ 6: АНИМАЦИИ И ПЕРЕХОДЫ ─────────────────────────────────────────
  {
    id: 'web_m6_theory',
    courseId: 'course_web300',
    module: 'Модуль 6: Анимации',
    title: 'Теория: CSS-анимации и переходы',
    type: 'theory',
    description: 'Узнай, как оживить интерфейс с помощью transition и @keyframes.',
    difficulty: 'Элита',
    xpReward: 80,
    currencyReward: 25,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">✨ Движение — ключ к UX!</p>
<p>Анимации делают интерфейс живым и интуитивным. В CSS есть два подхода: <strong>transition</strong> (переходы) и <strong>@keyframes</strong> (ключевые кадры).</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔄 Transition — плавные переходы</h3>
<p>Transition анимирует изменение свойства при наведении или смене класса:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:3px 0;color:#ff00ff">.btn</span> {</p>
  <p style="margin:3px 0 3px 20px">background: <span style="color:#00f3ff">#00f3ff</span>;</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#fcee0a">transition</span>: background <span style="color:#fcee0a">0.3s</span> ease, transform <span style="color:#fcee0a">0.2s</span> ease;</p>
  <p style="margin:3px 0">}</p>
  <p style="margin:8px 0 3px 0;color:#ff00ff">.btn:hover</span> {</p>
  <p style="margin:3px 0 3px 20px">background: <span style="color:#ff00ff">#ff00ff</span>;</p>
  <p style="margin:3px 0 3px 20px">transform: <span style="color:#fcee0a">scale(1.05)</span>;</p>
  <p style="margin:3px 0">}</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎬 @keyframes — полный контроль</h3>
<p>Keyframes позволяют задать анимацию по шагам (0% → 50% → 100%):</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:3px 0;color:#ff00ff">@keyframes</span> <span style="color:#fcee0a">glow</span> {</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#aaa">0%</span>   { box-shadow: 0 0 5px <span style="color:#00f3ff">#00f3ff</span>; }</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#aaa">50%</span>  { box-shadow: 0 0 20px <span style="color:#00f3ff">#00f3ff</span>; }</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#aaa">100%</span> { box-shadow: 0 0 5px <span style="color:#00f3ff">#00f3ff</span>; }</p>
  <p style="margin:3px 0">}</p>
  <p style="margin:8px 0 3px 0;color:#ff00ff">.card</span> {</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#fcee0a">animation</span>: glow <span style="color:#fcee0a">2s</span> ease-in-out <span style="color:#fcee0a">infinite</span>;</p>
  <p style="margin:3px 0">}</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">⚡ Transform — трансформации</h3>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:4px 0"><span style="color:#fcee0a">scale(1.1)</span>     <span style="color:#555">→ увеличить на 10%</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a">rotate(45deg)</span>  <span style="color:#555">→ повернуть на 45°</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a">translateX(10px)</span> <span style="color:#555">→ сдвинуть вправо</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a">skewX(5deg)</span>   <span style="color:#555">→ наклонить</span></p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Совет:</p>
  <p style="margin:0">Анимируй только <code>transform</code> и <code>opacity</code> — они не вызывают перерисовку (reflow) и работают плавно даже на слабых устройствах.</p>
</div>`
  },
  {
    id: 'web_m6_quiz',
    courseId: 'course_web300',
    module: 'Модуль 6: Анимации',
    title: 'Квиз: Анимации CSS',
    type: 'quiz',
    description: 'Проверь знание CSS-анимаций.',
    difficulty: 'Элита',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    quizData: {
      question: 'Какое свойство CSS используется для плавного перехода при наведении?',
      options: ['animation', 'transition', '@keyframes', 'transform'],
      correctIndex: 1,
      explanation: 'transition — это свойство для плавного перехода между двумя состояниями (например, обычное и :hover). @keyframes определяет анимацию, animation запускает её, а transform — трансформирует элемент.'
    }
  },
  {id:'web_m6_q2',courseId:'course_web300',module:'Модуль 6: Анимации и переходы',title:'Квиз: Keyframes',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Что делает @keyframes?",options:["Медиа-запрос","Этапы анимации","Переменную","Шрифт"],correctIndex:1,explanation:"@keyframes — этапы анимации."}},
  {
    id: 'web_m6_practice',
    courseId: 'course_web300',
    module: 'Модуль 6: Анимации',
    title: 'Практика: Неоновая кнопка',
    type: 'html',
    description: 'Создай кнопку с неоновым свечением (box-shadow) и анимацией пульсации через @keyframes.',
    difficulty: 'Элита',
    xpReward: 90,
    currencyReward: 30,
    status: 'locked',
    initialCode: `<style>
  .neon-btn {
    background: transparent;
    color: #00f3ff;
    border: 2px solid #00f3ff;
    padding: 12px 32px;
    font-size: 18px;
    cursor: pointer;
    border-radius: 6px;
    /* Добавь transition для hover */
    /* Добавь animation: pulse 2s infinite */
  }
  .neon-btn:hover {
    /* Измени background и box-shadow */
  }
  /* Создай @keyframes pulse */
</style>
<button class="neon-btn">HACK THE SYSTEM</button>`,
    htmlConfig: { targetTag: '.neon-btn' },
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Кнопка с пульсацией</h3>
<p>Комбинируй transition для hover и @keyframes для постоянной анимации:</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace;font-size:0.85em">
  <p style="margin:2px 0">@keyframes pulse { 0%,100% { box-shadow: 0 0 5px #00f3ff; } 50% { box-shadow: 0 0 20px #00f3ff; } }</p>
  <p style="margin:2px 0">.neon-btn { animation: pulse 2s infinite; transition: all 0.3s; }</p>
  <p style="margin:2px 0">.neon-btn:hover { background: #00f3ff; color: #0a0a14; }</p>
</div>`
  },

  // ── МОДУЛЬ 7: CSS GRID И МАСТЕРСТВО ───────────────────────────────────────
  {
    id: 'web_m7_theory',
    courseId: 'course_web300',
    module: 'Модуль 7: Grid и мастерство',
    title: 'Теория: CSS Grid — двумерные сетки',
    type: 'theory',
    description: 'Освой CSS Grid — систему двумерной раскладки для сложных макетов.',
    difficulty: 'Легенда',
    xpReward: 90,
    currencyReward: 35,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🏗️ Grid — архитектура макетов!</p>
<p>Flexbox — одномерный (строка ИЛИ столбец). <strong>Grid</strong> — двумерный (строки И столбцы одновременно). Идеален для сложных макетов.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📐 Основы Grid</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:3px 0;color:#ff00ff">.container</span> {</p>
  <p style="margin:3px 0 3px 20px">display: <span style="color:#fcee0a">grid</span>;</p>
  <p style="margin:3px 0 3px 20px">grid-template-columns: <span style="color:#fcee0a">1fr 1fr 1fr</span>;  <span style="color:#555">/* 3 равные колонки */</span></p>
  <p style="margin:3px 0 3px 20px">grid-template-rows: <span style="color:#fcee0a">auto auto</span>;  <span style="color:#555">/* 2 строки */</span></p>
  <p style="margin:3px 0 3px 20px">gap: <span style="color:#fcee0a">16px</span>;</p>
  <p style="margin:3px 0">}</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🎯 Размещение элементов</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:3px 0;color:#ff00ff">.header</span> {</p>
  <p style="margin:3px 0 3px 20px">grid-column: <span style="color:#fcee0a">1 / -1</span>;  <span style="color:#555">/* на всю ширину */</span></p>
  <p style="margin:3px 0">}</p>
  <p style="margin:8px 0 3px 0;color:#ff00ff">.sidebar</span> {</p>
  <p style="margin:3px 0 3px 20px">grid-row: <span style="color:#fcee0a">2 / 4</span>;  <span style="color:#555">/* занимает 2 строки */</span></p>
  <p style="margin:3px 0">}</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📊 grid-template-areas — именованные зоны</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:3px 0;color:#ff00ff">.layout</span> {</p>
  <p style="margin:3px 0 3px 20px">display: grid;</p>
  <p style="margin:3px 0 3px 20px">grid-template-areas:</p>
  <p style="margin:3px 0 3px 40px"><span style="color:#00ff41">"header header header"</span></p>
  <p style="margin:3px 0 3px 40px"><span style="color:#00ff41">"sidebar main   main"</span></p>
  <p style="margin:3px 0 3px 40px"><span style="color:#00ff41">"footer  footer  footer"</span>;</p>
  <p style="margin:3px 0">}</p>
  <p style="margin:8px 0 3px 0;color:#ff00ff">.header</span>  { grid-area: <span style="color:#fcee0a">header</span>; }</p>
  <p style="margin:3px 0;color:#ff00ff">.sidebar</span> { grid-area: <span style="color:#fcee0a">sidebar</span>; }</p>
  <p style="margin:3px 0;color:#ff00ff">.main</span>    { grid-area: <span style="color:#fcee0a">main</span>; }</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">⚡ repeat() и minmax()</h3>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:4px 0"><span style="color:#fcee0a">repeat(3, 1fr)</span> <span style="color:#555">→ 1fr 1fr 1fr</span></p>
  <p style="margin:4px 0"><span style="color:#fcee0a">repeat(auto-fill, minmax(200px, 1fr))</span></p>
  <p style="margin:2px 0 4px 20px;color:#555">→ столько колонок, сколько влезет (мин 200px)</p>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Flexbox vs Grid:</p>
  <p style="margin:0"><strong>Flexbox</strong> — для компонентов (навбар, карточка). <strong>Grid</strong> — для макетов страниц (header-sidebar-content-footer).</p>
</div>`
  },
  {
    id: 'web_m7_quiz',
    courseId: 'course_web300',
    module: 'Модуль 7: Grid и мастерство',
    title: 'Квиз: CSS Grid',
    type: 'quiz',
    description: 'Проверь знание CSS Grid.',
    difficulty: 'Легенда',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'Как сделать элемент, занимающий всю ширину в Grid с 3 колонками?',
      options: ['width: 100%', 'grid-column: 1 / -1', 'flex: 1', 'grid-area: full'],
      correctIndex: 1,
      explanation: 'grid-column: 1 / -1 означает «от первой линии до последней», то есть элемент растянется на все колонки. -1 — это последняя линия сетки.'
    }
  },
  {id:'web_m7_q2',courseId:'course_web300',module:'Модуль 7: CSS Grid и мастерство',title:'Квиз: Grid vs Flex',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Когда Grid лучше Flex?",options:["Никогда","Для 2D-сеток","Для одной строки","Для текста"],correctIndex:1,explanation:"Grid — двумерные сетки. Flex — одномерные."}},
  {
    id: 'web_m7_practice',
    courseId: 'course_web300',
    module: 'Модуль 7: Grid и мастерство',
    title: 'Финал: Кибер-дашборд',
    type: 'html',
    description: 'Создай дашборд с Grid: header на всю ширину, sidebar слева, main справа, footer внизу. Используй grid-template-areas.',
    difficulty: 'Легенда',
    xpReward: 200,
    currencyReward: 100,
    status: 'locked',
    initialCode: `<style>
  * { margin: 0; box-sizing: border-box; }
  body { background: #0a0a14; color: #e0e0e0; font-family: monospace; }
  .dashboard {
    display: grid;
    min-height: 100vh;
    /* Задай grid-template-columns: 200px 1fr */
    /* Задай grid-template-rows: 60px 1fr 40px */
    /* Задай grid-template-areas */
  }
  .header { background: #1a1a2e; padding: 16px; /* grid-area: header */ }
  .sidebar { background: #111; padding: 16px; /* grid-area: sidebar */ }
  .main { padding: 20px; /* grid-area: main */ }
  .footer { background: #1a1a2e; padding: 10px; text-align: center; /* grid-area: footer */ }
</style>
<div class="dashboard">
  <header class="header"><h2 style="color:#00f3ff">⚡ CyberDash</h2></header>
  <aside class="sidebar">
    <p style="color:#ff00ff">📊 Меню</p>
    <p>• Статус</p>
    <p>• Миссии</p>
    <p>• Настройки</p>
  </aside>
  <main class="main">
    <h3 style="color:#00ff41">Добро пожаловать, Агент!</h3>
    <p>Здесь твой центр управления.</p>
  </main>
  <footer class="footer">
    <p style="color:#555">CYBERDASH v1.0</p>
  </footer>
</div>`,
    htmlConfig: { targetTag: '.dashboard' },
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Дашборд на Grid</h3>
<p>Используй grid-template-areas для удобного макета:</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace;font-size:0.85em">
  <p style="margin:2px 0">grid-template-columns: 200px 1fr;</p>
  <p style="margin:2px 0">grid-template-rows: 60px 1fr 40px;</p>
  <p style="margin:2px 0">grid-template-areas:</p>
  <p style="margin:2px 0 2px 20px">"header header"</p>
  <p style="margin:2px 0 2px 20px">"sidebar main"</p>
  <p style="margin:2px 0 2px 20px">"footer footer";</p>
</div>`
  },

  // =========================================================================
  // ALG404: ЗАПРЕТНЫЕ ПРОТОКОЛЫ — 3 модуля
  // =========================================================================

  // ── МОДУЛЬ 1: СЛОЖНОСТЬ АЛГОРИТМОВ ────────────────────────────────────────
  {
    id: 'alg_m1_t1',
    courseId: 'course_alg101',
    module: 'Модуль 1: Сложность',
    title: 'Теория: Big O нотация',
    type: 'theory',
    description: 'Как оценивать скорость алгоритмов и почему это важно.',
    difficulty: 'Хакер',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    theory: `<p style="color:#00ff41;font-weight:bold;margin-bottom:12px">⏱️ Скорость имеет значение!</p>
<p>Два алгоритма могут решать одну задачу, но один — за секунду, а другой — за час. <strong>Big O</strong> помогает оценить, как быстро растёт время работы при увеличении входных данных.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📊 Основные классы сложности</h3>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#0a0a14;border-left:3px solid #00ff41;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:2px">O(1) — Константная</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Время не зависит от размера данных. Пример: доступ к элементу массива по индексу.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #00f3ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00f3ff;font-weight:bold;margin-bottom:2px">O(log n) — Логарифмическая</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Данные делятся пополам на каждом шаге. Пример: бинарный поиск.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #fcee0a;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#fcee0a;font-weight:bold;margin-bottom:2px">O(n) — Линейная</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Время растёт пропорционально данным. Пример: поиск максимума в массиве.</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #ff00ff;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff00ff;font-weight:bold;margin-bottom:2px">O(n²) — Квадратичная</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Вложенные циклы. Пример: пузырьковая сортировка. При n=1000 → 1 000 000 операций!</p>
  </div>
  <div style="background:#1a0a0a;border-left:3px solid #ff003c;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#ff003c;font-weight:bold;margin-bottom:2px">O(2ⁿ) — Экспоненциальная</p>
    <p style="margin:0;color:#aaa;font-size:0.9em">Каждый элемент удваивает время. При n=30 → больше миллиарда операций. Избегай!</p>
  </div>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Правило:</p>
  <p style="margin:0">Всегда выбирай алгоритм с наименьшей сложностью. O(n log n) лучше O(n²), а O(n) лучше O(n log n).</p>
</div>`
  },
  {
    id: 'alg_m1_q1',
    courseId: 'course_alg101',
    module: 'Модуль 1: Сложность',
    title: 'Квиз: Определи сложность',
    type: 'quiz',
    description: 'Определи Big O для алгоритмов.',
    difficulty: 'Хакер',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    quizData: {
      question: 'Два вложенных цикла for, каждый от 1 до n. Какая сложность?',
      options: ['O(1)', 'O(n)', 'O(n²)', 'O(log n)'],
      correctIndex: 2,
      explanation: 'Внешний цикл выполняется n раз, для каждого — внутренний тоже n раз. Итого: n × n = n². Это квадратичная сложность O(n²).'
    }
  },
  {
    id: 'alg_m1_q2',
    courseId: 'course_alg101',
    module: 'Модуль 1: Сложность',
    title: 'Квиз: Бинарный поиск',
    type: 'quiz',
    description: 'Почему бинарный поиск быстрее линейного?',
    difficulty: 'Хакер',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'Массив из 1 000 000 элементов. Сколько максимум шагов нужно бинарному поиску?',
      options: ['1 000 000', '500 000', 'Около 20', 'Около 100'],
      correctIndex: 2,
      explanation: 'Бинарный поиск делит массив пополам на каждом шаге. log₂(1 000 000) ≈ 20. Всего 20 шагов вместо миллиона! Вот сила O(log n).'
    }
  },
  {id:'alg_m1_b1',courseId:'course_alg101',module:'Модуль 1: Сложность алгоритмов',title:'Блоки: Порядок O()',type:'blocks',description:'Расставь сложности от быстрой к медленной.',difficulty:'Хакер',xpReward:70,currencyReward:25,status:'locked',blocksConfig:{availableBlocks:["O(1)","O(log n)","O(n)","O(n log n)","O(n²)","O(2ⁿ)"],correctSequence:["O(1)","O(log n)","O(n)","O(n log n)","O(n²)","O(2ⁿ)"],theme:'robot',successMessage:"Верно! O(1) — мгновенно, O(2ⁿ) — экспоненциально медленно."}},

  // ── МОДУЛЬ 2: СОРТИРОВКИ ──────────────────────────────────────────────────
  {
    id: 'alg_m2_t1',
    courseId: 'course_alg101',
    module: 'Модуль 2: Сортировки',
    title: 'Теория: Алгоритмы сортировки',
    type: 'theory',
    description: 'Пузырёк, выбором и быстрая сортировка — как и когда применять.',
    difficulty: 'Элита',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    theory: `<p style="color:#00ff41;font-weight:bold;margin-bottom:12px">🔄 Сортировка — основа алгоритмов!</p>
<p>Отсортировать данные — одна из самых частых задач в программировании. Существуют десятки алгоритмов, но мы разберём три главных.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🫧 Пузырьковая сортировка — O(n²)</h3>
<p>Сравнивает соседние элементы и меняет местами, если они не в порядке. Простая, но медленная.</p>
<div style="background:#0a0a14;border-radius:8px;padding:14px;margin:12px 0;font-family:monospace;font-size:0.9em">
  <p style="margin:3px 0;color:#555">// Массив: [5, 3, 8, 1]</p>
  <p style="margin:3px 0;color:#fcee0a">Проход 1: [3, 5, 1, 8]</p>
  <p style="margin:3px 0;color:#fcee0a">Проход 2: [3, 1, 5, 8]</p>
  <p style="margin:3px 0;color:#00ff41">Проход 3: [1, 3, 5, 8] ✓</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">⚡ Быстрая сортировка (QuickSort) — O(n log n)</h3>
<p>Выбирает опорный элемент (pivot), делит массив на «меньше» и «больше», сортирует каждую часть. Используется по умолчанию в большинстве языков!</p>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">📊 Сравнение скорости (n = 10 000):</p>
  <p style="margin:2px 0">Пузырёк: ~100 000 000 операций</p>
  <p style="margin:2px 0">QuickSort: ~130 000 операций</p>
  <p style="margin:2px 0;color:#fcee0a;font-weight:bold">Разница в 770 раз!</p>
</div>`
  },
  {
    id: 'alg_m2_q1',
    courseId: 'course_alg101',
    module: 'Модуль 2: Сортировки',
    title: 'Квиз: Выбери сортировку',
    type: 'quiz',
    description: 'Какой алгоритм сортировки лучше?',
    difficulty: 'Элита',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'У тебя массив из 1 000 000 элементов. Какой алгоритм быстрее отсортирует?',
      options: ['Пузырьковая O(n²)', 'Быстрая сортировка O(n log n)', 'Обе одинаковы', 'Линейный поиск'],
      correctIndex: 1,
      explanation: 'QuickSort O(n log n) — около 20 миллионов операций. Пузырёк O(n²) — триллион операций. Для больших данных разница критична!'
    }
  },
  {id:'alg_m2_b1',courseId:'course_alg101',module:'Модуль 2: Сортировка',title:'Блоки: Шаги Bubble Sort',type:'blocks',description:'Расставь шаги пузырьковой сортировки.',difficulty:'Хакер',xpReward:70,currencyReward:25,status:'locked',blocksConfig:{availableBlocks:["Сравнить соседние элементы","Если левый > правого — поменять местами","Повторить для всех пар","Повторять проходы, пока нет обменов"],correctSequence:["Сравнить соседние элементы","Если левый > правого — поменять местами","Повторить для всех пар","Повторять проходы, пока нет обменов"],theme:'robot',successMessage:"Bubble Sort: сравниваем пары, меняем местами, повторяем!"}},

  // ── МОДУЛЬ 3: РЕКУРСИЯ ────────────────────────────────────────────────────
  {
    id: 'alg_m3_t1',
    courseId: 'course_alg101',
    module: 'Модуль 3: Рекурсия',
    title: 'Теория: Рекурсия — функция вызывает себя',
    type: 'theory',
    description: 'Рекурсия — мощный приём: функция решает задачу, вызывая саму себя с меньшими данными.',
    difficulty: 'Легенда',
    xpReward: 90,
    currencyReward: 35,
    status: 'locked',
    theory: `<p style="color:#00ff41;font-weight:bold;margin-bottom:12px">🔄 Рекурсия — зеркало в зеркале!</p>
<p>Рекурсия — это когда функция вызывает <strong>саму себя</strong> для решения уменьшенной версии той же задачи. Звучит безумно, но это один из самых мощных приёмов!</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📦 Пример: факториал</h3>
<p>5! = 5 × 4 × 3 × 2 × 1 = 120</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">factorial</span>(<span style="color:#00f3ff">n</span>)</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">if</span> n &lt;= <span style="color:#fcee0a">1</span> <span style="color:#ff00ff">then</span></p>
  <p style="margin:3px 0 3px 40px"><span style="color:#ff00ff">return</span> <span style="color:#fcee0a">1</span>  <span style="color:#555">-- базовый случай!</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">return</span> n * <span style="color:#fcee0a">factorial</span>(n - <span style="color:#fcee0a">1</span>)  <span style="color:#555">-- рекурсивный вызов</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">⚠️ Два правила рекурсии</h3>
<div style="display:flex;flex-direction:column;gap:8px;margin:12px 0">
  <div style="background:#0d1f0d;border-left:3px solid #00ff41;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#00ff41;font-weight:bold;margin-bottom:2px">1. Базовый случай</p>
    <p style="margin:0;color:#aaa">Условие остановки. Без него — бесконечная рекурсия и крах программы!</p>
  </div>
  <div style="background:#0a0a14;border-left:3px solid #fcee0a;padding:10px 14px;border-radius:0 6px 6px 0">
    <p style="color:#fcee0a;font-weight:bold;margin-bottom:2px">2. Приближение к базе</p>
    <p style="margin:0;color:#aaa">Каждый вызов должен приближать задачу к базовому случаю (n → n-1 → ... → 1).</p>
  </div>
</div>
<div style="background:#1a0a00;border:1px solid #fcee0a;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#fcee0a;font-weight:bold;margin-bottom:4px">🧠 Где используется?</p>
  <p style="margin:0">Обход деревьев, алгоритмы на графах, QuickSort, задачи «разделяй и властвуй». Рекурсия — фундамент сложных алгоритмов.</p>
</div>`
  },
  {
    id: 'alg_m3_q1',
    courseId: 'course_alg101',
    module: 'Модуль 3: Рекурсия',
    title: 'Квиз: Рекурсия',
    type: 'quiz',
    description: 'Проверь понимание рекурсии.',
    difficulty: 'Легенда',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    quizData: {
      question: 'Что произойдёт, если в рекурсивной функции забыть базовый случай?',
      options: [
        'Функция вернёт 0',
        'Функция будет вызывать себя бесконечно и программа упадёт (stack overflow)',
        'Функция выполнится один раз и остановится',
        'Ничего — компилятор исправит ошибку'
      ],
      correctIndex: 1,
      explanation: 'Без базового случая функция вызывает себя снова и снова, пока не закончится память стека (stack). Это называется Stack Overflow — переполнение стека.'
    }
  },
  {id:'alg_m3_q2',courseId:'course_alg101',module:'Модуль 3: Рекурсия',title:'Квиз: Базовый случай',type:'quiz',description:'Квиз',difficulty:'Хакер',xpReward:50,currencyReward:15,status:'locked',quizData:{question:"Что будет если у рекурсии нет базового случая?",options:["Вернёт 0","Бесконечный цикл (stack overflow)","Ничего","Автоостановка"],correctIndex:1,explanation:"Без базового случая рекурсия не остановится — переполнение стека (stack overflow)."}},
  {
    id: 'alg_m3_p1',
    courseId: 'course_alg101',
    module: 'Модуль 3: Рекурсия',
    title: 'Практика: Факториал',
    type: 'terminal',
    description: 'Напиши рекурсивную функцию factorial(n). Выведи factorial(5) — должно быть 120.',
    difficulty: 'Легенда',
    xpReward: 120,
    currencyReward: 50,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'recursion_factorial' },
    initialCode: 'function factorial(n)\n  -- базовый случай: если n <= 1, вернуть 1\n  -- иначе вернуть n * factorial(n - 1)\nend\n\nprint(factorial(5))',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Рекурсивный факториал</h3>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> factorial(n)</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">if</span> n &lt;= 1 <span style="color:#ff00ff">then return</span> 1 <span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">return</span> n * factorial(n - 1)</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>`
  },

  // ── МОДУЛЬ 4: СТЕКИ И ОЧЕРЕДИ ─────────────────────────────────────────────
  {
    id: 'alg_m4_t1',
    courseId: 'course_alg101',
    module: 'Модуль 4: Стеки и очереди',
    title: 'Теория: Стек и очередь',
    type: 'theory',
    description: 'Две фундаментальные структуры данных: LIFO и FIFO.',
    difficulty: 'Хакер',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    theory: `<p style="color:#fcee0a;font-weight:bold;margin-bottom:12px">📚 Стек и Очередь — основа всего!</p>
<p>Эти две структуры данных используются повсюду: от браузера до ОС.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📦 Стек (Stack) — LIFO</h3>
<p><strong>Last In, First Out</strong> — последний вошёл, первый вышел. Как стопка тарелок.</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0;color:#555">-- Операции стека:</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">push</span>(<span style="color:#fcee0a">item</span>)  <span style="color:#555">→ положить сверху</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">pop</span>()       <span style="color:#555">→ снять сверху</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">peek</span>()      <span style="color:#555">→ посмотреть верхний (без удаления)</span></p>
</div>
<div style="background:#0a0a14;border:1px solid #00f3ff;border-radius:8px;padding:14px;margin:12px 0;text-align:center">
  <p style="margin:2px 0;color:#fcee0a;font-weight:bold">| C |  ← top (последний добавленный)</p>
  <p style="margin:2px 0;color:#aaa">| B |</p>
  <p style="margin:2px 0;color:#555">| A |  ← bottom (первый добавленный)</p>
  <p style="margin:2px 0;color:#555">└───┘</p>
</div>
<p><strong>Где используется:</strong> кнопка «Назад» в браузере, Ctrl+Z (отмена), стек вызовов функций.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🚶 Очередь (Queue) — FIFO</h3>
<p><strong>First In, First Out</strong> — первый вошёл, первый вышел. Как очередь в магазине.</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0;color:#555">-- Операции очереди:</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">enqueue</span>(<span style="color:#fcee0a">item</span>) <span style="color:#555">→ добавить в конец</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">dequeue</span>()      <span style="color:#555">→ забрать из начала</span></p>
</div>
<div style="background:#0a0a14;border:1px solid #ff00ff;border-radius:8px;padding:14px;margin:12px 0;text-align:center">
  <p style="margin:2px 0;color:#aaa">front → | A | B | C | ← back</p>
  <p style="margin:2px 0;color:#555">dequeue ←              → enqueue</p>
</div>
<p><strong>Где используется:</strong> очередь задач принтера, обработка запросов сервера, BFS в графах.</p>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Обе структуры — O(1):</p>
  <p style="margin:0">Все операции push/pop/enqueue/dequeue выполняются за константное время O(1). Это делает их невероятно эффективными.</p>
</div>`
  },
  {
    id: 'alg_m4_q1',
    courseId: 'course_alg101',
    module: 'Модуль 4: Стеки и очереди',
    title: 'Квиз: LIFO vs FIFO',
    type: 'quiz',
    description: 'Проверь понимание стеков и очередей.',
    difficulty: 'Хакер',
    xpReward: 60,
    currencyReward: 20,
    status: 'locked',
    quizData: {
      question: 'Ты положил в стек элементы: A, B, C (в таком порядке). В каком порядке они выйдут при pop?',
      options: ['A, B, C', 'C, B, A', 'A, C, B', 'Случайный порядок'],
      correctIndex: 1,
      explanation: 'Стек — LIFO (Last In, First Out). Последний добавленный (C) выходит первым. Порядок: C → B → A.'
    }
  },
  {
    id: 'alg_m4_b1',
    courseId: 'course_alg101',
    module: 'Модуль 4: Стеки и очереди',
    title: 'Блоки: Стек вызовов',
    type: 'blocks',
    description: 'Расставь шаги выполнения стека вызовов в правильном порядке.',
    difficulty: 'Хакер',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['main() вызывает funcA()', 'funcA() вызывает funcB()', 'funcB() завершается → pop', 'funcA() завершается → pop', 'main() завершается → pop'],
      correctSequence: ['main() вызывает funcA()', 'funcA() вызывает funcB()', 'funcB() завершается → pop', 'funcA() завершается → pop', 'main() завершается → pop'],
      theme: 'robot',
      successMessage: 'Стек вызовов работает именно так! LIFO — последний вызов завершается первым.'
    }
  },

  // ── МОДУЛЬ 5: ПОИСК ──────────────────────────────────────────────────────
  {
    id: 'alg_m5_t1',
    courseId: 'course_alg101',
    module: 'Модуль 5: Поиск',
    title: 'Теория: Линейный и бинарный поиск',
    type: 'theory',
    description: 'Два подхода к поиску: перебрать всё или разделять пополам.',
    difficulty: 'Элита',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    theory: `<p style="color:#00ff41;font-weight:bold;margin-bottom:12px">🔍 Как найти иголку в стоге сена?</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🐢 Линейный поиск — O(n)</h3>
<p>Просто перебираем всё по порядку. Просто, но медленно.</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">linearSearch</span>(<span style="color:#00f3ff">arr</span>, <span style="color:#00f3ff">target</span>)</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">for</span> i = 1, <span style="color:#fcee0a">#arr</span> <span style="color:#ff00ff">do</span></p>
  <p style="margin:3px 0 3px 40px"><span style="color:#ff00ff">if</span> arr[i] == target <span style="color:#ff00ff">then return</span> i <span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">return</span> <span style="color:#fcee0a">-1</span></p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🚀 Бинарный поиск — O(log n)</h3>
<p>Работает <strong>только с отсортированными данными</strong>. Каждый шаг отбрасывает половину!</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">function</span> <span style="color:#fcee0a">binarySearch</span>(<span style="color:#00f3ff">arr</span>, <span style="color:#00f3ff">target</span>)</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#00f3ff">local</span> lo, hi = 1, #arr</p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">while</span> lo <= hi <span style="color:#ff00ff">do</span></p>
  <p style="margin:3px 0 3px 40px"><span style="color:#00f3ff">local</span> mid = <span style="color:#ff00ff">math.floor</span>((lo + hi) / 2)</p>
  <p style="margin:3px 0 3px 40px"><span style="color:#ff00ff">if</span> arr[mid] == target <span style="color:#ff00ff">then return</span> mid</p>
  <p style="margin:3px 0 3px 40px"><span style="color:#ff00ff">elseif</span> arr[mid] < target <span style="color:#ff00ff">then</span> lo = mid + 1</p>
  <p style="margin:3px 0 3px 40px"><span style="color:#ff00ff">else</span> hi = mid - 1 <span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">end</span></p>
  <p style="margin:3px 0 3px 20px"><span style="color:#ff00ff">return</span> -1</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">end</span></p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📊 Сравнение</h3>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0;font-size:0.9em">
  <table style="width:100%;color:#e0e0e0">
    <tr style="color:#00f3ff"><td>n</td><td>Линейный</td><td>Бинарный</td></tr>
    <tr><td>100</td><td>100 шагов</td><td style="color:#00ff41">7 шагов</td></tr>
    <tr><td>1 000 000</td><td>1 000 000</td><td style="color:#00ff41">20 шагов!</td></tr>
  </table>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Запомни:</p>
  <p style="margin:0">Бинарный поиск — это «разделяй и властвуй». Но данные ОБЯЗАТЕЛЬНО должны быть отсортированы!</p>
</div>`
  },
  {
    id: 'alg_m5_q1',
    courseId: 'course_alg101',
    module: 'Модуль 5: Поиск',
    title: 'Квиз: Бинарный поиск',
    type: 'quiz',
    description: 'Проверь понимание алгоритмов поиска.',
    difficulty: 'Элита',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'Массив [2, 5, 8, 12, 16, 23, 38, 56, 72, 91]. Ищем 23 бинарным поиском. Сколько сравнений нужно?',
      options: ['1', '2', '3', '6'],
      correctIndex: 2,
      explanation: 'Шаг 1: mid=16 (23>16, идём вправо). Шаг 2: mid=56 (23<56, идём влево). Шаг 3: mid=23 — нашли! Всего 3 сравнения вместо 6 при линейном.'
    }
  },
  {
    id: 'alg_m5_p1',
    courseId: 'course_alg101',
    module: 'Модуль 5: Поиск',
    title: 'Практика: Бинарный поиск',
    type: 'terminal',
    description: 'Напиши функцию binarySearch(arr, target), которая возвращает индекс найденного элемента или -1. Проверь: binarySearch({2,5,8,12,16,23}, 12) должен вернуть 4.',
    difficulty: 'Элита',
    xpReward: 100,
    currencyReward: 35,
    status: 'locked',
    terminalConfig: { fileSystem: '{}', goalCommand: 'alg_binary_search' },
    initialCode: 'function binarySearch(arr, target)\n  local lo = 1\n  local hi = #arr\n  while lo <= hi do\n    local mid = math.floor((lo + hi) / 2)\n    -- если arr[mid] == target, вернуть mid\n    -- если arr[mid] < target, lo = mid + 1\n    -- иначе hi = mid - 1\n  end\n  return -1\nend\n\nprint(binarySearch({2,5,8,12,16,23}, 12))',
    theory: `<h3 style="color:#00f3ff;margin-bottom:8px">Бинарный поиск</h3>
<p>Сравни mid с target и сужай диапазон:</p>
<div style="background:#0a0a14;border-radius:6px;padding:12px;margin:10px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#ff00ff">if</span> arr[mid] == target <span style="color:#ff00ff">then return</span> mid</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">elseif</span> arr[mid] < target <span style="color:#ff00ff">then</span> lo = mid + 1</p>
  <p style="margin:3px 0"><span style="color:#ff00ff">else</span> hi = mid - 1 <span style="color:#ff00ff">end</span></p>
</div>`
  },

  // ── МОДУЛЬ 6: ГРАФЫ ──────────────────────────────────────────────────────
  {
    id: 'alg_m6_t1',
    courseId: 'course_alg101',
    module: 'Модуль 6: Графы',
    title: 'Теория: Графы — сети связей',
    type: 'theory',
    description: 'Узнай, что такое графы, вершины и рёбра — структура данных для связей.',
    difficulty: 'Элита',
    xpReward: 90,
    currencyReward: 30,
    status: 'locked',
    theory: `<p style="color:#ff00ff;font-weight:bold;margin-bottom:12px">🕸️ Графы — сеть из всего!</p>
<p>Граф — это набор <strong>вершин</strong> (узлов) и <strong>рёбер</strong> (связей). Соцсети, карты, интернет — всё это графы.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔵 Вершины и рёбра</h3>
<div style="background:#0a0a14;border:1px solid #00f3ff;border-radius:8px;padding:14px;margin:12px 0;text-align:center;font-family:monospace">
  <p style="margin:2px 0;color:#00f3ff">(A) ——— (B)</p>
  <p style="margin:2px 0;color:#00f3ff"> |  \\      |</p>
  <p style="margin:2px 0;color:#00f3ff"> |    \\    |</p>
  <p style="margin:2px 0;color:#00f3ff">(C) ——— (D)</p>
</div>
<p>Вершины: A, B, C, D. Рёбра: A-B, A-C, A-D, B-D, C-D.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📋 Список смежности</h3>
<p>Самый распространённый способ хранить граф в коде:</p>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0;font-family:monospace">
  <p style="margin:3px 0"><span style="color:#00f3ff">local</span> <span style="color:#fcee0a">graph</span> = {</p>
  <p style="margin:3px 0 3px 20px">A = {<span style="color:#00ff41">"B"</span>, <span style="color:#00ff41">"C"</span>, <span style="color:#00ff41">"D"</span>},</p>
  <p style="margin:3px 0 3px 20px">B = {<span style="color:#00ff41">"A"</span>, <span style="color:#00ff41">"D"</span>},</p>
  <p style="margin:3px 0 3px 20px">C = {<span style="color:#00ff41">"A"</span>, <span style="color:#00ff41">"D"</span>},</p>
  <p style="margin:3px 0 3px 20px">D = {<span style="color:#00ff41">"A"</span>, <span style="color:#00ff41">"B"</span>, <span style="color:#00ff41">"C"</span>}</p>
  <p style="margin:3px 0">}</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🚶 BFS — поиск в ширину</h3>
<p>BFS обходит граф «волнами» — сначала соседи, потом соседи соседей. Использует <strong>очередь</strong>.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🏊 DFS — поиск в глубину</h3>
<p>DFS идёт «вглубь» — по одному пути до конца, потом возвращается. Использует <strong>стек</strong> (или рекурсию).</p>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0;font-size:0.9em">
  <table style="width:100%;color:#e0e0e0">
    <tr style="color:#00f3ff"><td></td><td>BFS</td><td>DFS</td></tr>
    <tr><td style="color:#aaa">Структура</td><td>Очередь</td><td>Стек</td></tr>
    <tr><td style="color:#aaa">Для чего</td><td>Кратчайший путь</td><td>Проверка связности</td></tr>
    <tr><td style="color:#aaa">Сложность</td><td>O(V+E)</td><td>O(V+E)</td></tr>
  </table>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Где графы в реальности:</p>
  <p style="margin:0">Google Maps (маршруты), Facebook (друзья), интернет (серверы), рекомендации Netflix — всё это графы!</p>
</div>`
  },
  {
    id: 'alg_m6_q1',
    courseId: 'course_alg101',
    module: 'Модуль 6: Графы',
    title: 'Квиз: BFS vs DFS',
    type: 'quiz',
    description: 'Какой алгоритм обхода графа подходит?',
    difficulty: 'Элита',
    xpReward: 70,
    currencyReward: 25,
    status: 'locked',
    quizData: {
      question: 'Тебе нужно найти кратчайший путь между двумя серверами в сети. Какой алгоритм лучше использовать?',
      options: ['DFS (поиск в глубину)', 'BFS (поиск в ширину)', 'Бинарный поиск', 'Пузырьковая сортировка'],
      correctIndex: 1,
      explanation: 'BFS гарантирует нахождение кратчайшего пути в невзвешенном графе, потому что обходит вершины «волнами» — сначала расстояние 1, потом 2, и т.д.'
    }
  },
  {
    id: 'alg_m6_b1',
    courseId: 'course_alg101',
    module: 'Модуль 6: Графы',
    title: 'Блоки: BFS обход',
    type: 'blocks',
    description: 'Расставь шаги BFS в правильном порядке.',
    difficulty: 'Элита',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['Добавь стартовую вершину в очередь', 'Пока очередь не пуста:', 'Извлеки вершину из начала очереди', 'Отметь её как посещённую', 'Добавь непосещённых соседей в очередь'],
      correctSequence: ['Добавь стартовую вершину в очередь', 'Пока очередь не пуста:', 'Извлеки вершину из начала очереди', 'Отметь её как посещённую', 'Добавь непосещённых соседей в очередь'],
      theme: 'robot',
      successMessage: 'BFS обходит граф волнами, используя очередь (FIFO)!'
    }
  },

  // ── МОДУЛЬ 7: ХЕШИРОВАНИЕ И ФИНАЛ ────────────────────────────────────────
  {
    id: 'alg_m7_t1',
    courseId: 'course_alg101',
    module: 'Модуль 7: Хеширование и финал',
    title: 'Теория: Хеш-таблицы — O(1) доступ',
    type: 'theory',
    description: 'Как хеш-таблицы дают мгновенный доступ к данным и почему это магия.',
    difficulty: 'Легенда',
    xpReward: 100,
    currencyReward: 40,
    status: 'locked',
    theory: `<p style="color:#fcee0a;font-weight:bold;margin-bottom:12px">⚡ O(1) — мгновенный доступ!</p>
<p>Хеш-таблица — структура данных, где поиск, вставка и удаление работают за <strong>O(1)</strong> в среднем. Это словари Python, объекты JavaScript, таблицы Lua.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">🔧 Как это работает</h3>
<div style="background:#0a0a14;border-radius:8px;padding:16px;margin:12px 0">
  <p style="margin:4px 0"><span style="color:#aaa">1.</span> Ключ <span style="color:#00ff41">"name"</span> → <span style="color:#ff00ff">хеш-функция</span> → число <span style="color:#fcee0a">42</span></p>
  <p style="margin:4px 0"><span style="color:#aaa">2.</span> Число 42 → <span style="color:#ff00ff">индекс массива</span> → ячейка [42]</p>
  <p style="margin:4px 0"><span style="color:#aaa">3.</span> В ячейке хранится значение <span style="color:#00ff41">"Ava"</span></p>
</div>
<p>Хеш-функция преобразует любой ключ в число (индекс). Это позволяет сразу «прыгнуть» к нужной ячейке, минуя перебор.</p>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">💥 Коллизии</h3>
<p>Когда два ключа дают одинаковый хеш — это <strong>коллизия</strong>. Решения:</p>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0;font-size:0.9em">
  <p style="margin:4px 0"><span style="color:#fcee0a">Цепочки (chaining):</span> в ячейке — список пар</p>
  <p style="margin:4px 0"><span style="color:#fcee0a">Открытая адресация:</span> ищем следующую свободную ячейку</p>
</div>
<h3 style="color:#00f3ff;margin-top:20px;margin-bottom:8px">📊 Сравнение сложности</h3>
<div style="background:#0a0a14;border:1px solid #1a1a2e;border-radius:8px;padding:14px;margin:12px 0;font-size:0.9em">
  <table style="width:100%;color:#e0e0e0">
    <tr style="color:#00f3ff"><td>Операция</td><td>Массив</td><td>Хеш-таблица</td></tr>
    <tr><td style="color:#aaa">Поиск</td><td>O(n)</td><td style="color:#00ff41">O(1)</td></tr>
    <tr><td style="color:#aaa">Вставка</td><td>O(n)</td><td style="color:#00ff41">O(1)</td></tr>
    <tr><td style="color:#aaa">Удаление</td><td>O(n)</td><td style="color:#00ff41">O(1)</td></tr>
  </table>
</div>
<div style="background:#0d1f0d;border:1px solid #00ff41;border-radius:8px;padding:12px;margin-top:16px">
  <p style="color:#00ff41;font-weight:bold;margin-bottom:4px">💡 Хеширование в криптографии:</p>
  <p style="margin:0">SHA-256, MD5 — это тоже хеш-функции! Пароли хранятся как хеши, а не открытым текстом. Даже мелкое изменение ввода полностью меняет хеш.</p>
</div>`
  },
  {
    id: 'alg_m7_q1',
    courseId: 'course_alg101',
    module: 'Модуль 7: Хеширование и финал',
    title: 'Квиз: Хеш-таблицы',
    type: 'quiz',
    description: 'Проверь понимание хеширования.',
    difficulty: 'Легенда',
    xpReward: 80,
    currencyReward: 30,
    status: 'locked',
    quizData: {
      question: 'Почему поиск в хеш-таблице O(1), а в обычном массиве O(n)?',
      options: [
        'Хеш-таблица сортирует данные',
        'Хеш-функция сразу вычисляет позицию по ключу',
        'Хеш-таблица меньше по размеру',
        'Хеш-таблица использует бинарный поиск'
      ],
      correctIndex: 1,
      explanation: 'Хеш-функция преобразует ключ в индекс за O(1). Мы сразу «прыгаем» к нужной ячейке, а не перебираем все элементы.'
    }
  },
  {
    id: 'alg_m7_p1',
    courseId: 'course_alg101',
    module: 'Модуль 7: Хеширование и финал',
    title: 'Финал: Выбери структуру данных',
    type: 'blocks',
    description: 'Расставь структуры данных в порядке скорости поиска — от самой медленной к самой быстрой.',
    difficulty: 'Легенда',
    xpReward: 150,
    currencyReward: 60,
    status: 'locked',
    blocksConfig: {
      availableBlocks: ['Несортированный массив O(n)', 'Отсортированный массив + бинарный поиск O(log n)', 'Хеш-таблица O(1)'],
      correctSequence: ['Несортированный массив O(n)', 'Отсортированный массив + бинарный поиск O(log n)', 'Хеш-таблица O(1)'],
      theme: 'robot',
      successMessage: 'Верно! O(n) > O(log n) > O(1). Хеш-таблица — самая быстрая для поиска по ключу!'
    }
  },
];

export const AI_SYSTEM_INSTRUCTION = `Ты - Конструктор, ИИ-ментор.`;
export const COMIC_CHAPTERS: ComicChapter[] = [];
