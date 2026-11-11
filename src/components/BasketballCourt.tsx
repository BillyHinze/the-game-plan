import {Beam,Box,Ring,palette} from './Geometry';
import {HOOP} from '../animations/basketball';
export function BasketballCourt({compact=false}:{compact?:boolean}) {
 return <group>
 <Box at={[0,-.12,0]} size={[11,.22,7]} color="#c78d52"/>
 {Array.from({length:22},(_,i)=><Box key={i} at={[-5.25+i*.5,.002,0]} size={[.012,.005,7]} color="#af7946"/>)}
 <Box at={[0,.013,-3.1]} size={[10,.018,.035]} color={palette.white}/>
 <Box at={[0,.013,3.1]} size={[10,.018,.035]} color={palette.white}/>
 <Box at={[-5,.013,0]} size={[.035,.018,6.2]} color={palette.white}/>
 <Box at={[5,.013,0]} size={[.035,.018,6.2]} color={palette.white}/>
 <Box at={[0,.013,0]} size={[.035,.018,6.2]} color={palette.white}/>
 <Ring at={[0,.02,0]} r={.8} tube={.022}/>
 <Ring at={[3.5,.02,0]} r={2.2} tube={.022}/>
 <Box at={[3.75,.015,0]} size={[2.5,.02,1.8]} color="#4d9297"/>
 <Box at={[2.5,.03,-.9]} size={[2.5,.015,.035]} color={palette.white}/>
 <Box at={[2.5,.03,.9]} size={[2.5,.015,.035]} color={palette.white}/>
 <Box at={[1.25,.03,0]} size={[.035,.015,1.8]} color={palette.white}/>
 <Box at={[4.7,1.8,0]} size={[.13,3.6,.13]} color={palette.ink}/>
 <Beam a={[4.7,3.45,0]} b={[3.95,3.45,0]} r={.06}/>
 <Box at={[4.05,3.4,0]} size={[.09,1.05,1.65]} color={palette.white}/>
 <Box at={[3.993,3.32,0]} size={[.025,.5,.73]} color={palette.ink}/>
 <Box at={[3.97,3.32,0]} size={[.026,.42,.65]} color={palette.white}/>
 <Beam a={[4,3.05,0]} b={[3.73,3.05,0]} r={.03} color={palette.orange}/>
 <Ring at={HOOP} r={.29} tube={.025} color={palette.orange}/>
 {Array.from({length:12},(_,i)=>{const a=i/12*Math.PI*2,b=a+.35;return <group key={i}>
 <Beam a={[3.5+.28*Math.cos(a),3.04,.28*Math.sin(a)]} b={[3.5+.17*Math.cos(b),2.61,.17*Math.sin(b)]} r={.009} color={palette.white}/>
 </group>;})}
 <Ring at={[3.5,2.84,0]} r={.235} tube={.008}/>
 <Ring at={[3.5,2.62,0]} r={.17} tube={.008}/>
 {!compact&&<group>
 <Box at={[-1.5,2.2,-3.8]} size={[2,.85,.16]} color={palette.ink}/>
 <Box at={[-1.8,2.2,-3.7]} size={[.12,.4,.02]} color={palette.orange}/>
 <Box at={[-1.3,2.2,-3.7]} size={[.12,.4,.02]} color={palette.teal}/>
 {[-1,0,1].map(j=><Box key={j} at={[-.6,j*.25+.2,-4-j*.35]} size={[6,.15,.4]} color={j===1?palette.teal:palette.ink}/>)}
 {[-4.8,5].map((x,i)=><group key={i}>
 <Beam a={[x,0,-4]} b={[x,3,-4]} r={.07} color="#978065"/>
 <mesh position={[x,3,-4]}><coneGeometry args={[.9,1.5,7]}/><meshStandardMaterial color="#6ba294"/></mesh>
 </group>)}
 </group>}
 </group>;
}
