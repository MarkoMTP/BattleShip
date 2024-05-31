import Gameboard from './gameboard';
import './styles/interface.css';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function displayBoard(game, divContP, divContC) {
  const playerGameBoard = game.player.gameboard;
  const computerGameBoard = game.computer.gameboard;
  // Clear any previous board cells
  divContP.innerHTML = '';
  // Iterate through the board and create cell elements
  playerGameBoard.board.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    row.forEach((col, colIndex) => {
      const cell = document.createElement('div');

      if (col.hasShipPart) {
        cell.classList.add('cellHasShip');
      }

      if (col.hasShipPart && col.wasHit === true) {
        cell.style.background = 'red';
      } else if (col.hasShipPart === false && col.wasHit) {
        cell.textContent = 'X';
      }

      cell.classList.add('cell');
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      rowDiv.appendChild(cell);
      divContP.appendChild(rowDiv);
    });
  });

  divContC.innerHTML = '';
  // Iterate through the board and create cell elements
  computerGameBoard.board.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    row.forEach((col, colIndex) => {
      const cell = document.createElement('div');

      if (col.hasShipPart && col.wasHit === true) {
        cell.style.background = 'red';
      } else if (col.hasShipPart === false && col.wasHit) {
        cell.textContent = 'X';
      }
      cell.classList.add('cell');
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      cell.addEventListener('click', () => {
        const a = getRandomInt(0, 9);
        const b = getRandomInt(0, 9);

        computerGameBoard.receiveAttack(cell.dataset.row, cell.dataset.col);
        playerGameBoard.receiveAttack(a, b);
        displayBoard(game, divContP, divContC);
      });
      rowDiv.appendChild(cell);
      divContC.appendChild(rowDiv);
    });
  });
}
