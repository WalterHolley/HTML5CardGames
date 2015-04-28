

solGame = new Object();

solGame.init = initGame;
solGame.deal = dealCards;
solGame.update = update;
solGame.present = present;
solGame.table = new Object();
solGame.table.cardStacks = new Array(7);
solGame.table.cardSuitStacks = new Array(4);
solGame.table.deck = new deck();
solGame.table.discard = new deck();




function deck(){
  this.cards = new cardStack();
  this.drawCards = drawCards;
  this.buildDeck = buildDeck;
  this.init = initDeck;
  this.isDeckEmpty = true;
  this.shuffleDeck = shuffleDeck;

}


//Returns up to three cards from the top of the deck
function drawCards(){
  if(numberOfCards == 1){
    return this.cards.shift();
  }


}

//Builds a deck from the discard pile
function buildDeck(){



}


function update(){


}

//Randomizes the cards currently in the deck
function shuffleDeck(){
  var deckSize = this.cards.top;
  var shuffledDeck = new Array(deckSize);

  var i;

  for(i = deckSize - 1; i >= 0; i--){
    var cardId = Math.floor(Math.random() * i);
    console.log(cardId);
    shuffledDeck[i] = this.cards.cardData[cardId];
  }

  this.cards.cardData = shuffledDeck;
}

//Initializes the deck with a fresh set of cards
function initDeck(){
  //create card objects
  this.cards = new cardStack();

  var s;
  for(s in suit){

    var v;
    for(v in cardFace){
      var cardObject = new Card();
      cardObject.suit = suit[s];
      cardObject.value = cardFace[v];
      if(suit[s] == suit.heart || suit[s] == suit.diamond){
        cardObject.color = cardColor.red;
      }
      else{
        cardObject.color = cardColor.black;
      }

      this.cards.add(cardObject);
    }


  }
  this.shuffleDeck();

}

//Initializes game
function initGame(){
//intialize deck
this.table.deck.init();

//intialize table


//clear score(if/when score is implemented)

//deal cards



}
