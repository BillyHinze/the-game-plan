import {Stickman} from '../components/Stickman';
import {CalendarFloor,Car} from '../components/Props';
import {Basketball} from '../components/Basketball';
import type {SceneProps} from './types';
export function Scene09({t}:SceneProps) {
 return <group><CalendarFloor t={t} solving/>
 <Stickman t={t} action="gesture" position={[.8,0,.7]}/>
 <group position={[2.8,0,-1.3]} scale={.65}><Car/></group>
 <Basketball position={[-2,.17,1.5]}/>
 </group>;
}