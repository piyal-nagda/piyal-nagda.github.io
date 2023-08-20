const display = document.getElementById('display');
const startBtn = document.getElementById('start');
const stopBtn = document.getElementById('stop');
const resetBtn = document.getElementById('reset');
const timeList = document.getElementById('time-list');

let startTime = 0;
let interval;

function startTimer() {
    if (!interval) {
        if (startTime === 0) {
            startTime = Date.now();
        } else {
            startTime = Date.now() - (Date.now() - startTime);
        }
        interval = setInterval(updateDisplay, 10);
        startBtn.disabled = true;
        stopBtn.disabled = false;
    }
}


function stopTimer() {
    clearInterval(interval);
    interval = null;
    startBtn.disabled = false;
    stopBtn.disabled = true;
    saveTime();
}

function resetTimer() {
    clearInterval(interval);
    interval = null;
    startTime = 0;
    display.innerText = '00:00:00';
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

function updateDisplay() {
    const currentTime = Date.now() - startTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = (currentTime % 1000).toString().slice(0, 2);
    display.innerText = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}:${milliseconds}`;
}

function saveTime() {
    const timeEntry = document.createElement('li');
    timeEntry.innerText = display.innerText;
    timeList.prepend(timeEntry);
}


document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        startTimer();
    } else if (event.key === ' ') {
        stopTimer();
    } else if (event.key === '2') {
        resetTimer();
    }
});


startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);

const bgDefaultBtn = document.getElementById('bg-default');
const bgBlueBtn = document.getElementById('bg-blue');
const bgGreenBtn = document.getElementById('bg-green');

bgDefaultBtn.addEventListener('click', () => changeBackground('grey'));
bgBlueBtn.addEventListener('click', () => changeBackground('#89CFF0')); // Light Blue
bgGreenBtn.addEventListener('click', () => changeBackground('#90ee90')); // Light Green

function changeBackground(color) {
    document.body.style.backgroundColor = color;
}


changeBackground('light');
