import Pixi from 'pixi.js';

import Player from './player';

const renderer = Symbol();
const stage = Symbol();
const enabled = Symbol();
const childs = Symbol();

class Scene {
  constructor(element) {
    this[childs] = [];
    this[stage] = new Pixi.Container();

    this[renderer] = Pixi.autoDetectRenderer(800, 600);

    this.renderEnabled = false;
    if (element) {
      this.append(element);
    }
  }

  load() {
    console.log(this[renderer])
    const player = new Player();

    this.add(player);
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
    return this.renderer.view;
  }
  set renderEnabled(value) {
    if (value && !this[enabled]) {
      requestAnimationFrame(this.render.bind(this));
    }
    this[enabled] = value;
  }
}

export default new Scene();
