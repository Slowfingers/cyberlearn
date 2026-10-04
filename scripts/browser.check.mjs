import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';
const server = await createServer({define:{'import.meta.env.VITE_LOCAL_DEMO':JSON.stringify('false')},server:{port:3101,host:'127.0.0.1',strictPort:true}});
await server.listen();
const browser = await chromium.launch({headless:true});
const page = await browser.newPage();
try {
  await page.goto('http://127.0.0.1:3101');
  await page.getByRole('button',{name:'Кабинет учителя'}).waitFor();
  assert.ok(!(await page.locator('meta[name=viewport]').getAttribute('content')).includes('user-scalable=no'));
  await page.getByRole('button',{name:'Я ученик'}).click();
  await page.locator('#student-password').waitFor();
  const student = {id:'methodology-test',name:'Учебный профиль',role:'student',xp:0,currency:0,level:1,inventory:[],achievements:[],completedTaskIds:[],equipped:{avatar:'0',droneColor:'col_default'}};
  await page.route('**/api', async route => {
    const headers = {'access-control-allow-origin':'*','access-control-allow-headers':'content-type,authorization','access-control-allow-methods':'POST,OPTIONS'};
    if (route.request().method() === 'OPTIONS') { await route.fulfill({status:204,headers}); return; }
    const request = route.request().postDataJSON();
    const op = request?.data?.operation;
    await route.fulfill({headers,json:{result:op === 'getUser' ? student : ['listTasks','listClassrooms'].includes(op) ? [] : null}});
  });
  // Проверяем учебные экраны без зависимости от развёрнутого Firebase.
  await page.evaluate(async () => {
    const ReactModule = await import('/node_modules/.vite/deps/react.js');
    const React = ReactModule.default ?? ReactModule;
    const Client = await import('/node_modules/.vite/deps/react-dom_client.js');
    const {createRoot} = Client.default ?? Client;
    const {MOCK_TASKS} = await import('/constants.ts');
    const {BigMascotTheoryStory} = await import('/components/BigMascotTheoryStory.tsx');
    const {SpreadsheetGame} = await import('/components/interactives/SpreadsheetGame.tsx');
    const {default:StudentDashboard} = await import('/components/StudentDashboard.tsx');
    const node = document.createElement('div');
    node.id = 'lesson-test';
    node.className = 'fixed inset-0 z-[9999] bg-gray-950 overflow-auto p-6';
    document.body.append(node);
    const root = createRoot(node);
    window.__completed = 0;
    window.__renderLesson = (id, kind) => {
      const task = MOCK_TASKS.find(t => t.id === id);
      root.render(React.createElement(kind === 'table' ? SpreadsheetGame : BigMascotTheoryStory, {
        task, onComplete: () => { window.__completed++; }, onStartPractice: () => { window.__completed++; }
      }));
    };
    window.__renderDashboard = currentUser => root.render(React.createElement(StudentDashboard, {currentUser}));
    window.__removeLesson = () => { root.unmount(); node.remove(); };
    window.__renderLesson('g3_m2_l6', 'lesson');
  });
  const harness = page.locator('#lesson-test');
  await harness.getByRole('heading', {name:'Биты и байты', exact:true}).waitFor();
  assert.equal(await harness.getByRole('list').count(), 0, 'План не перегружает основное объяснение');
  await harness.getByRole('button', {name:'Нужен план действий?'}).click();
  assert.equal(await harness.getByRole('listitem').count(), 3);
  await harness.getByRole('button', {name:'Уже знаю тему — к заданию'}).click();
  await harness.getByRole('button', {name:'Попробовать самому'}).click();
  await page.waitForFunction(() => window.__completed === 1);
  await page.setViewportSize({width:390,height:844});
  assert.ok(await harness.evaluate(node => node.scrollWidth <= node.clientWidth), 'Объяснение помещается на мобильном экране');
  await page.screenshot({path:'/private/tmp/cyberlearn-lesson-mobile.png'});
  await page.setViewportSize({width:1280,height:900});
  const tables = await page.evaluate(async () => {
    const {MOCK_TASKS} = await import('/constants.ts');
    return MOCK_TASKS.filter(t => t.type === 'spreadsheet').map(t => ({id:t.id,formula:t.spreadsheetConfig.targetFormula}));
  });
  let completed = 1;
  for (const task of tables) {
    await page.evaluate(id => window.__renderLesson(id, 'table'), task.id);
    const input = harness.getByRole('textbox');
    await input.waitFor();
    await page.waitForFunction(() => document.querySelector('#lesson-test input')?.value === '');
    await input.fill('=10');
    await harness.getByRole('button',{name:'Проверить',exact:true}).click();
    await harness.getByRole('alert').waitFor();
    assert.equal(await page.evaluate(() => window.__completed), completed, task.id + ': число не заменяет нужную формулу');
    await input.fill(task.formula);
    await harness.getByRole('button',{name:'Проверить',exact:true}).click();
    completed++;
    await page.waitForFunction(count => window.__completed === count, completed);
    await harness.getByRole('status').waitFor();
    if (task.id === 'g7_l41') {
      assert.equal(await harness.getByRole('cell',{name:'Зачёт',exact:true}).count(),2);
      assert.equal(await harness.getByRole('cell',{name:'Доработать',exact:true}).count(),1);
    }
    if (task.id === 'g3_m8_l1') assert.equal(await harness.getByRole('cell',{name:'300',exact:true}).count(),1);
    if (task.id === 'g4_l24') await harness.getByRole('cell',{name:'275',exact:true}).waitFor();
  }
  await page.evaluate(currentUser => window.__renderDashboard(currentUser), student);
  await harness.getByRole('heading',{name:'3 класс · Первые шаги с компьютером',exact:true}).waitFor({timeout:10000}).catch(async error => { console.error(await harness.innerText()); throw error; });
  await harness.getByRole('heading',{name:'3 класс · Первые шаги с компьютером',exact:true}).click();
  await harness.getByText('Считаем биты в байтах',{exact:true}).click();
  await harness.getByRole('heading',{name:'Биты и байты',exact:true}).waitFor();
  await harness.getByRole('button',{name:'Уже знаю тему — к заданию'}).click();
  assert.equal(await harness.getByRole('button',{name:'Попробовать самому'}).count(),1);
  await harness.getByRole('button',{name:'Попробовать самому'}).click();
  await harness.getByRole('heading',{name:'Один байт состоит из 8 бит. Сколько бит в двух байтах?',exact:true}).waitFor();
  await harness.getByRole('button',{name:'К объяснению',exact:true}).click();
  await harness.getByRole('heading',{name:'Главная идея',exact:true}).waitFor();
  await page.screenshot({path:'/private/tmp/cyberlearn-course-desktop.png'});
  await page.evaluate(() => window.__removeLesson());
  const htmlResults = await page.evaluate(async () => {
    const {evaluateCodeLocally} = await import('/services/localEvaluation.ts');
    const {MOCK_TASKS} = await import('/constants.ts');
    const html = MOCK_TASKS.filter(t => t.type === 'html');
    const checks = [];
    for (const task of html) {
      const requirement = task.htmlConfig?.targetStyle;
      const selector = task.htmlConfig?.targetTag;
      const solution = requirement?.includes(':') ? `${task.initialCode}<style>${selector} {${requirement}}</style>` : task.initialCode;
      checks.push({id:task.id,...await evaluateCodeLocally(solution,task)});
    }
    const task = html.find(t => t.htmlConfig?.targetStyle === 'color: cyan;');
    const bad = await evaluateCodeLocally('<button style="color:red">Test</button>',task);
    const good = await evaluateCodeLocally('<button style="color:#00ffff">Test</button>',task);
    return {checks,bad,good};
  });
  assert.ok(htmlResults.checks.every(r => r.success),JSON.stringify(htmlResults.checks.filter(r => !r.success)));
  assert.equal(htmlResults.bad.success,false);
  assert.equal(htmlResults.good.success,true);
  const results = await page.evaluate(async () => {
    const {checkTerminal,terminalLanguage} = await import('/services/terminal.ts');
    const {MOCK_TASKS} = await import('/constants.ts');
    const results = [];
    for (const language of ['python','javascript','sql']) {
      const task = MOCK_TASKS.find(t => t.type === 'terminal' && terminalLanguage(t) === language);
      try {
        const output = await checkTerminal(task.initialCode,task);
        let rejected = false;
        try { await checkTerminal(language === 'javascript' ? 'console.log("anything")' : language === 'sql' ? 'SELECT 1;' : 'print("anything")',task); }
        catch { rejected = true; }
        results.push({language,output,rejected});
      } catch (error) { results.push({language,error:error.message}); }
    }
    return results;
  });
  for (const result of results) { assert.ok(!result.error,JSON.stringify(result)); assert.ok(result.rejected,JSON.stringify(result)); }
  // Check the full Python curriculum with the same interpreter and fresh globals.
  const python = await page.evaluate(async () => {
    const {checkTerminal,terminalLanguage} = await import('/services/terminal.ts');
    const {MOCK_TASKS} = await import('/constants.ts');
    const tasks = MOCK_TASKS.filter(t => t.type === 'terminal' && terminalLanguage(t) === 'python');
    const failures = [];
    for (const task of tasks) try { await checkTerminal(task.initialCode,task); } catch (error) { failures.push({id:task.id,error:error.message}); }
    return {count:tasks.length,failures};
  });
  assert.deepEqual(python.failures,[]);
  console.log(`browser.check: course navigation, lesson layout, ${tables.length} configurable tables, login, zoom, ${htmlResults.checks.length} HTML lessons, Python/JS/SQL wrong answers and ${python.count} Python lessons OK`);
} finally { await browser.close(); await server.close(); }
