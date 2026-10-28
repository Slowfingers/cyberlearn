import type { Task } from '../types';

// Тексты «Твоё задание»: убираем шаблонные steps, дубли goal и дубли title,
// генерируя формулировки из данных самого задания (конфиги, starter-код, goal).
// Ответы заданий здесь не раскрываются: только адреса ячеек, имена сущностей,
// размеры полей и названия виджетов — то, что ученик и так видит в тренажёре.

interface TaskCopy { goal?: string; steps?: string[]; title?: string }

const lcFirst = (s: string) => (s ? s[0].toLowerCase() + s.slice(1) : s);
const firstSentence = (s: string) => {
  const cut = s.indexOf('. ');
  return (cut === -1 ? s : s.slice(0, cut + 1)).replace(/\.$/, '');
};
const rowNames = (t: Task) =>
  (t.spreadsheetConfig?.tableData ?? []).map(r => r.name.split(' (')[0]);
const nodeLabel = (t: Task, id: string) =>
  t.networkConfig?.nodes?.find(n => n.id === id)?.label ?? id;
const cell = (xy: [number, number]) => `(${xy[0] + 1},${xy[1] + 1})`;
const SLOT_RU: Record<string, string> = {
  header: 'шапка', hero: 'главная область', canvas: 'главная область',
  action: 'кнопки', controls: 'кнопки', footer: 'низ экрана',
};
const screenTheme = (t: Task) =>
  t.wireframeConfig?.screenTitle
    ?? t.wireframeConfig?.widgets?.find(w => w.slot === 'hero')?.name
    ?? (t.wireframeConfig?.requiredElements?.map(s => SLOT_RU[s] ?? s).join(', ') || 'экран приложения');

function goalFor(t: Task): string | undefined {
  switch (t.type) {
    case 'spreadsheet': {
      const names = rowNames(t);
      const list = `«${names.slice(0, -1).join('», «')}» и «${names[names.length - 1]}»`;
      return t.spreadsheetConfig?.formulaType === 'if'
        ? `Заполни колонку результата для строк ${list} по условию из задания.`
        : `Вычисли в итоговой ячейке сумму строк ${list}.`;
    }
    case 'grid': {
      const m = t.mapConfig;
      if (!m) return undefined;
      const n = m.obstacles?.length ?? 0;
      return `Доведи робота от клетки ${cell(m.start)} до ${cell(m.end)} на поле ${m.gridSize}×${m.gridSize}: препятствий на пути — ${n}.`;
    }
    case 'network_route': {
      const c = t.networkConfig;
      if (!c) return undefined;
      const s = nodeLabel(t, c.startNode), e = nodeLabel(t, c.endNode);
      const parts = [`Проведи данные от «${s}» до «${e}»`];
      if (c.maxLatencyMs) parts.push(`уложившись в ${c.maxLatencyMs} мс`);
      const bad = c.nodes?.filter(n => n.status === 'overloaded').length ?? 0;
      const down = c.edges?.filter(e2 => e2.status === 'down').length ?? 0;
      if (bad) parts.push(`вокруг перегруженных узлов (${bad})`);
      if (down) parts.push(`по открытым линиям — закрытых тут ${down}`);
      return parts.join(', ') + '.';
    }
    case 'wireframe_builder': {
      const n = t.wireframeConfig?.widgets?.length ?? t.wireframeConfig?.requiredElements?.length ?? 0;
      return `Собери макет «${screenTheme(t)}»: разложи ${n} блоков по областям экрана.`;
    }
    case 'phishing_detect': {
      const n = t.phishingConfig?.threatCount ?? t.phishingConfig?.threats?.length ?? 0;
      const subj = (t.phishingConfig?.subject ?? 'подозрительное письмо').slice(0, 60);
      return `Найди ${n} признака обмана в письме «${subj}».`;
    }
    case 'fake_detector': {
      const cases = t.fakeDetectorConfig?.cases ?? [];
      return `Проверь ${cases.length} сообщений и отметь опасные — например, «${cases[0]?.title ?? 'первое'}».`;
    }
    case 'typing': {
      const text = t.typingConfig?.targetText ?? '';
      const preview = text.replace(/\n/g, ' ').slice(0, 24);
      return `Напечатай без ошибок образец из ${text.length} символов: «${preview}…».`;
    }
    case 'sorting':
      return `Расставь числа ${t.sortingConfig?.numbers?.join(', ') ?? ''} по возрастанию.`;
    case 'tree_search':
      return `Найди число ${t.treeConfig?.target ?? ''} в дереве с корнем ${t.treeConfig?.tree?.value ?? ''}.`;
    case 'ai_neuron': {
      const n = t.neuronConfig?.samples?.length ?? 0;
      const f = t.neuronConfig?.featureNames;
      return `Подбери веса для признаков «${f?.x1 ?? 'x1'}» и «${f?.x2 ?? 'x2'}» на ${n} примерах.`;
    }
    default:
      return undefined;
  }
}

function stepsFor(t: Task): string[] | undefined {
  switch (t.type) {
    case 'grid': {
      const m = t.mapConfig;
      if (!m) return undefined;
      const n = m.obstacles?.length ?? 0;
      return [
        `Найди старт ${cell(m.start)}, финиш ${cell(m.end)} и ${n} препятствий на поле ${m.gridSize}×${m.gridSize}.`,
        'Составь команды по порядку и запусти робота.',
        'Если робот не дошёл, ищи первый шаг, где маршрут сломался.',
      ];
    }
    case 'spreadsheet': {
      const names = rowNames(t);
      return [
        `Найди строки «${names.join('», «')}» — их значения и итоги в колонке D.`,
        'Введи формулу, начиная со знака =.',
        'Проверь результат: посчитай одну строку вручную и сравни.',
      ];
    }
    case 'network_route': {
      const c = t.networkConfig;
      if (!c) return undefined;
      const s = nodeLabel(t, c.startNode), e = nodeLabel(t, c.endNode);
      return [
        `Найди на схеме «${s}» и «${e}».`,
        'Выбирай только открытые линии и рабочие узлы.',
        `Сложи задержки на пути — лимит ${c.maxLatencyMs ?? 50} мс.`,
      ];
    }
    case 'terminal':
    case 'html': {
      const code = t.initialCode ?? t.lesson?.starterCode ?? '';
      const fn = /def (\w+)|class (\w+)|function (\w+)/.exec(code)?.[0]
        ?.replace(/^def |^class |^function /, '');
      const condition = `Прочитай условие: ${lcFirst(firstSentence(t.lesson?.goal ?? t.description))}.`;
      // Терминальные уроки-команды (shell/git/утилиты): шаблона с «ТВОЙ КОД» нет
      if (!fn && (/^(pwd|ls|mkdir|cat|git|ping|touch|whoami|python3|cd|echo|grep|wc)/m.test(code) || t.terminalConfig)) {
        return [
          condition,
          'Вспомни нужные команды и введи их в терминал по порядку.',
          'Проверь вывод — он должен совпасть с примером из условия.',
        ];
      }
      return [
        condition,
        fn
          ? `Найди в шаблоне ${fn} и строку «ТВОЙ КОД», затем дополни программу по условию.`
          : 'Найди место для кода в шаблоне и дополни программу по условию.',
        'Запусти программу и сравни вывод с примером из условия.',
      ];
    }
    default:
      return undefined;
  }
}

function titleFor(t: Task): string | undefined {
  switch (t.type) {
    case 'sorting': {
      const nums = t.sortingConfig?.numbers ?? [];
      return `Сортировка: числа от ${Math.min(...nums)} до ${Math.max(...nums)}`;
    }
    case 'spreadsheet':
      return `Сумма строк: ${rowNames(t).join(', ')}`;
    case 'wireframe_builder':
      return t.wireframeConfig?.screenTitle ? `Макет экрана: ${t.wireframeConfig.screenTitle.replace(/[«»]/g, '')}` : 'Макет экрана: шапка, главная область, кнопки';
    case 'network_route': {
      const c = t.networkConfig;
      return c ? `Маршрут данных: ${nodeLabel(t, c.startNode)} → ${nodeLabel(t, c.endNode)}` : undefined;
    }
    default:
      return undefined;
  }
}

export function describeTask(task: Task): TaskCopy {
  return { goal: goalFor(task), steps: stepsFor(task), title: titleFor(task) };
}

// Применяем только там, где текст действительно шаблонный:
// goal дублируется, steps повторяются у ≥5 не-quiz заданий, title дублируется в курсе.
export function applyTrainerCopy(tasks: Task[]): Task[] {
  const goalCount = new Map<string, number>();
  const stepsCount = new Map<string, number>();
  const titleCount = new Map<string, number>();
  for (const t of tasks) {
    const goal = t.lesson?.goal;
    if (goal) goalCount.set(goal, (goalCount.get(goal) ?? 0) + 1);
    if (t.type !== 'quiz') {
      const key = JSON.stringify(t.lesson?.steps ?? []);
      stepsCount.set(key, (stepsCount.get(key) ?? 0) + 1);
    }
    const titleKey = `${t.courseId}|${t.title}`;
    titleCount.set(titleKey, (titleCount.get(titleKey) ?? 0) + 1);
  }
  return tasks.map(t => {
    const needGoal = !!t.lesson?.goal && (goalCount.get(t.lesson.goal) ?? 0) > 1;
    const needSteps = t.type !== 'quiz'
      && (stepsCount.get(JSON.stringify(t.lesson?.steps ?? [])) ?? 0) >= 5;
    const needTitle = (titleCount.get(`${t.courseId}|${t.title}`) ?? 0) > 1;
    if (!needGoal && !needSteps && !needTitle) return t;
    const copy = describeTask(t);
    const title = needTitle && copy.title ? copy.title : t.title;
    const lesson = (needGoal || needSteps) && t.lesson
      ? {
          ...t.lesson,
          goal: needGoal && copy.goal ? copy.goal : t.lesson.goal,
          steps: needSteps && copy.steps ? copy.steps : t.lesson.steps,
        }
      : t.lesson;
    return { ...t, title, lesson };
  });
}
