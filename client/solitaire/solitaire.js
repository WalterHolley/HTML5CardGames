

Game = new Object();

Game.init = initGame;
Game.table = new Object();
Game.table.cardStacks = new Array(7);
Game.table.cardSuitStacks = new Array(4);
Game.table.deck = new deck();
Game.table.discard = new deck();



function deck(){
  this.cards = new cardStack();
  this.drawCards = drawCards;
  this.buildDeck = buildDeck;
  this.init = initDeck;
  this.isDeckEmpty = false;

}


//Returns up to three cards from the top of the deck
function drawCards(){
  if(numberOfCards == 1){
    return this.cards.shift();
  }
  else{
    var

  }
  this.cards
}

//Builds a deck from the discard pile
function buildDeck(){



}

//Initializes the deck with a fresh set of cards
function initDeck(){
  //create card objects
  var s;
  for(s in suit){
    var cardSu 
    if(s == suit.heart || s == suit.diamond){
      cardObject.color
    }


  }


}

//Initializes game
function initGame(){



}
