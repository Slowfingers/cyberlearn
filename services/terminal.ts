import { Task } from '../types';

export function terminalLanguage(task: Task): 'python' | 'javascript' | 'sql' | 'shell' {
  const reference = (task.initialCode || '').replace(/^\s*#.*$/gm, '').trim();
  if (/^(SELECT|CREATE|INSERT|UPDATE|DELETE)\b/i.test(reference)) return 'sql';
  if (/^(const|let|var)\b/.test(reference)) return 'javascript';
  if (task.terminalConfig || /^(pwd|whoami|mkdir|cat|python3|ping|git)\b/.test(reference)) return 'shell';
  return 'python';
}
export const normalizeOutput = (value: string) => value.trim().split('\n').map(line => line.trim().replace(/\s+/g, ' ')).join('\n');

/** The shell is a virtual classroom filesystem; commands never reach the host OS. */
export function runShell(code: string, task: Task) {
  const files: Record<string,string> = { 'access.log': Array.from({length:14},(_,i) => `request ${i} 404 Not Found`).join('\n'), 'src/main.py':'production service', 'welcome.txt':'Добро пожаловать в командную строку инженера 6 класса! Терминал покорен.' };
  try { Object.assign(files, JSON.parse(task.terminalConfig?.fileSystem || '{}')); } catch { /* legacy comma-separated directory listing */ }
  const dirs = new Set(['documents','projects','src']);
  let cwd = '', initialized = task.id === 'g6_m8_l5' || !/git init/.test(task.initialCode || ''), staged = false, committed = false, pushed = false;
  const executed: string[] = [], output: string[] = [];
  const path = (name: string) => [cwd,name].filter(Boolean).join('/').replace(/^\.\//, '');
  for (const raw of code.split('\n')) {
    const line = raw.trim();
    if (!line || line.startsWith('#') || line.startsWith('//')) continue;
    const pipeline = line.split('|');
    let stream = '';
    for (const segment of pipeline) {
      const tokens = segment.trim().match(/"[^"]*"|'[^']*'|[^\s]+/g)?.map(t => t.replace(/^(['"])(.*)\1$/, '$2')) || [];
      const [command,...args] = tokens;
      executed.push(`${command} ${args.join(' ')}`.trim());
      if (command === 'pwd' && !args.length) stream = `/home/cyberstudent/workspace${cwd ? '/'+cwd : ''}`;
      else if (command === 'whoami' && !args.length) stream = 'cyberstudent';
      else if (command === 'ls') {
        const target = path(args.find(a => !a.startsWith('-')) || '');
        stream = [...new Set([...dirs,...Object.keys(files)].filter(p => !target || p.startsWith(target+'/')).map(p => target ? p.slice(target.length+1) : p))].join('\n');
      } else if (command === 'cat' && args.length === 1) {
        if (!(path(args[0]) in files)) throw new Error(`Файл ${args[0]} не найден`);
        stream = files[path(args[0])];
      } else if (command === 'grep' && args.length === 1) stream = stream.split('\n').filter(l => l.includes(args[0])).join('\n');
      else if (command === 'wc' && args.join(' ') === '-l') stream = String(stream ? stream.split('\n').length : 0);
      else if (command === 'mkdir' && args.length === 1) { dirs.add(path(args[0])); stream = `Создан каталог ${args[0]}`; }
      else if (command === 'touch' && args.length === 1) {
        const filename = path(args[0]), parent = filename.split('/').slice(0,-1).join('/');
        if (parent && !dirs.has(parent)) throw new Error('Сначала создайте каталог');
        files[filename] = ''; stream = `Создан файл ${args[0]}`;
      } else if (command === 'cd' && args.length === 1 && (dirs.has(path(args[0])) || args[0] === '..')) { cwd = args[0] === '..' ? cwd.split('/').slice(0,-1).join('/') : path(args[0]); stream = ''; }
      else if (command === 'git' && args[0] === 'init' && args.length === 1) { initialized = true; stream = 'Репозиторий создан'; }
      else if (command === 'git' && args.join(' ') === 'add .' && initialized) { staged = true; stream = 'Файлы добавлены'; }
      else if (command === 'git' && args[0] === 'commit' && args[1] === '-m' && args.length === 3 && staged) { committed = true; staged = false; stream = `Коммит: ${args[2]}`; }
      else if (command === 'git' && args.join(' ') === 'push origin main' && committed) { pushed = true; stream = 'Учебная ветка main отправлена в виртуальный репозиторий'; }
      else if (command === 'python3' && args.join(' ') === 'src/main.py --mode=production' && files['src/main.py']) stream = 'Starting src/main.py in PRODUCTION mode';
      else if (command === 'ping' && args.join(' ') === '-c 3 8.8.8.8') stream = 'Учебная сеть: 3 пакета переданы, 3 получены, потери 0%';
      else throw new Error(`Команда не поддерживается в учебном терминале: ${segment.trim()}`);
    }
    if (stream) output.push(stream);
  }
  return { output:output.join('\n'), files, dirs:[...dirs].sort(), cwd, committed, pushed, executed };
}
export function checkShell(code: string, task: Task) {
  const actual = runShell(code, task), expected = runShell(task.initialCode || '',task);
  const required = expected.executed.filter(c => !c.startsWith('git commit -m '));
  if (!required.every(c => actual.executed.includes(c)) || actual.committed !== expected.committed || actual.pushed !== expected.pushed || actual.cwd !== expected.cwd || JSON.stringify(actual.files) !== JSON.stringify(expected.files)) throw new Error('Команды не достигают цели задания. Проверьте файлы, параметры и порядок действий.');
  return actual.output;
}

export async function checkTerminal(code: string, task: Task): Promise<string> {
  const language = terminalLanguage(task);
  if (!code.trim()) throw new Error('Введите код или команды');
  if (language === 'shell') return checkShell(code,task);
  // A disposable worker isolates runs and lets the main thread stop infinite loops.
  return new Promise((resolve,reject) => {
    const worker = new Worker('/terminal-worker.mjs', { type:'module' });
    let executionTimer: ReturnType<typeof setTimeout>;
    const loadingTimer = setTimeout(() => finish(new Error('Не удалось загрузить среду выполнения. Проверьте соединение.')),60000);
    const finish = (error?: Error, output?: string) => {
      clearTimeout(loadingTimer); clearTimeout(executionTimer); worker.terminate();
      if (error) reject(error); else resolve(output || '');
    };
    worker.onerror = () => finish(new Error('Ошибка загрузки среды выполнения'));
    worker.onmessage = event => {
      if (event.data.ready) {
        clearTimeout(loadingTimer);
        executionTimer = setTimeout(() => finish(new Error('Превышено время выполнения (5 секунд)')),5000);
      } else if (event.data.error) finish(new Error(event.data.error));
      else if (typeof event.data.output === 'string') {
        if (normalizeOutput(event.data.output) !== normalizeOutput(event.data.expected)) finish(new Error('Вывод программы не совпадает с целью задания'));
        else finish(undefined,event.data.output);
      }
    };
    worker.postMessage({language, code, reference:task.initialCode, tests:task.terminalTests, setup:task.terminalSetup});
  });
}
