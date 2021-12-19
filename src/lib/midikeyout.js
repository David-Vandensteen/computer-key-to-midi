import readline from 'readline';
import midi from 'midi';
import keyConfig from '#src/config/default-fr';

const { log } = console;

export default class MidiKeyOut extends midi.output {
  register(portId) {
    this.openPort(portId);
    return this;
  }

  start() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, keypress) => {
      if (keypress.ctrl && keypress.name === 'c') {
        this.closePort();
        process.exit();
      } else {
        const key = keyConfig.keys.find((k) => k.key === keypress.sequence);
        if (key) {
          if (!keyConfig.ccs) keyConfig.ccs = {};
          if (!keyConfig.ccs[key.cc]) {
            const { value, max, min } = keyConfig.default;
            keyConfig.ccs[key.cc] = {
              value,
              max,
              min,
            };
          }
          log(keyConfig);
          const cc = keyConfig.ccs[key.cc];
          cc.value += key.increment;

          if (cc.value > cc.max) cc.value = cc.max;
          if (cc.value < cc.min) cc.value = cc.min;
          this.sendMessage([176, key.cc, keyConfig.ccs[key.cc].value]);
        }
      }
    });
    return this;
  }
}
