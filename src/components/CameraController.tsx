import {useThree} from '@react-three/fiber';
import {Vector3} from 'three';
import {lerp3,smooth,type V3} from '../animations/math';
import {shotPosition} from '../animations/basketball';
type Key={p:V3;target:V3;fov:number};
export function cameraAt(scene:number,t:number,duration:number):Key {
 const p=smooth(t/duration);
 if(scene===0) return {p:lerp3([4.5,3.1,6.5],[2.8,2.4,4.8],p),target:[0,1.1,0],fov:38};
 if(scene===1) return {p:lerp3([3.6,2.8,7],[6,4.8,8],p),target:[0,1,0],fov:39};
 if(scene===3) return {p:lerp3([5,6.2,8],[4.4,4.8,7.4],p),target:[0,.9,0],fov:43};
 if(scene===7) return {p:[3,3.4,8],target:[0,1,0],fov:40};
 if(scene===9) {
 const shotT=t-duration*.35;
 const w=smooth(shotT/.55)*(1-smooth((shotT-3)/1.1));
 const ball=shotPosition(Math.max(0,shotT));
 const target:V3=lerp3([.15,1,0],[ball[0],Math.max(1.25,ball[1]),ball[2]],w*.75);
 return {p:lerp3([5.7,4.4,8.8],[ball[0]+3.8,4.4,6.8],w*.6),target,fov:43-w*3};
 }
 return {p:[5.7+Math.sin(p*.7)*.8,4.4,8.8-p*.65],target:[.15,1,0],fov:43};
}
export function CameraController({scene,t,duration}:{scene:number;t:number;duration:number}) {
 const {camera}=useThree();const k=cameraAt(scene,t,duration);
 camera.position.set(...k.p);camera.lookAt(new Vector3(...k.target));
 if('fov' in camera) {camera.fov=k.fov;camera.updateProjectionMatrix();}
 return null;
}
