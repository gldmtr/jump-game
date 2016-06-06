import GameScene from './game_scene';
import World from './world';

function load() {
  const scene = new GameScene(document.body);
  World.addScene(scene, true);

  scene.load();

  // scene.append(document.body);
  scene.renderEnabled = true;
}

window.onload = load;
