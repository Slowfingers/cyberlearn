import {PC_TASKS} from './curriculum/pcBuilder';
import {SMART_CITY_TASKS} from './curriculum/smartCity';
import {ARDUINO_TASKS} from './curriculum/arduino';

import { Task, StudentProgress, ComicChapter } from './types';
import { GRADE3_TASKS } from './curriculum/grade3';
import { GRADE4_TASKS } from './curriculum/grade4';
import { GRADE5_TASKS } from './curriculum/grade5';
import { GRADE6_TASKS } from './curriculum/grade6';
import { GRADE7_TASKS } from './curriculum/grade7';
import { GRADE8_TASKS } from './curriculum/grade8';
import { reviseLessons } from './curriculum/pedagogy';
import { TRAINER_CONFIGS } from './curriculum/trainerConfigs';
import { LESSON_DEMOS } from './curriculum/lessonDemos';
import { applyTrainerCopy } from './curriculum/trainerCopy';

export { LEVEL_THRESHOLDS, ACHIEVEMENTS, COSMETICS, SHOP_COSMETICS } from './curriculum/playerCatalog';

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
  ...GRADE8_TASKS,
];

// Приклеиваем авторские конфиги тренажёров к урокам, у которых их не было
export const MOCK_TASKS: Task[] = [...applyTrainerCopy(reviseLessons(ALL_TASKS.map(t =>
  TRAINER_CONFIGS[t.id] ? { ...t, ...TRAINER_CONFIGS[t.id] } : t
)).map(t =>
  // Демо прикрепляются после reviseLessons, чтобы попадать и в курсы с авторскими lesson (8 класс)
  LESSON_DEMOS[t.id] && t.lesson ? { ...t, lesson: { ...t.lesson, demo: LESSON_DEMOS[t.id] } } : t
)), ...ARDUINO_TASKS, ...SMART_CITY_TASKS, ...PC_TASKS];

export { COURSES } from './curriculum/courseCatalog';
export const AI_SYSTEM_INSTRUCTION = `Ты - Конструктор, ИИ-ментор.`;
export const COMIC_CHAPTERS: ComicChapter[] = [];
