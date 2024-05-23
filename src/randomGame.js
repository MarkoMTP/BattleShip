import realPlayer, { Computer } from './player';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomizeBetweenTwoFunctions(func1, func2) {
  const randomChoice = Math.floor(Math.random() * 2);

  if (randomChoice === 0) {
    return func1; // Just return the function, not calling it
  }
  return func2; // Just return the function, not calling it
}

export default function randomGame() {
  const computer = new Computer();
  const player = new realPlayer('Marko');

  const shipSizes = [6, 5, 4, 3, 2, 1]; // An array of ship sizes

  for (const size of shipSizes) { // Loop through each ship size
    let placed = false; // Flag to indicate if the ship is successfully placed
    while (!placed) { // Keep trying until the ship is successfully placed
      const a = getRandomInt(0, 9); // Adjusted to ensure ships fit within board
      const b = getRandomInt(0, 9); // Adjusted to ensure ships fit within board

      // Randomly choose between vertical or horizontal placement
      const placementFunction = randomizeBetweenTwoFunctions(
        () => computer.gameboard.placeShipVertically(a, b, size), // Callback to place vertically
        () => computer.gameboard.placeShipHorizontally(a, b, size), // Callback to place horizontally
      );

      const result = placementFunction(); // Call the chosen placement function
      if (result !== 'out of bounds' && result !== 'already taken') {
        placed = true; // Mark the ship as successfully placed
      }
    }
  }
  return {
    computer,
    player,
  };
}
