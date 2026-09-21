import React, { useState, useEffect, useRef } from 'react';
import { playSound } from '../utils/sound';

export type MascotSkin = 'sparky' | 'astro' | 'cat' | 'prof';
export type MascotMood = 'idle' | 'happy' | 'thinking' | 'curious' | 'celebrate' | 'wink' | 'talking';
export type MascotGesture = 'point_cloud' | 'wave' | 'thumbs_up' | 'scratch_head' | 'idle';

interface BigCharacter3DProps {
  skin?: MascotSkin | string;
  mood?: MascotMood;
  isSpeaking?: boolean;
  gesture?: MascotGesture;
  onPoke?: () => void;
  className?: string;
  speechBubblePosition?: 'right' | 'left' | 'top';
}

// Локальные keyframes: парение, тень под парящим персонажем, покачивание антенн/хвоста,
// плавное покачивание рук. Всё на transform/opacity — без перерисовки геометрии.
// prefers-reduced-motion глушит все непрерывные анимации внутри .mascot-scope.
const MASCOT_STYLES = `
.mascot-scope .mascot-float { animation: mascotFloat 4s ease-in-out infinite; }
.mascot-scope .mascot-shadow { animation: mascotShadow 4s ease-in-out infinite; transform-origin: center; }
.mascot-scope .mascot-sway { animation: mascotSway 3.6s ease-in-out infinite; transform-box: fill-box; transform-origin: bottom center; }
.mascot-scope .mascot-bob { animation: mascotBob 2.8s ease-in-out infinite; transform-box: fill-box; }
.mascot-scope .mascot-bob-alt { animation: mascotBob 3.4s ease-in-out infinite reverse; transform-box: fill-box; }
.mascot-scope .mascot-wave { animation: mascotWave 1.8s ease-in-out infinite; transform-box: fill-box; transform-origin: bottom center; }
@keyframes mascotFloat { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-8px); } }
@keyframes mascotShadow { 0%,100% { transform: scaleX(1); opacity: 0.45; } 50% { transform: scaleX(0.78); opacity: 0.28; } }
@keyframes mascotSway { 0%,100% { transform: rotate(-5deg); } 50% { transform: rotate(5deg); } }
@keyframes mascotBob { 0%,100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
@keyframes mascotWave { 0%,100% { transform: rotate(-8deg); } 50% { transform: rotate(10deg); } }
@media (prefers-reduced-motion: reduce) {
  .mascot-scope .mascot-float,
  .mascot-scope .mascot-shadow,
  .mascot-scope .mascot-sway,
  .mascot-scope .mascot-bob,
  .mascot-scope .mascot-bob-alt,
  .mascot-scope .mascot-wave,
  .mascot-scope [class*="animate-"] { animation: none !important; }
}
`;

interface RobotFaceColors {
  eye: string;
  mouth: string;
  star: string;
}

// Общий рендер лица для роботов (sparky, astro): глаза по настроению + рот.
// Глаза — светящиеся «пиксели» с белым бликом; подсветка делается статичными
// radial-gradient дисками вокруг глаз, без фильтров на анимируемых узлах.
const RobotFace: React.FC<{
  mood: MascotMood;
  isSpeaking: boolean;
  isBlinking: boolean;
  pupilOffset: { x: number; y: number };
  colors: RobotFaceColors;
  cxL?: number;
  cxR?: number;
  cy?: number;
}> = ({ mood, isSpeaking, isBlinking, pupilOffset, colors, cxL = 78, cxR = 122, cy = 92 }) => {
  const eye = colors.eye;
  return (
    <g>
      {/* Soft glow behind eyes (static gradient, cheap) */}
      <ellipse cx={cxL} cy={cy} rx="17" ry="19" fill={eye} opacity="0.14" />
      <ellipse cx={cxR} cy={cy} rx="17" ry="19" fill={eye} opacity="0.14" />
      {isBlinking ? (
        <g>
          <line x1={cxL - 10} y1={cy} x2={cxL + 10} y2={cy} stroke={eye} strokeWidth="4" strokeLinecap="round" />
          <line x1={cxR - 10} y1={cy} x2={cxR + 10} y2={cy} stroke={eye} strokeWidth="4" strokeLinecap="round" />
        </g>
      ) : mood === 'celebrate' ? (
        <g>
          <polygon points={`${cxL},${cy - 12} ${cxL + 4},${cy - 2} ${cxL + 14},${cy - 2} ${cxL + 6},${cy + 4} ${cxL + 9},${cy + 14} ${cxL},${cy + 8} ${cxL - 9},${cy + 14} ${cxL - 6},${cy + 4} ${cxL - 14},${cy - 2} ${cxL - 4},${cy - 2}`} fill={colors.star} />
          <polygon points={`${cxR},${cy - 12} ${cxR + 4},${cy - 2} ${cxR + 14},${cy - 2} ${cxR + 6},${cy + 4} ${cxR + 9},${cy + 14} ${cxR},${cy + 8} ${cxR - 9},${cy + 14} ${cxR - 6},${cy + 4} ${cxR - 14},${cy - 2} ${cxR - 4},${cy - 2}`} fill={colors.star} />
        </g>
      ) : mood === 'happy' ? (
        <g>
          <path d={`M ${cxL - 10} ${cy + 3} Q ${cxL} ${cy - 10} ${cxL + 10} ${cy + 3}`} stroke={eye} strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d={`M ${cxR - 10} ${cy + 3} Q ${cxR} ${cy - 10} ${cxR + 10} ${cy + 3}`} stroke={eye} strokeWidth="5" strokeLinecap="round" fill="none" />
          <ellipse cx={cxL - 14} cy={cy + 14} rx="6" ry="4" fill={colors.star} opacity="0.55" />
          <ellipse cx={cxR + 14} cy={cy + 14} rx="6" ry="4" fill={colors.star} opacity="0.55" />
        </g>
      ) : mood === 'wink' ? (
        <g>
          <ellipse cx={cxL + pupilOffset.x} cy={cy + pupilOffset.y} rx="10" ry="12" fill={eye} />
          <circle cx={cxL + 3 + pupilOffset.x} cy={cy - 3 + pupilOffset.y} r="3.5" fill="#ffffff" />
          <path d={`M ${cxR - 10} ${cy + 2} Q ${cxR} ${cy - 8} ${cxR + 10} ${cy + 2}`} stroke={eye} strokeWidth="5" strokeLinecap="round" fill="none" />
        </g>
      ) : mood === 'thinking' ? (
        <g>
          <ellipse cx={cxL + 3} cy={cy - 4} rx="9" ry="11" fill={eye} />
          <circle cx={cxL + 5} cy={cy - 7} r="3" fill="#ffffff" />
          <ellipse cx={cxR + 3} cy={cy - 4} rx="9" ry="11" fill={eye} />
          <circle cx={cxR + 5} cy={cy - 7} r="3" fill="#ffffff" />
          <circle cx={cxR + 24} cy={cy - 30} r="4" fill={colors.star} className="animate-ping" />
        </g>
      ) : mood === 'curious' ? (
        <g>
          <ellipse cx={cxL - 2 + pupilOffset.x} cy={cy - 2 + pupilOffset.y} rx="12" ry="14" fill={eye} />
          <circle cx={cxL + pupilOffset.x} cy={cy - 5 + pupilOffset.y} r="4" fill="#ffffff" />
          <ellipse cx={cxR + 2 + pupilOffset.x} cy={cy + 1 + pupilOffset.y} rx="8" ry="9" fill={eye} />
          <circle cx={cxR + 3 + pupilOffset.x} cy={cy - 1 + pupilOffset.y} r="2.5" fill="#ffffff" />
        </g>
      ) : (
        <g>
          <ellipse cx={cxL + pupilOffset.x} cy={cy + pupilOffset.y} rx="10" ry="12" fill={eye} />
          <circle cx={cxL + 3 + pupilOffset.x} cy={cy - 4 + pupilOffset.y} r="3.8" fill="#ffffff" />
          <circle cx={cxL - 2 + pupilOffset.x} cy={cy + 3 + pupilOffset.y} r="1.8" fill="#ffffff" opacity="0.9" />
          <ellipse cx={cxR + pupilOffset.x} cy={cy + pupilOffset.y} rx="10" ry="12" fill={eye} />
          <circle cx={cxR + 3 + pupilOffset.x} cy={cy - 4 + pupilOffset.y} r="3.8" fill="#ffffff" />
          <circle cx={cxR - 2 + pupilOffset.x} cy={cy + 3 + pupilOffset.y} r="1.8" fill="#ffffff" opacity="0.9" />
        </g>
      )}

      {/* Mouth / voice equalizer */}
      {isSpeaking ? (
        <g className="animate-pulse">
          <line x1="80" y1="120" x2="80" y2="126" stroke={colors.star} strokeWidth="3" strokeLinecap="round" />
          <line x1="88" y1="117" x2="88" y2="129" stroke={eye} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="96" y1="115" x2="96" y2="131" stroke={colors.mouth} strokeWidth="4" strokeLinecap="round" />
          <line x1="104" y1="115" x2="104" y2="131" stroke={colors.mouth} strokeWidth="4" strokeLinecap="round" />
          <line x1="112" y1="117" x2="112" y2="129" stroke={eye} strokeWidth="3.5" strokeLinecap="round" />
          <line x1="120" y1="120" x2="120" y2="126" stroke={colors.star} strokeWidth="3" strokeLinecap="round" />
        </g>
      ) : mood === 'happy' || mood === 'celebrate' ? (
        <path d="M 86 116 Q 100 128 114 116" stroke={eye} strokeWidth="4" strokeLinecap="round" fill="none" />
      ) : mood === 'thinking' ? (
        <path d="M 88 122 Q 100 118 112 122" stroke={eye} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      ) : (
        <path d="M 88 118 Q 100 125 112 118" stroke={eye} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      )}
    </g>
  );
};

// Рука-манипулятор робота с жестами (sparky — зелёно-голубая, astro — бело-золотая)
const RobotGestureArm: React.FC<{
  gesture: MascotGesture;
  accent: string;
  palm: string;
  beam: string;
}> = ({ gesture, accent, palm, beam }) => {
  if (gesture === 'point_cloud') {
    return (
      <g className="animate-pulse">
        <circle cx="180" cy="130" r="13" fill="#0f172a" stroke={accent} strokeWidth="2.5" />
        <circle cx="180" cy="130" r="6" fill={palm} />
        <line x1="184" y1="126" x2="202" y2="108" stroke={accent} strokeWidth="5" strokeLinecap="round" />
        <line x1="202" y1="108" x2="218" y2="92" stroke={beam} strokeWidth="2" strokeDasharray="3 2" opacity="0.8" />
        <circle cx="218" cy="92" r="3" fill={beam} className="animate-ping" />
      </g>
    );
  }
  if (gesture === 'thumbs_up') {
    return (
      <g className="mascot-bob">
        <circle cx="180" cy="130" r="13" fill="#0f172a" stroke={accent} strokeWidth="2.5" />
        <circle cx="180" cy="130" r="6" fill={palm} />
        <line x1="180" y1="126" x2="180" y2="108" stroke={accent} strokeWidth="6" strokeLinecap="round" />
        <circle cx="180" cy="106" r="4" fill={beam} className="animate-ping" />
      </g>
    );
  }
  if (gesture === 'scratch_head') {
    return (
      <g className="animate-pulse">
        <circle cx="162" cy="70" r="12" fill="#0f172a" stroke={accent} strokeWidth="2.5" />
        <circle cx="162" cy="70" r="5" fill={beam} />
        <line x1="162" y1="65" x2="146" y2="45" stroke={accent} strokeWidth="4" strokeLinecap="round" />
        <text x="176" y="60" fill={beam} fontSize="18" fontWeight="bold" fontFamily="monospace">?</text>
      </g>
    );
  }
  // 'wave' и 'idle' — мягкое покачивание
  return (
    <g className="mascot-wave">
      <circle cx="180" cy="140" r="12" fill="#0f172a" stroke={accent} strokeWidth="2.5" />
      <circle cx="180" cy="140" r="5" fill={palm} />
      <rect x="168" y="148" width="6" height="10" rx="3" fill="#334155" stroke={accent} strokeWidth="1" />
      <rect x="177" y="150" width="6" height="11" rx="3" fill="#334155" stroke={accent} strokeWidth="1" />
      <rect x="186" y="148" width="6" height="10" rx="3" fill="#334155" stroke={accent} strokeWidth="1" />
    </g>
  );
};

export const BigCharacter3D: React.FC<BigCharacter3DProps> = ({
  skin: rawSkin = 'sparky',
  mood = 'idle',
  isSpeaking = false,
  gesture = 'point_cloud',
  onPoke,
  className = '',
  speechBubblePosition = 'right'
}) => {
  // Normalize skin (migrate any legacy 'clippy' to 'sparky')
  const skin: MascotSkin = rawSkin === 'clippy' ? 'sparky' : (rawSkin as MascotSkin) || 'sparky';
  const containerRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState<{ rx: number; ry: number }>({ rx: 0, ry: 0 });
  const [pupilOffset, setPupilOffset] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [spinAnimation, setSpinAnimation] = useState(false);
  const [pokeCount, setPokeCount] = useState(0);

  // Automatic blinking effect
  useEffect(() => {
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => setIsBlinking(false), 200);
    }, 4500);

    return () => clearInterval(blinkInterval);
  }, []);

  // Track mouse coordinates for 3D tilt and pupil tracking
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      // Subtle 3D tilt (max 10 degrees)
      const ry = Math.max(-12, Math.min(12, (dx / window.innerWidth) * 24));
      const rx = Math.max(-10, Math.min(10, -(dy / window.innerHeight) * 20));
      setTilt({ rx, ry });

      // Pupil offset (-4px to +4px)
      const dist = Math.sqrt(dx * dx + dy * dy);
      const angle = Math.atan2(dy, dx);
      const maxOffset = 4.5;
      const amount = Math.min(maxOffset, dist / 80);
      setPupilOffset({
        x: Math.cos(angle) * amount,
        y: Math.sin(angle) * amount
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const handleCharacterClick = () => {
    playSound('mascot_pop');
    setSpinAnimation(true);
    setPokeCount(prev => prev + 1);
    setTimeout(() => setSpinAnimation(false), 700);

    if (onPoke) {
      onPoke();
    }
  };

  const currentMood: MascotMood = (isSpeaking ? 'talking' : mood) as MascotMood;

  return (
    <div
      ref={containerRef}
      className={`mascot-scope relative select-none flex flex-col items-center justify-center ${className}`}
      style={{
        perspective: '1000px',
        width: '280px',
        height: '340px'
      }}
    >
      <style>{MASCOT_STYLES}</style>

      {/* 3D Transform Root */}
      <div
        onClick={handleCharacterClick}
        title="Нажми на меня! Я живой!"
        className={`relative w-full h-full flex flex-col items-center justify-center cursor-pointer transition-transform duration-200 ease-out ${
          spinAnimation ? 'animate-[spin_0.7s_ease-in-out]' : ''
        }`}
        style={{
          transformStyle: 'preserve-3d',
          transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`
        }}
      >
        {/* =================================================================== */}
        {/* HOLOGRAPHIC PEDESTAL + SOFT FLOOR SHADOW (связана с парением)      */}
        {/* =================================================================== */}
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-52 h-16 pointer-events-none" style={{ transformStyle: 'preserve-3d' }}>
          {/* Contact shadow: сжимается, когда персонаж взлетает выше */}
          <div className="mascot-shadow absolute bottom-0 left-1/2 -translate-x-1/2 w-40 h-8 rounded-full bg-black/60 blur-md" />
          {/* Cyber Floor Grid Disc */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-b from-cyan-500/20 to-transparent border border-cyber-neonBlue/40 blur-[1px] transform rotate-x-[70deg]" />
          {/* Glowing Ring 1 */}
          <div className="absolute inset-2 rounded-full border-2 border-dashed border-cyber-neonGreen/60 animate-[spin_8s_linear_infinite]" />
          {/* Glowing Ring 2 */}
          <div className="absolute inset-5 rounded-full border border-cyber-neonYellow/50 animate-[spin_12s_linear_infinite_reverse]" />
          {/* Center Light Pillar Glow */}
          <div className="absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-24 bg-cyber-neonBlue/20 blur-xl rounded-full" />
        </div>

        {/* =================================================================== */}
        {/* 3D FLOATING HOLOGRAPHIC ORBIT RING */}
        {/* =================================================================== */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center" style={{ transformStyle: 'preserve-3d' }}>
          <div
            className="w-64 h-64 rounded-full border border-cyber-neonBlue/30 border-dashed animate-[spin_14s_linear_infinite]"
            style={{ transform: 'rotateX(68deg) rotateY(15deg)' }}
          >
            <div className="w-3 h-3 rounded-full bg-cyber-neonYellow shadow-[0_0_10px_#fcee0a] absolute -top-1.5 left-1/2 -translate-x-1/2 animate-pulse" />
          </div>
        </div>

        {/* =================================================================== */}
        {/* CHARACTER AVATAR SVG */}
        {/* =================================================================== */}
        <div className="mascot-float relative w-56 h-72 z-10 filter drop-shadow-[0_12px_24px_rgba(0,243,255,0.3)]">

          {/* 1. БАЙТИК — кибер-дрон (неон: зелёный/голубой) */}
          {skin === 'sparky' && (
            <svg viewBox="0 0 200 240" className="w-full h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                {/* Глянцевый корпус: свет сверху-слева, тёмный низ */}
                <radialGradient id="spBody" cx="35%" cy="25%" r="85%">
                  <stop offset="0%" stopColor="#64748b" />
                  <stop offset="30%" stopColor="#334155" />
                  <stop offset="70%" stopColor="#16202e" />
                  <stop offset="100%" stopColor="#070d16" />
                </radialGradient>
                {/* Rim-light: неоновый контур справа-снизу */}
                <linearGradient id="spRim" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00ff41" stopOpacity="0.15" />
                  <stop offset="55%" stopColor="#00ff41" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#00f3ff" />
                </linearGradient>
                {/* Стекло визора */}
                <linearGradient id="spVisor" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#06301d" />
                  <stop offset="45%" stopColor="#021a0e" />
                  <stop offset="100%" stopColor="#000a05" />
                </linearGradient>
                {/* Внутренняя подсветка визора */}
                <radialGradient id="spVisorGlow" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="#00ff41" stopOpacity="0.18" />
                  <stop offset="100%" stopColor="#00ff41" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="spFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="30%" stopColor="#fcee0a" />
                  <stop offset="65%" stopColor="#00ff41" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
                <linearGradient id="spPod" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="55%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#020617" />
                </linearGradient>
              </defs>

              {/* Антенна с покачиванием */}
              <g className="mascot-sway">
                <line x1="100" y1="40" x2="100" y2="16" stroke="#00ff41" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="14" r="9" fill="#fcee0a" opacity="0.25" />
                <circle cx="100" cy="14" r="6" fill="#fcee0a" />
                <circle cx="98" cy="12" r="2.5" fill="#ffffff" />
                <ellipse cx="100" cy="14" rx="22" ry="7" stroke="#00f3ff" strokeWidth="1.5" strokeDasharray="5 3" fill="none" opacity="0.7" />
                <ellipse cx="100" cy="14" rx="33" ry="10" stroke="#00ff41" strokeWidth="1" strokeDasharray="3 4" fill="none" opacity="0.45" />
              </g>

              {/* Боковые модули-подвесы */}
              <g transform="translate(14, 82)">
                <rect x="0" y="0" width="22" height="46" rx="9" fill="url(#spPod)" stroke="#00ff41" strokeWidth="2.5" />
                <rect x="4" y="8" width="14" height="5" rx="2" fill="#00f3ff" opacity="0.85" />
                <rect x="4" y="19" width="14" height="5" rx="2" fill="#00f3ff" opacity="0.6" />
                <rect x="4" y="30" width="14" height="5" rx="2" fill="#00f3ff" opacity="0.35" />
                <path d="M 4 44 L 18 44 L 15 52 L 7 52 Z" fill="#334155" />
              </g>
              <g transform="translate(164, 82)">
                <rect x="0" y="0" width="22" height="46" rx="9" fill="url(#spPod)" stroke="#00ff41" strokeWidth="2.5" />
                <rect x="4" y="8" width="14" height="5" rx="2" fill="#00f3ff" opacity="0.85" />
                <rect x="4" y="19" width="14" height="5" rx="2" fill="#00f3ff" opacity="0.6" />
                <rect x="4" y="30" width="14" height="5" rx="2" fill="#00f3ff" opacity="0.35" />
                <path d="M 4 44 L 18 44 L 15 52 L 7 52 Z" fill="#334155" />
              </g>

              {/* Корпус-голова */}
              <rect x="34" y="40" width="132" height="124" rx="38" fill="url(#spBody)" />
              {/* Rim-light по нижне-правому контуру */}
              <path d="M 60 158 Q 100 168 142 156 Q 160 148 164 128" stroke="url(#spRim)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
              {/* Верхний блик (глянец) */}
              <ellipse cx="82" cy="56" rx="42" ry="12" fill="#ffffff" opacity="0.14" transform="rotate(-8 82 56)" />
              <path d="M 52 50 Q 100 44 148 50" stroke="#ffffff" strokeWidth="2.5" strokeLinecap="round" opacity="0.35" fill="none" />
              {/* Контурная обводка */}
              <rect x="34" y="40" width="132" height="124" rx="38" fill="none" stroke="#00ff41" strokeWidth="2.5" opacity="0.8" />
              {/* Болты */}
              <circle cx="48" cy="56" r="3" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
              <circle cx="152" cy="56" r="3" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
              <circle cx="48" cy="150" r="3" fill="#475569" stroke="#94a3b8" strokeWidth="1" />
              <circle cx="152" cy="150" r="3" fill="#475569" stroke="#94a3b8" strokeWidth="1" />

              {/* Визор-экран */}
              <rect x="48" y="58" width="104" height="78" rx="20" fill="url(#spVisor)" stroke="#00ff41" strokeWidth="2" />
              <rect x="48" y="58" width="104" height="78" rx="20" fill="url(#spVisorGlow)" />
              {/* Сканлайны */}
              <line x1="52" y1="70" x2="148" y2="70" stroke="#00ff41" strokeWidth="0.8" opacity="0.2" />
              <line x1="52" y1="82" x2="148" y2="82" stroke="#00ff41" strokeWidth="0.8" opacity="0.2" />
              <line x1="52" y1="94" x2="148" y2="94" stroke="#00ff41" strokeWidth="0.8" opacity="0.2" />
              <line x1="52" y1="106" x2="148" y2="106" stroke="#00ff41" strokeWidth="0.8" opacity="0.2" />
              <line x1="52" y1="118" x2="148" y2="118" stroke="#00ff41" strokeWidth="0.8" opacity="0.2" />
              {/* Блик стекла */}
              <path d="M 54 64 L 92 64 L 64 126 L 54 126 Z" fill="#ffffff" opacity="0.07" />

              <RobotFace
                mood={currentMood}
                isSpeaking={isSpeaking}
                isBlinking={isBlinking}
                pupilOffset={pupilOffset}
                colors={{ eye: '#00ff41', mouth: '#00f3ff', star: '#fcee0a' }}
              />

              {/* Арк-реактор на груди */}
              <g className="animate-pulse">
                <circle cx="100" cy="145" r="12" fill="#00f3ff" opacity="0.15" />
                <circle cx="100" cy="145" r="10" fill="#0f172a" stroke="#00ff41" strokeWidth="2" />
                <circle cx="100" cy="145" r="6" fill="#00f3ff" opacity="0.85" />
                <circle cx="98" cy="143" r="2" fill="#ffffff" />
                <line x1="84" y1="145" x2="90" y2="145" stroke="#00ff41" strokeWidth="1.5" />
                <line x1="110" y1="145" x2="116" y2="145" stroke="#00ff41" strokeWidth="1.5" />
              </g>

              {/* Нижние двигатели */}
              <g transform="translate(60, 166)">
                <rect x="6" y="0" width="24" height="14" rx="4" fill="url(#spPod)" stroke="#00ff41" strokeWidth="2" />
                <rect x="50" y="0" width="24" height="14" rx="4" fill="url(#spPod)" stroke="#00ff41" strokeWidth="2" />
                <polygon points="18,14 8,34 28,34" fill="url(#spFlame)" className="animate-pulse" />
                <polygon points="62,14 52,34 72,34" fill="url(#spFlame)" className="animate-pulse" />
                <polygon points="18,14 13,25 23,25" fill="#ffffff" opacity="0.9" />
                <polygon points="62,14 57,25 67,25" fill="#ffffff" opacity="0.9" />
              </g>

              {/* Левая рука */}
              <g className="mascot-bob-alt">
                <circle cx="20" cy="140" r="12" fill="url(#spPod)" stroke="#00ff41" strokeWidth="2.5" />
                <circle cx="20" cy="140" r="5" fill="#00f3ff" />
                <rect x="8" y="148" width="6" height="10" rx="3" fill="#334155" stroke="#00ff41" strokeWidth="1" />
                <rect x="17" y="150" width="6" height="11" rx="3" fill="#334155" stroke="#00ff41" strokeWidth="1" />
                <rect x="26" y="148" width="6" height="10" rx="3" fill="#334155" stroke="#00ff41" strokeWidth="1" />
              </g>

              {/* Правая рука: жест */}
              <RobotGestureArm gesture={gesture} accent="#00ff41" palm="#fcee0a" beam="#fcee0a" />
            </svg>
          )}

          {/* 2. НЕО-КОТ (неон: розовый/жёлтый) */}
          {skin === 'cat' && (
            <svg viewBox="0 0 200 240" className="w-full h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="catBody" cx="38%" cy="28%" r="80%">
                  <stop offset="0%" stopColor="#5b21b6" />
                  <stop offset="45%" stopColor="#2e1065" />
                  <stop offset="80%" stopColor="#17042a" />
                  <stop offset="100%" stopColor="#0a0214" />
                </radialGradient>
                <linearGradient id="catEarIn" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ff007f" stopOpacity="0.5" />
                </linearGradient>
                <linearGradient id="catRim" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#ff00ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#ff00ff" />
                </linearGradient>
                <radialGradient id="catEyeGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#fcee0a" />
                  <stop offset="70%" stopColor="#eab308" />
                  <stop offset="100%" stopColor="#a16207" />
                </radialGradient>
              </defs>

              {/* Уши */}
              <g className="mascot-sway">
                <polygon points="44,92 64,34 92,90" fill="#1e1b4b" stroke="#ff00ff" strokeWidth="3.5" strokeLinejoin="round" />
                <polygon points="53,84 65,48 81,84" fill="url(#catEarIn)" />
              </g>
              <g className="mascot-sway">
                <polygon points="108,90 136,34 156,92" fill="#1e1b4b" stroke="#ff00ff" strokeWidth="3.5" strokeLinejoin="round" />
                <polygon points="119,84 135,48 147,84" fill="url(#catEarIn)" />
              </g>

              {/* Голова */}
              <circle cx="100" cy="115" r="64" fill="url(#catBody)" />
              {/* Rim-light справа-снизу */}
              <path d="M 138 160 Q 158 148 162 122" stroke="url(#catRim)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
              {/* Верхний блик */}
              <ellipse cx="78" cy="80" rx="30" ry="12" fill="#ffffff" opacity="0.12" transform="rotate(-18 78 80)" />
              <circle cx="100" cy="115" r="64" fill="none" stroke="#ff00ff" strokeWidth="3" opacity="0.85" />

              {/* Полосы-маркировки */}
              <path d="M 76 56 L 82 66" stroke="#ff00ff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
              <path d="M 100 52 L 100 62" stroke="#ff00ff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />
              <path d="M 124 56 L 118 66" stroke="#ff00ff" strokeWidth="3" strokeLinecap="round" opacity="0.7" />

              {/* Усы-лазеры */}
              <line x1="26" y1="110" x2="58" y2="114" stroke="#ff007f" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              <line x1="22" y1="124" x2="58" y2="122" stroke="#ff007f" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              <line x1="142" y1="114" x2="174" y2="110" stroke="#ff007f" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />
              <line x1="142" y1="122" x2="178" y2="124" stroke="#ff007f" strokeWidth="2.5" strokeLinecap="round" opacity="0.9" />

              {/* Глаза */}
              {isBlinking ? (
                <g>
                  <line x1="65" y1="108" x2="85" y2="108" stroke="#fcee0a" strokeWidth="4" strokeLinecap="round" />
                  <line x1="115" y1="108" x2="135" y2="108" stroke="#fcee0a" strokeWidth="4" strokeLinecap="round" />
                </g>
              ) : currentMood === 'happy' || currentMood === 'celebrate' ? (
                <g>
                  <path d="M 63 110 Q 75 96 87 110" stroke="#fcee0a" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <path d="M 113 110 Q 125 96 137 110" stroke="#fcee0a" strokeWidth="5" strokeLinecap="round" fill="none" />
                  <ellipse cx="62" cy="122" rx="6" ry="4" fill="#ff007f" opacity="0.5" />
                  <ellipse cx="138" cy="122" rx="6" ry="4" fill="#ff007f" opacity="0.5" />
                </g>
              ) : currentMood === 'wink' ? (
                <g>
                  <ellipse cx={75 + pupilOffset.x} cy={108 + pupilOffset.y} rx="12" ry="16" fill="url(#catEyeGlow)" />
                  <ellipse cx={75 + pupilOffset.x} cy={108 + pupilOffset.y} rx="4" ry="12" fill="#000000" />
                  <circle cx={72 + pupilOffset.x} cy={103 + pupilOffset.y} r="2.5" fill="#ffffff" />
                  <path d="M 113 110 Q 125 100 137 110" stroke="#fcee0a" strokeWidth="5" strokeLinecap="round" fill="none" />
                </g>
              ) : currentMood === 'thinking' ? (
                <g>
                  <ellipse cx="78" cy="104" rx="12" ry="15" fill="url(#catEyeGlow)" />
                  <ellipse cx="78" cy="104" rx="4" ry="11" fill="#000000" />
                  <ellipse cx="128" cy="104" rx="12" ry="15" fill="url(#catEyeGlow)" />
                  <ellipse cx="128" cy="104" rx="4" ry="11" fill="#000000" />
                  <circle cx="150" cy="72" r="4" fill="#fcee0a" className="animate-ping" />
                </g>
              ) : currentMood === 'curious' ? (
                <g>
                  <ellipse cx={73 + pupilOffset.x} cy={106 + pupilOffset.y} rx="14" ry="18" fill="url(#catEyeGlow)" />
                  <ellipse cx={73 + pupilOffset.x} cy={106 + pupilOffset.y} rx="5" ry="13" fill="#000000" />
                  <circle cx={70 + pupilOffset.x} cy={100 + pupilOffset.y} r="3" fill="#ffffff" />
                  <ellipse cx={127 + pupilOffset.x} cy={110 + pupilOffset.y} rx="9" ry="12" fill="url(#catEyeGlow)" />
                  <ellipse cx={127 + pupilOffset.x} cy={110 + pupilOffset.y} rx="3" ry="9" fill="#000000" />
                </g>
              ) : (
                <g>
                  <ellipse cx={75 + pupilOffset.x} cy={108 + pupilOffset.y} rx="12" ry="16" fill="url(#catEyeGlow)" />
                  <ellipse cx={75 + pupilOffset.x} cy={108 + pupilOffset.y} rx="4" ry="12" fill="#000000" />
                  <circle cx={72 + pupilOffset.x} cy={102 + pupilOffset.y} r="2.5" fill="#ffffff" />
                  <ellipse cx={125 + pupilOffset.x} cy={108 + pupilOffset.y} rx="12" ry="16" fill="url(#catEyeGlow)" />
                  <ellipse cx={125 + pupilOffset.x} cy={108 + pupilOffset.y} rx="4" ry="12" fill="#000000" />
                  <circle cx={122 + pupilOffset.x} cy={102 + pupilOffset.y} r="2.5" fill="#ffffff" />
                </g>
              )}

              {/* Нос и рот */}
              <polygon points="100,124 94,118 106,118" fill="#ff007f" />
              {isSpeaking ? (
                <ellipse cx="100" cy="132" rx="6" ry="8" fill="#ff007f" className="animate-pulse" />
              ) : currentMood === 'thinking' ? (
                <path d="M 94 130 Q 100 127 106 130" stroke="#ff007f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              ) : (
                <path d="M 92 126 Q 100 134 100 126 Q 100 134 108 126" stroke="#ff007f" strokeWidth="2.5" strokeLinecap="round" fill="none" />
              )}

              {/* Кибер-хвост с покачиванием */}
              <g className="mascot-sway">
                <path d="M 155 150 Q 185 170 190 135 Q 195 100 180 90" stroke="#ff00ff" strokeWidth="4" strokeLinecap="round" fill="none" />
                <circle cx="180" cy="90" r="5" fill="#fcee0a" />
                <circle cx="178" cy="88" r="2" fill="#ffffff" />
              </g>
            </svg>
          )}

          {/* 3. ПРОФЕССОР КОДЕР (неон: голубой/зелёный) */}
          {skin === 'prof' && (
            <svg viewBox="0 0 200 240" className="w-full h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="profHat" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#3730a3" />
                  <stop offset="60%" stopColor="#1e1b4b" />
                  <stop offset="100%" stopColor="#0c0a24" />
                </linearGradient>
                <radialGradient id="profFace" cx="40%" cy="30%" r="75%">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="60%" stopColor="#0f172a" />
                  <stop offset="100%" stopColor="#05080f" />
                </radialGradient>
                <linearGradient id="profGlass" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#a5f3fc" />
                  <stop offset="50%" stopColor="#00f3ff" />
                  <stop offset="100%" stopColor="#0369a1" />
                </linearGradient>
                <linearGradient id="profRim" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00f3ff" />
                </linearGradient>
                <radialGradient id="profCrystal" cx="40%" cy="35%" r="70%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="40%" stopColor="#00f3ff" />
                  <stop offset="100%" stopColor="#0369a1" />
                </radialGradient>
              </defs>

              {/* Шляпа мага */}
              <g className="mascot-sway">
                <path d="M 100 16 Q 104 52 118 84 L 42 84 Q 72 56 100 16 Z" fill="url(#profHat)" stroke="#00f3ff" strokeWidth="2.5" strokeLinejoin="round" />
                <ellipse cx="82" cy="58" rx="16" ry="8" fill="#ffffff" opacity="0.12" transform="rotate(-24 82 58)" />
                <circle cx="100" cy="16" r="8" fill="#fcee0a" opacity="0.25" />
                <circle cx="100" cy="16" r="5" fill="#fcee0a" className="animate-ping" />
              </g>
              <ellipse cx="100" cy="85" rx="64" ry="16" fill="url(#profHat)" stroke="#00f3ff" strokeWidth="3" />
              <ellipse cx="100" cy="83" rx="56" ry="11" fill="#ffffff" opacity="0.08" />

              {/* Лицо */}
              <ellipse cx="100" cy="115" rx="44" ry="38" fill="url(#profFace)" />
              <path d="M 124 146 Q 140 138 142 118" stroke="url(#profRim)" strokeWidth="3.5" strokeLinecap="round" fill="none" opacity="0.9" />
              <ellipse cx="84" cy="96" rx="18" ry="7" fill="#ffffff" opacity="0.1" transform="rotate(-14 84 96)" />
              <ellipse cx="100" cy="115" rx="44" ry="38" fill="none" stroke="#00f3ff" strokeWidth="2.5" opacity="0.9" />

              {/* Кибер-очки */}
              <rect x="62" y="98" width="34" height="22" rx="7" fill="url(#profGlass)" opacity="0.9" />
              <rect x="104" y="98" width="34" height="22" rx="7" fill="url(#profGlass)" opacity="0.9" />
              <line x1="96" y1="109" x2="104" y2="109" stroke="#fcee0a" strokeWidth="3" strokeLinecap="round" />
              <line x1="66" y1="102" x2="76" y2="102" stroke="#ffffff" strokeWidth="2" opacity="0.7" strokeLinecap="round" />
              <line x1="108" y1="102" x2="118" y2="102" stroke="#ffffff" strokeWidth="2" opacity="0.7" strokeLinecap="round" />

              {/* Глаза за очками */}
              {isBlinking ? (
                <g>
                  <line x1="72" y1="110" x2="88" y2="110" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                  <line x1="112" y1="110" x2="128" y2="110" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" />
                </g>
              ) : currentMood === 'happy' || currentMood === 'celebrate' ? (
                <g>
                  <path d="M 71 111 Q 79 103 87 111" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                  <path d="M 113 111 Q 121 103 129 111" stroke="#0f172a" strokeWidth="3" strokeLinecap="round" fill="none" />
                </g>
              ) : (
                <g>
                  <circle cx={79 + pupilOffset.x} cy={109 + pupilOffset.y} r="4" fill="#0f172a" />
                  <circle cx={121 + pupilOffset.x} cy={109 + pupilOffset.y} r="4" fill="#0f172a" />
                </g>
              )}

              {/* Цифровая борода (matrix-потоки) */}
              <path d="M 68 136 Q 100 148 132 136 L 100 182 Z" fill="#0f172a" stroke="#00f3ff" strokeWidth="2" strokeLinejoin="round" />
              <line x1="85" y1="146" x2="94" y2="166" stroke="#00ff41" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
              <line x1="100" y1="142" x2="100" y2="176" stroke="#00ff41" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />
              <line x1="115" y1="146" x2="106" y2="166" stroke="#00ff41" strokeWidth="1.5" strokeDasharray="3 2" opacity="0.8" />

              {/* Рот */}
              {isSpeaking ? (
                <ellipse cx="100" cy="134" rx="5" ry="4" fill="#00f3ff" className="animate-pulse" />
              ) : currentMood === 'thinking' ? (
                <path d="M 93 133 Q 100 131 107 133" stroke="#00f3ff" strokeWidth="2" strokeLinecap="round" fill="none" />
              ) : (
                <path d="M 92 132 Q 100 137 108 132" stroke="#00f3ff" strokeWidth="2" strokeLinecap="round" fill="none" />
              )}

              {/* Посох с кристаллом */}
              <line x1="170" y1="62" x2="170" y2="200" stroke="url(#profGlass)" strokeWidth="3.5" strokeLinecap="round" opacity="0.9" />
              <g className="mascot-bob">
                <circle cx="170" cy="52" r="14" fill="#00f3ff" opacity="0.15" />
                <polygon points="170,42 160,58 180,58" fill="url(#profCrystal)" stroke="#00f3ff" strokeWidth="1.5" />
                <circle cx="167" cy="50" r="2" fill="#ffffff" />
              </g>
            </svg>
          )}

          {/* 4. АСТРО-БОТ (белый глянец + золото + голубой визор) */}
          {skin === 'astro' && (
            <svg viewBox="0 0 200 240" className="w-full h-full overflow-visible" fill="none" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <radialGradient id="asBody" cx="32%" cy="22%" r="80%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#f1f5f9" />
                  <stop offset="70%" stopColor="#b6c2d1" />
                  <stop offset="100%" stopColor="#5b6b80" />
                </radialGradient>
                <linearGradient id="asVisor" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#0e7490" />
                  <stop offset="45%" stopColor="#075985" />
                  <stop offset="100%" stopColor="#082f49" />
                </linearGradient>
                <radialGradient id="asVisorGlow" cx="50%" cy="45%" r="60%">
                  <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.22" />
                  <stop offset="100%" stopColor="#00f3ff" stopOpacity="0" />
                </radialGradient>
                <linearGradient id="asGold" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#fef9c3" />
                  <stop offset="50%" stopColor="#fcee0a" />
                  <stop offset="100%" stopColor="#ca8a04" />
                </linearGradient>
                <linearGradient id="asRim" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#00f3ff" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#00f3ff" />
                </linearGradient>
                <linearGradient id="asFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#fcee0a" />
                  <stop offset="70%" stopColor="#00f3ff" />
                  <stop offset="100%" stopColor="transparent" />
                </linearGradient>
              </defs>

              {/* Антенна-звезда */}
              <g className="mascot-sway">
                <line x1="100" y1="36" x2="100" y2="14" stroke="url(#asGold)" strokeWidth="4" strokeLinecap="round" />
                <circle cx="100" cy="10" r="10" fill="#fcee0a" opacity="0.2" />
                <polygon points="100,0 103,7 110,10 103,13 100,20 97,13 90,10 97,7" fill="url(#asGold)" />
                <ellipse cx="100" cy="10" rx="20" ry="6" stroke="#00f3ff" strokeWidth="1.5" strokeDasharray="4 2" fill="none" opacity="0.7" />
              </g>

              {/* Боковые золотые модули */}
              <g transform="translate(18, 78)">
                <rect x="0" y="0" width="18" height="50" rx="8" fill="url(#asGold)" stroke="#00f3ff" strokeWidth="2" />
                <circle cx="9" cy="25" r="4" fill="#0284c7" />
                <circle cx="7.5" cy="23.5" r="1.5" fill="#ffffff" />
              </g>
              <g transform="translate(164, 78)">
                <rect x="0" y="0" width="18" height="50" rx="8" fill="url(#asGold)" stroke="#00f3ff" strokeWidth="2" />
                <circle cx="9" cy="25" r="4" fill="#0284c7" />
                <circle cx="7.5" cy="23.5" r="1.5" fill="#ffffff" />
              </g>

              {/* Шлем */}
              <rect x="32" y="36" width="136" height="126" rx="42" fill="url(#asBody)" />
              {/* Rim-light справа-снизу */}
              <path d="M 62 156 Q 100 166 140 154 Q 162 146 166 124" stroke="url(#asRim)" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.9" />
              {/* Глянцевый блик шлема */}
              <ellipse cx="76" cy="52" rx="40" ry="13" fill="#ffffff" opacity="0.5" transform="rotate(-8 76 52)" />
              <path d="M 52 46 Q 100 40 148 46" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" opacity="0.8" fill="none" />
              <rect x="32" y="36" width="136" height="126" rx="42" fill="none" stroke="#00f3ff" strokeWidth="2.5" opacity="0.85" />

              {/* Визор */}
              <rect x="46" y="54" width="108" height="82" rx="26" fill="url(#asVisor)" stroke="#00f3ff" strokeWidth="2.5" />
              <rect x="46" y="54" width="108" height="82" rx="26" fill="url(#asVisorGlow)" />
              <path d="M 52 60 L 98 60 L 68 128 L 52 128 Z" fill="#ffffff" opacity="0.13" />
              <ellipse cx="100" cy="60" rx="40" ry="6" fill="#ffffff" opacity="0.15" />

              <RobotFace
                mood={currentMood}
                isSpeaking={isSpeaking}
                isBlinking={isBlinking}
                pupilOffset={pupilOffset}
                colors={{ eye: '#00f3ff', mouth: '#fcee0a', star: '#fcee0a' }}
                cxL={77}
                cxR={123}
              />

              {/* Золотой реактор на груди */}
              <g className="animate-pulse">
                <circle cx="100" cy="146" r="12" fill="#00f3ff" opacity="0.15" />
                <circle cx="100" cy="146" r="10" fill="#0f172a" stroke="url(#asGold)" strokeWidth="2" />
                <circle cx="100" cy="146" r="6" fill="#00f3ff" />
                <circle cx="98" cy="144" r="2" fill="#ffffff" />
              </g>

              {/* Двигатели */}
              <g transform="translate(62, 166)">
                <rect x="4" y="0" width="26" height="14" rx="4" fill="#64748b" stroke="url(#asGold)" strokeWidth="2" />
                <rect x="46" y="0" width="26" height="14" rx="4" fill="#64748b" stroke="url(#asGold)" strokeWidth="2" />
                <polygon points="17,14 7,36 27,36" fill="url(#asFlame)" className="animate-pulse" />
                <polygon points="59,14 49,36 69,36" fill="url(#asFlame)" className="animate-pulse" />
                <polygon points="17,14 12,25 22,25" fill="#ffffff" opacity="0.9" />
                <polygon points="59,14 54,25 64,25" fill="#ffffff" opacity="0.9" />
              </g>

              {/* Левая рука */}
              <g className="mascot-bob-alt">
                <circle cx="18" cy="142" r="12" fill="url(#asBody)" stroke="#00f3ff" strokeWidth="2.5" />
                <circle cx="18" cy="142" r="5" fill="url(#asGold)" />
              </g>

              {/* Правая рука: жест */}
              <RobotGestureArm gesture={gesture} accent="#00f3ff" palm="#fcee0a" beam="#fcee0a" />
            </svg>
          )}
        </div>

        {/* =================================================================== */}
        {/* INTERACTION BADGE / POKE COUNTER */}
        {/* =================================================================== */}
        <div className="absolute top-0 right-4 bg-gray-900/90 border border-cyber-neonGreen text-cyber-neonGreen text-[11px] font-mono px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(0,255,65,0.4)] flex items-center gap-1 hover:scale-105 transition-transform">
          <span className="w-2 h-2 rounded-full bg-cyber-neonGreen animate-ping" />
          <span>Кликни на меня!</span>
        </div>
      </div>
    </div>
  );
};
