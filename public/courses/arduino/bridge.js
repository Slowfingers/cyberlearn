/* CyberLearn adapter. Runs before the local published application. */
(()=>{
 const params=new URLSearchParams(location.search),student=params.get('student')||'preview';
 window.ARDUINO_STORAGE_PREFIX='cyberlearn:arduino:'+encodeURIComponent(student);
 let completed=(params.get('done')||'').split(',').filter(Boolean);
 try{localStorage.setItem(window.ARDUINO_STORAGE_PREFIX+':done',JSON.stringify(completed));}catch{}
 const post=(type,data={})=>{if(parent!==window)parent.postMessage({channel:'cyberlearn-arduino',type,...data},location.origin);};
 let lastLesson='',lastRun='idle',lastSelection='',ready=false;
 let expanded=false;
 const setExpanded=(value,notify=true)=>{
  expanded=value;document.documentElement.classList.toggle('lab-scene-expanded',value);
  const button=document.querySelector('.lab-expand');if(button){button.setAttribute('aria-pressed',String(value));button.title=value?'Свернуть схему (Esc)':'Развернуть схему';button.querySelector('span').textContent=value?'Свернуть · Esc':'На весь экран';}
  if(notify)post('view',{expanded:value});
  requestAnimationFrame(()=>{dispatchEvent(new Event('resize'));if(!value)showModel();button?.focus({preventScroll:true});});
 };
 addEventListener('keydown',event=>{if(event.key==='Escape'&&expanded){event.preventDefault();setExpanded(false);}});
 const compact=()=>window.innerWidth<1000;
 const showModel=()=>document.querySelector('#stage')?.scrollIntoView({block:'start',behavior:'instant'});
 addEventListener('DOMContentLoaded',()=>{
  document.querySelector('.lab-expand')?.addEventListener('click',()=>setExpanded(!expanded));
  document.querySelector('.lab-run')?.addEventListener('click',()=>{const app=window.__app;if(!app)return;if(app.state.running==='idle')void app.run();else app.stop();updateControls(app);});
  document.querySelector('.lab-label-toggle')?.addEventListener('click',()=>{const app=window.__app;if(app){app.setSetting('labels',!app.state.settings.labels);updateControls(app);}});
  document.querySelector('#inspector')?.addEventListener('click',event=>{if(compact()&&event.target.closest('.insp-focus'))requestAnimationFrame(showModel);});
 });
 const updateControls=app=>{
  const run=document.querySelector('.lab-run'),labels=document.querySelector('.lab-label-toggle');
  if(run){const state=app.state.running;run.disabled=state==='uploading';run.dataset.running=String(state==='running');run.querySelector('.lab-run-text').textContent=state==='running'?'Остановить':state==='uploading'?'Подготовка…':'Запустить';run.querySelector('.lab-run-symbol').textContent=state==='running'?'■':'▶';run.setAttribute('aria-label',state==='running'?'Остановить схему':'Запустить схему');}
  labels?.setAttribute('aria-pressed',String(!!app.state.settings.labels));
  const selection=app.stage.selection?.group?.uuid||'';
  if(selection!==lastSelection){lastSelection=selection;if(selection){const focus=document.querySelector('.insp-focus span');if(focus)focus.textContent='Показать на схеме';const panel=document.querySelector('.lab-study-panel');if(panel)panel.scrollTop=0;if(compact()&&!expanded)document.querySelector('#inspector')?.scrollIntoView({block:'start',behavior:'instant'});}}
 };
 addEventListener('message',event=>{
  if(event.source!==parent||event.origin!==location.origin||event.data?.channel!=='cyberlearn-arduino')return;
  if(event.data.type==='view'){setExpanded(!!event.data.expanded,false);return;}
  const app=window.__app;if(!app){if(event.data.type==='select'){const id=event.data.lessonId;for(const button of document.querySelectorAll('.lesson[data-id]'))if(button.dataset.id===id)button.click();}return;}
  if(event.data.type==='select'&&typeof event.data.lessonId==='string')app.selectLesson(event.data.lessonId);
  if(event.data.type==='sync'&&Array.isArray(event.data.completed)){completed=event.data.completed.filter(id=>typeof id==='string');app.syncProgress(completed);}
  if(event.data.type==='pause')app.stop();
 });
 const timer=setInterval(()=>{
  const app=window.__app;if(!app){if(document.querySelector('.stage-note'))post('unavailable');return;}
  if(!ready){ready=true;lastLesson=app.state.lesson.id;lastRun=app.state.running;app.stage.grid.material.uniforms.color.value.set('#3a648a');app.stage.grid.material.uniforms.strength.value=.32;app.stage.touch();updateControls(app);post('ready');return;}
  updateControls(app);
  const id=app.state.lesson.id;
  if(id!==lastLesson){lastLesson=id;lastRun='idle';post('lesson',{lessonId:id});}
  if(app.state.running==='running'&&lastRun!=='running'){post('run',{lessonId:id});if(compact())showModel();}
  lastRun=app.state.running;
 },150);
 addEventListener('pagehide',()=>clearInterval(timer));
})();
