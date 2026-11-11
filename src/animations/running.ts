import {walkingFoot} from './walking';
export const runningFoot=(t:number,side:number)=>walkingFoot(t,side,.62,1.35);
export const runningLift=(t:number)=>.07+.11*(1-Math.cos(t/.62*Math.PI*4));
