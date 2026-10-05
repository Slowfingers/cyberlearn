import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import {getTreeScenario, type PositionedNode as TreeNode} from '../../services/treeScenario';
import { playSound } from '../../utils/sound';
import { GitBranch, CheckCircle, RotateCcw, Zap, Compass } from 'lucide-react';

interface BinaryTreeGameProps {
  task: Task;
  onComplete: () => void;
}

export const BinaryTreeGame: React.FC<BinaryTreeGameProps> = ({ task, onComplete }) => {
  const {root, nodes, target} = getTreeScenario(task);
  const [currentNode, setCurrentNode] = useState<TreeNode>(root);
  const [visitedPath, setVisitedPath] = useState<number[]>([root.val]);
  const [steps, setSteps] = useState<number>(0);
  const [completed, setCompleted] = useState<boolean>(false);
  const [hintMsg, setHintMsg] = useState<string>('Сравнивай цель с текущим узлом. Если цель МЕНЬШЕ — иди влево, если БОЛЬШЕ — иди вправо!');

  useEffect(() => {
    resetGame();
  }, [task.id]);

  const resetGame = () => {
    setCurrentNode(root);
    setVisitedPath([root.val]);
    setSteps(0);
    setCompleted(false);
    setHintMsg('Сравнивай цель с текущим узлом. Меньше — влево, больше — вправо!');
  };

  const handleNavigate = (direction: 'left' | 'right') => {
    if (completed) return;

    if (direction === 'left') {
      if (target >= currentNode.val) {
        playSound('error');
        setHintMsg(`⚠️ Ошибка: Цель ${target} БОЛЬШЕ текущего числа ${currentNode.val}, поэтому нужно идти ВПРАВО!`);
        return;
      }
      if (currentNode.left) {
        playSound('move');
        const nextNode = currentNode.left;
        setCurrentNode(nextNode);
        setVisitedPath(p => [...p, nextNode.val]);
        setSteps(s => s + 1);

        if (nextNode.val === target) {
          handleSuccess();
        } else {
          setHintMsg(`Переход влево к ${nextNode.val}. Куда дальше?`);
        }
      }
    } else {
      if (target <= currentNode.val) {
        playSound('error');
        setHintMsg(`⚠️ Ошибка: Цель ${target} МЕНЬШЕ текущего числа ${currentNode.val}, поэтому нужно идти ВЛЕВО!`);
        return;
      }
      if (currentNode.right) {
        playSound('move');
        const nextNode = currentNode.right;
        setCurrentNode(nextNode);
        setVisitedPath(p => [...p, nextNode.val]);
        setSteps(s => s + 1);

        if (nextNode.val === target) {
          handleSuccess();
        } else {
          setHintMsg(`Переход вправо к ${nextNode.val}. Куда дальше?`);
        }
      }
    }
  };

  const handleSuccess = () => {
    setCompleted(true);
    playSound('success');
    setHintMsg(`🎯 ЦЕЛЬ ${target} НАЙДЕНА! В двоичном дереве мы нашли элемент всего за несколько шагов!`);
    onComplete();
  };

  return (
    <div className="workshop-legacy flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <div className="workshop-banner flex flex-wrap items-center justify-between gap-4 p-4 bg-black/70 border border-cyber-neonBlue/30 rounded-xl mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-cyber-neonGreen/20 text-cyber-neonGreen border border-cyber-neonGreen/40">
            <GitBranch size={22} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">ДВОИЧНОЕ ДЕРЕВО ПОИСКА (BST)</div>
            <h2 className="text-base md:text-lg font-bold text-white">Поиск со скоростью молнии O(log N)</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-900 border border-cyber-neonYellow/40 px-3 py-1.5 rounded-lg text-center font-mono">
            <div className="text-[9px] text-gray-400">ЦЕЛЬ ПОИСКА</div>
            <div className="text-lg font-bold text-cyber-neonYellow">{target}</div>
          </div>
          <div className="bg-gray-900 border border-gray-800 px-3 py-1.5 rounded-lg text-center font-mono">
            <div className="text-[9px] text-gray-400">ШАГОВ (ОПЕРАЦИЙ)</div>
            <div className="text-lg font-bold text-cyber-neonGreen">{steps}</div>
          </div>
          <button
            onClick={resetGame}
            className="p-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 rounded-lg transition-colors"
            title="Сброс"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Guide / Hint Box */}
      <div className="bg-gray-900/80 border border-cyber-neonBlue/30 rounded-xl p-3.5 mb-4 text-xs font-mono text-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Compass size={16} className="text-cyber-neonBlue" />
          <span>{hintMsg}</span>
        </div>
        <div className="text-xs text-cyber-neonYellow font-bold">
          Текущий узел: {currentNode.val}
        </div>
      </div>

      {/* Interactive SVG Tree View */}
      <div className="flex-1 bg-black border border-gray-800 rounded-xl p-4 flex items-center justify-center min-h-[300px] relative overflow-hidden">
        <svg viewBox="0 0 500 280" className="w-full max-w-xl h-auto select-none">
          {nodes.flatMap(node => [node.left,node.right].filter(Boolean).map(child => <line key={`${node.val}-${child!.val}`} x1={node.x} y1={node.y} x2={child!.x} y2={child!.y} stroke={visitedPath.includes(child!.val)?'#00ff41':'#374151'} strokeWidth="3"/>))}
          {nodes.map(node => {
            const isCurrent = currentNode.val === node.val;
            const isVisited = visitedPath.includes(node.val);
            const isTargetNode = node.val === target;

            return (
              <g key={node.val} className="transition-all duration-300">
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isCurrent ? 24 : 20}
                  fill={isCurrent ? '#fcee0a' : isVisited ? '#00ff41' : '#111827'}
                  stroke={isTargetNode && completed ? '#00ff41' : isCurrent ? '#ffffff' : isVisited ? '#00ff41' : '#4b5563'}
                  strokeWidth={isCurrent ? '3' : '2'}
                  filter={isCurrent ? 'drop-shadow(0px 0px 8px #fcee0a)' : ''}
                />
                <text
                  x={node.x}
                  y={node.y + 5}
                  textAnchor="middle"
                  fill={isCurrent ? '#000000' : isVisited ? '#000000' : '#ffffff'}
                  fontWeight="bold"
                  fontSize="13"
                  fontFamily="monospace"
                >
                  {node.val}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Navigation Controls */}
      {!completed ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          <button
            onClick={() => handleNavigate('left')}
            disabled={!currentNode.left}
            className={`py-4 px-6 rounded-xl font-mono font-bold text-xs uppercase flex items-center justify-center gap-3 transition-all ${
              currentNode.left
                ? 'bg-cyber-neonBlue text-black hover:bg-white shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                : 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800'
            }`}
          >
            ◀ ВЛЕВО
          </button>
          <button
            onClick={() => handleNavigate('right')}
            disabled={!currentNode.right}
            className={`py-4 px-6 rounded-xl font-mono font-bold text-xs uppercase flex items-center justify-center gap-3 transition-all ${
              currentNode.right
                ? 'bg-cyber-neonYellow text-black hover:bg-white shadow-[0_0_15px_rgba(252,238,10,0.2)]'
                : 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800'
            }`}
          >
            ВПРАВО ▶
          </button>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-cyber-neonGreen/15 border border-cyber-neonGreen rounded-xl flex items-center justify-between text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyber-neonGreen" size={26} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase">ПОИСК УСПЕШНО ЗАВЕРШЕН!</div>
              <div className="text-xs text-gray-300">
                Благодаря дереву поиска сложность составила O(log₂ 7) ≈ <span className="font-bold text-white">{steps} шага</span> вместо полного сканирования!
              </div>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-5 py-2 bg-cyber-neonGreen text-black font-bold uppercase rounded-lg text-xs hover:bg-white transition-colors"
          >
            ПРИНЯТЬ НАГРАДУ (+{task.xpReward} XP)
          </button>
        </div>
      )}
    </div>
  );
};
