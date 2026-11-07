/* HeranÃ§a de Cinzas Â· Sprites dos herÃ³is, camponeses, monstros e invocaÃ§Ãµes. */
'use strict';
/* ---------- sprites dos bonecos ---------- */
function humanoid(o){
  const fr=[];
  for(let f=0;f<4;f++)fr.push(sprite(26,24,P=>{
    const cx=10,fy=22,lo=f===1?-1:f===2?1:0,hy=fy-15;
    if(o.cloak){P.trap(fy-11,fy,cx-2,cx+2,cx-5+(f===1?-1:0),cx+5+(f===2?1:0),o.cloak);P.dith(cx+1,fy-11,5,12,PAL.k2,.5);}
    if(o.robe){P.trap(fy-10,fy,cx-2,cx+2,cx-3+(f===1?-1:0),cx+3+(f===2?1:0),o.body);P.dith(cx+1,fy-10,3,11,o.bodyD,.5);P.rect(cx-3,fy,7,1,PAL.k3);}
    else if(o.skel){P.rect(cx-1+lo,fy-4,1,4,PAL.g7);P.rect(cx+1-lo,fy-4,1,4,PAL.g6);P.rect(cx-2,fy-5,5,1,PAL.g6);P.rect(cx,fy-10,1,5,PAL.g6);for(let i=0;i<3;i++)P.rect(cx-2,fy-10+i*2,5,1,PAL.g7);}
    else if(!o.cloak){P.rect(cx-2+lo,fy-4,2,4,o.legs||PAL.w1);P.rect(cx+1-lo,fy-4,2,4,PAL.w0);P.rect(cx-2+lo,fy-1,2,1,PAL.k3);P.rect(cx+1-lo,fy-1,2,1,PAL.k3);
      P.rect(cx-2,fy-10,5,6,o.body);P.rect(cx+2,fy-10,1,6,o.bodyD);P.rect(cx-2,fy-10,1,6,o.bodyL||o.body);P.rect(cx-2,fy-5,5,1,o.belt||PAL.w0);}
    else{P.rect(cx-3,fy-12,7,2,o.cloakHi);P.px(cx-1+lo,fy,PAL.k3);P.px(cx+1-lo,fy,PAL.k3);}
    if(o.skel)P.rect(cx-3,fy-9,1,4,PAL.g6);else if(!o.cloak&&!o.robe)P.rect(cx-3,fy-9,1,4,o.bodyD);
    if(o.chestCross){P.rect(cx,fy-9,1,3,PAL.y2);P.rect(cx-1,fy-8,3,1,PAL.y2);}
    if(o.mail){P.rect(cx-2,fy-10,5,1,PAL.g4);P.px(cx-1,fy-9,PAL.g4);}
    if(o.tabard){P.rect(cx-1,fy-10,3,6,o.tabard);if(o.tabCross){P.rect(cx,fy-9,1,4,o.tabCross);P.rect(cx-1,fy-8,3,1,o.tabCross);}}
    if(o.shield){if(o.bigShield){P.rect(cx-6,fy-13,4,11,o.shield);P.rect(cx-6,fy-13,4,1,PAL.g5);P.rect(cx-5,fy-9,2,2,o.shieldMark||PAL.y2);}
      else{P.rect(cx-5,fy-10,3,6,o.shield);P.rect(cx-5,fy-10,3,1,PAL.g5);P.px(cx-4,fy-8,o.shieldMark||PAL.y2);}}
    P.rect(cx-1,hy,4,5,o.skin);P.rect(cx+2,hy,1,5,o.skinD||o.skin);
    if(o.skel){P.px(cx+2,hy+2,PAL.k);P.px(cx,hy+2,PAL.k);P.rect(cx,hy+4,3,1,PAL.g5);}else P.px(cx+2,hy+2,PAL.k);
    switch(o.hat){
      case 'helm':P.rect(cx-2,hy-1,5,3,PAL.g4);P.rect(cx-2,hy-1,5,1,PAL.g5);P.rect(cx+2,hy+1,1,2,PAL.g3);break;
      case 'hood':P.rect(cx-2,hy-1,4,6,o.hoodC);P.rect(cx-1,hy-2,2,1,o.hoodC);P.rect(cx-3,hy+3,1,3,o.hoodC);P.rect(cx+1,hy+1,2,3,o.skin);P.px(cx+2,hy+2,PAL.k);break;
      case 'kamilavka':P.rect(cx-2,hy-4,5,4,PAL.k2);P.rect(cx-3,hy-1,7,1,PAL.k3);P.rect(cx,hy+3,3,3,PAL.g5);P.px(cx+1,hy+6,PAL.g5);break;
      case 'straw':P.rect(cx-4,hy,9,1,PAL.y1);P.rect(cx-2,hy-2,5,2,PAL.y0);P.px(cx-1,hy-2,PAL.y1);break;
      case 'kerchief':P.rect(cx-2,hy-1,5,2,PAL.b1);P.px(cx-3,hy+1,PAL.b1);P.px(cx-3,hy+2,PAL.b0);break;
      case 'hair':P.rect(cx-2,hy-1,5,2,PAL.k2);P.rect(cx-2,hy,1,4,PAL.k2);break;
      case 'greathelm':P.rect(cx-2,hy-1,5,5,PAL.g4);P.rect(cx-2,hy-1,5,1,PAL.g5);P.rect(cx-2,hy-1,1,5,PAL.g5);P.rect(cx,hy+2,3,1,PAL.k);if(o.plume)P.rect(cx-1,hy-3,3,2,o.plume);break;
      case 'wizhat':P.rect(cx-4,hy,9,1,o.hatC);P.rect(cx-2,hy-2,5,2,o.hatC);P.rect(cx-1,hy-4,4,2,o.hatC);P.rect(cx,hy-6,2,2,o.hatC);P.px(cx+2,hy-7,o.hatC);P.rect(cx-2,hy-1,5,1,o.band||PAL.y0);break;
      case 'mitre':P.rect(cx-2,hy-5,5,5,PAL.g7);P.rect(cx-1,hy-6,3,1,PAL.g7);P.px(cx,hy-7,PAL.g7);P.rect(cx,hy-5,1,5,PAL.y2);P.rect(cx-2,hy-2,5,1,PAL.y2);P.rect(cx,hy+3,3,3,PAL.g6);break;
      case 'circlet':P.rect(cx-2,hy-1,5,2,PAL.w1);P.rect(cx-2,hy,1,3,PAL.w1);P.rect(cx-2,hy,5,1,PAL.y2);P.px(cx+2,hy,PAL.e5);break;
      case 'veil':P.rect(cx-2,hy-1,5,2,PAL.g7);P.rect(cx-3,hy,1,6,PAL.g7);P.rect(cx-2,hy+1,1,4,PAL.g6);break;
      case 'mask':P.rect(cx-2,hy-1,4,6,o.hoodC);P.rect(cx-1,hy-2,2,1,o.hoodC);P.rect(cx-3,hy+3,1,3,o.hoodC);P.rect(cx+1,hy+1,2,2,o.skin);P.px(cx+2,hy+2,PAL.e3);P.rect(cx+1,hy+3,2,2,PAL.k2);break;
    }
    if(o.horns){P.px(cx-2,hy-2,PAL.g6);P.px(cx-3,hy-3,PAL.g6);P.px(cx+2,hy-2,PAL.g6);P.px(cx+3,hy-3,PAL.g6);}
    switch(o.weapon){
      case 'sword':if(f<3){P.line(cx+4,fy-7,cx+7,fy-14,PAL.g6);P.px(cx+7,fy-14,PAL.g7);P.rect(cx+3,fy-7,3,1,PAL.w0);}
        else{P.line(cx+4,fy-9,cx+11,fy-9,PAL.g7);P.rect(cx+4,fy-10,1,3,PAL.w0);P.px(cx+9,fy-12,PAL.g5);P.px(cx+10,fy-11,PAL.g5);P.px(cx+12,fy-10,PAL.g5);}break;
      case 'bow':for(let y=fy-14;y<=fy-4;y++){const k=Math.round(2*Math.sin((y-(fy-14))/10*Math.PI));P.px(cx+4+k,y,PAL.w2);}
        if(f<3)P.line(cx+4,fy-14,cx+4,fy-4,PAL.g5);else{P.line(cx+4,fy-14,cx+2,fy-9,PAL.g5);P.line(cx+2,fy-9,cx+4,fy-4,PAL.g5);P.line(cx+2,fy-9,cx+9,fy-9,PAL.g6);P.px(cx+10,fy-9,PAL.g7);}break;
      case 'censer':if(f<3){P.line(cx+4,fy-8,cx+4,fy-5,PAL.g4);P.rect(cx+3,fy-4,3,2,PAL.y1);P.px(cx+4,fy-4,PAL.y2);}
        else{P.rect(cx+4,fy-18,1,8,PAL.y1);P.rect(cx+3,fy-16,3,1,PAL.y2);P.px(cx+4,fy-19,PAL.e6);}break;
      case 'fork':if(f<3){P.rect(cx+5,fy-17,1,15,PAL.w2);P.rect(cx+4,fy-17,3,1,PAL.g4);P.px(cx+4,fy-19,PAL.g4);P.px(cx+4,fy-18,PAL.g4);P.px(cx+6,fy-19,PAL.g4);P.px(cx+6,fy-18,PAL.g4);P.px(cx+5,fy-19,PAL.g4);}
        else{P.line(cx+2,fy-6,cx+12,fy-11,PAL.w2);P.px(cx+13,fy-13,PAL.g4);P.px(cx+14,fy-12,PAL.g4);P.px(cx+14,fy-10,PAL.g4);P.px(cx+13,fy-11,PAL.g4);}break;
      case 'sickle':if(f<3){P.rect(cx+4,fy-7,1,2,PAL.w2);P.px(cx+5,fy-8,PAL.g5);P.px(cx+6,fy-8,PAL.g5);P.px(cx+6,fy-7,PAL.g5);}
        else{P.rect(cx+4,fy-6,2,1,PAL.w2);P.px(cx+6,fy-5,PAL.g5);P.px(cx+7,fy-4,PAL.g5);P.px(cx+6,fy-3,PAL.g5);}break;
      case 'rusty':if(f<3)P.line(cx+4,fy-7,cx+6,fy-12,PAL.e1);else{P.line(cx+4,fy-9,cx+10,fy-8,PAL.e1);P.px(cx+9,fy-11,PAL.g5);}break;
      case 'claws':if(f<3){P.px(cx+4,fy-7,PAL.g7);P.px(cx+5,fy-6,PAL.g7);}else{P.line(cx+4,fy-10,cx+8,fy-8,PAL.g7);P.line(cx+4,fy-8,cx+8,fy-6,PAL.g7);}break;
      case 'spear':if(f<3){P.rect(cx+5,fy-19,1,18,PAL.w2);P.rect(cx+5,fy-21,1,2,PAL.g6);P.px(cx+5,fy-22,PAL.g7);P.px(cx+4,fy-17,PAL.b1);}
        else{P.line(cx+2,fy-9,cx+12,fy-9,PAL.w2);P.rect(cx+13,fy-9,2,1,PAL.g6);P.px(cx+15,fy-9,PAL.g7);P.px(cx+14,fy-10,PAL.g5);P.px(cx+14,fy-8,PAL.g5);}break;
      case 'staff':case 'skullstaff':{const tx=f<3?cx+5:cx+9,ty=f<3?fy-18:fy-17;
        if(f<3)P.rect(cx+5,fy-16,1,15,PAL.w1);else P.line(cx+3,fy-3,cx+9,fy-15,PAL.w1);
        if(o.weapon==='skullstaff'){P.rect(tx-1,ty-1,3,3,PAL.g7);P.px(tx-1,ty,PAL.k);P.px(tx+1,ty,PAL.k);P.px(tx,ty+1,PAL.g5);}
        else{P.rect(tx-1,ty-1,3,3,o.orb);P.px(tx-1,ty-1,PAL.e6);}
        if(f===3){P.px(tx+2,ty-2,o.orb||PAL.z0);P.px(tx+3,ty,o.orb||PAL.z0);P.px(tx,ty-3,o.orb||PAL.z0);}break;}
      case 'book':if(f<3){P.rect(cx+3,fy-8,3,3,o.bookC||PAL.b0);P.px(cx+4,fy-7,PAL.g6);}else{P.rect(cx+3,fy-12,5,2,PAL.g6);P.px(cx+5,fy-12,PAL.k3);P.px(cx+5,fy-15,PAL.n3);P.px(cx+7,fy-14,PAL.n3);P.px(cx+3,fy-14,PAL.n3);}break;
      case 'orb':if(f<3){P.rect(cx+4,fy-10,2,2,PAL.e5);P.px(cx+4,fy-10,PAL.e6);}else{P.rect(cx+5,fy-14,3,3,PAL.e5);P.px(cx+6,fy-13,PAL.e6);P.px(cx+8,fy-15,PAL.e4);P.px(cx+4,fy-16,PAL.e4);}break;
      case 'daggers':if(f<3){P.px(cx+4,fy-7,PAL.g6);P.px(cx+5,fy-8,PAL.g7);P.px(cx-4,fy-7,PAL.g6);P.px(cx-4,fy-8,PAL.g7);}else{P.line(cx+4,fy-9,cx+8,fy-10,PAL.g7);P.line(cx+3,fy-7,cx+7,fy-6,PAL.g6);}break;
      case 'greatsword':if(f<3){P.line(cx+4,fy-6,cx+9,fy-19,PAL.g6);P.line(cx+5,fy-6,cx+10,fy-19,PAL.g5);P.rect(cx+2,fy-7,5,1,PAL.w0);}
        else{P.line(cx+3,fy-10,cx+15,fy-9,PAL.g7);P.line(cx+3,fy-9,cx+15,fy-8,PAL.g5);P.rect(cx+3,fy-12,1,4,PAL.w0);P.px(cx+12,fy-13,PAL.g5);P.px(cx+14,fy-12,PAL.g5);}break;
      case 'mace':if(f<3){P.rect(cx+4,fy-10,1,4,PAL.w1);P.rect(cx+3,fy-13,3,3,PAL.g5);P.px(cx+3,fy-13,PAL.g7);}else{P.line(cx+3,fy-8,cx+7,fy-10,PAL.w1);P.rect(cx+7,fy-12,3,3,PAL.g5);P.px(cx+7,fy-12,PAL.g7);}break;
      case 'crozier':P.rect(cx+5,fy-18,1,17,PAL.y1);P.px(cx+5,fy-19,PAL.y2);P.px(cx+6,fy-20,PAL.y2);P.px(cx+7,fy-19,PAL.y2);P.px(cx+7,fy-18,PAL.y2);
        if(f===3){P.px(cx+8,fy-21,PAL.e6);P.px(cx+3,fy-20,PAL.e6);P.px(cx+6,fy-22,PAL.e6);}break;
    }
    if(o.skel)P.rect(cx+3,fy-9,1,3,PAL.g6);else if(!o.cloak){P.rect(cx+3,fy-9,1,3,o.robe?o.body:o.body);P.px(cx+3,fy-6,o.skin);}
    else P.px(cx+3,fy-8,o.skin);
  }));
  return {r:fr,l:fr.map(flipC),ax:10,ay:22,eye:[{dx:2,dy:-13}].concat(o.skel?[{dx:0,dy:-13}]:[])};
}
function avoSpr(){
  const fr=[];
  for(let f=0;f<4;f++)fr.push(sprite(30,34,P=>{
    const cx=13,fy=32,lo=f===1?-1:f===2?1:0;
    P.rect(cx-4+lo,fy-6,3,6,PAL.v0);P.rect(cx+2-lo,fy-6,3,6,PAL.k3);P.rect(cx-5+lo,fy-1,4,1,PAL.k2);P.rect(cx+2-lo,fy-1,4,1,PAL.k2);
    P.trap(fy-18,fy-5,cx-4,cx+5,cx-6,cx+6,PAL.v1);P.dith(cx+2,fy-18,5,14,PAL.v0,.5);P.rect(cx-6,fy-6,13,1,PAL.w0);
    P.rect(cx-1,fy-17,2,10,PAL.v0);P.px(cx,fy-14,PAL.g4);P.px(cx,fy-11,PAL.g4);
    const hx=cx+3,hy=fy-24;P.rect(hx-3,hy,7,7,PAL.v2);P.rect(hx+3,hy,1,7,PAL.v1);P.px(hx+2,hy+2,PAL.k);P.px(hx,hy+2,PAL.k);
    P.trap(hy+5,hy+11,hx-2,hx+3,hx-1,hx+2,PAL.g6);P.dith(hx,hy+6,4,5,PAL.g5,.4);
    P.rect(hx-4,hy-2,9,2,PAL.g1);P.rect(hx-3,hy-3,7,1,PAL.g2);P.rect(hx+3,hy-1,3,1,PAL.k3);
    P.rect(cx-7,fy-16,2,8,PAL.v1);P.px(cx-7,fy-8,PAL.v2);
    if(f<3){P.rect(cx+8,fy-14,1,14,PAL.w1);P.rect(cx+6,fy-15,3,1,PAL.w1);P.rect(cx+7,fy-14,1,3,PAL.v2);}
    else{P.line(cx+7,fy-16,cx+15,fy-26,PAL.w1);P.rect(cx+14,fy-28,3,1,PAL.w1);P.rect(cx+6,fy-17,2,2,PAL.v2);}
  }));
  return {r:fr,l:fr.map(flipC),ax:13,ay:32,eye:[{dx:5,dy:-22},{dx:3,dy:-22}]};
}
function wolfSpr(C){
  C=C||{a:PAL.g3,b:PAL.g2,c:PAL.g4,e:PAL.y2};const fr=[];
  for(let f=0;f<4;f++)fr.push(sprite(22,14,P=>{
    const o=f===3?1:0,st=f===1?1:f===2?-1:0;
    for(const [lx,s] of[[5,st],[7,-st],[14,-st],[16,st]]){P.rect(lx+o+s,9,1,3,C.b);P.px(lx+o+s,12,PAL.k3);}
    P.line(5+o,5,2+o,3,C.a);P.px(1+o,2,C.c);
    P.rect(5+o,5,11,4,C.a);P.rect(5+o,4,10,1,C.b);P.rect(6+o,8,9,1,C.b);P.rect(12+o,3,4,5,C.b);P.dith(5+o,5,11,3,C.c,.15);
    const hy=f===3?4:3;P.rect(15+o,hy,4,3,C.a);P.rect(18+o,hy+1,2,2,C.c);P.px(20+o,hy+1,PAL.k);P.px(16+o,hy-1,C.b);P.px(15+o,hy-1,C.b);P.px(17+o,hy+1,C.e);
    if(f===3){P.px(19+o,hy+3,PAL.e1);P.px(20+o,hy+3,PAL.g7);}
  }));
  return {r:fr,l:fr.map(flipC),ax:10,ay:12,eye:[{dx:7,dy:-8}]};
}
const SK={skin:PAL.s0,skinD:PAL.s1};
const SU={
  warrior:humanoid({...SK,body:PAL.b1,bodyD:PAL.b0,bodyL:PAL.e2,hat:'helm',weapon:'sword',mail:true,shield:PAL.w2,shieldMark:PAL.g5}),
  paladin:humanoid({...SK,body:PAL.g6,bodyD:PAL.g5,bodyL:PAL.g7,hat:'greathelm',plume:PAL.y2,weapon:'sword',tabard:PAL.g7,tabCross:PAL.y2,shield:PAL.g7,shieldMark:PAL.y2}),
  heavyknight:humanoid({...SK,body:PAL.g4,bodyD:PAL.g3,bodyL:PAL.g5,legs:PAL.g3,hat:'greathelm',plume:PAL.k3,weapon:'greatsword',mail:true}),
  archer:humanoid({...SK,body:PAL.v1,bodyD:PAL.v0,bodyL:PAL.v2,hat:'hood',hoodC:PAL.v1,weapon:'bow'}),
  ranger:humanoid({...SK,body:PAL.v0,bodyD:PAL.k3,bodyL:PAL.v1,hat:'hood',hoodC:PAL.v0,weapon:'bow',belt:PAL.w2}),
  assassin:humanoid({...SK,body:PAL.k3,bodyD:PAL.k2,bodyL:PAL.g1,hat:'mask',hoodC:PAL.k3,weapon:'daggers',belt:PAL.b1}),
  lancer:humanoid({...SK,body:PAL.w3,bodyD:PAL.w2,bodyL:PAL.w4,hat:'helm',weapon:'spear'}),
  sentinel:humanoid({...SK,body:PAL.g4,bodyD:PAL.g3,bodyL:PAL.g5,hat:'helm',weapon:'spear',shield:PAL.b1,bigShield:true,shieldMark:PAL.y2}),
  templar:humanoid({...SK,body:PAL.g6,bodyD:PAL.g5,bodyL:PAL.g7,hat:'greathelm',weapon:'spear',tabard:PAL.g7,tabCross:PAL.b1}),
  mage:humanoid({...SK,robe:true,body:PAL.n1,bodyD:PAL.n0,hat:'wizhat',hatC:PAL.n1,band:PAL.e3,weapon:'staff',orb:PAL.e4}),
  elementalist:humanoid({...SK,robe:true,body:PAL.e1,bodyD:PAL.e0,hat:'wizhat',hatC:PAL.e2,band:PAL.y2,weapon:'staff',orb:PAL.e5}),
  warlock:humanoid({...SK,robe:true,body:PAL.p0,bodyD:PAL.k2,hat:'hood',hoodC:PAL.p1,horns:true,weapon:'staff',orb:PAL.z0}),
  conjurer:humanoid({...SK,robe:true,body:PAL.p1,bodyD:PAL.p0,hat:'hood',hoodC:PAL.n2,weapon:'book',bookC:PAL.b0}),
  sorcerer:humanoid({...SK,robe:true,body:PAL.n2,bodyD:PAL.n1,hat:'circlet',weapon:'orb'}),
  necromancer:humanoid({robe:true,body:PAL.k2,bodyD:PAL.k,skin:PAL.g6,skinD:PAL.g5,hat:'hood',hoodC:PAL.k3,weapon:'skullstaff'}),
  healer:humanoid({...SK,robe:true,body:PAL.g6,bodyD:PAL.g5,hat:'veil',weapon:'censer',chestCross:true}),
  bishop:humanoid({...SK,robe:true,body:PAL.g7,bodyD:PAL.g6,hat:'mitre',weapon:'crozier',chestCross:true}),
  cleric:humanoid({...SK,body:PAL.g4,bodyD:PAL.g3,bodyL:PAL.g5,hat:'helm',weapon:'mace',tabard:PAL.g7,tabCross:PAL.y2}),
  servo:humanoid({skel:true,skin:PAL.g7,skinD:PAL.g6,weapon:'sword'}),
  espirito:wolfSpr({a:PAL.n3,b:PAL.n2,c:PAL.g6,e:PAL.z0}),
  fazendeiro:humanoid({body:PAL.w3,bodyD:PAL.w2,bodyL:PAL.w4,skin:PAL.s0,skinD:PAL.s1,hat:'straw',weapon:'fork'}),
  campones:humanoid({body:PAL.g4,bodyD:PAL.g3,bodyL:PAL.g5,skin:PAL.s1,skinD:PAL.s2,hat:'kerchief',weapon:'sickle'}),
  esqueleto:humanoid({skel:true,skin:PAL.g7,skinD:PAL.g6,weapon:'rusty'}),
  strigoi:humanoid({cloak:PAL.p0,cloakHi:PAL.p1,body:PAL.p0,bodyD:PAL.k2,skin:PAL.g7,skinD:PAL.g6,hat:'hair',weapon:'claws'}),
  avo:avoSpr(),
  lobo:wolfSpr(),
};
function iconURL(fn){return sprite(11,11,fn).toDataURL();}
$('#icG').src=iconURL(P=>{P.disc(5,5,4,4,PAL.y1);P.disc(4,4,3,3,PAL.y2);P.px(3,3,PAL.e6);P.rect(5,3,1,5,PAL.y0);});
$('#icW').src=iconURL(P=>{P.line(5,9,5,2,PAL.y0);for(let i=0;i<3;i++){P.px(4,2+i*2,PAL.y2);P.px(6,3+i*2,PAL.y1);}P.px(5,1,PAL.e5);});
$('#icA').src=iconURL(P=>{P.disc(5,6,3,3,PAL.g6);P.disc(4,6,2,2,PAL.g7);P.rect(5,1,1,3,PAL.v2);P.px(6,8,PAL.g5);});

