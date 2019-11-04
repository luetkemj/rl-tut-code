import Directions from "./directions";
import Random from "rung/src/random";

const rng = new Random(Math.random);

function drunkenWalk(entity, stage) {
  for (let i = 0; i < 4; i++) {
    let direction = Directions.CARDINAL[rng.integer(4)];
    let x = entity.x + direction.x;
    let y = entity.y + direction.y;

    if (stage.canMoveTo(x, y) && stage.isUnoccupied(x, y)) {
      stage.moveEntityTo(entity, x, y);
      break;
    }
  }
}

export { drunkenWalk };
