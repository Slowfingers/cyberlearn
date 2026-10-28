// Isolated fixtures only: player identity, movement, collisions, jump, attack and reduced motion.
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';
const shots = 'artifacts/grid-avatar';
mkdirSync(shots, { recursive: true });
const server = await createServer({ server: { host: '127.0.0.1', port: 3109, strictPort: true } });
await server.listen();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 950 } });
const problems = [];
page.on('pageerror', e => problems.push(e.message));
page.on('response', r => { if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`); });
await page.route('**/api/**', r => { problems.push('Unexpected API access'); return r.abort(); });
const hero = page.locator('.mission-grid__hero');
async function pick(id, code) {
  await page.getByLabel('Миссия-сетка').selectOption(id);
  if (!await page.getByLabel('Код решения').count()) await page.getByRole('button', { name: 'Редактировать код' }).click();
  await page.getByLabel('Код решения').fill(code);
}
async function start() {
  await page.locator('.mission-grid').scrollIntoViewIfNeeded();
  await page.getByRole('button', { name: 'Запустить', exact: true }).evaluate(button => button.click());
}
async function run(expected) {
  await start();
  await page.waitForFunction(expected => document.querySelector('.mission-grid').dataset.outcome === expected, expected);
  await page.waitForFunction(() => document.querySelector('.mission-grid__hero').dataset.moving === 'false');
}
try {
  await page.goto('http://127.0.0.1:3109/campaign-audit.html');
  await page.getByLabel('Экран').selectOption('grid');
  for (const identity of ['numeric', 'street', 'modular']) {
    await page.getByLabel('Герой', { exact: true }).selectOption(identity);
    assert.equal(await hero.locator(':scope > svg').count(), 1);
  }
  await pick('g3_m3_l1', 'forward()\nforward()\nforward()');
  await page.locator('.mission-grid').scrollIntoViewIfNeeded();
  const startBox = await hero.evaluate(e => { const r=e.getBoundingClientRect(),s=e.parentElement.getBoundingClientRect();return{x:r.x-s.x,y:r.y-s.y}; });
  await page.evaluate(() => {
    window.__gridSamples = [];
    const actor = document.querySelector('.mission-grid__hero');
    window.__gridObserver = new MutationObserver(() => window.__gridSamples.push(Number(actor.dataset.gridX)));
    window.__gridObserver.observe(actor, { attributes: true, attributeFilter: ['data-grid-x'] });
    [...document.querySelectorAll('button')].find(button => button.textContent.trim() === 'Запустить').click();
  });
  await page.waitForFunction(() => document.querySelector('.mission-grid').dataset.outcome === 'success');
  const samples = await page.evaluate(() => { window.__gridObserver.disconnect(); return window.__gridSamples; });
  assert.ok(samples.some(x => Math.abs(x - Math.round(x)) > 0.02), 'hero passes through intermediate positions during a step');
  const endBox = await hero.evaluate(e => {const r=e.getBoundingClientRect(),s=e.parentElement.getBoundingClientRect();return{x:r.x-s.x,y:r.y-s.y};});
  assert.ok(endBox.x > startBox.x && endBox.y < startBox.y, 'moving east follows the up-right camera axis');
  assert.match(await page.locator('.mission-grid__guide').innerText(), /Портал достигнут/);
  assert.equal(await hero.getAttribute('data-grid-x'), '3.000');
  await page.locator('.mission-grid').screenshot({ path: `${shots}/success-1440.png` });
  await page.getByRole('button', { name: 'Вернуть героя на старт' }).click();
  await page.waitForFunction(() => document.querySelector('.mission-grid__hero').dataset.gridX === '0.000');
  assert.equal(await page.locator('.mission-line').count(), 3, 'restart preserves the program');
  await pick('g3_m3_l2', 'right()\nforward()');
  await run('retry');
  assert.equal(await hero.getAttribute('data-grid-x'), '1.000');
  assert.equal(await hero.getAttribute('data-grid-y'), '1.000', 'collision does not enter the wall');
  assert.match(await page.locator('.mission-grid__guide').innerText(), /Проверь команды/);
  await pick('g4_l28', 'drone.jump()\ndrone.move_right()');
  await start();
  await page.waitForFunction(() => document.querySelector('.mission-grid__hero').dataset.jump === 'true');
  await page.waitForFunction(() => document.querySelector('.mission-grid').dataset.outcome === 'success');
  await pick('g5_l16', 'attack()\nmoveForward()\nmoveForward()\nmoveForward()\nmoveForward()');
  await run('success');
  assert.equal(await hero.getAttribute('data-grid-x'), '4.000', 'attack clears the route');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await pick('g3_m3_l1', 'forward()\nforward()\nforward()');
  await run('success');
  assert.equal(await hero.locator(':scope > svg').evaluate(e => getComputedStyle(e).animationName), 'none');
  for (const width of [320, 390, 768, 1440]) {
    await page.setViewportSize({ width, height: 900 });
    for (const name of ['Вид сверху', 'Объёмный вид']) {
      await page.getByRole('button', { name, exact: true }).click();
      await page.waitForTimeout(80);
      const bounds = await hero.boundingBox();
      const stage = await page.locator('.mission-grid__stage').boundingBox();
      assert.ok(stage.height >= 260, `board has enough height @${width}`);
      assert.ok(bounds.x >= stage.x && bounds.x + bounds.width <= stage.x + stage.width + 1, `hero inside ${name} @${width}`);
    }
    assert.ok(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), `overflow @${width}`);
    if ([390, 1440].includes(width)) await page.locator('.mission-grid').screenshot({ path: `${shots}/grid-${width}.png` });
  }
  await page.emulateMedia({ reducedMotion: 'no-preference' });
  await pick('g3_m3_l2', 'forward()');
  await page.locator('.mission-grid').scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await page.locator('.mission-grid').screenshot({ path: `${shots}/obstacles-1440.png` });
  assert.deepEqual(problems, []);
  console.log('gridAvatar.browser.check: equipped heroes, smooth movement, collision, restart, jump, attack, portal, reduced motion and responsive views OK');
} catch (error) { console.log(await page.locator('.mission-grid').evaluate(e => ({html:e.outerHTML.slice(-2500), rect:e.getBoundingClientRect().toJSON()}))); await page.screenshot({ path: `${shots}/failure.png`, fullPage: true }); throw error; } finally { await browser.close(); await server.close(); }
