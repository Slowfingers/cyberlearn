import type { Task } from '../../types';
export type Check = [prompt: string, correct: string, wrong1: string, wrong2: string, reason: string];
export type Teaching = [explanation: string, example: string, check: Check];
const units: [number, string][] = [
 [2,'01 · Возвращаемся к Python'],[9,'02 · Объекты и мини-игра'],[17,'03 · Рекурсия и алгоритмы'],
 [25,'04 · Структуры данных и графы'],[29,'05 · Схемы, которые считают и помнят'],
 [37,'06 · Криптография и защита'],[41,'07 · Базы данных'],[46,'08 · Приложение задач'],
 [49,'09 · Работа в команде и Git'],[54,'10 · ИИ и инженерия данных'],[56,'11 · Умные устройства'],
 [60,'12 · Итоговый проект'],[66,'13 · Человек в цифровом мире'],[70,'14 · Следующий уровень'],
];
function base(n: number, title: string, teaching: Teaching, goal: string, type: Task['type']): Task {
 const [explanation,example,check] = teaching;
 const [prompt,correct,wrong1,wrong2,reason] = check;
 const feedback = (text: string) => `Ты выбрал «${text}». Проверим правило: ${reason}`;
 const escape = (text:string) => text.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
 return {id:`g8_l${String(n).padStart(2,'0')}`,courseId:'course_grade8',module:units.find(([end])=>n<=end)![1],
 title,type,description:goal,theory:`<h2>${escape(title)}</h2><p>${escape(explanation)}</p><h3>Пример</h3><p>${escape(example)}</p>`,difficulty:'Хакер',xpReward:type==='terminal'?120:80,currencyReward:30,status:'open',
 lesson:{topic:`grade8_${n}`,concept:title,explanation,example,goal,
 steps:type==='terminal'?['Прочитай данные и контракт функции в шаблоне.','Замени строку с пометкой «ТВОЙ КОД» своим решением.','Запусти программу: проверь результат и дополнительные случаи.']:['Прочитай ситуацию и найди важные условия.','Сравни варианты с правилом из объяснения.','Выбери решение и прочитай разбор результата.'],
 success:type==='terminal'?'Программа выдаёт требуемый результат и проходит проверки других входных данных.':'Выбранное решение учитывает все условия ситуации.',
 reflection:prompt,mentorQuestion:{prompt,correct:0,options:[{text:correct,feedback:reason},{text:wrong1,feedback:feedback(wrong1)},{text:wrong2,feedback:feedback(wrong2)}]}}};
}
export function q(n:number,title:string,teaching:Teaching,practice:Check):Task {
 const [question,correct,wrong1,wrong2,explanation] = practice;
 return {...base(n,title,teaching,question,'quiz'),quizData:{question,options:[correct,wrong1,wrong2],correctIndex:0,explanation}};
}
export function p(n:number,title:string,teaching:Teaching,goal:string,starter:string,solution:string,tests:string):Task {
 if(!starter.includes('... # ТВОЙ КОД')) throw Error(`Нет пропуска в уроке ${n}`);
 const task=base(n,title,teaching,goal,'terminal');
 return {...task,initialCode:starter.replace('... # ТВОЙ КОД',solution),terminalTests:tests,
 lesson:{...task.lesson!,starterCode:starter},hint:'Сохрани имена функций и параметры из шаблона. Отступы определяют тело функции. Подсказку к правилу ищи в объяснении и примере.'};
}
export function sql(n:number,title:string,teaching:Teaching,goal:string,fixture:string,solution:string,variants:string[] = []):Task {
 const task=base(n,title,teaching,goal,'terminal');
 return {...task,initialCode:solution,terminalSetup:fixture,terminalSetupVariants:variants,lesson:{...task.lesson!,starterCode:'-- Напиши SQL-запрос по условию. Таблицы уже созданы.\n'},hint:'Используй имена таблиц и полей из условия. Сортировка результата делает порядок строк однозначным.'};
}
