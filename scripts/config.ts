import fs from 'node:fs/promises';
import {existsSync} from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';
import {defaultProps,scaledBoundaries,frameBoundaries,type VideoProps} from '../src/data/timeline';
export const mode=process.env.RENDER_MODE||'final';
export const resolution=process.env.RESOLUTION||'1080p';
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
export const inputProps:VideoProps={...defaultProps,durationSeconds,boundaries,voiceover,captions:process.env.CAPTIONS!=='false',fps,width:resolution==='1080p'?1080:720,height:resolution==='1080p'?1920:1280};
await fs.mkdir('out/qa',{recursive:true});
await fs.writeFile('out/render-props.json',JSON.stringify(inputProps,null,2));
