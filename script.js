const dealerSum = 0
const yourSum = 0

const dealerAceCount = 0
const yourAceCount = 0 

var hidden;
var deck;

const canHit = true

window.onload = function() {
  buildDeck();
}

const buildDeck = () => {
  let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];
    deck = [];

    for(let iteration = 0; iteration < types.length; iteration++) {
      for(let value = 0; value < values.length; value++) {
        deck.push(values[value] + "-" + types[iteration])
      }
    }
}