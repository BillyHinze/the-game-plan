import {Beam,Box,Ring,palette} from './Geometry';
export function Desk({papers=5}:{papers?:number}) {
 return <group>
 <Box at={[0,.98,.6]} size={[1.8,.1,.85]} color="#b98b61"/>
 {[-.7,.7].map(x=><group key={x}>{[.3,.88].map(z=><Box key={z} at={[x,.47,z]} size={[.07,.95,.07]}/>)}</group>)}
 <Box at={[0,.54,-.12]} size={[.7,.12,.6]} color={palette.teal}/>
 <Box at={[0,.82,-.39]} size={[.7,.5,.09]} color={palette.teal}/>
 {[-.26,.26].map(x=><Box key={x} at={[x,.26,-.12]} size={[.055,.52,.45]} color={palette.ink}/>)}
 {Array.from({length:papers},(_,i)=><Box key={i} at={[.52,1.06+i*.032,.6]} size={[.48,.025,.56]} color={i%3===0?'#f4bc96':palette.white} rotation={Math.sin(i)*.12}/>)}
 <Box at={[-.25,1.055,.6]} size={[.65,.022,.48]} color={palette.white}/>
 <Beam a={[-.45,1.08,.5]} b={[-.1,1.08,.7]} r={.015} color={palette.orange}/>
 </group>;
}
export function Clock({t}:{t:number}) {
 return <group position={[-1.5,2.35,-.7]} rotation={[Math.PI/2,0,0]}>
 <mesh><cylinderGeometry args={[.48,.48,.06,48]}/><meshStandardMaterial color={palette.white}/></mesh>
 <group rotation={[0,t*4,0]}><Beam a={[0,.04,0]} b={[0,.04,.37]} r={.019}/></group>
 <group rotation={[0,t,0]}><Beam a={[0,.05,0]} b={[.24,.05,0]} r={.022} color={palette.orange}/></group>
 <Ring at={[0,.04,0]} r={.48} color={palette.ink}/>
 </group>;
}
export function Car({x=0}:{x?:number}) {
 return <group position={[x,0,0]}>
 <Box at={[0,.5,0]} size={[1.6,.5,.8]} color={palette.teal}/>
 <Box at={[-.05,.88,0]} size={[.9,.4,.76]} color={palette.teal}/>
 <Box at={[-.05,.93,.39]} size={[.66,.21,.02]} color="#dce5e1"/>
 {[-.5,.5].flatMap(xx=>[-.42,.42].map(z=><mesh key={xx+','+z} position={[xx,.24,z]} rotation={[Math.PI/2,0,0]}><cylinderGeometry args={[.22,.22,.12,16]}/><meshStandardMaterial color={palette.ink}/></mesh>))}
 </group>;
}
export function CalendarFloor({t,solving=false}:{t:number;solving?:boolean}) {
 return <group position={[-.5,.03,0]}>
 {Array.from({length:7},(_,i)=><group key={i} position={[(i%4-1.5)*1.2,0,Math.floor(i/4)*1.3-.6]}>
 <Box at={[0,.02,0]} size={[1.05,.035,1.05]} color={(i===1||i===4)?palette.teal:'#dedbd0'}/>
 <Box at={[-.3,.06,-.3]} size={[.15,.025,.12]} color={palette.ink}/>
 {solving&&t>i*.55&&<group><Beam a={[-.25,.09,0]} b={[-.05,.09,.2]} r={.025} color={palette.orange}/><Beam a={[-.05,.09,.2]} b={[.32,.09,-.25]} r={.025} color={palette.orange}/></group>}
 </group>)}
 </group>;
}
