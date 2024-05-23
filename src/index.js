import displayGame from './interface';
import './styles/interface.css';

const container = document.getElementById('container');

const playGameBtn = document.createElement('button');
playGameBtn.classList.add('playGameBtn');
playGameBtn.textContent = 'Play Game';
playGameBtn.addEventListener('click', () => {
  container.removeChild(playGameBtn);

  displayGame();
});

container.appendChild(playGameBtn);
