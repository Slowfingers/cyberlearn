
export type Role = 'teacher' | 'student' | null;

export interface Classroom {
  id: string;
  name: string;
  teacherId: string;
  inviteCode: string;
  studentIds: string[];
  hiddenCourses?: string[];
  folder?: string;
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
  type: 'avatar' | 'droneColor' | 'mascotSkin' | 'avatarFrame';
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
  role: Role;
  classId?: string;
  helpRequestedAt?: string;
  helpTaskId?: string;
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
    mascotSkin?: string;
    avatarFrame?: string;
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

export type TaskType =
  | 'assessment' | 'grid' | 'quiz' | 'theory' | 'html' | 'terminal' | 'hanoi' | 'blocks'
  // Интерактивные тренажёры школьного курса (3-7 класс)
  | 'typing' | 'process_manager' | 'spreadsheet' | 'sorting' | 'tree_search'
  | 'phishing_detect' | 'ai_neuron' | 'network_route' | 'file_organizer'
  | 'binary_switches' | 'binary_bulbs' | 'wireframe_builder' | 'circuit_builder' | 'fake_detector'
  | 'ai_kids_trainer'
  // Алиасы совместимости со старыми данными
  | 'circuit' | 'ai_trainer';

export interface LessonGuide {
  mentorQuestion?: {
    prompt: string;
    options: { text: string; feedback: string }[];
    correct: number;
  };
  topic?: string;
  concept: string;
  explanation: string;
  example: string;
  goal: string;
  steps: string[];
  success: string;
  reflection: string;
  starterCode?: string;
  commands?: { code: string; meaning: string }[];
}

export interface Task {
  assessment?: {published:boolean;questions:AssessmentQuestion[]};
  lesson?: LessonGuide;
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
      interaction?: { inputId: string; buttonId: string; listId: string };
      targetTag?: string; 
      targetStyle?: string; 
      previewScale?: number;
  };

  // For 'terminal' only
  terminalConfig?: {
      fileSystem: string; // JSON structure description for AI context
      goalCommand: string; // e.g., "cat secret.txt"
  };
  terminalOutput?: string; // expected output for print-based terminal tasks
  terminalTests?: string; // Additional checks run inside the isolated Python worker.
  terminalSetup?: string; // Authored SQL fixture, recreated for every execution.

  // For 'typing' (variant used in grades 3-5)
  typingData?: {
      text: string;
      targetWPM?: number;
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

  // Интерактивные тренажёры школьного курса
  typingConfig?: {
      targetText: string;
      allowedMistakes?: number;
      targetWPM?: number;
  };

  processConfig?: {
      targetKillNames: string[];
  };

  spreadsheetConfig?: {
      tableData: { id: string; name: string; val1: number; val2: number; formulaResult?: string | number }[];
      targetFormula: string;
      formulaType: 'sum' | 'if' | 'vlookup' | 'multiply';
  };

  sortingConfig?: {
      numbers: number[];
      algorithm: 'bubble' | 'merge';
  };

  treeConfig?: {
      target: number;
      tree: { value: number; left?: any; right?: any };
  };

  phishingConfig?: {
      sender?: string;         // отображаемый адрес отправителя (подозрительный)
      senderName?: string;     // имя отправителя
      subject?: string;
      body?: string;           // параграфы текста письма через \n
      urgencyText?: string;    // текст блока психологического давления
      linkText?: string;       // отображаемый URL ссылки
      linkReal?: string;       // реальный URL, куда ведёт ссылка
      attachmentName?: string; // имя опасного вложения
      threatCount?: number;
      // id привязан к кликабельной зоне письма: sender | urgency | hidden_link | attachment
      threats?: { id: string; label: string; explanation: string }[];
  };

  neuronConfig?: {
      targetWeight1: number;
      targetWeight2: number;
      threshold: number;
      featureNames?: { x1: string; x2: string };  // подписи входных признаков
      samples?: { id: number; label: string; x1: number; x2: number; target: number }[];
  };

  networkConfig?: {
      startNode: string;       // id стартового узла (напр. 'client')
      endNode: string;         // id конечного узла (напр. 'server')
      maxLatencyMs?: number;   // порог задержки для победы (default 50)
      nodes?: { id: string; label: string; x: number; y: number; status: 'online' | 'overloaded' }[];
      edges?: { from: string; to: string; latencyMs: number }[];
  };

  fileConfig?: any;
  binaryConfig?: any;

  // wireframe_builder: виджеты, доступные для перетаскивания на слоты экрана
  wireframeConfig?: {
      widgets?: { id: string; name: string; slot: 'header' | 'hero' | 'action' | 'footer'; icon: string; desc: string }[];
      // Краткая запись: какие слоты экрана нужно заполнить ('canvas' -> hero, 'controls' -> action)
      requiredElements?: string[];
  };

  // circuit_builder: последовательность уровней-вентилей
  circuitConfig?: {
      gates?: ('and' | 'or' | 'xor' | 'nand')[];
      // Краткая запись одного уровня (регистр любой): gate / targetGate
      gate?: string;
      targetGate?: string;
      targetOutput?: boolean;
      expectedOutput?: boolean;
  };

  // fake_detector: карточки-кейсы «правда или фейк/опасно»
  fakeDetectorConfig?: {
      decisionMode?: 'verification';
      cases?: {
          id: string;
          icon: string;
          title: string;
          text: string;
          isDangerOrFake: boolean;
          teacherHint: string;
          explanation: string;
      }[];
      // Краткая запись одного кейса
      claim?: string;
      isFake?: boolean;
      explanation?: string;
  };

  // ai_kids_trainer: обучающие карточки для сортировки по двум категориям
  aiTrainerConfig?: {
      categoryNames?: { cat: string; dog: string }; // подписи двух корзин
      cards?: { id: string; name: string; icon: string; category: 'cat' | 'dog' }[];
      testCards?: { id: string; name: string; icon: string; category: 'cat' | 'dog' }[];
      review?: {question:string;options:string[];correctIndex:number;explanation:string};
      targetClass?: string;
      samplesNeeded?: number;
  };

  hint?: string;
  difficulty: 'Новичок' | 'Хакер' | 'Элита' | 'Легенда';
  xpReward: number;
  currencyReward: number; // New reward
  status: 'locked' | 'open' | 'completed';
}

export type GridHeading = 'E' | 'S' | 'W' | 'N';
export type GridActionType = 'move' | 'attack' | 'jump' | 'turn';

export interface GridEvent {
    type: GridActionType;
    heading?: GridHeading;
    x: number; // Actor position
    y: number;
    targetX?: number; // Target for attack/jump land
    targetY?: number;
}

export interface ExecutionResult {
  success: boolean;
  logs: string[];
  steps: [number, number][];
  gridEvents?: GridEvent[];
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
  // Activity monitoring metrics
  totalTabSwitches: number;
  avgErrorsPerTask: number;
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
export interface AssessmentQuestion {
 id:string;
 type:'choice'|'open'|'short';
 prompt:string;
 points:number;
 options?:string[];
 correctIndex?:number;
 expectedAnswer?:string;
}
export interface AssessmentSubmission {
 id:string;taskId:string;studentId:string;studentName:string;classId:string;
 answers:Record<string,string>;submittedAt:string;
 grades:Record<string,{points:number|null;comment:string}>;
}
