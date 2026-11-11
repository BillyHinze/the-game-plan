import {useThree} from '@react-three/fiber';
import {smooth,type V3} from '../animations/math';
export function FilmCamera({kind,p,t}:{kind:string;p:number;t:number}){
 const {camera}=useThree();let from:V3=[.35,2.1,6.4],to:V3=[0,1.3,0],zoom=.28;
 if(kind==='clock'){from=[-2.6,3.35,.35];to=[-2.6,3.35,-3.1];zoom=.45;}
 if(kind==='homework'){from=[1.5,2.3,5.5];to=[0,1.25,.1];zoom=.45;}
 if(kind==='overwhelmed'){from=[.1,2.2,4.7];to=[0,1.6,0];zoom=.65;}
 if(kind==='ball-roll'){from=[.3,.7,3.5];to=[0,.25,0];zoom=.3;}
 if(kind==='catch-idea'){from=[.2,1.95,5.3];to=[0,1.5,0];zoom=.55;}
 if(['future-game','junior-practice','drive','final-drive'].includes(kind)){
 const x=kind==='final-drive'?-1.7+p*2:kind==='drive'?-1.2+p*1.5:-.6;
 from=[x-2.2,2.5,7];to=[x+.3,1.4,0];zoom=.4;}
 if(['future-mates','junior-arrival','mates','purpose','final-team'].includes(kind)){from=[-.2,2.1,8.1];to=[0,1.25,-.1];zoom=kind==='final-team'?.8:.35;}
 if(kind==='age-gate'){from=[.1,2.1,7.1];to=[0,1.6,0];zoom=.35;}
 if(['pathway','school-walk'].includes(kind)){from=[.3,2.1,7.5];to=[.15,1.3,-p*.4];zoom=.3;}
 if(['calendar','replan','budget','costs'].includes(kind)){from=[0,2.4,5.9];to=[0,1.5,0];zoom=.4;}
 if(kind==='driveway-dribble'){from=[-1.4,1.9,5.8];to=[0,1.3,0];zoom=.35;}
 if(kind==='kit'){from=[1.2,1.45,5.5];to=[.1,.85,0];zoom=.3;}
 if(kind==='pass'){from=[-.2,2,9.3];to=[0,1.35,0];zoom=.2;}
 if(['score','final-score'].includes(kind)){from=[-1,2.85,7.4];to=[2,1.9,0];zoom=.35;}
 if(kind==='decompress'){from=[.1,2.1,5.6];to=[0,1.3,0];zoom=-.45;}
 if(kind==='confidence'){from=[.7,1.5,5.3];to=[0,1.45,0];zoom=.35;}
 if(kind==='jog'){from=[1.2,2.2,6.2-t*.8];to=[0,1.3,-t*.8];zoom=.1;}
 if(kind==='rope'){from=[.1,2,7.1];to=[0,1.3,0];zoom=.2;}
 if(kind==='water'){from=[.2,1.95,4.7];to=[0,1.55,0];zoom=.25;}
 if(kind==='bus'){from=[1,2,7.2];to=[0,1.35,-.5];zoom=.3;}
 if(kind==='tired'){from=[.4,1.8,4.8];to=[0,1.3,0];zoom=.2;}
 if(kind==='carpool'){from=[.3,2.8,9.5];to=[0,1.2,-1];zoom=.25;}
 if(kind==='track'){from=[.7,2,5.7];to=[0,1.4,0];zoom=.2;}
 if(kind==='progress'){from=[-.5,2.3,6];to=[0,1.4,0];zoom=.2;}
 if(kind==='pack'){from=[1,2.3,6];to=[0,1.2,0];zoom=.45;}
 const e=smooth(p);camera.position.set(from[0]+.12*e,from[1],from[2]-zoom*e);camera.lookAt(...to);camera.updateMatrixWorld();return null;
}
