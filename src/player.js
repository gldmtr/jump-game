import Vector2 from './vector2';
import { loadSprite } from './helper';

const position = Symbol();
const anchor = Symbol();
const sprite = Symbol();

class Player {
  constructor() {
    this[sprite] = loadSprite('assets/textures/bunny.png');

    this.anchor = new Vector2(0.5, 0.5);
    this.position = new Vector2();
    this.speed = new Vector2();
    this.acceleration = new Vector2();
  }

  get position() {
    return this[position];
  }
  set position(vector2) {
    if (this[sprite]) {
      this[sprite].position.x = vector2.x;
      this[sprite].position.y = vector2.y;
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
