import { experiments } from 'webpack';
import Gameboard from '../src/gameboard.js';
import Ship from '../src/ship.js';

// Gameboard
describe('Gameboard', () => {
  test('creates a gameboard with correct structure and properties', () => {
    // Create a gameboard
    const gameboard = Gameboard();

    // Verify that the gameboard has the correct structure and properties
    expect(Array.isArray(gameboard.board)).toBe(true); // Check if it's an array

    // Check if it has 10 rows
    expect(gameboard.board.length).toBe(10);

    // Check if each row has 10 columns
    gameboard.board.forEach((row) => {
      expect(Array.isArray(row)).toBe(true); // Check if each row is an array
      expect(row.length).toBe(10); // Check if each row has 10 columns
    });

    // Check if each cell object has the expected properties
    gameboard.board.forEach((row) => {
      row.forEach((cell) => {
        expect(cell).toHaveProperty('row');
        expect(cell).toHaveProperty('col');
        expect(cell).toHaveProperty('object');
      });
    });
  });

  // placeShip
  test.only('takes cordinates and length and creates a ship on that cordinates of that lenght verticly', () => {
    const gameboard = Gameboard();

    gameboard.placeShipVertically(5, 5, 3);

    // has ship verticly
    expect(gameboard.board[5][5].hasShipPart).toBe(true);
    expect(gameboard.board[5][6].hasShipPart).toBe(true);
    expect(gameboard.board[5][7].hasShipPart).toBe(true);

    // has block
    expect(gameboard.board[4][7].hasBlock).toBe(true);
    expect(gameboard.board[6][7].hasBlock).toBe(true);

    // returns already taken
    expect(gameboard.placeShipVertically(5, 1, 5)).toEqual('Too Close');

    // check if its too close

    expect(gameboard.placeShipVertically(5, 1, 3)).toEqual('Too Close');

    // check horizontally
    expect(gameboard.placeShipHorizontally(2, 5, 2)).toEqual('Too Close');
  });
  test('takes coordinates and length and creates a ship on those coordinates of that length horizontally', () => {
    const gameboard = Gameboard();

    gameboard.placeShipHorizontally(5, 5, 3);

    // Expect the ship to be placed horizontally
    expect(gameboard.board[5][5].hasShipPart).toBe(true);
    expect(gameboard.board[6][5].hasShipPart).toBe(true);
    expect(gameboard.board[7][5].hasShipPart).toBe(true);

    // hasblock for surroonding cells
    expect(gameboard.board[7][4].hasBlock).toBe(true);
    expect(gameboard.board[8][6].hasBlock).toBe(true);
    expect(gameboard.board[4][4].hasBlock).toBe(true);

    // Test for 'Too close' error
    expect(gameboard.placeShipHorizontally(1, 4, 3)).toEqual('Too Close');
    expect(gameboard.placeShipHorizontally(3, 5, 1)).toEqual('Too Close');
  });

  // recieve Attack
  test('takes cordinates a gives an attack either to the ship or a cell', () => {
    const gameboard = new Gameboard();
    gameboard.placeShipVertically(1, 1, 3);

    gameboard.receiveAttack(1, 4);

    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(1, 2);
    gameboard.receiveAttack(1, 3);

    gameboard.receiveAttack(1, 5);

    // if there is a ship
    expect(gameboard.board[1][2].object.isHit()).toBe('already sunk');
    expect(gameboard.board[1][2].object.isSunk).toBe(true);
    expect(gameboard.board[1][2].object.isSunk).toBe(true);

    expect(gameboard.board[1][5].wasHit).toBe(true);

    // if there wasnt a ship
    expect(gameboard.board[1][4].wasHit).toBe(true);

    //
  });

  // check if all ships sunk
  test('takes board and checks if all ships are sunked', () => {
    const gameboard = new Gameboard();
    gameboard.placeShipVertically(1, 1, 3);
    gameboard.placeShipHorizontally(5, 5, 3);

    gameboard.receiveAttack(1, 1);
    gameboard.receiveAttack(1, 2);
    gameboard.receiveAttack(1, 3);

    gameboard.receiveAttack(5, 5);
    gameboard.receiveAttack(6, 5);
    gameboard.receiveAttack(7, 5);

    expect(gameboard.isAllSunk()).toBe(true);
  });
});
