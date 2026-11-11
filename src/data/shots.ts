import {DEFAULT_BOUNDARIES} from './timeline';
export type Shot={kind:string;env:string;start:number;end:number;label?:string};
const shot=(kind:string,env:string,start:number,end:number,label?:string):Shot=>({kind,env,start,end,label});
export const shots:Shot[]=[
shot('clock','bedroom',0,2.5),shot('homework','bedroom',2.5,6),shot('overwhelmed','bedroom',6,10,'MORE SCHOOL. LESS TIME?'),
shot('ball-roll','hall',10,11.6),shot('catch-idea','hall',11.6,14,'THE GAME PLAN'),
shot('future-game','adultgym',14,18,'SPORTUP · THE LONG-TERM GOAL'),shot('future-mates','adultgym',18,23),
shot('age-gate','hall',23,27,'18+ ONLY'),shot('junior-arrival','gym',27,31,'SUNCOAST CLIPPERS'),shot('junior-practice','gym',31,35,'JUNIOR BASKETBALL'),shot('pathway','street',35,38,'JUNIORS NOW → SPORTUP AT 18'),
shot('calendar','bedroom',38,42,'1 GAME + 1 PRACTICE'),shot('driveway-dribble','street',42,46),shot('kit','gym',46,50),shot('school-walk','hall',50,54),
shot('drive','gym',54,56.2),shot('pass','gym',56.2,58.2),shot('score','gym',58.2,61),
shot('decompress','park',61,65),shot('confidence','street',65,69),shot('mates','beach',69,73),
shot('purpose','beach',73,77,'PURPOSE. BELONGING.'),shot('jog','park',77,82),shot('rope','park',82,86,'60 MINUTES EVERY DAY'),shot('water','park',86,89),
shot('bus','rain',89,91.5),shot('costs','bedroom',91.5,93.7),shot('tired','bedroom',93.7,96),
shot('replan','bedroom',96,100),shot('carpool','street',100,104),shot('budget','bedroom',104,108),shot('track','park',108,111),shot('progress','park',111,114),
shot('pack','bedroom',114,118),shot('final-drive','gym',118,121.5),shot('final-score','gym',121.5,125),shot('final-team','beach',125,130,'STAY ACTIVE. STAY CONNECTED.')
];
export function shotAt(scene:number,t:number,duration:number){
 const nominal=DEFAULT_BOUNDARIES[scene]+t/duration*(DEFAULT_BOUNDARIES[scene+1]-DEFAULT_BOUNDARIES[scene]);
 const index=Math.max(0,shots.findIndex(s=>nominal>=s.start&&nominal<s.end));
 const item=shots[index];return {...item,index,time:nominal-item.start,progress:(nominal-item.start)/(item.end-item.start),nominal};
}
