import React, { useState } from 'react';
import { FileImage, Music, FileText, ArrowRight, RotateCcw } from 'lucide-react';
import { GameButton } from './GameUI';
import { LessonCharacter as BigCharacter3D, useLessonCharacterName } from './LessonCharacter';
const samples = [
  {name:'Поход', extension:'.jpg', correct:0, reason:'.jpg обозначает формат изображения. Здесь может быть фотография похода.'},
  {name:'Поход', extension:'.mp3', correct:1, reason:'Название осталось тем же, но .mp3 обозначает звуковую запись. По одному слову «Поход» нельзя определить вид файла.'},
  {name:'Песня', extension:'.docx', correct:2, reason:'.docx — формат текстового документа. В нём могут быть слова песни, но само название не превращает документ в звук.'},
];
const types = [{name:'Изображение',Icon:FileImage},{name:'Звуковая запись',Icon:Music},{name:'Текстовый документ',Icon:FileText}];
export function FileTypeLesson({skin,goal,onStart}: {skin?:string;goal:string;onStart:()=>void}) {
  const characterName = useLessonCharacterName();
  const [phase,setPhase]=useState(0);
  const [sample,setSample]=useState(0);
  const [choice,setChoice]=useState<number>();
  const file=samples[sample];
  const correct=choice===file.correct;
  const titles=['Что такое файл','Читаем имя файла','Определяем вид вместе','Твоё задание'];
  const speech=[
    'Рисунок, песню или текст можно сохранить на компьютере. Такая сохранённая работа называется файлом.',
    'У файла есть название и расширение — часть после точки. Например, .jpg подсказывает, что это изображение. Если переименовать файл, его содержимое не изменится.',
    'Посмотри на расширение после точки и выбери вид файла. Если ошибёшься, можно попробовать ещё раз.',
    'Теперь попробуй сам: найди расширение после точки и определи вид файла.',
  ];
  return <article className="academy-theory mentor-lesson archive-lesson file-lesson-pilot">
    <header className="mentor-lesson-header"><div><span>Миссия: читаем цифровые посылки</span><h1>Что подсказывает имя файла</h1></div><span className="archive-step">Шаг {phase+1} из 4</span></header>
    <div className="mentor-classroom"><aside className="mentor-teacher"><BigCharacter3D skin={skin} mood={phase===2&&correct?'celebrate':'idle'}/><strong>{characterName}</strong></aside>
      <div className="mentor-board"><h2 className="archive-stage-title">{titles[phase]}</h2><p className="mentor-bubble mentor-main-speech">{speech[phase]}</p>
        {phase<3&&<section className="archive-scene" aria-label="Разбор имени файла"><div className="archive-parcel"><FileText aria-hidden="true"/><strong>{phase===2?file.name:'Поход'}<mark>{phase===2?file.extension:'.jpg'}</mark></strong><small>{phase===0?'Файл хранит сохранённую работу':'До точки — название. После точки — расширение.'}</small></div>
          {phase===2?<div className="archive-folders file-type-choices">{types.map(({name,Icon},i)=><GameButton size="compact" key={name} disabled={correct} aria-pressed={choice===i} onClick={()=>setChoice(i)}><Icon aria-hidden="true"/>{name}</GameButton>)}</div>:<div className="lesson-worked-items"><div><strong>Поход</strong><small>Как называется работа</small></div><div><strong>.jpg</strong><small>В каком формате сохранена: изображение</small></div></div>}
        </section>}
        {phase===2&&<><p className="archive-sample-count">Учебный файл {sample+1} из {samples.length}</p>{choice!==undefined&&<div className={`mentor-feedback ${correct?'is-correct':''}`} role="status"><strong>{correct?'Верно!':'Посмотри ещё раз на расширение.'}</strong><p>{correct?file.reason:`Ты выбрал «${types[choice].name}». Здесь расширение ${file.extension}. ${file.reason} Выбери подходящий вид файла.`}</p></div>}</>}
        {phase===3&&<div className="mentor-practice-brief"><h2>Что нужно сделать</h2><p>{goal}</p><ol><li>Прочитай имя файла из вопроса.</li><li>Найди расширение после точки.</li><li>Выбери вид файла и нажми «Проверить».</li></ol><p><strong>Готово, когда:</strong> ответ проверен и ты можешь объяснить выбор по расширению.</p></div>}
        <div className="mentor-dialog-actions">{phase>0&&<GameButton size="compact" onClick={()=>{setPhase(phase-1);setChoice(undefined);}}>Вернуться: {titles[phase-1].toLowerCase()}</GameButton>}<GameButton variant="primary" disabled={phase===2&&!correct} onClick={()=>{if(phase===3)onStart();else if(phase===2&&sample<samples.length-1){setSample(sample+1);setChoice(undefined);}else setPhase(phase+1);}}>{phase===0?'Разобрать имя файла':phase===1?'Определить вид самому':phase===2?sample<samples.length-1?'Следующий учебный файл':'Прочитать самостоятельное задание':'Начать задание'}<ArrowRight size={18}/></GameButton></div>
      </div></div><footer className="mentor-lesson-footer"><GameButton size="compact" onClick={()=>{setPhase(0);setSample(0);setChoice(undefined);}}><RotateCcw size={16}/>Повторить объяснение</GameButton>{phase<3&&<GameButton size="compact" onClick={()=>setPhase(3)}>Пропустить обучение</GameButton>}</footer>
  </article>;
}
