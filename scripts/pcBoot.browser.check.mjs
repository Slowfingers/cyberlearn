// Isolated students and mocked API; the real local GIF is rendered in the monitor.
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
const server=await createServer({server:{host:'127.0.0.1',port:3142,strictPort:true}});
await server.listen();
const {MOCK_TASKS}=await server.ssrLoadModule('/constants.ts');
const {PC_DEFAULTS}=await server.ssrLoadModule('/utils/pcAssembly.ts');
const tasks=MOCK_TASKS.filter(t=>t.courseId==='course_pc_builder'),final=tasks.at(-1);
mkdirSync('artifacts/pc-builder/boot',{recursive:true});
const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
try{for(const width of [1430,390]){
 const page=await browser.newPage({viewport:{width,height:width===1430?800:844},reducedMotion:'reduce'}),errors=[];
 let gifRequests=0,completions=0;
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',request=>{if(new URL(request.url()).pathname==='/art/pc-builder/rickroll.gif')gifRequests++;});
 const user={id:`pc-boot-fixture-${width}`,name:'Саша',role:'student',classId:'fixture_class',xp:0,currency:0,level:1,tasksCompleted:5,totalErrors:0,inventory:['av_1','col_default','frame_none'],achievements:[],equipped:{avatar:'av_1',droneColor:'col_default',avatarFrame:'frame_none'},completedTaskIds:tasks.slice(0,5).map(t=>t.id)};
 await page.route('http://127.0.0.1:3142/api/**',async route=>{const b=route.request().postDataJSON();let data=null;if(b.operation==='getUser')data=user;if(['listTasks','listUsers','listFolders'].includes(b.operation))data=[];if(b.operation==='listClassrooms')data=[{id:'fixture_class',teacherId:'fixture_teacher',name:'Класс',studentIds:[user.id],hiddenCourses:[]}];if(b.operation==='completeTask')completions++;await route.fulfill({json:{data}});});
 const key=`cyberlearn:pc:v1:${user.id}:${final.id}`;
 await page.addInitScript(({key,build})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify({version:2,build}));},{key,build:PC_DEFAULTS});
 const open=async()=>{await page.goto('http://127.0.0.1:3142/');await page.getByLabel('Класс / Кампания').selectOption('course_pc_builder');await page.getByRole('button',{name:/Начать миссию/}).click();await page.locator('.pc-canvas').waitFor();await page.locator('.pc-objective h2').filter({hasText:final.title}).waitFor();};
 await open();
 assert.equal(await page.locator('.pc-first-boot').count(),0);
 await page.getByRole('button',{name:'Подписи на модели',exact:true}).click();
 await page.getByRole('button',{name:'Включить ПК',exact:true}).click();
 await page.locator('.pc-first-boot[data-phase="bios"]').waitFor();
 assert.ok(await page.locator('.pc-annotation-layer').isHidden(),'labels cannot cover BIOS');
 await page.screenshot({path:`artifacts/pc-builder/boot/bios-clear-${width}.png`});
 const biosFrames=Number(await page.locator('.pc-canvas').getAttribute('data-render-count'));
 assert.equal(gifRequests,0,'GIF must wait for BIOS and OS');
 await page.locator('.pc-first-boot[data-phase="system"]').waitFor();
 const gif=page.locator('.pc-boot-rickroll img');await gif.waitFor();
 await page.waitForFunction(()=>{const image=document.querySelector('.pc-boot-rickroll img');return image?.complete&&image.naturalWidth>0;});
 assert.equal(await gif.getAttribute('src'),'/art/pc-builder/rickroll.gif');
 assert.equal(await page.locator('.pc-first-boot iframe').count(),0,'no external video player');
 const frame=await gif.boundingBox();assert.ok(frame.width>=200&&frame.height>=100,'readable GIF on screen');
 const first=await gif.screenshot();await page.waitForTimeout(450);const second=await gif.screenshot();
 assert.ok(!first.equals(second),'the actual GIF visibly animates');
 assert.ok(Number(await page.locator('.pc-canvas').getAttribute('data-render-count'))-biosFrames<=4,'static 3D scene does not keep redrawing behind BIOS/GIF');
 assert.match(await page.locator('.pc-monitor-display').getAttribute('style'),/matrix3d/,'player follows the monitor in 3D');
 assert.equal(await page.locator('.pc-model > .pc-first-boot').count(),0,'no overlay over the workbench');
 assert.equal(completions,0,'boot surprise does not award points automatically');
 assert.equal(await page.getByRole('button',{name:'Сохранить сборку',exact:true}).isEnabled(),true);
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 if(width===390){const model=await page.locator('.pc-model').boundingBox();assert.ok(model.y>=0&&model.y+model.height<=844,'whole monitor workspace fits without scrolling');await page.getByRole('button',{name:'Отойти от монитора',exact:true}).waitFor();}
 await page.screenshot({path:`artifacts/pc-builder/boot/rickroll-${width}.png`});
 await page.getByRole('button',{name:'Вернуться к сборке',exact:true}).click();assert.equal(await page.locator('.pc-first-boot').count(),0);assert.equal(await page.locator('.pc-boot-rickroll img').count(),0);
 // A failed real POST must not show the surprise.
 await page.evaluate(({key,build})=>localStorage.setItem(key,JSON.stringify({version:2,build})),{key,build:{...PC_DEFAULTS,psu:'psu_300'}});
 await open();await page.getByRole('button',{name:'Включить ПК',exact:true}).click();await page.locator('.pc-feedback.is-error').waitFor();
 assert.equal(await page.locator('.pc-first-boot').count(),0);assert.equal(await page.locator('.pc-canvas').getAttribute('data-powered'),'false');
 // Skipping early cancels timers and leaves no GIF behind.
 await page.evaluate(({key,build})=>localStorage.setItem(key,JSON.stringify({version:2,build})),{key,build:PC_DEFAULTS});
 await open();await page.getByRole('button',{name:'Включить ПК',exact:true}).click();await page.locator('.pc-first-boot[data-phase="bios"]').waitFor();
 await page.getByRole('button',{name:'Вернуться к сборке',exact:true}).press('Escape');
 await page.waitForTimeout(4200);assert.equal(await page.locator('.pc-first-boot').count(),0);assert.equal(gifRequests,1,'skipping BIOS cancels GIF');assert.deepEqual(errors,[]);
 await page.close();console.log(`PC first boot ${width}: BIOS → OS → animated local GIF; skip, failed POST, no automatic rewards and no overflow OK`);
}}finally{await browser.close();await server.close();}
