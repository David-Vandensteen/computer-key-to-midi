import { rMidiClient, TCPMessage } from 'remote-midi';
import { MidiCCState } from '#src/lib/midiCCState';
import { KeyboardService } from '#src/model/mcc-1/service/keyboardService';
import { log } from '#src/lib/log';

const midiCCState = MidiCCState.getInstance();

const handleMidiData = (dataBuffer) => {
  TCPMessage.decode(dataBuffer).map((message) => {
    if (message.controller) midiCCState.set(message);
    return message;
  });
};

const clientStart = (TCPConfig, keyConfig) => {
  const midiClient = rMidiClient(TCPConfig);
  midiClient.on('data', handleMidiData);
  midiClient.start();
  const key = new KeyboardService({
    config: keyConfig,
    midiSender: midiClient.send.bind(midiClient),
  });
  key.start();
};

export default class SlaveRunnerService {
  #TCPConfig;

  #keyConfig;

  constructor({ host, port, keyConfig }) {
    this.#TCPConfig = { host, port };
    this.#keyConfig = keyConfig;
  }

  start() {
    try {
      clientStart(this.#TCPConfig, this.#keyConfig);
    } catch (error) {
      log(error);
      process.exit(1);
    }
  }
}
export { SlaveRunnerService };
