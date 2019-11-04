import Entity from "./entity";
import Fightable from "./fightable";

function spawnMonster(x, y) {
  const fightable = new Fightable(20, 0, 0);
  return new Entity(x, y, "monster", { blocking: true }, fightable);
}

export { spawnMonster };
