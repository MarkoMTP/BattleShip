import Gameboard from './gameboard';

function getRandomInt(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function compAttack(board) {
  const a = getRandomInt(0, 9);
  const b = getRandomInt(0, 9);

  const gameBoard = new Gameboard(board);
  gameBoard.receiveAttack(a, b);
  return gameBoard;
}
