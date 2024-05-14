import Ship from './ship';

export default function Gameboard(board = []) {
  // Step 1: Create the Board
  for (let row = 0; row < 10; row++) {
    const rowArray = [];
    for (let col = 0; col < 10; col++) {
      const cell = {
        row, col, object: null, hasShip: false, wasHit: false,
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

    recieveAttack(a, b) {
      const { board } = this;
      if (board[a][b].hasShip) {
        board[a][b].object.isHit();
        board[a][b].object.isItSunk();
        return board[a][b].object;
      }
      return board[a][b].wasHit = true;
    },

    isAllSunk() {
      const { board } = this;

      const ships = [];
      for (let i = 0; i < 10; i++) {
        for (let j = 0; j < 10; j++) {
          const cell = board[i][j];
          if (cell.hasShip) {
            ships.push(cell.object); // Push the ship object, not the cell itself
          }
        }
      }

      const remainingShips = ships.filter((ship) => !ship.isSunk);

      if (remainingShips.length === 0) {
        return true;
      } return false;
    },
  };
}
