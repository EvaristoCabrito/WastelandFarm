/* HeranÃ§a de Cinzas Â· AtualizaÃ§Ã£o do mundo a cada quadro e fim de jogo. */
'use strict';
/* ---------- atualização ---------- */
function update(dt){
  G.time+=dt;const ph=phaseOf(dayT());if(ph!==G.phase){G.phase=ph;onPhase(ph);if(G.over)return;}
  for(let i=G.spawnQ.length-1;i>=0;i--)if(G.time>=G.spawnQ[i].at){spawnFrom(G.spawnQ[i]);G.spawnQ.splice(i,1);}
  const dark=darkness();if(G.farmerCd>0)G.farmerCd-=dt;
  if(G.phase==='day'){G.wolfT-=dt;if(G.wolfT<=0){G.wolfT=rnd(28,42);spawnWolves();}}
  if(dark>.6&&Math.random()<dt/35)G.flash=.18;
  G.birdT-=dt;if(G.birdT<=0){G.birdT=rnd(14,30);const left=Math.random()<.5,y0=rnd(150,H-150),n=ri(3,7);
    for(let i=0;i<n;i++)G.birds.push({x:(left?-20:W+20)+rnd(-30,30),y:y0+rnd(-25,25),vx:(left?1:-1)*rnd(55,75),vy:rnd(-6,6),ph:Math.random()*6});}
  for(let i=G.birds.length-1;i>=0;i--){const b=G.birds[i];b.x+=b.vx*dt;b.y+=b.vy*dt+Math.sin(G.time*2+b.ph)*.3;if(b.x<-60||b.x>W+60)G.birds.splice(i,1);}
  G.smokeT-=dt;const puff=G.smokeT<=0;if(puff)G.smokeT=.3;
  for(const b of G.buildings){b.hitT=Math.max(0,b.hitT-dt);
    if(isField(b)){const rate=b.kind==='trigo'?(.5+1.5*b.heat)/35:(.45+1.1*(1-b.heat))/40;
      if(b.g<1)b.g=Math.min(1,b.g+dt*rate);else{b.ripeT+=dt;if(b.ripeT>45){b.g=0;b.ripeT=0;if(b.claim)b.claim=null;if(G.time>G.rotMsgT){msg('Um campo apodreceu no pé. Faltou camponês.','bad');G.rotMsgT=G.time+25;}}}}
    else if(b.kind==='torre'){b.cd-=dt;if(b.cd<=0){const m=nearest(G.units,b,BD.torre.range,u=>u.mon);if(m){const s=SB.torre;shoot(b.x,baseY(b)+s.wins[0].dy,m,BD.torre.dmg,b);b.cd=BD.torre.rate;}}}
    if(puff&&SB[b.kind]&&SB[b.kind].chim){const c=SB[b.kind].chim;part(b.x+c.dx+rnd(-1,1),baseY(b)+c.dy,rnd(-3,7),rnd(-20,-12),2.4,b.kind==='forja'?PAL.g2:PAL.g4,3,'smoke');
      if(b.kind==='forja'&&Math.random()<.7)part(b.x+c.dx,baseY(b)+c.dy,rnd(-10,10),rnd(-50,-30),.9,PAL.e4,1,'spark');}}
  for(const l of G.lairs){l.hitT=Math.max(0,l.hitT-dt);if(!l.dead&&l.alarm>0){l.alarm-=dt;l.defT-=dt;if(l.defT<=0){l.defT=6;spawnFrom({type:l.kind==='cemiterio'?'esqueleto':'strigoi',src:l});}}}
  G.emberT-=dt;if(G.emberT<=0&&G.lightPts.length){G.emberT=dark>.3?.05:.18;const p=pick(G.lightPts);part(p.x+rnd(-6,6),p.y,rnd(-5,5),rnd(-28,-12),1.4,Math.random()<.3?PAL.e5:PAL.e4,1,'spark');}
  for(const u of G.units){if(u.dead)continue;u.hitT=Math.max(0,u.hitT-dt);u.swingT=Math.max(0,u.swingT-dt);u.cd-=dt;u.moving=false;
    if(u.hero){if(u.t.minion)minionUpdate(u,dt);else heroUpdate(u,dt);}else if(u.worker)workerUpdate(u,dt);else monUpdate(u,dt,dark);if(u.moving)u.anim+=dt;if(G.over)return;}
  const us=G.units.filter(u=>!u.dead&&!u.inside);
  for(let i=0;i<us.length;i++){const a=us[i];for(let j=i+1;j<us.length;j++){const b=us[j];const dx=b.x-a.x,dy=b.y-a.y;if(dx>9||dx<-9||dy>9||dy<-9)continue;
    const d=Math.hypot(dx,dy)||.01;if(d<8){const p=(8-d)/2,nx=dx/d,ny=dy/d;a.x-=nx*p;a.y-=ny*p;b.x+=nx*p;b.y+=ny*p;}}}
  for(const u of us){u.x=clamp(u.x,10,W-10);u.y=clamp(u.y,30,H-10);}
  for(let i=G.proj.length-1;i>=0;i--){const p=G.proj[i],tg=p.tg;if(tg.dead){G.proj.splice(i,1);continue;}
    const ty=tg.ent==='u'?tg.y-9:tg.y-10,dx=tg.x-p.x,dy=ty-p.y,d=Math.hypot(dx,dy);
    if(d<6){G.proj.splice(i,1);hit(p.src,tg,p.dmg);if(G.over)return;continue;}p.x+=dx/d*p.spd*dt;p.y+=dy/d*p.spd*dt;p.a=Math.atan2(dy,dx);}
  G.units=G.units.filter(u=>!u.dead);
  for(let i=G.parts.length-1;i>=0;i--){const p=G.parts[i];p.life-=dt;if(p.life<=0){G.parts.splice(i,1);continue;}p.x+=p.vx*dt;p.y+=p.vy*dt;if(p.type==='spark')p.vy+=20*dt;else p.vx*=.99;}
  for(let i=G.floats.length-1;i>=0;i--){const f=G.floats[i];f.life-=dt;f.y-=12*dt;if(f.life<=0)G.floats.splice(i,1);}
}
function endGame(win){
  if(G.over)return;G.over=true;buildMode=null;refreshBar();updateHint();select(null);updateQuest();$('#roster').hidden=true;
  G.endWin=win;showScreen('end');
}

