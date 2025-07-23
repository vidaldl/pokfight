const LEVEL = 25;
const SELECTORS = {
    playerName: '#player-pokemon-name',
    playerLevel: '#player-level',
    playerHpBar: '#player-hp-bar',
    playerHpText: '#player-hp-text',
    playerSprite: '#player-sprite',
    enemyName: '#enemy-name',
    enemyLevel: '#enemy-level',
    enemyHpBar: '#enemy-hp-bar',
    enemyHpText: '#enemy-hp-text',
    enemySprite: '#enemy-sprite',
    moveButtons: ['#move-btn-1', '#move-btn-2', '#move-btn-3', '#move-btn-4']
};

export function clearBattleArea() {
  // not really doing anything here
}

export function renderBattleStart(player, enemy) {
    document.querySelector(SELECTORS.playerName).textContent = player.name;
    document.querySelector(SELECTORS.playerLevel).textContent = '' + LEVEL;
    updateHp('player', player.currentHp, player.maxHp);
    var playerSpriteDiv = document.querySelector(SELECTORS.playerSprite);
    var playerImg = playerSpriteDiv.querySelector('img');
    if (!playerImg) {
        playerImg = document.createElement('img');
        playerImg.className = 'sprite-player img';
        playerSpriteDiv.appendChild(playerImg);
    }
    playerImg.src = player.spriteUrl;
    document.querySelector(SELECTORS.enemyName).textContent = enemy.name;
    document.querySelector(SELECTORS.enemyLevel).textContent = '' + LEVEL;
    updateHp('enemy', enemy.currentHp, enemy.maxHp);
    var enemySpriteDiv = document.querySelector(SELECTORS.enemySprite);
    var enemyImg = enemySpriteDiv.querySelector('img');
    if (!enemyImg) {
        enemyImg = document.createElement('img');
        enemyImg.className = 'sprite-enemy img';
        enemySpriteDiv.appendChild(enemyImg);
    }
    enemyImg.src = enemy.spriteUrl;
    updateMoveButtons(player.moves);
}

export function updateMoveButtons(moves) {
    moves.forEach(function(move, idx) {
      var btn = document.querySelector(SELECTORS.moveButtons[idx]);
      btn.querySelector('.move-name').textContent = move.name;
      btn.querySelector('.move-pp').textContent = 'PP ' + move.currentPp + '/' + move.maxPp;
      btn.disabled = move.currentPp === 0;
    });
}

export function onMoveSelected(callback) {
    SELECTORS.moveButtons.forEach(function(sel, idx) {
      var btn = document.querySelector(sel);
      btn.onclick = function() { callback(idx); };
    });
}

export function updateHp(who, current, max) {
    var barSel  = who === 'player' ? SELECTORS.playerHpBar  : SELECTORS.enemyHpBar;
    var textSel = who === 'player' ? SELECTORS.playerHpText : SELECTORS.enemyHpText;
    var pct = Math.floor((current / max) * 100);
    document.querySelector(barSel).style.width = pct + '%';
    document.querySelector(textSel).textContent = current + '/' + max;
}

export function shakeSprite(who) {
    var sel = who === 'player' ? SELECTORS.playerSprite : SELECTORS.enemySprite;
    var img = document.querySelector(sel);
    img.classList.add('shake');
    img.addEventListener('animationend', function() { img.classList.remove('shake'); }, { once: true });
}
  