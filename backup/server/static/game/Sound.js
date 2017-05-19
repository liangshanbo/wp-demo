

var Sound = function (baseUrl, audioArr) {
	this.baseUrl  = baseUrl;
	this.audioArr = audioArr;
	this.audios   = {};
};

Sound.prototype = {
	initSound: function () {
		var audioDiv = document.getElementById('audio');
		if (!audioDiv) {
			audioDiv    = document.createElement('div');
			audioDiv.id = 'audio';
			document.body.appendChild(audioDiv);
		}

		for (var i = 0; i < this.audioArr.length; i++) {
			var audio      = document.createElement('audio');
			audio.src      = this.baseUrl + 'res/' + this.audioArr[i] + '.mp3';
			audio.preload  = 'load';
			audio.loop     = false;
			audio.autoplay = false;
			audio.id       = this.audioArr[i];
			audioDiv.appendChild(audio);

			this.audios[this.audioArr[i]] = audio;
		}
	},

	playMusic: function (id) {
		var music = this.audios[id];
		if (music && music.paused) {
			music.play();
			music.loop = true;
		}
	},

	pauseMusic: function (id) {

		var music = this.audios[id] || {paused: true};
		if (music.paused) {
			return;
		}
		music.pause();
	},

	playEffect: function (id) {
		var effect = this.audios[id];
		if (effect && effect.paused) {
			effect.play();
		}
	}
};