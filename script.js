const cards = document.getElementsByClassName("card");
const dragCards = document.querySelectorAll("[draggable='true']")
const deck = document.getElementById('deck')
const arenas = document.querySelectorAll('.arena-area');

class Card {
    constructor(nome, simbolo, tipo, atk, hp, spd){
        this.nome = nome;
        this.simbolo = simbolo;
        this.tipo = tipo;
        this.atk = atk;
        this.hp = hp;
        this.spd = spd;
    }
}

const Cards = [
    new Card("Wither", "", "Feitiço", 120, 300, 60),
    new Card("Aranha", "", "Corte", 45, 80, 110),
    new Card("Slime", "", "Rocha", 35, 120, 50),
    new Card("Ghast", "", "Feitiço", 90, 100, 70),
    new Card("Esqueleto", "", "Corte", 60, 90, 90),
    new Card("Enderman", "", "Feitiço", 75, 120, 100),
    new Card("Elder Guardian", "", "Rocha", 85, 150, 40),
    new Card("Creeper", "", "Rocha", 100, 70, 80),
    new Card("Blaze", "", "Feitiço", 95, 85, 95),
    new Card("Zombie", "", "Rocha", 65, 100, 60),


    new Card("Cavaleiro", "", "Rocha", 65, 110, 80),
    new Card("Arqueiro", "", "Corte", 45, 90, 140),
    new Card("Bárbaro", "", "Rocha", 85, 120, 70),
    new Card("Feiticeiro", "", "Feitiço", 70, 70, 120),
    new Card("Monge", "", "Feitiço", 55, 100, 110),
];



Cards.forEach((card, index) => {
    const nomeEL = document.getElementById(`name-card-${index + 1}`);
    const simboloEL = document.getElementById(`img-card-${index + 1}`);
    const tipoEL = document.getElementById(`card-type-${index + 1}`)
    const atkEL = document.getElementById(`atk-card-${index + 1}`);
    const hpEL = document.getElementById(`hp-card-${index + 1}`);
    const spdEL = document.getElementById(`spd-card-${index + 1}`);

    if (nomeEL) nomeEL.textContent = card.nome;
    if (simboloEL) simboloEL.textContent = card.simbolo;
    if (tipoEL) tipoEL.textContent = card.tipo;
    if (atkEL) atkEL.textContent = card.atk;
    if (hpEL) hpEL.textContent = card.hp;
    if (spdEL) spdEL.textContent = card.spd;
});


function comecarArrastar(){
    this.classList.add('arrastando')
}

function soltar(e){
    e.preventDefault()
}

function soltou() {
    const elementoArrastado = document.querySelector('.arrastando');
    elementoArrastado.classList.add('na-arena')

    if (this.children.length > 0) {
        const cartaAntiga = this.children[0];
        document.getElementById('cards').appendChild(cartaAntiga);
        cartaAntiga.classList.remove('na-arena')
    }

    this.appendChild(elementoArrastado);
    elementoArrastado.classList.remove('arrastando');

    atualizarMensagem()
}


function soltouDeck(){
    const cardsDeck = document.getElementById('cards')
    const elementoArrastado = document.querySelector('.arrastando')

    cardsDeck.appendChild(elementoArrastado)
    elementoArrastado.classList.remove('arrastando');
    elementoArrastado.classList.remove('na-arena')

    atualizarMensagem()
}

dragCards.forEach((card) => {
    card.addEventListener('dragstart', comecarArrastar);
})

deck.addEventListener("dragover", soltar)
deck.addEventListener('drop', soltouDeck)

arenas.forEach((arena) => {
    arena.addEventListener("dragover", soltar);
    arena.addEventListener("drop", soltou);
});



function reiniciarBatalha(){
    const cartasNaArena = document.querySelectorAll('.na-arena');
    document.querySelectorAll('.card').forEach(cardEl => cardEl.classList.remove('vencedor'));

    cartasNaArena.forEach((carta) => {
        document.getElementById('cards').appendChild(carta);
        carta.classList.remove('na-arena');
    });

    const log = document.getElementById('log-batalha');
    log.innerHTML = `<span>Bem-vindo à Arena Medieval!</span>`;

    atualizarMensagem()
    numRodadas = 0
}

function atualizarMensagem() {
    const cartasNaArena = document.querySelectorAll('.na-arena');
    const qntCartasArena = cartasNaArena.length;
    const waitingMSG = document.getElementById('waiting-msg');

    if (qntCartasArena === 0) {
        waitingMSG.textContent = '⚔️ Aguardando Guerreiros... ⚔️';
    } else if (qntCartasArena === 2) {
        waitingMSG.textContent = '⚔️ Pronto para a Batalha! ⚔️';
    }
}

let numRodadas = 0

function iniciarBatalha(){
    numRodadas++
    document.querySelectorAll('.card').forEach(cardEl => cardEl.classList.remove('vencedor'));


    function getCardElementByName(nome) {
        return Array.from(document.querySelectorAll('.card')).find(cardEl => {
            const h2 = cardEl.querySelector('h2');
            return h2 && h2.textContent === nome;
        });
    }


    const cartasNaArena = document.querySelectorAll('.na-arena');
    const qntCartasArena = cartasNaArena.length;

    if (qntCartasArena === 2) {
        const carta1 = cartasNaArena[0];
        const carta2 = cartasNaArena[1];

        const nome1 = carta1.querySelector('h2').textContent;
        const nome2 = carta2.querySelector('h2').textContent;
        const tipo1 = carta1.querySelector('.type-card').textContent;
        const tipo2 = carta2.querySelector('.type-card').textContent;

        const card1 = Cards.find(c => c.nome === nome1);
        const card2 = Cards.find(c => c.nome === nome2);

        let multiplicadorCarta1 = 1;
        let multiplicadorCarta2 = 1;

      
        let atacaPrimeiro, atacaSegundo; 

        if (card1.spd > card2.spd){
            atacaPrimeiro = card1;
            atacaSegundo = card2;
        } else if (card1.spd < card2.spd){
            atacaPrimeiro = card2;
            atacaSegundo = card1;
        } else{
            [atacaPrimeiro, atacaSegundo] = Math.random() < 0.5 ? [card1, card2] : [card2, card1];
        }

        let multiplicadorAtacante, multiplicadorDefensor;

        if (atacaPrimeiro.nome === card1.nome) {
            multiplicadorAtacante = multiplicadorCarta1;
            multiplicadorDefensor = multiplicadorCarta2;
        } else {
            multiplicadorAtacante = multiplicadorCarta2;
            multiplicadorDefensor = multiplicadorCarta1;
        }


        const log = document.getElementById('log-batalha');
        log.innerHTML +=  `<span>💥 Rodada Número ${numRodadas}!</span>`;
        setTimeout(() => {
        log.innerHTML += `<span>🔫 ${atacaPrimeiro.nome} ataca primeiro!</span>`;
        }, 500)

        // ATAQUE
         // Primeiro ataque
        setTimeout(() => {
            atacaSegundo.hp -= atacaPrimeiro.atk * multiplicadorAtacante;
            carta2.classList.add('dano-recebido');
            if (atacaSegundo.hp < 0) atacaSegundo.hp = 0;
        }, 500);

        setTimeout(() => {
            log.innerHTML += `<span>👊 ${atacaPrimeiro.nome} desferiu um ataque de ${atacaPrimeiro.atk * multiplicadorCarta1} pontos em ${atacaSegundo.nome}!</span>`;
            carta2.classList.remove('dano-recebido');

            const indexCarta = Cards.findIndex(c => c.nome === atacaSegundo.nome);
            const hpEL = document.getElementById(`hp-card-${indexCarta + 1}`);
            if (hpEL) hpEL.textContent = atacaSegundo.hp;

            if (atacaSegundo.hp <= 0) {
                log.innerHTML += `<span>☠️ ${atacaSegundo.nome} caiu na arena e não se levantou mais!</span>`;
                const vencedorEl = getCardElementByName(atacaPrimeiro.nome);
                if (vencedorEl) vencedorEl.classList.add('vencedor');
            }
        }, 1000);

        // Contra-ataque
        setTimeout(() => {
            if (atacaSegundo.hp > 0){
                atacaPrimeiro.hp -= atacaSegundo.atk * multiplicadorDefensor;
                carta1.classList.add('dano-recebido');
                if (atacaPrimeiro.hp < 0) atacaPrimeiro.hp = 0;
                log.innerHTML += `<span>💥 ${atacaSegundo.nome} revidou com ${atacaSegundo.atk * multiplicadorCarta2} de dano em ${atacaPrimeiro.nome}!</span>`;

                const indexCarta = Cards.findIndex(c => c.nome === atacaPrimeiro.nome);
                const hpEL = document.getElementById(`hp-card-${indexCarta + 1}`);
                if (hpEL) hpEL.textContent = atacaPrimeiro.hp;

                setTimeout(() => {
                    carta1.classList.remove('dano-recebido');
                }, 300);
            }

            if (atacaPrimeiro.hp <= 0) {
                log.innerHTML += `<span>☠️ ${atacaPrimeiro.nome} não resistiu aos golpes e foi eliminado!</span>`;
                const vencedorEl = getCardElementByName(atacaSegundo.nome);
                if (vencedorEl) vencedorEl.classList.add('vencedor');
            }
        }, 2000);

    } else {
        alert('Não há guerreiros suficiente!');
    }
}
