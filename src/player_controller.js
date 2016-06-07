const player = Symbol();
const controlElement = Symbol();

class PlayerController {
  constructor(model, element) {
    if (!model) {
      throw new Error('Called controller without model');
    }
    this[player] = model;

    if (element) {
      this.attachControl(element);
    }
  }

  attachControl(element) {
    element.onclick = this.handleClick.bind(this);
    element.onkeypress = this.handleKeyPress.bind(this);
    this[controlElement] = element;

    document.addEventListener('keydown', this.handleKeyPress.bind(this), false);
  }

  handleClick() {
    this[player].jump();
  }

  handleKeyPress(event) {
    switch (event.code) {
      case 'KeyA':
      case 'LeftArrow':
        this[player].moveLeft();
        break;
      case 'KeyD':
      case 'RightArrow':
        this[player].moveRight();
        break;
      default:
        break;
    }
  }
}

export default PlayerController;
