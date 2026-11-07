/* HeranÃ§a de Cinzas Â· OpÃ§Ãµes e save em 3 slots (conta ou navegador). */
'use strict';
/* ---------- opções ---------- */
const OPTS={autosave:true,night:'escura',pixel:'auto',speed:1};
try{Object.assign(OPTS,JSON.parse(localStorage.getItem('hdc_opts')||'{}'));}catch(e){}
function saveOpts(){try{localStorage.setItem('hdc_opts',JSON.stringify(OPTS));}catch(e){}}
function applyOpts(resetSpeed){Z=defaultZ();fitBuffer();if(resetSpeed){speed=OPTS.speed||1;paused=false;syncSpeed();}}

/* ---------- save: na conta (db) ou no navegador ---------- */
const Store={db:null,uid:null,kind:'local',ready:null};
Store.ready=(async()=>{
  for(let i=0;i<30&&!(window.claude&&window.claude.use);i++)await new Promise(r=>setTimeout(r,100));
  if(!(window.claude&&window.claude.use))return;
  try{const [db,user]=await Promise.all([window.claude.use('db'),window.claude.use('user')]);
    if(db&&user){const id=await user.id();if(id){Store.db=db;Store.uid=id;Store.kind='cloud';}}}catch(e){}
})();
function withTimeout(p,ms){return Promise.race([p,new Promise((_,rej)=>setTimeout(()=>rej(new Error('timeout')),ms))]);}
const SLOTS=[1,2,3];
function saveRef(n){return Store.db.doc('data/users/'+Store.uid+'/save'+n);}
const lsKey=n=>'hdc_save_'+n;
function newer(a,b){if(a&&b)return (a.savedAt||0)>=(b.savedAt||0)?a:b;return a||b||null;}
async function readSlot(n){
  let cloud=null,local=null;
  if(Store.db){try{const s=await withTimeout(saveRef(n).get(),9000);if(s.exists)cloud=s.data();}catch(e){}
    if(n===1&&!cloud){try{const s=await withTimeout(Store.db.doc('data/users/'+Store.uid+'/save').get(),9000);if(s.exists)cloud=s.data();}catch(e){}}}
  try{const t=localStorage.getItem(lsKey(n))||(n===1?localStorage.getItem('hdc_save'):null);if(t)local=JSON.parse(t);}catch(e){}
  return newer(cloud,local);
}
async function readAllSlots(){await Store.ready;return Promise.all(SLOTS.map(readSlot));}
let saving=false;
async function saveGame(auto,slot){
  if(!G||G.over||!started||saving)return false;slot=slot||G.slot||1;saving=true;
  const body={v:2,slot,savedAt:Date.now(),day:G.nightsDone+1,phase:G.phase,gold:G.gold,heroes:heroList().length,state:JSON.stringify(serialize())};
  let where=null;
  try{localStorage.setItem(lsKey(slot),JSON.stringify(body));where='local';}catch(e){}
  await Store.ready;
  if(Store.db){try{await withTimeout(saveRef(slot).set(body),9000);where='cloud';}catch(e){}}
  saving=false;
  if(where){G.slot=slot;G.lastSave=Date.now();cachedSlots[slot-1]=body;}
  if(where)msg(auto?`Salvo sozinho no slot ${slot}.`:where==='cloud'?`Salvo no slot ${slot}, na sua conta. Continua no celular ou no PC.`:`Salvo no slot ${slot}, neste navegador.`,'good');
  else msg('Não deu pra salvar. O navegador recusou.','bad');
  return where;
}
function serialize(){
  const bi=new Map(G.buildings.map((b,i)=>[b,i]));const ref=b=>b&&bi.has(b)?bi.get(b):-1;
  return {seed:G.seed,time:G.time,gold:G.gold,trigo:G.trigo,alho:G.alho,nightsDone:G.nightsDone,nightNum:G.nightNum,phase:G.phase,price:G.price,quest:G.quest,
    blessed:G.blessed,taxDue:G.taxDue,farmerCd:G.farmerCd,wolfMsg:G.wolfMsg,wolfT:G.wolfT,firstTav:!!G.firstTav,stats:G.stats,fallen:G.fallen.slice(0,30),
    lairs:G.lairs.map(l=>({hp:l.hp,dead:l.dead,bounty:l.bounty})),
    buildings:G.buildings.map(b=>({k:b.kind,x:b.x,y:b.y,hp:b.hp,g:b.g,r:b.ripeT,cd:b.cd,p:b.prestige||null})),
    units:G.units.filter(u=>!u.dead&&!u.t.minion).map(u=>({t:u.type,x:Math.round(u.x),y:Math.round(u.y),hp:u.hp,mh:u.maxHp,atk:u.atk,lvl:u.lvl,xp:u.xp,gold:u.gold,gear:u.gear,
      kills:u.kills,name:u.name||null,trait:u.trait||null,home:ref(u.home),inside:ref(u.inside),st:u.inside?u.state:null,carry:u.carry,life:u.life||0,bounty:u.bounty,born:u.born})),
    spawnQ:G.spawnQ.map(q=>({at:q.at,type:q.type,src:G.lairs.indexOf(q.src)})),cam:{x:cam.x,y:cam.y}};
}
function loadGame(body){
  const s=JSON.parse(body.state);const R=mulberry32(s.seed);
  G=freshG(s.seed);genMap(R);
  for(const k of ['time','gold','trigo','alho','nightsDone','nightNum','phase','price','quest','blessed','taxDue','farmerCd','wolfMsg','wolfT','firstTav','stats','fallen'])if(s[k]!==undefined)G[k]=s[k];
  G.lairs.forEach((l,i)=>Object.assign(l,s.lairs[i]||{}));
  const LEG_B={merc:'g_warrior',cacador:'g_archer',capela:'g_healer'},LEG_U={mercenario:'warrior',cacador:'archer',padre:'healer'};
  for(const b of s.buildings){const k=LEG_B[b.k]||b.k;if(!BD[k])continue;const nb=addB(k,b.x,b.y);nb.hp=Math.min(b.hp,nb.maxHp);nb.g=b.g;nb.ripeT=b.r||0;nb.cd=b.cd||0;nb.prestige=b.p||null;}
  G.casa=G.buildings.find(b=>b.kind==='casa');
  for(const u of s.units){u.t=LEG_U[u.t]||u.t;if(!UT[u.t])continue;const nu=addU(u.t,u.x,u.y,{name:u.name||undefined,trait:u.trait||undefined,life:u.life,born:u.born});
    Object.assign(nu,{hp:u.hp,maxHp:u.mh,atk:u.atk,lvl:u.lvl,xp:u.xp,gold:u.gold,gear:u.gear,kills:u.kills,bounty:u.bounty||0,carry:u.carry||null});
    if(u.home>=0)nu.home=G.buildings[u.home];if(u.inside>=0&&G.buildings[u.inside]){enterB(nu,G.buildings[u.inside]);nu.state=u.st||'rest';}}
  G.spawnQ=(s.spawnQ||[]).map(q=>({at:q.at,type:q.type,src:G.lairs[q.src]||null}));
  cam.x=s.cam?s.cam.x:W/2;cam.y=s.cam?s.cam.y:H/2;
  G.lastSave=Date.now();sel=null;buildMode=null;$('#log').innerHTML='';renderBar();updatePanel(true);updateHint();renderRoster(true);
}
document.addEventListener('visibilitychange',()=>{if(document.hidden&&OPTS.autosave&&G&&started&&!G.over&&Date.now()-G.lastSave>15000)saveGame(true);});

