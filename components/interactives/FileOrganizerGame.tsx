import {GameButton} from '../GameUI';
import React, { useState, useRef, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { RotateCcw } from 'lucide-react';
import { WorkshopArt, WorkshopHeader, WorkshopProgress } from './WorkshopArt';
interface FileItem {
  id: string;
  name: string;
  ext: string;
  type: 'image' | 'music' | 'doc' | 'danger';
  icon: string;
  size: string;
  description: string;
  teacherHint: string;
  folder?: string;
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
    teacherHint: 'Внимание! Расширение .exe означает исполняемую программу (Executable). Если файл обещает «взлом» или скачан с чужого сайта — он может быть опасен. Не запускай его: помести в «Корзину» и обратись к взрослому.'
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


const LABELS: Record<FolderType, string> = { image: 'Рисунки', music: 'Музыка', doc: 'Документы', danger: 'Карантин' };
export function getFileScenario(task: Task) {
  const cfg = task.fileConfig;
  const folders: string[] = cfg?.folders?.length ? cfg.folders : ALL_FOLDERS;
  const files: FileItem[] = cfg?.files?.length ? cfg.files.map((f: any) => ({
    id: f.id, name: f.name, ext: f.name.includes('.') ? f.name.slice(f.name.lastIndexOf('.')) : '',
    type: ['image','music','doc','danger'].includes(f.type) ? f.type : 'doc',
    folder: f.targetFolder, icon: '', size: '', description: `Файл «${f.name}». Проверь расширение и назначение.`, teacherHint: '',
  })) : INITIAL_FILES.filter(f => folders.includes(f.type)).map(f => ({...f, folder: f.type}));
  return {folders, files};
}
export const FileOrganizerGame: React.FC<{ task: Task; onComplete: () => void }> = ({ task, onComplete }) => {
  const {folders: activeFolders, files} = getFileScenario(task);
  const [placed, setPlaced] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [feedback, setFeedback] = useState('Выбери посылку и найди для неё папку.');
  const [hover, setHover] = useState<string | null>(null);
  const foldersRef = useRef<HTMLDivElement>(null);
  const placedRef = useRef(new Set<string>());
  const pointer = useRef<{ id: string; x: number; y: number; moved: boolean } | null>(null);
  const [ghost, setGhost] = useState<{ id: string; x: number; y: number } | null>(null);
  const suppressClick = useRef<string | null>(null);
  const reset = () => { placedRef.current.clear(); setPlaced([]); setSelected(null); setFeedback('Выбери посылку и найди для неё папку.'); setHover(null); setGhost(null); pointer.current = null; };
  useEffect(reset, [task.id]);
  const place = (id: string | null, folder: string) => {
    const file = files.find(f => f.id === id);
    if (!file) { setFeedback('Сначала выбери файл, затем нажми на нужную папку.'); return; }
    if (placedRef.current.has(file.id)) return;
    if (file.folder !== folder) { setFeedback('Эта папка не подходит. Сравни расширение и назначение файла с названиями папок.'); playSound('error'); return; }
    placedRef.current.add(file.id); setPlaced([...placedRef.current]); setSelected(null); playSound('hit');
    setFeedback(placedRef.current.size === files.length ? 'Все посылки доставлены! Теперь на столе порядок.' : `«${file.name}» на месте. Доставь следующую посылку!`);
    if (placedRef.current.size === files.length) { playSound('success'); onComplete(); }
  };
  const folderAt = (x: number, y: number) => document.elementFromPoint(x, y)?.closest<HTMLElement>('[data-folder-type]')?.dataset.folderType;
  return <div className="workshop-game delivery-workshop">
    <WorkshopHeader title="Бюро цифровых посылок" description="Разложи файлы по папкам. Перетаскивай или нажимай: файл → папка."><GameButton variant="secondary" size="icon" className="workshop-icon-button" onClick={reset} aria-label="Начать заново"><RotateCcw size={19} /></GameButton></WorkshopHeader>
    <WorkshopProgress value={placed.length} total={files.length} />
    <p className="workshop-feedback" role="status">{feedback}</p>
    {selected && <div className="delivery-selection"><span>Выбран файл <strong>{files.find(file => file.id === selected)?.name}</strong></span><GameButton variant="primary" size="compact" className="academy-primary" onClick={() => foldersRef.current?.scrollIntoView({block:'center'})}>Выбрать папку ↓</GameButton></div>}
    <div className="delivery-desk"><div className="workshop-section-title">Посылки ждут доставки <span>{files.length - placed.length}</span></div><div className="parcel-grid">
      {files.filter(f => !placed.includes(f.id)).map(file => <button key={file.id} className={`parcel-card ${selected === file.id ? 'is-selected' : ''}`} aria-pressed={selected === file.id}
        onClick={() => { if (suppressClick.current === file.id) { suppressClick.current = null; return; } suppressClick.current = null; setSelected(file.id); setFeedback(file.description); }}
        onPointerDown={e => { if (e.button !== 0 || e.pointerType === 'touch') return; pointer.current = { id: file.id, x: e.clientX, y: e.clientY, moved: false }; e.currentTarget.setPointerCapture(e.pointerId); }}
        onPointerMove={e => { const p = pointer.current; if (!p || p.id !== file.id) return; if (Math.hypot(e.clientX-p.x, e.clientY-p.y) > 8) p.moved = true; if (p.moved) { setGhost({ id: file.id, x: e.clientX, y: e.clientY }); setHover(folderAt(e.clientX, e.clientY) || null); } }}
        onPointerUp={e => { const p = pointer.current; if (p?.moved) { suppressClick.current = file.id; const folder = folderAt(e.clientX, e.clientY); if (folder) place(file.id, folder); } pointer.current = null; setGhost(null); setHover(null); }}
        onPointerCancel={() => { pointer.current = null; setGhost(null); setHover(null); }}>
        <WorkshopArt kind={file.type} /><span className="parcel-name">{(file.ext ? file.name.slice(0, -file.ext.length) : file.name).replaceAll('_', ' ')}</span><span className="parcel-extension">{file.ext}</span><span className="parcel-select">{selected === file.id ? 'Выбрано ✓' : 'Взять посылку'}</span>
      </button>)}
      {placed.length === files.length && <div className="workshop-success"><WorkshopArt />Отличная работа! Все файлы на своих местах.</div>}
    </div></div>
    <div ref={foldersRef} className="folder-grid">{activeFolders.map(folder => <button key={folder} data-folder-type={folder} className={`folder-card ${hover === folder ? 'is-hovered' : ''}`} onClick={() => place(selected, folder)} aria-label={`Папка ${LABELS[folder] ?? folder}`}><WorkshopArt kind={`folder-${ALL_FOLDERS.includes(folder as FolderType) ? folder : "doc"}`} /><strong>{LABELS[folder] ?? folder}</strong><span>{placed.filter(id => files.find(f => f.id === id)?.folder === folder).length} файлов доставлено</span></button>)}</div>
    <details className="workshop-hint"><summary>Как выбрать папку?</summary><p>Определи назначение файла по расширению. Затем выбери папку для такого вида работы.</p></details>
    {ghost && <div className="parcel-ghost" style={{ left: ghost.x, top: ghost.y }}><WorkshopArt kind={files.find(f => f.id === ghost.id)?.type} /></div>}
  </div>;
};
