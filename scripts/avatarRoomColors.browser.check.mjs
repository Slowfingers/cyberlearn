// Real room rendering with a fixture API. Measures pixels, never uses school accounts.
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
import {ROOM_CLUTTER,ROOM_ITEMS,ROOM_PALETTES,updateAvatarRoom} from '../functions/avatarRoom.mjs';
import sharp from '/Users/alexgsi/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp/dist/index.mjs';
const server=await createServer({server:{host:'127.0.0.1',port:3119,strictPort:true}});await server.listen();
const browser=await chromium.launch();mkdirSync('artifacts/avatar-room/colors',{recursive:true});
const errors=[];
try{
 for(const width of [1440,390]){
  let user={id:'room-color-fixture',name:'Саша',role:'student',classId:'fixture_class',xp:0,currency:0,level:1,tasksCompleted:0,totalErrors:0,inventory:['av_1','frame_none'],achievements:[],equipped:{avatar:'av_1',avatarFrame:'frame_none'},completedTaskIds:[],avatarRoom:{owned:['room_bed','room_rug','room_round_rug'],cleared:ROOM_CLUTTER.map(s=>s.id),placements:[{itemId:'room_bed',x:5,y:0,rotation:0},{itemId:'room_rug',x:3,y:3,rotation:0},{itemId:'room_round_rug',x:0,y:2,rotation:0}],revision:0,palette:'aqua'}};
  const page=await browser.newPage({viewport:{width,height:1000},reducedMotion:'reduce'});page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/api/**',async route=>{const body=route.request().postDataJSON();let data=null;if(body.operation==='getUser')data=user;if(['listTasks','listUsers','listFolders'].includes(body.operation))data=[];if(body.operation==='listClassrooms')data=[{id:'fixture_class',teacherId:'fixture_teacher',name:'Класс',studentIds:[user.id],hiddenCourses:[]}];if(body.operation==='saveRoomLayout')data=user=updateAvatarRoom(user,body.operation,body);await route.fulfill({json:{data}});});
  await page.goto('http://127.0.0.1:3119/');await page.getByRole('button',{name:'Моя комната',exact:true}).click();
  await page.getByRole('button',{name:'Изменить цвет ковров',exact:true}).click();await page.getByRole('group',{name:'Цвет ковров',exact:true}).waitFor();
  const rug=page.locator('.room-object[data-item-id="room_rug"] image'),round=page.locator('.room-object[data-item-id="room_round_rug"] image');
  await page.evaluate(async()=>{await Promise.all(['/art/avatar-room/rug-v1.webp','/art/avatar-room/round_rug-v1.webp'].map(src=>new Promise((resolve,reject)=>{const i=new Image();i.onload=resolve;i.onerror=reject;i.src=src;})));});
  const pixels=[];
  for(const palette of ROOM_PALETTES){
   await page.getByRole('button',{name:palette.name,exact:true}).click();if(await page.getByRole('button',{name:'Скрыть реплику',exact:true}).count())await page.getByRole('button',{name:'Скрыть реплику',exact:true}).click();
   assert.ok((await rug.evaluate(e=>getComputedStyle(e).filter)).includes(`-rug-${palette.id}`));
   assert.ok((await round.evaluate(e=>getComputedStyle(e).filter)).includes(`-rug-${palette.id}`));
   await rug.scrollIntoViewIfNeeded();const buffer=await rug.screenshot({path:`artifacts/avatar-room/colors/rug-${palette.id}-${width}.png`});
   pixels.push(await sharp(buffer).removeAlpha().raw().toBuffer());
   await page.screenshot({path:`artifacts/avatar-room/colors/room-${palette.id}-${width}.png`,fullPage:true});
  }
  const deltas=[];for(let i=0;i<pixels.length;i++)for(let j=i+1;j<pixels.length;j++){assert.equal(pixels[i].length,pixels[j].length);let diff=0;for(let k=0;k<pixels[i].length;k++)diff+=Math.abs(pixels[i][k]-pixels[j][k]);const mean=diff/pixels[i].length;assert.ok(mean>8,`colors must visibly differ: ${i}/${j}, delta ${mean}`);deltas.push(Math.round(mean));}
  await page.getByRole('button',{name:'Розовый рассвет',exact:true}).click();await page.getByRole('button',{name:'Сохранить',exact:true}).click();await page.getByText('Комната сохранена.',{exact:true}).waitFor();assert.equal(user.currency,0);
  await page.getByRole('button',{name:'Закрыть окно',exact:true}).click();await page.getByRole('button',{name:'Моя комната',exact:true}).click();assert.ok((await rug.evaluate(e=>getComputedStyle(e).filter)).includes('-rug-rose'));
  await page.getByRole('button',{name:'Магазин мебели',exact:true}).click();
  const search=page.getByRole('searchbox',{name:'Найти предмет для комнаты'});await search.fill('ПИАНИНО');assert.equal(await page.locator('.room-catalog-card').count(),1);assert.ok(await page.getByRole('button',{name:'Выбрать: Пианино «Синтез»',exact:true}).isVisible());await search.fill('несуществующий предмет');await page.getByText('Ничего не найдено. Попробуй другое слово.',{exact:true}).waitFor();await search.clear();assert.equal(await page.locator('.room-catalog-card').count(),ROOM_ITEMS.length);
  console.log(`rug colors ${width}: pixel deltas ${deltas.join(', ')}, both rugs recolor, zero-coin save/reopen and catalog search OK`);await page.close();
 }
 assert.deepEqual(errors,[]);
}finally{await browser.close();await server.close();}
