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

function blackOrRed (playerIndex) {
    let input = prompt("Is the card about to open Black or Red?").toLowerCase();
    console.log("You chose " + input + ".");         
    let pick = randomCard();
    players[playerIndex].push(pick);
    console.log("You've picked the " + pick + " card.")
    if (input == "black" && (pick[1] == "C" || pick[1] == "S")) {
        return console.log("RIGHT! Your new card is black. Give out one sip.");
    } else if (input == "red" && (pick[1] == "H" || pick[1] == "D")){
        return console.log("RIGHT! Your new card is red. Give out one sip.");
    } else {
        if (input == "black"){
            return console.log("WRONG! Your new card is red. Take one sip.");
        } else {
            return console.log("WRONG! Your new card is black. Take one sip.");
        }
    }
}

function greaterOrLess(playerIndex) {
    let input = prompt("Is the card about to open greater or less than your first one?").toLowerCase();
    console.log("You chose " + input + ".");
    let pick = randomCard();
    players[playerIndex].push(pick);
    console.log("You've picked the " + pick + " card.");
    if (input == "greater" && (pick[0] > players[playerIndex][0][0])){
        return console.log("RIGHT! Your new card is greater than your first one. Give out two sips.");
    } else if (input == "less" && (pick[0] < players[playerIndex][0][0])) {
        return console.log("RIGHT! Your new card is less than your first one. Give out two sips.");
    } else {
        if (input == "greater"){
            return console.log("WRONG! Your new card is less than your first one. Take two sips.");
        } else {
            return console.log("WRONG! Your new card is greater than your first one. Take two sips.");
        }
    }
}

function insideOrOutside (playerIndex) {
    players[playerIndex].sort();
    let input = prompt("Is the card about to open inside or outside the (inclusive) range formed by the other two?").toLowerCase();
    console.log("You chose " + input + ".");
    let pick = randomCard();
    players[playerIndex].push(pick);
    console.log("You've picked the " + pick + " card.");
    if (input == "inside" && pick[0] >= players[playerIndex][0][0] && pick[0] <= players[playerIndex][1][0]) {
        return console.log("RIGHT! Your new card is inside the range. Give out three sips.");
    } else if (input == "outside" && (pick[0] < players[playerIndex][0][0] || pick[0] > players[playerIndex][1][0])) {
        return console.log("RIGHT! Your new card is outside the range. Give out three sips.");
    } else {
        if (input == "inside") {
            return console.log("WRONG! Your new card is outside the range. Take three sips.");
        } else {
            return console.log("WRONG! Your new card is inside the range. Take three sips.");
        }
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
            blackOrRed(i);
        }
        for (let i=0; i < players.length; i++) {
            console.log("player " + (i + 1) + " turn. Current hand: " + players[i]);
            greaterOrLess(i);
        }
        for (let i=0; i < players.length; i++) {
            console.log("player " + (i + 1) + " turn. Current hand: " + players[i]);
            insideOrOutside(i);
        } 
    }
}

console.log(game()); 