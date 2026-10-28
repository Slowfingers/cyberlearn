// Isolated students and mocked API; the real local GIF is rendered in the monitor.
import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
const server=await createServer({server:{host:'127.0.0.1',port:3142,strictPort:true}});
await server.listen();
const {MOCK_TASKS}=await server.ssrLoadModule('/constants.ts');
const {PC_DEFAULTS,PC_PARTS}=await server.ssrLoadModule('/utils/pcAssembly.ts');
const tasks=MOCK_TASKS.filter(t=>t.courseId==='course_pc_builder'),final=tasks.at(-1);
mkdirSync('artifacts/pc-builder/boot',{recursive:true});
const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});
try{for(const width of [1430]){
 const page=await browser.newPage({viewport:{width,height:width===1430?800:844},reducedMotion:'reduce'}),errors=[];
 let gifRequests=0,completions=0;
 page.on('pageerror',e=>errors.push(e.message));
 page.on('request',request=>{if(new URL(request.url()).pathname==='/art/pc-builder/rickroll.gif')gifRequests++;});
 const user={id:`pc-boot-fixture-${width}`,name:'Саша',role:'student',classId:'fixture_class',xp:0,currency:0,level:1,tasksCompleted:5,totalErrors:0,inventory:['av_1','col_default','frame_none'],achievements:[],equipped:{avatar:'av_1',droneColor:'col_default',avatarFrame:'frame_none'},completedTaskIds:tasks.slice(0,5).map(t=>t.id)};
 await page.route('http://127.0.0.1:3142/api/**',async route=>{const b=route.request().postDataJSON();let data=null;if(b.operation==='getUser')data=user;if(['listTasks','listUsers','listFolders'].includes(b.operation))data=[];if(b.operation==='listClassrooms')data=[{id:'fixture_class',teacherId:'fixture_teacher',name:'Класс',studentIds:[user.id],hiddenCourses:[]}];if(b.operation==='completeTask')completions++;await route.fulfill({json:{data}});});
 const key=`cyberlearn:pc:v1:${user.id}:${final.id}`;
 await page.addInitScript(({key,build})=>{if(!localStorage.getItem(key))localStorage.setItem(key,JSON.stringify({version:2,build}));},{key,build:PC_DEFAULTS});
 const open=async()=>{await page.goto('http://127.0.0.1:3142/?pcArt=1');await page.getByLabel('Класс / Кампания').selectOption('course_pc_builder');await page.getByRole('button',{name:/Начать миссию/}).click();await page.locator('.pc-canvas').waitFor();await page.locator('.pc-objective h2').filter({hasText:final.title}).waitFor();};
 await open();
 await page.getByRole('button',{name:'Весь набор',exact:true}).click();
 await page.getByLabel('Тип комплектующей').selectOption('all');
 await page.waitForFunction(()=>document.querySelector('.pc-canvas')?.dataset.modelsLoaded==='6'&&document.querySelector('.pc-canvas')?.dataset.artworkReady==='true',null,{timeout:120000});
 const icons=await page.locator('.pc-parts button').evaluateAll(buttons=>buttons.map(button=>({label:button.getAttribute('aria-label'),image:button.querySelector('img')?.src})));
 mkdirSync('public/art/pc-builder/parts',{recursive:true});
 for(const part of PC_PARTS){const icon=icons.find(icon=>icon.label===`${part.name} · ${part.spec}`);assert.ok(icon?.image?.startsWith('data:image/png;'),part.id);writeFileSync(`public/art/pc-builder/parts/${part.id}.png`,Buffer.from(icon.image.split(',')[1],'base64'));}
 console.log(`Exported ${PC_PARTS.length} original 256×192 sprites`);assert.deepEqual(errors,[]);await page.close();
}}finally{await browser.close();await server.close();}
