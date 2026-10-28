import assert from 'node:assert/strict';
import {projectRoom,unprojectRoom,ROOM_FLOOR_CORNERS} from '../utils/avatarRoomGeometry';
// Annotated inner wood-floor vertices from building-v1.png, mapped into world space.
const wood=[{x:761.49,y:344.8},{x:1478,y:663.4},{x:672.44,y:986.05},{x:51.83,y:594.55}];
function inside(p:{x:number;y:number}){let result=false;for(let i=0,j=wood.length-1;i<wood.length;j=i++){const a=wood[i],b=wood[j];if((a.y>p.y)!==(b.y>p.y)&&p.x<(b.x-a.x)*(p.y-a.y)/(b.y-a.y)+a.x)result=!result;}return result;}
for(let x=0;x<=8;x+=.5)for(let y=0;y<=8;y+=.5){const screen=projectRoom(x,y),restored=unprojectRoom(screen.x,screen.y);assert.ok(Math.abs(restored.x-x)<1e-8&&Math.abs(restored.y-y)<1e-8);assert.ok(inside(screen),`floor ${x},${y} must stay on the painted wood`);}
console.log('avatarRoomGeometry: inverse projection and all grid vertices/centers inside the painted apartment floor OK');

for(const [x,y,index] of [[0,0,0],[8,0,1],[8,8,2],[0,8,3]])assert.ok(Math.hypot(projectRoom(x,y).x-ROOM_FLOOR_CORNERS[index].x,projectRoom(x,y).y-ROOM_FLOOR_CORNERS[index].y)<1e-8);
for(let axis=0;axis<2;axis++)for(let line=0;line<=8;line++){const a=projectRoom(axis?line:0,axis?0:line),b=projectRoom(axis?line:8,axis?8:line);for(let step=0;step<=8;step++){const p=projectRoom(axis?line:step,axis?step:line);assert.ok(Math.abs((p.x-a.x)*(b.y-a.y)-(p.y-a.y)*(b.x-a.x))<1e-6,'grid lines stay straight across the perspective floor');}}

const {projectRoomWall,roomWallPolygon}=await import('../utils/avatarRoomGeometry');
for(const wall of ['left','right'] as const)for(let x=0;x<8;x++)for(let y=0;y<3;y++){
 const p=projectRoomWall(wall,x,y),right=projectRoomWall(wall,x+1,y),down=projectRoomWall(wall,x,y+1);
 assert.ok(right.x>p.x,'artwork is never mirrored on either wall');assert.ok(down.y>p.y);assert.ok(p.y>=0&&down.y<=1030);assert.ok(roomWallPolygon(wall,x,y).split(' ').length===4);
}
console.log('Wall projection: both planes stay in the room, vertical edges remain upright and art is never mirrored');
