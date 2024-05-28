import displayBoard from './displayBoard';
import './styles/interface.css';
import randomGame from './randomGame';

export default function displayGame(game) {
  const container = document.getElementById('container');
  container.innerHTML = ''; // Clear the container at the start

  const playerBoard = game.player.gameboard.board;
  const computerBoard = game.computer.gameboard.board;

  // Reset button
  const resetBtn = document.createElement('button');
  resetBtn.classList.add('resetBtn');
  resetBtn.textContent = 'Reset Game';
  resetBtn.addEventListener('click', () => {
    container.innerHTML = '';
    displayGame(randomGame());
  });

  // Titles
  const playerBoardTitle = document.createElement('h1');
  playerBoardTitle.textContent = 'Player Board';
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
  displayBoard(playerBoard, playerBoardDiv);
  displayBoard(computerBoard, computerBoardDiv);

  // Div to put them both in
  const divPlayer = document.createElement('div');
  divPlayer.appendChild(playerBoardTitle);
  divPlayer.appendChild(playerBoardDiv);

  // Comp
  const compDiv = document.createElement('div');
  compDiv.appendChild(compBoardTitle);
  compDiv.appendChild(computerBoardDiv);

  container.appendChild(divPlayer);
  container.appendChild(resetBtn);
  container.appendChild(compDiv);
}
