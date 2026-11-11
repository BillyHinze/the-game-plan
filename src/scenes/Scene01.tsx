import {Stickman} from '../components/Stickman';
import {Desk,Clock} from '../components/Props';
import {Box} from '../components/Geometry';
import type {SceneProps} from './types';
export function Scene01({t}:SceneProps) {
 return <group><Box at={[0,-.08,0]} size={[7,.14,5]} color="#ddd9cf"/>
 <Desk papers={Math.min(21,3+Math.floor(t*2))}/><Stickman t={t} action={t<4?'sit':'tired'}/><Clock t={t}/>
 {Array.from({length:4},(_,i)=><Box key={i} at={[-1.6,.15+i*.28,-.1]} size={[.65,.24,.7]} color={i%2?'#567fbc':'#d79d78'}/>)}
 </group>;
}