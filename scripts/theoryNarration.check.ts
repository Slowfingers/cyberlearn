// Self-check: наставник рассказывает теорию ЭТОГО урока.
// (a) у каждой задачи непустой рассказ; (b) в рассказе нет остатков HTML-тегов
// и неразвёрнутых html-сущностей; (c) полный учебный цикл и короткие основные блоки.
import { MOCK_TASKS } from '../constants';
import { getStoryContent } from '../components/BigMascotTheoryStory';
import { stripStandardsPrefix } from '../utils/theoryText';

let failures = 0;
const fail = (msg: string) => { failures++; console.error(`FAIL: ${msg}`); };

const TAG_RE = /<\/?[a-zA-Z][^>]*>/;
const ENTITY_RE = /&(?:#[0-9]+|#x[0-9a-fA-F]+|[a-zA-Z]+);/;

const firstBlocks = new Set<string>();
let withTheory = 0;

for (const task of MOCK_TASKS) {
  const story = getStoryContent(task);

  const texts: string[] = [story.intro];
  for (const group of story.theoryGroups) {
    for (const block of group) texts.push(block.text);
  }

  const narration = texts.join(' ').trim();
  if (!narration) fail(`[${task.id}] пустой рассказ`);
  if (ENTITY_RE.test(narration)) fail(`[${task.id}] html-сущность в рассказе: ${narration.match(ENTITY_RE)![0]}`);

  // Утечка разметки: '<' в тексте допустим только из декодированной сущности (&lt; и т.п.)
  for (const group of story.theoryGroups) {
    for (const block of group) {
      if (block.text.includes('<') && !/&(?:lt|gt|amp|quot|apos|#)/i.test(block.html)) {
        fail(`[${task.id}] утечка разметки в блоке: ${block.text.slice(0, 60)}`);
      }
    }
  }

  const first = story.theoryGroups[0]?.[0]?.text || story.intro;
  firstBlocks.add(first);

  if (story.theoryGroups.length > 0) withTheory++;

  // Коды стандартов не должны попадать в рассказ
  // (lookbehind на '.' отсекает доменные зоны вроде '.kz')
  if (/(?<![\w.])(CSTA|ACARA|ISTE|MIL|KZ|UK|KS\d|NGSS|ABEGS)(?![\w.])/i.test(story.intro)) {
    fail(`[${task.id}] коды стандартов в intro`);
  }
}

console.log(`Задач: ${MOCK_TASKS.length}, с блоками теории: ${withTheory}`);
console.log(`Различных первых блоков рассказа: ${firstBlocks.size} (карточки понятий)`);
if (firstBlocks.size < 60) fail(`мало различных объяснений: ${firstBlocks.size}`);
for (const task of MOCK_TASKS) {
  const lesson = task.lesson;
  if (!lesson || !lesson.goal || !lesson.example || !lesson.success || !lesson.reflection) fail(`[${task.id}] неполный учебный цикл`);
  if (lesson && (lesson.steps.length > 3 || lesson.explanation.length > 650 || lesson.example.length > 500)) fail(`[${task.id}] перегруженный основной материал`);
}

// Дополнительно: коды стандартов вырезаются из description
const dirty = MOCK_TASKS.filter(t => /(?<![\w.])(CSTA|ACARA|ISTE|MIL|KZ|UK|KS\d|NGSS|ABEGS)(?![\w.])/i.test(stripStandardsPrefix(t.description || '')));
if (dirty.length) fail(`коды стандартов остались в ${dirty.length} описаниях: ${dirty.slice(0, 3).map(t => t.id).join(', ')}`);

if (failures === 0) console.log('theoryNarration.check: все проверки прошли');
else console.error(`theoryNarration.check: ${failures} провалов`);
process.exit(failures ? 1 : 0);
