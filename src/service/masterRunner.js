import { rMidiServer } from 'remote-midi';
import { log } from '#src/lib/log';

export default class MasterRunnerService {
  #config;

  constructor({
    host, port, midiInputDeviceName, midiOutputDeviceName,
  }) {
    this.#config = {
      host,
      port,
      midiInputDeviceName,
      midiOutputDeviceName,
    };
  }

  start() {
    try {
      const midiServer = rMidiServer(this.#config);
      midiServer.start();
    } catch (error) {
      log(error);
      process.exit(1);
    }
  }
}

export { MasterRunnerService };
