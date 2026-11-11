import {BasketballCourt} from '../components/BasketballCourt';
import {Stickman} from '../components/Stickman';
import {Ring,Beam,palette} from '../components/Geometry';
import type {SceneProps} from './types';
export function Scene07({t,duration}:SceneProps) {
 return <group><BasketballCourt compact/>
 <Ring at={[0,.04,0]} r={1.8} color={palette.teal} tube={.06}/>
 {[-1,0,1].map((i)=><Stickman key={i} t={t+i*.2} action={t<duration*.5?'celebrate':i===0?'walk':'gesture'} position={[i*1.2,0,0]} color={i===-1?palette.orange:i===1?palette.blue:palette.teal}/>)}
 {t<duration*.5&&<><Beam a={[-.7,1.3,.15]} b={[.7,1.3,.15]} r={.025} color={palette.orange}/></>}
 </group>;
}