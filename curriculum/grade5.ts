import { Course, Task } from '../types';
import { MODULE1_TASKS } from './grade5/module1';
import { MODULE2_TASKS } from './grade5/module2';
import { MODULE3_TASKS } from './grade5/module3';
import { MODULE4_TASKS } from './grade5/module4';
import { MODULE5_TASKS } from './grade5/module5';
import { MODULE6_TASKS } from './grade5/module6';
import { MODULE7_TASKS } from './grade5/module7';
import { MODULE8_TASKS } from './grade5/module8';
import { MODULE9_TASKS } from './grade5/module9';
import { MODULE10_TASKS } from './grade5/module10';
import { MODULE11_TASKS } from './grade5/module11';
import { MODULE12_TASKS } from './grade5/module12';
import { MODULE13_TASKS } from './grade5/module13';
import { MODULE14_TASKS } from './grade5/module14';

export const GRADE5_COURSE: Course = {
  id: 'course_grade5',
  title: '5 класс · Решаем цифровые задачи',
  description: 'Сравниваем способы решения, работаем с данными и создаём понятные страницы. Проверяем источники и понимаем ограничения моделей.',
  icon: 'Cpu',
  difficulty: 'Beginner',
  status: 'active',
  totalModules: 14,
  color: '#10b981'
};

export const GRADE5_TASKS: Task[] = [
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
