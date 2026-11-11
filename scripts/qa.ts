import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import assert from 'node:assert/strict';
import sharp from 'sharp';
const report=JSON.parse(await fs.readFile('out/render-report.json','utf8'));
const props=JSON.parse(await fs.readFile('out/render-props.json','utf8'));
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',report.output],{encoding:'utf8'}));
const video=probe.streams.find((s:{codec_type:string})=>s.codec_type==='video');
assert.equal(video.codec_name,'h264');assert.equal(video.width,props.width);assert.equal(video.height,props.height);
const duration=Number(probe.format.duration);
if(report.mode==='final') {assert(duration>=120&&duration<=180.1);assert(Math.abs(duration-props.durationSeconds)<.15);}
if(report.voiceover) assert(probe.streams.some((s:{codec_type:string;codec_name:string})=>s.codec_type==='audio'&&s.codec_name==='aac'));
// ffmpeg sends diagnostics to stderr, so run a separate bounded capture.
import {spawnSync} from 'node:child_process';
const blackCheck=spawnSync('ffmpeg',['-hide_banner','-i',report.output,'-vf','blackdetect=d=0.1:pix_th=0.04:pic_th=0.98','-an','-f','null','-'],{encoding:'utf8',maxBuffer:8*1024*1024});
assert.equal(blackCheck.status,0,'Video decode failed');
assert(!blackCheck.stderr.includes('black_start:'),'Unexpected black interval in encoded video');
// Inspect movement from the encoded movie, beyond representative still renders.
const expectedFrames=report.mode==='final'?Math.round(props.durationSeconds*props.fps):Math.min(props.fps*8,Math.round(props.durationSeconds*props.fps));
assert.equal(Number(video.nb_frames),expectedFrames,'Encoded frame count does not match the timeline');
const motionSamples=report.mode==='final'?[props.boundaries[1]+.2,props.boundaries[4]+.2,props.boundaries[5]+2.2,props.boundaries[9]+1.3]:[.2,2,4,6];
const strips=[];
for(let sample=0;sample<motionSamples.length;sample++){
 const thumbs=[];
 for(let frame=0;frame<4;frame++){
  const time=motionSamples[sample]+frame*.35;
  const dest='out/qa/motion-'+sample+'-'+frame+'.png';
  execFileSync('ffmpeg',['-y','-v','error','-ss',String(time),'-i',report.output,'-frames:v','1',dest]);
  const pixels=await sharp(dest).raw().toBuffer();
  if(frame>0)assert(!pixels.equals(strips[strips.length-1]),'Frozen motion sample');
  strips.push(pixels);
  thumbs.push({input:await sharp(dest).resize(270,480).png().toBuffer(),left:frame*270,top:sample*480});
 }
 strips.push(...[]);
 if(sample===0)await fs.writeFile('out/motion-composites.json','[]');
 const current=JSON.parse(await fs.readFile('out/motion-composites.json','utf8'));
 current.push(...thumbs.map(x=>({input:x.input.toString('base64'),left:x.left,top:x.top})));
 await fs.writeFile('out/motion-composites.json',JSON.stringify(current));
}
const composite=JSON.parse(await fs.readFile('out/motion-composites.json','utf8')).map((x:{input:string;left:number;top:number})=>({...x,input:Buffer.from(x.input,'base64')}));
await sharp({create:{width:1080,height:1920,channels:3,background:'#152332'}}).composite(composite).png().toFile('out/qa/motion-sequences.png');
await fs.unlink('out/motion-composites.json');
const names=(await fs.readdir('out/qa')).filter(n=>n.endsWith('.png')&&!n.startsWith('motion-')).sort();
const original=names.find(n=>n.startsWith('05-'))!;
const a=await sharp('out/qa/'+original).raw().toBuffer(),b=await sharp('out/qa/14-determinism-repeat.png').raw().toBuffer();
assert(a.equals(b),'Same frame rendered twice produced different pixels');
for(const name of names) {const stats=await sharp('out/qa/'+name).stats();assert(stats.channels.some(c=>c.stdev>10),'Nearly blank QA image: '+name);}
const thumbs=await Promise.all(names.filter(n=>!n.includes('repeat')).map(async(n,i)=>({input:await sharp('out/qa/'+n).resize(360,640).png().toBuffer(),left:(i%3)*360,top:Math.floor(i/3)*640})));
await sharp({create:{width:1080,height:Math.ceil(thumbs.length/3)*640,channels:3,background:'#f4f1e8'}}).composite(thumbs).png().toFile('out/qa/contact-sheet.png');
await fs.writeFile('out/qa/verification.json',JSON.stringify({duration,codec:video.codec_name,width:video.width,height:video.height,blackIntervals:0,deterministicFramePixels:true,representativeImages:names.length,encodedFrameCount:Number(video.nb_frames),movingEncodedSequences:motionSamples.length,note:'Automated checks do not replace visual review of motion, captions and composition.'},null,2));
console.log('PASS: H.264 dimensions, duration, audio mode, video decode, no black intervals, repeated frame pixels and '+names.length+' QA stills.');
