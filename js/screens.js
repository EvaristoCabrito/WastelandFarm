/* HeranÃ§a de Cinzas Â· Telas: tÃ­tulo, slots, introduÃ§Ã£o, opÃ§Ãµes, pausa e fim. */
'use strict';
/* ---------- telas: título, introdução, opções, pausa, fim ---------- */
let cachedSlots=[null,null,null],saveChecked=false,uiScreen='main',optsBack='main',slotMode='load',slotBack='main',pendingSlot=1,confirmSlot=0;
function latestSlot(){let best=0;cachedSlots.forEach((s,i)=>{if(s&&(!best||(s.savedAt||0)>(cachedSlots[best-1].savedAt||0)))best=i+1;});return best;}
function slotSummary(s){return `Dia ${s.day}, ${PHASE_PT[s.phase]||''} · ${s.gold} de ouro · ${s.heroes} ${s.heroes===1?'herói':'heróis'} · salvo ${ago(s.savedAt)}`;}
function doLoad(s,n){try{loadGame(s);G.slot=n;applyOpts(true);started=true;$('#overlay').hidden=true;uiScreen='game';msg(`Slot ${n}. Bem-vindo de volta. Dia ${G.nightsDone+1}. A fazenda continua horrível.`);}
  catch(err){msg('Esse save está estragado. Escolha outro slot ou comece um novo jogo.','bad');showScreen('main');}}
function ago(ts){const m=Math.round((Date.now()-ts)/60000);if(m<1)return 'agora há pouco';if(m<60)return `há ${m} min`;const h=Math.round(m/60);if(h<24)return `há ${h} h`;return `há ${Math.round(h/24)} dias`;}
const PHASE_PT={day:'de dia',dusk:'no entardecer',night:'de noite',dawn:'no amanhecer'};
function statsHTML(s){return `<dl class="stats"><div><dt>Heróis enterrados</dt><dd>${s.heroDead}</dd></div><div><dt>Camponeses perdidos</dt><dd>${s.peasantDead}</dd></div>
  <div><dt>Monstros abatidos</dt><dd>${s.monDead}</dd></div><div><dt>Colheita total</dt><dd>${s.crops}</dd></div>
  <div><dt>Ouro de vendas e pedidos</dt><dd>${s.sold}</dd></div><div><dt>Ouro que os heróis gastaram com você</dt><dd>${s.earned}</dd></div></dl>`;}
function optRow(key,label,why,vals){return `<div class="opt"><div class="lbl">${label}</div>${why?`<div class="why">${why}</div>`:''}<div class="seg">${vals.map(([v,t])=>`<button data-opt="${key}" data-val="${v}" class="${String(OPTS[key])===String(v)?'on':''}">${t}</button>`).join('')}</div></div>`;}
function showScreen(name){
  uiScreen=name;const b=$('#cBody');$('#overlay').hidden=false;let h='';
  if(name==='main'){
    const ls=latestSlot(),sv=ls?cachedSlots[ls-1]:null;
    h=`<p class="eyebrow">Kingdom of Mordavia</p><h1>Herança de Cinzas</h1><div class="menu">
      <button data-act="continue" class="${sv?'cta':''}"${sv?'':' disabled'}>Continuar</button>
      <p class="saveinfo">${!saveChecked?'Procurando seus saves...':sv?`Slot ${ls} · ${slotSummary(sv)}`:'Nenhum jogo salvo ainda.'}</p>
      ${sv?'<button data-act="loadMenu">Carregar jogo</button>':''}
      <button data-act="new" class="${sv?'':'cta'}">Novo jogo</button><button data-act="opts">Opções</button></div>
      <p class="foot">${Store.kind==='cloud'?'O save fica na sua conta: continua no celular ou no PC.':'O save fica neste navegador.'}</p>`;
  }else if(name==='intro'){
    h=`<p class="eyebrow">Cenário 1 · A Herança</p><h1>Herança de Cinzas</h1>
      <p class="lead">Seu tio morreu e deixou a fazenda pra você. Ninguém da família quis. Agora você vai descobrir por quê.</p>
      <p class="goal"><b>Objetivo:</b> sobreviver 7 noites. Se a Casa da Fazenda cair, acabou.</p>
      <ul class="how"><li><b>Trigo gosta de calor:</b> plante perto das rachaduras. <b>Alho odeia:</b> plante longe. Os camponeses colhem sozinhos.</li>
      <li><b>Venda a colheita</b> tocando no seu ouro. Cumpra os <b>pedidos do dia</b>.</li>
      <li><b>Alho afasta strigoi</b> à noite. A <b>taverna serve trigo</b> aos heróis, e eles pagam.</li>
      <li><b>Construa</b> e os heróis aparecem. Você não manda neles. Ponha <b>recompensa</b> em monstros e covis.</li>
      <li>Toque nas coisas do mapa: <b>todo lugar tem história</b>. ☰ no topo salva e pausa.</li></ul>
      <p class="saveinfo">Este jogo salva no slot ${pendingSlot}${cachedSlots[pendingSlot-1]?'. O jogo que está lá só some quando este salvar':''}.</p>
      <div class="menu"><button data-act="start" class="cta">Aceitar a herança</button><button data-act="main">Voltar</button></div>`;
  }else if(name==='opts'){
    h=`<p class="eyebrow">Opções</p><h1>Opções</h1>
      ${optRow('autosave','Salvar sozinho','Salva todo amanhecer e quando você sai do jogo.',[[true,'Ligado'],[false,'Desligado']])}
      ${optRow('night','Noite','Escura é mais bonita. Clara é mais fácil de enxergar.',[['escura','Escura'],['clara','Clara']])}
      ${optRow('pixel','Tamanho do pixel','Também dá pra ajustar com pinça ou rodinha do mouse.',[['menor','Menor'],['auto','Automático'],['maior','Maior']])}
      ${optRow('speed','Velocidade ao começar',null,[[1,'1×'],[2,'2×'],[3,'3×']])}
      <div class="menu"><button data-act="${optsBack}" class="cta">Voltar</button></div>`;
  }else if(name==='pause'){
    h=`<p class="eyebrow">Slot ${G.slot||1} · Dia ${G.nightsDone+1} · ${PHASE_PT[G.phase]}</p><h1>Pausado</h1><div class="menu">
      <button data-act="resume" class="cta">Voltar ao jogo</button><button data-act="save">Salvar no slot ${G.slot||1}</button>
      <p class="saveinfo" id="saveStatus">${G.lastSave?'Último save '+ago(G.lastSave)+'.':'Ainda não salvou este jogo.'}</p>
      <button data-act="saveAs">Salvar em outro slot</button><button data-act="optsP">Opções</button><button data-act="quit">Sair pro título</button></div>`;
  }else if(name==='slots'){
    const title=slotMode==='load'?'Carregar jogo':slotMode==='new'?'Em qual slot?':'Salvar em qual slot?';
    h=`<p class="eyebrow">${slotMode==='load'?'Carregar':slotMode==='new'?'Novo jogo':'Salvar'}</p><h1>${title}</h1><div class="menu">`+
      SLOTS.map(n=>{const s=cachedSlots[n-1],cur=started&&G&&G.slot===n;
        let label=`<b>Slot ${n}${cur?' · este jogo':''}</b><span class="slotinfo">${s?slotSummary(s):'Vazio'}</span>`;
        if(confirmSlot===n)label=`<b>Substituir o slot ${n}?</b><span class="slotinfo">Toque de novo pra confirmar. O jogo que está lá some.</span>`;
        return `<button class="slot${confirmSlot===n?' cta':''}" data-act="slot" data-n="${n}"${slotMode==='load'&&!s?' disabled':''}>${label}</button>`;}).join('')+
      `<button data-act="${slotBack}">Voltar</button></div>`;
  }else if(name==='quit'){
    h=`<p class="eyebrow">Sair</p><h1>Sair pro título?</h1><p class="lead">O que não foi salvo se perde. A fazenda não vai sentir sua falta.</p>
      <div class="menu"><button data-act="saveQuit" class="cta">Salvar e sair</button><button data-act="quitNoSave">Sair sem salvar</button><button data-act="pause">Cancelar</button></div>`;
  }else if(name==='end'){
    const win=G.endWin;
    h=`<p class="eyebrow">${win?'Fim da herança':'Fim da linhagem'}</p><h1>${win?'Você sobreviveu.':'A casa caiu.'}</h1>
      <p class="lead">${win?'Sete noites. A vila lembra de você com indiferença.':`A Casa da Fazenda caiu na noite ${Math.max(1,G.nightNum)}. O próximo herdeiro já foi avisado.`}</p>
      ${statsHTML(G.stats)}<div class="menu">${!win&&cachedSlots[(G.slot||1)-1]?'<button data-act="reloadSlot" class="cta">Voltar ao último save</button>':''}
      <button data-act="restart" class="${!win&&cachedSlots[(G.slot||1)-1]?'':'cta'}">Herdar de novo</button><button data-act="main">Menu principal</button></div>`;
  }
  b.innerHTML=h;drawTitle(name==='end'&&!G.endWin);
  const first=b.querySelector('button.cta')||b.querySelector('button');if(first&&matchMedia('(pointer:fine)').matches)first.focus({preventScroll:true});
}
function refreshSaveInfo(){return readAllSlots().then(a=>{cachedSlots=a;saveChecked=true;if((uiScreen==='main'||uiScreen==='slots')&&!$('#overlay').hidden)showScreen(uiScreen);});}
$('#cBody').addEventListener('click',async e=>{
  const o=e.target.closest('[data-opt]');
  if(o){let v=o.dataset.val;v=v==='true'?true:v==='false'?false:/^\d+$/.test(v)?+v:v;OPTS[o.dataset.opt]=v;saveOpts();if(o.dataset.opt==='pixel')applyOpts(false);showScreen('opts');return;}
  const a=e.target.closest('[data-act]');if(!a)return;const act=a.dataset.act;
  if(act==='main'){started=false;showScreen('main');refreshSaveInfo();}
  else if(act==='new'){confirmSlot=0;slotMode='new';slotBack='main';
    if(cachedSlots.every(s=>!s)){pendingSlot=1;showScreen('intro');}else showScreen('slots');}
  else if(act==='loadMenu'){confirmSlot=0;slotMode='load';slotBack='main';showScreen('slots');}
  else if(act==='saveAs'){confirmSlot=0;slotMode='save';slotBack='pause';showScreen('slots');}
  else if(act==='slot'){const n=+a.dataset.n,s=cachedSlots[n-1];
    if(slotMode==='load'){if(s)doLoad(s,n);}
    else if(slotMode==='new'){if(s&&confirmSlot!==n){confirmSlot=n;showScreen('slots');return;}confirmSlot=0;pendingSlot=n;showScreen('intro');}
    else{if(s&&G.slot!==n&&confirmSlot!==n){confirmSlot=n;showScreen('slots');return;}confirmSlot=0;a.disabled=true;await saveGame(false,n);showScreen('pause');}}
  else if(act==='start'){startPlay();}
  else if(act==='restart'){pendingSlot=G.slot||1;startPlay();}
  else if(act==='continue'){const ls=latestSlot();if(ls)doLoad(cachedSlots[ls-1],ls);}
  else if(act==='reloadSlot'){const n=G.slot||1;if(cachedSlots[n-1])doLoad(cachedSlots[n-1],n);}
  else if(act==='opts'){optsBack='main';showScreen('opts');}
  else if(act==='optsP'){optsBack='pause';showScreen('opts');}
  else if(act==='resume'){$('#overlay').hidden=true;uiScreen='game';}
  else if(act==='pause')showScreen('pause');
  else if(act==='save'){a.disabled=true;$('#saveStatus').textContent='Salvando...';const w=await saveGame(false);
    if(uiScreen==='pause'){$('#saveStatus').textContent=w==='cloud'?'Salvo na sua conta agora.':w==='local'?'Salvo neste navegador agora.':'Não deu pra salvar.';a.disabled=false;}}
  else if(act==='quit')showScreen('quit');
  else if(act==='saveQuit'){a.disabled=true;await saveGame(false);started=false;newGame();showScreen('main');refreshSaveInfo();}
  else if(act==='quitNoSave'){started=false;newGame();showScreen('main');refreshSaveInfo();}
});
function openPause(){if(!G||!started||G.over)return;buildMode=null;refreshBar();updateHint();showScreen('pause');}
$('#menuBtn').addEventListener('click',openPause);

