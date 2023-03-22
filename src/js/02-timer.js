import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { Report } from 'notiflix/build/notiflix-report-aio';
import { Loading } from 'notiflix/build/notiflix-loading-aio';

const startButton = document.querySelector('button[data-start]');
startButton.disabled = true;

let currentDate = new Date();
let timer = null;
let timerId = null;

const timerView = document.querySelector('.timer');
const inputDate = document.querySelector('#datetime-picker');
const daysOut = document.querySelector('span[data-days]');
const hoursOut = document.querySelector('span[data-hours]');
const minsOut = document.querySelector('span[data-minutes]');
const secsOut = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= currentDate) {
      Report.failure('Please choose a date in the future', '');
    } else {
      targetDate = selectedDates[0];
      startButton.disabled = false;
    }
  },
};

flatpickr(inputDate, options);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  if (targetDate <= currentDate) {
    clearInterval(timer);
    Loading.remove();

    Notify.success('Timer finished');
    startButton.removeEventListener;
    return;
  }

  const days = Math.floor(ms / day);

  const hours = Math.floor((ms % day) / hour);

  const minutes = Math.floor(((ms % day) % hour) / minute);

  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  daysOut.textContent = addLeadingZero(days);
  hoursOut.textContent = addLeadingZero(hours);
  minsOut.textContent = addLeadingZero(minutes);
  secsOut.textContent = addLeadingZero(seconds);

  Loading.hourglass(`Timer's in progress`);
  Loading.change(
    `${addLeadingZero(days)} days  ${addLeadingZero(hours)}:${addLeadingZero(
      minutes
    )}:${addLeadingZero(seconds)}`
  );

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

startButton.addEventListener('click', event => {
  Notify.info(`Timer started`);
  timer = setInterval(() => {
    currentDate = new Date();
    convertMs(targetDate - currentDate);
    startButton.disabled = true;
  }, 1000);
});
