import World from './world';
import Vector2 from './vector2';
import { loadSprite, relativeToAbsolute } from './helper';

const position = Symbol();
const anchor = Symbol();
const sprite = Symbol();

class Player {
  constructor() {
    this[sprite] = loadSprite('assets/textures/bunny.png');

    this.anchor = new Vector2(0.5, 0.5);
    this.position = new Vector2(0.5, 0.5);
    this.speed = new Vector2();
    this.acceleration = new Vector2();
  }

  update(delta) {
    if (!delta) {
      return;
    }
    const newPosition = new Vector2(
      this.position.x,
      this.position.y - World.gravity * (delta / 1000)
    );
    this.position = newPosition;
  }

  get position() {
    return this[position];
  }
  set position(vector2) {
    if (this[sprite]) {
      const { x, y } = relativeToAbsolute(vector2);
      this[sprite].position.x = x;
      this[sprite].position.y = y;
    }
    this[position] = vector2;
  }

  get anchor() {
    return this[anchor];
  }
  set anchor(vector2) {
    if (this[sprite]) {
      this[sprite].anchor.x = vector2.x;
      this[sprite].anchor.y = vector2.y;
    }
    this[anchor] = vector2;
  }

  get viewModel() {
    return this[sprite];
  }
}

export default Player;
