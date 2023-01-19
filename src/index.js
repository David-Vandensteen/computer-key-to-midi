import {
  rMidiClient,
  rMidiServer,
  getInputs,
  getOutputs,
  decode,
} from 'remote-midi';

import { log } from '#src/lib/log';

import { KeyboardService } from '#src/model/mcc-1/service/keyboardService';
import getConfig from '#src/lib/config';

import { paramService, help } from '#src/service/paramService';
import { MidiCCState } from '#src/lib/midiCCState';

const midiCCState = MidiCCState.getInstance();

if (paramService.list) {
  log.title('show midi device :');
  log.info('midi inputs :', getInputs().toString());
  log.info('midi outputs :', getOutputs().toString());
  process.exit(0);
}

if (!paramService.mode || !paramService.host || !paramService.port) help();
if (paramService.mode !== 'master' && paramService.mode !== 'slave') help();
if (paramService.mode === 'master' && !paramService.interfaceOut) help();

const slave = () => {
  const midiClient = rMidiClient({
    host: paramService.host, port: paramService.port,
  });
  midiClient.on('data', (dataBuffer) => {
    decode(dataBuffer).map((message) => {
      if (message.controller) midiCCState.set(message);
      return message;
    });
  });
  midiClient.start();
  const config = getConfig(['src/model/mcc-1/config/default-fr.yaml', 'dist/mcc.yaml']);
  if (config === undefined) throw new Error('config error');
  const key = new KeyboardService({
    config, midiSender: midiClient.send.bind(midiClient),
  });
  key.start();
};

const master = () => {
  const midiServer = rMidiServer({
    host: paramService.host,
    port: paramService.port,
    midiOutputDeviceName: paramService.interfaceOut,
    midiInputDeviceName: paramService.interfaceIn,
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
