import { normalizeMidiMessage } from 'remote-midi';
import { Keyboard } from '#src/lib/keyboard';
import { MidiCCState } from '#src/lib/midiCCState';

const { log } = console;

const midiCCState = MidiCCState.getInstance();

class KeyboardService extends Keyboard {
  #midiSender;

  #config;

  constructor({ config, midiSender }) {
    super();
    this.#config = config;
    this.#midiSender = midiSender;
  }

  start() {
    this.listen();
    console.log(this.#config);
    this.on('keypress', (keypressing) => {
      const key = this.#config.key.find((k) => k.sequence === keypressing.sequence);
      if (key) {
        const { controller, channel, increment } = key;
        const value = midiCCState.getValue({ channel, controller }) + increment;
        const normalizedMessage = normalizeMidiMessage({
          channel,
          value,
          controller,
        });
        midiCCState.set(normalizedMessage);
        this.#midiSender('cc', normalizedMessage);
      }
    });
    log('start : end');
    return this;
  }
}

export default KeyboardService;
export { KeyboardService };
