import { MidiNormalizer } from 'remote-midi';
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
      const key = this.#config.key.find(({ sequence }) => sequence === keypressing.sequence);
      if (key) {
        let value;
        const {
          controller, channel, increment, type,
        } = key;
        const sourceValue = midiCCState.getValue({ channel, controller });
        if (type === 'analog') value = sourceValue + increment;
        if (type === 'digital') value = (sourceValue === 127) ? 0 : 127;
        const normalizedMessage = MidiNormalizer.message({
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
