/* HeranÃ§a de Cinzas Â· Toque, mouse, pinÃ§a e teclado. */
'use strict';
/* ---------- entrada ---------- */
function pickAt(p){
  const r=Math.max(7,20*dpr/Z);let best=null,bd=r;
  for(const u of G.units){if(u.inside||u.dead)continue;const s=SU[u.type];const d=Math.hypot(u.x-p.x,(u.y-s.ay*.45)-p.y);if(d<bd*(u.t.boss?1.8:1)){bd=d;best=u;}}
  if(best)return best;
  for(let i=G.buildings.length-1;i>=0;i--){const b=G.buildings[i];
    if(isField(b)){if(Math.abs(p.x-b.x)<b.w/2+3&&Math.abs(p.y-b.y)<b.dd/2+3)return b;continue;}
    const s=SB[b.kind],l=b.x-s.ax,t=baseY(b)-s.ay;if(p.x>=l&&p.x<l+s.spr.width&&p.y>=t+4&&p.y<=baseY(b)+3)return b;}
  for(const o of G.decor)if(o.kind==='prop'){const pr=PROPS[o.type];if(p.x>=o.x-pr.ax-2&&p.x<o.x-pr.ax+o.spr.width+2&&p.y>=o.y-pr.ay-2&&p.y<=o.y+3)return o;}
  for(const l of G.lairs)if(!l.dead&&Math.hypot(l.x-p.x,(l.y-p.y)*1.4)<l.r)return l;
  return null;
}
function tap(sx,sy){if(!G||G.over||!started)return;const p=s2w(sx,sy);if(buildMode){tryBuild(buildMode,p.x,p.y);return;}
  const e=pickAt(p);if(e&&e.ent==='b'&&isField(e)&&e.g>=1)harvestNow(e);select(e);}
const ptrs=new Map();let pinch=null,multi=false;
cv.addEventListener('pointerdown',e=>{cv.setPointerCapture(e.pointerId);ptrs.set(e.pointerId,{x:e.clientX,y:e.clientY,sx:e.clientX,sy:e.clientY,moved:false});
  if(G&&buildMode)G.ghost=s2w(e.clientX,e.clientY);
  if(ptrs.size===2){multi=true;const [a,b]=[...ptrs.values()];a.moved=b.moved=true;pinch={d:Math.hypot(a.x-b.x,a.y-b.y)||1,z:Z,mx:(a.x+b.x)/2,my:(a.y+b.y)/2};}});
cv.addEventListener('pointermove',e=>{const p=ptrs.get(e.pointerId);if(G&&buildMode&&(e.pointerType==='mouse'||p))G.ghost=s2w(e.clientX,e.clientY);if(!p)return;
  if(ptrs.size===1){if(!p.moved&&Math.hypot(e.clientX-p.sx,e.clientY-p.sy)>9)p.moved=true;if(p.moved){cam.x-=(e.clientX-p.x)*dpr/Z;cam.y-=(e.clientY-p.y)*dpr/Z;clampCam();}p.x=e.clientX;p.y=e.clientY;}
  else if(ptrs.size===2&&pinch){p.x=e.clientX;p.y=e.clientY;const [a,b]=[...ptrs.values()];const d=Math.hypot(a.x-b.x,a.y-b.y)||1,mx=(a.x+b.x)/2,my=(a.y+b.y)/2;
    cam.x-=(mx-pinch.mx)*dpr/Z;cam.y-=(my-pinch.my)*dpr/Z;pinch.mx=mx;pinch.my=my;OX=Math.round(cam.x-bw/2);OY=Math.round(cam.y-bh/2);setZ(pinch.z*d/pinch.d,mx,my);}});
function endPtr(e){const p=ptrs.get(e.pointerId);if(!p)return;ptrs.delete(e.pointerId);if(!p.moved&&!multi&&e.type==='pointerup')tap(e.clientX,e.clientY);if(ptrs.size<2)pinch=null;if(ptrs.size===0)multi=false;}
cv.addEventListener('pointerup',endPtr);cv.addEventListener('pointercancel',endPtr);
cv.addEventListener('pointerleave',e=>{if(e.pointerType==='mouse'&&G)G.ghost=null;});
let wheelAcc=0;cv.addEventListener('wheel',e=>{e.preventDefault();wheelAcc+=e.deltaY;if(Math.abs(wheelAcc)>=80){setZ(Z+(wheelAcc<0?1:-1),e.clientX,e.clientY);wheelAcc=0;}},{passive:false});
cv.addEventListener('contextmenu',e=>e.preventDefault());
const keys={};
window.addEventListener('keydown',e=>{const k=e.key.toLowerCase();keys[k]=true;
  if(k===' '){if(started&&G&&!G.over){paused=!paused;syncSpeed();}e.preventDefault();}
  else if(k==='b'){if($('#buildMenu').hidden)openBuildMenu();else closeBuildMenu();}
  else if(k==='escape'){
    if(!$('#buildMenu').hidden){closeBuildMenu();return;}
    if(!overlayEl.hidden){if(uiScreen==='pause'){overlayEl.hidden=true;uiScreen='game';}else if(uiScreen==='opts'&&optsBack==='pause')showScreen('pause');}
    else if(buildMode||sel||!$('#roster').hidden){buildMode=null;select(null);$('#roster').hidden=true;refreshBar();updateHint();}
    else openPause();}
  else if(k==='n')skipToNight();else if(k==='h')$('#heroBtn').click();
  else if(k==='+'||k==='=')setZ(Z+1,window.innerWidth/2,window.innerHeight/2);else if(k==='-')setZ(Z-1,window.innerWidth/2,window.innerHeight/2);
  else{const n=parseInt(k,10);if(n>=1&&n<=BUILD_ORDER.length)toggleBuild(BUILD_ORDER[n-1]);}});
window.addEventListener('keyup',e=>{keys[e.key.toLowerCase()]=false;});
window.addEventListener('blur',()=>{for(const k in keys)keys[k]=false;});

