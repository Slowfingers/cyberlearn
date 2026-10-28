// Isolated teacher/student fixtures; never alters school accounts.
import assert from 'node:assert/strict';
import {mkdirSync} from 'node:fs';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
import {adjustStudentCoins} from '../functions/studentCoins.mjs';
const server=await createServer({server:{host:'127.0.0.1',port:3130,strictPort:true}});await server.listen();
const browser=await chromium.launch();mkdirSync('artifacts/teacher-coins',{recursive:true});
try{for(const width of[1440,390]){
 const teacher={id:'coin_teacher_fixture',name:'Учитель',role:'teacher',currency:0,xp:0,level:1,inventory:[],achievements:[],equipped:{avatar:'av_1'}};
 const cls={id:'coin_class_fixture',name:'Тестовый класс монет',teacherId:teacher.id,inviteCode:'COINS',studentIds:['coin_student_fixture']};
 let student={...teacher,id:'coin_student_fixture',name:'Ученик монет',role:'student',classId:cls.id,currency:40};let failAfterSave=false;
 const page=await browser.newPage({viewport:{width,height:950}});const errors=[];page.on('pageerror',e=>{errors.push(e.message);console.log('PAGE ERROR:',e.message);});
 await page.route('**/api/**',async route=>{const d=route.request().postDataJSON();let data=null;try{
  if(d.operation==='getUser')data=teacher;
  if(d.operation==='listClassrooms')data=[cls];
  if(d.operation==='listUsers')data=[student];
  if(['listFolders','listTasks','listAssessments','listSubmissions'].includes(d.operation))data=[];
  if(d.operation==='adjustStudentCoins'){student=adjustStudentCoins(student,teacher,cls,d);data=student;if(failAfterSave){failAfterSave=false;throw Error('Сбой связи. Повторите операцию.');}}
  await route.fulfill({json:{data}});
 }catch(e){await route.fulfill({status:400,json:{error:e.message}});}});
 await page.goto('http://127.0.0.1:3130/');
 const row=page.locator('tbody tr').filter({hasText:student.name});
 await row.waitFor();
 await row.click();const panel=page.getByRole('region',{name:'Монеты ученика'});await panel.waitFor();
 const balance=page.getByLabel('Баланс монет');assert.equal(await balance.innerText(),'40');
 await page.getByLabel('Сумма монет').fill('50');await page.getByLabel('Причина (необязательно)').fill('Помощь классу');await page.getByRole('button',{name:'Начислить монеты',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[aria-label="Баланс монет"]').textContent==='90');
 await page.getByLabel('Сумма монет').fill('20');await page.getByRole('button',{name:'Штрафовать монетами',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[aria-label="Баланс монет"]').textContent==='70');
 await page.getByLabel('Сумма монет').fill('71');await page.getByRole('button',{name:'Штрафовать монетами',exact:true}).click();await page.getByText('Недостаточно монет для такого штрафа. Уменьшите сумму.',{exact:true}).waitFor();assert.equal(student.currency,70);
 failAfterSave=true;await page.getByLabel('Сумма монет').fill('30');await page.getByRole('button',{name:'Начислить монеты',exact:true}).click();await page.getByText('Сбой связи. Повторите операцию.',{exact:true}).waitFor();assert.equal(student.currency,100);
 await page.getByRole('button',{name:'Начислить монеты',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[aria-label="Баланс монет"]').textContent==='100');assert.equal(student.currency,100);assert.equal(student.coinAdjustments.length,3);
 await panel.scrollIntoViewIfNeeded();assert.ok(await panel.evaluate(e=>e.scrollWidth<=e.clientWidth+1));await page.screenshot({path:`artifacts/teacher-coins/modal-${width}.png`});assert.deepEqual(errors,[]);
 console.log(`Teacher coins ${width}: award, fine, balance, overdraft error and idempotent retry OK`);await page.close();
}}catch(e){const p=browser.contexts().at(-1)?.pages()[0];if(p){console.log(await p.locator('body').innerText());await p.screenshot({path:'artifacts/teacher-coins/failure.png'});}throw e;}finally{await browser.close();await server.close();}
