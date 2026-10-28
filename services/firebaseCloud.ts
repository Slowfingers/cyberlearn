import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged, signInWithCustomToken, signOut } from 'firebase/auth';
import { getFunctions, httpsCallable } from 'firebase/functions';

const app = initializeApp({
  apiKey: 'AIzaSyB2m5CTgGgLA5c2F_CTLzJiXctisjTRSAk',
  authDomain: 'cyberlearn-12348.firebaseapp.com',
  databaseURL: 'https://cyberlearn-12348-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'cyberlearn-12348',
  storageBucket: 'cyberlearn-12348.firebasestorage.app',
  messagingSenderId: '865505448002',
  appId: '1:865505448002:web:d7bc759145759d14df1ddb',
});
const auth = getAuth(app);
const functions = getFunctions(app, 'europe-west1');
export const cloudCall = async <T>(operation: string, data: Record<string, unknown>): Promise<T> =>
  (await httpsCallable<Record<string, unknown>, T>(functions, 'api')({ operation, ...data })).data;
export const cloudLogin = (token: string) => signInWithCustomToken(auth, token);
export const cloudLogout = () => signOut(auth);
export const observeCloudAuth = (callback: (signedIn: boolean, error?: unknown) => void) =>
  onAuthStateChanged(auth, session => callback(!!session), error => callback(false, error));
