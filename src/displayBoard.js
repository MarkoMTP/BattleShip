import './styles/interface.css';

export default function displayBoard(board, divCont) {
  // Clear any previous board cells
  divCont.innerHTML = '';
  // Iterate through the board and create cell elements
  board.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    row.forEach((col, colIndex) => {
      const cell = document.createElement('div');

      if (col.hasShipPart) { // Corrected the condition to check cell's property
        cell.classList.add('cellHasShip');
      }
      cell.classList.add('cell');
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      rowDiv.appendChild(cell);
      divCont.appendChild(rowDiv);
    });
  });
}
