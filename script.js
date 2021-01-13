let suits = ["H", "C", "D", "S"],
    ranks = [1,2,3,4,5,6,7,8,9,10,11,12,13],
    singleDeck = [],
    players = [];

for (let i=0; i < suits.length; i++) {             
    for (let y=0; y < (ranks.length); y++) {
        singleDeck.push(new Array(ranks[y], suits[i]))
    }
}

let doubleDeck = singleDeck.concat(singleDeck);    

function randomCard () {                           
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
    players[playerIndex].sort(function(a, b){return a[0]-b[0]});
    console.log(players[playerIndex])
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

function whichSuit (playerIndex) {
    let input = prompt("What's the suit of the card about to open? H, C, D or S?").toUpperCase();
    console.log("You chose " + input + ".");         
    let pick = randomCard();
    players[playerIndex].push(pick);
    console.log("You've picked the " + pick + " card.")
    if (input == pick[1]) {
        return console.log("RIGHT! Your new card suit is " + pick[1] + ". Give out four sips.");
    } else {
        return console.log("WRONG! Your new card suit is " + pick[1] + ". Take four sips.")
    }
}

function secondPart (state, round) {
    let openCard = randomCard();
    console.log("Round " + round + " in " + state + ". The card dealt is " + openCard);
    let chosen = players.map(a =>
        a.map(e =>
            e.filter(i =>
                i == openCard[0]
            )
        )
    );
    let points = []
    for (let i=0; i < players.length; i++) {
        points[i] = 0;
        let occurrences = chosen[i].filter(a => a.length > 0);
        points[i]+= occurrences.length;
        if (state == "heaven") {
            console.log("player " + (i+1) + " gives away " + points[i]*round + " sips.");
        } else {
            console.log("player " + (i+1) + " takes " + points[i]*round + " sips.");
        }
        
    }
}

function game() {
    let playersPrompt = prompt("How many will be playing? Numbers only");
    for (let i=0; i < playersPrompt; i++) {              
        players[i] = [];                               
    }   
    while (players[players.length -1].length < 4) {     
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
        for (let i=0; i < players.length; i++) {
            console.log("player " + (i + 1) + " turn. Current hand: " + players[i]);
            whichSuit(i);
        } 
    }
    console.log("Here's every hand:")
    for (let i=0; i < players.length; i++) {
        console.log("player " + (i + 1) + " hand: " + players[i]);
    }
    console.log("Now ten cards will be dealt. Five in heaven, where you give away a X number of sips; and five in hell, where you take a X number of sips. Let's go?")
    for (let i=1; i <= 5; i++) {
        secondPart("heaven", i);
        secondPart("hell", i);
    }
    return "GAME OVER!"
}

console.log(game()); 
