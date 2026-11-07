/* HeranÃ§a de Cinzas Â· Dados do jogo: construÃ§Ãµes, classes, prestÃ­gios, nomes e falas. */
'use strict';
/* ---------- dados do jogo ---------- */
const BD={
  casa:{name:'Casa da Fazenda',cost:0,hp:400,w:56,d:40,desc:'Você mora aqui. Se cair, acabou. É aqui que você vende a colheita.'},
  trigo:{name:'Campo de Trigo',short:'Trigo',field:1,cost:15,hp:40,w:56,d:36,desc:'Gosta de calor. Cresce rápido perto das rachaduras, que também chamam monstros.'},
  alho:{name:'Horta de Alho',short:'Alho',field:1,cost:20,hp:40,w:46,d:32,desc:'Odeia calor. Cresce longe das rachaduras. À noite, cada cabeça afasta um strigoi.'},
  casebre:{name:'Casebre',cost:40,hp:120,w:32,d:28,desc:'Mais dois camponeses. Eles não tinham pra onde ir mesmo.'},
  torre:{name:'Torre de Vigia',short:'Torre',cost:50,hp:160,w:20,d:20,range:175,dmg:7,rate:1.1,desc:'Atira nos monstros. Não pede recompensa.'},
  taverna:{name:'Taverna',cost:70,hp:220,w:64,d:44,desc:'Heróis descansam, bebem e comem o seu trigo. E pagam. Atrai andarilhos.'},
  g_warrior:{name:'Guilda dos Guerreiros',short:'Guerreiros',cls:'warrior',cost:70,hp:200,w:52,d:36,rc:40,desc:'Recruta guerreiros. Seguram a linha de frente na força.'},
  g_archer:{name:'Guilda dos Arqueiros',short:'Arqueiros',cls:'archer',cost:70,hp:150,w:38,d:32,rc:45,desc:'Recruta arqueiros. Decidem a luta de longe.'},
  g_lancer:{name:'Guilda dos Lanceiros',short:'Lanceiros',cls:'lancer',cost:75,hp:190,w:46,d:34,rc:45,desc:'Recruta lanceiros. A lança chega antes da espada.'},
  g_mage:{name:'Torre do Mago Negro',short:'Mago Negro',cls:'mage',cost:100,hp:150,w:24,d:26,rc:60,desc:'Recruta magos negros. Magia que explode em área. Eles também morrem fácil.'},
  g_conjurer:{name:'Círculo dos Conjuradores',short:'Conjuradores',cls:'conjurer',cost:100,hp:150,w:38,d:32,rc:60,desc:'Recruta conjuradores. Chegam sozinhos e lutam acompanhados.'},
  g_healer:{name:'Casa dos Curandeiros',short:'Curandeiros',cls:'healer',cost:80,hp:200,w:30,d:32,rc:50,desc:'Recruta curandeiros. Mantêm os heróis vivos. Por um tempo.'},
  forja:{name:'Forja',cost:90,hp:220,w:48,d:36,desc:'Heróis com ouro compram equipamento aqui. O ouro vem pra você.'},
};
const BUILD_ORDER=['trigo','alho','casebre','torre','taverna','g_warrior','g_archer','g_lancer','g_mage','g_conjurer','g_healer','forja'];
const UT={
  warrior:{name:'Guerreiro',tier:1,hp:75,atk:8,range:14,spd:44,cd:.9,hero:1,power:'Segura a linha de frente.'},
  paladin:{name:'Paladino',tier:2,base:'warrior',hp:100,atk:10,range:14,spd:44,cd:.9,hero:1,regen:2,undeadMul:1.8,power:'Se cura sozinho e bate dobrado em mortos-vivos.'},
  heavyknight:{name:'Cavaleiro Pesado',tier:2,base:'warrior',hp:140,atk:13,range:16,spd:36,cd:1.2,hero:1,cleave:.6,power:'Golpes que acertam todos em volta.'},
  archer:{name:'Arqueiro',tier:1,hp:42,atk:6,range:150,spd:50,cd:1.15,hero:1,ranged:1,power:'Atira de longe.'},
  ranger:{name:'Patrulheiro',tier:2,base:'archer',hp:55,atk:8,range:195,spd:54,cd:.85,hero:1,ranged:1,power:'Alcance enorme e tiro rápido.'},
  assassin:{name:'Assassino',tier:2,base:'archer',hp:50,atk:9,range:140,spd:58,cd:1,hero:1,ranged:1,crit:.3,bolt:PAL.g7,power:'Facas com 30% de chance de dano triplo.'},
  lancer:{name:'Lanceiro',tier:1,hp:62,atk:9,range:22,spd:46,cd:1.1,hero:1,power:'Lança com alcance maior que espada.'},
  sentinel:{name:'Sentinela',tier:2,base:'lancer',hp:90,atk:10,range:24,spd:42,cd:1.1,hero:1,armor:.4,power:'Leva 40% menos dano.'},
  templar:{name:'Templário',tier:2,base:'lancer',hp:80,atk:12,range:22,spd:46,cd:1.05,hero:1,undeadMul:1.6,regen:1.5,power:'Forte contra mortos-vivos e se cura aos poucos.'},
  mage:{name:'Mago Negro',tier:1,hp:34,atk:11,range:130,spd:40,cd:1.7,hero:1,ranged:1,bolt:PAL.e4,splash:18,power:'Magia que explode em área.'},
  elementalist:{name:'Elementalista',tier:2,base:'mage',hp:40,atk:15,range:140,spd:40,cd:1.6,hero:1,ranged:1,bolt:PAL.e5,splash:32,power:'Explosões enormes.'},
  warlock:{name:'Bruxo',tier:2,base:'mage',hp:44,atk:13,range:130,spd:42,cd:1.5,hero:1,ranged:1,bolt:PAL.z0,splash:12,drain:.5,power:'Rouba a vida de quem acerta.'},
  conjurer:{name:'Conjurador',tier:1,hp:36,atk:5,range:120,spd:40,cd:1.4,hero:1,ranged:1,bolt:PAL.n3,summons:1,power:'Invoca um cão espectral.'},
  sorcerer:{name:'Feiticeiro',tier:2,base:'conjurer',hp:44,atk:9,range:140,spd:42,cd:1.2,hero:1,ranged:1,bolt:PAL.n3,summons:2,power:'Magia forte e dois cães espectrais.'},
  necromancer:{name:'Necromante',tier:2,base:'conjurer',hp:44,atk:7,range:120,spd:40,cd:1.4,hero:1,ranged:1,bolt:PAL.z0,raise:.5,power:'Levanta monstros mortos pra lutar por você.'},
  healer:{name:'Curandeiro',tier:1,hp:40,atk:4,range:14,spd:40,cd:1.1,hero:1,heal:10,healCd:2.2,power:'Cura um herói ferido por vez.'},
  bishop:{name:'Bispo',tier:2,base:'healer',hp:50,atk:5,range:14,spd:38,cd:1.2,hero:1,heal:14,healCd:3,aoeHeal:1,power:'Cura todo mundo em volta de uma vez.'},
  cleric:{name:'Clérigo',tier:2,base:'healer',hp:65,atk:9,range:14,spd:42,cd:1,hero:1,heal:10,healCd:2.6,undeadMul:2,power:'Cura e bate. Dano dobrado em mortos-vivos.'},
  espirito:{name:'Cão Espectral',hp:26,atk:5,range:12,spd:60,cd:.8,hero:1,minion:1},
  servo:{name:'Servo Esquelético',hp:28,atk:5,range:13,spd:34,cd:1.1,hero:1,minion:1},
  fazendeiro:{name:'Fazendeiro',hp:30,atk:5,range:14,spd:46,cd:1,hero:1},
  campones:{name:'Camponês',hp:18,atk:0,range:0,spd:42,cd:1,worker:1},
  lobo:{name:'Lobo de Cinza',hp:20,atk:4,range:12,spd:56,cd:.8,gold:4,xp:5,beast:1},
  esqueleto:{name:'Esqueleto',hp:24,atk:4,range:13,spd:27,cd:1.2,gold:3,xp:5,undead:1},
  strigoi:{name:'Strigoi',hp:32,atk:6,range:13,spd:50,cd:.95,gold:6,xp:8,burns:1,undead:1},
  avo:{name:'O Avô',hp:650,atk:16,range:20,spd:30,cd:1.4,gold:120,xp:90,boss:1,undead:1},
};
const CLS={warrior:{guild:'g_warrior',pres:['paladin','heavyknight']},archer:{guild:'g_archer',pres:['ranger','assassin']},lancer:{guild:'g_lancer',pres:['sentinel','templar']},
  mage:{guild:'g_mage',pres:['elementalist','warlock']},conjurer:{guild:'g_conjurer',pres:['sorcerer','necromancer']},healer:{guild:'g_healer',pres:['bishop','cleric']}};
const PRES_COST=150,PROMO_LVL=3;
const PRES_GUILD={paladin:'Ordem dos Paladinos',heavyknight:'Salão do Cavaleiro Pesado',ranger:'Cabana dos Patrulheiros',assassin:'Casa dos Assassinos',sentinel:'Quartel das Sentinelas',
  templar:'Comenda dos Templários',elementalist:'Torre do Elementalista',warlock:'Torre do Bruxo',sorcerer:'Sanctum do Feiticeiro',necromancer:'Cripta do Necromante',bishop:'Templo da Oração',cleric:'Templo da Guerra'};
const PRES_DESC={paladin:'Mais vida, se cura sozinho e bate dobrado em mortos-vivos.',heavyknight:'Muita vida e golpes que acertam todo mundo em volta. Lento como imposto.',
  ranger:'Alcance enorme e tiros rápidos.',assassin:'Facas com 30% de chance de dano triplo.',sentinel:'Leva 40% menos dano.',templar:'Forte contra mortos-vivos e se cura aos poucos.',
  elementalist:'Explosões enormes.',warlock:'Rouba a vida de quem acerta.',sorcerer:'Magia mais forte e dois cães espectrais.',necromancer:'Levanta os monstros que morrem perto dele pra lutar por você.',
  bishop:'Cura todo mundo em volta de uma vez.',cleric:'Cura e bate, com dano dobrado em mortos-vivos.'};
const PROMO_MSG={paladin:n=>`${n} virou Paladino. Agora reza antes de bater.`,heavyknight:n=>`${n} virou Cavaleiro Pesado. A armadura pesa mais que ele.`,
  ranger:n=>`${n} virou Patrulheiro. Agora erra de mais longe.`,assassin:n=>`${n} virou Assassino. Ninguém mais sabe o nome verdadeiro dele.`,
  sentinel:n=>`${n} virou Sentinela. Não sai de perto de casa nem pra beber.`,templar:n=>`${n} virou Templário. A lança foi benta. Ele, mais ou menos.`,
  elementalist:n=>`${n} virou Elementalista. Tirem o trigo de perto.`,warlock:n=>`${n} virou Bruxo. Ninguém perguntou o preço.`,
  sorcerer:n=>`${n} virou Feiticeiro. Os cães agora vêm em dupla.`,necromancer:n=>`${n} virou Necromante. O cemitério ganhou um sindicato.`,
  bishop:n=>`${n} virou Bispo. Já pediu o dízimo.`,cleric:n=>`${n} virou Clérigo. Cura com uma mão e bate com a outra.`};
const TRAITS={
  'Covarde':'Foge na primeira ferida.','Ganancioso':'Só aceita recompensa gorda.','Bêbado':'Passa a noite na taverna, aconteça o que acontecer.',
  'Amaldiçoado':'Os monstros preferem ele.','Valente':'Nunca foge. Isso não é um elogio.','Honesto':'Nenhum defeito conhecido. Suspeito.','Teimoso':'Não foge. Não escuta. É você.',
};
const FIRST=['Vasile','Mirela','Bogdan','Ileana','Radu','Doina','Grigore','Anca','Toma','Zoia','Petru','Lenuța','Costel','Viorica','Mircea','Sanda','Dorin','Floarea','Ion','Rodica'];
const EPI=['Três Dedos','Sem Sorte','do Brejo','da Vala','Meio Surdo','Olho Torto','de Ninguém','Dente Mole','do Poço'];
const NIGHT_MSG=['Primeira noite. Dizem que a primeira é a mais fácil. Dizem muita coisa.','Anoiteceu. Tranque as galinhas. Você não tem galinhas.',
  'Noite três. Os mortos já sabem o seu endereço.','Anoiteceu. O padre recomenda rezar. O padre está bêbado.','Noite cinco. A cinza está mais grossa. Isso não é cinza.',
  'Penúltima noite. Ou última. Depende de você.','Última noite. Alguém da família veio visitar.'];
const DEATH=[n=>`${n} morreu. Deixou dívidas na taverna.`,n=>`${n} morreu fazendo o que amava: fugindo devagar demais.`,n=>`${n} morreu. A família vai receber uma carta. Ou não.`,
  n=>`${n} virou adubo. Os campos agradecem.`,n=>`${n} morreu. Era o favorito de ninguém.`];
const PEASANT_DEATH=['Um camponês morreu. Os outros pediram aumento.','Um camponês foi comido. A colheita atrasou.','Perdemos um camponês. Ele tinha nome. Ninguém lembra qual.'];

