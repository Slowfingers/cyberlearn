import React from 'react';
import { ArrowDown, ArrowUp, Code, RotateCcw, Trash2, Undo2 } from 'lucide-react';
import type { Task } from '../types';
import type { ViewMode } from './GameGrid';
import { describeGridCommand, gridDirectionLabel, listCommandLines, moveCommandLine, removeCommandLine } from '../utils/gridCommands';
import '../styles/mission-ui.css';

interface Props {
  task: Task;
  code: string;
  view: ViewMode;
  onCodeChange: (code: string) => void;
  onInsert: (command: string) => void;
  onResetDraft: () => void;
  onRestartCharacter: () => void;
  showSource?: boolean;
  onToggleSource?: () => void;
  disabled?: boolean;
}

/** Edits the same code string the interpreter runs; no separate program model. */
export default function GridCommandBuilder({ task, code, view, onCodeChange, onInsert, onResetDraft, onRestartCharacter, showSource, onToggleSource, disabled }: Props) {
  const lines = listCommandLines(code);
  const glyphOf = (info: NonNullable<ReturnType<typeof describeGridCommand>>) => (view === 'iso' ? info.isoGlyph : info.glyph);
  return (
    <section className="mission-commands" data-absolute={!!task.allowedCommands?.length && task.allowedCommands.every(command => describeGridCommand(command)?.kind === 'absolute')} aria-label="Конструктор программы">
      <header className="mission-commands__heading"><Code size={23}/><h2>Твой алгоритм</h2><span>{lines.length}</span></header>
      <div className="mission-commands__palette" role="group" aria-label="Добавить команду">
        {(task.allowedCommands ?? []).map(cmd => {
          const info = describeGridCommand(cmd);
          if (!info) return null;
          return (
            <button key={cmd} type="button" disabled={disabled} className="mission-command" onClick={() => onInsert(cmd)}>
              <span className="mission-command__glyph" aria-hidden="true">{glyphOf(info)}</span>
              <span className="mission-command__text"><strong>{gridDirectionLabel(info, view)}</strong><small>{cmd}</small></span>
            </button>
          );
        })}
      </div>
      <ol className="mission-commands__list" aria-label={`Программа: ${lines.length} команд`}>
        {lines.length === 0 && <li className="mission-commands__empty">Добавь первую команду — она появится здесь.</li>}
        {lines.map((line, i) => {
          const info = describeGridCommand(line.text);
          return (
            <li key={`${line.index}:${line.text}`} className="mission-line">
              <span className="mission-line__n">{i + 1}</span>
              <span className="mission-line__glyph" aria-hidden="true">{info ? glyphOf(info) : '•'}</span>
              <span className="mission-line__text"><strong>{info ? gridDirectionLabel(info, view) : 'Строка кода'}</strong><small>{line.text.trim()}</small></span>
              <button type="button" disabled={disabled || i === 0} aria-label={`Поднять шаг ${i + 1} выше`} onClick={() => onCodeChange(moveCommandLine(code, line.index, -1))}><ArrowUp size={18} /></button>
              <button type="button" disabled={disabled || i === lines.length - 1} aria-label={`Опустить шаг ${i + 1} ниже`} onClick={() => onCodeChange(moveCommandLine(code, line.index, 1))}><ArrowDown size={18} /></button>
              <button type="button" disabled={disabled} aria-label={`Удалить шаг ${i + 1}`} onClick={() => onCodeChange(removeCommandLine(code, line.index))}><Trash2 size={18} /></button>
            </li>
          );
        })}
      </ol>
      <div className="mission-commands__actions">
        <button type="button" disabled={disabled} onClick={onResetDraft}><RotateCcw size={16} /> Сбросить программу</button>
        <button type="button" disabled={disabled} onClick={onRestartCharacter}><Undo2 size={16} /> Вернуть героя на старт</button>
        {onToggleSource && <button type="button" aria-pressed={!!showSource} onClick={onToggleSource}><Code size={16} /> {showSource ? 'Скрыть код' : 'Редактировать код'}</button>}
      </div>
    </section>
  );
}
