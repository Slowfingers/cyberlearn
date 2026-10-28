// Browser check for the campaign UI and grid mission. Uses campaign-audit.html only; no API calls.
// Run: node scripts/campaign.browser.check.mjs   (SHOT_DIR overrides screenshot folder)
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';

const SHOTS = process.env.SHOT_DIR || 'artifacts/campaign';
mkdirSync(SHOTS, { recursive: true });
const server = await createServer({ server: { port: 3106, host: '127.0.0.1', strictPort: true } });
await server.listen();
const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();
const problems = [];
page.on('pageerror', e => problems.push(`pageerror: ${e.message}`));
page.on('console', m => { if (m.type() === 'error') problems.push(`console: ${m.text()}`); });
page.on('request', r => { if (r.url().includes('/api/')) problems.push(`api request: ${r.url()}`); });
page.on('response', r => { if (r.status() >= 400) problems.push(`http ${r.status()}: ${r.url()}`); });
await page.route('**/api/**', route => route.abort());

const WIDTHS = [320, 390, 768, 1024, 1440];
const log = () => page.getByTestId('log').innerText();
const noOverflow = async (label) => {
  const width = page.viewportSize().width;
  const scroll = await page.evaluate(() => document.documentElement.scrollWidth);
  assert.ok(scroll <= width, `${label}: horizontal overflow ${scroll} > ${width}`);
};
const smallTargets = async (selector, label) => {
  const bad = await page.locator(selector).evaluateAll(els => els.filter(e => e.getClientRects().length).map(e => { const r = e.getBoundingClientRect(); return { n: (e.getAttribute('aria-label') || e.textContent || '').trim().slice(0, 40), w: r.width, h: r.height }; }).filter(b => b.w < 43.5 || b.h < 43.5));
  assert.deepEqual(bad, [], `${label}: touch targets under 44px`);
};
const status = () => page.locator('.mission-grid__status span').first().innerText();

try {
  await page.goto('http://127.0.0.1:3106/campaign-audit.html');
  await page.getByLabel('Класс / Кампания').waitFor();

  const courseValues = await page.getByLabel('Класс / Кампания').locator('option:not([disabled])').evaluateAll(es => es.map(e => e.value));
  assert.ok(courseValues.length >= 6, `expected at least 6 selectable courses, got ${courseValues.length}`);

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const course of courseValues) {
      await page.getByLabel('Класс / Кампания').selectOption(course);
      const regions = page.locator('.campaign-region');
      const regionCount = await regions.count();
      assert.ok(regionCount > 0, `${course}: no regions`);
      for (let r = 0; r < regionCount; r++) {
        const label = (await regions.nth(r).locator('small').innerText()).split('/')[1].trim();
        await regions.nth(r).click();
        const nodes = await page.locator('.campaign-node').count();
        assert.equal(nodes, Math.min(10, Number(label)), `${course} region ${r}: current section shows up to ten missions`);
        assert.equal(await page.locator('.campaign-mission').count(), Number(label), 'the full mission list remains available');
        await page.getByRole('button',{name:'Город курса',exact:true}).click();
      }
      await noOverflow(`${course} @${width}`);
    }
    await smallTargets('.campaign-node, .campaign-region, .campaign-nav button, .campaign-brief button, .campaign-mission-details summary', `campaign @${width}`);
  }

  await page.setViewportSize({ width: 1440, height: 900 });
  await page.getByLabel('Класс / Кампания').selectOption(courseValues[0]);
  await page.locator('.campaign-region').first().click();
  const navBox = await page.locator('.campaign-nav').boundingBox();
  assert.ok(navBox.height < 90, `desktop nav must be a compact horizontal bar, height ${navBox.height}`);
  const nodeStates = await page.locator('.campaign-node').evaluateAll(es => es.map(e => e.className));
  assert.ok(nodeStates.some(c => c.includes('--done')) && nodeStates.some(c => c.includes('--open')) && nodeStates.some(c => c.includes('--locked')), 'completed/open/locked states are all shown');
  const routeStates = await page.locator('.campaign-route').evaluateAll(es => [...new Set(es.map(e => e.getAttribute('class')))]);
  assert.ok(routeStates.length >= 2, 'routes distinguish available and unavailable segments');

  const nodes = page.locator('.campaign-node');
  await nodes.nth(0).click();
  assert.equal(await page.locator('.campaign-brief .ui-button').innerText(), 'Повторить · без новой награды');
  assert.match(await page.locator('.campaign-rewards').innerText(), /0 XP/);
  await page.locator('.campaign-brief .ui-button').click();
  assert.match(await log(), /resume=true;task=\S+/);
  const lockedIndex = nodeStates.findIndex(c => c.includes('--locked'));
  await nodes.nth(lockedIndex).click();
  assert.ok(await page.locator('.campaign-brief .ui-button').isDisabled(), 'locked mission cannot start');
  const openIndex = nodeStates.findIndex(c => c.includes('--open'));
  await nodes.nth(openIndex).click();
  assert.match(await page.locator('.campaign-rewards').innerText(), /до \d+ XP/);
  assert.ok(await page.locator('.campaign-preview').count() === 1, 'brief shows a mission preview');
  await page.locator('.campaign-brief .ui-button').click();
  assert.ok(/task=\S+/.test(await log()), `start must pass the task id, got ${await log()}`);
  assert.ok(!/CSTA|ACARA|KS3/.test(await page.locator('.campaign-brief').innerText()), 'goal text has no standards codes');

  for (const [name, expected] of [['Герой', 'profile'], ['Магазин', 'shop']]) {
    await page.getByRole('button', { name }).click();
    assert.equal(await log(), expected, `${name} nav callback`);
  }

  await page.screenshot({ path: `${SHOTS}/campaign-1440.png`, fullPage: false });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.evaluate(() => document.querySelector('.campaign').scrollIntoView({ block: 'start' }));
  await page.screenshot({ path: `${SHOTS}/campaign-390-top.png` });
  const clipped = await page.locator('.campaign-select, .campaign-select select, .campaign-map-viewport, .campaign-brief > *, .campaign-top > *').evaluateAll(els => els.map(e => { const r = e.getBoundingClientRect(); return { n: e.className || e.tagName, l: r.left, r: r.right }; }).filter(b => b.l < -0.5 || b.r > window.innerWidth + 0.5));
  assert.deepEqual(clipped, [], 'mobile campaign children stay inside the viewport');
  await page.locator('.campaign-brief').scrollIntoViewIfNeeded();
  await page.screenshot({ path: `${SHOTS}/campaign-390-brief.png` });

  const fresh = await browser.newPage({ viewport: { width: 390, height: 844 } });
  await fresh.goto('http://127.0.0.1:3106/campaign-audit.html');
  await fresh.getByLabel('Класс / Кампания').waitFor();
  await fresh.locator('.campaign-region').first().click();
  assert.equal(await fresh.locator('.campaign-mission').first().isVisible(), false, 'mission list starts collapsed on a phone');
  await fresh.getByText(/Все миссии района/).click();
  assert.ok(await fresh.locator('.campaign-mission').first().isVisible(), 'mission titles readable on mobile');
  await fresh.close();
  const mobileList = page.locator('.campaign-mission').first();
  if (!(await mobileList.isVisible())) await page.getByText(/Все миссии района/).click();
  assert.ok(await mobileList.isVisible(), 'mission titles visible after expanding');

  await page.getByLabel('Состояние').selectOption('complete');
  assert.equal(await page.locator('.campaign-node--done').count(), await page.locator('.campaign-node').count(), 'all-complete state');

  await page.getByLabel('Состояние').selectOption('current-locked');
  const selectedAfterLock = await page.getByLabel('Класс / Кампания').inputValue();
  const firstCourse = courseValues[0];
  assert.notEqual(selectedAfterLock, firstCourse, 'a course that became locked is no longer selected');

  await page.getByLabel('Состояние').selectOption('all-locked');
  assert.match(await page.locator('.campaign-empty').first().innerText(), /закрыты/);
  assert.equal(await page.locator('.campaign-brief .ui-button').count(), 0, 'no start button when every campaign is locked');
  await page.getByLabel('Состояние').selectOption('progress');

  await page.getByLabel('Экран').selectOption('grid');
  const gridIds = await page.getByLabel('Миссия-сетка').locator('option').evaluateAll(es => es.map(e => e.value));
  let builderTasks = 0;
  const identities = {};
  for (const hero of ['numeric', 'street', 'modular']) {
    await page.getByLabel('Герой').selectOption(hero);
    const root = page.locator('.mission-grid__hero > svg');
    await root.first().waitFor();
    assert.equal(await root.count(), 1, `${hero}: equipped hero is rendered`);
    identities[hero] = { label: await root.getAttribute('aria-label'), character: await root.getAttribute('data-character') };
  }
  assert.equal(identities.street.character, 'street_frost', 'street hero keeps its identity');
  assert.equal(new Set(Object.values(identities).map(i => `${i.label}|${i.character}`)).size, 3, 'three equipped heroes render three different characters');

  for (const width of WIDTHS) {
    await page.setViewportSize({ width, height: 900 });
    for (const id of gridIds) {
      await page.getByLabel('Миссия-сетка').selectOption(id);
      await page.locator('.mission-grid canvas').first().waitFor();
      const canvas = await page.locator('.mission-grid canvas').first().evaluate(c => ({ w: c.width, h: c.height }));
      assert.ok(canvas.w > 0 && canvas.h > 0, `${id} @${width}: canvas has size`);
      const before = await status();
      await page.getByRole('button', { name: 'Вид сверху' }).click();
      assert.equal(await page.locator('.mission-grid__dir--N b').innerText(), '↑');
      await page.getByRole('button', { name: 'Объёмный вид' }).click();
      assert.equal(await page.locator('.mission-grid__dir--N b').innerText(), '↖');
      assert.equal(await status(), before, `${id}: switching view keeps hero state`);
      if (await page.locator('.mission-commands').count()) {
        if (width === WIDTHS[0]) builderTasks++;
        assert.equal(await page.getByLabel('Код решения').count(), 0, `${id}: full editor hidden while the builder is active`);
        await page.getByRole('button', { name: 'Редактировать код' }).click();
        await page.getByLabel('Код решения').fill('');
        await page.getByRole('button', { name: 'Скрыть код' }).click();
        const palette = page.locator('.mission-command');
        const paletteCount = await palette.count();
        await palette.nth(0).click();
        if (paletteCount > 1) await palette.nth(1).click(); else await palette.nth(0).click();
        const items = page.locator('.mission-line');
        const before2 = await items.locator('.mission-line__text small').allInnerTexts();
        assert.equal(before2.length, 2, `${id}: two commands appended`);
        if (paletteCount > 1) {
          assert.notEqual(before2[0], before2[1], `${id}: two different commands`);
          await page.getByRole('button', { name: 'Поднять шаг 2 выше' }).click();
          assert.deepEqual(await items.locator('.mission-line__text small').allInnerTexts(), [before2[1], before2[0]], `${id}: reorder swaps the two lines`);
        }
        await page.getByRole('button', { name: 'Редактировать код' }).click();
        const source = await page.getByLabel('Код решения').inputValue();
        assert.deepEqual(source.split('\n').map(s => s.trim()).filter(s => s && !/^(#|\/\/)/.test(s)), await items.locator('.mission-line__text small').allInnerTexts(), `${id}: builder and editor share one code string`);
        await page.getByRole('button', { name: 'Скрыть код' }).click();
        await page.getByRole('button', { name: 'Удалить шаг 1' }).click();
        assert.equal(await items.count(), 1, `${id}: remove deletes one line`);
        await page.getByRole('button', { name: 'Запустить' }).click();
        await page.getByLabel('Результат запуска').filter({ hasText: /\S/ }).waitFor();
        const moved = await status();
        await page.getByRole('button', { name: 'Вернуть героя на старт' }).click();
        assert.equal(await items.count(), 1, `${id}: restarting the hero keeps the draft`);
        void moved;
        await page.getByRole('button', { name: 'Сбросить программу' }).click();
        await smallTargets('.mission-commands button', `${id} builder @${width}`);
      }
      await noOverflow(`${id} @${width}`);
    }
  }
  assert.ok(builderTasks > 0, 'at least one mission uses the command builder');

  await page.getByLabel('Миссия-сетка').selectOption(gridIds[0]);
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.locator('.mission-grid').screenshot({ path: `${SHOTS}/grid-desktop.png` });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.locator('.mission-grid-workspace').screenshot({ path: `${SHOTS}/grid-390.png` });
  await page.setViewportSize({ width: 844, height: 390 });
  await noOverflow('landscape grid');

  assert.deepEqual(problems, [], `browser problems:\n${problems.join('\n')}`);
  console.log(`campaign.browser.check: ${courseValues.length} courses, ${gridIds.length} grid missions (${builderTasks} with builder), widths ${WIDTHS.join('/')} OK; shots in ${SHOTS}`);
} finally { await browser.close(); await server.close(); }
