const boardElement = document.getElementById("board");
const statusText = document.getElementById("status");
const xScoreText = document.getElementById("xScore");
const oScoreText = document.getElementById("oScore");

let board = Array(9).fill("");
let currentPlayer = "X";
let gameActive = true;
let mode = "player";
let xScore = 0;
let oScore = 0;

const winSound = new Audio("https://www.soundjay.com/buttons/sounds/button-3.mp3");
const clickSound = new Audio("https://www.soundjay.com/buttons/sounds/button-09.mp3");

const winningConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function createBoard() {
    boardElement.innerHTML = "";
    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleClick);
        boardElement.appendChild(cell);
    });
}

function handleClick(e) {
    const index = e.target.dataset.index;
    if (board[index] || !gameActive) return;

    clickSound.play();
    makeMove(index, currentPlayer);

    if (mode === "ai" && currentPlayer === "O" && gameActive) {
        setTimeout(aiMove, 500);
    }
}

function makeMove(index, player) {
    board[index] = player;
    document.querySelector(`[data-index='${index}']`).textContent = player;
    checkResult();
}

function checkResult() {
    for (let condition of winningConditions) {
        const [a,b,c] = condition;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            highlightWin(condition);
            statusText.textContent = `🎉 Player ${currentPlayer} Wins!`;
            updateScore(currentPlayer);
            winSound.play();
            gameActive = false;
            return;
        }
    }

    if (!board.includes("")) {
        statusText.textContent = "🤝 Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = `Player ${currentPlayer}'s Turn`;
}

function highlightWin(condition) {
    condition.forEach(i => {
        document.querySelector(`[data-index='${i}']`).classList.add("win");
    });
}

function updateScore(player) {
    if (player === "X") {
        xScore++;
        xScoreText.textContent = xScore;
    } else {
        oScore++;
        oScoreText.textContent = oScore;
    }
}

function aiMove() {
    let emptyIndexes = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(val => val !== null);

    let randomIndex = emptyIndexes[Math.floor(Math.random() * emptyIndexes.length)];
    makeMove(randomIndex, "O");
}

function restartGame() {
    board = Array(9).fill("");
    currentPlayer = "X";
    gameActive = true;
    statusText.textContent = "Player X's Turn";
    createBoard();
}

function setMode(selectedMode) {
    mode = selectedMode;
    restartGame();
}

function toggleTheme() {
    document.body.classList.toggle("dark");
}

createBoard();
