import { rMidiServer } from 'remote-midi';

const master = rMidiServer({
  host: '127.0.0.1', port: 7070, midiInputDeviceName: 'mcc-in', midiOutputDeviceName: 'mcc-out',
});
master.start();
