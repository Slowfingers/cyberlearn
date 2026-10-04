import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { RotateCcw } from 'lucide-react';


export const TypingGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const target = task.typingConfig?.targetText || task.typingData?.text || 'print("Привет!")';
  const [input, setInput] = useState('');
  const [completed, setCompleted] = useState(false);
  const [showKeyboard, setShowKeyboard] = useState(true);
  const [focused, setFocused] = useState(false);
  const [cursor, setCursor] = useState(0);
  const [shift, setShift] = useState(false);
  const [language, setLanguage] = useState<'ru' | 'en'>(/[а-яё]/i.test(target) ? 'ru' : 'en');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const finished = useRef(false);
  const reset = () => { finished.current = false; setInput(''); setCompleted(false); setShift(false); setCursor(0); if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true }); };
  useEffect(() => { reset(); setLanguage(/[а-яё]/i.test(target) ? 'ru' : 'en'); }, [task.id, target]);
  const update = (value: string) => {
    if (finished.current) return;
    setInput(value); setCursor(value.length);
    if (value === target) { finished.current = true; setCompleted(true); playSound('success'); onComplete(); }
  };
  const firstError = input.split('').findIndex((char, index) => char !== target[index]);
  const correct = firstError < 0 ? input.length : firstError;
  const next = target[correct] || '';
  const rows = language === 'ru' ? ['ё1234567890-=', 'йцукенгшщзхъ', 'фывапролджэ', 'ячсмитьбю.'] : ['`1234567890-=', 'qwertyuiop[]', "asdfghjkl;'", 'zxcvbnm,./'];
  const shifted = language === 'ru' ? ['Ё!"№;%:?*()_+', 'ЙЦУКЕНГШЩЗХЪ', 'ФЫВАПРОЛДЖЭ', 'ЯЧСМИТЬБЮ,'] : ['~!@#$%^&*()_+', 'QWERTYUIOP{}', 'ASDFGHJKL:"', 'ZXCVBNM<>?'];
  const needsShift = rows.some((row, r) => [...row].some((char, i) => shifted[r][i] === next && char !== next));
  const positionCursor = (position: number) => {
    setCursor(position);
    requestAnimationFrame(() => { inputRef.current?.setSelectionRange(position, position); if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true }); });
  };
  const insert = (char: string) => {
    const start = inputRef.current?.selectionStart ?? input.length;
    const end = inputRef.current?.selectionEnd ?? input.length;
    update(input.slice(0, start) + char + input.slice(end)); setShift(false); positionCursor(start + char.length);
  };
  const erase = () => {
    const start = inputRef.current?.selectionStart ?? input.length;
    const end = inputRef.current?.selectionEnd ?? input.length;
    const from = start === end ? Math.max(0, start - 1) : start;
    update(input.slice(0, from) + input.slice(end)); positionCursor(from);
  };
  return <div className="workshop-game typing-workshop">
    <div className="typing-toolbar"><h2>Клавиатурный тренажёр</h2><div><button className="typing-tool" onClick={() => setShowKeyboard(!showKeyboard)} aria-pressed={showKeyboard}>{showKeyboard ? 'Скрыть клавиатуру' : 'Показать клавиатуру'}</button><button className="typing-tool" onClick={reset} aria-label="Начать заново" title="Начать заново"><RotateCcw size={17} /></button></div></div>
    <section className={`typing-surface ${focused ? 'is-focused' : ''} ${completed ? 'is-completed' : ''}`}>
      <p id={`typing-example-${task.id}`} className="sr-only">Образец для набора: {target}</p>
      <div className="typing-inline-editor">
        <div className="typing-inline-text" aria-hidden="true">{target.split('').map((char, i) => <span key={i} className={`${i < input.length ? input[i] === char ? 'typed-correct' : 'typed-error' : 'typed-pending'} ${i === cursor && !completed ? 'typing-caret' : ''}`} title={i < input.length && input[i] !== char ? `Нужен символ: ${char}` : undefined}>{i < input.length && input[i] !== char ? input[i] === ' ' ? '·' : input[i] === '\n' ? '↵\n' : input[i] : char === '\n' ? '↵\n' : char === ' ' ? ' ' : char}</span>)}{input.length > target.length && <span className="typed-error">{input.slice(target.length)}</span>}</div>
        <textarea id={`typing-${task.id}`} ref={inputRef} aria-label="Печатай прямо в тексте" aria-describedby={`typing-example-${task.id} typing-help-${task.id}`} value={input} disabled={completed} onChange={e => update(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onSelect={e => setCursor(e.currentTarget.selectionEnd)} spellCheck={false} autoCapitalize="off" autoComplete="off" autoCorrect="off" />
      </div>
      <div className="typing-status"><p id={`typing-help-${task.id}`} role="status">{completed ? 'Готово! Текст набран верно.' : firstError >= target.length ? 'Удали лишние символы в конце.' : firstError >= 0 ? `Исправь символ ${firstError + 1}: нужен ${next === ' ' ? 'пробел' : next === '\n' ? 'Enter' : `«${next}»`}.` : focused || input ? needsShift ? 'Для выделенной клавиши удерживай Shift.' : 'Печатай выделенные символы.' : 'Нажми на текст и начни печатать.'}</p><span>{Math.min(correct, target.length)} / {target.length}</span></div>
      <div className="typing-progress" role="progressbar" aria-label="Прогресс задания" aria-valuenow={Math.min(correct, target.length)} aria-valuemin={0} aria-valuemax={target.length}><i style={{width:`${correct / target.length * 100}%`}} /></div>
    </section>
    {showKeyboard && <section className="keyboard-board" aria-label="Экранная клавиатура"><div className="keyboard-caption"><span>Можно печатать и на экране</span><button onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')} aria-label="Переключить язык клавиатуры">{language === 'ru' ? 'РУС' : 'ENG'} ↔</button></div>
      {rows.map((row, r) => <div className="keyboard-row" key={r}>{[...row].map((char, i) => <button disabled={completed} key={i} onMouseDown={e => e.preventDefault()} aria-label={shift ? shifted[r][i] : char.toUpperCase()} className={`keycap ${char === next || shifted[r][i] === next ? 'keycap-next' : ''}`} onClick={() => insert(shift ? shifted[r][i] : char)}><small>{shifted[r][i] !== char.toUpperCase() ? shifted[r][i] : ''}</small>{shift ? shifted[r][i] : char.toUpperCase()}</button>)}</div>)}
      <div className="keyboard-row"><button onMouseDown={e => e.preventDefault()} className={`keycap keycap-wide ${shift || needsShift ? 'keycap-next' : ''}`} disabled={completed} onClick={() => setShift(!shift)} aria-pressed={shift}>⇧ Shift</button><button onMouseDown={e => e.preventDefault()} className={`keycap keycap-space ${next === ' ' ? 'keycap-next' : ''}`} disabled={completed} onClick={() => insert(' ')}>Пробел</button><button onMouseDown={e => e.preventDefault()} className="keycap keycap-wide" disabled={completed} onClick={erase} aria-label="Удалить последний символ">⌫</button><button onMouseDown={e => e.preventDefault()} className={`keycap keycap-wide ${next === '\n' ? 'keycap-next' : ''}`} disabled={completed} onClick={() => insert('\n')}>↵</button></div>
    </section>}
  </div>;
};
