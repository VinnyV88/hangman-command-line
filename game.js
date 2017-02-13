var inquirer = require('inquirer');
var Word = require('./Word');

var newWord;

var hangman = {
	wins: 0,
	losses: 0,
	guesses: 8,
	userGuess: " ",
	hits: 0,
	hit: false,
	miss: false,
	repeat: false,
	invKey: false,
	winner: false,
	gameover: false,
	lettersGuessed: [],
	message: " ",
	instruct: " ",
	stsimg: " ",
	maskedString: " ",
	words: ["gustavo fring", "crystal meth",	"bryan cranston",	"chemistry teacher", "walter white",	
          "lydia", "albuquereque", "flynn",	"cancer",	"lawyer",	"hank",	"heisenberg",	"jesse pinkman",	
          "saul goodman",	"skyler",	"ricin", "tio salamanca",	"tuco salamanca",	"los pollos hermanos",	
          "mike ehrmantraut"],

  chooseRandomWord: function() {
    
  return this.words[Math.floor(Math.random() * this.words.length)];

  },

	initial: function() {
		var randWord = this.chooseRandomWord()
		newWord = new Word(randWord);
		newWord.pushLetters();
		this.hit = false
		this.miss = false
	}

} // close hangman object

inquirer.prompt([
  {type: "confirm",
    name: "play",
		default: true,
    message: "Would you like to play a game of hangman?"}
  ]).then(function(data){
	  if (data.play) startGame();
});

function startGame(){

	hangman.initial();

	newWord.displayWord();
	guessPrompt();

};

function guessPrompt() {
	
	inquirer.prompt([
	  {type: "input",
	    name: "letter",
	    message: "What letter would you like to try?"}

	]).then(function(data){
		//check if letter was guessed previously, if not:
		newWord.guessedLetters.push(data.letter);
		newWord.displayWord();
		if (newWord.checkWin()) {
			console.log("winner!!");
			return;
		} else {
			guessPrompt();
		}

	});
}