import Pixi from 'pixi.js';

import Vector2 from './vector2';
import World from './world';

export function loadSprite(name) {
  // create a texture from an image path
  const texture = Pixi.Texture.fromImage(name);
  // create a new Sprite using the texture
  const sprite = new Pixi.Sprite(texture);
  return sprite;
}

export function relativeToAbsolute({ x, y }) {
  const dimensions = World.currentScene.dimensions;
  return new Vector2(x * dimensions.x, dimensions.y - y * dimensions.y);
}
