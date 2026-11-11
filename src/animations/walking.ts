import type {V3} from './math';
import {smooth} from './math';
// A half-cycle plants a foot in world space when root speed matches 2 * stride / period.
// The recovery half lifts the toe. Foot soles never penetrate y=0.
export function walkingFoot(t:number,side:number,period=1.1,stride=.48):V3 {
 const p=((t/period+(side<0?.5:0))%1+1)%1;
 const x=side*.19;
 if(p<.5) return [x,.09,stride*(.5-2*p)];
 const q=(p-.5)*2;
 return [x,.09+.22*Math.sin(Math.PI*q),stride*(-.5+smooth(q))];
}
