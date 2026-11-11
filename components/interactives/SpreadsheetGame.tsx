import {GameButton, WorkshopHeader} from '../GameUI';
import React, { useEffect, useState, useId } from 'react';
import { Task } from '../../types';
import { evaluateSumFormula, parseIfFormula, formulaRefs } from '../../services/spreadsheetEvaluation';
import { CheckCircle, Table2 } from 'lucide-react';

interface Props { task: Task; onComplete: () => void }
export const SpreadsheetGame: React.FC<Props> = ({ task, onComplete }) => {
  const formId = useId();
  const config = task.spreadsheetConfig;
  const isIf = config?.formulaType === 'if';
  const isMultiply = config?.formulaType === 'multiply';
  const expectedIf = isIf ? parseIfFormula(config?.targetFormula ?? '') : null;
  const fallback: NonNullable<Task['spreadsheetConfig']>['tableData'] = isIf
    ? [{ id: '1', name: 'Аня', val1: 85, val2: 0 }, { id: '2', name: 'Тимур', val1: 60, val2: 0 }, { id: '3', name: 'Лена', val1: 45, val2: 0 }]
    : [{ id: '1', name: 'Тетради', val1: 100, val2: 3 }, { id: '2', name: 'Карандаши', val1: 50, val2: 4 }, { id: '3', name: 'Альбом', val1: 500, val2: 1 }];
  const rows = config?.tableData.length ? config.tableData : fallback;
  const total = (row: typeof rows[number]) => typeof row.formulaResult === 'number' ? row.formulaResult : row.val1 * row.val2;
  const [formula, setFormula] = useState('');
  const [error, setError] = useState('');
  const [completed, setCompleted] = useState(false);
  const [result, setResult] = useState<number | string | null>(null);
  const [statuses, setStatuses] = useState<string[]>([]);
  const [hint, setHint] = useState(false);
  const reset = () => { setFormula(''); setError(''); setCompleted(false); setResult(null); setStatuses([]); setHint(false); };
  useEffect(reset, [task.id]);
  const cell = isIf ? 'C2' : isMultiply ? 'D2' : 'D5';
  const refs = formulaRefs(formula);
  const bLabel = isIf ? 'Баллы' : isMultiply ? 'Цена' : 'Значение 1';
  const cLabel = isMultiply ? 'Количество' : 'Значение 2';
  const cellAttrs = (addr: string) => ({ 'data-addr': addr, ...(refs.has(addr) ? { 'data-ref': 'true' } : {}), ...(addr === cell ? { 'data-target': 'true' } : {}) });
  const cellInfo = (addr: string): { label: string; value: number | string } | null => {
    const match = addr.match(/^([A-Z])(\d+)$/);
    if (!match) return null;
    const col = match[1], rowNum = +match[2];
    if (!isIf && !isMultiply && col === 'D' && rowNum === 5) return { label: 'Общий итог', value: result ?? '?' };
    const row = rows[rowNum - 2];
    if (!row) return null;
    if (col === 'A') return { label: 'Название', value: row.name };
    if (col === 'B') return { label: bLabel, value: row.val1 };
    if (col === 'C') return isIf ? { label: 'Результат', value: statuses[rowNum - 2] ?? '—' } : { label: cLabel, value: row.val2 };
    if (col === 'D') return { label: 'Итог', value: isMultiply && rowNum === 2 ? result ?? '?' : total(row) };
    return null;
  };
  const usedRefs = [...refs].map(addr => ({ addr, info: cellInfo(addr) })).filter((entry): entry is { addr: string; info: { label: string; value: number | string } } => entry.info !== null);
  const insertToken = (token: string) => {
    if (completed) return;
    setFormula(prev => (prev === '' && /^[A-Z]\d+$/.test(token) ? `=${token}` : prev + token));
    setError('');
  };
  const backspace = () => {
    setFormula(prev => {
      const quoted = prev.match(/"[^"]*"$/);
      if (quoted) return prev.slice(0, prev.length - quoted[0].length);
      const fn = prev.match(/[A-ZА-ЯЁ]+\($/i);
      if (fn) return prev.slice(0, prev.length - fn[0].length);
      const addr = prev.match(/[A-Z]\d+$/);
      if (addr) return prev.slice(0, prev.length - addr[0].length);
      return prev.slice(0, -1);
    });
    setError('');
  };
  // Ячейка-кнопка: нажатие вставляет её адрес в формулу
  const CellButton: React.FC<{ addr: string; children: React.ReactNode }> = ({ addr, children }) => {
    const info = cellInfo(addr);
    return <button type="button" className="cell-insert" disabled={completed}
      aria-label={`Вставить ${addr}${info ? ` (${info.label} ${info.value})` : ''}`}
      onClick={() => insertToken(addr)}>{children}</button>;
  };
  const f = formula.toUpperCase().replace(/\s/g, '');
  const steps: { text: string; done: boolean }[] = isIf && expectedIf
    ? [
        { text: 'Начни со знака = и открой IF(', done: /^=(IF|ЕСЛИ)\(/.test(f) },
        { text: `Условие: B2 ${expectedIf.inclusive ? '>=' : '>'} ${expectedIf.threshold}`, done: new RegExp(`B2${expectedIf.inclusive ? '>=' : '>'}${expectedIf.threshold}`).test(f) },
        { text: `Текст при «да»: «${expectedIf.passText}»`, done: f.includes(`"${expectedIf.passText.toUpperCase()}"`) || f.includes(`'${expectedIf.passText.toUpperCase()}'`) },
        { text: `Текст при «нет»: «${expectedIf.failText}»`, done: f.includes(`"${expectedIf.failText.toUpperCase()}"`) || f.includes(`'${expectedIf.failText.toUpperCase()}'`) },
      ]
    : isMultiply
      ? [
          { text: 'Начни со знака =', done: f.startsWith('=') },
          { text: 'Нажми на ячейку с ценой (B2)', done: f.includes('B2') },
          { text: 'Поставь знак ×', done: f.includes('*') },
          { text: 'Нажми на ячейку с количеством (C2)', done: f.includes('C2') },
        ]
      : [
          { text: 'Начни со знака =', done: f.startsWith('=') },
          { text: 'Набери SUM(', done: f.includes('SUM(') || f.includes('СУММ(') || /D2\+D3\+D4/.test(f) },
          { text: 'Нажми D2, потом :, потом D4', done: /D2:D4/.test(f) || /D2\+D3\+D4/.test(f) },
          { text: 'Закрой скобку )', done: /(SUM|СУММ)\(D2:D4\)/.test(f) || /D2\+D3\+D4$/.test(f) },
        ];
  const check = () => {
    if (completed) return;
    if (!formula.trim().startsWith('=')) { setError('Начни формулу со знака =.'); return; }
    if (isIf) {
      const parsed = parseIfFormula(formula);
      if (!parsed || !expectedIf || parsed.threshold !== expectedIf.threshold || parsed.inclusive !== expectedIf.inclusive || parsed.passText !== expectedIf.passText || parsed.failText !== expectedIf.failText) {
        setError('Проверь условие, границу и два текста результата.'); return;
      }
      setStatuses(rows.map(row => (parsed.inclusive ? row.val1 >= parsed.threshold : row.val1 > parsed.threshold) ? parsed.passText : parsed.failText));
      setResult('Условие применено');
    } else if (isMultiply) {
      if (!/^=(?:B2\*C2|C2\*B2)$/i.test(formula.replace(/\s/g, ''))) { setError('Используй адрес цены B2, адрес количества C2 и знак умножения *.'); return; }
      setResult(rows[0].val1 * rows[0].val2);
    } else {
      const sum = evaluateSumFormula(formula, rows.map(total));
      if (sum === null) { setError('Нужна сумма всех значений D2, D3 и D4. Проверь диапазон.'); return; }
      setResult(sum);
    }
    setError(''); setCompleted(true); onComplete();
  };
  const instruction = isIf && expectedIf
    ? `Если баллы ${expectedIf.inclusive ? 'не меньше' : 'больше'} ${expectedIf.threshold}, запиши «${expectedIf.passText}», иначе — «${expectedIf.failText}». Введи формулу для C2; тренажёр применит такое же условие к остальным строкам.`
    : isMultiply ? `Посчитай, сколько стоят «${rows[0].name}»: цена × количество. Нажимай на ячейки — их адреса сами попадут в формулу.`
    : 'Сложи итоги всех строк в одну сумму. Нажимай на ячейки — их адреса сами попадут в формулу, а кнопки под полем помогут со знаками.';
  return <div data-mode={isIf ? 'if' : isMultiply ? 'multiply' : 'sum'} className="spreadsheet-lab data-vault workshop-legacy h-full overflow-auto bg-gray-950 p-4 md:p-6 text-gray-200 space-y-5">
    <WorkshopHeader icon={<Table2 size={26}/>} title={isIf ? 'Условие в таблице' : isMultiply ? 'Цена и количество' : 'Сумма по строкам'} description={instruction} onReset={reset}/>
    <p className="spreadsheet-address-note">A — название, B — {isIf ? 'баллы' : isMultiply ? 'цена' : 'значение 1'}{!isIf && (isMultiply ? ', C — количество' : ', C — значение 2')}. {isIf ? 'C' : 'D'} — результат. Число в адресе — номер строки.</p>
    <div className="spreadsheet-mobile-rows" aria-label="Строки учебной таблицы">{rows.map((row, i) => <section key={row.id} className="spreadsheet-row-card"><h3>Строка {i + 2} · {row.name}</h3><dl><div {...cellAttrs(`A${i+2}`)}><dt>A{i+2} · Название</dt><dd><CellButton addr={`A${i+2}`}>{row.name}</CellButton></dd></div><div {...cellAttrs(`B${i+2}`)}><dt>B{i+2} · {bLabel}</dt><dd><CellButton addr={`B${i+2}`}>{row.val1}</CellButton></dd></div>{!isIf && <div {...cellAttrs(`C${i+2}`)}><dt>C{i+2} · {cLabel}</dt><dd><CellButton addr={`C${i+2}`}>{row.val2}</CellButton></dd></div>}<div {...cellAttrs(`${isIf ? 'C' : 'D'}${i+2}`)}><dt>{isIf ? 'C' : 'D'}{i+2} · Результат</dt><dd>{isIf ? statuses[i] ?? '—' : isMultiply && i === 0 ? result ?? '?' : <CellButton addr={`D${i+2}`}>{total(row)}</CellButton>}</dd></div></dl></section>)}{!isIf && !isMultiply && <section className="spreadsheet-row-card" {...cellAttrs('D5')}><h3>D5 · Общий итог</h3><p>{result ?? '?'}</p></section>}</div>
    <div className="spreadsheet-desktop-table overflow-x-auto" role="region" aria-label="Учебная таблица, прокрутка по горизонтали" tabIndex={0}><table className="w-full text-sm border-collapse"><caption className="text-left pb-3 text-gray-400">Строка 1 — названия столбцов. Данные начинаются со строки 2.</caption><thead><tr className="spreadsheet-col-letters"><th aria-hidden="true"></th><th scope="col">A</th><th scope="col">B</th>{!isIf && <th scope="col">C</th>}<th scope="col">{isIf ? 'C' : 'D'}</th></tr><tr className="bg-gray-900"><th className="p-3">Строка</th><th>A · Название</th><th>B · {bLabel}</th>{!isIf && <th>C · {cLabel}</th>}<th>{isIf ? 'C · Результат' : 'D · Итог'}</th></tr></thead><tbody>{rows.map((row, i) => <tr key={row.id} className="border-b border-gray-800"><th className="p-3">{i+2}</th><td {...cellAttrs(`A${i+2}`)}><CellButton addr={`A${i+2}`}>{row.name}</CellButton></td><td {...cellAttrs(`B${i+2}`)} className="text-center"><CellButton addr={`B${i+2}`}>{row.val1}</CellButton></td>{!isIf && <td {...cellAttrs(`C${i+2}`)} className="text-center"><CellButton addr={`C${i+2}`}>{row.val2}</CellButton></td>}<td {...cellAttrs(`${isIf ? 'C' : 'D'}${i+2}`)} className="text-center">{isIf ? statuses[i] ?? '—' : isMultiply && i === 0 ? result ?? '?' : <CellButton addr={`D${i+2}`}>{total(row)}</CellButton>}</td></tr>)}{!isIf && !isMultiply && <tr><th className="p-3">5</th><td colSpan={3}>Общий итог</td><td {...cellAttrs('D5')} className="text-center font-bold">{result ?? '?'}</td></tr>}</tbody></table></div>
    <div className="spreadsheet-console"><label className="block space-y-2"><span className="spreadsheet-formula-label"><strong>{cell}</strong> Твоя формула</span><input aria-label={`Формула для ${cell}`} aria-invalid={!!error} aria-describedby={error ? `${formId}-error` : undefined} value={formula} onChange={event => { setFormula(event.target.value); setError(''); }} onKeyDown={event => { if (event.key === 'Enter' && !completed) check(); }} spellCheck={false} autoComplete="off" disabled={completed} placeholder="Начни со знака =" className="block w-full rounded-lg bg-black border border-gray-600 p-3 font-mono text-white"/></label>
        <ol className="formula-steps" aria-label="Шаги построения формулы">{steps.map((s, i) => <li key={i} data-done={s.done}><span className="step-check" aria-hidden="true">{s.done ? '✓' : i + 1}</span>{s.text}</li>)}</ol>
    {!isIf && !isMultiply && <p className="formula-steps-note">Можно и так: =D2+D3+D4</p>}
    <div className="formula-keypad" role="group" aria-label="Кнопки формулы">
      {(isMultiply ? ['=', '×'] : isIf ? ['=', 'IF(', '>=', '>', '<', ';', ')'] : ['=', '+', 'SUM(', ':', ')']).map(tok => <button key={tok} type="button" disabled={completed} onClick={() => insertToken(tok === '×' ? '*' : tok)}>{tok}</button>)}
      {isIf && expectedIf && <><button type="button" disabled={completed} onClick={() => insertToken(`"${expectedIf.passText}"`)}>«{expectedIf.passText}»</button><button type="button" disabled={completed} onClick={() => insertToken(`"${expectedIf.failText}"`)}>«{expectedIf.failText}»</button></>}
      <button type="button" disabled={completed || !formula} onClick={backspace} aria-label="Стереть последнее">⌫</button>
      <button type="button" disabled={completed || !formula} onClick={() => { setFormula(''); setError(''); }}>Очистить</button>
    </div>
    {usedRefs.length > 0 && <p className="spreadsheet-refs">Формула использует: {usedRefs.map(({ addr, info }) => `${addr} (${info.label} = ${info.value})`).join(', ')}</p>}
    {error && <p id={`${formId}-error`} role="alert" className="workshop-feedback workshop-feedback--error spreadsheet-error">{error}</p>}
    <div className="spreadsheet-actions"><GameButton variant="primary" size="compact" onClick={check} disabled={completed || !formula.trim()} className="academy-primary">Проверить</GameButton><GameButton variant="secondary" size="compact" onClick={() => setHint(!hint)} aria-expanded={hint} className="spreadsheet-hint-toggle">{hint ? 'Скрыть подсказку' : 'Показать подсказку'}</GameButton></div>
    {hint && <p className="workshop-feedback workshop-feedback--hint spreadsheet-hint">{isIf ? 'IF(условие; результат при «да»; результат при «нет»). Текст записывается в кавычках.' : isMultiply ? 'Умножение записывается знаком *. Используй адреса ячеек вместо готового ответа.' : 'SUM складывает диапазон. Двоеточие соединяет адрес первой и последней ячейки.'}</p>}
    {completed && <p role="status" className="workshop-feedback workshop-feedback--success spreadsheet-success"><CheckCircle size={20}/>Верно. {task.lesson?.reflection}</p>}
  </div></div>;
};
