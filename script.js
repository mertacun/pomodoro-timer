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

function updateTimer() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  minutesDisplay.textContent = minutes < 10 ? '0' + minutes : minutes;
  secondsDisplay.textContent = seconds < 10 ? '0' + seconds : seconds;
}

function startTimer(duration) {
  totalSeconds = duration * 60;
  updateTimer();

  timerInterval = setInterval(() => {
    if (totalSeconds > 0 && !paused) {
      totalSeconds--;
      updateTimer();
    } else if (paused) {
      clearInterval(timerInterval);
    } else {
      clearInterval(timerInterval);
      alert('Time is up!');
    }
  }, 1000);
}

function activateTab(tab) {
  pomodoroTab.classList.remove('active');
  shortBreakTab.classList.remove('active');
  longBreakTab.classList.remove('active');
  tab.classList.add('active');
}

function resetTimer() {
  clearInterval(timerInterval);
  startButton.disabled = false;
  pauseButton.disabled = true;
  totalSeconds = 1500;
  updateTimer();
}

pomodoroTab.addEventListener('click', () => {
  activateTab(pomodoroTab);
  resetTimer();
});

shortBreakTab.addEventListener('click', () => {
  activateTab(shortBreakTab);
  resetTimer();
});

longBreakTab.addEventListener('click', () => {
  activateTab(longBreakTab);
  resetTimer();
});

startButton.addEventListener('click', () => {
  startButton.disabled = true;
  pauseButton.disabled = false;
  if (pomodoroTab.classList.contains('active')) {
    startTimer(25);
  } else if (shortBreakTab.classList.contains('active')) {
    startTimer(5);
  } else if (longBreakTab.classList.contains('active')) {
    startTimer(15);
  }
});

pauseButton.addEventListener('click', () => {
  paused = true;
  pauseButton.textContent = 'Continue';
  startButton.disabled = false;
  pauseButton.disabled = true;
});

resetButton.addEventListener('click', resetTimer);

updateTimer();