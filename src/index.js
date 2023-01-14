import {
  rMidiClient,
  rMidiServer,
  getInputs,
  getOutputs,
} from 'remote-midi';

import { KeyboardService } from '#src/model/mcc-1/service/keyboardService';
import config from '#src/model/mcc-1/config/default-fr';

import { paramService, help } from '#src/service/paramService';

if (paramService.list) {
  const { log } = console;
  log('midi inputs :', getInputs().toString());
  log('midi outputs :', getOutputs().toString());
  process.exit(0);
}

if (!paramService.mode || !paramService.host || !paramService.port) help();
if (paramService.mode !== 'master' && paramService.mode !== 'slave') help();
if (paramService.mode === 'master' && !paramService.interface) help();

const slave = () => {
  const midiClient = rMidiClient({ host: paramService.host, port: paramService.port });
  midiClient.start();
  const key = new KeyboardService({ config, midiSender: midiClient.send.bind(midiClient) });
  key.on('keypress', (key) => console.log('PRESSING KEY', key.sequence));
  key.start();
};

const master = () => {
  const midiServer = rMidiServer({
    host: paramService.host, port: paramService.port, midiDeviceName: paramService.interface,
  });
  midiServer.start();
};

switch (paramService.mode) {
  case 'master':
    master();
    break;

  case 'slave':
  default:
    slave();
    break;
}
