// Original procedural Foley and original instrumental. No sampled recordings or TTS.
import fs from 'node:fs/promises';
import {shots} from '../src/data/shots';
import {DEFAULT_BOUNDARIES,type VideoProps} from '../src/data/timeline';
export async function makeSound(props:VideoProps){
 const rate=24000,n=Math.ceil(props.durationSeconds*rate),fx=new Float32Array(n),music=new Float32Array(n);
 let seed=782394;const noise=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/2147483648-1;};
 const retime=(t:number)=>{const i=Math.max(0,DEFAULT_BOUNDARIES.findIndex((b,j)=>j>0&&t<b)-1);return props.boundaries[i]+(t-DEFAULT_BOUNDARIES[i])/(DEFAULT_BOUNDARIES[i+1]-DEFAULT_BOUNDARIES[i])*(props.boundaries[i+1]-props.boundaries[i]);};
 const events:{type:string;time:number}[]=[];
 function add(type:string,time:number,amp=.35){events.push({type,time:retime(time)});const start=Math.round(retime(time)*rate),len=type==='rain'?2.5:type==='swish'?.55:type==='bounce'?.2:type==='tick'?.035:type==='squeak'?.16:type==='cheer'?.7:.19;
 for(let i=0;i<len*rate&&start+i<n;i++){const t=i/rate,q=t/len;let v=0;
 if(type==='bounce')v=(Math.sin(2*Math.PI*(100*t-100*t*t))*Math.exp(-t*26)+noise()*.24*Math.exp(-t*90));
 else if(type==='squeak')v=Math.sin(2*Math.PI*(950*t+1700*t*t))*Math.sin(Math.PI*q)*.35+noise()*.04;
 else if(type==='tick')v=noise()*Math.exp(-q*12);
 else if(type==='step')v=noise()*Math.exp(-q*9)*.5+Math.sin(t*2*Math.PI*90)*Math.exp(-q*12)*.35;
 else if(type==='rain')v=noise()*.1*Math.min(1,t*8,(len-t)*8);
 else if(type==='swish')v=noise()*Math.sin(Math.PI*q)*.36;
 else if(type==='cheer')v=noise()*Math.pow(Math.max(0,Math.sin(t*58)),12)*Math.sin(Math.PI*q)*.45;
 else v=noise()*Math.sin(Math.PI*q)*.25;
 fx[start+i]+=v*amp;}}
 for(const shot of shots){
 const {kind,start,end}=shot;
 if(start>0)add('swish',start,.09);
 if(['future-game','junior-practice','driveway-dribble','drive','final-drive'].includes(kind))for(let t=.31;t<end-start;t+=.62){add('bounce',start+t,.5);if(kind==='drive'||kind==='final-drive')add('squeak',start+t+.15,.24);}
 if(['pathway','school-walk','jog','drive','final-drive'].includes(kind))for(let t=.15;t<end-start;t+=kind==='jog'?.29:.45)add('step',start+t,.24);
 if(kind==='rope')for(let t=.2;t<end-start;t+=1/2.2){add('swish',start+t,.16);add('step',start+t+.1,.28);}
 if(kind==='score'||kind==='final-score'){add('squeak',start+.4,.32);add('swish',start+1.97,.5);add('bounce',start+2.55,.45);add('cheer',start+2.1,.45);}
 if(kind==='clock')for(let t=.1;t<2.5;t+=.4)add('tick',start+t,.35);
 if(kind==='homework'||kind==='pack'||kind==='overwhelmed')for(let t=.1;t<end-start;t+=.43)add('paper',start+t,.22);
 if(kind==='pass'){add('swish',start+.4,.27);add('step',start+1.12,.45);}
 if(kind==='bus')add('rain',start,.7);
 if(kind==='catch-idea')add('step',start+.6,.4);
 }
 // Warm, sparse chord pulse at 100 BPM. Music stays below the voice-over range.
 const roots=[130.8128,110,146.8324,97.9989],beat=.6;
 for(let b=0;b<props.durationSeconds/beat;b++){
 const start=Math.round(b*beat*rate),root=roots[Math.floor(b/8)%4];
 for(let i=0;i<Math.min(rate*1.6,n-start);i++){const t=i/rate,fade=Math.min(1,(start+i)/rate/2,(n-start-i)/rate/3);
 let v=0;if(b%2===0){for(const ratio of [1,1.25,1.5])v+=Math.sin(2*Math.PI*root*ratio*t)*Math.exp(-t*4)*.025;}
 if(b%4===0)v+=Math.sin(2*Math.PI*(64*t-20*t*t))*Math.exp(-t*24)*.1;
 if(b%2===1)v+=noise()*Math.exp(-t*85)*.024;
 music[start+i]+=v*Math.max(0,fade);
 }}
 async function wav(data:Float32Array,file:string){const buf=Buffer.alloc(44+data.length*2);buf.write('RIFF');buf.writeUInt32LE(buf.length-8,4);buf.write('WAVEfmt ',8);buf.writeUInt32LE(16,16);buf.writeUInt16LE(1,20);buf.writeUInt16LE(1,22);buf.writeUInt32LE(rate,24);buf.writeUInt32LE(rate*2,28);buf.writeUInt16LE(2,32);buf.writeUInt16LE(16,34);buf.write('data',36);buf.writeUInt32LE(data.length*2,40);let peak=0;for(let i=0;i<data.length;i++){peak=Math.max(peak,Math.abs(data[i]));buf.writeInt16LE(Math.round(Math.max(-.95,Math.min(.95,data[i]))*32767),44+i*2);}await fs.writeFile(file,buf);return peak;}
 await fs.mkdir('out/audio',{recursive:true});
 const peaks={sfx:await wav(fx,'out/audio/sound-effects.wav'),music:await wav(music,'out/audio/music-bed.wav')};
 await fs.writeFile('out/audio/cue-sheet.json',JSON.stringify({sampleRate:rate,events,peaks,originalAudio:true,syntheticNarration:false},null,2));
}
