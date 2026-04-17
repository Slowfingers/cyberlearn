
export type Role = 'teacher' | 'student' | null;

export interface Classroom {
  id: string;
  name: string;
  teacherId: string;
  inviteCode: string;
  studentIds: string[];
  hiddenCourses?: string[];
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string; 
  condition: string;
  type?: 'cyber'; 
}

export interface CosmeticItem {
  id: string;
  type: 'avatar' | 'droneColor';
  name: string;
  value: string; 
  unlockLevel: number;
  cost: number; // Price in Bits
}

export interface TaskAttempt {
  taskId: string;
  timestamp: string;
  errors: number;
  tabSwitches: number;
  duration: number; // seconds
  success: boolean;
}

export interface User {
  id: string;
  name: string;
  password?: string;
  role: Role;
  classId?: string; 
  xp: number;
  currency: number; // New: Bits balance
  level: number;
  tasksCompleted?: number;
  totalErrors?: number;
  completedTaskIds?: string[];
  lastActiveDate?: string;
  streak?: number;
  inventory: string[]; 
  achievements: string[]; 
  equipped: {
    avatar: string;
    droneColor: string;
  };
  taskAttempts?: TaskAttempt[]; // Detailed attempt history
  suspiciousActivity?: {
    totalTabSwitches: number;
    highErrorTasks: string[]; // task IDs with >10 errors
  };
}

export interface Course {
  id: string;
  title: string;
  description: string;
  icon: string; 
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'active' | 'locked' | 'coming_soon';
  totalModules: number;
  color: string; 
}

export type TaskType = 'grid' | 'quiz' | 'theory' | 'html' | 'terminal' | 'hanoi' | 'blocks';

export interface Task {
  id: string;
  courseId: string; 
  module: string; 
  title: string;
  type: TaskType;
  description: string;
  
  // For 'theory', 'grid', 'html', 'terminal'
  theory?: string; 
  
  // For 'grid' only
  allowedCommands?: string[]; 
  initialCode?: string;
  mapConfig?: {
    gridSize: number; 
    start: [number, number]; 
    end: [number, number];
    obstacles: [number, number][];
  };

  // For 'quiz' only
  quizData?: {
      question: string;
      options: string[];
      correctIndex: number;
      explanation?: string;
  };
  
  // For 'html' only
  htmlConfig?: {
      targetTag?: string; 
      targetStyle?: string; 
      previewScale?: number;
  };

  // For 'terminal' only
  terminalConfig?: {
      fileSystem: string; // JSON structure description for AI context
      goalCommand: string; // e.g., "cat secret.txt"
  };

  // For 'hanoi' only
  hanoiConfig?: {
      disks: number;
  };

  // For 'blocks' only (drag-and-drop block coding for kids)
  blocksConfig?: {
      availableBlocks: string[];   // blocks the kid can choose from
      correctSequence: string[];   // correct order of blocks
      theme?: string;              // visual theme: 'robot' | 'recipe' | 'morning'
      successMessage?: string;     // shown on completion
      illustration?: string;       // HTML visual hint (grid map, diagram, etc.)
      gridMap?: {                  // Visual grid with path dots (CodeCombat style)
          cols: number;
          rows: number;
          start: [number, number];   // [row, col]
          goal: [number, number];
          path: [number, number][];  // intermediate waypoints
          obstacles?: [number, number][];
      };
  };

  difficulty: 'Новичок' | 'Хакер' | 'Элита' | 'Легенда';
  xpReward: number;
  currencyReward: number; // New reward
  status: 'locked' | 'open' | 'completed';
}

export interface ExecutionResult {
  success: boolean;
  logs: string[];
  steps: [number, number][]; 
  error?: string;
  feedback?: string;
  terminalOutput?: string; // For terminal tasks
}

export interface StudentProgress {
  studentId: string;
  name: string;
  tasksCompleted: number;
  totalTasks: number;
  totalXP: number;
  totalErrors: number;
  level: number;
  lastActive: string;
  streak: number;
  courseProgress: { courseId: string; title: string; completed: number; total: number; color: string }[];
  skills: {
    loops: number;
    variables: number;
    logic: number;
  };
  // New: Cheating detection metrics
  totalTabSwitches: number;
  avgErrorsPerTask: number;
  suspiciousTaskCount: number; // tasks with >10 errors or >5 tab switches
  recentAttempts?: TaskAttempt[]; // Last 10 attempts
}

export interface ComicScene {
  id: string;
  type: 'narrative' | 'dialogue' | 'success';
  text: string;
  visual: string;
  speaker?: string;
  bgStyle?: string;
  interactionType?: 'choice' | 'word_bank' | 'text_input';
  question?: string;
  options?: string[];
  correctKeywords?: string[];
  correctOrder?: string[];
}

export interface ComicChapter {
  id: string;
  title: string;
  author: string;
  scenes: ComicScene[];
  mapPosition?: { x: number; y: number };
}

export interface FantasyProgress {
    userId: string;
    ink: number;
    feathers: number;
    chaptersCompleted: string[];
}
