const scoreTxt = document.querySelector("#score-amount");
const playBtn = document.querySelector("#play-btn");
const playArea = document.querySelector("#playarea");

// adding the eventlistener for the button
playBtn.addEventListener("click", startGame);

function startGame() {
  scoreTxt.textContent = "0"; // reset score
  playBtn.classList.toggle("hidden"); // hide button through class and styling
}
