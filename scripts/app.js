const startTimerBtn = document.getElementById('start-timer-btn');
const stopTimerBtn = document.getElementById('stop-timer-btn');
const counter = document.getElementById('counter');
const tomato = document.getElementById('tomato-text');
const gong = 'http://www.buddhadhammasangha.com/SecondLevelSite/ThirdLevelSite/AudioAndVideo/Audio/Audio_Library/wavFiles/gong-burmese.wav';
const sound = new Audio(gong);

startTimerBtn.addEventListener("click", function () {
	startTimer(1500, 300, counter);
	tomato.innerHTML = 'Keep working';
});

stopTimerBtn.addEventListener("click", function () {
	stopTimer(counter);
	tomato.innerHTML = '';
});

let countdown;
let messaging = false;
function startTimer(workTime, playTime, timer){
	clearInterval(countdown);

	let time = workTime;	
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
				tomato.innerHTML = 'Relax';
				sound.play();
				messaging = true;

				setTimeout(function() {
					working = false;
					time = playTime;
				}, 2000);

				return;
			}else{
				timer.innerHTML = 'Break time is over!';
				tomato.innerHTML = '';
				sound.play();

				setTimeout(function() {
					stopTimer(timer);
				}, 4000);

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

function stopTimer(timer){
	clearInterval(countdown);
	timer.innerHTML = '00:00';
}