import assert from 'node:assert/strict';
import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { COSMETICS } from '../constants';
import ShopAvatar from '../components/ShopAvatar';

const avatars = COSMETICS.filter(item => item.type === 'avatar');
const frames = COSMETICS.filter(item => item.type === 'avatarFrame');
assert.equal(avatars.length, 24);
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
console.log('cosmetics.check: 24 avatars × 13 frame states, legacy ownership IDs and unique SVG references OK');
