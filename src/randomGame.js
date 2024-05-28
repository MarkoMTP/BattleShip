import realPlayer, { Computer } from './player';

// Utility functions
function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeFunc(func1, func2) {
  return Math.random() < 0.5 ? func1 : func2;
}

// Ship placement function with retry logic
function placeShips(createGameboard, shipSizes) {
  const maxOverallAttempts = 10; // Maximum overall attempts to place all ships
  let overallAttempts = 0;

  while (overallAttempts < maxOverallAttempts) {
    let allShipsPlaced = true;
    const gameboard = createGameboard();

    for (const size of shipSizes) {
      let placed = false;
      let attempts = 0; // Add an attempt counter
      const maxAttempts = 100; // Set a maximum number of attempts

      while (!placed && attempts < maxAttempts) {
        attempts++;
        const a = getRandomInt(0, 9);
        const b = getRandomInt(0, 9);
        const placementFunction = randomizeFunc(
          () => gameboard.placeShipVertically(a, b, size),
          () => gameboard.placeShipHorizontally(a, b, size),
        );
        const result = placementFunction();
        if (result !== 'Out Of Bounds' && result !== 'Too Close') {
          placed = true;
        }
      }

      if (!placed) {
        console.error(`Failed to place ship of size ${size} after ${attempts} attempts.`);
        allShipsPlaced = false;
        break;
      }
    }

    if (allShipsPlaced) {
      return gameboard;
    }

    overallAttempts++;
    console.warn(`Retrying ship placement. Overall attempt ${overallAttempts}`);
  }

  console.error(`Failed to place all ships after ${maxOverallAttempts} overall attempts.`);
  throw new Error('Unable to place all ships');
}

// Game initialization function
export default function randomGame() {
  const computer = new Computer();
  const player = new realPlayer('Marko');

  const shipSizes = [6, 5, 4, 3, 2, 1];

  console.log('Placing ships for computer...');
  computer.gameboard = placeShips(() => new Computer().gameboard, shipSizes); // Create a new gameboard instance
  console.log('Computer ships placed.');

  console.log('Placing ships for player...');
  player.gameboard = placeShips(() => new realPlayer('Marko').gameboard, shipSizes); // Create a new gameboard instance
  console.log('Player ships placed.');

  return {
    computer,
    player,
  };
}
