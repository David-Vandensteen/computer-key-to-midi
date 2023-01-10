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

import { Keyboard } from '#src/lib/keyboard';
import config from '#src/config/default-fr';

import { params, help } from '#src/lib/params';

if (params.list) {
  const { log } = console;
  log('midi inputs :', getInputs().toString());
  log('midi outputs :', getOutputs().toString());
  process.exit(0);
}

if (!params.mode || !params.host || !params.port) help();
if (params.mode !== 'server' && params.mode !== 'client') help();
if (params.mode === 'server' && !params.interface) help();

const client = () => {
  const midiClient = rMidiClient({ host: params.host, port: params.port });
  midiClient.start();
  const key = new Keyboard({ config, midiSender: midiClient.send.bind(midiClient) });
  key.start();
};

const server = () => {
  const midiServer = rMidiServer({
    host: params.host, port: params.port, midiDeviceName: params.interface,
  });
  midiServer.start();
};

switch (params.mode) {
  case 'server':
    server();
    break;

  case 'client':
  default:
    client();
    break;
}
