import { MOCK_TASKS, COURSES } from '../constants';
import { runGridProgram } from '../services/localEvaluation';
import { Task, TaskType } from '../types';

const VALID_TYPES: TaskType[] = [
    'grid', 'quiz', 'theory', 'html', 'terminal', 'hanoi', 'blocks',
    'typing', 'process_manager', 'spreadsheet', 'sorting', 'tree_search',
    'phishing_detect', 'ai_neuron', 'network_route', 'file_organizer',
    'binary_switches', 'binary_bulbs', 'wireframe_builder', 'circuit_builder',
    'fake_detector', 'ai_kids_trainer',
    'circuit', 'ai_trainer',
];

const CONFIG_BY_TYPE: Partial<Record<TaskType, keyof Task>> = {
    process_manager: 'processConfig',
    spreadsheet: 'spreadsheetConfig',
    sorting: 'sortingConfig',
    tree_search: 'treeConfig',
    phishing_detect: 'phishingConfig',
    ai_neuron: 'neuronConfig',
    network_route: 'networkConfig',
    file_organizer: 'fileConfig',
    binary_switches: 'binaryConfig',
    binary_bulbs: 'binaryConfig',
    wireframe_builder: 'wireframeConfig',
    circuit_builder: 'circuitConfig',
    circuit: 'circuitConfig',
    fake_detector: 'fakeDetectorConfig',
    ai_kids_trainer: 'aiTrainerConfig',
    ai_trainer: 'aiTrainerConfig',
};

// Уроки, где стартовый код намеренно ломаный (обучение отладке)
const INTENTIONALLY_BROKEN = ['g4_l43'];

const errors: string[] = [];
const warnings: string[] = [];
const seen = new Set<string>();
const courseIds = new Set(COURSES.map(c => c.id));
const byCourse = new Map<string, { total: number; types: Map<string, number>; modules: Set<string> }>();

for (const task of MOCK_TASKS) {
    const id = task.id;

    if (seen.has(id)) errors.push(`[${id}] дублирующийся id`);
    seen.add(id);

    if (!courseIds.has(task.courseId)) errors.push(`[${id}] неизвестный courseId "${task.courseId}"`);
    if (!VALID_TYPES.includes(task.type)) errors.push(`[${id}] неизвестный type "${task.type}"`);

    let c = byCourse.get(task.courseId);
    if (!c) { c = { total: 0, types: new Map(), modules: new Set() }; byCourse.set(task.courseId, c); }
    c.total++;
    c.types.set(task.type, (c.types.get(task.type) || 0) + 1);
    c.modules.add(task.module);

    if (task.xpReward <= 0) errors.push(`[${id}] xpReward должен быть > 0`);
    if (!task.title?.trim()) errors.push(`[${id}] пустой title`);
    if (!task.description?.trim()) errors.push(`[${id}] пустое description`);
    if ((task.type === 'quiz' || task.type === 'theory') && !task.theory && (task.description?.length ?? 0) <= 40) {
        errors.push(`[${id}] ${task.type} без theory и с коротким description`);
    }

    switch (task.type) {
        case 'grid': {
            const m = task.mapConfig;
            if (!m) {
                errors.push(`[${id}] grid без mapConfig`);
                break;
            }
            const inBounds = (p: [number, number]) => p[0] >= 0 && p[0] < m.gridSize && p[1] >= 0 && p[1] < m.gridSize;
            const onObstacle = (p: [number, number]) => m.obstacles.some(o => o[0] === p[0] && o[1] === p[1]);
            if (!inBounds(m.start) || !inBounds(m.end)) errors.push(`[${id}] start/end вне сетки`);
            if (onObstacle(m.start)) errors.push(`[${id}] start на препятствии`);
            if (onObstacle(m.end)) errors.push(`[${id}] end на препятствии`);
            const r = runGridProgram(task.initialCode ?? '', m);
            if (INTENTIONALLY_BROKEN.includes(id)) {
                if (r.success) errors.push(`[${id}] стартовый код должен быть ломаным (урок отладки), но проходит`);
            } else if (!r.success) {
                errors.push(`[${id}] стартовый код не решает лабиринт: ${r.error}`);
            }
            break;
        }
        case 'quiz': {
            const q = task.quizData;
            if (!q) { errors.push(`[${id}] quiz без quizData`); break; }
            if (q.options.length < 3) errors.push(`[${id}] quiz: меньше 3 вариантов ответа`);
            if (new Set(q.options).size !== q.options.length) errors.push(`[${id}] quiz: дублирующиеся варианты`);
            if (q.correctIndex < 0 || q.correctIndex >= q.options.length) errors.push(`[${id}] quiz: correctIndex вне диапазона`);
            // Правильный ответ не должен выделяться длиной: иначе ученик угадывает «самый длинный»
            const correctLen = q.options[q.correctIndex]?.length ?? 0;
            const maxOtherLen = Math.max(...q.options.filter((_, i) => i !== q.correctIndex).map(o => o.length));
            if (correctLen > maxOtherLen * 1.6) {
                errors.push(`[${id}] quiz: правильный ответ длиннее остальных в ${(correctLen / maxOtherLen).toFixed(1)} раза — подсказка по длине`);
            }
            break;
        }
        case 'typing':
            if (!task.typingConfig?.targetText && !task.typingData?.text) {
                errors.push(`[${id}] typing без typingConfig/typingData с текстом`);
            }
            break;
        case 'blocks':
            if (!task.blocksConfig) errors.push(`[${id}] blocks без blocksConfig`);
            break;
        case 'html':
            if (!task.htmlConfig) errors.push(`[${id}] html без htmlConfig`);
            break;
        default: {
            const cfgKey = CONFIG_BY_TYPE[task.type];
            if (cfgKey && !task[cfgKey]) {
                warnings.push(`[${id}] type ${task.type} без конфига — тренажёр покажет дефолтный сценарий`);
            }
        }
    }
}

for (const course of COURSES) {
    const c = byCourse.get(course.id);
    const moduleCount = c ? c.modules.size : 0;
    if (course.totalModules !== moduleCount) {
        errors.push(`[${course.id}] totalModules=${course.totalModules}, уникальных модулей в задачах: ${moduleCount}`);
    }
}

// Сводка по курсам
console.log('=== Сводка по курсам ===');
for (const course of COURSES) {
    const c = byCourse.get(course.id);
    if (!c) { console.log(`${course.id}: 0 задач`); continue; }
    const types = [...c.types.entries()].map(([t, n]) => `${t}:${n}`).join(', ');
    console.log(`${course.id}: ${c.total} задач (${types})`);
}

console.log('\n=== Warnings ===');
const warnByType = new Map<string, number>();
for (const w of warnings) {
    const t = w.match(/type (\w+)/)?.[1] ?? '?';
    warnByType.set(t, (warnByType.get(t) || 0) + 1);
    console.log(w);
}
console.log(`Всего warnings: ${warnings.length}`);
for (const [t, n] of warnByType) console.log(`  ${t}: ${n}`);

console.log('\n=== Ошибки ===');
if (errors.length === 0) {
    console.log('0 ошибок');
} else {
    errors.forEach(e => console.log(e));
    console.log(`Всего ошибок: ${errors.length}`);
    process.exit(1);
}
