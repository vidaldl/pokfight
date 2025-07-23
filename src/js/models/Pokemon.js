import Move from './Move.js';

export default class Pokemon {
  constructor(obj) {
    this.id = obj.id;
    this.name = obj.name;
    this.spriteUrl = obj.spriteUrl;
    this.cryUrl = obj.cryUrl;
    this.maxHp = obj.stats.hp;
    this.currentHp = obj.stats.hp;
    this.attack = obj.stats.attack;
    this.defense = obj.stats.defense;
    this.moves = obj.moves.map(function(m) { return new Move(m); });
  }
  takeDamage(amount) {
    this.currentHp = Math.max(this.currentHp - amount, 0);
  }
  isFainted() {
    return this.currentHp <= 0;
  }
}
