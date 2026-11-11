import {BasketballCourt} from '../components/BasketballCourt';
import {Stickman} from '../components/Stickman';
import {Basketball} from '../components/Basketball';
import {dribbleHeight} from '../animations/basketball';
import {Box,palette} from '../components/Geometry';
import {smooth} from '../animations/math';
import type {SceneProps} from './types';
export function Scene03({t,duration}:SceneProps) {
 const progress=smooth((t-duration*.6)/(duration*.25));
 return <group><BasketballCourt/>
 <Box at={[-2,.05,1]} size={[2.8,.1,2.2]} color="#9ac7b3"/>
 <Box at={[2,.05,1]} size={[2.8,.1,2.2]} color="#b4c5dd"/>
 <Stickman t={t} action={progress>0&&progress<1?'walk':'dribble'} rotation={progress>0&&progress<1?Math.PI/2:0} position={[-2+progress*4,.1,1]}/>
 <Stickman t={t} action="gesture" position={[-3,.1,0]} color={palette.orange}/>
 <Stickman t={t+.5} action="gesture" position={[3,.1,.5]} color={palette.blue}/>
 <Basketball t={t} position={[-1.43+progress*4,dribbleHeight(t)+.1,1.28]}/>
 </group>;
}