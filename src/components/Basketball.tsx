import {palette,Ring} from './Geometry';
import type {V3} from '../animations/math';
import {BALL_RADIUS} from '../animations/basketball';
export function Basketball({position,t=0}:{position:V3;t?:number}) {
 return <group position={position} rotation={[t*2,0,t*.6]}>
 <mesh><sphereGeometry args={[BALL_RADIUS,24,16]}/><meshStandardMaterial color={palette.orange} roughness={.9}/></mesh>
 <Ring at={[0,0,0]} r={BALL_RADIUS+.001} tube={.008} color={palette.ink} rotation={[0,0,0]}/>
 <Ring at={[0,0,0]} r={BALL_RADIUS+.001} tube={.008} color={palette.ink} rotation={[0,Math.PI/2,0]}/>
 <Ring at={[0,0,0]} r={BALL_RADIUS+.001} tube={.008} color={palette.ink}/>
 </group>;
}
