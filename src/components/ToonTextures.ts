import {CanvasTexture,SRGBColorSpace} from 'three';
const cache=new Map<string,CanvasTexture>();
export function texture(key:string,w:number,h:number,draw:(c:CanvasRenderingContext2D)=>void){
 let map=cache.get(key);if(map)return map;const canvas=document.createElement('canvas');canvas.width=w;canvas.height=h;draw(canvas.getContext('2d')!);map=new CanvasTexture(canvas);map.colorSpace=SRGBColorSpace;cache.set(key,map);return map;
}
export function faceTexture(mood:string,color:string,blink:boolean){
 return texture(mood+color+blink,512,560,c=>{
 const ink='#291d24';c.lineCap='round';c.lineJoin='round';c.lineWidth=14;c.strokeStyle=ink;c.fillStyle='#fffef4';
 c.beginPath();c.ellipse(256,290,201,215,0,0,Math.PI*2);c.fill();c.stroke();
 c.fillStyle='#49332b';c.beginPath();c.moveTo(67,210);c.quadraticCurveTo(73,44,255,64);c.quadraticCurveTo(439,51,448,210);c.lineTo(374,157);c.lineTo(332,178);c.lineTo(265,139);c.lineTo(202,166);c.lineTo(155,145);c.closePath();c.fill();c.stroke();
 c.strokeStyle=color;c.lineWidth=23;c.beginPath();c.moveTo(81,177);c.quadraticCurveTo(255,103,430,176);c.stroke();
 c.strokeStyle=ink;c.fillStyle=ink;c.lineWidth=12;
 for(const side of [-1,1]){const x=256+side*78;
 if(blink||mood==='tired'){c.beginPath();c.moveTo(x-27,287);c.lineTo(x+27,295);c.stroke();}
 else{c.beginPath();c.ellipse(x,285,22,mood==='worried'?32:28,0,0,Math.PI*2);c.fill();c.fillStyle='white';c.beginPath();c.arc(x-6,277,6,0,Math.PI*2);c.fill();c.fillStyle=ink;}
 c.beginPath();c.moveTo(x-31,228+(mood==='worried'?side*14:mood==='determined'?-side*12:0));c.quadraticCurveTo(x,218,x+31,228+(mood==='worried'?-side*14:mood==='determined'?side*12:0));c.stroke();}
 if(mood==='happy'){c.beginPath();c.moveTo(187,356);c.quadraticCurveTo(256,451,328,356);c.closePath();c.fill();c.stroke();c.fillStyle='white';c.beginPath();c.moveTo(201,365);c.lineTo(315,365);c.quadraticCurveTo(256,389,201,365);c.fill();}
 else{c.beginPath();c.moveTo(207,396);c.quadraticCurveTo(256,mood==='worried'?348:385,305,396);c.stroke();}
 if(mood==='worried'||mood==='tired'){c.fillStyle='#70c8ec';c.strokeStyle=ink;c.lineWidth=5;c.beginPath();c.moveTo(407,297);c.quadraticCurveTo(446,347,416,353);c.quadraticCurveTo(391,349,407,297);c.fill();c.stroke();}
 });
}
export function labelTexture(text:string,color='#fff8df',bg='#164d58'){
 return texture('label'+text+color+bg,1024,256,c=>{c.fillStyle=bg;c.fillRect(0,0,1024,256);c.strokeStyle=color;c.lineWidth=8;c.strokeRect(12,12,1000,232);c.fillStyle=color;c.textAlign='center';c.textBaseline='middle';c.font='900 '+Math.min(105,900/(text.length*.6))+'px Arial';c.fillText(text,512,128,940);});
}
export function jerseyTexture(color:string){
 return texture('jersey'+color,256,320,c=>{c.fillStyle=color;c.fillRect(0,0,256,320);c.fillStyle='#fff5cd';c.fillRect(22,0,10,320);c.fillRect(224,0,10,320);c.textAlign='center';c.font='900 28px Arial';c.fillText('COAST',128,90);c.font='900 110px Arial';c.fillText('07',128,220);});
}
