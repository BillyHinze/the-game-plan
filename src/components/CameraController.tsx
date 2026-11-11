import {useThree} from '@react-three/fiber';
import {Vector3} from 'three';
import {lerp3,smooth,type V3} from '../animations/math';
type Key={p:V3;target:V3;fov:number};
export function cameraAt(scene:number,t:number,duration:number):Key {
 const p=smooth(t/duration);
 if(scene===0) return {p:lerp3([4.5,3.1,6.5],[2.8,2.4,4.8],p),target:[0,1.1,0],fov:38};
 if(scene===1) return {p:lerp3([3.6,2.8,7],[6,4.8,8],p),target:[0,1,0],fov:39};
 if(scene===3) return {p:lerp3([5,6.2,8],[4.4,4.8,7.4],p),target:[0,.9,0],fov:43};
 if(scene===7) return {p:[3,3.4,8],target:[0,1,0],fov:40};
 if(scene===9&&t>duration*.35&&t<duration*.7) {
 const q=smooth((t-duration*.35)/(duration*.35));
 return {p:lerp3([5.8,4.2,8],[4.6,4,5.3],q),target:lerp3([0,1.3,0],[2.1,2.2,0],q),fov:42};
 }
 return {p:[5.7+Math.sin(p*.7)*.8,4.4,8.8-p*.65],target:[.15,1,0],fov:43};
}
export function CameraController({scene,t,duration}:{scene:number;t:number;duration:number}) {
 const {camera}=useThree();const k=cameraAt(scene,t,duration);
 camera.position.set(...k.p);camera.lookAt(new Vector3(...k.target));
 if('fov' in camera) {camera.fov=k.fov;camera.updateProjectionMatrix();}
 return null;
}
