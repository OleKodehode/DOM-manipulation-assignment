const scoreTxt = document.querySelector("#score-amount");
const playBtn = document.querySelector("#play-btn");
const playArea = document.querySelector("#playarea");
const playAreaWidth = playArea.offsetWidth;
const root = document.querySelector(":root"); // to get css variables
const bubbleColors = [
  "hsla(280, 100%, 75%, 0.8)",
  "hsla(220, 100%, 75%, 0.8)",
  "hsla(170, 100%, 75%, 0.8)",
  "hsla(100, 100%, 75%, 0.8)",
  "hsla(30, 100%, 75%, 0.8)",
];
const gameDuration = 30000; // 30 seconds in milliseconds
const bubbleInterval = 300; // time in ms
let startTime;
let playerScore = 0;
let bubblePool;

// adding the eventlistener for the button
playBtn.addEventListener("click", startGame);

console.log(playAreaWidth);

// root.style.setProperty("--bubble-color", bubbleColors[0]);  <- setting different color

function startGame() {
  bubblePool = generateBubbleData(20); // call on function to generate an array of objects of bubble data.
  playerScore = 0;
  scoreTxt.textContent = playerScore; // reset score
  playBtn.classList.toggle("hidden"); // hide button through class and styling
  startTime = Date.now();

  const interval = setInterval(() => {
    if (Date.now() - startTime > gameDuration) {
      clearInterval(interval);
      playBtn.classList.toggle("hidden"); // toggle play-button to reappear after the interval is complete.
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
  bubbleElement.addEventListener("click", () => {
    playerScore++;
    scoreTxt.textContent = playerScore; // update the score text in the UI
    bubbleElement.classList.add("destroyed"); // class to trigger animation
    setTimeout(() => bubbleElement.remove(), 300); // timer to destroy the bubble
  });

  // Automatically remove the bubble if the floating up animation completes
  bubbleElement.addEventListener("animationend", () => bubbleElement.remove());

  playArea.append(bubbleElement);
}

function generateBubbleData(count) {
  // Make an array of objects to store the bubble data based on the number coming in to the function
  // Objects keys - Color & Scale
  return Array.from({ length: count }, () => ({
    color: bubbleColors[Math.floor(Math.random() * bubbleColors.length)],
    scale: (0.8 + Math.random() * 0.4).toFixed(2), // set base scale to 0.8 and add up to 0.4 to the scale -> 0.8 - 1.2
  }));
}
