import assert from 'node:assert/strict';
import { changeCharacterLook, DEFAULT_PARTS, CHARACTER_PARTS } from '../functions/characterLooks.mjs';
const user={inventory:['av_1','frame_none'],currency:12,xp:42,equipped:{avatar:'av_1'},characterLooks:[]};
const data={name:'Исследователь',avatar:'av_1',frame:'frame_none',parts:DEFAULT_PARTS};
const saved=changeCharacterLook(user,'saveCharacterLook',data);
assert.equal(user.characterLooks.length,0);assert.equal(saved.characterLooks.length,1);assert.equal(saved.equipped.characterParts,undefined);
const worn=changeCharacterLook(saved,'equipCharacterLook',{lookId:saved.characterLooks[0].id});
assert.deepEqual(worn.equipped.characterParts,DEFAULT_PARTS);assert.equal(worn.currency,12);assert.equal(worn.xp,42);
assert.throws(()=>changeCharacterLook(user,'saveCharacterLook',{...data,avatar:'av_11'}));
assert.throws(()=>changeCharacterLook(user,'saveCharacterLook',{...data,frame:'frame_1'}));
assert.throws(()=>changeCharacterLook(user,'saveCharacterLook',{...data,parts:{...DEFAULT_PARTS,hair:'fake'}}));
assert.throws(()=>changeCharacterLook(user,'equipCharacterLook',{lookId:saved.characterLooks[0].id}));
const removed=changeCharacterLook(worn,'deleteCharacterLook',{lookId:saved.characterLooks[0].id});
assert.equal(removed.characterLooks.length,0);assert.deepEqual(removed.equipped,worn.equipped);
let many=user;for(let i=0;i<10;i++)many=changeCharacterLook(many,'saveCharacterLook',data);
assert.throws(()=>changeCharacterLook(many,'saveCharacterLook',data));
console.log('characterLooks: preview/save/equip separation, ownership, validation, limits, no XP/currency effects OK');

const broke={...user,currency:0};
for(const [key,items] of Object.entries(CHARACTER_PARTS))for(const item of items){
 const custom=changeCharacterLook(broke,'saveCharacterLook',{...data,parts:{...DEFAULT_PARTS,[key]:item.id}});
 const equipped=changeCharacterLook(custom,'equipCharacterLook',{lookId:custom.characterLooks[0].id});
 assert.equal(equipped.currency,0,'all Orion options work with zero coins');
 assert.equal(equipped.equipped.characterParts[key],item.id);
}
const legacy={hair:'short',outfit:'cyan',accessory:'visor',emotion:'calm',animation:'idle'};
assert.doesNotThrow(()=>changeCharacterLook(user,'saveCharacterLook',{...data,parts:legacy}));
console.log('Orion: all free options work at zero coins; legacy saved parts remain compatible');
