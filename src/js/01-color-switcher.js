const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');
const body = document.querySelector('body');

let intervalId;

startBtn.addEventListener('click', onStart);
stopBtn.addEventListener('click', onStop);

function onStart() {
  startBtn.setAttribute('disabled', '');
  intervalId = setInterval(setElementBgColor, 1000, body);
}

function setElementBgColor(el) {
  el.style.backgroundColor = getRandomHexColor();
}

function onStop() {
  clearInterval(intervalId);
  startBtn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
