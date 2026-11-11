import {BasketballCourt} from '../components/BasketballCourt';
import {Stickman} from '../components/Stickman';
import {Sphere,Beam,palette} from '../components/Geometry';
import type {SceneProps} from './types';
export function Scene06({t}:SceneProps) {
 const calm=t>2.5;
 return <group><BasketballCourt compact/>
 <Stickman t={t} action={!calm?'deadline':t<5?'idle':'celebrate'} position={[0,0,.6]}/>
 <Stickman t={t+.2} action={t<5?'pass':'celebrate'} position={[-1.5,0,.2]} color={palette.orange}/>
 <Stickman t={t+.6} action={t<5?'gesture':'celebrate'} position={[1.5,0,.2]} color={palette.blue}/>
 {!calm&&Array.from({length:5},(_,i)=><Beam key={i} a={[Math.sin(i*1.3)*.5,2.8,Math.cos(i*1.3)*.4]} b={[Math.sin(i*1.3+t)*.65,3.05,Math.cos(i*1.3+t)*.5]} color={palette.red} r={.025}/>)}
 {calm&&Array.from({length:7},(_,i)=><Sphere key={i} at={[Math.sin(i*4)*2.5,2.8+Math.sin(t*2+i)*.15,Math.cos(i*4)*1.2]} r={.04} color={palette.orange}/>)}
 </group>;
}