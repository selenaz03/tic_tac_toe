var player = "X";
var board = ["", "", "", "", "", "", "", "", ""];
var gameOver = false;

var boardCell = document.getElementById("board");

createBoard();

var resetButton = document.getElementById("reset");
resetButton.addEventListener("click", resetBoard);

boardCell.addEventListener("click", function(event) {
  // check if element clicked is a cell
  if (event.target.className === "cell") {
    var index = parseInt(event.target.getAttribute("data-index"));
    
    // check if cell is empty and game is not over
    if (board[index] === "" && !gameOver) {
      board[index] = player;
      event.target.textContent = player;

      checkWin();
      checkTie();

      player = (player === "X") ? "O" : "X";

      if (!gameOver) {
        document.getElementById("currStatus").innerHTML = "Player " + player + "'s turn";
      }
    }
  }
});

function createBoard() {
    var boardHTML = "";
    for (var i = 0; i < 9; i++) {
      boardHTML += '<button data-index="' + i.toString() + '" class="cell"></button>';
    }
    boardCell.innerHTML = boardHTML;
}

function checkWin() {
  if (board[0] === player && board[1] === player && board[2] === player ||
      board[3] === player && board[4] === player && board[5] === player ||
      board[6] === player && board[7] === player && board[8] === player ||
      board[0] === player && board[3] === player && board[6] === player ||
      board[1] === player && board[4] === player && board[7] === player ||
      board[2] === player && board[5] === player && board[8] === player ||
      board[0] === player && board[4] === player && board[8] === player || 
      board[2] === player && board[4] === player && board[6] === player) {
    document.getElementById("currStatus").innerHTML = "Player " + player + " wins!";
    gameOver = true;
  }
}
  
function checkTie() {
  if (board.indexOf("") === -1 && !gameOver) {
    document.getElementById("currStatus").innerHTML = "It's a tie!";
    gameOver = true;
  }
}

function resetBoard() {
  board = ["", "", "", "", "", "", "", "", ""];
  var cells = boardCell.getElementsByClassName("cell");
  for (var i = 0; i < cells.length; i++) {
    cells[i].textContent = "";
  }
  
  gameOver = false;
  document.getElementById("currStatus").innerHTML = "Player " + player + "'s turn";
}