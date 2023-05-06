import flatpickr from 'flatpickr';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  inputEl: document.getElementById('datetime-picker'),
  startBtn: document.querySelector('[data-start]'),
  daysEl: document.querySelector('.value[data-days]'),
  hoursEl: document.querySelector('.value[data-hours]'),
  minutesEl: document.querySelector('.value[data-minutes]'),
  secondsEl: document.querySelector('.value[data-seconds]'),
};
const { inputEl, startBtn, daysEl, hoursEl, minutesEl, secondsEl } = refs;

let selectedDate;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log('selected date:', selectedDates[0]);
    OnCloseCallback(selectedDates);
  },
};

function OnCloseCallback(selectedDates) {
  const isInPast = selectedDates[0] - Date.now() <= 0;
  if (isInPast) {
    startBtn.setAttribute('disabled', '');
    return Notify.failure('Please choose a date in the future');
  }
  selectedDate = selectedDates[0];
  startBtn.removeAttribute('disabled');
}

window.addEventListener('DOMContentLoaded', onload);
startBtn.addEventListener('click', onStart);

function onload() {
  startBtn.setAttribute('disabled', '');
  flatpickr(inputEl, options);
}

function onStart() {
  const isInPast = selectedDate - Date.now() <= 0;
  if (isInPast) {
    startBtn.setAttribute('disabled', '');
    return Notify.failure('Please choose a date in the future');
  }

  startBtn.setAttribute('disabled', '');
  inputEl.setAttribute('disabled', '');
  timerId = setInterval(setValues, 1000, selectedDate);
}

function setValues(targetDate) {
  const difference = targetDate - Date.now();
  console.log('time left:', difference);

  if (difference <= 0) {
    inputEl.removeAttribute('disabled');
    return clearInterval(timerId);
  } // stop at the end of countdown
  const { days, hours, minutes, seconds } = convertMs(difference);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
