import { emitKeypressEvents } from 'readline';
import { EventEmitter } from 'events';

export default class Keyboard extends EventEmitter {
  constructor() {
    super();
    this.stdin = process.stdin;
    this.keypressEvent = 'keypress';
    this.ctrlCKey = 'c';
    this.rawMode = true;
  }

  start() {
    emitKeypressEvents(this.stdin);
    this.stdin.setRawMode(this.rawMode);
    this.stdin.on(this.keypressEvent, this.handleKeyPress.bind(this));
  }

  stop() {
    this.stdin.removeListener(this.keypressEvent, this.handleKeyPress);
    process.exit(0);
  }

  handleKeyPress(str, keypressing) {
    this.emit('keypress', keypressing);
    if (keypressing.ctrl && keypressing.name === this.ctrlCKey) this.stop();
  }
}

export { Keyboard };
