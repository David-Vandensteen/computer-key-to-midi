import {
  rMidiClient,
  rMidiServer,
  getInputs,
  getOutputs,
} from 'remote-midi';

import { KeyboardService } from '#src/service/keyboardService';
import config from '#src/config/default-fr';

import { paramService, help } from '#src/service/paramService';

if (paramService.list) {
  const { log } = console;
  log('midi inputs :', getInputs().toString());
  log('midi outputs :', getOutputs().toString());
  process.exit(0);
}

if (!paramService.mode || !paramService.host || !paramService.port) help();
if (paramService.mode !== 'server' && paramService.mode !== 'client') help();
if (paramService.mode === 'server' && !paramService.interface) help();

const client = () => {
  const midiClient = rMidiClient({ host: paramService.host, port: paramService.port });
  midiClient.start();
  const key = new KeyboardService({ config, midiSender: midiClient.send.bind(midiClient) });
  key.start();
};

const server = () => {
  const midiServer = rMidiServer({
    host: paramService.host, port: paramService.port, midiDeviceName: paramService.interface,
  });
  midiServer.start();
};

switch (paramService.mode) {
  case 'server':
    server();
    break;

  case 'client':
  default:
    client();
    break;
}
