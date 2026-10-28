// Isolated navigation and room interactions. All users and API writes are fixtures.
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
import {updateAvatarRoom,ROOM_ITEMS,ROOM_CLUTTER} from '../functions/avatarRoom.mjs';
import {DEFAULT_PARTS} from '../functions/characterLooks.mjs';
const server=await createServer({server:{host:'127.0.0.1',port:3118,strictPort:true}});await server.listen();
const {projectRoom,roomLocalScale}=await server.ssrLoadModule('/utils/avatarRoomGeometry.ts');
const browser=await chromium.launch();mkdirSync('artifacts/avatar-room',{recursive:true});const errors=[];
try{
 for(const [width,avatar,parts,label] of [[1440,'av_1',null,'1440'],[390,'av_1',null,'390'],[1440,'av_2',null,'legacy'],[1440,'av_street_akira',null,'akira'],[1440,'av_1',{...DEFAULT_PARTS,hair:'long',outfit:'dress',accessory:'none',hairColor:'violet'},'orion-long-hair']]){
  let user={id:'room-audit-fixture',name:'Саша',role:'student',classId:'fixture_class',xp:0,currency:500,level:1,tasksCompleted:0,totalErrors:0,inventory:['av_1','col_default','frame_none'],achievements:[],equipped:{avatar,droneColor:'col_default',avatarFrame:'frame_none',...(parts?{characterParts:parts}:{})},completedTaskIds:[]};
  const ops=[];let failSave=false,failCleanup=label==='1440';
  const openPlan=async()=>{if(!await page.locator('.room-plan-details').evaluate(e=>e.open))await page.getByText('План пола и сдвиг по клеткам',{exact:true}).click();};
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/api/**',async route=>{
   const body=route.request().postDataJSON();ops.push(body);let data=null;
   try{switch(body.operation){
    case 'getUser':data=user;break;
    case 'listTasks':case 'listUsers':case 'listFolders':data=[];break;
    case 'listClassrooms':data=[{id:'fixture_class',teacherId:'fixture_teacher',name:'Класс',studentIds:[user.id],hiddenCourses:[]}];break;
    case 'cleanRoomSpot':case 'buyRoomItem':case 'saveRoomLayout':if(failCleanup&&body.operation==='cleanRoomSpot'){failCleanup=false;throw new Error('Проверка: уборка не сохранена');}if(failSave&&body.operation==='saveRoomLayout')throw new Error('Проверка: соединение потеряно');data=user=updateAvatarRoom(user,body.operation,body);break;
   }await route.fulfill({json:{data}});}catch(error){await route.fulfill({status:400,json:{error:error.message}});}
  });
  const choose=async(name)=>{if(!await page.locator('.room-catalog').count())await page.getByRole('button',{name:'Магазин мебели',exact:true}).click();await page.getByRole('button',{name:'Все',exact:true}).click();await page.getByRole('searchbox',{name:'Найти предмет для комнаты'}).clear();await page.getByRole('button',{name:`Выбрать: ${name}`,exact:true}).click();assert.equal(await page.locator('.room-catalog').count(),0,'selection returns directly to the apartment');};
  await page.goto('http://127.0.0.1:3118/');await page.getByRole('button',{name:'Моя комната',exact:true}).click();const dialog=page.getByRole('dialog');await dialog.waitFor();
  await page.locator('.room-scene image').first().evaluate(async e=>{await new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=reject;image.src=e.getAttribute('href');});});
  const sprite=await page.locator('.room-avatar-art').boundingBox(),floorShadow=await page.locator('.room-player>ellipse').boundingBox();const sceneBox=await page.locator('.room-scene').boundingBox(),viewBox=(await page.locator('.room-scene').getAttribute('viewBox')).split(' ').map(Number),roomScale=Math.min(sceneBox.width/viewBox[2],sceneBox.height/viewBox[3]);assert.ok(Math.abs(sprite.height-156*roomScale*roomLocalScale(3.5,7.5))<2,'all avatar families use the same floor viewport');assert.ok(Math.abs(sprite.y+sprite.height-floorShadow.y-floorShadow.height/2)<10,'avatar feet remain anchored to the floor');
  assert.equal(await page.locator('.room-scene').getAttribute('data-room-view'),'apartment');assert.equal(await page.locator('.room-building image').count(),1);assert.equal(await page.getByRole('button',{name:'Вид дома',exact:true}).count(),0);assert.equal(await page.getByRole('button',{name:'К квартире',exact:true}).count(),0);
  assert.equal(await page.locator('.room-dialogue').count(),0);assert.equal(await page.locator('.room-speech-bubble p').evaluate(e=>getComputedStyle(e).color),'rgb(22, 48, 73)','bubble text keeps strong contrast against the light surface');
  const bubble=await page.locator('.room-speech-bubble').boundingBox(),canvas=await page.locator('.room-scene').boundingBox();assert.ok(bubble.y>=canvas.y-2&&bubble.x>=canvas.x-2&&bubble.x+bubble.width<=canvas.x+canvas.width+2,'speech stays inside the room');
  await page.screenshot({path:`artifacts/avatar-room/messy-${label}.png`,fullPage:true});
  assert.ok(await page.getByRole('button',{name:'Обустроить',exact:true}).isDisabled());
  assert.equal(await page.locator('.room-clutter').count(),6);
  await page.getByRole('button',{name:'Уборка',exact:true}).click();
  if(label==='1440'){await page.locator('.room-cleanup-list button').first().click();await page.locator('.room-error').waitFor();assert.equal(await page.locator('.room-clutter').count(),6);assert.equal(user.currency,500);}
  for(let i=0;i<ROOM_CLUTTER.length;i++){
   if(!await page.locator('.room-cleanup-list').count())await page.getByRole('button',{name:'Уборка',exact:true}).click();
   await page.locator('.room-cleanup-list button').nth(i).click();await page.waitForFunction(count=>document.querySelectorAll('.room-clutter').length===count,5-i);
   if(i===1){await dialog.getByRole('button',{name:'Закрыть окно',exact:true}).click();await page.getByRole('button',{name:'Моя комната',exact:true}).click();assert.equal(await page.locator('.room-clutter').count(),4,'cleanup persists on reopen');}
  }
  assert.equal(user.currency,500);assert.equal(user.avatarRoom.cleared.length,6);assert.ok(!await page.getByRole('button',{name:'Обустроить',exact:true}).isDisabled());
  assert.equal(await page.locator('.room-scene').getAttribute('data-room-view'),'apartment','cleanup focuses the apartment');
  const speechBefore=await page.locator('.room-speech-bubble p').innerText();await page.getByRole('button',{name:'Поговорить',exact:true}).click();assert.notEqual(await page.locator('.room-speech-bubble p').innerText(),speechBefore);
  for(const category of ['Мебель','Декор','Свет']){await page.getByRole('button',{name:category,exact:true}).click();assert.equal(await page.locator('.room-catalog-card').count(),ROOM_ITEMS.filter(i=>i.category===category).length);}
  await page.getByRole('button',{name:'Все',exact:true}).click();assert.equal(await page.locator('.room-catalog-card').count(),ROOM_ITEMS.length);
  await page.screenshot({path:`artifacts/avatar-room/game-shop-${label}.png`,fullPage:true});await page.getByRole('button',{name:'Закрыть магазин комнаты',exact:true}).click();
  await page.screenshot({path:`artifacts/avatar-room/starter-${label}.png`,fullPage:true});
  assert.equal(await page.locator('.room-object[data-ghost]').count(),0);assert.equal(await page.locator('.room-object').count(),2);
  if(label==='1440')await page.emulateMedia({reducedMotion:'no-preference'});
  await page.getByLabel('Клетка 3, 5',{exact:true}).dispatchEvent('click');
  if(label==='1440')await page.waitForFunction(()=>document.querySelector('.room-player')?.dataset.moving==='true');await page.waitForFunction(()=>{const p=document.querySelector('.room-player');return p?.dataset.gridX==='2.000'&&p.dataset.gridY==='4.000'&&p.dataset.moving==='false';});
  await page.emulateMedia({reducedMotion:'reduce'});
  await choose('Стол исследователя');
  if(label==='1440'){
   const scene=page.locator('.room-scene'),target=await scene.evaluate((svg,point)=>{const p=new DOMPoint(point.x,point.y).matrixTransform(svg.getScreenCTM());return{x:p.x,y:p.y};},projectRoom(2.5,2.5));await page.mouse.move(target.x,target.y);
   const ghost=page.locator('.room-object[data-ghost]');await page.waitForFunction(()=>document.querySelector('.room-object[data-ghost]')?.dataset.gridX==='2');assert.equal(await ghost.getAttribute('data-grid-y'),'2');
   await page.mouse.click(target.x,target.y);await page.mouse.move(target.x+90,target.y+40);assert.equal(await ghost.getAttribute('data-grid-x'),'2','click pins the preview');
   await page.getByLabel('Клетка 3, 3',{exact:true}).focus();await page.keyboard.press('ArrowDown');assert.equal(await ghost.getAttribute('data-grid-x'),'3');await page.keyboard.press('r');assert.equal(await ghost.getAttribute('data-rotation'),'1');await page.keyboard.press('r');
  }
  assert.equal(await page.locator('.room-size-badge').getAttribute('data-footprint'),'1x2');
  await openPlan();
  assert.equal(await page.locator('.room-footprint-overlay polygon').count(),3);
  await page.getByLabel('На плане: 6, 1',{exact:true}).click();assert.ok(await page.getByRole('button',{name:'Купить и поставить · 140',exact:true}).isDisabled(),'cannot place on occupied bed');
  await page.getByLabel('Клетка 1, 2',{exact:true}).dispatchEvent('click');await page.getByRole('button',{name:'Повернуть',exact:true}).click();assert.equal(await page.locator('.room-size-badge').getAttribute('data-footprint'),'2x1');
  await page.getByRole('button',{name:'Купить и поставить · 140',exact:true}).click();await page.getByText('Предмет установлен. Сохрани расстановку.',{exact:true}).waitFor();assert.equal(user.currency,360);
  await choose('Зелёный друг');await page.getByLabel('Клетка 7, 7',{exact:true}).dispatchEvent('click');await page.getByRole('button',{name:'Купить и поставить · 45',exact:true}).click();await page.getByText('Предмет установлен. Сохрани расстановку.',{exact:true}).waitFor();assert.equal(user.currency,315);
  await page.getByRole('button',{name:'Изменить цвет ковров',exact:true}).click();await page.getByRole('button',{name:'Розовый рассвет',exact:true}).click();await page.getByRole('button',{name:'Закрыть оформление',exact:true}).click();
  failSave=true;await page.getByRole('button',{name:'Сохранить',exact:true}).click();await page.locator('.room-error').waitFor();assert.ok(!await page.getByRole('button',{name:'Сохранить',exact:true}).isDisabled());failSave=false;
  await page.getByRole('button',{name:'Сохранить',exact:true}).click();await page.getByText('Комната сохранена.',{exact:true}).waitFor();assert.equal(user.avatarRoom.placements.length,4);assert.equal(user.avatarRoom.palette,'rose');
  await page.getByRole('button',{name:'В комнате',exact:true}).click();await page.screenshot({path:`artifacts/avatar-room/furnished-${label}.png`,fullPage:true});
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no page overflow');
  const close=dialog.getByRole('button',{name:'Закрыть окно',exact:true});await close.click();await page.getByRole('button',{name:'Моя комната',exact:true}).click();assert.equal(await page.locator('.room-object').count(),4);
  await choose('Стол исследователя');await page.getByRole('button',{name:'Убрать',exact:true}).click();await close.click();await page.getByText('Расстановка ещё не сохранена.',{exact:true}).waitFor();await page.getByRole('button',{name:'Остаться',exact:true}).click();
  await page.getByRole('button',{name:'Сохранить',exact:true}).click();await page.getByText('Комната сохранена.',{exact:true}).waitFor();assert.ok(user.avatarRoom.owned.includes('room_desk'));assert.equal(user.currency,315);
  await choose('Стол исследователя');await page.getByRole('button',{name:'Поставить',exact:true}).click();await page.getByRole('button',{name:'Сохранить',exact:true}).click();await page.getByText('Комната сохранена.',{exact:true}).waitFor();assert.equal(ops.filter(o=>o.operation==='buyRoomItem'&&o.itemId==='room_desk').length,1);
  for(const [name,cost,x,y] of [['Кресло «Пауза»',85,3,1],['Стеллаж открытий',120,0,4],['Светильник «Тепло»',65,3,0]]){
   await choose(name);await page.getByLabel(`Клетка ${x+1}, ${y+1}`,{exact:true}).dispatchEvent('click');await page.getByRole('button',{name:`Купить и поставить · ${cost}`,exact:true}).click();await page.getByText('Предмет установлен. Сохрани расстановку.',{exact:true}).waitFor();
  }
  await page.getByRole('button',{name:'Сохранить',exact:true}).click();await page.getByText('Комната сохранена.',{exact:true}).waitFor();await page.getByRole('button',{name:'В комнате',exact:true}).click();
  if(width<600){if(await page.getByRole('button',{name:'Весь вид',exact:true}).count())await page.getByRole('button',{name:'Весь вид',exact:true}).click();const scene=await page.locator('.room-scene').boundingBox();assert.ok(scene.width<width);}
  assert.equal(user.currency,45);
  await choose('Кровать «Облако»');assert.equal(await page.locator('.room-size-badge').getAttribute('data-footprint'),'2x3');assert.equal(await page.locator('.room-footprint-overlay polygon').count(),7);
  if(width===390)assert.equal(await page.locator('.room-speech-bubble').count(),0,'zoomed placement keeps the floor clear of clipped speech');
  await page.screenshot({path:`artifacts/avatar-room/placement-valid-${label}.png`,fullPage:true});await openPlan();
  await page.getByLabel('На плане: 8, 8',{exact:true}).click();assert.ok(await page.getByRole('button',{name:'Поставить',exact:true}).isDisabled());
  await page.getByRole('button',{name:'↖ К стене',exact:true}).click();assert.ok((await page.locator('.room-placement-error').innerText()).includes('границы'));
  await page.screenshot({path:`artifacts/avatar-room/placement-${label}.png`,fullPage:true});await page.getByRole('button',{name:'Отмена',exact:true}).click();await page.getByRole('button',{name:'В комнате',exact:true}).click();
  await page.screenshot({path:`artifacts/avatar-room/complete-${label}.png`,fullPage:true});
  if(label==='orion-long-hair'){
   await choose('Кот «Муркод»');await page.getByLabel('Клетка 5, 4',{exact:true}).dispatchEvent('click');await page.getByRole('button',{name:'Купить и поставить · 40',exact:true}).click();await page.getByText('Предмет установлен. Сохрани расстановку.',{exact:true}).waitFor();assert.equal(user.currency,5);
   await page.getByRole('button',{name:'Сохранить',exact:true}).click();await page.getByText('Комната сохранена.',{exact:true}).waitFor();
   user={...user,currency:5000};for(const item of ROOM_ITEMS)user=updateAvatarRoom(user,'buyRoomItem',{itemId:item.id});
   const placements=[['bed',5,0],['rug',3,3],['sofa',0,4],['dresser',0,1],['coffee_table',3,5],['plush_cat',4,3],['aquarium',7,4],['neon_arch',3,0],['star_lamp',6,6],['orb_lamp',0,6]].map(([id,x,y])=>({itemId:`room_${id}`,x,y,rotation:0}));
   user=updateAvatarRoom(user,'saveRoomLayout',{revision:user.avatarRoom.revision,placements,palette:'lavender'});
   await page.reload();await page.getByRole('button',{name:'Моя комната',exact:true}).click();
   await page.evaluate(async assets=>{await Promise.all(assets.map(src=>new Promise((resolve,reject)=>{const image=new Image();image.onload=resolve;image.onerror=()=>reject(new Error(src));image.src=src;})));},ROOM_ITEMS.map(item=>item.asset));
   await page.screenshot({path:'artifacts/avatar-room/expanded-room.png',fullPage:true});
   const more=[['bunk_bed',5,0],['wardrobe',0,1],['piano',0,4],['vanity',3,0],['beanbag',3,3],['display_shelf',6,4],['globe',4,4],['indoor_tree',0,6],['art_easel',7,6],['runner_rug',2,4],['lava_lamp',5,6],['floor_lantern',4,6]].map(([id,x,y])=>({itemId:`room_${id}`,x,y,rotation:0}));
   user=updateAvatarRoom(user,'saveRoomLayout',{revision:user.avatarRoom.revision,placements:more,palette:'rose'});await page.reload();await page.getByRole('button',{name:'Моя комната',exact:true}).click();await page.getByRole('button',{name:'Скрыть реплику',exact:true}).click();await page.screenshot({path:'artifacts/avatar-room/collection-v3.png',fullPage:true});
  }
  await page.close();
 }
 assert.deepEqual(errors,[]);console.log('avatarRoom browser: cleanup, persisted progress, dialogue, expanded catalog, footprint, floor plan, nudge, walk, collision, buy, rotate, error recovery, save, reopen, storage, no repeated charge, mobile bounds OK');
}catch(error){for(const p of browser.contexts().flatMap(c=>c.pages())){await p.screenshot({path:'artifacts/avatar-room/failure.png',fullPage:true}).catch(()=>{});console.error((await p.locator('body').innerText()).slice(-2000));}throw error;}finally{await browser.close();await server.close();}
