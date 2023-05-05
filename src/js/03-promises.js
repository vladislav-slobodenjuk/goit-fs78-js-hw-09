import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);

function onSubmit(e) {
  e.preventDefault();

  const result = {};
  const formData = new FormData(e.target);
  formData.forEach((value, name) => (result[name] = Number(value)));
  console.log('fomdata:', result);
  const { delay, step, amount } = result;

  for (let position = 1; position <= amount; position += 1) {
    const currentDelay = delay + (position * step - step);
    createPromise(position, currentDelay).then(onResolve).catch(onCatch);
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  console.log(`position: ${position} delay: ${delay}`);

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        return resolve({ position, delay });
      } else {
        return reject({ position, delay });
      }
    }, delay);
  });
}

function onResolve({ position, delay }) {
  return Notify.success(`✅ Fulfilled promise ${position} in ${delay}`, opt);
}

function onCatch({ position, delay }) {
  return Notify.failure(`❌ Rejected promise ${position} in ${delay}`, opt);
}

const opt = {
  timeout: 5000,
  fontSize: '14px',
  cssAnimationDuration: 500,
  cssAnimationStyle: 'zoom',
  // closeButton: true,
};
