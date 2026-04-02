
import React, { useState, useRef } from 'react';
import { Task } from '../types';
import { playSound } from '../utils/sound';
import { Trash2, Play, RotateCcw, Sparkles, GripVertical } from 'lucide-react';

interface BlockCodingProps {
  task: Task;
  onSuccess: () => void;
  onFail: () => void;
}

const THEME_COLORS: Record<string, { bg: string; border: string; accent: string; emoji: string }> = {
  robot: { bg: '#0d1f2d', border: '#00f3ff', accent: '#00f3ff', emoji: '🤖' },
  recipe: { bg: '#1f0d0d', border: '#ff6b6b', accent: '#ff6b6b', emoji: '🍳' },
  morning: { bg: '#1f1f0d', border: '#ffe66d', accent: '#ffe66d', emoji: '☀️' },
  dance: { bg: '#1f0d1f', border: '#ff00ff', accent: '#ff00ff', emoji: '💃' },
  art: { bg: '#0d1f0d', border: '#00ff41', accent: '#00ff41', emoji: '🎨' },
  default: { bg: '#0d1f0d', border: '#00ff41', accent: '#00ff41', emoji: '⚡' },
};

const BLOCK_COLORS = [
  'bg-blue-600 border-blue-400',
  'bg-emerald-600 border-emerald-400',
  'bg-amber-600 border-amber-400',
  'bg-rose-600 border-rose-400',
  'bg-violet-600 border-violet-400',
  'bg-cyan-600 border-cyan-400',
  'bg-orange-600 border-orange-400',
  'bg-pink-600 border-pink-400',
];

const BlockCoding: React.FC<BlockCodingProps> = ({ task, onSuccess, onFail }) => {
  const config = task.blocksConfig;
  if (!config) return null;

  const [shuffledBlocks] = useState<string[]>(() => {
    const arr = [...config.availableBlocks];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  });
  const [sequence, setSequence] = useState<string[]>([]);
  const [result, setResult] = useState<'idle' | 'success' | 'error'>('idle');
  const [shakeIdx, setShakeIdx] = useState<number | null>(null);
  const [draggedBlock, setDraggedBlock] = useState<string | null>(null);
  const [dragOverIdx, setDragOverIdx] = useState<number | null>(null);
  const dropZoneRef = useRef<HTMLDivElement>(null);

  const theme = THEME_COLORS[config.theme || 'default'] || THEME_COLORS.default;

  // Get stable color for each unique block text
  const blockColorMap = useRef<Record<string, string>>({});
  shuffledBlocks.forEach((block, i) => {
    if (!blockColorMap.current[block]) {
      blockColorMap.current[block] = BLOCK_COLORS[Object.keys(blockColorMap.current).length % BLOCK_COLORS.length];
    }
  });

  const handleDragStart = (block: string) => {
    setDraggedBlock(block);
    playSound('click');
  };

  const handleDragOver = (e: React.DragEvent, idx?: number) => {
    e.preventDefault();
    if (idx !== undefined) setDragOverIdx(idx);
  };

  const handleDropOnZone = (e: React.DragEvent) => {
    e.preventDefault();
    if (draggedBlock) {
      setSequence(prev => [...prev, draggedBlock]);
      playSound('type');
    }
    setDraggedBlock(null);
    setDragOverIdx(null);
  };

  const handleDropReorder = (e: React.DragEvent, targetIdx: number) => {
    e.preventDefault();
    e.stopPropagation();
    if (draggedBlock) {
      // If dragging from available blocks
      if (!sequence.includes(draggedBlock) || sequence.filter(b => b === draggedBlock).length < shuffledBlocks.filter(b => b === draggedBlock).length) {
        const newSeq = [...sequence];
        newSeq.splice(targetIdx, 0, draggedBlock);
        setSequence(newSeq);
        playSound('type');
      }
    }
    setDraggedBlock(null);
    setDragOverIdx(null);
  };

  const handleTapAdd = (block: string) => {
    setSequence(prev => [...prev, block]);
    playSound('type');
    setResult('idle');
  };

  const removeBlock = (idx: number) => {
    setSequence(prev => prev.filter((_, i) => i !== idx));
    playSound('click');
    setResult('idle');
  };

  const reset = () => {
    setSequence([]);
    setResult('idle');
    playSound('click');
  };

  const checkAnswer = () => {
    if (sequence.length === 0) return;
    
    const isCorrect = 
      sequence.length === config.correctSequence.length &&
      sequence.every((block, i) => block === config.correctSequence[i]);
    
    if (isCorrect) {
      setResult('success');
      playSound('success');
      onSuccess();
    } else {
      setResult('error');
      playSound('error');
      onFail();
      // Find first wrong block and shake it
      for (let i = 0; i < sequence.length; i++) {
        if (i >= config.correctSequence.length || sequence[i] !== config.correctSequence[i]) {
          setShakeIdx(i);
          setTimeout(() => setShakeIdx(null), 600);
          break;
        }
      }
    }
  };

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-black">
      {/* Header */}
      <div className="px-4 py-3 border-b border-gray-800 bg-gray-950 shrink-0">
        <div className="flex items-center gap-2">
          <span className="text-2xl">{theme.emoji}</span>
          <div className="flex-1 min-w-0">
            <h2 className="text-sm font-bold text-white uppercase tracking-wider truncate">{task.title}</h2>
            <p className="text-xs text-gray-400 mt-0.5 truncate">{task.description}</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 md:p-6 flex flex-col md:flex-row gap-6">
        {/* LEFT: GRID MAP or ILLUSTRATION */}
        {(config.gridMap || config.illustration) && (
          <div className="flex-shrink-0 md:w-auto">
            {/* GRID MAP — CodeCombat-style visual path */}
            {config.gridMap && (() => {
          const gm = config.gridMap;
          const cellSize = 56;
          const gap = 4;
          const isOnPath = (r: number, c: number) => gm.path.some(([pr, pc]) => pr === r && pc === c);
          const isStart = (r: number, c: number) => gm.start[0] === r && gm.start[1] === c;
          const isGoal = (r: number, c: number) => gm.goal[0] === r && gm.goal[1] === c;
          const isObstacle = (r: number, c: number) => gm.obstacles?.some(([or, oc]) => or === r && oc === c);

          // Simulate robot movement based on current sequence
          const robotPositions: [number, number][] = [[gm.start[0], gm.start[1]]];
          let cur: [number, number] = [gm.start[0], gm.start[1]];
          for (const block of sequence) {
            let nr = cur[0], nc = cur[1];
            if (block.includes('вправо')) nc++;
            else if (block.includes('влево')) nc--;
            else if (block.includes('вниз')) nr++;
            else if (block.includes('вверх')) nr--;
            if (nr >= 0 && nr < gm.rows && nc >= 0 && nc < gm.cols) {
              cur = [nr, nc];
              robotPositions.push([nr, nc]);
            }
          }
          const robotAt = cur;
          const robotVisited = (r: number, c: number) => robotPositions.some(([rr, rc]) => rr === r && rc === c);

          return (
            <div className="rounded-xl border-2 p-4 md:p-5" style={{ borderColor: theme.border, background: '#0a0e1a' }}>
              <p className="text-center font-bold text-sm mb-4" style={{ color: theme.accent }}>
                🗺️ Карта — проведи Робика до ⭐!
              </p>
              <div className="flex justify-center">
                <div
                  style={{
                    display: 'inline-grid',
                    gridTemplateColumns: `repeat(${gm.cols}, ${cellSize}px)`,
                    gridTemplateRows: `repeat(${gm.rows}, ${cellSize}px)`,
                    gap: `${gap}px`,
                  }}
                >
                  {Array.from({ length: gm.rows }).map((_, r) =>
                    Array.from({ length: gm.cols }).map((_, c) => {
                      const start = isStart(r, c);
                      const goal = isGoal(r, c);
                      const path = isOnPath(r, c);
                      const obstacle = isObstacle(r, c);
                      const visited = robotVisited(r, c);
                      const robotHere = robotAt[0] === r && robotAt[1] === c;
                      const isCorrectEnd = robotHere && goal && result === 'success';

                      return (
                        <div
                          key={`${r}-${c}`}
                          className="relative rounded-lg flex items-center justify-center transition-all duration-300"
                          style={{
                            width: cellSize,
                            height: cellSize,
                            background: obstacle ? '#1a0a0a'
                              : isCorrectEnd ? '#0a2a0a'
                              : visited ? `${theme.accent}18`
                              : (start || goal || path) ? '#111828' : '#0d1117',
                            border: isCorrectEnd ? '2px solid #00ff41'
                              : robotHere ? `2px solid ${theme.accent}`
                              : goal ? '2px solid #ffe66d'
                              : start ? `2px solid ${theme.accent}60`
                              : visited ? `2px solid ${theme.accent}30`
                              : path ? '2px solid #333' 
                              : obstacle ? '2px solid #441111'
                              : '1px solid #1a1a2e',
                            boxShadow: robotHere ? `0 0 16px ${theme.accent}40` 
                              : goal ? '0 0 12px #ffe66d30' : 'none',
                          }}
                        >
                          {obstacle ? (
                            <span className="text-xl opacity-60">🧱</span>
                          ) : robotHere ? (
                            <span className="text-2xl" style={{ filter: isCorrectEnd ? 'drop-shadow(0 0 8px #00ff41)' : 'none' }}>
                              🤖
                            </span>
                          ) : goal ? (
                            <span className="text-2xl animate-pulse">⭐</span>
                          ) : start && !visited ? (
                            <span className="text-lg opacity-40">🤖</span>
                          ) : (path || visited) ? (
                            <div
                              className="rounded-full"
                              style={{
                                width: visited ? 14 : 10,
                                height: visited ? 14 : 10,
                                background: visited ? theme.accent : '#334155',
                                boxShadow: visited ? `0 0 8px ${theme.accent}60` : 'none',
                                opacity: visited ? 0.9 : 0.5,
                              }}
                            />
                          ) : null}
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
              <p className="text-center text-gray-500 text-xs mt-3">
                {sequence.length === 0 
                  ? 'Добавь блоки команд внизу → робот пойдёт по карте!' 
                  : `Робик прошёл ${sequence.length} шаг(ов)`}
              </p>
            </div>
          );
        })()}

            {/* ILLUSTRATION / VISUAL HINT (for non-grid tasks) */}
            {config.illustration && !config.gridMap && (
              <div
                className="rounded-xl border-2 overflow-hidden"
                style={{ borderColor: theme.border, background: theme.bg }}
                dangerouslySetInnerHTML={{ __html: config.illustration }}
              />
            )}
          </div>
        )}

        {/* RIGHT: BLOCKS & SEQUENCE */}
        <div className="flex-1 flex flex-col gap-6 min-w-0">
          {/* AVAILABLE BLOCKS */}
          <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3 flex items-center gap-2">
            <Sparkles size={14} style={{ color: theme.accent }} />
            Доступные блоки — нажми или перетащи
          </h3>
          <div className="flex flex-wrap gap-2">
            {shuffledBlocks.map((block, i) => (
              <button
                key={`avail-${i}`}
                draggable
                onDragStart={() => handleDragStart(block)}
                onClick={() => handleTapAdd(block)}
                className={`
                  ${blockColorMap.current[block]}
                  px-4 py-3 rounded-xl border-2 font-bold text-white text-sm md:text-base
                  cursor-grab active:cursor-grabbing hover:scale-105 active:scale-95
                  transition-all duration-150 select-none
                  shadow-lg hover:shadow-xl
                  flex items-center gap-2
                `}
              >
                <GripVertical size={14} className="opacity-50" />
                {block}
              </button>
            ))}
          </div>
        </div>

        {/* DROP ZONE — Sequence */}
        <div>
          <h3 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-3">
            Твоя программа — порядок важен!
          </h3>
          <div
            ref={dropZoneRef}
            onDragOver={(e) => handleDragOver(e)}
            onDrop={handleDropOnZone}
            className={`
              min-h-[140px] md:min-h-[180px] rounded-xl border-2 border-dashed p-4
              transition-all duration-300 flex flex-col gap-2
              ${sequence.length === 0 
                ? 'border-gray-700 bg-gray-900/30 items-center justify-center' 
                : result === 'success' 
                  ? 'border-green-500 bg-green-950/30'
                  : result === 'error'
                    ? 'border-red-500 bg-red-950/30'
                    : 'border-gray-600 bg-gray-900/50'}
            `}
          >
            {sequence.length === 0 ? (
              <div className="text-gray-600 text-center py-4">
                <div className="text-3xl mb-2">📥</div>
                <p className="text-sm font-bold">Перетащи блоки сюда!</p>
                <p className="text-xs mt-1 opacity-60">Или просто нажми на блок</p>
              </div>
            ) : (
              sequence.map((block, idx) => (
                <div
                  key={`seq-${idx}`}
                  onDragOver={(e) => handleDragOver(e, idx)}
                  onDrop={(e) => handleDropReorder(e, idx)}
                  className={`
                    flex items-center gap-3 group
                    ${shakeIdx === idx ? 'animate-[shake_0.3s_ease-in-out_2]' : ''}
                  `}
                >
                  {/* Step number */}
                  <div 
                    className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold shrink-0 border-2"
                    style={{ 
                      borderColor: theme.accent,
                      color: theme.accent,
                      backgroundColor: `${theme.accent}15`
                    }}
                  >
                    {idx + 1}
                  </div>

                  {/* Block */}
                  <div className={`
                    ${blockColorMap.current[block]}
                    flex-1 px-4 py-3 rounded-lg border-2 font-bold text-white text-sm
                    flex items-center justify-between
                    ${result === 'success' ? 'opacity-90' : ''}
                  `}>
                    <span>{block}</span>
                    {result !== 'success' && (
                      <button 
                        onClick={() => removeBlock(idx)}
                        className="opacity-0 group-hover:opacity-100 md:opacity-0 md:group-hover:opacity-100 active:opacity-100 transition-opacity p-1 hover:bg-black/30 rounded"
                      >
                        <Trash2 size={14} />
                      </button>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Result message */}
        {result === 'success' && (
          <div className="bg-green-950/50 border-2 border-green-500 rounded-xl p-4 text-center animate-in zoom-in-95">
            <div className="text-3xl mb-2">🎉</div>
            <p className="text-green-400 font-bold text-lg">{config.successMessage || 'Правильно! Молодец!'}</p>
          </div>
        )}
        {result === 'error' && (
          <div className="bg-red-950/50 border border-red-500/50 rounded-xl p-3 text-center">
            <p className="text-red-400 font-bold text-sm">Не совсем так... Попробуй поменять порядок! 🤔</p>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-3 pb-4">
          <button
            onClick={reset}
            className="flex items-center gap-2 px-4 py-3 border border-gray-700 text-gray-400 hover:text-white hover:border-gray-500 rounded-lg transition-all text-sm font-bold"
          >
            <RotateCcw size={16} /> Сброс
          </button>
          <button
            onClick={checkAnswer}
            disabled={sequence.length === 0 || result === 'success'}
            className={`
              flex-1 flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-base transition-all
              ${result === 'success'
                ? 'bg-green-600 text-white cursor-default'
                : sequence.length === 0
                  ? 'bg-gray-800 text-gray-600 cursor-not-allowed'
                  : 'bg-gradient-to-r from-cyan-500 to-blue-500 text-white hover:from-cyan-400 hover:to-blue-400 active:scale-[0.98] shadow-lg hover:shadow-cyan-500/25'
              }
            `}
          >
            <Play size={18} /> {result === 'success' ? 'Готово! ✓' : 'Проверить!'}
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default BlockCoding;
