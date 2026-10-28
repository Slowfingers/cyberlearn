import React, { useState } from 'react';
import { ArrowRight, RotateCcw, Cpu, Keyboard, Monitor, Lightbulb, Save, Power } from 'lucide-react';
import { GameButton } from './GameUI';
import { LessonCharacter as BigCharacter3D, useLessonCharacterName } from './LessonCharacter';
import type { Task } from '../types';

const bridges = [
  'Ты уже научился работать с файлами. Теперь заглянем внутрь компьютера: кто выполняет команды, когда мы открываем программу?',
  'Процессор выполняет команды. Но где лежат данные открытой работы, а где остаётся сохранённый файл? Проверим на рассказе.',
  'Мы различаем вычисление и хранение. Теперь проследим, как данные попадают в компьютер и как результат возвращается человеку.',
  'Клавиатура передаёт данные компьютеру. Для следующего шага познакомимся с двумя значениями бита: 0 и 1.',
  'У одного бита два значения. Соединим несколько битов: каждый разряд получит свой вес, а число будет суммой включённых весов.',
  'Мы уже видели отдельные биты. Теперь соберём их в группы: восемь битов называют одним байтом.',
  'Мы умеем складывать веса включённых разрядов. Теперь выясним, при каком выборе получится самое большое число.',
];
const prompts = [
  'Калькулятор получил 7 + 2. Выбери деталь, которая выполнит вычисление.',
  'Рассказ сохранён, затем в открытой работе добавили новую строку. Выключи учебный компьютер и сравни версии.',
  'Игрок нажал стрелку, герой передвинулся, прозвучал шаг. Что передаёт данные В компьютер?',
  'Наше правило: выключенная лампа — 0, включённая — 1. Включи лампу и прочитай значение.',
  'Собери учебное число 6. Включай и выключай лампы, складывая их веса.',
  'Два байта — две группы по восемь битов. Посчитай общее количество битов.',
  'У трёх разрядов веса 4, 2 и 1. Собери самое большое число, которое позволяют эти веса.',
];
function ComputerActivity({lesson,onReady}: {lesson:number;onReady:(ready:boolean)=>void}) {
  const [answer,setAnswer]=useState<number>();
  const [off,setOff]=useState(false);
  const [bits,setBits]=useState([false,false,false,false]);
  const [feedback,setFeedback]=useState('');
  const weights=lesson===7?[4,2,1]:[8,4,2,1];
  const sum=weights.reduce((total,weight,i)=>total+(bits[i]?weight:0),0);
  const choices=lesson===1?['Клавиатура','Процессор','Экран']:lesson===3?['Нажатие на клавиатуре','Картинка на экране','Звук из колонок']:['10 битов','16 битов','2 бита'];
  const select=(i:number)=>{setAnswer(i);const correct=i===(lesson===3?0:1);setFeedback(correct?lesson===1?'Процессор выполняет вычисление: 7 + 2 = 9. Клавиатура вводит числа, экран показывает ответ.':lesson===3?'Нажатие сообщает компьютеру команду: это ввод. Картинка и звук идут к человеку: это вывод.':'В каждой группе восемь битов. 8 + 8 = 16 битов. Два — число групп, а не число битов.':lesson===1?'Клавиатура передаёт числа, экран показывает результат. Вычисление выполняет другая деталь. Попробуй снова.':lesson===3?'Это результат, который компьютер передаёт человеку. Найди действие, которым человек сообщает команду компьютеру.':'Посчитай обе группы по восемь. Байты обозначают группы, биты — элементы внутри них.');onReady(correct);};
  const toggle=(index:number)=>{const next=bits.map((value,i)=>i===index?!value:value);setBits(next);const value=weights.reduce((total,weight,i)=>total+(next[i]?weight:0),0);onReady(lesson===4?next[0]:value===(lesson===7?7:6));};
  return <section className="archive-scene" aria-label="Учебная лаборатория компьютера"><p>{prompts[lesson-1]}</p>
    {[1,3,6].includes(lesson)&&<>
      {lesson===1&&<div className="computer-flow"><span><Keyboard aria-hidden="true"/>Ввод: 7 + 2</span><ArrowRight aria-hidden="true"/><span><Cpu aria-hidden="true"/>Выполнение команды</span><ArrowRight aria-hidden="true"/><span><Monitor aria-hidden="true"/>Показ результата</span></div>}
      {lesson===3&&<div className="computer-flow"><span>Человек → компьютер</span><span>Компьютер → человек</span></div>}
      {lesson===6&&<div className="byte-groups">{[1,2].map(group=><div key={group}><strong>Байт {group}</strong><div>{Array.from({length:8},(_,i)=><span key={i}>бит</span>)}</div></div>)}</div>}
      <div className="lesson-worked-items">{choices.map((choice,i)=><GameButton size="compact" key={choice} aria-pressed={answer===i} onClick={()=>select(i)}>{choice}</GameButton>)}</div>
    </>}
    {lesson===2&&<><div className="lesson-worked-items"><div><strong>Накопитель</strong><Save aria-hidden="true"/><p>Сохранено: «Мой рассказ»</p></div><div><strong>ОЗУ: текущая работа</strong><p>{off?'После выключения данные ОЗУ не сохраняются':'«Мой рассказ. Новая строка!»'}</p></div></div><GameButton size="compact" disabled={off} onClick={()=>{setOff(true);setFeedback('Сохранённый рассказ остался на накопителе. Новая несохранённая строка потерялась в этой модели. Перед выключением сохраняй изменения: автосохранение есть не везде.');onReady(true);}}><Power size={18}/>Выключить учебный компьютер</GameButton></>}
    {[4,5,7].includes(lesson)&&<><div className="mentor-bits">{(lesson===4?[1]:weights).map((weight,i)=><GameButton size="compact" key={weight} aria-pressed={bits[i]} onClick={()=>toggle(i)} aria-label={lesson===4?'Переключить лампу':`Переключить разряд с весом ${weight}`}><Lightbulb size={26}/><strong>{bits[i]?'1':'0'}</strong><small>{lesson===4?bits[i]?'включено':'выключено':`вес ${weight}`}</small></GameButton>)}</div><p role="status">{lesson===4?`Лампа ${bits[0]?'включена: записываем 1':'выключена: записываем 0'}. Это модель бита, а не устройство настоящей памяти.`:`${weights.filter((_,i)=>bits[i]).join(' + ')||'Ни один вес не включён'} = ${sum}. ${sum===(lesson===7?7:6)?lesson===7?'Все веса включены: 4 + 2 + 1 = 7. Выключение любого разряда уменьшит сумму.':'Получилось 6. Две лампы дают число 6, потому что складываем веса 4 и 2.':'Складывай веса, а не количество ламп.'}`}</p></>}
    {feedback&&<p className="mentor-feedback" role="status">{feedback}</p>}
  </section>;
}
export function ComputerMissionLesson({task,skin,goal,onStart}: {task:Task;skin?:string;goal:string;onStart:()=>void}) {
  const characterName = useLessonCharacterName();
  const lesson=Number(task.id.slice(-1));
  const [phase,setPhase]=useState(0);
  const [idea,setIdea]=useState(0);
  const [ready,setReady]=useState(false);
  const [attempt,setAttempt]=useState(0);
  const paragraphs=(task.lesson?.explanation??'').split(/\n\s*\n/).filter(Boolean);
  const stages=['Связь с прошлым уроком','Разбор с наставником','Учебная лаборатория','Самостоятельное задание'];
  return <article className="academy-theory mentor-lesson archive-lesson"><header className="mentor-lesson-header"><div><span>Лаборатория: как работает компьютер</span><h1>{task.lesson?.concept??task.title}</h1></div><span className="archive-step">Шаг {phase+1} из 4</span></header>
    <div className="mentor-classroom"><aside className="mentor-teacher"><BigCharacter3D skin={skin} mood={phase===2&&ready?'celebrate':'idle'}/><strong>{characterName}</strong></aside><div className="mentor-board"><h2 className="archive-stage-title">{stages[phase]}</h2>
      <p className="mentor-bubble mentor-main-speech">{phase===0?bridges[lesson-1]:phase===1?paragraphs[idea]:phase===2?'Попробуй в учебной лаборатории. Ошибку можно исправить; после действия сравни результат с правилом.':'Теперь реши новую задачу с тем же правилом. Учебная попытка не засчитывалась как прохождение.'}</p>
      {phase===1&&<><p className="archive-sample-count">Часть объяснения {idea+1} из {paragraphs.length}</p>{idea===paragraphs.length-1&&<div className="mentor-practice-brief"><h2>Разобранный пример</h2><p>{task.lesson?.example}</p></div>}</>}
      {phase===2&&<ComputerActivity key={attempt} lesson={lesson} onReady={setReady}/>}
      {phase===3&&<div className="mentor-practice-brief"><h2>Что нужно сделать</h2><p>{goal}</p><ol>{task.lesson?.steps.map(step=><li key={step}>{step}</li>)}</ol><p><strong>Готово, когда:</strong> {task.lesson?.success}</p></div>}
      <div className="mentor-dialog-actions">{phase>0&&<GameButton size="compact" onClick={()=>setPhase(phase-1)}>Вернуться: {stages[phase-1].toLowerCase()}</GameButton>}<GameButton variant="primary" disabled={phase===2&&!ready} onClick={()=>{if(phase===3)onStart();else if(phase===1&&idea<paragraphs.length-1)setIdea(idea+1);else {if(phase===1)setReady(false);setPhase(phase+1);}}}>{phase===0?'Начать объяснение':phase===1?idea<paragraphs.length-1?'Следующая часть объяснения':'Открыть учебную лабораторию':phase===2?'Прочитать самостоятельное задание':'Начать задание'}<ArrowRight size={18}/></GameButton></div>
    </div></div><footer className="mentor-lesson-footer"><GameButton size="compact" onClick={()=>{setPhase(0);setIdea(0);setReady(false);setAttempt(attempt+1);}}><RotateCcw size={16}/>Повторить обучение</GameButton>{phase<3&&<GameButton size="compact" onClick={()=>setPhase(3)}>Пропустить обучение</GameButton>}</footer>
  </article>;
}
