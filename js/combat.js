/* HeranÃ§a de Cinzas Â· Combate, poderes, promoÃ§Ã£o de prestÃ­gio e mortes. */
'use strict';
/* ---------- combate ---------- */
function shoot(x,y,tg,dmg,src){const col=src&&src.ent==='u'?src.t.bolt||null:null;G.proj.push({x,y,tg,dmg,src,spd:col?280:360,a:0,col});}
function attack(a,tg){a.swingT=.25;if(a.t.ranged)shoot(a.x,a.y-10,tg,a.atk,a);else hit(a,tg,a.atk);}
function hit(src,tg,dmg,noSplash){
  if(tg.dead)return;const st=src&&src.ent==='u'?src.t:null;let d=dmg;
  if(st&&tg.ent==='u'&&tg.mon){if(st.undeadMul&&tg.t.undead)d*=st.undeadMul;if(st.crit&&!noSplash&&Math.random()<st.crit){d*=3;floatT(tg.x,tg.y-24,'Critico!',PAL.e5);}}
  if(tg.ent==='u'&&tg.t.armor)d*=1-tg.t.armor;
  if(st&&st.drain&&src.hp>0&&!src.dead)src.hp=Math.min(src.maxHp,src.hp+d*st.drain);
  tg.hp-=d;tg.hitT=.15;if(tg.ent==='lair')tg.alarm=4;
  burst(tg.x,tg.ent==='u'?tg.y-9:tg.y-12,tg.ent==='u'&&tg.mon?PAL.g6:PAL.e4,3);
  if(tg.ent==='u'&&tg.hero&&!tg.t.minion&&tg.state==='idle'&&src&&src.ent==='u'){tg.state='fight';tg.target=src;}
  if(st&&!noSplash&&tg.ent!=='b'&&(st.splash||st.cleave)){const r=st.splash||16,f=st.cleave||.5;
    for(const o of G.units){if(o===tg||o.dead||o.inside||!o.mon)continue;if(dist(o,tg)<=r)hit(src,o,dmg*f,true);}
    if(st.splash)for(let i=0;i<10;i++)part(tg.x,tg.y-8,rnd(-50,50),rnd(-50,20),.4,st.bolt||PAL.e4,1,'spark');}
  if(tg.hp<=0){if(tg.ent==='u')killU(tg,src);else if(tg.ent==='lair')killLair(tg,src);else destroyB(tg);}
}
function gainXp(h,x){if(h.t.minion)return;h.xp+=x;while(h.xp>=h.lvl*25){h.xp-=h.lvl*25;h.lvl++;h.maxHp=Math.round(h.maxHp*1.15);h.atk*=1.12;h.hp=h.maxHp;floatT(h.x,h.y-26,'Nivel '+h.lvl,PAL.y2);burst(h.x,h.y-10,PAL.y2,10);}checkPromo(h);}
function guildOf(cls){return G.buildings.find(b=>!b.dead&&BD[b.kind].cls===cls&&b.prestige)||null;}
function checkPromo(h){if(h.dead||h.t.tier!==1||h.lvl<PROMO_LVL)return;const g=guildOf(h.type);if(g)promote(h,g.prestige);}
function promote(h,p){const o=h.t,n=UT[p];h.type=p;h.t=n;h.maxHp=Math.round(h.maxHp*n.hp/o.hp);h.hp=h.maxHp;h.atk+=n.atk-o.atk;
  burst(h.x,h.y-10,PAL.y2,22);floatT(h.x,h.y-30,n.name+'!',PAL.y2);msg(PROMO_MSG[p](h.name),'good');if(sel===h)portraitFor=null;rosterSig='';}
function choosePrestige(){const pp=G.pendPres;if(!pp||pp.b.dead||pp.b.prestige)return;if(G.gold<PRES_COST){msg('Falta ouro pro prestígio.','bad');return;}
  G.gold-=PRES_COST;pp.b.prestige=pp.p;G.pendPres=null;const b=pp.b;burst(b.x,baseY(b)-30,PAL.y2,30);G.shake=3;portraitFor=null;
  msg(`${BD[b.kind].name} virou ${PRES_GUILD[pp.p]}. Heróis daqui viram ${UT[pp.p].name} no nível ${PROMO_LVL}.`,'good');
  for(const u of G.units)if(u.hero&&!u.dead&&u.type===BD[b.kind].cls)checkPromo(u);}
function payBounty(e,src,label){if(!e.bounty)return;
  if(src&&src.ent==='u'&&src.hero){src.gold+=e.bounty;msg(`${src.name} levou a recompensa de ${e.bounty} pelo ${label}.`,'good');}
  else{const back=Math.floor(e.bounty*.9);G.gold+=back;msg(`Ninguém cobrou a recompensa. Voltaram ${back} de ouro. O bispo ficou com o resto.`);}e.bounty=0;}
function killU(u,src){
  if(u.dead)return;u.dead=true;leaveB(u);if(u.field){u.field.claim=null;u.field=null;}if(sel===u)select(null);
  if(u.t.minion){burst(u.x,u.y-6,u.type==='servo'?PAL.z0:PAL.n3,8);return;}
  if(src&&src.ent==='u'&&src.t.minion)src=src.owner&&!src.owner.dead?src.owner:null;
  if(u.mon){G.stats.monDead++;burst(u.x,u.y-6,PAL.g6,8);
    if(src&&src.ent==='u'&&src.hero){src.gold+=u.t.gold;src.kills++;gainXp(src,u.t.xp);floatT(src.x,src.y-24,'+'+u.t.gold,PAL.y2);
      if(src.type==='fazendeiro'&&src.kills===1)msg(`O fazendeiro matou um ${u.t.name.toLowerCase()}. Vai contar essa história até morrer. Ou seja, logo.`,'good');}
    if(!u.t.boss&&!u.t.beast){const nc=nearest(G.units,u,160,x=>x.type==='necromancer');
      if(nc&&Math.random()<nc.t.raise&&G.units.filter(x=>x.owner===nc&&!x.dead).length<4){addU('servo',u.x,u.y,{owner:nc,life:30,name:'Servo de '+nc.name.split(' ')[0]});burst(u.x,u.y-6,PAL.z0,10);
        if(!G.raiseMsg){G.raiseMsg=true;msg(`${nc.name} levantou um morto pra lutar do seu lado. Sem salário.`,'good');}}}
    payBounty(u,src,u.t.boss?'seu avô':u.t.name.toLowerCase());if(u.t.boss){msg('O Avô caiu. De novo. Ninguém chorou desta vez.','good');G.shake=6;}}
  else if(u.worker){burst(u.x,u.y-6,PAL.b1,8);G.stats.peasantDead++;if(G.time>G.peasantMsgT){G.peasantMsgT=G.time+15;msg(pick(PEASANT_DEATH),'bad');}}
  else{burst(u.x,u.y-6,PAL.b1,10);
    if(u.type==='fazendeiro'){const c=casa();c.hp=Math.max(1,c.hp-Math.round(c.maxHp*.2));msg('O fazendeiro voltou pra casa em pedaços. A casa sentiu.','bad');}
    else{G.stats.heroDead++;msg(pick(DEATH)(u.name),'bad');G.fallen.unshift({name:u.name,cls:u.t.name,lvl:u.lvl,how:`Morreu no dia ${G.nightsDone+1}`,type:u.type});}}
}
function killLair(l,src){if(l.dead)return;l.dead=true;l.hp=0;burst(l.x,l.y,PAL.e4,30);G.shake=5;if(src&&src.ent==='u'&&src.hero)gainXp(src,60);
  payBounty(l,src,l.name.toLowerCase());msg(`${l.name} destruído. Os ataques vão diminuir. Não vão parar.`,'good');if(sel===l)select(null);}
function destroyB(b){if(b.dead)return;b.dead=true;G.buildings=G.buildings.filter(x=>x!==b);burst(b.x,b.y-10,PAL.e4,24);G.shake=4;
  for(const h of b.inside.slice()){h.inside=null;killU(h,null);}b.inside=[];if(sel===b)select(null);
  if(b.kind==='casa'){endGame(false);return;}msg(isField(b)?'Um campo foi pisoteado até virar estrada.':`${BD[b.kind].name} foi destruída.`,'bad');}
function enterB(h,b){h.inside=b;b.inside.push(h);h.x=b.x;h.y=baseY(b)+4;}
function leaveB(h){if(h.inside){h.inside.inside=h.inside.inside.filter(x=>x!==h);h.inside=null;}}

