import displayBoard from './displayBoard';
import './styles/interface.css';
import randomGame from './randomGame';

export default function displayGame(game = '') {
  const container = document.getElementById('container');

  // Clear previous content and remove event listeners to avoid memory leaks
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  const playerBoard = game.player.gameboard.board;
  const computerBoard = game.computer.gameboard.board;

  // Reset button
  const resetBtn = document.createElement('button');
  resetBtn.classList.add('resetBtn');
  resetBtn.textContent = 'Reset Game';
  resetBtn.addEventListener('click', () => {
    console.log('Resetting game');
    container.innerHTML = '';
    displayGame(randomGame());
  });

  // Titles
  const playerBoardTitle = document.createElement('h1');
  playerBoardTitle.textContent = 'Player Board';
  playerBoardTitle.classList.add('playerTitle');

  const CompBoardTitle = document.createElement('h1');
  CompBoardTitle.textContent = 'Computer Board';
  CompBoardTitle.classList.add('computerTitle');

  // Boards
  const playerBoardDiv = document.createElement('div');
  playerBoardDiv.classList.add('boardPlayer');
  const computerBoardDiv = document.createElement('div');
  computerBoardDiv.classList.add('boardComputer');

  // Place boards inside div
  displayBoard(playerBoard, playerBoardDiv);
  displayBoard(computerBoard, computerBoardDiv);

  // Div to put them both in
  const divPlayer = document.createElement('div');
  divPlayer.appendChild(playerBoardTitle);
  divPlayer.appendChild(playerBoardDiv);

  const compDiv = document.createElement('div');
  compDiv.appendChild(CompBoardTitle);
  compDiv.appendChild(computerBoardDiv);

  container.appendChild(divPlayer);
  container.appendChild(resetBtn);
  container.appendChild(compDiv);

  console.log('Game displayed');
}
