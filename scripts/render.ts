// This script is executed on a GitHub-hosted runner, never on the school laptop.
import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {bundle} from '@remotion/bundler';
import {ensureBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {defaultProps,scaledBoundaries,frameBoundaries,type VideoProps} from '../src/data/timeline';
const mode=process.env.RENDER_MODE||'final';
const resolution=process.env.RESOLUTION||'720p';
const fps=mode==='preview'?Number(process.env.PREVIEW_FPS||15):30;
const includeVoice=process.env.VOICEOVER||'auto';
const audioPath='public/audio/voiceover.mp3';
if(includeVoice==='yes'&&!existsSync(audioPath)) throw new Error('Voiceover was requested. Upload public/audio/voiceover.mp3 using GitHub Add file → Upload files, or choose voiceover=no.');
const voiceover=includeVoice!=='no'&&existsSync(audioPath);
let durationSeconds=130;
let audioDuration:number|null=null;
if(voiceover) {
 const data=JSON.parse(execFileSync('ffprobe',['-v','error','-show_entries','format=duration','-of','json',audioPath],{encoding:'utf8'}));
 audioDuration=Number(data.format.duration);
 if(!Number.isFinite(audioDuration)||audioDuration<120||audioDuration>180) throw new Error('Record the complete narration in 120–180 seconds. Uploaded audio duration: '+audioDuration+'. No audio is truncated or sped up automatically.');
 durationSeconds=Math.min(180,Math.ceil(audioDuration+1));
}
let boundaries=scaledBoundaries(durationSeconds);
if(existsSync('public/audio/timing.json')) {
 const timing=JSON.parse(await fs.readFile('public/audio/timing.json','utf8'));
 if(!Array.isArray(timing)||timing.length!==11||timing[0]!==0||timing.some((n:unknown)=>typeof n!=='number'||!Number.isFinite(n))||timing.some((n:number,i:number)=>i>0&&n<=timing[i-1])) throw new Error('timing.json must contain 11 increasing scene boundaries in seconds, starting at 0.');
 durationSeconds=timing[10];boundaries=timing;
 if(durationSeconds<120||durationSeconds>180) throw new Error('timing.json must end between 120 and 180 seconds.');
 if(audioDuration!==null&&audioDuration>durationSeconds) throw new Error('Audio exceeds timing.json end. Extend the last boundary or record a shorter take.');
}
const inputProps:VideoProps={...defaultProps,durationSeconds,boundaries,voiceover,captions:process.env.CAPTIONS!=='false',fps,width:resolution==='1080p'?1080:720,height:resolution==='1080p'?1920:1280};
await fs.mkdir('out/qa',{recursive:true});
await fs.writeFile('out/render-props.json',JSON.stringify(inputProps,null,2));
await ensureBrowser();
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts'),onProgress:(n)=>{if(n===100)console.log('Bundle ready');}});
const requested=process.env.GL_BACKEND||'swangle';
type GL='swangle'|'angle'|'swiftshader';
const backends=[...new Set([requested as GL,'swangle' as GL,'swiftshader' as GL])];
let selected:GL|null=null;
let composition:Awaited<ReturnType<typeof selectComposition>>|null=null;
for(const backend of backends) {
 try {
  const options={serveUrl,id:'TheGamePlan',inputProps,chromiumOptions:{gl:backend}};
  composition=await selectComposition(options);
  await renderStill({serveUrl,composition,inputProps,frame:0,output:'out/qa/00-beginning.png',imageFormat:'png',chromiumOptions:{gl:backend}});
  selected=backend;console.log('WebGL backend selected: '+backend);break;
 } catch(error) {console.warn('WebGL test failed for '+backend+': '+String(error));}
}
if(!selected||!composition) throw new Error('All Chromium WebGL backends failed. Inspect the logs; choose swangle and 720p in Run workflow.');
const common={serveUrl,composition,inputProps,chromiumOptions:{gl:selected},timeoutInMilliseconds:120000};
const bounds=frameBoundaries(boundaries,fps);
const samples=[0,...Array.from({length:10},(_,i)=>Math.floor((bounds[i]+bounds[i+1])/2)),composition.durationInFrames-1];
if(process.env.RENDER_PHASE!=='export') {
for(let i=1;i<samples.length;i++) {
 await renderStill({...common,frame:samples[i],output:'out/qa/'+String(i).padStart(2,'0')+'-frame-'+samples[i]+'.png',imageFormat:'png'});
}
const shotFrame=Math.round((boundaries[9]+1.3+1.25)*fps);
await renderStill({...common,frame:Math.min(shotFrame,composition.durationInFrames-1),output:'out/qa/13-hoop-crossing.png',imageFormat:'png'});
await renderStill({...common,frame:samples[5],output:'out/qa/14-determinism-repeat.png',imageFormat:'png'});
await fs.writeFile('out/qa/samples.json',JSON.stringify({samples,shotFrame,repeatOf:samples[5]},null,2));
const smokeStart=bounds[4];
await renderMedia({...common,codec:'h264',pixelFormat:'yuv420p',audioCodec:'aac',concurrency:1,crf:24,frameRange:[smokeStart,smokeStart+fps*2-1],outputLocation:'out/smoke-test.mp4'});
console.log('Two-second 3D smoke render passed.');
}
if(process.env.RENDER_PHASE==='qa') process.exit(0);
const output='out/the-game-plan-'+mode+'-'+resolution+'.mp4';
let lastProgress=-1;
await renderMedia({...common,codec:'h264',pixelFormat:'yuv420p',audioCodec:'aac',audioBitrate:'192k',concurrency:1,crf:mode==='preview'?25:19,
 frameRange:mode==='preview'?[bounds[4],Math.min(bounds[4]+fps*8-1,composition.durationInFrames-1)]:undefined,
 outputLocation:output,onProgress:({progress})=>{const p=Math.floor(progress*10)*10;if(p!==lastProgress){lastProgress=p;console.log('Render '+p+'%');}}});
await fs.writeFile('out/render-report.json',JSON.stringify({mode,resolution,fps,backend:selected,output,voiceover,audioDuration,durationSeconds,sceneCount:10,samples},null,2));
console.log('Completed '+output);
