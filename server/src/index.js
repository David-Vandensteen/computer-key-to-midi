import { rMidiClient, rMidiServer } from 'remote-midi';
import { Keyboard } from '#src/lib/keyboard';
import config from '#src/config/default-fr';

import { params, help } from '#src/lib/params';

if (!params.mode || !params.host || !params.port) help();
if (params.mode !== 'server' && params.mode !== 'client') help();
if (params.mode === 'server' && !params.id) help();

const client = () => {
  const midiClient = rMidiClient({ host: params.host, port: params.port });
  midiClient.start();
  const key = new Keyboard({ config, midiSender: midiClient.send.bind(midiClient) });
  key.start();
};

const server = () => {
  const midiServer = rMidiServer({ host: params.host, port: params.port, midiDeviceId: params.id });
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