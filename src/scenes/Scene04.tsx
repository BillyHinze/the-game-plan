import {CalendarFloor} from '../components/Props';
import {Stickman} from '../components/Stickman';
import {Basketball} from '../components/Basketball';
import {dribbleHeight} from '../animations/basketball';
import type {SceneProps} from './types';
export function Scene04({t}:SceneProps) {
 return <group><CalendarFloor t={t}/>
 <Stickman t={t} action={t%6<3?'walk':'dribble'} position={[-1.8+Math.min(t%6,3)*.75,.07,-.6]} rotation={t%6<3?Math.PI/2:0}/>
 {t%6>=3&&<Basketball t={t} position={[1.02,dribbleHeight(t)+.07,-.32]}/>}
 <Stickman t={t} action="gesture" position={[2.6,0,.7]} color="#567fbc"/>
 </group>;
}