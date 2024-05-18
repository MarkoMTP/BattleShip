import Ship from './ship';

export default function Gameboard(board = []) {
  const ships = [];
  // Step 1: Create the Board
  for (let row = 0; row < 10; row++) {
    const rowArray = [];
    for (let col = 0; col < 10; col++) {
      const cell = {
        row, col, object: null, hasShipPart: false, wasHit: false,
      };
      rowArray.push(cell);
    }
    board.push(rowArray);
  }

  // Step 2: Return the Board
  return {
    board,
    ships,

    placeShipVertically(a, b, length) {
      const { board } = this;

      // Check if placement is within bounds and cells are available
      if (b + length > 10) return 'out of bounds';
      for (let i = 0; i < length; i++) {
        if (board[a][b + i].hasShipPart) {
          return 'already taken';
        }
      }

      const ship = new Ship(length);
      this.ships.push(ship);

      // Place the ship parts
      for (let i = 0; i < length; i++) {
        board[a][b + i].hasShipPart = true;
        board[a][b + i].object = ship.shipParts[i];
      }

      return board;
    },

    placeShipHorizontally(a, b, length) {
      const { board } = this;

      // Check if placement is within bounds and cells are available
      if (a + length > 10) return 'out of bounds';
      for (let i = 0; i < length; i++) {
        if (board[a + i][b].hasShipPart) {
          return 'already taken';
        }
      }

      const ship = new Ship(length);
      this.ships.push(ship);

      // Place the ship parts
      for (let i = 0; i < length; i++) {
        board[a + i][b].hasShipPart = true;
        board[a + i][b].object = ship.shipParts[i];
      }

      return board;
    },

    receiveAttack(a, b) {
      const { board } = this;
      const cell = board[a][b];
      if (cell.wasHit) return 'already hit';

      cell.wasHit = true;
      if (cell.hasShipPart) {
        cell.object.isHit();
        return cell;
      }
      return cell;
    },

    isAllSunk() {
      return this.ships.every((ship) => ship.isItSunk());
    },

  };
}
