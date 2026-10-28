// Inspect the actual painted game assets and two art-directed maze compositions.
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
const shots='artifacts/painted-scenes';mkdirSync(shots,{recursive:true});
const server=await createServer({server:{port:3112,host:'127.0.0.1',strictPort:true}});await server.listen();
const browser=await chromium.launch();const page=await browser.newPage({viewport:{width:1440,height:1000}});
const problems=[];page.on('pageerror',e=>problems.push(e.message));page.on('response',r=>{if(r.status()>=400)problems.push(`${r.status()} ${r.url()}`);});
await page.route('**/api/**',r=>{problems.push('unexpected API request');return r.abort();});
try{
 await page.goto('http://127.0.0.1:3112/campaign-audit.html?screen=grid&mission=g4_l10&hero=street');
 assert.equal(await page.getByLabel('Миссия-сетка').inputValue(),'g4_l10');
 const pixels=await page.evaluate(async()=>{
  const result={};
  for(const name of ['tile','block','portal']){
   const img=new Image();img.src=`/art/neo-academy/${name}-v2.png`;await img.decode();
   const canvas=document.createElement('canvas');canvas.width=img.width;canvas.height=img.height;const ctx=canvas.getContext('2d');ctx.drawImage(img,0,0);
   result[name]={width:img.width,height:img.height,corner:ctx.getImageData(0,0,1,1).data[3]};
  }
  return result;
 });
 assert.deepEqual(pixels,{tile:{width:512,height:320,corner:0},block:{width:512,height:448,corner:0},portal:{width:512,height:768,corner:0}});
 await page.getByLabel('Экран').selectOption('grid');
 await page.getByLabel('Герой',{exact:true}).selectOption('street');
 await page.getByLabel('Миссия-сетка').selectOption('g4_l10');
 await page.getByRole('button',{name:'Редактировать код'}).click();
 await page.getByLabel('Код решения').fill('drone.move_down()\ndrone.move_down()\ndrone.move_right()\ndrone.move_right()\ndrone.move_right()');
 await page.locator('.mission-grid').scrollIntoViewIfNeeded();
 await page.waitForTimeout(250);
 await page.locator('.mission-grid').screenshot({path:`${shots}/maze-start-1440.png`});
 await page.getByRole('button',{name:'Запустить',exact:true}).evaluate(e=>e.click());
 await page.waitForFunction(()=>document.querySelector('.mission-grid').dataset.outcome==='success');
 await page.locator('.mission-grid').screenshot({path:`${shots}/maze-trace-1440.png`});
 await page.setViewportSize({width:390,height:844});await page.waitForTimeout(100);
 await page.locator('.mission-grid').screenshot({path:`${shots}/maze-390.png`});
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 assert.deepEqual(problems,[]);
 console.log('artScene.browser.check: painted sprites have true transparency and correct dimensions; live maze, executed arrows and responsive scene OK');
}finally{await browser.close();await server.close();}
