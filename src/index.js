/* "free" cc
9, 14, 15
20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31
35, 41
46, 47, 48, 49, 50, 51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 61, 62, 63
84, 85, 86, 87, 88, 89, 90
102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 119
*/

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
