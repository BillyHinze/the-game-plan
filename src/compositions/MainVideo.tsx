import {useState,useEffect} from 'react';
import {AbsoluteFill,staticFile,useCurrentFrame,useVideoConfig,delayRender,continueRender} from 'remotion';
import {ThreeCanvas} from '@remotion/three';
import {FilmStage} from '../scenes/FilmStage';
import {FilmWorld} from '../components/FilmWorld';
import {FilmCamera} from '../components/FilmCamera';
import {FilmOverlay} from '../components/FilmOverlay';
import {frameBoundaries,locateScene,type VideoProps} from '../data/timeline';
import {shotAt} from '../data/shots';
export function MainVideo(props:VideoProps){
 const frame=useCurrentFrame(),{fps,width,height}=useVideoConfig();
 const [fontHandle]=useState(()=>delayRender('Loading licensed Montserrat font'));
 useEffect(()=>{const face=new FontFace('FilmMontserrat','url('+staticFile('fonts/Montserrat.ttf')+')',{weight:'100 900'});face.load().then(f=>{(document.fonts as FontFaceSet & {add:(font:FontFace)=>FontFaceSet}).add(f);continueRender(fontHandle);}).catch(()=>continueRender(fontHandle));},[fontHandle]);
 const b=frameBoundaries(props.boundaries,fps),scene=locateScene(frame,b),t=(frame-b[scene])/fps,duration=(b[scene+1]-b[scene])/fps,shot=shotAt(scene,t,duration);
 return <AbsoluteFill style={{background:'#d8d8cc'}}>
 <ThreeCanvas width={width} height={height} camera={{position:[0,2,6.4],fov:40}} gl={{antialias:true,alpha:false,powerPreference:'low-power'}} dpr={1}>
 <color attach="background" args={['#a6cee0']}/>
 <ambientLight intensity={1.5}/><directionalLight position={[-3,8,5]} intensity={1.65}/><directionalLight position={[4,3,-3]} intensity={.4}/>
 <FilmCamera kind={shot.kind} p={shot.progress} t={shot.time}/>
 <FilmWorld env={shot.env} t={shot.time} calm={scene>=5}/>
 <FilmStage key={shot.kind} kind={shot.kind} t={shot.time} p={shot.progress}/>
 </ThreeCanvas>
 <div style={{position:'absolute',width:1080,height:1920,transform:'scale('+width/1080+')',transformOrigin:'top left',fontFamily:'FilmMontserrat, Arial, sans-serif'}}>
 <FilmOverlay scene={scene} t={t} duration={duration} shot={shot} captions={props.captions}/>
 </div>
 </AbsoluteFill>;
}
