export const DEFAULT_SECONDS = 130;
// Timing follows the supplied narration: the community explanation needs more time
// than the short idea beat. Last frame is exclusive. All scenes share one boundary map.
export const DEFAULT_BOUNDARIES = [0, 10, 14, 38, 54, 61, 73, 89, 96, 114, 130];
export const sceneNames = ['School pressure','The idea','Community pathway','Weekly routine','Physical fitness','Mind, mood & mates','Purpose & daily movement','Realistic challenges','Solutions & evaluation','Healthy habits'];
export type VideoProps = {durationSeconds:number; boundaries:number[]; voiceover:boolean; captions:boolean; fps:number; width:number; height:number};
export const defaultProps:VideoProps = {durationSeconds:130, boundaries:DEFAULT_BOUNDARIES,voiceover:false,captions:true,fps:30,width:1080,height:1920};
export const frameBoundaries = (seconds:number[],fps:number) => seconds.map(s=>Math.round(s*fps));
export function locateScene(frame:number, boundaries:number[]) {
 const i = Math.max(0, boundaries.findIndex((end,index)=>index>0 && frame<end)-1);
 return i;
}
export function scaledBoundaries(duration:number) {return DEFAULT_BOUNDARIES.map(n=>n/DEFAULT_SECONDS*duration);}
