import { emitKeypressEvents } from 'readline';
import midi from 'midi';
import keyConfig from '#src/config/default-fr';

const { log } = console;

export default class MidiKeyOut extends midi.output {
  register(portId) {
    const { ccs } = keyConfig;
    const { keys } = keyConfig;
    const { onPress } = keyConfig.default.key;
    const { cc: defaultCC } = keyConfig.default;
    this.openPort(portId);

    if (!ccs) keyConfig.ccs = [];

    for (let i = 0; i < keys.length; i += 1) {
      const key = keys[i];
      if (!key.onPress) keyConfig.keys[i].onPress = onPress;

      if (!keyConfig.ccs[key.cc]) {
        keyConfig.ccs.push(defaultCC);
      } // TODO: else // TODO: test min & max value

      if (keyConfig.ccs[key.cc].onCreate) {
        keyConfig.ccs[key.cc].onCreate({
          midiSender: this.sendMessage.bind(this),
          cc: keyConfig.ccs[key.cc],
          key,
        });
      }
    }
    return this;
  }

  sendMessage(message) {
    const [type, id, value] = message;
    const { max, min } = keyConfig.ccs[id];

    if (value >= max) keyConfig.ccs[id].value = max;
    else if (value <= min) keyConfig.ccs[id].value = min;

    if (value <= 0) keyConfig.ccs[id].value = 0;
    else if (value >= 127) keyConfig.ccs[id].value = 127;

    const safeMessage = [type, id, keyConfig.ccs[id].value];
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
        const { ccs, keys } = keyConfig;
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
          // log(keyConfig);
        }
      }
    });
    return this;
  }
}
