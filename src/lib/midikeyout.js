import readline from 'readline';
import midi from 'midi';
import keyConfig from '#src/config/default-fr';

const { log } = console;

export default class MidiKeyOut extends midi.output {
  register(portId) {
    if (!keyConfig.ccs) keyConfig.ccs = {};
    this.openPort(portId);
    return this;
  }

  static createDefaultCC({ id, defaultCC }) {
    const { value, max, min } = defaultCC;
    keyConfig.ccs[id] = {
      ...keyConfig.ccs[id],
      ...{
        id,
        value,
        max,
        min,
      },
    };
  }

  start() {
    const { ccs, keys } = keyConfig;
    const { cc: defaultCC, key: defaultKey } = keyConfig.default;
    const { onPress, onRelease } = defaultKey;

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on('keypress', (str, keypress) => {
      if (keypress.ctrl && keypress.name === 'c') {
        this.closePort();
        process.exit();
      } else {
        let key = keys.find((k) => k.key === keypress.sequence);
        if (key) {
          if (!ccs[key.cc]) {
            MidiKeyOut.createDefaultCC({ id: key.cc, defaultCC });
          }
          const cc = ccs[key.cc];

          if (cc.value > cc.max) cc.value = cc.max;
          if (cc.value < cc.min) cc.value = cc.min;

          if (!key.onPress) key = { ...key, ...{ onPress } };
          if (!key.onRelease) key = { ...key, ...{ onRelease } };

          key.onPress({
            midiSender: this.sendMessage.bind(this),
            key,
            cc,
            ccs,
          });
          log(keyConfig);
        }
      }
    });
    return this;
  }
}
