import {AnimatedText} from './AnimatedText';
import {narration} from '../data/narration';
import {palette} from './Geometry';
import {clamp,smooth} from '../animations/math';
const P=palette;
const titles=[
 ['THE SENIOR SCHOOL SQUEEZE','MORE SCHOOL.','LESS FREE TIME?'],
 ['A PLAN THAT MOVES','THE GAME PLAN','Basketball + wellbeing'],
 ['SUNSHINE COAST, QUEENSLAND','START JUNIOR.','GO SOCIAL AT 18.'],
 ['MAKE ROOM FOR MOVEMENT','A WEEK','THAT WORKS.'],
 ['MOVE WITH A PURPOSE','RUN. PASS.','GET STRONGER.'],
 ['A RESET WITH YOUR MATES','LESS STRESS.','MORE CONNECTION.'],
 ['MORE THAN A SCORE','BELONGING.','PURPOSE. HABITS.'],
 ['REAL LIFE STILL HAPPENS','WHAT COULD','GET IN THE WAY?'],
 ['PLAN IT. CHECK IT. ADJUST IT.','MAKE IT','ACHIEVABLE.'],
 ['SENIOR SCHOOL & BEYOND','STAY ACTIVE.','STAY CONNECTED.'],
];
const labelStyle={fontSize:22,fontWeight:800,letterSpacing:2.4,color:P.teal};
export function Overlay({scene,t,duration,globalProgress,captions}:{scene:number;t:number;duration:number;globalProgress:number;captions:boolean}) {
 const title=titles[scene];
 const words=narration[scene].split(' ');
 const chunks:string[]=[];for(let i=0;i<words.length;i+=12) chunks.push(words.slice(i,i+12).join(' '));
 const chunk=chunks[Math.min(chunks.length-1,Math.floor(t/duration*chunks.length))];
 const detail=(text:string,n=0,color:string=P.ink)=><AnimatedText key={text} t={t} delay={.65+n*.14} style={{fontSize:28,lineHeight:1.35,marginTop:18,color,fontWeight:650}}>{text}</AnimatedText>;
 return <>
 <div style={{position:'absolute',left:88,top:60,right:88,display:'flex',justifyContent:'space-between',alignItems:'center'}}>
  <div style={{fontSize:20,fontWeight:900,letterSpacing:3,color:P.ink}}>THE GAME PLAN <span style={{color:P.teal,marginLeft:22,fontWeight:500}}>HPE / YEARS 11–12</span></div>
  <div style={{fontSize:20,fontWeight:700,color:'#718082'}}>SUNSHINE COAST <span style={{marginLeft:20,color:P.ink}}>{String(scene+1).padStart(2,'0')} / 10</span></div>
 </div>
 <div style={{position:'absolute',left:88,top:169,width:640}}>
  <AnimatedText t={t} style={labelStyle}>{title[0]}</AnimatedText>
  <AnimatedText t={t} delay={.12} style={{fontSize:scene===2?64:72,lineHeight:1.02,fontWeight:950,letterSpacing:-3,marginTop:24,color:P.ink}}>{title[1]}<br/><span style={{color:scene===7?P.red:P.teal}}>{title[2]}</span></AnimatedText>
  {scene===0&&<>{detail('Homework. Exams. Less spare time.')}{detail('My goal: keep moving through it.',1)}</>}
  {scene===1&&<>{detail('An achievable local activity plan.')}{detail('Real movement. Real people.',1)}</>}
  {scene===2&&<div style={{marginTop:30}}>
   <div style={{padding:'18px 22px',borderLeft:`6px solid ${P.teal}`,background:'#fffdf7ed',borderRadius:8}}>
    <div style={{fontSize:25,fontWeight:900}}>YEARS 11 & 12 · UNDER 18</div>
    <div style={{fontSize:30,fontWeight:800,marginTop:6}}>Suncoast Clippers</div><div style={{fontSize:24}}>Junior community basketball</div>
   </div>
   <div style={{fontSize:32,color:P.teal,padding:'6px 20px'}}>↓ When I turn 18</div>
   <div style={{padding:'18px 22px',borderLeft:`6px solid ${P.blue}`,background:'#fffdf7ed',borderRadius:8}}>
    <div style={{fontSize:25,fontWeight:900}}>ADULTS · 18+ ONLY</div><div style={{fontSize:30,fontWeight:800,marginTop:6}}>SportUP Sunshine Coast</div><div style={{fontSize:24}}>Adult social basketball</div>
   </div>
   <div style={{fontSize:21,marginTop:15,color:'#5d7179'}}>Separate organisations · check junior places first</div>
  </div>}
  {scene===3&&<>
   <div style={{marginTop:30,display:'flex',gap:8}}>
    {['M','T','W','T','F','S','S'].map((d,i)=><div key={i} style={{width:68,background:i===2||i===5?P.teal:'#e1e5dd',color:i===2||i===5?P.white:P.ink,padding:'13px 0',textAlign:'center',borderRadius:9,transform:`translateY(${Math.sin(t*2-i)*3}px)`}}><div style={{fontSize:20}}>{d}</div><div style={{fontSize:18,fontWeight:800,marginTop:12}}>{i===2?'GAME':i===5?'PLAY':'MOVE'}</div></div>)}
   </div>
   {detail('1 organised junior game / week',0)}
   {detail('1 extra practice · around 30–45 min',1)}
   {detail('Daily movement + schoolwork balance',2)}
   <div style={{fontSize:21,marginTop:18,lineHeight:1.4}}>Shoes · sportswear · ball · water<br/>Allow about 60–90 min + travel for a game.<br/>Example days; actual fixtures set by the club.</div>
  </>}
  {scene===4&&<>
   {['FITNESS','COORDINATION','STAMINA','MOVEMENT SKILLS'].map((s,i)=><AnimatedText key={s} t={t} delay={i*.6+.6} style={{fontSize:28,fontWeight:800,marginTop:22,display:'flex',gap:14,alignItems:'center'}}><span style={{width:12,height:12,borderRadius:12,background:P.orange}}/>{s}</AnimatedText>)}
  </>}
  {scene===5&&<>
   {detail('MENTAL · stress & concentration')}
   {detail('EMOTIONAL · confidence & mood',1)}
   {detail('SOCIAL · friendship & teamwork',2)}
   <svg width="520" height="95" style={{marginTop:30}} viewBox="0 0 520 95"><path d="M5 70 C90 5 120 95 190 48 S300 18 355 45 S440 65 510 28" fill="none" stroke={P.teal} strokeWidth="6" strokeDasharray="600" strokeDashoffset={600*(1-smooth(t/3))}/><circle cx="510" cy="28" r="9" fill={P.orange}/></svg>
  </>}
  {scene===6&&<>
   {t<duration*.43?<>{detail('Spiritual wellbeing: purpose, belonging')}{detail('Commitment + personal achievement',1)}</>:<>
    <div style={{display:'flex',alignItems:'baseline',gap:18,marginTop:25}}><strong style={{fontSize:108,color:P.teal,letterSpacing:-5}}>60</strong><span style={{fontSize:36,fontWeight:800}}>MIN / DAY</span></div>
    <div style={{fontSize:25,lineHeight:1.4,fontWeight:650}}>Moderate-to-vigorous activity<br/>Australian guidance · ages 5–17</div>
    <div style={{fontSize:26,lineHeight:1.4,marginTop:25}}>Basketball is one part.<br/>Keep moving on the other days too.</div>
   </>}
  </>}
  {scene===7&&<>
   <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:14,marginTop:36}}>
   {['HOMEWORK + EXAMS','TRANSPORT','FEES + EQUIPMENT','TIREDNESS'].map((s,i)=><AnimatedText key={s} t={t} delay={i*.25+.6} style={{background:'#fffdf7e8',padding:20,fontSize:24,fontWeight:800,borderTop:`4px solid ${i%2?P.teal:P.red}`,borderRadius:8}}>{s}</AnimatedText>)}
   </div>
   {detail('Plan for the difficult weeks.',4)}
  </>}
  {scene===8&&<>
   {['Plan sessions around study','Parent / carpool transport plan','Check fees + budget together','Shorter practice in exam weeks'].map((s,i)=><AnimatedText key={s} t={t} delay={i*.55+.6} style={{fontSize:26,marginTop:22,fontWeight:700}}><span style={{color:P.teal,marginRight:15}}>✓</span>{s}</AnimatedText>)}
   <div style={{fontSize:21,lineHeight:1.45,marginTop:24,padding:18,borderRadius:8,background:'#fffdf7ee'}}>
   Clippers listed season fee: $255 early / $290 late.<br/>BQ $91.47 + BA $5.50 if due; processing extra.<br/>Check current fees & age group with a parent/carer.
   </div>
   <div style={{fontSize:22,fontWeight:800,marginTop:20,color:P.teal}}>TRACK → attendance · fitness · wellbeing</div>
  </>}
  {scene===9&&<>
   {detail('BUILD HEALTHY HABITS.')}
   {detail('A realistic plan — with support and flexibility.',1)}
   {t>duration*.63&&<AnimatedText t={t-duration*.63} style={{fontSize:21,lineHeight:1.5,marginTop:28,borderTop:'2px solid #c6d0c9',paddingTop:18}}>
    <strong>SOURCES · checked 11 NOV 2026</strong><br/>
    sportupsunshine.com.au/faq · 18+<br/>
    clippersbasketball.com.au/junior-basketball<br/>
    health.gov.au · activity guidelines, ages 5–17<br/>
    Full links and qualifications in README.
   </AnimatedText>}
  </>}
 </div>
 <div style={{position:'absolute',bottom:155,left:88,color:'#64767a',fontSize:19,letterSpacing:1,fontWeight:600}}>MY PLAN · ONE GAME + ONE PRACTICE + DAILY MOVEMENT</div>
 {captions&&<div style={{position:'absolute',bottom:48,left:200,right:200,minHeight:72,display:'flex',alignItems:'center',justifyContent:'center',padding:'16px 30px',boxSizing:'border-box',borderRadius:14,color:P.white,background:P.ink,fontSize:30,lineHeight:1.25,textAlign:'center',fontWeight:550}}>{chunk}</div>}
 <div style={{position:'absolute',bottom:0,left:0,width:1920*clamp(globalProgress),height:6,background:P.teal}}/>
 </>;
}
