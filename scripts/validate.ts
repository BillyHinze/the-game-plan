import assert from 'node:assert/strict';
import {DEFAULT_BOUNDARIES,frameBoundaries,locateScene} from '../src/data/timeline';
import {twoBone,len,sub,type V3} from '../src/animations/math';
import {walkingFoot} from '../src/animations/walking';
import {runningFoot} from '../src/animations/running';
import {shotPosition,HOOP,RELEASE,FLIGHT,BALL_RADIUS,dribbleHeight} from '../src/animations/basketball';
assert.equal(DEFAULT_BOUNDARIES.length,11);
assert.equal(DEFAULT_BOUNDARIES[0],0);
assert.equal(DEFAULT_BOUNDARIES.at(-1),130);
for(const fps of [15,24,30]) {
 const b=frameBoundaries(DEFAULT_BOUNDARIES,fps);
 for(let i=0;i<10;i++) {assert(b[i+1]>b[i]);assert.equal(locateScene(b[i],b),i);assert.equal(locateScene(b[i+1]-1,b),i);}
 assert.equal(b[10],130*fps);
}
for(let frame=0;frame<3900;frame++) {
 const t=frame/30;
 for(const action of ['walk','run']) for(const side of [-1,1]) {
  const foot=action==='walk'?walkingFoot(t,side):runningFoot(t,side);
  const hipY=action==='walk'?1.01+.025*Math.cos(t*11):.84+.035*Math.sin(t*20.26);
  const hip:V3=[side*.15,hipY,0];
  assert(foot[1]>=.09-1e-8,'Foot penetrates floor');
  assert(len(sub(foot,hip))<1.06,'Unreachable foot target detaches shoe');
  const ik=twoBone(hip,foot,.53,.53,[0,0,1]);
  assert(Math.abs(len(sub(ik.joint,hip))-.53)<1e-8);
  assert(Math.abs(len(sub(ik.end,ik.joint))-.53)<1e-8);
 }
 assert(dribbleHeight(t)>=BALL_RADIUS-1e-8);
 assert.deepEqual(shotPosition(t),shotPosition(t),'Arbitrary frame must be deterministic');
}
assert.deepEqual(shotPosition(RELEASE+FLIGHT),HOOP,'Shot must cross centre of rim');
assert(shotPosition(RELEASE+FLIGHT+.01)[1]<HOOP[1]);
assert(shotPosition(RELEASE+FLIGHT-.01)[1]>HOOP[1]);
assert(BALL_RADIUS<.29-.025,'Ball must fit inside rim');
console.log('PASS: all ten scenes, 130 seconds, 15/24/30 FPS boundaries; 15,600 leg IK checks; floor, deterministic ball paths and successful hoop crossing.');
