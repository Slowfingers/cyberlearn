import { TaskAttempt } from '../types';
import { fbSaveUser, fbGetUsers } from '../services/firebase';

const ATTEMPT_KEY_PREFIX = 'task_attempt_';

export interface ActiveAttempt {
  taskId: string;
  startTime: number;
  errors: number;
  tabSwitches: number;
}

let currentAttempt: ActiveAttempt | null = null;
let visibilityListener: (() => void) | null = null;

export const startTaskAttempt = (taskId: string) => {
  currentAttempt = {
    taskId,
    startTime: Date.now(),
    errors: 0,
    tabSwitches: 0,
  };

  if (!visibilityListener) {
    visibilityListener = () => {
      if (document.hidden && currentAttempt) {
        currentAttempt.tabSwitches++;
        console.log(`[ActivityTracker] Tab switch detected. Total: ${currentAttempt.tabSwitches}`);
      }
    };
    document.addEventListener('visibilitychange', visibilityListener);
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
      
      user.suspiciousActivity.totalTabSwitches += attempt.tabSwitches;
      
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
  if (visibilityListener) {
    document.removeEventListener('visibilitychange', visibilityListener);
    visibilityListener = null;
  }
  currentAttempt = null;
};

export const getCurrentAttempt = () => currentAttempt;
