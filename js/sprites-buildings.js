/* HeranÃ§a de Cinzas Â· Sprites das construÃ§Ãµes, guildas e estandartes de prestÃ­gio. */
'use strict';
/* ---------- sprites de construções ---------- */
function win(P,x,y,w,h,m){P.rect(x-1,y-1,w+2,h+2,PAL.w0);P.rect(x,y,w,h,PAL.e3);P.rect(x,y,w-1,h-1,PAL.e4);P.px(x+1,y+1,PAL.e6);
  P.rect(x+Math.floor(w/2),y,1,h,PAL.w0);P.rect(x,y+Math.floor(h/2),w,1,PAL.w0);if(m)m.wins.push({x:x+w/2,y:y+h/2});}
function door(P,x,yb,w,h){P.rect(x-1,yb-h,w+2,h+1,PAL.w0);P.rect(x,yb-h+1,w,h,PAL.k2);P.rect(x,yb-h+1,1,h,PAL.w1);P.px(x+w-2,yb-Math.floor(h/2),PAL.y1);}
function house(o){
  const top=o.top||0,eL=o.extraL||0,eR=o.extraR||0;
  const w=o.W+o.RO*2+2+eL+eR,h=top+o.RH+o.WH+2;const meta={wins:[],chim:null};
  const spr=sprite(w,h,P=>{
    const x0=1+o.RO+eL,x1=x0+o.W-1,wt=top+1+o.RH,wb=h-2;const [wl,wm,wd]=o.wall;
    P.rect(x0,wt,o.W,o.WH,wm);
    if(o.style==='v'){for(let x=x0;x<=x1;x+=4){P.rect(x,wt,1,o.WH,wd);P.rect(x+1,wt,1,o.WH,wl);}}
    else if(o.style==='h'){for(let y=wt+1;y<=wb;y+=3){P.rect(x0,y,o.W,1,wd);if(y+1<=wb)P.rect(x0,y+1,o.W,1,wl);}}
    else{for(let y=wt;y<=wb;y+=4){const off=((y-wt)/4)%2?3:0;P.rect(x0,y,o.W,1,wd);for(let x=x0+off;x<=x1;x+=6)P.rect(x,y,1,Math.min(4,wb-y+1),wd);if(y+1<=wb)P.rect(x0,y+1,o.W,1,wl);}}
    const sx=Math.round(x0+o.W*.7);P.dith(sx,wt,x1-sx+1,o.WH,PAL.k3,.5);
    P.dith(x0,wb-3,o.W,2,PAL.k3,.25);P.dith(x0,wb-1,o.W,2,PAL.k3,.6);
    const [rd,rm,rl]=o.roof,ins=Math.round(o.W*.14),ry0=top+1,ry1=wt;
    P.trap(ry0,ry1,x0-o.RO+ins,x1+o.RO-ins,x0-o.RO,x1+o.RO,rm);
    for(let y=ry0+2;y<=ry1;y+=3){const t=(y-ry0)/(ry1-ry0);const a=Math.round(x0-o.RO+ins*(1-t)),b=Math.round(x1+o.RO-ins*(1-t));
      P.rect(a,y,b-a+1,1,rd);for(let x=a+(((y/3)|0)%2?2:0);x<=b;x+=4)P.px(x,y-1,rd);}
    const mid=Math.round((x0+x1)/2+o.W*.18);
    for(let y=ry0;y<=ry1;y++){const t=(y-ry0)/(ry1-ry0);const a=Math.round(x0-o.RO+ins*(1-t)),b=Math.round(x1+o.RO-ins*(1-t));P.dith(mid,y,b-mid+1,1,PAL.k2,.5);P.rect(a,y,2,1,rl);}
    P.rect(x0-o.RO+ins,ry0,o.W+2*o.RO-2*ins,1,PAL.g6);P.dith(x0-o.RO+ins,ry0+1,o.W+2*o.RO-2*ins,2,PAL.g5,.5);
    P.rect(x0-o.RO,ry1,o.W+2*o.RO,1,PAL.k3);
    if(o.after)o.after(P,{x0,x1,wt,wb,ry0,ry1,w,h,top,WH:o.WH},meta);
  });
  const ax=1+o.RO+eL+Math.floor(o.W/2),ay=h-2;
  return {spr,ax,ay,wins:meta.wins.map(p=>({dx:p.x-ax,dy:p.y-ay})),chim:meta.chim?{dx:meta.chim.x-ax,dy:meta.chim.y-ay}:null};
}
function chimneyAt(P,m,x,ry0,wd){P.rect(x,1,wd,ry0+8,PAL.g2);for(let y=3;y<ry0+8;y+=3)P.rect(x,y,wd,1,PAL.g1);P.rect(x,1,1,ry0+8,PAL.g3);P.rect(x-1,0,wd+2,2,PAL.g1);m.chim={x:x+wd/2,y:0};}
function towerSpr(){
  const T=6,w=28,h=92,meta={wins:[]};
  const spr=sprite(w,h,P=>{
    const top=T+18,bot=h-2;
    for(let x=5;x<=22;x++){const c=x<8?PAL.g4:x<14?PAL.g3:x<19?PAL.g2:PAL.g1;P.rect(x,top,1,bot-top+1,c);}
    for(let y=top+3;y<=bot;y+=4){const off=((y/4)|0)%2?0:3;P.dith(5,y,18,1,PAL.k3,.6);for(let x=5+off;x<=22;x+=6)P.px(x,y-1,PAL.k3);}
    P.rect(13,top+14,1,5,PAL.k);P.rect(13,top+34,1,5,PAL.k);
    P.rect(11,bot-9,6,10,PAL.w0);P.rect(12,bot-8,4,9,PAL.k2);
    P.rect(3,top-5,22,5,PAL.g3);P.rect(3,top-5,4,5,PAL.g4);P.rect(20,top-5,5,5,PAL.g1);
    for(let x=3;x<=23;x+=4)P.rect(x,top-8,2,3,PAL.g3);
    P.rect(11,top-4,6,4,PAL.e4);P.px(13,top-3,PAL.e6);P.px(14,top-3,PAL.e5);meta.wins.push({x:14,y:top-2});
    for(let y=T;y<=T+12;y++){const ww=Math.round((y-T)/12*26)+1;const x=14-(ww>>1);P.rect(x,y,ww,1,PAL.w1);P.rect(x,y,Math.min(2,ww),1,PAL.w2);if(ww>4)P.rect(x+ww-3,y,3,1,PAL.w0);}
    P.rect(14,1,1,T,PAL.w0);P.rect(15,1,5,2,PAL.b1);P.px(20,2,PAL.b1);P.px(15,3,PAL.b0);
  });
  const ax=14,ay=h-2;return {spr,ax,ay,wins:meta.wins.map(p=>({dx:p.x-ax,dy:p.y-ay})),chim:null};
}
const SB={
  casa:house({W:56,WH:20,RH:18,RO:4,top:8,style:'v',wall:[PAL.w3,PAL.w2,PAL.w1],roof:[PAL.g2,PAL.g3,PAL.g4],after:(P,q,m)=>{
    const cx=Math.round((q.x0+q.x1)/2);door(P,cx-3,q.wb,6,10);
    win(P,q.x0+6,q.wt+5,6,5,m);win(P,q.x1-11,q.wt+5,6,5,m);chimneyAt(P,m,q.x1-14,q.ry0,6);
    P.px(cx-1,q.wb-13,PAL.g5);P.px(cx+1,q.wb-13,PAL.g5);P.px(cx-1,q.wb-12,PAL.g5);P.px(cx+1,q.wb-12,PAL.g5);P.px(cx,q.wb-11,PAL.g5);
    for(let i=0;i<5;i++){P.px(cx+6,q.wt+3+i,PAL.g7);if(i%2)P.px(cx+7,q.wt+3+i,PAL.g6);}P.px(cx+6,q.wt+2,PAL.v1);
    for(let i=0;i<3;i++)for(let j=0;j<3-i;j++){const lx=q.x0+3+j*3+i;P.disc(lx,q.wb-1-i*2,1,1,PAL.w2);P.px(lx,q.wb-1-i*2,PAL.w4);}
  }}),
  casebre:house({W:32,WH:13,RH:11,RO:3,top:2,style:'h',wall:[PAL.w2,PAL.w1,PAL.w0],roof:[PAL.g1,PAL.g2,PAL.g3],after:(P,q,m)=>{
    door(P,q.x0+4,q.wb,5,8);const wx=q.x1-10,wy=q.wt+3;P.rect(wx,wy,6,5,PAL.k2);P.line(wx,wy,wx+5,wy+4,PAL.w3);P.line(wx+5,wy,wx,wy+4,PAL.w3);
    P.rect(q.x0+4,q.ry0+4,6,3,PAL.w1);P.rect(q.x0+16,q.ry0+7,5,2,PAL.w2);m.wins.push({x:q.x0+6,y:q.wb-5});
  }}),
  taverna:house({W:64,WH:30,RH:18,RO:4,top:10,extraR:12,style:'s',wall:[PAL.g4,PAL.g3,PAL.g2],roof:[PAL.b0,PAL.b1,PAL.e2],after:(P,q,m)=>{
    const up=14;P.rect(q.x0,q.wt,64,up,PAL.g5);P.dith(q.x0,q.wt,64,up,PAL.g4,.25);
    P.rect(q.x0,q.wt,64,1,PAL.w1);P.rect(q.x0,q.wt+up,64,2,PAL.w1);
    for(let x=q.x0;x<=q.x1;x+=12)P.rect(x,q.wt,2,up,PAL.w1);
    for(let x=q.x0;x+12<=q.x1;x+=24)P.line(x+2,q.wt+up-1,x+11,q.wt+1,PAL.w1);
    const sx=Math.round(q.x0+64*.7);P.dith(sx,q.wt,q.x1-sx+1,up,PAL.k3,.5);
    win(P,q.x0+16,q.wt+4,5,5,m);win(P,q.x0+40,q.wt+4,5,5,m);win(P,q.x0+12,q.wt+18,6,5,m);win(P,q.x1-14,q.wt+18,6,5,m);
    const cx=Math.round((q.x0+q.x1)/2);door(P,cx-4,q.wb,8,11);
    P.rect(q.x1+1,q.wt+3,10,1,PAL.w0);P.rect(q.x1+4,q.wt+4,1,2,PAL.g2);P.rect(q.x1+2,q.wt+6,9,8,PAL.w3);P.rect(q.x1+2,q.wt+6,9,1,PAL.w4);
    P.rect(q.x1+5,q.wt+8,3,4,PAL.y2);P.px(q.x1+8,q.wt+9,PAL.y1);P.px(q.x1+8,q.wt+10,PAL.y1);P.rect(q.x1+5,q.wt+8,3,1,PAL.g7);
    for(const bx_ of[q.x0+3,q.x0+8]){P.rect(bx_-2,q.wb-5,5,6,PAL.w2);P.rect(bx_-2,q.wb-4,5,1,PAL.g2);P.rect(bx_-2,q.wb-1,5,1,PAL.g2);P.rect(bx_-2,q.wb-5,1,6,PAL.w3);}
    chimneyAt(P,m,q.x0+6,q.ry0,5);
  }}),
  g_warrior:house({W:52,WH:15,RH:13,RO:4,top:10,extraL:7,style:'h',wall:[PAL.w2,PAL.w1,PAL.w0],roof:[PAL.g1,PAL.g2,PAL.g3],after:(P,q,m)=>{
    const cx=Math.round((q.x0+q.x1)/2);door(P,cx-3,q.wb,6,9);
    for(const [sx,c] of [[q.x0+7,PAL.b1],[q.x1-7,PAL.e2]]){P.disc(sx,q.wt+6,3,3,PAL.k3);P.disc(sx,q.wt+6,2,2,c);P.px(sx,q.wt+6,PAL.g5);P.px(sx-1,q.wt+5,PAL.e3);}
    P.line(cx+6,q.wt+1,cx+12,q.wt+12,PAL.w2);P.line(cx+12,q.wt+1,cx+6,q.wt+12,PAL.w2);P.px(cx+6,q.wt+1,PAL.g6);P.px(cx+12,q.wt+1,PAL.g6);
    win(P,cx-12,q.wt+4,5,4,m);
    const px_=q.x0-5;P.rect(px_,1,1,q.wb,PAL.w1);P.px(px_,0,PAL.y2);P.rect(px_+1,2,7,10,PAL.b1);P.dith(px_+1,2,7,10,PAL.b0,.4);P.px(px_+8,11,PAL.b1);
    P.rect(px_+3,5,3,3,PAL.k3);P.px(px_+3,4,PAL.k3);P.px(px_+5,4,PAL.k3);
  }}),
  g_archer:house({W:38,WH:15,RH:12,RO:3,top:9,style:'h',wall:[PAL.w3,PAL.w2,PAL.w1],roof:[PAL.v0,PAL.v1,PAL.v2],after:(P,q,m)=>{
    door(P,q.x0+5,q.wb,6,9);
    for(let y=q.wt+1;y<=q.wb;y+=3){P.disc(q.x0-1,y,1,1,PAL.w3);P.px(q.x0-1,y,PAL.w4);P.disc(q.x1+1,y,1,1,PAL.w2);}
    const tx=q.x1-8,ty=q.wt+7;P.disc(tx,ty,4,4,PAL.g7);P.disc(tx,ty,3,3,PAL.b1);P.disc(tx,ty,2,2,PAL.g7);P.px(tx,ty,PAL.y2);
    P.line(tx-1,ty,tx-6,ty-3,PAL.w2);P.px(tx-6,ty-3,PAL.g6);P.line(tx+1,ty-1,tx+5,ty-5,PAL.w2);P.px(tx+5,ty-5,PAL.g6);
    const cx=Math.round((q.x0+q.x1)/2),ay=q.ry0;
    P.line(cx,ay+2,cx-5,ay-6,PAL.g6);P.line(cx-3,ay-2,cx-7,ay-3,PAL.g6);P.line(cx-4,ay-4,cx-4,ay-8,PAL.g6);
    P.line(cx,ay+2,cx+5,ay-6,PAL.g6);P.line(cx+3,ay-2,cx+7,ay-3,PAL.g6);P.line(cx+4,ay-4,cx+4,ay-8,PAL.g6);P.rect(cx-1,ay+1,3,2,PAL.g7);
    win(P,q.x0+15,q.wt+4,4,4,m);
  }}),
  g_healer:house({W:30,WH:24,RH:9,RO:2,top:34,style:'s',wall:[PAL.g5,PAL.g4,PAL.g3],roof:[PAL.k3,PAL.g1,PAL.g2],after:(P,q,m)=>{
    const cx=Math.round((q.x0+q.x1)/2),dt=q.ry0-9;
    P.rect(cx-5,dt,11,10,PAL.g4);P.rect(cx+2,dt,4,10,PAL.g3);P.rect(cx-5,dt,1,10,PAL.g5);P.rect(cx-1,dt+3,2,4,PAL.k2);
    const ws=[1,3,5,7,9,11,11,11,9,7],d0=dt-ws.length;
    ws.forEach((w,i)=>{const x=cx-(w>>1);P.rect(x,d0+i,w,1,PAL.y1);if(w>2){const s=Math.max(1,(w/3)|0);P.rect(x,d0+i,s,1,PAL.y2);P.rect(x+w-s,d0+i,s,1,PAL.y0);}});
    P.px(cx-2,d0+4,PAL.e6);P.px(cx-3,d0+5,PAL.e6);
    P.rect(cx,d0-8,1,8,PAL.y1);P.rect(cx-1,d0-7,3,1,PAL.y2);P.rect(cx-2,d0-5,5,1,PAL.y2);P.px(cx-1,d0-2,PAL.y2);P.px(cx+1,d0-3,PAL.y2);
    P.rect(cx-1,q.wt+3,3,8,PAL.w0);P.rect(cx,q.wt+3,1,8,PAL.e4);P.px(cx,q.wt+4,PAL.e6);m.wins.push({x:cx,y:q.wt+7});
    P.rect(cx-3,q.wb-9,7,10,PAL.w0);P.rect(cx-2,q.wb-8,5,9,PAL.k2);P.rect(cx-1,q.wb-10,3,1,PAL.w0);
    win(P,q.x0+3,q.wt+6,3,4,m);win(P,q.x1-5,q.wt+6,3,4,m);
  }}),
  forja:house({W:48,WH:17,RH:11,RO:3,top:18,extraL:9,style:'s',wall:[PAL.g4,PAL.g3,PAL.g2],roof:[PAL.k3,PAL.g1,PAL.g2],after:(P,q,m)=>{
    const ox=q.x1-21;P.rect(ox,q.wt+2,21,q.WH-2,PAL.k2);P.rect(ox,q.wt+2,1,q.WH-2,PAL.w1);
    const fx=q.x1-17,fy0=q.wb-11;P.rect(fx,fy0,13,12,PAL.g2);P.rect(fx,fy0,13,1,PAL.g3);P.rect(fx+3,fy0+4,7,6,PAL.e2);P.rect(fx+4,fy0+5,5,5,PAL.e3);P.rect(fx+5,fy0+6,3,3,PAL.e4);P.px(fx+6,fy0+7,PAL.e6);
    m.wins.push({x:fx+6,y:fy0+7});
    const chx=fx+3;chimneyAt(P,m,chx,q.ry0,7);P.rect(chx+1,0,5,1,PAL.e3);
    const ax_=q.x0-7;P.rect(ax_,q.wb-3,4,4,PAL.w1);P.rect(ax_-1,q.wb-5,7,2,PAL.k3);P.px(ax_-1,q.wb-5,PAL.g4);
    for(let i=0;i<3;i++){P.rect(q.x0+4+i*4,q.wt+3,1,6,PAL.w2);P.rect(q.x0+3+i*4,q.wt+3,3,2,PAL.g4);}
  }}),
  g_lancer:house({W:46,WH:16,RH:12,RO:3,top:12,style:'s',wall:[PAL.g4,PAL.g3,PAL.g2],roof:[PAL.w0,PAL.w1,PAL.w2],after:(P,q,m)=>{
    const cx=Math.round((q.x0+q.x1)/2);door(P,cx-5,q.wb,6,9);win(P,q.x0+5,q.wt+4,5,4,m);
    P.rect(q.x1-16,q.wt+4,14,1,PAL.w0);
    for(let i=0;i<4;i++){const sx=q.x1-15+i*4,st=q.ry0-6+i;P.rect(sx,st,1,q.wb-st+1,PAL.w2);P.px(sx,st-1,PAL.g6);P.px(sx,st-2,PAL.g7);}
    P.rect(q.x0+2,1,1,q.ry0+2,PAL.w1);P.rect(q.x0+3,1,6,2,PAL.y1);P.px(q.x0+9,1,PAL.y1);P.rect(q.x0+3,3,4,1,PAL.y0);
  }}),
  g_mage:house({W:24,WH:34,RH:16,RO:3,top:6,style:'s',wall:[PAL.g3,PAL.g2,PAL.g1],roof:[PAL.p0,PAL.p1,PAL.n2],after:(P,q,m)=>{
    const cx=Math.round((q.x0+q.x1)/2);door(P,cx-3,q.wb,6,9);
    const pw=(x,y)=>{P.rect(x-1,y-1,5,6,PAL.k);P.rect(x,y,3,4,PAL.p1);P.rect(x,y,2,3,PAL.n3);P.px(x,y,PAL.e6);m.wins.push({x:x+1,y:y+2});};
    pw(cx-1,q.wt+5);pw(cx-1,q.wt+15);
    P.rect(cx,1,1,q.ry0,PAL.k3);P.rect(cx-1,0,3,3,PAL.p1);P.px(cx,1,PAL.z0);
    for(let i=0;i<5;i++)P.px(q.x0+2+i*5,q.wb-12+(i%2),PAL.p1);
  }}),
  g_conjurer:house({W:38,WH:14,RH:16,RO:4,top:6,extraR:3,style:'h',wall:[PAL.n2,PAL.n1,PAL.n0],roof:[PAL.k3,PAL.p0,PAL.p1],after:(P,q,m)=>{
    const cx=Math.round((q.x0+q.x1)/2);door(P,cx-3,q.wb,6,9);
    for(const [x,y] of [[q.x0+4,q.wt+4],[q.x0+9,q.wt+7],[q.x1-9,q.wt+4],[q.x1-4,q.wt+7]]){P.px(x,y,PAL.z0);P.px(x+1,y+1,PAL.z0);P.px(x-1,y+1,PAL.v2);}
    m.wins.push({x:cx,y:q.wt+6});
    P.rect(q.x1+1,q.wt,1,4,PAL.g2);P.rect(q.x1,q.wt+4,3,3,PAL.g7);P.px(q.x1,q.wt+5,PAL.z0);P.px(q.x1+2,q.wt+5,PAL.z0);
    P.line(cx-3,q.ry0,cx-6,q.ry0-5,PAL.g6);P.line(cx+3,q.ry0,cx+6,q.ry0-5,PAL.g6);
  }}),
  torre:towerSpr(),
};
const PRES_COL={paladin:[PAL.g7,PAL.y2,1],heavyknight:[PAL.g3,PAL.k3,0],ranger:[PAL.v1,PAL.y2,0],assassin:[PAL.k2,PAL.b1,0],sentinel:[PAL.b1,PAL.g7,0],templar:[PAL.g7,PAL.b1,1],
  elementalist:[PAL.e2,PAL.e5,0],warlock:[PAL.p0,PAL.z0,0],sorcerer:[PAL.n2,PAL.e5,0],necromancer:[PAL.k2,PAL.g7,0],bishop:[PAL.g7,PAL.y2,1],cleric:[PAL.y1,PAL.g7,1]};
const BANNER={};
for(const k in PRES_COL){const [c,mk,cross]=PRES_COL[k];BANNER[k]=sprite(10,22,P=>{P.rect(1,1,1,20,PAL.w1);P.px(1,0,PAL.y2);P.rect(2,2,6,10,c);P.rect(2,12,2,2,c);P.rect(6,12,2,2,c);P.dith(6,2,2,12,PAL.k2,.4);
  if(cross){P.rect(4,4,1,6,mk);P.rect(3,6,3,1,mk);}else{P.rect(4,5,2,3,mk);P.px(4,4,mk);}});}
function fieldThumb(kind){return sprite(30,22,P=>{P.rect(1,3,28,17,PAL.w0);for(let i=0;i<4;i++){const y=6+i*4;P.rect(2,y,26,1,PAL.w1);
  for(let j=0;j<6;j++){const x=4+j*4;if(kind==='trigo'){P.rect(x,y-4,1,4,PAL.y1);P.px(x,y-5,PAL.e5);}else{P.px(x-1,y-2,PAL.v1);P.px(x+1,y-3,PAL.v2);P.rect(x-1,y-1,3,2,PAL.g7);}}}});}
const THUMB={trigo:fieldThumb('trigo'),alho:fieldThumb('alho')};

