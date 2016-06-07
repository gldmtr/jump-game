import _ from 'lodash';
import Pixi from 'pixi.js';

import Player from './player';
import Platform from './platform';
import PlayerController from './player_controller';
import Vector2 from './vector2';
import CollisionManager from './collision_manager';

const renderer = Symbol();
const stage = Symbol();
const enabled = Symbol();
const childs = Symbol();
const collider = Symbol();

class GameScene {
  constructor(element) {
    this[childs] = [];
    this[stage] = new Pixi.Container();

    this[renderer] = Pixi.autoDetectRenderer(800, 600, {
      backgroundColor: 0x821662,
    });

    this.renderEnabled = false;
    if (element) {
      this.append(element);
    }

    this[collider] = new CollisionManager(this[childs]);
  }

  load() {
    const player = new Player();
    // Bad idea
    player.controller = new PlayerController(player, this.view);

    this.add(player);

    for (let i = 0; i < 10; i++) {
      const platform = new Platform();
      const x = Math.random();
      const y = Math.random();
      platform.position = new Vector2(x, y);

      this.add(platform);
    }
  }

  update(delta) {
    this[childs].forEach(child => child.update(delta));
    const playerCollisions = _(this[collider].update())
      .filter(coll => coll.from instanceof Player)
      .first();

    if (playerCollisions) {
      playerCollisions.from.collide(playerCollisions.to);
    }
  }

  add(model) {
    this[childs].push(model);
    this[stage].addChild(model.viewModel);
  }

  append(element) {
    element.appendChild(this[renderer].view);
  }

  render() {
    if (this[enabled]) {
      requestAnimationFrame(this.render.bind(this));
    }
    this[renderer].render(this[stage]);
  }

  get view() {
    return this[renderer].view;
  }
  get dimensions() {
    return new Vector2(this[renderer].width, this[renderer].height);
  }
  set renderEnabled(value) {
    if (value && !this[enabled]) {
      requestAnimationFrame(this.render.bind(this));
    }
    this[enabled] = value;
  }
}

export default GameScene;
