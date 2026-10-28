// Isolated fixture only. No school records or live API requests.
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
const server=await createServer({server:{host:'127.0.0.1',port:3137,strictPort:true}});await server.listen();const {MOCK_TASKS,COURSES}=await server.ssrLoadModule('/constants.ts');const {cleanLessonTitle}=await server.ssrLoadModule('/utils/theoryText.ts');
mkdirSync('artifacts/course-districts',{recursive:true});const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'}),errors=[];page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});await page.route('**/api/**',r=>{errors.push('unexpected API');return r.abort();});
try{
 await page.goto('http://127.0.0.1:3137/campaign-audit.html');
 for(const width of [320,390,768,1024,1440]){
  await page.setViewportSize({width,height:1000});
  for(const c of COURSES.filter(c=>c.status==='active')){
   await page.getByLabel('Класс / Кампания').selectOption(c.id);const tasks=MOCK_TASKS.filter(t=>t.courseId===c.id),modules=[...new Set(tasks.map(t=>t.module))];
   await page.waitForFunction(n=>document.querySelectorAll('.course-city-district').length===n,modules.length);
   assert.deepEqual(await page.locator('.course-city-district strong').allTextContents(),modules,'district names and order come from actual modules');
   assert.equal(await page.locator('.course-city-road').count(),Math.max(0,modules.length-1),'route connects modules in course order');
   assert.deepEqual(await page.locator('.course-city-stop text').allTextContents(),modules.map((_,i)=>String(i+1)),'stops use continuous module numbering');
   assert.equal(await page.locator('.campaign-node').count(),0,'overview has district entrances instead of a generic mission route');
   await page.waitForFunction(()=>[...document.querySelectorAll('.course-city-art img')].every(img=>img.complete&&img.naturalWidth===1536));
   const rects=await page.locator('.course-city-district').evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height};}));
   for(const r of rects)assert.ok(r.w>=44&&r.h>=44);
   for(let i=0;i<rects.length;i++)for(let j=i+1;j<rects.length;j++){const a=rects[i],b=rects[j];assert.ok(a.x+a.w<=b.x||b.x+b.w<=a.x||a.y+a.h<=b.y||b.y+b.h<=a.y,'district plaques do not overlap');}
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${c.id}/${width}: page has no horizontal overflow`);
   const index=modules.length-1;await page.locator('.course-city-stop-hit').nth(index).click();await page.locator('.campaign-map').waitFor();assert.equal(await page.locator('.campaign-district-caption strong').innerText(),modules[index]);assert.equal(await page.locator('.campaign-mission').count(),tasks.filter(t=>t.module===modules[index]).length);assert.equal(await page.getByLabel('Перейти в район').inputValue(),String(index));
   if(modules.length>1){await page.getByLabel('Перейти в район').selectOption('0');assert.equal(await page.locator('.campaign-district-caption strong').innerText(),modules[0]);}
   await page.getByRole('button',{name:'Город курса',exact:true}).click();await page.getByRole('button',{name:'Показать в районе',exact:true}).click();const open=tasks[3]??tasks.at(-1);assert.equal(await page.locator('.campaign-brief h1').innerText(),cleanLessonTitle(open.title),'resume returns to actual progress, not the last inspected district');
   await page.getByRole('button',{name:'Город курса',exact:true}).click();
  }
  await page.getByLabel('Класс / Кампания').selectOption('course_grade3');await page.locator('.course-city-world').screenshot({path:`artifacts/course-districts/city-${width}.png`});await page.screenshot({path:`artifacts/course-districts/screen-${width}.png`});
 }
 await page.setViewportSize({width:1440,height:1000});await page.getByLabel('Класс / Кампания').selectOption('course_grade8');assert.equal(await page.locator('.course-city-district').count(),14);assert.equal(await page.locator('.course-city-art img').count(),2);await page.locator('.course-city-world').screenshot({path:'artifacts/course-districts/grade8-all14.png'});
 await page.getByLabel('Состояние').selectOption('complete');assert.equal(await page.locator('.course-city-district.is-completed').count(),14);await page.locator('.course-city-district').nth(13).click();assert.equal(await page.locator('.campaign-brief .ui-button').innerText(),'Повторить · без новой награды');await page.getByRole('button',{name:'Город курса',exact:true}).click();
 await page.getByLabel('Состояние').selectOption('all-locked');assert.equal(await page.locator('.course-city-world').count(),0);assert.deepEqual(errors,[]);console.log('courseDistricts: actual modules in all 9 courses at 320/390/768/1024/1440; physical non-overlapping districts, 14-module city, module routes, switching, progress/resume, closed courses and replay OK');
}catch(e){console.log(await page.locator('body').innerText());await page.screenshot({path:'artifacts/course-districts/failure.png',fullPage:true});throw e;}finally{await browser.close();await server.close();}
