// Uses the isolated campaign fixture; never opens student records or calls an API.
import assert from 'node:assert/strict';
import { mkdirSync } from 'node:fs';
import { chromium } from '@playwright/test';
import { createServer } from 'vite';
const shots = 'artifacts/campaign-traveler';
mkdirSync(shots, { recursive: true });
const server = await createServer({ server: { host: '127.0.0.1', port: 3111, strictPort: true } });
await server.listen();
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const problems = [];
page.on('pageerror', e => problems.push(e.message));
page.on('response', r => { if (r.status() >= 400) problems.push(`${r.status()} ${r.url()}`); });
await page.route('**/api/**', route => { problems.push('unexpected API request'); return route.abort(); });
const nodes = page.locator('.campaign-node');
const actor = page.locator('.campaign-traveler');
const missionId = i => nodes.nth(i).getAttribute('data-mission-id');
async function choose(i) { await nodes.nth(i).evaluate(e => e.click()); }
async function arrive(id) { await page.waitForFunction(id => { const e = document.querySelector('.campaign-traveler'); return e?.dataset.atMission === id && e.dataset.moving === 'false'; }, id); }
const distanceToSegment = (p,a,b) => { const dx=b.x-a.x,dy=b.y-a.y; const t=Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/(dx*dx+dy*dy||1)));return Math.hypot(p.x-a.x-t*dx,p.y-a.y-t*dy); };
try {
  await page.goto('http://127.0.0.1:3111/campaign-audit.html');
  await page.locator('.campaign-region').first().click();
  await nodes.first().waitFor();
  await page.getByLabel('Герой', { exact: true }).selectOption('modular');
  assert.equal(await actor.locator(':scope > svg').count(), 1);
  const initial = await actor.getAttribute('data-at-mission');
  const lockedIndex = await nodes.evaluateAll(es => es.findIndex(e => e.classList.contains('campaign-node--locked')));
  await choose(lockedIndex);
  assert.ok(await page.locator('.campaign-brief .ui-button').isDisabled());
  assert.equal(await actor.getAttribute('data-at-mission'), initial, 'locked mission does not move the hero');
  await choose(0); await arrive(await missionId(0));
  const points = await page.locator('.campaign-route').evaluateAll(es => es.flatMap(e=>e.getAttribute('points').split(' ').map(pair=>{const [x,y]=pair.split(',').map(Number);return{x,y};})));
  await page.evaluate(() => {
    window.__travelSamples=[];
    const e=document.querySelector('.campaign-traveler');
    window.__travelObserver=new MutationObserver(() => window.__travelSamples.push({x:Number(e.dataset.x),y:Number(e.dataset.y)}));
    window.__travelObserver.observe(e,{attributes:true,attributeFilter:['data-x','data-y']});
  });
  await choose(3);
  await page.waitForFunction(()=>document.querySelector('.campaign-traveler').dataset.moving==='true');
  assert.equal(await actor.locator('.character-leg--near').evaluate(e=>getComputedStyle(e).animationName),'orion-leg-near','Orion walks with articulated legs');
  await arrive(await missionId(3));
  const samples=await page.evaluate(() => {window.__travelObserver.disconnect();return window.__travelSamples;});
  assert.ok(samples.length>5,'hero has intermediate positions');
  assert.ok(samples.every(p=>points.slice(1).some((b,i)=>distanceToSegment(p,points[i],b)<.08)),'hero follows the road through intermediate nodes');
  await choose(0);
  await page.waitForFunction(()=>document.querySelector('.campaign-traveler').dataset.moving==='true');
  await page.waitForTimeout(100);
  await choose(3); await arrive(await missionId(3));
  assert.equal(await actor.getAttribute('data-at-mission'),await missionId(3),'rapid selection ends at the latest accessible mission');
  await page.emulateMedia({ reducedMotion:'reduce' });
  await choose(0); await arrive(await missionId(0));
  assert.equal(await actor.locator(':scope > svg').evaluate(e=>getComputedStyle(e).animationName),'none');
  await page.emulateMedia({reducedMotion:'no-preference'});
  for(const hero of ['numeric','street','modular','elli']){
    await page.getByLabel('Герой',{exact:true}).selectOption(hero);
    assert.equal(await actor.locator(':scope > svg').count(),1);
    await choose(3);await page.waitForFunction(()=>document.querySelector('.campaign-traveler').dataset.moving==='true');
    assert.equal(await actor.locator('.character-leg--near').evaluate(e=>getComputedStyle(e).animationName),'orion-leg-near',`${hero}: legs step while the hero moves`);
    await arrive(await missionId(3));await choose(0);await arrive(await missionId(0));
    if(hero==='street')assert.equal(await actor.locator(':scope > svg').getAttribute('data-character'),'street_frost');
  }
  const courses=await page.getByLabel('Класс / Кампания').locator('option:not([disabled])').evaluateAll(es=>es.map(e=>e.value).filter(id=>/^course_grade[3-8]$/.test(id)));
  for(const width of [320,390,768,1024,1440]){
    await page.setViewportSize({width,height:1000});
    await page.waitForTimeout(80);
    for(const course of courses){
      await page.getByLabel('Класс / Кампания').selectOption(course);
      const regions=page.locator('.campaign-region');
      const regionCount=await regions.count();
      for(let r=0;r<regionCount;r++){
        await regions.nth(r).click();
        assert.match(await page.locator('.campaign-city>img').getAttribute('src'),new RegExp(course.replace('course_','')+'-v5.webp$'),'each course selects its own city');
        await page.waitForFunction(()=>{const img=document.querySelector('.campaign-city>img');return img?.complete&&img.naturalWidth===1536&&img.naturalHeight===1024;});
        if(width===1440&&r===0)await page.locator('.campaign-map').screenshot({path:`${shots}/${course}-v5.png`});
        assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth),`${course} region ${r} @${width}: no overflow`);
        const positions=await nodes.evaluateAll(es=>es.map(e=>{const b=e.getBoundingClientRect();return{x:b.x+b.width/2,y:b.y+b.height/2,w:b.width,h:b.height};}));
        assert.ok(positions.every(p=>p.w>=44&&p.h>=44),'touch targets >=44px');
        for(let i=0;i<positions.length;i++)for(let j=i+1;j<positions.length;j++)assert.ok(Math.hypot(positions[i].x-positions[j].x,positions[i].y-positions[j].y)>=45,`${course} @${width}: distinct mission nodes`);
        await page.getByRole('button',{name:'Город курса',exact:true}).click();
      }
    }
  }
  await page.setViewportSize({width:1440,height:1000});
  await page.getByLabel('Класс / Кампания').selectOption(courses[0]);
  await page.locator('.campaign-region').first().click();
  await choose(3); await arrive(await missionId(3));
  await page.locator('.campaign-map').screenshot({path:`${shots}/map-1440.png`});
  await page.screenshot({path:`${shots}/campaign-1440.png`,fullPage:false});
  await page.setViewportSize({width:390,height:844});
  await page.locator('.campaign-map').screenshot({path:`${shots}/map-390.png`});
  await page.getByLabel('Состояние').selectOption('complete');
  await page.getByLabel('Класс / Кампания').selectOption(courses[1]);
  const regionSizes=await page.locator('.campaign-region small').allTextContents();
  const dense=regionSizes.findIndex(s=>s.includes('/ 30'));
  assert.ok(dense>=0,'dense region exists');
  await page.locator('.campaign-region').nth(dense).click();
  const lastMission=page.locator('.campaign-mission').nth(29);
  if(!await lastMission.isVisible())await page.getByText(/Все миссии района/).click();
  await lastMission.click(); await arrive(await missionId(9));
  assert.equal(await page.locator('.campaign-node').count(),10);
  assert.match(await page.locator('.campaign-leg-nav').innerText(),/3 \/ 3/);
  assert.equal(await page.locator('.campaign-node').last().innerText().then(s=>s.trim()),'30');
  await page.locator('.campaign-map').screenshot({path:`${shots}/dense-390.png`});
  await page.getByLabel('Состояние').selectOption('all-locked');
  assert.equal(await actor.count(),0,'closed courses do not leave a stale traveler');
  assert.deepEqual(problems,[]);
  console.log('campaignTraveler.browser.check: road movement, rapid reselection, locked missions, 4 avatar families, reduced motion, all regions in 6 courses at 320/390/768/1024/1440, 30-mission region remains reachable across ten-mission sections OK');
} catch(error){await page.screenshot({path:`${shots}/failure.png`,fullPage:true});throw error;} finally{await browser.close();await server.close();}
