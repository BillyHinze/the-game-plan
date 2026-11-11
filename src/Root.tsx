import {Composition} from 'remotion';
import {MainVideo} from './compositions/MainVideo';
import {defaultProps,type VideoProps} from './data/timeline';
export function Root() {
 return <Composition id="TheGamePlan" component={MainVideo} defaultProps={defaultProps}
 width={1920} height={1080} fps={30} durationInFrames={3900}
 calculateMetadata={({props}:{props:VideoProps})=>({width:props.width,height:props.height,fps:props.fps,durationInFrames:Math.round(props.durationSeconds*props.fps)})}/>;
}
