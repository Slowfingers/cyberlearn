import React,{useId} from 'react';
import {SPRITE_SILHOUETTES} from './spriteSilhouettes';
/** Articulate the original first sprite cell. Silhouette masks keep neighbouring cells out. */
export function StreetCharacterRig({skin}:{skin:keyof typeof SPRITE_SILHOUETTES}){
 const id=useId().replace(/[^a-zA-Z0-9]/g,'');const data=SPRITE_SILHOUETTES[skin].idle;
 const clip=(part:string)=>`url(#${id}-${part})`;
 // Street sprites share a 362×724 character cell; hips sit just below the jacket.
 const braid=skin==='mira';
 const hip=skin==='kite'?450:480,head=skin==='kite'?345:280,split=181;
 const art=<g clipPath={clip('silhouette')}><image href={`/avatar/street/${skin}.png`} width="2172" height="724"/></g>;
 return <>
  <defs>
   <clipPath id={`${id}-silhouette`}><path d={data.paths[0]} transform={`scale(${362/data.width} ${724/data.height})`}/></clipPath>
   <clipPath id={`${id}-left`}><rect x={braid?90:0} y={hip-5} width={split+4-(braid?90:0)} height={724-hip+5}/>{braid&&<rect x="0" y="580" width={split+4} height="144"/>}</clipPath>
   <clipPath id={`${id}-right`}><rect x={split-4} y={hip-5} width={362-split+4} height={724-hip+5}/></clipPath>
   <clipPath id={`${id}-torso`}><rect width="362" y={head} height={hip-head}/>{braid&&<rect width="90" y={hip} height={580-hip}/>}</clipPath>
   <clipPath id={`${id}-head`}><rect width="362" height={head}/></clipPath>
  </defs>
  <g className="character-body avatar-motion-body">
   <g className="character-leg character-leg--far" style={{transformOrigin:`225px ${hip}px`}}><g clipPath={clip('right')}>{art}</g></g>
   <g className="character-leg character-leg--near" style={{transformOrigin:`138px ${hip}px`}}><g clipPath={clip('left')}>{art}</g></g>
   <g clipPath={clip('torso')}>{art}</g>
   <g className="character-head" style={{transformOrigin:`181px ${head-5}px`}}><g clipPath={clip('head')}>{art}</g></g>
  </g>
 </>;
}
