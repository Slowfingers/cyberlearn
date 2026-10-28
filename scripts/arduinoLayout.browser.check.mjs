// Audit only local fixture lab documents, never real student accounts.
import assert from 'node:assert/strict';import {mkdirSync}from'node:fs';import{chromium}from'@playwright/test';import{createServer}from'vite';
const server=await createServer({server:{host:'127.0.0.1',port:3123,strictPort:true}});await server.listen();const browser=await chromium.launch({args:['--use-angle=swiftshader','--enable-webgl','--ignore-gpu-blocklist']});const errors=[];mkdirSync('artifacts/arduino/layout',{recursive:true});
const page=await browser.newPage({viewport:{width:1440,height:900},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));page.on('console',m=>{if(m.type()==='error')errors.push(m.text().slice(0,400));});
try{
 await page.goto('http://127.0.0.1:3123/courses/arduino/index.html?student=layout-audit-fixture#project');await page.waitForFunction(()=>window.__app&&document.querySelector('#app').inert===false,null,{timeout:60000});
 const geometry=async()=>page.evaluate(()=>{
  const rect=s=>{const e=document.querySelector(s),r=e.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height,right:r.right,bottom:r.bottom};};
  return{width:innerWidth,height:innerHeight,scrollWidth:document.documentElement.scrollWidth,stage:rect('#stage'),nav:rect('.sidebar'),study:rect('.lab-study-panel'),lessons:rect('.lessons'),hud:rect('.lab-scene-actions'),run:rect('.lab-run'),camera:rect('.viewbar'),inspector:rect('#inspector')};
 });
 const overlap=(a,b)=>Math.max(0,Math.min(a.right,b.right)-Math.max(a.x,b.x))*Math.max(0,Math.min(a.bottom,b.bottom)-Math.max(a.y,b.y));
 for(const [width,height]of[[320,740],[390,844],[768,1024],[1024,768],[1440,900],[1920,1080]].filter(([width])=>!process.argv.includes('--mobile-only')||width<1000)){
  await page.setViewportSize({width,height});await page.evaluate(()=>{scrollTo(0,0);document.querySelector('.lab-study-panel').scrollTop=0;window.__app.stage.select(null);window.__app.selectLesson('project');window.__app.setSetting('labels',false);});await page.waitForTimeout(200);
  assert.equal(await page.locator('a[href^="http"]').count(),0);assert.equal(await page.locator('.brand').isVisible(),false);assert.ok(await page.locator('.sidebar svg').evaluateAll(nodes=>nodes.every(svg=>svg.hasAttribute('viewBox'))),'translated SVG attribute names stay valid');assert.equal(await page.evaluate(()=>window.__app.stage.mark.active),false,'no social watermark on the floor');
  const g=await geometry();
  assert.ok(g.scrollWidth<=width,`${width}: document overflow`);for(const key of['nav','stage','study','lessons']){assert.ok(g[key].w>100&&g[key].h>=36,`${width}: ${key} has usable dimensions`);assert.ok(g[key].x>=-1&&g[key].right<=width+1,`${width}: ${key} stays within width`);}
  for(const [a,b]of[['stage','study'],['stage','nav'],['stage','lessons']])assert.equal(overlap(g[a],g[b]),0,`${width}: ${a} and ${b} do not overlap`);
  assert.equal(overlap(g.run,g.camera),0,`${width}: launch and camera controls remain separate`);assert.ok(g.hud.y>=g.stage.y&&g.hud.bottom<=g.stage.bottom,`${width}: HUD stays in the model area`);
  assert.ok(await page.locator('.lessons .lesson').first().isVisible(),`${width}: lesson strip is visible`);
  assert.ok(g.lessons.h<=80,`${width}: compact lesson strip`);
  const lessonBefore=await page.evaluate(()=>window.__app.state.lesson.id);
  await page.locator('.lab-expand').click();await page.waitForFunction(()=>document.documentElement.classList.contains('lab-scene-expanded'));
  const full=await geometry();assert.ok(full.stage.w>=width-20&&full.stage.h>=height-20,`${width}: model uses the viewport`);
  assert.equal(await page.locator('.lessons').isVisible(),false);assert.equal(await page.locator('.lab-study-panel').isVisible(),false);
  await page.screenshot({path:`artifacts/arduino/layout/fullscreen-${width}.png`});
  await page.keyboard.press('Escape');await page.waitForFunction(()=>!document.documentElement.classList.contains('lab-scene-expanded'));
  assert.equal(await page.evaluate(()=>window.__app.state.lesson.id),lessonBefore);assert.equal(await page.locator('.lab-study-panel').isVisible(),true);

  for(const title of['Обзор','Подключение','Пример','Характеристики']){
   await page.getByRole('tab',{name:title,exact:true}).click();const broken=await page.locator('.info-content').evaluate(e=>e.scrollWidth>e.clientWidth+2);assert.equal(broken,false,`${width}/${title}: explanation fits`);
  }
  await page.getByRole('tab',{name:'Обзор',exact:true}).click();
  await page.locator('.info-body .expand').click();assert.ok(await page.locator('.info-card').evaluate(e=>e.classList.contains('is-expanded')));await page.locator('.info-body .expand').click();
  await page.locator('.btn-expand').click();assert.ok(await page.locator('.code-card').evaluate(e=>e.classList.contains('is-expanded')));assert.equal(await page.locator('.info-card').isVisible(),false);await page.locator('.btn-expand').click();assert.equal(await page.locator('.info-card').isVisible(),true);
  await page.evaluate(()=>window.__app.stage.select('lights'));await page.locator('#inspector.is-on').waitFor();
  assert.equal(await page.locator('#inspector').evaluate(e=>e.parentElement.classList.contains('lab-study-panel')),true);
  const slider=page.locator('#inspector input[type=range]').first();await slider.focus();await slider.press('Home');await slider.press('End');
  const bounds=await page.locator('#inspector').evaluate(e=>({scroll:e.scrollWidth,client:e.clientWidth}));assert.ok(bounds.scroll<=bounds.client+2,`${width}: inspector does not overflow`);
  if(width<1000){const current=await geometry();assert.equal(overlap(current.nav,current.lessons),0,`${width}: tools do not cover lessons while scrolling`);}
  if(width>=1000){const current=await geometry();assert.equal(overlap(current.stage,current.inspector),0,`${width}: inspector never covers the model`);}
  await page.screenshot({path:`artifacts/arduino/layout/inspector-${width}.png`,fullPage:true});
  await page.locator('.insp-close').click();await page.locator('.lab-run').click();await page.waitForFunction(()=>window.__app.state.running==='running');await page.locator('.lab-run[data-running=true]').waitFor();await page.screenshot({path:`artifacts/arduino/layout/running-${width}.png`,fullPage:true});await page.locator('.lab-run').click();await page.waitForFunction(()=>window.__app.state.running==='idle');
  await page.locator('.lab-label-toggle').click();assert.equal(await page.locator('.lab-label-toggle').getAttribute('aria-pressed'),'true');await page.locator('.lab-label-toggle').click();
  await page.getByRole('link',{name:'Настройки',exact:true}).click();await page.locator('.flyout.is-open').waitFor();const fly=await page.locator('.flyout').boundingBox();assert.ok(fly.x>=0&&fly.x+fly.width<=width+1&&fly.height<height,`${width}: settings panel stays on screen`);await page.getByRole('link',{name:'Настройки',exact:true}).click();
  await page.locator('.btn-run').click();await page.waitForFunction(()=>document.querySelector('.lab-run').dataset.running==='true');await page.locator('.btn-run').click();await page.waitForFunction(()=>window.__app.state.running==='idle');
  console.log(`Arduino layout ${width}×${height}: separate regions, 4 tabs, inspector sliders, launch/stop, labels, settings, no external links OK`);
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close();await server.close();}
