import Gameboard from './gameboard.js';

export default function realPlayer(name) {
  const gameboard = new Gameboard();
  return {
    gameboard,
    name,
  };
}

export function Computer() {
  const gameboard = new Gameboard();
  return {
    gameboard,
    name: 'Computer',
  };
}
