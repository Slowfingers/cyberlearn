// Local fixture users only; geometry checks complement mission/firmware checks.
import assert from 'node:assert/strict';import{mkdirSync}from'node:fs';import{chromium}from'@playwright/test';import{createServer}from'vite';
const server=await createServer({server:{host:'127.0.0.1',port:3127,strictPort:true}});await server.listen();const {CITY_CONNECTIONS}=await server.ssrLoadModule('/utils/smartCityRuntime.ts');const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});const errors=[];mkdirSync('artifacts/smart-city/layout',{recursive:true});
const page=await browser.newPage({viewport:{width:1429,height:554},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
await page.route('**/api/**',async route=>{const b=route.request().postDataJSON();let data=null;if(b.operation==='getUser')data={id:'city-layout-audit',name:'Саша',role:'student',classId:'fixture',xp:0,currency:0,level:1,tasksCompleted:0,inventory:['av_1'],achievements:[],completedTaskIds:[],equipped:{avatar:'av_1'}};else if(b.operation==='listClassrooms')data=[{id:'fixture',teacherId:'fixture_teacher',name:'Класс',studentIds:['city-layout-audit'],hiddenCourses:[]}];else if(['listTasks','listUsers','listFolders'].includes(b.operation))data=[];await route.fulfill({json:{data}});});
const overlap=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y));
const bounds=()=>page.evaluate(()=>{const box=s=>{const e=document.querySelector(s),r=e.getBoundingClientRect();return{x:r.x,y:r.y,right:r.right,bottom:r.bottom,w:r.width,h:r.height};};return{width:innerWidth,height:innerHeight,scene:box('.city-model-area'),study:box('.city-study'),actions:box('.city-run-actions'),content:document.querySelector('.city-study-content')?box('.city-study-content'):null};});
try{
 await page.goto('http://127.0.0.1:3127/');await page.getByLabel('Класс / Кампания').selectOption('course_smart_city');await page.getByRole('button',{name:'Начать миссию',exact:true}).click();await page.getByRole('region',{name:'Мастерская умного города',exact:true}).waitFor();
 for(const [width,height]of[[1429,554],[1280,720],[1024,600],[1440,900],[1920,1080],[320,740],[390,844],[768,1024],[844,390]]){
  await page.setViewportSize({width,height});
  for(const mission of['traffic','gate']){
   await page.getByRole('button',{name:mission==='traffic'?/Светофор/:/Шлагбаум/}).click();await page.getByRole('combobox',{name:'Исполнение программы'}).selectOption('lesson');
   await page.getByRole('tab',{name:/Подключение/}).click();
   const icon=await page.locator('.city-wiring-instruction>svg').boundingBox();if(icon)assert.ok(icon.width<=24&&icon.height<=24,`${width}×${height}/${mission}: instruction icon stays small (${icon.width}×${icon.height})`);
   assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${width}/${mission}: document width`);
   if(width>850){
    const diagram=await page.locator('.city-wiring>svg').boundingBox(),region=await page.locator('.city-wiring-content').boundingBox();assert.ok(diagram.y>=region.y-1&&diagram.y+diagram.height<=region.y+region.height+1,`${width}/${mission}: diagram fits the workspace`);
    const g=await bounds();assert.equal(overlap(g.scene,g.study),0);assert.ok(g.actions.y>=g.study.y&&g.actions.bottom<=g.study.bottom+1,`${width}/${mission}: action buttons stay visible`);
    const fontSize=await page.locator('.city-wiring>svg').evaluate(e=>e.getScreenCTM().a*14);assert.ok(fontSize>=10,`${width}/${mission}: contact labels remain readable (${fontSize}px)`);
    for(const contact of await page.locator('.city-wiring>svg [role=button]').all()){const box=await contact.boundingBox();assert.ok(box.y>=region.y&&box.y+box.height<=region.y+region.height,`${width}/${mission}: all terminals fit`);}
   }else{const controls=page.locator('.city-wire-mobile select');assert.equal(await controls.count(),mission==='traffic'?4:7);for(const control of await controls.all()){await control.scrollIntoViewIfNeeded();const b=await control.boundingBox();assert.ok(b.width>=100&&b.height>=32);}}
   for(const port of CITY_CONNECTIONS[mission]){if(width>850){await page.getByRole('button',{name:`Контакт ${port.label}`,exact:true}).click();await page.getByRole('button',{name:`Вывод Arduino ${port.pin}`,exact:true}).click();}else await page.getByRole('combobox',{name:`Соединение ${port.label}`,exact:true}).selectOption(port.pin);}
   if(width>850){const collisions=await page.locator('.city-terminal[aria-pressed]').evaluateAll(nodes=>nodes.filter(e=>{const texts=e.querySelectorAll('text');return texts.length>1&&texts[0].getBoundingClientRect().right>texts[1].getBoundingClientRect().left-3;}).length);assert.equal(collisions,0,`${width}/${mission}: pin values do not cover contact labels`);}
   await page.screenshot({path:`artifacts/smart-city/layout/${mission}-wiring-${width}x${height}.png`});
   await page.getByRole('tab',{name:'3D-город',exact:true}).click();
   for(const summary of['План и подсказки','Какие команды можно использовать?'])await page.getByText(summary,{exact:true}).click();
   await page.getByRole('combobox',{name:'Исполнение программы'}).selectOption('cpp');await page.locator('.city-serial summary').click();
   const broken=await page.locator('.city-study h2,.city-objective p,.city-execution-mode,.city-run-actions button,.city-language-help,.city-serial').evaluateAll(nodes=>nodes.filter(e=>e.clientWidth&&e.scrollWidth>e.clientWidth+2).map(e=>e.className||e.textContent));assert.deepEqual(broken,[],`${width}/${mission}: text bounds`);
   const g=await bounds();if(width>850)assert.ok(g.actions.bottom<=g.study.bottom+1,`${width}/${mission}: expanded material does not push actions off screen`);
   await page.getByRole('tab',{name:'3D-город',exact:true}).scrollIntoViewIfNeeded();await page.screenshot({path:`artifacts/smart-city/layout/${mission}-model-${width}x${height}.png`});
   await page.getByRole('button',{name:'Развернуть рабочую область'}).click();await page.waitForFunction(()=>document.querySelector('.city-model-area').getBoundingClientRect().height>innerHeight-40);
   const overlapping=await page.evaluate(()=>{const selectors=['.city-scene-title','.city-camera','.city-distance','.city-live-status'];const boxes=selectors.map(s=>document.querySelector(s)).filter(e=>e&&getComputedStyle(e).display!=='none').map(e=>e.getBoundingClientRect());return boxes.some((a,i)=>boxes.slice(i+1).some(b=>Math.min(a.right,b.right)-Math.max(a.left,b.left)>1&&Math.min(a.bottom,b.bottom)-Math.max(a.top,b.top)>1));});assert.equal(overlapping,false,`${width}/${mission}: scene controls do not overlap`);
   await page.keyboard.press('Escape');assert.equal(await page.locator('.city-study').isVisible(),true);
  }
  console.log(`Smart city layout ${width}×${height}: both missions, wiring/icons, sidebar/actions, expanded help/Serial, fullscreen/Escape OK`);
 }
 assert.deepEqual(errors,[]);
}catch(e){await page.screenshot({path:'artifacts/smart-city/layout/failure.png',fullPage:true});throw e;}finally{await browser.close();await server.close();}
