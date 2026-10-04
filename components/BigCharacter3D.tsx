import React, { useEffect } from 'react';

import { SpriteStrip } from './SpriteStrip';

export type MascotSkin = 'sparky' | 'astro' | 'cat' | 'prof';
export type MascotMood = 'idle' | 'happy' | 'thinking' | 'curious' | 'celebrate' | 'wink' | 'talking';
export type MascotGesture = 'point_cloud' | 'wave' | 'thumbs_up' | 'scratch_head' | 'idle';
export const MENTOR_NAMES: Record<MascotSkin, string> = { sparky: 'Спарки', cat: 'Кибер-Кот', prof: 'Профессор', astro: 'Астро' };
export function resolveMentorSkin(value?: string): MascotSkin {
  const key = value?.replace('skin_', '');
  return key && Object.prototype.hasOwnProperty.call(MENTOR_NAMES, key) ? key as MascotSkin : 'sparky';
}
interface BigCharacter3DProps {
  reactionKey?: number;
  skin?: MascotSkin | string;
  mood?: MascotMood;
  isSpeaking?: boolean;
  gesture?: MascotGesture;
  onPoke?: () => void;
  className?: string;
  speechBubblePosition?: 'right' | 'left' | 'top';
}
// Keep the public component API and cosmetic IDs for existing purchases.
export const BigCharacter3D: React.FC<BigCharacter3DProps> = ({ reactionKey = 0, skin: value, mood = 'idle', isSpeaking = false, onPoke, className = '' }) => {
  const skin = resolveMentorSkin(value);
  useEffect(() => { const image = new Image(); image.src = `/avatar/mentors/${skin}-movements-v2.png`; }, [skin]);
  const reaction = mood === 'celebrate' || mood === 'happy' ? 'celebrate' : mood === 'thinking' ? 'thinking' : null;
  const art = <svg viewBox="0 0 362 724" className="mentor-art" role="img" aria-label={MENTOR_NAMES[skin]} overflow="hidden">
    <SpriteStrip key={`${skin}-${reaction}-${reactionKey}`} skin={skin} movement={!!reaction} row={reaction === 'thinking' ? 1 : 0} className={reaction ? `mentor-movement-strip is-${reaction}` : 'street-avatar-strip'} href={`/avatar/mentors/${skin}${reaction ? '-movements-v2' : ''}.png`}/>

  </svg>;
  const positive = mood === 'celebrate' || mood === 'happy';
  const visual = <><div className="mentor-motion" key={`${mood}-${reactionKey}`}>{art}</div>{(positive || mood === 'thinking') && <svg key={`reaction-${mood}-${reactionKey}`} className="mentor-reaction-pixels" viewBox="0 0 140 260" aria-hidden="true" shapeRendering="crispEdges">
    {positive ? <><g className="mentor-pixel-star"><path d="M15 22h4v4h4v4h-4v4h-4v-4h-4v-4h4z" fill="#ffe17d"/></g><g className="mentor-pixel-star"><path d="M116 43h4v4h4v4h-4v4h-4v-4h-4v-4h4z" fill="#69f7df"/></g><g className="mentor-pixel-star"><path d="M103 12h3v3h3v3h-3v3h-3v-3h-3v-3h3z" fill="#ec9fff"/></g></> : <path className="mentor-pixel-thought" d="M112 18h12v3h3v9h-3v3h-3v6h-6v-9h6v-6h-9z M115 43h6v6h-6z" fill="#9de9ff"/>}
  </svg>}</>;
  return onPoke ? <button type="button" className={`mentor-character ${className}`} data-mood={mood} data-speaking={isSpeaking || undefined} onClick={onPoke} aria-label={`Поздороваться: ${MENTOR_NAMES[skin]}`}>{visual}</button>
    : <div className={`mentor-character ${className}`} data-mood={mood} data-speaking={isSpeaking || undefined}>{visual}</div>;
};
