// Words for different categories
const wordsByCategory = {
  animals: ["elephant", "giraffe", "tiger", "penguin", "zebra"],
  countries: ["france", "canada", "japan", "brazil", "india"],
  fruits: ["apple", "banana", "orange", "kiwi", "grape"],
};

let chosenWord = "";
let guessedLetters = [];
let wrongGuesses = 0;

// Function to start the game
function startGame() {
  const categorySelect = document.getElementById("category");
  const selectedCategory = categorySelect.value;
  const words = wordsByCategory[selectedCategory];
  chosenWord = words[Math.floor(Math.random() * words.length)];

  // Hide category selection, show game
  const categorySelection = document.getElementById("category-selection");
  const gameContainer = document.getElementById("game");
  categorySelection.style.display = "none";
  gameContainer.style.display = "block";

  // Reset game state
  guessedLetters = [];
  wrongGuesses = 0;

  displayWord();
  displayLetterButtons();
  updateGameStatus();
}

// Display the current state of the word to guess
function displayWord() {
  const wordDisplay = document.getElementById("word-display");
  wordDisplay.innerHTML = chosenWord
    .split("")
    .map((letter) => (guessedLetters.includes(letter) ? letter : "_"))
    .join(" ");
}

// Display letter buttons for guessing
function displayLetterButtons() {
  const letterButtonsContainer = document.getElementById("letter-buttons");
  letterButtonsContainer.innerHTML = "";

  const alphabet = "abcdefghijklmnopqrstuvwxyz";
  for (let letter of alphabet) {
    const button = document.createElement("button");
    button.textContent = letter;
    button.addEventListener("click", () => handleGuess(letter));
    letterButtonsContainer.appendChild(button);
  }
}

// Handle a letter guess
function handleGuess(letter) {
  if (!guessedLetters.includes(letter)) {
    guessedLetters.push(letter);

    if (!chosenWord.includes(letter)) {
      wrongGuesses++;
      updateHangmanImage();
    }

    displayWord();
    updateGameStatus();

    // Check if the game is over
    if (isGameOver()) {
      showGameResult();
    }
  }
}

// Update the hangman image based on wrong guesses
function updateHangmanImage() {
  const hangmanImg = document.getElementById("hangman-img");
  hangmanImg.src = `images/hangman_${wrongGuesses}.png`;
}

// Update game status
function updateGameStatus() {
  const gameStatus = document.getElementById("game-status");
  gameStatus.textContent = `Wrong guesses: ${wrongGuesses}/6`;
}

// Check if the game is over
function isGameOver() {
  return wrongGuesses >= 6 || isGameWon();
}

// Check if the game is won
function isGameWon() {
  return chosenWord
    .split("")
    .every((letter) => guessedLetters.includes(letter));
}

// Display game result
function showGameResult() {
  const gameStatus = document.getElementById("game-status");
  if (isGameWon()) {
    gameStatus.textContent = "You won! 🎉";
  } else {
    gameStatus.textContent = `Game over! 😞 The word was: ${chosenWord}`;
  }

  // Disable letter buttons after game ends
  const letterButtons = document.querySelectorAll("#letter-buttons button");
  letterButtons.forEach((button) => (button.disabled = true));
}
