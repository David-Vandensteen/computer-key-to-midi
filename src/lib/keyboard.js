import { emitKeypressEvents } from 'readline';
import EventEmitter from 'events';

export default class Keyboard extends EventEmitter {
  listen() {
    const { stdin } = process;
    emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    stdin.on('keypress', (str, keypressing) => {
      this.emit('keypress', keypressing);
      if (keypressing.ctrl && keypressing.name === 'c') Keyboard.stop();
    });
  }

  static stop() {
    process.exit();
  }
}

export { Keyboard };
