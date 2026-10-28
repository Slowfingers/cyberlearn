import {GameButton} from './GameUI';
import React, { useState } from 'react';
import { Task } from '../types';
import { ArrowRight, ChevronLeft, Check, RotateCcw } from 'lucide-react';

interface Props { task: Task }

// Пошаговый разбор примера кода: строки подсвечиваются, наставник комментирует каждый шаг.
export const LessonDemo: React.FC<Props> = ({ task }) => {
  const demo = task.lesson?.demo;
  const [stepIdx, setStepIdx] = useState(0);
  const [answer, setAnswer] = useState<number>();
  if (!demo) return null;
  const lines = demo.code.split('\n');
  const step = demo.steps[stepIdx];
  const finished = stepIdx >= demo.steps.length - 1;
  const correct = demo.predict && answer !== undefined && answer === demo.predict.correct;
  // Stable permutation prevents the correct choice always occupying the same position.
  const shift = [...task.id].reduce((sum, letter) => sum + letter.charCodeAt(0), 0);
  const order = demo.predict ? demo.predict.options.map((_, i) => (i + shift) % demo.predict!.options.length) : [];
  return <section className="lesson-demo" aria-label="Интерактивный разбор примера">
    <pre className="lesson-demo-code" aria-label={`Код на языке ${demo.language}`}><code>{lines.map((text, i) => <span key={i} className={`lesson-demo-line ${step.line === i + 1 ? 'is-current' : ''}`}><b>{i + 1}</b>{text || ' '}</span>)}</code></pre>
    <div className="lesson-demo-controls">
      <GameButton size="compact" disabled={stepIdx === 0} onClick={() => setStepIdx(stepIdx - 1)} aria-label="Предыдущий шаг"><ChevronLeft size={17}/> Назад</GameButton>
      <span className="lesson-demo-counter">Шаг {stepIdx + 1} из {demo.steps.length}</span>
      <GameButton size="compact" disabled={finished} onClick={() => setStepIdx(stepIdx + 1)} aria-label="Следующий шаг">Шаг <ArrowRight size={17}/></GameButton>
    </div>
    <p className="lesson-demo-say" aria-live="polite">{step.say}</p>
    {step.vars && Object.keys(step.vars).length > 0 && <table className="lesson-demo-vars"><caption>Переменные сейчас</caption><tbody>{Object.entries(step.vars).map(([name, value]) => <tr key={name}><th>{name}</th><td>{value}</td></tr>)}</tbody></table>}
    {finished && demo.output !== undefined && <div className="lesson-demo-output"><strong>Вывод программы</strong><pre>{demo.output}</pre></div>}
    {finished && demo.predict && <div className="lesson-demo-predict">
      <strong>Угадай сам</strong>
      <p>{demo.predict.prompt}</p>
      <div className="lesson-demo-options">{order.map(index => <GameButton size="compact" key={index} disabled={!!correct} aria-pressed={answer === index}
        className={answer === index ? correct ? 'is-correct' : 'is-retry' : ''}
        onClick={() => setAnswer(index)}>{demo.predict!.options[index]}{answer === index && correct && <Check size={18}/>}</GameButton>)}</div>
      {answer !== undefined && <div className={`lesson-demo-verdict ${correct ? 'is-correct' : 'is-wrong'}`} role="status"><strong>{correct ? 'Верно!' : 'Не совсем.'}</strong><p>{demo.predict.why}</p>{!correct && <GameButton size="compact" onClick={() => setAnswer(undefined)}><RotateCcw size={15}/> Попробовать ещё раз</GameButton>}</div>}
    </div>}
  </section>;
};
