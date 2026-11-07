/* HeranÃ§a de Cinzas Â· InteligÃªncia dos herÃ³is, invocaÃ§Ãµes, camponeses e monstros. */
'use strict';
/* ---------- IA ---------- */
function moveTo(u,tx,ty,spd,dt){const dx=tx-u.x,dy=ty-u.y,d=Math.hypot(dx,dy);
  if(d>1.5){const s=Math.min(d,spd*dt);u.x+=dx/d*s;u.y+=dy/d*s;u.moving=true;if(Math.abs(dx)>.5)u.face=dx<0?-1:1;}return d;}
function restPlace(h){return findB('taverna',h)||casa();}
const gearCost=h=>25+h.gear*25;
function patrolPt(h,r){const base=h.home&&!h.home.dead?h.home:casa();r=r||(h.t.ranged?320:h.type==='fazendeiro'?120:190);
  const a=Math.random()*Math.PI*2,d=Math.random()*r;return {x:clamp(base.x+Math.cos(a)*d,30,W-30),y:clamp(base.y+Math.sin(a)*d*.8,80,H-30)};}
function bestBounty(h){let best=null,bv=-1e9;
  const consider=e=>{if(e.dead||!e.bounty)return;const danger=e.ent==='lair'?4:e.t&&e.t.boss?6:1;
    const need=6*danger*(h.trait==='Ganancioso'?2.5:1)/(1+(h.lvl-1)*.3);if(e.bounty<need)return;const v=e.bounty/need-dist(h,e)/1500;if(v>bv){bv=v;best=e;}};
  for(const u of G.units)if(u.mon)consider(u);for(const l of G.lairs)consider(l);return best;}
function heroThink(h){
  if(h.state==='flee'&&h.dest&&!h.dest.dead)return;
  const fleeAt=h.trait==='Covarde'?.55:(h.trait==='Valente'||h.trait==='Teimoso')?-1:.28;
  if(h.hp<h.maxHp*fleeAt){h.state='flee';h.goal='rest';h.dest=restPlace(h);h.target=null;return;}
  if(h.type==='fazendeiro'&&h.life<=0){h.state='go';h.goal='home';h.dest=casa();h.target=null;return;}
  if(h.trait==='Bêbado'&&isNight()){const tv=findB('taverna',h);if(tv){if(!(h.state==='go'&&h.goal==='drink')){h.state='go';h.goal='drink';h.dest=tv;h.target=null;}return;}}
  if(h.state==='fight'&&h.target&&!h.target.dead&&(h.target.bounty>0||dist(h,h.target)<(isNight()?230:420)))return;
  const aggro=isNight()?(h.t.ranged?175:130):(h.type==='fazendeiro'?200:400);
  const e=nearest(G.units,h,aggro,u=>u.mon);if(e){h.state='fight';h.target=e;return;}
  const b=bestBounty(h);if(b){h.state='fight';h.target=b;return;}
  if(h.state==='go')return;
  const f=findB('forja',h);if(f&&!isNight()&&h.gold>=gearCost(h)&&h.type!=='fazendeiro'){h.state='go';h.goal='shop';h.dest=f;return;}
  const tv=findB('taverna',h);if(tv&&!isNight()&&h.gold>=6&&h.hp<h.maxHp*.8&&h.type!=='fazendeiro'){h.state='go';h.goal='rest';h.dest=tv;return;}
  if(h.state!=='idle'){h.state='idle';h.wp=null;h.target=null;}
}
function arrive(h,b){
  if(h.goal==='rest'){enterB(h,b);h.state='rest';}
  else if(h.goal==='drink'){enterB(h,b);h.state='drink';}
  else if(h.goal==='shop'){const c=gearCost(h);if(h.gold>=c){h.gold-=c;G.gold+=c;G.stats.earned+=c;h.gear++;h.atk+=2;h.maxHp+=8;h.hp+=8;
      floatT(b.x,baseY(b)-44,'+'+c+' ouro',PAL.y2);floatT(h.x,h.y-24,'Equip '+h.gear,PAL.g7);}h.state='idle';h.wp=null;}
  else if(h.goal==='home'){h.dead=true;if(sel===h)select(null);
    msg(h.kills?`O fazendeiro voltou pra casa com ${h.kills} ${h.kills===1?'vitória':'vitórias'} e um joelho a menos.`:'O fazendeiro voltou pra casa. Inteiro, desta vez.');}
  h.goal=null;
}
function tavernPay(h,b){if(b.kind!=='taverna')return;h.eatT=(h.eatT||0)+1;
  if(G.trigo>0&&h.gold>=3&&h.eatT>=3){h.eatT=0;G.trigo--;h.gold-=3;G.gold+=3;G.stats.earned+=3;floatT(b.x,baseY(b)-50,'+3',PAL.y2);}
  else if(h.gold>0){h.gold--;G.gold++;G.stats.earned++;}}
function heroUpdate(h,dt){
  if(h.type==='fazendeiro')h.life-=dt;
  if(h.inside){const b=h.inside;h.payT=(h.payT||0)+dt;
    if(h.state==='rest'){const tav=b.kind==='taverna';h.hp=Math.min(h.maxHp,h.hp+(tav?10:4)*dt);if(tav&&h.payT>=1.5){h.payT=0;tavernPay(h,b);}if(h.hp>=h.maxHp*.97){leaveB(h);h.state='idle';h.wp=null;}}
    else if(h.state==='drink'){if(h.payT>=2.5){h.payT=0;tavernPay(h,b);}if(!isNight()){leaveB(h);h.state='idle';h.wp=null;}}
    else{leaveB(h);h.state='idle';}return;}
  h.think-=dt;if(h.think<=0){h.think=.4+Math.random()*.2;heroThink(h);}
  if(h.t.regen&&h.hp<h.maxHp)h.hp=Math.min(h.maxHp,h.hp+h.t.regen*dt);
  if(h.t.heal){h.healT=(h.healT||0)-dt;if(h.healT<=0){h.healT=h.t.healCd||2.2;const amt=Math.round(h.t.heal+h.lvl*3);
    const fx=a=>{a.hp=Math.min(a.maxHp,a.hp+amt);floatT(a.x,a.y-22,'+'+amt,PAL.z0);for(let i=0;i<6;i++)part(a.x+rnd(-5,5),a.y-8,0,rnd(-30,-15),.7,PAL.z0,1,'spark');};
    if(h.t.aoeHeal){let any=false;for(const a of G.units){if(a.dead||a.inside||!(a.hero||a.worker)||a.hp>=a.maxHp*.95||dist(a,h)>100)continue;fx(a);any=true;}if(!any)h.healT=.5;}
    else{const a=nearest(G.units,h,120,u=>(u.hero||u.worker)&&u.hp<u.maxHp*.85);if(a)fx(a);else h.healT=.5;}}}
  if(h.t.summons){h.sumT=(h.sumT===undefined?3:h.sumT)-dt;
    if(h.sumT<=0){const mine=G.units.filter(x=>x.owner===h&&!x.dead&&x.type==='espirito').length;
      if(mine<h.t.summons&&(isNight()||nearest(G.units,h,260,u=>u.mon))){h.sumT=12;addU('espirito',h.x+rnd(-10,10),h.y+6,{owner:h,life:25,name:'Cão Espectral'});burst(h.x,h.y-6,PAL.n3,12);}else h.sumT=1;}}
  const spd=h.t.spd*(1+h.gear*.03);
  if(h.state==='fight'){const tg=h.target;if(!tg||tg.dead){h.target=null;h.state='idle';h.think=0;return;}
    const r=h.t.range+(tg.ent==='lair'?tg.r*.7:0),d=dist(h,tg);if(d>r)moveTo(h,tg.x,tg.y,spd,dt);else{h.face=tg.x<h.x?-1:1;if(h.cd<=0){h.cd=h.t.cd;attack(h,tg);}}}
  else if(h.state==='flee'||h.state==='go'){const b=h.dest;if(!b||b.dead){h.state='idle';h.think=0;return;}if(moveTo(h,b.x,baseY(b)+5,spd*(h.state==='flee'?1.15:1),dt)<6)arrive(h,b);}
  else{if(h.waitT>0){h.waitT-=dt;return;}if(!h.wp)h.wp=patrolPt(h,isNight()?null:(h.type==='fazendeiro'?120:380));
    if(moveTo(h,h.wp.x,h.wp.y,spd*.55,dt)<5){h.wp=null;h.waitT=.6+Math.random()*1.5;}}
}
function minionUpdate(m,dt){
  m.life-=dt;const o=m.owner;
  if(m.life<=0||!o||o.dead){m.dead=true;burst(m.x,m.y-6,m.type==='servo'?PAL.z0:PAL.n3,10);if(sel===m)select(null);return;}
  m.think-=dt;if(m.think<=0){m.think=.4;const e=nearest(G.units,m,240,u=>u.mon);if(e){m.state='fight';m.target=e;}else{m.state='idle';m.target=null;}}
  const tg=m.target;
  if(m.state==='fight'&&tg&&!tg.dead){if(dist(m,tg)>m.t.range)moveTo(m,tg.x,tg.y,m.t.spd,dt);else{m.face=tg.x<m.x?-1:1;if(m.cd<=0){m.cd=m.t.cd;attack(m,tg);}}}
  else{const ox=o.inside?o.inside.x:o.x,oy=o.inside?baseY(o.inside)+8:o.y,tx=ox+(m.id%2?14:-14),ty=oy+6;if(Math.hypot(m.x-tx,m.y-ty)>10)moveTo(m,tx,ty,m.t.spd*.8,dt);}
}
function workerThink(w){
  if(workersHide()){if(w.state!=='home'){if(w.field){w.field.claim=null;w.field=null;}w.state='home';w.dest=w.home&&!w.home.dead?w.home:casa();}return;}
  const threat=nearest(G.units,w,75,u=>u.mon);
  if(threat){if(w.state!=='flee'){if(w.field){w.field.claim=null;w.field=null;}w.state='flee';w.dest=dropPoint(w);}return;}
  if(w.state==='flee')return;
  if(w.carry){if(w.state!=='carry'){w.state='carry';w.dest=dropPoint(w);}return;}
  if(w.state==='toField'&&w.field&&!w.field.dead&&w.field.g>=1&&w.field.claim===w)return;
  let best=null,bd=1e9;for(const b of G.buildings){if(!isField(b)||b.g<1||b.dead)continue;if(b.claim&&b.claim!==w&&!b.claim.dead&&b.claim.field===b)continue;const d=dist(w,b);if(d<bd){bd=d;best=b;}}
  if(best){best.claim=w;w.field=best;w.state='toField';w.workT=0;return;}
  if(w.state!=='idle'){w.state='idle';w.wp=null;}
}
function workerUpdate(w,dt){
  if(w.inside){w.hideT=(w.hideT||0)-dt;if(!workersHide()&&w.hideT<=0){leaveB(w);w.state='idle';w.wp=null;w.think=0;}return;}
  w.think-=dt;if(w.think<=0){w.think=.35+Math.random()*.2;workerThink(w);}
  const spd=w.t.spd*(w.carry?.85:1);
  if(w.state==='toField'){const f=w.field;if(!f||f.dead||f.g<1){if(f&&f.claim===w)f.claim=null;w.field=null;w.state='idle';w.think=0;return;}
    if(moveTo(w,f.x,f.y,spd,dt)<10){w.workT=(w.workT||0)+dt;if(Math.random()<.1)w.swingT=.25;
      if(w.workT>=1.4){w.workT=0;const c=fieldYield(f);w.carry=c;f.g=0;f.ripeT=0;f.claim=null;w.field=null;burst(f.x,f.y,cropColor(c.crop),5);w.state='carry';w.dest=dropPoint(w);}}}
  else if(w.state==='carry'||w.state==='home'||w.state==='flee'){let b=w.dest;if(!b||b.dead){b=w.dest=w.state==='home'?casa():dropPoint(w);}
    if(moveTo(w,b.x,baseY(b)+5,spd*(w.state==='flee'?1.25:1),dt)<6){if(w.carry){deposit(w.carry,b);w.carry=null;}
      if(w.state==='home'||w.state==='flee'){enterB(w,b);w.hideT=w.state==='flee'?6:0;w.state='rest';}else{w.state='idle';w.wp=null;w.think=0;}}}
  else{if(w.waitT>0){w.waitT-=dt;return;}if(!w.wp)w.wp=patrolPt(w,90);if(moveTo(w,w.wp.x,w.wp.y,spd*.45,dt)<5){w.wp=null;w.waitT=1+Math.random()*2;}}
}
function monThink(m){
  if(m.t.beast){const p=nearest(G.units,m,420,u=>u.hero||u.worker);if(p){m.target=p;return;}
    if(m.target&&!m.target.dead&&m.target.ent==='b')return;let best=null,bd=650;for(const b of G.buildings){if(!isField(b))continue;const d=dist(m,b);if(d<bd){bd=d;best=b;}}m.target=best;return;}
  const cursed=nearest(G.units,m,170,u=>u.hero&&u.trait==='Amaldiçoado');const h=cursed||nearest(G.units,m,m.t.boss?90:115,u=>u.hero||u.worker);
  if(h){m.target=h;return;}if(m.target&&m.target.ent==='b'&&!m.target.dead)return;if(m.t.boss){m.target=casa();return;}
  let best=null,bd=1e9;for(const b of G.buildings){if(m.type==='strigoi'&&isField(b))continue;const d=dist(m,b)*(isField(b)?.8:1);if(d<bd){bd=d;best=b;}}m.target=best;
}
function monUpdate(m,dt,dark){
  if(m.t.burns&&dark<.35){m.hp-=12*dt;if(Math.random()<.35)part(m.x+rnd(-3,3),m.y-10,rnd(-6,6),rnd(-30,-15),.9,Math.random()<.5?PAL.e4:PAL.e5,1,'spark');
    if(m.hp<=0){killU(m,null);if(!G.sunMsg){G.sunMsg=true;msg('Os strigoi pegaram sol. Cheiro de churrasco.','good');}return;}}
  m.think-=dt;if(m.think<=0){m.think=.5+Math.random()*.3;monThink(m);}
  const tg=m.target;
  if(!tg||tg.dead||tg.inside){m.think=Math.min(m.think,.3);
    if(m.t.beast){if(!m.wp||dist(m,m.wp)<8)m.wp={x:clamp(m.x+rnd(-200,200),30,W-30),y:clamp(m.y+rnd(-150,150),90,H-30)};moveTo(m,m.wp.x,m.wp.y,m.t.spd*.4,dt);}return;}
  const isB=tg.ent==='b';const d=isB?rectDist(m,tg):dist(m,tg);const rng=m.t.range*(m.t.boss?1.4:1);
  if(d>rng){const tx=isB?clamp(m.x,tg.x-tg.w/2,tg.x+tg.w/2):tg.x,ty=isB?clamp(m.y,tg.y-tg.dd/2,tg.y+tg.dd/2):tg.y;moveTo(m,tx,ty,m.t.spd,dt);}
  else{m.face=tg.x<m.x?-1:1;if(m.cd<=0){m.cd=m.t.cd;m.swingT=.25;hit(m,tg,m.atk);}}
}

