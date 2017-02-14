var inquirer = require('inquirer');
var Hangman = require('./Hangman');

var hangmanGame;
//----------------program starts executing here--------------------

hangmanGame = new Hangman();

hangmanGame.displayHeader();

setTimeout(function () {
	inquirer.prompt([
		{
			type: "confirm",
			name: "play",
			default: true,
			message: "Would you like to play a game of hangman?"
		}
	]).then(function (data) {
		if (data.play) hangmanGame.startGame();
	});
}, .5 * 1000);