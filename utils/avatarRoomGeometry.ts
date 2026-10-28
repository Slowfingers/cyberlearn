/** Perspective grid follows all four edges of the painted apartment floor. */
export const ROOM_CANVAS={width:1536,height:1030};
export const ROOM_FLOOR_CORNERS=[{x:761,y:365},{x:1444,y:662},{x:679,y:958},{x:91,y:604}] as const;
const [p0,p1,p2,p3]=ROOM_FLOOR_CORNERS;
const dx1=p1.x-p2.x,dx2=p3.x-p2.x,dx3=p0.x-p1.x+p2.x-p3.x;
const dy1=p1.y-p2.y,dy2=p3.y-p2.y,dy3=p0.y-p1.y+p2.y-p3.y;
const determinant=dx1*dy2-dx2*dy1;
const g=(dx3*dy2-dx2*dy3)/determinant,h=(dx1*dy3-dx3*dy1)/determinant;
const a=p1.x-p0.x+g*p1.x,b=p3.x-p0.x+h*p3.x,c=p0.x;
const d=p1.y-p0.y+g*p1.y,e=p3.y-p0.y+h*p3.y,f=p0.y;
export function projectRoom(x:number,y:number){const u=x/8,v=y/8,k=g*u+h*v+1;return{x:(a*u+b*v+c)/k,y:(d*u+e*v+f)/k};}
export function roomCellPolygon(x:number,y:number,w=1,h=1){return[projectRoom(x,y),projectRoom(x+w,y),projectRoom(x+w,y+h),projectRoom(x,y+h)].map(p=>`${p.x},${p.y}`).join(' ');}
/** Exact inverse homography: pointer snapping matches the visible quadrilateral. */
export function unprojectRoom(px:number,py:number){const aa=a-px*g,bb=b-px*h,dd=d-py*g,ee=e-py*h,xx=px-c,yy=py-f,det=aa*ee-bb*dd;return{x:8*(xx*ee-bb*yy)/det,y:8*(aa*yy-xx*dd)/det};}
export function roomLocalScale(x:number,y:number){const p=projectRoom(x,y),u=projectRoom(x+1,y),v=projectRoom(x,y+1);return(Math.abs(u.x-p.x)+Math.abs(v.x-p.x))/168;}

/** Wall grid is separate from the floor, with a safe inset from structural beams. */
export function projectRoomWall(wall:'left'|'right',x:number,y:number){
 const end=wall==='left'?p3:p1,t=wall==='left'?.92-.84*x/8:.08+.84*x/8;
 return{x:p0.x+(end.x-p0.x)*t,y:p0.y+(end.y-p0.y)*t-310+y*90};
}
export function roomWallPolygon(wall:'left'|'right',x:number,y:number,w=1,h=1){return[projectRoomWall(wall,x,y),projectRoomWall(wall,x+w,y),projectRoomWall(wall,x+w,y+h),projectRoomWall(wall,x,y+h)].map(p=>`${p.x},${p.y}`).join(' ');}
