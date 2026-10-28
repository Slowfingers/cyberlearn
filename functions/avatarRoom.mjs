// Shared authoritative room rules. Prices, ownership and floor bounds never come from clients.
export const ROOM_SIZE=8;
export const ROOM_WALL_ROWS=3;
export const ROOM_PALETTES=[{id:'aqua',name:'Ледяная бирюза',color:'#5ce8f5',fabricColor:'#2dc2db'},{id:'lavender',name:'Лавандовый вечер',color:'#b8a0ff',fabricColor:'#9460e8'},{id:'rose',name:'Розовый рассвет',color:'#f5a4d1',fabricColor:'#f16ca8'},{id:'amber',name:'Тёплый янтарь',color:'#ffc378',fabricColor:'#f4b14f'}];
export const ROOM_ENTRY={x:3,y:7};
export const ROOM_ITEMS=[
 {id:'room_bed',name:'Кровать «Облако»',category:'Мебель',cost:0,w:2,h:3,solid:true,width:440,description:'Мягкое изголовье и уютный бирюзовый плед.'},
 {id:'room_rug',recolorable:true,name:'Ковёр «Созвездие»',category:'Декор',cost:0,w:3,h:3,solid:false,width:528,description:'Мягкий ковёр с геометрическим узором.'},
 {id:'room_desk',name:'Стол исследователя',category:'Мебель',cost:140,w:1,h:2,solid:true,width:264,description:'Рабочее место с голографическим монитором.'},
 {id:'room_chair',name:'Кресло «Пауза»',category:'Мебель',cost:85,w:1,h:1,solid:true,width:176,description:'Уютное кресло с мягкой лавандовой подушкой.'},
 {id:'room_bookcase',name:'Стеллаж открытий',category:'Мебель',cost:120,w:1,h:2,solid:true,width:264,description:'Книги, любимые находки и тёплая подсветка.'},
 {id:'room_plant',name:'Зелёный друг',category:'Декор',cost:45,w:1,h:1,solid:true,width:145,description:'Живое растение в светлом керамическом кашпо.'},
 {id:'room_lamp',name:'Светильник «Тепло»',category:'Свет',cost:65,w:1,h:1,solid:true,width:125,description:'Мягкий янтарный свет для спокойного вечера.'},
 {id:'room_sofa',name:'Диван «Выходной»',category:'Мебель',cost:180,w:2,h:1,solid:true,width:264,height:240,description:'Два мягких места, подушки и плед.'},
 {id:'room_dresser',name:'Комод «Порядок»',category:'Мебель',cost:110,w:2,h:1,solid:true,width:264,height:225,description:'Для любимых вещей и маленьких секретов.'},
 {id:'room_coffee_table',name:'Столик «История»',category:'Мебель',cost:60,w:1,h:1,solid:true,width:172,height:125,description:'Книга, какао и немного отдыха.'},
 {id:'room_round_rug',recolorable:true,name:'Ковёр «Орбита»',category:'Декор',cost:55,w:2,h:2,solid:false,width:344,height:144,description:'Круглый мягкий ковёр с узором орбит. Цвет выбираешь ты.'},
 {id:'room_plush_cat',name:'Кот «Муркод»',category:'Декор',cost:40,w:1,h:1,solid:true,width:135,height:155,description:'Мягкий талисман для твоей комнаты.'},
 {id:'room_aquarium',name:'Аквариум «Океан»',category:'Декор',cost:130,w:1,h:1,solid:true,width:172,height:235,description:'Свой маленький подводный мир.'},
 {id:'room_orb_lamp',name:'Светильник «Луна»',category:'Свет',cost:75,w:1,h:1,solid:true,width:125,height:270,description:'Мягкая светящаяся сфера на тонкой ножке.'},
 {id:'room_neon_arch',name:'Неоновая арка',category:'Свет',cost:150,w:2,h:1,solid:true,width:264,height:290,description:'Бирюзовый и лавандовый свет для уютного уголка.'},
 {id:'room_star_lamp',name:'Ночник «Космос»',category:'Свет',cost:50,w:1,h:1,solid:true,width:125,height:175,description:'Тёплый свет маленьких созвездий.'},
 {id:'room_wardrobe',name:'Шкаф «Гардероб»',category:'Мебель',cost:160,w:2,h:1,solid:true,width:264,height:360,description:'Вместительный шкаф для всех любимых образов.'},
 {id:'room_bunk_bed',name:'Кровать «Два этажа»',category:'Мебель',cost:240,w:2,h:3,solid:true,width:440,height:450,description:'Два уютных этажа, лестница и мягкие пледы.'},
 {id:'room_beanbag',name:'Кресло-мешок «Чилл»',category:'Мебель',cost:70,w:1,h:1,solid:true,width:172,height:165,description:'Мягкое место для отдыха после открытий.'},
 {id:'room_vanity',name:'Столик «Отражение»',category:'Мебель',cost:150,w:1,h:2,solid:true,width:264,height:300,description:'Овальное зеркало и ящики для мелочей.'},
 {id:'room_display_shelf',name:'Стеллаж «Коллекция»',category:'Мебель',cost:120,w:2,h:1,solid:true,width:264,height:245,description:'Книги, модель планеты и любимая ракета.'},
 {id:'room_piano',name:'Пианино «Синтез»',category:'Мебель',cost:220,w:2,h:1,solid:true,width:264,height:250,description:'Цифровое пианино для музыкального уголка.'},
 {id:'room_globe',name:'Глобус «Новый мир»',category:'Декор',cost:65,w:1,h:1,solid:true,width:125,height:180,description:'Маленькая планета в изящной орбитальной рамке.'},
 {id:'room_indoor_tree',name:'Дерево «Оазис»',category:'Декор',cost:95,w:1,h:1,solid:true,width:172,height:300,description:'Зелёный уголок в светлом керамическом кашпо.'},
 {id:'room_art_easel',name:'Мольберт «Космос»',category:'Декор',cost:80,w:1,h:1,solid:true,width:145,height:245,description:'Яркая картина с ракетой и далёкими планетами.'},
 {id:'room_runner_rug',name:'Ковёр «Звёздная дорожка»',category:'Декор',cost:60,w:1,h:3,solid:false,recolorable:true,width:340,height:144,description:'Длинная мягкая дорожка с вышитыми звёздами.'},
 {id:'room_lava_lamp',name:'Лава-лампа «Поток»',category:'Свет',cost:85,w:1,h:1,solid:true,width:105,height:215,description:'Лавандовые и бирюзовые огоньки под стеклом.'},
 {id:'room_floor_lantern',name:'Фонарь «Тихий вечер»',category:'Свет',cost:75,w:1,h:1,solid:true,width:125,height:210,description:'Тёплый свет за деревянными рейками.'},
 {id:'room_gaming_chair',name:'Кресло «Следующий уровень»',category:'Мебель',cost:120,w:1,h:1,solid:true,width:165,height:255,description:'Мягкое игровое кресло с лавандовыми подушками.'},
 {id:'room_snack_cabinet',name:'Шкафчик «Какао»',category:'Мебель',cost:90,w:1,h:1,solid:true,width:170,height:230,description:'Кружки, маленький чайник и запас уюта.'},
 {id:'room_craft_desk',name:'Верстак изобретателя',category:'Мебель',cost:180,w:2,h:1,solid:true,width:265,height:250,description:'Место для моделей, творчества и маленьких роботов.'},
 {id:'room_terrarium',name:'Террариум «Микромир»',category:'Декор',cost:85,w:1,h:1,solid:true,width:145,height:220,description:'Мох, папоротники и светящийся кристалл под стеклом.'},
 {id:'room_robot_pet',name:'Робопёс «Пик»',category:'Декор',cost:70,w:1,h:1,solid:true,width:135,height:155,description:'Маленький дружелюбный сосед с бирюзовыми глазами.'},
 {id:'room_cloud_lamp',name:'Светильник «Облачко»',category:'Свет',cost:80,w:1,h:1,solid:true,width:135,height:270,description:'Светящееся облачко и две тёплые звёздочки.'},
 {id:'room_poster_cosmos',mount:'wall',name:'Постер «Поехали!»',category:'На стену',cost:20,w:2,h:2,solid:false,width:180,height:225,description:'Ракета, кольца планеты и новые открытия.'},
 {id:'room_poster_cat',mount:'wall',name:'Постер «Кот в эфире»',category:'На стену',cost:25,w:2,h:2,solid:false,width:180,height:225,description:'Киберкот в наушниках, который знает хороший трек.'},
 {id:'room_poster_wave',mount:'wall',name:'Постер «Лунная волна»',category:'На стену',cost:30,w:2,h:2,solid:false,width:180,height:225,description:'Бирюзовый океан под лавандовой луной.'},
 {id:'room_poster_garden',mount:'wall',name:'Постер «Тайный сад»',category:'На стену',cost:25,w:2,h:2,solid:false,width:180,height:225,description:'Зелёные листья и светящиеся бабочки.'},
 {id:'room_wall_clock',mount:'wall',name:'Часы «Моя орбита»',category:'На стену',cost:40,w:1,h:1,solid:false,width:120,height:120,description:'Тихие часы с неоновыми отметками.'},
 {id:'room_wall_neon',mount:'wall',name:'Неон «Заряд идей»',category:'На стену',cost:50,w:2,h:2,solid:false,width:180,height:120,description:'Светящаяся молния в бирюзово-лавандовой орбите.'},
].map(item=>({...item,asset:`/art/avatar-room/${item.id.replace('room_','')}-v1.webp`}));
export const ROOM_CLUTTER=[
 {id:'boxes',name:'Разобрать коробки',asset:'mess_boxes',x:1,y:2,line:'Коробки разобраны! Оставим только нужное.'},
 {id:'clothes',name:'Сложить одежду',asset:'mess_clothes',x:2,y:4,line:'Вещи на месте. Уже гораздо уютнее!'},
 {id:'papers',name:'Собрать тетради',asset:'mess_papers',x:4,y:5,line:'Тетради собраны — ни одна идея не потеряется.'},
 {id:'cables',name:'Распутать провода',asset:'mess_boxes',x:5,y:3,line:'Провода больше не путаются под ногами.'},
 {id:'books',name:'Разложить книги',asset:'mess_papers',x:6,y:5,line:'Книги в порядке. Можно выбрать любимую!'},
 {id:'textiles',name:'Убрать вещи с пола',asset:'mess_clothes',x:1,y:6,line:'Последние вещи убраны. Теперь это наш уютный уголок!'},
];
export const roomIsClean=room=>ROOM_CLUTTER.every(spot=>room.cleared?.includes(spot.id));
const defaults=[{itemId:'room_bed',x:5,y:0,rotation:0},{itemId:'room_rug',x:3,y:3,rotation:0}];
export function roomSnapshot(user){
 const room=user?.avatarRoom;
 return {cleared:ROOM_CLUTTER.filter(spot=>Array.isArray(room?.cleared)&&room.cleared.includes(spot.id)).map(spot=>spot.id),palette:ROOM_PALETTES.some(p=>p.id===room?.palette)?room.palette:'aqua',owned:[...new Set(['room_bed','room_rug',...(Array.isArray(room?.owned)?room.owned.filter(id=>ROOM_ITEMS.some(item=>item.id===id)):[])])],placements:structuredClone(Array.isArray(room?.placements)?room.placements:defaults),revision:Number.isSafeInteger(room?.revision)&&room.revision>=0?room.revision:0};
}
export function roomFootprint(p){const item=ROOM_ITEMS.find(i=>i.id===p.itemId);if(!item)return null;return{w:p.rotation===1?item.h:item.w,h:p.rotation===1?item.w:item.h};}
export function roomCells(p){if(ROOM_ITEMS.find(i=>i.id===p.itemId)?.mount==='wall')return[];const size=roomFootprint(p);if(!size)return[];return Array.from({length:size.w*size.h},(_,i)=>({x:p.x+i%size.w,y:p.y+Math.floor(i/size.w)}));}
export function roomWallCells(p){const item=ROOM_ITEMS.find(i=>i.id===p.itemId);if(item?.mount!=='wall')return[];return Array.from({length:item.w*item.h},(_,i)=>({x:p.x+i%item.w,y:p.y+Math.floor(i/item.w)}));}
export function validateRoomPlacement(p,placements,owned){
 const item=ROOM_ITEMS.find(i=>i.id===p?.itemId);
 if(!item||!owned.includes(item.id))throw new Error('Этого предмета нет в твоей коллекции.');
 if(item.mount==='wall'){
  if(!['left','right'].includes(p.wall)||p.rotation!==0||![p.x,p.y].every(Number.isInteger))throw new Error('Выбери место на левой или правой стене.');
  const cells=roomWallCells(p);
  if(cells.some(c=>c.x<0||c.x>=ROOM_SIZE||c.y<0||c.y>=ROOM_WALL_ROWS))throw new Error('Предмет выходит за границы стены.');
  const blocked=new Set(placements.filter(q=>q.itemId!==p.itemId&&q.wall===p.wall).flatMap(roomWallCells).map(c=>`${c.x},${c.y}`));
  if(cells.some(c=>blocked.has(`${c.x},${c.y}`)))throw new Error('На этом месте уже висит предмет. Выбери свободное место.');
  return true;
 }
 if(p.wall!==undefined)throw new Error('Этот предмет ставится на пол.');
 if(![p.x,p.y].every(Number.isInteger)||![0,1].includes(p.rotation))throw new Error('Выбери клетку на полу комнаты.');
 const cells=roomCells(p);
 if(cells.some(c=>c.x<0||c.y<0||c.x>=ROOM_SIZE||c.y>=ROOM_SIZE))throw new Error('Предмет выходит за границы комнаты.');
 if(item.solid&&cells.some(c=>c.x===ROOM_ENTRY.x&&c.y===ROOM_ENTRY.y))throw new Error('Оставь свободным вход в комнату.');
 if(item.solid){const blocked=new Set(placements.filter(q=>q.itemId!==p.itemId&&ROOM_ITEMS.find(i=>i.id===q.itemId)?.solid).flatMap(roomCells).map(c=>`${c.x},${c.y}`));if(cells.some(c=>blocked.has(`${c.x},${c.y}`)))throw new Error('Здесь уже стоит мебель. Выбери свободное место.');}
 return true;
}
export function updateAvatarRoom(user,operation,data){
 if(user.role!=='student')throw new Error('Комната доступна в аккаунте ученика.');
 const next=structuredClone(user),room=roomSnapshot(user);next.avatarRoom=room;
 if(operation==='cleanRoomSpot'){
  const spot=ROOM_CLUTTER.find(spot=>spot.id===data.spotId);
  if(!spot)throw new Error('Выбери вещи, которые нужно разобрать.');
  if(!room.cleared.includes(spot.id))room.cleared.push(spot.id);
  return next;
 }
 if(!roomIsClean(room))throw new Error('Сначала разберём вещи в комнате, а потом займёмся обустройством.');
 if(operation==='buyRoomItem'){
  const item=ROOM_ITEMS.find(i=>i.id===data.itemId);if(!item)throw new Error('Предмет не найден.');
  if(room.owned.includes(item.id))return next;
  if(!Number.isFinite(next.currency)||next.currency<item.cost)throw new Error('Пока не хватает монет.');
  next.currency-=item.cost;room.owned.push(item.id);return next;
 }
 if(operation!=='saveRoomLayout')throw new Error('Неизвестное действие с комнатой.');
 if(!Number.isSafeInteger(data.revision)||data.revision!==room.revision)throw new Error('Комната уже изменена в другом окне. Открой её заново перед сохранением.');
 if(!Array.isArray(data.placements)||data.placements.length>ROOM_ITEMS.length)throw new Error('Неверная расстановка.');
 const placements=data.placements.map(p=>({itemId:p?.itemId,x:p?.x,y:p?.y,rotation:p?.rotation,...(p?.wall===undefined?{}:{wall:p.wall})}));
 if(new Set(placements.map(p=>p.itemId)).size!==placements.length)throw new Error('Один предмет нельзя поставить дважды.');
 for(const p of placements)validateRoomPlacement(p,placements,room.owned);
 if(data.palette!==undefined&&!ROOM_PALETTES.some(p=>p.id===data.palette))throw new Error('Выбери доступную подсветку.');
 room.palette=data.palette??room.palette;room.placements=placements;room.revision++;return next;
}
export function roomWalkingPath(start,target,placements){
 const blocked=new Set(placements.filter(p=>ROOM_ITEMS.find(i=>i.id===p.itemId)?.solid).flatMap(roomCells).map(c=>`${c.x},${c.y}`));
 const key=p=>`${p.x},${p.y}`;
 if(![target.x,target.y].every(Number.isInteger)||target.x<0||target.y<0||target.x>=ROOM_SIZE||target.y>=ROOM_SIZE||blocked.has(key(target)))return[];
 const queue=[[start]],seen=new Set([key(start)]);
 for(let i=0;i<queue.length;i++){
  const path=queue[i],p=path.at(-1);if(key(p)===key(target))return path;
  for(const next of [{x:p.x+1,y:p.y},{x:p.x-1,y:p.y},{x:p.x,y:p.y+1},{x:p.x,y:p.y-1}])if(next.x>=0&&next.y>=0&&next.x<ROOM_SIZE&&next.y<ROOM_SIZE&&!blocked.has(key(next))&&!seen.has(key(next))){seen.add(key(next));queue.push([...path,next]);}
 }
 return[];
}
