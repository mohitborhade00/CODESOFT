let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;

function checkGuess() {
    const guessInput = document.getElementById("guessInput");
    const message = document.getElementById("message");
    const attemptsDisplay = document.getElementById("attempts");
    const restartBtn = document.getElementById("restartBtn");

    const userGuess = Number(guessInput.value);

    if (!userGuess) {
        message.textContent = "⚠ Please enter a valid number!";
        return;
    }

    attempts++;

    if (userGuess > randomNumber) {
        message.textContent = "📉 Too High! Try again.";
    } 
    else if (userGuess < randomNumber) {
        message.textContent = "📈 Too Low! Try again.";
    } 
    else {
        message.textContent = "🎉 Congratulations! You guessed it!";
        restartBtn.style.display = "inline-block";
    }

    attemptsDisplay.textContent = "Attempts: " + attempts;
    guessInput.value = "";
}

function restartGame() {
    randomNumber = Math.floor(Math.random() * 100) + 1;
    attempts = 0;

    document.getElementById("message").textContent = "";
    document.getElementById("attempts").textContent = "";
    document.getElementById("guessInput").value = "";
    document.getElementById("restartBtn").style.display = "none";
}
