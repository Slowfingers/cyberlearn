import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, push, remove } from 'firebase/database';
import { Classroom, User } from '../types';

const firebaseConfig = {
  apiKey: "AIzaSyB2m5CTgGgLA5c2F_CTLzJiXctisjTRSAk",
  authDomain: "cyberlearn-12348.firebaseapp.com",
  databaseURL: "https://cyberlearn-12348-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "cyberlearn-12348",
  storageBucket: "cyberlearn-12348.firebasestorage.app",
  messagingSenderId: "865505448002",
  appId: "1:865505448002:web:d7bc759145759d14df1ddb"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// --- Helper: snapshot → array ---
const snapToArray = <T>(snap: any): T[] => {
  if (!snap.exists()) return [];
  const data = snap.val();
  return Object.keys(data).map(k => ({ ...data[k], _fbKey: k }));
};

const findKey = (snap: any, id: string): string | null => {
  if (!snap.exists()) return null;
  const data = snap.val();
  for (const key of Object.keys(data)) {
    if (data[key].id === id) return key;
  }
  return null;
};

// === CLASSROOMS ===

export const fbGetClassrooms = async (): Promise<Classroom[]> => {
  const snap = await get(ref(db, 'classrooms'));
  return snapToArray<Classroom>(snap);
};

export const fbCreateClassroom = async (cls: Classroom): Promise<void> => {
  const newRef = push(ref(db, 'classrooms'));
  await set(newRef, cls);
};

export const fbUpdateClassroom = async (cls: Classroom): Promise<void> => {
  const snap = await get(ref(db, 'classrooms'));
  const key = findKey(snap, cls.id);
  if (key) await set(ref(db, `classrooms/${key}`), cls);
};

export const fbDeleteClassroom = async (classId: string): Promise<boolean> => {
  const snap = await get(ref(db, 'classrooms'));
  const key = findKey(snap, classId);
  if (!key) return false;
  await remove(ref(db, `classrooms/${key}`));
  return true;
};

// === USERS ===

export const fbGetUsers = async (): Promise<User[]> => {
  const snap = await get(ref(db, 'users'));
  return snapToArray<User>(snap);
};

export const fbSaveUser = async (user: User): Promise<void> => {
  const snap = await get(ref(db, 'users'));
  const key = findKey(snap, user.id);
  if (key) {
    await set(ref(db, `users/${key}`), user);
  } else {
    const newRef = push(ref(db, 'users'));
    await set(newRef, user);
  }
};

export { db };
