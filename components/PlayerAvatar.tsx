import { ModularCharacter } from './ModularCharacter';
import React from 'react';
import type { User } from '../types';
import ShopAvatar from './ShopAvatar';
import { getPlayerCharacter } from '../utils/playerCharacter';
/** Reuse for profile, lessons, achievements and future classroom social surfaces. */
export function PlayerAvatar({user,...props}: {user?:Pick<User,'equipped'>|null} & Omit<React.ComponentProps<typeof ShopAvatar>,'avatarId'|'frameId'>) {
  const character=getPlayerCharacter(user);
  if (user?.equipped.avatar === 'av_1' && user.equipped.characterParts) return <ModularCharacter parts={user.equipped.characterParts} frameId={character.frameId} motion={props.motion} stage={props.stage} scale={props.scale} className={props.className}/>;
  return <ShopAvatar {...props} avatarId={character.avatarId} frameId={character.frameId}/>;
}
