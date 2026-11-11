import {BasketballCourt} from '../components/BasketballCourt';
import {Basketball} from '../components/Basketball';
import {dribbleHeight} from '../animations/basketball';
import {Stickman} from '../components/Stickman';
import {smooth} from '../animations/math';
import type {SceneProps} from './types';
export function Scene02({t}:SceneProps) {
 return <group><BasketballCourt/><Stickman t={t} action={t<2.5?'walk':'dribble'} rotation={Math.PI/2*(1-smooth((t-2.1)/.4))} position={[-2+Math.min(t,2.5)*.85,0,.5]}/>
 <Basketball t={t} position={t<2.5?[.65,.17,.8]:[.695,dribbleHeight(t),.78]}/>
 </group>;
}