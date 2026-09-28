
import { Task, StudentProgress, Achievement, CosmeticItem, Course, ComicChapter } from './types';
import { GRADE3_COURSE, GRADE3_TASKS } from './curriculum/grade3';
import { GRADE4_COURSE, GRADE4_TASKS } from './curriculum/grade4';
import { GRADE5_COURSE, GRADE5_TASKS } from './curriculum/grade5';
import { GRADE6_COURSE, GRADE6_TASKS } from './curriculum/grade6';
import { GRADE7_COURSE, GRADE7_TASKS } from './curriculum/grade7';
import { TRAINER_CONFIGS } from './curriculum/trainerConfigs';
import { AVATAR_NAMES, FRAME_NAMES } from './components/ShopAvatar';

export const LEVEL_THRESHOLDS = [0, 100, 300, 600, 1000, 1500, 2200, 3000, 4000, 5500, 7500, 10000];

export const COURSES: Course[] = [
  GRADE3_COURSE,
  GRADE4_COURSE,
  GRADE5_COURSE,
  GRADE6_COURSE,
  GRADE7_COURSE,
];

export const ACHIEVEMENTS: Achievement[] = [
  { id: 'ach_1', title: 'Первый шаг', description: 'Заверши свой первый урок', icon: '🌱', condition: 'complete_1', type: 'cyber' },
  { id: 'ach_typing', title: 'Слепая печать', description: 'Пройди урок на клавиатурном тренажёре', icon: '⌨️', condition: 'typing_done', type: 'cyber' },
  { id: 'ach_binary', title: 'Бинарный код', description: 'Собери число на двоичных лампочках', icon: '01', condition: 'binary_master', type: 'cyber' },
  { id: 'ach_circuit', title: 'Логик', description: 'Собери логическую схему', icon: '⚡', condition: 'circuit_done', type: 'cyber' },
  { id: 'ach_robot', title: 'Пилот робота', description: 'Пройди лабиринт с помощью алгоритма', icon: '🤖', condition: 'grid_done', type: 'cyber' },
  { id: 'ach_terminal', title: 'Повелитель терминала', description: 'Выполни задание в терминале', icon: '📟', condition: 'terminal_done', type: 'cyber' },
  { id: 'ach_web', title: 'Веб-мастер', description: 'Создай свою первую веб-страницу', icon: '🌐', condition: 'html_done', type: 'cyber' },
  { id: 'ach_hanoi', title: 'Мастер рекурсии', description: 'Реши Ханойскую башню', icon: '🗼', condition: 'hanoi_solved', type: 'cyber' },
  { id: 'ach_safety', title: 'Кибер-защитник', description: 'Распознай фишинг или фейк', icon: '🛡️', condition: 'safety_done', type: 'cyber' },
  { id: 'ach_ai', title: 'Тренер нейросети', description: 'Обучи искусственный интеллект', icon: '🧠', condition: 'ai_done', type: 'cyber' },
  { id: 'ach_grade3', title: 'Выпускник 3 класса', description: 'Пройди курс 3 класса полностью', icon: '🥉', condition: 'grade3_complete', type: 'cyber' },
  { id: 'ach_grade4', title: 'Выпускник 4 класса', description: 'Пройди курс 4 класса полностью', icon: '🥈', condition: 'grade4_complete', type: 'cyber' },
  { id: 'ach_grade5', title: 'Выпускник 5 класса', description: 'Пройди курс 5 класса полностью', icon: '🥇', condition: 'grade5_complete', type: 'cyber' },
  { id: 'ach_grade6', title: 'Выпускник 6 класса', description: 'Пройди курс 6 класса полностью', icon: '🏅', condition: 'grade6_complete', type: 'cyber' },
  { id: 'ach_grade7', title: 'Выпускник 7 класса', description: 'Пройди курс 7 класса полностью', icon: '🏆', condition: 'grade7_complete', type: 'cyber' },
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
  ...AVATAR_NAMES.map((name, index): CosmeticItem => ({
    id: `av_${index + 1}`, type: 'avatar', name, value: String(index + 2),
    unlockLevel: Math.min(12, Math.floor(index / 2) + 1),
    cost: index === 0 ? 0 : 100 + index * 75,
  })),
  ...FRAME_NAMES.map((name, index): CosmeticItem => ({
    id: `frame_${index + 1}`, type: 'avatarFrame', name, value: String(index + 1),
    unlockLevel: index + 1, cost: index === 0 ? 0 : 100 + index * 100,
  })),
  { id: 'frame_none', type: 'avatarFrame', name: 'Без рамки', value: '0', unlockLevel: 1, cost: 0 },

  // MASCOT SKINS (value = MascotSkin id in BigCharacter3D)
  { id: 'skin_sparky', type: 'mascotSkin', name: 'Спарки', value: 'sparky', unlockLevel: 1, cost: 0 },
  { id: 'skin_cat', type: 'mascotSkin', name: 'Кибер-Кот', value: 'cat', unlockLevel: 3, cost: 300 },
  { id: 'skin_prof', type: 'mascotSkin', name: 'Профессор', value: 'prof', unlockLevel: 5, cost: 600 },
  { id: 'skin_astro', type: 'mascotSkin', name: 'Астро', value: 'astro', unlockLevel: 7, cost: 900 },
];

export const MOCK_STUDENTS: StudentProgress[] = [
  {
    studentId: 's1',
    name: 'Нео Андерсон',
    tasksCompleted: 12,
    totalTasks: 320,
    totalXP: 4500,
    totalErrors: 3,
    level: 5,
    lastActive: '2 мин назад',
    streak: 3,
    courseProgress: [],
    skills: { loops: 80, variables: 90, logic: 75 },
    totalTabSwitches: 0,
    avgErrorsPerTask: 0
  }
];

const ALL_TASKS: Task[] = [
  ...GRADE3_TASKS,
  ...GRADE4_TASKS,
  ...GRADE5_TASKS,
  ...GRADE6_TASKS,
  ...GRADE7_TASKS,
];

// Приклеиваем авторские конфиги тренажёров к урокам, у которых их не было
export const MOCK_TASKS: Task[] = ALL_TASKS.map(t =>
  TRAINER_CONFIGS[t.id] ? { ...t, ...TRAINER_CONFIGS[t.id] } : t
);

export const AI_SYSTEM_INSTRUCTION = `Ты - Конструктор, ИИ-ментор.`;
export const COMIC_CHAPTERS: ComicChapter[] = [];
