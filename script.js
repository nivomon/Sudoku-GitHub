
let fullBoard = [];

function generateEmptyBoard() {
  return Array.from({ length: 9 }, () => Array(9).fill(0));
}

function isSafe(board, row, col, num) {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
}

function solveSudoku(board) {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (board[row][col] === 0) {
        for (let num = 1; num <= 9; num++) {
          if (isSafe(board, row, col, num)) {
            board[row][col] = num;
            if (solveSudoku(board)) return true;
            board[row][col] = 0;
          }
        }
        return false;
      }
    }
  }
  return true;
}

function removeCells(board, count = 45) {
  const puzzle = board.map(row => row.slice());
  while (count > 0) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    if (puzzle[row][col] !== 0) {
      puzzle[row][col] = 0;
      count--;
    }
  }
  return puzzle;
}

function generatePuzzle() {
  const board = generateEmptyBoard();
  solveSudoku(board);
  fullBoard = board.map(r => r.slice());
  const puzzle = removeCells(board, 45);

  const boardDiv = document.getElementById('sudoku-board');
  boardDiv.innerHTML = '';

  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      const cell = document.createElement('input');
      cell.type = 'number';
      cell.min = 1;
      cell.max = 9;
      cell.dataset.row = row;
      cell.dataset.col = col;
      if (puzzle[row][col] !== 0) {
        cell.value = puzzle[row][col];
        cell.disabled = true;
      }
      boardDiv.appendChild(cell);
    }
  }

  document.getElementById('message').innerText = '';
}

function checkPuzzle() {
  const inputs = document.querySelectorAll('#sudoku-board input');
  let correct = true;

  inputs.forEach(input => {
    const row = input.dataset.row;
    const col = input.dataset.col;
    const val = parseInt(input.value);

    if (val !== fullBoard[row][col]) {
      correct = false;
      input.style.color = 'red';
    } else {
      input.style.color = 'black';
    }
  });

  document.getElementById('message').innerText = correct ? "✅ Correct!" : "❌ Incorrect entries.";
}

window.onload = generatePuzzle;
