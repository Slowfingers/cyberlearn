// Mocked student and campaign fixture only; no school accounts are used.
import assert from 'node:assert/strict';import{chromium}from'@playwright/test';import{createServer}from'vite';import{buyCosmetic}from'../functions/domain.mjs';
const server=await createServer({server:{host:'127.0.0.1',port:3132,strictPort:true}});await server.listen();const{COSMETICS}=await server.ssrLoadModule('/constants.ts');const browser=await chromium.launch();
try{for(const width of[1440,390]){
 let user={id:'new-street-audit',name:'Саша',role:'student',classId:'fixture',xp:50000,level:12,currency:1000,inventory:['av_1','frame_none'],achievements:[],completedTaskIds:[],equipped:{avatar:'av_1',droneColor:'col_default',avatarFrame:'frame_none'}};
 const page=await browser.newPage({viewport:{width,height:1000}}),errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.route('**/api/**',async route=>{const d=route.request().postDataJSON();let data=null;
 if(d.operation==='getUser')data=user;if(['listTasks','listUsers','receiveFeedback','listFolders'].includes(d.operation))data=[];
 if(d.operation==='listClassrooms')data=[{id:'fixture',teacherId:'fixture_teacher',name:'Класс',studentIds:[user.id]}];
 if(['buyItem','equipItem'].includes(d.operation))data=user=buyCosmetic(user,COSMETICS.find(c=>c.id===d.itemId),d.operation==='equipItem');
 await route.fulfill({json:{data}});});
 await page.goto('http://127.0.0.1:3132/');await page.getByRole('button',{name:'Магазин',exact:true}).click();
 for(const name of['elli','kai','mira','axel']){
  const card=page.locator(`[data-cosmetic-id="av_street_${name}"]`);assert.equal(await card.locator('.modular-character').count(),0,'new heroes must use painted sprites, not Orion variants');assert.ok(await card.locator(`image[href="/avatar/street/${name}.png"]`).count()>0);
  await card.getByRole('button',{name:/Купить за/}).click();await page.waitForFunction(id=>document.querySelector(`[data-cosmetic-id="${id}"]`)?.dataset.equipped==='true',`av_street_${name}`);
 }
 assert.equal(user.currency,400);await page.getByRole('combobox',{name:'Анимация героев в магазине'}).selectOption('walk');
 for(const name of['elli','kai','mira','axel'])assert.equal(await page.locator(`[data-cosmetic-id="av_street_${name}"] .character-leg--near`).evaluate(e=>getComputedStyle(e).animationName),'orion-leg-near');
 await page.screenshot({path:`artifacts/characters/shop-painted-${width}.png`});
 await page.goto('http://127.0.0.1:3132/campaign-audit.html');await page.getByRole('combobox',{name:'Герой',exact:true}).selectOption('elli');const actor=page.locator('.campaign-traveler');await page.locator('.campaign-region').first().click();await actor.waitFor();await page.locator('.campaign-node').first().evaluate(e=>e.click());await page.waitForFunction(()=>document.querySelector('.campaign-traveler')?.dataset.moving==='true');
 assert.equal(await actor.locator('.modular-character').count(),0);assert.ok(await actor.locator('image[href="/avatar/street/elli.png"]').count()>0);
 const position=await actor.getAttribute('data-x');await page.waitForTimeout(170);assert.notEqual(await actor.getAttribute('data-x'),position);assert.equal(await actor.locator('.character-leg--near').evaluate(e=>getComputedStyle(e).animationName),'orion-leg-near');
 await page.screenshot({path:`artifacts/characters/map-painted-${width}.png`});assert.deepEqual(errors,[]);await page.close();console.log(`Painted street avatars ${width}: all four raster heroes, purchase/equipment, shop animation and map walking OK`);
}}finally{await browser.close();await server.close();}
