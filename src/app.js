import Scene from './scene';

function load() {
  Scene.load();
  Scene.append(document.body);
  Scene.renderEnabled = true;
}

window.onload = load;
