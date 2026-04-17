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
let beforeUnloadListener: (() => void) | null = null;
let saveInProgress = false;

// Immediately save a tab switch to Firebase (don't wait for task completion)
const persistTabSwitch = async (userId: string, taskId: string) => {
  if (saveInProgress) return;
  saveInProgress = true;
  try {
    const users = await fbGetUsers();
    const user = users.find(u => u.id === userId);
    if (user) {
      if (!user.suspiciousActivity) {
        user.suspiciousActivity = { totalTabSwitches: 0, highErrorTasks: [] };
      }
      user.suspiciousActivity.totalTabSwitches = (user.suspiciousActivity.totalTabSwitches || 0) + 1;
      await fbSaveUser(user);
      console.log(`[ActivityTracker] Tab switch saved for ${userId} on ${taskId}. Total: ${user.suspiciousActivity.totalTabSwitches}`);
    }
  } catch (error) {
    console.error('[ActivityTracker] Failed to save tab switch:', error);
  } finally {
    saveInProgress = false;
  }
};

export const startTaskAttempt = (taskId: string, userId?: string) => {
  currentAttempt = {
    taskId,
    startTime: Date.now(),
    errors: 0,
    tabSwitches: 0,
  };
  if (userId) currentUserId = userId;

  if (!visibilityListener) {
    visibilityListener = () => {
      if (document.hidden && currentAttempt && currentUserId) {
        currentAttempt.tabSwitches++;
        console.log(`[ActivityTracker] Tab switch detected. Session: ${currentAttempt.tabSwitches}`);
        // Persist immediately so data is saved even if student never completes task
        persistTabSwitch(currentUserId, currentAttempt.taskId);
      }
    };
    document.addEventListener('visibilitychange', visibilityListener);
  }

  if (!beforeUnloadListener) {
    beforeUnloadListener = () => {
      // Use sendBeacon-like pattern: fire-and-forget save of current attempt
      if (currentAttempt && currentUserId && (currentAttempt.errors > 0 || currentAttempt.tabSwitches > 0)) {
        endTaskAttempt(currentUserId, false);
      }
    };
    window.addEventListener('beforeunload', beforeUnloadListener);
  }
};

export const recordError = () => {
  if (currentAttempt) {
    currentAttempt.errors++;
  }
};

export const endTaskAttempt = async (userId: string, success: boolean) => {
  if (!currentAttempt) return;

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

      if (!user.suspiciousActivity) {
        user.suspiciousActivity = { totalTabSwitches: 0, highErrorTasks: [] };
      }
      
      // NOTE: tabSwitches already persisted incrementally via persistTabSwitch,
      // so we do NOT add them again here to avoid double-counting.
      
      if (attempt.errors > 10 && !user.suspiciousActivity.highErrorTasks.includes(attempt.taskId)) {
        user.suspiciousActivity.highErrorTasks.push(attempt.taskId);
      }

      await fbSaveUser(user);
    }
  } catch (error) {
    console.error('[ActivityTracker] Failed to save attempt:', error);
  }

  currentAttempt = null;
};

export const cleanupTracker = () => {
  // Save any pending attempt before cleanup
  if (currentAttempt && currentUserId && (currentAttempt.errors > 0 || currentAttempt.tabSwitches > 0)) {
    endTaskAttempt(currentUserId, false);
  }
  if (visibilityListener) {
    document.removeEventListener('visibilitychange', visibilityListener);
    visibilityListener = null;
  }
  if (beforeUnloadListener) {
    window.removeEventListener('beforeunload', beforeUnloadListener);
    beforeUnloadListener = null;
  }
  currentAttempt = null;
  currentUserId = null;
};

export const getCurrentAttempt = () => currentAttempt;
