import randomGame from './randomGame';
import displayBoard, { displayBoardComp } from './displayBoard';
import './styles/interface.css';

const game = randomGame();
const playerBoard = game.player.gameboard.board;
const computerBoard = game.computer.gameboard.board;

export default function displayGame() {
  const container = document.getElementById('container');
  // titles
  const playerBoardTitle = document.createElement('h1');
  playerBoardTitle.textContent = 'Player Board';
  playerBoardTitle.classList.add('playerTitle');
  const CompBoardTitle = document.createElement('h1');
  CompBoardTitle.textContent = 'Computer Board';
  CompBoardTitle.classList.add('computerTitle');

  // boards
  const playerBoardDiv = document.createElement('div');
  playerBoardDiv.classList.add('boardPlayer');
  const computerBoardDiv = document.createElement('div');
  computerBoardDiv.classList.add('boardComputer');

  // place boards inside div
  displayBoard(playerBoard, playerBoardDiv);
  displayBoard(computerBoard, computerBoardDiv);
  // div to put them both in
  const divPlayer = document.createElement('div');
  divPlayer.appendChild(playerBoardTitle);
  divPlayer.appendChild(playerBoardDiv);

  // comp
  const compDiv = document.createElement('div');
  compDiv.appendChild(CompBoardTitle);
  compDiv.appendChild(computerBoardDiv);

  container.appendChild(divPlayer);
  container.appendChild(compDiv);
}
