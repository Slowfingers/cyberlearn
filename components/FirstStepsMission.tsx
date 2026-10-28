import { taskLessonBlocks } from '../utils/lessonBlocks';
import { useLessonCheckpoint } from '../hooks/useLessonCheckpoint';
import React, { useState } from 'react';
import { ArrowRight, Folder, FileText, RotateCcw } from 'lucide-react';
import { GameButton } from './GameUI';
import { LessonCharacter as BigCharacter3D, useLessonCharacterName } from './LessonCharacter';
import { LessonWorkedExample } from './LessonWorkedExample';
import type { Task } from '../types';

const missions: Record<string, { title: string; brief: string; action: string }> = {
  g3_m1_l3: {title:'Найди документ в архиве',brief:'Документ лежит внутри нескольких папок. Пройдём путь, не перепрыгивая через папки.',action:'Открыть учебный архив'},
  g3_m1_l4: {title:'Передай роботу точный сигнал',brief:'Робот ждёт текст без ошибок. Научимся повторять образец и исправлять одну неверную букву.',action:'Попробовать печатать'},
  g3_m1_l5: {title:'Отправь понятное сообщение',brief:'Большие буквы, пробелы и знаки помогают прочитать сообщение. Потренируемся сохранять их.',action:'Напечатать учебное сообщение'},
  g3_m1_l6: {title:'Проверь указатель на игру',brief:'На рабочем столе есть ярлык игры. Разберём, что исчезнет, если убрать только указатель.',action:'Проверить на учебном рабочем столе'},
  g3_m1_l7: {title:'Отличи документ от картинки',brief:'Один план можно сохранить текстом или картинкой. Узнаем, как отличить эти файлы по формату.',action:'Определить формат учебного файла'},
};
export function FirstStepsMission({task,skin,goal,onStart}: {task:Task;skin?:string;goal:string;onStart:()=>void}) {
  const characterName = useLessonCharacterName();
  const checkpoint=useLessonCheckpoint(task);
  const {phase,idea,path,typed,removed,choice}=checkpoint.state;
  const setPhase=(phase:number)=>checkpoint.setState(old=>({...old,phase}));
  const setIdea=(idea:number)=>checkpoint.setState(old=>({...old,idea}));
  const setPath=(path:number)=>checkpoint.setState(old=>({...old,path}));
  const setTyped=(typed:string)=>checkpoint.setState(old=>({...old,typed}));
  const setRemoved=(removed:boolean)=>checkpoint.setState(old=>({...old,removed}));
  const setChoice=(choice?:string)=>checkpoint.setState(old=>({...old,choice:choice??null}));
  const [feedback,setFeedback]=useState('');
  const mission=missions[task.id];
  const paragraphs=taskLessonBlocks(task).blocks.filter(block=>block.kind==='explanation').map(block=>block.text);
  const isTyping=['g3_m1_l4','g3_m1_l5'].includes(task.id);
  const target=task.id==='g3_m1_l4'?'ва':'Да!';
  const completed=task.id==='g3_m1_l3'?path===3:isTyping?typed===target:task.id==='g3_m1_l6'?removed:choice==='document';
  const titles=['Твоя миссия','Разбираемся с наставником','Учебная попытка','Самостоятельное задание'];
  const reset=()=>{setPhase(0);setIdea(0);setPath(0);setTyped('');setRemoved(false);setChoice(undefined);setFeedback('');};
  const open=(index:number)=>{if(index===path){setPath(path+1);setFeedback(index===2?'Документ найден: сначала открыли «Дом», затем «Праздник», затем файл.':'Верно. Теперь мы внутри этой папки. Посмотри на следующий объект пути.');}else setFeedback(index>path?'Этот объект находится глубже. Сначала открой текущую папку пути.':'Эту папку уже прошли. Выбери следующий объект пути.');};
  if(!checkpoint.loaded) return <p role="status">Восстанавливаем шаг урока…</p>;
  return <article className="academy-theory mentor-lesson archive-lesson">
    <header className="mentor-lesson-header"><div><span>Миссия: {mission.title}</span><h1>{task.lesson?.concept??task.title}</h1></div><span className="archive-step">Шаг {phase+1} из 4</span></header>
    <div className="mentor-classroom"><aside className="mentor-teacher"><BigCharacter3D skin={skin} mood={phase===2&&completed?'celebrate':'idle'}/><strong>{characterName}</strong></aside><div className="mentor-board">
      <h2 className="archive-stage-title">{titles[phase]}</h2>
      <p className="mentor-bubble mentor-main-speech">{phase===0?mission.brief:phase===1?paragraphs[idea]:phase===2?task.id==='g3_m1_l3'?'Пройди путь «Дом → Праздник → Приглашение.docx». Нажимай объекты по порядку.':isTyping?`Нажми в поле и напечатай «${target}» на настоящей клавиатуре. Если ошибся, исправь букву клавишей Backspace.`:task.id==='g3_m1_l6'?'Уберём только ярлык. Посмотри, останется ли сама игра на диске.':'Определи вид файла «План_Праздника.docx». Обрати внимание на расширение.':'Теперь применяй правило в самостоятельном задании. Учебные попытки не засчитывались как прохождение.'}</p>
      {phase===0&&<LessonWorkedExample taskId={task.id}/>}
      {phase===1&&<><p className="archive-sample-count">Часть объяснения {idea+1} из {paragraphs.length}</p>{idea===paragraphs.length-1&&<><p className="mentor-example-text">{task.lesson?.example}</p><LessonWorkedExample taskId={task.id}/></>}</>}
      {phase===2&&<section className="archive-scene" aria-label="Учебная попытка">
        {task.id==='g3_m1_l3'&&<><p>Ты {path===0?'перед папкой «Дом»':path===1?'в папке «Дом»':path===2?'в папке «Праздник»':'открыл документ'}.</p><div className="archive-path">{['Дом','Праздник','Приглашение.docx'].map((name,i)=><GameButton className="archive-path-button" size="compact" key={name} disabled={path===3} onClick={()=>open(i)}>{i<2?<Folder aria-hidden="true"/>:<FileText aria-hidden="true"/>}<span>{name}{i<path?' ✓':''}</span></GameButton>)}</div></>}
        {isTyping&&<><label className="mission-typing-label" htmlFor={`practice-${task.id}`}>Образец: <strong>{target}</strong></label><input id={`practice-${task.id}`} className="mission-typing-input" value={typed} onChange={e=>setTyped(e.target.value)} autoComplete="off" spellCheck={false} aria-describedby={`typing-feedback-${task.id}`}/><p id={`typing-feedback-${task.id}`} role="status">{!typed?'Включи русскую раскладку и начни печатать.':completed?'Точно совпало! Все буквы и знаки на месте.':target.startsWith(typed)?'Пока всё верно. Введи следующий символ.':'Есть отличие от образца. Сравни символы, удали неверный символ Backspace и исправь.'}</p></>}
        {task.id==='g3_m1_l6'&&<><div className="lesson-worked-items"><div><strong>Рабочий стол</strong><p>{removed?'Ярлык убран':'↗ Ярлык игры'}</p>{!removed&&<GameButton size="compact" onClick={()=>{setRemoved(true);setFeedback('Ярлык исчез, игра осталась. Указатель и программа хранятся отдельно.');}}>Убрать только ярлык</GameButton>}</div><div><strong>Диск компьютера</strong><p>🎮 Сама игра остаётся здесь</p></div></div></>}
        {task.id==='g3_m1_l7'&&<><div className="archive-parcel"><FileText aria-hidden="true"/><strong>План_Праздника<mark>.docx</mark></strong></div><div className="lesson-worked-items">{[{id:'image',text:'Изображение'},{id:'document',text:'Текстовый документ'},{id:'sound',text:'Звуковая запись'}].map(item=><GameButton size="compact" key={item.id} disabled={completed} aria-pressed={choice===item.id} onClick={()=>{setChoice(item.id);setFeedback(item.id==='document'?'.docx — формат документа. Он может хранить текст и оформление.':`Расширение .docx обозначает текстовый документ. Название «План» само по себе не определяет формат. Попробуй другой вариант.`);}}>{item.text}</GameButton>)}</div></>}
        {feedback&&<p className={`mentor-feedback ${completed?'is-correct':''}`} role="status">{feedback}</p>}
      </section>}
      {phase===3&&<div className="mentor-practice-brief"><h2>Что нужно сделать</h2><p>{goal}</p><ol>{task.lesson?.steps.map(step=><li key={step}>{step}</li>)}</ol><p><strong>Готово, когда:</strong> {task.lesson?.success}</p></div>}
      <div className="mentor-dialog-actions">{phase>0&&<GameButton size="compact" onClick={()=>setPhase(phase-1)}>Вернуться: {titles[phase-1].toLowerCase()}</GameButton>}<GameButton variant="primary" disabled={phase===2&&!completed} onClick={()=>{if(phase===3)onStart();else if(phase===1&&idea<paragraphs.length-1)setIdea(idea+1);else setPhase(phase+1);}}>{phase===0?'Начать объяснение':phase===1?idea<paragraphs.length-1?'Следующая часть объяснения':mission.action:phase===2?'Прочитать самостоятельное задание':'Начать задание'}<ArrowRight size={18}/></GameButton></div>
    </div></div><p className="lesson-checkpoint-status" role="status">{checkpoint.status}</p>{(checkpoint.status.includes("не сохранён")||checkpoint.status.includes("недоступно"))&&<GameButton size="compact" onClick={checkpoint.retry}>Повторить сохранение</GameButton>}<footer className="mentor-lesson-footer"><GameButton size="compact" onClick={reset}><RotateCcw size={16}/>Повторить объяснение</GameButton>{phase<3&&<GameButton size="compact" onClick={()=>setPhase(3)}>Пропустить обучение</GameButton>}</footer>
  </article>;
}
