import World from './world';
import Vector2 from './vector2';
import config from './config';
import { loadSprite, relativeToAbsolute } from './helper';

const position = Symbol();
const anchor = Symbol();
const speed = Symbol();
const sprite = Symbol();

class Player {
  constructor() {
    this[sprite] = loadSprite('assets/textures/bunny.png');

    this.anchor = new Vector2(0.5, 0.5);
    this.position = new Vector2(0.5, 0.5);
    this[speed] = new Vector2();
  }

  update(delta) {
    if (!delta) {
      return;
    }

    const divider = delta / 1000;

    if (Math.abs(this[speed].x) < config.speedFadeout) {
      this[speed].x = 0;
    } else {
      this[speed].x -= Math.sign(this[speed].x) * config.speedFadeout * divider;
    }
    this[speed].y -= World.gravity * divider;

    const newPosition = new Vector2(
      this.position.x + this[speed].x * divider,
      this.position.y + this[speed].y * divider
    );
    this.position = newPosition;
    // console.log(this.position);
  }

  jump() {
    this[speed].y = config.jumpSpeed;
  }

  moveLeft() {
    this.speed.x -= config.moveSpeed;
  }

  moveRight() {
    this.speed.x += config.moveSpeed;
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

  get speed() {
    return this[speed];
  }
  // set speed(vector2) {
  //   //
  //   // TODO: Check collision with platform before set speed
  //   //
  //   this[speed] = vector2;
  // }

  get viewModel() {
    return this[sprite];
  }
}

export default Player;
