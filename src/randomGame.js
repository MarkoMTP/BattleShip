import realPlayer, { Computer } from './player';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeFunc(func1, func2) {
  const randomChoice = Math.floor(Math.random() * 2);
  return randomChoice === 0 ? func1 : func2;
}

export default function randomGame() {
  const computer = new Computer();
  const player = new realPlayer('Marko');

  const shipSizes = [6, 5, 4, 3, 2, 1]; // An array of ship sizes

  for (const size of shipSizes) {
    let placed = false;
    while (!placed) { // Keep trying until the ship is successfully placed
      const a = getRandomInt(0, 9);
      const b = getRandomInt(0, 9);

      // Randomly choose between vertical or horizontal placement
      const placementFunction = randomizeFunc(
        () => computer.gameboard.placeShipVertically(a, b, size),
        () => computer.gameboard.placeShipHorizontally(a, b, size),
      );

      const result = placementFunction();
      if (result !== 'Out Of Bounds' && result !== 'Too Close') {
        placed = true;
      }
    }
  }

  return {
    computer,
    player,
  };
}
