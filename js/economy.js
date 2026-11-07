/* HeranÃ§a de Cinzas Â· Economia, pedidos do dia, jogo novo, construÃ§Ã£o, ondas e eventos. */
'use strict';
/* ---------- economia ---------- */
function newPrices(){G.price={trigo:ri(2,4),alho:ri(3,7)};}
function deposit(c,at){G[c.crop]+=c.amt;G.stats.crops+=c.amt;floatT(at.x,baseY(at)-30,`+${c.amt} ${c.crop}`,cropColor(c.crop));}
function sell(crop,n){n=Math.min(n,G[crop]);if(n<=0)return;const v=n*G.price[crop];G[crop]-=n;G.gold+=v;G.stats.sold+=v;
  const c=casa();floatT(c.x,baseY(c)-52,`+${v} ouro`,PAL.y2);burst(c.x,baseY(c)-30,PAL.y2,10);}
function workerHomes(){return [casa(),...G.buildings.filter(b=>b.kind==='casebre'&&!b.dead)];}
function refillWorkers(announce){let n=0;
  for(const h of workerHomes()){let have=G.units.filter(u=>u.worker&&u.home===h&&!u.dead).length;
    while(have<2){addU('campones',h.x+rnd(-12,12),baseY(h)+8,{home:h,name:'Camponês'});have++;n++;}}
  if(announce&&n)msg(n===1?'Chegou um camponês. Não tinha pra onde ir.':`Chegaram ${n} camponeses. Não tinham pra onde ir.`,'good');}
function dropPoint(w){let best=casa(),bd=dist(w,best);for(const h of workerHomes()){const d=dist(w,h);if(d<bd){bd=d;best=h;}}return best;}

/* ---------- pedidos do dia ---------- */
function newQuest(){
  const day=G.nightsDone+1;
  const opts=[
    {who:'O bispo',crop:'trigo',need:6+day*3,kind:'gold',fail:'O bispo não recebeu o trigo. Ficou ofendido. O cobrador vai passar.'},
    {who:'A vila vizinha',crop:'alho',need:3+day*2,kind:'gold',fail:'A vila vizinha comprou alho de outro. Ninguém liga pra você.'},
    {who:'O padre',crop:'trigo',need:5+day*2,kind:'bless',fail:'O padre rezou mesmo assim. Não adiantou nada.'},
    {who:'O ferreiro da estrada',crop:'alho',need:4+day*2,kind:'gold',fail:'O ferreiro foi embora resmungando. Vai falar mal de você na estrada.'},
    {who:'A guarda do barão',crop:'trigo',need:8+day*3,kind:'hero',fail:'A guarda do barão passou com fome. Levou uma galinha que você nem sabia que tinha.'},
  ];
  const q=Object.assign({},pick(opts));q.id=G.nextId++;if(q.kind==='gold')q.pay=Math.round(q.need*G.price[q.crop]*2+10);G.quest=q;questSig='';
}
function questReward(q){return q.kind==='gold'?`Paga ${q.pay} de ouro.`:q.kind==='bless'?'Em troca, a próxima noite vem com menos mortos.':'Em troca, manda um soldado pra você.';}
function deliverQuest(){
  const q=G.quest;if(!q||G[q.crop]<q.need)return;G[q.crop]-=q.need;G.quest=null;
  if(q.kind==='gold'){G.gold+=q.pay;G.stats.sold+=q.pay;msg(`${q.who} pagou ${q.pay} de ouro. Até sorriu. Foi estranho.`,'good');}
  else if(q.kind==='bless'){G.blessed=true;msg('O padre benzeu a fazenda. Jura que funciona.','good');}
  else{const c=casa();const h=makeHero(pick(['warrior','lancer']),c.x+20,baseY(c)+10,{home:c});msg(`A guarda do barão deixou ${h.name} com você. Traço: ${h.trait}. Sem devolução.`,'good');}
  const c=casa();burst(c.x,baseY(c)-30,PAL.y2,14);
}
let questSig='';
function updateQuest(){const el=$('#quest');const q=G&&G.quest;
  if(!q||!started||G.over||buildMode){el.hidden=true;questSig='';return;}
  el.hidden=false;const have=G[q.crop],ok=have>=q.need;const sig=q.id+':'+have+':'+ok;if(sig===questSig)return;questSig=sig;
  el.innerHTML=`<div class="qt"><b>Pedido:</b> ${q.who} quer ${q.need} de ${q.crop} até a noite. ${questReward(q)} <span class="qp">(${Math.min(have,q.need)}/${q.need})</span></div><button id="qBtn"${ok?'':' disabled'}>Entregar</button>`;}
$('#quest').addEventListener('click',e=>{if(e.target.closest('#qBtn'))deliverQuest();});

/* ---------- jogo novo ---------- */
function freshG(seed){
  return {seed,time:12,gold:100,trigo:0,alho:0,nightsDone:0,nightNum:0,phase:'day',buildings:[],units:[],lairs:[],proj:[],parts:[],floats:[],decor:[],spawnQ:[],birds:[],
    over:false,stats:{heroDead:0,peasantDead:0,monDead:0,crops:0,sold:0,earned:0},farmerCd:0,rotMsgT:0,sunMsg:false,smokeT:0,emberT:0,wolfT:45,wolfMsg:false,
    birdT:8,flash:0,shake:0,nextId:1,ghost:null,quest:null,blessed:false,taxDue:false,peasantMsgT:0,fallen:[],lastSave:0};
}
function newGame(){
  const seed=Math.floor(Math.random()*1e9),R=mulberry32(seed);
  G=freshG(seed);
  genMap(R);newPrices();
  G.casa=addB('casa',W/2,H/2);
  let best=null,bh=-1;
  for(let i=0;i<80;i++){const a=R()*Math.PI*2,r=110+R()*140;const x=W/2+Math.cos(a)*r,y=H/2+Math.sin(a)*r*.8;if(canPlace('trigo',x,y))continue;const h=heatAt(x,y);if(h>bh){bh=h;best={x,y};}}
  if(best){const f=addB('trigo',best.x,best.y);f.g=.8;}
  refillWorkers(false);
  const v=makeHero('warrior',W/2+24,H/2+44,{name:'Primo Vasile',trait:'Bêbado'});v.gold=5;
  newQuest();sel=null;buildMode=null;cam.x=W/2;cam.y=H/2+10;
  $('#log').innerHTML='';renderBar();updatePanel(true);updateHint();renderRoster(true);
}
function startPlay(){newGame();G.slot=pendingSlot||1;applyOpts(true);started=true;$('#overlay').hidden=true;msg('Seu primo Vasile veio ajudar. Ele bebe.');
  setTimeout(()=>{if(G&&!G.over)msg(`No mercado hoje: trigo a ${G.price.trigo}, alho a ${G.price.alho}. Toque no seu ouro pra vender.`,'good');},2500);}

/* ---------- construção ---------- */
function canPlace(kind,x,y){const d=BD[kind];
  if(x<d.w/2+20||x>W-d.w/2-20||y<d.d/2+80||y>H-d.d/2-20)return 'Fora do mapa';
  for(const b of G.buildings)if(Math.abs(b.x-x)<(b.w+d.w)/2+6&&Math.abs(b.y-y)<(b.dd+d.d)/2+6)return 'Tem coisa ai';
  for(const l of G.lairs)if(!l.dead&&Math.hypot(l.x-x,l.y-y)<l.r+70)return 'Perto do covil';
  return null;}
function canBuild(kind,x,y){if(G.gold<BD[kind].cost)return 'Falta ouro';return canPlace(kind,x,y);}
function tryBuild(kind,x,y){const why=canBuild(kind,x,y);if(why){floatT(x,y-16,why,PAL.e4);return;}
  const d=BD[kind];G.gold-=d.cost;const b=addB(kind,x,y);burst(b.x,b.y,PAL.g5,12);
  if(!d.field){buildMode=null;refreshBar();updateHint();select(b);}
  if(kind==='casebre')refillWorkers(true);
  if(kind==='taverna'&&!G.firstTav){G.firstTav=1;msg('A taverna abriu. Os heróis vão chegar. O Vasile já chegou.');}}
function harvestNow(b){const c=fieldYield(b);deposit(c,b);b.g=0;b.ripeT=0;b.claim=null;burst(b.x,b.y,cropColor(c.crop),8);}
function recruit(b){const d=BD[b.kind];const n=G.units.filter(u=>u.home===b&&u.hero&&!u.dead).length;
  if(n>=4){msg('O alojamento está cheio. Ninguém quer dividir cama com mercenário.');return;}
  if(G.gold<d.rc){msg('Falta ouro. Herói não trabalha de graça. Nem com.','bad');return;}
  G.gold-=d.rc;const h=makeHero(d.cls,b.x,baseY(b)+6,{home:b});msg(`${h.name} entrou pra ${d.short}. Traço: ${h.trait}.`);}
function repair(b){const c=Math.ceil((b.maxHp-b.hp)*.25);if(G.gold<c){msg('Falta ouro pro conserto.','bad');return;}G.gold-=c;b.hp=b.maxHp;burst(b.x,b.y-10,PAL.g5,8);}
function farmer(){if(G.farmerCd>0)return;const c=casa();makeHero('fazendeiro',c.x,baseY(c)+6,{name:'Você',trait:'Teimoso',life:35,home:c});G.farmerCd=60;msg('O fazendeiro saiu com o forcado. A família reza.');}
function addBounty(e,amt){if(G.gold<amt){msg('Falta ouro pra recompensa.','bad');return;}G.gold-=amt;e.bounty+=amt;floatT(e.x,e.y-34,'+'+amt+' recompensa',PAL.y2);}
function skipToNight(){if(!G||G.phase!=='day'||!started||G.over)return;G.time+=(DAY_END-1)-dayT();msg('Você chamou a noite. Ela veio.');}

/* ---------- ondas ---------- */
function scheduleWave(){
  const n=G.nightNum,fields=G.buildings.filter(isField).length,cem=G.lairs[0],nin=G.lairs[1];
  const add=(type,count,src)=>{for(let i=0;i<count;i++)G.spawnQ.push({at:G.time+1+Math.random()*30,type,src});};
  let sk=Math.round(3+n*2+fields*.4),st=Math.round(1+n*1.2+fields*.25);
  if(cem.dead)sk=Math.ceil(sk/2);if(nin.dead)st=Math.ceil(st/2);
  if(G.blessed){G.blessed=false;const cut=Math.round(sk*.4);sk-=cut;msg(`A bênção do padre funcionou: ${cut} mortos ficaram deitados.`,'good');}
  if(G.alho>0&&st>0){const used=Math.min(G.alho,Math.ceil(st*.7));G.alho-=used;const scared=Math.min(st,Math.floor(used*.8+.5));st-=scared;
    msg(`Você pendurou ${used} cabeças de alho. ${scared} strigoi desistiram.${st?' Os outros gostam de tempero.':''}`,'good');}
  add('esqueleto',sk,cem);add('strigoi',st,nin);if(n===NIGHTS)G.spawnQ.push({at:G.time+2,type:'avo',src:cem});
}
function edgePoint(){const s=Math.floor(Math.random()*4);return {x:s===0?20:s===1?W-20:rnd(40,W-40),y:s===2?80:s===3?H-20:rnd(90,H-40)};}
function spawnFrom(q){let x,y;
  if(q.src&&!q.src.dead){const a=Math.random()*Math.PI*2;x=q.src.x+Math.cos(a)*30;y=q.src.y+Math.sin(a)*20;}else{const p=edgePoint();x=p.x;y=p.y;}
  const boss=q.type==='avo';const m=addU(q.type,x,y,{hpMul:boss?1:1+.13*Math.max(0,G.nightNum-1)});m.think=0;
  if(boss){msg('Seu avô voltou do cemitério. Ele quer a fazenda de volta.','bad');G.shake=6;}}
function spawnWolves(){const alive=G.units.filter(u=>u.type==='lobo').length;if(alive>=8)return;
  const n=Math.min(8-alive,1+Math.floor(G.nightsDone/2));const p=edgePoint();
  for(let i=0;i<n;i++){const m=addU('lobo',p.x+rnd(-20,20),p.y+rnd(-20,20),{hpMul:1+.1*G.nightsDone});m.think=0;}
  if(!G.wolfMsg){G.wolfMsg=true;msg('Lobos de cinza rondando a fazenda. Os camponeses estão nervosos. Os heróis, animados.','bad');}}

/* ---------- eventos do amanhecer ---------- */
function wanderer(){const p=edgePoint();const tv=findB('taverna');const h=makeHero(pick(Object.keys(CLS)),p.x,p.y,{home:tv||casa()});
  msg(`Um andarilho chegou: ${h.name}. Diz que é herói. Ninguém acredita.`,'good');}
function dawnEvent(){
  if(G.taxDue){G.taxDue=false;const x=Math.round(G.gold*.3);G.gold-=x;msg(`O cobrador do bispo veio, como prometido. Levou ${x} de ouro.`,'bad');return;}
  const evs=[],bs=G.buildings.filter(b=>b.kind!=='casa'&&!isField(b)),fields=G.buildings.filter(isField);
  if(bs.length)evs.push(()=>{const b=pick(bs);b.hp=Math.max(1,b.hp-Math.round(b.maxHp*.5));b.hitT=.5;burst(b.x,b.y,PAL.e4,14);G.shake=4;
    msg(`A terra se abriu embaixo da ${BD[b.kind].short||BD[b.kind].name}. Ficou em pé. Mais ou menos.`,'bad');});
  if(fields.length>1)evs.push(()=>{let k=0;for(const f of fields)if(Math.random()<.4){f.g=0;k++;}
    msg(k?`Praga nos campos. ${k} ${k===1?'plantação morreu':'plantações morreram'} de desgosto.`:'A praga passou e não achou nada que valesse a pena.','bad');});
  if(G.trigo>10)evs.push(()=>{const x=Math.round(G.trigo*.3);G.trigo-=x;msg(`Ratos no trigo. Comeram ${x}. Estão gordos e felizes.`,'bad');});
  if(G.gold>60)evs.push(()=>{const x=Math.round(G.gold*.2);G.gold-=x;msg(`O cobrador do bispo passou. Levou ${x} de ouro e deixou uma bênção.`,'bad');});
  const rich=G.units.filter(u=>u.hero&&u.type!=='fazendeiro'&&!u.dead&&u.gold>=10&&u.trait!=='Honesto');
  if(rich.length)evs.push(()=>{const h=pick(rich);msg(`${h.name} foi embora com ${h.gold} de ouro. Deixou um bilhete: "desculpa".`,'bad');G.fallen.unshift({name:h.name,cls:h.t.name,lvl:h.lvl,how:'Fugiu com o ouro',type:h.type});leaveB(h);h.dead=true;if(sel===h)select(null);});
  if(fields.length)evs.push(()=>{for(const f of fields)f.g=Math.min(1,f.g+.4);msg('A cinza da noite adubou os campos. Melhor não perguntar de quê.','good');});
  evs.push(wanderer);
  evs.push(()=>{G.price.trigo+=2;msg(`Fome na capital. O trigo subiu pra ${G.price.trigo} hoje.`,'good');});
  if(Math.random()<.85)pick(evs)();
}
function onPhase(ph){
  if(ph==='dusk')msg('O sol está indo embora. Os camponeses correm pra dentro. Tem coisa se mexendo nos covis.','bad');
  else if(ph==='night'){G.nightNum++;if(G.quest){const q=G.quest;G.quest=null;msg(q.fail,'bad');if(q.who==='O bispo')G.taxDue=true;}
    msg(NIGHT_MSG[Math.min(G.nightNum,NIGHTS)-1],'bad');scheduleWave();}
  else if(ph==='day'&&G.nightNum>G.nightsDone){
    G.nightsDone=G.nightNum;if(G.nightsDone>=NIGHTS){endGame(true);return;}
    const alive=G.units.filter(u=>u.hero&&u.type!=='fazendeiro'&&!u.t.minion&&!u.dead).length;
    msg(`Amanheceu. ${alive} ${alive===1?'herói vivo':'heróis vivos'}. Por enquanto.`);
    G.sunMsg=false;newPrices();dawnEvent();refillWorkers(true);newQuest();G.wolfT=rnd(15,30);
    if(findB('taverna')&&Math.random()<.6)wanderer();
    if(OPTS.autosave)saveGame(true);
    setTimeout(()=>{if(G&&!G.over)msg(`No mercado hoje: trigo a ${G.price.trigo}, alho a ${G.price.alho}.`);},1800);}
}

