let suits = ["H", "C", "D", "S"],
    ranks = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"],
    singleDeck = [],
    players = [];

for (let i=0; i < suits.length; i++) {             // criando as 52 cartas
    for (let y=0; y < (ranks.length); y++) {
        singleDeck.push(ranks[y] + suits[i])
    }
}
let doubleDeck = singleDeck.concat(singleDeck);    // usando deck duplo


function randomCard () {                           // escolhe carta aleatoria no deck e ja retira da array
    let card = Math.floor(Math.random() * doubleDeck.length);
    return doubleDeck.splice(card, 1)[0];
}

function color(card) {
    if (card.includes("C") || card.includes("S")) {
        return "black";
    } else {return "red"}
}

function blackOrRed (playerIndex, input) {         // primeiro round
    let pick = randomCard();
    players[playerIndex].push(pick);
    console.log("You've picked the " + pick + " card.")
    if (input == "black" && (pick.includes("C") || pick.includes("S"))) {
        return console.log("Your card is " + color(pick) + ". Give out one sip.");
    } else if (input == "red" && (pick.includes("H") || pick.includes("D"))){
        return console.log("Your card is " + color(pick) + ". Give out one sip.");
    } else {
        return console.log("Your card is " + color(pick) + ". Take one sip.");
    }
}

function game() {
    let playersPrompt = prompt("How many will be playing? Numbers only");
    for (let i=0; i < playersPrompt; i++) {              
        players[i] = [];                               
    }   
    while (players[players.length -1].length < 1) {
        for (let i=0; i < players.length; i++) {
            console.log("player " + (i + 1) + " turn...");
            let choice = prompt("Black or Red?").toLowerCase();
            console.log("You chose " + choice + ".");
            blackOrRed(i, choice);
        }   
    }
}

console.log(game());

/*
function biggerOrSmaller (input, card) {
    if(){}
}
*/