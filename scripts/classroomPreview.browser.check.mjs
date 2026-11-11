import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
const server=await createServer({server:{host:'127.0.0.1',port:3129,strictPort:true}});await server.listen();
const browser=await chromium.launch({headless:true});mkdirSync('artifacts/classroom-preview',{recursive:true});
try {
 for(const width of [390,768,1440]){
  const page=await browser.newPage({viewport:{width,height:900}});const errors=[];
  page.on('pageerror',error=>errors.push(error.message));
  await page.goto('http://127.0.0.1:3129/classroom-preview.html');
  await page.getByRole('heading',{name:'У каждого приключения есть план'}).waitFor();
  assert.equal(await page.locator('.teacher-panel').count(),1);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no horizontal page overflow');
  await page.screenshot({path:`artifacts/classroom-preview/teacher-${width}.png`,fullPage:true});
  await page.getByRole('button',{name:'Ученик',exact:true}).click();
  assert.equal(await page.locator('.teacher-panel').count(),0,'teacher notes hidden in student preview');
  await page.getByRole('button',{name:'Слайд 6: Какой шаг нужен первым?'}).click();
  await page.getByRole('button',{name:'↑ Вверх'}).click();
  assert.match(await page.getByRole('status').innerText(),/Посмотри ещё раз/);
  await page.getByRole('button',{name:'→ Вправо'}).click();
  assert.match(await page.getByRole('status').innerText(),/Верно/);
  await page.getByRole('button',{name:'Назад'}).click();
  await page.getByRole('heading',{name:'Некоторые шаги повторяются'}).waitFor();
  assert.deepEqual(errors,[]);await page.close();
 }
 console.log('classroomPreview: teacher/student views, slides, feedback and responsive bounds OK');
} finally {await browser.close();await server.close();}
