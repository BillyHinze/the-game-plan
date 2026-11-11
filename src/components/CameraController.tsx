import {useThree} from '@react-three/fiber';
import {Vector3} from 'three';
import {lerp3,smooth,type V3} from '../animations/math';
import {shotPosition} from '../animations/basketball';
type Key={p:V3;target:V3;fov:number};
export function cameraAt(scene:number,t:number,duration:number):Key{
 const q=t/duration,cut=Math.floor(t/3.6)%3,m=smooth((t%3.6)/3.6);
 if(scene===0||(scene===3&&q<.33)||(scene===7&&q<.4)||(scene===8&&q<.45)){
  if(cut===1)return {p:lerp3([.5,2.05,3.1],[.15,2.1,2.65],m),target:[0,1.65,.2],fov:43};
  return {p:lerp3([1.05,2.3,5],[.65,2.05,4.4],m),target:[0,1.25,.1],fov:43};
 }
 if(scene===4){
  const c=t%9;
  if(c<3)return {p:lerp3([-1,2.3,5.5],[.2,2.2,5.2],smooth(c/3)),target:[-.8,1.25,.3],fov:48};
  if(c<6)return {p:[2.5,2.9,7.4],target:[.7,1.6,0],fov:47};
  const ball=shotPosition(c-4);
  return {p:[6,3.9,6.8],target:[ball[0]*.65,Math.max(1.2,ball[1]*.65),0],fov:49};
 }
 if(scene===9){const s=t%7;
  if(t<duration-3&&s>1.2&&s<3.25){const ball=shotPosition(s);return {p:[ball[0]+1.4,ball[1]+1.1,5.2],target:[ball[0]*.85,Math.max(1.1,ball[1]-.15),0],fov:45};}
  return {p:[.7+Math.sin(t*.25)*.25,2.25,5.7-m*.35],target:[0,1.3,-.2],fov:46};
 }
 if(scene===5)return {p:[.1+Math.sin(t*.2)*.3,2,5.3],target:[0,1.45,0],fov:46};
 if(scene===2&&cut===1)return {p:[.35,2.15,4.4-m*.35],target:[0,1.65,.5],fov:44};
 if(scene===7)return {p:[.5,2.1,4.7],target:[0,1.25,0],fov:44};
 return {p:[.45+Math.sin(t*.3)*.35,2.3,6.1-m*.4],target:[0,1.2,0],fov:46};
}
export function CameraController({scene,t,duration}:{scene:number;t:number;duration:number}){
 const {camera}=useThree(),k=cameraAt(scene,t,duration);camera.position.set(...k.p);camera.lookAt(new Vector3(...k.target));if('fov'in camera){camera.fov=k.fov;camera.updateProjectionMatrix();}return null;
}
