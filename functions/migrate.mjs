/** Administrative offline migration. Preview by default; never sends credentials to the client. */
import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { writeFile } from 'node:fs/promises';
import { credentialKey, hashPassword } from './credentials.mjs';
initializeApp({credential:applicationDefault(),databaseURL:'https://cyberlearn-12348-default-rtdb.europe-west1.firebasedatabase.app'});
const db = getDatabase();
const users = (await db.ref('users').get()).val() || {};
const credentials = (await db.ref('credentials').get()).val() || {};
const classes = Object.values((await db.ref('classrooms').get()).val() || {});
const backupUsers = structuredClone(users);
const classIds = new Set(), codes = new Set();
for (const cls of classes) {
  if (!cls.id || classIds.has(cls.id) || typeof cls.inviteCode !== 'string' || codes.has(cls.inviteCode.toUpperCase())) throw new Error('Duplicate/missing classroom ID or invite code; resolve before migration');
  classIds.add(cls.id); codes.add(cls.inviteCode.toUpperCase());
}
const updates = {}, names = new Set(), ids = new Set();
let teachers = 0, students = 0;
for (const [key,user] of Object.entries(users)) {
  if (!user.id || ids.has(user.id) || !['teacher','student'].includes(user.role)) throw new Error('Duplicate/missing user ID or invalid role; resolve before migration');
  ids.add(user.id);
  // Repair historical students linked only through studentIds, preserving all owned IDs.
  if (user.role === 'student' && !user.classId) {
    const matches = classes.filter(c => c.studentIds?.includes(user.id));
    if (matches.length !== 1) throw new Error(`Cannot resolve class for ${user.id}`);
    user.classId = matches[0].id;
    updates[`users/${key}/classId`] = user.classId;
  }
  const loginKey = credentialKey(user.role,user.name,user.role === 'student' ? user.classId : '');
  if (names.has(loginKey)) throw new Error('Duplicate normalized account name; resolve before migration');
  names.add(loginKey);
  if (credentials[loginKey] && credentials[loginKey].uid !== user.id) throw new Error('Credential index points to a different account');
  if (!credentials[loginKey]) {
    if (typeof user.password === 'string' && user.password.length) updates[`credentials/${loginKey}`] = {uid:user.id,...hashPassword(user.password)};
    else updates[`credentials/${loginKey}`] = {uid:user.id,requiresActivation:true};
  }
  if (user.password !== undefined) updates[`users/${key}/password`] = null;
  if (user.role === 'teacher') teachers++; else students++;
}
console.log(`Validated ${teachers} teachers, ${students} students; ${Object.keys(updates).length} changes. No balances, cosmetic IDs or completion IDs will change.`);
if (process.argv.includes('--apply')) {
  const backup = process.env.CYBERLEARN_MIGRATION_BACKUP;
  if (!backup) throw new Error('Set CYBERLEARN_MIGRATION_BACKUP to an absolute private backup filename');
  await writeFile(backup,JSON.stringify({users:backupUsers,credentials}),{mode:0o600,flag:'wx'});
  await db.ref().update(updates);
  console.log('Migration applied. Keep the backup private; it contains legacy passwords.');
} else console.log('Preview only. Re-run with --apply after closing public database access and creating a full RTDB export.');
process.exit(0);
