const defaultFlags = {
  blocking: true
};

class Entity {
  constructor(x, y, name, flags, fightable) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.flags = { ...flags };
    this.action = null;

    if (fightable) {
      this.fightable = fightable;
      this.fightable.owner = this;
    }
  }

  isBlocking() {
    return this.flags.blocking;
  }

  isFightable() {
    return this.hasOwnProperty("fightable");
  }

  bump(target) {
    if (target.isFightable()) {
      this.fightable.meleeAttack(target.fightable);
    }
  }

  takeTurn() {
    console.log(`${this.name} ponders the meaning of its existence`);
  }
}

export default Entity;
