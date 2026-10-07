import {GameButton} from './GameUI';
import React, { useState } from 'react';
import { Folder, FileImage, Music, Lightbulb, ArrowRight, RotateCcw } from 'lucide-react';

export function MentorExperiment({ topic }: { topic?: string }) {
  const [bits, setBits] = useState([false, false, false, false]);
  const [file, setFile] = useState(0);
  const [destination, setDestination] = useState<string>();
  const [repeats, setRepeats] = useState(3);
  const [position, setPosition] = useState(0);
  const [swapped, setSwapped] = useState(false);
  const [tag, setTag] = useState('h1');
  const [color, setColor] = useState('cyan');
  if (topic === 'binary' || topic === 'hex') {
    const weights = [8, 4, 2, 1];
    const sum = weights.reduce((total, weight, i) => total + (bits[i] ? weight : 0), 0);
    return <section className="mentor-experiment" aria-label="Опыт с двоичными лампочками">
      <p className="mentor-experiment-title">Включай лампочки — я покажу, как меняется число.</p>
      <div className="mentor-bits">{weights.map((weight, i) => <GameButton size="compact" key={weight} aria-label={`Лампочка с весом ${weight}`} aria-pressed={bits[i]} onClick={() => setBits(old => old.map((value, j) => i === j ? !value : value))}>
        <Lightbulb size={26}/><strong>{bits[i] ? 1 : 0}</strong><small>вес {weight}</small>
      </GameButton>)}</div>
      <p className="mentor-live-result" aria-live="polite">{weights.filter((_, i) => bits[i]).join(' + ') || 'Все лампочки выключены'} = <strong>{sum}{topic === 'hex' ? ` = ${sum.toString(16).toUpperCase()}₁₆` : ''}</strong></p>
      <p className="mentor-experiment-note">Попробуй собрать {topic === 'hex' ? '12 (C в шестнадцатеричной записи)' : '9'}. {sum === (topic === 'hex' ? 12 : 9) ? 'Получилось: сумма весов совпала с целью!' : 'Складываем только включённые веса.'}</p>
    </section>;
  }
  if (topic === 'files') {
    const samples = [{ name: 'облако.png', folder: 'Рисунки' }, { name: 'дождь.mp3', folder: 'Звуки' }];
    return <section className="mentor-experiment" aria-label="Опыт с файлами">
      <p className="mentor-experiment-title">Выбери файл, затем покажи мне его папку.</p>
      <div className="mentor-choice-row">{samples.map((sample, i) => <GameButton size="compact" key={sample.name} aria-pressed={file === i} onClick={() => { setFile(i); setDestination(undefined); }}>{i === 0 ? <FileImage size={20}/> : <Music size={20}/>} {sample.name}</GameButton>)}</div>
      <div className="mentor-choice-row">{['Рисунки', 'Звуки'].map(folder => <GameButton size="compact" key={folder} onClick={() => setDestination(folder)} aria-pressed={destination === folder}><Folder size={22}/>{folder}</GameButton>)}</div>
      <p className="mentor-live-result" aria-live="polite">{!destination ? 'Посмотри на часть имени после точки.' : destination === samples[file].folder ? `Да! ${samples[file].name} подходит в папку «${destination}».` : `В этой папке храним ${destination === 'Звуки' ? 'звук' : 'рисунки'}. Файл ${samples[file].name} другого вида. Попробуй другую папку.`}</p>
    </section>;
  }
  if (topic === 'loop' || topic === 'pyloop') {
    return <section className="mentor-experiment" aria-label="Опыт с повторением команд">
      <p className="mentor-experiment-title">Одна команда — шаг вправо. Сколько шагов даст повторение?</p>
      <div className="mentor-track" aria-label={`Робот сделал ${position} шагов`}>{Array.from({ length: 5 }, (_, i) => <span key={i}>{position === i ? '🤖' : i === 0 ? '•' : i}</span>)}</div>
      {topic === 'pyloop' && <pre className="mentor-code">{`for i in range(${repeats}):\n    forward()`}</pre>}
      <label className="mentor-repeat-control">Повторить <select value={repeats} onChange={e => { setRepeats(Number(e.target.value)); setPosition(0); }}>{[2, 3, 4].map(n => <option key={n}>{n}</option>)}</select> раза</label>
      <div className="mentor-choice-row"><GameButton size="compact" onClick={() => setPosition(repeats)}><ArrowRight size={18}/> Выполнить повторение</GameButton><GameButton size="compact" aria-label="Сбросить пример" onClick={() => setPosition(0)}><RotateCcw size={18}/></GameButton></div>
      <p className="mentor-live-result" aria-live="polite">{position ? `${repeats} повторения × 1 шаг = ${position} шага. Команда одна, выполняем её несколько раз.` : 'Сначала предскажи, где окажется робот, потом запусти.'}</p>
    </section>;
  }
  if (topic === 'sorting') {
    return <section className="mentor-experiment" aria-label="Опыт со сравнением чисел"><p className="mentor-experiment-title">Сравним соседние числа. Нужно поставить меньшее слева.</p>
      <div className="mentor-number-pair">{(swapped ? [3, 8] : [8, 3]).map(n => <span key={n}>{n}</span>)}</div>
      <GameButton size="compact" className="mentor-experiment-action" onClick={() => setSwapped(!swapped)}>Поменять местами</GameButton>
      <p className="mentor-live-result" aria-live="polite">{swapped ? 'Теперь 3 ≤ 8. Эта пара стоит по возрастанию.' : '8 > 3. Левое число больше правого — поменяем их местами.'}</p></section>;
  }
  if (topic === 'html') {
    return <section className="mentor-experiment" aria-label="Опыт с элементами страницы"><p className="mentor-experiment-title">Текст один, но тег меняет его роль. Нажми на тег.</p>
      <div className="mentor-choice-row">{['h1', 'p'].map(value => <GameButton size="compact" key={value} aria-pressed={tag === value} onClick={() => setTag(value)}><code>&lt;{value}&gt;</code></GameButton>)}</div>
      <div className="mentor-page-preview">{tag === 'h1' ? <strong>Мой первый сайт</strong> : <p>Мой первый сайт</p>}</div>
      <code className="mentor-code">{`<${tag}>Мой первый сайт</${tag}>`}</code>
      <p className="mentor-live-result" aria-live="polite">{tag === 'h1' ? 'h1 обозначает главный заголовок страницы.' : 'p обозначает обычный абзац.'}</p></section>;
  }
  if (topic === 'css') {
    return <section className="mentor-experiment" aria-label="Опыт с оформлением страницы">
      <p className="mentor-experiment-title">Изменим цвет с помощью CSS. Текст и тег остаются прежними.</p>
      <div className="mentor-choice-row">{['cyan', 'orange', 'violet'].map(value => <GameButton size="compact" key={value} aria-pressed={color === value} onClick={() => setColor(value)}>{({cyan: 'Голубой', orange: 'Оранжевый', violet: 'Фиолетовый'})[value]}</GameButton>)}</div>
      <div className="mentor-page-preview"><p style={{color}}>Мой первый сайт</p></div>
      <code className="mentor-code">{`<p style="color: ${color};">Мой первый сайт</p>`}</code>
      <p className="mentor-live-result" aria-live="polite">Свойство color меняет цвет букв. Тег p по-прежнему обозначает абзац.</p>
    </section>;
  }
  return null;
}
