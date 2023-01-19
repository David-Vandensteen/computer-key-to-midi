/*
TODO :
import { rMidiClient, rMidiServer, getInputs, getOutputs, decode } from 'remote-midi';
import { log } from '#src/lib/log';
import { KeyboardService } from '#src/model/mcc-1/service/keyboardService';
import getConfig from '#src/lib/config';
import { paramService, help } from '#src/service/paramService';
import { MidiCCState } from '#src/lib/midiCCState';

const MASTER_MODE = 'master';
const SLAVE_MODE = 'slave';
const DEFAULT_PORT = 3000;
const midiCCState = MidiCCState.getInstance();

class MidiDataHandler {
    handle(dataBuffer) {
        decode(dataBuffer).map((message) => {
            if (message.controller) midiCCState.set(message);
            return message;
        });
    }
}

class MasterRunner {
    constructor(config) {
        this.config = config;
    }

    run(host, port, inputDevice, outputDevice) {
        try {
            const midiServer = rMidiServer({
                host: host,
                port: port,
                midiOutputDeviceName: outputDevice,
                midiInputDeviceName: inputDevice,
            });
            midiServer.start();
        } catch (error) {
            log.error(error);
            process.exit(1);
        }
    }
}

class SlaveRunner {
    constructor(config) {
        this.config = config;
    }

    run(host, port) {
        try {
            const midiClient = rMidiClient({
                host: host,
                port: port,
            });
            const midiDataHandler = new MidiDataHandler();
            midiClient.on('data', midiDataHandler.handle);
            midiClient.start();
            const key = new KeyboardService({
                config: this.config,
                midiSender: midiClient.send.bind(midiClient),
            });
            key.start();
        } catch (error) {
            log.error(error);
            process.exit(1);
        }
    }
}

function checkArgumentsAndHelp() {
    if (paramService.list) {
        log.title('show midi device :');
        log.info('midi inputs :', getInputs().toString());
        log.info('midi outputs :', getOutputs().toString());
        process.exit(0);
    }

    if (!paramService.mode || !paramService.host) help();
    if (paramService.mode !== MASTER_MODE && paramService.mode !== SLAVE_MODE) help();
    if (paramService.mode === MASTER_MODE && !paramService.interfaceOut) help();
}

checkArgumentsAndHelp();

const config = getConfig(['src/model/mcc-1/config/default-fr.yaml', 'dist/mcc.yaml']);
const masterRunner = new MasterRunner(config);
const slaveRunner = new SlaveRunner(config);

if (paramService.mode === MASTER_
*/
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

const handleMidiData = (dataBuffer) => {
  decode(dataBuffer).map((message) => {
    if (message.controller) midiCCState.set(message);
    return message;
  });
};

const checkArgumentsAndHelp = () => {
  if (paramService.list) {
    log.title('show midi device :');
    log.info('midi inputs :', getInputs().toString());
    log.info('midi outputs :', getOutputs().toString());
    process.exit(0);
  }

  if (!paramService.mode || !paramService.host || !paramService.port) help();
  if (paramService.mode !== 'master' && paramService.mode !== 'slave') help();
  if (paramService.mode === 'master' && !paramService.interfaceOut) help();
};

checkArgumentsAndHelp();

const runSlave = () => {
  try {
    const midiClient = rMidiClient({
      host: paramService.host,
      port: paramService.port,
    });
    midiClient.on('data', handleMidiData);
    midiClient.start();
    const config = getConfig(['src/model/mcc-1/config/default-fr.yaml', 'dist/mcc.yaml']);
    const key = new KeyboardService({
      config,
      midiSender: midiClient.send.bind(midiClient),
    });
    key.start();
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
};

const runMaster = () => {
  try {
    const midiServer = rMidiServer({
      host: paramService.host,
      port: paramService.port,
      midiOutputDeviceName: paramService.interfaceOut,
      midiInputDeviceName: paramService.interfaceIn,
    });
    midiServer.start();
  } catch (error) {
    log.error(error);
    process.exit(1);
  }
};

const run = (mode) => {
  if (mode === 'master') runMaster();
  if (mode === 'slave') runSlave();
  return undefined;
};

run(paramService.mode);
