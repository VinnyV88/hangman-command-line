var wordObj = {};

	var hangman = {
		wins: 0,
		losses: 0,
		guesses: 8,
		userGuess: " ",
		hits: 0,
		hitSounds: ["hit_goddamnright.mp3", "hit_teartomyeye.mp3", "hit_tioding.mp3"],
		missSounds: ["miss_bupkiss.mp3", "miss_getyourshittogether.mp3", "miss_gooseegg.mp3", "miss_jesuschrist.mp3", "miss_nodice.mp3", "miss_tiodingding.mp3"],
		losePic: ["gus_dead.gif", "dead01.jpg", "end.jpg", "felina.png", "breakingbad_dead.jpg", "knocks.jpg", "tio_ding.jpg"],
		loseSound: ["better_call_saul.mp3", "fringlittlerata.mp3", "gus_is_dead.mp3", "iamthedanger.mp3", "knocks.mp3"],
		playSound: " ",
		playAll: true,
		muteEffects: false,
		muteAll: false,
		mute: "",
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
		word: " ",
		statusHTML: " ",
		status_imgHTML: " ",
		wordsHTML: " ",
		hangmanHTML: " ",
		maskedString: " ",
		owords:[gustavo = {oword: "gustavo fring", wpic: "gus_kingpin.png", wsound: "fringkillfamily.mp3"},
			    meth = {oword: "crystal meth", wpic: "yeah_bitch.gif", wsound: "yeahscience.mp3"},
			    cranston = {oword: "bryan cranston", wpic: "Bryan_Cranston.jpg", wsound: "empirebiz.mp3"},
			    teacher = {oword: "chemistry teacher", wpic: "yeah_bitch.gif", wsound: "yeahscience.mp3"},
			    walter = {oword: "walter white", wpic: "walter_white.jpg", wsound: "iamthedanger.mp3"},
			    lydia = {oword: "lydia", wpic: "Iwin.jpg", wsound: "Iwon.mp3"},
			    albuquereque = {oword: "albuquereque", wpic: "Iwin.jpg", wsound: "Iwon.mp3"},
			    flynn = {oword: "flynn", wpic: "Iwin.jpg", wsound: "Iwon.mp3"},
			    cancer = {oword: "cancer", wpic: "cancer.jpg", wsound: "notindanger.mp3"},
			    lawyer = {oword: "lawyer", wpic: "lawyer.jpg", wsound: "bettercallsaullaugh.mp3"},
			    hank = {oword: "hank", wpic: "hank.jpg", wsound: "treadlightly.mp3"},
			    heisenberg = {oword: "heisenberg", wpic: "heisenberg.jpg", wsound: "heisenberg.mp3"},
			    pinkman = {oword: "jesse pinkman", wpic: "yeah_bitch.gif", wsound: "yeahmagents.mp3"},
			    saul = {oword: "saul goodman", wpic: "saul.jpg", wsound: "nodealnodice.mp3"},
			    skyler = {oword: "skyler", wpic: "skyler_cash.jpg", wsound: "dirtysaul.mp3"},
			    ricin = {oword: "ricin", wpic: "ricin.png", wsound: "noIknock.mp3"},
			    tio = {oword: "tio salamanca", wpic: "tio.jpg", wsound: "ding.mp3"},
			    tuco = {oword: "tuco salamanca", wpic: "tuco_tight.gif", wsound: "tucotight.mp3"},
			    pollos = {oword: "los pollos hermanos", wpic: "lospollos.gif", wsound: "gus_is_dead.mp3"},
			    mike = {oword: "mike ehrmantraut", wpic: "mike.jpg", wsound: "mike.mp3"}
				],
		//look into using an array of word objects instead of just words. a word object can have it's own personalized win/loss images and sounds
		// words: ["gustavo", "fring", "lydia", "albuquereque", "tuco", "flynn", "chemistry", "teacher", 
		// 		"cancer", "crystal", "lawyer", "hank", "heisenberg", "walter", "white", "meth",
		// 		"cranston", "pinkman", "saul", "goodman", "skyler", "ehrmantraut", "ricin", "salamanca"],

		initial: function() {
			this.chooseRandomWord()
			this.formatWord()
			this.message = "Welcome to Hangman: Breaking Bad Edition!"
			this.instruct = "Press any letter to start..."
			this.hit = false
			this.miss = false
		},

		chooseRandomWord: function() {
			 
			wordObj = this.owords[Math.floor(Math.random() * this.owords.length)]

			this.word = wordObj.oword
	
		},//close function chooseRandomWord