// Executed only on the cloud runner.
import fs from 'node:fs/promises';
import path from 'node:path';
import {bundle} from '@remotion/bundler';
import {ensureBrowser,selectComposition,renderStill,renderMedia} from '@remotion/renderer';
import {inputProps,mode,resolution} from './config';
import {shots} from '../src/data/shots';
import {DEFAULT_BOUNDARIES} from '../src/data/timeline';
import sharp from 'sharp';
await ensureBrowser();
const serveUrl=await bundle({entryPoint:path.resolve('src/index.ts')});
const backend=(process.env.GL_BACKEND||'swangle') as 'swangle'|'angle'|'swiftshader';
const composition=await selectComposition({serveUrl,id:'TheGamePlan',inputProps,chromiumOptions:{gl:backend}});
const common={serveUrl,composition,inputProps,chromiumOptions:{gl:backend},timeoutInMilliseconds:120000};
const retime=(t:number)=>{const i=Math.max(0,DEFAULT_BOUNDARIES.findIndex((b,j)=>j>0&&t<b)-1);return inputProps.boundaries[i]+(t-DEFAULT_BOUNDARIES[i])/(DEFAULT_BOUNDARIES[i+1]-DEFAULT_BOUNDARIES[i])*(inputProps.boundaries[i+1]-inputProps.boundaries[i]);};
if(process.env.RENDER_PHASE==='qa'){
 const panels=[];
 for(let i=0;i<shots.length;i++){const shot=shots[i],frame=Math.round(retime(shot.start+(shot.end-shot.start)*.48)*inputProps.fps),file='out/qa/'+String(i).padStart(2,'0')+'-'+shot.kind+'.jpg';
 await renderStill({...common,frame,output:file,imageFormat:'jpeg',jpegQuality:88});
 panels.push({input:await sharp(file).resize(240,426).toBuffer(),left:(i%6)*240,top:Math.floor(i/6)*426});
 console.log('QA '+(i+1)+'/'+shots.length+' '+shot.kind);
 }
 await sharp({create:{width:1440,height:Math.ceil(shots.length/6)*426,channels:3,background:'#2d2933'}}).composite(panels).jpeg({quality:90}).toFile('out/qa/contact-sheet.jpg');
 await renderStill({...common,frame:Math.round(retime(59.95)*inputProps.fps),output:'out/qa/rim-crossing.png',imageFormat:'png'});
 await renderStill({...common,frame:0,output:'out/qa/start.png',imageFormat:'png'});
 await renderStill({...common,frame:composition.durationInFrames-1,output:'out/qa/end.png',imageFormat:'png'});
 await renderStill({...common,frame:Math.round(retime(59.95)*inputProps.fps),output:'out/qa/rim-repeat.png',imageFormat:'png'});
 process.exit(0);
}
const idx=Number(process.env.CHUNK_INDEX||0),total=composition.durationInFrames,chunkSize=Math.ceil(total/5);
const first=mode==='preview'?Math.round(retime(54)*inputProps.fps):idx*chunkSize;
const last=mode==='preview'?first+8*inputProps.fps-1:Math.min(total-1,first+chunkSize-1);
await fs.mkdir('chunks',{recursive:true});let lastProgress=-1;
await renderMedia({...common,codec:'h264',pixelFormat:'yuv420p',crf:18,frameRange:[first,last],outputLocation:'chunks/chunk-'+idx+'.mp4',concurrency:1,
 onProgress:({progress})=>{const p=Math.floor(progress*10)*10;if(p!==lastProgress){lastProgress=p;console.log('Chunk '+idx+' '+p+'%');}}});
console.log('Rendered frames '+first+' through '+last+' at '+resolution);
