/* eslint-disable lines-between-class-members */
import { emitKeypressEvents } from 'readline';

const { log } = console;

class Keyboard {
  #midiSender;
  #config = {};
  constructor({ config, midiSender }) {
    this.#config = {};
    this.#config.keys = [];
    this.#config.ccs = [];
    this.#midiSender = midiSender;
    const { keys } = config;
    const { key: defaultKey, cc: defaultCC } = config.default;

    keys.map((k, id) => {
      const key = { ...defaultKey, ...k, id };
      this.#config.keys.push(key);
      if ((this.#config.ccs[key.cc] || {}).id !== key.cc) {
        let configCC = {};
        if (config.ccs) configCC = config.ccs.find((c) => c.id === key.cc);
        this.#config.ccs.push({ ...defaultCC, id: key.cc, ...configCC });
        this.#config.ccs[key.cc].onCreate({
          midiSender: this.#midiSender,
          key,
          cc: this.#config.ccs[key.cc],
        });
      }
      return this.#config;
    });
  }

  static stop() {
    process.exit();
  }

  start() {
    const { stdin } = process;
    emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    stdin.on('keypress', (str, keypressing) => {
      if (keypressing.ctrl && keypressing.name === 'c') Keyboard.stop();
      else {
        const { ccs, keys } = this.#config;
        const key = keys.find((k) => k.name === keypressing.sequence);
        if (key) {
          const cc = ccs[key.cc];
          const message = {
            midiSender: this.#midiSender,
            cc,
            ccs,
            key,
            keys,
          };
          key.onPress(message);
          cc.onUpdate(message);
        }
      }
    });
    log('start : end');
    return this;
  }
}

export default Keyboard;
export { Keyboard };
