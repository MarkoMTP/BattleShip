import displayGame from './interface';
import './styles/interface.css';
import randomGame, { randomComputerOnly } from './randomGame';

const container = document.getElementById('container');

const playRandomGameBtn = document.createElement('button');
playRandomGameBtn.classList.add('randomBtn');
playRandomGameBtn.textContent = 'Play Game';
playRandomGameBtn.addEventListener('click', () => {
  container.innerHTML = ''; // Clear the container
  displayGame(randomGame());
});

container.appendChild(playRandomGameBtn);
