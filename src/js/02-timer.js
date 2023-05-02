import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const inputEl = document.getElementById('datetime-picker');
const startBtn = document.querySelector('[data-start]');
const daysEl = document.querySelector('.value[data-days]');
const hoursEl = document.querySelector('.value[data-hours]');
const minutesEl = document.querySelector('.value[data-minutes]');
const secondsEl = document.querySelector('.value[data-seconds]');

let selectedDate;
let timerId;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log('selected date:', selectedDates[0]);

    const isInPast = selectedDates[0] - Date.now() <= 0;
    if (isInPast) return alert('Please choose a date in the future');
    selectedDate = selectedDates[0];
    // if (timerId) return;
    startBtn.removeAttribute('disabled');
  },
};

window.addEventListener('DOMContentLoaded', onload);
startBtn.addEventListener('click', onStart);

function onload() {
  startBtn.setAttribute('disabled', '');
  flatpickr(inputEl, options);
}

// startBtn.setAttribute('disabled', '');
// flatpickr(inputEl, options);

function onStart() {
  // console.log(selectedDate);
  // const currentDate = Date.now();
  // const difference = targetDate - currentDate;
  // if (difference <= 0) return alert('Please choose a date in the future');

  // const values = convertMs(difference);
  // const values = convertMs(date);
  // console.log(values);
  startBtn.setAttribute('disabled', '');
  inputEl.setAttribute('disabled', '');
  timerId = setInterval(setValues, 1000, selectedDate);
}

function setValues(targetDate) {
  const difference = targetDate - Date.now();
  console.log('time left:', difference);
  if (difference <= 0) return clearInterval(timerId); // stop at the end of countdown

  const { days, hours, minutes, seconds } = convertMs(difference);

  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  // console.log(String(value).padStart(2, '0'));
  // console.log('aaa');
  // return value.lenth < 2 ? String(value).padStart('0') : value;
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
