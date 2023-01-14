import { Keyboard } from '#src/lib/keyboard';
import midiMessageNormalizer from '#src/lib/midiMessageNormalizer';

const { log } = console;

class KeyboardService extends Keyboard {
  #midiSender;

  #config = {};

  constructor({ config, midiSender }) {
    super();
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
        this.#config.ccs[key.cc] = { ...defaultCC, id: key.cc, ...configCC };
        log(this.#config.ccs);
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
    const normalizedMessage = midiMessageNormalizer(message);
    const { controller, value } = normalizedMessage;
    const { max, min } = this.#config.ccs[controller];
    if (value >= max) this.#config.ccs[controller].value = max;
    else if (value <= min) this.#config.ccs[controller].value = min;

    normalizedMessage.value = this.#config.ccs[controller].value;
    this.#midiSender(type, normalizedMessage);
  }

  start() {
    this.listen();
    this.on('keypress', (keypressing) => {
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
          channel: key.channel,
        };
        key.onPress(message);
        cc.onUpdate(message);
      }
    });
    log('start : end');
    return this;
  }
}

export default KeyboardService;
export { KeyboardService };
