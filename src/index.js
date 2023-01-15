import {
  rMidiClient,
  rMidiServer,
  getInputs,
  getOutputs,
  decode,
} from 'remote-midi';

import { KeyboardService } from '#src/model/mcc-1/service/keyboardService';
import config from '#src/lib/config';

import { paramService, help } from '#src/service/paramService';
import { MidiCCState } from '#src/lib/midiCCState';

const midiCCState = MidiCCState.getInstance();

if (paramService.list) {
  const { log } = console;
  log('midi inputs :', getInputs().toString());
  log('midi outputs :', getOutputs().toString());
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
  let configFile = 'src/model/mcc-1/config/default-fr.yaml';
  if (paramService.config) configFile = paramService.config;
  const key = new KeyboardService({
    config: config(configFile), midiSender: midiClient.send.bind(midiClient),
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
