import {narration} from '../data/narration';
import {smooth} from '../animations/math';
export function FilmOverlay({scene,t,duration,shot,captions}:{scene:number;t:number;duration:number;shot:{kind:string;time:number;progress:number;label?:string};captions:boolean}){
 const words=narration[scene].split(/\s+/),idx=Math.min(words.length-1,Math.floor(t/duration*words.length)),start=Math.floor(idx/3)*3,phrase=words.slice(start,start+3).join(' ');
 const captionProgress=(t/duration*words.length)%3;
 const intro=shot.label&&(shot.time<2.2||shot.kind==='final-team');const headline=shot.kind==='final-team'?(shot.time<1.3?'STAY ACTIVE.':shot.time<2.7?'STAY CONNECTED.':'BUILD HEALTHY HABITS.'):shot.kind==='clock'?'YEAR 11 IS COMING.':shot.kind==='overwhelmed'?'AND SO IS ALL OF THIS.':shot.label;
 const pop=1+Math.sin(Math.min(1,captionProgress/.3)*Math.PI)*.035;
 return <><div style={{position:'absolute',inset:0,boxShadow:'inset 0 0 180px rgba(33,22,34,.12)',pointerEvents:'none'}}/>
 {(intro||shot.kind==='clock')&&<div style={{position:'absolute',left:70,right:70,top:175,textAlign:'center',color:'#fff5d9',fontWeight:900,fontSize:shot.kind==='clock'?76:58,lineHeight:1.05,letterSpacing:-1,WebkitTextStroke:'9px #32252b',paintOrder:'stroke fill',transform:'translateY('+((1-smooth(shot.time/.23))*-50)+'px)',opacity:smooth(shot.time/.16)}}>{headline}</div>}
 {shot.kind==='budget'&&<div style={{position:'absolute',top:250,left:120,right:120,color:'#fff5d9',fontWeight:800,textAlign:'center',fontSize:45,lineHeight:1.35,WebkitTextStroke:'7px #32252b',paintOrder:'stroke fill'}}>REGISTRATION · MEMBERSHIP<br/>SHOES · TRANSPORT<br/><span style={{fontSize:30}}>Check current fees before joining.</span></div>}
 {shot.kind==='progress'&&<div style={{position:'absolute',top:280,left:120,right:120,textAlign:'center',fontWeight:900,fontSize:56,color:'#fff5d9',WebkitTextStroke:'8px #32252b',paintOrder:'stroke fill'}}>{shot.time<1?'SHOW UP.':shot.time<2?'CHECK FITNESS.':'CHECK WELLBEING.'}</div>}
 {captions&&<div style={{position:'absolute',left:65,right:65,bottom:285,textAlign:'center',fontWeight:900,fontSize:64,lineHeight:1.12,color:'white',WebkitTextStroke:'10px #2b2028',paintOrder:'stroke fill',textShadow:'0 7px 0 rgba(0,0,0,.18)',letterSpacing:-1.5,transform:'scale('+pop+')'}}>{phrase}</div>}
 {shot.kind==='final-team'&&shot.time>2&&<div style={{position:'absolute',bottom:150,left:75,right:75,textAlign:'center',color:'#fffbe7',fontWeight:700,fontSize:27,lineHeight:1.3,textShadow:'0 2px 6px #2a3037'}}>Sources: SportUP Sunshine Coast · Suncoast Clippers<br/>Australian Government physical activity guidelines<br/>Full links and narration in the included source pack.</div>}
 </>;
}
