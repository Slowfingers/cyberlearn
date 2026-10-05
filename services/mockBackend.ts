
import { User, Classroom, StudentProgress, Task } from "../types";
import { LEVEL_THRESHOLDS, MOCK_TASKS, COURSES } from "../constants";
import { fbGetClassrooms, fbCreateClassroom, fbUpdateClassroom, fbDeleteClassroom, fbGetUsers, fbGetUser, fbGetTasks, fbCreateTask, fbLogin, callServer } from './firebase';
import {uniqueTaskCatalog, applyCompletedTasks} from './taskProgress';
import { readStoredJSON, writeStoredJSON } from '../utils/storage';

const TASK_PROGRESS_PREFIX = 'task_progress_';
const FANTASY_PROGRESS_PREFIX = 'fantasy_progress_';

export const calculateLevel = (xp: number): number => {
    let level = 1;
    for (let i = 0; i < LEVEL_THRESHOLDS.length; i++) {
        if (xp >= LEVEL_THRESHOLDS[i]) level = i + 1;
        else break;
    }
    return level;
};

export const getNextLevelThreshold = (currentLevel: number): number => {
    if (currentLevel >= LEVEL_THRESHOLDS.length) return LEVEL_THRESHOLDS[LEVEL_THRESHOLDS.length - 1] * 1.5;
    return LEVEL_THRESHOLDS[currentLevel];
};

// --- DATA ACCESS (Firebase async) ---

export const getUsers = async (): Promise<User[]> => {
    return fbGetUsers();
};

export const getClassrooms = async (): Promise<Classroom[]> => {
    return fbGetClassrooms();
};

export const getTeacherClasses = async (teacherId: string): Promise<Classroom[]> => {
    const classes = await getClassrooms();
    return classes.filter(c => c.teacherId === teacherId);
};

// --- MARKET ACTIONS ---

export const buyItem = async (userId: string, itemId: string): Promise<{ success: boolean, user?: User, error?: string }> => {
    try { return { success: true, user: await callServer<User>('buyItem', { itemId }) }; }
    catch (error) { return { success: false, error: error instanceof Error ? error.message : 'Ошибка покупки' }; }
};

export const equipItem = async (userId: string, itemId: string): Promise<{ success: boolean, user?: User }> => {
    return { success: true, user: await callServer<User>('equipItem', { itemId }) };
};

// --- AUTH ACTIONS (Firebase async) ---

export const loginOrRegisterTeacher = async (name: string, password?: string): Promise<{ success: boolean, user?: User, classrooms?: Classroom[], error?: string }> => {
    try {
        const user = await fbLogin('teacher', name, password || '');
        return { success: true, user, classrooms: await getTeacherClasses(user.id) };
    } catch (error) { return { success: false, error: error instanceof Error ? error.message : 'Ошибка входа' }; }
};

export const createClassroom = async (teacherId: string, className: string): Promise<Classroom> => {
    return fbCreateClassroom({ id:'', teacherId, name:className, inviteCode:'', studentIds:[] });
};

export const deleteClassroom = async (classId: string): Promise<boolean> => {
    return fbDeleteClassroom(classId);
};

export const joinClassroom = async (studentName: string, inviteCode: string, password: string): Promise<{ success: boolean, user?: User, error?: string }> => {
    try { return { success: true, user: await fbLogin('student', studentName, password, inviteCode.trim().toUpperCase()) }; }
    catch (error) { return { success: false, error: error instanceof Error ? error.message : 'Ошибка входа' }; }
};

export const createTaskForClass = (classId: string, task: Task): Promise<void> => fbCreateTask(classId, task);

// --- TASK PROGRESS PERSISTENCE (localStorage — per-device) ---

export const getTaskProgress = (userId: string): Record<string, 'open' | 'completed' | 'locked'> => {
    const key = `${TASK_PROGRESS_PREFIX}${userId}`;
    return readStoredJSON(key, {});
};

export const saveTaskProgress = (userId: string, progress: Record<string, 'open' | 'completed' | 'locked'>): void => {
    const key = `${TASK_PROGRESS_PREFIX}${userId}`;
    writeStoredJSON(key, progress);
};

// --- FAILED-ATTEMPT COUNTERS (localStorage — per-device) ---
// Живут, пока задача не сдана; не сбрасываются при перезаходе в урок.

const TASK_ATTEMPTS_PREFIX = 'task_attempts_';

export const getTaskAttempts = (userId: string): Record<string, number> => {
    const key = `${TASK_ATTEMPTS_PREFIX}${userId}`;
    return readStoredJSON(key, {});
};

export const saveTaskAttempts = (userId: string, attempts: Record<string, number>): void => {
    const key = `${TASK_ATTEMPTS_PREFIX}${userId}`;
    writeStoredJSON(key, attempts);
};

// --- DATA FETCHING ---

export const getAllTasks = async (userId?: string): Promise<Task[]> => {
    const custom = await fbGetTasks();
    const allTasks = uniqueTaskCatalog(MOCK_TASKS, custom);
    if (!userId) return allTasks;
    const user = await fbGetUser();
    if (!user || user.id !== userId) throw new Error('Сеанс ученика изменился. Войди снова.');
    return applyCompletedTasks(allTasks, user.completedTaskIds || []);
};

export const getCoursesWithProgress = (tasks: Task[], hiddenCourseIds?: string[]): any[] => {
    return [...COURSES, ...(tasks.some(t=>t.courseId==='course_teacher') ? [{id:'course_teacher',title:'Контрольные учителя',description:'Работы и небольшие задания твоего класса. Ответы сохраняются для проверки учителем.',icon:'BookOpen',difficulty:'Beginner',status:'active',totalModules:1,color:'#55dcee'}] : [])]
        .filter(course => !hiddenCourseIds || !hiddenCourseIds.includes(course.id))
        .map(course => {
            const courseTasks = tasks.filter(t => t.courseId === course.id);
            const completed = courseTasks.filter(t => t.status === 'completed').length;
            const total = courseTasks.length;
            const progress = total === 0 ? 0 : Math.round((completed / total) * 100);
            return { ...course, progress, totalTasks: total };
        });
};

export const getHiddenCoursesForStudent = async (userId: string): Promise<string[]> => {
    const user = await fbGetUser();
    if (!user?.classId) return [];
    const classes = await getClassrooms();
    const cls = classes.find(c => c.id === user.classId);
    return cls?.hiddenCourses || [];
};

export const updateClassroom = async (updatedClass: Classroom): Promise<void> => {
    await fbUpdateClassroom(updatedClass);
};

export const getClassStudents = async (classId: string): Promise<StudentProgress[]> => {
    const classes = await getClassrooms();
    const targetClass = classes.find(c => c.id === classId);
    if (!targetClass) return [];

    const users = await fbGetUsers(classId);
    // Match students by classId (authoritative) OR legacy studentIds list,
    // so newly registered students always show up even if studentIds write races.
    const studentIdSet = new Set(targetClass.studentIds || []);
    const realStudents = users.filter(u =>
        u.role === 'student' && (u.classId === targetClass.id || studentIdSet.has(u.id))
    );

    // Get all tasks for course progress calculation
    const allCourseTasks: Record<string, { courseId: string; title: string; color: string; taskIds: string[] }> = {};
    COURSES.forEach(course => {
        const courseTasks = MOCK_TASKS.filter(t => t.courseId === course.id);
        allCourseTasks[course.id] = {
            courseId: course.id,
            title: course.title.split(':')[0],
            color: course.color,
            taskIds: courseTasks.map(t => t.id),
        };
    });

    return realStudents.map(s => {
        // Server progress is authoritative across devices.
        const completedIds = s.completedTaskIds || [];
        const completedSet = new Set(completedIds);
        
        const tasksCompleted = completedIds.length;
        const totalTasks = MOCK_TASKS.length;

        // Last active: prefer Firebase data, fallback to localStorage streak
        let lastActive = 'Неизвестно';
        const lastActiveDate = s.lastActiveDate;
        if (lastActiveDate) {
            const today = new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Tashkent',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
            const diffDays = Math.max(0, Math.round((Date.parse(today) - Date.parse(lastActiveDate)) / 86400000));
            if (diffDays === 0) lastActive = 'Сегодня';
            else if (diffDays === 1) lastActive = 'Вчера';
            else if (diffDays < 7) lastActive = `${diffDays} дн. назад`;
            else lastActive = `${Math.floor(diffDays / 7)} нед. назад`;
        }

        // Streak: prefer Firebase, fallback to localStorage
        const streak = s.streak || 0;

        // Per-course progress — computed from completedIds (works cross-device)
        const courseProgress = Object.values(allCourseTasks).map(c => {
            const completed = c.taskIds.filter(tid => completedSet.has(tid)).length;
            return { courseId: c.courseId, title: c.title, completed, total: c.taskIds.length, color: c.color };
        });

        // Calculate cheating detection metrics
        const attempts = s.taskAttempts || [];
        const totalTabSwitches = s.suspiciousActivity?.totalTabSwitches || 0;
        
        // Calculate average errors per task (only from attempts)
        const totalErrorsFromAttempts = attempts.reduce((sum, a) => sum + a.errors, 0);
        const avgErrorsPerTask = attempts.length > 0 
            ? Math.round((totalErrorsFromAttempts / attempts.length) * 10) / 10 
            : 0;
        
        // Get last 10 attempts
        const recentAttempts = attempts.slice(-10);

        return {
            studentId: s.id,
            name: s.name,
            tasksCompleted,
            totalTasks,
            totalXP: s.xp || 0,
            totalErrors: s.totalErrors || 0,
            level: s.level || 1,
            lastActive,
            streak,
            courseProgress,
            skills: { loops: 50, variables: 50, logic: 50 },
            totalTabSwitches,
            avgErrorsPerTask,
            recentAttempts
        };
    });
};

// --- STREAK SYSTEM ---

const STREAK_PREFIX = 'cyberlearn_streak_';

export interface StreakData {
    currentStreak: number;
    longestStreak: number;
    lastActiveDate: string; // YYYY-MM-DD
    tasksToday: number;
    todayDate: string;
}

const getTodayStr = (): string => {
    return new Intl.DateTimeFormat('en-CA', {timeZone:'Asia/Tashkent',year:'numeric',month:'2-digit',day:'2-digit'}).format(new Date());
};

export const getStreak = (userId: string): StreakData => {
    const key = `${STREAK_PREFIX}${userId}`;
    const saved = localStorage.getItem(key);
    const today = getTodayStr();
    if (saved) {
        const data = readStoredJSON<StreakData>(key, { currentStreak: 0, longestStreak: 0, lastActiveDate: '', tasksToday: 0, todayDate: today });
        // Reset tasksToday if it's a new day
        if (data.todayDate !== today) {
            data.tasksToday = 0;
            data.todayDate = today;
        }
        // Check if streak is broken (missed more than 1 day)
        if (data.lastActiveDate) {
            const lastDate = new Date(data.lastActiveDate);
            const todayDate = new Date(today);
            const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays > 1) {
                data.currentStreak = 0; // Streak broken
            }
        }
        return data;
    }
    return { currentStreak: 0, longestStreak: 0, lastActiveDate: '', tasksToday: 0, todayDate: today };
};

export const recordActivity = (userId: string): StreakData => {
    const key = `${STREAK_PREFIX}${userId}`;
    const streak = getStreak(userId);
    const today = getTodayStr();

    streak.tasksToday += 1;

    if (streak.lastActiveDate !== today) {
        // First activity of the day
        const lastDate = streak.lastActiveDate ? new Date(streak.lastActiveDate) : null;
        const todayDate = new Date(today);
        
        if (lastDate) {
            const diffDays = Math.floor((todayDate.getTime() - lastDate.getTime()) / (1000 * 60 * 60 * 24));
            if (diffDays === 1) {
                streak.currentStreak += 1; // Consecutive day
            } else if (diffDays > 1) {
                streak.currentStreak = 1; // Streak broken, start fresh
            }
            // diffDays === 0 shouldn't happen since we checked lastActiveDate !== today
        } else {
            streak.currentStreak = 1; // First ever activity
        }
        
        streak.lastActiveDate = today;
        streak.longestStreak = Math.max(streak.longestStreak, streak.currentStreak);
    }

    streak.todayDate = today;
    writeStoredJSON(key, streak);
    return streak;
};

// --- FANTASY ---
export const getFantasyProgress = (userId: string) => {
    const key = `${FANTASY_PROGRESS_PREFIX}${userId}`;
    const saved = localStorage.getItem(key);
    if (saved) return readStoredJSON(key, { ink: 50, feathers: 0, chaptersCompleted: [] });
    return { ink: 50, feathers: 0, chaptersCompleted: [] };
};

export const updateFantasyProgress = (userId: string, data: any) => {
    const current = getFantasyProgress(userId);
    const updated = {
        ...current,
        ink: data.ink !== undefined ? data.ink : current.ink,
        feathers: data.feathers !== undefined ? data.feathers : current.feathers,
        chaptersCompleted: data.chapterCompleted && !current.chaptersCompleted.includes(data.chapterCompleted) 
            ? [...current.chaptersCompleted, data.chapterCompleted] 
            : current.chaptersCompleted
    };
    writeStoredJSON(`${FANTASY_PROGRESS_PREFIX}${userId}`, updated);
    return updated;
};
