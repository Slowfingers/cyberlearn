import React from 'react';
/** One continuous painted facade; an axis-aligned calibration preserves upright windows. */
export const ROOM_VIEWS={building:{x:-300,y:-120,width:2030,height:1420},apartment:{x:0,y:0,width:1536,height:1030}};
export function RoomBuilding(){
 return <g className="room-building" aria-hidden="true" style={{pointerEvents:'none'}}>
  <g transform="matrix(1.37 0 0 1.35 -303 -125)">
   <image href="/art/avatar-room/building-v2.webp" width="1483" height="1061"/>
   <g className="room-building-window room-building-window--one"><path d="M294 659 369 702 369 895 294 846Z" fill="#ffce8020"/></g>
   <g className="room-building-window room-building-window--two"><path d="M1029 814 1243 724 1243 899 1029 989Z" fill="#ffd38718"/></g>
   <g className="room-building-window room-building-window--three"><path d="M1415 398 1480 370 1480 494 1415 522Z" fill="#b8e9ff14"/></g>
  </g>
 </g>;
}
