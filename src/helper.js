import Pixi from 'pixi.js';

export function loadSprite(name) {
  // create a texture from an image path
  const texture = Pixi.Texture.fromImage(name);
  // create a new Sprite using the texture
  const sprite = new Pixi.Sprite(texture);
  return sprite;
}
