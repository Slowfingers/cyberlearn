import { TaskAttempt } from '../types';
import { fbRecordAttempt, fbIncrementSwitches } from '../services/firebase';

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
  const flushUserId = currentUserId;
  const count = pendingIncrements;
  pendingIncrements = 0;
  try {
    await fbIncrementSwitches(count);
  } catch (e) {
    if (currentUserId === flushUserId) pendingIncrements += count;
    console.error('[ActivityTracker] Flush failed:', e);
  } finally {
    flushInFlight = false;
    // If more piled up during flush, schedule another flush
    if (pendingIncrements > 0) {
      if (currentUserId) { flushTimer = setTimeout(() => { flushTimer = null; flushPending(); }, 5000); }
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

  const finishedAttempt = currentAttempt;
  currentAttempt = null;
  const duration = Math.floor((Date.now() - finishedAttempt.startTime) / 1000);
  const attempt: TaskAttempt = {
    taskId: finishedAttempt.taskId,
    timestamp: new Date().toISOString(),
    errors: finishedAttempt.errors,
    tabSwitches: finishedAttempt.tabSwitches,
    duration,
    success,
  };

  try {
    await fbRecordAttempt(attempt);
  } catch (e) {
    console.error('[ActivityTracker] endTaskAttempt failed:', e);
  }

};

export const cleanupTracker = () => {
  if (flushTimer) { clearTimeout(flushTimer); flushTimer = null; }
  if (pendingIncrements > 0) void flushPending();
  pendingIncrements = 0;
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
