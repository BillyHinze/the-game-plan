import {BasketballCourt} from '../components/BasketballCourt';
import {Shot} from './BasketballPlay';
import {Stickman} from '../components/Stickman';
import {palette} from '../components/Geometry';
import type {SceneProps} from './types';
export function Scene10({t,duration}:SceneProps) {
 // A run-up, a held preparation, one successful shot, then a team celebration.
 const shotTime=t-duration*.35;
 return <group><BasketballCourt/>
 {shotTime<0?<Stickman t={t} action={t<duration*.2?'run':'dribble'} position={[-2+Math.min(t,duration*.2)*1.8/(duration*.2),0,-.45]} rotation={t<duration*.2?Math.PI/2:0}/>:<Shot t={shotTime}/>}
 <Stickman t={t} action={shotTime>2.55?'celebrate':'gesture'} position={[-1.7,0,-1.4]} color={palette.orange}/>
 <Stickman t={t+.3} action={shotTime>2.55?'celebrate':'idle'} position={[1.3,0,1.4]} color={palette.blue}/>
 </group>;
}