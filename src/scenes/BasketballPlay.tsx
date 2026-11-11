import {BasketballCourt} from '../components/BasketballCourt';
import {Stickman} from '../components/Stickman';
import {Basketball} from '../components/Basketball';
import {palette} from '../components/Geometry';
import {shotPosition,dribbleHeight,passPosition,RELEASE} from '../animations/basketball';
import {clamp,lerp3,smooth,type V3} from '../animations/math';
export function Shot({t}:{t:number}) {
 return <group>
 <Stickman t={t<2.6?Math.min(t,RELEASE):t} action={t<2.6?'shoot':'celebrate'} position={[-.2,0,-.45]}/>
 <Basketball position={shotPosition(t)} t={t}/>
 </group>;
}
export function BasketballPlay({t}:{t:number}) {
 const c=t%9;
 const a:V3=[-2,0,.4],b:V3=[-.2,0,-.45];
 const ball=c<2?[a[0]+.57,dribbleHeight(t),a[2]+.28] as V3:c<3?passPosition(c-2,[-1.43,1.35,.68],[-.2,1.35,-.17]):c<4?lerp3([-.2,1.35,-.17],[-.2,1.8,0],smooth(c-3)):shotPosition(c-4);
 return <group>
 <BasketballCourt/>
 {c<4?<><Stickman t={t} action={c<2?'dribble':'pass'} position={a}/>
 <Stickman t={t} action={c<3?'gesture':'pass'} position={b}/></>:<Stickman t={c<6.6?Math.min(c-4,RELEASE):c-4} action={c<6.6?'shoot':'celebrate'} position={[-.2,0,-.45]}/>}
 <Basketball position={ball} t={t}/>
 <Stickman t={t} action="run" rotation={Math.atan2(2.8*Math.cos(t*.72),-1.9*Math.sin(t*.72))} position={[2.8*Math.sin(t*.72),0,1.9*Math.cos(t*.72)]} color={palette.blue}/>
 <Stickman t={t+.31} action="run" rotation={Math.atan2(-2.8*Math.cos(t*.72),1.9*Math.sin(t*.72))} position={[-2.8*Math.sin(t*.72),0,-1.9*Math.cos(t*.72)]} color={palette.orange}/>
 </group>;
}
