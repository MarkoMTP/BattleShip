import realPlayer, { Computer } from './player';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeFunc(func1, func2) {
  return Math.random() < 0.5 ? func1 : func2;
}

function placeShips(gameboard, shipSizes) {
  for (const size of shipSizes) {
    let placed = false;
    while (!placed) {
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
  }
}

export default function randomGame() {
  const computer = new Computer();
  const player = new realPlayer('Marko');

  const shipSizes = [6, 5, 4, 3, 2, 1];

  placeShips(computer.gameboard, shipSizes);
  placeShips(player.gameboard, shipSizes);

  return {
    computer,
    player,
  };
}
