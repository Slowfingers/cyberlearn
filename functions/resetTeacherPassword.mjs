import { initializeApp, applicationDefault } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getAuth } from 'firebase-admin/auth';
import { credentialKey, hashPassword } from './credentials.mjs';
const uid = process.argv[2], password = process.env.CYBERLEARN_NEW_PASSWORD;
if (!uid || !password || password.length < 8 || password.length > 128) throw new Error('Provide the teacher UID and set CYBERLEARN_NEW_PASSWORD (8–128 characters)');
initializeApp({credential:applicationDefault(),databaseURL:'https://cyberlearn-12348-default-rtdb.europe-west1.firebasedatabase.app'});
const db = getDatabase();
const matches = Object.entries((await db.ref('users').orderByChild('id').equalTo(uid).get()).val() || {});
if (matches.length !== 1 || matches[0][1].role !== 'teacher') throw new Error('Teacher not found or duplicate UID');
const [key,user] = matches[0];
await db.ref().update({[`credentials/${credentialKey('teacher',user.name)}`]:{uid,...hashPassword(password)},[`users/${key}/password`]:null});
try { await getAuth().revokeRefreshTokens(uid); } catch (error) { if (error.code !== 'auth/user-not-found') throw error; }
console.log('Teacher password updated; no credentials printed.');
process.exit(0);
