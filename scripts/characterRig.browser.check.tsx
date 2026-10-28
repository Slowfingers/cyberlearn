// Static, isolated character gallery. No accounts or API data.
import assert from 'node:assert/strict';
import React from 'react';import{renderToStaticMarkup}from'react-dom/server';
import{mkdirSync}from'node:fs';import{chromium}from'@playwright/test';import{createServer}from'vite';
import{COSMETICS}from'../constants';import{PlayerAvatar}from'../components/PlayerAvatar';
const server=await createServer({server:{port:3131,host:'127.0.0.1',strictPort:true}});await server.listen();const browser=await chromium.launch();
const page=await browser.newPage({viewport:{width:1400,height:1000}});const errors:string[]=[];page.on('pageerror',e=>errors.push(e.message));const avatars=COSMETICS.filter(a=>a.type==='avatar');mkdirSync('artifacts/characters',{recursive:true});
const stylesheet='<base href="http://127.0.0.1:3131/"><link rel="stylesheet" href="/index.css?direct"><style>body{margin:0;padding:24px;background:#0b1527;color:#d7f0ff;font:14px Arial}main{display:grid;grid-template-columns:repeat(7,1fr);gap:14px}article{display:flex;align-items:center;flex-direction:column;background:#162a40;border:1px solid #3a5d78;border-radius:12px;padding:12px;overflow:hidden}article>svg{display:block;width:140px;height:220px;flex:none}h2{font-size:14px;margin:12px 0 0}</style>';
try{
 const gallery=renderToStaticMarkup(<main>{avatars.map(a=><article key={a.id} data-avatar={a.id}><PlayerAvatar user={{equipped:{avatar:a.id,droneColor:'col_default'}}} stage motion="walk"/><h2>{a.name}</h2></article>)}</main>);
 await page.setContent(stylesheet+gallery);await page.waitForFunction(()=>[...document.querySelectorAll('.character-leg--near')].every(e=>getComputedStyle(e).animationName==='orion-leg-near'));
 assert.equal(await page.locator('.character-leg--near').count(),avatars.length);
 const poses=()=>page.locator('.character-leg').evaluateAll(nodes=>nodes.map(e=>getComputedStyle(e).transform));const before=await poses();await page.waitForTimeout(130);const after=await poses();assert.ok(after.every((m,i)=>m!=='none'&&m!==before[i]),'all original, raster and new avatar legs actually move');
 await page.screenshot({path:'artifacts/characters/all-walking.png',fullPage:true});
 const fresh=avatars.filter(a=>['av_street_elli','av_street_kai','av_street_mira','av_street_axel'].includes(a.id));
 await page.setViewportSize({width:1000,height:400});await page.setContent(stylesheet+'<style>main{grid-template-columns:repeat(4,1fr)}article>svg{width:190px;height:270px}</style>'+renderToStaticMarkup(<main>{fresh.map(a=><article key={a.id}><PlayerAvatar user={{equipped:{avatar:a.id,droneColor:'col_default'}}} stage/><h2>{a.name}</h2></article>)}</main>));
 await page.waitForFunction(()=>[...document.images].every(e=>e.complete));await page.waitForTimeout(400);await page.screenshot({path:'artifacts/characters/new-street-four.png'});await page.setViewportSize({width:1400,height:1000});
 const motions=['idle','walk','jump','success','retry','thinking','speaking','wave'] as const;
 await page.setContent(stylesheet+renderToStaticMarkup(<main>{['av_1','av_street_frost','av_2','av_street_elli','av_street_kite'].flatMap(id=>motions.map(motion=><article key={id+motion}><PlayerAvatar user={{equipped:{avatar:id,droneColor:'col_default'}}} stage motion={motion}/><h2>{id} · {motion}</h2></article>))}</main>));
 await page.waitForTimeout(180);await page.screenshot({path:'artifacts/characters/reactions.png',fullPage:true});
 await page.emulateMedia({reducedMotion:'reduce'});assert.ok(await page.locator('.character-leg').evaluateAll(nodes=>nodes.every(e=>getComputedStyle(e).animationName==='none')));assert.deepEqual(errors,[]);
 console.log(`Character rigs: ${avatars.length} avatars with moving legs, 8 situational poses, original sprite masks and reduced motion OK`);
}finally{await browser.close();await server.close();}
