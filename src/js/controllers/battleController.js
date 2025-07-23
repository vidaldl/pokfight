import { fetchRandomPokemon } from '../services/apiService.js';
import Pokemon from '../models/Pokemon.js';
import { audioCacheService } from '../services/audioService.js';
import { showModal } from './modalController.js';
import * as view from '../views/battleView.js';
import { incrementWins, incrementLosses } from '../services/storageService.js';
const LEVEL = 25;

function calculateDamage(attacker, defender, move) {
  let base = ((2 * LEVEL) / 5 + 2) * move.power * (attacker.attack / defender.defense) / 50 + 2;
  let modifier = 0.85 + Math.random() * 0.15;
  return Math.floor(base * modifier);
}

let player, enemy;

export async function initBattle() {
  view.clearBattleArea();
  let pData = await fetchRandomPokemon();
  let eData = await fetchRandomPokemon();
  player = new Pokemon(pData);
  enemy = new Pokemon(eData);
  view.renderBattleStart(player, enemy);
  audioCacheService.play('cry-' + enemy.id, enemy.cryUrl);
  view.onMoveSelected(function(moveIndex) {
    let move = player.moves[moveIndex];
    if (move.currentPp <= 0) return;
    move.use();
    view.updateMoveButtons(player.moves);
    view.shakeSprite('enemy');
    audioCacheService.play('attack', '/assets/sounds/attack.mp3');
    if (Math.random() * 100 <= move.accuracy) {
      let dmg = calculateDamage(player, enemy, move);
      enemy.takeDamage(dmg);
      view.updateHp('enemy', enemy.currentHp, enemy.maxHp);
    } else {
      audioCacheService.play('miss', '/assets/sounds/miss.mp3');
    }
    if (enemy.isFainted()) {
      audioCacheService.play('health-drop', '/assets/sounds/health-drop.mp3');
      incrementWins();
      showModal('win');
      return;
    }
    setTimeout(function() {
      let aiMoveIdx = Math.floor(Math.random() * enemy.moves.length);
      let aiMove = enemy.moves[aiMoveIdx];
      if (aiMove.currentPp > 0) {
        aiMove.use();
        view.updateMoveButtons(player.moves);
        view.shakeSprite('player');
        audioCacheService.play('attack', '/assets/sounds/attack.mp3');
        if (Math.random() * 100 <= aiMove.accuracy) {
          let dmg = calculateDamage(enemy, player, aiMove);
          player.takeDamage(dmg);
          view.updateHp('player', player.currentHp, player.maxHp);
        } else {
          audioCacheService.play('miss', '/assets/sounds/miss.mp3');
        }
      }
      if (player.isFainted()) {
        audioCacheService.play('health-drop', '/assets/sounds/health-drop.mp3');
        incrementLosses();
        showModal('loss');
        return;
      }
    }, 500);
  });
}
