import assert from 'node:assert/strict';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
const server=await createServer({server:{port:3104,host:'127.0.0.1',strictPort:true}});await server.listen();
const browser=await chromium.launch({headless:true});const page=await browser.newPage({viewport:{width:1440,height:1000}});
const errors=[];page.on('pageerror',e=>errors.push(e.message));
const fits=async()=>assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'No horizontal page overflow');
try{
 await page.goto('http://127.0.0.1:3104/');await page.getByRole('button',{name:'Я ученик',exact:true}).waitFor();await page.screenshot({path:'/private/tmp/cyberlearn-cyber-login.png'});
 await page.getByRole('button',{name:'Я ученик',exact:true}).click();await page.getByLabel('Твоё имя').fill('Тест');await page.getByLabel('Код класса').fill('TEST01');await page.getByRole('button',{name:'Назад',exact:true}).click();
 await page.getByRole('button',{name:'Тестировать как ученик',exact:true}).click();await page.getByRole('heading',{name:'Твоя карта миссий'}).waitFor();await page.locator('.academy-course').first().waitFor();await fits();await page.screenshot({path:'/private/tmp/cyberlearn-cyber-home.png'});
 await page.getByRole('button',{name:'Магазин',exact:true}).click();await page.getByRole('heading',{name:'Магазин открытий'}).waitFor();const sprites=page.locator('.street-avatar-strip');assert.equal(await sprites.count(),10);
 await page.waitForFunction(()=>Array.from(document.querySelectorAll('.street-avatar-strip')).every(el=>getComputedStyle(el).animationName==='street-avatar-idle'));
 await page.screenshot({path:'/private/tmp/cyberlearn-street-shop.png'});
 const strip=sprites.first();const start=await strip.evaluate(el=>getComputedStyle(el).transform);await page.waitForTimeout(450);assert.notEqual(await strip.evaluate(el=>getComputedStyle(el).transform),start);
 await page.emulateMedia({reducedMotion:'reduce'});assert.equal(await strip.evaluate(el=>getComputedStyle(el).animationName),'none');await page.emulateMedia({reducedMotion:'no-preference'});
 await page.getByRole('button',{name:/Рамки/}).click();await page.screenshot({path:'/private/tmp/cyberlearn-cyber-shop.png'});await page.getByRole('button',{name:'Закрыть магазин'}).click();
 await page.getByRole('button',{name:'Мой профиль',exact:true}).click();await page.getByRole('button',{name:'Закрыть профиль'}).waitFor();await page.screenshot({path:'/private/tmp/cyberlearn-cyber-profile.png'});await page.getByRole('button',{name:'Закрыть профиль'}).click();
 await page.setViewportSize({width:390,height:844});await fits();await page.screenshot({path:'/private/tmp/cyberlearn-cyber-home-mobile.png'});
 await page.getByRole('button',{name:'Начать миссию',exact:true}).click();await page.getByRole('article',{name:'Объяснение урока'}).waitFor();await fits();await page.screenshot({path:'/private/tmp/cyberlearn-cyber-lesson-mobile.png'});
 await page.setViewportSize({width:1440,height:1000});await page.screenshot({path:'/private/tmp/cyberlearn-cyber-lesson.png'});await page.getByRole('button',{name:'Уже знаю тему — к заданию'}).click();await page.getByRole('button',{name:'Попробовать самому'}).click();await page.getByRole('button',{name:'К объяснению',exact:true}).waitFor();
 await page.getByRole('button',{name:'Курсы',exact:true}).click();await page.getByRole('heading',{name:'Твоя карта миссий'}).waitFor();
 await page.getByRole('button',{name:'Выйти из аккаунта'}).click();await page.getByRole('dialog').waitFor();await page.getByRole('button',{name:'Выйти',exact:true}).click();await page.getByRole('button',{name:'Тестировать как учитель',exact:true}).click();await page.locator('.academy-teacher').waitFor();await page.screenshot({path:'/private/tmp/cyberlearn-cyber-teacher.png'});await fits();
 assert.deepEqual(errors,[]);console.log('design.browser.check: login, home, shop, profile, mobile resume, lesson/practice, logout and teacher passed');
}finally{await browser.close();await server.close();}
