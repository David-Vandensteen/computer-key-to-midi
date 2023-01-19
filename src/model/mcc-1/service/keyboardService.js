import { normalizeMidiMessage } from 'remote-midi';
import { Keyboard } from '#src/lib/keyboard';
import { MidiCCState } from '#src/lib/midiCCState';
import { log } from '#src/lib/log';

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
    super.start();
    log.title('midi mapping :');
    log.debug(this.#config);
    this.on('keypress', (keypressing) => {
      log.debug(keypressing);
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
    return this;
  }
}

export default KeyboardService;
export { KeyboardService };
