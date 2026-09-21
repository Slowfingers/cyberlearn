import React, { useState, useRef } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Trash2, Image, Music, FileText, CheckCircle2, AlertTriangle, Sparkles, RotateCcw, Move, BookOpen, ChevronDown, ChevronUp, Info, Lightbulb } from 'lucide-react';

interface FileItem {
  id: string;
  name: string;
  ext: string;
  type: 'image' | 'music' | 'doc' | 'danger';
  icon: string;
  size: string;
  description: string;
  teacherHint: string;
}

const INITIAL_FILES: FileItem[] = [
  { 
    id: 'f1', 
    name: 'котик_в_очках.png', 
    ext: '.png', 
    type: 'image', 
    icon: '🐱', 
    size: '2.4 МБ',
    description: 'Рисунок милого котика в солнечных очках',
    teacherHint: 'Расширение .png (Portable Network Graphics) — популярный формат картинок с прозрачным фоном. Неси в папку «Рисунки»!'
  },
  { 
    id: 'f2', 
    name: 'песенка_робота.mp3', 
    ext: '.mp3', 
    type: 'music', 
    icon: '🎵', 
    size: '3.1 МБ',
    description: 'Аудиозапись веселой электронной мелодии',
    teacherHint: 'Расширение .mp3 — главный формат цифровой музыки и звуков в мире. Его место в папке «Музыка»!'
  },
  { 
    id: 'f3', 
    name: 'сочинение_про_лето.docx', 
    ext: '.docx', 
    type: 'doc', 
    icon: '📝', 
    size: '150 КБ',
    description: 'Текстовый документ со школьным рассказом',
    teacherHint: 'Расширение .docx — это текстовый документ программы Word. В нем хранятся буквы и абзацы. Место — «Документы»!'
  },
  { 
    id: 'f4', 
    name: 'взлом_игры.exe', 
    ext: '.exe', 
    type: 'danger', 
    icon: '⚠️', 
    size: '990 КБ',
    description: 'Подозрительная программа с обещанием взлома',
    teacherHint: 'Внимание! Расширение .exe означает исполняемую программу (Executable). Если файл обещает «взлом» или скачан с чужого сайта — это вирус! Срочно в «Корзину»!'
  },
  { 
    id: 'f5', 
    name: 'рисунок_ракета.jpg', 
    ext: '.jpg', 
    type: 'image', 
    icon: '🚀', 
    size: '1.8 МБ',
    description: 'Фотография космической ракеты на старте',
    teacherHint: 'Расширение .jpg (JPEG) — стандартный формат для фотографий и цветных рисунков. Отправляй в папку «Рисунки»!'
  },
  { 
    id: 'f6', 
    name: 'звук_победы.wav', 
    ext: '.wav', 
    type: 'music', 
    icon: '🔔', 
    size: '800 КБ',
    description: 'Звуковой эффект торжественного колокольчика',
    teacherHint: 'Расширение .wav — аудиоформат чистой записи звуковых эффектов для игр. Отправь в папку «Музыка»!'
  },
  { 
    id: 'f7', 
    name: 'план_уроков.txt', 
    ext: '.txt', 
    type: 'doc', 
    icon: '📋', 
    size: '45 КБ',
    description: 'Простой текстовый список дел из Блокнота',
    teacherHint: 'Расширение .txt (Text) — самый простой текстовый файл для заметок. Отправь в «Документы»!'
  },
  { 
    id: 'f8', 
    name: 'подозрительный_файл.bat', 
    ext: '.bat', 
    type: 'danger', 
    icon: '👾', 
    size: '12 КБ',
    description: 'Командный скрипт от неизвестного отправителя',
    teacherHint: 'Опасно! Расширение .bat — пакетный командный файл. Чужой .bat может удалить файлы с компьютера. Отправь его в «Корзину»!'
  },
];

type FolderType = 'image' | 'music' | 'doc' | 'danger';

const ALL_FOLDERS: FolderType[] = ['image', 'music', 'doc', 'danger'];

export const FileOrganizerGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  // fileConfig.folders ограничивает набор папок (и файлов) урока; без конфига — все 4
  const configuredFolders: FolderType[] | undefined = task.fileConfig?.folders;
  const activeFolders: FolderType[] = configuredFolders?.length
    ? ALL_FOLDERS.filter(f => configuredFolders.includes(f))
    : ALL_FOLDERS;
  const activeFiles = configuredFolders?.length
    ? INITIAL_FILES.filter(f => activeFolders.includes(f.type))
    : INITIAL_FILES;

  const [unplacedFiles, setUnplacedFiles] = useState<FileItem[]>(activeFiles);
  const [selectedFileId, setSelectedFileId] = useState<string | null>(activeFiles[0].id);
  const [feedback, setFeedback] = useState<{ message: string; isError: boolean } | null>(null);
  const [showGuide, setShowGuide] = useState(true);
  const [folders, setFolders] = useState<Record<FolderType, FileItem[]>>({
    image: [],
    music: [],
    doc: [],
    danger: []
  });
  const [isCompleted, setIsCompleted] = useState(false);

  // Drag states
  const [draggedFile, setDraggedFile] = useState<FileItem | null>(null);
  const [hoveredFolder, setHoveredFolder] = useState<FolderType | null>(null);

  // Touch drag state
  const [touchDraggingFile, setTouchDraggingFile] = useState<FileItem | null>(null);
  const [touchCoords, setTouchCoords] = useState<{ x: number; y: number } | null>(null);
  const touchStartPosRef = useRef<{ x: number; y: number } | null>(null);
  const hasMovedSignificantlyRef = useRef(false);

  const selectedFile = unplacedFiles.find(f => f.id === selectedFileId);

  const processFilePlacement = (file: FileItem, targetFolder: FolderType) => {
    if (file.type === targetFolder) {
      playSound('hit');
      setFolders(prev => ({
        ...prev,
        [targetFolder]: [...prev[targetFolder], file]
      }));
      const remaining = unplacedFiles.filter(f => f.id !== file.id);
      setUnplacedFiles(remaining);
      setSelectedFileId(remaining.length > 0 ? remaining[0].id : null);
      setFeedback({ 
        message: `Учитель: Отлично! Файл «${file.name}» (${file.ext}) на своём месте! ${file.teacherHint}`, 
        isError: false 
      });

      if (remaining.length === 0) {
        playSound('success');
        setIsCompleted(true);
        setTimeout(() => {
          onComplete();
        }, 1200);
      }
    } else {
      playSound('error');
      let tip = '';
      if (file.type === 'danger') {
        tip = `Учитель: Осторожно! Файл «${file.name}» с расширением ${file.ext} — это исполняемая программа, а не документ или музыка. Неизвестные программы с надписью «взлом» могут заразить компьютер вирусом. Срочно отправь его в Корзину 🗑️!`;
      } else if (file.type === 'image') {
        tip = `Учитель: Файл «${file.name}» заканчивается на ${file.ext} — это картинка/фотография. Компьютер хранит рисунки в графических форматах. Перемести его в синюю папку «Рисунки» 🖼️!`;
      } else if (file.type === 'music') {
        tip = `Учитель: Файл «${file.name}» имеет расширение ${file.ext} — это аудиозапись песни или звукового эффекта. Отправь его в фиолетовую папку «Музыка» 🎵!`;
      } else {
        tip = `Учитель: Файл «${file.name}» с расширением ${file.ext} — это текстовый документ (слова и предложения). Его читают глазами в Word или Блокноте. Положи в зелёную папку «Документы» 📄!`;
      }

      setFeedback({ message: tip, isError: true });
    }
  };

  const handlePlaceFile = (targetFolder: FolderType) => {
    if (!selectedFile) return;
    processFilePlacement(selectedFile, targetFolder);
  };

  const handleReset = () => {
    setUnplacedFiles(activeFiles);
    setSelectedFileId(activeFiles[0].id);
    setFolders({ image: [], music: [], doc: [], danger: [] });
    setFeedback(null);
    setIsCompleted(false);
    setDraggedFile(null);
    setHoveredFolder(null);
    setTouchDraggingFile(null);
    setTouchCoords(null);
  };

  // Touch handlers for mobile / tablet drag-and-drop
  const handleTouchStart = (e: React.TouchEvent, file: FileItem) => {
    const touch = e.touches[0];
    touchStartPosRef.current = { x: touch.clientX, y: touch.clientY };
    hasMovedSignificantlyRef.current = false;
    setSelectedFileId(file.id);
  };

  const handleTouchMove = (e: React.TouchEvent, file: FileItem) => {
    const touch = e.touches[0];
    if (!touchStartPosRef.current) return;

    const dx = Math.abs(touch.clientX - touchStartPosRef.current.x);
    const dy = Math.abs(touch.clientY - touchStartPosRef.current.y);

    if (dx > 8 || dy > 8) {
      hasMovedSignificantlyRef.current = true;
      setTouchDraggingFile(file);
      setTouchCoords({ x: touch.clientX, y: touch.clientY });

      // Detect folder element under finger
      const elem = document.elementFromPoint(touch.clientX, touch.clientY);
      const folderTarget = elem?.closest('[data-folder-type]') as HTMLElement | null;
      if (folderTarget) {
        const fType = folderTarget.getAttribute('data-folder-type') as FolderType;
        if (fType) {
          setHoveredFolder(fType);
        }
      } else {
        setHoveredFolder(null);
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent, file: FileItem) => {
    if (hasMovedSignificantlyRef.current && touchCoords) {
      // Find folder element under touch release point
      const elem = document.elementFromPoint(touchCoords.x, touchCoords.y);
      const folderTarget = elem?.closest('[data-folder-type]') as HTMLElement | null;
      if (folderTarget) {
        const fType = folderTarget.getAttribute('data-folder-type') as FolderType;
        if (fType) {
          processFilePlacement(file, fType);
        }
      }
    } else {
      // Just a tap: select file
      playSound('click');
      setSelectedFileId(file.id);
    }

    touchStartPosRef.current = null;
    hasMovedSignificantlyRef.current = false;
    setTouchDraggingFile(null);
    setTouchCoords(null);
    setHoveredFolder(null);
  };

  return (
    <div className="h-full flex flex-col bg-slate-950 p-4 select-none text-white overflow-y-auto relative">
      {/* Top Banner */}
      <div className="flex items-center justify-between bg-slate-900/90 border-2 border-cyan-500/40 p-4 rounded-2xl mb-3 shadow-lg">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-cyan-500/20 border border-cyan-400 flex items-center justify-center text-2xl animate-pulse">
            🗂️
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-bold text-cyan-300">Наведи порядок на рабочем столе!</h2>
            <p className="text-xs text-slate-300 flex items-center gap-1.5 flex-wrap">
              <span className="text-cyan-400 font-bold">👉 Перетаскивай файлы мышкой в папки</span>
              <span className="text-slate-500">или кликай: файл → папка</span>
            </p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setShowGuide(!showGuide)}
            className="px-3 py-1.5 bg-yellow-500/20 hover:bg-yellow-500/30 border border-yellow-400/60 rounded-xl text-yellow-300 font-bold text-xs flex items-center gap-1.5 transition-colors"
          >
            <BookOpen size={15} />
            <span>{showGuide ? 'Скрыть памятку' : '🎓 Памятка учителя'}</span>
            {showGuide ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
          <div className="px-3 py-1.5 bg-cyan-950 border border-cyan-500/50 rounded-xl text-cyan-300 font-bold text-sm shadow-inner">
            Осталось: {unplacedFiles.length} из {activeFiles.length}
          </div>
          <button 
            onClick={handleReset}
            className="p-2 bg-slate-800 hover:bg-slate-700 rounded-xl text-slate-400 hover:text-white transition-colors"
            title="Сбросить"
          >
            <RotateCcw size={18} />
          </button>
        </div>
      </div>

      {/* TEACHER CHEAT SHEET: HOW TO DISTINGUISH FILE FORMATS */}
      {showGuide && (
        <div className="mb-4 bg-gradient-to-r from-slate-900 via-slate-900/95 to-slate-900 border-2 border-yellow-500/50 rounded-2xl p-4 shadow-xl text-xs">
          <div className="flex items-center justify-between mb-3 border-b border-yellow-500/30 pb-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">🎓</span>
              <div>
                <h3 className="text-sm font-bold text-yellow-300 flex items-center gap-2">
                  Урок от Учителя: Как компьютер отличает форматы файлов?
                </h3>
                <p className="text-[11px] text-slate-300">
                  У каждого файла есть <strong>Имя</strong> и <strong>«Фамилия» (Расширение)</strong>, разделённые точкой: <code className="bg-black/60 px-1.5 py-0.5 rounded text-cyan-300 font-mono">котик.png</code>
                </p>
              </div>
            </div>
            <span className="text-[10px] uppercase font-bold text-yellow-400 tracking-wider bg-yellow-950/60 px-2 py-1 rounded border border-yellow-500/40">
              Шпаргалка 3 класса
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
            {/* Image Guide */}
            <div className="bg-blue-950/50 border border-blue-500/40 rounded-xl p-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-blue-300 text-xs">
                <span className="text-xl">🖼️</span>
                <span>Папка «Рисунки»</span>
              </div>
              <div className="flex gap-1">
                <span className="px-1.5 py-0.5 bg-blue-900/90 text-cyan-300 rounded font-mono font-bold text-[10px]">.png</span>
                <span className="px-1.5 py-0.5 bg-blue-900/90 text-cyan-300 rounded font-mono font-bold text-[10px]">.jpg</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Рисунки, обои, фото с камеры, картинки из Paint. Внутри — цветные точки (пиксели).
              </p>
            </div>

            {/* Music Guide */}
            <div className="bg-purple-950/50 border border-purple-500/40 rounded-xl p-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-purple-300 text-xs">
                <span className="text-xl">🎵</span>
                <span>Папка «Музыка»</span>
              </div>
              <div className="flex gap-1">
                <span className="px-1.5 py-0.5 bg-purple-900/90 text-purple-300 rounded font-mono font-bold text-[10px]">.mp3</span>
                <span className="px-1.5 py-0.5 bg-purple-900/90 text-purple-300 rounded font-mono font-bold text-[10px]">.wav</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Песенки, мелодии, звуки прыжков робота. Внутри — цифровая звуковая волна.
              </p>
            </div>

            {/* Documents Guide */}
            <div className="bg-emerald-950/50 border border-emerald-500/40 rounded-xl p-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-emerald-300 text-xs">
                <span className="text-xl">📄</span>
                <span>Папка «Документы»</span>
              </div>
              <div className="flex gap-1">
                <span className="px-1.5 py-0.5 bg-emerald-900/90 text-emerald-300 rounded font-mono font-bold text-[10px]">.docx</span>
                <span className="px-1.5 py-0.5 bg-emerald-900/90 text-emerald-300 rounded font-mono font-bold text-[10px]">.txt</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Сказки, школьные сочинения, доклады, списки дел из Word и Блокнота. Внутри — текст.
              </p>
            </div>

            {/* Danger / Trash Guide */}
            <div className="bg-rose-950/50 border border-rose-500/40 rounded-xl p-3 flex flex-col gap-1.5">
              <div className="flex items-center gap-2 font-bold text-rose-300 text-xs">
                <span className="text-xl">🗑️</span>
                <span>Папка «Корзина»</span>
              </div>
              <div className="flex gap-1">
                <span className="px-1.5 py-0.5 bg-rose-900/90 text-rose-300 rounded font-mono font-bold text-[10px]">.exe</span>
                <span className="px-1.5 py-0.5 bg-rose-900/90 text-rose-300 rounded font-mono font-bold text-[10px]">.bat</span>
              </div>
              <p className="text-[11px] text-slate-300 leading-tight">
                Исполняемые программы! Если скачаны не из магазина или обещают «взлом» — это вирусы.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* SELECTED FILE TEACHER INSPECTOR */}
      {selectedFile && (
        <div className="mb-3 p-3 bg-slate-900/90 border border-cyan-500/40 rounded-xl flex items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3 min-w-0">
            <span className="text-3xl shrink-0 p-1.5 bg-black/40 rounded-lg border border-slate-700">
              {selectedFile.icon}
            </span>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="font-bold text-white truncate text-sm">{selectedFile.name}</span>
                <span className={`px-2 py-0.5 rounded font-mono font-bold text-[11px] ${
                  selectedFile.type === 'image' ? 'bg-blue-900 text-blue-200 border border-blue-500' :
                  selectedFile.type === 'music' ? 'bg-purple-900 text-purple-200 border border-purple-500' :
                  selectedFile.type === 'doc' ? 'bg-emerald-900 text-emerald-200 border border-emerald-500' :
                  'bg-rose-900 text-rose-200 border border-rose-500'
                }`}>
                  {selectedFile.ext}
                </span>
                <span className="text-[10px] text-slate-400">({selectedFile.size})</span>
              </div>
              <div className="text-[11px] text-yellow-300/90 mt-0.5 flex items-center gap-1">
                <Lightbulb size={13} className="shrink-0 text-yellow-400" />
                <span><strong>Совет учителя:</strong> {selectedFile.teacherHint}</span>
              </div>
            </div>
          </div>

          <div className="shrink-0 text-right hidden sm:block">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider">Куда нести:</div>
            <div className={`font-bold text-xs ${
              selectedFile.type === 'image' ? 'text-blue-400' :
              selectedFile.type === 'music' ? 'text-purple-400' :
              selectedFile.type === 'doc' ? 'text-emerald-400' :
              'text-rose-400'
            }`}>
              {selectedFile.type === 'image' && '🖼️ В «Рисунки»'}
              {selectedFile.type === 'music' && '🎵 В «Музыка»'}
              {selectedFile.type === 'doc' && '📄 В «Документы»'}
              {selectedFile.type === 'danger' && '🗑️ В «Корзина»'}
            </div>
          </div>
        </div>
      )}

      {/* Instructions / Drag Alert */}
      <div className="mb-3 px-3 py-2 bg-cyan-950/40 border border-cyan-500/30 rounded-xl flex items-center justify-between text-xs text-cyan-200">
        <div className="flex items-center gap-2">
          <Move size={15} className="text-cyan-400 animate-bounce" />
          <span><strong>Подсказка:</strong> Зажми файл и тяни прямо в нужную папку! Либо выдели файл и кликни по папке.</span>
        </div>
        {draggedFile && (
          <span className="px-2 py-0.5 bg-cyan-500 text-black font-bold rounded text-[10px] animate-pulse">
            Тянем «{draggedFile.name}»...
          </span>
        )}
      </div>

      {/* Feedback Alert */}
      {feedback && (
        <div className={`p-3 mb-3 rounded-xl border flex items-center gap-3 text-xs md:text-sm font-bold transition-all ${
          feedback.isError 
            ? 'bg-red-950/80 border-red-500 text-red-200 animate-bounce' 
            : 'bg-emerald-950/80 border-emerald-400 text-emerald-200'
        }`}>
          {feedback.isError ? <AlertTriangle size={20} className="shrink-0 text-red-400" /> : <Sparkles size={20} className="shrink-0 text-emerald-400" />}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Main Game Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-1">
        {/* Left: Files to Sort */}
        <div className="bg-slate-900/60 border border-slate-800 p-4 rounded-2xl flex flex-col">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-3 flex items-center justify-between">
            <span>Файлы в беспорядке:</span>
            <span className="text-[10px] text-slate-400 font-mono">🖱️ Зажми и тащи</span>
          </div>

          {unplacedFiles.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-emerald-400">
              <CheckCircle2 size={56} className="animate-pulse mb-3" />
              <div className="text-xl font-bold">Идеальный порядок!</div>
              <p className="text-xs text-slate-300 mt-1">Все файлы успешно рассортированы по своим папкам!</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2.5 overflow-y-auto max-h-[360px] pr-1">
              {unplacedFiles.map((file) => {
                const isSelected = selectedFileId === file.id;
                const isBeingDragged = draggedFile?.id === file.id || touchDraggingFile?.id === file.id;

                return (
                  <div
                    key={file.id}
                    draggable={true}
                    onDragStart={(e) => {
                      setDraggedFile(file);
                      setSelectedFileId(file.id);
                      e.dataTransfer.setData('text/plain', file.id);
                      e.dataTransfer.effectAllowed = 'move';
                      playSound('click');
                    }}
                    onDragEnd={() => {
                      setDraggedFile(null);
                      setHoveredFolder(null);
                    }}
                    onTouchStart={(e) => handleTouchStart(e, file)}
                    onTouchMove={(e) => handleTouchMove(e, file)}
                    onTouchEnd={(e) => handleTouchEnd(e, file)}
                    onClick={() => {
                      playSound('click');
                      setSelectedFileId(file.id);
                    }}
                    className={`p-3 rounded-xl border text-left flex items-center gap-3 transition-all duration-150 cursor-grab active:cursor-grabbing transform active:scale-95 select-none ${
                      isBeingDragged
                        ? 'opacity-40 scale-95 border-dashed border-cyan-400 bg-cyan-950/50'
                        : isSelected
                        ? 'bg-cyan-500/20 border-cyan-400 text-white shadow-[0_0_15px_rgba(6,182,212,0.3)] scale-[1.02]'
                        : 'bg-slate-800/80 border-slate-700/60 text-slate-300 hover:bg-slate-700/80 hover:border-slate-500'
                    }`}
                  >
                    <span className="text-2xl shrink-0 group-hover:scale-110 transition-transform">{file.icon}</span>
                    <div className="min-w-0 flex-1 pointer-events-none">
                      <div className="text-xs font-bold truncate">{file.name}</div>
                      <div className="text-[10px] text-slate-400 font-mono mt-0.5 flex items-center gap-1.5">
                        <span className="px-1.5 py-0.2 bg-slate-900 rounded text-cyan-300 font-semibold">{file.ext}</span>
                        <span>{file.size}</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Right: Target Folders / Drop Zones */}
        <div className="flex flex-col gap-3">
          <div className="text-xs font-bold text-cyan-400 uppercase tracking-wider mb-1 flex items-center justify-between">
            <span>Куда перетащить файл:</span>
            {selectedFile && (
              <span className="text-[11px] text-yellow-300 font-normal">
                Выбран: <strong>{selectedFile.name}</strong>
              </span>
            )}
          </div>

          <div className="grid grid-cols-2 gap-3 flex-1">
            {/* Images Folder */}
            {activeFolders.includes('image') && (
            <div
              data-folder-type="image"
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (hoveredFolder !== 'image') setHoveredFolder('image');
              }}
              onDragLeave={(e) => {
                if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                if (hoveredFolder === 'image') setHoveredFolder(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setHoveredFolder(null);
                const fId = e.dataTransfer.getData('text/plain') || draggedFile?.id;
                const f = unplacedFiles.find(item => item.id === fId) || draggedFile;
                if (f) processFilePlacement(f, 'image');
                setDraggedFile(null);
              }}
              onClick={() => handlePlaceFile('image')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-center group ${
                hoveredFolder === 'image'
                  ? 'bg-blue-600/40 border-4 border-cyan-400 scale-105 shadow-[0_0_25px_rgba(0,243,255,0.4)] ring-4 ring-cyan-400/30'
                  : 'bg-blue-950/40 hover:bg-blue-900/50 border-2 border-blue-500/50 hover:border-blue-400'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center text-blue-400 group-hover:scale-110 transition-transform">
                <Image size={28} />
              </div>
              <div className="font-bold text-sm text-blue-200">
                {hoveredFolder === 'image' ? '⬇️ БРОСАЙ СЮДА!' : '🖼️ Папка: Рисунки'}
              </div>
              <div className="text-[10px] text-blue-300/80">Для .png, .jpg, картинок</div>
              <div className="text-xs font-mono text-cyan-400 bg-blue-950/80 px-2 py-0.5 rounded-full border border-blue-800">
                {folders.image.length} файлов
              </div>

              {/* Mini icons inside folder */}
              {folders.image.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mt-1">
                  {folders.image.slice(-3).map(f => (
                    <span key={f.id} className="text-[10px] bg-black/50 px-1 py-0.5 rounded text-blue-300 border border-blue-700/50">
                      {f.icon} {f.ext}
                    </span>
                  ))}
                </div>
              )}
            </div>
            )}

            {/* Music Folder */}
            {activeFolders.includes('music') && (
            <div
              data-folder-type="music"
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (hoveredFolder !== 'music') setHoveredFolder('music');
              }}
              onDragLeave={(e) => {
                if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                if (hoveredFolder === 'music') setHoveredFolder(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setHoveredFolder(null);
                const fId = e.dataTransfer.getData('text/plain') || draggedFile?.id;
                const f = unplacedFiles.find(item => item.id === fId) || draggedFile;
                if (f) processFilePlacement(f, 'music');
                setDraggedFile(null);
              }}
              onClick={() => handlePlaceFile('music')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-center group ${
                hoveredFolder === 'music'
                  ? 'bg-purple-600/40 border-4 border-cyan-400 scale-105 shadow-[0_0_25px_rgba(0,243,255,0.4)] ring-4 ring-cyan-400/30'
                  : 'bg-purple-950/40 hover:bg-purple-900/50 border-2 border-purple-500/50 hover:border-purple-400'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center text-purple-400 group-hover:scale-110 transition-transform">
                <Music size={28} />
              </div>
              <div className="font-bold text-sm text-purple-200">
                {hoveredFolder === 'music' ? '⬇️ БРОСАЙ СЮДА!' : '🎵 Папка: Музыка'}
              </div>
              <div className="text-[10px] text-purple-300/80">Для .mp3, .wav, звуков</div>
              <div className="text-xs font-mono text-purple-300 bg-purple-950/80 px-2 py-0.5 rounded-full border border-purple-800">
                {folders.music.length} файлов
              </div>

              {folders.music.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mt-1">
                  {folders.music.slice(-3).map(f => (
                    <span key={f.id} className="text-[10px] bg-black/50 px-1 py-0.5 rounded text-purple-300 border border-purple-700/50">
                      {f.icon} {f.ext}
                    </span>
                  ))}
                </div>
              )}
            </div>
            )}

            {/* Documents Folder */}
            {activeFolders.includes('doc') && (
            <div
              data-folder-type="doc"
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (hoveredFolder !== 'doc') setHoveredFolder('doc');
              }}
              onDragLeave={(e) => {
                if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                if (hoveredFolder === 'doc') setHoveredFolder(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setHoveredFolder(null);
                const fId = e.dataTransfer.getData('text/plain') || draggedFile?.id;
                const f = unplacedFiles.find(item => item.id === fId) || draggedFile;
                if (f) processFilePlacement(f, 'doc');
                setDraggedFile(null);
              }}
              onClick={() => handlePlaceFile('doc')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-center group ${
                hoveredFolder === 'doc'
                  ? 'bg-emerald-600/40 border-4 border-cyan-400 scale-105 shadow-[0_0_25px_rgba(0,243,255,0.4)] ring-4 ring-cyan-400/30'
                  : 'bg-emerald-950/40 hover:bg-emerald-900/50 border-2 border-emerald-500/50 hover:border-emerald-400'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 group-hover:scale-110 transition-transform">
                <FileText size={28} />
              </div>
              <div className="font-bold text-sm text-emerald-200">
                {hoveredFolder === 'doc' ? '⬇️ БРОСАЙ СЮДА!' : '📄 Папка: Документы'}
              </div>
              <div className="text-[10px] text-emerald-300/80">Для .docx, .txt, сказок</div>
              <div className="text-xs font-mono text-emerald-300 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                {folders.doc.length} файлов
              </div>

              {folders.doc.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mt-1">
                  {folders.doc.slice(-3).map(f => (
                    <span key={f.id} className="text-[10px] bg-black/50 px-1 py-0.5 rounded text-emerald-300 border border-emerald-700/50">
                      {f.icon} {f.ext}
                    </span>
                  ))}
                </div>
              )}
            </div>
            )}

            {/* Trash Bin */}
            {activeFolders.includes('danger') && (
            <div
              data-folder-type="danger"
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = 'move';
                if (hoveredFolder !== 'danger') setHoveredFolder('danger');
              }}
              onDragLeave={(e) => {
                if (e.currentTarget.contains(e.relatedTarget as Node)) return;
                if (hoveredFolder === 'danger') setHoveredFolder(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setHoveredFolder(null);
                const fId = e.dataTransfer.getData('text/plain') || draggedFile?.id;
                const f = unplacedFiles.find(item => item.id === fId) || draggedFile;
                if (f) processFilePlacement(f, 'danger');
                setDraggedFile(null);
              }}
              onClick={() => handlePlaceFile('danger')}
              className={`p-4 rounded-2xl flex flex-col items-center justify-center gap-2 transition-all cursor-pointer text-center group ${
                hoveredFolder === 'danger'
                  ? 'bg-rose-600/40 border-4 border-cyan-400 scale-105 shadow-[0_0_25px_rgba(0,243,255,0.4)] ring-4 ring-cyan-400/30'
                  : 'bg-rose-950/40 hover:bg-rose-900/50 border-2 border-rose-500/50 hover:border-rose-400'
              }`}
            >
              <div className="w-12 h-12 rounded-xl bg-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <Trash2 size={28} />
              </div>
              <div className="font-bold text-sm text-rose-200">
                {hoveredFolder === 'danger' ? '⬇️ БРОСАЙ СЮДА!' : '🗑️ Корзина: Мусор'}
              </div>
              <div className="text-[10px] text-rose-300/80">Для опасных .exe и вирусов</div>
              <div className="text-xs font-mono text-rose-300 bg-rose-950/80 px-2 py-0.5 rounded-full border border-rose-800">
                {folders.danger.length} файлов
              </div>

              {folders.danger.length > 0 && (
                <div className="flex flex-wrap gap-1 justify-center mt-1">
                  {folders.danger.slice(-3).map(f => (
                    <span key={f.id} className="text-[10px] bg-black/50 px-1 py-0.5 rounded text-rose-300 border border-rose-700/50">
                      {f.icon} {f.ext}
                    </span>
                  ))}
                </div>
              )}
            </div>
            )}
          </div>
        </div>
      </div>

      {/* Touch drag ghost floating badge */}
      {touchDraggingFile && touchCoords && (
        <div
          className="fixed pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 px-3 py-2 bg-cyan-500 text-black font-bold rounded-xl shadow-2xl flex items-center gap-2 border-2 border-white scale-110 animate-pulse"
          style={{ left: touchCoords.x, top: touchCoords.y }}
        >
          <span className="text-xl">{touchDraggingFile.icon}</span>
          <span className="text-xs">{touchDraggingFile.name}</span>
        </div>
      )}
    </div>
  );
};
