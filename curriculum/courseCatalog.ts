import type { Course } from '../types';

export const GRADE3_COURSE: Course = {
  id: 'course_grade3',
  title: '3 класс · Первые шаги с компьютером',
  description: 'Учимся находить файлы, давать команды роботу, считать в таблице и безопасно общаться. Сначала понятный пример, затем короткая самостоятельная практика.',
  icon: 'Sparkles',
  difficulty: 'Beginner',
  status: 'active',
  totalModules: 10,
  color: '#fcee0a' // neonYellow
};

export const GRADE4_COURSE: Course = {
  id: 'course_grade4',
  title: '4 класс · Думаем и проверяем',
  description: 'От простых команд переходим к повторениям, логике и данным. Собираем страницы и проверяем решения на примерах.',
  icon: 'Terminal',
  difficulty: 'Beginner',
  status: 'active',
  totalModules: 14,
  color: '#00f0ff' // neonCyan
};

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

export const GRADE7_COURSE: Course = {
  id: 'course_grade7',
  title: '7 класс · Пишем и проверяем программы',
  description: 'Начинаем с Python, затем работаем с таблицами, SQL и страницами. Дополняем программы, проверяем результат и обсуждаем безопасное использование технологий.',
  icon: 'Terminal',
  difficulty: 'Intermediate',
  status: 'active',
  totalModules: 11,
  color: '#8b5cf6'
};

export const GRADE8_COURSE: Course = {
 id:'course_grade8',title:'8 класс · Проектируем цифровой мир',
 description:'Создаём объекты и алгоритмы, работаем с графами и SQL, обучаем модель и собираем учебные проекты. 70 миссий: объяснение наставника, отдельный пример и самостоятельная практика.',
 icon:'Cpu',difficulty:'Advanced',status:'active',totalModules:14,color:'#06b6d4',
};

export const ARDUINO_COURSE:Course={id:'course_arduino',title:'Arduino: живая электроника',description:'11 интерактивных 3D-уроков: свет, кнопки, датчики, звук и движение. Собери свой парковочный датчик.',icon:'Cpu',difficulty:'Beginner',status:'active',totalModules:4,color:'#32c6bd'};

export const SMART_CITY_COURSE:Course={id:'course_smart_city',title:'Умный город: мастерская Arduino',description:'Собери соединения, исправь программу и оживи 3D-город. Первые две миссии: светофор и автоматический шлагбаум.',icon:'Cpu',difficulty:'Intermediate',status:'active',totalModules:1,color:'#a887ff'};

export const PC_COURSE:Course={id:'course_pc_builder',title:'Собери свой ПК',description:'3D-конструктор компьютера: выбери совместимые детали, подключи питание и запусти свою сборку. 6 мастерских.',icon:'Cpu',difficulty:'Beginner',status:'active',totalModules:3,color:'#a68bff'};

// This index stays lightweight; pedagogy.check verifies counts against actual missions.
const moduleCounts = [7, 7, 7, 8, 9, 14, 4, 1, 3];
export const COURSES: Course[] = [GRADE3_COURSE, GRADE4_COURSE, GRADE5_COURSE, GRADE6_COURSE, GRADE7_COURSE, GRADE8_COURSE, ARDUINO_COURSE, SMART_CITY_COURSE, PC_COURSE].map((course, i) => ({ ...course, totalModules: moduleCounts[i] }));
