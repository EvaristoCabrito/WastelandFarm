/* HeranÃ§a de Cinzas Â· HUD, painel de seleÃ§Ã£o, lista de herÃ³is e menu de construÃ§Ã£o. */
'use strict';
/* ---------- HUD, painel e lista de heróis ---------- */
let lastRes='',lastPhaseTxt='';
function hud(){
  if(!G)return;const r=G.gold+'|'+G.trigo+'|'+G.alho;
  if(r!==lastRes){lastRes=r;$('#gold').textContent=G.gold;$('#trigo').textContent=G.trigo;$('#alho').textContent=G.alho;}
  const t=dayT();let txt;
  if(G.phase==='day')txt=`Dia ${G.nightsDone+1} · faltam ${NIGHTS-G.nightsDone}`;else if(G.phase==='dusk')txt='Entardecer · eles vêm';else if(G.phase==='night')txt=`Noite ${G.nightNum} de ${NIGHTS}`;else txt='Amanhecendo';
  if(txt!==lastPhaseTxt){lastPhaseTxt=txt;$('#phaseT').textContent=txt;}
  $('#skip').hidden=!(started&&!G.over&&G.phase==='day');
  const cf=$('#clockFill');
  if(t<DAY_END){cf.style.width=(t/DAY_END*100)+'%';cf.style.background=PAL.y2;}else if(t<NIGHT_END){cf.style.width=((t-DAY_END)/(NIGHT_END-DAY_END)*100)+'%';cf.style.background=PAL.b1;}else{cf.style.width='100%';cf.style.background=PAL.e4;}
}
function pathText(h){
  if(h.type==='fazendeiro')return 'Você mesmo';if(h.t.tier===2)return `${UT[h.t.base].name} → ${h.t.name} (prestígio)`;
  const c=CLS[h.type];if(!c)return '-';const g=guildOf(h.type);
  return g?`Vira ${UT[g.prestige].name} no nível ${PROMO_LVL}`:`Pode virar ${UT[c.pres[0]].name} ou ${UT[c.pres[1]].name}: melhore a guilda`;
}
function stateText(h){
  if(h.t&&h.t.minion)return h.state==='fight'?'Lutando':'Seguindo '+(h.owner?h.owner.name:'ninguém');
  if(h.worker){if(h.inside)return 'Trancado em casa';if(h.state==='toField')return 'Indo colher';if(h.state==='carry')return `Levando ${h.carry?h.carry.amt+' de '+h.carry.crop:'a colheita'} pra casa`;
    if(h.state==='flee')return 'Correndo de um monstro';if(h.state==='home')return 'Indo se trancar';return 'Esperando algo amadurecer';}
  if(h.inside)return h.state==='drink'?'Bebendo. É noite, afinal.':h.inside.kind==='taverna'?'Comendo, bebendo e pagando':'Descansando';
  if(h.state==='fight')return h.target&&h.target.bounty?'Atrás da recompensa':h.target&&h.target.ent==='lair'?'Atacando o covil':h.target&&h.target.type==='lobo'?'Caçando lobo':'Brigando';
  if(h.state==='flee')return 'Fugindo';
  if(h.state==='go')return h.goal==='shop'?'Indo gastar na forja':h.goal==='drink'?'Indo beber':h.goal==='rest'?'Indo pra taverna':'Voltando pra casa';
  return isNight()?'Vigiando':'Procurando o que matar';
}
function bountyActs(big){const v=big?[25,50,100]:[10,25,50];return v.map(a=>({id:'b'+a,label:`+${a} de recompensa`,dis:G.gold<a}));}
function panelData(){
  const s=sel;if(!s||s.dead)return null;const hp=x=>`${Math.max(0,Math.ceil(x.hp))} / ${Math.round(x.maxHp)}`;
  if(s.ent==='prop')return {title:s.name,sub:'Lugar',rows:[],note:s.lore,actions:[]};
  if(s.ent==='u'&&s.worker)return {title:'Camponês',sub:'Trabalhador',rows:[['Vida',hp(s)],['Agora',stateText(s)]],note:'Colhe os campos maduros e leva pra casa. De noite se tranca. Esperto.',actions:[]};
  if(s.ent==='u'&&s.t.minion)return {title:s.name,sub:'Invocação',rows:[['Vida',hp(s)],['Dono',s.owner?s.owner.name:'ninguém'],['Some em',Math.max(0,Math.ceil(s.life))+'s'],['Agora',stateText(s)]],
    note:s.type==='servo'?'Trabalha de graça. Cheira mal.':'Um cão feito de fumaça e lealdade emprestada.',actions:[]};
  if(s.ent==='u'&&s.hero)return {title:s.name,sub:`${s.t.tier===2?'★ ':''}${s.t.name} · nível ${s.lvl}`,rows:[['Vida',hp(s)],['Poder',s.t.power||'Teimosia'],['Caminho',pathText(s)],['Experiência',`${Math.floor(s.xp)} / ${s.lvl*25}`],['Ouro',s.gold],['Equipamento',s.gear?'nível '+s.gear:'nenhum'],['Abates',s.kills],['Traço',`${s.trait}. ${TRAITS[s.trait]}`],['Agora',stateText(s)]],
    note:s.type==='fazendeiro'?`Volta pra casa em ${Math.max(0,Math.ceil(s.life))}s. Se morrer, a casa sente.`:'Você não manda nele. Ele caça pelo ouro e gasta na sua taverna e na sua forja.',actions:[]};
  if(s.ent==='u')return {title:s.t.name,sub:s.t.boss?'Parente':s.t.beast?'Fera':'Monstro',rows:[['Vida',hp(s)],['Recompensa',s.bounty?s.bounty+' de ouro':'nenhuma']],
    note:s.t.burns?'Queima no sol. Alho também ajuda.':s.t.boss?'Ele sempre disse que a fazenda seria sua só por cima do cadáver dele.':s.t.beast?'Ataca camponeses e campos de dia. Os heróis adoram caçar.':null,actions:bountyActs(!!s.t.boss)};
  if(s.ent==='lair')return {title:s.name,sub:'Covil',rows:[['Vida',hp(s)],['Recompensa',s.bounty?s.bounty+' de ouro':'nenhuma']],note:'Destruir o covil diminui os ataques. Herói só vai lá por muito ouro.',actions:bountyActs(true)};
  const d=BD[s.kind],acts=[];
  if(d.field){const y=fieldYield(s);if(s.g>=1)acts.push({id:'harvest',label:`Colher agora (+${y.amt} ${y.crop})`});
    if(s.hp<s.maxHp){const c=Math.ceil((s.maxHp-s.hp)*.25);acts.push({id:'repair',label:`Consertar · ${c}`,dis:G.gold<c});}
    return {title:d.name,sub:s.g>=1?'Pronto pra colher':'Crescendo',rows:[['Crescimento',Math.floor(s.g*100)+'%'],[s.kind==='trigo'?'Calor':'Frio',Math.round((s.kind==='trigo'?s.heat:1-s.heat)*100)+'%'],['Rende',`${y.amt} de ${y.crop}`],['Vida',hp(s)]],note:d.desc,actions:acts};}
  const rows=[['Vida',hp(s)]];
  if(s.kind==='casa'){rows.push(['Trigo hoje',`${G.price.trigo} de ouro cada`],['Alho hoje',`${G.price.alho} de ouro cada`]);
    const ws=G.units.filter(u=>u.worker&&!u.dead).length,cap=workerHomes().length*2;rows.push(['Camponeses',`${ws} de ${cap}`]);
    if(G.trigo>=10)acts.push({id:'sellT10',label:`Vender 10 trigo · +${10*G.price.trigo}`});
    acts.push({id:'sellT',label:`Vender todo o trigo · +${G.trigo*G.price.trigo}`,dis:G.trigo<1});acts.push({id:'sellA',label:`Vender todo o alho · +${G.alho*G.price.alho}`,dis:G.alho<1});
    acts.push({id:'forcado',label:G.farmerCd>0?`Sair com o forcado (${Math.ceil(G.farmerCd)}s)`:'Sair com o forcado',dis:G.farmerCd>0});}
  let gNote=null;
  if(d.cls){const n=G.units.filter(u=>u.home===s&&u.hero&&!u.dead).length,c=CLS[d.cls];rows.push(['Heróis daqui',n+' de 4']);
    acts.push({id:'recruit',label:`Recrutar ${UT[d.cls].name.toLowerCase()} · ${d.rc}`,dis:n>=4||G.gold<d.rc});
    if(s.prestige){rows.push(['Prestígio',UT[s.prestige].name]);gNote=`${PRES_DESC[s.prestige]} Heróis daqui viram ${UT[s.prestige].name} no nível ${PROMO_LVL}.`;}
    else{rows.push(['Prestígio','nenhum ainda']);
      gNote=`${d.desc} Melhorar é uma escolha pra sempre. ${UT[c.pres[0]].name}: ${PRES_DESC[c.pres[0]]} ${UT[c.pres[1]].name}: ${PRES_DESC[c.pres[1]]}`;
      if(G.pendPres&&G.pendPres.b===s){acts.push({id:'presOk',label:`Confirmar: ${PRES_GUILD[G.pendPres.p]} · ${PRES_COST}`,dis:G.gold<PRES_COST});acts.push({id:'presNo',label:'Cancelar'});}
      else for(const p of c.pres)acts.push({id:'pres:'+p,label:`→ ${PRES_GUILD[p]} · ${PRES_COST}`,dis:G.gold<PRES_COST});}}
  if(s.kind==='taverna')rows.push(['Seu trigo',`${G.trigo} (herói comendo paga 3)`]);
  if(s.hp<s.maxHp){const c=Math.ceil((s.maxHp-s.hp)*.25);acts.push({id:'repair',label:`Consertar · ${c}`,dis:G.gold<c});}
  const hs=s.inside.filter(h=>h.hero).map(h=>h.name),ws=s.inside.filter(h=>h.worker).length;
  if(hs.length||ws)rows.push(['Lá dentro',[...hs,ws?`${ws} ${ws===1?'camponês':'camponeses'}`:''].filter(Boolean).join(', ')]);
  return {title:s.prestige?PRES_GUILD[s.prestige]:d.name,sub:s.kind==='casa'?'Seu castelo e seu mercado':d.cls?(s.prestige?'Guilda de prestígio':'Guilda'):'Construção',rows,
    note:s.kind==='casa'?'Venda quando o preço estiver bom. O preço muda todo dia.':gNote||d.desc,actions:acts};
}
function portraitSpr(s){if(!s)return null;if(s.ent==='u')return SU[s.type].r[0];if(s.ent==='b')return isField(s)?THUMB[s.kind]:SB[s.kind].spr;if(s.ent==='lair')return s.kind==='cemiterio'?LAIR.cem:LAIR.nin;if(s.ent==='prop')return s.spr;return null;}
function paintPortrait(c,spr,maxH,maxW){if(!spr){c.hidden=true;return;}const sc=Math.max(1,Math.floor(Math.min(maxH/spr.height,maxW/spr.width)));
  c.width=spr.width*sc;c.height=spr.height*sc;const g=c.getContext('2d');g.imageSmoothingEnabled=false;g.clearRect(0,0,c.width,c.height);g.drawImage(spr,0,0,c.width,c.height);c.hidden=false;}
let panelSig='',panelT=0,portraitFor=null;
function updatePanel(force){
  const p=$('#panel');const d=G&&sel?panelData():null;
  if(!d){if(sel&&G)sel=null;p.hidden=true;panelSig='';portraitFor=null;return;}
  p.hidden=false;if(portraitFor!==sel){portraitFor=sel;paintPortrait($('#pPort'),portraitSpr(sel),60,90);}
  $('#pTitle').textContent=d.title;$('#pSub').textContent=d.sub;
  $('#pRows').innerHTML=d.rows.map(r=>`<div><dt>${r[0]}</dt><dd>${r[1]}</dd></div>`).join('');$('#pRows').hidden=!d.rows.length;
  const n=$('#pNote');n.textContent=d.note||'';n.hidden=!d.note;
  const sig=JSON.stringify(d.actions);if(force||sig!==panelSig){panelSig=sig;const a=$('#pAct');a.innerHTML=d.actions.map(x=>`<button data-a="${x.id}"${x.dis?' disabled':''}>${x.label}</button>`).join('');a.hidden=!d.actions.length;}
}
function select(e){sel=e;updatePanel(true);}
$('#pClose').addEventListener('click',()=>select(null));
$('#pAct').addEventListener('click',e=>{const btn=e.target.closest('button');if(!btn||!sel||!G||G.over)return;const a=btn.dataset.a;
  if(/^b\d+$/.test(a))addBounty(sel,parseInt(a.slice(1),10));else if(a==='harvest'&&sel.g>=1)harvestNow(sel);else if(a==='recruit')recruit(sel);else if(a==='repair')repair(sel);
  else if(a==='forcado')farmer();else if(a==='sellT10')sell('trigo',10);else if(a==='sellT')sell('trigo',G.trigo);else if(a==='sellA')sell('alho',G.alho);
  else if(a.startsWith('pres:'))G.pendPres={b:sel,p:a.slice(5)};else if(a==='presOk')choosePrestige();else if(a==='presNo')G.pendPres=null;
  updatePanel(true);});
$('#res').addEventListener('click',()=>{if(G&&started&&!G.over){buildMode=null;refreshBar();updateHint();select(casa());}});
$('#skip').addEventListener('click',skipToNight);
// lista de heróis
let rosterSig='';
function heroList(){return G?G.units.filter(u=>u.hero&&!u.dead&&u.type!=='fazendeiro'&&!u.t.minion).sort((a,b)=>b.lvl-a.lvl||b.xp-a.xp):[];}
function renderRoster(force){
  if(!G)return;const hs=heroList();$('#heroBtn').textContent=`Heróis ${hs.length}`;
  const box=$('#roster');if(box.hidden&&!force)return;
  const sig=hs.map(h=>[h.id,h.lvl,Math.ceil(h.hp),h.gold,h.gear,h.state,h.inside?1:0,h.kills].join(',')).join('|')+'#'+G.fallen.length;
  if(sig===rosterSig&&!force)return;rosterSig=sig;
  const gold=hs.reduce((s,h)=>s+h.gold,0);
  $('#rSum').textContent=hs.length?`${hs.length} vivos · carregam ${gold} de ouro · ${G.stats.heroDead} enterrados`:'';
  const list=$('#rList');list.innerHTML='';
  if(!hs.length){const p=document.createElement('p');p.id='rEmpty';p.textContent='Nenhum herói vivo. Construa uma taverna ou um alojamento. Ou reze.';list.appendChild(p);}
  for(const h of hs){const b=document.createElement('button');b.className='hr';b.dataset.id=h.id;
    const c=document.createElement('canvas');c.className='px';paintPortrait(c,SU[h.type].r[0],44,36);b.appendChild(c);
    const n=document.createElement('div');n.className='n';n.textContent=h.name;b.appendChild(n);
    const cl=document.createElement('div');cl.className='c';cl.textContent=`${h.t.tier===2?'★ ':''}${h.t.name} · nível ${h.lvl} · ${h.gold} de ouro${h.gear?' · equip '+h.gear:''}`;b.appendChild(cl);
    const hp=document.createElement('div');hp.className='hp';const i=document.createElement('i');i.style.width=Math.round(clamp(h.hp/h.maxHp,0,1)*100)+'%';
    if(h.hp<h.maxHp*.35)i.style.background=PAL.b1;hp.appendChild(i);b.appendChild(hp);
    const s=document.createElement('div');s.className='s';s.innerHTML=`<em>${h.trait}</em> · ${stateText(h)} · ${h.kills} ${h.kills===1?'abate':'abates'}`;b.appendChild(s);
    list.appendChild(b);}
  if(G.fallen.length){const p=document.createElement('p');p.id='rEmpty';p.style.marginTop='6px';p.textContent='Cemitério dos heróis: '+G.fallen.slice(0,8).map(f=>`${f.name} (${f.cls} ${f.lvl}, ${f.how.toLowerCase()})`).join('; ')+'.';list.appendChild(p);}
}
$('#heroBtn').addEventListener('click',()=>{const r=$('#roster');r.hidden=!r.hidden;if(!r.hidden)renderRoster(true);});
$('#rClose').addEventListener('click',()=>{$('#roster').hidden=true;});
$('#rList').addEventListener('click',e=>{const b=e.target.closest('.hr');if(!b||!G)return;const h=G.units.find(u=>u.id===+b.dataset.id);if(!h)return;
  cam.x=h.inside?h.inside.x:h.x;cam.y=h.inside?baseY(h.inside):h.y;select(h);if(window.innerWidth<700)$('#roster').hidden=true;});
const CATS=[['fazenda','Fazenda',['trigo','alho','casebre']],['vila','Vila e defesa',['torre','taverna','forja']],['guildas','Guildas',['g_warrior','g_archer','g_lancer','g_mage','g_conjurer','g_healer']]];
let barCat='fazenda';const THURL={};
function thumbURL(k){return THURL[k]||(THURL[k]=(BD[k].field?THUMB[k]:SB[k].spr).toDataURL());}
function renderBar(){
  $('#cats').innerHTML=CATS.map(([id,label])=>`<button class="cat${id===barCat?' on':''}" data-cat="${id}" role="tab" aria-selected="${id===barCat}">${label}</button>`).join('');
  const ks=CATS.find(c=>c[0]===barCat)[2];
  $('#items').innerHTML=ks.map(k=>{const d=BD[k],i=BUILD_ORDER.indexOf(k);return `<button class="bb" data-k="${k}" title="${d.desc}${i>=0&&i<9?` (tecla ${i+1})`:''}"><img class="px" alt="" src="${thumbURL(k)}"><b>${d.short||d.name}</b><span>${d.cost} ouro</span></button>`;}).join('');
  $('#items').scrollLeft=0;refreshBar();
}
function refreshBar(){
  for(const b of document.querySelectorAll('.bb')){const k=b.dataset.k;b.classList.toggle('on',buildMode===k);b.classList.toggle('poor',!!G&&G.gold<BD[k].cost);}
  const it=$('#items'),over=it.scrollWidth>it.clientWidth+2;$('#barL').hidden=!over||it.scrollLeft<=2;$('#barR').hidden=!over||it.scrollLeft>=it.scrollWidth-it.clientWidth-2;
}
$('#cats').addEventListener('click',e=>{const c=e.target.closest('.cat');if(!c)return;barCat=c.dataset.cat;renderBar();});
function openBuildMenu(){
  if(!G||G.over||!started)return;$('#roster').hidden=true;select(null);
  $('#bmGold').textContent=`${G.gold} de ouro`;
  $('#bmList').innerHTML=CATS.map(([id,label,ks])=>`<h3>${label}</h3>`+ks.map(k=>{const d=BD[k];
    return `<button class="bm${G.gold<d.cost?' poor':''}" data-k="${k}"><img class="px" alt="" src="${thumbURL(k)}"><b>${d.short||d.name}</b><span class="c">${d.cost} ouro${G.gold<d.cost?' · falta '+(d.cost-G.gold):''}</span><span class="d">${d.desc}</span></button>`;}).join('')).join('');
  $('#buildMenu').hidden=false;$('#bmList').scrollTop=0;
}
function closeBuildMenu(){$('#buildMenu').hidden=true;}
$('#buildAll').addEventListener('click',openBuildMenu);
$('#bmClose').addEventListener('click',closeBuildMenu);
$('#bmList').addEventListener('click',e=>{const b=e.target.closest('.bm');if(!b)return;const k=b.dataset.k;closeBuildMenu();if(buildMode!==k)toggleBuild(k);});
$('#barL').addEventListener('click',()=>{const it=$('#items');it.scrollBy({left:-it.clientWidth*.8,behavior:'smooth'});});
$('#barR').addEventListener('click',()=>{const it=$('#items');it.scrollBy({left:it.clientWidth*.8,behavior:'smooth'});});
$('#items').addEventListener('scroll',refreshBar,{passive:true});
$('#items').addEventListener('wheel',e=>{const it=e.currentTarget;if(Math.abs(e.deltaY)>Math.abs(e.deltaX)&&it.scrollWidth>it.clientWidth){it.scrollLeft+=e.deltaY;e.preventDefault();}},{passive:false});
function updateHint(){const h=$('#hint');if(!buildMode){h.hidden=true;return;}h.hidden=false;const d=BD[buildMode];
  h.textContent=buildMode==='trigo'?'Trigo: toque no mapa pra plantar. Perto das rachaduras rende mais. Toque no botão de novo pra parar.'
    :buildMode==='alho'?'Alho: toque no mapa pra plantar. Longe das rachaduras rende mais. Toque no botão de novo pra parar.'
    :`${d.name} · ${d.cost} ouro. ${d.desc} Toque no mapa pra construir.`;}
function toggleBuild(k){if(!G||G.over||!started)return;
  const cat=CATS.find(c=>c[2].includes(k));if(cat&&cat[0]!==barCat){barCat=cat[0];renderBar();}
  const el=document.querySelector(`.bb[data-k="${k}"]`);if(el)el.scrollIntoView({block:'nearest',inline:'nearest'});
  if(buildMode===k)buildMode=null;else{buildMode=k;select(null);if(G.gold<BD[k].cost)msg(`Falta ouro. ${BD[k].name} custa ${BD[k].cost}. Venda a colheita na Casa.`,'bad');}refreshBar();updateHint();updateQuest();}
$('#bar').addEventListener('click',e=>{const b=e.target.closest('.bb');if(b)toggleBuild(b.dataset.k);});
function syncSpeed(){$('#pauseBtn').classList.toggle('on',paused);$('#pauseBtn').textContent=paused?'▶':'❚❚';$('#spdBtn').textContent=speed+'×';$('#spdBtn').classList.toggle('on',!paused);}
$('#pauseBtn').addEventListener('click',()=>{paused=!paused;syncSpeed();});
$('#spdBtn').addEventListener('click',()=>{speed=speed%3+1;paused=false;syncSpeed();});

