import React,{useEffect,useRef,useState} from 'react';
import {ArrowLeft,ArrowRight,BookOpen,Check,CheckCircle2,ChevronLeft,ChevronRight,Cpu,Expand,Fan,HardDrive,MemoryStick,Minimize2,Monitor,Plug,Power,RotateCcw,Unplug,Zap} from 'lucide-react';
import type {Task,User} from '../types';
import {PC_EXPLAIN,PC_LESSON_INTRO} from '../curriculum/pcLearning';
import {PC_LABELS,PC_PARTS,PC_SLOTS,PC_TARGETS,PC_MOUNTS,PC_PORTS,PC_CABLES,pcIsCable,pcPart,pcMountLabel,pcPortLabel,pcLessonParts,pcPlace,pcConnect,pcBootChecks,pcSlotCheck,pcGraphicsNeedsPower,pcBalanceChecks,pcPowerEstimate,pcRequiredPsu,pcInitialBuild,pcLessonChecks,pcLessonTargets,pcRemove,pcSanitize,type PcBuild,type PcCheck,type PcLessonId,type PcPart,type PcSlot,type PcMountId,type PcPortId} from '../utils/pcAssembly';
import PcBuilderScene from './PcBuilderScene';
import PcBootExperience from './PcBootExperience';
import {pcReadDraft,pcRestoreWorkshop} from '../utils/pcWorkshopDraft';
import '../styles/pc-builder.css';
interface Props {user:User;tasks:Task[];selected:Task;onSelect:(task:Task)=>void;onBack:()=>void;onComplete:(task:Task)=>Promise<void>;saving:boolean;failed?:Task;notifications?:React.ReactNode}
const partIcon=(slot:PcSlot)=>slot==='ram'?MemoryStick:slot==='ssd'?HardDrive:slot==='cooler'?Fan:slot==='gpu'||slot==='display'?Monitor:pcIsCable(slot)?Plug:slot==='psu'?Zap:Cpu;
function preferredBoard(userId:string){try{const id=localStorage.getItem(`cyberlearn:pc:platform:${userId}`);return pcPart(id??undefined)?.slot==='board'?id!:'board_atx';}catch{return 'board_atx';}}
function initialDraft(key:string,lesson:PcLessonId,user:User,tasks:Task[],selected:Task){
 let previous:PcBuild|undefined;
 const read=(key:string)=>{try{return JSON.parse(localStorage.getItem(key)||'null');}catch{return null;}};
 if(!['case','build'].includes(lesson))for(const task of tasks.slice(0,tasks.findIndex(t=>t.id===selected.id)).reverse()){
  if(!user.completedTaskIds?.includes(task.id)&&task.status!=='completed')continue;
  const draft=pcReadDraft(read(`cyberlearn:pc:v1:${user.id}:${task.id}`)),id=task.pcBuilderConfig?.lessonId;
  if(draft&&id&&pcLessonChecks(id,draft.build,draft.graphicsPower).every(c=>c.passed)){previous=draft.build;break;}
 }
 const base=pcInitialBuild(lesson,preferredBoard(user.id),previous);
 const saved=pcRestoreWorkshop(lesson,read(key),base);
 return{build:saved?.build??base,graphicsPower:saved?.graphicsPower??(lesson==='graphics'&&pcGraphicsNeedsPower(base)),restored:!!saved,continued:!!previous,base};
}

function Workshop({user,tasks,selected,onSelect,onBack,onComplete,saving,failed,notifications}:Props){
 const lesson=selected.pcBuilderConfig?.lessonId??'case',intro=PC_LESSON_INTRO[lesson];
 const draftKey=`cyberlearn:pc:v1:${user.id}:${selected.id}`;
 const [opening]=useState(()=>initialDraft(draftKey,lesson,user,tasks,selected));
 const [build,setBuild]=useState<PcBuild>(opening.build),[graphicsPower,setGraphicsPower]=useState(opening.graphicsPower);
 const targets=pcLessonTargets(lesson,build,graphicsPower);
 const [artwork,setArtwork]=useState<Record<string,string>>({});
 const [partId,setPartId]=useState<string|null>(null),[port,setPort]=useState<PcPortId|null>(null);
 const [activeSlot,setActiveSlot]=useState<PcSlot>(()=>targets.find((slot,i)=>!pcLessonChecks(lesson,build,graphicsPower)[i].passed)??intro.slot);
 const [focusSlot,setFocusSlot]=useState<PcSlot|'boot'>(()=>targets.find((slot,i)=>!pcLessonChecks(lesson,build,graphicsPower)[i].passed)??intro.slot);
 const [filter,setFilter]=useState('all'),[search,setSearch]=useState(''),[catalog,setCatalog]=useState(false),[theory,setTheory]=useState(false);
 const [message,setMessage]=useState(''),[error,setError]=useState(false),[checks,setChecks]=useState<PcCheck[]>([]);
 const [expanded,setExpanded]=useState(false),[labels,setLabels]=useState(false);
 const [firstBoot,setFirstBoot]=useState(false);
 const [boot,setBoot]=useState<'idle'|'testing'|'ok'|'error'>('idle'),[saveError,setSaveError]=useState(false),[draftError,setDraftError]=useState(false);
 const timer=useRef<ReturnType<typeof setTimeout>|null>(null),version=useRef(0),tray=useRef<HTMLDivElement>(null),root=useRef<HTMLElement>(null);
 const selectedPart=PC_PARTS.find(p=>p.id===partId),isInstalled=!!selectedPart&&build[selectedPart.slot]===selectedPart.id;
 const completed=selected.status==='completed'||user.completedTaskIds?.includes(selected.id);
 const lessonChecks=pcLessonChecks(lesson,build,graphicsPower),count=lessonChecks.filter(c=>c.passed).length,ready=count===targets.length;
 const assembled=PC_SLOTS.every(slot=>!!build[slot]);
 const balance=pcBalanceChecks(build).filter(c=>!c.passed),load=pcPowerEstimate(build),required=pcRequiredPsu(build),psu=pcPart(build.psu);
 const finished=completed&&ready&&(lesson!=='build'||boot==='ok'&&!balance.length);
 const cable=!!selectedPart&&pcIsCable(selectedPart.slot),explanation=PC_EXPLAIN[focusSlot];
 const availableParts=pcLessonParts(lesson);
 const shownParts=availableParts.filter(p=>(catalog?(filter==='all'||p.slot===filter):p.slot===activeSlot)&&`${p.name} ${p.spec}`.toLocaleLowerCase('ru').includes(search.toLocaleLowerCase('ru')));
 const filterSlots=[...new Set(availableParts.map(p=>p.slot))];
 const availableMounts=PC_MOUNTS.filter(m=>['case_atx','psu_bay'].includes(m.id)||build.board);
 const pair=selectedPart&&pcIsCable(selectedPart.slot)?PC_CABLES[selectedPart.slot]:undefined;
 const stepIndex=targets.indexOf(activeSlot);
 const stepTitle=PC_STEP_TITLES[activeSlot];
 const activate=(slot:PcSlot)=>{setFirstBoot(false);setActiveSlot(slot);setFocusSlot(slot);setPartId(null);setPort(null);setCatalog(false);setSearch('');setFilter('all');setError(false);setMessage('');setTheory(false);tray.current?.scrollTo(0,0);};
 useEffect(()=>{try{localStorage.setItem(draftKey,JSON.stringify({version:3,build,graphicsPower}));setDraftError(false);}catch{setDraftError(true);}},[build,draftKey,graphicsPower]);
 useEffect(()=>()=>{if(timer.current)clearTimeout(timer.current);},[]);
 useEffect(()=>{root.current?.scrollTo(0,0);},[]);
 useEffect(()=>{if(!firstBoot||!root.current)return;const node=root.current,before=node.scrollTop;node.scrollTo(0,0);return()=>node.scrollTo(0,before);},[firstBoot]);
 useEffect(()=>{if(!expanded)return;const before=document.body.style.overflow;document.body.style.overflow='hidden';const key=(e:KeyboardEvent)=>{if(e.key==='Escape')setExpanded(false);};window.addEventListener('keydown',key);return()=>{document.body.style.overflow=before;window.removeEventListener('keydown',key);};},[expanded]);
 const edit=(next:PcBuild)=>{if(next.board)try{localStorage.setItem(`cyberlearn:pc:platform:${user.id}`,next.board);}catch{}version.current++;if(timer.current)clearTimeout(timer.current);setFirstBoot(false);if(lesson==='graphics'&&pcGraphicsNeedsPower(next))setGraphicsPower(true);setBuild(next);setBoot('idle');setChecks([]);setSaveError(false);};
 const choose=(p:PcPart)=>{
  setFirstBoot(false);setPartId(p.id);setPort(null);setFocusSlot(p.slot);setActiveSlot(p.slot);setError(false);setMessage('');setTheory(false);

 };
 const accept=(result:{build:PcBuild;error?:string})=>{
  if(result.error){setError(true);setMessage(result.error);return;}
  edit(result.build);setError(false);setPartId(null);setPort(null);
  const nextPower=graphicsPower||lesson==='graphics'&&pcGraphicsNeedsPower(result.build);
  const next=pcLessonTargets(lesson,result.build,nextPower).find(slot=>!pcSlotCheck(result.build,slot).passed);
  if(next){setActiveSlot(next);setFocusSlot(next);}else setFocusSlot(lesson==='build'?'boot':activeSlot);
  setCatalog(false);setSearch('');setFilter('all');setTheory(false);tray.current?.scrollTo(0,0);
  setMessage('');
 };
 const place=(mount:PcMountId)=>{if(!selectedPart||saving)return;accept(pcPlace(build,selectedPart.id,mount));};
 const connect=(next:PcPortId)=>{
  if(!selectedPart||!pcIsCable(selectedPart.slot)||saving)return;
  if(!port){setPort(next);setError(false);setMessage('');return;}
  if(port===next){setPort(null);setMessage('');return;}
  const result=pcConnect(build,selectedPart.id,port,next);accept(result);if(result.error)setPort(null);
 };
 const remove=()=>{if(!selectedPart||saving)return;edit(pcRemove(build,selectedPart.slot));setPort(null);setPartId(null);setError(false);setMessage('Деталь снята вместе с зависимыми соединениями.');};
 const start=()=>{
  if(!assembled||lesson!=='build'||saving)return;
  if(timer.current)clearTimeout(timer.current);setBoot('testing');setFocusSlot('boot');setChecks([]);setError(false);setMessage('');
  const revision=version.current,snapshot={...build};timer.current=setTimeout(()=>{
   if(revision!==version.current)return;const result=pcBootChecks(snapshot),ok=result.every(c=>c.passed);setChecks(result);setBoot(ok?'ok':'error');setError(!ok);setMessage(ok?'':result.find(c=>!c.passed)!.hint);
   if(ok){setPartId(null);setPort(null);setFirstBoot(true);}
   if(!ok){const slot=PC_SLOTS[result.findIndex(c=>!c.passed)];setActiveSlot(slot);setFocusSlot(slot);setPartId(null);setPort(null);setCatalog(false);setSearch('');setFilter('all');}
  },1100);
 };
 const verify=async()=>{
  setFirstBoot(false);const result=pcLessonChecks(lesson,build,graphicsPower);setChecks(result);
  if(!ready){const i=result.findIndex(c=>!c.passed);activate(targets[i]);setError(true);setMessage(result[i]?.hint??'Заверши сборку.');return;}
  if(lesson==='build'&&boot!=='ok'){setError(true);setMessage('Сборка готова. Теперь нажми «Включить ПК», затем сохрани результат.');return;}
  if(lesson==='build'&&balance.length){activate(balance[0].slot);setError(true);setMessage('POST пройден, но сборку нужно улучшить. Причина указана у текущего шага.');return;}
  setError(false);setMessage('');
  if(!completed){try{setSaveError(false);await onComplete(selected);}catch{setSaveError(true);}}
 };
 const reset=(boardId=build.board??preferredBoard(user.id))=>{const fresh=pcInitialBuild(lesson,boardId);setGraphicsPower(false);edit(fresh);setPartId(null);setPort(null);setFocusSlot(intro.slot);setActiveSlot(intro.slot);setCatalog(false);setSearch('');setTheory(false);setError(false);setMessage('');};
 const nextTask=tasks[tasks.findIndex(t=>t.id===selected.id)+1];
 const board=pcPart(build.board);
 const learning=<><h3>{explanation.title}</h3><p>{explanation.what}</p><p>{explanation.why}</p>{selectedPart&&<p className="pc-specific-part">{selectedPart.detail}</p>}</>;
 const installedPart=pcPart(build[activeSlot]),installedActive=!!installedPart,activeCheck=pcSlotCheck(build,activeSlot);
 const activeIssue=!activeCheck.passed?activeCheck.hint:lesson==='build'?balance.find(c=>c.slot===activeSlot)?.hint:undefined;
 const removedByReplacement=selectedPart&&build[selectedPart.slot]&&build[selectedPart.slot]!==selectedPart.id?PC_SLOTS.filter(slot=>slot!==selectedPart.slot&&build[slot]&&!pcRemove(build,selectedPart.slot)[slot]):[];
 const pending=targets.find(slot=>!pcSlotCheck(build,slot).passed)??(lesson==='build'?balance[0]?.slot:undefined);
 const baseParts=PC_SLOTS.filter(slot=>build[slot]&&!targets.includes(slot));
 const mount=selectedPart&&!cable?PC_MOUNTS.find(m=>(m.slots as readonly string[]).includes(selectedPart.slot)):undefined;
 const cableHelp=pair?port?`Теперь нажми «${pcPortLabel(port===pair.source?pair.target:pair.source,build)}» на модели или в схеме ниже.`:'Нажми первый разъём, затем второй — на модели или в схеме ниже.':PC_STEP_HINTS[activeSlot];
 return <section ref={root} className={`pc-course${expanded?' pc-expanded':''}${firstBoot?' pc-watching':''}`} aria-label="Мастерская сборки ПК">
  <header className="pc-header"><button className="pc-back" aria-label="К карте курсов" onClick={onBack}><ArrowLeft size={17}/><span>К курсам</span></button><div className="pc-brand"><span>HARDWARE LAB</span><h1>Собери свой ПК</h1></div><div className="pc-course-score">{tasks.filter(t=>t.status==='completed'||user.completedTaskIds?.includes(t.id)).length} / {tasks.length} мастерских</div></header>
  <nav className="pc-lessons" aria-label="Мастерские курса">{tasks.map((task,i)=><button key={task.id} aria-current={task.id===selected.id?'step':undefined} disabled={saving||task.status==='locked'} onClick={()=>{if(task.id!==selected.id)onSelect(task);}}><b>{task.status==='completed'||user.completedTaskIds?.includes(task.id)?<Check size={14}/>:i+1}</b><span>{task.title}</span></button>)}</nav>
  <main className="pc-workspace">
   <section className="pc-workbench" aria-label="Конструктор компьютера">
    <div className="pc-scene-toolbar"><div className="pc-platform-picker"><span className="pc-platform">{board?`${board.socket} · ${board.ramType}`:'Открытый корпус'}</span>{!['case','build'].includes(lesson)&&<select aria-label="Учебная платформа" value={build.board??'board_atx'} title="Смена платформы начнёт этот этап заново" onChange={e=>{reset(e.target.value);setMessage(`Новая платформа: ${pcPart(e.target.value)?.spec}. Этап начат заново.`);}}>{PC_PARTS.filter(p=>p.slot==='board').map(p=><option key={p.id} value={p.id}>{p.name} · {p.socket} / {p.ramType}</option>)}</select>}</div><div><button aria-pressed={labels} onClick={()=>setLabels(v=>!v)} aria-label="Подписи на модели">Подписи деталей</button><button onClick={()=>reset()} disabled={saving} aria-label="Начать этап заново"><RotateCcw size={16}/></button><button onClick={()=>setExpanded(v=>!v)} aria-label={expanded?'Свернуть конструктор':'Развернуть конструктор'}>{expanded?<Minimize2 size={17}/>:<Expand size={17}/>}</button></div></div>
    <div className="pc-model"><PcBuilderScene onArtwork={setArtwork} build={build} selected={isInstalled?null:partId} powered={boot==='ok'} bootScreen={firstBoot?<PcBootExperience onClose={()=>setFirstBoot(false)}/>:null} onExitBoot={()=>setFirstBoot(false)} labels={labels} selectedPort={port} onMount={place} onPort={connect} onInspect={slot=>{if(availableParts.some(p=>p.slot===slot))activate(slot);setFocusSlot(slot);setTheory(true);}}/>
    </div>
    <section className="pc-inventory" aria-label="Игровой инвентарь"><div className="pc-parts-heading"><h2>{catalog?'Весь набор':PC_LABELS[activeSlot]} <span>{shownParts.length}</span></h2><button className="pc-catalog-toggle" aria-pressed={catalog} onClick={()=>{setCatalog(v=>!v);setSearch('');setFilter('all');tray.current?.scrollTo(0,0);}}>{catalog?'К текущему шагу':'Весь набор'}</button>{catalog&&<div className="pc-inventory-filter"><select aria-label="Тип комплектующей" value={filter} onChange={e=>{setFilter(e.target.value);tray.current?.scrollTo(0,0);}}><option value="all">Все типы</option>{filterSlots.map(slot=><option key={slot} value={slot}>{PC_LABELS[slot]}</option>)}</select><input aria-label="Найти комплектующую" placeholder="Найти деталь" value={search} onChange={e=>setSearch(e.target.value)}/></div>}<div className="pc-tray-arrows"><button aria-label="Предыдущие детали" onClick={()=>tray.current?.scrollBy({left:-280,behavior:'smooth'})}><ChevronLeft size={16}/></button><button aria-label="Следующие детали" onClick={()=>tray.current?.scrollBy({left:280,behavior:'smooth'})}><ChevronRight size={16}/></button></div></div>

    <div className="pc-parts" ref={tray} aria-label="Детали для сборки">{shownParts.map(p=>{const Icon=partIcon(p.slot),installed=build[p.slot]===p.id;return <button key={p.id} aria-label={`${p.name} · ${p.spec}`} aria-pressed={p.id===partId} draggable={!saving&&!pcIsCable(p.slot)} onDragStart={e=>{e.dataTransfer.setData('text/plain',p.id);e.dataTransfer.effectAllowed='copy';choose(p);}} onClick={()=>choose(p)} style={{'--part-color':p.color} as React.CSSProperties}><span className="pc-part-art">{artwork[p.id]?<img className="pc-item-sprite" src={artwork[p.id]} alt="" loading="lazy" decoding="async" draggable={false}/>:<Icon size={24}/>}{installed&&<i><Check size={12}/></i>}</span><strong>{p.name}</strong><small>{p.spec}</small></button>;})}{!shownParts.length&&<p className="pc-empty-tray">Ничего не найдено. Измени запрос или тип детали.</p>}</div></section>
   </section>
   <aside className="pc-study" aria-label="Задание и диагностика">
    <section className="pc-objective"><span className="pc-eyebrow">ЭТАП {tasks.findIndex(t=>t.id===selected.id)+1} / {tasks.length}<b>{count} из {targets.length} готово</b></span><h2>{selected.title}</h2><div className="pc-progress" role="progressbar" aria-label="Сборка этапа" aria-valuemin={0} aria-valuemax={targets.length} aria-valuenow={count}><i style={{width:`${count/targets.length*100}%`}}/></div></section>
    <nav className="pc-steps" aria-label="Шаги сборки">{targets.length<=4?targets.map((slot,i)=><button key={slot} aria-current={activeSlot===slot?'step':undefined} onClick={()=>activate(slot)}><span>{lessonChecks[i].passed?<Check size={12}/>:i+1}</span>{PC_LABELS[slot]}</button>):<label>Текущий шаг<select aria-label="Шаг сборки" value={activeSlot} onChange={e=>activate(e.target.value as PcSlot)}>{targets.map((slot,i)=><option key={slot} value={slot}>{lessonChecks[i].passed?'✓':`${i+1}.`} {PC_LABELS[slot]}</option>)}</select></label>}</nav>
    <div className="pc-study-scroll">
     <section className="pc-guide" aria-label="Текущий шаг">
      {!selectedPart&&!ready&&<p className="pc-stage-context">{opening.restored?'Продолжаешь свой черновик. Галочки показывают уже выполненные шаги.':lesson==='case'?'Начинаем с пустого корпуса. Выбери и установи плату.':lesson==='build'?'Финал — новая сборка с пустого корпуса. Предыдущие этапы сохраняются.':opening.continued?'Продолжаем твой ПК из предыдущего этапа.':'Для этого этапа подготовлена учебная основа.'}</p>}
      {!selectedPart&&!ready&&baseParts.length>0&&<details className="pc-stage-base"><summary>Что уже установлено для этого этапа</summary><ul>{baseParts.map(slot=><li key={slot}>{pcPart(build[slot])?.name} · {pcPart(build[slot])?.spec}</li>)}</ul><p>Эти детали не нужно устанавливать повторно.</p></details>}
      {ready&&!partId&&!(installedActive&&activeIssue)?<><span className="pc-guide-kicker">{finished?'ЗАВЕРШЕНО':boot==='ok'?'POST OK':'ГОТОВО'}</span><h3>{finished?'Этап пройден':lesson==='build'&&balance.length?'Сборка требует улучшения':boot==='ok'?'Компьютер работает':lesson==='build'?'Сборка готова':'Проверь результат'}</h3></>:<><span className="pc-guide-kicker">{stepIndex<0?'СОВМЕСТИМОСТЬ':`ШАГ ${stepIndex+1} / ${targets.length}`}</span><h3>{installedActive&&!selectedPart?!activeIssue?`${PC_LABELS[activeSlot]} уже на месте`:`Проверь: ${PC_LABELS[activeSlot]}`:isInstalled?`Установлено: ${selectedPart.name}`:stepTitle}</h3>
      {isInstalled?<><p>{selectedPart!.spec}</p>{activeIssue&&<p className="pc-step-warning">{activeIssue}</p>}<button className="pc-remove" onClick={remove} disabled={saving}><Unplug size={15}/>Снять деталь</button></>:<>
       <p className="pc-instruction">{selectedPart?cable?cableHelp:`Нажми «${mount?pcMountLabel(mount.id,build):'место установки'}» на 3D-модели.`:installedActive?`${installedPart.name} · ${installedPart.spec}. ${activeIssue??'Этот шаг выполнен.'}`:PC_STEP_HINTS[activeSlot]}</p>
       {!selectedPart&&installedActive&&<div className="pc-step-controls"><button onClick={()=>choose(installedPart)}>Осмотреть / снять</button>{pending&&pending!==activeSlot&&<button onClick={()=>activate(pending)}>Следующий незавершённый шаг</button>}</div>}
       {selectedPart&&build[selectedPart.slot]&&!isInstalled&&<div className="pc-replacement-note">Заменишь: {pcPart(build[selectedPart.slot])?.name}.{removedByReplacement.length>0&&<> Снимутся также: {removedByReplacement.map(slot=>PC_LABELS[slot]).join(', ')}.</>}{selectedPart.slot==='cpu'&&build.cooler&&<button onClick={()=>{edit(pcRemove(build,'cooler'));setError(false);setMessage('Кулер снят. Теперь можно заменить процессор.');}}>Сначала снять кулер</button>}</div>}
       {!selectedPart&&activeSlot==='pcie'&&build.gpu&&<p className="pc-fit-note">{pcPart(build.gpu)?.connector==='12-pin'?'Для RTX 3080 нужен адаптер 2 × 8-pin → 12-pin.':pcPart(build.gpu)?.connector==='16-pin'?'Нужен 16-pin: кабель 12V-2x6 с БП ATX 3.1 или адаптер 3 × PCIe 8-pin.':`Разъём видеокарты: ${pcPart(build.gpu)?.connector}. Нужен кабель GPU / PCIe.`}</p>}
       {pair&&<div className="pc-wire-guide" aria-label="Схема подключения кабеля">{[pair.source,pair.target].map((id,i)=><button key={id} className={port===id?'is-connected':port?'is-next':''} aria-label={`Разъём ${pcPortLabel(id,build)}`} aria-pressed={port===id} disabled={saving||!!PC_PORTS.find(p=>p.id===id)?.owner&&!build[PC_PORTS.find(p=>p.id===id)!.owner!]} onClick={()=>connect(id)}><span className="pc-wire-number">{port===id?<Check size={15}/>:i+1}</span><span><strong>{pcPortLabel(id,build)}</strong><small>{PC_PORT_HINTS[id]}{PC_PORTS.find(p=>p.id===id)?.owner&&!build[PC_PORTS.find(p=>p.id===id)!.owner!]?` · сначала установи устройство`:''}</small></span></button>)}</div>}
       {selectedPart&&!cable&&<details className="pc-manual"><summary>Места установки</summary><div className="pc-destinations">{availableMounts.map(m=><button key={m.id} aria-label={`Установить в ${pcMountLabel(m.id,build)}`} onClick={()=>place(m.id)}>{pcMountLabel(m.id,build)}</button>)}</div></details>}
      </>}
      {board&&['cpu','ram','cooler'].includes(activeSlot)&&<p className="pc-fit-note">Плата: {board.socket} · {board.ramType}{activeSlot==='cooler'&&build.cpu?` · CPU ${pcPart(build.cpu)?.watts} Вт`:''}</p>}
      </>}
     </section>
     {['power','graphics','build'].includes(lesson)&&(build.cpu||build.gpu||build.psu)&&<section className="pc-build-status" aria-label="Совместимость сборки"><div className="pc-power-summary"><span>Оценка нагрузки<strong>~{load} Вт</strong></span><span>БП с запасом<strong>{required}+ Вт</strong></span><span>Установлен<strong className={psu&&(psu.watts??0)<required?'is-short':''}>{psu?`${psu.watts} Вт`:'—'}</strong></span></div><small>{!build.cpu||!build.gpu?'Для невыбранных CPU/GPU учтён базовый комплект. После выбора расчёт изменится.':'Учебная оценка пикового потребления, не замер из розетки.'}</small>{psu&&(psu.watts??0)<required&&<div className="pc-balance-warning pc-power-warning"><strong>Нужен более мощный БП</strong><p>Установлен {psu.watts} Вт, для выбранной сборки требуется от {required} Вт.</p><button onClick={()=>activate('psu')}>Подобрать: Блок питания</button></div>}{selectedPart?.slot==='pcie'&&selectedPart.id==='pcie_16'&&!psu?.native16&&<div className="pc-balance-warning"><strong>У БП нет штатного 12V-2x6</strong><p>Выбери БП ATX 3.1 или адаптер для трёх отдельных PCIe 8-pin.</p><button onClick={()=>activate('psu')}>Подобрать БП ATX 3.1</button></div>}{lesson==='build'&&balance.map(c=><div className="pc-balance-warning" key={c.label}><strong>{c.label}</strong><p>{c.hint}</p><button onClick={()=>activate(c.slot)}>Подобрать: {PC_LABELS[c.slot]}</button></div>)}{!balance.length&&build.cpu&&build.gpu&&<p className="pc-balanced">Критических замечаний по учебному балансу нет.</p>}</section>}
     <details className="pc-theory" open={theory} onToggle={e=>setTheory(e.currentTarget.open)}><summary><BookOpen size={15}/>{explanation.title}</summary><section className="pc-learning" aria-label="Как устроена деталь">{learning}</section></details>

    </div>
    {(message||error||draftError||saveError||failed?.id===selected.id)&&<div className={`pc-feedback${error?' is-error':''}`} role="status">{message&&<p>{message}</p>}{draftError&&<p>Черновик не сохранился. Не закрывай страницу до завершения.</p>}{(saveError||failed?.id===selected.id)&&<p>Награда не сохранена. Повтори сохранение.</p>}</div>}
    <div className="pc-actions">
     {finished?<><button className="pc-next pc-completed" onClick={()=>nextTask&&nextTask.status!=='locked'?onSelect(nextTask):onBack()}>{nextTask&&nextTask.status!=='locked'?<>Следующий этап<ArrowRight size={16}/></>:<>К карте курсов<ArrowLeft size={16}/></>}</button><button className="pc-repeat" onClick={()=>void verify()} disabled={saving}>Проверить снова</button></>:lesson==='build'&&boot!=='ok'?<button className="pc-power" onClick={start} disabled={!assembled||saving||boot==='testing'}><Power size={17}/>{boot==='testing'?'POST: проверяем…':'Включить ПК'}</button>:<button className="pc-verify" onClick={()=>void verify()} disabled={saving||boot==='testing'}><CheckCircle2 size={17}/>{saving?'Сохраняем…':saveError||failed?.id===selected.id?'Повторить сохранение':completed?'Проверить снова':lesson==='build'?'Сохранить сборку':'Проверить этап'}</button>}

    </div>
   </aside>
  </main><div className="pc-notifications">{notifications}</div>
 </section>;
}
const PC_STEP_TITLES:Record<PcSlot,string>={board:'Установи материнскую плату',cpu:'Подбери процессор',paste:'Нанеси термопасту',cooler:'Закрепи охлаждение',ram:'Установи оперативную память',ssd:'Установи накопитель',psu:'Установи блок питания',gpu:'Установи видеокарту',atx:'Подключи питание платы',eps:'Подключи питание процессора',pcie:'Подключи питание видеокарты',front:'Подключи кнопку корпуса',display:'Соедини видеокарту и монитор'};
const PC_STEP_HINTS:Record<PcSlot,string>={board:'Выбери плату в лотке деталей. Затем установи её на стойки корпуса.',cpu:'Выбери процессор с таким же сокетом, как у платы.',paste:'Выбери термопасту в лотке. Нанеси её на установленный процессор.',cooler:'Выбери кулер с подходящим креплением и запасом охлаждения.',ram:'Выбери память того поколения, которое поддерживает плата.',ssd:'Выбери SSD для разъёма M.2.',psu:'Выбери блок питания с запасом мощности для сборки.',gpu:'Выбери видеокарту в лотке деталей. Затем установи её в PCIe x16.',atx:'Выбери кабель ATX 24-pin в лотке деталей.',eps:'Выбери кабель CPU / EPS 4+4-pin в лотке деталей.',pcie:'Выбери кабель питания видеокарты в лотке деталей.',front:'Выбери провод POWER SW в лотке деталей.',display:'Выбери кабель монитора DisplayPort в лотке деталей.'};
const PC_PORT_HINTS:Record<PcPortId,string>={psu_atx:'Выход основного питания на блоке питания',board_atx:'Широкий разъём на краю платы',psu_eps:'Выход CPU / EPS на блоке питания',board_eps:'Разъём рядом с процессором на плате',psu_pcie:'Выход GPU / PCIe на блоке питания',gpu_power:'Разъём на верхней кромке видеокарты',case_sw:'Провод от кнопки включения корпуса',board_front:'Контакты F_PANEL на материнской плате',gpu_dp:'Видеовыход на задней планке видеокарты',monitor_dp:'Видеовход на мониторе'};
export default function PcBuilderCourse(props:Props){return <Workshop key={`${props.user.id}:${props.selected.id}`} {...props}/>;}
