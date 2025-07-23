export function showModal(result) {
    var modal = document.getElementById('battle-modal');
    var title = document.getElementById('modal-title');
    var message = document.getElementById('modal-message');
    var statsEl = document.getElementById('modal-stats');
    var button = document.getElementById('modal-btn');
    if (result === 'win') {
      title.textContent = 'You Win!';
      message.textContent = 'Congratulations! Ready for your next opponent?';
      button.textContent = 'Next Opponent';
    } else {
      title.textContent = 'You Lost!';
      message.textContent = 'Better luck next time.';
      button.textContent = 'Restart';
    }
    modal.classList.remove('hidden');
    button.onclick = function() {
      modal.classList.add('hidden');
      var eventType = result === 'win' ? 'modalNextOpponent' : 'modalRestart';
      window.dispatchEvent(new Event(eventType));
    };
}

export function hideModal() {
    document.getElementById('battle-modal').classList.add('hidden');
}
  