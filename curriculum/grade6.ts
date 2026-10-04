import { Course, Task } from '../types';
import { MODULE1_TASKS } from './grade6/module1';
import { MODULE2_TASKS } from './grade6/module2';
import { MODULE3_TASKS } from './grade6/module3';
import { MODULE4_TASKS } from './grade6/module4';
import { MODULE5_TASKS } from './grade6/module5';
import { MODULE6_TASKS } from './grade6/module6';
import { MODULE7_TASKS } from './grade6/module7';
import { MODULE8_TASKS } from './grade6/module8';

export const GRADE6_COURSE: Course = {
  id: 'course_grade6',
  title: '6 класс · От идеи к решению',
  description: 'Управляем файлами, используем формулы и проверяем алгоритмы. Осваиваем команды, оформление страниц и сохранение версий.',
  icon: 'Layers',
  difficulty: 'Intermediate',
  status: 'active',
  totalModules: 8,
  color: '#00f3ff'
};

export const GRADE6_TASKS: Task[] = [
  ...MODULE1_TASKS,
  ...MODULE2_TASKS,
  ...MODULE3_TASKS,
  ...MODULE4_TASKS,
  ...MODULE5_TASKS,
  ...MODULE6_TASKS,
  ...MODULE7_TASKS,
  ...MODULE8_TASKS
];
