// Pilot lessons against an in-page API mock. No real accounts or school records.
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
const server=await createServer({server:{host:'127.0.0.1',port:3117,strictPort:true}});await server.listen();
const {MOCK_TASKS}=await server.ssrLoadModule('/constants.ts');
const browser=await chromium.launch();mkdirSync('artifacts/pilot-visual',{recursive:true});
const errors=[];
async function openTask(id,width){
 const task=MOCK_TASKS.find(t=>t.id===id),all=MOCK_TASKS.filter(t=>t.courseId===task.courseId);
 const completed=all.slice(0,all.findIndex(t=>t.id===id)).map(t=>t.id),ops=[];
 const user={id:'pilot-visual-fixture',name:'Саша',role:'student',classId:'fixture_class',xp:0,currency:0,level:1,tasksCompleted:0,totalErrors:0,inventory:['av_1','col_default','frame_none'],achievements:[],equipped:{avatar:'av_1',droneColor:'col_default',avatarFrame:'frame_none'},completedTaskIds:completed};
 const page=await browser.newPage({viewport:{width,height:900}});page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/**',async route=>{
  const body=route.request().postDataJSON();ops.push(body);let data=null;
  switch(body.operation){
   case 'getUser':data=user;break;
   case 'listTasks':case 'listUsers':case 'listFolders':data=[];break;
   case 'listClassrooms':data=[{id:'fixture_class',teacherId:'fixture_teacher',name:'Класс',studentIds:[user.id],hiddenCourses:[]}];break;
   case 'getLessonCheckpoint':data={checkpoint:null};break;
   case 'getPracticeDraft':data={draft:null};break;
   case 'submitPilotAttempt':data={correct:body.answer===(task.type==='typing'?task.typingConfig?.targetText??task.typingData?.text:task.quizData.options[task.quizData.correctIndex])};break;
   case 'completeTask':user.completedTaskIds=[...completed,id];data={user,awarded:true};break;
  }
  await route.fulfill({json:{data}});
 });
 await page.goto('http://127.0.0.1:3117/');await page.getByLabel('Класс / Кампания').selectOption(task.courseId);
 await page.locator('.campaign-region',{hasText:task.module}).first().click();await page.locator(`.campaign-node[data-mission-id="${id}"]`).click();await page.locator('.campaign-brief .ui-button').click();
 await page.locator('.mentor-lesson').waitFor();return{page,task,ops};
}
try{
 for(const width of [390,1440]){
  const {page,task,ops}=await openTask('g3_m1_l3',width);
  const figure=page.locator('.lesson-worked-picture');await figure.waitFor();
  assert.equal(await figure.evaluate(e=>getComputedStyle(e).backgroundImage),'none','worked example has no stretched frame artwork');
  await page.getByRole('button',{name:'Начать объяснение',exact:true}).click();
  for(let i=0;i<20&&await page.getByRole('button',{name:'Следующая часть объяснения',exact:true}).count();i++)await page.getByRole('button',{name:'Следующая часть объяснения',exact:true}).click();
  await page.getByRole('button',{name:'Открыть учебный архив',exact:true}).click();
  const buttons=page.locator('.archive-path-button');assert.equal(await buttons.count(),3);
  const boxes=await buttons.evaluateAll(es=>es.map(e=>{const r=e.getBoundingClientRect(),s=e.querySelector('svg').getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,icon:s.width};}));
  for(const b of boxes){assert.ok(b.icon<=32&&b.w>=44&&b.h>=44);}
  for(let i=0;i<boxes.length;i++)for(let j=i+1;j<boxes.length;j++){const a=boxes[i],b=boxes[j];assert.ok(a.x+a.w<=b.x+1||b.x+b.w<=a.x+1||a.y+a.h<=b.y+1||b.y+b.h<=a.y+1,'folder buttons never overlap');}
  await buttons.nth(2).click();assert.ok(await page.getByRole('button',{name:'Прочитать самостоятельное задание',exact:true}).isDisabled(),'cannot skip folders');
  for(let i=0;i<3;i++)await buttons.nth(i).click();
  await page.screenshot({path:`artifacts/pilot-visual/archive-${width}.png`,fullPage:true});
  await page.getByRole('button',{name:'Прочитать самостоятельное задание',exact:true}).click();await page.getByRole('button',{name:'Начать задание',exact:true}).click();
  await page.locator('.lesson-answer').filter({has:page.getByText(task.quizData.options[task.quizData.correctIndex],{exact:true})}).click();const completion=page.waitForResponse(response=>response.request().postData()?.includes('\"operation\":\"completeTask\"'));
  await page.getByRole('button',{name:'Проверить',exact:true}).click();await completion;
  await page.waitForFunction(()=>document.body.textContent.includes('Верно. Посмотри, почему.'));
  assert.ok(ops.some(op=>op.operation==='completeTask'&&op.taskId===task.id),'lesson can be completed after folder exercise');await page.close();
  const typing=await openTask('g3_m1_l4',width),p=typing.page;
  await p.getByRole('button',{name:'Пропустить обучение',exact:true}).click();await p.getByRole('button',{name:'Начать задание',exact:true}).click();
  await p.locator('.typing-lesson-layout').waitFor();
  if(width>=1024){const side=await p.locator('.typing-lesson-layout>.lesson-mode-panel').boundingBox(),keyboard=await p.locator('.keyboard-board').boundingBox();assert.ok(side.x+side.width<=keyboard.x+1,'lesson modes sit left of keyboard');assert.ok(keyboard.y+keyboard.height<=900,'whole keyboard fits the desktop viewport');}
  assert.ok(await p.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  await p.screenshot({path:`artifacts/pilot-visual/typing-${width}.png`,fullPage:true});
  await p.getByRole('button',{name:'Тренируюсь',exact:true}).click();await p.getByLabel('Печатай прямо в тексте').waitFor();
  await p.getByLabel('Печатай прямо в тексте').fill(typing.task.typingConfig?.targetText??typing.task.typingData.text);
  await p.getByText('Готово! Текст набран верно.',{exact:true}).waitFor();
  assert.ok(typing.ops.some(op=>op.operation==='submitPilotAttempt'&&op.mode==='train'),'typing training submits the answer');await p.close();
 }
 assert.deepEqual(errors,[]);console.log('pilotVisual: folder sequence, quiz completion, readable examples, typing modes at left, training submission and mobile bounds OK');
}catch(error){for(const page of browser.contexts().flatMap(context=>context.pages())){await page.screenshot({path:'artifacts/pilot-visual/failure.png',fullPage:true}).catch(()=>{});console.error((await page.locator('body').innerText()).slice(-2000));}throw error;}finally{await browser.close();await server.close();}
