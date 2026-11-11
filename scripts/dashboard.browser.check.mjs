// Integrated student dashboard check against a scoped in-page mock of POST /api/local. Never contacts a real backend.
// Run: node scripts/dashboard.browser.check.mjs   (SHOT_DIR overrides screenshot folder)
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';

const SHOTS = process.env.SHOT_DIR || 'artifacts/dashboard';
mkdirSync(SHOTS, { recursive: true });
const server = await createServer({ server: { port: 3107, host: '127.0.0.1', strictPort: true } });
await server.listen();
const { MOCK_TASKS, COURSES } = await server.ssrLoadModule('/constants.ts');
const { cleanLessonTitle } = await server.ssrLoadModule('/utils/theoryText.ts');
const browser = await chromium.launch({ headless: true });
const problems = [];
const apiOps = [];

const specialized = /^g3_m(1_l[1-7]|2_l[1-7])$/;
const requestedTypes = process.env.DASHBOARD_TYPES ? new Set(process.env.DASHBOARD_TYPES.split(',')) : null;
const wanted = ['quiz', 'grid', 'typing', 'process_manager', 'spreadsheet', 'sorting', 'tree_search', 'phishing_detect', 'ai_neuron', 'network_route', 'file_organizer', 'binary_bulbs', 'wireframe_builder', 'circuit_builder', 'fake_detector', 'ai_kids_trainer', 'hanoi', 'terminal', 'html'].filter(type => !requestedTypes || requestedTypes.has(type));
const scenarios = [];
wanted.forEach((type, i) => {
  const grades = COURSES.map(c => c.id);
  for (let shift = 0; shift < grades.length; shift++) {
    const course = grades[(i + shift) % grades.length];
    const task = MOCK_TASKS.find(t => t.courseId === course && t.type === type && !specialized.test(t.id) && !['assessment'].includes(t.type));
    if (task) { scenarios.push(task); break; }
  }
});
assert.ok(scenarios.length >= (requestedTypes ? 1 : 8), `need a broad scenario set, got ${scenarios.length}`);

const baseUser = { id: 'fixture-student', name: 'Саша', role: 'student', classId: 'fixture_class', xp: 120, currency: 50, level: 2, tasksCompleted: 0, totalErrors: 0, inventory: ['av_1', 'col_default', 'frame_none', 'skin_sparky'], achievements: [], equipped: { avatar: 'av_1', droneColor: 'col_default', avatarFrame: 'frame_none', mascotSkin: 'skin_sparky' } };

async function openPage(width, height, completedIds, hiddenCourses = []) {
  const page = await browser.newPage({ viewport: { width, height } });
  page.on('pageerror', e => problems.push(`pageerror: ${e.message}`));
  page.on('console', m => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });
  page.on('response', r => { if (r.status() >= 400) problems.push(`http ${r.status()}: ${r.url()}`); });
  page.on('requestfailed', r => problems.push(`request failed: ${r.url()} ${r.failure()?.errorText ?? ''}`));
  await page.route(/\/api\/(?!local$)/, route => { problems.push(`unexpected api: ${route.request().url()}`); return route.abort(); });
  await page.route('**/api/local', async route => {
    const body = route.request().postDataJSON();
    apiOps.push(body.operation);
    const user = () => ({ ...baseUser, completedTaskIds: completedIds });
    let data = null;
    switch (body.operation) {
      case 'getUser': data = user(); break;
      case 'studentDashboard': data = {user:user(), tasks:[], hiddenCourses}; break;
      case 'listTasks': case 'listUsers': case 'listFolders': data = []; break;
      case 'listClassrooms': data = [{ id: 'fixture_class', teacherId: 'fixture_teacher', name: 'Класс', inviteCode: 'X', studentIds: [baseUser.id], hiddenCourses }]; break;
      case 'getLessonCheckpoint': data = { checkpoint: null, version: '' }; break;
      case 'getPracticeDraft': data = { draft: null }; break;
      case 'completeTask': data = { user: { ...user(), completedTaskIds: [...completedIds, body.taskId] }, awarded: true }; break;
      default: data = null;
    }
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ data }) });
  });
  await page.goto('http://127.0.0.1:3107/');
  return page;
}

const noOverflow = async (page, label) => {
  const width = page.viewportSize().width;
  assert.ok(await page.evaluate(() => document.documentElement.scrollWidth) <= width, `${label}: horizontal overflow`);
};
const backToCampaign = async (page) => {
  const back = page.getByRole('button', { name: 'К кампании' });
  if (!(await back.isVisible())) await page.getByRole('button', { name: /Меню курса|Уроки/ }).first().click();
  await back.click();
  await page.getByLabel('Класс / Кампания').waitFor();
};

try {
  for (const [width, height] of [[1440, 900], [390, 844]]) {
    for (const task of scenarios) {
      const before = MOCK_TASKS.filter(t => t.courseId === task.courseId).map(t => t.id);
      const completed = before.slice(0, before.indexOf(task.id));
      const page = await openPage(width, height, completed);
      await page.getByLabel('Класс / Кампания').waitFor();
      await page.getByLabel('Класс / Кампания').selectOption(task.courseId);
      const regionTasks = MOCK_TASKS.filter(t => t.courseId === task.courseId && t.module === task.module);
      await page.locator('.campaign-region', { hasText: task.module }).first().click();
      await page.locator(`.campaign-node[data-mission-id="${task.id}"]`).click();
      assert.equal(await page.locator('.campaign-brief h1').innerText(), cleanLessonTitle(task.title), `${task.id}: brief shows the selected mission`);
      await noOverflow(page, `${task.id} campaign @${width}`);
      await page.locator('.campaign-brief .ui-button').click();
      await page.locator('.mentor-lesson').first().waitFor({ timeout: 60000 });
      await page.screenshot({ path: `${SHOTS}/${task.type}-${task.id}-explanation-${width}.png` });
      await noOverflow(page, `${task.id} explanation @${width}`);
      const skip = page.getByRole('button', { name: 'Пропустить объяснение' });
      if (await skip.count()) await skip.click();
      await page.getByRole('button', { name: 'Начать задание' }).first().click();
      await page.locator('.mentor-lesson').first().waitFor({ state: 'detached' });
      await page.getByText('ЗАГРУЖАЕМ_ЛАБОРАТОРИЮ').waitFor({ state: 'detached', timeout: 60000 }).catch(() => {});
      await page.locator('.lesson-phases li.is-current', { hasText: 'Практика' }).first().waitFor({ timeout: 60000 }).catch(() => {});
      await page.screenshot({ path: `${SHOTS}/${task.type}-${task.id}-practice-${width}.png` });
      await noOverflow(page, `${task.id} practice @${width}`);
      await backToCampaign(page);
      await page.close();
    }
  }

  const gridTask = MOCK_TASKS.find(t => t.id === 'g4_l10');
  assert.ok(gridTask?.mapConfig && gridTask.initialCode, 'g4_l10 has a reference route in initialCode');
  const gridBefore = MOCK_TASKS.filter(t => t.courseId === gridTask.courseId).map(t => t.id);
  const page = await openPage(1440, 900, gridBefore.slice(0, gridBefore.indexOf(gridTask.id)));
  await page.getByLabel('Класс / Кампания').selectOption(gridTask.courseId);
  const gridRegion = MOCK_TASKS.filter(t => t.courseId === gridTask.courseId && t.module === gridTask.module);
  await page.locator('.campaign-region', { hasText: gridTask.module }).first().click();
  await page.locator(`.campaign-node[data-mission-id="${gridTask.id}"]`).click();
  await page.locator('.campaign-brief .ui-button').click();
  await page.locator('.mentor-lesson').first().waitFor({ timeout: 60000 });
  const skipGrid = page.getByRole('button', { name: 'Пропустить объяснение' });
  if (await skipGrid.count()) await skipGrid.click();
  await page.getByRole('button', { name: 'Начать задание' }).first().click();
  await page.locator('.mission-grid canvas').first().waitFor({ timeout: 60000 });
  assert.equal(await page.locator('.mission-grid').getAttribute('data-view'), 'top', 'route opens in clear cardinal top view');
  assert.equal((await page.locator('.mission-grid__dir--S').innerText()).replace(/\s/g,''), '↓Вниз');
  await page.screenshot({ path: `${SHOTS}/grid-dashboard-1440.png` });
  const columns=await Promise.all(['.mission-lesson-brief','.mission-visual','.mission-code'].map(selector=>page.locator(selector).boundingBox()));
  assert.ok(columns.every(Boolean) && columns[0].x+columns[0].width <= columns[1].x+1 && columns[1].x+columns[1].width <= columns[2].x+1, 'wide grid has explanation, scene and program in three columns');
  const position = () => page.locator('.mission-grid__status span').first().innerText();
  const start = await position();
  const edit = page.getByRole('button', { name: 'Редактировать код' });
  if (await edit.count()) await edit.click();
  await page.getByLabel('Код решения').fill(gridTask.initialCode);
  await page.getByRole('button', { name: 'Запустить' }).first().click();
  await page.getByText('Задание выполнено').first().waitFor({ timeout: 30000 });
  const afterRun = await position();
  assert.notEqual(afterRun, start, 'running the reference route moves the hero');
  await page.getByRole('button', { name: 'Вид сверху' }).click();
  assert.equal(await position(), afterRun, 'direction/view toggle keeps hero state');
  await page.getByRole('button', { name: 'Объёмный вид' }).click();
  assert.equal((await page.locator('.mission-grid__dir--S').innerText()).replace(/\s/g,''), '↘Вниз-вправо');
  const restart = page.getByRole('button', { name: 'Вернуть героя на старт' });
  if (await restart.count()) {
    await restart.click();
    assert.equal(await position(), start, 'restart returns the hero to the start');
  }
  await page.close();

  const locked = await openPage(1440, 900, [], COURSES.map(c => c.id));
  await locked.getByLabel('Класс / Кампания').waitFor();
  assert.match(await locked.locator('.campaign-empty').first().innerText(), /закрыты/);
  await locked.close();

  const nav = await openPage(1440, 900, []);
  await nav.getByLabel('Класс / Кампания').waitFor();
  assert.equal(await nav.getByRole('navigation',{name:'Главная навигация'}).getByRole('button',{name:'Достижения',exact:true}).count(),0);
  await nav.getByRole('button', { name: 'Герой' }).click();
  await nav.getByRole('dialog').waitFor();
  await nav.locator('#profile-achievements').waitFor();
  assert.ok((await nav.locator('#profile-achievements').innerText()).includes('Достижения'));
  await nav.keyboard.press('Escape');
  await nav.getByRole('button', { name: 'Магазин' }).click();
  await nav.getByRole('dialog').waitFor();
  await nav.close();

  assert.deepEqual(problems, [], `browser problems:\n${problems.join('\n')}`);
  console.log(`dashboard.browser.check: ${scenarios.length} missions (${scenarios.map(t => t.type).join(', ')}) at 1440/390; API operations used: ${[...new Set(apiOps)].join(', ')}; shots in ${SHOTS}`);
} catch (error) {
  console.error(`dashboard.browser.check failed. Collected browser problems:\n${problems.join('\n') || '(none)'}`);
  throw error;
} finally { await browser.close(); await server.close(); }
