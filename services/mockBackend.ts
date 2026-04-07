
import { User, Classroom, StudentProgress, Task, Course } from "../types";
import { MOCK_STUDENTS, LEVEL_THRESHOLDS, MOCK_TASKS, COURSES, COSMETICS } from "../constants";

const USERS_KEY = 'cyberlearn_users';
const CLASSES_KEY = 'cyberlearn_classes';
const TASKS_KEY = 'cyberlearn_tasks';
const TASK_PROGRESS_PREFIX = 'task_progress_';
const FANTASY_PROGRESS_PREFIX = 'fantasy_progress_';

// ... (Helper functions remain same)

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

// --- DATA ACCESS ---

export const getUsers = (): User[] => {
    const data = localStorage.getItem(USERS_KEY);
    return data ? JSON.parse(data) : [];
};

export const getClassrooms = (): Classroom[] => {
    const data = localStorage.getItem(CLASSES_KEY);
    if (!data) {
        // Инициализация тестового класса для разработки
        const testClass: Classroom = {
            id: 'c_demo',
            teacherId: 'demo_teacher',
            name: 'Демо-класс',
            inviteCode: 'DEMO-01',
            studentIds: []
        };
        const classes = [testClass];
        localStorage.setItem(CLASSES_KEY, JSON.stringify(classes));
        return classes;
    }
    return JSON.parse(data);
};

export const getTeacherClasses = (teacherId: string): Classroom[] => {
    const classes = getClassrooms();
    return classes.filter(c => c.teacherId === teacherId);
};

export const getCustomTasks = (): Task[] => {
    const data = localStorage.getItem(TASKS_KEY);
    return data ? JSON.parse(data) : [];
}

export const saveUsers = (users: User[]) => localStorage.setItem(USERS_KEY, JSON.stringify(users));
const saveClasses = (classes: Classroom[]) => localStorage.setItem(CLASSES_KEY, JSON.stringify(classes));
const saveCustomTasks = (tasks: Task[]) => localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));

export const updateUserProfile = (updatedUser: User): void => {
    let users = getUsers();
    users = users.map(u => u.id === updatedUser.id ? updatedUser : u);
    saveUsers(users);
};

// --- MARKET ACTIONS ---

export const buyItem = (userId: string, itemId: string): { success: boolean, user?: User, error?: string } => {
    let users = getUsers();
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

    saveUsers(users.map(u => u.id === userId ? user! : u));
    return { success: true, user };
};

export const equipItem = (userId: string, itemId: string): { success: boolean, user?: User } => {
    let users = getUsers();
    let user = users.find(u => u.id === userId);
    if (!user) return { success: false };

    const item = COSMETICS.find(c => c.id === itemId);
    if (!item) return { success: false };

    if (item.type === 'avatar') user.equipped.avatar = itemId;
    if (item.type === 'droneColor') user.equipped.droneColor = itemId;

    saveUsers(users.map(u => u.id === userId ? user! : u));
    return { success: true, user };
};

// --- AUTH ACTIONS ---

export const loginOrRegisterTeacher = (name: string, password?: string): { success: boolean, user?: User, classrooms?: Classroom[], error?: string } => {
    let users = getUsers();
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
        users.push(user);
        saveUsers(users);
    } else {
        if (user.password && user.password !== password) {
            return { success: false, error: "Неверный пароль" };
        } else if (!user.password && password) {
            // For backward compatibility: if old user doesn't have a password but tries to login with one, set it.
            // Or maybe just allow it or set it. Let's just set it.
            user.password = password;
            saveUsers(users.map(u => u.id === user!.id ? user! : u));
        }
    }
    const classrooms = getTeacherClasses(user.id);
    return { success: true, user, classrooms };
};

export const createClassroom = (teacherId: string, className: string): Classroom => {
    const classes = getClassrooms();
    const newClass: Classroom = {
        id: 'c_' + Date.now(),
        teacherId,
        name: className,
        inviteCode: generateInviteCode(),
        studentIds: []
    };
    classes.push(newClass);
    saveClasses(classes);
    return newClass;
};

export const deleteClassroom = (classId: string): boolean => {
    const classes = getClassrooms();
    const filtered = classes.filter(c => c.id !== classId);
    if (filtered.length === classes.length) return false; // Класс не найден
    
    // Удалить студентов из класса
    const users = getUsers();
    const updatedUsers = users.map(u => {
        if (u.classId === classId) {
            return { ...u, classId: undefined };
        }
        return u;
    });
    saveUsers(updatedUsers);
    
    saveClasses(filtered);
    return true;
};

export const joinClassroom = (studentName: string, inviteCode: string): { success: boolean, user?: User, error?: string } => {
    const classes = getClassrooms();
    const normalizedCode = inviteCode.trim().toUpperCase();
    const targetClass = classes.find(c => c.inviteCode.toUpperCase() === normalizedCode);

    if (!targetClass) {
        console.log('Доступные классы:', classes.map(c => ({ name: c.name, code: c.inviteCode })));
        console.log('Введённый код:', normalizedCode);
        return { success: false, error: "Код доступа недействителен." };
    }

    let users = getUsers();
    let user = users.find(u => u.name.toLowerCase() === studentName.toLowerCase() && u.role === 'student');

    if (!user) {
        user = {
            id: 's_' + Date.now(),
            name: studentName,
            role: 'student',
            classId: targetClass.id,
            xp: 0,
            currency: 0,
            level: 1,
            inventory: ['col_default', 'av_1'],
            achievements: [],
            equipped: { avatar: 'av_1', droneColor: '#00f3ff' }
        };
        users.push(user);
    } else {
        user.classId = targetClass.id;
        users = users.map(u => u.id === user!.id ? user! : u);
    }

    if (!targetClass.studentIds.includes(user.id)) {
        targetClass.studentIds.push(user.id);
        const updatedClasses = classes.map(c => c.id === targetClass.id ? targetClass : c);
        saveClasses(updatedClasses);
    }

    saveUsers(users);
    return { success: true, user };
};

export const createTaskForClass = (classId: string, task: Task) => {
    const customTask = { ...task, courseId: 'course_cs101' }; 
    const tasks = getCustomTasks();
    tasks.push(customTask);
    saveCustomTasks(tasks);
}

// --- TASK PROGRESS PERSISTENCE ---

export const getTaskProgress = (userId: string): Record<string, 'open' | 'completed' | 'locked'> => {
    const key = `${TASK_PROGRESS_PREFIX}${userId}`;
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : {};
};

export const saveTaskProgress = (userId: string, progress: Record<string, 'open' | 'completed' | 'locked'>): void => {
    const key = `${TASK_PROGRESS_PREFIX}${userId}`;
    localStorage.setItem(key, JSON.stringify(progress));
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

export const getHiddenCoursesForStudent = (userId: string): string[] => {
    const users = getUsers();
    const user = users.find(u => u.id === userId);
    if (!user?.classId) return [];
    const classes = getClassrooms();
    const cls = classes.find(c => c.id === user.classId);
    return cls?.hiddenCourses || [];
};

export const updateClassroom = (updatedClass: Classroom): void => {
    let classes = getClassrooms();
    classes = classes.map(c => c.id === updatedClass.id ? updatedClass : c);
    saveClasses(classes);
};

export const getClassStudents = (classId: string): StudentProgress[] => {
    const classes = getClassrooms();
    const targetClass = classes.find(c => c.id === classId);
    if (!targetClass) return [];

    const users = getUsers();
    const realStudents = users.filter(u => targetClass.studentIds.includes(u.id));

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
        const progress = getTaskProgress(s.id);
        const tasksCompleted = Object.values(progress).filter(v => v === 'completed').length;
        const totalTasks = MOCK_TASKS.length;

        // Streak data
        const streakData = getStreak(s.id);
        
        // Last active
        let lastActive = 'Неизвестно';
        if (streakData.lastActiveDate) {
            const today = new Date();
            const last = new Date(streakData.lastActiveDate);
            const diffMs = today.getTime() - last.getTime();
            const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
            if (diffDays === 0) lastActive = 'Сегодня';
            else if (diffDays === 1) lastActive = 'Вчера';
            else if (diffDays < 7) lastActive = `${diffDays} дн. назад`;
            else lastActive = `${Math.floor(diffDays / 7)} нед. назад`;
        }

        // Per-course progress
        const courseProgress = Object.values(allCourseTasks).map(c => {
            const completed = c.taskIds.filter(tid => progress[tid] === 'completed').length;
            return { courseId: c.courseId, title: c.title, completed, total: c.taskIds.length, color: c.color };
        });

        return {
            studentId: s.id,
            name: s.name,
            tasksCompleted,
            totalTasks,
            totalXP: s.xp || 0,
            level: s.level || 1,
            lastActive,
            streak: streakData.currentStreak,
            courseProgress,
            skills: { loops: 50, variables: 50, logic: 50 }
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
