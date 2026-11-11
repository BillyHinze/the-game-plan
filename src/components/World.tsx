import {Box,Beam,Sphere,palette} from './Geometry';
import {labelTexture,texture} from './ToonTextures';
export function Sign({text,position,width=3,height=.7,color='#fff2d0',bg='#164d58'}:{text:string;position:[number,number,number];width?:number;height?:number;color?:string;bg?:string}){
 return <mesh position={position}><planeGeometry args={[width,height]}/><meshBasicMaterial toneMapped={false} map={labelTexture(text,color,bg)}/></mesh>;
}
function Tree({x,z,scale=1}:{x:number;z:number;scale?:number}){
 return <group position={[x,0,z]} scale={scale}><Beam a={[0,0,0]} b={[.1,2.6,0]} r={.15} color="#78513c"/>
 {[-.6,0,.6].map((n,i)=><mesh key={i} position={[n,2.8+(i===1?.45:0),0]}><icosahedronGeometry args={[1.1,1]}/><meshStandardMaterial color={i%2?'#4f9845':'#76b24c'} roughness={1}/></mesh>)}</group>;
}
export function Outdoor({t,sunset=false}:{t:number;sunset?:boolean}){
 return <group>

 <Box at={[0,-.22,0]} size={[100,.2,100]} color="#82b75e"/>
 <Box at={[0,-.105,3.7]} size={[100,.06,1.1]} color="#d8c5a4"/>
 {Array.from({length:14},(_,i)=><group key={i}><Tree x={(i-7)*3.7} z={-8-(i%3)*2} scale={.8+(i%3)*.18}/></group>)}
 {[-8,8].map(x=><group key={x}><Box at={[x,.85,0]} size={[.12,1.7,9]} color="#d8e2dd"/>{Array.from({length:18},(_,i)=><Box key={i} at={[x,.85,i*.5-4.3]} size={[.12,1.7,.035]} color="#374e59"/>)}</group>)}
 {Array.from({length:8},(_,i)=><group key={i} position={[(i-4)*7+Math.sin(t*.025)*.4,7+(i%3),-15-i%2*6]}>
 {[0,1,2].map(j=><mesh key={j} position={[j*.9,Math.sin(j)*.35,0]} scale={[1.4,.55,.7]}><sphereGeometry args={[1,12,8]}/><meshBasicMaterial color={sunset?'#ffdec4':'#f5fbff'}/></mesh>)}
 </group>)}
 <Box at={[0,1.7,-14]} size={[9,3.4,2]} color="#e4a96d"/><Box at={[0,3.5,-14]} size={[9.5,.25,2.5]} color="#585c7b"/>
 {[-3,-1,1,3].map(x=><Box key={x} at={[x,1.9,-12.95]} size={[1.3,1.5,.06]} color="#9fdbec"/>)}
 <Sign text="SUNSHINE COAST" position={[0,3,-12.9]} width={5} height={.65}/>
 </group>;
}
export function StudyRoom({t,stress=false}:{t:number;stress?:boolean}){
 const wall=stress?'#b5b4d5':'#b6cfc9';
 return <group>

 <Box at={[0,-.13,0]} size={[20,.2,20]} color="#b88758"/>
 {Array.from({length:24},(_,i)=><Box key={i} at={[(i-12)*.5,-.015,0]} size={[.015,.01,20]} color="#896443"/>)}
 <Box at={[0,2.5,-3.2]} size={[12,5,.2]} color={wall}/>
 <Box at={[-4,2.5,0]} size={[.2,5,8]} color={wall}/>
 <Box at={[0,.18,-3.04]} size={[12,.3,.12]} color="#f0debc"/>
 <Box at={[1.9,2.7,-3.05]} size={[2.7,2.3,.12]} color="#f9ebd4"/>
 <Box at={[1.9,2.7,-2.96]} size={[2.46,2.08,.05]} color={stress?'#3b5194':'#6fc9ef'}/>
 <Box at={[1.9,2.7,-2.9]} size={[.08,2.1,.05]} color="#fff3dd"/><Box at={[1.9,2.7,-2.9]} size={[2.5,.08,.05]} color="#fff3dd"/>
 <Box at={[-2.6,1.45,-2.7]} size={[1.25,2.9,.5]} color="#624936"/>
 {[.2,.9,1.6,2.3].map((y,j)=><group key={j}><Box at={[-2.6,y,-2.35]} size={[1.2,.08,.7]} color="#c09361"/>{Array.from({length:5},(_,i)=><Box key={i} at={[-3+i*.19,y+.3,-2.3]} size={[.13,.5+(i%2)*.1,.3]} color={['#db7857','#427a8c','#dfbb59','#616194','#91ae77'][i]}/>)}</group>)}
 <Sign text={stress?'EXAMS. HOMEWORK. REPEAT.':'PLAN THE WEEK'} position={[-.4,3.4,-3.04]} width={2.8} height={.6}/>
 <Box at={[2.8,.3,-1.5]} size={[.5,.6,.5]} color="#c77955"/>
 {[-.3,0,.3].map((n,i)=><Beam key={i} a={[2.8,.5,-1.5]} b={[2.8+n,1.35+i*.1,-1.5]} r={.1} color="#438e65"/>)}
 <mesh position={[-.3,2.25,-3.01]}><planeGeometry args={[1.8,1.4]}/><meshBasicMaterial map={texture('calendar',720,560,c=>{c.fillStyle='#fff9e9';c.fillRect(0,0,720,560);c.fillStyle='#db694f';c.fillRect(0,0,720,100);c.fillStyle='white';c.font='900 55px Arial';c.fillText('MY WEEK',40,70);for(let i=0;i<21;i++){c.fillStyle=(i===5||i===9)?'#5baa8c':'#ddd9cc';c.fillRect(25+(i%7)*99,125+Math.floor(i/7)*130,86,110);}c.fillStyle='#213c49';c.font='bold 32px Arial';c.fillText('GAME',525,190);c.fillText('PLAY',225,320);})}/></mesh>
 </group>;
}
