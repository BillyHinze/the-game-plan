import {Stickman} from '../components/Stickman';
import {Desk,Car} from '../components/Props';
import {Box,palette} from '../components/Geometry';
import type {SceneProps} from './types';
export function Scene08({t}:SceneProps) {
 return <group>
 <Box at={[-1.6,-.1,0]} size={[3,.18,4.5]} color="#ead5c5"/>
 <Box at={[1.7,-.1,0]} size={[3,.18,4.5]} color="#d4dfdc"/>
 <group position={[-1.6,0,0]}><Desk papers={12}/><Stickman t={t} action="deadline"/></group>
 <group position={[1.6,0,-1]}><Car x={Math.sin(t*.8)*.12}/></group>
 <Stickman t={t} action="tired" position={[1.7,0,1]} color={palette.blue}/>
 </group>;
}