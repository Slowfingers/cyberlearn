import {GameButton, WorkshopHeader, WorkshopBadge} from '../GameUI';
import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import {getTreeScenario, type PositionedNode as TreeNode} from '../../services/treeScenario';
import { playSound } from '../../utils/sound';
import { GitBranch, CheckCircle, Zap, Compass } from 'lucide-react';

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
    <div className="ui-trainer-family workshop-legacy archive-workshop flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <WorkshopHeader icon={<GitBranch size={26}/>} eyebrow="Двоичное дерево поиска (BST)" title="Архив поиска" description={task.lesson?.goal || `Найди число ${target} в дереве.`} onReset={resetGame}
        badges={<><WorkshopBadge label="Цель поиска">{target}</WorkshopBadge><WorkshopBadge label="Шагов (операций)">{steps}</WorkshopBadge></>}/>

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
      <div className="archive-scene flex-1 border rounded-xl p-4 flex items-center justify-center relative">
        <svg viewBox={`0 0 500 ${Math.max(280,...nodes.map(n=>n.y+40))}`} className="w-full max-w-xl h-auto select-none" role="img" aria-label={`Дерево поиска. Текущий узел ${currentNode.val}. Цель ${target}.`}>
          {nodes.flatMap(node => [node.left,node.right].filter(Boolean).map(child => <line key={`${node.val}-${child!.val}`} x1={node.x} y1={node.y} x2={child!.x} y2={child!.y} stroke={visitedPath.includes(child!.val)?'#00ff41':'#374151'} strokeWidth="3"/>))}
          {nodes.map(node => {
            const isCurrent = currentNode.val === node.val;
            const isVisited = visitedPath.includes(node.val);
            const isTargetNode = node.val === target;

            return (
              <g key={node.val} data-current={isCurrent} data-visited={isVisited}>
                <rect x={node.x-29} y={node.y-30} width={58} height={63} rx={6} fill="#0b192a" stroke={isTargetNode && completed ? '#87efb2' : isCurrent ? '#f3d26c' : isVisited ? '#7eece0' : '#415a70'} strokeWidth={isCurrent ? 3 : 1} />
                <image href="/art/cyber-city/archive-node.png" x={node.x-28} y={node.y-29} width={56} height={56} />
                <rect x={node.x-16} y={node.y-11} width={32} height={22} rx={2} fill={isCurrent ? '#f3d26c' : isVisited ? '#7eece0' : '#071321'} />
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
          <GameButton size="compact"
            onClick={() => handleNavigate('left')}
            disabled={!currentNode.left}
            className={`py-4 px-6 rounded-xl font-mono font-bold text-xs uppercase flex items-center justify-center gap-3 transition-all ${
              currentNode.left
                ? 'bg-cyber-neonBlue text-black hover:bg-white shadow-[0_0_15px_rgba(0,243,255,0.2)]'
                : 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800'
            }`}
          >
            ◀ ВЛЕВО
          </GameButton>
          <GameButton size="compact"
            onClick={() => handleNavigate('right')}
            disabled={!currentNode.right}
            className={`py-4 px-6 rounded-xl font-mono font-bold text-xs uppercase flex items-center justify-center gap-3 transition-all ${
              currentNode.right
                ? 'bg-cyber-neonYellow text-black hover:bg-white shadow-[0_0_15px_rgba(252,238,10,0.2)]'
                : 'bg-gray-900 text-gray-600 cursor-not-allowed border border-gray-800'
            }`}
          >
            ВПРАВО ▶
          </GameButton>
        </div>
      ) : (
        <div className="mt-4 p-4 bg-cyber-neonGreen/15 border border-cyber-neonGreen rounded-xl flex items-center justify-between text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyber-neonGreen" size={26} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase">ПОИСК УСПЕШНО ЗАВЕРШЕН!</div>
              <div className="text-xs text-gray-300">
                Найдено число {target}. Выполнено переходов: <span className="font-bold text-white">{steps}</span>.
              </div>
            </div>
          </div>
          <p role="status" className="text-sm text-emerald-200">Результат поиска получен</p>
        </div>
      )}
    </div>
  );
};
