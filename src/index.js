import displayGame from './interface';
import './styles/interface.css';
import randomGame, { randomComputerOnly } from './randomGame';

const container = document.getElementById('container');

const playRandomGameBtn = document.createElement('button');
playRandomGameBtn.classList.add('playRandomGameBtn');
playRandomGameBtn.textContent = 'Random Game';
playRandomGameBtn.addEventListener('click', () => {
  container.innerHTML = ''; // Clear the container
  displayGame(randomGame());
});

const placeShips = document.createElement('button');
placeShips.classList.add('playRandomGameBtn');
placeShips.textContent = 'Place Ships';
placeShips.addEventListener('click', () => {
  container.innerHTML = ''; // Clear the container
  displayGame(randomGame());
});

container.appendChild(playRandomGameBtn);
container.appendChild(placeShips);
