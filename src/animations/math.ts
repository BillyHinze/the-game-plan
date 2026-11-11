export type V3 = [number,number,number];
export const clamp = (x:number,a=0,b=1)=>Math.min(b,Math.max(a,x));
export const smooth = (x:number)=>{const t=clamp(x);return t*t*(3-2*t);};
export const mix = (a:number,b:number,t:number)=>a+(b-a)*t;
export const add = (a:V3,b:V3):V3=>[a[0]+b[0],a[1]+b[1],a[2]+b[2]];
export const sub = (a:V3,b:V3):V3=>[a[0]-b[0],a[1]-b[1],a[2]-b[2]];
export const mul = (a:V3,s:number):V3=>[a[0]*s,a[1]*s,a[2]*s];
export const len = (a:V3)=>Math.hypot(...a);
export const norm = (a:V3):V3=>mul(a,1/(len(a)||1));
export const dot = (a:V3,b:V3)=>a[0]*b[0]+a[1]*b[1]+a[2]*b[2];
export const lerp3=(a:V3,b:V3,t:number):V3=>[mix(a[0],b[0],t),mix(a[1],b[1],t),mix(a[2],b[2],t)];
// Constrained two-bone IK. Pole is a bend direction, not a mutable simulation.
export function twoBone(root:V3,target:V3,a:number,b:number,pole:V3):{joint:V3;end:V3} {
 const delta=sub(target,root), d=clamp(len(delta),Math.abs(a-b)+0.0001,a+b-0.0001);
 const direction=norm(delta), end=add(root,mul(direction,d));
 const along=(a*a-b*b+d*d)/(2*d);
 const normal=norm(sub(pole,mul(direction,dot(pole,direction))));
 const joint=add(add(root,mul(direction,along)),mul(normal,Math.sqrt(Math.max(0,a*a-along*along))));
 return {joint,end};
}
