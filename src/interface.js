import displayBoard from './displayBoard';
import randomGame from './randomGame';
import './styles/interface.css';

export default function displayGame(game) {
  const container = document.getElementById('container');
  container.innerHTML = ''; // Clear the container at the start

  // Reset button
  const middleDiv = document.createElement('div');
  const randomBtn = document.createElement('button');
  randomBtn.classList.add('randomBtn');
  randomBtn.textContent = 'Reset';
  randomBtn.addEventListener('click', () => {
    container.innerHTML = '';
    displayGame(randomGame());
  });

  // game state
  const status = document.createElement('h1');
  status.classList.add('status');
  status.textContent = 'Loading';

  // Titles
  const playerBoardTitle = document.createElement('h1');
  playerBoardTitle.textContent = `${game.player.name}'s Board`;
  playerBoardTitle.classList.add('playerTitle');
  const compBoardTitle = document.createElement('h1');
  compBoardTitle.textContent = 'Computer Board';
  compBoardTitle.classList.add('playerTitle');

  // Boards
  const playerBoardDiv = document.createElement('div');
  playerBoardDiv.classList.add('boardPlayer');
  const computerBoardDiv = document.createElement('div');
  computerBoardDiv.classList.add('boardComputer');

  // Place boards inside div
  displayBoard(game, playerBoardDiv, computerBoardDiv, status);

  // Div to put them both in
  const divPlayer = document.createElement('div');
  divPlayer.appendChild(playerBoardTitle);
  divPlayer.appendChild(playerBoardDiv);

  // Comp
  const compDiv = document.createElement('div');
  compDiv.appendChild(compBoardTitle);
  compDiv.appendChild(computerBoardDiv);

  container.appendChild(divPlayer);
  middleDiv.appendChild(randomBtn);

  middleDiv.appendChild(status);

  container.appendChild(middleDiv);

  // container.appendChild(placeShip);

  container.appendChild(compDiv);
}
