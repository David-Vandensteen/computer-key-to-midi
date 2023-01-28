import { rMidiClient, easymidi } from 'remote-midi';
import { MidiCCState } from '#src/lib/midiCCState';
import { KeyboardService } from '#src/model/mcc-1/service/keyboardService';
import { log } from '#src/lib/log';

const midiCCState = MidiCCState.getInstance();

const handleMidiData = (message) => {
    if (message.controller) midiCCState.set(message);
    return message;
};

const clientStart = (keyMappingConfig) => {
  const midiClient = rMidiClient(TCPConfig);
  midiClient.on('data', handleMidiData);
  midiClient.start();
  const key = new KeyboardService({
    config: keyMappingConfig,
    midiSender: midiClient.send.bind(midiClient),
  });
  key.start();
};

export default class LocalRunnerService {

  #keyMappingConfig;

  constructor({ keyMappingConfig }) {
    this.#keyMappingConfig = keyMappingConfig;
  }

  start() {
    try {
      clientStart(this.#TCPConfig, this.#keyMappingConfig);
    } catch (error) {
      log(error);
      process.exit(1);
    }
  }
}
export { LocalRunnerService };
