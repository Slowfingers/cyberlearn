// Reproducible Russian adaptation of the published snapshot; no network at build time.
import fs from 'node:fs';import path from 'node:path';import crypto from 'node:crypto';import ts from 'typescript';
const root='third_party/learn-arduino',source=root+'/upstream',out='public/courses/arduino',assets=out+'/assets';fs.mkdirSync(assets,{recursive:true});
const pairs=fs.readFileSync(root+'/locales/ru-pairs.txt','utf8').split('\n').filter(Boolean).map(line=>{const at=line.indexOf('|');if(at<1)throw Error('Invalid translation: '+line);return[line.slice(0,at),line.slice(at+1)];});const dictionary=new Map(pairs);const ordered=[...dictionary].sort((a,b)=>b[0].length-a[0].length);
function html(text){for(const [en,ru]of ordered){const escaped=en.replace(/[.*+?^${}()|[\]\\]/g,'\\$&');const before=/^[\p{L}\p{N}_]/u.test(en)?'(?<![\\p{L}\\p{N}_-])':'';const after=/[\p{L}\p{N}_]$/u.test(en)?'(?![\\p{L}\\p{N}_-])':'';text=text.replace(new RegExp(before+escaped+after,'gu'),()=>ru);}return text;}
function translate(text){if(dictionary.has(text))return dictionary.get(text);return /<(?:h[1-6]|p|span|button|b|ol|ul|li|div|table|header|footer|label|input|code|section|a)(?:\s|>)/i.test(text)?html(text):text;}
const hashes={};
for(const name of fs.readdirSync(source)){let data=fs.readFileSync(source+'/'+name);hashes[name]=crypto.createHash('sha256').update(data).digest('hex');if(name==='index.html')continue;
 if(name.endsWith('.js')){let text=data.toString().replaceAll('"assets/','"courses/arduino/assets/').replaceAll('`learn-arduino:done`','`${window.ARDUINO_STORAGE_PREFIX}:done`').replaceAll('`learn-arduino:values`','`${window.ARDUINO_STORAGE_PREFIX}:values`').replaceAll('`learn-arduino:settings`','`${window.ARDUINO_STORAGE_PREFIX}:settings`');
  // Retain the upstream simulation functions. Expose only the existing lesson selection/progress controls to the adapter.
  if(name.startsWith('index-'))text=text.replace('state:L,setParam:nt,','state:L,syncProgress:ids=>{z.done=new Set(ids);z.paintDone();Ze();J.refresh()},setParam:nt,');
  if(name.startsWith('index-')){
   // Layout coordinates stay in CSS pixels; the published fixed-size artboard no longer scales the UI.
   const ast=ts.createSourceFile(name,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
   const resize=ast.statements.find(node=>ts.isFunctionDeclaration(node)&&node.name?.text==='Ye');
   if(!resize)throw Error('Published resize adapter not found');
   text=text.slice(0,resize.getStart(ast))+'function Ye(){N=1;P=window.innerWidth<1000;document.documentElement.classList.toggle(`compact`,P);k.style.width=``;k.style.height=``;k.style.transform=``;}'+text.slice(resize.end);
   for(const [before,after]of [
    ['F=P||n<Ge','F=!0'],['let r=P?12:100','let r=P?72:76'],
    ['h:t-r-70','h:Math.max(140,t-r-(P?112:84))'],['r+(t-r-58)/2','r+(t-r-(P?112:84))/2'],
    ['W.dock=P?`bottom`:`corner`','W.dock=`panel`'],['labels:!0','labels:!1'],
    ['state:L,syncProgress:','state:L,setSetting:Qe,syncProgress:']
   ]){if(!text.includes(before))throw Error('Layout hook missing: '+before);text=text.replace(before,after);}
  }
  if(name.startsWith('stage-')){if(!text.includes('floorCredit:!0'))throw Error('Floor watermark switch missing');text=text.replace('floorCredit:!0','floorCredit:!1');
  const originalUi='`.callout, .viewbar, .tag, .hotspot, .readout, .minimap, .inspector`';if(!text.includes(originalUi))throw Error('Pointer UI guard missing');text=text.replace(originalUi,'`.callout, .viewbar, .tag, .hotspot, .readout, .minimap, .inspector, .lab-scene-actions, .lab-label-toggle, .lab-expand`');}
  const sf=ts.createSourceFile(name,text,ts.ScriptTarget.Latest,true,ts.ScriptKind.JS);
  const result=ts.transform(sf,[context=>{const visit=node=>{
   if(ts.isStringLiteral(node)){const translated=translate(node.text);if(translated!==node.text)return ts.factory.createStringLiteral(translated);}
   if(ts.isNoSubstitutionTemplateLiteral(node)){const translated=translate(node.text);if(translated!==node.text)return ts.factory.createNoSubstitutionTemplateLiteral(translated);}
   if(ts.isTemplateHead(node)||ts.isTemplateMiddle(node)||ts.isTemplateTail(node)){const translated=translate(node.text);if(translated!==node.text)return ts.isTemplateHead(node)?ts.factory.createTemplateHead(translated):ts.isTemplateMiddle(node)?ts.factory.createTemplateMiddle(translated):ts.factory.createTemplateTail(translated);}
   return ts.visitEachChild(node,visit,context);
  };return node=>ts.visitNode(node,visit);}]);
  text=ts.createPrinter({removeComments:false}).printFile(result.transformed[0]);result.dispose();data=Buffer.from(text);
 }else if(name.endsWith('.css'))data=Buffer.from(data.toString().replaceAll('/assets/','/courses/arduino/assets/'));
 fs.writeFileSync(assets+'/'+name,data);
}
let page=fs.readFileSync(source+'/index.html','utf8').replace('lang="en"','lang="ru"').replaceAll('/assets/','/courses/arduino/assets/');
// Metadata remains attributed to the author. App content is localized, code syntax and identifiers stay intact.
page=html(page).replace(/<link[^>]+(?:favicon|apple-touch-icon|site.webmanifest)[^>]*>/g,'').replace('</head>','<link rel="stylesheet" href="./cyberlearn.css"><script src="./bridge.js"></script></head>');
// Keep author/source records in third_party; student-facing navigation contains no external links.
page=page.replace(/<a\b[^>]*href="https?:[^"]*"[^>]*>[\s\S]*?<\/a>/g,'')
 .replace(/<link[^>]+rel="canonical"[^>]*>/g,'')
 .replace(/<meta[^>]+(?:property="og:|name="twitter:)[^>]*>/g,'')
 .replace(/<script type="application\/ld\+json">[\s\S]*?<\/script>/g,'');
const inspector='<div class="inspector" id="inspector" role="dialog" aria-label="'+dictionary.get('Part inspector')+'"></div>';
if(!page.includes(inspector))throw Error('Inspector markup changed');page=page.replace(inspector,'');
page=page.replace('<!-- Right info panel -->','<aside class="lab-study-panel" aria-label="Материалы и настройки">'+inspector+'<!-- Right info panel -->').replace('<section class="lessons"','</aside><section class="lessons"');
page=page.replace('<main class="stage" id="stage">','<main class="stage" id="stage"><header class="lab-scene-heading"><span>ИНЖЕНЕРНАЯ ЛАБОРАТОРИЯ</span><h1>Исследуй схему</h1><p>Нажми на деталь, чтобы изменить её настройки</p></header><button class="lab-expand" type="button" aria-pressed="false" title="Развернуть схему">⛶ <span>На весь экран</span></button><button class="lab-label-toggle" aria-pressed="false" type="button">Подписи</button>');
page=page.replace('<div class="viewbar"','<div class="lab-scene-actions"><div class="viewbar"').replace('</main>','<button class="lab-run" type="button"><span class="lab-run-symbol" aria-hidden="true">▶</span><span class="lab-run-text">Запустить</span></button></div></main>');
fs.writeFileSync(out+'/index.html',page);fs.copyFileSync(root+'/cyberlearn.css',out+'/cyberlearn.css');fs.copyFileSync(root+'/bridge.js',out+'/bridge.js');fs.cpSync(root+'/notices',out+'/notices',{recursive:true});
fs.writeFileSync(root+'/snapshot.json',JSON.stringify({url:'https://learn-arduino-red.vercel.app/',author:'https://x.com/DilumSanjaya',retrieved:'2026-10-22',repository:null,upstreamLicense:null,files:hashes},null,2)+'\n');
console.log(`Arduino: ${Object.keys(hashes).length} snapshot files, ${pairs.length} Russian translations; original 11 simulations retained.`);
