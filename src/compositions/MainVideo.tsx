import {AbsoluteFill,Audio,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {PortraitStory} from '../scenes/PortraitStory';
import {CameraController} from '../components/CameraController';
import {Overlay} from '../components/Overlay';
import {frameBoundaries,locateScene,type VideoProps} from '../data/timeline';
export function MainVideo(props:VideoProps){
 const frame=useCurrentFrame(),{fps,width,height,durationInFrames}=useVideoConfig();
 const b=frameBoundaries(props.boundaries,fps),scene=locateScene(frame,b),t=(frame-b[scene])/fps,duration=(b[scene+1]-b[scene])/fps;
 return <AbsoluteFill style={{background:'#7bc9f1'}}>
 <ThreeCanvas width={width} height={height} camera={{position:[.5,2.3,6],fov:46}} gl={{antialias:true,alpha:false,powerPreference:'low-power'}} dpr={1}>
 <ambientLight intensity={1.15}/><directionalLight position={[-3,8,5]} intensity={1.9}/><directionalLight position={[4,3,-3]} intensity={.5}/>
 <CameraController scene={scene} t={t} duration={duration}/><PortraitStory scene={scene} t={t} duration={duration}/>
 </ThreeCanvas>
 <div style={{position:'absolute',width:1080,height:1920,transform:`scale(${width/1080})`,transformOrigin:'top left',fontFamily:'Arial, Helvetica, sans-serif'}}>
 <Overlay scene={scene} t={t} duration={duration} captions={props.captions} globalProgress={(frame+1)/durationInFrames}/>
 </div>
 {props.voiceover&&<Audio src={staticFile('audio/voiceover.mp3')}/>}
 </AbsoluteFill>;
}
