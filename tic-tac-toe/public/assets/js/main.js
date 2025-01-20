const X_CLASS = "x";
const O_CLASS = "o";

const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const cellElements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("game-board");
const winnerMessageElement = document.getElementById("winner-message");
const winnerMessageTextElement = document.querySelector(
  "[data-winner-message-text]"
);
const restartButton = document.querySelectorAll("#restartButton");

let oTurn;

// start the game
startTheGame();

// restart the game

restartButton.forEach((button) => {
  button.addEventListener("click", startTheGame);
});

// start the game function
function startTheGame() {
  oTurn = false;

  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(O_CLASS);

    cell.innerText = "";
    cell.removeEventListener("click", handleClick);
    cell.addEventListener("click", handleClick, { once: true });
  });

  setBoardHoverClass();
  winnerMessageElement.style.display = "none";
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = oTurn ? O_CLASS : X_CLASS;
  placeMark(cell, currentClass);
  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    setBoardHoverClass();
  }
}

function setBoardHoverClass() {
  board.classList.remove(X_CLASS);
  board.classList.remove(O_CLASS);

  if (oTurn) {
    board.classList.add(O_CLASS);
  } else {
    board.classList.add(X_CLASS);
  }
}

function endGame(status) {
  if (status) {
    winnerMessageTextElement.innerText = "Draw";
  } else {
    winnerMessageTextElement.innerText = `${oTurn ? "O's" : "X's"} Wins`;
  }

  winnerMessageElement.style.display = "block";
}

function isDraw() {
  const draw = [...cellElements].every((cell) => {
    return cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS);
  });

  return draw;
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
  cell.innerText = currentClass.toUpperCase();
}

function swapTurns() {
  oTurn = !oTurn;
}

function checkWin(currentClass) {
  const hasWon = WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });

  return hasWon;
}
