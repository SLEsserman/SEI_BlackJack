let dealerSum = 0
let yourSum = 0

let dealerAceCount = 0
let yourAceCount = 0 

let hidden = null
let deck = [];

let canHit = true

window.addEventListener('load', () => {
  buildDeck();
  shuffleDeck();
  startGame();
  document.getElementById('my_audio').play()
});


const buildDeck = () => {
  let values = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
    let types = ["C", "D", "H", "S"];

    for(let iteration = 0; iteration < types.length; iteration++) {
      for(let value = 0; value < values.length; value++) {
        deck.push(values[value] + "-" + types[iteration])
      }
    }
}

const shuffleDeck = () => {
  for(let i = 0; i < deck.length; i++) {
    let j = Math.floor(Math.random() * deck.length)
    let temp = deck[i]; 
    deck[i] = deck[j];
    deck[j] = temp
  }
}

const startGame = () => {
  hidden = deck.pop()
  dealerSum += getValue(hidden)
  dealerAceCount += checkAce(hidden)
  while (dealerSum < 17) {
    //image
    let cardImg = document.createElement("img")
    let card = deck.pop()
    cardImg.src = "./cards/" + card + ".png"
    dealerSum += getValue(card)
    dealerAceCount += checkAce(card)
    document.getElementById("dealer-cards").append(cardImg)
    }

    for(let iteration = 0; iteration < 2; iteration++) {
      let cardImg = document.createElement("img")
      let card = deck.pop()
      cardImg.src = "./cards/" + card + ".png"
      yourSum += getValue(card)
      yourAceCount += checkAce(card)
      document.getElementById("your-cards").append(cardImg)
    }

    document.getElementById("hit").addEventListener("click", hit)
    document.getElementById("stay").addEventListener("click", stay)
    document.getElementById("restart").addEventListener("click", restart)

}

const hit = () => {
  if(!canHit) {
    return
  }
  let cardImg = document.createElement("img")
      let card = deck.pop()
      cardImg.src = "./cards/" + card + ".png"
      yourSum += getValue(card)
      yourAceCount += checkAce(card)
      document.getElementById("your-cards").append(cardImg)

      if(reduceAce(yourSum, yourAceCount) > 21) {
        canHit = false
      }
}


const stay = () => {
  dealerSum = reduceAce(dealerSum, dealerAceCount)
  yourSum = reduceAce(yourSum, yourAceCount)

  canHit = false
  document.getElementById("hidden").src = "./cards/" + hidden + ".png"

  let message = ""
  if (yourSum > 21) {
    message = "You Lose!";
  }
  else if (dealerSum > 21) {
    message = "You win!";
  }
  else if (yourSum == dealerSum) {
    message = "Tie!";
  }   
  else if (yourSum > dealerSum) {
    message = "You Win!";
    }
  else if (yourSum < dealerSum) {
    message = "You Lose!";
}

document.getElementById("dealer-sum").innerText = dealerSum;
document.getElementById("your-sum").innerText = yourSum;
document.getElementById("results").innerText = message;
}


const getValue = (card) => {
  let data = card.split("-")
  let value = data[0]

  if(isNaN(value)) {
    if (value == "A") {
      return 11
    }
    return 10
  }
  return parseInt(value)
}

const checkAce = (card) => {
  if(card[0] == "A") {
    return 1;
  }
  return 0
}

const reduceAce = (playerSum, playerAceCount) => {
  while (playerSum > 21 && playerAceCount > 0) {
    playerSum -= 10
    playerAceCount -= 1
  }
  return playerSum
}

const restart = () => {

  // restart game variables
  dealerSum = 0
  yourSum = 0
  dealerAceCount = 0
  yourAceCount = 0 
  hidden = null
  canHit = true
  deck = []

  //clear the dealer and player sum
  document.getElementById("dealer-cards").innerHTML = ""
  document.getElementById("your-cards").innerHTML = ""
  document.getElementById("results").innerHTML = ""

  buildDeck()
  shuffleDeck()

  let image = document.createElement("img")
  image.setAttribute("id", "hidden")
  image.setAttribute("src", "./cards/BACK.png")
  document.querySelector("#dealer-cards").append(image)

  startGame()

}

/* REFERENCES
Article: https://www.thatsoftwaredude.com/content/6417/how-to-code-blackjack-using-javascript

W3School: https://www.w3schools.com/js/default.asp
Event listeners: https://www.w3schools.com/js/js_htmldom_eventlistener.asp
HTML DOM appendChild() method: https://www.w3schools.com/js/js_htmldom_methods.asp
JavaScript if...else statement: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
JavaScript while loop: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
JavaScript parseInt() function: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt
JavaScript split() method: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/parseInt

How to Shuffle: https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle

Logo made by Anthony Medina!
 */