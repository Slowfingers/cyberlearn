// Isolated visual fixtures: no student records, authentication or persistence.
import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {chromium} from '@playwright/test';
import {createServer} from 'vite';
import {mkdirSync} from 'node:fs';
import {ModularCharacter} from '../components/ModularCharacter.tsx';
import {DEFAULT_PARTS} from '../functions/characterLooks.mjs';
const looks=[['Длинные волосы · платье','long','dress','violet'],['Каре · куртка и юбка','bob','skirt_suit','copper'],['Хвост · длинное худи','ponytail','long_hoodie','navy'],['Коса · платье','braid','dress','silver']];
const gallery=renderToStaticMarkup(React.createElement('main',null,looks.map(([title,hair,outfit,hairColor])=>React.createElement('article',{key:hair},React.createElement('div',{className:'look'},React.createElement(ModularCharacter,{parts:{...DEFAULT_PARTS,hair,outfit,hairColor,accessory:'none'},stage:true,scale:3})),React.createElement('h2',null,title)))));
const html=`<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="stylesheet" href="/index.css"><title>Образы Ориона</title><style>body{margin:0;background:#09142a;color:#eaf4ff;padding:24px;font-family:Arial}main{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:16px;max-width:1050px;margin:auto}article{background:linear-gradient(#1d3150,#10213a);border:1px solid #486a91;border-radius:16px;padding:12px;text-align:center}.look{height:290px;display:grid;place-items:center}.look>svg{max-width:100%;height:270px;width:170px}h2{font-size:15px;margin:12px 0}@media(max-width:600px){body{padding:12px}main{grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}.look{height:245px}.look>svg{height:235px;width:145px}h2{font-size:12px}}</style>${gallery}</html>`;
const server=await createServer({plugins:[{name:'character-preview',configureServer(server){server.middlewares.use((req,res,next)=>{if(req.url==='/character-preview.html'){res.setHeader('Content-Type','text/html;charset=utf-8');res.end(html);}else next();});}}],server:{host:'127.0.0.1',port:3116,strictPort:true}});
await server.listen();const browser=await chromium.launch();const page=await browser.newPage();const problems=[];
page.on('pageerror',e=>problems.push(e.message));await page.route('**/api/**',r=>r.abort());mkdirSync('artifacts/character-styles',{recursive:true});
try{
 await page.goto('http://127.0.0.1:3116/character-preview.html');
 for(const width of [390,1200]){
  await page.setViewportSize({width,height:850});await page.evaluate(()=>document.fonts.ready);
  assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
  assert.equal(await page.locator('.character-hair-back').count(),4);
  assert.equal(await page.locator('.character-outfit-dress').count(),2);
  assert.equal(await page.locator('.character-outfit-skirt').count(),1);
  assert.equal(await page.locator('.character-outfit-hoodie').count(),1);
  await page.screenshot({path:`artifacts/character-styles/orion-${width}.png`,fullPage:true});
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 assert.equal(await page.locator('.avatar-motion-body').first().evaluate(e=>getComputedStyle(e).animationName),'none');
 assert.deepEqual(problems,[]);console.log('characterStyles.browser.check: four long hairstyles, three distinct outfits, mobile bounds and reduced motion OK');
}finally{await browser.close();await server.close();}
