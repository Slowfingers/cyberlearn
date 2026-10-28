// Isolated student fixture and mocked API only.
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
import {completeTask} from '../functions/domain.mjs';
const server=await createServer({server:{host:'127.0.0.1',port:3138,strictPort:true}});await server.listen();
const {MOCK_TASKS,LEVEL_THRESHOLDS,ACHIEVEMENTS}=await server.ssrLoadModule('/constants.ts');
const {PC_DEFAULTS,PC_PARTS,PC_CABLES,pcPortLabel}=await server.ssrLoadModule('/utils/pcAssembly.ts');
const tasks=MOCK_TASKS.filter(t=>t.courseId==='course_pc_builder'),final=tasks.at(-1);
mkdirSync('artifacts/pc-builder/workstation',{recursive:true});
const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});let current;
try{for(const width of [1430,390]){
 const page=current=await browser.newPage({viewport:{width,height:width===1430?800:844},reducedMotion:'reduce'}),errors=[];
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`);});
 let user={id:`pc-balance-audit-${width}`,name:'Саша',role:'student',classId:'fixture_class',xp:0,currency:0,level:1,tasksCompleted:5,totalErrors:0,inventory:['av_1','col_default','frame_none'],achievements:[],equipped:{avatar:'av_1',droneColor:'col_default',avatarFrame:'frame_none'},completedTaskIds:tasks.slice(0,5).map(t=>t.id)},completions=0;
 await page.route('**/api/**',async route=>{const b=route.request().postDataJSON();let data=null;if(b.operation==='getUser')data=user;if(['listTasks','listUsers','listFolders'].includes(b.operation))data=[];if(b.operation==='listClassrooms')data=[{id:'fixture_class',teacherId:'fixture_teacher',name:'Класс',studentIds:[user.id],hiddenCourses:[]}];if(b.operation==='completeTask'){completions++;data=completeTask(user,tasks.find(t=>t.id===b.taskId),0,{levels:LEVEL_THRESHOLDS,tasks:MOCK_TASKS,achievements:ACHIEVEMENTS});user=data.user;}await route.fulfill({json:{data}});});
 const weak={...PC_DEFAULTS,board:'board_h610',cpu:'cpu_i3_12100f',ram:'ram_ddr4_32',gpu:'gpu_5080',psu:'psu_850_atx3',pcie:'pcie_16'};
 const key=`cyberlearn:pc:v1:${user.id}:${final.id}`;
 await page.addInitScript(({key,build})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify({version:2,build}));},{key,build:weak});
 const open=async()=>{await page.goto('http://127.0.0.1:3138/');await page.getByLabel('Класс / Кампания').selectOption('course_pc_builder');await page.getByRole('button',{name:/Начать миссию/}).click();await page.getByRole('navigation',{name:'Мастерские курса'}).getByRole('button',{name:new RegExp(final.title)}).click({noWaitAfter:true});await page.waitForFunction(()=>document.querySelector('.pc-canvas')?.dataset.modelsLoaded==='6',null,{timeout:60000});};
 await open();assert.match(await page.getByRole('region',{name:'Совместимость сборки'}).innerText(),/850\+ Вт/);
 await page.getByRole('button',{name:'Включить ПК',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.pc-canvas')?.dataset.powered==='true');
 await page.getByRole('button',{name:'Сохранить сборку',exact:true}).click();await page.locator('.pc-feedback').filter({hasText:/POST пройден.*улучшить/}).waitFor();assert.equal(completions,0,'unbalanced assembly cannot receive final reward');await page.getByRole('heading',{name:'Проверь: Процессор',exact:true}).waitFor();
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:`artifacts/pc-builder/workstation/unbalanced-${width}.png`});
 await page.getByRole('navigation',{name:'Мастерские курса'}).getByRole('button',{name:new RegExp(tasks[1].title)}).click({noWaitAfter:true});await page.getByLabel('Учебная платформа').selectOption('board_am4');
 await page.getByRole('navigation',{name:'Мастерские курса'}).getByRole('button',{name:new RegExp(tasks[2].title)}).click({noWaitAfter:true});assert.equal(await page.getByLabel('Учебная платформа').inputValue(),'board_am4');assert.match(await page.locator('.pc-platform').innerText(),/AM4.*DDR4/);
 const strong={...weak,board:'board_b760_d4',cpu:'cpu_vector10'};await page.evaluate(({key,build})=>localStorage.setItem(key,JSON.stringify({version:2,build})),{key,build:strong});await open();
 assert.equal(await page.locator('.pc-balance-warning').count(),0);
 await page.getByRole('button',{name:'Включить ПК',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.pc-canvas')?.dataset.powered==='true');
 await page.getByRole('button',{name:'Сохранить сборку',exact:true}).click();await page.locator('.pc-completed').waitFor();assert.equal(completions,1);
 await page.getByRole('button',{name:'Развернуть конструктор',exact:true}).click();await page.waitForTimeout(250);await page.screenshot({path:`artifacts/pc-builder/workstation/complete-${width}.png`});if(width===1430){
  await page.getByRole('button',{name:'Свернуть конструктор',exact:true}).click();
  await page.getByRole('navigation',{name:'Мастерские курса'}).getByRole('button',{name:new RegExp(tasks[4].title)}).click({noWaitAfter:true});
  const selectPart=async id=>{const p=PC_PARTS.find(p=>p.id===id);await page.getByRole('button',{name:`${p.name} · ${p.spec}`,exact:true}).click();};
  await selectPart('gpu_render24');await page.getByRole('button',{name:'На модели: Слот PCIe x16',exact:true}).click();
  await page.getByRole('button',{name:'Подобрать: Блок питания',exact:true}).click();
  assert.equal(await page.getByRole('progressbar',{name:'Сборка этапа'}).getAttribute('aria-valuemax'),'6','power upgrade adds its own steps');
  await selectPart('psu_1000_atx3');await page.getByRole('button',{name:'На модели: Отсек БП',exact:true}).click();
  for(const id of ['atx_24','eps_8','pcie_16','display_dp']){const part=PC_PARTS.find(p=>p.id===id),pair=PC_CABLES[part.slot];await selectPart(id);for(const port of [pair.source,pair.target])await page.getByRole('button',{name:`Разъём ${pcPortLabel(port,{gpu:'gpu_render24'})}`,exact:true}).click();}
  await page.locator('.pc-completed').waitFor();assert.equal(completions,1,'repairing a completed workshop does not duplicate rewards');
  await page.screenshot({path:'artifacts/pc-builder/workstation/gpu-power-upgrade.png'});
  await page.reload();await page.getByLabel('Класс / Кампания').selectOption('course_pc_builder');await page.getByRole('button',{name:/Начать миссию|Повторить · без новой награды/}).click();await page.getByRole('navigation',{name:'Мастерские курса'}).getByRole('button',{name:new RegExp(tasks[4].title)}).click({noWaitAfter:true});await page.locator('.pc-completed').waitFor();assert.equal(await page.getByRole('progressbar',{name:'Сборка этапа'}).getAttribute('aria-valuemax'),'6','optional power repair persists in the draft');
  const memoryKey=`cyberlearn:pc:v1:${user.id}:${tasks[2].id}`;
  await page.evaluate(({memoryKey,userId})=>{localStorage.setItem(memoryKey,JSON.stringify({version:2,build:{board:'board_am4',cpu:'cpu_atlas6',paste:'paste_dot',cooler:'cooler_low',ram:'ram_ddr4_32'}}));localStorage.setItem(`cyberlearn:pc:platform:${userId}`,'board_b650');},{memoryKey,userId:user.id});
  await page.reload();await page.getByLabel('Класс / Кампания').selectOption('course_pc_builder');await page.getByRole('button',{name:/Начать миссию|Повторить · без новой награды/}).click();await page.getByRole('navigation',{name:'Мастерские курса'}).getByRole('button',{name:new RegExp(tasks[2].title)}).click({noWaitAfter:true});await page.locator('.pc-objective h2').filter({hasText:tasks[2].title}).waitFor();
  assert.equal(await page.getByLabel('Учебная платформа').inputValue(),'board_am4','saved AM4 platform beats the unrelated AM5 preference');
  await page.getByRole('heading',{name:'Установи накопитель',exact:true}).waitFor();
  await page.locator('.pc-stage-base>summary').click();assert.match(await page.locator('.pc-stage-base').innerText(),/Плата Atlas/);assert.doesNotMatch(await page.locator('.pc-stage-base').innerText(),/B650/);
  await page.getByRole('navigation',{name:'Шаги сборки'}).getByRole('button',{name:'Память',exact:true}).click();await page.getByRole('heading',{name:'Память уже на месте',exact:true}).waitFor();
  await page.getByRole('button',{name:'Следующий незавершённый шаг',exact:true}).click();await page.getByRole('heading',{name:'Установи накопитель',exact:true}).waitFor();
  await page.getByLabel('Учебная платформа').selectOption('board_lga_ddr4');await page.getByRole('heading',{name:'Установи оперативную память',exact:true}).waitFor();
  assert.match(await page.locator('.pc-stage-base').innerText(),/Плата Vector Classic/);assert.doesNotMatch(await page.locator('.pc-stage-base').innerText(),/Плата Atlas/);
  assert.equal(await page.getByRole('progressbar',{name:'Сборка этапа'}).getAttribute('aria-valuenow'),'0','platform reset resets instructions and targets together');
  await page.screenshot({path:'artifacts/pc-builder/workstation/audit-platform-context.png'});

 }
 assert.deepEqual(errors,[]);await page.close();
 console.log(`PC balance ${width}: ${PC_PARTS.length} parts, live PSU estimate, weak CPU can POST but cannot finish, balanced RTX 5080 build rewarded, platform persists between lessons, expanded workshop screenshot OK`);
}}catch(e){if(current&&!current.isClosed())await current.screenshot({path:'artifacts/pc-builder/workstation/failure.png'});throw e;}finally{await browser.close();await server.close();}
