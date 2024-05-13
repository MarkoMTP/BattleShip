import Ship from './ship';

export default function Gameboard(board = []) {
  // Step 1: Create the Board
  for (let row = 0; row < 10; row++) {
    const rowArray = [];
    for (let col = 0; col < 10; col++) {
      const cell = {
        row, col, object: null, hasShip: false,
      };
      rowArray.push(cell);
    }
    board.push(rowArray);
  }

  // Step 2: Return the Board
  return {
    board,

    placeShip(a, b, lenght) {
      const { board } = this;
      board[a][b].hasShip = true;
      board[a][b].object = new Ship(lenght);
      return board[a][b];
    },
  };
}
