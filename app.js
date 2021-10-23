const startBtn = document.querySelector(".start");
const timeList = document.querySelector("#time-list");
const timeElement = document.querySelector("#time");
const board = document.querySelector("#board");
const screens = document.querySelectorAll(".screen");
const colors = [
  "#00FF7F",
  "#FF1493",
  "#FF8C00",
  "#FAFAD2",
  "#FFFF00",
  "#4682B4",
  "#DAA520",
  "#FF00FF",
  "#F0F8FF",
  "#00FFFF",
];

let time = 0;
let score = 0;

startBtn.addEventListener("click", (event) => {
  event.preventDefault();
  screens[0].classList.add("up");
});

timeList.addEventListener("click", (event) => {
  if (event.target.classList.contains("time-btn")) {
    time = parseInt(event.target.getAttribute("data-time"));
    screens[1].classList.add("up");
    startGame();
  }
});

board.addEventListener("click", (event) => {
  if (event.target.classList.contains("circle")) {
    score++;
    event.target.remove();
    createRandomCircle();
  }
});

function startGame() {
  setInterval(decreaseTime, 1000);
  createRandomCircle();
  setTime(time);
}

function decreaseTime() {
  if (time === 0) {
    finishGame();
  } else {
    let current = --time;
    if (current < 10) {
      current = `0${current}`;
    }
    setTime(current);
  }
}

function setTime(value) {
  timeElement.innerHTML = `00:${value}`;
}

function finishGame() {
  timeElement.parentNode.remove();
  board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
  const circle = document.createElement("div");
  const size = getRandomNumber(10, 60);
  const { width, height } = board.getBoundingClientRect();
  const y = getRandomNumber(0, width - size);
  const x = getRandomNumber(0, height - size);
  circle.classList.add("circle");
  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.top = `${y}px`;
  circle.style.left = `${x}px`;
  circle.style.background = getRandomColorCircle();
  board.append(circle);
}

function getRandomColorCircle() {
  return colors[Math.floor(Math.random() * colors.length)];
}

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}
