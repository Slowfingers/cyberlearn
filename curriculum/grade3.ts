import { Task } from '../types';
import { MODULE1_TASKS } from './grade3/module1';
import { MODULE2_TASKS } from './grade3/module2';
import { MODULE3_TASKS } from './grade3/module3';
import { MODULE4_TASKS } from './grade3/module4';
import { MODULE5_TASKS } from './grade3/module5';
import { MODULE6_TASKS } from './grade3/module6';
import { MODULE7_TASKS } from './grade3/module7';
import { MODULE8_TASKS } from './grade3/module8';
import { MODULE9_TASKS } from './grade3/module9';
import { MODULE10_TASKS } from './grade3/module10';

import { GRADE3_COURSE } from './courseCatalog';
export { GRADE3_COURSE } from './courseCatalog';

export const GRADE3_TASKS: Task[] = [
  ...MODULE1_TASKS,
  ...MODULE2_TASKS,
  ...MODULE3_TASKS,
  ...MODULE4_TASKS,
  ...MODULE5_TASKS,
  ...MODULE6_TASKS,
  ...MODULE7_TASKS,
  ...MODULE8_TASKS,
  ...MODULE9_TASKS,
  ...MODULE10_TASKS
];
