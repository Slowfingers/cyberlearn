import { Task } from '../types';
import { MODULE1_TASKS } from './grade6/module1';
import { MODULE2_TASKS } from './grade6/module2';
import { MODULE3_TASKS } from './grade6/module3';
import { MODULE4_TASKS } from './grade6/module4';
import { MODULE5_TASKS } from './grade6/module5';
import { MODULE6_TASKS } from './grade6/module6';
import { MODULE7_TASKS } from './grade6/module7';
import { MODULE8_TASKS } from './grade6/module8';

import { GRADE6_COURSE } from './courseCatalog';
export { GRADE6_COURSE } from './courseCatalog';

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
