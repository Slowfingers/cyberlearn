
import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, ArrowRight, Star, Play, SkipForward, BookOpen, Feather, Sparkles, Send, X, Flame, Ghost, Cloud, Moon, Heart, Map, Check, Image as ImageIcon, Loader2, Trophy, Lock } from 'lucide-react';
import { checkFantasyAnswer, generateFantasyHint, generateFantasyImage } from '../services/geminiService';
import { getFantasyProgress, updateFantasyProgress } from '../services/mockBackend';
import { playSound } from '../utils/sound';
import { COMIC_CHAPTERS, ACHIEVEMENTS } from '../constants';
import { ComicChapter, ComicScene } from '../types';

interface FantasyDashboardProps {
    onBack: () => void;
    userId?: string; 
}

// --- VISUAL PLACEHOLDERS (Fallback) ---
const VisualIcon = ({ name, size = 64, className = "" }: { name: string, size?: number, className?: string }) => {
    switch (name) {
        case 'OakTree': return <div className={`text-green-800 ${className}`}><Cloud size={size} /></div>; 
        case 'OakTreeGold': return <div className={`text-yellow-500 animate-pulse ${className}`}><Cloud size={size} /></div>;
        case 'Cat': return <div className={`text-black drop-shadow-lg ${className}`}>🐱</div>; 
        case 'Chain': return <div className={`text-yellow-600 ${className}`}>🔗</div>;
        case 'NightSky': return <div className={`text-blue-200 ${className}`}><Moon size={size} /></div>;
        case 'Devil': return <div className={`text-red-600 ${className}`}>😈</div>;
        case 'Vakula': return <div className={`text-gray-300 ${className}`}>⚒️</div>;
        case 'CityLights': return <div className={`text-yellow-200 ${className}`}>🏙️</div>;
        case 'DarkForest': return <div className={`text-green-950 ${className}`}>🌲</div>;
        case 'AngryCrowd': return <div className={`text-red-900 ${className}`}>😡</div>;
        case 'Danko': return <div className={`text-blue-300 ${className}`}>🧍</div>;
        case 'BurningHeart': return <div className={`text-red-500 animate-bounce ${className}`}><Heart size={size} fill="currentColor" /></div>;
        case 'Battlefield': return <div className={`text-orange-900 ${className}`}>⚔️</div>;
        case 'Colonel': return <div className={`text-yellow-700 ${className}`}>👨‍✈️</div>;
        case 'Flag': return <div className={`text-red-600 ${className}`}>🚩</div>;
        case 'Cannon': return <div className={`text-gray-800 ${className}`}>💣</div>;
        default: return <div className={`text-gray-500 ${className}`}><BookOpen size={size} /></div>;
    }
}

interface ComicPanelProps {
    scene: ComicScene;
    isActive: boolean;
    isHistory: boolean;
    imageUrl?: string | null;
}

const ComicPanel: React.FC<ComicPanelProps> = ({ scene, isActive, isHistory, imageUrl }) => {
    return (
        <div 
            className={`
                relative w-full md:w-[600px] min-h-[350px] border-4 border-black bg-white shadow-[10px_10px_0px_rgba(0,0,0,0.5)] overflow-hidden transition-all duration-700 group
                ${isActive ? 'scale-100 opacity-100 translate-y-0' : isHistory ? 'scale-95 opacity-60 grayscale' : 'scale-90 opacity-0 translate-y-20 absolute'}
            `}
            style={{ background: !imageUrl ? (scene.bgStyle || '#fff') : '#000' }}
        >
            {/* IMAGE LAYER */}
            {imageUrl ? (
                <div className="absolute inset-0 z-0 animate-in fade-in duration-1000">
                    <img src={imageUrl} alt="Scene" className="w-full h-full object-cover opacity-90 transition-transform duration-[20s] ease-linear group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80"></div>
                </div>
            ) : (
                <div className="absolute inset-0 flex items-center justify-center opacity-30">
                     <VisualIcon name={scene.visual} size={150} />
                </div>
            )}

            {/* PANEL CONTENT */}
            <div className="absolute inset-0 flex flex-col items-center justify-end p-6 text-center z-10 pb-12">
                
                {/* Fallback Icon if no image and active */}
                {!imageUrl && isActive && (
                    <div className={`transform transition-transform duration-1000 mb-8 ${isActive ? 'scale-110' : 'scale-100'}`}>
                        <VisualIcon name={scene.visual} size={100} />
                    </div>
                )}

                {/* Text Layer */}
                <div className={`relative max-w-full ${scene.type === 'dialogue' ? 'bg-white/95 border-2 border-black rounded-xl p-4 shadow-lg text-black' : 'text-shadow-comic'}`}>
                    {scene.type === 'dialogue' && (
                        <div className="absolute -top-3 left-4 bg-yellow-400 border border-black px-2 text-xs font-bold uppercase tracking-widest text-black">
                            {scene.speaker}
                        </div>
                    )}
                    
                    <p className={`
                        font-serif text-lg leading-relaxed whitespace-pre-wrap
                        ${scene.type === 'narrative' ? 'text-white font-bold text-xl italic drop-shadow-[0_2px_2px_rgba(0,0,0,0.8)]' : ''}
                        ${scene.type === 'success' ? 'text-[#ffd700] font-bold text-2xl drop-shadow-[0_2px_0_black]' : ''}
                        ${scene.type === 'dialogue' ? 'text-black' : ''}
                    `}>
                        {scene.text}
                    </p>
                </div>
            </div>
        </div>
    );
}

// --- STORY MAP COMPONENT ---
const StoryMap: React.FC<{ 
    chapters: ComicChapter[], 
    completedChapters: string[],
    onSelect: (c: ComicChapter) => void 
}> = ({ chapters, completedChapters, onSelect }) => {
    return (
        <div className="relative w-full h-[600px] bg-[#1a1510] overflow-hidden rounded-xl border-4 border-[#3d2e20] shadow-2xl">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/old-map.png')]"></div>
            
            {/* Winding Path SVG */}
            <svg className="absolute inset-0 w-full h-full pointer-events-none">
                <path 
                    d="M 50% 90% C 20% 80%, 20% 60%, 50% 50% C 80% 40%, 80% 20%, 50% 10%" 
                    fill="none" 
                    stroke="#3d2e20" 
                    strokeWidth="8" 
                    strokeDasharray="10 10"
                />
            </svg>

            {/* Nodes */}
            {chapters.map((chapter) => {
                const isCompleted = completedChapters.includes(chapter.id);
                // First chapter always open. Others check if previous completed.
                // Simplified logic: Open if it's the first one OR if previous is completed.
                // We'll use the status from constants but override with local progress
                const isUnlocked = chapter.id === 'chap_1' || (chapter.id === 'chap_2' && completedChapters.includes('chap_1')) || (chapter.id === 'chap_3' && completedChapters.includes('chap_2')) || (chapter.id === 'chap_4' && completedChapters.includes('chap_3'));

                return (
                    <button
                        key={chapter.id}
                        onClick={() => {
                            if (isUnlocked) onSelect(chapter);
                        }}
                        disabled={!isUnlocked}
                        className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300
                            ${!isUnlocked ? 'opacity-50 grayscale cursor-not-allowed' : 'hover:scale-110'}
                        `}
                        style={{ left: `${chapter.mapPosition?.x || 50}%`, top: `${chapter.mapPosition?.y || 50}%` }}
                    >
                        <div className={`w-20 h-20 rounded-full border-4 flex items-center justify-center shadow-lg relative bg-[#2b2118]
                            ${isCompleted ? 'border-[#ffd700]' : isUnlocked ? 'border-white animate-pulse' : 'border-gray-600'}
                        `}>
                            <div className="text-3xl">
                                {!isUnlocked ? <Lock size={24} className="text-gray-500"/> : isCompleted ? '⭐' : '📖'}
                            </div>
                            
                            {/* Tooltip */}
                            <div className="absolute top-full mt-2 w-48 bg-black/90 text-white p-3 rounded text-center text-sm pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity z-50 border border-[#d4af37]">
                                <div className="font-bold text-[#d4af37] mb-1">{chapter.title}</div>
                                <div className="text-xs text-gray-400">{chapter.author}</div>
                                {isCompleted && <div className="text-xs text-green-400 mt-1 font-bold">ПРОЧИТАНО</div>}
                            </div>
                        </div>
                    </button>
                )
            })}
        </div>
    );
};

const FantasyDashboard: React.FC<FantasyDashboardProps> = ({ onBack, userId }) => {
    const [activeChapter, setActiveChapter] = useState<ComicChapter | null>(null);
    const [currentSceneIndex, setCurrentSceneIndex] = useState(0);
    const [history, setHistory] = useState<number[]>([]);
    
    // Progress State
    const [completedChapters, setCompletedChapters] = useState<string[]>([]);
    const [ink, setInk] = useState(50);
    const [feathers, setFeathers] = useState(0);

    // Interaction State
    const [input, setInput] = useState('');
    const [wordBank, setWordBank] = useState<string[]>([]);
    const [selectedWords, setSelectedWords] = useState<string[]>([]);
    const [isChecking, setIsChecking] = useState(false);
    const [feedback, setFeedback] = useState('');
    const [hint, setHint] = useState('');
    
    // Image Generation State
    const [generatedImages, setGeneratedImages] = useState<Record<string, string>>({});
    const [isGeneratingImage, setIsGeneratingImage] = useState(false);
    const [showAchievement, setShowAchievement] = useState<string | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);

    // Load Progress
    useEffect(() => {
        if (userId) {
            const p = getFantasyProgress(userId);
            setInk(p.ink);
            setFeathers(p.feathers);
            setCompletedChapters(p.chaptersCompleted);
        } else {
            // Fallback for development if no user ID
            const saved = localStorage.getItem('fantasy_local_progress');
            if (saved) {
                const p = JSON.parse(saved);
                setInk(p.ink);
                setCompletedChapters(p.chaptersCompleted);
            }
        }
    }, [userId]);

    useEffect(() => {
        if (activeChapter) {
            setHistory([0]);
            setCurrentSceneIndex(0);
            resetInteraction(0);
            // Try generate first image if user has ink
            // triggerImageGeneration(activeChapter.scenes[0]); 
        }
    }, [activeChapter]);

    const triggerImageGeneration = async (scene: ComicScene) => {
        if (generatedImages[scene.id]) return; // Already generated

        setIsGeneratingImage(true);
        // Deduct Ink? Let's make it free for now or cost 5 ink
        // updateProgress({ ink: -5 });
        
        const description = `${scene.text}. Visual elements: ${scene.visual}. Mood: ${scene.bgStyle ? 'mysterious' : 'bright'}. Style: Storybook illustration.`;
        const b64 = await generateFantasyImage(description);
        
        if (b64) {
            setGeneratedImages(prev => ({
                ...prev,
                [scene.id]: b64
            }));
            playSound('success'); // Soft chime
        } else {
            setFeedback("Магия не сработала... Попробуй позже.");
        }
        setIsGeneratingImage(false);
    };

    const resetInteraction = (idx: number) => {
        setInput('');
        setFeedback('');
        setHint('');
        setSelectedWords([]);
        
        if (activeChapter) {
            const scene = activeChapter.scenes[idx];
            if (scene.interactionType === 'word_bank' && scene.options) {
                setWordBank([...scene.options].sort(() => Math.random() - 0.5));
            }
        }
    };

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [history]);

    const handleNext = () => {
        if (!activeChapter) return;
        playSound('page');
        const nextIdx = currentSceneIndex + 1;
        if (nextIdx < activeChapter.scenes.length) {
            setCurrentSceneIndex(nextIdx);
            setHistory(prev => [...prev, nextIdx]);
            resetInteraction(nextIdx);
        } else {
            // Chapter Completed!
            playSound('success');
            
            // Save Progress
            const newCompleted = [...completedChapters];
            if (!newCompleted.includes(activeChapter.id)) {
                newCompleted.push(activeChapter.id);
                setCompletedChapters(newCompleted);
                
                // Reward Ink
                const earnedInk = 20;
                setInk(prev => prev + earnedInk);
                setFeathers(prev => prev + 1);

                if (userId) {
                    updateFantasyProgress(userId, { chapterCompleted: activeChapter.id, ink: ink + earnedInk, feather: 1 } as any);
                } else {
                    localStorage.setItem('fantasy_local_progress', JSON.stringify({ ink: ink + earnedInk, chaptersCompleted: newCompleted }));
                }

                // Check Achievement
                const ach = ACHIEVEMENTS.find(a => a.condition === activeChapter.id + '_done' || (activeChapter.id === 'chap_1' && a.condition === 'chap_1_done'));
                if (ach) {
                    setShowAchievement(ach.title);
                    setTimeout(() => setShowAchievement(null), 4000);
                }
            }

            setActiveChapter(null);
        }
    };

    const handleAction = async (forcedInput?: string) => {
        if (!activeChapter) return;
        const currentScene = activeChapter.scenes[currentSceneIndex];
        const answer = forcedInput || input;
        
        setIsChecking(true);
        
        // Validation logic
        let isCorrect = false;
        let localFeedback = '';

        if (currentScene.interactionType === 'choice') {
            isCorrect = currentScene.correctKeywords?.includes(answer) || false;
            localFeedback = isCorrect ? 'Верный выбор!' : 'Это не приведет к добру...';
        } else if (currentScene.interactionType === 'word_bank') {
            const joined = selectedWords.join(' ');
            const correct = currentScene.correctOrder?.join(' ');
            isCorrect = joined === correct;
            localFeedback = isCorrect ? 'Стихи сложились!' : 'Рифма нарушена.';
        } else {
            // Text Input
            if (currentScene.correctKeywords && currentScene.correctKeywords.length > 0) {
                 isCorrect = currentScene.correctKeywords.some(k => answer.toLowerCase().includes(k.toLowerCase()));
                 localFeedback = isCorrect ? 'Верно!' : '';
            }
            if (!isCorrect && !localFeedback) {
                 const aiRes = await checkFantasyAnswer(
                    `Произведение: ${activeChapter.author} - ${activeChapter.title}. Сцена: ${currentScene.question}`,
                    answer
                 );
                 isCorrect = aiRes.isCorrect;
                 localFeedback = aiRes.feedback;
            }
        }
        
        setIsChecking(false);

        if (isCorrect) {
            playSound('success');
            setInk(prev => prev + 5); // Small reward for correct step
            handleNext();
        } else {
            playSound('error');
            setFeedback(localFeedback || "Попробуй еще раз.");
        }
    };

    // --- RENDER MAP SCREEN ---
    if (!activeChapter) {
        return (
            <div className="min-h-screen bg-[#1a1510] text-[#f0e6d2] p-8 flex flex-col items-center relative overflow-hidden">
                 
                 {/* Achievement Toast */}
                 {showAchievement && (
                     <div className="absolute top-10 right-10 bg-[#000] border-2 border-[#d4af37] p-4 flex items-center gap-4 animate-in slide-in-from-right z-50">
                         <Trophy className="text-[#d4af37] animate-bounce" size={32} />
                         <div>
                             <div className="text-xs text-gray-400 uppercase">Новое достижение</div>
                             <div className="font-bold text-white text-lg">{showAchievement}</div>
                         </div>
                     </div>
                 )}

                 <div className="w-full max-w-4xl mb-8 flex justify-between items-center z-10">
                     <button onClick={onBack} className="text-[#a09080] hover:text-white flex items-center gap-2">
                         <ArrowLeft /> Выход
                     </button>
                     <div className="flex gap-4">
                        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-[#3d2e20]" title="Чернила (Магия)">
                             <Feather className="text-[#d4af37]" size={20} />
                             <span className="font-bold text-xl">{ink}</span>
                        </div>
                        <div className="flex items-center gap-2 bg-black/40 px-4 py-2 rounded-full border border-[#3d2e20]" title="Перья (Опыт)">
                             <Trophy className="text-white" size={20} />
                             <span className="font-bold text-xl">{feathers}</span>
                        </div>
                     </div>
                 </div>
                 
                 <h1 className="text-5xl font-fantasy text-[#d4af37] mb-2 z-10 drop-shadow-md">ГРИМУАР ИСТОРИЙ</h1>
                 <p className="text-[#a09080] mb-8 font-serif italic z-10">Путешествуй по страницам великих книг...</p>
                 
                 <div className="w-full max-w-4xl z-10">
                     <StoryMap chapters={COMIC_CHAPTERS} completedChapters={completedChapters} onSelect={(c) => { playSound('open'); setActiveChapter(c); }} />
                 </div>
            </div>
        );
    }

    // --- RENDER COMIC SCREEN ---
    const currentScene = activeChapter.scenes[currentSceneIndex];
    const isInteract = !!currentScene.interactionType;
    const hasImage = !!generatedImages[currentScene.id];

    return (
        <div className="h-screen w-full bg-[#111] flex flex-col relative overflow-hidden">
            {/* Header */}
            <div className="h-16 bg-[#000] border-b border-[#333] flex items-center justify-between px-6 z-20 shrink-0">
                <div className="flex items-center gap-4">
                    <button onClick={() => setActiveChapter(null)} className="text-gray-500 hover:text-white"><X /></button>
                    <div>
                        <h2 className="text-white font-bold font-fantasy tracking-wider">{activeChapter.title}</h2>
                        <span className="text-xs text-gray-500 uppercase tracking-widest">Сцена {currentSceneIndex + 1} / {activeChapter.scenes.length}</span>
                    </div>
                </div>
                <div className="flex items-center gap-4 text-[#d4af37]">
                    
                    {/* IMAGE GENERATOR BUTTON */}
                    {!hasImage && !isGeneratingImage && (
                        <button 
                            onClick={() => triggerImageGeneration(currentScene)}
                            className="flex items-center gap-2 text-xs border border-[#333] px-3 py-1 rounded hover:bg-[#222] hover:text-white transition-colors"
                            title="Создать иллюстрацию (Магия)"
                        >
                            <ImageIcon size={14} /> Вообразить
                        </button>
                    )}
                    {isGeneratingImage && (
                        <span className="flex items-center gap-2 text-xs text-purple-400">
                             <Loader2 size={14} className="animate-spin" /> Рисую...
                        </span>
                    )}

                    <div className="flex items-center gap-1">
                        <Feather size={16} /> {ink}
                    </div>
                </div>
            </div>

            {/* Comic Canvas */}
            <div 
                ref={scrollRef}
                className="flex-1 overflow-y-auto p-8 flex flex-col items-center gap-12 bg-[#111] bg-[radial-gradient(circle_at_center,_#222_1px,_transparent_1px)] bg-[size:20px_20px]"
            >
                {history.map((sceneIdx) => (
                    <ComicPanel 
                        key={sceneIdx} 
                        scene={activeChapter.scenes[sceneIdx]} 
                        isActive={sceneIdx === currentSceneIndex}
                        isHistory={sceneIdx < currentSceneIndex}
                        imageUrl={generatedImages[activeChapter.scenes[sceneIdx].id]}
                    />
                ))}
                <div className="h-48 shrink-0"></div>
            </div>

            {/* INTERACTION AREA */}
            <div className="bg-[#000] border-t border-[#333] p-6 z-30 min-h-[160px]">
                <div className="max-w-2xl mx-auto">
                    {isInteract ? (
                        <div className="animate-in slide-in-from-bottom-4 duration-300">
                             <div className="bg-[#222] border-2 border-[#d4af37] p-6 rounded-lg shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                                <div className="mb-4 text-[#d4af37] font-bold text-sm uppercase flex items-center gap-2">
                                    <Sparkles size={16} /> {currentScene.question}
                                </div>
                                
                                {/* INTERACTION: TEXT INPUT */}
                                {currentScene.interactionType === 'text_input' && (
                                    <div className="flex gap-2">
                                        <input 
                                            type="text" 
                                            value={input}
                                            onChange={e => setInput(e.target.value)}
                                            onKeyDown={e => e.key === 'Enter' && handleAction()}
                                            placeholder="Впишите ответ..."
                                            className="flex-1 bg-black text-white p-3 border border-gray-700 rounded focus:border-[#d4af37] focus:outline-none font-serif text-lg"
                                            autoFocus
                                        />
                                        <button onClick={() => handleAction()} className="bg-[#d4af37] text-black p-3 rounded hover:bg-white"><Send /></button>
                                    </div>
                                )}

                                {/* INTERACTION: CHOICE */}
                                {currentScene.interactionType === 'choice' && (
                                    <div className="grid grid-cols-1 gap-3">
                                        {currentScene.options?.map((opt, i) => (
                                            <button 
                                                key={i}
                                                onClick={() => handleAction(opt)}
                                                className="w-full text-left p-4 bg-black border border-gray-600 rounded hover:border-[#d4af37] hover:bg-[#d4af37]/10 transition-all font-serif text-lg"
                                            >
                                                {i + 1}. {opt}
                                            </button>
                                        ))}
                                    </div>
                                )}

                                {/* INTERACTION: WORD BANK */}
                                {currentScene.interactionType === 'word_bank' && (
                                    <div className="flex flex-col gap-4">
                                        {/* Drop Zone */}
                                        <div className="min-h-[60px] p-4 bg-black border-2 border-dashed border-gray-600 rounded flex flex-wrap gap-2">
                                            {selectedWords.length === 0 && <span className="text-gray-600 italic">Нажимайте на слова...</span>}
                                            {selectedWords.map((word, i) => (
                                                <button 
                                                    key={i}
                                                    onClick={() => {
                                                        setSelectedWords(prev => prev.filter((_, idx) => idx !== i));
                                                        setWordBank(prev => [...prev, word]);
                                                        playSound('click');
                                                    }}
                                                    className="px-3 py-1 bg-[#d4af37] text-black font-bold rounded hover:bg-white"
                                                >
                                                    {word}
                                                </button>
                                            ))}
                                        </div>
                                        {/* Bank */}
                                        <div className="flex flex-wrap gap-2 justify-center">
                                            {wordBank.map((word, i) => (
                                                <button 
                                                    key={i}
                                                    onClick={() => {
                                                        setWordBank(prev => prev.filter((_, idx) => idx !== i));
                                                        setSelectedWords(prev => [...prev, word]);
                                                        playSound('type');
                                                    }}
                                                    className="px-3 py-1 bg-gray-800 text-gray-300 border border-gray-600 rounded hover:border-white"
                                                >
                                                    {word}
                                                </button>
                                            ))}
                                        </div>
                                        <button onClick={() => handleAction()} className="self-end bg-[#d4af37] text-black px-6 py-2 rounded font-bold hover:bg-white">
                                            Готово
                                        </button>
                                    </div>
                                )}

                                {/* Feedback Area */}
                                <div className="mt-4 flex justify-between items-center h-6">
                                    <div className="text-red-400 font-bold">{feedback}</div>
                                    {isChecking && <span className="text-[#d4af37] animate-pulse">Проверка...</span>}
                                </div>
                             </div>
                        </div>
                    ) : (
                        <div className="flex justify-center">
                             <button 
                                onClick={handleNext}
                                className="group flex items-center gap-4 text-white text-xl font-fantasy tracking-widest hover:text-[#d4af37] transition-colors animate-pulse-fast"
                            >
                                ДАЛЕЕ <ArrowRight className="group-hover:translate-x-2 transition-transform"/>
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default FantasyDashboard;
