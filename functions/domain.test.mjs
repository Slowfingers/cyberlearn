import { test } from 'node:test';
import assert from 'node:assert/strict';
import { completeTask, buyCosmetic } from './domain.mjs';
test('retrying a committed completion never doubles its reward or erases a purchase', () => {
 const user = {xp:0,currency:100,level:1,inventory:[],equipped:{},achievements:[],suspiciousActivity:{totalTabSwitches:9}};
 const task = {id:'one',type:'quiz',courseId:'course_grade3',xpReward:50,currencyReward:20};
 const catalog = {tasks:[task],levels:[0,100],achievements:[{id:'ach_1'}]};
 const first = completeTask(user,task,0,catalog).user;
 const bought = buyCosmetic(first,{id:'av_1',type:'avatar',cost:10,unlockLevel:1});
 const retry = completeTask(bought,task,0,catalog);
 assert.equal(retry.awarded,false); assert.equal(retry.user.currency,110);
 assert.deepEqual(retry.user.inventory,['av_1']); assert.equal(retry.user.suspiciousActivity.totalTabSwitches,9);
});
