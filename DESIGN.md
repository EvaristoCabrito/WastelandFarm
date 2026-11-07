# Documento de Design — versão básica

> Jogo de fazenda com humor negro e um pouco de RPG, no Kingdom of Mordavia.
> Versão 0.1 — 07/11/2026. Tudo aqui pode mudar; a ideia é ter o conceito no papel.

**Título:** ainda não definido.

---

## 1. Resumo

Você herda uma fazenda num dos piores lugares do Kingdom of Mordavia. A terra é coberta de cinza, o calor vaza pelas rachaduras do chão e toda noite alguma coisa vem buscar a colheita, ou o fazendeiro.

Você não controla ninguém diretamente. Você **constrói**, os **heróis aparecem e fazem o que querem**, e você só influencia com **recompensas em ouro**. A sua parte é plantar, construir e torcer. Quase sempre dá errado.

## 2. Pilares

1. **Fazenda:** plantar, colher, vender. É o que paga tudo.
2. **Controle indireto:** estruturas atraem heróis, e recompensas dizem o que você quer. Eles decidem se vale o risco.
3. **Humor negro:** tudo se estraga, de um jeito que dá risada.
4. **Um pouco de RPG:** heróis sobem de nível, compram equipamento, têm manias e defeitos, e morrem.

## 3. Mundo e tom

- **Kingdom of Mordavia**, com o clima do **Ember Ashes**: terra queimada, cinza caindo sem parar, brilho laranja saindo das rachaduras, nada verde sobrevive direito.
- Clima de vila de camponeses do leste europeu: casas de madeira escurecida, velas na janela, alho pendurado, superstição pra todo lado.
- Monstros tirados do folclore eslavo (domínio público).
- **Tom:** humor negro e seco. O jogo não ri de você, ele só relata o que aconteceu.
  - *"Herói lendário chegou à vila. Herói lendário tropeçou na cerca. Herói lendário morreu."*
  - *"Você sobreviveu 7 noites. A vila lembra de você com indiferença."*

## 4. Plataforma e técnica

- **HTML5 + JavaScript**, roda no navegador de qualquer coisa: celular, PC, Windows, Mac, Intel, AMD, ARM.
- Controle por toque e por mouse/teclado.
- Leve: tem que aguentar centenas de bonequinhos na tela ao mesmo tempo, inclusive no celular.

## 5. Visual

- **2D limpo, sem firula, de alta qualidade.**
- **Câmera de cima em três-quartos**, como no Majesty: mapa livre, construções espalhadas, cada uma no seu pedaço de chão.
- **Cenário e construções:** arte com volume e luz de verdade, no mesmo estilo das maquetes do Ember Ashes, reduzida pro tamanho do jogo.
- **Bonecos:** pequenininhos, virando para 8 direções. **O estilo ainda está em aberto** (ver seção 14). Até decidir, usamos bonequinhos simples no lugar.

## 6. Estrutura das partidas

- O jogo é uma sequência de **cenários**. Cada cenário é um mapa com um objetivo.
- **Morreu, acabou:** se a **Casa da Fazenda** cai, você perde o cenário e começa de novo.
- Vencer libera o próximo cenário, **sempre num lugar pior**.

## 7. O fazendeiro

- O fazendeiro **é a Casa da Fazenda**, como o castelo do rei no Majesty. Você é a mão que constrói.
- Ele tem algumas ações próprias que quase sempre terminam mal (exemplo: *"Sair com o forcado"*).

## 8. Ciclo do dia

| Fase | O que acontece |
|---|---|
| **Dia** | Plantar, colher, vender, construir. Os heróis caçam e exploram. |
| **Entardecer** | Aviso do que vem à noite (às vezes o aviso está errado). |
| **Noite** | Cinza pesada, ataques, desastres. Os heróis defendem, ou não. |

## 9. A fazenda e o ciclo de dinheiro

**O ciclo:** plantar → camponeses colhem → estoque (trigo e alho) → vender, cumprir pedidos, alimentar heróis, se defender → ouro → construir, recrutar, pôr recompensa → sobreviver à noite → repetir, mais difícil.

- **Trigo gosta de calor:** cresce rápido e rende mais perto das rachaduras quentes, que também chamam monstros.
- **Alho odeia calor:** cresce longe das rachaduras. É a decisão de onde plantar.
- **Camponeses** colhem sozinhos e levam pra casa. De noite se trancam. Lobos e monstros comem eles. Cada Casebre traz mais dois. Você também pode tocar no campo maduro pra colher na hora.
- **Mercado na Casa da Fazenda:** o preço do trigo e do alho muda todo dia. Vender na hora certa importa.
- **Pedidos do dia:** o bispo, o padre, a vila vizinha, o ferreiro ou a guarda do barão pedem uma quantidade até a noite. Pagam em ouro, bênção (menos mortos na noite seguinte) ou um soldado. Se falhar, tem consequência (o bispo manda o cobrador).
- **Alho à noite:** cada cabeça pendurada afasta strigoi.
- **Taverna:** o herói que come o seu trigo paga mais.
- **Lobos de cinza** aparecem de dia. Ameaçam camponeses e campos e dão trabalho (e ouro) pros heróis, que depois gastam com você.
- **Chamar a noite:** se não tem nada pra fazer, pula pro anoitecer.

## 10. Construções (primeira lista)

| Construção | Para que serve |
|---|---|
| Casa da Fazenda | O seu "castelo". Se cair, game over. |
| Campo | Onde planta. Melhor perto das rachaduras. |
| Celeiro | Guarda a colheita. Cai em fendas com frequência. |
| Taverna | Atrai heróis. Eles gastam o ouro de volta com você. |
| Forja | Heróis compram arma e armadura. |
| Capela | Bênçãos e cura, com efeitos colaterais. |
| Alojamento | Recruta um tipo de herói (cada alojamento é uma classe). |
| Torre de Vigia | Avisa ataques e atira em monstros. |
| Cerca de Alho | Defesa barata. Funciona às vezes. |
| Cemitério | Onde os heróis mortos vão parar. Talvez não fiquem lá. |

## 11a. Guildas: as 6 classes do Ember Ashes, cada uma com 2 prestígios

Cada classe básica tem sua guilda. Cada guilda pode ser melhorada para **uma** de duas guildas de prestígio. É uma escolha que fecha a outra, e define que tipo de herói a vila vai ter. No Ember Ashes o prestígio abre no **nível 15**.

| Classe básica | Papel | Prestígio A | Prestígio B |
|---|---|---|---|
| **Warrior** (Guerreiro) | Segura a linha de frente na força | Paladin (proteção) | Heavy Knight (controle da luta) |
| **Archer** (Arqueiro) | Decide a luta de longe, com arco e precisão | Ranger | Assassin |
| **Lancer** (Lanceiro) | Leva a lança pra linha de batalha | Sentinel | Templar |
| **Black Mage** (Mago Negro) | Magia destrutiva | Elementalist | Warlock |
| **Conjurer** (Conjurador) | As artes estranhas da conjuração | Sorcerer | Necromancer |
| **Healer** (Curandeiro) | Mantém os companheiros vivos | Bishop | Cleric |

**Como funciona no protótipo:**
- Cada guilda recruta sua classe básica (até 4 heróis por guilda).
- Melhorar a guilda custa 150 de ouro e é uma escolha pra sempre entre os dois prestígios. A guilda ganha nome novo e um estandarte.
- Heróis daquela classe viram a classe de prestígio ao chegar no **nível 3** (no jogo de fazenda as partidas são curtas; no Ember Ashes é nível 15).

| Classe | Poder básico | Prestígio A | Prestígio B |
|---|---|---|---|
| Guerreiro | Linha de frente | Paladino: se cura, dano dobrado em mortos-vivos | Cavaleiro Pesado: muita vida, golpe em área |
| Arqueiro | Ataque de longe | Patrulheiro: alcance enorme, tiro rápido | Assassino: facas com 30% de dano triplo |
| Lanceiro | Alcance maior que espada | Sentinela: leva 40% menos dano | Templário: forte contra mortos-vivos, se cura |
| Mago Negro | Magia em área | Elementalista: explosões enormes | Bruxo: rouba vida |
| Conjurador | Invoca um cão espectral | Feiticeiro: dois cães e magia forte | Necromante: levanta monstros mortos como servos |
| Curandeiro | Cura um herói por vez | Bispo: cura em área | Clérigo: cura e bate, dano dobrado em mortos-vivos |

## 11. Heróis (o "pouquinho de RPG")

- Chegam sozinhos, atraídos pelas construções.
- **Agem sozinhos:** caçam, exploram, fogem, bebem.
- **Recompensas:** você coloca ouro num ninho, num monstro ou numa plantação ameaçada, e eles decidem se vale.
- **Sobem de nível**, compram equipamento na forja e ficam mais caros e mais exigentes.
- **Defeitos e manias**, por exemplo:
  - *Covarde:* foge na primeira ferida.
  - *Ganancioso:* só aceita recompensa alta.
  - *Bêbado:* passa a noite na taverna enquanto a vila queima.
  - *Amaldiçoado:* traz azar pra quem está perto.
- **Morrem de vez.** O investimento vai junto.

## 12. Monstros (exemplos)

- **Strigoi:** mortos que voltam pra beber dos vivos.
- **Rusalka:** espíritos do rio que atraem heróis distraídos.
- **Leshy:** o guardião da floresta, que não gosta de fazendas.
- **Mortos do cemitério:** esqueletos em hordas.
- Monstros saem de **covis** no mapa. Destruir um covil é a recompensa mais cara e a mais importante.

## 13. Desastres e eventos

- **Rachadura:** a terra abre embaixo de uma construção.
- **Praga:** a colheita apodrece.
- **Fuga:** um herói some com o ouro da recompensa.
- **Benção que deu errado:** o padre benze a plantação e amanhece morto-vivo.
- **Cobrador:** a Igreja ou o senhor local aparece pra levar uma parte.

## 14. Cenários de exemplo

1. **A Herança:** você herda uma fazenda e descobre por que ninguém quis.
2. **Terra Fértil:** o solo é ótimo porque é um cemitério.
3. **A Colheita do Bispo:** a Igreja quer metade da colheita, e os mortos querem a outra.
4. **O Inverno de Cinzas:** sem colheita, só sobreviver.

## 15. Progressão: de fazendeiro a duque

O fazendeiro não fica fazendeiro pra sempre. A cada conquista ele sobe de posição, ganha respeito e poder, e os problemas crescem junto.

| Posição | O que ganha | Os problemas novos |
|---|---|---|
| **Fazendeiro** | Um pedaço de terra ruim | Monstros, praga, rachaduras |
| **Senhor de Terras** | Mais terra, camponeses trabalhando pra ele | Camponeses revoltados, cobrador do bispo, vizinhos invejosos |
| **Barão** | Título, castelo pequeno, guarda própria | Nobres rivais, assassinos, a Igreja de olho |
| **Conde** | Vilas inteiras, exército | Guerra, inquisição, cultos nas aldeias |
| **Duque** | Respeito de verdade, uma região do reino | O rei, catástrofes, a própria cinza |

- **Respeito** vira um recurso: abre construções, heróis melhores e casamentos políticos. Perder respeito tem consequência.
- O humor continua: *"Parabéns, agora você é barão. Seus inimigos também foram promovidos."*
- A Casa da Fazenda vira solar, depois castelo. Se o "castelo" da vez cair, acabou, igual.

## 16. Muito conteúdo, sem repetição

A regra é aproveitar bastante arte, lore e props de um cenário pro outro, sem o jogador sentir que está vendo a mesma coisa.

- **Toda peça de arte tem estados:** nova, gasta, danificada, queimada, melhorada. Uma taverna rende cinco imagens.
- **Lugares que voltam mudados:** o Cemitério Antigo do primeiro cenário vira a cripta da família quando você é barão. O lugar é o mesmo, a história é outra.
- **Personagens que voltam:** o Primo Vasile, o cobrador do bispo, o padre bêbado. Cada volta com uma posição ou um problema novo.
- **Heróis veteranos:** quem sobrevive a um cenário pode reaparecer no próximo, mais caro e com mais manias.
- **Lore nos props:** lápides com epitáfio, placas, cartas, ícones de santo. Cada um tem um texto curto que conta um pedaço do Kingdom of Mordavia.
- **Cenários por combinação:** um mapa base mais uma ou duas regras diferentes (inverno de cinza, peste, eclipse, visita do rei). As peças se repetem e a combinação não.

## 17. Em aberto

- **Estilo dos bonecos:** o usuário viu uma técnica na internet ("meio pixelada, efeito diferente, bonequinhos bem pequenos") e ainda não identificamos qual.
- **Título do jogo.**
- **Ember Ashes:** é uma região dentro do Kingdom of Mordavia ou o reino inteiro depois de uma catástrofe?
- **Nome "Mordavia":** existe uma Mordavia no Quest for Glory IV (Sierra, 1993). Para jogo pessoal tudo bem; reavaliar se for vender.
- Quantidade de construções, classes, monstros e cenários da primeira versão.
