import Gameboard from './gameboard';
import realPlayer from './player';

export default function shipPlacementBoards() {
  const shipHangar = new Gameboard();
  const playerG = new realPlayer('Marko');
  // placing ships beforehand
  shipHangar.placeShipVertically(0, 1, 6);
  shipHangar.placeShipVertically(4, 0, 5);
  shipHangar.placeShipHorizontally(0, 9, 4);
  shipHangar.placeShipHorizontally(6, 9, 3);
  shipHangar.placeShipVertically(8, 0, 2);
  shipHangar.placeShipVertically(8, 5, 1);

  return {
    shipHangar,
    playerG,
  };
}
