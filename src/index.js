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
