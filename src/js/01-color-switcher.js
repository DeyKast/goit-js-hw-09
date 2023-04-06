function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}

const startButton = document.querySelector('button[data-start]');
const stopButton = document.querySelector('button[data-stop]');

let colorChangeTimer = null;

stopButton.disabled = true;

startButton.addEventListener('click', event => {
  colorChangeTimer = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
});

stopButton.addEventListener('click', event => {
  clearInterval(colorChangeTimer);

  startButton.disabled = false;
  stopButton.disabled = true;
});
