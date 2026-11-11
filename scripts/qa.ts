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
const names=(await fs.readdir('out/qa')).filter(n=>n.endsWith('.png')).sort();
const original=names.find(n=>n.startsWith('05-'))!;
const a=await sharp('out/qa/'+original).raw().toBuffer(),b=await sharp('out/qa/14-determinism-repeat.png').raw().toBuffer();
assert(a.equals(b),'Same frame rendered twice produced different pixels');
for(const name of names) {const stats=await sharp('out/qa/'+name).stats();assert(stats.channels.some(c=>c.stdev>10),'Nearly blank QA image: '+name);}
const thumbs=await Promise.all(names.filter(n=>!n.includes('repeat')).map(async(n,i)=>({input:await sharp('out/qa/'+n).resize(640,360).png().toBuffer(),left:(i%3)*640,top:Math.floor(i/3)*360})));
await sharp({create:{width:1920,height:Math.ceil(thumbs.length/3)*360,channels:3,background:'#f4f1e8'}}).composite(thumbs).png().toFile('out/qa/contact-sheet.png');
await fs.writeFile('out/qa/verification.json',JSON.stringify({duration,codec:video.codec_name,width:video.width,height:video.height,blackIntervals:0,deterministicFramePixels:true,representativeImages:names.length,note:'Automated checks do not replace visual review of motion, captions and composition.'},null,2));
console.log('PASS: H.264 dimensions, duration, audio mode, video decode, no black intervals, repeated frame pixels and '+names.length+' QA stills.');
