import {narration} from '../data/narration';
import {smooth} from '../animations/math';
const topMessages=[
 ['YEAR 11 + 12','THE PRESSURE IS REAL'],
 ['THE GAME PLAN','BASKETBALL + WELLBEING'],
 ['SUNCOAST CLIPPERS','JUNIOR BASKETBALL'],
 ['ONE GAME. ONE PRACTICE.','KEEP MOVING DAILY'],
 ['FITNESS. COORDINATION.','STAMINA. SKILLS.'],
 ['LESS STRESS','MORE CONFIDENCE'],
 ['PURPOSE + BELONGING','60 MINUTES / DAY'],
 ['HOMEWORK. COSTS. TRANSPORT.','REAL LIFE GETS BUSY'],
 ['PLAN. BUDGET. ADJUST.','TRACK YOUR PROGRESS'],
 ['STAY ACTIVE','BUILD HEALTHY HABITS']
];
export function Overlay({scene,t,duration,globalProgress,captions}:{scene:number;t:number;duration:number;globalProgress:number;captions:boolean}){
 const words=narration[scene].split(' '),count=3,chunkIndex=Math.min(Math.ceil(words.length/count)-1,Math.floor(t/duration*Math.ceil(words.length/count)));
 const phrase=words.slice(chunkIndex*count,chunkIndex*count+count).join(' ');
 let title=topMessages[scene][t/duration>.5?1:0];
 let sub='';
 if(scene===2){if(t/duration>.6){title='SPORTUP • ADULT SOCIAL';sub='WHEN I TURN 18 · 18+ ONLY';}else{sub='YEARS 11–12 · UNDER 18';}}
 if(scene===3){sub=t/duration<.5?'1 junior game / week + 30–45 min practice':'Shoes · sportswear · fees · transport · family support';}
 if(scene===6&&t/duration>.5)sub='Moderate-to-vigorous activity · ages 5–17';
 if(scene===8)sub=t/duration<.45?'Study first • plan lifts with a parent/carer':'Attendance + fitness + wellbeing';
 const entrance=smooth(t/.3);
 return <>
 <div style={{position:'absolute',inset:0,background:'linear-gradient(180deg,rgba(13,23,40,.22),transparent 28%,transparent 72%,rgba(13,23,40,.32))'}}/>
 <div style={{position:'absolute',left:55,right:55,top:94,textAlign:'center',transform:`translateY(${(1-entrance)*-35}px)`,opacity:entrance}}>
 <div style={{display:'inline-block',background:scene===7?'#e95d56':'#ffcf4d',color:'#201d28',padding:'15px 24px',border:'5px solid #251b24',borderRadius:15,fontSize:scene===8?44:46,lineHeight:1.08,fontWeight:950,boxShadow:'0 7px 0 #251b24',transform:'rotate(-1deg)'}}>{title}</div>
 {sub&&<div style={{marginTop:20,color:'white',fontSize:32,lineHeight:1.2,fontWeight:900,WebkitTextStroke:'1.5px #1d2130',paintOrder:'stroke fill',textShadow:'0 3px 3px #111'}}>{sub}</div>}
 </div>
 {scene===8&&t/duration>.5&&t/duration<.84&&<div style={{position:'absolute',left:80,right:80,top:330,padding:23,borderRadius:16,background:'#fffae6ed',border:'4px solid #29222a',fontSize:29,fontWeight:750,lineHeight:1.35,textAlign:'center'}}>Clippers listed season: $255 early / $290 late<br/>BQ $91.47 + BA $5.50 if due; processing extra.<br/>Check future fees with a parent/carer.</div>}
 {scene===6&&t/duration>.55&&<div style={{position:'absolute',left:70,right:70,top:330,textAlign:'center',fontWeight:900,color:'#fff9d6',fontSize:36,WebkitTextStroke:'2px #29222a',paintOrder:'stroke fill'}}>Basketball is part of the daily goal.</div>}
 {captions&&<div style={{position:'absolute',left:60,right:60,top:1435,textAlign:'center',fontSize:68,lineHeight:1.12,fontWeight:950,color:'white',WebkitTextStroke:'8px #211a22',paintOrder:'stroke fill',textShadow:'0 6px 0 #211a22'}}>{phrase}</div>}
 {scene===9&&t>duration-6&&<div style={{position:'absolute',bottom:180,left:65,right:65,padding:24,textAlign:'center',color:'white',background:'#182331d9',borderRadius:18,fontSize:26,lineHeight:1.45}}>
 <strong>SOURCES · 11 NOV 2026</strong><br/>sportupsunshine.com.au/faq · 18+<br/>clippersbasketball.com.au/junior-basketball<br/>health.gov.au · activity guidelines ages 5–17
 </div>}
 <div style={{position:'absolute',left:0,bottom:0,width:1080*globalProgress,height:7,background:'#ffcf4d'}}/>
 </>;
}
