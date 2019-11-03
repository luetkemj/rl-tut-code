const defaultFlags = {
  blocking: true
};

class Entity {
  constructor(x, y, name, flags) {
    this.x = x;
    this.y = y;
    this.name = name;
    this.flags = { ...flags };
    this.action = null;
  }

  isBlocking() {
    return this.flags.blocking;
  }
}

export default Entity;
