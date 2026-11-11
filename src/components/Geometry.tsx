import {Quaternion,Vector3} from 'three';
import type {V3} from '../animations/math';
export const palette={ink:'#172e3e',teal:'#008d86',orange:'#f27a3a',cream:'#f4f1e8',white:'#fffdf7',blue:'#567fbc',red:'#d45a57'};
export function Sphere({at,r=.09,color=palette.ink}:{at:V3;r?:number;color?:string}) {
 return <mesh position={at}><sphereGeometry args={[r,16,12]}/><meshStandardMaterial color={color} roughness={.8}/></mesh>;
}
export function Beam({a,b,r=.065,color=palette.ink}:{a:V3;b:V3;r?:number;color?:string}) {
 const from=new Vector3(...a),to=new Vector3(...b),d=to.clone().sub(from);
 const q=new Quaternion().setFromUnitVectors(new Vector3(0,1,0),d.clone().normalize());
 return <mesh position={from.clone().add(to).multiplyScalar(.5)} quaternion={q}>
 <cylinderGeometry args={[r,r,d.length(),10]}/><meshStandardMaterial color={color} roughness={.8}/></mesh>;
}
export function Box({at,size,color=palette.ink,rotation=0}:{at:V3;size:V3;color?:string;rotation?:number}) {
 return <mesh position={at} rotation={[0,rotation,0]}><boxGeometry args={size}/><meshStandardMaterial color={color} roughness={.85}/></mesh>;
}
export function Ring({at,r,color=palette.white,tube=.025,rotation=[-Math.PI/2,0,0]}:{at:V3;r:number;color?:string;tube?:number;rotation?:V3}) {
 return <mesh position={at} rotation={rotation}><torusGeometry args={[r,tube,6,64]}/><meshStandardMaterial color={color}/></mesh>;
}
