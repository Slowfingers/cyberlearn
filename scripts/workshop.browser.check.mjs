import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';
const server = await createServer({server:{port:3103,host:'127.0.0.1',strictPort:true}});
await server.listen();
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1180,height:900}});
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
try {
  await page.goto('http://127.0.0.1:3103/');
  await page.evaluate(async () => {
    const rm = await import('/node_modules/.vite/deps/react.js'); const React=rm.default??rm;
    const cm=await import('/node_modules/.vite/deps/react-dom_client.js'); const {createRoot}=cm.default??cm;
    const modules=await Promise.all(['TypingGame','FileOrganizerGame','WireframeBuilderGame','AiKidsTrainerGame','BinaryBulbsGame','SortingGame','CircuitBuilderGame'].map(n=>import(`/components/interactives/${n}.tsx`)));
    const {MOCK_TASKS}=await import('/constants.ts');
    const node=document.createElement('div'); node.id='workshop-test'; node.style='position:fixed;inset:0;z-index:9999;overflow:auto;background:#111a2d';document.body.append(node);const root=createRoot(node);
    window.__count=0;
    window.__mount=(name, config={})=>{window.__count=0;const type={TypingGame:'typing',FileOrganizerGame:'file_organizer',WireframeBuilderGame:'wireframe_builder',AiKidsTrainerGame:'ai_kids_trainer',BinaryBulbsGame:'binary_bulbs',SortingGame:'sorting',CircuitBuilderGame:'circuit_builder'}[name]; const task={...MOCK_TASKS.find(t=>t.type===type),...config}; root.render(React.createElement(modules.find(m=>m[name])[name],{key:Math.random(),task,onComplete:()=>window.__count++}));};
  });
  const h=page.locator('#workshop-test');
  const mount=async(name,config={})=>{await page.evaluate(({name,config})=>window.__mount(name,config),{name,config});await h.locator('.workshop-header, .typing-toolbar').waitFor();await page.waitForTimeout(100);};
  await mount('TypingGame',{typingConfig:{targetText:'Привет, робот!\n123'}});
  await h.getByRole('textbox').fill('Нривет, робот!\n123');
  assert.equal(await page.evaluate(()=>window.__count),0);
  await h.getByRole('status').filter({hasText:'Исправь символ'}).waitFor();
  await h.getByRole('textbox').fill('Привет, робот!\n123');await page.waitForFunction(()=>window.__count===1);
  assert.ok(await h.getByRole('textbox').isDisabled());
  await h.getByRole('button',{name:'Начать заново'}).click();assert.equal(await h.getByRole('textbox').inputValue(),'');
  await mount('TypingGame',{typingConfig:{targetText:'A{}'}});
  await h.getByRole('button',{name:'⇧ Shift',exact:true}).click();await h.getByRole('button',{name:'A',exact:true}).click();
  await h.getByRole('button',{name:'⇧ Shift',exact:true}).click();await h.getByRole('button',{name:'{',exact:true}).click();
  await h.getByRole('button',{name:'⇧ Shift',exact:true}).click();await h.getByRole('button',{name:'}',exact:true}).click();await page.waitForFunction(()=>window.__count===1);
  await mount('TypingGame',{typingConfig:{targetText:'abc'}});
  await h.getByRole('textbox').pressSequentially('ax');
  await h.getByRole('textbox').press('Backspace');await h.getByRole('textbox').pressSequentially('bc');await page.waitForFunction(()=>window.__count===1);
  await h.getByRole('button',{name:'Начать заново'}).click();
  await h.getByRole('textbox').pressSequentially('ac');await h.getByRole('textbox').press('ArrowLeft');await h.getByRole('button',{name:'B',exact:true}).click();await page.waitForFunction(()=>window.__count===2);
  await h.getByRole('button',{name:'Начать заново'}).click();
  await h.getByRole('button',{name:'Скрыть клавиатуру'}).click();assert.equal(await h.locator('.keyboard-board').count(),0);
  await h.getByRole('textbox').pressSequentially('a');await h.getByRole('button',{name:'Показать клавиатуру'}).click();assert.equal(await h.getByRole('textbox').inputValue(),'a');
  await mount('TypingGame',{typingConfig:{targetText:'Привет, робот!'}});
  await h.getByRole('textbox').pressSequentially('Привет, ');await page.waitForTimeout(200);
  await page.screenshot({path:'/private/tmp/cyberlearn-keyboard-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  assert.ok(await h.evaluate(n=>n.scrollWidth<=n.clientWidth));await page.screenshot({path:'/private/tmp/cyberlearn-keyboard-mobile.png'});
  await mount('FileOrganizerGame',{fileConfig:{folders:['image','music','doc','danger']}});
  await h.getByRole('button').filter({hasText:'котик в очках'}).click();await h.getByRole('button',{name:'Папка Музыка',exact:true}).click();assert.equal(await page.evaluate(()=>window.__count),0);await h.getByRole('status').filter({hasText:'Попробуй'}).waitFor();
  assert.ok(await h.evaluate(n=>n.scrollWidth<=n.clientWidth));await page.screenshot({path:'/private/tmp/cyberlearn-parcels-mobile.png'});
  await page.setViewportSize({width:1180,height:900});await page.screenshot({path:'/private/tmp/cyberlearn-parcels-desktop.png'});
  const from=await h.getByRole('button').filter({hasText:'котик в очках'}).boundingBox();const to=await h.getByRole('button',{name:'Папка Рисунки',exact:true}).boundingBox();
  await page.mouse.move(from.x+from.width/2,from.y+from.height/2);await page.mouse.down();await page.mouse.move(to.x+to.width/2,to.y+to.height/2,{steps:12});await page.mouse.up();
  await h.getByRole('button').filter({hasText:'котик в очках'}).waitFor({state:'detached'});
  for(const [name,folder] of [['песенка робота','Музыка'],['сочинение про лето','Документы'],['взлом игры','Карантин'],['рисунок ракета','Рисунки'],['звук победы','Музыка'],['план уроков','Документы'],['подозрительный файл','Карантин']]){await h.getByRole('button').filter({hasText:name}).click();await h.getByRole('button',{name:`Папка ${folder}`,exact:true}).click();}
  await page.waitForFunction(()=>window.__count===1);
  await mount('WireframeBuilderGame',{wireframeConfig:{requiredElements:['header','canvas','controls']}});
  await h.getByRole('button').filter({hasText:'Аватар и Уровень игрока'}).first().click();await h.getByRole('button',{name:'Область Кнопка действия'}).click();await h.getByRole('status').filter({hasText:'другая область'}).waitFor();
  for(const [name,slot] of [['Аватар и Уровень игрока','Шапка: игрок и настройки'],['Большая картинка игры','Главная область: игра и рекорды'],['Кнопка «СТАРТ ИГРЫ»','Кнопка действия']]){await h.locator('.widget-card').filter({hasText:name}).click();await h.getByRole('button',{name:`Область ${slot}`,exact:true}).click();}
  await h.getByRole('button',{name:'Запустить приложение',exact:true}).click();await page.waitForFunction(()=>window.__count===1);assert.ok(await h.getByRole('button',{name:'Экран готов!',exact:true}).isDisabled());
  await h.getByRole('button',{name:'Начать заново'}).click();assert.equal(await h.locator('.is-filled').count(),0);
  await page.screenshot({path:'/private/tmp/cyberlearn-builder-desktop.png'});
  await page.setViewportSize({width:390,height:844});assert.ok(await h.evaluate(n=>n.scrollWidth<=n.clientWidth));
  await mount('AiKidsTrainerGame',{aiTrainerConfig:{cards:[{id:'a',name:'Яблоко',icon:'🍎',category:'cat'},{id:'b',name:'Морковь',icon:'🥕',category:'dog'}],categoryNames:{cat:'Фрукты',dog:'Овощи'}}});
  await h.locator('.parcel-card').filter({hasText:'Яблоко'}).click();await h.getByRole('button',{name:'Набор Овощи',exact:true}).click();await h.locator('.parcel-card').filter({hasText:'Морковь'}).click();await h.getByRole('button',{name:'Набор Овощи',exact:true}).click();
  await h.getByRole('button',{name:'Проверить примеры для робота'}).click();assert.equal(await page.evaluate(()=>window.__count),0);
  await h.getByRole('button',{name:'Вернуть: Яблоко',exact:true}).click();await h.locator('.parcel-card').filter({hasText:'Яблоко'}).click();await h.getByRole('button',{name:'Набор Фрукты',exact:true}).click();await h.getByRole('button',{name:'Проверить примеры для робота'}).click();await page.waitForFunction(()=>window.__count===1);
  await page.setViewportSize({width:1180,height:900});
  for(const name of ['BinaryBulbsGame','SortingGame','CircuitBuilderGame']){await page.evaluate(name=>window.__mount(name),name);await h.locator('.workshop-legacy').waitFor();await page.waitForTimeout(100);await page.screenshot({path:`/private/tmp/cyberlearn-${name}-desktop.png`});}
  assert.deepEqual(errors,[]);console.log('workshop.browser.check: Cyrillic, multiline, virtual Shift, correction, pointer drag, all parcels, 3-slot builder, AI custom categories and correction, single completion, reset and mobile layout passed');
}finally{await browser.close();await server.close();}
