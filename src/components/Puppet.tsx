import {useMemo,useEffect} from 'react';
import {useThree} from '@react-three/fiber';
import {CanvasTexture,SRGBColorSpace,LinearFilter} from 'three';
import {clamp,smooth,type V3} from '../animations/math';
export type Pose='idle'|'walk'|'run'|'write'|'worry'|'dribble'|'catch'|'pass'|'shoot'|'cheer'|'wave'|'highfive'|'pack'|'phone'|'drink'|'rope'|'tired';
type P=[number,number];
const ink='#2a2024';
function limb(c:CanvasRenderingContext2D,root:P,end:P,a:number,b:number,bend:number,width:number){
 const dx=end[0]-root[0],dy=end[1]-root[1],raw=Math.hypot(dx,dy),d=Math.min(a+b-.1,Math.max(.1,raw)),nx=dx/(raw||1),ny=dy/(raw||1);
 const along=(a*a-b*b+d*d)/(2*d),h=Math.sqrt(Math.max(0,a*a-along*along));
 const mid:P=[root[0]+nx*along-ny*h*bend,root[1]+ny*along+nx*h*bend],tip:P=[root[0]+nx*d,root[1]+ny*d];
 c.strokeStyle=ink;c.lineWidth=width;c.beginPath();c.moveTo(...root);c.lineTo(...mid);c.lineTo(...tip);c.stroke();
 return tip;
}
function fill(c:CanvasRenderingContext2D,color:string,stroke=true){c.fillStyle=color;c.fill();if(stroke){c.strokeStyle=ink;c.lineWidth=9;c.stroke();}}
function oval(c:CanvasRenderingContext2D,x:number,y:number,rx:number,ry:number,color:string,stroke=true){c.beginPath();c.ellipse(x,y,rx,ry,0,0,Math.PI*2);fill(c,color,stroke);}
export function Puppet({t,pose='idle',position=[0,0,0],color='#d76b37',outfit='casual',hair=0,mood='auto',scale=1,phase=0,hands,number='7'}:{t:number;pose?:Pose;position?:V3;color?:string;outfit?:'casual'|'school'|'jersey';hair?:number;mood?:string;scale?:number;phase?:number;hands?:[V3,V3];number?:string}){
 const {camera}=useThree();const angle=Math.atan2(camera.position.x-position[0],camera.position.z-position[2]);
 const state=useMemo(()=>{const canvas=document.createElement('canvas');canvas.width=600;canvas.height=1024;const map=new CanvasTexture(canvas);map.colorSpace=SRGBColorSpace;map.minFilter=LinearFilter;map.generateMipmaps=false;return {canvas,map};},[]);
 useEffect(()=>()=>state.map.dispose(),[state]);
 const c=state.canvas.getContext('2d')!;c.clearRect(0,0,600,1024);c.lineCap='round';c.lineJoin='round';
 const time=t+phase,run=pose==='run',walk=pose==='walk',cycle=time*(run?11:6.5),sit=pose==='write'||pose==='worry'||pose==='tired',bounce=run?Math.abs(Math.sin(cycle))*17:walk?Math.abs(Math.sin(cycle))*6:Math.sin(time*2.2)*2;
 const lift=pose==='rope'?Math.abs(Math.sin(time*Math.PI*2.2))*38:0;
 const hip:P=[300+(run?Math.sin(cycle)*4:0),650+(sit?90:0)-bounce-lift];
 const lean=pose==='worry'?15*Math.sin(time*2)+14:pose==='tired'?24:run?8:0;
 // Legs retain constrained bone lengths. The roots inherit the pelvis transform.
 for(const side of [-1,1]){
  const swing=Math.sin(cycle+(side<0?Math.PI:0)),flight=Math.max(0,swing);
  const foot:P=[300+side*49+(run?Math.cos(cycle+side*Math.PI/2)*71:walk?Math.cos(cycle+side*Math.PI/2)*40:0),928-(run?flight*92:walk?flight*36:0)-lift];
  if(sit){foot[0]+=side*18+30;foot[1]=938;}
  const end=limb(c,[hip[0]+side*38,hip[1]-2],foot,155,155,side<0?1:-1,11);
  oval(c,end[0]+side*7,end[1]+9,23,11,ink,false);
 }
 const torsoY=hip[1]-211,torsoX=hip[0]+lean;
 // Backpack is a separate moving prop, attached to the upper body.
 if(pose==='walk'||pose==='pack'){c.beginPath();c.roundRect(torsoX-105,torsoY+28,65,162,25);fill(c,'#687a98');}
 const bodyGradient=c.createLinearGradient(torsoX-76,0,torsoX+76,0);bodyGradient.addColorStop(0,color);bodyGradient.addColorStop(1,color);
 c.beginPath();c.moveTo(torsoX-65,torsoY+16);c.quadraticCurveTo(torsoX,torsoY-16,torsoX+65,torsoY+16);c.bezierCurveTo(torsoX+79,torsoY+54,torsoX+79,hip[1]-16,torsoX+58,hip[1]+8);c.quadraticCurveTo(torsoX,hip[1]+37,torsoX-58,hip[1]+8);c.bezierCurveTo(torsoX-79,hip[1]-16,torsoX-79,torsoY+54,torsoX-65,torsoY+16);fill(c,outfit==='school'?'#f9edce':color);
 c.strokeStyle='rgba(255,255,255,.28)';c.lineWidth=11;c.beginPath();c.moveTo(torsoX-53,torsoY+42);c.quadraticCurveTo(torsoX-67,torsoY+109,torsoX-52,hip[1]-23);c.stroke();
 if(outfit==='jersey'){
 c.strokeStyle='#ffe8b1';c.lineWidth=8;for(const s of [-1,1]){c.beginPath();c.moveTo(torsoX+s*51,torsoY+28);c.lineTo(torsoX+s*55,hip[1]-18);c.stroke();}
 c.fillStyle='#fff5dd';c.textAlign='center';c.font='900 22px Arial';c.fillText('COAST',torsoX,torsoY+78);c.font='900 76px Arial';c.fillText(number,torsoX,torsoY+161);
 c.fillStyle='#283745';c.fillRect(torsoX-61,hip[1]-14,122,27);
 }else if(outfit==='school'){c.beginPath();c.moveTo(torsoX-10,torsoY+20);c.lineTo(torsoX+13,torsoY+20);c.lineTo(torsoX+17,torsoY+135);c.lineTo(torsoX+2,torsoY+156);c.lineTo(torsoX-12,torsoY+135);c.closePath();fill(c,'#9f4b48');}
 else{c.strokeStyle='#493c3d';c.lineWidth=4;c.beginPath();c.moveTo(torsoX-27,torsoY+25);c.lineTo(torsoX-19,torsoY+78);c.moveTo(torsoX+27,torsoY+25);c.lineTo(torsoX+19,torsoY+78);c.stroke();c.beginPath();c.roundRect(torsoX-35,torsoY+132,70,45,15);c.stroke();}
 const armTips:P[]=[];
 for(const side of [-1,1]){
  const shoulder:P=[torsoX+side*68,torsoY+37];let hand:P=[torsoX+side*94,hip[1]-16];
  if(walk||run)hand=[torsoX+side*89+(Math.sin(cycle+side*Math.PI/2)*(run?65:28)),torsoY+125-Math.cos(cycle+side*Math.PI/2)*(run?35:15)];
  if(pose==='write')hand=[torsoX+side*75+(side===1?Math.sin(time*9)*18:0),torsoY+135];
  if(pose==='worry'||pose==='tired')hand=[torsoX+side*(pose==='worry'?111:98),torsoY+(pose==='worry'?18:140)+Math.sin(time*3)*5];
  if(pose==='dribble'&&side===1)hand=[torsoX+179,Math.min(610,950-(.17+1.05*Math.abs(Math.cos(time*Math.PI/.62))+.15)*350)];
  if(pose==='catch'||pose==='pass')hand=[torsoX+side*55,torsoY+94+(pose==='pass'?-45*smooth(t/.45):0)];
  if(pose==='shoot')hand=[torsoX+side*47,torsoY+72-smooth(t/.9)*180];
  if(pose==='cheer')hand=[torsoX+side*(125+Math.sin(time*4+side)*13),torsoY-132+Math.sin(time*4+side)*20];
  if(pose==='wave'&&side===1)hand=[torsoX+150+Math.sin(time*7)*24,torsoY-78];
  if(pose==='highfive')hand=[torsoX+side*120,torsoY-88+Math.sin(time*3)*13];
  if(pose==='phone'&&side===1)hand=[torsoX+70,torsoY+65];
  if(pose==='drink'&&side===1)hand=[torsoX+77,torsoY-40+Math.sin(time*2)*7];
  if(pose==='pack')hand=[torsoX+side*72,torsoY+110+Math.sin(time*4+side)*18];
  if(pose==='rope')hand=[torsoX+side*122,torsoY+151+Math.sin(time*Math.PI*4.4)*9];
  if(hands){const h=hands[side<0?0:1],dx=h[0]-position[0],dz=h[2]-position[2];hand=[300+(dx*Math.cos(angle)-dz*Math.sin(angle))*350/scale,950-(h[1]-position[1])*350/scale];}
  const tip=limb(c,shoulder,hand,97,104,side<0?1:-1,10);oval(c,tip[0],tip[1],11,11,ink,false);armTips.push(tip);
 }
 // Attached hand-held props are drawn at the solved hand endpoint.
 const right=armTips[1];
 if(pose==='phone'){c.save();c.translate(right[0],right[1]-20);c.rotate(-.12);c.beginPath();c.roundRect(-23,-42,46,78,8);fill(c,'#273b51');c.fillStyle='#c7ebed';c.fillRect(-16,-32,32,51);c.restore();}
 if(pose==='drink'){c.save();c.translate(right[0]+5,right[1]-30);c.rotate(-.6);c.beginPath();c.roundRect(-17,-33,34,63,9);fill(c,'#73c4ce');c.fillStyle='#183945';c.fillRect(-12,-42,24,10);c.restore();}
 if(pose==='write'){c.strokeStyle='#e5b33d';c.lineWidth=7;c.beginPath();c.moveTo(right[0]-10,right[1]-3);c.lineTo(right[0]+23,right[1]+27);c.stroke();}
 // Head follows the torso, with a small delayed counter-rotation for weight.
 const headX=torsoX+(pose==='tired'?13:Math.sin(time*1.6)*2),headY=torsoY-102;
 c.save();c.translate(headX,headY);c.rotate((pose==='worry'?.07:run?.025:0)*Math.sin(time*3));
 if(hair===2){oval(c,105,-54,37,55,'#49342b');}
 oval(c,0,0,113,119,'#fffdf4');
 c.fillStyle=hair===1?'#292426':'#59372a';c.strokeStyle=ink;c.lineWidth=9;c.beginPath();c.moveTo(-111,-20);c.quadraticCurveTo(-121,-137,-7,-126);c.quadraticCurveTo(112,-147,112,-24);c.lineTo(80,-61);c.lineTo(57,-48);c.lineTo(19,-75);c.lineTo(-19,-54);c.lineTo(-50,-73);c.lineTo(-82,-44);c.closePath();c.fill();c.stroke();
 if(hair===1){for(let i=0;i<5;i++)oval(c,-74+i*36,-98-Math.sin(i)*14,28,26,'#292426');}
 if(outfit==='jersey'){c.strokeStyle=color;c.lineWidth=13;c.beginPath();c.moveTo(-100,-56);c.quadraticCurveTo(0,-99,100,-56);c.stroke();}
 let expression=mood==='auto'?(pose==='worry'?'worried':pose==='tired'?'tired':pose==='shoot'?'focused':pose==='catch'?'surprised':'happy'):mood;
 const blink=Math.sin((time+hair*.6)*1.7)>.995;
 c.fillStyle=ink;c.strokeStyle=ink;c.lineWidth=7;
 for(const side of [-1,1]){const x=side*41;
 if(blink||expression==='tired'){c.beginPath();c.moveTo(x-12,1);c.lineTo(x+12,4);c.stroke();}
 else if(expression==='surprised'){oval(c,x,2,23,27,'#fffdf4');oval(c,x+2,4,8,11,ink,false);}
 else oval(c,x,3,11,16,ink,false);
 c.beginPath();c.moveTo(x-18,-35+(expression==='worried'?side*8:expression==='focused'?-side*9:0));c.quadraticCurveTo(x,-44,x+18,-35+(expression==='worried'?-side*8:expression==='focused'?side*9:0));c.stroke();
 }
 if(expression==='happy'){c.beginPath();c.moveTo(-36,48);c.quadraticCurveTo(0,91,38,48);c.closePath();fill(c,ink,false);c.fillStyle='white';c.fillRect(-25,50,50,7);}
 else if(expression==='surprised')oval(c,0,61,15,19,ink,false);
 else{c.beginPath();c.moveTo(-27,69);c.quadraticCurveTo(0,expression==='worried'?43:62,27,69);c.stroke();}
 if(expression==='worried'||expression==='tired'){c.fillStyle='#73c9e9';c.beginPath();c.moveTo(91,10);c.quadraticCurveTo(116,45,98,47);c.quadraticCurveTo(80,44,91,10);c.fill();c.lineWidth=3;c.stroke();}
 c.restore();state.map.needsUpdate=true;
 return <group position={position} scale={scale}>
 <mesh rotation={[-Math.PI/2,0,0]} position={[0,.012,0]} scale={[.62,.29,1]}><circleGeometry args={[.5,28]}/><meshBasicMaterial color="#2a2230" transparent opacity={.18}/></mesh>
 <group rotation={[0,angle,0]}><mesh position={[0,(950-512)/350,0]}><planeGeometry args={[600/350,1024/350]}/><meshBasicMaterial map={state.map} transparent alphaTest={.1} toneMapped={false}/></mesh></group>
 </group>;
}
