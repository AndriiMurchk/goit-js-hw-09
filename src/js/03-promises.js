import Notiflix from 'notiflix';


const form = document.querySelector('.form');

form.addEventListener('submit', submitCreatePromises);


function submitCreatePromises(e) {

  e.preventDefault();
  
  let delay = e.currentTarget.elements.delay.value;
  const delayStepMsVal = e.currentTarget.elements.step.value;
  const amountVal = e.currentTarget.elements.amount.value;
  
  console.log(e.currentTarget.elements.delay.value);
  console.log(e.currentTarget.elements.step.value);
  console.log(e.currentTarget.elements.amount.value);


  for (let i = 1; i <= amountVal; i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${i} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${i} in ${delay}ms`
        );
      });
    delay += delayStepMsVal;
  }
}



function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}