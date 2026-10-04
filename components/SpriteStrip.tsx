import React, { useId } from 'react';
import { SPRITE_SILHOUETTES } from './spriteSilhouettes';

/** Each cell has a fixed viewport and its own mask; only the enclosing strip moves. */
export function SpriteStrip({ skin, movement = false, row = 0, className, href }: { skin: keyof typeof SPRITE_SILHOUETTES; movement?: boolean; row?: number; className: string; href: string }) {
  const id = useId();
  const sets = SPRITE_SILHOUETTES[skin];
  const data = movement && 'movement' in sets ? sets.movement : sets.idle;
  return <><defs><clipPath id={`${id}-viewport`}><rect width="362" height="724"/></clipPath></defs><g clipPath={`url(#${id}-viewport)`}><g className={className}>{Array.from({length:6},(_,index)=>{
    const clip = `${id}-frame-${index}`;
    return <svg key={index} x={index*362} width="362" height="724" viewBox="0 0 362 724" overflow="hidden">
      <defs><clipPath id={clip} clipPathUnits="userSpaceOnUse"><path d={data.paths[row*6+index]} transform={`scale(${362/data.width} ${724/data.height})`}/></clipPath></defs>
      <g clipPath={`url(#${clip})`}><image href={href} x={-index*362} y={-row*724} width="2172" height={movement ? 1448 : 724}/></g>
    </svg>;
  })}</g></g></>;
}
