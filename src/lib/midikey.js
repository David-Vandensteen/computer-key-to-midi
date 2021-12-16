import readline from 'readline';
import midi from 'midi';
import keyConfig from '#src/config/default-fr';

const { log } = console;

export default class MidiKey {
  register(portId) {
    this.output = new midi.Output();
    this.output.openPort(portId);
    return this;
  }

  send(message) {
    this.output.sendMessage(message);
    return this;
  }

  close() {
    this.output.close();
    return this;
  }

  start() {
    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, keypress) => {
      if (keypress.ctrl && keypress.name === 'c') {
        process.exit();
      } else {
        log(`You pressed the "${str}" key`);
        log();
        log(keypress);
        log();
        const key = keyConfig.keys.find((k) => k.key === keypress.sequence);
        log(key);
        if (key) {
          if (!keyConfig.ccs[key.cc]) {
            keyConfig.ccs[key.cc] = {
              value: 0,
            };
          }
          log(keyConfig);
          keyConfig.ccs[key.cc].value += key.increment;
          if (keyConfig.ccs[key.cc].value > 128) keyConfig.ccs[key.cc].value = 128;
          if (keyConfig.ccs[key.cc].value < 0) keyConfig.ccs[key.cc].value = 0;

          if (keyConfig.ccs[key.cc].value > keyConfig.ccs[key.cc].max) {
            keyConfig.ccs[key.cc].value = keyConfig.ccs[key.cc].max;
          }

          if (keyConfig.ccs[key.cc].value < keyConfig.ccs[key.cc].min) {
            keyConfig.ccs[key.cc].value = keyConfig.ccs[key.cc].min;
          }
          this.send([176, key.cc, keyConfig.ccs[key.cc].value]);
        }
      }
    });
    this.close();
    return this;
  }
}
