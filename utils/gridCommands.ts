import type { GridHeading } from '../types';

export interface GridCommandInfo {
  kind: 'absolute' | 'relative';
  label: string;
  glyph: string;
  isoGlyph: string;
  heading?: GridHeading;
}

const ABSOLUTE: Record<string, { heading: GridHeading; label: string; glyph: string; isoGlyph: string }> = {
  up: { heading: 'N', label: 'Вверх', glyph: '↑', isoGlyph: '↖' },
  right: { heading: 'E', label: 'Вправо', glyph: '→', isoGlyph: '↗' },
  down: { heading: 'S', label: 'Вниз', glyph: '↓', isoGlyph: '↘' },
  left: { heading: 'W', label: 'Влево', glyph: '←', isoGlyph: '↙' },
};

const ABSOLUTE_RE = /^drone\.(?:move_?)?(up|down|left|right)\(\)$/i;
const RELATIVE_RE = /^(forward|moveForward|backward|turnLeft|turnRight|left|right)(\(\))?$/i;

/** Describes a single-line direction command; returns null for loops, jumps, attacks and free text. */
export function describeGridCommand(raw: string): GridCommandInfo | null {
  const text = raw.trim();
  const abs = text.match(ABSOLUTE_RE);
  if (abs) { const a = ABSOLUTE[abs[1].toLowerCase()]; return { kind: 'absolute', ...a }; }
  const rel = text.match(RELATIVE_RE);
  if (!rel) return null;
  const name = rel[1].toLowerCase();
  if (name === 'forward' || name === 'moveforward') return { kind: 'relative', label: 'Вперёд', glyph: '↑', isoGlyph: '↑' };
  if (name === 'backward') return { kind: 'relative', label: 'Назад', glyph: '↓', isoGlyph: '↓' };
  if (name === 'left' || name === 'turnleft') return { kind: 'relative', label: 'Повернуть налево', glyph: '↶', isoGlyph: '↶' };
  return { kind: 'relative', label: 'Повернуть направо', glyph: '↷', isoGlyph: '↷' };
}

/** The builder is offered only when every allowed command is a plain direction/turn command. */
export function isSimpleCommandSet(commands?: string[]): boolean {
  return !!commands && commands.length > 0 && commands.every(c => describeGridCommand(c) !== null);
}

export interface CommandLine { index: number; text: string }

/** Non-empty, non-comment lines with their index in the full code string. */
export function listCommandLines(code: string): CommandLine[] {
  return code.split('\n').map((text, index) => ({ index, text })).filter(l => l.text.trim() !== '' && !/^(#|\/\/)/.test(l.text.trim()));
}

export function moveCommandLine(code: string, index: number, delta: -1 | 1): string {
  const lines = code.split('\n');
  const visible = listCommandLines(code);
  const at = visible.findIndex(l => l.index === index);
  const target = visible[at + delta];
  if (at < 0 || !target) return code;
  [lines[index], lines[target.index]] = [lines[target.index], lines[index]];
  return lines.join('\n');
}

export function removeCommandLine(code: string, index: number): string {
  const lines = code.split('\n');
  if (index < 0 || index >= lines.length) return code;
  lines.splice(index, 1);
  return lines.join('\n');
}

/** Labels describe the visible screen direction in the selected camera. */
export function gridDirectionLabel(info: GridCommandInfo, view: 'top' | 'iso'): string {
  if (view !== 'iso' || info.kind !== 'absolute') return info.label;
  return ({ N: 'Вверх-влево', E: 'Вверх-вправо', S: 'Вниз-вправо', W: 'Вниз-влево' } as const)[info.heading!];
}
