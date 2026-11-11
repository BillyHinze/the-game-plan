import {clamp,smooth,lerp3,type V3} from './math';
export const BALL_RADIUS=.17;
export const HOOP:V3=[3.5,3.05,0];
export const SHOT_START:V3=[-.2,2.48,0];
export const RELEASE=1.3;
export const FLIGHT=1.25;
export function dribbleHeight(t:number) {
 const p=((t/.7)%1+1)%1;
 return BALL_RADIUS+1.06*Math.pow(Math.abs(Math.cos(Math.PI*p)),.82);
}
export function shotPosition(t:number):V3 {
 if(t<RELEASE) return lerp3([-.2,1.8,0],SHOT_START,smooth(t/RELEASE));
 const p=(t-RELEASE)/FLIGHT;
 // Exact endpoint at the centre of the rim. Derivative is downward there.
 if(p<=1) {const q=p>1-1e-10?1:clamp(p); const v=lerp3(SHOT_START,HOOP,q);v[1]+=4*1.22*q*(1-q);return v;}
 return [HOOP[0],Math.max(BALL_RADIUS,HOOP[1]-(p-1)*4.5),HOOP[2]];
}
export function passPosition(t:number,a:V3,b:V3):V3 {
 const p=clamp(t);const v=lerp3(a,b,p);v[1]+=.4*Math.sin(Math.PI*p);return v;
}
