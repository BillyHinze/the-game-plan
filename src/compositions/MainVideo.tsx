import {AbsoluteFill,Audio,staticFile,useCurrentFrame,useVideoConfig} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {scenes} from '../scenes';
import {CameraController} from '../components/CameraController';
import {Overlay} from '../components/Overlay';
import {palette} from '../components/Geometry';
import {frameBoundaries,locateScene,type VideoProps} from '../data/timeline';
export function MainVideo(props:VideoProps) {
 const frame=useCurrentFrame(),{fps,width,height,durationInFrames}=useVideoConfig();
 const bounds=frameBoundaries(props.boundaries,fps),scene=locateScene(frame,bounds);
 const t=(frame-bounds[scene])/fps,duration=(bounds[scene+1]-bounds[scene])/fps;
 const Scene=scenes[scene], scale=width/1920;
 const stageWidth=Math.round(width*.72);
 return <AbsoluteFill style={{background:palette.cream}}>
  <div style={{position:'absolute',left:width*.28,top:height*.06,width:stageWidth,height:height*.82}}>
   <ThreeCanvas width={stageWidth} height={Math.round(height*.82)} camera={{position:[5.7,4.4,8.8],fov:43}} gl={{antialias:true,alpha:true,powerPreference:'low-power'}} dpr={1}>
    <ambientLight intensity={1.5}/><directionalLight position={[3,7,5]} intensity={2.2}/><directionalLight position={[-4,3,-2]} intensity={.8}/>
    <CameraController scene={scene} t={t} duration={duration}/>
    <Scene t={t} duration={duration}/>
   </ThreeCanvas>
  </div>
  <div style={{position:'absolute',width:1920,height:1080,transform:`scale(${scale})`,transformOrigin:'top left',fontFamily:'Arial, Helvetica, sans-serif',color:palette.ink}}>
   <Overlay scene={scene} t={t} duration={duration} captions={props.captions} globalProgress={(frame+1)/durationInFrames}/>
  </div>
  {props.voiceover&&<Audio src={staticFile('audio/voiceover.mp3')} volume={1}/>}
 </AbsoluteFill>;
}
