// fetching all the DOM elements needed for the script
const scoreTxt = document.querySelector("#score-amount");
const playBtn = document.querySelector("#play-btn");
const playArea = document.querySelector("#playarea");
const playAreaWidth = playArea.offsetWidth;
const timer = document.querySelector("#timer");

const bubbleColors = [
  "hsla(280, 100%, 75%, 0.8)",
  "hsla(220, 100%, 75%, 0.8)",
  "hsla(170, 100%, 75%, 0.8)",
  "hsla(100, 100%, 75%, 0.8)",
  "hsla(30, 100%, 75%, 0.8)",
];
const gameDuration = 30000; // 30 seconds in milliseconds, needed for Date.now comparison later.
const bubbleInterval = 600; // time in ms
let startTime; // start time is set with Date.now when starting the mini-game
let timeLeft; // variable to store the time left, set during the startCountdown function
let playerScore = 0;
let bubblePool; // pool is created at the start of the game.

// adding the eventlistener for the button
playBtn.addEventListener("click", startGame);

function startGame() {
  bubblePool = generateBubbleData(20); // call on function to generate an array of objects of bubble data.
  playerScore = 0;
  scoreTxt.textContent = playerScore; // reset score
  playBtn.classList.toggle("hidden"); // hide button through class and styling
  startTime = Date.now();

  startCountdown();

  // gameloop - Using an interval to continuously call on createBubbles to create new bubble elements at a set interval until the time has ran out
  const interval = setInterval(() => {
    if (Date.now() - startTime > gameDuration) {
      clearInterval(interval);
      playBtn.classList.toggle("hidden"); // toggle play-button to reappear after the interval is complete.
      // select all the bubbles in the DOM and run forEach to remove each element
      document.querySelectorAll(".bubble").forEach((e) => e.remove());
      return;
    }
    createBubbles();
  }, bubbleInterval);
}

function createBubbles() {
  const spawnAmount = Math.floor(Math.random() * 4) + 1; // 1-4 bubbles
  for (let i = 0; i < spawnAmount; i++) {
    // Select a random bubble style from the bubblepool and send it to spawnBubble
    const selectedBubble =
      bubblePool[Math.floor(Math.random() * bubblePool.length)];
    spawnBubble(selectedBubble);
  }
}

function spawnBubble(bubbleData) {
  const bubbleElement = document.createElement("div");
  bubbleElement.classList.add("bubble");
  bubbleElement.style.backgroundColor = bubbleData.color;
  bubbleElement.style.transform = `scale(${bubbleData.scale})`;

  const drift = Math.floor(Math.random() * 200) - 100; // -100 to +100. Horizontal drift towards the top
  bubbleElement.style.setProperty("--drift", `${drift}px`);

  // Set up of spawnpoint to make sure the bubble doesn't drift off the screen
  const maxBubbleSize = 120; // base bubble size is 100x100, scale can push it to 120.
  const maxDrift = 100; // Max possible drift should be 100

  const buffer = maxBubbleSize + maxDrift;
  const leftEdge = buffer;
  const rightEdge = playAreaWidth - buffer;

  let spawnPoint = Math.random() * (rightEdge - leftEdge) + leftEdge;

  bubbleElement.style.left = `${spawnPoint}px`;
  bubbleElement.style.bottom = 0;

  // Click to destroy logic using EventListener
  bubbleElement.addEventListener("mousedown", () => {
    // mousedown to get an immediate response on click rather than click which is on mouseup.
    playerScore++;
    scoreTxt.textContent = playerScore; // update the score text in the UI
    bubbleElement.remove();
  });

  // Automatically remove the bubble if the floating up animation completes
  bubbleElement.addEventListener("animationend", () => bubbleElement.remove());

  playArea.append(bubbleElement);
}

function generateBubbleData(amount) {
  // Make an array of objects to store the bubble data based on the number coming in to the function
  // Objects keys - Color & Scale
  return Array.from({ length: amount }, () => ({
    color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
    scale: (0.8 + Math.random() * 0.4).toFixed(2), // set base scale to 0.8 and add up to 0.4 to the scale -> 0.8 - 1.2
  }));
}

function startCountdown() {
  timeLeft = gameDuration / 1000; // Make sure the timer is reset. gameDuration is in ms so convert to seconds first.
  updateTimerDisplay();

  // Every second, subtract 1 from timeLeft and update the display
  const timerInterval = setInterval(() => {
    timeLeft--;
    updateTimerDisplay();

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      updateTimerDisplay(); // one last update.
    }
  }, 1000);
}

function updateTimerDisplay() {
  timer.textContent = timeLeft;

  if (timeLeft <= 10) {
    timer.style.color = "red";
    timer.style.transform = "scale(1.25)";
  } else {
    timer.style.color = "";
    timer.style.transform = "scale(1)";
  }
}

// some help from LLM to iron out some bugs and finding the correct functions and methods to use.
