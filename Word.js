//contains all of the methods which will check the letters guessed versus the random word selected
var Letter = require('./Letter');

function Word(word){
	this.letters = [];
  this.word = word;
  this.guessedLetters = [];

  this.pushLetters = function() {

  for(var i=0; i < this.word.length; i++) {
    this.letters.push(new Letter(this.word[i]));
  };

};

  this.displayWord = function() {
    var maskedString = "";

    for(var i=0; i < this.letters.length; i++) {
      if (this.letters[i].letter === " ") {
        maskedString += "  "
      } else {
        maskedString += this.letters[i].checkLetter(this.guessedLetters) + " ";
      }
    };

      console.log(maskedString);

  };


  this.checkWin = function() {
    var hits = 0;

    for (var i = 0; i < this.word.length; i++) {
      var ltr = this.word[i];
      if (ltr === " ") hits++;
      else { 
        if (this.guessedLetters.indexOf(ltr) >= 0) {
          hits++;
        }
      }
    }
    if (hits === this.word.length) return true;
    else return false;
  }
};

module.exports = Word;