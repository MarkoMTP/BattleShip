import displayBoard from './displayBoard';
import randomGame from './randomGame';
import './styles/interface.css';

export default function displayGame(game) {
  const container = document.getElementById('container');
  container.innerHTML = ''; // Clear the container at the start

  // Reset button
  const randomBtn = document.createElement('button');
  randomBtn.classList.add('randomBtn');
  randomBtn.textContent = 'Random Placement';
  randomBtn.addEventListener('click', () => {
    container.innerHTML = '';
    displayGame(randomGame());
  });

  // // place ship
  // const placeShip = document.createElement('button');
  // placeShip.classList.add('randomBtn');
  // placeShip.textContent = 'Place Ship';

  // Titles
  const playerBoardTitle = document.createElement('h1');
  playerBoardTitle.textContent = `${game.player.name}'s Board`;
  playerBoardTitle.classList.add('playerTitle');
  const compBoardTitle = document.createElement('h1');
  compBoardTitle.textContent = 'Computer Board';
  compBoardTitle.classList.add('computerTitle');

  // Boards
  const playerBoardDiv = document.createElement('div');
  playerBoardDiv.classList.add('boardPlayer');
  const computerBoardDiv = document.createElement('div');
  computerBoardDiv.classList.add('boardComputer');

  // Place boards inside div
  displayBoard(game, playerBoardDiv, computerBoardDiv);

  // Div to put them both in
  const divPlayer = document.createElement('div');
  divPlayer.appendChild(playerBoardTitle);
  divPlayer.appendChild(playerBoardDiv);

  // Comp
  const compDiv = document.createElement('div');
  compDiv.appendChild(compBoardTitle);
  compDiv.appendChild(computerBoardDiv);

  container.appendChild(divPlayer);
  container.appendChild(randomBtn);
  // container.appendChild(placeShip);

  container.appendChild(compDiv);
}
