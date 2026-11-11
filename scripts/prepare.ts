import fs from 'node:fs/promises';
import {inputProps,mode} from './config';
import {makeSound} from './sound';
import {narration} from '../src/data/narration';
import {sources} from '../src/data/sources';
await fs.mkdir('public/fonts',{recursive:true});
for(const [name,url] of [['Montserrat.ttf','https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/Montserrat%5Bwght%5D.ttf'],['OFL.txt','https://raw.githubusercontent.com/google/fonts/main/ofl/montserrat/OFL.txt']]){
 const r=await fetch(url);if(!r.ok)throw new Error('Font download failed: '+r.status);await fs.writeFile('public/fonts/'+name,Buffer.from(await r.arrayBuffer()));
}
await makeSound(inputProps);
const time=(s:number)=>{const m=Math.floor(s/60);return String(m).padStart(2,'0')+':'+(s%60).toFixed(1).padStart(4,'0');};
let guide='# THE GAME PLAN — YOUR VOICE-OVER\n\nRead in your own natural voice. The supplied script is 312 words. The default cut is 2:10. Aim for about 144 words per minute, with short breaths between paragraphs. No synthetic narrator is included.\n\n';
narration.forEach((p,i)=>guide+='['+time(inputProps.boundaries[i])+' – '+time(inputProps.boundaries[i+1])+']\n'+p+'\n\n');
guide+='RECORDING\nRecord one MP3 in a quiet room. You can talk over the supplied MP4 in any editor, or upload your take to public/audio/voiceover.mp3 on GitHub and run the workflow with voiceover=yes. A 120–180 second recording is accepted. To place sections precisely, upload public/audio/timing.json with 11 increasing boundaries. Example:\n'+JSON.stringify(inputProps.boundaries)+'\n\nThe film already contains Foley and a quiet instrumental bed. Separate sound-effects.wav and music-bed.wav are included for mixing.\n\nSOURCES\n'+sources.map(s=>s.name+'\n'+s.url).join('\n\n')+'\n\nFacts checked 11 November 2026. SportUP is 18+; use junior basketball before eligibility. Confirm future registration fees and availability.\n';
await fs.writeFile('out/READ-THIS-TO-RECORD.txt',guide);
await fs.writeFile('out/narration.txt',narration.join('\n\n')+'\n');
await fs.writeFile('out/timing.json',JSON.stringify(inputProps.boundaries,null,2));
const stamp=(s:number)=>{const ms=Math.round(s*1000);return '00:'+String(Math.floor(ms/60000)).padStart(2,'0')+':'+String(Math.floor(ms/1000)%60).padStart(2,'0')+','+String(ms%1000).padStart(3,'0');};
let index=1,srt='';
narration.forEach((para,i)=>{const words=para.split(/\s+/);for(let j=0;j<words.length;j+=3){const a=inputProps.boundaries[i]+j/words.length*(inputProps.boundaries[i+1]-inputProps.boundaries[i]),b=inputProps.boundaries[i]+Math.min(j+3,words.length)/words.length*(inputProps.boundaries[i+1]-inputProps.boundaries[i]);srt+=index+++'\n'+stamp(a)+' --> '+stamp(b)+'\n'+words.slice(j,j+3).join(' ')+'\n\n';}});
await fs.writeFile('out/captions.srt',srt);
if(process.env.GITHUB_OUTPUT)await fs.appendFile(process.env.GITHUB_OUTPUT,'chunks='+JSON.stringify(mode==='preview'?[0]:[0,1,2,3,4])+'\n');
console.log('Prepared original audio stems, fonts, narration, captions and timing.');
