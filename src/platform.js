import Vector2 from './vector2';
import config from './config';
import { loadSprite, relativeToAbsolute, relativeToScene } from './helper';

const position = Symbol();
const anchor = Symbol();
const speed = Symbol();
const sprite = Symbol();

class Platform {
  constructor() {
    this[sprite] = loadSprite('assets/textures/wall.jpg',
      relativeToAbsolute(new Vector2(0.3, 0.1)));

    this.anchor = new Vector2(0.5, 0.5);
    this.position = new Vector2(0.5, 0.5);
    this[speed] = new Vector2(0, config.platformSpeed);
  }

  update(delta) {
    if (!delta) {
      return;
    }

    const divider = delta / 1000;

    const newPosition = new Vector2(
      this.position.x + this[speed].x * divider,
      this.position.y + this[speed].y * divider
    );
    this.position = newPosition;
  }

  get position() {
    return this[position];
  }
  set position(vector2) {
    if (this[sprite]) {
      const { x, y } = relativeToScene(vector2);
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

  get speed() {
    return this[speed];
  }

  get viewModel() {
    return this[sprite];
  }
  get bounds() {
    return this[sprite].getBounds();
  }
}

export default Platform;
