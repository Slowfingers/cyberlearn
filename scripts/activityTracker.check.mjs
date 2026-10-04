import { build } from 'esbuild';
import { mkdtemp, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import assert from 'node:assert/strict';
const directory = await mkdtemp(join(tmpdir(),'cyberlearn-tracker-'));
try {
 const outfile = join(directory,'tracker.mjs');
 await build({entryPoints:['utils/activityTracker.ts'],bundle:true,platform:'node',format:'esm',outfile,plugins:[{
   name:'mock-tracking-server', setup(build) {
     build.onResolve({filter:/services\/firebase$/},() => ({path:'firebase',namespace:'test'}));
     build.onLoad({filter:/.*/,namespace:'test'},() => ({contents:'export const fbRecordAttempt = async attempt => { globalThis.savedAttempt = attempt; await globalThis.trackingGate; }; export const fbIncrementSwitches = async () => {};'}));
   },
 }]});
 const tracker = await import(pathToFileURL(outfile));
 let finish;
 globalThis.trackingGate = new Promise(resolve => {finish=resolve;});
 globalThis.document = {addEventListener(){},removeEventListener(){}};
 globalThis.window = {addEventListener(){},removeEventListener(){}};
 tracker.initActivityTracking('s_1');
 tracker.startTaskAttempt('old','s_1');
 tracker.recordError();
 const previous = tracker.endTaskAttempt('s_1',false);
 tracker.startTaskAttempt('new','s_1');
 finish(); await previous;
 assert.equal(tracker.getCurrentAttempt().taskId,'new');
 assert.equal(globalThis.savedAttempt.taskId,'old');
 assert.equal(globalThis.savedAttempt.errors,1);
 tracker.cleanupTracker();
 assert.equal(tracker.getCurrentAttempt(),null);
 console.log('activityTracker.check: finishing an old attempt preserves the next attempt');
} finally { await rm(directory,{recursive:true,force:true}); }
