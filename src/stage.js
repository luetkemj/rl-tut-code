import { generateDungeon } from "./dungeon";
import { createFOV } from "./fov";
import { spawnMonster } from "./monsters";
import Directions from "./directions";

class Stage {
  constructor(width, height, player) {
    this.width = width;
    this.height = height;
    const { tiles, rooms } = generateDungeon(width, height);
    this.map = tiles;

    this.initializeEntities(player, rooms);
    this.initializeVisibility();
  }

  initializeEntities(player, rooms) {
    this.entities = [];
    this.entitiesMap = Array(this.height)
      .fill(null)
      .map(() =>
        Array(this.width)
          .fill(null)
          .map(() => [])
      );

    const startAt = rooms[0].center();
    player.x = startAt.x;
    player.y = startAt.y;
    this.player = player;

    this.addEntity(player);

    for (let r = 1; r < rooms.length; r++) {
      if (Math.random() > 0.6) continue;
      const spawnAt = rooms[r].center();
      this.addEntity(spawnMonster(spawnAt.x, spawnAt.y));
    }
  }

  addEntity(entity) {
    this.entities.push(entity);
    this.entitiesMap[entity.y][entity.x].push(entity);
  }

  removeEntity(entity) {
    this.entitiesMap[entity.y][entity.x] = this.entitiesMap[entity.y][
      entity.x
    ].filter(e => e !== entity);
    this.entities = this.entities.filter(e => e !== entity);
  }

  moveEntityTo(entity, x, y) {
    this.entitiesMap[entity.y][entity.x] = this.entitiesMap[entity.y][
      entity.x
    ].filter(e => e !== entity);
    entity.x = x;
    entity.y = y;
    this.entitiesMap[y][x].push(entity);
  }

  canMoveTo(x, y) {
    return !this.map[y][x].blocking;
  }

  isOpaque(x, y) {
    return this.map[y][x].opaque;
  }

  isVisible(x, y) {
    return this.visible.has(`${x},${y}`);
  }

  initializeVisibility() {
    this.visible = new Set();
    this.seen = new Set();

    this.refreshFOV = createFOV(
      this.width,
      this.height,
      (x, y) => this.revealTile(x, y),
      (x, y) => this.isOpaque(x, y)
    );

    this.refreshVisibility();
  }

  refreshVisibility() {
    this.visible.clear();
    this.refreshFOV(this.player.x, this.player.y, 16);
  }

  isSeen(x, y) {
    return this.seen.has(`${x},${y}`);
  }

  revealTile(x, y) {
    const id = `${x},${y}`;
    this.visible.add(id);
    this.seen.add(id);
  }

  isUnoccupied(x, y) {
    return !this.entitiesMap[y][x].some(e => e.isBlocking());
  }

  entitiesAt(x, y) {
    return this.entitiesMap[y][x];
  }

  adjacentPoints(x, y) {
    const points = [];
    for (let direction of Directions.CARDINAL) {
      let candidate = {
        x: x + direction.x,
        y: y + direction.y
      };
      if (
        candidate.x >= 0 &&
        candidate.x < this.width &&
        candidate.y >= 0 &&
        candidate.y < this.height
      ) {
        points.push(candidate);
      }
    }
    return points;
  }

  movementCost(x, y) {
    return this.isUnoccupied(x, y) ? 1 : 5;
  }
}

export default Stage;
