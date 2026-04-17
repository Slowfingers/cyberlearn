import { TaskAttempt } from '../types';
import { fbSaveUser, fbGetUsers } from '../services/firebase';

export interface ActiveAttempt {
  taskId: string;
  startTime: number;
  errors: number;
  tabSwitches: number;
}

let currentAttempt: ActiveAttempt | null = null;
let currentUserId: string | null = null;
let visibilityListener: (() => void) | null = null;
let blurListener: (() => void) | null = null;
let beforeUnloadListener: (() => void) | null = null;

// Queue of pending tab switch increments, debounced-flushed to Firebase
let pendingIncrements = 0;
let flushTimer: ReturnType<typeof setTimeout> | null = null;
let flushInFlight = false;
let lastSwitchAt = 0;
const DEBOUNCE_MS = 600;
const MIN_INTERVAL_MS = 400; // avoid double-counting blur+visibilitychange

const flushPending = async () => {
  if (flushInFlight || pendingIncrements === 0 || !currentUserId) return;
  flushInFlight = true;
  const count = pendingIncrements;
  pendingIncrements = 0;
  try {
    const users = await fbGetUsers();
    const user = users.find(u => u.id === currentUserId);
    if (user) {
      if (!user.suspiciousActivity) {
        user.suspiciousActivity = { totalTabSwitches: 0, highErrorTasks: [] };
      }
      user.suspiciousActivity.totalTabSwitches = (user.suspiciousActivity.totalTabSwitches || 0) + count;
      await fbSaveUser(user);
      console.log(`[ActivityTracker] Saved ${count} tab switch(es). Total: ${user.suspiciousActivity.totalTabSwitches}`);
    } else {
      console.warn('[ActivityTracker] User not found for id:', currentUserId);
      // Restore the count so it's not lost
      pendingIncrements += count;
    }
  } catch (e) {
    console.error('[ActivityTracker] Flush failed:', e);
    pendingIncrements += count; // restore on failure
  } finally {
    flushInFlight = false;
    // If more piled up during flush, schedule another flush
    if (pendingIncrements > 0) {
      scheduleFlush();
    }
  }
};

const scheduleFlush = () => {
  if (flushTimer) clearTimeout(flushTimer);
  flushTimer = setTimeout(() => {
    flushTimer = null;
    flushPending();
  }, DEBOUNCE_MS);
};

const registerTabSwitch = () => {
  const now = Date.now();
  if (now - lastSwitchAt < MIN_INTERVAL_MS) return; // dedupe simultaneous blur+visibility events
  lastSwitchAt = now;
  pendingIncrements++;
  if (currentAttempt) currentAttempt.tabSwitches++;
  console.log(`[ActivityTracker] Tab switch detected (pending: ${pendingIncrements})`);
  scheduleFlush();
};

// Initialize global listeners — call once when student logs in
export const initActivityTracking = (userId: string) => {
  currentUserId = userId;

  if (!visibilityListener) {
    visibilityListener = () => {
      if (document.hidden) {
        registerTabSwitch();
      }
    };
    document.addEventListener('visibilitychange', visibilityListener);
  }

  if (!blurListener) {
    blurListener = () => {
      // Window blur (switching to other app/window) — also count as tab switch
      registerTabSwitch();
    };
    window.addEventListener('blur', blurListener);
  }

  if (!beforeUnloadListener) {
    beforeUnloadListener = () => {
      // Best-effort sync flush via navigator.sendBeacon is not used here since we use RTDB SDK.
      // Just try to flush synchronously in background.
      if (pendingIncrements > 0) flushPending();
    };
    window.addEventListener('beforeunload', beforeUnloadListener);
  }

  console.log('[ActivityTracker] Initialized for user:', userId);
};

export const startTaskAttempt = (taskId: string, userId?: string) => {
  if (userId) currentUserId = userId;
  currentAttempt = {
    taskId,
    startTime: Date.now(),
    errors: 0,
    tabSwitches: 0,
  };
};

export const recordError = () => {
  if (currentAttempt) currentAttempt.errors++;
};

export const endTaskAttempt = async (userId: string, success: boolean) => {
  if (!currentAttempt) return;
  currentUserId = userId;

  const duration = Math.floor((Date.now() - currentAttempt.startTime) / 1000);
  const attempt: TaskAttempt = {
    taskId: currentAttempt.taskId,
    timestamp: new Date().toISOString(),
    errors: currentAttempt.errors,
    tabSwitches: currentAttempt.tabSwitches,
    duration,
    success,
  };

  try {
    const users = await fbGetUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      if (!user.taskAttempts) user.taskAttempts = [];
      user.taskAttempts.push(attempt);
      if (user.taskAttempts.length > 50) {
        user.taskAttempts = user.taskAttempts.slice(-50);
      }
      await fbSaveUser(user);
    }
  } catch (e) {
    console.error('[ActivityTracker] endTaskAttempt failed:', e);
  }

  currentAttempt = null;
};

export const cleanupTracker = () => {
  if (pendingIncrements > 0) flushPending();
  if (visibilityListener) {
    document.removeEventListener('visibilitychange', visibilityListener);
    visibilityListener = null;
  }
  if (blurListener) {
    window.removeEventListener('blur', blurListener);
    blurListener = null;
  }
  if (beforeUnloadListener) {
    window.removeEventListener('beforeunload', beforeUnloadListener);
    beforeUnloadListener = null;
  }
  currentAttempt = null;
  currentUserId = null;
};

export const getCurrentAttempt = () => currentAttempt;
