
import React, { useEffect, useRef, useState } from 'react';
import { Task, GridEvent, GridHeading, User } from '../types';
import { playSound } from '../utils/sound';
import { PlayerAvatar } from './PlayerAvatar';
import { getPlayerCharacter } from '../utils/playerCharacter';
import '../styles/mission-ui.css';

interface GameGridProps {
  task: Task;
  playerPos: [number, number]; // [x, y]
  pathHistory: [number, number][]; // Trace
  outcome?: 'idle' | 'success' | 'retry';
  running?: boolean;
  activeAction?: GridEvent | null; // Trigger animations for move/jump/attack
  destroyedObstacles?: string[]; // IDs of destroyed walls "x,y"
  heading?: GridHeading;
  player?: Pick<User, 'equipped'> | null;
  preview?: boolean;
  view?: ViewMode;
  onViewChange?: (view: ViewMode) => void;
}

export type ViewMode = 'iso' | 'top';

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

const HEADING_VECTOR: Record<GridHeading, [number, number]> = { N: [0, -1], E: [1, 0], S: [0, 1], W: [-1, 0] };
const HEADING_TEXT: Record<GridHeading, string> = { E: 'вправо', S: 'вниз', W: 'влево', N: 'вверх' };
const COMPASS: { key: GridHeading; label: string; glyph: string; isoGlyph: string }[] = [
  { key: 'N', label: 'Вверх', glyph: '↑', isoGlyph: '↖' },
  { key: 'E', label: 'Вправо', glyph: '→', isoGlyph: '↗' },
  { key: 'S', label: 'Вниз', glyph: '↓', isoGlyph: '↘' },
  { key: 'W', label: 'Влево', glyph: '←', isoGlyph: '↙' },
];
const TILE_W = 128, TILE_H = 80, TILE_TOP_Y = 32, BLOCK_H = 112, BLOCK_BASE_Y = 80, PORTAL_H = 192, PORTAL_BASE_Y = 144;
const HERO_W = 56, HERO_H = 112;
const ART = '/art/neo-academy/';

const loadImage = (src: string) => { const img = new Image(); img.src = src; return img; };
const ready = (img?: HTMLImageElement | null): img is HTMLImageElement => !!img && img.complete && img.naturalWidth > 0;

const GameGrid: React.FC<GameGridProps> = ({ task, playerPos, pathHistory, outcome = 'idle', running = false, activeAction, destroyedObstacles = [], heading = 'E', player, preview = false, view: controlledView, onViewChange }) => {
  const [innerView, setInnerView] = useState<ViewMode>('top');
  const view = controlledView ?? innerView;
  const setView = (next: ViewMode) => { setInnerView(next); onViewChange?.(next); };
  const headingRef = useRef(heading);
  useEffect(()=>{headingRef.current=heading;},[heading]);
  const viewRef = useRef(view);
  useEffect(() => { viewRef.current = view; }, [view]);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frontRef = useRef<HTMLCanvasElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);

  const taskRef = useRef(task);
  const playerPosRef = useRef(playerPos);
  const prevPlayerPosRef = useRef(playerPos);
  const pathHistoryRef = useRef(pathHistory);
  const colorRef = useRef('#56e5ff');
  const movementRef = useRef({ from: playerPos, to: playerPos, started: 0, duration: 180, jump: false });
  const particlesRef = useRef<Particle[]>([]);
  const lasersRef = useRef<LaserBeam[]>([]);
  const destroyedRef = useRef(destroyedObstacles);
  const previewRef = useRef(preview);
  useEffect(() => { previewRef.current = preview; }, [preview]);
  const reducedRef = useRef(false);


  const spawnParticles = (gx: number, gy: number, count = 12, color?: string) => {
      if (reducedRef.current) return;
      // Spawn heavier burst for mobile visibility
      for(let i=0; i<count; i++) {
          particlesRef.current.push({
              x: gx,
              y: gy,
              vx: (Math.random() - 0.5) * 0.12,
              vy: (Math.random() - 0.5) * 0.12,
              life: 1.0,
              color: color || colorRef.current || '#00f3ff'
          });
      }
  };

  useEffect(() => {
    taskRef.current = task;

    const old = prevPlayerPosRef.current;
    const moved = old[0] !== playerPos[0] || old[1] !== playerPos[1];
    if (moved) {
      const previous = movementRef.current;
      const t = Math.min(1, (performance.now() - previous.started) / previous.duration);
      const eased = t * t * (3 - 2 * t);
      const from: [number, number] = [previous.from[0] + (previous.to[0] - previous.from[0]) * eased, previous.from[1] + (previous.to[1] - previous.from[1]) * eased];
      const reset = pathHistory.length <= 1;
      movementRef.current = { from: reset ? playerPos : from, to: playerPos, started: performance.now(), duration: activeAction?.type === 'jump' ? 360 : 220, jump: !reset && activeAction?.type === 'jump' };
    }
    // Check if player moved to spawn particles and play sound
    if (prevPlayerPosRef.current[0] !== playerPos[0] || prevPlayerPosRef.current[1] !== playerPos[1]) {
        // Spawn particles at old position moving towards new
        spawnParticles(prevPlayerPosRef.current[0], prevPlayerPosRef.current[1], 12, colorRef.current || '#00f3ff');
        playSound('move');
    }
    prevPlayerPosRef.current = playerPos;
    playerPosRef.current = playerPos;
    pathHistoryRef.current = pathHistory;
    destroyedRef.current = destroyedObstacles;
  }, [task, playerPos, pathHistory, destroyedObstacles, activeAction]);

  // Handle action events (jump land burst, attack laser)
  useEffect(() => {
      if (!activeAction) return;
      if (activeAction.type === 'jump') {
          spawnParticles(activeAction.x, activeAction.y, 10, '#fcee0a');
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
          }
      }
  }, [activeAction]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const front = frontRef.current;
    const stage = stageRef.current;
    if (!canvas || !front || !stage) return;

    const ctx = canvas.getContext('2d');
    const fctx = front.getContext('2d');
    if (!ctx || !fctx) return;

    const tile = loadImage(`${ART}tile-v2.png`);
    const tileStart = loadImage(`${ART}tile-v2.png`);
    const block = loadImage(`${ART}block-v2.png`);
    const portal = loadImage(`${ART}portal-v2.png`);
    const environment = loadImage(`${ART}room-v2.webp`);
    for (const img of [tile, tileStart, block, portal, environment]) img.onload = () => start();

    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    reducedRef.current = motion.matches;
    const onMotion = () => { reducedRef.current = motion.matches; };
    motion.addEventListener('change', onMotion);

    let width = 0, height = 0, visible = true, raf = 0;
    // PAUSE RENDER IF HIDDEN (0 SIZE) TO PREVENT GLITCHES
    const shouldRun = () => visible && !document.hidden && width >= 40 && height >= 40;
    const start = () => { if (!raf && shouldRun()) raf = requestAnimationFrame(frame); };

    const measure = () => { const r = stage.getBoundingClientRect(); width = Math.max(0, Math.floor(r.width)); height = Math.max(0, Math.floor(r.height)); start(); };
    const ro = new ResizeObserver(measure);
    ro.observe(stage);
    const io = new IntersectionObserver(entries => { visible = entries.some(e => e.isIntersecting); start(); });
    io.observe(stage);
    const onVisibility = () => start();
    document.addEventListener('visibilitychange', onVisibility);

    // --- UTILS ---
    const isObstacle = (x: number, y: number) => {
        // Exists in map AND not destroyed by attack
        const exists = taskRef.current.mapConfig?.obstacles.some(o => o[0] === x && o[1] === y);
        return !!exists && !destroyedRef.current.includes(`${x},${y}`);
    };

    // --- DRAWING FUNCTIONS ---
    const diamond = (c: CanvasRenderingContext2D, cx: number, cy: number, hw: number, hh: number) => {
      c.beginPath(); c.moveTo(cx, cy - hh); c.lineTo(cx + hw, cy); c.lineTo(cx, cy + hh); c.lineTo(cx - hw, cy); c.closePath();
    };

    function frame() {
      raf = 0;
      if (!shouldRun() || !taskRef.current.mapConfig) return;
      draw();
      if (!previewRef.current) raf = requestAnimationFrame(frame);
    }

    function draw() {
      const reduced = reducedRef.current;
      const { gridSize: N, start: startCell, end } = taskRef.current.mapConfig!;
      const mode = viewRef.current;
      const dpr = window.devicePixelRatio || 1;
      const pw = Math.floor(width * dpr), ph = Math.floor(height * dpr);
      for (const c of [canvas!, front!]) if (c.width !== pw || c.height !== ph) { c.width = pw; c.height = ph; }
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx!.setTransform(dpr, 0, 0, dpr, 0, 0);
      fctx!.clearRect(0, 0, width, height);
      const time = reduced ? 0 : performance.now() / 1000;
      const primary = colorRef.current || '#00f3ff';

      const bg = ctx!.createLinearGradient(0, 0, 0, height);
      bg.addColorStop(0, '#0b1328'); bg.addColorStop(1, '#070c1b');
      ctx!.fillStyle = bg; ctx!.fillRect(0, 0, width, height);
      if (mode === 'iso' && ready(environment)) {
        const ratio = Math.max(width / environment.width, height / environment.height);
        const ew = environment.width * ratio, eh = environment.height * ratio;
        ctx!.drawImage(environment, (width - ew) / 2, (height - eh) / 2, ew, eh);
        ctx!.fillStyle = 'rgba(4,10,28,.22)'; ctx!.fillRect(0, 0, width, height);
      }


      const pad = 12;
      let S = 1, proj: (fx: number, fy: number) => [number, number];
      if (mode === 'iso') {
        let minY = 0, maxY = 0;
        for (let gy = 0; gy < N; gy++) for (let gx = 0; gx < N; gx++) {
          const cy = (gy - gx) * 32;
          const rise = gx === end[0] && gy === end[1] ? PORTAL_BASE_Y : isObstacle(gx, gy) ? BLOCK_BASE_Y : 96;
          minY = Math.min(minY, cy - rise);
          maxY = Math.max(maxY, cy + 80);
        }
        const bw = (N - 1) * 128 + TILE_W;
        S = Math.max(0.05, Math.min(1.65, (width - pad * 2) / bw, (height - pad * 2) / (maxY - minY)));
        const ox = width / 2, oy = pad + (height - pad * 2 - (maxY - minY) * S) / 2 - minY * S;
        proj = (fx, fy) => [ox + (fx + fy - (N - 1)) * 64 * S, oy + (fy - fx) * 32 * S];
      } else {
        S = Math.max(2, Math.min(width, height) - pad * 2) / N;
        const ox = (width - S * N) / 2, oy = (height - S * N) / 2;
        proj = (fx, fy) => [ox + fx * S + S / 2, oy + fy * S + S / 2];
      }
      const pathKeys = new Set(pathHistoryRef.current.map(p => `${p[0]},${p[1]}`));

      const drawImg = (img: HTMLImageElement, px: number, py: number, anchorY: number, h: number, c: CanvasRenderingContext2D) =>
        c.drawImage(img, px - 64 * S, py - anchorY * S, TILE_W * S, h * S);

      // A real architectural podium under the front edge, below the playable tile surfaces.
      if (mode === 'iso' && ready(block)) {
        for (let d = -(N - 1); d <= N - 1; d++) for (let gx = 0; gx < N; gx++) {
          const gy = d + gx;
          if (gy < 0 || gy >= N || (gx !== 0 && gy !== N - 1)) continue;
          const [px, py] = proj(gx, gy);
          drawImg(block, px, py + 48 * S, BLOCK_BASE_Y, BLOCK_H, ctx!);
        }
      }
      for (let d = -(N - 1); d <= N - 1; d++) {
        for (let gx = 0; gx < N; gx++) {
          const gy = d + gx; if (gy < 0 || gy >= N) continue;
          const [px, py] = proj(gx, gy);
          const isStart = gx === startCell[0] && gy === startCell[1];
          const onPath = pathKeys.has(`${gx},${gy}`);
          if (mode === 'iso') {
            const img = isStart ? tileStart : tile;
            if (ready(img)) drawImg(img, px, py, TILE_TOP_Y, TILE_H, ctx!);
            else { diamond(ctx!, px, py, 62 * S, 31 * S); ctx!.fillStyle = '#1a2a48'; ctx!.fill(); ctx!.strokeStyle = '#00f3ff'; ctx!.lineWidth = 1; ctx!.stroke(); }
            if (onPath && !isStart) { diamond(ctx!, px, py, 57 * S, 28.5 * S); ctx!.fillStyle = 'rgba(50,221,255,0.09)'; ctx!.fill(); }
            if (isStart) {
              ctx!.save(); diamond(ctx!, px, py, 58 * S, 29 * S);
              ctx!.fillStyle = 'rgba(122,58,220,.32)'; ctx!.fill();
              ctx!.strokeStyle = '#d2a5ff'; ctx!.lineWidth = Math.max(2, 3 * S); ctx!.shadowBlur = 17 * S; ctx!.shadowColor = '#a452ff'; ctx!.stroke(); ctx!.restore();
            }
          } else {
            ctx!.fillStyle = isStart ? '#1d1b44' : '#131e36';
            ctx!.fillRect(px - S / 2 + 1, py - S / 2 + 1, S - 2, S - 2);
            ctx!.strokeStyle = isStart ? '#9664ff' : 'rgba(0,243,255,0.35)'; ctx!.lineWidth = 1;
            ctx!.strokeRect(px - S / 2 + 1.5, py - S / 2 + 1.5, S - 3, S - 3);
            if (onPath) { ctx!.fillStyle = 'rgba(0,243,255,0.22)'; ctx!.fillRect(px - S / 2 + 2, py - S / 2 + 2, S - 4, S - 4); }
          }
        }
      }

      // Arrows show only the executed trace, never reveal an untried solution.
      const path = pathHistoryRef.current;
      if (path.length > 1) {
        ctx!.save(); ctx!.lineCap = 'round'; ctx!.lineJoin = 'round';
        ctx!.strokeStyle = '#a2fbff'; ctx!.shadowColor = '#18dfff'; ctx!.shadowBlur = mode === 'iso' ? 14 * S : 8;
        ctx!.lineWidth = mode === 'iso' ? Math.max(2.5, 4 * S) : Math.max(2, S * .055);
        for (let i = 1; i < path.length; i++) {
          const from = path[i - 1], to = path[i];
          const dx = to[0] - from[0], dy = to[1] - from[1];
          if (!dx && !dy) continue;
          const [ax, ay] = proj(from[0] + dx * .22, from[1] + dy * .22);
          const [bx, by] = proj(from[0] + dx * .68, from[1] + dy * .68);
          const angle = Math.atan2(by - ay, bx - ax), len = mode === 'iso' ? 11 * S : S * .12;
          ctx!.beginPath(); ctx!.moveTo(ax, ay); ctx!.lineTo(bx, by);
          ctx!.moveTo(bx - Math.cos(angle - .65) * len, by - Math.sin(angle - .65) * len); ctx!.lineTo(bx, by); ctx!.lineTo(bx - Math.cos(angle + .65) * len, by - Math.sin(angle + .65) * len); ctx!.stroke();
        }
        ctx!.restore();
      }

      const movement = movementRef.current;
      const progress = reduced ? 1 : Math.min(1, (performance.now() - movement.started) / movement.duration);
      const ease = progress * progress * (3 - 2 * progress);
      const cur: [number, number] = [movement.from[0] + (movement.to[0] - movement.from[0]) * ease, movement.from[1] + (movement.to[1] - movement.from[1]) * ease];
      const moving = progress < 1 && (movement.from[0] !== movement.to[0] || movement.from[1] !== movement.to[1]);
      const [hdx, hdy] = HEADING_VECTOR[headingRef.current];
      const mark = (a: number, side: number): [number, number] => proj(cur[0] + hdx * a + -hdy * side, cur[1] + hdy * a + hdx * side);
      const tip = mark(0.46, 0), w1 = mark(0.2, 0.2), w2 = mark(0.2, -0.2);
      ctx!.beginPath(); ctx!.moveTo(tip[0], tip[1]); ctx!.lineTo(w1[0], w1[1]); ctx!.lineTo(w2[0], w2[1]); ctx!.closePath();
      ctx!.fillStyle = '#a8faff'; ctx!.strokeStyle = '#0b1328'; ctx!.lineWidth = (mode === 'iso' ? Math.max(1, 1.5 * S) : 2); ctx!.fill(); ctx!.stroke();

      // Objects sorted by camera depth y - x; those deeper than the hero go to the foreground canvas above the hero
      type Item = { depth: number; order: number; draw: (c: CanvasRenderingContext2D) => void };
      const items: Item[] = [];
      for (let gy = 0; gy < N; gy++) for (let gx = 0; gx < N; gx++) {
        if (!isObstacle(gx, gy)) continue;
        items.push({ depth: gy - gx, order: 0, draw: c => {
          const [px, py] = proj(gx, gy);
          if (mode === 'iso') {
            if (ready(block)) drawImg(block, px, py, BLOCK_BASE_Y, BLOCK_H, c);
            else { diamond(c, px, py - 50 * S, 56 * S, 28 * S); c.fillStyle = '#5a2a6a'; c.fill(); }
          } else {
            c.fillStyle = '#4a2468'; c.fillRect(px - S / 2 + 3, py - S / 2 + 3, S - 6, S - 6);
            c.strokeStyle = '#ff5ac0'; c.lineWidth = 2; c.strokeRect(px - S / 2 + 3, py - S / 2 + 3, S - 6, S - 6);
            c.beginPath(); c.moveTo(px - S * 0.25, py - S * 0.25); c.lineTo(px + S * 0.25, py + S * 0.25); c.moveTo(px + S * 0.25, py - S * 0.25); c.lineTo(px - S * 0.25, py + S * 0.25); c.stroke();
          }
        } });
      }
      // Goal & Player
      items.push({ depth: end[1] - end[0], order: 1, draw: c => {
        const [px, py] = proj(end[0], end[1]);
        if (mode === 'iso' && ready(portal)) {
          c.save();
          const light = c.createRadialGradient(px, py - 18 * S, 4 * S, px, py - 18 * S, 86 * S);
          light.addColorStop(0, `rgba(66,235,255,${reduced ? .25 : .24 + Math.sin(time * 2.2) * .06})`); light.addColorStop(1, 'rgba(35,180,255,0)');
          c.globalCompositeOperation = 'screen'; c.fillStyle = light; c.fillRect(px - 90*S, py - 106*S, 180*S, 180*S); c.restore();
          c.drawImage(portal, px - 64 * S, py - PORTAL_BASE_Y * S, TILE_W * S, PORTAL_H * S);
          if (!reduced) {
            c.save(); c.fillStyle = '#a7fbff'; c.shadowColor = '#43e5ff'; c.shadowBlur = 7*S;
            for (let spark=0; spark<4; spark++) { const phase=(time*.23+spark*.27)%1; c.globalAlpha=Math.sin(phase*Math.PI)*.65; c.beginPath(); c.arc(px+Math.sin(spark*4.7)*22*S,py-(40+phase*70)*S,1.5*S,0,Math.PI*2); c.fill(); }
            c.restore();
          }
        } else {
          c.strokeStyle = '#00ff41'; c.lineWidth = 3; c.beginPath(); c.arc(px, py, (mode === 'iso' ? 30 * S : S * 0.32), 0, Math.PI * 2); c.stroke();
          c.fillStyle = 'rgba(0,255,65,0.35)'; c.fill();
        }
      } });
      items.push({ depth: cur[1] - cur[0], order: 2, draw: c => {
        const [px, py] = proj(cur[0], cur[1]);
        const k = mode === 'iso' ? S : S / 40;
        c.fillStyle = 'rgba(0,0,0,0.4)'; c.beginPath(); c.ellipse(px, py + 2 * k, 20 * k, 8 * k, 0, 0, Math.PI * 2); c.fill();

      } });
      items.sort((a, b) => a.depth - b.depth || a.order - b.order);
      const heroAt = items.findIndex(i => i.order === 2);
      items.forEach((it, i) => it.draw(i > heroAt ? fctx! : ctx!));

      const hero = heroRef.current;
      if (hero) {
        const [hx, projectedY] = proj(cur[0], cur[1]);
        const hy = projectedY + (mode === 'top' ? S * .34 : 0);
        const motionScale = mode === 'iso' ? S : S / 100;
        const bob = reduced || !moving ? 0 : movement.jump ? -Math.sin(progress * Math.PI) * 40 * motionScale : -Math.abs(Math.sin(progress * Math.PI * 2)) * 4 * motionScale;
        hero.dataset.moving = String(moving);
        hero.dataset.jump = String(moving && movement.jump);
        hero.dataset.gridX = cur[0].toFixed(3);
        hero.dataset.gridY = cur[1].toFixed(3);
        const scale = (mode === 'iso' ? Math.max(52, 106 * S) : S * 0.95) / HERO_H;
        hero.style.transform = `translate(${hx - HERO_W / 2}px, ${hy - HERO_H + bob}px) scale(${scale})`;
        hero.style.transformOrigin = `${HERO_W / 2}px ${HERO_H}px`;
      }

      // Laser beams (attack)
      for (let i = lasersRef.current.length - 1; i >= 0; i--) {
        const beam = lasersRef.current[i];
        beam.life -= 0.1;
        const a = proj(beam.sx, beam.sy), b = proj(beam.ex, beam.ey);
        const lift = mode === 'iso' ? 30 * S : 0;
        fctx!.save();
        fctx!.strokeStyle = `rgba(255, 0, 60, ${Math.max(0, beam.life)})`;
        fctx!.lineWidth = reduced ? 4 : 4 + Math.random() * 4;
        fctx!.beginPath();
        fctx!.moveTo(a[0], a[1] - lift);
        fctx!.lineTo(b[0], b[1] - lift);
        fctx!.stroke();
        fctx!.restore();
        if (beam.life <= 0) lasersRef.current.splice(i, 1);
      }

      // Proper Particle Rendering
      // Update particles
      for (let i = particlesRef.current.length - 1; i >= 0; i--) {
        const p = particlesRef.current[i];
        p.x += p.vx;
        p.y += p.vy;
        p.life -= 0.05;

        // Map Particle logic coords (grid relative) to canvas pixels
        const [qx, qy] = proj(p.x, p.y);
        fctx!.globalAlpha = Math.max(0, p.life);
        fctx!.fillStyle = p.color;
        fctx!.fillRect(qx, qy - (mode === 'iso' ? 12 * S : 0), 5, 5);
        fctx!.globalAlpha = 1.0;

        if (p.life <= 0) particlesRef.current.splice(i, 1);
      }
    }

    movementRef.current = { from: playerPosRef.current, to: playerPosRef.current, started: 0, duration: 220, jump: false };
    measure();
    return () => {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      ro.disconnect(); io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      motion.removeEventListener('change', onMotion);
    };
  }, [task.id]);

  const map = task.mapConfig;
  if (!map) return null;
  const walls = map.obstacles.filter(o => !destroyedObstacles.includes(`${o[0]},${o[1]}`));
  const description = `Карта ${map.gridSize} на ${map.gridSize}. Координаты считаются от верхнего левого угла: x — слева направо, y — сверху вниз, начиная с нуля. Старт: x ${map.start[0]}, y ${map.start[1]}. Цель: x ${map.end[0]}, y ${map.end[1]}. Герой сейчас: x ${playerPos[0]}, y ${playerPos[1]}, смотрит ${HEADING_TEXT[heading]}. ${walls.length ? `Стены: ${walls.map(o => `x ${o[0]}, y ${o[1]}`).join('; ')}.` : 'Стен нет.'}`;
  const headingEntry = COMPASS.find(c => c.key === heading)!;

  return (
    <div data-art-version="2" data-outcome={outcome} className={`mission-grid${preview ? ' mission-grid--preview' : ''}`} data-view={view}>
      {!preview && <div className="mission-grid__bar">
        <div className="mission-grid__compass" role="group" aria-label="Стороны карты. Команды вверх, вниз, влево и вправо двигают героя по этим сторонам в любом виде">
          <span className="mission-grid__compass-title">Стороны карты</span>
          <div className={`mission-grid__compass-rose mission-grid__compass-rose--${view}`}>
            {COMPASS.map(c => <span key={c.key} className={`mission-grid__dir mission-grid__dir--${c.key}${heading === c.key ? ' is-heading' : ''}`}><b aria-hidden="true">{view === 'iso' ? c.isoGlyph : c.glyph}</b>{view === 'iso' ? ({N:'Вверх-влево',E:'Вверх-вправо',S:'Вниз-вправо',W:'Вниз-влево'}[c.key]) : c.label}</span>)}
          </div>
        </div>
        <div className="mission-grid__views" role="group" aria-label="Вид карты">
          <button type="button" aria-pressed={view === 'top'} className={view === 'top' ? 'is-active' : ''} onClick={() => setView('top')}>Вид сверху</button>
          <button type="button" aria-pressed={view === 'iso'} className={view === 'iso' ? 'is-active' : ''} onClick={() => setView('iso')}>Объёмный вид</button>
        </div>
      </div>}
      <div ref={stageRef} className="mission-grid__stage">
        <canvas ref={canvasRef} aria-hidden="true" />
        <div ref={heroRef} className="mission-grid__hero" data-heading={heading} data-outcome={outcome} aria-hidden="true"><PlayerAvatar user={player} motion={outcome === 'success' ? 'success' : outcome === 'retry' ? 'retry' : running ? 'walk' : 'idle'} stage fullBody />{outcome === 'success' && <span className="mission-grid__hero-spark">✦</span>}</div>
        <canvas ref={frontRef} className="mission-grid__front" aria-hidden="true" />
      </div>
      {!preview && <div className="mission-grid__guide" role="status" aria-live="polite">
        <PlayerAvatar user={player} scale={0.8}/><span><strong>{getPlayerCharacter(player).name}</strong>{running ? 'Выполняю твой алгоритм…' : outcome === 'success' ? 'Портал достигнут! Маршрут пройден.' : outcome === 'retry' ? 'Путь пока не пройден. Проверь команды и попробуй ещё раз.' : 'Собери команды и проведи меня к порталу.'}</span>
      </div>}
      {!preview && <p className="mission-grid__status">
        <span>x {playerPos[0]}, y {playerPos[1]}</span>
        <span>Цель: x {map.end[0]}, y {map.end[1]}</span>
        <span>Смотрит {view === 'iso' ? ({N:'вверх-влево',E:'вверх-вправо',S:'вниз-вправо',W:'вниз-влево'}[heading]) : HEADING_TEXT[heading]} {view === 'iso' ? headingEntry.isoGlyph : headingEntry.glyph}</span>
      </p>}
      <p className="sr-only">{description}</p>
    </div>
  );
};

export default GameGrid;
