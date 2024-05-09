const minutesDisplay = document.getElementById('minutes');
const secondsDisplay = document.getElementById('seconds');
const pomodoroTab = document.getElementById('pomodoro-tab');
const shortBreakTab = document.getElementById('short-break-tab');
const longBreakTab = document.getElementById('long-break-tab');
const startButton = document.getElementById('start');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

let totalSeconds = 1500;
let timerInterval;
let paused = false;
let selectedTab = 'pomodoro';
let remainingTime;

function updateTimer() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
  secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function updateStartButtonLabel(resume = false) {
  startButton.textContent = resume ? 'Resume' : 'Start';
}

function startTimer(duration) {
  totalSeconds = duration * 60;
  if (remainingTime) {
    totalSeconds = remainingTime;
    remainingTime = null;
  }
  updateTimer();
  updateStartButtonLabel(true);

  timerInterval = setInterval(() => {
    if (totalSeconds > 0 && !paused) {
      totalSeconds--;
      updateTimer();
    } else if (paused) {
      clearInterval(timerInterval);
    } else {
      clearInterval(timerInterval);
      alert('Time is up!');
      updateStartButtonLabel();
    }
  }, 1000);
}

function pauseTimer() {
  paused = true;
  updateStartButtonLabel(true);
  startButton.disabled = false;
  pauseButton.disabled = true;
  remainingTime = totalSeconds;
}

function activateTab(tab) {
  pomodoroTab.disabled = false;
  shortBreakTab.disabled = false;
  longBreakTab.disabled = false;
  tab.disabled = true;
}

function resetTimer() {
  clearInterval(timerInterval);
  updateStartButtonLabel(); 
  startButton.disabled = false;
  pauseButton.disabled = true;
  paused = false;

  if (selectedTab === 'pomodoro') {
    totalSeconds = 1500;
  } else if (selectedTab === 'shortBreak') {
    totalSeconds = 300;
  } else if (selectedTab === 'longBreak') {
    totalSeconds = 900;
  }
  remainingTime = null;
  updateTimer();
}

pomodoroTab.addEventListener('click', () => {
  selectedTab = 'pomodoro';
  activateTab(pomodoroTab);
  resetTimer();
});

shortBreakTab.addEventListener('click', () => {
  selectedTab = 'shortBreak';
  activateTab(shortBreakTab);
  resetTimer();
});

longBreakTab.addEventListener('click', () => {
  selectedTab = 'longBreak';
  activateTab(longBreakTab);
  resetTimer();
});

pauseButton.addEventListener('click', pauseTimer);

startButton.addEventListener('click', () => {
  if (startButton.textContent === 'Start') {
    startButton.disabled = true;
    pauseButton.disabled = false;
    paused = false;
    let duration;
    if (selectedTab === 'pomodoro') {
      duration = 25;
    } else if (selectedTab === 'shortBreak') {
      duration = 5;
    } else if (selectedTab === 'longBreak') {
      duration = 15;
    }
    startTimer(duration);
  } else if (startButton.textContent === 'Resume') {
    startButton.disabled = true;
    pauseButton.disabled = false;
    paused = false;
    startTimer(totalSeconds / 60);
  }
});

resetButton.addEventListener('click', resetTimer);

updateTimer();

const musicIcon = document.getElementById('music-icon');
const audio = document.getElementById('audio');

musicIcon.addEventListener('click', function() {
  if (audio.paused || audio.ended) {
    audio.play();
    musicIcon.classList.remove('fa-circle-play');
    musicIcon.classList.add('fa-circle-pause');
  } else {
    audio.pause();
    musicIcon.classList.remove('fa-circle-pause');
    musicIcon.classList.add('fa-circle-play');
  }
});
