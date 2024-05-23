import realPlayer, { Computer } from './player';

export default function randomGame() {
  const computer = new Computer();
  const player = new realPlayer('Marko');

  computer.gameboard.placeShipVertically(1, 1, 3);
  computer.gameboard.placeShipVertically(2, 4, 3);

  player.gameboard.placeShipVertically(1, 1, 3);
  player.gameboard.placeShipVertically(2, 4, 3);

  return {
    computer,
    player,
  };
}
