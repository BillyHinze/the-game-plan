import {Beam,Box,Sphere,palette} from './Geometry';
import {twoBone,sub,clamp,smooth,type V3} from '../animations/math';
import {walkingFoot} from '../animations/walking';
import {runningFoot,runningLift} from '../animations/running';
import {dribbleHeight} from '../animations/basketball';
import {celebrateHands,gestureHand} from '../animations/gestures';
export type Action='idle'|'walk'|'run'|'jump'|'dribble'|'pass'|'shoot'|'celebrate'|'sit'|'tired'|'deadline'|'gesture';
export type StickProps={t:number;action?:Action;position?:V3;rotation?:number;color?:string;phase?:number;handTargets?:[V3,V3]};
function Limb({target,a,b,pole,color,r=.065}:{target:V3;a:number;b:number;pole:V3;color:string;r?:number}) {
 const {joint,end}=twoBone([0,0,0],target,a,b,pole);
 // The elbow/knee is a child of the upper segment origin; the distal bone is
 // anchored at precisely the same joint. All lengths are constrained by IK.
 return <><Beam a={[0,0,0]} b={joint} r={r} color={color}/><Sphere at={[0,0,0]} r={r*1.2} color={color}/>
 <group position={joint}><Sphere at={[0,0,0]} r={r*1.2} color={color}/><Beam a={[0,0,0]} b={sub(end,joint)} r={r*.9} color={color}/><Sphere at={sub(end,joint)} r={r*1.25} color={color}/></group></>;
}
export function Stickman({t,action='idle',position=[0,0,0],rotation=0,color=palette.teal,phase=0,handTargets}:StickProps) {
 const time=t+phase, moving=action==='walk'||action==='run', seated=action==='sit'||action==='tired'||action==='deadline';
 const jump=action==='jump'?Math.sin(Math.PI*clamp((time%2)/1.2))*.65:0;
 const hipY=seated?.68:1.01+(action==='run'?-.17+.035*Math.sin(time*20.26):moving?.025*Math.cos(time*11):.012*Math.sin(time*2.3))+jump;
 const hips:V3=[0,hipY,0], lean=action==='tired'?.25:action==='deadline'?.16:action==='run'?.16:0;
 const neck:V3=[0,.82,lean], head:V3=[0,1.08,lean+.015];
 function hand(side:number):V3 {
  if(handTargets) return sub(handTargets[side<0?0:1],hips);
  if(action==='celebrate') return sub(celebrateHands(time,side),hips);
  if(action==='gesture'&&side===1) return sub(gestureHand(time,side),hips);
  if(action==='dribble'&&side===1) return [.57,Math.max(.94,dribbleHeight(time)+.17)-hipY,.28];
  if(action==='shoot') {const p=smooth(time/1.3);return [side*.17,.63+.68*p,.45];}
  if(action==='pass') return [side*.16,.35,.28];
  if(seated) return [side*.27,.29,.55];
  if(moving) return [side*.4,.18+ .14*Math.max(0,Math.sin(time*(action==='run'?10.13:5.71)+side*Math.PI/2)),.32*Math.sin(time*(action==='run'?10.13:5.71)+side*Math.PI/2)];
  return [side*.4,.05,.03];
 }
 return <group position={position} rotation={[0,rotation,0]}>
  {/* flattened contact shadow: no real-time shadow-map cost on CPU runners */}
  <mesh rotation={[-Math.PI/2,0,0]} position={[0,.012,0]} scale={[.65,.38,1]}><circleGeometry args={[.5,32]}/><meshBasicMaterial color={palette.ink} transparent opacity={.13}/></mesh>
  <group position={hips}>
   <Beam a={[0,0,0]} b={[0,.72,lean]} r={.12} color={color}/>
   <Beam a={[-.26,.7,lean]} b={[.26,.7,lean]} r={.085} color={color}/>
   <Beam a={[0,.72,lean]} b={neck} r={.07}/>
   <group position={head} rotation={[action==='tired'?.3:0,0,action==='deadline'?.12*Math.sin(time*5):0]}>
    <Sphere at={[0,0,0]} r={.245} color={palette.white}/>
    <Sphere at={[-.085,.035,.221]} r={.024}/>
    <Sphere at={[.085,.035,.221]} r={.024}/>
    {action==='tired'?<Beam a={[-.065,-.1,.224]} b={[.065,-.1,.224]} r={.014}/>:<><Beam a={[-.07,-.065,.226]} b={[0,-.092,.239]} r={.012}/><Beam a={[0,-.092,.239]} b={[.07,-.065,.226]} r={.012}/></>}
    <mesh position={[0,.14,0]}><sphereGeometry args={[.249,20,12,0,Math.PI*2,0,.44]}/><meshStandardMaterial color={color}/></mesh>
   </group>
   {[-1,1].map(side=>{
    const shoulder:V3=[side*.27,.7,lean];
    const ankle:V3=seated?[side*.2,.09,.55]:action==='run'?runningFoot(time,side):action==='walk'?walkingFoot(time,side):[side*.2,.09+jump,0];
    const hip:V3=[side*.15,0,0];
    return <group key={side}>
     <group position={shoulder}><Limb target={sub(hand(side),shoulder)} a={.41} b={.41} pole={[side*.25,0,-1]} color={palette.ink}/></group>
     <group position={hip}><Limb target={sub(sub(ankle,hips),hip)} a={.53} b={.53} pole={[0,0,1]} color={palette.ink} r={.075}/></group>
     <Box at={[ankle[0],ankle[1]-hipY,ankle[2]+.075]} size={[.19,.13,.32]} color={color}/>
    </group>;
   })}
  </group>
 </group>;
}
