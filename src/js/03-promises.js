import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const result = {};

  formData.forEach((value, name) => (result[name] = Number(value)));
  console.log('fomdata:', result);
  const { delay, step, amount } = result;

  for (let position = 1; position <= amount; position += 1) {
    createPromise(position, delay, step).then(onResolve, onReject);
  }
}

function onResolve(text) {
  return Notify.success(text);
}

function onReject(text) {
  return Notify.failure(text);
}

function createPromise(position, delay, step) {
  const shouldResolve = Math.random() > 0.3;
  const time = delay + position * step - step;
  console.log(position, time);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        return resolve(`✅ Fulfilled promise ${position} in ${time}`);
      } else {
        return reject(`❌ Rejected promise ${position} in ${time}`);
      }
    }, time);
  });
}
