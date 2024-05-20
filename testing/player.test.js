import realPlayer, { Computer } from '../src/player';

describe('Player', () => {
  // name works test
  test('jel se moze sta stavit u player', () => {
    const markan = new realPlayer('Marko');

    expect(markan.name).toEqual('Marko');
  });

  // place Test
  test(' placing a ship on player board', () => {
    const markan = new realPlayer('Marko');
    markan.gameboard.placeShipVertically(1, 1, 3);
    expect(markan.gameboard.board[1][3].hasShipPart).toBe(true);
  });
});

describe('Computer', () => {
  // name works test
  test('computer name', () => {
    const comp = new Computer('');

    expect(comp.name).toEqual('Computer');
  });

  // place Test
  test.only(' placing a ship on player board', () => {
    const comp = new Computer('');
    comp.gameboard.placeShipVertically(1, 1, 3);
    expect(comp.gameboard.board[1][3].hasShipPart).toBe(true);
  });
});
