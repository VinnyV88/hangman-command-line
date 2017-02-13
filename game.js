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
	repeat: false,
	invKey: false,
	message: " ",
	words: ["gustavo fring", "crystal meth",	"bryan cranston",	"chemistry teacher", "walter white",	
          "lydia", "albuquereque", "flynn",	"cancer",	"lawyer",	"hank",	"heisenberg",	"jesse pinkman",	
          "saul goodman",	"skyler",	"ricin", "tio salamanca",	"tuco salamanca",	"los pollos hermanos",	
          "mike ehrmantraut"],
	asciiArt: [
		" ═══╦══╦═╗\n    ║  ╚═╣\n         ║\n         ║\n         ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n         ║\n         ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n    |    ║\n         ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n   \\|    ║\n         ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n   \\|/   ║\n         ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n   \\|/   ║\n    |    ║\n         ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ô    ║\n   \\|/   ║\n    |    ║\n   /     ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓",
		" ═══╦══╦═╗\n    ║  ╚═╣\n    Ø    ║\n   \\|/   ║\n    |    ║\n   / \\   ║\n         ║\n         ║\n      ▓▓▓▓▓▓▓"
	],

  chooseRandomWord: function() {
    
  return this.words[Math.floor(Math.random() * this.words.length)];

  },

	startGame: function(){
		hangman.message = " ";
		this.initial();
		this.displayGameStatus();
		setTimeout(function() {
			hangman.guessPrompt();
		}, 1 * 1000);

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
		this.repeat = false;
		this.invKey = false;
		this.guesses = 8;
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

				if (gameWord.letterIsMiss(data.letter)) {
					hangman.guesses--;
					hangman.message = "Miss!";
				} else {
					hangman.message = "Hit!";
				}

				if (hangman.guesses === 0) {
					hangman.gameOver(false);
					return;
				}

				if (gameWord.checkWin()) {
					hangman.gameOver(true);
					return;
				} 

				hangman.displayGameStatus();
				setTimeout(function() {
					hangman.guessPrompt();
				}, 1 * 1000);

			} else {
				console.log(chalk.bold.red(hangman.message));
				setTimeout(function() {
					hangman.guessPrompt();
				}, 1 * 1000);
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
	},

	displayGameStatus: function() {
		this.displayHeader();
		setTimeout(function() {
			console.log(chalk.bold.magenta(hangman.message));
			switch (hangman.guesses) {
				case 7: console.log(chalk.bold.green(hangman.asciiArt[0]));
				break;
				case 6: console.log(chalk.bold.green(hangman.asciiArt[1]));
				break;
				case 5: console.log(chalk.bold.green(hangman.asciiArt[2]));
				break;
				case 4: console.log(chalk.bold.yellow(hangman.asciiArt[3]));
				break;
				case 3: console.log(chalk.bold.yellow(hangman.asciiArt[4]));
				break;
				case 2: console.log(chalk.bold.yellow(hangman.asciiArt[5]));
				break;
				case 1: console.log(chalk.bold.red(hangman.asciiArt[6]));
				break;
				case 0: console.log(chalk.bold.red(hangman.asciiArt[7]));
				break;
				default: console.log(" ");
			}
			console.log(chalk.bold.cyan("Guesses Remaining: " + hangman.guesses));
			console.log(chalk.bold.cyan("Guessed Letters: " + gameWord.guessedLetters));
			console.log("");

			gameWord.displayWord();
			console.log("");
			}, .5 * 1000);

  },

	gameOver: function(winner) {
		hangman.message = "";

		this.displayGameStatus();

		setTimeout(function() {
			if (winner) {
				hangman.wins++;
				figlet('CONGRATS, YOU WON!', function(err, data) {
						if (err) {
								console.log('Something went wrong...');
								console.dir(err);
								return;
						}
						console.log(chalk.bold.bgGreen(data));
				});

			} else {
				hangman.losses++;
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
			console.log(chalk.bold.yellow("Wins: " + hangman.wins));
			console.log(chalk.bold.yellow("Losses: " + hangman.losses));		
			console.log("");	
		}, 1 * 1000);

		setTimeout(function() {
		inquirer.prompt([
			{type: "confirm",
				name: "playAgain",
				default: true,
				message: "Would you like to play another game of hangman?"}
			]).then(function(data){
				if (data.playAgain) hangman.startGame();
			});
		}, 1.5 * 1000);


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
}, .5 * 1000);