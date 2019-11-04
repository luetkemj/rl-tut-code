import { drunkenWalk } from "./behavior";

class Volition {
  takeTurn(stage) {
    drunkenWalk(this.owner, stage);
  }
}

export default Volition;
