// Isolated UI fixture: no real accounts or school data.
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';

const server = await createServer({server:{host:'127.0.0.1',port:3128,strictPort:true}});
await server.listen();
const { MOCK_TASKS } = await server.ssrLoadModule('/constants.ts');
const lesson = MOCK_TASKS.find(task => task.id === 'g3_m1_l1');
const browser = await chromium.launch({headless:true});
mkdirSync('artifacts/file-lesson-pilot',{recursive:true});
try {
  for (const width of [390, 1440]) {
    const page = await browser.newPage({viewport:{width,height:900}});
    const errors=[]; page.on('pageerror', error => errors.push(error.message));
    const user={id:'file-pilot-fixture',name:'Саша',role:'student',classId:'fixture',xp:0,currency:0,level:1,tasksCompleted:0,totalErrors:0,inventory:['av_1'],achievements:[],equipped:{avatar:'av_1'},completedTaskIds:[]};
    await page.route('**/api/**',async route=>{
      const body=route.request().postDataJSON();
      const data=body.operation==='getUser'?user:body.operation==='listClassrooms'?[{id:'fixture',teacherId:'fixture-teacher',name:'Класс',studentIds:[user.id],hiddenCourses:[]}]:['listTasks','listUsers','listFolders'].includes(body.operation)?[]:null;
      await route.fulfill({json:{data}});
    });
    await page.goto('http://127.0.0.1:3128/');
    await page.getByLabel('Класс / Кампания').selectOption('course_grade3');
    await page.locator('.campaign-region',{hasText:lesson.module}).first().click();
    await page.locator('.campaign-node[data-mission-id="g3_m1_l1"]').click();
    await page.locator('.campaign-brief .ui-button').click();
    await page.locator('.file-lesson-pilot').waitFor();
    assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),'no page overflow');
    await page.screenshot({path:`artifacts/file-lesson-pilot/explanation-${width}.png`,fullPage:true});
    await page.getByRole('button',{name:'Разобрать имя файла'}).click();
    await page.getByRole('button',{name:'Определить вид самому'}).click();
    await page.getByRole('button',{name:'Звуковая запись'}).click();
    assert.ok(await page.getByRole('button',{name:'Следующий учебный файл'}).isDisabled());
    await page.getByRole('button',{name:'Изображение'}).click();
    await page.getByRole('button',{name:'Следующий учебный файл'}).click();
    await page.getByRole('button',{name:'Звуковая запись'}).click();
    await page.getByRole('button',{name:'Следующий учебный файл'}).click();
    await page.getByRole('button',{name:'Текстовый документ'}).click();
    await page.getByRole('button',{name:'Прочитать самостоятельное задание'}).click();
    await page.getByRole('button',{name:'Начать задание'}).click();
    await page.locator('.lesson-answer').first().waitFor();
    assert.deepEqual(errors,[]);
    await page.close();
  }
  console.log('fileLessonPilot: desktop and mobile, corrections, all three examples and transition to practice OK');
} finally { await browser.close(); await server.close(); }
