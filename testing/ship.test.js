import Ship from '../src/ship'; // Assuming Ship is defined in Ship.js

describe('Ship', () => {
  test('creates a ship object with default values', () => {
    const ship = Ship(3); // Create a ship object with length 3

    // Verify that the ship object has the correct properties and default values
    expect(ship.length).toBe(3);
    expect(ship.hitTimes).toBe(0);
    expect(ship.isSunk).toBe(false);
  });

  test('increments hitTimes when isHit method is called', () => {
    const ship = Ship(3); // Create a ship object with length 3

    // Call the isHit method
    ship.isHit();

    // Verify that hitTimes is incremented
    expect(ship.hitTimes).toBe(1);
  });

  test('returns true when isItSunk method is called and ship is sunk', () => {
    const ship = Ship(3); // Create a ship object with length 3

    // Hit the ship enough times to sink it
    ship.isHit();
    ship.isHit();
    ship.isHit();

    // Verify that isSunk is true
    expect(ship.isItSunk()).toBe(true);
  });

  test('returns false when isItSunk method is called and ship is not sunk', () => {
    const ship = Ship(3); // Create a ship object with length 3

    // Hit the ship but not enough to sink it
    ship.isHit();
    ship.isHit();

    // Verify that isSunk is false
    expect(ship.isItSunk()).toBe(false);
  });
});
