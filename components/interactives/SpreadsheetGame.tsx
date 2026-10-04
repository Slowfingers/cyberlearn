import React, { useEffect, useState } from 'react';
import { Task } from '../../types';
import { evaluateSumFormula, parseIfFormula } from '../../services/spreadsheetEvaluation';
import { CheckCircle, RefreshCw } from 'lucide-react';

interface Props { task: Task; onComplete: () => void }
export const SpreadsheetGame: React.FC<Props> = ({ task, onComplete }) => {
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
  const check = () => {
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
    : isMultiply ? 'В ячейке D2 вычисли стоимость тетрадей: цена B2 × количество C2.'
    : 'В ячейке D5 сложи итоги D2, D3 и D4. Проверь сумму вручную.';
  return <div className="workshop-legacy h-full overflow-auto bg-gray-950 p-4 md:p-6 text-gray-200 space-y-5">
    <div className="spreadsheet-heading"><h2 className="text-xl text-white font-semibold">{isIf ? 'Условие в таблице' : isMultiply ? 'Цена и количество' : 'Сумма по строкам'}</h2><button onClick={reset} className="flex items-center gap-2 text-sm px-3 py-2 border border-gray-700 rounded-lg"><RefreshCw size={16}/>Начать заново</button></div>
    <p>{instruction}</p>
    <p className="spreadsheet-address-note">A — название, B — {isIf ? 'баллы' : isMultiply ? 'цена' : 'значение 1'}{!isIf && (isMultiply ? ', C — количество' : ', C — значение 2')}. {isIf ? 'C' : 'D'} — результат. Число в адресе — номер строки.</p>
    <div className="spreadsheet-mobile-rows" aria-label="Строки учебной таблицы">{rows.map((row, i) => <section key={row.id} className="spreadsheet-row-card"><h3>Строка {i + 2} · {row.name}</h3><dl><div><dt>A{i+2} · Название</dt><dd>{row.name}</dd></div><div><dt>B{i+2} · {isIf ? 'Баллы' : isMultiply ? 'Цена' : 'Значение 1'}</dt><dd>{row.val1}</dd></div>{!isIf && <div><dt>C{i+2} · {isMultiply ? 'Количество' : 'Значение 2'}</dt><dd>{row.val2}</dd></div>}<div><dt>{isIf ? 'C' : 'D'}{i+2} · Результат</dt><dd>{isIf ? statuses[i] ?? '—' : isMultiply && i === 0 ? result ?? '?' : total(row)}</dd></div></dl></section>)}{!isIf && !isMultiply && <section className="spreadsheet-row-card"><h3>D5 · Общий итог</h3><p>{result ?? '?'}</p></section>}</div>
    <div className="spreadsheet-desktop-table overflow-x-auto" role="region" aria-label="Учебная таблица, прокрутка по горизонтали" tabIndex={0}><table className="w-full text-sm border-collapse"><caption className="text-left pb-3 text-gray-400">Строка 1 — названия столбцов. Данные начинаются со строки 2.</caption><thead><tr className="bg-gray-900"><th className="p-3">Строка</th><th>A · Название</th><th>B · {isIf ? 'Баллы' : 'Значение 1'}</th>{!isIf && <th>C · Значение 2</th>}<th>{isIf ? 'C · Результат' : 'D · Итог'}</th></tr></thead><tbody>{rows.map((row, i) => <tr key={row.id} className="border-b border-gray-800"><th className="p-3">{i+2}</th><td>{row.name}</td><td className="text-center">{row.val1}</td>{!isIf && <td className="text-center">{row.val2}</td>}<td className="text-center">{isIf ? statuses[i] ?? '—' : isMultiply && i === 0 ? result ?? '?' : total(row)}</td></tr>)}{!isIf && !isMultiply && <tr><th className="p-3">5</th><td colSpan={3}>Общий итог</td><td className="text-center font-bold">{result ?? '?'}</td></tr>}</tbody></table></div>
    <label className="block space-y-2"><span>Формула для {cell}</span><input aria-label={`Формула для ${cell}`} value={formula} onChange={event => { setFormula(event.target.value); setError(''); }} onKeyDown={event => { if (event.key === 'Enter' && !completed) check(); }} spellCheck={false} autoComplete="off" disabled={completed} placeholder="Начни со знака =" className="block w-full rounded-lg bg-black border border-gray-600 p-3 font-mono text-white"/></label>
    {error && <p role="alert" className="text-rose-300">{error}</p>}
    <div className="flex flex-wrap items-center gap-4"><button onClick={check} disabled={completed} className="px-5 py-3 rounded-lg bg-cyan-300 text-black font-semibold disabled:opacity-50">Проверить</button><button onClick={() => setHint(!hint)} aria-expanded={hint} className="text-sm text-cyan-300 underline">{hint ? 'Скрыть подсказку' : 'Показать подсказку'}</button></div>
    {hint && <p className="text-sm text-gray-400">{isIf ? 'IF(условие; результат при «да»; результат при «нет»). Текст записывается в кавычках.' : isMultiply ? 'Умножение записывается знаком *. Используй адреса ячеек вместо готового ответа.' : 'SUM складывает диапазон. Двоеточие соединяет адрес первой и последней ячейки.'}</p>}
    {completed && <p role="status" className="flex gap-2 text-emerald-300"><CheckCircle size={20}/>Верно. {task.lesson?.reflection}</p>}
  </div>;
};
