import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Network, CheckCircle, RotateCcw, Send, Radio, AlertTriangle } from 'lucide-react';

interface NetworkRouteGameProps {
  task: Task;
  onComplete: () => void;
}

interface NodeData {
  id: string;
  label: string;
  x: number;
  y: number;
  status: 'online' | 'overloaded';
}

interface EdgeData {
  from: string;
  to: string;
  latencyMs: number;
}

const NODES: NodeData[] = [
  { id: 'client', label: 'Клиент (ПК)', x: 50, y: 140, status: 'online' },
  { id: 'rA', label: 'Роутер A', x: 170, y: 70, status: 'online' },
  { id: 'rB', label: 'Роутер B', x: 170, y: 210, status: 'online' },
  { id: 'rC', label: 'DNS Узел C', x: 310, y: 90, status: 'online' },
  { id: 'rD', label: 'Шлюз D', x: 310, y: 210, status: 'overloaded' },
  { id: 'server', label: 'Сервер Матрицы', x: 440, y: 140, status: 'online' },
];

const EDGES: EdgeData[] = [
  { from: 'client', to: 'rA', latencyMs: 15 },
  { from: 'client', to: 'rB', latencyMs: 40 },
  { from: 'rA', to: 'rC', latencyMs: 20 },
  { from: 'rA', to: 'rD', latencyMs: 65 },
  { from: 'rB', to: 'rC', latencyMs: 25 },
  { from: 'rB', to: 'rD', latencyMs: 30 },
  { from: 'rC', to: 'server', latencyMs: 15 },
  { from: 'rD', to: 'server', latencyMs: 80 }, // DDoS lag
];

export const NetworkRouteGame: React.FC<NetworkRouteGameProps> = ({ task, onComplete }) => {
  const cfg = task.networkConfig;
  const nodes = cfg?.nodes?.length ? cfg.nodes : NODES;
  const edges = cfg?.edges?.length ? cfg.edges : EDGES;
  const startNode = cfg?.startNode || 'client';
  const endNode = cfg?.endNode || 'server';
  const maxLatency = cfg?.maxLatencyMs ?? 50;

  const [selectedPath, setSelectedPath] = useState<string[]>([startNode]);
  const [completed, setCompleted] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');

  useEffect(() => {
    resetGame();
  }, [task.id]);

  const resetGame = () => {
    setSelectedPath([startNode]);
    setCompleted(false);
    setErrorMsg('');
  };

  const handleNodeClick = (nodeId: string) => {
    if (completed) return;
    setErrorMsg('');

    const lastNode = selectedPath[selectedPath.length - 1];
    if (lastNode === nodeId) return;

    // Check if there is an edge from lastNode to nodeId
    const edge = edges.find(
      e => (e.from === lastNode && e.to === nodeId) || (e.from === nodeId && e.to === lastNode)
    );

    if (!edge) {
      playSound('error');
      setErrorMsg(`⚠️ Нет прямого оптоволоконного кабеля между "${lastNode}" и "${nodeId}"!`);
      return;
    }

    if (selectedPath.includes(nodeId)) {
      // Loop or backtracking
      const idx = selectedPath.indexOf(nodeId);
      setSelectedPath(selectedPath.slice(0, idx + 1));
      playSound('click');
      return;
    }

    // Add node
    const newPath = [...selectedPath, nodeId];
    setSelectedPath(newPath);
    playSound('move');

    // If reached server
    if (nodeId === endNode) {
      // Check total latency
      let totalLatency = 0;
      let hitOverloaded = false;

      for (let i = 0; i < newPath.length - 1; i++) {
        const u = newPath[i];
        const v = newPath[i + 1];
        const ed = edges.find(
          e => (e.from === u && e.to === v) || (e.from === v && e.to === u)
        );
        if (ed) totalLatency += ed.latencyMs;

        const targetNode = nodes.find(n => n.id === v);
        if (targetNode?.status === 'overloaded') {
          hitOverloaded = true;
        }
      }

      if (hitOverloaded) {
        playSound('error');
        setErrorMsg(`⚠️ Маршрут проходит через перегруженный узел! Пинг слишком высокий (${totalLatency} мс). Выбери более чистый канал!`);
      } else if (totalLatency <= maxLatency) {
        // Optimal route: client -> rA -> rC -> server = 15 + 20 + 15 = 50ms
        setCompleted(true);
        playSound('success');
        onComplete();
      } else {
        playSound('click');
        setErrorMsg(`Пакет доставлен, но задержка ${totalLatency} мс. Можно быстрее! Попробуй путь через Роутер A.`);
      }
    }
  };

  // Calculate current latency
  let currentTotalLatency = 0;
  for (let i = 0; i < selectedPath.length - 1; i++) {
    const u = selectedPath[i];
    const v = selectedPath[i + 1];
    const ed = edges.find(
      e => (e.from === u && e.to === v) || (e.from === v && e.to === u)
    );
    if (ed) currentTotalLatency += ed.latencyMs;
  }

  return (
    <div className="flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-black/70 border border-cyber-neonBlue/30 rounded-xl mb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded bg-cyber-neonBlue/20 text-cyber-neonBlue border border-cyber-neonBlue/40">
            <Network size={22} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-widest">МАРШРУТИЗАЦИЯ В ИНТЕРНЕТЕ // ТЕОРИЯ ГРАФОВ</div>
            <h2 className="text-base md:text-lg font-bold text-white">Кратчайший Путь Пакета (Алгоритм Дейкстры)</h2>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="bg-gray-900 border border-cyber-neonGreen/30 px-3 py-1.5 rounded-lg text-center font-mono">
            <div className="text-[9px] text-gray-400">СУММАРНЫЙ ПИНГ</div>
            <div className="text-lg font-bold text-cyber-neonGreen">{currentTotalLatency} мс</div>
          </div>
          <button
            onClick={resetGame}
            className="p-2.5 bg-gray-900 hover:bg-gray-800 text-gray-300 border border-gray-800 rounded-lg transition-colors"
            title="Сброс пути"
          >
            <RotateCcw size={16} />
          </button>
        </div>
      </div>

      {/* Instructions */}
      <div className="bg-gray-900/80 border border-cyber-neonBlue/30 rounded-xl p-3.5 mb-4 text-xs font-mono text-gray-200 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Radio size={16} className="text-cyber-neonBlue" />
          <span>Кликай по промежуточным узлам графа, чтобы передать пакет от Клиента к Серверу с минимальной задержкой (цель ≤ {maxLatency} мс)!</span>
        </div>
        <div className="text-xs text-cyber-neonYellow font-bold">
          Путь: {selectedPath.join(' ➔ ')}
        </div>
      </div>

      {errorMsg && (
        <div className="mb-4 p-3 bg-red-950/40 border border-red-500 rounded-lg text-xs font-mono text-red-300 flex items-center gap-2 animate-fade-in">
          <AlertTriangle size={16} className="text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Interactive Network Graph Canvas / SVG */}
      <div className="flex-1 bg-black border border-gray-800 rounded-xl p-4 flex items-center justify-center min-h-[300px] relative overflow-hidden">
        <svg viewBox="0 0 500 280" className="w-full max-w-xl h-auto select-none">
          {/* Edges */}
          {edges.map((edge, idx) => {
            const nodeFrom = nodes.find(n => n.id === edge.from)!;
            const nodeTo = nodes.find(n => n.id === edge.to)!;

            // Check if this edge is active in path
            const fromIdx = selectedPath.indexOf(edge.from);
            const toIdx = selectedPath.indexOf(edge.to);
            const isActive = fromIdx !== -1 && toIdx !== -1 && Math.abs(fromIdx - toIdx) === 1;

            const midX = (nodeFrom.x + nodeTo.x) / 2;
            const midY = (nodeFrom.y + nodeTo.y) / 2;

            return (
              <g key={idx}>
                <line
                  x1={nodeFrom.x}
                  y1={nodeFrom.y}
                  x2={nodeTo.x}
                  y2={nodeTo.y}
                  stroke={isActive ? '#00ff41' : '#374151'}
                  strokeWidth={isActive ? '3.5' : '1.5'}
                  strokeDasharray={edge.latencyMs > 50 ? '4 4' : undefined}
                />
                {/* Weight badge */}
                <rect
                  x={midX - 14}
                  y={midY - 8}
                  width="28"
                  height="16"
                  rx="4"
                  fill="#111827"
                  stroke={isActive ? '#00ff41' : '#4b5563'}
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  fill={isActive ? '#00ff41' : '#9ca3af'}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {edge.latencyMs}
                </text>
              </g>
            );
          })}

          {/* Nodes */}
          {nodes.map(node => {
            const isSelected = selectedPath.includes(node.id);
            const isLast = selectedPath[selectedPath.length - 1] === node.id;
            const isOverloaded = node.status === 'overloaded';

            return (
              <g
                key={node.id}
                onClick={() => handleNodeClick(node.id)}
                className="cursor-pointer group"
              >
                <circle
                  cx={node.x}
                  cy={node.y}
                  r={isLast ? 22 : 18}
                  fill={isOverloaded ? '#450a0a' : isSelected ? '#00ff41' : '#1f2937'}
                  stroke={isOverloaded ? '#ef4444' : isSelected ? '#ffffff' : '#6b7280'}
                  strokeWidth={isLast ? '3' : '2'}
                  className="transition-all duration-200 group-hover:scale-110"
                  filter={isSelected ? 'drop-shadow(0px 0px 8px #00ff41)' : ''}
                />
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill={isOverloaded ? '#f87171' : isSelected ? '#000000' : '#ffffff'}
                  fontSize="9"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.id === startNode ? 'ПК' : node.id === endNode ? 'WEB' : node.id.replace('r', '')}
                </text>

                {/* Node Label underneath */}
                <text
                  x={node.x}
                  y={node.y + 30}
                  textAnchor="middle"
                  fill={isOverloaded ? '#ef4444' : isSelected ? '#00f3ff' : '#9ca3af'}
                  fontSize="10"
                  fontFamily="monospace"
                  fontWeight="bold"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Victory Banner */}
      {completed && (
        <div className="mt-4 p-4 bg-cyber-neonGreen/15 border border-cyber-neonGreen rounded-xl flex items-center justify-between text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyber-neonGreen" size={26} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase">ОПТИМАЛЬНЫЙ МАРШРУТ ПОСТРОЕН!</div>
              <div className="text-xs text-gray-300">
                Пакет успешно доставлен за минимальные <span className="font-bold text-white">{currentTotalLatency} мс</span> в обход перегруженного роутера D!
              </div>
            </div>
          </div>
          <button
            onClick={onComplete}
            className="px-5 py-2 bg-cyber-neonGreen text-black font-bold uppercase rounded-lg text-xs hover:bg-white transition-colors"
          >
            ПОЛУЧИТЬ НАГРАДУ (+{task.xpReward} XP)
          </button>
        </div>
      )}
    </div>
  );
};
