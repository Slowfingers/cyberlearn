
import { User, Classroom, StudentProgress, Task, Course } from "../types";
import { MOCK_STUDENTS, LEVEL_THRESHOLDS, MOCK_TASKS, COURSES, COSMETICS } from "../constants";
import { fbGetClassrooms, fbCreateClassroom, fbUpdateClassroom, fbDeleteClassroom, fbGetUsers, fbSaveUser } from './firebase';

const TASKS_KEY = 'cyberlearn_tasks';
const TASK_PROGRESS_PREFIX = 'task_progress_';
const FANTASY_PROGRESS_PREFIX = 'fantasy_progress_';

const generateInviteCode = (): string => {
    const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
    let result = "";
    for (let i = 0; i < 3; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    result += "-";
    for (let i = 0; i < 2; i++) result += chars.charAt(Math.floor(Math.random() * chars.length));
    return result;
};

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

export const getCustomTasks = (): Task[] => {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
}

export const saveUsers = async (users: User[]): Promise<void> => {
    for (const u of users) {
        await fbSaveUser(u);
    }
};

const saveCustomTasks = (tasks: Task[]) => localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

export const updateUserProfile = async (updatedUser: User): Promise<void> => {
    await fbSaveUser(updatedUser);
};

// --- MARKET ACTIONS ---

export const buyItem = async (userId: string, itemId: string): Promise<{ success: boolean, user?: User, error?: string }> => {
    const users = await getUsers();
    let user = users.find(u => u.id === userId);
    if (!user) return { success: false, error: "User not found" };

    const item = COSMETICS.find(c => c.id === itemId);
    if (!item) return { success: false, error: "Item not found" };

    if (user.inventory.includes(itemId)) return { success: false, error: "Already owned" };
    if (user.currency < item.cost) return { success: false, error: "Недостаточно средств" };
    if (user.level < item.unlockLevel) return { success: false, error: "Уровень слишком низок" };

    user.currency -= item.cost;
    user.inventory.push(itemId);
    
    // Auto equip
    if (item.type === 'avatar') user.equipped.avatar = itemId;
    if (item.type === 'droneColor') user.equipped.droneColor = itemId;
    if (item.type === 'mascotSkin') {
        user.equipped.mascotSkin = itemId;
        localStorage.setItem('cyber_mascot_skin', item.value);
    }

    await fbSaveUser(user);
    return { success: true, user };
};

export const equipItem = async (userId: string, itemId: string): Promise<{ success: boolean, user?: User }> => {
    const users = await getUsers();
    let user = users.find(u => u.id === userId);
    if (!user) return { success: false };

    const item = COSMETICS.find(c => c.id === itemId);
    if (!item) return { success: false };

    if (item.type === 'avatar') user.equipped.avatar = itemId;
    if (item.type === 'droneColor') user.equipped.droneColor = itemId;
    if (item.type === 'mascotSkin') {
        user.equipped.mascotSkin = itemId;
        localStorage.setItem('cyber_mascot_skin', item.value);
    }

    await fbSaveUser(user);
    return { success: true, user };
};

// --- AUTH ACTIONS (Firebase async) ---

export const loginOrRegisterTeacher = async (name: string, password?: string): Promise<{ success: boolean, user?: User, classrooms?: Classroom[], error?: string }> => {
    const users = await getUsers();
    let user = users.find(u => u.name.toLowerCase() === name.toLowerCase() && u.role === 'teacher');

    if (!user) {
        if (!password) {
            return { success: false, error: "Требуется пароль для регистрации" };
        }
        user = {
            id: 't_' + Date.now(),
            name,
            password,
            role: 'teacher',
            xp: 0,
            currency: 0,
            level: 1,
            inventory: [],
            achievements: [],
            equipped: { avatar: 'av_1', droneColor: 'col_default' }
        };
        await fbSaveUser(user);
    } else {
        if (user.password && user.password !== password) {
            return { success: false, error: "Неверный пароль" };
        } else if (!user.password && password) {
            user.password = password;
            await fbSaveUser(user);
        }
    }
    const classrooms = await getTeacherClasses(user.id);
    return { success: true, user, classrooms };
};

export const createClassroom = async (teacherId: string, className: string): Promise<Classroom> => {
    const newClass: Classroom = {
        id: 'c_' + Date.now(),
        teacherId,
        name: className,
        inviteCode: generateInviteCode(),
        studentIds: []
    };
    await fbCreateClassroom(newClass);
    return newClass;
};

export const deleteClassroom = async (classId: string): Promise<boolean> => {
    return fbDeleteClassroom(classId);
};

export const joinClassroom = async (studentName: string, inviteCode: string): Promise<{ success: boolean, user?: User, error?: string }> => {
    const classes = await getClassrooms();
    const normalizedCode = inviteCode.trim().toUpperCase();
    const targetClass = classes.find(c => c.inviteCode.toUpperCase() === normalizedCode);

    if (!targetClass) {
        console.log('Доступные классы:', classes.map(c => ({ name: c.name, code: c.inviteCode })));
        console.log('Введённый код:', normalizedCode);
        return { success: false, error: "Код доступа недействителен." };
    }

    const users = await getUsers();
    // Match by name AND classId — each class gets a separate account
    let user = users.find(u => u.name.toLowerCase() === studentName.toLowerCase() && u.role === 'student' && u.classId === targetClass.id);

    if (!user) {
        user = {
            id: 's_' + Date.now(),
            name: studentName,
            role: 'student',
            classId: targetClass.id,
            xp: 0,
            currency: 0,
            level: 1,
            inventory: ['col_default', 'av_1', 'skin_sparky'],
            achievements: [],
            equipped: { avatar: 'av_1', droneColor: '#00f3ff', mascotSkin: 'skin_sparky' }
        };
        await fbSaveUser(user);
    }

    if (!targetClass.studentIds) targetClass.studentIds = [];
    if (!targetClass.studentIds.includes(user.id)) {
        targetClass.studentIds.push(user.id);
        await fbUpdateClassroom(targetClass);
    }

    return { success: true, user };
};

export const createTaskForClass = (classId: string, task: Task) => {
    const customTask = { ...task, courseId: 'course_grade3' }; 
    const tasks = getCustomTasks();
    tasks.push(customTask);
    saveCustomTasks(tasks);
}

// --- TASK PROGRESS PERSISTENCE (localStorage — per-device) ---

export const getTaskProgress = (userId: string): Record<string, 'open' | 'completed' | 'locked'> => {
    const key = `${TASK_PROGRESS_PREFIX}${userId}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {};
};

export const saveTaskProgress = (userId: string, progress: Record<string, 'open' | 'completed' | 'locked'>): void => {
    const key = `${TASK_PROGRESS_PREFIX}${userId}`;
    localStorage.setItem(key, JSON.stringify(progress));
};

// --- FAILED-ATTEMPT COUNTERS (localStorage — per-device) ---
// Живут, пока задача не сдана; не сбрасываются при перезаходе в урок.

const TASK_ATTEMPTS_PREFIX = 'task_attempts_';

export const getTaskAttempts = (userId: string): Record<string, number> => {
    const key = `${TASK_ATTEMPTS_PREFIX}${userId}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {};
};

export const saveTaskAttempts = (userId: string, attempts: Record<string, number>): void => {
    const key = `${TASK_ATTEMPTS_PREFIX}${userId}`;
    localStorage.setItem(key, JSON.stringify(attempts));
};

// --- DATA FETCHING ---

export const getAllTasks = (userId?: string): Task[] => {
    const custom = getCustomTasks();
    const allTasks = [...MOCK_TASKS, ...custom];
    if (!userId) return allTasks;
    const progress = getTaskProgress(userId);
    return allTasks.map(t => ({
        ...t,
        status: progress[t.id] ?? t.status
    }));
}

export const getCoursesWithProgress = (tasks: Task[], hiddenCourseIds?: string[]): any[] => {
    return COURSES
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
    const users = await getUsers();
    const user = users.find(u => u.id === userId);
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

    const users = await getUsers();
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
        // Use Firebase-stored completedTaskIds (cross-device), fallback to localStorage
        const firebaseCompleted = s.completedTaskIds || [];
        const localProgress = getTaskProgress(s.id);
        const localCompletedIds = Object.entries(localProgress)
            .filter(([, v]) => v === 'completed')
            .map(([k]) => k);
        
        // Merge: use whichever source has more completed tasks (Firebase is authoritative if populated)
        const completedIds = firebaseCompleted.length >= localCompletedIds.length 
            ? firebaseCompleted 
            : localCompletedIds;
        const completedSet = new Set(completedIds);
        
        const tasksCompleted = completedIds.length;
        const totalTasks = MOCK_TASKS.length;

        // Last active: prefer Firebase data, fallback to localStorage streak
        let lastActive = 'Неизвестно';
        const lastActiveDate = s.lastActiveDate || getStreak(s.id).lastActiveDate;
        if (lastActiveDate) {
            const today = new Date();
            const last = new Date(lastActiveDate);
            const diffMs = today.getTime() - last.getTime();
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            if (diffDays === 0) lastActive = 'Сегодня';
            else if (diffDays === 1) lastActive = 'Вчера';
            else if (diffDays < 7) lastActive = `${diffDays} дн. назад`;
            else lastActive = `${Math.floor(diffDays / 7)} нед. назад`;
        }

        // Streak: prefer Firebase, fallback to localStorage
        const streak = (s.streak !== undefined) ? s.streak : getStreak(s.id).currentStreak;

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
    const d = new Date();
    return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};

export const getStreak = (userId: string): StreakData => {
    const key = `${STREAK_PREFIX}${userId}`;
    const saved = localStorage.getItem(key);
    const today = getTodayStr();
    if (saved) {
        const data: StreakData = JSON.parse(saved);
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
    localStorage.setItem(key, JSON.stringify(streak));
    return streak;
};

// --- FANTASY ---
export const getFantasyProgress = (userId: string) => {
    const key = `${FANTASY_PROGRESS_PREFIX}${userId}`;
    const saved = localStorage.getItem(key);
    if (saved) return JSON.parse(saved);
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
    localStorage.setItem(`${FANTASY_PROGRESS_PREFIX}${userId}`, JSON.stringify(updated));
    return updated;
};
