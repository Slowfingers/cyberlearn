import assert from 'node:assert/strict';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';
const server = await createServer({server:{port:3103,host:'127.0.0.1',strictPort:true}});
await server.listen();
const browser = await chromium.launch({headless:true});
const page = await browser.newPage({viewport:{width:1180,height:900}});
const errors=[]; page.on('pageerror',e=>errors.push(e.message));
try {
  await page.goto('http://127.0.0.1:3103/layout-audit.html');
  await page.evaluate(async () => {
    const rm = await import('/node_modules/.vite/deps/react.js'); const React=rm.default??rm;
    const cm=await import('/node_modules/.vite/deps/react-dom_client.js'); const {createRoot}=cm.default??cm;
    const modules=await Promise.all(['TypingGame','FileOrganizerGame','WireframeBuilderGame','AiKidsTrainerGame','BinaryBulbsGame','SortingGame','CircuitBuilderGame','BinaryTreeGame','NetworkRouteGame','HanoiGame'].map(n=>import(n==='HanoiGame'?'/components/HanoiGame.tsx':`/components/interactives/${n}.tsx`).then(m=>n==='HanoiGame'?{HanoiGame:m.default}:m)));
    const {MOCK_TASKS}=await import('/constants.ts');
    const node=document.createElement('div'); node.id='workshop-test'; node.className='academy-app'; node.style='position:fixed;inset:0;z-index:9999;overflow:auto;background:#111a2d';document.body.append(node);const root=createRoot(node);
    window.__count=0;
    window.__mount=(name, config={})=>{window.__count=0;const type={TypingGame:'typing',FileOrganizerGame:'file_organizer',WireframeBuilderGame:'wireframe_builder',AiKidsTrainerGame:'ai_kids_trainer',BinaryBulbsGame:'binary_bulbs',SortingGame:'sorting',CircuitBuilderGame:'circuit_builder',BinaryTreeGame:'tree_search',NetworkRouteGame:'network_route',HanoiGame:'hanoi'}[name]; const task={...MOCK_TASKS.find(t=>t.type===type),...config}; root.render(React.createElement('div',{className:'game-workspace'},React.createElement('div',{className:'academy-practice-content'},React.createElement(modules.find(m=>m[name])[name],{key:Math.random(),task,onComplete:()=>window.__count++}))));};
  });
  const h=page.locator('#workshop-test');
  const mount=async(name,config={})=>{await page.evaluate(({name,config})=>window.__mount(name,config),{name,config});await h.locator('.workshop-header').waitFor();await page.waitForTimeout(100);};
  if(!process.argv.includes('--scenes-only')){
  await mount('TypingGame',{typingConfig:{targetText:'Привет, робот!\n123'}});
  await h.getByRole('textbox').fill('Нривет, робот!\n123');
  assert.equal(await page.evaluate(()=>window.__count),0);
  await h.getByRole('status').filter({hasText:'Исправь символ'}).waitFor();
  await h.getByRole('textbox').fill('Привет, робот!\n123');await page.waitForFunction(()=>window.__count===1);
  assert.ok(await h.getByRole('textbox').isDisabled());
  await h.getByRole('button',{name:'Начать заново'}).click();assert.equal(await h.getByRole('textbox').inputValue(),'');
  await mount('TypingGame',{typingConfig:{targetText:'A{}'}});
  await h.locator('.keycap-next').filter({hasText:'Shift'}).waitFor();
  await h.getByRole('textbox').pressSequentially('A{}');await page.waitForFunction(()=>window.__count===1);
  await mount('TypingGame',{typingConfig:{targetText:'abc'}});
  await h.getByRole('textbox').pressSequentially('ax');
  await h.getByRole('textbox').press('Backspace');await h.getByRole('textbox').pressSequentially('bc');await page.waitForFunction(()=>window.__count===1);
  await h.getByRole('button',{name:'Начать заново'}).click();
  await h.getByRole('textbox').pressSequentially('ac');await h.getByRole('textbox').press('ArrowLeft');await h.getByRole('textbox').pressSequentially('b');await page.waitForFunction(()=>window.__count===2);
  await h.getByRole('button',{name:'Начать заново'}).click();
  await h.getByRole('button',{name:'Скрыть клавиатуру'}).click();assert.equal(await h.locator('.keyboard-board').count(),0);
  await h.getByRole('textbox').pressSequentially('a');await h.getByRole('button',{name:'Показать клавиатуру'}).click();assert.equal(await h.getByRole('textbox').inputValue(),'a');
  await mount('TypingGame',{typingConfig:{targetText:'Привет, робот!'}});
  await h.getByRole('textbox').pressSequentially('Привет, ');await page.waitForTimeout(200);
  await page.screenshot({path:'/private/tmp/cyberlearn-keyboard-desktop.png'});
  await page.setViewportSize({width:390,height:844});
  assert.ok(await h.evaluate(n=>n.scrollWidth<=n.clientWidth));await page.screenshot({path:'/private/tmp/cyberlearn-keyboard-mobile.png'});
  await mount('FileOrganizerGame',{fileConfig:{folders:['image','music','doc','danger']}});
  await h.getByRole('button').filter({hasText:'котик в очках'}).click();await h.getByRole('button',{name:'Папка Музыка',exact:true}).click();assert.equal(await page.evaluate(()=>window.__count),0);await h.getByRole('status').filter({hasText:'Эта папка не подходит'}).waitFor();
  assert.ok(await h.evaluate(n=>n.scrollWidth<=n.clientWidth));await page.screenshot({path:'/private/tmp/cyberlearn-parcels-mobile.png'});
  await page.setViewportSize({width:1180,height:900});await page.screenshot({path:'/private/tmp/cyberlearn-parcels-desktop.png'});
  const from=await h.getByRole('button').filter({hasText:'котик в очках'}).boundingBox();const to=await h.getByRole('button',{name:'Папка Рисунки',exact:true}).boundingBox();
  await page.mouse.move(from.x+from.width/2,from.y+from.height/2);await page.mouse.down();await page.mouse.move(to.x+to.width/2,to.y+to.height/2,{steps:12});await page.mouse.up();
  await h.getByRole('button').filter({hasText:'котик в очках'}).waitFor({state:'detached'});
  for(const [name,folder] of [['песенка робота','Музыка'],['сочинение про лето','Документы'],['взлом игры','Карантин'],['рисунок ракета','Рисунки'],['звук победы','Музыка'],['план уроков','Документы'],['подозрительный файл','Карантин']]){await h.getByRole('button').filter({hasText:name}).click();await h.getByRole('button',{name:`Папка ${folder}`,exact:true}).click();}
  await page.waitForFunction(()=>window.__count===1);
  await mount('WireframeBuilderGame',{wireframeConfig:{requiredElements:['header','canvas','controls']}});
  await h.getByRole('button').filter({hasText:'Аватар и Уровень игрока'}).first().click();await h.getByRole('button',{name:'Область Главное действие'}).click();await h.getByRole('status').filter({hasText:'другая область'}).waitFor();
  for(const [name,slot] of [['Аватар и Уровень игрока','Верхняя панель'],['Большая картинка игры','Главная область'],['Кнопка «СТАРТ ИГРЫ»','Главное действие']]){await h.locator('.widget-card').filter({hasText:name}).click();await h.getByRole('button',{name:`Область ${slot}`,exact:true}).click();}
  await h.getByRole('button',{name:'Запустить приложение',exact:true}).click();await page.waitForFunction(()=>window.__count===1);assert.ok(await h.getByRole('button',{name:'Экран готов!',exact:true}).isDisabled());
  await h.getByRole('button',{name:'Начать заново'}).click();assert.equal(await h.locator('.is-filled').count(),0);
  await page.screenshot({path:'/private/tmp/cyberlearn-builder-desktop.png'});
  await page.setViewportSize({width:390,height:844});assert.ok(await h.evaluate(n=>n.scrollWidth<=n.clientWidth));
  await mount('AiKidsTrainerGame',{aiTrainerConfig:{cards:[{id:'a',name:'Яблоко',icon:'🍎',category:'cat'},{id:'b',name:'Морковь',icon:'🥕',category:'dog'}],categoryNames:{cat:'Фрукты',dog:'Овощи'}}});
  await h.locator('.parcel-card').filter({hasText:'Яблоко'}).click();await h.getByRole('button',{name:'Набор Овощи',exact:true}).click();await h.locator('.parcel-card').filter({hasText:'Морковь'}).click();await h.getByRole('button',{name:'Набор Овощи',exact:true}).click();
  await h.getByRole('button',{name:'Проверить примеры для робота'}).click();assert.equal(await page.evaluate(()=>window.__count),0);
  await h.getByRole('button',{name:'Вернуть: Яблоко',exact:true}).click();await h.locator('.parcel-card').filter({hasText:'Яблоко'}).click();await h.getByRole('button',{name:'Набор Фрукты',exact:true}).click();await h.getByRole('button',{name:'Проверить примеры для робота'}).click();await page.waitForFunction(()=>window.__count===1);
  }
  await page.setViewportSize({width:1180,height:900});
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:900});
    for(const name of ['BinaryBulbsGame','SortingGame','CircuitBuilderGame','BinaryTreeGame','NetworkRouteGame','HanoiGame']){
      await mount(name);
      assert.ok(await h.evaluate(n=>n.scrollWidth<=n.clientWidth),`${name}: bounds at ${width}`);
      assert.ok(await h.locator('button').evaluateAll(ns=>ns.filter(n=>n.getBoundingClientRect().width>0).every(n=>n.getBoundingClientRect().height>=44)),`${name}: touch targets at ${width}`);
      assert.ok(await h.locator('img').evaluateAll(ns=>ns.every(n=>n.complete&&n.naturalWidth>0)),`${name}: raster assets at ${width}`);
      await page.screenshot({path:`/private/tmp/cyberlearn-${name}-${width}.png`});
    }
  }
  await page.setViewportSize({width:390,height:844});
  for(const [bitsCount,targetNumber,weights] of [[4,6,[4,2]],[5,17,[16,1]],[4,10,[8,2]]]){
    await mount('BinaryBulbsGame',{binaryConfig:{bitsCount,targetNumber,showHex:true}});
    for(const weight of weights) await h.getByRole('button',{name:`Лампочка с весом ${weight}`,exact:true}).click();
    assert.equal(await h.locator('[data-current-sum]').textContent(),String(targetNumber));
    assert.equal(await h.locator('.energy-cell[data-powered=true]').count(),2);
    await page.waitForFunction(()=>window.__count===1);
    assert.ok(await h.getByRole('button',{name:`Лампочка с весом ${weights[0]}`,exact:true}).isDisabled());
    await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>window.__count),1);
  }
  await mount('BinaryBulbsGame',{binaryConfig:{bitsCount:8,targetNumber:255}});
  assert.ok(await h.evaluate(n=>n.scrollWidth<=n.clientWidth));
  assert.equal(await h.locator('.energy-cell').count(),8);
  await mount('CircuitBuilderGame',{circuitConfig:{gate:'and',expectedOutput:true}});
  await h.getByRole('button',{name:'Проверить схему',exact:true}).click();await h.getByRole('alert').waitFor();
  assert.equal(await page.evaluate(()=>window.__count),0);
  await h.getByRole('button',{name:'Рубильник A',exact:true}).click();
  assert.equal(await h.locator('.logic-output').getAttribute('data-powered'),'false');
  await h.getByRole('button',{name:'Рубильник B',exact:true}).click();
  assert.equal(await h.locator('.logic-output').getAttribute('data-powered'),'true');
  assert.equal(await page.evaluate(()=>window.__count),0);
  await h.getByRole('button',{name:'Проверить схему',exact:true}).click();await page.waitForFunction(()=>window.__count===1);
  for(const gate of ['xor','nand']){
    await mount('CircuitBuilderGame',{circuitConfig:{gate,expectedOutput:false}});
    for(const name of ['Рубильник A','Рубильник B'])await h.getByRole('button',{name,exact:true}).click();
    assert.equal(await h.locator('.logic-output').getAttribute('data-powered'),'false');
    assert.equal(await h.locator('.logic-input-row[data-powered=true]').count(),2);
    await page.screenshot({path:`/private/tmp/cyberlearn-${gate}-active-inputs.png`});
    await h.getByRole('button',{name:'Проверить схему',exact:true}).click();await page.waitForFunction(()=>window.__count===1);
    await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>window.__count),1);
  }
  const values=()=>h.locator('.cargo-item').evaluateAll(ns=>ns.map(n=>Number(n.dataset.value)));
  await mount('SortingGame',{sortingConfig:{numbers:[3,1,2]}});
  await h.getByRole('button',{name:'Оставить порядок',exact:false}).click();assert.deepEqual(await values(),[3,1,2]);
  for(let i=0;i<2;i++)await h.getByRole('button',{name:'Поменять местами',exact:true}).click();
  assert.deepEqual(await values(),[1,2,3]);
  assert.equal(await h.locator('.cargo-item[data-sorted=true]').count(),3);
  assert.equal(await h.getByRole('button',{name:/ЗАБРАТЬ НАГРАДУ/}).count(),0);
  await page.waitForFunction(()=>window.__count===1);await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>window.__count),1);
  await mount('SortingGame',{sortingConfig:{numbers:[-1,-1,-2]}});
  await h.getByRole('button',{name:'Поменять местами',exact:true}).click();assert.deepEqual(await values(),[-1,-1,-2]);
  for(const name of ['Оставить порядок','Поменять местами','Поменять местами','Оставить порядок'])await h.getByRole('button',{name,exact:false}).click();
  assert.deepEqual(await values(),[-2,-1,-1]);await page.waitForFunction(()=>window.__count===1);
  await mount('SortingGame',{sortingConfig:{numbers:[10,9,8,7,6,5,4,3,2,1]}});
  assert.ok(await h.evaluate(n=>n.scrollWidth<=n.clientWidth));
  assert.ok(await h.locator('.conveyor-scroll').evaluate(n=>n.scrollWidth>n.clientWidth));
  await h.locator('.conveyor-scroll').focus();await page.keyboard.press('End');
  await page.screenshot({path:'/private/tmp/cyberlearn-long-conveyor-mobile.png'});
  await mount('BinaryTreeGame',{treeConfig:{target:30,tree:{value:40,left:{value:20,left:{value:10},right:{value:30}},right:{value:60,left:{value:50},right:{value:70}}}}});
  await h.getByRole('button',{name:'ВПРАВО',exact:false}).click();
  assert.equal((await h.locator('.archive-scene [data-current=true]').textContent()).trim(),'40');
  assert.equal(await page.evaluate(()=>window.__count),0);
  await h.getByRole('button',{name:'ВЛЕВО',exact:false}).click();await h.getByRole('button',{name:'ВПРАВО',exact:false}).click();
  assert.equal((await h.locator('.archive-scene [data-current=true]').textContent()).trim(),'30');
  assert.equal(await page.evaluate(()=>window.__count),1);
  assert.equal(await h.getByRole('button',{name:/ПРИНЯТЬ НАГРАДУ/}).count(),0);
  const networkConfig={startNode:'client',endNode:'server',maxLatencyMs:40,nodes:[{id:'client',label:'Начальный ПК',x:50,y:140,status:'online'},{id:'b',label:'Роутер B',x:170,y:70,status:'online'},{id:'bad',label:'Перегруженный узел',x:310,y:210,status:'overloaded'},{id:'server',label:'Конечный сервер',x:440,y:140,status:'online'}],edges:[{from:'client',to:'b',latencyMs:10},{from:'b',to:'server',latencyMs:20},{from:'client',to:'bad',latencyMs:10},{from:'bad',to:'server',latencyMs:5}]};
  await mount('NetworkRouteGame',{networkConfig});
  const node=id=>h.locator(`[data-node="${id}"]`);
  await node('server').click();assert.equal(await page.evaluate(()=>window.__count),0);await h.getByText('Нет прямого оптоволоконного кабеля',{exact:false}).waitFor();
  await node('bad').click();await node('server').click();assert.equal(await page.evaluate(()=>window.__count),0);await h.getByText('Маршрут проходит через перегруженный узел',{exact:false}).waitFor();
  await h.getByRole('button',{name:'Начать заново'}).click();
  await node('b').focus();await page.keyboard.press('Enter');await node('server').focus();await page.keyboard.press('Space');
  assert.equal(await page.evaluate(()=>window.__count),1);assert.equal(await h.getByText('30 мс',{exact:true}).count(),1);
  assert.equal(await h.getByRole('button',{name:/ПОЛУЧИТЬ НАГРАДУ/}).count(),0);
  await mount('NetworkRouteGame',{networkConfig:{...networkConfig,maxLatencyMs:25}});
  await node('b').click();await node('server').click();assert.equal(await page.evaluate(()=>window.__count),0);await h.getByText('превышает предел 25 мс',{exact:false}).waitFor();
  await mount('HanoiGame',{hanoiConfig:{disks:2}});
  const peg=n=>h.getByRole('button',{name:`Башня ${n}`,exact:true});
  await peg(1).focus();await page.keyboard.press('Enter');await peg(2).click();
  await peg(1).click();await peg(2).click();
  assert.equal(await h.locator('[data-peg="0"] [data-disk="2"]').count(),1);
  assert.equal(await h.locator('[data-peg="1"] [data-disk="1"]').count(),1);
  assert.equal(await page.evaluate(()=>window.__count),0);await h.getByText('Нельзя класть большой блок на меньший.',{exact:false}).waitFor();
  await peg(1).click();await peg(3).click();await peg(2).click();await peg(3).click();
  assert.equal(await h.locator('[data-peg="2"] [data-disk]').count(),2);
  await page.waitForFunction(()=>window.__count===1);await page.waitForTimeout(300);assert.equal(await page.evaluate(()=>window.__count),1);
  await mount('HanoiGame',{hanoiConfig:{disks:8}});assert.ok(await h.evaluate(n=>n.scrollWidth<=n.clientWidth));assert.equal(await h.locator('[data-disk]').count(),8);
  await page.screenshot({path:'/private/tmp/cyberlearn-hanoi-8-mobile.png'});
  assert.deepEqual(errors,[]);console.log(`workshop.browser.check: ${process.argv.includes('--scenes-only')?'focused scenes':'keyboard, parcels, builder, AI and scenes'}; six raster scenes at 320/390/768/1024/1440, touch targets, binary 4/5/8 bits, AND/XOR/NAND states, wrong sorting decisions, duplicates, negative values, long conveyor, tree navigation, network disconnection/overload/latency/keyboard, Hanoi illegal move/2-disk solution/8 disks and single completion passed`);
}finally{await browser.close();await server.close();}
