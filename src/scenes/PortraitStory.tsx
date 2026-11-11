import {StudyRoom,Outdoor,Sign} from '../components/World';
import {Desk,Clock,Car} from '../components/Props';
import {Stickman} from '../components/Stickman';
import {BasketballCourt} from '../components/BasketballCourt';
import {Basketball} from '../components/Basketball';
import {BasketballPlay,Shot} from './BasketballPlay';
import {dribbleHeight} from '../animations/basketball';
import {smooth,type V3} from '../animations/math';
import {Beam,Box,palette} from '../components/Geometry';
export function PortraitStory({scene,t,duration}:{scene:number;t:number;duration:number}){
 const p=t/duration;
 if(scene===0)return <><StudyRoom t={t} stress/><Desk papers={3+Math.min(20,Math.floor(t*2))}/><Clock t={t}/><Stickman t={t} action={t<3?'sit':'deadline'}/></>;
 if(scene===1)return <><Outdoor t={t}/><BasketballCourt/><Stickman t={t} action="dribble" position={[0,0,0]}/><Basketball t={t} position={[.57,dribbleHeight(t),.28]}/><Stickman t={t} action="run" position={[-1.5,0,-1.5+Math.sin(t)*.6]} color="#e99435"/></>;
 if(scene===2)return <><Outdoor t={t} sunset={p>.6}/><BasketballCourt/><Sign text={p<.6?'JUNIOR BASKETBALL':'ADULT SOCIAL • 18+'} position={[0,3.6,-3.5]} width={5} height={.75}/>
 <Stickman t={t} action="dribble" position={[0,0,.5]}/><Basketball t={t} position={[.57,dribbleHeight(t),.78]}/>
 <Stickman t={t+.3} action="gesture" position={[-1.45,0,-.25]} color="#eea13e"/><Stickman t={t+.4} action="celebrate" position={[1.45,0,-.6]} color="#7568be"/></>;
 if(scene===3){if(p<.33)return <><StudyRoom t={t}/><Desk papers={3}/><Stickman t={t} action="sit"/></>;
 return <><Outdoor t={t}/><BasketballCourt/><Stickman t={t} action="dribble"/><Basketball t={t} position={[.57,dribbleHeight(t),.28]}/><Stickman t={t} action="walk" position={[-1.5,0,-1+Math.sin(t*.5)]} color="#eea13e"/></>;}
 if(scene===4)return <><Outdoor t={t}/><BasketballPlay t={t}/></>;
 if(scene===5){const reach=smooth((t%4-1)/.6)*(1-smooth((t%4-2.4)/.6)),y=1.3+reach*.85;
 const leftHands:[V3,V3]=[[-.4,1.1,.03],[.6,y,.25]],rightHands:[V3,V3]=[[-.6,y,.25],[.4,1.1,.03]];
 return <><Outdoor t={t} sunset/><BasketballCourt compact/><Stickman t={t} action={t<2?'deadline':'celebrate'} position={[-.6,0,0]} handTargets={t>2?leftHands:undefined}/><Stickman t={t+.2} action="celebrate" position={[.6,0,0]} color="#eea13e" handTargets={t>2?rightHands:undefined}/><Stickman t={t} action="jump" position={[0,0,-1.8]} color="#7568be"/></>;}
 if(scene===6)return <><Outdoor t={t} sunset/><BasketballCourt/><Stickman t={t} action={p<.4?'celebrate':p<.7?'walk':'jump'}/>
 <Stickman t={t+.5} action="celebrate" position={[-1.4,0,-.7]} color="#eea13e"/><Stickman t={t+.9} action="celebrate" position={[1.4,0,-.7]} color="#7568be"/></>;
 if(scene===7){if(p<.4)return <><StudyRoom t={t} stress/><Desk papers={22}/><Stickman t={t} action="deadline"/></>;
 return <><Outdoor t={t} sunset/><Box at={[0,-.03,0]} size={[40,.08,10]} color="#817b88"/><group position={[1.7,0,-1.5]}><Car/></group><Stickman t={t} action="tired"/><Sign text={p<.7?'HOW WILL I GET THERE?':'FEES + EQUIPMENT'} position={[0,3.5,-4]} width={4} height={.7}/></>;}
 if(scene===8){if(p<.45)return <><StudyRoom t={t}/><Desk papers={3}/><Stickman t={t} action="gesture"/><Sign text="STUDY • PLAY • REST" position={[0,3.35,-2.9]} width={3} height={.5}/></>;
 return <><Outdoor t={t}/><BasketballCourt/><Stickman t={t} action="dribble"/><Basketball t={t} position={[.57,dribbleHeight(t),.28]}/><Stickman t={t} action="gesture" position={[-1.4,0,-.6]} color="#eea13e"/></>;}
 const shotT=t>duration-3?5+(t-duration+3)*.4:t%7;
 return <><Outdoor t={t} sunset/><BasketballCourt/><Shot t={shotT}/><Stickman t={t} action={shotT>2.6?'celebrate':'gesture'} position={[-1.3,0,-1]} color="#eea13e"/><Stickman t={t+.3} action={shotT>2.6?'jump':'idle'} position={[1.3,0,-1]} color="#7568be"/></>;
}
