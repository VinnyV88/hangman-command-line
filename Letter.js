//controls whether or not a letter appears as a "_" or as itself on-screen.

function Letter(letter) {
  this.letter = letter;
  this.checkLetter = function (guessedLetters) {
    if (guessedLetters.indexOf(this.letter) >= 0) return this.letter;
    else return "_";
  }
}

module.exports = Letter;