import Ship from './ship';

export default function Gameboard(board = []) {
  const ships = [];
  // Step 1: Create the Board
  if (board.length === 0) {
    for (let row = 0; row < 10; row++) {
      const rowArray = [];
      for (let col = 0; col < 10; col++) {
        const cell = {
          row, col, object: null, hasShipPart: false, wasHit: false, hasBlock: false,
        };
        rowArray.push(cell);
      }
      board.push(rowArray);
    }
  }
  // Step 2: Return the Board
  return {
    board,
    ships,

    placeShipVertically(a, b, length) {
      const { board } = this;

      // Check if placement is within bounds
      if (b + length > 10) return 'Out Of Bounds';

      // Check if the area is free from other ships and blocks
      for (let i = 0; i < length; i++) {
        if (
          board[a][b + i].hasShipPart
          || (a > 0 && board[a - 1][b + i].hasShipPart)
          || (a < 9 && board[a + 1][b + i].hasShipPart)
          || board[a][b + i].hasBlock
          || (a > 0 && board[a - 1][b + i].hasBlock)
          || (a < 9 && board[a + 1][b + i].hasBlock)
        ) {
          return 'Too Close';
        }
      }

      // Check the cells before the start and after the end of the ship
      if (
        (b > 0 && (board[a][b - 1].hasShipPart || board[a][b - 1].hasBlock))
        || (b + length < 10 && (board[a][b + length].hasShipPart || board[a][b + length].hasBlock))
        || (b > 0 && a > 0 && (board[a - 1][b - 1].hasShipPart || board[a - 1][b - 1].hasBlock))
        || (a > 0 && b + length < 10 && (board[a - 1][b + length].hasShipPart || board[a - 1][b + length].hasBlock))
        || (b > 0 && a < 9 && (board[a + 1][b - 1].hasShipPart || board[a + 1][b - 1].hasBlock))
        || (a < 9 && b + length < 10 && (board[a + 1][b + length].hasShipPart || board[a + 1][b + length].hasBlock))
      ) {
        return 'Too Close';
      }

      const ship = new Ship(length);
      this.ships.push(ship);

      // Place the ship parts
      for (let i = 0; i < length; i++) {
        board[a][b + i].hasShipPart = true;
        board[a][b + i].object = ship.shipParts[i];

        if (a > 0) {
          board[a - 1][b + i].hasBlock = true;
        }

        if (a < 9) {
          board[a + 1][b + i].hasBlock = true;
        }
      }

      // Block the cells before and after the ship
      if (b > 0) {
        board[a][b - 1].hasBlock = true;
        if (a > 0) board[a - 1][b - 1].hasBlock = true;
        if (a < 9) board[a + 1][b - 1].hasBlock = true;
      }
      if (b + length < 10) {
        board[a][b + length].hasBlock = true;
        if (a > 0) board[a - 1][b + length].hasBlock = true;
        if (a < 9) board[a + 1][b + length].hasBlock = true;
      }

      return board;
    },

    placeShipHorizontally(a, b, length) {
      const { board } = this;

      // Check if placement is within bounds and cells are available
      if (a + length > 10) return 'Out Of Bounds';

      // Check if the area is free from other ships and blocks
      for (let i = 0; i < length; i++) {
        if (
          board[a + i][b].hasShipPart
          || (b > 0 && board[a + i][b - 1].hasShipPart)
          || (b < 9 && board[a + i][b + 1].hasShipPart)
          || board[a + i][b].hasBlock
          || (b > 0 && board[a + i][b - 1].hasBlock)
          || (b < 9 && board[a + i][b + 1].hasBlock)
        ) {
          return 'Too Close';
        }
      }

      // Check the cells before the start and after the end of the ship
      if (
        (a > 0 && (board[a - 1][b].hasShipPart || board[a - 1][b].hasBlock))
        || (a + length < 10 && (board[a + length][b].hasShipPart || board[a + length][b].hasBlock))
        || (a > 0 && b > 0 && (board[a - 1][b - 1].hasShipPart || board[a - 1][b - 1].hasBlock))
        || (a > 0 && b < 9 && (board[a - 1][b + 1].hasShipPart || board[a - 1][b + 1].hasBlock))
        || (a + length < 10 && b > 0 && (board[a + length][b - 1].hasShipPart || board[a + length][b - 1].hasBlock))
        || (a + length < 10 && b < 9 && (board[a + length][b + 1].hasShipPart || board[a + length][b + 1].hasBlock))
      ) {
        return 'Too Close';
      }

      const ship = new Ship(length);
      this.ships.push(ship);

      // Place the ship parts
      for (let i = 0; i < length; i++) {
        board[a + i][b].hasShipPart = true;
        board[a + i][b].object = ship.shipParts[i];

        if (b > 0) {
          board[a + i][b - 1].hasBlock = true;
        }
        if (b < 9) {
          board[a + i][b + 1].hasBlock = true;
        }
      }

      // Block the cells before and after the ship
      if (a > 0) {
        board[a - 1][b].hasBlock = true;
        if (b > 0) board[a - 1][b - 1].hasBlock = true;
        if (b < 9) board[a - 1][b + 1].hasBlock = true;
      }
      if (a + length < 10) {
        board[a + length][b].hasBlock = true;
        if (b > 0) board[a + length][b - 1].hasBlock = true;
        if (b < 9) board[a + length][b + 1].hasBlock = true;
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
