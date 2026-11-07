/* HeranÃ§a de Cinzas Â· Desenho em pixel art, luz da noite, quantizaÃ§Ã£o e cena do tÃ­tulo. */
'use strict';
/* ---------- desenho em pixel ---------- */
function R_(x,y,w,h,c){bx.fillStyle=c;bx.fillRect(Math.round(x),Math.round(y),w,h);}
function inView(x,y,m){return x>OX-m&&x<OX+bw+m&&y>OY-m&&y<OY+bh+m*1.6;}
function shadow(x,y,rx){x=Math.round(x);y=Math.round(y);bx.fillStyle='rgba(8,6,8,.5)';bx.fillRect(x-rx,y,rx*2+1,1);bx.fillRect(x-rx+1,y-1,rx*2-1,1);bx.fillRect(x-rx+1,y+1,rx*2-1,1);}
function drawField(b,T){
  const x0=Math.round(b.x-b.w/2),y0=Math.round(b.y-b.dd/2),w=b.w,h=b.dd,wheat=b.kind==='trigo',ripe=b.g>=1;
  R_(x0-1,y0-1,w+2,h+2,PAL.k2);R_(x0,y0,w,h,PAL.w0);
  for(const [cx,cy] of [[x0-1,y0-1],[x0+w,y0-1],[x0-1,y0+h],[x0+w,y0+h]]){R_(cx,cy-4,1,5,PAL.w2);R_(cx,cy-4,1,1,PAL.w3);}
  const rows=wheat?6:5,cols=wheat?11:8;
  for(let i=0;i<rows;i++){const y=y0+3+Math.round(i*(h-6)/(rows-1));R_(x0+1,y,w-2,1,PAL.w1);R_(x0+1,y+1,w-2,1,PAL.k3);
    if(b.g<=.03)continue;
    for(let j=0;j<cols;j++){const x=x0+3+Math.round(j*(w-6)/(cols-1));
      if(wheat){const hg=1+Math.round(b.g*5);const sway=ripe&&((T*3+j*.7+i)%4)<1?1:0;
        R_(x+sway,y-hg,1,hg,ripe?((i+j)%3?PAL.y2:PAL.y1):b.g>.6?PAL.y0:PAL.v1);if(ripe)R_(x+sway,y-hg-1,1,1,PAL.e5);}
      else{const lh=1+Math.round(b.g*3);R_(x-1,y-lh,1,lh,PAL.v1);R_(x+1,y-lh+1,1,lh,PAL.v2);if(b.g>.45)R_(x-1,y-1,3,2,ripe?PAL.g7:PAL.g5);}}}
  if(ripe&&Math.sin(T*5)>0){bx.fillStyle=wheat?PAL.e5:PAL.g7;bx.fillRect(x0-2,y0-2,w+4,1);bx.fillRect(x0-2,y0+h+1,w+4,1);bx.fillRect(x0-2,y0-2,1,h+4);bx.fillRect(x0+w+1,y0-2,1,h+4);}
  if(b.hitT>0){bx.fillStyle='rgba(255,255,255,.4)';bx.fillRect(x0,y0,w,h);}
}
function drawBuilding(b){
  const s=SB[b.kind],x=Math.round(b.x)-s.ax,y=Math.round(baseY(b))-s.ay;
  bx.fillStyle='rgba(8,6,8,.45)';for(let i=0;i<5;i++)bx.fillRect(x+6+i,Math.round(baseY(b))+1+i-2,s.spr.width-8,1);
  bx.drawImage(s.spr,x,y);
  if(b.prestige)bx.drawImage(BANNER[b.prestige],x-2,y-6);
  if(b.hitT>0){bx.globalAlpha=.6;bx.drawImage(whiteOf(s.spr),x,y);bx.globalAlpha=1;}
}
function drawLair(l){const s=l.kind==='cemiterio'?LAIR.cem:LAIR.nin,a=LAIR_ANCH[l.kind];const x=l.x-a.x,y=l.y-a.y;
  if(l.dead){bx.globalAlpha=.45;bx.drawImage(s,x,y);bx.globalAlpha=1;return;}bx.drawImage(s,x,y);if(l.hitT>0){bx.globalAlpha=.5;bx.drawImage(whiteOf(s),x,y);bx.globalAlpha=1;}}
function drawDecor(o){if(o.kind==='prop'){const p=PROPS[o.type];shadow(o.x+2,o.y,Math.round(o.spr.width/3));bx.drawImage(o.spr,o.x-p.ax,o.y-p.ay);}
  else if(o.kind==='tree'){shadow(o.x+4,o.y,7);bx.drawImage(o.spr,o.x-17,o.y-46);}else bx.drawImage(o.spr,o.x-Math.round(o.spr.width/2),o.y-8);}
function unitFrame(u){if(u.swingT>0)return 3;if(u.moving)return [1,0,2,0][Math.floor(u.anim*9)%4];return 0;}
function unitSpr(u,f,face){const s=SU[u.type];return (face<0?s.l:s.r)[f];}
function drawUnit(u){
  const s=SU[u.type],f=unitFrame(u),spr=(u.face<0?s.l:s.r)[f];const ax=u.face<0?spr.width-1-s.ax:s.ax;
  const x=Math.round(u.x)-ax,y=Math.round(u.y)-s.ay;
  shadow(u.x,u.y,u.t.boss?8:u.type==='lobo'?6:4);
  if(u.worker&&u.carry){const sx=Math.round(u.x)-u.face*4-1;R_(sx-1,Math.round(u.y)-13,4,5,PAL.k);R_(sx,Math.round(u.y)-12,2,3,u.carry.crop==='trigo'?PAL.w3:PAL.g6);}
  if(u.type==='espirito')bx.globalAlpha=.7;
  bx.drawImage(spr,x,y);bx.globalAlpha=1;
  if(u.hitT>0){bx.globalAlpha=.75;bx.drawImage(whiteOf(spr),x,y);bx.globalAlpha=1;}
}
function eyePts(u){const s=SU[u.type];return s.eye.map(e=>({x:Math.round(u.x)+e.dx*u.face,y:Math.round(u.y)+e.dy}));}
function quantize(){
  const id=bx.getImageData(0,0,bw,bh),d=id.data,ox=OX&3,oy=OY&3;
  for(let y=0;y<bh;y++){const row=((y+oy)&3)<<2;let i=y*bw*4;
    for(let x=0;x<bw;x++,i+=4){const t=BOFF[row|((x+ox)&3)];let r=d[i]+t,g=d[i+1]+t,b=d[i+2]+t;
      r=r<0?0:r>255?255:r;g=g<0?0:g>255?255:g;b=b<0?0:b>255?255:b;const c=LUT[((r>>3)<<10)|((g>>3)<<5)|(b>>3)];d[i]=c>>16;d[i+1]=(c>>8)&255;d[i+2]=c&255;d[i+3]=255;}}
  bx.putImageData(id,0,0);
}
const ash=[];for(let i=0;i<110;i++)ash.push({x:Math.random(),y:Math.random(),v:.012+Math.random()*.03,d:Math.random()*6,c:Math.random()<.5?PAL.g5:PAL.g6});
function ring(x,y,rx,ry,c){bx.fillStyle=c;const n=Math.max(16,Math.round((rx+ry)*2));let lx=null,ly=null;for(let i=0;i<n;i++){const a=i/n*Math.PI*2;const px=Math.round(x+Math.cos(a)*rx),py=Math.round(y+Math.sin(a)*ry);if(px!==lx||py!==ly)bx.fillRect(px,py,1,1);lx=px;ly=py;}}
function pbar(x,y,w,frac,col){x=Math.round(x-w/2);y=Math.round(y);R_(x-1,y-1,w+2,4,PAL.k);R_(x,y,w,2,PAL.k3);R_(x,y,Math.max(0,Math.round(w*clamp(frac,0,1))),2,col);}
function ptext(str,x,y,col){const c=textSpr(str,col);bx.drawImage(c,Math.round(x-c.width/2),Math.round(y-c.height));}
function drawFlag(e){const x=Math.round(e.x),top=Math.round(e.ent==='lair'?e.y-54:e.y-(e.t&&e.t.boss?40:26));
  R_(x+6,top-6,1,12,PAL.w1);R_(x+7,top-6,5,3,PAL.y2);R_(x+7,top-4,3,1,PAL.y1);ptext(String(e.bounty),x+10,top-7,PAL.y2);}

function render(rdt){
  const T=performance.now()/1000;fitBuffer();
  let sx=0,sy=0;if(G&&G.shake>0){G.shake=Math.max(0,G.shake-rdt*14);sx=Math.round(rnd(-1,1)*G.shake*.5);sy=Math.round(rnd(-1,1)*G.shake*.5);}
  clampCam();OX=Math.round(cam.x-bw/2)+sx;OY=Math.round(cam.y-bh/2)+sy;
  bx.setTransform(1,0,0,1,0,0);bx.globalCompositeOperation='source-over';bx.globalAlpha=1;bx.imageSmoothingEnabled=false;
  bx.fillStyle=PAL.k;bx.fillRect(0,0,bw,bh);
  if(!G){blit();return;}
  bx.setTransform(1,0,0,1,-OX,-OY);
  const gx=Math.max(0,OX),gy=Math.max(0,OY),ex=Math.min(W,OX+bw),ey=Math.min(H,OY+bh);
  if(ex>gx&&ey>gy)bx.drawImage(ground,gx,gy,ex-gx,ey-gy,gx,gy,ex-gx,ey-gy);
  const dk=darkness();
  bx.globalCompositeOperation='lighter';
  for(const p of G.lightPts){if(!inView(p.x,p.y,30))continue;const f=.6+.4*Math.sin(T*2.2+p.ph);const g=bx.createRadialGradient(p.x,p.y,0,p.x,p.y,26);
    g.addColorStop(0,`rgba(255,100,25,${.26*f})`);g.addColorStop(1,'rgba(255,60,10,0)');bx.fillStyle=g;bx.fillRect(p.x-26,p.y-26,52,52);}
  bx.globalCompositeOperation='source-over';
  for(const b of G.buildings)if(isField(b)&&inView(b.x,b.y,60))drawField(b,T);
  const list=[];
  for(const b of G.buildings)if(!isField(b)&&inView(b.x,b.y,110))list.push({y:baseY(b),o:b,k:0});
  for(const l of G.lairs)if(inView(l.x,l.y,90))list.push({y:l.y,o:l,k:1});
  for(const o of G.decor)if(inView(o.x,o.y,50))list.push({y:o.y,o,k:2});
  for(const u of G.units)if(!u.inside&&inView(u.x,u.y,40))list.push({y:u.y,o:u,k:3});
  list.sort((a,b)=>a.y-b.y);
  for(const e of list){if(e.k===0)drawBuilding(e.o);else if(e.k===1)drawLair(e.o);else if(e.k===2)drawDecor(e.o);else drawUnit(e.o);}
  for(const p of G.proj){const cx=Math.cos(p.a),cy=Math.sin(p.a);
    if(p.col&&p.col!==PAL.g7){R_(p.x-1,p.y-1,3,3,p.col);R_(p.x,p.y,1,1,PAL.e6);for(let k=2;k<6;k++)if(k%2===0)R_(p.x-cx*k*1.5,p.y-cy*k*1.5,1,1,p.col);}
    else for(let k=0;k<5;k++)R_(p.x-cx*k,p.y-cy*k,1,1,k===0?PAL.g7:k===4?(p.col?PAL.g5:PAL.b1):p.col?PAL.g6:PAL.w3);}
  for(const p of G.parts){if(p.type!=='smoke')continue;const a=p.life/p.max,r=Math.round(p.s*(2.2-a)*1.4);bx.fillStyle=`rgba(${a>.6?'110,100,96':'80,70,72'},${a*.6})`;
    for(let y=-r;y<=r;y++){const hw=Math.round(Math.sqrt(Math.max(0,r*r-y*y)));bx.fillRect(Math.round(p.x)-hw,Math.round(p.y)+y,hw*2+1,1);}}
  for(const b of G.birds){if(!inView(b.x,b.y,20))continue;bx.fillStyle='rgba(8,6,8,.35)';bx.fillRect(Math.round(b.x),Math.round(b.y)+26,3,1);}
  // luz e escuridão
  bx.setTransform(1,0,0,1,0,0);
  const t=dayT();
  if(dk>.01){
    lbx.setTransform(1,0,0,1,0,0);lbx.globalCompositeOperation='source-over';lbx.clearRect(0,0,bw,bh);lbx.fillStyle=`rgba(20,18,31,${dk})`;lbx.fillRect(0,0,bw,bh);
    lbx.globalCompositeOperation='destination-out';lbx.setTransform(1,0,0,1,-OX,-OY);
    const L=(x,y,r,a)=>{if(!inView(x,y,r))return;const g=lbx.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,`rgba(0,0,0,${a})`);g.addColorStop(.6,`rgba(0,0,0,${a*.45})`);g.addColorStop(1,'rgba(0,0,0,0)');lbx.fillStyle=g;lbx.fillRect(x-r,y-r,r*2,r*2);};
    for(const p of G.lightPts)L(p.x,p.y,46+6*Math.sin(T*2+p.ph),.8);
    for(const b of G.buildings){if(isField(b)){if(b.g>=1)L(b.x,b.y,30,.4);continue;}const s=SB[b.kind];for(const w of s.wins)L(b.x+w.dx,baseY(b)+w.dy+6,b.kind==='torre'?110:52,.95);}
    for(const l of G.lairs)if(!l.dead)for(const c of LAIR_ANCH[l.kind].candles)L(l.x+c.dx,l.y+c.dy,16,.7);
    for(const o of G.decor)if(o.type==='troita')L(o.x-2,o.y-2,14,.6);
    for(const u of G.units)if((u.hero||u.worker)&&!u.inside)L(u.x,u.y-8,u.hero?34:22,.85);
    for(const p of G.parts)if(p.type==='spark')L(p.x,p.y,7,.6);
    bx.drawImage(lb,0,0);
    bx.setTransform(1,0,0,1,-OX,-OY);bx.globalCompositeOperation='lighter';
    for(const b of G.buildings){if(isField(b))continue;for(const w of SB[b.kind].wins){const x=b.x+w.dx,y=baseY(b)+w.dy;if(!inView(x,y,30))continue;const g=bx.createRadialGradient(x,y,0,x,y,18);g.addColorStop(0,`rgba(255,140,40,${.35*dk})`);g.addColorStop(1,'rgba(255,90,20,0)');bx.fillStyle=g;bx.fillRect(x-18,y-18,36,36);}}
    for(const p of G.lightPts){if(!inView(p.x,p.y,20))continue;const g=bx.createRadialGradient(p.x,p.y,0,p.x,p.y,14);g.addColorStop(0,`rgba(255,110,30,${.35*dk})`);g.addColorStop(1,'rgba(255,60,10,0)');bx.fillStyle=g;bx.fillRect(p.x-14,p.y-14,28,28);}
    for(const u of G.units)if(u.mon&&!u.inside&&inView(u.x,u.y,20))for(const e of eyePts(u)){const g=bx.createRadialGradient(e.x,e.y,0,e.x,e.y,6);g.addColorStop(0,`rgba(255,40,30,${.5*dk})`);g.addColorStop(1,'rgba(255,0,0,0)');bx.fillStyle=g;bx.fillRect(e.x-6,e.y-6,12,12);}
    bx.globalCompositeOperation='source-over';bx.setTransform(1,0,0,1,0,0);
  }
  if(t>=DAY_END-8&&t<DUSK_END){const k=clamp((t-(DAY_END-8))/10,0,1)*(1-clamp((t-DUSK_END+5)/5,0,1));bx.fillStyle=`rgba(150,60,90,${.16*k})`;bx.fillRect(0,0,bw,bh);}
  if(t>=NIGHT_END){const k=1-(t-NIGHT_END)/(CYCLE-NIGHT_END);bx.fillStyle=`rgba(255,140,60,${.14*Math.sin(k*Math.PI)})`;bx.fillRect(0,0,bw,bh);}
  if(G.flash>0){bx.fillStyle=`rgba(200,200,255,${G.flash*2.5})`;bx.fillRect(0,0,bw,bh);G.flash=Math.max(0,G.flash-rdt);}
  const vg=bx.createRadialGradient(bw/2,bh/2,Math.min(bw,bh)*.35,bw/2,bh/2,Math.max(bw,bh)*.75);vg.addColorStop(0,'rgba(0,0,0,0)');vg.addColorStop(1,'rgba(8,6,10,.55)');bx.fillStyle=vg;bx.fillRect(0,0,bw,bh);
  for(const a of ash){a.y+=a.v*rdt;a.x+=(.004+Math.sin(T*.6+a.d)*.003)*rdt;if(a.y>1)a.y-=1;if(a.x>1)a.x-=1;bx.fillStyle=dk>.5?PAL.g3:a.c;bx.fillRect(Math.floor(a.x*bw),Math.floor(a.y*bh),1,1);}
  quantize();
  // camada de interface, em pixel exato
  bx.setTransform(1,0,0,1,-OX,-OY);
  for(const p of G.parts){if(p.type!=='spark')continue;if(p.life/p.max<.25&&Math.random()<.5)continue;R_(p.x,p.y,1,1,p.c);}
  for(const b of G.birds){if(!inView(b.x,b.y,20))continue;const x=Math.round(b.x),y=Math.round(b.y),up=Math.sin(T*14+b.ph)>0;R_(x,y,1,1,PAL.k);R_(x-1,y+(up?-1:1),1,1,PAL.k);R_(x+1,y+(up?-1:1),1,1,PAL.k);R_(x-2,y+(up?-2:1),1,1,PAL.k2);R_(x+2,y+(up?-2:1),1,1,PAL.k2);}
  for(const u of G.units)if(u.t.minion&&inView(u.x,u.y,20))for(const e of eyePts(u))R_(e.x,e.y,1,1,PAL.z0);
  for(const u of G.units)if(u.mon&&!u.inside&&inView(u.x,u.y,20)){const c=u.type==='avo'?PAL.z0:u.type==='lobo'?PAL.y2:u.type==='strigoi'?PAL.e4:PAL.e5;for(const e of eyePts(u))R_(e.x,e.y,1,1,c);}
  for(const l of G.lairs)if(!l.dead&&l.kind==='ninho'&&Math.sin(T*1.7+l.x)>-.85){for(const [ex,ey] of[[-4,1],[-2,1],[5,2],[7,2]])R_(l.x+ex,l.y+ey,1,1,PAL.e4);}
  if(sel){const s=sel;
    if(s.ent==='u'&&!s.inside){const sc=s.t.boss?1.8:1;ring(s.x,s.y,Math.round(7*sc),Math.round(3*sc),s.mon?PAL.e3:PAL.y2);if(s.hero)ptext(s.name,s.x,s.y-24*sc,PAL.g7);}
    else if(s.ent==='b'){const x0=Math.round(s.x-s.w/2)-3,y0=Math.round(s.y-s.dd/2)-3;bx.fillStyle=PAL.y2;
      for(let i=0;i<s.w+6;i+=2){bx.fillRect(x0+i,y0,1,1);bx.fillRect(x0+i,y0+s.dd+6,1,1);}for(let i=0;i<s.dd+6;i+=2){bx.fillRect(x0,y0+i,1,1);bx.fillRect(x0+s.w+6,y0+i,1,1);}
      if(s.kind==='torre')ring(s.x,s.y,BD.torre.range,BD.torre.range,PAL.y1);}
    else if(s.ent==='lair')ring(s.x,s.y,Math.round(s.r*1.2),Math.round(s.r*.7),PAL.e3);
    else if(s.ent==='prop')ring(s.x,s.y,8,3,PAL.y2);}
  for(const u of G.units){if(u.inside||u.hp>=u.maxHp||!inView(u.x,u.y,30))continue;const s=SU[u.type];pbar(u.x,u.y-s.ay-3,u.t.boss?24:10,u.hp/u.maxHp,u.mon?PAL.b1:PAL.v2);}
  for(const b of G.buildings){if(!inView(b.x,b.y,80))continue;const top=isField(b)?b.y-b.dd/2-7:baseY(b)-SB[b.kind].ay-6;
    if(b.hp<b.maxHp)pbar(b.x,top,Math.min(40,b.w*.6|0),b.hp/b.maxHp,b.kind==='casa'?PAL.y2:PAL.v2);
    if(b.kind==='taverna'&&b.inside.length)ptext(`${b.inside.length} la dentro`,b.x,baseY(b)+12,PAL.g6);}
  for(const l of G.lairs)if(!l.dead&&l.hp<l.maxHp)pbar(l.x,l.y-46,40,l.hp/l.maxHp,PAL.b1);
  for(const u of G.units)if(u.bounty>0&&!u.inside)drawFlag(u);
  for(const l of G.lairs)if(l.bounty>0&&!l.dead)drawFlag(l);
  if(buildMode&&G.ghost){const d=BD[buildMode],x=Math.round(G.ghost.x),y=Math.round(G.ghost.y),why=canBuild(buildMode,x,y),c=why?PAL.b1:PAL.v2;
    const x0=x-(d.w>>1),y0=y-(d.d>>1);bx.fillStyle=c;for(let j=0;j<d.d;j++)for(let i=(j&1);i<d.w;i+=2)bx.fillRect(x0+i,y0+j,1,1);
    bx.fillStyle=why?PAL.e3:PAL.z0;bx.fillRect(x0,y0,d.w,1);bx.fillRect(x0,y0+d.d-1,d.w,1);bx.fillRect(x0,y0,1,d.d);bx.fillRect(x0+d.w-1,y0,1,d.d);
    if(buildMode==='torre')ring(x,y,d.range,d.range,PAL.y1);
    let lbl=d.short||d.name;if(d.field){const h=heatAt(x,y);lbl=`${buildMode==='trigo'?'Calor '+Math.round(h*100):'Frio '+Math.round((1-h)*100)}% rende ${fieldYield({kind:buildMode,heat:h}).amt}`;}
    ptext(why||lbl,x,y0-4,why?PAL.e4:PAL.y2);}
  for(const f of G.floats){if(f.life/f.max<.3&&Math.floor(T*12)%2)continue;ptext(f.text,f.x,f.y,f.color);}
  blit();
}
function blit(){ctx.setTransform(1,0,0,1,0,0);ctx.imageSmoothingEnabled=false;ctx.drawImage(buf,0,0,bw*Z,bh*Z);}

/* ---------- cena do título ---------- */
function drawTitle(fallen){
  const c=$('#titleScene');if(!c)return;const g=c.getContext('2d'),P=Pnt(g);const w=c.width,h=c.height;
  for(let y=0;y<h;y++){const t=y/h;P.rect(0,y,w,1,t<.25?PAL.n0:t<.5?PAL.n1:PAL.k3);}
  P.dith(0,Math.round(h*.22),w,4,PAL.n1,.5);P.dith(0,Math.round(h*.47),w,4,PAL.k3,.5);
  P.disc(160,16,8,8,PAL.g6);P.disc(162,15,7,7,PAL.g7);P.px(158,14,PAL.g5);P.px(163,18,PAL.g5);
  for(let i=0;i<30;i++)P.px((i*53)%w,(i*29)%30,PAL.g5);
  P.rect(0,62,w,h-62,PAL.k3);P.dith(0,60,w,4,PAL.g1,.5);
  P.line(0,74,60,70,PAL.e2);P.line(60,70,90,76,PAL.e3);P.line(90,76,140,72,PAL.e2);P.line(140,72,200,78,PAL.e3);
  for(let i=0;i<14;i++)P.px(i*14+3,72+(i%3),PAL.e5);
  g.drawImage(TREES[0],4,22);g.drawImage(TREES[2],168,24);
  const s=SB.casa;g.drawImage(fallen?whiteOf(s.spr):s.spr,70,66-s.ay);
  if(fallen){g.globalAlpha=.85;g.drawImage(s.spr,70,66-s.ay);g.globalAlpha=1;P.rect(84,22,30,40,'rgba(0,0,0,0)');for(let i=0;i<20;i++)P.px(76+(i*7)%46,30+(i*11)%30,PAL.e4);}
  const tw=SB.torre;g.drawImage(tw.spr,140,70-tw.ay);
  g.drawImage(SU.strigoi.r[0],36,52);g.drawImage(SU.esqueleto.r[1],22,54);g.drawImage(SU.paladin.l[3],50,50);g.drawImage(SU.mage.r[0],168,48);g.drawImage(SU.lobo.l[0],176,62);
  P.px(46,40,PAL.e4);P.px(48,40,PAL.e4);P.px(14,44,PAL.e4);P.px(16,44,PAL.e4);
}

