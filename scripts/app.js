const timerBtn = document.getElementById('timer-btn');
const counter = document.getElementById('counter');
const gong = 'http://www.buddhadhammasangha.com/SecondLevelSite/ThirdLevelSite/AudioAndVideo/Audio/Audio_Library/wavFiles/gong-burmese.wav';
const sound = new Audio(gong);

timerBtn.addEventListener("click", function () {
	startTimer(1500, 300, counter);
});

let countdown;
let messaging = false;
function startTimer(workTime, playTime, display){
	clearInterval(countdown);

	let time = workTime;
	let timer = display;	
	let minutes, seconds;
	let working = true;
	countdown = setInterval(function () {
		minutes = parseInt(time / 60, 10);
		seconds = parseInt(time % 60, 10);

		minutes = minutes < 10 ? "0" + minutes : minutes;
		seconds = seconds < 10 ? "0" + seconds : seconds;
		
		if(time == 0) {
			if(working){
				timer.innerHTML = 'Time is up, take a 5 minute break';
				sound.play();
				messaging = true;

				setTimeout(function() {
					working = false;
					time = playTime;
				}, 2000);

				return;
			}else{
				timer.innerHTML = 'Break time is over!';
				sound.play();
				clearInterval(countdown);
				return;
			}
		}
		
		if(messaging){
			setTimeout(function() {
				messaging = false;
			}, 2000);
		}else{
			timer.innerHTML = `Time left: ${minutes}:${seconds}`;
			time--;
		}
	}, 1000);
}