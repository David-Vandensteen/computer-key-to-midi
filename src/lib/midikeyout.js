import { emitKeypressEvents } from 'readline';
import midi from 'midi';

const { log } = console;

export default class MidiKeyOut extends midi.output {
  register({ portId, config }) {
    this.config = {};
    this.config.keys = [];
    this.config.ccs = [];
    const { keys } = config;
    const { key: defaultKey, cc: defaultCC } = config.default;
    this.openPort(portId);

    keys.map((k, id) => {
      const key = { ...defaultKey, ...k, id };
      this.config.keys.push(key);
      if ((this.config.ccs[key.cc] || {}).id !== key.cc) {
        let configCC = {};
        if (config.ccs) configCC = config.ccs.find((c) => c.id === key.cc);
        this.config.ccs.push({ ...defaultCC, id: key.cc, ...configCC });
        this.config.ccs[key.cc].onCreate({
          midiSender: this.sendMessage.bind(this),
          key,
          cc: this.config.ccs[key.cc],
        });
      }
      return this.config;
    });
    return this;
  }

  sendMessage(message) {
    const [type, id, value] = message;
    const { max, min } = this.config.ccs[id];

    if (value >= max) this.config.ccs[id].value = max;
    else if (value <= min) this.config.ccs[id].value = min;

    if (value <= 0) this.config.ccs[id].value = 0;
    else if (value >= 127) this.config.ccs[id].value = 127;

    const safeMessage = [type, id, this.config.ccs[id].value];
    super.sendMessage(safeMessage);
    log(safeMessage);
    return this;
  }

  stop() {
    log('');
    log('stop application signal');
    log('close port');
    log('exit');
    this.closePort();
    process.exit();
  }

  start() {
    const { stdin } = process;
    emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);

    stdin.on('keypress', (str, keypressing) => {
      if (keypressing.ctrl && keypressing.name === 'c') this.stop();
      else {
        const { ccs, keys } = this.config;
        const key = keys.find((k) => k.name === keypressing.sequence);
        if (key) {
          const cc = ccs[key.cc];
          const message = {
            midiSender: this.sendMessage.bind(this),
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
    return this;
  }
}
