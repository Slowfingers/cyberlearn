// Isolated fixtures and mocked API only. No real student accounts or data.
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
import {completeTask} from '../functions/domain.mjs';
const server=await createServer({server:{host:'127.0.0.1',port:3134,strictPort:true}});await server.listen();
const {MOCK_TASKS,LEVEL_THRESHOLDS,ACHIEVEMENTS}=await server.ssrLoadModule('/constants.ts');
const {PC_PARTS,PC_DEFAULTS,PC_TARGETS,PC_MOUNTS,PC_CABLES,PC_PORTS}=await server.ssrLoadModule('/utils/pcAssembly.ts');
const tasks=MOCK_TASKS.filter(t=>t.courseId==='course_pc_builder'),errors=[];mkdirSync('artifacts/pc-builder/v2',{recursive:true});
const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
try{for(const width of[1440,390]){
 let user={id:`pc-manual-audit-${width}`,name:'Саша',role:'student',classId:'fixture_class',xp:0,currency:0,level:1,tasksCompleted:0,totalErrors:0,inventory:['av_1','col_default','frame_none'],achievements:[],equipped:{avatar:'av_1',droneColor:'col_default',avatarFrame:'frame_none'},completedTaskIds:[]};let completions=0,failNext=false;
 const page=await browser.newPage({viewport:{width,height:width===1440?800:844},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/**',async route=>{const body=route.request().postDataJSON();let data=null;try{switch(body.operation){case'getUser':data=user;break;case'listTasks':case'listUsers':case'listFolders':data=[];break;case'listClassrooms':data=[{id:'fixture_class',teacherId:'fixture_teacher',name:'Класс',studentIds:[user.id],hiddenCourses:[]}];break;case'getLessonCheckpoint':data={checkpoint:null,version:''};break;case'getPracticeDraft':data={draft:null};break;case'completeTask':if(failNext){failNext=false;throw Error('Тест: нет сети');}completions++;data=completeTask(user,tasks.find(t=>t.id===body.taskId),0,{levels:LEVEL_THRESHOLDS,tasks:MOCK_TASKS,achievements:ACHIEVEMENTS});user=data.user;break;}await route.fulfill({json:{data}});}catch(e){await route.fulfill({status:400,json:{error:e.message}});}});
 const open=async()=>{await page.getByLabel('Класс / Кампания').selectOption('course_pc_builder');await page.getByRole('button',{name:/Начать миссию|Повторить · без новой награды/}).click();await page.getByRole('region',{name:'Мастерская сборки ПК',exact:true}).waitFor();};
 const category=async()=>{const toggle=page.locator('.pc-catalog-toggle');if(await toggle.getAttribute('aria-pressed')!=='true')await toggle.click();await page.getByLabel('Тип комплектующей').selectOption('all');await page.getByLabel('Найти комплектующую').fill('');};
 const manual=async()=>{const details=page.locator('.pc-manual');if(await details.getAttribute('open')===null)await details.locator('summary').click();};
 const select=async id=>{const p=PC_PARTS.find(p=>p.id===id);await category(!!PC_CABLES[p.slot]);await page.getByRole('button',{name:`${p.name} · ${p.spec}`,exact:true}).click();};
 const destination=slot=>PC_MOUNTS.find(m=>m.slots.includes(slot));
 const portButton=id=>page.getByRole('button',{name:`Разъём ${PC_PORTS.find(p=>p.id===id).label}`,exact:true});
 const install=async id=>{const p=PC_PARTS.find(p=>p.id===id);await select(id);const pair=PC_CABLES[p.slot];if(pair){const before=await page.locator('.pc-canvas').getAttribute('data-installed');await portButton(pair.source).click();assert.equal(await page.locator('.pc-canvas').getAttribute('data-installed'),before,'one end alone never installs a cable');await portButton(pair.target).click();}else{await manual();await page.getByRole('button',{name:`Установить в ${destination(p.slot).label}`,exact:true}).click();}};
 const message=()=>page.locator('.pc-feedback');
 const rendered=async()=>{await page.waitForFunction(()=>{const c=document.querySelector('.pc-canvas canvas'),gl=c?.getContext('webgl2');if(!gl||Math.abs(c.width-c.clientWidth*Math.min(devicePixelRatio,1.6))>1||Math.abs(c.height-c.clientHeight*Math.min(devicePixelRatio,1.6))>1)return false;const bytes=new Uint8Array(c.width*c.height*4);gl.readPixels(0,0,c.width,c.height,gl.RGBA,gl.UNSIGNED_BYTE,bytes);let count=0;for(let i=0;i<bytes.length;i+=4)if(bytes[i]>65||bytes[i+1]>75||bytes[i+2]>100)count++;return count>1000;},null,{timeout:15000});};
 const inViewport=async selector=>{const r=await page.locator(selector).boundingBox();assert.ok(r&&r.y>=0&&r.y+r.height<=(await page.viewportSize()).height+1,`${selector} visible without scrolling: ${JSON.stringify(r)}`);};
 await page.goto('http://127.0.0.1:3134/');await open();await page.locator('.pc-canvas canvas').waitFor();await rendered();await page.waitForFunction(()=>document.querySelector('.pc-canvas').dataset.modelsLoaded==='6',null,{timeout:45000});
 await page.getByRole('region',{name:'Игровой инвентарь',exact:true}).waitFor();await page.waitForFunction(()=>{const img=document.querySelector('.pc-item-sprite');return img?.complete&&img.naturalWidth===256&&img.src.includes('/art/pc-builder/parts/');});
 assert.equal(await page.getByRole('button',{name:'Установить деталь',exact:true}).count(),0,'no one-click automatic installer');
 if(width===1440){await inViewport('.pc-parts');await inViewport('.pc-guide');await inViewport('.pc-actions');await inViewport('.pc-objective');}
 for(const [i,task]of tasks.entries()){
  if(i)await page.getByRole('navigation',{name:'Мастерские курса'}).getByRole('button',{name:new RegExp(task.title)}).click();
  const lesson=task.pcBuilderConfig.lessonId;
  await page.waitForFunction(n=>Number(document.querySelector('.pc-canvas')?.dataset.installed)===n,[0,1,4,6,10,0][i]);
  if(lesson==='graphics')assert.equal(await page.evaluate(id=>JSON.parse(localStorage.getItem(`cyberlearn:pc:v1:${id}:pc_graphics`)).build.psu,user.id),'psu_650','the real PSU from the power workshop carries forward');
  assert.equal(await page.locator('.pc-parts button[aria-pressed=true]').count(),0,'no automatic correct part selected');
  if(lesson==='build'){assert.equal(await page.getByRole('button',{name:'Включить ПК',exact:true}).isDisabled(),true);assert.equal(await page.getByRole('button',{name:'Проверить этап',exact:true}).count(),0);}else{assert.equal(await page.getByRole('button',{name:'Включить ПК',exact:true}).count(),0);await page.getByRole('button',{name:'Проверить этап',exact:true}).click();assert.equal(completions,i);}
  if(lesson==='cpu'){
   await page.locator('.pc-theory>summary').click();await page.locator('.pc-learning').waitFor();assert.ok((await page.locator('.pc-learning').innerText()).includes('форма, контакты'));
   await install('cpu_lga');await message().filter({hasText:'Несовместимый сокет'}).waitFor();
   await select('cpu_am5');await manual();await page.getByRole('button',{name:'Установить в DIMM · A2 / B2',exact:true}).click();await message().filter({hasText:'Процессор устанавливается в сокет'}).waitFor();assert.equal(await page.locator('.pc-canvas').getAttribute('data-installed'),'1');
   await install('cooler_am5');await message().filter({hasText:'Сначала установи'}).waitFor();
   assert.equal(await page.getByRole('button',{name:'Объяснение детали',exact:true}).count(),0);assert.equal(await page.getByRole('button',{name:'Авторы 3D-моделей',exact:true}).count(),0);
  }
  if(lesson==='memory'){await install('ram_ddr4');await message().filter({hasText:'Несовместимая память'}).waitFor();}
  if(lesson==='power'){await install('psu_300');await page.getByRole('button',{name:'Проверить этап',exact:true}).click();assert.equal(completions,i,'weak PSU fails step check');}
  for(const slot of PC_TARGETS[lesson]){
   if(lesson==='case'&&width===1440){await select('board_atx');await manual();await page.getByRole('button',{name:'Установить в Отсек БП',exact:true}).click();await message().filter({hasText:'не подходит'}).waitFor();await page.getByRole('button',{name:'На модели: Стойки ATX',exact:true}).click();}
   else if(lesson==='build'&&slot==='psu')await install('psu_300');
   else if(lesson==='build'&&slot==='eps'){
    await select('eps_8');assert.equal(await page.locator('.pc-wire-guide button').count(),2);await portButton('psu_eps').click();await portButton('board_eps').click();
   }else await install(PC_DEFAULTS[slot]);
   assert.equal(await page.locator('.pc-parts button[aria-pressed=true]').count(),0,'after installing, child must choose the next part');
   if(lesson==='cpu'&&slot==='cpu'){await page.getByRole('navigation',{name:'Шаги сборки'}).getByRole('button',{name:'Процессор',exact:true}).click();await page.getByRole('heading',{name:'Процессор уже на месте',exact:true}).waitFor();await page.getByRole('button',{name:'Следующий незавершённый шаг',exact:true}).click();await page.getByRole('heading',{name:'Нанеси термопасту',exact:true}).waitFor();}
   if(lesson==='memory'&&slot==='ram'){await page.getByRole('button',{name:'К карте курсов',exact:true}).click();await open();await page.getByRole('navigation',{name:'Мастерские курса'}).getByRole('button',{name:new RegExp(task.title)}).click();assert.equal(await page.getByRole('progressbar',{name:'Сборка этапа'}).getAttribute('aria-valuenow'),'1');}
  }
  if(lesson==='build'){
   await page.getByRole('button',{name:'Включить ПК',exact:true}).click();await message().filter({hasText:'БП 300 Вт'}).waitFor();assert.equal(await page.locator('.pc-canvas').getAttribute('data-powered'),'false');assert.equal(completions,i);
   await install('psu_650');await page.waitForFunction(()=>document.querySelector('.pc-canvas').dataset.installed==='10');assert.equal(await page.locator('.pc-canvas').getAttribute('data-installed'),'10','replacement PSU unplugs all its cables');for(const slot of['atx','eps','pcie'])await install(PC_DEFAULTS[slot]);
   await select('eps_8');await page.getByRole('button',{name:'Включить ПК',exact:true}).click();await page.getByRole('button',{name:'Снять деталь',exact:true}).click();await page.waitForTimeout(1300);assert.equal(await page.locator('.pc-canvas').getAttribute('data-powered'),'false','editing cancels in-flight POST');assert.equal(await page.getByRole('button',{name:'Включить ПК',exact:true}).isDisabled(),true);
   await install('eps_8');await page.getByRole('button',{name:'Включить ПК',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.pc-canvas').dataset.powered==='true');await page.waitForFunction(()=>document.querySelector('.pc-canvas').dataset.powered==='true');assert.equal(completions,i,'POST alone gives no reward');
   await page.getByRole('button',{name:'Отойти от монитора',exact:true}).click();
   await page.getByRole('button',{name:'Развернуть конструктор',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.pc-course.pc-expanded')?.getBoundingClientRect().width===innerWidth);await rendered();await page.screenshot({path:`artifacts/pc-builder/v2/fullscreen-${width}.png`});await page.keyboard.press('Escape');await page.locator('.pc-course:not(.pc-expanded)').waitFor();
   await page.getByRole('button',{name:'Подписи на модели',exact:true}).click();await page.getByRole('button',{name:'Изучить: Монитор',exact:true}).waitFor();
  }
  if(i===0)failNext=true;await page.getByRole('button',{name:lesson==='build'?'Сохранить сборку':'Проверить этап',exact:true}).click();if(i===0)await page.getByRole('button',{name:'Повторить сохранение',exact:true}).click();await page.locator('.pc-completed').waitFor();assert.equal(completions,i+1);await page.getByRole('button',{name:'Проверить снова',exact:true}).click();assert.equal(completions,i+1);
  await rendered();assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:`artifacts/pc-builder/v2/${lesson}-${width}.png`});
 }
 assert.equal(user.xp,370);assert.equal(user.currency,115);
 if(width===1440){
  for(const [w,h]of[[1430,689],[1280,720],[1470,800],[1710,956],[2048,1009],[1024,768]]){
   await page.setViewportSize({width:w,height:h});await page.getByRole('button',{name:'Начать этап заново',exact:true}).click();await page.locator('.pc-course').evaluate(e=>e.scrollTop=0);await rendered();
   for(const selector of['.pc-parts','.pc-guide','.pc-objective','.pc-actions'])await inViewport(selector);
   await select('board_atx');await manual();await inViewport('.pc-parts');await inViewport('.pc-destinations');await rendered();await page.screenshot({path:`artifacts/pc-builder/v2/mac-${w}x${h}.png`});
  }
  await page.setViewportSize({width:320,height:740});assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.screenshot({path:'artifacts/pc-builder/v2/mobile-320.png'});
 }
 await page.close();console.log(`PC manual ${width}: all 6 lessons, explanations, explicit wrong/right places, 2-ended cables, EPS/PCIe errors, PSU replacement, POST, no auto-pick/install, viewport dock, annotated 3D, fullscreen, drafts/retry and rewards OK`);
}assert.deepEqual(errors,[]);}catch(e){const page=browser.contexts().at(-1)?.pages()[0];if(page){console.log(await page.locator('body').innerText());await page.screenshot({path:'artifacts/pc-builder/v2/failure.png'});}throw e;}finally{await browser.close();await server.close();}
