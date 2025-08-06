const scoreTxt = document.querySelector("#score-amount");
const playBtn = document.querySelector("#play-btn");
const playArea = document.querySelector("#playarea");
const root = document.querySelector(":root"); // to get css variables
const bubbleColors = [
  "hsla(280, 100%, 75%, 0.8)",
  "hsla(220, 100%, 75%, 0.8)",
  "hsla(170, 100%, 75%, 0.8)",
  "hsla(100, 100%, 75%, 0.8)",
  "hsla(30, 100%, 75%, 0.8)",
];

// adding the eventlistener for the button
playBtn.addEventListener("click", startGame);

// root.style.setProperty("--bubble-color", bubbleColors[0]);  <- setting different color

function startGame() {
  scoreTxt.textContent = "0"; // reset score
  playBtn.classList.toggle("hidden"); // hide button through class and styling
}

function spawnBubble() {
  const amountToSpawn = Math.floor(Math.random() * 100);
  amount++;
  console.log("Spawn bubble function called. Amount: " + amount);
}
