/* HeranÃ§a de Cinzas Â· LaÃ§o principal e inicializaÃ§Ã£o. */
'use strict';
/* ---------- laço principal ---------- */
let last=performance.now(),rosterT=0;const overlayEl=$('#overlay');
function frame(now){
  const rdt=Math.min(.05,(now-last)/1000);last=now;checkSize();
  if(G&&started&&!G.over&&!paused&&overlayEl.hidden)for(let i=0;i<speed;i++){update(rdt);if(G.over)break;}
  const ps=300*rdt*(3/Z)*dpr;
  if(keys.a||keys.arrowleft)cam.x-=ps;if(keys.d||keys.arrowright)cam.x+=ps;if(keys.w||keys.arrowup)cam.y-=ps;if(keys.s||keys.arrowdown)cam.y+=ps;
  render(rdt);hud();
  panelT-=rdt;if(panelT<=0){panelT=.25;updatePanel(false);refreshBar();updateQuest();}
  rosterT-=rdt;if(rosterT<=0){rosterT=.5;renderRoster(false);}
  requestAnimationFrame(frame);
}
checkSize();newGame();syncSpeed();showScreen('main');refreshSaveInfo();
requestAnimationFrame(frame);
