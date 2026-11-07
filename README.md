# Wasteland Farm — Herança de Cinzas

Jogo de fazenda com humor negro e um pouco de RPG, no **Kingdom of Mordavia** (universo Ember Ashes).

Você herda uma fazenda numa terra queimada onde cai cinza o tempo todo. Planta trigo perto das rachaduras quentes e alho longe delas, constrói guildas, e os heróis aparecem e fazem o que querem. Você só influencia com recompensas em ouro. Sobreviva 7 noites.

## Como jogar

Abra o `index.html` em qualquer navegador (PC ou celular). Não precisa instalar nada.

- **Construir:** botão vermelho embaixo, ou tecla `B`
- **Vender colheita:** toque no seu ouro no canto de cima
- **Menu, salvar e opções:** botão `☰` ou `Esc`
- **Lista de heróis:** botão Heróis ou tecla `H`
- Arraste pra mover o mapa; pinça ou rodinha do mouse pro zoom; espaço pausa

## O que tem

- Pixel art de verdade: paleta fixa de 41 cores com dithering, luz da noite pontilhada
- Economia: trigo, alho, camponeses que colhem sozinhos, mercado com preço diário, pedidos do dia
- 6 guildas (Guerreiro, Arqueiro, Lanceiro, Mago Negro, Conjurador, Curandeiro), cada uma com 2 prestígios
- Monstros do folclore eslavo, lobos de dia, e o Avô na última noite
- Save: no navegador, ou na conta quando aberto como Artifact no claude.ai

## Estrutura

```
index.html              página do jogo (abra este)
css/style.css           visual da interface
js/core.js              constantes e utilidades
js/palette.js           paleta "Cinza e Brasa" e dithering
js/pixel.js             pintura em pixel, contornos e fonte 3x5
js/sprites-buildings.js construções, guildas e estandartes
js/sprites-world.js     covis, árvores e lugares com história
js/sprites-units.js     heróis, camponeses, monstros e invocações
js/data.js              construções, classes, prestígios, nomes e falas
js/state.js             estado global e câmera
js/world.js             geração do mapa, entidades e tempo
js/economy.js           economia, pedidos, construção, ondas e eventos
js/combat.js            combate, poderes e promoção
js/ai.js                inteligência de heróis, camponeses e monstros
js/update.js            atualização a cada quadro
js/save.js              opções e 3 slots de save
js/screens.js           telas de título, slots, pausa e fim
js/render.js            desenho, luz da noite e quantização
js/ui.js                HUD, painéis, lista de heróis e menu de construção
js/input.js             toque, mouse e teclado
js/main.js              laço principal e inicialização
DESIGN.md               documento de design
```

Os scripts são carregados em ordem pelo `index.html` e compartilham o mesmo escopo global, então o jogo abre direto do arquivo, sem servidor.
