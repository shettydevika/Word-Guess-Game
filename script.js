document.addEventListener("DOMContentLoaded", () => {
    const words = ["javascript", "python", "coding", "developer", "frontend", "security", "structure", "algorithms", "allignments"];
    const maxAttempts = 7;
  
    let wordToGuess = "";
    let shuffledWord = "";
    let guessedWord = [];
    let attemptsLeft = maxAttempts;
    let guessedLetters = new Set();
  
    const shuffledWordElement = document.getElementById("shuffled-word");
    const wordElement = document.getElementById("word");
    const attemptsElement = document.getElementById("attempts");
    const messageElement = document.getElementById("message");
    const restartButton = document.getElementById("restart");
    const letterInput = document.getElementById("letter");
    const submitButton = document.getElementById("submit");
  
    // Shuffle the letters of the word
    function shuffleWord(word) {
      return word.split("").sort(() => Math.random() - 0.5).join("");
    }
  
    // Initialize the game
    function initializeGame() {
      wordToGuess = words[Math.floor(Math.random() * words.length)];
      shuffledWord = shuffleWord(wordToGuess);
      guessedWord = Array(wordToGuess.length).fill("_");
      attemptsLeft = maxAttempts;
      guessedLetters.clear();
  
      shuffledWordElement.textContent = `Shuffled Word: ${shuffledWord}`;
      wordElement.textContent = guessedWord.join(" ");
      attemptsElement.textContent = attemptsLeft;
      messageElement.textContent = "";
      letterInput.value = "";
      restartButton.classList.add("hidden");
      letterInput.disabled = false;
      submitButton.disabled = false;
    }
  
    function checkGameOver() {
      if (guessedWord.join("") === wordToGuess) {
        messageElement.innerHTML = "🎉 Correct! You guessed the word!";
        messageElement.classList.add("correct");
        restartButton.classList.remove("hidden");
      } else if (attemptsLeft === 0) {
        messageElement.innerHTML = `Game Over! The word was ${wordToGuess}.`;
        messageElement.classList.add("incorrect");
      }
    }
  
    submitButton.addEventListener("click", () => {
      const guess = letterInput.value.toLowerCase();
      letterInput.value = "";
  
      if (guess && !guessedLetters.has(guess)) {
        guessedLetters.add(guess);
  
        if (wordToGuess.includes(guess)) {
          for (let i = 0; i < wordToGuess.length; i++) {
            if (wordToGuess[i] === guess) guessedWord[i] = guess;
          }
        } else attemptsLeft--;
      }
  
      wordElement.textContent = guessedWord.join(" ");
      attemptsElement.textContent = attemptsLeft;
      checkGameOver();
    });
  
    restartButton.addEventListener("click", initializeGame);
  
    initializeGame();
  });
  
