import assert from 'node:assert/strict';
import React from 'react';
import {renderToStaticMarkup} from 'react-dom/server';
import {ModularCharacter} from '../components/ModularCharacter';
import {PlayerAvatar} from '../components/PlayerAvatar';
import {CHARACTER_PARTS,DEFAULT_PARTS} from '../functions/characterLooks.mjs';
import {COSMETICS} from '../constants';
import type {CharacterParts} from '../types';
const seen=new Set<string>();
for(const hair of CHARACTER_PARTS.hair)for(const outfit of CHARACTER_PARTS.outfit)for(const accessory of CHARACTER_PARTS.accessory)for(const emotion of CHARACTER_PARTS.emotion)for(const animation of CHARACTER_PARTS.animation){
 const parts={hair:hair.id,outfit:outfit.id,accessory:accessory.id,emotion:emotion.id,animation:animation.id} as CharacterParts;
 const svg=renderToStaticMarkup(<ModularCharacter parts={parts} stage/>);
 const ids=[...svg.matchAll(/\bid="([^"]+)"/g)].map(m=>m[1]);
 assert.equal(ids.length,new Set(ids).size,'unique paint IDs');
 for(const ref of svg.matchAll(/url\(#([^)]+)\)/g))assert.ok(ids.includes(ref[1]),'gradient and mask references resolve');
 assert.ok(!seen.has(svg),'every saved part combination remains distinct');seen.add(svg);
}
const walk=renderToStaticMarkup(<PlayerAvatar user={{equipped:{avatar:'av_1',droneColor:'col_default',characterParts:DEFAULT_PARTS}}} stage motion="walk"/>);
assert.match(walk,/data-motion="walk"/);assert.match(walk,/character-leg--near/);assert.match(walk,/character-arm--far/);
console.log(`playerCharacter: ${seen.size} saved looks remain distinct; layered paints, rig and equipped player identity OK`);

for(const avatar of COSMETICS.filter(item=>item.type==='avatar'))for(const motion of ['idle','walk','jump','success','retry','thinking','speaking','wave'] as const){
 const markup=renderToStaticMarkup(<PlayerAvatar user={{equipped:{avatar:avatar.id,droneColor:'col_default'}}} stage motion={motion}/>);
 if(motion==='walk'){assert.match(markup,/character-leg--near/,`${avatar.id}: near leg is articulated`);assert.match(markup,/character-leg--far/,`${avatar.id}: far leg is articulated`);}
 assert.ok(markup.includes(`data-motion="${motion}"`),`${avatar.id}: ${motion} reaction is available`);
}
for(const key of ['hairColor','skinTone','emblem'] as const){
 const variants=CHARACTER_PARTS[key].map(item=>renderToStaticMarkup(<ModularCharacter parts={{...DEFAULT_PARTS,[key]:item.id}} stage/>));
 assert.equal(new Set(variants).size,CHARACTER_PARTS[key].length,`${key}: all new options are distinct`);
}
console.log('playerCharacter: every catalog avatar supports eight situational states; new Orion color and emblem options render distinctly');
