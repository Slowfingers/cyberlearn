
import React, { useEffect, useRef } from 'react';
import { Task, GridEvent } from '../types';
import { playSound } from '../utils/sound';

interface GameGridProps {
  task: Task;
  playerPos: [number, number]; // [x, y]
  pathHistory: [number, number][]; // Trace
  droneColor?: string; // Customization
  activeAction?: GridEvent | null; // Trigger animations for move/jump/attack
  destroyedObstacles?: string[]; // IDs of destroyed walls "x,y"
}

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    color: string;
}

interface LaserBeam {
    sx: number;
    sy: number;
    ex: number;
    ey: number;
    life: number;
}

const GameGrid: React.FC<GameGridProps> = ({ task, playerPos, pathHistory, droneColor = '#00f3ff', activeAction, destroyedObstacles = [] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const requestRef = useRef<number>(0);
  const taskRef = useRef(task);
  const playerPosRef = useRef(playerPos);
  const prevPlayerPosRef = useRef(playerPos);
  const pathHistoryRef = useRef(pathHistory);
  const colorRef = useRef(droneColor);
  const particlesRef = useRef<Particle[]>([]);
  const lasersRef = useRef<LaserBeam[]>([]);
  const destroyedRef = useRef(destroyedObstacles);
  const shakeRef = useRef(0);

  useEffect(() => {
    taskRef.current = task;
    
    // Check if player moved to spawn particles and play sound
    if (prevPlayerPosRef.current[0] !== playerPos[0] || prevPlayerPosRef.current[1] !== playerPos[1]) {
        // Spawn particles at old position moving towards new
        spawnParticles(prevPlayerPosRef.current[0], prevPlayerPosRef.current[1], 12, colorRef.current || '#00f3ff');
        playSound('move');
    }
    prevPlayerPosRef.current = playerPos;
    playerPosRef.current = playerPos;
    pathHistoryRef.current = pathHistory;
    colorRef.current = droneColor;
    destroyedRef.current = destroyedObstacles;
  }, [task, playerPos, pathHistory, droneColor, destroyedObstacles]);

  // Handle action events (jump land burst, attack laser)
  useEffect(() => {
      if (!activeAction) return;
      if (activeAction.type === 'jump') {
          spawnParticles(activeAction.x, activeAction.y, 10, '#fcee0a');
          shakeRef.current = 5;
      } else if (activeAction.type === 'attack') {
          playSound('error'); // zap sound
          if (activeAction.targetX !== undefined && activeAction.targetY !== undefined) {
              lasersRef.current.push({
                  sx: activeAction.x,
                  sy: activeAction.y,
                  ex: activeAction.targetX,
                  ey: activeAction.targetY,
                  life: 1.0
              });
              const hitWall = task.mapConfig?.obstacles.some(o => o[0] === activeAction.targetX && o[1] === activeAction.targetY);
              spawnParticles(activeAction.targetX, activeAction.targetY, hitWall ? 20 : 5, hitWall ? '#ff003c' : '#ffffff');
              if (hitWall) shakeRef.current = 10;
          }
      }
  }, [activeAction]);

  const spawnParticles = (gx: number, gy: number, count = 12, color?: string) => {
      // Spawn heavier burst for mobile visibility
      for(let i=0; i<count; i++) {
          particlesRef.current.push({
              x: gx + 0.5, // Center of cell
              y: gy + 0.5,
              vx: (Math.random() - 0.5) * 0.2, // Faster speed
              vy: (Math.random() - 0.5) * 0.2,
              life: 1.0,
              color: color || colorRef.current || '#00f3ff'
          });
      }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;

    // --- UTILS ---
    const isObstacle = (x: number, y: number, obstacles: [number, number][]) => {
        // Exists in map AND not destroyed by attack
        const exists = obstacles.some(obs => obs[0] === x && obs[1] === y);
        return exists && !destroyedRef.current.includes(`${x},${y}`);
    };

    // --- DRAWING FUNCTIONS ---

    const drawGridBg = (ctx: CanvasRenderingContext2D, width: number, height: number, cellSize: number, offsetX: number, offsetY: number) => {
        ctx.strokeStyle = 'rgba(0, 243, 255, 0.08)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        for (let x = offsetX; x <= width; x += cellSize) {
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
        }
        for (let y = offsetY; y <= height; y += cellSize) {
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
        }
        ctx.stroke();
    };

    const drawNode = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, isBlocked: boolean) => {
        if (isBlocked) {
            ctx.strokeStyle = '#ff003c';
            ctx.lineWidth = 2;
            ctx.shadowColor = '#ff003c';
            ctx.shadowBlur = 5;
            const s = size * 0.2;
            ctx.beginPath();
            ctx.moveTo(x - s, y - s);
            ctx.lineTo(x + s, y + s);
            ctx.moveTo(x + s, y - s);
            ctx.lineTo(x - s, y + s);
            ctx.stroke();
            ctx.shadowBlur = 0;
        } else {
            ctx.fillStyle = '#1a1a20';
            ctx.beginPath();
            ctx.arc(x, y, size * 0.08, 0, Math.PI * 2);
            ctx.fill();
            ctx.fillStyle = '#00f3ff';
            ctx.beginPath();
            ctx.arc(x, y, size * 0.03, 0, Math.PI * 2); 
            ctx.fill();
        }
    };

    const drawConnection = (ctx: CanvasRenderingContext2D, x1: number, y1: number, x2: number, y2: number) => {
        ctx.beginPath();
        ctx.strokeStyle = '#0f3f4a'; 
        ctx.lineWidth = 1;
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
    };

    const drawGoal = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, time: number) => {
        ctx.save();
        ctx.translate(x, y);
        const s = size * 0.35; 
        ctx.strokeStyle = '#00ff41';
        ctx.lineWidth = 2;
        ctx.shadowColor = '#00ff41';
        ctx.shadowBlur = 10;
        ctx.save();
        ctx.rotate(time);
        ctx.strokeRect(-s/2, -s/2, s, s);
        ctx.restore();
        ctx.save();
        ctx.rotate(-time * 1.5);
        ctx.beginPath();
        ctx.moveTo(0, -s/3);
        ctx.lineTo(s/3, 0);
        ctx.lineTo(0, s/3);
        ctx.lineTo(-s/3, 0);
        ctx.closePath();
        ctx.fillStyle = 'rgba(0, 255, 65, 0.5)';
        ctx.fill();
        ctx.restore();
        ctx.restore();
    };

    const drawPlayer = (ctx: CanvasRenderingContext2D, x: number, y: number, size: number, time: number) => {
        const primaryColor = colorRef.current || '#00f3ff';
        ctx.save();
        ctx.translate(x, y);
        // Bigger bob for visibility
        const bob = Math.sin(time * 5) * 4; 
        ctx.translate(0, bob);
        const s = size * 0.5; // Larger player
        ctx.shadowColor = primaryColor;
        ctx.shadowBlur = 15;
        ctx.fillStyle = primaryColor;
        ctx.beginPath();
        ctx.moveTo(0, -s/2);
        ctx.lineTo(s/2, s/2);
        ctx.lineTo(0, s/4);
        ctx.lineTo(-s/2, s/2);
        ctx.closePath();
        ctx.fill();
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(0, 0, s/8, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
    };

    const render = () => {
        const rect = container.getBoundingClientRect();
        
        // PAUSE RENDER IF HIDDEN (0 SIZE) TO PREVENT GLITCHES
        if (rect.width === 0 || rect.height === 0) {
            requestRef.current = requestAnimationFrame(render);
            return;
        }

        const time = performance.now() / 1000;
        const { gridSize, start, end, obstacles } = taskRef.current.mapConfig;
        const currentPos = playerPosRef.current;
        const path = pathHistoryRef.current;
        const primaryColor = colorRef.current || '#00f3ff';

        const dpr = window.devicePixelRatio || 1;
        
        if (canvas.width !== rect.width * dpr || canvas.height !== rect.height * dpr) {
            canvas.width = rect.width * dpr;
            canvas.height = rect.height * dpr;
        }

        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        
        // Screen shake
        if (shakeRef.current > 0) {
            const dx = (Math.random() - 0.5) * shakeRef.current;
            const dy = (Math.random() - 0.5) * shakeRef.current;
            ctx.translate(dx, dy);
            shakeRef.current *= 0.9;
            if (shakeRef.current < 0.5) shakeRef.current = 0;
        }

        ctx.fillStyle = '#050505';
        ctx.fillRect(0, 0, rect.width, rect.height);

        const padding = 50; 
        const availableSize = Math.min(rect.width, rect.height) - (padding * 2);
        const cellSize = availableSize / (gridSize - 1); 
        
        const startX = (rect.width - availableSize) / 2;
        const startY = (rect.height - availableSize) / 2;

        const getPos = (gx: number, gy: number) => ({
            x: startX + gx * cellSize,
            y: startY + gy * cellSize
        });

        // Bg
        drawGridBg(ctx, rect.width, rect.height, cellSize, startX % cellSize, startY % cellSize);

        // Connections
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const { x: px, y: py } = getPos(x, y);
                if (isObstacle(x, y, obstacles)) continue;
                if (x < gridSize - 1 && !isObstacle(x + 1, y, obstacles)) {
                    const { x: nx, y: ny } = getPos(x + 1, y);
                    drawConnection(ctx, px, py, nx, ny);
                }
                if (y < gridSize - 1 && !isObstacle(x, y + 1, obstacles)) {
                    const { x: nx, y: ny } = getPos(x, y + 1);
                    drawConnection(ctx, px, py, nx, ny);
                }
            }
        }

        // Nodes
        for (let y = 0; y < gridSize; y++) {
            for (let x = 0; x < gridSize; x++) {
                const { x: px, y: py } = getPos(x, y);
                const blocked = isObstacle(x, y, obstacles);
                drawNode(ctx, px, py, cellSize, blocked);
            }
        }

        // Trace
        if (path.length > 1) {
            ctx.save();
            ctx.beginPath();
            ctx.strokeStyle = primaryColor;
            ctx.lineWidth = 3;
            ctx.lineJoin = 'round';
            ctx.shadowColor = primaryColor;
            ctx.shadowBlur = 10;
            path.forEach((p, i) => {
                const { x, y } = getPos(p[0], p[1]);
                if (i === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            });
            ctx.stroke();
            ctx.restore();
        }

        // Laser beams (attack)
        for (let i = lasersRef.current.length - 1; i >= 0; i--) {
            const beam = lasersRef.current[i];
            beam.life -= 0.1;
            const start = getPos(beam.sx, beam.sy);
            const end = getPos(beam.ex, beam.ey);
            ctx.save();
            ctx.strokeStyle = `rgba(255, 0, 60, ${beam.life})`;
            ctx.lineWidth = 4 + Math.random() * 4;
            ctx.shadowColor = '#ff003c';
            ctx.shadowBlur = 20;
            ctx.beginPath();
            ctx.moveTo(start.x, start.y);
            ctx.lineTo(end.x, end.y);
            ctx.stroke();
            ctx.restore();
            if (beam.life <= 0) lasersRef.current.splice(i, 1);
        }

        // Proper Particle Rendering
        // Update particles
        for(let i = particlesRef.current.length - 1; i >= 0; i--) {
            const p = particlesRef.current[i];
            p.x += p.vx;
            p.y += p.vy;
            p.life -= 0.05;
            
            // Map Particle logic coords (grid relative) to canvas pixels
            const px = startX + p.x * cellSize;
            const py = startY + p.y * cellSize;
            
            ctx.globalAlpha = Math.max(0, p.life);
            ctx.fillStyle = p.color;
            ctx.fillRect(px, py, 6, 6); // Bigger particles
            ctx.globalAlpha = 1.0;

            if (p.life <= 0) particlesRef.current.splice(i, 1);
        }


        // Goal & Player
        const { x: ex, y: ey } = getPos(end[0], end[1]);
        drawGoal(ctx, ex, ey, cellSize, time);

        const { x: plx, y: ply } = getPos(currentPos[0], currentPos[1]);
        drawPlayer(ctx, plx, ply, cellSize, time);

        // Scanline
        ctx.fillStyle = 'rgba(0, 243, 255, 0.03)';
        const scanY = (time * 100) % rect.height;
        ctx.fillRect(0, scanY, rect.width, 10);

        requestRef.current = requestAnimationFrame(render);
    };

    requestRef.current = requestAnimationFrame(render);
    return () => {
        if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, []);

  return (
    <div ref={containerRef} className="w-full h-full relative bg-cyber-black overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 z-10 pointer-events-none opacity-20" 
             style={{
                 backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 1px, #000 2px, #000 4px)`
             }}>
        </div>
        <div className="absolute top-2 left-2 z-20 text-[8px] text-cyber-neonBlue font-mono opacity-60">
            SEC_GRID: ONLINE<br/>
            COORDS: {playerPos[0]}:{playerPos[1]}
        </div>
        <canvas ref={canvasRef} className="block w-full h-full relative z-0" />
    </div>
  );
};

export default GameGrid;
