/* HeranÃ§a de Cinzas Â· Ferramentas de pintura em pixel, contorno de sprites e fonte 3x5. */
'use strict';
/* ---------- pintura de pixels ---------- */
function mkCanvas(w,h){const c=document.createElement('canvas');c.width=Math.max(1,w);c.height=Math.max(1,h);return c;}
function Pnt(g){
  const P={
    px(x,y,c){g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),1,1);},
    rect(x,y,w,h,c){if(w<=0||h<=0)return;g.fillStyle=c;g.fillRect(Math.round(x),Math.round(y),Math.round(w),Math.round(h));},
    line(x0,y0,x1,y1,c){x0=Math.round(x0);y0=Math.round(y0);x1=Math.round(x1);y1=Math.round(y1);g.fillStyle=c;
      const dx=Math.abs(x1-x0),sx=x0<x1?1:-1,dy=-Math.abs(y1-y0),sy=y0<y1?1:-1;let e=dx+dy;
      for(let n=0;n<999;n++){g.fillRect(x0,y0,1,1);if(x0===x1&&y0===y1)break;const e2=2*e;if(e2>=dy){e+=dy;x0+=sx;}if(e2<=dx){e+=dx;y0+=sy;}}},
    disc(cx,cy,rx,ry,c){g.fillStyle=c;cx=Math.round(cx);cy=Math.round(cy);
      for(let y=-ry;y<=ry;y++){const t=1-(y*y)/((ry+.5)*(ry+.5));if(t<0)continue;const hw=Math.round(rx*Math.sqrt(t));g.fillRect(cx-hw,cy+y,hw*2+1,1);}},
    dith(x,y,w,h,c,lvl){g.fillStyle=c;x=Math.round(x);y=Math.round(y);const L=lvl*16;
      for(let j=0;j<h;j++)for(let i=0;i<w;i++)if(BAYER[(((y+j)&3)<<2)|((x+i)&3)]<L)g.fillRect(x+i,y+j,1,1);},
    trap(y0,y1,xl0,xr0,xl1,xr1,c){g.fillStyle=c;for(let y=y0;y<=y1;y++){const t=y1===y0?0:(y-y0)/(y1-y0);
      const a=Math.round(xl0+(xl1-xl0)*t),b=Math.round(xr0+(xr1-xr0)*t);g.fillRect(a,y,b-a+1,1);}},
  };return P;
}
function outlineC(c,col){
  const g=c.getContext('2d');const w=c.width,h=c.height;const id=g.getImageData(0,0,w,h),d=id.data;
  const r=parseInt(col.slice(1,3),16),gg=parseInt(col.slice(3,5),16),b=parseInt(col.slice(5,7),16);
  const a=new Uint8Array(w*h);for(let i=0;i<w*h;i++)a[i]=d[i*4+3]>100?1:0;
  for(let y=0;y<h;y++)for(let x=0;x<w;x++){const i=y*w+x;if(a[i])continue;
    if((x>0&&a[i-1])||(x<w-1&&a[i+1])||(y>0&&a[i-w])||(y<h-1&&a[i+w])){d[i*4]=r;d[i*4+1]=gg;d[i*4+2]=b;d[i*4+3]=255;}}
  g.putImageData(id,0,0);
}
function sprite(w,h,fn,outline){const c=mkCanvas(w,h);fn(Pnt(c.getContext('2d')),w,h);if(outline!==false)outlineC(c,PAL.k);return c;}
function flipC(c){const f=mkCanvas(c.width,c.height),g=f.getContext('2d');g.translate(c.width,0);g.scale(-1,1);g.drawImage(c,0,0);return f;}
const whiteCache=new WeakMap();
function whiteOf(c){let w=whiteCache.get(c);if(!w){w=mkCanvas(c.width,c.height);const g=w.getContext('2d');g.drawImage(c,0,0);g.globalCompositeOperation='source-in';g.fillStyle=PAL.g7;g.fillRect(0,0,c.width,c.height);whiteCache.set(c,w);}return w;}

/* ---------- fonte de pixel 3x5 ---------- */
const FONT={A:[2,5,7,5,5],B:[6,5,6,5,6],C:[3,4,4,4,3],D:[6,5,5,5,6],E:[7,4,6,4,7],F:[7,4,6,4,4],G:[3,4,5,5,3],H:[5,5,7,5,5],I:[7,2,2,2,7],J:[1,1,1,5,2],
  K:[5,5,6,5,5],L:[4,4,4,4,7],M:[5,7,7,5,5],N:[6,5,5,5,5],O:[2,5,5,5,2],P:[6,5,6,4,4],Q:[2,5,5,6,3],R:[6,5,6,5,5],S:[3,4,2,1,6],T:[7,2,2,2,2],
  U:[5,5,5,5,7],V:[5,5,5,5,2],W:[5,5,7,7,5],X:[5,5,2,5,5],Y:[5,5,2,2,2],Z:[7,1,2,4,7],'0':[7,5,5,5,7],'1':[2,6,2,2,7],'2':[6,1,2,4,7],'3':[6,1,2,1,6],
  '4':[5,5,7,1,1],'5':[7,4,6,1,6],'6':[3,4,7,5,7],'7':[7,1,1,2,2],'8':[7,5,7,5,7],'9':[7,5,7,1,6],'+':[0,2,7,2,0],'-':[0,0,7,0,0],'%':[5,1,2,4,5],
  '.':[0,0,0,0,2],',':[0,0,0,2,4],'!':[2,2,2,0,2],'?':[6,1,2,0,2],':':[0,2,0,2,0],'/':[1,1,2,4,4],'·':[0,0,2,0,0],"'":[2,2,0,0,0],'"':[5,5,0,0,0],
  '(':[1,2,2,2,1],')':[4,2,2,2,4],' ':[0,0,0,0,0]};
const TXT=new Map();
function strip(s){return s.normalize('NFD').replace(/[̀-ͯ]/g,'').toUpperCase();}
function textSpr(str,col){
  const key=str+'|'+col;let c=TXT.get(key);if(c)return c;
  const s=strip(str);c=mkCanvas(s.length*4+1,7);const g=c.getContext('2d');g.fillStyle=col;
  for(let i=0;i<s.length;i++){const gl=FONT[s[i]]||FONT['?'];for(let r=0;r<5;r++)for(let k=0;k<3;k++)if(gl[r]&(4>>k))g.fillRect(1+i*4+k,1+r,1,1);}
  outlineC(c,PAL.k);if(TXT.size>300)TXT.clear();TXT.set(key,c);return c;
}

