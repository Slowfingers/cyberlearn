import React,{useEffect,useId,useRef,useState} from 'react';
import {Armchair,Check,Palette,ShoppingBag,X,ZoomIn,Coins,MessageCircle,Move,Package,RotateCw,Save,Sparkles,Undo2} from 'lucide-react';
import {RoomBuilding,ROOM_VIEWS} from './RoomBuilding';
import {GameButton,GameDialog} from './GameUI';
import {PlayerAvatar} from './PlayerAvatar';
import type {CharacterMotion} from './ModularCharacter';
import type {RoomPlacement,User} from '../types';
import {ROOM_ITEMS,ROOM_PALETTES,ROOM_SIZE,ROOM_WALL_ROWS,ROOM_ENTRY,ROOM_CLUTTER,roomIsClean,roomSnapshot,roomFootprint,roomCells,roomWallCells,roomWalkingPath,validateRoomPlacement} from '../functions/avatarRoom.mjs';
import {changeAvatarRoom} from '../services/mockBackend';
import {getPlayerCharacter} from '../utils/playerCharacter';
import {projectRoom,projectRoomWall,roomWallPolygon,roomCellPolygon,unprojectRoom,roomLocalScale} from '../utils/avatarRoomGeometry';
import '../styles/avatar-room.css';

type Point={x:number;y:number};
const entry={...ROOM_ENTRY};
const floorCells=Array.from({length:ROOM_SIZE*ROOM_SIZE},(_,i)=>({x:i%ROOM_SIZE,y:Math.floor(i/ROOM_SIZE)}));
const wallSlots=(['left','right'] as const).flatMap(wall=>Array.from({length:ROOM_SIZE*ROOM_WALL_ROWS},(_,i)=>({wall,x:i%ROOM_SIZE,y:Math.floor(i/ROOM_SIZE)})));
const rugTone=(hex:string,index:number)=>{const channel=parseInt(hex.slice(index,index+2),16)/255;return `0 ${(channel*.55).toFixed(4)} ${channel.toFixed(4)} 1`;};
const cellsWord=(n:number)=>n===1?'клетка':n>=2&&n<=4?'клетки':'клеток';
const cellKey=(p:Point)=>`${p.x},${p.y}`;
const idleLines=['В этой комнате можно быть собой. Что добавим сегодня?','Монеты из уроков можно превратить в новые вещи для комнаты.','На стенах есть место для твоих любимых постеров.','Оставим немного свободного места, чтобы было удобно ходить.'];

export function AvatarRoom({user,onUpdate,onClose}:{user:User;onUpdate:(user:User)=>void;onClose:()=>void}){
 const ambientId=useId();
 const initial=roomSnapshot(user);
 const [placements,setPlacements]=useState<RoomPlacement[]>(initial.placements);
 const [palette,setPalette]=useState(initial.palette);
 const [revision,setRevision]=useState(initial.revision);
 const [editing,setEditing]=useState(false);
 const [zoomed,setZoomed]=useState(false);
 const view=ROOM_VIEWS.apartment;
 const [selected,setSelected]=useState<string|null>(null);
 const [ghost,setGhost]=useState<RoomPlacement|null>(null);
 const [pinned,setPinned]=useState(false);
 const [category,setCategory]=useState('Все');
 const [query,setQuery]=useState('');
 const [shopOpen,setShopOpen]=useState(false);
 const [paletteOpen,setPaletteOpen]=useState(false);
 const [busy,setBusy]=useState(false);
 const [dirty,setDirty]=useState(false);
 const [leave,setLeave]=useState(false);
 const [message,setMessage]=useState('');
 const [error,setError]=useState('');
 const [point,setPoint]=useState<Point>(entry);
 const [moving,setMoving]=useState(false);
 const [facing,setFacing]=useState('right');
 const [speech,setSpeech]=useState(roomIsClean(initial)?'Вот наш уютный уголок! Давай устроимся поудобнее.':'Ого, какой беспорядок! Сначала разберём вещи, а потом обустроимся.');
 const [bubbleVisible,setBubbleVisible]=useState(true);
 const [canvasSize,setCanvasSize]=useState({width:1000,height:667});
 const [sceneViewport,setSceneViewport]=useState({left:0,width:1000});
 const [reaction,setReaction]=useState<CharacterMotion>('speaking');
 const frame=useRef(0),position=useRef<Point>(entry),cell=useRef<Point>(entry),lineIndex=useRef(0);
 const sceneScroll=useRef<HTMLDivElement>(null);
 const sceneSvg=useRef<SVGSVGElement>(null);
 const catalogScroll=useRef<HTMLDivElement>(null);
 const room=roomSnapshot(user),owned=room.owned,clean=roomIsClean(room);
 const clutter=ROOM_CLUTTER.filter(spot=>!room.cleared.includes(spot.id));
 const item=ROOM_ITEMS.find(i=>i.id===selected);
 const footprint=ghost?roomFootprint(ghost):null;
 const rugPalette=ROOM_PALETTES.find(p=>p.id===palette)??ROOM_PALETTES[0];
 const rugFilter=(definition:typeof ROOM_ITEMS[number])=>definition.recolorable?`url(#${ambientId}-rug-${rugPalette.id})`:undefined;
 const inCategory=(i:typeof ROOM_ITEMS[number],c:string)=>c==='Все'||c===i.category||(c==='Мои вещи'&&owned.includes(i.id));
 const catalogItems=ROOM_ITEMS.filter(i=>inCategory(i,category)&&`${i.name} ${i.description}`.toLocaleLowerCase('ru').includes(query.trim().toLocaleLowerCase('ru')));
 const name=getPlayerCharacter(user).name;
 const say=(text:string,mood:CharacterMotion='speaking')=>{setSpeech(text);setReaction(mood);setBubbleVisible(true);};
 useEffect(()=>()=>cancelAnimationFrame(frame.current),[]);
 useEffect(()=>{if(!message)return;const timer=setTimeout(()=>setMessage(''),6500);return()=>clearTimeout(timer);},[message]);
 useEffect(()=>{const timer=setTimeout(()=>setReaction('idle'),5000),hide=setTimeout(()=>setBubbleVisible(false),12000);return()=>{clearTimeout(timer);clearTimeout(hide);};},[speech]);
 useEffect(()=>{const svg=sceneSvg.current,container=sceneScroll.current;if(!svg||!container)return;const observer=new ResizeObserver(()=>{const r=svg.getBoundingClientRect();setCanvasSize({width:r.width,height:r.height});setSceneViewport({left:container.scrollLeft,width:container.clientWidth});});observer.observe(svg);observer.observe(container);return()=>observer.disconnect();},[]);
 useEffect(()=>{if(catalogScroll.current)catalogScroll.current.scrollLeft=0;},[category,query,shopOpen]);
 useEffect(()=>{
  const container=sceneScroll.current;
  if(!zoomed||!container||window.innerWidth>600)return;
  const target=ghost?projectRoom(ghost.x+.5,ghost.y+.5):projectRoom(point.x+.5,point.y+.5);
  container.scrollLeft=Math.max(0,target.x/1536*container.scrollWidth-container.clientWidth/2);
 },[zoomed,ghost?.x,ghost?.y,point.x,point.y]);
 const stopAtEntry=()=>{cancelAnimationFrame(frame.current);position.current={...entry};cell.current={...entry};setPoint({...entry});setMoving(false);};
 const close=()=>{if(busy)return;if(dirty)setLeave(true);else onClose();};
 const clearSelection=()=>{setGhost(null);setSelected(null);setPinned(false);};
 const openShop=(filter='Все')=>{clearSelection();setShopOpen(true);setPaletteOpen(false);setCategory(filter);setQuery('');};
 const choose=(id:string)=>{
  if(!clean||busy)return;
  cancelAnimationFrame(frame.current);setMoving(false);setEditing(true);setShopOpen(false);setPaletteOpen(false);setZoomed(window.innerWidth<=800);setSelected(id);setPinned(false);setError('');setMessage('');
  const definition=ROOM_ITEMS.find(i=>i.id===id)!;
  say(`${definition.name}: ${definition.w} × ${definition.h} ${definition.mount==='wall'?'на стене':'клетки'}. Примерим место?`);
  const current=placements.find(p=>p.itemId===id);
  if(current){setGhost({...current});return;}
  const candidate:RoomPlacement={itemId:id,x:2,y:definition.mount==='wall'?0:3,rotation:0,...(definition.mount==='wall'?{wall:'left' as const}:{})};
  for(const target of definition.mount==='wall'?wallSlots:floorCells){try{validateRoomPlacement({...candidate,...target},placements,[...owned,id]);setGhost({...candidate,...target});return;}catch{}}
  setGhost(candidate);
 };
 let placementError='';
 if(ghost)try{validateRoomPlacement(ghost,placements,[...owned,ghost.itemId]);}catch(e){placementError=e instanceof Error?e.message:'Выбери свободную клетку.';}
 const ghostKeys=new Set(ghost?roomCells(ghost).map(cellKey):[]);
 const occupied=new Set(placements.filter(p=>p.itemId!==ghost?.itemId&&ROOM_ITEMS.find(i=>i.id===p.itemId)?.solid).flatMap(roomCells).map(cellKey));
 const floorClass=(p:Point)=>ghostKeys.has(cellKey(p))?placementError?' is-preview-invalid':' is-preview-valid':occupied.has(cellKey(p))?' is-occupied':p.x===entry.x&&p.y===entry.y?' is-entry':'';
 const movePreview=(target:Point&{wall?:'left'|'right'})=>{if(!ghost||busy)return;setGhost({...ghost,...target,x:Math.max(0,Math.min(ROOM_SIZE-1,target.x)),y:Math.max(0,Math.min(item?.mount==='wall'?ROOM_WALL_ROWS-1:ROOM_SIZE-1,target.y))});setPinned(true);};
 const commit=async()=>{
  if(!item||!ghost||placementError||busy)return;
  setBusy(true);setError('');setMessage('');
  try{
   if(!owned.includes(item.id)){const updated=await changeAvatarRoom('buyRoomItem',{itemId:item.id});onUpdate(updated);}
   setPlacements(old=>[...old.filter(p=>p.itemId!==item.id),{...ghost}]);setDirty(true);clearSelection();setMessage(item.mount==='wall'?'Предмет повешен. Сохрани расстановку.':'Предмет установлен. Сохрани расстановку.');say('Отличное место! Сохраним, чтобы всё осталось как задумано.','success');stopAtEntry();
  }catch(e){setError(e instanceof Error?e.message:'Покупка не сохранилась. Попробуй ещё раз.');say('Не получилось сохранить покупку. Давай попробуем ещё раз.','retry');}finally{setBusy(false);}
 };
 const save=async()=>{
  if(busy)return;setBusy(true);setError('');
  try{
   const updated=await changeAvatarRoom('saveRoomLayout',{placements,palette,revision});const saved=roomSnapshot(updated);onUpdate(updated);setPlacements(saved.placements);setRevision(saved.revision);setPalette(saved.palette);setDirty(false);setLeave(false);setMessage('Комната сохранена.');clearSelection();say('Готово! Всё на своих местах. Мне здесь нравится.','success');stopAtEntry();
  }catch(e){setError(e instanceof Error?e.message:'Не удалось сохранить комнату.');say('Связь подвела, но наша расстановка пока здесь. Попробуем сохранить ещё раз.','retry');}finally{setBusy(false);}
 };
 const animateWalk=(target:Point,onArrival?:()=>void)=>{
  const path=roomWalkingPath(cell.current,target,placements) as Point[];
  if(!path.length)return false;
  cancelAnimationFrame(frame.current);
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){position.current=target;cell.current=target;setPoint(target);setMoving(false);onArrival?.();return true;}
  const route=[position.current,...path],length=route.length-1,duration=Math.max(200,length*210);let started:number|undefined;
  setMoving(true);
  const tick=(time:number)=>{
   started??=time;const progress=Math.min(1,(time-started)/duration)*length,index=Math.min(length-1,Math.floor(progress)),t=progress-index,a=route[index],b=route[index+1];
   const next={x:a.x+(b.x-a.x)*t,y:a.y+(b.y-a.y)*t};position.current=next;cell.current=route[index];setPoint(next);setFacing(projectRoom(b.x,b.y).x<projectRoom(a.x,a.y).x?'left':'right');
   if(progress<length)frame.current=requestAnimationFrame(tick);else{position.current=target;cell.current=target;setPoint(target);setMoving(false);onArrival?.();}
  };
  frame.current=requestAnimationFrame(tick);return true;
 };
 const walk=(target:Point)=>{
  if(busy)return;
  if(editing){if(item?.mount!=='wall')movePreview(target);return;}
  if(!animateWalk(target)){say('Тут не пройти. Выберем свободное место?','thinking');setMessage('Здесь стоит мебель или нет свободного прохода.');}else setMessage('');
 };
 const tidy=(spot:typeof ROOM_CLUTTER[number])=>{
  if(busy)return;setBusy(true);setError('');say('Сейчас разберём эти вещи!','thinking');
  const arrival=async()=>{
   try{const updated=await changeAvatarRoom('cleanRoomSpot',{spotId:spot.id});onUpdate(updated);const done=roomIsClean(roomSnapshot(updated));say(done?'Ура, порядок! Теперь можно выбирать мебель и делать комнату своей.':spot.line,'success');setMessage(done?'Уборка завершена. Обустройство открыто!':'Вещи разобраны. Прогресс сохранён.');}
   catch(e){setError(e instanceof Error?e.message:'Не удалось сохранить уборку.');say('Не удалось сохранить уборку. Вещи пока останутся здесь — попробуем снова.','retry');}
   finally{setBusy(false);}
  };
  // Old saved layouts may cover a pile. Approach from the nearest reachable tile.
  const candidates=[...floorCells].sort((a,b)=>Math.abs(a.x-spot.x)+Math.abs(a.y-spot.y)-Math.abs(b.x-spot.x)-Math.abs(b.y-spot.y));
  const target=candidates.find(p=>roomWalkingPath(cell.current,p,placements).length);
  if(target)animateWalk(target,()=>void arrival());else void arrival();
 };
 const followPointer=(e:React.PointerEvent<SVGSVGElement>)=>{
  if(!ghost||pinned||busy||e.pointerType==='touch'||item?.mount==='wall')return;
  const matrix=e.currentTarget.getScreenCTM();if(!matrix)return;
  const local=new DOMPoint(e.clientX,e.clientY).matrixTransform(matrix.inverse()),p=unprojectRoom(local.x,local.y),target={x:Math.floor(p.x),y:Math.floor(p.y)};
  if(target.x>=0&&target.y>=0&&target.x<ROOM_SIZE&&target.y<ROOM_SIZE&&(ghost.x!==target.x||ghost.y!==target.y))setGhost({...ghost,...target});
 };
 const previewKeys=(e:React.KeyboardEvent)=>{
  if(!ghost||busy||!(e.target instanceof SVGElement))return;
  const offsets:Record<string,Point>=item?.mount==='wall'?{ArrowUp:{x:0,y:-1},ArrowDown:{x:0,y:1},ArrowLeft:{x:-1,y:0},ArrowRight:{x:1,y:0}}:{ArrowUp:{x:-1,y:0},ArrowDown:{x:1,y:0},ArrowLeft:{x:0,y:1},ArrowRight:{x:0,y:-1}};
  if(offsets[e.key]){e.preventDefault();e.stopPropagation();const d=offsets[e.key];movePreview({x:ghost.x+d.x,y:ghost.y+d.y});}
  if(item?.mount!=='wall'&&(e.key.toLowerCase()==='r'||e.key.toLowerCase()==='к')){e.preventDefault();setGhost({...ghost,rotation:ghost.rotation===0?1:0});setPinned(true);}
 };
 const wallObject=(p:RoomPlacement,preview=false)=>{
  const definition=ROOM_ITEMS.find(i=>i.id===p.itemId)!;const wall=p.wall??'left';
  const origin=projectRoomWall(wall,p.x,p.y),right=projectRoomWall(wall,p.x+definition.w,p.y),bottom=projectRoomWall(wall,p.x,p.y+definition.h);
  return <g key={`${preview?'wall-ghost':'wall'}-${p.itemId}`} className={`room-wall-object${preview?' room-object--ghost':''}`} data-item-id={p.itemId} data-wall={wall} data-grid-x={p.x} data-grid-y={p.y} data-ghost={preview||undefined}>
   <image href={definition.asset} width="1" height="1" preserveAspectRatio="none" transform={`matrix(${right.x-origin.x} ${right.y-origin.y} 0 ${bottom.y-origin.y} ${origin.x} ${origin.y})`} style={{pointerEvents:'none'}}/>
   {!preview&&<polygon points={roomWallPolygon(wall,p.x,p.y,definition.w,definition.h)} fill="transparent" role="button" tabIndex={ghost?-1:0} aria-label={`Изменить: ${definition.name}`} onClick={()=>choose(p.itemId)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(p.itemId);}}}/>}
   {preview&&<polygon points={roomWallPolygon(wall,p.x,p.y,definition.w,definition.h)} fill="none" stroke={placementError?'#ff9aad':'#8bffda'} strokeWidth="4" style={{pointerEvents:'none'}}/>}
  </g>;
 };
 const object=(p:RoomPlacement,preview=false)=>{
  const definition=ROOM_ITEMS.find(i=>i.id===p.itemId)!;const size=roomFootprint(p)!;
  const center=projectRoom(p.x+size.w/2,p.y+size.h/2),front=projectRoom(p.x+size.w,p.y+size.h);
  const corners=[projectRoom(p.x,p.y),projectRoom(p.x+size.w,p.y),projectRoom(p.x+size.w,p.y+size.h),projectRoom(p.x,p.y+size.h)];
  const localScale=roomLocalScale(p.x+size.w/2,p.y+size.h/2);
  const height=definition.solid?(definition.height??(definition.id==='room_bed'?370:definition.id==='room_bookcase'?350:definition.id==='room_lamp'?270:definition.id==='room_plant'?200:235))*localScale:Math.max(...corners.map(p=>p.y))-Math.min(...corners.map(p=>p.y));
  const width=definition.solid?definition.width*localScale:Math.max(...corners.map(p=>p.x))-Math.min(...corners.map(p=>p.x));
  return <g key={`${preview?'ghost':'placed'}-${p.itemId}`} className={`room-object${preview?' room-object--ghost':''}`} data-item-id={p.itemId} data-grid-x={p.x} data-grid-y={p.y} data-rotation={p.rotation} data-ghost={preview||undefined}>
   {!preview&&clean&&(definition.solid||editing)&&<polygon points={roomCellPolygon(p.x,p.y,size.w,size.h)} fill="transparent" role="button" tabIndex={ghost?-1:0} style={{pointerEvents:ghost?'none':undefined}} aria-label={`Изменить: ${definition.name}`} onClick={()=>choose(p.itemId)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();choose(p.itemId);}}}/>}
   <image href={definition.asset} x={center.x-width/2} y={front.y-height+5} width={width} height={height} preserveAspectRatio={definition.solid?'xMidYMax meet':'none'} className="room-furniture-image" style={{transformOrigin:`${center.x}px ${front.y}px`,transform:p.rotation===1?'scaleX(-1)':undefined,filter:rugFilter(definition)}}/>
  </g>;
 };
 const visible=placements.filter(p=>p.itemId!==ghost?.itemId);
 const sorted=visible.filter(p=>ROOM_ITEMS.find(i=>i.id===p.itemId)?.solid).map(p=>({depth:projectRoom(p.x+roomFootprint(p)!.w,p.y+roomFootprint(p)!.h).y,node:object(p)}));
 for(const spot of clutter){const anchor=projectRoom(spot.x+.5,spot.y+.5);sorted.push({depth:anchor.y+5,node:<g key={spot.id} className="room-clutter" data-clutter-id={spot.id} role="button" tabIndex={busy?-1:0} aria-label={spot.name} aria-disabled={busy} onClick={()=>tidy(spot)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();tidy(spot);}}}><ellipse cx={anchor.x} cy={anchor.y+3} rx="70" ry="24" fill="#ffd49d22"/><image href={`/art/avatar-room/${spot.asset}-v1.webp`} x={anchor.x-105} y={anchor.y-135} width="210" height="150"/><circle cx={anchor.x+60} cy={anchor.y-85} r="22" fill="#18304a" stroke="#ffdf9e" strokeWidth="2"/><text x={anchor.x+60} y={anchor.y-78} textAnchor="middle" fill="#ffdf9e" fontSize="27">✦</text></g>});}
 const avatar=projectRoom(point.x+.5,point.y+.5);
 const avatarScale=roomLocalScale(point.x+.5,point.y+.5);
 sorted.push({depth:avatar.y+1,node:<g key="avatar" className="room-player" data-moving={moving} data-grid-x={point.x.toFixed(3)} data-grid-y={point.y.toFixed(3)} style={{pointerEvents:'none'}}><ellipse cx={avatar.x} cy={avatar.y} rx={32*avatarScale} ry={12*avatarScale} fill="#07142b55"/><g transform={`translate(${avatar.x} ${avatar.y}) scale(${(facing==='left'?-1:1)*avatarScale} ${avatarScale})`}><foreignObject x="-48" y="-148" width="96" height="156" style={{overflow:'visible'}}><div className="room-player-sprite"><PlayerAvatar user={user} stage fullBody motion={moving?'walk':reaction} className="room-avatar-art"/></div></foreignObject></g></g>});
 sorted.sort((a,b)=>a.depth-b.depth);
 const sceneScale=Math.min(canvasSize.width/view.width,canvasSize.height/view.height);
 const bubbleWidth=Math.min(280,sceneViewport.width-24);
 const headX=(canvasSize.width-view.width*sceneScale)/2+(avatar.x-view.x)*sceneScale;
 const headY=(canvasSize.height-view.height*sceneScale)/2+(avatar.y-154*avatarScale-view.y)*sceneScale;
 const headIsVisible=headX>=sceneViewport.left+12&&headX<=sceneViewport.left+sceneViewport.width-12;
 const bubbleX=Math.max(sceneViewport.left+bubbleWidth/2+10,Math.min(sceneViewport.left+sceneViewport.width-bubbleWidth/2-10,headX));
 const placementPanel=ghost&&item&&footprint&&(<section className="room-placement-panel" aria-label="Размещение предмета">
       <div className="room-placement-title"><img src={item.asset} alt=""/><div><strong>{item.name}</strong><span className="room-size-badge" data-footprint={`${footprint.w}x${footprint.h}`}>{footprint.w} × {footprint.h} · {item.mount==='wall'?'на стене':`${footprint.w*footprint.h} ${cellsWord(footprint.w*footprint.h)}`}</span><small>{item.mount==='wall'?'Крепится к стене и не занимает пол':item.solid?'Занимает место на полу':'Можно ходить и ставить мебель сверху'}</small></div></div>
       {item.mount==='wall'?<div className="room-wall-controls">
        <div className="room-wall-switch" role="group" aria-label="Выбрать стену">{(['left','right'] as const).map(w=><button key={w} type="button" aria-pressed={ghost.wall===w} onClick={()=>movePreview({...ghost,wall:w})}>{w==='left'?'Левая стена':'Правая стена'}</button>)}</div>
        <p>Нажми место на стене комнаты или на плане ниже.</p>
        <div className="room-wall-plan" role="group" aria-label="План стены">{wallSlots.filter(p=>p.wall===ghost.wall).map(p=><button key={cellKey(p)} type="button" disabled={busy} aria-label={`На стене: ${p.x+1}, ${p.y+1}`} className={roomWallCells(ghost).some((c:Point)=>c.x===p.x&&c.y===p.y)?placementError?'is-invalid':'is-valid':''} onClick={()=>movePreview(p)}/>)}</div>
       </div>:<details className="room-plan-details" open={undefined}><summary>План пола и сдвиг по клеткам</summary>
       <div className="room-floor-plan" role="group" aria-label="План пола сверху">{floorCells.map(p=><button key={cellKey(p)} type="button" className={floorClass(p)} aria-label={`На плане: ${p.x+1}, ${p.y+1}`} onClick={()=>movePreview(p)} disabled={busy} title={`Столбец ${p.x+1}, ряд ${p.y+1}`}>{p.x===entry.x&&p.y===entry.y?'↥':''}</button>)}</div>
       <div className="room-grid-legend"><span>■ Свободно</span><span>■ Занято</span><span className={placementError?'is-invalid':'is-valid'}>■ Предмет</span></div>
       <div className="room-nudge" role="group" aria-label="Сдвинуть на одну клетку">{[{text:'↖ К стене',x:-1,y:0},{text:'↗ Вправо',x:0,y:-1},{text:'↙ Влево',x:0,y:1},{text:'↘ К себе',x:1,y:0}].map(d=><button key={d.text} type="button" disabled={busy} onClick={()=>movePreview({x:ghost.x+d.x,y:ghost.y+d.y})}>{d.text}</button>)}</div>
       </details>}
       <p className={placementError?'room-placement-error':'room-placement-ok'} role="status">{placementError||(item.mount==='wall'?'Место свободно — можно повесить':'Места хватает — можно поставить')}</p>

       {item.mount!=='wall'&&<GameButton size="compact" disabled={busy} onClick={()=>{setGhost({...ghost,rotation:ghost.rotation===0?1:0});setPinned(true);}}><RotateCw size={17}/>Повернуть</GameButton>}
       <GameButton variant="primary" size="compact" disabled={busy||!!placementError||(!owned.includes(item.id)&&user.currency<item.cost)} onClick={()=>void commit()}>{owned.includes(item.id)?item.mount==='wall'?'Повесить':'Поставить':user.currency<item.cost?`Не хватает ${item.cost-user.currency}`:<><Coins size={16}/>{item.mount==='wall'?'Купить и повесить':'Купить и поставить'} · {item.cost}</>}</GameButton>
       <div className="room-placement-secondary"><GameButton size="compact" disabled={busy} onClick={()=>setPinned(false)}><Move size={17}/>Выбрать место</GameButton>{placements.some(p=>p.itemId===item.id)&&<GameButton size="compact" disabled={busy} onClick={()=>{setPlacements(old=>old.filter(p=>p.itemId!==item.id));setDirty(true);clearSelection();setMessage('Предмет убран в коллекцию.');say('Пусть пока побудет в коллекции. Вернём его, когда захотим.');}}><Package size={17}/>Убрать</GameButton>}<GameButton size="compact" onClick={clearSelection} disabled={busy}><Undo2 size={17}/>Отмена</GameButton></div>
      </section>);
 return <GameDialog size="wide" title="Моя комната" onClose={close} headerExtra={<div className="room-header-actions"><span className="ui-wallet room-wallet" aria-label={`${user.currency} монет`}><Coins size={18}/>{user.currency}</span><GameButton variant="primary" size="compact" aria-label="Сохранить" onClick={()=>void save()} disabled={busy||!dirty||!clean}><Save size={17}/><span>{busy?'Подожди…':'Сохранить'}</span></GameButton></div>}>
  <div onKeyDownCapture={e=>{if(e.key==='Escape'&&(ghost||shopOpen||paletteOpen)){e.preventDefault();e.stopPropagation();clearSelection();setShopOpen(false);setPaletteOpen(false);}}} className={`avatar-room${editing?' is-editing':''}${ghost?' has-preview':''}${ghost&&item?.mount==='wall'?' has-wall-preview':''}${shopOpen&&!ghost?' has-shop':''}`}>
   <nav className="room-toolbar" aria-label="Действия в комнате">
    <GameButton size="compact" disabled={busy} aria-pressed={!editing&&!shopOpen&&!paletteOpen} onClick={()=>{setEditing(false);setShopOpen(false);setPaletteOpen(false);clearSelection();}}><Sparkles size={18}/><span>В комнате</span></GameButton>
    {!clean&&<GameButton size="compact" disabled={busy} aria-pressed={shopOpen} onClick={()=>openShop()}><Sparkles size={18}/><span>Уборка</span></GameButton>}
    <GameButton size="compact" disabled={!clean||busy} aria-pressed={editing} onClick={()=>{setEditing(true);cancelAnimationFrame(frame.current);setMoving(false);openShop();say('Выбирай предмет и примеряй его прямо в комнате.');}}><Move size={18}/><span>Обустроить</span></GameButton>
    {clean&&<><GameButton size="compact" aria-label="Магазин мебели" disabled={busy} aria-pressed={shopOpen&&category!=='Мои вещи'} onClick={()=>openShop()}><ShoppingBag size={18}/><span>Магазин</span></GameButton><GameButton size="compact" aria-label="Открыть мои вещи" disabled={busy} aria-pressed={shopOpen&&category==='Мои вещи'} onClick={()=>openShop('Мои вещи')}><Package size={18}/><span>Мои вещи</span></GameButton><GameButton size="compact" aria-label="Изменить цвет ковров" disabled={busy} aria-pressed={paletteOpen} onClick={()=>{clearSelection();setShopOpen(false);setPaletteOpen(!paletteOpen);}}><Palette size={18}/><span>Цвет ковров</span></GameButton></>}
    <GameButton size="icon" aria-label="Поговорить" onClick={()=>say(idleLines[lineIndex.current++%idleLines.length])}><MessageCircle size={18}/></GameButton>
    <GameButton size="icon" className="room-camera-toggle" aria-label={zoomed?'Весь вид':'Приблизить комнату'} onClick={()=>setZoomed(!zoomed)}><ZoomIn size={18}/></GameButton>
   </nav>
   {leave&&<div className="room-leave" role="alert"><p>Расстановка ещё не сохранена.</p><GameButton size="compact" onClick={()=>setLeave(false)}>Остаться</GameButton><GameButton size="compact" onClick={onClose}>Выйти без сохранения</GameButton></div>}
   <div className="room-layout">
    <section className="room-stage-panel" aria-label="Твоя комната">
     <div className="room-stage-heading"><strong>{clean?editing?'Режим обустройства':'Твоя квартира':'Новоселье'}</strong><span>{clean?dirty?'Сохрани изменения':'Личное пространство':`Разобрано ${room.cleared.length} из ${ROOM_CLUTTER.length}`}</span></div>
     <div ref={sceneScroll} onScroll={e=>setSceneViewport({left:e.currentTarget.scrollLeft,width:e.currentTarget.clientWidth})} className={`room-scene-scroll${zoomed?' is-zoomed':''}`}><div className="room-scene-canvas"><svg ref={sceneSvg} className="room-scene" viewBox={`${view.x} ${view.y} ${view.width} ${view.height}`} data-room-view="apartment" role="group" aria-label="Комната и клетки пола" onPointerMove={followPointer} onKeyDown={previewKeys}>
      <defs>{ROOM_PALETTES.map(p=><filter key={p.id} id={`${ambientId}-rug-${p.id}`} colorInterpolationFilters="sRGB"><feColorMatrix type="saturate" values="0"/><feComponentTransfer><feFuncR type="table" tableValues={rugTone(p.fabricColor,1)}/><feFuncG type="table" tableValues={rugTone(p.fabricColor,3)}/><feFuncB type="table" tableValues={rugTone(p.fabricColor,5)}/></feComponentTransfer></filter>)}<radialGradient id={ambientId}><stop stopColor="#5ce8f5" stopOpacity=".2"/><stop offset="1" stopColor="#5ce8f5" stopOpacity="0"/></radialGradient></defs>
      <RoomBuilding/>
      {visible.filter(p=>ROOM_ITEMS.find(i=>i.id===p.itemId)?.mount==='wall').map(p=>wallObject(p))}
      {ghost&&item?.mount==='wall'&&<>{wallSlots.map(slot=><polygon key={`${slot.wall}-${cellKey(slot)}`} className="room-wall-cell" points={roomWallPolygon(slot.wall,slot.x,slot.y)} role="button" tabIndex={0} aria-label={`${slot.wall==='left'?'Левая':'Правая'} стена: ${slot.x+1}, ${slot.y+1}`} onClick={()=>movePreview(slot)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();movePreview(slot);}}} onPointerEnter={e=>{if(!pinned&&!busy&&e.pointerType!=='touch')setGhost({...ghost,...slot});}}/>)}{wallObject(ghost,true)}</>}

      <ellipse cx="790" cy="650" rx="650" ry="300" fill={`url(#${ambientId})`} style={{pointerEvents:'none',mixBlendMode:'screen'}}/>
      {floorCells.map(p=><polygon key={cellKey(p)} className={`room-floor-cell${editing?' is-editing':''}${floorClass(p)}`} points={roomCellPolygon(p.x,p.y)} role="button" tabIndex={clean?0:-1} aria-label={`Клетка ${p.x+1}, ${p.y+1}`} onClick={()=>walk(p)} onKeyDown={e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();walk(p);}}}/>)}
      {visible.filter(p=>!ROOM_ITEMS.find(i=>i.id===p.itemId)?.solid&&ROOM_ITEMS.find(i=>i.id===p.itemId)?.mount!=='wall').map(p=>object(p))}
      {sorted.map(entry=>entry.node)}
      {ghost&&item?.mount!=='wall'&&object(ghost,true)}
      {ghost&&footprint&&item?.mount!=='wall'&&<g className="room-footprint-overlay" aria-hidden="true">
       {roomCells(ghost).map((p:Point)=><polygon key={cellKey(p)} points={roomCellPolygon(p.x,p.y)} className={placementError?'room-placement--invalid':'room-placement--valid'} strokeWidth="3"/>)}
       <polygon points={roomCellPolygon(ghost.x,ghost.y,footprint.w,footprint.h)} fill="none" stroke={placementError?'#ff9aad':'#8bffda'} strokeWidth="5"/>
       <g transform={`translate(${projectRoom(ghost.x+footprint.w/2,ghost.y+footprint.h/2).x} ${projectRoom(ghost.x+footprint.w,ghost.y+footprint.h).y+34})`}><rect x="-95" y="-22" width="190" height="42" rx="12" fill="#071c32" stroke={placementError?'#ff9aad':'#8bffda'}/><text textAnchor="middle" y="7" fill="#f1f9ff" fontSize="23" fontFamily="Arial">{footprint.w} × {footprint.h} · {footprint.w*footprint.h} кл.</text></g>
      </g>}
     </svg>
     {bubbleVisible&&headIsVisible&&!(zoomed&&ghost)&&<div className="room-speech-bubble" role="status" aria-live="polite" aria-label={`Реплика: ${name}`} style={{left:bubbleX,top:Math.max(90,headY-10),width:bubbleWidth,'--room-tail':`${Math.max(18,Math.min(bubbleWidth-18,headX-bubbleX+bubbleWidth/2))}px`} as React.CSSProperties}><p>{speech}</p><button type="button" aria-label="Скрыть реплику" onClick={()=>setBubbleVisible(false)}>×</button></div>}
     </div></div>
     {placementPanel}
     {shopOpen&&!ghost&&(    <aside className="room-catalog" aria-label="Магазин комнаты">
     <GameButton className="room-shop-close" size="icon" aria-label="Закрыть магазин комнаты" onClick={()=>setShopOpen(false)}><X size={18}/></GameButton>
     {!clean?<><div className="room-catalog-title"><Sparkles size={21}/><h3>Новоселье</h3></div><p>Разберём вещи бесплатно. После уборки откроются мебель, декор и свет.</p><progress className="room-cleanup-progress" aria-label="Уборка комнаты" value={room.cleared.length} max={ROOM_CLUTTER.length}/><div className="room-cleanup-list">{ROOM_CLUTTER.map(spot=><button key={spot.id} type="button" disabled={busy||room.cleared.includes(spot.id)} onClick={()=>tidy(spot)}><img src={`/art/avatar-room/${spot.asset}-v1.webp`} alt=""/><span>{spot.name}<small>{room.cleared.includes(spot.id)?'Готово ✓':'Разобрать'}</small></span></button>)}</div><p>Прогресс уборки сохраняется сразу.</p></>:<>
      <div className="room-catalog-title"><Armchair size={21}/><h3>Мебель и уют</h3></div><p>Кровать и ковёр — подарок. Остальное — за монеты из уроков.</p>

      <nav className="room-categories" aria-label="Каталог комнаты">{['Все','Мебель','Декор','Свет','На стену','Мои вещи'].map(c=><button key={c} type="button" aria-pressed={category===c} onClick={()=>setCategory(c)}>{c}<span className="room-category-count" aria-hidden="true">{ROOM_ITEMS.filter(i=>inCategory(i,c)).length}</span></button>)}</nav>
      <label className="room-search"><span>Поиск по каталогу</span><input type="search" aria-label="Найти предмет для комнаты" placeholder="Например, шкаф или пианино" value={query} onChange={e=>setQuery(e.target.value)}/></label><p className="room-result-count">{catalogItems.length} предметов · листай каталог</p>
      <div ref={catalogScroll} className="room-catalog-items">{catalogItems.map(i=><button key={i.id} type="button" className="room-catalog-card" aria-pressed={selected===i.id} aria-label={`Выбрать: ${i.name}`} onClick={()=>choose(i.id)} disabled={busy}><img src={i.asset} alt="" loading="lazy" style={{filter:rugFilter(i)}}/><span><strong>{i.name}</strong><span className="room-card-size">{i.w} × {i.h} {i.mount==='wall'?'на стене':'клетки'}</span><b>{owned.includes(i.id)?placements.some(p=>p.itemId===i.id)?'В комнате':'В коллекции':<><Coins size={13}/>{i.cost}</>}</b></span></button>)}</div>{catalogItems.length===0&&<p className="room-search-empty">Ничего не найдено. Попробуй другое слово.</p>}
     </>}
    </aside>)}
     {paletteOpen&&<section className="room-palette-popover" aria-label="Оформление комнаты"><GameButton size="icon" className="room-palette-close" aria-label="Закрыть оформление" onClick={()=>setPaletteOpen(false)}><X size={18}/></GameButton>      <div className="room-rug-colors"><strong>Цвет ковров <small>бесплатно</small></strong><p>{placements.some(p=>ROOM_ITEMS.find(i=>i.id===p.itemId)?.recolorable)?'Меняет все ковры в комнате. Узор и фактура сохраняются.':'Ковры пока в коллекции: выбери цвет, затем поставь ковёр в комнату.'}</p><div className="room-palettes" role="group" aria-label="Цвет ковров">{ROOM_PALETTES.map(p=><button key={p.id} type="button" disabled={busy} aria-label={p.name} title={p.name} aria-pressed={palette===p.id} style={{'--room-swatch':p.color} as React.CSSProperties} onClick={()=>{setPalette(p.id);setDirty(true);say(`Ковры перекрашены: ${p.name.toLocaleLowerCase('ru')}. Сохраним новый цвет?`);}}>{palette===p.id&&<Check size={17}/>}</button>)}</div></div></section>}
     <p className="room-instruction">{!clean?'Нажми на вещи с искрой, чтобы навести порядок.':editing?ghost?item?.mount==='wall'?'Выбери левую или правую стену и коснись места для предмета.':pinned?'Место выбрано. Поверни предмет или подтверди установку.':'Веди мышь по полу, затем нажми, чтобы выбрать место. На телефоне просто коснись клетки.':'Выбери предмет. Сетка покажет свободное место и занятые клетки.':'Нажми на свободную клетку — герой подойдёт к ней.'}</p>
     {error&&<p className="room-error" role="alert">{error}</p>}{message&&<p className="room-message" role="status">{message}</p>}
    </section>

   </div>
  </div>
 </GameDialog>;
}
