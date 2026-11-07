/* HeranÃ§a de Cinzas Â· Covis, Ã¡rvores, pedras e lugares com histÃ³ria (props). */
'use strict';
/* ---------- covis, decoração e lugares com história ---------- */
function cemSpr(){const R=mulberry32(7);return sprite(128,84,P=>{
  P.disc(64,54,60,24,PAL.k3);P.disc(64,53,56,21,PAL.g1);P.dith(8,30,112,50,PAL.k3,.25);
  for(let x=14;x<=114;x+=7){const hh=R()<.25?3:7;P.rect(x,34-hh,2,hh+2,PAL.w1);P.px(x,34-hh,PAL.w2);}P.rect(14,30,100,1,PAL.w0);
  P.line(63,52,65,14,PAL.w0);P.line(64,52,66,14,PAL.w0);P.line(62,52,64,14,PAL.w1);P.line(55,24,74,21,PAL.w0);P.line(55,25,74,22,PAL.w1);
  const st=[];for(let i=0;i<12;i++){const a=R()*Math.PI*2,r=Math.sqrt(R());st.push({x:64+Math.cos(a)*r*48,y:58+Math.sin(a)*r*14,t:Math.floor(R()*3),lean:Math.floor(R()*3)-1});}
  st.sort((a,b)=>a.y-b.y);
  for(const s of st){const x=Math.round(s.x),y=Math.round(s.y);
    if(s.t===0){P.rect(x-4,y,9,1,PAL.k3);P.rect(x-3,y-8,7,8,PAL.g3);P.rect(x-2,y-9,5,1,PAL.g3);P.rect(x-3,y-8,1,8,PAL.g4);P.rect(x+3,y-8,1,8,PAL.g2);P.line(x-1,y-6,x+1,y-3,PAL.g1);P.px(x-2,y-1,PAL.v1);}
    else if(s.t===1){P.rect(x,y-9,2,10,PAL.w1);P.rect(x-2+s.lean,y-7,6,2,PAL.w1);P.px(x,y-9,PAL.w2);}
    else{P.rect(x,y-10,1,10,PAL.g2);P.rect(x-1,y-9,3,1,PAL.g2);P.rect(x-2,y-7,5,1,PAL.g2);P.px(x-1,y-4,PAL.g2);P.px(x+1,y-5,PAL.g2);}}
  P.rect(86,62,10,5,PAL.k);P.rect(86,62,10,1,PAL.w0);P.disc(100,64,4,2,PAL.w1);P.px(99,62,PAL.w2);
  P.rect(40,58,1,2,PAL.g7);P.px(40,57,PAL.e5);P.rect(77,50,1,2,PAL.g7);P.px(77,49,PAL.e5);
  for(let i=0;i<16;i++){const x=10+R()*108|0,y=40+R()*36|0;if(R()<.5){P.px(x,y,PAL.g6);P.px(x+1,y,PAL.g6);}else{P.px(x,y,PAL.g5);P.px(x-1,y-1,PAL.g5);P.px(x+1,y-1,PAL.g4);}}
});}
function ninhoSpr(){const R=mulberry32(11);return sprite(120,76,P=>{
  P.disc(60,50,56,22,PAL.k3);P.disc(58,44,46,20,PAL.g1);P.disc(54,38,34,14,PAL.g2);P.disc(48,32,20,8,PAL.g3);P.dith(30,24,40,14,PAL.g4,.2);
  P.dith(62,28,46,32,PAL.k3,.5);
  for(let i=0;i<3;i++)P.line(30+i*4,30,36+i*4,40,PAL.k2);
  P.disc(62,52,15,10,PAL.k2);P.disc(62,53,12,8,PAL.k);P.rect(48,53,29,1,PAL.k);
  for(let i=0;i<9;i++){const x=12+R()*96|0,y=54+R()*14|0;P.disc(x,y,2,1,PAL.g2);P.px(x-1,y-1,PAL.g3);}
  for(let i=0;i<12;i++){const x=20+R()*80|0,y=60+R()*12|0;if(R()<.3){P.rect(x,y,3,3,PAL.g7);P.px(x,y+1,PAL.k);P.px(x+2,y+1,PAL.k);P.px(x+1,y+2,PAL.g5);}
    else P.line(x,y,x+3+(R()*3|0),y+(R()*3|0)-1,PAL.g6);}
  P.line(20,40,12,46,PAL.w0);P.line(98,42,108,48,PAL.w0);
});}
const LAIR={cem:cemSpr(),nin:ninhoSpr()};
const LAIR_ANCH={cemiterio:{x:64,y:54,candles:[{dx:-24,dy:3},{dx:13,dy:-5}]},ninho:{x:60,y:50,candles:[]}};
function treeSpr(seed){const R=mulberry32(seed);return sprite(34,48,P=>{
  const segs=[];(function br(x,y,a,len,w,d){const x1=x+Math.cos(a)*len,y1=y+Math.sin(a)*len;segs.push([x,y,x1,y1,w]);
    if(d>0){const n=R()<.3?1:2;for(let i=0;i<n;i++)br(x1,y1,a+(R()-.5)*1.4,len*(.55+R()*.2),Math.max(1,w-1),d-1);}})(17,46,-Math.PI/2+(R()-.5)*.3,13+R()*6,3,3);
  for(const s of segs)for(let k=0;k<s[4];k++)P.line(s[0]+k+1,s[1],s[2]+k+1,s[3],PAL.g4);
  for(const s of segs)for(let k=0;k<s[4];k++)P.line(s[0]+k,s[1],s[2]+k,s[3],k===0?PAL.g7:PAL.g6);
  P.rect(14,45,7,2,PAL.g5);P.px(13,46,PAL.g5);P.px(21,46,PAL.g4);
  if(R()<.45&&segs.length>2){const s=segs[1+Math.floor(R()*(segs.length-1))];P.line(s[2],s[3],s[2],s[3]+5,PAL.w1);P.rect(Math.round(s[2])-1,Math.round(s[3])+5,3,2,PAL.w1);}
});}
function rockSpr(seed){const R=mulberry32(seed);const rx=4+(R()*3|0);return sprite(rx*2+4,10,P=>{P.disc(rx+2,6,rx,3,PAL.g2);P.disc(rx+1,5,rx-1,2,PAL.g3);P.rect(rx-1,4,3,1,PAL.g4);P.rect(3,8,rx*2-2,1,PAL.k3);});}
const TREES=[11,23,37,41,59,67].map(treeSpr),ROCKS=[3,5,8].map(rockSpr);
const PROP_SPR={
  poco:sprite(30,36,P=>{P.rect(14,2,1,3,PAL.w0);P.trap(3,10,8,21,2,27,PAL.w2);for(let y=5;y<=10;y+=2)P.rect(4,y,22,1,PAL.w1);P.rect(2,10,26,1,PAL.k3);
    P.rect(5,10,2,17,PAL.w1);P.rect(23,10,2,17,PAL.w1);P.line(15,11,15,18,PAL.g5);P.rect(13,18,5,4,PAL.w2);P.rect(13,18,5,1,PAL.g4);
    P.disc(15,27,11,4,PAL.g3);P.disc(15,26,8,2,PAL.k);P.rect(4,27,23,7,PAL.g3);for(let y=28;y<34;y+=3){P.rect(4,y,23,1,PAL.g2);for(let x=6+(y%2?3:0);x<27;x+=6)P.px(x,y+1,PAL.g2);}P.rect(4,27,2,7,PAL.g4);P.dith(18,27,9,7,PAL.k3,.5);}),
  espantalho:sprite(24,38,P=>{P.rect(11,10,2,27,PAL.w1);P.rect(2,14,20,2,PAL.w1);P.rect(6,14,12,11,PAL.v1);P.dith(6,14,12,11,PAL.v0,.4);for(let x=6;x<18;x+=2)P.px(x,25,PAL.v1);
    P.rect(1,15,3,2,PAL.y1);P.rect(20,15,3,2,PAL.y1);P.disc(12,9,4,4,PAL.w4);P.px(10,8,PAL.k);P.px(14,8,PAL.k);P.rect(10,11,5,1,PAL.k2);P.px(11,12,PAL.k2);P.px(13,12,PAL.k2);
    P.rect(6,4,13,1,PAL.k3);P.rect(8,1,9,3,PAL.k3);P.rect(17,10,3,2,PAL.k);P.px(18,9,PAL.k);P.px(20,10,PAL.y1);P.px(16,11,PAL.k);}),
  carroca:sprite(42,24,P=>{P.trap(8,13,6,34,4,37,PAL.w2);P.rect(4,13,34,2,PAL.w1);for(let x=8;x<34;x+=5)P.rect(x,8,1,5,PAL.w1);P.line(36,13,41,20,PAL.w1);
    P.disc(12,17,5,5,PAL.w1);P.disc(12,17,3,3,PAL.k2);P.line(12,12,12,22,PAL.w0);P.line(7,17,17,17,PAL.w0);P.px(12,17,PAL.g4);
    P.rect(26,20,10,2,PAL.w1);P.rect(28,19,6,1,PAL.w0);P.px(20,21,PAL.g6);P.px(21,21,PAL.g6);}),
  troita:sprite(18,36,P=>{P.rect(8,9,2,26,PAL.w1);P.rect(2,13,14,2,PAL.w1);P.trap(4,8,8,9,2,15,PAL.w0);P.rect(6,10,6,5,PAL.y1);P.rect(7,11,4,3,PAL.y0);P.px(8,11,PAL.s0);P.px(9,11,PAL.s0);
    P.rect(2,15,1,7,PAL.g7);P.rect(15,15,1,7,PAL.g7);P.px(2,18,PAL.b1);P.px(15,18,PAL.b1);P.px(2,20,PAL.b1);P.px(15,20,PAL.b1);P.rect(7,33,1,2,PAL.g7);P.px(7,32,PAL.e5);}),
  cranios:sprite(22,13,P=>{const s=(x,y)=>{P.rect(x,y,4,3,PAL.g7);P.rect(x+3,y,1,3,PAL.g6);P.px(x+1,y+1,PAL.k);P.px(x+3,y+1,PAL.k);P.rect(x+1,y+3,2,1,PAL.g5);};s(2,8);s(7,8);s(12,8);s(16,8);s(5,4);s(10,4);s(14,5);s(8,1);}),
  lapide:sprite(12,16,P=>{P.rect(1,14,10,1,PAL.k3);P.rect(2,4,8,10,PAL.g3);P.rect(3,2,6,2,PAL.g3);P.rect(2,4,1,10,PAL.g4);P.rect(9,4,1,10,PAL.g2);P.rect(4,6,4,1,PAL.g2);P.rect(4,8,3,1,PAL.g2);P.rect(4,10,4,1,PAL.g2);P.px(3,13,PAL.v1);}),
  gaiola:sprite(20,46,P=>{P.rect(3,4,2,41,PAL.w1);P.rect(3,4,13,2,PAL.w1);P.line(14,6,14,12,PAL.g2);P.rect(9,12,10,1,PAL.g2);P.rect(9,27,10,1,PAL.g2);for(let x=9;x<=18;x+=3)P.rect(x,12,1,16,PAL.g2);P.px(10,26,PAL.g6);P.px(11,26,PAL.g6);}),
};
const PROPS={
  poco:{name:'O Poço',ax:15,ay:34,lore:['O poço da família. A água tem gosto de ferro. E de outra coisa.','Dizem que seu tio jogou alguma coisa aqui na noite antes de morrer. Ninguém quer descer pra ver.']},
  espantalho:{name:'Espantalho',ax:12,ay:36,lore:['Os corvos não têm medo dele. Os camponeses têm.','Seu tio vestiu o espantalho com a própria roupa. Ninguém sabe por quê.']},
  carroca:{name:'Carroça Quebrada',ax:21,ay:22,lore:['A carroça do seu tio. Ele saiu com ela numa noite e só ela voltou.']},
  troita:{name:'Troiță',ax:9,ay:34,lore:['Uma cruz de beira de estrada. Alguém ainda acende vela aqui. Ninguém admite.','O santo do ícone tem a cara raspada. Dizem que ele viu coisa demais.']},
  cranios:{name:'Pilha de Crânios',ax:11,ay:12,lore:['Alguém contou. Parou no trinta e sete.','Um dos crânios tem dente de ouro. Ninguém teve coragem.','Os crânios estão arrumados. Alguém arrumou. Recentemente.']},
  lapide:{name:'Lápide',ax:6,ay:14,lore:['"Aqui jaz Ion. Plantou trigo perto demais da rachadura."','"Aqui jaz Mirela. Confiou num herói."','"Aqui jaz o tio. Deixou a fazenda pra você. Desculpa."','"Aqui jaz Bogdan. Foi ver o que era aquele barulho."','"Aqui jaz Zoia. Morreu de velhice. Foi a única."']},
  gaiola:{name:'Gaiola de Ferro',ax:4,ay:44,lore:['Uma gaiola num poste. Está vazia. Ninguém sabe desde quando.','A porta da gaiola foi aberta por dentro.']},
};

