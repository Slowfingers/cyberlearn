import { ArrowLeft, ArrowRight, Braces, Footprints, Globe, LayoutTemplate, Lightbulb, ScanEye, ShieldCheck, Table2 } from 'lucide-react';
import { GRADE3_WORKED_EXAMPLES } from '../curriculum/grade3WorkedExamples';
import { GameButton } from './GameUI';

const moduleIcons = [Footprints, ScanEye, Globe, ShieldCheck, Braces, Table2, LayoutTemplate, Lightbulb];

function ExampleDiagram({taskId, step}: {taskId: string; step: number}) {
  if (taskId === 'g3_m3_l1' || taskId === 'g3_m3_l2') {
    const positions = taskId === 'g3_m3_l1' ? [2, 2, 3] : [0, 0, 1];
    const directions = ['↓', '→', '→'];
    return <div className="grade3-mini-grid" aria-label={`Положение героя: клетка ${positions[step] + 1}, направление ${directions[step]}`}>
      {Array.from({length: 4}, (_, index) => <span key={index} data-active={positions[step] === index}>{positions[step] === index ? directions[step] : ''}</span>)}
    </div>;
  }
  if (taskId === 'g3_m3_l4') {
    return <pre className="grade3-example-code"><code>for i in range(2):{'\n'}<mark data-active={step < 2}>{'    forward()'}</mark>{'\n'}<mark data-active={step === 2}>left()</mark></code></pre>;
  }
  if (taskId === 'g3_m5_l1') {
    return <div className="grade3-flow" aria-label="Два пути к одному серверу">
      <p data-active={step !== 1}>Старт → 30 мс → Сервер</p>
      <p data-active={step !== 0}>Старт → 10 мс → Узел → 12 мс → Сервер</p>
    </div>;
  }
  if (taskId === 'g3_m5_l4' || taskId === 'g3_m5_l5') {
    const heading = taskId === 'g3_m5_l4';
    return <div className="grade3-html-preview" aria-label="Как браузер показывает пример">
      {heading ? <><strong>Дневник экспедиции</strong>{step > 0 && <p>Сегодня мы нашли следы.</p>}</>
        : step > 0 && <span className="grade3-sample-button">Показать маршрут</span>}
    </div>;
  }
  if (taskId === 'g3_m6_l4') {
    const parts = ['Отправитель: «Служба игры»', '«Срочно перешли код входа!»', 'Действие: показать письмо взрослому'];
    return <ol className="grade3-flow" aria-label="Учебное письмо">
      {parts.map((part, index) => <li key={part} data-active={step === index}>{part}</li>)}
    </ol>;
  }
  if (taskId === 'g3_m7_l3') {
    const pixels = [0, 1, 0, 1, 1, 1, 0, 2, 0];
    if (step === 2) pixels[4] = 2;
    return <div className="grade3-pixels" aria-label={step === 2 ? 'Центральная клетка стала зелёной' : 'Красный цветок с зелёным стеблем'}>
      {pixels.map((pixel, index) => <span key={index} data-color={pixel}>{step > 0 && pixel > 0 ? pixel : ''}</span>)}
    </div>;
  }
  if (taskId === 'g3_m8_l3' && step > 0) {
    return <div className="grade3-bars" aria-label="Соня прочитала 2 книги, Макс 5">
      <div><span style={{height: 30}}>2</span>Соня</div>
      <div><span style={{height: 75}}>5</span>Макс</div>
    </div>;
  }
  if (taskId === 'g3_m8_l1' || taskId === 'g3_m8_l2') {
    const multiply = taskId === 'g3_m8_l1';
    const cells = multiply ? [['E3', '7'], ['F3', '3']] : [['E3', '4'], ['E4', '6'], ['E5', '9']];
    return <div className="grade3-sheet" aria-label="Учебные ячейки и результат">
      <dl>{cells.map(([address, value], index) => <div key={address} data-active={step === 2 || (step === 0 ? index === 0 : index > 0)}>
        <dt>{address}</dt><dd>{value}</dd>
      </div>)}</dl>
      {step === 2 && <p><code>{multiply ? '=E3*F3' : '=SUM(E3:E5)'}</code> → <strong>{multiply ? 21 : 19}</strong></p>}
    </div>;
  }
  if (taskId === 'g3_m8_l4') {
    const rows = [[5, 2, 4], [2, 5, 4], [2, 4, 5]];
    return <div className="grade3-number-row" aria-label={`Числа: ${rows[step].join(', ')}`}>
      {rows[step].map((number, index) => <span key={number} data-active={step === 2 || index === step || index === step + 1}>{number}</span>)}
    </div>;
  }
  if (taskId === 'g3_m9_l2') {
    return <ol className="grade3-flow grade3-wireframe" aria-label="Макет страницы рассказа">
      {['Дневник путешествия', 'Сегодня мы дошли до озера.', 'Следующая страница →'].map((part, index) =>
        <li key={part} data-active={step === index}>{part}</li>)}
    </ol>;
  }
  if (taskId === 'g3_m10_l1' || taskId === 'g3_m10_l2') {
    const [a, b] = [[1, 0], [0, 1], [1, 1]][step];
    const isAnd = taskId === 'g3_m10_l2';
    const output = isAnd ? a && b : a || b;
    return <div className="grade3-number-row" aria-label={`Входы ${a} и ${b}. Выход ${output}.`}>
      <span data-active={!!a}>{a}</span><strong>{isAnd ? 'И' : 'ИЛИ'}</strong><span data-active={!!b}>{b}</span>
      <ArrowRight aria-hidden="true"/><span data-active={!!output}>{output}</span>
    </div>;
  }
  return null;
}

export function Grade3WorkedExample({taskId, step, onStep}: {taskId: string; step: number; onStep: (step: number) => void}) {
  const steps = GRADE3_WORKED_EXAMPLES[taskId];
  if (!steps) return null;
  const moduleNumber = Number(taskId.match(/^g3_m(\d+)_/)?.[1]);
  const Icon = moduleIcons[moduleNumber - 3];
  const [label, detail] = steps[step];

  return <section className="grade3-worked-example" aria-label="Разбор по шагам">
    <div className="grade3-example-step" aria-live="polite">
      <Icon size={28} aria-hidden="true"/>
      <div>
        <h2>{label}</h2>
        <p>{detail}</p>
      </div>
    </div>
    <ExampleDiagram taskId={taskId} step={step}/>
    <div className="grade3-example-controls">
      <GameButton size="compact" disabled={step === 0} onClick={() => onStep(step - 1)}><ArrowLeft size={16}/> Назад</GameButton>
      <span aria-label={`Шаг ${step + 1} из ${steps.length}`}>{step + 1} / {steps.length}</span>
      <GameButton size="compact" disabled={step === steps.length - 1} onClick={() => onStep(step + 1)}>Следующий шаг <ArrowRight size={16}/></GameButton>
    </div>
  </section>;
}
