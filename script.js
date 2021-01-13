let suits = ["H", "C", "D", "S"],
    ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13],
    singleDeck = [],
    players = [];

for (let i=0; i < suits.length; i++) {             // criando as 52 cartas
    for (let y=0; y < (ranks.length); y++) {
        singleDeck.push(new Array(ranks[y], suits[i]))
    }
}

let doubleDeck = singleDeck.concat(singleDeck);    // usando deck duplo

function randomCard () {                           // escolhe carta aleatoria no deck e ja retira da array
    let card = Math.floor(Math.random() * doubleDeck.length);
    return doubleDeck.splice(card, 1)[0];
}

function color(card) {
    if (card[1] == "C" || card[1] == "S") {
        return "black";
    } else {return "red"}
}

function valueComparison (currentCard, newCard) {
    if (newCard > currentCard) {
        return "greater";
    } else {return "lesser"}
}


function blackOrRed (playerIndex, input) {         // primeiro round
    let pick = randomCard();
    players[playerIndex].push(pick);
    console.log("You've picked the " + pick + " card.")
    if (input == "black" && (pick[1] == "C" || pick[1] == "S")) {
        return console.log("RIGHT! Your new card is black. Give out one sip.");
    } else if (input == "red" && (pick[1] == "H" || pick[1] == "D")){
        return console.log("RIGHT! Your new card is red. Give out one sip.");
    } else {
        return console.log("WRONG! Your new card is " + color(pick) + ". Take one sip.");
    }
}

function greaterOrLesser (playerIndex, input) {
    let pick = randomCard();
    players[playerIndex].push(pick);
    console.log("You've picked the " + pick + " card.");
    if (input == "greater" && (pick[0] > players[playerIndex][0][0])){
        return console.log("RIGHT! Your new card is greater than your first one. Give out two sips.");
    } else if (input == "lesser" && (pick[0] < players[playerIndex][0][0])) {
        return console.log("RIGHT! Your new card is lesser than your first one. Give out two sips.");
    } else {
        return console.log("WRONG! Your new card is " + valueComparison(players[playerIndex][0][0],pick[0]) + " than your first one. Take two sips.");
    }
}


function game() {
    let playersPrompt = prompt("How many will be playing? Numbers only");
    for (let i=0; i < playersPrompt; i++) {              
        players[i] = [];                               // i é igual ao numero de players
    }   
    while (players[players.length -1].length < 2) {    // enquanto 
        for (let i=0; i < players.length; i++) {
            console.log("player " + (i + 1) + " turn...");
            let choice = prompt("Is the card about to open Black or Red?").toLowerCase();
            console.log("You chose " + choice + ".");
            blackOrRed(i, choice);
        }
        for (let i=0; i < players.length; i++) {
            console.log("player " + (i + 1) + " turn...");
            let choice2 = prompt("Is the card about to open greater or lesser than your first one?").toLowerCase();
            console.log("You chose " + choice2 + ".");
            greaterOrLesser(i, choice2);
        } 
    }
}

console.log(game()); 