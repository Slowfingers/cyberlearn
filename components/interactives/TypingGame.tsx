import {GameButton, WorkshopHeader, WorkshopBadge} from '../GameUI';
import React, { useState, useEffect, useRef } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Keyboard } from 'lucide-react';


export const TypingGame: React.FC<{ task: Task; onComplete: (answer?:string) => void; initialInput?:string; onDraft?:(input:string)=>void; hints?:boolean }> = ({ task, onComplete, initialInput="", onDraft, hints=true }) => {
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
  const reset = () => { finished.current = false; setInput(''); onDraft?.(''); setCompleted(false); setShift(false); setCursor(0); if (window.matchMedia('(pointer: fine)').matches) inputRef.current?.focus({ preventScroll: true }); };
  useEffect(() => { finished.current=false;setCompleted(false);setInput(initialInput);setCursor(initialInput.length); setLanguage(/[а-яё]/i.test(target) ? 'ru' : 'en'); }, [task.id, target]);
  const update = (value: string) => {
    if (finished.current) return;
    onDraft?.(value);setInput(value); setCursor(value.length);
    if (value === target) { finished.current = true; setCompleted(true); playSound('success'); onComplete(value); }
  };
  const firstError = input.split('').findIndex((char, index) => char !== target[index]);
  const correct = firstError < 0 ? input.length : firstError;
  const next = target[correct] || '';
  const rows = language === 'ru' ? ['ё1234567890-=', 'йцукенгшщзхъ', 'фывапролджэ', 'ячсмитьбю.'] : ['`1234567890-=', 'qwertyuiop[]', "asdfghjkl;'", 'zxcvbnm,./'];
  const shifted = language === 'ru' ? ['Ё!"№;%:?*()_+', 'ЙЦУКЕНГШЩЗХЪ', 'ФЫВАПРОЛДЖЭ', 'ЯЧСМИТЬБЮ,'] : ['~!@#$%^&*()_+', 'QWERTYUIOP{}', 'ASDFGHJKL:"', 'ZXCVBNM<>?'];
  const needsShift = rows.some((row, r) => [...row].some((char, i) => shifted[r][i] === next && char !== next));
  return <div className="workshop-game typing-workshop">
    <WorkshopHeader icon={<Keyboard size={26}/>} title="Клавиатурный тренажёр" description={task.lesson?.goal || 'Напечатай текст образца.'} onReset={reset}
      badges={<WorkshopBadge label="Букв">{Math.min(correct, target.length)} / {target.length}</WorkshopBadge>}>
      {hints&&<GameButton variant="secondary" size="compact" className="typing-tool academy-secondary" onClick={() => setShowKeyboard(!showKeyboard)} aria-pressed={showKeyboard}>{showKeyboard ? 'Скрыть клавиатуру' : 'Показать клавиатуру'}</GameButton>}
    </WorkshopHeader>
    <section className={`typing-surface ${focused ? 'is-focused' : ''} ${completed ? 'is-completed' : ''}`}>
      <p id={`typing-example-${task.id}`} className="sr-only">Образец для набора: {target}</p>
      <div className="typing-inline-editor">
        <div className="typing-inline-text" aria-hidden="true">{target.split('').map((char, i) => <span key={i} className={`${i < input.length ? input[i] === char ? 'typed-correct' : 'typed-error' : 'typed-pending'} ${i === cursor && !completed ? 'typing-caret' : ''}`} title={hints && i < input.length && input[i] !== char ? `Нужен символ: ${char}` : undefined}>{i < input.length && input[i] !== char ? input[i] === ' ' ? '·' : input[i] === '\n' ? '↵\n' : input[i] : char === '\n' ? '↵\n' : char === ' ' ? ' ' : char}</span>)}{input.length > target.length && <span className="typed-error">{input.slice(target.length)}</span>}</div>
        <textarea id={`typing-${task.id}`} ref={inputRef} aria-label="Печатай прямо в тексте" aria-describedby={`typing-example-${task.id} typing-help-${task.id}`} value={input} disabled={completed} onChange={e => update(e.target.value)} onFocus={() => setFocused(true)} onBlur={() => setFocused(false)} onSelect={e => setCursor(e.currentTarget.selectionEnd)} spellCheck={false} autoCapitalize="off" autoComplete="off" autoCorrect="off" />
      </div>
      <div className="typing-status"><p id={`typing-help-${task.id}`} role="status">{completed ? 'Готово! Текст набран верно.' : !hints ? 'Повтори образец самостоятельно. Сравни все буквы, пробелы и знаки.' : firstError >= target.length ? 'Удали лишние символы в конце.' : firstError >= 0 ? !hints ? 'Есть отличие от образца. Сравни текст и исправь его.' : `Исправь символ ${firstError + 1}: нужен ${next === ' ' ? 'пробел' : next === '\n' ? 'Enter' : `«${next}»`}.` : focused || input ? needsShift ? 'Для выделенной клавиши удерживай Shift.' : 'Печатай выделенные символы.' : 'Нажми на текст и начни печатать.'}</p><span>{Math.min(correct, target.length)} / {target.length}</span></div>
      <div className="typing-progress" role="progressbar" aria-label="Прогресс задания" aria-valuenow={Math.min(correct, target.length)} aria-valuemin={0} aria-valuemax={target.length}><i style={{width:`${correct / target.length * 100}%`}} /></div>
    </section>
    {!completed && input===target && <GameButton variant="primary" onClick={()=>update(input)}>Проверить восстановленный текст</GameButton>}
    {hints && showKeyboard && <section className="keyboard-board" aria-label="Экранная клавиатура"><div className="keyboard-caption"><span>Печатай на клавиатуре — подсвечена следующая клавиша</span><button onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')} aria-label="Переключить язык клавиатуры">{language === 'ru' ? 'РУС' : 'ENG'} ↔</button></div>
      {rows.map((row,r)=><div className="keyboard-row" key={r}>{[...row].map((char,i)=><span key={i} className={`keycap ${char === next || shifted[r][i] === next ? 'keycap-next' : ''}`}><small>{shifted[r][i] !== char.toUpperCase() ? shifted[r][i] : ''}</small>{shift ? shifted[r][i] : char.toUpperCase()}</span>)}</div>)}
      <div className="keyboard-row"><span className={`keycap keycap-wide ${needsShift ? 'keycap-next' : ''}`}>⇧ Shift</span><span className={`keycap keycap-space ${next === ' ' ? 'keycap-next' : ''}`}>Пробел</span><span className="keycap keycap-wide">⌫</span><span className={`keycap keycap-wide ${next === '\n' ? 'keycap-next' : ''}`}>↵</span></div>
    </section>}
  </div>;
};
