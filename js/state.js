/* HeranÃ§a de Cinzas Â· Estado global, cÃ¢mera e resoluÃ§Ã£o de pixel. */
'use strict';
let G=null,sel=null,buildMode=null,speed=1,paused=false,started=false,ground=null;
const cam={x:W/2,y:H/2};
let dpr=1,Z=3,bw=1,bh=1,OX=0,OY=0;
const buf=mkCanvas(1,1);let bx=buf.getContext('2d',{willReadFrequently:true});
const lb=mkCanvas(1,1),lbx=lb.getContext('2d');
const isField=b=>!!BD[b.kind].field;

/* ---------- tela e câmera de pixel ---------- */
function zRange(){const mn=Math.max(1,Math.ceil(cv.width/560));return [mn,mn+6];}
function defaultZ(){const [a,b]=zRange();const off=typeof OPTS==='undefined'?0:OPTS.pixel==='maior'?1:OPTS.pixel==='menor'?-1:0;return clamp(Math.round(cv.width/360)+off,a,b);}
function resize(){
  dpr=Math.min(3,window.devicePixelRatio||1);
  cv.width=Math.max(1,Math.round(window.innerWidth*dpr));cv.height=Math.max(1,Math.round(window.innerHeight*dpr));
  const [a,b]=zRange();Z=clamp(Z,a,b);fitBuffer();
}
function fitBuffer(){const w=Math.max(1,Math.ceil(cv.width/Z)),h=Math.max(1,Math.ceil(cv.height/Z));
  if(buf.width!==w||buf.height!==h){buf.width=lb.width=w;buf.height=lb.height=h;bx=buf.getContext('2d',{willReadFrequently:true});}bw=w;bh=h;}
let lastW=-1,lastH=-1;
function checkSize(){if(window.innerWidth!==lastW||window.innerHeight!==lastH){const first=lastW<10;lastW=window.innerWidth;lastH=window.innerHeight;resize();if(first){Z=defaultZ();fitBuffer();}}}
window.addEventListener('resize',checkSize);
const s2w=(sx,sy)=>({x:OX+sx*dpr/Z,y:OY+sy*dpr/Z});
function clampCam(){const hx=bw/2,hy=bh/2;cam.x=W>bw?clamp(cam.x,hx,W-hx):W/2;cam.y=H>bh?clamp(cam.y,hy-40,H-hy+60):H/2;}
function setZ(nz,sx,sy){const [a,b]=zRange();nz=clamp(Math.round(nz),a,b);if(nz===Z)return;const p=s2w(sx,sy);Z=nz;fitBuffer();
  cam.x=p.x-(sx*dpr/Z)+bw/2;cam.y=p.y-(sy*dpr/Z)+bh/2;clampCam();OX=Math.round(cam.x-bw/2);OY=Math.round(cam.y-bh/2);}

