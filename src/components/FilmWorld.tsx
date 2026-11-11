import {BackSide} from 'three';
import {Box,Beam,Ring} from './Geometry';
import {texture,labelTexture} from './ToonTextures';
export function Panel({text,position,width=2,height=.5,color='#fff4d6',bg='#1b4d54',rotation=0}:{text:string;position:[number,number,number];width?:number;height?:number;color?:string;bg?:string;rotation?:number}){
 return <mesh position={position} rotation={[0,rotation,0]}><planeGeometry args={[width,height]}/><meshBasicMaterial map={labelTexture(text,color,bg)} toneMapped={false}/></mesh>;
}
const wood=()=>texture('film-wood',1024,1024,c=>{c.fillStyle='#dcb880';c.fillRect(0,0,1024,1024);for(let x=0;x<1024;x+=128){c.fillStyle=x%256?'#d3a76d':'#e3c08c';c.fillRect(x,0,128,1024);c.strokeStyle='#ad8252';c.lineWidth=2;c.strokeRect(x,0,128,1024);for(let y=0;y<1024;y+=256){c.beginPath();c.moveTo(x,y+(x%256));c.lineTo(x+128,y+(x%256));c.stroke();}c.strokeStyle='#c49762';c.lineWidth=1;for(let j=0;j<7;j++){c.beginPath();c.moveTo(x+14+j*14,0);c.bezierCurveTo(x+25+j*14,300,x+4+j*14,700,x+14+j*14,1024);c.stroke();}}});
const brick=()=>texture('film-brick',1024,512,c=>{c.fillStyle='#b96c51';c.fillRect(0,0,1024,512);for(let y=0;y<512;y+=64)for(let x=-96;x<1120;x+=192){c.fillStyle=['#c57c5d','#b76b4f','#cc8464'][Math.abs((x/192+y/64)|0)%3];c.fillRect(x+(y%128?96:0)+3,y+3,186,58);c.fillStyle='rgba(255,221,173,.15)';c.fillRect(x+(y%128?96:0)+7,y+7,174,4);}});
export function Floor({wooden=false,color='#b4bcb2'}:{wooden?:boolean;color?:string}){return <mesh rotation={[-Math.PI/2,0,0]} position={[0,-.014,0]}><planeGeometry args={[40,40]}/><meshStandardMaterial map={wooden?wood():undefined} color={wooden?'#ffffff':color} roughness={.9}/></mesh>;}
function Sky({night=false,sunset=false}:{night?:boolean;sunset?:boolean}){
 const map=texture('sky'+night+sunset,1024,512,c=>{const g=c.createLinearGradient(0,0,0,512);g.addColorStop(0,night?'#111b40':sunset?'#8a84c8':'#2d8ce0');g.addColorStop(.55,night?'#414f83':sunset?'#efb19a':'#9edff4');g.addColorStop(1,night?'#9ba7c4':sunset?'#ffe0b6':'#d9f0dd');c.fillStyle=g;c.fillRect(0,0,1024,512);if(night){c.fillStyle='#fff4c9';for(let i=0;i<50;i++){c.beginPath();c.arc((i*157)%1024,(i*89)%270,1.5+(i%2),0,7);c.fill();}}else{c.fillStyle=sunset?'#ffe3c8':'#ffffffbb';for(let i=0;i<9;i++){const x=i*151%1024,y=190+i%3*32;c.beginPath();c.ellipse(x,y,72,12,0,0,7);c.ellipse(x+22,y-9,37,18,0,0,7);c.fill();}}});
 return <mesh><sphereGeometry args={[65,24,16]}/><meshBasicMaterial map={map} side={BackSide} toneMapped={false} depthWrite={false}/></mesh>;
}
function Tree({x,z,s=1}:{x:number;z:number;s?:number}){return <group position={[x,0,z]} scale={s}><Beam a={[0,0,0]} b={[.15,2.7,0]} r={.13} color="#79543b"/>{[-.5,.3,.7].map((n,i)=><mesh key={i} position={[n,2.6+i%2*.4,0]} scale={[1,.85,.8]}><sphereGeometry args={[.85,12,10]}/><meshStandardMaterial color={['#559057','#7aae57','#438156'][i]} roughness={1}/></mesh>)}</group>;}
function Palm({x,z}:{x:number;z:number}){return <group position={[x,0,z]}><Beam a={[0,0,0]} b={[.3,3.6,0]} r={.12} color="#93734f"/>{Array.from({length:7},(_,i)=><mesh key={i} position={[.3,3.6,0]} rotation={[.4,Math.PI*2*i/7,.9]}><coneGeometry args={[.22,2.3,3]}/><meshStandardMaterial color={i%2?'#3d825e':'#72a563'}/></mesh>)}</group>;}
export function Bench({position=[0,0,0]}:{position?:[number,number,number]}){return <group position={position}>{[0,.17,.34].map(z=><Box key={z} at={[0,.52,z]} size={[2.4,.08,.13]} color="#b18052"/>)}{[.82,1.04].map(y=><Box key={y} at={[0,y,-.05]} size={[2.4,.15,.06]} color="#bc8e5d"/>)}{[-.9,.9].map(x=><Box key={x} at={[x,.25,.15]} size={[.07,.5,.4]} color="#405054"/>)}</group>;}
function Lamp({x,z}:{x:number;z:number}){return <group><Beam a={[x,0,z]} b={[x,4,z]} r={.05} color="#485864"/><Box at={[x+.3,4,z]} size={[.7,.08,.28]} color="#fff4ce"/><Beam a={[x,3.95,z]} b={[x+.6,3.95,z]} r={.04} color="#485864"/></group>;}
function House({x,z,color}:{x:number;z:number;color:string}){return <group position={[x,0,z]}>
 <Box at={[0,1.5,0]} size={[4,3,2.4]} color={color}/><mesh position={[0,.7,1.22]}><planeGeometry args={[4,1.4]}/><meshStandardMaterial map={brick()}/></mesh>
 <mesh position={[0,3.15,0]} rotation={[0,Math.PI/4,0]} scale={[2.9,.8,1.7]}><coneGeometry args={[1,1,4]}/><meshStandardMaterial color="#5b637a"/></mesh>
 {[-1.2,1.2].map(a=><group key={a}><Box at={[a,1.9,1.23]} size={[1.05,1.2,.08]} color="#fff0d5"/><Box at={[a,1.9,1.28]} size={[.9,1.05,.05]} color="#9fdbe2"/><Box at={[a,1.9,1.32]} size={[.04,1.1,.04]} color="#fff0d5"/></group>)}
 <Box at={[0,.9,1.25]} size={[.75,1.8,.08]} color="#637f79"/>
 </group>;}
export function FilmWorld({env,t,calm=false}:{env:string;t:number;calm?:boolean}){
 if(env==='bedroom')return <group><Sky night={!calm}/><Floor wooden/>
 <Box at={[0,2.4,-3.3]} size={[11,4.8,.12]} color={calm?'#a6c7bd':'#8886b8'}/><Box at={[-4.3,2.4,0]} size={[.1,4.8,8]} color={calm?'#85b0a6':'#6e729e'}/>
 <Box at={[0,.13,-3.18]} size={[11,.25,.06]} color="#f5d7ac"/>
 <Box at={[2,2.5,-3.18]} size={[2.7,2.2,.08]} color="#f5dbbb"/><Box at={[2,2.5,-3.12]} size={[2.5,2,.06]} color={calm?'#87cce6':'#283660'}/>
 <Box at={[2,2.5,-3.05]} size={[.08,2.1,.05]} color="#f5dbbb"/><Box at={[2,2.5,-3.05]} size={[2.6,.08,.05]} color="#f5dbbb"/>
 <Box at={[.55,2.6,-2.97]} size={[.32,2.5,.15]} color="#d69486"/><Box at={[3.45,2.6,-2.97]} size={[.32,2.5,.15]} color="#d69486"/>
 <Box at={[2.6,.28,-1.5]} size={[1.5,.5,2.6]} color="#b48b71"/><Box at={[2.6,.57,-1.5]} size={[1.5,.14,2.55]} color="#f5e6cc"/><Box at={[2.6,.69,-1]} size={[1.48,.13,1.55]} color="#559993"/><Box at={[2.6,.72,-2.4]} size={[1.1,.18,.55]} color="#fff5e1"/>
 <Box at={[-2.7,1.3,-2.7]} size={[1.3,2.6,.5]} color="#755340"/>
 {[.15,.85,1.55,2.25].map((y,j)=><group key={j}><Box at={[-2.7,y,-2.4]} size={[1.3,.06,.7]} color="#c99762"/>{Array.from({length:5},(_,i)=><Box key={i} at={[-3.18+i*.21,y+.25,-2.3]} size={[.16,.45+i%2*.1,.3]} color={['#d98358','#739f9f','#e5c274','#bb7c84','#6f7ea6'][i]}/>)}</group>)}
 <Panel text={calm?'ONE STEP AT A TIME':'EXAMS NEXT WEEK'} position={[-.7,2.8,-3.18]} width={1.8} height={.7} bg="#f6db9d" color="#634541"/>
 <Panel text="MY WEEK" position={[-.7,1.9,-3.17]} width={1.8} height={.7} bg="#eac7b3" color="#594b51"/>
 </group>;
 if(env==='hall')return <group><Sky/><Floor color="#c7d2d1"/>
 <Box at={[0,2.5,-21]} size={[7,5,.12]} color="#e5d9c2"/><Box at={[0,4.8,-8]} size={[7,.12,26]} color="#e8e6dc"/>
 {[-1,1].map(side=><group key={side}><Box at={[side*3.2,2.4,-8]} size={[.15,4.8,27]} color="#ead9c5"/>{Array.from({length:14},(_,i)=><group key={i}><Box at={[side*2.95,1.3,3-i*1.25]} size={[.35,2.6,1.16]} color={i%3===0?'#5ca8b2':'#7bbdc1'}/><Box at={[side*2.74,1.3,3-i*1.25]} size={[.04,2.4,.98]} color="#a2d0cc"/><Box at={[side*2.69,1.35,3.3-i*1.25]} size={[.04,.28,.04]} color="#3a6370"/>{[1.95,2.07,2.19].map(y=><Box key={y} at={[side*2.69,y,3-i*1.25]} size={[.03,.025,.7]} color="#6aa4ad"/>)}</group>)}</group>)}
 {[0,-5,-10,-15].map(z=><Box key={z} at={[0,4.65,z]} size={[1.5,.05,.5]} color="#fff4d7"/>)}<Panel text="SUNSHINE COAST HIGH" position={[0,3.7,-20.9]} width={4.5} height={.55}/>
 </group>;
 if(env==='gym'||env==='adultgym')return <group><Sky/><Floor wooden/>
 <Box at={[0,3,-7.5]} size={[24,6,.15]} color="#f0ddbc"/><Box at={[0,1,-7.35]} size={[24,2,.08]} color="#477f8a"/>
 <Box at={[-8,3,-1]} size={[.15,6,14]} color="#d5c5aa"/>
 {[-6,-3,0,3,6].map(x=><group key={x}><Box at={[x,4.5,-7.3]} size={[2.1,1.5,.07]} color="#8fceda"/><Box at={[x,4.5,-7.2]} size={[.04,1.5,.05]} color="#f7edcf"/><Beam a={[x,5.7,-7]} b={[x,5.7,7]} r={.06} color="#848d91"/></group>)}
 {[-4,0,4].map(z=><Box key={z} at={[0,5.6,z]} size={[6,.06,.35]} color="#fff2c9"/>)}
 {[0,1,2].map(i=><group key={i}><Box at={[0,.28+i*.32,-5-i*.45]} size={[9,.15,.42]} color={i%2?'#d89555':'#b46a42'}/>{[-3,0,3].map(x=><Box key={x} at={[x,.1+i*.16,-5-i*.45]} size={[.1,.5,.4]} color="#405963"/>)}</group>)}
 <Panel text={env==='adultgym'?'SOCIAL BASKETBALL · SPORTUP 18+':'CLIPPERS · JUNIOR COMMUNITY BASKETBALL'} position={[0,3.1,-7.2]} width={6} height={.65}/>
 <Panel text="HOME   12 : 10   AWAY" position={[-4.8,3.8,-7.2]} width={2.5} height={1.1} bg="#263b49" color="#ffe18b"/>
 <Box at={[5.8,1.4,-7.2]} size={[1.6,2.8,.1]} color="#497c7c"/><Panel text="COURT 1" position={[5.8,2.5,-7.1]} width={1.4} height={.3}/>
 </group>;
 if(env==='street')return <group><Sky sunset={calm}/><Floor color="#a8b6b2"/><Box at={[0,-.005,-3]} size={[40,.02,5.5]} color="#747d88"/>
 {Array.from({length:16},(_,i)=><Box key={i} at={[(i-8)*2,.012,-3]} size={[1,.01,.06]} color="#e9ddbf"/>)}
 <Box at={[0,.04,.5]} size={[40,.09,1.2]} color="#d6c4a7"/>
 <House x={-4} z={-9} color="#efd5ad"/><House x={1} z={-10} color="#b4c8c5"/><House x={6} z={-9} color="#dba79b"/>
 <Tree x={-4} z={-1.4}/><Tree x={5} z={-2}/><Lamp x={-6} z={-4}/><Lamp x={5.5} z={-4}/>
 {Array.from({length:22},(_,i)=><Box key={i} at={[(i-11)*.4,.5,2]} size={[.23,1,.06]} color="#f0dfc0"/>)}
 </group>;
 if(env==='beach')return <group><Sky sunset/><Floor color="#e6cf9f"/>
 <Box at={[0,-.06,-22]} size={[90,.08,30]} color="#54bcbf"/>
 {Array.from({length:9},(_,i)=><Box key={i} at={[0,-.008,-7-i*2+(t*.14)%1]} size={[90,.015,.07+i*.02]} color={i%2?'#c6eadb':'#8dd4cf'}/>)}
 <Box at={[0,-.005,1]} size={[24,.03,5]} color="#c49d6b"/>
 {Array.from({length:38},(_,i)=><Box key={i} at={[(i-19)*.6,.018,1]} size={[.018,.008,5]} color="#96734c"/>)}
 {[-6,5].map(x=><Palm key={x} x={x} z={-3}/>)}
 <Bench position={[3,0,-1]}/><Panel text="SUNSHINE COAST" position={[-2.8,1.4,-2.8]} width={2} height={.4} bg="#ddc38d" color="#635143"/>
 </group>;
 if(env==='rain')return <group><Sky night/><Floor color="#717f89"/>
 <Box at={[0,.06,-1]} size={[8,.12,3]} color="#a0a9a7"/><Box at={[0,2.6,-1.5]} size={[4.7,.14,2.2]} color="#597e8b"/>
 {[-2,2].map(x=><Beam key={x} a={[x,0,-1.7]} b={[x,2.6,-1.7]} r={.06} color="#375366"/>)}
 <Box at={[0,1.4,-2.4]} size={[4.5,2.3,.06]} color="#91b2b9"/><Bench position={[0,0,-1.8]}/><Panel text="BUS STOP" position={[1.7,2.2,-2.3]} width={1.2} height={.35} bg="#efe2a6" color="#354b59"/>
 {[-1.8,.8,2.8].map((x,i)=><mesh key={i} rotation={[-Math.PI/2,0,0]} position={[x,.008,1+i*.7]} scale={[1,.35,1]}><circleGeometry args={[.7,32]}/><meshBasicMaterial color="#a9c5ca" transparent opacity={.65}/></mesh>)}
 <Rain t={t}/></group>;
 return <group><Sky sunset={calm}/><Floor color="#99bd77"/>
 <Box at={[0,-.002,0]} size={[2.6,.025,70]} color="#dac59a"/>
 {Array.from({length:14},(_,i)=><Tree key={i} x={i%2?-4-i%3:4+i%3} z={3-i*2.6} s={.7+(i%3)*.2}/>)}
 <Bench position={[2.8,0,-1.2]}/><Lamp x={-2.4} z={-4}/><Panel text="MOVE A LITTLE. FEEL BETTER." position={[0,2.8,-10]} width={3.4} height={.6} bg="#e4c082" color="#4b5b4b"/>
 </group>;
}
function Rain({t}:{t:number}){const a=[];for(let i=0;i<130;i++){const x=(i*1.731)%12-6,y=6-((i*.317+t*7)%7),z=(i*.971)%9-3;a.push(x,y,z,x-.06,y-.32,z);}return <lineSegments><bufferGeometry><bufferAttribute attach="attributes-position" args={[new Float32Array(a),3]}/></bufferGeometry><lineBasicMaterial color="#d8edf6" transparent opacity={.5}/></lineSegments>;}
