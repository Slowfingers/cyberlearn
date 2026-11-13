import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';
const server = await createServer({server:{port:3105,host:'127.0.0.1',strictPort:true}});
await server.listen();
const { MOCK_TASKS } = await server.ssrLoadModule('/constants.ts');
const { getMentorQuestion } = await server.ssrLoadModule('/curriculum/mentorActivities.ts');
const browser = await chromium.launch({headless:true});
const page = await browser.newPage();
try {
  await page.goto('http://127.0.0.1:3105/layout-audit.html');
  await page.getByLabel('Проверка задания',{exact:true}).waitFor();
  const ids = await page.getByLabel('Проверка задания',{exact:true}).locator('option').evaluateAll(es=>es.map(e=>e.value));
  for (const width of [320,390,512,640,768,960,1280,1440]) {
    await page.setViewportSize({width,height:844});
    for (const id of ids) {
      await page.getByLabel('Проверка задания',{exact:true}).selectOption(id);
      const metrics = await page.evaluate(()=>{
        const task=document.querySelector('.academy-task-brief').getBoundingClientRect();
        const activity=document.querySelector('.academy-practice-content').getBoundingClientRect();
        const overflow=[...document.querySelectorAll('.academy-practice-content *')].filter(e=>e instanceof HTMLElement&&e.clientWidth>0&&e.scrollWidth>e.clientWidth+3&&getComputedStyle(e).overflowX==='visible'&&e.getClientRects().length).map(e=>`${e.tagName}.${e.className}`);
        const clippedHeaders=[...document.querySelectorAll('.academy-practice-content .workshop-header')].flatMap(header=>{
          const bounds=header.getBoundingClientRect();
          return [...header.querySelectorAll('h2,p,button')].filter(element=>{
            const rect=element.getBoundingClientRect();
            return rect.width && rect.height && (rect.left < bounds.left - 1 || rect.right > bounds.right + 1 || rect.top < bounds.top - 1 || rect.bottom > bounds.bottom + 1);
          }).map(element=>`${element.tagName}: ${element.textContent?.trim().slice(0,80)}`);
        });
        return {gap:activity.top-task.bottom,page:document.documentElement.scrollWidth,overflow,clippedHeaders};
      });
      assert.ok(metrics.gap>=15,`${id} at ${width}: task overlaps activity`);
      assert.ok(metrics.page<=width,`${id} at ${width}: page overflow`);
      assert.deepEqual(metrics.overflow,[],`${id} at ${width}: content overflow`);
      assert.deepEqual(metrics.clippedHeaders,[],`${id} at ${width}: header content clipped`);
    }
  }
  await page.getByLabel('Проверка экрана',{exact:true}).selectOption('theory');
  await page.setViewportSize({width:320,height:844});
  const lessons=await page.getByLabel('Проверка задания',{exact:true}).locator('option').evaluateAll(es=>es.map(e=>e.value));
  for(const id of lessons){
    await page.getByLabel('Проверка задания',{exact:true}).selectOption(id);
    const example=page.locator('.mentor-stage-nav button').nth(1);
    if(await example.count())await example.click();
    if (/^g3_m(?:[3-9]|10)_/.test(id)) {
      const workedExample = page.getByRole('region', {name: 'Разбор по шагам'});
      await workedExample.waitFor();
      const next = workedExample.getByRole('button', {name: 'Следующий шаг'});
      const back = workedExample.getByRole('button', {name: 'Назад', exact: true});
      const first = await workedExample.locator('h2').textContent();
      assert.ok(await back.isDisabled(), `${id}: starts at first step`);
      await next.click();
      await next.click();
      assert.ok(await next.isDisabled(), `${id}: stops at last step`);
      assert.notEqual(await workedExample.locator('h2').textContent(), first, `${id}: example advances`);
      assert.ok(await workedExample.evaluate(element => element.scrollWidth <= element.clientWidth + 1), `${id}: example fits at 320px`);
      await back.click();
      await back.click();
      assert.equal(await workedExample.locator('h2').textContent(), first, `${id}: can review previous steps`);
      await page.getByRole('button', {name: 'Проверить понимание', exact: true}).last().click();
      const brief = page.getByRole('button', {name: 'Прочитать задание', exact: true});
      const question = getMentorQuestion(MOCK_TASKS.find(task => task.id === id));
      const wrong = question.options.find((_, index) => index !== question.correct);
      await page.getByRole('button', {name: wrong.text, exact: true}).click();
      assert.ok(await brief.isDisabled(), `${id}: incorrect answer can be retried`);
      await page.getByRole('button', {name: question.options[question.correct].text, exact: true}).click();
      await brief.click();
      await page.getByRole('button', {name: 'Начать задание', exact: true}).waitFor();
    }
    const overflow=await page.evaluate(()=>[...document.querySelectorAll('.mentor-lesson *')].filter(e=>e instanceof HTMLElement&&e.clientWidth>0&&e.scrollWidth>e.clientWidth+3&&getComputedStyle(e).overflowX==='visible'&&e.getClientRects().length).map(e=>`${e.tagName}.${e.className}: ${e.outerHTML.slice(0,180)}`));
    assert.deepEqual(overflow,[],`${id}: narrow explanation overflow`);
  }
  console.log(`layout.browser.check: ${ids.length} activities at 8 widths, task separation, header and content bounds verified`);
} finally { await browser.close(); await server.close(); }
