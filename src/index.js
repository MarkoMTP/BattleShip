import displayGame from './interface';
import './styles/interface.css';
import placeShips, { randomComputerOnly } from './randomGame';

const container = document.getElementById('container');

const playGameBtn = document.createElement('button');
playGameBtn.classList.add('playGameBtn');
playGameBtn.textContent = 'Play Game';
playGameBtn.addEventListener('click', () => {
  container.innerHTML = ''; // Clear the container
  displayGame(randomComputerOnly());
});

container.appendChild(playGameBtn);
