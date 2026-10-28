import {GameButton, WorkshopHeader, WorkshopBadge} from '../GameUI';
import React, { useState, useEffect } from 'react';
import { Task } from '../../types';
import { playSound } from '../../utils/sound';
import { Network, CheckCircle, Send, Radio, AlertTriangle } from 'lucide-react';

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
  status?: 'down';
}

const NODES: NodeData[] = [
  { id: 'client', label: 'Клиент (ПК)', x: 50, y: 140, status: 'online' },
  { id: 'rA', label: 'Роутер A', x: 170, y: 70, status: 'online' },
  { id: 'rB', label: 'Роутер B', x: 170, y: 210, status: 'online' },
  { id: 'rC', label: 'Роутер C', x: 310, y: 90, status: 'online' },
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

export function getNetworkScenario(task:Task) {
  const cfg = task.networkConfig;
  const legacy = cfg && /^[A-F]$/.test(cfg.startNode) && !cfg.nodes?.length;
  const legacyNodes:NodeData[]=[
    {id:'A',label:'Клиент A',x:50,y:140,status:'online'},
    {id:'B',label:'Роутер B',x:170,y:70,status:'online'},
    {id:'C',label:'Узел C',x:310,y:70,status:'online'},
    {id:'D',label:'Сервер D',x:440,y:140,status:'online'},
    {id:'E',label:'Узел E',x:170,y:210,status:'overloaded'},
    {id:'F',label:'Сервер F',x:310,y:210,status:'online'},
  ];
  const legacyEdges:EdgeData[]=[{from:'A',to:'B',latencyMs:10},{from:'B',to:'C',latencyMs:12},{from:'C',to:'D',latencyMs:12},{from:'A',to:'E',latencyMs:15},{from:'E',to:'F',latencyMs:15},{from:'B',to:'F',latencyMs:10},{from:'F',to:'D',latencyMs:15}];
  const nodes = cfg?.nodes?.length ? cfg.nodes : legacy ? legacyNodes : NODES;
  const edges = cfg?.edges?.length ? cfg.edges : legacy ? legacyEdges : EDGES;
  const startNode = cfg?.startNode || 'client';
  const endNode = cfg?.endNode || 'server';
  const maxLatency = cfg?.maxLatencyMs ?? 50;
  return {nodes,edges,startNode,endNode,maxLatency};
}
export const NetworkRouteGame: React.FC<NetworkRouteGameProps> = ({ task, onComplete }) => {
  const {nodes,edges,startNode,endNode,maxLatency}=getNetworkScenario(task);
  const labelOf = (id: string) => nodes.find(n => n.id === id)?.label ?? id;
  // Include circles and labels even when an authored map exceeds the original canvas.
  const canvasWidth = Math.max(500, ...nodes.map(node => node.x + Math.max(32, node.label.length * 3.5) + 12));
  const canvasHeight = Math.max(280, ...nodes.map(node => node.y + 48));

  // Edge latency labels: midpoint, nudged along the edge when too close to a node or another label.
  const edgeLabelPos: { x: number; y: number }[] = [];
  for (const edge of edges) {
    const a = nodes.find(n => n.id === edge.from)!;
    const b = nodes.find(n => n.id === edge.to)!;
    const clear = (x: number, y: number) =>
      !nodes.some(n => Math.hypot(x - n.x, y - n.y) < 34) &&
      !edgeLabelPos.some(p => Math.hypot(x - p.x, y - p.y) < 34);
    let pos = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
    if (!clear(pos.x, pos.y)) {
      for (const t of [0.35, 0.65, 0.25, 0.75]) {
        const cand = { x: a.x + (b.x - a.x) * t, y: a.y + (b.y - a.y) * t };
        if (clear(cand.x, cand.y)) { pos = cand; break; }
      }
    }
    edgeLabelPos.push(pos);
  }

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
      setErrorMsg(`⚠️ Нет прямого оптоволоконного кабеля между «${labelOf(lastNode)}» и «${labelOf(nodeId)}»!`);
      return;
    }

    if (edge.status === 'down') {
      playSound('error');
      setErrorMsg('⚠️ Это соединение закрыто. Найди обход.');
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
        setErrorMsg('⚠️ Маршрут проходит через перегруженный узел. Найди путь через свободные узлы.');
      } else if (totalLatency <= maxLatency) {
        // Optimal route: client -> rA -> rC -> server = 15 + 20 + 15 = 50ms
        setCompleted(true);
        playSound('success');
        onComplete();
      } else {
        playSound('click');
        setErrorMsg(`Пакет доставлен, но задержка ${totalLatency} мс превышает предел ${maxLatency} мс. Сравни другие пути.`);
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
  const overLimit = currentTotalLatency > maxLatency;
  const undoStep = () => {
    if (completed || selectedPath.length <= 1) return;
    setSelectedPath(selectedPath.slice(0, -1));
    setErrorMsg('');
    playSound('click');
  };

  return (
    <div className="ui-trainer-family workshop-legacy network-workshop flex flex-col h-full bg-gray-950 p-4 md:p-6 overflow-y-auto">
      {/* Header */}
      <WorkshopHeader icon={<Network size={26}/>} eyebrow="Маршрутизация в интернете" title="Доставка пакета" description={task.lesson?.goal || `Проведи пакет до «${labelOf(endNode)}» за ${maxLatency} мс.`} onReset={resetGame}
        badges={<WorkshopBadge label="Сейчас"><span className={overLimit ? 'text-amber-300' : undefined}>{currentTotalLatency} из {maxLatency} мс</span></WorkshopBadge>}>
        <div className="network-latency-track"><div className="network-latency-fill" data-over={overLimit} style={{ width: `${Math.min(100, (currentTotalLatency / Math.max(1, maxLatency)) * 100)}%` }} /></div>
        <GameButton size="compact" variant="secondary"
          onClick={undoStep}
          disabled={completed || selectedPath.length <= 1}
          className="min-h-[44px]"
        >
          Шаг назад
        </GameButton>
      </WorkshopHeader>

      {/* Instructions */}
      <div className="bg-gray-900/80 border border-cyber-neonBlue/30 rounded-xl p-3.5 mb-4 text-xs font-mono text-gray-200 flex items-center justify-between gap-3 flex-wrap">
        <div className="flex items-center gap-2">
          <Radio size={16} className="text-cyber-neonBlue" />
          <span>Нажимай на узлы по очереди — от «{labelOf(startNode)}» до «{labelOf(endNode)}». Числа на линиях — время в миллисекундах (мс). Сложи их: всего должно быть не больше {maxLatency} мс. Узлы со знаком «!» перегружены — обходи их.</span>
        </div>
        <div className="text-xs text-cyber-neonYellow font-bold">
          Путь: {selectedPath.map(labelOf).join(' ➔ ')}
        </div>
      </div>

      {errorMsg && (
        <div role="alert" className="workshop-feedback workshop-feedback--error font-mono">
          <AlertTriangle size={16}/>
          <span>{errorMsg}</span>
        </div>
      )}

      {/* Interactive Network Graph Canvas / SVG */}
      <div className="network-scene flex-1 border rounded-xl p-4 flex items-center justify-center relative">
        <svg viewBox={`0 0 ${canvasWidth} ${canvasHeight}`} className="w-full max-w-3xl h-auto select-none">
          {/* Edges */}
          {edges.map((edge, idx) => {
            const nodeFrom = nodes.find(n => n.id === edge.from)!;
            const nodeTo = nodes.find(n => n.id === edge.to)!;
            const down = edge.status === 'down';

            // Check if this edge is active in path
            const fromIdx = selectedPath.indexOf(edge.from);
            const toIdx = selectedPath.indexOf(edge.to);
            const isActive = !down && fromIdx !== -1 && toIdx !== -1 && Math.abs(fromIdx - toIdx) === 1;

            const { x: midX, y: midY } = edgeLabelPos[idx];

            return (
              <g key={idx}>
                <line
                  x1={nodeFrom.x}
                  y1={nodeFrom.y}
                  x2={nodeTo.x}
                  y2={nodeTo.y}
                  stroke={down ? '#f87171' : isActive ? '#00ff41' : '#374151'}
                  strokeWidth={isActive ? '3.5' : '1.5'}
                  strokeDasharray={down || edge.latencyMs > 50 ? '4 4' : undefined}
                />
                {/* Weight badge */}
                <rect
                  x={midX - (down ? 34 : 14)}
                  y={midY - 8}
                  width={down ? 68 : 28}
                  height="16"
                  rx="4"
                  fill="#111827"
                  stroke={down ? '#f87171' : isActive ? '#00ff41' : '#4b5563'}
                  strokeWidth="1"
                />
                <text
                  x={midX}
                  y={midY + 4}
                  textAnchor="middle"
                  fill={down ? '#f87171' : isActive ? '#00ff41' : '#9ca3af'}
                  fontSize="11"
                  fontFamily="Rajdhani, system-ui, sans-serif"
                  fontWeight="bold"
                >
                  {down ? '✕ закрыто' : edge.latencyMs}
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
                role="button" tabIndex={completed ? -1 : 0} aria-label={node.label} aria-pressed={isSelected} aria-disabled={completed} data-node={node.id}
                onKeyDown={event => {if(event.key === "Enter" || event.key === " "){event.preventDefault();handleNodeClick(node.id);}}}
                className="cursor-pointer group"
              >
                <rect x={node.x-28} y={node.y-30} width={56} height={56} rx={8} fill={isOverloaded ? '#451b27' : '#0d1d30'} stroke={isOverloaded ? '#ef889c' : isSelected ? '#7eece0' : '#557087'} strokeWidth={isLast ? 3 : 1} />
                <image href={`/art/cyber-city/${node.id===startNode||node.id===endNode?'archive-node':'router-node'}.png`} x={node.x-27} y={node.y-30} width={54} height={54} />
                <rect x={node.x-16} y={node.y-10} width={32} height={22} rx={3} fill={isSelected ? '#7eece0' : '#0b1628'} />
                {isOverloaded && <text x={node.x+21} y={node.y-19} fill="#ffc2cf" fontSize={18} fontWeight="bold">!</text>}
                <text
                  x={node.x}
                  y={node.y + 4}
                  textAnchor="middle"
                  fill={isOverloaded ? '#f87171' : isSelected ? '#000000' : '#ffffff'}
                  fontSize="11"
                  fontFamily="Rajdhani, system-ui, sans-serif"
                  fontWeight="bold"
                >
                  {node.id === startNode ? 'ПК' : node.id === endNode ? 'WEB' : node.id.replace('r', '')}
                </text>

                {/* Node Label underneath */}
                <text
                  x={node.x}
                  y={node.y + 40}
                  textAnchor="middle"
                  fill={isOverloaded ? '#ef4444' : isSelected ? '#00f3ff' : '#9ca3af'}
                  fontSize="12"
                  fontFamily="Rajdhani, system-ui, sans-serif"
                  fontWeight="bold"
                >
                  {node.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      <div className="network-legend" aria-label="Обозначения на карте">
        <span><i className="legend-line" /> соединение</span>
        <span><i className="legend-line legend-slow" /> пунктир — медленное (больше 50 мс)</span>
        <span><i className="legend-line legend-down" /> красный пунктир — закрытое</span>
        <span><i className="legend-node" /> ! — перегруженный узел</span>
      </div>
      <div className="network-node-controls grid grid-cols-2 gap-2 sm:hidden" aria-label="Выбор узла маршрута">
        {nodes.map(node => <GameButton size="compact" key={node.id} disabled={completed}
          onClick={() => handleNodeClick(node.id)}
          className={`min-h-12 rounded-lg border px-3 py-2 text-sm ${selectedPath.includes(node.id) ? 'border-cyan-400 text-cyan-200 bg-cyan-950' : 'border-slate-600 text-slate-200 bg-slate-900'}`}>
          {node.label}{node.status==='overloaded'?' · перегружен':''}
        </GameButton>)}
      </div>

      {/* Victory Banner */}
      {completed && (
        <div className="mt-4 p-4 bg-cyber-neonGreen/15 border border-cyber-neonGreen rounded-xl flex items-center justify-between text-white animate-fade-in">
          <div className="flex items-center gap-3">
            <CheckCircle className="text-cyber-neonGreen" size={26} />
            <div>
              <div className="font-bold text-sm text-cyber-neonGreen uppercase">ПАКЕТ ДОСТАВЛЕН!</div>
              <div className="text-xs text-gray-300">
                Задержка маршрута — <span className="font-bold text-white">{currentTotalLatency} мс</span>. Она не превышает ограничение {maxLatency} мс; перегруженные узлы не использованы.
              </div>
            </div>
          </div>
          <p role="status" className="text-sm text-emerald-200">Результат доставки получен</p>
        </div>
      )}
    </div>
  );
};
