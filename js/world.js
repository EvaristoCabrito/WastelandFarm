/* HeranÃ§a de Cinzas Â· GeraÃ§Ã£o do mapa, entidades, tempo do dia e efeitos. */
'use strict';
/* ---------- mapa ---------- */
function mkLair(kind,x,y){const l={ent:'lair',kind,x,y,r:58,hp:kind==='cemiterio'?480:380,dead:false,bounty:0,hitT:0,alarm:0,defT:0,
  name:kind==='cemiterio'?'Cemitério Antigo':'Ninho de Strigoi'};l.maxHp=l.hp;return l;}
function genMap(R){
  const cx=W/2,cy=H/2;G.cracks=[];
  for(let i=0;i<6;i++){const a=R()*Math.PI*2,r=140+R()*380;let x=cx+Math.cos(a)*r,y=cy+Math.sin(a)*r*.75,dir=R()*Math.PI*2;
    const pts=[{x,y}];const n=5+Math.floor(R()*5);
    for(let k=0;k<n;k++){dir+=(R()-.5)*1.1;const len=35+R()*55;const nx=clamp(x+Math.cos(dir)*len,60,W-60),ny=clamp(y+Math.sin(dir)*len,80,H-60);
      if(Math.hypot(nx-cx,ny-cy)<120)break;x=nx;y=ny;pts.push({x,y});}
    if(pts.length>1)G.cracks.push(pts);}
  G.segs=[];for(const c of G.cracks)for(let i=1;i<c.length;i++)G.segs.push([c[i-1].x,c[i-1].y,c[i].x,c[i].y]);
  G.lightPts=[];for(const s of G.segs){const L=Math.hypot(s[2]-s[0],s[3]-s[1]);const n=Math.max(1,Math.round(L/40));
    for(let i=0;i<n;i++){const t=(i+.5)/n;G.lightPts.push({x:s[0]+(s[2]-s[0])*t,y:s[1]+(s[3]-s[1])*t,ph:R()*6});}}
  const corners=[[280,260],[W-280,260],[280,H-240],[W-280,H-240]];const ci=Math.floor(R()*4),c1=corners[ci],c2=corners[3-ci];
  G.lairs=[mkLair('cemiterio',Math.round(c1[0]+(R()-.5)*80),Math.round(c1[1]+(R()-.5)*60)),mkLair('ninho',Math.round(c2[0]+(R()-.5)*80),Math.round(c2[1]+(R()-.5)*60))];
  const ok=(x,y,m)=>Math.hypot(x-cx,y-cy)>m&&G.lairs.every(l=>Math.hypot(l.x-x,l.y-y)>110)&&G.decor.every(o=>Math.hypot(o.x-x,o.y-y)>18);
  G.decor=[];
  for(let i=0;i<75;i++){const x=Math.round(40+R()*(W-80)),y=Math.round(70+R()*(H-90));if(ok(x,y,200))G.decor.push({kind:'tree',x,y,spr:TREES[Math.floor(R()*TREES.length)]});}
  for(let i=0;i<90;i++){const x=Math.round(30+R()*(W-60)),y=Math.round(50+R()*(H-60));if(ok(x,y,150))G.decor.push({kind:'rock',x,y,spr:ROCKS[Math.floor(R()*ROCKS.length)]});}
  const addProp=(type,x,y)=>{x=Math.round(x);y=Math.round(y);const p=PROPS[type];G.decor.push({ent:'prop',kind:'prop',type,x,y,spr:PROP_SPR[type],name:p.name,lore:p.lore[Math.floor(R()*p.lore.length)]});};
  const near=(type,ang)=>{const a=ang+(R()-.5)*.6,r=150+R()*70;addProp(type,cx+Math.cos(a)*r,cy+Math.sin(a)*r*.75);};
  near('poco',Math.PI*1.2);near('espantalho',-.4);near('carroca',Math.PI*.7);
  const scatter=(type,n)=>{for(let i=0;i<n*4&&n>0;i++){const x=60+R()*(W-120),y=100+R()*(H-160);if(ok(x,y,260)){addProp(type,x,y);n--;}}};
  scatter('troita',3);scatter('cranios',3);scatter('lapide',7);scatter('gaiola',2);
  for(const l of G.lairs){for(let i=0;i<3;i++){const a=R()*Math.PI*2;addProp(l.kind==='cemiterio'?'lapide':'cranios',l.x+Math.cos(a)*(90+R()*30),l.y+Math.sin(a)*(60+R()*20));}}
  ground=genGround(R);
}
function genGround(R){
  const c=mkCanvas(W,H),g=c.getContext('2d'),P=Pnt(g);
  const grd=g.createRadialGradient(W/2,H/2,80,W/2,H/2,W*.72);grd.addColorStop(0,'#5a524f');grd.addColorStop(1,'#2a2425');g.fillStyle=grd;g.fillRect(0,0,W,H);
  for(let i=0;i<900;i++){const x=R()*W,y=R()*H,r=10+R()*R()*60;g.fillStyle=`rgba(${R()<.5?'20,16,17':'110,100,96'},${.06+R()*.1})`;g.beginPath();g.ellipse(x,y,r,r*.6,0,0,Math.PI*2);g.fill();}
  const sp=[PAL.k3,PAL.g1,PAL.g2,PAL.g3,PAL.g4,PAL.g5];
  for(let i=0;i<60000;i++){g.fillStyle=sp[Math.floor(R()*sp.length)];g.fillRect(R()*W|0,R()*H|0,1,1);}
  for(let i=0;i<3500;i++){const x=R()*W|0,y=R()*H|0;g.fillStyle=R()<.5?PAL.g5:PAL.g6;g.fillRect(x,y,2+(R()*6|0),1);}
  for(let i=0;i<1600;i++){const x=R()*W|0,y=R()*H|0;P.px(x,y,PAL.g2);P.px(x+1,y,PAL.g3);P.px(x,y+1,PAL.k3);}
  for(let i=0;i<900;i++){const x=R()*W|0,y=R()*H|0;P.px(x,y,PAL.g4);P.px(x-1,y-1,PAL.g4);P.px(x+1,y-1,PAL.g5);}
  for(let i=0;i<220;i++){const x=R()*W|0,y=R()*H|0;P.px(x,y,PAL.g6);P.px(x+1,y,PAL.g7);}
  for(let i=0;i<500;i++){const x=R()*W|0,y=R()*H|0;P.px(x,y,PAL.e1);}
  for(const cr of G.cracks){
    for(let i=1;i<cr.length;i++){const a=cr[i-1],b=cr[i];const L=Math.hypot(b.x-a.x,b.y-a.y);
      for(let t=0;t<=L;t+=6){const x=a.x+(b.x-a.x)*t/L,y=a.y+(b.y-a.y)*t/L;const gg=g.createRadialGradient(x,y,0,x,y,34);gg.addColorStop(0,'rgba(70,30,18,.35)');gg.addColorStop(1,'rgba(70,30,18,0)');g.fillStyle=gg;g.fillRect(x-34,y-34,68,68);}}
    for(let i=1;i<cr.length;i++){const a=cr[i-1],b=cr[i];
      for(let k=-3;k<=3;k++)P.line(a.x,a.y+k,b.x,b.y+k,Math.abs(k)>=3?PAL.w0:PAL.k2);
      for(let k=-1;k<=1;k++)P.line(a.x+k,a.y,b.x+k,b.y,PAL.e1);
      P.line(a.x,a.y,b.x,b.y,PAL.e3);P.line(a.x,a.y-1,b.x,b.y-1,PAL.e2);
      const L=Math.hypot(b.x-a.x,b.y-a.y);for(let t=0;t<L;t+=3+R()*5){const x=a.x+(b.x-a.x)*t/L,y=a.y+(b.y-a.y)*t/L;P.px(x,y,R()<.4?PAL.e5:PAL.e4);
        if(R()<.15)P.line(x,y,x+(R()-.5)*14,y+(R()-.5)*10,PAL.k2);}}}
  return c;
}
function heatAt(x,y){let d=1e9;for(const s of G.segs){const v=segDist(x,y,s[0],s[1],s[2],s[3]);if(v<d)d=v;}return clamp(1-d/170,0,1);}

/* ---------- entidades ---------- */
function addB(kind,x,y){
  x=Math.round(x);y=Math.round(y);const d=BD[kind];
  const b={id:G.nextId++,ent:'b',kind,x,y,w:d.w,dd:d.d,hp:d.hp,maxHp:d.hp,cd:0,g:0,ripeT:0,heat:heatAt(x,y),hitT:0,inside:[],dead:false,claim:null};
  G.buildings.push(b);G.decor=G.decor.filter(o=>!(Math.abs(o.x-x)<d.w/2+14&&Math.abs(o.y-y)<d.d/2+18));return b;
}
function addU(type,x,y,o){
  const t=UT[type];
  const u=Object.assign({id:G.nextId++,ent:'u',type,t,x,y,hp:t.hp,maxHp:t.hp,atk:t.atk,lvl:1,xp:0,gold:0,gear:0,cd:Math.random(),
    think:Math.random()*.4,state:'idle',target:null,dest:null,goal:null,wp:null,waitT:0,face:1,anim:Math.random()*10,moving:false,
    hitT:0,swingT:0,inside:null,bounty:0,hero:!!t.hero,worker:!!t.worker,mon:!t.hero&&!t.worker,dead:false,kills:0,carry:null,field:null,born:G?G.nightsDone+1:1},o||{});
  if(u.hpMul&&u.hpMul!==1){u.maxHp=u.hp=Math.round(t.hp*u.hpMul);u.atk=t.atk*(1+(u.hpMul-1)*.5);}
  G.units.push(u);return u;
}
function genName(){return Math.random()<.55?`${pick(FIRST)} ${pick(EPI)}`:pick(FIRST);}
function randTrait(){return Math.random()<.06?'Honesto':pick(['Covarde','Ganancioso','Bêbado','Amaldiçoado','Valente']);}
function makeHero(cls,x,y,o){o=o||{};return addU(cls,x,y,{name:o.name||genName(),trait:o.trait||randTrait(),home:o.home||null,life:o.life||0});}
const casa=()=>G.casa;
function findB(kind,p){let best=null,bd=1e9;for(const b of G.buildings){if(b.kind!==kind||b.dead)continue;const d=p?dist(p,b):0;if(d<bd){bd=d;best=b;}}return best;}
function nearest(arr,p,maxD,f){let best=null,bd=maxD;for(const u of arr){if(u.dead||u.inside||(f&&!f(u)))continue;const d=dist(p,u);if(d<bd){bd=d;best=u;}}return best;}
function rectDist(p,b){const dx=Math.max(Math.abs(p.x-b.x)-b.w/2,0),dy=Math.max(Math.abs(p.y-b.y)-b.dd/2,0);return Math.hypot(dx,dy);}
function fieldYield(f){return f.kind==='trigo'?{crop:'trigo',amt:Math.round(3+f.heat*5)}:{crop:'alho',amt:Math.round(2+(1-f.heat)*3)};}
const cropColor=c=>c==='trigo'?PAL.e5:PAL.g7;
const baseY=b=>b.y+b.dd/2;

/* ---------- tempo ---------- */
const dayT=()=>G.time%CYCLE;
function darkness(){const D=OPTS.night==='clara'?.55:.78,t=dayT();if(t<DAY_END)return 0;if(t<DUSK_END)return (t-DAY_END)/(DUSK_END-DAY_END)*D;if(t<NIGHT_END)return D;return D*(1-(t-NIGHT_END)/(CYCLE-NIGHT_END));}
function isNight(){const t=dayT();return t>=DUSK_END-4&&t<NIGHT_END+2;}
const workersHide=()=>{const t=dayT();return t>=DAY_END+4&&t<NIGHT_END+1;};
function phaseOf(t){return t<DAY_END?'day':t<DUSK_END?'dusk':t<NIGHT_END?'night':'dawn';}

/* ---------- mensagens e efeitos ---------- */
function msg(t,cls){const log=$('#log');const el=document.createElement('div');el.textContent=t;if(cls)el.className=cls;log.prepend(el);
  while(log.children.length>4)log.lastChild.remove();setTimeout(()=>{el.style.opacity='0';setTimeout(()=>el.remove(),800);},9000);}
function floatT(x,y,text,color){G.floats.push({x,y,text,color:color||PAL.g7,life:1.6,max:1.6});}
function part(x,y,vx,vy,life,c,s,type){if(G.parts.length>500)return;G.parts.push({x,y,vx,vy,life,max:life,c,s,type});}
function burst(x,y,c,n){for(let i=0;i<n;i++)part(x,y,rnd(-40,40),rnd(-60,-10),rnd(.3,.7),c,1,'spark');}

