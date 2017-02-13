var inquirer = require('inquirer');
var chalk = require('chalk');
var clear = require('clear');
var figlet = require('figlet');
var Word = require('./Word');

var gameWord;

var hangman = {
	wins: 0,
	losses: 0,
	guesses: 8,
	userGuess: " ",
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

	startGame: function(){

		this.initial();
		gameWord.displayWord();
		this.guessPrompt();

	},

	displayHeader: function() {
		//clear the terminal
		process.stdout.write('\x1Bc');

		figlet('BREAKING BAD :  HANGMAN', function(err, data) {
				if (err) {
						console.log('Something went wrong...');
						console.dir(err);
						return;
				}
				console.log(chalk.bold.green(data));
		});
	},

	initial: function() {
		this.hit = false;
		this.miss = false;
		this.repeat = false;
		var randWord = this.chooseRandomWord();
		gameWord = new Word(randWord);
		gameWord.pushLetters();
	},

	guessPrompt: function() {
	
		inquirer.prompt([
			{type: "input",
				name: "letter",
				message: "What letter would you like to try?"}

		]).then(function(data){
			hangman.userGuess = data.letter.toLowerCase();
			if (hangman.validKey() && hangman.newLetter()) {
				gameWord.guessedLetters.push(data.letter);
				if (gameWord.checkWin()) {
					hangman.wins++;
					console.log("winner!!");
					return;
				} else {
					gameWord.displayWord();
					hangman.guessPrompt();
				}

			} else {
				console.log(chalk.bold.red(hangman.message));
				hangman.guessPrompt();
			}
			//check if letter is a hit or miss
			//if miss subtract 1 from hangman.guesses
			//if hangman.guess === 0 then loss++ and end game

		});
	},

		validKey: function() {
		if ((this.userGuess >= "a") && (this.userGuess <= "z")) {
			this.message = " ";
			this.invKey = false;
			return true;
		}
		else {
			this.message = "Invalid key pressed, try again!";
			this.invKey = true;
			return false;
		}
	},

	newLetter: function() {
		if (gameWord.guessedLetters.indexOf(this.userGuess) >= 0) {
			this.message = "You tried that letter already!";
			this.repeat = true;
			return false;
		}
		else {
			this.repeat = false;
			return true;
		}
	}
	
}; // close hangman object


//----------------program starts executing here--------------------

hangman.displayHeader();

setTimeout(function() {
inquirer.prompt([
	{type: "confirm",
		name: "play",
		default: true,
		message: "Would you like to play a game of hangman?"}
	]).then(function(data){
		if (data.play) hangman.startGame();
});
}, 1 * 1000);




