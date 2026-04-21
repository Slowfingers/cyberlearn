
import { Task, ExecutionResult } from "../types";

export const evaluateCodeLocally = async (code: string, task: Task): Promise<ExecutionResult> => {
    // 1. Normalize Code
    const rawCode = code.trim();
    // Helper to cleanup code for regex but keep structure
    const cleanCode = rawCode.replace(/'/g, '"').replace(/\s+/g, ' '); 
    const lowerCode = cleanCode.toLowerCase();

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
                            // Collect all CSS for the target element
                            let elementCSS = '';
                            
                            // 1. Inline styles
                            const inlineStyle = (tag as HTMLElement).getAttribute('style') || '';
                            elementCSS += inlineStyle + '; ';

                            // 2. <style> block rules matching the selector
                            const styleBlocks = rawCode.match(/<style[^>]*>([\s\S]*?)<\/style>/gi);
                            if (styleBlocks) {
                                const allCSS = styleBlocks.map(b => b.replace(/<\/?style[^>]*>/gi, '')).join('\n');
                                const selectorName = task.htmlConfig.targetTag;
                                const selectorRegex = new RegExp(
                                    selectorName.replace('.', '\\.').replace('#', '\\#') + '\\s*\\{([^}]+)\\}',
                                    'gi'
                                );
                                let cssMatch;
                                while ((cssMatch = selectorRegex.exec(allCSS)) !== null) {
                                    elementCSS += cssMatch[1] + '; ';
                                }
                            }

                            const normalizedCSS = elementCSS.toLowerCase().replace(/\s+/g, ' ');
                            const missing: string[] = [];

                            for (const req of requiredProps) {
                                // Check if the property exists with any value (lenient)
                                const propRegex = new RegExp(req.prop + '\\s*:\\s*[^;]+', 'i');
                                if (!propRegex.test(normalizedCSS)) {
                                    missing.push(req.prop);
                                }
                            }

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
        
        return { success, logs, steps: [], error, feedback };
    }

    // --- LUA / PYTHON TERMINAL LOGIC ---
    if (task.type === 'terminal') {
        
        // 2. Extract non-comment user content (for cs101 tasks)
        const nonCommentCode = rawCode
            .split('\n')
            .filter(l => {
                const t = l.trim();
                return t && !t.startsWith('--');
            })
            .join(' ');

        // 3. Mock Print Output
        const printMatches = rawCode.matchAll(/print\s*\((.*?)\)/g);
        for (const match of printMatches) {
            let content = match[1].trim();
            content = content.replace(/"\s*\.\.\s*"/g, ''); 
            content = content.replace(/^"|"$/g, '');
            
            // Simulation hacks
            if (task.id === 'lua_014' && content.includes('target')) content = "Атака: ogre";
            if (task.id === 'lua_016' && content.includes('calc')) content = "20"; 
            if (task.id === 'lua_020' && content.includes('#')) content = "4"; 
            if (task.id === 'lua_022' && content.includes('item')) content = "potion\ncoin\nkey";
            if (task.id === 'lua_032' && content.includes('max')) content = "9";
            if (task.id === 'lua_034' && content.includes('Victory')) content = "Victory!";
            if (task.id === 'lua_041' && content.includes('reverse')) content = "rennurteN";
            if (task.id === 'lua_042' && content.includes('upper')) content = "NET-9";
            if (task.id === 'lua_051' && content.includes('gen')) content = "ID-1\nID-2\nID-3";
            if (task.id === 'lua_052' && content.includes('hero')) content = "Ava: 140 hp, 20 power";

            content = content.replace(/"/g, ''); 
            output += content + '\n';
            logs.push(`> ${content}`);
        }

        // 4. Task Specific Validation
        switch (task.id) {
            // ... Lua cases (Keep existing) ...
            case 'lua_002': if (/print\s*\(\s*"Hello, Hero!"\s*\)/.test(cleanCode)) success = true; else error = "Выведи точную фразу: Hello, Hero!"; break;
            case 'lua_003': if ((/total\s*=\s*coins\s*\+\s*found/.test(cleanCode) || /total\s*=\s*7\s*\+\s*5/.test(cleanCode)) && /print\s*\(\s*total\s*\)/.test(cleanCode)) success = true; else error = "Создай total = coins + found и выведи."; break;
            case 'lua_008': if (/if\s+hasKey/.test(cleanCode) && /print/.test(cleanCode) && (/OPEN|ДОСТУП|ОТКРЫТ/i.test(cleanCode))) success = true; else error = "Напиши условие: if hasKey then print(\"ДОСТУП ОТКРЫТ\") ..."; break;
            case 'lua_009': if (/for\s+i\s*=\s*1\s*,\s*5\s+do/.test(cleanCode) && /print\s*\(\s*i\s*\)/.test(cleanCode)) success = true; else error = "Напиши for i = 1, 5 do и print(i)."; break;
            case 'lua_014': if (/function\s+attack\s*\(\s*target\s*\)/.test(cleanCode) && /attack\s*\(\s*"ogre"\s*\)/.test(cleanCode)) success = true; else error = "Функция attack(target) и вызов."; break;
            case 'lua_016': if (/return\s+(power\s*\*\s*2|2\s*\*\s*power)/.test(cleanCode)) success = true; else error = "Функция должна возвращать power * 2."; break;
            case 'lua_020': if (/print\s*\(\s*#\s*items\s*\)/.test(cleanCode)) success = true; else error = "Используй #items."; break;
            case 'lua_022': if (/(pairs|ipairs)\s*\(\s*items\s*\)/.test(cleanCode)) success = true; else error = "Используй pairs(items) или ipairs(items)."; break;
            case 'lua_032': if ((/>\ *max/.test(cleanCode) || /max\ *</.test(cleanCode)) && /for/.test(cleanCode)) success = true; else error = "Пройдись циклом и сравнивай с max."; break;
            case 'lua_034': 
                if (
                    /enemyHp\s*=\s*enemyHp\s*-\s*heroPower/.test(cleanCode) && 
                    /if\s+enemyHp\s*<=\s*0/.test(cleanCode) && 
                    /print\s*\(\s*["']Victory!["']\s*\)/.test(cleanCode) &&
                    (/else/.test(cleanCode) && /print\s*\(\s*["']Enemy survived!["']\s*\)/.test(cleanCode))
                ) {
                    success = true;
                } else {
                    error = "Вычти heroPower из enemyHp, проверь if enemyHp <= 0, выведи 'Victory!' или 'Enemy survived!'.";
                }
                break;
            case 'lua_041': if (/string\.reverse\s*\(\s*name\s*\)/.test(cleanCode) && /print/.test(cleanCode)) success = true; else error = "Используй string.reverse(name) и print."; break;
            case 'lua_042': if (/string\.upper/.test(cleanCode) && /string\.sub/.test(cleanCode) && /\.\./.test(cleanCode) && /print/.test(cleanCode)) success = true; else error = "Используй string.upper, string.sub и конкатенацию (..)."; break;
            case 'lua_051': if (/function/.test(cleanCode) && /count\s*=\s*count\s*\+\s*1/.test(cleanCode) && /return/.test(cleanCode)) success = true; else error = "Создай замыкание с count = count + 1 и return."; break;
            case 'lua_052': if (/function\s+levelup/i.test(cleanCode) && /hero\.power/.test(cleanCode) && /hero\.hp/.test(cleanCode) && /print/.test(cleanCode)) success = true; else error = "Создай функцию levelUp(hero), увеличь power и hp, выведи результат."; break;
            
            // Python Cases
            case 'py_001':
                if (/print\s*\(\s*".*"\s*\)/.test(cleanCode)) success = true;
                else error = "Используй print(\"Текст\")";
                break;
            case 'py_002': if (/print\s*\(\s*"Hello,?\s*Netrunner!?"\s*\)/.test(cleanCode)) success = true; else error = "Выведи \"Hello, Netrunner!\""; break;
            case 'py_003': if (/coins\s*=\s*7/.test(cleanCode) && /found\s*=\s*5/.test(cleanCode) && /print\s*\(\s*coins\s*\+\s*found\s*\)/.test(cleanCode)) success = true; else error = "Создай переменные и выведи их сумму"; break;
            case 'py_011': if (/if\s+access\s*==/.test(cleanCode) && /print/.test(cleanCode)) success = true; else error = "Проверь access == \"alpha\""; break;
            case 'py_012': if (/n\s*%\s*2/.test(cleanCode) && /if/.test(cleanCode) && /print/.test(cleanCode)) success = true; else error = "Используй n % 2 == 0 и if/else"; break;
            case 'py_021': if (/for\s+i\s+in\s+range/.test(cleanCode) && /print\s*\(\s*i\s*\)/.test(cleanCode)) success = true; else error = "Используй for i in range(5, 0, -1)"; break;
            case 'py_022': if (/for\s+/.test(cleanCode) && /total\s*(\+\=|=\s*total\s*\+)/.test(cleanCode) && /print\s*\(\s*total\s*\)/.test(cleanCode)) success = true; else error = "Используй цикл, total += i и print(total)"; break;
            case 'py_031': if (/def\s+boost/.test(cleanCode) && /return\s+power\s*\*\s*3/.test(cleanCode)) success = true; else error = "Определи функцию boost с return power * 3"; break;
            case 'py_032': if (/def\s+double/.test(cleanCode) && /return\s+x\s*\*\s*2/.test(cleanCode)) success = true; else error = "Определи функцию double(x) с return x * 2"; break;
            case 'py_041': if (/max\s*\(/.test(cleanCode) || (/for\s+/.test(cleanCode) && />\s*m/.test(cleanCode))) success = true; else error = "Найди максимум через max() или цикл"; break;
            case 'py_042': if (/def\s+attack/.test(cleanCode) && /min/.test(lowerCode)) success = true; else error = "Определи функцию attack и найди врага с минимальным hp"; break;
            case 'py_051': if (/agent\s*\[.*level.*\]\s*\+\=\s*1/.test(cleanCode) && /print/.test(cleanCode) && /f"/.test(rawCode)) success = true; else error = "Увеличь agent[\"level\"] на 1 и выведи f-строку."; break;
            case 'py_052': if (/\.items\s*\(\s*\)/.test(cleanCode) && /for\s+/.test(cleanCode) && /print/.test(cleanCode)) success = true; else error = "Перебери inventory.items() циклом for и выведи каждый предмет."; break;
            case 'py_061': if (/\[\s*:\s*:\s*-1\s*\]/.test(cleanCode) && /print/.test(cleanCode)) success = true; else error = "Используй срез [::-1] и print."; break;
            case 'py_062': if (/def\s+battle_report/.test(cleanCode) && /max/.test(cleanCode) && /print/.test(cleanCode)) success = true; else error = "Создай функцию battle_report, найди max hp и выведи результат."; break;

            // ALG404
            case 'alg_m3_p1': if (/function\s+factorial/.test(cleanCode) && /return/.test(cleanCode) && /factorial\s*\(\s*n\s*-\s*1\s*\)/.test(cleanCode)) success = true; else error = "Напиши рекурсивную функцию с return n * factorial(n-1)"; break;
            case 'alg_m5_p1': if (/function\s+binarySearch/.test(cleanCode) && /mid/.test(cleanCode) && /return\s+mid/.test(cleanCode)) success = true; else error = "Напиши бинарный поиск с lo, hi, mid и return mid."; break;

            default:
                if (cleanCode.length > 15) success = true;
                else error = error || "Добавь содержательный ответ по заданию.";
                break;
        }

        return { success, logs, steps: [], terminalOutput: output || "> Script executed.", error, feedback };
    }
    
    // --- GRID LOGIC (Improved) ---
    else if (task.type === 'grid' && task.mapConfig) {
         const { start, end, obstacles, gridSize } = task.mapConfig;
         let currentPos = [...start] as [number, number];
         steps.push([...currentPos]);
         
         const lines = code.split('\n'); 
         const commands: string[] = [];
         
         // Improved Parser: Allows loops block
         for (let i = 0; i < lines.length; i++) {
            const line = lines[i].trim();
            // Match loop: for i=1,3 do
            const loopMatch = line.match(/for\s+.*=\s*\d+\s*,\s*(\d+)\s*do/);

            if (loopMatch) {
                 const iter = parseInt(loopMatch[1]);
                 // Gather lines until 'end' or just next few lines if simple
                 const block: string[] = [];
                 let j = i + 1;
                 while(j < lines.length && !lines[j].trim().startsWith('end')) {
                     const inner = lines[j].trim();
                     if (inner && !inner.startsWith('--')) block.push(inner);
                     j++;
                 }
                 // Repeat block
                 for(let k=0; k<iter; k++) {
                    commands.push(...block);
                 }
                 i = j; // Skip to end
            } else {
                if (line.includes('move')) commands.push(line);
            }
         }

         for (const cmd of commands) {
            let next = [...currentPos] as [number, number];
            if (cmd.toLowerCase().includes('right')) next[0]++;
            else if (cmd.toLowerCase().includes('left')) next[0]--;
            else if (cmd.toLowerCase().includes('down')) next[1]++;
            else if (cmd.toLowerCase().includes('up')) next[1]--;
            else continue; 

            if (next[0] < 0 || next[0] >= gridSize || next[1] < 0 || next[1] >= gridSize) {
                error = "Столкновение с границей!"; break;
            }
            if (obstacles.some(o => o[0] === next[0] && o[1] === next[1])) {
                error = "Файрвол!"; break;
            }
            currentPos = next;
            steps.push([...currentPos]);
         }

         if (!error && currentPos[0] === end[0] && currentPos[1] === end[1]) {
             success = true;
         } else if (!error) {
             error = "Цель не достигнута.";
         }
    }

    return { success, logs, steps: steps.length ? steps : [], error, feedback, terminalOutput: output };
};
