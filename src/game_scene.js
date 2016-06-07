import Pixi from 'pixi.js';

import Player from './player';
import PlayerController from './player_controller';
import Vector2 from './vector2';

const renderer = Symbol();
const stage = Symbol();
const enabled = Symbol();
const childs = Symbol();

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
  }

  load() {
    const player = new Player();
    // Bad idea
    player.controller = new PlayerController(player, this.view);

    this.add(player);
  }

  update(delta) {
    this[childs].forEach(child => child.update(delta));
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
