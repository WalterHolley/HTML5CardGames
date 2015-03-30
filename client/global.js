function card(suit, color, value){
  this.color = color;
  this.suit = suit;
  this.value = value;
  this.isFaceDown = true;
}





var suit = {heart: "H", club: "C", diamond: "D", spade: "S" }


var cardColor = {red: "R", black: "B"};

var cardFace = {
king:"K",
queen:"Q",
jack:"J",
ace:"A",
ten:"10",
nine:"9",
eight:"8",
seven:"7",
six:"6",
five:"5",
four:"4",
three:"3",
two:"2"
}

//Stack object for managing card decks
function cardStack(){
  this.cardData = [];
  this.add = push;
  this.draw = pop;
  this.top = 0;
}
