import type {V3} from './math';
export const celebrateHands=(t:number,side:number):V3=>[side*(.58+.08*Math.sin(t*5)),2.5+.05*Math.cos(t*5),.05];
export const gestureHand=(t:number,side:number):V3=>[side*.9,1.85+.09*Math.sin(t*3),.18];
