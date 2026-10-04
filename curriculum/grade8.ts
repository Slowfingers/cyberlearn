import type {Course,Task} from '../types';
import {OBJECT_TASKS} from './grade8/objects';
import {ALGORITHM_TASKS} from './grade8/algorithms';
import {STRUCTURE_TASKS} from './grade8/structures';
import {SECURITY_TASKS} from './grade8/security';
import {APP_TASKS} from './grade8/apps';
import {DATA_TASKS} from './grade8/data';
import {FINAL_TASKS} from './grade8/final';
export const GRADE8_COURSE: Course = {
 id:'course_grade8',title:'8 класс · Проектируем цифровой мир',
 description:'Создаём объекты и алгоритмы, работаем с графами и SQL, обучаем модель и собираем учебные проекты. 70 миссий: объяснение наставника, отдельный пример и самостоятельная практика.',
 icon:'Cpu',difficulty:'Advanced',status:'active',totalModules:14,color:'#06b6d4',
};
export const GRADE8_TASKS: Task[] = [...OBJECT_TASKS,...ALGORITHM_TASKS,...STRUCTURE_TASKS,...SECURITY_TASKS,...APP_TASKS,...DATA_TASKS,...FINAL_TASKS];
