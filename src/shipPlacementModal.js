import renderBoardPlacement from './placementInterface';
import shipPlacementBoards from './shipPlacementBoards';
import './styles/shipPlacement.css';

export default function shipPlacementModal(container) {
  // Create modal element
  const modal = document.createElement('div');
  modal.id = 'myModal';
  modal.className = 'modal';

  // Create modal content element
  const modalContent = document.createElement('div');
  modalContent.className = 'modal-content';

  // Create close button
  const closeButton = document.createElement('span');
  closeButton.className = 'close';
  closeButton.innerHTML = '&times;';
  closeButton.addEventListener('click', () => {
    modal.style.display = 'none'; // Close the modal when the close button is clicked
  });
  modalContent.appendChild(closeButton);

  // Create content wrapper
  const contentWrapper = document.createElement('div');
  contentWrapper.className = 'content-wrapper';

  // Create left content
  const contentLeft = document.createElement('div');
  contentLeft.className = 'content-left';

  // Create right content
  const contentRight = document.createElement('div');
  contentRight.className = 'content-right';

  // Initialize the game object
  const game = shipPlacementBoards();

  // Call shipPlacementBoards with the game object and the containers
  renderBoardPlacement(game, contentRight, contentLeft);

  contentWrapper.appendChild(contentRight);
  contentWrapper.appendChild(contentLeft);

  // Append content wrapper to modal content
  modalContent.appendChild(contentWrapper);

  // Append modal content to modal
  modal.appendChild(modalContent);

  // Append modal to container
  container.appendChild(modal);

  // Display the modal
  modal.style.display = 'block';
}
