var inquirer = require('inquirer');
var chalk = require('chalk');
var figlet = require('figlet');
var Word = require('./Word');

var gameWord;

function Hangman() {
	this.wins = 0;
	this.losses = 0;
	this.guesses = 8;
	this.userGuess = " ";
	this.repeat = false;
	this.invKey = false;
	this.message = " ";
	this.words = ["gustavo fring", "crystal meth",	"bryan cranston",	"chemistry teacher", "walter white",	
          "lydia", "albuquereque", "flynn",	"cancer",	"lawyer",	"hank",	"heisenberg",	"jesse pinkman",	
          "saul goodman",	"skyler",	"ricin", "tio salamanca",	"tuco salamanca",	"los pollos hermanos",	
          "mike ehrmantraut"];
	this.asciiArt = [
		" ═══╦══╦═╗\n    ║  ╚═╣\n         ║\n         ║\n         ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n         ║\n         ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n    |    ║\n         ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n   \\|    ║\n         ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n   \\|/   ║\n         ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n   \\|/   ║\n    |    ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n   \\|/   ║\n    |    ║\n   /     ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ø    ║\n   /|\\   ║\n    |    ║\n   / \\   ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓"
	];

  this.chooseRandomWord = function() {
    
  return this.words[Math.floor(Math.random() * this.words.length)];

  },

	this.startGame = function(){
		var _this = this;
		this.message = " ";
		this.initial();
		this.displayGameStatus(this);
		setTimeout(function() {
			_this.guessPrompt(_this);
		}, 1 * 1000);

	};

	this.displayHeader = function() {
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
	};

	this.initial = function() {
		this.repeat = false;
		this.invKey = false;
		this.guesses = 8;
		var randWord = this.chooseRandomWord();
		gameWord = new Word(randWord);
		gameWord.pushLetters();
	};

	this.guessPrompt = function(_this) {
	
		inquirer.prompt([
			{type: "input",
				name: "letter",
				message: "What letter would you like to try?"}

		]).then(function(data){
			_this.userGuess = data.letter.toLowerCase();
			if (_this.validKey() && _this.newLetter()) {
				gameWord.guessedLetters.push(data.letter);

				if (gameWord.letterIsMiss(data.letter)) {
					_this.guesses--;
					_this.message = "Miss!";
				} else {
					_this.message = "Hit!";
				}

				if (_this.guesses === 0) {
					_this.gameOver(false, _this);
					return;
				}

				if (gameWord.checkWin()) {
					_this.gameOver(true, _this);
					return;
				} 

				_this.displayGameStatus(_this);
				setTimeout(function() {
					_this.guessPrompt(_this);
				}, 1 * 1000);

			} else {
				console.log(chalk.bold.red(_this.message));
				setTimeout(function() {
					_this.guessPrompt(_this);
				}, 1 * 1000);
			}
		});
	};

		this.validKey = function() {
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
	};

	this.newLetter = function() {
		if (gameWord.guessedLetters.indexOf(this.userGuess) >= 0) {
			this.message = "You tried that letter already!";
			this.repeat = true;
			return false;
		}
		else {
			this.repeat = false;
			return true;
		}
	};

	this.displayGameStatus = function(_this) {
		this.displayHeader();
		setTimeout(function() {
			console.log(chalk.bold.magenta(_this.message));
			switch (_this.guesses) {
				case 7: console.log(chalk.bold.green(_this.asciiArt[0]));
				break;
				case 6: console.log(chalk.bold.green(_this.asciiArt[1]));
				break;
				case 5: console.log(chalk.bold.green(_this.asciiArt[2]));
				break;
				case 4: console.log(chalk.bold.yellow(_this.asciiArt[3]));
				break;
				case 3: console.log(chalk.bold.yellow(_this.asciiArt[4]));
				break;
				case 2: console.log(chalk.bold.yellow(_this.asciiArt[5]));
				break;
				case 1: console.log(chalk.bold.red(_this.asciiArt[6]));
				break;
				case 0: console.log(chalk.bold.red(_this.asciiArt[7]));
				break;
				default: console.log(" ");
			}
			console.log(chalk.bold.cyan("Guesses Remaining: " + _this.guesses));
			console.log(chalk.bold.cyan("Guessed Letters: " + gameWord.guessedLetters));
			console.log("");

			gameWord.displayWord();
			console.log("");
			}, .5 * 1000);

  };

	this.gameOver = function(winner, _this) {
		_this.message = "";

		this.displayGameStatus(this);

		setTimeout(function() {
			if (winner) {
				_this.wins++;
				figlet('CONGRATS, YOU WON!', function(err, data) {
						if (err) {
								console.log('Something went wrong...');
								console.dir(err);
								return;
						}
						console.log(chalk.bold.bgGreen(data));
				});

			} else {
				_this.losses++;
				figlet('GAME OVER, YOU LOST!', function(err, data) {
						if (err) {
								console.log('Something went wrong...');
								console.dir(err);
								return;
						}
						console.log(chalk.bold.bgRed(data));
				});
				
			}

		}, .5 * 1000);	
		
		setTimeout(function() {
			console.log("");
			console.log(chalk.bold.yellow("Wins: " + _this.wins));
			console.log(chalk.bold.yellow("Losses: " + _this.losses));		
			console.log("");	
		}, 1 * 1000);

		setTimeout(function() {
		inquirer.prompt([
			{type: "confirm",
				name: "playAgain",
				default: true,
				message: "Would you like to play another game of hangman?"}
			]).then(function(data){
				if (data.playAgain) _this.startGame();
			});
		}, 1.5 * 1000);


	} 
	
}; // end hangman object constructor

module.exports = Hangman;