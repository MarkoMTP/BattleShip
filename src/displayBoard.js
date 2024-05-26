import './styles/interface.css';

export default function displayBoard(board, divCont) {
  // Clear any previous board cells
  divCont.innerHTML = '';
  // Iterate through the board and create cell elements
  board.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    row.forEach((col, colIndex) => {
      const cell = document.createElement('div');

      if (col.hasShipPart) {
        cell.classList.add('cellHasShip');
      }
      if (col.hasBlock) {
        cell.classList.add('hasBlock');
      }

      // cell.addEventListener('click', () => {
      //   handleCellClick(board, rowIndex, colIndex, cell);
      // });
      cell.classList.add('cell');
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      rowDiv.appendChild(cell);
      divCont.appendChild(rowDiv);
    });
  });
}

export function displayBoardComp(board, divCont) {
  // Clear any previous board cells
  divCont.innerHTML = '';
  // Iterate through the board and create cell elements
  board.forEach((row, rowIndex) => {
    const rowDiv = document.createElement('div');
    row.forEach((col, colIndex) => {
      const cell = document.createElement('div');

      cell.classList.add('cell');
      cell.dataset.row = rowIndex;
      cell.dataset.col = colIndex;

      rowDiv.appendChild(cell);
      divCont.appendChild(rowDiv);
    });
  });
}
