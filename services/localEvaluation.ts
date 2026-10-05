
import { checkTerminal } from './terminal';
import { Task, ExecutionResult, GridEvent } from "../types";

const GRID_MAX_COMMANDS = 500;
type Heading = 'E' | 'S' | 'W' | 'N';
const HEADING_VEC: Record<Heading, [number, number]> = { E: [1, 0], S: [0, 1], W: [-1, 0], N: [0, -1] };
const TURN_RIGHT: Record<Heading, Heading> = { E: 'S', S: 'W', W: 'N', N: 'E' };
const TURN_LEFT: Record<Heading, Heading> = { E: 'N', N: 'W', W: 'S', S: 'E' };

const normalizeGridCommand = (s: string): string =>
    s.replace(/^(robot|drone|player)\s*\./i, '')
        .replace(/[()\s;]/g, '')
        .replace(/_/g, '')
        .toLowerCase();

// Раскрывает циклы (Python `for ... in range(N):` по отступам, Lua `for i=1,N do ... end`)
// в плоский список нормализованных команд. Бросает 'LIMIT' при превышении GRID_MAX_COMMANDS.
const expandGridProgram = (code: string): { cmd: string; orig: string }[] => {
    const lines = code.split('\n').map(raw => {
        // Комментарии: '#', '--', '//' до конца строки
        const cut = Math.min(...['#', '--', '//'].map(m => {
            const idx = raw.indexOf(m);
            return idx === -1 ? raw.length : idx;
        }));
        const text = raw.slice(0, cut);
        const indent = text.length - text.trimStart().length;
        return { indent, text: text.trim() };
    }).filter(l => l.text.length > 0);

    const out: { cmd: string; orig: string }[] = [];

    const pushCmd = (orig: string) => {
        const cmd = normalizeGridCommand(orig);
        if (cmd) {
            out.push({ cmd, orig });
            if (out.length > GRID_MAX_COMMANDS) throw new Error('LIMIT');
        }
    };

    const expandBlock = (start: number, indent: number): number => {
        let i = start;
        while (i < lines.length) {
            const l = lines[i];
            if (i > start && l.indent <= indent) break;
            if (l.text === 'end') { i++; continue; }

            const pyFor = l.text.match(/^for\b.*\bin\s+range\s*\(\s*(\d+)\s*\)\s*:\s*$/i);
            const luaFor = l.text.match(/^for\s+\w+\s*=\s*(\d+)\s*,\s*(\d+)\s+do\b([\s\S]*)$/i);

            if (pyFor) {
                const n = parseInt(pyFor[1]);
                if(n > GRID_MAX_COMMANDS) throw new Error('LIMIT');
                if(!lines[i+1] || lines[i+1].indent <= l.indent) throw new Error('После строки for нужны команды с отступом: добавь четыре пробела перед ними.');
                const innerStart = out.length;
                i = expandBlock(i + 1, l.indent);
                const body = out.splice(innerStart);
                for (let k = 0; k < n; k++) {
                    out.push(...body);
                    if (out.length > GRID_MAX_COMMANDS) throw new Error('LIMIT');
                }
                continue;
            }
            if (/^for\b.*\brange\s*\(/i.test(l.text)) throw new Error('В скобках range укажи число повторений, например range(2), а после скобок поставь двоеточие.');
            if (luaFor) {
                const n = Math.max(0,parseInt(luaFor[2])-parseInt(luaFor[1])+1);
                if(n > GRID_MAX_COMMANDS) throw new Error('LIMIT');
                const rest = luaFor[3].trim();
                const innerStart = out.length;
                if (rest) {
                    // Однострочный цикл: for i=1,N do cmd() end
                    const innerText = rest.replace(/\bend\s*$/, '').trim();
                    if(!/\bend\s*$/.test(rest)) throw new Error('Закрой цикл Lua командой end.');
                    for (const m of innerText.matchAll(/[a-zA-Z_.]+\s*\([^)]*\)/g)) pushCmd(m[0]);
                    i++;
                } else {
                    // Многострочный: собираем тело до парного 'end' (с учётом вложенных циклов)
                    const bodyLines: typeof lines = [];
                    let depth = 1;
                    i++;
                    while (i < lines.length) {
                        const t = lines[i].text;
                        if (/^for\s+\w+\s*=\s*\d+\s*,\s*\d+\s+do\b/i.test(t)) depth++;
                        if (t === 'end') { depth--; if (depth === 0) { i++; break; } }
                        bodyLines.push(lines[i]);
                        i++;
                    }
                    if(depth!==0) throw new Error('Закрой цикл Lua командой end.');
                    // Тело обрабатываем тем же expandBlock: подменяем lines временно
                    const saved = lines.splice(0, lines.length, ...bodyLines);
                    expandBlock(0, -1);
                    lines.splice(0, lines.length, ...saved);
                }
                const body = out.splice(innerStart);
                for (let k = 0; k < n; k++) {
                    out.push(...body);
                    if (out.length > GRID_MAX_COMMANDS) throw new Error('LIMIT');
                }
                continue;
            }

            pushCmd(l.text);
            i++;
        }
        return i;
    };

    expandBlock(0, -1);
    return out;
};

export function runGridProgram(code: string, map: NonNullable<Task['mapConfig']>): {
    success: boolean;
    steps: [number, number][];
    gridEvents: GridEvent[];
    logs: string[];
    error?: string;
} {
    const { gridSize, start, end, obstacles } = map;
    const activeObstacles = new Set(obstacles.map(o => `${o[0]},${o[1]}`));
    const logs: string[] = [];
    const steps: [number, number][] = [[...start]];
    const gridEvents: GridEvent[] = [];
    const pos: [number, number] = [...start];
    let heading: Heading = 'E';
    let error: string | undefined;

    let commands: { cmd: string; orig: string }[];
    try {
        commands = expandGridProgram(code);
    } catch (e) {
        return { success: false, steps, gridEvents, logs, error: e instanceof Error && e.message !== 'LIMIT' ? e.message : `Превышен лимит команд (${GRID_MAX_COMMANDS}).` };
    }

    const FWD = new Set(['forward', 'moveforward', 'move', 'step']);
    const BACK = new Set(['backward', 'moveback', 'back']);
    const TURN_R = new Set(['right', 'turnright']);
    const TURN_L = new Set(['left', 'turnleft']);
    const MOVE_ABS: Record<string, Heading> = { moveright: 'E', moveleft: 'W', moveup: 'N', movedown: 'S' };
    const JUMP = new Set(['jump', 'leap']);
    const JUMP_ABS: Record<string, Heading> = { jumpright: 'E', jumpleft: 'W', jumpup: 'N', jumpdown: 'S' };
    const ATTACK = new Set(['attack', 'hack', 'laser', 'zap', 'destroy']);
    const ATTACK_ABS: Record<string, Heading> = { attackright: 'E', attackleft: 'W', attackup: 'N', attackdown: 'S' };

    const tryLand = (nx: number, ny: number): boolean => {
        if (nx < 0 || nx >= gridSize || ny < 0 || ny >= gridSize) {
            error = 'Шаг выводит робота за край карты. Проверь клетку и направление стрелки.';
            return false;
        }
        if (activeObstacles.has(`${nx},${ny}`)) {
            error = 'На пути препятствие. Проверь следующий шаг и направление стрелки.';
            return false;
        }
        return true;
    };

    const doMove = (dir: Heading) => {
        const [dx, dy] = HEADING_VEC[dir];
        const nx = pos[0] + dx, ny = pos[1] + dy;
        if (!tryLand(nx, ny)) return false;
        pos[0] = nx; pos[1] = ny;
        steps.push([nx, ny]);
        gridEvents.push({ type: 'move', x: nx, y: ny, heading });
        return true;
    };

    const doJump = (dir: Heading) => {
        const [dx, dy] = HEADING_VEC[dir];
        const nx = pos[0] + dx * 2, ny = pos[1] + dy * 2;
        // Промежуточная клетка при прыжке не проверяется
        if (!tryLand(nx, ny)) return false;
        pos[0] = nx; pos[1] = ny;
        steps.push([nx, ny]);
        gridEvents.push({ type: 'jump', x: nx, y: ny, targetX: nx, targetY: ny, heading });
        return true;
    };

    const doAttack = (dir: Heading) => {
        const [dx, dy] = HEADING_VEC[dir];
        const tx = pos[0] + dx, ty = pos[1] + dy;
        if (activeObstacles.delete(`${tx},${ty}`)) {
            logs.push(`Файрвол уничтожен на [${tx}, ${ty}]`);
        }
        gridEvents.push({ type: 'attack', x: pos[0], y: pos[1], targetX: tx, targetY: ty, heading });
        return true;
    };
    const face = (dir: Heading) => {
        if(heading !== dir) {heading=dir;gridEvents.push({type:'turn',x:pos[0],y:pos[1],heading});}
    };

    for (const { cmd, orig } of commands) {
        if (FWD.has(cmd)) { if (!doMove(heading)) break; }
        else if (BACK.has(cmd)) { if (!doMove(TURN_LEFT[TURN_LEFT[heading]])) break; }
        else if (TURN_R.has(cmd)) { heading = TURN_RIGHT[heading]; gridEvents.push({type:'turn',x:pos[0],y:pos[1],heading}); }
        else if (TURN_L.has(cmd)) { heading = TURN_LEFT[heading]; gridEvents.push({type:'turn',x:pos[0],y:pos[1],heading}); }
        else if (cmd in MOVE_ABS) { face(MOVE_ABS[cmd]); if (!doMove(heading)) break; }
        else if (JUMP.has(cmd)) { if (!doJump(heading)) break; }
        else if (cmd in JUMP_ABS) { face(JUMP_ABS[cmd]); if (!doJump(heading)) break; }
        else if (ATTACK.has(cmd)) { doAttack(heading); }
        else if (cmd in ATTACK_ABS) { doAttack(ATTACK_ABS[cmd]); }
        else { error = `Неизвестная команда: ${orig}`; break; }
    }

    if (!error && pos[0] === end[0] && pos[1] === end[1] && map.requireLoop) {
        const source = code.split('\n').map(line => line.split('#')[0]).join('\n');
        const repeats = [...source.matchAll(/^\s*for\s+\w+\s+in\s+range\(\s*(\d+)\s*\)\s*:/gm)];
        if (!repeats.some(match => Number(match[1]) >= 2)) error = 'Маршрут верный. В этом уроке нужно объединить повторяющиеся шаги в цикл for с двумя или большим числом повторов.';
    }
    const success = !error && pos[0] === end[0] && pos[1] === end[1];
    if (!error && !success) error = 'Цель не достигнута.';
    return { success, steps, gridEvents, logs, error };
}

// Детерминированное перемешивание ответов квиза: один taskId -> одна перестановка.
export function shuffledQuiz(taskId: string, quiz: NonNullable<Task['quizData']>): { options: string[]; correctIndex: number } {
    let seed = 0x811c9dc5; // FNV-1a 32-bit
    for (let i = 0; i < taskId.length; i++) {
        seed ^= taskId.charCodeAt(i);
        seed = Math.imul(seed, 0x01000193);
    }
    let state = seed >>> 0 || 1;
    const rand = () => (state = (Math.imul(state, 1664525) + 1013904223) >>> 0) / 0x100000000;

    const order = quiz.options.map((_, i) => i);
    for (let i = order.length - 1; i > 0; i--) {
        const j = Math.floor(rand() * (i + 1));
        [order[i], order[j]] = [order[j], order[i]];
    }
    return {
        options: order.map(i => quiz.options[i]),
        correctIndex: order.indexOf(quiz.correctIndex),
    };
}

export const evaluateCodeLocally = async (code: string, task: Task): Promise<ExecutionResult> => {
    // 1. Normalize Code
    const rawCode = code.trim();
    // Helper to cleanup code for regex but keep structure
    const cleanCode = rawCode.replace(/'/g, '"').replace(/\s+/g, ' ');

    const logs: string[] = [];
    const steps: [number, number][] = [];
    let success = false;
    let error: string | undefined;
    let feedback = '';
    let output = '';

    // --- HTML CHECK (Browser DOM Parser + CSS Validation) ---
    if (task.type === 'html') {
        try {
            const parser = new DOMParser();
            const doc = parser.parseFromString(rawCode, 'text/html');
            const errors = doc.querySelectorAll('parsererror');
            
            if (errors.length > 0) {
                error = "Синтаксическая ошибка HTML.";
            } else if (task.htmlConfig?.targetTag) {
                const tag = doc.querySelector(task.htmlConfig.targetTag);
                if (!tag) {
                    error = `Элемент "${task.htmlConfig.targetTag}" не найден. Проверь, что он есть в коде.`;
                } else {
                    const targetStyle = task.htmlConfig.targetStyle;

                    if (!targetStyle) {
                        // No style requirement — check that element has some CSS
                        // Parse <style> blocks and check if selector has any rules
                        const styleBlocks = rawCode.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
                        const hasInlineStyle = (tag as HTMLElement).getAttribute('style');
                        const selectorName = task.htmlConfig.targetTag;

                        if (styleBlocks) {
                            const allCSS = styleBlocks.map(b => b.replace(/<\/?style[^>]*>/gi, '')).join('\n');
                            // Check if selector appears in CSS with at least one property
                            const selectorRegex = new RegExp(
                                selectorName.replace('.', '\\.').replace('#', '\\#') + '\\s*\\{([^}]+)\\}',
                                'i'
                            );
                            const match = allCSS.match(selectorRegex);
                            if (match && match[1].includes(':')) {
                                success = true;
                                logs.push(`✓ Стили для ${selectorName} найдены`);
                            } else if (hasInlineStyle) {
                                success = true;
                                logs.push(`✓ Инлайн-стили для ${selectorName} найдены`);
                            } else {
                                success = true; // Element exists, be lenient
                                logs.push(`✓ Элемент ${selectorName} найден`);
                            }
                        } else if (hasInlineStyle) {
                            success = true;
                            logs.push(`✓ Инлайн-стили для ${selectorName} найдены`);
                        } else {
                            success = true;
                            logs.push(`✓ Элемент ${selectorName} найден`);
                        }
                    } else if (/^[A-Z_0-9]+$/.test(targetStyle)) {
                        // Text content check (e.g. 'AGENT_47', 'HACKED')
                        if (tag.textContent?.includes(targetStyle)) {
                            success = true;
                            logs.push(`✓ Текст "${targetStyle}" найден`);
                        } else {
                            error = `Текст элемента должен содержать "${targetStyle}"`;
                        }
                    } else {
                        // CSS property validation (e.g. 'background: #00f3ff; border-radius: 8px;')
                        // Parse required properties from targetStyle string
                        const requiredProps: { prop: string; value: string }[] = [];
                        targetStyle.split(';').forEach(rule => {
                            const parts = rule.split(':');
                            if (parts.length === 2) {
                                requiredProps.push({
                                    prop: parts[0].trim().toLowerCase(),
                                    value: parts[1].trim().toLowerCase().replace(/\s+/g, ' ')
                                });
                            }
                        });

                        if (requiredProps.length === 0) {
                            success = true;
                        } else {
                            const frame = document.createElement('iframe');
                            frame.setAttribute('sandbox', 'allow-same-origin');
                            frame.style.cssText = 'position:fixed;left:-10000px;width:800px;height:600px;visibility:hidden';
                            document.body.appendChild(frame);
                            const missing: string[] = [];
                            try {
                                const isolated = frame.contentDocument;
                                if (!isolated) throw new Error('Нет документа для проверки');
                                isolated.open(); isolated.write(rawCode); isolated.close();
                                const element = isolated.querySelector(task.htmlConfig.targetTag);
                                if (!element) throw new Error('Целевой элемент не найден');
                                const computed = frame.contentWindow!.getComputedStyle(element);
                                const reference = isolated.createElement('div');
                                isolated.body.appendChild(reference);
                                reference.style.cssText = targetStyle;
                                const expected = frame.contentWindow!.getComputedStyle(reference);
                                for (const req of requiredProps) {
                                    if (computed.getPropertyValue(req.prop) !== expected.getPropertyValue(req.prop)) missing.push(`${req.prop}: ${req.value}`);
                                }
                            } finally { frame.remove(); }

                            if (missing.length === 0) {
                                success = true;
                                logs.push(`✓ Все CSS-свойства найдены`);
                            } else {
                                error = `Не хватает CSS: ${missing.join(', ')}`;
                                feedback = `Добавь свойства ${missing.join(', ')} к элементу ${task.htmlConfig.targetTag}`;
                            }
                        }
                    }
                }
            } else {
                // No targetTag — just check HTML is non-empty
                if (doc.body && doc.body.innerHTML.trim().length > 10) {
                    success = true;
                } else {
                    error = "Добавь HTML-контент.";
                }
            }
        } catch (e) {
            error = "Ошибка парсинга HTML.";
        }
        
        if (success && task.htmlConfig?.interaction) {
            const { inputId, buttonId, listId } = task.htmlConfig.interaction;
            const parser = new DOMParser();
            const doc = parser.parseFromString(rawCode, 'text/html');
            if (![inputId, buttonId, listId].every(id => doc.getElementById(id))) {
                success = false;
                error = 'Сохрани поле, кнопку и список с ID из шаблона.';
            } else {
                // Execute scripts in the existing disposable Worker, with a small DOM model.
                // Student code has no access to the page or the teacher's data.
                const ids = JSON.stringify([inputId, buttonId, listId]);
                const prefix = `const elements = Object.fromEntries(${ids}.map(id => [id, {value:'', children:[], textContent:'', listeners:{}, addEventListener(event,fn){this.listeners[event]=fn}, appendChild(child){this.children.push(child)}, append(child){this.children.push(child)}}]));\nconst document = {getElementById(id){return elements[id]}, createElement(){return {textContent:''}}};\n`;
                const suffix = `\nfor (const value of ['Миссия', '   ', '  Дрон  ']) {elements[${JSON.stringify(inputId)}].value=value; elements[${JSON.stringify(buttonId)}].listeners.click();}\nconsole.log(JSON.stringify(elements[${JSON.stringify(listId)}].children.map(child=>child.textContent)));`;
                const scripts = (html:string) => Array.from(parser.parseFromString(html,'text/html').querySelectorAll('script')).map(script=>script.textContent).join('\n');
                try {
                    await checkTerminal(prefix + scripts(rawCode) + suffix, {...task,initialCode:prefix + scripts(task.initialCode ?? '') + suffix});
                    logs.push('✓ Кнопка добавляет текст, удаляет крайние пробелы и отклоняет пустой ввод');
                } catch (e) {
                    success = false;
                    error = e instanceof Error ? e.message : 'Проверь обработчик кнопки.';
                }
            }
        }
        return { success, logs, steps: [], error, feedback };
    }

    if (task.type === 'terminal') {
        try {
            output = await checkTerminal(rawCode, task);
            return { success: true, logs: output.split('\n').map(line => `> ${line}`), steps: [], terminalOutput: output };
        } catch (e) {
            return { success: false, logs: [], steps: [], error: e instanceof Error ? e.message : 'Ошибка выполнения' };
        }
    }

    // --- GRID LOGIC ---
    else if (task.type === 'grid') {
        if (!task.mapConfig) {
            return { success: false, logs, steps, error: 'Нет конфигурации карты.', feedback };
        }
        const r = runGridProgram(code, task.mapConfig);
        return { success: r.success, logs: r.logs, steps: r.steps, gridEvents: r.gridEvents, error: r.error, feedback };
    }

    return { success, logs, steps, error, feedback, terminalOutput: output };
};
