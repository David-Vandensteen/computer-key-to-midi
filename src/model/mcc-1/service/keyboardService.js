import { MidiNormalizer } from 'remote-midi';
import { Keyboard } from '#src/lib/keyboard';
import { MidiCCState } from '#src/lib/midiCCState';
import { log } from '#src/lib/log';

const midiCCState = MidiCCState.getInstance();

const getConfiguredKey = (config, keypressSequence) => {
  const configuredKey = config.key.find(({ sequence }) => sequence === keypressSequence);
  return configuredKey;
};

class KeyboardService extends Keyboard {
  #midiSender;

  #config;

  #state = [];

  constructor({ config, midiSender }) {
    super();
    this.#config = config;
    this.#midiSender = midiSender;
    log.debug('add ID on each sequence');
    this.#config.key.map((k, index) => {
      this.#config.key[index].id = index;
      if (k.controller.cycle) {
        this.#state[index] = {
          cycleIndex: 0,
        };
      }
      return k;
    });
  }

  #getNormalizedMidiController({ controller, sequenceId }) {
    if (controller?.cycle) {
      const { cycleIndex } = this.#state[sequenceId];
      const normalizedMidiController = controller.cycle[cycleIndex];
      this.#state[sequenceId].cycleIndex += 1;
      if (this.#state[sequenceId].cycleIndex >= controller.cycle.length) {
        this.#state[sequenceId].cycleIndex = 0;
      }
      return normalizedMidiController;
    }
    return controller;
  }

  static #getMidiValue({
    type, channel, controller, increment, controllerCycle,
  }) {
    let modifiedValue;
    const sourceValue = midiCCState.getValue({ channel, controller });
    if (type === 'analog') modifiedValue = sourceValue + increment;
    if (type === 'digital' && !controllerCycle) modifiedValue = (sourceValue === 127) ? 0 : 127;
    if (type === 'digital' && controllerCycle) modifiedValue = 127;

    return modifiedValue;
  }

  start() {
    super.start();
    log.title('midi mapping :');
    log.debug(this.#config);
    this.on('keypress', (keypressEvent) => {
      log.debug(keypressEvent);

      const configuredKey = getConfiguredKey(this.#config, keypressEvent.sequence);

      if (configuredKey) {
        const {
          id, controller, channel, increment, type,
        } = configuredKey;

        const normalizedMidiController = this.#getNormalizedMidiController(
          { controller, sequenceId: id },
        );

        const modifiedValue = KeyboardService.#getMidiValue({
          type,
          channel,
          controller: normalizedMidiController,
          increment,
          controllerCycle: controller.cycle || undefined,
        });

        const normalizedMidiMessage = MidiNormalizer.message({
          channel,
          value: modifiedValue,
          controller: normalizedMidiController,
        });

        midiCCState.set(normalizedMidiMessage);
        this.#midiSender('cc', normalizedMidiMessage);
      }
    });
    return this;
  }
}

export default KeyboardService;
export { KeyboardService };
