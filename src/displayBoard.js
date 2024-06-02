import displayGame from './interface';
import randomGame from './randomGame';
import './styles/interface.css';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

const updateStatus = (playerGameBoard, status, computerGameBoard, isPlayerTurn) => {
  if (playerGameBoard.isAllSunk()) {
    status.textContent = 'Computer Wins';
    setTimeout(() => {
      displayGame(randomGame());
    }, 2000);
  } else if (computerGameBoard.isAllSunk()) {
    status.textContent = 'Player Wins';
    setTimeout(() => {
      displayGame(randomGame());
    }, 2000);
  } else {
    status.textContent = isPlayerTurn ? 'Player\'s Turn' : 'Computer\'s Turn';
  }
};

const clearBoard = (div) => {
  while (div.firstChild) {
    div.removeChild(div.firstChild);
  }
};
const renderBoard = (gameBoard, container, isPlayer, handleCellClick) => {
  gameBoard.board.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    row.forEach((col, colIndex) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (col.hasShipPart && col.wasHit) {
        cell.style.background = 'red';
      } else if (!col.hasShipPart && col.wasHit) {
        cell.textContent = 'X';
      } else if (col.hasShipPart && isPlayer) {
        cell.classList.add('cellHasShip');
      }

      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      if (!isPlayer) {
        cell.addEventListener('click', () => handleCellClick(rowIndex, colIndex));
      }

      rowDiv.appendChild(cell);
    });

    container.appendChild(rowDiv);
  });
};

export default function displayBoard(game, divContP, divContC, status) {
  const playerGameBoard = game.player.gameboard;
  const computerGameBoard = game.computer.gameboard;
  let isPlayerTurn = true;
  const handleCellClick = (row, col) => {
    if (!isPlayerTurn) return;

    computerGameBoard.receiveAttack(row, col);
    displayBoard(game, divContP, divContC, status);

    isPlayerTurn = false;
    updateStatus(playerGameBoard, status, computerGameBoard, isPlayerTurn);

    setTimeout(() => {
      const a = getRandomInt(0, 9);
      const b = getRandomInt(0, 9);
      playerGameBoard.receiveAttack(a, b);
      isPlayerTurn = true;
      updateStatus(playerGameBoard, status, computerGameBoard, isPlayerTurn);
      displayBoard(game, divContP, divContC, status);
    }, 1000);
  };

  clearBoard(divContP);
  clearBoard(divContC);

  renderBoard(playerGameBoard, divContP, true, handleCellClick);
  renderBoard(computerGameBoard, divContC, false, handleCellClick);

  updateStatus(playerGameBoard, status, computerGameBoard, isPlayerTurn);
}
