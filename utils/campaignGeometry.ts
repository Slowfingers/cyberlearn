export const MISSIONS_PER_CITY_LEG = 10;
export const CITY_ART_SIZE = { width: 1536, height: 1024 };
export interface CityPoint {x:number;y:number}
// Centerline traced from the painted CyberLearn road; every city preserves this road.
const ROAD_ANCHORS:CityPoint[] = [
 {x:460,y:952},{x:650,y:846},{x:850,y:834},{x:1060,y:811},
 {x:1170,y:733},{x:1118,y:668},{x:930,y:633},{x:700,y:628},
 {x:530,y:602},{x:510,y:551},{x:620,y:504},{x:870,y:489},
 {x:1060,y:469},{x:1120,y:426},{x:1084,y:390},{x:910,y:365},
 {x:720,y:348},{x:640,y:307},{x:681,y:273},{x:870,y:251},
 {x:1070,y:233},{x:1180,y:196},{x:1180,y:162},
];
// Catmull-Rom interpolates the hand-traced bends, shared by route paint and walking.
export const CITY_ROAD:CityPoint[] = ROAD_ANCHORS.slice(0,-1).flatMap((p1,i)=>{
 const p0=ROAD_ANCHORS[Math.max(0,i-1)],p2=ROAD_ANCHORS[i+1],p3=ROAD_ANCHORS[Math.min(ROAD_ANCHORS.length-1,i+2)];
 return Array.from({length:16},(_,j)=>{
  const t=j/16,t2=t*t,t3=t2*t;
  const v=(key:'x'|'y')=>.5*((2*p1[key])+(-p0[key]+p2[key])*t+(2*p0[key]-5*p1[key]+4*p2[key]-p3[key])*t2+(-p0[key]+3*p1[key]-3*p2[key]+p3[key])*t3);
  return {x:v('x'),y:v('y')};
 });
}).concat(ROAD_ANCHORS.at(-1)!);
const distances=CITY_ROAD.map((p,i)=>i?Math.hypot(p.x-CITY_ROAD[i-1].x,p.y-CITY_ROAD[i-1].y):0);
const accumulated:number[]=[];distances.reduce((sum,d,i)=>(accumulated[i]=sum+d),0);
export function cityPathForCount(count:number) {
 const n=Math.min(count,MISSIONS_PER_CITY_LEG),total=accumulated.at(-1)!;
 return Array.from({length:n},(_,i)=>{
  const distance=n===1?total*.5:total*i/(n-1);
  return CITY_ROAD[accumulated.findIndex(d=>d>=distance)];
 });
}
export const CITY_PLAZA_PATH=cityPathForCount(MISSIONS_PER_CITY_LEG);
export function cityPointOnMap(point:CityPoint,width:number,height:number) {
 const scale=Math.max(width/CITY_ART_SIZE.width,height/CITY_ART_SIZE.height);
 return {x:((width-CITY_ART_SIZE.width*scale)/2+point.x*scale)/width*100,y:((height-CITY_ART_SIZE.height*scale)/2+point.y*scale)/height*100};
}
export function cityRoadBetween(a:CityPoint,b:CityPoint,road:CityPoint[]) {
 const nearest=(p:CityPoint)=>road.reduce((best,q,i)=>Math.hypot(q.x-p.x,q.y-p.y)<Math.hypot(road[best].x-p.x,road[best].y-p.y)?i:best,0);
 const start=nearest(a),end=nearest(b),dir=end>=start?1:-1;
 const points=[a];for(let i=start+dir;dir>0?i<=end:i>=end;i+=dir)points.push(road[i]);
 points.push(b);return points;
}
export function cityLegForTask(index:number){return Math.floor(Math.max(0,index)/MISSIONS_PER_CITY_LEG);}

/** District entrances are authored on a staggered city, at different depths along its streets. */
export const DISTRICTS_PER_SECTOR=7;
const DISTRICT_ENTRANCES=[
 {x:395,y:808,labelX:390,labelY:900},
 {x:895,y:880,labelX:770,labelY:950},
 {x:1065,y:770,labelX:1000,labelY:690},
 {x:1215,y:585,labelX:1370,labelY:580},
 {x:970,y:405,labelX:965,labelY:295},
 {x:535,y:350,labelX:390,labelY:445},
 {x:735,y:210,labelX:570,labelY:160},
];
// Centerlines traced on the v10 boulevard, in curriculum order. Building occlusion
// is handled by the foreground mask, so the route never paints over a facade.
const DISTRICT_STREETS=[
 'M395 808 C470 815 545 805 600 820 C660 835 665 880 735 900 C785 920 845 900 895 880',
 'M895 880 C975 865 1045 840 1050 800 Q1052 780 1065 770',
 'M1065 770 C1070 730 1165 680 1220 635 Q1270 600 1215 585',
 'M1215 585 C1170 550 1100 550 1100 485 C1100 425 1060 400 970 405',
 'M970 405 C850 405 685 410 585 380 Q552 370 535 350',
 'M535 350 C500 320 510 280 580 260 Q710 230 735 210',
];
export interface CourseDistrictPoint {index:number;sector:number;slot:number;x:number;y:number;labelX:number;labelY:number;rawX:number;rawY:number;left:number;top:number;width:number;height:number}
export function courseDistrictRoutes(count:number){
 const layout=courseDistrictLayout(count);
 return layout.districts.slice(1).map(to=>({from:to.index-1,to:to.index,sector:to.sector,transit:to.slot===0,path:to.slot===0
  ? `M${(to.sector-1)*1536+735} 210 L${(to.sector-1)*1536+1000} 240 L${(to.sector-1)*1536+1050} 270 L${to.sector*1536-80} 240 L${to.sector*1536} 480 L${to.sector*1536+110} 490 Q${to.sector*1536+170} 500 ${to.sector*1536+175} 580 L${to.sector*1536+240} 700 Q${to.sector*1536+300} 790 ${to.rawX} ${to.rawY}`
  :DISTRICT_STREETS[to.slot-1]}));
}
export function courseDistrictLayout(count:number):{sectors:number;width:number;districts:CourseDistrictPoint[]}{
 const total=Math.max(0,Math.floor(count)),sectors=Math.max(1,Math.ceil(total/DISTRICTS_PER_SECTOR)),width=CITY_ART_SIZE.width*sectors;
 const districts=Array.from({length:total},(_,index)=>{
  const sector=Math.floor(index/DISTRICTS_PER_SECTOR),slot=index%DISTRICTS_PER_SECTOR,entrance=DISTRICT_ENTRANCES[slot];
  const rawX=sector*CITY_ART_SIZE.width+entrance.x,rawY=entrance.y;
  const labelRawX=sector*1536+entrance.labelX;
  return{index,sector,slot,rawX,rawY,x:rawX/width*100,y:rawY/1024*100,labelX:labelRawX/width*100,labelY:entrance.labelY/1024*100,left:labelRawX-110,top:entrance.labelY-60,width:220,height:120};
 });return{sectors,width,districts};
}
