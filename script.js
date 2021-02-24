const settingsBtn = document.getElementById("settingsBtn");
const word = document.getElementById("word");
const settings = document.getElementById("settings");
const difficultySelect = document.getElementById("difficulty");
const text = document.getElementById("text");
const timeEl = document.getElementById("time");
const scoreEl = document.getElementById("score");
const endgameEl = document.getElementById("endGameContainer");
const settingsForm = document.getElementById("settingsForm");
const cog = document.querySelector(".fas");

// Fetch random word for game
async function getRandomWord() {
  const res = await fetch("https://random-words-api.vercel.app/word");
  const data = await res.json();
  const fetchedWord = data[0].word;

  return fetchedWord;
}

// Init word
let randomWord;

// Init score
let score = 0;

// Init time
let time = 10;

// Set difficulty
let difficulty =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "normal";

// Set difficulty select value
difficultySelect.value =
  localStorage.getItem("difficulty") !== null
    ? localStorage.getItem("difficulty")
    : "normal";

// Focus on text on star
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Add word to DOM
async function addWordToDOM() {
  randomWord = await getRandomWord();
  word.innerHTML = randomWord;
}

// UpdateScore
function updateScore() {
  score += 500;
  scoreEl.innerHTML = score;
}

// Update time
function updateTime() {
  time--;
  timeEl.innerHTML = `${time}s`;

  if (time === 0) {
    clearInterval(timeInterval);
    // end game
    gameOver();
  }
}

// Game over, show end scree
function gameOver() {
  endgameEl.innerHTML = `
        <h1>Time ran out</h1>
        <p>Your final score is ${score}</p>
        <button onclick="location.reload()">Reload</button>
    `;

  endgameEl.style.display = "flex";
}

addWordToDOM();

// Event listeners
text.addEventListener("input", (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    setTimeout(updateScore, 500);

    // Clear
    setTimeout(() => {
      e.target.value = "";
    }, 500);

    if (difficulty === "Hard") {
      time += 3;
    } else if ((difficulty = "Normal")) {
      time += 4;
    } else {
      time += 5;
    }

    updateTime();
  }
});

// Settings button
settingsBtn.addEventListener("click", () => {
  settings.classList.toggle("hide");

  cog.classList.add("click");
  setTimeout(() => {
    cog.classList.remove("click");
  }, 600);
});

// Difficulty select
settingsForm.addEventListener("change", (e) => {
  difficulty = e.target.value;
  localStorage.setItem("difficulty", difficulty);
  document.location.reload(true);
});
