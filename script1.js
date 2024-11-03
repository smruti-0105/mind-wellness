const timer = document.getElementById('time');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

let interval;
let isPaused = false;
let remainingTime = 0;
let futureTime = 0;

function getTimeInput() {
    const hr = parseInt(document.getElementById('hours').value) || 0;
    const min = parseInt(document.getElementById('minutes').value) || 0;
    const sec = parseInt(document.getElementById('seconds').value) || 0;
    return hr * 3600000 + min * 60000 + sec * 1000;
}

function startTimer() {
    const setTime = getTimeInput();
    if (setTime <= 0) {
        alert("Please enter a valid time.");
        return;
    }
    const startTime = Date.now();
    futureTime = startTime + setTime;
    remainingTime = setTime;
    interval = setInterval(countDownTimer, 1000);
    countDownTimer();
}

function countDownTimer() {
    const currentTime = Date.now();
    remainingTime = futureTime - currentTime;

    const hrs = Math.floor((remainingTime / (1000 * 60 * 60)) % 24);
    const mins = Math.floor((remainingTime / (1000 * 60)) % 60);
    const secs = Math.floor((remainingTime / 1000) % 60);

    timer.innerHTML = `
        <div>${hrs < 10 ? '0' + hrs : hrs}</div>
        <div class="colon">:</div>
        <div>${mins < 10 ? '0' + mins : mins}</div>
        <div class="colon">:</div>
        <div>${secs < 10 ? '0' + secs : secs}</div>
    `;

    if (remainingTime <= 0) {
        clearInterval(interval);
        timer.innerHTML = `
            <div>00</div>
            <div class="colon">:</div>
            <div>00</div>
            <div class="colon">:</div>
            <div>00</div>
        `;
    }
}

pauseButton.addEventListener('click', () => {
    if (isPaused) {
        futureTime = Date.now() + remainingTime;
        interval = setInterval(countDownTimer, 1000);
        countDownTimer();
        pauseButton.textContent = 'Pause';
        isPaused = false;
    } else {
        clearInterval(interval);
        remainingTime = futureTime - Date.now();
        pauseButton.textContent = 'Resume';
        isPaused = true;
    }
});

resetButton.addEventListener('click', () => {
    clearInterval(interval);
    isPaused = false;
    pauseButton.textContent = 'Pause';
    timer.innerHTML = `
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
        <div class="colon">:</div>
        <div>00</div>
    `;
});

startButton.addEventListener('click', () => {
    clearInterval(interval);
    isPaused = false;
    pauseButton.textContent = 'Pause';
    startTimer();
});
