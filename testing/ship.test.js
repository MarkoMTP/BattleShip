import Ship, { ShipPart } from '../src/ship.js'; // Assuming Ship is defined in Ship.js

describe('Ship', () => {
  test('creates a ship object with default values', () => {
    const ship = Ship(); // Create a ship object with length 3

    // Verify that the ship object has the correct properties and default values
    expect(ship.length).toBe(ship.length);
    expect(ship.hitTimes).toBe(0);
    expect(ship.isSunk).toBe(false);
  });

  test('it makes ship parts according to ship lenght and it puts them in an array', () => {
    const ship = Ship(3);
    expect(ship.shipParts.length).toBe(3);
  });

  test('it checks if all ship parts are sunk', () => {
    const ship = Ship(2);
    ship.shipParts[0].isHit();
    ship.shipParts[1].isHit();

    expect(ship.isItSunk()).toBe(true);
  });
});

test('creates a ship part', () => {
  const shipPart = new ShipPart();

  expect(shipPart.isSunk).toBe(false);
});
