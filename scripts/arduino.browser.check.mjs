// The original 11 simulations, inside CyberLearn. Isolated users/API only.
import assert from 'node:assert/strict';import {mkdirSync} from 'node:fs';import {chromium} from '@playwright/test';import {createServer} from 'vite';import {completeTask} from '../functions/domain.mjs';
const visualOnly=process.argv.includes('--visual-only');
const server=await createServer({server:{host:'127.0.0.1',port:3121,strictPort:true}});await server.listen();const {MOCK_TASKS,COURSES,ACHIEVEMENTS,LEVEL_THRESHOLDS}=await server.ssrLoadModule('/constants.ts');const tasks=MOCK_TASKS.filter(t=>t.courseId==='course_arduino');assert.equal(tasks.length,11);assert.equal(COURSES.find(c=>c.id==='course_arduino').totalModules,4);
const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']}),errors=[];let expectedNetworkErrors=0;mkdirSync('artifacts/arduino',{recursive:true});
try{
for(const width of (process.argv.includes('--desktop-only')?[1440]:[1440,390])){
 let user={id:`arduino-audit-${width}`,name:'Саша',role:'student',classId:'fixture_class',xp:0,currency:0,level:1,tasksCompleted:0,totalErrors:0,inventory:['av_1','col_default','frame_none'],achievements:[],equipped:{avatar:'av_1',droneColor:'col_default',avatarFrame:'frame_none'},completedTaskIds:[]};let completions=0,failNext=false;
 const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));page.on('console',message=>{if(message.type()==='error'){if(/Failed to load resource:.*400/.test(message.text()))expectedNetworkErrors++;else errors.push(message.text().slice(0,900));}});page.on('response',r=>{if(r.status()>=400&&!r.url().endsWith('/api/local'))errors.push(`${r.status()} ${r.url()}`);});
 await page.route('**/api/**',async route=>{const body=route.request().postDataJSON();let data=null;try{switch(body.operation){case'getUser':data=user;break;case'listTasks':case'listUsers':case'listFolders':data=[];break;case'listClassrooms':data=[{id:'fixture_class',teacherId:'fixture_teacher',name:'Класс',studentIds:[user.id],hiddenCourses:[]}];break;case'getLessonCheckpoint':data={checkpoint:null,version:''};break;case'getPracticeDraft':data={draft:null};break;case'completeTask':if(failNext){failNext=false;throw Error('Тест: нет сети');}completions++;data=completeTask(user,tasks.find(t=>t.id===body.taskId),body.attempts??0,{levels:LEVEL_THRESHOLDS,tasks:MOCK_TASKS,achievements:ACHIEVEMENTS});user=data.user;break;}await route.fulfill({json:{data}});}catch(e){await route.fulfill({status:400,json:{error:e.message}});}});
 await page.goto('http://127.0.0.1:3121/');await page.getByLabel('Класс / Кампания').selectOption('course_arduino');await page.getByRole('button',{name:'Начать миссию',exact:true}).click();await page.getByRole('region',{name:'Курс Arduino',exact:true}).waitFor();const frame=page.frameLocator('iframe[title*="3D-лаборатория"]');
 await page.waitForFunction(()=>{const f=document.querySelector('iframe');return !!f?.contentWindow?.__app&&f.contentDocument.querySelector('#app')?.inert===false;},null,{timeout:60000});
 assert.ok(await frame.locator('#board-canvas').isVisible());assert.equal(await frame.locator('a[href^="http"]').count(),0);assert.equal(await page.locator('.arduino-course a[href^="http"]').count(),0);
 const opaque=await frame.locator('#board-canvas').evaluate(canvas=>{const stage=window.__app.stage;stage.render();const gl=stage.renderer.getContext(),w=canvas.width,h=canvas.height,pixels=new Uint8Array(w*h*4);gl.readPixels(0,0,w,h,gl.RGBA,gl.UNSIGNED_BYTE,pixels);let opaque=0;for(let i=0;i<pixels.length;i+=4)if(pixels[i+3]>220&&pixels[i]+pixels[i+1]+pixels[i+2]<560)opaque++;return opaque;});assert.ok(opaque>1000,`3D board must actually draw opaque model pixels, got ${opaque}`);assert.equal(await frame.locator('html').getAttribute('lang'),'ru');await frame.getByRole('tab',{name:'Обзор',exact:true}).waitFor();await page.screenshot({path:`artifacts/arduino/board-${width}.png`,fullPage:true});
 const beforeExpand=await frame.locator('#stage').boundingBox();
 await frame.locator('.lab-expand').click();await page.locator('.arduino-course.is-scene-expanded').waitFor();
 await page.waitForFunction(()=>document.querySelector('iframe').contentDocument.querySelector('#stage').getBoundingClientRect().height>innerHeight-70);
 const enlarged=await frame.locator('#stage').boundingBox();assert.ok(enlarged.height>beforeExpand.height+100&&enlarged.width>=width-20,'fullscreen gives the live model the window');
 await frame.locator('#stage').evaluate(()=>window.__auditCanvas=document.querySelector('#board-canvas'));
 await page.screenshot({path:`artifacts/arduino/expanded-${width}.png`});
 await frame.locator('.lab-expand').click();await page.waitForFunction(()=>!document.querySelector('.arduino-course').classList.contains('is-scene-expanded'));
 assert.ok(await frame.locator('#stage').evaluate(()=>window.__auditCanvas===document.querySelector('#board-canvas')),'expanding does not remount the model');
 if(visualOnly){
  // Focused visual follow-up: Cyrillic callout bounds, model visibility after mobile run.
  await frame.locator('#stage').evaluate(()=>document.querySelector('#stage').scrollIntoView({block:'start'}));
  const overflowing=await frame.locator('.callout h3').evaluateAll(nodes=>nodes.filter(n=>n.scrollWidth>n.clientWidth+2).map(n=>n.textContent));assert.deepEqual(overflowing,[]);
  await page.screenshot({path:`artifacts/arduino/board-${width}.png`,fullPage:true});
  await page.getByRole('combobox',{name:'Урок Arduino',exact:true}).selectOption('arduino_project');await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.__app?.state.lesson.id==='project');await frame.locator('.btn-run').click();await page.waitForFunction(()=>document.querySelector('.arduino-course-progress b')?.textContent==='1/11');
  if(width===390){await page.waitForTimeout(250);const box=await frame.locator('#stage').boundingBox(),viewport=await page.locator('iframe').boundingBox();assert.ok(box.y>=viewport.y-2&&box.y<viewport.y+85,'mobile run brings the 3D model into view');}
  await page.screenshot({path:`artifacts/arduino/project-${width}.png`,fullPage:true});await page.close();console.log(`Arduino visual ${width}: Cyrillic bounds and live model after run OK`);continue;
 }
 for(const [i,task]of tasks.entries()){
  await page.getByRole('combobox',{name:'Урок Arduino',exact:true}).selectOption(task.id);await page.waitForFunction(id=>document.querySelector('iframe')?.contentWindow?.__app?.state.lesson.id===id,task.arduinoConfig.lessonId);
  const heading=await frame.locator('.info-card h2').first().innerText();assert.ok(/[а-яё]/i.test(heading)||heading.toLowerCase()==='arduino uno');
  // Exercise real controls, not just static scene loading.
  const changed=await frame.locator('body').evaluate(()=>{const app=window.__app,p=app.state.lesson.params.find(p=>p.type==='range');if(!p)return null;const value=app.state.values[p.key];const next=value===p.max?p.min:p.max;app.setParam(p.key,next);return{key:p.key,value:app.state.values[p.key],next};});if(changed)assert.equal(changed.value,changed.next);
  if(width===1440&&i===2){await frame.getByRole('tab',{name:'Подключение',exact:true}).click();await frame.locator('.info-card table').waitFor();await frame.getByRole('tab',{name:'Обзор',exact:true}).click();}
  if(i===1)failNext=true;
  await frame.locator('.btn-run').click();
  if(i===1){await page.getByRole('button',{name:'Повторить сохранение',exact:true}).waitFor();assert.equal(user.completedTaskIds.length,1);await page.getByRole('button',{name:'Повторить сохранение',exact:true}).click();}
  await page.waitForFunction(count=>document.querySelector('.arduino-course-progress b')?.textContent===`${count}/11`,i+1,{timeout:20000});
  if(i===1||i===10)await page.screenshot({path:`artifacts/arduino/${task.arduinoConfig.lessonId}-${width}.png`,fullPage:true});
 }
 assert.equal(completions,11);assert.equal(user.currency,185);assert.equal(user.xp,500);assert.ok(user.achievements.includes('ach_arduino'));
 // Repeat, then reopen: server completion is authoritative and rewards stay idempotent.
 await frame.locator('.lab-run').click();await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.__app?.state.running==='idle');await frame.locator('.lab-run').click();await page.waitForFunction(()=>document.querySelector('iframe')?.contentWindow?.__app?.state.running==='running');await page.waitForTimeout(400);assert.equal(completions,11);
 await page.getByRole('button',{name:'К карте курсов',exact:true}).click();await page.getByLabel('Класс / Кампания').selectOption('course_arduino');await page.getByRole('button',{name:/Повторить · без новой награды/}).click();await page.getByRole('combobox',{name:'Урок Arduino',exact:true}).waitFor();assert.equal(await page.locator('.arduino-course-progress b').innerText(),'11/11');assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:`artifacts/arduino/completed-${width}.png`,fullPage:true});await page.close();console.log(`Arduino ${width}: all 11 original 3D scenes run, controls, Russian tabs, saved progress, repeat rewards, reopening and layout OK`);
}
assert.equal(expectedNetworkErrors,visualOnly?0:process.argv.includes('--desktop-only')?1:2,'only the intentional failed save produces a network error');assert.deepEqual(errors,[]);
}finally{if(errors.length)console.log(errors);await browser.close();await server.close();}
