/* HeranÃ§a de Cinzas Â· Paleta fixa "Cinza e Brasa" e tabela de quantizaÃ§Ã£o com dithering. */
'use strict';
/* ---------- paleta "Cinza e Brasa" e quantização ---------- */
const PAL={
  k:'#0d0b0c',k2:'#1a1517',k3:'#2a2224',g1:'#3b3133',g2:'#4f4446',g3:'#6a5d5c',g4:'#877a76',g5:'#a89a92',g6:'#c9bdb0',g7:'#ece3d6',
  w0:'#2e1d16',w1:'#4a2e20',w2:'#6b442c',w3:'#8e5f3a',w4:'#b5844f',
  e0:'#3d0f0c',e1:'#6e1a12',e2:'#a3301a',e3:'#d9561f',e4:'#ff8a2b',e5:'#ffc35a',e6:'#fff1b8',
  y0:'#7a5a1f',y1:'#b8892e',y2:'#e5be55',
  v0:'#2f3528',v1:'#4d5a3d',v2:'#7d8a5e',
  n0:'#14121f',n1:'#262338',n2:'#3e3a57',n3:'#635d80',
  b0:'#5c0f14',b1:'#8f1d22',p0:'#3a2440',p1:'#5e3a63',z0:'#9be36b',s0:'#d8b48a',s1:'#b08660',s2:'#8a6248'
};
const PL=Object.values(PAL).map(h=>[parseInt(h.slice(1,3),16),parseInt(h.slice(3,5),16),parseInt(h.slice(5,7),16)]);
const LUT=new Int32Array(32768);
for(let r=0;r<32;r++)for(let g=0;g<32;g++)for(let b=0;b<32;b++){
  const R=r*8+4,G_=g*8+4,B=b*8+4;let best=0,bd=1e9;
  for(let i=0;i<PL.length;i++){const p=PL[i],dr=R-p[0],dg=G_-p[1],db=B-p[2];const d=dr*dr*2+dg*dg*4+db*db*3;if(d<bd){bd=d;best=i;}}
  const p=PL[best];LUT[(r<<10)|(g<<5)|b]=(p[0]<<16)|(p[1]<<8)|p[2];
}
const BAYER=[0,8,2,10,12,4,14,6,3,11,1,9,15,7,13,5];
const BOFF=new Int16Array(16);for(let i=0;i<16;i++)BOFF[i]=Math.round((BAYER[i]/16-.47)*22);

