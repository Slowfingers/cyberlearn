/** Car centres move along Z; each lane stops before its own edge of the crossing. */
export const CITY_TRAFFIC_LANES = [
 {direction:-1,stopLine:4.4,start:5.2},
 {direction:1,stopLine:-.6,start:-4.8},
] as const;
export const CITY_CAR_SPEED=1.5;
export function advanceCityCar(position:number,lane:{direction:number;stopLine:number},green:boolean,seconds:number){
 const step=CITY_CAR_SPEED*Math.max(0,seconds);
 const hasEntered=(position-lane.stopLine)*lane.direction>1e-6;
 let next=position+lane.direction*step;
 // Once a vehicle has entered, it clears the crossing under any later signal.
 if(!green&&!hasEntered)next=lane.direction<0?Math.max(lane.stopLine,next):Math.min(lane.stopLine,next);
 // Respawn only after the entire car has left the road, independently per lane.
 if(next*lane.direction>7.2)next=-lane.direction*7.2;
 return next;
}
