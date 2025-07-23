import { audioCacheService } from './services/audioService.js';
import { initRecaptcha } from './services/recaptchaService.js';
import { getCurrentStats, resetStats } from './services/storageService.js';
import { initBattle }    from './controllers/battleController.js';

// 2. Kick off recaptcha once per session before anything else
initRecaptcha();
initBattle();


function renderStats() {
  const { wins, losses } = getCurrentStats();
  document.getElementById('stat-wins').textContent   = wins;
  document.getElementById('stat-losses').textContent = losses;
}
renderStats();

// Clear cache & start next on win
window.addEventListener('modalNextOpponent', () => {
    audioCacheService.clearCache();
    renderStats();
    initBattle();
});

// On loss, clear cache & reload
window.addEventListener('modalRestart', () => {
    audioCacheService.clearCache();
    window.location.reload();
});

  
  // Also clean up on page unload
  window.addEventListener('beforeunload', () => {
    audioCacheService.clearCache();
  });



  