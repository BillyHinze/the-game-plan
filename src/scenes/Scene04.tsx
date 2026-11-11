import {CalendarFloor} from '../components/Props';
import {Stickman} from '../components/Stickman';
import {Basketball} from '../components/Basketball';
import {dribbleHeight} from '../animations/basketball';
import {smooth} from '../animations/math';
import type {SceneProps} from './types';
export function Scene04({t}:SceneProps) {
 const c=t%12,walking=c<3||(c>=6&&c<9);
 const x=c<3?-1.8+c*.75:c<6?.45:c<9?.45-(c-6)*.75:-1.8;
 const facing=c<3?Math.PI/2*(1-smooth((c-2.6)/.4)):c>=6&&c<9?-Math.PI/2*smooth((c-6)/.3)*(1-smooth((c-8.6)/.4)):0;
 return <group><CalendarFloor t={t}/>
 <Stickman t={t} action={walking?'walk':'dribble'} position={[x,.07,-.6]} rotation={facing}/>
 {!walking&&<Basketball t={t} position={[x+.57,dribbleHeight(t)+.07,-.32]}/>}
 <Stickman t={t} action="gesture" position={[2.6,0,.7]} color="#567fbc"/>
 </group>;
}