import React, { createContext, useContext } from 'react';
import type { User } from '../types';
import type { MascotMood, MascotGesture } from './BigCharacter3D';
import { PlayerAvatar } from './PlayerAvatar';
import { getPlayerCharacter } from '../utils/playerCharacter';

export const LessonPlayerContext = createContext<Pick<User, 'equipped'> | null>(null);
export function useLessonCharacterName() {
  return getPlayerCharacter(useContext(LessonPlayerContext)).name;
}
/** The equipped player participates in explanations and reacts to learning progress. */
export function LessonCharacter({ user, mood = 'idle', isSpeaking = false, reactionKey = 0, className = '' }: {
  user?: Pick<User, 'equipped'> | null; mood?: MascotMood; isSpeaking?: boolean;
  reactionKey?: number; className?: string; skin?: string; gesture?: MascotGesture;
}) {
  const contextualUser = useContext(LessonPlayerContext);
  const player = user ?? contextualUser;
  const positive = mood === 'happy' || mood === 'celebrate';
  return <div className={`mentor-character lesson-player-character ${className}`} data-player-avatar={player?.equipped.avatar ?? 'default'} data-mood={mood} data-speaking={isSpeaking || undefined}>
    <div key={`${mood}-${reactionKey}`} className="lesson-player-motion"><PlayerAvatar user={player} stage fullBody motion={positive ? 'success' : isSpeaking ? 'speaking' : mood === 'thinking' || mood === 'curious' ? 'thinking' : mood === 'wink' ? 'wave' : 'idle'} className="lesson-player-art"/></div>
    <span className="lesson-player-platform" aria-hidden="true"/>
    {(positive || mood === 'thinking') && <span key={`${mood}-${reactionKey}-reaction`} className="lesson-player-reaction" aria-hidden="true">{positive ? '✦' : '?'}</span>}
  </div>;
}
