
import React, { useEffect, useRef, useState } from 'react';

export interface SpriteConfig {
  avatarId: string; // e.g. '1', '2', ... '12'
  animation: 'Idle' | 'Walk' | 'Special';
  scale?: number;
  fps?: number;
}

// Frame counts per avatar per animation
const FRAME_DATA: Record<string, Record<string, number>> = {
  '1':  { Idle: 6, Walk: 6, Special: 6 },
  '2':  { Idle: 4, Walk: 6, Special: 4 },
  '3':  { Idle: 4, Walk: 6, Special: 6 },
  '4':  { Idle: 4, Walk: 6, Special: 4 },
  '5':  { Idle: 4, Walk: 6 },
  '6':  { Idle: 4, Walk: 6, Special: 6 },
  '7':  { Idle: 4, Special: 6 },
  '8':  { Idle: 4, Special: 4 },
  '9':  { Idle: 4, Walk: 6 },
  '10': { Idle: 4, Walk: 4, Special: 6 },
  '11': { Idle: 4, Walk: 6 },
  '12': { Idle: 4, Walk: 6 },
};

const FRAME_SIZE = 48;

export const getAvatarAnimations = (avatarId: string): string[] => {
  return Object.keys(FRAME_DATA[avatarId] || FRAME_DATA['1']);
};

export const hasAnimation = (avatarId: string, anim: string): boolean => {
  const data = FRAME_DATA[avatarId] || FRAME_DATA['1'];
  return anim in data;
};

const AnimatedSprite: React.FC<SpriteConfig & { className?: string }> = ({ 
  avatarId, 
  animation, 
  scale = 3, 
  fps = 8,
  className = '' 
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  const data = FRAME_DATA[avatarId] || FRAME_DATA['1'];
  // Fallback: if requested animation doesn't exist, use Idle
  const actualAnim = data[animation] ? animation : 'Idle';
  const frameCount = data[actualAnim] || 4;
  const src = `/avatars/${avatarId}/${actualAnim}.png`;

  const w = FRAME_SIZE * scale;
  const h = FRAME_SIZE * scale;

  useEffect(() => {
    const img = new Image();
    img.src = src;
    img.onload = () => {
      imgRef.current = img;
      setLoaded(true);
    };
    return () => { imgRef.current = null; };
  }, [src]);

  useEffect(() => {
    if (!loaded || !canvasRef.current || !imgRef.current) return;
    const ctx = canvasRef.current.getContext('2d');
    if (!ctx) return;

    ctx.imageSmoothingEnabled = false; // Pixel-perfect rendering

    let animId: number;
    let lastTime = 0;
    const interval = 1000 / fps;

    const draw = (time: number) => {
      if (time - lastTime >= interval) {
        lastTime = time;
        ctx.clearRect(0, 0, w, h);
        if (imgRef.current) {
          ctx.drawImage(
            imgRef.current,
            frameRef.current * FRAME_SIZE, 0, FRAME_SIZE, FRAME_SIZE,
            0, 0, w, h
          );
        }
        frameRef.current = (frameRef.current + 1) % frameCount;
      }
      animId = requestAnimationFrame(draw);
    };
    animId = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animId);
  }, [loaded, frameCount, w, h, fps, src]);

  // Reset frame on animation change
  useEffect(() => {
    frameRef.current = 0;
  }, [actualAnim, avatarId]);

  return (
    <canvas
      ref={canvasRef}
      width={w}
      height={h}
      className={`${className}`}
      style={{ width: w, height: h, imageRendering: 'pixelated' }}
    />
  );
};

export default AnimatedSprite;
