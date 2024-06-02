import './styles/shipPlacement.css';

export default function renderBoardPlacement(game, container1, container2) {
  const playerBoard = game.playerG.gameboard;
  const hangarShip = game.shipHangar;

  container1.innerHTML = '';
  container2.innerHTML = '';

  playerBoard.board.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    rowDiv.classList.add('row');

    row.forEach((col, colIndex) => {
      const cell = document.createElement('div');
      cell.classList.add('cell');

      if (col.hasShipPart) {
        cell.classList.add('cellHasShip');
      }

      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      rowDiv.appendChild(cell);
    });

    container1.appendChild(rowDiv);
  });

  hangarShip.ships.forEach((ship) => {
    const entireShip = document.createElement('div');
    entireShip.classList.add('ship-container');

    entireShip.draggable = true;

    ship.shipParts.forEach((part) => {
      const partCell = document.createElement('div');
      partCell.classList.add('cell');

      partCell.classList.add('cellHasShip');

      partCell.dataset.row = part.row;
      partCell.dataset.col = part.col;
      entireShip.appendChild(partCell);
    });

    container2.appendChild(entireShip);
  });
}
