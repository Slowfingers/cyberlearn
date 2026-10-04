import { initializeApp } from 'firebase-admin/app';
import { getDatabase } from 'firebase-admin/database';
import { getAuth } from 'firebase-admin/auth';
import { onCall, HttpsError } from 'firebase-functions/v2/https';
import { randomUUID, randomBytes } from 'node:crypto';
import { normalizeName as normalized, hashKey, credentialKey, hashPassword, verifyPassword as verify } from './credentials.mjs';
import { readFileSync } from 'node:fs';
import { publicUser, buyCosmetic, completeTask, validateMap } from './domain.mjs';
initializeApp();
const db = getDatabase(), auth = getAuth();
const catalog = JSON.parse(readFileSync(new URL('./catalog.json', import.meta.url), 'utf8'));
const fail = (message, code = 'failed-precondition') => { throw new HttpsError(code, message); };
const text = (value, max = 100) => { if (typeof value !== 'string' || !value.trim() || value.length > max) fail('Заполните поля корректно', 'invalid-argument'); return value.trim(); };
async function findById(node, id) {
  const snap = await db.ref(node).orderByChild('id').equalTo(id).limitToFirst(2).get();
  const entries = Object.entries(snap.val() || {});
  if (entries.length !== 1) fail('Запись не найдена', 'not-found');
  return { ref: db.ref(`${node}/${entries[0][0]}`), value: entries[0][1] };
}
async function ownUser(request) {
  if (!request.auth) fail('Войдите в аккаунт', 'unauthenticated');
  const bearer = request.rawRequest.headers.authorization?.replace(/^Bearer /, '');
  if (!bearer) fail('Войдите в аккаунт', 'unauthenticated');
  try { await auth.verifyIdToken(bearer, true); } catch { fail('Сессия завершена. Войдите снова', 'unauthenticated'); }
  return findById('users', request.auth.uid);
}
async function ownedClass(user, classId) {
  const cls = await findById('classrooms', text(classId));
  if (user.role !== 'teacher' || cls.value.teacherId !== user.id) fail('Нет доступа к классу', 'permission-denied');
  return cls;
}
async function mutateUser(ref, transform) {
  // Throw outside the transaction callback: callbacks can be retried.
  let error;
  const result = await ref.transaction(current => {
    if (!current) return current;
    try { error = undefined; return transform(current); } catch (e) { error = e; return; }
  });
  if (error) fail(error.message);
  if (!result.committed || !result.snapshot.val()) fail('Не удалось сохранить изменения');
  return publicUser(result.snapshot.val());
}
async function login(request) {
  const { role, inviteCode } = request.data;
  if (!['teacher', 'student'].includes(role)) fail('Неверная роль', 'invalid-argument');
  const name = text(request.data.name, 80), password = request.data.password;
  if (typeof password !== 'string' || !password.length || password.length > 128) fail('Введите пароль', 'invalid-argument');
  // Rate-limit all attempts, including registrations, before reading credentials.
  const rateRef = db.ref(`loginLimits/${hashKey(`${request.rawRequest.ip}:${normalized(name)}`)}`);
  const now = Date.now();
  const rate = await rateRef.transaction(old => {
    if (!old || now - old.start > 900000) return { start: now, count: 1 };
    if (old.count >= 10) return;
    return { ...old, count: old.count + 1 };
  });
  if (!rate.committed) fail('Слишком много попыток. Повторите через 15 минут', 'resource-exhausted');
  let cls;
  if (role === 'student') {
    const snap = await db.ref('classrooms').orderByChild('inviteCode').equalTo(text(inviteCode).toUpperCase()).get();
    const matches = Object.values(snap.val() || {});
    if (matches.length !== 1) fail('Неверные данные входа', 'unauthenticated');
    cls = matches[0];
  }
  const credRef = db.ref(`credentials/${credentialKey(role, name, cls?.id)}`);
  let credential = (await credRef.get()).val();
  if (!credential) {
    // Legacy accounts are looked up only on the server. Passwords never reach a browser.
    const snap = await db.ref('users').get();
    const matches = Object.entries(snap.val() || {}).filter(([, u]) => normalized(u.name) === normalized(name) && u.role === role && (role !== 'student' || u.classId === cls.id));
    if (matches.length > 1) fail('Обратитесь к администратору: одинаковые имена аккаунтов');
    if (matches.length) {
      const [key, user] = matches[0];
      if (!user.password || user.password !== password) fail(role === 'student' ? 'Получите пароль у учителя' : 'Неверные данные входа', 'unauthenticated');
      credential = { uid: user.id, ...hashPassword(password) };
      const result = await credRef.transaction(old => old || credential);
      credential = result.snapshot.val();
      if (!verify(password, credential)) fail('Неверные данные входа', 'unauthenticated');
      await db.ref(`users/${key}/password`).remove();
    } else {
      if (password.length < 8) fail('Пароль должен содержать минимум 8 символов', 'invalid-argument');
      const uid = `${role === 'teacher' ? 't' : 's'}_${randomUUID()}`;
      const profile = { id: uid, name, role, ...(cls ? { classId: cls.id } : {}), xp:0, currency:0, level:1, inventory:['col_default','av_1','skin_sparky'], achievements:[], equipped:{avatar:'av_1',droneColor:'col_default',mascotSkin:'skin_sparky'} };
      const proposed = { uid, ...hashPassword(password), profile };
      const result = await credRef.transaction(old => old || proposed);
      credential = result.snapshot.val();
    }
  }
  if (credential.requiresActivation) fail(role === 'student' ? 'Получите пароль у учителя' : 'Обратитесь к администратору для восстановления пароля', 'unauthenticated');
  if (!verify(password, credential)) fail('Неверные данные входа', 'unauthenticated');
  if (credential.profile) {
    await db.ref(`users/${credential.uid}`).transaction(current => current || credential.profile);
    await credRef.child('profile').remove();
  }
  await findById('users', credential.uid);
  if (cls) {
    const found = await findById('classrooms', cls.id);
    await found.ref.child('studentIds').transaction(ids => [...new Set([...(ids || []), credential.uid])]);
  }
  return { token: await auth.createCustomToken(credential.uid) };
}
export const api = onCall({ region:'europe-west1', maxInstances:10 }, async request => {
  const d = request.data || {};
  if (d.operation === 'login') return login(request);
  const { ref:userRef, value:user } = await ownUser(request);
  switch (d.operation) {
    case 'getUser': return publicUser(user);
    case 'listUsers': {
      if (!d.classId) return [publicUser(user)];
      await ownedClass(user, d.classId);
      const snap = await db.ref('users').orderByChild('classId').equalTo(d.classId).get();
      return Object.values(snap.val() || {}).filter(u => u.role === 'student').map(publicUser);
    }
    case 'listClassrooms': {
      if (user.role === 'teacher') {
        const snap = await db.ref('classrooms').orderByChild('teacherId').equalTo(user.id).get();
        return Object.values(snap.val() || {});
      }
      if (!user.classId) return [];
      try { return [(await findById('classrooms', user.classId)).value]; } catch (e) { if (e.code === 'not-found') return []; throw e; }
    }
    case 'createClassroom': {
      if (user.role !== 'teacher') fail('Нет доступа', 'permission-denied');
      // UUID-derived invite codes avoid Math.random collisions and are hard to guess.
      const cls = { id:`c_${randomUUID()}`, teacherId:user.id, name:text(d.name), inviteCode:randomBytes(8).toString('hex').toUpperCase(), studentIds:[] };
      await db.ref(`classrooms/${cls.id}`).set(cls); return cls;
    }
    case 'updateClassroom': {
      const cls = await ownedClass(user, d.classroom?.id);
      const hidden = d.classroom.hiddenCourses || [];
      if (!Array.isArray(hidden) || hidden.some(id => !catalog.tasks.some(t => t.courseId === id))) fail('Неверные курсы');
      await cls.ref.update({ name:text(d.classroom.name), hiddenCourses:hidden }); return null;
    }
    case 'deleteClassroom': {
      const cls = await ownedClass(user, d.classId);
      await cls.ref.remove(); await db.ref(`classTasks/${d.classId}`).remove(); return true;
    }
    case 'listTasks': {
      if (!user.classId) return [];
      // Deleted classes cannot continue serving stale tasks.
      await findById('classrooms', user.classId);
      return Object.values((await db.ref(`classTasks/${user.classId}`).get()).val() || {});
    }
    case 'createTask': {
      await ownedClass(user, d.classId);
      const task = d.task;
      try { validateMap(task?.mapConfig); } catch (e) { fail(e.message, 'invalid-argument'); }
      if (task.type !== 'grid') fail('Неверный тип задания');
      const safe = { id:`custom_${randomUUID()}`, courseId:'course_grade3', module:'Кастомные миссии', title:text(task.title), description:text(task.description,2000), type:'grid', xpReward:500, currencyReward:100, status:'open', initialCode:'', mapConfig:task.mapConfig, allowedCommands:['moveRight();','moveDown();','moveLeft();','moveUp();'] };
      await db.ref(`classTasks/${d.classId}/${safe.id}`).set(safe); return null;
    }
    case 'buyItem': case 'equipItem':
      return mutateUser(userRef, current => buyCosmetic(current, catalog.cosmetics.find(i => i.id === d.itemId), d.operation === 'equipItem'));
    case 'completeTask': {
      if (user.role !== 'student') fail('Нет доступа', 'permission-denied');
      let task = catalog.tasks.find(t => t.id === d.taskId);
      if (typeof d.taskId !== 'string' || !/^[a-zA-Z0-9_-]+$/.test(d.taskId)) fail('Неверное задание','invalid-argument');
      if (!Number.isInteger(d.attempts) || d.attempts < 0 || d.attempts > 100000) fail('Неверное число попыток','invalid-argument');
      if (!task && user.classId) task = (await db.ref(`classTasks/${user.classId}/${d.taskId}`).get()).val();
      const cls = user.classId ? (await findById('classrooms', user.classId)).value : null;
      if (cls?.hiddenCourses?.includes(task?.courseId)) fail('Курс закрыт учителем', 'permission-denied');
      let awarded = false;
      const updated = await mutateUser(userRef, current => { const result = completeTask(current,task,Math.max(d.attempts || 0, current.taskFailures?.[task?.id] || 0),catalog); awarded = result.awarded; return result.user; });
      return { user:updated, awarded };
    }
    case 'recordAttempt': {
      const a = d.attempt;
      if (!a || typeof a.success !== 'boolean' || ![a.errors,a.tabSwitches,a.duration].every(n => Number.isInteger(n) && n >= 0 && n <= 100000)) fail('Неверная попытка');
      const attempt = { taskId:text(a.taskId), timestamp:new Date().toISOString(), errors:a.errors, tabSwitches:a.tabSwitches, duration:a.duration, success:a.success };
      await mutateUser(userRef, current => ({ ...current, taskAttempts:[...(current.taskAttempts || []),attempt].slice(-50), taskFailures:{...(current.taskFailures || {}), [attempt.taskId]:(current.taskFailures?.[attempt.taskId] || 0) + (attempt.success ? 0 : 1)} })); return null;
    }
    case 'incrementSwitches': {
      if (!Number.isInteger(d.count) || d.count < 1 || d.count > 1000) fail('Неверный счётчик');
      await mutateUser(userRef, current => ({ ...current, suspiciousActivity:{...(current.suspiciousActivity || {highErrorTasks:[]}), totalTabSwitches:(current.suspiciousActivity?.totalTabSwitches || 0) + d.count} })); return null;
    }
    case 'resetStudentPassword': {
      const student = await findById('users',text(d.studentId));
      if (student.value.role !== 'student') fail('Ученик не найден');
      await ownedClass(user, student.value.classId);
      const password = randomBytes(9).toString('base64url');
      await db.ref(`credentials/${credentialKey('student',student.value.name,student.value.classId)}`).set({uid:student.value.id,...hashPassword(password)});
      await student.ref.child('password').remove();
      // Existing Firebase Auth records are created on the first custom-token sign-in.
      try { await auth.revokeRefreshTokens(student.value.id); } catch (e) { if (e.code !== 'auth/user-not-found') throw e; }
      return password;
    }
    default: fail('Неизвестная операция', 'invalid-argument');
  }
});
