import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { BigCharacter3D, resolveMentorSkin } from '../components/BigCharacter3D';
import { COSMETICS, SHOP_COSMETICS } from '../constants';
import ShopAvatar, { AVATAR_NAMES, STREET_AVATARS } from '../components/ShopAvatar';
import { SPRITE_SILHOUETTES } from '../components/spriteSilhouettes';

const avatars = COSMETICS.filter(item => item.type === 'avatar');
for (const avatar of STREET_AVATARS) {
    const png = readFileSync(new URL('../public/avatar/street/' + avatar.value.replace('street_', '') + '.png', import.meta.url));
    assert.equal(png.toString('hex', 0, 8), '89504e470d0a1a0a');
    assert.equal(png.readUInt32BE(16), png.readUInt32BE(20) * 3, 'Six portrait cells need a 3:1 strip');
}
const frames = COSMETICS.filter(item => item.type === 'avatarFrame');
assert.equal(avatars.length, AVATAR_NAMES.length + STREET_AVATARS.length);
assert.equal(frames.length, 13);
assert.equal(new Set(COSMETICS.map(item => item.id)).size, COSMETICS.length);
for (let i = 1; i <= 11; i++) assert.ok(avatars.some(item => item.id === `av_${i}`));
for (const item of COSMETICS) {
    assert.ok(item.cost >= 0 && Number.isInteger(item.cost));
    assert.ok(item.unlockLevel >= 1 && item.unlockLevel <= 12);
}
for (const avatar of avatars) {
    for (const frame of frames) {
        const html = renderToStaticMarkup(React.createElement(ShopAvatar, { avatarId: avatar.value, frameId: frame.id }));
        assert.ok(html.includes(avatar.name));
        assert.ok(!/NaN|undefined|<canvas|\/avatars\//.test(html));
        const ids = [...html.matchAll(/ id="([^"]+)"/g)].map(match => match[1]);
        for (const match of html.matchAll(/url\(#([^)]+)\)/g)) assert.ok(ids.includes(match[1]));
    }
}
const pair = renderToStaticMarkup(React.createElement('div', null,
    React.createElement(ShopAvatar, { avatarId: '2' }), React.createElement(ShopAvatar, { avatarId: '2' })));
const ids = [...pair.matchAll(/ id="([^"]+)"/g)].map(match => match[1]);
assert.equal(new Set(ids).size, ids.length);
console.log(`cosmetics.check: ${avatars.length} avatars × 13 frame states, legacy ownership IDs and unique SVG references OK`);

assert.equal(SHOP_COSMETICS.filter(item => item.type === 'avatar').length, 10);
assert.ok(SHOP_COSMETICS.filter(item => item.type === 'avatar').every(item => item.value.startsWith('street_')));
for (const mentor of COSMETICS.filter(item => item.type === 'mascotSkin')) {
    const png = readFileSync(new URL('../public/avatar/mentors/' + mentor.value + '.png', import.meta.url));
    assert.equal(png.readUInt32BE(16), png.readUInt32BE(20) * 3);
    assert.equal(resolveMentorSkin(mentor.id), mentor.value);
    const html = renderToStaticMarkup(React.createElement(BigCharacter3D, { skin: mentor.id }));
    assert.ok(html.includes(mentor.name));
    assert.ok(html.includes('/avatar/mentors/' + mentor.value + '.png'));
}
assert.equal(resolveMentorSkin('unknown'), 'sparky');
console.log('Shop hides retired portraits; all four mentor IDs resolve to valid sprite assets.');

for (const [skin, sets] of Object.entries(SPRITE_SILHOUETTES)) {
    assert.equal(sets.idle.paths.length, 6, `${skin}: all idle frames must be masked`);
    for (const path of sets.idle.paths) assert.ok(path.startsWith('M') && !/NaN|undefined/.test(path));
    if ('movement' in sets) {
        assert.equal(sets.movement.paths.length, 12, `${skin}: both reaction rows must be masked`);
        for (const mood of ['celebrate', 'thinking'] as const) {
            const markup = renderToStaticMarkup(React.createElement(BigCharacter3D, { skin, mood }));
            const clip = markup.match(/clip-path="url\(#([^)]*)\)"/);
            assert.ok(clip && markup.includes(`id="${clip[1]}"`), `${skin} ${mood}: clipping reference must resolve`);
        }
    }
}
console.log('All 14 sprite sets have per-frame silhouette clips, including both mentor reaction rows.');

const isolatedStrip = renderToStaticMarkup(React.createElement(ShopAvatar, { avatarId: 'street_nova', fullBody: true }));
assert.equal((isolatedStrip.match(/<image /g) || []).length, 6, 'Every frame needs its own isolated viewport');
assert.ok(/<rect width="362" height="724"/.test(isolatedStrip), 'A fixed clip must bound the animated strip');
assert.ok(/<g clip-path="url\(#[^)]*-viewport\)"><g class="street-avatar-strip"/.test(isolatedStrip), 'The viewport stays outside the animated group');
console.log('Sprite viewport remains fixed while six separately masked cells move inside it.');
