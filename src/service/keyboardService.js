import { emitKeypressEvents } from 'readline';

const { log } = console;

class KeyboardService {
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
          midiSender: this.midiSendNormalize,
          key,
          cc: this.#config.ccs[key.cc],
        });
      }
      return this.#config;
    });
  }

  midiSendNormalize(type, message) {
    const { controller, value } = message;
    const { max, min } = this.#config.ccs[controller];

    if (value >= max) this.#config.ccs[controller].value = max;
    else if (value <= min) this.#config.ccs[controller].value = min;

    if (value <= 0) this.#config.ccs[controller].value = 0;
    else if (value >= 127) this.#config.ccs[controller].value = 127;

    const normalizedMessage = message;
    normalizedMessage.value = this.#config.ccs[controller].value;
    this.#midiSender(type, normalizedMessage);
  }

  static stop() {
    process.exit();
  }

  start() {
    const { stdin } = process;
    emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    stdin.on('keypress', (str, keypressing) => {
      if (keypressing.ctrl && keypressing.name === 'c') KeyboardService.stop();
      else {
        const { ccs, keys } = this.#config;
        const key = keys.find((k) => k.name === keypressing.sequence);
        if (key) {
          const cc = ccs[key.cc];
          const message = {
            midiSender: this.midiSendNormalize.bind(this),
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

export default KeyboardService;
export { KeyboardService };
