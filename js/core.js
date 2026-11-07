/* HeranÃ§a de Cinzas Â· Constantes do mundo, atalhos do DOM e utilidades. */
'use strict';
const W=2000,H=1400,CYCLE=150,DAY_END=90,DUSK_END=105,NIGHT_END=145,NIGHTS=7;
const $=s=>document.querySelector(s);
const cv=$('#game'),ctx=cv.getContext('2d');

/* ---------- utilidades ---------- */
const rnd=(a,b)=>a+Math.random()*(b-a);
const ri=(a,b)=>Math.floor(rnd(a,b+1));
const pick=a=>a[Math.floor(Math.random()*a.length)];
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
const dist=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y);
function mulberry32(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296;};}
function segDist(px,py,ax,ay,bx,by){const dx=bx-ax,dy=by-ay,l=dx*dx+dy*dy;let t=l?((px-ax)*dx+(py-ay)*dy)/l:0;t=clamp(t,0,1);return Math.hypot(px-(ax+dx*t),py-(ay+dy*t));}

