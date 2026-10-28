export const CHARACTER_PARTS = {
 hair: [{id:'short',name:'Короткая'},{id:'spikes',name:'Шипы'},{id:'sweep',name:'Набок'},{id:'curls',name:'Кудри'},{id:'undercut',name:'Андеркат'},{id:'long',name:'Длинные волосы'},{id:'bob',name:'Каре'},{id:'ponytail',name:'Высокий хвост'},{id:'braid',name:'Коса'}],
 outfit: [{id:'cyan',name:'Бирюзовая куртка'},{id:'violet',name:'Фиолетовая куртка'},{id:'orange',name:'Оранжевая куртка'},{id:'mint',name:'Мятная куртка'},{id:'rose',name:'Розовая куртка'},{id:'silver',name:'Серебристая куртка'},{id:'skirt_suit',name:'Куртка и юбка'},{id:'dress',name:'Неоновое платье'},{id:'long_hoodie',name:'Длинное худи'}],
 accessory: [{id:'none',name:'Без аксессуара'},{id:'visor',name:'Неоновый визор'},{id:'headphones',name:'Наушники'},{id:'glasses',name:'Очки'},{id:'cap',name:'Кепка'},{id:'scarf',name:'Шарф'}],
 emotion: [{id:'calm',name:'Спокойный'},{id:'happy',name:'Радостный'},{id:'wink',name:'Подмигивает'},{id:'focused',name:'Сосредоточен'}],
 animation: [{id:'idle',name:'Спокойная стойка'},{id:'wave',name:'Приветствие'},{id:'bounce',name:'Энергичная стойка'},{id:'focus',name:'Задумчивая стойка'}],
 hairColor: [{id:'navy',name:'Тёмные'},{id:'violet',name:'Фиолетовые'},{id:'copper',name:'Медные'},{id:'silver',name:'Светлые'}],
 skinTone: [{id:'warm',name:'Тёплый'},{id:'light',name:'Светлый'},{id:'tan',name:'Загорелый'},{id:'deep',name:'Тёмный'}],
 emblem: [{id:'bolt',name:'Молния'},{id:'star',name:'Звезда'},{id:'code',name:'Код'},{id:'planet',name:'Планета'}],
};
export const DEFAULT_PARTS = {hair:'short',outfit:'cyan',accessory:'visor',emotion:'calm',animation:'idle',hairColor:'navy',skinTone:'warm',emblem:'bolt'};
export function changeCharacterLook(user,operation,data) {
 const next=structuredClone(user);
 next.characterLooks ||= [];
 if(operation==='saveCharacterLook') {
  if(next.characterLooks.length>=10)throw new Error('Можно сохранить до 10 образов');
  const name=typeof data.name==='string'?data.name.trim():'';
  if(!name||name.length>30)throw new Error('Название: от 1 до 30 символов');
  const avatar=data.avatar;
  if(!next.inventory?.includes(avatar))throw new Error('Персонаж не принадлежит тебе');
  if(avatar!=='av_1')throw new Error('Редактор элементов доступен для Ориона');
  const parts={};
  for(const [key,items] of Object.entries(CHARACTER_PARTS)) {
   const value=data.parts?.[key] ?? DEFAULT_PARTS[key];
   if(!items.some(item=>item.id===value))throw new Error('Неизвестный элемент внешности');
   parts[key]=value;
  }
  const frame=data.frame || 'frame_none';
  if(!next.inventory.includes(frame)||!/^frame_(none|\d+)$/.test(frame))throw new Error('Рамка не принадлежит тебе');
  next.characterLooks.push({id:`look_${globalThis.crypto.randomUUID()}`,name,avatar,frame,parts});
 } else {
  const look=next.characterLooks.find(item=>item.id===data.lookId);
  if(!look)throw new Error('Образ не найден');
  if(operation==='deleteCharacterLook') next.characterLooks=next.characterLooks.filter(item=>item.id!==look.id);
  else if(operation==='equipCharacterLook') {
   if(!next.inventory?.includes(look.avatar)||!next.inventory.includes(look.frame))throw new Error('Предметы образа не принадлежат тебе');
   for(const [key,items] of Object.entries(CHARACTER_PARTS))if(!items.some(item=>item.id===(look.parts?.[key] ?? DEFAULT_PARTS[key])))throw new Error('Образ содержит неизвестный элемент');
   next.equipped={...next.equipped,avatar:look.avatar,avatarFrame:look.frame,characterParts:look.parts};
  }else throw new Error('Неизвестная операция');
 }
 return next;
}
