import React, { useState } from 'react';
import { Folder, FileImage, Music, FileText, Shield, ArrowRight, RotateCcw } from 'lucide-react';
import { GameButton } from './GameUI';
import { LessonCharacter as BigCharacter3D, useLessonCharacterName } from './LessonCharacter';

const folders = [
  { name: 'Изображения', icon: FileImage, rule: 'Рисунки и фотографии: .png, .jpg' },
  { name: 'Музыка', icon: Music, rule: 'Записи звука: .mp3, .wav' },
  { name: 'Документы', icon: FileText, rule: 'Текстовые файлы: .txt, .docx' },
  { name: 'Карантин', icon: Shield, rule: 'Незнакомые программы: не запускаем' },
];
const samples = [
  { name: 'Лес', extension: '.png', folder: 0, reason: '.png — формат изображения. Название «Лес» сообщает тему, а расширение подсказывает вид файла.' },
  { name: 'Дождь', extension: '.wav', folder: 1, reason: '.wav — формат звуковой записи. Даже если дождь можно нарисовать, здесь сохранён звук.' },
  { name: 'Подарок', extension: '.exe', folder: 3, reason: '.exe может запускать программу. Красивое название не доказывает безопасность: неизвестную программу откладываем для проверки взрослым.' },
];
export function FileArchiveLesson({ skin, goal, onStart }: { skin?: string; goal: string; onStart: () => void }) {
  const characterName = useLessonCharacterName();
  const [phase, setPhase] = useState(0);
  const [sample, setSample] = useState(0);
  const [choice, setChoice] = useState<number>();
  const [hint, setHint] = useState(false);
  const file = samples[sample];
  const correct = choice === file.folder;
  const reset = () => { setPhase(0); setSample(0); setChoice(undefined); setHint(false); };
  const titles = ['Знакомимся с архивом', 'Разбираем один файл', 'Сортируем вместе', 'Твоё задание'];
  const speech = phase === 0 ? 'В архиве перемешались рисунки, записи и документы. Разложим их по папкам, чтобы потом быстро находить нужное. Папка — как коробка: в неё складывают файлы.'
    : phase === 1 ? 'Посмотри на «Лес.png». «Лес» — название. Часть после точки, png, называется расширением и подсказывает формат. Это изображение: я помещаю его в папку изображений. Переименование файла не превращает картинку в музыку.'
    : phase === 2 ? 'Теперь выбери папку для этой посылки. Файл открывать не нужно. После выбора разберём, почему папка подходит или что стоит изменить.'
    : 'Ты потренировался выбирать папку по виду файла. В самостоятельном задании будут другие посылки. Используй то же правило, а не запоминай расположение кнопок.';
  return <article className="academy-theory mentor-lesson archive-lesson">
    <header className="mentor-lesson-header"><div><span>Миссия: порядок в архиве</span><h1>Раскладываем файлы по папкам</h1></div><span className="archive-step">Шаг {phase + 1} из 4</span></header>
    <div className="mentor-classroom">
      <aside className="mentor-teacher"><BigCharacter3D skin={skin} mood={correct && phase === 2 ? 'celebrate' : 'idle'}/><strong>{characterName}</strong></aside>
      <div className="mentor-board">
        <h2 className="archive-stage-title">{titles[phase]}</h2>
        <p className="mentor-bubble mentor-main-speech">{speech}</p>
        <section className="archive-scene" aria-label="Учебный архив">
          {phase !== 3 && <div className="archive-parcel"><FileText aria-hidden="true"/><strong>{phase === 2 ? file.name : 'Лес'}<mark>{phase === 2 ? file.extension : '.png'}</mark></strong><small>{phase === 0 ? 'Файл — сохранённая работа' : 'Выделенная часть — расширение'}</small></div>}
          <div className="archive-folders">{folders.map(({name, icon: Icon, rule}, index) => phase === 2 ? <GameButton key={name} size="compact" disabled={correct} aria-pressed={choice === index} onClick={() => setChoice(index)}><Icon aria-hidden="true"/><span>{name}</span></GameButton> : <div key={name} className={phase === 1 && index === 0 ? 'archive-folder is-chosen' : 'archive-folder'}><Icon aria-hidden="true"/><strong>{name}</strong>{phase === 0 && <small>{rule}</small>}{phase === 1 && index === 0 && <small>Лес.png сохранён здесь</small>}</div>)}</div>
        </section>
        {phase === 2 && <><p className="archive-sample-count">Учебная посылка {sample + 1} из {samples.length}</p>{choice !== undefined && <div className={`mentor-feedback ${correct ? 'is-correct' : ''}`} role="status"><strong>{correct ? 'Папка подходит!' : 'Эта папка для другого вида файлов.'}</strong><p>{correct ? file.reason : `В папке «${folders[choice].name}»: ${folders[choice].rule.toLowerCase()}. Сравни это с расширением ${file.extension} и выбери другую папку.`}</p></div>}{!correct && <><GameButton size="compact" aria-expanded={hint} onClick={() => setHint(!hint)}>{hint ? 'Скрыть подсказку' : 'Показать подсказку'}</GameButton>{hint && <p role="status">{file.reason}</p>}</>}</>}
        {phase === 3 && <div className="mentor-practice-brief"><h2>Что нужно сделать</h2><p>{goal}</p><ol><li>Выбери файл и прочитай его расширение.</li><li>Нажми подходящую папку или перетащи файл в неё.</li><li>Разложи все посылки. Если ошибся, прочитай объяснение и попробуй другую папку.</li></ol><p><strong>Готово, когда:</strong> все посылки приняты в подходящие папки и тренажёр показывает завершение.</p></div>}
        <div className="mentor-dialog-actions">{phase > 0 && <GameButton size="compact" onClick={() => {setPhase(phase - 1); setChoice(undefined); setHint(false);}}>Вернуться: {titles[phase - 1].toLowerCase()}</GameButton>}<GameButton variant="primary" disabled={phase === 2 && !correct} onClick={() => {if(phase === 3) onStart(); else if(phase === 2 && sample < samples.length - 1) {setSample(sample + 1); setChoice(undefined); setHint(false);} else setPhase(phase + 1);}}>{phase === 0 ? 'Разобрать файл' : phase === 1 ? 'Выбрать папку самому' : phase === 2 ? sample < samples.length - 1 ? 'Следующая учебная посылка' : 'Прочитать самостоятельное задание' : 'Начать задание'}<ArrowRight size={18}/></GameButton></div>
      </div>
    </div>
    <footer className="mentor-lesson-footer"><GameButton size="compact" onClick={reset}><RotateCcw size={16}/>Повторить объяснение</GameButton>{phase < 3 && <GameButton size="compact" onClick={() => setPhase(3)}>Пропустить обучение</GameButton>}</footer>
  </article>;
}
