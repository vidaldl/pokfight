
export default class Move {
    constructor(obj) {
      this.name = obj.name;
      this.power = obj.power;
      this.accuracy = obj.accuracy;
      this.maxPp = obj.pp;
      this.currentPp = obj.pp;
    }
    use() {
      if (this.currentPp <= 0) throw new Error('No PP left');
      this.currentPp--;
    }
  }  