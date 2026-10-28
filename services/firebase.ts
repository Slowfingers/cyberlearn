import { Classroom, User, Task, TaskAttempt } from '../types';

import { serverCall, observeServer, sessionChanged } from './localServer';
export const LOCAL_SERVER = import.meta.env?.VITE_BACKEND !== 'firebase';
export const LOCAL_DEMO = false;

export async function callServer<T>(operation: string, data: Record<string, unknown> = {}): Promise<T> {
  if (LOCAL_SERVER) return serverCall<T>(operation,data);
  if (LOCAL_DEMO) return (await import('./localDemo')).localCall<T>(operation,data);
  return (await import('./firebaseCloud')).cloudCall<T>(operation, data);
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
  await (await import('./firebaseCloud')).cloudLogin(token);
  return fbGetUser();
}
export const logout = async () => { if(LOCAL_SERVER){await serverCall('logout');sessionChanged();} else await (await import('./firebaseCloud')).cloudLogout(); };
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
  let cancelled = false;
  let unsubscribe: (() => void) | undefined;
  let revision = 0;
  import('./firebaseCloud').then(cloud => {
    if (cancelled) return;
    unsubscribe = cloud.observeCloudAuth(async (signedIn, error) => {
      const current = ++revision;
      if (!signedIn) { if (!cancelled) callback(null, error); return; }
      try { const user = await fbGetUser(); if (!cancelled && current === revision) callback(user); }
      catch (error) { if (!cancelled && current === revision) callback(null, error); }
    });
  }).catch(error => { if (!cancelled) callback(null, error); });
  return () => { cancelled = true; revision++; unsubscribe?.(); };
};
