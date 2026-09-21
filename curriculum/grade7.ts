import { Course, Task } from '../types';
import { MODULE1_TASKS } from './grade7/module1';
import { MODULE2_TASKS } from './grade7/module2';
import { MODULE3_TASKS } from './grade7/module3';
import { MODULE4_TASKS } from './grade7/module4';
import { MODULE5_TASKS } from './grade7/module5';
import { MODULE6_TASKS } from './grade7/module6';
import { MODULE7_TASKS } from './grade7/module7';
import { MODULE8_TASKS } from './grade7/module8';
import { MODULE9_TASKS } from './grade7/module9';
import { MODULE10_TASKS } from './grade7/module10';
import { MODULE11_TASKS } from './grade7/module11';

export const GRADE7_COURSE: Course = {
  id: 'course_grade7',
  title: 'ИНФОРМАТИКА 7 КЛАСС: КУРС ЮНОГО ИНЖЕНЕРА',
  description: 'Полная интерактивная программа 7 класса по международным стандартам CSTA Level 2, UK Key Stage 3, ACARA и РК: 11 тематических блоков, ровно 70 уроков (Python, циклы и коллекции, функции и модули, терминал UNIX, JavaScript & DOM, SQL и реляционные базы данных, TCP/IP сети, ML и физические вычисления, цифровая безопасность).',
  icon: 'Terminal',
  difficulty: 'Intermediate',
  status: 'active',
  totalModules: 11,
  color: '#8b5cf6'
};

export const GRADE7_TASKS: Task[] = [
  ...MODULE1_TASKS,
  ...MODULE2_TASKS,
  ...MODULE3_TASKS,
  ...MODULE4_TASKS,
  ...MODULE5_TASKS,
  ...MODULE6_TASKS,
  ...MODULE7_TASKS,
  ...MODULE8_TASKS,
  ...MODULE9_TASKS,
  ...MODULE10_TASKS,
  ...MODULE11_TASKS
];
