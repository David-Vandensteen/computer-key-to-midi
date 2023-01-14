import { rMidiServer } from 'remote-midi';

const master = rMidiServer({ host: '127.0.0.1', port: 7070, midiDeviceName: 'mcc-out' });
master.start();
