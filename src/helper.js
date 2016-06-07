import Pixi from 'pixi.js';

import Vector2 from './vector2';
import World from './world';

export function loadSprite(name, size) {
  // const texture = Pixi.Texture.fromImage(name);
  const sprite = Pixi.Sprite.fromImage(name);
  if (size) {
    sprite.width = size.x;
    sprite.height = size.y;
  }
  return sprite;
}

export function relativeToScene({ x, y }) {
  const dimensions = World.currentScene.dimensions;
  return new Vector2(x * dimensions.x, dimensions.y - y * dimensions.y);
}

export function relativeToAbsolute({ x, y }) {
  const dimensions = World.currentScene.dimensions;
  return new Vector2(x * dimensions.x, y * dimensions.y);
}

export function absoluteToRelative({ x, y }) {
  const dimensions = World.currentScene.dimensions;
  return new Vector2(x / dimensions.x, y / dimensions.y);
}

export function sceneToRelative({ x, y }) {
  const dimensions = World.currentScene.dimensions;
  return new Vector2(x / dimensions.x, (dimensions.y - y) / dimensions.y);
}

export function rectangleCollision(rect1, rect2) {
  return rect1.x < rect2.x + rect2.width &&
    rect1.x + rect1.width > rect2.x &&
    rect1.y < rect2.y + rect2.height &&
    rect1.y + rect1.height > rect2.y;
}
