import fs from 'node:fs/promises';
import {execFileSync,spawnSync} from 'node:child_process';
import assert from 'node:assert/strict';
import sharp from 'sharp';
import {shots} from '../src/data/shots';
const report=JSON.parse(await fs.readFile('out/render-report.json','utf8')),props=JSON.parse(await fs.readFile('out/render-props.json','utf8'));
const probe=JSON.parse(execFileSync('ffprobe',['-v','error','-show_streams','-show_format','-of','json',report.output],{encoding:'utf8'}));
const v=probe.streams.find((s:{codec_type:string})=>s.codec_type==='video'),a=probe.streams.find((s:{codec_type:string})=>s.codec_type==='audio');
assert.equal(v.codec_name,'h264');assert.equal(v.width,props.width);assert.equal(v.height,props.height);assert.equal(v.width/v.height,9/16);
assert.equal(a.codec_name,'aac');assert.equal(Number(v.nb_frames),Math.round(report.durationSeconds*props.fps));assert(Math.abs(Number(probe.format.duration)-report.durationSeconds)<.12);
const scan=spawnSync('ffmpeg',['-hide_banner','-i',report.output,'-vf','blackdetect=d=0.1:pix_th=0.04:pic_th=0.98,freezedetect=n=-60dB:d=0.7','-af','astats=metadata=1:reset=0','-f','null','-'],{encoding:'utf8',maxBuffer:8*1024*1024});
assert.equal(scan.status,0);assert(!scan.stderr.includes('black_start:'));assert(!scan.stderr.includes('freeze_start:'),'Encoded film contains a frozen interval');
const peaks=[...scan.stderr.matchAll(/Peak level dB: (-?[\d.]+)/g)].map(m=>Number(m[1]));assert(peaks.length>0&&Math.max(...peaks)<0&&Math.max(...peaks)>-30,'Missing or clipping audio');
const original=await sharp('out/qa/rim-crossing.png').raw().toBuffer(),repeat=await sharp('out/qa/rim-repeat.png').raw().toBuffer();assert(original.equals(repeat),'Frame rendering is not deterministic');
const times=report.mode==='preview'?[0.2,2,4,6]:[2.7,42.2,54.2,58.3,77.4,82.3,118.3,122.4],panels=[];
for(let row=0;row<times.length;row++){let prev:Buffer|undefined;for(let col=0;col<4;col++){const file='out/qa/motion-'+row+'-'+col+'.jpg';execFileSync('ffmpeg',['-y','-v','error','-ss',String(times[row]+col*.3),'-i',report.output,'-frames:v','1',file]);const raw=await sharp(file).raw().toBuffer();if(prev)assert(!raw.equals(prev),'Motion sample is frozen');prev=raw;panels.push({input:await sharp(file).resize(270,480).toBuffer(),left:col*270,top:row*480});}}
await sharp({create:{width:1080,height:times.length*480,channels:3,background:'#2b2730'}}).composite(panels).jpeg({quality:90}).toFile('out/qa/motion-sequences.jpg');
await fs.writeFile('out/qa/verification.json',JSON.stringify({width:v.width,height:v.height,fps:props.fps,frames:Number(v.nb_frames),duration:Number(probe.format.duration),audio:a.codec_name,peakDb:Math.max(...peaks),shots:shots.length,noBlackIntervals:true,noFrozenIntervals:true,deterministicPixels:true,motionSequences:times.length},null,2));
console.log('PASS: complete portrait H.264/AAC, exact frame count, audible original soundtrack, no clipping, no black/frozen intervals, deterministic frames.');
