let suits = ["H", "C", "D", "S"];
let ranks = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K", "A"];
let deck = [];

for (let i=0; i < suits.length; i++) {
    for (let y=0; y < ranks.length; y++) {
        deck.push(ranks[y] + suits[i])
    }
}

function blackOrRed (input, card) {
    if (input == "black" && (card.includes("C") || card.includes("S"))) {
        choos
    }
}