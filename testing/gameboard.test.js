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
  test('takes cordinates and length and creates a ship on that cordinates of that lenght ', () => {
    const gameboard = Gameboard();

    gameboard.placeShip(1, 1, 3);
    gameboard.placeShip(1, 2, 3);

    // has ship
    expect(gameboard.board[1][1].hasShip).toBe(true);
    expect(gameboard.board[1][2].hasShip).toBe(true);

    // has placed ship
    expect(gameboard.board[1][1].object.length).toEqual(new Ship(3).length);
    expect(gameboard.board[1][1].object.hitTimes).toBe(0);
    expect(gameboard.board[1][1].object.isSunk).toEqual(false);
  });

  // recieve Attack
  test('takes cordinates a gives an attack either to the ship or a cell', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(1, 2, 3);
    gameboard.placeShip(1, 5, 3);

    gameboard.recieveAttack(1, 4);

    gameboard.recieveAttack(1, 2);
    gameboard.recieveAttack(1, 2);
    gameboard.recieveAttack(1, 2);

    gameboard.recieveAttack(1, 5);
    gameboard.recieveAttack(1, 5);
    gameboard.recieveAttack(1, 5);

    // if there is a ship
    expect(gameboard.board[1][2].object.hitTimes).toBe(3);
    expect(gameboard.board[1][2].object.isItSunk()).toBe(true);

    expect(gameboard.board[1][5].object.isItSunk()).toBe(true);

    // if there wasnt a ship
    expect(gameboard.board[1][4].wasHit).toBe(true);

    //
  });

  // check if all ships sunk
  test.only('takes board and checks if all ships are sunked', () => {
    const gameboard = new Gameboard();
    gameboard.placeShip(1, 2, 3);
    gameboard.placeShip(2, 3, 3);
    gameboard.placeShip(2, 4, 3);

    gameboard.recieveAttack(1, 2);
    gameboard.recieveAttack(1, 2);
    gameboard.recieveAttack(1, 2);

    gameboard.recieveAttack(2, 3);
    gameboard.recieveAttack(2, 3);
    gameboard.recieveAttack(2, 3);

    gameboard.recieveAttack(2, 4);
    gameboard.recieveAttack(2, 4);
    gameboard.recieveAttack(2, 4);

    expect(gameboard.isAllSunk()).toBe(true);
  });
});
