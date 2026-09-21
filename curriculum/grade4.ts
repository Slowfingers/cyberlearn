import { Course, Task } from '../types';
import { MODULE1_TASKS } from './grade4/module1';
import { MODULE2_TASKS } from './grade4/module2';
import { MODULE3_TASKS } from './grade4/module3';
import { MODULE4_TASKS } from './grade4/module4';
import { MODULE5_TASKS } from './grade4/module5';
import { MODULE6_TASKS } from './grade4/module6';
import { MODULE7_TASKS } from './grade4/module7';
import { MODULE8_TASKS } from './grade4/module8';
import { MODULE9_TASKS } from './grade4/module9';
import { MODULE10_TASKS } from './grade4/module10';
import { MODULE11_TASKS } from './grade4/module11';
import { MODULE12_TASKS } from './grade4/module12';
import { MODULE13_TASKS } from './grade4/module13';
import { MODULE14_TASKS } from './grade4/module14';

export const GRADE4_COURSE: Course = {
  id: 'course_grade4',
  title: '4 КЛАСС: Кибер-Инженерия и Веб',
  description: 'Полный курс для 4 класса: 14 модулей и 70 уроков! Алгоритмы, двоичный код, списки, HTML, интернет-сети, кибербезопасность, ИИ и цифровое искусство.',
  icon: 'Terminal',
  difficulty: 'Beginner',
  status: 'active',
  totalModules: 14,
  color: '#00f0ff' // neonCyan
};

export const GRADE4_TASKS: Task[] = [
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
  ...MODULE11_TASKS,
  ...MODULE12_TASKS,
  ...MODULE13_TASKS,
  ...MODULE14_TASKS
];
