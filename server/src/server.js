import { rMidiServer } from 'remote-midi';

const server = rMidiServer({ host: '127.0.0.1', port: 7070, midiDeviceId: 2 });
server.start();
