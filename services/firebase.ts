import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithCustomToken, signOut } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';
import { Classroom, User, Task, TaskAttempt } from '../types';

import { serverCall, observeServer, sessionChanged } from './localServer';
export const LOCAL_SERVER = import.meta.env.VITE_BACKEND !== 'firebase';
export const LOCAL_DEMO = false;

const app = LOCAL_SERVER ? null : initializeApp({
  apiKey: 'AIzaSyB2m5CTgGgLA5c2F_CTLzJiXctisjTRSAk',
  authDomain: 'cyberlearn-12348.firebaseapp.com',
  databaseURL: 'https://cyberlearn-12348-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cyberlearn-12348',
  storageBucket: 'cyberlearn-12348.firebasestorage.app',
  messagingSenderId: '865505448002',
  appId: '1:865505448002:web:d7bc759145759d14df1ddb',
});
export const auth = app ? getAuth(app) : null;
const functions = app ? getFunctions(app, 'europe-west1') : null;
export async function callServer<T>(operation: string, data: Record<string, unknown> = {}): Promise<T> {
  if (LOCAL_SERVER) return serverCall<T>(operation,data);
  if (LOCAL_DEMO) return (await import('./localDemo')).localCall<T>(operation,data);
  return (await httpsCallable<Record<string, unknown>, T>(functions, 'api')({ operation, ...data })).data;
}
export const fbGetUser = () => callServer<User>('getUser');
export const fbGetUsers = (classId?: string) => callServer<User[]>('listUsers', { classId: classId || null });
export const fbGetClassrooms = () => callServer<Classroom[]>('listClassrooms');
export const fbCreateClassroom = (cls: Classroom) => callServer<Classroom>('createClassroom', { name: cls.name });
export const fbUpdateClassroom = (cls: Classroom) => callServer<void>('updateClassroom', { classroom: cls });
export const fbDeleteClassroom = (classId: string) => callServer<boolean>('deleteClassroom', { classId });
export const fbGetTasks = () => callServer<Task[]>('listTasks');
export const fbCreateTask = (classId: string, task: Task) => callServer<void>('createTask', { classId, task });
export const fbCompleteTask = (taskId: string, attempts: number) => callServer<{ user: User; awarded: boolean }>('completeTask', { taskId, attempts });
export const fbRecordAttempt = (attempt: TaskAttempt) => callServer<void>('recordAttempt', { attempt });
export const fbIncrementSwitches = (count: number) => callServer<void>('incrementSwitches', { count });
export const fbResetStudentPassword = (studentId: string) => callServer<string>('resetStudentPassword', { studentId });
export async function fbLogin(role: 'teacher' | 'student', name: string, password: string, inviteCode?: string): Promise<User> {
  if (LOCAL_SERVER) { const user=await serverCall<User>('login',{role,name,password,inviteCode}); sessionChanged(); return user; }
  const { token } = await callServer<{ token: string }>('login', { role, name: name.trim(), password, inviteCode });
  await signInWithCustomToken(auth, token);
  return fbGetUser();
}
export const logout = async () => { if(LOCAL_SERVER){await serverCall('logout');sessionChanged();} else await signOut(auth); };
export const observeSession = (callback: (user: User | null, error?: unknown) => void) => {
  if (LOCAL_SERVER) return observeServer(callback);
  if (LOCAL_DEMO) {
    let cancelled = false;
    let unsubscribe: (() => void) | undefined;
    import('./localDemo').then(module => {
      if (!cancelled) unsubscribe = module.observeLocalSession(callback);
    }).catch(error => { if (!cancelled) callback(null,error); });
    return () => { cancelled = true; unsubscribe?.(); };
  }
  return onAuthStateChanged(auth, async session => {
  if (!session) return callback(null);
  try { callback(await fbGetUser()); } catch (error) { callback(null, error); }
  });
};
