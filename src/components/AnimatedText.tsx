import type {CSSProperties,ReactNode} from 'react';
import {smooth,clamp} from '../animations/math';
export function AnimatedText({children,t,delay=0,style={}}:{children:ReactNode;t:number;delay?:number;style?:CSSProperties}) {
 const p=smooth((t-delay)/.5);
 return <div style={{opacity:clamp((t-delay)/.25),transform:`translateY(${(1-p)*24}px)`,...style}}>{children}</div>;
}
